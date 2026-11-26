# 20 - Figures and captions

The &lt;figure&gt; element groups self-contained content that belongs together as one unit. The optional &lt;figcaption&gt; element gives that content a caption. Figures can contain photographs, diagrams, charts, code examples, or other content - they are not limited to images.

## What you will learn

- When content belongs in a figure.
- How to add a caption with figcaption.
- How a caption differs from an image's alt text.
- How to use figures for images, diagrams, and code examples.
- Common figure and caption mistakes.

## What is a figure?

A figure is a self-contained part of a page that can be understood as a unit and is typically referred to from the surrounding text. For example, a paragraph might say, "The monthly totals are shown in Figure 1." The chart and its caption can then be grouped together.

Use a figure when the content and its caption or explanation form one meaningful unit. Do not wrap every image or group of content in a figure automatically.

~~~html
<p>The seedling has grown three new leaves this week.</p>

<figure>
  <img
    src="images/seedling.jpg"
    alt="A young tomato plant with three new leaves">
  <figcaption>The tomato seedling on day 12.</figcaption>
</figure>
~~~

The browser displays a figure as part of the page's normal content. These HTML elements provide meaning and grouping; they do not add a border, special layout, or visual style by themselves.

## Adding a caption with figcaption

Place a figcaption as the first or last child of its figure. A figure may have one caption or no caption. The caption describes the content of that particular figure.

~~~html
<figure>
  <figcaption>Figure 1. A simplified water cycle.</figcaption>
  <img
    src="images/water-cycle.png"
    alt="Arrows show water evaporating, forming clouds, and falling as rain">
</figure>
~~~

The caption can also follow the figure content:

~~~html
<figure>
  <img
    src="images/water-cycle.png"
    alt="Arrows show water evaporating, forming clouds, and falling as rain">
  <figcaption>Figure 1. A simplified water cycle.</figcaption>
</figure>
~~~

Both examples have the same meaning. Choose a placement that works for your document and use it consistently. A caption can include more than plain text, such as a source credit:

~~~html
<figure>
  <img
    src="images/monthly-rainfall.png"
    alt="Rainfall rises from 20 millimetres in January to 110 in July, then falls to 25 in December">
  <figcaption>
    Monthly rainfall in Pune.
    <small>Source: Example weather records, 2025.</small>
  </figcaption>
</figure>
~~~

## Caption text and alternative text

An image's alt text and a figure's caption have different jobs:

- Alt is a text alternative for the image. It is used when the image cannot be seen or loaded, and by assistive technology.
- Figcaption is visible page content that labels or explains the figure for readers.

Write each one for its purpose. Avoid repeating the same sentence in both places when the caption already gives the same information. Keep important details available as text, especially for charts and diagrams.

~~~html
<figure>
  <img
    src="images/library-map.png"
    alt="Map showing the library entrance at the south side and the help desk near the center">
  <figcaption>Visitor map of the Central Library.</figcaption>
</figure>
~~~

Here, the alternative describes useful information shown in the map. The caption identifies what the map is. If a complex diagram needs a longer explanation, put that explanation in nearby page text and refer to it from the figure or surrounding content.

## Figures are not only images

A figure can group self-contained flow content. For example, it can label a code example:

~~~html
<figure>
  <figcaption>Example 1. A basic HTML link.</figcaption>
  <pre><code>&lt;a href="about.html"&gt;About us&lt;/a&gt;</code></pre>
</figure>
~~~

It can also group a diagram or chart with a meaningful caption. If a quotation is repeated from the article's main text just to draw attention to it, an aside may be a better fit than a figure. Choose the element based on the content's relationship to the surrounding document.

## Figure compared with nearby content

Use a regular image when it is part of a sentence and does not need to be treated as a separate unit:

~~~html
<p>
  Select the
  <img src="images/search-icon.svg" alt="">
  search control to find an article.
</p>
~~~

Use a figure when the image, diagram, or example is a distinct unit that the surrounding text may refer to:

~~~html
<p>Figure 2 shows the three stages of the process.</p>

<figure>
  <img
    src="images/process.png"
    alt="Three connected boxes labelled Plan, Build, and Review">
  <figcaption>Figure 2. The plan, build, and review cycle.</figcaption>
</figure>
~~~

A figure does not replace the surrounding explanation. If readers need information shown in a visual, make sure the key points are also available in text.

## Common mistakes

- Using figcaption outside a figure.
- Putting a caption in the middle of the figure instead of first or last.
- Adding multiple figcaption elements to one figure.
- Assuming figure means image; it can group other self-contained content too.
- Wrapping content in a figure only to get a visual border or spacing.
- Treating the caption as a replacement for useful image alternative text.
- Using a figure for content that is not a self-contained unit of the surrounding page.

## Try it yourself

1. Add a photograph with an alt value and a visible figure caption.
2. Move the caption from the end of the figure to the beginning. Confirm that the figure still has one caption.
3. Create a figure containing a code example and caption it.
4. Write a paragraph that refers to a numbered diagram, then mark up the diagram as a figure.
5. Explain in your own words how alt text and a visible caption differ.
6. Find an image in a page that does not need a figure and explain why.

## Key points

- Figure groups self-contained content that belongs together as one unit.
- Figures can contain images, diagrams, charts, code, and other flow content.
- Figcaption is optional and may be the first or last child of its figure.
- A figure can have at most one figcaption.
- Alternative text describes an image for people who cannot see it; a caption labels or explains the figure for page readers.
- Use figures for meaning and structure, not just for visual styling.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [19 - Images and alternative text](19-images-and-alt-text.md) | [Q&A](../qnas/20-figures-and-captions.md) | [Example](../examples/20-figures-and-captions.md) | [21 - Audio and video](21-audio-and-video.md) |
