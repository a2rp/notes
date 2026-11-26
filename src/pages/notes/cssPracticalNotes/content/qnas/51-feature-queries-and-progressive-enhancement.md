# 51 - Feature queries and progressive enhancement - Q&A

Review CSS feature detection, `@supports`, fallbacks, selector queries, and progressive enhancement. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What does a CSS `@supports` rule evaluate?

- A. Whether a named browser version is being used
- B. Whether a CSS declaration or supported selector query is recognized
- C. Whether an element exists in the HTML
- D. Whether a font file has downloaded

**Answer: B. Whether a CSS declaration or supported selector query is recognized.**

**Explanation:** Feature queries condition CSS rules on recognized CSS capabilities. They do not inspect the page for matching elements or verify successful resource loading.

### 2. Which is a valid declaration feature query?

- A. `@supports display: grid { }`
- B. `@supports (display: grid) { }`
- C. `@supports [display: grid] { }`
- D. `@supports { display: grid }`

**Answer: B. `@supports (display: grid) { }`.**

**Explanation:** A declaration test is written in parentheses after `@supports`.

### 3. What is the usual purpose of placing a baseline rule before an `@supports` block?

- A. To make the browser download the stylesheet twice
- B. To preserve a usable style when the enhancement is unavailable
- C. To make the feature query always evaluate to true
- D. To increase selector specificity

**Answer: B. To preserve a usable style when the enhancement is unavailable.**

**Explanation:** Progressive enhancement starts with a reasonable baseline and adds optional styling in the conditional block.

### 4. When does an `@supports` condition joined with `and` pass?

- A. When every joined condition passes
- B. When any one condition passes
- C. Only when the page has a script
- D. Only when the declarations use custom properties

**Answer: A. When every joined condition passes.**

**Explanation:** The conjunction requires all listed capabilities. Use `or` when any one alternative is sufficient.

### 5. What does `@supports not (display: grid)` match?

- A. Browsers that do not accept the tested declaration
- B. Browsers that have no CSS support
- C. Pages with no grid elements
- D. Elements with `display: none`

**Answer: A. Browsers that do not accept the tested declaration.**

**Explanation:** `not` negates the feature test. It does not mean that the browser lacks CSS generally.

### 6. What happens to an unsupported declaration in a normal style rule?

- A. The browser usually discards that declaration and can keep other valid declarations
- B. The browser always discards the entire stylesheet
- C. The browser converts it to a JavaScript style
- D. The browser treats it as an HTML attribute

**Answer: A. The browser usually discards that declaration and can keep other valid declarations.**

**Explanation:** CSS error handling lets later or earlier valid declarations remain available, which enables simple fallback patterns.

### 7. What does `@supports selector(:has(> img))` check?

- A. Whether the document contains an image
- B. Whether the browser recognizes the tested selector syntax
- C. Whether the image has loaded
- D. Whether every `.card` has a child image

**Answer: B. Whether the browser recognizes the tested selector syntax.**

**Explanation:** The `selector()` support query tests selector support, not whether any element currently matches it.

### 8. Which statement about `CSS.supports()` is correct?

- A. It downloads a polyfill for the tested property
- B. It returns a boolean support result that JavaScript can use
- C. It applies the tested declaration to every element
- D. It checks whether a selector matches the current document

**Answer: B. It returns a boolean support result that JavaScript can use.**

**Explanation:** `CSS.supports()` reports whether a declaration or condition is accepted. The script must decide what to do with that result.

### 9. Which ordering preserves a simple declaration fallback?

- A. Enhanced value, then fallback value
- B. Fallback value, then enhanced value
- C. Put both values in separate HTML attributes
- D. Put the fallback after an `!important` declaration

**Answer: B. Fallback value, then enhanced value.**

**Explanation:** A browser that accepts both declarations uses the later one. A browser that rejects the enhanced value discards it and retains the earlier fallback.

### 10. What does `@supports` not do?

- A. Condition a group of CSS rules
- B. Check whether a declaration is accepted
- C. Add a missing CSS feature to an older browser
- D. Combine feature conditions

**Answer: C. Add a missing CSS feature to an older browser.**

**Explanation:** A support query detects support and controls styling. It is not a polyfill.

## Short-answer questions

### 11. Define progressive enhancement in the context of CSS.

**Answer:** Start with a usable baseline style, then add optional styling for browsers that support the required features.

**Explanation:** The enhancement improves the experience without making essential content or operation depend on a newer CSS capability.

### 12. What does this condition mean?

~~~css
@supports (display: grid) and (gap: 1rem) {
  /* rules */
}
~~~

**Answer:** The block applies only when both the grid display declaration and the gap declaration are accepted.

**Explanation:** `and` requires every condition to be true. This is useful when an enhancement depends on multiple capabilities.

### 13. When is `or` useful in a support query?

**Answer:** Use `or` when any one of multiple alternative capabilities is sufficient for the same enhancement.

**Explanation:** For example, a rule could be enabled when either of two layout values is supported. Keep the alternatives logically equivalent for the style being applied.

### 14. Why should mixed `and` and `or` conditions be grouped clearly?

**Answer:** Parentheses make the intended boolean logic explicit and reduce the chance of misreading the condition.

**Explanation:** A complex condition should clearly show which alternatives are grouped before another requirement is combined with them.

### 15. Does `@supports (display: grid)` apply `display: grid` by itself?

**Answer:** No. It only determines whether rules inside the block apply. The style rule must still contain `display: grid`.

**Explanation:** The condition is a gate for its rule list, not a declaration.

### 16. Why is browser-name or version detection usually a weaker choice than feature detection?

**Answer:** Browser versions do not reliably describe the exact CSS capabilities available in a user's environment.

**Explanation:** A capability query asks about the feature an enhancement needs, instead of relying on assumptions about a browser identity.

### 17. What can a positive declaration support result not prove?

**Answer:** It cannot prove that the layout will fit, that a resource loaded, or that the complete design is accessible and correct in every context.

**Explanation:** Syntax support is only one part of behavior. Content, available space, user preferences, resource availability, and interactions still need consideration.

### 18. When is a repeated declaration fallback enough, and when is `@supports` more suitable?

**Answer:** Repeated declarations are enough for a simple alternative value for one property. Use `@supports` when several rules depend on a feature or the dependency should be explicit.

**Explanation:** A block can keep coordinated enhancements together, while a one-property fallback can be expressed directly through the cascade.

## Applied reasoning

### 19. A page has a block layout by default and a grid layout inside `@supports (display: grid)`. What does a browser without grid support show?

**Answer:** It keeps the block layout from the baseline rules.

**Explanation:** The conditional block is ignored when its test is false. Because the baseline is outside the block, the content still has a layout.

### 20. A stylesheet puts all card layout rules inside `@supports (display: grid)`, with no baseline. What is the risk?

**Answer:** A browser that does not accept the declaration may get none of those layout rules, which can leave the presentation incomplete.

**Explanation:** Conditional enhancements should not contain the only styles needed for readable, usable content.

### 21. A developer uses `@supports selector(.card:has(img))`. It evaluates true, but there are no cards containing images. Is the query broken?

**Answer:** No. The query tests whether the browser recognizes the selector syntax, not whether the current document contains a matching card.

**Explanation:** Selector support and DOM matching are separate questions.

### 22. A developer uses `@supports (font-family: "Local Example")` to test whether a local font is installed. Is this a reliable font-availability test?

**Answer:** No. It tests whether the declaration syntax is accepted, not whether that particular font is installed or has loaded.

**Explanation:** Use a sensible font stack and account for unavailable resources. Feature queries do not confirm local font availability.

### 23. A grid enhancement needs both `display: grid` and the `gap` property. Which logical operator should join the tests?

**Answer:** Use `and`.

**Explanation:** Both declarations are required for the enhancement, so both conditions must be true.

### 24. A card design can use either flex layout or grid layout. Which logical operator can represent that alternative?

**Answer:** Use `or`, if the styles inside the block are appropriate for either supported layout mode.

**Explanation:** `or` passes when at least one alternative condition passes. The enclosed rules must still make sense for each alternative.

## Code reading and correction

### 25. What is wrong with this feature query?

~~~css
@supports display: grid {
  .layout {
    display: grid;
  }
}
~~~

**Answer:** The declaration test is missing its parentheses. Write `@supports (display: grid)`.

**Explanation:** Parentheses delimit a declaration feature test in the `@supports` condition.

### 26. Which background color is used in a browser that accepts both declarations?

~~~css
.panel {
  background-color: #243447;
  background-color: color-mix(in srgb, #243447 88%, white);
}
~~~

**Answer:** The `color-mix()` color is used.

**Explanation:** Both declarations are accepted, and the later declaration wins in the cascade when the other factors are equal.

### 27. Which background color remains in a browser that rejects `color-mix()` in this code?

~~~css
.panel {
  background-color: #243447;
  background-color: color-mix(in srgb, #243447 88%, white);
}
~~~

**Answer:** The solid `#243447` color remains.

**Explanation:** The invalid value declaration is discarded, while the earlier valid declaration is still available.

### 28. Why does this code lose its enhancement in browsers that support both values?

~~~css
.panel {
  background-color: color-mix(in srgb, #243447 88%, white);
  background-color: #243447;
}
~~~

**Answer:** The fallback is later in source order, so it overrides the enhanced value.

**Explanation:** Put the fallback first and the enhanced declaration second.

### 29. What does this JavaScript code do?

~~~js
const supportsGrid = CSS.supports("display", "grid");
~~~

**Answer:** It stores a boolean indicating whether the browser accepts the `display: grid` declaration.

**Explanation:** The method reports support. It does not apply grid styling or change the document by itself.

### 30. Improve this stylesheet so browsers without grid keep a layout.

~~~css
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
~~~

**Answer:** Add a baseline outside the query, then conditionally add the grid enhancement:

~~~css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@supports (display: grid) {
  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
~~~

**Explanation:** The flex layout remains available when the grid test is false. Supporting browsers receive the grid layout.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [50 - At-rules, imports, and font-face](../lessons/50-at-rules-and-imports.md) | [Q&A](51-feature-queries-and-progressive-enhancement.md) | [Example](../examples/51-feature-queries-and-progressive-enhancement.md) | [52 - Scoped styles and component styling](../lessons/52-scoping-and-component-styles.md) |
