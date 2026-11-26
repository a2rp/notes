# Example 41 - ARIA in HTML: when and how to use it

## Question

Create a garden workshop registration page that uses native HTML first, then uses ARIA only where it adds a useful name, description, or state. Include a current-page link, a described form error, and a labeled icon-only search button.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Workshop Registration - City Garden</title>
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>

    <header>
      <a href="/">City Garden</a>
      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="/workshops/register" aria-current="page">Workshop registration</a></li>
          <li><a href="/plants">Plants</a></li>
          <li><a href="/about">About City Garden</a></li>
        </ul>
      </nav>

      <form action="/search" method="get">
        <label for="site-search">Search garden guides</label>
        <input id="site-search" name="q" type="search">
        <button type="submit" aria-label="Search">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
            <path d="M10 10l4 4" fill="none" stroke="currentColor" stroke-width="2"></path>
          </svg>
        </button>
      </form>
    </header>

    <main id="main-content">
      <h1>Register for a garden workshop</h1>
      <p>Complete the form to ask for a place in an upcoming workshop.</p>

      <section aria-labelledby="registration-heading">
        <h2 id="registration-heading">Your registration details</h2>

        <form action="/workshop-registrations" method="post">
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
              value="mira@example.com"
              aria-invalid="true"
              aria-describedby="email-error"
              required>
            <span id="email-error">This email address already has an account.</span>
            <a href="/sign-in">Sign in to your existing account</a>
          </p>

          <p>
            <label for="attendee-password">Create a password</label>
            <input
              id="attendee-password"
              name="password"
              type="password"
              autocomplete="new-password"
              aria-describedby="password-hint"
              required>
            <span id="password-hint">Use at least 12 characters.</span>
          </p>

          <details>
            <summary>Why do you need my email address?</summary>
            <p>We use it to send workshop details and registration updates.</p>
          </details>

          <button type="submit">Continue registration</button>
        </form>
      </section>
    </main>

    <footer>
      <p>City Garden workshops</p>
      <a href="/contact">Contact the workshop team</a>
    </footer>
  </body>
</html>
~~~

## Expected output

The page displays a current Workshop registration link, a labeled search field with an icon-only search button, and a registration form. The email field has a visible error message and a link to sign in. The password field has a visible hint. The email explanation can be opened using the native details control.

The search button's accessible name is Search even though it shows only an icon. The decorative SVG icon is hidden from the accessibility tree so it does not add a second name. Assistive technology can identify the current page link, the invalid email field, and each field's related help or error text.

This example represents a registration form after the server has reported that the email address already belongs to an account. ARIA describes that state and its messages. It does not create the validation, make the form submit, or open the details control.

## Explanation

- The page uses native elements such as nav, main, form, label, button, and details. They already provide their built-in roles and behavior, so the example does not add redundant role attributes.
- The Workshop registration link has aria-current="page" because it points to the page currently being viewed.
- The registration section uses aria-labelledby to take its accessible name from the visible heading with the matching id.
- The email input keeps its visible label. aria-invalid="true" communicates the current error state, and aria-describedby connects it to the visible error message.
- The password input uses aria-describedby to connect its visible password hint. A description adds information after the control's name; it does not replace the label.
- The search button has no visible words, so aria-label supplies its accessible name. The SVG is decorative in this context and uses aria-hidden="true".
- The details and summary elements provide a native disclosure control. No extra aria-expanded state is needed.
- The IDs referenced by aria-labelledby and aria-describedby exist in the document and are unique.
- When the server detects an error, the visible message, aria-invalid state, and field value need to agree. Do not mark a field invalid before checking it.
- ARIA describes information for accessibility APIs. It does not add visual text, keyboard behavior, or application logic.

### Custom disclosure state needs working behavior

If a custom disclosure is necessary, aria-expanded can describe its current state and aria-controls can point to the panel:

~~~html
<button type="button" aria-expanded="false" aria-controls="help-panel">
  Show help
</button>
<div id="help-panel" hidden>
  <p>Enter the email address associated with your account.</p>
</div>
~~~

This snippet describes only the initial collapsed state. Application code must reveal the panel and update aria-expanded when the button is activated, then hide it and update the state again when closed. Use the native details and summary elements when they meet the need.

## How to try it

Copy the HTML code block using its copy button and save it as workshop-registration.html. Review the visible labels and messages alongside their ARIA references. Open the details control and check that the icon-only search button still has a clear accessible name.

The example search, sign-in, contact, and registration paths do not have server handlers in this file. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 41 - ARIA in HTML: when and how to use it](../lessons/41-aria-in-html.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [40 - Accessibility with native HTML](40-accessibility-with-html.md) | [Lesson](../lessons/41-aria-in-html.md) | [Q&A](../qnas/41-aria-in-html.md) | [42 - Language, text direction, and international content](42-language-and-text-direction.md) |
