# 31 - Container Queries: Example

## Goal

Build a small product-card catalog where each card chooses its own layout based on its available width. The featured card can become a side-by-side layout while narrower cards remain stacked, even when they are displayed in the same browser window.

## Complete example

Copy the code into a file named `index.html` and open it in a browser that supports CSS container queries. The code is displayed here for learning; this Markdown page does not run it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Container Query Card Catalog</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :root {
      color-scheme: light;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #172033;
      background: #f1f5f9;
    }

    body {
      margin: 0;
    }

    .page-shell {
      width: min(100% - 2rem, 72rem);
      margin-inline: auto;
      padding-block: 2rem 4rem;
    }

    h1,
    h2,
    p {
      margin-block-start: 0;
    }

    .page-intro {
      max-width: 48rem;
      margin-block-end: 2rem;
    }

    .catalog {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
      gap: 1rem;
      align-items: stretch;
    }

    .product-card {
      container: product-card / inline-size;
      min-width: 0;
      padding: 1rem;
      border: 1px solid #bdc9d6;
      border-radius: 0.75rem;
      background: #fff;
      box-shadow: 0 0.25rem 1rem rgb(23 32 51 / 8%);
    }

    .product-card--featured {
      grid-column: 1 / -1;
      border-color: #3974a8;
    }

    .product-card__layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem;
      align-items: start;
    }

    .product-card__artwork {
      display: grid;
      min-block-size: 10rem;
      place-items: center;
      margin: 0;
      border-radius: 0.5rem;
      background: #e4eef8;
      color: #174f86;
      font-size: 1.125rem;
      font-weight: 700;
      text-align: center;
    }

    .product-card__category {
      margin-block-end: 0.25rem;
      color: #42516a;
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .product-card__title {
      margin-block-end: 0.5rem;
      font-size: 1.35rem;
      line-height: 1.25;
    }

    .product-card__description {
      margin-block-end: 0.75rem;
      color: #344258;
    }

    .product-card__details {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1rem;
      margin: 0;
      color: #344258;
      font-size: 0.925rem;
    }

    .product-card__details div {
      display: flex;
      gap: 0.35rem;
    }

    .product-card__details dt {
      font-weight: 700;
    }

    .product-card__details dd {
      margin: 0;
    }

    .product-card__label {
      display: inline-block;
      margin-block-end: 0.75rem;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      background: #e8f4ee;
      color: #185b3d;
      font-size: 0.8rem;
      font-weight: 700;
    }

    @container product-card (inline-size >= 36rem) {
      .product-card__layout {
        grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.2fr);
        align-items: center;
        gap: 1.5rem;
      }

      .product-card__artwork {
        min-block-size: 13rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <main class="page-shell">
    <header class="page-intro">
      <p>CSS layout practice</p>
      <h1>Field catalog</h1>
      <p>
        Resize the page and compare the featured card with the smaller cards.
        Each card responds to its own available inline size.
      </p>
    </header>

    <section class="catalog" aria-label="Field catalog products">
      <article class="product-card product-card--featured">
        <div class="product-card__layout">
          <div class="product-card__artwork" aria-hidden="true">
            Field notes
          </div>
          <div>
            <p class="product-card__category">Writing</p>
            <h2 class="product-card__title">Field notebook</h2>
            <span class="product-card__label">Featured item</span>
            <p class="product-card__description">
              A durable notebook for observations, maps, and quick sketches
              during a day outdoors.
            </p>
            <dl class="product-card__details">
              <div><dt>Pages:</dt><dd>160</dd></div>
              <div><dt>Cover:</dt><dd>Water resistant</dd></div>
            </dl>
          </div>
        </div>
      </article>

      <article class="product-card">
        <div class="product-card__layout">
          <div class="product-card__artwork" aria-hidden="true">
            Trail map
          </div>
          <div>
            <p class="product-card__category">Navigation</p>
            <h2 class="product-card__title">Pocket map</h2>
            <p class="product-card__description">
              A foldable map with a clear legend and marked walking routes.
            </p>
            <dl class="product-card__details">
              <div><dt>Scale:</dt><dd>1:25,000</dd></div>
              <div><dt>Format:</dt><dd>Foldable</dd></div>
            </dl>
          </div>
        </div>
      </article>

      <article class="product-card">
        <div class="product-card__layout">
          <div class="product-card__artwork" aria-hidden="true">
            Compass
          </div>
          <div>
            <p class="product-card__category">Navigation</p>
            <h2 class="product-card__title">Baseplate compass</h2>
            <p class="product-card__description">
              A simple compass for practicing bearings and map reading.
            </p>
            <dl class="product-card__details">
              <div><dt>Type:</dt><dd>Baseplate</dd></div>
              <div><dt>Use:</dt><dd>Land navigation</dd></div>
            </dl>
          </div>
        </div>
      </article>
    </section>
  </main>
</body>
</html>
~~~

## Explanation

- Each `.product-card` declares `container: product-card / inline-size`. This gives descendants a named container whose inline dimension can be queried.
- Each `.product-card__layout` starts with one column. That is the base style and remains usable when the condition is false.
- The featured article spans the catalog grid's columns. When it has at least `36rem` of inline space, its inner layout changes to two columns.
- The smaller cards use the same query rule. If one reaches the threshold, it can change independently. Otherwise, it stays stacked.
- The query targets a descendant of the container. It does not try to style the `.product-card` using its own size.
- The threshold describes when this content has enough room for an artwork panel beside the text. It is not tied to a specific device.
- The semantic order remains artwork, category, heading, and description in the HTML. The layout change does not reorder the reading sequence.
- The media rule is separate from the container query. It respects a visitor's reduced-motion preference if motion is added to the page later.

## Expected output

The page displays a light catalog with one featured card and two regular cards. Each card begins with its artwork area above its text.

When the featured card has enough space, its artwork sits beside the product details. A regular card in a narrower grid column remains stacked. The exact cards that switch depend on the available layout width, so resize the browser gradually and watch the card itself rather than relying only on device presets.

If every card is narrow, they all remain stacked. At intermediate widths, some instances can switch while others stay stacked. This is the intended difference from a viewport-only breakpoint: each card responds to the space available to that card.

## What to notice

1. The outer catalog grid arranges the cards.
2. The featured card spans the grid's columns.
3. The container query changes only the inside of a card.
4. The same query can produce different layouts for cards in different spaces.
5. The base style keeps all product information available at every size.

## Try these changes

1. Change the threshold from `36rem` to a value that fits your text and artwork.
2. Remove `container-type` from `.product-card` and observe that its size query no longer has a suitable ancestor.
3. Move `container-type` to `.product-card__layout` and consider which element the rule is now allowed to style.
4. Add a `container-name` to an outer page region and compare a named query with the nearest unnamed container.
5. Use `clamp()` and `cqi` to make a heading scale within a sensible minimum and maximum.
6. Add a long product title and verify that neither the card nor the page gets unwanted horizontal overflow.

## Key points

- Put the query container on the ancestor whose available size should control a component.
- Use a descendant selector inside `@container`.
- A base layout outside the query is the fallback.
- The same component can adapt differently in separate places.
- Choose the query threshold from the content's needs.
- Keep source order meaningful when layout changes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [30 - Responsive Design and Media Queries](../lessons/30-responsive-design-and-media-queries.md) | [Lesson](../lessons/31-container-queries.md) | [Q&A](../qnas/31-container-queries.md) | [32 - Logical Properties and Writing Modes](../lessons/32-logical-properties-and-writing-modes.md) |
