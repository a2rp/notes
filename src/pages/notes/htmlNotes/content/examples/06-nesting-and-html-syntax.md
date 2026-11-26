# Example 06 - Nesting, void elements, and HTML syntax

## Question

Create a complete HTML page for a weekend garden plan. Nest the content in a clear hierarchy, use emphasis inside text, make a short task list, and include void elements without end tags.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weekend Garden Plan</title>
  </head>
  <body>
    <main>
      <h1>Weekend garden plan</h1>
      <p>
        Bring <strong>gloves</strong> and a water bottle before starting.
      </p>

      <hr>

      <section aria-labelledby="tasks-heading">
        <h2 id="tasks-heading">Garden tasks</h2>
        <p>Start with the <em>most important</em> jobs:</p>
        <ul>
          <li><strong>Plant</strong> the herbs.</li>
          <li>
            Water the seedlings<br>
            before midday.
          </li>
        </ul>
      </section>

      <section aria-labelledby="finish-heading">
        <h2 id="finish-heading">Before you finish</h2>
        <p>Put the tools away and check the soil around each plant.</p>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Weekend Garden Plan**. The page displays a main heading, a short paragraph, a horizontal divider, and a section with a smaller heading and two garden tasks. **gloves** and **Plant** appear bold by default, while **most important** appears italic. The second task displays on two lines because it contains a line break.

The browser applies its built-in styles because the document contains no CSS.

## Explanation

- The document tree begins with `html`. Its child elements `head` and `body` are indented one level inside it.
- `main` contains the primary page content. The two `section` elements are children of `main`, and each section contains its own heading and content.
- The `ul` element contains two `li` elements. Each list item is a child of the list, and both list items are siblings.
- `strong` and `em` are nested inside paragraphs or list items. Their end tags appear before the parent element's end tag.
- `meta`, `hr`, and `br` are void elements. They do not have end tags. The `br` element creates a line break, and `hr` marks a thematic break.
- The indentation makes the nesting visible to a person reading the source. The tags establish the actual parent and child relationships.

## How to try it

Copy the HTML code block using its copy button, save it as `garden-plan.html`, and open it in a browser. Add another task inside the `ul`. Keep the new `li` inside that list, and close any nested elements in reverse order from how they were opened.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 06 - Nesting, void elements, and HTML syntax](../lessons/06-nesting-and-html-syntax.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [05 - Elements, tags, and attributes](05-elements-tags-and-attributes.md) | [Lesson](../lessons/06-nesting-and-html-syntax.md) | [Q&A](../qnas/06-nesting-and-html-syntax.md) | [07 - Global attributes](07-global-attributes.md) |
