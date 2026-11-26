# 24 - Overflow and Scrolling

Content overflows when it extends beyond the area available to its box. CSS can let that content remain `visible`, `clip` it, or provide a way to scroll it into view. Choosing the right behavior matters for readable content, nested panels, sticky elements, and responsive layouts.

## Learning goals

After this chapter, you should be able to:

- Explain the difference between `visible` `overflow`, clipping, and scrolling.
- Choose among `visible`, `hidden`, `clip`, scroll, and `auto`.
- Set `overflow` on one or both axes and understand their interaction.
- Identify a `scroll container` and its `scrollport`.
- Prevent accidental horizontal `overflow`.
- Use nested scrolling and overscroll behavior deliberately.
- Keep scrollable content usable with a keyboard and in print.

## What `overflow` means

A box's content overflows when it extends beyond the box's padding edge. Some visual effects, such as shadows and outlines, can extend beyond a box without changing its layout or necessarily creating a scrollable area. This is often called ink `overflow`.

Scrollable `overflow` is content that extends beyond a `scrollport` and can be brought into view by scrolling. Large fixed-width content, long unbroken strings, or content with a constrained height can cause it.

~~~css
.panel {
  inline-size: 20rem;
  block-size: 10rem;
  overflow: auto;
}
~~~

If the content does not fit, `auto` allows the user agent to provide scrolling. If it fits, no scrolling mechanism is needed.

## The `overflow` values

The `overflow` property accepts one or two values. A single value applies to both axes. Two values set the horizontal and vertical axes, in that order.

| Value | What it does |
| :--- | :--- |
| `visible` | Content can paint outside the box. The box is not a `scroll container`. |
| `hidden` | Clips content at the padding box. It provides no direct scrolling UI, but programmatic scrolling can still reach the clipped content. It is a `scroll container`. |
| `clip` | Clips content at the `overflow` `clip` edge. Scrolling is forbidden, and the box is not a `scroll container`. By itself, it does not create a new formatting context. |
| scroll | Clips `overflow` and creates a `scroll container`. A scrolling mechanism is provided even when the content currently fits, where the user agent displays one. |
| `auto` | Creates a `scroll container` and provides a scrolling mechanism when content overflows, where the user agent displays one. |

The exact appearance of scrollbars depends on the operating system and browser. Some interfaces use overlay scrollbars that do not take up layout space.

### `visible`

`visible` is the default. Content is not clipped just because it extends beyond the box.

~~~css
.preview {
  overflow: visible;
}
~~~

This is useful when decorations, menus, or other content should extend outside a box. It does not create a `scroll container`.

### `hidden`

`hidden` clips content and suppresses direct user scrolling such as dragging a scrollbar or using a touch scroll gesture on that box. The clipped content can still be scrolled into view programmatically, so `hidden` still creates a `scroll container`.

~~~css
.crop {
  overflow: hidden;
}
~~~

Use `hidden` when clipping is intended, such as cropping an image. Do not use it just to hide a scrollbar if users still need to reach the content.

### `clip`

`clip` clips at the `overflow` `clip` edge and does not allow scrolling by the user or script. It does not create a `scroll container` or a new formatting context.

~~~css
.decorative-crop {
  overflow: clip;
}
~~~

If you need both clipping and a new block formatting context, combine `clip` with `display`: `flow-root`:

~~~css
.crop-and-contain {
  display: flow-root;
  overflow: clip;
}
~~~

### scroll

scroll creates a `scroll container` even when its content fits. Where scrollbars are `visible` and take up space, users can see the scrolling area in a consistent place.

~~~css
.log {
  max-block-size: 18rem;
  overflow: scroll;
}
~~~

This can leave an unnecessary scrollbar when the content is short. Choose it when a persistent scrolling mechanism is useful.

### `auto`

`auto` creates a `scroll container` and allows scrolling when content overflows. It is usually the practical choice for a bounded panel.

~~~css
.results {
  max-block-size: 24rem;
  overflow: auto;
}
~~~

When the content fits, the browser does not need to show a scrolling mechanism. The visual scrollbar may appear only while scrolling, depending on the platform.

## Overflow by axis

The physical longhands are ``overflow`-x` and ``overflow`-y`. They control left/right and top/bottom `overflow` respectively.

~~~css
.code-sample {
  overflow-x: auto;
  overflow-y: hidden;
}
~~~

The logical longhands ``overflow`-inline` and ``overflow`-block` follow the element's writing mode.

~~~css
.code-sample {
  overflow-inline: auto;
  overflow-block: hidden;
}
~~~

Prefer logical properties when the rule should adapt to writing direction and writing mode.

### How the two axis values interact

The axes are not completely independent. If one axis is set to a scrollable value such as `hidden`, scroll, or `auto`, a `visible` value on the other axis computes to `auto`. A `clip` value on one axis computes to `hidden` if the other axis is scrollable.

For example:

~~~css
.panel {
  overflow-x: hidden;
  overflow-y: visible;
}
~~~

The vertical value does not remain `visible` as written. Because the horizontal axis is scrollable, `visible` computes to `auto` on the other axis. Check the computed values in developer tools when one-axis `overflow` behaves unexpectedly.

For a consistent two-axis crop, set both axes to `clip`:

~~~css
.image-window {
  overflow-x: clip;
  overflow-y: clip;
}
~~~

## Scroll containers and scrollports

A `scroll container` is a box whose `overflow` can be moved through a scrollable area. The `scrollport` is the `visible` window through which that area is viewed. In common cases, the `scrollport` aligns with the container's padding box.

~~~css
.message-list {
  max-block-size: 20rem;
  overflow-y: auto;
}
~~~

This message list is a `scroll container` if it has scrollable `overflow`. Its padding box is the `scrollport`. Scrolling can be initiated by a scrollbar, touch, keyboard interaction, or browser APIs.

A size limit is usually needed for a useful internal scroll area. Without a constrained block size, a block can grow to fit its content, leaving nothing to scroll inside it.

## The root page and nested scrolling

The document viewport scrolls the page. A nested `scroll container` scrolls only its own content until it reaches an edge.

~~~css
.sidebar {
  max-block-size: 75vh;
  overflow-y: auto;
}
~~~

Nested scrollers can be useful for a sidebar, chat history, or code sample. Avoid making important content reachable only through a small area that is difficult to discover or operate.

### Scroll chaining and overscroll

Scroll chaining happens when a scroll gesture reaches the edge of a nested `scroll container` and continues scrolling an ancestor. This is often helpful because the page keeps moving when a panel reaches its end.

`overscroll-behavior` controls this boundary behavior on a `scroll container`:

~~~css
.sidebar {
  overscroll-behavior: contain;
}
~~~

`contain` prevents scrolling from chaining to ancestor containers while preserving local overscroll feedback where supported. none also suppresses local boundary effects. Use these values selectively. Blocking scroll chaining can surprise users if the nested region is small or hard to scroll.

## Overflow and formatting contexts

For block boxes, `overflow` values other than `visible` and `clip` establish an independent formatting context. This affects layout interactions such as floats and margin collapsing.

That means `hidden`, `auto`, and scroll can have layout effects in addition to clipping and scrolling. If the only goal is to `contain` floats or isolate block layout, `display`: `flow-root` expresses that intent without clipping content.

`clip` does not establish a formatting context by itself. Combine it with `flow-root` only if both effects are wanted.

## Avoid accidental horizontal scrolling

A page-wide horizontal scrollbar is often caused by one child being wider than the viewport. Inspect the overflowing element instead of hiding `overflow` on the whole page.

Common causes include:

- A fixed width that is too large for a narrow screen.
- A long URL, code token, or identifier that cannot wrap.
- An image or video with no maximum inline size.
- A grid or flex child whose minimum size prevents it from shrinking.
- A width based on the viewport that includes extra margins or padding.

Useful responsive rules include:

~~~css
img,
video {
  max-inline-size: 100%;
  block-size: auto;
}

.long-token {
  overflow-wrap: anywhere;
}
~~~

If a table or code block needs horizontal scrolling, `contain` the `overflow` around that component instead of clipping the entire document.

~~~css
.table-region {
  max-inline-size: 100%;
  overflow-x: auto;
}
~~~

Give a keyboard user a way to focus and scroll a region when its contents need horizontal navigation:

~~~html
<div class="table-region" role="region" aria-label="Scrollable results table" tabindex="0">
  <!-- Place the wide table here. -->
</div>
~~~

## Scrollbar space and layout

On platforms where scrollbars take up layout space, a scrollbar can make the content area narrower when it appears. This may cause a small layout shift.

`scrollbar-gutter` can reserve space for a scrollbar:

~~~css
.article-panel {
  overflow-y: auto;
  scrollbar-gutter: stable;
}
~~~

The stable value reserves a gutter for classic scrollbars. Overlay scrollbars may not need or show a gutter. Use this when stable alignment matters and check the result in the target layouts.

## Smooth scrolling

`scroll-behavior`: smooth can animate scrolling caused by navigation or script for a `scroll container`. It does not control a user's direct wheel, touch, or keyboard scrolling.

~~~css
html {
  scroll-behavior: smooth;
}
~~~

Smooth movement can help when jumping to a nearby section, but it should respect a visitor's reduced-motion preference:

~~~css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
~~~

Do not make important content depend on an animation. Users should still be able to reach the destination if smooth scrolling is ignored.

## Sticky positioning and `overflow` ancestors

Sticky positioning follows the nearest ancestor `scroll container`'s `scrollport`. Adding `overflow`: `auto`, scroll, or `hidden` to a wrapper can change the `scrollport` a sticky descendant follows, even when that wrapper is not visibly scrolling.

If a sticky heading stops sticking to the page, inspect ancestor `overflow` values and find the nearest `scroll container`. Use `overflow` only where the design calls for clipping or a scroll area.

## Make scrollable content usable

- Give an internal scroller a clear visual boundary or label so users can discover it.
- Keep keyboard focus `visible` when a region can be focused and scrolled.
- Do not hide essential content with `hidden` or `clip`.
- Avoid trapping users in nested scroll areas.
- Preserve access to long content when printing. Scrolling is unavailable on paper, so print styles may need to reveal all relevant content.

~~~css
@media print {
  .message-list {
    max-block-size: none;
    overflow: visible;
  }
}
~~~

## Try it yourself

1. Put several paragraphs in a short panel and compare `visible`, `hidden`, `clip`, scroll, and `auto`.
2. Try ``overflow`-x`: `auto` with a wide code sample. Add a keyboard focus target to its wrapper.
3. Compare `hidden` with `clip` by trying to scroll each region using the keyboard or a browser API.
4. Set ``overflow`-x` to `hidden` and ``overflow`-y` to `visible`. Inspect the computed vertical value.
5. Add `overflow`: `auto` to an ancestor of a sticky heading and observe which `scrollport` it follows.
6. Scroll a nested sidebar to its boundary and compare `overscroll-behavior`: `auto` and `contain`.
7. Add an image wider than its parent, then constrain it with `max-`inline-size``: 100%.
8. Test a long unbroken token with `overflow`-wrap: anywhere.
9. Compare scrollbar space with and without `scrollbar-gutter`: stable.
10. Print the page and check that important scroller content remains available.

## Key points

- Overflow can remain `visible`, be clipped, or be made scrollable.
- `hidden` clips but still allows programmatic scrolling; `clip` forbids scrolling and does not make a `scroll container`.
- `auto` is useful for bounded areas that should scroll only when content overflows.
- A `scroll container`'s `visible` window is its `scrollport`.
- Overflow values on the two axes can affect each other's computed values.
- `overflow` can also establish a formatting context; `flow-root` is clearer when layout containment is the only goal.
- Fix the child that causes unwanted page `overflow` instead of hiding the whole document.
- Use nested scroll areas, smooth scrolling, and overscroll controls with care.
- Make important content accessible by keyboard and in print.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [23 - Z-index and Stacking Contexts](23-z-index-and-stacking-contexts.md) | [Q&A](../qnas/24-overflow-and-scrolling.md) | [Example](../examples/24-overflow-and-scrolling.md) | [25 - Floats and Clearing](25-floats-and-clear.md) |
