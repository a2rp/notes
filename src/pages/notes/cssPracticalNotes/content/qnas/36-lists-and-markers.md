# 36 - Lists and markers - Q&A

These questions review HTML list choices, marker styles, marker position, nested lists, and spacing. Each answer and explanation follows its question.

## Multiple-choice questions

### 1. Which HTML element is appropriate for steps that must happen in order?

- A. `<ul>`
- B. `<ol>`
- C. `<dl>`
- D. `<span>`

**Answer: B. `<ol>`.**

**Explanation:** An ordered list identifies a sequence. The browser can number the items, and the sequence remains clear if items are moved.

### 2. Which property selects a bullet or numbering style?

- A. `list-style-type`
- B. `list-style-position`
- C. `list-style-image`
- D. `marker-side`

**Answer: A. `list-style-type`.**

**Explanation:** It selects marker styles such as `disc`, `square`, `decimal`, and `upper-roman`.

### 3. What is the default value of `list-style-position`?

- A. `inside`
- B. `outside`
- C. `center`
- D. `start`

**Answer: B. `outside`.**

**Explanation:** With the usual outside marker, wrapped lines generally align with the list item's text rather than the marker.

### 4. What does `::marker` select?

- A. The whole list container
- B. The text inside every paragraph
- C. The marker box generated for a list item
- D. Only the first item in an ordered list

**Answer: C. The marker box generated for a list item.**

**Explanation:** It lets you style the bullet or number separately from the list item's content.

### 5. Which list is intended for terms with descriptions?

- A. `<ul>`
- B. `<ol>`
- C. `<dl>`
- D. `<menuitem>`

**Answer: C. `<dl>`.**

**Explanation:** Description lists use `<dt>` for terms and `<dd>` for their descriptions.

### 6. Which property can set both a marker type and its position in one declaration?

- A. `list-style`
- B. `list-position`
- C. `marker-style`
- D. `list-marker`

**Answer: A. `list-style`.**

**Explanation:** `list-style` is a shorthand for marker type, image, and position.

### 7. Which selector styles only the direct list items of a list with class `steps`?

- A. `.steps li`
- B. `.steps > li`
- C. `li.steps`
- D. `ul + li`

**Answer: B. `.steps > li`.**

**Explanation:** The child combinator selects immediate children. The descendant selector `.steps li` also matches list items in nested lists.

### 8. Which type of property is appropriate for styling marker color?

- A. `color` on `li::marker`
- B. `background-image` on `li::marker`
- C. `padding` on `li::marker`
- D. `border` on `li::marker`

**Answer: A. `color` on `li::marker`.**

**Explanation:** Marker styling is limited, but text color and font properties apply. Use a real child element if the design needs a background, border, or padding.

## True or false

### 9. CSS can change a list's appearance without changing whether the HTML describes an unordered group or an ordered sequence.

**Answer: True.**

**Explanation:** Marker styles affect appearance. Use the HTML element that matches the relationship between the items.

### 10. `list-style-position: inside` places the marker outside the item content.

**Answer: False.**

**Explanation:** `inside` makes the marker participate in the content's first line. `outside` places it outside the principal content box.

### 11. A `::marker` pseudo-element supports every CSS box property, including padding and background.

**Answer: False.**

**Explanation:** Its supported layout styling is limited. Font and text properties such as color can apply, while padding and background do not behave as they would on a normal box.

### 12. A description list is a good generic replacement for any two-column layout.

**Answer: False.**

**Explanation:** `<dl>` represents terms and their descriptions or related name-value groups. Use layout elements that match the actual content.

### 13. A marker image should have a text marker fallback.

**Answer: True.**

**Explanation:** If the image is missing or unavailable, a useful `list-style-type` still provides a marker.

## Short-answer questions

### 14. When should you use `<ul>` instead of `<ol>`?

**Answer:** Use `<ul>` when the items form a group and their order does not matter. Use `<ol>` when the sequence or ranking matters.

**Explanation:** The HTML list type communicates the relationship even if CSS later changes the marker appearance.

### 15. Explain the difference between `list-style-position: inside` and `outside`.

**Answer:** `inside` places the marker at the beginning of the item's content line. `outside` places it outside the principal content box.

**Explanation:** For a long item, outside markers generally leave wrapped lines aligned with the item text. Always check the actual wrapping.

### 16. What does `list-style` combine?

**Answer:** It combines `list-style-type`, `list-style-image`, and `list-style-position`.

**Explanation:** It is convenient for a short rule, but use longhand properties when clarity or separate overrides are important.

### 17. Why use `padding-inline-start` for list indentation?

**Answer:** It adds space at the logical start edge of the list and adapts to writing direction.

**Explanation:** Logical spacing is preferable when the design should follow text flow rather than a fixed left or right side.

### 18. Why should required meaning remain in the list item's HTML text instead of only in a custom marker?

**Answer:** A custom marker can be visual decoration, and generated marker content may not communicate the information reliably in every context.

**Explanation:** Keep the task state or item meaning in actual text. The marker can reinforce it but should not be the only source of meaning.

## Debugging questions

### 19. Why does the nested list use the same marker style as the outer list?

~~~css
.feature-list li {
  list-style-type: square;
}
~~~

**Answer:** The descendant selector matches list items at every depth, including nested lists.

**Fix:**

~~~css
.feature-list > li {
  list-style-type: square;
}
~~~

**Explanation:** The direct-child selector limits the rule to items that belong immediately to the outer list.

### 20. Why does this marker not show its background color?

~~~css
li::marker {
  color: white;
  background-color: green;
}
~~~

**Answer:** A marker box does not support background styling like a normal element.

**Fix:** Use a text color and font styling on `::marker`. For a complex badge, add a child element inside each list item and style that element.

**Explanation:** The marker pseudo-element has a limited set of applicable properties.

### 21. Why do several list items keep their numbers after the list marker is removed?

~~~css
.steps {
  list-style-type: none;
}
~~~

**Answer:** This rule hides the markers, but it does not remove text that was manually typed into the list items.

**Fix:** Remove manually typed numbering and use an `<ol>` with a marker style if the sequence matters.

**Explanation:** Let HTML provide ordered numbering so it stays correct when items move.

### 22. Why does the marker image disappear with no useful fallback?

~~~css
.resources {
  list-style-image: url("../images/bullet.svg");
}
~~~

**Answer:** The image path may be wrong, or the image may not be available. No explicit text marker style was provided.

**Fix:**

~~~css
.resources {
  list-style-image: url("../images/bullet.svg");
  list-style-type: disc;
}
~~~

**Explanation:** A text marker gives the list a useful fallback if the image cannot be used.

## Coding questions

### 23. Style an unordered feature list with square markers, a colored marker, and space between items.

**Answer:**

~~~css
.feature-list {
  list-style-type: square;
  padding-inline-start: 1.5rem;
}

.feature-list > li + li {
  margin-block-start: 0.5rem;
}

.feature-list > li::marker {
  color: #176b55;
}
~~~

**Explanation:** The list container selects the marker type, the logical padding creates a gutter, and the adjacent-sibling selector spaces later items. The direct-child selector avoids applying the rule to nested items.

### 24. Style an ordered list with lower-alpha markers positioned inside.

**Answer:**

~~~css
.lettered-steps {
  list-style: lower-alpha inside;
}
~~~

**Explanation:** This shorthand sets the marker type and position. Check long items because wrapped lines can align differently with inside markers.

### 25. Create a description list that becomes one column on a narrow screen.

**Answer:**

~~~css
.glossary {
  display: grid;
  grid-template-columns: minmax(8rem, 1fr) 2fr;
  gap: 0.5rem 1rem;
}

@media (max-width: 36rem) {
  .glossary {
    grid-template-columns: 1fr;
  }
}
~~~

**Explanation:** The term-description relationship stays in the HTML. CSS changes only how the pairs are laid out.

### 26. Change an ordered list marker to uppercase Roman numerals and make the marker bold.

**Answer:**

~~~css
.agenda {
  list-style-type: upper-roman;
}

.agenda > li::marker {
  font-weight: 700;
}
~~~

**Explanation:** The ordered list provides its sequence, the marker style controls its form, and `::marker` styles the marker text.

## Key takeaways

- Choose list elements based on the relationship between the items.
- Use CSS to style markers without replacing list semantics.
- `list-style-position` changes how the marker relates to wrapped item text.
- `::marker` is useful for text-based marker styling, but it is not a regular box.
- Scope selectors carefully so nested lists retain their own styles.
- Use logical spacing and provide a text marker fallback for marker images.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [35 - Text layout, spacing, and wrapping](../lessons/35-text-layout-and-wrapping.md) | [Q&A](36-lists-and-markers.md) | [Example](../examples/36-lists-and-markers.md) | [37 - Styling tables](../lessons/37-styling-tables.md) |
