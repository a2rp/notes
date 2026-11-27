# 103 - Event delegation and reusable handlers

When several buttons inside one component perform related actions, attaching a separate listener to each button can create repetitive setup. Event delegation handles those actions with one listener on a shared ancestor.

Delegation depends on event propagation. A bubbling event from a descendant travels to its ancestors, where one listener can inspect the original target and decide which action to handle. This also works for matching descendants added after the listener was registered.

## Learning goals

By the end of this chapter, you should be able to:

- Explain how event bubbling makes delegation possible.
- Register one listener on a shared container to handle descendant actions.
- Use **event.target**, **event.currentTarget**, and **closest()** safely.
- Keep a delegated match inside the component that owns the listener.
- Route actions with **data-action** and a clear handler.
- Reuse one callback across multiple controls.
- Identify event types that need direct listeners or capture instead.
- Choose delegation when it simplifies ownership, not just to reduce listener count.

## The basic idea

A direct listener belongs to one specific control:

~~~js
for (const button of document.querySelectorAll(".remove-button")) {
  button.addEventListener("click", handleRemove);
}
~~~

If the page later creates another **.remove-button**, that new button does not get the listener from this earlier loop. The loop only saw the controls that existed when it ran.

With event delegation, attach one listener to a stable ancestor:

~~~js
const list = document.querySelector("#task-list");

list.addEventListener("click", function (event) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const removeButton = target.closest(".remove-button");

  if (!removeButton || !list.contains(removeButton)) {
    return;
  }

  removeButton.closest("li").remove();
});
~~~

When a click on a descendant bubbles to **list**, the listener checks whether the event came from a remove button or something inside one. The list is already listening when new rows are added, so the new buttons work without new listeners.

## target, currentTarget, and closest()

In a delegated listener:

- **event.target** is the element where the event began. It may be a nested icon or span inside the actionable button.
- **event.currentTarget** is the ancestor that owns the delegated listener.
- **target.closest(selector)** finds the target itself or its nearest matching element ancestor. It returns **null** if no element matches.

This is why matching only **event.target** can be fragile:

~~~js
list.addEventListener("click", function (event) {
  if (event.target.matches(".remove-button")) {
    // This misses clicks on a span inside the button.
  }
});
~~~

Use **closest()** when descendants inside the button should trigger the same action.

## Keep matches inside their component

**closest()** can find a matching ancestor above the component where the listener is installed. Check that the result belongs to the listener's container before acting on it.

~~~js
function handleListClick(event) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const actionButton = target.closest("button[data-action]");

  if (!actionButton || !event.currentTarget.contains(actionButton)) {
    return;
  }

  // Handle an action button that belongs to this list.
}
~~~

**currentTarget** makes the same callback reusable for multiple containers. It identifies the current container for this invocation.

Using a clear, narrow selector such as **button[data-action]** helps avoid matching unrelated elements.

## Route actions with data-action

When a component has multiple related actions, put an action name on each button and route it in one handler:

~~~html
<ul id="tasks">
  <li>
    <span>Review events</span>
    <button type="button" data-action="complete">Complete</button>
    <button type="button" data-action="remove">Remove</button>
  </li>
</ul>
~~~

~~~js
function handleTaskAction(event) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const button = target.closest("button[data-action]");

  if (!button || !event.currentTarget.contains(button)) {
    return;
  }

  const task = button.closest("li");

  if (!task) {
    return;
  }

  switch (button.dataset.action) {
    case "complete":
      task.classList.toggle("is-complete");
      break;
    case "remove":
      task.remove();
      break;
  }
}

document.querySelector("#tasks").addEventListener("click", handleTaskAction);
~~~

The **data-action** value selects the operation. Keep the actions explicit. If an action changes data or affects permissions, validate that action in the application logic too. A data attribute is not a security boundary.

Use **type="button"** for action buttons inside a form when they should not submit it. A button inside a form can submit by default if its type is omitted.

## Dynamic descendants are handled automatically

The delegated listener belongs to the stable list, not to each row. A row added later still has the list in its event path, so a bubbling click can reach the same listener.

~~~js
const taskList = document.querySelector("#tasks");

function addTask(label) {
  const item = document.createElement("li");
  const text = document.createElement("span");
  const removeButton = document.createElement("button");

  text.textContent = label;
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.dataset.action = "remove";

  item.append(text, removeButton);
  taskList.append(item);
}
~~~

Because the task list already owns **handleTaskAction**, the new remove button works as soon as it is inserted. There is no need to attach another listener to that button.

## Reuse a handler with currentTarget

One event handler function can be attached to several controls. **event.currentTarget** tells the function which control triggered that listener invocation.

~~~js
function handlePanelToggle(event) {
  const button = event.currentTarget;
  const panel = document.getElementById(button.dataset.panelId);

  if (!panel) {
    return;
  }

  const isExpanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isExpanded));
  panel.hidden = isExpanded;
}

for (const button of document.querySelectorAll("[data-panel-id]")) {
  button.addEventListener("click", handlePanelToggle);
}
~~~

The same callback is reused, but each button has its own **data-panel-id** value. Each panel button also needs an accurate initial **aria-expanded** value and an associated panel.

If these controls are created dynamically under one stable parent, the parent can delegate the click instead. Direct reusable listeners and delegation solve related but different setup problems.

## Which events can be delegated?

Delegation works when the event propagates from the descendant to the listener's ancestor. **click** and common form events such as **input**, **change**, and **submit** can bubble.

Some useful events do not bubble. For example, **focus** and **blur** do not bubble. You can use bubbling counterparts such as **focusin** and **focusout**, or listen for **focus** in the capture phase.

Events that cross a Shadow DOM boundary have additional retargeting and composed-path rules. A component should expose an appropriate event or API rather than assuming an outside listener can inspect every internal element.

## Delegation trade-offs

Delegation is useful when many similar descendants share behavior or when descendants are added and removed dynamically. It can reduce repeated setup and keep a component's actions in one place.

It is not automatically faster or clearer for every control. A direct listener can be simpler for a single button or for an event that does not bubble. Delegated handlers also need careful matching and action routing.

## Common mistakes

### Matching only event.target

A click on a nested span may have that span as the target, not the button. Use **closest()** to find the actionable ancestor.

### Matching outside the component

**closest()** can walk above the container. Check **currentTarget.contains(match)** before changing anything.

### Delegating an event that does not bubble

A normal bubble listener on a parent will not receive a non-bubbling event. Use a bubbling counterpart or capture when appropriate.

### Adding a listener to each new row by mistake

When delegation is used, attach the listener to the stable container once. Do not also add per-button listeners for the same action unless two separate behaviors are intentional.

### Using a submit button for a row action

A button without an explicit type inside a form can submit the form. Use **type="button"** for actions such as remove or complete.

### Treating a data-action value as trusted authorization

The DOM can be changed by scripts or developer tools. A data attribute only describes an interface action. Validate important operations in the application logic and on the server when applicable.

## Try it yourself

1. Replace individual remove-button listeners with one listener on their list.
2. Put a **span** inside each action button and confirm **closest()** still finds its button.
3. Add a new row after registering the list listener and test its actions.
4. Add **complete** and **remove** actions and route both through a **switch** statement.
5. Attach the same callback to two panel buttons and use **currentTarget** to identify the control.
6. Add a matching action button outside the list and confirm the containment check ignores it.
7. Compare delegated **focusin** with a captured **focus** listener.
8. Remove **type="button"** from an action inside a form and observe the submit behavior, then restore it.
9. Explain why delegation is not always the best choice for a single static control.
10. Inspect which elements are visible through **event.target.closest()** when an event originates inside a Shadow DOM component.

## Key points

- Delegation uses a bubbling event and one listener on a stable ancestor.
- **event.target** identifies where the event began; **event.currentTarget** identifies the delegated container.
- **closest()** finds an actionable element even when a nested child receives the event.
- Check that the match is inside **currentTarget** before handling it.
- A delegated listener also handles matching descendants added later.
- A reusable callback can serve multiple controls and use **currentTarget** to identify the current control.
- Non-bubbling events need a bubbling counterpart, capture, or a direct listener.
- Use delegation when it simplifies behavior and ownership; do not apply it automatically.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [102 - Browser events: capture, bubbling, and default actions](102-browser-events-capture-bubbling-and-default-actions.md) | [Open Q&A](../qnas/103-event-delegation-and-reusable-handlers.md) | [Open example](../examples/103-event-delegation-and-reusable-handlers.md) | [104 - Forms, input validation, and submission](104-forms-input-validation-and-submission.md) |
