# Example 17 - Navigation and linking between pages

## Question

Create a course page with separate main, breadcrumb, on-page, and chapter navigation regions. Label each region clearly, mark the current page, and link only to real previous and next pages.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Navigation and Page Links | HTML Course</title>
  </head>
  <body>
    <header>
      <h1>HTML Course</h1>
      <nav aria-label="Main">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/courses/">Courses</a></li>
          <li><a href="/courses/html/">HTML guide</a></li>
          <li>
            <a href="/courses/html/navigation.html" aria-current="page">
              Navigation
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/courses/">Courses</a></li>
        <li><a href="/courses/html/">HTML guide</a></li>
        <li>
          <a href="/courses/html/navigation.html" aria-current="page">
            Navigation
          </a>
        </li>
      </ol>
    </nav>

    <nav aria-label="On this page">
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#navigation-regions">Navigation regions</a></li>
      </ul>
    </nav>

    <main>
      <h2 id="overview">Navigation and links</h2>
      <p>
        Navigation links help readers move around a site, find sections on a
        page, and continue through a sequence of lessons.
      </p>

      <section id="navigation-regions">
        <h2>Navigation regions have different purposes</h2>
        <p>
          The main menu links to important areas of the site. The breadcrumb
          shows where this page sits in the course. The on-page menu jumps to
          sections in this document.
        </p>
      </section>

      <nav aria-label="Chapter navigation">
        <ul>
          <li>
            <a href="/courses/html/urls-paths.html">
              Previous chapter: URLs, file paths, and page fragments
            </a>
          </li>
          <li>
            <a href="/courses/html/lists.html">
              Next chapter: Unordered, ordered, and description lists
            </a>
          </li>
        </ul>
      </nav>
    </main>
  </body>
</html>
~~~

## Expected output

The browser displays the course heading and four navigation groups: the main menu, breadcrumb, on-page links, and chapter links. The on-page links move to the matching section headings. Other links navigate to pages in the example course.

The breadcrumb shows the path from Home through Courses and the HTML guide to Navigation. Assistive technology can identify Navigation as the current page from its aria-current attribute. Without CSS, the navigation groups appear as ordinary lists and links; nav does not create a visual menu by itself.

## Explanation

- Each nav element identifies an important group of navigation links. Its aria-label distinguishes its purpose from the other navigation regions.
- The breadcrumb uses an ordered list to show the site's hierarchy. Its final link marks the current page with aria-current="page".
- The on-page links use fragments that match the ids overview and navigation-regions on this page.
- The chapter navigation has previous first and next second. Both links point to sample pages that should exist on the site.
- The main menu and breadcrumb both link to the current page and identify it. aria-current communicates current-page state but does not add visual styling.
- Use nav for important navigation groups. A small group of related links does not always need its own nav element.

## How to try it

Copy the HTML code block using its copy button, save it as navigation.html in the matching course folder, and open it in a browser. Follow the on-page links, then change the current page in the main menu and breadcrumb. Update the destination paths to match the folders used by your site.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 17 - Navigation and linking between pages](../lessons/17-navigation-and-page-links.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [16 - URLs, file paths, and page fragments](16-urls-paths-and-fragments.md) | [Lesson](../lessons/17-navigation-and-page-links.md) | [Q&A](../qnas/17-navigation-and-page-links.md) | [18 - Unordered, ordered, and description lists](18-lists.md) |
