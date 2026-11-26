# Example 01 - Introduction to HTML

## Question

How do you create a complete HTML page that introduces HTML and shows how markup gives content structure and meaning?

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Learning HTML</title>
  </head>
  <body>
    <main>
      <h1>My first HTML page</h1>
      <p>Hello! I am learning <strong>HTML</strong>.</p>
      <p>HTML gives web content structure and meaning.</p>
      <p>
        Learn more from
        <a href="https://example.com/html-guide">HTML guide</a>.
      </p>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab displays the title **Learning HTML**. The page displays a large heading, followed by three paragraphs. The word **HTML** in the first paragraph appears bold by default. The final paragraph contains a link labeled **HTML guide**.

The page uses the browser's default styling because this example includes no CSS. This code is shown in the Markdown file as text. It is not executed here.

## Explanation

- `<!doctype html>` tells the browser to use modern HTML parsing rules.
- `<html lang="en">` is the root element. The `lang` attribute identifies English as the document language.
- `<head>` contains document information. The character set declaration helps text display correctly, the viewport declaration gives mobile browsers the device width, and `<title>` sets the browser tab title.
- `<body>` contains the page content. `<main>` groups the page's primary content.
- `<h1>` marks the page's main heading. Each `<p>` marks a paragraph.
- `<strong>` marks text with strong importance. Browsers commonly show it in bold, while the element itself communicates meaning.
- `<a>` creates a link, and its `href` attribute provides the destination.
- Indentation shows which elements are nested inside others. It makes the document easier to read.

## How to try it

Copy the HTML code block using its copy button, paste it into a text editor, save the file as `index.html`, and open that file in a browser. Then change the heading or paragraph text and compare the result.

## Related lesson

[Read lesson 01 - Introduction to HTML](../lessons/01-introduction-to-html.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
|  | [Lesson](../lessons/01-introduction-to-html.md) | [Q&A](../qnas/01-introduction-to-html.md) | [02 - How HTML fits into a web page](02-html-css-and-javascript.md) |
