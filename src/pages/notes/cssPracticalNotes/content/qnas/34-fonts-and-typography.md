# 34 - Fonts and Typography - Q&A

Use these questions to review font stacks, sizing, line height, web fonts, and readable text styling. Each answer follows its question.

## Multiple-choice questions

### 1. What does the browser do when it cannot use the first font in a family list?

- A. It stops rendering the text
- B. It tries the next family in the list
- C. It changes the HTML text
D. It removes the element

**Answer: B. It tries the next family in the list.**

**Explanation:** A font stack is an ordered list. Include a generic family at the end so the browser still has a broad fallback choice.

### 2. Which value is a generic font family?

- A. `Arial`
- B. `"Segoe UI"`
- C. `sans-serif`
D. `"Notes Sans"`

**Answer: C. `sans-serif`.**

**Explanation:** A generic family describes a category of typeface. The other choices are named font families.

### 3. Which unit is relative to the root element's font size?

- A. `rem`
- B. `px`
- C. `vh`
D. `cm`

**Answer: A. `rem`.**

**Explanation:** `rem` gives a consistent root-relative size. A user or browser setting that changes the root size can affect rem-based text.

### 4. What does `line-height: 1.5` mean?

- A. Every line is exactly 1.5 pixels high
- B. The line height is 1.5 times the element's font size
- C. The font size becomes 1.5 times larger
D. The text is indented by 1.5 characters

**Answer: B. The line height is 1.5 times the element's font size.**

**Explanation:** A unitless line height is a multiplier. It can scale with each element's font size.

### 5. What must be included in the `font` shorthand?

- A. A font size and a font family
- B. A color and a font size
- C. A line height and a color
D. A font weight and a text alignment

**Answer: A. A font size and a font family.**

**Explanation:** The shorthand can also include style, weight, and line height, but it requires a size and family.

### 6. Which CSS rule is a good fallback for a web font?

- A. Remove all other font families
- B. End the family list with a generic family
- C. Use `font-size: 0` until the font loads
D. Set `overflow: hidden` on the text

**Answer: B. End the family list with a generic family.**

**Explanation:** The browser can use a local or generic font if the web font cannot be loaded.

### 7. Which property changes the visual case of text without changing the text stored in HTML?

- A. `font-family`
- B. `text-align`
- C. `text-transform`
D. `font-weight`

**Answer: C. `text-transform`.**

**Explanation:** It changes the text's presentation. Keep the source text in HTML correctly written and meaningful.

### 8. Which declaration makes a font stack more robust?

- A. `font-family: "Notes Sans";`
- B. `font-family: "Notes Sans", Arial, sans-serif;`
- C. `font-family: sans-serif, "Notes Sans";`
D. `font-family: inherit;`

**Answer: B. `font-family: "Notes Sans", Arial, sans-serif;`.**

**Explanation:** The browser tries the preferred family first, then named and generic fallbacks.

## True or false

### 9. `font-size: 1rem` is relative to the root element's font size.

**Answer: True.**

**Explanation:** That is the meaning of the `rem` unit.

### 10. Every installed font family contains every character used on a page.

**Answer: False.**

**Explanation:** A font can lack glyphs for some scripts or symbols. The browser can use a fallback font for characters the chosen face does not contain.

### 11. A unitless `line-height` can scale with the element's font size.

**Answer: True.**

**Explanation:** The unitless number acts as a multiplier, which is generally more flexible than a small fixed length.

### 12. The `font` shorthand changes only the font property that appears in its value.

**Answer: False.**

**Explanation:** The shorthand sets a group of font subproperties and resets omitted ones to their initial values. Use a longhand when changing one property.

### 13. A web font should still have a fallback family.

**Answer: True.**

**Explanation:** The font file could fail to load, may not include every glyph, or may not be supported in a particular context.

## Short-answer questions

### 14. Why should a font stack end with a generic family?

**Answer:** It gives the browser a broad fallback category if the named font choices are unavailable.

**Explanation:** A generic family such as `serif`, `sans-serif`, or `monospace` lets the browser choose a suitable installed face.

### 15. What is the difference between `em` and `rem`?

**Answer:** `rem` is relative to the root element's font size. `em` is relative to the font size context of the element and can compound in nested elements.

**Explanation:** Use `rem` for a predictable site-wide scale. Use `em` when the size should follow the local text context.

### 16. Why is unitless line height often a good choice for body text?

**Answer:** It scales with the font size and avoids forcing every line to the same fixed height.

**Explanation:** If users enlarge text, a unitless line-height can preserve useful spacing. Always inspect the result at larger sizes.

### 17. What information does a `@font-face` rule provide?

**Answer:** It gives the font a family name and describes the font resource and properties such as style and weight.

**Explanation:** The browser uses those descriptors to select the appropriate font face when the family is requested.

### 18. Why should a page declare its correct language in HTML?

**Answer:** Language information helps browsers and assistive technologies interpret the text. It can also help language-sensitive typography such as line breaking and hyphenation.

**Explanation:** Use the correct `lang` value on the document and mark passages in a different language when appropriate.

### 19. Give two ways to make body text more comfortable to read.

**Answer:** Use a suitable font size with a flexible line height, and limit the width of long reading text.

**Explanation:** Typography should be judged with actual paragraphs and across screen sizes. No single size or width works for every design and language.

## Debugging questions

### 20. Why might this heading look heavier than expected?

~~~css
h1 {
  font-family: "Notes Sans", sans-serif;
  font-weight: 700;
}
~~~

**Answer:** The selected family may not provide a true 700 weight. The browser can choose the nearest available face or synthesize a heavier appearance.

**Explanation:** Check the font files and their descriptors. If only a regular file is loaded, declaring 700 does not create a designed bold face.

### 21. Why might nested text become much larger than intended?

~~~css
.card {
  font-size: 1.25em;
}

.card p {
  font-size: 1.25em;
}
~~~

**Answer:** Each `em` value is relative to its local font-size context, so the paragraph's size compounds on top of the card's size.

**Explanation:** Use `rem` for sizes that should follow the root scale, or set local sizes with a clear understanding of their parent context.

### 22. What is risky about this line-height?

~~~css
.article {
  line-height: 18px;
}
~~~

**Answer:** The fixed height may become cramped if the text is enlarged or if a fallback font has taller glyphs.

**Explanation:** A unitless value such as `line-height: 1.6` can adapt to the text's font size. Check the actual result with zoom and fallback fonts.

### 23. Why does this web font fail to load after the CSS file is moved?

~~~css
@font-face {
  font-family: "Notes Sans";
  src: url("../fonts/notes-sans.woff2") format("woff2");
}
~~~

**Answer:** The URL is resolved relative to the stylesheet, so moving the stylesheet can make the relative path point to the wrong location.

**Explanation:** Recheck the file path from the stylesheet's new location. Also make sure the font file exists and is included in the project.

### 24. What can be lost when replacing a longhand with this shorthand?

~~~css
.card-title {
  font-weight: 700;
}

.card-title {
  font: 1.25rem Arial, sans-serif;
}
~~~

**Answer:** The shorthand resets omitted font subproperties, including the earlier bold weight, so the title may no longer be bold.

**Explanation:** Add the weight to the shorthand or change only the desired longhand property.

## Coding questions

### 25. Write a readable body font stack with a generic sans-serif fallback and flexible line spacing.

**Answer:**

~~~css
body {
  font-family: Arial, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
~~~

**Explanation:** The browser tries the named fonts in order, then selects an available sans-serif font. The unitless line height scales with the text.

### 26. Write a responsive heading size that has a minimum and maximum.

**Answer:**

~~~css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
}
~~~

**Explanation:** The preferred value can grow with the viewport, while the first and last values limit its range.

### 27. Define a local regular font file and keep a fallback stack.

**Answer:**

~~~css
@font-face {
  font-family: "Notes Sans";
  src: url("../fonts/notes-sans-regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

body {
  font-family: "Notes Sans", Arial, sans-serif;
}
~~~

**Explanation:** The descriptors identify the face and its weight. The family stack remains usable if the file fails to load.

### 28. Write a heading rule using the `font` shorthand with bold weight, size, line height, and fallbacks.

**Answer:**

~~~css
h2 {
  font: 700 1.5rem / 1.25 "Segoe UI", Arial, sans-serif;
}
~~~

**Explanation:** The size is required, the slash introduces the line height, and the family list comes last.

## Key takeaways

- A font stack gives the browser ordered choices and a generic fallback.
- Use relative sizes and flexible line spacing for text that can adapt to user settings.
- A requested weight must be available in a font face to render exactly as intended.
- Web fonts need correct descriptors, a fallback stack, and working file paths.
- The `font` shorthand resets omitted font subproperties.
- Readability depends on real content, line width, zoom, and the languages used.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [33 - Backgrounds and gradients](../lessons/33-backgrounds-and-gradients.md) | [Q&A](34-fonts-and-typography.md) | [Example](../examples/34-fonts-and-typography.md) | [35 - Text layout, spacing, and wrapping](../lessons/35-text-layout-and-wrapping.md) |
