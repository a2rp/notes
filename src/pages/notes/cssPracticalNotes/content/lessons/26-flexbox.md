# 26 - Flexbox Layout

Flexbox lays out a group of items along one main axis. It can distribute free space, shrink items that do not fit, wrap items onto additional lines, and align items along either axis. It is well suited to toolbars, navigation, button groups, and rows or columns of related components.

For two-dimensional page layouts, CSS Grid is often a better fit. Flexbox can wrap onto multiple lines, but each line is still laid out independently.

## Create a flex container

Set `display: flex` on a parent. Its in-flow children become flex items.

~~~css
.toolbar {
  display: flex;
  gap: 0.75rem;
}
~~~

~~~html
<nav class="toolbar" aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/articles">Articles</a>
  <a href="/about">About</a>
</nav>
~~~

Each link is a direct child, so each link becomes a flex item. Text nodes that are direct children are wrapped in anonymous flex items. A nested element stays inside its closest flex item unless it is itself a child of another flex container.

`display: inline-flex` creates an inline-level flex container. Its children use flex layout in the same way, while the container participates in its surrounding inline formatting context.

## Main axis and cross axis

Every flex container has two axes:

- **Main axis:** the direction in which its items are laid out.
- **Cross axis:** the direction perpendicular to the main axis.

Use the axes rather than assuming that main always means horizontal. The writing mode and `flex-direction` determine how the axes map to physical directions.

With the common horizontal writing mode:

- `flex-direction: row` lays items along the inline axis, usually left to right.
- `flex-direction: column` lays items along the block axis, usually top to bottom.

~~~css
.row {
  display: flex;
  flex-direction: row;
}

.stack {
  display: flex;
  flex-direction: column;
}
~~~

The main-start and main-end sides depend on the direction and writing mode. The cross-start and cross-end sides are on the perpendicular axis.

## Direction with `flex-direction`

The property accepts four values:

- `row` - lay items along the inline direction.
- `row-reverse` - lay items along the inline direction in reverse.
- `column` - lay items along the block direction.
- `column-reverse` - lay items along the block direction in reverse.

~~~css
.media-card {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
~~~

Reverse values change visual placement. They do not change the document's source order, screen-reader reading order, or keyboard navigation order. Do not use reverse direction to fix incorrect HTML order.

## Wrapping with `flex-wrap`

By default, `flex-wrap: nowrap` keeps all items on a single line, even if they overflow the container. Allow items to form additional lines with `wrap`.

~~~css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
~~~

- `nowrap` - keep all items on one flex line.
- `wrap` - create additional lines in the cross direction as needed.
- `wrap-reverse` - wrap onto additional lines in the reverse cross direction.

Each flex line is laid out independently. Free space on one line is not redistributed to items on another line. This matters when a wrapped layout appears to have uneven rows.

The shorthand `flex-flow` combines direction and wrapping:

~~~css
.card-list {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
}
~~~

## The `gap` properties

Use `gap` to add consistent space between flex items and between flex lines. It does not add space around the outside edge of the container.

~~~css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}
~~~

With two values, the first is the row gap and the second is the column gap. Use `row-gap` and `column-gap` when only one direction needs a gap.

Gaps work well for component spacing because they do not create extra outer margins that need to be adjusted at the edges.

## Flexible sizing

The `flex` shorthand controls how an item grows, shrinks, and chooses its starting size. Its components are:

- `flex-grow` - how the item can share positive free space.
- `flex-shrink` - how the item can give up space when the line is too large.
- `flex-basis` - the starting main size used before free space is distributed.

~~~css
.search-field {
  flex: 1 1 16rem;
}
~~~

This item can grow, can shrink, and starts from a 16rem basis. If you need precise behavior, spell out the components:

~~~css
.sidebar {
  flex: 0 1 18rem;
}

.main-content {
  flex: 1 1 32rem;
}
~~~

The sidebar starts at 18rem and can shrink, but it does not grow to take extra space. The main content starts at 32rem, can shrink, and can grow into available space.

### Grow to use free space

Positive free space is the space remaining on a flex line after its items' base sizes and other fixed contributions are considered. Items with a positive grow factor share that space proportionally.

~~~css
.column {
  flex: 1 1 0;
}
~~~

If three items have the same grow factor, they receive equal shares of the free space, subject to their minimum and maximum sizes. Equal grow factors do not guarantee identical final sizes when the items have different constraints or bases.

### Shrink when items do not fit

When the items' base sizes are too large for a line, items with a positive shrink factor can become smaller. The shrink calculation takes the flex base size into account, so larger items can give up more space than smaller ones.

~~~css
.item {
  flex: 0 1 14rem;
}
~~~

A shrink factor does not mean an item can become smaller than every content or min-size constraint. Long words, images, and nested components can still cause overflow.

### Choose a basis deliberately

`flex-basis` sets the initial main size before the remaining free space is distributed.

- A length or percentage provides an explicit starting size.
- `auto` uses the item's main-size property when that size is specified, otherwise content-based sizing applies.
- `content` asks for a content-based basis.

~~~css
.product {
  flex: 1 1 15rem;
}
~~~

The basis is a starting point, not necessarily the final size. Grow, shrink, min-size, and max-size constraints can all affect the result.

The one-value shorthand `flex: 1` is common when items should share available space. For clearer teaching and fine control, writing the grow, shrink, and basis components explicitly makes the intended starting size visible.

## Main-axis alignment with `justify-content`

After the flex items have been sized, `justify-content` distributes remaining free space along the main axis.

Common values include:

- `flex-start` - group items at main-start.
- `flex-end` - group items at main-end.
- `center` - center the group.
- `space-between` - put free space between items.
- `space-around` - distribute space around each item.
- `space-evenly` - distribute equal space between items and the container edges.

~~~css
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
~~~

If the items already consume all available space, there is no free space for `justify-content` to distribute. Auto margins can absorb positive free space before this alignment step.

### Use an auto margin to push one item away

~~~css
.navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navigation__account {
  margin-inline-start: auto;
}
~~~

The auto margin absorbs available positive space at the start side of the account item and pushes it toward the end. This is useful for a toolbar with a group on one side and an action on the other.

## Cross-axis alignment

`align-items` aligns items on the cross axis. The default is `stretch` when the item's cross size is auto and the other conditions for stretching are met.

Common values include:

- `stretch` - stretch eligible items to the flex line's cross size.
- `flex-start` - align at cross-start.
- `flex-end` - align at cross-end.
- `center` - center items in the cross axis.
- `baseline` - align text baselines.

~~~css
.profile-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
~~~

Use `align-self` to override the container's item alignment for one flex item:

~~~css
.profile-row__action {
  align-self: flex-start;
}
~~~

The exact meanings of physical-looking values such as `flex-start` depend on the flex container's axes. For writing-mode-aware alignment, values such as `start` and `end` may be more suitable where supported by the alignment property.

## Aligning multiple flex lines

When `flex-wrap` creates multiple lines, `align-content` distributes the lines along the cross axis if the container has extra cross-axis space.

~~~css
.gallery {
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  gap: 1rem;
  min-block-size: 28rem;
}
~~~

Do not confuse these properties:

- `align-items` aligns items within each flex line.
- `align-content` aligns the flex lines inside a multi-line container.
- `align-self` changes alignment for one item.

If the container has only one line or no extra cross-axis space, `align-content` may not produce a visible change. Give the container a meaningful cross size before expecting line distribution to be apparent.

## Minimum sizes and unexpected overflow

Flex items have automatic minimum-size behavior. In a row container, a long unbreakable word or wide child can prevent an item from shrinking as far as expected. In a column container, content can similarly resist shrinking in the main axis.

A common fix is to allow the relevant flex item to shrink below its min-content size:

~~~css
.main-content {
  min-inline-size: 0;
}
~~~

For a column flex container with a scrollable content area, the relevant property may be `min-block-size: 0`:

~~~css
.page {
  display: flex;
  flex-direction: column;
  block-size: 100vh;
}

.page__content {
  min-block-size: 0;
  overflow: auto;
}
~~~

Do not add these declarations automatically. First identify which child is preventing the intended size, then set the minimum size that matches the layout.

Also check:

- Long tokens that need a wrapping rule.
- Images and other replaced elements that need a maximum inline size.
- Fixed widths and margins that leave too little space.
- Nested flex items that need their own minimum-size adjustment.

## Nested flex containers

A flex item can itself be a flex container. This is useful for a card whose outer position participates in a row while its internal content uses a column.

~~~css
.card-row {
  display: flex;
  gap: 1rem;
}

.card {
  display: flex;
  flex: 1 1 16rem;
  flex-direction: column;
}

.card__action {
  margin-block-start: auto;
}
~~~

The card's outer flex properties control how it shares space with sibling cards. The inner flex properties lay out its title, text, and action. The auto block-start margin can push the action toward the bottom when the card has extra height.

## Common patterns

### Center an item in both axes

~~~css
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-block-size: 18rem;
}
~~~

The main axis is centered with `justify-content`. The cross axis is centered with `align-items`.

### Keep a footer at the end of a vertical component

~~~css
.panel {
  display: flex;
  flex-direction: column;
  min-block-size: 20rem;
}

.panel__footer {
  margin-block-start: auto;
}
~~~

The auto margin absorbs positive free space and pushes the footer toward the main-end side. This pattern is scoped to the panel; it does not position a footer at the bottom of the browser viewport by itself.

### Make a navigation group wrap

~~~css
.navigation {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
}
~~~

Wrapping keeps items from forcing a horizontal overflow when the available space becomes narrow. Keep DOM order meaningful so the visual and keyboard sequences remain understandable.

## Flexbox and accessibility

The `order` property and reverse directions change visual order without changing the HTML source order. Screen readers and sequential keyboard navigation generally follow the source order.

~~~css
/* Avoid using order to repair incorrectly ordered HTML. */
.notice {
  order: -1;
}
~~~

Place important content in a sensible order in the HTML first. Use Flexbox to adjust layout, not to create a misleading visual sequence for users who navigate linearly.

Flex items are not automatically keyboard-focusable. Links and buttons remain interactive based on their HTML semantics, and a flex container does not change that.

## Common Flexbox problems

### Items refuse to shrink

Inspect automatic minimum sizes, long unbreakable text, intrinsic image sizes, and fixed widths. Add `min-inline-size: 0` to a row item only when it needs permission to shrink below its min-content size.

### `justify-content` seems to do nothing

The items may already use all of the available main-axis space. Check the basis, grow factors, margins, and container size. Alignment distributes free space; it does not resize items to create free space.

### `align-content` seems to do nothing

It aligns flex lines, not individual items. The container needs multiple flex lines and extra cross-axis space for line distribution to be visible.

### Items unexpectedly wrap

Check `flex-wrap` and the combined hypothetical outer sizes of items, including margins and gaps. A wrapping container creates another line when the next item does not fit.

### Visual order and keyboard order disagree

Inspect `order` and reverse direction values. Restore a logical source order in HTML instead of relying on CSS reordering.

### A column layout will not scroll internally

A flex item's automatic minimum size may prevent it from shrinking. In a bounded column layout, try setting `min-block-size: 0` on the intended scroll region and verify that the container has a definite available block size.

## Flexbox or Grid?

Choose Flexbox when the items form a one-dimensional group and their sizes should flex along a row or column. Wrapping is still supported, but each line distributes its own items independently.

Choose Grid when the design depends on rows and columns that need to coordinate across both dimensions.

~~~css
/* A toolbar is a one-dimensional group. */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* A card collection needs coordinated tracks. */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}
~~~

## Try it yourself

1. Set `display: flex` on a navigation list. Inspect which elements become flex items.
2. Change `flex-direction` from `row` to `column` and identify the new main axis.
3. Add `flex-wrap: wrap` to a row of tags and resize the container.
4. Adjust the `gap` and compare it with item margins.
5. Give three items different `flex-grow` factors and observe how positive free space is shared.
6. Reduce the container width and compare `flex-shrink: 1` with `flex-shrink: 0`.
7. Change a flex item's `flex-basis` while leaving its final size flexible.
8. Center a panel using `justify-content` and `align-items`.
9. Use an auto margin to push one navigation action to the end of the row.
10. Put a long unbroken word in a flex item. Try `min-inline-size: 0` and a suitable wrapping rule.
11. Put a scroll region inside a column flex layout and inspect whether `min-block-size: 0` is needed.
12. Change item order visually, then inspect keyboard focus order. Restore the HTML to a meaningful source order.

## Key points

- A flex container is created with `display: flex` or `display: inline-flex`.
- In-flow direct children become flex items.
- Main and cross axes depend on `flex-direction` and the writing mode.
- `flex-wrap` controls whether items remain on one line or form multiple lines.
- `flex-grow`, `flex-shrink`, and `flex-basis` control flexible sizing.
- `justify-content` distributes main-axis free space; `align-items` aligns items on the cross axis.
- `align-content` aligns multiple flex lines, while `align-self` overrides alignment for one item.
- Automatic minimum sizes can prevent a flex item from shrinking as expected.
- CSS visual reordering does not change DOM or keyboard order.
- Use Flexbox for one-dimensional groups and Grid for coordinated two-dimensional tracks.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [25 - Floats and Clearing](25-floats-and-clear.md) | [Q&A](../qnas/26-flexbox.md) | [Example](../examples/26-flexbox.md) | [27 - CSS Grid Layout](27-css-grid.md) |
