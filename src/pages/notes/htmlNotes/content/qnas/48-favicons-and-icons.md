# 48 - Favicons and document icons: Questions and Answers

Use these questions to review [Chapter 48 - Favicons and document icons](../lessons/48-favicons-and-icons.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. Which markup associates a favicon with the current HTML document?

A. `<img rel="icon" src="/favicon.ico">` in the body

B. `<link rel="icon" href="/favicon.ico">` in the head

C. `<meta name="icon" content="/favicon.ico">` in the body

D. `<title src="/favicon.ico">Page</title>`

**Answer: B.** A `<link>` element with `rel="icon"` identifies an icon resource for the current document. Place it in the `<head>`.

### 2. What does `/icons/site.png` mean as an `href` on a site hosted at a domain?

A. It is relative to the current HTML file's folder

B. It starts at the root of the site

C. It is a path on the visitor's computer

D. It always points to the browser's built-in icons folder

**Answer: B.** A leading slash makes the URL path root-relative. A path such as `icons/site.png` without the slash is relative to the document's URL.

### 3. What does `sizes="any"` indicate for an icon?

A. The icon file contains every bitmap size

B. The icon is scalable, such as an SVG

C. The browser can ignore the icon

D. The icon is intended only for mobile devices

**Answer: B.** `any` is appropriate for scalable images that can be drawn at different sizes.

### 4. Which attributes can help a browser choose among multiple `rel="icon"` candidates?

A. `id`, `class`, and `lang`

B. `type`, `media`, and `sizes`

C. `alt`, `width`, and `height`

D. `target`, `download`, and `ping`

**Answer: B.** Browsers can use an icon's type, media conditions, and available sizes to choose an appropriate candidate.

### 5. If several icon candidates are equally appropriate, which one does the HTML Standard say the browser selects?

A. The first one in the document

B. The last one in tree order when the browser collected the icon list

C. The one with the shortest filename

D. The one with the largest file size

**Answer: B.** When several candidates are equally appropriate, the last declared one in tree order is selected. Browsers can try another suitable candidate if the chosen resource is unusable.

### 6. What is the purpose of `rel="icon"` on a `<link>` element?

A. To show an image at that position in the page body

B. To identify an icon resource representing the current document in browser interfaces

C. To set the text shown in the browser tab

D. To add an icon inside every heading

**Answer: B.** A link icon is browser interface metadata. Use an `<img>` when the image should be visible as page content.

### 7. Which is the conforming modern form for a favicon link?

A. `<link rel="shortcut icon" href="/favicon.ico">`

B. `<link rel="icon" href="/favicon.ico">`

C. `<img rel="icon" src="/favicon.ico">`

D. `<meta rel="icon" href="/favicon.ico">`

**Answer: B.** Use `rel="icon"`. The extra `shortcut` token is historical and non-conforming.

### 8. What is true of `rel="apple-touch-icon"`?

A. It is the standard HTML `icon` link type and replaces every favicon

B. It is a platform-specific, non-standard link relation commonly used for Apple touch icons

C. It changes the page title on Apple devices

D. It is required by all browsers

**Answer: B.** Some platforms use distinct conventions for home-screen icons. This relation is not the standard `icon` link type.

## True or false

### 1. A favicon link should normally be placed in the document's `<head>`.

**Answer: True.** The link supplies metadata about an external icon resource for the current document.

### 2. An `<img>` element in the body is the standard way to set the browser tab icon.

**Answer: False.** `<img>` displays an image as page content. Use `<link rel="icon">` for the browser's document icon.

### 3. The `sizes` attribute should describe sizes that are actually available in the linked icon resource.

**Answer: True.** Do not declare a dimension that the file does not contain.

### 4. The value `sizes="any"` is meant for a fixed-size PNG image.

**Answer: False.** It indicates that a scalable icon, such as SVG, can be drawn at any size.

### 5. The `type` attribute can help the browser decide whether it can use an icon candidate.

**Answer: True.** The media type gives the browser a useful hint about the linked resource.

### 6. Every browser and device uses the same icon relation for every context.

**Answer: False.** Browsers and platforms can use different conventions for browser favicons, bookmarks, and home-screen icons.

### 7. A favicon replaces the document's `<title>` in browser tabs.

**Answer: False.** The icon and title provide different information. Keep the page title descriptive.

### 8. A root-relative URL and a document-relative URL can resolve to different files.

**Answer: True.** `/favicon.ico` starts at the site root, while `icons/favicon.png` is resolved relative to the document URL.

## Short-answer questions

### 1. What does `rel="icon"` communicate?

**Answer:** It identifies the linked resource as an icon representing the current document in user interfaces such as browser tabs or bookmarks.

### 2. Where should a favicon `<link>` be placed?

**Answer:** Place it in the document's `<head>`, alongside the title and other document metadata.

### 3. What does the `sizes` attribute describe?

**Answer:** It lists the icon's available dimensions, such as `32x32`. Use `any` for a scalable image such as SVG.

### 4. How can a browser choose among multiple icon links?

**Answer:** It can use their `type`, `media`, and `sizes` attributes to identify a suitable candidate. If multiple candidates are equally appropriate, the last in tree order is used.

### 5. What is the difference between `/icons/favicon.png` and `icons/favicon.png`?

**Answer:** The first begins at the site's root. The second is resolved relative to the current document URL.

### 6. Why is `rel="shortcut icon"` discouraged?

**Answer:** `shortcut` is a historical, non-conforming token. The modern link relation is simply `rel="icon"`.

### 7. How is a favicon different from an image displayed in the page?

**Answer:** A favicon link provides an icon for browser interface representation of the document. An `<img>` element adds visible image content inside the page.

### 8. Why should a page keep a descriptive `<title>` even when it has a favicon?

**Answer:** The title gives the page a textual name in browser interfaces and document metadata. The icon is a visual symbol and does not provide that title.

## Practical questions

### 1. Correct this markup so it sets a favicon instead of displaying an image in the page.

```html
<body>
  <img rel="icon" src="/icons/site.png">
</body>
```

**Answer:** Put a `<link>` in the `<head>`:

```html
<head>
  <title>Site home</title>
  <link rel="icon" href="/icons/site.png" type="image/png" sizes="32x32">
</head>
```

The link identifies an icon resource, while an image element is for content in the page body.

### 2. Add a scalable SVG favicon and a PNG candidate for 32 by 32 pixels.

**Answer:**

```html
<head>
  <link rel="icon" href="/icons/site.svg" type="image/svg+xml" sizes="any">
  <link rel="icon" href="/icons/site-32.png" type="image/png" sizes="32x32">
</head>
```

The SVG is scalable, so `any` is appropriate. The PNG candidate declares its actual bitmap size.

### 3. The site is served at `https://example.test/notes/lesson.html`. Where do these paths point?

```html
<link rel="icon" href="/favicon.ico">
<link rel="icon" href="icons/page.png">
```

**Answer:** The first path points to `https://example.test/favicon.ico`. The second is relative to the document URL and resolves to `https://example.test/notes/icons/page.png`.

### 4. A developer declares `sizes="64x64"`, but the linked PNG is only 32 by 32 pixels. What should be fixed?

**Answer:** Change the declared size to match the actual file, or link a resource that really contains a 64 by 64 icon.

```html
<link rel="icon" href="/icons/page-32.png" type="image/png" sizes="32x32">
```

The `sizes` attribute should describe available image dimensions, not the size the author hopes the browser will display.

### 5. A page declares three equally suitable icons. Which one is selected according to the HTML Standard?

```html
<link rel="icon" href="/one.png" sizes="32x32" type="image/png">
<link rel="icon" href="/two.png" sizes="32x32" type="image/png">
<link rel="icon" href="/three.png" sizes="32x32" type="image/png">
```

**Answer:** The last equally suitable candidate, `/three.png`, is selected when the browser collects the icon list. If that candidate proves unusable, the browser can try another appropriate candidate.

### 6. A page needs a browser favicon and a separate Apple home-screen icon. Show both links.

**Answer:**

```html
<head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
```

The first uses the standard HTML icon relation. The second uses a platform-specific convention for touch icons.

### 7. A browser tab shows the correct icon, but the page title is vague. What should be improved?

**Answer:** Give the document a descriptive `<title>`.

```html
<head>
  <title>HTML Notes - Chapter 48: Favicons and document icons</title>
  <link rel="icon" href="/favicon.ico">
</head>
```

The icon and title serve separate purposes in browser interfaces.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [47 - Hidden, inert, tabindex, and editable content](47-visibility-and-interaction-attributes.md) | [Lesson](../lessons/48-favicons-and-icons.md) | [Example](../examples/48-favicons-and-icons.md) | [49 - Search and social sharing metadata](49-search-and-social-metadata.md) |