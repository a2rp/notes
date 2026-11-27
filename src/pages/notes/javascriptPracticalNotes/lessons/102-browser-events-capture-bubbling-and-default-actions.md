# 102 - Browser events: capture, bubbling, and default actions

A browser event reports that something happened. It can represent user interaction, a form update, a page lifecycle change, or another browser activity. JavaScript listens for events to respond at the right time.

This chapter explains how to register listeners, follow an event through the DOM, distinguish the event target from the listener's current element, and decide whether a browser's default action should continue.

## Learning goals

By the end of this chapter, you should be able to:

- Register and remove event listeners with **addEventListener()** and **removeEventListener()**.
- Read useful event properties such as **type**, **target**, **currentTarget**, and **defaultPrevented**.
- Describe the capture, target, and bubble phases.
- Explain the difference between **stopPropagation()** and **stopImmediatePropagation()**.
- Cancel a cancelable default action with **preventDefault()**.
- Explain why preventing a default action does not stop propagation.
- Use listener options such as **capture**, **once**, **passive**, and **signal**.
- Choose native browser behavior when it already provides useful interaction.

## Events and listeners

An event is an object that describes something that happened. Examples include **click**, **input**, **change**, **submit**, **keydown**, and **focus**.

Add a listener with **addEventListener(type, callback)**:

~~~js
const button = document.querySelector("#save");

button.addEventListener("click", function (event) {
  console.log("The button was activated.");
  console.log(event.type);
});
~~~

The callback runs when a matching event reaches the element. The browser passes the event object to the callback. Prefer **addEventListener()** for registering behavior. It allows multiple listeners for the same event and keeps JavaScript separate from markup.

## Useful event properties

An event object provides information about the event and where a listener is running:

- **event.type** is the event name, such as **"click"**.
- **event.target** is the original target where the event was dispatched.
- **event.currentTarget** is the object whose listener is currently running.
- **event.eventPhase** indicates whether the event is in the capture, target, or bubble phase.
- **event.bubbles** indicates whether the event propagates through ancestors during the bubble phase.
- **event.cancelable** indicates whether its default action can be canceled.
- **event.defaultPrevented** indicates whether **preventDefault()** successfully canceled the default action.

A listener on a parent can receive an event whose **target** is a nested child. **currentTarget** still identifies the parent whose listener is running.

**currentTarget** is useful while the listener callback runs. Do not save the event object and expect its **currentTarget** to keep pointing at the listener's element afterward.

## The three phases of event propagation

When an event is dispatched to a node in the DOM, it can travel through three phases:

1. **Capture phase:** the event travels from outer ancestors down toward the target.
2. **Target phase:** the event reaches the target.
3. **Bubble phase:** if the event bubbles, it travels back up through the target's ancestors.

For a button nested inside a **div**, the **div** can receive the event during capture, the button receives it at the target, and the **div** can receive it again during bubbling.

~~~js
const area = document.querySelector("#area");
const button = document.querySelector("#inner-button");

area.addEventListener("click", function () {
  console.log("Area capture");
}, { capture: true });

button.addEventListener("click", function () {
  console.log("Button target");
});

area.addEventListener("click", function () {
  console.log("Area bubble");
});
~~~

Clicking the button produces:

~~~text
Area capture
Button target
Area bubble
~~~

Capture listeners are registered with **{ capture: true }**. Without that option, a listener normally runs at the target and during bubbling, not while the event travels down through ancestors.

Not every event bubbles. Check the event's behavior before relying on a parent bubble listener. For example, **focus** does not bubble, while **focusin** does.

## Target and currentTarget are different

Suppose a button contains a **span** and a listener is attached to the button. When someone clicks the span:

- **event.target** is the span that received the click.
- **event.currentTarget** is the button whose listener is running.

~~~js
button.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.currentTarget);
});
~~~

If the listener is on an ancestor, **currentTarget** is that ancestor. This distinction matters when an event travels through nested elements.

## Stop propagation when there is a specific reason

**stopPropagation()** prevents the event from continuing to other objects along its propagation path. It does not cancel a link, submit, or another default action. It also does not prevent other listeners on the same current target from running.

~~~js
button.addEventListener("click", function (event) {
  event.stopPropagation();
});
~~~

**stopImmediatePropagation()** also prevents later listeners on the same target from running.

Do not stop propagation by default. Other code may rely on receiving the event, and stopping it can make component behavior harder to understand. Prefer handling an event at the appropriate level.

## Default actions and preventDefault()

Some browser events are associated with a default action. Activating a link can navigate. Submitting a form can submit its data. Activating a checkbox can change its checked state.

Call **preventDefault()** when the code intentionally replaces a cancelable default action:

~~~js
const form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Handle this submission in JavaScript.");
});
~~~

For a cancelable event and a non-passive listener, **preventDefault()** asks the browser to cancel its default action. Check **event.defaultPrevented** to see whether cancellation succeeded.

Preventing a default action does not stop the event from propagating. Stopping propagation does not cancel the default action. These solve different problems.

Calling **preventDefault()** on a non-cancelable event has no effect. It also has no effect in a **passive** listener. A listener that needs to cancel an event must not be passive.

Returning **false** from an **addEventListener()** callback does not cancel the default action. Call **preventDefault()** explicitly.

## Listener options and cleanup

The third argument to **addEventListener()** can configure how the listener behaves:

- **capture: true** invokes the listener during capture.
- **once: true** removes the listener after it runs once.
- **passive: true** declares that the listener will not cancel the event with **preventDefault()**.
- **signal** ties the listener's lifetime to an **AbortSignal**.

~~~js
button.addEventListener("click", handleClick, { once: true });
~~~

To remove a listener manually, pass the same event type, callback function, and capture setting:

~~~js
function handleClick() {
  console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
~~~

An anonymous function written directly in **addEventListener()** cannot later be named to remove that specific listener. Keep a function reference when manual cleanup is needed. An **AbortController** can remove listeners associated with its signal:

~~~js
const controller = new AbortController();

button.addEventListener("click", handleClick, {
  signal: controller.signal
});

controller.abort();
~~~

## Keep native interactions usable

Native links, buttons, and form controls already support browser interaction patterns, including keyboard activation and built-in form behavior. Use the element that matches the action. A button is for an action; a link is for navigation.

Avoid replacing a link's or button's native behavior unless the page provides the intended alternative. If code cancels a link's default navigation, it should perform a clear replacement action.

## Common mistakes

### Confusing the target with the current target

The target can be a nested child. The current target is the element whose listener is running.

### Assuming every event bubbles

Some events do not bubble. Use the event's documented propagation behavior or listen on the element that receives it.

### Using stopPropagation() to cancel a default action

Propagation and default behavior are separate. Use **preventDefault()** to cancel a cancelable default action.

### Assuming preventDefault() stops other listeners

The event can continue through its propagation path after its default action is canceled. Use propagation controls only when that is the intended behavior.

### Returning false from an event listener

A false return value from an **addEventListener()** callback does not cancel the default action. Call **preventDefault()**.

### Trying to remove a different callback

**removeEventListener()** needs the same callback reference and matching capture setting used when the listener was added.

## Try it yourself

1. Add capture and bubble listeners to a parent around a button. Record their order when the button is clicked.
2. Put a **span** inside the button and compare **event.target** with **event.currentTarget**.
3. Add a form submit listener that calls **preventDefault()** and reports whether **defaultPrevented** is true.
4. Call **stopPropagation()** in one listener and observe which ancestors no longer receive the event.
5. Add two listeners to the same button. Compare **stopPropagation()** with **stopImmediatePropagation()**.
6. Register a click listener with **once: true** and click the button twice.
7. Add a listener with an **AbortSignal**, abort its controller, and click the button again.
8. Try to cancel a default action from a **passive** listener and inspect the browser console.
9. Compare **focus** with **focusin** when listening on an ancestor.
10. Explain why a link should remain a link even when JavaScript adds behavior to its click.

## Key points

- **addEventListener()** registers a callback for a particular event type.
- **target** is where the event began; **currentTarget** is the object whose listener is running.
- Events can pass through capture, target, and bubble phases. Not every event bubbles.
- **stopPropagation()** controls the propagation path; **stopImmediatePropagation()** also prevents later listeners on the same target.
- **preventDefault()** cancels a cancelable default action when the listener is not passive.
- Canceling default behavior does not stop propagation, and stopping propagation does not cancel default behavior.
- Listener options can control capture, one-time execution, passive behavior, or listener lifetime.
- Native links, buttons, and form controls provide useful browser behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [101 - Attributes, classes, forms, and styles from JavaScript](101-attributes-classes-forms-and-styles-from-javascript.md) | [Open Q&A](../qnas/102-browser-events-capture-bubbling-and-default-actions.md) | [Open example](../examples/102-browser-events-capture-bubbling-and-default-actions.md) | [103 - Event delegation and reusable handlers](103-event-delegation-and-reusable-handlers.md) |
