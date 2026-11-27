# 100 - Creating, updating, and removing DOM content: Example

## Goal

Build a small task list that can add and remove items. The page creates every task element with DOM methods and displays the task name as text.

## Complete example

Save this as an HTML file and open it in a browser. The code is shown here for study; this repository keeps the example in Markdown.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Task list</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
    }

    main {
      width: min(100%, 38rem);
      margin-inline: auto;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 0.75rem;
      margin-block: 1.5rem;
    }

    label {
      display: grid;
      flex: 1 1 14rem;
      gap: 0.4rem;
    }

    input,
    button {
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      font: inherit;
    }

    ul {
      display: grid;
      gap: 0.75rem;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.75rem;
      border: 1px solid currentColor;
      border-radius: 0.5rem;
    }

    #task-status {
      min-height: 1.5em;
    }
  </style>
</head>
<body>
  <main>
    <h1>Task list</h1>
    <p>Add a task with the form. Use its Remove button to delete it.</p>

    <form id="task-form">
      <label for="task-input">
        Task name
        <input id="task-input" name="task" type="text" maxlength="80" required>
      </label>
      <button type="submit">Add task</button>
    </form>

    <p id="task-status" aria-live="polite">Loading tasks...</p>
    <ul id="task-list"></ul>
  </main>

  <script>
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    const taskList = document.querySelector("#task-list");
    const status = document.querySelector("#task-status");

    function updateStatus(message) {
      status.textContent = message;
    }

    function createTaskItem(taskText) {
      const item = document.createElement("li");
      const label = document.createElement("span");
      const removeButton = document.createElement("button");

      label.textContent = taskText;

      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.setAttribute("aria-label", "Remove task: " + taskText);
      removeButton.addEventListener("click", function () {
        item.remove();
        updateStatus("Removed task: " + taskText);
      });

      item.append(label, removeButton);
      return item;
    }

    const startingTasks = [
      "Read chapter 100",
      "Practice creating DOM nodes"
    ];
    const fragment = document.createDocumentFragment();

    for (const taskText of startingTasks) {
      fragment.append(createTaskItem(taskText));
    }

    taskList.append(fragment);
    updateStatus(startingTasks.length + " tasks are ready.");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const taskText = input.value.trim();

      if (taskText === "") {
        updateStatus("Enter a task before adding it.");
        input.focus();
        return;
      }

      taskList.append(createTaskItem(taskText));
      form.reset();
      updateStatus("Added task: " + taskText);
      input.focus();
    });
  </script>
</body>
</html>
~~~

## Expected output

The page shows:

- A **Task list** heading and a short instruction.
- A text field labeled **Task name** and an **Add task** button.
- Two starting tasks:
  - Read chapter 100
  - Practice creating DOM nodes
- A **Remove** button beside each task.
- A status message that changes when a task is added or removed.

For example, type **Review the DOM methods** and submit the form. A third task appears. Its text is displayed as text, and the status message says that it was added. Select its **Remove** button to remove just that task.

## How it works

### 1. Select the existing page elements

The script selects the form, input, list, and status paragraph once. The script is placed after the page markup, so these elements already exist when the queries run.

### 2. Build one task item

The **createTaskItem()** function creates an **li**, a **span**, and a **button**. It assigns the task name to **label.textContent**, so a value containing markup characters is displayed as text rather than parsed into elements.

The button gets a click listener. When clicked, it removes the item that the function created and updates the status paragraph.

### 3. Prepare the starting items

The loop creates each starting task and appends it to a **DocumentFragment**. Appending the fragment to the task list inserts its children into the page. The list receives the task nodes, and the temporary fragment becomes empty.

### 4. Handle form submission

The form's **submit** event works when a visitor clicks the button or submits from the keyboard. **preventDefault()** stops the browser from navigating away to submit the form.

The code trims the input so spaces alone do not become a task. A valid task is created and appended to the list. The form is reset, a status message is shown, and focus returns to the input.

## Try these changes

1. Change the starting tasks and reload the page.
2. Try adding a task containing **<b>markup</b>**. Confirm it appears as literal text.
3. Change **append()** to **prepend()** for new tasks so the most recent task appears first.
4. Add a button that clears the task list with **taskList.replaceChildren()**.
5. Add an empty-state message and update it when the first task is added or the last task is removed.

## Key ideas shown

- **document.createElement()** constructs new elements.
- **textContent** displays task names as text.
- **append()** inserts nodes into the list.
- **DocumentFragment** holds initial nodes until they are inserted.
- **remove()** detaches the selected task.
- Form submission can create DOM content in response to user input.
- A reused function keeps similar DOM structures consistent.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [99 - The DOM tree, selectors, and traversal](../examples/099-the-dom-tree-selectors-and-traversal.md) | [Open lesson](../lessons/100-creating-updating-and-removing-dom-content.md) | [Open Q&A](../qnas/100-creating-updating-and-removing-dom-content.md) | [101 - Attributes, classes, forms, and styles from JavaScript](../lessons/101-attributes-classes-forms-and-styles-from-javascript.md) |
