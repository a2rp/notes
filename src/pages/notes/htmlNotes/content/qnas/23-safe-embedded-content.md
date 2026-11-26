# 23 - Embedding external content safely: Questions and Answers

Practice questions for [Lesson 23 - Embedding external content safely](../lessons/23-safe-embedded-content.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What does the sandbox attribute do on an iframe?

- A. It gives the frame more permissions by default.
- B. It applies restrictions to the embedded document.
- C. It resizes the embedded page.
- D. It changes the embedded page's URL.

**Answer: B.** Sandbox limits capabilities such as scripts, form submission, popups, and top-level navigation.

### 2. What does sandbox with no tokens provide?

- A. A restrictive set of default rules for the embedded page.
- B. Permission to run every script.
- C. Permission to use the camera and microphone.
- D. A guarantee that the frame cannot fail to load.

**Answer: A.** With no tokens, sandbox restrictions remain in place. Add capabilities only when needed.

### 3. What does allow-scripts do when used as a sandbox token?

- A. Allows scripts to run in the embedded page.
- B. Allows every popup and download.
- C. Allows the frame to navigate the parent page.
- D. Allows the frame to access the parent's cookies.

**Answer: A.** The token re-enables script execution in the sandboxed document.

### 4. Why is combining allow-scripts and allow-same-origin dangerous for same-origin content?

- A. It prevents the iframe from loading.
- B. The embedded code may remove the sandbox and reload without its restrictions.
- C. It converts the iframe into a link.
- D. It blocks all CSS.

**Answer: B.** For same-origin content, the combination can let the embedded document remove the sandbox, defeating its restrictions.

### 5. What is a safer way to serve untrusted user-submitted HTML?

- A. Serve it from the same origin and add every sandbox token.
- B. Serve it from a separate, dedicated origin and use sandbox restrictions.
- C. Put it in an image.
- D. Add a title attribute only.

**Answer: B.** A separate origin provides another layer of isolation if someone opens the content directly.

### 6. What is the purpose of an iframe allow attribute?

- A. It sets a Permissions Policy for the embedded document.
- B. It allows every browser feature automatically.
- C. It lists the permitted URLs for src.
- D. It enables sandbox tokens.

**Answer: A.** Allow controls which policy-controlled features may be available in that iframe. It cannot override broader restrictions.

### 7. What does referrerpolicy="no-referrer" do?

- A. Sends the full page URL as referrer.
- B. Sends no referrer information.
- C. Removes the iframe title.
- D. Prevents the iframe from loading.

**Answer: B.** No-referrer withholds referrer information from requests initiated by the iframe.

### 8. Which value requests deferring an offscreen iframe until it is near the viewport?

- A. loading="lazy"
- B. loading="none"
- C. lazy="true"
- D. defer="iframe"

**Answer: A.** Loading lazy asks the browser to defer loading offscreen content. It is not a consent control.

### 9. Why should you use a provider's documented embed URL?

- A. Any page URL is always embeddable.
- B. A normal page URL may not be designed to work inside an iframe, and the provider may restrict framing.
- C. The embed URL automatically makes the iframe accessible.
- D. The URL supplies the iframe's title.

**Answer: B.** Use the URL intended for embedding and provide a direct link in case framing is unavailable.

### 10. Where should an alternative link to embedded content go?

- A. Inside the sandbox attribute.
- B. Near the iframe, outside it.
- C. In the title attribute.
- D. In the width attribute.

**Answer: B.** A regular link outside the frame remains available if the embed cannot be used.

## True or false

### 1. Sandbox applies restrictions to an embedded document.

**Answer: True.** It reduces the capabilities available inside the iframe.

### 2. Adding a sandbox token can re-enable a specific capability.

**Answer: True.** Tokens such as allow-scripts or allow-forms grant particular capabilities.

### 3. More sandbox tokens always make an iframe safer.

**Answer: False.** Each token relaxes a restriction. Add only tokens the embedded page needs.

### 4. Same-origin embedded content should combine allow-scripts and allow-same-origin.

**Answer: False.** The combination can let the embedded content remove the sandbox and reload without its restrictions.

### 5. A sandbox protects hostile content even if a visitor opens it directly outside the iframe.

**Answer: False.** Sandbox only applies inside the frame. Serving untrusted content from a separate origin helps limit damage if opened directly.

### 6. An iframe allow attribute can override restrictions from a parent policy or browser setting.

**Answer: False.** It cannot override broader restrictions or the user's permission choice.

### 7. The no-referrer policy sends no referrer information.

**Answer: True.** It withholds referrer information from the frame's requests.

### 8. Lazy loading replaces a consent choice for a third-party embed.

**Answer: False.** Lazy loading defers loading based on viewport position. It does not provide consent.

### 9. A provider may block its pages from being displayed inside an iframe.

**Answer: True.** A URL is not guaranteed to be embeddable.

### 10. A direct link outside an iframe can give visitors another way to access the content.

**Answer: True.** The link can be used if embedding is blocked or inconvenient.

## Fill in the blanks

### 1. The iframe attribute that applies restrictions to embedded content is ______.

**Answer: sandbox.**

### 2. The sandbox token that permits script execution is ______.

**Answer: allow-scripts.**

### 3. The sandbox token that preserves the embedded document's actual origin is ______.

**Answer: allow-same-origin.**

### 4. Untrusted user content should be served from a ______ origin.

**Answer: separate.**

### 5. The iframe attribute for a Permissions Policy is ______.

**Answer: allow.**

### 6. The iframe attribute that controls referrer information is ______.

**Answer: referrerpolicy.**

### 7. The referrer policy value that sends no referrer information is ______.

**Answer: no-referrer.**

### 8. The iframe loading value for offscreen content is ______.

**Answer: lazy.**

## Short-answer questions

### 1. Why start with sandbox and add tokens selectively?

**Answer:** Sandbox starts with restrictions in place. Each token re-enables a capability, so adding only what is required keeps the embedded page more limited.

### 2. What does allow-same-origin change?

**Answer:** It lets the embedded document retain its actual origin rather than being assigned an opaque origin. It does not itself allow scripts to run.

### 3. Why avoid allow-scripts together with allow-same-origin for same-origin content?

**Answer:** The embedded page may be able to remove its sandbox attribute and reload itself, effectively escaping those restrictions.

### 4. Why is a separate origin useful for user-submitted HTML?

**Answer:** If untrusted content is opened directly, serving it from a separate origin helps keep it from running in the main site's origin.

### 5. What does the allow attribute control, and what can it not do?

**Answer:** It sets a Permissions Policy for an iframe's embedded document. It cannot override restrictions imposed by the parent page, browser settings, or the user's permission choices.

### 6. What information does referrerpolicy="no-referrer" withhold?

**Answer:** It withholds referrer information from requests initiated by the iframe. Some providers may rely on this information, so check the embed's requirements.

### 7. Why provide a normal link next to an iframe?

**Answer:** The provider may block embedding, the page may be unavailable, or visitors may prefer to open the content separately.

### 8. Why does loading="lazy" not replace consent?

**Answer:** Lazy loading controls when the browser loads an offscreen frame. It does not ask permission or explain what third-party content will be loaded.

## Practical coding questions

### 1. Add a restrictive sandbox to an embedded static preview.

**Answer:**

~~~html
<iframe
  src="https://content.example.net/preview/42"
  title="Preview of the submitted page"
  sandbox>
</iframe>
~~~

With no tokens, the sandbox restrictions remain in place. The preview must not depend on blocked capabilities.

### 2. The chart needs scripts, but does not need forms or popups. Add only the required sandbox token.

**Answer:**

~~~html
<iframe
  src="https://widgets.example.net/chart/weekly"
  title="Weekly activity chart"
  sandbox="allow-scripts">
</iframe>
~~~

Only script execution is re-enabled. Other sandbox restrictions remain.

### 3. Explain why this same-origin iframe is unsafe, then show a safer markup change.

~~~html
<iframe
  src="/user-content/post-42.html"
  sandbox="allow-scripts allow-same-origin">
</iframe>
~~~

**Answer:** Because the framed page has the same origin as its parent, it can use the combined permissions to remove the sandbox and reload. One safer starting point is to remove both tokens and serve the untrusted page from a separate origin:

~~~html
<iframe
  src="https://user-content.example.net/post-42.html"
  title="Submitted page preview"
  sandbox>
</iframe>
~~~

A separate origin and restrictive sandbox are layers of protection. The content also needs appropriate server-side handling.

### 4. Allow a trusted video embed to use fullscreen while keeping sandbox restrictions.

**Answer:**

~~~html
<iframe
  src="https://video.example.net/embed/clip-42"
  title="Video: A walk through the garden"
  allow="fullscreen"
  sandbox="allow-scripts">
</iframe>
~~~

The allow attribute requests fullscreen permission. The sandbox still restricts other capabilities.

### 5. Limit referrer information for an embedded report.

**Answer:**

~~~html
<iframe
  src="https://viewer.example.net/report/42"
  title="Embedded report"
  referrerpolicy="no-referrer"
  sandbox>
</iframe>
~~~

No-referrer withholds referrer information. Confirm that the provider does not depend on it.

### 6. Defer a calendar embed that appears near the end of a long page.

**Answer:**

~~~html
<iframe
  src="https://calendar.example.net/embed/community"
  title="Community events calendar"
  width="640"
  height="480"
  loading="lazy"
  sandbox>
</iframe>
~~~

Lazy loading asks the browser to defer an offscreen frame until it is near the viewport.

### 7. Add a direct link next to an embedded map.

**Answer:**

~~~html
<iframe
  src="https://maps.example.net/place/library"
  title="Map showing the central library"
  width="640"
  height="400">
</iframe>

<p>
  <a href="https://maps.example.net/place/library">
    Open the map in a separate page
  </a>
</p>
~~~

The link is outside the iframe and remains available if the embedded map cannot be used.

### 8. The page accepts a URL from a form and inserts it into iframe src without checking it. What should be changed?

**Answer:** Do not put an arbitrary submitted URL directly into src. Accept only URLs from providers and paths that the application explicitly supports, validate the submitted value, and use that trusted embed URL. If the content is user-generated HTML, serve it from a separate origin and sandbox it.

## Related lesson

- [Lesson 23 - Embedding external content safely](../lessons/23-safe-embedded-content.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [22 - The iframe element and embedded pages](22-iframes-and-embedded-pages.md) | [Lesson](../lessons/23-safe-embedded-content.md) | [Example](../examples/23-safe-embedded-content.md) | [24 - Responsive images: picture, srcset, and sizes](24-responsive-images.md) |
