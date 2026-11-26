# Example 15 - Links and the anchor element

## Question

Create a small resource page with links to another page on the same site, an external website, an email address, and a phone number. Use clear link text, and make one link request a new browsing context with that behavior explained to readers.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Journal Resources</title>
  </head>
  <body>
    <main>
      <h1>Garden Journal Resources</h1>
      <p>
        Use these links to explore the garden guide or contact the team.
      </p>

      <section>
        <h2>
          <a href="garden-care.html">Read the garden care guide</a>
        </h2>
        <p>
          This page is in the same folder as this resource page.
        </p>
      </section>

      <section>
        <h2>More information</h2>
        <p>
          Visit the
          <a href="https://example.com/" target="_blank" rel="noopener">
            Example website (opens in a new tab or window)
          </a>
          for a demonstration of an external link.
        </p>
      </section>

      <section>
        <h2>Contact the team</h2>
        <ul>
          <li>
            <a href="mailto:hello@example.com">Email the Garden Journal team</a>
          </li>
          <li>
            <a href="tel:+18005550123">Call 1-800-555-0123</a>
          </li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser displays a heading, a link to a local guide, an external website link, and links to email and call the team. Selecting the local guide link navigates to garden-care.html in the same folder. The external link requests a new browsing context, commonly a new tab. The mail and phone links ask the device to use an available email or calling handler.

The external address and contact details are examples. Replace them with destinations that are valid for your own page.

## Explanation

- The a element creates a hyperlink when it has an href attribute. The href provides the destination, and the content inside the a element is the link text.
- The local link uses a relative address. It works when garden-care.html is in the same folder as the page containing this link.
- The external link uses an absolute web address. Its link text describes the destination and tells readers that it opens in a new tab or window.
- The target="_blank" attribute requests a new browsing context. The rel="noopener" value makes the intended relationship explicit.
- The mailto: destination asks the device to open an available email handler. The tel: destination asks it to use an available calling handler. Neither destination guarantees that a matching app is configured.
- Anchors navigate to resources. Buttons perform actions on the current page. Avoid vague link text and do not nest buttons or other links inside an anchor.

## How to try it

Copy the HTML code block using its copy button, save it as garden-resources.html, and open it in a browser. Create a second file named garden-care.html in the same folder, then follow the local link. Replace the example website and contact details with destinations you control.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 15 - Links and the anchor element](../lessons/15-links.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [14 - Quotations and citations](14-quotations-and-citations.md) | [Lesson](../lessons/15-links.md) | [Q&A](../qnas/15-links.md) | [16 - URLs, file paths, and page fragments](16-urls-paths-and-fragments.md) |
