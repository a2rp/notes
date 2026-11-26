# Example 10 - Metadata: charset, viewport, and description

## Question

Create a complete HTML page for a small balcony herb garden. Give the document a title, declare its character encoding, set a useful mobile viewport, and add a short description for software that reads page metadata. Keep the visible page content in the body.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A practical guide to choosing containers, sunlight, and herbs for a small balcony garden.">
    <title>Balcony Herb Garden | Garden Notes</title>
  </head>
  <body>
    <main>
      <h1>Grow herbs on a balcony</h1>
      <p>
        A few well-chosen containers can make a small balcony a useful place
        to grow fresh herbs.
      </p>

      <section>
        <h2>Plan your containers</h2>
        <ul>
          <li>Choose pots with drainage holes.</li>
          <li>Place sun-loving herbs where they get plenty of light.</li>
          <li>Check the soil before watering.</li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Balcony Herb Garden | Garden Notes**. In the page area, the browser displays the heading **Grow herbs on a balcony**, an introductory paragraph, the heading **Plan your containers**, and a three-item list.

The character encoding, viewport, and description are metadata. They do not appear as visible paragraphs or headings. The browser uses its default styles because this document contains no CSS.

## Explanation

- The three `meta` elements are inside `head`, where document metadata belongs.
- `meta charset="utf-8"` declares UTF-8 as the document's character encoding. Save the file itself as UTF-8 as well, and keep this declaration near the beginning of the document. Use one charset declaration.
- The viewport setting asks a mobile browser to use the device width for the layout viewport and start at a scale of 1. It does not make a fixed-width page responsive by itself.
- The description's `name` identifies the metadata type and its `content` provides the summary. Search services may use this text in a result, but they can choose other text.
- The `title` names the document and commonly appears in a browser tab. The `h1` is the visible main heading in the page. They describe the same subject but serve different purposes.
- The `body` contains the content shown in the page area. The description belongs in metadata, not as a replacement for text meant for readers.

## How to try it

Copy the HTML code block using its copy button, save it as `balcony-herb-garden.html` with UTF-8 encoding, and open it in a browser. Compare the browser tab title with the visible `h1`. Then change the description and notice that it does not add text to the page. You can inspect the viewport setting on a narrow screen, but remember that this page has no CSS layout rules.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 10 - Metadata: charset, viewport, and description](../lessons/10-document-metadata.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [09 - The head element and page title](09-head-and-title.md) | [Lesson](../lessons/10-document-metadata.md) | [Q&A](../qnas/10-document-metadata.md) | [11 - Headings and paragraphs](11-headings-and-paragraphs.md) |
