# Example 19 - Images and alternative text

## Question

Create a garden page that uses images in different ways: an informative photo, a decorative image, an image-only link, an icon beside visible link text, an image containing a notice, and a chart with its values also written as text.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Images in a Garden Guide</title>
  </head>
  <body>
    <header>
      <h1>Growing herbs at home</h1>
      <nav aria-label="Main">
        <a href="index.html">
          <img src="images/home-icon.svg" alt="">
          Garden Journal home
        </a>
      </nav>
    </header>

    <main>
      <section>
        <h2>Find a bright place</h2>
        <p>
          Basil seedlings growing on a sunny windowsill are a good example of
          a bright indoor growing spot.
        </p>
        <img
          src="images/basil-on-windowsill.jpg"
          alt="Basil seedlings in small pots on a sunny windowsill">
      </section>

      <p>
        <img src="images/leaf-divider.svg" alt="">
        Choose a place that gets suitable light for your herbs.
      </p>

      <section>
        <h2>Read the workshop notice</h2>
        <img
          src="images/workshop-notice.png"
          alt="Workshop moved to Room 4">
      </section>

      <section>
        <h2>Visitor chart</h2>
        <p>
          The chart compares visitors to three garden websites in January
          and February.
        </p>
        <img
          src="images/monthly-visitors.png"
          alt="Bar chart comparing monthly visitors to three garden websites">
        <p>The chart values are:</p>
        <ul>
          <li>Site A: 1,200 visitors in January and 1,500 in February.</li>
          <li>Site B: 900 visitors in January and 1,100 in February.</li>
          <li>Site C: 1,400 visitors in January and 1,300 in February.</li>
        </ul>
      </section>

      <p>
        <a href="search.html">
          <img src="images/search-icon.svg" alt="">
          Search the garden guide
        </a>
      </p>

      <p>
        <a href="index.html">
          <img src="images/home-icon.svg" alt="Home">
        </a>
      </p>
    </main>
  </body>
</html>
~~~

## Expected output

If the image files exist at the listed paths, the page shows the basil photo, decorative divider, workshop notice, visitor chart, and icons. The chart's visitor values also appear as a text list.

The home icon at the top of the page is decorative because visible link text already names its destination, so it has an empty alt value. The final link contains only an icon, so its alt text names the link destination. The image alternatives are not normally shown when their images load; they provide equivalent information or a useful name when needed, including when an image cannot be displayed.

## Explanation

- The basil photo communicates information, so its alt text describes the relevant scene.
- The leaf divider adds no information, so it has an empty alt value. Keep the alt attribute even when its value is empty.
- When an image is the only content of a link, its alt text describes the destination or action. When the link already has visible text that explains its purpose, the icon is redundant and uses an empty alt value.
- The workshop image contains a notice that is not repeated as page text, so its alt gives the words readers need.
- The chart has a concise alt that identifies it. The list below provides the detailed values in text instead of putting a long explanation in alt.
- Alternative text depends on the image's role and surrounding content. It should convey useful information or function without repeating nearby text unnecessarily.

## How to try it

Copy the HTML code block using its copy button, save it as garden-images.html, and place matching files in an images folder beside it. Replace the sample images with your own, then reconsider each alt value based on the image's role in the page. For the chart, change both the image and its text values together.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 19 - Images and alternative text](../lessons/19-images-and-alt-text.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [18 - Unordered, ordered, and description lists](18-lists.md) | [Lesson](../lessons/19-images-and-alt-text.md) | [Q&A](../qnas/19-images-and-alt-text.md) | [20 - Figures and captions](20-figures-and-captions.md) |
