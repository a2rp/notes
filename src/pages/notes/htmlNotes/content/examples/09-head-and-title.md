# Example 09 - The head element and page title

## Question

Create a complete HTML page with a clear document title for browser tabs and bookmarks, plus a separate visible heading that introduces the page content.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Growing Basil Indoors | Garden Journal</title>
  </head>
  <body>
    <main>
      <h1>Grow basil indoors</h1>
      <p>
        A simple guide to giving a basil plant the light, water, and soil it needs.
      </p>

      <section>
        <h2>Start with three basics</h2>
        <ul>
          <li>Place the plant where it gets plenty of bright light.</li>
          <li>Water the soil when its surface begins to feel dry.</li>
          <li>Use a pot that lets extra water drain away.</li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Growing Basil Indoors | Garden Journal**. In the page area, the browser displays **Grow basil indoors**, a short introduction, the heading **Start with three basics**, and a three-item list.

The tab title and the visible page heading have related wording, but they are not the same text. The browser uses its default styles because this document contains no CSS.

## Explanation

- The `html` element contains the document. Its `head` and `body` children have different jobs.
- The `head` contains document information. In this example, it holds the character encoding, viewport setting, and one `title` element.
- The title text names the document. Browsers commonly show it in a tab and may use it in bookmarks or history.
- The `body` contains the content presented in the page area.
- The `h1` is the main visible heading. It introduces the content and is separate from the document title.
- The title element contains text, not visible page markup. Do not put an `h1` or other page element inside `title`.

## How to try it

Copy the HTML code block using its copy button, save it as `basil-guide.html`, and open it in a browser. Change the title and the visible heading separately. The browser tab and page heading will show where each piece of text belongs.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 09 - The head element and page title](../lessons/09-head-and-title.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [08 - Comments, character references, and special characters](08-comments-and-character-references.md) | [Lesson](../lessons/09-head-and-title.md) | [Q&A](../qnas/09-head-and-title.md) | [10 - Metadata: charset, viewport, and description](10-document-metadata.md) |
