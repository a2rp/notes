# 22 - Positioning Elements: Example

## Goal

Compare normal flow, relative positioning, an absolute badge, a sticky heading inside a scroll area, and a fixed page control. The page is a complete HTML document with its CSS included.

Copy the complete HTML into a file named \`index.html\` and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Positioning Elements</title>
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
      padding-block: 2rem 7rem;
    }

    h1,
    h2,
    h3,
    p {
      margin: 0;
    }

    h1 {
      margin-bottom: 0.5rem;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.1;
    }

    h2 {
      margin-bottom: 0.75rem;
      font-size: 1.5rem;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    p + p {
      margin-top: 0.75rem;
    }

    .intro {
      max-width: 62ch;
      margin-bottom: 2rem;
      color: #475569;
      font-size: 1.1rem;
    }

    .demo-section {
      margin-block: 2rem;
      padding: 1.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #fff;
      box-shadow: 0 0.4rem 1.5rem rgb(15 23 42 / 6%);
    }

    .demo-section > p {
      margin-bottom: 1rem;
      color: #475569;
    }

    .two-column {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .sample {
      min-width: 0;
      padding: 1rem;
      border: 1px dashed #94a3b8;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .flow-item {
      padding: 0.75rem;
      border-radius: 0.4rem;
      background: #dbeafe;
    }

    .flow-item + .flow-item {
      margin-top: 0.75rem;
    }

    .relative-item {
      position: relative;
      inset-block-start: 0.5rem;
      inset-inline-start: 1rem;
      border: 2px solid #1d4ed8;
      background: #bfdbfe;
    }

    .flow-note {
      margin-top: 1.25rem;
      color: #475569;
      font-size: 0.9rem;
    }

    .card {
      position: relative;
      min-height: 13rem;
      padding: 1.25rem;
      border: 1px solid #bae6fd;
      border-radius: 0.75rem;
      background: linear-gradient(135deg, #ecfeff, #eff6ff);
    }

    .card h3 {
      max-width: 25rem;
      padding-inline-end: 5rem;
      color: #0f172a;
    }

    .badge {
      position: absolute;
      inset-block-start: 1rem;
      inset-inline-end: 1rem;
      padding: 0.35rem 0.65rem;
      border-radius: 999px;
      background: #0f766e;
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .card-content {
      max-width: 44rem;
      color: #334155;
    }

    .scroll-demo {
      height: 17rem;
      overflow: auto;
      border: 1px solid #94a3b8;
      border-radius: 0.5rem;
      background: #f8fafc;
      scrollbar-color: #64748b #e2e8f0;
    }

    .sticky-heading {
      position: sticky;
      inset-block-start: 0;
      z-index: 1;
      padding: 0.8rem 1rem;
      border-block-end: 1px solid #94a3b8;
      background: #dbeafe;
      color: #1e3a8a;
    }

    .scroll-content {
      padding: 1rem;
    }

    .scroll-content p {
      max-width: 65ch;
    }

    .scroll-content p + p {
      margin-top: 1.25rem;
    }

    .fixed-control {
      position: fixed;
      inset-block-end: 1rem;
      inset-inline-end: 1rem;
      z-index: 2;
      display: inline-block;
      padding: 0.75rem 1rem;
      border: 2px solid #fff;
      border-radius: 999px;
      background: #1d4ed8;
      box-shadow: 0 0.25rem 1rem rgb(15 23 42 / 25%);
      color: #fff;
      font-weight: 700;
      text-decoration: none;
    }

    .fixed-control:hover {
      background: #1e40af;
    }

    .notes {
      margin-top: 2rem;
      padding: 1rem;
      border-inline-start: 4px solid #0f766e;
      background: #ecfeff;
    }

    .notes h2 {
      font-size: 1.25rem;
    }

    @media (max-width: 42rem) {
      .two-column {
        grid-template-columns: 1fr;
      }

      .demo-section {
        padding: 1rem;
      }

      .fixed-control {
        inset-inline-end: 0.75rem;
        inset-block-end: 0.75rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Positioning Elements</h1>
    <p class="intro">
      Scroll the page and the small panel below. Compare which boxes keep their
      normal-flow space, which boxes overlap, and which boxes stick to a scroll area.
    </p>
  </header>

  <main>
    <section class="demo-section" aria-labelledby="flow-title">
      <h2 id="flow-title">1. Normal flow and relative positioning</h2>
      <p>
        The first sample uses normal flow. In the second sample, the middle box is
        shifted, but the space where it was placed remains reserved.
      </p>

      <div class="two-column">
        <div class="sample">
          <h3>Normal flow</h3>
          <div class="flow-item">First box</div>
          <div class="flow-item">Second box</div>
          <div class="flow-item">Third box</div>
        </div>

        <div class="sample">
          <h3>Relative offset</h3>
          <div class="flow-item">First box</div>
          <div class="flow-item relative-item">Shifted second box</div>
          <div class="flow-item">Third box</div>
          <p class="flow-note">
            The third box follows the second box's original layout position.
          </p>
        </div>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="absolute-title">
      <h2 id="absolute-title">2. An absolute badge inside its card</h2>
      <p>
        The card establishes a local containing block. The badge is placed at the
        card's logical block-start and inline-end edges.
      </p>

      <article class="card">
        <span class="badge">NEW</span>
        <h3>Positioned relative to this card</h3>
        <div class="card-content">
          <p>
            The badge is absolutely positioned, so it does not take up normal-flow
            space. The heading has extra space at the inline end to keep its text
            from running underneath the badge.
          </p>
          <p>
            Resize the page to see the logical inset properties follow the writing
            direction instead of naming fixed physical sides.
          </p>
        </div>
      </article>
    </section>

    <section class="demo-section" aria-labelledby="sticky-title">
      <h2 id="sticky-title">3. A sticky heading in a scroll container</h2>
      <p>
        Scroll inside this panel. Its heading sticks to the top of this panel's
        scrollport and stops at the panel boundary.
      </p>

      <div class="scroll-demo" tabindex="0" aria-label="Scrollable sticky heading demonstration">
        <h3 class="sticky-heading">Sticky within this scroll panel</h3>
        <div class="scroll-content">
          <p>
            This panel has a fixed height and scrolls independently from the page.
            The heading uses <code>position: sticky</code> and
            <code>inset-block-start: 0</code>, which gives it a sticking threshold.
          </p>
          <p>
            Sticky positioning keeps the heading's normal-flow space. As this panel
            scrolls, the heading shifts to remain visible at the start edge of the
            scrollport.
          </p>
          <p>
            The sticky box is still limited by its containing block. It does not
            stay pinned after the panel that contains it ends.
          </p>
          <p>
            Ancestor overflow matters. If another ancestor becomes the nearest
            scroll container, sticky positioning follows that ancestor's scrollport.
          </p>
          <p>
            Continue scrolling to the end of the panel. The heading remains at the
            top while this content moves underneath it.
          </p>
        </div>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="fixed-title">
      <h2 id="fixed-title">4. A fixed page control</h2>
      <p>
        Scroll the whole page. The blue control stays at the end corner of the
        viewport because it is fixed to its fixed-position containing block.
      </p>
      <p>
        Fixed controls can cover content. The bottom padding on this document leaves
        room to reach the final notes, including on a narrow screen.
      </p>
    </section>

    <section class="notes" id="fixed-control-notes" aria-labelledby="notes-title">
      <h2 id="notes-title">Expected observations</h2>
      <p>
        The relative box moves visually while its original space remains. The badge
        is positioned against its card and does not reserve flow space. The sticky
        heading follows the scrollport inside its panel. The blue fixed control
        stays in the viewport as the document scrolls.
      </p>
    </section>
  </main>

  <a class="fixed-control" href="#fixed-control-notes">Jump to notes</a>
</body>
</html>
~~~

## Expected output

- A light page with four numbered demonstrations.
- In the relative-positioning sample, the second blue box appears slightly down and to the right. The third box stays below its original position instead of moving up into the gap.
- A teal \`NEW\` badge sits in the card's upper inline-end corner. It is placed against the card and does not create a row of its own.
- The sticky heading stays at the top while the content inside the bordered panel scrolls. It stops when the panel's scroll area ends.
- A blue \`Jump to notes\` link remains in the viewport's lower inline-end corner while the document scrolls. Selecting it moves to the final notes.

## Explanation

The relative sample uses \`inset-block-start\` and \`inset-inline-start\`. These logical insets shift the rendered box while preserving the position's original flow space.

The card has \`position: relative\`, so it establishes a local containing block. Its badge uses \`position: absolute\` and logical insets to attach to the card's block-start and inline-end. Since the badge is out of flow, the heading uses padding to avoid the overlap.

The scroll panel has a fixed height and \`overflow: auto\`. Its heading is sticky with a non-auto block-start inset. The panel therefore supplies the scrollport for this demonstration, and the panel bounds where the heading can stick.

The page control uses fixed positioning and logical end insets. In this document no ancestor establishes another fixed-position containing block, so it remains near the viewport corner. The document's bottom padding keeps the control from covering the final content.

## Key points

- Relative positioning shifts a box but keeps its original flow space.
- Absolute positioning takes a box out of flow and uses a containing block.
- A relative component wrapper is a common containing-block anchor for an absolute child.
- Sticky positioning needs an inset threshold and follows a scrollport within its containing block.
- Fixed positioning is usually viewport-relative, unless an ancestor establishes its containing block.
- Logical insets adapt to the current writing mode and direction.
- Leave room for content that could be covered by an overlay or fixed control.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [21 - Normal Flow and Formatting Contexts](21-normal-flow-and-formatting-contexts.md) | [Lesson](../lessons/22-positioning.md) | [Q&A](../qnas/22-positioning.md) | [23 - Z-index and Stacking Contexts](23-z-index-and-stacking-contexts.md) |
