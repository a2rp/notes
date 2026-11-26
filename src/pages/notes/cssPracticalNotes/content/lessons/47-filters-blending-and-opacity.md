# 47 - Filters, blending, and opacity

CSS filters and blending change how already-rendered pixels look. A filter can blur, recolor, brighten, or add a shadow to an element's rendered image. Blending combines colors from overlapping content. Opacity controls how strongly a rendered element group is composited with what is behind it.

These effects change presentation, not document structure. They do not replace meaningful HTML, readable contrast, or a useful fallback.

## Learning outcomes

After this chapter, you should be able to:

- Apply common CSS filter functions and explain their order.
- Choose between `filter`, `opacity`, and alpha in a color.
- Use `drop-shadow()` for a shadow that follows transparent shapes.
- Blend background layers or an element with content behind it.
- Limit blend interactions with `isolation`.
- Add a translucent `backdrop-filter` panel with a readable fallback.
- Recognize stacking context, contrast, and performance considerations.

## Filters change rendered pixels

The `filter` property applies one or more visual operations to an element's rendered output:

~~~css
.photo {
  filter: grayscale(1) contrast(1.15);
}
~~~

The browser first renders the element and its descendants, then applies the filter to that rendered result. The filter does not alter the element's HTML, text, intrinsic dimensions, or normal-flow layout. A blur can paint outside the element's box, but that does not make the box larger or move neighboring content.

Use `filter: none` to remove a filter. A filter list is processed from left to right, so changing the order can change the result:

~~~css
.artwork {
  filter: brightness(1.15) saturate(1.3);
}

.artwork:hover {
  filter: saturate(1.3) brightness(1.15);
}
~~~

These two lists contain the same functions, but the browser applies them in a different order. A later `filter` declaration replaces the earlier value; it does not append another function to it. Include every function that should remain in the new list.

## Common filter functions

Filter amounts often accept a number or percentage. For example, `brightness(1.2)` and `brightness(120%)` both mean 120 percent brightness. When an amount is omitted from a function that allows one, its default is generally 1, or 100 percent.

| Function | Typical use |
| :--- | :--- |
| `blur(5px)` | Soften details. The value is a non-negative length. |
| `brightness(1.2)` | Make output brighter or darker. `1` leaves it unchanged. |
| `contrast(1.25)` | Increase or reduce the difference between light and dark areas. |
| `grayscale(1)` | Remove color. |
| `hue-rotate(90deg)` | Rotate hues around the color wheel by an angle. |
| `invert(1)` | Invert colors. |
| `opacity(0.6)` | Change the alpha of the filtered output. |
| `saturate(1.4)` | Increase or reduce color intensity. |
| `sepia(0.8)` | Add a warm, brown-toned treatment. |
| `drop-shadow(0 0.4rem 0.5rem rgb(0 0 0 / 0.3))` | Add a shadow following the output's opaque shape. |

A value of `1` or `100%` usually leaves an amount-based function at its neutral setting. For example, `grayscale(0)` preserves color, `contrast(1)` preserves contrast, and `opacity(1)` preserves opacity.

A filter can contain several functions:

~~~css
.muted-photo {
  filter: grayscale(0.8) brightness(0.9) contrast(1.1);
}
~~~

Keep the list easy to understand. A long stack of filters can make an image difficult to interpret, and it can be harder to tune because each operation changes the input to the next one.

## `drop-shadow()` and `box-shadow`

`box-shadow` follows an element's rectangular box. `drop-shadow()` follows the alpha shape in the rendered output:

~~~css
.icon {
  filter: drop-shadow(0.15rem 0.2rem 0.2rem rgb(0 0 0 / 0.35));
}
~~~

This is useful for a transparent PNG or an icon whose visible shape is not rectangular. The filter shadow uses the source's visible silhouette. `drop-shadow()` does not accept the `inset` keyword or a spread-radius value. Use `box-shadow` when a shadow should follow the box, such as on a card.

## Opacity and color alpha

The `opacity` property composites the whole element as a group:

~~~css
.card {
  opacity: 0.7;
}
~~~

Text, borders, backgrounds, and descendants all contribute to that group. The property is not inherited as a CSS value, but the visible result includes descendants because the group is composited together. A parent with reduced opacity can make otherwise opaque text look faint.

If only one paint should be translucent, put alpha on that color instead:

~~~css
.card {
  background-color: rgb(255 255 255 / 0.75);
  color: #17212b;
}

.card__label {
  color: rgb(23 33 43 / 0.7);
}
~~~

The background alpha lets the surface show content behind it while the text remains fully opaque. Use `opacity` when the whole rendered group should fade, such as a decorative illustration. Use alpha in a color when only that specific background, border, or text paint should be translucent.

An element with `opacity: 0` still takes up its normal-flow space. Zero opacity alone does not make content semantically hidden or remove it from keyboard navigation. Use the appropriate HTML and accessibility behavior when content needs to become unavailable.

## Blend backgrounds within one element

`background-blend-mode` blends an element's background layers with one another. It does not blend the element's text with the page:

~~~css
.poster {
  background-image:
    linear-gradient(rgb(20 30 80 / 0.35), rgb(20 30 80 / 0.35)),
    url("poster.jpg");
  background-blend-mode: multiply, normal;
}
~~~

The first mode applies to the first background layer, and the next mode applies to the next layer. If the lists are shorter than the number of layers, the values repeat. The first listed background image is painted in front of the following images. The background color is painted below the images and blends according to the final mode in the list.

Common blend modes include `multiply`, `screen`, `overlay`, `darken`, `lighten`, and `normal`. Their names describe different ways to combine source and backdrop colors. The result depends on both colors, so test blend modes against the actual backgrounds and text that will be used.

## Blend an element with what is behind it

`mix-blend-mode` blends an element's rendered content with its backdrop:

~~~css
.badge {
  mix-blend-mode: multiply;
}
~~~

The backdrop may include other painted elements, so the same element can look different against different backgrounds. `normal` is the default and paints without this color blending.

A blend can unexpectedly interact with content outside a component. Give the component a local blending group with `isolation: isolate` when that is the intended boundary:

~~~css
.artwork {
  isolation: isolate;
}

.artwork__circle {
  mix-blend-mode: multiply;
}
~~~

`isolation: isolate` creates a stacking context and makes the element's contents blend within that isolated group. It is useful for containing visual effects, but it also affects stacking behavior. Check the result where the component overlaps nearby content.

## Filter what is behind a translucent surface

`backdrop-filter` applies filter functions to the pixels behind an element, within the area occupied by that element. The element needs a translucent or partly transparent surface for the filtered backdrop to be visible:

~~~css
.glass-panel {
  background: rgb(255 255 255 / 0.72);
  backdrop-filter: blur(12px) saturate(1.2);
}
~~~

The panel's own text and foreground content are not blurred by this property. The blur affects the backdrop visible through the panel. If the panel background is fully opaque, it hides the backdrop and the effect cannot be seen.

Keep a useful base surface and progressively enhance it:

~~~css
.glass-panel {
  background: rgb(255 255 255 / 0.92);
}

@supports (backdrop-filter: blur(1px)) {
  .glass-panel {
    background: rgb(255 255 255 / 0.72);
    backdrop-filter: blur(12px);
  }
}
~~~

Without support, the panel still has a light background. A translucent surface should not be the only reason text is readable; check its contrast over every background that can show through.

## Stacking contexts and layout

Some visual effects create a stacking context. Examples include a non-`none` `filter`, an `opacity` value below `1`, a non-`normal` `mix-blend-mode`, and a non-`none` `backdrop-filter`. A stacking context paints as a group in its parent context. A large `z-index` on a child cannot escape that group to cover an element in a higher parent stacking context.

These properties do not change normal-flow geometry, but they can change painting order and layering. If a dropdown or tooltip appears behind another section after adding a filter, inspect the ancestor stacking contexts as well as the child's `z-index`. Use the effect on the smallest sensible component and keep overlays in a deliberate layer structure.

## Accessibility and performance

- Do not use a filter or blend mode as the only way to communicate a state. Pair visual changes with text, an icon, or another perceivable cue.
- Check text contrast on every background. A translucent surface can reveal different colors behind it.
- Avoid lowering the opacity of a whole text group when the text must remain easy to read.
- Keep a visible base style when using `backdrop-filter` or other optional effects.
- Avoid strong blur on text and controls. Blurring a control can make its label or focus indicator difficult to see.
- Large blur regions and frequent changes to filters can be expensive to paint. Use effects deliberately, especially on large or scrolling areas.
- If an effect is animated, keep it subtle and honor reduced-motion preferences when it creates movement or flashing.

## Common mistakes

- Expecting `filter` or `backdrop-filter` to change layout dimensions.
- Forgetting that filter functions run in order.
- Writing a second `filter` declaration and expecting it to add to the first list.
- Using `opacity` on a parent when only its background should be translucent.
- Expecting `background-blend-mode` to blend text with a page backdrop.
- Using `mix-blend-mode` without checking which nearby content becomes its backdrop.
- Assuming a child with a large `z-index` can leave its ancestor stacking context.
- Making text depend on an unsupported blur or a low-opacity surface for contrast.
- Applying expensive filters to large regions without checking the result on target devices.

## Try it yourself

1. Create three copies of the same artwork and apply `grayscale(1)`, `sepia(1)`, and `saturate(1.5)`.
2. Reverse the order of `brightness()` and `contrast()` in a filter list and compare the output.
3. Apply `drop-shadow()` to an irregular transparent icon, then compare it with `box-shadow`.
4. Change a card's background to a color with alpha while keeping its text opaque.
5. Add two gradient background layers and compare `multiply`, `screen`, and `overlay`.
6. Put a `mix-blend-mode` element inside and outside an `isolation: isolate` container.
7. Add a translucent `backdrop-filter` panel over a colorful background and verify that its text remains readable.
8. Put a positioned overlay inside an element with a filter and inspect how stacking changes.

## Key points

- `filter` changes an element's rendered output; `backdrop-filter` changes the pixels behind a translucent surface.
- Filter functions are applied in written order, and a later `filter` value replaces the earlier list.
- `drop-shadow()` follows the rendered alpha shape; `box-shadow` follows the box.
- `opacity` affects the whole rendered element group, while alpha on a color affects only that paint.
- `background-blend-mode` blends background layers; `mix-blend-mode` blends an element with its backdrop.
- `isolation: isolate` can contain blending and creates a stacking context.
- These visual effects do not change normal-flow layout, but they can affect stacking and paint cost.
- Keep text readable and provide a useful fallback for optional effects.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [46 - Scroll-driven animations](46-scroll-driven-animations.md) | [Q&A](../qnas/47-filters-blending-and-opacity.md) | [Example](../examples/47-filters-blending-and-opacity.md) | [48 - Clipping, masks, and shapes](48-clipping-masking-and-shapes.md) |
