# 54 - HTML-only practice pages: Questions and Answers

Use these questions to review [Chapter 54 - HTML-only practice pages](../lessons/54-html-practice-projects.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is the main focus of the HTML-only projects?

A. Adding colors and page layout

B. Using HTML to give content structure and meaning

C. Writing JavaScript interactions

D. Choosing a web hosting service

**Answer: B.** The exercises practice HTML structure and meaning. The browser's default presentation is enough for the projects.

### 2. Which list is appropriate for recipe instructions that must be followed in order?

A. An unordered list

B. An ordered list

C. A description list

D. A table used for layout

**Answer: B.** Use an ordered list when the sequence matters.

### 3. What should an event schedule table include to identify its subject?

A. A caption

B. A form

C. A footer inside every cell

D. A script

**Answer: A.** A caption provides a title or description for the table.

### 4. What native HTML element pair provides a built-in disclosure control?

A. section and article

B. details and summary

C. header and footer

D. label and input

**Answer: B.** The summary element labels the details disclosure, which the browser can open and close.

### 5. What does a contact form need in order to send and process messages?

A. A heading with the word Contact

B. CSS

C. A server or service that receives the form submission

D. An image with alt text

**Answer: C.** HTML can describe the form and its controls, but an endpoint must receive and process submitted data.

## True or false

### 1. HTML-only projects should use CSS to make the page look polished.

**Answer: False.** These projects focus on HTML. The browser's default presentation is sufficient for practicing structure and meaning.

### 2. An unordered list is appropriate for ingredients when their order does not matter.

**Answer: True.** Use list types according to meaning. Use an ordered list for steps that have a sequence.

### 3. A table is a good way to position headings and paragraphs on the page.

**Answer: False.** Tables are for tabular data, such as an event schedule, not general page layout.

### 4. A required input field guarantees that a submitted value is valid and safe for the receiving service.

**Answer: False.** Browser constraint checks help users catch some omissions, but the receiving application must validate submitted data too.

### 5. Passing an HTML validator proves that a project is fully accessible.

**Answer: False.** A validator can find markup problems, but people must still review meaning and usability.

## Short-answer questions

### 1. Why do the projects ask you to use HTML without CSS or JavaScript?

**Answer:** This keeps practice focused on document structure and meaning. Browsers already display headings, paragraphs, lists, and controls with a default presentation.

### 2. When should a project use an ordered list rather than an unordered list?

**Answer:** Use an ordered list when the items have a meaningful sequence, such as steps in a recipe. Use an unordered list when the sequence does not matter, such as a list of interests.

### 3. Why should an event schedule table use header cells?

**Answer:** Header cells identify what the rows or columns mean. They help readers understand each value in context, including people using assistive technology.

### 4. What is the purpose of a label on a form control?

**Answer:** A label identifies the purpose of the control and is programmatically associated with it, helping people understand and use the form.

### 5. Why does a static HTML form not automatically send an email?

**Answer:** HTML describes the form and how the browser submits it. A server or other service must receive the submission and decide how to process or deliver it.

## Practical questions

### 1. Write an unordered list with two gardening interests.

**Answer:**

~~~html
<ul>
  <li>Balcony gardening</li>
  <li>Nature photography</li>
</ul>
~~~

The order is not important, so an unordered list fits.

### 2. Write two ordered steps for planting a seed.

**Answer:**

~~~html
<ol>
  <li>Fill a pot with suitable soil.</li>
  <li>Place the seed in the soil and water it.</li>
</ol>
~~~

The steps are meant to be followed in sequence.

### 3. Write a simple table caption and one column header for an event schedule.

**Answer:**

~~~html
<table>
  <caption>Saturday workshop schedule</caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>9:00 a.m.</td>
    </tr>
  </tbody>
</table>
~~~

The caption names the table, and the header identifies the meaning of its column.

### 4. Create one FAQ disclosure with a question and an answer.

**Answer:**

~~~html
<details>
  <summary>Do I need to bring tools?</summary>
  <p>No. Shared tools will be provided.</p>
</details>
~~~

The summary is the disclosure label. The details element contains the answer.

### 5. Add an associated label and a required email field to a form.

**Answer:**

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email" required>
~~~

The label's for value matches the control's id. The required attribute asks the browser to check that a value is present before ordinary form submission, but the receiving application must validate it as well.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [53 - Validate and debug HTML](53-validation-and-debugging.md) | [Lesson](../lessons/54-html-practice-projects.md) | [Example](../examples/54-html-practice-projects.md) | [55 - HTML quick reference and glossary](55-html-reference-and-glossary.md) |