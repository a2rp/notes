# 35 - Text layout, spacing, and wrapping - Example

This example demonstrates common text layout choices on one responsive page. It uses only local HTML and CSS, with no external links or assets.

## Question

Create a responsive reading guide that demonstrates:

- A balanced heading and logical text alignment.
- Paragraph width and line spacing.
- Preserved whitespace and wrapping for a visitor message.
- Safe wrapping for a long unbroken identifier.
- Language-aware hyphenation.
- Letter spacing, word spacing, and first-line indentation.

## Complete HTML

Copy this code into an HTML file and open it in a browser to see the page.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Text Layout and Wrapping</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      font-size: 100%;
      color-scheme: light;
      --ink: #202b3c;
      --muted: #56657a;
      --paper: #f2f5f8;
      --surface: #fff;
      --line: #d7e0e9;
      --accent: #165d68;
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
      width: min(100%, 1050px);
      margin-inline: auto;
    }

    .hero,
    .card {
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
    }

    .hero {
      padding: clamp(1.5rem, 5vw, 3.5rem);
      color: #fff;
      background-color: #143b48;
    }

    .eyebrow {
      color: #176677;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .hero .eyebrow {
      color: #b7e3e5;
    }

    .hero h1 {
      max-width: 17ch;
      margin-top: 0.7rem;
      font-size: clamp(2.3rem, 6vw, 4.4rem);
      line-height: 1.05;
      text-wrap: balance;
    }

    .hero p:last-child {
      max-width: 62ch;
      margin-top: 1rem;
      color: #e1eef0;
    }

    .section {
      margin-top: 2.5rem;
    }

    .section > h2 {
      font-size: clamp(1.5rem, 3vw, 2.1rem);
      line-height: 1.2;
    }

    .section__intro {
      max-width: 68ch;
      margin-top: 0.5rem;
      color: var(--muted);
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      margin-top: 1.25rem;
    }

    .card {
      min-width: 0;
      padding: clamp(1rem, 3vw, 1.5rem);
    }

    .card h3 {
      margin-top: 0.4rem;
      font-size: 1.15rem;
      line-height: 1.3;
    }

    .card p {
      margin-top: 0.8rem;
      color: #354154;
    }

    .reading-copy {
      max-width: 62ch;
      line-height: 1.75;
    }

    .centered-copy {
      text-align: center;
    }

    .preserved-message {
      padding: 0.85rem;
      border-inline-start: 4px solid var(--accent);
      border-radius: 0.35rem;
      background-color: #edf5f5;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .long-identifier {
      padding: 0.8rem;
      border: 1px dashed #8ea3b7;
      border-radius: 0.5rem;
      background-color: #f5f8fb;
      font-family: Consolas, "Courier New", monospace;
      overflow-wrap: anywhere;
    }

    .identifier-full {
      margin-top: 0.65rem;
      color: var(--muted);
      font-size: 0.9rem;
      overflow-wrap: anywhere;
    }

    .hyphenation-copy {
      max-width: 25ch;
      hyphens: auto;
    }

    .spacing-sample {
      color: #354154;
      letter-spacing: 0.035em;
      word-spacing: 0.12em;
    }

    .indented-copy {
      max-width: 62ch;
      text-indent: 1.5em;
    }

    .logical-sample {
      padding: 0.85rem;
      border-inline-start: 4px solid #b45f06;
      background-color: #fff6e7;
      text-align: start;
    }

    .single-line-badge {
      display: inline-block;
      max-width: 100%;
      margin-top: 0.8rem;
      padding: 0.3rem 0.6rem;
      border-radius: 999px;
      color: #10434c;
      background-color: #d9eff0;
      font-size: 0.85rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .closing-note {
      margin-top: 2rem;
      color: var(--muted);
      font-size: 0.9rem;
    }

    @supports (text-wrap: pretty) {
      .reading-copy {
        text-wrap: pretty;
      }
    }

    @media (max-width: 680px) {
      .card-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">CSS text layout</p>
      <h1>Let the words fit the space</h1>
      <p>
        Text needs room to wrap, readable line spacing, and alignment that
        follows its language. These examples show a few tools for handling it.
      </p>
    </header>

    <section class="section" aria-labelledby="reading-heading">
      <h2 id="reading-heading">Comfortable reading</h2>
      <p class="section__intro">
        A sensible line width and enough line height make longer passages
        easier to follow.
      </p>

      <div class="card-grid">
        <article class="card">
          <p class="eyebrow">Width and line height</p>
          <h3>Keep the line measure comfortable</h3>
          <p class="reading-copy">
            A paragraph that stretches across a very wide screen can be hard
            to track from line to line. Limiting its width gives each line a
            more manageable measure. Flexible line height adds room between
            lines without fixing the text to a specific pixel height.
          </p>
        </article>

        <article class="card">
          <p class="eyebrow">Text alignment</p>
          <h3>Center short supporting copy</h3>
          <p class="centered-copy">
            This short paragraph is centered inside its card. Longer reading
            paragraphs are usually easier to scan when aligned to the start.
          </p>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="wrapping-heading">
      <h2 id="wrapping-heading">Whitespace and long strings</h2>
      <p class="section__intro">
        Most content should wrap normally. Preserve line breaks when they
        matter, and handle long unbroken strings where they can appear.
      </p>

      <div class="card-grid">
        <article class="card">
          <p class="eyebrow">Preserved message</p>
          <h3>Keep visitor line breaks</h3>
          <p class="preserved-message">Hi team,

I can join at 10:30.
Here is my note: this-is-a-very-long-reference-token-that-needs-to-wrap-on-a-small-screen.</p>
        </article>

        <article class="card">
          <p class="eyebrow">Emergency wrapping</p>
          <h3>Prevent a long identifier from stretching the card</h3>
          <p class="long-identifier">order_reference_2026_customer_884129_section_b_final_record_0007</p>
          <p class="identifier-full">
            The complete identifier remains visible here and wraps at an
            emergency opportunity if the column is narrow.
          </p>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="details-heading">
      <h2 id="details-heading">Small adjustments</h2>
      <p class="section__intro">
        Spacing and hyphenation depend on the font, language, and available
        width. Check the result with real content.
      </p>

      <div class="card-grid">
        <article class="card">
          <p class="eyebrow">Hyphenation</p>
          <h3>Allow language-aware word breaks</h3>
          <p class="hyphenation-copy" lang="en">
            Internationalization helps the browser identify appropriate
            hyphenation points when a word must fit into a narrow measure.
          </p>
        </article>

        <article class="card">
          <p class="eyebrow">Spacing and indentation</p>
          <h3>Keep adjustments modest</h3>
          <p class="spacing-sample">
            A little spacing can distinguish a short label without making a
            whole paragraph harder to read.
          </p>
          <p class="indented-copy">
            This paragraph has a first-line indent. The following lines start
            at the same edge as the rest of the text block.
          </p>
        </article>

        <article class="card">
          <p class="eyebrow">Logical alignment</p>
          <h3>Align with the writing direction</h3>
          <p class="logical-sample" dir="rtl" lang="ar">
            هذا مثال قصير يوضح محاذاة النص مع بداية اتجاه الكتابة.
          </p>
        </article>

        <article class="card">
          <p class="eyebrow">No-wrap label</p>
          <h3>Keep a short badge together</h3>
          <p>
            No-wrap is useful for a short label when its container can still
            fit it. Avoid applying it to long paragraphs.
          </p>
          <span class="single-line-badge">Open until Friday</span>
        </article>
      </div>
    </section>

    <p class="closing-note">
      Resize the page and increase browser zoom. The cards should stack, long
      strings should wrap, and the text should remain available.
    </p>
  </main>
</body>
</html>
~~~

## Explanation

### Reading width and alignment

The article paragraph has a maximum width and a flexible line height. The centered paragraph is short supporting text. Its alignment is a design choice, while longer reading content is usually easier to track when aligned to the start edge.

The heading uses `text-wrap: balance` to improve the distribution of lines in a short block. The paragraph uses `text-wrap: pretty` inside an `@supports` rule, so browsers that do not recognize it keep the normal wrapping behavior.

### Preserved whitespace and long strings

The visitor message uses `white-space: pre-wrap`, so its source line breaks and repeated spaces are preserved while the text can still wrap. It also uses `overflow-wrap: anywhere` in case a long token appears.

The long identifier uses emergency wrapping on its own. This keeps other paragraphs' ordinary word-breaking behavior.

### Language and hyphenation

The hyphenation sample has `lang="en"`, which identifies its language. The browser may add language-appropriate hyphens if it has the necessary hyphenation resources. Results can vary, so the example should still make sense if no hyphen appears.

The Arabic sample uses `lang="ar"` and `dir="rtl"`. Its `text-align: start` and inline-start border follow its writing direction.

### Spacing and no-wrap

The spacing sample uses small adjustments. The indented paragraph uses `text-indent` only on its first line. The badge uses `white-space: nowrap` because its content is short and its container can fit it.

## Expected output

The page starts with a dark green banner and a large heading. Below it are light cards with a readable paragraph, a centered short paragraph, a preserved visitor message, a long identifier that wraps, a narrow hyphenation sample, spacing examples, an Arabic right-to-left sample, and a compact badge.

At wide widths the cards appear in two columns. At narrow widths they stack in one column. The long message and identifier remain inside their cards, and the text stays visible rather than being clipped.

The markdown displays the source as code. Copy it into an HTML file and open that file in a browser to view the described page.

## Try it yourself

1. Remove `white-space: pre-wrap` and compare the visitor message's line breaks.
2. Remove `overflow-wrap: anywhere` from the long identifier and make the card narrower.
3. Change the Arabic sample's `dir` to `ltr` and compare the start edge.
4. Compare the paragraph with and without `text-align: justify`.
5. Increase letter spacing slightly, then reduce it again and compare readability.
6. Increase browser zoom and verify that the cards and text remain usable.

## Key points

- Normal text should be allowed to wrap at ordinary opportunities.
- Preserve whitespace only when its spacing or line breaks are meaningful.
- Use emergency wrapping on long identifiers and other unbroken strings.
- Language information helps browser text processing, including hyphenation.
- Logical alignment follows writing direction.
- Check the result at narrow widths and increased zoom.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [34 - Fonts and typography](../lessons/34-fonts-and-typography.md) | [Lesson](../lessons/35-text-layout-and-wrapping.md) | [Q&A](../qnas/35-text-layout-and-wrapping.md) | [36 - Lists and markers](../lessons/36-lists-and-markers.md) |
