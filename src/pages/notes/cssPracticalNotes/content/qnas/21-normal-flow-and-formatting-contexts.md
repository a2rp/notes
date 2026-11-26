# 21 - Normal Flow and Formatting Contexts: Questions and Answers

## Multiple-choice questions

### 1. What is normal flow?

- **A.** The default layout of in-flow boxes using block and inline formatting
- **B.** A way to remove elements from the page
- **C.** A synonym for Grid
- **D.** A method for changing HTML semantics

**Answer: A.** Normal flow places in-flow boxes according to their formatting contexts and display types.

### 2. How are block-level boxes usually arranged in a block formatting context?

- **A.** Horizontally in one row
- **B.** Vertically, one after another
- **C.** In a fixed grid
- **D.** Outside the containing block

**Answer: B.** Block boxes in a BFC are generally laid out vertically in source order.

### 3. What does an inline formatting context arrange?

- **A.** Floated boxes only
- **B.** Text and inline-level boxes into line boxes
- **C.** Grid tracks
- **D.** Absolutely positioned boxes

**Answer: B.** An IFC places text and inline boxes along lines, wrapping content when it does not fit.

### 4. Which declaration directly establishes a new block formatting context while retaining block flow inside?

- **A.** `display: flow-root`
- **B.** `display: inline`
- **C.** `position: static`
- **D.** `clear: none`

**Answer: A.** `flow-root` explicitly creates a BFC for the element's contents.

### 5. What is one useful effect of a BFC root around a floated child?

- **A.** It changes the float into an inline element.
- **B.** It can include the float when calculating the root's height.
- **C.** It makes the float fixed to the viewport.
- **D.** It removes the float from the document.

**Answer: B.** Floats are out of normal flow, but a BFC root contains its floated descendants for its own height calculation.

### 6. What happens to adjacent vertical block margins that collapse within the same BFC?

- **A.** They always add together.
- **B.** They may combine into one shared margin.
- **C.** They become padding.
- **D.** They are ignored in every case.

**Answer: B.** Under the margin-collapsing conditions, adjoining vertical margins combine rather than simply adding.

### 7. What does `clear: both` ask a block to do?

- **A.** Move below relevant earlier left and right floats
- **B.** Hide all inline content
- **C.** Start a new stacking context
- **D.** Remove every float from the document

**Answer: A.** Clearance moves the block below earlier floats on both sides when needed.

### 8. How does a float affect inline content in the same BFC?

- **A.** Inline content can flow alongside the float.
- **B.** Inline content is removed.
- **C.** Inline content always appears behind the float.
- **D.** Inline content moves to a new document.

**Answer: A.** Line boxes can become narrower beside a float, allowing text to wrap around it.

### 9. What does `position: relative` do to the box's original normal-flow space?

- **A.** It removes the space.
- **B.** It keeps the space reserved while the box can be visually offset.
- **C.** It makes the box a float.
- **D.** It moves every sibling with it.

**Answer: B.** Relative positioning offsets the rendered box after normal placement; its original space remains in the layout.

### 10. Which statement about `overflow: clip` and BFCs is accurate?

- **A.** `overflow: clip` always establishes a BFC.
- **B.** `overflow: clip` by itself does not establish a BFC.
- **C.** `overflow: clip` changes display to Grid.
- **D.** `overflow: clip` adds a float.

**Answer: B.** Unlike `overflow: hidden` or `auto` in common block formatting cases, `overflow: clip` does not establish a BFC by itself.

### 11. What kind of formatting context does a Flexbox container establish for its children?

- **A.** An inline formatting context
- **B.** A flex formatting context
- **C.** A table formatting context
- **D.** No formatting context

**Answer: B.** Flex containers lay out their children using Flexbox's own formatting context.

### 12. Does a BFC automatically create a stacking context?

- **A.** Yes, always
- **B.** No
- **C.** Only when it has text
- **D.** Only when it has a margin

**Answer: B.** A BFC controls layout interactions. It does not by itself define stacking and paint order.

### 13. Which CSS value is usually the clearest choice when the goal is only to contain a float?

- **A.** `display: flow-root`
- **B.** `overflow: hidden`
- **C.** `position: fixed`
- **D.** `display: none`

**Answer: A.** `flow-root` expresses the formatting-context goal without also asking to clip content or create scrolling behavior.

### 14. What happens to an ordinary block's line boxes beside a left float?

- **A.** They may become narrower beside the float.
- **B.** They always overlap the float.
- **C.** They are removed.
- **D.** They become flex items.

**Answer: A.** Inline line boxes can make room for the float, even though the ordinary block box itself is laid out as if the float did not occupy normal-flow space.

### 15. Which statement best describes a formatting context?

- **A.** A set of layout rules governing how boxes interact
- **B.** A type of HTML heading
- **C.** A CSS color space
- **D.** A browser extension

**Answer: A.** Formatting contexts define how groups of boxes are laid out and interact with one another.

## True or false

### 16. Floats take up normal-flow space in the same way as ordinary block siblings.

**Answer: False.** A float is taken out of normal flow, although inline content can wrap beside it.

### 17. A float can affect the width of nearby line boxes.

**Answer: True.** Line boxes beside the float may be shortened so their inline content fits around it.

### 18. A plain block's automatic height always includes its floated children.

**Answer: False.** Floats are out of flow. A BFC root, such as one created with `display: flow-root`, can contain floats for its height calculation.

### 19. A BFC can keep a child's top margin from collapsing through its root.

**Answer: True.** The BFC boundary prevents its in-flow child margins from collapsing through the root.

### 20. The outside margins of a BFC root can never collapse with sibling margins in its parent.

**Answer: False.** The root's own outer margins can still interact with adjacent siblings under the usual margin rules in the parent context.

### 21. A relative-positioned box keeps its original normal-flow space.

**Answer: True.** Its rendered location can be offset, but its original position remains reserved.

### 22. An absolutely positioned box remains in normal flow and pushes later siblings away.

**Answer: False.** An absolutely positioned box is out of flow and does not reserve space as an ordinary in-flow sibling.

### 23. `overflow: hidden` can establish a BFC on a block box in common layout contexts.

**Answer: True.** It is a traditional way to establish a BFC, but it can also clip overflowing content.

### 24. Flexbox and Grid containers establish their own formatting contexts for their children.

**Answer: True.** Their children are laid out by the Flexbox or Grid formatting model.

### 25. A formatting context changes the HTML semantics of its children.

**Answer: False.** Formatting contexts control layout interactions, not the document meaning of elements.

## Short-answer questions

### 26. What does a block formatting context do?

**Answer:** It lays out block boxes vertically and defines layout interactions for the boxes in that context, including how floats and vertical margins interact.

### 27. What does an inline formatting context do?

**Answer:** It arranges text and inline-level boxes into line boxes, wrapping content when needed.

### 28. Why is `display: flow-root` useful?

**Answer:** It creates a new BFC for an element's contents while keeping ordinary block flow. It is useful for containing floats and isolating child margin behavior without using overflow as a side effect.

### 29. What happens when text shares a BFC with a float?

**Answer:** The text's line boxes can become shorter beside the float, so the text flows around the float.

### 30. What is the purpose of `clear`?

**Answer:** It moves a block below earlier floats on the specified side or sides when necessary.

### 31. How does a BFC root affect its floated descendants?

**Answer:** The root contains its floated descendants for its own height calculation, so its box can extend around them.

### 32. Can the BFC root's own outer margins still collapse with neighboring blocks?

**Answer: Yes.** Those margins participate in the parent context. The BFC boundary isolates the root's in-flow child margins, not every outer margin interaction.

### 33. Why can `overflow: hidden` be a poor float-containment hack?

**Answer:** In addition to establishing a BFC, it can clip content such as shadows or menus. `overflow: auto` may create scrollbars. Use `display: flow-root` when that is the intended layout behavior.

### 34. What is the difference between relative positioning and absolute positioning in relation to normal flow?

**Answer:** A relatively positioned box is placed in normal flow first, and its original space stays reserved when it is offset. An absolutely positioned box is removed from normal flow and does not reserve that space.

### 35. How is a BFC different from a stacking context?

**Answer:** A BFC controls layout interactions such as block flow and float containment. A stacking context controls paint ordering. Creating a BFC does not automatically create a stacking context.

## Read the CSS

### 36. What happens to the wrapper's height?

~~~css
.wrapper {
  display: flow-root;
}

.wrapper img {
  float: left;
  width: 10rem;
}
~~~

**Answer:** The wrapper's BFC contains the floated image for its height calculation, so the wrapper can extend around the image.

### 37. Will the paragraphs' adjacent margins necessarily add up to 3rem?

~~~css
.first {
  margin-bottom: 2rem;
}

.second {
  margin-top: 1rem;
}
~~~

**Answer: No.** If they are adjoining in-flow block siblings in the same BFC, the vertical margins can collapse to a 2rem gap.

### 38. What does this clearing rule do?

~~~css
.footer {
  clear: both;
}
~~~

**Answer:** It moves the footer below relevant earlier left and right floats if they would otherwise overlap its position.

### 39. Does this relative offset remove the box from normal flow?

~~~css
.badge {
  position: relative;
  top: 8px;
}
~~~

**Answer: No.** The badge is visually shifted down, but its original space remains reserved.

### 40. Can the text wrap beside this float?

~~~css
.figure {
  float: left;
  width: 12rem;
  margin-right: 1rem;
}
~~~

**Answer: Yes.** Inline content in the same BFC can wrap beside the float, with line boxes narrowed as needed.

### 41. Does this wrapper necessarily establish a BFC?

~~~css
.wrapper {
  overflow: clip;
}
~~~

**Answer: No.** `overflow: clip` alone does not establish a BFC. Use `display: flow-root` when a new BFC is the intended result.

### 42. What is the purpose of this declaration?

~~~css
.card-list {
  display: grid;
}
~~~

**Answer:** It makes the element a Grid container and lays out its children using the Grid formatting context, rather than a BFC.

### 43. Will this BFC wrapper's child top margin collapse through the wrapper?

~~~css
.wrapper {
  display: flow-root;
}

.wrapper h2 {
  margin-top: 2rem;
}
~~~

**Answer: No.** The BFC root isolates its in-flow child margin from collapsing through the wrapper. The wrapper's own outer margins can still interact with its siblings.

### 44. Does this absolutely positioned badge reserve space for the paragraph after it?

~~~css
.badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
~~~

**Answer: No.** The badge is out of normal flow, so it does not reserve space as an ordinary in-flow sibling would.

### 45. What is different about the line boxes and the block box beside a float?

**Answer:** Line boxes can be shortened to make room for a float. The ordinary block box is generally laid out as if the float did not occupy normal-flow space, although a box that establishes a BFC must avoid overlapping the float's margin box.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [20 - Display and Box Types](20-display-and-box-types.md) | [Lesson](../lessons/21-normal-flow-and-formatting-contexts.md) | [Example](../examples/21-normal-flow-and-formatting-contexts.md) | [22 - Positioning Elements](22-positioning.md) |
