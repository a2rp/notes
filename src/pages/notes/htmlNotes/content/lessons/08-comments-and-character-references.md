# 08 - Comments, character references, and special characters

HTML source contains markup, reader-facing text, and sometimes notes for developers. Some characters, including < and &, also have special meaning to the HTML parser. This chapter explains how comments and character references let you handle them clearly.

## What you will learn

- Write a valid HTML comment and explain what it does.
- Tell the difference between source markup and text shown to a reader.
- Use named, decimal, and hexadecimal character references.
- Display characters such as <, >, and & safely in text.
- Write quoted attribute values containing special characters.
- Use UTF-8 and directly typed Unicode text appropriately.

## HTML source and displayed text

An HTML file contains markup that the browser parses, along with text that may be displayed to a reader. The less-than sign can begin a tag, and the ampersand can begin a character reference.

When either character should appear as text, write a character reference in the source:

~~~html
<p>5 &lt; 8 and 8 &gt; 5.</p>
~~~

The reader sees: 5 < 8 and 8 > 5.

The browser interprets a character reference. It does not show the source spelling by default. To show the literal spelling of a reference, represent its ampersand with `&amp;`, or put the example in a code sample as in this guide.

## Write HTML comments

A comment is a note in the HTML source. It begins with `<!--` and ends with `-->`:

~~~html
<!-- Main page content starts here. -->
<main>
  <h1>Garden journal</h1>
</main>
~~~

The browser does not show the comment as page text. A reader can inspect source code or developer tools and find it, so never put passwords, private notes, or secrets in a comment.

Comments can explain a section or temporarily mark source while developing:

~~~html
<!-- Contact details -->
<address>
  <a href="mailto:hello@example.com">Email the garden team</a>
</address>
~~~

A comment does not change the meaning of nearby elements. Keep comments brief and useful. They should help someone understand the source, not repeat what the markup already makes obvious.

### Comment rules to remember

- Use one opening `<!--` and one closing `-->`.
- HTML comments cannot be nested. Do not put a complete comment inside another comment.
- Do not put the double-hyphen sequence `--` inside comment text. It can end or confuse the comment.
- A comment is separate markup. Do not insert one in the middle of a tag name or attribute value.
- Comments are not a secure way to hide content. The source is still available.

This comment surrounds markup in the source:

~~~html
<!--
<p>This paragraph is only a source note.</p>
-->
~~~

The paragraph inside the comment is not an active paragraph element. It does not appear on the page.

## Character references

A character reference is a source spelling that tells the HTML parser to insert a character. It starts with an ampersand and ends with a semicolon. Use a reference when a character would otherwise be parsed as markup, or when a reference makes the source clearer.

### Named references

A named reference uses a name known to HTML:

| Source spelling | Character |
| --- | --- |
| `&lt;` | < |
| `&gt;` | > |
| `&amp;` | & |
| `&quot;` | " |
| `&copy;` | © |

Names are case-sensitive. Prefer familiar lowercase forms and include the semicolon.

### Decimal numeric references

A decimal reference uses `&#`, followed by a base-ten number and a semicolon:

~~~html
<p>Copyright &#169; Garden Journal</p>
~~~

The browser displays the character represented by Unicode code point 169, ©.

### Hexadecimal numeric references

A hexadecimal reference uses `&#x`, followed by a hexadecimal number and a semicolon:

~~~html
<p>Copyright &#xA9; Garden Journal</p>
~~~

This also represents ©. The x may be uppercase or lowercase; lowercase x is common in examples.

A numeric reference represents a Unicode code point. It does not choose a font or guarantee that every device has a glyph for that character. The available fonts affect how characters look.

## Display the ampersand itself

The ampersand begins a character reference, so write `&amp;` when the reader should see an ampersand:

~~~html
<p>Tea &amp; coffee</p>
~~~

The browser displays “Tea & coffee”.

This also matters in attribute values. A link to a search page may have multiple query parameters:

~~~html
<a href="search.html?term=tea&amp;page=2">More tea</a>
~~~

The HTML source uses `&amp;` between parameters. The browser interprets it as an ampersand in the URL value.

## Put special characters in quoted attributes

Quote attribute values. If a value contains the quote character used around it, represent that character with a reference:

~~~html
<p title="She said &quot;hello&quot;">A short quotation</p>
~~~

The quote characters represented by `&quot;` are part of the attribute value. They do not end the quoted value early.

With a single-quoted value, represent an apostrophe with `&#39;` or `&apos;`:

~~~html
<p title='It&#39;s a useful note'>Read the note</p>
~~~

Choose the quote style that keeps the source readable. Keep attribute values quoted even when HTML might allow an unquoted value.

## Use real Unicode text

HTML documents are normally saved as UTF-8. You can usually type or paste common characters directly into the file:

~~~html
<p lang="fr">Café, déjà vu, and naïve.</p>
<p>Today is sunny ☀️</p>
~~~

A normal HTML document declares UTF-8 in its head:

~~~html
<head>
  <meta charset="utf-8">
  <title>Garden journal</title>
</head>
~~~

Use a character reference when it makes the source clearer or when a character needs escaping for its context. You do not need to replace every accented letter or symbol with a numeric reference. Direct Unicode text is often easier to read and edit.

A character reference does not repair a file saved with the wrong encoding. The file encoding and the document's encoding declaration should agree.

## Whitespace is not a layout tool

In ordinary HTML text, runs of spaces and line breaks are generally displayed as a single space. Indentation helps people read the source, but it does not create visual columns.

Write separate paragraphs for separate ideas. Use CSS for visual spacing. Do not add repeated spaces or special spacing characters to push text into position.

## Common mistakes

- **Writing a raw < when you mean to show it as text.** Use `&lt;`.
- **Writing a raw & where it may start a reference.** Use `&amp;`.
- **Forgetting the semicolon.** Write the complete reference, such as `&amp;`.
- **Using the wrong case in a named reference.** Names are case-sensitive.
- **Putting the delimiter quote directly inside a quoted attribute value.** Use a reference for that quote.
- **Using comments to hide secrets.** Comments remain visible in the source.
- **Trying to nest comments.** HTML comments do not nest.
- **Using repeated spaces to arrange page content.** Use document structure and CSS.
- **Replacing all Unicode text with numeric references.** UTF-8 lets you use readable characters directly.

## A complete example

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>HTML character examples</title>
  </head>
  <body>
    <!-- A short note for the next person editing this page. -->
    <main>
      <h1>Characters in HTML</h1>
      <p>Use &lt;strong&gt; for text with strong importance.</p>
      <p>Tea &amp; coffee are available.</p>
      <p title="She said &quot;hello&quot;">This title contains quotation marks.</p>
      <p>Copyright &#169; Garden Journal</p>
      <p lang="fr">Café au lait</p>
    </main>
  </body>
</html>
~~~

The comment is in the source but is not displayed as page text. The first paragraph displays literal tag spelling because its angle brackets are represented by character references. The ampersand, quotation marks, copyright sign, and accented text show different ways to include characters.

## Try it yourself

1. Write a comment above a `main` element that describes its purpose.
2. Write a paragraph that displays the literal text `<h1>Welcome</h1>`.
3. Write “Bread & butter” so its ampersand is represented safely in the source.
4. Add a `title` attribute containing `She said "hello".`.
5. Write the copyright sign once as a named reference and once as a decimal numeric reference.
6. Create a page containing a directly typed accented word, and save the file as UTF-8.
7. Add two URL query parameters to an `href` value, with an ampersand between them in the browser's URL.
8. Inspect a page's source and explain why comments should not contain confidential information.

## Key points

- Comments are source notes and do not appear as ordinary page text.
- HTML comments begin with `<!--` and end with `-->`. They do not nest.
- Character references begin with an ampersand and should include a semicolon.
- Use `&lt;`, `&gt;`, and `&amp;` to display markup-significant characters as text.
- Named references and numeric references represent characters.
- UTF-8 supports readable, directly typed Unicode text.
- Use a reference when a quote character is part of a quoted attribute value.
- Use HTML structure for content and CSS for visual spacing.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [07 - Global attributes](07-global-attributes.md) | [Q&A](../qnas/08-comments-and-character-references.md) | [Example](../examples/08-comments-and-character-references.md) | [09 - The head element and page title](09-head-and-title.md) |
