# Example 56 - The base element and relative URLs

## Question

Create a small trip-planning page with relative, root-relative, and fragment links. Work out where each URL points after the browser resolves it.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Trip planning links</title>
    <base href="https://travel.example.test/guides/">
  </head>
  <body>
    <header>
      <h1>Plan a weekend trip</h1>
      <p>Choose a guide or review the packing checklist.</p>
    </header>

    <nav aria-label="Trip planning">
      <ul>
        <li><a href="weekend.html">Weekend guide</a></li>
        <li><a href="/contact/">Contact</a></li>
        <li><a href="#packing">Packing checklist</a></li>
      </ul>
    </nav>

    <main>
      <section id="packing">
        <h2>Packing checklist</h2>
        <ul>
          <li>Comfortable walking shoes</li>
          <li>Reusable water bottle</li>
          <li>Weather-appropriate clothing</li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser displays the heading, a short introduction, a three-link navigation list, and a packing checklist. The links resolve to:

| Link text | Destination |
| --- | --- |
| Weekend guide | `https://travel.example.test/guides/weekend.html` |
| Contact | `https://travel.example.test/contact/` |
| Packing checklist | `https://travel.example.test/guides/#packing` |

The fragment-only link resolves against the base URL. If the current page is hosted elsewhere, clicking Packing checklist may navigate to the base URL's document instead of scrolling within the current page. The `.test` suffix is reserved for examples, so these destinations do not point to a real site.

## Explanation

- `<base>` belongs in `<head>` and sets the document base URL.
- `weekend.html` is relative, so the browser appends it to `/guides/`.
- `/contact/` begins with a slash, so it resolves from the host root.
- `#packing` is relative too. The base URL affects where that fragment points.
- The base URL does not redirect the current page. It changes URL resolution.

## How to try it

1. Copy the HTML code block using its copy button and save it as `index.html`.
2. Compare the three destinations with the expected output table.
3. Change the base href path from `/guides/` to `/manual/` and recalculate the destinations.
4. Remove `<base>` and observe that relative links resolve against the page's own URL instead.

## Related lesson

[Read lesson 56 - The base element and relative URLs](../lessons/56-base-element-and-relative-urls.md)

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :---: | :---: | ---: |
| [55 - HTML quick reference and glossary](55-html-reference-and-glossary.md) | [Lesson](../lessons/56-base-element-and-relative-urls.md) | [Q&A](../qnas/56-base-element-and-relative-urls.md) | [57 - Image maps with map and area](57-image-maps-with-map-and-area.md) |
