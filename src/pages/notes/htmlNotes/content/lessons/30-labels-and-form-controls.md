# 30 - Labels and accessible form controls

A form control needs a clear name so people know what information to enter or what action a control performs. The HTML `label` element connects readable text to a control such as a text field, checkbox, radio button, drop-down list, or text area. A correctly connected label helps people using a screen reader and gives everyone a larger area to click or tap.

This chapter explains how to label common form controls, how to connect a label to its control, and why placeholder text is not a replacement for a label.

## What you will learn

- What a `label` does and which controls it can label
- How to connect a label with `for` and a matching `id`
- How to write a wrapping label when an explicit connection is not practical
- How to label text fields, checkboxes, radio buttons, select menus, and text areas
- How labels differ from `name`, `value`, and `placeholder`
- Common labeling mistakes and how to fix them

## What is a label?

A label is the readable caption that identifies a form control. For example, the words “Email address” tell a user what to enter in an email field. A placeholder such as “you@example.com” can show a format example, but it does not identify the field as reliably as a label.

The label element gives the text a programmatic relationship to its control. Assistive technology can use that relationship to announce what the control is for. Clicking or tapping a connected label also activates or focuses the control. This is especially useful for small checkboxes and radio buttons.

Common controls that can have a label include `input` elements other than hidden inputs, `select`, and `textarea`. A `button` already gets its name from its text, so it normally does not need a separate `label` element.

## Explicit labels with `for` and `id`

The clearest common pattern is an explicit label. Give the control an `id`, then set the label's `for` attribute to exactly the same value:

~~~html
<label for="full-name">Full name</label>
<input id="full-name" name="full-name" type="text" autocomplete="name">
~~~

Here, `for="full-name"` connects the label to the input whose `id` is `full-name`. The words do not have to match the id. The id identifies the control in the document; the visible label tells the user what the control is for.

The `for` and `id` values must match exactly, including capitalization and punctuation. An id should also be unique in the document. If an id is repeated, a label may connect to the wrong element.

~~~html
<!-- These values match. -->
<label for="email-address">Email address</label>
<input id="email-address" name="email" type="email">

<!-- These values do not match, so the label is not connected. -->
<label for="phone-number">Phone number</label>
<input id="phone" name="phone" type="tel">
~~~

Correct the second example by giving both attributes the same value:

~~~html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel">
~~~

Prefer meaningful, stable ids such as `email-address` or `shipping-city`. Avoid reusing the same id for multiple controls.

## Implicit labels by wrapping the control

A label can also contain the control it describes. This is called an implicit label because the browser can determine the connection from the nesting:

~~~html
<label>
  Email address
  <input name="email" type="email" autocomplete="email">
</label>
~~~

A wrapping label can be convenient for a checkbox or radio button:

~~~html
<label>
  <input name="newsletter" type="checkbox" value="yes">
  Send me occasional updates
</label>
~~~

For most forms, explicit `for` and `id` associations are easier to inspect as the page grows and work well with a wider range of tools. Choose one clear association pattern for each control. Do not put several unrelated controls inside one label.

## Labels for text fields, select menus, and text areas

Use a separate label for every field that asks the user for information. The same pattern works for an email field, a drop-down list, and a multi-line text area:

~~~html
<label for="contact-email">Email address</label>
<input id="contact-email" name="email" type="email" autocomplete="email" required>

<label for="contact-reason">Reason for contacting us</label>
<select id="contact-reason" name="reason">
  <option value="">Choose a reason</option>
  <option value="question">General question</option>
  <option value="support">Technical support</option>
</select>

<label for="message">Message</label>
<textarea id="message" name="message" rows="5"></textarea>
~~~

Each label describes the purpose of its own control. Avoid using a vague label such as “Details” when “Reason for contacting us” tells the user more.

A label can include a concise format hint when the hint is important to understand the field:

~~~html
<label for="birth-date">Date of birth (DD/MM/YYYY)</label>
<input id="birth-date" name="birth-date" type="text" inputmode="numeric">
~~~

For longer instructions, keep the label short and put the additional text close to the field. Do not make the label a long paragraph.

## Labels for checkboxes and radio buttons

For a checkbox, the label usually describes the choice or action that checking it represents:

~~~html
<input id="terms" name="terms" type="checkbox" value="accepted" required>
<label for="terms">I agree to the terms</label>
~~~

The checkbox remains a separate control, and the label text is clickable. Make the label specific enough that its purpose is clear.

Each radio button needs its own label. The radio buttons in a set usually share a `name` so the browser treats them as choices in one group, while their `id` values must be different:

~~~html
<p>Preferred contact method</p>

<input id="contact-email-option" name="contact-method" type="radio" value="email">
<label for="contact-email-option">Email</label>

<input id="contact-phone-option" name="contact-method" type="radio" value="phone">
<label for="contact-phone-option">Phone</label>
~~~

The paragraph introduces the topic, and each label names one choice. A group title is not a substitute for the individual labels. The next chapter explains `fieldset` and `legend`, which provide a semantic grouping for related controls.

## Labels and buttons

A `button` gets its name from the text inside it:

~~~html
<button type="submit">Send message</button>
~~~

An input button gets its visible label from its `value`:

~~~html
<input type="submit" value="Send message">
~~~

Use action text that describes what will happen, such as “Save changes” or “Send message”. A label is not a replacement for button text.

## A complete labeled form

This small example brings together several patterns from this chapter:

~~~html
<form action="/contact" method="post">
  <p>Fields marked required must be completed.</p>

  <p>
    <label for="visitor-name">Your name</label>
    <input id="visitor-name" name="name" type="text" autocomplete="name" required>
  </p>

  <p>
    <label for="visitor-email">Email address</label>
    <input id="visitor-email" name="email" type="email" autocomplete="email" required>
  </p>

  <p>
    <label for="visitor-message">Message</label>
    <textarea id="visitor-message" name="message" rows="5" required></textarea>
  </p>

  <p>
    <input id="copy-request" name="send-copy" type="checkbox" value="yes">
    <label for="copy-request">Send me a copy</label>
  </p>

  <button type="submit">Send message</button>
</form>
~~~

Every field has a descriptive label, each explicit label points to a matching id, and each control that will be submitted has a `name`. The button text describes its action.

## `label`, `id`, `name`, and `placeholder`

These attributes have different jobs:

- `label` provides the readable caption for a control.
- `id` identifies one element in the page and can be the target of a label's `for` attribute.
- `name` gives a submitted control its key in form data.
- `placeholder` can show a short example or hint inside an empty text field.

A placeholder disappears when the user enters a value and may be difficult to read. Do not use it as the field's only label:

~~~html
<!-- Avoid: the field has no persistent label. -->
<input name="email" type="email" placeholder="Email address">

<!-- Better: the label stays visible; the placeholder is only an example. -->
<label for="email">Email address</label>
<input id="email" name="email" type="email" placeholder="you@example.com">
~~~

Keep placeholder hints brief. Do not repeat a long instruction in the placeholder or rely on its lighter text to communicate the purpose of the field.

## Common mistakes

### The `for` and `id` values differ

~~~html
<label for="user-email">Email address</label>
<input id="email" name="email" type="email">
~~~

Fix the id or the `for` value so they match exactly.

### The control has an id but no label

An id alone does not tell the user what to enter. Add a connected label with meaningful text.

### A placeholder is the only prompt

A placeholder is temporary hint text, not a persistent label. Keep a visible label and use a placeholder only for a short example if it helps.

### One label describes multiple fields

A label should identify one control. Give each field its own label. For related choices, label every option and use the next chapter's `fieldset` and `legend` pattern to identify the group.

### A link or button is placed inside a label

Labels should not contain unrelated interactive elements. Put links and buttons beside the label instead. This avoids competing click actions and makes the structure easier to understand.

### A button is given an empty or unclear name

Button text should tell the user what action it performs. Use descriptive text rather than an empty button or a generic “Click here” label.

## Try it yourself

1. Create a form with a name field and an email field. Give each a visible label and a matching `for` and `id`.
2. Add a `select` element for a contact reason and connect its label.
3. Add a checkbox with a clickable label.
4. Add two radio choices. Give each a unique id, a clear label, and the same `name`.
5. Add a short placeholder example to one field while keeping its label visible.
6. Intentionally change one id so it no longer matches its label's `for`. Fix the association.
7. Click each label in a browser and confirm that its text field, checkbox, or radio choice receives focus or is activated.

## Key points

- A label gives a form control a clear, programmatic name.
- Use a matching `label for` and control `id` for an explicit association.
- A label can also wrap the single control it describes.
- Give each text field, checkbox, radio choice, select menu, and text area its own descriptive label.
- Use unique ids. A control's `name` is for submitted form data, not a substitute for its label.
- Placeholder text can provide a short hint, but it should not replace a persistent label.
- Button text names a button; a separate label is generally unnecessary.
- Use `fieldset` and `legend` to identify a related group of controls, as explained in the next chapter.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [29 - Input types and input attributes](29-input-types-and-attributes.md) | [Q&A](../qnas/30-labels-and-form-controls.md) | [Example](../examples/30-labels-and-form-controls.md) | [31 - Fieldset and legend](31-fieldset-and-legend.md) |
