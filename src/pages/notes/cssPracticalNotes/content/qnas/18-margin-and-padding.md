# 18 - Margin and Padding: Questions and Answers

Use these questions to practise spacing a box inside and around other boxes. Each answer follows its question, with an explanation where useful.

## Multiple-choice questions

### 1. Where does padding create space?

- A. Outside the border
- B. Between the content and border
- C. Between two sibling elements
- D. Outside the margin

**Answer: B.** Padding is inner spacing between an element's content and its border.

### 2. Where does margin create space?

- A. Between content and border
- B. Inside the content area
- C. Outside the border
- D. Inside the padding only

**Answer: C.** Margin surrounds the border box and separates it from nearby boxes.

### 3. Which area is transparent and does not receive the element's background?

- A. Content
- B. Padding
- C. Margin
- D. Border

**Answer: C.** The margin is outside the border and transparent. The parent's background can show through it.

### 4. Which statement about padding is correct?

- A. Padding values can be negative.
- B. Padding creates inner space and receives the element's background.
- C. Padding always collapses with adjacent padding.
- D. Padding is outside the border.

**Answer: B.** Padding is inside the border and is painted with the element's background. Negative padding is invalid.

### 5. Which statement about margins is correct?

- A. Margins can be negative.
- B. Margins receive the element's background.
- C. Margins are always inside the border.
- D. Margins cannot use `auto`.

**Answer: A.** Negative margins are valid and can pull boxes closer together or make them overlap.

### 6. What does `padding: 12px` set?

- A. Top and bottom only
- B. Right and left only
- C. All four sides
- D. Top only

**Answer: C.** A one-value shorthand applies that value to all four sides.

### 7. What does `margin: 8px 20px` set?

- A. Top and bottom to 8px; right and left to 20px
- B. Top and bottom to 20px; right and left to 8px
- C. Top to 8px; all other sides to 20px
- D. Every side to 28px

**Answer: A.** Two values mean vertical sides first, then horizontal sides.

### 8. What does `padding: 4px 12px 20px` set?

- A. Top 4px, right and left 12px, bottom 20px
- B. Top and bottom 4px, right and left 12px
- C. Top 20px, right and left 12px, bottom 4px
- D. Top 4px, right 12px, bottom 20px, left 0

**Answer: A.** Three values map to top, horizontal sides, and bottom.

### 9. Which side gets the third value in a four-value shorthand?

- A. Top
- B. Right
- C. Bottom
- D. Left

**Answer: C.** Four values go clockwise: top, right, bottom, left.

### 10. Which property is commonly used to center a constrained block horizontally when space remains?

- A. `padding-inline: auto`
- B. `margin-inline: auto`
- C. `border-inline: auto`
- D. `margin-block: center`

**Answer: B.** Automatic inline margins divide the leftover inline space around a constrained block.

### 11. Two adjoining positive vertical margins are 24px and 16px. What gap do they usually produce in normal block flow?

- A. 40px
- B. 24px
- C. 16px
- D. 8px

**Answer: B.** Positive adjoining vertical margins collapse to the larger margin, so the gap is 24px rather than 40px.

### 12. Which margins never collapse?

- A. Top and bottom margins
- B. Horizontal margins
- C. Margins of first children
- D. Margins of empty blocks

**Answer: B.** Margin collapsing applies to adjoining vertical margins in block layout. Horizontal margins do not collapse.

### 13. What reference do percentage values for physical top and bottom margins use?

- A. The containing block's height
- B. The viewport's height
- C. The containing block's width
- D. The element's font size

**Answer: C.** Percentage margins on every physical side use the containing block's width, including top and bottom.

### 14. What reference do percentage values for padding use?

- A. The containing block's width, even for top and bottom padding
- B. The containing block's height for top and bottom
- C. The element's content height
- D. The viewport height

**Answer: A.** Percentage padding on all physical sides uses the containing block's width.

### 15. Which method can prevent a first child's top margin from collapsing through its parent?

- A. Add padding or a border to the parent
- B. Set the child's color
- C. Set the parent font size to zero
- D. Add a text decoration

**Answer: A.** Padding or border separates the parent and child margin edges. A parent with `display: flow-root` also contains its in-flow children's margins.

### 16. How do margins behave for flex and Grid items?

- A. They collapse like normal block siblings.
- B. They do not collapse between the items.
- C. They become padding.
- D. They are ignored.

**Answer: B.** Flex and Grid item margins do not collapse with each other the way adjoining normal-flow block margins can.

### 17. What can happen when a later `padding` shorthand follows `padding-left`?

- A. The shorthand sets all four sides and can replace the earlier left value.
- B. The shorthand only changes top padding.
- C. The longhand always wins, no matter the order.
- D. The shorthand is invalid.

**Answer: A.** The shorthand sets every side it represents. If it comes later with equal cascade priority, its left value replaces the earlier longhand value.

### 18. Which unit is often useful for spacing that should follow the root font size?

- A. `rem`
- B. `%`
- C. `vh`
- D. `deg`

**Answer: A.** A rem value is based on the root font size, which makes it useful for consistent page and component spacing.

## True or false

### 19. Padding is outside the border.

**Answer: False.** Padding is inside the border, between content and border. Margin is outside the border.

### 20. Margin receives the element's background color by default.

**Answer: False.** Margin is transparent. The background of the parent or what is behind the element shows through it.

### 21. Padding values can be negative if the box uses `box-sizing: border-box`.

**Answer: False.** Negative padding is invalid regardless of the box-sizing model.

### 22. Negative margins can make elements overlap.

**Answer: True.** A negative margin pulls a box toward or over nearby content. Use it only when that overlap is intended.

### 23. Adjoining positive vertical margins always add together.

**Answer: False.** In normal block flow, adjoining positive vertical margins can collapse to the larger value.

### 24. A border or padding can separate margin edges and prevent those margins from adjoining.

**Answer: True.** A border or padding between the edges prevents that margin collapse.

### 25. A margin on an element always collapses with the margins of its parent and children.

**Answer: False.** Collapse requires specific flow and box conditions. For example, padding, borders, line boxes, formatting contexts, and positioning can prevent it.

### 26. The top and bottom values in `padding: 5%` use the containing block's height.

**Answer: False.** Percentage padding on physical top and bottom sides uses the containing block's width.

### 27. The initial CSS value of margin is non-zero because browsers show default heading margins.

**Answer: False.** The initial value is zero. Browser user-agent stylesheets add visible default spacing to headings and other elements.

### 28. `margin-inline: auto` can center a block when the block is narrower than its containing block.

**Answer: True.** If there is leftover inline space, automatic inline margins share it on both sides.

## Short-answer questions

### 29. How do margin and padding differ?

**Answer:** Padding creates space inside the border, between content and border, and receives the element's background. Margin creates transparent space outside the border, separating boxes.

### 30. When should you choose padding instead of margin?

**Answer:** Use padding when content needs space inside a component's background or border. For example, a button uses padding to keep its label away from the edges.

### 31. When should you choose margin instead of padding?

**Answer:** Use margin when the space belongs outside the component and should separate it from neighboring boxes.

### 32. How do one, two, three, and four values map in margin or padding shorthand?

**Answer:** One applies to all sides. Two apply to top and bottom, then right and left. Three apply to top, horizontal sides, then bottom. Four apply clockwise: top, right, bottom, left.

### 33. Why might `margin-top: 2rem` on a first child appear above the parent?

**Answer:** The child's top margin can collapse with the parent's top margin when their edges are adjoining. Adding parent padding or a border, or establishing a formatting context with `display: flow-root`, can keep that inner spacing inside the parent.

### 34. How do adjoining positive and negative margins combine?

**Answer:** The largest positive margin is reduced by the most negative margin. For example, 24px and -8px collapse to 16px. If all adjoining margins are negative, the most negative value determines the result.

### 35. Why can `margin-top: 5%` be surprising?

**Answer:** Its percentage uses the containing block's width, not its height. If the containing block is wide, the resulting top spacing may be larger than expected.

### 36. Why do websites often reset body and heading margins?

**Answer:** Browsers apply user-agent stylesheets that add default margins to common elements. A reset gives the project a consistent starting point, but deliberate spacing should then be added where the design needs it.

## Spacing calculations

### 37. What sides get which values from `margin: 4px 8px 12px 16px`?

**Answer:** Top is 4px, right is 8px, bottom is 12px, and left is 16px. Four values use clockwise order starting at the top.

### 38. What sides get which values from `padding: 10px 20px`?

**Answer:** Top and bottom are 10px. Right and left are 20px.

### 39. A containing block is 800px wide. What is `padding-top: 5%`?

**Answer: 40px.** The padding percentage uses the containing block's width: 5% of 800px is 40px.

### 40. A containing block is 600px wide. What is `margin-bottom: 10%`?

**Answer: 60px.** Even though this is a vertical margin, its percentage uses the containing block's width: 10% of 600px.

### 41. Two adjoining positive vertical margins are 30px and 18px. What is their collapsed margin?

**Answer: 30px.** Positive adjoining margins collapse to the larger value, not their sum.

### 42. An adjoining positive margin is 30px and an adjoining negative margin is -12px. What is the resulting collapsed margin?

**Answer: 18px.** The most negative value reduces the largest positive value: 30 - 12 = 18px.

### 43. Two adjoining negative margins are -10px and -24px. What is the resulting collapsed margin?

**Answer: -24px.** If all adjoining margins are negative, the most negative value determines the result.

### 44. A 600px-wide block is in a 1000px containing block with equal automatic left and right margins. What is each margin, assuming no other horizontal box parts?

**Answer: 200px.** The remaining 400px is divided equally: (1000 - 600) / 2 = 200px per side.

## Code-reading questions

### 45. What happens to the left padding after these declarations?

~~~css
.card {
  padding-left: 2rem;
  padding: 1rem;
}
~~~

**Answer: It becomes 1rem.** The later shorthand sets all four padding sides, including the left side.

### 46. Why can the first child's margin appear outside this parent?

~~~css
.parent {
  background: #e2e8f0;
}

.parent h2 {
  margin-top: 2rem;
}
~~~

**Answer:** If the heading is the parent's first in-flow block child and no border, padding, or other separator intervenes, its top margin can collapse with the parent's top margin. Add intentional parent padding, a border, or `display: flow-root` if the space should be inside the parent.

### 47. Does this rule create 40px of space between two adjoining normal-flow block siblings?

~~~css
.first {
  margin-bottom: 24px;
}

.second {
  margin-top: 16px;
}
~~~

**Answer: No.** If the margins adjoin in the same block formatting context, they collapse to 24px.

### 48. What is the purpose of these logical spacing declarations?

~~~css
.card {
  margin-block: 1rem;
  padding-inline: 1.5rem;
}
~~~

**Answer:** They add 1rem at the start and end of the block direction, plus 1.5rem at the start and end of the inline direction. The physical sides depend on the writing mode, so the rule adapts better to different text directions.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [17 - Width, Height, and Sizing](17-width-height-and-sizing.md) | [Lesson](../lessons/18-margin-and-padding.md) | [Example](../examples/18-margin-and-padding.md) | [19 - Borders, Outlines, and Shadows](19-borders-outlines-and-shadows.md) |
