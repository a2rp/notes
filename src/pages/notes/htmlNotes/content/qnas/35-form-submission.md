# 35 - Form submission: name, method, action, and enctype: Questions and Answers

Use these questions to review [Chapter 35 - Form submission: name, method, action, and enctype](../lessons/35-form-submission.md). Every answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What role does a control's `name` attribute play in form submission?

A. It is the key used for the control's submitted value

B. It connects the control to its visible label

C. It selects the form's HTTP method

D. It chooses the upload encoding

**Answer: A.** The name identifies the field in submitted data. The id is used to identify the element in the page and can connect it to a label.

### 2. What does a form's `action` attribute specify?

A. The URL that receives and processes the submission

B. The label of the submit button

C. The encoding used for file data

D. The validation rule for each field

**Answer: A.** The form submits to the destination identified by its action. A server or other handler must implement that URL.

### 3. How does a GET form usually send its values?

A. As query parameters in the URL

B. As a file attachment

C. Only in the page title

D. It does not send values

**Answer: A.** GET appends form values to the action URL. This works well for searches and other requests that retrieve information.

### 4. How does a POST form usually send its values?

A. In the request body

B. In the browser tab title

C. Inside the form labels

D. Only as URL fragments

**Answer: A.** POST sends values in the request body. Use HTTPS when the data needs protection in transit.

### 5. Which encoding is required for a form that uploads files?

A. `text/plain`

B. `multipart/form-data`

C. `application/xml`

D. `image/jpeg`

**Answer: B.** File upload forms need `multipart/form-data` so the browser can send file data and other fields in parts.

### 6. Which set of settings is needed for a typical HTML file upload?

A. GET, default encoding, and an unnamed file input

B. POST, `multipart/form-data`, and a named file input

C. POST, `text/plain`, and a submit input

D. GET, `multiple`, and a datalist

**Answer: B.** A file upload form needs POST, multipart encoding, and a file control with a name.

### 7. What does the `accept` attribute on a file input do?

A. Provides a hint about file types in the file picker

B. Ensures the server receives only safe files

C. Encrypts the selected file

D. Sets the form's action URL

**Answer: A.** It can guide the file picker, but it is not a security check. The server must verify uploaded files.

### 8. When is a checked checkbox's value included in a submission?

A. When it has a name and is checked

B. When it is disabled

C. Whenever it has an id

D. Only when the form uses GET

**Answer: A.** An enabled checked checkbox with a name contributes its value. An unchecked checkbox does not submit a value.

### 9. What is the default value submitted by a checked checkbox with no `value` attribute?

A. `true`

B. `checked`

C. `on`

D. Its id

**Answer: C.** Browsers use `on` when a checked checkbox has no explicit value. An explicit value is often clearer for the server.

### 10. What does `formenctype` on a submit button do?

A. Overrides the form's encoding for that button's submission

B. Renames all the form controls

C. Disables the form's validation

D. Changes the form into a datalist

**Answer: A.** A submit button can specify a different form encoding for the submission started by that button.

## True or false

### 1. A control's `id` and `name` have the same purpose in a form.

**Answer: False.** An id identifies an element in the page. A name identifies a field in submitted data.

### 2. A disabled control is normally omitted from form submission.

**Answer: True.** Disabled controls do not contribute their values to the form data set.

### 3. An unchecked checkbox is submitted with the value `false` by default.

**Answer: False.** An unchecked checkbox is omitted from submission. If it is checked and has no explicit value, its submitted value defaults to `on`.

### 4. GET is a good choice for a search that should be bookmarkable.

**Answer: True.** GET places the search values in the URL, which can be copied or bookmarked. Avoid putting sensitive values in the URL.

### 5. POST encrypts form data automatically.

**Answer: False.** POST sends data in the request body but does not encrypt it. HTTPS protects data in transit.

### 6. `multipart/form-data` is the usual encoding for a file upload form.

**Answer: True.** Use it with POST and a named file input.

### 7. The `accept` attribute is enough to prevent unsafe files from reaching the server.

**Answer: False.** It is a picker hint. The server needs to check the uploaded content and enforce its own rules.

### 8. A form with no action submits to the current page URL.

**Answer: True.** If `action` is omitted or empty, the current page URL is used as the destination.

## Short-answer questions

### 1. Explain the difference between a control's `id` and `name`.

**Answer:** The id identifies an element in the document and can be the target of a label's `for` attribute. The name identifies the control's value in the submitted form data.

### 2. What is the purpose of `action` and `method`?

**Answer:** `action` specifies the destination URL. `method` specifies how the browser sends the form data, most commonly with GET or POST.

### 3. When is GET appropriate, and what should not be sent with it?

**Answer:** GET is useful for requests that retrieve information, such as searching or filtering, especially when the resulting URL should be shareable. Avoid sensitive values because GET places them in the URL.

### 4. Does POST provide encryption?

**Answer:** No. POST sends form data in the request body, but HTTPS is needed to encrypt data in transit between the browser and server.

### 5. What does `enctype` control?

**Answer:** It controls the encoding used for form data. The default is `application/x-www-form-urlencoded`; `multipart/form-data` is used for file uploads.

### 6. What three things are needed for a typical file upload form?

**Answer:** Use `method="post"`, `enctype="multipart/form-data"`, and a file input with a `name` attribute.

### 7. Why is `accept` not a server-side security check?

**Answer:** It guides the file picker but cannot guarantee what content is sent. A client can ignore or bypass it, so the server must inspect and validate uploaded files.

### 8. Which controls are commonly omitted from the submitted form data?

**Answer:** Controls without a name, disabled controls, and unchecked checkboxes or radio buttons are common examples. A submit button contributes only when it is the button used to submit the form.

## Practical questions

### 1. Add a name so the server receives the search value under the key `q`.

~~~html
<label for="query">Search</label>
<input id="query" type="search">
~~~

**Answer:**

~~~html
<label for="query">Search</label>
<input id="query" name="q" type="search">
~~~

### 2. Write a GET form that sends a search query to `/search`.

**Answer:**

~~~html
<form action="/search" method="get">
  <label for="query">Search articles</label>
  <input id="query" name="q" type="search">
  <button type="submit">Search</button>
</form>
~~~

### 3. Create a POST contact form with named name and email controls.

**Answer:**

~~~html
<form action="/contact" method="post">
  <label for="contact-name">Name</label>
  <input id="contact-name" name="name" required>

  <label for="contact-email">Email address</label>
  <input id="contact-email" name="email" type="email" required>

  <button type="submit">Send message</button>
</form>
~~~

The server must implement `/contact` to process the submitted data.

### 4. Configure this form to upload one profile photo.

~~~html
<form action="/profile/photo">
  <label for="photo">Choose a profile photo</label>
  <input id="photo" type="file">
  <button type="submit">Upload photo</button>
</form>
~~~

**Answer:** Add POST, multipart encoding, and a name for the file control:

~~~html
<form action="/profile/photo" method="post" enctype="multipart/form-data">
  <label for="photo">Choose a profile photo</label>
  <input id="photo" name="photo" type="file">
  <button type="submit">Upload photo</button>
</form>
~~~

### 5. Suggest PNG and JPEG files in the file picker. Does this validate the upload?

**Answer:** Add an `accept` hint, but still validate the upload on the server:

~~~html
<label for="photo">Choose a profile photo</label>
<input id="photo" name="photo" type="file" accept="image/png, image/jpeg">
~~~

The hint does not guarantee that the selected or transmitted file is safe or has the claimed content type.

### 6. This checkbox should send `updates=yes` when checked. Fix the markup.

~~~html
<input id="updates" type="checkbox">
<label for="updates">Send me updates</label>
~~~

**Answer:** Give it a name and explicit value:

~~~html
<input id="updates" name="updates" type="checkbox" value="yes">
<label for="updates">Send me updates</label>
~~~

### 7. A form uses POST but contains a file input. What setting is missing?

~~~html
<form action="/upload" method="post">
  <label for="document">Choose a document</label>
  <input id="document" name="document" type="file">
  <button type="submit">Upload</button>
</form>
~~~

**Answer:** Add `enctype="multipart/form-data"` to the form:

~~~html
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="document">Choose a document</label>
  <input id="document" name="document" type="file">
  <button type="submit">Upload</button>
</form>
~~~

### 8. Add a second submit button that sends the form to `/save-draft`.

~~~html
<form action="/publish" method="post">
  <label for="title">Title</label>
  <input id="title" name="title">
  <button type="submit">Publish</button>
</form>
~~~

**Answer:** Add a submit button with `formaction`:

~~~html
<form action="/publish" method="post">
  <label for="title">Title</label>
  <input id="title" name="title">
  <button type="submit">Publish</button>
  <button type="submit" formaction="/save-draft">Save draft</button>
</form>
~~~

### 9. Why should this private access code not be sent with GET?

~~~html
<form action="/access" method="get">
  <label for="code">Access code</label>
  <input id="code" name="code">
  <button type="submit">Continue</button>
</form>
~~~

**Answer:** GET places the code in the URL, where it can be copied, saved in browser history, or recorded in logs. Use POST for this kind of value and use HTTPS to protect it in transit.

### 10. A form with no `action` is submitted. Where is the request sent?

**Answer:** It is sent to the current page URL. Add an explicit action when the form should go to a different processing endpoint.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [34 - Built-in form validation](34-form-validation.md) | [Lesson](../lessons/35-form-submission.md) | [Example](../examples/35-form-submission.md) | [36 - Autocomplete and autofill](36-autocomplete-and-autofill.md) |
