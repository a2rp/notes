# 103 - Event delegation and reusable handlers: Example

## Goal

Use one click listener on a task list to handle complete and remove buttons, including buttons added after the listener is registered. The nested button labels also show why a click target may be a child element instead of the button itself.

## Complete example

Save this as an HTML file and open it in a browser. The complete source is displayed here in Markdown.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Event delegation task list</title>
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
      width: min(100%, 44rem);
      margin-inline: auto;
    }

    form,
    .task-list {
      display: grid;
      gap: 0.75rem;
      margin-block: 1.5rem;
    }

    form {
      grid-template-columns: 1fr auto;
      align-items: end;
      padding: 1rem;
      border: 1px solid currentColor;
      border-radius: 0.5rem;
    }

    label {
      display: grid;
      gap: 0.4rem;
    }

    input,
    button {
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      font: inherit;
    }

    .task-list {
      padding: 0;
      list-style: none;
    }

    .task {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: 1px solid currentColor;
      border-radius: 0.5rem;
    }

    .task-label {
      flex: 1 1 12rem;
    }

    .task.is-complete .task-label {
      text-decoration: line-through;
      opacity: 0.7;
    }

    .task button {
      cursor: pointer;
    }

    #task-status {
      min-height: 1.5em;
    }

    @media (max-width: 28rem) {
      form {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Task list</h1>
    <p>One listener on the list handles every task action.</p>

    <form id="task-form">
      <label for="task-input">
        New task
        <input id="task-input" name="task" maxlength="60" required>
      </label>
      <button type="submit">Add task</button>
    </form>

    <ul id="task-list" class="task-list" aria-label="Tasks">
      <li class="task" data-task>
        <span class="task-label">Read the event delegation lesson</span>
        <button type="button" data-action="complete" aria-pressed="false" aria-label="Mark Read the event delegation lesson complete"><span>Complete</span></button>
        <button type="button" data-action="remove" aria-label="Remove Read the event delegation lesson"><span>Remove</span></button>
      </li>
      <li class="task" data-task>
        <span class="task-label">Review the Q&amp;A</span>
        <button type="button" data-action="complete" aria-pressed="false" aria-label="Mark Review the Q&amp;A complete"><span>Complete</span></button>
        <button type="button" data-action="remove" aria-label="Remove Review the Q&amp;A"><span>Remove</span></button>
      </li>
      <li class="task" data-task>
        <span class="task-label">Try the example</span>
        <button type="button" data-action="complete" aria-pressed="false" aria-label="Mark Try the example complete"><span>Complete</span></button>
        <button type="button" data-action="remove" aria-label="Remove Try the example"><span>Remove</span></button>
      </li>
    </ul>

    <p id="task-status" aria-live="polite">Three tasks are ready.</p>
  </main>

  <script>
    const taskForm = document.querySelector("#task-form");
    const taskInput = document.querySelector("#task-input");
    const taskList = document.querySelector("#task-list");
    const taskStatus = document.querySelector("#task-status");

    function createActionButton(action, accessibleName, visibleText) {
      const button = document.createElement("button");
      const label = document.createElement("span");

      button.type = "button";
      button.dataset.action = action;
      button.setAttribute("aria-label", accessibleName);
      label.textContent = visibleText;
      button.append(label);

      if (action === "complete") {
        button.setAttribute("aria-pressed", "false");
      }

      return button;
    }

    function addTask(label) {
      const item = document.createElement("li");
      const taskLabel = document.createElement("span");

      item.className = "task";
      item.dataset.task = "";
      taskLabel.className = "task-label";
      taskLabel.textContent = label;

      const completeButton = createActionButton(
        "complete",
        "Mark " + label + " complete",
        "Complete"
      );
      const removeButton = createActionButton(
        "remove",
        "Remove " + label,
        "Remove"
      );

      item.append(taskLabel, completeButton, removeButton);
      taskList.append(item);
    }

    function handleTaskAction(event) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const list = event.currentTarget;
      if (!(list instanceof Element)) {
        return;
      }

      const button = event.target.closest("button[data-action]");
      if (!button || !list.contains(button)) {
        return;
      }

      const item = button.closest("li[data-task]");
      if (!item || !list.contains(item)) {
        return;
      }

      const taskLabel = item.querySelector(".task-label").textContent;

      switch (button.dataset.action) {
        case "complete": {
          const isComplete = item.classList.toggle("is-complete");
          const buttonLabel = button.querySelector("span");

          button.setAttribute("aria-pressed", String(isComplete));
          button.setAttribute(
            "aria-label",
            (isComplete ? "Mark " + taskLabel + " incomplete" : "Mark " + taskLabel + " complete")
          );
          buttonLabel.textContent = isComplete ? "Undo" : "Complete";
          taskStatus.textContent = isComplete
            ? "Completed: " + taskLabel
            : "Marked incomplete: " + taskLabel;
          break;
        }
        case "remove":
          item.remove();
          taskStatus.textContent = "Removed: " + taskLabel;
          break;
      }
    }

    taskList.addEventListener("click", handleTaskAction);

    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const label = taskInput.value.trim();
      if (!label) {
        taskStatus.textContent = "Enter a task name first.";
        taskInput.focus();
        return;
      }

      addTask(label);
      taskForm.reset();
      taskInput.focus();
      taskStatus.textContent = "Added: " + label;
    });
  </script>
</body>
</html>
~~~

## Expected output

- The page starts with three task rows, each with Complete and Remove buttons.
- Selecting Complete crosses out that task and changes the button to Undo. Selecting Undo restores the task.
- Selecting Remove deletes that task from the list.
- Submitting a non-empty task name adds a new row. Its buttons work even though they did not exist when the list listener was registered.
- The status message announces each completed, restored, removed, or added task.

## How it works

1. The list receives one **click** listener. The individual task buttons do not receive listeners.
2. A click on the nested **span** bubbles to the list. The original **event.target** can therefore be the span, while **event.currentTarget** is the list.
3. **closest("button[data-action]")** walks up from the clicked element to find the button that describes the action.
4. **list.contains(button)** and **list.contains(item)** ensure that the matched elements belong to this list.
5. **data-action** tells the handler whether to complete or remove the task. One **switch** routes both actions.
6. The form has its own submit listener. It creates task elements with DOM methods and assigns user-provided text through **textContent**, so the input is treated as text instead of markup.
7. Newly created task buttons are handled by the same list listener because their clicks bubble through the list.

## Try it yourself

1. Add a **span** around the visible text of one existing action button, then click its text and observe how **closest()** still finds the button.
2. Add another task after the page has loaded. Use its buttons to confirm the listener was not attached separately to each row.
3. Add a third **data-action** such as **edit** and handle it in the **switch**.
4. Add an unrelated matching button outside the list and confirm the containment check prevents the list from acting on it.
5. Remove the containment guard temporarily and explain why checking the listener's delegation boundary is useful.
6. Change the click listener to a different event and consider whether that event bubbles.

## Key points

- A stable parent can handle events from many current and future descendants.
- Use **event.target** to find where a click began and **event.currentTarget** to identify the listener's element.
- Use **closest()** for clicks on nested content and verify the match remains inside the delegated container.
- Use explicit **type="button"** for controls that must not submit a form.
- Build user-provided content with **textContent** and DOM methods.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [102 - Browser events: capture, bubbling, and default actions](102-browser-events-capture-bubbling-and-default-actions.md) | [Open lesson](../lessons/103-event-delegation-and-reusable-handlers.md) | [Open Q&A](../qnas/103-event-delegation-and-reusable-handlers.md) | [104 - Forms, input validation, and submission](../lessons/104-forms-input-validation-and-submission.md) |