# 48 - Clipping, masks, and shapes

CSS clipping, masking, and shapes can change how content is shown or how nearby text flows around it. These tools have different jobs: a clipping path sets a sharp visible boundary, a mask controls visibility with transparency, and a float shape changes the line wrapping around a float.

They affect visual rendering and text flow, but they do not replace meaningful content or semantic HTML.

## Learning outcomes

After this chapter, you should be able to:

- Clip an element with basic CSS shapes using `clip-path`.
- Explain how clipping differs from a mask.
- Apply an alpha mask with `mask-image` and tune its size and position.
- Use `shape-outside` to wrap text around a float.
- Add space around a float shape with `shape-margin`.
- Provide simple fallbacks and keep essential content accessible.

## Three related tools with different jobs

| Property or feature | What it changes | Common use |
| :--- | :--- | :--- |
| `clip-path` | Which painted pixels are visible inside a sharp boundary | Circular avatars, angled cards, decorative crops |
| `mask-image` | How visible each part is, using transparency or luminance | Fade edges, reveal artwork gradually |
| `shape-outside` | The area that inline content avoids around a float | Wrap an article paragraph around a circular image |

A clip or mask does not change the element's layout box. A shape used with `shape-outside` changes text flow around a floated element, but it does not by itself crop that element's visible pixels.

## Clip with `clip-path`

`clip-path` restricts the painted result to a clipping region. Pixels outside the region are not drawn:

~~~css
.avatar {
  clip-path: circle(48% at 50% 50%);
}
~~~

Common basic shapes include:

- `circle(radius at position)` for a circular boundary.
- `ellipse(horizontal-radius vertical-radius at position)` for an oval.
- `inset(top right bottom left round radius)` for an inset rectangle, optionally with rounded corners.
- `polygon(x y, x y, ...)` for a polygon defined by coordinate pairs.

For example, this crops a card into an angled shape:

~~~css
.card-art {
  clip-path: polygon(0 0, 100% 0, 100% 78%, 0 100%);
}
~~~

Percentages are measured against the chosen reference box. The default reference box for an HTML element is generally its border box. A geometry box such as `content-box` or `padding-box` can be included with a basic shape when the boundary should use a different box.

Clipping changes what is painted, not the element's box size. The clipped area still reserves the same layout space. By default, hit testing does not target the part outside the clipping region. Avoid placing essential labels, focus indicators, or interactive controls where the clip removes them from view.

For more complex shapes, `clip-path` can reference an SVG `clipPath` in the same document:

~~~html
<svg aria-hidden="true" width="0" height="0">
  <defs>
    <clipPath id="ticket-shape" clipPathUnits="objectBoundingBox">
      <path d="M0 0 H1 V0.35 C0.85 0.35 0.85 0.65 1 0.65 V1 H0 V0.65 C0.15 0.65 0.15 0.35 0 0.35 Z" />
    </clipPath>
  </defs>
</svg>
~~~

~~~css
.ticket {
  clip-path: url("#ticket-shape");
}
~~~

An internal SVG definition is useful when basic shapes are not expressive enough. Keep identifiers unique in the document. The SVG clip path is a visual reference, not a replacement for meaningful HTML content.

## Clip paths and overflow are different

`overflow: hidden` or `overflow: clip` clips descendants to a rectangular or rounded box boundary. `clip-path` can use shapes such as circles and polygons. They are not interchangeable: overflow also controls how overflowing content is treated by the box, while a clip path defines a visual shape.

A rounded rectangle often needs only `border-radius` and overflow clipping. Use `clip-path` when the visible boundary needs a different shape or must be controlled independently.

## Fade with a mask

A mask controls visibility across the element. Fully opaque mask pixels reveal the corresponding content; transparent pixels hide it; partially transparent pixels reveal it partly. For a CSS gradient used as a mask, the image's alpha channel controls visibility:

~~~css
.fade-edge {
  mask-image: linear-gradient(to right, #000 65%, transparent);
}
~~~

In this example, the element stays visible on the left and fades toward the right. The black color is not what makes it visible by itself; its opaque alpha is. A fully opaque white and a fully opaque black mask pixel both reveal content when the mask is interpreted by alpha.

Masks can also use an image, multiple image layers, or an SVG mask. SVG mask sources can use alpha or luminance interpretation. CSS image masks normally use alpha; use `mask-mode` when the interpretation needs to be specified for a mask layer.

The mask layer can be positioned and sized much like a background image:

~~~css
.hero-art {
  mask-image: linear-gradient(to bottom, #000 70%, transparent);
  mask-size: 100% 100%;
  mask-position: center;
  mask-repeat: no-repeat;
}
~~~

Use `mask-image: none` to remove the mask. Multiple mask images are comma-separated layers. The related longhand lists, such as `mask-size` and `mask-position`, correspond to those layers. `mask-composite` controls how mask layers combine, so add it only when you need a more complex combination.

Masking can soften a boundary, while clipping normally produces a sharp boundary. A mask may fade text and controls too, so apply it to decorative artwork rather than an entire interface region when the result could make essential content harder to read.

## Wrap text around a shape with `shape-outside`

`shape-outside` changes the float area used for text wrapping. It applies to floated elements, not to ordinary grid or flex items:

~~~css
.article-art {
  float: left;
  width: 10rem;
  aspect-ratio: 1;
  margin: 0.5rem 1.25rem 0.75rem 0;
  border-radius: 50%;
  shape-outside: circle(50%);
  shape-margin: 0.5rem;
}
~~~

The float remains an ordinary rectangular layout box, but inline text wraps around the declared circle instead of the float's full rectangle. In the example, `border-radius` makes the visible box circular and `shape-outside` makes the text use a circle for its wrapping boundary. Those declarations serve different purposes.

`shape-margin` adds spacing outside the shape so the text does not sit directly against its edge. It does not resize or crop the visible element.

Other basic shapes, including `ellipse()`, `inset()`, and `polygon()`, can define a float's wrapping shape. A shape can also be derived from an image's alpha data. The shape only affects inline flow beside the float; it does not move block layout or clip the image.

If the shape feature is unsupported, ordinary float wrapping still works. Keep the image and text in a sensible order, and make sure the rectangular fallback remains readable.

## Add a fallback

A simple design can start with a regular image or box and add the shape when supported:

~~~css
.article-art {
  float: left;
  width: 10rem;
  aspect-ratio: 1;
  margin: 0.5rem 1.25rem 0.75rem 0;
  border-radius: 50%;
}

@supports (shape-outside: circle(50%)) {
  .article-art {
    shape-outside: circle(50%);
    shape-margin: 0.5rem;
  }
}
~~~

The normal float and its text remain usable without the enhancement. A decorative crop can also use a feature query so its base shape remains visible if the clipping feature is unavailable:

~~~css
.promo-art {
  overflow: hidden;
  border-radius: 1rem;
}

@supports (clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%)) {
  .promo-art {
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  }
}
~~~

Do not hide meaningful content as the fallback. Keep informative text in normal HTML so it remains present when a visual effect is disabled or unsupported.

## Accessibility and interaction

- Keep text and controls outside clipped or faded areas unless their full visible and interactive area is preserved.
- Do not rely on a shape, mask, or color treatment as the only way to communicate information.
- Provide a useful alternative for meaningful images. A CSS shape does not create an accessible text description.
- Check keyboard focus indicators when clipping interactive components.
- Remember that clipped-out areas are normally not hit-testable. Do not assume an invisible region will remain clickable.
- Prefer clipping or masking decorative artwork rather than whole sections of essential content.
- Test the fallback as well as the enhanced appearance.

## Common mistakes

- Treating `clip-path`, `mask-image`, and `shape-outside` as interchangeable.
- Expecting a clip path to change layout dimensions.
- Expecting `shape-outside` to clip the visible image or affect a non-floated element.
- Forgetting to float the element whose shape should guide text wrapping.
- Using black as a mask and assuming black itself hides content. Alpha or luminance interpretation determines mask visibility.
- Applying a fade mask to text and controls that need to stay fully visible.
- Putting buttons or focus outlines where the clip removes them from view.
- Omitting a fallback for important visual structure.

## Try it yourself

1. Crop a decorative panel with `circle()`, `inset()`, and `polygon()`, then compare the results.
2. Change an image's `clip-path` without changing its width or height. Observe that nearby layout does not move.
3. Apply a left-to-right mask gradient and adjust where the fade begins.
4. Replace an opaque mask stop with a partly transparent color to create a softer transition.
5. Float a circular image and set `shape-outside: circle(50%)` so a paragraph wraps beside it.
6. Increase `shape-margin` and observe the space between the text and float shape.
7. Disable the `@supports` rule and check that the content still makes sense.
8. Add a focusable link near a clipped edge and verify that the focus indicator remains visible.

## Key points

- `clip-path` limits the painted region to a boundary and does not change the layout box.
- `mask-image` controls visibility with alpha or luminance and can create gradual fades.
- CSS gradient masks use their alpha channel by default, so opaque black reveals as well as opaque white.
- `shape-outside` changes text wrapping around a float; it does not crop that element.
- `shape-margin` adds room between inline text and a float's shape.
- Keep essential content, controls, and focus indicators visible and provide useful fallbacks.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [47 - Filters, blending, and opacity](47-filters-blending-and-opacity.md) | [Q&A](../qnas/48-clipping-masking-and-shapes.md) | [Example](../examples/48-clipping-masking-and-shapes.md) | [49 - CSS nesting](49-css-nesting.md) |
