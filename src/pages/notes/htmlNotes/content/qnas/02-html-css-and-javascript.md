# 02 - How HTML fits into a web page: Questions and Answers

Practice questions for [Lesson 02 - How HTML fits into a web page](../lessons/02-html-css-and-javascript.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is HTML mainly responsible for?

- A. Describing content, structure, and meaning
- B. Choosing every color and font
- C. Responding to every button click
- D. Hosting the website

**Answer: A.** HTML describes what the page content is and how it is structured. CSS controls presentation, and JavaScript can add behavior.

### 2. Which technology is mainly used to control colors, fonts, and spacing?

- A. HTML
- B. CSS
- C. JavaScript
- D. The browser tab

**Answer: B. CSS.** CSS rules change how selected HTML elements appear.

### 3. Which technology can listen for a click and update a paragraph?

- A. HTML alone in every case
- B. CSS
- C. JavaScript
- D. The page title

**Answer: C. JavaScript.** JavaScript can respond to events such as clicks and update page content.

### 4. What happens to the HTML content when custom CSS is removed?

- A. The content is deleted
- B. The HTML structure and content remain, but the custom styling is removed
- C. The browser converts the page into JavaScript
- D. Every link stops working

**Answer: B.** CSS controls presentation. Removing it does not remove the HTML content.

### 5. Which HTML feature can open and close a disclosure without JavaScript?

- A. `<details>` with `<summary>`
- B. `<style>` with `<p>`
- C. `<strong>` with `<h1>`
- D. `<meta>` with `<title>`

**Answer: A.** The browser provides built-in behavior for the `<details>` and `<summary>` elements.

### 6. Which markup connects an HTML document to an external stylesheet named `styles.css`?

- A. `<script src="styles.css"></script>`
- B. `<link rel="stylesheet" href="styles.css">`
- C. `<style href="styles.css">`
- D. `<a href="styles.css">`

**Answer: B.** A `<link>` element with `rel="stylesheet"` and an `href` connects the stylesheet.

### 7. What does the `defer` attribute do on an external script?

- A. It asks the browser to run the script after parsing the document
- B. It removes the script from the page
- C. It turns the script into a stylesheet
- D. It makes the script run before the browser reads the HTML

**Answer: A.** The browser can fetch the script while parsing, then run it after the document has been parsed.

### 8. Which is the best element for a section heading, regardless of its default appearance?

- A. `<strong>`
- B. `<p>`
- C. A heading element such as `<h2>`
- D. `<script>`

**Answer: C.** Choose an element for its meaning. CSS can change the appearance of a real heading.

### 9. In the lesson's button example, what does the HTML do?

- A. It creates the button and paragraph elements
- B. It waits for a click and changes the paragraph by itself
- C. It sets all page colors
- D. It opens the browser developer tools

**Answer: A.** The HTML creates the elements. The JavaScript finds them, listens for a click, and changes the paragraph text.

### 10. Which statement about a web page is correct?

- A. HTML, CSS, and JavaScript must always be in one file
- B. A page can use separate HTML, CSS, and JavaScript files
- C. CSS replaces HTML after the page loads
- D. Every HTML page needs JavaScript to show content

**Answer: B.** The files can be kept separate and connected when needed. A basic HTML page can work without CSS or JavaScript.

## Objective questions

### True or false

### 1. HTML describes page content and structure.

**Answer: True.** HTML identifies roles such as headings, paragraphs, links, and page sections.

### 2. CSS can make a paragraph look large, so it becomes a heading.

**Answer: False.** CSS changes presentation, not the element's meaning. Use a heading element for a heading.

### 3. An ordinary link with an `href` can navigate without JavaScript.

**Answer: True.** Browsers provide link navigation as a built-in HTML feature.

### 4. Every interaction on a web page requires JavaScript.

**Answer: False.** Some features, such as a `<details>` disclosure, work with built-in HTML behavior.

### 5. Removing a page's custom stylesheet removes its HTML content.

**Answer: False.** The content and structure remain. The page loses the custom presentation rules.

### 6. The `<style>` element can contain CSS.

**Answer: True.** CSS can be written inside a `<style>` element or connected from a separate stylesheet.

### 7. A `<button>` automatically performs any action described by its label.

**Answer: False.** A button needs an appropriate form behavior or additional behavior, such as JavaScript, to perform a specific action.

### 8. The `<details>` element can open and close without JavaScript.

**Answer: True.** Its basic disclosure behavior is provided by HTML and the browser.

### 9. The `<link rel="stylesheet">` element can connect an external CSS file.

**Answer: True.** Its `href` attribute identifies the stylesheet file.

### 10. HTML, CSS, and JavaScript can be stored in separate files.

**Answer: True.** HTML can link to a stylesheet and load an external script.

### Fill in the blanks

### 1. The technology that describes page structure and meaning is __________________.

**Answer: HTML.** HTML marks up headings, paragraphs, links, and other content.

### 2. The technology that controls presentation and layout is __________________.

**Answer: CSS.** It sets visual rules such as fonts, colors, spacing, and positioning.

### 3. The technology that can respond to events and update content is __________________.

**Answer: JavaScript.** It can respond to actions such as a click.

### 4. The `<details>` element commonly uses a `<summary>` element for its visible __________________.

**Answer: Label or summary.** The summary tells readers what the disclosure is about and can be activated to open or close it.

### 5. The attribute that supplies a destination in a link is __________________.

**Answer: `href`.** An anchor uses this attribute to specify where it leads.

## Short-answer questions

### 1. Explain the different jobs of HTML, CSS, and JavaScript.

**Answer:** HTML describes content, structure, and meaning. CSS controls presentation and layout. JavaScript can add behavior and logic.

### 2. Why is a paragraph that looks large still not a heading?

**Answer:** Its HTML element is still a paragraph. CSS changes only how it looks. Use a heading element such as `<h2>` when the content is a heading.

### 3. What changes when the custom CSS is removed from a page?

**Answer:** The HTML content and structure remain, but the custom appearance rules no longer apply. The browser displays the content with its default presentation.

### 4. What changes when the JavaScript is removed from the combined example in the lesson?

**Answer:** The button and status paragraph remain because they are HTML. The button no longer changes the message. The `<details>` disclosure still opens and closes because that behavior is built into HTML.

### 5. Why might a page use a separate stylesheet instead of writing all CSS in the HTML file?

**Answer:** A separate stylesheet keeps presentation rules together and can make them easier to maintain. The HTML document can connect to it with a `<link rel="stylesheet">` element.

## HTML practice questions

### 1. Create a meaningful HTML-only page

Write a small page with a main heading, a paragraph, a descriptive link, and a disclosure with a summary and paragraph. Do not add CSS or JavaScript.

**Example answer:**

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Weekend Walk</title>
</head>
<body>
  <main>
    <h1>Plan a weekend walk</h1>
    <p>Bring water and check the weather before you leave.</p>
    <p><a href="https://example.com/trails">Browse local trails</a></p>

    <details>
      <summary>What should I bring?</summary>
      <p>Bring water, comfortable shoes, and a light jacket.</p>
    </details>
  </main>
</body>
</html>
~~~

The page has meaningful structure, a working link, and a disclosure using built-in HTML behavior. No stylesheet or script is required.

### 2. Connect separate CSS and JavaScript files

Write the HTML markup that connects `styles.css` and `script.js`. The script should be deferred.

**Example answer:**

~~~html
<head>
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
~~~

The `link` element connects the stylesheet. The `script` element connects the JavaScript file, and `defer` asks the browser to run it after parsing the document.

### 3. Choose the right element

A page uses `<strong>Opening hours</strong>` as the heading for a section. Rewrite the snippet so the markup describes a heading.

**Answer:**

~~~html
<h2>Opening hours</h2>
~~~

`<strong>` communicates strong importance. It is not a substitute for a heading. Use a heading element for a section heading, then use CSS if its appearance needs to change.

---

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [01 - Introduction to HTML](01-introduction-to-html.md) | [Lesson](../lessons/02-html-css-and-javascript.md) | [Example](../examples/02-html-css-and-javascript.md) | [03 - The basic HTML document](03-basic-html-document.md) |
