# 55 - Color schemes and theming - Q&A

Review semantic color tokens, automatic and explicit themes, the `color-scheme` property, and CSS custom properties. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What does a semantic color token describe?

- A. The role a color plays in the interface
- B. Only the hue of a color
- C. The user's monitor model
- D. A browser-specific color format

**Answer: A. The role a color plays in the interface.**

**Explanation:** A name such as `--color-surface` explains where a value is used. A name such as `--blue-700` only describes its appearance.

### 2. How do you use a CSS custom property in a declaration value?

- A. `value(--token)`
- B. `var(--token)`
- C. `custom(--token)`
- D. `theme(--token)`

**Answer: B. `var(--token)`.**

**Explanation:** The `var()` function substitutes a custom property's value into a declaration value.

### 3. Where is a custom property declared if it should be available throughout the document by inheritance?

- A. On `:root`
- B. Only on the last paragraph
- C. Inside a media query that never matches
- D. On an unrelated pseudo-element

**Answer: A. On `:root`.**

**Explanation:** Custom properties inherit. Declaring shared tokens on the document root makes them available to descendants unless overridden.

### 4. Which media feature matches a user's preferred light or dark scheme?

- A. `prefers-color-scheme`
- B. `color-mode`
- C. `theme-state`
- D. `system-palette`

**Answer: A. `prefers-color-scheme`.**

**Explanation:** This feature can be used to select styles for a light or dark system preference.

### 5. What does the `color-scheme` property help the browser adapt?

- A. Browser-provided UI such as form controls and scrollbars
- B. Every author-defined color automatically
- C. The user's operating system setting
- D. The HTML document title

**Answer: A. Browser-provided UI such as form controls and scrollbars.**

**Explanation:** The property indicates which schemes the page supports. Author-defined cards, text, and links still need appropriate colors.

### 6. What does `:root:not([data-theme])` select?

- A. The document root only when it has no `data-theme` attribute
- B. Every element without an ID
- C. Any element with a dark scheme
- D. All descendants of the root

**Answer: A. The document root only when it has no `data-theme` attribute.**

**Explanation:** The selector lets a system-preference rule apply only when there is no explicit theme attribute on the root.

### 7. How can explicit light and dark choices be represented in markup?

- A. With `data-theme="light"` or `data-theme="dark"`
- B. With `aria-theme` only
- C. With `title="dark"`
- D. With `color="light"`

**Answer: A. With `data-theme="light"` or `data-theme="dark"`.**

**Explanation:** CSS can select an attribute value and apply the matching token palette.

### 8. Can CSS alone make a theme button update and save `data-theme`?

- A. Yes, CSS can permanently store a user choice
- B. No, changing and persisting the attribute needs behavior outside CSS
- C. Yes, if the button has a dark background
- D. No, because CSS cannot select attributes

**Answer: B. No, changing and persisting the attribute needs behavior outside CSS.**

**Explanation:** CSS can style an attribute state. A working control needs script or server behavior to change that state and optionally save the choice.

### 9. What is the main advantage of using semantic tokens in component rules?

- A. A palette can change centrally without rewriting each component
- B. Components no longer need HTML
- C. Every palette automatically passes contrast checks
- D. CSS declarations no longer use the cascade

**Answer: A. A palette can change centrally without rewriting each component.**

**Explanation:** Components refer to roles such as page, surface, and text, while the theme maps those roles to concrete colors.

### 10. What does the fallback in `var(--color-text, #1f2937)` handle?

- A. A missing or invalid custom property reference
- B. Every contrast problem
- C. A disabled user preference
- D. The browser's forced color palette

**Answer: A. A missing or invalid custom property reference.**

**Explanation:** The fallback is used if the custom property cannot provide a usable value. It does not evaluate contrast or theme suitability.

## Short-answer questions

### 11. Why prefer `--color-surface` over `--blue-700` for a component background token?

**Answer:** `--color-surface` describes the token's job, while `--blue-700` describes only one visual color choice.

**Explanation:** Semantic names make a theme easier to update because components can keep using the same role when its palette value changes.

### 12. What should a complete dark theme update besides the page background?

**Answer:** It should consider text, muted text, surfaces, borders, links, accents, controls, and interactive states.

**Explanation:** Changing only the page background can leave other elements difficult to read or distinguish.

### 13. What does `color-scheme: light dark` communicate?

**Answer:** The page supports both light and dark schemes, allowing browser-provided UI to adapt to the selected scheme.

**Explanation:** It does not automatically recolor author-defined elements. Those still need theme tokens.

### 14. What is the difference between an automatic theme and an explicit theme?

**Answer:** An automatic theme follows a preference such as `prefers-color-scheme`. An explicit theme represents a direct choice, such as a root `data-theme` value.

**Explanation:** Explicit choices should take priority over the automatic preference when the site supports both.

### 15. Why restrict a dark preference rule with `:not([data-theme])`?

**Answer:** It prevents the system preference from overriding an explicit theme attribute.

**Explanation:** When a user has directly chosen light or dark, the automatic query should not replace that choice.

### 16. How can a theme be applied to a subtree instead of the whole document?

**Answer:** Set theme custom properties on a container and let them inherit to its descendants.

**Explanation:** This can support a preview or a deliberately separate themed region without changing the root palette.

### 17. Do custom properties bypass the CSS cascade?

**Answer:** No. They follow the cascade and inheritance like other CSS properties.

**Explanation:** Declarations can be overridden by applicable later or more specific rules and inherited by descendants.

### 18. What does a `var()` fallback not tell you?

**Answer:** It does not tell whether the color pair has enough contrast or whether the selected palette is appropriate.

**Explanation:** It only handles a missing or invalid custom property reference. Palette quality needs separate review.

## Applied reasoning

### 19. A page's dark mode changes only `--color-page`, but cards use hard-coded white and text uses hard-coded dark gray. What is the likely result?

**Answer:** Cards or text may remain too bright or too dark for the new page background.

**Explanation:** Components should consume semantic tokens, and the theme should update the related roles together.

### 20. The root has `data-theme="light"`, but the system preference is dark. Which theme should apply if the CSS is organized as in the lesson?

**Answer:** The explicit light theme.

**Explanation:** The automatic dark rule only matches when no theme attribute exists, and the explicit light tokens apply for the attribute value.

### 21. A user removes the root's `data-theme` attribute. What should the theme do?

**Answer:** It should follow the system preference, with the default palette used when the dark preference does not match.

**Explanation:** The automatic theme rule applies only to the no-attribute state.

### 22. A component's background uses `var(--color-surface)`. What changes when its ancestor overrides that token?

**Answer:** The component uses the inherited overridden value, unless it declares its own value.

**Explanation:** Custom properties inherit, which lets a theme on a subtree affect descendant components.

### 23. A theme selector is added to CSS, but the displayed toggle never changes the page. Why?

**Answer:** The selector only styles a theme state. It does not update the HTML attribute or persist a selection.

**Explanation:** The toggle needs script or server behavior to change the root state, and additional behavior if the choice should be remembered.

### 24. A page declares `color-scheme: dark`, but its cards still have white hard-coded backgrounds. Why are the cards still white?

**Answer:** The property helps browser-provided UI adapt, but it does not automatically rewrite author-defined colors.

**Explanation:** Cards and other author-styled elements need to use the theme tokens themselves.

## Code reading and correction

### 25. What color does the paragraph use?

~~~css
:root {
  --color-text: #1f2937;
}

p {
  color: var(--color-text);
}
~~~

**Answer:** It uses `#1f2937`.

**Explanation:** The paragraph inherits the root custom property, and `var()` substitutes that value into `color`.

### 26. Which palette applies here when the system prefers dark mode?

~~~css
:root {
  --color-page: #f4f7fb;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-page: #111827;
  }
}
~~~

~~~html
<html lang="en" data-theme="light">
~~~

**Answer:** The light palette remains selected.

**Explanation:** The media rule's selector does not match because the root has a `data-theme` attribute.

### 27. Fix this theme selector so it only targets a root explicitly set to dark.

~~~css
:root[theme="dark"] {
  --color-page: #111827;
}
~~~

**Answer:** Use the `data-theme` attribute:

~~~css
:root[data-theme="dark"] {
  --color-page: #111827;
}
~~~

**Explanation:** The markup convention in this chapter stores the selection in `data-theme`, so the CSS attribute selector must use the same name.

### 28. What does this CSS do when the text token is missing?

~~~css
.card {
  color: var(--color-text, #1f2937);
}
~~~

**Answer:** It uses `#1f2937` as the color fallback.

**Explanation:** The fallback is used if `--color-text` is missing or invalid at the point where it is substituted.

### 29. Why can this component fail to change in dark mode?

~~~css
.card {
  color: #1f2937;
  background-color: #ffffff;
}
~~~

**Answer:** Its foreground and background are hard-coded instead of using theme tokens.

**Explanation:** Define a theme-specific mapping for semantic tokens and use those tokens in the component rule.

### 30. Add a system-following dark palette while allowing an explicit root theme to override it.

~~~css
:root {
  color-scheme: light;
  --color-page: #f4f7fb;
  --color-text: #1f2937;
}
~~~

**Answer:** Add a dark media query limited to the no-attribute state, then define explicit theme rules after it:

~~~css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
    --color-page: #111827;
    --color-text: #f3f4f6;
  }
}

:root[data-theme="light"] {
  color-scheme: light;
  --color-page: #f4f7fb;
  --color-text: #1f2937;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --color-page: #111827;
  --color-text: #f3f4f6;
}
~~~

**Explanation:** With no explicit attribute, the media query follows the system preference. Explicit light or dark selectors set their own tokens and browser UI scheme.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [54 - Focus styles and keyboard interaction](../lessons/54-focus-and-keyboard-interaction.md) | [Q&A](55-color-schemes-and-theming.md) | [Example](../examples/55-color-schemes-and-theming.md) | [56 - Print styles](../lessons/56-print-styles.md) |
