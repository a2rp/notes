# 32 - Logical Properties and Writing Modes: Questions and Answers

Use these questions to review logical directions, writing-mode axes, logical box properties, right-to-left text, and vertical writing. Each answer follows its question.

## Multiple-choice questions

### 1. What does a logical CSS property describe?

- A. A fixed edge of the screen
- B. A dimension or edge relative to text and block flow
- C. A browser window size
- D. The order of HTML elements

**Answer: B. A dimension or edge relative to text and block flow.**

**Explanation:** Logical properties use terms such as inline start, block end, inline size, and block size. Their physical mapping depends on writing mode and direction.

### 2. In the default `horizontal-tb` left-to-right mode, which physical edge is inline start?

- A. Top
- B. Right
- C. Bottom
- D. Left

**Answer: D. Left.**

**Explanation:** In default horizontal left-to-right writing, inline content starts at the left and proceeds to the right.

### 3. In horizontal right-to-left text, where does `border-inline-start` appear?

- A. On the left
- B. On the right
- C. At the top
- D. At the bottom

**Answer: B. On the right.**

**Explanation:** Inline start follows the text direction. In horizontal right-to-left writing it maps to the physical right edge.

### 4. In `vertical-rl` writing mode, where is block start?

- A. At the top
- B. At the bottom
- C. On the right
- D. On the left

**Answer: C. On the right.**

**Explanation:** The `rl` value means block flow proceeds from right to left. The direction setting controls inline start and end.

### 5. Which statement describes `writing-mode`?

- A. It sets only text color.
- B. It sets block flow direction and whether lines are horizontal or vertical.
- C. It sets the page language.
- D. It reverses HTML source order.

**Answer: B.**

**Explanation:** `writing-mode` controls the direction in which blocks and lines stack. The default is `horizontal-tb`.

### 6. Which markup expresses that an HTML document is written in Arabic and right to left?

- A. `<html lang="ar" dir="rtl">`
- B. `<html writing-mode="vertical-rl">`
- C. `<html direction="right">`
- D. `<html align="rtl">`

**Answer: A.**

**Explanation:** `lang` identifies the language and `dir` expresses its text direction. A right-to-left language is not made vertical by changing `writing-mode`.

### 7. In a vertical writing mode, what does `inline-size` measure?

- A. The physical width
- B. The physical height
- C. The block flow direction
- D. The font size

**Answer: B. The physical height.**

**Explanation:** The inline axis follows text along a line. In vertical writing, that axis is vertical, so inline size maps to physical height.

### 8. Which value aligns text with the start of its inline direction?

- A. `text-align: top`
- B. `text-align: start`
- C. `text-align: inline-start`
- D. `text-align: block-start`

**Answer: B. `text-align: start`.**

**Explanation:** `start` is the logical text alignment value. It aligns left in ordinary left-to-right horizontal writing and right in right-to-left horizontal writing.

### 9. What do the two values in `margin-inline: 1rem 2rem` represent?

- A. Left and right, always
- B. Top and bottom, always
- C. Inline start and inline end
- D. Width and height

**Answer: C. Inline start and inline end.**

**Explanation:** Logical shorthands list the start-side value first and the end-side value second. The physical sides depend on writing mode and direction.

### 10. Which properties place a close control at the start of the block flow and end of the inline flow?

- A. `top` and `right`
- B. `inset-block-start` and `inset-inline-end`
- C. `margin-top` and `margin-right`
- D. `padding-block-start` and `padding-inline-end`

**Answer: B.**

**Explanation:** Inset properties position absolutely or fixed-positioned elements. The logical pair adapts to writing direction.

## True or false

### 11. Arabic text should usually use `writing-mode: vertical-rl`.

**Answer: False.**

**Explanation:** Arabic is commonly horizontal text with a right-to-left inline direction. Use the appropriate HTML `dir` value. Vertical writing is a different layout choice.

### 12. HTML `dir` is appropriate for expressing the direction of a document or passage.

**Answer: True.**

**Explanation:** Direction is semantic information in HTML. CSS can style the layout, but should not replace the markup that expresses text direction.

### 13. Setting `direction: rtl` changes block flow from top-to-bottom to right-to-left.

**Answer: False.**

**Explanation:** `direction` sets the inline base direction. `writing-mode` controls block flow. In horizontal RTL text, blocks still stack from top to bottom.

### 14. Replacing physical properties with logical properties changes the HTML reading order.

**Answer: False.**

**Explanation:** Logical properties change how CSS maps dimensions and edges. They do not reorder the document tree or its reading sequence.

### 15. Physical properties are always wrong in internationalized layouts.

**Answer: False.**

**Explanation:** Physical properties are useful when a design must remain tied to a screen edge, such as a deliberate visual offset. Use logical properties when the effect should follow text flow.

## Short-answer questions

### 16. How do `inline-size` and `block-size` map in the default horizontal writing mode?

**Answer:** `inline-size` maps to physical width, and `block-size` maps to physical height.

**Explanation:** The inline dimension follows a line of text. The block dimension follows the direction in which lines or blocks stack.

### 17. What changes when an element uses `writing-mode: vertical-rl`?

**Answer:** Its lines run vertically and its blocks stack from right to left.

**Explanation:** The writing mode changes layout flow. It is not just a visual rotation. Logical properties on the element map to the new axes.

### 18. How can you safely include a value with unknown text direction in a sentence?

**Answer:** Use `<bdi>` to isolate the value. If the direction of a whole passage is unknown, consider `dir="auto"`.

**Explanation:** Isolating mixed-direction content prevents it from affecting the surrounding bidirectional text layout.

### 19. What does `text-orientation` control?

**Answer:** It controls glyph orientation in vertical writing modes.

**Explanation:** The default `mixed` keeps many scripts upright and rotates characters that are normally horizontal. Use `upright` or `sideways` only when appropriate for the script or design.

## Read the code

### 20. Which side gets the border in each card?

~~~css
.note {
  border-inline-start: 4px solid navy;
}
~~~

~~~html
<article class="note" dir="ltr">Left-to-right note</article>
<article class="note" dir="rtl">Right-to-left note</article>
~~~

**Answer:** The first card has the border on its left. The second has it on its right.

**Explanation:** Both cards use the same rule. The HTML direction changes which physical edge is inline start.

### 21. In `vertical-rl`, what physical dimensions do these logical sizes describe?

~~~css
.vertical-panel {
  inline-size: 20rem;
  block-size: 12rem;
}
~~~

**Answer:** `inline-size` describes physical height, and `block-size` describes physical width.

**Explanation:** Inline size follows the line direction, which is vertical here. Block size follows the direction blocks stack, which is horizontal.

### 22. In default horizontal left-to-right writing, which value wins for the left margin?

~~~css
.notice {
  margin-inline-start: 1rem;
  margin-left: 2rem;
}
~~~

**Answer:** The physical left margin is `2rem`, assuming equal cascade priority.

**Explanation:** In this writing mode, inline start maps to the left. The declarations address the same side, so source order makes the later declaration win when their cascade priorities are equal.

## Troubleshooting and coding

### 23. A component uses `border-left` for a stripe, and the stripe stays on the left for right-to-left text. What should change?

**Answer:** Use `border-inline-start` instead.

~~~css
.message {
  border-inline-start: 0.25rem solid #2563a6;
  padding-inline-start: 1rem;
}
~~~

**Explanation:** Inline start follows text direction. The stripe and its spacing move together for right-to-left text.

### 24. Convert this close control placement to logical properties.

~~~css
.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
~~~

**Answer:**

~~~css
.close {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}
~~~

**Explanation:** The control remains at block start and inline end. In a horizontal right-to-left context, inline end is the left edge.

### 25. A page written in Arabic is aligned to the right using CSS, but mixed Arabic and Latin text displays in a confusing order. What should you check?

**Answer:** Set the correct language and direction in HTML, and isolate mixed-direction inline values when needed.

~~~html
<p lang="ar" dir="rtl">
  رقم الطلب: <bdi>AB-204</bdi>
</p>
~~~

**Explanation:** Text alignment alone does not define bidirectional text behavior. HTML direction metadata and isolation allow the browser to lay out mixed scripts correctly.

### 26. Which properties should you choose for a card that should be 36rem wide in horizontal writing but 36rem tall in vertical writing?

**Answer:** Use `inline-size: 36rem`.

**Explanation:** Inline size follows the line of text. It maps to width in horizontal writing and height in vertical writing.

### 27. Which property should you use for an element that should always be physically 12rem wide, regardless of writing mode?

**Answer:** Use `width: 12rem`.

**Explanation:** The design requirement is tied to a physical dimension, so a physical property communicates it directly.

## Key takeaways

- Logical properties describe edges and dimensions relative to content flow.
- The inline axis follows a line of text; the block axis follows how lines or blocks stack.
- `writing-mode` controls block flow. `direction` controls inline direction.
- Use HTML `dir` to express text direction.
- Prefer logical sizing, spacing, borders, and insets when a component should follow text flow.
- A right-to-left language is not automatically vertical.
- Physical properties remain useful when a design must follow a fixed screen edge.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [31 - Container Queries](../lessons/31-container-queries.md) | [Q&A](32-logical-properties-and-writing-modes.md) | [Example](../examples/32-logical-properties-and-writing-modes.md) | [33 - Backgrounds and Gradients](../lessons/33-backgrounds-and-gradients.md) |
