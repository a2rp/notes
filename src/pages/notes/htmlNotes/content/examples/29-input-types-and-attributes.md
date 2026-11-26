# Example 29 - Input types and input attributes

## Question

Create an event registration form with input types suited to different information. Include constraints, a hint that does not replace a label, checkbox and radio groups, a file chooser, and examples of read-only and disabled values.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Club Event Registration</title>
  </head>
  <body>
    <main>
      <h1>Garden Club Event Registration</h1>
      <p>Register for the spring gardening workshop.</p>

      <form
        action="/event-registration"
        method="post"
        enctype="multipart/form-data">
        <p>
          <label for="participant-name">Full name</label>
          <input
            id="participant-name"
            name="participant-name"
            type="text"
            minlength="2"
            maxlength="60"
            placeholder="For example, Asha Patel"
            required>
        </p>

        <p>
          <label for="email-address">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required>
        </p>

        <p>
          <label for="phone-number">Phone number</label>
          <input
            id="phone-number"
            name="phone"
            type="tel">
        </p>

        <p>
          <label for="garden-website">Website</label>
          <input
            id="garden-website"
            name="website"
            type="url"
            placeholder="https://example.com">
        </p>

        <p>
          <label for="guest-count">Number of guests</label>
          <input
            id="guest-count"
            name="guests"
            type="number"
            min="1"
            max="12"
            step="1"
            value="1"
            required>
        </p>

        <p>
          <label for="visit-date">Preferred visit date</label>
          <input
            id="visit-date"
            name="visit-date"
            type="date">
        </p>

        <p>
          <label for="gardening-experience">
            Gardening experience, from 0 to 10
          </label>
          <input
            id="gardening-experience"
            name="gardening-experience"
            type="range"
            min="0"
            max="10"
            step="1"
            value="5">
        </p>

        <p>
          <label for="postal-code">Postal code</label>
          <input
            id="postal-code"
            name="postal-code"
            type="text"
            inputmode="numeric"
            minlength="6"
            maxlength="6"
            pattern="[0-9]{6}"
            placeholder="For example, 560001"
            title="Enter a six-digit postal code">
        </p>

        <fieldset>
          <legend>Topics you want to explore</legend>
          <label>
            <input
              type="checkbox"
              name="topic"
              value="herbs"
              checked>
            Herb gardening
          </label>
          <label>
            <input
              type="checkbox"
              name="topic"
              value="vegetables">
            Vegetable gardening
          </label>
          <label>
            <input
              type="checkbox"
              name="topic"
              value="compost">
            Composting
          </label>
        </fieldset>

        <fieldset>
          <legend>Preferred contact method</legend>
          <label>
            <input
              type="radio"
              name="contact-method"
              value="email"
              checked>
            Email
          </label>
          <label>
            <input
              type="radio"
              name="contact-method"
              value="phone">
            Phone
          </label>
        </fieldset>

        <p>
          <label for="plant-photos">Choose plant photos</label>
          <input
            id="plant-photos"
            name="plant-photos"
            type="file"
            accept="image/png, image/jpeg"
            multiple>
        </p>

        <p>
          <label for="registration-code">Registration code</label>
          <input
            id="registration-code"
            name="registration-code"
            value="GARDEN-204"
            readonly>
        </p>

        <p>
          <label for="unavailable-field">Unavailable field</label>
          <input
            id="unavailable-field"
            name="unavailable-field"
            value="Not available"
            disabled>
        </p>

        <input
          type="hidden"
          name="form-version"
          value="spring-workshop">

        <button type="submit">Submit registration</button>
      </form>
    </main>
  </body>
</html>
~~~

## Expected output

The browser displays text, email, telephone, URL, number, date, range, postal code, checkbox, radio, and file controls, followed by read-only and disabled fields and a submit button. Native controls can look different across browsers and devices.

The browser can check constraints such as required values, text length, numeric limits, and the postal-code pattern. Choosing a file is only the start of an upload. The example action needs a server that accepts the multipart POST request, validates the submitted data, and returns a response.

## Explanation

- Each input has a type that describes the information it accepts. Email and URL types provide basic format checks, while tel does not validate a phone number format.
- The full name and postal code fields show that a placeholder is only an example hint. Each field still has a visible label. The postal code uses text rather than number because it is an identifier, and its leading zero should be preserved.
- The number control accepts whole guest counts from 1 through 12. The range control is for an approximate experience rating from 0 through 10.
- The checkboxes share the name topic but have different values, so a person can choose several topics. The radio controls share one name and use different values, so only one contact method can be selected.
- The accept value suggests image formats to the file chooser. It does not verify a file. The form uses multipart/form-data because it includes a file control. The server must still validate uploaded files.
- The read-only registration code can be submitted. The disabled field cannot be edited and is not included in submitted form data.
- The hidden form-version value is submitted without an interactive control. Hidden does not mean secret or trustworthy. A user can inspect or change it, so the server must validate it.
- Required, minlength, maxlength, min, max, step, and pattern can trigger browser checks. Client-side checks do not replace server-side validation.
- A password input masks its display but does not encrypt its value. Use HTTPS and secure server handling for sensitive information.
- The action is an example destination. The form interface works without JavaScript, but its data needs a server or service to be processed.

## How to try it

Copy the HTML code block using its copy button and save it as garden-club-registration.html. Open it in a browser to inspect the native controls and built-in validation. The file chooser only suggests image types, and the registration will not be processed until the example server route exists.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 29 - Input types and input attributes](../lessons/29-input-types-and-attributes.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [28 - Forms: the form element and submission flow](28-forms-overview.md) | [Lesson](../lessons/29-input-types-and-attributes.md) | [Q&A](../qnas/29-input-types-and-attributes.md) | [30 - Labels and accessible form controls](30-labels-and-form-controls.md) |
