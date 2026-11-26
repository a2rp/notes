# 41 - ARIA in HTML: Questions and Answers

Use these questions to review [Chapter 41 - ARIA in HTML: when and how to use it](../lessons/41-aria-in-html.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does ARIA primarily provide?

A. Visual styles for web pages

B. Accessibility information about roles, names, states, and relationships

C. Automatic keyboard behavior for every element

D. JavaScript actions for controls

**Answer: B.** ARIA helps browsers expose accessibility semantics to assistive technologies. It does not create visual styling, keyboard behavior, or application actions.

### 2. Which markup is the best choice for an action that saves a document?

A. `<div role="button">Save</div>`

B. `<a href="#">Save</a>`

C. `<button type="button">Save</button>`

D. `<span tabindex="0">Save</span>`

**Answer: C.** A native button already provides button semantics, focus behavior, and keyboard activation. A generic element needs additional work and is easier to implement incorrectly.

### 3. What does `role="button"` add to a generic element by itself?

A. Button semantics, focus, and keyboard behavior

B. Button semantics only

C. A click handler

D. A visible button style

**Answer: B.** The role communicates what the element is intended to be. It does not make the element focusable, make Enter or Space activate it, style it, or provide an action.

### 4. What is usually the clearest source for a control's accessible name?

A. Visible text that describes the control

B. Its CSS class name

C. Its position in the page

D. A placeholder that disappears after typing

**Answer: A.** Visible text is available to people who can see the page and can also name the control for assistive technology. Use ARIA naming attributes when an appropriate visible name is not available.

### 5. What does `aria-labelledby="delivery-title"` do?

A. Adds the words "delivery-title" visibly to the page

B. Uses the text of an element with that ID as an accessible name

C. Hides the referenced element from assistive technology

D. Creates a new heading element

**Answer: B.** `aria-labelledby` refers to an element by its ID and uses its text to provide a name. The referenced element must exist and its ID should be unique.

### 6. When is `aria-describedby` useful?

A. To replace every visible label

B. To identify the current page in a menu

C. To associate additional instructions or explanatory text with a control

D. To make an element focusable

**Answer: C.** A description adds context, such as password requirements. It complements the control's name instead of replacing its label.

### 7. What must happen when a disclosure panel changes from closed to open?

A. Only the panel's color needs to change

B. The visible panel and its `aria-expanded` state must both reflect that it is open

C. `aria-controls` will open the panel automatically

D. The button must be replaced with a link

**Answer: B.** The visual state and the value of `aria-expanded` must agree. The code that controls the interaction must update both; ARIA attributes do not perform the action.

### 8. What does `aria-current="page"` communicate on a navigation link?

A. The link is disabled

B. The link opens in another tab

C. The link points to the page currently being viewed

D. The link has keyboard focus

**Answer: C.** `aria-current="page"` identifies the current page in a related set of links. The link still needs its normal destination and clear visible text.

### 9. What is the effect of `aria-hidden="true"`?

A. It removes the element from visual display and from the accessibility tree

B. It removes the element and its descendants from the accessibility tree, but does not visually hide them

C. It disables all pointer events

D. It makes the element decorative in CSS only

**Answer: B.** `aria-hidden` affects what is exposed to accessibility APIs. It does not hide content on screen, so do not use it as a visual hiding technique.

### 10. When should a form control use `aria-invalid="true"`?

A. On every required field before the user enters anything

B. When the field has been checked and its current value is invalid

C. Whenever the field is empty, even if it is optional

D. To make the field required

**Answer: B.** The state should reflect a real validation result. Pair it with a useful error message and keep the field value, message, and state in agreement.

## True or false

### 1. ARIA should usually be considered after checking whether native HTML already provides the needed semantics and behavior.

**Answer: True.** Native HTML elements provide meaning and built-in browser behavior. Prefer them when they fit the task.

### 2. Adding `role="button"` to a `<div>` makes it work with Enter and Space automatically.

**Answer: False.** A role communicates semantics but does not provide keyboard interaction, focus behavior, styling, or an action.

### 3. The text in an `aria-label` is automatically visible on the page.

**Answer: False.** `aria-label` supplies an accessible name, but it does not display that text. Add visible text when it is appropriate for the interface.

### 4. `aria-controls` opens the element whose ID it references.

**Answer: False.** It describes a relationship. Application code or a suitable native element must implement the interaction.

### 5. If `aria-expanded` describes a changing control, it needs to stay synchronized with the control's current state.

**Answer: True.** A stale value gives assistive technology incorrect information about whether the controlled content is open or closed.

### 6. `aria-hidden="true"` visually hides the element.

**Answer: False.** It removes the element from the accessibility tree but leaves it visible. Use a suitable hiding technique if it should not appear on screen.

### 7. It is safe to put `aria-hidden="true"` on a container that contains a keyboard-focusable link.

**Answer: False.** The keyboard may still reach the link even though assistive technology has been told the link is absent. Do not hide focusable content from the accessibility tree this way.

### 8. A required field should always have `aria-invalid="true"` before the user has attempted to enter a value.

**Answer: False.** Required and invalid are different states. Mark a field invalid when validation shows that its current value is incorrect, and explain how to fix it.

## Short-answer questions

### 1. What kinds of information can ARIA communicate?

**Answer:** ARIA can communicate roles, accessible names, states, properties, and relationships. For example, it can identify a control as a button, give an icon-only control a name, or describe whether a disclosure is expanded.

### 2. Why should native HTML be preferred when it fits the need?

**Answer:** Native elements already provide appropriate semantics and common browser behavior, including keyboard support for controls. A custom element may require extra code for its role, name, focus, keyboard behavior, state, and action.

### 3. What is the difference between an accessible name and an accessible description?

**Answer:** The name identifies the element, such as "New password" for a field. A description adds context or instructions, such as "Use at least 12 characters." Visible text or a label should provide the name when possible; `aria-describedby` can connect extra information.

### 4. When might `aria-labelledby` be a better choice than `aria-label`?

**Answer:** Use `aria-labelledby` when suitable text already exists on the page. It refers to that visible text by ID, which avoids duplicating a label in markup and helps keep the name consistent with the page.

### 5. What does `aria-expanded` communicate, and what does it not do?

**Answer:** It communicates whether a control's associated content is expanded or collapsed. It does not open or close anything by itself. The interaction must update the content and the attribute together.

### 6. Why is `aria-hidden="true"` dangerous on an ancestor of a focusable element?

**Answer:** It hides the descendant from the accessibility tree, but does not necessarily remove it from keyboard focus. A keyboard user could reach content that a screen reader user cannot discover. Avoid hiding focusable content this way.

### 7. When is `aria-current="page"` useful?

**Answer:** It identifies the link or item for the page currently being viewed within a related set, such as site navigation. It supplements the link's visible name and destination.

### 8. What should you check after adding ARIA to an interactive control?

**Answer:** Check that the control has a clear name, can be reached and operated with a keyboard, and exposes states that match what is visible. Inspect the accessibility information and test important interactions with assistive technology where possible.

## Practical questions

### 1. Replace this generic element with the appropriate native element for a save action.

~~~html
<div class="button-like">Save</div>
~~~

**Answer:**

~~~html
<button type="button">Save</button>
~~~

The button already provides the role and keyboard behavior. Do not add `role="button"` to it.

### 2. Give this icon-only button an accessible name. The icon itself is decorative.

~~~html
<button type="button">
  <span>×</span>
</button>
~~~

**Answer:**

~~~html
<button type="button" aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</button>
~~~

The `aria-label` names the button. The decorative icon is hidden from the accessibility tree so it does not add noise to the name.

### 3. Use the existing visible heading as the name for this section.

~~~html
<h2 id="hours-heading">Opening hours</h2>
<section>
  <p>We are open Monday through Friday.</p>
</section>
~~~

**Answer:**

~~~html
<h2 id="hours-heading">Opening hours</h2>
<section aria-labelledby="hours-heading">
  <p>We are open Monday through Friday.</p>
</section>
~~~

The section refers to the existing heading rather than duplicating its text in an `aria-label`.

### 4. Associate this password field with its visible hint as a description.

~~~html
<label for="password">Password</label>
<input id="password" name="password" type="password">
<p id="password-hint">Use at least 12 characters.</p>
~~~

**Answer:**

~~~html
<label for="password">Password</label>
<input id="password" name="password" type="password"
       aria-describedby="password-hint">
<p id="password-hint">Use at least 12 characters.</p>
~~~

The visible label names the field. `aria-describedby` connects the additional instruction.

### 5. Mark up the initial collapsed state of this help disclosure and identify its controlled panel.

~~~html
<button type="button">Show help</button>
<div id="help-panel" hidden>
  <p>Contact support if you cannot sign in.</p>
</div>
~~~

**Answer:**

~~~html
<button type="button" aria-expanded="false" aria-controls="help-panel">
  Show help
</button>
<div id="help-panel" hidden>
  <p>Contact support if you cannot sign in.</p>
</div>
~~~

This describes the starting state. The code that handles activation must reveal the panel and set `aria-expanded="true"`, then reverse both when the panel closes. `aria-controls` does not implement the toggle.

### 6. Mark the current page in this navigation list.

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/guides/">Guides</a></li>
  </ul>
</nav>
~~~

**Answer:**

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/guides/" aria-current="page">Guides</a></li>
  </ul>
</nav>
~~~

This answer assumes the user is viewing `/guides/`. The current-page state should match the actual page.

### 7. Mark this button as an initially unpressed toggle button.

~~~html
<button type="button">Mute</button>
~~~

**Answer:**

~~~html
<button type="button" aria-pressed="false">Mute</button>
~~~

Keep the toggle's label stable while its pressed state changes. The code for the interaction must update `aria-pressed` when the user toggles mute.

### 8. Mark this postal code field invalid and associate its error message.

~~~html
<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code">
<p id="postal-error">Enter the 5-digit postal code.</p>
~~~

**Answer:**

~~~html
<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code"
       aria-invalid="true" aria-describedby="postal-error">
<p id="postal-error">Enter the 5-digit postal code.</p>
~~~

This represents a value that has already failed validation. The field's value, visible error, and invalid state should agree.

### 9. Correct the use of `aria-hidden` on this link, assuming the link should remain available.

~~~html
<a href="/account/" aria-hidden="true">Account</a>
~~~

**Answer:**

~~~html
<a href="/account/">Account</a>
~~~

Remove `aria-hidden` because the link is meaningful and should be available to assistive technology. If it should be unavailable to everyone, use an appropriate hidden or disabled-state approach instead of hiding it from only one audience.

### 10. Remove redundant roles and correct the misleading disclosure state in this example. Assume the button does not control any expandable content.

~~~html
<nav role="navigation" aria-label="Main">
  <button type="button" role="button" aria-expanded="false">Save</button>
</nav>
~~~

**Answer:**

~~~html
<nav aria-label="Main">
  <button type="button">Save</button>
</nav>
~~~

`<nav>` already supplies navigation semantics and `<button>` already supplies button semantics. Because this button does not control expandable content, `aria-expanded` does not describe its state and should be removed.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [40 - Accessibility with native HTML](40-accessibility-with-html.md) | [Lesson](../lessons/41-aria-in-html.md) | [Example](../examples/41-aria-in-html.md) | [42 - Language, text direction, and international content](42-language-and-text-direction.md) |