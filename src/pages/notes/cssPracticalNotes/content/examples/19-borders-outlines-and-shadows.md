# 19 - Borders, Outlines, and Shadows: Example

## Goal

See how border styles, rounded corners, outlines, and shadows change the appearance of elements. The focus example also lets you check the outline with a keyboard.

Copy the complete HTML into a file named `index.html` and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Borders, Outlines, and Shadows</title>
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
      margin-bottom: 0.5rem;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.1;
    }

    h2 {
      margin-bottom: 0.75rem;
      font-size: 1.5rem;
    }

    h3 {
      margin-bottom: 0.4rem;
      font-size: 1.1rem;
    }

    p + p {
      margin-top: 0.65rem;
    }

    code,
    pre {
      font-family: Consolas, monospace;
    }

    code {
      padding: 0.1em 0.35em;
      border-radius: 0.25rem;
      background: #e2e8f0;
    }

    pre {
      overflow-x: auto;
      margin-top: 0.75rem;
      padding: 1rem;
      border: 1px solid #334155;
      border-radius: 0.5rem;
      background: #0f172a;
      color: #f8fafc;
    }

    pre code {
      padding: 0;
      background: transparent;
      color: inherit;
    }

    .intro {
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
    }

    .demo-section > p {
      margin-bottom: 1rem;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
      gap: 1rem;
    }

    .sample {
      min-height: 8rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .sample p {
      color: #475569;
      font-size: 0.95rem;
    }

    .border-solid {
      border: 2px solid #2563eb;
    }

    .border-dashed {
      border: 2px dashed #0f766e;
    }

    .border-dotted {
      border: 2px dotted #7c3aed;
    }

    .border-double {
      border: 4px double #be123c;
    }

    .current-color {
      color: #0f766e;
      border: 2px solid;
    }

    .side-border {
      border-top: 1px solid #cbd5e1;
      border-right: 2px dashed #64748b;
      border-bottom: 3px solid #0f766e;
      border-left: 5px solid #2563eb;
    }

    .radius-small {
      border: 2px solid #2563eb;
      border-radius: 0.5rem;
    }

    .radius-large {
      border: 2px solid #0f766e;
      border-radius: 1.5rem;
    }

    .radius-corners {
      border: 2px solid #7c3aed;
      border-radius: 0.25rem 1.5rem 0.75rem 2rem;
    }

    .radius-ellipse {
      border: 2px solid #be123c;
      border-radius: 2rem / 0.75rem;
    }

    .outline-stage {
      padding: 1.25rem;
      border: 1px dashed #94a3b8;
      border-radius: 0.75rem;
      background: #f8fafc;
    }

    .focus-link,
    .focus-button {
      display: inline-block;
      margin: 0.5rem 0.75rem 0.5rem 0;
      padding: 0.65rem 0.9rem;
      border: 2px solid #1d4ed8;
      border-radius: 0.4rem;
      background: #fff;
      color: #1d4ed8;
      font: inherit;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }

    .focus-button {
      color: #fff;
      background: #1d4ed8;
    }

    .focus-link:focus-visible,
    .focus-button:focus-visible {
      outline: 3px solid #7c3aed;
      outline-offset: 4px;
    }

    .shadow-card {
      min-height: 8rem;
      padding: 1.25rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      background: #fff;
    }

    .shadow-soft {
      box-shadow: 0 8px 20px rgb(15 23 42 / 0.14);
    }

    .shadow-layered {
      box-shadow:
        0 2px 4px rgb(15 23 42 / 0.12),
        0 12px 28px rgb(15 23 42 / 0.12);
    }

    .shadow-inset {
      box-shadow: inset 0 3px 8px rgb(15 23 42 / 0.2);
    }

    .shadow-spread {
      box-shadow: 0 8px 16px -5px rgb(37 99 235 / 0.55);
    }

    .text-shadow-heading {
      color: #1d4ed8;
      text-shadow: 0 3px 8px rgb(15 23 42 / 0.25);
    }

    .note {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      border-inline-start: 4px solid #d97706;
      background: #fffbeb;
      color: #78350f;
    }

    .practice-list {
      margin-block: 0.75rem 0;
      padding-inline-start: 1.5rem;
    }

    .practice-list li + li {
      margin-top: 0.35rem;
    }

    @media (max-width: 40rem) {
      body {
        width: min(100% - 1.25rem, 68rem);
        padding-block: 1.25rem 2rem;
      }

      .demo-section {
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Borders, Outlines, and Shadows</h1>
    <p class="intro">
      Borders define box edges, outlines mark elements without changing layout,
      and shadows add painted depth.
    </p>
  </header>

  <main>
    <section class="demo-section" aria-labelledby="border-heading">
      <h2 id="border-heading">1. Border styles and currentColor</h2>
      <p>
        Every visible border needs a width, a drawing style, and a color.
        The border below uses <code>currentColor</code> because its color is omitted.
      </p>
      <div class="demo-grid">
        <article class="sample border-solid">
          <h3>Solid</h3>
          <p><code>2px solid #2563eb</code></p>
        </article>
        <article class="sample border-dashed">
          <h3>Dashed</h3>
          <p><code>2px dashed #0f766e</code></p>
        </article>
        <article class="sample border-dotted">
          <h3>Dotted</h3>
          <p><code>2px dotted #7c3aed</code></p>
        </article>
        <article class="sample border-double">
          <h3>Double</h3>
          <p><code>4px double #be123c</code></p>
        </article>
        <article class="sample current-color">
          <h3>Color follows text</h3>
          <p>The border uses the same teal as this text.</p>
        </article>
      </div>
      <pre><code>.example {
  border: 2px solid #2563eb;
}

.current-color {
  color: #0f766e;
  border: 2px solid;
}</code></pre>
    </section>

    <section class="demo-section" aria-labelledby="sides-heading">
      <h2 id="sides-heading">2. Different borders on each side</h2>
      <p>
        This box uses a thin top border, a dashed right border, a teal bottom
        border, and a thicker blue left border.
      </p>
      <div class="sample side-border">
        <h3>Side-specific borders</h3>
        <p>
          The CSS uses <code>border-top</code>, <code>border-right</code>,
          <code>border-bottom</code>, and <code>border-left</code>.
        </p>
      </div>
      <p class="note">
        Add a later <code>border</code> shorthand and it will set all sides,
        replacing these side-specific values when it wins the cascade.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="radius-heading">
      <h2 id="radius-heading">3. Rounded and elliptical corners</h2>
      <p>
        Try changing the radius values. The four-value version starts at the
        top-left corner and continues clockwise.
      </p>
      <div class="demo-grid">
        <article class="sample radius-small">
          <h3>Small radius</h3>
          <p><code>border-radius: 0.5rem</code></p>
        </article>
        <article class="sample radius-large">
          <h3>Large radius</h3>
          <p><code>border-radius: 1.5rem</code></p>
        </article>
        <article class="sample radius-corners">
          <h3>Four corner values</h3>
          <p><code>0.25rem 1.5rem 0.75rem 2rem</code></p>
        </article>
        <article class="sample radius-ellipse">
          <h3>Elliptical radius</h3>
          <p><code>border-radius: 2rem / 0.75rem</code></p>
        </article>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="outline-heading">
      <h2 id="outline-heading">4. Keyboard focus outline</h2>
      <p>
        Use the Tab key to move focus to the link and button. Each focused
        control gets a purple outline with space between it and its border.
      </p>
      <div class="outline-stage">
        <a class="focus-link" href="#shadow-heading">Focus this link</a>
        <button class="focus-button" type="button">Focus this button</button>
      </div>
      <pre><code>.focus-link:focus-visible,
.focus-button:focus-visible {
  outline: 3px solid #7c3aed;
  outline-offset: 4px;
}</code></pre>
      <p class="note">
        The outline does not shift the link or button when it appears. Keep a
        visible focus style so keyboard users can identify the active control.
      </p>
    </section>

    <section class="demo-section" id="shadow-heading" aria-labelledby="shadows-heading">
      <h2 id="shadows-heading">5. Box shadows</h2>
      <p>
        Shadows are painted effects. They do not make neighboring cards move.
      </p>
      <div class="demo-grid">
        <article class="shadow-card shadow-soft">
          <h3>Soft outer shadow</h3>
          <p><code>0 8px 20px rgb(15 23 42 / 0.14)</code></p>
        </article>
        <article class="shadow-card shadow-layered">
          <h3>Two shadow layers</h3>
          <p>The first shadow in the list is painted above the second.</p>
        </article>
        <article class="shadow-card shadow-inset">
          <h3>Inset shadow</h3>
          <p><code>inset 0 3px 8px</code> paints inside the box.</p>
        </article>
        <article class="shadow-card shadow-spread">
          <h3>Negative spread</h3>
          <p><code>-5px</code> contracts the shadow shape.</p>
        </article>
      </div>
      <pre><code>.layered {
  box-shadow:
    0 2px 4px rgb(15 23 42 / 0.12),
    0 12px 28px rgb(15 23 42 / 0.12);
}</code></pre>
    </section>

    <section class="demo-section" aria-labelledby="text-shadow-heading">
      <h2 id="text-shadow-heading">6. Text shadow</h2>
      <h3 class="text-shadow-heading">A subtle shadow behind a heading</h3>
      <p>
        Text shadows use horizontal and vertical offsets, optional blur, and
        optional color. They do not have a spread or inset value.
      </p>
      <pre><code>.text-shadow-heading {
  text-shadow: 0 3px 8px rgb(15 23 42 / 0.25);
}</code></pre>
    </section>

    <section class="demo-section" aria-labelledby="practice-heading">
      <h2 id="practice-heading">Try it yourself</h2>
      <ol class="practice-list">
        <li>Change the solid border to <code>border-width: 5px</code>.</li>
        <li>Remove the border style and notice the line disappears.</li>
        <li>Change the current-color sample's text color and watch its border follow.</li>
        <li>Try different values for each corner radius.</li>
        <li>Use Tab and Shift+Tab to check the focus outline on both controls.</li>
        <li>Change the shadow spread from -5px to 5px and compare its size.</li>
        <li>Reverse the two shadows in the layered example and compare their order.</li>
        <li>Remove the text shadow and decide which heading is easier to read.</li>
      </ol>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

A responsive page displays:

- Solid, dashed, dotted, and double borders.
- A border that follows the element's text color.
- A box with four visibly different border sides.
- Small, large, four-value, and elliptical corner radii.
- A link and button with a purple outline when reached by keyboard focus.
- Outer, layered, inset, and contracted box shadows.
- A heading with a subtle text shadow.
- Practice prompts for changing each style.

The page is self-contained. The focus example uses the keyboard and does not require a script.

## Explanation

Each border sample uses the `border` shorthand to set width, style, and color. The current-color sample omits the color, so its border follows the sample's `color`.

The side-specific sample gives each physical side a separate border. The radius samples show how one value rounds all corners, four values set them clockwise, and a slash separates horizontal and vertical radii.

Use Tab and Shift+Tab to move keyboard focus. The `:focus-visible` rule adds an outline outside the border, and `outline-offset` creates a gap. Because outlines do not take up layout space, the controls stay in place.

The box-shadow samples compare a basic outer shadow, multiple layers, an inset shadow, and negative spread. The text-shadow sample affects only the heading's painted text. Neither kind of shadow changes the layout dimensions.

## Key points

- A visible border needs a width, style, and color.
- Omitted border color follows `currentColor`.
- A border shorthand can reset previous side-specific values.
- `border-radius` can use equal, per-corner, or elliptical radii.
- The focus outline appears when a keyboard user moves to a control.
- Outlines do not change layout, and `outline-offset` is a separate property.
- Box shadows do not create spacing; use layout properties for that.
- Text shadows do not have spread or inset values.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [18 - Margin and Padding](18-margin-and-padding.md) | [Lesson](../lessons/19-borders-outlines-and-shadows.md) | [Q&A](../qnas/19-borders-outlines-and-shadows.md) | [20 - Display and Box Types](20-display-and-box-types.md) |
