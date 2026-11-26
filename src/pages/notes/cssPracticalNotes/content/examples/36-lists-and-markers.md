# 36 - Lists and markers - Example

This example creates a responsive workshop page with unordered, ordered, nested, and description lists. CSS changes marker appearance and spacing while the HTML keeps each list's meaning.

## Question

Build a page that shows:

- An unordered list for a group of workshop items.
- An ordered list for a sequence of schedule steps.
- A nested list with a distinct marker style.
- A custom marker styled with `::marker`.
- A description list that changes layout on a narrow screen.

## Complete HTML

Copy the code into an HTML file and open it in a browser to see the page.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Lists and Markers</title>
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
      --ink: #1f2b3a;
      --muted: #5d6b7b;
      --paper: #f3f6f8;
      --surface: #fff;
      --line: #dbe3e9;
      --accent: #176b55;
      --accent-soft: #e8f4ef;
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

    .hero {
      padding: clamp(1.5rem, 5vw, 3.5rem);
      border-radius: 1.25rem;
      color: #fff;
      background-color: #16443d;
    }

    .eyebrow {
      color: #176b55;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    .hero .eyebrow {
      color: #bce8d5;
    }

    .hero h1 {
      max-width: 16ch;
      margin-top: 0.5rem;
      font-size: clamp(2.25rem, 6vw, 4rem);
      line-height: 1.1;
    }

    .hero p:last-child {
      max-width: 62ch;
      margin-top: 1rem;
      color: #e0eee8;
    }

    .section {
      margin-top: 2.5rem;
    }

    .section > h2 {
      font-size: clamp(1.5rem, 3vw, 2rem);
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
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
    }

    .card h3 {
      margin-top: 0.4rem;
      font-size: 1.2rem;
      line-height: 1.3;
    }

    .card > p:not(.eyebrow) {
      margin-top: 0.75rem;
      color: #405064;
    }

    .bring-list {
      padding-inline-start: 1.4rem;
      margin-block-start: 1rem;
      list-style: square outside;
    }

    .bring-list > li::marker {
      color: var(--accent);
      font-size: 1.1em;
    }

    .bring-list > li + li {
      margin-block-start: 0.5rem;
    }

    .agenda-list {
      padding-inline-start: 1.7rem;
      margin-block-start: 1rem;
      list-style: decimal-leading-zero outside;
    }

    .agenda-list > li::marker {
      color: #175c91;
      font-weight: 700;
    }

    .agenda-list > li + li {
      margin-block-start: 0.65rem;
    }

    .inside-list {
      padding-inline-start: 0.5rem;
      margin-block-start: 1rem;
      list-style: lower-alpha inside;
    }

    .inside-list > li + li {
      margin-block-start: 0.75rem;
    }

    .inside-list > li {
      padding: 0.55rem;
      border-radius: 0.45rem;
      background-color: #f1f5f8;
    }

    .inside-list > li::marker {
      color: #7447a8;
      font-weight: 700;
    }

    .nested-list {
      padding-inline-start: 1.35rem;
      margin-block-start: 0.3rem;
      list-style-type: circle;
    }

    .nested-list > li + li {
      margin-block-start: 0.2rem;
    }

    .completed-list {
      padding-inline-start: 1.3rem;
      margin-block-start: 1rem;
      list-style: none;
    }

    .completed-list > li::marker {
      content: "✓  ";
      color: var(--accent);
      font-weight: 700;
    }

    .completed-list > li + li {
      margin-block-start: 0.45rem;
    }

    .glossary {
      display: grid;
      grid-template-columns: minmax(8rem, 1fr) 2fr;
      gap: 0.75rem 1.25rem;
      margin-block-start: 1rem;
    }

    .glossary dt {
      font-weight: 700;
    }

    .glossary dd {
      color: #405064;
    }

    .closing-note {
      margin-block-start: 2rem;
      color: var(--muted);
      font-size: 0.9rem;
    }

    @media (max-width: 680px) {
      .card-grid {
        grid-template-columns: 1fr;
      }

      .glossary {
        grid-template-columns: 1fr;
        gap: 0.2rem;
      }

      .glossary dd {
        margin-block-end: 0.7rem;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">A short planning guide</p>
      <h1>Prepare for a weekend workshop</h1>
      <p>
        The lists below group items, show an ordered schedule, and explain
        workshop terms. Their HTML structure describes how each group works.
      </p>
    </header>

    <section class="section" aria-labelledby="prepare-heading">
      <h2 id="prepare-heading">Prepare and plan</h2>
      <p class="section__intro">
        Markers can be styled to make each kind of list easier to scan while
        keeping its content as ordinary HTML text.
      </p>

      <div class="card-grid">
        <article class="card">
          <p class="eyebrow">Unordered list</p>
          <h3>What to bring</h3>
          <p>The order of these items does not matter.</p>
          <ul class="bring-list">
            <li>A notebook and a pen</li>
            <li>A reusable water bottle</li>
            <li>Comfortable clothes for the studio</li>
          </ul>
        </article>

        <article class="card">
          <p class="eyebrow">Ordered list</p>
          <h3>Morning schedule</h3>
          <p>These steps happen in sequence.</p>
          <ol class="agenda-list">
            <li>Check in and choose a work table</li>
            <li>Review the materials with the group</li>
            <li>Begin the first guided exercise</li>
          </ol>
        </article>

        <article class="card">
          <p class="eyebrow">Nested lists</p>
          <h3>Choose a session</h3>
          <p>The activities belong to a particular session.</p>
          <ol class="inside-list">
            <li>
              Drawing
              <ul class="nested-list">
                <li>Shapes and shadows</li>
                <li>Line and texture</li>
              </ul>
            </li>
            <li>
              Printmaking
              <ul class="nested-list">
                <li>Prepare a simple block</li>
                <li>Make a small edition</li>
              </ul>
            </li>
          </ol>
        </article>

        <article class="card">
          <p class="eyebrow">Custom marker</p>
          <h3>Completed arrangements</h3>
          <p>The text states what is complete; the check mark reinforces it.</p>
          <ul class="completed-list">
            <li>Done: Reserve the studio</li>
            <li>Done: Prepare the shared materials</li>
            <li>Done: Send the arrival details</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="glossary-heading">
      <h2 id="glossary-heading">Workshop glossary</h2>
      <p class="section__intro">
        A description list pairs each term with its explanation.
      </p>

      <article class="card">
        <dl class="glossary">
          <dt>Demo</dt>
          <dd>A short demonstration of a technique before participants try it.</dd>

          <dt>Edition</dt>
          <dd>A group of prints made from the same prepared design.</dd>

          <dt>Open studio</dt>
          <dd>Time for independent work with a facilitator available to help.</dd>
        </dl>
      </article>
    </section>

    <p class="closing-note">
      Resize the browser to see the cards and glossary switch to a single
      column. The lists keep their semantic structure at every width.
    </p>
  </main>
</body>
</html>
~~~

## Explanation

### Unordered and ordered lists

The packing list uses `<ul>` because its items do not have a required order. The agenda uses `<ol>` because the steps form a sequence. CSS changes the agenda marker to a decimal with leading zeroes without typing those numbers into the HTML.

### Nested list styles

The outer ordered list uses lowercase letters, and its child unordered lists use circles. The styles target the list containers so the nested lists can keep their own marker type.

The direct-child selectors for the outer list items avoid unintentionally styling the inner list items.

### Marker placement and appearance

The agenda uses outside markers, which leave wrapped lines aligned with the item text. The session list uses inside markers to show how the marker participates in the first content line.

The completed list uses `::marker` for a green check. Each item's text also says "Done", so the state is not conveyed by the symbol alone.

### Description list

The glossary uses `<dl>` with terms in `<dt>` elements and their explanations in `<dd>` elements. Grid lays the pairs out in two columns on wider screens. On smaller screens, the terms and descriptions stack in one column.

## Expected output

The page begins with a dark green workshop banner. Beneath it are four light cards in two columns: a square-marker packing list, a zero-padded numbered schedule, a nested activity list with letter and circle markers, and a custom check-marker list.

A glossary card follows. Its terms appear in a narrow left column and their definitions in a wider right column. At narrow widths, the cards and glossary switch to a single column.

The markdown displays the source as code. Copy it into an HTML file and open that file in a browser to see the described result.

## Optional image marker

To use a local image as a marker, set `list-style-image` and keep a text marker fallback:

~~~css
.image-list {
  list-style-image: url("../images/marker.svg");
  list-style-type: disc;
}
~~~

Add the image at that path or change the path to match your project. The example page above does not need an image file.

## Try it yourself

1. Change the packing list from `square` to `circle`.
2. Change the agenda to `upper-roman` and then to `decimal`.
3. Replace `outside` with `inside` on the agenda and inspect a long item.
4. Change the nested list markers and make sure the outer markers remain unchanged.
5. Remove the custom marker content and compare the default unordered marker.
6. Resize the page to a narrow width and check the description list.

## Key points

- Use HTML list types according to the meaning of the content.
- CSS customizes markers without replacing the list's semantics.
- Direct-child selectors help style outer lists without affecting nested lists.
- Use `::marker` for text marker styling and real child elements for complex marker boxes.
- Keep information in the list text, with markers as supporting visuals.
- Description lists pair terms and descriptions and can be laid out responsively.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [35 - Text layout, spacing, and wrapping](../lessons/35-text-layout-and-wrapping.md) | [Lesson](../lessons/36-lists-and-markers.md) | [Q&A](../qnas/36-lists-and-markers.md) | [37 - Styling tables](../lessons/37-styling-tables.md) |
