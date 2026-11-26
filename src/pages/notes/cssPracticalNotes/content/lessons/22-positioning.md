# 22 - Positioning Elements

The `position` property selects how a box is placed. Most boxes follow normal flow, where neighboring content helps determine their positions. Positioned boxes can be visually offset, taken out of flow, kept within a scroll area, or attached to a viewport.

## The position property

The common values are:

| Value | Basic behavior |
| :--- | :--- |
| `static` | The default. The box follows its parent's layout rules. |
| `relative` | The box keeps its normal-flow space and can be visually offset. |
| `absolute` | The box is removed from normal flow and positioned relative to a containing block. |
| `fixed` | The box is removed from normal flow and positioned relative to a fixed-position containing block, usually the viewport. |
| `sticky` | The box keeps its normal-flow space, then shifts in relation to a scrollport when its inset threshold is reached. |

Values other than `static` make the element a positioned box. Positioned boxes can use inset properties such as `top`, `right`, `bottom`, `left`, and the logical inset properties.

## Static positioning

Static positioning is the default. The box is placed by the normal layout rules of its formatting context. Inset properties do not move a statically positioned box.

~~~css
.card {
  position: static;
}
~~~

Writing `position: static` is rarely necessary unless another rule has changed the value and you need to reset it.

## Relative positioning

A relatively positioned box is first placed as if it were static. Then inset properties offset its painted position from that normal-flow location. The box's original space remains reserved, so later content does not move into it.

~~~css
.label {
  position: relative;
  top: 0.25rem;
  left: 0.5rem;
}
~~~

Positive `top` moves the box down; positive `left` moves it to the right. The box can overlap nearby content if it is shifted far enough.

### Relative positioning as a containing-block anchor

A common use for `position: relative` is to establish the containing block for an absolutely positioned descendant. The parent does not need to move itself:

~~~css
.card {
  position: relative;
}

.card__badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}
~~~

The badge is positioned relative to the card's padding box. The card remains in normal flow.

## Absolute positioning

An absolutely positioned box is removed from normal flow. It no longer reserves ordinary flow space, so other content is laid out as though the box were not there. It can overlap or obscure other content.

~~~css
.card {
  position: relative;
}

.card__badge {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-end: 0.75rem;
}
~~~

The absolute box uses the nearest ancestor that establishes an absolute-positioning containing block. A positioned ancestor is a common way to establish one, so `position: relative` is often used for the parent. If no ancestor establishes a containing block, the initial containing block is used.

For a non-inline ancestor, the containing block is generally formed by its padding edge. In the example, the badge's logical insets are measured inward from the card's block-start and inline-end edges.

### Inset properties

Physical insets name physical sides:

~~~css
.dialog {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
~~~

Logical insets follow the writing mode:

~~~css
.dialog {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}
~~~

The `inset` shorthand sets `top`, `right`, `bottom`, and `left` in the same value pattern as the `margin` shorthand:

~~~css
.cover {
  position: absolute;
  inset: 0;
}
~~~

With all four insets set to zero, the box is anchored to all four edges of its containing block. Its final size depends on its other sizing properties and the positioning rules.

Percentages for physical horizontal insets are based on the containing block's width; physical vertical insets are based on its height. Logical inset percentages use the size of the containing block in the corresponding axis.

## Fixed positioning

A fixed box is removed from normal flow and positioned relative to a fixed-position containing block. When no ancestor establishes one, this is usually the layout viewport. It stays at that viewport position while the document scrolls.

~~~css
.help-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
}
~~~

Some ancestor properties, including transforms and containment, can establish a containing block for fixed descendants. In that case, the fixed box may be anchored to the ancestor rather than the viewport.

Fixed controls can cover content, especially on small screens or when the page is zoomed. Make sure users can still read and reach content underneath or near them.

## Sticky positioning

A sticky box participates in normal flow and keeps its space. As its nearest scroll container scrolls, the browser can offset the box to keep it within the scrollport and its containing block.

~~~css
.section-heading {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
}
~~~

The inset threshold is important. A sticky box with `top: auto` has no top threshold to stick against. Use an inset on the axis where the box should stick, such as `top: 0` or the logical `inset-block-start: 0`.

Sticky positioning is constrained by the box's containing block. It does not stay pinned past the end of that containing block. It also uses the nearest ancestor scroll container's scrollport. An ancestor with `overflow: auto`, `scroll`, or `hidden` can become that scroll container even if it is not the element you expected to scroll.

Sticky boxes in the same area can overlap. The `z-index` and stacking context rules in the next chapter control their paint order.

## Positioning scheme comparison

| Behavior | Relative | Absolute | Fixed | Sticky |
| :--- | :--- | :--- | :--- | :--- |
| Reserves normal-flow space | Yes | No | No | Yes |
| Can use inset properties | Yes | Yes | Yes | Yes |
| Moves as the document scrolls | With the document | With its containing block | Usually stays relative to viewport | Sticks relative to a scrollport within its containing block |
| Common use | Small visual adjustment or anchor for a child | Badge or overlay inside a component | Viewport-attached control | Heading that stays visible while its section scrolls |

These are general behaviors. The actual containing block and scroll container depend on the layout tree and ancestor properties.

## Choose a positioning value for the task

- Keep `static` for ordinary content that belongs in normal flow.
- Use `relative` for small offsets or to establish a containing block for a child.
- Use `absolute` for overlays or decorations that should not reserve flow space.
- Use `fixed` for a control attached to a fixed-position containing block, often the viewport.
- Use `sticky` for content that should scroll normally and then stay within a scrollport while its containing block allows it.

Positioning is not a replacement for normal layout. Use Flexbox or Grid for arranging groups of content, and use positioning for offsets and overlays where overlapping is intentional.

## Common mistakes

### Expecting absolute positioning to make room

An absolute box is removed from normal flow. Add padding, margin, or another layout track if other content needs space around it.

### Forgetting the containing block

An absolute child may be positioned relative to the initial containing block if no ancestor establishes a containing block. Set `position: relative` on the intended parent when that matches the design.

### Using relative positioning to arrange a whole layout

Relative offsets do not change the box's original flow space. Use a layout system to arrange sections, cards, or columns.

### Assuming fixed always means viewport

A transformed or contained ancestor can establish a fixed-position containing block. Check ancestors when a fixed element moves with a component instead of the viewport.

### Expecting sticky to work without a threshold

Sticky positioning needs a non-`auto` inset in the axis where it should stick. Check for an ancestor scroll container and ensure the containing block is tall enough to allow movement.

### Putting important content under a fixed overlay

Fixed boxes can overlap content. Ensure the page has enough space and that zoomed or narrow layouts remain usable.

## Try it yourself

1. Add `position: relative` and `top: 1rem` to a box. Confirm that its original space remains.
2. Put a badge inside a `position: relative` card and set the badge to `position: absolute`.
3. Remove the card's relative positioning and observe which containing block positions the badge.
4. Replace `top` and `right` with `inset-block-start` and `inset-inline-end`.
5. Set an overlay to `inset: 0` and observe how it covers the containing block.
6. Create a fixed button and scroll. Then add a transform to an ancestor and observe the containing-block change.
7. Make a heading sticky with `top: 0`, then remove the inset and compare.
8. Give the sticky heading's ancestor `overflow: auto`. Check which scroll container the sticky box follows.
9. Shorten the sticky element's containing block and observe where sticking stops.
10. Use two sticky headings and consider how their overlap should be handled.

## Key points

- `static` is the default and ignores inset properties.
- `relative` keeps normal-flow space and offsets the painted box.
- `absolute` is removed from normal flow and uses a containing block.
- `fixed` is removed from flow and usually follows the viewport unless an ancestor establishes its containing block.
- `sticky` reserves flow space and shifts relative to a scrollport after an inset threshold is reached.
- A positioned ancestor is a common containing-block anchor for absolute descendants.
- Logical insets adapt to writing direction.
- Positioned boxes can overlap content, so reserve space where needed.
- The next chapter covers `z-index` and stacking contexts.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [21 - Normal Flow and Formatting Contexts](21-normal-flow-and-formatting-contexts.md) | [Q&A](../qnas/22-positioning.md) | [Example](../examples/22-positioning.md) | [23 - Z-index and Stacking Contexts](23-z-index-and-stacking-contexts.md) |
