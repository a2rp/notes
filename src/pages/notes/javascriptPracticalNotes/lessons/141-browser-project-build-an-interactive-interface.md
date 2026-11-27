# 141 - Browser project: build an interactive interface

This chapter builds a small task list interface with browser JavaScript. The project brings together semantic HTML, form handling, DOM updates, events, state, validation, and accessible status messages.

The goal is to make each interaction predictable: add a task, mark it complete, filter the list, and remove a task. JavaScript state is the source of truth, and the page is rendered from that state.

## Learning goals

- Turn a user story into interface behavior and acceptance criteria.
- Organize a browser project into markup, styles, state, rendering, and event handling.
- Use semantic forms, labels, buttons, and lists.
- Keep application state separate from the DOM.
- Render visitor-provided text safely.
- Handle form submission and delegated events.
- Add completion, removal, and filtering actions.
- Communicate dynamic updates accessibly.
- Handle empty, invalid, and filtered states.
- Make a small project easier to review and extend.

## Define the task before writing code

Start with a user story:

> As a visitor, I want to add tasks, mark them complete, filter the list, and remove tasks so I can keep a short list of work in this page.

Turn that story into observable behavior:

1. A labeled text field accepts a task and a submit button adds it.
2. Empty and whitespace-only tasks are rejected with a useful message.
3. A successful submission adds one active task and clears the field.
4. A task can be marked complete or active again.
5. The list can show all, active, or completed tasks.
6. A task can be removed.
7. The page explains when there are no tasks or when a filter has no matches.
8. Counts and short status messages stay in sync with the current state.
9. Controls work with a keyboard and have understandable names.

This checklist prevents coding only the happy path and forgetting empty states and keyboard use.

## Separate the project into responsibilities

Even a small page has distinct jobs:

- **HTML** describes the form, headings, filters, task list, and status region.
- **CSS** controls spacing, colors, focus indicators, and layout.
- **JavaScript state** stores task data and the selected filter.
- **Rendering** turns the current state into visible DOM.
- **Event handlers** interpret user actions and update state.

For a tiny demonstration, these parts can live in one HTML file. As the project grows, use separate files or modules when that makes each responsibility easier to find.

A simple state model:

~~~js
const state = {
  tasks: [
    { id: 1, text: "Read the project brief", completed: false },
    { id: 2, text: "Create the page structure", completed: true }
  ],
  filter: "all"
};
~~~

Task objects are application data. The selected filter is also state because it changes what the page displays.

## Let state be the source of truth

When a visitor adds, completes, or removes a task, update state first and then render the page.

~~~js
function addTask(text) {
  state.tasks.push({
    id: nextTaskId++,
    text,
    completed: false
  });

  render();
}
~~~

Avoid making the DOM the only record of data. If the code reconstructs application state from elements, small visual changes can accidentally break data logic. With state as the source of truth, the same data can be rendered after a filter changes.

A rendering function should answer one question: given the current state, what should the visitor see now? It should not secretly add or complete tasks.

## Build semantic HTML first

Use a heading for the page title, a form for task entry, buttons for actions, and a list for tasks. Give the input a visible label.

~~~html
<main>
  <h1>My task list</h1>

  <form id="task-form">
    <label for="task-input">New task</label>
    <input id="task-input" name="task" type="text" required maxlength="120">
    <button type="submit">Add task</button>
  </form>

  <fieldset>
    <legend>Filter tasks</legend>
    <button type="button" data-filter="all" aria-pressed="true">All</button>
    <button type="button" data-filter="active" aria-pressed="false">Active</button>
    <button type="button" data-filter="completed" aria-pressed="false">Completed</button>
  </fieldset>

  <p id="task-count">0 tasks</p>
  <p id="task-empty">No tasks yet. Add one above.</p>
  <ul id="task-list"></ul>
  <p id="task-status" role="status" aria-live="polite"></p>
</main>
~~~

A form supports both the submit button and Enter. The required field and maximum length provide browser-level constraints, while JavaScript can reject whitespace-only input.

Filter buttons change the current view without navigating. The pressed state communicates which filter is selected. Action buttons that are not submit controls should declare button type explicitly.

Start with useful markup before adding behavior. A visible label and a real list explain the structure to browsers, assistive technology, and people reading the code.

## Render elements safely

Task text comes from the visitor. Treat it as text, not markup. Create elements and assign their text through the text-content property.

~~~js
function createTaskRow(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const text = document.createElement("span");
  const removeButton = document.createElement("button");

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.dataset.action = "toggle";
  checkbox.dataset.taskId = String(task.id);

  text.textContent = task.text;

  removeButton.type = "button";
  removeButton.dataset.action = "remove";
  removeButton.dataset.taskId = String(task.id);
  removeButton.textContent = "Remove";

  label.append(checkbox, text);
  item.append(label, removeButton);
  return item;
}
~~~

Do not place visitor-provided text into an HTML parsing property. Parsing data as markup can create unintended elements or executable markup. Text content displays it literally, and element creation makes only the controls the application intends.

Give every control a useful accessible name. A visible **Remove** button can include the task text in its accessible name when that helps distinguish several such buttons. Keep controls usable at narrow viewport widths.

## Handle form submission

Listen for the form submit event. This handles both button activation and Enter.

~~~js
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    status.textContent = "Enter a task before adding it.";
    input.focus();
    return;
  }

  addTask(text);
  form.reset();
  input.focus();
  status.textContent = "Task added.";
});
~~~

Preventing the default action stops a page navigation because this project updates the current page. Trimming prevents a string of spaces from becoming a task. Keep native input constraints in the markup too, and explain rejected values clearly.

Move focus intentionally after submission. Returning focus to the input makes it easy to add another item. Do not clear the field if validation fails.

## Render from current state

A render function selects tasks that match the current filter, creates rows, and updates related messages.

~~~js
function getVisibleTasks() {
  if (state.filter === "active") {
    return state.tasks.filter((task) => !task.completed);
  }

  if (state.filter === "completed") {
    return state.tasks.filter((task) => task.completed);
  }

  return state.tasks;
}

function render() {
  const visibleTasks = getVisibleTasks();
  const fragment = document.createDocumentFragment();

  for (const task of visibleTasks) {
    fragment.append(createTaskRow(task));
  }

  taskList.replaceChildren(fragment);
  taskEmpty.hidden = visibleTasks.length > 0;
  updateCount();
  updateFilterButtons();
}
~~~

A fragment prepares rows before insertion. For a small list, the performance benefit is not the main point; it makes the batch update clear. Replacing children prevents rows from a previous filter from lingering.

An empty collection and a filter with no matches are different situations. If there are no tasks at all, invite the visitor to add the first one. If tasks exist but none match the selected filter, explain that the current view is empty. Do not make an empty page look like a rendering failure.

## Handle actions with events

A click on a nested control bubbles through its ancestors. Event delegation uses one listener on the list instead of attaching a listener to every row after every render.

~~~js
taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action='remove']");

  if (!button || !taskList.contains(button)) {
    return;
  }

  const taskId = Number(button.dataset.taskId);
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  render();
});
~~~

The list remains the listener when render replaces its children. The handler verifies that the click came from the expected button inside this list.

Checkbox changes use the change event. Find the task by identifier, update its completion value, then render again.

~~~js
function toggleTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  task.completed = !task.completed;
  render();
}
~~~

Filter actions update state.filter and render. Identifiers connect an element action to one data item. Do not use a visible array position as a permanent identity: sorting, filtering, and deletion can change positions.

When an action removes the focused element, choose a useful destination for focus. It can move to the next task's remove button, the previous task's remove button, or the input when the list becomes empty. Leaving focus on a removed control makes keyboard navigation confusing.

## Keep filters, counts, and status consistent

Total count and visible count answer different questions. A message can say **3 tasks total, 1 shown**. Update it after every state change.

~~~js
function updateFilterButtons() {
  for (const button of filterButtons) {
    const selected = button.dataset.filter === state.filter;
    button.setAttribute("aria-pressed", String(selected));
  }
}
~~~

A visible selected style is useful, but color alone should not carry the meaning. The pressed state exposes the selected filter to assistive technology. Keep buttons in a sensible keyboard order and provide a visible focus indicator.

A status region can communicate an advisory update without moving focus:

~~~js
status.textContent = "Task marked complete.";
~~~

Keep status messages short and relevant. Do not announce the entire task list after every action. The visitor should be able to continue with the control they activated.

## Plan for common interface states

| Situation | Expected behavior |
| --- | --- |
| No tasks exist | Show a helpful first-task message |
| Input is empty | Explain what is needed and keep the field available |
| Input contains only spaces | Reject it after trimming |
| A task is added | Add one active task, update counts, and keep focus useful |
| A task is completed | Update its appearance and filtered views |
| A task is removed | Remove it and choose a useful focus destination |
| A selected filter has no matches | Explain that the current view is empty |
| Text contains angle brackets or markup-like content | Display it as literal text |
| The list is filtered | Keep all tasks in state and change only which are shown |

Thinking through states early prevents scattered fixes later.

## Keep the project understandable

Use names that describe behavior: **addTask**, **toggleTask**, **getVisibleTasks**, and **render** are easier to review than vague names. Keep handlers small: read the event, check the target, and call a state-changing function.

Do not register listeners from inside render. Rendering multiple times would attach duplicate listeners. Attach handlers to stable elements once, then replace the changing list content.

A larger project might use this structure:

~~~text
task-list/
  index.html
  styles.css
  src/
    state.js
    render.js
    events.js
    app.js
~~~

Do not create folders only to make a small project look advanced. Split files when that helps people find, reuse, and change responsibilities.

## Review the finished project

Use the initial acceptance checklist. Try the interface with mouse and keyboard. Confirm that:

- The form is labeled and Enter submits it.
- Whitespace-only values are rejected.
- Task text is displayed literally.
- Add, complete, filter, and remove update state and the visible page.
- Counts and empty messages match the current data.
- Focus remains predictable after adding or removing a task.
- The selected filter is visible and exposed through its pressed state.
- Status messages are concise.
- The browser console has no unexpected errors.

The next chapter adds API data to a browser application. A clear interface and state model make that extension easier.

## Common mistakes

- Writing handlers before defining expected behavior.
- Treating DOM elements as the only copy of application data.
- Updating state but forgetting to render, or rendering without updating state.
- Attaching listeners to every row during each render.
- Registering listeners inside render and accumulating duplicates.
- Parsing visitor-provided text as HTML.
- Accepting whitespace-only input because the raw string is non-empty.
- Using a link for an action that does not navigate.
- Omitting explicit button types for filter and remove actions.
- Making the selected filter visible only through color.
- Forgetting empty and no-results states.
- Removing the focused element without choosing a focus destination.
- Announcing too much content after every action.

## Key points

- Begin with user stories and observable acceptance criteria.
- Use semantic HTML for forms, controls, and lists.
- Keep application data in state and derive the interface by rendering it.
- Update state first, then render.
- Create DOM elements and set text as text.
- Use event delegation for repeated child controls.
- Keep filters, counts, empty states, and status messages synchronized.
- Treat keyboard focus and accessible names as part of interaction behavior.
- Organize functions and files around clear responsibilities.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [140 - Feature detection, compatibility, and graceful fallback](140-feature-detection-compatibility-and-graceful-fallback.md) | [Open Q&A](../qnas/141-browser-project-build-an-interactive-interface.md) | [Open example](../examples/141-browser-project-build-an-interactive-interface.md) | [142 - Browser project: build an API-driven application](142-browser-project-build-an-api-driven-application.md) |
