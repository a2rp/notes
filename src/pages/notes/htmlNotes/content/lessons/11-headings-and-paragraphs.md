# 11 - Headings and paragraphs

Headings and paragraphs give written content a clear structure. Headings name topics and subtopics. Paragraphs group related sentences together. This chapter explains how to choose heading levels and mark paragraphs with HTML.

## What you will learn

- Use heading elements from **h1** through **h6** to describe a content hierarchy.
- Choose heading levels based on structure rather than visual size.
- Write clear section headings.
- Use **p** elements to group paragraphs.
- Tell the difference between a paragraph, a heading, and a line break.

## Headings describe the structure

HTML provides six heading elements, from **h1** to **h6**. The number represents the heading level:

- **h1** is the highest level, usually used for the main topic of a page.
- **h2** introduces a major topic within the page.
- **h3** introduces a subsection within an **h2** topic.
- **h4**, **h5**, and **h6** can describe further nested levels when the content needs them.

Choose a heading level based on how the section fits into the content. Do not choose a heading element just because its default text looks like the size you want. CSS controls appearance; the heading element communicates structure.

~~~html
<main>
  <h1>Growing herbs at home</h1>

  <section>
    <h2>Choose a location</h2>
    <p>Most herbs grow well with several hours of sunlight.</p>

    <h3>Check the light</h3>
    <p>Watch how much direct sunlight reaches the spot.</p>
  </section>

  <section>
    <h2>Select containers</h2>
    <p>Choose pots that have drainage holes.</p>
  </section>
</main>
~~~

The **h1** names the page topic. The two **h2** elements introduce topics at the same level. The **h3** introduces a subsection under the location topic.

Heading elements do not automatically create parent and child relationships in the HTML tree. Their levels describe the content hierarchy. In the example, the **section** elements establish element grouping, while the heading ranks describe the topics.

## Keep heading levels in a sensible order

Move through heading levels to show the organization of the content. A section introduced by an **h2** can have **h3** subsections. Avoid skipping a level just to get a different default font size:

~~~html
<h1>Plant care</h1>
<h2>Watering</h2>
<h3>Check the soil</h3>
~~~

Do not jump directly from **h2** to **h4** without a structural reason. A useful hierarchy helps readers scan the page and understand which topics belong together.

A page usually has one clear **h1** that describes its main subject. Use lower-level headings for sections and subsections. The exact number of headings depends on the content.

## Write useful headings

A heading should tell readers what its section is about. Keep it concise and specific enough to make sense in a list of headings:

~~~html
<h2>Watering indoor basil</h2>
~~~

A heading such as “More” or “Details” may be too vague when read without the nearby paragraph. Use a heading only when the content forms a real topic or section. Do not use headings only to make text large or bold.

## Group sentences into paragraphs

The **p** element represents a paragraph:

~~~html
<p>Fresh herbs can add flavor to a meal.</p>
<p>Choose a sunny place before you buy plants.</p>
~~~

Start a new **p** element when you begin a new paragraph or idea. A blank line in the source code does not create another paragraph in the page. The tags mark the paragraphs.

A paragraph can contain text and inline elements, such as **strong**, **em**, or **a**. It should not contain a heading, a list, or another paragraph:

~~~html
<p>Water the soil when the top layer feels dry.</p>
<ul>
  <li>Check the pot's drainage.</li>
  <li>Empty standing water from the tray.</li>
</ul>
~~~

The list follows the paragraph as a separate block of content.

## Use line breaks only when a line break matters

The **br** element creates a line break within a piece of content. It is useful when the line structure is part of the meaning, such as in an address or a poem:

~~~html
<address>
  12 Green Lane<br>
  Hillview
</address>
~~~

Do not use repeated **br** elements to create paragraph spacing. Use separate paragraphs for separate ideas and CSS for visual spacing.

## A complete example

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Growing herbs at home | Garden journal</title>
  </head>
  <body>
    <main>
      <h1>Growing herbs at home</h1>
      <p>A sunny place and a suitable pot are good starting points.</p>

      <section>
        <h2>Choose a location</h2>
        <p>Many herbs need several hours of sunlight each day.</p>

        <h3>Observe the sunlight</h3>
        <p>Check the location at different times of day.</p>
      </section>

      <section>
        <h2>Water the plants</h2>
        <p>Check the soil before watering. Different herbs may need different amounts.</p>
      </section>
    </main>
  </body>
</html>
~~~

The document title names the page outside its content. The **h1** introduces the visible topic. The **h2** elements divide the guide into major topics, and the **h3** adds a subsection. Paragraphs group the explanations within those topics.

## Common mistakes

- **Choosing a heading level for its default size.** Choose the level based on the content hierarchy, then style it with CSS if needed.
- **Skipping heading levels without a structural reason.** Organize related topics from broader to more specific.
- **Using a heading only to make text look bold or large.** Use a heading for a real topic or section.
- **Using vague headings.** Help readers identify what each section covers.
- **Expecting a blank source line to create a new paragraph.** Use a separate **p** element.
- **Putting a heading or list inside a paragraph.** Close the paragraph and place the next block element after it.
- **Using many line breaks to create visual gaps.** Use paragraphs and CSS for spacing.
- **Assuming heading levels automatically nest elements in the document tree.** They express a content hierarchy; HTML tags and containers establish tree relationships.

## Try it yourself

1. Write one **h1** for a page about caring for houseplants.
2. Add two **h2** headings for major topics under the main heading.
3. Add an **h3** under one of those topics.
4. Write one paragraph beneath each heading.
5. Inspect the heading levels and make sure they follow a useful hierarchy.
6. Make one heading more specific so it still makes sense when read by itself.
7. Write a two-line postal address with a **br** element, then explain why the line break is meaningful there.
8. Identify why a list should not be placed inside a paragraph.

## Key points

- HTML headings range from **h1** through **h6**.
- Heading levels communicate the structure of topics and subtopics.
- Use heading elements for real headings, not just to change text size.
- The **p** element marks a paragraph; a blank line in source does not.
- Keep headings clear and use levels in a sensible order.
- A **br** creates a line break, not a new paragraph or general spacing.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [10 - Metadata: charset, viewport, and description](10-document-metadata.md) | [Q&A](../qnas/11-headings-and-paragraphs.md) | [Example](../examples/11-headings-and-paragraphs.md) | [12 - Text semantics: emphasis, importance, and meaning](12-text-semantics.md) |
