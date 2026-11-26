# 34 - Fonts and Typography - Example

This example creates a responsive typography specimen page. It compares sans-serif, serif, and monospace stacks, and demonstrates a flexible heading size, line height, reading width, weights, and text transformation. It uses system fonts, so it does not depend on an external service or font file.

## Question

Build a page that shows how font choices and text settings change the reading experience. Keep the actual content in HTML, provide font fallbacks, and make the layout adapt to a narrow screen.

## Complete HTML

Copy this code into an HTML file and open it in a browser to see the page.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Fonts and Typography</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      font-size: 100%;
      color-scheme: light;
      --ink: #1d2939;
      --muted: #596579;
      --paper: #f4f1ea;
      --surface: #fffdf8;
      --line: #ded8cc;
      --accent: #145c54;
      --serif: Georgia, "Times New Roman", serif;
      --sans: system-ui, -apple-system, "Segoe UI", sans-serif;
      --mono: Consolas, "Courier New", monospace;
    }

    body {
      min-width: 320px;
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      color: var(--ink);
      background-color: var(--paper);
      font-family: var(--sans);
      font-size: 1rem;
      line-height: 1.6;
    }

    a {
      color: inherit;
    }

    .page {
      width: min(100%, 1080px);
      margin-inline: auto;
    }

    .hero {
      padding: clamp(1.5rem, 5vw, 4rem);
      border-radius: 1.5rem;
      color: #fffdf8;
      background-color: #173d39;
    }

    .eyebrow {
      color: #9bd4c4;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .hero h1 {
      max-width: 14ch;
      margin-top: 0.75rem;
      font-family: var(--serif);
      font-size: clamp(2.5rem, 7vw, 5rem);
      font-weight: 400;
      line-height: 1.05;
      letter-spacing: -0.035em;
    }

    .hero__copy {
      max-width: 58ch;
      margin-top: 1rem;
      color: #e4eee9;
      font-size: clamp(1rem, 2vw, 1.2rem);
    }

    .hero__link {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.7rem 1rem;
      border: 1px solid #b7dbce;
      border-radius: 0.5rem;
      color: #fffdf8;
      font-weight: 700;
      text-decoration-thickness: 0.08em;
      text-underline-offset: 0.2em;
    }

    .section {
      margin-top: 3rem;
    }

    .section h2 {
      font-size: clamp(1.6rem, 3vw, 2.25rem);
      line-height: 1.2;
    }

    .section__intro {
      max-width: 68ch;
      margin-top: 0.6rem;
      color: var(--muted);
    }

    .specimen-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      margin-top: 1.25rem;
    }

    .specimen {
      min-width: 0;
      padding: clamp(1.1rem, 3vw, 1.75rem);
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
    }

    .specimen__label {
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .specimen h3 {
      margin-top: 0.55rem;
      font-size: 1.35rem;
      line-height: 1.25;
    }

    .specimen__sample {
      margin-top: 0.85rem;
      color: #354154;
    }

    .specimen--serif .specimen__sample {
      font-family: var(--serif);
      font-size: 1.15rem;
      line-height: 1.7;
    }

    .specimen--mono .specimen__sample {
      font-family: var(--mono);
      font-size: 0.95rem;
      line-height: 1.65;
    }

    .specimen--weight .specimen__sample {
      display: grid;
      gap: 0.35rem;
    }

    .weight-regular {
      font-weight: 400;
    }

    .weight-medium {
      font-weight: 600;
    }

    .weight-bold {
      font-weight: 700;
    }

    .specimen--label .specimen__sample {
      color: #3e4c5e;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.13em;
      text-transform: uppercase;
    }

    .reading-card {
      display: grid;
      gap: 1rem;
      margin-top: 1.25rem;
      padding: clamp(1.25rem, 4vw, 2rem);
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
    }

    .reading-card h3 {
      font-family: var(--serif);
      font-size: 1.6rem;
      line-height: 1.2;
    }

    .reading-card p {
      max-width: 65ch;
      color: #354154;
      line-height: 1.7;
    }

    .price-list {
      display: grid;
      gap: 0.5rem;
      width: min(100%, 26rem);
      margin-top: 0.5rem;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid var(--line);
    }

    .price-row span:last-child {
      font-variant-numeric: tabular-nums;
      font-weight: 700;
    }

    .closing-note {
      margin-top: 2rem;
      color: var(--muted);
      font-size: 0.9rem;
    }

    @media (max-width: 640px) {
      .specimen-grid {
        grid-template-columns: 1fr;
      }

      .hero h1 {
        max-width: 11ch;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">A CSS specimen page</p>
      <h1>Good typography makes room for reading</h1>
      <p class="hero__copy">
        Font family, size, weight, and line spacing work together. A useful
        fallback stack keeps the page readable if a preferred font is not
        available.
      </p>
      <a class="hero__link" href="#specimens">Compare the specimens</a>
    </header>

    <section class="section" id="specimens" aria-labelledby="specimen-heading">
      <h2 id="specimen-heading">Three font voices</h2>
      <p class="section__intro">
        These samples use common font categories. The exact typeface can vary
        by computer, but the generic family at the end gives the browser a
        useful fallback.
      </p>

      <div class="specimen-grid">
        <article class="specimen">
          <p class="specimen__label">Sans-serif stack</p>
          <h3>Clear interface text</h3>
          <p class="specimen__sample">
            This sample uses the system interface font, followed by safe
            sans-serif fallbacks.
          </p>
        </article>

        <article class="specimen specimen--serif">
          <p class="specimen__label">Serif stack</p>
          <h3>Long-form reading</h3>
          <p class="specimen__sample">
            A serif family gives this paragraph a different texture while
            keeping the words and their meaning in the HTML.
          </p>
        </article>

        <article class="specimen specimen--mono">
          <p class="specimen__label">Monospace stack</p>
          <h3>Aligned characters</h3>
          <p class="specimen__sample">
            const title = "Typography";<br>
            const size = "1rem";<br>
            const readable = true;
          </p>
        </article>

        <article class="specimen specimen--weight">
          <p class="specimen__label">Font weight</p>
          <h3>Use weight with purpose</h3>
          <div class="specimen__sample">
            <p class="weight-regular">Regular weight, 400</p>
            <p class="weight-medium">Medium weight, 600</p>
            <p class="weight-bold">Bold weight, 700</p>
          </div>
        </article>

        <article class="specimen specimen--label">
          <p class="specimen__label">Short label</p>
          <h3>Small uppercase works best in moderation</h3>
          <p class="specimen__sample">
            Section label with added letter spacing
          </p>
        </article>

        <article class="specimen">
          <p class="specimen__label">Responsive heading</p>
          <h3 style="font-size: clamp(1.6rem, 5vw, 2.8rem); line-height: 1.1;">
            The size changes within limits
          </h3>
          <p class="specimen__sample">
            The heading uses a minimum size, a viewport-based preferred size,
            and a maximum size.
          </p>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="reading-heading">
      <h2 id="reading-heading">A comfortable reading measure</h2>
      <p class="section__intro">
        A paragraph width limit and a flexible line height can make longer
        text easier to follow.
      </p>

      <article class="reading-card">
        <h3>Notes from the garden</h3>
        <p>
          In the early morning, the garden is quiet enough to notice small
          changes. A new leaf opens near the path, the soil is still cool, and
          light moves slowly across the wall. The work is simple: look closely,
          make a note, and come back tomorrow.
        </p>

        <div class="price-list" aria-label="Workshop prices">
          <div class="price-row">
            <span>One session</span>
            <span>$24.00</span>
          </div>
          <div class="price-row">
            <span>Three sessions</span>
            <span>$66.00</span>
          </div>
        </div>
      </article>
    </section>

    <p class="closing-note">
      The page uses system font stacks only. Its layout and text remain
      available even if a different font is selected by the browser.
    </p>
  </main>
</body>
</html>
~~~

## Explanation

### Font stacks

The root custom properties define three stacks:

- `--sans` uses the system interface font and platform fallbacks.
- `--serif` uses a common serif family and a second named fallback.
- `--mono` uses common monospace choices and ends with the generic family.

Your computer may render a different installed font. That is expected: the stack describes choices for the browser, not a promise that every device has the same font files.

### Responsive type

The large headings use `clamp(minimum, preferred, maximum)`. They can grow with the viewport but cannot fall below or above the specified values. The page also uses `rem` for much of its type scale, allowing it to follow the root size.

### Line height and reading width

The serif sample and article use a unitless `line-height`. The article paragraph is limited to `65ch` so its lines do not stretch across the entire wide card. These are starting points. Check them with your actual text, selected font, and preferred zoom.

### Weight and transformed labels

The weight card compares regular, medium, and bold text. A font may not contain every requested weight, so a browser can use the closest available face. The short eyebrow labels use uppercase styling; the underlying HTML text remains normally capitalized.

### Tabular numbers

The price values use `font-variant-numeric: tabular-nums`. When the chosen font supports tabular figures, digits take equal horizontal advances, helping columns of numbers align.

## Expected output

The page has a warm off-white background and a wide dark green hero panel. A large serif heading sits above a short paragraph and an underlined link. The heading grows on wide screens but remains within its minimum and maximum sizes.

Below the hero, six light cards appear in a two-column grid. They demonstrate system sans-serif, serif, monospace, different weights, a spaced uppercase label, and a responsive heading. A final reading card shows a limited-width paragraph and two price rows. On a narrow screen, the specimen cards become one column.

The markdown shows the source as code. Copy it into an HTML file and open that file in a browser to see the described output.

## Optional local web font

To try a font file that is stored in your project, add an `@font-face` rule to the page's stylesheet and change the `--sans` stack to include its family name first:

~~~css
@font-face {
  font-family: "Study Sans";
  src: url("fonts/study-sans.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

:root {
  --sans: "Study Sans", system-ui, sans-serif;
}
~~~

The path is relative to the HTML file in this example because the CSS is inside a `<style>` element. Add the font file at that location or adjust the path. The page still has a system fallback if the file cannot be loaded.

## Try it yourself

1. Change the serif sample to a sans-serif stack and compare its texture.
2. Change the body line height from `1.6` to `1.8`.
3. Resize the browser and observe how the main heading and specimen grid respond.
4. Increase browser zoom and check that text does not clip or overlap.
5. Replace the system stack with a local web font and keep the fallback families.
6. Remove `font-variant-numeric: tabular-nums` and compare the price digits.

## Key points

- A font stack leaves the browser alternatives when a preferred font is unavailable.
- Relative sizes and a unitless line height help text adapt to user settings.
- Keep long text at a comfortable width and test it at several sizes.
- Use text transformation and letter spacing sparingly, especially for long passages.
- A local web font needs a working path and a useful fallback.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [33 - Backgrounds and gradients](../lessons/33-backgrounds-and-gradients.md) | [Lesson](../lessons/34-fonts-and-typography.md) | [Q&A](../qnas/34-fonts-and-typography.md) | [35 - Text layout, spacing, and wrapping](../lessons/35-text-layout-and-wrapping.md) |
