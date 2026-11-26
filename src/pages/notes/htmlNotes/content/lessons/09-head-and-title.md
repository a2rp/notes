# 09 - The head element and page title

Every HTML document has information about the document itself and content that appears in the page. The **head** element contains document information, while the **body** contains page content. The **title** element gives the document its name in places such as browser tabs and bookmarks.

## What you will learn

- Explain the purpose of the **head** and **body** elements.
- Place the **head** and **title** elements in a basic HTML document.
- Write a clear, useful page title.
- Tell the difference between the **title** element and a visible heading.
- Recognize common mistakes when writing document titles.

## The head and the body

The **html** element contains the document. Inside it, the **head** provides document metadata and the **body** contains the content presented in the page:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <title>Garden journal</title>
  </head>
  <body>
    <h1>Garden journal</h1>
    <p>Notes from the backyard.</p>
  </body>
</html>
~~~

The **head** is not a place to put the page's visible heading, paragraphs, or images. It is a place for information about the document and references to resources. Metadata such as character encoding, viewport settings, and a description will be covered in the next chapter.

Browsers may repair incomplete markup, but write the document structure explicitly. Include one **head** and one **body** so the source is clear and predictable.

## Write the document title

The **title** element belongs inside the **head**:

~~~html
<head>
  <title>Garden journal</title>
</head>
~~~

A normal HTML document should have one **title** element. Its text names the document. Browsers commonly show this title in the browser tab. It can also appear in bookmarks and browsing history. Search services may use it when describing a result, though they can choose other text.

A useful title helps someone recognize the page even when they see it away from the page itself. Include the specific subject and, when helpful, the site or section name:

~~~html
<title>Spring planting guide | Garden journal</title>
~~~

Avoid titles that are empty, too vague, or identical across unrelated pages. The example identifies both the subject and the site. A title such as “Home” alone gives little information in a long list of tabs or bookmarks.

## The page title and the visible heading

The **title** element and the **h1** element have different jobs:

- The **title** element names the document outside the page content, such as in the browser tab.
- The **h1** element is the main visible heading in the page content.

A page commonly uses both:

~~~html
<head>
  <title>Spring planting guide | Garden journal</title>
</head>
<body>
  <h1>How to plan spring planting</h1>
  <p>Start by checking your local growing season.</p>
</body>
~~~

Their wording can be related, but does not need to be identical. The document title should make sense in a tab, bookmark, history list, or search result. The visible heading should make sense where the page content begins.

Do not use a **title** attribute when you mean the document's title. The **title** element goes in the **head**; the **title** attribute provides advisory information for an individual element.

## Keep title text simple

The content of the **title** element is text. Do not put an **h1**, **span**, image, or other visible element inside it:

~~~html
<head>
  <title>Plant care basics</title>
</head>
~~~

Keep the title useful and concise. Put the most important page subject first, especially if you add a site name after it. Avoid repeating the same words unnecessarily.

A title is not a substitute for the visible page heading. Readers still need a clear heading in the **body**.

## A complete example

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Growing basil indoors | Garden journal</title>
  </head>
  <body>
    <main>
      <h1>Growing basil indoors</h1>
      <p>Give basil warmth, bright light, and well-drained soil.</p>
    </main>
  </body>
</html>
~~~

The **head** contains the document title and metadata. The **body** contains the page content. The browser can use the title to identify this document outside the page, while the **h1** introduces the visible content.

The **meta** elements in this example are introduced here because they commonly appear in a **head**. The next chapter explains them in detail.

## Common mistakes

- **Putting the visible page heading in the head.** Put visible content in the body.
- **Putting the title element in the body.** Place it inside the head.
- **Confusing the title element with the title attribute.** The element names the document; the attribute provides advisory information for an individual element.
- **Using the same vague title for every page.** Give each page a title that identifies its own subject.
- **Treating the document title as the visible page heading.** Use a visible heading such as **h1** in the body.
- **Putting markup inside the title element.** Its content is text, not a container for visible HTML elements.
- **Leaving the title empty or unhelpful.** Choose wording that makes sense in a tab or bookmark.

## Try it yourself

1. Add a **head** and a **body** to a basic HTML document.
2. Put one **title** element inside the **head**.
3. Write a useful title for a page about growing tomatoes in containers.
4. Add a visible **h1** to the **body**. Make sure it introduces the page content.
5. Explain how the browser tab title and visible **h1** have different purposes.
6. Write two related pages with distinct titles that would still be clear in a bookmark list.
7. Identify which part of a document should contain character encoding metadata and which part should contain a paragraph for readers.

## Key points

- The **head** contains document metadata and resource information.
- The **body** contains page content presented to readers.
- The **title** element belongs in the **head** and names the document.
- A useful document title makes sense out of context, such as in a tab or bookmark.
- The **title** element is different from a visible **h1** and from the **title** attribute.
- Keep the title text clear, concise, and specific to the page.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [08 - Comments, character references, and special characters](08-comments-and-character-references.md) | [Q&A](../qnas/09-head-and-title.md) | [Example](../examples/09-head-and-title.md) | [10 - Metadata: charset, viewport, and description](10-document-metadata.md) |
