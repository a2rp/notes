# 118 - Accessibility, keyboard interaction, and dynamic content: Q&A

Use these questions to review native semantics, keyboard behavior, focus management, live updates, and common dynamic interface patterns. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Why should an action usually use a native button?

- A. It automatically saves the action to a server.
- B. It provides built-in semantics, focus behavior, and keyboard activation.
- C. It always looks the same in every browser.
- D. It prevents JavaScript from running.

**Answer: B.**

**Explanation:** A native button already behaves like an action control and is exposed with the right role. A clickable div needs extra semantics and keyboard code, and is still easier to get wrong.

### 2. Which element should usually navigate to another page?

- A. A button
- B. A link with an href
- C. A span
- D. A summary

**Answer: B.**

**Explanation:** A link represents navigation and supports browser features such as opening in another tab, copying its address, and following it with Enter.

### 3. What is the usual keyboard activation for a native button?

- A. Arrow keys only
- B. Enter or Space
- C. Escape only
- D. The mouse is required

**Answer: B.**

**Explanation:** Browsers provide familiar keyboard activation for native buttons. A custom widget must implement its own expected keyboard behavior.

### 4. What should usually determine the default Tab sequence?

- A. Positive tabindex values on every element
- B. The order of elements in the document
- C. The order in which CSS rules appear
- D. The order of colors on the page

**Answer: B.**

**Explanation:** A logical document order usually gives keyboard and reading users a predictable sequence. Visual CSS reordering can make that sequence confusing.

### 5. Why are positive tabindex values discouraged?

- A. They disable screen readers.
- B. They create a separate focus sequence that is difficult to maintain.
- C. They only work on images.
- D. They turn buttons into links.

**Answer: B.**

**Explanation:** Positive values can make focus jump through a custom order that no longer matches the content. Prefer native controls and document order.

### 6. What does tabindex set to negative one allow?

- A. It makes an element the first Tab stop.
- B. It prevents scripts from focusing the element.
- C. It allows programmatic focus without adding the element to normal Tab navigation.
- D. It hides the element from assistive technology.

**Answer: C.**

**Explanation:** This is useful for focusing a heading after a route change or update. It does not make the element a regular Tab stop.

### 7. Which update is a good fit for the status role?

- A. A routine message that settings were saved
- B. A permanent keyboard trap
- C. A hidden input label
- D. A request to grant location access

**Answer: A.**

**Explanation:** A status region can announce a concise result without moving focus. It is suitable for a non-urgent update such as a save confirmation.

### 8. What is the main difference between announcing a status and moving focus?

- A. They are exactly the same action.
- B. A status announcement informs the user while focus stays put; moving focus changes where keyboard interaction continues.
- C. Focus can move only to buttons.
- D. Status messages are visible only to screen readers.

**Answer: B.**

**Explanation:** Use a status message for a useful background result. Move focus when the user's next task has moved to another part of the interface.

### 9. When should the alert role be used?

- A. For every changing paragraph
- B. For urgent information that needs an assertive announcement
- C. For every heading
- D. To make an element focusable

**Answer: B.**

**Explanation:** An alert can interrupt current speech. Routine confirmations should usually be announced politely instead.

### 10. Does adding an ARIA tab role automatically implement keyboard behavior?

- A. Yes, all ARIA roles provide JavaScript behavior.
- B. No, the author must implement the expected interaction and focus model.
- C. Yes, but only when CSS is used.
- D. No, because tabs cannot be keyboard-operated.

**Answer: B.**

**Explanation:** ARIA communicates semantics and state. It does not make a custom widget behave like a native control.

### 11. What should happen when a custom disclosure opens?

- A. Its expanded state and content visibility should change together.
- B. The button should be removed.
- C. Focus should always move to the footer.
- D. The entire page should be hidden from assistive technology.

**Answer: A.**

**Explanation:** State and visibility must stay synchronized. A stale expanded value misrepresents what the user can see and operate.

### 12. What does the hidden attribute do?

- A. Hides content visually and removes it from the accessibility tree.
- B. Hides content only from screen readers.
- C. Makes content visually transparent but still interactive.
- D. Adds the content to the Tab order.

**Answer: A.**

**Explanation:** When content is hidden, its controls should not remain available to keyboard users. Remove the hidden state when showing it again.

### 13. Why can aria-hidden true be unsafe on a region with buttons?

- A. It changes the buttons into links.
- B. The buttons may remain visible and keyboard-focusable while being hidden from assistive technology.
- C. It automatically closes the page.
- D. It makes all text bold.

**Answer: B.**

**Explanation:** aria-hidden affects accessibility exposure, not visual display or keyboard focus. Do not hide interactive content from assistive technology while leaving it operable.

### 14. Which method opens a native modal dialog?

- A. showModal
- B. focusAll
- C. openPage
- D. alert

**Answer: A.**

**Explanation:** Calling showModal on a dialog opens it modally and makes the rest of the page unavailable for interaction until it closes.

### 15. How should a modal dialog be named?

- A. Give it a visible title and connect it with aria-labelledby.
- B. Add a positive tabindex value to the page body.
- C. Use only a decorative icon.
- D. Give every child the same label.

**Answer: A.**

**Explanation:** A visible heading gives people a clear title, and aria-labelledby connects that title to the dialog.

### 16. What is a sensible focus pattern for a modal dialog?

- A. Leave focus behind the dialog.
- B. Move focus into the dialog when it opens, then return it to the invoking control when it closes.
- C. Move focus to the browser address bar.
- D. Remove all focus indicators.

**Answer: B.**

**Explanation:** Users need to know where the dialog interaction begins. Returning focus to the opener gives them a predictable way back to the original task.

### 17. What does the browser normally support for a native modal dialog?

- A. Escape closes the dialog.
- B. Tab moves focus to the page behind it.
- C. It cannot contain buttons.
- D. It changes every link into a heading.

**Answer: A.**

**Explanation:** Native modal dialogs support Escape dismissal and keep interaction within the dialog while it is open. The dialog should also include a visible close or cancel button.

### 18. What is a good approach when a single-page application displays a new screen?

- A. Update the page title and move focus to a meaningful start point when appropriate.
- B. Announce the entire page through an assertive alert.
- C. Keep focus on a control that no longer exists.
- D. Remove all links.

**Answer: A.**

**Explanation:** A title and focused heading can communicate the new context without forcing users to search through a replaced page.

### 19. What is aria-busy true for?

- A. Indicating that a region is being updated and is not ready yet
- B. Disabling all keyboard interaction forever
- C. Showing that a user is busy
- D. Replacing a page title

**Answer: A.**

**Explanation:** Set it back to false when the region update is complete. It does not replace a concise message that explains the result.

### 20. Which is the best way to indicate that a search has finished?

- A. A spinner with no text
- B. A concise status such as "3 results found"
- C. Moving focus to the browser toolbar
- D. Announcing every result on every keystroke

**Answer: B.**

**Explanation:** The status describes the outcome without unnecessarily interrupting the user or changing their focus.

## Short-answer questions

### 21. What is an accessible name?

**Answer:** It is the name assistive technology can use to identify a control, such as the text "Save settings" on a button or "Email address" on a labeled input.

**Explanation:** Users need to know what each control is for. Visible text and native labels are usually the clearest source of that name.

### 22. How do you connect a visible label to a text input?

**Answer:** Give the input an id and set the label's for attribute to that same value.

~~~html
<label for="city">City</label>
<input id="city" name="city">
~~~

**Explanation:** Clicking the label focuses the input, and the label provides its accessible name.

### 23. Why should a focus indicator remain visible?

**Answer:** It shows keyboard users which control will receive their next action.

**Explanation:** If the focus style is removed or too subtle, users can lose track of their position on the page.

### 24. What should you do if you replace the browser focus outline?

**Answer:** Provide another clear, visible focus style that works against the component and its background.

**Explanation:** Removing the outline without a replacement makes keyboard focus difficult to locate.

### 25. When should focus move after an update?

**Answer:** Move focus when the user's next task has moved to new content, such as when opening a dialog or navigating to a new app screen.

**Explanation:** For a routine confirmation that does not require interaction, announce a status and leave focus where it is.

### 26. What is a useful alternative to a custom expandable panel?

**Answer:** Use native details and summary elements when they fit the content.

**Explanation:** The browser provides the disclosure state and keyboard operation, so less custom code is needed.

### 27. What does aria-expanded communicate?

**Answer:** It reports whether a controlled disclosure or expandable region is open or closed.

**Explanation:** Update it whenever the visible state changes. The attribute does not open or close the content by itself.

### 28. Why should live-region announcements be concise and limited?

**Answer:** Frequent or long announcements can interrupt reading and make it difficult to follow the interface.

**Explanation:** Announce meaningful status changes, not every minor visual update.

### 29. What should happen to focus when a focused list item is removed?

**Answer:** Move focus to a nearby remaining control that makes sense, or to the input or list heading if no items remain.

**Explanation:** Removing the focused element without a plan can leave keyboard users unsure where they are.

### 30. Why is a keyboard-only check useful but incomplete?

**Answer:** It checks reachability, activation, order, and visible focus, but it does not confirm that names, roles, states, and announcements work well with assistive technology.

**Explanation:** Check with a screen reader and the browser combinations your audience uses.

## Scenarios

### 31. A user submits a form and a "Saved" message appears near the button. Should the page move focus to the message?

**Answer:** Usually no. Keep focus on the form control and place the short confirmation in a status region.

**Explanation:** The message reports a result, but the user does not need to interact with it. Moving focus would interrupt their current position.

### 32. A user activates a button that opens a modal confirmation dialog. Where should focus go?

**Answer:** Move focus to an appropriate control inside the dialog, usually its first useful action or a close button.

**Explanation:** The task has moved into a modal interaction. Focus should return to the invoking control when the dialog closes unless the workflow calls for another destination.

### 33. A search replaces the main content in a single-page app. What should the app update?

**Answer:** Update the document title and main heading, then move focus to a meaningful start point such as that heading.

**Explanation:** A route change without a page load may otherwise leave focus on an old control or give no clear context change.

### 34. A custom menu works with a mouse but not the keyboard. Is adding an ARIA menu role enough?

**Answer:** No. The author must implement the expected keyboard model and focus behavior, or use a simpler native pattern.

**Explanation:** ARIA adds semantics but does not supply event handling or interaction behavior.

### 35. A developer marks a sidebar aria-hidden but leaves its links visible and tabbable. What is wrong?

**Answer:** Keyboard users can still focus links that assistive technology has been told to ignore.

**Explanation:** Visual visibility, focusability, and accessibility exposure must agree. Use a real hiding or inert interaction pattern and manage focus when the sidebar closes.

### 36. A page announces every character as a user types into a search field. What should change?

**Answer:** Stop announcing every keystroke. Announce a concise result count when the search completes or when a meaningful result state changes.

**Explanation:** High-frequency announcements are noisy and can make the interface difficult to use.

## Coding questions

### 37. Add a polite confirmation after a save action without moving focus.

**Answer:**

~~~html
<button id="save-button" type="button">Save settings</button>
<p id="save-status" role="status"></p>
~~~

~~~js
const saveButton = document.querySelector("#save-button");
const saveStatus = document.querySelector("#save-status");

saveButton.addEventListener("click", () => {
  saveStatus.textContent = "Settings saved.";
});
~~~

**Explanation:** The status role identifies a polite status message. Focus stays on the button, so the user can continue from their current position.

### 38. Toggle a disclosure and keep its state synchronized.

**Answer:**

~~~html
<button id="toggle" type="button" aria-expanded="false" aria-controls="details">
  Show details
</button>
<div id="details" hidden>
  <p>More information.</p>
</div>
~~~

~~~js
const toggle = document.querySelector("#toggle");
const details = document.querySelector("#details");

toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  details.hidden = isOpen;
  toggle.textContent = isOpen ? "Show details" : "Hide details";
});
~~~

**Explanation:** The button, expanded value, button label, and content visibility all describe the same state.

### 39. After removing a focused item from a list, where can focus go?

**Answer:** Focus a nearby remaining remove button, or return to the input if the list is empty.

~~~js
function removeItem(item, input) {
  const buttons = [...item.parentElement.querySelectorAll("button")];
  const index = buttons.indexOf(item.querySelector("button"));
  const list = item.parentElement;

  item.remove();

  const remainingButtons = [...list.querySelectorAll("button")];
  const nextButton = remainingButtons[Math.min(index, remainingButtons.length - 1)];

  if (nextButton) {
    nextButton.focus();
  } else {
    input.focus();
  }
}
~~~

**Explanation:** The code chooses the button at the same position when possible, or the previous final button if the removed item was last. If none remain, it returns the user to the input.

### 40. Open a native modal dialog and return focus to its opener.

**Answer:**

~~~html
<button id="open-dialog" type="button">Open help</button>
<dialog id="help-dialog" aria-labelledby="help-title">
  <h2 id="help-title">Help</h2>
  <p>Information about this page.</p>
  <button id="close-dialog" type="button">Close</button>
</dialog>
~~~

~~~js
const opener = document.querySelector("#open-dialog");
const dialog = document.querySelector("#help-dialog");
const closer = document.querySelector("#close-dialog");

opener.addEventListener("click", () => {
  dialog.showModal();
  closer.focus();
});

closer.addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => opener.focus());
~~~

**Explanation:** The visible heading names the dialog. showModal provides modal behavior, the close button gives an explicit exit, and focus returns to the opener after closing.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [117 - Permissions, geolocation, and device APIs](../lessons/117-permissions-geolocation-and-device-apis.md) | [Open lesson](../lessons/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [Open example](../examples/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [119 - Browser security: XSS, injection, and safe DOM updates](../lessons/119-browser-security-xss-injection-and-safe-dom-updates.md) |
