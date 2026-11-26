# 40 - Replaced elements, aspect ratios, and object fitting - Example

This self-contained gallery uses one embedded landscape illustration in four frames. Each frame has the same aspect ratio, while `object-fit` changes how the image content appears inside it.

## Question

Create a media gallery that:

- Uses a consistent 16:9 frame for every image.
- Compares `cover`, `contain`, `fill`, and `scale-down`.
- Adjusts the crop of the cover image with `object-position`.
- Includes accurate image dimensions and alternative text.
- Works in a narrow viewport without making the page overflow.

## Complete HTML

Copy the code into an HTML file and open it in a browser. The small SVG illustration is embedded in the image source, so the example needs no remote image or extra file.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Aspect Ratios and Object Fitting</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      color-scheme: light;
      --ink: #1b2939;
      --muted: #536478;
      --paper: #f1f5f8;
      --surface: #fff;
      --line: #d5e0e9;
      --frame: #dce9f1;
      --accent: #075b9b;
    }

    body {
      min-width: 320px;
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      color: var(--ink);
      background-color: var(--paper);
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      font-size: 1rem;
      line-height: 1.6;
    }

    .page {
      width: min(100%, 1040px);
      margin-inline: auto;
    }

    .page-header,
    .gallery-card {
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
    }

    .page-header {
      padding: clamp(1.25rem, 4vw, 2rem);
      background-image: linear-gradient(135deg, #e7f2fb, #fff 72%);
    }

    .eyebrow {
      color: var(--muted);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    h1 {
      margin-top: 0.4rem;
      font-size: clamp(2rem, 6vw, 3rem);
    }

    h2 {
      font-size: 1.25rem;
    }

    .page-header p:last-child {
      max-width: 68ch;
      margin-top: 0.8rem;
      color: var(--muted);
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.25rem;
      margin-top: 1.25rem;
    }

    .gallery-card {
      min-width: 0;
      padding: 1rem;
    }

    .gallery-card h2 {
      margin-bottom: 0.75rem;
    }

    .media-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 0.7rem;
      background-color: var(--frame);
    }

    .media-frame img {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
    }

    .fit-cover img {
      object-fit: cover;
      object-position: 50% 25%;
    }

    .fit-contain img {
      object-fit: contain;
      object-position: center;
    }

    .fit-fill img {
      object-fit: fill;
    }

    .fit-scale-down img {
      object-fit: scale-down;
      object-position: center;
    }

    .gallery-card p {
      margin-top: 0.75rem;
      color: var(--muted);
    }

    code {
      padding: 0.08em 0.3em;
      border-radius: 0.25em;
      background-color: #edf2f6;
      color: #243b53;
      font-size: 0.92em;
    }

    .page-footer {
      margin-top: 1rem;
      color: var(--muted);
      font-size: 0.9rem;
      text-align: center;
    }

    @media (max-width: 640px) {
      .gallery {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">CSS media sizing</p>
      <h1>One image, four fits</h1>
      <p>
        Every frame uses the same 16:9 box. Compare how each object-fit value
        places a 4:3 landscape image inside it.
      </p>
    </header>

    <section class="gallery" aria-label="Object fitting examples">
      <article class="gallery-card">
        <h2>Cover</h2>
        <figure class="media-frame fit-cover">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2NiZThmNiIvPjxjaXJjbGUgY3g9IjYyMCIgY3k9IjE0MCIgcj0iNzUiIGZpbGw9IiNmZmNiNjIiLz48cGF0aCBkPSJNMCA0NTAgMTkwIDIzMGwxNjUgMjIwIDEzMC0xNzAgMzE1IDMyMEgweiIgZmlsbD0iIzQ1N2I2MSIvPjxwYXRoIGQ9Im0yNTAgNjAwIDIyNS0zMzAgMzI1IDMzMEgyNTB6IiBmaWxsPSIjMzE1YjUwIi8+PC9zdmc+"
            width="800"
            height="600"
            alt="A stylized landscape with a sun above green mountain ridges"
          >
        </figure>
        <p><code>cover</code> fills the frame and crops the image. The vertical position keeps the sun in view.</p>
      </article>

      <article class="gallery-card">
        <h2>Contain</h2>
        <figure class="media-frame fit-contain">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2NiZThmNiIvPjxjaXJjbGUgY3g9IjYyMCIgY3k9IjE0MCIgcj0iNzUiIGZpbGw9IiNmZmNiNjIiLz48cGF0aCBkPSJNMCA0NTAgMTkwIDIzMGwxNjUgMjIwIDEzMC0xNzAgMzE1IDMyMEgweiIgZmlsbD0iIzQ1N2I2MSIvPjxwYXRoIGQ9Im0yNTAgNjAwIDIyNS0zMzAgMzI1IDMzMEgyNTB6IiBmaWxsPSIjMzE1YjUwIi8+PC9zdmc+"
            width="800"
            height="600"
            alt="A stylized landscape with a sun above green mountain ridges"
          >
        </figure>
        <p><code>contain</code> keeps the whole image visible. The frame background appears at the sides.</p>
      </article>

      <article class="gallery-card">
        <h2>Fill</h2>
        <figure class="media-frame fit-fill">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2NiZThmNiIvPjxjaXJjbGUgY3g9IjYyMCIgY3k9IjE0MCIgcj0iNzUiIGZpbGw9IiNmZmNiNjIiLz48cGF0aCBkPSJNMCA0NTAgMTkwIDIzMGwxNjUgMjIwIDEzMC0xNzAgMzE1IDMyMEgweiIgZmlsbD0iIzQ1N2I2MSIvPjxwYXRoIGQ9Im0yNTAgNjAwIDIyNS0zMzAgMzI1IDMzMEgyNTB6IiBmaWxsPSIjMzE1YjUwIi8+PC9zdmc+"
            width="800"
            height="600"
            alt="A stylized landscape with a sun above green mountain ridges"
          >
        </figure>
        <p><code>fill</code> stretches the image to fit both dimensions, which changes its proportions.</p>
      </article>

      <article class="gallery-card">
        <h2>Scale down</h2>
        <figure class="media-frame fit-scale-down">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2NiZThmNiIvPjxjaXJjbGUgY3g9IjYyMCIgY3k9IjE0MCIgcj0iNzUiIGZpbGw9IiNmZmNiNjIiLz48cGF0aCBkPSJNMCA0NTAgMTkwIDIzMGwxNjUgMjIwIDEzMC0xNzAgMzE1IDMyMEgweiIgZmlsbD0iIzQ1N2I2MSIvPjxwYXRoIGQ9Im0yNTAgNjAwIDIyNS0zMzAgMzI1IDMzMEgyNTB6IiBmaWxsPSIjMzE1YjUwIi8+PC9zdmc+"
            width="800"
            height="600"
            alt="A stylized landscape with a sun above green mountain ridges"
          >
        </figure>
        <p><code>scale-down</code> uses the smaller result of <code>none</code> and <code>contain</code>.</p>
      </article>
    </section>

    <footer class="page-footer">
      <p>The image source is embedded in this document. No remote asset is required.</p>
    </footer>
  </main>
</body>
</html>
~~~

## Explanation

- The SVG image is included as a data URL, so the page does not request an external asset.
- The image's `width` and `height` attributes describe its real 4:3 proportions.
- Each `.media-frame` uses `aspect-ratio: 16 / 9` to give the frame a consistent shape.
- The image fills the frame's box with `width: 100%` and `height: 100%`.
- `object-fit` controls how the 4:3 image content fits inside the 16:9 image box.
- The cover example uses `object-position: 50% 25%` to shift the vertical crop toward the sun.
- The contain example preserves all image content and exposes the frame background around it.
- The fill example distorts the image because it forces both dimensions to match the frame.
- The scale-down example reduces the image to fit, without enlarging it past its natural size.
- A media query changes the gallery from two columns to one on narrow screens.

## Expected output

The page shows four cards in a two-column gallery on wider screens and one column on narrow screens. Each card displays the same mountain illustration in a 16:9 frame. Cover crops the image, contain shows all of it with side space, fill stretches it, and scale-down fits it without enlargement. The background color makes unused frame space visible.

## Try it yourself

1. Change `.fit-cover img` to `object-position: left center` and then `right center`.
2. Give all frames a `1 / 1` ratio and compare which edges each fit value changes.
3. Change one frame to `aspect-ratio: 3 / 2` and notice that the image source itself remains 4:3.
4. Replace `cover` with `contain` on the first image and compare the crop with the full picture.
5. Remove the frame background color and observe the empty areas in the contain example.
6. Use a meaningful real image and update the `alt` text to describe its information.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [39 - Styling forms and controls](../lessons/39-styling-forms-and-controls.md) | [Lesson](../lessons/40-replaced-elements-and-object-fitting.md) | [Q&A](../qnas/40-replaced-elements-and-object-fitting.md) | [41 - Custom properties and design tokens](../lessons/41-custom-properties-and-design-tokens.md) |