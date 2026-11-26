# 23 - Z-index and Stacking Contexts

When boxes overlap, CSS decides which one is painted in front. The `z-index` property can change the stack order of eligible boxes, while a stacking context keeps a group of boxes together as one unit in its parent stack.

## Learning goals

After this chapter, you should be able to:

- Read the basic paint order when elements overlap.
- Use `z-index` to order elements in the same stacking context.
- Explain why a child with a very large `z-index` can remain behind another element.
- Recognize common properties that create stacking contexts.
- Debug overlap problems by checking ancestors and stacking contexts.
- Keep visual stacking from undermining document order and accessibility.

## The z-axis

A page has width and height, and CSS also paints boxes along a conceptual third axis. Boxes painted later or at a higher stack level can appear in front of other boxes.

The z-axis only matters where painted areas overlap. It does not change an element's size or normal layout `position`.

~~~css
.notice {
  position: relative;
  z-index: 2;
}
~~~

This asks the notice to paint above lower stack levels in the stacking context where it participates. The number does not move the notice across the entire document's stacking contexts.

## What `z-index` controls

For positioned boxes, `z-index` sets a stack level in the current stacking context. An integer value also creates a new stacking context for the element and its descendants.

~~~css
.back {
  position: relative;
  z-index: 1;
}

.front {
  position: relative;
  z-index: 2;
}
~~~

If these boxes overlap and participate in the same stacking context, .front is painted in front because its stack level is higher.

The value is an integer, not a length. It can be positive, zero, or negative.

~~~css
.behind {
  position: relative;
  z-index: -1;
}
~~~

Negative levels place a stacking context behind level-zero content in its parent context. Use negative values carefully because a box can end up behind a parent background or become hard to see.

### `auto` and zero are different

For a positioned element, `z-index`: `auto` uses the automatic stack level. It does not create a stacking context for an ordinary relative or absolute box. Fixed and sticky boxes form a stacking context even when their `z-index` is `auto`.

An integer value of zero is explicit:

~~~css
.auto-layer {
  position: relative;
  z-index: auto;
}

.local-layer {
  position: relative;
  z-index: 0;
}
~~~

The second element creates a stacking context. Its descendants are grouped inside it, even though the parent's stack level is zero.

## Which elements can use `z-index`?

Positioned boxes can use `z-index`. A normal static block does not respond to `z-index` in the usual way:

~~~css
.static-box {
  position: static;
  z-index: 10; /* Does not position this ordinary block above its siblings. */
}
~~~

Flex and `grid` items are an important exception. A `flex` item or `grid` item can use a non-`auto` `z-index` to control its stacking without first setting `position`.

~~~css
.grid-item {
  z-index: 1;
}
~~~

This rule applies to the item in its `flex` or `grid` container. It does not make every descendant globally higher than every other page element.

## What is a stacking context?

A stacking context is a local group of boxes that the browser paints as one unit in its parent stacking context. A child context is atomic from the parent's point of view: the parent compares the child context as a whole with its sibling contexts.

Think of it as a deck of cards inside another deck:

~~~text
Root stacking context
|
|-- Card context: z-index 1
|   |-- Card content
|   +-- Badge: z-index 9999
|
+-- Menu context: z-index 2
~~~

The badge has a larger number than the menu, but it cannot escape the card context. The card context is at level 1 and the menu context is at level 2, so the menu is painted in front of the entire card context.

To bring the badge in front, change the stacking order of the card context and menu context, or remove an unnecessary context boundary. Increasing only the badge's number cannot cross its parent context.

### A practical example

~~~html
<div class="card">
  <span class="badge">Featured</span>
</div>

<aside class="menu">Menu</aside>
~~~

~~~css
.card {
  position: relative;
  z-index: 1;
}

.badge {
  position: absolute;
  z-index: 9999;
}

.menu {
  position: relative;
  z-index: 2;
}
~~~

The badge belongs to the card's stacking context. The browser compares the card context at level 1 with the menu at level 2. The menu wins even though the badge has `z-index`: 9999.

If the design needs the card above the menu, raise the card context to a suitable level in the same parent context:

~~~css
.card {
  position: relative;
  z-index: 3;
}
~~~

Keep the values understandable. A small, planned scale is easier to maintain than continually adding larger numbers.

## A simplified paint-order overview

Within a stacking context, the browser paints different categories in a defined order. A simplified overview, from back to front, is:

1. The stacking context element's background and border.
2. Child stacking contexts with negative stack levels, starting with the most negative.
3. In-flow, non-positioned block content.
4. Non-positioned floats.
5. In-flow inline content.
6. Positioned content at the automatic or zero stack level.
7. Child stacking contexts with positive stack levels, from lower to higher.

This overview helps explain common overlaps, but actual layout models add details. For example, `flex` and `grid` items have their own stacking rules. When diagnosing a real page, check the relevant layout model as well as the stacking context.

Within the same stacking context, equal stack levels are generally painted in tree order, so a later sibling can appear in front of an earlier sibling. The order can differ when other layout properties, such as `flex` or `grid` order, affect painting order.

## Common stacking context creators

A stacking context can be created by more than a positioned element with an integer `z-index`. Common causes include:

| Cause | Example |
| :--- | :--- |
| The root element | The document root always forms the root stacking context. |
| A positioned element with a non-`auto` `z-index` | `position`: relative; `z-index`: 1; |
| A fixed or sticky element | These create a context even when `z-index` is `auto`. |
| A `flex` or `grid` item with non-`auto` `z-index` | `z-index`: 1; on the item |
| Opacity below one | `opacity`: 0.9; |
| A `transform` or `filter` other than none | `transform`: translateX(0); |
| Isolation | `isolation`: isolate; |
| Paint containment | `contain`: paint; |

This is a list of common causes, not every cause. CSS evolves, and properties such as `will-change` can also request behavior that creates a stacking context.

Some properties create both a stacking context and a containing block for positioned descendants. Others create a stacking context without changing the containing block in the same way. Treat stacking contexts and containing blocks as separate concepts, even when one CSS declaration creates both.

### A `transform` can affect stacking

A `transform` creates a stacking context even when the `transform` looks visually neutral:

~~~css
.panel {
  transform: translateX(0);
}
~~~

This can change how descendants stack relative to outside elements. A `transform` can also establish a containing block for absolute and fixed descendants. If a high `z-index` stops working after a `transform` is added, inspect that transformed ancestor.

### Opacity groups the result

An element with `opacity` below one is painted as a group. Its children cannot use `z-index` to appear outside that group's place in the parent stacking context.

~~~css
.card {
  opacity: 0.99;
}
~~~

Even a nearly opaque value creates a context. Do not add `opacity` as a layering fix unless the visual transparency is wanted.

### Isolation as a deliberate boundary

`isolation`: isolate creates a stacking context without changing the element's `position`:

~~~css
.component {
  isolation: isolate;
}
~~~

This can be useful when a component's internal layers should remain local. It also means its descendants cannot compete directly with elements outside that context.

## Stacking context is not a containing block

A containing block is a reference rectangle used to calculate the `position` or size of a descendant. A stacking context is a group used to calculate paint order.

One property can create both, but they answer different questions:

- **Containing block:** Where is this positioned child measured from?
- **Stacking context:** Which group is painted in front?

For example, a transformed ancestor can establish a containing block for positioned descendants and create a stacking context. `isolation`: isolate creates a stacking context, but its purpose is to isolate painting, not to provide a new positioned containing block.

## `z-index` cannot undo clipping

A large stack level cannot make content paint outside a clipping ancestor. If a menu is cut off by `overflow`: hidden, raising its `z-index` does not remove the clip.

~~~css
.panel {
  overflow: hidden;
}

.menu {
  position: absolute;
  z-index: 100;
}
~~~

Check clipping and scrolling separately from stacking. The correct fix might be changing the `overflow` behavior, moving the menu elsewhere in the document, or using an appropriate browser-managed overlay feature.

## A reliable debugging process

When an element appears behind the wrong thing:

1. Identify the two boxes that overlap.
2. Check whether the intended box can use `z-index`. For an ordinary static block, it usually cannot.
3. Find the nearest ancestor stacking context for each box.
4. Compare those ancestor contexts at the point where they share a parent context.
5. Inspect ancestors for `z-index`, `transform`, `opacity`, filters, `isolation`, paint containment, and other context creators.
6. Check whether clipping or `overflow`, rather than stacking, hides the content.
7. Check source order when the boxes share a level.
8. Use a small, documented set of layer values instead of escalating numbers.

Browser developer tools can show computed styles and the ancestor chain. Inspecting each ancestor is often more useful than changing the child number again.

## Keep visual order understandable

Changing `z-index` changes paint order. It does not reorder HTML source, keyboard focus, or screen reader reading order. Keep the DOM in a sensible reading and interaction order, and use stacking only to control visual overlap.

Large values do not make a layer globally dominant. They are compared within a stacking context, and another stacking context can be painted above the entire group.

## Try it yourself

1. Overlap two positioned siblings. Give them `z-index`: 1 and `z-index`: 2, then swap the values.
2. Set both siblings to the same value and change which one comes later in the source.
3. Put a child with `z-index`: 9999 inside a parent context at level 1. Add a sibling context at level 2 and observe which appears in front.
4. Raise the parent context and observe how the whole group moves together.
5. Change a parent's `opacity` from 1 to 0.99. Inspect how that creates a local context for its descendants.
6. Add `transform`: translateX(0) to an ancestor and check both stacking and containing-block behavior.
7. Apply `isolation`: isolate to a component and give one child an integer `z-index`.
8. Put an absolutely positioned menu inside an ancestor with `overflow`: hidden. Observe why a larger `z-index` does not remove clipping.
9. Make two elements `grid` items and use `z-index` without `position`.
10. Inspect the document's reading and focus order after changing visual stacking.

## Key points

- `z-index` controls stack level within a stacking context; it is not a page-wide priority number.
- An integer `z-index` on a positioned box creates a new stacking context.
- A stacking context is atomic in its parent. Descendants cannot paint outside the group's `position`.
- Flex and `grid` items can use non-`auto` `z-index` without being positioned.
- Fixed and sticky boxes form stacking contexts even with `z-index`: `auto`.
- Opacity, transforms, `isolation`, paint containment, and other features can create contexts.
- A containing block controls positioning measurements; a stacking context controls paint grouping.
- Clipping and stacking are separate problems.
- Visual paint order does not replace a meaningful DOM and focus order.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [22 - Positioning Elements](22-positioning.md) | [Q&A](../qnas/23-z-index-and-stacking-contexts.md) | [Example](../examples/23-z-index-and-stacking-contexts.md) | [24 - Overflow and Scrolling](24-overflow-and-scrolling.md) |
