# 25 - Floats and Clearing: Questions and Answers

## Multiple-choice questions

### 1. What is the main purpose of a float in modern page content?

- **A.** To create an equal-width grid of cards
- **B.** To let inline content wrap beside an item such as an image
- **C.** To pin an item to the viewport
- **D.** To change the reading order

**Answer: B.** Floats are useful when prose should wrap beside an image or callout. Flexbox and Grid are better choices for page and component layouts.

### 2. What happens to inline text beside a left float?

- **A.** Its line boxes make room to the right of the float.
- **B.** It is removed from the document.
- **C.** It always appears behind the float.
- **D.** It becomes a flex item.

**Answer: A.** The line boxes are shortened where they overlap the float's vertical range, so text can flow beside it.

### 3. What is the initial value of the float property?

- **A.** left
- **B.** right
- **C.** none
- **D.** inline-start

**Answer: C.** none means the generated box is not floated.

### 4. Which value floats an item toward the start side of the inline direction?

- **A.** inline-start
- **B.** block-end
- **C.** top
- **D.** center

**Answer: A.** inline-start is flow-relative. Its physical side depends on the containing block's writing mode and direction.

### 5. Which part of a float does inline content flow around?

- **A.** Its content box only
- **B.** Its margin box
- **C.** Its text baseline only
- **D.** Its parent's border box

**Answer: B.** The float's margin box occupies the wrapping area. Its width, borders, padding, and margins all affect the available space.

### 6. How do ordinary block boxes generally behave beside a float in the same block formatting context?

- **A.** They all become inline boxes.
- **B.** Their block layout proceeds as if the float were not there, so they may paint behind it.
- **C.** They are always pushed below it.
- **D.** They become grid items.

**Answer: B.** Line boxes make room for floats, while ordinary block boxes do not wrap around them like text does.

### 7. What can happen when two floats do not fit beside each other?

- **A.** They overlap automatically.
- **B.** The later float can move down.
- **C.** The containing block becomes a grid.
- **D.** The later float disappears.

**Answer: B.** A float moves down when there is insufficient inline space to fit beside earlier floats.

### 8. Which property moves a following block below earlier floats?

- **A.** clear
- **B.** float
- **C.** z-index
- **D.** vertical-align

**Answer: A.** clear introduces clearance when needed to put the block below floats on its selected side.

### 9. What does clear: both request?

- **A.** Clear both the top and bottom margins.
- **B.** Move below earlier left and right floats.
- **C.** Contain floats inside the element.
- **D.** Remove all floats from the page.

**Answer: B.** clear: both applies to floats on both physical sides. It does not make the element's parent contain floats.

### 10. Which value is a direct way to make a normal block wrapper contain its floats?

- **A.** display: flow-root
- **B.** position: static
- **C.** float: none
- **D.** visibility: hidden

**Answer: A.** flow-root establishes a block formatting context, which contains its floats without adding clipping or scrolling behavior.

### 11. Why should overflow: hidden not be used as a general-purpose clearfix?

- **A.** It always creates a grid.
- **B.** It may clip content such as focus rings or menus.
- **C.** It disables text wrapping.
- **D.** It changes the HTML source order.

**Answer: B.** overflow: hidden has clipping behavior. Use overflow for its intended effect and flow-root when float containment is the goal.

### 12. Which layout is generally the best fit for two responsive cards?

- **A.** Floats with fixed widths
- **B.** A series of clear declarations
- **C.** Flexbox or Grid
- **D.** Absolute positioning

**Answer: C.** Flexbox and Grid model relationships between layout items directly and adapt more predictably to available space.

## True or false

### 13. A float is removed from normal flow for the placement of ordinary block boxes.

**Answer: True.** It does not reserve its normal-flow block position in the same way as an ordinary block. Inline content still makes room for it.

### 14. Text can wrap beside a float and continue below it.

**Answer: True.** Line boxes are shortened while they overlap the float's vertical range. After passing the float, later lines can use the full width.

### 15. clear makes a parent include a floated child in its automatic height.

**Answer: False.** clear moves the element on which it is set below earlier floats. A formatting context such as flow-root is used to contain floats in a parent.

### 16. A float can overlap another float in the same block formatting context.

**Answer: False.** Floats in the same block formatting context are positioned without overlapping each other's outer edges.

### 17. A floated element must have a declared width.

**Answer: False.** A width is not always required, but an explicit width often makes image and callout wrapping more predictable. An auto width uses shrink-to-fit sizing in the applicable float sizing rules.

### 18. float: inline-start always means float: left.

**Answer: False.** Its physical mapping follows the containing block's writing mode. In a right-to-left horizontal context, inline-start maps to the right.

### 19. display: flow-root can contain floats without clipping overflow.

**Answer: True.** It establishes a block formatting context directly and does not itself add clipping or scrolling.

### 20. Applying float to a flex item makes that item wrap nearby text as it would in ordinary block flow.

**Answer: False.** float and clear do not take a flex item out of the flex layout or create float wrapping for it.

## Short-answer questions

### 21. How are clearing and containing different?

**Answer:** Clearing moves a particular following block below selected preceding floats. Containing makes the parent account for floated children in its own formatting context and height.

**Explanation:** Use clear on the block that must start below a float. Use display: flow-root on a wrapper that must enclose its floats.

### 22. Why can a parent with only floated children appear to have no height?

**Answer:** Floats are out of normal flow for ordinary block sizing, so they may not contribute to the parent's automatic height.

**Explanation:** Give the parent a float-containing formatting context, commonly with display: flow-root.

### 23. What is clearance?

**Answer:** Clearance is the extra space introduced by clear when needed to move a box below the relevant float.

**Explanation:** The cleared box's top border edge is placed below the bottom outer edge of the float it must clear.

### 24. Which floats does clear consider?

**Answer:** It considers earlier relevant floats in the same block formatting context.

**Explanation:** A float in another block formatting context is isolated from the clear operation.

### 25. What does a float's margin do to surrounding text?

**Answer:** The margin contributes to the float's outer wrapping area and creates space between the float and nearby inline content.

### 26. What is the difference between left and inline-start?

**Answer:** left names a physical side. inline-start names a flow-relative side that follows the containing block's writing mode and direction.

### 27. When should you choose a float over Flexbox or Grid?

**Answer:** Choose a float when inline prose should wrap alongside an image or small callout. Choose Flexbox or Grid for rows, columns, card collections, navigation, and page structure.

### 28. What is the clearfix pseudo-element pattern for?

**Answer:** It adds a generated block after content and clears both sides so an older-style parent encloses its floats.

~~~css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
~~~

**Explanation:** It is still useful to recognize in existing stylesheets. For a new normal-flow wrapper, display: flow-root usually expresses the intent more directly.

### 29. Why can overflow: auto used as a clearfix cause an unwanted change?

**Answer:** It may create a scroll container and show scrollbars when content overflows.

**Explanation:** overflow: auto is appropriate when scrolling is wanted. Use flow-root when the only requirement is to establish a block formatting context.

### 30. How does a float's width affect its placement?

**Answer:** Its width, padding, border, and margins use available inline space. If a float does not fit beside existing floats, it may move down.

### 31. Does clear: both clear floats in a different block formatting context?

**Answer:** No. clear only considers relevant earlier floats in the same block formatting context.

### 32. How should float styles respond to narrow screens?

**Answer:** Reduce the floated item's size or remove its float at a suitable breakpoint, then let it use the full available width if that improves readability.

## Read the CSS

### 33. Which side does this image use in a left-to-right horizontal writing mode?

~~~css
img {
  float: inline-start;
}
~~~

**Answer:** The left side. In that writing mode, inline-start maps to the left. The same rule maps to the right in a right-to-left horizontal writing mode.

### 34. What happens to the text in this paragraph?

~~~css
.article-image {
  float: left;
  inline-size: 10rem;
  margin-inline-end: 1rem;
}
~~~

**Answer:** Inline text can occupy the space to the right of the image, with a margin gap. Lines continue at the full width below the image.

### 35. Does this heading make the parent contain its floated image?

~~~css
.heading {
  clear: both;
}
~~~

**Answer:** No. The heading moves below earlier left and right floats when needed. To contain a floated image in its parent, establish a formatting context on the parent, such as display: flow-root.

### 36. Why may the second box move to the next line?

~~~css
.one,
.two {
  float: left;
  inline-size: 48%;
  margin-inline-end: 2%;
}
~~~

**Answer:** The combined widths and margins can exceed the containing block's available inline size. Floats that cannot fit beside earlier floats may move down.

### 37. What is the effect of this declaration on a flex item?

~~~css
.toolbar {
  display: flex;
}

.toolbar__item {
  float: left;
}
~~~

**Answer:** float does not make the flex item wrap text or leave the flex layout. Use Flexbox properties to position this item within the toolbar.

### 38. How does this rule affect a float-only wrapper?

~~~css
.gallery {
  display: flow-root;
}
~~~

**Answer:** The wrapper establishes a block formatting context and contains its floats, so its height includes them.

### 39. What risk does this wrapper introduce?

~~~css
.card {
  overflow: hidden;
}
~~~

**Answer:** It clips overflow, which can cut off content, shadows, menus, or focus indicators. If the purpose is only to contain a float, use display: flow-root.

### 40. What is the responsive effect of this rule?

~~~css
@media (max-width: 36rem) {
  .article-image {
    float: none;
    inline-size: 100%;
  }
}
~~~

**Answer:** At that breakpoint, the image stops floating and becomes full width. Text then begins below it instead of wrapping beside a narrow image.

### 41. Does the following rule change the reading order?

~~~css
.portrait {
  float: right;
}
~~~

**Answer:** No. A float changes visual layout, not DOM order. Assistive technology and keyboard navigation still follow the document structure.

### 42. What problem does clear: inline-start solve?

~~~css
.footer {
  clear: inline-start;
}
~~~

**Answer:** It moves the footer below relevant earlier floats on the inline-start side. The physical side depends on the containing block's writing mode.

## Practical scenarios

### 43. An article image should sit beside prose, then let the prose fill the width below it. Which layout technique fits?

**Answer:** Float the image and give it a deliberate inline size and margin.

~~~css
.article-image {
  float: inline-start;
  inline-size: min(40%, 16rem);
  margin-inline-end: 1rem;
  margin-block-end: 0.75rem;
}
~~~

**Explanation:** The text is inline content, which can wrap around the float. At narrow widths, remove the float if the text column becomes too small.

### 44. A parent border does not surround its floated child. What is a direct fix?

**Answer:** Establish a formatting context on the parent.

~~~css
.figure {
  display: flow-root;
  border: 1px solid currentColor;
}
~~~

**Explanation:** The parent now encloses the float. This is a containment fix, while clear would move a following block below it.

### 45. A heading below a floated callout must begin after the callout. What should the heading use?

**Answer:** Use an appropriate clear value, such as clear: both when it must pass both left and right floats.

~~~css
.next-section {
  clear: both;
}
~~~

**Explanation:** The heading is moved below relevant earlier floats. This does not establish float containment on an ancestor.

### 46. A layout uses floats to make a three-column card grid. What is a better approach?

**Answer:** Use Grid for a two-dimensional card collection, or Flexbox when the items form a one-dimensional row or column.

~~~css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}
~~~

**Explanation:** Grid expresses the columns and gap directly and adapts to available space without float clearing rules.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [24 - Overflow and Scrolling](24-overflow-and-scrolling.md) | [Lesson](../lessons/25-floats-and-clear.md) | [Example](../examples/25-floats-and-clear.md) | [26 - Flexbox Layout](26-flexbox.md) |
