# 30 - Responsive Design and Media Queries: Example

## Goal

Build a responsive catalog page that changes its card layout as the available viewport grows. The example also includes a dark color scheme, a hover enhancement for a precise pointer, a reduced-motion preference, keyboard focus styles, and print rules.

This is a complete HTML page with its CSS included. Copy it into a file named index.html and open it in a browser. GitHub's Markdown preview provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Northstar Field Catalog</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :root {
      color-scheme: light;
      --page: #f1f5f9;
      --surface: #fff;
      --text: #172033;
      --muted: #42516a;
      --border: #c4cfdb;
      --accent: #174f86;
      --accent-soft: #e4eef8;
      --highlight: #176243;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    body {
      margin: 0;
      background: var(--page);
      color: var(--text);
    }

    a {
      color: var(--accent);
    }

    a:focus-visible {
      outline: 3px solid #b94716;
      outline-offset: 3px;
    }

    h1,
    h2,
    p {
      margin: 0;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.1;
    }

    h2 {
      font-size: 1.25rem;
      line-height: 1.3;
    }

    .skip-link {
      position: absolute;
      inset-block-start: 0.5rem;
      inset-inline-start: 0.5rem;
      z-index: 1;
      padding: 0.5rem 0.75rem;
      transform: translateY(-200%);
      border-radius: 0.25rem;
      background: var(--surface);
      color: var(--text);
    }

    .skip-link:focus {
      transform: translateY(0);
    }

    .site-header,
    .page-shell {
      width: min(100% - 2rem, 74rem);
      margin-inline: auto;
    }

    .site-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-block: 1rem;
    }

    .brand {
      color: var(--text);
      font-size: 1.1rem;
      font-weight: 800;
      text-decoration: none;
    }

    .site-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem;
    }

    .site-nav a {
      font-weight: 700;
      text-decoration-thickness: 0.08em;
      text-underline-offset: 0.2em;
    }

    .page-shell {
      padding-block: 1rem 4rem;
    }

    .catalog-layout {
      display: grid;
      gap: 1.5rem;
    }

    .filters,
    .card {
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      background: var(--surface);
    }

    .filters {
      align-self: start;
      padding: 1rem;
    }

    .filters h2 {
      margin-block-end: 0.75rem;
    }

    .filter-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .filter-list a {
      display: inline-block;
      padding: 0.3rem 0.6rem;
      border-radius: 999px;
      background: var(--accent-soft);
      text-decoration: none;
    }

    .catalog-content {
      min-inline-size: 0;
    }

    .catalog-heading {
      display: grid;
      gap: 0.5rem;
      margin-block-end: 1.25rem;
    }

    .eyebrow {
      color: var(--highlight);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .catalog-intro {
      max-inline-size: 65ch;
      color: var(--muted);
    }

    .catalog-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem;
    }

    .card {
      display: grid;
      align-content: start;
      gap: 0.75rem;
      padding: 1rem;
    }

    .card h2 a {
      color: var(--text);
      text-decoration-thickness: 0.08em;
      text-underline-offset: 0.18em;
    }

    .card p {
      color: var(--muted);
    }

    .card-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      color: var(--muted);
      font-size: 0.9rem;
    }

    .tag {
      padding: 0.15rem 0.5rem;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--text);
      font-size: 0.8rem;
      font-weight: 700;
    }

    .motion-demo {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-block-start: 1.5rem;
      color: var(--muted);
    }

    .motion-dot {
      inline-size: 0.75rem;
      block-size: 0.75rem;
      border-radius: 50%;
      background: var(--highlight);
      animation: pulse 1.8s ease-in-out infinite;
    }

    @keyframes pulse {
      50% {
        opacity: 0.3;
        transform: scale(0.75);
      }
    }

    .site-footer {
      width: min(100% - 2rem, 74rem);
      margin-inline: auto;
      padding-block: 1rem 2rem;
      border-block-start: 1px solid var(--border);
      color: var(--muted);
    }

    @media (min-width: 42rem) {
      .catalog-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media screen and (min-width: 68rem) {
      .catalog-layout {
        grid-template-columns: 14rem minmax(0, 1fr);
        align-items: start;
      }

      .catalog-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
      .card {
        transition: transform 160ms ease;
      }

      .card:hover {
        transform: translateY(-0.2rem);
      }
    }

    @media (prefers-color-scheme: dark) {
      :root {
        color-scheme: dark;
        --page: #111827;
        --surface: #1b2637;
        --text: #f1f5f9;
        --muted: #c3cedb;
        --border: #536174;
        --accent: #9cc9ff;
        --accent-soft: #263b55;
        --highlight: #79d2a5;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .motion-dot {
        animation: none;
      }

      .card {
        transition: none;
      }
    }

    @media print {
      .skip-link,
      .site-header,
      .filters,
      .motion-demo,
      .site-footer {
        display: none;
      }

      body {
        background: #fff;
        color: #000;
      }

      .page-shell {
        width: 100%;
        padding: 0;
      }

      .catalog-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .card {
        break-inside: avoid;
        border-color: #777;
        background: #fff;
        color: #000;
      }

      .card p,
      .catalog-intro {
        color: #222;
      }

      .card h2 a {
        color: #000;
      }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main">Skip to catalog</a>

  <header class="site-header">
    <a class="brand" href="#main">Northstar Field Catalog</a>
    <nav class="site-nav" aria-label="Main navigation">
      <a href="#catalog">Catalog</a>
      <a href="#collections">Collections</a>
      <a href="#about">About</a>
    </nav>
  </header>

  <main class="page-shell" id="main">
    <div class="catalog-layout">
      <aside class="filters" id="collections" aria-labelledby="filters-title">
        <h2 id="filters-title">Collections</h2>
        <ul class="filter-list">
          <li><a href="#maps">Maps</a></li>
          <li><a href="#journals">Journals</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#guides">Guides</a></li>
        </ul>
      </aside>

      <section class="catalog-content" id="catalog" aria-labelledby="page-title">
        <header class="catalog-heading">
          <p class="eyebrow">Made for curious explorers</p>
          <h1 id="page-title">Field notes and useful tools</h1>
          <p class="catalog-intro">
            Explore a small collection of guides, maps, and journals for
            learning about the places around you.
          </p>
        </header>

        <div class="catalog-grid">
          <article class="card" id="maps">
            <p class="card-meta"><span class="tag">Map</span> 8 minute read</p>
            <h2><a href="#about">Reading a trail map</a></h2>
            <p>
              Learn how contour lines, symbols, and scale help you plan a
              route before setting out.
            </p>
          </article>

          <article class="card" id="journals">
            <p class="card-meta"><span class="tag">Journal</span> 5 minute read</p>
            <h2><a href="#about">Keeping a field journal</a></h2>
            <p>
              Use short observations and sketches to remember what changed
              from one visit to the next.
            </p>
          </article>

          <article class="card" id="tools">
            <p class="card-meta"><span class="tag">Tool</span> 6 minute read</p>
            <h2><a href="#about">A simple observation kit</a></h2>
            <p>
              A notebook, pencil, and small ruler can help you record useful
              details without carrying much equipment.
            </p>
          </article>

          <article class="card" id="guides">
            <p class="card-meta"><span class="tag">Guide</span> 7 minute read</p>
            <h2><a href="#about">Noticing local weather</a></h2>
            <p>
              Compare shade, wind, and moisture to understand how conditions
              change across a familiar place.
            </p>
          </article>
        </div>

        <p class="motion-demo">
          <span class="motion-dot" aria-hidden="true"></span>
          A small decorative motion adapts to your motion preference.
        </p>
      </section>
    </div>
  </main>

  <footer class="site-footer" id="about">
    <p>Explore carefully and leave each place as you found it.</p>
  </footer>
</body>
</html>
~~~

## Expected output

At narrow widths, the catalog uses one column and the collections links wrap. From 42rem, the cards use two columns. At 68rem, the collection panel moves beside the content and the cards use three columns.

The page follows the system color scheme. The card lift effect only appears for a precise pointer when the reader has not requested reduced motion. The animated dot stops when reduced motion is requested. Print preview hides navigation and the collections panel while keeping the catalog cards.

## Explanation

### Viewport and flexible base layout

The viewport declaration lets the page use the device viewport as its layout viewport. The shell uses a flexible width with a maximum size, and the card grid starts with one column. This provides a useful narrow layout before any breakpoint applies.

### Content-based breakpoints

At 42rem, the cards have enough room to form two columns. At 68rem, the side panel and a three-column card layout fit together. These values are examples. Adjust them if the actual content becomes cramped sooner or has extra room later.

### Interaction and motion preferences

The card lift is behind a query that checks hover capability, pointer precision, and the motion preference together. Touch and keyboard users keep access to the same content without relying on hover. The animated dot is decorative and stops for readers who request reduced motion.

### Color scheme

The default palette is light. The dark preference changes the CSS variables used for the page, cards, text, borders, links, and tags. Checking the whole palette keeps the text readable in either scheme.

### Print output

The print query removes navigation and decorative elements, gives the catalog the full page width, and keeps cards from breaking across printed pages where possible.

## Key points

- A responsive layout starts with a usable base and flexible sizing.
- Media queries add changes where the content needs them.
- Color scheme, pointer capability, reduced motion, and print output can all influence presentation.
- Keep controls usable without hover and keep content readable when motion is reduced.
- The narrow layout remains available without the wider media queries.
- The print rules keep the catalog content and remove screen-only furniture.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [29 - Multi-column Layout](../lessons/29-multi-column-layout.md) | [Lesson](../lessons/30-responsive-design-and-media-queries.md) | [Q&A](../qnas/30-responsive-design-and-media-queries.md) | [31 - Container Queries](../lessons/31-container-queries.md) |
