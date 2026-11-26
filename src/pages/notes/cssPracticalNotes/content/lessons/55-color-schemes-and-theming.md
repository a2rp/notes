# 55 - Color schemes and theming

A theme is a coordinated set of design choices such as page colors, text colors, surfaces, borders, and accents. CSS custom properties make those choices reusable. A small set of semantic tokens can then be changed for a light scheme, a dark scheme, or an explicit user-selected theme.

This chapter builds on user preference media queries by showing how to organize a theme system. The goal is to change a palette centrally without rewriting every component rule.

## Learning outcomes

After this chapter, you should be able to:

- Define semantic design tokens with CSS custom properties.
- Use those tokens consistently across page and component styles.
- Apply a default palette, a system-preference palette, and explicit theme overrides.
- Explain how the `color-scheme` property affects browser-provided UI.
- Organize theme rules so manual choices override system preferences.
- Describe what CSS can and cannot do for a theme switcher.

## Theme tokens

A token is a named value that represents a design decision. Prefer names based on purpose rather than the literal color:

~~~css
:root {
  --color-page: #f4f7fb;
  --color-surface: #ffffff;
  --color-text: #1f2937;
  --color-text-muted: #475569;
  --color-border: #64748b;
  --color-link: #005a9c;
  --color-accent: #174a7e;
  --color-on-accent: #ffffff;
}
~~~

Use the tokens where those roles appear:

~~~css
body {
  color: var(--color-text);
  background-color: var(--color-page);
}

.card {
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

a {
  color: var(--color-link);
}

.button {
  color: var(--color-on-accent);
  background-color: var(--color-accent);
}
~~~

A semantic token such as `--color-surface` says what a color is for. A literal name such as `--blue-700` says only how it looks today. Semantic names make it easier to change palettes without revisiting every component.

Custom properties declared on an element can be inherited by descendants and used through `var()`. They follow the cascade, so a more specific theme selector or later declaration can override them. They are not a separate variable system outside CSS.

## Provide a default palette

The default palette should be complete and readable if no preference query matches:

~~~css
:root {
  color-scheme: light;
  --color-page: #f4f7fb;
  --color-surface: #ffffff;
  --color-text: #1f2937;
  --color-text-muted: #475569;
  --color-border: #64748b;
  --color-link: #005a9c;
  --color-accent: #174a7e;
  --color-on-accent: #ffffff;
}
~~~

Keep the tokens needed by all components in one shared place. You can add separate tokens for status colors or interactive states when those roles need distinct values.

## Adapt to the system preference

Use `prefers-color-scheme` to apply a second palette when the user prefers dark mode:

~~~css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
    --color-page: #111827;
    --color-surface: #1f2937;
    --color-text: #f3f4f6;
    --color-text-muted: #cbd5e1;
    --color-border: #9ca3af;
    --color-link: #a5d8ff;
    --color-accent: #bfdbfe;
    --color-on-accent: #111827;
  }
}
~~~

The `:not([data-theme])` condition means this automatic choice only applies when there is no explicit theme attribute on the root element. The default palette remains the light scheme when the query does not match.

A dark scheme is not just a dark page background. Text, muted text, surfaces, borders, links, and button colors need to work together. Check contrast and interaction states in both palettes.

## Support explicit theme choices

A site may let a user choose a theme independently of the operating system. One simple interface is a `data-theme` attribute on the root element:

~~~html
<html lang="en" data-theme="dark">
~~~

Then define the explicit palettes:

~~~css
:root[data-theme="light"] {
  color-scheme: light;
  --color-page: #f4f7fb;
  --color-surface: #ffffff;
  --color-text: #1f2937;
  --color-text-muted: #475569;
  --color-border: #64748b;
  --color-link: #005a9c;
  --color-accent: #174a7e;
  --color-on-accent: #ffffff;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --color-page: #111827;
  --color-surface: #1f2937;
  --color-text: #f3f4f6;
  --color-text-muted: #cbd5e1;
  --color-border: #9ca3af;
  --color-link: #a5d8ff;
  --color-accent: #bfdbfe;
  --color-on-accent: #111827;
}
~~~

The explicit rules come after the automatic media query. Their selectors have enough specificity to override the automatic root tokens, and the system query is restricted to the no-attribute case.

Use three states if the interface needs them:

- No `data-theme` attribute: follow the system preference.
- `data-theme="light"`: explicitly use the light palette.
- `data-theme="dark"`: explicitly use the dark palette.

CSS can style these states, but CSS alone does not give a button the ability to change the root attribute or save the choice. A working switch needs script or server behavior, an accessible control, and a decision about whether the choice persists. If there is no switch behavior, do not display a control that appears to change the theme.

## The `color-scheme` property

The `color-scheme` property tells the browser which schemes an element is designed to support:

~~~css
:root {
  color-scheme: light;
}

:root[data-theme="dark"] {
  color-scheme: dark;
}
~~~

It can affect browser-provided UI such as form controls and scrollbars. It does not automatically recolor every author-styled element. Set your own theme tokens for page backgrounds, text, links, and surfaces.

The HTML `color-scheme` metadata can also announce the schemes supported by the document:

~~~html
<meta name="color-scheme" content="light dark">
~~~

When supporting both schemes, keep the metadata and CSS behavior in agreement. A component with hard-coded colors may still look wrong even if the browser controls adapt.

## Theme component states with tokens

Components should use the shared tokens instead of repeating palette-specific values:

~~~css
.card {
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.card__description {
  color: var(--color-text-muted);
}

.card__action {
  color: var(--color-on-accent);
  background-color: var(--color-accent);
}
~~~

If every component refers to the same semantic tokens, changing the root palette updates the component without a second copy of all its rules. For component-specific values, create tokens with clear roles rather than selecting unrelated palette values by guesswork.

A `var()` fallback can make a declaration usable when a custom property is missing:

~~~css
color: var(--color-text, #1f2937);
~~~

The fallback handles a missing or invalid custom property reference. It does not check whether the chosen colors meet a contrast requirement.

## Theme a smaller region

Custom properties inherit, so a theme can be applied to a subtree as well as to the entire document:

~~~css
.theme-preview[data-theme="dark"] {
  --color-page: #111827;
  --color-surface: #1f2937;
  --color-text: #f3f4f6;
  --color-border: #9ca3af;
}
~~~

Descendants inside the preview inherit these token values. This can be useful for a theme preview or an intentionally distinct embedded section. Be deliberate when nesting themes because inherited tokens can affect every child component.

## Common mistakes

- **Repeating literal colors throughout component rules:** A palette update then requires many unrelated edits.
- **Using tokens named only after hue:** Names such as `--blue` do not explain whether the value is a link, surface, or text color.
- **Changing only the page background:** Other text and component colors can become difficult to read.
- **Assuming dark mode is always better:** A dark scheme is a preference, not a universal accessibility setting.
- **Letting the automatic query override an explicit choice:** Restrict the automatic rule to the no-explicit-theme state.
- **Declaring `color-scheme` without author colors:** Browser controls may adapt while cards and text remain in the wrong palette.
- **Showing an inert theme toggle:** CSS can style a theme attribute, but changing or persisting the attribute needs behavior outside CSS.
- **Treating `var()` fallback as a contrast check:** A fallback value only handles a missing or invalid custom property.
- **Forgetting theme states beyond the default:** Check links, borders, disabled states, form controls, and focus indicators in every palette.

## Try it yourself

1. Define semantic tokens for a page background, surface, primary text, secondary text, border, link, and accent.
2. Apply the tokens to a page and two components.
3. Add a dark palette under `prefers-color-scheme: dark` and update all roles together.
4. Restrict the automatic palette to a root with no `data-theme` attribute.
5. Add explicit light and dark attribute selectors after the media query.
6. Manually set `data-theme="light"` and `data-theme="dark"` on the HTML root to inspect each override.
7. Add the `color-scheme` property and compare browser-provided controls with and without it.
8. Add a dark theme to one preview subtree and check which descendant components inherit its tokens.
9. Create a button only if you also implement the behavior that updates the root attribute.
10. Check the contrast and focus indicators for every theme.

## Key points

- Semantic custom properties centralize design decisions and make palettes maintainable.
- A default theme should work before any preference query is applied.
- `prefers-color-scheme` can select a system-driven palette when no explicit theme is set.
- Explicit `data-theme` values can override the system choice.
- `color-scheme` helps browser-provided UI adapt; author-defined elements still need theme tokens.
- CSS can style theme states, but a functional switch and persistence need behavior beyond CSS.
- Check readability, contrast, controls, and focus states in every palette.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [54 - Focus styles and keyboard interaction](54-focus-and-keyboard-interaction.md) | [Q&A](../qnas/55-color-schemes-and-theming.md) | [Example](../examples/55-color-schemes-and-theming.md) | [56 - Print styles](56-print-styles.md) |
