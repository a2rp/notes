# 02 - How HTML fits into a web page

A web page can use HTML, CSS, and JavaScript together. Each technology has a different job: HTML describes the page content and its meaning, CSS controls how that content looks, and JavaScript can add behavior. Understanding these roles helps you write HTML that remains clear and useful before any styling or scripting is added.

This chapter introduces the relationship between the three technologies. The examples use a little CSS and JavaScript only to show where they fit. The lessons in this guide focus on HTML.

## What you will learn

By the end of this chapter, you should be able to:

- Describe the role HTML, CSS, and JavaScript play in a web page.
- Identify which parts of a simple page are structure, presentation, and behavior.
- Explain why HTML can provide useful built-in behavior without JavaScript.
- Recognize how a browser combines a page's files to display a result.

## A web page has different kinds of instructions

Think of a page as content with structure, presentation, and optional behavior. These are different responsibilities, even when they are written in the same file.

| Technology | Responsibility | Examples |
| --- | --- | --- |
| HTML | Content and structure | Headings, paragraphs, links, images, forms, and page sections |
| CSS | Presentation and layout | Colors, fonts, spacing, borders, and positioning |
| JavaScript | Behavior and logic | Responding to an event, changing content, or checking a condition |

HTML is not a visual design language. A browser may display headings in a large bold font and links in blue by default, but those are browser defaults. The HTML identifies a heading or a link; it does not require that exact appearance.

## HTML provides the page's structure

HTML uses elements to describe what the content is. For example, a heading, a paragraph, and a link have different roles:

```html
<h1>Plan a weekend walk</h1>
<p>Bring water and check the weather before you leave.</p>
<a href="https://example.com/trails">Browse local trails</a>
```

The browser can present these elements with default styles. More importantly, the markup identifies the heading, paragraph, and link as different kinds of content. Browsers, assistive technologies, and other software can use that structure too.

HTML can also provide some interaction on its own. A link navigates to its destination, and a `details` element can be opened and closed without JavaScript:

```html
<details>
  <summary>What should I bring?</summary>
  <p>Bring water, comfortable shoes, and a light jacket.</p>
</details>
```

HTML forms also provide native controls and browser features. Later lessons cover these elements in detail. JavaScript is useful for additional behavior, but not every interactive feature needs a script.

## CSS controls presentation

CSS rules describe how selected HTML elements should look. For example:

```css
h1 {
  color: darkgreen;
  font-family: Arial, sans-serif;
}

p {
  line-height: 1.6;
}
```

These rules change the appearance of `h1` and `p` elements. They do not change the meaning of the heading or paragraph.

A page can include CSS in a separate `.css` file, in a `<style>` element, or directly on an HTML element with a `style` attribute. For real pages, a separate stylesheet is commonly used because it keeps presentation rules together and easier to maintain. CSS itself is outside the scope of this HTML guide.

## JavaScript can add behavior

JavaScript can respond to events and update a page. For example, a button can ask JavaScript to change a message:

```html
<button type="button" id="message-button">Show a message</button>
<p id="message">No message yet.</p>

<script>
  const button = document.querySelector("#message-button");
  const message = document.querySelector("#message");

  button.addEventListener("click", () => {
    message.textContent = "The button was clicked.";
  });
</script>
```

The HTML creates the button and paragraph. The JavaScript finds those elements, waits for a click, and changes the paragraph text. The button remains an HTML element; JavaScript adds the response to the click.

JavaScript can be placed in a separate `.js` file or in a `<script>` element. This example is only to show the division of responsibilities. JavaScript is not needed to create ordinary headings, paragraphs, links, or many other common page features.

## How the browser brings them together

A simple web page may use one HTML file, a CSS file, and a JavaScript file. The HTML can refer to the other files:

```html
<head>
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
```

- The `<link>` element connects the page to a stylesheet.
- The `<script>` element connects the page to a JavaScript file.
- The `defer` attribute asks the browser to run the external script after it has parsed the document.

When loading the page, the browser reads the HTML and builds a structured representation of its elements. It uses the CSS rules to calculate how elements should appear, and it runs JavaScript when appropriate. The browser then displays the page and can update it as scripts or user actions change its state.

The browser's work is more detailed than this short overview, but this model is enough to understand why the files are related and why each language has a separate job.

## A small combined example

This complete page puts the roles together. The HTML provides a heading, explanation, and disclosure control. The CSS changes their appearance. The JavaScript updates a message when the button is clicked.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>A Small Web Page</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
      }

      main {
        max-width: 40rem;
        margin: 2rem auto;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>A small web page</h1>
      <p>HTML describes this content and its structure.</p>

      <details>
        <summary>Read a short note</summary>
        <p>This disclosure works using built-in HTML behavior.</p>
      </details>

      <p id="status">The button has not been clicked.</p>
      <button type="button" id="update-status">Update the message</button>
    </main>

    <script>
      const button = document.querySelector("#update-status");
      const status = document.querySelector("#status");

      button.addEventListener("click", () => {
        status.textContent = "The button was clicked.";
      });
    </script>
  </body>
</html>
```

In this page:

- The HTML elements describe the heading, paragraphs, disclosure, and button.
- The CSS inside `<style>` sets a font and limits the main content width.
- The JavaScript inside `<script>` changes the status paragraph after a click.
- The `<details>` element can open and close without the JavaScript code.

Try removing the `<style>` element and reload the page. The content and HTML structure remain, but the custom font and width are gone. Then remove the `<script>` element and reload. The button remains in the document, but it no longer changes the status message. The disclosure still works because its basic behavior is part of HTML.

## Keep content meaningful without styling

When writing HTML, choose elements for the content's purpose. Use a heading element for a heading, a paragraph element for a paragraph, and an anchor element for a link. Do not pick an element only because its default appearance looks convenient.

For example, use a real heading:

```html
<h2>Opening hours</h2>
```

Do not use an unrelated element just to make text appear bold:

```html
<strong>Opening hours</strong>
```

`strong` communicates that its text is important. It is not a substitute for a heading. CSS can change how a real heading looks while preserving its meaning.

A useful check is to temporarily view a page without its custom CSS. Its content should still be understandable, and its structure should still make sense.

## Common misunderstandings

- **HTML is responsible for all visual design.** HTML gives content structure and meaning. CSS controls most visual presentation.
- **JavaScript is required for every interaction.** Links, disclosure controls, and form features can have native HTML behavior.
- **CSS changes what an element means.** CSS changes presentation. A paragraph does not become a heading just because it is styled to look large.
- **A page must put everything in one file.** HTML, CSS, and JavaScript can be kept in separate files and connected when needed.
- **Removing CSS removes the page content.** Removing styling changes presentation, while the HTML content remains.
- **A button automatically performs any action its label describes.** A button needs a form action or behavior provided by JavaScript to do something specific. Native button behavior is covered later in this guide.

## Try it yourself

1. Create a page with a `<main>` element, one `<h1>`, and two paragraphs.
2. Add a link with a useful destination and descriptive link text.
3. Add a `<details>` element with a `<summary>` and a paragraph inside it.
4. Open the page in a browser and note the default appearance and built-in disclosure behavior.
5. Add a small `<style>` element that changes the page font. Remove it again and observe what changes.
6. In your own words, describe which parts of the page are HTML and which parts are CSS.

## Key points

- HTML describes content and its structure.
- CSS controls presentation and layout.
- JavaScript can add behavior and logic.
- HTML has useful native features, including links, disclosure controls, and form controls.
- A browser combines the document and any connected stylesheets or scripts to display a page.
- Meaningful HTML remains important whether or not CSS or JavaScript is present.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [01 - Introduction to HTML](01-introduction-to-html.md) | [Q&A](../qnas/02-html-css-and-javascript.md) | [Example](../examples/02-html-css-and-javascript.md) | [03 - The basic HTML document](03-basic-html-document.md) |
