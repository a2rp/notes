# Example 05 - Elements, tags, and attributes

## Question

Create a complete HTML page that shows how elements, tags, and attributes fit together. Include a link with a destination and a button with a Boolean attribute.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Elements, Tags, and Attributes</title>
  </head>
  <body>
    <main>
      <h1>Elements, tags, and attributes</h1>
      <p id="introduction" class="intro">
        HTML elements describe the roles of content on a page.
      </p>

      <section aria-labelledby="link-heading">
        <h2 id="link-heading">A link element</h2>
        <p>
          This link has an <code>href</code> attribute that provides its
          destination:
        </p>
        <p>
          <code>&lt;a href="https://example.com/"&gt;Visit Example&lt;/a&gt;</code>
        </p>
        <a class="resource-link" href="https://example.com/">Visit Example</a>
      </section>

      <section aria-labelledby="button-heading">
        <h2 id="button-heading">A Boolean attribute</h2>
        <p>
          The button below has the <code>disabled</code> attribute, so it
          cannot be activated.
        </p>
        <button type="button" disabled>Unavailable</button>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Elements, Tags, and Attributes**. The page displays a main heading, an introductory paragraph, a section with a link example and a clickable **Visit Example** link, then a section with a disabled **Unavailable** button.

The markup for the link is visible as text inside the first section. The browser uses its default styling because this document contains no CSS.

## Explanation

- An **element** is the complete unit of markup. For example, the anchor element includes its start tag, link text, and end tag.
- The start tag `<a href="https://example.com/">` contains the element name `a` and an `href` attribute. The end tag `</a>` closes the element.
- The text between the anchor's start and end tags is its content. The `href` value tells the browser where the link goes.
- The `id` and `class` attributes appear in the paragraph's start tag. They provide information about that paragraph but do not add visible text by themselves.
- The `type` attribute sets the button type. The Boolean `disabled` attribute is on because it is present, so the button cannot be activated.
- The code-like link is shown as text because its angle brackets are written with the character references `&lt;` and `&gt;`.
- Attribute names and values belong inside a start tag. In this example, values are consistently enclosed in double quotes.

## How to try it

Copy the HTML code block using its copy button, save it as `elements-practice.html`, and open it in a browser. Change the link text or destination. Remove the `disabled` attribute from the button and compare the result.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 05 - Elements, tags, and attributes](../lessons/05-elements-tags-and-attributes.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [04 - Doctype and browser rendering modes](04-doctype-and-rendering-modes.md) | [Lesson](../lessons/05-elements-tags-and-attributes.md) | [Q&A](../qnas/05-elements-tags-and-attributes.md) | [06 - Nesting, void elements, and HTML syntax](06-nesting-and-html-syntax.md) |
