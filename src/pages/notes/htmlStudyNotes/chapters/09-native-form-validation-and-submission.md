# 09. Native form validation and submission

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Forms, controls, and labels](./08-forms-controls-and-labels.md) | [Notes index](../README.md) | [Next: Semantic page structure and landmarks](./10-semantic-page-structure-and-landmarks.md) |

## Let the browser check common constraints

HTML validation attributes describe requirements directly on controls. The browser checks many common constraints before submitting the form.

~~~html
<form id="newsletter-form" action="/newsletter" method="post">
  <label for="newsletter-email">Email address</label>
  <input
    id="newsletter-email"
    name="email"
    type="email"
    autocomplete="email"
    required
  />
  <button type="button" id="check-fields">Check fields</button>
  <button type="submit">Subscribe</button>
</form>
~~~

required prevents an empty value. type="email" checks that the value matches a basic email address format. Other useful constraints include minlength, maxlength, min, max, step, and pattern.

Native validation checks input format and constraints. It cannot prove that a person owns an email address or that submitted data is acceptable to the application.

## Choose GET or POST for the form

GET appends submitted values to the URL. It is suitable for searches or filters that can be bookmarked or shared. POST sends form data in the request body and is common for changes such as creating an account.

~~~html
<form action="/search" method="get">
  <label for="site-search">Search this site</label>
  <input id="site-search" name="q" type="search" />
  <button type="submit">Search</button>
</form>
~~~

Do not place passwords or other sensitive data in a GET URL. POST alone does not encrypt data; use HTTPS and validate submitted data on the server.

## Use browser validation intentionally

The browser blocks a normal submission when a required control is empty or a constraint fails. It also provides the control validity state to JavaScript. Use reportValidity when a separate user action should ask the browser to show its validation messages.

~~~js
const form = document.querySelector("#newsletter-form");
const checkButton = document.querySelector("#check-fields");

checkButton.addEventListener("click", () => {
  form.reportValidity();
});
~~~

Normal submission already triggers constraint validation, and the submit event does not fire when a control is invalid. The button above demonstrates a separate, deliberate validation check; it does not replace server-side validation.

The novalidate attribute disables the browser's automatic submit-time validation. Use it only when the page provides a complete alternative that explains errors and preserves accessibility.

## Validate on the server too

Client-side validation improves feedback, but requests can be sent without using the page controls. Validate every submitted value on the server before storing it or acting on it.

For custom errors, connect the message to its field, explain how to fix the problem, and keep the entered value when it is safe to do so.

## Practice questions

1. What does required check?
2. What does type="email" check?
3. Name two other native constraint attributes.
4. When is GET useful for a form?
5. Why should sensitive values not be placed in a GET URL?
6. Does POST alone encrypt form data?
7. Why is server-side validation still necessary?
8. When is novalidate appropriate?

## Main references

- [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation)
- [The form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)
- [Input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)
