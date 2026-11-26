# 15 - CSS Math Functions: Example

## Goal

Use calc(), min(), max(), and clamp() to build layouts that respond to available space while staying within chosen limits.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview also provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Math Functions</title>
  <style>
    * {
      box-sizing: border-box;
    }

    :root {
      font-family: Arial, sans-serif;
      color: #172554;
      background-color: #f1f5f9;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
      line-height: 1.5;
    }

    .page {
      width: calc(100% - 2rem);
      max-width: 68rem;
      width: min(100% - 2rem, 68rem);
      margin-inline: auto;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    h1 {
      margin-top: 0;
      font-size: clamp(2rem, 1.4rem + 2vw, 3.25rem);
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

    .track {
      width: 100%;
      max-width: 40rem;
      outline: 2px dashed #64748b;
      outline-offset: 3px;
    }

    .calc-box {
      width: calc(100% - 2rem);
      margin-inline: auto;
      padding: 0.75rem;
      background-color: #bfdbfe;
      border: 1px solid #2563eb;
      text-align: center;
    }

    .half-box {
      width: calc((100% - 2rem) / 2);
      margin-top: 0.75rem;
      padding: 0.75rem;
      background-color: #c4b5fd;
      border: 1px solid #6d28d9;
      text-align: center;
    }

    .comparison-stage {
      width: 100%;
      max-width: 40rem;
      background-color: #e2e8f0;
      border-radius: 0.5rem;
    }

    .min-box {
      width: min(70%, 30rem);
      padding: 0.75rem;
      background-color: #bbf7d0;
      border: 1px solid #15803d;
    }

    .max-box {
      width: max(10rem, 25%);
      margin-top: 0.75rem;
      padding: 0.75rem;
      background-color: #fed7aa;
      border: 1px solid #c2410c;
    }

    .clamp-heading {
      width: fit-content;
      max-width: 100%;
      margin: 0;
      padding: clamp(0.75rem, 2vw, 1.5rem);
      background-color: #dbeafe;
      border: 1px solid #2563eb;
      border-radius: 0.5rem;
      font-size: clamp(1.5rem, 1rem + 2vw, 3rem);
    }

    .variable-stage {
      width: 100%;
      max-width: 40rem;
      padding: 0.75rem;
      background-color: #ede9fe;
    }

    .variable-box {
      --gutter: 1.25rem;
      width: calc(100% - var(--gutter) - var(--gutter));
      margin-inline: auto;
      padding: 0.75rem;
      background-color: #ddd6fe;
      border: 1px solid #7c3aed;
      text-align: center;
    }

    .precedence-demo {
      padding: 1rem;
      background-color: #f8fafc;
      border-left: 4px solid #64748b;
    }

    .precedence-demo p {
      margin: 0.5rem 0;
    }

    .formula {
      display: inline-block;
      padding: 0.5rem 0.75rem;
      background-color: #e2e8f0;
      border-radius: 0.35rem;
      font-family: Consolas, monospace;
    }

    .invalid-demo {
      width: 8rem;
      width: calc(10rem + 2s);
      min-width: 10rem;
      padding: 0.75rem;
      background-color: #fee2e2;
      border: 1px solid #b91c1c;
    }

    code {
      padding: 0.1em 0.3em;
      background-color: #e2e8f0;
      border-radius: 0.25rem;
      font-family: Consolas, monospace;
    }
  </style>
</head>
<body>
  <main class="page">
    <h1>CSS math functions</h1>
    <p class="intro">
      The boxes below use CSS arithmetic and comparison functions. Resize the
      browser window to see which values change and which limits stay fixed.
    </p>

    <section class="section">
      <h2>1. calc() subtracts a gutter from the available width</h2>
      <div class="track">
        <div class="calc-box">
          width: calc(100% - 2rem)
        </div>
        <div class="half-box">
          width: calc((100% - 2rem) / 2)
        </div>
      </div>
      <p class="hint">
        The first box leaves 1rem on each side. The second subtracts 2rem, then
        divides the remainder by two.
      </p>
    </section>

    <section class="section">
      <h2>2. min() chooses the smaller candidate</h2>
      <div class="comparison-stage">
        <div class="min-box">
          width: min(70%, 30rem)
        </div>
      </div>
      <p class="hint">
        The box uses 70% of the stage until that value would exceed 30rem. It
        then stops growing. The percentage is based on the stage's content width.
      </p>
    </section>

    <section class="section">
      <h2>3. max() chooses the larger candidate</h2>
      <div class="comparison-stage">
        <div class="max-box">
          width: max(10rem, 25%)
        </div>
      </div>
      <p class="hint">
        The box is at least 10rem wide. When 25% of the stage is larger, that
        percentage becomes the used width.
      </p>
    </section>

    <section class="section">
      <h2>4. clamp() bounds fluid type and spacing</h2>
      <h3 class="clamp-heading">Resize to change this heading</h3>
      <p class="hint">
        The font size stays between 1.5rem and 3rem. Its preferred value is
        1rem + 2vw. The padding also grows between 0.75rem and 1.5rem.
      </p>
    </section>

    <section class="section">
      <h2>5. A custom property can be used in a calculation</h2>
      <div class="variable-stage">
        <div class="variable-box">
          This box leaves a shared gutter on each side.
        </div>
      </div>
      <p class="hint">
        The --gutter value is declared once and subtracted twice. Change it in
        the CSS to update both sides together.
      </p>
    </section>

    <section class="section">
      <h2>6. Parentheses change arithmetic order</h2>
      <div class="precedence-demo">
        <p class="formula">calc(2 + 3 * 4) = 14</p>
        <p class="formula">calc((2 + 3) * 4) = 20</p>
      </div>
      <p class="hint">
        Multiplication happens before addition. Parentheses make addition happen
        first in the second expression.
      </p>
    </section>

    <section class="section">
      <h2>7. Incompatible value types make a calculation invalid</h2>
      <div class="invalid-demo">
        This box is at least 10rem wide.
      </div>
      <p class="hint">
        The width declaration tries to add a length and a time, so the browser
        ignores it. The earlier valid width remains, and min-width raises the
        used width to at least 10rem.
      </p>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

The page shows a centered set of white panels:

1. Two blue and purple boxes fit within a dashed track. They leave space according to their calc() expressions.
2. A green box grows with its stage, then stops at 30rem.
3. An orange box stays at least 10rem wide and can grow to 25% of its stage.
4. The heading and its padding change smoothly with viewport width, within their minimum and maximum sizes.
5. A lavender box has matching side gutters controlled by one custom property.
6. Two formulas show the effect of normal operator precedence and parentheses.
7. A pale red box keeps its earlier 8rem width because the later calculation combines incompatible types. Its 10rem min-width sets the effective lower bound.

The exact sizes depend on the viewport and root font size. At a 640px-wide comparison stage with a 16px root size, the calc() boxes are 608px and 304px wide, the min() box is 448px wide, and the max() box is 160px wide.

## Why each example resolves that way

### calc() and percentage references

The first box calculates its width from the track's content width and subtracts 2rem. The second calculates half of the remaining width. The track has no padding, so its content width is the same as its declared width.

### min() caps a growing width

At a 640px stage, 70% is 448px and 30rem is 480px when the root font size is 16px. min() chooses 448px. As the stage grows, the percentage eventually becomes larger than 30rem, and the fixed candidate wins.

### max() guarantees a minimum width

At a 640px stage, 25% is 160px and 10rem is also 160px. max() selects whichever candidate is larger. If the stage becomes narrow enough that the minimum width cannot fit, the box can overflow its parent, so choose a lower bound appropriate for the layout.

### clamp() creates fluid values with bounds

The heading uses 1rem + 2vw as its preferred font size. clamp() keeps it from going below 1.5rem or above 3rem. Its padding uses a separate clamp() with its own range.

### Custom properties share inputs

The variable box subtracts the same gutter twice. The value is stored in --gutter, so changing that one value changes both sides of the calculation.

### Operator precedence

Multiplication is evaluated before addition. Parentheses change the order, making the second expression add 2 and 3 before multiplying by 4.

### Incompatible types

width expects a length or percentage, but 2s is a time. The browser ignores the invalid width declaration. The earlier valid width remains, and min-width raises the used width to at least 10rem.

## Try these changes

1. Change the first calc() gutter from 2rem to 4rem. Observe how both boxes respond.
2. Change min(70%, 30rem) to min(90%, 20rem). Resize the browser and watch the cap.
3. Change max(10rem, 25%) to max(8rem, 35%). Compare the lower limit and percentage.
4. Change the heading's preferred value from 2vw to 4vw. Observe where it reaches its maximum.
5. Change the clamp() minimum to 2rem and compare the smallest heading size.
6. Change --gutter from 1.25rem to 2rem.
7. Remove parentheses from the second formula and recalculate it.
8. Change 2s in the invalid width calculation to 2rem. The width declaration becomes valid.
9. Remove min-width from the final box and observe what happens when its width declaration is invalid.
10. Try using min() on a different property, then confirm what that property's percentage refers to.

## Key points

- calc() performs typed arithmetic and can combine a percentage with a length when the property accepts both.
- Addition and subtraction require spaces on both sides.
- min() chooses the smallest candidate; max() chooses the largest.
- clamp() keeps a preferred value between a minimum and a maximum.
- A percentage inside a math function follows the reference defined by the receiving property.
- Custom properties can make shared calculation inputs easier to maintain.
- Invalid calculations are ignored, so provide a separate valid declaration when a fallback is needed.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [14 - Colors and Color Functions](14-colors-and-color-functions.md) | [Lesson](../lessons/15-css-math-functions.md) | [Q&A](../qnas/15-css-math-functions.md) | [16 - The CSS box model](16-box-model.md) |