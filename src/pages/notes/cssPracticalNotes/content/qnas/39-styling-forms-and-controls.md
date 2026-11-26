# 39 - Styling forms and controls - Q&A

Review form-control styling, labels, focus indicators, native choice controls, and validation states. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. Which part of a form should CSS control?

- A. The semantic meaning of each field
- B. The type of data a control accepts
- C. The visual presentation of the controls
- D. The form submission method

**Answer: C. The visual presentation of the controls.**

**Explanation:** HTML provides a control's meaning and behavior. CSS changes how it looks and how it is arranged.

### 2. Why should a text field have a visible label?

- A. A label replaces the need for an input type
- B. The label identifies the field and stays available while someone enters a value
- C. A label makes the browser skip validation
- D. The label changes the control's submitted value

**Answer: B. The label identifies the field and stays available while someone enters a value.**

**Explanation:** Placeholder text disappears as someone types, so it should not be the only label or instruction.

### 3. Which CSS declaration helps controls use the surrounding page typography?

- A. `font: inherit;`
- B. `font: none;`
- C. `text-style: parent;`
- D. `appearance: text;`

**Answer: A. `font: inherit;`.**

**Explanation:** Applying the inherited font to controls and buttons gives them a more consistent typographic baseline.

### 4. What does `accent-color` do?

- A. Replaces every part of a form control with the chosen color
- B. Provides an accent color for browser-rendered interface controls
- C. Changes a control into a custom HTML element
- D. Changes the color of the page text only

**Answer: B. It provides an accent color for browser-rendered interface controls.**

**Explanation:** The browser decides how the accent is used on each control and platform. It does not guarantee that every part uses the exact same color.

### 5. What should happen when a form control receives keyboard focus?

- A. The focus indicator should remain visible
- B. The control should become disabled
- C. Its label should be hidden
- D. The page should submit

**Answer: A. The focus indicator should remain visible.**

**Explanation:** Keyboard users need to know which control is ready for interaction. If the browser's focus style is changed, replace it with a clear visible indicator.

### 6. Which element groups related form controls and can have a group label?

- A. `<fieldset>` with a `<legend>`
- B. `<section>` with a `<caption>`
- C. `<label>` with a `<summary>`
- D. `<form>` with a `<title>`

**Answer: A. `<fieldset>` with a `<legend>`.**

**Explanation:** A fieldset groups related controls, and its legend gives the group a name.

### 7. Why is it usually simpler to keep native checkbox and radio appearances?

- A. Native controls cannot be focused
- B. Native controls already provide platform interaction and state presentation
- C. Native controls do not need labels
- D. CSS cannot select native controls

**Answer: B. Native controls already provide platform interaction and state presentation.**

**Explanation:** Replacing their appearance can require rebuilding checked, unchecked, focused, disabled, and other visual states.

### 8. Which selector matches a disabled form control?

- A. `:inactive`
- B. `:disabled`
- C. `:readonly`
- D. `:blocked`

**Answer: B. `:disabled`.**

**Explanation:** `:disabled` selects elements that are disabled. `:read-only` identifies a different state on controls that support read-only values.

## Short-answer questions

### 9. Why is placeholder text not a replacement for a label?

**Answer:** Placeholder text can disappear as soon as a person enters a value, while a visible label remains available to identify the field.

**Explanation:** A placeholder may provide a short example or hint. Keep the field's name in a visible label.

### 10. What does `:focus-within` match?

**Answer:** It matches an element when the element itself or one of its descendants has focus.

**Explanation:** It can help style a containing field group, but it should not replace a visible focus indicator on the actual control.

### 11. How is `:disabled` different from `:read-only`?

**Answer:** A disabled control is unavailable for interaction and is generally omitted from form submission. A supported read-only control cannot be edited through the control, but can still be focused and submitted.

**Explanation:** The attributes represent different behaviors. Do not style them as if they meant the same thing.

### 12. Why should invalid fields not be indicated by color alone?

**Answer:** Some people may not perceive the color difference, and color does not explain how to fix the problem.

**Explanation:** Provide a useful text message along with any visual styling. Avoid showing an error state before the person has had a reasonable chance to complete the field.

### 13. What does `:checked` select?

**Answer:** It selects a checked checkbox or selected radio button.

**Explanation:** It can style a control based on its checked state. Native control behavior and labels should remain intact.

### 14. What does `::placeholder` select?

**Answer:** It selects the placeholder text displayed by a control.

**Explanation:** Use it for a short hint or example, keep it readable, and do not use it as the only label.

### 15. What should a visible focus outline do for a form field?

**Answer:** It should clearly show which field currently has focus without obscuring the field or its contents.

**Explanation:** An outline can sit outside the border without changing the field's layout size. Preserve the browser style or provide an equally visible alternative.

### 16. What is a `fieldset` and `legend` useful for?

**Answer:** They group related controls and provide a name for the group.

**Explanation:** A legend such as “Choose a delivery method” gives context to a set of related radio buttons.

## Applied questions

### 17. Which state selectors could style a required field that does not currently satisfy its constraints?

**Answer:** `:required:invalid`.

~~~css
input:required:invalid {
  border-color: #a33125;
}
~~~

**Explanation:** `:required` selects a control with a required constraint, and `:invalid` selects one that currently fails its constraints. Provide text explaining the issue and consider when the error should appear.

### 18. How can you make a set of text fields and buttons use the same font as the page?

**Answer:** Set `font: inherit` on the controls.

~~~css
input,
select,
textarea,
button {
  font: inherit;
}
~~~

**Explanation:** This lets controls use the surrounding page font instead of relying on browser defaults that may differ.

### 19. A checkbox should keep its native shape but use the site's blue accent. What CSS property should you use?

**Answer:** `accent-color`.

~~~css
:root {
  accent-color: #075b9b;
}
~~~

**Explanation:** The browser applies the accent to appropriate parts of native controls. The exact rendering can vary by control and platform.

### 20. What is missing from this field if the placeholder is “Email address” but there is no visible label?

**Answer:** A visible label associated with the input.

**Explanation:** A placeholder is not a persistent field name. Add a `<label>` with a matching `for` and `id`, or place the input inside its label.

### 21. When could you use `:focus-within` on a field wrapper?

**Answer:** To give the surrounding field group a subtle style while one of its controls has focus.

~~~css
.form-field:focus-within {
  color: #123f62;
}
~~~

**Explanation:** Keep a separate visible outline or other indicator on the focused control itself so the exact focus location remains clear.

### 22. What should you check before using `appearance: none` on a checkbox?

**Answer:** Confirm that the custom design still communicates unchecked, checked, focused, and disabled states, and remains usable with assistive technology and high-contrast settings.

**Explanation:** Removing native appearance does not remove the need to preserve the native input's semantics and behavior. It increases the amount of state styling you need to provide.

## Coding questions

### 23. Write CSS that gives text controls a consistent height and padding while preserving a visible focus indicator.

**Answer:**

~~~css
input,
select,
textarea {
  min-height: 2.75rem;
  padding: 0.65rem 0.75rem;
  font: inherit;
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #155e9a;
  outline-offset: 2px;
}
~~~

**Explanation:** A minimum height and padding make controls easier to read and operate. The focus outline remains visible without affecting the control's layout size.

### 24. Write a button hover style that only applies when the button is enabled.

**Answer:**

~~~css
button:hover:enabled {
  background-color: #064574;
}
~~~

**Explanation:** The `:enabled` pseudo-class prevents the hover treatment from implying that a disabled button is ready to activate.

### 25. Write styles for a textarea that starts at a useful size and can grow vertically.

**Answer:**

~~~css
textarea {
  min-height: 8rem;
  resize: vertical;
  font: inherit;
}
~~~

**Explanation:** A minimum height gives room for longer text, and vertical resizing lets the user make more room without forcing a fixed height.

### 26. Group two radio buttons under one meaningful label. Include the relevant HTML.

**Answer:**

~~~html
<fieldset>
  <legend>Choose a delivery method</legend>

  <label>
    <input type="radio" name="delivery" value="email">
    Email
  </label>

  <label>
    <input type="radio" name="delivery" value="mail">
    Postal mail
  </label>
</fieldset>
~~~

**Explanation:** The shared `name` makes the radio buttons one choice group. The fieldset and legend explain the group's purpose, and each radio has a visible label.

## Key takeaways

- CSS controls form appearance while HTML defines control type and behavior.
- Keep visible labels and useful instructions beside fields.
- Preserve visible focus feedback and communicate errors with text as well as styling.
- `accent-color` can coordinate native choice controls with a design.
- Disabled and read-only controls represent different states.
- Custom appearances require the author to preserve clear control states.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [38 - Styling links and link states](../lessons/38-styling-links.md) | [Q&A](39-styling-forms-and-controls.md) | [Example](../examples/39-styling-forms-and-controls.md) | [40 - Replaced elements, aspect ratios, and object fitting](../lessons/40-replaced-elements-and-object-fitting.md) |