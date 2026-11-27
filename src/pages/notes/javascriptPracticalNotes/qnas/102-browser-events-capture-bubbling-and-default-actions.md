# 102 - Browser events: capture, bubbling, and default actions: Questions and Answers

Use these questions to review event listeners, propagation, and browser default actions. Each answer follows its question, with an explanation where it helps clarify the behavior.

## Multiple-choice questions

### 1. What does **addEventListener("click", callback)** do?

- A. Runs **callback** immediately
- B. Registers **callback** to run when a matching click event reaches the element
- C. Removes all click listeners
- D. Prevents the browser's click behavior

**Answer: B. Registers callback to run when a matching click event reaches the element.**

The callback runs when the browser dispatches a click event to the element or when a click event propagates to it.

### 2. What is the usual order when a bubbling click is dispatched at a button inside a parent element?

- A. Bubble phase, target phase, capture phase
- B. Target phase, capture phase, bubble phase
- C. Capture phase, target phase, bubble phase
- D. Only the target phase

**Answer: C. Capture phase, target phase, bubble phase.**

The event travels down through ancestors during capture, reaches its target, and then travels up through ancestors during bubbling if the event bubbles.

### 3. A click occurs on a **span** inside a button. A click listener is running on the button. What does **event.target** usually identify?

- A. The **span** that received the click
- B. The **document**
- C. The button's parent
- D. The callback function

**Answer: A. The span that received the click.**

The event target is where the event began. The button's listener can still run because the event propagates to the button.

### 4. In that same listener, what does **event.currentTarget** identify?

- A. Always the original target
- B. The button whose listener is currently running
- C. The first element in the document
- D. The default action

**Answer: B. The button whose listener is currently running.**

**currentTarget** identifies the object whose callback is currently being invoked. It can differ from **target**.

### 5. Which option registers a listener during the capture phase?

- A. **{ bubble: true }**
- B. **{ capture: true }**
- C. **{ target: true }**
- D. **{ default: true }**

**Answer: B. { capture: true }.**

The **capture** option makes the listener run while the event travels down toward its target.

### 6. Which method asks the browser to cancel a cancelable event's default action?

- A. **stopPropagation()**
- B. **preventDefault()**
- C. **removeEventListener()**
- D. **stopImmediatePropagation()**

**Answer: B. preventDefault().**

For example, calling **preventDefault()** in a form's submit listener can stop the browser's normal form submission.

### 7. What does **stopPropagation()** do?

- A. Cancels every default action.
- B. Stops the event from continuing to other objects along its propagation path.
- C. Removes all listeners from the target.
- D. Stops other listeners on the same target from running.

**Answer: B. Stops the event from continuing to other objects along its propagation path.**

Other listeners on the same current target can still run. **stopImmediatePropagation()** also prevents later listeners on that target from running.

### 8. What is true about **preventDefault()** and event propagation?

- A. It always stops propagation.
- B. It removes the target from the DOM.
- C. It can cancel a default action without stopping propagation.
- D. It prevents all listeners from running.

**Answer: C. It can cancel a default action without stopping propagation.**

Propagation and default behavior are separate. Use the method that matches the behavior you intend to change.

### 9. What does the **once: true** listener option do?

- A. Runs the listener only once, then removes it.
- B. Delays the listener for one second.
- C. Runs the listener only during capture.
- D. Makes the event non-cancelable.

**Answer: A. Runs the listener only once, then removes it.**

It is useful for behavior that should happen on the first matching event only.

### 10. What happens if **preventDefault()** is called from a passive listener?

- A. The default action is canceled successfully.
- B. The event is removed from the DOM.
- C. The call cannot cancel the default action.
- D. The listener runs during capture automatically.

**Answer: C. The call cannot cancel the default action.**

A passive listener declares that it will not cancel the event. Use a non-passive listener when cancellation is required.

## Objective questions

### 11. True or false: **event.target** and **event.currentTarget** always refer to the same object.

**Answer: False.**

A listener on a parent can receive an event whose target is a nested descendant. The current target is the parent whose listener is running.

### 12. True or false: Every event bubbles.

**Answer: False.**

Propagation behavior depends on the event. For example, **focus** does not bubble, while **focusin** does.

### 13. True or false: Calling **preventDefault()** stops a click from reaching ancestor listeners.

**Answer: False.**

It may cancel the click's default action, but the event can continue through its propagation path. Use a propagation method when you specifically need to stop that path.

### 14. True or false: Calling **stopPropagation()** prevents the browser's default action.

**Answer: False.**

It controls propagation, not the default action. Use **preventDefault()** to cancel a cancelable default action.

### 15. Fill in the blank: **event.________** is true when the event's default action was successfully canceled.

**Answer: defaultPrevented.**

Check **event.defaultPrevented** after calling **preventDefault()** to see whether the event was canceled.

### 16. True or false: Returning **false** from an **addEventListener()** callback cancels a link's default navigation.

**Answer: False.**

Use **event.preventDefault()** explicitly when the default action should be canceled.

### 17. True or false: A listener registered with **once: true** stays registered after its first invocation.

**Answer: False.**

The listener is removed after it runs once.

### 18. Fill in the blank: To remove a listener, pass the same event type, callback reference, and matching **________** setting.

**Answer: capture.**

The capture setting participates in identifying the listener to remove. Keep a reference to the callback function if it will need to be removed later.

## Short-answer and reasoning questions

### 19. Describe the capture, target, and bubble phases.

**Answer:** During capture, the event travels from outer ancestors down toward the target. At the target, listeners on the target can run. During bubbling, a bubbling event travels back up through ancestors.

The target phase is the point where the event reaches its target. The capture and bubble phases describe travel through the target's ancestor path.

### 20. Why can a parent listener receive a click whose target is a child element?

**Answer:** Many click events bubble through ancestor elements.

The event keeps its original target while moving through the path. A listener attached to an ancestor can respond to it, and **currentTarget** identifies that ancestor during its callback.

### 21. Explain the difference between **stopPropagation()** and **stopImmediatePropagation()**.

**Answer:** **stopPropagation()** prevents the event from continuing to other objects along the propagation path. Other listeners on the current target can still run.

**stopImmediatePropagation()** also prevents later listeners on that same target from running.

### 22. What is a default action? Give two examples.

**Answer:** A default action is browser behavior associated with an interaction.

Examples include navigating when a link is activated and submitting a form when its submit button is activated. A checkbox also has default activation behavior that changes its checked state.

### 23. What are two conditions for **preventDefault()** to cancel a default action?

**Answer:** The event must be cancelable, and the listener must not be passive.

If the event is not cancelable, or the callback is passive, **preventDefault()** cannot cancel the default action.

### 24. Why should event listeners usually use **addEventListener()** instead of putting JavaScript in an HTML attribute?

**Answer:** **addEventListener()** keeps behavior in JavaScript, supports multiple listeners for the same event, and provides options for capture, one-time execution, passive behavior, and cleanup.

It also avoids mixing executable code into markup.

### 25. Why might **removeEventListener()** fail to remove a listener?

**Answer:** The callback reference or capture setting may not match the listener that was added.

Creating a new anonymous function that looks the same does not create the same function object. Store the original callback when manual removal is needed.

### 26. How is canceling an event different from preventing an event from reaching another listener?

**Answer:** Canceling with **preventDefault()** affects the event's browser default action. Propagation methods affect which objects along the event path receive it.

For example, a form submit handler can cancel navigation or submission while the submit event still reaches other listeners.

## Code-reading and coding questions

### 27. What is printed when the button is clicked?

~~~js
const parent = document.querySelector("#parent");
const button = document.querySelector("#button");

parent.addEventListener("click", function () {
  console.log("parent");
});

button.addEventListener("click", function () {
  console.log("button");
});
~~~

**Answer:**

~~~text
button
parent
~~~

The button is the target, so its listener runs first. The click then bubbles to the parent.

### 28. A button contains a span. A click listener is attached to the button. What do **target** and **currentTarget** refer to when the span is clicked?

**Answer:** **event.target** refers to the span. **event.currentTarget** refers to the button.

The button is running the listener, but the event began at the nested span.

### 29. Write a form submit listener that prevents normal submission and logs whether cancellation succeeded.

**Answer:**

~~~js
form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event.defaultPrevented);
});
~~~

For a normal cancelable submit event and a non-passive listener, the output is **true**. The listener still runs as part of event propagation.

### 30. Write two listeners on a parent around a button: one capture listener and one bubble listener. Log each phase.

**Answer:**

~~~js
parent.addEventListener("click", function () {
  console.log("capture");
}, { capture: true });

parent.addEventListener("click", function () {
  console.log("bubble");
});
~~~

When the nested button is clicked, the parent's capture listener runs before the target listener. Its bubble listener runs afterward if the event bubbles and propagation is not stopped.

### 31. Write a click listener that runs only once.

**Answer:**

~~~js
button.addEventListener("click", function () {
  console.log("This runs once.");
}, { once: true });
~~~

After the first matching event invokes the listener, the browser removes it.

### 32. Write code that adds a listener tied to an **AbortController**, then removes it by aborting the controller.

**Answer:**

~~~js
const controller = new AbortController();

button.addEventListener("click", handleClick, {
  signal: controller.signal
});

controller.abort();
~~~

Aborting the controller removes listeners registered with its signal. This is useful when a group of listeners shares a lifetime.

### 33. A link's click handler calls **stopPropagation()**, but the browser still navigates. Why?

**Answer:** **stopPropagation()** affects event propagation, not the link's default navigation.

If the code intentionally replaces navigation, call **event.preventDefault()** in the click listener and provide the replacement behavior.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [101 - Attributes, classes, forms, and styles from JavaScript](../qnas/101-attributes-classes-forms-and-styles-from-javascript.md) | [Open lesson](../lessons/102-browser-events-capture-bubbling-and-default-actions.md) | [Open example](../examples/102-browser-events-capture-bubbling-and-default-actions.md) | [103 - Event delegation and reusable handlers](../lessons/103-event-delegation-and-reusable-handlers.md) |
