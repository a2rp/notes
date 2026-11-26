# Example 38 - Header, navigation, main, section, article, and footer

## Question

Build a garden guide page with primary navigation, one main content area, thematic sections, self-contained articles, and both article-level and page-level introductory or closing information.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Notes - Growing Guides</title>
  </head>
  <body>
    <header>
      <a href="/">Garden Notes</a>
      <p>Practical advice for growing plants at home.</p>

      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="/guides">Growing guides</a></li>
          <li><a href="/plants">Plant directory</a></li>
          <li><a href="/community">Community</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content">
      <h1>Growing guides</h1>
      <p>Learn how to choose, plant, and care for garden favorites.</p>

      <section aria-labelledby="featured-heading">
        <h2 id="featured-heading">Featured guide</h2>

        <article>
          <header>
            <h3>How to grow basil in a pot</h3>
            <p>
              By Mira Patel |
              Updated <time datetime="2026-11-14">November 14, 2026</time>
            </p>
          </header>

          <p>
            Basil grows well in a warm, bright place. Choose a pot with drainage
            holes and use a potting mix that holds some moisture without staying
            waterlogged.
          </p>

          <section aria-labelledby="light-heading">
            <h4 id="light-heading">Choose a bright location</h4>
            <p>Place the pot where the plant receives several hours of bright light.</p>
          </section>

          <section aria-labelledby="water-heading">
            <h4 id="water-heading">Water when needed</h4>
            <p>Check the soil and water when its surface begins to feel dry.</p>
          </section>

          <footer>
            <p>Part of the indoor gardening series.</p>
            <a href="/guides/basil">Read the full basil guide</a>
          </footer>
        </article>
      </section>

      <section aria-labelledby="community-heading">
        <h2 id="community-heading">Recent community notes</h2>

        <article>
          <header>
            <h3>My first balcony harvest</h3>
            <p>
              Posted by Jordan Lee on
              <time datetime="2026-11-12">November 12, 2026</time>
            </p>
          </header>
          <p>Three small tomato plants produced enough fruit for a fresh salad.</p>
          <footer>
            <a href="/community/balcony-harvest">Read this community note</a>
          </footer>
        </article>

        <article>
          <header>
            <h3>Keeping mint in a container</h3>
            <p>
              Posted by Alex Chen on
              <time datetime="2026-11-10">November 10, 2026</time>
            </p>
          </header>
          <p>A separate pot keeps mint from spreading into nearby plants.</p>
          <footer>
            <a href="/community/container-mint">Read this community note</a>
          </footer>
        </article>
      </section>
    </main>

    <footer>
      <p>Garden Notes shares practical ideas for home growers.</p>
      <p><a href="/contact">Contact the editors</a></p>
      <p>Copyright 2026 Garden Notes.</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The page contains a site header with a brand link and primary navigation, followed by one main area. The main area has a featured guide section and a community notes section. Each section has a heading and contains one or more standalone articles. The page ends with a site footer.

Each article has its own introductory header and closing footer. The page-level header and footer describe the site, while the article-level headers and footers describe their individual articles.

These elements describe the relationships and purpose of the content. They do not decide whether the navigation appears at the top, beside the page, or in a menu. CSS controls visual layout.

## Explanation

- The site header introduces Garden Notes with its name and short description. The navigation inside it groups the site's primary links.
- The main element contains the unique content of this page. The repeated site header and footer are outside it.
- There is one visible main element. Its id can be used as a destination for a skip link, which is covered in the next lesson.
- Each section groups content around a topic and has a heading that names that topic.
- Each article is a self-contained guide or community post that could make sense outside this page.
- Article headers contain each article's heading and introductory details. Article footers contain supporting details and a related link.
- The footer after main belongs to the whole page. It contains general site information and a contact link.
- The elements express meaning and relationships. They do not create columns, colors, spacing, or other visual layout by themselves.

## How to try it

Copy the HTML code block using its copy button and save it as garden-guides.html. Open it in a browser and identify the page header, navigation, main content, sections, articles, and page footer. Compare the scope of each header and footer.

The example page links do not have destinations with content in this file. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 38 - Header, navigation, main, section, article, and footer](../lessons/38-page-structure-elements.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [37 - Semantic HTML and page structure](37-semantic-html.md) | [Lesson](../lessons/38-page-structure-elements.md) | [Q&A](../qnas/38-page-structure-elements.md) | [39 - Landmarks, headings, and accessible page navigation](39-landmarks-and-page-navigation.md) |
