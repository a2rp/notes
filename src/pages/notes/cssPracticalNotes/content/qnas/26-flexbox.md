# 26 - Flexbox Layout: Questions and Answers

## Multiple-choice questions

### 1. Which declaration turns an element into a block-level flex container?

- **A.** display: grid
- **B.** display: flex
- **C.** position: flex
- **D.** float: flex

**Answer: B.** display: flex creates a block-level flex container. Its in-flow children become flex items.

### 2. Which children become flex items?

- **A.** Every descendant at every nesting level
- **B.** In-flow direct children of the flex container
- **C.** Only elements with a class
- **D.** Only links and buttons

**Answer: B.** Flex item status is based on direct children. A nested element stays inside its closest flex item unless that element is a child of another flex container.

### 3. What determines the main axis direction?

- **A.** flex-direction together with the writing mode
- **B.** The text color
- **C.** The item's border style
- **D.** The viewport's height only

**Answer: A.** The main axis is set by flex-direction and mapped through the writing mode, so it is not always physically horizontal or vertical.

### 4. In the common horizontal writing mode, what is the main axis for flex-direction: row?

- **A.** The block axis
- **B.** The inline axis, usually horizontal
- **C.** Always the vertical axis
- **D.** The z-axis

**Answer: B.** In a horizontal writing mode, row follows the inline direction, which is usually left to right.

### 5. What does flex-wrap: wrap allow?

- **A.** Items to move onto additional flex lines when they do not fit
- **B.** Text to wrap inside every item only
- **C.** The container to become absolutely positioned
- **D.** Items to change their HTML order

**Answer: A.** A wrapping flex container creates additional flex lines in the cross direction when items do not fit on a line.

### 6. How are flex lines sized and distributed?

- **A.** All lines share item free space as one large line.
- **B.** Each line is laid out independently.
- **C.** Only the first line is laid out.
- **D.** Every line becomes a separate flex container.

**Answer: B.** Flexible sizing and main-axis alignment are resolved per line. A line does not donate its unused space to another line.

### 7. Which property adds space between flex items without adding space around the container's outer edge?

- **A.** gap
- **B.** order
- **C.** flex-basis
- **D.** z-index

**Answer: A.** gap adds spacing between items and between flex lines, without adding outer-edge space.

### 8. What does flex-grow control?

- **A.** How an item can share positive free space
- **B.** How much text is bold
- **C.** Whether the container wraps
- **D.** The item's source order

**Answer: A.** Items with positive grow factors share available positive free space proportionally, subject to their sizing constraints.

### 9. What does flex-shrink control?

- **A.** How an item can give up space when the line is too large
- **B.** Whether an item is hidden
- **C.** How far the container scrolls
- **D.** The cross-axis alignment

**Answer: A.** The shrink factor controls an item's contribution to reducing negative free space. Minimum sizes can still stop it from shrinking further.

### 10. What is flex-basis used for?

- **A.** The starting main size before free space is distributed
- **B.** The final border color
- **C.** The distance between flex lines
- **D.** The source order

**Answer: A.** flex-basis provides the starting size for the flexible sizing calculation. It is not necessarily the final size.

### 11. Which property distributes remaining free space on the main axis?

- **A.** align-items
- **B.** justify-content
- **C.** align-content
- **D.** align-self

**Answer: B.** justify-content distributes main-axis free space after sizing and auto-margin resolution.

### 12. Which property aligns individual items on the cross axis?

- **A.** align-items
- **B.** flex-basis
- **C.** flex-wrap
- **D.** order

**Answer: A.** align-items sets the default cross-axis alignment for flex items. align-self can override it for an individual item.

## True or false

### 13. flex-direction: row always means left to right.

**Answer: False.** row follows the inline direction. Direction and writing mode determine which physical side is inline-start.

### 14. flex-direction: column uses the block axis as its main axis.

**Answer: True.** The column direction follows the block flow direction of the current writing mode.

### 15. A flex container uses flex-wrap: nowrap by default.

**Answer: True.** Items remain on a single line by default and may overflow if they cannot fit.

### 16. Changing an item's order changes its DOM position and keyboard navigation position.

**Answer: False.** order affects visual layout, but the HTML source order and sequential keyboard order remain based on the document structure.

### 17. An auto margin on a flex item can absorb positive free space before justify-content distributes it.

**Answer: True.** Auto margins are resolved before main-axis content distribution and can push items apart.

### 18. align-content is the property for aligning items within each flex line.

**Answer: False.** align-items aligns items within a line. align-content distributes multiple flex lines within the container.

### 19. Floats and clear are layout tools for positioning flex items inside a flex container.

**Answer: False.** float and clear do not take a flex item out of flex layout. Use flex properties to position flex items.

### 20. A flex item can refuse to shrink because of its automatic minimum size.

**Answer: True.** Content-based automatic minimum sizes can keep an item larger than expected. Inspect the item's min-size and its contents.

## Short-answer questions

### 21. What is a flex container?

**Answer:** It is an element whose display value is flex or inline-flex and whose in-flow children are laid out as flex items.

### 22. What is a flex item?

**Answer:** A flex item is a box representing an in-flow direct child of a flex container. A direct text sequence can also be wrapped in an anonymous flex item.

### 23. What are the main and cross axes?

**Answer:** The main axis is the direction items are laid out. The cross axis is perpendicular to it.

**Explanation:** flex-direction and the writing mode determine how these axes map to physical directions.

### 24. What is the difference between flex-direction and flex-wrap?

**Answer:** flex-direction chooses the main-axis direction. flex-wrap chooses whether items stay on one line or can form additional lines.

### 25. What does the flex shorthand control?

**Answer:** It combines an item's grow factor, shrink factor, and basis.

**Explanation:** These determine how the item starts and how it can use or give up free space.

### 26. Why can equal flex-grow factors produce items with different final sizes?

**Answer:** Items may start with different bases or have different minimum and maximum constraints.

**Explanation:** Equal grow factors divide positive free space proportionally, but they do not erase the effect of every other sizing constraint.

### 27. Why does flex-shrink not always prevent overflow?

**Answer:** An item's minimum size, intrinsic content, fixed dimensions, or unbreakable text can prevent it from shrinking enough.

**Explanation:** Inspect the item and its descendants. A targeted min-inline-size or wrapping rule may be needed.

### 28. What does flex-basis: auto usually use as its starting point?

**Answer:** It uses the item's main-size property when specified. Otherwise, content-based sizing applies.

### 29. What is the difference between align-items and align-self?

**Answer:** align-items sets the container's default cross-axis alignment for its items. align-self overrides that alignment for one item.

### 30. What does align-content align?

**Answer:** It distributes flex lines along the cross axis when the container has multiple lines and extra cross-axis space.

### 31. How can an auto margin help in a toolbar?

**Answer:** An auto margin can absorb positive free space and push one item away from the other items, such as placing an account action at the end.

### 32. When is Grid a better choice than Flexbox?

**Answer:** Grid is often a better choice when the layout needs coordinated rows and columns, such as a card collection with shared tracks.

**Explanation:** Flexbox is suited to a one-dimensional group, even when that group wraps onto multiple independent lines.

## Read the CSS

### 33. Where are the items placed by this rule?

~~~css
.list {
  display: flex;
  flex-direction: column;
}
~~~

**Answer:** Items are placed along the block axis. In a common horizontal writing mode, they form a vertical stack.

### 34. What happens when these items do not fit on one line?

~~~css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
~~~

**Answer:** The items form additional flex lines as needed, and there is a 0.5rem gap between items and between lines.

### 35. What does flex: 1 1 16rem mean?

~~~css
.search {
  flex: 1 1 16rem;
}
~~~

**Answer:** The item can grow, can shrink, and starts from a 16rem flex basis. Its final main size depends on available space and constraints.

### 36. What is the effect of this auto margin?

~~~css
.nav {
  display: flex;
  gap: 1rem;
}

.nav__account {
  margin-inline-start: auto;
}
~~~

**Answer:** Positive free space is absorbed before the account item at its inline-start margin, pushing that item toward the inline-end side of the row.

### 37. Which axis is centered by each declaration?

~~~css
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
~~~

**Answer:** justify-content centers the item group on the main axis. align-items centers items on the cross axis.

### 38. Why might align-content: center appear to do nothing here?

~~~css
.list {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
~~~

**Answer:** There may be only one line or no extra cross-axis space to distribute. align-content positions flex lines, not the individual items within each line.

### 39. What problem is min-inline-size: 0 intended to address?

~~~css
.main {
  min-inline-size: 0;
}
~~~

**Answer:** It lets this item shrink below its min-content inline size when the layout requires it. This can prevent long content from forcing a row flex item wider than its container.

### 40. Why is min-block-size: 0 sometimes used in a column flex layout?

~~~css
.content {
  min-block-size: 0;
  overflow: auto;
}
~~~

**Answer:** It allows the item to shrink in the block direction so an internal scroll region can fit inside a bounded column flex layout.

### 41. Does this CSS change the HTML reading order?

~~~css
.item--first {
  order: -1;
}
~~~

**Answer:** No. It changes visual order only. The source order and linear navigation order still follow the HTML.

### 42. What is the main behavior of this shorthand?

~~~css
.toolbar {
  display: inline-flex;
  flex-flow: row wrap;
}
~~~

**Answer:** It creates an inline-level flex container whose items run along the inline direction and can wrap onto additional lines.

## Practical scenarios

### 43. A toolbar needs items to wrap on narrow screens and keep consistent spacing. What is a suitable rule?

**Answer:** Use a wrapping flex container with a gap.

~~~css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
}
~~~

**Explanation:** The items can form additional lines when space is limited. The source order remains the natural navigation order.

### 44. A dialog panel's contents need to be centered horizontally and vertically. What is a simple Flexbox solution?

**Answer:** Set the main-axis and cross-axis alignment to center.

~~~css
.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  min-block-size: 20rem;
}
~~~

**Explanation:** This centers the child group within the available main and cross dimensions.

### 45. A three-column card collection should form shared rows and columns. Should it use Flexbox or Grid?

**Answer:** Grid is generally the clearer fit.

~~~css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}
~~~

**Explanation:** Grid defines coordinated tracks for a two-dimensional collection. A wrapping flex container would lay out each line independently.

### 46. A bounded vertical panel needs its content area to scroll internally. What two things should you check?

**Answer:** Give the panel an available block size and allow the intended flex item to shrink with min-block-size: 0. Then set overflow on the content region.

~~~css
.panel {
  display: flex;
  flex-direction: column;
  block-size: 30rem;
}

.panel__content {
  min-block-size: 0;
  overflow: auto;
}
~~~

**Explanation:** Without a bounded size or a zero minimum block size, the content item may expand instead of becoming a scroll region.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [25 - Floats and Clearing](25-floats-and-clear.md) | [Lesson](../lessons/26-flexbox.md) | [Example](../examples/26-flexbox.md) | [27 - CSS Grid Layout](27-css-grid.md) |
