# 10. Semantic page structure and landmarks

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Native form validation and submission](./09-native-form-validation-and-submission.md) | [Notes index](../README.md) | [Next: Metadata and the document head](./11-metadata-and-the-document-head.md) |

## Choose elements by their meaning

Semantic elements describe the role of their content. They help browsers, assistive technology, and other tools understand the page structure.

~~~html
<header>
  <a href="./index.html">Garden journal</a>
  <nav aria-label="Primary">
    <a href="./plants.html">Plants</a>
    <a href="./plans.html">Plans</a>
  </nav>
</header>

<main id="main-content">
  <article>
    <h1>Preparing a spring garden</h1>
    <p>Plan the beds before planting.</p>

    <section aria-labelledby="checklist-heading">
      <h2 id="checklist-heading">Preparation checklist</h2>
      <ul>
        <li>Check the soil.</li>
        <li>Measure the beds.</li>
      </ul>
    </section>
  </article>

  <aside aria-label="Related reading">
    <a href="./compost.html">How compost improves soil</a>
  </aside>
</main>

<footer>
  <p>Garden journal</p>
</footer>
~~~

header and footer can describe a page or a section. nav identifies a major group of navigation links. main contains the central content of the document. article is a self-contained composition, and section groups a thematic part of a page.

## Use section and article for the right content

Use section when a part of the page has its own topic, usually with a heading. Use article for content that could stand on its own or be reused independently, such as a post or news item.

Use aside for related or supporting content. Use div when no semantic element describes the purpose. A div is a generic container, not a failure, but it should not replace a meaningful element without reason.

## Add a skip link

A skip link lets keyboard users bypass repeated navigation and move directly to the main content.

~~~html
<a href="#main-content">Skip to main content</a>

<header>
  <nav aria-label="Primary">
    <a href="./index.html">Home</a>
    <a href="./notes.html">Notes</a>
  </nav>
</header>

<main id="main-content">
  <h1>Notes</h1>
</main>
~~~

The id on main must match the fragment in the link. Test the link with a keyboard and ensure its focus style is visible.

## Keep the document outline understandable

Use headings to label content sections, and use landmarks for major regions. A page should have one main content area at a time. If a page has multiple nav elements, give each a distinct accessible label.

Semantic structure does not dictate visual layout. CSS can arrange the page while the HTML continues to describe the reading order and meaning.

## Practice questions

1. What does semantic HTML communicate?
2. What is the main role of main?
3. When is section useful?
4. What kind of content can article represent?
5. What does aside usually contain?
6. When is div appropriate?
7. How does a skip link help keyboard users?
8. Why label multiple navigation regions?

## Main references

- [Structuring documents](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [The main element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main)
- [The nav element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)
- [HTML accessibility basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)