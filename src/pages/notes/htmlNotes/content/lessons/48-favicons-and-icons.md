# 48 - Favicons and document icons

A favicon is a small icon associated with a web page. Browsers may show it in a tab, bookmark, history list, or other parts of their interface. In HTML, the standard way to associate an icon with the current document is a `<link>` element with `rel="icon"` in the document's `<head>`.

## Add one icon

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My project notes</title>
    <link rel="icon" href="/favicon.ico">
  </head>
  <body>
    <h1>Project notes</h1>
  </body>
</html>
```

The `href` points to an image file. The leading slash in `/favicon.ico` means the file is at the root of the site. A path without the leading slash, such as `icons/favicon.png`, is relative to the document's URL. Choose a path that matches where the site is deployed, especially when it is hosted below a subpath.

Many browsers also check for `/favicon.ico` by convention. An explicit `<link rel="icon">` makes the intended location clear and lets you use another path or format.

## Offer icon choices

A page can provide more than one icon. Browsers can use the `type`, `media`, and `sizes` attributes to choose a suitable candidate. If multiple candidates are equally suitable, the last declared one is used. If a candidate cannot be used, the browser can try another appropriate one.

```html
<head>
  <meta charset="utf-8">
  <title>My project notes</title>
  <link rel="icon" href="/favicon.ico" type="image/vnd.microsoft.icon">
  <link rel="icon" href="/icons/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" sizes="any">
</head>
```

Here, the page offers an ICO icon, a 32 by 32 pixel PNG icon, and a scalable SVG icon.

- `rel="icon"` describes the relationship between this document and its icon.
- `href` gives the icon file's URL.
- `type` gives the icon's media type. It can help a browser decide whether it can use a candidate.
- `sizes` describes the icon dimensions in the file. Values are space-separated dimensions such as `32x32`.
- `sizes="any"` indicates that a scalable icon, such as SVG, can be used at any size.

Only list sizes that the image resource actually contains. If one icon file contains multiple sizes, its `sizes` value can list each size.

## Icons for other contexts

A browser tab favicon and an icon for saving a site to a device's home screen serve related but different contexts. Some platforms use a platform-specific link relation for a home-screen icon. For example, `apple-touch-icon` is commonly used for Apple touch devices, but it is not the standard HTML `icon` link type.

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

Add platform-specific icons only when the target platform and deployment need them. A favicon does not replace a descriptive page title. The title remains important in tabs and other browser interface areas where text is shown.

## Where the link belongs

A document icon link belongs in the `<head>`, alongside the title, character encoding, and other document metadata. The link element is a void element, so it has no closing tag and does not wrap the image.

```html
<head>
  <title>Getting started</title>
  <link rel="icon" href="/images/site-icon.png" type="image/png" sizes="48x48">
</head>
```

Do not use an `<img>` in the page body to set the browser tab icon. An image element displays an image as document content. A `<link rel="icon">` describes an icon resource for the current document's browser interface representation.

## Common mistakes

- Putting the icon link in the page body instead of the `<head>`.
- Using `<img>` when the goal is to set the browser's favicon.
- Writing `rel="shortcut icon"`. The `shortcut` token is historical and non-conforming. Use `rel="icon"`.
- Giving `href` a path that works at the site root but fails when the site is served from a subpath.
- Declaring `sizes` that do not match the actual image file.
- Using `sizes="any"` for a fixed-size raster icon. The `any` value is for scalable icons such as SVG.
- Expecting an icon link to set the text shown in the browser tab. Use a meaningful `<title>` for that.
- Assuming every browser or platform uses the same icon relation for every interface context.

## Try it yourself

1. Add a page title and an explicit `rel="icon"` link to a small HTML document.
2. Add a PNG icon with a truthful `sizes` value.
3. If you have a scalable SVG icon, add it as another candidate and use `sizes="any"`.
4. Change the page URL to a nested path and check that the icon `href` still points to the intended file.
5. View the page in a browser and check the tab, then try bookmarking it to see how the browser uses the icon.

## Key points

- Use `<link rel="icon">` in the document `<head>` to associate an icon with the current page.
- The `href` value locates the icon file. Root-relative and document-relative paths resolve differently.
- `type`, `media`, and `sizes` can help browsers choose among icon candidates.
- Declare only sizes that are present in the image. Use `sizes="any"` for scalable vector icons.
- Home-screen icons can use platform-specific conventions, which are distinct from the standard favicon relation.
- Keep a descriptive `<title>` because the icon does not replace the page title.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [47 - Hidden, inert, tabindex, and editable content](47-visibility-and-interaction-attributes.md) | [Q&A](../qnas/48-favicons-and-icons.md) | [Example](../examples/48-favicons-and-icons.md) | [49 - Search and social sharing metadata](49-search-and-social-metadata.md) |
