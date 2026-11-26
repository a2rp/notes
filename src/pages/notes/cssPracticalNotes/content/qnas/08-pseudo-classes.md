# 08 - Pseudo-classes: Questions and Answers

Use these questions to review pseudo-classes that match interaction states, form states, structural positions, and selector relationships. Each answer follows its question, with explanations where useful.

## Multiple-choice questions

### 1. What does a pseudo-class describe?

A. An element's state, position, or relationship / B. A new HTML element / C. A CSS property value / D. An external stylesheet

**Answer: A.** Pseudo-classes match existing elements according to their state, position, or relationship to other elements.

### 2. Which notation is used for a pseudo-class?

A. `::` / B. `:` / C. `#` / D. `.`

**Answer: B.** Pseudo-classes use one colon, as in `:hover`. Pseudo-elements generally use two colons and are covered in the next chapter.

### 3. Which pseudo-class matches an element while it has keyboard focus and the browser determines a visible indicator is appropriate?

A. `:active` / B. `:focus-visible` / C. `:checked` / D. `:target`

**Answer: B.** `:focus-visible` matches focused elements when the browser determines that a visible focus indication is appropriate, commonly for keyboard navigation.

### 4. Which selector matches the second paragraph among paragraph siblings, rather than the second element child of any type?

A. `p:nth-child(2)` / B. `p:nth-of-type(2)` / C. `p:last-child` / D. `p:only-child`

**Answer: B.** `:nth-of-type()` counts siblings of the same element type. `:nth-child()` counts all element siblings.

### 5. What does `:where(h1, h2)` match?

A. Only `h1` elements / B. Only `h2` elements / C. Either `h1` or `h2` elements / D. Elements that contain both headings

**Answer: C.** `:where()` accepts a selector list and matches any element matching one of its selectors.

### 6. What is special about the specificity of `:where()`?

A. It is always zero / B. It is always higher than an ID / C. It depends on the declaration count / D. It is the same as `:has()`

**Answer: A.** `:where()` contributes zero specificity, which is useful for baseline rules that should be easy to override.

### 7. What does `button:not(:disabled)` match?

A. Disabled buttons / B. Buttons that are not disabled / C. All non-button elements / D. Buttons that are hovered

**Answer: B.** `:not()` excludes elements matching its argument.

### 8. What does `.card:has(> img)` match?

A. Images that are inside cards / B. Cards with a direct child image / C. Cards followed by an image sibling / D. Every card

**Answer: B.** `:has()` checks for a related match. The `>` inside its argument requires the image to be a direct child of the card.

### 9. Which pseudo-class matches a checked checkbox?

A. `:valid` / B. `:checked` / C. `:required` / D. `:focus-within`

**Answer: B.** `:checked` matches checked checkbox and radio controls, as well as selected options.

### 10. Which pseudo-class matches an element whose ID matches the current URL fragment?

A. `:root` / B. `:target` / C. `:visited` / D. `:empty`

**Answer: B.** `:target` matches the element identified by the current fragment, such as `#details`.

## True or false

### 11. `:hover` should be the only way to reveal important content.

**Answer: False.** Touch and keyboard users may not experience hover the same way as mouse users. Important information should be available without hover.

### 12. Removing a focus outline without providing another visible indicator can make keyboard navigation harder.

**Answer: True.** Keyboard users need to see which element currently has focus.

### 13. `:first-child` and `:first-of-type` always select the same element.

**Answer: False.** `:first-child` checks the first element child overall. `:first-of-type` checks the first sibling of that element type.

### 14. `:nth-child(2)` counts only paragraph siblings when used in `p:nth-child(2)`.

**Answer: False.** `:nth-child(2)` counts all element siblings. The `p` type selector also requires the second child to be a paragraph. Use `p:nth-of-type(2)` to count paragraph siblings.

### 15. `:visited` can be used to freely reveal a person's browsing history through script.

**Answer: False.** Browsers restrict visited-link styling and access to visited state to protect privacy.

### 16. `:focus-within` can match a form group when one of its input descendants has focus.

**Answer: True.** The element itself or any descendant may have focus for `:focus-within` to match.

### 17. `:disabled` makes a form control disabled.

**Answer: False.** It selects a control that is already disabled. Use HTML or application behavior to set the disabled state.

### 18. Newlines and indentation in HTML count as element siblings for `:nth-child()`.

**Answer: False.** The position is counted among element children. Text whitespace between tags does not count as an element child.

## Short-answer questions

### 19. What is the difference between a pseudo-class and a pseudo-element?

**Answer:** A pseudo-class selects an existing element by state, position, or relationship and uses one colon. A pseudo-element targets a part of an element or generated content and generally uses two colons.

### 20. Explain the difference between `:focus` and `:focus-visible`.

**Answer:** `:focus` matches an element that currently has focus. `:focus-visible` matches focused elements when the browser determines that a visible focus indicator is appropriate. A clear keyboard focus indicator should be preserved.

### 21. What is the difference between `:first-child` and `:first-of-type`?

**Answer:** `:first-child` selects an element only if it is the first element child of its parent. `:first-of-type` selects the first sibling with the same element type, even if another type comes before it.

### 22. What does `:nth-child(3n + 1)` select?

**Answer:** Elements at positions 1, 4, 7, 10, and so on among their element siblings. The count starts at 1.

### 23. When does a control match `:required`?

**Answer:** When it has the HTML `required` constraint. The selector reflects the attribute and does not add the requirement itself.

### 24. What does `:valid` mean for a form control?

**Answer:** Its current value satisfies the validation constraints that apply to it. An optional empty field can be valid because it has no required-value constraint.

### 25. What is the difference between `:is()` and `:where()`?

**Answer:** Both can group alternatives and match any element matching an argument. `:where()` always contributes zero specificity. `:is()` uses the specificity of its most specific argument.

### 26. How does `:not()` work?

**Answer:** It matches elements that do not match the selector in its argument. For example, `button:not(:disabled)` matches enabled buttons.

### 27. What does `:has()` allow a selector to do?

**Answer:** It allows a selector to match an element based on a related element that matches its argument, such as a card that has an image child.

### 28. What does `:lang(en)` match?

**Answer:** Elements whose language is English, including subtags such as `en-US`. The document should still provide the correct `lang` information in HTML.

## Read the HTML and CSS

Use this markup for Questions 29 to 33:

```html
<ul class="tasks">
  <li class="task complete">Read the lesson</li>
  <li class="task">Try the examples</li>
  <li class="task complete">Review the notes</li>
</ul>
```

### 29. Which list item matches `.task:nth-child(even)`?

**Answer:** â€œTry the examples.â€ It is the second element child, and its class includes `task`.

### 30. Which list items match `.task:nth-child(odd)`?

**Answer:** â€œRead the lessonâ€ and â€œReview the notes.â€ They are the first and third element children.

### 31. Which elements match `.task:not(.complete)`?

**Answer:** â€œTry the examples.â€ It has the `task` class and does not have the `complete` class.

### 32. Write a selector for the second `li` among list item siblings.

**Answer:**

```css
li:nth-of-type(2) {
  /* declarations */
}
```

**Explanation:** `:nth-of-type(2)` counts only siblings with the same element type, in this case `li` elements.

### 33. In this valid container, which selector matches the first paragraph?

```html
<div>
  <h2>Tasks</h2>
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</div>
```

**Answer:** `p:first-of-type` matches “First paragraph.” `p:first-child` matches neither paragraph because the `h2` is the first element child.

## Fix the selector

### 34. The goal is to style the third row from the end. Fix the selector.

```css
tr:nth-child(3) {
  background-color: lightyellow;
}
```

**Answer:**

```css
tr:nth-last-child(3) {
  background-color: lightyellow;
}
```

**Explanation:** `:nth-child()` counts from the beginning. `:nth-last-child()` counts from the end.

### 35. The goal is to give focusable buttons a clear keyboard focus indicator without showing it for every pointer focus. Fix the selector.

```css
button:active {
  outline: 3px solid royalblue;
}
```

**Answer:**

```css
button:focus-visible {
  outline: 3px solid royalblue;
  outline-offset: 3px;
}
```

**Explanation:** `:active` represents activation, such as a click in progress. `:focus-visible` represents focus when the browser determines a visible focus indicator is appropriate.

### 36. The goal is to style a disabled button differently. Does this selector implement the disabled state?

```css
button:disabled {
  opacity: 0.5;
}
```

**Answer:** No. It only styles buttons that are already disabled. Set the disabled state in HTML or application behavior, then use this rule for presentation.

## Practice questions

### 37. Write a selector that matches every even element child in a table body.

**Answer:**

```css
tbody tr:nth-child(even) {
  background-color: #f1f5f9;
}
```

### 38. Write a selector that matches every checked checkbox.

**Answer:**

```css
input[type="checkbox"]:checked {
  accent-color: seagreen;
}
```

### 39. Write a selector that matches a `.panel` only when it contains a direct child with class `notice`.

**Answer:**

```css
.panel:has(> .notice) {
  border-color: darkorange;
}
```

### 40. Write one selector that matches `h1`, `h2`, or `h3` elements while adding zero specificity from the grouping pseudo-class.

**Answer:**

```css
:where(h1, h2, h3) {
  font-family: Georgia, serif;
}
```

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [07 - Attribute selectors](../qnas/07-attribute-selectors.md) | [Lesson](../lessons/08-pseudo-classes.md) | [Example](../examples/08-pseudo-classes.md) | [09 - Pseudo-elements](09-pseudo-elements.md) |
