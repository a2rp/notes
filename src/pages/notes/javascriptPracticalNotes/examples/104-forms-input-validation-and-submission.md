# 104 - Forms, input validation, and submission: Example

## Goal

Build a registration form that uses native browser constraints, adds a custom password-match rule, and reads named values with **FormData**. The page handles submission locally and clearly says that it does not send or save data.

## Complete example

Save this as an HTML file and open it in a browser. The complete source is displayed here in Markdown.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Form validation lab</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
    }

    main {
      width: min(100%, 42rem);
      margin-inline: auto;
    }

    form {
      display: grid;
      gap: 1rem;
      margin-block: 1.5rem;
      padding: 1.25rem;
      border: 1px solid currentColor;
      border-radius: 0.75rem;
    }

    label {
      display: grid;
      gap: 0.4rem;
    }

    input,
    button {
      min-height: 2.6rem;
      padding: 0.55rem 0.75rem;
      font: inherit;
    }

    input[type="checkbox"] {
      min-height: auto;
      width: 1.1rem;
      height: 1.1rem;
    }

    .choice {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    fieldset {
      display: grid;
      gap: 0.65rem;
      padding: 1rem;
      border: 1px solid currentColor;
      border-radius: 0.5rem;
    }

    legend {
      padding-inline: 0.35rem;
    }

    .hint {
      margin: 0;
      font-size: 0.9rem;
    }

    #status {
      min-height: 1.5em;
      overflow-wrap: anywhere;
    }

    button {
      justify-self: start;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <main>
    <h1>Registration form</h1>
    <p>Try submitting empty fields, an invalid email, or passwords that do not match.</p>

    <form id="registration-form" action="/register" method="post">
      <label for="full-name">
        Full name
        <input
          id="full-name"
          name="fullName"
          type="text"
          autocomplete="name"
          minlength="2"
          required
        >
      </label>

      <label for="email">
        Email address
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
        >
      </label>

      <label for="password">
        Password
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="new-password"
          minlength="8"
          aria-describedby="password-hint"
          required
        >
        <span class="hint" id="password-hint">Use at least 8 characters.</span>
      </label>

      <label for="confirm-password">
        Confirm password
        <input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autocomplete="new-password"
          aria-describedby="confirmation-hint"
          required
        >
        <span class="hint" id="confirmation-hint">Enter the same password again.</span>
      </label>

      <fieldset>
        <legend>Topics you are interested in</legend>
        <label class="choice">
          <input type="checkbox" name="interest" value="javascript">
          JavaScript
        </label>
        <label class="choice">
          <input type="checkbox" name="interest" value="accessibility">
          Accessibility
        </label>
        <label class="choice">
          <input type="checkbox" name="interest" value="web-platform">
          Web platform
        </label>
      </fieldset>

      <label class="choice" for="terms">
        <input id="terms" name="terms" type="checkbox" value="accepted" required>
        I agree to the terms for this demonstration.
      </label>

      <button type="submit">Review registration</button>
    </form>

    <p id="status" role="status" aria-live="polite">No registration has been submitted.</p>
  </main>

  <script>
    const form = document.querySelector("#registration-form");
    const passwordInput = document.querySelector("#password");
    const confirmationInput = document.querySelector("#confirm-password");
    const status = document.querySelector("#status");

    function validatePasswordMatch() {
      const hasConfirmation = confirmationInput.value !== "";
      const passwordsMatch = passwordInput.value === confirmationInput.value;

      confirmationInput.setCustomValidity(
        hasConfirmation && !passwordsMatch
          ? "The passwords do not match."
          : ""
      );
    }

    form.addEventListener("input", validatePasswordMatch);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      validatePasswordMatch();

      if (!form.reportValidity()) {
        status.textContent = "Please correct the highlighted form fields.";
        return;
      }

      const data = new FormData(form);
      const name = data.get("fullName");
      const interests = data.getAll("interest");
      const interestSummary = interests.length > 0
        ? interests.join(", ")
        : "no topics selected";

      status.textContent =
        "The form is valid for " + name + ". Topics: " + interestSummary +
        ". No network request was sent and no data was saved.";
    });
  </script>
</body>
</html>
~~~

## Expected output

- The page shows a registration form with name, email, password, password confirmation, topic checkboxes, and a required agreement checkbox.
- Submitting with an empty required field or an invalid email causes the browser to show its native validation feedback.
- Entering different non-empty passwords makes the confirmation field invalid with a custom message. Matching them clears that custom error.
- After all constraints pass, the status area displays the name and the selected topics.
- The status explicitly says no network request was sent and no data was saved. This is a local demonstration, not a working registration service.

## How it works

1. Each control has a **label** associated by matching **for** and **id** values. Each value that should be represented in form data has a **name**.
2. The browser checks **required**, **type="email"**, and **minlength** before it allows the normal submit event to run.
3. The form's **input** event bubbles from its controls. One listener recalculates whether the password fields match.
4. **setCustomValidity()** puts a message on the confirmation input when both values exist and differ. An empty message clears the custom error.
5. The submit handler calls **preventDefault()** because this demonstration handles the result locally instead of navigating to the form's action URL.
6. The handler calls **reportValidity()** again after recalculating the custom rule. If everything is valid, it builds **FormData** from the form.
7. **get("fullName")** reads the name and **getAll("interest")** reads all selected checkbox values sharing that name.
8. The result is assigned with **textContent**, and the live status region announces the update. Password values are never displayed.

## Try it yourself

1. Submit the empty form and note that the browser prevents the submit handler from continuing until native constraints pass.
2. Enter an invalid email address and observe the browser feedback.
3. Enter two different passwords, then make them match. Notice the custom error clears as the values change.
4. Select two topics and compare the displayed result with selecting none.
5. Remove **name="email"** and observe how that value is absent from **FormData** even though the input still has an id and label.
6. Remove **required** from the agreement checkbox and compare submission behavior.
7. Replace the local confirmation with a real request only after adding a server endpoint that validates the received data.

## Key points

- Native constraints provide browser feedback with little JavaScript.
- A custom validity error must be cleared when its condition is fixed.
- Handle submission on the form so keyboard and button submission use the same code path.
- Use **FormData** and control **name** values to read submitted data.
- Use **getAll()** for repeated names such as checkbox groups.
- A local success message does not mean the form was sent or saved.
- Validate and authorize all important data on the server.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [103 - Event delegation and reusable handlers](103-event-delegation-and-reusable-handlers.md) | [Open lesson](../lessons/104-forms-input-validation-and-submission.md) | [Open Q&A](../qnas/104-forms-input-validation-and-submission.md) | [105 - Fetch API: requests, responses, and headers](../lessons/105-fetch-api-requests-responses-and-headers.md) |