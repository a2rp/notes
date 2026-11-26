# 56 - The base element and relative URLs

The `<base>` element sets the base URL that the browser uses to resolve relative URLs in a document. It can also set the default browsing context for links and forms. It belongs in the head and does not display content.

## Placement and rules

`<base>` is a void metadata element with no closing tag. A document can have at most one. It must have an `href` attribute, a `target` attribute, or both.

When `href` is present, place `<base>` before other elements that use URLs. For example, this makes the stylesheet URL resolve against the guide directory:

~~~html
<head>
  <meta charset="utf-8">
  <title>Guide page</title>
  <base href="https://docs.example.test/guide/">
  <link rel="stylesheet" href="styles/site.css">
</head>
~~~

The stylesheet URL resolves to `https://docs.example.test/guide/styles/site.css`. Without `<base href>`, relative URLs normally resolve against the document's own URL.

## How href changes URL resolution

Relative URLs in links, images, scripts, stylesheets, forms, and other URL-bearing attributes resolve against the base URL.

With `<base href="https://docs.example.test/guide/">`:

| Markup value | Resolved URL |
| --- | --- |
| `chapter-1.html` | `https://docs.example.test/guide/chapter-1.html` |
| `/contact/` | `https://docs.example.test/contact/` |
| `#summary` | `https://docs.example.test/guide/#summary` |

A path beginning with `/` starts at the host's root path. A path without the first slash is appended to the base URL's directory. A fragment-only value is also resolved against the base URL. If that base points somewhere other than the current page, a fragment link may navigate there instead of jumping within the current page.

An absolute URL already identifies its destination, so it is not redirected to the base URL.

## The target attribute

The `target` attribute sets a default browsing context for hyperlinks and form submissions. A link or form with its own `target` value uses that value instead.

| Value | Meaning |
| --- | --- |
| `_self` | Use the current browsing context. |
| `_blank` | Open the destination in a new browsing context, usually a new tab. |
| A name such as `results` | Use a matching named browsing context, or create one if needed. |

Avoid setting `target="_blank"` on `<base>` without a clear reason. It changes the default for every link and form that does not set its own target, which can surprise visitors. Set that behavior on only the links that need it.

## Common mistakes

- Putting `<base>` in `<body>` instead of `<head>`.
- Adding more than one `<base>` element.
- Placing `<base href>` after a stylesheet, image, script, or another element that already uses a URL.
- Forgetting that relative image, stylesheet, script, form-action, and fragment URLs can all be affected.
- Assuming `href="#section"` always points to the current page's section.
- Setting a site-wide `target="_blank"` when only a few links need it.

Use `<base>` only when a document genuinely needs a shared URL base. Otherwise, ordinary relative URLs are easier to understand and move.

## Try it yourself

1. Add `<base href="https://docs.example.test/guide/">` to a sample document.
2. Add links using `chapter-1.html`, `/contact/`, and `#summary`.
3. Write down each resolved URL before opening the links.
4. Move `<base>` below a stylesheet link with a relative URL. Explain why this ordering is invalid.
5. Add `target="_blank"` to one link, then compare it with setting that target on `<base>`.

## Key points

- `<base>` is a void metadata element placed in `<head>`.
- Its `href` changes how relative URLs throughout the document are resolved.
- Its `target` sets a default browsing context for links and forms.
- Use at most one `<base>` element and place it before URL-bearing elements.
- Check fragment links carefully because the base URL can change their destination.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :---: | :---: | ---: |
| [55 - HTML quick reference and glossary](55-html-reference-and-glossary.md) | [Q&A](../qnas/56-base-element-and-relative-urls.md) | [Example](../examples/56-base-element-and-relative-urls.md) | [57 - Image maps with map and area](57-image-maps-with-map-and-area.md) |
