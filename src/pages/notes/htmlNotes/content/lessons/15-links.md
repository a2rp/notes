# 15 - Links and the anchor element

Links connect one resource to another. In HTML, the `a` element creates a hyperlink when it has an `href` attribute. The link text tells people what they will reach when they follow it.

## What you will learn

- How `a` and `href` work together to create a link.
- How to write link text that explains its destination.
- How links differ from buttons.
- How to link to a website, an email address, or a phone number.
- How to request a new browsing context for a link.
- How to avoid common link mistakes.

## Create a link with a

The `a` element is also called the anchor element. Add an `href` attribute to give it a destination:

~~~html
<a href="https://example.com/">Visit the Example website</a>
~~~

The browser presents the link text as an interactive link. When followed, the browser navigates to the address in `href`.

An `a` element without `href` does not create a hyperlink:

~~~html
<a>Example website</a>
~~~

Use this form only when the content is intentionally a placeholder. If text should navigate somewhere, include a real `href`. If it should not navigate, ordinary text is usually clearer.

## Write useful link text

Link text is the content between the opening and closing `a` tags. It should help people understand the link's purpose.

~~~html
<p>Read the <a href="/html-guide.html">HTML learning guide</a>.</p>
~~~

The linked phrase says what the destination is. This is more useful than vague text such as “click here” or “read more”, especially when links are read out of context or listed separately by assistive technology.

Avoid using the destination URL as the only link text when a short description is available:

~~~html
<a href="https://example.com/resources/html">Browse HTML learning resources</a>
~~~

Link text should describe the destination or action accurately. Do not promise a file, page, or action that the link does not provide.

## Links can contain other content

An anchor can contain text and, in many cases, other non-interactive content. For example, a heading can be linked:

~~~html
<a href="/lessons/">
  <h2>Browse the lessons</h2>
</a>
~~~

Do not put another link, button, or other interactive control inside an anchor. One click should have one clear destination or action. If a card needs multiple separate links, mark up each link separately rather than wrapping the whole card around them all.

## Links and buttons do different jobs

Use an anchor when the user is going to another resource, such as a page, document, or email address. Use a button when the user performs an action on the current page, such as submitting a form or opening an interactive control.

~~~html
<a href="/contact.html">Contact information</a>
<button type="button">Show contact details</button>
~~~

The anchor navigates to a resource. The button performs an action. Do not use `href="#"` or a made-up link to imitate a button.

## Common link destinations

The `href` value can point to different kinds of destinations.

### Another website

~~~html
<a href="https://www.example.com/">Visit Example</a>
~~~

### Another page in the same site

~~~html
<a href="about.html">About this site</a>
~~~

This example uses a relative address. The next lesson explains URL forms, file paths, and page fragments in more detail.

### An email address

~~~html
<a href="mailto:hello@example.com">Email the team</a>
~~~

Following a mail link asks the device to open an available email handler. It does not guarantee that a particular email application is installed or configured.

### A phone number

~~~html
<a href="tel:+18005550123">Call 1-800-555-0123</a>
~~~

Following a phone link asks the device to use an available calling handler. It is especially useful on devices that can place calls.

## Opening a link in a new browsing context

By default, following a link navigates in the current browsing context. The `target="_blank"` attribute requests a new one. A browser commonly opens it in a new tab, but the user's browser settings can affect whether it is a tab or window.

~~~html
<a href="https://www.example.com/" target="_blank" rel="noopener">
  Visit Example (opens in a new tab or window)
</a>
~~~

Use a new context only when it helps the user, and make the behavior clear in the link text or nearby text. Current HTML treats `target="_blank"` as having `noopener` behavior by default. Writing `rel="noopener"` explicitly makes that intent visible in the markup.

## A short page example

~~~html
<main>
  <h1>HTML resources</h1>

  <p>
    Start with the <a href="/html-guide.html">HTML learning guide</a>.
  </p>

  <ul>
    <li><a href="https://www.example.com/">Visit Example</a></li>
    <li><a href="mailto:hello@example.com">Email the team</a></li>
    <li><a href="tel:+18005550123">Call 1-800-555-0123</a></li>
  </ul>
</main>
~~~

Each anchor has an `href` and link text that identifies what following it will do.

## Common mistakes

- Writing an `a` element without `href` and expecting it to work as a link.
- Using vague link text such as “click here” when a descriptive label would help.
- Using a link to perform an action that belongs on a button.
- Using `href="#"` as a fake destination or button.
- Nesting a button or another link inside an anchor.
- Requesting a new tab or window without telling the user.
- Assuming a `mailto:` or `tel:` link will work even when a device has no matching handler.
- Treating a URL as the only way to explain a link's purpose.

## Try it yourself

1. Create a link to a website with clear text that describes its destination.
2. Link to another HTML page in the same folder.
3. Add a mail link and a phone link with visible labels.
4. Rewrite “click here” so the link text names the destination.
5. Decide whether each example should be an anchor or a button: opening another page, submitting a form, and showing a disclosure.
6. Add a link that requests a new browsing context. Make the behavior clear to the reader.
7. Explain why two links or a button should not be nested inside one anchor.

## Key points

- An `a` element with `href` creates a hyperlink.
- The link's content gives people its accessible name and should describe its purpose.
- Use anchors for navigation and buttons for actions.
- Links can use web addresses, local page addresses, `mailto:`, or `tel:` destinations.
- `target="_blank"` requests a new browsing context, often a tab.
- Do not nest interactive controls inside a link.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [14 - Quotations and citations](14-quotations-and-citations.md) | [Q&A](../qnas/15-links.md) | [Example](../examples/15-links.md) | [16 - URLs, file paths, and page fragments](16-urls-paths-and-fragments.md) |
