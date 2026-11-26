# 16 - The CSS Box Model

Every element that participates in CSS layout is represented by a box. Understanding that box explains why padding, borders, and margins affect the space an element occupies.

This chapter covers the box areas, how to calculate their dimensions, and how `box-sizing` changes what a declared width includes. The next chapter looks more closely at setting widths and heights.

## The four box areas

From the inside out, a CSS box has four areas:

1. **Content** - text, images, or child elements.
2. **Padding** - space between the content and the border.
3. **Border** - the edge around the padding and content.
4. **Margin** - transparent space outside the border that separates the box from nearby content.

~~~text
+------------------------- margin --------------------------+
|  +----------------------- border ----------------------+  |
|  |  +------------------- padding -------------------+   |  |
|  |  |                                               |   |  |
|  |  |                   content                     |   |  |
|  |  |                                               |   |  |
|  |  +------------------------------------------------+   |  |
|  +-------------------------------------------------------+  |
+------------------------------------------------------------+
~~~

The diagram shows the areas conceptually. A margin has no visible fill of its own. By default, the element's background is painted through the content and padding areas and underneath the border.

## Content and padding

The content area holds an element's actual content. For text, it is where text is laid out. For an image, it is where the image is drawn.

Padding adds inner space around the content. It is part of the box, and the background is painted behind it.

~~~css
.card {
  padding: 1rem;
}
~~~

This applies 1rem of padding to all sides. Padding can also be set individually:

~~~css
.card {
  padding-top: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
}
~~~

### Padding shorthand

The `padding` shorthand accepts one to four values:

~~~css
.all-sides {
  padding: 1rem;
}

.vertical-horizontal {
  padding: 1rem 1.5rem;
}

.top-horizontal-bottom {
  padding: 0.5rem 1.5rem 1rem;
}

.clockwise {
  padding: 0.5rem 1rem 1.5rem 2rem;
}
~~~

The values map to sides like this:

| Values | Side assignment |
| --- | --- |
| One | All four sides |
| Two | Top and bottom, then right and left |
| Three | Top, right and left, then bottom |
| Four | Top, right, bottom, then left |

Four-value shorthand follows a clockwise order starting from the top. Negative padding values are invalid.

Logical properties describe spacing by writing direction and text flow rather than physical sides:

~~~css
.notice {
  padding-block: 1rem;
  padding-inline: 1.5rem;
}
~~~

`block` refers to the direction in which lines of text stack. `inline` refers to the direction text flows within a line. Logical properties can adapt naturally to different writing modes.

## Border

A border surrounds the padding and content. To make a visible border, specify its style. A common shorthand sets width, style, and color together:

~~~css
.card {
  border: 2px solid #2563eb;
}
~~~

The parts can also be controlled separately:

~~~css
.card {
  border-width: 2px;
  border-style: solid;
  border-color: #2563eb;
  border-bottom: 1px solid #94a3b8;
}
~~~

A border contributes to the box dimensions when it has a non-zero used width. A border can take up space even when its color blends into the background. A border with `border-style: none` has no visible border width.

## Margin

Margin adds transparent outer space beyond the border. It separates an element from neighboring boxes.

~~~css
.card {
  margin: 1rem;
}
~~~

Margin does not receive the element's background color. If two normal-flow block elements have vertical margins next to one another, those margins can collapse instead of adding together. Margin collapsing has separate rules and is covered in the later margins and padding chapter.

A margin can be negative. Negative margins can pull boxes closer together or make them overlap, so use them deliberately. Padding cannot be negative.

Logical margin properties follow the same directions as logical padding:

~~~css
.card {
  margin-block: 1rem;
  margin-inline: auto;
}
~~~

When a constrained block has unused inline space, automatic inline margins can distribute that space on both sides. How the block gets its size is covered in the next chapter.

## The default content-box model

The initial value of `box-sizing` is `content-box`. Under this model, a declared width describes the content area. Padding and borders are added outside that width.

~~~css
.content-box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid;
  margin: 16px;
}
~~~

The horizontal measurements are:

- Content width: 300px
- Left and right padding: 20px + 20px = 40px
- Left and right borders: 5px + 5px = 10px
- Border-box width: 300px + 40px + 10px = 350px
- Space including both margins: 350px + 16px + 16px = 382px

So the declared `width` is 300px, the visible border edge spans 350px, and the margins make the full horizontal space 382px. Margins are not part of the border box and do not receive a background.

The same principle applies vertically: content height, top and bottom padding, top and bottom borders, then top and bottom margins. The next chapter explains width and height sizing in more detail.

## Using border-box

With `box-sizing: border-box`, a declared width includes the content, padding, and border. The content area uses the space left after padding and borders are accounted for. Margins remain outside the declared width.

~~~css
.border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid;
  margin: 16px;
}
~~~

The horizontal measurements are:

- Border-box width: 300px
- Left and right padding: 20px + 20px = 40px
- Left and right borders: 5px + 5px = 10px
- Content width: 300px - 40px - 10px = 250px
- Space including both margins: 300px + 16px + 16px = 332px

This model can make declared sizes easier to reason about because adding padding or a border does not increase the declared border-box width. If padding and borders together are larger than the declared size, the content area cannot become negative, so the visible box can exceed that size.

## A common sizing reset

Many projects use `border-box` for all elements and their pseudo-elements:

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}
~~~

The universal selector does not inherit this value. An alternative is to set it on the root and inherit it:

~~~css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
~~~

Either approach works when used consistently. The reset changes how sizes are calculated; it does not remove padding or borders. Margin remains outside the border box.

## Backgrounds, borders, outlines, and shadows

By default, the background color or image fills the content and padding areas and extends underneath the border. The margin stays transparent.

A border is part of the box and can affect its dimensions. An outline is drawn outside the border but does not reserve layout space:

~~~css
.field:focus {
  outline: 3px solid #7c3aed;
  outline-offset: 2px;
}
~~~

Outlines are useful for focus indicators because they do not shift nearby content. Do not remove a visible keyboard focus indicator unless an equally clear replacement is provided.

A box shadow is also a visual effect, not an extra box-model area. It can appear outside the border without changing the space used by normal layout.

## Inspecting a box in developer tools

Browser developer tools show the box model for a selected element. The diagram commonly displays content dimensions, padding, border, and margin separately.

Use it to investigate:

- Is unexpected space coming from padding or margin?
- Is a border adding to the rendered size?
- Does the element use `content-box` or `border-box`?
- Which rule set a particular side's value?
- Is a neighboring vertical margin collapsing?

The displayed values help with debugging, but also check the active CSS rules and layout context.

## Common mistakes

### Counting margin as part of width

Margins sit outside the border box. A 300px border-box with 16px margins on both sides takes 332px of horizontal layout space.

### Forgetting padding and borders with content-box

With the default model, padding and borders add to the declared content width. A 300px width with 20px padding and a 5px border on every side has a 350px border-box width.

### Assuming border-box includes margin

It does not. `box-sizing: border-box` includes content, padding, and border. Margins remain outside.

### Thinking margin has a background

Margins are transparent. The background is painted inside the border edge, not in the margin area.

### Expecting an outline to change layout

An outline is painted outside the border without affecting layout dimensions. A border, by contrast, is part of the box.

### Forgetting pseudo-elements in a global reset

If a design uses `::before` or `::after` for visible boxes, include them in the reset so they use the same sizing model.

### Treating every element's width the same way

The box model describes the areas, but the effect of width and height depends on the element and layout mode. The following chapter covers those sizing behaviors.

## Try it yourself

1. Create a box with `width: 300px`, `padding: 20px`, `border: 5px solid`, and `margin: 16px`. Calculate its border-box and margin-box widths using `content-box`.
2. Change it to `box-sizing: border-box`. Calculate its content width and total space including margins.
3. Set different padding on each side with four-value shorthand. Label the value for each side.
4. Set only a bottom border and compare it with a four-sided border.
5. Add a background color and observe that it does not paint the margin.
6. Add an outline and then a border. Compare their effects on nearby layout.
7. Apply vertical margins to two adjacent block elements. Inspect whether the margins collapse.
8. Add a `::before` element with width, padding, and border. Include it in a border-box reset.
9. Change physical padding to `padding-block` and `padding-inline`.
10. Inspect an element's box model in browser developer tools.

## Key points

- A CSS box has content, padding, border, and margin areas, from inside to outside.
- Padding and border are inside the border box; margin is outside it.
- The default `content-box` model adds padding and borders outside the declared content width and height.
- `border-box` includes content, padding, and borders in the declared size. It does not include margins.
- Padding cannot be negative; margins can be negative.
- Backgrounds are painted within the border edge by default. Margins remain transparent.
- Borders affect layout dimensions; outlines and shadows do not add layout space.
- Adjacent vertical margins can collapse in normal flow.
- Width and height behavior varies by element and layout mode, which the next chapter explains.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [15 - CSS Math Functions: calc, min, max, and clamp](15-css-math-functions.md) | [Q&A](../qnas/16-box-model.md) | [Example](../examples/16-box-model.md) | [17 - Width, height, and sizing](17-width-height-and-sizing.md) |
