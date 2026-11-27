# Example 141 - Browser project: build an interactive interface

## Question

How can a browser page let a visitor add tasks, mark them complete, filter the list, and remove them while keeping the interface accessible and the data safe?

## Complete example

Save the following as an HTML file and open it in a browser. It is a self-contained example with markup, styling, and JavaScript. The task data starts empty and lives in JavaScript state while the page is open.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My task list</title>
  <style>
    :root {
      color-scheme: light;
      font: 1rem/1.5 system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      max-width: 42rem;
      margin: 2rem auto;
      padding: 0 1rem;
      color: #18212b;
      background: #f5f7fa;
    }

    main {
      padding: 1.5rem;
      background: white;
      border: 1px solid #c8d0da;
      border-radius: 0.75rem;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    form {
      display: grid;
      gap: 0.5rem;
      margin-block: 1.5rem;
    }

    input,
    button {
      min-height: 2.75rem;
      padding: 0.55rem 0.75rem;
      font: inherit;
    }

    input {
      width: 100%;
      border: 1px solid #687586;
      border-radius: 0.35rem;
    }

    button {
      border: 1px solid #52657b;
      border-radius: 0.35rem;
      background: #fff;
      color: #18212b;
      cursor: pointer;
    }

    button:hover {
      background: #edf3f9;
    }

    :focus-visible {
      outline: 3px solid #075dcc;
      outline-offset: 2px;
    }

    .filters {
      margin: 1.5rem 0;
      padding: 0.75rem;
      border: 1px solid #c8d0da;
      border-radius: 0.4rem;
    }

    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .filter-buttons [aria-pressed="true"] {
      border-color: #075dcc;
      background: #e7f0ff;
      font-weight: 700;
    }

    #task-list {
      display: grid;
      gap: 0.65rem;
      padding: 0;
      list-style: none;
    }

    .task-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem;
      border: 1px solid #c8d0da;
      border-radius: 0.4rem;
    }

    .task-label {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      min-width: 0;
    }

    .task-label input {
      width: 1.2rem;
      min-height: 1.2rem;
      margin-top: 0.2rem;
      flex: 0 0 auto;
    }

    .task-label span {
      overflow-wrap: anywhere;
    }

    .is-complete span {
      color: #526174;
      text-decoration: line-through;
    }

    #task-count,
    #task-status {
      color: #39485a;
    }

    #task-status {
      min-height: 1.5em;
    }

    @media (max-width: 30rem) {
      main {
        padding: 1rem;
      }

      .task-row {
        align-items: flex-start;
      }

      .task-row button {
        flex: 0 0 auto;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>My task list</h1>
    <p>Add a task, mark it complete, or choose a filter to change the list.</p>

    <form id="task-form">
      <label for="task-input">New task</label>
      <input
        id="task-input"
        name="task"
        type="text"
        required
        maxlength="120"
        autocomplete="off"
      >
      <button type="submit">Add task</button>
    </form>

    <fieldset class="filters">
      <legend>Filter tasks</legend>
      <div class="filter-buttons" id="filter-buttons">
        <button type="button" data-filter="all" aria-pressed="true">All</button>
        <button type="button" data-filter="active" aria-pressed="false">Active</button>
        <button type="button" data-filter="completed" aria-pressed="false">Completed</button>
      </div>
    </fieldset>

    <p id="task-count">0 tasks total; 0 shown.</p>
    <h2 id="tasks-heading">Your tasks</h2>
    <p id="empty-message">No tasks yet. Add one above.</p>
    <ul id="task-list" aria-labelledby="tasks-heading"></ul>
    <p id="task-status" role="status" aria-live="polite"></p>
  </main>

  <script>
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    const filterButtons = document.querySelector("#filter-buttons");
    const count = document.querySelector("#task-count");
    const emptyMessage = document.querySelector("#empty-message");
    const taskList = document.querySelector("#task-list");
    const status = document.querySelector("#task-status");

    const state = {
      tasks: [],
      filter: "all"
    };

    let nextTaskId = 1;

    function getVisibleTasks() {
      if (state.filter === "active") {
        return state.tasks.filter((task) => !task.completed);
      }

      if (state.filter === "completed") {
        return state.tasks.filter((task) => task.completed);
      }

      return state.tasks;
    }

    function createTaskRow(task) {
      const item = document.createElement("li");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      const text = document.createElement("span");
      const removeButton = document.createElement("button");

      item.className = "task-row";
      item.dataset.taskId = String(task.id);

      if (task.completed) {
        item.classList.add("is-complete");
      }

      label.className = "task-label";

      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.dataset.action = "toggle";
      checkbox.dataset.taskId = String(task.id);
      checkbox.setAttribute(
        "aria-label",
        (task.completed ? "Mark active: " : "Mark complete: ") + task.text
      );

      text.textContent = task.text;

      removeButton.type = "button";
      removeButton.dataset.action = "remove";
      removeButton.dataset.taskId = String(task.id);
      removeButton.textContent = "Remove";
      removeButton.setAttribute("aria-label", "Remove task: " + task.text);

      label.append(checkbox, text);
      item.append(label, removeButton);
      return item;
    }

    function updateCount(visibleTasks) {
      const total = state.tasks.length;
      const shown = visibleTasks.length;
      const taskWord = total === 1 ? "task" : "tasks";

      count.textContent =
        total + " " + taskWord + " total; " + shown + " shown.";
    }

    function updateEmptyMessage(visibleTasks) {
      if (state.tasks.length === 0) {
        emptyMessage.textContent = "No tasks yet. Add one above.";
        return;
      }

      if (visibleTasks.length === 0) {
        emptyMessage.textContent =
          "No " + state.filter + " tasks to show. Choose another filter.";
        return;
      }

      emptyMessage.textContent = "";
    }

    function updateFilterButtons() {
      for (const button of filterButtons.querySelectorAll("[data-filter]")) {
        const selected = button.dataset.filter === state.filter;
        button.setAttribute("aria-pressed", String(selected));
      }
    }

    function render() {
      const visibleTasks = getVisibleTasks();
      const fragment = document.createDocumentFragment();

      for (const task of visibleTasks) {
        fragment.append(createTaskRow(task));
      }

      taskList.replaceChildren(fragment);
      updateCount(visibleTasks);
      updateEmptyMessage(visibleTasks);
      updateFilterButtons();
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const text = input.value.trim();

      if (text === "") {
        status.textContent = "Enter a task before adding it.";
        input.focus();
        return;
      }

      const task = {
        id: nextTaskId++,
        text,
        completed: false
      };

      state.tasks.push(task);
      form.reset();
      render();
      status.textContent = "Task added.";
      input.focus();
    });

    taskList.addEventListener("change", (event) => {
      const checkbox = event.target.closest("input[data-action='toggle']");

      if (!checkbox || !taskList.contains(checkbox)) {
        return;
      }

      const taskId = Number(checkbox.dataset.taskId);
      const task = state.tasks.find((item) => item.id === taskId);

      if (!task) {
        return;
      }

      task.completed = checkbox.checked;
      status.textContent = task.completed
        ? "Task marked complete."
        : "Task marked active.";

      render();

      const refreshedCheckbox = taskList.querySelector(
        'input[data-task-id="' + taskId + '"]'
      );

      if (refreshedCheckbox) {
        refreshedCheckbox.focus();
      } else {
        const selectedFilter = filterButtons.querySelector(
          'button[data-filter="' + state.filter + '"]'
        );

        if (selectedFilter) {
          selectedFilter.focus();
        }
      }
    });

    taskList.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action='remove']");

      if (!button || !taskList.contains(button)) {
        return;
      }

      const row = button.closest("li[data-task-id]");
      const rows = Array.from(taskList.querySelectorAll("li[data-task-id]"));
      const rowIndex = rows.indexOf(row);
      const nextRow = rows[rowIndex + 1];
      const previousRow = rows[rowIndex - 1];
      const nextId = nextRow ? nextRow.dataset.taskId : "";
      const previousId = previousRow ? previousRow.dataset.taskId : "";
      const taskId = Number(button.dataset.taskId);

      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      render();
      status.textContent = "Task removed.";

      let focusTarget = null;

      if (nextId !== "") {
        focusTarget = taskList.querySelector(
          'button[data-action="remove"][data-task-id="' + nextId + '"]'
        );
      }

      if (!focusTarget && previousId !== "") {
        focusTarget = taskList.querySelector(
          'button[data-action="remove"][data-task-id="' + previousId + '"]'
        );
      }

      if (focusTarget) {
        focusTarget.focus();
      } else {
        input.focus();
      }
    });

    filterButtons.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");

      if (!button || !filterButtons.contains(button)) {
        return;
      }

      state.filter = button.dataset.filter;
      render();
      status.textContent =
        "Showing " + state.filter + " tasks.";
    });

    render();
  </script>
</body>
</html>
~~~

## Expected output

- At first, the page shows an empty task list and the message **No tasks yet. Add one above.**
- Submitting a non-empty task adds a row with a checkbox and a **Remove** button. The input clears, the count updates, and focus returns to the input.
- Selecting a checkbox changes the task's completed style and updates the available filters. Focus returns to the checkbox if it remains visible. If the selected filter hides the completed task, focus moves to that filter button.
- Selecting **All**, **Active**, or **Completed** updates the visible tasks and pressed state of the filter buttons.
- Removing a task updates the count and moves focus to a nearby remove button. If there are no visible tasks to focus, focus returns to the input.
- If the selected filter has no matches, the page explains that the view is empty.
- Text that resembles HTML appears literally as task text.
- The task list exists only in JavaScript memory. Reloading the page starts with an empty list.

## Explanation

- **The data is kept in state.** The state object holds task records and the selected filter. The DOM is rebuilt from that state so the visible list does not become a second data store.
- **The form uses native behavior.** A visible label names the input, and a submit event handles both the button and Enter. The script trims input and rejects a whitespace-only value.
- **Visitor text is not parsed as markup.** The row is built with document creation methods, and task text is assigned through text content. The remove button's accessible name identifies which task it will remove.
- **Rendering derives the page.** The render function calculates the filtered view, creates rows, updates counts and empty messages, and exposes the selected filter through the pressed state.
- **Events are delegated.** The task list handles checkbox changes and remove clicks from its child rows. The filter group handles its buttons. These listeners are attached once to stable elements, not reattached after every render.
- **Focus is handled after DOM replacement.** Rendering replaces list rows. The checkbox handler restores focus to the refreshed checkbox, or to the selected filter if that task is no longer visible. The remove handler moves focus to a nearby remove button or back to the task input.
- **Status is announced politely.** The status region reports short results without taking focus. The selected filter and visible task count are also available in the page.
- **The example has deliberate limits.** It does not save tasks between reloads, sync between tabs, or send data to a server. Those behaviors require additional storage or API design.

## Try it yourself

1. Add two tasks, complete one, and compare the All, Active, and Completed filters.
2. Submit only spaces. Confirm that no task is created and the input receives focus.
3. Add text such as an opening angle bracket followed by an image-like tag. Confirm it appears as literal text.
4. Remove a task with the keyboard and note where focus moves.
5. Remove all tasks, then test each filter and read the empty-state message.
6. Resize the browser to a narrow viewport and make sure the controls remain usable.
7. Temporarily remove the status message updates and compare how clearly the page communicates an action.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [140 - Feature detection, compatibility, and graceful fallback](../lessons/140-feature-detection-compatibility-and-graceful-fallback.md) | [Lesson](../lessons/141-browser-project-build-an-interactive-interface.md) · [Q&A](../qnas/141-browser-project-build-an-interactive-interface.md) · [Example](141-browser-project-build-an-interactive-interface.md) | [142 - Browser project: build an API-driven application](../lessons/142-browser-project-build-an-api-driven-application.md) |

