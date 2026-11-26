# 24 - Overflow and Scrolling: Questions and Answers

## Multiple-choice questions

### 1. What is the default value of `overflow`?

- **A.** `hidden`
- **B.** `auto`
- **C.** `visible`
- **D.** `clip`

**Answer: C.** `visible` allows content to paint outside the box instead of clipping it. It does not create a `scroll container`.

### 2. Which statement describes `overflow`: `hidden`?

- **A.** It clips content and still allows programmatic scrolling.
- **B.** It never clips content.
- **C.** It forbids all scrolling mechanisms.
- **D.** It always shows scrollbars.

**Answer: A.** `hidden` clips at the padding box and does not provide direct scrolling UI, but scripts can still scroll the `scroll container` to reveal clipped content.

### 3. What is the main difference between `hidden` and `clip`?

- **A.** `clip` allows script scrolling and `hidden` does not.
- **B.** `hidden` allows programmatic scrolling, while `clip` forbids scrolling.
- **C.** `clip` always shows scrollbars.
- **D.** They are identical values.

**Answer: B.** `clip` clips without creating a `scroll container`. `hidden` still creates one and can be scrolled programmatically.

### 4. What does `overflow`: `auto` usually do?

- **A.** Shows a scrollbar even if content fits.
- **B.** Allows scrolling when content overflows.
- **C.** Removes all content outside the box without scrolling.
- **D.** Makes the content position fixed.

**Answer: B.** `auto` is a practical choice for bounded regions that should scroll only when they have scrollable `overflow`.

### 5. What is the usual behavior of `overflow`: scroll?

- **A.** It creates a `scroll container` even if content fits.
- **B.** It never creates a `scroll container`.
- **C.** It only clips shadows.
- **D.** It behaves exactly like `visible`.

**Answer: A.** scroll creates a scrolling mechanism whether or not content currently overflows. Some platforms use overlay scrollbars, so their visual appearance can differ.

### 6. What is a `scrollport`?

- **A.** The `visible` window through which a `scroll container`'s content is viewed
- **B.** The entire document tree
- **C.** The part of the page containing only images
- **D.** A CSS unit

**Answer: A.** The `scrollport` is the `visible` area of a `scroll container`. In common cases, it aligns with the container's padding box.

### 7. In the two-value `overflow` shorthand, what order are the values in?

- **A.** Vertical, then horizontal
- **B.** Horizontal, then vertical
- **C.** Inline, then font size
- **D.** Block, then color

**Answer: B.** The first value sets ``overflow`-x` and the second sets ``overflow`-y`. A single value applies to both axes.

### 8. What can happen to ``overflow`-y`: `visible` when ``overflow`-x` is `hidden`?

- **A.** It must stay `visible`.
- **B.** It can compute to `auto`.
- **C.** It becomes `display`: none.
- **D.** It becomes position: fixed.

**Answer: B.** When one axis uses a scrollable value, `visible` on the other axis computes to `auto`. Inspect computed values when axis behavior seems unexpected.

### 9. Which value clips content without creating a new formatting context by itself?

- **A.** scroll
- **B.** `hidden`
- **C.** `clip`
- **D.** `auto`

**Answer: C.** `clip` does not establish a new formatting context. Pair it with `display`: `flow-root` if both clipping and a new block formatting context are needed.

### 10. Which property explicitly creates a new block formatting context without clipping `overflow`?

- **A.** `display`: `flow-root`
- **B.** position: static
- **C.** `overflow`: `visible`
- **D.** z-index: 1

**Answer: A.** `flow-root` expresses the layout goal directly. `hidden`, `auto`, and scroll can also create a formatting context on block boxes, but they have `overflow` behavior too.

### 11. What is a reasonable fix for a long unbroken identifier that causes horizontal `overflow`?

- **A.** `overflow`-wrap: anywhere
- **B.** position: fixed
- **C.** visibility: `hidden`
- **D.** z-index: -1

**Answer: A.** `overflow`-wrap: anywhere allows an otherwise unbreakable token to wrap at an available opportunity.

### 12. What can `scrollbar-gutter`: stable help with?

- **A.** Reserving space for classic scrollbars to reduce layout shifts
- **B.** Preventing keyboard focus
- **C.** Making every scrollbar overlay the content
- **D.** Disabling scrolling

**Answer: A.** On systems where scrollbars consume layout space, reserving a gutter can keep content alignment stable when a scrollbar appears.

### 13. What does `scroll-behavior`: smooth affect?

- **A.** Every user wheel and touch scroll
- **B.** Certain programmatic or navigation scrolling operations
- **C.** The element's width
- **D.** Scrollbar colors only

**Answer: B.** It can make scrolling caused by navigation or scripts smooth. It does not control direct user scrolling, and a user agent may ignore the property.

### 14. What does `overscroll-behavior`: `contain` do at a nested scroller's boundary?

- **A.** Prevents scroll chaining to ancestor containers
- **B.** Makes the scroller grow forever
- **C.** Forces a scrollbar to appear
- **D.** Hides all content

**Answer: A.** `contain` prevents boundary actions such as scroll chaining to ancestors while keeping local overscroll feedback where supported.

### 15. Which ancestor determines the nearest `scrollport` used by a sticky element?

- **A.** The nearest ancestor `scroll container`
- **B.** Always the body element
- **C.** The previous sibling
- **D.** The nearest element with a border

**Answer: A.** Sticky positioning follows the nearest ancestor `scroll container`'s `scrollport`. An `overflow` setting on an unexpected wrapper can change that ancestor.

## True or false

### 16. `overflow`: `hidden` and `overflow`: `clip` have identical scrolling behavior.

**Answer: False.** `hidden` still permits programmatic scrolling and creates a `scroll container`. `clip` forbids scrolling and does not create a `scroll container`.

### 17. Content clipped by `overflow`: `hidden` can never be brought into view by script.

**Answer: False.** A `hidden` `scroll container` can still be scrolled programmatically, even though it does not offer direct scrolling UI.

### 18. `overflow`: `clip` creates a `scroll container`.

**Answer: False.** `clip` clips content but does not create a `scroll container` or allow scrolling.

### 19. `overflow`: `visible` is a `scroll container`.

**Answer: False.** `visible` lets content paint outside the box and does not create a `scroll container`.

### 20. `overflow`: `auto` always displays a scrollbar, even when content fits.

**Answer: False.** `auto` provides a scrolling mechanism when content overflows. Scrollbar visibility also depends on the platform.

### 21. `overflow`: scroll can create a `scroll container` even when its content fits.

**Answer: True.** It provides a scrolling mechanism consistently where scrollbars are displayed, even if there is no current `overflow` to scroll.

### 22. A block box with `overflow`: `hidden` can establish an independent formatting context.

**Answer: True.** Scrollable `overflow` values such as `hidden` establish an independent formatting context on a block box, in addition to clipping behavior.

### 23. `overflow`: `clip` establishes a block formatting context by itself.

**Answer: False.** `clip` does not create one. Add `display`: `flow-root` if a new formatting context is also needed.

### 24. Adding `overflow`: `auto` to a wrapper can change which `scrollport` a sticky descendant follows.

**Answer: True.** The wrapper can become the nearest `scroll container`, so the sticky element follows that wrapper's `scrollport`.

### 25. Scrolling remains available in printed output in the same way as on a screen.

**Answer: False.** Paper cannot be scrolled. Print styles should reveal essential content that was placed in a bounded scrolling region.

## Short-answer questions

### 26. What is the difference between ink `overflow` and scrollable `overflow`?

**Answer:** Ink `overflow` comes from visual effects such as shadows and outlines that extend beyond a box. Scrollable `overflow` is content extending outside the box's padding edge that needs a scrolling mechanism to be reached.

### 27. What is the difference between a `scroll container` and a `scrollport`?

**Answer:** The `scroll container` is the box that has scrollable `overflow` and can be moved. Its `scrollport` is the `visible` window through which the scrollable area is viewed.

### 28. When is `overflow`: `hidden` appropriate?

**Answer:** Use it when clipping is an intended part of the design, such as cropping an image. Remember that programmatic scrolling remains possible and the element is still a `scroll container`.

### 29. When is `overflow`: `clip` appropriate?

**Answer:** Use it when content should be clipped and no scrolling is wanted. Unlike `hidden`, `clip` forbids scrolling and does not establish a formatting context by itself.

### 30. How can you combine clipping with float containment or another new block formatting context?

**Answer:** Use `overflow`: `clip` together with `display`: `flow-root`. `clip` provides clipping, and `flow-root` establishes the formatting context.

### 31. Why is `overflow`: `auto` often used on a panel?

**Answer:** It allows a panel to scroll when its content is larger than its available area, without requiring a scrolling mechanism when the content fits.

### 32. What is scroll chaining?

**Answer:** Scroll chaining occurs when a nested scroller reaches its boundary and a scroll gesture continues moving an ancestor `scroll container`.

### 33. What is the difference between `overscroll-behavior`: `contain` and none?

**Answer:** `contain` prevents non-local boundary behavior such as scroll chaining while preserving local overscroll feedback where available. none also suppresses local boundary effects.

### 34. How can a scrollbar cause a layout shift?

**Answer:** On platforms where a scrollbar takes up layout width, its appearance can make the content area narrower. Reserving a gutter with `scrollbar-gutter`: stable can keep alignment steadier.

### 35. Why might a sticky heading stop following the page after an `overflow` rule is added to a wrapper?

**Answer:** That wrapper may become the nearest `scroll container`. The sticky heading then follows the wrapper's `scrollport` instead of the page viewport.

### 36. How should you investigate unwanted page-wide horizontal scrolling?

**Answer:** Find the element wider than the viewport. Check fixed widths, long unbreakable text, media without a maximum inline size, and flex or grid children that cannot shrink. Fix the cause or add a local scroll region if the content is intentionally wide.

### 37. How can a keyboard user reach a wide table inside a horizontal scroller?

**Answer:** Make the scroll region keyboard-focusable where needed, give it a useful accessible name, keep focus `visible`, and ensure the user can scroll the region without losing the page context.

## Read the CSS

### 38. Does this panel `clip` content if it fits within 20rem?

~~~css
.panel {
  inline-size: 20rem;
  overflow: auto;
}
~~~

**Answer: No clipping is needed when the content fits.** The panel can scroll if content overflows, but `auto` does not require a scrollbar when there is nothing to scroll.

### 39. Can script move this box's scroll position?

~~~css
.crop {
  overflow: hidden;
}
~~~

**Answer: Yes.** `hidden` clips the `visible` content but keeps a `scroll container`, so programmatic scrolling can still bring clipped content into view.

### 40. Can a script scroll this clipped element?

~~~css
.crop {
  overflow: clip;
}
~~~

**Answer: No.** `clip` forbids scrolling by any mechanism and does not create a `scroll container`.

### 41. What is surprising about the computed vertical value here?

~~~css
.panel {
  overflow-x: hidden;
  overflow-y: visible;
}
~~~

**Answer:** ``overflow`-y` computes to `auto` rather than remaining `visible`. A scrollable value on one axis changes how `visible` on the other axis computes.

### 42. Does this create a `scroll container` when no content overflows?

~~~css
.log {
  overflow: scroll;
}
~~~

**Answer: Yes.** scroll creates a `scroll container` and requests a scrolling mechanism even when the current content fits, subject to how the platform displays scrollbars.

### 43. Will this property stop a nested scroller from chaining to the page?

~~~css
.sidebar {
  max-block-size: 70vh;
  overflow-y: auto;
  overscroll-behavior: contain;
}
~~~

**Answer: Yes.** At the sidebar's boundary, `contain` prevents scroll chaining to ancestor scroll containers. It still allows the sidebar itself to scroll.

### 44. Why might the sticky heading follow this panel instead of the document?

~~~css
.wrapper {
  overflow: auto;
}

.heading {
  position: sticky;
  inset-block-start: 0;
}
~~~

**Answer:** The wrapper can become the nearest `scroll container`. Sticky positioning follows its `scrollport`, even if the wrapper is not the scroll area the author intended.

### 45. What happens to a scroll panel in print with this rule?

~~~css
@media print {
  .message-list {
    max-block-size: none;
    overflow: visible;
  }
}
~~~

**Answer:** The panel is allowed to expand and show its content rather than requiring a screen-style scroll area. This helps make content available in a static printed page.

### 46. How can this image avoid making its parent wider than the viewport?

~~~css
img {
  max-inline-size: 100%;
  block-size: auto;
}
~~~

**Answer:** The image can shrink to fit within its containing block while preserving its aspect ratio. This prevents an oversized intrinsic image from creating unwanted horizontal `overflow`.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [23 - Z-index and Stacking Contexts](23-z-index-and-stacking-contexts.md) | [Lesson](../lessons/24-overflow-and-scrolling.md) | [Example](../examples/24-overflow-and-scrolling.md) | [25 - Floats and Clearing](25-floats-and-clear.md) |
