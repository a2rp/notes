# 47 - Filters, blending, and opacity - Q&A

Review filter functions, opacity, alpha colors, blending, backdrop filters, and stacking behavior. Every answer is followed by an explanation.

## Multiple-choice questions

### 1. What does the `filter` property primarily change?

- A. The element's HTML structure
- B. The rendered appearance of the element and its descendants
- C. The element's position in normal flow
- D. The element's accessible name

**Answer: B. The rendered appearance of the element and its descendants.**

**Explanation:** CSS filters operate on rendered pixels. They do not rewrite the document structure or change normal-flow layout dimensions.

### 2. In what order are filter functions applied?

- A. Right to left
- B. Alphabetical order
- C. In the order they appear in the list
- D. The browser chooses randomly

**Answer: C. In the order they appear in the list.**

**Explanation:** Each filter function processes the result of the preceding function, so changing the order can change the final image.

### 3. What happens when a later rule declares a new `filter` value?

- A. It automatically appends to the earlier function list
- B. It replaces the earlier computed value
- C. It changes only the first filter function
- D. It has no effect

**Answer: B. It replaces the earlier computed value.**

**Explanation:** A declaration such as `filter: contrast(1.2)` replaces an earlier `filter` list. Include all functions that should remain.

### 4. Which function follows the visible alpha silhouette of an image?

- A. `box-shadow()`
- B. `drop-shadow()`
- C. `outline()`
- D. `border-shadow()`

**Answer: B. `drop-shadow()`.**

**Explanation:** `drop-shadow()` uses the rendered output's alpha shape, while `box-shadow` follows the element's rectangular box.

### 5. What does `opacity: 0.5` affect?

- A. Only the element's background color
- B. The whole rendered element group, including its descendants
- C. Only text nodes
- D. Only the border

**Answer: B. The whole rendered element group, including its descendants.**

**Explanation:** The group is composited with the backdrop at reduced opacity, so text and child content can also look translucent.

### 6. Which choice makes just a panel background translucent while keeping its text fully opaque?

- A. Set `opacity: 0.7` on the panel
- B. Set an alpha color on the panel background
- C. Set `filter: blur(4px)` on the text
- D. Set `mix-blend-mode: multiply` on every child

**Answer: B. Set an alpha color on the panel background.**

**Explanation:** Alpha in the background color affects that paint only. The panel's text does not need to be composited as a translucent group.

### 7. What does `background-blend-mode` blend?

- A. Background layers within the same element
- B. Text with the browser chrome
- C. An element with every page outside the viewport
- D. Only borders

**Answer: A. Background layers within the same element.**

**Explanation:** It blends the element's own background images and color. Use `mix-blend-mode` when an element's rendered content should blend with its backdrop.

### 8. What is the main purpose of `isolation: isolate` in a blending example?

- A. To remove the element from layout
- B. To establish a local stacking and blending group
- C. To disable all background images
- D. To make every child fully opaque

**Answer: B. To establish a local stacking and blending group.**

**Explanation:** Isolation contains the blend interaction within a stacking context instead of letting it mix unexpectedly with more distant page content.

### 9. Which pixels does `backdrop-filter` affect?

- A. The element's foreground text only
- B. The pixels behind the element, visible through its surface
- C. Only the element's border
- D. The entire page, regardless of element size

**Answer: B. The pixels behind the element, visible through its surface.**

**Explanation:** The filter applies to the backdrop within the element's area. The element's own foreground content is not blurred by this property.

### 10. Why is a translucent background commonly used with `backdrop-filter`?

- A. It makes the element's layout smaller
- B. It lets the filtered backdrop show through the element
- C. It disables stacking contexts
- D. It changes the element into an image

**Answer: B. It lets the filtered backdrop show through the element.**

**Explanation:** A fully opaque surface hides the pixels behind it, so the filtered backdrop cannot be seen through the surface.

### 11. What can happen to a child with a large `z-index` inside a filtered ancestor?

- A. It always appears above every page element
- B. It remains within its ancestor's stacking context
- C. It is automatically removed from the document
- D. It changes the filter value

**Answer: B. It remains within its ancestor's stacking context.**

**Explanation:** A child cannot use its `z-index` to escape the stacking context formed by an ancestor.

### 12. Which is a sound approach when using optional blur effects?

- A. Hide the content unless blur is supported
- B. Provide a readable base surface and enhance it when supported
- C. Make text transparent so the blur is visible
- D. Use blur as the only state indicator

**Answer: B. Provide a readable base surface and enhance it when supported.**

**Explanation:** Progressive enhancement keeps content readable without the effect and avoids relying on a particular browser capability.

## Short-answer questions

### 13. Explain the difference between `filter` and `backdrop-filter`.

**Answer:** `filter` changes the rendered output of the element and its descendants. `backdrop-filter` changes the pixels behind the element within its area.

**Explanation:** A filter works on the element's own rendered group. A backdrop filter works on what can be seen through the element's translucent surface.

### 14. How does `opacity` differ from alpha in a background color?

**Answer:** `opacity` composites the whole element group, including descendants. Alpha in a background color changes only the background paint.

**Explanation:** Use background alpha when text should stay fully opaque over a translucent surface. Use `opacity` when the whole rendered group should fade.

### 15. Why might `brightness(1.2) contrast(1.1)` produce a different result from `contrast(1.1) brightness(1.2)`?

**Answer:** Filter functions process the image in written order, and each function receives the result of the previous one.

**Explanation:** The second operation acts on already-adjusted pixels, so changing function order can change the final colors.

### 16. Why can a blurred element appear to extend past its box without moving nearby content?

**Answer:** The filter changes painted pixels, not the element's normal-flow dimensions.

**Explanation:** The blur can affect the visible paint around the edge, while layout still uses the element's original box.

### 17. What visual problem does `drop-shadow()` solve that `box-shadow` may not?

**Answer:** It can follow an irregular transparent silhouette instead of casting a shadow around the full rectangular box.

**Explanation:** This is useful for transparent icons and cutout images whose visible shape does not fill their box.

### 18. What is a stacking context, in practical terms?

**Answer:** It is a group of elements that is painted together within its parent's stacking order.

**Explanation:** Descendants can be reordered inside their own context, but their `z-index` values cannot make them escape that group to outrank elements in a higher parent context.

### 19. Why should text contrast be checked on a translucent panel?

**Answer:** Different content and colors behind the panel can show through and change the effective background under the text.

**Explanation:** A panel that looks readable over one image or color may have poor contrast over another. The fallback and enhanced effect both need to remain legible.

### 20. Does `opacity: 0` remove an element from layout or keyboard navigation?

**Answer:** No. The element still occupies layout space, and zero opacity by itself does not make it semantically unavailable or remove it from keyboard navigation.

**Explanation:** Visual transparency is not a replacement for the appropriate hidden or disabled behavior. Choose markup and state handling that match the intended interaction.

## Applied questions

### 21. A card background should be translucent, but its title should remain opaque. Which CSS approach fits?

**Answer:**

~~~css
.card {
  background-color: rgb(255 255 255 / 0.75);
  color: #17212b;
}
~~~

**Explanation:** The alpha belongs to the background paint. The card and title remain fully opaque.

### 22. A decorative PNG has transparent corners. Which shadow property is likely to follow its visible shape?

**Answer:** Use `filter: drop-shadow(...)`.

**Explanation:** `drop-shadow()` uses the rendered alpha silhouette. A regular `box-shadow` follows the image element's rectangular box.

### 23. A badge blends with unrelated content outside its card. How can the effect be limited to the card?

**Answer:**

~~~css
.card-artwork {
  isolation: isolate;
}

.card-artwork__badge {
  mix-blend-mode: multiply;
}
~~~

**Explanation:** Isolation creates a local stacking and blending group so the badge blends within the artwork component.

### 24. A glass panel's label is hard to read on some photos. Name two improvements.

**Answer:** Increase the panel's background opacity and choose a text color with stronger contrast. Also test the panel over the actual range of backgrounds.

**Explanation:** A stronger surface reduces background interference, while suitable text color preserves readability. Blur alone does not guarantee sufficient contrast.

### 25. An overlay is behind a neighboring section after an ancestor receives `filter: grayscale(1)`. What should be inspected?

**Answer:** Inspect the stacking contexts of the overlay's ancestors and the neighboring section, not just the overlay's own `z-index`.

**Explanation:** A non-`none` filter creates a stacking context. The child is ordered within that context and cannot escape it by using a very large `z-index`.

### 26. A design needs a dark tint over an image but should keep text clear. Which property can blend the image's background layers without blending the text?

**Answer:** Use `background-blend-mode` on the element's background layers.

**Explanation:** The property blends background layers with each other. The text remains foreground content and is not itself a background layer.

## Coding questions

### 27. Write a filter list that removes color, slightly brightens the result, and increases contrast.

**Answer:**

~~~css
.photo {
  filter: grayscale(1) brightness(1.08) contrast(1.12);
}
~~~

**Explanation:** The functions are applied in order. The browser converts the output to grayscale, then adjusts brightness, then contrast.

### 28. Write a translucent panel background that keeps the text opaque.

**Answer:**

~~~css
.panel {
  background-color: rgb(255 255 255 / 0.8);
  color: #17212b;
}
~~~

**Explanation:** Only the background color has alpha. The text uses a normal opaque color.

### 29. Write a glass panel with a readable fallback and a blur enhancement when supported.

**Answer:**

~~~css
.glass-panel {
  color: #17212b;
  background: rgb(255 255 255 / 0.94);
}

@supports (backdrop-filter: blur(1px)) {
  .glass-panel {
    background: rgb(255 255 255 / 0.74);
    backdrop-filter: blur(10px);
  }
}
~~~

**Explanation:** The base style remains readable without backdrop filtering. When the property is supported, the translucent panel reveals a softened backdrop.

### 30. Write CSS that blends an element with its local artwork group only.

**Answer:**

~~~css
.artwork {
  isolation: isolate;
}

.artwork__shape {
  mix-blend-mode: screen;
}
~~~

**Explanation:** The artwork establishes a local stacking context. The shape's blend mode then combines its colors within that isolated group.

### 31. Write a filter shadow for a transparent icon, with a soft dark shadow offset down and right.

**Answer:**

~~~css
.icon {
  filter: drop-shadow(0.2rem 0.3rem 0.4rem rgb(0 0 0 / 0.35));
}
~~~

**Explanation:** The first two lengths set the horizontal and vertical offsets, the third sets blur, and the color supplies a partly transparent dark shadow. The shadow follows the icon's visible alpha shape.

### 32. A heading becomes too faint because its parent card uses `opacity: 0.6`. Show how to make only the card background translucent instead.

**Answer:**

~~~css
.card {
  opacity: 1;
  background-color: rgb(255 255 255 / 0.6);
  color: #17212b;
}
~~~

**Explanation:** The card and its children remain opaque. Only the background color is composited with the specified alpha.

## Key takeaways

- Filter functions change rendered pixels and run in written order.
- A new `filter` declaration replaces the old filter list.
- `drop-shadow()` follows the alpha silhouette; `box-shadow` follows the box.
- `opacity` composites the whole element group, while color alpha affects one paint.
- `background-blend-mode` blends background layers; `mix-blend-mode` blends rendered content with its backdrop.
- `backdrop-filter` filters pixels behind a translucent surface.
- Filters and blend modes can create stacking contexts, so inspect ancestor layering.
- Keep text readable and make optional visual effects progressively enhanced.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [46 - Scroll-driven animations](../lessons/46-scroll-driven-animations.md) | [Q&A](47-filters-blending-and-opacity.md) | [Example](../examples/47-filters-blending-and-opacity.md) | [48 - Clipping, masks, and shapes](../lessons/48-clipping-masking-and-shapes.md) |
