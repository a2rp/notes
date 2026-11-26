# 48 - Clipping, masks, and shapes - Q&A

Review clipping paths, masks, float shapes, text wrapping, and accessible fallbacks. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What does `clip-path` do?

- A. Changes the element's HTML structure
- B. Restricts which parts of the element's rendered paint are visible
- C. Changes the element's width to fit a shape
- D. Wraps every page paragraph around the element

**Answer: B. Restricts which parts of the element's rendered paint are visible.**

**Explanation:** A clipping path defines the visible region. It does not change the element's normal layout box.

### 2. What does a mask use to control visibility?

- A. Only the element's border width
- B. Alpha or luminance information from a mask source
- C. The number of child elements
- D. The element's margin

**Answer: B. Alpha or luminance information from a mask source.**

**Explanation:** Opaque mask areas reveal content, transparent areas hide it, and partial values show content partly. The mask mode determines whether alpha or luminance is used.

### 3. Which property changes text wrapping around a floated element?

- A. `clip-path`
- B. `mask-image`
- C. `shape-outside`
- D. `object-fit`

**Answer: C. `shape-outside`.**

**Explanation:** `shape-outside` defines a float area that inline content avoids. It does not itself crop the float's visible image.

### 4. Which layout condition is needed for a shape to guide surrounding text with `shape-outside`?

- A. The element must be floated
- B. The element must use CSS Grid
- C. The element must be absolutely positioned
- D. The element must have `display: none`

**Answer: A. The element must be floated.**

**Explanation:** `shape-outside` applies to floats. It changes the shape of the float area for inline text flow.

### 5. What does `shape-margin` control?

- A. The element's border thickness
- B. Extra space between the float shape and surrounding inline content
- C. The width of the shape
- D. The opacity of the float

**Answer: B. Extra space between the float shape and surrounding inline content.**

**Explanation:** Shape margin expands the float area outward so text does not sit directly against the declared shape.

### 6. Which property is best for a sharp circular crop?

- A. `clip-path: circle(...)`
- B. `shape-outside: circle(...)`
- C. `mask-image: blur(...)`
- D. `overflow: scroll`

**Answer: A. `clip-path: circle(...)`.**

**Explanation:** `clip-path` defines which part of the rendered element is visible. `shape-outside` changes text flow and does not crop the element.

### 7. For a CSS gradient used as a mask, what usually controls visibility by default?

- A. The gradient's alpha channel
- B. The gradient's font size
- C. The z-index of the gradient
- D. The element's line height

**Answer: A. The gradient's alpha channel.**

**Explanation:** CSS image masks normally use alpha. Opaque black and opaque white both reveal content under alpha interpretation.

### 8. What is a key difference between clipping and masking?

- A. Clipping is only for text and masking is only for images
- B. Clipping has a sharp visible boundary, while masks can create gradual transparency
- C. Clipping changes layout but masks do not
- D. Masks cannot use gradients

**Answer: B. Clipping has a sharp visible boundary, while masks can create gradual transparency.**

**Explanation:** A clipping path includes or excludes painted areas. A mask can use partial alpha or luminance values for softer transitions.

## Short-answer questions

### 9. Explain the difference between `clip-path` and `mask-image`.

**Answer:** `clip-path` defines a visible region with a sharp boundary. `mask-image` controls visibility using alpha or luminance, so it can produce partial transparency and fades.

**Explanation:** A clip path is useful for hard crops. A mask is useful when visibility should transition gradually or follow image transparency.

### 10. Explain the difference between `shape-outside` and `clip-path`.

**Answer:** `shape-outside` changes the float area used for inline text wrapping. `clip-path` changes which rendered pixels are visible.

**Explanation:** A circular `shape-outside` alone leaves the element's rectangular image visible. Combine it with a visual crop only when both effects are wanted.

### 11. Does `clip-path` change an element's width, height, or normal-flow position?

**Answer:** No. It changes what is painted, while the element keeps its layout geometry.

**Explanation:** The original box still participates in layout. Nearby content is not rearranged to follow the clipped contour.

### 12. How do opaque black and opaque white behave in a default CSS image mask?

**Answer:** Both reveal the corresponding content when the mask is interpreted by alpha because both colors have fully opaque alpha.

**Explanation:** The color's brightness is not used for an alpha mask. Transparency is the controlling channel.

### 13. What does `shape-margin` add to a float shape?

**Answer:** It adds a buffer around the shape's float area, creating distance between the shape and nearby inline text.

**Explanation:** It changes the flow boundary around the float, not the visible dimensions of the image or element.

### 14. Why can a mask make text harder to read?

**Answer:** A mask affects visibility of the element's rendered content, which can include its text and descendants.

**Explanation:** Apply fades to decorative artwork when possible. Essential labels and controls should remain fully visible.

### 15. What does a geometry box do when used with a basic shape?

**Answer:** It selects the box used as the reference for calculating the shape, such as the content box or border box.

**Explanation:** Changing the reference box can move or resize a shape even when its percentages stay the same.

### 16. Why should meaningful images have text alternatives even when CSS clips or masks them?

**Answer:** CSS clipping and masking change appearance but do not provide a text description for the image's meaning.

**Explanation:** Use semantic markup and appropriate alternative text for meaningful images. A visual effect alone is not an accessible description.

## Applied questions

### 17. A circular image should be visible as a circle, and paragraph text should wrap around its circular edge. Which properties are needed?

**Answer:** Use `clip-path: circle(...)` to crop the image and `shape-outside: circle(...)` on the floated image to guide text wrapping.

**Explanation:** The two properties control different things: visible paint and the float's effect on inline flow.

### 18. A banner should fade away toward its right edge. Which technique is a good fit?

**Answer:** Apply a left-to-right alpha gradient with `mask-image` to the decorative banner.

**Explanation:** The gradient can transition from opaque to transparent, revealing the banner fully on one side and fading it on the other. Keep essential text outside the faded region.

### 19. Paragraph lines still wrap around a rectangular image even though `shape-outside: circle(50%)` is declared. Name two likely causes.

**Answer:** The element may not be floated, or the shape property may be unsupported or overridden.

**Explanation:** `shape-outside` applies to floats. Check the computed styles and ensure that inline text is adjacent to the float.

### 20. A clipping path makes the corners of a card's button disappear. How should the component be adjusted?

**Answer:** Move the button and its focus indicator inside the visible clipping region, or apply the clip only to a decorative child rather than the entire card.

**Explanation:** A clip path affects the element's descendants too. Essential controls should remain fully visible and operable.

### 21. A team wants an image to fade at the edge but keep its title fully opaque. What structure can help?

**Answer:** Apply the mask to a decorative image element and keep the title in a separate, unmasked element.

**Explanation:** A mask affects the rendered element group. Separating decorative art from text prevents the fade from reducing title visibility.

### 22. A decorative polygon crop is unavailable in a fallback browser. What should the base design do?

**Answer:** Keep the artwork in a readable rectangular or rounded-rectangle shape, then add the polygon crop as an enhancement.

**Explanation:** The content remains visible and understandable when the optional clipping feature is not applied.

## Coding questions

### 23. Write CSS that crops an image to a circle.

**Answer:**

~~~css
.avatar {
  width: 10rem;
  aspect-ratio: 1;
  object-fit: cover;
  clip-path: circle(48% at 50% 50%);
}
~~~

**Explanation:** The square box gives the image a circular crop area. `object-fit: cover` fills the box, and `clip-path` hides the corners.

### 24. Write CSS that clips a decorative card image into a polygon.

**Answer:**

~~~css
.card-art {
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 78%, 0 100%);
}
~~~

**Explanation:** The polygon points are percentages of the reference box. Content painted outside those points is clipped without changing the box's layout size.

### 25. Write an alpha-gradient mask that keeps the left side visible and fades toward the right.

**Answer:**

~~~css
.fade-right {
  mask-image: linear-gradient(to right, #000 60%, transparent);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}
~~~

**Explanation:** The opaque portion reveals the content, and the transparent end hides it. The gradient's alpha creates the transition.

### 26. Write a floated circle that text can wrap around, with extra breathing room.

**Answer:**

~~~css
.article-art {
  float: left;
  width: 10rem;
  aspect-ratio: 1;
  margin: 0.5rem 1rem 0.75rem 0;
  border-radius: 50%;
  shape-outside: circle(50%);
  shape-margin: 0.75rem;
}
~~~

**Explanation:** The float allows inline text to wrap beside it. `shape-outside` defines the circular flow boundary, and `shape-margin` adds space beyond that boundary.

### 27. Write a feature query that enhances a normal float with circular text wrapping.

**Answer:**

~~~css
.article-art {
  float: left;
  width: 10rem;
  aspect-ratio: 1;
  border-radius: 50%;
}

@supports (shape-outside: circle(50%)) {
  .article-art {
    shape-outside: circle(50%);
    shape-margin: 0.75rem;
  }
}
~~~

**Explanation:** The base float remains useful without the shape feature. Supporting browsers get the more precise circular flow area.

### 28. Show how to keep a button outside the clipped artwork so the control and its focus indicator remain visible.

**Answer:**

~~~html
<article class="card">
  <div class="card__art" aria-hidden="true"></div>
  <div class="card__content">
    <h2>Featured item</h2>
    <button type="button">Open details</button>
  </div>
</article>
~~~

~~~css
.card__art {
  min-height: 10rem;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}

.card__content {
  position: relative;
  padding: 1rem;
}

.card button:focus-visible {
  outline: 3px solid #111;
  outline-offset: 3px;
}
~~~

**Explanation:** The clip is limited to a decorative element, so it cannot cut off the button or its focus outline. The button remains a normal semantic control.

## Key takeaways

- Clipping limits visible paint with a defined boundary; masking uses transparency or luminance.
- Neither clipping nor masking changes the element's normal-flow layout box.
- CSS gradient masks normally use alpha, so opaque black reveals content.
- `shape-outside` changes inline text wrapping around a float, not the float's visible crop.
- `shape-margin` adds room around the float shape.
- Keep essential text, controls, and focus indicators visible, and test the fallback.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [47 - Filters, blending, and opacity](../lessons/47-filters-blending-and-opacity.md) | [Q&A](48-clipping-masking-and-shapes.md) | [Example](../examples/48-clipping-masking-and-shapes.md) | [49 - CSS nesting](../lessons/49-css-nesting.md) |
