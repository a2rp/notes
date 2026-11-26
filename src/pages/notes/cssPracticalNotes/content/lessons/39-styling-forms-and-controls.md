# 39 - Styling forms and controls

Forms let people enter, choose, and submit information. CSS can make controls fit a page's visual design, but the controls still need to be clear, operable, and recognizable. This chapter covers styling text fields, buttons, choice controls, field groups, and common interaction states.

## Learning outcomes

After this chapter, you should be able to:

- Style form controls consistently with page typography and spacing.
- Keep labels, instructions, and validation information easy to identify.
- Provide visible focus feedback for keyboard users.
- Style checked, required, invalid, disabled, and read-only states appropriately.
- Use `accent-color` to tint native checkboxes, radio buttons, and related controls.
- Recognize when `appearance: none` adds unnecessary complexity.

## Start with meaningful form markup

CSS changes presentation. HTML supplies the control type, its label, its group, and its behavior. Keep those responsibilities separate.

~~~html
<form action="/subscribe" method="post">
  <div class="form-field">
    <label for="email">Email address</label>
    <p id="email-help">We will use this address for the workshop update.</p>
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
      aria-describedby="email-help"
    >
  </div>

  <button type="submit">Subscribe</button>
</form>
~~~

Associate each visible label with its control. A placeholder is not a replacement for a label because it disappears as a person enters a value. Use the appropriate input type so the browser can provide suitable behavior and input assistance.

## Arrange fields and labels

Use normal layout tools to create consistent gaps and alignment. A grid is useful for stacking each label and control, and a `fieldset` can group related choices.

~~~css
form {
  display: grid;
  gap: 1.5rem;
}

.form-field {
  display: grid;
  gap: 0.45rem;
}

fieldset {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
}
~~~

Use a `legend` to name a `fieldset`. For example, a group of radio buttons that asks for a delivery method should have one legend explaining what the choices mean.

## Match control typography and spacing

Some browser controls do not automatically use the same font as surrounding text. Setting the font explicitly gives text controls and buttons a consistent baseline.

~~~css
input,
select,
textarea,
button {
  font: inherit;
}

input,
select,
textarea {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.65rem 0.75rem;
  color: #1c2938;
  background-color: #fff;
  border: 1px solid #64748b;
  border-radius: 0.4rem;
}

textarea {
  min-height: 8rem;
  resize: vertical;
}
~~~

Use enough padding to make fields comfortable to read and operate. Let a `textarea` grow vertically when that suits the page. Avoid fixed heights that clip user-entered text or browser-provided controls.

## Keep focus visible

A person who moves through a form with a keyboard needs to see which control is ready for input. Keep the browser's focus indicator or provide a visible replacement.

~~~css
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible {
  outline: 3px solid #155e9a;
  outline-offset: 2px;
}

.form-field:focus-within {
  color: #123f62;
}
~~~

An outline is drawn outside the border and does not take up layout space. Do not remove focus styling without replacing it with a clear indicator. A container can use `:focus-within` to respond when one of its descendants receives focus, but that response should not replace the focus style on the control itself.

## Style native choice controls

Use `accent-color` to coordinate the accent on controls such as checkboxes and radio buttons while keeping their native presentation.

~~~css
:root {
  accent-color: #075b9b;
}
~~~

The browser decides how the accent is applied to each control and platform. A custom accent does not mean that every part of every control uses exactly the same color. Check that the checked state remains recognizable and readable.

For most forms, styling the accent while retaining native controls is simpler than rebuilding checkbox and radio appearances.

## Style select controls carefully

A select control can be given a font, padding, border, and background like other fields:

~~~css
select {
  font: inherit;
  padding: 0.65rem 2.5rem 0.65rem 0.75rem;
  border: 1px solid #64748b;
  border-radius: 0.4rem;
}
~~~

The visible menu and picker can be controlled by the browser or operating system, and their appearance may differ by platform. Keep enough room for the native indicator. Avoid assuming every part of an opened picker can be styled the same way everywhere.

## Style buttons as controls

Buttons should look interactive and should have a clear hover, focus, and disabled state. Keep their text readable and their padding sufficient for comfortable activation.

~~~css
button {
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  color: #fff;
  background-color: #075b9b;
  border: 1px solid #075b9b;
  border-radius: 0.4rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

button:hover:enabled {
  background-color: #064574;
}

button:disabled {
  color: #465363;
  background-color: #d9e0e7;
  border-color: #aeb9c5;
  cursor: not-allowed;
}
~~~

Do not communicate disabled state through a washed-out color alone. Make sure the text and control remain understandable. The `:enabled` and `:disabled` pseudo-classes can target controls according to their disabled state.

## Use state selectors with care

CSS can reflect some built-in form states:

| Selector | State it matches |
| :--- | :--- |
| `:checked` | A selected checkbox or radio button |
| `:required` | A control with a required constraint |
| `:optional` | A control without a required constraint |
| `:valid` | A control that currently satisfies its constraints |
| `:invalid` | A control that currently fails a constraint |
| `:disabled` | A disabled control |
| `:read-only` | A control whose value cannot be edited by the user |
| `:placeholder-shown` | A control currently displaying its placeholder |

For example, a required email input can receive a subtle style when invalid:

~~~css
input:required:invalid {
  border-color: #a33125;
}
~~~

Use the visual state along with useful text that explains what needs attention. Do not rely on color alone to identify an error. Also consider when to show invalid styling: showing errors before a person has had a chance to complete a field can be distracting. A form should make its validation messages available in its markup and behavior, not just its color rules.

`:disabled` and `:read-only` are different. A disabled control is generally unavailable for interaction and is not submitted with the form. A read-only control can still be focused and its value is submitted, but the user cannot edit that value through the control.

## Style placeholders without replacing labels

The `::placeholder` pseudo-element targets placeholder text. Keep it readable, but do not use it as the only label or instruction.

~~~css
input::placeholder,
textarea::placeholder {
  color: #5b6878;
  opacity: 1;
}
~~~

A placeholder can provide a short example or hint. Put persistent instructions in visible text associated with the control, and keep sufficient contrast between placeholder text and its background.

## When to use `appearance: none`

`appearance: none` can suppress a control's native presentation so you can build a custom appearance. This gives more control, but it also means you may need to recreate important visual details and states yourself.

Use it only when the custom design needs that level of control. For a custom checkbox or radio, account for unchecked, checked, focused, disabled, and high-contrast states. Keep the native HTML control and its behavior, and ensure the visible custom indicator still communicates the state. For a standard form, native controls with thoughtful spacing and an accent color are often a more robust choice.

## Common mistakes

- Removing outlines without adding an equally visible focus style.
- Using placeholder text instead of a visible label.
- Styling errors only by changing a border color.
- Making controls so short or narrow that entered content is clipped.
- Replacing native checkboxes or radio buttons without recreating their states.
- Assuming a select menu looks identical in every browser and operating system.
- Making disabled controls indistinguishable from active controls.

## Try it yourself

1. Add an email field with a visible label, a short hint, and `autocomplete="email"`.
2. Use grid layout to create equal spacing between labels and controls.
3. Add a visible focus outline and use Tab to move through the form.
4. Set an `accent-color` and observe which native controls use it in your browser.
5. Add a checkbox group inside a `fieldset` with a descriptive `legend`.
6. Style a required invalid input, then add text that explains how to correct it.
7. Compare a disabled control with a read-only text field and describe the difference.

## Key points

- HTML provides form control meaning and behavior, while CSS styles their presentation.
- Visible labels and instructions remain available while a person fills in a field.
- Text controls, buttons, and groups can share a consistent font and spacing system.
- Focus indicators must remain visible for keyboard interaction.
- `accent-color` can tint native choice controls without rebuilding their appearance.
- Validation, disabled, and read-only states should be clear in more than color alone.
- Use `appearance: none` only when you are ready to recreate the control's visual states.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [38 - Styling links and link states](38-styling-links.md) | [Q&A](../qnas/39-styling-forms-and-controls.md) | [Example](../examples/39-styling-forms-and-controls.md) | [40 - Replaced elements, aspect ratios, and object fitting](40-replaced-elements-and-object-fitting.md) |