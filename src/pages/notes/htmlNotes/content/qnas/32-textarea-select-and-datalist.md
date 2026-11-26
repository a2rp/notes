# 32 - Textarea, select, option, and datalist: Questions and Answers

Use these questions to review [Chapter 32 - Textarea, select, option, and datalist](../lessons/32-textarea-select-and-datalist.md). Every answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. Which element is intended for multi-line text entry?

A. `textarea`

B. `select`

C. `option`

D. `datalist`

**Answer: A.** A `textarea` lets the user enter multi-line plain text, such as a comment or message.

### 2. Where does a `textarea` get its initial text value in HTML?

A. From a `value` attribute

B. From the text between its opening and closing tags

C. From its `name` attribute

D. From a child `option` element

**Answer: B.** The initial value is the `textarea` element's text content. It does not use an HTML `value` attribute.

### 3. What does the `value` attribute on an `option` specify?

A. The value submitted for that choice

B. The label of its parent `select`

C. How many options are visible

D. The number of lines in a textarea

**Answer: A.** If an option has a `value`, that value is sent when the option is selected and the form is submitted.

### 4. What happens if an option has no `value` attribute?

A. It cannot be selected

B. Its text content is used as its value

C. The select has no submitted value

D. It becomes a datalist suggestion

**Answer: B.** An option's text is used as its value when no explicit `value` is provided.

### 5. What is `optgroup` used for?

A. Naming a group of related options inside a select

B. Collecting multi-line text

C. Adding suggestions to a text input

D. Making a field required

**Answer: A.** An `optgroup` organizes options under a group label. The user selects an option within it.

### 6. What does the `multiple` attribute do on a select?

A. Allows more than one option to be selected

B. Creates several select elements

C. Requires the user to enter text

D. Displays a datalist popup

**Answer: A.** A multiple select allows more than one selected option. Explain this behavior to users because its interface may differ from a regular drop-down.

### 7. How is a datalist connected to an input?

A. The input's `list` value matches the datalist's `id`

B. The input's `name` matches the datalist's `name`

C. The datalist's `for` value matches the input's `id`

D. The input is nested inside the datalist

**Answer: A.** For example, `list="cities"` on an input connects to `<datalist id="cities">`.

### 8. Does a datalist enforce that the user chooses one of its suggestions?

A. Yes, only listed values can be submitted

B. Yes, unless the input has a label

C. No, it provides suggestions for an editable input

D. No, because a datalist is a submit button

**Answer: C.** A datalist offers suggested values. It generally still lets the user enter a different value.

### 9. Which control is best when the user must choose from a fixed list?

A. `textarea`

B. `datalist` with an input

C. `select`

D. `optgroup` by itself

**Answer: C.** A select presents a fixed set of options. A datalist is for optional suggestions on an editable input.

### 10. What do the `rows` and `cols` attributes on a textarea describe?

A. Its approximate visible line count and character width

B. The minimum and maximum number of submitted values

C. The first and last options

D. Its label and name

**Answer: A.** `rows` and `cols` set the textarea's initial visible size.

## True or false

### 1. A textarea's initial text belongs between its opening and closing tags.

**Answer: True.** For example, `<textarea name="message">Hello</textarea>` starts with “Hello”.

### 2. A select's label can be omitted if every option has clear text.

**Answer: False.** The select itself needs a label that identifies what the user is choosing. Option text names the individual choices.

### 3. If an option has a `value` attribute, that value is submitted instead of its visible text.

**Answer: True.** This lets the displayed text and the submitted value differ, such as `value="in"` for the visible choice “India”.

### 4. An `optgroup` is itself one of the selectable options.

**Answer: False.** The optgroup labels a group of options. Users select one or more option elements inside it.

### 5. A datalist is a fixed-choice control like a select.

**Answer: False.** A datalist supplies suggestions for an input, which generally remains editable.

### 6. `selected` can mark which option is initially selected.

**Answer: True.** Add the Boolean `selected` attribute to the option that should start selected.

### 7. A textarea's `placeholder` is a replacement for its label.

**Answer: False.** A placeholder is only a temporary hint. Keep a visible label connected to the textarea.

### 8. A select with `multiple` can submit several selected values under the control's name.

**Answer: True.** Each selected option contributes a value for that named control.

## Short-answer questions

### 1. When should you use a textarea?

**Answer:** Use a textarea when a user may need to enter multi-line free-form text, such as a comment, message, or description.

### 2. Explain the difference between a select and a datalist.

**Answer:** A select is for choosing from a fixed set of options. A datalist provides suggestions to an editable input, and the user can generally type a value that is not listed.

### 3. What is the purpose of an option's `value` attribute?

**Answer:** It sets the value submitted for that choice. Without an explicit value, the option's text is used.

### 4. What do `rows` and `cols` do on a textarea?

**Answer:** They describe the textarea's initial visible size: `rows` is the number of visible lines and `cols` is an approximate character width.

### 5. How does `optgroup` help organize a select?

**Answer:** It groups related options under a caption provided by its `label` attribute. The user still selects an option, not the optgroup.

### 6. How do you connect a datalist to an input?

**Answer:** Give the datalist an `id` and set the input's `list` attribute to that same value:

~~~html
<label for="city">City</label>
<input id="city" name="city" list="city-suggestions">

<datalist id="city-suggestions">
  <option value="Delhi"></option>
  <option value="Mumbai"></option>
</datalist>
~~~

### 7. Why should a required single select often begin with an empty option?

**Answer:** The empty option prompts the user to make a deliberate choice. When it is the first option and has an empty value, it does not satisfy a required select until the user chooses a real value.

### 8. Do these controls still need labels if their options or placeholders look clear?

**Answer:** Yes. A select, textarea, and input connected to a datalist each need a descriptive label. Options name possible choices, while a placeholder is a temporary hint.

## Practical questions

### 1. Correct this textarea so it starts with the text “Add a short description”.

~~~html
<textarea name="description" value="Add a short description"></textarea>
~~~

**Answer:** Put the initial text inside the element:

~~~html
<textarea name="description">Add a short description</textarea>
~~~

### 2. Add a label and name to this select. Include two choices with explicit values.

~~~html
<select>
  <option>English</option>
  <option>Hindi</option>
</select>
~~~

**Answer:**

~~~html
<label for="language">Preferred language</label>
<select id="language" name="language">
  <option value="en">English</option>
  <option value="hi">Hindi</option>
</select>
~~~

### 3. Make the support topic required and prompt the user to choose one.

~~~html
<label for="topic">Topic</label>
<select id="topic" name="topic">
  <option value="billing">Billing</option>
  <option value="technical">Technical support</option>
</select>
~~~

**Answer:** Add `required` and make an empty option the initial choice:

~~~html
<label for="topic">Topic</label>
<select id="topic" name="topic" required>
  <option value="" selected>Choose a topic</option>
  <option value="billing">Billing</option>
  <option value="technical">Technical support</option>
</select>
~~~

### 4. Group the options into two labeled categories.

~~~html
<select id="food" name="food">
  <option value="apple">Apple</option>
  <option value="carrot">Carrot</option>
</select>
~~~

**Answer:** Put each option inside an `optgroup` with a descriptive `label`:

~~~html
<select id="food" name="food">
  <optgroup label="Fruit">
    <option value="apple">Apple</option>
  </optgroup>
  <optgroup label="Vegetables">
    <option value="carrot">Carrot</option>
  </optgroup>
</select>
~~~

### 5. Allow the user to choose multiple topics in this select.

~~~html
<label for="topics">Topics</label>
<select id="topics" name="topics">
  <option value="html">HTML</option>
  <option value="forms">Forms</option>
  <option value="accessibility">Accessibility</option>
</select>
~~~

**Answer:** Add `multiple` and a visible size, and explain that several choices are allowed:

~~~html
<label for="topics">Topics you follow</label>
<select id="topics" name="topics" multiple size="3">
  <option value="html">HTML</option>
  <option value="forms">Forms</option>
  <option value="accessibility">Accessibility</option>
</select>
<p>You can select more than one topic.</p>
~~~

### 6. Connect this input to a datalist with two suggested cities.

~~~html
<label for="city">City</label>
<input id="city" name="city">
~~~

**Answer:** Add the same identifier to the input's `list` and the datalist's `id`:

~~~html
<label for="city">City</label>
<input id="city" name="city" list="city-suggestions">

<datalist id="city-suggestions">
  <option value="Delhi"></option>
  <option value="Mumbai"></option>
</datalist>
~~~

### 7. Should this field use a select or a datalist if users may enter any city, including cities not listed?

~~~html
<label for="city">City</label>
<input id="city" name="city">
~~~

**Answer:** Use a datalist if suggested cities would help, because the input remains editable. A select is better if users must choose from only the listed values.

### 8. Fix the label and datalist connection in this example.

~~~html
<label for="browser">Browser</label>
<input id="browser" name="browser" list="browsers">
<datalist id="browser-options">
  <option value="Firefox"></option>
</datalist>
~~~

**Answer:** The input's `list` value must match the datalist's `id`. Change one so they are the same:

~~~html
<label for="browser">Browser</label>
<input id="browser" name="browser" list="browser-options">
<datalist id="browser-options">
  <option value="Firefox"></option>
</datalist>
~~~

### 9. Add a label and required attribute to this textarea. Give it five visible rows.

~~~html
<textarea id="comments" name="comments"></textarea>
~~~

**Answer:**

~~~html
<label for="comments">Comments</label>
<textarea id="comments" name="comments" rows="5" required></textarea>
~~~

### 10. A user must choose one support category, and the listed values are fixed. Which control should be used and why?

**Answer:** Use a `select`, because it presents a fixed set of choices. A datalist is intended for suggestions while allowing other typed values.

~~~html
<label for="category">Support category</label>
<select id="category" name="category" required>
  <option value="" selected>Choose a category</option>
  <option value="account">Account</option>
  <option value="payment">Payment</option>
  <option value="technical">Technical issue</option>
</select>
~~~

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [31 - Fieldset and legend](31-fieldset-and-legend.md) | [Lesson](../lessons/32-textarea-select-and-datalist.md) | [Example](../examples/32-textarea-select-and-datalist.md) | [33 - Buttons and form actions](33-buttons-and-form-actions.md) |
