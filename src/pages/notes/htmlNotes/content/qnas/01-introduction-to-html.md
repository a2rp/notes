# 01 - Introduction to HTML: Questions and Answers

Practice questions for [Lesson 01 - Introduction to HTML](../lessons/01-introduction-to-html.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What does HTML stand for?

- A. HyperText Markup Language
- B. HighText Machine Language
- C. Hyperlink and Text Management Language
- D. Home Tool Markup Language

**Answer: A. HyperText Markup Language.** HTML is the markup language used to describe the structure and meaning of web content.

### 2. What is HTML mainly used for?

- A. Choosing the colors and spacing of a page
- B. Describing the structure and meaning of page content
- C. Running calculations in a browser
- D. Storing files on a server

**Answer: B. Describing the structure and meaning of page content.** HTML identifies content such as headings, paragraphs, and links.

### 3. Which technology is mainly used for presentation and layout?

- A. HTML
- B. CSS
- C. JavaScript
- D. A web browser

**Answer: B. CSS.** CSS controls visual presentation, including colors, fonts, spacing, and layout.

### 4. Which technology can add behavior and logic to a page?

- A. HTML
- B. CSS
- C. JavaScript
- D. A file extension

**Answer: C. JavaScript.** JavaScript can respond to events and update page behavior or content.

### 5. In `<a href="https://example.com/">Visit Example</a>`, what does `href` provide?

- A. The link's destination
- B. The page title
- C. The link's font
- D. The browser name

**Answer: A. The link's destination.** The `href` attribute tells the browser where the link should go.

### 6. Which choice describes an HTML element?

- A. Only the text between angle brackets
- B. The complete structure made from tags and, where applicable, content
- C. A browser window
- D. A CSS color

**Answer: B.** For a paragraph, the start tag, content, and end tag together form the element.

### 7. Which element is a void element and does not have an end tag?

- A. `<p>`
- B. `<strong>`
- C. `<img>`
- D. `<h1>`

**Answer: C. `<img>`.** An image element is a void element. It does not wrap text and has no end tag.

### 8. What does a browser do with an HTML document?

- A. Parses it and builds a structured representation of the page
- B. Automatically writes CSS for every element
- C. Converts every link into JavaScript
- D. Changes the source file into a word-processing document

**Answer: A.** The browser parses the markup and uses its structure to display the page.

### 9. Where does the main page content belong in a basic document?

- A. Inside `<title>`
- B. Inside `<body>`
- C. Inside `<meta>`
- D. Before the doctype

**Answer: B. Inside `<body>`.** The body contains content presented in the page area.

### 10. Which is the best element for the main visible heading in the chapter's example?

- A. `<title>`
- B. `<meta>`
- C. `<h1>`
- D. `<html>`

**Answer: C. `<h1>`.** The `<h1>` marks the main heading in the page. The `<title>` names the document and is commonly shown in the browser tab.

## Objective questions

### True or false

### 1. HTML stands for HyperText Markup Language.

**Answer: True.** That is the full form of HTML.

### 2. CSS is mainly responsible for the structure and meaning of content.

**Answer: False.** HTML describes structure and meaning. CSS mainly controls presentation and layout.

### 3. A page can contain useful HTML even when it has no CSS or JavaScript.

**Answer: True.** A browser can display HTML using its built-in styles, and many native HTML features work without JavaScript.

### 4. The browser parses HTML and uses it to build a structured representation.

**Answer: True.** The browser interprets the markup before displaying the page.

### 5. The text `class="intro"` in `<p class="intro">` is an attribute.

**Answer: True.** The attribute is written in the start tag and gives extra information about the paragraph element.

### 6. A tag and an element mean exactly the same thing.

**Answer: False.** A tag is a piece of markup such as `<p>`. An element is the complete structure made from its tags and content, where applicable.

### 7. Every HTML element has an end tag.

**Answer: False.** Void elements such as `<img>` do not have end tags.

### 8. The `<title>` is commonly shown in the browser tab.

**Answer: True.** It names the document and is commonly used for the browser tab, bookmarks, and history.

### 9. The `href` attribute holds the destination of a link.

**Answer: True.** An anchor uses `href` to specify where the link leads.

### 10. The `<strong>` element communicates strong importance, even if a browser often displays it in bold.

**Answer: True.** The element carries meaning. Its default visual appearance is separate from that meaning.

### Fill in the blanks

### 1. HTML means ______________________________.

**Answer: HyperText Markup Language.** This is the expansion of the abbreviation HTML.

### 2. The technology commonly used for colors, fonts, and layout is __________________.

**Answer: CSS.** CSS controls presentation and layout.

### 3. The attribute that gives an anchor element its destination is __________________.

**Answer: `href`.** It supplies the link destination.

### 4. The main page content belongs inside the __________________ element.

**Answer: `body`.** The body contains the content presented as the page.

### 5. An element that does not have an end tag, such as `<img>`, is called a __________________ element.

**Answer: Void.** Void elements do not wrap content and do not have end tags.

## Short-answer questions

### 1. Explain the difference between HTML, CSS, and JavaScript.

**Answer:** HTML describes page structure and meaning. CSS controls presentation and layout. JavaScript can add behavior and logic.

### 2. What is the difference between an HTML source file and the rendered page?

**Answer:** The source file is the markup written by the author. The rendered page is what the browser displays after it interprets the markup.

### 3. In `<p class="intro">I am learning HTML.</p>`, identify the start tag, attribute, content, end tag, and complete element.

**Answer:**

- Start tag: `<p class="intro">`
- Attribute: `class="intro"`
- Content: `I am learning HTML.`
- End tag: `</p>`
- Complete element: the start tag, content, and end tag together

### 4. Why should you choose an HTML element for the meaning of the content instead of only for its default appearance?

**Answer:** Choosing an element for its meaning gives the page a useful structure that browsers and assistive technologies can understand. CSS can change how it looks without changing that meaning.

### 5. Why can a link work without JavaScript?

**Answer:** An anchor with an `href` has a destination that the browser can navigate to. Ordinary link navigation is built into HTML and the browser.

## HTML practice questions

### 1. Build a simple page

Create a complete HTML document about a hobby. Include a doctype, an `html` root with a language attribute, a head with character encoding and title, and a body with one main heading and two paragraphs.

**Example answer:**

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My Favorite Hobby</title>
</head>
<body>
  <h1>My Favorite Hobby</h1>
  <p>I enjoy drawing in my free time.</p>
  <p>Practicing regularly helps me learn new techniques.</p>
</body>
</html>
~~~

Other answers are correct if they use the requested document structure and suitable content.

### 2. Add a useful link

Add a link to an HTML learning resource. Give it a destination and descriptive text that makes sense when read by itself.

**Example answer:**

~~~html
<a href="https://example.com/html-guide">HTML learning guide</a>
~~~

The `href` attribute gives the destination. The link text describes what the reader will find.

### 3. Repair the markup

Rewrite this page as a clear, complete HTML document:

~~~html
<html>
<head>
  <h1>About me</h1>
  <title>About me</title>
</head>
<body>
  <p>I am learning HTML.</p>
  <a>My HTML learning resource</a>
</body>
</html>
~~~

**Example answer:**

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>About me</title>
</head>
<body>
  <h1>About me</h1>
  <p>I am learning HTML.</p>
  <a href="https://example.com/html-guide">My HTML learning resource</a>
</body>
</html>
~~~

The corrected page adds a doctype, language, and character encoding. It puts the heading in the body and gives the link an `href` destination.

---

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
|  | [Lesson](../lessons/01-introduction-to-html.md) | [Example](../examples/01-introduction-to-html.md) | [02 - How HTML fits into a web page](02-html-css-and-javascript.md) |
