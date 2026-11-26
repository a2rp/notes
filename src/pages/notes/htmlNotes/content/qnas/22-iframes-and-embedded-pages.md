# 22 - The iframe element and embedded pages: Questions and Answers

Practice questions for [Lesson 22 - The iframe element and embedded pages](../lessons/22-iframes-and-embedded-pages.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What does the iframe element do?

- A. It places another page inside the current page.
- B. It creates an audio player.
- C. It inserts an image.
- D. It creates a table.

**Answer: A.** An iframe embeds a separate page within the current page.

### 2. Which attribute points to the page to display in an iframe?

- A. href
- B. src
- C. poster
- D. action

**Answer: B.** The src attribute gives the URL of the page to embed.

### 3. Why should an iframe have a useful title?

- A. It changes the embedded page's heading.
- B. It helps visitors, including screen-reader users, identify the embedded content.
- C. It sets the frame's dimensions.
- D. It controls whether the frame loads.

**Answer: B.** A concise title describes the frame's content and helps users distinguish it from other frames.

### 4. What do the width and height attributes set?

- A. The source page's text size.
- B. The iframe viewport's dimensions.
- C. The embedded page's language.
- D. The frame's title.

**Answer: B.** Width and height set the size of the area in which the embedded page appears.

### 5. What does loading="lazy" request?

- A. That the browser defer loading an offscreen iframe until it is near the viewport.
- B. That the frame play media slowly.
- C. That the frame hide its controls.
- D. That the frame never load.

**Answer: A.** Lazy loading can defer an offscreen embedded page. The browser controls the actual loading behavior.

### 6. What does srcdoc contain?

- A. The URL of an image.
- B. HTML source for a small document shown inside the iframe.
- C. The frame's accessible title.
- D. A CSS stylesheet address.

**Answer: B.** Srcdoc embeds a document directly in an attribute value.

### 7. What is iframe fallback content mainly for?

- A. Replacing the title attribute.
- B. Giving every modern browser an error message if the remote page fails.
- C. Older browsers that do not support iframe.
- D. Resizing the embedded page.

**Answer: C.** Fallback content may help browsers without iframe support, but it is not a reliable load-error message in current browsers.

### 8. What happens when a visitor navigates inside an iframe?

- A. The parent page always navigates to the same address.
- B. The embedded page navigates within its own browsing context.
- C. The iframe becomes an image.
- D. The parent document is replaced by the iframe content.

**Answer: B.** An iframe contains a separate embedded document.

### 9. Which is a useful iframe title for a frame that shows a map?

- A. iframe
- B. Embedded content
- C. Map showing the library location
- D. Click here

**Answer: C.** A specific title tells visitors what they can expect inside the frame.

### 10. When might a regular link be a better choice than an iframe?

- A. When visitors can open the page directly and do not need it embedded.
- B. Whenever a page has a title.
- C. Only when the embedded content is a map.
- D. Never; iframe is always better.

**Answer: A.** A regular link can be simpler and gives visitors direct access to the page.

## True or false

### 1. An iframe embeds a separate page inside the current page.

**Answer: True.** The embedded document has its own browsing context.

### 2. The src attribute identifies the page that an iframe displays.

**Answer: True.** Its value is the embedded page's URL.

### 3. The title attribute should describe the frame's content.

**Answer: True.** Use a short, specific description that distinguishes the frame.

### 4. The title attribute is a substitute for the src attribute.

**Answer: False.** Title describes the frame; src points to the page it embeds.

### 5. Width and height can set an iframe's viewport dimensions.

**Answer: True.** They give the embedded page an area in the parent document.

### 6. The loading="lazy" attribute guarantees that an iframe will not load until a user clicks it.

**Answer: False.** It requests deferred loading until the frame is near the viewport. It does not wait for a click.

### 7. A srcdoc value contains a small HTML document that the iframe displays.

**Answer: True.** It provides document markup directly in an attribute.

### 8. Fallback content inside an iframe is always shown when an embedded page fails to load.

**Answer: False.** It is mainly for browsers that do not support iframes, not a general load-error message.

### 9. The embedded document becomes part of the parent document's normal content.

**Answer: False.** The frame keeps a separate document and browsing context.

### 10. Every URL can be embedded successfully in an iframe.

**Answer: False.** The site being embedded can restrict framing, so a URL may not work inside an iframe.

## Fill in the blanks

### 1. The HTML element used to embed another page is ______.

**Answer: iframe.**

### 2. The ______ attribute gives an iframe the URL of the embedded page.

**Answer: src.**

### 3. The ______ attribute should briefly describe the embedded content.

**Answer: title.**

### 4. The ______ and ______ attributes set the iframe viewport dimensions.

**Answer: width and height.**

### 5. The loading value that requests deferred loading for an offscreen frame is ______.

**Answer: lazy.**

### 6. The ______ attribute can contain markup for a small embedded document.

**Answer: srcdoc.**

### 7. An iframe's embedded page uses its own browsing ______.

**Answer: context.**

### 8. If embedding is unnecessary, a regular ______ may be simpler for visitors.

**Answer: link.**

## Short-answer questions

### 1. What is an iframe?

**Answer:** An iframe is an HTML element that displays another page inside the current page. The embedded document is separate from the parent document.

### 2. What is the difference between src and title on an iframe?

**Answer:** Src identifies the page to display. Title describes the embedded content so visitors can identify the frame.

### 3. What makes a good iframe title?

**Answer:** It is concise and describes the specific embedded content, such as "Map showing the library location." Avoid generic titles such as "iframe."

### 4. What do width and height control?

**Answer:** They set the iframe viewport's dimensions in CSS pixels. Choose a size that lets visitors see and use the embedded page.

### 5. When can loading="lazy" be useful?

**Answer:** It can defer loading an iframe that is outside the visible area until it is near the viewport. Avoid lazy loading content visitors need immediately at the top of the page.

### 6. How does srcdoc differ from src?

**Answer:** Src points to a page by URL. Srcdoc contains HTML source for a small document directly inside the iframe element's attribute.

### 7. Why should iframe fallback text not be the only way to explain the frame?

**Answer:** Current browsers generally do not show the fallback text when an embedded page fails to load. Use a useful title and provide relevant links or instructions outside the iframe.

### 8. When might a normal link be preferable to an iframe?

**Answer:** When visitors can open the page directly and do not need to interact with it inside the current page. A link can be simpler and avoids taking space for a nested page.

## Practical coding questions

### 1. Embed a local campus map and give it a useful title.

**Answer:**

~~~html
<iframe
  src="pages/campus-map.html"
  title="Campus map">
</iframe>
~~~

The title describes the page inside the frame.

### 2. Add useful dimensions to this iframe.

~~~html
<iframe
  src="pages/calendar.html"
  title="Upcoming events">
</iframe>
~~~

**Answer:**

~~~html
<iframe
  src="pages/calendar.html"
  title="Upcoming events"
  width="640"
  height="480">
</iframe>
~~~

The dimensions define the visible viewport for the embedded page.

### 3. Create two iframes with titles that make their content easy to distinguish.

**Answer:**

~~~html
<iframe
  src="pages/map.html"
  title="Map showing the community library">
</iframe>

<iframe
  src="pages/contact.html"
  title="Contact form for the community library">
</iframe>
~~~

The titles identify the different content of the two frames.

### 4. Add lazy loading to a calendar near the bottom of a long page.

**Answer:**

~~~html
<iframe
  src="pages/events.html"
  title="Upcoming events calendar"
  width="640"
  height="480"
  loading="lazy">
</iframe>
~~~

Lazy loading requests that the browser defer the offscreen frame until it is near the viewport.

### 5. Add a small inline document using srcdoc.

**Answer:**

~~~html
<iframe
  title="Short welcome message"
  width="320"
  height="140"
  srcdoc="<h2>Welcome</h2><p>This message is inside a separate document.</p>">
</iframe>
~~~

Srcdoc is useful for small examples. For larger content, a separate page referenced by src is easier to maintain.

### 6. Add a link outside an iframe so visitors can open the embedded page directly.

**Answer:**

~~~html
<iframe
  src="pages/campus-map.html"
  title="Campus map"
  width="640"
  height="400">
</iframe>

<p><a href="pages/campus-map.html">Open the campus map in its own page</a></p>
~~~

The link offers a direct route to the same content.

### 7. Improve this vague iframe title.

~~~html
<iframe src="pages/branch-map.html" title="Embedded content"></iframe>
~~~

**Answer:**

~~~html
<iframe
  src="pages/branch-map.html"
  title="Map showing the downtown library branch">
</iframe>
~~~

The improved title concisely explains what the frame contains.

### 8. Decide whether this use needs an iframe or a link. Provide a simple link to the page instead.

**Answer:**

~~~html
<p>
  <a href="pages/full-report.html">Read the full report</a>
</p>
~~~

If visitors only need to read the report, a normal link may be simpler than embedding a full page.

## Related lesson

- [Lesson 22 - The iframe element and embedded pages](../lessons/22-iframes-and-embedded-pages.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [21 - Audio and video](21-audio-and-video.md) | [Lesson](../lessons/22-iframes-and-embedded-pages.md) | [Example](../examples/22-iframes-and-embedded-pages.md) | [23 - Embedding external content safely](23-safe-embedded-content.md) |
