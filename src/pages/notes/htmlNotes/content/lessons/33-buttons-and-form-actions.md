# 33 - Buttons and form actions

Buttons let users submit a form, reset its controls, or activate an action provided by a page. In HTML, a button's `type` determines what it does. A form's `action` and `method` determine where and how its data is sent when a submit button is activated.

This chapter explains the three common button types, how forms are submitted, and how a submit button can provide its own action.

## What you will learn

- The difference between `submit`, `reset`, and `button`
- Why to set a button's `type` explicitly
- How `action` and `method` work on a form
- How named controls contribute values to form submission
- How a submit button can override the form's action or method
- How to write clear button text and avoid accidental resets

## The three button types

A `button` element can submit a form, reset its controls, or act as a button that has no built-in form behavior. Set the `type` attribute to state the intended behavior:

~~~html
<button type="submit">Send message</button>
<button type="reset">Clear form</button>
<button type="button">Show help</button>
~~~

These buttons have different behaviors:

- `type="submit"` submits the button's associated form.
- `type="reset"` restores the form controls to their initial values.
- `type="button"` has no default form action. It can be used with JavaScript to perform a custom action.

A `button` inside a form that has no `type` will normally act as a submit button. This can cause accidental submissions when the button was meant to open help, reveal content, or run another action. Choose an explicit type for each button.

~~~html
<form action="/contact" method="post">
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" required>

  <button type="submit">Send message</button>
  <button type="button">Show help</button>
</form>
~~~

The first button submits the form. The second does nothing by default because it has `type="button"`; a script could add behavior later.

## Submit button text

A button's text tells users what the button will do:

~~~html
<button type="submit">Create account</button>
~~~

Use a specific action such as “Save changes”, “Send message”, or “Continue to payment”. Avoid vague labels such as “Click here”. The text inside a `button` is its visible label.

An `input` can also create a submit button. Its `value` supplies the visible text:

~~~html
<input type="submit" value="Create account">
~~~

For most examples in this guide, `button` is convenient because its label is ordinary text between opening and closing tags.

## Reset buttons

A reset button restores form controls to their initial values from the page markup:

~~~html
<form>
  <label for="nickname">Nickname</label>
  <input id="nickname" name="nickname" value="Guest">

  <button type="reset">Restore original values</button>
</form>
~~~

If the user edits the field and activates the reset button, its value returns to “Guest”. A reset button does not send data to the server.

Reset can erase work unexpectedly, so include one only when resetting the form is a useful and expected action. Use clear text that explains what will happen.

## Buttons without a built-in form action

Use `type="button"` for a button that should not submit or reset its surrounding form:

~~~html
<form>
  <label for="search">Search articles</label>
  <input id="search" name="q" type="search">
  <button type="button">Show search tips</button>
</form>
~~~

The button does not show or hide anything by itself. JavaScript can add that behavior. If a control is meant to navigate to another page, use a link rather than a button. Buttons perform actions; links navigate.

## Form `action` and `method`

A form uses `action` to identify the URL that processes its data, and `method` to choose how the browser sends the request:

~~~html
<form action="/search" method="get">
  <label for="search-query">Search</label>
  <input id="search-query" name="q" type="search">
  <button type="submit">Search</button>
</form>
~~~

When the user submits a GET form, named values are appended to the action URL as query parameters. For example, searching for “HTML forms” can produce a URL like `/search?q=HTML+forms`. GET is useful for searches and other requests that retrieve information without changing server data.

A POST form sends its data in the request body instead of placing the values in the URL:

~~~html
<form action="/account" method="post">
  <label for="display-name">Display name</label>
  <input id="display-name" name="display-name" required>
  <button type="submit">Save profile</button>
</form>
~~~

The server still needs to implement the URL and handle the submitted request. HTML describes the form and its request; it does not create the server-side processing code. POST does not encrypt data by itself. A website uses HTTPS to protect data while it travels between the browser and server.

If `method` is omitted, the default is GET. In beginner pages, writing the method explicitly makes the intended request easier to see.

## Form controls need names to submit values

The `name` attribute identifies a control's value in submitted form data. A label and id help identify a control in the page, while its name is used as the submitted key:

~~~html
<form action="/subscribe" method="post">
  <label for="subscriber-email">Email address</label>
  <input id="subscriber-email" name="email" type="email" required>
  <button type="submit">Subscribe</button>
</form>
~~~

The browser can submit the email under the key `email`. If a field has no `name`, its value is not submitted as a named form field. Keep the label, id, and name roles distinct:

- `label` tells the user what the field is for.
- `id` identifies the element and can connect it to a label.
- `name` identifies its value in form data.

A submit button can also have `name` and `value` attributes. The activated submit button can contribute its name and value to the submission, which can help the server distinguish which submit action was chosen.

~~~html
<button type="submit" name="action" value="save">Save draft</button>
<button type="submit" name="action" value="publish">Publish</button>
~~~

## Different submit buttons can use different actions

A form can have more than one submit button. The `formaction` and `formmethod` attributes on a submit button override the form's `action` and `method` for that button's submission:

~~~html
<form action="/publish" method="post">
  <label for="article-title">Article title</label>
  <input id="article-title" name="title" required>

  <button type="submit">Publish</button>
  <button type="submit" formaction="/draft" formmethod="post">
    Save draft
  </button>
</form>
~~~

The first button submits to `/publish`. The second submits to `/draft`. Both use POST here, but the second button states its method explicitly. These URLs need server-side handlers for the actions to work.

Other submit-button attributes can adjust submission too. For example, `formnovalidate` requests submission without the form's usual built-in validation. Chapter 34 explains form validation and when that attribute may be appropriate.

## Browser validation and submission

When a form is submitted, the browser performs its built-in validation for controls such as those marked `required`. If a required control is empty or an entered value does not meet a constraint, the browser may prevent submission and ask the user to correct it. The next chapter covers these validation features in detail.

A form submission can be started by activating a submit button. Some forms can also be submitted by pressing Enter while editing a field. Make the intended submit action clear and avoid multiple unlabeled or ambiguous submit buttons.

## A complete form example

~~~html
<form action="/contact" method="post">
  <p>
    <label for="contact-name">Your name</label>
    <input id="contact-name" name="name" autocomplete="name" required>
  </p>

  <p>
    <label for="contact-email">Email address</label>
    <input id="contact-email" name="email" type="email" autocomplete="email" required>
  </p>

  <p>
    <label for="contact-message">Message</label>
    <textarea id="contact-message" name="message" rows="5" required></textarea>
  </p>

  <button type="submit">Send message</button>
  <button type="reset">Clear entered details</button>
</form>
~~~

The form names its processing URL and request method. Each control has a label and a name. The submit button sends the form, and the reset button returns controls to their initial values.

## Common mistakes

### Leaving off `type` on a non-submit button

~~~html
<form>
  <button>Show help</button>
</form>
~~~

This button normally submits the form. If it is meant to perform a script-driven action, write `type="button"`:

~~~html
<button type="button">Show help</button>
~~~

### Using reset as a general clear button

A reset button restores the form's original values; it does not necessarily make every field empty. Use it only when restoring the original state is the intended action.

### Expecting a button to create server behavior

A submit button starts form submission, but the destination needs a server-side handler. A `type="button"` has no built-in action. HTML alone does not implement custom application behavior.

### Leaving `name` off a field whose value should be sent

The browser needs a name to include a field as a named value in the normal form submission. Add a meaningful `name` to each control the server needs.

### Treating POST as encrypted

POST places form values in the request body, but does not encrypt them. Use HTTPS for transport protection and handle data safely on the server.

### Making two submit buttons look identical

If buttons perform different actions, give them distinct text, such as “Save draft” and “Publish”. The button text should match the action that will occur.

## Try it yourself

1. Create a search form that uses GET and includes a named search field.
2. Create a contact form that uses POST and includes name, email, and message controls.
3. Add a submit button and a separate `type="button"` action button. Confirm that the latter does not submit by itself.
4. Add a reset button and test how it restores the initial values.
5. Create two submit buttons with different `formaction` values and write down which URL each uses.
6. Remove the `name` from one field and inspect what information is missing from the form request.
7. Give each button concise text that explains its action.

## Key points

- Use `type="submit"` to submit a form, `type="reset"` to restore initial values, and `type="button"` for a button with no default form action.
- Set button types explicitly, especially for buttons inside forms that are not meant to submit.
- `action` identifies the form-processing URL; `method` describes how the request is sent.
- GET appends form data to the URL. POST sends data in the request body, but HTTPS is needed to protect data in transit.
- Controls need a `name` to contribute named values to a standard form submission.
- A submit button can override a form's action or method with `formaction` and `formmethod`.
- HTML starts the request, but a server must implement its processing URL.
- Make button text specific and use reset only when restoring initial values is expected.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [32 - Textarea, select, option, and datalist](32-textarea-select-and-datalist.md) | [Q&A](../qnas/33-buttons-and-form-actions.md) | [Example](../examples/33-buttons-and-form-actions.md) | [34 - Built-in form validation](34-form-validation.md) |
