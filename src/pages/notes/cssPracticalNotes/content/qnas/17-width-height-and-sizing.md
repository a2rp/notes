# 17 - Width, Height, and Sizing: Questions and Answers

Use these questions to practise choosing and calculating CSS sizes. Each answer follows its question, with an explanation where useful.

## Multiple-choice questions

### 1. What are the initial values of `width` and `height`?

- A. `0`
- B. `100%`
- C. `auto`
- D. `max-content`

**Answer: C.** Both properties start at `auto`. The layout context determines what automatic sizing does.

### 2. What does `width: auto` usually do to a normal block in normal flow?

- A. Makes it exactly as wide as its text
- B. Fills the available inline space while accounting for its other horizontal box parts
- C. Makes it as wide as the viewport
- D. Hides the element

**Answer: B.** An auto-width block normally uses the available space after margins, padding, and borders are considered.

### 3. A percentage width is generally based on which size?

- A. The viewport width in every case
- B. The containing block's width
- C. The element's text width
- D. The root font size

**Answer: B.** The containing block provides the reference for percentage width. It is the viewport only when the containing block is the viewport.

### 4. What does `height: auto` usually allow a normal block to do?

- A. Grow to fit its content
- B. Stay exactly one line tall
- C. Fill the viewport
- D. Ignore its content

**Answer: A.** Automatic height normally follows the content, so the block can grow when more content is added.

### 5. With the default `content-box` model, what can happen when a block has `width: 100%` plus padding and borders?

- A. Padding and borders disappear
- B. The outer box can become wider than its containing block
- C. The box becomes exactly half the containing block
- D. The browser changes the width to `auto`

**Answer: B.** The 100% describes the content width under `content-box`. Padding and borders are added outside it.

### 6. Which rule is a useful starting point for images that should shrink to fit without being enlarged to fill every container?

- A. `width: 100%; height: 100%;`
- B. `max-width: 100%; height: auto;`
- C. `min-width: 100%; height: fixed;`
- D. `width: auto; height: 100%;`

**Answer: B.** The image can shrink to the containing block's width while its automatic height preserves its proportions. A 100% width would also enlarge a smaller image.

### 7. When does a percentage height usually have a clear reference in normal flow?

- A. When its containing block has a definite height
- B. Whenever the containing block has text
- C. Only when the element has a border
- D. When the viewport is wide

**Answer: A.** A percentage height needs a definite containing-block height in common normal-flow cases. If the parent's height depends on content, the percentage child height generally behaves as `auto`.

### 8. What does `min-content` generally describe?

- A. The largest size with no line wrapping
- B. A content-based minimum size that uses available soft wrap opportunities
- C. A fixed size of zero
- D. The viewport width

**Answer: B.** `min-content` is derived from the content under tight wrapping constraints. Unbreakable content can still overflow.

### 9. What does `max-content` generally describe for text?

- A. The content's preferred size without soft wrapping
- B. The smallest width that hides text
- C. The parent's width
- D. The sum of all margins

**Answer: A.** Max-content sizing lets text use its preferred unwrapped width, except where explicit breaks or other rules apply.

### 10. What does `max-width: 40rem` do?

- A. Forces the element to be exactly 40rem wide
- B. Sets a ceiling of 40rem on the preferred width
- C. Sets a 40rem minimum width
- D. Sets its height

**Answer: B.** The element may be narrower. `max-width` is a limit, not a request to fill that size.

### 11. What is a practical use for `min-height`?

- A. Allowing a box to grow while setting a minimum height
- B. Preventing all content from wrapping
- C. Setting an exact maximum height
- D. Removing the box's height

**Answer: A.** A minimum height sets a floor. The box can still grow when its content needs more room.

### 12. If `min-width` and `max-width` conflict, which constraint is stronger?

- A. `max-width`
- B. `min-width`
- C. The last declaration in the stylesheet
- D. Neither one

**Answer: B.** The minimum size constraint is the stronger constraint. Avoid contradictory minimum and maximum values unless the result is intentional.

### 13. Does `width` normally apply to a non-replaced inline element such as a plain `span`?

- A. Yes, exactly like a block
- B. No
- C. Only if it has a background
- D. Only when its parent has a fixed height

**Answer: B.** A non-replaced inline element's width follows its inline content and line layout. Use a suitable display type or layout when it needs an explicit width.

### 14. What is one difference between `inline` and `inline-block` sizing?

- A. An inline-block can accept explicit width and height while still flowing with surrounding inline content
- B. An inline element always fills its parent
- C. An inline-block cannot have padding
- D. They always have identical sizing behavior

**Answer: A.** An inline-block participates in inline flow but has a box that can be sized.

### 15. What does `aspect-ratio: 16 / 9` express?

- A. A fixed width of 16px
- B. A preferred width-to-height ratio
- C. A minimum height of 9px
- D. A percentage of the viewport

**Answer: B.** The ratio gives the browser a preferred relationship between the box's width and height when one dimension is determined and the other can be automatic.

### 16. Which is the main difference between `fit-content` and the `fit-content()` sizing function?

- A. There is no difference
- B. One is an intrinsic sizing keyword; the function accepts a limit
- C. The keyword sets height and the function sets width only
- D. The function is a media query

**Answer: B.** The `fit-content` keyword uses available space and content-based limits. The `fit-content()` function takes a limit argument for sizing algorithms that support it.

### 17. In a common horizontal writing mode, what does `inline-size` correspond to?

- A. Height
- B. Width
- C. Margin
- D. Border thickness

**Answer: B.** In horizontal writing, the inline axis runs across the line, so `inline-size` corresponds to width. The mapping can change in other writing modes.

### 18. How are the intrinsic keywords `min-content` and `max-content` different from the `min()` and `max()` math functions?

- A. They are interchangeable names
- B. Intrinsic keywords describe content-based sizes; math functions choose between values
- C. The keywords work only with color
- D. The functions set font weight

**Answer: B.** Intrinsic sizing values derive a size from content. The math functions calculate among supplied CSS values.

## True or false

### 19. A block with a fixed height always grows to fit more content.

**Answer: False.** A fixed height does not automatically grow. Content may overflow, so use automatic or minimum height when the content can vary.

### 20. In common normal-flow cases, `height: 50%` on a child can behave like `auto` when its parent's height depends on content.

**Answer: True.** There is no definite parent height to use as the percentage reference.

### 21. `max-width: 100%` forces every image to become as wide as its container.

**Answer: False.** It sets a maximum. Smaller images can remain at their natural or otherwise determined size.

### 22. A normal block in normal flow usually needs `width: 100%` to fill its containing block.

**Answer: False.** Its default `width: auto` usually fills the available inline space while accounting for its other horizontal box parts.

### 23. Percentage widths always refer to the viewport.

**Answer: False.** They generally refer to the containing block's width, which may be an ancestor element.

### 24. An aspect ratio always overrides every other size constraint and produces exactly the requested ratio.

**Answer: False.** It is a preferred ratio. Explicit sizes and min/max constraints can affect the final dimensions.

### 25. A box with `min-height` can grow taller than that minimum.

**Answer: True.** The minimum is a floor, not a fixed height.

### 26. A plain non-replaced `span` normally uses `width` just like a block element.

**Answer: False.** Width does not apply to non-replaced inline elements in the same way it applies to blocks. Their inline size follows line layout.

### 27. Min and max constraints can make the used size differ from the declared preferred width or height.

**Answer: True.** The browser resolves the preferred size within the applicable minimum and maximum constraints.

### 28. Under the default content-box model, a declared width includes padding and border.

**Answer: False.** It describes the content width. Padding and border are outside it. With `border-box`, they are included.

## Short-answer questions

### 29. What is the containing block?

**Answer:** It is the reference box that establishes the size or position context for another box. For example, a percentage width commonly uses its containing block's width.

### 30. Why is `width: auto` often preferable to `width: 100%` for a normal block?

**Answer:** An auto-width block fills the available space while accounting for margins, padding, and borders. A 100% content width can extend beyond the containing block when padding or borders are added with content-box sizing.

### 31. Why can `height: 100%` appear not to work?

**Answer:** The containing block may not have a definite height. In common normal-flow cases, a percentage height cannot resolve against a parent whose height is determined by its content.

### 32. When should a design use `min-height` instead of a fixed `height`?

**Answer:** Use `min-height` when a region should not be shorter than a target size but its content may need more room. It avoids forcing variable content into a fixed-height box.

### 33. What do `min-width` and `max-width` do?

**Answer:** They set lower and upper constraints for the used width. The browser resolves the preferred width within those constraints, with the minimum constraint taking priority if they conflict.

### 34. What is an intrinsic size?

**Answer:** It is a size derived primarily from an element's content or natural dimensions. For example, an image has intrinsic dimensions, and text contributes content-based min-content and max-content sizes.

### 35. What is the difference between a fixed width and a percentage width?

**Answer:** A fixed length such as `24rem` does not scale directly with the containing block. A percentage width is calculated from the containing block's width, so it changes as that reference changes.

### 36. What does `max-width: 100%; height: auto;` do for an image?

**Answer:** It lets an image shrink when it is wider than its containing block while keeping its natural proportions. It does not force a smaller image to enlarge to 100%.

## Sizing calculations

For these questions, assume the default `content-box` model unless the code says otherwise. Ignore margins, padding, and borders when they are not listed.

### 37. A containing block is 900px wide. What is the content width of a child with `width: 60%`?

**Answer: 540px.** Sixty percent of 900px is 540px.

### 38. A containing block has a definite height of 400px. What height does `height: 50%` resolve to in this simple case?

**Answer: 200px.** The child's percentage is calculated from the definite 400px containing-block height.

### 39. A normal block is inside a 600px-wide containing block. It has `width: auto`, 20px padding on each side, 5px borders on each side, and 10px margins on each side. What is its content width?

**Answer: 530px.** The margins use 20px total, padding uses 40px, and borders use 10px. Subtract them from 600px: 600 - 20 - 40 - 10 = 530px.

### 40. A content-box element has `width: 100%` in a 600px containing block, with 16px padding and a 2px border on every side. What is its border-box width?

**Answer: 636px.** The content width is 600px. Add 32px of horizontal padding and 4px of borders: 600 + 32 + 4 = 636px.

### 41. A border-box element is 600px wide, with 16px padding and a 2px border on each side. What is its content width?

**Answer: 564px.** Subtract both sides of padding and border: 600 - 32 - 4 = 564px.

### 42. A box has `width: 100%` and `max-width: 100%` in a 360px containing block. Assume it has no padding or border. What is its maximum content width?

**Answer: 360px.** The percentage width resolves to 360px, and the maximum does not allow it to be wider than the containing block.

### 43. A box has a width of 480px and an aspect ratio of `16 / 9`. With automatic height and no padding or border, what is its preferred height?

**Answer: 270px.** Divide 480 by 16 and multiply by 9: 480 / 16 * 9 = 270px.

### 44. A block has `width: 70rem; max-width: 100%` inside a 40rem containing block. Assume no padding or border. What width does it use?

**Answer: 40rem.** The preferred width is 70rem, but the maximum is 100% of the 40rem containing block.

## Code-reading questions

### 45. What happens to this heading when its containing block is narrower than 40rem?

~~~css
h1 {
  width: 40rem;
  max-width: 100%;
}
~~~

**Answer:** Its width is constrained to the containing block's width. The maximum is 100% of that containing block, so the heading can shrink below 40rem.

### 46. Will this image always stretch to fill its parent?

~~~css
img {
  max-width: 100%;
  height: auto;
}
~~~

**Answer: No.** The maximum only limits the image's width. A smaller image can keep its intrinsic or otherwise determined width. Its automatic height preserves its proportions as it shrinks.

### 47. What is a likely issue with this panel if its text becomes longer?

~~~css
.panel {
  height: 12rem;
}
~~~

**Answer:** The content can overflow the fixed-height content area. If the panel should grow with its content, use `height: auto` or set `min-height: 12rem`.

### 48. What does this rule do to a short label, and what might happen with a long unbreakable word?

~~~css
.label {
  width: max-content;
}
~~~

**Answer:** The box follows the label's preferred unwrapped content width. A long unbreakable word can make the box wider than its containing block unless another constraint or wrapping rule limits it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [16 - The CSS Box Model](16-box-model.md) | [Lesson](../lessons/17-width-height-and-sizing.md) | [Example](../examples/17-width-height-and-sizing.md) | [18 - Margin and Padding](18-margin-and-padding.md) |
