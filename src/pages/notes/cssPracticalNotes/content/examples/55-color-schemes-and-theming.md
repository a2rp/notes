# 55 - Color schemes and theming

This example organizes a light and dark palette with semantic CSS custom properties. It follows the system preference by default, supports explicit root theme attributes, and includes a dark preview region that inherits its own token values.

## Question

How can a page centralize its colors so the whole page or one preview component can use a consistent light or dark theme?

## Complete example

Save both files in the same folder. Open `index.html` in a browser. By default, the page follows the system color-scheme preference. To test an explicit root theme, add `data-theme="light"` or `data-theme="dark"` to the opening `<html>` element and reload.

### `index.html`

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>Color schemes and theming</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">CSS learning example</p>
      <h1>Color schemes and themes</h1>
      <p>
        Semantic color tokens let the same components use a coordinated
        palette in different themes.
      </p>
    </header>

    <article class="card" aria-labelledby="system-card-title">
      <h2 id="system-card-title">System-following theme</h2>
      <p class="card__description">
        This card uses tokens from the page root. The page follows the system
        preference until an explicit theme is set on the HTML element.
      </p>
      <p class="card__status">
        <strong>Status:</strong> Ready
      </p>
      <a class="button" href="#dark-preview">View the dark preview</a>
    </article>

    <section
      id="dark-preview"
      class="theme-preview"
      data-theme="dark"
      aria-labelledby="preview-title"
    >
      <p class="theme-preview__label">Local theme preview</p>
      <article class="card" aria-labelledby="preview-title">
        <h2 id="preview-title">Dark preview region</h2>
        <p class="card__description">
          This card inherits the dark tokens from its preview container,
          even if the rest of the page is using the light palette.
        </p>
        <a href="#system-card-title">Return to the first card</a>
      </article>
    </section>

    <footer class="page-footer">
      <p>
        The preview uses a static HTML attribute. A working theme switch would
        need behavior to update the attribute.
      </p>
    </footer>
  </main>
</body>
</html>
~~~

### `styles.css`

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

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
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

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

:root[data-theme="dark"],
.theme-preview[data-theme="dark"] {
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

body {
  margin: 0;
  color: var(--color-text, #1f2937);
  background-color: var(--color-page, #f4f7fb);
}

.page {
  width: 100%;
  max-width: 54rem;
  margin-inline: auto;
  padding: 1.5rem;
}

.page-header {
  margin-block-end: 1.5rem;
}

.eyebrow,
.theme-preview__label {
  margin: 0 0 0.4rem;
  color: var(--color-text-muted, #475569);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
p {
  overflow-wrap: anywhere;
}

h1 {
  margin-block: 0;
  line-height: 1.2;
}

.page-header > p:last-child {
  max-width: 65ch;
  margin-block: 0.75rem 0;
}

.card {
  margin-block: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--color-border, #64748b);
  border-radius: 0.75rem;
  color: var(--color-text, #1f2937);
  background-color: var(--color-surface, #ffffff);
}

.card h2 {
  margin-block: 0 0.6rem;
  line-height: 1.3;
}

.card__description {
  color: var(--color-text-muted, #475569);
}

.card__status {
  padding: 0.5rem 0.75rem;
  border-inline-start: 0.25rem solid var(--color-accent, #174a7e);
}

a {
  color: var(--color-link, #005a9c);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.button {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.35rem;
  color: var(--color-on-accent, #ffffff);
  background-color: var(--color-accent, #174a7e);
  font-weight: 700;
}

.theme-preview {
  margin-block: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--color-border, #64748b);
  border-radius: 0.75rem;
  color: var(--color-text, #1f2937);
  background-color: var(--color-page, #f4f7fb);
}

.theme-preview .card {
  margin-block-end: 0;
}

.page-footer {
  margin-block-start: 1.5rem;
  color: var(--color-text-muted, #475569);
}
~~~

## Expected output

The page shows an introductory heading, a regular card, a dark preview region, and a footer. Component colors come from semantic tokens rather than being repeated in each rule.

- With no `data-theme` attribute on the root, the page uses the system preference. If no dark preference matches, the light palette is the default.
- With `data-theme="light"` on the root, the explicit light tokens apply even if the system preference is dark.
- With `data-theme="dark"` on the root, the explicit dark tokens apply regardless of the system preference.
- The preview section remains dark because its own `data-theme="dark"` sets tokens inherited by its card.
- Browser-provided UI can follow the current `color-scheme`, including the dark preview's embedded controls if any are added.

The example does not include an interactive toggle. Changing themes dynamically or remembering a choice requires behavior outside CSS.

## Explanation

1. **The root defines semantic tokens.** Page, surface, text, muted text, border, link, and accent roles are declared once.
2. **Components consume those roles.** The card and button use `var()` references rather than hard-coded palette values.
3. **The system preference is the automatic fallback.** The dark media query applies only when the root has no explicit `data-theme` attribute.
4. **Explicit root choices override the automatic theme.** The light and dark attribute selectors set both their tokens and `color-scheme` after the media query.
5. **Tokens also work on a subtree.** The preview region defines dark tokens locally, and its card inherits them without changing the rest of the page.
6. **Browser UI receives scheme information.** The root and preview set `color-scheme`; the HTML metadata announces that the document supports both schemes.
7. **CSS only styles the selection.** A theme switch needs a control plus code or server behavior to set the attribute and optionally save a choice.

## Try it yourself

1. Remove `data-theme="dark"` from the preview region and compare its card with the root theme.
2. Add `data-theme="dark"` to the opening `<html>` element, then switch it to `light`.
3. Remove the `prefers-color-scheme` block and compare the page when the system preference is dark.
4. Change `--color-surface` once and observe which cards update.
5. Add a new component and make it use the same semantic tokens.
6. Remove the `color-scheme` property and compare browser-provided controls if you add an input.
7. Build a real toggle only after deciding how it will update the attribute and whether the user's choice should persist.
8. Check contrast for text, links, borders, and accents in both palettes.

## Key points

- Theme tokens name a role and keep palette choices centralized.
- The default palette remains complete and readable.
- The automatic system palette applies only when no explicit root choice exists.
- Explicit root attributes can override system preference styles.
- A themed subtree can override inherited tokens locally.
- `color-scheme` affects browser-provided UI, while author styles still need their own tokens.
- CSS styles theme states but does not implement a dynamic switch or persistence.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [54 - Focus styles and keyboard interaction](../lessons/54-focus-and-keyboard-interaction.md) | [Q&A](../qnas/55-color-schemes-and-theming.md) | [Example](55-color-schemes-and-theming.md) | [56 - Print styles](../lessons/56-print-styles.md) |
