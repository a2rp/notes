# 13 - Values, Units, and Percentages: Example

## Goal

See how CSS values and units behave in a small page. The examples show percentage reference sizes, font-relative lengths, viewport units, line-height inheritance, values without units, `calc()`, grid fractions, and angle and time units.

Copy the complete HTML into a file named `index.html` and open it in a browser. GitHub's Markdown preview also provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Values, Units, and Percentages</title>
  <style>
    * {
      box-sizing: border-box;
    }

    html {
      font-size: 100%;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
      background: #f1f5f9;
      color: #1e293b;
      font-family: Arial, sans-serif;
      line-height: 1.5;
    }

    .page {
      width: calc(100% - 2rem);
      max-width: 64rem;
      margin-inline: auto;
    }

    h1,
    h2 {
      color: #173b68;
      line-height: 1.2;
    }

    h1 {
      margin-top: 0;
      font-size: 2rem;
    }

    h2 {
      margin-top: 0;
      font-size: 1.25rem;
    }

    .intro {
      max-width: 68ch;
    }

    .example {
      margin-top: 1.25rem;
      padding: 1.25rem;
      background: #fff;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
    }

    .example > :last-child {
      margin-bottom: 0;
    }

    .hint {
      color: #475569;
      font-size: 0.9rem;
    }

    .percent-parent {
      width: 100%;
      max-width: 40rem;
      padding: 1rem;
      background: #dbeafe;
      border: 2px dashed #2563eb;
    }

    .percent-child {
      width: 50%;
      padding: 0.75rem;
      background: #bfdbfe;
      border: 1px solid #1d4ed8;
    }

    .font-parent {
      font-size: 20px;
    }

    .font-child {
      font-size: 120%;
      color: #7e22ce;
    }

    .relative-card {
      max-width: 32rem;
      padding: 1em;
      background: #ecfdf5;
      border: 0.1em solid #059669;
      border-radius: 0.75rem;
      font-size: 1.25rem;
    }

    .measure-copy {
      max-width: 58ch;
    }

    .viewport-panel {
      display: flex;
      min-height: 12rem;
      min-height: 24svh;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: #ede9fe;
      border: 1px solid #8b5cf6;
      text-align: center;
    }

    .line-example {
      margin-top: 1rem;
      padding: 1rem;
      background: #f8fafc;
      border-left: 4px solid #64748b;
      font-size: 20px;
    }

    .line-example p {
      margin: 0;
    }

    .unitless-line-height {
      line-height: 1.5;
    }

    .percentage-line-height {
      line-height: 150%;
    }

    .small-line-child {
      font-size: 12px;
    }

    .opacity-sample {
      display: inline-block;
      padding: 0.75rem 1rem;
      background: #0f766e;
      color: #fff;
      opacity: 0.65;
    }

    .calc-parent {
      padding: 1rem;
      background: #e2e8f0;
    }

    .calc-child {
      width: calc(100% - 2rem);
      margin-inline: auto;
      padding: 0.75rem;
      background: #bae6fd;
      border: 1px solid #0284c7;
      text-align: center;
    }

    .fraction-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 0.5rem;
    }

    .fraction-grid > div {
      padding: 1rem;
      background: #ffedd5;
      border: 1px solid #f97316;
      text-align: center;
    }

    .motion-sample {
      padding: 0.75rem 1rem;
      background: #1d4ed8;
      border: 0;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      transition-duration: 200ms;
      transition-property: transform;
      transition-timing-function: ease;
    }

    .motion-sample:hover {
      transform: rotate(2deg);
    }

    code {
      padding: 0.1em 0.3em;
      background: #f1f5f9;
      border-radius: 0.25rem;
      font-family: Consolas, monospace;
    }
  </style>
</head>
<body>
  <main class="page">
    <h1>CSS values, units, and percentages</h1>
    <p class="intro">
      Each property accepts particular kinds of values. The boxes below make
      several common unit relationships visible.
    </p>

    <section class="example">
      <h2>1. A percentage width uses its containing block</h2>
      <div class="percent-parent">
        Containing block
        <div class="percent-child">This child is 50% of the available content width.</div>
      </div>
      <p class="hint">
        The blue child is half as wide as the containing block's content area.
        The percentage does not mean half of the viewport unless that is the
        containing block.
      </p>
    </section>

    <section class="example">
      <h2>2. A font-size percentage uses the parent's font size</h2>
      <div class="font-parent">
        Parent text: 20px
        <p class="font-child">Child text: 120% of 20px, which computes to 24px.</p>
      </div>
    </section>

    <section class="example">
      <h2>3. em follows the component's text and rem follows the root</h2>
      <div class="relative-card">
        This card uses 1em padding and a 1em border. Its font size is 1.25rem.
      </div>
      <p class="hint">
        The card's <code>font-size</code> is based on the root size with rem.
        Its padding and border use em, so they scale with the card's computed
        font size. The root font size is left at 100% so browser text-size
        preferences can apply.
      </p>
    </section>

    <section class="example">
      <h2>4. ch gives an approximate text measure</h2>
      <p class="measure-copy">
        This paragraph has a maximum width of 58ch. The ch unit is based on the
        width of the font's zero glyph, so it is a useful approximate reading
        measure rather than an exact count of characters.
      </p>
    </section>

    <section class="example">
      <h2>5. A small viewport unit sets a minimum panel height</h2>
      <div class="viewport-panel">
        This panel uses 12rem where svh is unsupported and 24svh where it is supported.
      </div>
      <p class="hint">
        The first min-height is a fallback for browsers that do not support svh.
        Where supported, the second declaration uses 24% of the small viewport
        height.
      </p>
    </section>

    <section class="example">
      <h2>6. Unitless and percentage line-height inherit differently</h2>
      <div class="line-example unitless-line-height">
        <strong>Parent: 20px with line-height: 1.5</strong>
        <p class="small-line-child">
          This child uses 12px text and inherits the 1.5 multiplier.<br>
          Its line box is about 18px tall.
        </p>
      </div>
      <div class="line-example percentage-line-height">
        <strong>Parent: 20px with line-height: 150%</strong>
        <p class="small-line-child">
          This child also uses 12px text, but inherits the parent's 30px line-height.<br>
          Its lines have more space than in the example above.
        </p>
      </div>
    </section>

    <section class="example">
      <h2>7. A unitless number is not a length</h2>
      <p>
        <span class="opacity-sample">opacity: 0.65</span>
      </p>
      <p class="hint">
        Opacity expects a number from 0 to 1. The sample is partly transparent.
        Writing <code>opacity: 0.65px</code> would be invalid because opacity
        does not take a length.
      </p>
    </section>

    <section class="example">
      <h2>8. calc() combines a percentage and a length</h2>
      <div class="calc-parent">
        <div class="calc-child">width: calc(100% - 2rem)</div>
      </div>
      <p class="hint">
        The child leaves 1rem of the parent's content width on each side. If
        that content width is 600px and 1rem is 16px, the child is 568px wide.
      </p>
    </section>

    <section class="example">
      <h2>9. fr divides available grid track space</h2>
      <div class="fraction-grid">
        <div>1fr</div>
        <div>2fr</div>
      </div>
      <p class="hint">
        After the gap is taken into account, the second track receives twice
        the flexible space of the first. The fr unit is not a length.
      </p>
    </section>

    <section class="example">
      <h2>10. A transition uses time and angle units</h2>
      <p>Move the pointer over the button to see a small rotation.</p>
      <button class="motion-sample" type="button">Hover to rotate</button>
      <p class="hint">
        <code>200ms</code> is a time value used by the transition, and
        <code>2deg</code> is an angle used by transform. Units are meaningful
        only where the property accepts that kind of value.
      </p>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

The page shows a centered set of white example panels on a light gray background:

1. A dashed blue containing block holds a blue child that is half its content width.
2. The purple child text is larger than its parent because 120% of 20px is 24px.
3. A green card has padding and a border that scale with its 1.25rem text size.
4. A paragraph stays near a readable line length, measured approximately in ch.
5. A violet panel has a minimum height tied to the small viewport, with a fixed rem fallback.
6. Two text samples show that unitless line-height scales with the child's font size, while the inherited percentage line-height remains a computed length.
7. The teal sample is partly transparent because opacity is 0.65.
8. A light blue box is narrower than its parent because calc() subtracts 2rem.
9. The second orange grid track is twice as wide as the first flexible track.
10. Hovering the button rotates it by 2 degrees over 200 milliseconds.

Exact pixel sizes can vary with browser font settings, viewport dimensions, and the default root font size. The relationships between the values remain the same.

## Why each example resolves that way

### Percentage width and percentage font size

The percentage width is resolved against the containing block's content width. The percentage font size is resolved against the parent's font size. Percentages are defined by the property, so the two values have different reference sizes.

### em, rem, and ch

The root keeps its browser-controlled font size because it uses 100%. The card's 1.25rem font size scales from that root size. Its 1em padding and border scale from the card's own computed font size. The paragraph's 58ch maximum width uses the advance width of the current font's zero glyph as an approximate measure.

### Viewport height

The first declaration provides a 12rem fallback for browsers that do not support svh. In browsers supporting svh, the later declaration replaces it with 24% of the small viewport height. The small viewport unit accounts for the browser's expanded interface controls.

### Line-height inheritance

A unitless line-height is inherited as a number, so the 12px child uses 1.5 times its own font size, or about 18px. A percentage line-height computes to a length on the parent: 150% of 20px is 30px. The child inherits that 30px length.

### Numbers, calc(), fr, time, and angles

Opacity accepts a number without a unit. In the calc() sample, 100% refers to the containing block's content width and 2rem supplies the root-relative subtraction. Grid uses fr to distribute free track space. The transition duration expects a time value, while rotate expects an angle.

## Try these changes

1. Change the percentage child from 50% to 75% and compare it with its containing block.
2. Change the font parent to 24px. Work out the child's new font size before checking the browser.
3. Change the card font size from 1.25rem to 1.5rem. Observe how its em-based padding and border respond.
4. Change 58ch to 40ch, then to 70ch. Notice that ch is a font measure, not an exact character count.
5. Change 24svh to 40svh and resize the browser window.
6. Replace the unitless line-height with 150% and compare the child line spacing.
7. Change opacity to 0.25, then try adding px and observe that the invalid declaration has no effect.
8. Change the calc() expression to subtract 4rem. Remember to keep spaces around the minus operator.
9. Change the grid tracks to 1fr 3fr and compare their widths.
10. Change the hover angle to 5deg and the transition duration to 500ms.

## Key points

- A percentage's reference value depends on the property.
- em is useful for sizing in relation to text; rem is relative to the root font size.
- ch is based on a glyph width and only approximates a character count.
- Viewport units size values relative to the viewport; small viewport units account for expanded browser controls.
- Unitless line-height scales with each element's own font size, while percentage line-height inherits as a computed length.
- Number-valued properties such as opacity do not take length units.
- calc() can combine compatible values, fr distributes flexible grid space, and time and angle units belong to properties that accept them.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [12 - Cascade layers](12-cascade-layers.md) | [Lesson](../lessons/13-values-units-and-percentages.md) | [Q&A](../qnas/13-values-units-and-percentages.md) | [14 - Colors and color functions](14-colors-and-color-functions.md) |