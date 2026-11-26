# Example 48 - Favicons and document icons

## Question

Create a page that offers browsers SVG, PNG, and ICO favicon candidates, plus a separate icon for platforms that use an Apple touch icon. Keep the page title meaningful and put all icon links in the document head.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>City Garden - Visitor guide</title>

    <link
      rel="icon"
      href="favicon.ico"
      type="image/vnd.microsoft.icon">
    <link
      rel="icon"
      href="icons/city-garden-32.png"
      type="image/png"
      sizes="32x32">
    <link
      rel="icon"
      href="icons/city-garden.svg"
      type="image/svg+xml"
      sizes="any">
    <link
      rel="apple-touch-icon"
      href="icons/apple-touch-icon.png"
      sizes="180x180">
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="/garden">The garden</a></li>
          <li><a href="/workshops">Workshops</a></li>
          <li><a href="/visit">Visitor guide</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Welcome to City Garden</h1>
      <p>
        Find opening hours, workshop details, and information for planning
        your visit.
      </p>
    </main>

    <footer>
      <p>City Garden visitor information</p>
    </footer>
  </body>
</html>
~~~

## Icon files used by this page

The HTML links point to image files that the website must provide. The sizes values should match the actual files.

| File path | File to provide |
| --- | --- |
| favicon.ico | An ICO favicon |
| icons/city-garden-32.png | A 32 by 32 pixel PNG icon |
| icons/city-garden.svg | A scalable SVG icon |
| icons/apple-touch-icon.png | A 180 by 180 pixel PNG icon |

These paths are relative to the HTML document. This example assumes the document is at the website root. If the page is deployed in a subdirectory, adjust the paths so they still point to the actual icon files.

## Expected output

The page displays its heading and visitor information. The browser may use one of the rel="icon" resources in its tab, bookmark list, history, or another part of its interface. The exact icon selected depends on the browser and the context. The apple-touch-icon resource is intended for platforms that use that separate relation when saving a page to a device.

The icons do not appear as content in the page body, and they do not replace the page title shown in the browser interface.

## Explanation

- The link elements are in the head because they describe resources associated with the document.
- rel="icon" associates an icon with the current page. The browser can choose an appropriate candidate from the ICO, PNG, and SVG resources based on information such as type and sizes.
- The PNG declares sizes="32x32" because its file is expected to contain a 32 by 32 pixel icon. Declare only dimensions that the linked resource actually includes.
- The SVG declares sizes="any" because it can scale to different display sizes. Do not use any for a fixed-size bitmap.
- The ICO, PNG, and SVG paths are examples of alternative favicon candidates. The browser does not have to display all of them at once.
- apple-touch-icon is a separate platform-specific relation. It is not a replacement for rel="icon", and platforms may handle it differently.
- The page has a descriptive title. A favicon supplies an image for browser interface contexts, while the title supplies text.
- The href values are relative to this document's URL. If the page is hosted below a subpath, check that each path still resolves to the intended file.

## How to try it

Copy the HTML code block using its copy button and save it as index.html. Add the four icon files at the paths listed above, then open the page from the site root. Check the browser tab and bookmark the page to see how that browser uses the icons.

Change one href to a path that does not exist and observe that the browser may try another suitable icon candidate. If you change a PNG file, make sure its declared sizes value matches the image's actual dimensions.

This Markdown file displays the HTML and does not include or run the icon assets.

## Related lesson

[Read lesson 48 - Favicons and document icons](../lessons/48-favicons-and-icons.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [47 - Hidden, inert, tabindex, and editable content](47-visibility-and-interaction-attributes.md) | [Lesson](../lessons/48-favicons-and-icons.md) | [Q&A](../qnas/48-favicons-and-icons.md) | [49 - Search and social sharing metadata](49-search-and-social-metadata.md) |
