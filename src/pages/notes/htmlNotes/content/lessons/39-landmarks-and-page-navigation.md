# 39 - Landmarks, headings, and accessible page navigation

Landmarks and headings give people a way to understand and move through a page without reading every line from the beginning. Screen readers can offer shortcuts to major page areas and a list of headings. Keyboard users can use skip links to bypass repeated navigation and reach the main content.

This chapter explains how landmarks and headings work together, how to label repeated page areas, and how to make useful skip links and tables of contents. It builds on the page structure elements from Chapter 38.

## What you will learn

- What a landmark is and how assistive technologies use it
- Which native HTML elements provide common landmark roles
- Why landmarks should represent important page areas, not every wrapper
- How to build a clear heading hierarchy
- How to label repeated navigation and other named regions
- How to add a skip link and a linked table of contents
- How headings, landmarks, and links each help people navigate

## What is a landmark?

A landmark is a major area of a page that assistive technologies can identify and navigate to. Examples include the page banner, primary navigation, main content, complementary information, and page footer.

Landmarks describe the high-level organization of a page. A screen reader can let a user move from one landmark to another instead of tabbing through every link. Landmarks do not replace headings, links, or skip links. Each has a different purpose:

- Landmarks help users jump between major page areas.
- Headings give the content inside those areas a navigable outline.
- Links take users to other documents or locations in the current document.
- Skip links provide a direct way to bypass repeated content.

Native HTML elements provide many landmark roles automatically. Use those elements according to their meaning before adding ARIA roles manually.

## Common landmarks from native HTML

| HTML element | Landmark role it can provide | Typical use |
| --- | --- | --- |
| `<header>` in the page body context | `banner` | Site-wide introductory content |
| `<nav>` | `navigation` | A major group of navigation links |
| `<main>` | `main` | The page's central content |
| `<aside>` | `complementary` | Related content that can stand apart |
| `<footer>` in the page body context | `contentinfo` | Information about the whole site or page |
| `<section>` with an accessible name | `region` | A significant, named area without a more specific landmark role |
| `<search>` | `search` | A search area |
| A named `<form>` | `form` | A significant form area |

The context matters. A `<header>` inside an `<article>` introduces that article, but it does not represent the page-wide banner. A `<footer>` inside an article belongs to that article, not the whole page's content information landmark.

A `<section>` is not automatically a landmark. It becomes a named region when it has an accessible name, often from its visible heading. Only make a section a region when it is important enough to be useful in landmark navigation.

## A practical page outline

Consider a page with a site identity, two navigation areas, a main article, related information, and site details:

~~~html
<body>
  <a href="#main-content">Skip to main content</a>

  <header>
    <a href="/">City Garden</a>
  </header>

  <nav aria-label="Primary">
    <a href="/plants">Plants</a>
    <a href="/guides">Guides</a>
  </nav>

  <main id="main-content">
    <h1>Planning a small garden</h1>

    <nav aria-labelledby="contents-heading">
      <h2 id="contents-heading">On this page</h2>
      <ul>
        <li><a href="#light">Choosing a bright spot</a></li>
        <li><a href="#containers">Choosing containers</a></li>
      </ul>
    </nav>

    <section aria-labelledby="light">
      <h2 id="light">Choosing a bright spot</h2>
      <p>Watch how sunlight moves across the space during the day.</p>
    </section>

    <section aria-labelledby="containers">
      <h2 id="containers">Choosing containers</h2>
      <p>Choose pots that fit the plants and have drainage holes.</p>
    </section>
  </main>

  <aside aria-labelledby="related-heading">
    <h2 id="related-heading">Related guides</h2>
    <ul>
      <li><a href="/guides/soil">Preparing potting soil</a></li>
    </ul>
  </aside>

  <footer>
    <p>Copyright 2026 City Garden</p>
    <nav aria-label="Footer">
      <a href="/privacy">Privacy</a>
      <a href="/contact">Contact</a>
    </nav>
  </footer>
</body>
~~~

This example creates a broad outline: banner, primary navigation, main content, complementary content, and page information. The heading hierarchy gives users a more detailed outline inside the main content. The two navigation areas have distinct names so users can tell them apart.

The `aria-label` and `aria-labelledby` attributes provide accessible names for landmarks. `aria-labelledby` points to visible text, while `aria-label` provides a short name directly. For most users, visible headings and links also make the page easier to understand. ARIA details are covered further in Chapter 41.

## Use landmarks with care

Landmarks are most useful when they describe the important regions of a page. Too many landmarks make it harder to understand the overall page structure.

Use the semantic element that matches the area:

- Use one visible `<main>` for the unique central content.
- Use `<nav>` for significant groups of navigation links.
- Use `<aside>` for related content that can stand apart from the main content.
- Use a page-level `<header>` and `<footer>` for site-wide introduction and information.
- Use a named `<section>` as a region only when users would benefit from navigating directly to it.

Do not add `role="main"` to `<main>` or `role="navigation"` to `<nav>`. These elements already provide their native roles. Do not make every `<div>` into a landmark. A generic wrapper usually does not need one.

If a landmark role appears more than once, give each instance a clear, distinct accessible name. For example, a primary site menu and an in-page table of contents should not both be called simply "Navigation" in the markup. The role is announced by assistive technology, so the name can stay concise, such as "Primary" and "On this page".

## Create a logical heading hierarchy

Headings communicate how the content is organized. Use `<h1>` through `<h6>` in order of importance, not as a way to set text size.

A common page structure has one `<h1>` for the page's main topic, `<h2>` elements for its main parts, and `<h3>` elements for subsections within those parts:

~~~html
<h1>Planning a small garden</h1>

<h2>Choosing a location</h2>
<p>Look for a place with suitable light and access to water.</p>

<h2>Selecting plants</h2>
<p>Choose varieties that fit the available space.</p>

<h3>Herbs for beginners</h3>
<p>Mint and parsley are useful herbs to start with.</p>
~~~

Prefer one `<h1>` that describes the page's main topic. Nest heading levels logically, and avoid jumping forward from an `<h1>` directly to an `<h3>`. A lower-ranked heading should introduce a subsection of the preceding higher-ranked heading. When a new major topic begins, return to the appropriate higher level.

The HTML standard permits more than one `<h1>` in certain structures, but a single page-level `<h1>` is a clearer convention for most pages. Sectioning elements such as `<section>` do not automatically restart heading levels. Choose each heading level to show the actual hierarchy.

If a heading needs to look larger, smaller, or more decorative, use CSS. Do not pick an incorrect heading level to get its default appearance.

## Label page regions with their headings

A visible heading can be used as the accessible name for a significant region. The heading remains useful to everyone, and `aria-labelledby` associates it with the landmark:

~~~html
<section aria-labelledby="hours-heading">
  <h2 id="hours-heading">Opening hours</h2>
  <p>Monday to Friday, 9 a.m. to 5 p.m.</p>
</section>
~~~

Because the section has a name, assistive technologies can expose it as a region landmark. Avoid turning every content section into a region. Use this when the section is significant and a direct landmark shortcut would help.

For multiple navigation areas, provide distinct names:

~~~html
<nav aria-label="Primary">
  <a href="/">Home</a>
  <a href="/services">Services</a>
</nav>

<nav aria-label="On this page">
  <a href="#hours">Opening hours</a>
  <a href="#location">Location</a>
</nav>
~~~

If a navigation area already has a visible heading, you can use `aria-labelledby` to name it instead of repeating the text in `aria-label`.

## Add a skip link

A skip link lets keyboard users bypass repeated links and other content at the start of each page. Place it early in the document and point it to the main content:

~~~html
<body>
  <a href="#main-content">Skip to main content</a>

  <header>
    <!-- Repeated site content -->
  </header>

  <nav aria-label="Primary">
    <!-- Repeated navigation links -->
  </nav>

  <main id="main-content">
    <h1>Page-specific heading</h1>
    <!-- Page-specific content -->
  </main>
</body>
~~~

The `href` fragment must match the `id` on the destination. Keep IDs unique in the document. The skip link should be reachable by keyboard. If a design hides it visually until keyboard focus, CSS must make it visible when focused.

A skip link and a main landmark complement each other. The landmark provides a screen reader shortcut, while the skip link is an ordinary link that keyboard users can activate.

## Add a table of contents with in-page links

A table of contents can help people scan a long page and jump to a topic. Place it in a navigation landmark and link to unique heading IDs:

~~~html
<nav aria-labelledby="contents-heading">
  <h2 id="contents-heading">On this page</h2>
  <ul>
    <li><a href="#prepare">Prepare the space</a></li>
    <li><a href="#choose-plants">Choose plants</a></li>
  </ul>
</nav>

<section aria-labelledby="prepare">
  <h2 id="prepare">Prepare the space</h2>
  <p>Measure the area and check its sunlight.</p>
</section>

<section aria-labelledby="choose-plants">
  <h2 id="choose-plants">Choose plants</h2>
  <p>Select plants suited to the space.</p>
</section>
~~~

Each `href="#prepare"` link points to the element with `id="prepare"`. The visible link text says where the link goes. Do not use vague labels such as "click here" when a descriptive destination can be named.

## Landmarks and headings work together

Landmarks are broad navigation points. Headings describe topics within a page and let users jump to specific content. A page with landmarks but no headings can still be difficult to scan. A page with headings but no main landmark may require more effort to bypass repeated site content.

Use both when they match the content:

1. Identify the major page areas.
2. Mark them with appropriate native structural elements.
3. Add useful names when the same kind of landmark appears more than once.
4. Add headings that describe the content hierarchy.
5. Provide a skip link when repeated content would otherwise take time to pass.
6. Make link text describe its destination.

## Common mistakes

### Using landmarks for every wrapper

A landmark should identify a meaningful page area that users may want to navigate to. Too many small regions create noise. Use a generic container for styling-only wrappers.

### Giving repeated landmarks the same unclear name

If a page has primary navigation and an in-page table of contents, give them distinct names such as "Primary" and "On this page". Avoid repeating the word "navigation" in the name because the role already communicates it.

### Making every heading an `<h1>`

Use heading levels to express hierarchy. Usually use one `<h1>` for the page topic, `<h2>` for its main sections, and lower levels for nested topics.

### Skipping heading levels to get a font size

A jump from `<h1>` to `<h3>` can make the content hierarchy confusing. Keep the logical level and style it with CSS.

### Assuming `<section>` automatically creates a landmark

A section needs an accessible name to be exposed as a region landmark. Give a meaningful section a visible heading and associate the heading when direct region navigation is useful.

### Treating landmarks as a replacement for skip links

Landmark shortcuts help assistive technology users. A skip link is a regular link that keyboard users can focus and activate to bypass repeated content. Both can be useful.

### Using unclear link text in a table of contents

Write link text that identifies the destination, such as "Choosing plants". Avoid relying on surrounding visual placement to explain a link labeled only "More" or "Click here".

## Try it yourself

1. Identify the banner, primary navigation, main content, complementary area, and page information on a page you know.
2. Add one page-level `<h1>`, then organize the major topics with `<h2>` and nested topics with `<h3>`.
3. Create two navigation areas and give them distinct accessible names.
4. Add a table of contents that links to two headings by their IDs.
5. Add a skip link before the repeated page header and make it point to the main content.
6. Decide which sections are important enough to be region landmarks. Leave ordinary sections as headings within the main content.
7. Review every heading level and every link label. Explain what someone would understand when navigating by headings or links alone.

## Key points

- Landmarks identify major areas and can provide quick navigation for assistive technology users.
- Native elements such as `<main>`, `<nav>`, `<header>`, `<footer>`, and `<aside>` provide landmark roles in the correct context.
- A `<section>` becomes a region landmark when it has an accessible name. Use region landmarks selectively.
- Name repeated landmarks distinctly so people can tell them apart.
- Headings create a content outline. Use them in a logical hierarchy, usually with one page-level `<h1>`.
- Skip links let keyboard users bypass repeated content. Their fragment target and `id` must match.
- Use meaningful link text in navigation and tables of contents.
- Landmarks, headings, and skip links support different parts of page navigation.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [38 - Header, navigation, main, section, article, and footer](38-page-structure-elements.md) | [Q&A](../qnas/39-landmarks-and-page-navigation.md) | [Example](../examples/39-landmarks-and-page-navigation.md) | [40 - Accessibility with native HTML](40-accessibility-with-html.md) |
