# 12. Loading scripts and external resources

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Metadata and the document head](./11-metadata-and-the-document-head.md) | [Notes index](../README.md) | [Next: Native interactive elements](./13-native-interactive-elements.md) |

## Link a stylesheet

Use link in head to connect an external stylesheet to the document.

~~~html
<head>
  <link rel="stylesheet" href="./styles.css" />
</head>
~~~

Keeping CSS in a separate file makes it easier to organize and reuse presentation. The browser resolves the href relative to the HTML document URL.

## Load a classic script with defer

A deferred classic script downloads while the browser parses HTML and runs after parsing completes. Deferred scripts run in document order.

~~~html
<head>
  <script src="./app.js" defer></script>
</head>
~~~

With defer, the script can find elements from the parsed document without blocking parsing while it downloads. Use this for application code that should run after HTML parsing.

## Use async only when order does not matter

An async script runs as soon as it has downloaded. Its execution order is not guaranteed relative to other async scripts or document parsing.

~~~html
<script src="https://example.com/independent-widget.js" async></script>
~~~

Use async only when the script is independent of other scripts and page parsing order. Do not use it when another script must run first or when the code expects all page elements to exist.

## Load a JavaScript module

Module scripts use type="module" and are deferred by default.

~~~html
<script type="module" src="./main.js"></script>
~~~

Modules can use import and export. They run in strict mode and follow module loading rules. A module script should not also need defer for the usual after-parsing behavior.

## Keep script behavior out of HTML attributes

Attach behavior from JavaScript instead of using inline event attributes such as onclick.

~~~html
<button type="button" id="save-button">Save</button>
<script type="module" src="./main.js"></script>
~~~

~~~js
const saveButton = document.querySelector("#save-button");

saveButton.addEventListener("click", () => {
  console.log("Save requested");
});
~~~

This keeps structure and behavior separate and lets the same event logic be organized in JavaScript files.

## Explain when a page needs scripts

noscript content is shown when scripting is disabled. Use it when the page needs to tell the user that a feature requires scripts or provide a useful fallback.

~~~html
<noscript>
  <p>Enable JavaScript to use the interactive map.</p>
</noscript>
~~~

Do not use noscript as a replacement for making the main content available. A static page can often remain useful even when scripting is unavailable.

## Practice questions

1. Which element links an external stylesheet?
2. When does a deferred classic script run?
3. Do deferred classic scripts preserve their document order?
4. How does async script execution differ from defer?
5. When is async a suitable choice?
6. What does type="module" enable?
7. Why attach event listeners in JavaScript instead of inline onclick?
8. What is a useful purpose for noscript?

## Main references

- [Applying CSS and JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata#applying_css_and_javascript_to_html)
- [The script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)
- [Script loading strategies](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript#script_loading_strategies)
- [The link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)
- [The noscript element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noscript)