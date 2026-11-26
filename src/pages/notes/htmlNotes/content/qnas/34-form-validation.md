# 34 - Built-in form validation: Questions and Answers

Use these questions to review [Chapter 34 - Built-in form validation](../lessons/34-form-validation.md). Every answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does the `required` attribute do?

A. Requires an appropriate value before the form can be submitted

B. Gives the control a visible label

C. Sends the form with POST

D. Validates the value on the server

**Answer: A.** The browser checks that a required control has a value that satisfies its constraints before normal form submission.

### 2. What does `type="email"` check?

A. Whether the email account exists

B. Whether the entered value has a browser-recognized email format

C. Whether the person owns the email address

D. Whether the server received the email

**Answer: B.** It checks a basic format, not existence, reachability, or ownership of an email address.

### 3. Does `type="tel"` enforce one universal phone number format?

A. Yes, it requires exactly ten digits

B. Yes, it requires a country code

C. No, it does not enforce a fixed format by itself

D. No, it disables validation for every form field

**Answer: C.** Phone number formats vary. A telephone input does not validate one universal format on its own.

### 4. Which attributes can set an acceptable numeric range?

A. `min` and `max`

B. `name` and `id`

C. `rows` and `cols`

D. `label` and `value`

**Answer: A.** For supported types such as number and date, `min` and `max` set lower and upper bounds.

### 5. What does `step="0.5"` do on a number input with `min="1"`?

A. Allows values in half-unit increments starting at 1

B. Requires exactly 0.5

C. Limits the value to 0.5 characters

D. Makes the field optional

**Answer: A.** Values such as 1, 1.5, 2, and 2.5 follow the step starting from the minimum.

### 6. What must a non-empty value do to pass a `pattern` constraint?

A. Contain the pattern somewhere inside it

B. Match the whole pattern

C. Match the field's name

D. Be at least one character long

**Answer: B.** HTML pattern validation checks the complete non-empty value against the pattern.

### 7. What does `maxlength="20"` limit?

A. The value to at most 20 characters

B. The form to 20 fields

C. The label to 20 words

D. The browser message to 20 characters

**Answer: A.** It sets the maximum length for supported text-entry controls.

### 8. What does `novalidate` on a form do?

A. Skips the browser's interactive constraint validation when the form is submitted

B. Makes every field required

C. Validates all fields on the server

D. Prevents all form submission

**Answer: A.** The form's `novalidate` attribute bypasses built-in interactive validation for form submission.

### 9. What does `formnovalidate` on a submit button do?

A. Skips the form's normal interactive validation for that button's submission

B. Disables the form permanently

C. Resets every field

D. Changes all controls to `type="text"`

**Answer: A.** It provides a per-submit-button override. Use it only when that alternate action should accept incomplete values.

### 10. Why must the server validate submitted values?

A. Browser validation can be bypassed

B. The server cannot receive values with `name`

C. Browsers never perform validation

D. A label blocks server-side checks

**Answer: A.** Client-side checks improve feedback, but requests can be sent without following the page's constraints. The server must check values independently.

## True or false

### 1. A required checkbox must be checked for the control to pass its required constraint.

**Answer: True.** An unchecked required checkbox is missing its required value.

### 2. An email input proves that the entered email address exists.

**Answer: False.** It checks a basic format only. It cannot verify that an address exists or belongs to the user.

### 3. `type="tel"` is enough to validate a specific phone number format.

**Answer: False.** It does not enforce one fixed format. Add clear instructions and an appropriate constraint when a particular format is needed.

### 4. The `pattern` attribute checks the whole non-empty value.

**Answer: True.** The value must match the pattern as a whole, not merely contain a matching substring.

### 5. `novalidate` removes the need for server-side validation.

**Answer: False.** It turns off the browser's interactive constraint validation. The server still needs to validate received data.

### 6. A `min` and `max` constraint can be used with supported number and date controls.

**Answer: True.** For example, a number can be restricted to a range and a date to a permitted period.

### 7. Required fields should be communicated only with a red border.

**Answer: False.** Do not rely on color alone. Provide a text indication or instructions so the requirement is clear to more users.

### 8. A form submission with an invalid required control is normally blocked by browser validation unless validation is bypassed.

**Answer: True.** The browser usually focuses or reports an invalid control and prevents normal submission until the constraint is satisfied.

## Short-answer questions

### 1. What is built-in form validation?

**Answer:** It is the browser's checking of constraints described by HTML controls and attributes, such as required values, input types, ranges, lengths, and patterns. It can provide feedback and stop a form from being submitted when a constraint fails.

### 2. What is the difference between `required` and `pattern`?

**Answer:** `required` makes an appropriate value mandatory. `pattern` checks whether a non-empty value matches a specified format. A pattern alone generally allows the field to be empty unless the control is also required.

### 3. What do `min`, `max`, and `step` control?

**Answer:** For supported inputs, `min` and `max` set the allowed range. `step` sets the increments that are valid within that range.

### 4. Why is `type="email"` not a complete email verification system?

**Answer:** It checks only a browser-recognized syntax. It does not contact the mail server, prove delivery, or verify that the person submitting controls the mailbox.

### 5. What is the difference between `novalidate` and `formnovalidate`?

**Answer:** `novalidate` on the form skips interactive browser validation for its submissions. `formnovalidate` on a submit button skips that validation when that particular button is used.

### 6. Why should instructions accompany a pattern constraint?

**Answer:** The browser can report that a value does not match, but users need to know the required format. Put a clear example or rule in visible text near the field.

### 7. Why is browser validation not enough on its own?

**Answer:** Users or software can send requests without using the page or can alter its HTML. The receiving server must independently check values before trusting or using them.

### 8. What should a form communicate when a field is required?

**Answer:** It should make the requirement clear in text near the field, such as “Email address, required” or a note explaining which fields must be completed. Do not communicate it with color alone.

## Practical questions

### 1. Make this name field required.

~~~html
<label for="name">Name</label>
<input id="name" name="name">
~~~

**Answer:** Add the Boolean `required` attribute:

~~~html
<label for="name">Name, required</label>
<input id="name" name="name" required>
~~~

### 2. Require a number from 1 through 10.

**Answer:**

~~~html
<label for="quantity">Quantity, from 1 to 10</label>
<input id="quantity" name="quantity" type="number" min="1" max="10" required>
~~~

### 3. Allow values from 1 to 10 in half-unit increments.

**Answer:** Add `step="0.5"`:

~~~html
<label for="amount">Amount, in half-unit steps</label>
<input id="amount" name="amount" type="number" min="1" max="10" step="0.5">
~~~

Values such as 1, 1.5, and 2 follow the range and step.

### 4. Restrict a username to between 4 and 20 characters.

**Answer:**

~~~html
<label for="username">Username, 4 to 20 characters</label>
<input id="username" name="username" minlength="4" maxlength="20" required>
~~~

### 5. Require an access code made of exactly four digits and explain the rule.

**Answer:**

~~~html
<label for="access-code">Access code, four digits such as 1234</label>
<input id="access-code" name="access-code" pattern="[0-9]{4}" required>
~~~

The pattern matches the complete value, so any extra character makes it invalid.

### 6. Fix the expectation in this phone field.

~~~html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel" required>
~~~

The form owner expects exactly ten digits. What should be added?

**Answer:** Explain the format and add a matching constraint, if that exact rule is suitable for the users and phone numbers being accepted:

~~~html
<label for="phone">Phone number, 10 digits</label>
<input id="phone" name="phone" type="tel" pattern="[0-9]{10}" title="Enter 10 digits" required>
~~~

`type="tel"` alone does not enforce the ten-digit rule. The pattern does. Provide the visible format instruction and do not rely only on the title.

### 7. Add `novalidate` to a form that should skip browser validation when submitted.

~~~html
<form action="/draft" method="post">
  <!-- form controls -->
</form>
~~~

**Answer:**

~~~html
<form action="/draft" method="post" novalidate>
  <!-- form controls -->
</form>
~~~

This skips interactive browser validation on submission. The server must still validate received values.

### 8. Add a draft submit button that skips validation, while keeping the publish button's normal validation.

~~~html
<form action="/article" method="post">
  <label for="title">Title</label>
  <input id="title" name="title" required>
</form>
~~~

**Answer:** Add both buttons, with `formnovalidate` only on the draft action:

~~~html
<form action="/article" method="post">
  <label for="title">Title</label>
  <input id="title" name="title" required>

  <button type="submit">Publish</button>
  <button type="submit" formnovalidate formaction="/article/draft">Save draft</button>
</form>
~~~

### 9. This field should accept only dates from 2026. Add the range limits.

~~~html
<label for="start-date">Start date</label>
<input id="start-date" name="start-date" type="date">
~~~

**Answer:**

~~~html
<label for="start-date">Start date in 2026</label>
<input id="start-date" name="start-date" type="date" min="2026-01-01" max="2026-12-31">
~~~

The date values use the format expected by `type="date"`.

### 10. Should a server accept a value just because the browser allowed the form to submit?

**Answer:** No. Browser checks can be bypassed, so the server must validate all submitted values independently before using them.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [33 - Buttons and form actions](33-buttons-and-form-actions.md) | [Lesson](../lessons/34-form-validation.md) | [Example](../examples/34-form-validation.md) | [35 - Form submission: name, method, action, and enctype](35-form-submission.md) |
