# Example 34 - Built-in form validation

## Question

Create a community garden workshop registration form that gives clear instructions, checks common input mistakes in the browser, and lets someone save an incomplete draft.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Community Garden Workshop Registration</title>
  </head>
  <body>
    <main>
      <h1>Register for a garden workshop</h1>
      <p>Complete the fields marked required. The access code has two uppercase letters followed by four digits.</p>

      <form action="/workshops/register" method="post">
        <p>
          <label for="full-name">Full name (required)</label>
          <input
            id="full-name"
            name="full_name"
            type="text"
            autocomplete="name"
            minlength="2"
            maxlength="60"
            required>
        </p>

        <p>
          <label for="email">Email address (required)</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required>
        </p>

        <p>
          <label for="website">Website (optional)</label>
          <input
            id="website"
            name="website"
            type="url"
            autocomplete="url">
        </p>

        <p>
          <label for="seats">Number of seats, from 1 to 4 (required)</label>
          <input
            id="seats"
            name="seats"
            type="number"
            min="1"
            max="4"
            step="1"
            value="1"
            required>
        </p>

        <p>
          <label for="access-code">Workshop access code (required)</label>
          <input
            id="access-code"
            name="access_code"
            type="text"
            inputmode="text"
            pattern="[A-Z]{2}[0-9]{4}"
            title="Enter two uppercase letters followed by four digits"
            aria-describedby="access-code-help"
            required>
          <small id="access-code-help">Format: two uppercase letters and four digits, for example AB1234.</small>
        </p>

        <p>
          <label for="note">Accessibility request or other note (optional, up to 300 characters)</label>
          <textarea
            id="note"
            name="note"
            rows="4"
            cols="40"
            maxlength="300"></textarea>
        </p>

        <button
          type="submit"
          name="submission"
          value="registration">
          Submit registration
        </button>

        <button
          type="submit"
          name="submission"
          value="draft"
          formaction="/workshops/draft"
          formmethod="post"
          formnovalidate>
          Save an incomplete draft
        </button>
      </form>
    </main>
  </body>
</html>
~~~

## Expected output

The page displays a workshop registration heading, instructions, six labeled fields, and two buttons.

If someone submits the registration with a required field missing, an invalid email or website format, a seat count outside 1 to 4, or an access code that does not match the stated format, the browser can stop the submission and show a validation message. The wording and appearance of that message depend on the browser and device.

If the fields pass the browser checks, the browser sends the form to the example registration address. That address needs a server to process the registration. The draft button sends the form to a different example address and skips the browser's interactive checks, so incomplete values can be submitted as a draft.

## Explanation

- The visible instructions and labels tell people which fields are required and how to format the access code.
- The full name is required and must contain between 2 and 60 characters.
- The email field uses type="email" for a basic email format check. This does not confirm that the address exists or belongs to the person.
- The optional website uses type="url" for a basic URL format check.
- The seats field is required. Its min, max, and step attributes allow whole numbers from 1 through 4.
- The access code is required. Its pattern accepts two uppercase letters followed by four digits. The nearby text explains the pattern, and the title gives an additional hint.
- The note is optional and cannot exceed 300 characters.
- Submit registration uses the form's action and method. Save an incomplete draft overrides the destination with formaction and uses formmethod. Its formnovalidate attribute skips the browser's interactive checks for that submission only.
- The form does not have novalidate, so normal registration still uses browser validation.
- Browser checks are for immediate feedback. A server must validate every received value independently.

### Alternative: turn off browser checks for every form submission

Add novalidate to the form element when the form's submissions should all bypass interactive browser validation:

~~~html
<form action="/workshops/register" method="post" novalidate>
~~~

With novalidate present, neither submit button uses the browser's interactive validation. The server still needs to validate the submitted data.

## How to try it

Copy the HTML code block using its copy button and save it as garden-workshop.html. Open the file in a browser, then try submitting with a blank name, an incorrectly formatted email, a seat count outside the allowed range, and an access code such as ab1234. Notice how the browser responds.

The example addresses do not have server handlers in this file, so a valid registration or draft will not be saved. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 34 - Built-in form validation](../lessons/34-form-validation.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [33 - Buttons and form actions](33-buttons-and-form-actions.md) | [Lesson](../lessons/34-form-validation.md) | [Q&A](../qnas/34-form-validation.md) | [35 - Form submission: name, method, action, and enctype](35-form-submission.md) |
