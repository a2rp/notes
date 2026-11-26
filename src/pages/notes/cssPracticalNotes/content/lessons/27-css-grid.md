# 27 - CSS Grid Layout

CSS Grid lays out items in rows and columns. It is useful when the positions and sizes of items need to relate across both dimensions, such as a page shell, dashboard, form, or responsive card collection.

A grid can define tracks explicitly or create implicit tracks as items are placed. Items can be positioned by lines, spans, named areas, or automatic placement.

## Create a grid container

Set **display: grid** on a parent to create a block-level grid container. Its in-flow direct children become grid items.

~~~css
.card-list {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 1rem;
}
~~~

~~~html
<div class="card-list">
  <article>First card</article>
  <article>Second card</article>
  <article>Third card</article>
</div>
~~~

The two declared columns form the explicit grid. With default row-wise auto placement, the first two items fill the first row and the third starts another row. That additional row is an implicit track.

**display: inline-grid** creates an inline-level grid container. Its children use Grid layout while the container participates in surrounding inline flow.

Only in-flow direct children become grid items. A nested element remains inside its closest grid item unless it is a child of another grid container. A direct text run is wrapped in an anonymous grid item.

## Rows, columns, tracks, lines, and cells

Grid uses a few related terms:

- A **track** is a column or row between two grid lines.
- A **grid line** is a boundary used to define tracks and place items.
- A **cell** is one intersection of a row track and a column track.
- A **grid area** is a rectangular group of adjacent cells occupied by an item.

~~~css
.layout {
  display: grid;
  grid-template-columns: 14rem 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}
~~~

This grid has three explicit columns and three explicit rows. Each row and column is a track. Grid lines surround the tracks and can also be used to create named areas.

In a horizontal writing mode, column tracks usually run from left to right and row tracks from top to bottom. Grid line numbering follows the grid's writing mode, so prefer logical placement terms and named areas when they make intent clearer.

## Define track sizes

Track sizing functions define the size or range of a row or column.

### Fixed and flexible tracks

A fixed size such as **14rem** sets a track size. The **fr** unit represents a fraction of available space in the grid container after other sizing needs are accounted for.

~~~css
.two-columns {
  display: grid;
  grid-template-columns: 14rem 1fr;
  gap: 1rem;
}
~~~

The first column uses 14rem. The second track receives a fraction of the remaining space. With two tracks set to **1fr**, they share available free space equally when their other sizing constraints allow it.

An fr track is not always equal to every other fr track in every layout. Intrinsic minimum sizes and spanning content can affect track sizing.

### Minimum and maximum sizes with minmax()

**minmax()** sets a minimum and maximum track sizing function.

~~~css
.main-layout {
  display: grid;
  grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);
  gap: 1.5rem;
}
~~~

The first track can grow from 12rem up to 18rem. The second track can use the remaining space and has a zero minimum. A zero minimum is useful when long content would otherwise keep a flexible track wider than the container.

A common responsive card pattern is:

~~~css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}
~~~

This creates as many columns as fit, with each column ideally at least 15rem wide and able to grow. The inner min(100%, 15rem) lets the minimum track size reduce to the container width when there is not enough space for a 15rem column.

### min-content, max-content, and auto

Intrinsic sizing keywords let content influence a track:

- **min-content** is based on the smallest size the content can take without avoidable overflow.
- **max-content** is based on the size the content would need without soft wrapping.
- **auto** can depend on content and available space, and can stretch under track alignment.
- **fit-content()** caps a content-based track at a supplied limit.

~~~css
.article {
  display: grid;
  grid-template-columns: fit-content(18rem) minmax(0, 1fr);
  gap: 1rem;
}
~~~

Use intrinsic sizing when content should affect track size. For predictable layouts, set deliberate minimums and maximums, then test long labels, translated text, and narrow viewports.

## Repeat track patterns

**repeat()** avoids writing the same track definition many times.

~~~css
.calendar {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}
~~~

This creates seven flexible columns. It is useful for a calendar-like row where each column should share the available width.

### auto-fill and auto-fit

For responsive repeated tracks, **auto-fill** and **auto-fit** calculate how many repetitions fit:

~~~css
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: 1rem;
}
~~~

- **auto-fill** keeps the repeated tracks even when some of them are empty.
- **auto-fit** collapses empty repeated tracks after items have been placed, allowing occupied tracks to expand into the extra space.

Use auto-fit when the visible cards should stretch across the row if there are only a few. Use auto-fill when empty track slots should remain reserved.

## Place items with grid lines

Grid lines are numbered from the start and end of each explicit grid axis. Positive numbers count from the start edge. Negative numbers count backward from the end edge. A span specifies how many tracks an item should occupy.

~~~css
.featured {
  grid-column: 1 / 3;
  grid-row: 1 / span 2;
}
~~~

This item starts at column line 1 and ends at column line 3, covering two columns. It starts at row line 1 and spans two rows.

Placement properties include:

- **grid-column-start** and **grid-column-end**
- **grid-row-start** and **grid-row-end**
- **grid-column** and **grid-row** shorthands
- **grid-area** for row, column, and named-area placement

Use spans when an item should take multiple tracks without hard-coding both endpoint lines:

~~~css
.wide-card {
  grid-column: span 2;
}
~~~

If an item asks for more explicit tracks than exist, placement may cause implicit tracks to be created or may be clamped by the grid's placement rules. Keep spans within the intended grid when a fixed track count is important.

### Named lines

Grid lines can have names. A line can have more than one name, and repeated patterns can repeat named line sets.

~~~css
.page {
  display: grid;
  grid-template-columns:
    [sidebar-start] 15rem
    [sidebar-end content-start] minmax(0, 1fr)
    [content-end];
  gap: 1rem;
}

main {
  grid-column: content-start / content-end;
}
~~~

Names help communicate placement intent. They are especially useful in large layouts where a numeric line such as 2 would not explain what area it represents.

## Name layout areas

**grid-template-areas** describes a grid with a visual map. Each quoted row is a row in the template. Repeating a name across adjacent cells creates one rectangular named area. A period marks an empty cell.

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

.page-header {
  grid-area: header;
}

.page-main {
  grid-area: main;
}

.page-sidebar {
  grid-area: sidebar;
}

.page-footer {
  grid-area: footer;
}
~~~

For this template, each area name must form a rectangle. It cannot form an L shape or disconnected regions. All rows must have the same number of cells.

A period or sequence of periods marks an empty cell:

~~~css
.feature-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "hero hero ."
    "story story related";
}
~~~

The dot leaves the first row's third cell empty. Use named areas when a map makes the layout easier to understand, not just to reproduce the appearance of a table.

### Change the area map responsively

A media query can rearrange named areas without moving elements in the HTML:

~~~css
.page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16rem;
  grid-template-areas:
    "header header"
    "main sidebar"
    "footer footer";
}

@media (max-width: 48rem) {
  .page {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}
~~~

This changes visual placement only. Keep the source order sensible for reading and keyboard navigation.

## Automatic placement

By default, Grid places items into available cells in row order, creating implicit tracks if necessary.

~~~css
.results {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(8rem, auto);
  gap: 1rem;
}
~~~

The explicit grid defines three columns. If items require more rows, grid-auto-rows sizes the implicit rows.

**grid-auto-flow** controls the direction in which automatically placed items fill the grid:

- **row** - fill rows first. This is the default.
- **column** - fill columns first.
- **dense** - try to fill earlier holes with later items.

~~~css
.gallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-flow: row;
  grid-auto-rows: 8rem;
  gap: 0.75rem;
}
~~~

Dense packing can make later items appear before earlier ones visually when it backfills gaps. It does not change the DOM order, reading order, or keyboard order. Use it only when that visual rearrangement is appropriate.

Implicit tracks are not declared in grid-template-rows or grid-template-columns. Their sizes can be controlled using grid-auto-rows and grid-auto-columns.

## Grid items can overlap

Grid items can occupy overlapping grid areas. Their paint order follows the normal stacking rules, and z-index can control their order in applicable cases.

~~~css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.photo-grid__feature {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.photo-grid__label {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  z-index: 1;
}
~~~

Overlapping content should remain readable and usable. Do not rely on visual overlap to communicate an essential relationship without providing a clear structure in the HTML.

## Nested grids and subgrid

A nested grid creates its own independent rows and columns. Use **subgrid** when a nested grid should align its tracks with the parent grid on one or both axes.

~~~css
.form {
  display: grid;
  grid-template-columns: 10rem minmax(0, 1fr);
  gap: 0.75rem 1rem;
}

.form-row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  gap: inherit;
}
~~~

The form row spans the parent's columns and uses subgrid to share those column tracks. Its child labels and fields can align with the rest of the form.

Subgrid is different from a nested grid with independently defined grid-template-columns. The subgrid's items participate in sizing the corresponding parent tracks. Use it when nested content needs shared alignment, not just because one grid is inside another.

## Grid alignment

Grid alignment has two different targets:

- **Items inside their grid areas:** use justify-items, align-items, or an item's justify-self and align-self.
- **Tracks inside the grid container:** use justify-content and align-content when the grid's tracks do not fill the container.

~~~css
.grid {
  display: grid;
  justify-items: stretch;
  align-items: center;
  justify-content: center;
  align-content: start;
}
~~~

The default item alignment is usually stretch for auto-sized items. The exact alignment choices and gap behavior are covered in the next chapter on alignment and gaps.

## Grid sizing and overflow checks

Grid tracks have minimum sizing behavior. A flexible track declared with 1fr has an automatic minimum in many common cases. Wide content can therefore make a track overflow rather than shrink as far as expected.

Use minmax(0, 1fr) when a track needs permission to shrink below its min-content size:

~~~css
.content-grid {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  gap: 1rem;
}
~~~

Also check the grid items themselves. A long unbroken word, wide image, or nested component can contribute a large minimum size.

~~~css
.content-grid__main {
  min-inline-size: 0;
}

.content-grid img {
  max-inline-size: 100%;
  block-size: auto;
}
~~~

A zero track minimum does not make every descendant shrink or wrap automatically. Set the appropriate item minimum and content wrapping rules as needed.

## Use Grid and Flexbox together

Grid can position large page regions in two dimensions. Flexbox can arrange items inside one of those regions.

~~~css
.application {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  grid-template-areas: "sidebar main";
  gap: 1.5rem;
}

.application__toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
~~~

Choose the layout model that matches the relationship being described:

- Use Grid when rows and columns should coordinate in two dimensions.
- Use Flexbox when items form a one-dimensional row or column and share available space.
- Combine them when the page structure and the component internals have different layout needs.

## Common Grid problems

### A track is wider than its container

A track's automatic minimum or its content may be too large. Try minmax(0, 1fr) for a flexible track and check the item's minimum size, long tokens, and intrinsic image dimensions.

### Items appear in unexpected implicit rows or columns

Check the explicit grid definition, placement lines, spans, and grid-auto-flow. Items placed beyond the explicit grid can create implicit tracks.

### grid-template-areas is invalid

Each row string needs the same number of cells. A named area must form a single rectangle. Use periods for blank cells, and ensure every referenced area name appears in the map.

### Responsive cards overflow on a narrow screen

Use a minimum track size that can shrink to the container width:

~~~css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
~~~

Check padding, gaps, and nested content too. They all use available space.

### Dense placement makes the visual sequence surprising

grid-auto-flow: dense can place later items in earlier holes. Remove dense if visual and source order should stay more closely aligned.

### A nested grid's labels do not line up

A standalone nested grid sizes its own tracks. Place the nested grid across the parent tracks and use subgrid on the axis that should share those tracks.

### An item spans too many tracks

Inspect its placement lines and span. A large span can create implicit tracks or be constrained at the grid edge. Keep placement within the intended explicit grid if a fixed shape matters.

## Accessibility and source order

Grid changes visual position without changing the HTML source order. Screen readers and sequential keyboard navigation still follow the document structure.

- Put content in a meaningful source order before applying visual placement.
- Do not use Grid to place interactive controls in a sequence that conflicts with keyboard order.
- Use semantic elements for page regions, lists, forms, and repeated cards.
- Keep overlapping content readable at zoom and on narrow screens.
- Check the visual layout and reading order after changing areas, line positions, or dense packing.

## Try it yourself

1. Create a two-column grid with grid-template-columns: 12rem 1fr.
2. Add a third item and observe the implicit row created by auto placement.
3. Replace fixed tracks with repeat(3, minmax(0, 1fr)).
4. Make a responsive card grid with repeat(auto-fit, minmax(min(100%, 14rem), 1fr)).
5. Compare auto-fit with auto-fill when there are only one or two cards.
6. Place one item with grid-column: 1 / 3 and another with grid-row: span 2.
7. Add a grid-template-areas map with a header, main area, sidebar, and footer.
8. Change the area map at a narrow breakpoint without changing the HTML source order.
9. Create an explicit grid with two columns and observe implicit row sizing with grid-auto-rows.
10. Add an empty cell to a named area map using a period.
11. Use minmax(0, 1fr) and compare it with 1fr when a child contains a long unbroken token.
12. Put a nested form row on the parent columns and compare independent track sizing with subgrid.
13. Try grid-auto-flow: dense with a spanning item and inspect visual order against keyboard order.
14. Use Grid for the page regions and Flexbox for a toolbar inside one region.

## Key points

- display: grid creates a two-dimensional grid container.
- Grid tracks are rows or columns, and grid lines define where items start and end.
- fr, minmax(), repeat(), and intrinsic sizing functions control track sizes.
- Grid items can be placed by line numbers, spans, named lines, named areas, or auto placement.
- Items that exceed the explicit grid can create implicit tracks.
- auto-fit collapses empty repeated tracks; auto-fill keeps them.
- subgrid lets nested items share parent tracks.
- minmax(0, 1fr) can prevent content-based minimum sizes from forcing a flexible track too wide.
- Visual placement does not change DOM or keyboard order.
- Grid and Flexbox complement each other. Choose based on the layout relationship.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [26 - Flexbox Layout](26-flexbox.md) | [Q&A](../qnas/27-css-grid.md) | [Example](../examples/27-css-grid.md) | [28 - Alignment and Gaps](28-alignment-and-gaps.md) |
