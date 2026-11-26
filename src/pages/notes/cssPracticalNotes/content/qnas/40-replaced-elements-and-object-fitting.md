# 40 - Replaced elements, aspect ratios, and object fitting - Q&A

Review replaced content, responsive media sizing, preferred aspect ratios, object fitting, and crop positioning. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. Which pair contains common replaced elements?

- A. `<img>` and `<video>`
- B. `<main>` and `<section>`
- C. `<ul>` and `<li>`
- D. `<h1>` and `<p>`

**Answer: A. `<img>` and `<video>`.**

**Explanation:** These elements display content that comes from an image or video resource, inside a box that CSS lays out.

### 2. What does `max-width: 100%` help prevent on an image?

- A. The image from being wider than its containing block
- B. The image from having alternative text
- C. The browser from downloading the image
- D. The image from retaining its natural ratio

**Answer: A. The image from being wider than its containing block.**

**Explanation:** It lets an image shrink when the available width is smaller than its natural width.

### 3. Why is `height: auto` commonly paired with a responsive image width?

- A. It hides the image until it is loaded
- B. It lets the height follow the image's proportions
- C. It crops the image to a square
- D. It sets the height to zero

**Answer: B. It lets the height follow the image's proportions.**

**Explanation:** When the width changes, an automatic height can be calculated from the image's intrinsic aspect ratio.

### 4. What does `aspect-ratio: 16 / 9` describe?

- A. A box 16 units high for every 9 units wide
- B. A preferred width-to-height ratio of 16 to 9
- C. A fixed width of 16 pixels and height of 9 pixels
- D. A crop from the left and right edges

**Answer: B. A preferred width-to-height ratio of 16 to 9.**

**Explanation:** The ratio describes proportions, not a fixed size. It can influence automatic sizing when the layout constraints allow it.

### 5. Which property controls how image content fits inside the image element's box?

- A. `object-fit`
- B. `font-fit`
- C. `box-image`
- D. `image-size`

**Answer: A. `object-fit`.**

**Explanation:** `object-fit` controls the sizing behavior of replaced content inside its element box.

### 6. Which `object-fit` value preserves the whole image inside the box, possibly leaving empty space?

- A. `fill`
- B. `cover`
- C. `contain`
- D. `none`

**Answer: C. `contain`.**

**Explanation:** `contain` preserves the content's ratio and fits all of it within the box. Any unused area shows the element's background.

### 7. Which `object-fit` value fills a differently shaped box while preserving the image ratio?

- A. `cover`
- B. `fill`
- C. `none`
- D. `initial`

**Answer: A. `cover`.**

**Explanation:** `cover` fills the box and preserves the ratio, so part of the image may be cropped.

### 8. What can happen when `object-fit: fill` is used and the content ratio differs from the box ratio?

- A. The content can be distorted
- B. The content always remains fully visible with blank space
- C. The element becomes an inline element
- D. The content is automatically centered with no scaling

**Answer: A. The content can be distorted.**

**Explanation:** `fill` sizes the content to the box dimensions, which can stretch it when the proportions do not match.

### 9. What does `object-position` change?

- A. The alignment of the object within its box
- B. The aspect ratio of the source image
- C. The alternative text of the image
- D. The box's border width

**Answer: A. The alignment of the object within its box.**

**Explanation:** It can shift the visible crop toward a subject near an edge of the image.

### 10. Which property is designed for a CSS background image rather than an `<img>` element's content?

- A. `object-fit`
- B. `background-size`
- C. `object-position`
- D. `aspect-ratio`

**Answer: B. `background-size`.**

**Explanation:** `background-size` controls CSS background images. `object-fit` controls content within a replaced element.

## Short-answer questions

### 11. What is a replaced element?

**Answer:** It is an element whose content is supplied or rendered separately from the element's ordinary child content, such as an image in an `<img>` element.

**Explanation:** The browser lays out the element's box and renders the replaced content inside it.

### 12. An image is 1200 pixels wide and 800 pixels high. What is its width-to-height aspect ratio in simplest terms?

**Answer:** `3 / 2`.

**Explanation:** Divide both dimensions by 400. The ratio describes proportions and does not require a 3-pixel by 2-pixel image.

### 13. What does `aspect-ratio` control, and what does it not control?

**Answer:** It sets a preferred ratio for the element's box. It does not by itself crop or fit the replaced content inside that box.

**Explanation:** Use `object-fit` to decide how replaced content fills its box.

### 14. How do `width` and `height` attributes help an image before it finishes loading?

**Answer:** They provide dimensions from which the browser can infer the image ratio and reserve space in the layout.

**Explanation:** Reserving the expected space can reduce layout movement when the image appears. Use values that describe the image's actual proportions.

### 15. What is the difference between `contain` and `cover`?

**Answer:** `contain` keeps the entire object visible and can leave empty space. `cover` fills the box and can crop parts of the object.

**Explanation:** Both preserve the content's ratio, but they prioritize different goals.

### 16. What does `object-fit: none` do?

**Answer:** It does not scale the content to fit the element's box. Content larger than the box can be clipped.

**Explanation:** The image uses its natural size rather than being resized to fit.

### 17. How does `scale-down` choose its result?

**Answer:** It uses whichever would produce the smaller result, `none` or `contain`.

**Explanation:** This can keep an image from being enlarged beyond its natural size while still reducing it when needed to fit.

### 18. Why might `display: block` be used on an image?

**Answer:** It removes the small baseline gap that can appear below an inline image.

**Explanation:** Images are inline by default in common HTML layouts. A block image is easier to align as a standalone media item.

## Applied questions

### 19. A product photo must remain fully visible inside a square card. Which fitting value should you start with?

**Answer:** `object-fit: contain`.

**Explanation:** It preserves the entire image. The remaining space can show the card or image element's background.

### 20. A gallery needs equal landscape thumbnails, and cropping is acceptable. Which combination is suitable?

**Answer:** Set a `3 / 2` aspect ratio and use `object-fit: cover`.

~~~css
.gallery-image {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
~~~

**Explanation:** The ratio creates a consistent box shape, while `cover` fills that box and crops any excess image area.

### 21. A portrait is cropped with `cover`, but the person's face is too close to the edge. What can you adjust?

**Answer:** Change `object-position` to shift the crop toward the face.

~~~css
.portrait {
  object-fit: cover;
  object-position: 70% center;
}
~~~

**Explanation:** The first position value moves the horizontal alignment. Tune it to keep the important subject visible.

### 22. You want a meaningful diagram to appear inside a fixed box without cropping. Which choice is suitable, and what semantic markup should you keep?

**Answer:** Use `object-fit: contain` on an `<img>` element and provide appropriate alternative text.

**Explanation:** `contain` keeps the full diagram visible. An image element is appropriate when the image conveys information, and its alternative text communicates that information when needed.

### 23. A responsive image stretches horizontally. Name a likely CSS fix.

**Answer:** Let its height remain automatic while constraining its width.

~~~css
img {
  max-width: 100%;
  height: auto;
}
~~~

**Explanation:** Setting both dimensions independently can distort an image. Automatic height follows its intrinsic ratio when the width changes.

## Coding questions

### 24. Write a responsive image rule that removes the inline baseline gap and preserves natural proportions.

**Answer:**

~~~css
img {
  display: block;
  max-width: 100%;
  height: auto;
}
~~~

**Explanation:** The image can shrink to fit its container, and its automatic height preserves its proportions.

### 25. Write CSS for a video that fills a 16:9 frame while keeping the video content's proportions.

**Answer:**

~~~css
video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
~~~

**Explanation:** The aspect ratio shapes the frame. `cover` fills it while preserving the video content's ratio, which can crop content if the ratios differ.

### 26. Write CSS that shows the entire image within a fixed 240 by 160 pixel box and centers it.

**Answer:**

~~~css
.preview {
  width: 240px;
  height: 160px;
  object-fit: contain;
  object-position: center;
}
~~~

**Explanation:** `contain` keeps all of the image visible, and `object-position` centers it in the available box.

### 27. Write markup that provides accurate dimensions for a 900 by 600 image.

**Answer:**

~~~html
<img
  src="landscape.jpg"
  width="900"
  height="600"
  alt="A landscape above a quiet lake"
>
~~~

**Explanation:** The dimensions communicate a 3:2 ratio so the browser can reserve the image's space. The `alt` value describes the image for people who cannot see it, when that description is relevant.

## Key takeaways

- A replaced element displays content within a box laid out by CSS.
- `max-width: 100%` and `height: auto` make a useful responsive image baseline.
- `aspect-ratio` shapes a box, while `object-fit` fits replaced content inside it.
- `contain` keeps all content visible; `cover` fills the box and can crop.
- `object-position` changes which part of a crop remains visible.
- Accurate image dimensions can reserve layout space before the image loads.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [39 - Styling forms and controls](../lessons/39-styling-forms-and-controls.md) | [Q&A](40-replaced-elements-and-object-fitting.md) | [Example](../examples/40-replaced-elements-and-object-fitting.md) | [41 - Custom properties and design tokens](../lessons/41-custom-properties-and-design-tokens.md) |