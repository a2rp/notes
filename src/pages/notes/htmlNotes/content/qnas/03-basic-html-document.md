# 03 - The basic HTML document: Questions and Answers

Practice questions for [Lesson 03 - The basic HTML document](../lessons/03-basic-html-document.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. Which outline shows the basic structure of a complete HTML document?

- A. A doctype, then an `<html>` root containing `<head>` and `<body>`
- B. A `<body>`, then a doctype inside `<head>`
- C. A `<title>` followed by a `<doctype>` element
- D. A `<head>` and `<body>` outside the `<html>` element

**Answer: A.** The doctype comes first. The root `<html>` element contains the document's head and body.

### 2. What does `<!doctype html>` tell the browser?

- A. The page must use JavaScript
- B. The browser should render the document in standards mode
- C. The page language is English
- D. The document has no body

**Answer: B.** The doctype is a declaration that asks the browser to use standards mode. It is not an HTML element and has no closing tag.

### 3. Which element is the root of an HTML document?

- A. `<head>`
- B. `<body>`
- C. `<html>`
- D. `<main>`

**Answer: C.** The `<html>` element is the root. The head and body are placed inside it.

### 4. What does `lang="en"` communicate on `<html>`?

- A. The page must be translated into English
- B. The page's primary language is English
- C. The browser should use English spelling
- D. The page contains no other languages

**Answer: B.** The language attribute describes the language of the page. It does not translate the content.

### 5. Which pair belongs in the document head in the lesson's example?

- A. `<h1>` and `<p>`
- B. `<meta charset="utf-8">` and `<title>`
- C. `<main>` and `<footer>`
- D. `<body>` and `<html>`

**Answer: B.** Character encoding and the document title are metadata, so they belong inside `<head>`.

### 6. Where should the main content that appears in the page area go?

- A. Inside `<head>`
- B. Inside `<body>`
- C. Before the doctype
- D. Inside the `lang` attribute

**Answer: B.** Put headings, paragraphs, links, and other page content in the body.

### 7. Where does a browser commonly show the text inside a `<title>` element?

- A. As the page's main heading
- B. In the browser tab or window title
- C. At the bottom of every paragraph
- D. As a link destination

**Answer: B.** The title names the document and commonly appears in the browser tab. Use a heading such as `<h1>` for a visible page heading.

### 8. What is the purpose of `<meta charset="utf-8">`?

- A. It sets the page's background color
- B. It declares the document's character encoding
- C. It creates a visible heading
- D. It changes the page language

**Answer: B.** The declaration helps the browser interpret letters and symbols correctly. The file should also be saved using UTF-8 encoding.

### 9. What determines whether one HTML element is nested inside another?

- A. The number of spaces before each line
- B. The tags and their placement
- C. The editor's font
- D. The filename

**Answer: B.** Indentation helps people read the source, but the tags establish the document structure and nesting.

### 10. Which filename is the clearest choice for a basic HTML page?

- A. `index.html`
- B. `index.html.txt`
- C. `index`
- D. `index.css`

**Answer: A.** Use the `.html` extension so the file is recognized as an HTML document. Check that an editor has not silently added `.txt`.

## Objective questions

### True or false

### 1. The doctype declaration is an HTML element that needs a closing tag.

**Answer: False.** `<!doctype html>` is a declaration, not an element, and it does not have a closing tag.

### 2. The `<head>` contains document information such as the title and character encoding.

**Answer: True.** These values describe the document and are placed in the head.

### 3. The `<body>` contains the page's main content.

**Answer: True.** The browser displays body content in the page area.

### 4. A page's `<title>` is automatically displayed as its visible `<h1>`.

**Answer: False.** The title commonly appears in the browser tab. Add a heading inside the body for a visible page heading.

### 5. Setting `lang="en"` translates the page into English.

**Answer: False.** The attribute identifies the language already used by the content. It does not translate anything.

### 6. Indentation makes the source easier to read, while tags express the nesting.

**Answer: True.** Whitespace is a readability aid; the markup establishes the element relationships.

### 7. Browsers may infer some omitted document elements, so writing a complete structure is still useful.

**Answer: True.** Explicitly writing the doctype, html, head, and body makes the document easier to understand and maintain.

### 8. Saving a file as `about-me.html.txt` always makes it an HTML file.

**Answer: False.** The extra `.txt` extension can cause it to be treated as a text file. Make sure the filename ends with `.html`.

### 9. After saving a change to a local HTML file, refreshing the browser can show the latest version.

**Answer: True.** The browser reloads the saved document when refreshed.

### 10. The browser's rendered page and the HTML source are two different views of the document.

**Answer: True.** The source is the markup; the rendered view is how the browser presents the document.

## Fill in the blanks

### 1. The declaration at the beginning of a modern HTML document is ________.

**Answer: `<!doctype html>`.** It tells the browser to use standards mode.

### 2. The root element of an HTML document is ________.

**Answer: `<html>`.** It contains the head and body.

### 3. The document's primary language is identified with the ________ attribute.

**Answer: `lang`.** For example, `<html lang="en">` identifies English content.

### 4. Document metadata such as the title belongs inside the ________ element.

**Answer: `<head>`.** The head contains information about the document.

### 5. The page's main content belongs inside the ________ element.

**Answer: `<body>`.** This is where headings, paragraphs, and other visible content go.

### 6. The browser tab text is set with the ________ element.

**Answer: `<title>`.** Place it inside the head.

### 7. A basic HTML file should use the ________ filename extension.

**Answer: `.html`.** For example, `index.html`.

### 8. The example declares the character encoding as ________.

**Answer: UTF-8.** It is written as `<meta charset="utf-8">`.

## Short-answer questions

### 1. What is the difference between the head and the body?

**Answer:** The head contains document information, such as the character encoding and title. The body contains the content shown in the page area.

**Explanation:** Put `<title>` and `<meta charset="utf-8">` in the head, and put elements such as `<h1>` and `<p>` in the body.

### 2. Why should an HTML page have both a title and a visible main heading?

**Answer:** They serve different purposes. The title names the document in places such as the browser tab, while a heading such as `<h1>` appears as content in the page.

### 3. What does the `lang` attribute do, and what does it not do?

**Answer:** It identifies the language of the page's text. It does not translate the text or force all content to be in that language.

### 4. Why declare UTF-8 near the beginning of the document?

**Answer:** It tells the browser how to interpret the document's characters, helping letters and symbols display correctly. The file should also be saved as UTF-8.

### 5. Is indentation required for HTML nesting to work?

**Answer:** No. Tags determine the nesting. Indentation is still recommended because it makes the hierarchy easier to read.

### 6. How can you inspect the source of a page you opened in a browser?

**Answer:** Open the file in a text editor or use the browser's view-source feature. The source shows the markup, while the rendered page shows the browser's presentation of it.

## Practical HTML questions

### 1. Write a complete document for a page titled "About Me" with one heading and two paragraphs.

**Answer:**

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>About Me</title>
</head>
<body>
  <h1>About Me</h1>
  <p>I am learning how HTML documents are organized.</p>
  <p>This is my first complete page.</p>
</body>
</html>
~~~

**Explanation:** The doctype comes first. The title and character encoding go in the head, and the visible heading and paragraphs go in the body.

### 2. Fix the misplaced elements in this document.

~~~html
<html lang="en">
  <body>
    <title>Learning HTML</title>
    <h1>My page</h1>
  </body>
  <head>
    <meta charset="utf-8">
  </head>
</html>
~~~

**Answer:**

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Learning HTML</title>
</head>
<body>
  <h1>My page</h1>
</body>
</html>
~~~

**Explanation:** Put the doctype first, keep head before body inside html, and place the title in the head. The visible heading belongs in the body.

### 3. For this example, identify what appears in the browser tab and what appears in the page area.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Travel Notes</title>
</head>
<body>
  <h1>Places I Want to Visit</h1>
  <p>I am collecting ideas for a future trip.</p>
</body>
</html>
~~~

**Answer:** "Travel Notes" commonly appears in the browser tab. "Places I Want to Visit" and the paragraph appear in the page area.

**Explanation:** The title names the document; body elements provide the page content.

### 4. Adapt the starter document for a page written primarily in Hindi.

**Answer:** Change the language value to `hi`, and write the title and body content in Hindi. For example:

~~~html
<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8">
  <title>मेरे नोट्स</title>
</head>
<body>
  <h1>मेरे नोट्स</h1>
  <p>मैं HTML सीख रहा हूँ।</p>
</body>
</html>
~~~

**Explanation:** The `lang` value should match the page's primary language. UTF-8 supports the Devanagari characters in this example.

### 5. Put these steps in a sensible order: refresh the browser, save the file, edit the HTML, open the file in a browser.

**Answer:** Edit the HTML, save the file, open it in a browser, then refresh the browser after later edits.

**Explanation:** A browser can only show the saved version of a local file. Save each change before refreshing to see it.

### 6. You saved a file, but it is named `index.html.txt`. What should you do?

**Answer:** Rename or resave it as `index.html`, then open that file in the browser.

**Explanation:** Some editors hide extensions, so check the full filename and make sure `.txt` was not added.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [02 - How HTML fits into a web page](02-html-css-and-javascript.md) | [Lesson](../lessons/03-basic-html-document.md) | [Example](../examples/03-basic-html-document.md) | [04 - Doctype and browser rendering modes](04-doctype-and-rendering-modes.md) |
