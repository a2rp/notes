# 42 - Language, text direction, and international content: Questions and Answers

Use these questions to review [Chapter 42 - Language, text direction, and international content](../lessons/42-language-and-text-direction.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does the `lang` attribute identify?

A. The country where the page is hosted

B. The language of an element's text

C. The direction in which text is arranged

D. The preferred language of every visitor

**Answer: B.** `lang` identifies the language used by an element's content. It does not translate the text or identify the visitor's language preference.

### 2. Where should the primary language of an HTML page usually be declared?

A. On the `<html>` element

B. Only on the `<title>` element

C. On every word in the document

D. Only in a CSS stylesheet

**Answer: A.** Put the primary language on the root `<html>` element. Descendants inherit it unless a different language is specified.

### 3. Which is an appropriate language tag for English as used in the United States?

A. `lang="US"`

B. `lang="en-US"`

C. `lang="America"`

D. `lang="english-us"`

**Answer: B.** A language tag begins with a language subtag. `en-US` identifies English with a United States regional variety. A country code alone does not identify a language.

### 4. Does `lang="ar"` automatically set the text direction to right to left?

A. Yes, all language tags set direction automatically

B. Yes, but only on the `<html>` element

C. No, language and direction are separate information

D. No, because Arabic is always left to right

**Answer: C.** `lang` identifies language. Use `dir="rtl"` to declare right-to-left direction.

### 5. What does `dir="auto"` do?

A. Translates the text into the browser's language

B. Determines a base direction from strongly directional characters in the text

C. Detects the text's language and sets `lang`

D. Aligns all content to the center

**Answer: B.** `auto` uses text directionality as a clue for the base direction. It does not detect or declare the language.

### 6. Which element can isolate inline text when its direction is unknown?

A. `<bdi>`

B. `<bdo>`

C. `<dir>`

D. `<base>`

**Answer: A.** `<bdi>` isolates embedded text from the direction of surrounding content. It is useful for user-provided names or other text whose direction is unknown.

### 7. When is `<bdo>` appropriate?

A. For every paragraph written in Arabic

B. To provide a text alternative for an image

C. When an intentional direction override is needed

D. To detect the language of text

**Answer: C.** `<bdo>` overrides normal bidirectional text processing. For ordinary RTL text, use `dir="rtl"`; use `<bdi>` to isolate text of unknown direction.

### 8. How should an English phrase be marked inside a right-to-left Arabic paragraph when its direction is known?

A. Use `lang="rtl"`

B. Use `dir="en"`

C. Use `lang="en" dir="ltr"`

D. Use `lang="ltr" dir="en"`

**Answer: C.** The language and direction have separate attributes. `lang="en"` identifies English, while `dir="ltr"` sets its left-to-right direction.

### 9. Which statement about CSS text alignment is correct?

A. `text-align: right` identifies text as Arabic

B. CSS alignment and HTML text direction provide different information

C. `text-align: left` is another way to write `lang="en"`

D. HTML direction is unnecessary when CSS is present

**Answer: B.** Alignment controls visual placement. The `dir` attribute communicates the text's base direction.

### 10. What is a useful way to mark a text area that may contain user text written in either direction?

A. `dir="auto"`

B. `lang="auto"`

C. `dir="both"`

D. `lang="rtl"` on every text area

**Answer: A.** `dir="auto"` lets the browser determine a base direction from the entered text. It does not set or detect the text's language.

## True or false

### 1. A page should usually declare its primary language on its root `<html>` element.

**Answer: True.** This gives browsers and assistive technologies a language declaration for the document, including its head content.

### 2. `lang="US"` is the correct way to declare United States English.

**Answer: False.** Use a language tag such as `en-US`. A region code alone is not a language tag for English.

### 3. Descendants generally inherit a language declaration from an ancestor unless another language is set.

**Answer: True.** This lets an author declare the main language once and mark only the passages where it changes.

### 4. The `lang` attribute determines whether text flows left to right or right to left.

**Answer: False.** `lang` identifies language. Set text direction separately with the `dir` attribute when needed.

### 5. `dir="auto"` detects a language such as Arabic or English.

**Answer: False.** It chooses a base text direction from directional characters. It does not identify the language.

### 6. `<bdi>` can help keep an unknown-direction name from affecting punctuation around it.

**Answer: True.** It isolates the embedded text from its surroundings in the bidirectional algorithm.

### 7. `<bdo>` should be used for all ordinary right-to-left text.

**Answer: False.** Use `dir="rtl"` for normal RTL text. `<bdo>` is for intentional overrides of the normal bidirectional algorithm.

### 8. `text-align: right` and `dir="rtl"` communicate the same information.

**Answer: False.** Text alignment controls visual placement, while `dir` describes base text direction.

## Short-answer questions

### 1. What is the difference between `lang` and `dir`?

**Answer:** `lang` identifies the language of text, such as `en` or `ar`. `dir` sets the base direction, such as `ltr` or `rtl`. One does not automatically determine the other.

### 2. Why declare a language on the root `<html>` element?

**Answer:** It declares the primary language for the page, and descendants inherit it unless another language is specified. Assistive technologies and other tools can use the information to process the text appropriately.

### 3. How do you mark a phrase in a different language from the rest of its paragraph?

**Answer:** Add the appropriate `lang` value to an element around the phrase, for example `<span lang="es">buenos días</span>` inside an English paragraph.

### 4. What does `dir="auto"` determine, and what does it not determine?

**Answer:** It determines a base direction from strongly directional characters in the text. It does not detect the language, and it may be unsuitable if unknown text begins with a name or other characters that suggest a different direction.

### 5. When should you use `<bdi>`?

**Answer:** Use it for inline text whose direction is not known in advance and that appears within surrounding text, such as a username in a results sentence. It isolates the embedded text from the surrounding direction.

### 6. What is the difference between `dir="rtl"` and `<bdo dir="rtl">`?

**Answer:** `dir="rtl"` sets a right-to-left base direction and lets the bidirectional algorithm handle mixed text. `<bdo dir="rtl">` overrides the normal direction processing for the enclosed text.

### 7. Why should right alignment in CSS not be used as a substitute for `dir="rtl"`?

**Answer:** Right alignment controls where a text block appears visually. It does not tell the browser that the text's base direction is right to left, which affects the ordering of text and punctuation.

### 8. Give an example of a valid language tag with a language and region subtag.

**Answer:** `en-GB` identifies English as used in Great Britain, and `en-US` identifies English as used in the United States. The region adds detail to a language tag.

## Practical questions

### 1. Add an appropriate language tag to this document. The page is written in English.

~~~html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Garden notes</title>
  </head>
  <body>
    <h1>Garden notes</h1>
  </body>
</html>
~~~

**Answer:**

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Garden notes</title>
  </head>
  <body>
    <h1>Garden notes</h1>
  </body>
</html>
~~~

The root element declares the page's primary language, which its child elements inherit.

### 2. Mark the Spanish phrase in this English paragraph.

~~~html
<p>Our host welcomed us with the words buenos días.</p>
~~~

**Answer:**

~~~html
<p>Our host welcomed us with the words <span lang="es">buenos días</span>.</p>
~~~

The `lang` attribute identifies just the part whose language differs from the surrounding English text.

### 3. Correct this language tag. The content is United States English.

~~~html
<html lang="US">
~~~

**Answer:**

~~~html
<html lang="en-US">
~~~

The tag includes the language subtag `en` and the regional subtag `US`.

### 4. Declare that this page is in Arabic and is read from right to left.

~~~html
<html>
~~~

**Answer:**

~~~html
<html lang="ar" dir="rtl">
~~~

`lang` identifies Arabic and `dir` sets the text direction. They serve distinct purposes.

### 5. Mark the English link inside this Arabic paragraph with its language and direction.

~~~html
<p lang="ar" dir="rtl">
  يمكنك زيارة صفحة <a href="/en/">English information</a>.
</p>
~~~

**Answer:**

~~~html
<p lang="ar" dir="rtl">
  يمكنك زيارة صفحة <a href="/en/" lang="en" dir="ltr">English information</a>.
</p>
~~~

The link content is English and left to right, so both attributes are added to the link.

### 6. Mark up this text area for comments that may be entered in either direction.

~~~html
<label for="comment">Comment</label>
<textarea id="comment" name="comment"></textarea>
~~~

**Answer:**

~~~html
<label for="comment">Comment</label>
<textarea id="comment" name="comment" dir="auto"></textarea>
~~~

The browser can use the text to determine a base direction. This does not declare the comment's language.

### 7. Isolate each user name in this results list because its direction is not known in advance.

~~~html
<ul>
  <li>Jamie Green: 1st place</li>
  <li>سما: 2nd place</li>
</ul>
~~~

**Answer:**

~~~html
<ul>
  <li><bdi>Jamie Green</bdi>: 1st place</li>
  <li><bdi>سما</bdi>: 2nd place</li>
</ul>
~~~

`<bdi>` isolates each name so its direction does not disrupt the surrounding punctuation and result text.

### 8. Mark the title as English and left to right inside this Arabic paragraph.

~~~html
<p lang="ar" dir="rtl">
  العنوان هو The Little Prince.
</p>
~~~

**Answer:**

~~~html
<p lang="ar" dir="rtl">
  العنوان هو <cite lang="en" dir="ltr">The Little Prince</cite>.
</p>
~~~

The semantic `<cite>` element contains the title. Its attributes identify the language and direction of that title.

### 9. The layout uses CSS to right-align an Arabic paragraph. Add the HTML information that describes its language and direction.

~~~html
<p class="right-aligned">مرحبا بالعالم</p>
~~~

**Answer:**

~~~html
<p class="right-aligned" lang="ar" dir="rtl">مرحبا بالعالم</p>
~~~

CSS can continue to control visual alignment, but `lang` and `dir` describe the content and its direction.

### 10. This comment can be written in English, Arabic, or another language. Mark its direction without claiming a specific language.

~~~html
<p class="comment">هذا تعليق من مستخدم.</p>
~~~

**Answer:**

~~~html
<p class="comment" dir="auto">هذا تعليق من مستخدم.</p>
~~~

`dir="auto"` determines a base direction from the comment's text. Do not add a `lang` value unless the language is known.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [41 - ARIA in HTML: when and how to use it](41-aria-in-html.md) | [Lesson](../lessons/42-language-and-text-direction.md) | [Example](../examples/42-language-and-text-direction.md) | [43 - Details and summary](43-details-and-summary.md) |