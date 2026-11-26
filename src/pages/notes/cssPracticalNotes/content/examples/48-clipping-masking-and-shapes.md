# 48 - Clipping, masks, and shapes

This complete HTML page compares CSS clipping, an alpha mask, and text wrapping around a float shape. It uses CSS-made artwork rather than external images.

## Question

How can clipping, masking, and text wrapping be demonstrated so their different effects are easy to see?

## Complete example

Save the code as an HTML file and open it in a browser. Compare the artwork tiles, then read the article section and see how text flows around its floated shape.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS clipping, masks, and shapes</title>
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
      color: #1d2939;
      background: #f1f5f9;
    }

    body {
      padding: clamp(1rem, 4vw, 3rem);
      line-height: 1.65;
    }

    main {
      width: min(100%, 68rem);
      margin-inline: auto;
    }

    h1,
    h2,
    h3 {
      line-height: 1.2;
    }

    h1 {
      margin-bottom: 0.75rem;
      font-size: clamp(2rem, 5vw, 3rem);
    }

    h2 {
      margin-bottom: 0.55rem;
      font-size: 1.4rem;
    }

    p {
      max-width: 70ch;
    }

    .intro,
    .section-intro {
      color: #475569;
    }

    .section {
      margin-top: 2.5rem;
    }

    .section-intro {
      margin-bottom: 1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      gap: 1rem;
    }

    .card {
      overflow: hidden;
      border: 1px solid #cbd5e1;
      border-radius: 0.9rem;
      background: white;
      box-shadow: 0 0.4rem 1.2rem rgb(15 23 42 / 0.08);
    }

    .card-body {
      padding: 1rem;
    }

    .card h3 {
      margin-bottom: 0.35rem;
    }

    .card p {
      color: #475569;
      font-size: 0.95rem;
    }

    .artwork {
      position: relative;
      min-height: 12rem;
      overflow: hidden;
      background:
        radial-gradient(circle at 20% 25%, #ffe082 0 1rem, transparent 1.1rem),
        radial-gradient(circle at 72% 35%, #ef476f 0 3rem, transparent 3.1rem),
        linear-gradient(145deg, #168aad, #4361ee 55%, #7209b7);
    }

    .artwork::before,
    .artwork::after {
      position: absolute;
      content: "";
    }

    .artwork::before {
      right: -1rem;
      bottom: -3rem;
      left: -1rem;
      height: 7rem;
      border-radius: 50%;
      background: #14324a;
      transform: rotate(-8deg);
    }

    .artwork::after {
      top: 55%;
      left: 38%;
      width: 4rem;
      height: 4rem;
      border: 0.35rem solid white;
      border-radius: 50%;
      background: #06d6a0;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 0.25);
    }

    .clip-circle {
      clip-path: circle(48% at 50% 50%);
    }

    .clip-polygon {
      clip-path: polygon(0 0, 100% 0, 100% 76%, 55% 100%, 0 78%);
    }

    .mask-fade {
      mask-image: linear-gradient(to right, #000 55%, transparent 100%);
      mask-repeat: no-repeat;
      mask-size: 100% 100%;
    }

    .float-article {
      padding: clamp(1rem, 3vw, 1.5rem);
      border: 1px solid #cbd5e1;
      border-radius: 0.9rem;
      background: white;
    }

    .float-art {
      float: left;
      width: min(38vw, 11rem);
      aspect-ratio: 1;
      margin: 0.35rem 1.2rem 0.8rem 0;
      border: 0.25rem solid white;
      border-radius: 50%;
      background:
        radial-gradient(circle at 35% 30%, #fff3b0 0 0.6rem, transparent 0.7rem),
        linear-gradient(145deg, #1b9aaa, #3a0ca3 58%, #f72585);
      box-shadow: 0 0.35rem 1rem rgb(15 23 42 / 0.2);
      clip-path: circle(48%);
    }

    @supports (clip-path: circle(45%)) {
      .clip-circle {
        clip-path: circle(48% at 50% 50%);
      }

      .clip-polygon {
        clip-path: polygon(0 0, 100% 0, 100% 76%, 55% 100%, 0 78%);
      }
    }

    @supports (mask-image: linear-gradient(to right, black, transparent)) {
      .mask-fade {
        mask-image: linear-gradient(to right, #000 55%, transparent 100%);
      }
    }

    @supports (shape-outside: circle(50%)) {
      .float-art {
        shape-outside: circle(50%);
        shape-margin: 0.35rem;
      }
    }

    .clear {
      clear: both;
    }

    .note {
      margin-top: 1rem;
      padding: 1rem;
      border-left: 0.3rem solid #4361ee;
      background: #e8edff;
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Clipping, masks, and shapes</h1>
      <p class="intro">The first examples change which pixels are visible. The article example changes how text wraps next to a float.</p>
    </header>

    <section class="section" aria-labelledby="visual-title">
      <h2 id="visual-title">Compare clipping and masking</h2>
      <p class="section-intro">The artwork stays the same size in layout. Only the visible paint changes.</p>

      <div class="grid">
        <article class="card">
          <div class="artwork" aria-hidden="true"></div>
          <div class="card-body">
            <h3>Unclipped artwork</h3>
            <p>The complete rectangular box is visible.</p>
          </div>
        </article>

        <article class="card">
          <div class="artwork clip-circle" aria-hidden="true"></div>
          <div class="card-body">
            <h3>Circular clip</h3>
            <p><code>clip-path</code> hides paint outside a sharp circle.</p>
          </div>
        </article>

        <article class="card">
          <div class="artwork clip-polygon" aria-hidden="true"></div>
          <div class="card-body">
            <h3>Polygon clip</h3>
            <p>The polygon points define an angled visible boundary.</p>
          </div>
        </article>

        <article class="card">
          <div class="artwork mask-fade" aria-hidden="true"></div>
          <div class="card-body">
            <h3>Fading mask</h3>
            <p>The alpha gradient gradually hides the right side.</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="wrap-title">
      <h2 id="wrap-title">Wrap text around a float shape</h2>
      <p class="section-intro">The image is clipped to a circle, and the paragraph uses a circular float area when the shape feature is supported.</p>

      <article class="float-article">
        <div class="float-art" role="img" aria-label="Decorative gradient circle"></div>
        <h3>A shaped float changes text flow</h3>
        <p>CSS Shapes can define a float area that follows a basic shape instead of the float's full rectangular box. As the text reaches the circular artwork, the line endings follow its edge. The next lines become wider as the circle gets narrower.</p>
        <p>The visible circle and the wrapping circle are separate effects. The border radius and clip path make the artwork look round. The shape outside declaration changes the area that inline text avoids.</p>
        <p>Extra space around the shape keeps the letters away from the artwork. If the shape feature is unavailable, the text still wraps around the normal rectangular float area and the paragraph remains readable.</p>
        <div class="clear"></div>
      </article>
    </section>

    <aside class="note">
      <p><strong>Try this:</strong> Change the circle to a polygon, move the mask fade to the left, or remove the shape rule inside its feature query. The visual crop and text flow should remain distinguishable.</p>
    </aside>
  </main>
</body>
</html>
~~~

## Explanation

- The first tile provides the unmodified CSS artwork for comparison.
- The circle and polygon tiles use `clip-path`. Their visible boundaries are sharp, but the artwork boxes keep their original dimensions.
- The fading tile uses a CSS gradient mask. Its alpha transitions from opaque to transparent, so the artwork gradually disappears toward the right.
- The final section floats a CSS-made circle beside paragraphs. `shape-outside` changes the float area so line wrapping follows a circle when supported.
- `shape-margin` adds a little distance between the circular flow boundary and the text.
- `clip-path` and `shape-outside` are both used on the float, but they do different jobs. The first crops visible paint; the second changes text flow.
- The decorative gradient artwork is given an accessible image description in the article and hidden from assistive technology when repeated only for visual comparison.
- Feature queries enhance the clip, mask, and float shape. The unmodified artwork, ordinary float, and text remain available as fallbacks.

## Expected output

The page shows four colorful artwork tiles: a rectangular original, a circular crop, an angled polygon crop, and an artwork that fades toward the right. Their layout cards remain rectangular and the captions remain fully visible. Below them, a circular decorative float sits beside an article. Text follows the circular edge in browsers that support the shape feature. In a browser without that feature, the paragraph wraps around the ordinary rectangular float instead. The meaning of the text remains available either way.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [47 - Filters, blending, and opacity](47-filters-blending-and-opacity.md) | [Lesson](../lessons/48-clipping-masking-and-shapes.md) | [Q&A](../qnas/48-clipping-masking-and-shapes.md) | [49 - CSS nesting](49-css-nesting.md) |
