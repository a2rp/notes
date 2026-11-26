# Example 39 - Landmarks, headings, and accessible page navigation

## Question

Create a garden planning page that helps people navigate by landmarks, headings, and links. Include a keyboard-accessible skip link, a named primary navigation, a table of contents, and a related-content area.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Planning a Small Garden - City Garden</title>
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to main content</a>

    <header>
      <a href="/">City Garden</a>
      <p>Ideas for growing in small spaces.</p>
    </header>

    <nav aria-label="Primary">
      <ul>
        <li><a href="/plants">Plant directory</a></li>
        <li><a href="/guides">Growing guides</a></li>
        <li><a href="/community">Community gardens</a></li>
      </ul>
    </nav>

    <main id="main-content">
      <h1>Planning a small garden</h1>
      <p>Use this guide to choose a suitable location, containers, and plants.</p>

      <nav aria-labelledby="contents-heading">
        <h2 id="contents-heading">On this page</h2>
        <ul>
          <li><a href="#prepare-heading">Prepare the space</a></li>
          <li><a href="#plants-heading">Choose plants</a></li>
          <li><a href="#containers-heading">Choose containers</a></li>
        </ul>
      </nav>

      <section aria-labelledby="prepare-heading">
        <h2 id="prepare-heading">Prepare the space</h2>
        <p>Measure the area and notice how much light it receives.</p>

        <h3>Check the sunlight</h3>
        <p>Observe the space at different times of day before choosing plants.</p>
      </section>

      <section>
        <h2 id="plants-heading">Choose plants</h2>
        <p>Choose plants that fit the available light, space, and time for care.</p>

        <h3>Start with a few varieties</h3>
        <p>Herbs such as mint and parsley can be useful choices for a small garden.</p>
      </section>

      <section>
        <h2 id="containers-heading">Choose containers</h2>
        <p>Use containers that fit the plants and leave room for healthy growth.</p>
      </section>
    </main>

    <aside aria-labelledby="related-heading">
      <h2 id="related-heading">Related guides</h2>
      <ul>
        <li><a href="/guides/potting-soil">Preparing potting soil</a></li>
        <li><a href="/guides/drainage">Improving container drainage</a></li>
      </ul>
    </aside>

    <footer>
      <p>Copyright 2026 City Garden.</p>
      <nav aria-label="Footer links">
        <ul>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </footer>
  </body>
</html>
~~~

## Expected output

The document begins with a skip link, followed by the site header and primary navigation. The main content has a page heading, a table of contents, and three garden planning topics. A related-guides area follows the main content, and the page ends with copyright and footer links.

Keyboard users can reach the skip link before the repeated site content and activate it to jump to the main content. The three navigation areas have distinct accessible names: Primary, On this page, and Footer links.

Assistive technology can use the named landmarks and heading structure as separate ways to explore the page. The HTML does not set the page's visual layout.

## Explanation

- The skip link appears before the repeated site content. Its href points to the main element's matching id.
- The header introduces the site. The primary nav contains the main site links.
- The single main element contains the page-specific content.
- The table of contents is another nav. Its aria-labelledby value points to its visible heading, so it has the name On this page.
- Every table-of-contents link points to a unique heading id. The link text identifies the destination.
- The Prepare the space section is a named region because it has aria-labelledby referencing its visible heading. The other thematic sections have headings but are not given region landmark names. This keeps landmark navigation focused on important areas.
- The h1 describes the page topic. The h2 elements introduce major topics, and h3 elements introduce subsections.
- The aside contains related information that can be understood separately from the main topic.
- The footer contains page-level information. Its navigation has the distinct name Footer links.
- These elements provide native landmark roles in their page context. No redundant role attributes are needed.

## How to try it

Copy the HTML code block using its copy button and save it as small-garden.html. Open it in a browser and press Tab to reach the skip link. Activate it, then use the table of contents to move to each topic. Compare the two navigation areas and the related-guides area.

The linked pages do not have content in this file. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 39 - Landmarks, headings, and accessible page navigation](../lessons/39-landmarks-and-page-navigation.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [38 - Header, navigation, main, section, article, and footer](38-page-structure-elements.md) | [Lesson](../lessons/39-landmarks-and-page-navigation.md) | [Q&A](../qnas/39-landmarks-and-page-navigation.md) | [40 - Accessibility with native HTML](40-accessibility-with-html.md) |
