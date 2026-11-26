# 05 - Elements, tags, and attributes

HTML describes page content with elements. Tags mark where elements begin and end, while attributes add information to an element or configure it. Learning to tell these parts apart makes HTML easier to read and write.

## What you will learn

By the end of this chapter, you should be able to:

- Identify an element, its start tag, its end tag, and its content.
- Read an element name and recognize the role it describes.
- Identify an attribute name and its value.
- Write common attributes with clear, quoted values.
- Recognize Boolean attributes and understand that their presence matters.
- Avoid confusing HTML meaning with the browser's default appearance.

## Start with one element

Here is a paragraph element:

~~~html
<p>HTML gives this text paragraph meaning.</p>
~~~

It has three main parts:

- The start tag: `<p>`
- The content: `HTML gives this text paragraph meaning.`
- The end tag: `</p>`

The complete structure, including its start tag, content, and end tag, is the paragraph **element**. In everyday conversation, people sometimes use "tag" to mean the whole element, but the terms describe different parts.

A heading works the same way:

~~~html
<h1>My HTML notes</h1>
~~~

Here, `<h1>` is the start tag, `My HTML notes` is the content, `</h1>` is the end tag, and the complete unit is the heading element.

## Read the parts of a tag

A tag is written between angle brackets. The tag name identifies the kind of element:

~~~html
<p>First paragraph.</p>
~~~

In this example:

- `<` and `>` mark the start tag.
- `p` is the element name.
- The slash in `</p>` marks the end tag.

The start and end tags use the same element name. The end tag adds a slash before the name. Do not add a slash before the name in a start tag:

~~~html
<p>Correct start tag</p>
~~~

The browser reads the markup and creates the corresponding elements. For example, the `p` element identifies a paragraph, while `h1` identifies a top-level heading. These names describe the content's role. They are not merely instructions to make text look a certain way.

## Element meaning is different from appearance

Browsers apply default styles to many elements. A heading often appears larger and bolder than a paragraph, but the HTML's main job is to identify its meaning:

~~~html
<h1>Page title</h1>
<p>Supporting information for the page.</p>
~~~

The browser can present the heading and paragraph differently by default. CSS can change their appearance, but styling a paragraph to look large does not turn it into a heading. Choose an element for the content's purpose.

HTML element names are case-insensitive, but lowercase is the usual style:

~~~html
<p>This is easy to scan.</p>
~~~

Use lowercase consistently so the source looks predictable and matches common examples.

## What is an attribute?

An attribute adds information to an element or configures one of its features. It is written inside the start tag:

~~~html
<a href="https://example.com/">Visit Example</a>
~~~

In this link:

- `a` is the element name.
- `href` is the attribute name.
- `https://example.com/` is the attribute value.
- `Visit Example` is the link text between the tags.

The whole `href="https://example.com/"` part is an attribute. It belongs to the anchor element because it appears in the anchor's start tag.

Attributes do different jobs depending on the element. For example:

~~~html
<html lang="en">
<img src="photo.jpg" alt="A red bicycle leaning against a wall">
<button type="button">Show details</button>
~~~

- `lang` identifies the language of the document.
- `src` gives an image's source location.
- `alt` provides a text alternative for an image.
- `type` sets a button's type.

Some attributes can be used on many elements, while others only apply to particular elements. Later chapters cover global attributes, links, images, and buttons in more detail.

## Attribute names and values

A common attribute pattern is:

~~~html
name="value"
~~~

Write the attribute name, an equals sign, then its value. For example:

~~~html
<p class="intro">Welcome to my notes.</p>
~~~

Here, `class` is the attribute name and `intro` is its value. The attribute is part of the `p` start tag. It does not replace the element name or the paragraph content.

Use quotes around attribute values. Double quotes are common and easy to recognize:

~~~html
<p title="A short note for readers">Search for HTML basics.</p>
~~~

Single quotes are also valid:

~~~html
<a href='https://example.com/'>Visit Example</a>
~~~

HTML permits some simple values without quotes, but quoting values consistently makes the source clearer and avoids errors when a value contains spaces. Do not omit quotes just because a short example happens to work without them.

## Attributes belong in the start tag

Put an attribute before the closing angle bracket of the start tag:

~~~html
<p class="notice">The class is in the start tag.</p>
~~~

This is not the right place for an attribute:

~~~html
</p class="notice">
~~~

The end tag closes the element. It does not repeat the start tag's attributes.

An element can have more than one attribute. Separate attributes with spaces:

~~~html
<a class="resource-link" href="https://example.com/">Read the resource</a>
~~~

The order of different attributes usually does not change their meaning. This is equivalent:

~~~html
<a href="https://example.com/" class="resource-link">Read the resource</a>
~~~

For clarity, do not repeat the same attribute on one element.

## Boolean attributes

Some attributes are Boolean. Their presence means the setting is on, and leaving them out means it is off:

~~~html
<input type="email" required>
<button type="button" disabled>Unavailable</button>
~~~

The first control is required. The button is disabled. A Boolean attribute does not need a value such as `true`.

Do not write `disabled="false"` to enable a button. In HTML, the attribute is still present, so the button remains disabled. Remove the attribute to make it absent:

~~~html
<button type="button">Available</button>
~~~

This chapter introduces the idea of Boolean attributes. Later form lessons explain where attributes such as `required` and `disabled` are useful.

## A complete example

The attributes in this page add information to specific elements:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HTML building blocks</title>
</head>
<body>
  <h1 class="page-title">Elements and attributes</h1>
  <p id="introduction">An element describes a kind of content.</p>
  <a href="https://example.com/html-guide">Read an HTML guide</a>
</body>
</html>
~~~

For example, `lang="en"` is an attribute on the `html` start tag, `class="page-title"` is an attribute on the heading, and `href` is an attribute on the link. The heading, paragraph, and link text are content between tags.

The browser uses these elements and attributes to understand the document. Their default colors, sizes, and spacing are presentation details.

## Common mistakes

- **Calling an attribute an element.** In `<a href="https://example.com/">Visit</a>`, the element is the whole anchor. `href` is one of its attributes.
- **Putting an attribute outside the tag.** Write `class="intro"` before the `>` in the start tag.
- **Putting an attribute in the end tag.** Attributes belong in the start tag.
- **Leaving off quotes around a value.** Quote values consistently, especially when they contain spaces.
- **Using a slash in the wrong place.** The slash in `</p>` marks an end tag. It does not belong before the name in the `<p>` start tag.
- **Using an element only for its default look.** Choose elements for their purpose. CSS is responsible for changing appearance.
- **Writing `disabled="false"`.** A present Boolean attribute is on, regardless of the text in its value. Remove the attribute to turn it off.
- **Repeating the same attribute.** Keep one copy of each attribute name on an element.

## Try it yourself

1. Identify the start tag, content, and end tag in `<p class="note">Read this carefully.</p>`.
2. In `<a href="https://example.com/">Open Example</a>`, identify the element name, attribute name, attribute value, and link text.
3. Add a `lang` attribute to an `html` start tag for an English document.
4. Add a `class` attribute with the value `important` to a paragraph.
5. Write an image element with `src="flower.jpg"` and an appropriate `alt` value.
6. Explain why `disabled="false"` still leaves a button disabled.
7. Rewrite the examples with lowercase element names and consistently quoted values.

## Key points

- An element is the complete unit of markup, including its tags and content.
- A start tag begins an element. An end tag uses a slash before the element name.
- An attribute is written in a start tag and supplies information or settings for its element.
- Attribute values should be quoted consistently.
- Boolean attributes are on when present and off when absent.
- Element meaning comes from the HTML element, not from its default visual style.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [04 - Doctype and browser rendering modes](04-doctype-and-rendering-modes.md) | [Q&A](../qnas/05-elements-tags-and-attributes.md) | [Example](../examples/05-elements-tags-and-attributes.md) | [06 - Nesting, void elements, and HTML syntax](06-nesting-and-html-syntax.md) |
