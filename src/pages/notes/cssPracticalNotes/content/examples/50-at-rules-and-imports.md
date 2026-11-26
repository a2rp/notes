# 50 - At-rules, imports, and font-face

This example uses three local files to demonstrate stylesheet imports, cascade layers, media and support queries, and an `@font-face` rule. The font face uses a locally installed serif font and includes a generic fallback, so the page remains readable on systems without that local font.

## Question

How can a page organize its CSS with at-rules, import print styles, and register a font face without depending on a remote resource?

## Complete example

Save all three files in the same folder. Open `index.html` in a browser. Use print preview to see the print-only stylesheet.

### `index.html`

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>At-rules, imports, and font-face</title>
  <link rel="stylesheet" href="./site.css">
</head>
<body>
  <main class="page">
    <p class="eyebrow">CSS reference example</p>
    <h1 class="page__title">At-rules organize CSS</h1>
    <p class="page__intro">At-rules can load stylesheets, apply conditional rules, organize cascade layers, and register font resources.</p>

    <section class="card" aria-labelledby="card-title">
      <p class="card__label">Local font with fallback</p>
      <h2 id="card-title" class="card__title">Readable text comes first</h2>
      <p class="card__copy">The page requests a registered font family, then lists ordinary fallback families. If the local font is not available, the browser can still use a serif fallback.</p>
    </section>

    <p class="screen-only">This note is visible on screen and hidden in print output.</p>
  </main>
</body>
</html>
~~~

### `site.css`

~~~css
@charset "UTF-8";
@import "./print.css" print;

@layer reset, base, components;

@font-face {
  font-family: "Reading Serif";
  src: local("Georgia");
  font-style: normal;
  font-weight: 400;
}

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer base {
  :root {
    font-family: "Reading Serif", Georgia, serif;
    color: #1d2939;
    background: #eef3f8;
  }

  body {
    min-height: 100vh;
    padding: clamp(1rem, 4vw, 3rem);
    line-height: 1.65;
  }

  h1,
  h2,
  p {
    max-width: 68ch;
  }

  h1,
  h2 {
    line-height: 1.2;
  }
}

@layer components {
  .page {
    width: min(100%, 58rem);
    margin-inline: auto;
  }

  .eyebrow,
  .card__label {
    color: #315f85;
    font-family: system-ui, sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .page__title {
    margin-block: 0.5rem;
    font-size: clamp(2.2rem, 6vw, 4rem);
  }

  .page__intro {
    color: #46566a;
    font-size: 1.15rem;
  }

  .card {
    margin-block: 2rem 1rem;
    padding: clamp(1rem, 4vw, 2rem);
    border: 1px solid #bfd0df;
    border-radius: 1rem;
    background: white;
    box-shadow: 0 0.4rem 1.2rem rgb(15 23 42 / 0.08);

    .card__title {
      margin-block: 0.5rem;
      color: #153c5b;
      font-size: clamp(1.5rem, 4vw, 2.2rem);
    }

    .card__copy {
      color: #46566a;
    }

    @media (min-width: 48rem) {
      padding: 2.5rem;
    }

    @supports (text-wrap: balance) {
      .card__title {
        text-wrap: balance;
      }
    }
  }

  .screen-only {
    padding: 0.9rem 1rem;
    border-left: 0.25rem solid #d28b00;
    background: #fff4d7;
    font-family: system-ui, sans-serif;
  }
}
~~~

### `print.css`

~~~css
body {
  padding: 0;
  color: #000;
  background: #fff;
}

.page {
  width: auto;
}

.card {
  border: 1px solid #555;
  box-shadow: none;
}

.screen-only {
  display: none;
}
~~~

## Explanation

- The HTML loads `site.css` with a stylesheet link. The CSS file imports `print.css` only for print.
- `@charset` is first in the stylesheet. The import follows before the layer statement and style rules.
- `@layer` names the reset, base, and component layers, then places each group of rules in its layer.
- `@font-face` registers the locally installed Georgia face as `Reading Serif`. The `font-family` declaration lists Georgia and a generic serif fallback.
- The card's child selectors, media query, and support query demonstrate block at-rules and ordinary rules in the same stylesheet.
- The `@supports` block applies balanced title wrapping only when the browser supports the declaration.
- The separate print stylesheet changes colors and removes screen-only content when print media is active.
- If Georgia is not installed, the browser uses another serif font. A downloadable font can replace the `local("Georgia")` source when a licensed font file is added to the project.

## Expected output

On screen, the page shows a large heading, a short introduction, and a white card with a soft shadow. It uses Georgia when available and a serif fallback otherwise. The card has more padding on wider screens. The title may balance its line wrapping where supported. In print preview, the imported print rules switch the page to black text on white, remove the card shadow, and hide the screen-only note.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [49 - CSS nesting](49-css-nesting.md) | [Lesson](../lessons/50-at-rules-and-imports.md) | [Q&A](../qnas/50-at-rules-and-imports.md) | [51 - Feature queries and progressive enhancement](51-feature-queries-and-progressive-enhancement.md) |
