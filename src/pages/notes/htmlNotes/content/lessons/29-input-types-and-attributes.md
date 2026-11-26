# 29 - Input types and input attributes

The input element creates many kinds of form controls. Its type tells the browser what kind of value the user can enter or choose, and which built-in behaviors may apply.

## What you will learn

- How the input type changes a control's behavior.
- Which input types work well for common kinds of information.
- How name and value contribute to form data.
- How required, min, max, step, and text length attributes set limits.
- How checked, disabled, readonly, accept, and multiple affect controls.
- Why a placeholder is only a hint and not a label.

## The input element

The input element is a void element, so it has no closing tag. If type is omitted, it behaves as a text input.

~~~html
<input>
<input type="text">
~~~

These examples both create a text entry control. Adding a type can give the browser more useful information and may provide a specialized control or built-in validity checks.

## Choose a type for the information

Choose an input type that matches the kind of information a person is entering:

- text is for a short, general text value.
- search is for a search query. Browsers may provide a search-oriented control.
- email is for an email address. The browser can check that the value has a basic email address format, but it cannot confirm that the address exists.
- password obscures the value as it is entered. It does not encrypt the value or make the connection secure.
- tel is for a telephone number. It may help a device offer a telephone keypad, but phone number formats vary, so the browser does not validate it as a specific phone number.
- url is for an absolute web address.
- number is for numeric values where stepping up or down is useful.
- range is for selecting an approximate number along a slider.
- date lets the user choose a calendar date. The control's appearance can vary by browser and device.
- checkbox represents an independent choice that can be checked or unchecked.
- radio represents one choice from a group of related options.
- file lets the user choose one or more files.
- hidden stores a value in the form without showing an interactive control. It is not a place for passwords or other secrets.
- color, time, month, week, and datetime-local are additional specialized types.
- button, submit, and reset create button-like controls. Chapter 33 covers form buttons in more detail.

## Text, search, email, phone, and URL controls

These types accept text, but their meaning and browser behavior differ:

~~~html
<label for="contact-email">Email</label>
<input id="contact-email" name="email" type="email">

<label for="contact-phone">Phone</label>
<input id="contact-phone" name="phone" type="tel">

<label for="website">Website</label>
<input id="website" name="website" type="url">
~~~

The email and url types can trigger built-in format checks when the form is submitted. These checks only assess the value's format. The destination still needs to validate important data.

The tel type is still a text value. It does not know the many valid phone number formats around the world.

Password values are obscured on screen, but that display behavior is not encryption:

~~~html
<label for="account-password">Password</label>
<input id="account-password" name="password" type="password">
~~~

Use a password control for password entry, and use HTTPS plus careful server handling to protect data. Masking characters only changes the display. It does not protect a value while it is being sent.

## Numeric and date controls

Use number for values that are genuinely numeric and can be incremented. Use range when approximate selection is more useful than entering an exact value:

~~~html
<label for="guests">Number of guests</label>
<input id="guests" name="guests" type="number" min="1" max="12" step="1">

<label for="volume">Volume</label>
<input id="volume" name="volume" type="range" min="0" max="100" step="5">
~~~

The min and max attributes set the permitted endpoints for applicable types. The step attribute sets the allowed increments. For the guest count, these settings allow whole numbers from 1 through 12.

A range control is best when the user is choosing an approximate point within a range. If a precise value matters, number is usually a better fit.

A date input lets a person choose a calendar date:

~~~html
<label for="appointment-date">Appointment date</label>
<input id="appointment-date" name="appointment-date" type="date">
~~~

The browser can use its own date picker or another native interface. Its visible presentation may differ across devices.

## Checkboxes and radio buttons

A checkbox is independent. A person can check several separate checkboxes:

~~~html
<fieldset>
  <legend>Topics you want to learn</legend>

  <label>
    <input type="checkbox" name="topic" value="images">
    Images
  </label>

  <label>
    <input type="checkbox" name="topic" value="tables">
    Tables
  </label>
</fieldset>
~~~

The controls share a name because each selected topic is one value for the same kind of data. Each checkbox has a different value so the destination can distinguish the selections.

Radio buttons are for choosing one option from a group. Give related radio buttons the same name and a distinct value for each option:

~~~html
<fieldset>
  <legend>Preferred contact method</legend>

  <label>
    <input type="radio" name="contact-method" value="email">
    Email
  </label>

  <label>
    <input type="radio" name="contact-method" value="phone">
    Phone
  </label>
</fieldset>
~~~

Choosing one option in a same-name radio group deselects the other option in that group. The fieldset and legend group and name these controls. Chapter 31 covers them in detail.

## File controls

A file input lets a user select files from their device:

~~~html
<label for="profile-image">Choose a profile image</label>
<input
  id="profile-image"
  name="profile-image"
  type="file"
  accept="image/png, image/jpeg">
~~~

The accept attribute is a hint to the file chooser about the file types expected. It is not a security check. A server must check uploaded files itself.

Add multiple when the control should allow selecting more than one file:

~~~html
<input type="file" name="documents" accept=".pdf" multiple>
~~~

The details of sending uploaded files are covered later with form submission encoding.

## Names, values, and initial states

The name attribute identifies a control's data when a form is submitted. A control without a name normally does not contribute its value to the submitted form data.

The value attribute behaves according to the input type:

- For a text control, value provides its initial text.
- For a checkbox or radio button, value is the value submitted when that option is selected.
- For submit buttons, value can be the button's submitted value when that button initiated submission.

Use checked to make a checkbox or radio button selected initially:

~~~html
<label>
  <input type="checkbox" name="updates" value="yes" checked>
  Send me updates
</label>
~~~

checked sets the initial state. The user can change that selection before submitting.

## Common attributes for constraints and hints

Different attributes apply to different types. Check that an attribute is appropriate for the type you chose.

- required means a value or selection is required for form submission.
- min and max set lower and upper limits on applicable number, range, or date-like controls.
- step sets increments for applicable numeric or date-like controls.
- minlength and maxlength set character length limits for applicable text entry controls.
- pattern can set a format requirement for supported text controls.
- multiple allows more than one value for types that support it, such as file and email.
- accept hints which file types are expected on a file control.

These attributes can activate browser validation, but they do not replace server-side validation. A server must validate data it receives, because browser checks can be bypassed.

## Placeholder is not a label

The placeholder attribute can show a short example or hint inside an empty text control:

~~~html
<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code" placeholder="For example, 560001">
~~~

The placeholder disappears when a value is entered. It does not identify the control as clearly or reliably as a label. Keep a real label even when you use a placeholder. The next chapter focuses on labels and accessible controls.

## Disabled and read-only controls

A disabled control cannot be interacted with normally, and its value is not included in form submission:

~~~html
<input type="text" name="account-id" value="A104" disabled>
~~~

A read-only control cannot be edited by the user, but its value can still be submitted. readonly applies to text-like controls that support it:

~~~html
<input type="text" name="reference-code" value="REF-204" readonly>
~~~

Use disabled when the control is unavailable. Use readonly when users should be able to see and submit a value without editing it.

## Common mistakes

- Leaving out type when another type would better fit the expected information.
- Assuming type="tel" validates a phone number format.
- Assuming email or url checks prove that an address or site exists.
- Assuming password fields encrypt what users type.
- Using number for values that are identifiers, such as postal codes or account numbers.
- Giving radio buttons in one choice group different names.
- Giving related radio choices the same value.
- Forgetting a value for a checkbox or radio option.
- Treating placeholder as a substitute for a label.
- Assuming accept prevents a person from choosing a different file.
- Assuming browser validation replaces validation on the server.
- Using disabled when the value still needs to be submitted.
- Putting secrets in a hidden input.

## Try it yourself

1. Create text, email, tel, and url inputs with appropriate types and names.
2. Add a required email input and observe the browser's built-in response to an empty or malformed value.
3. Create a number input for a quantity from 1 to 20 that changes in steps of 1.
4. Add a date input for a booking date.
5. Create three topic checkboxes that share a name and have different values.
6. Create a radio group with two delivery choices, using the same name and different values.
7. Add a file input with accept hints for PDF and JPEG files.
8. Add a useful label and a placeholder hint to a text field. Explain what each one does.
9. Compare disabled and readonly controls and note which value is included in form submission.
10. Explain why a server must validate submitted data even when HTML validation is present.

## Key points

- The input type determines the kind of control and its type-specific behavior.
- Use a type that matches the information, such as email, date, number, checkbox, radio, or file.
- The name identifies a submitted value. The value and checked state behave differently across types.
- Attributes such as required, min, max, step, minlength, and maxlength can constrain input.
- A placeholder is a hint, not a label.
- accept is only a file chooser hint, and client-side validation does not replace server validation.
- Disabled values are not submitted. Read-only values generally remain part of form data.
- A password input masks its display but does not encrypt the value.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [28 - Forms: the form element and submission flow](28-forms-overview.md) | [Q&A](../qnas/29-input-types-and-attributes.md) | [Example](../examples/29-input-types-and-attributes.md) | [30 - Labels and accessible form controls](30-labels-and-form-controls.md) |
