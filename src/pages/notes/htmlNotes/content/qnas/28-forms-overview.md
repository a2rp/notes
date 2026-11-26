# 28 - Forms: Questions and Answers

Practice questions for [Lesson 28 - Forms: the form element and submission flow](../lessons/28-forms-overview.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is the main purpose of the form element?

- A. To group controls that collect and submit related information.
- B. To create a table of values.
- C. To add styles to a page.
- D. To save information on the user's computer automatically.

**Answer: A.** A form groups controls that work together for a task such as searching or sending feedback.

### 2. What does a control's name identify?

- A. Its visual position on the page.
- B. The key used to identify its value in submitted data.
- C. The page title.
- D. The browser window.

**Answer: B.** A name such as q identifies the value entered in that control when the form is submitted.

### 3. What does the action attribute specify?

- A. The URL that receives the form submission.
- B. The text shown on the submit button.
- C. The input type.
- D. The form's visual layout.

**Answer: A.** The action value identifies the destination that should process the request.

### 4. What does the method attribute describe?

- A. How the request is sent.
- B. Which control is focused.
- C. How a label is displayed.
- D. The number of rows in a form.

**Answer: A.** The method specifies how the browser sends the form request, commonly with GET or POST.

### 5. Where does a GET form submission usually place the submitted values?

- A. In the request URL.
- B. In the button label.
- C. In the page title.
- D. In the browser's CSS.

**Answer: A.** GET values are commonly appended to the URL as query parameters.

### 6. Where does a POST form submission send its data?

- A. In the request body.
- B. In the page heading.
- C. In an HTML comment.
- D. In the URL fragment after #.

**Answer: A.** POST sends the data in the request body. POST does not encrypt the data.

### 7. What does a button with type="submit" do inside a form?

- A. Starts the form submission process.
- B. Clears all the form fields.
- C. Adds a new input field.
- D. Sends data without using the form.

**Answer: A.** Activating a submit button asks the browser to submit the form.

### 8. What is needed to process a form submission on a website?

- A. A destination route or service that handles the request.
- B. A table after the form.
- C. A CSS file.
- D. A second nested form.

**Answer: A.** HTML can create and submit the form, but a server or service must handle the request and return a response.

### 9. Which statement about JavaScript and forms is correct?

- A. Every form requires JavaScript to submit.
- B. Standard HTML forms can submit without JavaScript.
- C. JavaScript creates the form element.
- D. A form cannot contain a submit button without JavaScript.

**Answer: B.** The browser provides native form submission. JavaScript can enhance the experience but is not required for the basic flow.

### 10. Why should forms not be nested?

- A. Nested forms create invalid, confusing form structure.
- B. Forms cannot contain input elements.
- C. A form can only contain text.
- D. Nested forms always use POST.

**Answer: A.** Use separate, non-nested forms for separate tasks.

## True or false

### 1. A form can group several controls that belong to the same task.

**Answer: True.** For example, a feedback form can group a name field and a message field.

### 2. A control's value can be identified in submitted data even when it has no name.

**Answer: False.** A control that should contribute a value needs a name. Controls also follow submission rules based on their type and state.

### 3. The action attribute names the submission destination.

**Answer: True.** It points to the URL that receives the request.

### 4. GET form values are commonly visible in the URL.

**Answer: True.** They are often encoded as query parameters, so avoid GET for values that should not appear in the URL.

### 5. POST automatically encrypts form data.

**Answer: False.** POST places data in the request body. HTTPS and proper server handling are needed to protect data in transit and during processing.

### 6. HTML can submit a form without a JavaScript event handler.

**Answer: True.** Native browser form behavior supports submission without client-side scripting.

### 7. A submit button needs a JavaScript function to submit its form.

**Answer: False.** A button with type="submit" starts the browser's normal form submission process.

### 8. A form on a static page automatically stores submitted values for later.

**Answer: False.** A server or other configured service must process and store data when that is required.

## Short-answer questions

### 1. What does the form element group together?

**Answer:** It groups form controls that belong to one related task, such as searching or sending feedback.

### 2. What is a name-value pair?

**Answer:** It is a control's name together with its current value. For example, a control with name="q" and value "birds" contributes the pair q=birds when it is included in the submission.

### 3. What is the difference between action and method?

**Answer:** action identifies where the request is sent. method describes how the browser sends it.

### 4. What is the usual difference between GET and POST?

**Answer:** GET commonly places values in the request URL. POST sends values in the request body. Chapter 35 covers these methods and related submission settings in more detail.

### 5. Why does a working form need a server or service?

**Answer:** HTML can collect and submit the controls, but a destination must receive the request, process the data, and return a response if the submission is meant to do something.

### 6. What does a submit button do?

**Answer:** It starts the browser's form submission flow. The browser applies relevant validity checks, gathers eligible values, and sends a request to the configured destination.

### 7. Does POST alone protect sensitive form data?

**Answer:** No. POST does not encrypt the request. Use HTTPS and appropriate server-side safeguards.

### 8. What is one benefit of native HTML form submission?

**Answer:** The browser can submit the form using its built-in behavior without requiring JavaScript.

## Practical questions

### 1. Write a basic search form with a labeled search field named q and a submit button.

**Answer:**

~~~html
<form action="/search" method="get">
  <label for="site-search">Search</label>
  <input id="site-search" type="search" name="q">
  <button type="submit">Search</button>
</form>
~~~

The label identifies the control, q is the submitted data key, and the button starts submission.

### 2. What name-value pair is created if the search field contains "birds"?

~~~html
<input type="search" name="q" value="birds">
~~~

**Answer:** The pair is q=birds. With GET, it can be included in the request URL as a query parameter.

### 3. Fix this form so the message control has a name and the button submits the form.

~~~html
<form action="/feedback" method="post">
  <label for="message">Message</label>
  <textarea id="message"></textarea>
  <button type="button">Send</button>
</form>
~~~

**Answer:**

~~~html
<form action="/feedback" method="post">
  <label for="message">Message</label>
  <textarea id="message" name="message"></textarea>
  <button type="submit">Send</button>
</form>
~~~

The name allows the control's value to be identified in the submission. The submit button starts the form submission process.

### 4. Choose GET or POST for a shareable site search, and explain why.

**Answer:** GET is a common choice for a search because the query appears in the URL and can be bookmarked or shared. The search URL still needs a route that can handle the request.

### 5. Choose GET or POST for sending feedback that should not appear in the URL.

**Answer:** POST is generally used so the submitted values go in the request body instead of the URL. The site still needs HTTPS and a server that handles the request. POST alone does not secure the information.

### 6. Explain what happens after this form is submitted.

~~~html
<form action="/search" method="get">
  <label for="q">Search</label>
  <input id="q" name="q">
  <button type="submit">Search</button>
</form>
~~~

**Answer:** The browser checks applicable validity constraints, gathers the eligible named values, and sends a GET request to /search. If the user entered birds, the request can include q=birds in its URL. The /search destination must process it and return a response.

### 7. Identify the problem with this markup and correct it.

~~~html
<form action="/search">
  <form action="/feedback">
    <input name="message">
  </form>
</form>
~~~

**Answer:** Forms must not be nested. Make them separate forms for separate tasks:

~~~html
<form action="/search" method="get">
  <label for="query">Search</label>
  <input id="query" name="q">
  <button type="submit">Search</button>
</form>

<form action="/feedback" method="post">
  <label for="message">Feedback</label>
  <textarea id="message" name="message"></textarea>
  <button type="submit">Send feedback</button>
</form>
~~~

Each form now represents one task, with its own destination and controls.

### 8. A form is visible, but submitting it does not save anything. What part may be missing?

**Answer:** The form may not have a working destination route or service. HTML creates the interface and sends the request, but a server or other endpoint must process and save the data.

## Related lesson

- [Lesson 28 - Forms: the form element and submission flow](../lessons/28-forms-overview.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [27 - Table headings, captions, and accessible structure](27-accessible-tables.md) | [Lesson](../lessons/28-forms-overview.md) | [Example](../examples/28-forms-overview.md) | [29 - Input types and input attributes](29-input-types-and-attributes.md) |
