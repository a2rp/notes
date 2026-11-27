# 02. Elements, attributes, and nesting

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: HTML document structure and first page](./01-html-document-structure-and-first-page.md) | [Notes index](../README.md) | [Next: Text, headings, and lists](./03-text-headings-and-lists.md) |

## Read an HTML element

A tag is markup such as <p> or </p>. An element includes its opening tag, content, and closing tag.

~~~html
<p>HTML gives this sentence paragraph meaning.</p>
~~~

Some elements are empty and do not wrap content. They are called void elements and do not have a closing tag.

~~~html
<img src="desk.jpg" alt="A notebook beside a laptop" />
<br />
<input type="email" name="email" />
~~~

Common void elements include img, br, input, meta, and link. Do not add a closing tag to a void element.

## Add attributes

Attributes give an element additional information. They appear in the opening tag as a name and value.

~~~html
<a href="https://developer.mozilla.org/">Read the HTML reference</a>
~~~

Here, a is the element, href is the attribute name, and the URL is its value. Quote attribute values. Quoted values can safely contain spaces and make markup easier to read.

## Nest elements in the correct order

An element can contain other elements when its content model allows them. Close the inner element before closing its parent.

~~~html
<p>Read the <strong>important</strong> part carefully.</p>
~~~

This example is correctly nested. Incorrectly overlapping tags can produce an unexpected document tree, even when the browser tries to repair the markup.

## Understand boolean attributes

A boolean attribute is enabled by its presence. Its value is not a string switch.

~~~html
<input type="text" required />
<button type="button" disabled>Unavailable</button>
~~~

To disable a boolean attribute, remove it. Writing disabled="false" still enables disabled because the attribute is present.

## Use attribute names consistently

HTML attribute names are not case-sensitive in normal HTML documents, but lowercase names are the standard style. Many attributes also have rules about which elements accept them and which values are valid.

Use the reference for an unfamiliar element or attribute rather than guessing. The browser may accept invalid markup, but its correction can hide the mistake.

## Practice questions

1. What is the difference between a tag and an element?
2. What makes an HTML element a void element?
3. Name three common void elements.
4. Where are attributes written?
5. What information does href give to an anchor?
6. What does correct nesting mean?
7. How is a boolean attribute enabled?
8. Why does disabled="false" still disable a button?

## Main references

- [HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
- [HTML attributes reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes)
- [Void elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element)