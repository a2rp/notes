# Example 36 - Autocomplete and autofill

## Question

Create a garden supply shop account form with useful browser autofill hints for account details, shipping and billing addresses, and a one-time verification code. Add editable city suggestions with a datalist.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Create a Garden Supply Shop Account</title>
  </head>
  <body>
    <main>
      <h1>Create your garden shop account</h1>
      <p>Your browser may offer saved details for some fields. You can review or change any value before submitting.</p>

      <form action="/accounts" method="post" autocomplete="on">
        <fieldset>
          <legend>Account details</legend>

          <p>
            <label for="full-name">Full name</label>
            <input
              id="full-name"
              name="name"
              autocomplete="name"
              required>
          </p>

          <p>
            <label for="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required>
          </p>

          <p>
            <label for="username">Username</label>
            <input
              id="username"
              name="username"
              autocomplete="username"
              required>
          </p>

          <p>
            <label for="new-password">Create a password</label>
            <input
              id="new-password"
              name="password"
              type="password"
              autocomplete="new-password"
              required>
          </p>
        </fieldset>

        <fieldset>
          <legend>Shipping address</legend>

          <p>
            <label for="shipping-name">Name for delivery</label>
            <input
              id="shipping-name"
              name="shipping-name"
              autocomplete="section-shipping shipping name"
              required>
          </p>

          <p>
            <label for="shipping-phone">Phone number for delivery</label>
            <input
              id="shipping-phone"
              name="shipping-phone"
              type="tel"
              autocomplete="section-shipping shipping tel">
          </p>

          <p>
            <label for="shipping-street">Street address</label>
            <input
              id="shipping-street"
              name="shipping-street"
              autocomplete="section-shipping shipping address-line1"
              required>
          </p>

          <p>
            <label for="shipping-unit">Apartment, suite, or unit</label>
            <input
              id="shipping-unit"
              name="shipping-unit"
              autocomplete="section-shipping shipping address-line2">
          </p>

          <p>
            <label for="shipping-city">City or town</label>
            <input
              id="shipping-city"
              name="shipping-city"
              autocomplete="section-shipping shipping address-level2"
              list="city-suggestions"
              required>
          </p>

          <p>
            <label for="shipping-region">State, province, or region</label>
            <input
              id="shipping-region"
              name="shipping-region"
              autocomplete="section-shipping shipping address-level1">
          </p>

          <p>
            <label for="shipping-postal">Postal code</label>
            <input
              id="shipping-postal"
              name="shipping-postal-code"
              autocomplete="section-shipping shipping postal-code"
              required>
          </p>

          <p>
            <label for="shipping-country">Country</label>
            <select
              id="shipping-country"
              name="shipping-country"
              autocomplete="section-shipping shipping country-name"
              required>
              <option value="">Choose a country</option>
              <option value="India">India</option>
              <option value="Japan">Japan</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </p>
        </fieldset>

        <fieldset>
          <legend>Billing address</legend>

          <p>
            <label for="billing-name">Name on billing address</label>
            <input
              id="billing-name"
              name="billing-name"
              autocomplete="section-billing billing name"
              required>
          </p>

          <p>
            <label for="billing-street">Street address</label>
            <input
              id="billing-street"
              name="billing-street"
              autocomplete="section-billing billing address-line1"
              required>
          </p>

          <p>
            <label for="billing-city">City or town</label>
            <input
              id="billing-city"
              name="billing-city"
              autocomplete="section-billing billing address-level2"
              list="city-suggestions"
              required>
          </p>

          <p>
            <label for="billing-postal">Postal code</label>
            <input
              id="billing-postal"
              name="billing-postal-code"
              autocomplete="section-billing billing postal-code"
              required>
          </p>

          <p>
            <label for="billing-country">Country</label>
            <select
              id="billing-country"
              name="billing-country"
              autocomplete="section-billing billing country-name"
              required>
              <option value="">Choose a country</option>
              <option value="India">India</option>
              <option value="Japan">Japan</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </p>
        </fieldset>

        <datalist id="city-suggestions">
          <option value="Delhi"></option>
          <option value="Mumbai"></option>
          <option value="Bengaluru"></option>
        </datalist>

        <button type="submit">Create account</button>
      </form>

      <section aria-labelledby="verification-heading">
        <h2 id="verification-heading">Verify your email</h2>
        <p>Enter the short code sent to your email address.</p>

        <form action="/accounts/verify" method="post">
          <p>
            <label for="verification-code">One-time verification code</label>
            <input
              id="verification-code"
              name="verification-code"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              required>
          </p>
          <button type="submit">Verify code</button>
        </form>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The page displays an account form grouped into account details, shipping address, and billing address, followed by a separate email verification form.

A browser may offer saved values for fields such as name, email, username, phone, and address. It may also offer to generate or save a password for the account. The user can review, edit, or decline suggested values.

The city fields can show Delhi, Mumbai, and Bengaluru as page-provided suggestions. A visitor can still type a different city. The verification field may accept a one-time code offered by a supported browser or device feature.

Autofill suggestions depend on the browser, saved information, and user settings. The page remains labeled and usable when no suggestion appears.

## Explanation

- The form's autocomplete="on" allows the browser to use its judgment. The more specific tokens on each field describe what information belongs there.
- Each field still has a label and a name. The label explains the field to the visitor, name identifies its submitted value, and autocomplete hints at the value's purpose.
- The account email uses autocomplete="email". The password being created uses autocomplete="new-password", which can help password managers offer a generated or saved credential.
- Shipping and billing fields have distinct section tokens. The section-shipping and section-billing prefixes help distinguish fields that otherwise have similar purposes.
- The city inputs use address-level2 for autofill and also point to a datalist. The autocomplete token describes the field for browser assistance; the datalist supplies suggestions chosen by this page. The input remains editable.
- The verification input uses autocomplete="one-time-code". It may help a supported browser offer a code, but it does not create the code, check it, or replace verification on the server.
- The token inputmode="numeric" can request a numeric-friendly keyboard on devices. The input remains text so a code that begins with zero is not treated as a number.
- Autocomplete values are hints. They do not set a field's visible label or submitted value, and they do not force a browser to fill anything.
- Use autocomplete="off" sparingly when reusing a value would be inappropriate. Browsers can ignore it for login fields to support password managers, so the form should still work if a browser offers saved information.

## How to try it

Copy the HTML code block using its copy button and save it as garden-shop-account.html. Open it in a browser and inspect the labels, autocomplete attributes, and city suggestions. If autofill is enabled and the browser has saved information, it may offer some values.

The example account and verification addresses do not have server handlers in this file. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 36 - Autocomplete and autofill](../lessons/36-autocomplete-and-autofill.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [35 - Form submission: name, method, action, and enctype](35-form-submission.md) | [Lesson](../lessons/36-autocomplete-and-autofill.md) | [Q&A](../qnas/36-autocomplete-and-autofill.md) | [37 - Semantic HTML and page structure](37-semantic-html.md) |
