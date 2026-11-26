# 19 - Images and alternative text

The `img` element places an image in a page. Its `alt` attribute provides equivalent text for people who cannot see or load the image. The right alternative depends on what the image contributes to the page.

## What you will learn

- How `img`, `src`, and `alt` work together.
- How to write alternative text for informative images.
- When an image should have an empty `alt` value.
- How alternative text changes when an image is a link or control.
- How to provide text for charts and other complex images.
- How to avoid common alternative text mistakes.

## Add an image with img

Use `img` to embed an image file. The `src` attribute gives its address, and `alt` provides its text alternative.

~~~html
<img src="images/bird.jpg" alt="A blue jay perched on a branch">
~~~

The `img` element is a void element, so it has no closing tag. Write the image file path in `src`. The path is resolved like other URLs and file paths.

Alternative text is used when the image cannot be seen or loaded. It should convey the information or function the image contributes to the page. Write it for the context, not as a generic inventory of every visible detail.

For example, a photo of a blue jay might need a different alternative if the page is about bird identification than if it is only a decorative background beside the words “Welcome”.

## Choose alt text by image purpose

### Informative images

If an image communicates information, write an alternative that conveys the relevant information:

~~~html
<p>
  The trail is closed today:
  <img src="images/closed-trail.png" alt="Trail closed because of flooding">
</p>
~~~

Keep it concise and useful. Avoid repeating nearby text unless the image adds something that the nearby text does not provide.

### Decorative or redundant images

If an image adds no information, or repeats information already given in nearby text, use an empty `alt` value:

~~~html
<img src="images/decorative-divider.png" alt="">
~~~

The empty value lets assistive technology skip the image instead of announcing an unnecessary file name or description. Include the `alt` attribute with an empty value. Omitting the attribute is not the same thing.

### Functional images

If an image is the only content inside a link or button, its alternative should describe the destination or action:

~~~html
<a href="/">
  <img src="images/home-icon.png" alt="Home">
</a>
~~~

Here, “Home” tells a person using assistive technology what the link does. Describing the icon's appearance, such as “small blue house”, would not explain its function.

If the same link also has visible text that already gives its purpose, the image may be redundant and use an empty `alt` value:

~~~html
<a href="/search.html">
  <img src="images/search-icon.png" alt="">
  Search
</a>
~~~

### Images that contain text

If an image contains words that are not available elsewhere, include those words in its alternative text:

~~~html
<img src="images/notice.png" alt="Workshop moved to Room 4">
~~~

When practical, use real HTML text instead of an image of text. Real text is easier to resize, search, copy, and adapt.

## Complex images

A chart, diagram, or map can contain more information than fits into a short `alt` value. Give the image a concise alternative and provide its essential data or explanation in the page as text.

~~~html
<img
  src="images/monthly-visitors.png"
  alt="Bar chart comparing monthly visitors to three websites">

<p>The chart's values are:</p>
<ul>
  <li>Site A: 1,200 visitors in January and 1,500 in February.</li>
  <li>Site B: 900 visitors in January and 1,100 in February.</li>
  <li>Site C: 1,400 visitors in January and 1,300 in February.</li>
</ul>
~~~

The short alternative identifies the kind of image. The list gives the underlying information to people who cannot interpret the graphic.

Do not put a long report or a data table into `alt`. Keep the alternative concise and provide detailed information in normal page content.

## Alternative text depends on context

The same image can need different alternatives in different places. Ask what a person needs to know from the image in this part of the page:

- If it identifies a person, give the person's name when that is relevant.
- If it illustrates an instruction, describe the detail needed to follow the instruction.
- If it repeats a nearby heading or label, an empty value may be appropriate.
- If it is the content of a link, describe the link's destination or action.
- If it conveys data, provide that data in text as well.

Avoid filler such as “image of” or the file name unless those words add useful information. The goal is to preserve the image's meaning or function, not to narrate every pixel.

## Common mistakes

- Leaving out `alt` on an image that needs an alternative.
- Using the file name as the alternative text.
- Writing an empty `alt` for an informative image.
- Describing an icon's appearance when it functions as a link or button.
- Repeating a caption word for word in both the caption and `alt`.
- Adding a long explanation to `alt` instead of providing it as page text.
- Using `title` as a replacement for `alt`.
- Assuming the same alternative text works in every context.

## Try it yourself

1. Add an informative photo with an alternative that communicates its point in the page.
2. Add a purely decorative image with an empty `alt` value.
3. Put an icon image inside a link and make the alternative describe the destination.
4. Add visible link text beside an icon and make the redundant image ignorable.
5. Write an alternative for an image containing a short notice.
6. Add a chart with a short `alt` and include its important values in a text list.
7. Compare the same image in two different contexts and decide whether its alternative should change.

## Key points

- `src` identifies the image resource; `alt` provides its text alternative.
- Write alternatives based on the image's role in its context.
- Use an empty `alt` value for decorative or redundant images.
- For a functional image, describe its destination or action.
- For complex images, provide the detailed information in page text.
- Keep `alt` concise and useful. It is not a caption or tooltip.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [18 - Unordered, ordered, and description lists](18-lists.md) | [Q&A](../qnas/19-images-and-alt-text.md) | [Example](../examples/19-images-and-alt-text.md) | [20 - Figures and captions](20-figures-and-captions.md) |
