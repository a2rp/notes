# 04. Links, paths, and navigation

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Text, headings, and lists](./03-text-headings-and-lists.md) | [Notes index](../README.md) | [Next: Images, figures, and responsive sources](./05-images-figures-and-responsive-sources.md) |

## Create a link with an anchor

The a element creates a hyperlink when it has an href attribute. Link text should describe the destination or action.

~~~html
<a href="./about.html">Read about this project</a>
<a href="https://developer.mozilla.org/">Open the HTML reference</a>
~~~

Do not use vague link text such as "click here" when the destination can be named. Clear text helps people scan a page and understand links out of context.

## Use relative and absolute URLs

A relative URL is resolved from the current document location. An absolute URL includes the scheme and host.

~~~html
<a href="./contact.html">Contact</a>
<a href="../index.html">Return to the parent folder</a>
<a href="https://example.com/guide">Open an external guide</a>
~~~

Paths and filename capitalization must match the deployed files. A local file system may hide a capitalization mismatch that fails on a case-sensitive web host.

## Link to a section on the same page

Give the destination element an id, then use that id after a hash in href.

~~~html
<nav aria-label="On this page">
  <a href="#requirements">Requirements</a>
  <a href="#contact">Contact</a>
</nav>

<section id="requirements">
  <h2>Requirements</h2>
  <p>Review the information before submitting.</p>
</section>

<section id="contact">
  <h2>Contact</h2>
  <p>Send a message to the project team.</p>
</section>
~~~

Each id should be unique within the document. A fragment link moves the browser to the element whose id matches the fragment.

## Build a navigation region

Use nav for a major group of links. Add an accessible label when a page has more than one navigation region.

~~~html
<nav aria-label="Primary">
  <ul>
    <li><a href="./index.html" aria-current="page">Home</a></li>
    <li><a href="./notes.html">Notes</a></li>
    <li><a href="./contact.html">Contact</a></li>
  </ul>
</nav>
~~~

aria-current="page" identifies the link for the current page. Do not use a button for navigation when an anchor expresses the destination.

## Open a new tab deliberately

target="_blank" opens a new browsing context. If it is necessary, make the behavior clear and include rel="noopener" for a safe opener relationship.

~~~html
<a href="https://example.com/report" target="_blank" rel="noopener">
  Read the report in a new tab
</a>
~~~

Most links should open in the current tab unless there is a good reason to open another one.

## Practice questions

1. Which element creates a hyperlink?
2. What makes link text useful when scanned outside its paragraph?
3. How is a relative URL resolved?
4. What does a hash fragment in href target?
5. Why should ids be unique?
6. When is nav appropriate?
7. When should an anchor be used instead of a button?
8. What should be considered before opening a link in a new tab?

## Main references

- [Creating hyperlinks](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links)
- [The a element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a)
- [The nav element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)
- [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target)