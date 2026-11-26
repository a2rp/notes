# 22 - Positioning Elements: Questions and Answers

## Multiple-choice questions

### 1. What does the CSS \`position\` property control?

- **A.** How a box is placed in the document
- **B.** The HTML meaning of an element
- **C.** The font used by the browser
- **D.** The order in which files load

**Answer: A.** The \`position\` property selects a positioning scheme. Insets such as \`top\` or \`inset-inline-start\` can then offset a positioned box.

### 2. Which value is the default for \`position\`?

- **A.** \`absolute\`
- **B.** \`static\`
- **C.** \`relative\`
- **D.** \`sticky\`

**Answer: B.** Elements use \`position: static\` by default and are placed according to normal flow or their layout model.

### 3. What happens to an element with \`position: static\` when \`top: 1rem\` is also declared?

- **A.** The element moves down by one rem.
- **B.** The element becomes fixed.
- **C.** The \`top\` inset does not offset it.
- **D.** Its parent becomes positioned.

**Answer: C.** Static boxes are not positioned boxes, so inset properties do not move them.

### 4. What happens to the original layout space of a relatively positioned element?

- **A.** It is removed.
- **B.** It remains reserved.
- **C.** It is given to the next sibling.
- **D.** It becomes a margin.

**Answer: B.** Relative positioning offsets the box visually after its normal placement. Its original space remains in the flow.

### 5. Which statement best describes an absolutely positioned element?

- **A.** It always remains in normal flow.
- **B.** It is removed from normal flow and positioned against a containing block.
- **C.** It is always positioned against the viewport.
- **D.** It can only be used inside a grid.

**Answer: B.** Absolute positioning removes the box from normal flow. Its containing block is usually established by an ancestor, but can be established by other properties too.

### 6. Which ancestor usually establishes the containing block for an absolutely positioned child?

- **A.** The nearest ancestor that establishes an absolute-positioning containing block, often one with a non-static position
- **B.** Always the first child in the document
- **C.** Always the viewport
- **D.** The nearest heading

**Answer: A.** A common pattern is to give a component wrapper \`position: relative\` and place an absolute child inside it. Other CSS features can also establish containing blocks.

### 7. What does \`position: fixed\` usually use as its containing block?

- **A.** The nearest paragraph
- **B.** The initial containing block, commonly aligned with the viewport
- **C.** The previous sibling
- **D.** The nearest float

**Answer: B.** Fixed boxes are usually placed relative to the viewport. Some ancestor properties, such as transforms, can establish a different containing block.

### 8. Which statement about \`position: sticky\` is accurate?

- **A.** It is removed from normal flow as soon as the page loads.
- **B.** It behaves like relative positioning until a scroll threshold, then sticks within its containing block.
- **C.** It is always fixed to the viewport.
- **D.** It only works on inline elements.

**Answer: B.** A sticky box keeps its flow space and can shift relative to its scrollport while remaining constrained by its containing block.

### 9. What does a sticky element need in the relevant axis to have a sticking threshold?

- **A.** A non-auto inset such as \`top: 0\` or \`inset-block-start: 0\`
- **B.** A negative margin
- **C.** \`float: left\`
- **D.** \`display: none\`

**Answer: A.** Without a non-auto inset on an axis, sticky positioning has no threshold to stick against on that axis.

### 10. Which inset is most useful for placing a badge at the top-right of a component in a left-to-right horizontal writing mode?

- **A.** \`top: 0; right: 0;\`
- **B.** \`bottom: 0; left: 0;\`
- **C.** \`inset-inline-start: 0; inset-block-end: 0;\`
- **D.** \`margin: auto;\`

**Answer: A.** In a left-to-right horizontal writing mode, \`top\` and \`right\` describe the physical top and right edges. Logical insets are useful when the component should adapt to writing direction or writing mode.

### 11. What does \`inset-inline-start\` refer to?

- **A.** Always the physical left edge
- **B.** The start edge of the inline axis for the current writing direction
- **C.** Always the physical top edge
- **D.** The center of the containing block

**Answer: B.** Logical insets follow the writing mode and direction. In common horizontal left-to-right text, inline-start is the left edge, but this can change.

### 12. What does \`inset: 0\` set?

- **A.** All four physical insets to zero
- **B.** Only the top inset to zero
- **C.** All margins to zero
- **D.** The element's width and height to zero

**Answer: A.** The \`inset\` shorthand sets top, right, bottom, and left. For example, an absolutely positioned box with \`inset: 0\` is positioned against all four sides of its containing block.

### 13. Why might a fixed child scroll with a transformed ancestor instead of staying attached to the viewport?

- **A.** A transform can establish a containing block for fixed-positioned descendants.
- **B.** Fixed elements always inherit the parent's margins.
- **C.** A transform changes fixed positioning into float positioning.
- **D.** The browser disables all fixed positioning inside components.

**Answer: A.** A transformed ancestor can establish the containing block used by a fixed descendant, changing the reference box from the viewport to that ancestor.

### 14. Which statement about an absolutely positioned element and its siblings is usually true?

- **A.** It reserves the same normal-flow space as a block sibling.
- **B.** It does not reserve normal-flow space, so siblings are laid out as if it were absent.
- **C.** It forces every sibling to become absolute.
- **D.** It changes the document source order.

**Answer: B.** Absolute positioning takes the box out of flow. Its visual overlap with nearby content may need to be handled in the design.

### 15. Which CSS is a common pattern for placing an icon in a card corner?

- **A.** Give the card \`position: relative\` and the icon \`position: absolute\`
- **B.** Give the card \`position: static\` and the icon \`float: fixed\`
- **C.** Give the icon \`position: sticky\` and the card \`display: none\`
- **D.** Give both elements \`position: static\` and set \`top\`

**Answer: A.** The card becomes the icon's containing block, and the icon can be positioned against the card rather than the page.

## True or false

### 16. \`position: static\` is the initial positioning value for ordinary elements.

**Answer: True.** Static positioning is the default. The box still participates in its normal layout model.

### 17. A relatively positioned element loses its original space in normal flow.

**Answer: False.** Relative positioning keeps that space. The box's rendered position can be offset, which may cause it to overlap other content.

### 18. An absolutely positioned element is normally removed from flow.

**Answer: True.** It does not take up normal-flow space like an in-flow block. Its containing block and inset values determine its position.

### 19. An absolutely positioned element is always positioned relative to the viewport.

**Answer: False.** It uses its containing block. A suitable ancestor often establishes that containing block.

### 20. A fixed element is always attached to the viewport, regardless of its ancestors.

**Answer: False.** It is usually viewport-relative, but some ancestor properties, including transforms, can establish a containing block for fixed descendants.

### 21. A sticky element keeps its place in normal flow.

**Answer: True.** It retains its flow space while its rendered position can shift within the sticky constraints.

### 22. A sticky element with all relevant insets set to \`auto\` has a threshold at which it must stick.

**Answer: False.** It needs a non-auto inset on the axis where sticking is expected.

### 23. Sticky positioning can be limited by the sticky element's containing block.

**Answer: True.** A sticky element cannot move beyond the boundary of its containing block.

### 24. A sticky element always uses the viewport as its scrollport.

**Answer: False.** Sticky positioning is tied to the nearest scrollport. An ancestor with scrolling overflow can affect which scrollport is used, even if that ancestor does not visibly scroll in the expected way.

### 25. Logical inset properties always mean the same physical edges in every writing mode.

**Answer: False.** Logical properties refer to block and inline axes. Their physical edges depend on writing mode and direction.

### 26. Changing \`z-index\` is the main way to choose the containing block for an absolute child.

**Answer: False.** The containing block is determined by layout and positioning rules. Stacking and paint order are related but separate topics.

## Short-answer questions

### 27. What is a containing block?

**Answer:** It is the reference box used to resolve the position and often the size of a positioned descendant. For a common component pattern, a relatively positioned wrapper establishes the containing block for an absolutely positioned child.

### 28. How do relative and absolute positioning differ in normal flow?

**Answer:** A relatively positioned element is laid out in flow first and keeps its original space when offset. An absolutely positioned element is out of flow and does not reserve that space.

### 29. Give one appropriate use for relative positioning.

**Answer:** Use it to make a small visual adjustment while preserving the element's place in the layout, or to establish a containing block for an absolutely positioned descendant.

### 30. Give one appropriate use for absolute positioning.

**Answer:** Use it for a badge, icon, or overlay that belongs to a component and should be placed against that component without taking up normal-flow space. The component commonly establishes the containing block with \`position: relative\`.

### 31. Why can an absolutely positioned child overlap nearby content?

**Answer:** It is removed from normal flow, so surrounding in-flow content is laid out without reserving a place for it. The author must ensure the overlay does not obscure important content or controls.

### 32. When is fixed positioning useful?

**Answer:** It can be useful for an interface control that should remain in a viewport-relative location while the page scrolls, such as a persistent help button. It should not cover content or interfere with keyboard and touch interaction.

### 33. What is the difference between fixed and sticky positioning during scrolling?

**Answer:** A fixed box is normally positioned against the viewport or another fixed containing block and is out of flow. A sticky box remains in flow and sticks relative to a scrollport after reaching an inset threshold, subject to its containing block.

### 34. Why might \`position: sticky\` appear not to work?

**Answer:** Check that a non-auto inset is set on the intended axis, that the box has room to move, and that the intended scroll container is actually the nearest scrollport. Also check whether the containing block is too short or a parent overflow setting changes the scrollport.

### 35. When should logical insets be preferred over physical insets?

**Answer:** Prefer logical insets when the layout should adapt to writing direction or writing mode. For example, \`inset-inline-end\` stays at the inline end even when that edge is not the physical right side.

### 36. Why should a component often establish its own containing block for an overlay?

**Answer:** It keeps the overlay positioned relative to the component that owns it. If there is no suitable local containing block, the overlay may instead be positioned relative to a more distant ancestor or the initial containing block.

### 37. Is \`position: relative\` required to use \`z-index\`?

**Answer:** Not in every case. The interaction of \`z-index\` with positioning, flex, grid, and stacking contexts has additional rules. This chapter focuses on placement; stacking order is covered in the next chapter.

## Read the CSS

### 38. Does this declaration move the element?

~~~css
.notice {
  position: static;
  top: 1rem;
}
~~~

**Answer: No.** The element is static, so the inset does not offset it. Use a positioning scheme that supports insets if a visual offset is intended.

### 39. Does the paragraph move up to fill the badge's former place?

~~~css
.badge {
  position: relative;
  top: -0.5rem;
}
~~~

**Answer: No.** The badge keeps its original flow space. Its rendered box is shifted upward, and that shift can cause overlap.

### 40. Against which box is the badge positioned in this example?

~~~css
.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
~~~

**Answer:** The badge is positioned against the card's containing block. The card's relative positioning makes it the intended local reference in this common pattern.

### 41. Does this overlay reserve space for later content?

~~~css
.dialog-layer {
  position: absolute;
  inset: 0;
}
~~~

**Answer: No.** The layer is out of normal flow. It covers the inset area of its containing block but does not push later content away.

### 42. What should you check if this sticky header never sticks?

~~~css
.header {
  position: sticky;
}
~~~

**Answer:** Add a non-auto inset on the intended axis, such as \`top: 0\` or \`inset-block-start: 0\`. Then check the nearest scrollport and the containing block's height.

### 43. Why can this fixed button move with the panel?

~~~css
.panel {
  transform: translateZ(0);
}

.help-button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
~~~

**Answer:** The transform can establish a containing block for fixed descendants. The button may then be positioned relative to the panel rather than the viewport.

### 44. What edge does \`inset-inline-end\` select?

~~~css
.label {
  position: absolute;
  inset-inline-end: 0;
}
~~~

**Answer:** It selects the end edge of the inline axis for the current writing mode and direction. It is not guaranteed to mean the physical right edge.

### 45. Does this fixed element keep normal-flow space in the document?

~~~css
.skip-control {
  position: fixed;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
}
~~~

**Answer: No.** Fixed positioning takes the element out of normal flow. Its location is governed by its fixed-position containing block.

### 46. What does this shorthand do for an absolutely positioned element?

~~~css
.overlay {
  position: absolute;
  inset: 0;
}
~~~

**Answer:** It sets the top, right, bottom, and left insets to zero. If its containing block has a defined area, the overlay is positioned to all four edges of that area.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [21 - Normal Flow and Formatting Contexts](21-normal-flow-and-formatting-contexts.md) | [Lesson](../lessons/22-positioning.md) | [Example](../examples/22-positioning.md) | [23 - Z-index and Stacking Contexts](23-z-index-and-stacking-contexts.md) |
