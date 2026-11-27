# 05. Images, figures, and responsive sources

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Links, paths, and navigation](./04-links-paths-and-navigation.md) | [Notes index](../README.md) | [Next: Audio, video, and embedded content](./06-audio-video-and-embedded-content.md) |

## Add an image with useful alternative text

Use img to embed an image. The src identifies the file, and alt gives a text alternative when the image conveys information.

~~~html
<img
  src="./images/planting-plan.jpg"
  alt="Three garden beds arranged beside a sunny fence"
  width="1200"
  height="800"
/>
~~~

Write alt text for the image's purpose in its context. Do not repeat details already given in nearby text. If an image is decorative and adds no information, use an empty alt value: alt="".

~~~html
<img src="./images/orange-divider.svg" alt="" />
~~~

An omitted alt value is different from an empty alt value. Empty alt tells assistive technology that the image can be skipped.

## Group an image and caption

Use figure for self-contained content such as an image with a caption, and figcaption for the caption.

~~~html
<figure>
  <img
    src="./images/seedlings.jpg"
    alt="Young seedlings growing in small pots"
    width="960"
    height="640"
  />
  <figcaption>Seedlings started indoors in early spring.</figcaption>
</figure>
~~~

A caption can explain context that does not fit into a short alt description. Use figure only when the image and caption form a meaningful unit.

## Offer image files for different screen sizes

srcset provides multiple image candidates. sizes tells the browser how wide the image is expected to appear at different viewport sizes.

~~~html
<img
  src="./images/garden-800.jpg"
  srcset="./images/garden-480.jpg 480w, ./images/garden-800.jpg 800w, ./images/garden-1400.jpg 1400w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="A small vegetable garden with raised beds"
  width="1400"
  height="900"
/>
~~~

The width descriptors describe the source files, not the rendered CSS width. Give the browser accurate file dimensions and sizing hints so it can choose an appropriate candidate.

## Use picture for art direction

picture lets the browser choose a source based on media conditions or supported file types. The img element inside remains required and provides the fallback and alternative text.

~~~html
<picture>
  <source
    media="(max-width: 600px)"
    srcset="./images/garden-portrait.jpg"
  />
  <source
    type="image/avif"
    srcset="./images/garden.avif"
  />
  <img
    src="./images/garden-wide.jpg"
    alt="Raised vegetable beds beside a fence"
    width="1400"
    height="900"
  />
</picture>
~~~

Use picture when a different crop or file format is useful. Use srcset on img when the same image composition is available at different resolutions.

## Keep images from shifting page content

Set width and height when the source dimensions are known. The browser can reserve the image's aspect ratio before the file loads. loading="lazy" can defer images that are below the initial viewport; avoid lazy loading an important image that is immediately visible.

## Practice questions

1. Which element embeds an image?
2. What should alt text communicate?
3. How does alt="" differ from omitting alt?
4. What do figure and figcaption group?
5. What does srcset provide?
6. What does sizes tell the browser?
7. When is picture useful?
8. Why provide image width and height?

## Main references

- [Images in HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images)
- [The img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img)
- [The picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)
- [The figure element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure)