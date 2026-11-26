# 56 - The base element and relative URLs: Questions and Answers

Use these questions to review [Chapter 56 - The base element and relative URLs](../lessons/56-base-element-and-relative-urls.md). Each answer follows its question, with an explanation where useful.

## Multiple-choice questions

### 1. What is the main purpose of `<base>`?

A. To create a visible link
B. To set the base URL or default target for links and forms
C. To redirect the browser as soon as the page loads
D. To load a stylesheet

**Answer: B.** `<base>` changes URL resolution and can set a default target. It does not itself navigate the browser or display content.

### 2. Where does `<base>` belong?

A. Inside `<body>`
B. Inside a paragraph
C. Inside `<head>`
D. Inside a form

**Answer: C.** It is metadata and belongs in the document head.

### 3. What is the resolved URL for `href="chapter.html"` with `<base href="https://docs.example.test/guide/">`?

A. `https://docs.example.test/guide/chapter.html`
B. `https://docs.example.test/chapter.html`
C. `chapter.html`
D. The browser ignores the link.

**Answer: A.** The relative path is appended to the base URL's directory.

### 4. With the same base URL, where does `href="/contact/"` resolve?

A. `https://docs.example.test/guide/contact/`
B. `https://docs.example.test/contact/`
C. `/guide/contact/`
D. It has no destination.

**Answer: B.** A leading slash starts at the host's root path.

### 5. Which value is most likely to be affected by a base href?

A. `https://shop.example.test/item`
B. `#details`
C. `mailto:help@example.test`
D. All absolute URLs equally

**Answer: B.** A fragment-only reference is relative. It resolves against the base URL and could point away from the current page.

### 6. How many `<base>` elements can a document contain?

A. One
B. Two, one for href and one for target
C. One in the head and one in the body
D. Any number

**Answer: A.** A document must not contain more than one `<base>` element. It can have both href and target attributes.

## True or false

### 7. The `<base>` element has a closing tag.

**Answer: False.** `<base>` is a void element, so it has no end tag.

### 8. Adding `<base href="https://docs.example.test/">` immediately navigates the browser to that address.

**Answer: False.** It changes how relative URLs resolve. The browser remains on the current page until a navigation occurs.

### 9. A link's own target overrides the default target from `<base>`.

**Answer: True.** An element's own target value takes precedence over the document-wide default.

## Short-answer questions

### 10. Why should `<base href>` appear before a stylesheet link that uses a relative href?

**Answer:** The base element with an href must precede elements whose attributes contain URLs. This makes the intended base apply consistently.

### 11. What is a risk of putting `target="_blank"` on `<base>`?

**Answer:** Links and forms without their own target may all open in a new browsing context, which can surprise visitors. Prefer setting that behavior on only the links that need it.

### 12. How does `href="images/map.png"` resolve when the base is `https://docs.example.test/guide/`?

**Answer:** It resolves to `https://docs.example.test/guide/images/map.png`. The relative path is appended to the base URL's directory.

## Practical question

### 13. Write a base element that sets the guide directory and keeps links in the current tab.

**Answer:**

~~~html
<base href="https://docs.example.test/guide/" target="_self">
~~~

The href supplies the base URL. The target sets the default browsing context to the current one. Links can still override it with their own target.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :---: | :---: | ---: |
| [55 - HTML quick reference and glossary](55-html-reference-and-glossary.md) | [Lesson](../lessons/56-base-element-and-relative-urls.md) | [Example](../examples/56-base-element-and-relative-urls.md) | [57 - Image maps with map and area](57-image-maps-with-map-and-area.md) |
