# Example 53 - Validate and debug HTML

## Question

A garden schedule page renders, but its source has a misnested element, a duplicate ID, nested links, and an image with no alternative text. Use a validator to find the problems, then compare the source and corrected page.

The first document below is intentionally invalid. Use it to practice debugging, not as finished markup.

## HTML with problems

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden schedule</title>
  </head>
  <body>
    <main>
      <h1 id="schedule">Garden schedule</h1>
      <p><strong>Opening time: 9:00 a.m.</p></strong>

      <p id="schedule">The garden is open to visitors today.</p>

      <p>
        <a href="/visit/">
          Plan your visit
          <a href="/map/">Find directions</a>
        </a>
      </p>

      <img src="images/community-garden.jpg">
    </main>
  </body>
</html>
~~~

## Corrected HTML page

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden schedule</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/visit/">Plan your visit</a></li>
          <li><a href="/map/">Find directions</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1 id="schedule">Garden schedule</h1>
      <p><strong>Opening time:</strong> 9:00 a.m.</p>
      <p>The garden is open to visitors today.</p>
      <img
        src="images/community-garden.jpg"
        alt="Visitors walking along a path between garden beds">
    </main>

    <footer>
      <p>Check the schedule before planning your visit.</p>
    </footer>
  </body>
</html>
~~~

The corrected page expects an image at `images/community-garden.jpg`. Provide that file or change the `src` to the location of an image that matches the alternative text.

## Expected output

Both documents may appear in a browser because browsers try to recover from some invalid markup. The malformed source may produce a DOM that differs from its tag order. Use the browser's Elements or Inspector panel to see the structure it built.

The corrected page shows a heading, opening time, visitor information, two separate navigation links, and an image when the image file is available. Its heading ID is unique, the elements close in the correct order, the links are siblings, and the image has alternative text.

## Explanation

The first document deliberately includes four issues:

- The `<p>` closes before the `<strong>` element, so the tags are not nested in reverse order.
- The value `schedule` is used as an ID on both the heading and a paragraph. An ID should identify one element in the document.
- One link is nested inside another link. Give each destination its own anchor and place the anchors as separate siblings.
- The image has no `alt` attribute. The corrected page provides alternative text that describes the image's purpose.

The corrected page fixes each issue without relying on browser recovery. The heading keeps the ID used to identify the page's schedule; the paragraph no longer needs an ID. Each link now has its own destination. The image still needs human review because a validator cannot tell whether its alternative text accurately describes the actual picture.

## How to try it

1. Copy the first complete HTML block using its copy button and save it as `debug-example.html`.
2. Submit this sample to the Nu Html Checker by using direct input or uploading the file. Use an online checker only for content that is safe to submit.
3. Read each message and inspect the line and nearby source. A reported location may be where the checker noticed a problem, not where the mistake began.
4. Open the file in a browser. Compare the source with the live structure in the Elements or Inspector panel. Browser repair can make these views differ.
5. Save the corrected block as `index.html`, provide the image file, and check it with the validator again.
6. Review the page yourself. Confirm that the links describe their destinations and the image alternative text matches the image.
7. If you edit an element in developer tools, remember that the change is temporary. Update the saved source and reload the page to keep a fix.

A clean validator report checks markup conformance. It does not prove that the image description, page content, accessibility, or usefulness is correct.

## Related lesson

[Read lesson 53 - Validate and debug HTML](../lessons/53-validation-and-debugging.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [52 - Deprecated elements and obsolete HTML](52-obsolete-html.md) | [Lesson](../lessons/53-validation-and-debugging.md) | [Q&A](../qnas/53-validation-and-debugging.md) | [54 - HTML-only practice pages](54-html-practice-projects.md) |
