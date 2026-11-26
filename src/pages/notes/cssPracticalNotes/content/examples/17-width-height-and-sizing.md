# 17 - Width, Height, and Sizing: Example

## Goal

See how automatic, percentage, constrained, and content-based sizes behave in different containers.

Copy the complete HTML into a file named `index.html` and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Width, Height, and Sizing</title>
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
      line-height: 1.5;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
    }

    main {
      width: 100%;
      max-width: 72rem;
      margin-inline: auto;
    }

    h1,
    h2,
    h3,
    p {
      margin-top: 0;
    }

    h1 {
      margin-bottom: 0.5rem;
      font-size: 2rem;
      line-height: 1.2;
    }

    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.35rem;
    }

    h3 {
      margin-bottom: 0.35rem;
      font-size: 1rem;
    }

    .intro,
    .description {
      color: #475569;
    }

    .section {
      margin-top: 2rem;
    }

    .panel {
      padding: 1.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #ffffff;
    }

    .size-lab {
      width: 100%;
      max-width: 42rem;
      padding: 1rem;
      border: 1px dashed #64748b;
      border-radius: 0.5rem;
      background: #f8fafc;
      overflow-x: auto;
    }

    .sample {
      margin-block: 0.75rem;
      padding: 0.75rem;
      border: 2px solid #1d4ed8;
      border-radius: 0.35rem;
      background: #dbeafe;
    }

    .auto-width {
      width: auto;
    }

    .full-border-box {
      width: 100%;
    }

    .full-content-box {
      box-sizing: content-box;
      width: 100%;
      padding-inline: 1rem;
      border-width: 2px;
    }

    .percentage-parent {
      width: 100%;
      height: 12rem;
      padding: 0;
      border: 0;
      position: relative;
      background: #e2e8f0;
    }

    .percentage-child {
      width: 60%;
      height: 50%;
      padding: 0.75rem;
      border: 2px solid #0f766e;
      border-radius: 0.35rem;
      background: #99f6e4;
    }

    .constraint-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .constraint-card {
      min-width: 0;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .growing-card {
      min-height: 8rem;
    }

    .capped-card {
      width: 100%;
      max-width: 22rem;
    }

    .ratio-box {
      width: 100%;
      max-width: 36rem;
      aspect-ratio: 16 / 9;
      display: grid;
      place-items: center;
      border-radius: 0.65rem;
      color: #ffffff;
      background: linear-gradient(135deg, #1d4ed8, #7c3aed);
      font-weight: 700;
    }

    .intrinsic-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .intrinsic-card {
      min-width: 0;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      background: #f8fafc;
      overflow-x: auto;
    }

    .chip {
      width: max-content;
      max-width: 100%;
      padding: 0.5rem;
      border-radius: 0.35rem;
      background: #e0e7ff;
    }

    .min-content-chip {
      width: min-content;
    }

    .max-content-chip {
      width: max-content;
      white-space: nowrap;
    }

    .fit-content-chip {
      width: fit-content;
      max-width: 100%;
    }

    .note {
      margin-top: 1.5rem;
      padding: 1rem;
      border-left: 4px solid #0f766e;
      background: #ccfbf1;
    }

    @media (max-width: 44rem) {
      .constraint-row,
      .intrinsic-row {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Width, Height, and Sizing</h1>
    <p class="intro">
      Each section shows a sizing rule in a visible container. Resize the browser
      to see which sizes follow the available space and which stay constrained.
    </p>

    <section class="section panel" aria-labelledby="auto-width-heading">
      <h2 id="auto-width-heading">Auto width and 100% width</h2>
      <p class="description">
        The first box uses the available space. The second uses a border-box
        width of 100%. The third uses content-box sizing, so its padding and
        border extend beyond its 100% content width.
      </p>

      <div class="size-lab">
        <div class="sample auto-width">width: auto</div>
        <div class="sample full-border-box">width: 100%, border-box</div>
        <div class="sample full-content-box">width: 100%, content-box</div>
      </div>
    </section>

    <section class="section panel" aria-labelledby="percentage-heading">
      <h2 id="percentage-heading">Percentage width and height</h2>
      <p class="description">
        This child is 60% as wide and 50% as tall as its containing block.
        The parent has a definite height of 12rem.
      </p>

      <div class="percentage-parent">
        <div class="percentage-child">
          width: 60%<br>
          height: 50%
        </div>
      </div>
    </section>

    <section class="section panel" aria-labelledby="constraints-heading">
      <h2 id="constraints-heading">Minimum and maximum sizes</h2>
      <div class="constraint-row">
        <article class="constraint-card growing-card">
          <h3>Minimum height</h3>
          <p>
            This card has min-height: 8rem. Add more text and the card grows
            instead of clipping its content at the minimum.
          </p>
        </article>

        <article class="constraint-card capped-card">
          <h3>Maximum width</h3>
          <p>
            This card can shrink to fit its parent, but its width stops growing
            at 22rem.
          </p>
        </article>
      </div>
    </section>

    <section class="section panel" aria-labelledby="ratio-heading">
      <h2 id="ratio-heading">Preferred aspect ratio</h2>
      <p class="description">
        This box fills the available width up to 36rem and keeps a 16:9 ratio.
      </p>
      <div class="ratio-box">16:9 sizing area</div>
    </section>

    <section class="section panel" aria-labelledby="intrinsic-heading">
      <h2 id="intrinsic-heading">Content-based sizes</h2>
      <p class="description">
        These labels use min-content, max-content, and fit-content sizing.
        Their boxes follow the text and the space available in each card.
      </p>

      <div class="intrinsic-row">
        <article class="intrinsic-card">
          <h3>min-content</h3>
          <div class="chip min-content-chip">Flexible sizing</div>
        </article>

        <article class="intrinsic-card">
          <h3>max-content</h3>
          <div class="chip max-content-chip">Flexible sizing</div>
        </article>

        <article class="intrinsic-card">
          <h3>fit-content</h3>
          <div class="chip fit-content-chip">Flexible sizing</div>
        </article>
      </div>
    </section>

    <p class="note">
      A maximum size is a ceiling, and a minimum size is a floor. A fixed height
      does not grow to fit extra content, so use it only when that behavior is
      intended.
    </p>
  </main>
</body>
</html>
~~~

## Expected output

The page has five sections:

1. **Auto width and 100% width:** the first two boxes stay within the dashed lab. The content-box example extends farther because its padding and borders are added outside its 100% content width. The lab can scroll horizontally when needed.
2. **Percentage dimensions:** the teal child fills 60% of the parent's content width and half of its definite 12rem height.
3. **Minimum and maximum sizes:** the first card is at least 8rem high and can grow. The second card can shrink with the available space but stops growing at 22rem.
4. **Aspect ratio:** the gradient box changes height with its width and keeps a 16:9 shape, up to its maximum width.
5. **Intrinsic sizes:** the three labels use different content-based sizing behavior. The min-content label wraps at available opportunities, max-content prefers its unwrapped text width, and fit-content balances the content with available space.

At narrow viewport widths, the paired card sections stack into a single column.

## Why this matters

A size value does not always mean the same thing for every element or layout. For example, a normal block's `width: auto` accounts for its other horizontal box parts, but `width: 100%` requests a full containing-block width. Under content-box sizing, padding and borders can then make its outer box wider.

Minimum and maximum constraints let content adapt while keeping useful limits. Automatic height lets content determine how tall a box needs to be, while `aspect-ratio` supplies a preferred relationship between width and height.

## Try it yourself

1. Narrow the browser and compare the auto-width box with the content-box 100% box.
2. Change the third box to `box-sizing: border-box`. Observe how its outer edge changes.
3. Change the teal child's width from 60% to 80%. Its percentage still uses the parent's content width.
4. Add a paragraph to the minimum-height card. Confirm that it grows.
5. Change the capped card's maximum width from 22rem to 30rem.
6. Change the ratio box from 16 / 9 to 4 / 3.
7. Compare the three intrinsic sizing labels. Try a longer phrase with multiple words.
8. Replace a `max-width` with a fixed `width`, then narrow the containing block and observe the difference.

## Key points

- `auto` sizing depends on the element and its layout context.
- A normal block's auto width usually fills available space while accounting for other horizontal box parts.
- Percentages use a containing-block reference. Percentage heights need a definite height reference in common normal-flow cases.
- `min-height` sets a lower bound while allowing content to make the box taller.
- `max-width` sets an upper bound and lets the box become smaller.
- `aspect-ratio` gives a preferred width-to-height relationship.
- Intrinsic sizing values derive size from content.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [16 - The CSS Box Model](16-box-model.md) | [Lesson](../lessons/17-width-height-and-sizing.md) | [Q&A](../qnas/17-width-height-and-sizing.md) | [18 - Margin and Padding](18-margin-and-padding.md) |
