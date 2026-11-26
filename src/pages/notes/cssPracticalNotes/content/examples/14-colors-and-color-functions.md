# 14 - Colors and Color Functions: Example

## Goal

Compare common CSS color formats and see how alpha, opacity, currentColor, color spaces, and newer color functions affect a page.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview also provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Colors and Color Functions</title>
  <style>
    * {
      box-sizing: border-box;
    }

    :root {
      color-scheme: light dark;
      font-family: Arial, sans-serif;
      color: #172554;
      background-color: #f1f5f9;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
      color: #172554;
      background-color: #f1f5f9;
      line-height: 1.5;
    }

    .page {
      width: calc(100% - 2rem);
      max-width: 68rem;
      margin-inline: auto;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    h1 {
      margin-top: 0;
      color: #172554;
      font-size: 2rem;
    }

    h2 {
      margin-top: 0;
      color: #1e3a8a;
      font-size: 1.25rem;
    }

    .intro {
      max-width: 68ch;
    }

    .section {
      margin-top: 1.25rem;
      padding: 1.25rem;
      background-color: #fff;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
    }

    .hint {
      margin-bottom: 0;
      color: #475569;
      font-size: 0.92rem;
    }

    .swatch-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
      gap: 0.75rem;
    }

    .swatch {
      min-height: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
      border: 1px solid #64748b;
      border-radius: 0.6rem;
    }

    .swatch strong {
      font-size: 1.05rem;
    }

    .named-swatch {
      color: #172554;
      background-color: aliceblue;
    }

    .hex-swatch {
      color: #172554;
      background-color: #dbeafe;
    }

    .rgb-swatch {
      color: #172554;
      background-color: rgb(219 234 254);
    }

    .hsl-swatch {
      color: #172554;
      background-color: hsl(214 100% 93%);
    }

    .hwb-swatch {
      color: #172554;
      background-color: hwb(214 86% 0%);
    }

    .hex-alpha-swatch {
      color: #172554;
      background-color: #2563eb66;
    }

    .alpha-stage {
      padding: 1rem;
      background-color: #1e3a8a;
      border-radius: 0.5rem;
    }

    .alpha-card {
      padding: 1rem;
      color: #172554;
      background-color: rgb(255 255 255 / 78%);
      border: 1px solid #fff;
      border-radius: 0.5rem;
    }

    .opacity-card {
      padding: 1rem;
      color: #fff;
      background-color: #c2410c;
      border-radius: 0.5rem;
      opacity: 0.55;
    }

    .opacity-card strong {
      display: block;
    }

    .current-color-sample {
      padding: 1rem;
      color: #0f766e;
      border: 3px solid currentColor;
      border-radius: 0.5rem;
    }

    .oklch-swatch {
      color: #fff;
      background-color: #6d28d9;
      background-color: oklch(55% 0.2 295);
    }

    .p3-swatch {
      color: #000;
      background-color: rgb(235 70 55);
      background-color: color(display-p3 0.95 0.18 0.12);
    }

    .mix-swatch {
      color: #172554;
      background-color: #b6c7f2;
      background-color: color-mix(in oklab, #3157b7 35%, white);
    }

    .relative-swatch {
      color: #172554;
      background-color: #e0e7ff;
      background-color: hsl(from #3157b7 h s 92%);
    }

    .theme-card {
      padding: 1rem;
      color: #172554;
      background-color: #fff;
      border: 2px solid currentColor;
      border-radius: 0.5rem;
    }

    .theme-card {
      color: light-dark(#172554, #e0e7ff);
      background-color: light-dark(#fff, #172554);
    }

    .status-list {
      display: grid;
      gap: 0.75rem;
      padding: 0;
      list-style: none;
    }

    .status {
      padding: 0.75rem 1rem;
      border: 1px solid #64748b;
      border-radius: 0.5rem;
    }

    .status-success {
      color: #14532d;
      background-color: #dcfce7;
      border-color: #15803d;
    }

    .status-error {
      color: #7f1d1d;
      background-color: #fee2e2;
      border-color: #b91c1c;
    }

    code {
      padding: 0.1em 0.3em;
      background-color: #e2e8f0;
      border-radius: 0.25rem;
      font-family: Consolas, monospace;
    }

    @supports (color: color-mix(in oklab, black, white)) {
      .mix-swatch {
        border-color: #3157b7;
      }
    }

    @supports (color: hsl(from red h s l)) {
      .relative-swatch {
        border-color: #3157b7;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <h1>CSS colors and color functions</h1>
    <p class="intro">
      These samples use the same CSS color system in several ways. Some newer
      functions have fallbacks so the page still has usable colors when a
      browser does not support them.
    </p>

    <section class="section">
      <h2>1. Several ways to describe a similar color</h2>
      <div class="swatch-grid">
        <div class="swatch named-swatch">
          <strong>Named color</strong>
          <span>aliceblue</span>
        </div>
        <div class="swatch hex-swatch">
          <strong>Hex</strong>
          <span>#dbeafe</span>
        </div>
        <div class="swatch rgb-swatch">
          <strong>RGB</strong>
          <span>rgb(219 234 254)</span>
        </div>
        <div class="swatch hsl-swatch">
          <strong>HSL</strong>
          <span>hsl(214 100% 93%)</span>
        </div>
        <div class="swatch hwb-swatch">
          <strong>HWB</strong>
          <span>hwb(214 86% 0%)</span>
        </div>
      </div>
      <p class="hint">
        The named, hex, RGB, HSL, and HWB samples are close pale blues.
        Different formats make different color adjustments easier to read.
      </p>
    </section>

    <section class="section">
      <h2>2. Alpha changes one color, opacity fades the element</h2>
      <div class="alpha-stage">
        <div class="alpha-card">
          This surface has a translucent white background. Its text remains
          fully opaque.
        </div>
      </div>
      <p class="hint">
        The dark blue behind the card shows through its alpha background.
      </p>

      <div class="opacity-card">
        <strong>This whole card is faded.</strong>
        Its background and text both use opacity: 0.55.
      </div>
      <p class="hint">
        The opacity declaration applies to the rendered card as a group.
      </p>
    </section>

    <section class="section">
      <h2>3. currentColor keeps component colors in sync</h2>
      <div class="current-color-sample">
        This text and border both use the element's foreground color.
      </div>
      <p class="hint">
        Change the color declaration in the stylesheet. The border follows
        because it uses currentColor.
      </p>
    </section>

    <section class="section">
      <h2>4. Hex alpha and RGB alpha</h2>
      <div class="swatch-grid">
        <div class="swatch hex-alpha-swatch">
          <strong>Hex alpha</strong>
          <span>#2563eb66</span>
        </div>
        <div class="swatch" style="color: #172554; background-color: rgb(37 99 235 / 40%);">
          <strong>RGB alpha</strong>
          <span>rgb(37 99 235 / 40%)</span>
        </div>
      </div>
      <p class="hint">
        Both colors have transparency. In hex, the last two digits are alpha.
        In modern RGB syntax, a slash separates alpha from the color channels.
      </p>
    </section>

    <section class="section">
      <h2>5. Perceptual and wider-gamut values</h2>
      <div class="swatch-grid">
        <div class="swatch oklch-swatch">
          <strong>OkLCh</strong>
          <span>oklch(55% 0.2 295)</span>
        </div>
        <div class="swatch p3-swatch">
          <strong>Display P3</strong>
          <span>color(display-p3 0.95 0.18 0.12)</span>
        </div>
      </div>
      <p class="hint">
        The OkLCh sample uses a simpler purple fallback first. The Display P3
        sample starts with an sRGB fallback. The final appearance depends on
        browser support and the display's color gamut.
      </p>
    </section>

    <section class="section">
      <h2>6. Mixing and deriving colors</h2>
      <div class="swatch-grid">
        <div class="swatch mix-swatch">
          <strong>Color mix</strong>
          <span>color-mix(in oklab, #3157b7 35%, white)</span>
        </div>
        <div class="swatch relative-swatch">
          <strong>Relative HSL</strong>
          <span>hsl(from #3157b7 h s 92%)</span>
        </div>
      </div>
      <p class="hint">
        The first swatch mixes blue with white. The second keeps the source
        color's hue and saturation while changing lightness. Each has a fixed
        fallback declaration before the newer function.
      </p>
    </section>

    <section class="section">
      <h2>7. Light and dark color schemes</h2>
      <div class="theme-card">
        This card uses light-dark() when supported. Its text and background
        change according to the active color scheme.
      </div>
      <p class="hint">
        The root declares color-scheme: light dark. In browsers without
        light-dark(), the card keeps its basic light colors.
      </p>
    </section>

    <section class="section">
      <h2>8. Do not communicate status with color alone</h2>
      <ul class="status-list">
        <li class="status status-success">
          Success: your changes were saved.
        </li>
        <li class="status status-error">
          Error: the required title is missing.
        </li>
      </ul>
      <p class="hint">
        Each state includes a text label as well as a distinct color, so its
        meaning does not depend only on recognizing red or green.
      </p>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

The page shows a centered set of white panels:

1. A row of pale blue swatches labeled with named color, hex, RGB, HSL, and HWB values.
2. A translucent white card over a dark blue surface, followed by a card whose background and text are both faded.
3. A teal text sample with a teal border and a faint matching shadow.
4. Two semi-transparent blue swatches, one using eight-digit hex and one using RGB alpha.
5. A purple OkLCh swatch and a Display P3 swatch. The rendered shades can vary by browser and display.
6. A blue-to-white mixed swatch and a pale color derived from a source hue and saturation.
7. A card that uses light or dark colors when the browser supports light-dark().
8. Success and error messages that include text labels as well as color.

If a browser does not support a newer color function, the earlier fallback declaration keeps the sample visible with a basic color. A display with a smaller color gamut may show a mapped version of the Display P3 sample.

## Why each example resolves that way

### Named colors and color functions

The first section expresses similar pale blues as a name, hex, RGB, HSL, and HWB. The formats use different component models, so their numeric values are not expected to match.

### Alpha compared with opacity

The alpha card sets transparency only on its background color. Its dark blue parent shows through the surface while the text remains opaque. The second card sets opacity on the element, so its text and background are faded together.

### currentColor

The component sets its foreground color once. The border uses currentColor, and the shadow uses an RGB alpha color based on the same teal. This keeps the parts visually related.

### Hex and RGB alpha

The eight-digit hex sample stores alpha in the final two digits. The RGB sample places alpha after a slash. Both apply transparency to their background color.

### OkLCh and Display P3

The OkLCh declaration follows a hex fallback. The Display P3 declaration follows an sRGB fallback. Browsers that understand the newer color spaces can use those declarations, and output devices may still have to map a value that lies outside their gamut.

### Color mixing and relative colors

The mix sample combines a blue with white in Oklab. The relative HSL sample reuses hue and saturation from its source, then sets lightness. The fixed color declarations remain useful if the newer functions are unsupported.

### Light and dark schemes

The theme card starts with light colors. When light-dark() is supported, its values depend on the active color scheme. The root's color-scheme declaration allows both light and dark schemes.

### Status labels

The success and error messages use different colors, but they also state their meaning in text. A reader does not need to identify the color to know the status.

## Try these changes

1. Change the HSL swatch's hue and keep saturation and lightness fixed.
2. Change #2563eb66 to #2563ebcc and compare the transparency.
3. Set opacity on the alpha card and observe how its text changes too.
4. Change the current-color sample from teal to purple. Observe its border and shadow.
5. Adjust the OkLCh lightness, chroma, and hue one at a time.
6. Change the percentages in color-mix() so they still total 100%.
7. Change the relative HSL lightness from 92% to 75%.
8. Test the theme card in light and dark color schemes.
9. Temporarily remove the fallback before a newer declaration and inspect the behavior in a browser that does not support that function.
10. Replace one status color but keep its written label. Check that the message still makes sense without seeing its color.

## Key points

- Names, hex, RGB, HSL, and HWB are different ways to describe colors.
- Alpha controls one color's transparency; opacity fades the whole element group.
- currentColor reuses the element's foreground color.
- OkLCh and Display P3 need appropriate fallbacks for the browsers and displays a project supports.
- color-mix(), relative colors, and light-dark() can derive or select colors dynamically.
- Color alone should not carry essential status information.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [13 - Values, Units, and Percentages](13-values-units-and-percentages.md) | [Lesson](../lessons/14-colors-and-color-functions.md) | [Q&A](../qnas/14-colors-and-color-functions.md) | [15 - CSS math functions: calc, min, max, and clamp](15-css-math-functions.md) |