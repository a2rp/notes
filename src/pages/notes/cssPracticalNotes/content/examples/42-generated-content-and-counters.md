# 42 - Generated content and counters

This example uses CSS pseudo-elements to add visual details and CSS counters to number chapter headings and a nested list. The heading text and list items remain in HTML, so the content still makes sense without the generated numbering.

## Question

How can CSS add chapter and section numbers to headings, decorate a note, and show hierarchical numbers for a nested ordered list while keeping the document structure semantic?

## Complete example

Save this as an HTML file and open it in a browser to view the result.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Generated content and counters</title>
  <style>
    body {
      max-width: 48rem;
      margin: 2rem auto;
      padding: 0 1rem;
      color: #263238;
      font: 1rem/1.6 system-ui, sans-serif;
    }

    .handbook {
      counter-reset: chapter;
    }

    .chapter {
      counter-increment: chapter;
      counter-reset: section;
      margin-block: 2rem;
    }

    .chapter > h2::before {
      content: "Chapter " counter(chapter) ". ";
      color: #176b57;
    }

    .chapter > h3 {
      counter-increment: section;
    }

    .chapter > h3::before {
      content: counter(chapter) "." counter(section) " ";
      color: #176b57;
    }

    .tip {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.75rem 1rem;
      border-left: 0.25rem solid #d58b00;
      background: #fff7df;
    }

    .tip::before {
      content: "";
      flex: 0 0 0.7rem;
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      background: #d58b00;
    }

    blockquote {
      margin-inline: 0;
      padding: 0.5rem 1rem;
      border-left: 0.2rem solid #6b7280;
      color: #4b5563;
    }

    blockquote::before {
      content: open-quote;
    }

    blockquote::after {
      content: close-quote;
    }

    ol.numbered {
      counter-reset: item;
      list-style: none;
      padding-inline-start: 1.5rem;
    }

    ol.numbered li {
      counter-increment: item;
      margin-block: 0.35rem;
    }

    ol.numbered li::before {
      content: counters(item, ".") " ";
      color: #176b57;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main class="handbook">
    <h1>Field guide</h1>

    <section class="chapter" aria-labelledby="planning-title">
      <h2 id="planning-title">Plan the work</h2>
      <p>Start by identifying the goal and dividing the work into clear steps.</p>

      <h3>Choose a goal</h3>
      <p>Write down what the finished task should accomplish.</p>

      <h3>List the steps</h3>
      <p>Put the steps in the order they need to happen.</p>

      <p class="tip"><strong>Tip:</strong> Keep each step small enough to check.</p>
    </section>

    <section class="chapter" aria-labelledby="review-title">
      <h2 id="review-title">Review the result</h2>
      <p>Check the result against the goal before you finish.</p>

      <h3>Check the details</h3>
      <p>Look for missing information and unclear wording.</p>

      <blockquote>A clear structure makes a guide easier to revisit.</blockquote>

      <h3>Finish the task</h3>
      <p>Record the final result and any useful follow-up steps.</p>

      <h3>Review checklist</h3>
      <ol class="numbered">
        <li>Check the main result.
          <ol class="numbered">
            <li>Compare it with the stated goal.</li>
            <li>Check that the important details are present.</li>
          </ol>
        </li>
        <li>Record any follow-up work.</li>
      </ol>
    </section>
  </main>
</body>
</html>
~~~

## Explanation

- `.handbook` starts the `chapter` counter. Each `.chapter` section increments it, so its heading receives the next chapter number.
- Each chapter resets the `section` counter. Its `h3` headings increment that counter and display both values, such as `1.1` and `1.2`.
- The tip's small colored dot is decorative CSS content. The word “Tip” and the note itself are real HTML text.
- `open-quote` and `close-quote` add typographic quotation marks around the blockquote. The quoted sentence stays in the HTML.
- Each nested ordered list starts its own `item` counter. `counters(item, ".")` combines the active counter values to produce numbering such as `1`, `1.1`, and `1.2`.
- The checklist uses actual nested `<ol>` and `<li>` elements. CSS changes how its numbering looks, while HTML provides the ordered-list structure.
- Generated text and CSS numbers are presentation. Keep essential words and meaningful structure in HTML, and do not use pseudo-elements as a replacement for document content.

## Expected output

The page displays two chapter headings numbered “Chapter 1” and “Chapter 2”. Their section headings are numbered in sequence within each chapter, for example “1.1” and “1.2”, then “2.1”. The tip has a colored dot, and the blockquote has quotation marks. The nested checklist displays hierarchical numbers such as “1”, “1.1”, “1.2”, and “2”.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :---------------- | :------------- | :---------- | :------------ |
| [41 - Custom properties and design tokens](../examples/41-custom-properties-and-design-tokens.md) | [Lesson](../lessons/42-generated-content-and-counters.md) | [Q&A](../qnas/42-generated-content-and-counters.md) | [43 - Transforms](../examples/43-transforms.md) |