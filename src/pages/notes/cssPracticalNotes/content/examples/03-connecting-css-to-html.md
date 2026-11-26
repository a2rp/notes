# Example 03 - Connecting CSS to HTML

## Question

Build a small page with an external stylesheet stored in a `css` subfolder. Connect the file correctly, style the page's content, and be able to explain how the browser finds and applies the styles.

## Project structure

Create this folder structure. The stylesheet path in the HTML must match it:

```text
css-connection-example/
  index.html
  css/
    styles.css
```

## HTML file: `index.html`

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CSS Connected to HTML</title>
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <main class="page-card">
      <p class="eyebrow">CSS connection practice</p>
      <h1>A stylesheet is connected</h1>
      <p class="intro">
        The HTML describes this page's content. The connected CSS file sets
        its colors, spacing, and typography.
      </p>
      <p class="note">
        The stylesheet lives in the <code>css</code> folder beside this HTML file.
      </p>
    </main>
  </body>
</html>
~~~

## CSS file: `css/styles.css`

~~~css
* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  margin: 0;
  padding: 2rem 1rem;
  background-color: #eef2f7;
  color: #1f2937;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.page-card {
  width: 100%;
  max-width: 42rem;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background-color: #ffffff;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #0f766e;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 1rem;
  color: #164e63;
  font-size: 2rem;
  line-height: 1.2;
}

.intro {
  margin: 0 0 1.25rem;
  font-size: 1.125rem;
}

.note {
  margin: 0;
  padding: 1rem;
  border-left: 4px solid #0f766e;
  background-color: #f0fdfa;
}

code {
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  background-color: #e2e8f0;
  font-family: Consolas, monospace;
}
~~~

## Expected output

The browser tab shows **CSS Connected to HTML**. The page displays a centered white card on a pale gray background. A small uppercase teal label appears above a dark teal heading, followed by an introductory paragraph and a pale teal note with a darker left border. The card has a maximum width and keeps space at the sides on narrow screens.

If the `link` element is removed or its `href` points to the wrong path, the browser still displays the HTML content but uses its default styles. This Markdown file shows the code as text and does not run it.

## Explanation

### How the stylesheet link works

```html
<link rel="stylesheet" href="css/styles.css">
```

- `link` connects the HTML document to a resource.
- `rel="stylesheet"` identifies that resource as a stylesheet.
- `href="css/styles.css"` gives the relative path from `index.html` to the CSS file.
- The `link` element belongs in the `head` and has no closing tag.

Because `index.html` is in the project folder, the browser looks for a subfolder named `css` and then a file named `styles.css` inside it. If the file or folder name is different, update the path to match exactly.

### How the CSS applies

- `body` selects the page body and sets general text, spacing, and background styles.
- `.page-card` selects the element with `class="page-card"` and gives it a width, padding, border, and background.
- `.eyebrow`, `.intro`, and `.note` match their corresponding class attributes in the HTML.
- `h1` selects the heading element.
- Each declaration has a property before the colon and a value after it. Semicolons separate declarations.

The HTML gives the content its structure. The stylesheet changes only its presentation. The `<code>` element identifies a short piece of code in the content, while its CSS rule controls how that code is displayed.

## Compare the other ways to add CSS

For a quick experiment, the same small rule could be written inside a `style` element in the HTML document's `head`:

```html
<style>
  h1 {
    color: #164e63;
  }
</style>
```

Or a declaration could be attached to one element with a `style` attribute:

```html
<h1 style="color: #164e63;">A stylesheet is connected</h1>
```

The separate stylesheet is the main approach in this example because it is easier to reuse and maintain. The `style` element applies to its document, and the `style` attribute applies directly to that one element.

## How to try it

1. Make a folder named `css-connection-example`.
2. Save the HTML code as `index.html` in that folder.
3. Create a subfolder named `css` and save the CSS code there as `styles.css`.
4. Open `index.html` in a browser and compare the result with the expected output.
5. Change the `href` to `styles.css` without moving the file. Observe the result, then restore `css/styles.css`.
6. Temporarily remove the `link` element and observe which parts of the page remain.
7. Change a CSS value, save the file, and refresh the page.

## Troubleshooting checklist

- Confirm that the HTML has `<link rel="stylesheet" href="css/styles.css">` inside its `head`.
- Confirm that the CSS file is actually in the `css` folder.
- Check every character and the capitalization in both the folder and file names.
- Confirm that the stylesheet contains valid CSS syntax.
- Confirm that the selectors match the `body`, `h1`, and class names in the HTML.
- Save both files and refresh the browser page.

## Related lesson

[Read lesson 03 - Connecting CSS to HTML](../lessons/03-connecting-css-to-html.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [02 - CSS syntax and rulesets](02-css-syntax-and-rulesets.md) | [Lesson](../lessons/03-connecting-css-to-html.md) | [Q&A](../qnas/03-connecting-css-to-html.md) | [04 - Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md) |
