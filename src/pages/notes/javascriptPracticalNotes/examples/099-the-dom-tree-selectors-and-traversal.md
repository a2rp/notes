# 99 - The DOM tree, selectors, and traversal

This browser example shows the DOM as a tree, compares node and element relationships, selects elements, and demonstrates the difference between a static query result and a live collection. It also uses closest() for delegated button handling.

## Goal

By the end of this example, you can:

- Inspect child nodes and child elements in the same container.
- Select elements with CSS selectors.
- Move between element siblings.
- Compare a static querySelectorAll() result with a live HTMLCollection.
- Find an ancestor with closest() and safely handle a delegated click.

## Complete example

Copy the code into a file named `dom-tree-and-traversal.html`, then open it in a modern browser. Open the developer tools Console to see the output. Use the page buttons to add and update tasks.

~~~html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DOM tree and selectors</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            line-height: 1.5;
            margin: 2rem auto;
            max-width: 44rem;
            padding: 0 1rem;
        }

        li {
            margin-block: 0.5rem;
        }

        [data-state="done"] .task-label {
            text-decoration: line-through;
        }

        button {
            margin-inline-start: 0.5rem;
        }

        #status {
            border: 1px solid #777;
            padding: 0.75rem;
        }
    </style>
</head>
<body>
    <main id="demo">
        <h1 id="page-title">DOM tree and selectors</h1>
        <p>This page inspects a task list and then updates it.</p>

        <section aria-labelledby="tasks-heading">
            <h2 id="tasks-heading">Tasks</h2>
            <ul id="task-list">
                <li class="task" data-state="open">
                    <span class="task-label">Learn selectors</span>
                    <button type="button" data-action="toggle">Mark done</button>
                </li>
                <li class="task" data-state="done">
                    <span class="task-label">Read node types</span>
                    <button type="button" data-action="toggle">Mark open</button>
                </li>
                <li class="task" data-state="open">
                    <span class="task-label">Query the DOM</span>
                    <button type="button" data-action="toggle">Mark done</button>
                </li>
            </ul>
        </section>

        <button id="add-task" type="button">Add practice task</button>
        <p id="status" role="status">No task has been added yet.</p>
    </main>

    <script>
        const title = document.getElementById("page-title");
        const list = document.querySelector("#task-list");
        const addButton = document.querySelector("#add-task");
        const status = document.querySelector("#status");

        const taskSnapshot = list.querySelectorAll(".task");
        const openTaskSnapshot = list.querySelectorAll(".task[data-state='open']");
        const liveTasks = list.getElementsByClassName("task");

        console.log("Page title:", title.textContent);
        console.log("Task list element children:", list.children.length);
        console.log("Task list childNodes:", list.childNodes.length);
        console.log(
            "First child is a text node:",
            list.firstChild.nodeType === Node.TEXT_NODE
        );
        console.log("Initial task snapshot:", taskSnapshot.length);
        console.log("Initial open tasks:", openTaskSnapshot.length);

        const firstTask = list.firstElementChild;
        console.log("First task is a direct child:", firstTask.parentElement === list);
        console.log(
            "First task matches open selector:",
            firstTask.matches(".task[data-state='open']")
        );
        console.log(
            "First task next element label:",
            firstTask.nextElementSibling.querySelector(".task-label").textContent
        );

        function createTask(label) {
            const item = document.createElement("li");
            item.className = "task";
            item.dataset.state = "open";

            const text = document.createElement("span");
            text.className = "task-label";
            text.textContent = label;

            const button = document.createElement("button");
            button.type = "button";
            button.dataset.action = "toggle";
            button.textContent = "Mark done";

            item.append(text, button);
            return item;
        }

        addButton.addEventListener("click", () => {
            const item = createTask("Practice traversal");
            list.append(item);
            status.textContent = "Added: Practice traversal";
        });

        list.addEventListener("click", (event) => {
            if (!(event.target instanceof Element)) {
                return;
            }

            const button = event.target.closest("button[data-action='toggle']");

            if (!button || !list.contains(button)) {
                return;
            }

            const item = button.closest(".task");
            const label = item.querySelector(".task-label").textContent;
            const isDone = item.dataset.state === "done";

            item.dataset.state = isDone ? "open" : "done";
            button.textContent = isDone ? "Mark done" : "Mark open";
            status.textContent = label + (isDone ? " is open." : " is done.");

            console.log("Action:", label + (isDone ? " is now open" : " is now done"));
            console.log(
                "Open tasks after toggle:",
                list.querySelectorAll(".task[data-state='open']").length
            );
        });

        addButton.click();

        console.log("Static task snapshot after adding:", taskSnapshot.length);
        console.log("Live task collection after adding:", liveTasks.length);
        console.log(
            "Open tasks after adding:",
            list.querySelectorAll(".task[data-state='open']").length
        );

        const labels = Array.from(list.children, (item) => {
            return item.querySelector(".task-label").textContent;
        });
        console.log("Element-only traversal:", labels.join(" | "));

        const practiceButton = list.lastElementChild.querySelector("button");
        const owningTask = practiceButton.closest(".task");
        console.log(
            "Closest task for practice button:",
            owningTask.querySelector(".task-label").textContent
        );

        practiceButton.click();
        console.log("Status:", status.textContent);
    </script>
</body>
</html>
~~~

## Expected Console output

~~~text
Page title: DOM tree and selectors
Task list element children: 3
Task list childNodes: 7
First child is a text node: true
Initial task snapshot: 3
Initial open tasks: 2
First task is a direct child: true
First task matches open selector: true
First task next element label: Read node types
Static task snapshot after adding: 3
Live task collection after adding: 4
Open tasks after adding: 3
Element-only traversal: Learn selectors | Read node types | Query the DOM | Practice traversal
Closest task for practice button: Practice traversal
Action: Practice traversal is now done
Open tasks after toggle: 2
Status: Practice traversal is done.
~~~

## Expected page output

The page initially shows three tasks. The script adds a fourth task named **Practice traversal**, marks it done, and updates the status paragraph to:

> Practice traversal is done.

You can click **Add practice task** to add another task. Click any task's button to switch that task between open and done.

## How it works

### childNodes includes formatting whitespace

The list has three li elements, so children contains three entries. The line breaks and indentation between the li elements create Text nodes, so childNodes contains seven entries: three elements and four whitespace nodes. Its first child is therefore a Text node.

### Selectors return different kinds of results

The example uses getElementById() for the page heading and querySelector() for a selector-based lookup. querySelectorAll() finds all matches at that moment and returns a static NodeList.

The script saves taskSnapshot before it adds another task. Its length remains three afterward. liveTasks comes from getElementsByClassName(), which returns a live HTMLCollection, so its length changes to four.

The openTaskSnapshot also remains a snapshot of the original two open tasks. A new querySelectorAll() call after insertion finds the current three open tasks.

### Element traversal skips non-element nodes

firstElementChild and nextElementSibling move between li elements even though whitespace Text nodes are between them. The Array.from() call reads each direct element child and builds an Array of its label text.

The first task's parentElement is the list, confirming that it is a direct child. matches() tests that same task against a selector.

### closest() supports event delegation

The click listener is attached once to the list. A click on a nested button bubbles to the list. closest() finds the button and its task, and contains() confirms the button belongs to the list before changing the task state.

This pattern handles existing and newly added task buttons without attaching a separate listener to every button.

## Try another case

1. Add a comment between two list items and compare childNodes with children again.
2. Change the initial query selector to select only done tasks.
3. Save a querySelectorAll() result, remove one of its elements, and compare the list length with the element's isConnected value.
4. Add a selector using :scope > li to find only direct list items.
5. Replace nextElementSibling with nextSibling and inspect the whitespace Text nodes.
6. Add a nested button inside a span and check which element becomes event.target.
7. Change the event handler to find an ancestor section with closest().
8. Create a TreeWalker for the list with NodeFilter.SHOW_TEXT and inspect its text nodes.
9. Add a shadow root to a custom element and compare a document query with a query made on its shadowRoot.
10. Reorder the list with CSS and explain why nextElementSibling still follows DOM order.

## Key points

- childNodes includes text and comment nodes. children includes element children only.
- firstElementChild and nextElementSibling avoid whitespace nodes during element traversal.
- querySelectorAll() returns a static NodeList, while getElementsByClassName() returns a live collection.
- A new query is needed when a fresh static result is required after the DOM changes.
- matches() tests the current element, and closest() checks it and its ancestors.
- Event delegation lets one containing element handle clicks from nested controls.
- The DOM tree describes structure and order, while CSS controls visual layout.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [98 - Browser globals, globalThis, window, and document](../lessons/098-browser-globals-globalthis-window-and-document.md) | [Open lesson](../lessons/099-the-dom-tree-selectors-and-traversal.md) | [Open Q&A](../qnas/099-the-dom-tree-selectors-and-traversal.md) | [100 - Creating, updating, and removing DOM content](../lessons/100-creating-updating-and-removing-dom-content.md) |
