# 01. HTML document structure and first page

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Notes index](../README.md) | [Notes index](../README.md) | [Next: Elements, attributes, and nesting](./02-elements-attributes-and-nesting.md) |

## What HTML describes

HTML gives a web document its content and structure. Elements identify things such as headings, paragraphs, navigation, images, and forms. Browsers read the document tree and use element meaning to present the page.

HTML does not describe every visual detail. CSS controls presentation, and JavaScript can add behavior. A simple page still works without either.

## Create a complete document

Start with a document type declaration, a root html element, a head for document information, and a body for page content.

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My first page</title>
  </head>
  <body>
    <header>
      <h1>Learning HTML</h1>
    </header>

    <main>
      <p>This is my first structured web page.</p>
    </main>
  </body>
</html>
~~~

Save the text as index.html and open it in a browser. The doctype tells the browser to use modern standards mode. The lang attribute identifies the document language. The charset declaration sets the text encoding, and the viewport metadata helps the page use the device width on mobile screens.

The title appears in the browser tab and helps identify the page in bookmarks and search results. Visible page content belongs inside body.

## Understand the document tree

html is the root element. head and body are its children. header, main, h1, and p are nested inside body. Indentation makes those parent and child relationships easier to inspect, but indentation does not create the relationship. The opening and closing tags do.

Use one clear page heading. Later chapters cover the correct use of headings, landmarks, links, images, and form controls.

## Save and inspect the first page

Create a folder, save the example as index.html, then open it in a browser. Change the title and paragraph, save the file, and refresh the browser to see the update.

If the document looks wrong, check that the filename ends with .html, the tags are nested in the intended order, and the content is inside body.

## Practice questions

1. What does HTML describe in a web document?
2. Which declaration should appear at the beginning of a modern HTML document?
3. What is the role of the html element?
4. What belongs inside head?
5. What belongs inside body?
6. What does the lang attribute identify?
7. Where does the title usually appear to the user?
8. Why is indentation helpful even though it does not define nesting?

## Main references

- [HTML basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- [Document structure](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
- [The html element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/html)
- [The head element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head)