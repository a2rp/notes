# 119 - Browser security: XSS, injection, and safe DOM updates

A browser treats different kinds of input differently. Text can become HTML markup, a URL can become a navigation target, and a string can become executable JavaScript if it is passed to a code-running API. Cross-site scripting, often shortened to XSS, happens when an application lets untrusted data become executable content in a page.

The safest first choice is to keep data as data. Use DOM APIs that create text and elements instead of building HTML strings from user-controlled values.

## Learning goals

After this lesson, you should be able to:

- recognize untrusted data, including values from URLs, storage, forms, and network responses;
- explain how XSS can occur when data is interpreted as markup or code;
- render plain text with safe DOM APIs;
- identify common HTML and JavaScript injection sinks;
- validate URLs before using them as navigation destinations;
- distinguish input validation, output encoding, and HTML sanitization;
- use a maintained sanitizer when user-authored HTML is genuinely required;
- describe how Content Security Policy and Trusted Types add defense in depth.

## Treat external data as untrusted

Untrusted data is any value the application does not fully control. It can come from:

- text fields, uploads, or imported files;
- query parameters and URL fragments;
- local storage, session storage, or IndexedDB;
- a server response, third-party API, or another browser window;
- a database record that originally came from a user.

A value does not become safe just because it came from your own server or was saved earlier. Stored content can still contain data supplied by another user. Check it when it is used, in the context where it is used.

### What XSS can do

If attacker-controlled JavaScript runs as part of your page, it runs with the page's origin and can often read or change page content and act through the active session. The impact depends on the application's data and browser protections.

HttpOnly cookies prevent page scripts from reading those cookie values, but they do not make an XSS flaw harmless. Malicious code may still use the current page to perform actions, inspect visible data, or alter what the user sees.

XSS can be:

- **Reflected:** input from a request is immediately included in a response.
- **Stored:** unsafe content is saved and later shown to users.
- **DOM-based:** client-side code reads data such as a URL fragment and sends it to an unsafe DOM or code sink.

All three follow the same important rule: do not let untrusted data become executable code.

## Keep plain text as text

For ordinary text, assign the value to <code>textContent</code>:

~~~js
const message = document.querySelector("#message");
const userText = "<img src=x onerror=alert(1)>";

message.textContent = userText;
~~~

The browser displays the characters as text. It does not parse them as an image element or execute the event handler.

Build elements explicitly when you need markup around the value:

~~~js
const item = document.createElement("li");
const label = document.createElement("span");
const removeButton = document.createElement("button");

label.textContent = userProvidedLabel;
removeButton.type = "button";
removeButton.textContent = "Remove";

item.append(label, removeButton);
document.querySelector("#items").append(item);
~~~

Use a fixed event handler function:

~~~js
removeButton.addEventListener("click", () => {
  item.remove();
});
~~~

Do not build a string containing an event handler and set it as an attribute. Keep code trusted and values separate.

### A safe text update is not a general sanitizer

<code>textContent</code> is appropriate for text in an ordinary element. It does not sanitize HTML for later interpretation. Be careful when setting text on script or style elements, where their contents have special meaning.

Do not encode text manually before assigning it to <code>textContent</code>. Pre-encoding can show entities such as <code>&amp;lt;</code> to the user and can cause confusion if the value is encoded again later.

## Avoid HTML string injection

This is unsafe when either value can be controlled by a user:

~~~js
const card = document.querySelector("#card");

card.innerHTML =
  "<p>" + userName + "</p><a href='" + userUrl + "'>Open</a>";
~~~

The browser parses the string as HTML. A value containing markup can change the page structure or add executable behavior. Quotes and angle brackets are only part of the parsing rules, so trying to remove a few characters is not a reliable repair.

Common dangerous sinks include:

- <code>innerHTML</code>, <code>outerHTML</code>, and <code>insertAdjacentHTML()</code> when passed untrusted strings;
- <code>document.write()</code> with untrusted data;
- <code>eval()</code>, <code>Function()</code>, or string arguments to timer APIs;
- event-handler attributes such as <code>onclick</code> built from strings;
- URL attributes such as <code>href</code> or <code>src</code> without URL validation;
- APIs that parse CSS or markup from strings.

A sink is dangerous because it interprets input according to a grammar. What is safe depends on that destination. HTML text, HTML attributes, JavaScript, CSS, and URLs do not share one universal escaping rule.

### Do not rely on a blacklist

Removing the word "script", deleting angle brackets, or replacing one known payload is not sufficient. Browsers support many parsing forms, and new input can exploit a context you did not anticipate.

Input validation is still useful for application rules. For example, a quantity can be an integer within a range. But validation does not replace safe output handling. Every value should still be used in a way that keeps it in its intended context.

## Set safe properties and attributes

For a text value, use <code>textContent</code> or a well-defined property such as <code>input.value</code>. Keep attribute names and tag names fixed in code.

Setting a plain text attribute with a fixed name is different from letting data select an attribute:

~~~js
const note = document.querySelector("#note");
note.title = userProvidedText;
~~~

Do not use an untrusted value as an attribute name, event handler, or markup source. URL-bearing properties need URL validation even when assigned through JavaScript:

~~~js
link.href = userProvidedUrl;
~~~

This assignment alone does not decide whether the destination is allowed.

## Validate URL destinations

A URL can be syntactically valid but still be an unsafe destination. For example, an application may intend to allow web pages but should reject script or data schemes.

Parse the URL, then allow only schemes and destinations that the feature needs:

~~~js
function parseAllowedLink(value) {
  try {
    const url = new URL(value, document.baseURI);
    const isSameOrigin = url.origin === window.location.origin;
    const isSecureWebUrl = url.protocol === "https:";

    if (!isSameOrigin && !isSecureWebUrl) {
      return null;
    }

    if (url.username || url.password) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

const url = parseAllowedLink(userProvidedUrl);

if (url) {
  link.href = url.href;
  link.textContent = userProvidedLabel;
} else {
  link.textContent = "This destination is not allowed.";
}
~~~

This policy accepts same-origin links and HTTPS destinations. An application with stricter requirements should also allow-list specific origins. The right policy depends on what destinations the feature is meant to open.

URL encoding and URL validation solve different problems. Encoding protects a value placed into a URL component. Validation decides whether a destination is permitted. Do not treat either step as a substitute for safe handling in the surrounding HTML.

## When user-authored HTML is required

Some products intentionally let users format content. In that case, rendering plain text may not meet the feature requirement. Use a maintained HTML sanitizer with a restrictive configuration rather than writing a sanitizer with regular expressions.

~~~js
const cleanMarkup = sanitizer.sanitize(userAuthoredMarkup);
contentContainer.innerHTML = cleanMarkup;
~~~

Here, <code>sanitizer</code> stands for a vetted and maintained sanitization library configured for the application's allowed markup. This example is not safe if <code>sanitizer</code> is missing, misconfigured, or replaced by a function that returns its input unchanged.

Keep these rules in mind:

- sanitize only when the feature needs to preserve a limited set of HTML;
- use a maintained sanitizer and keep it updated;
- allow only the tags and attributes the feature needs;
- do not modify sanitized markup in a way that can add unsafe content afterward;
- do not use HTML sanitization as a replacement for URL allow-lists or other context-specific rules.

If the feature only needs plain text, use <code>textContent</code> instead.

## Client-side frameworks

Many frameworks escape text interpolations by default. Keep that protection enabled and use the framework's normal text rendering.

Review any escape hatch that inserts raw HTML or disables escaping. Such APIs are not automatically safe because the code is inside a framework. Sanitize user-authored HTML before using a raw-markup feature, and prefer a safe text API for ordinary values.

Avoid building HTML and then passing it to an unsafe sink just because a template or component generated the string. The final sink still determines how the browser interprets it.

## Content Security Policy

A Content Security Policy, or CSP, is a browser-enforced response policy that can restrict where scripts and other resources may load from. It can reduce the impact of some injection flaws, but it does not repair unsafe DOM updates or make untrusted markup safe.

A simple response header might start with a restrictive policy like this:

~~~http
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
~~~

A production policy must match the application's scripts, styles, images, connections, frames, and other required resources. Test it carefully before enforcing it. Avoid relaxing a policy with broad permissions such as <code>unsafe-inline</code> just to make an unsafe implementation work.

CSP belongs in an HTTP response header for a deployed application. A meta element cannot provide every CSP directive or the same protection.

## Trusted Types

Trusted Types can help larger applications find and restrict dangerous DOM injection sinks. When enforced with CSP, it can require specific typed values or policies before strings reach covered sinks such as markup parsing APIs.

Trusted Types does not sanitize content by itself. A policy must apply the correct validation or sanitization, and an overly permissive policy can remove the benefit. It is an additional enforcement tool, not a replacement for safe DOM APIs.

## Defense in depth

Use more than one layer:

1. Keep code and untrusted data separate.
2. Render plain text with text-oriented DOM APIs.
3. Validate values against the feature's rules, including URLs and numeric ranges.
4. Use contextual output encoding in server-rendered templates when a value must be placed into an interpreted context.
5. Sanitize only when user-authored HTML is a product requirement.
6. Add a tested CSP and, where appropriate, Trusted Types enforcement.
7. Keep dependencies and server frameworks updated.
8. Treat client-side validation as a usability feature, not a server security boundary.

Do not place secrets in client-side JavaScript. Anything shipped to the browser can be inspected by the visitor.

## Common mistakes

- Treating input from a URL or API as trusted because it did not come from a form.
- Concatenating user values into <code>innerHTML</code>.
- Trying to prevent XSS by removing a few suspicious characters.
- Using HTML escaping for a URL, JavaScript, or CSS context.
- Assuming <code>setAttribute()</code> validates a URL or makes every attribute safe.
- Putting user text in an event-handler attribute.
- Passing user-controlled strings to <code>eval()</code> or a string-based timer.
- Using a sanitizer when ordinary text rendering would work.
- Writing a home-made HTML sanitizer with regular expressions.
- Sanitizing markup and then appending untrusted markup afterward.
- Believing CSP or a framework makes every unsafe sink harmless.
- Treating client-side validation as a substitute for server-side validation and authorization.
- Storing authentication secrets in JavaScript-accessible storage without considering the XSS risk.

## Key points

- Keep untrusted data as data. Do not let it become markup or executable code.
- Use <code>textContent</code> and DOM construction for plain text and elements.
- Avoid unsafe HTML parsing and code execution sinks with untrusted values.
- Validate URL protocols and, when practical, allow-list destinations.
- Encoding must match the exact output context.
- Use a maintained sanitizer only when users are meant to author HTML.
- CSP and Trusted Types can add defense in depth, but neither replaces safe coding.
- Validate and authorize sensitive actions on the server as well as in the browser.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [118 - Accessibility, keyboard interaction, and dynamic content](118-accessibility-keyboard-interaction-and-dynamic-content.md) | [Open Q&A](../qnas/119-browser-security-xss-injection-and-safe-dom-updates.md) | [Open example](../examples/119-browser-security-xss-injection-and-safe-dom-updates.md) | [120 - Web Crypto and secure random values](120-web-crypto-and-secure-random-values.md) |
