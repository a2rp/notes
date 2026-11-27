# 102 - Browser events: capture, bubbling, and default actions: Example

## Goal

Explore event propagation and browser default actions in one page. The example records capture, target, and bubble listeners, stops propagation for a chosen button, cancels a link and form default action, and registers a one-time listener.

## Complete example

Save this as an HTML file and open it in a browser. The complete source is displayed here in Markdown.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Browser event lab</title>
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
      width: min(100%, 42rem);
      margin-inline: auto;
    }

    section,
    form {
      display: grid;
      gap: 0.75rem;
      margin-block: 1.5rem;
      padding: 1rem;
      border: 1px solid currentColor;
      border-radius: 0.5rem;
    }

    button,
    input {
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      font: inherit;
    }

    label {
      display: grid;
      gap: 0.4rem;
    }

    #event-log {
      min-height: 6rem;
      padding: 1rem;
      overflow-wrap: anywhere;
      white-space: pre-wrap;
      border: 1px solid currentColor;
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>
  <main>
    <h1>Browser event lab</h1>
    <p>Use the controls to observe event order and default behavior.</p>

    <section id="event-notes">
      <h2>Capture, target, and bubble</h2>
      <p>Click the text inside the trace button to record the event path.</p>
      <div id="event-area">
        <button id="trace-button" type="button">
          <span id="event-label">Trace this click</span>
        </button>
      </div>
    </section>

    <section>
      <h2>Stop propagation</h2>
      <p>The parent receives capture, but not bubble, for this button click.</p>
      <div id="stop-area">
        <button id="stop-button" type="button">Stop propagation</button>
      </div>
    </section>

    <section>
      <h2>Cancel a link default action</h2>
      <p>The link normally changes the page fragment. Its listener cancels that navigation.</p>
      <a id="same-page-link" href="#event-notes">Try the same-page link</a>
    </section>

    <form id="name-form">
      <h2>Cancel a form default action</h2>
      <label for="name-input">
        Name
        <input id="name-input" name="name" required>
      </label>
      <button type="submit">Submit without navigating</button>
    </form>

    <section>
      <h2>One-time listener</h2>
      <p>The listener runs only on the first click. Clear the log to see it again only after reloading.</p>
      <button id="once-button" type="button">Run the once listener</button>
      <button id="clear-log" type="button">Clear event log</button>
    </section>

    <h2>Event log</h2>
    <p>Event messages appear below.</p>
    <pre id="event-log" aria-live="polite"></pre>
  </main>

  <script>
    const eventArea = document.querySelector("#event-area");
    const traceButton = document.querySelector("#trace-button");
    const stopArea = document.querySelector("#stop-area");
    const stopButton = document.querySelector("#stop-button");
    const samePageLink = document.querySelector("#same-page-link");
    const nameForm = document.querySelector("#name-form");
    const onceButton = document.querySelector("#once-button");
    const clearButton = document.querySelector("#clear-log");
    const log = document.querySelector("#event-log");

    function describeTarget(target) {
      return target.id || target.tagName.toLowerCase();
    }

    function addLog(message) {
      log.textContent += (log.textContent === "" ? "" : "\n") + message;
    }

    eventArea.addEventListener("click", function (event) {
      addLog(
        "Capture: target=" + describeTarget(event.target) +
        ", currentTarget=" + describeTarget(event.currentTarget)
      );
    }, { capture: true });

    traceButton.addEventListener("click", function (event) {
      addLog(
        "Target listener: target=" + describeTarget(event.target) +
        ", currentTarget=" + describeTarget(event.currentTarget)
      );
    });

    eventArea.addEventListener("click", function (event) {
      addLog(
        "Bubble: target=" + describeTarget(event.target) +
        ", currentTarget=" + describeTarget(event.currentTarget)
      );
    });

    stopArea.addEventListener("click", function () {
      addLog("Stop area bubble listener ran.");
    });

    stopButton.addEventListener("click", function (event) {
      event.stopPropagation();
      addLog("Propagation stopped at the stop button.");
    });

    samePageLink.addEventListener("click", function (event) {
      event.preventDefault();
      addLog("Link default prevented: " + event.defaultPrevented);
    });

    nameForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addLog("Form default prevented: " + event.defaultPrevented);
    });

    onceButton.addEventListener("click", function () {
      addLog("The once listener ran.");
    }, { once: true });

    clearButton.addEventListener("click", function () {
      log.textContent = "";
    });
  </script>
</body>
</html>
~~~

## Expected output

Click the **Trace this click** text. The log shows three entries in this order:

~~~text
Capture: target=event-label, currentTarget=event-area
Target listener: target=event-label, currentTarget=trace-button
Bubble: target=event-label, currentTarget=event-area
~~~

The target is the nested span. The target listener's current target is the button, while the parent listener's current target is the event area.

Click **Stop propagation**. The event area does not receive the bubble-phase event, and the log adds **Propagation stopped at the stop button.** Its capture listener still runs first.

Click **Try the same-page link**. The page fragment does not change, and the log says **Link default prevented: true**.

Enter a name and submit the form. The page does not navigate, and the log says **Form default prevented: true**. If the name is empty, the browser's required-field validation prevents the submit event from reaching the listener.

Click **Run the once listener** twice. The log records **The once listener ran.** only the first time. The **Clear event log** button clears previous entries.

## How it works

### 1. Trace propagation through the parent

The event area has two click listeners. Its capture listener is registered with **{ capture: true }**. Its other listener runs during bubbling. The button has a target listener between them.

The nested span receives the click, so it is **event.target**. The event area and the button are **event.currentTarget** while their respective listeners run.

### 2. Stop one event from continuing upward

The stop button calls **stopPropagation()**. That prevents the event from continuing to the parent bubble listener. It does not affect the capture listener that already ran, and it does not cancel a default action.

### 3. Cancel default actions explicitly

The same-page link calls **preventDefault()** to cancel fragment navigation. The form listener calls it to prevent the browser's normal form submission. Both handlers inspect **defaultPrevented** after the call.

The form's **required** constraint is checked before a valid submit event is dispatched to the form listener.

### 4. Register a one-time listener

The listener on the once button uses **{ once: true }**. The browser removes that listener after its first invocation.

## Try these changes

1. Add another listener to the trace button with **{ capture: true }** and compare it with the button's normal listener.
2. Replace **stopPropagation()** with **stopImmediatePropagation()** and register a second listener on the stop button.
3. Remove **preventDefault()** from the link listener and observe the fragment change.
4. Remove **preventDefault()** from the form listener and observe the browser's normal form submission behavior.
5. Add **{ passive: true }** to a listener that calls **preventDefault()** and inspect whether the default action is canceled.
6. Change the once listener to a regular listener and click repeatedly.
7. Change the trace listener to log **event.eventPhase** as well as the target names.

## Key ideas shown

- Capture listeners run on the path toward the target; bubbling listeners run on the way back when the event bubbles.
- **event.target** can be a nested child, while **event.currentTarget** is the element whose listener is running.
- **stopPropagation()** prevents travel to later objects on the event path.
- **preventDefault()** cancels a cancelable browser action without stopping propagation.
- Form constraints can stop an invalid submission before a submit listener runs.
- The **once** listener option removes a listener after it runs once.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [101 - Attributes, classes, forms, and styles from JavaScript](../examples/101-attributes-classes-forms-and-styles-from-javascript.md) | [Open lesson](../lessons/102-browser-events-capture-bubbling-and-default-actions.md) | [Open Q&A](../qnas/102-browser-events-capture-bubbling-and-default-actions.md) | [103 - Event delegation and reusable handlers](../lessons/103-event-delegation-and-reusable-handlers.md) |
