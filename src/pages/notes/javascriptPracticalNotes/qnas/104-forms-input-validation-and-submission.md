# 104 - Forms, input validation, and submission: Questions and Answers

Use these questions to review form controls, native and custom validation, submission events, and **FormData**. Every answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What does the **name** attribute on a form control primarily provide?

- A. The control's CSS color
- B. The key used for its submitted name/value data
- C. Its accessible label in every case
- D. A guarantee that the value is valid

**Answer: B. The key used for its submitted name/value data.**

The **id** is useful for labels and DOM lookup. A named, enabled control can contribute a value to form data. An id by itself does not replace a name.

### 2. What does **required** do on an ordinary text input?

- A. Prevents the user from editing it
- B. Requires a non-empty acceptable value before normal submission
- C. Sends the form automatically
- D. Makes the field hidden

**Answer: B. Requires a non-empty acceptable value before normal submission.**

The browser's constraint validation checks required controls before it proceeds with a regular form submission.

### 3. When is a form's **submit** event normally dispatched during user submission?

- A. Before the browser checks constraints
- B. After interactive constraint validation succeeds
- C. Only after a submit button is clicked with a mouse
- D. Every time any input changes

**Answer: B. After interactive constraint validation succeeds.**

If native constraints fail, the browser reports the invalid field and does not dispatch the normal submit event. Keyboard submission is also handled through the form submission flow.

### 4. Which method checks constraints and asks the browser to show feedback for invalid fields?

- A. **form.reset()**
- B. **form.reportValidity()**
- C. **form.submit()**
- D. **form.remove()**

**Answer: B. form.reportValidity().**

It returns whether the form is valid and presents browser feedback if a control is invalid. **checkValidity()** checks and returns a boolean without requesting interactive reporting.

### 5. What clears a custom validation error?

- A. Calling **setCustomValidity("")**
- B. Setting **required** to true
- C. Calling **preventDefault()**
- D. Changing the input's id

**Answer: A. Calling setCustomValidity("").**

A non-empty message makes the control invalid. Set the message to an empty string when the custom rule is satisfied.

### 6. Why is client-side validation not a security boundary?

- A. Browsers never run validation
- B. It can be bypassed, so submitted data still needs server validation
- C. It works only on text fields
- D. It encrypts the form values

**Answer: B. It can be bypassed, so submitted data still needs server validation.**

Users and other clients can send requests without using the page. The server must validate data and enforce authorization independently.

### 7. Which control is generally omitted from **new FormData(form)**?

- A. An enabled text input with a name
- B. A checked checkbox with a name
- C. A disabled input with a name
- D. A selected option with a name

**Answer: C. A disabled input with a name.**

Disabled controls are not successful controls for submission. Unchecked checkboxes and controls without names are also omitted.

### 8. What does **form.requestSubmit()** do that **form.submit()** does not?

- A. Runs interactive validation and dispatches a submit event when valid
- B. Clears every input first
- C. Always sends a GET request
- D. Creates a submit button in the document

**Answer: A. Runs interactive validation and dispatches a submit event when valid.**

**submit()** bypasses interactive constraint validation and does not fire a submit event. Use **requestSubmit()** for the normal form flow.

### 9. What does **event.preventDefault()** do in a submit handler?

- A. Stops the event from reaching every other listener
- B. Cancels the browser's default submission action
- C. Automatically saves the form data
- D. Marks every input valid

**Answer: B. Cancels the browser's default submission action.**

If JavaScript cancels submission, it must provide the next behavior, such as sending data or displaying a local confirmation.

### 10. What does **event.submitter** identify?

- A. The form's first input
- B. The submit button that initiated submission, when available
- C. The server that receives the form
- D. The last field the user edited

**Answer: B. The submit button that initiated submission, when available.**

Different submit buttons may have different names, values, or submission overrides. The submitter tells the handler which action was selected.

## Objective questions

### 11. What connects a **label** to an input when using explicit association?

**Answer:** Set the label's **for** attribute to the input's **id**.

For example, **label for="email"** connects to **input id="email"**. The control still needs a **name** to provide its submitted key.

### 12. True or false: An input with an id but no name is included in FormData under its id.

**Answer: False.**

The id is for identification in the document and for explicit label association. Form submission uses the control's **name** as its data key.

### 13. Which event is usually suited to feedback that should update as the user types: **input** or **change**?

**Answer: input.**

The **input** event fires as the value is edited. The **change** event generally signals a committed value change and may occur later for text fields.

### 14. What happens to an unchecked checkbox with a name when form data is constructed?

**Answer:** It is omitted from the form data.

Only checked checkbox values are submitted. For a group of same-name checkboxes, use **FormData.getAll(name)** to read every checked value.

### 15. What type should a non-submit button inside a form use?

**Answer:** **type="button"**.

A button associated with a form defaults to submit behavior if its type is omitted. Make its action explicit so clicking it does not accidentally submit the form.

### 16. Which FormData method retrieves multiple values that share one name?

**Answer:** **getAll(name)**.

**get(name)** returns one matching value. **getAll(name)** preserves all values, which is useful for checkbox groups or repeated fields.

### 17. What does **formnovalidate** on a submit button do?

**Answer:** It lets that submit button request submission without interactive constraint validation.

This can be useful for a Save draft action. It is not a way to make untrusted data safe.

### 18. What does calling **form.reset()** generally do?

**Answer:** It restores controls to their default values.

Those default values may come from the original markup and do not always mean empty values. Reset is a browser form action, not a server-side undo.

### 19. Where does a normal GET form put its submitted values?

**Answer:** In the URL query string.

GET is useful for searches and filters whose values can appear in a shareable URL. Do not place passwords or other secrets in a GET query.

### 20. True or false: A readonly text input is always omitted from form submission.

**Answer: False.**

A read-only control can still contribute its named value. A disabled control is excluded. Neither behavior makes submitted values trustworthy.

## Short-answer questions

### 21. Why does a form control need a **name** if its value should be submitted?

**Answer:** The name supplies the key for that value in the form entry list.

For instance, an email input named **email** produces an entry keyed by **email**. Its **id** can still be different and is used for labels or DOM lookup.

### 22. Describe the normal browser submission flow when a required field is empty.

**Answer:** The browser runs constraint validation, finds the required field invalid, presents feedback, and does not dispatch the normal submit event or continue submission.

A script that calls **form.submit()** bypasses this interactive validation. A script using **requestSubmit()** follows it.

### 23. Why should submission logic usually listen to the form instead of the submit button's click?

**Answer:** A form can be submitted with a button, keyboard interaction, or programmatic **requestSubmit()**. Listening to the form's **submit** event covers the form-level submission flow.

A click handler alone misses submission paths that do not produce a click on that button.

### 24. Why should code clear a custom validity message after the user fixes the input?

**Answer:** A non-empty custom message keeps the field invalid even after its value otherwise meets native constraints.

Call **setCustomValidity("")** when the custom rule passes so the browser can treat the field as valid again.

### 25. What is a limitation of **Object.fromEntries(formData)** when the form has repeated field names?

**Answer:** An ordinary object can keep only one value for each property name, so repeated values are lost.

Use **formData.getAll(name)** when the form intentionally contains several values under the same name.

### 26. When should JavaScript call **preventDefault()** in a submit handler?

**Answer:** When JavaScript is taking responsibility for the next step instead of allowing the browser's default navigation or submission.

After canceling, the code should read the data, send it if needed, and provide a useful result or error state. Calling it without handling the form leaves the user with no completed action.

## Coding questions

### 27. Write a custom validity check that requires confirmation input to match a password input.

**Answer:**

~~~js
const password = document.querySelector("#password");
const confirmation = document.querySelector("#confirm-password");

function checkPasswordMatch() {
  const hasConfirmation = confirmation.value !== "";
  const mismatch = password.value !== confirmation.value;

  confirmation.setCustomValidity(
    hasConfirmation && mismatch ? "Passwords do not match." : ""
  );
}

password.addEventListener("input", checkPasswordMatch);
confirmation.addEventListener("input", checkPasswordMatch);
~~~

**Explanation:** Either field can change the relationship, so both listen for **input**. The empty confirmation is left to the native **required** constraint. A non-empty mismatch sets a message; a match clears it.

### 28. Handle a valid form submission locally and show its email value without navigating away.

**Answer:**

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

**Explanation:** Native constraints run before the submit event. Once valid, the handler cancels navigation, reads the named email field, and provides a local confirmation. This code does not send the message to a server.

### 29. Read all checked checkbox values from a group named **topic**.

**Answer:**

~~~js
const form = document.querySelector("#preferences-form");
const data = new FormData(form);
const topics = data.getAll("topic");

console.log(topics);
~~~

**Explanation:** Each checked checkbox contributes an entry. **getAll()** returns every value for that repeated name; **get()** would return only one.

### 30. Programmatically start the normal submit flow using a particular submit button.

**Answer:**

~~~js
const form = document.querySelector("#registration-form");
const saveButton = document.querySelector("#save-button");

form.requestSubmit(saveButton);
~~~

**Explanation:** The form validates, dispatches its submit event if valid, and uses the selected submitter's settings and name/value. **form.submit()** would bypass validation and the submit event.

### 31. Read a file input's selected file from FormData.

**Answer:**

~~~js
const form = document.querySelector("#upload-form");
const data = new FormData(form);
const file = data.get("attachment");

console.log(file.name);
~~~

**Explanation:** A named file input contributes selected File values. Real upload handling must send the file appropriately and validate the upload on the server.

### 32. Check whether an email control is valid and request browser feedback if it is not.

**Answer:**

~~~js
const email = document.querySelector("#email");

if (!email.checkValidity()) {
  email.reportValidity();
}
~~~

**Explanation:** The first call checks the control and returns a boolean. The second call asks the browser to show feedback. A form-level **reportValidity()** can check and report for all its controls.

### 33. A form has a named disabled input. Should its value be expected in FormData?

**Answer:** No. Disabled controls are excluded from the form entry list.

If a value must be submitted, do not rely on a disabled control. Also remember that a hidden field or other client-supplied value can be changed, so the server must independently validate and authorize it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [103 - Event delegation and reusable handlers](../qnas/103-event-delegation-and-reusable-handlers.md) | [Open lesson](../lessons/104-forms-input-validation-and-submission.md) | [Open example](../examples/104-forms-input-validation-and-submission.md) | [105 - Fetch API: requests, responses, and headers](../lessons/105-fetch-api-requests-responses-and-headers.md) |