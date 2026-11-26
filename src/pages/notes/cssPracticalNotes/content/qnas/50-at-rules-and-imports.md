# 50 - At-rules, imports, and font-face - Q&A

Review common at-rules, stylesheet imports, font-face descriptors, and font loading fallbacks. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What character begins a CSS at-rule?

- A. `#`
- B. `@`
- C. `&`
- D. `:`

**Answer: B. `@`.**

**Explanation:** At-rule names begin with an at sign, as in `@media`, `@import`, and `@font-face`.

### 2. Which is a statement at-rule?

- A. `@media`
- B. `@font-face`
- C. `@import`
- D. `@keyframes`

**Answer: C. `@import`.**

**Explanation:** A statement at-rule ends with a semicolon and has no block. `@import` is an example.

### 3. Where must an `@import` rule appear?

- A. After all style rules
- B. Inside a selector block
- C. Before other valid at-rules and style rules in that stylesheet
- D. Only in an HTML style attribute

**Answer: C. Before other valid at-rules and style rules in that stylesheet.**

**Explanation:** A misplaced import is invalid and ignored. If present, `@charset` is placed first.

### 4. Which two descriptors are required for an `@font-face` rule to be usable?

- A. `font-family` and `src`
- B. `font-weight` and `font-display`
- C. `color` and `line-height`
- D. `font-size` and `font-style`

**Answer: A. `font-family` and `src`.**

**Explanation:** The family descriptor identifies the face, and the source descriptor identifies its font resource. Without either, the face cannot be used for font matching.

### 5. What does `font-display: swap` generally request?

- A. Hide all page text until the custom font loads
- B. Show fallback text promptly and use the custom font if it loads
- C. Disable the font resource
- D. Apply the custom font only when printing

**Answer: B. Show fallback text promptly and use the custom font if it loads.**

**Explanation:** Swap prioritizes visible text while the downloadable font loads. The fallback remains important if loading fails.

### 6. Relative font paths in `src` are resolved relative to which file?

- A. The page title
- B. The stylesheet containing the `@font-face` rule
- C. The user's home directory
- D. The browser executable

**Answer: B. The stylesheet containing the `@font-face` rule.**

**Explanation:** The font URL is resolved from the stylesheet location, so a nested CSS folder can require a path such as `../fonts/name.woff2`.

### 7. What is `font-weight` inside `@font-face`?

- A. A selector
- B. A descriptor that helps identify the face's weight
- C. A font size on the page
- D. An HTML attribute

**Answer: B. A descriptor that helps identify the face's weight.**

**Explanation:** The descriptor tells the browser which requested weight the font resource is meant to satisfy.

### 8. What is a generic fallback in this declaration?

~~~css
body {
  font-family: "Study Sans", Arial, sans-serif;
}
~~~

- A. `"Study Sans"`
- B. `Arial`
- C. `sans-serif`
- D. All three names are generic fallbacks

**Answer: C. `sans-serif`.**

**Explanation:** `sans-serif` is a generic family keyword. The named families are specific font names.

## Short-answer questions

### 9. What is the difference between a statement at-rule and a block at-rule?

**Answer:** A statement at-rule ends in a semicolon without a block. A block at-rule has braces, and its contents follow that rule's grammar.

**Explanation:** `@import` is a statement rule, while `@media` and `@font-face` use blocks.

### 10. Why is an `@import` after a selector rule ignored?

**Answer:** Imports must occur before other valid at-rules and style rules in that stylesheet.

**Explanation:** Import order determines where the imported rules participate in the cascade. Once ordinary rules have appeared, a later import is invalid.

### 11. How does an imported stylesheet participate in the cascade?

**Answer:** Its rules participate as though the imported rules were placed at the location of the `@import`.

**Explanation:** The import position affects source order, so stylesheet organization should be intentional.

### 12. Does `@font-face` select page elements like `.card` does?

**Answer:** No. It registers a font face using descriptors such as `font-family`, `src`, and `font-weight`.

**Explanation:** The descriptors describe a font resource. A normal selector rule then uses the registered family through the `font-family` property.

### 13. Why define separate regular, bold, or italic font faces?

**Answer:** Each rule identifies a real font resource and its style or weight so the browser can select a matching face.

**Explanation:** Accurate descriptors let the browser use the intended glyph designs. If a face is missing, the browser may synthesize a style or use another fallback.

### 14. What does `font-display` control?

**Answer:** It controls how text is shown while a downloadable font is loading.

**Explanation:** Values such as `swap`, `block`, `fallback`, and `optional` express different policies. Timing details can vary by browser.

### 15. Why should a font-family list end with a generic family?

**Answer:** It gives the browser a broad fallback if the named families are unavailable or fail to load.

**Explanation:** A custom font is an optional resource. Text should remain readable if it is missing or cannot be downloaded.

### 16. When is `@charset` usually unnecessary in a web stylesheet?

**Answer:** When the CSS file is saved as UTF-8, which is the normal choice for modern web projects.

**Explanation:** `@charset` must be at the start of a stylesheet if used. It is not the same thing as the HTML document's `<meta charset>`.

## Applied questions

### 17. A developer placed `@import` after a `.card` rule. What should they do?

**Answer:** Move the import before all valid at-rules and style rules in that stylesheet.

**Explanation:** A late import is invalid and ignored, so placing it earlier allows the imported stylesheet to participate.

### 18. A font face is declared, but the page still uses a system font. Name two things to check.

**Answer:** Check that the normal `font-family` declaration requests the registered family and that the `src` path points to a valid font file.

**Explanation:** Defining a face only registers it. The page must request its family, and the browser must be able to load the resource.

### 19. A regular font file is declared with `font-weight: 700`. What can go wrong?

**Answer:** The browser may select that regular file for bold text because the descriptor says it is a bold face.

**Explanation:** Descriptors should represent the actual resource. A mismatch can make font matching choose the wrong face.

### 20. A stylesheet is located in a `css` folder, and a font is in a sibling `fonts` folder. What relative path should the CSS source use?

**Answer:** A path such as `../fonts/study-sans.woff2`.

**Explanation:** The path is resolved from the stylesheet's location. From `css/site.css`, moving up one folder and entering `fonts` reaches the sibling folder.

### 21. A site should show text immediately while its custom font loads. Which display policy is a common choice?

**Answer:** Use `font-display: swap` with a suitable fallback family.

**Explanation:** Swap asks the browser to display fallback text promptly and replace it with the custom face if the download succeeds.

### 22. A print stylesheet is only needed for print. How can its import be conditional?

**Answer:**

~~~css
@import "./print.css" print;
~~~

**Explanation:** The media condition makes the imported rules apply to print output. The import still belongs before other valid rules in that stylesheet.

### 23. Why might an HTML stylesheet link be clearer than importing several files from CSS?

**Answer:** It lists the page's stylesheets directly in the document and makes loading order easier to inspect.

**Explanation:** CSS imports are useful in some organization schemes, but long import chains can make dependencies and loading order less obvious.

### 24. What should a developer check before using a variable font weight range in `@font-face`?

**Answer:** Verify that the font file is actually a variable font and supports the declared range.

**Explanation:** The descriptor describes the resource; it does not create weight values that the font file does not contain.

## Coding questions

### 25. Write a basic `@font-face` rule for a local regular WOFF2 font and use a visible fallback.

**Answer:**

~~~css
@font-face {
  font-family: "Study Sans";
  src: url("./fonts/study-sans-regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

body {
  font-family: "Study Sans", Arial, sans-serif;
}
~~~

**Explanation:** The face declares its family, source, style, weight, and display behavior. The page's font list includes fallback names in case the local resource cannot be used.

### 26. Add a separate bold face for the same family.

**Answer:**

~~~css
@font-face {
  font-family: "Study Sans";
  src: url("./fonts/study-sans-bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}
~~~

**Explanation:** The family name matches the regular face, while the weight descriptor identifies the bold resource for font matching.

### 27. Show a valid stylesheet order with an optional encoding declaration, imports, a layer order statement, and a style rule.

**Answer:**

~~~css
@charset "UTF-8";
@import "./reset.css";

@layer reset, base, components;

@layer base {
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
}
~~~

**Explanation:** The optional charset declaration comes first. The import appears before the layer statement and style rules.

### 28. Write a variable font face that declares a supported weight range from 100 to 900.

**Answer:**

~~~css
@font-face {
  font-family: "Study Sans Variable";
  src: url("./fonts/study-sans-variable.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
~~~

**Explanation:** The range tells the browser which weights the variable resource supports. Use it only when that range is present in the font file.

### 29. Write a conditional import that applies a stylesheet at wider viewport widths.

**Answer:**

~~~css
@import "./wide-layout.css" screen and (min-width: 60rem);
~~~

**Explanation:** The import condition limits when the imported stylesheet applies. Keep this import before other valid rules in its stylesheet.

### 30. Write a regular and italic face that share one family name.

**Answer:**

~~~css
@font-face {
  font-family: "Reading Serif";
  src: url("./fonts/reading-serif-regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Reading Serif";
  src: url("./fonts/reading-serif-italic.woff2") format("woff2");
  font-style: italic;
  font-weight: 400;
  font-display: swap;
}

.article {
  font-family: "Reading Serif", Georgia, serif;
}
~~~

**Explanation:** Both resources belong to the same family but advertise different styles. The browser can choose the italic face for italic text and falls back to the generic serif family if needed.

## Key takeaways

- Statement at-rules end in semicolons; block at-rules use braces with rule-specific contents.
- `@import` must appear before other valid rules in its stylesheet and affects cascade order at its position.
- `@font-face` registers resources using descriptors; it does not select page elements.
- `font-family` and `src` are required descriptors for a usable font face.
- Accurate style and weight descriptors help the browser choose the correct resource.
- Relative font URLs are resolved from the stylesheet that contains the face rule.
- Keep fallback families so text remains readable while a font loads or if loading fails.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [49 - CSS nesting](../lessons/49-css-nesting.md) | [Q&A](50-at-rules-and-imports.md) | [Example](../examples/50-at-rules-and-imports.md) | [51 - Feature queries and progressive enhancement](../lessons/51-feature-queries-and-progressive-enhancement.md) |
