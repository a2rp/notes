# 51 - Safe links and embedded content: Questions and Answers

Use these questions to review [Chapter 51 - Safe links and embedded content](../lessons/51-html-safety.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does rel="noopener" do on a link that opens another browsing context?

A. It verifies the destination.

B. It prevents the opened page from receiving a window.opener reference.

C. It hides the link text.

D. It forces a download.

**Answer: B.** It protects the opener relationship. It does not verify or change the destination.

### 2. What does rel="noreferrer" do?

A. It blocks the link from loading.

B. It withholds referrer information and also provides noopener behavior.

C. It disables cookies on the destination.

D. It forces the link to open in the current tab.

**Answer: B.** It controls referrer information and also includes noopener behavior. It does not guarantee anything about cookies.

### 3. What does the download attribute communicate?

A. That the resource is guaranteed to download from any website

B. That the author intends the link to download a resource

C. That the file is safe to open

D. That the link opens in a new tab

**Answer: B.** It expresses download intent and may suggest a filename. Browser behavior and cross-origin rules can affect the result.

### 4. Which element should be used for an action on the current page?

A. An anchor with a javascript: URL

B. An anchor with href="#"

C. A button element

D. An iframe element

**Answer: C.** Use a button for an action. An anchor represents navigation to a resource.

### 5. What is the main purpose of loading="lazy" on an iframe below the fold?

A. To defer loading until the frame is near the viewport

B. To sanitize the frame's HTML

C. To block scripts

D. To label the iframe for screen readers

**Answer: A.** Lazy loading can defer work for content farther down the page. It is a performance option, not a security control.

## True or false

### 1. Link text should describe the destination or action that the link actually performs.

**Answer: True.** Clear text helps visitors decide whether to follow a link and compare it with the actual destination.

### 2. rel="noopener" proves that an external website is safe.

**Answer: False.** It prevents an opener relationship. It does not inspect or certify the destination.

### 3. Current HTML gives a link with target="_blank" noopener behavior by default unless the link explicitly requests an opener.

**Answer: True.** Including rel="noopener" explicitly can still make the intent clear in the source.

### 4. An empty sandbox attribute applies restrictions to an iframe.

**Answer: True.** Tokens can restore particular capabilities, so add only those the embed needs.

### 5. loading="lazy" is a security boundary for an iframe.

**Answer: False.** It can defer loading for performance. It does not limit what the embedded document can do.

## Short-answer questions

### 1. What is the difference between noopener and noreferrer?

**Answer:** noopener prevents the opened page from receiving a window.opener reference. noreferrer withholds referrer information and also includes the noopener behavior.

### 2. Does noopener make the link destination trustworthy?

**Answer:** No. It protects the opener relationship. Visitors still need clear link text and a destination they trust.

### 3. What does the download attribute do, and what does it not guarantee?

**Answer:** It expresses that the author intends the linked resource to be downloaded and can suggest a filename. It does not guarantee a cross-origin download or exact browser behavior.

### 4. Why should an ordinary link not use a javascript: URL?

**Answer:** A javascript: URL can execute code when followed. Use an anchor for navigation and a button for an action.

### 5. Why provide a regular link near an iframe?

**Answer:** The embed may fail, be blocked by its provider, or be difficult to use in the frame. A normal link gives visitors another way to reach the content.

## Practical questions

### 1. Update this link to open another browsing context, protect the opener relationship, and explain the behavior to visitors.

~~~html
<a href="https://example.org/guide">Read the guide</a>
~~~

**Answer:**

~~~html
<a
  href="https://example.org/guide"
  target="_blank"
  rel="noopener"
>
  Read the guide on Example.org (opens in a new tab or window)
</a>
~~~

The text describes the destination and behavior. noopener addresses the opener relationship.

### 2. Add a clearly labeled PDF download link and suggest the filename html-notes.pdf.

**Answer:**

~~~html
<a href="/files/html-notes.pdf" download="html-notes.pdf">
  Download the HTML notes (PDF)
</a>
~~~

The visible text identifies the file type. The browser may adjust the suggested filename.

### 3. Replace this action link with a button.

~~~html
<a href="javascript:saveDocument()">Save</a>
~~~

**Answer:**

~~~html
<button type="button">Save</button>
~~~

The button communicates an action. The application must provide the behavior that saves the document.

### 4. Add a title and a minimal sandbox to this iframe. The example player needs scripts to run.

~~~html
<iframe src="https://player.example.org/embed/42"></iframe>
~~~

**Answer:**

~~~html
<iframe
  src="https://player.example.org/embed/42"
  title="Video: How to grow basil indoors"
  sandbox="allow-scripts">
</iframe>
~~~

The title describes the frame. The sandbox restores script execution because this example needs it, while leaving other restrictions in place. Check the provider's requirements before adding other tokens.

### 5. What should an application do before displaying a URL submitted by a visitor as a link?

**Answer:** Validate the URL before rendering it. Allow only expected schemes and destinations, such as approved HTTPS URLs. An href attribute does not make arbitrary input safe.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [50 - Microdata and structured information](50-microdata.md) | [Lesson](../lessons/51-html-safety.md) | [Example](../examples/51-html-safety.md) | [52 - Deprecated elements and obsolete HTML](52-obsolete-html.md) |