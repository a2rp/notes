# 24 - Responsive images: picture, srcset, and sizes

Responsive image markup lets the browser choose an image file that fits the page layout, display density, or format support. Use srcset and sizes to offer different resolutions of the same image. Use picture when you need a different crop or an alternative format. Keep an img element with useful alt text as the image that appears on the page.

## What you will learn

- How srcset offers multiple resolution candidates.
- How sizes describes the image's expected layout width.
- How picture and source support art direction and image formats.
- Why img remains necessary inside picture.
- How alt, width, and height apply to responsive images.
- How to choose between density switching and width switching.

## Why use responsive images?

One very large image can waste data on a small display. One small image can look blurry when shown large or on a high-density display. Responsive image attributes give the browser options so it can choose a suitable file for the current layout and display.

Responsive image markup describes candidate files and hints about their intended use. CSS still controls how large the image appears in the layout.

## Offer different widths with srcset and sizes

Use width descriptors such as 480w or 1200w in srcset to identify each candidate file's intrinsic width. Use sizes to describe how wide the image is expected to appear at different viewport widths.

~~~html
<img
  src="images/market-800.jpg"
  srcset="
    images/market-480.jpg 480w,
    images/market-800.jpg 800w,
    images/market-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1000px) 80vw,
         720px"
  width="1200"
  height="800"
  alt="A produce stall displaying rows of apples, pears, and oranges">
~~~

The browser uses the width candidates and the sizes hint to select a suitable image. The sizes list says the image is expected to use the full viewport width up to 600 pixels, 80 percent of the viewport up to 1000 pixels, and 720 pixels above that.

The sizes attribute is a hint about the image's layout width. It does not set the image's visual width. CSS determines the rendered layout, and the sizes value should describe that layout accurately.

Width descriptors in srcset use the actual pixel width of each file. Keep the candidates at compatible aspect ratios when they show the same image. The browser also considers the display's pixel density and may consider other conditions when choosing a candidate.

## Use density descriptors for fixed-size images

If an image appears at a fixed size but you have versions with different pixel densities, use x descriptors:

~~~html
<img
  src="images/logo-1x.png"
  srcset="images/logo-1x.png 1x, images/logo-2x.png 2x"
  width="160"
  height="48"
  alt="Northstar Library">
~~~

A 2x file has twice the pixel density of a 1x file for the same displayed size. Density descriptors do not need a sizes attribute. Do not mix x and w descriptors in the same srcset value.

## Use picture for different crops

Sometimes a design needs a different crop on a narrow display. This is called art direction. Use picture with source elements before the img element. The browser uses the first source whose media condition matches, then uses the img as the fallback.

~~~html
<picture>
  <source
    media="(max-width: 600px)"
    srcset="images/bridge-portrait.jpg">
  <img
    src="images/bridge-landscape.jpg"
    width="1200"
    height="800"
    alt="A red footbridge crossing a river beneath autumn trees">
</picture>
~~~

The picture element itself does not display the image. Its img child displays the selected image and carries the alt text. Include img even when source options are provided.

## Offer modern image formats with a fallback

A picture can offer a modern image format first and a broadly supported fallback in img. The type attribute identifies each source format so the browser can skip formats it does not support.

~~~html
<picture>
  <source
    srcset="images/exhibit.avif"
    type="image/avif">
  <source
    srcset="images/exhibit.webp"
    type="image/webp">
  <img
    src="images/exhibit.jpg"
    width="1200"
    height="800"
    alt="A ceramic vase displayed on a gallery plinth">
</picture>
~~~

The browser checks the source elements in order and uses a source it can display. If neither format source is suitable, the img element provides the fallback. The file contents and type value should agree.

Media and type can also be combined. For example, one source can provide a mobile crop in AVIF, while the img element supplies a JPEG fallback for other cases.

## Alt text still belongs on img

Responsive selection changes which file is shown, not the purpose of the image in the page. Put alt on the img element. Write it for the information the selected image contributes to the page.

If art direction changes the meaning, make sure the alternative still communicates the relevant information for every selected image. If one crop reveals a detail essential to the content, either keep that meaning in the img alternative or explain it in nearby text.

## Keep dimensions stable

Width and height on img describe the image's intrinsic dimensions. The browser can use them to reserve the correct aspect ratio before the file loads. This helps prevent nearby content from jumping as the image appears.

For different srcset files that all have the same aspect ratio, width and height can describe that shared ratio. If art-directed images have different proportions, account for the changing ratio in the layout.

## Common mistakes

- Using one oversized file for every display size.
- Forgetting sizes when using width descriptors and expecting the browser to know the CSS layout width.
- Treating sizes as a CSS rule that resizes the image.
- Mixing x and w descriptors in the same srcset.
- Putting source after img inside picture.
- Forgetting the img fallback inside picture.
- Putting alt on source instead of img.
- Using picture when the same image at different resolutions is enough.
- Using a different crop that changes important meaning without updating the text alternative.
- Giving an incorrect type for an image file.

## Try it yourself

1. Create small, medium, and large copies of the same image and list them in srcset with width descriptors.
2. Write a sizes value for an image that is full viewport width on small screens and half width on wide screens.
3. Add width and height attributes that match the source image's aspect ratio.
4. Use x descriptors to offer 1x and 2x copies of a fixed-size logo.
5. Use picture and media to show a portrait crop on narrow screens and a landscape crop otherwise.
6. Offer AVIF and WebP sources with a JPEG fallback.
7. Check that the img alt remains useful for every selected crop.
8. Explain how sizes differs from CSS width.

## Key points

- Srcset lists image candidates. Width descriptors identify candidate pixel widths, and x descriptors identify pixel densities.
- Sizes describes the expected layout width for width-descriptor candidates; CSS still determines rendered size.
- Picture and source support art direction and format selection.
- Keep img inside picture because it displays the image and carries its alternative text.
- Put the useful alt text on img.
- Width and height help the browser reserve the image's aspect ratio.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [23 - Embedding external content safely](23-safe-embedded-content.md) | [Q&A](../qnas/24-responsive-images.md) | [Example](../examples/24-responsive-images.md) | [25 - Inline SVG and MathML in HTML](25-svg-and-mathml.md) |
