# 43 - Transforms

CSS transforms change how an element is drawn by moving, rotating, scaling, or skewing its coordinate system. They are useful for visual adjustments, layered designs, and small interactive effects. A transform changes the rendered appearance without taking the element out of its normal layout position.

## Learning outcomes

After this chapter, you should be able to:

- Explain the difference between a visual transform and a layout change.
- Move, rotate, scale, and skew an element with the `transform` property.
- Set the point around which a transform occurs with `transform-origin`.
- Explain why the order of transform functions matters.
- Use the individual `translate`, `rotate`, and `scale` properties.
- Recognize the basic perspective and depth properties used for 3D transforms.

## What a transform changes

The `transform` property applies one or more transformations to an element:

~~~css
.card {
  transform: translateX(1rem) rotate(2deg);
}
~~~

A transform changes the element's rendered position or shape. It does not make the browser recalculate the surrounding layout as if the element had a new width, height, or position. The element keeps its original layout space, so a transformed element can overlap nearby content or extend beyond its original area.

Use layout tools such as Grid, Flexbox, margins, and positioning to arrange page content. Use transforms for visual changes to an element that already has a place in the layout.

A non-`none` transform also creates a stacking context. This affects how the element and its descendants are layered with other stacking contexts. Avoid adding transforms just to solve ordinary layout spacing problems.

## The `transform` property

The initial value is `none`, which means no transform is applied. A transform list combines one or more functions, separated by spaces:

~~~css
.icon {
  transform: translateY(-0.15em) scale(1.1);
}
~~~

The order of functions matters. A translation followed by a rotation can produce a different result from a rotation followed by a translation because each function participates in the transformed coordinate system. Try both orders when a combined transform does not move around the point you expect.

Setting `transform` in a later rule replaces the earlier `transform` value. For example, a hover rule containing only `scale(1.05)` replaces a base rule's `rotate(2deg)`. To preserve both effects, include both functions in the new value or use the individual transform properties described below.

## Translate: move an element

`translate()` moves the element along the horizontal and vertical axes. Lengths such as `px`, `rem`, and `%` are accepted:

~~~css
.badge {
  transform: translate(0.5rem, -0.25rem);
}
~~~

The first value moves along the X axis. The second moves along the Y axis. Positive X moves right. Positive Y moves down. A one-value `translate()` moves horizontally; `translateX()` and `translateY()` express one axis explicitly.

~~~css
.notice {
  transform: translateY(-0.5rem);
}
~~~

Translation is often useful for a small visual alignment or for moving an item during an interaction. It does not reserve new layout space at the translated location.

## Rotate: turn an element

`rotate()` turns an element by an angle. Common angle units are degrees (`deg`), turns (`turn`), and radians (`rad`):

~~~css
.label {
  transform: rotate(-3deg);
}
~~~

In the usual screen coordinate system, a positive angle turns clockwise. A negative angle turns counterclockwise. The default pivot is the center of the element, but `transform-origin` can change it.

The transform functions `rotateX()`, `rotateY()`, and `rotateZ()` rotate around 3D axes. `rotate()` is equivalent to rotation around the Z axis for a flat 2D element.

## Scale: change the drawn size

`scale()` changes an element's drawn width and height by factors:

~~~css
.card:hover {
  transform: scale(1.04);
}
~~~

A scale factor of `1` keeps the dimension unchanged, `2` doubles it, and `0.5` halves it. A negative factor flips the element across an axis as it scales. Two values control horizontal and vertical scale separately:

~~~css
.preview {
  transform: scale(1.1, 0.9);
}
~~~

Scaling does not change the element's layout size. A larger element may cover a neighbor, so leave room for the effect and check that the transformed content is not clipped by an ancestor's `overflow` setting.

## Skew: slant an element

`skewX()` and `skewY()` slant an element along an axis:

~~~css
.banner {
  transform: skewX(-5deg);
}
~~~

Skewing distorts the element's shape and its contents together. Use it sparingly for visual treatments. Large skew angles can make text difficult to read.

## Choose a transform origin

`transform-origin` sets the point around which rotations, scaling, and other transforms take place. Its default is the center of the element:

~~~css
.door {
  transform-origin: left center;
  transform: rotateY(25deg);
}
~~~

Common values include keywords such as `left`, `center`, and `bottom`, percentages, and lengths. Two values set the horizontal and vertical origin. A third length can set the origin along the Z axis for a 3D transform.

~~~css
.spinner {
  transform-origin: 50% 50%;
}

.clock-hand {
  transform-origin: left center;
}
~~~

Changing `transform-origin` does not move the element's layout box. It changes the pivot used by the transform.

## Combine transforms carefully

Several functions can be written in one `transform` value:

~~~css
.tile {
  transform: translate(1rem, 0.5rem) rotate(4deg) scale(1.05);
}
~~~

The order is part of the design. Reordering the functions can change the direction or distance of movement as well as the final angle and size. Keep transform lists short enough to understand, and test the final result at the element's actual size.

If an element appears not to transform, check whether it generates a transformable box. A regular inline text span does not behave like a block box for transforms. Set it to `inline-block` or another suitable display type when it needs an independent transformed box:

~~~css
.rotated-word {
  display: inline-block;
  transform: rotate(-4deg);
}
~~~

## Individual transform properties

CSS also has the individual `translate`, `rotate`, and `scale` properties. They can make separate effects easier to read or update:

~~~css
.card {
  translate: 0 0;
  rotate: 0deg;
  scale: 1;
}

.card:hover {
  translate: 0 -0.4rem;
  rotate: 1deg;
  scale: 1.02;
}
~~~

When individual transform properties and `transform` are used together, their composition order is fixed: `translate`, then `rotate`, then `scale`, then the functions in `transform`. This order is different from choosing an arbitrary order in a single `transform` list.

Use the individual properties when distinct effects should be controlled independently. Use `transform` when the ordered transform list is easier to understand as one operation.

## Basic 3D transforms

A 3D transform can rotate or move content along the Z axis. Perspective makes nearer points appear larger and farther points appear smaller. A common setup places `perspective` on a parent:

~~~css
.scene {
  perspective: 700px;
}

.panel {
  transform: rotateY(12deg);
}
~~~

A smaller perspective distance creates a stronger depth effect. `perspective-origin` changes the viewer's vanishing point. These are different from the `perspective()` transform function, which can appear in a transform list.

For a group of transformed descendants to retain their 3D depth relative to one another, a parent can use `transform-style: preserve-3d`. `backface-visibility: hidden` can hide the back face of a rotated element. These properties are most useful in dedicated 3D scenes, where the depth and reading order are carefully designed.

## Interaction, focus, and motion

A transform does not make an element interactive. Use an appropriate HTML control for actions, and use `:hover` and `:focus-visible` to provide visible feedback for pointer and keyboard users:

~~~css
.card-link:hover,
.card-link:focus-visible {
  transform: translateY(-0.25rem);
}
~~~

Keep focus indicators visible and make sure transformed controls do not overlap or move outside the visible area. A transform by itself does not animate; animation requires a transition or animation rule. When adding motion, respect the visitor's reduced-motion preference. Transitions are covered in the next chapter.

## Common mistakes

- Expecting a transformed element to move other content and reflow the page.
- Using transforms to arrange a page instead of using layout tools.
- Forgetting that a later `transform` declaration replaces the whole earlier transform list.
- Changing the function order without checking the new result.
- Scaling or translating an element into a neighbor or outside a clipping ancestor.
- Applying a transform to ordinary inline text without giving it a transformable box.
- Removing keyboard focus visibility while adding hover transforms.
- Adding strong motion without considering reduced-motion preferences.

## Try it yourself

1. Move a card with `translate()` and observe that nearby layout does not shift.
2. Rotate a label around its center, then set its origin to `left center`.
3. Compare `translateX(2rem) rotate(20deg)` with `rotate(20deg) translateX(2rem)`.
4. Add a scale effect to both `:hover` and `:focus-visible` states.
5. Replace a combined `transform` list with the individual `translate`, `rotate`, and `scale` properties.
6. Put a rotated panel inside a parent with `perspective` and compare a small and large perspective distance.

## Key points

- `transform` changes the rendered appearance without changing normal layout space.
- Translate, rotate, scale, and skew are common 2D transform operations.
- `transform-origin` controls the pivot point.
- The order of functions in a transform list matters.
- Individual `translate`, `rotate`, and `scale` properties have a fixed composition order before `transform`.
- Transforms can overlap content and create a stacking context.
- 3D transforms use depth-related functions and perspective.
- Keep interaction, focus, and reduced-motion needs in mind when using transforms.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [42 - Generated content and counters](42-generated-content-and-counters.md) | [Q&A](../qnas/43-transforms.md) | [Example](../examples/43-transforms.md) | [44 - Transitions](44-transitions.md) |