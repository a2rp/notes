# 06 - Nesting, void elements, and HTML syntax: Questions and Answers

Practice questions for [Lesson 06 - Nesting, void elements, and HTML syntax](../lessons/06-nesting-and-html-syntax.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. In this markup, which element is the parent of the paragraph?

~~~html
<main>
  <p>Garden notes</p>
</main>
~~~

- A. `p`
- B. `main`
- C. `html`
- D. There is no parent

**Answer: B.** The paragraph is inside `main`, so `main` is its parent.

### 2. What is the correct way to close nested elements?

- A. Close them in the same order they were opened
- B. Close the outermost element first
- C. Close them in the reverse order they were opened
- D. End every element with a slash

**Answer: C.** Close the most recently opened element first, then continue outward.

### 3. Which example is correctly nested?

- A. `<p><strong>Read this</p></strong>`
- B. `<p><strong>Read this</strong></p>`
- C. `<p><strong>Read this</p><strong>`
- D. `<p></strong>Read this</p>`

**Answer: B.** The `strong` element opens inside the paragraph and closes before the paragraph ends.

### 4. What is a void element?

- A. An element that cannot have attributes
- B. An element with no content and no end tag
- C. An element hidden by the browser
- D. An element that must have an empty start and end tag

**Answer: B.** A void element cannot contain child content and does not have an end tag.

### 5. Which is a correct way to write an image element in HTML?

- A. `<img src="photo.jpg"></img>`
- B. `<img src="photo.jpg" alt="A small garden">`
- C. `</img src="photo.jpg">`
- D. `<image src="photo.jpg"></image>`

**Answer: B.** `img` is a void element. It has a start tag with attributes and no end tag.

### 6. Which set contains only common void elements?

- A. `p`, `h1`, `main`
- B. `img`, `br`, `hr`
- C. `ul`, `li`, `strong`
- D. `section`, `article`, `footer`

**Answer: B.** `img`, `br`, and `hr` are all void elements.

### 7. What does indentation do in HTML source?

- A. It creates the parent and child relationships
- B. It helps people see the nesting more easily
- C. It changes a paragraph into a heading
- D. It closes open elements automatically

**Answer: B.** Tags define the document tree. Indentation makes that tree easier to read.

### 8. In HTML, what does the trailing slash in `<img src="photo.jpg" />` do?

- A. It is required to make img a void element
- B. It turns HTML into XML
- C. It has no effect on the meaning and is unnecessary
- D. It supplies the missing alt text

**Answer: C.** In HTML, the slash on a void element is unnecessary. The element is void because of its HTML definition.

### 9. What does a trailing slash in `<section/>` do in an HTML document?

- A. It properly closes the section element
- B. It has no self-closing effect on this normal element
- C. It removes the section from the document
- D. It turns section into a void element

**Answer: B.** A normal HTML element needs its proper end tag, such as `</section>`. The slash does not close it.

### 10. Why should you not depend on a browser to repair incorrectly nested markup?

- A. Browsers never display invalid markup
- B. A browser's recovery may not match the structure you intended
- C. Browsers ignore all end tags
- D. Incorrect nesting always deletes the file

**Answer: B.** Browsers try to display imperfect pages, but their recovery can produce a different document tree from what you intended.

## Objective questions

### True or false

### 1. Elements can contain other elements, forming a document tree.

**Answer: True.** A parent element can contain child elements, which may have their own children.

### 2. Two elements with the same parent are siblings.

**Answer: True.** For example, an `h1` and a `p` inside the same `main` are siblings.

### 3. Nested elements should be closed in the same order they were opened.

**Answer: False.** Close the most recently opened element first, which is the reverse order.

### 4. The `img` element has a closing tag.

**Answer: False.** `img` is a void element and has no end tag.

### 5. The `br` element can be written without an end tag.

**Answer: True.** `br` is a void element.

### 6. Adding a slash makes a normal HTML element such as `section` self-closing.

**Answer: False.** The slash does not close normal HTML elements. Write an end tag such as `</section>`.

### 7. Indentation creates the actual parent and child relationships between elements.

**Answer: False.** Tags create those relationships. Indentation only helps people read them.

### 8. A browser may recover from some invalid markup.

**Answer: True.** Browsers often try to display imperfect pages, but the result may not match the author's intention.

### 9. A list item should be placed inside a list element.

**Answer: True.** Put `li` elements inside a list such as `ul` or `ol`.

### 10. Every HTML element has both a start tag and an end tag.

**Answer: False.** Void elements such as `img` and `hr` do not have end tags. Most content elements use explicit end tags.

## Fill in the blanks

### 1. The element that contains another element is its ________.

**Answer: Parent.** The contained element is its child.

### 2. Elements that share the same parent are called ________.

**Answer: Siblings.** For example, two paragraphs inside one section are siblings.

### 3. Close nested elements in the ________ order from which they were opened.

**Answer: Reverse.** The last element opened is the first one closed.

### 4. An element that cannot contain child content and has no end tag is a ________ element.

**Answer: Void.** `img` and `br` are examples.

### 5. The `li` element belongs inside a list such as `ul` or `________`.

**Answer: `ol`.** An ordered list uses `ol`.

### 6. Indentation helps people read the source, but ________ establish the document tree.

**Answer: Tags.** The start and end tags show the element relationships.

### 7. The `________` element adds a line break and has no end tag.

**Answer: `br`.** It is a void element.

### 8. The slash in `<section/>` does not replace the normal `________` tag.

**Answer: End.** Close a normal section with `</section>`.

## Short-answer questions

### 1. What are parent, child, and sibling relationships in HTML?

**Answer:** A parent contains another element. The contained element is its child. Elements that have the same parent are siblings.

**Explanation:** In `<main><h1>Title</h1><p>Text</p></main>`, `main` is the parent and the heading and paragraph are child siblings.

### 2. Why should nested elements close in reverse opening order?

**Answer:** This keeps each element's content inside the right pair of tags and preserves the intended hierarchy.

### 3. What is a void element? Give three examples.

**Answer:** A void element cannot contain child content and has no end tag. Examples include `img`, `br`, and `hr`.

### 4. Does `<img />` need a trailing slash in HTML?

**Answer:** No. The slash is unnecessary in HTML. Write `<img>` with its needed attributes, such as `src` and `alt`.

### 5. Why use indentation if it does not create the document tree?

**Answer:** Indentation makes the hierarchy visible to people, helping them check which elements are nested and whether tags close in the right order.

### 6. Why is browser error recovery not a substitute for correct nesting?

**Answer:** The browser may repair invalid markup in a way that differs from the structure the author intended. Clear, valid markup is easier to read and more predictable.

## Practical HTML questions

### 1. Fix the closing order in this example.

~~~html
<p><strong>Important text</p></strong>
~~~

**Answer:**

~~~html
<p><strong>Important text</strong></p>
~~~

**Explanation:** The `strong` element was opened inside `p`, so it must close first.

### 2. Write an unordered list with two list items.

**Answer:**

~~~html
<ul>
  <li>Read the instructions</li>
  <li>Try the example</li>
</ul>
~~~

**Explanation:** Each `li` is a child of the `ul` element.

### 3. Write an image element for `garden.jpg` with useful alternative text. Do not add an end tag.

**Answer:**

~~~html
<img src="garden.jpg" alt="Raised garden beds beside a wooden fence">
~~~

**Explanation:** `img` is void, so it has no end tag. Its `src` and `alt` attributes belong in the start tag.

### 4. Write a paragraph with a line break between "Good morning." and "Welcome back."

**Answer:**

~~~html
<p>Good morning.<br>Welcome back.</p>
~~~

**Explanation:** `br` creates a line break and is a void element.

### 5. Correct this markup so the list is not placed inside a paragraph.

~~~html
<p>Today's tasks:
  <ul>
    <li>Water the plants</li>
    <li>Check the soil</li>
  </ul>
</p>
~~~

**Answer:**

~~~html
<p>Today's tasks:</p>
<ul>
  <li>Water the plants</li>
  <li>Check the soil</li>
</ul>
~~~

**Explanation:** A list should not be nested inside a paragraph. End the paragraph before starting the list.

### 6. Is this a correctly closed section? If not, rewrite it using clear indentation.

~~~html
<section><h2>Tasks</section></h2>
~~~

**Answer:**

~~~html
<section>
  <h2>Tasks</h2>
</section>
~~~

**Explanation:** The heading opens inside the section, so close the heading before closing the section.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [05 - Elements, tags, and attributes](05-elements-tags-and-attributes.md) | [Lesson](../lessons/06-nesting-and-html-syntax.md) | [Example](../examples/06-nesting-and-html-syntax.md) | [07 - Global attributes](07-global-attributes.md) |
