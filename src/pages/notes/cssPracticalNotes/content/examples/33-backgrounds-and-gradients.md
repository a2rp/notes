# 33 - Backgrounds and Gradients - Example

This example builds a small "background lab" page. It uses CSS-generated gradients, so it needs no image files or external assets. The HTML is shown as code for you to copy; the expected appearance is described below.

## Question

Create a responsive page that demonstrates:

- A hero with several background layers and readable text.
- A solid background color as a fallback.
- Linear, radial, conic, and repeating gradients.
- Labels in HTML so each decorative swatch is understandable without relying on color alone.

## Complete HTML

Copy the complete code into an HTML file and open that file in a browser to see the page.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Background and Gradient Lab</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      min-width: 320px;
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      color: #eaf1f8;
      background-color: #0b1220;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
    }

    .page {
      width: min(100%, 1050px);
      margin-inline: auto;
    }

    .eyebrow {
      margin-bottom: 0.5rem;
      color: #9fb8d2;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    h1,
    h2,
    h3 {
      line-height: 1.2;
    }

    .hero {
      display: grid;
      min-height: 340px;
      align-content: end;
      gap: 1rem;
      padding: clamp(1.5rem, 5vw, 3.5rem);
      overflow: hidden;
      border: 1px solid rgb(255 255 255 / 15%);
      border-radius: 1.5rem;
      background-color: #15314a;
      background-image:
        linear-gradient(
          100deg,
          rgb(7 22 41 / 98%) 0%,
          rgb(7 22 41 / 84%) 52%,
          rgb(7 22 41 / 25%) 100%
        ),
        radial-gradient(
          circle at 82% 25%,
          #ffc857 0,
          rgb(255 200 87 / 45%) 3rem,
          transparent 16rem
        ),
        linear-gradient(135deg, #0f766e, #17324d);
      background-repeat: no-repeat, no-repeat, no-repeat;
      background-position: center, 82% 25%, center;
      background-size: cover, cover, cover;
    }

    .hero__content {
      max-width: 42rem;
    }

    .hero h1 {
      max-width: 12ch;
      margin-bottom: 1rem;
      color: #fff;
      font-size: clamp(2.25rem, 7vw, 4.75rem);
      letter-spacing: -0.04em;
    }

    .hero__description {
      max-width: 38rem;
      color: #e0eaf5;
      font-size: clamp(1rem, 2vw, 1.15rem);
    }

    .hero__button {
      display: inline-block;
      margin-top: 0.5rem;
      padding: 0.75rem 1rem;
      border: 1px solid rgb(255 255 255 / 30%);
      border-radius: 0.6rem;
      color: #071629;
      background-color: #ffc857;
      font-weight: 700;
      text-decoration: none;
    }

    .hero__button:hover {
      background-color: #ffda85;
    }

    .section {
      margin-top: 3rem;
    }

    .section__intro {
      max-width: 42rem;
      margin-top: 0.6rem;
      color: #b9c7d8;
    }

    .swatch-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      margin-top: 1.25rem;
    }

    .swatch-card {
      min-width: 0;
      padding: 0.85rem;
      border: 1px solid #29384d;
      border-radius: 1rem;
      background-color: #111c2c;
    }

    .swatch {
      min-height: 150px;
      border-radius: 0.65rem;
      background-color: #25364d;
    }

    .swatch--linear {
      background-image: linear-gradient(
        115deg,
        #0f766e,
        #2dd4bf 50%,
        #d9f99d
      );
    }

    .swatch--radial {
      background-image: radial-gradient(
        circle at 35% 35%,
        #fff3b0 0 4%,
        #f9a03f 25%,
        #9b287b 65%,
        #182848 100%
      );
    }

    .swatch--conic {
      background-image: conic-gradient(
        from 0deg,
        #ef476f,
        #ffd166,
        #06d6a0,
        #118ab2,
        #6c63ff,
        #ef476f
      );
    }

    .swatch--pattern {
      background-image: repeating-linear-gradient(
        135deg,
        #dbeafe 0 12px,
        #2563eb 12px 16px
      );
    }

    .swatch-card h3 {
      margin-top: 0.75rem;
      color: #fff;
      font-size: 1rem;
    }

    .swatch-card p {
      margin-top: 0.25rem;
      color: #b9c7d8;
      font-size: 0.9rem;
    }

    .notes {
      display: grid;
      gap: 1rem;
      margin-top: 3rem;
      padding: 1.25rem;
      border: 1px solid #29384d;
      border-radius: 1rem;
      background-color: #111c2c;
    }

    .notes h2 {
      font-size: 1.35rem;
    }

    .notes ul {
      display: grid;
      gap: 0.45rem;
      padding-inline-start: 1.25rem;
      color: #c9d5e3;
    }

    code {
      padding: 0.1rem 0.3rem;
      border-radius: 0.3rem;
      color: #d9f99d;
      background-color: #1c2a3e;
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.92em;
    }

    @media (max-width: 600px) {
      .swatch-grid {
        grid-template-columns: 1fr;
      }

      .swatch {
        min-height: 180px;
      }

      .hero {
        min-height: 390px;
        background-position: center, 75% 15%, center;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="hero">
      <div class="hero__content">
        <p class="eyebrow">CSS visual guide</p>
        <h1>Build depth with backgrounds</h1>
        <p class="hero__description">
          Layer color and gradients to create atmosphere while keeping the
          message readable and the content in the HTML.
        </p>
        <a class="hero__button" href="#gradient-types">Explore gradients</a>
      </div>
    </header>

    <section class="section" id="gradient-types" aria-labelledby="gradient-heading">
      <p class="eyebrow">Four generated images</p>
      <h2 id="gradient-heading">Gradient types</h2>
      <p class="section__intro">
        Each swatch is decorative. Its heading and description are ordinary
        HTML text, so the type of gradient is not communicated by color alone.
      </p>

      <div class="swatch-grid">
        <article class="swatch-card">
          <div class="swatch swatch--linear" aria-hidden="true"></div>
          <h3>Linear</h3>
          <p>Color blends along a line from one side toward another.</p>
        </article>

        <article class="swatch-card">
          <div class="swatch swatch--radial" aria-hidden="true"></div>
          <h3>Radial</h3>
          <p>Color spreads outward from a chosen center point.</p>
        </article>

        <article class="swatch-card">
          <div class="swatch swatch--conic" aria-hidden="true"></div>
          <h3>Conic</h3>
          <p>Color stops sweep around the center of the box.</p>
        </article>

        <article class="swatch-card">
          <div class="swatch swatch--pattern" aria-hidden="true"></div>
          <h3>Repeating</h3>
          <p>A repeating linear gradient creates a stripe pattern.</p>
        </article>
      </div>
    </section>

    <aside class="notes" aria-labelledby="notes-heading">
      <h2 id="notes-heading">What to notice</h2>
      <ul>
        <li>The hero's first background layer is the translucent dark overlay.</li>
        <li>The warm radial glow and teal gradient are painted behind that overlay.</li>
        <li>The solid hero color remains beneath every image layer.</li>
        <li>The headings and descriptions remain readable HTML content.</li>
        <li>The grid becomes one column on a narrow screen.</li>
      </ul>
    </aside>
  </main>
</body>
</html>
~~~

## Explanation

### The hero layers

The hero uses three comma-separated image layers:

1. A translucent dark linear gradient, listed first so it sits closest to the viewer.
2. A radial highlight placed toward the upper-right.
3. A teal-to-navy linear gradient behind both.

The hero also sets `background-color`. That color is painted below the image layers as a fallback. The repeated values in `background-repeat`, `background-position`, and `background-size` match the three layers in order.

The overlay darkens the background behind the white heading. Its transparent end lets some of the radial highlight and base gradient show through. The heading and paragraph are still real HTML content.

### The gradient cards

Each card uses one gradient type as its background image:

- `linear-gradient()` transitions along an angled line.
- `radial-gradient()` spreads from an offset center.
- `conic-gradient()` sweeps around a center point.
- `repeating-linear-gradient()` repeats stop intervals to draw stripes.

The visible labels are text in the HTML. The gradient is only decorative.

### The responsive layout

The cards use two equal grid columns on wider screens. Below 600 pixels they become a single column, and the hero glow moves slightly to keep it visible. The page has a minimum width for very narrow screens, but the text and cards can wrap naturally.

## Expected output

The page has a dark navy background and a wide, rounded hero panel. The hero's left side is dark enough for a large white heading, paragraph, and gold button. A warm circular glow is visible toward the right, with teal and navy color behind it.

Below the hero is a "Gradient types" heading and four dark cards in a two-column grid. Their swatches show a teal linear blend, a warm radial glow, a circular sweep of colors, and diagonal blue stripes. On a narrow screen, the four cards stack in one column.

The markdown displays the HTML as a code block. The appearance described here is what you should see after copying the code into an HTML file and opening it in a browser.

## Try it yourself

1. Change the first hero layer's opacity and compare the heading contrast.
2. Change the radial layer's position from `82% 25%` to `50% 50%`.
3. Replace the hero's final gradient with a local image URL and keep the solid fallback.
4. Change the linear swatch's direction from `115deg` to `to right`.
5. Change the repeating gradient's stop distances to make narrower stripes.
6. Temporarily remove `background-color` from the hero and consider what could happen if an image layer fails in a version that uses a photo.

## Key points

- Background layers are ordered from the topmost image to the image behind it.
- The solid background color is underneath the image layers.
- Gradients are CSS-generated images, and labels remain HTML content.
- A translucent overlay can improve text contrast over a decorative background.
- Check backgrounds at narrow widths and keep important content readable.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [32 - Logical properties and writing modes](../lessons/32-logical-properties-and-writing-modes.md) | [Lesson](../lessons/33-backgrounds-and-gradients.md) | [Q&A](../qnas/33-backgrounds-and-gradients.md) | [34 - Fonts and typography](../lessons/34-fonts-and-typography.md) |
