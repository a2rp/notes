# 04 - Doctype and browser rendering modes

A short declaration at the top of an HTML file affects how a browser interprets the page. In this chapter, you will learn what the doctype does, why modern pages use `<!doctype html>`, and how browser rendering modes are connected to old web pages.

## What you will learn

By the end of this chapter, you should be able to:

- Write the correct HTML doctype declaration.
- Explain the difference between standards mode and quirks mode.
- Describe why old doctype declarations should not be copied into a new page.
- Check that the doctype appears at the start of a document.

## What is a doctype?

A doctype is a declaration that appears before the root `<html>` element. For a modern HTML document, write:

~~~html
<!doctype html>
<html lang="en">
...
</html>
~~~

The doctype is not an HTML element. It has no start tag, end tag, or content. It is a document preamble that helps the browser choose how to interpret and render the page.

Place it at the beginning of the file. Starting the document this way makes the intended mode clear to browsers and to anyone reading the source.

## The modern HTML doctype

The correct short form is:

~~~html
<!doctype html>
~~~

There is no version number in it. Do not write forms such as `<!doctype html5>` or `<!doctype html version="5">`. The declaration tells the browser to use the modern standards mode. It does not select a particular browser or a numbered HTML edition.

HTML keywords are case-insensitive, so uppercase letters also work:

~~~html
<!DOCTYPE html>
~~~

For consistent beginner notes, use the lowercase form throughout this guide.

## Browser rendering modes

Browsers have modes that preserve compatibility with older pages. The three names used by the HTML Standard are:

- **No-quirks mode**, commonly called standards mode. The browser follows modern standards behavior.
- **Quirks mode**, which imitates selected behaviors from older browsers so some old pages continue to work.
- **Limited-quirks mode**, which applies a smaller set of legacy behavior for certain old doctypes.

For a new page, use `<!doctype html>` to select no-quirks mode. This gives the document a predictable modern starting point.

Quirks mode exists because the web contains pages written before modern standards were widely followed. Some older pages depend on browser behavior that was never intended for new work. Browsers keep compatibility behavior so those pages do not all break at once.

A browser can still display a page when the doctype is missing or incorrect. The page may look fine if it is very simple, but the browser can use quirks mode and interpret some layout behavior differently. Include the doctype even when the page appears to work without it.

## Why rendering mode matters

Rendering mode affects how the browser handles certain older layout rules. A page made for quirks mode can be laid out differently in standards mode, and a modern page without the correct doctype can behave differently from what its author expects.

This difference can be hard to notice on a page containing only a heading and a paragraph. It becomes more important when a page uses layout, sizing, or other browser features. The important habit is simple: begin every new HTML document with `<!doctype html>`.

The doctype does not:

- Add visible text to the page.
- Replace the `<html>`, `<head>`, or `<body>` elements.
- Choose which browser opens the file.
- Guarantee that every browser displays the page identically.
- Turn an old page into a newer version of HTML by itself.

It sets the document up to use standards behavior. The rest of the HTML still needs to be written correctly.

## Common doctype mistakes

### Leaving it out

A page can still appear in a browser without a doctype, but it may be placed in quirks mode:

~~~html
<html lang="en">
<head>
  <title>Page without a doctype</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
~~~

Add the doctype before the root element:

~~~html
<!doctype html>
<html lang="en">
...
</html>
~~~

### Putting it after the html element

This is in the wrong place:

~~~html
<html lang="en">
<!doctype html>
<head>
...
</head>
</html>
~~~

The doctype belongs before the `<html>` element, not inside it.

### Using an old declaration

Older tutorials may show long declarations with public identifiers, such as doctypes for older HTML or XHTML standards. These declarations exist for compatibility with legacy content. Do not copy one into a new HTML page. Use the short modern form:

~~~html
<!doctype html>
~~~

### Treating the doctype as a tag

Do not write an end tag for the doctype:

~~~html
<!doctype html></!doctype>
~~~

The declaration is complete on its own. Continue with the root element:

~~~html
<!doctype html>
<html lang="en">
...
</html>
~~~

## A complete document with the correct doctype

Here is the starter page from the previous chapter. Notice that the doctype is the first line and the document elements follow it:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>A page in standards mode</title>
</head>
<body>
  <h1>My HTML page</h1>
  <p>This document starts with the modern HTML doctype.</p>
</body>
</html>
~~~

If you are unsure whether a page has the correct doctype, inspect the beginning of its source. The first declaration should be `<!doctype html>`, followed by the `<html>` element.

## Try it yourself

1. Create a new file named `doctype-practice.html`.
2. Add the complete document from this chapter.
3. Save and open it in a browser.
4. Check the first line of the source and confirm that it says `<!doctype html>`.
5. Temporarily remove the doctype, save the file, and reopen it. A simple page may look similar, so do not use appearance alone to decide the mode.
6. Restore the doctype and explain in your own words why new pages should include it.
7. Find an old HTML tutorial that uses a long doctype. Rewrite only the doctype using the modern short form.

## Key points

- Write `<!doctype html>` at the beginning of every new HTML document.
- The doctype is a declaration, not an HTML element.
- The modern short doctype selects no-quirks mode, also called standards mode.
- Quirks and limited-quirks modes exist for compatibility with some older pages.
- A browser may display a page with a missing doctype, but the page can use legacy rendering behavior.
- A simple page can look similar in different modes, so keep the correct doctype instead of relying on appearance.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [03 - The basic HTML document](03-basic-html-document.md) | [Q&A](../qnas/04-doctype-and-rendering-modes.md) | [Example](../examples/04-doctype-and-rendering-modes.md) | [05 - Elements, tags, and attributes](05-elements-tags-and-attributes.md) |
