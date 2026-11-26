# Example 16 - URLs, file paths, and page fragments

## Question

Build a guide page located at https://example.com/guides/index.html. Add links to a web address, nearby and parent-folder pages, a page section, a search URL with query values, and a file whose name contains a space. Include matching section IDs in the guide.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>URLs and Page Sections | Garden Journal</title>
  </head>
  <body>
    <header>
      <nav aria-label="Page contents">
        <ul>
          <li><a href="#basics">URL basics</a></li>
          <li><a href="#more-links">More links</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>URLs and page sections</h1>
      <p>
        This example page is at
        <code>https://example.com/guides/index.html</code>.
      </p>

      <section id="basics">
        <h2>URL basics</h2>
        <p>
          Visit the <a href="https://example.com/resources/">Example resources page</a>
          using an absolute web URL.
        </p>
        <p>
          Read the <a href="introduction.html">HTML introduction</a> in this
          folder, or return to the <a href="../index.html">site home page</a>
          one folder above.
        </p>
        <p>
          Open the <a href="/help/index.html">help center</a> from the website
          root.
        </p>
        <p>
          Find the <a href="lessons/elements.html#headings">heading section</a>
          in another page.
        </p>
      </section>

      <section id="more-links">
        <h2>More links</h2>
        <p>
          Search for beginner HTML:
          <a href="search.html?q=html&amp;level=beginner#results">
            View beginner HTML search results
          </a>
        </p>
        <p>
          Download the
          <a href="../files/my%20notes.pdf">HTML notes PDF</a>.
        </p>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser displays a page with a contents navigation, two sections, and links to several destinations. Selecting **URL basics** or **More links** moves to the matching section in this page. The other links point to a website, pages and files, a search destination, or a section on another page.

Assuming the current page is https://example.com/guides/index.html, the relative link introduction.html resolves to https://example.com/guides/introduction.html. The ../index.html link resolves to https://example.com/index.html. The search link includes two query values followed by the results fragment.

The example.com paths are illustrative. The corresponding pages, search behavior, and PDF must exist for those links to work on a real site.

## Explanation

- An absolute web URL includes a scheme such as https and a host such as example.com. A relative URL leaves those parts out and is resolved from the current page.
- A path such as introduction.html stays in the current folder. The ../ prefix moves up one folder, while a leading slash starts at the website root.
- A fragment begins with # and identifies an element whose id matches it. The ids basics and more-links are unique in this document.
- A query begins with ?. The query values come before the fragment. In an HTML attribute, write the ampersand between query values as &amp;.
- The sequence %20 represents the space in the PDF filename. A Windows path such as D:\html\index.html is a path on one computer, not a public website URL.
- Adding a query to a link does not create search behavior by itself. The destination page must read and use those values.

## How to try it

Copy the HTML code block using its copy button and save it as index.html inside a guides folder. Create the linked pages and files in the matching folders, then follow each link. Change the current page's location and work out how its relative URLs resolve.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 16 - URLs, file paths, and page fragments](../lessons/16-urls-paths-and-fragments.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [15 - Links and the anchor element](15-links.md) | [Lesson](../lessons/16-urls-paths-and-fragments.md) | [Q&A](../qnas/16-urls-paths-and-fragments.md) | [17 - Navigation and linking between pages](17-navigation-and-page-links.md) |
