# 41 - Custom properties and design tokens - Q&A

Review custom property syntax, token scope, fallback behavior, calculations, and registered properties. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. Which is a valid custom property name?

- A. `$brand-color`
- B. `brand-color`
- C. `--brand-color`
- D. `var-brand-color`

**Answer: C. `--brand-color`.**

**Explanation:** CSS custom property names begin with two hyphens.

### 2. How do you use a custom property's value in a normal declaration?

- A. `color: --brand-color;`
- B. `color: var(--brand-color);`
- C. `color: custom(--brand-color);`
- D. `color: $brand-color;`

**Answer: B. `color: var(--brand-color);`.**

**Explanation:** The `var()` function substitutes the custom property's value into a property declaration.

### 3. What is a design token?

- A. A special HTML attribute
- B. A named value representing a design choice
- C. A browser-only stylesheet
- D. A CSS selector that matches buttons

**Answer: B. A named value representing a design choice.**

**Explanation:** A token such as `--space-lg` gives a repeated value a meaningful name. CSS custom properties can store and reuse those values.

### 4. Why are tokens often declared on `:root`?

- A. Values declared there can be inherited across the document
- B. `:root` disables the cascade
- C. `:root` makes every custom property typed
- D. Custom properties only work on the root element

**Answer: A. Values declared there can be inherited across the document.**

**Explanation:** Unregistered custom properties inherit by default, so root-level tokens are available to descendants unless a closer declaration overrides them.

### 5. What does the fallback in `var(--accent, blue)` do?

- A. It always overrides `--accent`
- B. It is used if `--accent` is missing or has the guaranteed-invalid value
- C. It repairs any invalid CSS property value after substitution
- D. It sets `--accent` to blue permanently

**Answer: B. It is used if `--accent` is missing or has the guaranteed-invalid value.**

**Explanation:** A fallback is not used merely because a present custom property substitutes into a regular property with an incompatible value.

### 6. What is the value of `--color-brand` in this rule?

~~~css
:root {
  --color-brand: #075b9b;
}
~~~

- A. A color value
- B. A selector
- C. A media query
- D. A CSS function

**Answer: A. A color value.**

**Explanation:** The custom property stores the color token. It only affects rendered styles when used in another declaration.

### 7. Which declaration correctly stores a length for a margin?

- A. `--space: 20; margin-top: var(--space)px;`
- B. `--space: 20px; margin-top: var(--space);`
- C. `--space: px 20; margin-top: var(--space);`
- D. `--space: var(20px); margin-top: --space;`

**Answer: B. `--space: 20px; margin-top: var(--space);`.**

**Explanation:** Store the complete CSS value, including its unit. Variable substitution does not join arbitrary text to create a new CSS token.

### 8. What can an `@property` rule specify?

- A. A custom property's syntax, inheritance behavior, and initial value
- B. A selector's specificity
- C. A document's HTML title
- D. A media query's breakpoint

**Answer: A. A custom property's syntax, inheritance behavior, and initial value.**

**Explanation:** Registration can make a custom property typed and define whether it inherits and what value it starts with.

## Short-answer questions

### 9. Are custom property names case-sensitive?

**Answer:** Yes.

**Explanation:** `--color-brand` and `--Color-brand` are separate custom properties. Use a consistent naming convention.

### 10. Does declaring `--color-brand` automatically color an element?

**Answer:** No.

**Explanation:** A custom property stores a value. Use it in a regular declaration, such as `color: var(--color-brand);`, to affect styling.

### 11. Why can a token declared on a theme wrapper affect its children?

**Answer:** Unregistered custom properties inherit by default.

**Explanation:** A descendant that uses the token receives the nearest cascaded value, which can be overridden by a closer declaration.

### 12. What is the difference between a semantic token and a palette token?

**Answer:** A semantic token names a role, such as `--color-action`. A palette token names a particular color value, such as `--blue-700`.

**Explanation:** Connecting semantic tokens to palette tokens lets a design change its palette without rewriting every component rule.

### 13. Does `var(--color, red)` use `red` if `--color` exists but contains `20px` and is used in `color`?

**Answer:** No, the fallback is not a type-correction fallback for that substitution.

**Explanation:** The custom property exists and can be substituted, but `20px` is invalid for `color`. The consuming declaration can become invalid at computed-value time.

### 14. Why does `margin-top: var(--space)px` fail if `--space` is `20`?

**Answer:** CSS substitutes tokens and does not concatenate the number token with the text `px` to create a dimension token.

**Explanation:** Store `20px` as the custom property value, or use a complete compatible calculation.

### 15. What is one reason to use `@property` instead of an ordinary custom property?

**Answer:** Registration can validate a value against a syntax, set explicit inheritance behavior, and provide an initial value.

**Explanation:** Ordinary design tokens do not need registration by default. Use it when typed values or explicit non-inheritance are useful.

### 16. What happens if custom properties directly or indirectly reference each other in a cycle on the same element?

**Answer:** The cycle makes those custom properties invalid at computed-value time.

**Explanation:** Avoid circular token definitions. Give each token a concrete value or a dependency chain that ends at one.

## Applied questions

### 17. Set up a local dark theme that overrides surface and text tokens without duplicating the card styles.

**Answer:**

~~~css
:root {
  --color-surface: #fff;
  --color-text: #1b2939;
}

.theme-dark {
  --color-surface: #182330;
  --color-text: #f1f5f9;
}

.card {
  color: var(--color-text);
  background-color: var(--color-surface);
}
~~~

**Explanation:** The card reads inherited tokens. The wrapper changes their values for the subtree, so the component styles stay shared.

### 18. Create a semantic action color from a palette token.

**Answer:**

~~~css
:root {
  --blue-700: #075b9b;
  --color-action: var(--blue-700);
}

.button {
  background-color: var(--color-action);
}
~~~

**Explanation:** The palette token stores the raw color, and the semantic token describes its role. Components depend on the semantic name.

### 19. A reusable component should use a local button color if supplied, otherwise its theme accent. Write that declaration.

**Answer:**

~~~css
.button {
  background-color: var(--button-background, var(--color-accent, #075b9b));
}
~~~

**Explanation:** The first fallback uses the theme accent if the button-specific token is missing. The nested fallback supplies a final color if the theme token is also missing.

### 20. Calculate a card's total horizontal padding from a spacing unit of `0.25rem` multiplied by six.

**Answer:**

~~~css
:root {
  --space-unit: 0.25rem;
}

.card {
  padding-inline: calc(var(--space-unit) * 6);
}
~~~

**Explanation:** The token contains a complete length, so it can participate in the calculation.

### 21. Why is a closer declaration of `--card-gap` useful on a compact list?

**Answer:** It overrides the general gap token only within the compact list and its descendants.

**Explanation:** Because custom properties participate in the cascade and inheritance, components can adapt locally without duplicating their full styles.

## Coding questions

### 22. Define a root palette and use semantic tokens for a card's text, surface, and spacing.

**Answer:**

~~~css
:root {
  --palette-blue: #075b9b;
  --color-text: #1b2939;
  --color-surface: #fff;
  --space-card: 1.5rem;
}

.card {
  padding: var(--space-card);
  color: var(--color-text);
  background-color: var(--color-surface);
  border-top: 0.25rem solid var(--palette-blue);
}
~~~

**Explanation:** Each value is declared once and then referenced where it is needed.

### 23. Write a component rule with a fallback radius of `0.75rem`.

**Answer:**

~~~css
.card {
  border-radius: var(--card-radius, 0.75rem);
}
~~~

**Explanation:** The component uses `--card-radius` when it is available. Otherwise, `0.75rem` provides its default.

### 24. Register a custom property for a length that does not inherit and starts at zero.

**Answer:**

~~~css
@property --offset-distance {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
~~~

**Explanation:** The syntax is a length, the descriptor disables inheritance, and the initial value supplies a valid length. Registration is optional for ordinary token use.

### 25. Correct this declaration so it stores a valid length and uses it for a component gap.

~~~css
:root {
  --gap: 12;
}

.card-list {
  gap: var(--gap)px;
}
~~~

**Answer:**

~~~css
:root {
  --gap: 12px;
}

.card-list {
  gap: var(--gap);
}
~~~

**Explanation:** Store the unit as part of the custom property value. `var()` substitutes CSS tokens rather than assembling text fragments.

## Key takeaways

- Custom properties begin with `--` and are read with `var()`.
- Design tokens are named values that represent reusable design choices.
- Custom properties participate in the cascade and normally inherit.
- Fallbacks cover missing or guaranteed-invalid values, not every invalid substitution.
- Store complete values, including units, and avoid dependency cycles.
- `@property` registers syntax, inheritance behavior, and an initial value when needed.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [40 - Replaced elements, aspect ratios, and object fitting](../lessons/40-replaced-elements-and-object-fitting.md) | [Q&A](41-custom-properties-and-design-tokens.md) | [Example](../examples/41-custom-properties-and-design-tokens.md) | [42 - Generated content and counters](../lessons/42-generated-content-and-counters.md) |