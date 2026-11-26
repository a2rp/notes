# 01 - Introduction to HTML

HTML is the language used to give web content structure and meaning. In this chapter, you will learn what HTML does, how it relates to CSS and JavaScript, and how to read a small, complete HTML document.

## What you will learn

By the end of this chapter, you should be able to:

- Explain what HTML is used for.
- Tell the difference between HTML, CSS, and JavaScript.
- Recognize an HTML element, a tag, and an attribute.
- Read the main parts of a basic HTML document.
- Create and open a simple `.html` file in a browser.

## What is HTML?

**HTML** stands for **HyperText Markup Language**. It is a markup language for describing the structure and meaning of content on a web page.

For example, a browser can identify that some content is a main heading, some content is a paragraph, and some text is a link. HTML marks up the content so the browser can understand those roles.

HTML does not, by itself, describe every visual detail or make a page behave like an application. Those jobs are commonly shared with other technologies:

| Technology | Main purpose | Example |
| --- | --- | --- |
| HTML | Structure and meaning | Identify a heading, paragraph, link, or form |
| CSS | Presentation and layout | Set colors, spacing, fonts, and page layout |
| JavaScript | Behavior and logic | Respond to a click or update page content |

A page can contain useful HTML without CSS or JavaScript. Browsers apply their own default presentation, so headings and paragraphs are still readable. This guide focuses on HTML itself.

## How a browser uses HTML

A browser reads an HTML document, parses its elements, and builds a structured representation of the page. The browser uses that structure to display the document. Other browser features, assistive technologies, and scripts can also use the structure and meaning expressed by the HTML.

The HTML source and the page you see are related, but they are not the same thing. The source is the markup you write. The browser interprets that markup and displays the resulting page.

## Elements, tags, and attributes

Consider this example:

```html
<p class="intro">I am learning HTML.</p>
```

- `<p>` is the **start tag**. It tells the browser that a paragraph begins.
- `class="intro"` is an **attribute**. It provides extra information on the element.
- `I am learning HTML.` is the **content** of the paragraph.
- `</p>` is the **end tag**. It marks where the paragraph ends.
- The start tag, content, and end tag together make a **paragraph element**.

People often say “tag” when they mean “element.” They are related, but not identical: the tags are the markup at the beginning and end; the element is the complete structure they form.

Attributes are written inside a start tag. Most attribute values should be placed in quotes:

```html
<a href="https://example.com/">Visit Example</a>
```

Here, `<a>` creates a link, and `href` gives the link's destination. The browser displays “Visit Example” as the clickable text. You will learn more about links and attributes in later chapters.

Some HTML elements do not wrap content and do not have an end tag. These are called **void elements**. For example, an image is written with an `img` element:

```html
<img src="photo.jpg" alt="A red bicycle beside a tree">
```

This chapter introduces the idea; images and void-element syntax are covered in more detail later.

## A complete, simple HTML document

Here is a small page you can save and open in a browser:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Hello, HTML!</h1>
    <p>This is my first web page.</p>
    <p>HTML gives this content <strong>structure and meaning</strong>.</p>
    <p>
      Read more about
      <a href="https://example.com/html-guide">HTML guide</a>.
    </p>
  </body>
</html>
```

### What each part means

- `<!doctype html>` tells the browser to interpret the document using modern HTML rules. It is a declaration, not an HTML element.
- `<html lang="en">` is the root element that contains the document. The `lang` attribute says that the page's main language is English. Change the value if your page uses another language.
- `<head>` contains information about the document. Its contents generally are not shown as the main page content.
- `<meta charset="utf-8">` declares the character encoding so text can be interpreted correctly.
- `<meta name="viewport" ...>` gives mobile browsers information about the page's viewport. It helps the page use the device's screen width; it does not create a responsive layout by itself.
- `<title>` sets the document title, commonly shown in the browser tab and used in bookmarks.
- `<body>` contains the content presented as the page.
- `<h1>` marks the main heading of this page.
- `<p>` marks a paragraph.
- `<strong>` marks text with strong importance. A browser often displays it in bold by default, but the element communicates meaning, not just appearance.
- `<a href="...">` creates a link. The `href` attribute holds its destination.

Indentation makes the nesting easier to read. The browser does not require these exact spaces, but consistent indentation helps people find mistakes.

## How to try the example

1. Open a text editor.
2. Copy the complete example into a new file.
3. Save the file as `index.html`. Make sure the extension is `.html`, not `.txt`.
4. Open the file in a web browser. You should see a heading, paragraphs, and a link.
5. Change the title or paragraph text, save the file, and refresh the browser to see your changes.

The file name `index.html` is a common choice for a web page's main document. For this local exercise, another name ending in `.html` will work too.

## HTML describes meaning, not just appearance

Choose an element for what the content means. A heading should use a heading element such as `<h1>`, and a paragraph should use `<p>`. Do not choose an element only because its default appearance seems convenient. CSS is used to control appearance; HTML communicates structure and meaning.

For example, this is a heading:

```html
<h1>About this page</h1>
```

This is a paragraph:

```html
<p>This page contains information about the project.</p>
```

A browser may style a heading larger than a paragraph by default, but its heading role is useful even when the page's visual styling changes. Clear structure also helps people and software understand and navigate the content.

## Common beginner misunderstandings

- **“HTML is the same as a website's design.”** HTML provides structure and meaning. CSS usually controls visual styling and layout.
- **“HTML is a programming language.”** HTML marks up content; it does not provide general-purpose programming logic by itself.
- **“A tag and an element are exactly the same.”** Tags are the markup; an element is the complete structure made from tags and content, where applicable.
- **“I can use any element if it looks right.”** Select elements for their meaning. Visual styling can be changed separately.
- **“More spaces in HTML always create more spaces on the page.”** Browsers usually collapse runs of ordinary whitespace when rendering text. Use elements to structure content and CSS to control spacing.
- **“Every element needs a closing tag.”** Many elements have start and end tags, but void elements such as `<img>` do not have end tags.

## Try it yourself

Starting from the complete example:

1. Change the page title to your name or a topic you like.
2. Change the `<h1>` text.
3. Add another paragraph about the page.
4. Add a link to a site you use, with descriptive text inside the `<a>` element.
5. Save and refresh the page. Check that the link opens the destination you chose.

## Key points

- HTML means HyperText Markup Language.
- HTML structures content and communicates what that content means.
- Elements are made from HTML tags and, for many elements, content.
- Attributes add information to elements.
- A complete document has a root `<html>` element, a `<head>` for document information, and a `<body>` for page content.
- Use HTML for structure and meaning; use CSS for presentation and JavaScript for behavior when needed.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
|  | [Q&A](../qnas/01-introduction-to-html.md) | [Example](../examples/01-introduction-to-html.md) | [02 - How HTML fits into a web page](02-html-css-and-javascript.md) |
