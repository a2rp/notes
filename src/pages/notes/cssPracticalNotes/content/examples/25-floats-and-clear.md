# 25 - Floats and Clearing: Example

## Goal

See prose wrap beside floated images, compare clearing a following block with containing floats in a parent, and use Grid for a group of cards. This is a complete HTML page with its CSS included.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Floats and Clearing</title>
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
      line-height: 1.65;
    }

    body {
      width: min(100% - 2rem, 72rem);
      margin-inline: auto;
      padding-block: 2rem 4rem;
    }

    h1,
    h2,
    h3,
    p,
    figure {
      margin: 0;
    }

    h1 {
      margin-bottom: 0.5rem;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.1;
    }

    h2 {
      margin-bottom: 0.75rem;
      font-size: 1.45rem;
      line-height: 1.2;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
    }

    p + p {
      margin-block-start: 0.8rem;
    }

    .intro {
      max-width: 68ch;
      margin-block-end: 1.5rem;
      color: #475569;
      font-size: 1.1rem;
    }

    .section {
      margin-block: 1.5rem;
      padding: clamp(1rem, 3vw, 1.5rem);
      border: 1px solid #cbd5e1;
      border-radius: 0.8rem;
      background: #fff;
      box-shadow: 0 0.4rem 1.5rem rgb(15 23 42 / 6%);
    }

    .section-intro {
      margin-block-end: 1rem;
      color: #475569;
    }

    .story {
      display: flow-root;
      padding: 1rem;
      border: 1px solid #dbe3ef;
      border-radius: 0.65rem;
      background: #f8fafc;
    }

    .story + .story {
      margin-block-start: 1rem;
    }

    .story-figure {
      inline-size: min(42%, 15rem);
      margin-block-end: 0.7rem;
    }

    .story-figure--start {
      float: inline-start;
      margin-inline-end: 1rem;
    }

    .story-figure--end {
      float: inline-end;
      margin-inline-start: 1rem;
    }

    .landscape {
      display: grid;
      min-block-size: 9rem;
      place-items: end start;
      overflow: hidden;
      padding: 0.75rem;
      border-radius: 0.5rem;
      color: #fff;
      background:
        linear-gradient(140deg, transparent 48%, #335c67 49% 67%, transparent 68%),
        linear-gradient(35deg, transparent 42%, #6096a0 43% 65%, transparent 66%),
        linear-gradient(#93c5fd 0 55%, #dbeafe 55% 58%, #86a78b 58%);
    }

    .landscape span {
      padding: 0.2rem 0.45rem;
      border-radius: 0.3rem;
      background: rgb(15 23 42 / 72%);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.06em;
    }

    figcaption {
      margin-block-start: 0.35rem;
      color: #475569;
      font-size: 0.82rem;
    }

    .containment-demo {
      display: flow-root;
      padding: 1rem;
      border: 2px solid #0f766e;
      border-radius: 0.65rem;
      background: #f0fdfa;
    }

    .float-tile {
      float: inline-start;
      inline-size: 7.5rem;
      min-block-size: 5.5rem;
      margin-inline-end: 0.75rem;
      margin-block-end: 0.5rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      color: #fff;
      background: #0f766e;
      font-weight: 700;
    }

    .float-tile--second {
      float: inline-end;
      margin-inline: 0.75rem 0;
      background: #155e75;
    }

    .containment-demo p {
      color: #334155;
    }

    .clear-demo {
      display: flow-root;
      padding: 1rem;
      border: 1px solid #dbe3ef;
      border-radius: 0.65rem;
      background: #f8fafc;
    }

    .callout {
      float: inline-start;
      inline-size: min(36%, 11rem);
      min-block-size: 6rem;
      margin-inline-end: 1rem;
      margin-block-end: 0.75rem;
      padding: 0.85rem;
      border-radius: 0.5rem;
      color: #7c2d12;
      background: #ffedd5;
      font-weight: 700;
    }

    .clear-note {
      clear: both;
      margin-block-start: 1rem;
      padding: 0.75rem;
      border-inline-start: 4px solid #ea580c;
      background: #fff7ed;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
      gap: 0.9rem;
    }

    .card {
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.65rem;
      background: #f8fafc;
    }

    .card p {
      color: #475569;
    }

    .takeaway {
      padding-inline-start: 1.25rem;
    }

    .takeaway li + li {
      margin-block-start: 0.4rem;
    }

    @media (max-width: 38rem) {
      .story-figure,
      .story-figure--start,
      .story-figure--end {
        float: none;
        inline-size: 100%;
        margin-inline: 0;
      }

      .landscape {
        min-block-size: 12rem;
      }

      .callout {
        inline-size: 100%;
        min-block-size: auto;
      }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Floats and clearing</h1>
      <p class="intro">Floats let text flow beside a small image or callout. This page also shows why clearing a following block and containing a float in its parent are separate layout tasks.</p>
    </header>

    <section class="section" aria-labelledby="wrapping-title">
      <h2 id="wrapping-title">1. Let prose wrap around an image</h2>
      <p class="section-intro">The first figure floats to inline-start. The second floats to inline-end. Resize the page to see both figures return to normal flow on a narrow screen.</p>

      <article class="story">
        <figure class="story-figure story-figure--start">
          <div class="landscape" role="img" aria-label="A simple illustration of mountains beneath a blue sky">
            <span>INLINE START</span>
          </div>
          <figcaption>Floated to inline-start</figcaption>
        </figure>
        <h3>A route through the hills</h3>
        <p>The route begins beside a quiet lake and follows a narrow path toward the hills. The text in this paragraph wraps along the side of the floated illustration because the browser shortens line boxes that overlap the float. The figure's margin leaves space between the image and the words.</p>
        <p>When a line reaches the bottom of the figure, later lines use the full width of the article. A float does not make every block box wrap. It changes the available line space for inline content in the same block formatting context.</p>
      </article>

      <article class="story">
        <figure class="story-figure story-figure--end">
          <div class="landscape" role="img" aria-label="A simple illustration of a mountain trail beneath a blue sky">
            <span>INLINE END</span>
          </div>
          <figcaption>Floated to inline-end</figcaption>
        </figure>
        <h3>A note from the trail</h3>
        <p>This figure uses a logical float value, so it sits at the end side of the inline direction. The surrounding prose flows beside it. Its physical side changes with the writing direction of the article.</p>
        <p>Logical margins provide the gap on the correct side without separate left-to-right and right-to-left rules. The image and its caption stay together as one floated figure.</p>
      </article>
    </section>

    <section class="section" aria-labelledby="contain-title">
      <h2 id="contain-title">2. Contain floats in their parent</h2>
      <p class="section-intro">This wrapper has a border and a pale background. Its formatting context includes both floated tiles in the wrapper's height.</p>
      <div class="containment-demo">
        <div class="float-tile">Start-side float</div>
        <div class="float-tile float-tile--second">End-side float</div>
        <p>The wrapper uses display: flow-root. Its border surrounds the float boxes even though the tiles do not participate in ordinary block height calculation. Flow-root contains floats without clipping overflow or creating a scrolling area.</p>
      </div>
    </section>

    <section class="section" aria-labelledby="clear-title">
      <h2 id="clear-title">3. Move a following block below a float</h2>
      <p class="section-intro">The note uses clear: both. It begins below the earlier float. The clear rule does not contain that float in an ancestor.</p>
      <div class="clear-demo">
        <aside class="callout">A floated callout</aside>
        <p>Inline text wraps beside the callout and continues below it. The float is useful here because the paragraph should flow through the space beside the callout rather than occupy a separate fixed column.</p>
        <p>The next note must begin after the callout. Its clear declaration moves it below the relevant earlier floats in this same block formatting context.</p>
        <p class="clear-note">This note clears both sides, so its top edge starts below the preceding float.</p>
      </div>
    </section>

    <section class="section" aria-labelledby="grid-title">
      <h2 id="grid-title">4. Use Grid for a group of cards</h2>
      <p class="section-intro">A collection of related cards is a layout problem. Grid expresses its columns and gap directly.</p>
      <div class="card-grid">
        <article class="card">
          <h3>Plan</h3>
          <p>Choose a route and estimate the time.</p>
        </article>
        <article class="card">
          <h3>Pack</h3>
          <p>Bring water, a map, and suitable shoes.</p>
        </article>
        <article class="card">
          <h3>Walk</h3>
          <p>Follow the marked path and enjoy the view.</p>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="summary-title">
      <h2 id="summary-title">What to notice</h2>
      <ul class="takeaway">
        <li>Text wraps beside the two floated figures, then uses the full line width below them.</li>
        <li>The flow-root wrapper includes its floated tiles in its visible border and height.</li>
        <li>The clear note moves below the callout. It does not change the parent wrapper height rule.</li>
        <li>The responsive rule removes the floats on a narrow screen so the figures can use the full width.</li>
        <li>The cards use Grid instead of floats because they form a responsive layout.</li>
      </ul>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

The page has a light background and four bordered sections. In the first section, one illustration sits at the inline-start side of its article and another at inline-end. Paragraph text wraps beside each figure and returns to the full line width after reaching the figure's bottom.

The second section has a teal bordered wrapper around two floated tiles. The wrapper includes both floats in its height because it uses display: flow-root. In the third section, the orange note begins below the floated callout because it uses clear: both. The last section shows three cards in a responsive grid.

When the viewport is narrower than 38rem, the floated figures stop floating and become full width. The callout also becomes full width. The paragraphs then begin below those items.

## Explanation

The figures use float: inline-start and float: inline-end. These values place them at the start or end side of the inline direction. Their logical margins create a gap between the figure and surrounding text. Each figure has an inline size and an image-like illustration made from CSS gradients, so the example does not depend on an external asset.

The wrapper in section 2 uses display: flow-root. That establishes a block formatting context and makes the wrapper contain its floated children. This is different from clearing a following element.

The callout in section 3 is also floated. The final note uses clear: both to move below earlier left and right floats in the same block formatting context. The clear-demo wrapper uses flow-root to contain the callout, so its border still encloses the float. The note's clear declaration controls the note position.

The card collection uses CSS Grid. Floats can wrap inline prose around a box, but they do not provide responsive card columns with explicit gaps and tracks.

The media query removes the floats on narrow screens. This keeps the text from being squeezed into a very narrow column. The illustration uses role and an accessible label because it is generated with CSS rather than supplied as a content image.

## Key points

- Floated figures let inline text wrap beside their margin boxes.
- Logical float values follow the inline direction.
- A block formatting context, here created with flow-root, contains floats in a parent.
- clear moves a following block below earlier relevant floats.
- Flexbox or Grid is a better fit for component and page layout.
- Remove or reduce floats when narrow screens make adjacent text hard to read.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [24 - Overflow and Scrolling](24-overflow-and-scrolling.md) | [Lesson](../lessons/25-floats-and-clear.md) | [Q&A](../qnas/25-floats-and-clear.md) | [26 - Flexbox Layout](26-flexbox.md) |
