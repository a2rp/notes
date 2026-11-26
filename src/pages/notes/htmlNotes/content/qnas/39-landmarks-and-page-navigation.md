# 39 - Landmarks, headings, and accessible page navigation: Questions and Answers

Use these questions to review [Chapter 39 - Landmarks, headings, and accessible page navigation](../lessons/39-landmarks-and-page-navigation.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is the main purpose of a landmark?

A. To set the visual position of a page section

B. To identify a major area of a page so assistive technologies can help users navigate to it

C. To replace headings inside the page

D. To add keyboard behavior to every element

**Answer: B.** Landmarks describe the high-level organization of a page and can provide shortcuts to important areas. CSS controls visual placement, and landmarks do not replace headings or interaction behavior.

### 2. Which element provides a `navigation` landmark by default?

A. `<nav>`

B. `<div>`

C. `<footer>`

D. `<h2>`

**Answer: A.** A `<nav>` element identifies a navigation section. A generic `<div>` does not become a landmark without additional semantics.

### 3. Under which condition does a `<section>` provide a `region` landmark?

A. Whenever it contains a paragraph

B. Whenever it has a CSS class

C. When it has an accessible name

D. Whenever it is inside `<main>`

**Answer: C.** A named section can be exposed as a region landmark. Use this for significant content that benefits from direct landmark navigation, not every section.

### 4. A page has a primary menu and an in-page table of contents. What should their landmark names do?

A. Both should be named "Navigation"

B. They should have distinct, descriptive names

C. They should both have no name in every case

D. They should use the same `id`

**Answer: B.** Distinct names help users tell repeated navigation landmarks apart. For example, use names such as "Primary" and "On this page".

### 5. Which heading structure best represents a page title, two main topics, and a subtopic under the second topic?

A. `<h1>`, `<h2>`, `<h2>`, then `<h3>`

B. `<h1>`, `<h3>`, `<h3>`, then `<h5>`

C. Four `<h1>` elements

D. Paragraphs styled to look like headings

**Answer: A.** Use the top-level heading for the page topic, the next level for main topics, and a lower level for a nested topic. The heading rank should communicate hierarchy, not visual size.

### 6. What is the job of a skip link?

A. To hide navigation from assistive technologies

B. To let users bypass repeated content and jump to a useful area

C. To replace the page's `<main>` element

D. To open the page in a new tab

**Answer: B.** A skip link is an ordinary link that can take keyboard users past repeated content such as a site-wide header and navigation.

### 7. Which code correctly connects a skip link to the main content?

A. `<a href="main-content">Skip</a><main id="main-content">`

B. `<a href="#main-content">Skip to main content</a><main id="main-content">`

C. `<a id="#main-content">Skip</a><main href="main-content">`

D. `<button href="#main-content">Skip</button><main id="main-content">`

**Answer: B.** The link's fragment value begins with `#` and matches the destination element's `id`. IDs should be unique within the document.

### 8. What does a heading outline provide that a landmark list does not?

A. A detailed hierarchy of topics within page content

B. The visual coordinates of every section

C. Automatic keyboard behavior for custom controls

D. A list of all colors on the page

**Answer: A.** Landmarks identify broad page areas. Headings describe the topics and subtopics within those areas.

### 9. Does `<section>` automatically reset heading levels inside it?

A. Yes, the first heading in every section becomes an `<h1>` automatically

B. Yes, the browser chooses the heading level from the section's nesting

C. No, authors should choose heading levels that reflect the actual hierarchy

D. No, headings should not be used inside sections

**Answer: C.** Sectioning elements do not automatically restart heading levels. Use heading elements in a logical hierarchy.

### 10. Which is the best practice for the page's primary heading on a typical content page?

A. Use a single `<h1>` for the page's main topic

B. Use `<h6>` because it is the smallest

C. Use `<h1>` only when the heading needs to look the largest

D. Use as many `<h1>` elements as there are landmarks

**Answer: A.** A single page-level `<h1>` is a clear convention for identifying the main topic. Style it with CSS if its visual size needs adjustment.

## True or false

### 1. A landmark helps identify a major page area for navigation.

**Answer: True.** Assistive technologies can provide ways to move among landmarks such as main content and navigation areas.

### 2. Every `<section>` automatically becomes a region landmark.

**Answer: False.** A section needs an accessible name to provide a region landmark. Name only the sections that are significant enough for direct navigation.

### 3. A `<header>` inside an `<article>` is always the page-wide banner landmark.

**Answer: False.** It introduces the article. A header nested within sectioning content does not represent the page-wide banner.

### 4. A page should usually have one visible `<main>` element for its central content.

**Answer: True.** The main landmark identifies the unique, central page content. Repeated site content normally belongs outside it.

### 5. A skip link and a main landmark have identical purposes, so only one can be used.

**Answer: False.** The landmark provides a navigation shortcut for assistive technologies. A skip link is a focusable link that keyboard users can activate. They complement each other.

### 6. Heading levels should be chosen according to content hierarchy, not their default font size.

**Answer: True.** The heading rank communicates the relationship between topics. CSS controls font size and other visual styles.

### 7. Two navigation landmarks on one page should have distinct names when their purposes differ.

**Answer: True.** Names such as "Primary" and "On this page" help users distinguish separate navigation areas.

### 8. Adding `role="navigation"` to a native `<nav>` is required for screen readers to recognize it.

**Answer: False.** `<nav>` already provides the native navigation role. Redundantly adding the same role is unnecessary.

## Short-answer questions

### 1. Name four common landmarks and the HTML elements that provide them.

**Answer:** `<main>` provides the `main` landmark, `<nav>` provides `navigation`, `<aside>` provides `complementary`, and a page-level `<header>` can provide `banner`. A page-level `<footer>` can provide `contentinfo`.

### 2. How are landmarks different from headings?

**Answer:** Landmarks identify broad page areas, such as the main content or primary navigation. Headings identify topics and subtopics within those areas. Users can navigate with either outline, depending on what they need to find.

### 3. Why should repeated navigation landmarks have distinct names?

**Answer:** A user may encounter a primary site menu and an in-page table of contents on the same page. Names that describe their purpose help distinguish the two areas when navigating by landmarks.

### 4. What makes a `<section>` a region landmark?

**Answer:** The section needs an accessible name, usually associated with its visible heading by `aria-labelledby`. It should also be important enough that a direct landmark shortcut is useful.

### 5. What is a skip link, and where is it usually placed?

**Answer:** A skip link lets users bypass repeated page content. It is placed near the beginning of the document, before repeated header or navigation content, and points to the main content or another useful destination.

### 6. What should you check when creating a heading hierarchy?

**Answer:** Use heading ranks to show the relationship between topics. Usually give the page one `<h1>`, use `<h2>` for its main topics, and use lower levels for nested topics. Avoid skipping forward levels and do not choose headings for font size.

### 7. What is the difference between `aria-label` and `aria-labelledby` in these examples?

**Answer:** `aria-label` supplies a short accessible name directly in an attribute. `aria-labelledby` points to existing text in the document, often a visible heading, that names the area.

### 8. Why should a page not make every wrapper into a landmark?

**Answer:** Landmarks are intended for major areas users may want to reach directly. Too many small landmarks make the page outline noisy and harder to use. Generic wrappers usually need no landmark role.

## Practical questions

### 1. Give these two navigation areas distinct accessible names.

~~~html
<nav>
  <a href="/">Home</a>
  <a href="/guides">Guides</a>
</nav>

<nav>
  <a href="#soil">Soil</a>
  <a href="#water">Water</a>
</nav>
~~~

**Answer:**

~~~html
<nav aria-label="Primary">
  <a href="/">Home</a>
  <a href="/guides">Guides</a>
</nav>

<nav aria-label="On this page">
  <a href="#soil">Soil</a>
  <a href="#water">Water</a>
</nav>
~~~

The first navigation moves around the site. The second moves to topics within the current page.

### 2. Fix this heading hierarchy for a page title, a main topic, and a nested topic.

~~~html
<h1>Growing herbs</h1>
<h3>Choosing a pot</h3>
<h5>Drainage holes</h5>
~~~

**Answer:**

~~~html
<h1>Growing herbs</h1>
<h2>Choosing a pot</h2>
<h3>Drainage holes</h3>
~~~

The heading levels now show the parent and child relationships without skipping forward ranks.

### 3. Add a skip link that points to this main content.

~~~html
<main id="main-content">
  <h1>City garden guide</h1>
</main>
~~~

**Answer:** Add the link near the start of the document and match its fragment to the main element's `id`:

~~~html
<a href="#main-content">Skip to main content</a>

<main id="main-content">
  <h1>City garden guide</h1>
</main>
~~~

The link is reachable by keyboard and bypasses repeated content placed between the link and the main area.

### 4. Make this significant section a named region landmark using its visible heading.

~~~html
<section>
  <h2 id="hours-heading">Opening hours</h2>
  <p>Monday to Friday, 9 a.m. to 5 p.m.</p>
</section>
~~~

**Answer:**

~~~html
<section aria-labelledby="hours-heading">
  <h2 id="hours-heading">Opening hours</h2>
  <p>Monday to Friday, 9 a.m. to 5 p.m.</p>
</section>
~~~

`aria-labelledby` associates the section with its visible heading. Use this for an important region that benefits from direct landmark navigation.

### 5. Create a table of contents with links to two sections.

**Answer:** Give each target a unique ID, then use matching fragment links inside a named navigation landmark:

~~~html
<nav aria-label="On this page">
  <ul>
    <li><a href="#soil">Prepare the soil</a></li>
    <li><a href="#watering">Watering</a></li>
  </ul>
</nav>

<section aria-labelledby="soil">
  <h2 id="soil">Prepare the soil</h2>
  <p>Remove weeds and loosen the ground.</p>
</section>

<section aria-labelledby="watering">
  <h2 id="watering">Watering</h2>
  <p>Water deeply when the soil begins to dry.</p>
</section>
~~~

Each in-page link points to the section heading whose ID matches the fragment.

### 6. This page has a main heading, four main topics, and a subtopic within the second topic. Choose the heading levels.

**Answer:** Use `<h1>` for the page topic, `<h2>` for each of the four main topics, and `<h3>` for the subtopic nested inside the second topic. The page structure does not require a heading to look larger than another. CSS controls appearance.

### 7. Does this nested header create the page-wide banner landmark?

~~~html
<article>
  <header>
    <h2>How to grow basil</h2>
    <p>By Mira Patel</p>
  </header>
  <p>Basil likes warmth and bright light.</p>
</article>
~~~

**Answer:** No. This header introduces the article. It is not the site-wide banner. A page-level header belongs in the page context, outside the article.

### 8. Correct the redundant ARIA role on this native landmark.

~~~html
<nav role="navigation" aria-label="Primary">
  <a href="/plants">Plants</a>
</nav>
~~~

**Answer:** Remove the redundant role and keep the accessible name if needed:

~~~html
<nav aria-label="Primary">
  <a href="/plants">Plants</a>
</nav>
~~~

The native `<nav>` element already provides the navigation role.

### 9. Improve the link text in this table of contents.

~~~html
<nav aria-label="On this page">
  <a href="#lighting">More</a>
  <a href="#containers">Click here</a>
</nav>
~~~

**Answer:** Use text that names the destination:

~~~html
<nav aria-label="On this page">
  <a href="#lighting">Choosing a bright location</a>
  <a href="#containers">Choosing containers</a>
</nav>
~~~

Descriptive link text remains understandable when a person reviews links out of their original visual context.

### 10. A page has six small named regions, each containing only one sentence. What should the author reconsider?

**Answer:** Reconsider whether every region needs to be a landmark. Keep direct region navigation for content important enough to find quickly. Use headings and ordinary sections for the rest so the landmark list stays useful.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [38 - Header, navigation, main, section, article, and footer](38-page-structure-elements.md) | [Lesson](../lessons/39-landmarks-and-page-navigation.md) | [Example](../examples/39-landmarks-and-page-navigation.md) | [40 - Accessibility with native HTML](40-accessibility-with-html.md) |
