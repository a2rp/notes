# 28 - Alignment and Gaps

CSS alignment controls where items sit inside their available areas and how extra space is shared. The same family of properties works across Grid and Flexbox, but the axes have different meanings in each layout.

This chapter explains the axes first, then covers item alignment, content distribution, gaps, practical patterns, and common alignment problems.

## What you will learn

- How inline, block, main, and cross axes relate to alignment.
- How `justify-content`, `align-content`, `justify-items`, `align-items`, `justify-self`, and `align-self` differ.
- How the `place-*` shorthands work.
- How Grid and Flexbox interpret alignment properties.
- How to create consistent spacing with `gap`.
- Why alignment sometimes appears to have no effect.

## Begin with the axes

Alignment is easier to understand when you identify the axis before choosing a property.

### Grid axes

In the usual horizontal writing mode:

- The inline axis runs across a line of text, usually left to right.
- The block axis runs between lines of text, usually top to bottom.
- `justify-*` properties align along the inline axis.
- `align-*` properties align along the block axis.

The writing mode can change which physical direction those logical axes point. Prefer logical values such as `start` and `end` when you want a layout to follow the document's writing direction.

### Flexbox axes

Flexbox uses a main axis and a cross axis:

- The main axis follows `flex-direction`.
- The cross axis is perpendicular to the main axis.
- `justify-*` properties align along the main axis.
- `align-*` properties align along the cross axis.

With `flex-direction: row`, the main axis usually follows the inline axis. With `flex-direction: column`, it usually follows the block axis. If you change the direction, the meaning of justify and align changes with it.

| Layout | `justify-*` axis | `align-*` axis |
| :--- | :--- | :--- |
| Grid | Inline | Block |
| Flexbox | Main | Cross |

Do not memorize that `justify-content` always means horizontal or that `align-items` always means vertical. Identify the layout and its axes first.

## Two different alignment jobs

There are two broad jobs for alignment.

### Align an item inside its area

Self-alignment controls the position of an individual item inside the area available to it.

- `justify-self` aligns one grid item on the inline axis.
- `align-self` aligns one grid or flex item on the relevant block or cross axis.
- `justify-items` sets the default inline self-alignment for a container's grid items.
- `align-items` sets the default block or cross-axis self-alignment for grid or flex items.

For example, a grid card can stay in its assigned grid area while its content box is centered within that area:

~~~css
.card {
  justify-self: center;
  align-self: center;
}
~~~

These properties position the item. They do not move the grid lines or change the order of items.

### Distribute content inside a container

Content-alignment controls how a container's tracks or flex lines are positioned when there is extra room.

- `justify-content` distributes content along the inline axis in Grid and the main axis in Flexbox.
- `align-content` distributes content along the block axis in Grid and the cross axis between Flexbox lines.

These properties do not create extra space. If tracks or flex lines already fill the container, there may be no remaining space to distribute.

| Goal | Property | Layout scope |
| :--- | :--- | :--- |
| Distribute content along inline or main axis | `justify-content` | Grid and Flexbox |
| Distribute content along block or cross axis | `align-content` | Grid and Flexbox, with multiple flex lines |
| Set default item alignment on inline axis | `justify-items` | Grid |
| Set default item alignment on block or cross axis | `align-items` | Grid and Flexbox |
| Override one item's inline-axis alignment | `justify-self` | Grid |
| Override one item's block or cross-axis alignment | `align-self` | Grid and Flexbox |

## Alignment values

Many alignment properties accept these common values:

- `start` and `end` place content at the start or end of the relevant axis.
- `center` centers content within the available alignment space.
- `stretch` expands eligible items or tracks to use available room.
- `space-between` places the first and last items at the edges and shares space between them.
- `space-around` gives each item equal surrounding space. The outer spaces are half the size of the spaces between items.
- `space-evenly` shares space evenly, including at both edges.
- `baseline` aligns text baselines when the layout and items can provide baselines.

The available values depend on the property and layout mode. `space-*` values are for content distribution, not for `align-items` or `align-self`.

`flex-start` and `flex-end` are Flexbox-oriented values. `start` and `end` express logical direction and are often a good default for writing-mode-aware layouts.

### `stretch` depends on sizing

Stretching can only use space that is available, and it generally applies when the item's size in that axis is automatic. A grid or flex item with an explicit size may not stretch in the way you expect.

For example, `align-items: stretch` can make auto-sized grid items fill their grid areas. If every item has a fixed height, there is no automatic height for that alignment to stretch.

## Alignment defaults and per-item overrides

Use `align-items` or `justify-items` on a container when its children should share a default. Use `align-self` or `justify-self` on one child when it needs an exception.

~~~css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
}

.card--featured {
  align-self: center;
}
~~~

The `*-items` properties set the default behavior for children. A child's `*-self` value can override that default.

### Grid alignment

Grid provides both item alignment and track alignment.

~~~css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 12rem);
  grid-auto-rows: 10rem;
  justify-content: space-between;
  align-content: center;
  justify-items: center;
  align-items: center;
}
~~~

Here:

- `justify-content` distributes the grid columns inside the gallery container.
- `align-content` positions the grid rows inside the container.
- `justify-items` aligns each item inside its grid area on the inline axis.
- `align-items` aligns each item inside its grid area on the block axis.

There must be unused room between the track sizes and the container for track distribution to be visible. If flexible tracks already expand to fill the container, `justify-content: space-between` may appear to do nothing.

Grid items normally stretch to fill their grid areas when their sizes are automatic. Set `align-items: start` or `justify-items: start` when content should keep its natural size at the start of a cell.

### Flexbox alignment

In Flexbox, `justify-content` acts along the main axis after flex sizing. `align-items` sets the default cross-axis alignment of the items on a line.

~~~css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
~~~

For a row toolbar, the items are spaced along the row and centered across its height. If the direction changes to `column`, the main and cross axes change too.

Use `align-self` when one flex item needs a different cross-axis position:

~~~css
.toolbar__action {
  align-self: flex-start;
}
~~~

`align-content` distributes multiple flex lines across the cross axis. It needs a wrapping flex container and extra cross-axis space to show an effect:

~~~css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  gap: 0.5rem;
  min-height: 12rem;
}
~~~

A single-line flex container has no multiple lines to distribute. In that case, `align-content` has no visible effect.

`justify-items` and `justify-self` do not provide normal item positioning in Flexbox. For a flex item, use `justify-content` for the main axis, `align-items` for the cross-axis default, or `align-self` for a cross-axis exception.

## The `place-*` shorthands

The place shorthands set the align property first and the justify property second:

~~~css
.centered-grid {
  display: grid;
  place-items: center;
}
~~~

This is equivalent to:

~~~css
.centered-grid {
  align-items: center;
  justify-items: center;
}
~~~

With two values, the first value is for `align-*` and the second is for `justify-*`:

~~~css
.card-grid {
  place-items: start center;
}
~~~

That means `align-items: start` and `justify-items: center`.

The shorthands are:

| Shorthand | Longhand properties | Value order |
| :--- | :--- | :--- |
| `place-items` | `align-items` and `justify-items` | align, justify |
| `place-content` | `align-content` and `justify-content` | align, justify |
| `place-self` | `align-self` and `justify-self` | align, justify |

A one-value shorthand sets both properties to that value. Use a shorthand when both axes use the same value; use longhands when their values differ. The shorthand only affects properties that apply in the selected layout mode.

## Gaps between items

`gap` adds space between adjacent rows and columns in a Grid or Flexbox container. It does not add space at the outside edges.

~~~css
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem 1.5rem;
}
~~~

The two-value order is row gap first, then column gap. A single value sets both:

~~~css
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
~~~

Use the longhands when the two directions need different spacing:

~~~css
.gallery {
  row-gap: 1rem;
  column-gap: 1.5rem;
}
~~~

In a row flex container, `column-gap` separates items along the row and `row-gap` separates wrapped lines. In a column flex container, `row-gap` separates items down the column and `column-gap` separates wrapped columns.

Use `gap` for spacing owned by the layout container. Use margins when spacing belongs to a particular item, such as space around a single icon. Unlike adjacent margins, gaps do not collapse.

### Gap compared with distribution

`gap` sets a minimum space between adjacent items or tracks. `justify-content: space-between` distributes any remaining free space between content. They can be combined:

~~~css
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
~~~

The gap keeps a minimum separation when the items wrap or when little free space remains. The content distribution shares any extra room.

## Auto margins in Flexbox

An auto margin on a flex item can absorb positive free space before `justify-content` distributes any that remains. This is useful for pushing one item away from a group:

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

In a left-to-right row, the account link moves to the far end. The logical margin follows writing direction. If auto margins consume all available space, `justify-content` has no extra space left to distribute on that axis.

## Baseline alignment

Baseline alignment lines up the text baselines of items rather than their box edges. It is helpful when neighboring labels or headings use different font sizes.

~~~css
.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}
~~~

The price and its unit align along their text baselines. Baseline alignment is different from `center`, which centers the boxes.

## Safe alignment for overflow

Some alignment values can place content outside the visible start of a container when the item is larger than the available space. Where supported, the `safe` modifier asks the browser to fall back toward the start when the requested alignment would cause this kind of overflow:

~~~css
.dialog-content {
  align-items: safe center;
}
~~~

Treat safe overflow alignment as an advanced option and check the browsers you support. For essential content, also ensure the container can grow or scroll instead of relying only on an alignment value.

## Common patterns

### Center a card inside a grid cell

~~~css
.feature-grid {
  display: grid;
  place-items: center;
}
~~~

This centers each eligible grid item inside its own grid area. It does not center the grid's tracks inside the outer container.

### Center the grid tracks in a larger container

~~~css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 12rem);
  justify-content: center;
}
~~~

This centers the tracks as a group. It does not set the alignment of each item inside its own cell.

### Keep cards at the top with consistent space

~~~css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  align-items: start;
  gap: 1rem;
}
~~~

This lets each card keep its natural content height while the container maintains consistent row and column spacing.

### Push one action to the end of a toolbar

~~~css
.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toolbar__last-action {
  margin-inline-start: auto;
}
~~~

The auto margin consumes available main-axis space before the remaining alignment is applied.

## Troubleshooting alignment

| Symptom | Likely cause | What to check |
| :--- | :--- | :--- |
| `justify-content` appears to do nothing in Flexbox | Items fill the main axis after flex sizing | Check item sizes, `flex-grow`, and available width |
| `align-content` appears to do nothing in Flexbox | The container has one line or no extra cross-axis space | Enable wrapping and give the container room in the cross axis |
| `justify-content` appears to do nothing in Grid | Flexible tracks already fill the container | Use fixed or intrinsic track sizes if you want leftover space for distribution |
| An item does not stretch | It has a fixed size, or the chosen property is not item alignment | Check automatic sizing and use `align-items` or `justify-items` in Grid |
| A flex child ignores `justify-self` | Flex items do not use it for normal positioning | Use `justify-content` or a main-axis auto margin |
| `gap` seems to add no space | There are no adjacent rows or columns in that direction | Check `flex-direction`, wrapping, and the number of tracks |
| Centered content is cut off | The content is larger than its alignment area | Let the container grow, allow scrolling, or use safe alignment where supported |

## Practice

1. Create a three-column grid. Center each item in its own cell with `place-items`, then change the track distribution with `place-content`.
2. Give the grid fixed-width columns and a larger container so there is free space to distribute.
3. Build a wrapping row of tags with separate row and column gaps.
4. Make a row toolbar with a final account action pushed to the end by a logical auto margin.
5. Change the toolbar to a column and identify which axis `justify-content` now controls.
6. Align a large price and a small unit using baseline alignment.
7. Inspect what happens when an aligned item is larger than its grid area.

## Key points

- Identify the layout and its axes before choosing a `justify-*` or `align-*` property.
- In Grid, justify follows the inline axis and align follows the block axis.
- In Flexbox, justify follows the main axis and align follows the cross axis.
- Self-alignment positions an item inside its area. Content-alignment positions tracks or lines inside a container.
- The `*-items` properties set defaults for children; `*-self` properties set individual alignment.
- Flexbox does not use `justify-items` or `justify-self` for normal item alignment.
- Alignment needs available space; it does not automatically create it.
- `gap` creates space between rows and columns without adding space at the container's outside edges.
- Auto margins can absorb free space before Flexbox content distribution.
- Baseline alignment lines up text baselines rather than box edges.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [27 - CSS Grid Layout](27-css-grid.md) | [Q&A](../qnas/28-alignment-and-gaps.md) | [Example](../examples/28-alignment-and-gaps.md) | [29 - Multi-column Layout](29-multi-column-layout.md) |
