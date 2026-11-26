# 29 - Multi-column Layout: Questions and Answers

Use these questions to review how CSS flows content into columns, how width and count affect the layout, and how gaps, breaks, spanning, and balancing work. Each answer follows its question.

## Multiple-choice questions

### 1. What happens when an element becomes a multi-column container?

- A. Its direct children become Grid items
- B. Its continuous content flow is fragmented into columns
- C. Its children are placed in Flexbox rows
D. Its DOM order is changed

**Answer: B. Its continuous content flow is fragmented into columns.**

**Explanation:** Multi-column layout flows content into column boxes. The child elements remain in normal document flow rather than becoming independent grid or flex items.

### 2. What does `column-width` describe?

- A. An exact width that every column must have
- B. An ideal column width that the browser uses to determine the column count
- C. The full width of the multi-column container
D. The gap between columns

**Answer: B. An ideal column width that helps determine the column count.**

**Explanation:** The browser can adjust the actual width to use available space or fit a narrower container.

### 3. What does `column-count: 3` request?

- A. Three rows of columns
- B. A preferred count of three columns
- C. A minimum width of three units
D. Three column rules

**Answer: B. A preferred count of three columns.**

**Explanation:** The browser divides the available inline space between the requested columns. On narrow screens, the columns can become too narrow, so a responsive fallback may be needed.

### 4. What does `columns: 3 18em` set?

- A. A gap of 3em and three columns
- B. A count of 3 and an ideal width of 18em
- C. An exact width of 3em and a count of 18
D. Three columns, each exactly 18em wide

**Answer: B. A count of 3 and an ideal width of 18em.**

**Explanation:** `columns` is a shorthand for `column-count` and `column-width`. When both are set, the count is the maximum number of columns and the width remains an ideal target.

### 5. Which property creates a line between columns?

- A. `border-inline`
- B. `column-rule`
- C. `row-rule`
D. `column-border`

**Answer: B. `column-rule`.**

**Explanation:** The rule is drawn in the middle of the column gap. It does not reserve additional layout space.

### 6. Which value requests that a short figure stay together within one column?

- A. `break-after: avoid-page`
- B. `break-inside: avoid-column`
- C. `column-span: none`
D. `column-fill: balance`

**Answer: B. `break-inside: avoid-column`.**

**Explanation:** This is a request, not an absolute guarantee. A figure taller than the available column may still need to break.

### 7. Which declaration makes an in-flow heading span all columns?

- A. `column-span: all`
- B. `column-count: all`
- C. `break-before: all`
D. `columns: span`

**Answer: A. `column-span: all`.**

**Explanation:** A spanning heading interrupts the multi-column flow. Content before it appears above, and later content continues below it.

### 8. Which setting tries to make column lengths approximately equal?

- A. `column-fill: auto`
- B. `column-fill: balance`
- C. `column-width: equal`
D. `column-gap: balance`

**Answer: B. `column-fill: balance`.**

**Explanation:** Balancing distributes content to make the columns approximately similar in length.

### 9. What does `column-gap` control?

- A. Space between paragraphs
- B. Space between columns
- C. Space before the first column only
D. Space between the multi-column container and its parent

**Answer: B. Space between columns.**

**Explanation:** It sets the gutter separating neighboring columns. Use padding for space at the container's outer edges.

### 10. Which layout is usually a better choice when each card needs to occupy a specific row and column?

- A. Multi-column layout
- B. Grid layout
- C. `column-fill`
D. `column-span`

**Answer: B. Grid layout.**

**Explanation:** Grid places child boxes into explicit or automatically created tracks. Multi-column layout fragments one continuous flow of content.

## True or false

### 11. Multi-column layout changes the DOM order of the content.

**Answer: False.**

**Explanation:** CSS columns change the visual flow, but the source and DOM order remain intact.

### 12. A specified `column-width` is guaranteed to be the exact width of every column.

**Answer: False.**

**Explanation:** It is an ideal width. The browser can adjust it to make the columns fit the available space.

### 13. When both `column-width` and `column-count` are set, the count acts as a maximum.

**Answer: True.**

**Explanation:** The ideal width helps determine how many columns fit, up to the specified count.

### 14. A column rule reserves extra width and pushes the columns apart.

**Answer: False.**

**Explanation:** The rule is drawn in the middle of the gap and does not affect layout. Increase `column-gap` when the text needs more separation.

### 15. `break-inside: avoid-column` always keeps an element intact.

**Answer: False.**

**Explanation:** It asks the browser to avoid a break. If the element cannot fit in one column, a break may still be necessary.

### 16. `column-span: all` can make a heading interrupt the column flow.

**Answer: True.**

**Explanation:** Content before and after the spanning element is laid out in separate multi-column portions.

### 17. `column-count` is a good choice when the count must never change at any viewport width.

**Answer: False.**

**Explanation:** A fixed count can produce very narrow columns on a small screen. Add a responsive fallback or use a width target so the browser can choose how many fit.

### 18. Multi-column layout is a natural choice for a form whose labels and inputs must line up in rows.

**Answer: False.**

**Explanation:** Forms and row-based relationships need explicit layout control. Grid is usually a clearer choice.

## Short-answer questions

### 19. How is multi-column layout different from Grid?

**Answer:** Multi-column layout divides one continuous content flow into columns. Grid places child elements into rows and columns as individual grid items.

**Explanation:** Use multi-column layout for prose or flowing entries. Use Grid when item placement or aligned rows and columns matter.

### 20. How does `column-width` help make a layout responsive?

**Answer:** It gives the browser an ideal line width. The browser chooses how many columns fit in the available inline size.

**Explanation:** Wider containers can show more columns; narrower containers can show fewer. The actual column width may vary from the ideal.

### 21. What is the difference between `column-count` and `column-width`?

**Answer:** `column-count` requests a preferred number of columns. `column-width` provides an ideal width and lets the browser determine a suitable count.

**Explanation:** Use a count when the number of columns is the main design requirement. Use a width target when keeping a readable measure is more important.

### 22. What does `columns` combine?

**Answer:** It combines `column-count` and `column-width`.

**Explanation:** A single number sets the count, a length sets the width, and two values can set both. Omitted longhand values return to their initial values.

### 23. What is the difference between a column gap and a column rule?

**Answer:** The gap is the actual space between columns. The rule is a decorative line drawn in the middle of that space.

**Explanation:** The rule does not reserve space. Increase the gap if the text is too close to the line.

### 24. When is `column-fill: balance` useful?

**Answer:** It is useful when columns should end at approximately similar heights.

**Explanation:** It is common for article text or short content panels. The browser needs a relevant column height to balance against.

### 25. When is `column-fill: auto` useful?

**Answer:** It fills one column before moving content into the next, which can be useful in a fixed-height layout.

**Explanation:** In a container with a definite block size, columns fill sequentially. Later columns can remain empty if the content fits earlier.

### 26. What do `break-before`, `break-after`, and `break-inside` control?

**Answer:** They express preferences for where content breaks before, after, or inside an element.

**Explanation:** Column break values are part of the broader fragmentation rules and can also apply to page fragmentation.

### 27. Why can a heading be left alone at the bottom of a column?

**Answer:** The heading and following content are allowed to break apart.

**Explanation:** A rule such as `break-after: avoid-column` on the heading can ask the browser to keep it with the next content.

### 28. Why should a multi-column article still use semantic headings and a meaningful source order?

**Answer:** The visual columns do not replace the document structure or alter the DOM order.

**Explanation:** Assistive technology, keyboard navigation, and CSS-free views rely on meaningful source content.

### 29. What should happen to a wide image inside a column?

**Answer:** Constrain it to the column's inline size and preserve its aspect ratio.

**Explanation:** For example, use `max-inline-size: 100%` and `block-size: auto` to prevent it from overflowing.

## Read the code

### 30. What does this declaration tell the browser?

~~~css
.glossary {
  column-width: 20em;
}
~~~

**Answer:** Aim for columns about 20em wide and determine how many fit.

**Explanation:** The actual width can be adjusted, and the column count can change as the container changes size.

### 31. In this rule, what happens when the container becomes very narrow?

~~~css
.article {
  columns: 2;
}
~~~

**Answer:** The layout still requests two columns, so each can become narrow.

**Explanation:** Add a breakpoint that sets `columns: auto` or `column-count: 1` when a single column is more readable.

### 32. Does the rule below change the space available to the text?

~~~css
.article {
  column-gap: 2rem;
  column-rule: 1px solid #999;
}
~~~

**Answer:** The gap changes the available separation. The rule does not take up additional space.

**Explanation:** The line is painted in the middle of the 2rem gap.

### 33. What happens to the heading and text with this rule?

~~~css
.article h2 {
  column-span: all;
}
~~~

**Answer:** The heading spans the full multi-column container and interrupts the column flow.

**Explanation:** Content before the heading appears above it; content after it continues below in columns.

### 34. What does this break rule request?

~~~css
.card {
  break-inside: avoid-column;
}
~~~

**Answer:** It asks the browser to avoid splitting the card across columns.

**Explanation:** If the card is taller than the available column space, the browser may still need to fragment it.

### 35. When does the following media query turn off multi-column layout?

~~~css
.article {
  columns: 3 18em;
}

@media (max-width: 40rem) {
  .article {
    columns: auto;
  }
}
~~~

**Answer:** At viewport widths of 40rem or less, the shorthand resets the count and width to their initial auto values.

**Explanation:** With both values auto, the element no longer establishes multiple columns from these properties.

### 36. What is the difference between these declarations?

~~~css
.article {
  column-fill: balance;
}
~~~

~~~css
.article {
  column-fill: auto;
}
~~~

**Answer:** The first tries to make columns approximately equal in length. The second fills columns sequentially.

**Explanation:** The visible effect depends on the container's block size and content.

## Practical and scenario questions

### 37. A glossary should gain columns as its container grows, while keeping lines at a comfortable width. What would you start with?

**Answer:**

~~~css
.glossary {
  column-width: 20em;
  column-gap: 2rem;
}
~~~

**Explanation:** The browser uses the width target to decide how many columns fit. Check the result at narrow sizes and switch to one column if the text measure becomes cramped.

### 38. A two-column article needs a thin divider line and more breathing room between its text. What CSS can you use?

**Answer:**

~~~css
.article {
  column-count: 2;
  column-gap: 2rem;
  column-rule: 1px solid #c5ced8;
}
~~~

**Explanation:** Increase the gap to give the text room. The rule appears in the center of that gap.

### 39. A long figure is breaking between columns. How can you ask the browser to keep it together?

**Answer:**

~~~css
.article figure {
  break-inside: avoid-column;
}
~~~

**Explanation:** This is a preference. If the figure cannot fit in one column, a break may still occur.

### 40. A main heading should span all columns, but ordinary subsection headings should stay within the flow. How could you style that?

**Answer:**

~~~css
.article__title {
  column-span: all;
}

.article__section-title {
  break-after: avoid-column;
}
~~~

**Explanation:** The main title interrupts and spans the column flow. Subsection titles remain within their columns, with a request to keep the following content nearby.

## Layout challenge

### 41. Create a responsive article layout with a two-column maximum, a readable ideal width, a divider, and one full-width section heading. What CSS would you use?

**Answer:**

~~~css
.article {
  columns: 2 20em;
  column-gap: 2rem;
  column-rule: 1px solid #c5ced8;
}

.article h2 {
  column-span: all;
}

.article figure {
  break-inside: avoid-column;
}

.article img {
  max-inline-size: 100%;
  block-size: auto;
}

@media (max-width: 38rem) {
  .article {
    columns: auto;
  }
}
~~~

**Explanation:** The count caps the layout at two columns, while the ideal width gives the browser room to choose the actual count. The heading spans the full measure, the figure requests to stay together, images fit the column, and the narrow breakpoint returns to one flow.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [28 - Alignment and Gaps](28-alignment-and-gaps.md) | [Q&A](29-multi-column-layout.md) | [Example](../examples/29-multi-column-layout.md) | [30 - Responsive Design and Media Queries](../lessons/30-responsive-design-and-media-queries.md) |
