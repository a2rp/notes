# 69 - CSS reference and glossary - Example

This example turns a small CSS glossary into a responsive, keyboard-friendly reference page. It uses semantic HTML, internal navigation, reusable color tokens, and a grid that adapts to the available width.

## Question

How can you present a short CSS reference so readers can scan related terms, jump between sections, and read the content comfortably on narrow and wide screens?

## Complete example

Save the following two files in the same folder and open index.html in a browser.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A compact field guide to common CSS terms and concepts.">
  <title>CSS Field Guide</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body id="top">
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header">
    <a class="brand" href="#top" aria-label="CSS Field Guide home">
      <span class="brand__mark" aria-hidden="true">C</span>
      <span>CSS Field Guide</span>
    </a>

    <nav aria-label="Primary navigation">
      <ul class="site-nav">
        <li><a href="#cascade">Cascade</a></li>
        <li><a href="#layout">Layout</a></li>
        <li><a href="#responsive">Responsive</a></li>
        <li><a href="#accessibility">Accessibility</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content" class="page-shell">
    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow">A practical lookup page</p>
      <h1 id="page-title">CSS, in clear terms.</h1>
      <p class="intro__summary">
        A concise guide to the rules, layout ideas, and user preferences
        that help stylesheets work as expected.
      </p>
      <p class="intro__note">
        Choose a topic to jump to its definitions. Follow the lesson links
        in your own notes when you want a deeper explanation.
      </p>
    </section>

    <nav class="topic-index" aria-label="Glossary topics">
      <h2>Browse topics</h2>
      <ul>
        <li><a href="#cascade">01 <span>The cascade</span></a></li>
        <li><a href="#layout">02 <span>Layout</span></a></li>
        <li><a href="#responsive">03 <span>Responsive CSS</span></a></li>
        <li><a href="#accessibility">04 <span>Accessibility</span></a></li>
      </ul>
    </nav>

    <div class="glossary">
      <section class="glossary-section" id="cascade" aria-labelledby="cascade-title">
        <div class="section-heading">
          <p class="eyebrow">01 / Rules and values</p>
          <h2 id="cascade-title">The cascade</h2>
          <p>How the browser chooses the declarations that apply.</p>
        </div>
        <dl class="term-list">
          <div class="term">
            <dt>Selector</dt>
            <dd>A pattern that matches elements, such as a type, class, attribute, or relationship.</dd>
          </div>
          <div class="term">
            <dt>Declaration</dt>
            <dd>A property and value inside a rule, such as color: navy.</dd>
          </div>
          <div class="term">
            <dt>Specificity</dt>
            <dd>A selector weight used in the cascade after origin, importance, and layer are considered.</dd>
          </div>
          <div class="term">
            <dt>Inheritance</dt>
            <dd>The way some properties pass their computed values from an element to its descendants.</dd>
          </div>
          <div class="term">
            <dt>Custom property</dt>
            <dd>A reusable value whose name starts with two hyphens, read with the var() function.</dd>
          </div>
        </dl>
      </section>

      <section class="glossary-section" id="layout" aria-labelledby="layout-title">
        <div class="section-heading">
          <p class="eyebrow">02 / Boxes and flow</p>
          <h2 id="layout-title">Layout</h2>
          <p>The boxes and contexts that determine where content appears.</p>
        </div>
        <dl class="term-list">
          <div class="term">
            <dt>Box model</dt>
            <dd>The content, padding, border, and margin regions around an element.</dd>
          </div>
          <div class="term">
            <dt>Containing block</dt>
            <dd>A reference box used to calculate certain sizes and positioned offsets.</dd>
          </div>
          <div class="term">
            <dt>Flex container</dt>
            <dd>An element that arranges its direct children with one-dimensional flex layout.</dd>
          </div>
          <div class="term">
            <dt>Grid track</dt>
            <dd>A row or column that forms part of a CSS grid.</dd>
          </div>
          <div class="term">
            <dt>Stacking context</dt>
            <dd>A local painting group that determines how its contents layer against other groups.</dd>
          </div>
        </dl>
      </section>

      <section class="glossary-section" id="responsive" aria-labelledby="responsive-title">
        <div class="section-heading">
          <p class="eyebrow">03 / Adapting to context</p>
          <h2 id="responsive-title">Responsive CSS</h2>
          <p>Conditions and values that help a page fit its available space.</p>
        </div>
        <dl class="term-list">
          <div class="term">
            <dt>Breakpoint</dt>
            <dd>A point where a layout change becomes useful for the content.</dd>
          </div>
          <div class="term">
            <dt>Media query</dt>
            <dd>A condition that can apply styles for a viewport, device feature, or user preference.</dd>
          </div>
          <div class="term">
            <dt>Container query</dt>
            <dd>A condition that adapts a component to the size of its query container.</dd>
          </div>
          <div class="term">
            <dt>Logical property</dt>
            <dd>A property named for the inline or block direction instead of a fixed physical side.</dd>
          </div>
          <div class="term">
            <dt>Fluid value</dt>
            <dd>A value that changes with its context and can be bounded with a minimum and maximum.</dd>
          </div>
        </dl>
      </section>

      <section class="glossary-section" id="accessibility" aria-labelledby="accessibility-title">
        <div class="section-heading">
          <p class="eyebrow">04 / Input and preference</p>
          <h2 id="accessibility-title">Accessibility</h2>
          <p>Styles that support different ways of navigating and viewing a page.</p>
        </div>
        <dl class="term-list">
          <div class="term">
            <dt>Focus indicator</dt>
            <dd>A visible style that identifies the interactive element currently receiving focus.</dd>
          </div>
          <div class="term">
            <dt>Reduced motion</dt>
            <dd>A user preference that asks interfaces to reduce nonessential movement.</dd>
          </div>
          <div class="term">
            <dt>Forced colors</dt>
            <dd>A display mode that applies a limited color palette chosen by the user or system.</dd>
          </div>
          <div class="term">
            <dt>Color scheme</dt>
            <dd>A light or dark presentation that can respond to the visitor's preferred scheme.</dd>
          </div>
          <div class="term">
            <dt>Progressive enhancement</dt>
            <dd>A way to keep a useful baseline and add features when a browser supports them.</dd>
          </div>
        </dl>
      </section>
    </div>

    <p class="back-to-top"><a href="#top">Back to the top</a></p>
  </main>

  <footer class="site-footer">
    <p>CSS Field Guide <span aria-hidden="true">/</span> A small reference for everyday work</p>
  </footer>
</body>
</html>
~~~

### styles.css

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  color-scheme: light;
  --color-ink: #182b2b;
  --color-muted: #536968;
  --color-paper: #f5f7f2;
  --color-surface: #ffffff;
  --color-line: #d5dfd9;
  --color-accent: #116b5a;
  --color-accent-dark: #084b40;
  --color-highlight: #e3f3e9;
  --page-width: 68rem;
  --radius: 0.75rem;
}

html {
  scroll-behavior: smooth;
}

body {
  min-width: 20rem;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

a {
  color: var(--color-accent-dark);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

a:hover {
  color: var(--color-accent);
}

a:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: 0.2rem;
}

.skip-link {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-start: 0.75rem;
  z-index: 1;
  padding: 0.65rem 0.9rem;
  transform: translateY(-180%);
  background: var(--color-ink);
  color: var(--color-surface);
}

.skip-link:focus {
  transform: translateY(0);
}

.site-header,
.page-shell,
.site-footer {
  width: min(var(--page-width), calc(100% - 2rem));
  margin-inline: auto;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-block: 1.25rem;
  border-block-end: 1px solid var(--color-line);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--color-ink);
  font-weight: 750;
  text-decoration: none;
}

.brand__mark {
  display: grid;
  width: 2.25rem;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 0.55rem;
  background: var(--color-accent);
  color: white;
}

.site-nav ul,
.topic-index ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}

.site-nav a {
  display: inline-block;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  color: var(--color-muted);
  font-size: 0.9rem;
  text-decoration: none;
}

.site-nav a:hover {
  background: var(--color-highlight);
  color: var(--color-accent-dark);
}

.page-shell {
  padding-block: clamp(2rem, 6vw, 5rem);
}

.intro {
  max-width: 46rem;
  margin-block-end: 2.5rem;
}

.eyebrow {
  color: var(--color-accent-dark);
  font-size: 0.75rem;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1,
h2,
p {
  overflow-wrap: anywhere;
}

h1 {
  max-width: 12ch;
  margin-block: 0.45rem 1rem;
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1.02;
  letter-spacing: -0.055em;
}

.intro__summary {
  max-width: 42rem;
  color: var(--color-muted);
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
}

.intro__note {
  margin-block-start: 1rem;
  color: var(--color-muted);
}

.topic-index {
  margin-block-end: 3rem;
  padding: 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.topic-index h2 {
  margin-block-end: 0.9rem;
  font-size: 1rem;
}

.topic-index ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: 0.65rem;
}

.topic-index a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3rem;
  padding: 0.65rem 0.8rem;
  border: 1px solid var(--color-line);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 750;
  text-decoration: none;
}

.topic-index a:hover {
  border-color: var(--color-accent);
  background: var(--color-highlight);
}

.topic-index a span {
  color: var(--color-ink);
}

.glossary {
  display: grid;
  gap: 1.5rem;
}

.glossary-section {
  scroll-margin-block-start: 1rem;
  display: grid;
  grid-template-columns: minmax(12rem, 0.75fr) minmax(0, 1.5fr);
  gap: 2rem;
  padding: clamp(1.2rem, 3vw, 2rem);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.section-heading h2 {
  margin-block: 0.25rem 0.5rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
}

.section-heading > p:last-child {
  color: var(--color-muted);
}

.term-list {
  display: grid;
  gap: 0.85rem;
}

.term {
  padding-block-end: 0.85rem;
  border-block-end: 1px solid var(--color-line);
}

.term:last-child {
  padding-block-end: 0;
  border-block-end: 0;
}

.term dt {
  color: var(--color-accent-dark);
  font-weight: 750;
}

.term dd {
  margin-block-start: 0.15rem;
  color: var(--color-muted);
}

.back-to-top {
  margin-block-start: 2rem;
  text-align: end;
}

.site-footer {
  padding-block: 1.5rem;
  border-block-start: 1px solid var(--color-line);
  color: var(--color-muted);
  font-size: 0.9rem;
}

.site-footer span {
  padding-inline: 0.35rem;
  color: var(--color-accent);
}

@media (max-width: 46rem) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .glossary-section {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
~~~

## Expected output

The page opens with a dark green title mark, a large heading, and a short introduction. A row of topic links lets readers jump to four glossary sections: the cascade, layout, responsive CSS, and accessibility.

Each section has a short description and a list of terms with definitions. On a wide screen, its heading sits beside the definition list. On a narrow screen, the heading moves above the list and the topic links wrap into the space available.

The page is static. The topic links jump to headings in the same document, and the back-to-top link returns to the beginning.

## Explanation

- The header, navigation, main content, sections, definition lists, and footer use elements that communicate their roles.
- The skip link gives keyboard users a direct path to the main content.
- Every navigation fragment points to a matching section id.
- The shared colors, maximum width, and corner radius are custom properties, so repeated design values can be adjusted in one place.
- The topic index uses a responsive grid. auto-fit and minmax let the number of columns change with available width.
- Each glossary section has a two-column layout at wide widths and a single-column layout when its content needs more room.
- Logical properties such as padding-block and margin-inline describe layout relative to the writing direction.
- The focus-visible style makes keyboard focus easy to see. The reduced-motion query turns off smooth scrolling for visitors who request less motion.
- The definition list pairs each term with its description, preserving the relationship in the page structure.

## Try it yourself

1. Add a new glossary section and link to it from both navigation areas.
2. Add three terms to the new section using dt and dd elements.
3. Change the accent custom property and observe which parts of the page update.
4. Narrow the browser until the section layout changes, then inspect whether any text is cramped.
5. Use only the keyboard to reach each topic and return to the top.
6. Temporarily remove the media query and compare the narrow-screen layout.

## Chapter navigation

| Previous chapter | Lesson | Q&A | Next |
| :--- | :--- | :--- | :--- |
| [68 - Practical page projects](../lessons/68-practical-page-projects.md) | [Lesson](../lessons/69-css-reference-and-glossary.md) | [Q&A](../qnas/69-css-reference-and-glossary.md) | End of current lesson sequence |