# 118 - Accessibility, keyboard interaction, and dynamic content

This complete example builds a small task list. It uses native HTML controls, a polite status message, safe text insertion, predictable focus after deleting an item, and a native modal dialog.

The page does not use a framework or external library.

## Create these files

Make a folder named <code>accessible-task-list</code> and add these three files.

### <code>accessible-task-list/index.html</code>

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Accessible task list</title>
    <link rel="stylesheet" href="styles.css">
    <script src="app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Task list</h1>
      <p>Add a task, remove it when finished, or open the help dialog.</p>

      <form id="task-form">
        <label for="task-input">New task</label>
        <input
          id="task-input"
          name="task"
          type="text"
          maxlength="120"
          required
        >
        <button type="submit">Add task</button>
      </form>

      <p id="task-status" class="status" role="status" aria-atomic="true"></p>

      <section aria-labelledby="tasks-heading">
        <h2 id="tasks-heading">Your tasks</h2>
        <p id="empty-state">No tasks yet. Add one above.</p>
        <ul id="task-list" aria-label="Your tasks"></ul>
      </section>

      <p>
        <button id="open-help" type="button">How this list works</button>
      </p>

      <details>
        <summary>Why does the page use a status message?</summary>
        <p>
          Adding or removing a task changes the list without moving focus to
          the status text. The status tells assistive technology what changed.
        </p>
      </details>

      <dialog id="help-dialog" aria-labelledby="help-title">
        <h2 id="help-title" tabindex="-1">Using the task list</h2>
        <p>
          Use the labeled field to enter a task. The Add task button creates it.
          Each task has a Remove button with a name that includes the task text.
        </p>
        <p>
          When a task is removed, focus moves to a nearby task button. If the
          list becomes empty, focus returns to the task field.
        </p>
        <button id="close-help" type="button">Close help</button>
      </dialog>
    </main>
  </body>
</html>
~~~

### <code>accessible-task-list/styles.css</code>

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem;
  color: #1b1b1b;
  background: #fff;
  font: 1rem/1.6 system-ui, sans-serif;
}

main {
  width: min(100%, 42rem);
  margin-inline: auto;
}

h1,
h2 {
  line-height: 1.2;
}

form {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 0.75rem;
}

label {
  flex-basis: 100%;
  font-weight: 700;
}

input {
  flex: 1 1 15rem;
  min-width: 0;
  padding: 0.65rem;
  font: inherit;
}

button {
  padding: 0.65rem 0.9rem;
  color: #fff;
  background: #174ea6;
  border: 2px solid #174ea6;
  border-radius: 0.25rem;
  font: inherit;
  cursor: pointer;
}

button:hover {
  background: #123d83;
}

button:focus-visible,
input:focus-visible,
summary:focus-visible {
  outline: 3px solid #b45309;
  outline-offset: 3px;
}

.status {
  min-height: 1.6em;
  font-weight: 700;
}

#task-list {
  display: grid;
  gap: 0.75rem;
  padding-inline-start: 1.5rem;
}

#task-list li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

dialog {
  width: min(calc(100% - 2rem), 34rem);
  padding: 1.5rem;
  border: 2px solid #333;
  border-radius: 0.5rem;
}

dialog::backdrop {
  background: rgb(0 0 0 / 60%);
}

@media (max-width: 30rem) {
  body {
    padding: 1rem;
  }

  form > input,
  form > button {
    flex-basis: 100%;
  }
}
~~~

### <code>accessible-task-list/app.js</code>

~~~js
"use strict";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskStatus = document.querySelector("#task-status");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

const openHelpButton = document.querySelector("#open-help");
const closeHelpButton = document.querySelector("#close-help");
const helpDialog = document.querySelector("#help-dialog");

function updateEmptyState() {
  emptyState.hidden = taskList.children.length > 0;
}

function removeTask(taskItem, removeButton) {
  const buttonsBeforeRemoval = [
    ...taskList.querySelectorAll("button")
  ];
  const oldPosition = buttonsBeforeRemoval.indexOf(removeButton);

  taskItem.remove();
  updateEmptyState();

  const remainingButtons = [
    ...taskList.querySelectorAll("button")
  ];
  const nextPosition = Math.min(oldPosition, remainingButtons.length - 1);
  const nextButton = remainingButtons[nextPosition];

  if (nextButton) {
    nextButton.focus();
  } else {
    taskInput.focus();
  }

  const remainingCount = remainingButtons.length;
  taskStatus.textContent =
    remainingCount === 1
      ? "Task removed. 1 task remains."
      : "Task removed. " + remainingCount + " tasks remain.";
}

function addTask(taskText) {
  const item = document.createElement("li");
  const text = document.createElement("span");
  const removeButton = document.createElement("button");

  text.textContent = taskText;
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.setAttribute("aria-label", "Remove task: " + taskText);

  removeButton.addEventListener("click", () => {
    removeTask(item, removeButton);
  });

  item.append(text, removeButton);
  taskList.append(item);
  updateEmptyState();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (!taskText) {
    taskStatus.textContent = "Enter a task before adding it.";
    taskInput.focus();
    return;
  }

  addTask(taskText);
  taskInput.value = "";
  taskInput.focus();

  const taskCount = taskList.children.length;
  taskStatus.textContent =
    taskCount === 1
      ? "Task added. 1 task in the list."
      : "Task added. " + taskCount + " tasks in the list.";
});

openHelpButton.addEventListener("click", () => {
  helpDialog.showModal();
  closeHelpButton.focus();
});

closeHelpButton.addEventListener("click", () => {
  helpDialog.close();
});

helpDialog.addEventListener("close", () => {
  openHelpButton.focus();
});
~~~

## Run the example

Open <code>accessible-task-list/index.html</code> in a modern browser. No build step or server is needed for this example.

## Try it

1. Press <code>Tab</code> to move through the field and buttons. Confirm the focused control has a visible outline.
2. Enter a task and press <code>Enter</code>. The new task should appear in the list and a short status should be announced.
3. Add a few tasks, then remove one. Focus should move to a nearby remaining Remove button.
4. Remove the final task. Focus should return to the New task field and the empty-list message should appear.
5. Select **How this list works**. Focus should enter the modal dialog.
6. Press <code>Tab</code> to move within the open dialog. Press <code>Escape</code> or select **Close help** to close it. Focus should return to the opening button.
7. Expand the native details section and collapse it with the keyboard.

## Expected result

The page starts with an empty-list message and no task controls. Adding a non-empty task creates a list item containing the task text and a Remove button. The browser presents task text as text, even if it contains characters that look like HTML.

After an add or remove action, a short status reports the new count. The status does not receive focus. When a task is removed, focus moves to the next task button at that position. If there is no next item, it moves to the previous final item. If the list is empty, focus returns to the task field.

The dialog opens with focus on its Close help button and has a visible heading that names it. Escape closes the native modal dialog. The page then returns focus to the button that opened it.

## Why these choices help

- The label is explicitly connected to the text input.
- The form and buttons are native controls, so their standard keyboard behavior is available.
- The status uses the status role to announce a concise result without stealing focus.
- Task text is inserted with <code>textContent</code>, so user-entered text is not parsed as markup.
- Each Remove button has a name that identifies which task it removes.
- Focus is deliberately restored after the focused list item is deleted.
- The dialog uses a visible heading and a native modal element.
- The details disclosure uses native HTML rather than a custom widget.
- Focus styles are visible and do not depend on color alone.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [117 - Permissions, geolocation, and device APIs](../lessons/117-permissions-geolocation-and-device-apis.md) | [Open Q&A](../qnas/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [Open lesson](../lessons/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [119 - Browser security: XSS, injection, and safe DOM updates](../lessons/119-browser-security-xss-injection-and-safe-dom-updates.md) |
