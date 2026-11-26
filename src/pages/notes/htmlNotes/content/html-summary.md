# HTML Summary

HTML (HyperText Markup Language) describes the structure and meaning of web content. Browsers parse it into a document tree, then combine it with CSS and JavaScript when those resources are present.

This is a compact guide to the course. See the [HTML elements reference](elements-reference.md) for element meanings and the [README lesson list](README.md#lessons) for all chapters.

## Minimal document

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page title</title>
</head>
<body>
  <main>
    <h1>Page heading</h1>
    <p>A paragraph of page content.</p>
  </main>
</body>
</html>
~~~

- `<!doctype html>` asks the browser to use standards mode.
- `<html>` is the root element. Set its `lang` to the document's main language.
- `<head>` contains document information and resource references.
- `<body>` contains page content.
- `<title>` names the document in places such as a browser tab.
- `<main>` identifies the page's primary content.

## Elements and meaning

An element represents content or a feature. Most elements have a start tag, content, and an end tag. In `<p>Text</p>`, the tags are `<p>` and `</p>`, the text is content, and all three parts form the paragraph element.

Attributes go in a start tag and provide information or configure a feature:

~~~html
<a href="contact.html" class="contact-link">Contact</a>
~~~

Here, `a` is the element name, `href` and `class` are attributes, and the quoted strings are their values. Use lowercase names and quote values for consistent, readable markup.

Void elements cannot contain children and have no end tag: `area`, `base`, `br`, `col`, `embed`, `hr`, `img`, `input`, `link`, `meta`, `source`, `track`, and `wbr`.

Choose elements for what content means, not how their default style looks. Use headings for headings, lists for lists, links for navigation, and buttons for actions. Semantic elements such as `header`, `nav`, `main`, `section`, `article`, and `footer` help communicate page structure. Use `div` or `span` for generic grouping when no more specific element fits.

## Text and navigation

Use headings in a meaningful hierarchy. Use `strong` for importance and `em` for stress emphasis. Elements such as `code`, `time`, `abbr`, and `blockquote` communicate more specific meaning.

An `<a>` with `href` makes a link. Write descriptive link text. Use a link to navigate, and a `<button>` to perform an action. URLs can be document-relative, root-relative, absolute, or fragments that point to an element id. The `<base>` element changes resolution of relative URLs across the document.

Use `<ul>` for an unordered list, `<ol>` when order matters, and `<dl>` for terms and descriptions. Character references such as `&amp;`, `&lt;`, and `&gt;` represent characters in source text. They are not layout tools.

## Images, media, and tables

Use `<img>` with suitable `alt` text. Describe an informative image's purpose in context; use `alt=""` for a decorative image. `<figure>` and `<figcaption>` group self-contained content and a caption. `<picture>`, `srcset`, and `sizes` can offer responsive image choices.

Use `<audio>` and `<video>` with appropriate controls and captions. Give an `<iframe>` a descriptive `title` and limit its capabilities. SVG and MathML use separate element vocabularies inside HTML documents.

Use `<table>` for data with real row and column relationships, not page layout. A `<caption>` can name the table. Use `<th>` for headers and `<td>` for data, with suitable header associations such as `scope`.

## Forms and interaction

A `<form>` groups controls that submit related data. Give controls visible, programmatically associated labels, often with matching `for` and `id` values. The `name` attribute identifies submitted values. Choose a suitable `type`, such as `email`, `checkbox`, or `date`.

Use constraints such as `required`, `min`, `max`, and `pattern` when they fit the data. Group related controls with `<fieldset>` and `<legend>`. Use `<select>`, `<option>`, `<textarea>`, and `<button>` for their intended jobs. Set a form button's `type` explicitly.

Browser validation improves the experience, but the server must validate submitted data too. Native elements such as `<details>`, `<summary>`, `<dialog>`, `<template>`, and popover attributes provide built-in behavior when their purpose fits.

## Accessibility

- Prefer native HTML semantics and controls.
- Use a logical heading structure and meaningful landmarks.
- Make link and control names clear, and keep keyboard use possible.
- Associate form controls with labels and group related controls.
- Provide useful image alternatives, captions, and transcripts where needed.
- Set document language with `lang`; identify language changes in content.
- Use ARIA only when native HTML does not provide the needed semantics.
- Keep focus behavior predictable. Use `tabindex` sparingly and avoid positive values.

## Metadata, safety, and validation

The document head can contain character encoding, viewport information, a title, description, icon links, and other metadata. Metadata describes the page; it does not replace useful visible content.

Treat user-provided content as data rather than trusted markup. Configure embedded content with only the access it needs. Client-side validation is not a security boundary. Use a conformance checker and browser developer tools to find markup errors, then review keyboard access, responsive behavior, and forms.

## A practical authoring sequence

1. Identify the page's purpose and outline its content.
2. Choose semantic elements and write meaningful text.
3. Add links, images, lists, tables, media, or form controls as needed.
4. Add metadata, alternative text, labels, and language information.
5. Check nesting, paths, required attributes, and form behavior.
6. Validate the markup and review it in a browser.

## Course map

- Foundations: [basic document](lessons/03-basic-html-document.md), [elements and attributes](lessons/05-elements-tags-and-attributes.md), [nesting and syntax](lessons/06-nesting-and-html-syntax.md).
- Text and navigation: [text semantics](lessons/12-text-semantics.md), [links](lessons/15-links.md), [URLs](lessons/16-urls-paths-and-fragments.md), [lists](lessons/18-lists.md).
- Images, media, and tables: [images](lessons/19-images-and-alt-text.md), [responsive images](lessons/24-responsive-images.md), [accessible tables](lessons/27-accessible-tables.md).
- Forms: [input types](lessons/29-input-types-and-attributes.md), [labels](lessons/30-labels-and-form-controls.md), [validation](lessons/34-form-validation.md), [submission](lessons/35-form-submission.md).
- Semantics and accessibility: [semantic HTML](lessons/37-semantic-html.md), [landmarks](lessons/39-landmarks-and-page-navigation.md), [ARIA](lessons/41-aria-in-html.md).
- Interaction and advanced topics: [details](lessons/43-details-and-summary.md), [dialog](lessons/44-dialog-element.md), [popover](lessons/45-popover-attributes.md), [templates](lessons/46-template-element.md), [safety](lessons/51-html-safety.md), [validation](lessons/53-validation-and-debugging.md), [base URLs](lessons/56-base-element-and-relative-urls.md), and [image maps](lessons/57-image-maps-with-map-and-area.md).

[Back to the README](README.md)
