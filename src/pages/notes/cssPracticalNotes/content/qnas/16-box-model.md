# 16 - The CSS Box Model: Questions and Answers

Use these questions to check your understanding of content, padding, borders, margins, and box sizing. Each answer follows its question and includes an explanation where it helps.

## Multiple-choice questions

### 1. Which order lists the box areas from the inside out?

- A. Margin, border, padding, content
- B. Content, padding, border, margin
- C. Content, margin, border, padding
- D. Padding, content, margin, border

**Answer: B.** Content is at the center. Padding surrounds it, then border, then margin.

### 2. What does padding add?

- A. Transparent space outside the border
- B. Space between content and border
- C. A visible line outside the margin
- D. Space that is never part of an element's box

**Answer: B.** Padding is the inner space between the content and the border. The element's background is painted behind it.

### 3. Which box area is transparent and outside the border?

- A. Content
- B. Padding
- C. Border
- D. Margin

**Answer: D.** Margin separates the border box from neighboring content and does not receive the element's background.

### 4. What is the initial value of `box-sizing`?

- A. `border-box`
- B. `content-box`
- C. `padding-box`
- D. `margin-box`

**Answer: B.** The default is `content-box`, so a declared width describes the content area.

### 5. With `content-box`, what happens to padding and borders?

- A. They are included inside the declared width.
- B. They are added outside the declared content width.
- C. They replace the content width.
- D. They are drawn but take up no space.

**Answer: B.** Under `content-box`, the specified width is the content width. Padding and borders add to the visible border-box size.

### 6. Which areas are included in a declared width when `box-sizing: border-box` is used?

- A. Content only
- B. Content and margin
- C. Content, padding, and border
- D. Padding, border, and margin

**Answer: C.** `border-box` includes content, padding, and border. Margin remains outside.

### 7. Which property adds transparent space outside an element's border?

- A. `padding`
- B. `border-width`
- C. `margin`
- D. `outline-offset`

**Answer: C.** Margin sits outside the border and separates boxes.

### 8. Which statement about negative values is correct?

- A. Padding and margin can both be negative.
- B. Padding can be negative, but margin cannot.
- C. Margin can be negative, but padding cannot.
- D. Neither can be negative.

**Answer: C.** Negative margins are valid and can pull boxes closer or cause overlap. Negative padding is invalid.

### 9. What does `padding: 1rem 2rem` set?

- A. Top and bottom to 1rem; right and left to 2rem
- B. Top and bottom to 2rem; right and left to 1rem
- C. Top to 1rem; right to 2rem; bottom and left to 0
- D. Every side to 3rem

**Answer: A.** With two values, the first sets top and bottom, and the second sets right and left.

### 10. Which side order does a four-value padding shorthand use?

- A. Top, bottom, left, right
- B. Left, top, right, bottom
- C. Top, right, bottom, left
- D. Bottom, right, top, left

**Answer: C.** Four values follow a clockwise order starting at the top.

### 11. Which statement about the background is correct by default?

- A. It paints the margin but not the padding.
- B. It paints the content and padding and extends underneath the border.
- C. It paints only the border.
- D. It paints only the content.

**Answer: B.** The default background painting area extends to the border edge. The margin stays transparent.

### 12. Which visual effect does not take up box-model layout space?

- A. A border
- B. Padding
- C. An outline
- D. Margin

**Answer: C.** An outline is painted outside the border and does not reserve layout space. A border does contribute to the box dimensions.

### 13. What does a box shadow do to the element's box-model dimensions?

- A. It adds to the content width.
- B. It adds to the border width.
- C. It adds margin automatically.
- D. It does not add layout space.

**Answer: D.** A shadow is painted as a visual effect and does not add a box-model area.

### 14. Which selector covers an element and its before and after pseudo-elements in a common reset?

- A. `body *`
- B. `*, *::before, *::after`
- C. `html::before`
- D. `::first-line`

**Answer: B.** Including pseudo-elements gives generated boxes the same `box-sizing` rule as regular elements.

### 15. What can happen to adjacent positive vertical margins of normal-flow block elements?

- A. They always add together.
- B. They can collapse to the larger margin.
- C. They become padding.
- D. They are removed from the stylesheet.

**Answer: B.** In some normal-flow block contexts, adjacent vertical margins collapse. Their behavior is covered in detail in the later margins and padding chapter.

## True or false

### 16. The margin area is inside the border.

**Answer: False.** The margin is outside the border. Content, padding, and border make up the border box.

### 17. With `box-sizing: border-box`, margins are included in the declared width.

**Answer: False.** The declared width includes content, padding, and border. Margins remain outside it.

### 18. Adding padding to a content-box element can make its border box wider than its declared width.

**Answer: True.** Padding and border are added outside the content width under the default model.

### 19. Padding is painted with the element's background.

**Answer: True.** The background is painted through the content and padding areas.

### 20. A border can take up space even if its color is transparent.

**Answer: True.** Border width is part of the box dimensions when the border style uses a non-zero width. Color visibility does not decide its size.

### 21. An outline is included in the border-box width.

**Answer: False.** An outline does not contribute to the box-model size or normal layout.

### 22. A negative margin is valid CSS.

**Answer: True.** Negative margins are allowed, though they can cause overlap and need careful use.

### 23. Negative padding is valid if the element uses `border-box`.

**Answer: False.** Padding cannot be negative regardless of the box-sizing model.

### 24. Setting `box-sizing: border-box` removes an element's padding.

**Answer: False.** It changes how declared sizes are interpreted. Padding remains and uses space inside the border box.

## Short-answer questions

### 25. What are the four box areas?

**Answer:** Content, padding, border, and margin, from the inside outward. Content holds the element's contents; padding is inside spacing; border surrounds content and padding; margin is outside spacing.

### 26. What is the difference between the border box and the margin box?

**Answer:** The border box includes content, padding, and border. The margin box also includes the surrounding margins.

### 27. Why do developers often apply `box-sizing: border-box` globally?

**Answer:** It makes a declared width include padding and border, which often makes component sizes easier to predict. A common rule also includes `::before` and `::after` so generated boxes use the same model.

### 28. How do logical properties differ from physical properties?

**Answer:** Physical properties name fixed sides such as top and left. Logical properties such as `padding-block` and `padding-inline` refer to text flow and writing direction, so they can adapt to different writing modes.

### 29. Why can an outline be useful for keyboard focus?

**Answer:** An outline can make focus visible without shifting nearby content because it does not take up layout space. Focus indicators should remain clearly visible.

### 30. How can browser developer tools help diagnose unexpected space?

**Answer:** The box-model diagram separates content, padding, border, and margin. Inspecting it can reveal which side or CSS rule is adding space and whether the element uses content-box or border-box sizing.

### 31. What is margin collapsing?

**Answer:** In some normal-flow block layouts, adjacent vertical margins combine instead of simply adding together. For two adjacent positive margins, the larger margin commonly determines the gap. More cases are covered in the margins and padding chapter.

### 32. Do all elements respond to `width` and `height` the same way?

**Answer:** No. The box areas exist, but sizing behavior depends on the element and layout mode. For example, a non-replaced inline element normally does not accept width and height like a block. The next chapter explains these sizing rules.

## Box-size calculations

For these questions, count both left and right sides. Do not include margins in the border-box width.

### 33. A content-box element has a 240px content width, 12px padding on every side, and a 3px border on every side. What is its border-box width?

**Answer: 270px.** Add the horizontal padding and borders to the content width: 240 + 12 + 12 + 3 + 3 = 270px.

### 34. The element in question 33 has 10px margins on both horizontal sides. How much horizontal space does it occupy including margins?

**Answer: 290px.** Its border-box width is 270px. Add 10px on each side: 270 + 10 + 10 = 290px.

### 35. A border-box element is 240px wide, with 12px padding on every side and a 3px border on every side. What is its content width?

**Answer: 210px.** Subtract left and right padding and borders: 240 - 12 - 12 - 3 - 3 = 210px.

### 36. A border-box element is 320px wide, with 24px padding and a 4px border on every side. What is its content width?

**Answer: 264px.** The horizontal padding totals 48px and the borders total 8px. So 320 - 48 - 8 = 264px.

### 37. A content-box element has `width: 200px`, horizontal padding of 15px per side, horizontal borders of 2px per side, and horizontal margins of 8px per side. What is its full margin-box width?

**Answer: 250px.** The border-box is 200 + 30 + 4 = 234px. Add both margins: 234 + 8 + 8 = 250px.

### 38. A border-box element has a declared width of 180px, horizontal padding of 20px per side, and horizontal borders of 5px per side. What is the content width?

**Answer: 130px.** Subtract both padding values and both borders: 180 - 40 - 10 = 130px.

### 39. A border-box element has a declared width of 80px, but its horizontal padding totals 70px and its horizontal borders total 20px. Can its content width be negative?

**Answer: No.** The content area cannot be negative. It is floored at zero, so the border box can end up wider than the declared 80px size.

## Code-reading questions

### 40. What is the border-box width of this element?

~~~css
.panel {
  width: 250px;
  padding: 10px 20px;
  border: 4px solid;
}
~~~

**Answer: 298px under the default content-box model.** The content width is 250px. Add 20px of padding on each horizontal side and 4px of border on each side: 250 + 40 + 8 = 298px.

### 41. How wide is the content area in this example?

~~~css
.panel {
  box-sizing: border-box;
  width: 250px;
  padding: 10px 20px;
  border: 4px solid;
}
~~~

**Answer: 202px.** The declared 250px includes padding and borders. Subtract 20px on each side and 4px of border on each side: 250 - 40 - 8 = 202px.

### 42. Does this focus style change the element's layout size?

~~~css
input:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}
~~~

**Answer: No.** The outline and its offset are painted outside the border but do not add layout space.

### 43. In the following shorthand, what is the top and right padding?

~~~css
.box {
  padding: 1rem 2rem 3rem 4rem;
}
~~~

**Answer:** Top padding is 1rem and right padding is 2rem. The four values map clockwise: top, right, bottom, left.

### 44. What changes if a border has a transparent color but a 5px solid style?

**Answer:** The border is invisible against the background, but its 5px width still contributes to the box dimensions. Transparency affects painting, not the width calculation.

## Apply what you learned

### 45. How would you make every element and its pseudo-elements use border-box sizing?

**Answer:**

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}
~~~

Including pseudo-elements ensures generated content boxes follow the same sizing rule.

### 46. A component is unexpectedly wider than its declared width. What should you inspect first?

**Answer:** Check its computed `box-sizing`, padding, and border widths in developer tools. If it uses `content-box`, padding and borders are added outside the declared width. Also check margins if the total surrounding layout space is the concern.

### 47. You want inner space around text without increasing the gap outside the component. Which area should you adjust?

**Answer: Padding.** Padding adds space inside the border and receives the element's background. Margin adds transparent space outside the border.

### 48. You want a visible focus ring without shifting nearby elements. Which is usually appropriate: border or outline?

**Answer: An outline.** It is drawn outside the border without taking up layout space. Keep the focus indicator visually clear.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [15 - CSS Math Functions: calc, min, max, and clamp](15-css-math-functions.md) | [Lesson](../lessons/16-box-model.md) | [Example](../examples/16-box-model.md) | [17 - Width, height, and sizing](17-width-height-and-sizing.md) |
