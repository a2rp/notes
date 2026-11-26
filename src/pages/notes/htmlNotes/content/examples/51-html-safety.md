# Example 51 - Safe links and embedded content

## Question

Build a resource page with a clearly labeled external link that opens in a new tab, a link that withholds referrer information, a clearly labeled PDF download, and a restricted video embed with a direct link to its page.

The `player.example.org` addresses and PDF path below are placeholders. Replace them with the provider's documented embed and page URLs, and supply the PDF file before using this page.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden learning resources - City Garden</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/garden/">The garden</a></li>
          <li><a href="/resources/">Learning resources</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Garden learning resources</h1>

      <section aria-labelledby="reading-heading">
        <h2 id="reading-heading">Reading and downloads</h2>
        <ul>
          <li>
            <a
              href="https://example.org/html-guide"
              target="_blank"
              rel="noopener">
              Read an HTML guide (opens in a new tab or window)
            </a>
          </li>
          <li>
            <a
              href="https://example.org/html-links"
              referrerpolicy="no-referrer">
              Read an HTML links guide (sends no referrer)
            </a>
          </li>
          <li>
            <a
              href="/files/garden-planting-guide.pdf"
              download="garden-planting-guide.pdf">
              Download the garden planting guide (PDF)
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="video-heading">
        <h2 id="video-heading">Video: Watering a container garden</h2>
        <iframe
          src="https://player.example.org/embed/42"
          title="Video: Watering a container garden"
          width="640"
          height="360"
          loading="lazy"
          referrerpolicy="no-referrer"
          sandbox="allow-scripts"
          allow="fullscreen">
        </iframe>
        <p>
          If the embedded player does not work, use the
          <a href="https://player.example.org/videos/42">
            direct video page on Player Example
          </a>.
        </p>
      </section>
    </main>

    <footer>
      <p>City Garden learning resources</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The page shows three resource links and a video area. The first link requests a new browsing context and tells visitors what to expect. The second link asks the browser not to send referrer information. The PDF link expresses download intent, but the file must exist at the given path.

The video area loads content only after the placeholder `player.example.org` URLs are replaced with URLs supplied by a real provider. The frame has a title, starts loading lazily, and is sandboxed with scripts as its only sandbox permission. The direct link remains available if the embed is unavailable or difficult to use. A browser may open a new tab or a window according to its settings.

## Explanation

- Link text should describe both the destination and, when useful, what will happen. The external link says it requests a new tab or window.
- `target="_blank"` requests a new browsing context. `rel="noopener"` prevents the opened page from receiving a `window.opener` reference. It does not verify that the destination is trustworthy.
- `referrerpolicy="no-referrer"` asks the browser to omit referrer information for that link. This is a privacy choice and may affect destination analytics.
- `download` marks a resource as intended for download and suggests a filename. It does not guarantee that every browser will download every resource. This example uses a same-site path, and the PDF still has to be provided.
- The iframe `title` describes its contents to people using assistive technology. The `sandbox` attribute restricts the embedded document. This example allows scripts because a player may need them, and leaves other sandbox permissions disabled.
- `allow="fullscreen"` grants the iframe the fullscreen feature. Add permissions only when the provider documents that they are needed.
- `loading="lazy"` can defer loading an iframe below the fold. It is a performance option, not a security control.
- `referrerpolicy="no-referrer"` on the iframe omits the page's referrer when fetching the embedded resource. A provider may require a different policy.
- Keep a normal link to the provider's page near the iframe so visitors can open the content directly.
- Do not put user-supplied URLs into `href` or `src` without validating allowed schemes and destinations in the application that handles them. HTML attributes do not validate untrusted values.

## Use a button for an action

A link navigates to a resource. For an action such as opening settings, use a button instead of a `javascript:` URL:

~~~html
<button type="button">Open settings</button>
~~~

This button communicates the action semantically, but it will not perform a custom action until the application provides behavior for it.

## How to try it

1. Copy the HTML code block using its copy button and save it as `index.html`.
2. Open the page and review each link label before following it.
3. Replace the placeholder PDF path with a real same-site PDF file and keep the file type clear in the link text.
4. Replace both `player.example.org` addresses with the embed URL and public page URL supplied by the same video provider.
5. Check the provider's embed documentation. Add only the sandbox tokens and browser features the player needs, then try removing each permission to understand its effect.
6. Compare the page loaded in the iframe with the direct link. Keep the direct link if visitors need another way to access the content.

## Related lesson

[Read lesson 51 - Safe links and embedded content](../lessons/51-html-safety.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [50 - Microdata and structured information](50-microdata.md) | [Lesson](../lessons/51-html-safety.md) | [Q&A](../qnas/51-html-safety.md) | [52 - Deprecated elements and obsolete HTML](52-obsolete-html.md) |
