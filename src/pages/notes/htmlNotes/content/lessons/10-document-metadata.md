# 10 - Metadata: charset, viewport, and description

The **head** element stores information about an HTML document. This chapter covers three common metadata settings: the character encoding, the mobile viewport, and a short page description.

## What you will learn

- Explain what a **meta** element does.
- Declare the document character encoding with **charset**.
- Add a common mobile viewport setting.
- Write a useful page description with **name="description"**.
- Tell metadata apart from visible page content.

## What is metadata?

Metadata is information about a document rather than the main content shown to readers. In HTML, **meta** elements usually go in the **head**. They use attributes to describe the kind of information and its value.

A **meta** element is a void element. It has no closing tag:

~~~html
<meta charset="utf-8">
~~~

Several different **meta** elements can appear in a document because each can describe a different kind of information.

## Declare the character encoding

A character encoding tells software how to interpret the bytes in a text file as characters. HTML documents should be saved as UTF-8, a common encoding that supports a wide range of writing systems and symbols.

Declare UTF-8 near the start of the **head**:

~~~html
<head>
  <meta charset="utf-8">
  <title>Garden journal</title>
</head>
~~~

The file itself must also be saved as UTF-8. A declaration in the HTML cannot repair a file saved using a different encoding.

Use only one **charset** declaration in a document. Put it early in the file, before content that depends on character decoding. In standard HTML, the encoding declaration must appear within the first 1024 bytes.

## Set the viewport for mobile layouts

A viewport is the area in which a page is displayed. On mobile devices, a viewport setting helps the browser lay out a page using the device's available width.

A common setting is:

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~

The **width=device-width** setting asks the browser to use the device's width for the layout viewport. **initial-scale=1** sets the initial zoom scale.

This metadata does not make a fixed-width page responsive by itself. The page's layout and content also need to adapt to different screen sizes. Avoid settings that prevent users from zooming the page.

## Add a page description

A description meta element provides a short summary of the page:

~~~html
<meta name="description" content="Practical notes for growing herbs in a small garden.">
~~~

The **name** attribute identifies the metadata type. The **content** attribute provides its value. The description is not displayed as a paragraph in the page.

Search services may use this description when showing a result, but they can choose other text. Write an accurate, specific summary that matches the page. Do not treat the description as a guaranteed search result or put essential instructions only in metadata.

Each page should have its own relevant description. Avoid copying one generic description across unrelated pages.

## Keep metadata in the head

Place metadata inside the **head**, before the **body** begins:

~~~html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Practical notes for growing herbs in a small garden.">
  <title>Growing herbs | Garden journal</title>
</head>
~~~

The metadata describes the document. Reader-facing content belongs in the **body**:

~~~html
<body>
  <h1>Growing herbs</h1>
  <p>Start with a sunny spot and a suitable pot.</p>
</body>
~~~

Do not put a visible paragraph inside a **meta** element. Its information is expressed through attributes, not child text.

## A complete example

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A beginner's guide to growing basil indoors.">
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

The **charset** declaration tells software how to decode the document. The viewport setting gives mobile browsers a useful layout width and initial scale. The description summarizes the page for software that uses it. The **title** names the document, while the **h1** introduces its visible content.

## Common mistakes

- **Putting metadata in the body.** Place **meta** elements in the **head**.
- **Forgetting to save the file as UTF-8.** The declaration and the file encoding need to agree.
- **Adding several charset declarations.** Use one encoding declaration.
- **Putting the charset declaration late in a large file.** Place it near the beginning of the document.
- **Expecting the viewport setting to create a responsive layout.** The page itself must also adapt to available width.
- **Preventing users from zooming.** Keep zoom available for readers who need it.
- **Expecting a description to appear exactly as written in every search result.** Services may select other text.
- **Putting visible page copy in the description meta element.** Put reader-facing text in the body.

## Try it yourself

1. Add a UTF-8 character encoding declaration near the start of a page's **head**.
2. Add the common viewport setting from this chapter.
3. Write a short, accurate description for a page about container gardening.
4. Make sure the page title, description, and visible **h1** describe the same subject without repeating the same sentence.
5. Identify which of these belongs in the body: a meta description or a paragraph for readers.
6. Open a page on a narrow screen and notice whether its content fits. Explain why viewport metadata alone cannot fix a fixed-width layout.
7. Check that your source file is saved as UTF-8 and that it has only one charset declaration.

## Key points

- **meta** elements provide information about a document and usually belong in the **head**.
- Save HTML files as UTF-8 and declare the encoding near the start of the document.
- The viewport setting gives mobile browsers a layout width and initial scale.
- Viewport metadata does not replace a responsive page layout.
- A description summarizes the page for software and may be used in search results.
- Metadata describes the document; visible page content belongs in the **body**.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [09 - The head element and page title](09-head-and-title.md) | [Q&A](../qnas/10-document-metadata.md) | [Example](../examples/10-document-metadata.md) | [11 - Headings and paragraphs](11-headings-and-paragraphs.md) |
