# 27 - CSS Grid Layout: Example

## Goal

Build a responsive page shell with named areas, an auto-fitting card grid, a spanning item, and a form whose labels and fields share parent tracks with subgrid. A final sizing example shows how a zero track minimum handles long content. This is a complete HTML page with its CSS included.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Grid Layout</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :root {
      color: #172033;
      background: #f1f5f9;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    body {
      width: min(100% - 2rem, 74rem);
      margin-inline: auto;
      padding-block: 2rem 4rem;
    }

    h1,
    h2,
    h3,
    p {
      margin: 0;
    }

    h1 {
      margin-block-end: 0.4rem;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.1;
    }

    h2 {
      margin-block-end: 0.75rem;
      font-size: 1.4rem;
      line-height: 1.2;
    }

    h3 {
      margin-block-end: 0.4rem;
      font-size: 1.05rem;
    }

    p + p {
      margin-block-start: 0.65rem;
    }

    a {
      color: #1d4ed8;
    }

    a:focus-visible,
    input:focus-visible,
    button:focus-visible {
      outline: 3px solid #ea580c;
      outline-offset: 3px;
    }

    .page-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 16rem;
      grid-template-areas:
        "header header"
        "main sidebar"
        "footer footer";
      gap: 1rem;
    }

    .page-header,
    .page-main,
    .page-sidebar,
    .page-footer,
    .section {
      min-inline-size: 0;
      padding: clamp(1rem, 3vw, 1.5rem);
      border: 1px solid #cbd5e1;
      border-radius: 0.8rem;
      background: #fff;
      box-shadow: 0 0.35rem 1.2rem rgb(15 23 42 / 5%);
    }

    .page-header {
      grid-area: header;
      background: linear-gradient(125deg, #fff, #ecfeff);
    }

    .page-main {
      grid-area: main;
    }

    .page-sidebar {
      grid-area: sidebar;
      align-self: start;
      background: #f8fafc;
    }

    .page-footer {
      grid-area: footer;
      color: #475569;
      text-align: center;
    }

    .intro {
      max-inline-size: 68ch;
      color: #475569;
      font-size: 1.05rem;
    }

    .section + .section {
      margin-block-start: 1rem;
    }

    .section-description {
      margin-block-end: 1rem;
      color: #475569;
    }

    .area-nav {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.65rem;
      margin-block-start: 1.25rem;
    }

    .area-nav a {
      padding: 0.65rem 0.75rem;
      border: 1px solid #bae6fd;
      border-radius: 0.5rem;
      background: #f0f9ff;
      font-weight: 700;
      text-align: center;
      text-decoration: none;
    }

    .area-nav a:hover {
      background: #e0f2fe;
      text-decoration: underline;
    }

    .auto-fit-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
      gap: 0.85rem;
    }

    .resource-card {
      min-inline-size: 0;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.65rem;
      background: #f8fafc;
    }

    .resource-card p {
      color: #475569;
    }

    .resource-card__link {
      display: inline-block;
      margin-block-start: 0.5rem;
      font-weight: 700;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.85rem;
    }

    .feature-card {
      min-inline-size: 0;
      padding: 0.85rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.65rem;
      background: #f8fafc;
    }

    .feature-card--wide {
      grid-column: 1 / -1;
    }

    .feature-art {
      display: grid;
      min-block-size: 12rem;
      overflow: hidden;
      border-radius: 0.5rem;
      background: linear-gradient(145deg, #bae6fd, #ecfeff 52%, #99f6e4);
    }

    .feature-art__mountains,
    .feature-art__label {
      grid-area: 1 / 1;
    }

    .feature-art__mountains {
      align-self: end;
      min-block-size: 8rem;
      background:
        linear-gradient(140deg, transparent 48%, #155e75 49% 67%, transparent 68%),
        linear-gradient(35deg, transparent 42%, #0f766e 43% 65%, transparent 66%);
    }

    .feature-art__label {
      z-index: 1;
      align-self: end;
      justify-self: start;
      margin: 0.75rem;
      padding: 0.25rem 0.55rem;
      border-radius: 0.35rem;
      color: #fff;
      background: #172033;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .feature-card h3 {
      margin-block-start: 0.75rem;
    }

    .auto-placement {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-auto-rows: minmax(6rem, auto);
      gap: 0.75rem;
    }

    .placement-item {
      display: grid;
      min-inline-size: 0;
      place-items: center;
      padding: 0.75rem;
      border: 1px solid #99f6e4;
      border-radius: 0.55rem;
      color: #115e59;
      background: #f0fdfa;
      font-weight: 700;
      text-align: center;
    }

    .placement-item--wide {
      grid-column: span 2;
      color: #fff;
      background: #0f766e;
    }

    .booking-form {
      display: grid;
      grid-template-columns: 9rem minmax(0, 1fr);
      gap: 0.85rem 1rem;
      align-items: center;
    }

    .form-row {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
      gap: inherit;
      align-items: center;
    }

    .form-row label {
      font-weight: 700;
    }

    .form-row input {
      min-inline-size: 0;
      inline-size: 100%;
      padding: 0.65rem 0.75rem;
      border: 1px solid #94a3b8;
      border-radius: 0.45rem;
      color: inherit;
      font: inherit;
    }

    .booking-form button {
      grid-column: 2;
      justify-self: start;
      padding: 0.65rem 1rem;
      border: 0;
      border-radius: 0.45rem;
      color: #fff;
      background: #1d4ed8;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .sizing-demo {
      display: grid;
      grid-template-columns: 8rem minmax(0, 1fr);
      gap: 0.75rem;
      padding: 0.85rem;
      border-radius: 0.6rem;
      background: #f8fafc;
    }

    .sizing-demo__side,
    .sizing-demo__main {
      min-inline-size: 0;
      padding: 0.75rem;
      border-radius: 0.45rem;
    }

    .sizing-demo__side {
      color: #fff;
      background: #155e75;
      font-weight: 700;
    }

    .sizing-demo__main {
      overflow-wrap: anywhere;
      background: #e0f2fe;
    }

    .sidebar-list {
      margin: 0;
      padding-inline-start: 1.2rem;
    }

    .sidebar-list li + li {
      margin-block-start: 0.5rem;
    }

    @media (max-width: 52rem) {
      .page-grid {
        grid-template-columns: minmax(0, 1fr);
        grid-template-areas:
          "header"
          "main"
          "sidebar"
          "footer";
      }

      .page-sidebar {
        align-self: stretch;
      }
    }

    @media (max-width: 34rem) {
      .area-nav {
        grid-template-columns: minmax(0, 1fr);
      }

      .feature-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .feature-card--wide {
        grid-column: auto;
      }

      .booking-form {
        grid-template-columns: minmax(0, 1fr);
      }

      .form-row {
        grid-template-columns: minmax(0, 1fr);
      }

      .booking-form button {
        grid-column: 1;
      }

      .sizing-demo {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  </style>
</head>
<body>
  <div class="page-grid">
    <header class="page-header">
      <h1>Field notes</h1>
      <p class="intro">A responsive page structure uses named grid areas. The main region holds several small Grid examples.</p>
      <nav class="area-nav" aria-label="Page sections">
        <a href="#resources">Resources</a>
        <a href="#placement">Placement</a>
        <a href="#booking">Booking form</a>
      </nav>
    </header>

    <main class="page-main">
      <section class="section" id="resources" aria-labelledby="resources-title">
        <h2 id="resources-title">Resources that fit</h2>
        <p class="section-description">The auto-fit pattern creates as many cards as fit in the available width. Each occupied track can grow to share free space.</p>
        <div class="auto-fit-grid">
          <article class="resource-card">
            <h3>Plan a route</h3>
            <p>Choose a destination and estimate the walking time.</p>
            <a class="resource-card__link" href="#booking">Plan a visit</a>
          </article>
          <article class="resource-card">
            <h3>Pack a bag</h3>
            <p>Bring water, a map, and weather-appropriate layers.</p>
            <a class="resource-card__link" href="#placement">See the layout</a>
          </article>
          <article class="resource-card">
            <h3>Check the trail</h3>
            <p>Review the route details before setting out.</p>
            <a class="resource-card__link" href="#summary">Read the summary</a>
          </article>
        </div>
      </section>

      <section class="section" aria-labelledby="span-title">
        <h2 id="span-title">A spanning item</h2>
        <p class="section-description">The first feature spans both explicit columns. Its label and mountain artwork occupy the same grid cell.</p>
        <div class="feature-grid">
          <article class="feature-card feature-card--wide">
            <div class="feature-art" role="img" aria-label="A simple mountain landscape illustration">
              <div class="feature-art__mountains"></div>
              <span class="feature-art__label">Featured route</span>
            </div>
            <h3>Across the ridge</h3>
            <p>This card spans both columns in the feature grid.</p>
          </article>
          <article class="feature-card">
            <h3>Short walk</h3>
            <p>A nearby loop for a free afternoon.</p>
          </article>
          <article class="feature-card">
            <h3>Long walk</h3>
            <p>A longer trail with more elevation.</p>
          </article>
        </div>
      </section>

      <section class="section" id="placement" aria-labelledby="placement-title">
        <h2 id="placement-title">Explicit and implicit tracks</h2>
        <p class="section-description">There are three explicit columns. Auto placement fills available cells, and additional rows use the implicit row sizing rule.</p>
        <div class="auto-placement">
          <div class="placement-item">Item 1</div>
          <div class="placement-item placement-item--wide">Item 2 spans two columns</div>
          <div class="placement-item">Item 3</div>
          <div class="placement-item">Item 4</div>
          <div class="placement-item">Item 5</div>
        </div>
      </section>

      <section class="section" id="booking" aria-labelledby="booking-title">
        <h2 id="booking-title">A form using subgrid</h2>
        <p class="section-description">Each row spans the form's columns and uses subgrid, so labels and fields share the same tracks.</p>
        <form class="booking-form">
          <div class="form-row">
            <label for="visitor-name">Your name</label>
            <input id="visitor-name" name="visitor-name" autocomplete="name">
          </div>
          <div class="form-row">
            <label for="visitor-email">Email address</label>
            <input id="visitor-email" name="visitor-email" type="email" autocomplete="email">
          </div>
          <button type="button">Save details</button>
        </form>
      </section>

      <section class="section" aria-labelledby="sizing-title">
        <h2 id="sizing-title">Prevent a wide content track</h2>
        <p class="section-description">The main track has a zero minimum, and the long token can wrap within its grid item.</p>
        <div class="sizing-demo">
          <div class="sizing-demo__side">Sidebar</div>
          <div class="sizing-demo__main">Main content: a-very-long-unbroken-example-token-that-would-otherwise-push-the-grid-track-wider-than-its-container</div>
        </div>
      </section>
    </main>

    <aside class="page-sidebar" aria-labelledby="sidebar-title">
      <h2 id="sidebar-title">On this page</h2>
      <ul class="sidebar-list">
        <li><a href="#resources">Responsive cards</a></li>
        <li><a href="#placement">Auto placement</a></li>
        <li><a href="#booking">Subgrid form</a></li>
      </ul>
      <p>At narrower widths, this sidebar moves below the main content using a new area map.</p>
    </aside>

    <footer class="page-footer" id="summary">
      Grid areas structure the page while smaller grids organize each component.
    </footer>
  </div>
</body>
</html>
~~~

## Expected output

On a wide screen, the header spans the page. The main content appears beside a narrow sidebar, with the footer below both. The resource cards form as many columns as fit. In the feature section, the first card spans the full two-column width and its label overlays the illustration. The placement example shows a wide item spanning two of three columns and later items placed automatically.

The form labels and fields align in shared columns. The sizing example keeps its long token inside the main track. At narrower widths, the sidebar moves below the main content. At the smallest breakpoint, the form and feature cards become single-column layouts.

## Explanation

The page shell uses grid-template-areas to define the header, main, sidebar, and footer. A media query changes the map to a single column without moving those elements in the HTML source. The resource cards use auto-fit and minmax() to create responsive repeated tracks.

The feature section defines two equal columns. The featured card spans from the first line to the last with grid-column: 1 / -1. Its artwork and label are placed in the same grid cell, so the later label paints over the artwork.

The placement section explicitly defines three columns and lets row placement happen automatically. The wide item spans two columns, and the other items continue through the available cells. grid-auto-rows sizes any implicit rows that are needed.

In the form, each row spans the parent grid columns and uses grid-template-columns: subgrid. Labels and fields therefore align with the form's shared tracks instead of calculating separate widths.

The sizing example uses minmax(0, 1fr) for the main column, min-inline-size: 0 on its children, and overflow-wrap: anywhere for its long token. The combination prevents the content from forcing the page wider.

The form's button is intentionally type="button" because this static example has no submit handler. The navigation uses in-page links, and the form fields have associated labels.

## Key points

- Named areas can make page structure easy to read and can be rearranged with media queries.
- auto-fit and minmax() create responsive repeated tracks.
- Grid items can span tracks or share a cell.
- Auto placement fills remaining cells and can create implicit tracks.
- subgrid aligns nested items to parent tracks.
- A zero minimum and content wrapping can prevent unwanted track overflow.
- Visual placement does not change source or keyboard order.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [26 - Flexbox Layout](26-flexbox.md) | [Lesson](../lessons/27-css-grid.md) | [Q&A](../qnas/27-css-grid.md) | [28 - Alignment and Gaps](28-alignment-and-gaps.md) |
