# 33 - Buttons and form actions: Questions and Answers

Use these questions to review [Chapter 33 - Buttons and form actions](../lessons/33-buttons-and-form-actions.md). Every answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does a button with `type="submit"` do when it is associated with a form?

A. Submits the form

B. Resets the form

C. Does nothing by default

D. Opens a select menu

**Answer: A.** A submit button starts submission of its associated form.

### 2. What does a button with `type="reset"` do?

A. Sends the current values to the server

B. Restores controls to their initial values

C. Clears every field to an empty value in all cases

D. Disables the form

**Answer: B.** A reset button restores the values from the page's initial form state. Those values are not necessarily empty.

### 3. What is the default form behavior of `<button type="button">`?

A. It submits the form

B. It resets the form

C. It has no default form action

D. It changes the form method to GET

**Answer: C.** A button with `type="button"` does not submit or reset the form by itself. A script can add custom behavior.

### 4. What is a good habit for buttons inside a form?

A. Leave off `type` so the browser guesses

B. Set the intended `type` explicitly

C. Give every button `type="reset"`

D. Use a placeholder as the button label

**Answer: B.** An ordinary button inside a form can act as a submit button by default. Explicit types prevent accidental submissions.

### 5. What does the form's `action` attribute specify?

A. The URL that processes the submitted data

B. The visible label of the submit button

C. The form's required fields

D. The name of each form control

**Answer: A.** The form's action identifies the destination URL for submission. A server needs to handle that URL for a real response.

### 6. What happens when a form uses `method="get"`?

A. Its data is appended to the action URL as query parameters

B. Its data is encrypted automatically

C. Its controls are reset

D. Its values are never sent

**Answer: A.** GET places the submitted values in the URL. It is commonly used for searches and requests that retrieve information without changing server data.

### 7. What does `method="post"` do?

A. Sends the form data in the request body

B. Encrypts the request automatically

C. Sends data only if a reset button is clicked

D. Displays every field in the page title

**Answer: A.** POST sends the data in the request body. POST alone does not encrypt it; HTTPS protects data while it travels between browser and server.

### 8. Which attribute on a form control gives its submitted value a key?

A. `id`

B. `label`

C. `name`

D. `placeholder`

**Answer: C.** The control's `name` identifies its value in submitted form data. The `id` can connect the control to a label.

### 9. What can `formaction` do on a submit button?

A. Override the form's action URL for that button

B. Rename every control in the form

C. Turn a reset button into a link

D. Add a visible label to every field

**Answer: A.** A submit button's `formaction` can send that button's submission to a different processing URL from the form's default action.

### 10. Which element is usually a better choice when the user should navigate to another page?

A. A link

B. A reset button

C. An empty button

D. A required input

**Answer: A.** Links navigate to destinations. Buttons perform actions, such as submitting a form or triggering an operation.

## True or false

### 1. A button inside a form with no type usually acts as a submit button.

**Answer: True.** Set `type="button"` or `type="reset"` when that is the intended behavior.

### 2. A reset button always empties every field.

**Answer: False.** It restores each control's initial value. If a field began with a value in the markup, reset returns to that value.

### 3. A button with `type="button"` submits a form automatically.

**Answer: False.** It has no default form action. A script can listen for its activation and perform a custom behavior.

### 4. A form's action URL needs server-side handling for the submitted data to be processed.

**Answer: True.** HTML can describe and submit the request, but the destination needs a server-side handler to process it.

### 5. POST encrypts form values even when the page uses HTTP.

**Answer: False.** POST places data in the request body but does not encrypt it. HTTPS is needed for transport protection.

### 6. A field's label and id replace its name when the form is submitted.

**Answer: False.** The label describes the field and the id identifies the element. A name supplies the form-data key.

### 7. A submit button can override the form action with `formaction`.

**Answer: True.** The override applies when that submit button is used.

### 8. Reset buttons can surprise users by discarding edits.

**Answer: True.** Include one only when restoring the original values is expected, and give it clear text.

## Short-answer questions

### 1. Describe the difference between `submit`, `reset`, and `button` types.

**Answer:** `submit` submits the associated form. `reset` restores its controls to their initial values. `button` has no default form behavior and is typically used with a script-driven action.

### 2. Why should a form button's type be explicit?

**Answer:** A button inside a form can submit by default. Explicitly setting its type prevents a help, menu, or custom-action button from submitting accidentally.

### 3. What is the role of `action` and `method` on a form?

**Answer:** `action` specifies the URL that processes the submission. `method` specifies how the browser sends the data, commonly GET or POST.

### 4. What is the difference between GET and POST in a form?

**Answer:** GET appends form data to the action URL as query parameters. POST sends the data in the request body. POST does not itself encrypt data; HTTPS is needed for transport protection.

### 5. Why does a control generally need a `name` to submit its value?

**Answer:** The name is the key used for that value in the submitted form data. An id and label serve different purposes and do not replace the name.

### 6. What happens when a reset button is activated?

**Answer:** The form controls return to their initial values from the document. A field initially containing text such as “Guest” returns to “Guest”, rather than becoming empty.

### 7. How can two submit buttons send a form to different URLs?

**Answer:** Give one or both submit buttons a `formaction` attribute. Each button can then override the form's `action` when it is used.

### 8. When should you use a link instead of a button?

**Answer:** Use a link when the user should navigate to a destination. Use a button when the user should trigger an action, such as submitting or resetting a form.

## Practical questions

### 1. This button should show help without submitting the form. Fix it.

~~~html
<form>
  <button>Show help</button>
</form>
~~~

**Answer:** Set its type to `button`:

~~~html
<form>
  <button type="button">Show help</button>
</form>
~~~

It will not perform the help behavior until a script implements that action, but it will no longer submit the form by default.

### 2. Create a GET search form with a labeled, named search field.

**Answer:**

~~~html
<form action="/search" method="get">
  <label for="query">Search articles</label>
  <input id="query" name="q" type="search">
  <button type="submit">Search</button>
</form>
~~~

The value of `q` is appended to the `/search` URL when the form is submitted.

### 3. Create a POST form with a labeled email field and a submit button.

**Answer:**

~~~html
<form action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" required>
  <button type="submit">Subscribe</button>
</form>
~~~

The server must implement `/subscribe` to process the request. Use HTTPS when protecting data in transit is required.

### 4. The form should restore its original values when the reset button is clicked. Write the button.

**Answer:**

~~~html
<button type="reset">Restore original values</button>
~~~

It resets the controls associated with its form to their initial values.

### 5. Create two submit buttons that send to `/draft` and `/publish` respectively.

**Answer:**

~~~html
<form action="/publish" method="post">
  <label for="title">Title</label>
  <input id="title" name="title" required>

  <button type="submit" formaction="/draft">Save draft</button>
  <button type="submit">Publish</button>
</form>
~~~

The draft button overrides the form action with `/draft`. The publish button uses the form's `/publish` action.

### 6. What is missing from this field if the server needs to receive its value?

~~~html
<label for="city">City</label>
<input id="city" type="text">
~~~

**Answer:** It needs a `name` attribute:

~~~html
<label for="city">City</label>
<input id="city" name="city" type="text">
~~~

The label identifies the field to users, and the id connects the label. The name identifies the submitted value.

### 7. Fix this example so one button submits and one does not submit by default.

~~~html
<form action="/profile" method="post">
  <button>Save profile</button>
  <button>Preview profile</button>
</form>
~~~

**Answer:** Set the submit type explicitly on the save button and `button` type on the preview button:

~~~html
<form action="/profile" method="post">
  <button type="submit">Save profile</button>
  <button type="button">Preview profile</button>
</form>
~~~

The preview action still needs JavaScript behavior if it should do something.

### 8. Add a submit button with `name="action"` and `value="publish"`.

**Answer:**

~~~html
<button type="submit" name="action" value="publish">Publish</button>
~~~

When this submit button is activated, its name and value can be included with the form submission.

### 9. Explain why this is not secure just because the form uses POST.

~~~html
<form action="/login" method="post">
  <!-- login controls -->
</form>
~~~

**Answer:** POST sends data in the request body but does not encrypt it. Use HTTPS to protect data in transit, and implement appropriate server-side security.

### 10. Create a feedback form with a GET or POST method, a message field, a submit button, and a reset button. Make the button actions clear.

**Answer:** A feedback form that sends its contents to a server can use POST:

~~~html
<form action="/feedback" method="post">
  <label for="message">Your feedback</label>
  <textarea id="message" name="message" rows="5" required></textarea>

  <button type="submit">Send feedback</button>
  <button type="reset">Clear entered feedback</button>
</form>
~~~

The submit button sends the form to `/feedback`. The reset button restores the message field to its initial value, which is empty here.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [32 - Textarea, select, option, and datalist](32-textarea-select-and-datalist.md) | [Lesson](../lessons/33-buttons-and-form-actions.md) | [Example](../examples/33-buttons-and-form-actions.md) | [34 - Built-in form validation](34-form-validation.md) |
