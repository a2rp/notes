# Example 23 - Embedding external content safely

## Question

Create a garden page that embeds a submitted page from a separate content origin, a trusted video that needs scripts and fullscreen, and an offscreen events calendar. Limit each frame's capabilities, reduce referrer information, and provide direct links outside the frames.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Embeds and Previews</title>
  </head>
  <body>
    <main>
      <h1>Garden resources</h1>

      <section>
        <h2>Submitted page preview</h2>
        <iframe
          src="https://usercontent.example.net/previews/42"
          title="Preview of a submitted garden page"
          width="640"
          height="400"
          sandbox
          referrerpolicy="no-referrer">
        </iframe>
        <p>
          <a href="https://usercontent.example.net/previews/42">
            Open the submitted page directly
          </a>
        </p>
      </section>

      <section>
        <h2>Garden tour video</h2>
        <iframe
          src="https://video.example.net/embed/garden-tour"
          title="Garden tour video"
          width="640"
          height="360"
          sandbox="allow-scripts"
          allow="fullscreen">
        </iframe>
        <p>
          <a href="https://video.example.net/watch/garden-tour">
            Open the garden tour on the video site
          </a>
        </p>
      </section>

      <section>
        <h2>Community events</h2>
        <iframe
          src="https://calendar.example.net/embed/community-garden"
          title="Community garden events calendar"
          width="640"
          height="480"
          loading="lazy"
          sandbox
          referrerpolicy="no-referrer">
        </iframe>
        <p>
          <a href="https://calendar.example.net/community-garden">
            Open the events calendar directly
          </a>
        </p>
      </section>
    </main>
  </body>
</html>
~~~

The example URLs use reserved example domains. Replace them with embed URLs provided for services you trust. Confirm that each provider supports the sandbox and referrer settings before using the frame.

## Expected output

The page contains three titled frames and a direct link after each one. The submitted page is embedded with the sandbox restrictions in place. The video frame is allowed to run scripts and request fullscreen, while other sandbox restrictions remain. The events calendar is marked for lazy loading because it appears lower on the page.

The example domains do not host these pages, so the frames will not show working content until you replace their URLs. A provider may also block its page from being embedded. The direct links remain available as another way to reach the content.

## Explanation

- The sandbox attribute with no tokens starts with restrictive permissions. It is used for the submitted page preview, which is served from a separate origin.
- The video frame uses allow-scripts because its trusted provider needs scripts, and allow="fullscreen" for fullscreen playback. It does not add allow-same-origin. Do not combine allow-scripts and allow-same-origin for content from the same origin as the parent page.
- The calendar uses loading="lazy" because it is below the main page content. Lazy loading does not replace a consent choice when one is required.
- The no-referrer policy sends no referrer information with requests from those frames. Some providers may depend on referrer information, so check their requirements.
- The direct links outside the frames work independently of whether a provider permits embedding.
- Sandbox and iframe attributes reduce some capabilities, but they do not make unknown content trustworthy. Serve user-submitted active content from a dedicated origin and apply server-side protections too.

## How to try it

Copy the HTML code block using its copy button and save it as garden-embeds.html. Replace each example URL with a documented embed URL from a provider you trust. Start with the restrictions shown, test whether the embed works, and add only the specific permissions it requires.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 23 - Embedding external content safely](../lessons/23-safe-embedded-content.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [22 - The iframe element and embedded pages](22-iframes-and-embedded-pages.md) | [Lesson](../lessons/23-safe-embedded-content.md) | [Q&A](../qnas/23-safe-embedded-content.md) | [24 - Responsive images: picture, srcset, and sizes](24-responsive-images.md) |
