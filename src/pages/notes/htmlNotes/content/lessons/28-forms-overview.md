# 28 - Forms: the form element and submission flow

An HTML form gives people a way to enter or choose information and submit it. The form element groups related controls, and the browser provides a built-in process for sending the submitted values to a destination.

## What you will learn

- What the form element does.
- How controls belong to a form.
- How names and values become submitted data.
- What happens when a user submits a form.
- How action and method guide a form submission.
- Why a working form needs a destination that can process its request.

## What is an HTML form?

A form is a section of a page containing interactive controls. People can type text, select options, check boxes, and submit the information.

The form element groups controls that work together:

~~~html
<form>
  <!-- Form controls go here. -->
</form>
~~~

Common form controls include input, button, select, and textarea. Later chapters cover each control type, how to label controls, how to group them, and how browser validation works.

Use one form for one related task, such as searching, sending feedback, or signing up. Do not nest one form inside another form.

## Give controls a name and value

A control's name identifies its data when the browser submits the form. Its current value is the information entered or selected by the user.

~~~html
<form>
  <label for="search-query">Search</label>
  <input id="search-query" name="q" value="birds">
  <button type="submit">Search</button>
</form>
~~~

Here, q is the control name and birds is its value. When this control is included in a submission, the name and value form a pair, similar to q=birds.

This is only an introduction to a text control and its label. Later chapters explain input types and form labels in detail.

Not every control contributes data to every submission. The browser follows rules for each control type. As a general starting point, form controls that take part in submission need a name, and disabled controls are not submitted.

## Set the destination and method

The form action attribute names the URL that receives the submission. The method attribute describes how the browser sends the request.

~~~html
<form action="/search" method="get">
  <label for="site-search">Search this site</label>
  <input id="site-search" type="search" name="q">
  <button type="submit">Search</button>
</form>
~~~

In this example, /search is a site route that must exist and know how to process the search. HTML creates the form interface and submits the request. A server or other destination must handle it and return a response.

The default form method is get. A GET submission places named values in the URL, often after a question mark. If the user enters birds, a request could go to /search?q=birds. GET is commonly used for searches because the query can be bookmarked or shared.

The post method sends the form data in the request body instead of appending it to the URL. It is used for many submissions that change or create data. POST by itself does not encrypt or protect information. Secure transmission depends on HTTPS and proper server handling.

This chapter introduces these settings. Chapter 35 explains form submission names, methods, actions, and encoding in greater detail.

## Follow the submission flow

A standard browser form submission usually follows these steps:

1. The user enters or selects information in form controls.
2. The user submits the form with a submit button. In many browsers, pressing Enter in a text field can also submit it.
3. The browser runs applicable built-in validity checks. A later chapter explains those checks.
4. The browser gathers the values of the controls that participate in the submission.
5. The browser sends a request to the configured destination using the selected method.
6. The destination processes the request and returns a response for the browser to display.

HTML forms provide this submission process without JavaScript. JavaScript can enhance a form, but it does not replace the need for a destination when submitted data must be processed or saved.

## A complete introductory example

~~~html
<form action="/feedback" method="post">
  <p>
    <label for="visitor-name">Your name</label>
    <input id="visitor-name" name="name">
  </p>

  <p>
    <label for="feedback-message">Your feedback</label>
    <textarea id="feedback-message" name="message"></textarea>
  </p>

  <button type="submit">Send feedback</button>
</form>
~~~

The form groups a name field and a feedback field into one task. Each field has a name so the destination can identify its value. The submit button starts the normal form submission process.

The example uses /feedback as a placeholder route. If the website has no server or service at that route, there is nothing there to process the submitted values. A form can be visible and interactive without being connected to a working destination.

## Common mistakes

- Using form elements without wrapping controls that belong to the same task.
- Nesting one form inside another.
- Forgetting a name for a control whose value should be submitted.
- Expecting an HTML form to store or process information by itself.
- Using an action URL that has no handler on the site.
- Expecting a button with type="button" to submit the form.
- Treating GET and POST as interchangeable.
- Assuming POST encrypts or protects submitted data.
- Using GET for information that should not appear in the URL.
- Assuming JavaScript is required for every form submission.

## Try it yourself

1. Create a search form with one labeled search control and a submit button.
2. Give the control the name q and describe what its name and value mean.
3. Add an action that represents a search route on a site.
4. Set the method to get and predict how a search term appears in the request URL.
5. Create a feedback form with a name control, a message control, and a submit button.
6. Explain what the browser does after the user submits a form.
7. Identify which part of the example must be provided by a server for the feedback to be processed.
8. Explain why post alone does not make private information secure.

## Key points

- The form element groups controls for one related task.
- A control name identifies its submitted value.
- The action attribute gives the destination URL, and method specifies how the request is sent.
- GET places form values in the URL. POST sends them in the request body.
- The browser can submit a form without JavaScript.
- A server or service must process a submission that needs a result or saved data.
- POST is not encryption. Use HTTPS and appropriate server handling for protection.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [27 - Table headings, captions, and accessible structure](27-accessible-tables.md) | [Q&A](../qnas/28-forms-overview.md) | [Example](../examples/28-forms-overview.md) | [29 - Input types and input attributes](29-input-types-and-attributes.md) |
