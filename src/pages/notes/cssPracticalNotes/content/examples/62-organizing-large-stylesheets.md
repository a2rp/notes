# 62 - Organizing large stylesheets

This example shows a small editorial page whose CSS is split into focused files. The HTML entry point lists the files, and cascade layers define their broad precedence.

## Question

How can a growing stylesheet be divided into discoverable files while keeping shared defaults, layouts, components, and utilities in a predictable order?

## File structure

Create this structure:

~~~
field-notes/
  index.html
  styles/
    00-order-and-tokens.css
    01-reset.css
    02-base.css
    03-layout.css
    components/
      site-header.css
      button.css
      article-card.css
      notice.css
    90-utilities.css
~~~

The numeric prefixes make the intended sequence visible in the file list. Descriptive names explain each file's responsibility.

## Complete example

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Field Notes - Useful ideas for the garden</title>

  <link rel="stylesheet" href="./styles/00-order-and-tokens.css">
  <link rel="stylesheet" href="./styles/01-reset.css">
  <link rel="stylesheet" href="./styles/02-base.css">
  <link rel="stylesheet" href="./styles/03-layout.css">
  <link rel="stylesheet" href="./styles/components/site-header.css">
  <link rel="stylesheet" href="./styles/components/button.css">
  <link rel="stylesheet" href="./styles/components/article-card.css">
  <link rel="stylesheet" href="./styles/components/notice.css">
  <link rel="stylesheet" href="./styles/90-utilities.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <a class="site-header__brand" href="#top">Field Notes</a>
    <nav aria-label="Primary navigation">
      <ul class="site-header__nav">
        <li><a class="site-header__link" href="#top" aria-current="page">Home</a></li>
        <li><a class="site-header__link" href="#guides">Guides</a></li>
        <li><a class="site-header__link" href="#about">About</a></li>
      </ul>
    </nav>
  </header>

  <main class="page-shell" id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <p class="eyebrow">Grow with what you have</p>
      <h1 class="hero__title" id="hero-title">A few thoughtful habits can change a garden.</h1>
      <p class="hero__summary u-text-muted">
        Practical notes for choosing plants, caring for soil, and building a
        routine that fits your space.
      </p>
      <a class="button button--primary" href="#guides">Explore the guides</a>
    </section>

    <section class="guide-section" id="guides" aria-labelledby="guides-title">
      <div class="section-heading">
        <p class="eyebrow">From the journal</p>
        <h2 class="section-heading__title" id="guides-title">Start with a useful idea</h2>
        <p class="u-text-muted">Short guides for making steady progress.</p>
      </div>

      <div class="article-grid">
        <article class="article-card">
          <p class="article-card__category">Planning</p>
          <h3 class="article-card__title">Read the light in your space</h3>
          <p class="article-card__summary u-text-muted">
            Observe sun and shade before choosing a spot for your first plants.
          </p>
          <a class="article-card__link" href="#about">Read the note</a>
        </article>

        <article class="article-card">
          <p class="article-card__category">Soil care</p>
          <h3 class="article-card__title">Build healthy soil gradually</h3>
          <p class="article-card__summary u-text-muted">
            Use simple habits to protect the soil and add organic matter.
          </p>
          <a class="article-card__link" href="#about">Read the note</a>
        </article>

        <article class="article-card">
          <p class="article-card__category">Daily routine</p>
          <h3 class="article-card__title">Make room for regular care</h3>
          <p class="article-card__summary u-text-muted">
            A short, repeatable check can help you notice what plants need.
          </p>
          <a class="article-card__link" href="#about">Read the note</a>
        </article>
      </div>
    </section>

    <aside class="notice" aria-labelledby="notice-title">
      <h2 class="notice__title" id="notice-title">Keep the plan flexible</h2>
      <p class="u-text-muted">
        Weather, light, and available time change. Adjust one thing at a time
        and learn from what happens.
      </p>
    </aside>

    <section class="about-section" id="about" aria-labelledby="about-title">
      <h2 class="about-section__title" id="about-title">About Field Notes</h2>
      <p class="u-text-muted">
        Clear steps, adaptable ideas, and room to learn as you go.
      </p>
    </section>
  </main>

  <footer class="site-footer">
    <p class="site-footer__brand">Field Notes</p>
    <p class="u-text-muted">A little care, one season at a time.</p>
  </footer>
</body>
</html>
~~~

### styles/00-order-and-tokens.css

~~~css
@layer reset, base, layout, components, utilities;

@layer base {
  :root {
    --color-text: #26362c;
    --color-muted: #596b5e;
    --color-page: #f5f7f2;
    --color-surface: #ffffff;
    --color-border: #d7e1d7;
    --color-accent: #285c42;
    --color-accent-hover: #194831;
    --space-1: 0.5rem;
    --space-2: 0.75rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2rem;
    --space-6: 3rem;
    --radius-card: 0.9rem;
    --content-width: 70rem;
  }
}
~~~

### styles/01-reset.css

~~~css
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

  img,
  picture,
  video {
    display: block;
    max-inline-size: 100%;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }
}
~~~

### styles/02-base.css

~~~css
@layer base {
  body {
    min-block-size: 100vh;
    background: var(--color-page);
    color: var(--color-text);
    font-family: system-ui, sans-serif;
    line-height: 1.55;
  }

  a {
    color: inherit;
  }

  :focus-visible {
    outline: 3px solid #a34d13;
    outline-offset: 3px;
  }

  .eyebrow {
    color: var(--color-accent);
    font-size: 0.78rem;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}
~~~

### styles/03-layout.css

~~~css
@layer layout {
  .page-shell {
    inline-size: min(100% - 2rem, 66rem);
    margin-inline: auto;
  }

  .hero {
    max-inline-size: 52rem;
    padding-block: clamp(3rem, 8vw, 6rem);
  }

  .hero__title {
    max-inline-size: 17ch;
    margin-block-start: var(--space-1);
    font-size: clamp(2.25rem, 6vw, 4.5rem);
    line-height: 1.05;
  }

  .hero__summary {
    max-inline-size: 48ch;
    margin-block-start: var(--space-3);
  }

  .guide-section {
    padding-block: var(--space-5);
  }

  .section-heading {
    max-inline-size: 44rem;
    margin-block-end: var(--space-4);
  }

  .section-heading__title {
    margin-block: var(--space-1);
    font-size: 1.8rem;
    line-height: 1.2;
  }

  .article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: var(--space-3);
  }

  .notice {
    margin-block: var(--space-5);
  }

  .about-section {
    max-inline-size: 44rem;
    padding-block: var(--space-5);
  }

  .about-section__title {
    margin-block-end: var(--space-1);
    font-size: 1.5rem;
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
    .page-shell {
      inline-size: min(100% - 4rem, 66rem);
    }
  }
}
~~~

### styles/components/site-header.css

~~~css
@layer components {
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

  .site-header__brand {
    color: var(--color-text);
    font-size: 1.15rem;
    font-weight: 750;
    text-decoration: none;
  }

  .site-header__nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-3);
    padding: 0;
    list-style: none;
  }

  .site-header__link {
    color: var(--color-muted);
    text-decoration: none;
  }

  .site-header__link:hover,
  .site-header__link[aria-current="page"] {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

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

  @media (min-width: 48rem) {
    .site-header {
      padding-inline: 2rem;
    }
  }
}
~~~

### styles/components/button.css

~~~css
@layer components {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-block-size: 2.75rem;
    margin-block-start: var(--space-3);
    padding: 0.65rem 1rem;
    border: 2px solid var(--color-accent);
    border-radius: 999px;
    background: var(--color-accent);
    color: var(--color-surface);
    font-weight: 700;
    text-decoration: none;
  }

  .button:hover {
    border-color: var(--color-accent-hover);
    background: var(--color-accent-hover);
  }

  .button--primary {
    box-shadow: 0 0.35rem 0.9rem rgb(25 72 49 / 16%);
  }
}
~~~

### styles/components/article-card.css

~~~css
@layer components {
  .article-card {
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
  }

  .article-card__category {
    color: var(--color-accent);
    font-size: 0.78rem;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .article-card__title {
    margin-block-start: var(--space-1);
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .article-card__summary {
    margin-block-start: var(--space-2);
  }

  .article-card__link {
    display: inline-block;
    margin-block-start: var(--space-3);
    color: var(--color-accent);
    font-weight: 700;
    text-underline-offset: 0.2em;
  }

  .article-card__link:hover {
    color: var(--color-accent-hover);
  }
}
~~~

### styles/components/notice.css

~~~css
@layer components {
  .notice {
    padding: var(--space-4);
    border-inline-start: 0.35rem solid var(--color-accent);
    border-radius: 0 var(--radius-card) var(--radius-card) 0;
    background: var(--color-surface);
  }

  .notice__title {
    margin-block-end: var(--space-1);
    font-size: 1.25rem;
  }
}
~~~

### styles/90-utilities.css

~~~css
@layer utilities {
  .u-text-muted {
    color: var(--color-muted);
  }
}
~~~

## Expected output

The browser displays a centered brand and navigation, a large introduction, three guide cards that wrap on narrow screens, a notice panel, and a footer. The card and notice styles are separate files, while shared colors and spacing come from one token file.

The navigation list has no markers because its component stylesheet removes them. The file structure is visible in the HTML link list. All CSS files share one layer order declared in the first file. The utilities layer comes after components, so an intentional utility can override a normal component declaration when both set the same property.

## How the organization works

- The entry point is index.html, where every loaded stylesheet is visible.
- The first CSS file declares the layer order and owns shared custom properties.
- Reset and base styles have separate files because they have different responsibilities.
- Page layout stays in one layout file.
- Each reusable component has one focused stylesheet.
- Utilities have a late layer and a consistent naming prefix.
- Component rules use shared tokens instead of defining duplicate colors and spacing values.

The order of the named layers controls precedence across files. Link order still contributes to source order when declarations have equal precedence in the same layer. The layer declaration should stay in the first file and should not be reordered by a component stylesheet.

## Try it yourself

1. Add a new card variation in article-card.css and keep its base class in the HTML.
2. Add a shared spacing token to the first stylesheet and use it in two components.
3. Move a component file earlier or later in the HTML list, then inspect whether equal-precedence declarations change.
4. Add a utility rule that intentionally overrides a component value.
5. Add an unlayered normal rule and compare it with a layered normal rule.
6. Rename a CSS file descriptively and update its HTML link.
7. Move a component rule to the layout file, then decide whether its ownership became clearer or less clear.
8. Ask someone else to find the notice styles using only the file tree and the component name.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [61 - Resets and base styles](../lessons/61-resets-and-base-styles.md) | [Q&A](../qnas/62-organizing-large-stylesheets.md) | [Example](62-organizing-large-stylesheets.md) | [63 - Styling Shadow DOM and web components](../lessons/63-shadow-dom-and-web-components.md) |