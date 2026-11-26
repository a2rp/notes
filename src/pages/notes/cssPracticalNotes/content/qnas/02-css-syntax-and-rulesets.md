# 02 - CSS Syntax and Rulesets: Questions and Answers

Practice questions for [Lesson 02 - CSS syntax and rulesets](../lessons/02-css-syntax-and-rulesets.md). Each question is followed by its answer and an explanation or corrected example where useful.

## Multiple-choice questions

### 1. What two main parts make up a CSS ruleset?

- A. An HTML element and an attribute
- B. A selector and a declaration block
- C. A property and a browser
- D. A value and a comment

**Answer: B. A selector and a declaration block.** The selector identifies what the rule can match. The declaration block contains the styles to apply.

### 2. In this ruleset, which part is the selector?

```css
h1 {
  color: navy;
}
```

- A. `h1`
- B. `color`
- C. `navy`
- D. `{` and `}`

**Answer: A. `h1`.** The selector appears before the opening brace and identifies the elements the rule can match.

### 3. Which punctuation separates a property from its value?

- A. A comma
- B. An equals sign
- C. A colon
- D. A period

**Answer: C. A colon.** A declaration has the form `property: value;`.

### 4. What is the purpose of a semicolon in a declaration block?

- A. It separates one declaration from the next.
- B. It starts the selector.
- C. It closes the entire stylesheet.
- D. It makes a value important.

**Answer: A. It separates one declaration from the next.** The final semicolon before a closing brace is optional, but using it consistently is a good habit.

### 5. What does this selector list target?

```css
h1,
h2 {
  color: navy;
}
```

- A. Only `h1` elements that contain `h2`
- B. Both `h1` and `h2` elements
- C. Only `h2` elements inside `h1`
- D. Elements with the class `h1` or `h2`

**Answer: B. Both `h1` and `h2` elements.** A comma separates selectors that are alternatives in the list.

### 6. Which is a valid CSS comment?

- A. `// page title`
- B. `<!-- page title -->`
- C. `/* page title */`
- D. `# page title`

**Answer: C. `/* page title */`.** CSS comments start with `/*` and end with `*/`.

### 7. Which line is a valid CSS declaration?

- A. `color = teal;`
- B. `color: teal;`
- C. `color teal;`
- D. `color, teal;`

**Answer: B. `color: teal;`.** The property and value are separated by a colon, and the semicolon ends the declaration.

### 8. What usually happens to a declaration with an unknown property name?

- A. The browser invents a matching property.
- B. The browser generally ignores that declaration.
- C. The browser deletes the HTML element.
- D. The browser stops reading all files.

**Answer: B. The browser generally ignores that declaration.** Other valid declarations can still be applied, but you should fix the spelling rather than rely on error recovery.

### 9. Is indentation required for the browser to understand this rule?

```css
p {
  color: teal;
}
```

- A. Yes, the declaration must have two spaces before it.
- B. Yes, the selector must start at the beginning of a line.
- C. No, indentation is mainly for readability.
- D. No, CSS cannot contain line breaks.

**Answer: C. No, indentation is mainly for readability.** CSS allows formatting whitespace in many places. Consistent indentation makes the file easier for people to read.

### 10. What does an at-rule generally begin with?

- A. A period
- B. An at sign (`@`)
- C. A closing brace
- D. A semicolon only

**Answer: B. An at sign (`@`).** For example, `@media` introduces a conditional group with its own syntax.

## Objective questions

### True or false

### 11. The declaration block of a style rule is surrounded by braces.

**Answer: True.** The opening brace starts the block, and the closing brace ends it.

### 12. CSS uses an equals sign between a property and a value.

**Answer: False.** CSS uses a colon, as in `color: teal;`.

### 13. The final semicolon before a rule's closing brace is optional.

**Answer: True.** It is optional in CSS, but keeping it is recommended because it makes future edits easier.

### 14. CSS comments use `//`.

**Answer: False.** CSS comments use `/*` and `*/`. The `//` form is not CSS comment syntax.

### 15. A selector list uses commas to separate selector alternatives.

**Answer: True.** For example, `h1, h2` targets both heading types independently.

### 16. If one CSS declaration is invalid, all the other rules in the stylesheet must stop working.

**Answer: False.** Browsers generally ignore an invalid declaration and continue parsing. A syntax mistake can still affect nearby declarations, so correct it instead of relying on recovery.

## Short-answer questions

### 17. Explain the difference between a declaration and a ruleset.

**Answer:** A declaration is one property-value pair, such as `color: teal;`. A ruleset contains a selector and a declaration block with zero or more declarations.

**Explanation:** In `p { color: teal; }`, the whole expression is a ruleset, and `color: teal;` is its declaration.

### 18. Identify the property and value in this declaration.

```css
font-size: 1.25rem;
```

**Answer:** The property is `font-size`, and the value is `1.25rem`.

**Explanation:** The colon separates the property from the value. The semicolon ends the declaration.

### 19. Why is it useful to put each declaration on its own line?

**Answer:** It makes the rules easier to scan, compare, edit, and debug.

**Explanation:** Newlines and indentation are primarily formatting choices. The browser can understand many other whitespace layouts, but a readable format helps people avoid mistakes.

### 20. What does the comma do in this rule?

```css
h1, h2, h3 {
  color: navy;
}
```

**Answer:** It separates three selector alternatives. The rule can match `h1`, `h2`, and `h3` elements.

### 21. Why should you keep a final semicolon even though CSS permits leaving it out?

**Answer:** Keeping it makes adding another declaration safer and keeps formatting consistent.

**Explanation:** Without the final semicolon, the next edit must remember to add a separator after the previous declaration.

### 22. What should you check if a valid-looking rule does not produce the intended style?

**Answer:** Check the selector, braces, property spelling, colon, declaration separators, and whether each value is valid for its property.

**Explanation:** A rule can be correctly formatted but target the wrong elements. It can also target the right elements while containing an invalid declaration.

## Read and correct CSS

### 23. What is wrong with this rule, and how would you fix it?

```css
p {
  color = teal;
}
```

**Answer:** The equals sign should be a colon.

**Corrected rule:**

```css
p {
  color: teal;
}
```

### 24. Find the missing separator.

```css
h1 {
  color: teal
  font-size: 2rem;
}
```

**Answer:** Add a semicolon after `teal`.

**Corrected rule:**

```css
h1 {
  color: teal;
  font-size: 2rem;
}
```

**Explanation:** The semicolon separates the `color` declaration from the `font-size` declaration.

### 25. Correct the misspelled properties.

```css
.notice {
  backgroud-color: lightyellow;
  paddding: 1rem;
}
```

**Answer:** The property names should be `background-color` and `padding`.

**Corrected rule:**

```css
.notice {
  background-color: lightyellow;
  padding: 1rem;
}
```

### 26. Rewrite this line as a CSS comment.

```css
// Add space around the notice
```

**Answer:**

```css
/* Add space around the notice */
```

**Explanation:** CSS comments need both an opening `/*` and a closing `*/` marker.

### 27. Are these selectors alternatives or a descendant relationship?

```css
h1 h2 {
  color: navy;
}
```

**Answer:** This is one selector describing an `h2` inside an `h1`, not two alternatives.

**Explanation:** Use a comma for alternatives: `h1, h2`. A space between selectors can describe a descendant relationship, which is covered in the selector lessons.

### 28. Find the syntax issue in this selector list.

```css
h1 h2 {
  color: navy;
}
```

The intent is to style all `h1` and `h2` elements the same way.

**Answer:** A comma is missing between `h1` and `h2`.

**Corrected rule:**

```css
h1,
h2 {
  color: navy;
}
```

### 29. Which part of this snippet is an at-rule, and which part is a ruleset?

```css
@media (max-width: 40rem) {
  .card {
    padding: 1rem;
  }
}
```

**Answer:** `@media (max-width: 40rem)` is the at-rule. `.card { padding: 1rem; }` is a ruleset inside its conditional group.

**Explanation:** At-rules begin with `@` and can group rules under conditions. A media query is studied later in the guide.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [01 - Introduction to CSS](01-introduction-to-css.md) | [Lesson](../lessons/02-css-syntax-and-rulesets.md) | [Example](../examples/02-css-syntax-and-rulesets.md) | [03 - Connecting CSS to HTML](03-connecting-css-to-html.md) |
