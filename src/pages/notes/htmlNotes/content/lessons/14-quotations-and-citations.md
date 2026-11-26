# 14 - Quotations and citations

HTML provides elements for marking quotations and the titles of works. These elements describe how text relates to its source. They do not verify a quotation, create a complete reference, or automatically show readers where the quote came from.

## What you will learn

- When to use `blockquote` for a longer quotation.
- When to use `q` for an inline quotation.
- How the `cite` element differs from a `cite` attribute.
- How to provide a visible attribution and a link to a source.
- Common mistakes when marking quotations and citations.

## Longer quotations with blockquote

Use `blockquote` for a section of text quoted from another source. It can contain paragraphs and other flow content.

~~~html
<blockquote>
  <p>Clear examples help readers understand how an idea works.</p>
</blockquote>
~~~

The element marks the quoted section. Browsers commonly display it indented, but that default appearance is not the reason to choose it. Do not use `blockquote` just to indent content or display a callout that is not a quotation.

### Keep attribution outside the quotation

The attribution is not part of the quoted words, so place it after the `blockquote`. A `figure` and `figcaption` can group a quotation with its visible attribution:

~~~html
<figure>
  <blockquote>
    <p>Clear examples help readers understand how an idea works.</p>
  </blockquote>
  <figcaption>
    From <cite>Learning the Web</cite>, by A. Writer
  </figcaption>
</figure>
~~~

Here, `blockquote` contains only the quoted words. The `figcaption` identifies the work and its author. The author is plain text because a person's name is not a work title.

Use a real, accurate source attribution when publishing a quotation. HTML marks up the content; it does not establish who said it or whether the words are exact.

## Inline quotations with q

Use `q` for a short quotation within a sentence:

~~~html
<p>The guide describes HTML as <q>the structure of a web page</q>.</p>
~~~

Browsers typically add quotation marks around the contents of `q`. Do not add a second pair of quote marks around the element. The rendered punctuation can vary by language and browser.

Use `q` only when the text is actually quoted from a source. Quotation marks used to name a word or signal irony are not quotations and do not need `q`.

~~~html
<p>The word "simple" can mean different things to different readers.</p>
~~~

Plain quotation punctuation is also valid HTML for ordinary quotations. Using `q` is optional. Choose it when its meaning is useful in your markup.

## The cite element marks a work title

Use `cite` around the title of a work that is being mentioned or cited. A work might be a book, article, poem, film, song, game, or other creative work.

~~~html
<p>I found the explanation in <cite>Learning the Web</cite>.</p>
~~~

The `cite` element marks the work's title. It is not for a person's name, a quotation itself, or every part of a bibliographic reference.

~~~html
<p><cite>Learning the Web</cite> by A. Writer, chapter 2.</p>
~~~

In this example, the title is inside `cite`; the author's name and chapter number remain ordinary text. A browser's default italic styling is only presentation.

## The cite attribute points to a source

The `cite` attribute is different from the `cite` element. It can be used on `blockquote` or `q` to provide a URL for the source of the quotation:

~~~html
<blockquote cite="https://example.com/sources/learning-web">
  <p>Clear examples help readers understand how an idea works.</p>
</blockquote>
~~~

The `cite` attribute does not display a citation link for readers. It is source information attached to the quotation. If readers need to visit or verify the source, add a visible link too:

~~~html
<p>
  Source:
  <a href="https://example.com/sources/learning-web">Learning the Web, chapter 2</a>
</p>
~~~

A source address in `cite` does not replace a visible attribution. Use both when both machine-readable source information and reader-facing source details are useful.

## A complete quotation with source details

This example marks the quote, names its work, identifies the author, and links to a source page:

~~~html
<figure>
  <blockquote cite="https://example.com/sources/learning-web">
    <p>Clear examples help readers understand how an idea works.</p>
  </blockquote>
  <figcaption>
    From <cite>Learning the Web</cite>, by A. Writer.
    <a href="https://example.com/sources/learning-web">Read the source</a>
  </figcaption>
</figure>
~~~

The example URL uses the reserved example.com domain. Replace it with the real source URL when using a quotation in your own work.

## Common mistakes

- Using `blockquote` only because its default style is indented.
- Putting the author's name inside `cite` instead of the title of the work.
- Wrapping a quotation in `cite` instead of using `q` or `blockquote`.
- Assuming the `cite` attribute creates a visible, clickable source link.
- Putting the attribution inside the `blockquote` as if it were part of the quote.
- Adding another pair of quotation marks around a `q` element.
- Using `q` for a word in quotation marks that is not quoted from another source.
- Treating HTML citation markup as proof that a quotation or attribution is accurate.

## Try it yourself

1. Mark a two-sentence quotation from a source using `blockquote`.
2. Add a `figcaption` after the quote with the title of the work and the author's name.
3. Mark a short quoted phrase inside a paragraph using `q`.
4. Put the title of a book or article inside `cite`, then write the author's name outside it.
5. Add a `cite` URL to a quotation and a separate visible link readers can follow.
6. Explain why an indented notice that is not a quotation should not use `blockquote`.

## Key points

- `blockquote` marks a quoted section; `q` marks an inline quotation.
- Attribution belongs outside the quoted words.
- `cite` marks the title of a work, not its author's name or the quotation itself.
- The `cite` attribute supplies a source URL, but does not create a visible link.
- Add a visible source link when readers need to access the source.
- HTML markup does not verify that a quote or attribution is accurate.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [13 - Code, abbreviations, dates, and machine-readable text](13-specialized-text-elements.md) | [Q&A](../qnas/14-quotations-and-citations.md) | [Example](../examples/14-quotations-and-citations.md) | [15 - Links and the anchor element](15-links.md) |
