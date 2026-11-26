# 42 - Language, text direction, and international content

A web page can contain several languages and writing directions. HTML provides `lang` to identify language and `dir` to set text direction. These attributes help browsers and assistive technologies process text correctly, especially when left-to-right and right-to-left content appear together.

## What you will learn

- How to declare the page language with `lang`
- How language tags such as `en`, `en-GB`, and `ar` work
- How to mark a phrase whose language differs from its surrounding text
- How `dir="ltr"`, `dir="rtl"`, and `dir="auto"` affect direction
- How to isolate mixed-direction text with `<bdi>`
- When `<bdo>` is appropriate for an intentional direction override
- Why language and direction are related but separate pieces of information

## Identify the document language with `lang`

The `lang` global attribute identifies the language of an element's text. Put the primary language of the page on the root `<html>` element:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Community garden</title>
  </head>
  <body>
    <h1>Community garden</h1>
    <p>Learn how to grow vegetables in a small space.</p>
  </body>
</html>
~~~

Use a valid language tag. Common examples include:

| Tag | Language or variety |
| --- | --- |
| `en` | English |
| `en-GB` | English as used in Great Britain |
| `en-US` | English as used in the United States |
| `es` | Spanish |
| `hi` | Hindi |
| `ar` | Arabic |
| `ar-EG` | Arabic as used in Egypt |

A language tag can include subtags when the extra detail is useful. Use a tag that accurately describes the content. A region is not itself a language: for example, use `en-US` for United States English, not `US`.

The language declaration does not translate the page. It gives software information about the language already used in the content. Browsers, screen readers, speech tools, spell-checkers, and other software can use the information in different ways.

## Mark a passage in another language

Language information generally inherits from an element's ancestors. If most of a page is English but one phrase is Spanish, mark the phrase where the language changes:

~~~html
<p>At the end of the walk, our guide said <span lang="es">buenos días</span>.</p>
~~~

A semantic element can carry the language attribute too:

~~~html
<p>The French greeting <q lang="fr">bonjour</q> means hello.</p>
~~~

When a whole section uses another language, mark the containing element rather than repeating the same attribute on every child:

~~~html
<section lang="fr">
  <h2>Le jardin</h2>
  <p>Les tomates poussent mieux au soleil.</p>
</section>
~~~

If a passage returns to the surrounding language, it will inherit the language from the surrounding element. Add a new `lang` value only when the content changes language again.

Use `lang` for the language of the text, not for the reader's preferred language, the country where a page is published, or the writing direction. A page can mention a country without being written in that country's language.

## Understand language tags

Language tags follow the BCP 47 format. In everyday HTML, a short language subtag is often enough:

~~~html
<html lang="en">
~~~

Add a region or other subtag when it is relevant to the words or conventions in the content:

~~~html
<p lang="pt-BR">Olá, tudo bem?</p>
<p lang="pt-PT">Olá, tudo bem?</p>
~~~

Do not invent tags or use a country code alone. If you are unsure which tag to use, check the language tag guidance or registry linked in Further reading.

The value of `lang` is not case-sensitive, but a common convention is lowercase for the language and uppercase for a two-letter region, as in `en-GB`. Use one language tag for a given attribute value.

## Set text direction with `dir`

The `dir` global attribute sets the base direction of text. It accepts three values:

| Value | Meaning | Typical use |
| --- | --- | --- |
| `ltr` | Left to right | English, Hindi, and many other scripts |
| `rtl` | Right to left | Arabic, Hebrew, and other right-to-left scripts |
| `auto` | Determine direction from the text | Text whose direction is unknown, such as user-entered content |

The value is inherited by descendants unless a more specific element sets its own direction.

For a right-to-left page, set direction on `<html>` and identify its language separately:

~~~html
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <title>معلومات عن الحديقة</title>
  </head>
  <body>
    <h1>معلومات عن الحديقة</h1>
    <p>تزرع الحديقة الخضروات والأعشاب.</p>
  </body>
</html>
~~~

`lang="ar"` says the content is Arabic. `dir="rtl"` says its base direction is right to left. They provide different information, so do not expect one to determine the other automatically.

For left-to-right content in a right-to-left page, set direction on the relevant passage:

~~~html
<p dir="rtl" lang="ar">
  يمكنك زيارة صفحة <a href="/en/" lang="en" dir="ltr">English information</a>.
</p>
~~~

The `dir` attribute expresses the direction of the text as content information. It is preferable to relying on a CSS `direction` rule alone, which may not be available when styles are disabled or changed.

## Use `dir="auto"` when direction is unknown

For text whose direction is not known in advance, `dir="auto"` lets the browser determine a base direction from the first strongly directional character in the text:

~~~html
<p dir="auto">This is a comment written in English.</p>
<p dir="auto">هذا تعليق مكتوب باللغة العربية.</p>
~~~

This is automatic direction detection, not language detection. The browser does not decide which language a person is using. For example, a comment that begins with a Latin username and then continues in Arabic may get a left-to-right base direction. If the direction is known, set `ltr` or `rtl` explicitly.

`dir="auto"` can be useful on editable controls when people may enter text in different directions:

~~~html
<label for="comment">Comment</label>
<textarea id="comment" name="comment" dir="auto" rows="4"></textarea>
~~~

Do not apply `dir="auto"` to a large container just because it contains mixed languages. Apply it to the specific text whose direction is unknown.

## Isolate unknown inline text with `<bdi>`

Mixed-direction text can cause nearby punctuation or numbers to appear in an unexpected order. This is especially likely when a page inserts a name or other text whose direction is unknown into a sentence.

Use `<bdi>` to isolate that text from its surroundings:

~~~html
<ul>
  <li><bdi>Jamie Green</bdi>: 1st place</li>
  <li><bdi>سما</bdi>: 2nd place</li>
</ul>
~~~

The element keeps the embedded text's direction from affecting the surrounding sentence, and the surrounding direction from affecting the embedded text. By default, `<bdi>` determines direction from its own content, like `dir="auto"`.

Use `<bdi>` for inline content whose direction is not known, such as a person's name loaded from user data. If the direction is known, a semantic element or `<span>` with an explicit `dir` can be used instead:

~~~html
<p dir="rtl" lang="ar">
  العنوان هو <cite lang="en" dir="ltr">The Little Prince</cite>.
</p>
~~~

Include the punctuation that belongs to the phrase inside its element. Punctuation outside the element follows the direction of its surrounding text.

## Use `<bdo>` only for an intentional override

`<bdo>` means bidirectional override. It forces the direction of its text, overriding the Unicode bidirectional algorithm's normal handling:

~~~html
<p><bdo dir="rtl">This text is deliberately displayed right to left.</bdo></p>
~~~

This is different from using `dir="rtl"` on an ordinary element. `dir="rtl"` sets the base direction and allows the bidirectional algorithm to lay out mixed-direction text. `<bdo dir="rtl">` overrides the normal direction processing for the enclosed text.

Most pages do not need `<bdo>`. Use it only when an exact direction override is intentional. For ordinary Arabic or Hebrew content, use `lang` and `dir`. For unknown inline text mixed with surrounding content, use `<bdi>`.

## Keep language, direction, and layout distinct

These attributes answer different questions:

| Markup | Question answered |
| --- | --- |
| `lang="fr"` | What language is this text? |
| `dir="rtl"` | What is the base direction of this text? |
| CSS text alignment | Where should the text block sit visually? |

A language does not always determine direction. A language may be written using different scripts, and a single paragraph can contain multiple directions. Similarly, aligning text to the right with CSS does not identify it as right-to-left text.

For international content, declare the language and direction that actually apply to each part. Use semantic HTML and the `dir` attribute to describe content. Use CSS for visual design and alignment.

## Common mistakes

### Omitting the page language

Without a language declaration, assistive technologies may use an unsuitable pronunciation. Add a valid `lang` value to the root `<html>` element and mark passages that use another language.

### Treating language and direction as the same thing

`lang` identifies a language. `dir` sets a text direction. A page may need both, and the value of one does not automatically set the other.

### Using a country code as a language

`lang="US"` does not mean United States English. Use an appropriate language tag such as `lang="en-US"`.

### Assuming `dir="auto"` detects language

`auto` chooses a base text direction from characters in the text. It does not recognize whether the text is Arabic, Hebrew, English, or another language.

### Using CSS alignment instead of text direction

`text-align: right` changes visual alignment. It does not give the browser the same direction information as `dir="rtl"`.

### Using `<bdo>` for normal right-to-left text

An override can disrupt how mixed-direction text is ordered. Use `dir="rtl"` for normal right-to-left text, and reserve `<bdo>` for cases that genuinely require a forced override.

### Letting unknown inline text affect punctuation

A name or comment from user data can have a different direction from its surrounding sentence. Wrap unknown inline text in `<bdi>` so the bidirectional algorithm can isolate it.

## Try it yourself

1. Add the correct primary `lang` value to a complete HTML page.
2. Add a Spanish phrase to an English paragraph and mark the phrase with `lang="es"`.
3. Create a short Arabic page and set both its language and direction on `<html>`.
4. Place an English link inside an Arabic paragraph and set the link's language and direction.
5. Display a list of names that may be written in different scripts. Wrap each unknown name in `<bdi>`.
6. Add `dir="auto"` to a text area that accepts comments in either direction.
7. Compare `dir="rtl"` and `dir="auto"` using one known Arabic sentence and one mixed-direction user comment.
8. Find any `lang="US"` or `lang="UK"` values in an example page and replace them with valid language tags.
9. Check whether any CSS alignment rule is being used where HTML text direction should be declared.
10. Read a bilingual page aloud with a screen reader and confirm that language changes are identified correctly.

## Key points

- Use `lang` to identify the language of the document or a passage.
- Use valid BCP 47 language tags such as `en`, `en-GB`, `hi`, and `ar`.
- Language information is inherited, so mark a local language change on the smallest suitable element.
- Use `dir` to set the text's base direction independently of its language.
- Use `dir="auto"` when the direction of user-provided text is not known, but remember that it does not detect language.
- Use `<bdi>` to isolate unknown inline text in a mixed-direction sentence.
- Reserve `<bdo>` for deliberate direction overrides.
- Use HTML language and direction information for meaning, and CSS for visual presentation.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [41 - ARIA in HTML: when and how to use it](41-aria-in-html.md) | [Q&A](../qnas/42-language-and-text-direction.md) | [Example](../examples/42-language-and-text-direction.md) | [43 - Details and summary](43-details-and-summary.md) |