# 45 - Popover attributes: Questions and Answers

Use these questions to review [Chapter 45 - Popover attributes](../lessons/45-popover-attributes.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does the `popover` attribute do?

A. It creates a modal dialog that blocks the page

B. It designates an element as popover content that can be shown in the top layer

C. It automatically translates the element's text

D. It makes every child element a button

**Answer: B.** The attribute designates the element as a popover. The popover starts hidden and can be shown by an invoking control or script.

### 2. What is the default behavior when `popover` is present with no value?

A. It behaves like `popover="manual"`

B. It behaves like `popover="hint"`

C. It behaves like `popover="auto"`

D. It makes the element visible on page load

**Answer: C.** An empty `popover` attribute is equivalent to `popover="auto"`. The element is still hidden initially.

### 3. What should the value of `popovertarget` contain?

A. The CSS class of the target

B. The ID of the popover element

C. The text that should appear in the popover

D. The name of a JavaScript function

**Answer: B.** The invoking control points to the popover's ID. The ID must match and should be unique in the document.

### 4. What happens when `popovertargetaction` is omitted?

A. The button hides the popover only

B. The button shows the popover only

C. The button toggles the popover between hidden and shown

D. The button submits the popover content to a server

**Answer: C.** The default action is `toggle`. Use `show` or `hide` when the control is intended to perform only one of those actions.

### 5. Which actions can `popovertargetaction` specify?

A. `open`, `close`, and `submit`

B. `show`, `hide`, and `toggle`

C. `start`, `stop`, and `reset`

D. `focus`, `blur`, and `click`

**Answer: B.** The attribute accepts `show`, `hide`, or `toggle` to control the target popover.

### 6. What is a typical behavior of an `auto` popover?

A. It can be light-dismissed and generally closes other auto popovers when shown

B. It cannot be closed after it is shown

C. It makes the rest of the page inert

D. It only opens when a form is submitted

**Answer: A.** Auto popovers support light dismissal, such as clicking outside or pressing Escape. Opening another auto popover generally closes the current one, except in nested cases.

### 7. What is true about a `manual` popover?

A. It closes automatically whenever the user clicks outside it

B. It never requires an explicit close action

C. It is not light-dismissed and does not automatically close other manual popovers

D. It blocks interaction with the rest of the page

**Answer: C.** Manual popovers remain open until an explicit hide action or script closes them. Provide a clear way to dismiss them.

### 8. How does a `hint` popover differ from an `auto` popover?

A. Showing a hint does not close an open auto popover

B. A hint is always modal

C. A hint cannot be dismissed

D. A hint must be inside a form

**Answer: A.** Hint popovers are designed for supplemental information. They can be dismissed, but showing one does not close an auto popover.

### 9. What happens to a shown popover in relation to ancestor overflow and stacking?

A. It stays clipped by `overflow: hidden`

B. It appears in the browser's top layer above ordinary content

C. It is moved to a new browser tab

D. It is removed from the document tree

**Answer: B.** The top layer displays the popover above ordinary page content, outside the usual clipping and stacking context of ancestors. Its DOM position does not change.

### 10. Which feature should be used when the background page must be blocked until the user completes a focused task?

A. `popover="manual"`

B. `popover="hint"`

C. `<dialog>` opened with `showModal()`

D. `dir="auto"`

**Answer: C.** Popovers are non-modal and leave the rest of the page interactive. A modal dialog is the matching pattern when the background must be made inert.

## True or false

### 1. An element with the `popover` attribute is hidden initially.

**Answer: True.** The attribute designates popover content; an invoking control or script must show it.

### 2. Adding `popover` changes the element's position in the HTML source order.

**Answer: False.** The browser displays a shown popover in the top layer, but it stays at its original location in the DOM.

### 3. An `auto` popover can be light-dismissed, for example by clicking outside it.

**Answer: True.** Auto popovers support light dismissal and respond to close requests such as Escape.

### 4. A `manual` popover automatically closes when another manual popover opens.

**Answer: False.** Manual popovers are controlled explicitly and can remain open independently.

### 5. Writing `<div popover="">` is equivalent to `popover="auto"`.

**Answer: True.** The empty value means auto behavior, just like an attribute with no explicit value.

### 6. Showing a hint popover closes an open auto popover.

**Answer: False.** Hint popovers do not close auto popovers when they are shown.

### 7. Showing a popover makes the rest of the document inert.

**Answer: False.** A popover is non-modal, so users can continue interacting with the rest of the page.

### 8. A button's `popovertarget` value should refer to an ID on an element that has the `popover` attribute.

**Answer: True.** The relationship depends on a matching target ID. Check for typos and duplicate IDs.

## Short-answer questions

### 1. What does `popovertarget` connect?

**Answer:** It connects a button or input control to a popover element by referring to the popover's ID. The target element needs the `popover` attribute.

### 2. What does `popovertargetaction` control?

**Answer:** It specifies whether the control shows, hides, or toggles the target popover. If it is omitted, the action defaults to `toggle`.

### 3. How does an auto popover behave when dismissed?

**Answer:** It can close when the user clicks outside it, presses Escape, or opens another auto popover. Nested auto popovers have exceptions to the one-open-at-a-time behavior.

### 4. When might a manual popover be useful?

**Answer:** It can be useful when content must remain visible until an explicit action closes it, or when multiple independent popovers may stay open together. Include a visible hide control or another deliberate close mechanism.

### 5. Why is a popover not a substitute for a modal dialog?

**Answer:** A popover leaves the rest of the page interactive and does not block the background. A modal dialog opened with `showModal()` makes the rest of the document inert until the dialog closes.

### 6. What is the browser's top layer, and what does it mean for a popover?

**Answer:** The top layer is a browser-managed display layer above ordinary page content. A shown popover can appear above ancestor stacking contexts and is not clipped by an ancestor's overflow, while remaining in its original DOM location.

### 7. Why should a popover's invoking button have a clear label?

**Answer:** The button's label should tell users what content or action it controls. The `popovertarget` attribute establishes the relationship but does not provide a useful visible name by itself.

### 8. What semantic elements could you use for popover content?

**Answer:** Choose according to the content. For example, use `<nav>` for navigation links, `<aside>` for related supporting content, or `<div>` when no more specific semantic element fits.

## Practical questions

### 1. Create a button that toggles a simple popover with an ID of `delivery-info`.

**Answer:**

~~~html
<button type="button" popovertarget="delivery-info">
  Delivery information
</button>

<aside id="delivery-info" popover>
  <p>Orders usually arrive within three business days.</p>
</aside>
~~~

The button's `popovertarget` matches the popover's ID. Since no action is specified, activating the button toggles the popover.

### 2. Make this button show the popover without toggling it closed on a second activation.

~~~html
<button type="button" popovertarget="hours">Show hours</button>
<div id="hours" popover>
  <p>The garden is open from 9 a.m. to 5 p.m.</p>
</div>
~~~

**Answer:**

~~~html
<button type="button" popovertarget="hours"
        popovertargetaction="show">
  Show hours
</button>
<div id="hours" popover>
  <p>The garden is open from 9 a.m. to 5 p.m.</p>
</div>
~~~

The `show` action shows a hidden target and does not request a toggle action.

### 3. Add a button inside this popover to hide it explicitly.

~~~html
<div id="help" popover="manual">
  <p>Contact support if you cannot sign in.</p>
</div>
~~~

**Answer:**

~~~html
<div id="help" popover="manual">
  <p>Contact support if you cannot sign in.</p>
  <button type="button" popovertarget="help"
          popovertargetaction="hide">
    Close help
  </button>
</div>
~~~

A manual popover is not light-dismissed, so this explicit hide control gives users a way to close it.

### 4. Fix this popover control so it targets the existing popover.

~~~html
<button type="button" popovertarget="profile-help">Profile help</button>
<aside id="profile-info" popover>
  <p>Update your name and profile picture here.</p>
</aside>
~~~

**Answer:**

~~~html
<button type="button" popovertarget="profile-info">Profile help</button>
<aside id="profile-info" popover>
  <p>Update your name and profile picture here.</p>
</aside>
~~~

The ID in `popovertarget` must match the target element's ID exactly.

### 5. Mark this as a hint popover containing supplemental username guidance.

~~~html
<div id="username-help">
  <p>Your username must be between 4 and 20 characters.</p>
</div>
~~~

**Answer:**

~~~html
<div id="username-help" popover="hint">
  <p>Your username must be between 4 and 20 characters.</p>
</div>
~~~

Hint behavior is intended for supplemental information and does not close an auto popover when shown. Check browser support for older target browsers.

### 6. Give this content an appropriate semantic element. It contains the site's primary navigation links.

~~~html
<div id="site-navigation" popover>
  <ul>
    <li><a href="/plants/">Plants</a></li>
    <li><a href="/workshops/">Workshops</a></li>
  </ul>
</div>
~~~

**Answer:**

~~~html
<nav id="site-navigation" popover aria-label="Main">
  <ul>
    <li><a href="/plants/">Plants</a></li>
    <li><a href="/workshops/">Workshops</a></li>
  </ul>
</nav>
~~~

A navigation landmark describes the purpose of these links. The popover attribute controls how the navigation is shown, not what it means.

### 7. Change the second control so it hides the first popover instead of toggling it.

~~~html
<button type="button" popovertarget="notice">Show notice</button>
<div id="notice" popover>
  <p>The office closes at 4 p.m.</p>
  <button type="button" popovertarget="notice">Close notice</button>
</div>
~~~

**Answer:**

~~~html
<button type="button" popovertarget="notice">Show notice</button>
<div id="notice" popover>
  <p>The office closes at 4 p.m.</p>
  <button type="button" popovertarget="notice"
          popovertargetaction="hide">
    Close notice
  </button>
</div>
~~~

The explicit `hide` action better matches the Close notice button's label.

### 8. This interface must block the rest of the page until the user confirms a choice. Which pattern should replace the popover?

~~~html
<div id="confirm-delete" popover>
  <p>Delete this file?</p>
  <button type="button">Cancel</button>
  <button type="button">Delete</button>
</div>
~~~

**Answer:** Use a modal `<dialog>` opened with `showModal()`:

~~~html
<dialog id="confirm-delete" aria-labelledby="delete-title">
  <h2 id="delete-title">Delete this file?</h2>
  <form method="dialog">
    <button type="submit" value="cancel">Cancel</button>
    <button type="submit" value="delete">Delete</button>
  </form>
</dialog>
~~~

A popover is non-modal. A modal dialog is the right pattern when the background must be inert until a choice is made.

### 9. Create two independent manual popovers that may remain open at the same time.

**Answer:**

~~~html
<button type="button" popovertarget="first-tip">First tip</button>
<div id="first-tip" popover="manual">
  <p>Water seedlings gently.</p>
  <button type="button" popovertarget="first-tip"
          popovertargetaction="hide">Close first tip</button>
</div>

<button type="button" popovertarget="second-tip">Second tip</button>
<div id="second-tip" popover="manual">
  <p>Give new plants time to settle.</p>
  <button type="button" popovertarget="second-tip"
          popovertargetaction="hide">Close second tip</button>
</div>
~~~

Manual popovers do not automatically close one another. Each one has an explicit hide control.

### 10. Explain why this popover can appear above a container with `overflow: hidden`, but still appears in its original source position when reading the document.

**Answer:** A shown popover is displayed in the browser's top layer, so it is not clipped by ancestor overflow. Its DOM node stays where it was authored, so its source and reading order do not change.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [44 - Dialog elements](44-dialog-element.md) | [Lesson](../lessons/45-popover-attributes.md) | [Example](../examples/45-popover-attributes.md) | [46 - Template elements](46-template-element.md) |