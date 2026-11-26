# 20 - Display and Box Types: Questions and Answers

## Multiple-choice questions

### 1. What does the CSS `display` property primarily control?

- **A.** An element's HTML meaning
- **B.** The boxes an element generates and how they participate in layout
- **C.** The text content of an element
- **D.** The order of the document tree

**Answer: B.** Display changes presentation and box layout. It does not change the element's role or meaning in HTML.

### 2. What does the outer display type describe?

- **A.** How a box participates in its parent's layout
- **B.** How text is colored inside a box
- **C.** Whether a box has a border
- **D.** Which HTML element generated the box

**Answer: A.** The outer display type describes the principal box's role in its surrounding layout, such as block or inline participation.

### 3. What does the inner display type describe?

- **A.** The box's margin
- **B.** How the box lays out its children
- **C.** The box's position in the DOM
- **D.** Whether the box is visible to a screen reader

**Answer: B.** The inner display type determines the layout model used for the element's contents.

### 4. Which statement best describes a block-level box in block flow?

- **A.** It always has a fixed width.
- **B.** It generally starts on a new line in its block formatting context.
- **C.** It can only contain text.
- **D.** It cannot have padding.

**Answer: B.** Block boxes are generally arranged one after another in block flow. Their exact size and placement depend on the layout context and other CSS properties.

### 5. What is the usual behavior of an inline box?

- **A.** It starts a new line before and after itself.
- **B.** It participates in line layout with text and other inline content.
- **C.** It always accepts width and height.
- **D.** It is removed from layout.

**Answer: B.** Inline boxes participate in inline formatting and can sit within a line of text.

### 6. Which display value combines inline participation outside with block flow inside?

- **A.** `inline-block`
- **B.** `block`
- **C.** `list-item`
- **D.** `none`

**Answer: A.** An inline-block participates as one atomic inline-level box and lays out its contents using block flow.

### 7. What does `display: inline-flex` mean?

- **A.** The element participates inline and its children use flex layout.
- **B.** The element is hidden and its children use flex layout.
- **C.** The element participates as a block and its children use Grid.
- **D.** The element becomes an HTML inline element.

**Answer: A.** The outer behavior is inline-level, and the inner layout model is flex.

### 8. What happens to an element and its descendants with `display: none`?

- **A.** They become transparent but keep their boxes.
- **B.** They generate no boxes and take up no layout space.
- **C.** Only the element's border disappears.
- **D.** The element keeps its space, but its text is hidden.

**Answer: B.** The `none` value removes the element and its descendant boxes from the box tree.

### 9. Which property hides an element while keeping its layout space?

- **A.** `display: none`
- **B.** `visibility: hidden`
- **C.** `position: static`
- **D.** `float: none`

**Answer: B.** A box with `visibility: hidden` is not painted as visible content, but its space remains in layout.

### 10. What happens when an element has `opacity: 0`?

- **A.** Its box and layout space remain, but it is fully transparent.
- **B.** Its descendants are removed from the box tree.
- **C.** It always becomes unfocusable.
- **D.** Its display value changes to `none`.

**Answer: A.** Zero opacity makes the element transparent, but does not remove its box or automatically disable interaction.

### 11. What does `display: contents` do to an element's principal box?

- **A.** It removes the element's box while child boxes can remain.
- **B.** It removes the element and every child box.
- **C.** It turns the element into an inline-block.
- **D.** It creates a list marker.

**Answer: A.** The element itself generates no principal box, while its children can continue participating in layout.

### 12. What does `display: list-item` generate?

- **A.** A principal box and a marker box
- **B.** Only a marker box
- **C.** A table row and table cell
- **D.** A flex container and grid container

**Answer: A.** List-item display generates a principal box plus a marker. It does not give the element HTML list semantics.

### 13. Which statement about `display: block` on a link is true?

- **A.** The link stops being an anchor.
- **B.** The link's visual layout changes, but its HTML link meaning remains.
- **C.** The link becomes a paragraph.
- **D.** The link is removed from the accessibility tree.

**Answer: B.** CSS display changes layout, not the underlying element's document semantics.

### 14. What is an anonymous box?

- **A.** A box with a generated CSS name
- **B.** A box created by layout rules without a matching HTML element
- **C.** A box that is always hidden
- **D.** A box with no parent

**Answer: B.** Layout can create anonymous boxes to make formatting structures work, even though those boxes cannot be selected as HTML elements.

### 15. What does this rule mean?

~~~css
.card {
  display: block flex;
}
~~~

- **A.** The card participates as a block, and its children use flex layout.
- **B.** The card is both block and inline at the same time.
- **C.** The card is hidden, but its children use flex layout.
- **D.** The card has block-sized flex text.

**Answer: A.** The first keyword sets the outer display type and the second sets the inner display type.

## True or false

### 16. Changing an element's display value changes the element's HTML semantics.

**Answer: False.** Display affects visual box generation and layout. HTML semantics come from the document structure and element type.

### 17. A block-level box always fills the full width of its parent.

**Answer: False.** It often fills available inline space in normal block flow, but width constraints, margins, positioning, and other layout modes can change its size.

### 18. A non-replaced inline element handles width and height like a block box.

**Answer: False.** Width and height do not size a non-replaced inline box in the same way. Use `inline-block` or another suitable layout mode when a sized box is needed.

### 19. An inline-block can appear on the same line as text.

**Answer: True.** It participates in inline flow as one atomic box, unless there is not enough space on the line.

### 20. A descendant can override an ancestor's `display: none` by setting its own display to `block`.

**Answer: False.** A `display: none` ancestor prevents its descendant boxes from being generated.

### 21. A descendant with `visibility: visible` can be visible inside a `visibility: hidden` ancestor.

**Answer: True.** Visibility can be overridden on descendants, even though the ancestor itself stays hidden.

### 22. `opacity: 0` removes an element's layout space.

**Answer: False.** Its box remains in layout. Opacity changes painting transparency, not box generation.

### 23. A list-item display value gives a generic element the HTML semantics of an `li`.

**Answer: False.** It can generate a list marker visually, but the element's semantic role comes from HTML or accessibility semantics, not the CSS display value.

### 24. Anonymous inline boxes can be generated for plain text inside a block container.

**Answer: True.** Text directly inside a block container participates in inline formatting through anonymous inline boxes.

### 25. `display: contents` removes the element from the HTML document tree.

**Answer: False.** It affects box generation, not the underlying document tree. The element remains in the DOM.

## Short-answer questions

### 26. Explain the difference between the document tree and the box tree.

**Answer:** The document tree contains HTML elements and text. The box tree describes the boxes CSS generates from that content for layout. Some elements generate no boxes, and layout can create anonymous boxes that have no matching element.

### 27. What is the difference between outer and inner display?

**Answer:** Outer display describes how the element's principal box participates in its parent's layout. Inner display describes how the element lays out its own children.

### 28. Why might `width` and `height` seem ineffective on a `span`?

**Answer:** A span is normally inline, and a non-replaced inline box does not use width and height like a block box. Changing it to `inline-block` lets it remain in inline flow while accepting box dimensions.

### 29. Why is `inline-block` called an atomic inline-level box?

**Answer:** It participates in inline flow as one unit. Its contents use block flow, but the inline formatting context treats the whole inline-block as a single box.

### 30. When would `visibility: hidden` be preferable to `display: none`?

**Answer:** Use it when content should be visually hidden while its layout space remains reserved.

### 31. Why is `opacity: 0` not a complete hiding method?

**Answer:** The element still occupies space and may still receive pointer interaction or keyboard focus. It also remains in the document and accessibility presentation.

### 32. What happens to a list marker with `display: list-item`?

**Answer:** The element generates a principal box and a marker box. The marker's appearance and placement can be styled separately.

### 33. Does using `display: table-cell` make an arbitrary element a semantic HTML table cell?

**Answer: No.** It changes its visual layout behavior. Use actual table markup for tabular data and associated headers and cells.

### 34. What are anonymous inline boxes used for?

**Answer:** They let plain text directly inside a block container participate in inline layout even when no inline HTML element wraps that text.

### 35. What should you consider before using `display: contents` on an element with a role or label?

**Answer:** The element remains in the document tree, but its box is suppressed. Check how the target browsers and assistive technologies expose its semantics before relying on it.

## Read the CSS

### 36. Does the link remain a link here?

~~~css
a {
  display: block;
}
~~~

**Answer: Yes.** It gets block-level layout behavior, but its HTML anchor semantics and link behavior remain.

### 37. How does this badge participate in layout?

~~~css
.badge {
  display: inline-block;
  width: 8rem;
  padding: 0.5rem;
}
~~~

**Answer:** It participates inline as one atomic box, and its contents use block flow. Its width and padding can size the box.

### 38. Does the hidden panel still reserve space?

~~~css
.panel {
  display: none;
}
~~~

**Answer: No.** The panel and its descendants generate no boxes, so they take up no layout space.

### 39. Does this hidden panel still reserve space?

~~~css
.panel {
  visibility: hidden;
}
~~~

**Answer: Yes.** Its box is not painted as visible content, but its layout space remains.

### 40. Can a keyboard user still reach a button with this rule?

~~~css
.button {
  opacity: 0;
}
~~~

**Answer: Potentially, yes.** The button is transparent but still has a box and may remain focusable and interactive. Opacity alone does not disable it.

### 41. Will the child paragraph appear?

~~~css
.wrapper {
  display: none;
}

.wrapper p {
  display: block;
}
~~~

**Answer: No.** The ancestor's `display: none` prevents the entire subtree from generating boxes. The descendant rule cannot restore its box.

### 42. What does this example remove from layout?

~~~css
.wrapper {
  display: contents;
}
~~~

**Answer:** The wrapper's own principal box is removed, but its children can still generate boxes and participate in the surrounding layout.

### 43. Does this change the element into an HTML list item?

~~~css
div {
  display: list-item;
}
~~~

**Answer: No.** It can create a visual list marker and principal box, but the HTML element remains a `div`.

### 44. What layout behavior does this value specify?

~~~css
.toolbar {
  display: inline-flex;
}
~~~

**Answer:** The toolbar participates as an inline-level box, and its children are laid out with Flexbox.

### 45. Why can plain text inside a block container behave like inline content without a `span`?

**Answer:** CSS layout can generate anonymous inline boxes for directly contained text. The anonymous boxes let the text participate in the parent's inline formatting context.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [19 - Borders, Outlines, and Shadows](19-borders-outlines-and-shadows.md) | [Lesson](../lessons/20-display-and-box-types.md) | [Example](../examples/20-display-and-box-types.md) | [21 - Normal Flow and Formatting Contexts](21-normal-flow-and-formatting-contexts.md) |
