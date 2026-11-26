# 19 - Borders, Outlines, and Shadows

Borders, outlines, and shadows decorate boxes and help people see relationships, edges, and interaction states. They can make a layout clearer, but they serve different purposes: borders are part of a box's dimensions, outlines are drawn outside a box without changing layout, and shadows add painted depth.

## Borders

A border sits between an element's padding and margin. Each side has a width, style, and color. The border contributes to the box dimensions under the default `content-box` sizing model. With `box-sizing: border-box`, it is included inside the declared width and height.

The border style controls whether and how the line is drawn. A border with `border-style: none` is not drawn and its used width is zero. A border color defaults to `currentColor`, which uses the element's text color.

### Set borders with longhands and shorthand

You can set all four sides together:

~~~css
.card {
  border-width: 2px;
  border-style: solid;
  border-color: #334155;
}
~~~

The `border` shorthand combines the width, style, and color. The values can appear in any order:

~~~css
.card {
  border: 2px solid #334155;
}
~~~

A border style must be provided for a visible border. If the style is omitted, it defaults to `none`.

The shorthand can also set a border on one side:

~~~css
.notice {
  border-left: 4px solid #2563eb;
}
~~~

For writing-mode-aware styles, use logical properties:

~~~css
.notice {
  border-inline-start: 4px solid #2563eb;
}
~~~

The physical properties `border-top`, `border-right`, `border-bottom`, and `border-left` always name physical sides. Logical properties such as `border-block-start` and `border-inline-end` refer to the start and end directions of the current writing mode.

### Border styles

Common border styles include `solid`, `dashed`, `dotted`, and `double`. Other styles include `groove`, `ridge`, `inset`, and `outset`. Their exact appearance can vary by browser and platform, so use them only when that variation is acceptable.

~~~css
.solid { border: 2px solid; }
.dashed { border: 2px dashed; }
.dotted { border: 2px dotted; }
.double { border: 4px double; }
~~~

The keywords `none` and `hidden` do not draw a border. They can differ in collapsed table border conflict resolution, where `hidden` has special behavior.

If you specify a border width but no visible border style, there is no visible line:

~~~css
.card {
  border-width: 5px;
  border-color: tomato;
  /* border-style is still none, so no border is drawn */
}
~~~

### Border width and color

Widths accept lengths and the keywords `thin`, `medium`, and `thick`. The exact used size of those keywords is chosen by the browser. A nonzero border width only has a visible effect when the style draws a border.

Colors can use named colors, hexadecimal notation, RGB, HSL, other supported color formats, or `currentColor`. If a border color is omitted, it uses `currentColor`.

~~~css
.button {
  color: #1d4ed8;
  border: 2px solid;
}
~~~

The border in this example is blue because the omitted border color resolves from the button's current text color.

### Side-specific borders and shorthand resets

Each side can have its own width, style, and color:

~~~css
.panel {
  border-top: 1px solid #cbd5e1;
  border-right: 2px dashed #64748b;
  border-bottom: 3px solid #0f766e;
  border-left: 4px solid #2563eb;
}
~~~

A later shorthand can reset earlier side values. For example, `border: 1px solid #334155` applies its values to all four sides and can replace the earlier side-specific declarations if it wins the cascade. Put overrides after the shorthand when you need different sides.

~~~css
.panel {
  border: 1px solid #334155;
  border-left-width: 4px;
}
~~~

A border shorthand also resets related border-image settings to their initial state. Avoid placing a broad shorthand later in a rule when you intend to preserve a border-image or side-specific configuration.

### Rounded corners

Use `border-radius` to round the outer corners of a box:

~~~css
.card {
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
}
~~~

One value applies to all corners. Two values map to top-left and bottom-right, then top-right and bottom-left. Three values map to top-left, top-right and bottom-left, then bottom-right. Four values follow top-left, top-right, bottom-right, bottom-left.

~~~css
.card {
  border-radius: 8px 16px 24px 32px;
}
~~~

A slash separates horizontal radii from vertical radii, allowing elliptical corners:

~~~css
.pill {
  border-radius: 999px;
}

.ellipse-corner {
  border-radius: 24px / 12px;
}
~~~

If adjacent corner radii do not fit in the box, the browser scales them down so they do not overlap. Percentages are relative to the corresponding dimensions of the border box. Rounded corners affect the shape of the border and the way backgrounds are clipped to the corner.

## Outlines

An outline is a line drawn around an element, usually outside its border. Unlike a border, an outline does not take up space in the layout. Showing or hiding one therefore does not move neighboring content. An outline can overlap nearby content and may be non-rectangular, such as when an inline element spans multiple lines.

The `outline` shorthand accepts a width, style, and color:

~~~css
:focus-visible {
  outline: 3px solid #7c3aed;
  outline-offset: 3px;
}
~~~

The `outline-offset` property is separate from the shorthand. A positive offset moves the outline outward from the border edge; a negative offset moves it inward.

Browsers often show an outline for keyboard focus. Keep a visible focus indicator so keyboard users can tell which control is active. If you customize the indicator, make sure the replacement remains clearly visible against the surrounding colors and in the states where people need it.

Do not remove a focus outline without providing a suitable alternative:

~~~css
/* Avoid: removes a useful keyboard focus indicator */
button:focus {
  outline: none;
}

/* Better: provide a visible replacement */
button:focus-visible {
  outline: 3px solid #7c3aed;
  outline-offset: 3px;
}
~~~

An outline is not a substitute for a border when the edge must reserve space or participate in the box dimensions. A border is not always a substitute for a focus outline because it may blend into the control or its surroundings.

## Box shadows

The `box-shadow` property paints one or more shadows around a box. A basic outer shadow uses horizontal offset, vertical offset, optional blur, optional spread, and color:

~~~css
.card {
  box-shadow: 0 8px 20px 2px rgb(15 23 42 / 18%);
}
~~~

The horizontal and vertical offsets are required. A positive horizontal offset moves the shadow right; a positive vertical offset moves it down. The blur radius cannot be negative. A positive spread expands the shadow, and a negative spread contracts it.

Use `inset` to draw a shadow inside the box:

~~~css
.field {
  box-shadow: inset 0 2px 4px rgb(15 23 42 / 18%);
}
~~~

Multiple shadows are comma-separated. The first shadow is painted on top of the later shadows:

~~~css
.card {
  box-shadow:
    0 2px 4px rgb(15 23 42 / 12%),
    0 12px 28px rgb(15 23 42 / 10%);
}
~~~

Shadows are visual effects. They do not increase the space reserved by the layout, so a shadow can extend beyond its element and may be clipped by an ancestor's overflow.

### Text shadows

Use `text-shadow` to paint a shadow behind text. It takes horizontal and vertical offsets, an optional blur radius, and an optional color. It does not use a spread value or an `inset` keyword.

~~~css
.heading {
  text-shadow: 0 2px 6px rgb(15 23 42 / 25%);
}
~~~

Text shadows can reduce legibility when they are too strong or placed behind small text. Check the text against its actual background and keep the text easy to read.

## Choosing the right effect

- Use a border to define a box edge or divider that should be part of the box's dimensions.
- Use an outline for an external indicator that should not change layout, especially keyboard focus.
- Use a box shadow to suggest depth or separate a surface from its surroundings.
- Use a text shadow only when it improves the legibility or visual treatment of text.
- Prefer border and shadow styles that remain understandable when colors or display conditions change.

These effects can appear together. For example, a card can have a border and a subtle shadow, while its focused link receives an outline. Make sure the outline remains visible beyond the rounded border and is not clipped by an ancestor.

## Common mistakes

### Setting border width without a border style

A width and color do not make a visible border by themselves. Add a style such as `solid`.

### Removing focus outlines without adding a replacement

Keyboard users need a visible indication of the focused control. Keep the browser indicator or design a visible replacement with `:focus-visible`.

### Forgetting that outlines do not reserve space

An outline can overlap adjacent elements. Use a border when the edge needs to be included in the box dimensions.

### Expecting shadows to make room in the layout

Shadows are painted outside the box and do not push nearby content away. Add margin or padding if more layout space is needed.

### Putting a shorthand after a side-specific declaration

A later `border` shorthand can reset values set by earlier border longhands. Place side overrides after the shorthand.

### Using heavy decoration to communicate state by color alone

A border or shadow color might not be distinguishable for every reader or display. Pair important visual changes with a clear shape, text, icon, or focus indicator.

## Try it yourself

1. Add `border: 2px solid` to a card and observe how its border color follows `currentColor`.
2. Remove `border-style` while keeping a width and color. Explain why the line disappears.
3. Give each border side a different style, then add a later `border` shorthand and observe which values are reset.
4. Make a square card rounded with one, two, three, and four `border-radius` values.
5. Add a slash to `border-radius` and compare elliptical with circular corners.
6. Add an outline to a button and compare its position with a border.
7. Use the keyboard to focus each link and button. Confirm the focus indicator remains visible.
8. Add positive and negative spread values to a box shadow.
9. Add two box shadows and switch their order.
10. Add a text shadow to a large heading, then remove it and compare readability.

## Key points

- Borders have width, style, and color. A visible style is required for a visible border.
- A border is part of the box edge and can affect dimensions.
- Border color defaults to `currentColor`.
- Border shorthands can reset side-specific values and border-image settings.
- `border-radius` supports circular and elliptical corners.
- Outlines do not take up layout space and may overlap nearby content.
- Keep a visible keyboard focus indicator.
- Box shadows support offsets, blur, spread, inset shadows, and multiple layers.
- Text shadows have no spread or inset component.
- Shadows do not reserve layout space and may be clipped by an ancestor.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [18 - Margin and Padding](18-margin-and-padding.md) | [Q&A](../qnas/19-borders-outlines-and-shadows.md) | [Example](../examples/19-borders-outlines-and-shadows.md) | [20 - Display and Box Types](20-display-and-box-types.md) |
