# 32 - Textarea, select, option, and datalist

HTML provides several controls for collecting text and choosing values. Use `textarea` when people may need to write multiple lines, `select` when they must choose from a set of options, and `datalist` when suggestions can help while still allowing a different entry.

This chapter explains the structure and behavior of these controls, how their values are submitted, and how to label them clearly.

## What you will learn

- How to collect multi-line text with `textarea`
- How `select` and `option` create a choice control
- How to group choices with `optgroup`
- How a `datalist` provides optional suggestions for an input
- How `name`, `value`, `selected`, `multiple`, and `required` affect forms
- How to choose the right control for the task

## Multi-line text with `textarea`

Use `textarea` when a user may need to enter a message, comment, description, or other multi-line text. A `textarea` has an opening and closing tag. Its initial text value goes between those tags:

~~~html
<label for="message">Message</label>
<textarea id="message" name="message" rows="5" cols="40"></textarea>
~~~

The label identifies the field, and the `name` identifies the value in submitted form data. `rows` sets the number of visible lines, and `cols` sets an approximate character width. These attributes affect the control's initial visible size; CSS can style its presentation later.

Unlike an `input`, a `textarea` does not use a `value` attribute for its initial content. Put initial text between the tags:

~~~html
<label for="note">Note</label>
<textarea id="note" name="note">Please include your order number.</textarea>
~~~

The text inside the element is the initial value. If no initial value is needed, leave the element empty, as in the earlier example.

A `textarea` can also use attributes such as `placeholder`, `required`, `minlength`, and `maxlength`:

~~~html
<label for="feedback">Feedback</label>
<textarea id="feedback" name="feedback" rows="6" maxlength="1000" required></textarea>
~~~

Keep a real label even when using a placeholder. A placeholder is only a short hint and disappears as the user types.

## A choice control with `select`

Use `select` when people should choose from a known set of options. Each choice goes inside an `option` element:

~~~html
<label for="language">Preferred language</label>
<select id="language" name="language">
  <option value="">Choose a language</option>
  <option value="en">English</option>
  <option value="hi">Hindi</option>
  <option value="es">Spanish</option>
</select>
~~~

The label names the control. Each option represents one available choice. The `value` attribute is the value submitted when that option is selected. For example, choosing English submits `language=en`.

If an option has no `value` attribute, its text content is used as its value. Using explicit values is often useful when the displayed text and the value expected by a server should be different:

~~~html
<option value="in">India</option>
~~~

The user sees “India”, while the submitted value is `in`.

### Choose a default option

The `selected` attribute marks an option as selected when the page first loads:

~~~html
<label for="plan">Plan</label>
<select id="plan" name="plan">
  <option value="basic" selected>Basic</option>
  <option value="plus">Plus</option>
</select>
~~~

For a required single-choice select, a common pattern is an initial empty option that prompts the user to choose:

~~~html
<label for="topic">Topic</label>
<select id="topic" name="topic" required>
  <option value="" selected>Choose a topic</option>
  <option value="billing">Billing</option>
  <option value="technical">Technical support</option>
</select>
~~~

The empty initial choice means the user must choose a real topic before the required control can pass built-in validation.

### Group options with `optgroup`

Use `optgroup` to organize a long list into named groups. Its `label` attribute supplies the group name:

~~~html
<label for="destination">Destination</label>
<select id="destination" name="destination">
  <option value="">Choose a destination</option>
  <optgroup label="Asia">
    <option value="in">India</option>
    <option value="jp">Japan</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="fr">France</option>
    <option value="it">Italy</option>
  </optgroup>
</select>
~~~

An option belongs directly to a select or to an optgroup inside a select. An optgroup organizes the choices; users select an option, not the group label.

## Allow more than one selection

By default, a select allows one option at a time. Add the Boolean `multiple` attribute when people may choose several options:

~~~html
<label for="interests">Topics you follow</label>
<select id="interests" name="interests" multiple size="4">
  <option value="html">HTML</option>
  <option value="accessibility">Accessibility</option>
  <option value="design">Design</option>
  <option value="performance">Performance</option>
</select>
<p>You can select more than one topic.</p>
~~~

The `size` attribute asks the browser to show several options at once. A multiple select can work differently across browsers and operating systems, so explain that more than one choice is allowed. The selected values are submitted using the control's name.

Use a regular select for one choice, and consider checkboxes when you want multiple choices to be visibly listed as independent controls. Choose the interface that best communicates the available interaction.

## Suggested values with `datalist`

A `datalist` provides suggested values for a supported input. Connect the input's `list` attribute to the datalist's `id`:

~~~html
<label for="browser">Browser</label>
<input id="browser" name="browser" list="browser-suggestions">

<datalist id="browser-suggestions">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
  <option value="Edge"></option>
</datalist>
~~~

The id and list value must match. The suggestions can help a user complete the input, but a datalist does not make the values a fixed set. A user can usually type a value that is not listed.

A datalist is not a replacement for a select:

- Use `select` when the user must choose from a fixed set of options.
- Use `datalist` when suggestions are useful but other entries should remain possible.

Keep the input's label. The suggestions are not a label for the control. Datalist popup presentation and accessibility support can vary, so test the behavior in the browsers and assistive technologies important to your audience. If users must select one of a fixed set, use a select instead.

## Comparing the controls

| Control | Use it for | Can the user enter a different value? |
| --- | --- | --- |
| `textarea` | Multi-line free-form text | Yes, the user writes text |
| `select` | Choosing from a fixed set | No, the user selects an option |
| `datalist` with `input` | Suggestions for an editable value | Yes, suggestions are optional |

The right control depends on the task. A comment box, a country menu, and an optional product-code suggestion are different interactions and should use controls that communicate those differences.

## A form combining these controls

This example uses each kind of control for a different purpose:

~~~html
<form action="/feedback" method="post">
  <p>
    <label for="feedback-topic">Topic</label>
    <select id="feedback-topic" name="topic" required>
      <option value="" selected>Choose a topic</option>
      <option value="site">Website</option>
      <option value="product">Product</option>
    </select>
  </p>

  <p>
    <label for="feedback-message">Your message</label>
    <textarea id="feedback-message" name="message" rows="6" required></textarea>
  </p>

  <p>
    <label for="reference">Optional reference code</label>
    <input id="reference" name="reference" list="reference-suggestions">
    <datalist id="reference-suggestions">
      <option value="ORDER-1001"></option>
      <option value="ORDER-1002"></option>
    </datalist>
  </p>

  <button type="submit">Send feedback</button>
</form>
~~~

The select limits the topic to listed choices. The text area accepts a message. The reference input offers suggestions while remaining editable. Each control has its own label and `name`.

## Common mistakes

### Using `value` to set a textarea's initial text

~~~html
<textarea name="message" value="Hello"></textarea>
~~~

The initial text for a textarea belongs between its tags:

~~~html
<textarea name="message">Hello</textarea>
~~~

### Forgetting a label

A select, textarea, and input connected to a datalist still need descriptive labels. Use the label and id association from the previous chapter.

### Using a datalist when only listed choices are valid

A datalist offers suggestions but generally permits other typed values. Use a select when the user must choose a listed option.

### Assuming the option's visible text is always the submitted value

If an option has an explicit `value`, that value is submitted. Make sure it is the value your form expects. If no value is given, the option text is used.

### Forgetting `name`

A control without a `name` is not included as a named field in standard form submission. Add a meaningful name when the user's value should be submitted.

### Making a required select start on a real answer by accident

If a required single-select should force a deliberate choice, start with an empty option such as `<option value="">Choose a topic</option>`. Do not mark a real answer as selected if the user must make the choice.

### Assuming a multiple select is obvious

A `multiple` select may not look like a standard drop-down. Explain that more than one choice is allowed, and consider whether checkboxes would make the choices clearer.

## Try it yourself

1. Create a labeled `textarea` for a message with five visible rows.
2. Create a labeled select for a support topic with an initial empty choice and three real choices.
3. Group select options into two categories using `optgroup`.
4. Add a `required` attribute to the support topic and verify that the empty choice does not count as a completed answer.
5. Create a multiple select and add visible instructions explaining that several choices can be selected.
6. Create an input connected to a datalist. Try typing a value that is not among the suggestions.
7. Compare the datalist with a select and write down which one fits a fixed list and which one fits optional suggestions.
8. Inspect the form and confirm that each control has a label and a `name` where its value should be submitted.

## Key points

- `textarea` collects multi-line text. Its initial value goes between its opening and closing tags.
- `select` with `option` elements lets a user choose from listed values.
- An option's explicit `value` is submitted; otherwise, its text is used as the value.
- `selected` sets an initial selection. An empty first option is useful when a required select needs a deliberate choice.
- `optgroup` gives related options a named grouping.
- `multiple` allows a select to hold more than one selected option.
- `datalist` supplies suggestions to an editable input and does not enforce a fixed set.
- Labels identify the controls; `name` gives submitted values their form-data key.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [31 - Fieldset and legend](31-fieldset-and-legend.md) | [Q&A](../qnas/32-textarea-select-and-datalist.md) | [Example](../examples/32-textarea-select-and-datalist.md) | [33 - Buttons and form actions](33-buttons-and-form-actions.md) |
