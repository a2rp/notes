# 118 - Accessibility, keyboard interaction, and dynamic content

An accessible interface gives people more than one reliable way to understand and operate a page. HTML already provides useful structure and behavior through headings, links, buttons, forms, and disclosure controls. Start with those elements, keep keyboard focus visible and predictable, and make important changes available to assistive technology.

Accessibility is part of how a feature works. It is not a separate layer added after the feature is complete.

## Learning goals

After this lesson, you should be able to:

- choose HTML elements that match the purpose of the content;
- make controls understandable and usable with a keyboard;
- preserve a logical focus order and visible focus indicator;
- distinguish between announcing an update and moving keyboard focus;
- use status messages for important updates that do not move focus;
- reveal, hide, and update content without leaving stale accessibility state;
- use native disclosure and dialog elements before building custom widgets;
- check a page with keyboard-only interaction and assistive technology.

## Start with native HTML

Native elements provide semantics and familiar keyboard behavior to the browser and assistive technology.

~~~html
<header>
  <a href="/">Site name</a>
</header>

<nav aria-label="Primary">
  <a href="/lessons">Lessons</a>
  <a href="/about">About</a>
</nav>

<main>
  <h1>Page title</h1>

  <section aria-labelledby="topics-heading">
    <h2 id="topics-heading">Topics</h2>
    <p>Content for this section.</p>
  </section>
</main>

<footer>
  <p>Page footer</p>
</footer>
~~~

Use a link to navigate to another location. Use a button to perform an action. Use a form control to collect a value. A clickable <code>&lt;div&gt;</code> does not automatically become a button: it has no button role, keyboard activation, focus behavior, or state announcement.

Prefer the native element even when CSS changes how it looks. For example, a <code>&lt;button&gt;</code> can be styled to look like a text link while retaining its button behavior. A link should still navigate.

### Give controls a clear name

A control needs an accessible name that identifies its purpose. Visible text usually provides the clearest name:

~~~html
<button type="button">Save settings</button>
~~~

A label gives a form field a name:

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email">
~~~

When a control has no visible text, provide a concise name that describes its action. Do not use a vague name such as "click here" or "button". Avoid adding ARIA when the native label already provides the name.

Use headings in a meaningful hierarchy. A heading is a navigation point for many screen reader users, so choose a heading level based on the structure rather than its visual size. CSS can change the visual size without changing its heading level.

## Keyboard interaction

A keyboard user should be able to reach and operate the same important features as a pointer user.

### Native keyboard behavior

Common browser behavior includes:

| Element | Typical keyboard behavior |
| --- | --- |
| Link | <code>Tab</code> moves focus to it; <code>Enter</code> follows it. |
| Button | <code>Tab</code> moves focus to it; <code>Enter</code> or <code>Space</code> activates it. |
| Checkbox | <code>Tab</code> moves focus to it; <code>Space</code> changes its checked state. |
| Text field | <code>Tab</code> moves focus to it; typing enters text. |
| <code>&lt;summary&gt;</code> inside <code>&lt;details&gt;</code> | <code>Tab</code> reaches it; <code>Enter</code> or <code>Space</code> toggles the disclosure. |

Exact behavior can vary by platform, but native controls follow browser conventions. A custom ARIA widget does not get keyboard behavior just because it has a role. If you build a custom tablist, menu, tree, grid, or combobox, you must implement the keyboard model, focus rules, and state changes for that pattern.

Use the simplest control that serves the task. A group of ordinary links is often better than a custom menu. A <code>&lt;details&gt;</code> element may be enough for expandable information. Do not add arrow-key behavior to a normal group of buttons without a clear reason.

### Keep focus visible and predictable

When a user tabs through a page:

- focus should move through controls in a meaningful order;
- a visible focus indicator should show which control is active;
- styling should not make the focus indicator disappear;
- keyboard input should not unexpectedly change context;
- a user should not become trapped in a region without a clear way out.

The DOM order usually gives a good keyboard and reading order. CSS can change the visual layout, but it cannot repair a confusing source order for everyone. Keep the document order aligned with the intended reading sequence.

Do not remove the browser outline without replacing it with a clear focus style:

~~~css
:focus-visible {
  outline: 3px solid #174ea6;
  outline-offset: 3px;
}
~~~

A focus style should remain visible against the component and surrounding background. Do not communicate focus only with color if the difference is difficult to see.

### Use <code>tabindex</code> sparingly

The normal focus order comes from native interactive elements and their document order. Avoid positive <code>tabindex</code> values because they create a separate custom sequence that can become difficult to maintain.

~~~html
<!-- A custom control can join the normal sequence when necessary. -->
<div role="button" tabindex="0">Custom action</div>

<!-- A heading can receive focus from script without becoming a Tab stop. -->
<h2 tabindex="-1">Updated results</h2>
~~~

The first example still needs keyboard activation code and correct button semantics. Prefer a native <code>&lt;button&gt;</code> instead. <code>tabindex="-1"</code> lets script move focus to an element, but users will not reach it by pressing <code>Tab</code>.

Do not put <code>tabindex="0"</code> on every container. That creates many extra stops and makes navigation slower. Do not use positive values such as <code>tabindex="1"</code> to force focus order.

## Focus and dynamic content

A page can change without navigating to a new document. It may add results, update a cart count, open a dialog, expand a section, or remove an item. The key question is:

**Should the change be announced while the user stays where they are, or should focus move to the new task?**

Those are different actions.

### Announce a status without moving focus

Use a status message when the update is useful but does not require the user to start interacting with the changed content immediately. For example, a saved message or a result count can be announced without moving focus.

~~~html
<p id="save-status" role="status"></p>
~~~

~~~js
document.querySelector("#save-status").textContent = "Settings saved.";
~~~

The <code>status</code> role has a polite live announcement behavior. The browser and assistive technology can announce the changed text without moving keyboard focus. Keep the message element in the document and update its text when the result changes.

Use a status message for concise information such as:

- "Settings saved."
- "3 results found."
- "Item added to your list."
- "Upload complete."

Do not send every minor or frequent change to a live region. Announcements that happen too often can interrupt reading or make the interface hard to follow.

### Use urgent announcements only when needed

An error that blocks the current task may need an urgent announcement. The <code>alert</code> role is assertive and can interrupt other speech, so use it sparingly. A normal confirmation or an advisory message is usually better as <code>role="status"</code>.

Do not add <code>role="alert"</code> to a whole page region or to content that appears on every keystroke. The announcement should be short and relevant.

### Move focus when the user needs to act in new content

A live announcement does not make new controls the next keyboard stop in a sensible place. If an action opens a modal dialog, move focus into the dialog. If a single-page app changes to a new screen, update the document title and move focus to the new page heading or another meaningful start point. When a user deletes a focused item, move focus to a nearby control that still exists.

A focus change is appropriate when the user's task has moved. Do not move focus for every background update or confirmation.

A focused static heading can use <code>tabindex="-1"</code>:

~~~js
const heading = document.querySelector("#results-heading");
heading.focus();
~~~

If script moves focus, make sure the element exists, is visible, and communicates where the user has landed. Do not move focus to a large container without a useful reason.

## Show and hide content

### Prefer native disclosures

For a simple expandable note, <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> already provide a keyboard-operable disclosure:

~~~html
<details>
  <summary>More about this topic</summary>
  <p>The extra explanation appears when the disclosure is open.</p>
</details>
~~~

The browser exposes the open state and users can toggle it with the keyboard. This is often simpler and more reliable than recreating a disclosure with a <code>&lt;div&gt;</code> and script.

### Keep custom disclosure state synchronized

If a custom disclosure is necessary, its trigger must expose the current state. The <code>aria-expanded</code> value belongs on the button that opens and closes the content. Update the state whenever the content changes:

~~~html
<button
  id="details-toggle"
  type="button"
  aria-expanded="false"
  aria-controls="extra-details"
>
  Show details
</button>

<div id="extra-details" hidden>
  <p>Additional information.</p>
</div>
~~~

~~~js
const toggle = document.querySelector("#details-toggle");
const details = document.querySelector("#extra-details");

toggle.addEventListener("click", () => {
  const willOpen = toggle.getAttribute("aria-expanded") !== "true";

  toggle.setAttribute("aria-expanded", String(willOpen));
  details.hidden = !willOpen;
  toggle.textContent = willOpen ? "Hide details" : "Show details";
});
~~~

The <code>hidden</code> property removes the content from visual display and the accessibility tree. When you show it, remove the hidden state as well. Do not leave hidden controls in the keyboard order.

<code>aria-hidden="true"</code> only changes what is exposed to assistive technology. It does not visually hide content and does not automatically remove its descendants from keyboard focus. Do not put it on a region that contains focusable controls a keyboard user can still reach.

## Accessible dialogs

A dialog temporarily asks the user to work in a separate part of the page. Prefer the native <code>&lt;dialog&gt;</code> element when a modal dialog is appropriate.

~~~html
<button id="open-help" type="button">Open help</button>

<dialog id="help-dialog" aria-labelledby="help-title">
  <h2 id="help-title">Help</h2>
  <p>Choose Close to return to the page.</p>
  <button id="close-help" type="button">Close</button>
</dialog>
~~~

~~~js
const openHelp = document.querySelector("#open-help");
const closeHelp = document.querySelector("#close-help");
const helpDialog = document.querySelector("#help-dialog");

openHelp.addEventListener("click", () => {
  helpDialog.showModal();
  closeHelp.focus();
});

closeHelp.addEventListener("click", () => {
  helpDialog.close();
});

helpDialog.addEventListener("close", () => {
  openHelp.focus();
});
~~~

A modal dialog opened with <code>showModal()</code> makes the rest of the page unavailable for interaction until the dialog closes. Keep a visible close or cancel button inside it. The browser supports Escape for closing a modal dialog. Focus should enter the dialog when it opens and return to the invoking control when it closes, unless the task flow makes another location more useful.

Give the dialog a visible title and connect it with <code>aria-labelledby</code>. For a long dialog with headings or lists, focus a suitable heading or introductory element with <code>tabindex="-1"</code> instead of having the entire contents announced as one long description. A dialog label and initial focus are separate concerns.

Do not use a modal dialog for every message. A brief saved confirmation can be a status message. A dialog is for an interaction that needs the user's attention and temporarily changes the task.

## Updating a single-page application

A client-side route change can replace the main content without a full document load. Assistive technology may not know that the user's main task has moved unless the app gives a clear cue.

When your app displays a new screen:

1. update the page title to identify the new screen;
2. update the main heading and content;
3. move focus to a useful start point, often the new heading with <code>tabindex="-1"</code>;
4. ensure the new screen appears in the expected reading and focus order;
5. provide a way to go back or move to another section.

Do not announce an entire page through a live region. A title update and focused heading usually give a more controlled transition. Keep ordinary links as links so browser navigation and link behavior remain available.

## Loading and busy states

When an operation takes time, say what is happening and later announce the result. Keep the message short and do not rely on a spinner alone.

~~~html
<p id="search-status" role="status">Ready to search.</p>
~~~

~~~js
const status = document.querySelector("#search-status");

status.textContent = "Searching.";

try {
  const results = await loadResults();
  renderResults(results);
  status.textContent = results.length + " results found.";
} catch {
  status.textContent = "Search failed. Try again.";
}
~~~

If a region is being updated in several steps, <code>aria-busy="true"</code> can tell assistive technology that its content is not ready yet. Set it back to <code>false</code> when the update is complete. It is not a replacement for a concise status message describing the result.

## Motion and interaction

Avoid making information available only through motion, hover, or animation. Content that appears on hover should also be reachable by keyboard and touch. If an animation is decorative, respect the visitor's reduced-motion preference. Keep essential state changes understandable without animation.

Do not use timing that forces a user to respond before they can finish reading or navigating. If the task requires a time limit, explain it and provide a way to extend or remove the limit when possible.

## A practical accessibility review

Review a feature as a user would use it:

1. Press <code>Tab</code> and <code>Shift</code> + <code>Tab</code> to visit controls in both directions.
2. Use <code>Enter</code> and <code>Space</code> on native links, buttons, checkboxes, and disclosures.
3. Confirm that the visible focus indicator stays easy to find.
4. Trigger the dynamic update and check that its status is available without stealing focus.
5. Open and close dialogs with their controls and with <code>Escape</code>; check where focus goes.
6. Hide and show content, then check that hidden controls cannot receive focus.
7. Use a screen reader to confirm that names, roles, states, headings, and important status changes make sense.
8. Zoom the page and use a narrow viewport to check that content remains usable.

A keyboard check is useful, but it does not replace testing with assistive technology. Different browsers and assistive technologies can expose and announce content differently.

## Common mistakes

- Using a clickable <code>&lt;div&gt;</code> where a native button or link belongs.
- Adding ARIA roles without implementing the expected keyboard interaction.
- Removing the focus outline without a clear replacement.
- Using positive <code>tabindex</code> values to force a custom focus sequence.
- Reordering the visual layout so it conflicts with the content and focus order.
- Announcing a whole results list instead of a concise status update.
- Moving focus for a background confirmation that does not need interaction.
- Announcing a new task without moving focus to the new task when the user must act there.
- Using an assertive alert for routine updates.
- Hiding content visually while leaving its controls focusable.
- Setting <code>aria-expanded</code> once and forgetting to update it when the disclosure changes.
- Adding <code>aria-hidden="true"</code> to a region that still contains keyboard-accessible controls.
- Opening a dialog without giving it a name or a clear way to close.
- Focusing the page body or a large container after every change.

## Key points

- Native HTML provides useful semantics and keyboard behavior. Use it before building custom controls.
- Keep focus order logical and focus visible.
- A status announcement tells users about an update without moving focus.
- Move focus when the user's next task has moved to a new part of the interface.
- Keep visual visibility, keyboard focus, and ARIA state synchronized.
- Use <code>role="status"</code> for concise, non-urgent updates and reserve assertive alerts for urgent cases.
- Native <code>&lt;details&gt;</code> and <code>&lt;dialog&gt;</code> cover common disclosure and modal interaction patterns.
- Check dynamic interfaces with a keyboard and assistive technology.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [117 - Permissions, geolocation, and device APIs](117-permissions-geolocation-and-device-apis.md) | [Open Q&A](../qnas/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [Open example](../examples/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [119 - Browser security: XSS, injection, and safe DOM updates](119-browser-security-xss-injection-and-safe-dom-updates.md) |
