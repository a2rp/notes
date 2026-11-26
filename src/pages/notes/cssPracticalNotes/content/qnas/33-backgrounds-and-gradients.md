# 33 - Backgrounds and Gradients - Q&A

This chapter's questions cover CSS background colors, image layers, sizing, positioning, gradients, and accessible use. Each answer follows its question.

## Multiple-choice questions

### 1. Where is an element's background painted?

- A. In front of its text
- B. Behind its content
- C. Outside its margin
D. Only inside its content box

**Answer: B. Behind its content.**

**Explanation:** A background is a visual layer of the element's box. It does not become a separate element or add content to the page.

### 2. Which property sets the solid color beneath all background image layers?

- A. `color`
- B. `background-color`
- C. `background-image`
D. `background-clip`

**Answer: B. `background-color`.**

**Explanation:** The background color is painted below the background images. It remains a useful fallback if an image cannot be displayed or if image backgrounds are disabled.

### 3. What does `background-size: cover` do?

- A. Fits the entire image inside the area, possibly leaving empty space
- B. Scales the image to cover the area, possibly cropping it
- C. Repeats the image until the area is covered
D. Makes the image cover the border only

**Answer: B. It scales the image to cover the area, possibly cropping it.**

**Explanation:** `cover` preserves the image's proportions while ensuring that the positioning area has no uncovered space. Some edges can fall outside the area.

### 4. Which background image layer is painted closest to the viewer?

- A. The first listed image
- B. The last listed image
- C. The image with the largest dimensions
D. The image listed after the background color

**Answer: A. The first listed image.**

**Explanation:** Background image layers are listed from front to back. The background color is below all of them.

### 5. Which value creates a smooth color sweep around a center point?

- A. `linear-gradient()`
- B. `radial-gradient()`
- C. `conic-gradient()`
D. `repeating-linear-gradient()`

**Answer: C. `conic-gradient()`.**

**Explanation:** A conic gradient sweeps color stops around a center. A radial gradient spreads out from a center, while a linear gradient follows a line.

### 6. Which background property disables tiling for a single image?

- A. `background-repeat: none`
- B. `background-repeat: no-repeat`
- C. `background-size: no-repeat`
D. `background-image: single`

**Answer: B. `background-repeat: no-repeat`.**

**Explanation:** `no-repeat` draws a single copy of the image. `none` is not a valid value for `background-repeat`.

### 7. Which image is the better choice for a CSS background?

- A. A diagram whose details need to be explained
- B. A profile portrait that identifies a person
- C. A decorative color wash behind a heading
D. A chart that contains the only copy of its data

**Answer: C. A decorative color wash behind a heading.**

**Explanation:** A CSS background has no `alt` text. Meaningful images and information should be available in the HTML content with appropriate text alternatives.

### 8. What does `background-position: 50% 50%` normally do?

- A. Places the image's top-left corner at the center
- B. Aligns the image's center with the positioning area's center
- C. Scales the image to half size
D. Repeats the image twice

**Answer: B. It aligns the image's center with the positioning area's center.**

**Explanation:** Percentage positions align matching percentage points in the image and the positioning area. Fifty percent on both axes centers the image.

## True or false

### 9. A background image contributes to an element's layout height.

**Answer: False.**

**Explanation:** Backgrounds are painted on the element's box. Content, dimensions, padding, and layout determine the box size.

### 10. A background color is painted underneath every background image layer.

**Answer: True.**

**Explanation:** The color serves as the base background. Image layers are painted above it.

### 11. The first image in a comma-separated background list appears behind the later images.

**Answer: False.**

**Explanation:** The first image is closest to the viewer. Later images are behind earlier ones.

### 12. `background-repeat` defaults to `no-repeat`.

**Answer: False.**

**Explanation:** Background images repeat by default. Set `background-repeat: no-repeat` when you want one copy.

## Short-answer questions

### 13. When should you use an HTML `<img>` instead of a CSS background?

**Answer:** Use an HTML image when it is meaningful content or conveys information, such as a product, a diagram, or a portrait. Use a CSS background for decoration.

**Explanation:** HTML images can have useful `alt` text and are part of the document's content. A CSS background is a visual style and has no text alternative.

### 14. Explain the difference between `background-origin` and `background-clip`.

**Answer:** `background-origin` chooses the box used to position the background image. `background-clip` chooses the box within which the background can be painted.

**Explanation:** Origin affects placement; clip affects the visible painting area. Neither property changes the element's dimensions.

### 15. Explain the difference between `cover` and `contain`.

**Answer:** `cover` fills the positioning area while preserving the image's proportions, which can crop the image. `contain` fits the entire image while preserving its proportions, which can leave empty space.

**Explanation:** Choose based on whether filling the area or showing the complete image is more important.

### 16. Why set a `background-color` when an element already has a background image?

**Answer:** It provides a fallback if the image fails to load or is unavailable, and it is visible beneath transparent parts of image layers.

**Explanation:** The color is drawn behind background images, so it can prevent an empty or unreadable surface when the image is missing.

### 17. What is the difference between a linear gradient and a radial gradient?

**Answer:** A linear gradient blends colors along a line. A radial gradient spreads colors outward from a center point.

**Explanation:** They are both CSS-generated image values, so they can be used with `background-image` without an image file.

## Debugging questions

### 18. Why does this image unexpectedly tile?

~~~css
.banner {
  background-image: url("../images/banner.jpg");
}
~~~

**Answer:** Background images repeat by default. Add `background-repeat: no-repeat`.

~~~css
.banner {
  background-image: url("../images/banner.jpg");
  background-repeat: no-repeat;
}
~~~

**Explanation:** Explicitly setting repeat behavior helps avoid small images appearing as a grid of tiles.

### 19. Why does the important subject in this hero disappear on a narrow screen?

~~~css
.hero {
  background-image: url("../images/hero.jpg");
  background-size: cover;
  background-position: center;
}
~~~

**Answer:** `cover` crops parts of the image to fill the hero. Move the crop's focal point with `background-position` and check the design at different widths.

~~~css
.hero {
  background-size: cover;
  background-position: 65% center;
}
~~~

**Explanation:** The best position depends on where the subject is in the image. Test the actual image at the sizes the design supports.

### 20. What is wrong with the shorthand below if the goal is to keep an earlier background image?

~~~css
.card {
  background-image: linear-gradient(#fff, #ddd);
  background: white;
}
~~~

**Answer:** The later `background` shorthand resets background longhands that it does not specify, including `background-image`. Remove the shorthand or specify the intended background image in it.

**Explanation:** A shorthand sets multiple related properties. Use a longhand property when changing only one part of an existing background.

### 21. This overlay is listed after the photo. Will it appear over the photo?

~~~css
.hero {
  background-image:
    url("../images/hero.jpg"),
    linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%));
}
~~~

**Answer:** No. The photo is first and is painted on top of the gradient. Put the gradient first to place it over the photo.

~~~css
.hero {
  background-image:
    linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)),
    url("../images/hero.jpg");
}
~~~

**Explanation:** The first image layer is closest to the viewer.

## Coding questions

### 22. Write CSS for a hero with a solid fallback, a decorative gradient overlay, and a local photo underneath.

**Answer:**

~~~css
.hero {
  color: white;
  background-color: #14243a;
  background-image:
    linear-gradient(rgb(10 25 45 / 65%), rgb(10 25 45 / 65%)),
    url("../images/coast.jpg");
  background-repeat: no-repeat, no-repeat;
  background-position: center, 60% center;
  background-size: cover, cover;
}
~~~

**Explanation:** The gradient is the first layer, so it appears over the photo. The solid color is below both image layers and provides a fallback. The text still needs adequate contrast over the rendered design.

### 23. Write a repeating diagonal stripe pattern with no image file.

**Answer:**

~~~css
.stripes {
  background-color: #edf2f4;
  background-image: repeating-linear-gradient(
    45deg,
    #edf2f4 0 10px,
    #8d99ae 10px 12px
  );
}
~~~

**Explanation:** A repeating linear gradient repeats the specified color-stop sequence, creating the stripes as a generated CSS image.

### 24. Write a radial glow near the upper-right part of a card.

**Answer:**

~~~css
.card {
  background-color: #10243a;
  background-image: radial-gradient(
    circle at 80% 20%,
    #ffd166,
    #ef476f 35%,
    #10243a 75%
  );
}
~~~

**Explanation:** The `circle at 80% 20%` part places the center near the card's upper-right area. Adjust the stop positions and colors to make the glow larger or softer.

### 25. Write a linear gradient with a sharp color split halfway across a panel.

**Answer:**

~~~css
.panel {
  background-image: linear-gradient(
    to right,
    #f4f1de 0 50%,
    #e07a5f 50% 100%
  );
}
~~~

**Explanation:** The two stops at the same midpoint create a hard boundary. If the stop positions were different, the colors would blend through the intervening range.

## Key takeaways

- Backgrounds are visual layers behind an element's content.
- Use HTML images for meaningful content and CSS backgrounds for decoration.
- The first background image is the topmost layer; the background color sits beneath all image layers.
- `cover` can crop an image, while `contain` shows the whole image.
- Gradients are generated CSS images and do not need a separate image file.
- Keep content understandable when background images are missing or disabled.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [32 - Logical properties and writing modes](../lessons/32-logical-properties-and-writing-modes.md) | [Q&A](33-backgrounds-and-gradients.md) | [Example](../examples/33-backgrounds-and-gradients.md) | [34 - Fonts and typography](../lessons/34-fonts-and-typography.md) |
