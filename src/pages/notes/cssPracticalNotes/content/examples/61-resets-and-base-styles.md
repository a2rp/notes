# 61 - Resets and base styles

This example builds a small garden newsletter page and shows how a restrained reset can provide a predictable starting point without removing useful HTML and browser behavior.

## Question

How can a project set consistent sizing and typography while keeping content lists, native form controls, responsive media, and keyboard focus usable?

## Complete example

Save the HTML as index.html and the CSS as styles.css in the same folder. Open index.html in a browser, resize the page, and use Tab to move through its links and form controls.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Field Notes - Garden letters</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <a class="site-brand" href="#top">Field Notes</a>

    <nav class="site-nav" aria-label="Primary navigation">
      <ul class="site-nav__list">
        <li><a class="site-nav__link" href="#top" aria-current="page">Home</a></li>
        <li><a class="site-nav__link" href="#letters">Letters</a></li>
        <li><a class="site-nav__link" href="#subscribe">Subscribe</a></li>
      </ul>
    </nav>
  </header>

  <main class="page-shell" id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__copy">
        <p class="eyebrow">A note for the growing season</p>
        <h1 class="hero__title" id="hero-title">Make room for a little more green.</h1>
        <p class="hero__summary">
          Field Notes shares practical ideas for growing food, caring for
          soil, and finding a garden routine that fits your life.
        </p>
        <a class="button" href="#letters">Browse recent letters</a>
      </div>

      <svg class="hero__illustration" viewBox="0 0 560 330" role="img" aria-labelledby="garden-title">
        <title id="garden-title">A small raised garden bed with leafy plants</title>
        <rect x="30" y="30" width="500" height="270" rx="28" fill="#e3efdc"/>
        <path d="M110 232h340l-26 54H136z" fill="#805c3b"/>
        <path d="M146 232c16-64 43-91 76-90 29 1 44 31 34 90m18 0c7-80 38-119 74-116 38 3 47 47 31 116" fill="none" stroke="#356b49" stroke-linecap="round" stroke-width="14"/>
        <path d="M192 178c-34-6-46-29-39-51 25 1 43 17 46 43m140-40c-29-18-30-43-17-61 24 10 35 32 27 57m41 58c31-7 47-28 42-49-25 2-42 19-45 42" fill="#6f9c5e"/>
        <path d="M118 228h324" stroke="#5b3e2d" stroke-linecap="round" stroke-width="12"/>
        <circle cx="104" cy="104" r="11" fill="#d6a04e"/>
        <circle cx="456" cy="78" r="8" fill="#d6a04e"/>
      </svg>
    </section>

    <section class="letter-section" id="letters" aria-labelledby="letters-title">
      <div class="section-heading">
        <p class="eyebrow">From the journal</p>
        <h2 class="section-heading__title" id="letters-title">Recent letters</h2>
        <p>Small, useful ideas to take into the garden this week.</p>
      </div>

      <div class="letter-grid">
        <article class="letter-card">
          <p class="letter-card__category">Planning</p>
          <h3 class="letter-card__title">Start with the sunlight</h3>
          <p class="letter-card__summary">
            Notice where the sun falls before choosing a place for vegetables
            or herbs.
          </p>
          <ul class="letter-card__list">
            <li>Check the space in the morning.</li>
            <li>Look again in the afternoon.</li>
          </ul>
        </article>

        <article class="letter-card">
          <p class="letter-card__category">Soil care</p>
          <h3 class="letter-card__title">Feed the soil gently</h3>
          <p class="letter-card__summary">
            A thin layer of finished compost can support a healthy growing
            bed.
          </p>
          <ul class="letter-card__list">
            <li>Keep the soil covered.</li>
            <li>Add organic matter gradually.</li>
          </ul>
        </article>

        <article class="letter-card">
          <p class="letter-card__category">Good habits</p>
          <h3 class="letter-card__title">Make watering easier</h3>
          <p class="letter-card__summary">
            Group plants with similar needs and check the soil before
            watering.
          </p>
          <ul class="letter-card__list">
            <li>Water the soil, not just the leaves.</li>
            <li>Adjust for weather and container size.</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="subscribe-section" id="subscribe" aria-labelledby="subscribe-title">
      <div class="subscribe-section__copy">
        <p class="eyebrow">A useful note, now and then</p>
        <h2 class="subscribe-section__title" id="subscribe-title">Get the next letter</h2>
        <p>Join the mailing list for practical seasonal ideas.</p>
      </div>

      <form class="subscribe-form">
        <label class="subscribe-form__label" for="email">Email address</label>
        <div class="subscribe-form__controls">
          <input
            class="subscribe-form__input"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
          >
          <button class="button button--submit" type="submit">Subscribe</button>
        </div>
        <p class="subscribe-form__hint">Enter an address in the usual name@example.com format.</p>
      </form>
    </section>
  </main>

  <footer class="site-footer">
    <p class="site-footer__name">Field Notes</p>
    <p>Grow patiently. Learn as you go.</p>
  </footer>
</body>
</html>
~~~

### styles.css

~~~css
@layer reset, base, layout, components;

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

  button:not(:disabled) {
    cursor: pointer;
  }
}

@layer base {
  :root {
    color-scheme: light;
    --color-text: #25352a;
    --color-muted: #596b5e;
    --color-surface: #ffffff;
    --color-page: #f5f7f2;
    --color-border: #d7e1d7;
    --color-accent: #285c42;
    --color-accent-hover: #194831;
    --color-illustration: #e3efdc;
    --space-1: 0.5rem;
    --space-2: 0.75rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2rem;
    --space-6: 3rem;
    --content-width: 72rem;
  }

  html {
    scroll-behavior: smooth;
  }

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

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
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
    display: grid;
    align-items: center;
    gap: var(--space-5);
    padding-block: clamp(3rem, 8vw, 6rem);
  }

  .hero__copy {
    max-inline-size: 42rem;
  }

  .hero__illustration {
    display: block;
    inline-size: 100%;
    block-size: auto;
  }

  .letter-section {
    padding-block: var(--space-5);
  }

  .section-heading {
    max-inline-size: 42rem;
    margin-block-end: var(--space-4);
  }

  .letter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: var(--space-3);
  }

  .subscribe-section {
    display: grid;
    gap: var(--space-4);
    margin-block: var(--space-6);
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    background: var(--color-surface);
  }

  .site-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-1) var(--space-3);
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

    .hero {
      grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.9fr);
    }

    .subscribe-section {
      grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.9fr);
      align-items: center;
      padding: var(--space-5);
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
    color: var(--color-text);
    font-size: 1.15rem;
    font-weight: 750;
    text-decoration: none;
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
    text-underline-offset: 0.22em;
  }

  .eyebrow,
  .letter-card__category {
    color: var(--color-accent);
    font-size: 0.78rem;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero__title {
    max-inline-size: 15ch;
    margin-block-start: var(--space-1);
    font-size: clamp(2.4rem, 6vw, 4.75rem);
    line-height: 1.05;
  }

  .hero__summary {
    max-inline-size: 42ch;
    margin-block-start: var(--space-3);
    color: var(--color-muted);
    font-size: 1.1rem;
  }

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

  .button--submit {
    margin-block-start: 0;
  }

  .letter-card {
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: 0.9rem;
    background: var(--color-surface);
  }

  .letter-card__title {
    margin-block-start: var(--space-1);
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .letter-card__summary {
    margin-block-start: var(--space-2);
    color: var(--color-muted);
  }

  .letter-card__list {
    margin-block-start: var(--space-2);
    padding-inline-start: 1.25rem;
  }

  .letter-card__list li + li {
    margin-block-start: 0.25rem;
  }

  .subscribe-section__title {
    margin-block-start: var(--space-1);
    font-size: 1.6rem;
    line-height: 1.2;
  }

  .subscribe-form__label {
    display: block;
    margin-block-end: var(--space-1);
    font-weight: 700;
  }

  .subscribe-form__controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .subscribe-form__input {
    flex: 1 1 14rem;
    min-inline-size: 0;
    min-block-size: 2.75rem;
    padding-inline: var(--space-2);
    border: 1px solid #718176;
    border-radius: 0.4rem;
    background: var(--color-surface);
    color: var(--color-text);
  }

  .subscribe-form__hint {
    margin-block-start: var(--space-1);
    color: var(--color-muted);
    font-size: 0.9rem;
  }

  .site-footer__name {
    font-weight: 750;
  }
}
~~~

## Expected output

The page shows a branded header with a horizontal navigation list, a large introduction beside a garden illustration, and three journal cards below. The cards wrap into fewer columns on narrow screens. A signup form sits in a bordered panel, followed by a simple footer.

The navigation list has no visible bullets because that list is specifically used as a menu. The lists inside the journal cards keep their markers because they contain content. The email field and button use the page font but keep their native behavior. Use Tab to see the focus outline and skip link. The illustration scales to the available width without being stretched.

## What the reset and base styles do

- The reset applies border-box sizing to elements and pseudo-elements.
- It removes selected default margins, then the page adds spacing through its layout and component rules.
- It constrains image, picture, and video media without forcing a fixed height.
- Form controls inherit the page font, but their native behavior remains available.
- Base styles set the page font, line-height, colors, and keyboard focus appearance.
- The reduced-motion rule turns off smooth scrolling when the user requests less motion.
- The navigation list is styled without markers. The content lists retain their markers.

The example uses named cascade layers so the reset runs before the base, layout, and component rules. The reset does not remove every browser default. It deliberately avoids a blanket all: unset rule.

## Try it yourself

1. Temporarily remove the box-sizing rule and compare the width of the signup panel and input.
2. Remove the reset's margin rule, then inspect the browser's default heading and paragraph spacing.
3. Remove list-style from the navigation list and confirm that content list markers remain.
4. Disable the media max-inline-size rule and resize the page to see what overflow it prevents.
5. Remove the control font inheritance and compare the input and button text with the body text.
6. Use only the keyboard to visit the navigation, skip link, email input, and submit button.
7. Replace the visible focus style with another high-contrast treatment and test it on every surface.
8. Emulate reduced motion and confirm that scrolling is no longer smooth.
9. Test zoom and a narrow viewport to check that text, media, and controls still fit.
10. Add a new reset rule only after identifying the default behavior it should change.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [60 - CSS architecture and naming conventions](../lessons/60-css-architecture-and-naming.md) | [Q&A](../qnas/61-resets-and-base-styles.md) | [Example](61-resets-and-base-styles.md) | [62 - Organizing large stylesheets](../lessons/62-organizing-large-stylesheets.md) |