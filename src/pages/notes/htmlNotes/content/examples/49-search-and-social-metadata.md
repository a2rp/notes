# Example 49 - Search and social sharing metadata

## Question

Create a public article page with a clear document title, a useful search description, a canonical URL, and Open Graph metadata for link previews. Keep the page's visible content consistent with its metadata.

The URLs in this example use `www.example.com` as a placeholder. Replace them with the real public URLs for your page and image before publishing.

## HTML code

~~~html
<!doctype html>
<html lang="en" prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Container Herb Garden - City Garden</title>
    <meta
      name="description"
      content="Learn how to choose containers, soil, and herbs for a productive garden on a balcony or patio.">

    <link
      rel="canonical"
      href="https://www.example.com/guides/container-herb-garden">

    <meta property="og:title" content="A Practical Guide to a Container Herb Garden">
    <meta property="og:type" content="article">
    <meta
      property="og:url"
      content="https://www.example.com/guides/container-herb-garden">
    <meta
      property="og:image"
      content="https://www.example.com/images/container-herb-garden.jpg">
    <meta
      property="og:image:alt"
      content="Pots of basil, parsley, and thyme growing on a sunny balcony">
    <meta
      property="og:description"
      content="Choose a pot, prepare the soil, and grow fresh herbs in a small outdoor space.">
  </head>
  <body>
    <header>
      <a href="/">City Garden</a>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/guides/">Guides</a></li>
          <li><a href="/visit/">Plan a visit</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <header>
          <p>City Garden Guides</p>
          <h1>Grow a Container Herb Garden</h1>
          <p>Fresh herbs can grow in a balcony box, a patio pot, or a sunny windowsill.</p>
        </header>

        <figure>
          <img
            src="/images/container-herb-garden.jpg"
            alt="Pots of basil, parsley, and thyme growing on a sunny balcony">
          <figcaption>A few well-chosen pots can provide fresh herbs in a small space.</figcaption>
        </figure>

        <section>
          <h2>Choose a container</h2>
          <p>Pick a stable pot with drainage holes. A larger container holds more soil and dries out more slowly.</p>
        </section>

        <section>
          <h2>Prepare the soil</h2>
          <p>Use a suitable potting mix and water it before planting. Leave enough room for roots to grow.</p>
        </section>

        <section>
          <h2>Select herbs for the space</h2>
          <p>Basil, parsley, and thyme are useful choices. Check how much sunlight each plant needs and group plants with similar needs.</p>
        </section>
      </article>
    </main>

    <footer>
      <p>City Garden visitor and growing guides</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The browser shows the article title in its tab and displays the article content in the page. The description, canonical link, and Open Graph properties are in the document head, so they do not appear as visible paragraphs.

A search engine may use the title or description when it presents the page, but it can choose different text for a particular search. A social service that reads Open Graph metadata may create a preview with the supplied title, description, and image. The exact preview depends on that service and its processing.

## Explanation

- `<title>` gives the document a name. It appears in browser interface areas such as the tab and may help search engines describe the page.
- `<meta name="description">` provides a page summary. Search engines may use it as a result snippet, or generate a different snippet from the page content.
- `<link rel="canonical">` signals which URL should represent this page when duplicate or very similar URLs exist. It is a hint, not a guarantee. The example keeps its canonical URL and `og:url` identical.
- The four core Open Graph properties are `og:title`, `og:type`, `og:image`, and `og:url`. They describe the page as a shareable object.
- `og:description` supplies a description for a social preview. It can be tailored to that context while remaining accurate.
- `og:image:alt` describes the preview image for people who cannot see it. The page's `<img alt>` describes the same image in the article itself.
- Open Graph metadata uses the `property` attribute. The search description uses `name="description"`.
- All metadata belongs in `<head>`. The heading and article content still need to explain the page to people who visit it.
- The image and page URLs must be public and fetchable by the service creating a preview. A local computer path is not a usable public image URL.
- Google Search does not use `meta name="keywords"` for indexing or ranking. A keyword list is not a replacement for useful page content.

## Optional crawler instruction

Place this tag in `<head>` only when you want supported search engines to leave the page out of search results. Do not add it to the public article above:

~~~html
<meta name="robots" content="noindex">
~~~

A crawler must be able to fetch the page to read this instruction. It does not make a page private or prevent someone from opening its URL. Use authentication or other access controls for private content.

## How to try it

1. Copy the HTML block using the copy button and save it as `index.html`.
2. Replace every `www.example.com` URL with the real public URL for the page or image. Keep the canonical URL and `og:url` aligned.
3. Put the image at the path used by both `og:image` and the article's `<img>`, or update both references to the correct image location.
4. Open the page in a browser. Confirm that the title appears in the tab and that the article is visible.
5. After deploying the page publicly, share its URL using a service that supports Open Graph previews. Preview tools may cache results, and each service decides how to display the metadata.
6. Do not add `noindex` to the public page unless you intend for it to be excluded from search results.

## Related lesson

[Read lesson 49 - Search and social sharing metadata](../lessons/49-search-and-social-metadata.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [48 - Favicons and document icons](48-favicons-and-icons.md) | [Lesson](../lessons/49-search-and-social-metadata.md) | [Q&A](../qnas/49-search-and-social-metadata.md) | [50 - Microdata and structured information](50-microdata.md) |
