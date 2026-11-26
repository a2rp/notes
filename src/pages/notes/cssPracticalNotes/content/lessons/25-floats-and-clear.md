# 25 - Floats and Clearing

Floats move a box toward one side of its containing block and let inline content, such as text, wrap beside it. They were once used to build whole page layouts. Today, floats are mainly useful for text wrapping around images or short callouts. Use Flexbox or Grid for columns, navigation, and page layout.

## What a float does

A float participates in the block formatting context, but it is taken out of the normal flow for the placement of ordinary block boxes. Inline content still responds to it: line boxes become narrower beside the float, and text continues below it after it ends.

~~~css
.article-image {
  float: inline-start;
  inline-size: 12rem;
  margin-inline-end: 1rem;
  margin-block-end: 0.5rem;
}
~~~

~~~html
<article>
  <img class="article-image" src="map.png" alt="A map of the walking route">
  <p>Text begins beside the image and wraps around its margin box. As the text continues past the bottom of the image, later lines use the full available width.</p>
</article>
~~~

The image is floated toward the start side of the text direction. In a left-to-right horizontal writing mode, that is the left side. In a right-to-left horizontal writing mode, it is the right side.

## The `float` property

The traditional values are:

- `none` - the box is not floated. This is the initial value.
- `left` - move the box toward the left edge of its containing block.
- `right` - move it toward the right edge.
- `inline-start` - move it toward the start side of the inline direction.
- `inline-end` - move it toward the end side of the inline direction.

Prefer `inline-start` and `inline-end` when the design should follow the language direction. Use `left` and `right` when a physical side is specifically intended.

~~~css
.avatar {
  float: left;
  margin: 0 1rem 0.75rem 0;
}
~~~

~~~css
.article-image {
  float: inline-start;
  margin-inline: 0 1rem;
  margin-block-end: 0.75rem;
}
~~~

The second version expresses the same common intention using flow-relative values. With logical margins, the spacing follows the writing mode too.

A float must generate a box. An absolutely positioned box is not floated. Floating an inline element blockifies its generated box, so a floated image, span, or link no longer behaves like an ordinary inline box.

## How floats are placed

A float is positioned as high as its applicable layout rules allow, then toward the requested side. Its outer edge is placed against the containing block edge or the outer edge of another float. Floats in the same block formatting context do not overlap one another.

If there is not enough room beside existing floats, a float moves down until it can fit or it reaches a position with no earlier float blocking it. This is why two floated cards may stack when their combined widths and margins exceed the available line width.

A float's top is constrained by earlier content and floats. It does not jump above an earlier block or line just because there is an empty space near the top of the page. The layout follows the float's source position and the surrounding formatting context rules.

The float's margin box is the space that inline content must flow around. Borders, padding, and margins affect how much room the float takes. Add a deliberate width to images or callouts so their wrapping is predictable.

~~~css
.article-image {
  float: inline-start;
  inline-size: min(40%, 18rem);
  block-size: auto;
  margin-inline-end: 1rem;
  margin-block-end: 0.75rem;
}
~~~

The percentage width is resolved against the containing block. `block-size: auto` keeps the image ratio when its intrinsic dimensions are available.

## Text wraps, block boxes do not wrap like text

A float does not turn every following element into a text-wrapping layout. Inline content and line boxes make room beside the float. Ordinary block boxes in the same formatting context generally lay out as though the float were not there, so their backgrounds or borders can extend behind it.

~~~html
<article class="story">
  <img class="story__image" src="map.png" alt="A route map">
  <p>This paragraph has inline text that can wrap beside the floated image.</p>
  <section class="story__details">
    <h2>Route details</h2>
    <p>This block can occupy the full width and may paint behind the float.</p>
  </section>
</article>
~~~

If a block establishes a new block formatting context, its border box must not overlap floats in the same context. Depending on the available room, it may sit beside the float or move below it. This behavior can make a new formatting context look like an automatic float-clearing technique, but choose the layout rule intentionally instead of adding unrelated properties.

## The `clear` property

`clear` prevents a block-level box from sitting beside earlier floats on the selected side. It moves the cleared box down far enough to be below the relevant float or floats. The added space is called clearance.

- `none` - allow the box beside floats.
- `left` - move below earlier left floats.
- `right` - move below earlier right floats.
- `both` - move below earlier left and right floats.
- `inline-start` - clear floats on the inline-start side.
- `inline-end` - clear floats on the inline-end side.

~~~css
.section-heading {
  clear: both;
}
~~~

Use `clear` when a particular following block must begin below the floats. It does not resize the float's parent, and it does not clear floats inside another block formatting context.

For direction-aware styles, use the logical values:

~~~css
.article-footer {
  clear: inline-start;
}
~~~

`clear: inline-start` refers to the inline-start side in the containing block's writing mode. The physical `left` and `right` values always refer to those physical sides.

## Clearing is different from containing

These are two different layout needs:

1. **Clear a following element:** move that element below the relevant preceding floats. Use `clear`.
2. **Contain floats in their parent:** make the parent include the float when calculating its own size. Establish a new block formatting context on the parent.

A floated child is out of normal flow for the parent's automatic height calculation. Without another containment rule, a parent with only floated children can appear to have no content height.

### Preferred containment with `flow-root`

~~~css
.gallery {
  display: flow-root;
}
~~~

`flow-root` creates a block formatting context for the element's contents. The parent then encloses its floats, and those floats do not interact with floats outside that context. This is a direct, readable way to contain floats when the surrounding design still uses normal block flow.

~~~html
<div class="gallery">
  <img class="gallery__image" src="map.png" alt="A route map">
  <p>The parent contains the floated image and text.</p>
</div>
~~~

A block formatting context also prevents its contents from being affected by floats outside it, and vertical margins do not collapse across its boundary. These are layout effects to account for when choosing the wrapper.

### The clearfix technique

Older stylesheets often used a clearfix pseudo-element to make a parent contain its floats:

~~~css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
~~~

This technique is still seen in older code. For new normal-flow components, `display: flow-root` is usually simpler because it states the containment requirement directly.

### Why `overflow` is not a general clearfix

Older CSS commonly used `overflow: hidden` or `overflow: auto` to establish a block formatting context and contain floats. These values also create clipping or scrolling behavior. Content such as menus, focus rings, shadows, and positioned elements may be clipped or cause scrollbars. Use `overflow` when you want its overflow behavior. Use `flow-root` when the actual requirement is to contain floats.

## Floats and modern layout systems

Floats are not a reliable way to build a row of equal cards, a sidebar grid, or a responsive page structure. Flexbox and Grid describe those relationships directly and handle changing sizes more predictably.

~~~css
/* Use Flexbox for a row or column of related items. */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Use Grid for two-dimensional page or card layouts. */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
~~~

`float` and `clear` do not move a flex item or grid item out of its layout system. Applying `float` to an item inside a flex or grid container does not create text wrapping around that item as it would in normal block flow.

Floats remain useful when the intended effect is specifically to let prose wrap beside a small image or callout. For more intricate text wrapping around a shape, CSS has `shape-outside`, covered with clipping, masks, and shapes later in this guide.

## Common float problems

### The parent has zero or too little height

A parent may not include its floated children in its normal-flow height. If the parent should wrap those floats, use `display: flow-root`.

### The next section starts too high

If the next section must start below the floated content, put `clear: both` on the appropriate following block. If the parent itself should contain the float, use `flow-root` on the parent. These solve different problems.

### Text is too close to an image

The float's margin box defines the wrapping space. Add margin on the side between the image and text, and below it if lines should not touch the image's bottom edge.

~~~css
.article-image {
  float: inline-start;
  margin-inline-end: 1rem;
  margin-block-end: 0.75rem;
}
~~~

### Floated elements unexpectedly stack

Check the available inline size and each float's width, padding, border, and margins. If there is not enough room for the next float, it moves down. For side-by-side cards, use Flexbox or Grid instead.

### The page looks correct only at one width

Float placement depends on the available line width and content. Test narrow screens, long words, zoom, and larger text. A float that leaves too little room for readable text can make the page difficult to use. For a narrow layout, remove the float or make the item full width.

~~~css
.article-image {
  float: inline-start;
  inline-size: min(40%, 18rem);
  margin-inline-end: 1rem;
}

@media (max-width: 36rem) {
  .article-image {
    float: none;
    inline-size: 100%;
    margin-inline: 0;
  }
}
~~~

### `clear` does not affect the float you expected

`clear` considers relevant earlier floats in the same block formatting context. It does not clear a float inside a separate context. Inspect which element establishes each formatting context and apply the rule at the correct level.

### A floated link or control changes its box behavior

Floating blockifies the box. Check its generated box, width, margins, focus outline, and interaction area. Do not use floats to change the visual order of interactive controls. Keep DOM and keyboard order meaningful.

## Accessibility and maintainability

- Keep floated images in the correct reading order in the HTML source.
- Give informative images appropriate alternative text. Use empty alternative text for images that are purely decorative.
- Ensure wrapped text remains readable and does not become squeezed into a very narrow column.
- Check the layout at zoom and narrow viewport widths.
- Do not use floats to visually reorder links or controls.
- Use a clearly named wrapper when `flow-root` is needed to contain a float.
- Prefer Flexbox or Grid for page structure and groups of related items.

## Try it yourself

1. Float a small image to `inline-start` and add enough text to see it wrap beside and below the image.
2. Change the float to `inline-end` and observe how the inline content flows on the other side.
3. Set `direction: rtl` on the containing block and compare logical float values with `left` and `right`.
4. Add two floats whose widths and margins nearly fill the container. Reduce the container width and see when the second float moves down.
5. Add a border to a parent containing only a floated child. Compare its height before and after `display: flow-root`.
6. Put `clear: both` on a following heading. Then remove it and compare the position of that heading.
7. Put a floated item inside a flex container and compare it with the same item in normal block flow.
8. Resize the page and confirm that the image becomes full width at the narrow breakpoint.
9. Replace an old `overflow: hidden` float wrapper with `flow-root` and check whether clipping or scrollbars disappear.
10. Inspect keyboard focus and reading order for a floated link or image.

## Key points

- A float moves toward a side and lets inline content wrap around its margin box.
- Floats are outside normal flow for placement and sizing of ordinary block boxes, while line boxes make room for them.
- A float may move down if the available width is insufficient.
- `clear` moves a following block below selected earlier floats.
- `clear` does not contain floats inside a parent.
- `display: flow-root` is a clear way to contain floats in a block formatting context.
- `overflow: hidden` and `overflow: auto` have clipping or scrolling side effects, so they are not general-purpose clearfix declarations.
- Use floats for text wrapping. Use Flexbox or Grid for component and page layouts.
- Logical float and clear values adapt to writing direction.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [24 - Overflow and Scrolling](24-overflow-and-scrolling.md) | [Q&A](../qnas/25-floats-and-clear.md) | [Example](../examples/25-floats-and-clear.md) | [26 - Flexbox Layout](26-flexbox.md) |
