# 11. Metadata and the document head

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Semantic page structure and landmarks](./10-semantic-page-structure-and-landmarks.md) | [Notes index](../README.md) | [Next: Loading scripts and external resources](./12-loading-scripts-and-external-resources.md) |

## Put document information in head

head contains metadata and resource links that describe or support the document. Most of its contents are not displayed as page content.

~~~html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta
    name="description"
    content="A field journal about planning and caring for a home garden."
  />
  <title>Garden Journal | Home</title>
  <link rel="icon" href="./favicon.ico" sizes="any" />
</head>
~~~

Keep the charset declaration near the beginning of head. The viewport metadata helps the document use the device width on mobile screens. A concise title identifies the current page in browser tabs and history. A description can summarize the page for search and sharing contexts.

## Add a page title and description

Give each page a clear, descriptive title. Do not use the same generic title across every page when the content differs.

The description should summarize the page accurately. It is metadata for other software and is not a substitute for visible page content.

## Link site resources

link can connect the document to related resources such as a favicon or stylesheet.

~~~html
<link rel="stylesheet" href="./styles.css" />
<link rel="icon" href="./images/site-icon.svg" type="image/svg+xml" />
~~~

Resource paths are resolved relative to the HTML document unless a base URL changes that behavior. Keep relative paths consistent with the project's file structure.

## Add social sharing information when needed

Open Graph metadata can describe how a page should appear when shared on compatible services.

~~~html
<meta property="og:title" content="Garden Journal" />
<meta
  property="og:description"
  content="Notes from planning and growing a home garden."
/>
<meta property="og:image" content="https://example.com/images/garden-share.jpg" />
<meta property="og:url" content="https://example.com/garden/" />
~~~

Use absolute URLs for share images and page URLs when the receiving service needs to fetch them from the public site. The image should exist at that URL and have a useful crop.

## Avoid metadata that does not match the page

Metadata should agree with the visible content. Do not add unrelated keywords or descriptions. Metadata cannot replace a visible heading, label, or explanation.

## Practice questions

1. What type of information belongs in head?
2. What does the charset declaration configure?
3. Why include viewport metadata?
4. Where is the title commonly shown?
5. What does the meta description summarize?
6. What is the role of a favicon link?
7. What does Open Graph metadata describe?
8. Why should metadata match visible page content?

## Main references

- [What's in the head](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata)
- [The head element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head)
- [The meta element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta)
- [The title element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title)
- [The link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)