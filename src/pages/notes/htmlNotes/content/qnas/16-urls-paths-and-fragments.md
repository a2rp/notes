# 16 - URLs, file paths, and page fragments: Questions and Answers

Practice questions for [Lesson 16 - URLs, file paths, and page fragments](../lessons/16-urls-paths-and-fragments.md). Each question is followed by its answer and an explanation or worked example where useful. URL resolution examples state the starting page so the result is clear.

## Multiple-choice questions

### 1. Which part of a URL identifies how the resource is accessed, such as HTTPS?

- A. Fragment
- B. Scheme
- C. Query
- D. File name

**Answer: B.** The scheme, such as https, identifies the URL protocol.

### 2. What does the host part of a web URL identify?

- A. The website's host name.
- B. The fragment ID.
- C. The query value.
- D. The current folder on your computer.

**Answer: A.** In https://example.com/guide, example.com is the host.

### 3. If the current URL is https://example.com/guides/links.html, where does next.html resolve?

- A. https://example.com/next.html
- B. https://example.com/guides/next.html
- C. https://next.html
- D. https://example.com/guides/links.html#next.html

**Answer: B.** A relative file path without a leading slash starts from the current document's directory.

### 4. From https://example.com/guides/links.html, what does ../index.html resolve to?

- A. https://example.com/guides/index.html
- B. https://example.com/index.html
- C. https://example.com/guides/links.html/index.html
- D. https://index.html

**Answer: B.** The ../ segment moves up one directory level, from /guides/ to the website root.

### 5. What does a path beginning with / mean in a web URL?

- A. Start from the current document's directory.
- B. Start from the website's root.
- C. Start from the user's computer drive.
- D. Open a new browser window.

**Answer: B.** A leading slash makes the path root-relative to the current website origin.

### 6. Which character begins a URL query?

- A. #
- B. ?
- C. /
- D. &

**Answer: B.** A query starts with ?. It appears before any fragment.

### 7. Which character begins a URL fragment?

- A. #
- B. ?
- C. :
- D. &

**Answer: A.** A fragment starts with # and can identify a part of a document.

### 8. What must a fragment such as #contact match to jump to an element?

- A. The element's title attribute.
- B. The element's id value.
- C. The element's class value.
- D. The page's file name.

**Answer: B.** The fragment value after # must match the target element's id.

### 9. How should a space in a URL path commonly be written?

- A. As two spaces.
- B. As %20.
- C. As a backslash.
- D. As a question mark.

**Answer: B.** Percent encoding represents a space as %20 in a URL.

### 10. Which is true about a Windows path such as D:\html\page.html?

- A. It is automatically a public website URL.
- B. It is a local computer file path, not a link that will work for all website visitors.
- C. It always resolves from the website root.
- D. It is a fragment identifier.

**Answer: B.** A local drive path belongs to one computer. Public links should use web URLs that work on the hosted site.

## True or false

### 1. An absolute web URL includes a scheme and host.

**Answer: True.** For example, https://example.com/guide includes the https scheme and example.com host.

### 2. A relative URL is resolved using the current document's URL.

**Answer: True.** The current page's location determines where a relative path points.

### 3. A path beginning with ../ moves up one URL directory level.

**Answer: True.** Each ../ segment moves the path one level toward its parent.

### 4. A leading slash in a URL path means the user's computer drive root.

**Answer: False.** In a web URL, it means the root of the website's origin.

### 5. A URL query begins with #.

**Answer: False.** A query begins with ?. The # begins a fragment.

### 6. A URL fragment can point to an element whose id matches the fragment.

**Answer: True.** For example, #contact can refer to an element with id="contact".

### 7. The query component comes after the fragment.

**Answer: False.** The query comes before the fragment, as in ?q=html#results.

### 8. IDs used as fragment destinations should be unique within the document.

**Answer: True.** Unique IDs avoid ambiguity about which element a fragment refers to.

### 9. A query string automatically makes a page search its content.

**Answer: False.** The destination page or service must be programmed to interpret the query values.

### 10. Ampersands between query parameters in an HTML attribute should be written as `&amp;`.

**Answer: True.** HTML uses character references in attribute values, so write `&amp;` for an ampersand.

## Fill in the blanks

### 1. The ______ of a web URL identifies the protocol, such as https.

**Answer: scheme.** The scheme appears before the colon.

### 2. The ______ identifies the website host in an absolute web URL.

**Answer: host.** For https://example.com/page, the host is example.com.

### 3. A relative path beginning with ______ moves up a directory level.

**Answer: ../.** Each ../ moves up one level.

### 4. A URL query begins with the character ______.

**Answer: ?.** Query values follow the question mark.

### 5. A URL fragment begins with the character ______.

**Answer: #.** The value after it can identify an element in a document.

### 6. The fragment #details can point to an element with the matching ______ value.

**Answer: id.** The target element would have id="details".

### 7. A space in a URL is commonly percent-encoded as ______.

**Answer: %20.** Percent encoding represents characters that need an encoded form in a URL.

### 8. In an HTML attribute, write a query separator ampersand as ______.

**Answer: `&amp;`.** This is the HTML character reference for an ampersand.

## Short-answer questions

### 1. Explain the difference between an absolute and a relative URL.

**Answer:** An absolute web URL includes the scheme and host, such as https://example.com/guide.html. A relative URL leaves out those parts and is resolved from the current document's URL, such as guide.html.

### 2. How does a path without a leading slash resolve?

**Answer:** It starts from the current document's directory. If the page is https://example.com/guides/index.html, then next.html resolves to https://example.com/guides/next.html.

### 3. What is the difference between ../page.html and /page.html?

**Answer:** ../page.html moves up one directory from the current location, then looks for page.html. /page.html starts at the website root.

### 4. What is a query string used for?

**Answer:** A query string carries additional values in a URL, often for a search, filter, or selected item. The destination decides how to use those values.

### 5. What is a fragment, and what does it commonly target?

**Answer:** A fragment is the part of a URL after #. In an HTML page, it commonly targets an element with a matching id.

### 6. Why should IDs used as fragment destinations be unique?

**Answer:** A unique ID identifies one element clearly. Repeating an ID makes the fragment destination ambiguous and breaks the document's ID rules.

### 7. Why is a local path such as D:\html\page.html unsuitable as a public link?

**Answer:** It refers to a file on one person's computer. Other visitors do not share that drive or folder. Use a URL based on the deployed website's structure.

### 8. Why do HTML href values use `&amp;` between query parameters?

**Answer:** In HTML source, an ampersand begins a character reference. Writing `&amp;` represents a literal ampersand in the URL while keeping the attribute valid HTML.

## Practical and coding questions

### 1. The current page is https://example.com/courses/html/index.html. Write a relative link to lesson-1.html in the same folder.

**Answer:**

~~~html
<a href="lesson-1.html">Lesson 1</a>
~~~

The path resolves to https://example.com/courses/html/lesson-1.html.

### 2. From https://example.com/courses/html/index.html, write a relative link to https://example.com/courses/index.html.

**Answer:**

~~~html
<a href="../index.html">Courses home</a>
~~~

The ../ segment moves from /courses/html/ up to /courses/.

### 3. From https://example.com/courses/html/index.html, write a root-relative link to https://example.com/contact.html.

**Answer:**

~~~html
<a href="/contact.html">Contact</a>
~~~

A leading slash starts at the website root.

### 4. Create a heading with the ID contact and a link that jumps to it from the same page.

**Answer:**

~~~html
<a href="#contact">Go to contact information</a>

<h2 id="contact">Contact information</h2>
~~~

The fragment after # matches the heading's id value.

### 5. Link to the examples section in a file named lesson-2.html.

**Answer:**

~~~html
<a href="lesson-2.html#examples">Lesson 2 examples</a>
~~~

The path names the page, and the fragment points to the element with id="examples" in that page.

### 6. Add topic and level query parameters to an HTML link.

**Answer:**

~~~html
<a href="/search?topic=html&amp;level=beginner">Search beginner HTML</a>
~~~

The query begins with ?. The ampersand between parameters is written as `&amp;` in HTML.

### 7. Link to a file named my notes.pdf in a files folder.

**Answer:**

~~~html
<a href="/files/my%20notes.pdf">Open my notes</a>
~~~

The space is percent-encoded as %20. In practice, file names without spaces can make URLs simpler.

### 8. Find and fix this link, assuming the target heading has the ID page-fragments:

~~~html
<a href="D:\html\guide.html#page fragments">Read more</a>
~~~

**Answer:**

~~~html
<a href="guide.html#page-fragments">Read about page fragments</a>
~~~

The Windows drive path is not a public website URL. The fragment must match the target ID, and useful link text should describe the destination. If the guide is in another folder, adjust the relative path to match the site's actual file structure.

## Related lesson

- [Lesson 16 - URLs, file paths, and page fragments](../lessons/16-urls-paths-and-fragments.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [15 - Links and the anchor element](15-links.md) | [Lesson](../lessons/16-urls-paths-and-fragments.md) | [Example](../examples/16-urls-paths-and-fragments.md) | [17 - Navigation and linking between pages](17-navigation-and-page-links.md) |
