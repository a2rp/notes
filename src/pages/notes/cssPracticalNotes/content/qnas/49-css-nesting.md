# 49 - CSS nesting - Q&A

Review nested selectors, the `&` nesting selector, conditional rules, cascade behavior, and how native CSS differs from preprocessors. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What does a simple nested selector usually match?

~~~css
.card {
  .title {
    color: navy;
  }
}
~~~

- A. An element with both `card` and `title` classes
- B. A `.title` descendant of a `.card`
- C. A `.title` preceding the card
- D. Only the card element itself

**Answer: B. A `.title` descendant of a `.card`.**

**Explanation:** Without a leading combinator or `&`, the nested selector is interpreted as a descendant of its parent selector.

### 2. Which selector styles the parent button when it is hovered?

- A. `:hover`
- B. `&:hover`
- C. `button :hover`
- D. `button:hover button`

**Answer: B. `&:hover`.**

**Explanation:** `&` refers to the parent selector, so `&:hover` matches the parent element in its hovered state.

### 3. What does this nested selector target?

~~~css
.list {
  > li {
    padding: 0.5rem;
  }
}
~~~

- A. Any list item anywhere in the document
- B. A direct child `li` of the element matched by `.list`
- C. A list item after the list
- D. Only the list itself

**Answer: B. A direct child `li` of the element matched by `.list`.**

**Explanation:** A nested selector can start with a combinator. Here, `>` specifies a direct-child relationship to the parent selector.

### 4. What does `&.button--primary` mean inside a `.button` rule?

- A. A descendant with class `button--primary`
- B. The same element has both classes `button` and `button--primary`
- C. A class name formed by concatenating the two names
- D. A sibling button

**Answer: B. The same element has both classes `button` and `button--primary`.**

**Explanation:** The ampersand is a selector for the parent rule. It does not concatenate text into a class name.

### 5. Which feature is provided by native CSS nesting?

- A. Sass variables
- B. Sass mixins
- C. Nested style rules in a stylesheet
- D. Automatic string concatenation of class names

**Answer: C. Nested style rules in a stylesheet.**

**Explanation:** Native CSS allows style rules and certain group at-rules to be nested. Preprocessor features such as Sass variables and mixins are separate.

### 6. Which at-rule can commonly be nested inside a component rule?

- A. `@media`
- B. `@charset`
- C. `@import`
- D. `@namespace`

**Answer: A. `@media`.**

**Explanation:** Conditional group rules such as `@media` and `@supports` can be nested in a style rule.

### 7. How does nesting affect the CSS cascade?

- A. It replaces specificity with indentation depth
- B. It creates a separate cascade for each parent
- C. Normal cascade rules still determine the winner
- D. Nested declarations always win over flat declarations

**Answer: C. Normal cascade rules still determine the winner.**

**Explanation:** Origin, importance, layers, specificity, and source order continue to apply. Nesting changes how rules are written, not the overall cascade model.

### 8. What can happen when a parent selector list contains both an ID and a class?

- A. The nested rule's specificity can reflect the most specific selector in the parent list
- B. The ID is always removed from the selector
- C. The nested rule becomes invalid
- D. Every nested declaration has zero specificity

**Answer: A. The nested rule's specificity can reflect the most specific selector in the parent list.**

**Explanation:** The nesting selector's specificity is based on the most specific selector in the parent list, similar to `:is()`. This may be higher than expected for an element matched by the class branch.

## Short-answer questions

### 9. What is the default relationship when a nested selector is written without `&` or a leading combinator?

**Answer:** It is treated as a descendant selector.

**Explanation:** A nested `.title` inside `.card` matches a title somewhere inside a card, equivalent to the flat selector `.card .title`.

### 10. Why is `&:focus-visible` useful in a button rule?

**Answer:** It styles the parent button when that same element has the `:focus-visible` state.

**Explanation:** The ampersand makes the pseudo-class attach directly to the parent selector. Without it, a nested pseudo-class is interpreted in relation to a descendant.

### 11. Why does `&__title` not create a class called `.card__title` in native CSS?

**Answer:** Native CSS nesting matches selectors; it does not concatenate selector text.

**Explanation:** The ampersand represents a selector, not a string placeholder. Write a nested descendant selector or a flat class rule instead.

### 12. What does `.theme-dark &` mean inside a `.card` rule?

**Answer:** It matches a card that is inside an ancestor with the `theme-dark` class.

**Explanation:** The ampersand can appear on the right side of a selector to describe an ancestor relationship around the parent selector.

### 13. What is the specificity concern with this parent rule?

~~~css
#featured,
.card {
  & .title {
    color: red;
  }
}
~~~

**Answer:** The nested selector can take the specificity of the ID selector in the parent list, even for a title inside an element that matched only `.card`.

**Explanation:** The nesting selector behaves similarly to `:is()` for specificity, which takes the most specific selector in its argument list.

### 14. Does putting a media query inside a component rule create a new cascade?

**Answer:** No. The media condition controls whether the nested declarations apply, and ordinary cascade rules still decide the winner.

**Explanation:** Nesting organizes the conditional styles near the component. It does not isolate them from other matching rules.

### 15. Why is it useful to keep nested CSS shallow?

**Answer:** Shallow nesting makes selector relationships and component boundaries easier to understand.

**Explanation:** Deep nesting can create long, tightly coupled selectors that are difficult to override and maintain.

### 16. What should a project check before adopting native nesting syntax?

**Answer:** Check the supported browsers and ensure that its formatters, linters, minifiers, and build tools understand the syntax.

**Explanation:** Older browsers or CSS tools may not parse all nesting syntax. A transformation step or flat CSS may be needed for those targets.

## Applied questions

### 17. A nested `:hover` rule changes links inside a button but not the button itself. What selector should be used to target the button state?

**Answer:** Use `&:hover` inside the button rule.

**Explanation:** The ampersand attaches the state to the parent element. A nested `:hover` without `&` targets a hovered descendant.

### 18. A card's heading should be a direct child, not a heading deeper in another component. Which nested selector expresses that?

**Answer:** Use a direct-child selector such as `> .card__title` or `& > .card__title`.

**Explanation:** The child combinator limits the match to immediate children of the card.

### 19. Several card styles are repeated across a stylesheet, but each card's title and hover state are local. What is a reasonable organization?

**Answer:** Keep shared base declarations in a reusable flat rule or shared class, and nest the title and hover styles inside the card component rule.

**Explanation:** Nesting is most useful when it groups related rules. Shared styles should not be buried in a component that does not own them.

### 20. A nested rule under `#featured, .card` unexpectedly overrides a class-level color. What should be checked?

**Answer:** Check the nested rule's specificity, especially the ID selector in the parent selector list.

**Explanation:** The parent list's most specific selector can influence the nested selector's specificity. Separate the rules or use a deliberate low-specificity strategy if needed.

### 21. A component needs a two-column layout only on wider screens. Where can the media query go?

**Answer:** It can be nested inside the component's style rule.

**Explanation:** A nested `@media` rule keeps the responsive declarations beside the base component declarations while still applying only when the media condition is true.

### 22. A developer expects `&--selected` to become `.tab--selected` from a `.tab` parent. Is that native CSS behavior?

**Answer:** No. Native CSS does not concatenate selector text, so write the class explicitly or use `&.tab--selected` when the element has both classes.

**Explanation:** `&` represents the parent selector. It cannot be used as a string prefix for building another class name.

## Coding questions

### 23. Nest a title and body selector under a card, and give the card a border.

**Answer:**

~~~css
.card {
  border: 1px solid #ccd5df;
  padding: 1rem;

  .card__title {
    margin-block: 0 0.5rem;
  }

  .card__body {
    color: #46566a;
  }
}
~~~

**Explanation:** The nested title and body selectors match descendants of `.card`. The border and padding apply to the card itself.

### 24. Write nested hover and keyboard focus styles for a button.

**Answer:**

~~~css
.button {
  background: #145da0;
  color: white;

  &:hover {
    background: #0d477d;
  }

  &:focus-visible {
    outline: 3px solid #f2a900;
    outline-offset: 3px;
  }
}
~~~

**Explanation:** `&` makes each pseudo-class apply to the button itself. The focus style remains visible for keyboard navigation.

### 25. Write a nested direct-child rule and an adjacent sibling rule for repeated menu items.

**Answer:**

~~~css
.menu-item {
  > a {
    display: block;
    padding: 0.75rem;
  }

  + .menu-item {
    border-top: 1px solid #ccd5df;
  }
}
~~~

**Explanation:** The first nested selector uses the child combinator. The second selects another menu item immediately after the current one.

### 26. Put a wide-screen layout change inside a nested media query.

**Answer:**

~~~css
.card {
  display: grid;
  gap: 1rem;

  @media (min-width: 48rem) {
    grid-template-columns: 12rem 1fr;
    align-items: center;
  }
}
~~~

**Explanation:** The base card remains a grid at all sizes. The additional columns apply only when the media condition matches.

### 27. Nest a support query that applies a title style when balanced text wrapping is supported.

**Answer:**

~~~css
.card {
  .card__title {
    font-size: 1.4rem;
  }

  @supports (text-wrap: balance) {
    .card__title {
      text-wrap: balance;
    }
  }
}
~~~

**Explanation:** The title has a normal base size. The support query adds the optional declaration only when the browser recognizes it.

### 28. Write a compound selector that matches a featured card element carrying both classes.

**Answer:**

~~~css
.card {
  &.card--featured {
    border-color: #d28b00;
  }
}
~~~

**Explanation:** The ampersand is directly joined to the second class selector, so both classes must be on the same element. This does not concatenate the class names.

## Key takeaways

- A nested selector without `&` or a leading combinator normally selects a descendant.
- `&` refers to the parent selector and is useful for states, compound selectors, and explicit relationships.
- Native CSS nesting does not concatenate selector strings or provide preprocessor variables and mixins.
- Nested `@media` and `@supports` rules keep conditional styles near their component.
- The normal cascade still applies, and selector lists can give nested rules unexpectedly high specificity.
- Keep nesting shallow and check browser and tooling support.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [48 - Clipping, masks, and shapes](../lessons/48-clipping-masking-and-shapes.md) | [Q&A](49-css-nesting.md) | [Example](../examples/49-css-nesting.md) | [50 - At-rules, imports, and font-face](../lessons/50-at-rules-and-imports.md) |
