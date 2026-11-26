# 18 - Margin and Padding: Example

## Goal

Use a small page to see inner space, outer space, shorthand values, margin collapsing, negative margins, auto margins, and percentage spacing.

Copy the complete HTML into a file named `index.html` and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Margin and Padding</title>
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
      width: min(100% - 2rem, 70rem);
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
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    p + p {
      margin-top: 0.75rem;
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
      padding: 1rem;
      border: 1px solid #cbd5e1;
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

    .label {
      display: inline-block;
      margin-bottom: 0.5rem;
      color: #475569;
      font-size: 0.9rem;
      font-weight: 700;
    }

    .space-demo {
      margin: 1rem 0;
      padding: 1rem;
      border: 3px dashed #2563eb;
      background: #dbeafe;
    }

    .space-demo__content {
      padding: 1rem;
      border: 2px solid #0f766e;
      background: #ccfbf1;
    }

    .space-demo__content p {
      margin-top: 0.5rem;
    }

    .shorthand-list {
      display: grid;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .shorthand-list > div {
      padding: 0.75rem;
      border-left: 4px solid #7c3aed;
      background: #f5f3ff;
    }

    .collapse-demo {
      margin-top: 1rem;
    }

    .collapse-card {
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      color: #fff;
    }

    .positive-first {
      margin-bottom: 2rem;
      background: #2563eb;
    }

    .positive-second {
      margin-top: 1.25rem;
      background: #0f766e;
    }

    .negative-first {
      margin-bottom: 1.75rem;
      background: #7c3aed;
    }

    .negative-second {
      margin-top: -0.625rem;
      background: #be123c;
    }

    .parent-demo {
      margin-top: 1rem;
    }

    .parent-box {
      background: #e0f2fe;
    }

    .parent-box p {
      margin-top: 1.5rem;
      padding: 0.75rem;
      background: #bae6fd;
    }

    .contained-parent {
      display: flow-root;
      margin-top: 1rem;
      background: #dcfce7;
    }

    .contained-parent p {
      margin-top: 1.5rem;
      padding: 0.75rem;
      background: #bbf7d0;
    }

    .center-stage {
      padding: 1rem;
      border: 2px dashed #94a3b8;
      background: #f8fafc;
    }

    .centered-card {
      width: min(100%, 30rem);
      margin-inline: auto;
      padding: 1rem;
      border: 2px solid #0f766e;
      border-radius: 0.5rem;
      background: #ccfbf1;
    }

    .percentage-stage {
      width: min(100%, 37.5rem);
      background: #fef3c7;
    }

    .percentage-card {
      margin: 5%;
      padding: 5%;
      border: 2px solid #b45309;
      background: #fff;
    }

    .logical-card {
      margin-block: 1rem;
      padding-block: 0.75rem;
      padding-inline: 1rem;
      border-inline-start: 0.35rem solid #7c3aed;
      background: #f5f3ff;
    }

    .note {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      border-left: 4px solid #d97706;
      background: #fffbeb;
      color: #78350f;
    }

    .exercise-list {
      margin-block: 0.75rem 0;
      padding-left: 1.5rem;
    }

    .exercise-list li + li {
      margin-top: 0.35rem;
    }

    @media (max-width: 40rem) {
      body {
        width: min(100% - 1.25rem, 70rem);
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
    <h1>Margin and Padding</h1>
    <p class="intro">
      Padding creates room inside a box. Margin creates room around a box.
      The colored examples below make the difference visible.
    </p>
  </header>

  <main>
    <section class="demo-section" aria-labelledby="box-space-heading">
      <h2 id="box-space-heading">1. Inner space and outer space</h2>
      <p>
        The dashed blue line is the border. The pale blue area inside it is padding,
        and the green area is the content box. The empty space outside the line
        is margin.
      </p>
      <span class="label">The outer box has margin: 1rem 0 and padding: 1rem</span>
      <div class="space-demo">
        <div class="space-demo__content">
          <strong>Content sits inside the padding.</strong>
          <p>
            The background is painted behind the content and padding. The
            transparent margin leaves space outside the border.
          </p>
        </div>
      </div>
      <p>
        A border is drawn between padding and margin. Remove the border in the
        CSS and the two kinds of space still have different jobs.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="shorthand-heading">
      <h2 id="shorthand-heading">2. Shorthand value order</h2>
      <p>
        Margin and padding use the same clockwise mapping, starting at the top.
      </p>
      <pre><code>padding: 12px;                  /* all four sides */
padding: 8px 16px;             /* top/bottom, left/right */
padding: 4px 12px 20px;        /* top, left/right, bottom */
padding: 2px 8px 12px 16px;   /* top, right, bottom, left */</code></pre>
      <div class="shorthand-list">
        <div><code>margin: 12px;</code> sets all four margins to 12px.</div>
        <div><code>margin: 8px 16px;</code> sets top and bottom to 8px, and left and right to 16px.</div>
        <div><code>margin: 4px 12px 20px;</code> sets top to 4px, left and right to 12px, and bottom to 20px.</div>
        <div><code>margin: 2px 8px 12px 16px;</code> sets top, right, bottom, and left in that order.</div>
      </div>
      <p class="note">
        A shorthand sets every side. If a later shorthand follows a longhand,
        the shorthand can replace that side's earlier value.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="collapse-heading">
      <h2 id="collapse-heading">3. Adjacent vertical margins can collapse</h2>
      <p>
        These are normal block siblings. Their touching vertical margins
        collapse instead of adding together.
      </p>
      <div class="collapse-demo">
        <div class="collapse-card positive-first">
          First block: margin-bottom is 32px.
        </div>
        <div class="collapse-card positive-second">
          Second block: margin-top is 20px. The visible gap is 32px, the larger margin.
        </div>
      </div>
      <p>
        With one positive and one negative margin, the positive value is reduced
        by the negative value's size.
      </p>
      <div class="collapse-demo">
        <div class="collapse-card negative-first">
          First block: margin-bottom is 28px.
        </div>
        <div class="collapse-card negative-second">
          Second block: margin-top is -10px. The visible gap is 18px.
        </div>
      </div>
      <p class="note">
        Margin collapsing applies to certain adjoining vertical margins in
        normal block flow. It does not happen between flex or grid items.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="parent-heading">
      <h2 id="parent-heading">4. A first child's margin can collapse through its parent</h2>
      <p>
        The first paragraph has a 24px top margin. In the first box there is no
        border, top padding, inline content, or new formatting context to stop
        that margin from collapsing with the parent.
      </p>
      <div class="parent-demo">
        <div class="parent-box">
          <p>First child in a normal block parent</p>
        </div>
        <div class="parent-box contained-parent">
          <p>First child in a parent with display: flow-root</p>
        </div>
      </div>
      <p>
        <code>display: flow-root</code> creates a formatting context, so the
        second parent's child margin stays inside the parent. A border or top
        padding can also separate parent and child margins.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="auto-heading">
      <h2 id="auto-heading">5. Center a constrained block with auto margins</h2>
      <p>
        The card has a maximum width. Its automatic inline margins share the
        remaining horizontal space.
      </p>
      <div class="center-stage">
        <div class="centered-card">
          <strong>Centered card</strong>
          <p>
            This block uses <code>width: min(100%, 30rem)</code> and
            <code>margin-inline: auto</code>. Resize the browser to see it stay
            within its container.
          </p>
        </div>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="percent-heading">
      <h2 id="percent-heading">6. Percentage margin and padding</h2>
      <p>
        Every percentage in this card's margin and padding is based on the
        containing block's width, including the top and bottom values.
      </p>
      <div class="center-stage percentage-stage">
        <div class="percentage-card">
          <strong>Five percent spacing</strong>
          <p>
            At a 600px containing-block width, 5% is 30px. The block margin and
            padding on the top and bottom are each 30px in that case.
          </p>
        </div>
      </div>
      <p class="note">
        The containing block can become narrower when the viewport shrinks, so
        percentage spacing changes with it.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="logical-heading">
      <h2 id="logical-heading">7. Logical spacing properties</h2>
      <p>
        Logical properties describe the start and end directions instead of
        naming physical sides.
      </p>
      <div class="logical-card">
        This box uses <code>margin-block</code>,
        <code>padding-block</code>, <code>padding-inline</code>, and
        <code>border-inline-start</code>.
      </div>
      <p>
        These properties adapt more naturally when a document uses a different
        writing direction or writing mode.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="practice-heading">
      <h2 id="practice-heading">Try it yourself</h2>
      <ol class="exercise-list">
        <li>Change the first card's padding and observe how its content moves.</li>
        <li>Set both positive sibling margins to 24px. The collapsed gap remains 24px.</li>
        <li>Change the negative margin to -16px. The gap between the blocks becomes 12px.</li>
        <li>Remove <code>display: flow-root</code> from the second parent and compare the child margin.</li>
        <li>Change the percentage spacing from 5% to 8%, then resize the browser.</li>
        <li>Change the centered card's maximum width and compare it with the container.</li>
      </ol>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

A single responsive page displays several spacing demonstrations:

- A dashed blue margin area around a padded content box.
- Four-value shorthand examples with their side mappings.
- Two pairs of normal block siblings showing positive and mixed positive/negative margin collapse.
- Two parent examples comparing a collapsing child margin with a parent using `display: flow-root`.
- A max-width card centered with automatic inline margins.
- A card whose percentage margins and padding can be compared as the viewport changes.
- A logical-properties example using block and inline directions.

The page does not need external files or a script.

## Explanation

The first demonstration separates the box model's layers: margin is outside the border, padding is between the border and content, and the background is painted behind the content and padding.

The shorthand section shows how one, two, three, and four values map to sides. Both `margin` and `padding` use the same mapping. A shorthand also assigns values to all four sides.

The sibling blocks are ordinary block boxes in normal flow. Their adjacent vertical margins collapse: 32px with 20px leaves a 32px gap, while 28px with -10px leaves an 18px gap. The parent comparison shows how `flow-root` prevents a first child's margin from collapsing through its parent.

Automatic inline margins center the constrained card when the containing block has extra width. The percentage example makes the containing-block rule visible: its top and bottom percentages are based on the containing block's width too.

## Key points

- Padding creates space inside the border. Margin creates space outside it.
- Margin and padding shorthands map values clockwise from the top.
- Some adjacent vertical margins collapse in normal block flow.
- A negative margin can reduce a collapsed gap or pull boxes together.
- A new formatting context, border, or padding can prevent certain parent-child margin collapsing.
- Auto inline margins can center a block when its width is constrained.
- Percentage margins and padding on all physical sides use the containing block's width.
- Logical properties express spacing by block and inline direction.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [17 - Width, Height, and Sizing](17-width-height-and-sizing.md) | [Lesson](../lessons/18-margin-and-padding.md) | [Q&A](../qnas/18-margin-and-padding.md) | [19 - Borders, Outlines, and Shadows](19-borders-outlines-and-shadows.md) |
