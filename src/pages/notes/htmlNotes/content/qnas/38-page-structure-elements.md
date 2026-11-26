# 38 - Header, navigation, main, section, article, and footer: Questions and Answers

Use these questions to review [Chapter 38 - Header, navigation, main, section, article, and footer](../lessons/38-page-structure-elements.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. Which element identifies the dominant, unique content of a page?

A. `<header>`

B. `<main>`

C. `<nav>`

D. `<footer>`

**Answer: B.** `<main>` contains the central content for the page. Repeated site navigation, logos, and copyright details usually belong outside it.

### 2. Which element is best for a thematic group of related content that usually has its own heading?

A. `<section>`

B. `<footer>`

C. `<nav>`

D. `<span>`

**Answer: A.** `<section>` groups content around a theme. A heading helps identify that theme.

### 3. Which element represents a self-contained composition that could stand on its own?

A. `<section>`

B. `<article>`

C. `<header>`

D. `<main>`

**Answer: B.** `<article>` is for a complete item such as a blog post, news story, product review, or forum post that can make sense independently.

### 4. Which element should identify a major group of navigation links?

A. `<nav>`

B. `<article>`

C. `<footer>`

D. `<time>`

**Answer: A.** `<nav>` identifies an important navigation area. A few ordinary links do not automatically need a navigation element.

### 5. What does a `<header>` element represent?

A. The first heading in every document

B. Introductory content for a page or a section

C. The visual top row of a page, regardless of content

D. The complete main content of a page

**Answer: B.** A header groups introductory content. It can introduce the whole page or a specific article or section.

### 6. What does a `<footer>` element represent?

A. Only the final line in the HTML file

B. Supporting or closing information for its nearest relevant section or the page

C. A section that must have a heading

D. A navigation menu in every case

**Answer: B.** A footer's meaning depends on which page or section it belongs to. An article can have its own footer even when more content follows on the page.

### 7. A site has several independent blog posts on one page. Which element best marks each post?

A. `<div>`

B. `<article>`

C. `<nav>`

D. `<main>`

**Answer: B.** Each self-contained post can be an article. The group of posts may appear within the main content of the page.

### 8. A developer needs a wrapper only to apply a CSS class, and the content has no distinct semantic purpose. Which element is suitable?

A. `<section>`

B. `<article>`

C. `<div>`

D. `<main>`

**Answer: C.** Use a generic `<div>` when grouping is needed for styling or scripting and no more meaningful element fits.

### 9. What is a useful distinction between `<section>` and `<article>`?

A. `<section>` is always visual, while `<article>` is always interactive

B. `<section>` groups a theme, while `<article>` marks a self-contained item

C. `<section>` is only for navigation, while `<article>` is only for news

D. There is no difference in their meaning

**Answer: B.** Their purposes can overlap in some page structures, but a section is a thematic part of a larger work and an article is intended to be independently meaningful.

### 10. Which statement about `<nav>` is correct?

A. Every link on a page must be inside `<nav>`

B. `<nav>` is intended for major navigation groups, not every collection of links

C. `<nav>` must contain exactly one link

D. `<nav>` controls the visual position of a menu

**Answer: B.** Use `<nav>` for an important navigation block. CSS controls where that block appears.

## True or false

### 1. The `<header>` element and a heading element such as `<h1>` mean the same thing.

**Answer: False.** `<header>` is a container for introductory content. `<h1>` through `<h6>` mark headings.

### 2. A page should generally have one visible `<main>` element for its unique central content.

**Answer: True.** The main element identifies the page's dominant content. Repeated content such as the site's common navigation usually sits outside it.

### 3. Every group of links needs to be wrapped in `<nav>`.

**Answer: False.** `<nav>` is for significant navigation areas. Ordinary links in a paragraph or a short list in a footer do not always need it.

### 4. A `<section>` is a good choice when content forms a thematic group and has a useful heading.

**Answer: True.** Sections represent thematic groupings. A heading normally identifies the subject of the section.

### 5. A visual card must use `<article>` even when its content is not independently meaningful.

**Answer: False.** A card is a visual pattern. Use `<article>` only when the content is a self-contained item, not simply because CSS gives it a card appearance.

### 6. A page can use one `<footer>` for the whole page and another for an individual article.

**Answer: True.** Each footer is associated with its nearest relevant section or with the page when there is no such sectioning ancestor.

### 7. A `<footer>` element creates a new section in the document.

**Answer: False.** A footer provides supporting information for its page or section. It does not itself introduce a new section.

### 8. The semantic structure of a page changes when CSS moves its navigation beside the main content.

**Answer: False.** CSS changes presentation and layout. The HTML continues to describe the same structural roles.

## Short-answer questions

### 1. What is the purpose of `<main>`?

**Answer:** It marks the dominant, page-specific content. Site-wide repeated content such as the common logo, primary navigation, and copyright information usually remains outside it.

### 2. When should you use `<nav>`?

**Answer:** Use it for a significant group of links that helps people navigate the site or the current page, such as a primary menu or table of contents. Do not wrap every small set of links in it.

### 3. Explain the difference between a `<section>` and an `<article>`.

**Answer:** A `<section>` groups content by theme as part of a larger page or item. An `<article>` is a self-contained composition that could be understood or reused on its own, such as a blog post or user comment.

### 4. Why is a heading usually helpful inside a `<section>`?

**Answer:** The heading names the section's topic and helps readers understand the relationship between the grouped content and the rest of the document. If there is no meaningful heading or theme, a generic wrapper may be more appropriate.

### 5. Can a page have a `<header>` inside an `<article>`? What does it introduce?

**Answer:** Yes. It introduces the article, often with its heading, author, date, or other introductory details. It is separate from the page-wide header.

### 6. Can a document have multiple `<footer>` elements?

**Answer:** Yes. A page may have a page-level footer and individual footers for articles or other sections. Each footer contains information about the section it belongs to.

### 7. Why should `<section>` not be used as a generic styling wrapper?

**Answer:** `<section>` communicates that its content forms a thematic group. If a wrapper exists only for CSS or scripting and has no distinct meaning, use `<div>`.

### 8. Do the page structure elements determine whether content appears at the top, bottom, or in a column?

**Answer:** No. They describe the roles of content. CSS controls visual placement, columns, spacing, color, and other layout details.

## Practical questions

### 1. Add the appropriate elements around the page's common header, navigation, main content, and footer.

~~~html
<a href="/">Garden Guide</a>
<ul>
  <li><a href="/plants">Plants</a></li>
  <li><a href="/guides">Guides</a></li>
</ul>
<h1>Growing herbs indoors</h1>
<p>Start a small garden on a bright windowsill.</p>
<p>Copyright 2026 Garden Guide</p>
~~~

**Answer:**

~~~html
<header>
  <a href="/">Garden Guide</a>
</header>

<nav>
  <ul>
    <li><a href="/plants">Plants</a></li>
    <li><a href="/guides">Guides</a></li>
  </ul>
</nav>

<main>
  <h1>Growing herbs indoors</h1>
  <p>Start a small garden on a bright windowsill.</p>
</main>

<footer>
  <p>Copyright 2026 Garden Guide</p>
</footer>
~~~

The header introduces the site, the navigation gives access to important destinations, the main contains the page-specific topic, and the footer contains page-level supporting information.

### 2. A page lists three independently readable product reviews. Which element should represent each review, and why?

**Answer:** Use an `<article>` for each review because each review is a self-contained item that can make sense independently. Give each article a heading that identifies the product or review.

~~~html
<article>
  <h2>Review: Trail Backpack</h2>
  <p>The adjustable straps make this pack comfortable on long walks.</p>
</article>
~~~

### 3. A long article has a section about choosing seeds and another about planting them. Show a suitable structure.

**Answer:** Keep the complete article in `<article>` and group its thematic parts with headed `<section>` elements:

~~~html
<article>
  <h2>Starting a vegetable garden</h2>

  <section>
    <h3>Choosing seeds</h3>
    <p>Choose plants that suit your local season and growing space.</p>
  </section>

  <section>
    <h3>Planting seeds</h3>
    <p>Follow the depth and spacing instructions on the seed packet.</p>
  </section>
</article>
~~~

The article is the self-contained guide. Its sections are related topics within that guide.

### 4. This element is used only to add a colored border around a list. Should it be `<section>`?

~~~html
<section class="bordered-list">
  <ul>
    <li>Seeds</li>
    <li>Soil</li>
  </ul>
</section>
~~~

**Answer:** If the list has no thematic role or heading and the wrapper is only for styling, use a `<div>`:

~~~html
<div class="bordered-list">
  <ul>
    <li>Seeds</li>
    <li>Soil</li>
  </ul>
</div>
~~~

If the list is a meaningful group with a topic, keep a `<section>` and add an appropriate heading.

### 5. A page has a primary site menu and an in-page table of contents. How can both navigation groups be marked and distinguished?

**Answer:** Use a `<nav>` for each significant navigation group, and give them different accessible names:

~~~html
<nav aria-label="Primary">
  <a href="/plants">Plants</a>
  <a href="/guides">Guides</a>
</nav>

<nav aria-label="On this page">
  <a href="#light">Light</a>
  <a href="#watering">Watering</a>
</nav>
~~~

Distinct names help users tell the navigation areas apart. Landmark naming and navigation are explored further in Chapter 39.

### 6. Add an article-level header and footer to this post.

~~~html
<article>
  <p>Growing lettuce in a pot is simple.</p>
</article>
~~~

**Answer:**

~~~html
<article>
  <header>
    <h2>Growing lettuce in a pot</h2>
    <p>By Casey Morgan</p>
  </header>

  <p>Growing lettuce in a pot is simple.</p>

  <footer>
    <p>Published <time datetime="2026-09-08">September 8, 2026</time></p>
  </footer>
</article>
~~~

The header introduces this article and its footer provides information about this article, not the whole page.

### 7. Where should the unique page heading and content go if a site logo and repeated menu appear on every page?

**Answer:** Put the repeated logo and menu outside `<main>`. Put the unique page heading and content inside the single visible `<main>` element.

~~~html
<header>
  <a href="/">Garden Guide</a>
  <nav aria-label="Primary">
    <a href="/plants">Plants</a>
  </nav>
</header>

<main>
  <h1>Growing herbs indoors</h1>
  <p>Choose herbs that fit your light and space.</p>
</main>
~~~

### 8. A page's footer contains a copyright note and two short links to terms and privacy pages. Must those links be in `<nav>`?

**Answer:** No. The footer can contain those links directly. Use `<nav>` when the links form a significant navigation area, not just because multiple links are present.

~~~html
<footer>
  <p>Copyright 2026 Garden Guide</p>
  <p><a href="/terms">Terms</a> | <a href="/privacy">Privacy</a></p>
</footer>
~~~

### 9. A developer says, "This `<header>` is the page title." What should the developer change or clarify?

**Answer:** Keep `<header>` as the introductory container, and mark the title text with a heading element:

~~~html
<header>
  <h1>Growing herbs indoors</h1>
  <p>A practical guide for a sunny windowsill</p>
</header>
~~~

The container and its heading have related but different purposes.

### 10. CSS changes a page so the navigation appears in a side column next to the main content. Do the semantic elements need to change?

**Answer:** Not if the navigation still provides navigation and the main still contains the unique central content. Keep `<nav>` and `<main>` for their meaning, then use CSS for the side-by-side layout.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [37 - Semantic HTML and page structure](37-semantic-html.md) | [Lesson](../lessons/38-page-structure-elements.md) | [Example](../examples/38-page-structure-elements.md) | [39 - Landmarks, headings, and accessible page navigation](39-landmarks-and-page-navigation.md) |
