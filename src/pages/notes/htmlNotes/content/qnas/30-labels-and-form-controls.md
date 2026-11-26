# 30 - Labels and accessible form controls: Questions and Answers

Use these questions to review [Chapter 30 - Labels and accessible form controls](../lessons/30-labels-and-form-controls.md). Every answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. How does an explicit label connect to a form control?

A. The label's `for` value matches the control's `id`

B. The label's `name` matches the control's `name`

C. The label's `value` matches the control's `value`

D. The label appears before the control in the source

**Answer: A.** The `for` attribute identifies the control by its `id`. The values must match exactly.

### 2. Which example correctly labels this email field?

~~~html
<input id="email" name="email" type="email">
~~~

A. `<label name="email">Email address</label>`

B. `<label for="email">Email address</label>`

C. `<label value="email">Email address</label>`

D. `<label id="email">Email address</label>`

**Answer: B.** The label's `for="email"` matches the input's `id="email"`.

### 3. What is the main purpose of a form control's `name` attribute?

A. It connects the control to a label

B. It gives the control a visible caption

C. It supplies the control's key in submitted form data

D. It makes the control required

**Answer: C.** A label describes the control to users. The `name` is used as the field name when form data is submitted.

### 4. What is wrong with using only a placeholder as the field prompt?

A. A placeholder changes the input type

B. Placeholder text disappears when a value is entered and is not a persistent label

C. A placeholder prevents form submission

D. Placeholder text always appears outside the field

**Answer: B.** A placeholder can be a short hint, but a visible label should identify the field and remain available while the user enters a value.

### 5. Which is a valid implicit label?

A. `<label for="city">City</label><input name="city">`

B. `<label>City <input name="city"></label>`

C. `<label name="city">City</label><input id="city">`

D. `<label>City</label><select name="city"></select>`

**Answer: B.** The control is nested inside its label, so the association is implicit. An explicit label is often easier to maintain in larger forms.

### 6. A radio group has three choices. What should each choice have?

A. Its own label and unique `id`; the choices can share a `name`

B. Its own `name` and the same `id`

C. One label for all three controls

D. A placeholder instead of a label

**Answer: A.** Each label describes one option. A shared `name` lets the browser treat the radio buttons as one choice group, while unique ids allow each label to point to its own control.

### 7. Which element normally gets its accessible name from its own text content?

A. `<input type="text">`

B. `<select>`

C. `<textarea>`

D. `<button>`

**Answer: D.** Text inside a button names its action, such as `<button type="submit">Send message</button>`. The other controls need labels that identify what they are for.

### 8. What does clicking an associated label do for a checkbox?

A. It changes the checkbox's `name`

B. It focuses or activates the checkbox

C. It submits the form automatically

D. It creates another checkbox

**Answer: B.** The label makes its associated control easier to activate, including by clicking or tapping the label text.

### 9. Which value should be unique among elements in the same document?

A. The text of every label

B. The `id` of each control

C. The `name` of every radio option

D. The `value` of each checkbox

**Answer: B.** An `id` identifies one element in the document. Radio choices often intentionally share a `name`.

### 10. Which element is not labelable using a `label` element?

A. `<textarea>`

B. `<select>`

C. `<input type="hidden">`

D. `<input type="checkbox">`

**Answer: C.** Hidden inputs are not labelable controls. Text areas, select menus, and checkboxes can all have labels.

## True or false

### 1. A label's `for` value and the control's `id` need to match exactly.

**Answer: True.** If they differ, the explicit label association does not point to that control.

### 2. Giving an input an `id` automatically gives it a useful label.

**Answer: False.** An id identifies an element in the document. It does not provide visible descriptive text for the user.

### 3. A control can be implicitly labeled by placing it inside a `label` element.

**Answer: True.** In that pattern, the label contains the control it describes.

### 4. Placeholder text is a good replacement for a label because it stays visible after typing.

**Answer: False.** Placeholder text usually disappears when the control has a value. Keep a persistent label.

### 5. Each radio option should have its own label, even when the radio buttons share a `name`.

**Answer: True.** The shared name groups the choices for submission and selection. Each label tells the user what one choice means.

### 6. Button text can describe the button's action without a separate label element.

**Answer: True.** A button's text content names the button, so use meaningful text such as “Save changes”.

### 7. A label should normally contain several unrelated form controls.

**Answer: False.** Give each control its own label. Use a semantic group with `fieldset` and `legend` when several controls belong together; that is covered in Chapter 31.

### 8. A label can contain an unrelated link or button without affecting interaction.

**Answer: False.** Keep unrelated interactive elements outside the label. A label should activate or focus its associated control, not create competing click behavior.

## Short-answer questions

### 1. What does the `label` element do?

**Answer:** It provides readable text that identifies a form control and associates that text with the control. The relationship helps assistive technology present the control's purpose, and it makes the text clickable or tappable to focus or activate the control.

### 2. Show an explicit label association for a phone number field.

**Answer:**

~~~html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel">
~~~

The `for` and `id` values are both `phone`.

### 3. What is the difference between `id` and `name` on a control?

**Answer:** `id` identifies the element in the document and can connect it to a label. `name` identifies the field in submitted form data. They can have the same text, but they do different jobs.

### 4. Why should a placeholder not be the only label for an input?

**Answer:** Placeholder text is temporary and disappears once the control has a value. A visible label remains available and communicates the field's purpose.

### 5. What is an implicit label? Give an example.

**Answer:** An implicit label wraps its control, so nesting creates the association:

~~~html
<label>
  Search articles
  <input name="search" type="search">
</label>
~~~

### 6. Why should radio buttons in one choice group have different ids but the same name?

**Answer:** Different ids let each label target one specific radio button. A shared name tells the browser that the buttons are choices in the same group.

### 7. Does a text input's `name` replace its label? Explain.

**Answer:** No. The name is a form-data key and is not normally displayed as a caption. Use a label to explain the field to the person filling out the form.

### 8. How should a submit button get its name?

**Answer:** Put clear action text inside a `button`, for example `<button type="submit">Send message</button>`. A submit input uses its `value`, for example `<input type="submit" value="Send message">`.

## Practical questions

### 1. Fix the broken label association.

~~~html
<label for="first-name">First name</label>
<input id="name" name="first-name" type="text">
~~~

**Answer:** Make the id match the label's `for` value:

~~~html
<label for="first-name">First name</label>
<input id="first-name" name="first-name" type="text">
~~~

### 2. Add a label to this email field without changing its `name`.

~~~html
<input id="account-email" name="email" type="email">
~~~

**Answer:**

~~~html
<label for="account-email">Email address</label>
<input id="account-email" name="email" type="email">
~~~

### 3. Write a checkbox for opting in to product updates. The label text must also toggle the checkbox.

**Answer:**

~~~html
<input id="product-updates" name="product-updates" type="checkbox" value="yes">
<label for="product-updates">Send me product updates</label>
~~~

The `for` and `id` values match, so clicking the text activates the checkbox.

### 4. Create two labeled radio choices for preferred contact method.

**Answer:**

~~~html
<p>Preferred contact method</p>

<input id="method-email" name="contact-method" type="radio" value="email">
<label for="method-email">Email</label>

<input id="method-phone" name="contact-method" type="radio" value="phone">
<label for="method-phone">Phone</label>
~~~

Each option has its own id and label. Both share the `contact-method` name so only one can be selected in the group.

### 5. Add a connected label to a select menu for choosing a country.

~~~html
<select id="country" name="country">
  <option value="">Choose a country</option>
  <option value="in">India</option>
</select>
~~~

**Answer:** Add a label whose `for` matches the select's id:

~~~html
<label for="country">Country</label>
<select id="country" name="country">
  <option value="">Choose a country</option>
  <option value="in">India</option>
</select>
~~~

### 6. Add a label to this message field.

~~~html
<textarea id="message" name="message" rows="4"></textarea>
~~~

**Answer:**

~~~html
<label for="message">Your message</label>
<textarea id="message" name="message" rows="4"></textarea>
~~~

### 7. Improve this field. It currently uses only placeholder text.

~~~html
<input name="username" type="text" placeholder="Username">
~~~

**Answer:** Add a visible label and an id. The placeholder can remain as a short hint, but it should not be the only prompt:

~~~html
<label for="username">Username</label>
<input id="username" name="username" type="text" placeholder="e.g. ashish99">
~~~

### 8. Find and fix the repeated id.

~~~html
<label for="first">First name</label>
<input id="first" name="first-name" type="text">

<label for="first">Last name</label>
<input id="first" name="last-name" type="text">
~~~

**Answer:** Give the last-name input a unique id and update its label:

~~~html
<label for="first">First name</label>
<input id="first" name="first-name" type="text">

<label for="last">Last name</label>
<input id="last" name="last-name" type="text">
~~~

### 9. Does this button need a `label` element? If not, improve its text.

~~~html
<button type="submit">Click here</button>
~~~

**Answer:** It does not need a separate label. Replace the vague button text with an action that describes what will happen. For a contact form, use:

~~~html
<button type="submit">Send message</button>
~~~

### 10. Review the form. What labeling improvement is needed?

~~~html
<form>
  <label for="email">Email address</label>
  <input id="email" name="email" type="email">

  <input id="updates" name="updates" type="checkbox" value="yes">

  <button type="submit">Subscribe</button>
</form>
~~~

**Answer:** The checkbox has no label. Add one with a matching `for` value:

~~~html
<input id="updates" name="updates" type="checkbox" value="yes">
<label for="updates">Send me email updates</label>
~~~

The email field is already explicitly labeled, and the button has descriptive text.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [29 - Input types and input attributes](29-input-types-and-attributes.md) | [Lesson](../lessons/30-labels-and-form-controls.md) | [Example](../examples/30-labels-and-form-controls.md) | [31 - Fieldset and legend](31-fieldset-and-legend.md) |
