# 69 - CSS reference and glossary Q&A

Use these questions to review the terms in [CSS reference and glossary](../lessons/69-css-reference-and-glossary.md). Each answer appears immediately after its question so you can check your reasoning as you go.

## Multiple-choice questions

### 1. What does a CSS selector do?

- A. It loads a stylesheet into a document.
- B. It identifies the elements to which a rule may apply.
- C. It changes the browser's default style sheet.
D. It decides which font files are available.

**Answer:** B. It identifies the elements to which a rule may apply.

**Explanation:** A selector matches elements. The cascade then determines which matching declarations apply.

### 2. Two declarations target the same element and property. Their origin, importance, and layer are equal, and their selectors have equal specificity. Which one normally wins?

- A. The declaration that appears first.
- B. The declaration with the shorter property name.
- C. The declaration later in source order.
D. The declaration from the smaller file.

**Answer:** C. The declaration later in source order.

**Explanation:** Source order resolves a tie after the relevant cascade comparisons, including specificity.

### 3. Which statement about inheritance is correct?

- A. Every CSS property inherits by default.
- B. Only properties defined as inherited normally pass values from parent to child.
- C. Inheritance only works for custom properties.
D. A child always inherits its parent's width.

**Answer:** B. Only properties defined as inherited normally pass values from parent to child.

**Explanation:** Text color commonly inherits. Margin and width normally do not.

### 4. What does the CSS-wide keyword unset do?

- A. It always sets a property to zero.
- B. It always restores the browser's user-agent stylesheet.
- C. It behaves like inherit for inherited properties and initial for other properties.
D. It removes the element from layout.

**Answer:** C. It behaves like inherit for inherited properties and initial for other properties.

**Explanation:** The result depends on whether the property is inherited.

### 5. Which custom property name is valid?

- A. brand-color
- B. --brand-color
- C. $brand-color
D. custom-brand-color

**Answer:** B. --brand-color

**Explanation:** A CSS custom property name begins with two hyphens and is read with var(), for example var(--brand-color).

### 6. What is the main role of a containing block?

- A. It provides a reference box for calculating some sizes and offsets.
- B. It stores all inherited properties.
- C. It makes every descendant a flex item.
D. It always creates a stacking context.

**Answer:** A. It provides a reference box for calculating some sizes and offsets.

**Explanation:** Which element establishes the containing block depends on the positioning mode and layout context.

### 7. What does box-sizing: border-box change?

- A. It removes padding and borders.
- B. It includes padding and border within the declared width and height.
- C. It makes the element use absolute positioning.
D. It makes margins part of the content box.

**Answer:** B. It includes padding and border within the declared width and height.

**Explanation:** The margin remains outside the border box.

### 8. What does a flex container arrange as flex items?

- A. All descendants at every nesting level.
- B. Its direct children.
- C. Only inline elements.
D. Only absolutely positioned elements.

**Answer:** B. Its direct children.

**Explanation:** A flex container establishes flex layout for its direct children. Nested descendants participate in their own layout context unless separately made flex items.

### 9. Which statement about a block formatting context is true?

- A. It is another name for a stacking context.
- B. It is a layout context with rules that affect floats and margin interaction.
- C. It always puts the element above its siblings.
D. It is created only by display: grid.

**Answer:** B. It is a layout context with rules that affect floats and margin interaction.

**Explanation:** A block formatting context and a stacking context are separate concepts, although one feature can create both in some cases.

### 10. Which unit is based on the viewport width?

- A. rem
- B. em
- C. vw
D. ch

**Answer:** C. vw

**Explanation:** One vw unit represents one percent of the viewport width. Mobile viewport behavior can require choosing among newer viewport unit variants.

### 11. Which CSS feature is intended to test whether a browser supports a declaration?

- A. @supports
- B. @font-face
- C. @keyframes
D. @page

**Answer:** A. @supports

**Explanation:** An @supports feature query can conditionally apply an enhancement when a declaration is supported.

### 12. Which option is usually the best purpose for clamp()?

- A. To choose a value constrained by a minimum and maximum.
- B. To force a selector to match more elements.
- C. To increase specificity.
D. To create a new formatting context.

**Answer:** A. To choose a value constrained by a minimum and maximum.

**Explanation:** A common use is fluid text or spacing that can grow but stays within readable limits.

### 13. What is a logical CSS property such as margin-inline useful for?

- A. It always maps to the physical left side.
- B. It adapts to the writing direction and writing mode.
- C. It disables bidirectional text.
D. It only works in grid containers.

**Answer:** B. It adapts to the writing direction and writing mode.

**Explanation:** Logical properties refer to inline and block dimensions rather than fixed physical sides.

### 14. What should a stylesheet generally do when a visitor prefers reduced motion?

- A. Add more animations to clarify the interface.
- B. Reduce or remove nonessential motion.
- C. Hide all focus indicators.
D. Disable every transition and interaction without exception.

**Answer:** B. Reduce or remove nonessential motion.

**Explanation:** Respect the preference by making motion less prominent. Preserve necessary feedback and functionality.

### 15. What does a passing CSS validation check prove?

- A. The page is fully accessible.
- B. Every browser renders it identically.
- C. The checked CSS passed the validator's syntax or conformance checks.
D. The page is fast on every device.

**Answer:** C. The checked CSS passed the validator's syntax or conformance checks.

**Explanation:** Validation is useful, but accessibility, compatibility, performance, and visual correctness need separate review.

## Short-answer questions

### 16. What is the difference between a property and a value?

**Answer:** A property names the style feature being set, while its value is the setting assigned to it.

**Example:** In color: navy;, color is the property and navy is the value.

### 17. What is a cascade layer?

**Answer:** A group of CSS rules created with @layer that lets a stylesheet organize precedence into named or anonymous layers.

**Explanation:** For declarations with the same origin and importance, layer ordering is considered before selector specificity.

### 18. How do initial and inherit differ?

**Answer:** initial requests the property's defined initial value. inherit requests the computed value from the parent.

**Explanation:** A property can inherit naturally, but the inherit keyword can also request inheritance for a property that normally does not inherit.

### 19. What is the difference between a computed value and a used value?

**Answer:** The computed value is resolved through the cascade and property-specific computation. The used value is the value after layout has applied the computed value to the actual element and context.

**Explanation:** For example, a percentage can be computed while still requiring layout context to determine a final size.

### 20. Why can a percentage value be difficult to predict?

**Answer:** The reference used by a percentage depends on the property. It is not always the width of the containing block.

**Explanation:** Check the definition of the specific property and the relevant layout context.

### 21. How does a fallback help with browser support?

**Answer:** A fallback provides a usable value or simpler behavior when a later value or feature is not supported.

**Example:** Put a broadly supported declaration before an enhanced declaration, so a browser that ignores the latter can still use the former.

### 22. What is a design token?

**Answer:** A named, reusable value representing a design choice, such as a color, spacing size, or type scale.

**Explanation:** Custom properties are one common way to define and reuse design tokens.

### 23. What is the difference between a media query and a container query?

**Answer:** A media query tests a media feature, often the viewport. A container query tests a feature of a query container.

**Explanation:** A component can adapt to the space available in its own container instead of relying only on the whole viewport.

### 24. Why should a visible keyboard focus style be kept?

**Answer:** It helps keyboard users identify which interactive element currently has focus.

**Explanation:** If a default outline is changed, provide a replacement that remains clear against the surrounding design.

### 25. Why is a large z-index not always enough to place an element above another one?

**Answer:** A z-index is compared within stacking contexts. An element cannot use a large value to escape the stacking context of an ancestor.

**Explanation:** Inspect the ancestor chain and identify the stacking contexts that contain both elements.

## Apply the glossary

### 26. A paragraph's color changes when its parent color changes, but its margin does not. Why?

**Answer:** Color normally inherits, while margin normally does not.

**Explanation:** Inheritance is defined per property. It is not a general rule that every parent style passes to its descendants.

### 27. A card with width: 100%, padding, and a border is wider than its parent. What should you inspect?

**Answer:** Inspect its box-sizing value and the available width. With the content-box model, padding and border are added outside the declared content width.

**Possible fix:**

~~~css
.card {
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  border: 1px solid currentColor;
}
~~~

**Explanation:** With border-box, the declared width includes padding and border. Also check for min-width, flex or grid sizing, and overflowing content if the card still exceeds its parent.

### 28. A keyboard user cannot tell which navigation link is active during keyboard navigation. What kind of change is needed?

**Answer:** Add or improve a visible focus style, often using :focus-visible.

**Possible starting point:**

~~~css
a:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
~~~

**Explanation:** Test the outline against the actual background and make sure it is not clipped by an ancestor.

### 29. A fluid heading should grow with the viewport but must stay between 1.5rem and 3rem. Which function can express this?

**Answer:** clamp().

**Possible starting point:**

~~~css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
~~~

**Explanation:** The first value is the minimum, the middle value is the preferred fluid value, and the final value is the maximum.

### 30. A component has three cards, but the layout becomes cramped at a narrow width. Should you pick a conventional device width as the breakpoint?

**Answer:** Choose a breakpoint where the cards or their content need a layout change.

**Explanation:** Breakpoints should respond to the content and available space. The relevant threshold may be different for each component.

### 31. A selector matches the correct element, but a declaration is crossed out in developer tools. What should you inspect next?

**Answer:** Inspect the winning declaration and compare cascade origin, importance, layer, specificity, and source order.

**Explanation:** A matching selector can still lose in the cascade. Raising specificity immediately may make the stylesheet harder to maintain.

### 32. A menu has position: absolute, but it is positioned relative to an unexpected ancestor. What should you investigate?

**Answer:** Find which ancestor establishes its containing block and inspect the positioning context.

**Explanation:** The nearest relevant containing block depends on the positioning mode and can be affected by properties on ancestors.

### 33. Two elements have large z-index values, but one still paints behind the other. What is a likely cause?

**Answer:** They may belong to different stacking contexts.

**Explanation:** Compare their ancestor stacking contexts first. The child z-index values are not compared globally across those contexts.

### 34. A layout uses a modern feature without a fallback. What is a good progressive-enhancement approach?

**Answer:** Provide a useful baseline first, then place the enhancement in an appropriate feature query or use a later declaration that unsupported browsers can ignore.

**Explanation:** The page should remain understandable and usable when the enhancement is unavailable.

## Debugging sequence

### 35. Put these checks in a useful order when a style appears not to work: inspect layout context, confirm stylesheet loading, inspect cascade, confirm selector match, check syntax.

**Answer:** Confirm stylesheet loading, check syntax, confirm selector match, inspect the cascade, then inspect layout context.

**Explanation:** Start with whether the CSS reaches the page and parses. Then determine whether it matches and wins. If it does, examine the layout constraints and containing blocks that affect the result.

### 36. Why should performance work start with measurement?

**Answer:** Measurement identifies whether there is a real bottleneck and which part of the page contributes to it.

**Explanation:** Optimizing based on guesses can add complexity without improving the user experience.

## Chapter navigation

| Previous chapter | Lesson | Example | Next |
| :--- | :--- | :--- | :--- |
| [68 - Practical page projects](../lessons/68-practical-page-projects.md) | [Lesson](../lessons/69-css-reference-and-glossary.md) | [Example](../examples/69-css-reference-and-glossary.md) | End of current lesson sequence |