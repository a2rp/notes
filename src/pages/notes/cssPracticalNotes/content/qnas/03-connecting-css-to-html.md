# 03 - Connecting CSS to HTML: Questions and Answers

Practice questions for [Lesson 03 - Connecting CSS to HTML](../lessons/03-connecting-css-to-html.md). Each question is followed by its answer and an explanation or corrected example where useful.

## Multiple-choice questions

### 1. Which HTML element connects an external stylesheet to a document?

- A. `<style>`
- B. `<link>`
- C. `<css>`
- D. `<script>`

**Answer: B. `<link>`.** A `link` element can connect the HTML document to an external stylesheet.

### 2. Where should the stylesheet `link` normally be placed?

- A. Inside the document's `head`
- B. Inside every paragraph
- C. After the closing `html` tag
- D. Inside the CSS file

**Answer: A. Inside the document's `head`.** The `head` contains document information and linked resources such as stylesheets.

### 3. What does `rel="stylesheet"` tell the browser?

- A. The name of the CSS file
- B. The relationship of the linked resource to the document
- C. The color of the page
- D. Which element to style

**Answer: B. The relationship of the linked resource to the document.** The `rel` value identifies the linked resource as a stylesheet.

### 4. What does the `href` attribute provide on a stylesheet link?

- A. The path or URL of the stylesheet
- B. The selector for the stylesheet
- C. The font size of the page
- D. The stylesheet's comments

**Answer: A. The path or URL of the stylesheet.** The browser uses the `href` value to locate the CSS resource.

### 5. These files are side by side:

```text
site/
  index.html
  styles.css
```

Which `href` value points to the stylesheet?

- A. `href="css/styles.css"`
- B. `href="styles.css"`
- C. `href="index.html"`
- D. `href="../styles.css"`

**Answer: B. `href="styles.css"`.** The stylesheet is in the same folder as the HTML file, so its file name is the relative path.

### 6. The stylesheet is stored in a subfolder:

```text
site/
  index.html
  css/
    styles.css
```

Which path should the HTML use?

- A. `href="styles.css"`
- B. `href="css/styles.css"`
- C. `href="../css/styles.css"`
- D. `href="index.html/css/styles.css"`

**Answer: B. `href="css/styles.css"`.** The relative path starts from the HTML document and enters its `css` subfolder.

### 7. Where is CSS placed when using internal styles?

- A. In a `style` element in the HTML document
- B. In the `href` attribute
- C. In a paragraph's text content
- D. In a `script` element

**Answer: A. In a `style` element in the HTML document.** Internal styles are written in a `style` block, commonly inside the document's `head`.

### 8. What does a `style` attribute contain?

- A. A complete selector and declaration block
- B. CSS declarations for that element
- C. The path to a stylesheet
- D. An HTML document

**Answer: B. CSS declarations for that element.** For example, `style="color: teal;"` applies a declaration directly to that element.

### 9. Why are external stylesheets usually preferred for normal page styling?

- A. They eliminate the need for HTML.
- B. They can be organized separately and reused across documents.
- C. They automatically add JavaScript behavior.
- D. They guarantee the page will have no errors.

**Answer: B. They can be organized separately and reused across documents.** This keeps presentation separate from document structure and makes shared styles easier to maintain.

### 10. If the stylesheet loads but a heading does not change, what should you check?

- A. Whether the selector matches the heading and the declaration is valid
- B. Whether the HTML file has a different name
- C. Whether the browser has JavaScript enabled
- D. Whether the CSS file contains a title element

**Answer: A. Whether the selector matches the heading and the declaration is valid.** Loading the file and matching an element are separate steps.

## Objective questions

### True or false

### 11. Every HTML document automatically uses a CSS file named `styles.css`.

**Answer: False.** A document must connect to an external stylesheet with a `link` element.

### 12. In `<link rel="stylesheet" href="styles.css">`, `rel` identifies the relationship and `href` gives the path.

**Answer: True.** Both attributes have distinct purposes.

### 13. A `link` element needs a closing `</link>` tag.

**Answer: False.** `link` is a void element. It does not wrap content and has no closing tag.

### 14. A relative stylesheet path in the HTML `link` is resolved from the CSS file.

**Answer: False.** The link path is resolved from the HTML document. A relative resource path written inside the CSS file is resolved from that CSS file.

### 15. A `style` attribute can contain several declarations separated by semicolons.

**Answer: True.** For example, `style="color: teal; font-size: 1.25rem;"` contains two declarations.

### 16. A separate stylesheet can be shared by several HTML documents.

**Answer: True.** Each document can include a `link` element pointing to the shared stylesheet.

### 17. Adding a `type="text/css"` attribute is normally required on a stylesheet link in modern HTML.

**Answer: False.** The browser normally recognizes the stylesheet from `rel="stylesheet"`; the `type` attribute is unnecessary in this case.

### 18. If one CSS rule does not match an element, the stylesheet must have failed to load.

**Answer: False.** The file may have loaded correctly while the selector does not match the element, or while a declaration is invalid.

## Short-answer questions

### 19. Write a `link` element that connects `styles.css` in the same folder as the HTML file.

**Answer:**

```html
<link rel="stylesheet" href="styles.css">
```

**Explanation:** `rel` identifies the resource as a stylesheet. `href` points to the file.

### 20. The CSS file is in a folder named `assets/css`, next to `index.html`. What `href` should be used?

**Answer:** `href="assets/css/styles.css"`.

**Explanation:** The path begins from the HTML document's folder, then follows the `assets` and `css` folders to the file.

### 21. What is one good use for internal styles?

**Answer:** A small standalone page or a short demonstration that does not need a reusable external stylesheet.

**Explanation:** A `style` element keeps those styles within one HTML document. For styles shared across pages, an external file is usually easier to maintain.

### 22. Why should inline styles not be the normal way to design a multi-page site?

**Answer:** Inline styles are attached to individual elements, so they are difficult to share, update consistently, and maintain across pages.

### 23. What is the difference between a `style` element and a `style` attribute?

**Answer:** A `style` element contains CSS rules in an HTML document. A `style` attribute contains declarations directly on one element.

**Example:**

```html
<style>
  p {
    color: teal;
  }
</style>

<p style="color: teal;">Styled paragraph</p>
```

### 24. Why might a stylesheet path work on one computer but fail after publishing?

**Answer:** A folder or file name may have different capitalization in the `href` than it has on the server. Some systems treat upper and lower case as different names.

**Explanation:** Check the exact spelling and capitalization of each part of the path.

### 25. What should you inspect if the stylesheet is loaded but its rules have no visible effect?

**Answer:** Check that the selector matches the intended HTML elements and that the property names and values are valid.

**Explanation:** A stylesheet can load successfully even when a rule targets nothing or contains an invalid declaration.

## Diagnose the connection

### 26. Find the problem in this link.

```html
<link rel="css" href="styles.css">
```

**Answer:** The `rel` value should be `stylesheet`, not `css`.

**Corrected link:**

```html
<link rel="stylesheet" href="styles.css">
```

### 27. `index.html` is in the project folder, and the stylesheet is in `css/main.css`. Correct this link.

```html
<link rel="stylesheet" href="main.css">
```

**Answer:** Include the subfolder in the path.

```html
<link rel="stylesheet" href="css/main.css">
```

### 28. What is wrong with this internal style example?

```html
<head>
  <style href="styles.css"></style>
</head>
```

**Answer:** A `style` element contains CSS text. It does not use `href` to load another file.

**Correct external link:**

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

### 29. This class rule does not style the heading. The CSS file is connected correctly. Find the mismatch.

```html
<h1 class="page-title">Hello</h1>
```

```css
.page-heading {
  color: teal;
}
```

**Answer:** The class names differ. The HTML has `page-title`, but the CSS selector targets `page-heading`.

**One correction:**

```css
.page-title {
  color: teal;
}
```

### 30. Why does changing a rule in `styles.css` not update a page that links to `css/site.css`?

**Answer:** The HTML document loads `css/site.css`, not `styles.css`. Edit the file that the `href` points to, or change the `href` to the intended file.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [02 - CSS syntax and rulesets](02-css-syntax-and-rulesets.md) | [Lesson](../lessons/03-connecting-css-to-html.md) | [Example](../examples/03-connecting-css-to-html.md) | [04 - Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md) |
