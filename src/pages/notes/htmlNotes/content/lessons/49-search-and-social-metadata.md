# 49 - Search and social sharing metadata

A web page can provide information in its `<head>` for search engines and services that create link previews. Metadata helps those systems understand and represent a page, but it does not guarantee a particular search ranking or preview. The page's own title and content still matter.

## The `<title>` element

The `<title>` gives the document a name. Browsers use it in tabs and history, and search engines can use it when creating a search result title. Give every page a specific title that makes sense when read on its own.

```html
<head>
  <title>HTML document metadata - HTML Practical Notes</title>
</head>
```

Keep the title accurate and concise. A search engine may choose a different title for a result based on the page's headings and other content, so the title is guidance rather than a guaranteed display string.

## A search description

The `description` metadata name provides a short summary of the page:

```html
<meta name="description" content="Learn how HTML titles, descriptions, canonical URLs, and social preview metadata describe a page.">
```

Search engines may use a description in a result snippet, but they can also create a snippet from the page content to better match a search. Write a useful, page-specific summary. Avoid repeating the same description across unrelated pages or filling it with keywords.

The `name` attribute identifies the metadata field, and `content` provides its value. These name-value pairs belong in the document head. A description is not visible page copy, so the page should still explain its subject in its headings and content.

## A preferred URL with `rel="canonical"`

When the same or very similar page is available at more than one URL, a canonical link can indicate the preferred URL.

```html
<link rel="canonical" href="https://www.example.com/notes/html-metadata">
```

Use the complete public URL that should represent the page. A canonical link is a signal to search engines, not a command that guarantees which URL they will select. Keep the canonical URL consistent with the URL used in internal links and other metadata.

Do not add a made-up canonical URL to a real page. If you do not know the preferred public URL, leave the canonical link out until you do. Canonical metadata is for similar or duplicate URLs, not a way to make an unrelated page rank higher or to secure a URL.

## Search crawler instructions

The `robots` metadata name can communicate page-level instructions to crawlers that support it. For example, `noindex` asks search engines not to include the page in search results:

```html
<meta name="robots" content="noindex">
```

Use this only when you intend the page not to appear in search results. Crawlers must be able to fetch the page to read its metadata. `noindex` does not make a page private or prevent people from opening its URL. Use access control for private content.

If no crawler directive is specified, search engines use their default behavior. Do not add `noindex` to ordinary public pages by habit. Also, do not confuse a robots metadata tag with a `robots.txt` file. They are separate mechanisms with different purposes.

## Open Graph social previews

Open Graph is a metadata protocol used by social services to represent a shared page as a rich preview. Its core properties are `og:title`, `og:type`, `og:image`, and `og:url`. `og:description` and `og:image:alt` provide helpful additional information.

```html
<html lang="en" prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HTML document metadata - HTML Practical Notes</title>
    <meta name="description" content="Learn how HTML metadata helps describe a page to search engines and social sharing services.">

    <link rel="canonical" href="https://www.example.com/notes/html-metadata">

    <meta property="og:title" content="HTML document metadata">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.example.com/notes/html-metadata">
    <meta property="og:image" content="https://www.example.com/images/html-metadata-preview.png">
    <meta property="og:description" content="A practical guide to page titles, search descriptions, canonical URLs, and social previews.">
    <meta property="og:image:alt" content="A notebook beside a browser window showing HTML metadata">
  </head>
  <body>
    <h1>HTML document metadata</h1>
    <p>Learn to describe a page in its document head.</p>
  </body>
</html>
```

The `property` attribute identifies an Open Graph property, and `content` gives its value. This is different from a search description written with `name="description"`. Use complete, publicly reachable URLs for `og:url` and `og:image`, so a service fetching the shared page can identify the page and its preview image.

The values should describe the actual page. `og:title` can be shorter than the browser title, and `og:description` can be written specifically for a link preview. The image's alternative text should describe the image, not repeat the caption or page title.

## Keep each metadata value in its role

| Metadata | What it describes | Example |
| --- | --- | --- |
| `<title>` | The document's name | `HTML document metadata - HTML Practical Notes` |
| `meta name="description"` | A summary that search engines may use for a result snippet | `Learn how HTML metadata describes a page.` |
| `link rel="canonical"` | The preferred URL among duplicate or similar URLs | `https://www.example.com/notes/html-metadata` |
| `og:title` | The title for an Open Graph preview | `HTML document metadata` |
| `og:image` | The image for an Open Graph preview | `https://www.example.com/images/html-metadata-preview.png` |
| `meta name="robots"` | A supported crawler instruction for this page | `noindex` |

These values can be related, but each serves a different purpose. Keep them consistent with the visible page and with one another.

## Metadata names that do not help Google Search

A page may contain a `keywords` metadata field, but Google Search does not use `meta name="keywords"` for indexing or ranking. Focus on a clear title, useful page text, and accurate descriptions instead of adding a long keyword list.

## Common mistakes

- Expecting a meta description to force a search engine to show the exact same snippet for every query.
- Copying one generic title and description onto every page.
- Treating `noindex` as a privacy or password feature.
- Blocking a crawler from fetching a page and expecting it to read a `noindex` tag it cannot see.
- Using a canonical URL that points to an unrelated page, or assuming a canonical annotation guarantees the search engine's choice.
- Omitting `og:image` or pointing it to a local file path that social services cannot fetch.
- Using `name="og:title"` instead of the Open Graph `property="og:title"` convention.
- Confusing `og:title` with the HTML `<title>`. One is Open Graph preview metadata, and the other names the document.
- Relying on `meta name="keywords"` as a Google ranking shortcut.

## Try it yourself

1. Give a sample article a unique `<title>` that still makes sense in a browser tab.
2. Add a concise `meta name="description"` that accurately summarizes that article.
3. Add Open Graph properties for the article's title, type, URL, image, and description.
4. Add `og:image:alt` that describes the image itself.
5. Compare the canonical URL and `og:url`. For the preferred page URL, make sure the values agree.
6. In a separate test page that should not appear in search results, add `noindex`. Remember that this does not restrict access to that page.

## Key points

- Put document metadata in the `<head>`.
- Write a clear, page-specific `<title>` and description.
- Search engines can choose their own result title and snippet based on the page and query.
- Use `rel="canonical"` to indicate a preferred URL for duplicate or similar pages. It is a signal, not a guarantee.
- Open Graph describes a page preview with properties such as `og:title`, `og:type`, `og:image`, and `og:url`.
- Use `noindex` only when a page should not appear in search results. It does not make the page private.
- Google Search ignores `meta name="keywords"` for indexing and ranking.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [48 - Favicons and document icons](48-favicons-and-icons.md) | [Q&A](../qnas/49-search-and-social-metadata.md) | [Example](../examples/49-search-and-social-metadata.md) | [50 - Microdata and structured information](50-microdata.md) |
