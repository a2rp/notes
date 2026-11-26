# 38 - Header, navigation, main, section, article, and footer

A web page is easier to understand when its major parts have meaningful HTML elements. Elements such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` describe how page content is organized. They do not set the visual layout by themselves. CSS controls how those parts look and where they appear.

This chapter introduces each element, explains how to choose between `<section>` and `<article>`, and builds a complete example page. Chapter 39 will focus on landmarks, headings, and helping people navigate page structure.

## What you will learn

- What each of the six page structure elements represents
- How to choose between `<section>` and `<article>`
- Why `<main>` should contain the page's unique central content
- When a group of links belongs inside `<nav>`
- How `<header>` and `<footer>` can belong to a page or to an individual article
- How to combine these elements in a readable page structure
- How to avoid using semantic elements only as styling containers

## The page structure elements at a glance

| Element | Purpose |
| --- | --- |
| `<header>` | Introductory content for a page or a section |
| `<nav>` | A major group of navigation links |
| `<main>` | The page's dominant, unique content |
| `<section>` | A thematic grouping of related content, usually with a heading |
| `<article>` | A self-contained piece of content that can stand on its own |
| `<footer>` | Closing or supporting information for a page or a section |

These elements communicate purpose. They do not mean "top box," "left column," or "bottom row." Use CSS to place and style them.

## The `<header>` element

`<header>` groups introductory content for a page or for a particular section. It often contains a heading, a short introduction, a logo, an author name, or navigation related to that area.

A page can have a site header, and an article inside the page can have its own header:

~~~html
<header>
  <a href="/">Garden Guide</a>
  <p>Practical advice for growing at home</p>
</header>

<article>
  <header>
    <h2>How to grow basil</h2>
    <p>By Mira Patel</p>
  </header>

  <p>Basil grows well in a sunny spot with regular watering.</p>
</article>
~~~

The first `<header>` introduces the page. The second introduces one article. A `<header>` is not a replacement for a heading element. Use `<h1>` through `<h6>` for the heading itself.

## The `<nav>` element

`<nav>` identifies a significant group of links used for navigation. It can contain a list of links, such as the main menu or a table of contents:

~~~html
<nav>
  <ul>
    <li><a href="/plants">Plants</a></li>
    <li><a href="/tools">Tools</a></li>
    <li><a href="/guides">Guides</a></li>
  </ul>
</nav>
~~~

Not every group of links needs a `<nav>`. A sentence with one related link or a short list of legal links in a footer can remain ordinary content. Reserve `<nav>` for an important navigation area that people may want to find and use to move around the site or page.

A page may have more than one navigation area, for example a primary menu and a table of contents. If there are multiple navigation landmarks, give each a clear, distinct accessible name. The next chapter covers landmarks and navigation in more detail.

## The `<main>` element

`<main>` contains the dominant content of the page. The main content is the part that is specific to that page or central to the page's purpose. Repeated site-wide content, such as the same logo, primary navigation, or copyright links, normally belongs outside it.

~~~html
<header>
  <a href="/">Garden Guide</a>
  <nav>
    <a href="/plants">Plants</a>
    <a href="/guides">Guides</a>
  </nav>
</header>

<main>
  <h1>Growing herbs indoors</h1>
  <p>Start with a bright windowsill and a few easy-to-grow herbs.</p>
</main>

<footer>
  <p>Garden Guide</p>
</footer>
~~~

A document should not have more than one `<main>` element that is not hidden. It helps browsers and assistive technologies identify the central content. A skip link can point to an `id` on `<main>` so keyboard users can bypass repeated content:

~~~html
<a href="#main-content">Skip to main content</a>

<header>
  <!-- Repeated site introduction and navigation -->
</header>

<main id="main-content">
  <h1>Growing herbs indoors</h1>
  <p>Choose a bright place for your pots.</p>
</main>
~~~

Skip links and how users navigate landmarks are explored further in Chapter 39.

## The `<section>` element

`<section>` groups related content around a theme. It is useful for a meaningful part of a larger page, such as a chapter, a group of frequently asked questions, or a set of contact details. A section should usually have a heading that describes its topic.

~~~html
<section>
  <h2>Choose a location</h2>
  <p>Most herbs need several hours of bright light each day.</p>
</section>

<section>
  <h2>Prepare the pots</h2>
  <p>Use containers with drainage holes.</p>
</section>
~~~

Do not use `<section>` just because you need a box to apply CSS to. If the content has no thematic grouping and you only need a generic wrapper, use `<div>` instead. A heading is a useful test: if you cannot describe the group with a meaningful heading, it may not need to be a section.

## The `<article>` element

`<article>` represents a self-contained piece of content that could make sense on its own or be reused separately. Common examples include a blog post, a news story, a forum post, a product review, or a user comment.

~~~html
<article>
  <h2>My first tomato harvest</h2>
  <p>I planted three seedlings in May and picked the first tomatoes in July.</p>
  <footer>
    <p>Written by Jordan Lee</p>
  </footer>
</article>
~~~

A helpful test is to ask: could this content be shared, reused, or understood as a complete item outside this exact page? If yes, `<article>` may fit. Each article should generally have a heading that identifies it.

Articles can contain their own `<header>` and `<footer>`. They can also contain related articles, such as comments nested within a blog post. Use nesting only when the inner article is genuinely related to the outer one.

## `<section>` or `<article>`?

The elements can both group content, but they express different ideas:

- Use `<article>` for a complete, self-contained item that could stand on its own.
- Use `<section>` for a thematic part of a larger page or item.
- Use `<div>` for a generic wrapper when you only need grouping for styling or scripting.

For example, a blog page can have several independent posts. Each post is an `<article>`. A long post may use `<section>` elements for its major topics:

~~~html
<article>
  <h2>Growing tomatoes in a small garden</h2>
  <p>Tomatoes can grow well in containers with enough light.</p>

  <section>
    <h3>Choosing a container</h3>
    <p>Pick a sturdy pot with drainage holes.</p>
  </section>

  <section>
    <h3>Watering the plant</h3>
    <p>Check the soil regularly and water when it begins to dry.</p>
  </section>
</article>
~~~

A section is not automatically an article just because it has a heading, and an article does not need to be a newspaper story. Choose based on whether the content is a distinct, self-contained item or a thematic part of something larger.

## The `<footer>` element

`<footer>` contains closing or supporting information for its nearest relevant section or for the page as a whole. It may contain an author, publication date, related links, or copyright information.

A page footer and an article footer have different scopes:

~~~html
<article>
  <h2>Growing mint</h2>
  <p>Mint spreads quickly, so a container can help keep it in one place.</p>
  <footer>
    <p>Written by Alex Chen</p>
  </footer>
</article>

<footer>
  <p>Copyright 2026 Garden Guide</p>
</footer>
~~~

The first footer provides information about the article. The second footer provides information about the whole page. A footer is commonly near the end of its section, but the meaning comes from what it belongs to, not its exact visual position. A `<footer>` does not create a new section by itself.

## Putting the elements together

Here is a small page that uses all six elements:

~~~html
<body>
  <header>
    <a href="/">Garden Guide</a>
    <p>Grow something good at home</p>
  </header>

  <nav>
    <ul>
      <li><a href="/plants">Plants</a></li>
      <li><a href="/guides">Growing guides</a></li>
    </ul>
  </nav>

  <main>
    <h1>Growing herbs indoors</h1>
    <p>These guides will help you start a small indoor herb garden.</p>

    <section>
      <h2>Featured guide</h2>
      <article>
        <header>
          <h3>How to grow basil</h3>
          <p>By Mira Patel</p>
        </header>
        <p>Basil grows best with warmth, bright light, and evenly moist soil.</p>
        <footer>
          <p>Updated <time datetime="2026-10-12">October 12, 2026</time></p>
        </footer>
      </article>
    </section>

    <section>
      <h2>More growing guides</h2>
      <ul>
        <li><a href="/guides/mint">Growing mint</a></li>
        <li><a href="/guides/parsley">Growing parsley</a></li>
      </ul>
    </section>
  </main>

  <footer>
    <p>Copyright 2026 Garden Guide</p>
  </footer>
</body>
~~~

Read the structure by asking what each element contains and what it is for. The main page content sits in `<main>`. The guide list is a thematic `<section>`. The individual guide is a self-contained `<article>`, with its own introductory and closing information. The page-level `<header>`, `<nav>`, and `<footer>` describe the surrounding site content.

The example shows HTML structure only. It does not dictate whether the navigation appears above or beside the main content. CSS controls that presentation.

## Common mistakes

### Using `<header>` as a synonym for a heading

`<header>` is a container for introductory content. Use `<h1>` through `<h6>` for headings.

### Wrapping every link in `<nav>`

`<nav>` is intended for important navigation areas. A small related link in a paragraph or footer does not always need a navigation landmark.

### Adding several visible `<main>` elements

Use one visible `<main>` for the unique central content of the document. Repeated navigation, logos, and page-wide footer details belong outside it.

### Using `<section>` as a generic box

Use `<section>` when the content forms a thematic group, typically with its own heading. Use `<div>` when you only need a generic wrapper.

### Treating every card as an `<article>`

A card is a visual design pattern, not an HTML meaning. Use `<article>` when the content is self-contained, not simply because CSS makes it look like a card.

### Assuming `<footer>` must always be the last element in the file

A footer belongs to a page or section and commonly appears near that content's end. It can be the footer of an individual article, even when more page content follows.

### Using these elements to control layout

Semantic elements communicate the roles of content. Use CSS to create columns, spacing, colors, and page layouts.

## Try it yourself

1. Create a page with a site `<header>`, a primary `<nav>`, one `<main>`, and a page `<footer>`.
2. Add a main heading and two thematic `<section>` elements, each with an appropriate heading.
3. Add a self-contained news item as an `<article>` with its own heading and author information.
4. Add an article `<footer>` with a publication date marked by `<time>`.
5. Decide whether a list of related links belongs in `<nav>` or in ordinary page content. Explain your choice.
6. Inspect a page made entirely from `<div>` elements. Replace only the elements whose content has a clear semantic purpose.
7. Compare `<section>` and `<article>` in your own words. Use an example to explain why one is a part of a larger topic and the other can stand alone.
8. Use CSS to move the navigation beside the main content. Confirm that the HTML still describes the same page structure.

## Key points

- `<header>` groups introductory content for a page or section. Use heading elements for titles.
- `<nav>` identifies major navigation links. Not every collection of links needs it.
- `<main>` contains the page's dominant, unique content. A document should have one visible main element.
- `<section>` groups content by theme and usually has a heading.
- `<article>` marks a self-contained composition that can stand on its own.
- `<footer>` contains supporting information for its page or section and does not create a new section.
- Choose these elements for their meaning. Use CSS to control their visual layout.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [37 - Semantic HTML and page structure](37-semantic-html.md) | [Q&A](../qnas/38-page-structure-elements.md) | [Example](../examples/38-page-structure-elements.md) | [39 - Landmarks, headings, and accessible page navigation](39-landmarks-and-page-navigation.md) |
