# 34 - Built-in form validation

HTML can check many common form requirements in the browser before a form is submitted. Attributes such as `required`, `type`, `min`, `max`, `step`, `minlength`, `maxlength`, and `pattern` describe constraints directly in the markup.

Built-in validation gives users quick feedback and works without JavaScript. It helps catch common input mistakes, but it does not replace validation on the server that receives the form.

## What you will learn

- How browsers validate forms when users submit them
- How to require a value with `required`
- How input types check common value formats
- How to set length, range, and pattern constraints
- How to explain requirements clearly to users
- How `novalidate` and `formnovalidate` affect browser validation
- Why a server must validate submitted data too

## How built-in validation works

When a user submits a form, the browser checks the constraints described by its form controls. If a control fails a constraint, the browser can stop the submission, focus the problematic control, and show a built-in message. The wording and appearance of that message vary by browser and operating system.

Here is a small form with two native constraints:

~~~html
<form action="/signup" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" required>

  <label for="email">Email address</label>
  <input id="email" name="email" type="email" required>

  <button type="submit">Create account</button>
</form>
~~~

The browser checks that the name is not empty and that the email value has a format accepted for an email input. It does not confirm that the email account exists or that the user owns it.

## Require a value with `required`

`required` is a Boolean attribute. If it is present, the user must provide a value that satisfies that control's constraints before the form can be submitted:

~~~html
<label for="full-name">Full name</label>
<input id="full-name" name="full-name" required>
~~~

To make a checkbox required, the user must check that checkbox:

~~~html
<input id="terms" name="terms" type="checkbox" required>
<label for="terms">I agree to the terms</label>
~~~

For radio buttons sharing one `name`, a required choice means that one radio button in the group must be checked. For a required select, use a valid initial empty option so the user has to choose an actual value, as covered in the previous chapter.

Tell users which fields are required. The browser can convey the required state, but a visible note or marker makes the expectation easier to notice. Do not use color alone to identify required fields.

## Use an input type that matches the value

Some input types check that a non-empty value has a format they recognize:

~~~html
<label for="email-address">Email address</label>
<input id="email-address" name="email" type="email" required>

<label for="website">Website</label>
<input id="website" name="website" type="url">
~~~

An email input checks for a browser-recognized email format. A URL input checks for a URL format. These checks catch some mistakes, but they cannot confirm that an address or website is real or reachable.

Choose a type that fits the data. `type="tel"` provides a telephone-oriented input, but it does not enforce a specific phone number format by itself. Use clear instructions and an appropriate constraint if a particular format is required.

## Set minimum and maximum values

For numeric and date-like controls, `min` and `max` can constrain the accepted range:

~~~html
<label for="quantity">Quantity, from 1 to 10</label>
<input id="quantity" name="quantity" type="number" min="1" max="10" required>

<label for="start-date">Start date</label>
<input id="start-date" name="start-date" type="date" min="2026-01-01" max="2026-12-31">
~~~

A quantity below 1 or above 10 fails the number range. Dates outside the given range fail the date range. Use values written in the format expected by the input type.

The `step` attribute controls allowed increments. For example, `min="1"` and `step="0.5"` allow 1, 1.5, 2, and other half-unit increments:

~~~html
<label for="amount">Amount, in half-unit steps</label>
<input id="amount" name="amount" type="number" min="1" max="10" step="0.5">
~~~

If a value does not fit the allowed increment, the browser can report a step mismatch.

## Set minimum and maximum text lengths

Use `minlength` and `maxlength` on supported text-entry controls, including textareas, to constrain the entered length:

~~~html
<label for="username">Username, 4 to 20 characters</label>
<input id="username" name="username" minlength="4" maxlength="20" required>

<label for="bio">Short bio, up to 300 characters</label>
<textarea id="bio" name="bio" rows="4" maxlength="300"></textarea>
~~~

The browser can prevent submission when a user-provided value is too short or too long. Include the length limit in visible instructions so the user knows what is expected before receiving an error.

## Use `pattern` for a specific text format

`pattern` lets you require a value to match a regular expression. It is supported by text-like input types such as text, email, telephone, URL, search, and password. The whole non-empty value must match the pattern.

For example, this field requires two uppercase letters followed by four digits:

~~~html
<label for="reference">Reference code, for example AB1234</label>
<input id="reference" name="reference" pattern="[A-Z]{2}[0-9]{4}" title="Enter two uppercase letters followed by four digits" required>
~~~

The pattern checks the entire value, not just a matching part inside a longer string. The `title` can help provide a browser validation hint, but do not use it as the only instruction. Keep the expected format visible in nearby text or in the label.

Use `pattern` only when the format is genuinely required. Regular expressions can be difficult to understand and maintain, and a pattern that is too strict can reject valid real-world values.

## Explain constraints before submission

Validation is easier to use when people know what is expected before an error occurs. Keep instructions near the relevant field, and make required status and format limits clear:

~~~html
<form action="/register" method="post">
  <p>Fields marked required must be completed. Use four digits for the access code.</p>

  <p>
    <label for="account-email">Email address, required</label>
    <input id="account-email" name="email" type="email" autocomplete="email" required>
  </p>

  <p>
    <label for="access-code">Access code, four digits</label>
    <input id="access-code" name="access-code" inputmode="numeric" pattern="[0-9]{4}" required>
  </p>

  <button type="submit">Register</button>
</form>
~~~

The label and instructions describe the requirements in text. The browser also checks the required and pattern constraints when the user submits.

## Turn off built-in validation when needed

The Boolean `novalidate` attribute on a form turns off the browser's interactive validation when the form is submitted:

~~~html
<form action="/draft" method="post" novalidate>
  <label for="draft-title">Draft title</label>
  <input id="draft-title" name="title">
  <button type="submit">Save draft</button>
</form>
~~~

A submit button can use `formnovalidate` to bypass the form's normal interactive validation for that submission:

~~~html
<form action="/article" method="post">
  <label for="article-title">Article title</label>
  <input id="article-title" name="title" required>

  <button type="submit">Publish</button>
  <button type="submit" formnovalidate formaction="/article/draft">Save draft</button>
</form>
~~~

In this example, publishing uses the form's usual constraints. Saving a draft uses the button's alternate destination and skips interactive validation for that submission. Use these overrides only when the alternate action really should accept incomplete values.

Disabling browser validation does not validate the data for you. The server still needs to check every submitted value.

## Browser validation is not server validation

HTML constraints improve the experience in the browser, but users can bypass them by changing the page, sending a request directly, or using software that does not follow the page's rules. The server must validate data independently before relying on it.

Use browser validation for quick feedback and server-side validation for data integrity and security. Never trust a value solely because the browser accepted it.

## Common mistakes

### Treating `required` as a format check

`required` checks that an appropriate value is present. It does not decide whether a phone number has the right number of digits or whether a password meets a custom rule. Use a suitable input type or a clearly described constraint for the format.

### Assuming `type="tel"` validates a phone number

A telephone input does not impose a universal number format. Phone number formats vary. If you require a specific format, explain it and choose a constraint that matches the users and numbers you support.

### Assuming an email input verifies a real address

`type="email"` checks a browser-recognized format. It cannot tell whether the address exists or belongs to the person submitting it.

### Writing an unclear pattern

~~~html
<input name="code" pattern="[0-9]{4}" required>
~~~

The browser can reject a value that does not match, but the user has no explanation of the rule. Add a label or nearby visible instruction such as “Enter four digits”.

### Using color as the only error cue

Do not communicate an invalid state using only a red border or another color. The user needs a text explanation of what to fix. Native browser messages can help, and custom error messaging is a separate topic.

### Trusting browser validation as the only validation

Client-side rules can be bypassed. Always validate data on the server that receives it.

### Requiring more data than necessary

Only mark information required when the form truly needs it. Extra required fields make forms harder to complete and can prevent users from doing the task they came to do.

## Try it yourself

1. Add a required name field and an email field with `type="email"`.
2. Add a number field that accepts values from 1 through 10 in increments of 0.5.
3. Add a username field with a minimum length of 4 and a maximum length of 20.
4. Add a four-digit pattern to an access-code field, and write the format instruction next to it.
5. Submit the form with missing or invalid values and observe the browser's feedback.
6. Add `novalidate` to the form and compare its behavior when submitted.
7. Remove `novalidate`, add `formnovalidate` to a draft button, and compare the two submit actions.
8. Write down which values the server still needs to validate even if the browser accepts them.

## Key points

- Native HTML validation can stop a form submission and help users correct common input mistakes.
- `required` checks that a required value is provided.
- Input types such as `email` and `url` check basic formats; they do not prove that a destination or account exists.
- `min`, `max`, and `step` constrain numeric or date-like values.
- `minlength`, `maxlength`, and `pattern` constrain supported text-entry values.
- Explain required fields and format constraints in visible text near the control.
- `novalidate` and `formnovalidate` bypass browser validation for the relevant submission.
- Browser checks can be bypassed. Validate submitted data on the server too.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [33 - Buttons and form actions](33-buttons-and-form-actions.md) | [Q&A](../qnas/34-form-validation.md) | [Example](../examples/34-form-validation.md) | [35 - Form submission: name, method, action, and enctype](35-form-submission.md) |
