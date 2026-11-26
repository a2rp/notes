# Example 04 - Doctype and browser rendering modes

## Question

Create a complete HTML page that starts with the modern doctype. Make the page explain what the declaration does and show its written form as visible text.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Doctype Practice</title>
  </head>
  <body>
    <main>
      <h1>Why a doctype matters</h1>
      <p>This document starts with the modern HTML doctype.</p>

      <section>
        <h2>The declaration</h2>
        <p>
          Write <code>&lt;!doctype html&gt;</code> at the beginning of a new
          HTML document, before the <code>html</code> element.
        </p>
        <p>
          This short declaration asks the browser to use modern standards
          behavior, commonly called standards mode.
        </p>
      </section>

      <section>
        <h2>What you can see</h2>
        <ul>
          <li>The page content appears in the browser window.</li>
          <li>The browser tab shows the title Doctype Practice.</li>
          <li>The declaration at the top of the source is not page content.</li>
        </ul>
      </section>

      <p>
        A simple page can look similar even when its doctype is missing.
        Keep the doctype in place instead of judging the rendering mode by
        appearance alone.
      </p>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Doctype Practice**. In the page area, the browser displays the heading **Why a doctype matters**, two section headings, paragraphs, and a bulleted list. The declaration appears as inline code in the first section because its angle brackets are written as character references.

The actual doctype is the first line of the source. It does not create visible text or a page element. The browser displays the page using its default styles.

## Explanation

- `<!doctype html>` is the first line. It is a declaration, not an HTML element, and it has no closing tag.
- Placing this modern doctype before `<html>` selects no-quirks mode, commonly called standards mode.
- `<html lang="en">` is the root element, and its `lang` attribute identifies the document language.
- `<head>` contains document information. The character set and viewport declarations help the browser interpret the page, and `<title>` sets the tab title.
- `<body>` contains the page content. The `<main>`, `<section>`, headings, paragraphs, and list elements provide its structure.
- The character references `&lt;` and `&gt;` display angle brackets as text. That is why the declaration can be shown inside the page without being interpreted as markup.
- A simple page may look much the same with or without a doctype. Include the correct declaration rather than relying on appearance to identify the browser's mode.

## How to try it

Copy the code block using its copy button and save it as `doctype-practice.html`. Check that the doctype is the first line. Open the file in a browser and compare the source with the page content. The doctype is in the source, while the headings and paragraphs appear in the page.

This Markdown file displays the example as text. It does not execute the HTML.

## Related lesson

[Read lesson 04 - Doctype and browser rendering modes](../lessons/04-doctype-and-rendering-modes.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [03 - The basic HTML document](03-basic-html-document.md) | [Lesson](../lessons/04-doctype-and-rendering-modes.md) | [Q&A](../qnas/04-doctype-and-rendering-modes.md) | [05 - Elements, tags, and attributes](05-elements-tags-and-attributes.md) |
