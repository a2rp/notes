# 119 - Browser security: XSS, injection, and safe DOM updates

This complete example is a small link saver. It accepts a label and a destination, validates the destination, and builds each list item with DOM APIs. User-provided text is displayed as text, never parsed as HTML.

## Create these files

Make a folder named <code>safe-link-list</code> and add the three files below.

### <code>safe-link-list/index.html</code>

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Safe link list</title>
    <link rel="stylesheet" href="styles.css">
    <script src="app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Safe link list</h1>
      <p>
        Add a label and a same-site path or HTTPS address. The label is shown
        as text, even when it contains characters that look like HTML.
      </p>

      <form id="link-form">
        <label for="link-label">Link label</label>
        <input
          id="link-label"
          name="label"
          type="text"
          maxlength="120"
          required
        >

        <label for="link-address">Same-site path or HTTPS address</label>
        <input
          id="link-address"
          name="address"
          type="text"
          maxlength="2048"
          placeholder="/help or https://example.com/"
          required
        >

        <button type="submit">Add link</button>
      </form>

      <p id="status" class="status" role="status" aria-atomic="true"></p>

      <section aria-labelledby="saved-heading">
        <h2 id="saved-heading">Saved links</h2>
        <p id="empty-message">No links have been added.</p>
        <ul id="link-list" aria-label="Saved links"></ul>
      </section>

      <details>
        <summary>Why are links checked?</summary>
        <p>
          A link destination is data too. This demo accepts same-site paths and
          web URLs that use HTTPS. A real application should choose its
          allowed destinations based on the feature.
        </p>
      </details>
    </main>
  </body>
</html>
~~~

### <code>safe-link-list/styles.css</code>

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem;
  color: #1b1b1b;
  background: #fff;
  font: 1rem/1.6 system-ui, sans-serif;
}

main {
  width: min(100%, 44rem);
  margin-inline: auto;
}

h1,
h2 {
  line-height: 1.2;
}

form {
  display: grid;
  gap: 0.65rem;
  margin-block: 1.5rem;
}

label {
  font-weight: 700;
}

input {
  width: 100%;
  padding: 0.7rem;
  font: inherit;
}

button {
  justify-self: start;
  padding: 0.65rem 0.9rem;
  color: #fff;
  background: #174ea6;
  border: 2px solid #174ea6;
  border-radius: 0.25rem;
  font: inherit;
  cursor: pointer;
}

button:hover {
  background: #123d83;
}

button:focus-visible,
input:focus-visible,
summary:focus-visible,
a:focus-visible {
  outline: 3px solid #b45309;
  outline-offset: 3px;
}

.status {
  min-height: 1.6em;
  font-weight: 700;
}

#link-list {
  display: grid;
  gap: 0.5rem;
  padding-inline-start: 1.5rem;
}

@media (max-width: 30rem) {
  body {
    padding: 1rem;
  }
}
~~~

### <code>safe-link-list/app.js</code>

~~~js
"use strict";

const form = document.querySelector("#link-form");
const labelInput = document.querySelector("#link-label");
const addressInput = document.querySelector("#link-address");
const status = document.querySelector("#status");
const linkList = document.querySelector("#link-list");
const emptyMessage = document.querySelector("#empty-message");

function getAllowedUrl(value) {
  const trimmedValue = value.trim();
  const isRootRelativePath =
    trimmedValue.startsWith("/") && !trimmedValue.startsWith("//");
  const isAbsoluteWebUrl = /^https?:\/\//i.test(trimmedValue);

  if (!isRootRelativePath && !isAbsoluteWebUrl) {
    return null;
  }

  let url;

  try {
    url = new URL(trimmedValue, document.baseURI);
  } catch {
    return null;
  }

  const isWebProtocol =
    url.protocol === "http:" || url.protocol === "https:";
  const isSameOrigin = url.origin === window.location.origin;
  const isAbsoluteHttps = /^https:\/\//i.test(trimmedValue);
  const isAbsoluteHttpSameOrigin =
    /^http:\/\//i.test(trimmedValue) && isSameOrigin;
  const isAllowed =
    isWebProtocol &&
    (
      (isRootRelativePath && isSameOrigin) ||
      isAbsoluteHttps ||
      isAbsoluteHttpSameOrigin
    );

  if (!isAllowed || url.username || url.password) {
    return null;
  }

  return url;
}

function addLink(label, url) {
  const item = document.createElement("li");
  const link = document.createElement("a");

  link.href = url.href;
  link.textContent = label;
  item.append(link);
  linkList.append(item);
  emptyMessage.hidden = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const label = labelInput.value.trim();
  const url = getAllowedUrl(addressInput.value);

  if (!label) {
    status.textContent = "Enter a label for the link.";
    labelInput.focus();
    return;
  }

  if (!url) {
    status.textContent =
      "Enter a same-site path or a valid HTTPS address.";
    addressInput.focus();
    return;
  }

  addLink(label, url);
  form.reset();
  labelInput.focus();

  const count = linkList.children.length;
  status.textContent =
    count === 1
      ? "Link added. 1 link saved."
      : "Link added. " + count + " links saved.";
});
~~~

## Run the example

Open <code>safe-link-list/index.html</code> in a modern browser. There is no build step or external library. A same-site path is accepted when the page is served from an HTTP or HTTPS origin. An HTTPS destination can also be saved.

## Try it

1. Enter a short label and a same-site path such as <code>/help</code>, then select **Add link**.
2. Enter a label that looks like HTML, such as <code>&lt;strong&gt;Important&lt;/strong&gt;</code>. It should display with its angle brackets as text, not bold markup.
3. Try a script URL or a data URL as the destination. The form should reject it and keep focus on the address field.
4. Add an HTTPS address. The link should be created and remain a normal browser link.
5. Use <code>Tab</code> to reach the inputs, button, links, and disclosure. Confirm the focus indicator remains visible.

Do not paste a real attack string into a page that uses an unsafe rendering sink. This demo never evaluates or executes entered text.

## Expected result

A successful submission adds one list item with the supplied label. The label appears as ordinary text. The destination is parsed and restricted to a same-site web path or an HTTP or HTTPS address that meets the policy in the code. Script and data protocols, malformed URLs, and URLs containing credentials are rejected.

The browser displays a short status message with the number of saved links. The status does not receive focus. When a value is rejected, the page explains the problem and focuses the field that needs correction.

## Unsafe pattern to recognize

Do not use this pattern with untrusted values:

~~~js
preview.innerHTML = "<p>" + userProvidedLabel + "</p>";
~~~

The browser parses the resulting string as HTML. The safe example uses a fixed paragraph or anchor created by the application and puts user text in textContent.

## Why these choices help

- Values from form fields are treated as untrusted.
- The destination is parsed with the URL constructor and checked against an explicit protocol and origin policy.
- The label is inserted with textContent, so it is not parsed as markup.
- The element type and URL property names are fixed in trusted code.
- The form uses an event listener instead of building an inline event-handler string.
- A concise status reports the result without moving focus.
- The native disclosure and form controls keep their built-in browser behavior.
- The example has no sanitizer because it does not accept formatted HTML.

A real application may need a stricter destination allow-list. Allowing arbitrary HTTPS links can still enable misleading destinations, even though HTTPS itself is not an XSS sanitizer.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [118 - Accessibility, keyboard interaction, and dynamic content](../lessons/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [Open Q&A](../qnas/119-browser-security-xss-injection-and-safe-dom-updates.md) | [Open lesson](../lessons/119-browser-security-xss-injection-and-safe-dom-updates.md) | [120 - Web Crypto and secure random values](../lessons/120-web-crypto-and-secure-random-values.md) |
