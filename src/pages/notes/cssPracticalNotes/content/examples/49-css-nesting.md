# 49 - CSS nesting

This standalone HTML example uses native CSS nesting for a responsive card component, nested states, child selectors, and conditional rules. The HTML stays semantic, and the CSS keeps each card's related styles together.

## Question

How can native CSS nesting organize a component's base styles, child elements, interactive states, and responsive layout in one place?

## Complete example

Save the code as an HTML file and open it in a browser that supports native CSS nesting. Hover a card or use the keyboard to focus its link and button. Resize the viewport to see the card layout change.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS nesting example</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      font-family: system-ui, sans-serif;
      color: #1b2938;
      background: #eef3f8;
    }

    body {
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      line-height: 1.6;
    }

    main {
      width: min(100%, 66rem);
      margin-inline: auto;
    }

    h1,
    h2,
    h3 {
      line-height: 1.2;
    }

    h1 {
      margin-bottom: 0.6rem;
      font-size: clamp(2rem, 5vw, 3rem);
    }

    .intro {
      max-width: 64ch;
      color: #46566a;
    }

    .card-list {
      display: grid;
      gap: 1rem;
      margin-top: 2rem;
    }

    .card {
      display: grid;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 1rem;
      background: white;
      box-shadow: 0 0.35rem 1rem rgb(15 23 42 / 0.08);
      transition: box-shadow 160ms ease, transform 160ms ease;

      .card__art {
        min-height: 10rem;
        border-radius: 0.7rem;
        background:
          radial-gradient(circle at 30% 30%, #fff0a8 0 1.2rem, transparent 1.3rem),
          linear-gradient(145deg, #168aad, #4361ee 55%, #7209b7);
      }

      .card__content {
        display: grid;
        align-content: start;
        gap: 0.7rem;
      }

      .card__title {
        color: #142c4e;
        font-size: 1.35rem;
      }

      .card__copy {
        color: #46566a;
      }

      .card__meta {
        color: #53657a;
        font-size: 0.9rem;
      }

      .card__actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.25rem;
      }

      .card__link {
        color: #064f9e;
        font-weight: 700;
        text-underline-offset: 0.2em;

        &:hover,
        &:focus-visible {
          color: #7a3100;
          text-decoration-thickness: 0.15em;
        }

        &:focus-visible {
          outline: 3px solid #f2a900;
          outline-offset: 3px;
        }
      }

      .card__button {
        padding: 0.55rem 0.8rem;
        border: 0;
        border-radius: 0.5rem;
        color: white;
        background: #145da0;
        font: inherit;
        font-weight: 700;
        cursor: pointer;

        &:hover {
          background: #0d477d;
        }

        &:focus-visible {
          outline: 3px solid #f2a900;
          outline-offset: 3px;
        }
      }

      &.card--featured {
        border-color: #d28b00;
        background: #fffaf0;
      }

      &:hover {
        box-shadow: 0 0.8rem 1.6rem rgb(15 23 42 / 0.16);
        transform: translateY(-0.15rem);
      }

      @media (min-width: 48rem) {
        grid-template-columns: 12rem 1fr;
        align-items: center;
        padding: 1.25rem;
      }

      @supports (text-wrap: balance) {
        .card__title {
          text-wrap: balance;
        }
      }
    }

    .site-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 2rem;
      padding: 1rem;
      border-radius: 0.75rem;
      background: #dce8f5;

      > a {
        color: #064f9e;
        font-weight: 700;

        &:focus-visible {
          outline: 3px solid #f2a900;
          outline-offset: 3px;
        }
      }

      > a + a {
        padding-left: 0.75rem;
        border-left: 1px solid #8fa5bd;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;

        &:hover {
          transform: none;
        }
      }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>CSS nesting</h1>
      <p class="intro">Each card keeps its child styles, interactive states, and responsive layout close to its base rule. The nested selectors are still ordinary CSS selectors matched against this HTML.</p>
    </header>

    <section class="card-list" aria-label="Learning cards">
      <article id="first" class="card card--featured">
        <div class="card__art" aria-hidden="true"></div>
        <div class="card__content">
          <h2 class="card__title">Keep related rules together</h2>
          <p class="card__copy">The title, copy, link, button, and card states are grouped inside the card's CSS rule. At wider viewports, the media query changes the card to two columns.</p>
          <p class="card__meta">Featured card</p>
          <div class="card__actions">
            <a class="card__link" href="#more">Read the details</a>
            <button class="card__button" type="button">Save card</button>
          </div>
        </div>
      </article>

      <article id="second" class="card">
        <div class="card__art" aria-hidden="true"></div>
        <div class="card__content">
          <h2 class="card__title">Use the parent selector</h2>
          <p class="card__copy">The ampersand attaches hover and focus states directly to the parent link or button. Nested child selectors style the content inside the card.</p>
          <p class="card__meta">Standard card</p>
          <div class="card__actions">
            <a class="card__link" href="#more">Read the details</a>
            <button class="card__button" type="button">Save card</button>
          </div>
        </div>
      </article>
    </section>

    <nav class="site-nav" aria-label="Example navigation">
      <a href="#first">First section</a>
      <a href="#second">Second section</a>
      <a href="#more">More details</a>
    </nav>

    <section id="more" class="card-list" aria-label="Nesting notes">
      <article id="notes" class="card">
        <div class="card__content">
          <h2 class="card__title">Nesting is still CSS</h2>
          <p class="card__copy">The cascade, specificity, source order, and accessible HTML still matter. Nesting organizes selectors; it does not create preprocessor variables or concatenate class names.</p>
        </div>
      </article>
    </section>
  </main>
</body>
</html>
~~~

## Explanation

- The base declarations are at the start of the `.card` rule. Nested child rules style the card title, copy, metadata, actions, link, and button.
- A nested selector without `&`, such as `.card__title`, matches a descendant of the card.
- Selectors such as `&:hover` and `&:focus-visible` attach pseudo-classes directly to the parent element.
- `&.card--featured` matches one element that has both classes.
- The nested `@media` rule changes the card layout at wider viewport sizes. The nested `@supports` rule adds balanced title wrapping only when available.
- The navigation uses `> a` for direct child links and `> a + a` for links that follow another direct child link.
- Focus indicators are included for links and buttons. The reduced-motion rule removes the card's transition and lift effect when reduced motion is requested.
- The HTML uses headings, articles, links, and buttons according to their roles. Decorative color panels are hidden from assistive technology.

## Expected output

The page displays a heading and a vertical list of cards. At wider viewport sizes, each card places its gradient artwork beside its text. The first card has a gold featured border and a warm background. Hovering a card adds a small lift and stronger shadow when motion is allowed. Focusing a link or button shows a visible gold outline. The bottom navigation links are spaced in one row when room allows and wrap on smaller screens.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [48 - Clipping, masks, and shapes](48-clipping-masking-and-shapes.md) | [Lesson](../lessons/49-css-nesting.md) | [Q&A](../qnas/49-css-nesting.md) | [50 - At-rules, imports, and font-face](50-at-rules-and-imports.md) |
