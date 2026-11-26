# 28 - Alignment and Gaps: Example

## Goal

Build a small reference page that shows the difference between aligning grid items inside their areas and distributing the grid tracks inside the container. The page also demonstrates Flexbox alignment, wrapping line distribution, gaps, auto margins, baseline alignment, and the `place-items` shorthand.

This is a complete HTML page with its CSS included. Copy it into a file named index.html and open it in a browser. GitHub's Markdown preview provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Alignment and Gaps</title>
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
      width: min(100% - 2rem, 68rem);
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
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.1;
    }

    h2 {
      font-size: 1.4rem;
      line-height: 1.2;
    }

    h3 {
      font-size: 1rem;
      line-height: 1.3;
    }

    a {
      color: #0759b8;
    }

    .page-header,
    .example-section {
      display: grid;
      gap: 1rem;
    }

    .page-header {
      margin-block-end: 2rem;
    }

    .example-section {
      padding: 1.25rem;
      border: 1px solid #b9c5d4;
      border-radius: 0.75rem;
      background: #fff;
    }

    .section-intro {
      max-inline-size: 68ch;
      color: #42516a;
    }

    .grid-stage {
      display: grid;
      min-block-size: 20rem;
      padding: 1rem;
      border: 2px dashed #8a9bb2;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .alignment-grid {
      display: grid;
      grid-template-columns: repeat(3, 8rem);
      grid-auto-rows: 6rem;
      justify-content: space-evenly;
      align-content: center;
      justify-items: center;
      align-items: center;
      gap: 0.75rem 1rem;
    }

    .grid-card {
      display: grid;
      min-block-size: 4rem;
      padding: 0.5rem;
      place-items: center;
      border: 2px solid #285ea8;
      border-radius: 0.5rem;
      background: #dcecff;
      text-align: center;
      font-weight: 700;
    }

    .grid-card--special {
      justify-self: end;
      align-self: start;
      border-color: #8c3b87;
      background: #f6e3f3;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid #b9c5d4;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .toolbar__brand {
      color: #172033;
      font-weight: 700;
      text-decoration: none;
    }

    .toolbar__links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .toolbar__account {
      margin-inline-start: auto;
      padding: 0.4rem 0.75rem;
      border-radius: 999px;
      background: #173d72;
      color: #fff;
      text-decoration: none;
      font-weight: 700;
    }

    .chip-field {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      gap: 0.5rem 0.75rem;
      inline-size: min(100%, 24rem);
      min-block-size: 12rem;
      padding: 1rem;
      border: 1px solid #b9c5d4;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .chip {
      padding: 0.3rem 0.65rem;
      border: 1px solid #9fb3ca;
      border-radius: 999px;
      background: #e8f1fb;
      white-space: nowrap;
    }

    .center-stage {
      display: grid;
      place-items: center;
      min-block-size: 8rem;
      border: 1px solid #b9c5d4;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .centered-badge {
      padding: 0.5rem 0.8rem;
      border-radius: 0.5rem;
      background: #176243;
      color: #fff;
      font-weight: 700;
    }

    .price-row {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
    }

    .price {
      color: #173d72;
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1;
    }

    .price-unit {
      color: #42516a;
      font-size: 1rem;
    }

    .output-note {
      padding-inline-start: 1rem;
      border-inline-start: 3px solid #7994b4;
      color: #42516a;
    }

    @media (max-width: 38rem) {
      .alignment-grid {
        grid-template-columns: repeat(2, minmax(0, 8rem));
      }

      .toolbar__account {
        margin-inline-start: 0;
      }
    }
  </style>
</head>
<body>
  <header class="page-header">
    <p>CSS layout reference</p>
    <h1>Alignment and gaps</h1>
    <p class="section-intro">
      Compare item alignment with track distribution, then see how Flexbox
      alignment, auto margins, baseline alignment, and gaps affect a layout.
    </p>
  </header>

  <main>
    <section class="example-section" aria-labelledby="grid-heading">
      <h2 id="grid-heading">Grid tracks and items</h2>
      <p class="section-intro">
        The grid tracks are distributed inside the dashed container.
        Items are centered within their cells, except for the highlighted item.
      </p>

      <div class="grid-stage">
        <div class="alignment-grid" aria-label="Three-column alignment example">
          <div class="grid-card">One</div>
          <div class="grid-card">Two</div>
          <div class="grid-card">Three</div>
          <div class="grid-card">Four</div>
          <div class="grid-card grid-card--special">Special</div>
          <div class="grid-card">Six</div>
        </div>
      </div>

      <p class="output-note">
        The columns are spaced as a group. Each card is aligned inside its
        grid area. The highlighted card overrides the shared item alignment.
      </p>
    </section>

    <section class="example-section" aria-labelledby="toolbar-heading">
      <h2 id="toolbar-heading">Flexbox and an auto margin</h2>
      <p class="section-intro">
        The account link uses an auto margin to take the remaining space
        between it and the navigation links.
      </p>

      <nav class="toolbar" aria-label="Example navigation">
        <a class="toolbar__brand" href="#grid-heading">Field Notes</a>
        <div class="toolbar__links">
          <a href="#grid-heading">Grid</a>
          <a href="#chips-heading">Flexbox</a>
        </div>
        <a class="toolbar__account" href="#price-heading">Account</a>
      </nav>

      <p class="output-note">
        The items align across the cross axis. The account link moves to the
        far end of the row while the gap keeps adjacent items apart.
      </p>
    </section>

    <section class="example-section" aria-labelledby="chips-heading">
      <h2 id="chips-heading">Wrapped lines and gap</h2>
      <p class="section-intro">
        A narrow wrapping flex container has extra cross-axis space so its
        multiple lines can be distributed.
      </p>

      <div class="chip-field" aria-label="Example topic tags">
        <span class="chip">Selectors</span>
        <span class="chip">Grid</span>
        <span class="chip">Flexbox</span>
        <span class="chip">Spacing</span>
        <span class="chip">Responsive design</span>
        <span class="chip">Alignment</span>
        <span class="chip">Layout</span>
      </div>

      <p class="output-note">
        The tags wrap onto multiple lines. The row and column gaps separate
        adjacent tags, and the extra height is distributed between the lines.
      </p>
    </section>

    <section class="example-section" aria-labelledby="center-heading">
      <h2 id="center-heading">The place-items shorthand</h2>
      <p class="section-intro">
        One value centers an item on both alignment axes in its grid area.
      </p>

      <div class="center-stage">
        <span class="centered-badge">Centered in both axes</span>
      </div>

      <p class="output-note">
        The badge is centered inside its grid area. This does not distribute
        grid tracks inside the outer container.
      </p>
    </section>

    <section class="example-section" aria-labelledby="price-heading">
      <h2 id="price-heading">Baseline alignment</h2>
      <p class="section-intro">
        Baseline alignment lines up text even when the text uses different
        font sizes.
      </p>

      <p class="price-row">
        <span class="price">$24</span>
        <span class="price-unit">per month</span>
      </p>

      <p class="output-note">
        The price and its unit align by their text baselines, not by the
        centers of their boxes.
      </p>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

The page has five sections:

1. A dashed Grid container shows spaced columns, centered items, and one item aligned to its own grid-area edges.
2. A Flexbox toolbar places its account link at the far end with a logical auto margin.
3. A narrow wrapping tag list shows row and column gaps and distributes multiple flex lines vertically.
4. A badge is centered in both axes by the `place-items` shorthand.
5. A large price and its smaller unit share a text baseline.

On a narrow screen, the grid changes to two columns and the toolbar account link returns next to the other links.

## Explanation

### Grid track alignment versus item alignment

The grid uses three fixed-width columns and fixed-height rows inside a taller, wider container. That leaves free space around the tracks for `justify-content: space-evenly` and `align-content: center` to distribute.

The container's `justify-items: center` and `align-items: center` align each card within its own grid area. The highlighted card uses `justify-self: end` and `align-self: start` to override those defaults. These item properties do not move the tracks.

### Flexbox alignment, gaps, and auto margins

The toolbar uses `align-items: center` to align its children across the row's cross axis. Its `gap` keeps a minimum space between adjacent children. The account link's `margin-inline-start: auto` consumes positive free space before content distribution, moving it away from the preceding links.

### Flex line distribution

The chip field is narrow enough for its tags to wrap. Its minimum height creates extra cross-axis space, so `align-content: space-between` can distribute the flex lines. The two-value `gap` sets row spacing first and column spacing second.

### Shorthand and baseline alignment

The badge's container uses `place-items: center`, which is shorthand for `align-items: center` and `justify-items: center`. The price row uses `align-items: baseline`, so text baselines line up despite the different font sizes.

The media query changes the grid to two columns at narrow widths and removes the auto margin so the toolbar links can wrap without leaving the account link isolated at the row edge.

## Key points

- Content-alignment distributes Grid tracks or Flexbox lines inside a container.
- Item-alignment positions children within their available areas.
- Flexbox justify and align properties follow its main and cross axes.
- The place shorthands use align first and justify second.
- Gaps separate adjacent items and tracks, without adding outside spacing.
- A Flexbox auto margin can consume free space before `justify-content` distributes it.
- Baseline alignment follows text baselines rather than box edges.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [27 - CSS Grid Layout](../lessons/27-css-grid.md) | [Lesson](../lessons/28-alignment-and-gaps.md) | [Q&A](../qnas/28-alignment-and-gaps.md) | [29 - Multi-column Layout](../lessons/29-multi-column-layout.md) |
