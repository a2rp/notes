# 17 - Navigation and linking between pages

A website often has several groups of links: the main site menu, a page's table of contents, a breadcrumb trail, and previous or next page links. The HTML `nav` element identifies an important group of navigation links so people and assistive technology can find it more easily.

## What you will learn

- When to use the `nav` element.
- How to group navigation links in a list.
- How to label separate navigation regions.
- How to build a breadcrumb trail.
- How to mark the current page and add previous or next links.
- When a group of links does not need a `nav` element.

## The nav element

Use `nav` for a major section of links that helps people move around a website or through a page:

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/courses/">Courses</a></li>
    <li><a href="/about.html">About</a></li>
  </ul>
</nav>
~~~

A list is a common way to organize navigation links, but `nav` does not require a list. Its main purpose is to identify a navigation region, not to change the links' appearance.

Browsers do not add a particular menu design just because you use `nav`. The links still work because they are anchors with destinations. CSS controls their visual layout.

## Use nav for important navigation groups

Not every group of links needs to be inside `nav`. Use it for major navigation, such as the main site menu, a page table of contents, or chapter navigation. A short set of related links in a footer can stay inside the `footer` without an extra `nav`.

A page can have more than one navigation region. Give distinct regions names that tell people what each one contains:

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/courses/">Courses</a></li>
  </ul>
</nav>

<nav aria-label="On this page">
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#examples">Examples</a></li>
  </ul>
</nav>
~~~

The labels distinguish the site-wide links from the links within the current page. Do not add several identical, unlabeled navigation regions that are hard to tell apart.

## Breadcrumb navigation

A breadcrumb shows where the current page sits in the site's hierarchy. Put it inside a `nav` element, and use an ordered list to show the sequence from the home page to the current page.

~~~html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/courses/">Courses</a></li>
    <li><a href="/courses/html/">HTML</a></li>
    <li><a href="/courses/html/navigation.html" aria-current="page">Navigation</a></li>
  </ol>
</nav>
~~~

The last item identifies the current page. The `aria-current="page"` attribute communicates that state to assistive technology. The breadcrumb should reflect the site's hierarchy, not necessarily every click the visitor made to get there.

## Previous and next page links

For a sequence such as lessons or articles, group previous and next links in a navigation region:

~~~html
<nav aria-label="Chapter navigation">
  <ul>
    <li><a href="16-urls.html">Previous chapter: URLs and paths</a></li>
    <li><a href="18-lists.html">Next chapter: HTML lists</a></li>
  </ul>
</nav>
~~~

Use clear link text so each destination makes sense. The order of items in the HTML list is previous first, then next. CSS can arrange them visually without changing their meaning.

If a page is the first or last in a sequence, include only the link that exists. Do not add a fake link with an empty or made-up destination.

## Mark a current page in a navigation list

When a navigation menu includes a link to the current page, mark it with `aria-current="page"`:

~~~html
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/courses/">Courses</a></li>
    <li><a href="/courses/html/navigation.html" aria-current="page">Navigation</a></li>
  </ul>
</nav>
~~~

This communicates which page is current. It does not add a visual highlight by itself. A later CSS lesson can style the current link.

## A complete example

~~~html
<header>
  <h1>HTML course</h1>

  <nav aria-label="Main">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/courses/html/">Course overview</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
  </nav>
</header>

<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/courses/">Courses</a></li>
    <li><a href="/courses/html/navigation.html" aria-current="page">Navigation</a></li>
  </ol>
</nav>

<main>
  <h2>Navigation and links</h2>
  <p>This lesson explains how to organize navigation links.</p>

  <nav aria-label="Chapter navigation">
    <ul>
      <li><a href="16-urls.html">Previous chapter: URLs and paths</a></li>
      <li><a href="18-lists.html">Next chapter: HTML lists</a></li>
    </ul>
  </nav>
</main>
~~~

The page uses separate navigation regions for the main site links, breadcrumb trail, and chapter sequence. Each region has a name that describes its purpose.

## Common mistakes

- Using `nav` around every group of links, even when it is not a major navigation section.
- Assuming `nav` automatically creates a styled menu.
- Leaving multiple navigation regions without names that distinguish them.
- Using a breadcrumb to show only the visitor's click history instead of the site's hierarchy.
- Forgetting to identify the current page in a breadcrumb or menu.
- Using vague labels such as “here” for previous and next destinations.
- Including a fake previous or next link when there is no page in that direction.
- Changing the order or meaning of links in the HTML just to achieve a visual layout.

## Try it yourself

1. Create a main navigation region with links to Home, Lessons, and About.
2. Add a second navigation region for links within the current page and give it a different label.
3. Build a breadcrumb with Home, Courses, HTML, and the current lesson.
4. Mark the current page in a breadcrumb or main menu using `aria-current="page"`.
5. Add previous and next lesson links in a named navigation region.
6. Remove the previous link and decide how your navigation should look for the first lesson.
7. Decide whether a short list of legal links in a footer needs a `nav` element. Explain your choice.

## Key points

- Use `nav` to mark an important group of links for moving through a site or page.
- A list is common inside `nav`, but it is not required.
- Give separate navigation regions names that distinguish their purposes.
- Breadcrumbs show a page's place in the site hierarchy.
- Use `aria-current="page"` to identify a current page in navigation.
- Previous and next links should point only to pages that exist.
- A small related link group does not always need its own `nav`.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [16 - URLs, file paths, and page fragments](16-urls-paths-and-fragments.md) | [Q&A](../qnas/17-navigation-and-page-links.md) | [Example](../examples/17-navigation-and-page-links.md) | [18 - Unordered, ordered, and description lists](18-lists.md) |
