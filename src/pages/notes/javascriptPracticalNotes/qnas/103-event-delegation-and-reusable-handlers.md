# 103 - Event delegation and reusable handlers: Questions and Answers

Use these questions to review delegated event handling, reusable callbacks, and matching actions safely. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is event delegation?

- A. Registering one event listener on a shared ancestor to handle matching descendant events
- B. Moving an element to a new parent
- C. Replacing event handlers with CSS
- D. Creating one event object for every element

**Answer: A. Registering one event listener on a shared ancestor to handle matching descendant events.**

A bubbling event from a descendant reaches the ancestor. The listener can inspect the original target and decide whether it represents an action the component owns.

### 2. Why can a delegated listener handle a button added after the listener was registered?

- A. The browser automatically copies listeners to new nodes.
- B. The listener is on a stable ancestor, and the new button's bubbling event reaches that ancestor.
- C. **querySelectorAll()** always returns a live list.
- D. A new button does not need an event.

**Answer: B. The listener is on a stable ancestor, and the new button's bubbling event reaches that ancestor.**

The ancestor was already listening. When a new descendant is clicked, its event path includes the ancestor.

### 3. In a listener delegated to a list, what does **event.currentTarget** refer to?

- A. The list that owns the listener
- B. Always the nested child that received the click
- C. The first button in the document
- D. The callback's return value

**Answer: A. The list that owns the listener.**

In a delegated handler, **currentTarget** identifies the element with the listener. The original clicked element is **event.target**.

### 4. What does **target.closest("button[data-action]")** return?

- A. Only the target if it is already a button
- B. The nearest matching button at or above the target, or **null**
- C. Every matching button in the document
- D. The event's current target

**Answer: B. The nearest matching button at or above the target, or null.**

**closest()** starts with the element itself and checks its element ancestors. It does not return all matches.

### 5. Why should a delegated handler check **currentTarget.contains(match)**?

- A. To convert the match into a text node
- B. To ensure that the matching action belongs to this listener's component
- C. To make the event bubble
- D. To prevent the button from being clicked

**Answer: B. To ensure that the matching action belongs to this listener's component.**

**closest()** can find a matching ancestor above the component. The containment check prevents the handler from acting on something outside its own root.

### 6. Which event is normally a good candidate for delegation to an ancestor?

- A. **click**
- B. **focus**
- C. **blur**
- D. Any event, whether it bubbles or not

**Answer: A. click.**

Click events bubble. **focus** and **blur** do not bubble. For delegated focus behavior, use **focusin** or a capture listener when appropriate.

### 7. Which option safely handles a click on a nested span inside an action button?

- A. Compare **event.target** directly with the button only.
- B. Use **event.target.closest("button[data-action]")**.
- C. Use **event.currentTarget.closest("button")**.
- D. Ignore the event target.

**Answer: B. Use event.target.closest("button[data-action]").**

The span can be the event target. **closest()** finds the action button containing it.

### 8. How can one callback be reused for several directly registered buttons?

- A. Give each button a different callback name in HTML.
- B. Add the same function reference to each button and read **event.currentTarget**.
- C. Use **event.target** to find every button on the page.
- D. Call **stopPropagation()** on every button.

**Answer: B. Add the same function reference to each button and read event.currentTarget.**

Each callback invocation has a different **currentTarget**, so the same function can identify which button owns that invocation.

### 9. Why should a remove button inside a form have **type="button"**?

- A. It makes the event bubble.
- B. It prevents that action button from acting as a form submit button.
- C. It adds a remove event automatically.
- D. It makes **closest()** work.

**Answer: B. It prevents that action button from acting as a form submit button.**

A button in a form can submit by default when its type is omitted. Set **type="button"** for a non-submit action.

### 10. Which statement about **data-action** is correct?

- A. It grants permission to perform a protected operation.
- B. It is a convenient way to label which interface action a button represents.
- C. It automatically registers an event listener.
- D. It prevents other scripts from changing the button.

**Answer: B. It is a convenient way to label which interface action a button represents.**

A data attribute describes interface intent. It is not a security boundary or authorization check.

## Objective questions

### 11. True or false: A listener attached to a parent can receive a bubbling click from a descendant.

**Answer: True.**

The click travels up the event path and can reach the parent listener.

### 12. True or false: A delegated click listener automatically handles matching descendants inserted later under its container.

**Answer: True.**

The listener is attached to the stable container. New descendants' bubbling click events still reach that container.

### 13. True or false: **event.target** always identifies the delegated container.

**Answer: False.**

The target is where the event began. The delegated container is the current target while its listener runs.

### 14. True or false: **closest()** may find an ancestor outside the component root.

**Answer: True.**

It walks through inclusive element ancestors. Check that the result is contained by **event.currentTarget** before acting.

### 15. Fill in the blank: **element.closest(selector)** returns **________** when no element in its inclusive ancestor chain matches.

**Answer: null.**

Always handle the possibility that no matching element exists.

### 16. True or false: An event that does not bubble can never be observed by an ancestor.

**Answer: False.**

A non-bubbling event can still be observed during capture if a capture listener is registered on an ancestor. A bubbling counterpart may also be available.

### 17. True or false: Using one delegated listener always makes a page faster and simpler.

**Answer: False.**

Delegation is useful when it clarifies shared behavior or supports dynamic descendants. A direct listener can be clearer for one static control or a non-bubbling event.

### 18. True or false: A **data-action** value can replace server-side authorization.

**Answer: False.**

The DOM is not a trusted security boundary. Sensitive operations still need application and server-side validation.

## Short-answer and reasoning questions

### 19. Explain why **event.target** may not be the button whose action should run.

**Answer:** The click may begin on a nested child such as a span or icon inside the button.

The handler can use **closest()** to find the nearest matching action button from the actual target.

### 20. Why is a containment check useful after calling **closest()**?

**Answer:** **closest()** can find a matching ancestor beyond the delegated component.

Checking **event.currentTarget.contains(match)** ensures that the matched action is owned by the container whose listener is running.

### 21. What is the difference between direct listeners and delegation for dynamically created buttons?

**Answer:** Direct listeners must be attached to each new button, or the button will not have that direct behavior. With delegation, a stable ancestor already has one listener, and new descendants can use it through event bubbling.

### 22. When might a direct listener be preferable to delegation?

**Answer:** A direct listener can be simpler for one static control, for an event that does not bubble, or when the behavior belongs specifically to one element.

Delegation is a design choice, not a requirement for every event.

### 23. Why should a delegated handler use a narrow selector such as **button[data-action]**?

**Answer:** A narrow selector reduces accidental matches and makes it clear which descendants are actionable.

The handler can then route based on a known set of action names.

### 24. What does **event.currentTarget** provide that **event.target** does not?

**Answer:** It identifies the element whose listener callback is running.

That can be the delegated root or one of several controls using the same reusable callback.

### 25. Why should an event target be checked before calling **closest()**?

**Answer:** An event target is an **EventTarget** and may not always be an element with **closest()**.

Checking that it is an **Element** ensures it supports element selector methods before the handler uses them.

### 26. How does delegation relate to event bubbling?

**Answer:** The event must travel from the descendant to the ancestor that owns the delegated listener.

If the event does not bubble, a normal delegated bubble listener will not receive it. Use capture, a bubbling counterpart, or a direct listener as appropriate.

## Code-reading and coding questions

### 27. What is the value of **event.target** and **event.currentTarget** when the span is clicked?

~~~html
<ul id="tasks">
  <li><button data-action="remove"><span id="icon">Remove</span></button></li>
</ul>
~~~

~~~js
document.querySelector("#tasks").addEventListener("click", function (event) {
  console.log(event.target.id);
  console.log(event.currentTarget.id);
});
~~~

**Answer:**

~~~text
icon
tasks
~~~

The span receives the click, and the list owns the listener.

### 28. Write a delegated click handler that finds a **button[data-action]** and ignores matches outside the list.

**Answer:**

~~~js
list.addEventListener("click", function (event) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const button = target.closest("button[data-action]");

  if (!button || !event.currentTarget.contains(button)) {
    return;
  }

  console.log(button.dataset.action);
});
~~~

The element guard makes **closest()** safe to call. The containment check keeps the action inside the delegated list.

### 29. Write one handler that toggles a task's completed class or removes the task based on **data-action**.

**Answer:**

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

  if (button.dataset.action === "complete") {
    task.classList.toggle("is-complete");
  } else if (button.dataset.action === "remove") {
    task.remove();
  }
}

taskList.addEventListener("click", handleTaskAction);
~~~

One list listener routes both actions. The handler also works when the task rows are created later.

### 30. Write code that creates a new remove button for a task when delegation is already registered on **taskList**.

**Answer:**

~~~js
const button = document.createElement("button");
button.type = "button";
button.dataset.action = "remove";
button.textContent = "Remove";

taskItem.append(button);
taskList.append(taskItem);
~~~

No listener is attached to the new button. Its clicks bubble to **taskList**, which already handles the **remove** action.

### 31. Write a reusable direct handler that reads the ID of its panel from the clicked button's **data-panel-id**.

**Answer:**

~~~js
function handlePanelToggle(event) {
  const button = event.currentTarget;
  const panel = document.getElementById(button.dataset.panelId);

  if (!panel) {
    return;
  }

  panel.hidden = !panel.hidden;
}

for (const button of document.querySelectorAll("[data-panel-id]")) {
  button.addEventListener("click", handlePanelToggle);
}
~~~

The same function is registered on each button. **currentTarget** identifies the particular button whose listener is running.

### 32. A handler uses this check:

~~~js
if (event.target.matches("button[data-action]")) {
  // handle action
}
~~~

Why can it miss a button click, and how can it be improved?

**Answer:** If the user clicks a nested span inside the button, the span is **event.target** and does not match the button selector.

Use **closest()** and check that the result is within the delegated root:

~~~js
const button = event.target.closest("button[data-action]");

if (button && event.currentTarget.contains(button)) {
  // handle action
}
~~~

In production code, first check that **event.target** is an **Element** before calling **closest()**.

### 33. A form contains a delegated remove button without a **type** attribute. What problem can occur, and how should it be fixed?

**Answer:** The button can act as a submit button and submit the form when clicked.

Set **type="button"** on the remove button so it performs its row action without submitting the form.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [102 - Browser events: capture, bubbling, and default actions](../qnas/102-browser-events-capture-bubbling-and-default-actions.md) | [Open lesson](../lessons/103-event-delegation-and-reusable-handlers.md) | [Open example](../examples/103-event-delegation-and-reusable-handlers.md) | [104 - Forms, input validation, and submission](../lessons/104-forms-input-validation-and-submission.md) |
