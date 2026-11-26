# 17 - Width, Height, and Sizing

CSS sizing properties control how much space an element uses. A good starting point is to understand what `auto` means, which box a size applies to, and what happens when content does not fit.

This chapter builds on the box model from the previous lesson. It covers `width`, `height`, percentage sizes, minimum and maximum constraints, responsive sizing, and content-based sizing values.

## Width and height set preferred sizes

The `width` property sets a preferred horizontal size. The `height` property sets a preferred vertical size.

~~~css
.card {
  width: 24rem;
  height: 12rem;
}
~~~

By default, `box-sizing: content-box` means these sizes describe the content area. With `box-sizing: border-box`, the declared sizes include content, padding, and border. Margins remain outside either size. See the previous chapter for the box-model calculations.

A size is not always the final size the browser uses. The element's display type, its layout context, its content, its containing block, and its min/max constraints can all affect the used size.

## The meaning of auto

The initial value of both `width` and `height` is `auto`, but the result depends on the layout and element.

For a normal block in normal flow:

- `width: auto` usually makes the block fill the available inline space, accounting for its margins, padding, and border.
- `height: auto` usually lets the block grow to fit its content.

~~~css
article {
  width: auto;
  height: auto;
}
~~~

This is usually a useful default. Content can wrap within the available width, and the block's height grows as more content is added.

A normal inline element, such as a `span`, does not use `width` and `height` the way a block does. Its line boxes are sized by their content. An `inline-block` can have an explicit width and height while still flowing alongside text. Flexbox and Grid items follow their layout algorithms, which are covered in later chapters.

## Fixed and relative sizes

A length such as `px`, `rem`, or `em` can set a size:

~~~css
.sidebar {
  width: 18rem;
}
~~~

A fixed width is predictable, but may not fit every available space. A percentage lets the size depend on a containing block:

~~~css
.half-width {
  width: 50%;
}
~~~

For width, a percentage is generally based on the width of the containing block. It is not automatically a percentage of the viewport. The property and layout context determine the reference.

For example, if a containing block is 800px wide, a child with `width: 50%` has a 400px content width under the default content-box model. With border-box sizing, the declared 400px includes the child's padding and border.

## Width: auto versus width: 100%

For a normal block in normal flow, `width: auto` naturally fills the remaining available inline space after the other horizontal parts are accounted for.

~~~css
.block {
  width: auto;
  padding: 1rem;
  border: 1px solid;
}
~~~

By contrast, `width: 100%` requests a size equal to the containing block's width. With content-box sizing, padding and borders are then added outside that 100% content width and can make the element overflow.

~~~css
.full-width {
  width: 100%;
  padding: 1rem;
  border: 1px solid;
}
~~~

A border-box reset makes the declared 100% include padding and border, though margins can still make the total outer size too large. Use `width: auto` when a normal block should fill the available space while accounting for its other box parts. Use a percentage when a proportional size is intended.

## Height and content

A block with `height: auto` grows as its content needs more room:

~~~css
.message {
  height: auto;
  padding: 1rem;
}
~~~

A fixed height does not automatically grow to make room for extra content:

~~~css
.fixed-panel {
  height: 10rem;
}
~~~

If the content becomes taller than the content area, it can overflow. The `overflow` property controls how overflow is handled and is covered in a later chapter. For content that may vary, prefer `height: auto` or use `min-height` to set a floor without preventing the box from growing.

~~~css
.hero {
  min-height: 20rem;
}
~~~

A viewport minimum height can make a section at least as tall as the viewport while still allowing it to grow:

~~~css
.page-section {
  min-height: 100vh;
}
~~~

Viewport units and their mobile behavior are covered in the responsive design chapter.

## Percentage heights need a height reference

A percentage height needs a containing block with a definite height to resolve against in common normal-flow cases.

~~~css
.parent {
  height: 400px;
}

.child {
  height: 50%;
}
~~~

Here, the child's percentage height can resolve to 200px. If the parent's height is `auto` and depends on its content, a percentage height on a normal-flow child generally behaves as `auto`, because there is no definite parent height to use.

This is why `height: 100%` often appears to do nothing when ancestor heights are not set. Do not set a chain of fixed heights automatically. First decide whether the design needs a fixed height or whether content-driven height is more suitable.

Some layout systems, such as Grid and Flexbox, have additional sizing rules. Those chapters explain their details.

## Minimum and maximum constraints

Use `min-width`, `max-width`, `min-height`, and `max-height` to constrain the preferred size:

~~~css
.article {
  width: 100%;
  max-width: 70rem;
}

.notice {
  min-height: 8rem;
}
~~~

The article can shrink into a narrow container but stops growing beyond 70rem. The notice is at least 8rem high and can become taller when its content needs more room.

A min constraint can override a max constraint if they conflict. In practice, keep their values in a sensible order:

~~~css
.panel {
  min-width: 12rem;
  max-width: 30rem;
}
~~~

For a content box with box sizing applied, remember that the size includes or excludes padding and border according to `box-sizing`. Margins remain outside.

### A responsive image

A common rule prevents an image from becoming wider than its containing block:

~~~css
img {
  max-width: 100%;
  height: auto;
}
~~~

The maximum width lets the image shrink when the container is narrow. The automatic height preserves its natural proportions when its width changes. This prevents the image from stretching just to fill a fixed height.

Using `width: 100%` instead would make every image fill its container, including small icons that might otherwise display at their natural size. Apply responsive image rules deliberately, or target only content images.

## Intrinsic sizing values

Some sizing values use an element's content to determine its size:

- `min-content` gives a content-based minimum, typically allowing text to wrap at its available soft wrap points.
- `max-content` gives a content-based preferred size without soft wrapping.
- `fit-content` lets a box fit its content while staying within the available space and content-based limits.

~~~css
.label {
  width: max-content;
}

.search-result {
  width: fit-content;
  max-width: 100%;
}
~~~

These values can be useful when a box should follow its content instead of a fixed number. They can also cause overflow if an unbreakable word, long URL, or other wide item cannot wrap.

`min-content`, `max-content`, and `fit-content` are intrinsic sizing values. The `min()`, `max()`, and `clamp()` math functions from the earlier chapter calculate among values. The names are similar, but their roles are different.

## Keep a preferred aspect ratio

The `aspect-ratio` property gives a box a preferred width-to-height ratio:

~~~css
.video-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
}
~~~

With one dimension determined and the other left automatic, the browser can size the box to maintain the ratio. This is useful for reserving a predictable shape for media or a card. Replaced media elements and how their contents fit into a box are covered in the replaced-elements chapter.

## Logical sizing properties

The properties `inline-size` and `block-size` express dimensions in relation to writing direction:

~~~css
.card {
  inline-size: 30rem;
  min-block-size: 12rem;
}
~~~

In a common horizontal writing mode, `inline-size` corresponds to width and `block-size` corresponds to height. In a vertical writing mode, the mapping changes. Logical properties are covered in more detail in the logical properties chapter.

## Common sizing patterns

### Center a readable content column

~~~css
.article {
  width: min(100%, 70rem);
  margin-inline: auto;
}
~~~

The article is no wider than its containing block or 70rem. When there is spare inline space, automatic inline margins center it. The `min()` function was covered in the CSS math functions chapter.

### Keep a control inside its parent

~~~css
.control {
  max-width: 100%;
}
~~~

This prevents a preferred width from exceeding the containing block's available width. Check padding, borders, and box sizing if the control still causes overflow.

### Let content decide the height

~~~css
.card {
  min-height: 12rem;
  height: auto;
}
~~~

The card has a minimum height but is free to grow when its content needs more space.

## Common mistakes

### Giving every block width: 100%

A normal block with `width: auto` already fills its available inline space. Setting 100% can cause overflow when padding, borders, or margins add extra space.

### Setting a fixed height for variable content

Longer text, larger fonts, or translated content can exceed the fixed content area. Prefer automatic height or a minimum height unless the design requires a fixed region.

### Expecting a percentage height to resolve against an auto-height parent

A percentage height needs a definite reference in common normal-flow cases. If the parent height depends on its content, the child's percentage height generally behaves like `auto`.

### Using width when the element is inline

A normal non-replaced inline element does not accept width and height like a block. Choose a suitable display type or a layout system when a dimension is needed.

### Letting a maximum size become a fixed size

`max-width: 70rem` is only a ceiling. The element can be narrower when its containing block is narrower or the layout provides less space.

### Forgetting that min and max constraints can change the result

The browser considers min and max constraints when resolving a preferred size. The final used size may differ from the value written in `width` or `height`.

### Setting every image to width: 100%

This can enlarge small images and icons unnecessarily. Use `max-width: 100%; height: auto;` when images should shrink to fit while preserving their natural display size.

## Try it yourself

1. Put a block with `width: auto` and one with `width: 100%` in the same padded container. Compare their edges.
2. Change the container width and observe a child set to `width: 50%`.
3. Give a parent a definite height and a child `height: 50%`. Then remove the parent's height and compare.
4. Give a paragraph a small fixed height and enough text to overflow. Replace its height with `auto`, then with `min-height`.
5. Add `max-width: 100%` to an image that is wider than its container.
6. Compare `width: min-content`, `max-content`, and `fit-content` on a label with several words.
7. Add `aspect-ratio: 16 / 9` to a box with `width: 100%` and observe its height.
8. Replace `width` with `inline-size` and compare the result in a vertical writing mode.

## Key points

- `width` and `height` set preferred sizes, but layout context and min/max constraints affect the final used size.
- For a normal block in normal flow, `width: auto` usually fills available inline space; `height: auto` usually grows with content.
- Percentage widths commonly refer to the containing block's width. Percentage heights need a definite height reference in common normal-flow cases.
- `min-width`, `max-width`, `min-height`, and `max-height` constrain preferred sizes.
- Use automatic or minimum heights for content that can grow.
- `max-width: 100%; height: auto;` helps images shrink without losing their proportions.
- Intrinsic sizing values use content-based sizes; math functions compute among values.
- `aspect-ratio` describes a preferred width-to-height ratio.
- `inline-size` and `block-size` follow writing direction.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [16 - The CSS Box Model](16-box-model.md) | [Q&A](../qnas/17-width-height-and-sizing.md) | [Example](../examples/17-width-height-and-sizing.md) | [18 - Margin and Padding](18-margin-and-padding.md) |
