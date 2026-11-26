# Example 30 - Labels and accessible form controls

## Question

Create a garden club contact form with clearly labeled text fields, a select menu, a text area, a radio group, and a checkbox. Use explicit label associations for the fields and radio choices, plus a wrapping label for the checkbox.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact the Garden Club</title>
  </head>
  <body>
    <main>
      <h1>Contact the Garden Club</h1>
      <p>Send a question about a workshop, membership, or garden resource.</p>

      <form action="/contact" method="post">
        <p>
          <label for="visitor-name">Your name</label>
          <input
            id="visitor-name"
            name="name"
            type="text"
            autocomplete="name"
            required>
        </p>

        <p>
          <label for="visitor-email">Email address</label>
          <input
            id="visitor-email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            required>
        </p>

        <p>
          <label for="contact-reason">Reason for contacting us</label>
          <select id="contact-reason" name="reason" required>
            <option value="" selected disabled>Choose a reason</option>
            <option value="workshop">Workshop question</option>
            <option value="membership">Membership</option>
            <option value="resources">Garden resources</option>
          </select>
        </p>

        <p>
          <label for="visitor-message">Message</label>
          <textarea
            id="visitor-message"
            name="message"
            rows="6"
            cols="40"
            required></textarea>
        </p>

        <p>How should we respond?</p>
        <p>
          <input
            id="response-email"
            name="response-method"
            type="radio"
            value="email">
          <label for="response-email">Email</label>
        </p>
        <p>
          <input
            id="response-phone"
            name="response-method"
            type="radio"
            value="phone">
          <label for="response-phone">Phone</label>
        </p>

        <p>
          <label>
            <input
              id="send-copy"
              name="send-copy"
              type="checkbox"
              value="yes">
            Send me a copy of my message
          </label>
        </p>

        <button type="submit">Send message</button>
      </form>
    </main>
  </body>
</html>
~~~

## Expected output

The page shows a contact form with name, email, reason, message, response method, and copy-request controls. Each control has visible text that identifies its purpose. The email field also shows a short example hint.

Selecting a field's label focuses its control. Selecting the checkbox label toggles the checkbox. The submit button is named by its own text.

## Explanation

- Each explicit label uses a for value that exactly matches the id of one control. Every id is unique in the page.
- The labels for name, email, reason, and message use the same explicit pattern for input, select, and textarea controls.
- Each radio option has its own id and label. The radio controls share the name response-method so the browser treats them as one choice group.
- The checkbox is inside its label, so the text and control form an implicit label association. The whole label can be clicked or tapped.
- The name attribute identifies submitted data. The id connects a label to a control. The visible label tells the user what the control is for.
- The placeholder is only a brief example. It does not replace the persistent Email address label.
- The button gets its accessible name from the text Send message, so it does not need a separate label element.
- Related radio controls can be grouped more explicitly with fieldset and legend. The next chapter explains that structure.
- The /contact action is an example route. A server or service must handle the submission and return a response.

## How to try it

Copy the HTML code block using its copy button and save it as garden-club-contact.html. Open the file in a browser, then click each label and check that it focuses or toggles the matching control. The contact route needs a server or service before the form can submit successfully.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 30 - Labels and accessible form controls](../lessons/30-labels-and-form-controls.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [29 - Input types and input attributes](29-input-types-and-attributes.md) | [Lesson](../lessons/30-labels-and-form-controls.md) | [Q&A](../qnas/30-labels-and-form-controls.md) | [31 - Fieldset and legend](31-fieldset-and-legend.md) |
