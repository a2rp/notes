# 29 - Input types and attributes: Questions and Answers

Practice questions for [Lesson 29 - Input types and input attributes](../lessons/29-input-types-and-attributes.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What happens if an input element has no type attribute?

- A. It behaves as a text input.
- B. It becomes a checkbox.
- C. It cannot be used in a form.
- D. It submits the page automatically.

**Answer: A.** The default input type is text.

### 2. Which input type is appropriate for an email address?

- A. number
- B. email
- C. password
- D. date

**Answer: B.** type="email" identifies the expected value as an email address and enables basic browser format checks.

### 3. What does type="tel" do?

- A. Guarantees that the entered value is a valid phone number.
- B. Represents telephone text and may help devices show a phone keypad.
- C. Calls the number automatically.
- D. Makes the value secret.

**Answer: B.** Phone number formats vary, so tel does not validate a specific numbering plan.

### 4. Which attribute identifies the key for a control's submitted value?

- A. placeholder
- B. name
- C. checked
- D. accept

**Answer: B.** The name identifies the control's value in submitted form data.

### 5. How do you make related radio buttons work as one choice group?

- A. Give each radio button a different name.
- B. Give them the same name and distinct values.
- C. Give them identical ids and values.
- D. Add placeholder to every button.

**Answer: B.** A shared name groups the radio buttons, and distinct values tell the destination which choice was selected.

### 6. What does checked do on a checkbox or radio input?

- A. Sets its initial selected state.
- B. Gives it a label.
- C. Encrypts its value.
- D. Changes it into a text input.

**Answer: A.** checked marks a checkbox or radio as selected initially. The user can change the selection.

### 7. What does accept do on a file input?

- A. Verifies the file is safe.
- B. Hints which file types the chooser should offer.
- C. Uploads the file to a server.
- D. Makes multiple files mandatory.

**Answer: B.** accept is a chooser hint, not a security check or upload action.

### 8. What is a suitable input type for choosing an approximate value along a slider?

- A. range
- B. url
- C. password
- D. file

**Answer: A.** range provides a control for selecting an approximate value within a range.

### 9. What happens to a disabled input's value when the form is submitted?

- A. It is normally omitted from form data.
- B. It is sent twice.
- C. It replaces the form action.
- D. It is automatically changed to a hidden value.

**Answer: A.** Disabled controls are not submitted. A readonly text control can still contribute its value.

### 10. Which statement about a password input is correct?

- A. It encrypts the value before sending it.
- B. It obscures the value on screen, but does not encrypt it.
- C. It prevents the server from reading the value.
- D. It makes HTTPS unnecessary.

**Answer: B.** Masking changes how the value is displayed. Protecting data in transit requires HTTPS and proper server handling.

## True or false

### 1. input is a void element and does not need a closing tag.

**Answer: True.** Write an input start tag with its attributes. There is no input end tag in HTML.

### 2. type="url" proves that the address belongs to a real website.

**Answer: False.** The browser can check the value's URL format, but cannot prove that a site exists or is reachable.

### 3. A tel input always validates the entered phone number.

**Answer: False.** tel is text with telephone semantics. It does not enforce one phone number format.

### 4. A checkbox can be selected independently of other checkboxes.

**Answer: True.** Multiple checkboxes can be selected. Related checkboxes can use the same name and distinct values.

### 5. A placeholder is a replacement for the input's label.

**Answer: False.** A placeholder is a temporary hint inside the field. Provide a real label as well.

### 6. The accept attribute stops users from selecting a file that does not match its hint.

**Answer: False.** It helps guide the file chooser. The server must inspect and validate uploaded files.

### 7. A named hidden input can submit a value even though the user cannot interact with it.

**Answer: True.** Hidden inputs can contribute named values, but they must never be treated as secret or trusted.

### 8. HTML constraints such as required and min replace server-side validation.

**Answer: False.** Browser checks improve the form experience. The server must validate data it receives.

## Short-answer questions

### 1. Why should an input type match the expected information?

**Answer:** The type tells the browser and user what kind of value is expected, and may enable a suitable control or basic built-in validation.

### 2. How is name different from value?

**Answer:** name identifies the submitted data key. value is the control's current or initial data, with behavior that depends on the input type.

### 3. How do checkbox and radio controls differ?

**Answer:** Checkboxes represent independent choices, so several may be selected. Radio buttons with the same name form a group in which the user selects one option.

### 4. What is the difference between a number and a range input?

**Answer:** number is useful for entering a precise numeric value. range is useful for choosing an approximate value with a slider.

### 5. Why is password masking not a security feature?

**Answer:** It only obscures the characters on screen. The value still needs HTTPS for protection during transmission and safe handling by the server.

### 6. What does placeholder provide, and what should it not replace?

**Answer:** It provides a short hint that appears inside an empty control. It should not replace a visible or otherwise properly associated label.

### 7. What is the difference between disabled and readonly?

**Answer:** A disabled control cannot be interacted with normally and its value is not submitted. A supported readonly control cannot be edited, but its value can still be submitted.

### 8. Why must uploaded files be checked on the server even when accept is present?

**Answer:** accept is only a hint for the file chooser. It does not verify the selected file's actual contents or make the upload safe.

## Practical questions

### 1. Add the correct type and name for an email field, and keep a real label.

**Answer:**

~~~html
<label for="email-address">Email address</label>
<input id="email-address" name="email" type="email">
~~~

The type communicates that an email address is expected, name identifies the submitted value, and the label identifies the control.

### 2. Make a radio group for standard and express delivery.

**Answer:**

~~~html
<fieldset>
  <legend>Delivery speed</legend>

  <label>
    <input type="radio" name="delivery" value="standard">
    Standard
  </label>

  <label>
    <input type="radio" name="delivery" value="express">
    Express
  </label>
</fieldset>
~~~

The same name groups the choices, and each value distinguishes one option.

### 3. Create two independent checkboxes for photo and table updates.

**Answer:**

~~~html
<fieldset>
  <legend>Updates to receive</legend>

  <label>
    <input type="checkbox" name="updates" value="photos">
    Photos
  </label>

  <label>
    <input type="checkbox" name="updates" value="tables">
    Tables
  </label>
</fieldset>
~~~

The user can select either checkbox, both, or neither. The shared name groups the submitted values.

### 4. Add limits so a quantity is a whole number from 1 to 20.

**Answer:**

~~~html
<label for="quantity">Quantity</label>
<input
  id="quantity"
  name="quantity"
  type="number"
  min="1"
  max="20"
  step="1">
~~~

min and max set the range, and step="1" allows whole-number increments.

### 5. Add a file input that hints for PDF and JPEG files.

**Answer:**

~~~html
<label for="attachment">Attachment</label>
<input
  id="attachment"
  name="attachment"
  type="file"
  accept=".pdf,image/jpeg">
~~~

accept helps guide the file chooser. The server still needs to validate the uploaded file.

### 6. Keep this control visible and submitted, but prevent the user from editing it.

~~~html
<input type="text" name="reference" value="REF-204" disabled>
~~~

**Answer:**

~~~html
<input type="text" name="reference" value="REF-204" readonly>
~~~

readonly prevents editing while allowing the control's value to remain part of form data. disabled controls are not submitted.

### 7. Add an example hint without removing the control label.

**Answer:**

~~~html
<label for="postal-code">Postal code</label>
<input
  id="postal-code"
  name="postal-code"
  placeholder="For example, 560001">
~~~

The label identifies the field. The placeholder offers an example and disappears when the user enters a value.

### 8. Explain what is wrong with this use of number and correct it.

~~~html
<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code" type="number">
~~~

**Answer:** A postal code is an identifier, not a quantity to increment or calculate. Keep it as text:

~~~html
<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code" type="text">
~~~

Text can preserve leading zeroes and other valid postal code characters.

### 9. A form needs an optional slider from 0 to 100 in increments of 5. Write the input.

**Answer:**

~~~html
<label for="volume">Volume</label>
<input
  id="volume"
  name="volume"
  type="range"
  min="0"
  max="100"
  step="5">
~~~

range fits approximate selection. The bounds and step describe the available values.

### 10. Explain why this hidden value should not be trusted as a secret or as verified data.

~~~html
<input type="hidden" name="account-role" value="admin">
~~~

**Answer:** Hidden controls are not visible, but their values can still be inspected or changed before submission. The server must not trust client-provided values such as permissions. It must verify access using server-side rules.

## Related lesson

- [Lesson 29 - Input types and input attributes](../lessons/29-input-types-and-attributes.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [28 - Forms: the form element and submission flow](28-forms-overview.md) | [Lesson](../lessons/29-input-types-and-attributes.md) | [Example](../examples/29-input-types-and-attributes.md) | [30 - Labels and accessible form controls](30-labels-and-form-controls.md) |
