# Example 22 - The iframe element and embedded pages

## Question

Create a community garden page with an embedded local map, a calendar that can load lazily, and a small inline HTML preview. Give every frame a useful title and size, and provide visible links to the local pages outside the frames.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Visit the Community Garden</title>
  </head>
  <body>
    <main>
      <h1>Visit the community garden</h1>

      <section>
        <h2>Find the entrance</h2>
        <iframe
          src="pages/garden-map.html"
          title="Map showing the community garden entrance"
          width="640"
          height="360">
          <p>
            Your browser does not support embedded pages.
            <a href="pages/garden-map.html">Open the garden map</a>.
          </p>
        </iframe>
        <p>
          <a href="pages/garden-map.html">Open the garden map as a page</a>
        </p>
      </section>

      <section>
        <h2>Upcoming events</h2>
        <iframe
          src="pages/events.html"
          title="Community garden event calendar"
          width="640"
          height="420"
          loading="lazy">
          <p>
            Your browser does not support embedded pages.
            <a href="pages/events.html">Open the event calendar</a>.
          </p>
        </iframe>
        <p>
          <a href="pages/events.html">Open the event calendar as a page</a>
        </p>
      </section>

      <section>
        <h2>A small inline preview</h2>
        <iframe
          title="Short gardening note"
          width="400"
          height="160"
          srcdoc="<h2>Watering tip</h2><p>Check the soil before watering.</p>">
        </iframe>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The page shows a garden map frame, an event calendar frame, and a small frame containing a watering tip. If the local pages exist, their content appears inside the first two frames. The event calendar is marked for lazy loading because it is lower on the page. The srcdoc value displays a short separate HTML document in the third frame.

The visible links below the map and calendar let visitors open those pages directly. The fallback paragraphs inside the frames are mainly for browsers that do not support iframes; current browsers may not show them when a frame fails to load.

## Explanation

- The iframe element embeds another page in a separate browsing context. Its contents remain a separate document from the parent page.
- Each title describes the specific embedded content so visitors can identify the frame.
- The width and height attributes set the size of each frame's viewport in CSS pixels.
- The event calendar uses loading="lazy" because it is lower on the page. Avoid delaying a frame visitors need immediately.
- The srcdoc attribute supplies a small HTML document directly. It is convenient for a short preview; a separate file is easier to maintain for larger content. Only use trusted content in srcdoc.
- The links outside the frames remain available in current browsers and give visitors another way to open the map and calendar. The fallback content inside an iframe is not a reliable load-error message.

## How to try it

Copy the HTML code block using its copy button and save it as garden-visit.html. Create a pages folder beside it with garden-map.html and events.html, then open the page. Change the frame titles to describe their contents and adjust dimensions so the embedded pages are usable.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 22 - The iframe element and embedded pages](../lessons/22-iframes-and-embedded-pages.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [21 - Audio and video](21-audio-and-video.md) | [Lesson](../lessons/22-iframes-and-embedded-pages.md) | [Q&A](../qnas/22-iframes-and-embedded-pages.md) | [23 - Embedding external content safely](23-safe-embedded-content.md) |
