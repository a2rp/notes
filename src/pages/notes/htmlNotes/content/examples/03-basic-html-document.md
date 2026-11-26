# Example 03 - The basic HTML document

## Question

Create a complete HTML document for a short "About Me" page. Include document metadata, a visible heading, paragraphs, a section heading, and a list.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>About Me - HTML Practice</title>
  </head>
  <body>
    <main>
      <h1>About Me</h1>
      <p>Hello! I am learning how to create web pages with HTML.</p>
      <p>This page is a simple example of a complete HTML document.</p>

      <section>
        <h2>What I am learning</h2>
        <ul>
          <li>How an HTML document is organized</li>
          <li>How elements describe page content</li>
          <li>How to write clear, readable markup</li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **About Me - HTML Practice**. In the page area, the browser displays an **About Me** heading, two paragraphs, a **What I am learning** subheading, and a three-item bulleted list. The browser uses its built-in styles because the document contains no CSS.

## Explanation

- `<!doctype html>` appears first and tells the browser to use modern HTML parsing rules.
- `<html lang="en">` is the root element. Its `lang` attribute identifies the document language as English.
- `<head>` contains information about the document. The charset declaration identifies UTF-8, the viewport declaration gives mobile browsers the device width, and `<title>` sets the browser tab title.
- `<body>` contains the content displayed in the page.
- `<main>` groups the page's primary content.
- `<h1>` is the main page heading. `<h2>` introduces the learning section below it.
- Each `<p>` marks a paragraph. The `<ul>` and its `<li>` elements create an unordered list.
- Indentation makes the nesting easier to see. The tags define the structure; indentation helps people read it.

## How to try it

Copy the HTML code block using its copy button, paste it into a text editor, and save it as `about-me.html`. Open the saved file in a browser. Change the title, heading, or list items, save the file, and refresh the browser to see your edits.

This Markdown page displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 03 - The basic HTML document](../lessons/03-basic-html-document.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [02 - How HTML fits into a web page](02-html-css-and-javascript.md) | [Lesson](../lessons/03-basic-html-document.md) | [Q&A](../qnas/03-basic-html-document.md) | [04 - Doctype and browser rendering modes](04-doctype-and-rendering-modes.md) |
