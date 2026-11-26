# Example 11 - Headings and paragraphs

## Question

Create a short guide to growing herbs at home. Give it one main heading, three major sections, and a subsection under each of the first two sections. Use separate paragraphs for related ideas and include a postal address whose line breaks are meaningful.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Growing Herbs at Home | Garden Notes</title>
  </head>
  <body>
    <main>
      <h1>Growing herbs at home</h1>
      <p>
        A sunny location and a suitable pot are good starting points for a
        healthy herb garden.
      </p>

      <section>
        <h2>Choose a location</h2>
        <p>
          Many herbs grow well in a place that receives several hours of
          sunlight each day.
        </p>

        <h3>Observe the sunlight</h3>
        <p>
          Check the spot in the morning and again in the afternoon. The amount
          of direct light can change throughout the day.
        </p>
        <p>
          If the spot is mostly shaded, choose herbs that tolerate less sun.
        </p>
      </section>

      <section>
        <h2>Water the plants</h2>
        <p>
          Herbs do not all need the same amount of water, so check each plant's
          soil before watering.
        </p>

        <h3>Check the soil first</h3>
        <p>
          If the surface feels dry, water the soil gently. Make sure extra water
          can drain away from the pot.
        </p>
      </section>

      <section>
        <h2>Visit the garden club</h2>
        <p>Our next meeting is at this address:</p>
        <p>
          12 Green Lane<br>
          Hillview
        </p>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Growing Herbs at Home | Garden Notes**. The page displays the main heading **Growing herbs at home**, an introductory paragraph, and three major section headings. Under **Choose a location** and **Water the plants**, smaller subsection headings introduce more specific advice. Each paragraph appears as its own block of text.

The address appears on two lines. The browser uses its default heading sizes and spacing because this document contains no CSS.

## Explanation

- The `h1` names the page's main topic. The `h2` elements introduce major sections, and each `h3` introduces a subsection within its `h2` section. The levels follow a sensible order.
- Heading elements describe content structure. Choose a heading level for its place in the hierarchy, not for the default text size.
- Each `p` element marks one paragraph. Blank lines in the HTML source help people read the code, but only the paragraph elements create separate paragraphs in the document.
- The address uses `br` because the line break is part of how a postal address is written. A line break is not a replacement for a new paragraph or a way to add extra spacing.
- The `title` names the document in the browser tab. It is separate from the visible `h1`.

## How to try it

Copy the HTML code block using its copy button, save it as `herb-garden-guide.html`, and open it in a browser. Add another paragraph under **Choose a location**. Then change a heading level and check whether the content hierarchy still makes sense.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 11 - Headings and paragraphs](../lessons/11-headings-and-paragraphs.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [10 - Metadata: charset, viewport, and description](10-document-metadata.md) | [Lesson](../lessons/11-headings-and-paragraphs.md) | [Q&A](../qnas/11-headings-and-paragraphs.md) | [12 - Text semantics: emphasis, importance, and meaning](12-text-semantics.md) |
