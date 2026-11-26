# 41 - ARIA in HTML: when and how to use it

ARIA adds accessibility information to HTML when native HTML alone cannot express a needed name, role, state, or relationship. The safest starting point is still to choose the right HTML element. This chapter explains what ARIA can communicate, where it helps, and how to avoid common mistakes.

## What you will learn

- What ARIA roles, names, states, and properties communicate
- Why native HTML should come first
- How to give controls accessible names and descriptions
- How attributes such as `aria-expanded`, `aria-current`, and `aria-invalid` describe a control's state
- Why ARIA does not create appearance, keyboard support, or interactive behavior
- How to review ARIA use for accuracy

## What ARIA adds

ARIA stands for Accessible Rich Internet Applications. It is a set of attributes that helps browsers expose information about interface elements to accessibility APIs, which assistive technologies can use.

ARIA does not add visible text, visual styling, focus behavior, keyboard interaction, or JavaScript behavior. It describes information. The page author remains responsible for making the interface work.

For example, this gives a generic element a button role, but it does not make it behave like a button:

~~~html
<div role="button">Save</div>
~~~

It is better to use the native button, which already has the right semantics, focus behavior, and keyboard activation:

~~~html
<button type="button">Save</button>
~~~

Think of ARIA as a way to communicate a missing semantic detail, not as a replacement for HTML elements.

## The main kinds of ARIA information

### Roles describe what an element is

A role identifies an element's purpose, such as `button`, `dialog`, `navigation`, or `status`. Native HTML elements already provide many roles. A `<button>` is already exposed as a button, and a `<nav>` is already exposed as a navigation landmark.

Do not repeat a native element's role without a reason:

~~~html
<!-- The button already has button semantics. -->
<button type="button">Print</button>
~~~

### Names identify an element

An accessible name is the short label assistive technology can use to identify an element. Visible text is usually the clearest source of a name:

~~~html
<button type="button">Save changes</button>
~~~

For a control with no visible text, an ARIA naming attribute can provide a name. The attribute does not add visible words to the page.

### States and properties describe details

States and properties can communicate information such as whether a panel is expanded, which navigation link is current, or whether a form field has an error. Some describe changing conditions and need to stay in sync with what the user sees and can operate.

ARIA attributes only work where they are permitted by the element's role and the HTML specification. Do not add an attribute just because its name seems appropriate. Check its supported use and ensure its value matches the interface.

## Start with native HTML

Before adding ARIA, ask whether an HTML element or attribute already communicates the information or supplies the needed behavior.

| Need | Prefer this HTML | Avoid adding ARIA without a specific need |
| --- | --- | --- |
| An action | `<button>` | A `<div role="button">` |
| A destination | `<a href="...">` | A link role on a generic element |
| A form label | `<label for="...">` | Replacing the visible label with `aria-label` |
| A navigation region | `<nav>` | A redundant `role="navigation"` |
| A disclosure control | `<details>` and `<summary>` when suitable | Recreating native disclosure semantics with generic elements |
| A hidden section | The `hidden` attribute when it should not be displayed | `aria-hidden="true"` when the goal is to hide it visually |

Native elements communicate meaning and include browser behavior. ARIA does not repair a poor element choice automatically. For example, changing a `<div>` into `role="button"` does not make the `<div>` keyboard-operable.

## Give controls useful accessible names

Use visible text as the name whenever possible. It is easy to find, understand, and keep consistent with what sighted users see.

### Use `aria-labelledby` to refer to existing text

`aria-labelledby` takes one or more element IDs and uses the referenced text as the accessible name. The referenced IDs must exist in the same document and should be unique.

~~~html
<h2 id="delivery-heading">Delivery options</h2>
<section aria-labelledby="delivery-heading">
  <p>Choose standard or express delivery at checkout.</p>
</section>
~~~

Here the visible heading names the section. This can be useful when a region or control needs a name that is already present on the page.

### Use `aria-label` when a visible label is not available

`aria-label` provides a text name directly in markup. It is useful for a control whose visible content is only an icon, as long as the wording describes the action:

~~~html
<button type="button" aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</button>
~~~

The `aria-label` names the button for assistive technology. It does not make the words "Close dialog" appear on screen. If a visible label is appropriate, use visible text instead.

Avoid replacing or contradicting visible button text with a different `aria-label`. A mismatch can confuse people who use speech input and people who see the label but hear another name from assistive technology.

### Use `aria-describedby` for extra information

A description adds helpful context after the control's name. It is not a substitute for a label. For a password field, a visible label names the field, while `aria-describedby` can point to a note about the password rules:

~~~html
<label for="new-password">New password</label>
<input id="new-password" name="new-password" type="password"
       aria-describedby="password-hint">
<p id="password-hint">Use at least 12 characters.</p>
~~~

The label answers "What is this control?" The description gives additional instructions.

## Describe states and relationships accurately

A state should describe what the interface currently does, not what the author hopes it will do. When the interface changes, its state information must change with it.

### `aria-expanded` describes an expandable control

Use `aria-expanded` on the control that opens and closes content. `aria-controls` can identify the controlled element by its ID:

~~~html
<button type="button" aria-expanded="false" aria-controls="help-panel">
  Show help
</button>
<div id="help-panel" hidden>
  <p>Enter the email address associated with your account.</p>
</div>
~~~

This example describes the initial collapsed state. For an interactive disclosure, the code that opens the panel must also remove `hidden` and update `aria-expanded` to `true`. Closing it must hide the panel and set the value back to `false`. The ARIA attributes do not perform those actions by themselves.

If a native `<details>` element fits the need, it already provides disclosure behavior and exposes its open or closed state. Do not add duplicate state markup without a clear reason.

### `aria-current` identifies the current item

`aria-current` can identify the current page or step within a related set. For example, a site navigation can mark the link for the page being viewed:

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/guides/" aria-current="page">Guides</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>
~~~

The link still needs a real `href`. The state tells assistive technology that this destination is current; it does not replace the link's visible text.

### `aria-pressed` describes a toggle button

A toggle button can use `aria-pressed` to expose whether it is on or off:

~~~html
<button type="button" aria-pressed="false">Mute</button>
~~~

When the user activates it, the application must change the pressed state and perform the corresponding action. For a toggle button, keep its label stable, such as "Mute", while its pressed state changes. If the action label changes between "Mute" and "Unmute", that changing label may communicate the state without `aria-pressed`.

### `aria-invalid` can identify an invalid field

Use `aria-invalid="true"` when a field has been checked and its current value is invalid. Connect the field to a helpful error message:

~~~html
<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code" inputmode="numeric"
       aria-invalid="true" aria-describedby="postal-error">
<p id="postal-error">Enter the 5-digit postal code.</p>
~~~

The example represents a field after an error has been found. Do not mark every required field invalid before the user has had a chance to enter a value. Keep the visible error message, the validity state, and the field value in agreement.

## Understand `aria-hidden`

`aria-hidden="true"` removes an element and its descendants from the accessibility tree. It does not visually hide the content.

It can be appropriate for an icon that is decorative because the button already has a name:

~~~html
<button type="button" aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</button>
~~~

Do not place `aria-hidden="true"` on a focusable element or on an ancestor of a focusable element. A keyboard user could still reach content that assistive technology has been told does not exist. If content should be hidden visually and from assistive technology, use an appropriate HTML or CSS hiding technique. The `hidden` attribute is suitable when content should not be displayed at all.

## Common ARIA mistakes

### Adding ARIA when native HTML already does the job

A button does not need `role="button"`. A `<label>` does not need ARIA to label its associated form field. Prefer the native element and its built-in features.

### Assuming a role adds interaction

`role="button"` does not make an element focusable, respond to Enter or Space, or run an action. A custom control needs all of those behaviors and correctly managed states. Use a native control whenever it fits.

### Using `aria-label` instead of visible text

An accessible name supplied only through ARIA may not be visible to everyone. Keep useful visible labels, especially for form controls and buttons. Use `aria-label` when visible wording is genuinely not available or appropriate.

### Letting the state become stale

A panel that is open while `aria-expanded` remains `false` exposes a mismatch. Whenever an interface changes, update its visible content and its ARIA state together.

### Hiding content from only one audience

`aria-hidden="true"` does not hide content on screen. Conversely, CSS-only visual hiding may leave content available to assistive technology, depending on the technique. Choose the hiding method for the intended result and ensure hidden controls cannot receive focus unexpectedly.

### Treating ARIA as a replacement for testing

ARIA can be syntactically valid and still communicate the wrong thing. Check the page with a keyboard, inspect the browser's accessibility information when available, and test important interactions with assistive technology.

## A practical ARIA review

Use this checklist when reviewing a page:

1. Does a native HTML element already provide the needed meaning and behavior?
2. Can visible text provide the control's name?
3. Does each ARIA attribute make a specific, accurate contribution?
4. Do all ID references point to existing, unique elements?
5. Do changing states match the current visible and interactive state?
6. Can keyboard users reach and operate every interactive control?
7. Is any focusable content incorrectly hidden with `aria-hidden`?
8. Do visible labels and accessible names agree?
9. Have important flows been checked with a browser and assistive technology?

## Key points

- ARIA communicates roles, names, states, and relationships to accessibility APIs.
- Native HTML should be the first choice because it provides meaning and built-in behavior.
- ARIA does not create visual styles, keyboard support, or interactive behavior.
- Prefer visible text for names, `aria-labelledby` for existing page text, and `aria-label` only when an appropriate visible name is unavailable.
- Use state attributes only when they accurately reflect the current interface and keep them synchronized as it changes.
- `aria-hidden="true"` affects the accessibility tree, not visual display, and must not hide focusable content.
- Test what the page communicates and how it works, not just whether its markup validates.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [40 - Accessibility with native HTML](40-accessibility-with-html.md) | [Q&A](../qnas/41-aria-in-html.md) | [Example](../examples/41-aria-in-html.md) | [42 - Language, text direction, and international content](42-language-and-text-direction.md) |