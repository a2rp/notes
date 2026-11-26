# 52 - Deprecated elements and obsolete HTML

Older HTML examples may use elements and attributes that are no longer recommended or no longer conform to the HTML standard. A browser may still render some of them for compatibility, but that does not make them a good choice for new pages.

This chapter shows how to recognize common legacy markup and replace it with meaningful HTML. The goal is not to memorize every old tag. Learn to identify whether the original markup expressed meaning, presentation, or an outdated page structure.

## Obsolete does not always mean invisible

The HTML standard identifies obsolete features that authors should not use. Some are non-conforming, while others are kept as obsolete-but-conforming for compatibility and may still trigger a validator warning.

Browsers have long supported older documents, so a legacy element can appear to work. But rendering is not the same as being conforming, accessible, or maintainable. Use current HTML elements for meaning, and use CSS for presentation.

## Common obsolete elements and better replacements

| Old element | What authors often used it for | Better approach |
| --- | --- | --- |
| `font` | Choosing text color, face, or size | Use ordinary text and CSS for appearance. |
| `center` | Centering a block or its text | Use meaningful structure and CSS for alignment. |
| `big` | Making text larger | Use a real heading when the text is a heading, or CSS for appearance. |
| `strike` | Drawing a line through text | Use `s` when information is no longer accurate, or `del` when content has been removed. |
| `tt` | Showing monospaced text | Use `code`, `kbd`, `samp`, or `var` when one describes the content; use CSS for appearance alone. |
| `acronym` | Marking an abbreviation | Use `abbr`. |
| `dir` | Making a directory-style list | Use `ul` and `li` for an unordered list. |
| `frame`, `frameset`, `noframes` | Building a page from separate framed regions | Use normal document structure. Use `iframe` only to embed a separate document within a page. |
| `marquee` | Scrolling text across the page | Prefer static text. Moving content can distract readers and should not be added without a strong need and an accessible way to control it. |

The replacement depends on what the content means. Do not mechanically swap one tag for another without checking the purpose.

## Replace visual-only markup

The `font` and `center` elements describe presentation rather than the role of the content. For example:

~~~html
<center>
  <font color="navy" size="+2">Garden Notes</font>
</center>
~~~

Write the content with an element that matches its meaning:

~~~html
<h1>Garden Notes</h1>
~~~

A heading is appropriate if this text is the page's main heading. If it is just a short label in a paragraph, keep it in the paragraph instead. Apply visual appearance with CSS, rather than choosing an HTML element because of how a browser happens to display it.

The same principle applies to obsolete presentational attributes such as `align`, `bgcolor`, and old spacing or border attributes. Put presentation rules in CSS, and keep HTML focused on structure and meaning.

## Choose the replacement by meaning

Some old elements carry a little more meaning than their appearance suggests.

### Text with a line through it

Do not replace every `strike` with the same element. Choose based on the message:

- Use `s` for content that is no longer accurate or relevant, such as an expired price.
- Use `del` for content that has been removed from a document, such as a revised sentence.
- If a line is purely decorative and communicates no change in meaning, use CSS for that presentation.

~~~html
<p>Old price: <s>$25</s>. Current price: $18.</p>

<p>
  Revised schedule:
  <del>Doors open at 6:00 p.m.</del>
  <ins>Doors open at 6:30 p.m.</ins>
</p>
~~~

The line itself is not the meaning. The text and its context determine which element is appropriate.

### Abbreviations and acronyms

Use `abbr` for abbreviations and acronyms. Its `title` attribute may provide the expansion:

~~~html
<p>
  The <abbr title="HyperText Markup Language">HTML</abbr> page has a main heading.
</p>
~~~

Use the expansion only when it is useful to the reader. Do not use `title` as a place for unrelated notes.

### Code-like text

Choose an element based on what the text represents:

~~~html
<p>Use the <code>src</code> attribute to provide an image URL.</p>
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save the file.</p>
<p>The program prints <samp>Saved</samp> when it finishes.</p>
<p>The value <var>count</var> stores the number of items.</p>
~~~

Use `pre` with `code` when showing a block of source code. If text only needs a different font, keep the semantic element accurate and let CSS control its appearance.

## Replace obsolete page structures

The old `frameset` system split a browser window into independently scrolling regions. It also used `frame` and `noframes`. It is not a current way to build a page layout.

Use regular HTML sections for the page's own content. Use CSS to arrange those sections. An `iframe` has a different purpose: it embeds a separate document inside the current page. It is not a direct replacement for an entire frameset layout.

Likewise, use a normal list for directory contents:

~~~html
<ul>
  <li><a href="chapter-one.html">Chapter one</a></li>
  <li><a href="chapter-two.html">Chapter two</a></li>
</ul>
~~~

Avoid replacing obsolete tags with generic `div` elements unless a generic container is genuinely appropriate. Prefer elements such as `main`, `nav`, `section`, headings, and lists when they describe the content accurately.

## Legacy attributes need review too

Old pages can use outdated attributes even when the element itself is still current. Presentational examples include `align` on headings or divisions, and `bgcolor` on a body, table, or cell.

Move presentation to CSS. While updating, preserve the actual meaning and behavior of the page:

- An old table used for layout may need to become ordinary sections and lists.
- A data table should remain a table, with proper headers.
- An old alignment attribute does not tell you whether the content should be a heading, paragraph, or navigation area.
- An old background color does not describe the content.

Do not remove an attribute only because it looks old. Check the standard and confirm that the attribute has no current semantic or functional purpose.

## A careful migration process

When updating an old page:

1. Identify each obsolete element and attribute.
2. Work out what the content means, not just how it looks.
3. Choose current semantic HTML for that meaning.
4. Move visual choices to CSS.
5. Preserve useful text, links, and functionality.
6. Check that headings, lists, forms, and tables still have the right structure.
7. Validate the updated document and review any warnings.

A conforming validator can help find old markup, but it cannot decide the intended meaning of the content for you. Some obsolete-but-conforming features may be reported as warnings, while non-conforming features are errors. Read the report and make a deliberate replacement.

## Common mistakes

- Assuming an element is current because a browser still displays it.
- Replacing every old element with `div` without considering meaning.
- Using a heading only to make text larger.
- Replacing every strikethrough with `del` even when nothing was deleted.
- Using `iframe` as if it were the same as a frameset page layout.
- Removing an old attribute without checking whether it controls behavior or meaning.
- Treating a validator as a substitute for understanding what the content is meant to communicate.

## Try it yourself

1. Replace a `font` element with ordinary semantic content and identify which visual choices belong in CSS.
2. Decide whether a heading should remain a heading after removing an old `center` or `big` element.
3. Replace an `acronym` with `abbr` and provide a useful expansion.
4. Choose between `s` and `del` for an expired price and a sentence removed during editing.
5. Replace a `dir` list with `ul` and `li`.
6. Inspect an old `frameset` example and describe which parts should become page sections and which, if any, should be embedded documents.
7. Run a validator on an old page and group its findings into obsolete elements, obsolete attributes, and unrelated errors.
8. Explain why a browser rendering an old tag does not prove that new pages should use it.

## Key points

- Browser support for a legacy feature does not mean authors should use it.
- Obsolete markup may still display, but can be non-conforming or produce warnings.
- Choose replacement elements according to meaning, not just appearance.
- Use CSS for presentation and semantic HTML for document structure.
- The purpose of the content determines whether `s`, `del`, `abbr`, `code`, or another element fits.
- Use `iframe` to embed a separate document, not to recreate an old frameset layout.
- Validate migrated pages and review warnings as well as errors.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [51 - Safe links and embedded content](51-html-safety.md) | [Q&A](../qnas/52-obsolete-html.md) | [Example](../examples/52-obsolete-html.md) | [53 - Validate and debug HTML](53-validation-and-debugging.md) |