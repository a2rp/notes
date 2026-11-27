# 15. Global attributes and data attributes

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Accessibility and ARIA basics](./14-accessibility-and-aria-basics.md) | [Notes index](../README.md) | [Next: Validation, testing, and release checks](./16-validation-testing-and-release-checks.md) |

## Use common global attributes

Global attributes are available on many HTML elements. Common examples include id, class, lang, dir, hidden, title, and tabindex.

~~~html
<article id="spring-plan" class="note-card" lang="en">
  <h2>Spring plan</h2>
  <p>Prepare the soil before planting.</p>
</article>
~~~

id identifies one element and should be unique in the document. class groups elements for CSS or JavaScript. lang identifies the language of the text. dir can set text direction when the language or content requires it.

## Use hidden for content that should not be rendered

The hidden boolean attribute indicates that content is not currently relevant and should not be rendered.

~~~html
<p hidden>This message is not currently shown.</p>
~~~

Remove hidden when the content should appear. Do not use it for content that should remain available to screen reader users but be visually hidden; that needs a separate visually-hidden styling pattern.

## Use tabindex carefully

Native interactive elements are already keyboard focusable. tabindex="0" can make a non-interactive element reachable in the normal keyboard order when there is a clear interaction need. tabindex="-1" allows programmatic focus without adding the element to the normal Tab order.

Avoid positive tabindex values because they create a separate order that can conflict with the document order.

## Store component data with data attributes

data-* attributes let markup carry custom string data for scripts.

~~~html
<button
  type="button"
  data-action="archive"
  data-note-id="42"
>
  Archive note
</button>
~~~

~~~js
const archiveButton = document.querySelector("[data-action='archive']");

console.log(archiveButton.dataset.action);
console.log(archiveButton.dataset.noteId);
~~~

The HTML attribute data-note-id becomes the JavaScript property dataset.noteId. Dataset values are strings. Use standard HTML attributes for built-in behavior, and data attributes for application-specific data.

## Do not rely on title for an important label

title may provide advisory information, but it is not a reliable replacement for visible text or a form label. Important instructions should be visible and connected to the relevant control.

## Practice questions

1. Which attributes are commonly available on many HTML elements?
2. What should be true about an id value?
3. What does class commonly group?
4. What does hidden do?
5. How does tabindex="0" differ from tabindex="-1"?
6. Why should positive tabindex values be avoided?
7. How does data-note-id appear through dataset?
8. Why should title not replace a visible label?

## Main references

- [Global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes)
- [The id global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/id)
- [The hidden global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden)
- [The tabindex global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex)
- [Use data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes)