# 60 - CSS architecture and naming conventions

This example builds a small editorial landing page with a deliberate CSS structure. The page uses role-based BEM-style component names, shared custom properties, named cascade layers, and a small utility class.

## Question

How can a stylesheet make it easy to find a component's rules, reuse design values, and control which group of styles takes precedence?

## Complete example

Save the HTML as index.html and the CSS as styles.css in the same folder. Open index.html in a browser and resize the page to see the card layout adapt.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Field Notes - Practical garden guides</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <a class="site-brand" href="#home" aria-label="Field Notes home">
      <span class="site-brand__mark" aria-hidden="true">FN</span>
      <span class="site-brand__name">Field Notes</span>
    </a>

    <nav class="site-nav" aria-label="Primary navigation">
      <ul class="site-nav__list">
        <li><a class="site-nav__link" href="#home" aria-current="page">Home</a></li>
        <li><a class="site-nav__link" href="#guides">Guides</a></li>
        <li><a class="site-nav__link" href="#about">About</a></li>
      </ul>
    </nav>
  </header>

  <main class="page-shell" id="main">
    <section class="hero" id="home" aria-labelledby="hero-title">
      <p class="eyebrow">Grow at your own pace</p>
      <h1 class="hero__title" id="hero-title">Good gardens begin with small steps.</h1>
      <p class="hero__summary u-text-muted">
        Clear, practical notes for making a little more room for green in
        everyday life.
      </p>
      <div class="hero__actions">
        <a class="button button--primary" href="#guides">Explore the guides</a>
        <a class="button button--secondary" href="#about">Our approach</a>
      </div>
    </section>

    <section class="guide-section" id="guides" aria-labelledby="guides-title">
      <div class="section-heading">
        <p class="eyebrow">Start here</p>
        <h2 class="section-heading__title" id="guides-title">Practical guides</h2>
        <p class="section-heading__summary u-text-muted">
          Useful ideas for growing herbs, caring for soil, and planning a
          garden that fits your space.
        </p>
      </div>

      <div class="guide-grid">
        <article class="guide-card">
          <p class="guide-card__category">Small spaces</p>
          <h3 class="guide-card__title">
            <a class="guide-card__link" href="#balcony-guide">A first balcony garden</a>
          </h3>
          <p class="guide-card__summary u-text-muted">
            Choose a few sturdy containers and plants that match the light
            your balcony receives.
          </p>
          <a class="text-link" id="balcony-guide" href="#about">Read the guide</a>
        </article>

        <article class="guide-card">
          <p class="guide-card__category">Healthy soil</p>
          <h3 class="guide-card__title">
            <a class="guide-card__link" href="#soil-guide">Build better soil</a>
          </h3>
          <p class="guide-card__summary u-text-muted">
            Learn simple ways to protect soil, add organic matter, and water
            with care.
          </p>
          <a class="text-link" id="soil-guide" href="#about">Read the guide</a>
        </article>

        <article class="guide-card">
          <p class="guide-card__category">Getting started</p>
          <h3 class="guide-card__title">
            <a class="guide-card__link" href="#seasonal-guide">Plan with the seasons</a>
          </h3>
          <p class="guide-card__summary u-text-muted">
            Make a short seasonal plan that leaves room to learn as your
            garden grows.
          </p>
          <a class="text-link" id="seasonal-guide" href="#about">Read the guide</a>
        </article>
      </div>
    </section>

    <aside class="notice notice--tip" aria-labelledby="notice-title">
      <p class="notice__label">A helpful reminder</p>
      <h2 class="notice__title" id="notice-title">Start with the light you have.</h2>
      <p class="notice__summary">
        Observe a space for a few days before choosing plants. Sunlight,
        shade, and wind can change what will grow well there.
      </p>
    </aside>

    <section class="about-section" id="about" aria-labelledby="about-title">
      <h2 class="about-section__title" id="about-title">A practical approach</h2>
      <p class="about-section__summary u-text-muted">
        Field Notes favors clear steps, adaptable ideas, and steady progress
        over perfect results.
      </p>
    </section>
  </main>

  <footer class="site-footer">
    <p>Field Notes</p>
    <p class="u-text-muted">A little care, one season at a time.</p>
  </footer>
</body>
</html>
~~~

### styles.css

~~~css
@layer reset, base, layout, components, utilities;

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  p,
  ul {
    margin: 0;
  }

  img {
    display: block;
    max-inline-size: 100%;
  }
}

@layer base {
  :root {
    --color-text: #24342a;
    --color-muted: #56665b;
    --color-surface: #ffffff;
    --color-page: #f5f7f3;
    --color-border: #d9e2d9;
    --color-accent: #245b42;
    --color-accent-hover: #194832;
    --color-tip-surface: #edf5e8;
    --space-1: 0.5rem;
    --space-2: 0.75rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2rem;
    --space-6: 3rem;
    --radius-card: 0.9rem;
    --content-width: 72rem;
  }

  html {
    color-scheme: light;
  }

  body {
    min-block-size: 100vh;
    background: var(--color-page);
    color: var(--color-text);
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }

  a {
    color: inherit;
  }

  a:focus-visible {
    outline: 3px solid #a34d13;
    outline-offset: 3px;
  }
}

@layer layout {
  .site-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    max-inline-size: var(--content-width);
    margin-inline: auto;
    padding: var(--space-3) 1rem;
  }

  .page-shell {
    inline-size: min(100% - 2rem, 68rem);
    margin-inline: auto;
  }

  .hero {
    padding-block: clamp(3rem, 8vw, 6rem);
  }

  .hero__summary {
    max-inline-size: 42rem;
    margin-block-start: var(--space-3);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-block-start: var(--space-4);
  }

  .guide-section {
    padding-block: var(--space-5);
  }

  .section-heading {
    max-inline-size: 44rem;
    margin-block-end: var(--space-4);
  }

  .section-heading__summary {
    margin-block-start: var(--space-1);
  }

  .guide-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: var(--space-3);
  }

  .about-section {
    max-inline-size: 44rem;
    padding-block: var(--space-6);
  }

  .about-section__summary {
    margin-block-start: var(--space-1);
  }

  .site-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-1) var(--space-3);
    margin-block-start: var(--space-5);
    padding: var(--space-4) max(1rem, calc((100% - var(--content-width)) / 2));
    border-block-start: 1px solid var(--color-border);
  }

  @media (min-width: 48rem) {
    .site-header {
      padding-inline: 2rem;
    }

    .page-shell {
      inline-size: min(100% - 4rem, 68rem);
    }
  }
}

@layer components {
  .skip-link {
    position: absolute;
    inset-block-start: var(--space-1);
    inset-inline-start: var(--space-1);
    z-index: 1;
    padding: var(--space-1) var(--space-2);
    transform: translateY(-150%);
    border-radius: 0.35rem;
    background: var(--color-text);
    color: var(--color-surface);
  }

  .skip-link:focus {
    transform: translateY(0);
  }

  .site-brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--color-text);
    font-weight: 750;
    text-decoration: none;
  }

  .site-brand__mark {
    display: grid;
    inline-size: 2.25rem;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--color-surface);
    font-size: 0.8rem;
  }

  .site-nav__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-3);
    padding: 0;
    list-style: none;
  }

  .site-nav__link {
    color: var(--color-muted);
    text-decoration: none;
  }

  .site-nav__link:hover,
  .site-nav__link[aria-current="page"] {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }

  .eyebrow,
  .guide-card__category,
  .notice__label {
    color: var(--color-accent);
    font-size: 0.78rem;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero__title {
    max-inline-size: 15ch;
    margin-block-start: var(--space-1);
    font-size: clamp(2.4rem, 7vw, 5rem);
    line-height: 1.05;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-block-size: 2.75rem;
    padding: 0.65rem 1rem;
    border: 2px solid var(--color-accent);
    border-radius: 999px;
    font-weight: 700;
    text-decoration: none;
  }

  .button:hover {
    background: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
    color: var(--color-surface);
  }

  .button--primary {
    background: var(--color-accent);
    color: var(--color-surface);
  }

  .button--secondary {
    background: transparent;
    color: var(--color-accent);
  }

  .guide-card {
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
  }

  .guide-card__title {
    margin-block-start: var(--space-1);
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .guide-card__link {
    color: var(--color-text);
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  .guide-card__link:hover {
    color: var(--color-accent);
  }

  .guide-card__summary {
    margin-block-start: var(--space-2);
  }

  .text-link {
    display: inline-block;
    margin-block-start: var(--space-3);
    color: var(--color-accent);
    font-weight: 700;
    text-underline-offset: 0.2em;
  }

  .notice {
    padding: var(--space-4);
    border-inline-start: 0.35rem solid var(--color-accent);
    border-radius: 0 var(--radius-card) var(--radius-card) 0;
  }

  .notice--tip {
    background: var(--color-tip-surface);
  }

  .notice__title {
    margin-block-start: var(--space-1);
    font-size: 1.35rem;
  }

  .notice__summary {
    max-inline-size: 55ch;
    margin-block-start: var(--space-1);
  }

  .about-section__title {
    font-size: 1.7rem;
  }
}

@layer utilities {
  .u-text-muted {
    color: var(--color-muted);
  }
}
~~~

## Expected output

The page displays a centered brand and navigation at the top, a large introductory heading with two actions, and a responsive row of three guide cards. A green reminder panel and short about section appear below. At narrower widths, the cards wrap into fewer columns and the navigation can wrap without horizontal overflow.

The navigation's Home link has an underline because it carries aria-current="page". The focusable skip link appears when reached by keyboard. Links, buttons, and headings remain real HTML elements, so the class names add styling without replacing their meaning.

## How the architecture is organized

- **Naming:** site-nav is a block, site-nav__link is an element, and button--primary or notice--tip is a modifier.
- **Design values:** shared colors, spacing, radius, and content width are named once in :root custom properties.
- **Cascade order:** reset, base, layout, components, and utilities are declared in a named layer order.
- **Scope:** layout classes arrange page regions; component classes style their own parts without relying on long ancestor selectors.
- **State:** the current navigation link is styled from aria-current, keeping its visual state connected to its accessible state.
- **Utility:** u-text-muted is a single-purpose helper used where muted text is appropriate.

All project rules are inside a layer so that an accidental unlayered normal declaration does not silently take precedence over them. The utilities layer comes after components, so its normal declarations can override component declarations when both set the same property. The example does not use important declarations.

## Try it yourself

1. Change --color-accent and see which components update together.
2. Add a button--quiet variation, keeping both button and button--quiet in the HTML class list.
3. Move a guide card to a different wrapper and confirm its styles still apply.
4. Add another utility only if a repeated single-purpose need appears.
5. Temporarily place a normal rule outside all layers and compare its precedence with the layered rules.
6. Change the navigation's aria-current value and observe how the visual state follows the attribute.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [59 - Responsive typography and fluid sizing](../lessons/59-responsive-typography-and-fluid-sizing.md) | [Q&A](../qnas/60-css-architecture-and-naming.md) | [Example](60-css-architecture-and-naming.md) | [61 - Resets and base styles](../lessons/61-resets-and-base-styles.md) |