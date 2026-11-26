# 27 - CSS Grid Layout: Questions and Answers

## Multiple-choice questions

### 1. Which declaration creates a block-level grid container?

- **A.** display: flex
- **B.** display: grid
- **C.** position: grid
- **D.** float: grid

**Answer: B.** display: grid creates a grid container. Its in-flow direct children become grid items.

### 2. Which elements become grid items?

- **A.** Every descendant in the document
- **B.** In-flow direct children of a grid container
- **C.** Only elements with grid-area set
- **D.** Only text nodes

**Answer: B.** Grid item status is based on direct children. A nested element remains inside its parent grid item unless it is itself a grid container.

### 3. What is a grid track?

- **A.** A row or column between grid lines
- **B.** A child element's border
- **C.** A named area only
- **D.** The space outside the grid container

**Answer: A.** Grid tracks are the rows and columns whose sizes are defined or created by the grid.

### 4. What does the fr unit represent?

- **A.** A fixed pixel value
- **B.** A fraction of available free space in the grid
- **C.** A font-relative unit
- **D.** A gap between lines

**Answer: B.** fr distributes available space after other track sizing requirements are accounted for. Intrinsic minimums can affect the final result.

### 5. What does minmax(12rem, 1fr) define?

- **A.** A track with a 12rem minimum and a flexible maximum
- **B.** A fixed 12rem track only
- **C.** Two separate tracks
- **D.** A 12rem gap

**Answer: A.** minmax() defines a minimum and maximum track sizing function. The track cannot become smaller than 12rem under this definition.

### 6. What does minmax(0, 1fr) commonly help with?

- **A.** Letting a flexible track shrink below a content-based minimum
- **B.** Hiding grid items
- **C.** Disabling auto placement
- **D.** Setting a fixed row height

**Answer: A.** A zero minimum can prevent long content from forcing a flexible track wider than the grid container.

### 7. What does auto-fit do in a repeated responsive track pattern?

- **A.** Creates a fixed number of tracks
- **B.** Collapses empty repeated tracks after placement
- **C.** Moves every item into the first track
- **D.** Disables intrinsic sizing

**Answer: B.** auto-fit collapses empty repeated tracks, allowing occupied tracks to grow into available space.

### 8. How does auto-fill differ from auto-fit?

- **A.** auto-fill can keep empty repeated track slots
- **B.** auto-fill only works with rows
- **C.** auto-fit creates implicit columns
- **D.** There is no difference

**Answer: A.** auto-fill keeps the repeated tracks even if some are empty. auto-fit collapses empty repeated tracks after placement.

### 9. What does grid-column: 1 / 3 mean?

- **A.** The item spans the first two columns, from line 1 to line 3.
- **B.** The item uses column 3 only.
- **C.** The item creates three rows.
- **D.** The item has a 1px gap.

**Answer: A.** Grid placement uses lines around tracks. Starting at line 1 and ending at line 3 covers two tracks.

### 10. What does a period in grid-template-areas represent?

- **A.** A named line
- **B.** An empty grid cell
- **C.** A flexible track
- **D.** A default grid item

**Answer: B.** A period marks a blank cell in the area map.

### 11. What shape must a named grid area form?

- **A.** Any shape as long as it is connected
- **B.** A single rectangle of adjacent cells
- **C.** A diagonal line
- **D.** Two separate rectangles

**Answer: B.** Each area name must form one rectangle. It cannot form a disconnected shape or an L shape.

### 12. Which property controls the direction of automatic placement?

- **A.** grid-auto-flow
- **B.** grid-auto-rows
- **C.** grid-template-areas
- **D.** z-index

**Answer: A.** grid-auto-flow controls whether auto placement fills rows or columns and whether it uses dense packing.

## True or false

### 13. Grid is designed for layouts that coordinate rows and columns.

**Answer: True.** Grid is a two-dimensional layout system that can align content across both axes.

### 14. A grid item can be a direct text run inside a grid container.

**Answer: True.** Direct text sequences are wrapped in anonymous grid items.

### 15. Items that extend beyond the explicit grid can cause implicit tracks to be created.

**Answer: True.** Auto placement or explicit placement beyond the defined tracks can create implicit rows or columns.

### 16. auto-fit and auto-fill always produce the same visible track sizes.

**Answer: False.** auto-fit collapses empty repeated tracks after placement. auto-fill retains the empty slots, which can leave different space distribution.

### 17. Grid line numbering starts at zero.

**Answer: False.** Explicit grid lines use positive numbering from the start and negative numbering from the end. The first start-side line is numbered 1.

### 18. A grid item can span more than one track.

**Answer: True.** An item can span rows or columns with line placement and span syntax.

### 19. grid-template-areas changes the HTML source order.

**Answer: False.** It changes visual placement only. The source order remains in the HTML.

### 20. Setting dense on grid-auto-flow can change visual order without changing keyboard order.

**Answer: True.** Dense packing may backfill earlier holes with later items. DOM and keyboard order do not change.

## Short-answer questions

### 21. What is the explicit grid?

**Answer:** It is the set of rows and columns defined by the grid-template properties or by named areas.

### 22. What is an implicit grid track?

**Answer:** It is a row or column created beyond the explicitly defined tracks when placement needs it.

**Explanation:** grid-auto-rows and grid-auto-columns can control the sizing of these implicit tracks.

### 23. How are grid lines used?

**Answer:** Grid lines mark the boundaries of tracks and let items specify where their grid areas begin and end.

### 24. What does the fr unit distribute?

**Answer:** It distributes a fraction of available free space in the relevant grid axis after other sizing requirements are considered.

### 25. Why might two 1fr tracks not have equal final sizes?

**Answer:** Intrinsic minimum sizes, spanning items, and other sizing constraints can affect the track sizing algorithm.

### 26. What is the purpose of minmax()?

**Answer:** It defines lower and upper sizing functions for a track, such as a flexible track with a protected minimum.

### 27. When is minmax(0, 1fr) useful?

**Answer:** It is useful when a flexible track should be allowed to shrink below its content-based automatic minimum.

**Explanation:** The grid item may also need min-inline-size: 0, and its content may need a wrapping rule.

### 28. What is the difference between auto-fit and auto-fill?

**Answer:** auto-fit collapses empty repeated tracks after placement. auto-fill keeps the empty repeated track slots.

### 29. What makes grid-template-areas invalid?

**Answer:** Rows with different numbers of cells or a named area that is not a single rectangle make an area map invalid.

### 30. How can an empty cell be written in grid-template-areas?

**Answer:** Use one or more periods in the quoted row string.

### 31. What does grid-auto-flow: column do?

**Answer:** It makes automatic placement fill down columns before moving to the next column.

### 32. What is subgrid for?

**Answer:** Subgrid lets a nested grid share row or column tracks with its parent grid.

**Explanation:** Its items can participate in sizing those parent tracks, which helps nested content align with surrounding items.

## Read the CSS

### 33. How many explicit columns does this grid define?

~~~css
.calendar {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}
~~~

**Answer:** Seven. repeat() repeats the track definition seven times.

### 34. How many columns does this responsive pattern create?

~~~css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
}
~~~

**Answer:** It creates as many columns as can fit at the current available width while respecting the track minimum. At narrow widths, the minimum can shrink to the container width.

### 35. Which explicit tracks does this item occupy?

~~~css
.featured {
  grid-column: 1 / 3;
}
~~~

**Answer:** It spans the first and second column tracks, from line 1 to line 3.

### 36. What does this placement request?

~~~css
.card {
  grid-row: span 2;
}
~~~

**Answer:** The card spans two row tracks. The browser determines the start line according to placement and auto-placement rules.

### 37. Which cell is left empty in this map?

~~~css
.layout {
  grid-template-areas:
    "header header ."
    "main sidebar sidebar";
}
~~~

**Answer:** The third cell in the first row is empty. The period is the empty-cell marker.

### 38. Why does this area map fail?

~~~css
.layout {
  grid-template-areas:
    "main main sidebar"
    "main sidebar sidebar";
}
~~~

**Answer:** The main area forms an L shape rather than a rectangle. Each named area must occupy one rectangular set of adjacent cells.

### 39. What sizes the extra rows in this grid?

~~~css
.results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(8rem, auto);
}
~~~

**Answer:** The implicit rows use a minimum size of 8rem and can grow based on their content.

### 40. What might happen to later items in this grid?

~~~css
.gallery {
  display: grid;
  grid-auto-flow: dense;
}
~~~

**Answer:** Later items may be placed into earlier holes, so the visual sequence may not match source order. Reading and keyboard order still use the DOM.

### 41. What does this declaration request for the nested grid?

~~~css
.form-row {
  display: grid;
  grid-template-columns: subgrid;
}
~~~

**Answer:** It requests that the nested grid share column tracks from its parent, provided it is placed across those parent tracks.

### 42. What does this grid do with the main content track?

~~~css
.page {
  display: grid;
  grid-template-columns: 14rem minmax(0, 1fr);
}
~~~

**Answer:** It defines a 14rem first track and a second flexible track with a zero minimum, allowing the main track to shrink below its content-based minimum.

## Practical scenarios

### 43. A card collection should automatically gain or lose columns as the container changes. What pattern can you use?

**Answer:** Use repeat(), auto-fit, minmax(), and a flexible maximum.

~~~css
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
~~~

**Explanation:** The browser fits as many cards as the available width permits. Occupied tracks expand when there are fewer cards than possible columns.

### 44. A page needs a header across the top, a main area, a sidebar, and a footer across the bottom. What Grid feature makes that map readable?

**Answer:** Use named areas.

~~~css
.page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16rem;
  grid-template-areas:
    "header header"
    "main sidebar"
    "footer footer";
  gap: 1rem;
}
~~~

**Explanation:** Assign each section to its matching area with grid-area. The area map describes the layout while the HTML can keep a meaningful reading order.

### 45. Nested form labels and inputs should align with shared parent columns. What can you use?

**Answer:** Use subgrid on the nested rows along the axis that should align with the parent.

~~~css
.form {
  display: grid;
  grid-template-columns: 10rem minmax(0, 1fr);
}

.form-row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}
~~~

**Explanation:** The nested row spans the parent tracks and shares their columns, so labels and inputs can line up across rows.

### 46. A grid item with a long token makes the whole page wider. What should you inspect?

**Answer:** Check the track minimum, the grid item's minimum inline size, and the token's wrapping behavior.

~~~css
.content-grid {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
}

.content-grid__main {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}
~~~

**Explanation:** The zero track minimum and item minimum let the flexible column shrink. The wrapping rule gives the long token break opportunities.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [26 - Flexbox Layout](26-flexbox.md) | [Lesson](../lessons/27-css-grid.md) | [Example](../examples/27-css-grid.md) | [28 - Alignment and Gaps](28-alignment-and-gaps.md) |
