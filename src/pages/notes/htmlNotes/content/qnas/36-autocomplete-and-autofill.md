# 36 - Autocomplete and autofill: Questions and Answers

Use these questions to review [Chapter 36 - Autocomplete and autofill](../lessons/36-autocomplete-and-autofill.md). Every answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does an `autocomplete` token such as `email` tell the browser?

A. The kind of information the field expects

B. The label that must be displayed next to the field

C. The value that must be sent to the server

D. That the field is required

**Answer: A.** The token describes the purpose of the field so the browser can offer relevant stored information. It does not set a label, name, or required state.

### 2. Which token is appropriate for a person's full name?

A. `person-name`

B. `name`

C. `full-name-field`

D. `username-name`

**Answer: B.** `name` is the standard token for a person's full name.

### 3. Which token identifies an existing password on a login form?

A. `new-password`

B. `current-password`

C. `password-now`

D. `old-login`

**Answer: B.** Use `current-password` for an existing password and `new-password` when the user is creating or changing a password.

### 4. What does `autocomplete="one-time-code"` identify?

A. A permanent account password

B. A short verification code

C. A postal code

D. A form submission method

**Answer: B.** It identifies a one-time verification code and may help a browser offer a supported code to the user.

### 5. How does autocomplete differ from a datalist?

A. Autocomplete describes field purpose for browser assistance; a datalist provides page-authored suggestions

B. A datalist requires a value; autocomplete submits a value

C. They are the same feature with different names

D. Autocomplete adds a visible label; a datalist adds a form name

**Answer: A.** A datalist contains suggestions supplied by the page. An autocomplete token tells the browser what kind of information the field expects.

### 6. Which token is used to describe a postal code?

A. `address-level2`

B. `postal-code`

C. `zip-only`

D. `street-address`

**Answer: B.** `postal-code` identifies a postal or ZIP code field.

### 7. Which is a correctly ordered autocomplete value for a shipping postal code?

A. `postal-code shipping section-gift`

B. `section-gift shipping postal-code`

C. `shipping postal-code section-gift`

D. `postal-code section-gift shipping`

**Answer: B.** If used, the section token comes first, then the optional shipping or billing token, then the field detail token.

### 8. What should a page expect when it sets `autocomplete="off"` on login fields?

A. Every browser will block password managers

B. Some browsers may still offer saved login information

C. The form will stop submitting

D. Every control will become disabled

**Answer: B.** Browsers may ignore `off` for login credentials to support password managers.

### 9. Does `autocomplete="email"` make a field required or validate the email format?

A. Yes, it does both

B. It makes the field required only

C. It validates the format only

D. No, it only describes the field's purpose

**Answer: D.** Use `required` to require a value and `type="email"` for built-in email-format checking. The autocomplete token is a separate hint.

### 10. Which attribute gives the user's value a key in submitted form data?

A. `autocomplete`

B. `name`

C. `label`

D. `section-*`

**Answer: B.** `name` identifies the submitted field. `autocomplete` describes the field's purpose to the browser.

## True or false

### 1. Autocomplete can help browsers offer stored information that matches a field's purpose.

**Answer: True.** A standard token such as `email` gives the browser a hint about what kind of value belongs in the field.

### 2. The `autocomplete` attribute replaces the visible label.

**Answer: False.** It is a browser hint. Keep a descriptive label for people filling out the form.

### 3. A browser must always fill a field whenever a valid autocomplete token is present.

**Answer: False.** It is a hint. The browser may not have a matching saved value, the user may disable autofill, or the browser may interpret the form differently.

### 4. `current-password` and `new-password` describe different uses.

**Answer: True.** Use the first for an existing credential and the second when creating or changing one.

### 5. A datalist provides page-authored suggested values, while autocomplete describes what the field means.

**Answer: True.** These features can be used together because they provide different kinds of help.

### 6. A `section-*` token, when present, comes before other autocomplete tokens.

**Answer: True.** For example, `section-shipping shipping postal-code` follows the expected order.

### 7. The value `autocomplete="off"` is guaranteed to disable password managers.

**Answer: False.** Browsers may ignore it on login fields so users can use password managers.

### 8. `autocomplete="postal-code"` submits the field under the key `postal-code`.

**Answer: False.** The form-data key comes from the control's `name`. The autocomplete token tells the browser what the field represents.

## Short-answer questions

### 1. What does the `autocomplete` attribute do?

**Answer:** It describes the kind of information a form control expects. A browser can use that hint to offer or fill matching information saved for the user.

### 2. What is the difference between a label, name, and autocomplete token?

**Answer:** A label tells the user what a control is for. A name identifies its value in submitted form data. An autocomplete token describes the kind of information expected so browser tools can help.

### 3. What is the difference between autocomplete and datalist?

**Answer:** Autocomplete identifies the field's purpose for browser assistance with stored information. A datalist contains suggestions supplied by the page for an editable input.

### 4. Which autocomplete tokens would you use for a login username and existing password?

**Answer:** Use `username` for the username and `current-password` for the existing password.

### 5. Which token should identify a password being created?

**Answer:** Use `new-password`. It helps distinguish account creation or password change from entering an existing password.

### 6. How can you distinguish two postal code fields for shipping and billing?

**Answer:** Use `shipping postal-code` on the shipping field and `billing postal-code` on the billing field. Add a `section-*` token first if the form has multiple groups of the same kind.

### 7. Why should you not rely on `autocomplete="off"` to control password managers?

**Answer:** Some browsers ignore the setting for login credentials to support password managers. Users and browsers control whether stored logins are offered.

### 8. Does an autocomplete token validate or require a value?

**Answer:** No. It is a purpose hint. Use attributes such as `required` or a suitable input type for validation rules.

## Practical questions

### 1. Add a name autocomplete hint to this field.

~~~html
<label for="customer-name">Name</label>
<input id="customer-name" name="name">
~~~

**Answer:**

~~~html
<label for="customer-name">Name</label>
<input id="customer-name" name="name" autocomplete="name">
~~~

### 2. Mark these fields as an email address and phone number.

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email">

<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel">
~~~

**Answer:**

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">

<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel" autocomplete="tel">
~~~

### 3. Mark this login form for username and current password autofill.

~~~html
<label for="username">Username</label>
<input id="username" name="username">

<label for="password">Password</label>
<input id="password" name="password" type="password">
~~~

**Answer:**

~~~html
<label for="username">Username</label>
<input id="username" name="username" autocomplete="username">

<label for="password">Password</label>
<input id="password" name="password" type="password" autocomplete="current-password">
~~~

### 4. This is a new account password. Correct its autocomplete token.

~~~html
<label for="new-password">Create a password</label>
<input id="new-password" name="password" type="password" autocomplete="current-password">
~~~

**Answer:** Use `new-password` because the user is creating a credential:

~~~html
<label for="new-password">Create a password</label>
<input id="new-password" name="password" type="password" autocomplete="new-password">
~~~

### 5. Add autocomplete tokens for a shipping street address and postal code.

**Answer:**

~~~html
<label for="shipping-street">Street address</label>
<input id="shipping-street" name="shipping-street" autocomplete="shipping street-address">

<label for="shipping-postal">Postal code</label>
<input id="shipping-postal" name="shipping-postal" autocomplete="shipping postal-code">
~~~

### 6. This form has two shipping addresses, one for a gift and one for home. Add section tokens to distinguish them.

**Answer:** Put the section token first and reuse it on the fields in that group:

~~~html
<label for="gift-street">Gift address</label>
<input id="gift-street" name="gift-street" autocomplete="section-gift shipping street-address">

<label for="gift-postal">Gift postal code</label>
<input id="gift-postal" name="gift-postal" autocomplete="section-gift shipping postal-code">

<label for="home-street">Home address</label>
<input id="home-street" name="home-street" autocomplete="section-home shipping street-address">

<label for="home-postal">Home postal code</label>
<input id="home-postal" name="home-postal" autocomplete="section-home shipping postal-code">
~~~

### 7. Identify the purpose of this verification field and keep it required.

~~~html
<label for="code">Verification code</label>
<input id="code" name="code" inputmode="numeric" required>
~~~

**Answer:** Add the `one-time-code` token:

~~~html
<label for="code">Verification code</label>
<input id="code" name="code" inputmode="numeric" autocomplete="one-time-code" required>
~~~

### 8. The autocomplete hint is being used as the only label. Fix the markup.

~~~html
<input name="postal" autocomplete="postal-code">
~~~

**Answer:** Add a visible label and an id, while keeping the name and autocomplete hint:

~~~html
<label for="postal">Postal code</label>
<input id="postal" name="postal" autocomplete="postal-code">
~~~

### 9. Can this field guarantee that a browser will fill a stored email address? Explain.

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">
~~~

**Answer:** No. The token gives the browser a useful hint, but the user may have no saved email, may have turned autofill off, or may be using a browser that does not offer a matching value.

### 10. A form uses `autocomplete="off"` for username and password fields. Should the site expect that all password managers will stop offering saved logins?

**Answer:** No. Some browsers ignore `off` on login fields to support password managers. The form should use the correct `username` and `current-password` hints and work whether autofill is offered or not.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [35 - Form submission: name, method, action, and enctype](35-form-submission.md) | [Lesson](../lessons/36-autocomplete-and-autofill.md) | [Example](../examples/36-autocomplete-and-autofill.md) | [37 - Semantic HTML and page structure](37-semantic-html.md) |
