# 05 - CSS Selector Basics: Questions and Answers

Use these questions to review how basic CSS selectors match HTML elements. Each answer follows its question, with a short explanation where it helps.

## Multiple-choice questions

### 1. What does a CSS selector do?

A. Creates an HTML element<br>
B. Chooses which elements a CSS rule applies to<br>
C. Changes the meaning of an HTML element<br>
D. Opens a page in the browser

**Answer: B.** A selector describes which elements a rule matches. It does not create elements or change their HTML meaning.

### 2. Which selector matches every paragraph element?

A. `.p`<br>
B. `#p`<br>
C. `p`<br>
D. `*p`

**Answer: C.** A type selector uses the element name, so `p` matches paragraph elements.

### 3. Which CSS selector matches elements with `class="notice"`?

A. `notice`<br>
B. `.notice`<br>
C. `#notice`<br>
D. `<notice>`

**Answer: B.** A class selector begins with a period. The HTML class value itself is written without the period.

### 4. Which CSS selector matches the element with `id="main-content"`?

A. `.main-content`<br>
B. `main-content`<br>
C. `#main-content`<br>
D. `*main-content`

**Answer: C.** An ID selector begins with `#`, followed by the ID value.

### 5. Which selector matches every element?

A. `all`<br>
B. `*`<br>
C. `#`<br>
D. `.`

**Answer: B.** The universal selector, `*`, matches every element.

### 6. Which selector list applies a rule to all `h1` and `h2` elements?

A. `h1 h2`<br>
B. `h1 + h2`<br>
C. `h1, h2`<br>
D. `h1.h2`

**Answer: C.** A comma separates selectors in a selector list. The rule applies to elements matching either selector.

### 7. An element has `class="card featured"`. Which statement is true?

A. It has one class named `card featured`.<br>
B. It has two classes, `card` and `featured`.<br>
C. It has an ID named `card`.<br>
D. It has no classes because there is a space.

**Answer: B.** Spaces in the HTML `class` attribute separate class tokens. The element matches `.card` and `.featured` independently.

### 8. Which is the best selector for a reusable style needed by several chosen elements?

A. A class selector<br>
B. A different ID for every element<br>
C. A universal selector for every style<br>
D. A type selector that matches unrelated elements

**Answer: A.** Classes can be reused on as many elements as needed, making them suitable for reusable visual roles.

## True or false

### 9. The period in `.notice` belongs in the HTML class value.

**Answer: False.** Write `class="notice"` in HTML and `.notice` in CSS. The period marks a class selector in CSS.

### 10. A class may be used on multiple elements in the same document.

**Answer: True.** Reuse is a core benefit of classes.

### 11. An ID value should identify one element in a document.

**Answer: True.** Keep ID values unique within the document. Use a class when a style needs to be shared.

### 12. Styling a paragraph to look like a heading changes it into an HTML heading.

**Answer: False.** CSS changes presentation. The element remains a paragraph, so use a real heading element when the content is a heading.

### 13. `h1, h2` and `h1 h2` mean the same thing.

**Answer: False.** The comma creates a selector list. A space describes a relationship between elements and is a combinator, covered in the next chapter.

### 14. One HTML element can match multiple CSS rules.

**Answer: True.** For example, a paragraph with a class can match both a `p` type selector and a class selector. Cascade rules resolve conflicting declarations.

## Short-answer questions

### 15. What elements match the selector `p`?

**Answer:** All paragraph elements in the document. The selector uses the HTML element name.

### 16. What elements match `.warning`?

**Answer:** Every element whose `class` attribute includes the class token `warning`. Other class tokens on the same element do not prevent a match.

### 17. What elements match `#site-header`?

**Answer:** The element whose ID is `site-header`. The ID should be unique in the document.

### 18. How do you put two classes on one HTML element?

**Answer:** Separate the class names with spaces, such as `<div class="card featured">`. The element then matches `.card` and `.featured` separately.

### 19. What does the comma mean in `h1, h2, p`?

**Answer:** It separates alternatives in a selector list. The rule applies to `h1` elements, `h2` elements, and paragraph elements.

### 20. When might a type selector be more appropriate than a class selector?

**Answer:** Use a type selector when the rule should apply consistently to all elements of that type, such as setting a baseline line height for all paragraphs. Use a class when only a chosen group should receive the style.

### 21. Why is a class generally better than an ID for a reusable visual style?

**Answer:** A class can be applied to many elements, while an ID is intended to identify one element. A shared class is easier to reuse and maintain.

## Read and fix the code

### 22. Which elements match this rule?

```html
<p class="notice">Saved.</p>
<div class="notice">Ready.</div>
<p>Draft.</p>
```

```css
.notice {
  color: green;
}
```

**Answer:** The first paragraph and the `div` match. Both have the `notice` class. The last paragraph does not.

### 23. Fix the selector so it matches elements with `class="card"`.

```css
card {
  padding: 1rem;
}
```

**Answer:**

```css
.card {
  padding: 1rem;
}
```

**Explanation:** Without the period, `card` is a type selector. The period makes it a class selector.

### 24. Fix this HTML and CSS so the class selector matches.

```html
<p class=".important">Read this first.</p>
```

```css
.important {
  font-weight: bold;
}
```

**Answer:**

```html
<p class="important">Read this first.</p>
```

**Explanation:** The period belongs in the CSS selector, not in the HTML class value.

### 25. Fix the CSS so the same color is applied to both heading types.

```css
h1 h2 {
  color: navy;
}
```

**Answer:**

```css
h1,
h2 {
  color: navy;
}
```

**Explanation:** The comma makes a selector list. A space describes a relationship between elements and does not mean â€œboth types.â€

### 26. Which declarations apply to this paragraph?

```html
<p class="notice">Maintenance starts soon.</p>
```

```css
p {
  line-height: 1.5;
}

.notice {
  padding: 1rem;
}
```

**Answer:** Both declarations apply. The element matches the type selector `p` and the class selector `.notice`.

### 27. A page contains three elements with `id="content"`. What should be changed?

**Answer:** Give each element a unique ID, or use a shared class if the elements need a reusable style. IDs should not be duplicated in a document.

## Practice questions

### 28. Write a selector that matches every button element.

**Answer:**

```css
button {
  /* declarations */
}
```

**Explanation:** `button` is a type selector, so it matches all button elements.

### 29. Write a rule that gives elements with the class `muted` a gray text color.

**Answer:**

```css
.muted {
  color: gray;
}
```

**Explanation:** The class selector starts with a period, while the HTML would use `class="muted"`.

### 30. Write one selector list for `h1`, `h2`, and `h3`.

**Answer:**

```css
h1, h2, h3 {
  /* shared declarations */
}
```

**Explanation:** Commas separate the three alternatives in the selector list.

### 31. Write HTML for a unique main area with the ID `main-content` and the classes `page` and `wide`.

**Answer:**

```html
<main id="main-content" class="page wide">
  ...
</main>
```

**Explanation:** The ID value has no `#`, and class tokens are separated by spaces. In CSS, their selectors would be `#main-content`, `.page`, and `.wide`.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [04 - Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md) | [Lesson](../lessons/05-selector-basics.md) | [Example](../examples/05-selector-basics.md) | [06 - Combinators and selector relationships](06-combinators-and-selector-relationships.md) |
