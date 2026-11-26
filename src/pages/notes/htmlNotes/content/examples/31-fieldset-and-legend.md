# Example 31 - Fieldset and legend

## Question

Create a workshop registration form that groups contact fields, a one-choice workshop selection, independent topic choices, and an unavailable membership section. Give each group a legend and keep individual controls labeled.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Workshop Registration</title>
  </head>
  <body>
    <main>
      <h1>Garden Workshop Registration</h1>
      <p>Choose a session and tell us how to contact you.</p>

      <form action="/workshop-registration" method="post">
        <fieldset>
          <legend>Contact details</legend>

          <p>
            <label for="attendee-name">Your name</label>
            <input
              id="attendee-name"
              name="name"
              autocomplete="name"
              required>
          </p>

          <p>
            <label for="attendee-email">Email address</label>
            <input
              id="attendee-email"
              name="email"
              type="email"
              autocomplete="email"
              required>
          </p>
        </fieldset>

        <fieldset>
          <legend>Choose one workshop session</legend>

          <p>
            <input
              id="session-soil"
              name="session"
              type="radio"
              value="soil"
              checked>
            <label for="session-soil">Healthy soil, 10:00 a.m.</label>
          </p>

          <p>
            <input
              id="session-seeds"
              name="session"
              type="radio"
              value="seeds">
            <label for="session-seeds">Starting from seeds, 1:00 p.m.</label>
          </p>
        </fieldset>

        <fieldset>
          <legend>Choose any topics of interest</legend>

          <p>
            <input
              id="topic-herbs"
              name="topic"
              type="checkbox"
              value="herbs">
            <label for="topic-herbs">Growing herbs</label>
          </p>

          <p>
            <input
              id="topic-compost"
              name="topic"
              type="checkbox"
              value="compost">
            <label for="topic-compost">Making compost</label>
          </p>

          <p>
            <input
              id="topic-water"
              name="topic"
              type="checkbox"
              value="water">
            <label for="topic-water">Saving water</label>
          </p>
        </fieldset>

        <fieldset disabled>
          <legend>Membership details are unavailable</legend>

          <p>
            <label for="member-number">Member number</label>
            <input
              id="member-number"
              name="member-number"
              value="GARDEN-204">
          </p>

          <p>
            <label for="member-email">Membership email</label>
            <input
              id="member-email"
              name="member-email"
              type="email"
              value="member@example.com">
          </p>
        </fieldset>

        <button type="submit">Register for the workshop</button>
      </form>
    </main>
  </body>
</html>
~~~

## Expected output

The browser displays four grouped sections with legends and a registration button. The contact fields are editable, one workshop radio option can be selected, and any number of topic checkboxes can be checked. The membership fields appear disabled and cannot be focused or changed. The browser's default fieldset border and spacing may vary.

## Explanation

- A fieldset groups controls that share a purpose. Its first child, the legend, names that group.
- The Contact details legend gives context to the name and email fields, while each field still has its own label.
- Both workshop radio buttons share the name session, so selecting one deselects the other. Their individual labels identify the two options.
- The topic checkboxes share the name topic but have different values. Each choice is independent, so a person can select several.
- The disabled attribute on the membership fieldset disables its descendant controls as a group. Their values are not included in the form submission.
- The Register button is outside the fieldsets because it submits the whole form rather than belonging to one of the groups.
- The /workshop-registration action is an example route. A server or service must handle the submission.

## How to try it

Copy the HTML code block using its copy button and save it as garden-workshop-registration.html. Open it in a browser to compare how the radio and checkbox groups behave. Remove disabled from the membership fieldset to make its controls available. The registration route needs a server or service before a submission can be processed.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 31 - Fieldset and legend](../lessons/31-fieldset-and-legend.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [30 - Labels and accessible form controls](30-labels-and-form-controls.md) | [Lesson](../lessons/31-fieldset-and-legend.md) | [Q&A](../qnas/31-fieldset-and-legend.md) | [32 - Textarea, select, option, and datalist](32-textarea-select-and-datalist.md) |
