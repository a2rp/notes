# 23 - Z-index and Stacking Contexts: Example

## Goal

Compare two overlapping layouts. The first shows why a child with a very large `z-index` can still appear behind a sibling. The second fixes the order by changing the parent's stacking context.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Z-index and Stacking Contexts</title>
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
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
    }

    .intro {
      max-width: 65ch;
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
      box-shadow: 0 0.4rem 1.5rem rgb(15 23 42 / 6%);
    }

    .demo-section > p {
      margin-bottom: 1rem;
      color: #475569;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .demo-card {
      min-width: 0;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.6rem;
      background: #f8fafc;
    }

    .demo-card > p {
      min-height: 3rem;
      margin-bottom: 0.5rem;
      color: #475569;
      font-size: 0.9rem;
    }

    .stage {
      position: relative;
      min-height: 14rem;
      overflow: visible;
      border: 1px dashed #94a3b8;
      border-radius: 0.5rem;
      background-color: #e2e8f0;
      background-image:
        linear-gradient(45deg, rgb(255 255 255 / 55%) 25%, transparent 25%),
        linear-gradient(-45deg, rgb(255 255 255 / 55%) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgb(255 255 255 / 55%) 75%),
        linear-gradient(-45deg, transparent 75%, rgb(255 255 255 / 55%) 75%);
      background-position: 0 0, 0 0.5rem, 0.5rem -0.5rem, -0.5rem 0;
      background-size: 1rem 1rem;
    }

    .card-context {
      position: absolute;
      inset-block-start: 2rem;
      inset-inline-start: 1rem;
      z-index: 1;
      width: 62%;
      min-height: 9rem;
      padding: 1rem;
      border: 2px solid #1d4ed8;
      border-radius: 0.6rem;
      background: #dbeafe;
      box-shadow: 0 0.4rem 0.8rem rgb(15 23 42 / 14%);
    }

    .card-context h3 {
      max-width: 10rem;
      color: #1e3a8a;
    }

    .card-context p {
      max-width: 15rem;
      color: #334155;
      font-size: 0.85rem;
    }

    .badge {
      position: absolute;
      inset-block-start: 0.75rem;
      inset-inline-end: -1rem;
      z-index: 9999;
      padding: 0.4rem 0.6rem;
      border: 2px solid #fff;
      border-radius: 999px;
      background: #0f766e;
      box-shadow: 0 0.25rem 0.6rem rgb(15 23 42 / 25%);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .menu-context {
      position: absolute;
      inset-block-start: 3rem;
      inset-inline-start: 38%;
      z-index: 2;
      display: grid;
      align-content: center;
      width: 57%;
      min-height: 5rem;
      padding: 0.75rem;
      border: 2px solid #9a3412;
      border-radius: 0.6rem;
      background: #ffedd5;
      box-shadow: 0 0.5rem 1rem rgb(15 23 42 / 20%);
      color: #7c2d12;
      font-weight: 700;
    }

    .stage--card-in-front .card-context {
      z-index: 3;
    }

    .stage-label {
      position: absolute;
      inset-block-end: 0.5rem;
      inset-inline-start: 0.75rem;
      color: #475569;
      font-size: 0.75rem;
    }

    .note {
      margin-top: 1rem;
      padding: 1rem;
      border-inline-start: 4px solid #0f766e;
      border-radius: 0.25rem;
      background: #ecfeff;
    }

    .note h2 {
      font-size: 1.2rem;
    }

    .note p {
      max-width: 75ch;
    }

    code {
      padding: 0.1em 0.3em;
      border-radius: 0.25rem;
      background: #e2e8f0;
      font-family: Consolas, monospace;
    }

    @media (max-width: 48rem) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 27rem) {
      .demo-section {
        padding: 0.75rem;
      }

      .stage {
        min-height: 12rem;
      }

      .card-context {
        width: 68%;
        padding: 0.75rem;
      }

      .menu-context {
        inset-inline-start: 36%;
        width: 60%;
        font-size: 0.85rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Z-index and Stacking Contexts</h1>
    <p class="intro">
      Compare the two panels. In both, the badge has a very large z-index. The
      difference is the stack level of its parent card.
    </p>
  </header>

  <main>
    <section class="demo-section" aria-labelledby="comparison-title">
      <h2 id="comparison-title">The parent context sets the limit</h2>
      <p>
        The card and menu each create a stacking context. The badge is inside the
        card, so the browser compares the card group with the menu group before
        comparing the badge with anything outside its card.
      </p>

      <div class="demo-grid">
        <article class="demo-card">
          <h3>Card context at level 1</h3>
          <p>
            The menu context is at level 2, so it paints in front of this whole card.
          </p>

          <div class="stage">
            <div class="card-context">
              <span class="badge">Badge 9999</span>
              <h3>Card content</h3>
              <p>The badge is inside this local stacking context.</p>
            </div>
            <div class="menu-context">Menu context 2</div>
            <span class="stage-label">The orange menu covers part of the badge.</span>
          </div>
        </article>

        <article class="demo-card">
          <h3>Card context raised to level 3</h3>
          <p>
            The card group is now above the menu context at level 2.
          </p>

          <div class="stage stage--card-in-front">
            <div class="card-context">
              <span class="badge">Badge 9999</span>
              <h3>Card content</h3>
              <p>The badge stays in front within the raised card group.</p>
            </div>
            <div class="menu-context">Menu context 2</div>
            <span class="stage-label">The blue card and its badge cover the menu.</span>
          </div>
        </article>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="rules-title">
      <h2 id="rules-title">What the CSS is teaching</h2>
      <p>
        An integer z-index on a positioned element creates a stacking context. The
        browser compares these contexts at their parent level. The child's 9999 is
        meaningful inside the card, but it cannot jump above a sibling context that
        is painted later.
      </p>
      <p>
        Raising the card to level 3 moves its entire group in front of the menu at
        level 2. The badge keeps its own local level within the card.
      </p>
    </section>

    <aside class="note" aria-labelledby="debug-title">
      <h2 id="debug-title">Debugging tip</h2>
      <p>
        When a z-index change seems to do nothing, inspect the ancestors of both
        overlapping elements. Look for positioned z-index values, transforms,
        opacity below 1, isolation, and other stacking-context creators. Also check
        whether overflow is clipping the element, since z-index does not remove a clip.
      </p>
    </aside>
  </main>
</body>
</html>
~~~

## Expected output

- Two side-by-side panels on a wide screen, stacked vertically on a narrow screen.
- Each panel shows a blue card overlapping an orange menu.
- In the first panel, the orange menu is in front of part of the badge. The card context is at level 1 and the menu context is at level 2.
- In the second panel, the blue card and its badge are in front of the orange menu. The card context is at level 3, while the menu remains at level 2.
- The badge still uses `z-index`: 9999 in both panels. Raising the parent card context changes which group is painted in front.

## Explanation

The card uses `position`: `absolute` and `z-index`: 1, so it creates a stacking context. The badge is a positioned descendant of that card and uses `z-index`: 9999. The menu is a separate positioned sibling with `z-index`: 2.

In the first stage, the browser compares the card context at level 1 with the menu context at level 2. The menu context is in front. The browser does not compare the badge's 9999 directly against the menu's 2 because those values belong to different stacking contexts.

In the second stage, the card's `z-index` changes to 3. The browser now paints the card group in front of the menu group. Inside the card context, the badge is painted above the card content.

The number 9999 is intentionally excessive here to make the lesson visible. In real interfaces, use a small, planned scale and inspect the stacking-context ancestors before adding larger values. A high value cannot escape a parent context, and no `z-index` value removes clipping caused by `overflow`.

## Key points

- A positioned element with an integer `z-index` creates a stacking context.
- A stacking context is compared as one group in its parent.
- A descendant's `z-index` is local to its own stacking context.
- Raise the parent context when the whole group needs to appear above a sibling group.
- Check clipping separately because `z-index` does not undo `overflow` clipping.
- Keep HTML source and focus order meaningful even when visual layers overlap.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [22 - Positioning Elements](22-positioning.md) | [Lesson](../lessons/23-z-index-and-stacking-contexts.md) | [Q&A](../qnas/23-z-index-and-stacking-contexts.md) | [24 - Overflow and Scrolling](24-overflow-and-scrolling.md) |
