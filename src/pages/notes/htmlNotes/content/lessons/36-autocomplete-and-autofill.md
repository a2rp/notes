# 36 - Autocomplete and autofill

Browsers can remember information and offer to fill it into forms. The HTML `autocomplete` attribute helps the browser understand what a field is for, such as a person's name, email address, shipping postal code, username, or password.

Using the right autocomplete hints can reduce repeated typing and make forms easier to complete. The browser and user remain in control of whether saved information is offered or filled.

## What you will learn

- What the `autocomplete` attribute tells the browser
- How autocomplete hints differ from datalist suggestions
- Common autocomplete tokens for contact details and addresses
- How to identify username, password, and one-time-code fields
- How to distinguish shipping and billing sections
- What `on` and `off` mean, and why browser behavior can vary

## What does `autocomplete` do?

`autocomplete` describes the kind of information a form control expects. For example, a name field can use `autocomplete="name"` and an email field can use `autocomplete="email"`:

~~~html
<label for="full-name">Full name</label>
<input id="full-name" name="name" autocomplete="name">

<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">
~~~

The browser may use this information to suggest or fill saved values. It can also help assistive technology and other tools understand the purpose of the field.

The hint does not set the field's label, name, or value. These attributes have separate purposes:

- The label tells the user what the control is for.
- The name identifies the value in form submission.
- The autocomplete token describes the kind of information the field expects.
- The current value is what the user entered or selected.

## Autocomplete and datalist are different

A `datalist` provides suggestions chosen by the page author for one input. The `autocomplete` attribute describes the field's purpose so the browser can offer matching saved information.

~~~html
<label for="city">City</label>
<input id="city" name="city" autocomplete="address-level2" list="popular-cities">

<datalist id="popular-cities">
  <option value="Delhi"></option>
  <option value="Mumbai"></option>
</datalist>
~~~

In this example, the browser can use `address-level2` as a hint about the city field, while the datalist provides the page's own suggestions. The input remains editable.

## Common tokens for personal information

Use a token that matches the field's actual purpose. Common tokens include:

| Field purpose | Autocomplete value |
| --- | --- |
| Full name | `name` |
| Given name | `given-name` |
| Family name | `family-name` |
| Username | `username` |
| Email address | `email` |
| Telephone number | `tel` |
| Organization | `organization` |

Prefer one full-name field when that fits the form. Names do not follow one universal structure, so do not split a person's name into parts without a real reason.

~~~html
<label for="contact-name">Name</label>
<input id="contact-name" name="name" autocomplete="name">

<label for="contact-phone">Phone number</label>
<input id="contact-phone" name="phone" type="tel" autocomplete="tel">
~~~

Autocomplete tokens are hints. A browser may not offer a value if it has none saved, if the user has turned autofill off, or if it does not recognize the form.

## Address fields

Address details use specific tokens. Some useful ones are `street-address`, `address-line1`, `address-line2`, `address-level1`, `address-level2`, `postal-code`, `country`, and `country-name`.

~~~html
<label for="street">Street address</label>
<input id="street" name="street" autocomplete="street-address">

<label for="city">City or town</label>
<input id="city" name="city" autocomplete="address-level2">

<label for="region">State, province, or region</label>
<input id="region" name="region" autocomplete="address-level1">

<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code" autocomplete="postal-code">

<label for="country">Country</label>
<select id="country" name="country" autocomplete="country-name">
  <option value="">Choose a country</option>
  <option value="India">India</option>
  <option value="Japan">Japan</option>
</select>
~~~

Address conventions differ between countries. Use the tokens that match the meaning of each field, and do not assume that every address has the same parts or order.

## Distinguish shipping and billing addresses

A form may request two addresses with fields that have similar meanings. The optional `shipping` and `billing` tokens identify which address a field belongs to:

~~~html
<label for="ship-street">Shipping street address</label>
<input id="ship-street" name="shipping-street" autocomplete="shipping street-address">

<label for="ship-postal">Shipping postal code</label>
<input id="ship-postal" name="shipping-postal-code" autocomplete="shipping postal-code">

<label for="bill-street">Billing street address</label>
<input id="bill-street" name="billing-street" autocomplete="billing street-address">

<label for="bill-postal">Billing postal code</label>
<input id="bill-postal" name="billing-postal-code" autocomplete="billing postal-code">
~~~

If a form contains multiple groups for the same kind of information, a `section-*` token can distinguish them. Put the section token first and use it consistently for the fields in that group:

~~~html
<input name="gift-street" autocomplete="section-gift shipping street-address">
<input name="gift-postal-code" autocomplete="section-gift shipping postal-code">

<input name="home-street" autocomplete="section-home shipping street-address">
<input name="home-postal-code" autocomplete="section-home shipping postal-code">
~~~

The labels are still important. These tokens do not replace visible labels or tell the user what to enter.

## Login and password fields

Use `username` for a username or account name. Use `current-password` for an existing password and `new-password` for a password being created or changed:

~~~html
<form action="/login" method="post">
  <label for="username">Username or email</label>
  <input id="username" name="username" autocomplete="username" required>

  <label for="password">Password</label>
  <input id="password" name="password" type="password" autocomplete="current-password" required>

  <button type="submit">Sign in</button>
</form>
~~~

A registration form should identify a new password as `new-password`:

~~~html
<label for="new-password">Create a password</label>
<input id="new-password" name="new-password" type="password" autocomplete="new-password" required>
~~~

These hints can help browsers and password managers offer an appropriate saved credential or password-generation feature. The browser still controls whether it offers these features.

## One-time codes

For a short verification code, use the `one-time-code` token:

~~~html
<label for="verification-code">Verification code</label>
<input id="verification-code" name="code" inputmode="numeric" autocomplete="one-time-code" required>
~~~

This can help a browser offer a code received through a supported mechanism. It does not generate or validate the code. The server or verification system must check it.

## `on` and `off`

The values `on` and `off` are broad autocomplete settings. `on` allows the browser to use its judgment. A specific token such as `email` or `postal-code` gives more useful information about the field.

`off` asks the browser not to automatically complete or remember a value for that field. Use it only when there is a clear reason, such as a field for a one-time token or a value that should not be reused. Do not turn off autocomplete broadly just to prevent ordinary form filling.

Browsers may ignore `autocomplete="off"` on username and password fields to support password managers. Users can also change their browser settings, so the page should work whether autofill is offered or not.

A form can use `autocomplete="off"` as a broad form-level setting, and a field can have its own autocomplete value. For ordinary personal information and account forms, specific field tokens are usually more helpful than a blanket off setting.

## A complete registration and address form

~~~html
<form action="/register" method="post" autocomplete="on">
  <fieldset>
    <legend>Account details</legend>

    <p>
      <label for="register-name">Full name</label>
      <input id="register-name" name="name" autocomplete="name" required>
    </p>

    <p>
      <label for="register-email">Email address</label>
      <input id="register-email" name="email" type="email" autocomplete="email" required>
    </p>

    <p>
      <label for="register-password">Create a password</label>
      <input id="register-password" name="password" type="password" autocomplete="new-password" required>
    </p>
  </fieldset>

  <fieldset>
    <legend>Shipping address</legend>

    <p>
      <label for="shipping-street">Street address</label>
      <input id="shipping-street" name="shipping-street" autocomplete="shipping street-address">
    </p>

    <p>
      <label for="shipping-postal">Postal code</label>
      <input id="shipping-postal" name="shipping-postal-code" autocomplete="shipping postal-code">
    </p>
  </fieldset>

  <button type="submit">Create account</button>
</form>
~~~

Each control has an ordinary label and name. The autocomplete values tell the browser what kind of personal information is expected and distinguish the new password and shipping address.

## Common mistakes

### Using a made-up autocomplete value

~~~html
<input name="email" autocomplete="my-email-field">
~~~

A made-up token does not tell the browser that this is an email field. Use the standard token:

~~~html
<input name="email" type="email" autocomplete="email">
~~~

### Using the token for a different kind of information

If a postal code field is marked `autocomplete="email"`, the hint conflicts with the actual purpose. Choose the token that matches the field.

### Treating a token as the input's label

~~~html
<input name="email" autocomplete="email">
~~~

The autocomplete token does not provide a visible label. Add one:

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">
~~~

### Applying `off` to every field

A blanket off setting can remove useful browser assistance. Prefer accurate tokens for ordinary information, and reserve `off` for cases where automatic completion is genuinely unwanted.

### Expecting the browser to autofill every field

Autocomplete is a hint, not a command that forces autofill. The browser may have no stored value, the user may disable autofill, or a browser may interpret the form differently.

### Confusing autofill hints with required validation

`autocomplete="email"` does not require the user to enter an email address and does not validate its format. Use `required` and `type="email"` for those separate jobs.

## Try it yourself

1. Add autocomplete tokens to a form with a person's name, email, phone number, and address.
2. Use `username`, `current-password`, and `new-password` in the appropriate login and account creation fields.
3. Add `one-time-code` to a verification field and label it clearly.
4. Build a form with both shipping and billing addresses and distinguish their fields.
5. Create two address groups using different `section-*` identifiers.
6. Compare a specific token such as `postal-code` with the broad value `on`.
7. Try the form in a browser with autofill enabled and disabled. Confirm that each field remains understandable and usable either way.

## Key points

- `autocomplete` describes the kind of information a control expects so the browser can offer relevant help.
- Use standard tokens such as `name`, `email`, `tel`, `postal-code`, `username`, `current-password`, and `new-password`.
- Use `shipping`, `billing`, and optional `section-*` tokens to distinguish address groups.
- A datalist provides page-authored suggestions; autocomplete describes the field's purpose for browser assistance.
- Autocomplete hints do not replace labels, names, validation, or server-side checks.
- Autofill behavior depends on the browser and the user's settings.
- Avoid disabling autocomplete broadly. Browsers may still offer password management on login fields.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [35 - Form submission: name, method, action, and enctype](35-form-submission.md) | [Q&A](../qnas/36-autocomplete-and-autofill.md) | [Example](../examples/36-autocomplete-and-autofill.md) | [37 - Semantic HTML and page structure](37-semantic-html.md) |
