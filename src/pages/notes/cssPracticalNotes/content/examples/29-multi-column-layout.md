# 29 - Multi-column Layout: Example

## Goal

Create a readable article that flows into columns on wide screens. The example uses a maximum column count with an ideal width, a gap and rule, a full-width section heading, and a callout that asks to stay together.

This is a complete HTML page with its CSS included. Copy it into a file named index.html and open it in a browser. GitHub's Markdown preview provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Multi-column Article</title>
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
      line-height: 1.7;
    }

    body {
      width: min(100% - 2rem, 72rem);
      margin-inline: auto;
      padding-block: 2rem 4rem;
    }

    h1,
    h2,
    h3,
    p,
    figure,
    blockquote {
      margin: 0;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3.25rem);
      line-height: 1.1;
    }

    h2 {
      font-size: 1.6rem;
      line-height: 1.25;
    }

    h3 {
      font-size: 1.1rem;
      line-height: 1.3;
    }

    .page-header {
      display: grid;
      gap: 0.75rem;
      max-inline-size: 68ch;
      margin-block-end: 2rem;
    }

    .eyebrow {
      color: #31577e;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .page-intro {
      color: #42516a;
      font-size: 1.1rem;
    }

    .story {
      columns: 3 18rem;
      column-gap: 2rem;
      column-rule: 1px solid #c3cedb;
      column-fill: balance;
    }

    .story p {
      margin-block-end: 1rem;
      orphans: 2;
      widows: 2;
    }

    .story h2 {
      column-span: all;
      margin-block: 1.5rem 0.75rem;
      padding-block-end: 0.35rem;
      border-block-end: 2px solid #31577e;
    }

    .story h3 {
      margin-block: 1.25rem 0.5rem;
      break-after: avoid-column;
    }

    .story__callout {
      margin-block: 0.5rem 1.25rem;
      padding: 1rem;
      border-inline-start: 4px solid #176243;
      border-radius: 0.25rem;
      background: #e5f3ec;
      color: #183d2d;
      break-inside: avoid-column;
    }

    .story__callout p {
      margin: 0;
    }

    .story__callout strong {
      display: block;
      margin-block-end: 0.25rem;
    }

    .story__closing {
      margin-block-start: 1rem;
      padding: 1rem;
      border: 1px solid #b9c5d4;
      border-radius: 0.5rem;
      background: #fff;
      break-inside: avoid-column;
    }

    .page-footer {
      margin-block-start: 2rem;
      padding-block-start: 1rem;
      border-block-start: 1px solid #b9c5d4;
      color: #42516a;
    }

    @media (max-width: 46rem) {
      .story {
        columns: auto;
        column-rule: none;
      }
    }
  </style>
</head>
<body>
  <header class="page-header">
    <p class="eyebrow">Layout field guide</p>
    <h1>How gardens teach us to notice</h1>
    <p class="page-intro">
      A small garden is a changing system. Watching it closely can teach us
      how to plan, observe, and adapt.
    </p>
  </header>

  <main>
    <article class="story" aria-label="Article about observing a garden">
      <p>
        A garden rarely follows a perfect schedule. A sunny afternoon may
        arrive after several days of rain, a seedling can grow more slowly
        than expected, and a patch of soil may stay damp long after the rest
        has dried. Rather than treating every difference as a problem, a
        gardener can use these changes as information. The first useful tool
        is often careful attention.
      </p>

      <p>
        Start by looking at the same places over time. Notice which areas
        receive morning light, where water gathers, and how the leaves change
        during the week. A short note in a journal can preserve details that
        are easy to forget. Dates, simple measurements, and a quick sketch
        make it easier to compare one season with another.
      </p>

      <p>
        Observation also helps separate a cause from a coincidence. If a
        plant wilts on a hot day, check the soil before adding water. If a
        leaf has a mark, look at nearby leaves and inspect the underside.
        Several small clues together often tell a clearer story than one
        dramatic symptom.
      </p>

      <aside class="story__callout">
        <p>
          <strong>Try this</strong>
          Pick one plant and record its height, the condition of its leaves,
          and the soil moisture on the same day each week.
        </p>
      </aside>

      <h2>Small experiments, useful lessons</h2>

      <p>
        Once a pattern becomes clear, make one small change at a time. Move a
        pot a little farther from a wall, add a thin layer of mulch, or water
        at a different time of day. Keeping other conditions steady makes
        the result easier to understand.
      </p>

      <p>
        A simple experiment does not need special equipment. Choose one
        question, write down what you expect to happen, and decide what
        evidence would support that expectation. After a few days or weeks,
        compare the result with the original notes. The point is not to prove
        that the first guess was right. The point is to learn what the garden
        is showing you.
      </p>

      <h3>Keep the source order clear</h3>

      <p>
        CSS multi-column layout changes how continuous content is displayed,
        but the words and elements remain in their document order. A reader
        can still encounter the first paragraph before the next one, even
        when the paragraphs appear in different visual columns. Meaningful
        headings and a sensible sequence help every reader follow the article.
      </p>

      <p>
        This is one reason columns work well for long-form writing. The text
        remains a single article rather than a collection of unrelated
        boxes. A heading can span the full measure when a new section needs
        extra emphasis, then the following paragraphs can flow into columns
        again.
      </p>

      <h2>Give the layout room to change</h2>

      <p>
        A useful layout adapts when the available width changes. On a wide
        screen, several columns can make a long article easier to scan. On a
        narrow screen, the same columns can make each line too short. A
        comfortable text measure is usually a better goal than keeping the
        same number of columns everywhere.
      </p>

      <p>
        Multi-column layout is not a substitute for every other layout tool.
        A row of comparison cards, a navigation bar, or a form needs specific
        relationships between its items. Those layouts are easier to express
        with Grid or Flexbox. Columns are for content that can continue
        naturally from one line to the next.
      </p>

      <blockquote class="story__closing">
        <p>
          Good layouts make the reading order clear and let the content
          respond to the space available.
        </p>
      </blockquote>
    </article>
  </main>

  <footer class="page-footer">
    <p>Observe carefully. Change one thing. Keep learning.</p>
  </footer>
</body>
</html>
~~~

## Expected output

On a wide screen, the article text flows into up to three columns. A thin rule appears between neighboring columns. The heading “Small experiments, useful lessons” spans the full article width and interrupts the column flow.

The callout asks to stay within one column when it can. The final quotation also requests to stay together. At a narrow viewport, the article returns to one column and the divider disappears.

## Explanation

### Column width and count

The `columns: 3 18rem` shorthand sets an ideal column width and a maximum count of three. The browser determines how many columns fit in the article's available width. The actual columns may adjust their width, so 18rem is a target rather than an exact measurement.

### Gaps and rules

The 2rem `column-gap` separates neighboring columns. The `column-rule` draws a thin line in the middle of each gap. The line is decorative and does not use any of the gap's layout space.

### Spanning heading

The second-level headings use `column-span: all`. The first heading appears before the column flow. The later heading spans across the complete article and divides the text before and after it into separate column sections.

### Break preferences

The subsection heading uses `break-after: avoid-column` to ask that it stay with following content. The callout and quotation use `break-inside: avoid-column` to ask the browser to keep them in one column. These preferences may not be possible when an element is taller than a column.

### Responsive fallback

The media query changes `columns` to `auto` at narrow widths. That resets the column count and width, returning the article to one continuous column. Removing the rule keeps the narrow layout from showing an unnecessary divider.

### Reading order

The HTML source contains the article in the same sequence in which it should be read. The CSS changes its presentation without rearranging the DOM. The heading levels, article element, and meaningful text provide structure independently of the column decoration.

## Key points

- Use multi-column layout for one continuous text flow.
- The browser uses the ideal width and available space to determine a suitable column count.
- A rule is drawn in the gap and does not take up layout space.
- A spanning heading interrupts the multi-column flow.
- Break properties request preferred breaks and can not guarantee that oversized content stays together.
- Use a narrow-screen fallback when the columns become too tight.
- Keep the document source order meaningful.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [28 - Alignment and Gaps](../lessons/28-alignment-and-gaps.md) | [Lesson](../lessons/29-multi-column-layout.md) | [Q&A](../qnas/29-multi-column-layout.md) | [30 - Responsive Design and Media Queries](../lessons/30-responsive-design-and-media-queries.md) |
