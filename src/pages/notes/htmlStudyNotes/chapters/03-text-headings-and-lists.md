# 03. Text, headings, and lists

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Elements, attributes, and nesting](./02-elements-attributes-and-nesting.md) | [Notes index](../README.md) | [Next: Links, paths, and navigation](./04-links-paths-and-navigation.md) |

## Structure text with headings

Headings describe the outline of a page or section. HTML provides h1 through h6, from the highest heading level to the lowest.

~~~html
<main>
  <h1>Garden planning</h1>

  <section>
    <h2>Choose a location</h2>
    <p>Check sunlight, drainage, and access to water.</p>

    <h3>Measure the space</h3>
    <p>Record the width and length before choosing plants.</p>
  </section>
</main>
~~~

Choose a heading level because of its place in the content, not its default visual size. Do not choose h4 just because it looks smaller than h2. CSS can change appearance without changing the document structure.

## Write paragraphs and emphasis

Use p for a paragraph. Use strong when the words have strong importance, and em when spoken emphasis would change the meaning.

~~~html
<p>Save a copy before you change the original file.</p>
<p><strong>Warning:</strong> this action removes the saved draft.</p>
<p>You <em>must</em> review the filename before submission.</p>
~~~

b and i are available for specific presentational or alternate-voice use, but strong and em express meaning when emphasis is intended. Do not use heading or paragraph elements only to change font size or spacing.

## Create ordered and unordered lists

Use ul when the item order does not matter. Use ol when the steps or ranking have a meaningful order. Each item belongs in an li element.

~~~html
<h2>Pack the tools</h2>
<ul>
  <li>Notebook</li>
  <li>Measuring tape</li>
  <li>Garden gloves</li>
</ul>

<h2>Prepare the bed</h2>
<ol>
  <li>Remove weeds.</li>
  <li>Loosen the soil.</li>
  <li>Water the area.</li>
</ol>
~~~

A list inside another list belongs inside the relevant li item. Do not use repeated br elements to imitate a list.

## Use a description list for term and value pairs

dl groups terms and their descriptions. It can describe glossaries, metadata, or other related name and value pairs.

~~~html
<dl>
  <dt>Compost</dt>
  <dd>Organic material added to improve soil.</dd>

  <dt>Mulch</dt>
  <dd>A surface layer that helps protect the soil.</dd>
</dl>
~~~

Use the list type that describes the content. A description list is not a general layout grid.

## Practice questions

1. What does an HTML heading describe?
2. How should a heading level be chosen?
3. Which element marks a paragraph?
4. When should strong be used?
5. When should em be used?
6. What is the difference between ul and ol?
7. Which element represents an item in ul or ol?
8. What kind of content can a description list represent?

## Main references

- [Headings and paragraphs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs)
- [Lists](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Lists)
- [The strong element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/strong)
- [The em element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/em)