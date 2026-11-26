# 40 - Replaced elements, aspect ratios, and object fitting

Images and videos have their own content, dimensions, and often a natural aspect ratio. CSS can size the element's box and decide how that content fits inside it. Understanding the difference helps keep media responsive without stretching or cropping it unexpectedly.

## Learning outcomes

After this chapter, you should be able to:

- Recognize common replaced elements such as images and video.
- Preserve an image's natural proportions while it resizes.
- Use `aspect-ratio` to give a box a preferred shape.
- Choose between `object-fit` values based on whether the whole object or a filled frame matters.
- Adjust a crop with `object-position`.
- Reserve space for media and avoid layout shifts while it loads.

## Replaced elements

A replaced element displays content that comes from outside the element's ordinary child content. Common examples include `<img>` and `<video>`. The browser lays out an element box, then renders the image or video inside it.

An image often has intrinsic dimensions and an intrinsic aspect ratio. An image that is 1200 pixels wide and 800 pixels high has a 3:2 ratio. When only one dimension changes, the other can follow that ratio so the image does not look stretched.

## Make images responsive

A common rule lets an image shrink to fit its container while preserving its natural ratio:

~~~css
img {
  display: block;
  max-width: 100%;
  height: auto;
}
~~~

`max-width: 100%` prevents the image from exceeding its containing block. `height: auto` lets the browser calculate a proportional height from the image's width. `display: block` removes the small baseline gap that can appear below an inline image.

The same sizing pattern can be scoped to media inside a component:

~~~css
.article img {
  display: block;
  max-width: 100%;
  height: auto;
}
~~~

## Provide image dimensions

Include the image's real width and height in HTML when they are known:

~~~html
<img
  src="mountain-view.jpg"
  width="1200"
  height="800"
  alt="A mountain ridge above a lake"
>
~~~

The browser can use the dimensions to infer the image ratio and reserve the right amount of space before the image finishes loading. CSS can still scale the rendered image to fit the layout. The width and height attributes should describe the image's real proportions, rather than the desired crop.

## Set a preferred aspect ratio

The `aspect-ratio` property sets a preferred width-to-height ratio for an element's box:

~~~css
.media-frame {
  aspect-ratio: 16 / 9;
}
~~~

A ratio of `16 / 9` describes a box that is 16 units wide for every 9 units high. If one dimension is automatic, the ratio can help determine that size. If both width and height are fixed, the preferred ratio cannot make both dimensions conform without changing those constraints.

`aspect-ratio` can apply to ordinary boxes as well as replaced elements. It shapes the box; it does not by itself crop or resize media content inside a box.

## Fit content inside the box

Use `object-fit` on a replaced element such as an image or video to choose how its content fits the element's content box. The element needs a box with dimensions for the difference between the values to be visible.

~~~css
.card-image {
  display: block;
  width: 100%;
  height: 14rem;
  object-fit: cover;
}
~~~

The available values are:

| Value | Result |
| :--- | :--- |
| `fill` | Fills the box and can distort the content if the ratios differ. This is the initial value. |
| `contain` | Preserves the content ratio and fits all of it inside the box. Empty areas can remain. |
| `cover` | Preserves the content ratio and fills the box. Parts that do not fit are cropped. |
| `none` | Uses the content's natural size rather than scaling it to fit. Some content may be clipped by the element box. |
| `scale-down` | Uses the smaller result of `none` and `contain`. |

Choose `contain` when seeing the full image matters, such as for a diagram or product image. Choose `cover` when the frame should be filled, such as a card thumbnail, and a crop is acceptable. Avoid `fill` when stretching would distort the image.

## Adjust the visible crop

When `cover` crops an image, `object-position` controls where the content is aligned within its box:

~~~css
.card-image {
  object-fit: cover;
  object-position: 70% 40%;
}
~~~

The first value positions the object horizontally and the second vertically. The default is centered. Change the position when the important subject is near one edge and would otherwise be cropped.

## Combine a ratio with `object-fit`

A reusable image frame can preserve a consistent shape while cropping images of different dimensions:

~~~css
.gallery-image {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
}
~~~

The `aspect-ratio` helps determine the box proportions. `object-fit` controls how the image content fills that box. For video, the same idea can keep a player frame consistent:

~~~css
video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  background-color: #101820;
}
~~~

If you need a visible frame even before media loads, apply the background to the element or its wrapper. `contain` can leave the background visible around the content.

## `object-fit` versus background images

`object-fit` controls the content inside a replaced element, such as `<img>` or `<video>`. `background-size` controls a CSS background image on an element's box. A CSS background does not provide the same semantic content as an `<img>` with alternative text, so use an image element when the image is meaningful content.

Use a background image for decoration when it belongs to the element's visual styling. Use an image element when the image itself conveys information or needs alternative text.

## Common mistakes

- Setting both width and height without checking whether they distort the natural ratio.
- Expecting `object-fit` to change the size of an element that has no definite box dimensions.
- Using `cover` for a diagram when cropping would remove information.
- Using `contain` and wondering why empty space remains inside the box.
- Forgetting that `object-position` can shift a crop toward the important part of an image.
- Using `aspect-ratio` as if it crops the content.
- Omitting known image dimensions and causing the page to move when the image loads.
- Styling a meaningful image only as a background and losing its text alternative.

## Try it yourself

1. Make a landscape image responsive with `max-width: 100%` and `height: auto`.
2. Give a card image an aspect ratio of `3 / 2` and compare `cover` with `contain`.
3. Change `object-position` to `left center` and then `right center`.
4. Give a video a `16 / 9` ratio and use a dark background with `contain`.
5. Remove the height from a fixed-frame image and observe how the available box changes.
6. Add accurate `width` and `height` attributes to an image and compare layout before it loads.
7. Decide whether a logo, chart, or hero photograph should use `contain` or `cover`, and explain why.

## Key points

- Replaced elements display their own content inside a CSS layout box.
- `max-width: 100%` with `height: auto` is a useful responsive image baseline.
- HTML width and height attributes can provide the natural ratio before media loads.
- `aspect-ratio` influences the box shape when automatic sizing allows it.
- `object-fit` controls how replaced content fits its box.
- `object-position` adjusts the alignment of content within the box.
- Use `contain` to keep all content visible and `cover` when filling the frame matters more than showing every edge.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [39 - Styling forms and controls](39-styling-forms-and-controls.md) | [Q&A](../qnas/40-replaced-elements-and-object-fitting.md) | [Example](../examples/40-replaced-elements-and-object-fitting.md) | [41 - Custom properties and design tokens](41-custom-properties-and-design-tokens.md) |