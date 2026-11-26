# 55 - HTML quick reference and glossary: Questions and Answers

Use these questions to review [Chapter 55 - HTML quick reference and glossary](../lessons/55-html-reference-and-glossary.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is an HTML element?

A. Only the text inside a page

B. The complete structure formed by its markup and content

C. A browser tab

D. A CSS rule

**Answer: B.** Tags mark the beginning or end of an element. The element includes its structure and content.

### 2. Which of these is a void element?

A. paragraph

B. section

C. img

D. article

**Answer: C.** An image is a void element. It has no content or end tag.

### 3. Which element represents the main content of a page?

A. main

B. footer

C. aside

D. span

**Answer: A.** The main element contains the document's main content.

### 4. Which list should be used for steps that must happen in sequence?

A. ul

B. ol

C. dl

D. nav

**Answer: B.** An ordered list represents a sequence. Use an unordered list when the order does not matter.

### 5. What identifies a form value when the browser submits the form?

A. The label text

B. The name attribute

C. The heading level

D. The placeholder text

**Answer: B.** The name attribute supplies the control's key in submitted form data.

## True or false

### 1. A tag and an element mean exactly the same thing.

**Answer: False.** Tags are markup that start or end an element. An element is the full structure.

### 2. An HTML Boolean attribute is enabled by being present.

**Answer: True.** For example, required="false" is still present, so it does not turn the required attribute off.

### 3. A table is the right choice for arranging page headings and paragraphs into a layout.

**Answer: False.** Tables are for data arranged in rows and columns, not general page layout.

### 4. A label should be associated with the form control it names.

**Answer: True.** A label identifies the control and helps people understand and operate it.

### 5. Passing an HTML validator proves that the page is fully accessible.

**Answer: False.** Validation checks markup conformance, but cannot decide every issue of meaning, accessibility, or usability.

## Short-answer questions

### 1. What is the DOM?

**Answer:** The DOM is the structured document tree the browser builds from HTML. Scripts can change it after the page loads.

### 2. What does semantic HTML mean?

**Answer:** Semantic HTML uses elements that communicate the role and meaning of content, such as headings, navigation, articles, and lists.

### 3. What is the purpose of a void element?

**Answer:** A void element provides its function without wrapping content or using an end tag. Examples include img, input, and meta.

### 4. What is the difference between an id and a class?

**Answer:** An id identifies one element in a document and should be unique there. A class can group multiple elements that share a purpose or styling.

### 5. Why does a form need an endpoint?

**Answer:** HTML describes the form and the submission request. A server or service at the action URL must receive and process the submitted data.

## Practical questions

### 1. Write a minimal HTML document with a language, character encoding, title, main element, and heading.

**Answer:**

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Garden Notes</title>
  </head>
  <body>
    <main>
      <h1>Garden Notes</h1>
    </main>
  </body>
</html>
~~~

The doctype identifies the HTML document type, the language describes the page's main language, and the title names the document.

### 2. Create a page link to a contact section with a unique ID.

**Answer:**

~~~html
<a href="#contact">Go to contact information</a>

<section id="contact">
  <h2>Contact</h2>
  <p>Email us for more information.</p>
</section>
~~~

The fragment in the link points to the element whose ID is contact. Use that ID value only once in the document.

### 3. Add an image with useful alternative text.

**Answer:**

~~~html
<img src="garden.jpg" alt="Rows of herbs growing in a raised bed">
~~~

The alternative text describes information conveyed by the image. For a purely decorative image, use an empty alt value.

### 4. Create an ordered list with two steps.

**Answer:**

~~~html
<ol>
  <li>Fill the pot with soil.</li>
  <li>Plant the seed.</li>
</ol>
~~~

The ordered list is appropriate because the steps have a sequence.

### 5. Add an associated label and a required email control.

**Answer:**

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email" required>
~~~

The label's for value matches the input's id. The name identifies the submitted value. Required asks the browser to check that a value is present before ordinary submission.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [54 - HTML-only practice pages](54-html-practice-projects.md) | [Lesson](../lessons/55-html-reference-and-glossary.md) | [Example](../examples/55-html-reference-and-glossary.md) | [56 - The base element and relative URLs](56-base-element-and-relative-urls.md) |