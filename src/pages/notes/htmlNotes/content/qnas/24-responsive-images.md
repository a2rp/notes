# 24 - Responsive images: Questions and Answers

Practice questions for [Lesson 24 - Responsive images: picture, srcset, and sizes](../lessons/24-responsive-images.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is the purpose of srcset?

- A. To list image file candidates for the browser to choose from.
- B. To describe an image for screen readers.
- C. To set a CSS breakpoint.
- D. To add a caption.

**Answer: A.** Srcset provides image candidates, such as different widths or pixel densities.

### 2. What does the 800w descriptor mean in a srcset candidate?

- A. The image is always displayed 800 CSS pixels wide.
- B. The image file has an intrinsic width of 800 pixels.
- C. The image is 800 pixels tall.
- D. The image is an 800x resolution image.

**Answer: B.** A w descriptor states the candidate file's pixel width. It does not set its rendered CSS width.

### 3. What does sizes describe when srcset uses width descriptors?

- A. The image's expected layout width at different media conditions.
- B. The file size in kilobytes.
- C. The image's alt text.
- D. The number of images in the source set.

**Answer: A.** Sizes tells the browser how much layout width the image is expected to occupy.

### 4. What determines the rendered layout width of an image?

- A. The sizes attribute alone.
- B. CSS and the page layout.
- C. The source element's type attribute.
- D. The file extension.

**Answer: B.** Sizes is a hint used for selecting candidates. CSS still controls the image's visual layout.

### 5. Which descriptors are useful for different pixel densities of a fixed-size logo?

- A. 1x and 2x
- B. 100w and 200w
- C. 1px and 2px
- D. small and large

**Answer: A.** Density descriptors such as 1x and 2x offer variants for the same displayed size.

### 6. What is picture especially useful for?

- A. Replacing all img elements.
- B. Choosing a different crop or format based on conditions.
- C. Adding a border to an image.
- D. Writing an image caption.

**Answer: B.** Picture and source can select art-directed crops or supported formats.

### 7. What must picture contain to display an image?

- A. A source only.
- B. An img element.
- C. A figcaption only.
- D. A link element.

**Answer: B.** The img element displays the selected image and provides the alt text.

### 8. Where does the useful alt text go in a picture?

- A. On each source element.
- B. On the img element.
- C. On the picture element.
- D. On the sizes attribute.

**Answer: B.** The img element is the displayed image and carries its text alternative.

### 9. How does the browser evaluate source elements in picture?

- A. It chooses the last source in the list.
- B. It checks them in order and uses an applicable supported source.
- C. It loads all source images and displays them together.
- D. It ignores media and type.

**Answer: B.** The browser considers source elements in order, including their media conditions and supported type.

### 10. Which srcset value uses valid width descriptors?

- A. image-small.jpg 480w, image-large.jpg 1200w
- B. image-small.jpg 480px, image-large.jpg 1200px
- C. image-small.jpg 480x, image-large.jpg 1200x
- D. image-small.jpg 480h, image-large.jpg 1200h

**Answer: A.** A w descriptor uses a number followed by w to represent the file's pixel width.

## True or false

### 1. The srcset attribute can offer multiple versions of the same image.

**Answer: True.** It can list different widths or pixel densities for the browser to select from.

### 2. A sizes attribute resizes an image in the layout.

**Answer: False.** CSS controls the rendered layout width. Sizes describes the expected width to help source selection.

### 3. A 1200w candidate describes a file that is 1200 pixels wide.

**Answer: True.** The descriptor identifies the file's intrinsic pixel width.

### 4. Width descriptors and density descriptors can be mixed in one srcset value.

**Answer: False.** Use either w descriptors or x descriptors in a given srcset value, not both.

### 5. The picture element itself draws the image.

**Answer: False.** The img child displays the selected image.

### 6. An img element should be included inside picture as the fallback image.

**Answer: True.** It is also where the alternative text belongs.

### 7. Source elements in a picture should come after img.

**Answer: False.** Put source elements before the img element.

### 8. The type attribute can help a browser skip an image format it does not support.

**Answer: True.** The browser can use the type hint when selecting from picture sources.

### 9. Alt text belongs on the source element inside picture.

**Answer: False.** Put the useful alternative text on img.

### 10. Width and height on img can help the browser reserve space with the image's aspect ratio before it loads.

**Answer: True.** The dimensions help the browser determine the image's aspect ratio early.

## Fill in the blanks

### 1. The attribute that lists candidate image files is ______.

**Answer: srcset.**

### 2. The attribute that describes expected layout width for width-based candidates is ______.

**Answer: sizes.**

### 3. The ______ element groups source choices for an img element.

**Answer: picture.**

### 4. The ______ element inside picture displays the selected image.

**Answer: img.**

### 5. A source width descriptor uses the letter ______, as in 800w.

**Answer: w.**

### 6. A pixel-density descriptor uses values such as 1x and ______.

**Answer: 2x.**

### 7. The text alternative for an image is provided by the ______ attribute on img.

**Answer: alt.**

### 8. The ______ attribute on source can identify an image format such as image/avif.

**Answer: type.**

## Short-answer questions

### 1. What is responsive image source selection?

**Answer:** It is offering multiple image files so the browser can choose one suited to the layout, display density, or supported format.

### 2. How are w descriptors different from x descriptors?

**Answer:** W descriptors identify a file's intrinsic pixel width. X descriptors identify pixel density for an image intended to appear at a fixed size.

### 3. Why use sizes with width descriptors?

**Answer:** The browser needs an estimate of the image's rendered layout width to choose among w candidates. Sizes provides that estimate at different media conditions.

### 4. Does sizes replace CSS sizing?

**Answer:** No. CSS controls the displayed layout. Sizes is a source-selection hint and should describe the layout CSS creates.

### 5. When should you use picture for art direction?

**Answer:** Use it when the design needs a different crop or composition under a particular condition, such as a portrait crop on narrow screens.

### 6. What is the role of img inside picture?

**Answer:** Img displays the chosen image, acts as a fallback, and carries the alt text.

### 7. Why include width and height attributes on img?

**Answer:** They let the browser determine the image's aspect ratio before it loads, which can help reserve space and reduce layout shifts.

### 8. Why should all art-directed crops be considered when writing alt?

**Answer:** The browser may display any selected crop. The alternative should still communicate the relevant information, and essential meaning should also appear in nearby text if needed.

## Practical coding questions

### 1. Offer three width candidates for an image that uses the full viewport on small screens and 720 pixels on wide screens.

**Answer:**

~~~html
<img
  src="images/coast-800.jpg"
  srcset="
    images/coast-480.jpg 480w,
    images/coast-800.jpg 800w,
    images/coast-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 720px"
  width="1200"
  height="800"
  alt="A rocky coastline with waves breaking below a lighthouse">
~~~

The width descriptors identify file widths. Sizes describes the expected rendered slot at the breakpoint and on larger screens.

### 2. A photo fills the viewport on small devices and half of the viewport on larger layouts. Write a sizes value.

**Answer:**

~~~html
sizes="(max-width: 600px) 100vw, 50vw"
~~~

The first matching media condition gives the expected image slot width. CSS must create a layout that matches this hint.

### 3. Offer 1x and 2x versions of a fixed-size logo.

**Answer:**

~~~html
<img
  src="images/logo-1x.png"
  srcset="images/logo-1x.png 1x, images/logo-2x.png 2x"
  width="160"
  height="48"
  alt="Northstar Library">
~~~

The files represent the same logo at different pixel densities for the same displayed size.

### 4. Show a portrait crop on narrow screens and a landscape crop elsewhere.

**Answer:**

~~~html
<picture>
  <source
    media="(max-width: 600px)"
    srcset="images/hiker-portrait.jpg">
  <img
    src="images/hiker-landscape.jpg"
    width="1200"
    height="800"
    alt="A hiker looking across a valley at sunrise">
</picture>
~~~

The source is used when its media condition matches. Otherwise, the img fallback is displayed.

### 5. Offer AVIF and WebP formats with a JPEG fallback.

**Answer:**

~~~html
<picture>
  <source srcset="images/exhibit.avif" type="image/avif">
  <source srcset="images/exhibit.webp" type="image/webp">
  <img
    src="images/exhibit.jpg"
    width="1200"
    height="800"
    alt="A ceramic vase displayed on a gallery plinth">
</picture>
~~~

The browser uses an applicable supported source. Img provides the fallback.

### 6. Correct the order of these elements inside picture.

~~~html
<picture>
  <img src="images/river-wide.jpg" alt="A river winding through a valley">
  <source media="(max-width: 600px)" srcset="images/river-tall.jpg">
</picture>
~~~

**Answer:**

~~~html
<picture>
  <source media="(max-width: 600px)" srcset="images/river-tall.jpg">
  <img src="images/river-wide.jpg" alt="A river winding through a valley">
</picture>
~~~

Put source choices before img.

### 7. Move the alternative text to the correct element.

~~~html
<picture>
  <source srcset="images/bird.avif" type="image/avif" alt="A blue jay on a branch">
  <img src="images/bird.jpg">
</picture>
~~~

**Answer:**

~~~html
<picture>
  <source srcset="images/bird.avif" type="image/avif">
  <img src="images/bird.jpg" alt="A blue jay perched on a branch">
</picture>
~~~

Source does not provide the displayed image's alt text. Put it on img.

### 8. Add dimensions to help the browser reserve space for a 1200 by 800 image.

**Answer:**

~~~html
<img
  src="images/mountain.jpg"
  width="1200"
  height="800"
  alt="A snow-covered mountain above a forest">
~~~

The dimensions describe the intrinsic aspect ratio so the browser can reserve space before the image loads.

## Related lesson

- [Lesson 24 - Responsive images: picture, srcset, and sizes](../lessons/24-responsive-images.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [23 - Embedding external content safely](23-safe-embedded-content.md) | [Lesson](../lessons/24-responsive-images.md) | [Example](../examples/24-responsive-images.md) | [25 - Inline SVG and MathML in HTML](25-svg-and-mathml.md) |
