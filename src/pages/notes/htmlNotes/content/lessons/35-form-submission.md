# 35 - Form submission: name, method, action, and enctype

A form describes how a browser collects values from controls and sends them to a destination. The control names become keys in the submitted data, `action` identifies the destination, `method` selects how the request is sent, and `enctype` describes how form data is encoded.

This chapter brings those pieces together, including the special setup needed to upload files.

## What you will learn

- What form controls are included in a submission
- How `name` and `value` become submitted data
- How a form's `action` and `method` work
- How GET and POST differ
- What the `enctype` values mean
- How to configure a file upload form
- How submit buttons can override form submission settings

## What a form submits

A form submits name and value pairs for controls that participate in that form submission. A control generally needs a `name` for its value to be sent:

~~~html
<form action="/search" method="get">
  <label for="query">Search</label>
  <input id="query" name="q" type="search" value="HTML forms">
  <button type="submit">Search</button>
</form>
~~~

The control's `name` is `q`, and its current value is `HTML forms`. These become form data that the browser sends when the user activates the submit button.

The control `id` and `name` have separate jobs. The id identifies the element in the page and can connect it to its label. The name identifies the field in the submitted data.

Not every control always contributes a value:

- A control without a name is not sent as a named field.
- A disabled control is not submitted.
- An unchecked checkbox or radio button is not submitted.
- A checked checkbox or radio button contributes its `name` and `value`.
- A select contributes the selected option value or values.
- The activated submit button may contribute its own name and value.

For example, if a checkbox needs to send a value, provide both its name and value:

~~~html
<label>
  <input name="updates" type="checkbox" value="yes">
  Send me updates
</label>
~~~

When it is checked, it contributes `updates=yes`. When it is unchecked, it contributes no value.

## The `action` attribute

The form's `action` attribute gives the URL that receives the submission:

~~~html
<form action="/contact" method="post">
  <!-- labeled controls -->
  <button type="submit">Send message</button>
</form>
~~~

The value can be a relative path, such as `/contact`, or a full URL. If the action is omitted or empty, the browser submits to the current page URL. The destination needs server-side code or another handler to process the request and respond. HTML markup alone does not create that endpoint.

## The `method` attribute

The `method` attribute selects how the browser sends form data. The common values are `get` and `post`.

### GET

GET appends form data to the action URL as query parameters:

~~~html
<form action="/search" method="get">
  <label for="search-query">Search articles</label>
  <input id="search-query" name="q" type="search">
  <button type="submit">Search</button>
</form>
~~~

A search for “HTML forms” might create a URL similar to `/search?q=HTML+forms`. Search URLs can be bookmarked or shared. Do not use GET for sensitive values because the URL can be stored in browser history, copied, or recorded in logs.

GET is appropriate when the request retrieves information and does not change server data, such as searching or filtering a list.

### POST

POST sends form data in the request body:

~~~html
<form action="/account/profile" method="post">
  <label for="display-name">Display name</label>
  <input id="display-name" name="display-name" required>
  <button type="submit">Save profile</button>
</form>
~~~

POST is commonly used when submitting or changing data. POST does not encrypt the request. Use HTTPS to protect data while it travels between the browser and server.

If `method` is omitted, the form defaults to GET. Specify the method so the intended request is clear.

## The `enctype` attribute

For POST forms, `enctype` describes how the browser encodes the submitted data. The default is `application/x-www-form-urlencoded`, which represents regular form values as encoded name and value pairs.

The standard values are:

- `application/x-www-form-urlencoded`: the default encoding for regular form fields
- `multipart/form-data`: separates data into parts and supports file content
- `text/plain`: a simple text representation primarily useful for debugging, not a reliable format for real processing

For forms without file uploads, leave the default encoding unless the server expects something different:

~~~html
<form action="/contact" method="post">
  <label for="contact-email">Email address</label>
  <input id="contact-email" name="email" type="email" required>
  <button type="submit">Send</button>
</form>
~~~

## Uploading a file

A form that uploads files needs all of the following:

1. `method="post"`
2. `enctype="multipart/form-data"`
3. A file input with a `name`

~~~html
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="photo">Choose a profile photo</label>
  <input id="photo" name="photo" type="file" accept="image/png, image/jpeg" required>

  <button type="submit">Upload photo</button>
</form>
~~~

The `accept` attribute can suggest file types in the browser's file picker. It is a hint for the user interface, not a security check. The server must verify the actual uploaded file and enforce its own size and type rules.

The form's `enctype` applies when the form is submitted. If a file is included, `multipart/form-data` lets the browser send file data along with the other named values.

## Submit buttons can override form settings

A submit button can override the form's destination, method, or encoding for its own submission. For example, a form can offer a normal save action and a separate file-upload action:

~~~html
<form action="/save-profile" method="post">
  <label for="profile-name">Name</label>
  <input id="profile-name" name="name" required>

  <label for="attachment">Optional attachment</label>
  <input id="attachment" name="attachment" type="file">

  <button type="submit">Save profile</button>
  <button type="submit"
          formaction="/save-profile-with-attachment"
          formenctype="multipart/form-data">
    Save with attachment
  </button>
</form>
~~~

The second button's `formaction` and `formenctype` override the corresponding form settings for that submission. The server endpoint must support the encoding and handle the file.

The related button attributes are `formaction`, `formmethod`, `formenctype`, `formnovalidate`, and `formtarget`. They are useful when a specific submit button needs different submission behavior. Use them only when the actions truly differ.

## Complete examples

### Search form

~~~html
<form action="/search" method="get">
  <label for="site-search">Search this site</label>
  <input id="site-search" name="q" type="search" required>
  <button type="submit">Search</button>
</form>
~~~

GET makes the search terms part of the URL, so a search can be bookmarked or shared.

### Contact form

~~~html
<form action="/contact" method="post">
  <label for="contact-name">Your name</label>
  <input id="contact-name" name="name" autocomplete="name" required>

  <label for="contact-email">Email address</label>
  <input id="contact-email" name="email" type="email" autocomplete="email" required>

  <label for="contact-message">Message</label>
  <textarea id="contact-message" name="message" rows="5" required></textarea>

  <button type="submit">Send message</button>
</form>
~~~

POST places the contact values in the request body. Each control has a label and a name. The server still needs to validate and process the values.

## Common mistakes

### Leaving off a control's `name`

~~~html
<label for="email">Email address</label>
<input id="email" type="email">
~~~

The field can still be used in the page, but it does not have a name in the submitted form data. Add a meaningful name if the server needs the value:

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email">
~~~

### Using GET for private values

GET puts values in the URL. URLs can be saved, copied, or logged, so use POST for values that should not be included in the address. Use HTTPS to protect data in transit.

### Expecting POST to encrypt data

POST changes how data is sent, but it does not encrypt it. Use HTTPS and validate the data on the server.

### Forgetting multipart encoding for file uploads

A file input alone does not make a file upload work. Use POST and `enctype="multipart/form-data"`, and make sure the file control has a name.

### Trusting `accept` to secure an upload

The `accept` value can guide the file picker. Users or clients can still provide unexpected content, so the server must check the uploaded file.

### Giving a checkbox no value

If a checked checkbox should send a specific value, define its `value`. Without one, the default submitted value is `on`, which is often less descriptive than a value chosen for the form.

### Assuming HTML creates the processing endpoint

`action="/upload"` only points to a URL. The server must implement that URL and handle the data.

## Try it yourself

1. Create a GET search form with a labeled input named `q`.
2. Create a POST contact form with named name, email, and message controls.
3. Give a checkbox the name `updates` and value `yes`. Compare the submitted data when it is checked and unchecked.
4. Create a file upload form with POST, multipart encoding, and a named file input.
5. Add an `accept` hint for image formats and explain why the server still needs to check the file.
6. Remove a control's name and observe that it is not included as a named form field.
7. Add a second submit button with a different `formaction` and `formenctype`.
8. Decide whether a search or a profile update should use GET or POST, and explain why.

## Key points

- Form controls with names contribute name and value data when they are successful for that submission.
- `action` identifies the URL that receives the form request.
- GET appends values to the URL and is useful for searches and other requests that retrieve information.
- POST sends values in the request body, but HTTPS is still needed for transport protection.
- `enctype` controls the encoding used for form data. The default is `application/x-www-form-urlencoded`.
- File uploads need POST, `multipart/form-data`, and a named file input.
- `accept` is a picker hint, not a server security rule.
- HTML points to the server endpoint; server code must process and validate submitted data.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [34 - Built-in form validation](34-form-validation.md) | [Q&A](../qnas/35-form-submission.md) | [Example](../examples/35-form-submission.md) | [36 - Autocomplete and autofill](36-autocomplete-and-autofill.md) |
