# 22 - The iframe element and embedded pages

The &lt;iframe&gt; element embeds another page inside the current page. The embedded document keeps its own browsing context, so visitors can interact with it without replacing the surrounding page. Give each iframe a useful title and a size that lets its content be used.

## What you will learn

- What an iframe embeds and how it relates to the parent page.
- How to load another page with src.
- How to label and size an embedded page.
- When lazy loading may help.
- How srcdoc embeds a small HTML document directly.
- What iframe fallback content can and cannot do.

## Embed another page

Use the src attribute to point to the page that should appear inside the frame. The URL can refer to a page on your site or a page on another site.

~~~html
<iframe
  src="pages/campus-map.html"
  title="Campus map">
</iframe>
~~~

The embedded page appears within a rectangular area of the current page. Visitors can interact with it independently. Navigating inside the frame does not replace the parent page.

## Give the iframe a useful title

Add a title attribute that briefly describes the content of the embedded page. Assistive technology can use this title to help people identify the frame before entering it.

~~~html
<iframe
  src="pages/opening-hours.html"
  title="Library opening hours">
</iframe>
~~~

Describe the content, not just the element. A label such as "iframe" or "embedded content" does not help a visitor distinguish this frame from others on the page.

If a page contains several frames, each title should identify its specific content:

~~~html
<iframe
  src="pages/map.html"
  title="Map showing the library location">
</iframe>

<iframe
  src="pages/contact-form.html"
  title="Contact the library">
</iframe>
~~~

## Set the frame dimensions

The width and height attributes set the size of the iframe's viewport in CSS pixels. Choose dimensions that let visitors see and use the embedded content. CSS can also set a flexible size.

~~~html
<iframe
  src="pages/campus-map.html"
  title="Campus map"
  width="640"
  height="400">
</iframe>
~~~

A frame that is too small can make its own scrollbars appear or hide useful content. The embedded page still has its own layout and may need to adapt to the available space.

## Defer offscreen frames

A page can include embedded content that is far below the first screen. Add loading="lazy" when it is useful to wait until an iframe is near the viewport before loading it.

~~~html
<iframe
  src="pages/event-calendar.html"
  title="Upcoming library events"
  width="640"
  height="480"
  loading="lazy">
</iframe>
~~~

Loading behavior is controlled by the browser. Avoid lazy loading a frame that visitors need immediately at the top of the page.

## Use srcdoc for a small inline document

The srcdoc attribute contains HTML that the iframe displays as a separate document. It can be useful for a very small example or preview.

~~~html
<iframe
  title="Small embedded example"
  width="320"
  height="140"
  srcdoc="<h2>Welcome</h2><p>This is a separate document inside the frame.</p>">
</iframe>
~~~

The srcdoc value is written inside an HTML attribute, so quotes and special characters must be handled carefully. For larger pages, a separate file referenced by src is easier to read and maintain.

Only place content you trust in srcdoc. User-provided HTML needs careful handling. The next chapter covers safe embedding in more detail.

## Fallback content

Text between the opening and closing iframe tags was historically useful to browsers that did not support iframes:

~~~html
<iframe
  src="pages/campus-map.html"
  title="Campus map"
  width="640"
  height="400">
  <p>
    Your browser does not support embedded pages.
    <a href="pages/campus-map.html">Open the campus map</a>.
  </p>
</iframe>
~~~

Do not rely on that text as the description of the frame for current browsers. It is not a reliable replacement for the title attribute, and it usually is not shown when an embedded page fails to load. Provide useful links or instructions outside the iframe when visitors need another way to reach the content.

## When an iframe is a good fit

An iframe is useful when an existing page or service is designed to be embedded, such as a map, calendar, or interactive demo. It keeps that page's document separate from the current page.

A regular link is often simpler when visitors can open the page directly. An iframe takes space in the layout and makes visitors navigate within a nested page. The site being embedded may also restrict framing, so an iframe is not guaranteed to work for every URL.

## Common mistakes

- Leaving out title or using a vague title that does not identify the embedded page.
- Making the frame so small that its content is difficult to use.
- Expecting fallback content to appear when a current browser cannot load the embedded page.
- Using an iframe when a normal link would be easier to use.
- Assuming content inside the frame becomes part of the parent document.
- Lazy loading a frame that visitors need immediately.
- Putting untrusted HTML into srcdoc without appropriate handling.

## Try it yourself

1. Embed a local page and give the frame a useful title.
2. Add width and height values that let visitors use the embedded page.
3. Add a second iframe and give it a title that clearly distinguishes its content.
4. Add loading="lazy" to an iframe placed near the bottom of a long page.
5. Create a small srcdoc example and notice that its content appears in a separate frame.
6. Add a link outside an iframe so visitors have another way to open the embedded page.
7. Decide whether a map should be embedded or linked directly, and explain your choice.

## Key points

- Iframe embeds a separate page inside the current page.
- Src identifies the page to display.
- Title should describe the embedded content.
- Width and height set the frame's viewport size.
- Loading="lazy" can defer offscreen content until it is near the viewport.
- Srcdoc places a small HTML document in an attribute value.
- Fallback text is not a reliable description or load-error message for modern browsers.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [21 - Audio and video](21-audio-and-video.md) | [Q&A](../qnas/22-iframes-and-embedded-pages.md) | [Example](../examples/22-iframes-and-embedded-pages.md) | [23 - Embedding external content safely](23-safe-embedded-content.md) |
