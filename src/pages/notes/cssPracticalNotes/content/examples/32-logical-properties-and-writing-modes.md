# 32 - Logical Properties and Writing Modes: Example

## Goal

Create an information card that uses logical spacing, borders, and positioning. Compare a left-to-right card with a right-to-left card, then inspect a vertical-writing sample to see how the inline and block dimensions map to physical width and height.

## Complete example

Copy this code into a file named `index.html` and open it in a browser. The code is displayed for learning and is not executed by this Markdown page.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Logical Properties Demo</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :root {
      color-scheme: light;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #172033;
      background: #f1f5f9;
    }

    body {
      margin: 0;
    }

    .page-shell {
      inline-size: min(100% - 2rem, 68rem);
      margin-inline: auto;
      padding-block: 2rem 4rem;
    }

    h1,
    h2,
    p {
      margin-block-start: 0;
    }

    .page-intro {
      max-inline-size: 48rem;
      margin-block-end: 2rem;
    }

    .card-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
      gap: 1rem;
      align-items: start;
    }

    .notice-card {
      position: relative;
      min-inline-size: 0;
      padding-block: 1.25rem;
      padding-inline: 1.5rem 5rem;
      border: 1px solid #bdc9d6;
      border-inline-start: 0.35rem solid #2563a6;
      border-radius: 0.75rem;
      background: #fff;
      text-align: start;
    }

    .notice-card__status {
      position: absolute;
      inset-block-start: 0.75rem;
      inset-inline-end: 0.75rem;
      padding-block: 0.15rem;
      padding-inline: 0.55rem;
      border-radius: 999px;
      background: #e8f4ee;
      color: #185b3d;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .notice-card__label {
      margin-block-end: 0.25rem;
      color: #42516a;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .notice-card h2 {
      margin-block: 0 0.5rem;
      font-size: 1.35rem;
      line-height: 1.25;
    }

    .notice-card__body {
      margin-block-end: 0.75rem;
      color: #344258;
    }

    .notice-card__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 1rem;
      margin-block: 0;
      color: #42516a;
      font-size: 0.9rem;
    }

    .notice-card__meta div {
      display: flex;
      gap: 0.35rem;
    }

    .notice-card__meta dt {
      font-weight: 700;
    }

    .notice-card__meta dd {
      margin: 0;
    }

    .writing-demo {
      margin-block-start: 2.5rem;
      padding-block-start: 1.5rem;
      border-block-start: 1px solid #bdc9d6;
    }

    .writing-demo__layout {
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      gap: 1.5rem;
    }

    .vertical-sample {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      inline-size: 13rem;
      block-size: 9rem;
      padding-block: 1rem;
      padding-inline: 1rem;
      border: 1px solid #bdc9d6;
      border-inline-start: 0.35rem solid #8352a5;
      border-radius: 0.75rem;
      background: #fff;
      color: #302040;
    }

    .vertical-sample p {
      margin-block-end: 0.75rem;
    }

    .explanation {
      max-inline-size: 34rem;
    }

    .explanation code {
      padding-block: 0.1rem;
      padding-inline: 0.3rem;
      border-radius: 0.25rem;
      background: #e4eaf1;
    }
  </style>
</head>
<body>
  <main class="page-shell">
    <header class="page-intro">
      <p>CSS layout practice</p>
      <h1>Logical properties in a message card</h1>
      <p>
        Compare the two cards. The same CSS follows each card's text direction,
        so its stripe, spacing, and status label move to the appropriate sides.
      </p>
    </header>

    <section class="card-list" aria-label="Travel notices">
      <article class="notice-card" lang="en" dir="ltr">
        <span class="notice-card__status">Updated</span>
        <p class="notice-card__label">Travel update</p>
        <h2>Gate information</h2>
        <p class="notice-card__body">
          The departure gate has changed. Follow the signs to Gate 12.
        </p>
        <dl class="notice-card__meta">
          <div><dt>Flight:</dt><dd>AR 204</dd></div>
          <div><dt>Boarding:</dt><dd>10:40</dd></div>
        </dl>
      </article>

      <article class="notice-card" lang="ar" dir="rtl">
        <span class="notice-card__status">تم التحديث</span>
        <p class="notice-card__label">تحديث السفر</p>
        <h2>معلومات البوابة</h2>
        <p class="notice-card__body">
          يرجى اتباع اللافتات للوصول إلى البوابة الجديدة
          <bdi dir="ltr">Gate 12</bdi>.
        </p>
        <dl class="notice-card__meta">
          <div><dt>الرحلة:</dt><dd><bdi dir="ltr">AR 204</bdi></dd></div>
          <div><dt>الصعود:</dt><dd><bdi dir="ltr">10:40</bdi></dd></div>
        </dl>
      </article>
    </section>

    <section class="writing-demo" aria-labelledby="writing-demo-title">
      <h2 id="writing-demo-title">Vertical writing sample</h2>
      <div class="writing-demo__layout">
        <div class="vertical-sample" lang="ja">
          <p>縦書きの例</p>
          <p>Writing mode</p>
        </div>
        <p class="explanation">
          This sample uses <code>writing-mode: vertical-rl</code>.
          Its inline size is vertical, its block size is horizontal, and
          block start is on the right.
        </p>
      </div>
    </section>
  </main>
</body>
</html>
~~~

## Explanation

- The English card has `dir="ltr"`. Its inline-start stripe and padding appear on the left.
- The Arabic card has `lang="ar" dir="rtl"`. The same `border-inline-start` and `padding-inline` declarations map to the right and follow the text flow.
- The status label uses `inset-block-start` and `inset-inline-end`. It stays at block start and inline end, which places it at the top-right in the English card and top-left in the Arabic card.
- `text-align: start` aligns each card's text with its inline start.
- The mixed English values are wrapped in `<bdi>` so they do not disrupt the surrounding Arabic text direction.
- The vertical sample uses `writing-mode: vertical-rl`. Its inline size maps to physical height, its block size maps to width, and its block flow proceeds from right to left.
- The HTML source order is the reading order. The logical properties change layout edges, not the content sequence.

## Expected output

The page displays two message cards side by side when there is enough room. Both have the same content styling, but the Arabic card's leading border and status placement appear on the opposite physical sides from the English card.

Below the cards, a vertical sample shows Japanese and English text in vertical flow. Its border at block start appears on the right. At a narrow viewport, the cards and writing sample wrap into a single column while preserving their direction and source order.

## What to notice

1. The CSS uses one set of logical properties for both directions.
2. Inline start changes with text direction.
3. Block start depends on writing mode.
4. Logical size properties follow the writing axes.
5. `<bdi>` isolates short text whose direction differs from its surrounding sentence.
6. The HTML `lang` and `dir` attributes describe the language and direction.

## Try these changes

1. Change the Arabic card to `dir="ltr"` and observe the inline mapping. Restore its correct direction afterward.
2. Change the vertical sample to `writing-mode: vertical-lr` and see which physical side becomes block start.
3. Replace `border-inline-start` with `border-left` and compare the cards.
4. Change `inset-inline-end` to `right` and inspect the RTL status label.
5. Change `inline-size` and `block-size` on the vertical sample. Note which physical dimension changes.
6. Remove `<bdi>` around the flight number and compare mixed-direction text rendering.
7. Add longer translated text and check wrapping, spacing, and overflow.

## Key points

- Logical styles follow writing flow; they are not fixed to left, right, top, or bottom.
- `dir` expresses text direction and `writing-mode` determines block flow.
- Logical spacing, borders, and positioning can support multiple directions with one rule set.
- Isolate short mixed-direction values with `<bdi>`.
- Verify layouts with real text and both horizontal and vertical writing modes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [31 - Container Queries](../lessons/31-container-queries.md) | [Lesson](../lessons/32-logical-properties-and-writing-modes.md) | [Q&A](../qnas/32-logical-properties-and-writing-modes.md) | [33 - Backgrounds and Gradients](../lessons/33-backgrounds-and-gradients.md) |
