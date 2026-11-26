# 03 - Connecting CSS to HTML

A stylesheet can contain correct CSS and still have no effect if the HTML page does not load it. This chapter shows how to connect an external CSS file to an HTML document, how stylesheet paths work, and when to use a `style` element or a `style` attribute instead.

## What you will learn

By the end of this chapter, you should be able to:

- Connect an external CSS file to an HTML document with a `link` element.
- Explain what the `rel` and `href` attributes do on that element.
- Choose the correct relative path for a stylesheet in the same or a nested folder.
- Recognize internal styles and inline styles.
- Choose a stylesheet approach that is easy to reuse and maintain.
- Troubleshoot common reasons a stylesheet is not applied.

## A basic project structure

An HTML page and its stylesheet can live in the same folder:

```text
my-page/
  index.html
  styles.css
```

To load `styles.css`, put a `link` element inside the HTML document's `head`:

```html
<head>
  <meta charset="utf-8">
  <title>My page</title>
  <link rel="stylesheet" href="styles.css">
</head>
```

The `link` element connects the current document to another resource. Its `rel` attribute says that the resource is a stylesheet. Its `href` attribute gives the path to the CSS file.

The `link` element is a void HTML element. It does not wrap content and does not need a closing tag. In an HTML document, write it as `<link ...>`. The `type="text/css"` attribute is normally unnecessary for a CSS stylesheet in modern HTML.

## How the browser finds the stylesheet

The value of `href` is a URL. A relative path is resolved from the location of the HTML document.

### The files are in the same folder

```text
my-page/
  index.html
  styles.css
```

Use:

```html
<link rel="stylesheet" href="styles.css">
```

### The stylesheet is in a subfolder

```text
my-page/
  index.html
  css/
    styles.css
```

Use:

```html
<link rel="stylesheet" href="css/styles.css">
```

The file and folder names in `href` must match the project. A path that works on a computer with case-insensitive file names may fail on a case-sensitive web server if the capitalization is different.

A relative path in a `link` element is based on the HTML document. Paths used by `url()` inside a CSS file, such as an image or font path, are based on the CSS file. Those CSS resource paths are covered in a later chapter.

## A complete connection

The HTML document contains the content and connects the stylesheet:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Learning CSS</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main>
      <h1 class="page-title">A page with a stylesheet</h1>
      <p>This paragraph is styled by the connected CSS file.</p>
    </main>
  </body>
</html>
```

The stylesheet can contain rules for elements or classes in that document:

```css
body {
  color: #263238;
  font-family: Arial, sans-serif;
}

.page-title {
  color: teal;
}
```

The browser loads the file named by `href`, parses its CSS, and applies rules that match elements in the document. The selector `.page-title` matches the `h1` because its `class` attribute contains `page-title`.

## External stylesheets

An **external stylesheet** is a separate `.css` file connected with a `link` element. It is usually the best approach for page styles because:

- Multiple HTML documents can share the same stylesheet.
- Presentation stays separate from document structure.
- The stylesheet is easier to organize and edit in one place.
- A browser can cache the stylesheet and reuse it while loading pages.

The extension `.css` is a naming convention that makes the file's purpose clear. The browser applies the stylesheet because of the link relationship and file contents, not merely because the file name ends in `.css`.

## Internal styles

A document can contain CSS in a `style` element, usually in its `head`:

```html
<head>
  <meta charset="utf-8">
  <title>One-page style example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    h1 {
      color: teal;
    }
  </style>
</head>
```

These are **internal styles**. They can be useful for a tiny standalone page, a quick demonstration, or document-specific styles. They are less convenient when multiple pages need the same rules because each document would need its own copy.

## Inline styles

A `style` attribute applies declarations directly to one HTML element:

```html
<p style="color: teal;">This paragraph has an inline style.</p>
```

This is an **inline style**. It can be useful in limited situations where a style value is intentionally attached to a single element, but it is usually a poor choice for normal page design. Repeating inline styles makes pages harder to maintain, reuse, and review. Keep visual rules in a stylesheet when possible.

The `style` attribute contains declarations, not a complete ruleset. It does not have a selector or braces:

```html
<p style="color: teal; font-size: 1.25rem;">Styled text</p>
```

## Choosing where to put CSS

| Approach | Where the CSS goes | Useful for | General guidance |
| --- | --- | --- | --- |
| External stylesheet | A separate `.css` file connected by `link` | Styles shared by one or more pages | Preferred for most page styles. |
| Internal styles | A `style` element in an HTML document | A small standalone page or a short demonstration | Keep limited to document-specific needs. |
| Inline styles | A `style` attribute on one element | A narrow, element-specific case | Avoid using it as the normal way to design a page. |

A page can load more than one stylesheet:

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="page.css">
```

This can separate shared styles from page-specific styles. When rules conflict, their order can be one factor in the result. The full cascade, including other factors, is explained in later chapters.

## Common reasons a stylesheet does not appear

If the HTML looks unstyled, check the connection before rewriting the CSS:

1. **Check the `link` element.** It should say `rel="stylesheet"` and include the correct `href`.
2. **Check the file location.** Confirm that the CSS file is where the relative path expects it to be.
3. **Check spelling and capitalization.** Make sure every folder and file name matches exactly.
4. **Check that the `link` is in the document's `head`.** This is the conventional place to declare linked stylesheets.
5. **Check the CSS itself.** A file can load successfully while containing a misspelled property, invalid value, or selector that matches nothing.
6. **Save both files and refresh the page.** The browser may still be displaying an earlier version.
7. **Inspect the browser's developer tools if needed.** They can show whether the stylesheet loaded and whether a rule matched an element.

A missing stylesheet and a stylesheet with a non-matching selector are different problems. If the file failed to load, check its path. If it loaded but the style is missing, inspect the selector and declaration.

## Common beginner misunderstandings

- **The `link` element belongs in the visible page content.** Put the stylesheet link in the document's `head`.
- **`href` says what kind of file the resource is.** `rel="stylesheet"` describes the relationship. `href` gives the resource path.
- **A `link` element needs a closing tag.** It is a void element and has no closing tag.
- **The stylesheet path is based on the CSS file.** The path in the HTML `link` is resolved from the HTML document. Resource paths inside CSS are resolved from the CSS file.
- **A `.css` file styles every HTML document automatically.** Each document must connect to it.
- **Inline styles are the easiest way to style a whole site.** They are attached to individual elements and are difficult to reuse consistently.
- **If a rule is not visible, the CSS file must be broken.** First check whether the stylesheet loaded and whether the selector matches the HTML.

## Try it yourself

1. Create an `index.html` file and a `styles.css` file in the same folder.
2. Add a stylesheet `link` inside the HTML `head` with `rel="stylesheet"` and `href="styles.css"`.
3. Add a heading with the class `page-title`, then add a rule for `.page-title` to the CSS file.
4. Move `styles.css` into a folder named `css` and update the `href` to `css/styles.css`.
5. Change the `href` temporarily so it points to a file that does not exist. Observe what changes, then restore the correct path.
6. Add a short `style` element to a separate test page and compare it with the external stylesheet approach.
7. Add a `style` attribute to one paragraph and describe how its scope differs from a stylesheet rule.

## Key points

- Connect an external stylesheet with `<link rel="stylesheet" href="...">` in the HTML document's `head`.
- `rel` identifies the relationship, and `href` provides the stylesheet path.
- Relative stylesheet paths in the HTML link are resolved from the HTML document.
- External stylesheets are usually the clearest choice for reusable page styles.
- A `style` element holds internal styles; a `style` attribute holds declarations for one element.
- A page must connect to an external stylesheet before the browser can apply it.
- Troubleshoot the file path, link attributes, CSS syntax, and selector match separately.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [02 - CSS syntax and rulesets](02-css-syntax-and-rulesets.md) | [Q&A](../qnas/03-connecting-css-to-html.md) | [Example](../examples/03-connecting-css-to-html.md) | [04 - Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md) |
