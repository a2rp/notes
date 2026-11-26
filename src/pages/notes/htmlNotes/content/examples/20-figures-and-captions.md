# Example 20 - Figures and captions

## Question

Create a garden article with a self-contained photo, a chart, and a code sample, each grouped with one visible caption. Give each image useful alternative text, make the chart details available as page text, and include a small inline icon that does not need its own figure.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Figures and Captions</title>
  </head>
  <body>
    <main>
      <article>
        <h1>Growing basil at home</h1>
        <p>
          These notes use photos, charts, and code samples as separate parts
          of the guide.
        </p>

        <section>
          <h2>A basil seedling</h2>
          <figure>
            <img
              src="images/basil-seedling.jpg"
              alt="Basil seedling with four pairs of leaves">
            <figcaption>
              A basil seedling after three weeks of indoor care.
            </figcaption>
          </figure>
        </section>

        <section>
          <h2>Seedling growth</h2>
          <p>Figure 1 shows how the seedling's height changed over three months.</p>
          <figure>
            <figcaption>Figure 1. Seedling height during spring.</figcaption>
            <img
              src="images/seedling-growth.png"
              alt="Line chart: 4 centimetres in March, 8 in April, and 14 in May">
          </figure>
          <p>The chart values are:</p>
          <ul>
            <li>March: 4 centimetres</li>
            <li>April: 8 centimetres</li>
            <li>May: 14 centimetres</li>
          </ul>
        </section>

        <section>
          <h2>HTML example</h2>
          <figure>
            <figcaption>Example 1. A heading and a paragraph.</figcaption>
            <pre><code>&lt;h1&gt;Basil care&lt;/h1&gt;
&lt;p&gt;Place the pot in a bright spot.&lt;/p&gt;</code></pre>
          </figure>
        </section>

        <p>
          <a href="search.html">
            <img src="images/search-icon.svg" alt="">
            Search for another garden article
          </a>
        </p>
      </article>
    </main>
  </body>
</html>
~~~

## Expected output

If the image files exist at the listed paths, the page displays a basil photo with its caption, a chart with a caption and a list of its values, and a two-line HTML code example with a caption. The small search icon appears within the final paragraph.

The chart caption labels the figure, while its alt text briefly describes the plotted values. The list provides those values as visible text. The captions are part of the page content; alt text provides an alternative for the images.

## Explanation

- The figure element groups content that forms a self-contained unit. A figure can contain an image, chart, code sample, or other related content.
- Each figure has one figcaption. In the photo and code examples it is the last child; in the chart example it is the first child.
- The photo's alt text describes a visible detail. Its caption gives the photo context without repeating the alt sentence.
- The chart has a concise alt description and a visible list of its data. The caption labels the chart, while the list makes its values available as text.
- The pre and code elements preserve and identify the multiline code sample inside its figure.
- The search icon sits beside visible link text and does not need its own figure. Its empty alt value keeps the redundant image from being announced.

## How to try it

Copy the HTML code block using its copy button, save it as garden-figures.html, and place the listed image files in an images folder beside it. Replace the sample images and values with your own. Keep one caption per figure, and write the alt text for the image's purpose.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 20 - Figures and captions](../lessons/20-figures-and-captions.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [19 - Images and alternative text](19-images-and-alt-text.md) | [Lesson](../lessons/20-figures-and-captions.md) | [Q&A](../qnas/20-figures-and-captions.md) | [21 - Audio and video](21-audio-and-video.md) |
