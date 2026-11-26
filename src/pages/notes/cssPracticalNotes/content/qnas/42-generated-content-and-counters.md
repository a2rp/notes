# 42 - Generated content and counters - Q&A

Review `::before`, `::after`, generated strings, counter scope, and semantic HTML. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. What are `::before` and `::after`?

- A. HTML elements inserted into the document source
- B. Styleable pseudo-elements around an element's actual content
- C. CSS files loaded before and after the page
- D. Selectors that only work on images

**Answer: B. Styleable pseudo-elements around an element's actual content.**

**Explanation:** `::before` represents a generated child before the originating element's content. `::after` represents one after it.

### 2. Which property supplies generated content for these pseudo-elements?

- A. `content`
- B. `text-value`
- C. `counter-reset`
- D. `pseudo-text`

**Answer: A. `content`.**

**Explanation:** The `content` property can generate strings, counter values, and other supported content in a pseudo-element.

### 3. What does `content: ""` commonly create?

- A. An empty generated pseudo-element box that can be styled
- B. A visible pair of quotation marks
- C. A new HTML `div`
- D. A counter starting at one

**Answer: A. An empty generated pseudo-element box that can be styled.**

**Explanation:** An empty string can generate a box with no text. It can be styled as a decorative shape or line.

### 4. What does `counter-reset: chapter` do by default?

- A. Removes the chapter element
- B. Creates or resets a counter named `chapter` to zero
- C. Increments `chapter` by one
- D. Displays the counter value

**Answer: B. Creates or resets a counter named `chapter` to zero.**

**Explanation:** `counter-reset` establishes a counter scope. A starting integer can also be provided.

### 5. What is the default amount for `counter-increment: chapter`?

- A. Zero
- B. One
- C. Ten
- D. The number of child elements

**Answer: B. One.**

**Explanation:** `counter-increment` increases the named counter by one unless a different integer is specified.

### 6. What does `counter(chapter)` display?

- A. The value of the innermost counter named `chapter`
- B. Every nested counter value named `chapter`
- C. The number of HTML headings
- D. The counter's reset location

**Answer: A. The value of the innermost counter named `chapter`.**

**Explanation:** Use `counters(chapter, ".")` when the output should combine multiple nested counters of that name.

### 7. What does `counters(item, ".")` do when `item` is nested?

- A. Displays the values joined by periods, from outermost to innermost
- B. Adds the values and displays their sum
- C. Displays only the outermost value
- D. Resets every `item` counter to zero

**Answer: A. Displays the values joined by periods, from outermost to innermost.**

**Explanation:** `counters()` is useful for hierarchical numbering such as `2.1` or `2.1.3`.

### 8. Which HTML structure represents steps whose order matters?

- A. A set of paragraphs with CSS counters only
- B. An ordered list using `<ol>` and `<li>`
- C. A `<div>` with generated numbers
- D. A heading with `counter-increment`

**Answer: B. An ordered list using `<ol>` and `<li>`.**

**Explanation:** HTML communicates the sequence. CSS can restyle its markers without removing the list's meaning.

## Short-answer questions

### 9. Does `content: "<strong>Important</strong>"` create a strong HTML element?

**Answer:** No.

**Explanation:** Generated content is not parsed as HTML markup. It produces content in a pseudo-element, not a new semantic or interactive element.

### 10. Why should essential instructions remain in HTML instead of only in generated CSS text?

**Answer:** The document should still communicate important information if styles are missing or generated content is handled differently by a user agent.

**Explanation:** CSS content is a presentation aid. Put essential words and structure in the document itself.

### 11. What is the default counter style used by `counter(name)` if no style is specified?

**Answer:** Decimal.

**Explanation:** You can provide a style such as `upper-roman` or `lower-alpha` as the second argument.

### 12. What is the difference between `counter-reset` and `counter-increment`?

**Answer:** `counter-reset` creates or resets a counter. `counter-increment` changes its value, by one by default.

**Explanation:** Reset placement establishes a counter scope; increment placement determines which elements advance its value.

### 13. What does `counter-set` do?

**Answer:** It sets a named counter to a specified value.

**Explanation:** It is another way to change a counter's value, distinct from creating a scope with `counter-reset` or changing it by a step with `counter-increment`.

### 14. Why can a nested counter restart at an unexpected value?

**Answer:** A reset may be placed on an element that creates a new scope more often than intended.

**Explanation:** Check where counters are reset, which elements increment them, and how the elements are nested in the document tree.

### 15. Why should you not use CSS-generated numbers as the only representation of required task order?

**Answer:** The sequence is important document structure, so it should be represented by an ordered list in HTML.

**Explanation:** CSS counters generate presentation. A semantic `<ol>` communicates the order in the document.

### 16. What does `content: none` do on `::before` or `::after`?

**Answer:** It suppresses that pseudo-element.

**Explanation:** A pseudo-element with `content: none` or the default `normal` does not generate a box.

## Applied questions

### 17. Number each `.chapter` heading in decimal order, starting at 1.

**Answer:**

~~~css
.document {
  counter-reset: chapter;
}

.chapter {
  counter-increment: chapter;
}

.chapter > h2::before {
  content: "Chapter " counter(chapter) ". ";
}
~~~

**Explanation:** The document starts the counter at zero, and each chapter advances it before the heading displays the value.

### 18. Change a generated chapter number to uppercase Roman numerals.

**Answer:**

~~~css
.chapter > h2::before {
  content: counter(chapter, upper-roman) ". ";
}
~~~

**Explanation:** The second argument to `counter()` selects the counter style. `upper-roman` displays values such as I, II, and III.

### 19. How can an empty pseudo-element create a decorative bar after a note?

**Answer:**

~~~css
.note::after {
  content: "";
  display: block;
  width: 3rem;
  height: 0.2rem;
  background-color: #075b9b;
}
~~~

**Explanation:** The empty string generates a box with no text. The dimensions and background make it a visual decoration.

### 20. A section title is generated with `content: "Section " counter(section)`. What remains necessary in the HTML?

**Answer:** The actual heading text and its heading element.

**Explanation:** The generated prefix may supplement the heading, but it does not create the heading structure or its meaningful words.

### 21. When should you use `counters()` instead of `counter()`?

**Answer:** Use `counters()` when the output should include every nested instance of a same-named counter, joined with a separator.

**Explanation:** For example, nested lists can use `counters(item, ".")` to produce numbering such as `2.1`.

## Coding questions

### 22. Create a decorative bullet before each item with class `tip` without adding a new HTML element.

**Answer:**

~~~css
.tip::before {
  content: "• ";
  color: #075b9b;
  font-weight: 700;
}
~~~

**Explanation:** The pseudo-element adds a visual marker. Keep any essential words or instructions in the element's HTML content.

### 23. Write CSS for a nested ordered list whose markers show values such as `1`, `1.1`, and `1.1.1`.

**Answer:**

~~~css
ol.numbered {
  counter-reset: item;
  list-style: none;
}

ol.numbered li {
  counter-increment: item;
}

ol.numbered li::before {
  content: counters(item, ".") " ";
}
~~~

**Explanation:** Apply the class to each nested ordered list. Each list starts a nested counter scope, and `counters()` displays the hierarchy. Keep the `<ol>` and `<li>` elements so the document still expresses an ordered list.

### 24. Use separate counters to display a chapter number and a subsection number such as `3.2`.

**Answer:**

~~~css
.outline {
  counter-reset: chapter;
}

.outline h2 {
  counter-increment: chapter;
  counter-reset: section;
}

.outline h3 {
  counter-increment: section;
}

.outline h2::before {
  content: counter(chapter) " ";
}

.outline h3::before {
  content: counter(chapter) "." counter(section) " ";
}
~~~

**Explanation:** Each `h2` increments the chapter number and resets the subsection counter. Following `h3` elements increment the subsection number.

### 25. Add generated text after a link that says “external”, but make it a visual supplement only.

**Answer:**

~~~css
a[data-external]::after {
  content: " (external)";
  color: #526276;
  font-size: 0.9em;
}
~~~

**Explanation:** The link's destination and label must still be clear without this generated text. If the external status is essential, include it in the HTML instead of relying on CSS.

## Key takeaways

- Pseudo-elements generate styleable content before or after an element's real content.
- `content` can output strings and counter values or create an empty decorative box.
- Counters are managed by reset, increment, and set operations.
- `counter()` displays an innermost value; `counters()` joins nested values.
- Keep semantic structure and essential wording in HTML.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [41 - Custom properties and design tokens](../lessons/41-custom-properties-and-design-tokens.md) | [Q&A](42-generated-content-and-counters.md) | [Example](../examples/42-generated-content-and-counters.md) | [43 - Transforms](../lessons/43-transforms.md) |