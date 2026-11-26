# 03 - The basic HTML document

A browser needs an HTML document to know how the page is organized. In this chapter, you will build a complete page, identify the job of each main part, and save it so a browser can open it.

## What you will learn

By the end of this chapter, you should be able to:

- Write the basic structure of an HTML document.
- Explain the purpose of `<!doctype html>`, `<html>`, `<head>`, and `<body>`.
- Put page content and document information in the right places.
- Create, save, and open a basic `.html` file.

## A complete HTML page

Here is a small, complete HTML document:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My first web page</title>
</head>
<body>
  <h1>Hello, HTML!</h1>
  <p>This is the first page in my notes.</p>
</body>
</html>
~~~

Save the example as `index.html` and open it in a browser. You should see a heading and a paragraph. The title appears in the browser tab or window, rather than in the page content.

This example uses only HTML. A browser can display it with its built-in styles. The page does not need a stylesheet or a script to work.

## Read the document from the outside in

The main parts have a specific order:

1. The doctype declaration
2. The root `html` element
3. The `head` element, followed by the `body` element inside `html`

The structure looks like this:

~~~text
HTML document
└── html
    ├── head
    └── body
~~~

The browser parses the markup and builds a document structure from it. Indentation and line breaks make the source easier to read, but they do not create the relationships between elements. The start and end tags do that.

## The doctype declaration

`<!doctype html>` belongs at the beginning of an HTML document:

~~~html
<!doctype html>
~~~

It tells the browser to use its standards mode for rendering. It is a declaration, not an HTML element, so it does not have a closing tag and is not written inside `<html>`. The next chapter explains the doctype and browser rendering modes in more detail.

Write it as `<!doctype html>`. HTML keywords are case-insensitive, but using this simple lowercase form keeps documents consistent.

## The root html element

The `<html>` element is the root of the document. The `<head>` and `<body>` elements belong inside it:

~~~html
<html lang="en">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
~~~

The `lang` attribute identifies the language of the page's text. In this example, `en` means English. Use a value that matches the primary language of your page. This information helps browsers and assistive technologies handle the content appropriately.

The value `en` does not translate the page. It describes the language that the page is written in.

## The head element

The `<head>` contains information about the document. This information is often called metadata. It is not the main content shown in the page area.

In the example, the head contains two elements:

~~~html
<head>
  <meta charset="utf-8">
  <title>My first web page</title>
</head>
~~~

### Character encoding

`<meta charset="utf-8">` declares that the document uses UTF-8 text encoding. This helps the browser interpret letters and symbols correctly. Save the file as UTF-8 as well, which is the usual default in modern editors.

For example, UTF-8 lets the page contain text such as:

~~~html
<p>Welcome to my page!</p>
~~~

The encoding declaration belongs near the beginning of the document, inside `<head>`. The later metadata lesson explains this and other `<meta>` elements in more detail.

### The page title

The `<title>` element gives the document its title:

~~~html
<title>My first web page</title>
~~~

Browsers commonly show this title in the tab or window. It can also be used in bookmarks and browser history. The title is not a visible heading in the page itself. For a heading inside the page, put an `<h1>` element in the body.

## The body element

The `<body>` contains the page's main content. Headings, paragraphs, lists, links, images, and many other content elements go here.

~~~html
<body>
  <h1>About this page</h1>
  <p>I am learning how HTML documents are organized.</p>
</body>
~~~

The browser displays this content in the page area. In a later chapter, you will learn more about choosing the right elements for different kinds of content.

## Put the parts together

Use this starter document when you begin a simple page:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Page title</title>
</head>
<body>
  <h1>Page heading</h1>
  <p>Page content goes here.</p>
</body>
</html>
~~~

Replace the title, heading, and paragraph with content that fits your page. Keep the title in the head and the content users read in the body.

The indentation is there to make the nesting easy to see. It is good practice to indent child elements consistently:

~~~html
<body>
  <main>
    <h1>My notes</h1>
    <p>I am practicing HTML.</p>
  </main>
</body>
~~~

Here, `<main>` is inside `<body>`, and its heading and paragraph are inside `<main>`. The spaces at the start of each line make the source easier to scan. The tags express the nesting.

## Create and open the file

1. Open a text editor, such as Notepad or a code editor.
2. Type or paste the starter document.
3. Save the file with a name ending in `.html`, for example `index.html`.
4. If the editor asks for an encoding, choose UTF-8.
5. Open the saved file in a browser. You can usually double-click it or drag it into a browser window.
6. After editing and saving, refresh the browser to see the latest version.

Make sure the file is really named `index.html`, not `index.html.txt`. Some editors hide file extensions, which can make this mistake hard to spot.

The browser shows the rendered page. To inspect the source, open the file in your editor or use the browser's view-source feature. The rendered page and the HTML source are related, but they are different views of the document.

## Common beginner mistakes

- **Putting the heading in the head.** Put content that belongs in the page inside `<body>`. The `<head>` is for document information such as the title and character encoding.
- **Using the title as the visible heading.** A `<title>` names the document. Add an `<h1>` in the body for the main visible heading.
- **Leaving out the language.** Add a `lang` attribute to `<html>` and make its value match the page's language.
- **Relying on the browser to fill in missing structure.** Browsers can handle some omitted tags, but writing the full structure makes the document easier to understand and maintain.
- **Saving with the wrong extension.** A file ending in `.txt` is treated as a text file, even if its contents look like HTML.
- **Confusing indentation with nesting.** Indentation helps people read the source. The tags determine which elements contain other elements.

## Try it yourself

Create a file named `about-me.html` and start with the complete document example.

1. Give the page a title that describes it.
2. Set the `lang` value to the language you are using.
3. Add one main heading and two paragraphs inside the body.
4. Add a second heading and a short list inside the body.
5. Save the file, open it in a browser, and check the tab title and page content.
6. Change the title, save the file, and refresh the browser. Notice which part of the browser changes.
7. Temporarily remove the `<title>` element. Observe what happens to the browser tab, then restore it.

## Key points

- A complete HTML document has a doctype followed by the `<html>` root element.
- The `<html>` element contains a `<head>` and a `<body>`.
- The head holds document information, including the character encoding and title.
- The body holds the content displayed in the page area.
- The `lang` attribute identifies the language of the document.
- Save HTML documents with the `.html` extension and use UTF-8.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [02 - How HTML fits into a web page](02-html-css-and-javascript.md) | [Q&A](../qnas/03-basic-html-document.md) | [Example](../examples/03-basic-html-document.md) | [04 - Doctype and browser rendering modes](04-doctype-and-rendering-modes.md) |
