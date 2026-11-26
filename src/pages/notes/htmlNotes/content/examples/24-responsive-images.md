# Example 24 - Responsive images: picture, srcset, and sizes

## Question

Create a garden page that offers several resolutions of one photo, a different crop for narrow screens, modern image formats with a JPEG fallback, and a sharp logo for high-density displays. Keep alternative text and intrinsic dimensions on the img elements.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Responsive Garden Images</title>
  </head>
  <body>
    <main>
      <h1>Garden Journal</h1>

      <section>
        <h2>Choose a suitable photo size</h2>
        <p>
          The garden photo uses the same crop in several file sizes. Its layout is expected to be 90 percent of the viewport up to 800 pixels, and 720 pixels at wider sizes.
        </p>
        <img
          src="images/garden-800.jpg"
          srcset="
            images/garden-480.jpg 480w,
            images/garden-800.jpg 800w,
            images/garden-1200.jpg 1200w"
          sizes="(max-width: 800px) 90vw, 720px"
          width="1200"
          height="800"
          alt="Raised garden beds with herbs and vegetables">
      </section>

      <section>
        <h2>Use a different crop on a narrow screen</h2>
        <picture>
          <source
            media="(max-width: 600px)"
            srcset="images/garden-portrait.jpg">
          <img
            src="images/garden-landscape.jpg"
            width="1200"
            height="800"
            alt="A gardener tending herbs beside a raised bed">
        </picture>
      </section>

      <section>
        <h2>Offer modern image formats</h2>
        <picture>
          <source srcset="images/seedlings.avif" type="image/avif">
          <source srcset="images/seedlings.webp" type="image/webp">
          <img
            src="images/seedlings.jpg"
            width="1200"
            height="800"
            alt="Young seedlings growing in a sunny greenhouse">
        </picture>
      </section>

      <section>
        <h2>Keep a fixed-size logo sharp</h2>
        <img
          src="images/garden-club-logo-1x.png"
          srcset="
            images/garden-club-logo-1x.png 1x,
            images/garden-club-logo-2x.png 2x"
          width="160"
          height="48"
          alt="Greenleaf Garden Club">
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

If the image files exist, the page displays a garden photo, an art-directed photo, a seedling photo, and the garden club logo. The browser chooses a suitable resolution candidate, the first supported picture source whose conditions match, or the img fallback.

The responsive photo's sizes value describes its expected layout width. It does not resize the image. CSS should make the layout match that hint. The narrow-screen crop may have a different shape, so the page layout should accommodate its proportions.

## Explanation

- The first img offers width candidates with 480w, 800w, and 1200w descriptors. Each file should show the same crop and use its actual pixel width in srcset.
- The sizes attribute describes the layout width expected at different viewport widths. CSS controls the rendered size; keep the sizes description consistent with the layout.
- The picture element uses a portrait crop when the media condition matches. Its img child remains necessary and carries the alt text. The alternative should remain useful for both crops.
- The next picture offers AVIF and WebP files before a JPEG fallback. The type values should match the actual file formats.
- The logo uses 1x and 2x density candidates because it appears at a fixed size. Density descriptors do not use sizes.
- Width and height describe the intrinsic dimensions and help reserve space. For different art-directed proportions, make sure the layout handles the changing aspect ratio.

## How to try it

Copy the HTML code block using its copy button and save it as responsive-garden-images.html. Create an images folder with files that match the paths and descriptions, then view the page at different viewport widths and display densities. Replace each sample image with matching versions, and keep the alt text useful for every selected crop.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 24 - Responsive images: picture, srcset, and sizes](../lessons/24-responsive-images.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [23 - Embedding external content safely](23-safe-embedded-content.md) | [Lesson](../lessons/24-responsive-images.md) | [Q&A](../qnas/24-responsive-images.md) | [25 - Inline SVG and MathML in HTML](25-svg-and-mathml.md) |
