# 104 - Forms, input validation, and submission

HTML forms give browsers a standard way to collect and submit user input. JavaScript can enhance that behavior, validate related fields, and read form values, while native controls continue to provide keyboard support and built-in validation.

This chapter explains how controls belong to a form, how browser constraint validation works, how to handle the **submit** event, and how to read submitted values with **FormData**.

## Learning goals

By the end of this chapter, you should be able to:

- Connect labels and controls using **for** and **id**.
- Explain why a submitted control needs a **name**.
- Use native constraints such as **required**, **type**, **min**, **max**, **step**, **minlength**, and **pattern**.
- Read validity with **validity**, **checkValidity()**, and **reportValidity()**.
- Add and clear a cross-field error with **setCustomValidity()**.
- Handle form submission with the form's **submit** event and **preventDefault()**.
- Distinguish **requestSubmit()** from **submit()**.
- Read successful form controls with **FormData**.
- Explain why client-side validation does not replace server-side validation.

## Start with a semantic form

A form groups related controls and gives the browser a standard submission behavior:

~~~html
<form id="contact-form" action="/contact" method="post">
  <label for="contact-email">Email address</label>
  <input id="contact-email" name="email" type="email" required>

  <button type="submit">Send message</button>
</form>
~~~

The **label** gives the input an accessible name. Its **for** value matches the input's **id**. A user can click the label to focus the control, and assistive technology can identify what the control is for.

The input's **name** is its key in submitted form data. An **id** is useful for labels and DOM lookup, but an id alone does not make a value part of the submitted data. Use meaningful names such as **email**, **firstName**, or **shippingAddress**.

A submit button submits its form. A button inside a form defaults to submit behavior, so state its purpose explicitly:

~~~html
<button type="submit">Save</button>
<button type="button" id="preview">Preview</button>
<button type="reset">Clear changes</button>
~~~

Use **type="button"** for actions that should not submit the form. A reset button restores controls to their default values, which may differ from empty values.

## How controls are associated with a form

Controls placed inside a form are usually associated with that form. A control can also be associated with a form elsewhere in the document using its **form** attribute:

~~~html
<form id="profile-form">
  <input name="displayName">
</form>

<button type="submit" form="profile-form">Save profile</button>
~~~

The **form** attribute refers to the form's id. This is useful when layout needs to place a submit button outside the form element. The button still submits the associated form.

Give controls unique, descriptive names when they represent separate values. Controls such as radio buttons intentionally share a name so the browser treats them as one choice group. Only the selected radio button contributes a value.

## Native constraint validation

Browsers can check common input requirements without custom JavaScript. Constraints are declared in HTML, close to the control they describe:

| Attribute or type | Purpose |
| --- | --- |
| **required** | The control must have an acceptable value before submission. |
| **type="email"** | The value must have email address syntax accepted by the browser. |
| **type="url"** | The value must have URL syntax accepted by the browser. |
| **min** and **max** | A numeric or date value must be within a range. |
| **step** | A numeric or date value must match the allowed increment. |
| **minlength** and **maxlength** | A text value must stay within a length range. |
| **pattern** | A text value must match the supplied pattern. |

For example:

~~~html
<label for="age">Age</label>
<input id="age" name="age" type="number" min="13" max="120" required>

<label for="website">Website</label>
<input id="website" name="website" type="url">
~~~

The browser checks constraints when a user tries to submit. If a constraint fails, the browser identifies the invalid control and may show native feedback. The **invalid** event can be used to observe that a control failed validation, but it does not bubble.

A required checkbox has to be checked. For a radio group, make the relevant choice required. A disabled control is not interactive and is excluded from submitted data. A read-only text control remains part of the form data, but the user cannot edit it normally.

Native constraints improve the user experience. They do not prove that input is safe or truthful. A user can bypass browser checks, change requests, or send data without using your page. Validate all important rules again on the server.

## Inspect validity in JavaScript

Each form control exposes its current constraint state through **validity**:

~~~js
const emailInput = document.querySelector("#contact-email");

console.log(emailInput.validity.valid);
console.log(emailInput.validity.valueMissing);
console.log(emailInput.validity.typeMismatch);
console.log(emailInput.validationMessage);
~~~

The **validity** object contains flags for particular failures. For example, a required empty input can have **valueMissing**, and a value that does not meet an email input's syntax can have **typeMismatch**. The overall **valid** flag is true when no constraint is failing.

A form offers two methods for checking its controls:

~~~js
const form = document.querySelector("#contact-form");

const allValid = form.checkValidity();
const allValidAndShown = form.reportValidity();
~~~

**checkValidity()** returns whether the associated controls pass constraint validation. **reportValidity()** also asks the browser to present its feedback for invalid controls. Both return a boolean. These methods do not submit the form.

The **novalidate** attribute disables interactive constraint validation during ordinary form submission. The **formnovalidate** attribute on a submit button can bypass that check for one submission action, such as saving a draft. These options do not turn client validation into security protection.

## Add a custom constraint

Native constraints cover many individual fields. JavaScript can add a rule that compares controls, such as requiring two password fields to match.

~~~html
<label for="password">Password</label>
<input id="password" name="password" type="password" required minlength="8">

<label for="confirm-password">Confirm password</label>
<input id="confirm-password" name="confirmPassword" type="password" required>
~~~

~~~js
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirm-password");

function validatePasswordMatch() {
  const hasConfirmation = confirmInput.value !== "";
  const passwordsMatch = passwordInput.value === confirmInput.value;

  confirmInput.setCustomValidity(
    hasConfirmation && !passwordsMatch
      ? "The passwords do not match."
      : ""
  );
}

passwordInput.addEventListener("input", validatePasswordMatch);
confirmInput.addEventListener("input", validatePasswordMatch);
~~~

**setCustomValidity(message)** sets a custom validation error when the message is not empty. Passing an empty string clears the custom error. Always clear it when the rule becomes satisfied, or the control remains invalid.

The **input** event is useful when feedback should update as a value changes. The **change** event generally signals a committed value change and may happen later, such as when a user leaves a text field. For cross-field checks, listen to input on every field that can affect the rule.

Custom validation messages should explain how to fix the problem. Avoid relying only on color or an icon to communicate an error. Keep labels, browser validation feedback, and any custom status text understandable to keyboard and assistive technology users.

## Handle submission on the form

Listen for **submit** on the form, not only **click** on the submit button. A form can be submitted by a button, by pressing Enter in an appropriate field, or by calling **requestSubmit()**. A click-only handler misses some valid submission paths.

~~~js
const form = document.querySelector("#contact-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("The form passed native validation and is ready to handle.");
});
~~~

For ordinary user submission, the browser performs interactive constraint validation first. If the constraints fail, it presents feedback and does not dispatch the form's **submit** event. If validation passes, the event runs and the browser continues with its normal submission unless a listener cancels it.

**event.preventDefault()** cancels that browser action. When a listener prevents the default submission, your code must do the intended work, such as sending data to a server or showing a local confirmation. Preventing the default action alone does not send or save anything.

The event is a **SubmitEvent**. Its **submitter** property identifies the submit button that initiated the submission, when there is one. Different submit buttons can represent distinct actions:

~~~html
<button type="submit" name="intent" value="publish">Publish</button>
<button type="submit" name="intent" value="draft" formnovalidate>Save draft</button>
~~~

A submit button can override form submission settings with **formaction**, **formmethod**, **formenctype**, **formtarget**, and **formnovalidate**. The chosen submitter can therefore affect both the destination and the submitted values.

## requestSubmit() and submit()

These methods have different behavior:

- **form.requestSubmit()** behaves like asking the browser to submit through a submit button. It runs interactive constraint validation and dispatches the **submit** event if validation succeeds.
- **form.requestSubmit(button)** uses that button as the submitter, including its submission overrides and its name/value in the entry list.
- **form.submit()** directly submits the form. It bypasses interactive constraint validation and does not dispatch a **submit** event.

Use **requestSubmit()** when JavaScript needs to initiate the regular form flow. Avoid **submit()** when your code depends on validation, the submit listener, or the submitter's settings.

~~~js
const form = document.querySelector("#contact-form");
const saveButton = document.querySelector("#save-button");

form.requestSubmit(saveButton);
~~~

A control named **submit** can mask the form's **submit()** method through legacy form named properties. Prefer **requestSubmit()** and avoid naming controls after form methods.

## Read values with FormData

The **FormData** interface reads the form's successful controls as name/value entries:

~~~js
const form = document.querySelector("#contact-form");
const formData = new FormData(form);

console.log(formData.get("email"));
console.log([...formData.entries()]);
~~~

A control generally needs a **name** to contribute data. Disabled controls and unchecked checkboxes or radio buttons are omitted. Controls without names are omitted. Buttons are normally omitted unless the submitter is included. A file input contributes selected files.

Use **get(name)** for one value and **getAll(name)** when a name can have multiple values, such as a group of checkboxes. **Object.fromEntries(formData)** is convenient when names are unique, but it cannot preserve multiple values for the same name.

~~~js
const selectedTopics = formData.getAll("topic");
~~~

The **formdata** event can inspect or modify the entry list when it is constructed. For basic form handling, creating **new FormData(form)** inside a submit handler is often enough.

Form submission settings determine how the browser normally sends the entry list. **method="get"** places data in the URL query, which is appropriate for many searches and filters. **method="post"** sends the data in the request body and is generally used for changes. Do not put passwords or other secrets in a GET query. Use HTTPS and validate data on the server.

## A reliable form-handling pattern

A client-side handler often follows this sequence:

1. Listen for **submit** on the form.
2. Let native constraints run before the event, unless there is a clear reason to change that behavior.
3. Call **preventDefault()** only when JavaScript will take responsibility for the next step.
4. Construct **FormData** from the form and read values by their names.
5. Provide a clear pending, success, or error state to the user.
6. Send data to a server when the application requires persistence.
7. Validate and authorize the data on the server independently.

For example, this handler reads two values without exposing a password in the page:

~~~js
const form = document.querySelector("#contact-form");
const status = document.querySelector("#status");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = new FormData(form);
  const email = data.get("email");

  status.textContent = "Ready to handle the message for " + email + ".";
});
~~~

The next chapter covers the Fetch API for sending requests. Until then, this example stops at a local confirmation and does not claim that data was saved remotely.

## Common mistakes

### Listening only for a button click

This misses keyboard and programmatic submission paths. Listen for the form's **submit** event.

### Forgetting the name attribute

An input can look correct and have an id, but it will not appear in **FormData** without a name.

### Using a button with the wrong type

An untyped button inside a form may submit it. Specify **type="button"** for non-submit actions.

### Preventing submission without handling the data

After **preventDefault()**, the browser will not perform its normal action. Read the values and provide the expected next step.

### Setting a custom error without clearing it

A non-empty custom validity message keeps the field invalid. Set it back to an empty string when the condition is fixed.

### Treating client validation as security

Browser validation can be bypassed. Repeat important validation on the server and never rely on client-provided values for authorization.

### Calling form.submit() to trigger validation

That method bypasses interactive validation and the submit event. Use **requestSubmit()** for the normal flow.

## Try it yourself

1. Add a required phone number field and decide whether **type="tel"** alone validates a particular phone format.
2. Add a minimum and maximum to a number input and inspect its **validity** flags with values inside and outside the range.
3. Add a checkbox named **topic** and compare **FormData.get()** with **FormData.getAll()** after selecting multiple checkboxes with that name.
4. Add a Save draft submit button with **formnovalidate** and inspect **event.submitter** in the submit handler.
5. Use **requestSubmit()** and **submit()** separately. Observe validation and whether the submit listener runs.
6. Remove the **name** attribute from one control and confirm its value is absent from **FormData**.
7. Set a custom validity message, then clear it when the user corrects the value.
8. Explain which validation must also happen on a server and why.

## Key points

- A label gives a control an accessible name, and a control's **name** identifies its submitted value.
- Native constraints provide useful browser feedback without custom code.
- Use **validity**, **checkValidity()**, and **reportValidity()** to inspect constraints.
- Clear custom errors with **setCustomValidity("")** when the rule is satisfied.
- Handle the form's **submit** event so mouse, keyboard, and programmatic flows are covered.
- **requestSubmit()** follows validation and submit-event behavior; **submit()** bypasses both.
- **FormData** includes successful named controls, not every visible control.
- Client-side validation helps users, while server-side validation protects the application.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [103 - Event delegation and reusable handlers](103-event-delegation-and-reusable-handlers.md) | [Open Q&A](../qnas/104-forms-input-validation-and-submission.md) | [Open example](../examples/104-forms-input-validation-and-submission.md) | [105 - Fetch API: requests, responses, and headers](105-fetch-api-requests-responses-and-headers.md) |