# 04 - Doctype and browser rendering modes: Questions and Answers

Practice questions for [Lesson 04 - Doctype and browser rendering modes](../lessons/04-doctype-and-rendering-modes.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. Which is the modern HTML doctype declaration?

- A. `<doctype html5>`
- B. `<!doctype html>`
- C. `<html doctype="5">`
- D. `<!html doctype>`

**Answer: B.** The short declaration `<!doctype html>` is used at the start of a modern HTML document.

### 2. What kind of markup is the doctype?

- A. An HTML element with an opening and closing tag
- B. A declaration that appears before the root `<html>` element
- C. A visible page heading
- D. A browser setting inside `<head>`

**Answer: B.** The doctype is a document declaration, not an HTML element. It has no closing tag or content.

### 3. Where should the doctype appear?

- A. After the closing `</html>` tag
- B. Inside the `<head>` element
- C. Before the root `<html>` element, at the start of the document
- D. Inside the page's first paragraph

**Answer: C.** Put `<!doctype html>` at the beginning of a new HTML document, before `<html>`.

### 4. Which rendering mode does the modern short doctype select?

- A. Quirks mode
- B. Limited-quirks mode
- C. No-quirks mode, commonly called standards mode
- D. Print mode

**Answer: C.** The modern short doctype tells browsers to use no-quirks mode, commonly called standards mode.

### 5. Why do browsers have quirks mode?

- A. To help older pages that depend on legacy browser behavior keep working
- B. To add CSS to pages without stylesheets
- C. To translate old pages into modern HTML
- D. To prevent the browser from parsing HTML

**Answer: A.** Quirks mode preserves selected older behavior for compatibility with legacy pages.

### 6. What best describes limited-quirks mode?

- A. A mode that disables all HTML elements
- B. A mode with a smaller set of legacy behavior used for certain old doctypes
- C. Another name for JavaScript mode
- D. A mode selected by every modern doctype

**Answer: B.** Limited-quirks mode applies less legacy behavior than quirks mode and is associated with certain older doctypes.

### 7. What does `<!doctype html>` specify?

- A. A numbered HTML edition such as HTML5
- B. Which browser must open the page
- C. That the browser should use modern standards behavior
- D. The page's title

**Answer: C.** The short doctype selects standards behavior. It does not contain a version number or choose a browser.

### 8. What can happen if a document has no doctype?

- A. The browser must refuse to open it
- B. The browser may use quirks mode
- C. The browser automatically adds visible text
- D. The page becomes a CSS file

**Answer: B.** A browser can still display the page, but a missing doctype may cause it to use quirks mode.

### 9. Why should a new page not copy a long doctype from an old tutorial?

- A. Long doctypes make every HTML element invisible
- B. Long legacy declarations are intended for compatibility with older content
- C. Modern browsers cannot read declarations
- D. A page can only have one paragraph with a long doctype

**Answer: B.** Older doctypes exist for legacy compatibility. New pages should use the short modern form.

### 10. What does a doctype guarantee about how every browser displays a page?

- A. Every browser will display it identically
- B. Nothing about browser behavior is needed after adding it
- C. It provides a standards-mode starting point, but does not guarantee identical rendering
- D. It automatically fixes invalid HTML

**Answer: C.** The doctype selects the rendering mode. The rest of the document still needs to be written correctly, and browsers may differ in some details.

## Objective questions

### True or false

### 1. The doctype is an HTML element with start and end tags.

**Answer: False.** It is a declaration, not an element, and it has no closing tag.

### 2. The doctype should appear before the root `<html>` element.

**Answer: True.** Put `<!doctype html>` at the beginning of the document.

### 3. The modern short doctype contains an HTML version number.

**Answer: False.** It is written `<!doctype html>` with no version number.

### 4. Uppercase letters in `<!DOCTYPE html>` are accepted.

**Answer: True.** HTML keywords are case-insensitive. This guide uses lowercase for consistency.

### 5. The doctype adds visible text to the page.

**Answer: False.** It is a declaration that helps the browser choose a rendering mode. It is not page content.

### 6. A browser cannot display an HTML page when its doctype is missing.

**Answer: False.** Browsers can still display it, but the document may be rendered in quirks mode.

### 7. A very simple page can look similar with and without the correct doctype.

**Answer: True.** A heading and paragraph may not reveal a rendering-mode difference. Keep the correct doctype instead of judging by appearance.

### 8. The modern short doctype selects no-quirks mode, commonly called standards mode.

**Answer: True.** It gives a new document a standards-mode starting point.

### 9. Limited-quirks mode applies a smaller set of legacy behavior than quirks mode.

**Answer: True.** It is used for certain old doctypes and preserves less legacy behavior.

### 10. Adding a modern doctype automatically repairs every markup error in the rest of the document.

**Answer: False.** The doctype selects a rendering mode. The HTML still needs to be written correctly.

## Fill in the blanks

### 1. The modern HTML doctype is written as ________.

**Answer: `<!doctype html>`.** Use this short form for new HTML documents.

### 2. The doctype belongs ________ the root `<html>` element.

**Answer: Before.** It appears at the start of the file.

### 3. The doctype is a ________, not an HTML element.

**Answer: Declaration.** It has no start tag, end tag, or content.

### 4. The modern short doctype selects ________ mode, commonly called standards mode.

**Answer: No-quirks.** This is the modern rendering mode for new documents.

### 5. The compatibility mode that imitates selected older browser behavior is called ________ mode.

**Answer: Quirks.** It exists so some older pages continue to work as expected.

### 6. ________-quirks mode applies a smaller set of legacy behavior for certain old doctypes.

**Answer: Limited.** Limited-quirks mode preserves less legacy behavior than quirks mode.

### 7. HTML keywords are case-________, so `<!DOCTYPE html>` is accepted.

**Answer: Insensitive.** Lowercase is used consistently in these notes.

### 8. A page without a doctype may be rendered in ________ mode.

**Answer: Quirks.** Browsers can display the page, but may use legacy rendering behavior.

## Short-answer questions

### 1. What is the purpose of the doctype?

**Answer:** It tells the browser how to interpret and render the document. The modern short doctype selects standards mode.

**Explanation:** It does not add content to the page or replace the html, head, or body elements.

### 2. What is the difference between standards mode and quirks mode?

**Answer:** Standards mode follows modern standards behavior. Quirks mode imitates selected older browser behaviors to support some legacy pages.

### 3. How does limited-quirks mode differ from quirks mode?

**Answer:** Limited-quirks mode applies a smaller set of legacy behaviors and is used for certain old doctypes.

### 4. Why should you include the doctype even if a page looks fine without it?

**Answer:** A simple page may look similar in different modes, but more complex layout and sizing behavior can differ. The doctype makes the intended standards mode clear.

### 5. Does `<!doctype html>` mean the document is version 5 of HTML?

**Answer:** No. The declaration has no version number. It selects modern standards behavior and does not identify a numbered HTML edition.

### 6. Does adding the correct doctype guarantee that every browser will render a page identically?

**Answer:** No. It selects a standards-mode starting point, but it does not guarantee identical rendering or make incorrect markup valid.

## Practical HTML questions

### 1. Add the correct doctype to this document.

~~~html
<html lang="en">
<head>
  <title>My page</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
~~~

**Answer:**

~~~html
<!doctype html>
<html lang="en">
<head>
  <title>My page</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
~~~

**Explanation:** The declaration goes before the root `<html>` element.

### 2. Correct the position of the doctype and remove the incorrect closing tag.

~~~html
<html lang="en">
<!doctype html>
<head>
  <title>Practice</title>
</head>
<body>
  <h1>Doctype practice</h1>
</body>
</html>
</!doctype>
~~~

**Answer:**

~~~html
<!doctype html>
<html lang="en">
<head>
  <title>Practice</title>
</head>
<body>
  <h1>Doctype practice</h1>
</body>
</html>
~~~

**Explanation:** The doctype belongs before `<html>` and is complete on its own. It does not have a closing tag.

### 3. Replace this incorrect declaration with the modern short doctype.

~~~html
<!doctype html5>
~~~

**Answer:**

~~~html
<!doctype html>
~~~

**Explanation:** Do not add a version number to the modern short doctype.

### 4. A page with a heading and a paragraph looks unchanged after you remove its doctype. Should you leave the doctype out?

**Answer:** No. Restore `<!doctype html>` at the start of the file.

**Explanation:** A simple page may not show an obvious difference, but the browser may use quirks mode. Use the correct doctype for every new page.

### 5. A tutorial shows a long declaration for an older HTML standard. What do you write for a new page instead?

**Answer:** Use the modern short declaration:

~~~html
<!doctype html>
~~~

**Explanation:** Older declarations are for legacy compatibility. New documents should start with the short modern form.

### 6. Give a quick checklist for checking the doctype in an HTML file.

**Answer:**

1. Open the source in a text editor or use the browser's view-source feature.
2. Check that the first declaration is `<!doctype html>`.
3. Confirm it appears before the opening `<html>` tag.
4. Make sure it is not written as an element with a closing tag.

**Explanation:** The rendered page alone may not show whether the doctype is present or which mode the browser selected.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [03 - The basic HTML document](03-basic-html-document.md) | [Lesson](../lessons/04-doctype-and-rendering-modes.md) | [Example](../examples/04-doctype-and-rendering-modes.md) | [05 - Elements, tags, and attributes](05-elements-tags-and-attributes.md) |
