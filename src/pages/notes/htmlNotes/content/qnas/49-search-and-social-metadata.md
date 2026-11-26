# 49 - Search and social sharing metadata: Questions and Answers

Use these questions to review [Chapter 49 - Search and social sharing metadata](../lessons/49-search-and-social-metadata.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. Where should document-level metadata such as a title and description normally go?

A. In the document's `<head>`

B. At the bottom of the `<body>`

C. Inside an `<img>` element

D. In a comment at the top of the file

**Answer: A.** The `<head>` contains the document title, metadata, and links to related resources.

### 2. What does `<meta name="description">` provide?

A. A guaranteed search result snippet that can never change

B. A page summary that a search engine may use in a result snippet

C. A title shown in the browser tab

D. A redirect destination

**Answer: B.** Search engines can use the description, but may create a snippet from page content instead.

### 3. What does `<link rel="canonical">` indicate?

A. A URL that is guaranteed to rank first

B. A preferred URL for a page among duplicate or similar URLs

C. The location of the favicon

D. A URL that requires a password

**Answer: B.** A canonical annotation is a signal about the preferred URL. It does not guarantee which URL a search engine will select.

### 4. Which attribute convention is used for an Open Graph property?

A. `name="og:title"`

B. `property="og:title"`

C. `alt="og:title"`

D. `rel="og:title"`

**Answer: B.** Open Graph markup uses a `property` value such as `og:title`, with the associated value in `content`.

### 5. Which set contains the four required basic Open Graph properties?

A. `og:title`, `og:type`, `og:image`, and `og:url`

B. `og:description`, `og:author`, `og:date`, and `og:keywords`

C. `title`, `description`, `robots`, and `canonical`

D. `og:lang`, `og:viewport`, `og:charset`, and `og:theme`

**Answer: A.** The Open Graph protocol defines those four properties as the basic required set for an object.

### 6. What does `noindex` do when followed by a search crawler?

A. It encrypts the page contents

B. It asks the crawler not to include the page in search results

C. It hides the page from everyone except the owner

D. It changes the page's canonical URL

**Answer: B.** `noindex` is a search indexing instruction, not access control. It does not prevent people from visiting the page URL.

### 7. What is true about `meta name="keywords"` in Google Search?

A. It is required for every page

B. It controls the page's title link

C. It is not used for indexing or ranking

D. It replaces the visible page text

**Answer: C.** Google Search ignores the keywords meta tag for indexing and ranking. Focus on useful content and accurate metadata instead.

### 8. Why should a page include `og:image:alt` when it provides `og:image`?

A. It describes the image for consumers of the Open Graph metadata

B. It sets the width of the image

C. It forces a particular search ranking

D. It makes the image downloadable

**Answer: A.** The alternative text describes what is in the preview image. It should describe the image itself rather than repeat the page title.

## True or false

### 1. A search engine must show the exact text from `meta name="description"` for every search query.

**Answer: False.** Search engines may use the description, but can generate a query-specific snippet from the page content.

### 2. Each page should have a descriptive title that can make sense on its own.

**Answer: True.** A specific title helps identify the document in tabs, history, bookmarks, and search results.

### 3. A `noindex` directive is a way to password-protect a page.

**Answer: False.** It only communicates an indexing instruction to crawlers that support it. Use authentication or other access controls for private content.

### 4. A crawler must be able to fetch a page to read a `noindex` meta tag on that page.

**Answer: True.** If a crawler cannot access the page, it cannot read the page-level metadata inside it.

### 5. The canonical URL and `og:url` should describe different unrelated pages.

**Answer: False.** They should be consistent and describe the actual page URL intended as the preferred representation.

### 6. Google Search uses `meta name="keywords"` for ranking pages.

**Answer: False.** Google's documentation says the keywords meta tag has no effect on indexing or ranking.

### 7. Open Graph uses `property` and `content` attributes to express its properties.

**Answer: True.** For example, `property="og:title"` names a property and `content="Page title"` gives its value.

### 8. A canonical link guarantees that a search engine will select the URL it names.

**Answer: False.** It is a signal of preference. Search engines can choose a different canonical URL.

## Short-answer questions

### 1. What is the difference between `<title>` and `og:title`?

**Answer:** `<title>` names the HTML document and is used in browser interface areas such as tabs and history. `og:title` supplies a title for an Open Graph sharing preview.

### 2. What does a meta description do, and what should authors not assume about it?

**Answer:** It supplies a short page summary that a search engine may use in a result snippet. Authors should not assume it will be displayed exactly as written for every query.

### 3. When is a canonical link useful?

**Answer:** It can indicate the preferred URL when the same or very similar content is accessible through multiple URLs. It should point to a correct public URL and is not a guarantee of search engine selection.

### 4. Name the four basic Open Graph properties.

**Answer:** `og:title`, `og:type`, `og:image`, and `og:url`.

### 5. Why does a `noindex` tag not make a page private?

**Answer:** It is an instruction for search crawlers, not an access restriction. Anyone who can reach the URL may still open it unless the site requires authentication or otherwise restricts access.

### 6. Why should a site avoid repeating one identical description on every page?

**Answer:** Each page has different content. A page-specific description can summarize that page more accurately and give users useful context in a search result.

### 7. How are Open Graph tags different from `name` metadata such as `description`?

**Answer:** A standard name-value meta field uses `name` and `content`, such as `name="description"`. Open Graph uses `property` and `content`, such as `property="og:title"`.

### 8. Why is `meta name="keywords"` not a useful Google ranking shortcut?

**Answer:** Google Search does not use the keywords meta tag for indexing or ranking. Clear page content, titles, and accurate descriptions are more useful.

## Practical questions

### 1. Correct this Open Graph tag so that it uses the expected attribute.

```html
<meta name="og:title" content="HTML Metadata">
```

**Answer:**

```html
<meta property="og:title" content="HTML Metadata">
```

Open Graph names are expressed through the `property` attribute, with the value supplied by `content`.

### 2. A page is available at both `https://example.com/guide` and `https://example.com/guide?source=mail`. Add a canonical link that prefers the first URL.

**Answer:** Put this in the document head:

```html
<link rel="canonical" href="https://example.com/guide">
```

The link indicates the preferred URL. Search engines may consider other signals as well.

### 3. A page title is currently just `Home`. Improve it for a site named `Garden Notes` and a page about growing basil indoors.

**Answer:**

```html
<title>Growing Basil Indoors - Garden Notes</title>
```

The title identifies the page topic and site instead of using a vague label.

### 4. Write a concise search description for a page that explains how to add Open Graph metadata to an HTML document.

**Answer:**

```html
<meta name="description" content="Learn how to add Open Graph metadata to an HTML page and describe its shared link preview.">
```

The description summarizes the specific page. A search engine may still choose different page text for a snippet.

### 5. Add the four required basic Open Graph properties for a public article page.

**Answer:**

```html
<meta property="og:title" content="A Guide to Indoor Herbs">
<meta property="og:type" content="article">
<meta property="og:url" content="https://example.com/guides/indoor-herbs">
<meta property="og:image" content="https://example.com/images/indoor-herbs.png">
```

Use values that describe the actual page and publicly reachable URLs for the page and image.

### 6. Add a text alternative for this Open Graph preview image.

```html
<meta property="og:image" content="https://example.com/images/indoor-herbs.png">
```

**Answer:**

```html
<meta property="og:image:alt" content="Pots of basil and mint growing on a sunny windowsill">
```

The value describes the image, rather than acting as a caption or repeating the page title.

### 7. A private account page must not be publicly accessible. Is `noindex` enough? What should the site use?

**Answer:** No. `noindex` asks search crawlers not to include the page in results, but does not restrict access. Require authentication or another access control for private content.

### 8. A developer adds `meta name="keywords"` with dozens of search phrases to improve Google ranking. What should they do instead?

**Answer:** Remove the keyword list and write useful page content, a clear title, and a distinct description that accurately summarizes the page. Google Search does not use the keywords meta tag for indexing or ranking.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [48 - Favicons and document icons](48-favicons-and-icons.md) | [Lesson](../lessons/49-search-and-social-metadata.md) | [Example](../examples/49-search-and-social-metadata.md) | [50 - Microdata and structured information](50-microdata.md) |