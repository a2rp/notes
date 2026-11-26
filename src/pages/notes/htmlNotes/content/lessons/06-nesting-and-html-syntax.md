# 06 - Nesting, void elements, and HTML syntax

HTML documents are made from elements placed inside other elements. Correct nesting shows how parts of a page relate to each other. Some elements contain content and have an end tag, while void elements do not contain content and must not have an end tag.

## What you will learn

By the end of this chapter, you should be able to:

- Read parent, child, and sibling relationships between elements.
- Nest elements and close them in the correct order.
- Recognize common void elements and write them without end tags.
- Avoid treating an HTML start tag as XML self-closing syntax.
- Use indentation and consistent lowercase syntax to make source easier to read.
- Understand that browsers can recover from some mistakes, but should not be relied on to fix markup.

## Elements form a tree

An HTML page is not just a list of tags. Elements can contain other elements, creating a hierarchy:

~~~html
<main>
  <h1>Garden notes</h1>
  <p>Ideas for the <strong>spring garden</strong>.</p>
</main>
~~~

In this example:

- `main` is the parent of the `h1` and `p` elements.
- `h1` and `p` are children of `main`.
- `h1` and `p` are siblings because they share the same parent.
- `strong` is a child of `p`.

The document tree can be pictured like this:

~~~text
main
├── h1
└── p
    └── strong
~~~

These relationships come from the tags. Indentation makes the hierarchy visible to a person reading the file, but spaces do not create the relationships.

## Nest elements in the correct order

When one element is inside another, close the inner element before closing the outer element. This is called properly nesting the elements:

~~~html
<p>Read the <strong>important note</strong> before continuing.</p>
~~~

The `strong` element starts inside the paragraph and ends before the paragraph ends. Its tags form a complete pair within the `p` element.

When elements are nested more than one level deep, close them in the reverse order from which they were opened:

~~~html
<p><em><strong>Important text</strong></em></p>
~~~

The tags open in this order: `p`, `em`, `strong`. They close in the reverse order: `strong`, `em`, `p`.

This markup is incorrectly nested:

~~~html
<p><strong>Important text</p></strong>
~~~

The paragraph ends before the strong element. The closing tags do not match the nesting order.

Correct it by closing `strong` first:

~~~html
<p><strong>Important text</strong></p>
~~~

## Use elements that can contain the content

Elements have rules about what kinds of content they can contain. For example, a list contains list items, and a paragraph can contain text and inline phrasing elements such as emphasis:

~~~html
<ul>
  <li>Water the seedlings</li>
  <li><em>Check the soil first</em></li>
</ul>
~~~

Here, each `li` is inside the `ul`, and the `em` element is inside the second list item.

Do not put a list directly inside a paragraph. End the paragraph before starting the list:

~~~html
<p>Here are the tasks for today:</p>
<ul>
  <li>Water the seedlings</li>
  <li>Remove dry leaves</li>
</ul>
~~~

Choose a structure that matches the content. Later lessons explain particular elements and their content rules in more detail.

## Some elements do not have end tags

Many elements contain text or other elements and use both a start tag and an end tag. A **void element** cannot contain child content and does not have an end tag.

Common void elements include:

- `area`
- `base`
- `br`
- `col`
- `embed`
- `hr`
- `img`
- `input`
- `link`
- `meta`
- `source`
- `track`
- `wbr`

For example, an image uses a single start tag:

~~~html
<img src="garden.jpg" alt="A small garden with raised beds">
~~~

A line break also uses a void element:

~~~html
<p>First line<br>Second line</p>
~~~

Do not add end tags for void elements:

~~~html
<img src="garden.jpg" alt="A small garden with raised beds">
~~~

The browser understands that `img` is void. There is no `</img>` tag.

## Do not confuse HTML with XML self-closing syntax

In HTML, a trailing slash on a void element is unnecessary:

~~~html
<img src="garden.jpg" alt="A garden" />
~~~

For a document served as HTML, the slash does not change the meaning of the tag. The simple HTML form is:

~~~html
<img src="garden.jpg" alt="A garden">
~~~

A normal element is not made empty by adding a slash. Write its end tag explicitly:

~~~html
<p>This paragraph has an end tag.</p>
~~~

Do not use `<p/>` as a substitute for `<p></p>` in HTML. HTML parsing does not use that slash to close a normal paragraph element.

## Write clear, consistent source

HTML is case-insensitive for tag names, but lowercase is the common style:

~~~html
<h2>Project notes</h2>
~~~

Use indentation to show each level of nesting:

~~~html
<main>
  <section>
    <h2>Tasks</h2>
    <ul>
      <li>Read the instructions</li>
      <li>Complete the example</li>
    </ul>
  </section>
</main>
~~~

Each child level is indented consistently. This makes it easier to check that every start tag has the intended end tag.

Whitespace in the source helps people read the file. The tags, not the indentation, determine which elements contain others.

## Browsers may repair mistakes, but do not rely on that

Browsers are designed to display many imperfect pages. When markup is invalid, a browser may infer missing tags or rearrange parts of the document while parsing it. The result can be different from what the author intended.

For example, a missing end tag can make it hard to see where one element ends and another begins. Even if the browser displays the page, write clear and correctly nested markup so the source has a predictable structure.

Use a validator or inspect the browser's developer tools when you need help finding structural errors. Later chapters cover validation and debugging.

## A complete example

This page uses nested elements and void elements:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Weekend garden plan</title>
</head>
<body>
  <main>
    <h1>Weekend garden plan</h1>
    <p>Bring <strong>gloves</strong> and a water bottle.</p>
    <hr>
    <ul>
      <li>Plant the herbs</li>
      <li>Water the seedlings<br>before midday</li>
    </ul>
    <img src="herbs.jpg" alt="Fresh herbs growing in a pot">
  </main>
</body>
</html>
~~~

The `main` element contains the heading, paragraph, horizontal rule, list, and image. Each list item is inside the unordered list. The `strong` element is inside the paragraph. The `hr`, `br`, and `img` elements are void, so they have no end tags.

## Common mistakes

- **Closing elements in the wrong order.** Close the most recently opened non-void element first.
- **Putting child elements in the wrong parent.** A list item belongs inside a list, not directly inside a paragraph.
- **Adding an end tag to a void element.** Elements such as `img`, `br`, `hr`, and `input` do not have end tags.
- **Using a slash to close a normal HTML element.** Write an explicit end tag such as `</p>`.
- **Treating indentation as structure.** Indentation helps people read the source; tags establish the tree.
- **Relying on browser repair.** Browsers may recover from invalid markup, but their correction may not match the intended structure.
- **Using inconsistent casing or indentation.** Lowercase tags and consistent indentation make nesting easier to inspect.

## Try it yourself

1. In the garden example, identify the parent of the `ul` element and the parent of each `li`.
2. Rewrite `<p><em><strong>Read this</strong></em></p>` on separate, consistently indented lines.
3. Fix `<p><strong>Check this note</p></strong>` by nesting the elements correctly.
4. Write a list with two list items, each containing a short phrase.
5. Add an image with a source and meaningful alternative text. Do not add an end tag.
6. Write a paragraph with a line break between two short lines.
7. Explain why `<section/>` does not replace a normal opening and closing pair in HTML.

## Key points

- Elements form a tree of parent, child, and sibling relationships.
- Close nested elements in the reverse order from which they were opened.
- A void element has no content and no end tag.
- Common void elements include `img`, `br`, `hr`, `input`, `meta`, and `link`.
- In HTML, a trailing slash does not close a normal element.
- Indentation helps people read the structure, but tags define it.
- Browser recovery is not a substitute for valid, clearly nested markup.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [05 - Elements, tags, and attributes](05-elements-tags-and-attributes.md) | [Q&A](../qnas/06-nesting-and-html-syntax.md) | [Example](../examples/06-nesting-and-html-syntax.md) | [07 - Global attributes](07-global-attributes.md) |
