# 33 - Backgrounds and Gradients

CSS backgrounds add color, images, and patterns to an element's box. They can make a page feel more polished, but they do not add content to the document or change its layout size.

## Learning outcomes

After this chapter, you should be able to:

- Set a background color and explain why it remains useful when an image fails to load.
- Distinguish a meaningful HTML image from a decorative CSS background.
- Control background image size, position, repetition, painting area, and attachment.
- Stack multiple background images in the correct visual order.
- Create linear, radial, conic, and repeating gradients.
- Choose background styles that keep text readable and information accessible.

## Backgrounds are visual layers

An element's background is painted behind its content. A background does not create a new element, take up layout space, or provide alternative text. The element's content and padding determine its size.

Use an HTML `<img>` when the image is meaningful content, such as a product photo, a diagram, or a portrait. The image can then have useful `alt` text. Use a CSS background for decoration, such as a color wash behind a heading or a subtle repeating pattern.

~~~css
.card {
  background-color: #f2f5f8;
  background-image: linear-gradient(135deg, #f2f5f8, #dce8f2);
}
~~~

The solid color is a fallback and is also visible beneath any transparent parts of the gradient.

## Background color and image

`background-color` paints a color behind an element's background images. It is a useful fallback if an image cannot be loaded or if a background image is disabled.

~~~css
.hero {
  background-color: #172b4d;
  background-image: url("../images/hero.jpg");
}
~~~

The URL is resolved relative to the stylesheet that contains the rule. Keep image files and stylesheet paths in mind when choosing a relative path. A missing image does not remove the hero's color or its text.

CSS background images have no built-in text alternative. Do not place essential information only inside a background image. If the image conveys information, put that content in HTML and describe it appropriately.

## Background image controls

These properties control how an image is drawn in an element's background:

| Property | What it controls | Common values |
| :--- | :--- | :--- |
| `background-repeat` | Whether the image tiles | `repeat`, `no-repeat`, `repeat-x`, `repeat-y`, `space`, `round` |
| `background-size` | The rendered image dimensions | `auto`, lengths or percentages, `cover`, `contain` |
| `background-position` | Where the image is aligned | `center`, edge keywords, lengths, percentages |
| `background-origin` | The box used to position the image | `padding-box`, `border-box`, `content-box` |
| `background-clip` | The box within which the background is painted | `border-box`, `padding-box`, `content-box` |
| `background-attachment` | How the image moves as the page or element scrolls | `scroll`, `fixed`, `local` |

### Repeat and size

Background images repeat by default. For a single hero image, turn repetition off:

~~~css
.hero {
  background-image: url("../images/hero.jpg");
  background-repeat: no-repeat;
}
~~~

`cover` scales the image until it covers the positioning area. Part of the image can be cropped. `contain` scales it until all of the image fits, which can leave uncovered space. Both preserve the image's proportions.

~~~css
.hero {
  background-size: cover;
}
~~~

Use explicit dimensions when you need a predictable tile or pattern size:

~~~css
.pattern {
  background-size: 2rem 2rem;
  background-repeat: repeat;
}
~~~

Percentages for `background-size` size the image relative to its positioning area. They are different from percentage values in `background-position`.

### Position

Position controls how the image is aligned inside its positioning area:

~~~css
.hero {
  background-position: center;
}
~~~

For example, `background-position: right top` aligns the image's top-right corner. A percentage aligns the matching point of the image with the same percentage point in the positioning area. `50% 50%` centers both points.

When a cropped photograph has an important subject, adjust the position so that the subject remains visible at different element sizes:

~~~css
.hero {
  background-size: cover;
  background-position: 65% center;
}
~~~

### Origin and clip

`background-origin` chooses the box used to position the background image. Its initial value is `padding-box`. `background-clip` chooses where the background can be painted. Its initial value is `border-box`.

~~~css
.panel {
  background-origin: content-box;
  background-clip: padding-box;
}
~~~

These properties matter when an element has padding or a border and the background needs to align with or stop at a particular edge. They do not change the element's dimensions.

### Attachment

`background-attachment: scroll` makes a background move with the element as the page scrolls. This is the usual default. `fixed` positions the background relative to the viewport. `local` makes the background move with the element's scrollable contents.

~~~css
.panel {
  background-attachment: local;
}
~~~

Fixed backgrounds can behave differently across browsers, devices, and embedded contexts. Prefer the default unless a fixed effect is a deliberate part of the design and has been checked on the devices you support.

## Gradients are CSS images

A gradient is generated by CSS, so it does not require an image file. It can be used anywhere an image value is accepted, including `background-image`.

A gradient needs a box to paint into. If the element has no content, width, height, or padding, the gradient may have no visible area.

### Linear gradients

A linear gradient blends colors along a line. The direction may use an edge keyword or an angle:

~~~css
.banner {
  background-image: linear-gradient(to right, #13294b, #35a7a0);
}

.button {
  background-image: linear-gradient(180deg, #1d5f9c, #123c69);
}
~~~

The first color starts at one end of the gradient line and the last color finishes at the other end. Intermediate colors create additional stops.

~~~css
.sunset {
  background-image: linear-gradient(
    to bottom,
    #23395b 0%,
    #f08a5d 55%,
    #f9d976 100%
  );
}
~~~

A color stop can have one or two positions. Two positions let you make a sharp boundary instead of a smooth blend:

~~~css
.stripes {
  background-image: linear-gradient(
    to right,
    #f4f1de 0 50%,
    #e07a5f 50% 100%
  );
}
~~~

### Radial gradients

A radial gradient spreads outward from a center point. It can be circular or elliptical, and its center can be moved:

~~~css
.spotlight {
  background-image: radial-gradient(
    circle at 75% 25%,
    #ffd166,
    #ef476f 40%,
    #073b4c 75%
  );
}
~~~

Use a radial gradient for a soft highlight, a glow, or a circular color transition. A radial gradient with hard color stops can also create a ring or disc.

### Conic gradients

A conic gradient sweeps colors around a center point. Stops can be placed around the sweep:

~~~css
.color-wheel {
  background-image: conic-gradient(
    from 0deg,
    #e76f51,
    #f4a261,
    #e9c46a,
    #2a9d8f,
    #264653,
    #e76f51
  );
}
~~~

Conic gradients are useful for decorative color wheels and simple visual patterns. Do not use one as the only explanation of data. A data visualization still needs a clear label or legend.

### Repeating gradients

Repeating gradients repeat a sequence of color stops to make a pattern:

~~~css
.diagonal-lines {
  background-image: repeating-linear-gradient(
    45deg,
    #edf2f4 0 10px,
    #8d99ae 10px 12px
  );
}
~~~

~~~css
.rings {
  background-image: repeating-radial-gradient(
    circle,
    #dbeafe 0 8px,
    #2563eb 8px 10px
  );
}
~~~

The distance between the end of one repeated sequence and the end of the next controls the pattern's scale. Very dense patterns can distract from text, so keep them subtle and decorative.

## Layering multiple backgrounds

Separate background image layers with commas. The first image is painted closest to the viewer, and later images are behind it. The background color is painted underneath all image layers.

~~~css
.hero {
  background-color: #12243a;
  background-image:
    linear-gradient(rgb(10 25 45 / 65%), rgb(10 25 45 / 65%)),
    url("../images/coast.jpg");
  background-repeat: no-repeat, no-repeat;
  background-position: center, 60% center;
  background-size: cover, cover;
}
~~~

In this example the translucent gradient sits over the photograph, darkening it so white text can be easier to read. The color is still available underneath if the photo is missing.

When a property accepts a list of values, values match background layers in order. If a list is shorter than the number of images, the values repeat. Keep the lists in the same order as the image layers to make the rule easy to maintain.

## The background shorthand

The `background` shorthand can set the color, images, and related background properties together. A slash separates position from size:

~~~css
.hero {
  background:
    linear-gradient(rgb(10 25 45 / 65%), rgb(10 25 45 / 65%)) center / cover no-repeat,
    url("../images/coast.jpg") 60% center / cover no-repeat,
    #12243a;
}
~~~

The first listed image remains on top. A background color can appear only once, at the end of the shorthand. For a rule with several layers, separate lines for each longhand property may be easier to read and update.

A later shorthand declaration resets the background longhands it does not specify. For example, `background: white` removes a background image set by an earlier `background-image` declaration. Avoid using the shorthand when you only mean to change one part of a complex background.

## Readability and accessibility

- Maintain sufficient contrast between text and the background at every supported screen size.
- Use a solid fallback color behind images and gradients.
- Put meaningful images in HTML so they can have text alternatives.
- Keep decorative backgrounds from competing with text or controls.
- Do not communicate status or essential data through color or a background pattern alone.
- Check the design when images fail to load and when users override page colors.

## Common mistakes

| Mistake | Why it causes trouble | Better approach |
| :--- | :--- | :--- |
| Using a background for an informative image | A CSS background has no `alt` text | Put the image in HTML and describe it |
| Forgetting that background images repeat | Small images can tile unexpectedly | Set `background-repeat: no-repeat` for a single image |
| Using `cover` without checking the crop | The image's edges can be cut off | Adjust `background-position` and test narrow layouts |
| Putting text over a busy image | The text can become difficult to read | Add a contrast layer or a solid surface behind the text |
| Reversing image layers | The first layer is painted on top | Write layers from front to back |
| Replacing a full background with a color shorthand | The shorthand resets omitted background properties | Change the one longhand you intend to edit |

## Try it yourself

1. Give a card a solid background color, then add a linear gradient over it.
2. Add a local image layer and use `background-size: cover`. Resize the card and observe the crop.
3. Move the image's focal point with `background-position`.
4. Create one radial glow and one repeating stripe pattern.
5. Stack a translucent gradient over a photograph, then check the text contrast.
6. Remove the image and confirm the content remains understandable with the fallback color.

## Key points

- Backgrounds are painted behind content and do not provide semantic text alternatives.
- `background-color` is a fallback beneath all background image layers.
- Background layers are listed from front to back, separated by commas.
- `cover` fills the positioning area and may crop an image; `contain` fits the full image.
- Linear, radial, conic, and repeating gradients are generated CSS images.
- Use backgrounds for decoration and HTML images for meaningful content.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [32 - Logical properties and writing modes](32-logical-properties-and-writing-modes.md) | [Q&A](../qnas/33-backgrounds-and-gradients.md) | [Example](../examples/33-backgrounds-and-gradients.md) | [34 - Fonts and typography](34-fonts-and-typography.md) |
