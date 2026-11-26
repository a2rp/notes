# 41 - Custom properties and design tokens - Example

This example creates a small style guide with light and dark panels. Both panels use the same card rules, but the dark panel overrides inherited color tokens. A featured card also overrides one local token, and a fallback protects a component link when no local color is provided.

## Question

Build a page that:

- Defines reusable color, spacing, radius, and font tokens on `:root`.
- Uses semantic tokens in shared component styles.
- Overrides color tokens in a scoped dark theme.
- Uses the same card rules in both themes.
- Lets one featured card override its own link color.
- Includes a `var()` fallback for a component token.
- Stacks the theme panels on a narrow screen.

## Complete HTML

Copy the code into an HTML file and open it in a browser. It uses no external images, stylesheets, fonts, or links.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Design Tokens</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      color-scheme: light;
      --palette-blue-700: #075b9b;
      --palette-coral-700: #a33c2d;

      --color-page: #f2f6fa;
      --color-surface: #ffffff;
      --color-raised: #eaf1f6;
      --color-text: #1b2939;
      --color-muted: #526276;
      --color-border: #d5e0e9;
      --color-action: var(--palette-blue-700);
      --color-warning: var(--palette-coral-700);

      --space-sm: 0.5rem;
      --space-md: 1rem;
      --space-lg: 1.5rem;
      --radius-card: 0.9rem;
      --font-body: system-ui, -apple-system, "Segoe UI", sans-serif;
    }

    body {
      min-width: 320px;
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      color: var(--color-text);
      background-color: var(--color-page);
      font-family: var(--font-body);
      font-size: 1rem;
      line-height: 1.6;
    }

    .page {
      width: min(100%, 1000px);
      margin-inline: auto;
    }

    .page-header {
      padding: clamp(1.25rem, 4vw, 2rem);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-card);
      background-color: var(--color-surface);
    }

    .eyebrow {
      color: var(--color-action, #075b9b);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    h1 {
      margin-top: var(--space-sm);
      font-size: clamp(2rem, 6vw, 3rem);
    }

    h2 {
      font-size: 1.3rem;
    }

    .page-header p:last-child {
      max-width: 68ch;
      margin-top: var(--space-md);
      color: var(--color-muted);
    }

    .theme-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-lg);
      margin-top: var(--space-lg);
    }

    .theme-panel {
      min-width: 0;
      padding: var(--space-lg);
      color: var(--color-text);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-card);
    }

    .theme-dark {
      color-scheme: dark;
      --color-page: #101923;
      --color-surface: #1b2938;
      --color-raised: #26384a;
      --color-text: #f1f5f9;
      --color-muted: #bac7d5;
      --color-border: #405366;
      --color-action: #91c9ef;
      --color-warning: #ffc0aa;
    }

    .theme-description {
      margin-top: var(--space-sm);
      color: var(--color-muted);
    }

    .demo-card {
      margin-top: var(--space-md);
      padding: var(--space-lg);
      color: var(--color-text);
      background-color: var(--color-raised);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-card);
    }

    .demo-card p {
      margin-top: var(--space-sm);
      color: var(--color-muted);
    }

    .card-link {
      display: inline-block;
      margin-top: var(--space-md);
      color: var(--card-link-color, var(--color-action, #075b9b));
      font-weight: 700;
      text-underline-offset: 0.18em;
    }

    .card-link:focus-visible {
      outline: 3px solid currentColor;
      outline-offset: 3px;
    }

    .card--featured {
      --card-link-color: var(--color-warning);
    }

    .token-list {
      display: grid;
      gap: var(--space-sm);
      margin-top: var(--space-lg);
      padding-top: var(--space-md);
      border-top: 1px solid var(--color-border);
      color: var(--color-muted);
      font-size: 0.9rem;
    }

    code {
      padding: 0.08em 0.3em;
      border-radius: 0.25em;
      color: var(--color-text);
      background-color: var(--color-raised);
      font-size: 0.92em;
    }

    .page-footer {
      margin-top: var(--space-md);
      color: var(--color-muted);
      font-size: 0.9rem;
      text-align: center;
    }

    @media (max-width: 680px) {
      .theme-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  </style>
</head>
<body>
  <main class="page" id="tokens">
    <header class="page-header">
      <p class="eyebrow">Reusable CSS values</p>
      <h1>Design tokens in context</h1>
      <p>
        The same card component uses shared tokens in both panels. The dark
        panel changes its own token values, while the featured card overrides
        only its link color.
      </p>
    </header>

    <section class="theme-grid" aria-label="Theme comparison">
      <article class="theme-panel">
        <h2>Light theme</h2>
        <p class="theme-description">The panel uses values inherited from the root.</p>

        <section class="demo-card">
          <h2>Shared card</h2>
          <p>
            Text, surface, border, spacing, and link color come from reusable
            custom properties.
          </p>
          <a class="card-link" href="#tokens">Read about the tokens</a>
        </section>

        <section class="demo-card card--featured">
          <h2>Featured card</h2>
          <p>This card changes one component token and keeps the shared layout.</p>
          <a class="card-link" href="#tokens">Explore this feature</a>
        </section>

        <dl class="token-list">
          <div><dt>Surface</dt><dd><code>--color-surface</code></dd></div>
          <div><dt>Spacing</dt><dd><code>--space-lg</code></dd></div>
          <div><dt>Card shape</dt><dd><code>--radius-card</code></dd></div>
        </dl>
      </article>

      <article class="theme-panel theme-dark">
        <h2>Dark theme</h2>
        <p class="theme-description">This subtree overrides semantic color tokens.</p>

        <section class="demo-card">
          <h2>Shared card</h2>
          <p>
            The card rules are unchanged. Their inherited token values come
            from the dark theme panel.
          </p>
          <a class="card-link" href="#tokens">Read about the tokens</a>
        </section>

        <section class="demo-card card--featured">
          <h2>Featured card</h2>
          <p>The component color token also works with the dark theme values.</p>
          <a class="card-link" href="#tokens">Explore this feature</a>
        </section>

        <dl class="token-list">
          <div><dt>Surface</dt><dd><code>--color-surface</code></dd></div>
          <div><dt>Spacing</dt><dd><code>--space-lg</code></dd></div>
          <div><dt>Card shape</dt><dd><code>--radius-card</code></dd></div>
        </dl>
      </article>
    </section>

    <footer class="page-footer">
      <p>Both themes share one component style and use scoped token values.</p>
    </footer>
  </main>
</body>
</html>
~~~

## Explanation

- `:root` declares the palette, semantic colors, spacing, radius, and font tokens.
- `var()` inserts the token values into ordinary CSS declarations.
- The `theme-dark` class overrides semantic colors for its subtree. Descendants inherit those values.
- Both cards use the same `.demo-card` declarations, so the component styling is not duplicated for dark mode.
- `.card--featured` sets a component-level `--card-link-color` token. Other cards use the fallback in `var(--card-link-color, ...)`.
- Nested fallbacks provide a default action color if neither the local link color nor theme action color is defined.
- The spacing and radius tokens are reused in page padding, gaps, and card surfaces.
- A media query stacks the theme panels on narrow screens. Custom properties supply values, while the media query still defines the responsive layout rule.

## Expected output

The page shows light and dark theme panels side by side on wider screens and stacked on narrow screens. Each panel contains two cards with matching layout. The dark panel has its own surface, text, border, and action colors. The featured card's link uses a warning color, while the other card links use the theme action color.

## Try it yourself

1. Change `--space-lg` and observe the card padding and panel gap change together.
2. Change `--radius-card` and see all token-based corners update.
3. Remove `--color-action` from `:root` and inspect the fallback in the link rule.
4. Remove `--card-link-color` from `.card--featured` and compare both links.
5. Add a third theme wrapper with a different set of semantic colors.
6. Move one token from `:root` to a single card and observe its narrower scope.
7. Change the dark theme action color while preserving readable link contrast.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [40 - Replaced elements, aspect ratios, and object fitting](../lessons/40-replaced-elements-and-object-fitting.md) | [Lesson](../lessons/41-custom-properties-and-design-tokens.md) | [Q&A](../qnas/41-custom-properties-and-design-tokens.md) | [42 - Generated content and counters](../lessons/42-generated-content-and-counters.md) |