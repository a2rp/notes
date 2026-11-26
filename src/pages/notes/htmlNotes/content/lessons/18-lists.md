# 18 - Unordered, ordered, and description lists

Lists group related items. HTML has different list elements for items whose order does not matter, items whose order does matter, and terms paired with their descriptions or values. Choose the list type based on the relationship between the items.

## What you will learn

- When to use `ul`, `ol`, and `dl`.
- How `li`, `dt`, and `dd` structure list items.
- How to create a nested list.
- How to adjust the starting or direction of an ordered list.
- How to choose list semantics instead of using visual formatting alone.

## Unordered lists with ul

Use `ul` when the items are related, but changing their order would not change their meaning.

~~~html
<h2>Topics in this guide</h2>
<ul>
  <li>Headings</li>
  <li>Paragraphs</li>
  <li>Links</li>
</ul>
~~~

The browser usually shows a marker such as a bullet for each item. That default marker is a visual style. Use `ul` because the items do not have a required sequence, not just because you want bullets.

Each item in a `ul` is marked with an `li` element.

## Ordered lists with ol

Use `ol` when the sequence matters, such as instructions, a ranked list, or a timeline.

~~~html
<h2>Steps to create a page</h2>
<ol>
  <li>Create an HTML file.</li>
  <li>Add the document structure.</li>
  <li>Open the file in a browser.</li>
</ol>
~~~

Browsers number the items by default. The numbering comes from the list structure, so you do not have to type the numbers into each item.

### Starting and reversing numbering

The `start` attribute sets the first number:

~~~html
<ol start="4">
  <li>Check the page title.</li>
  <li>Test the links.</li>
</ol>
~~~

This list starts at 4 and continues with 5. The `reversed` attribute counts down:

~~~html
<ol reversed>
  <li>Third place</li>
  <li>Second place</li>
  <li>First place</li>
</ol>
~~~

Use these attributes when the numbering itself has meaning. If you only want a different marker style, CSS is usually a better choice.

## List items and nested lists

An `li` represents one item in an ordered or unordered list. Its content can include paragraphs and other suitable flow content.

A nested list belongs inside the `li` item it explains:

~~~html
<ul>
  <li>
    Text elements
    <ul>
      <li>Headings</li>
      <li>Paragraphs</li>
    </ul>
  </li>
  <li>Links</li>
</ul>
~~~

The nested list describes parts of “Text elements”. Keep it inside that parent list item so the relationship is clear in both the markup and the rendered page.

## Description lists with dl

Use `dl` for groups of names and their associated descriptions, definitions, or values. Each name or term uses `dt`; each description or value uses `dd`.

~~~html
<dl>
  <dt>HTML</dt>
  <dd>A markup language used to structure web content.</dd>

  <dt>CSS</dt>
  <dd>A style language used to control how web content is presented.</dd>
</dl>
~~~

A description list is not limited to dictionary definitions. It can also represent metadata, such as labels and values, or questions paired with answers.

~~~html
<dl>
  <dt>Author</dt>
  <dd>A. Writer</dd>

  <dt>Published</dt>
  <dd>November 2026</dd>
</dl>
~~~

A `dt` can have more than one associated `dd`, and multiple terms can share a description when the content calls for it. Keep the grouping clear so readers can tell which descriptions belong to which terms.

Do not choose `dl` only to get indentation or a particular font style. Choose it when the content is genuinely organized as names and descriptions or values.

## A complete example

~~~html
<main>
  <h1>Planning a simple web page</h1>

  <h2>Files you need</h2>
  <ul>
    <li>An HTML document</li>
    <li>A browser for viewing the page</li>
  </ul>

  <h2>Build the page</h2>
  <ol>
    <li>Create a file named index.html.</li>
    <li>Add a heading and a paragraph.</li>
    <li>Open the file in your browser.</li>
  </ol>

  <h2>Terms</h2>
  <dl>
    <dt>Element</dt>
    <dd>A part of an HTML document identified by markup.</dd>
    <dt>Browser</dt>
    <dd>Software that loads and displays web content.</dd>
  </dl>
</main>
~~~

The unordered list groups materials whose order does not matter. The ordered list represents steps that should be followed in sequence. The description list pairs terms with explanations.

## Common mistakes

- Using `ul` when the item order changes the instructions or meaning.
- Using `ol` only to get numbered-looking markers when order is not meaningful.
- Typing numbers into list text instead of letting `ol` provide the numbering.
- Placing a nested list outside the `li` item it belongs to.
- Using `dt` or `dd` outside a `dl`.
- Using `dl` only for indentation or styling.
- Making a fake list with hyphens and line breaks instead of list elements.
- Putting unrelated content into one list just to make it look grouped.

## Try it yourself

1. Make an unordered list of three things you need to study HTML.
2. Write an ordered list of four steps for opening an HTML file in a browser.
3. Add a nested list of topics under one of your study items.
4. Create a description list with three HTML terms and their meanings.
5. Use `start` to make an ordered list begin at 5.
6. Decide whether a list of recipe ingredients should use `ul` or `ol`, then explain why.
7. Decide whether recipe instructions should use `ul` or `ol`, then explain why.
8. Review a list you have written and check that its type represents the relationship between its items.

## Key points

- Use `ul` when order does not matter.
- Use `ol` when order is meaningful.
- Use `li` for an item in an ordered or unordered list.
- Put a nested list inside the list item it elaborates.
- Use `dl` with `dt` and `dd` for terms paired with descriptions or values.
- Select list elements for their meaning, then use CSS for visual styling.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [17 - Navigation and linking between pages](17-navigation-and-page-links.md) | [Q&A](../qnas/18-lists.md) | [Example](../examples/18-lists.md) | [19 - Images and alternative text](19-images-and-alt-text.md) |
