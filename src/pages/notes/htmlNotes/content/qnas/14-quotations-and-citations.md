# 14 - Quotations and citations: Questions and Answers

Practice questions for [Lesson 14 - Quotations and citations](../lessons/14-quotations-and-citations.md). Each question is followed by its answer and an explanation or worked example where useful. Other examples can also be correct when they mark the content accurately.

## Multiple-choice questions

### 1. What does blockquote represent?

- A. A section quoted from another source.
- B. Any content that should be indented.
- C. A title of a book.
- D. A clickable source link.

**Answer: A.** Blockquote marks a quoted section. Its default indentation is presentation, not its meaning.

### 2. When is q appropriate?

- A. For a short quotation within a sentence.
- B. For every word surrounded by quotation marks.
- C. To mark a person's name.
- D. To create a link to the source.

**Answer: A.** Q marks an inline quotation. It should represent words actually quoted from a source.

### 3. What does the cite element mark?

- A. The author's name.
- B. The title of a work.
- C. Any text inside a quotation.
- D. A URL that readers can click.

**Answer: B.** Cite marks a work's title, such as the title of a book or article.

### 4. What does the cite attribute on a blockquote or q provide?

- A. A source URL associated with the quotation.
- B. A visible hyperlink automatically added to the page.
- C. The title of the quoted work.
- D. The author's name.

**Answer: A.** The cite attribute records a source URL. Add an ordinary visible link if readers need to open it.

### 5. Where should the attribution for a blockquote go?

- A. Inside the quote as if it were part of the source's words.
- B. Outside the blockquote.
- C. Inside a cite attribute only.
- D. In the opening quotation mark.

**Answer: B.** The attribution is not part of the quoted words, so put it outside the blockquote.

### 6. Which markup correctly marks a work title and its author?

- A. <cite>Learning the Web by A. Writer</cite>
- B. <cite>Learning the Web</cite> by A. Writer
- C. <blockquote>A. Writer</blockquote>
- D. <q>A. Writer</q>

**Answer: B.** Cite marks only the title of the work. The author's name remains ordinary text.

### 7. Which is a suitable use for figure and figcaption with a quotation?

- A. To associate the quotation with its attribution or caption.
- B. To execute the quotation.
- C. To turn the quotation into a hyperlink automatically.
- D. To replace the blockquote element.

**Answer: A.** Figure can group related content, and figcaption can provide its visible attribution.

### 8. What should you do if readers need to open the source of a quotation?

- A. Use only the cite attribute.
- B. Add a visible anchor link to the source.
- C. Put the URL in the blockquote text without an anchor.
- D. Put the URL inside the cite element.

**Answer: B.** A cite attribute is not a visible clickable link. Use an anchor with an href when readers should visit the source.

### 9. What does the cite element not do?

- A. Mark the title of a work.
- B. Provide semantic meaning for a work title.
- C. Verify that a quotation is exact and accurately attributed.
- D. Appear in a citation.

**Answer: C.** Markup describes content; it cannot verify the truth or accuracy of a quotation.

### 10. Is q required for every quotation?

- A. Yes, otherwise the quotation is invalid HTML.
- B. No, ordinary quotation punctuation is also valid; q is optional.
- C. Yes, but only inside a blockquote.
- D. No, because q is obsolete.

**Answer: B.** Q is useful semantic markup for inline quotations, but using ordinary quotation punctuation is also correct.

## True or false

### 1. Blockquote should be used for any content that needs indentation.

**Answer: False.** Use blockquote for a section quoted from a source. Use CSS for visual indentation of other content.

### 2. Q marks an inline quotation from another source.

**Answer: True.** Q represents phrasing content quoted from a source.

### 3. A cite element should contain the name of the person who wrote a book.

**Answer: False.** Cite marks the title of the work. Write the person's name outside the cite element.

### 4. The cite attribute automatically creates a visible, clickable source link.

**Answer: False.** It provides source information in markup. Add an anchor for a visible link.

### 5. Attribution is part of the text inside a blockquote.

**Answer: False.** The attribution is separate from the quoted words and belongs outside the blockquote.

### 6. Browsers typically display quotation marks around q content.

**Answer: True.** User agents commonly render quotation punctuation for q. Avoid adding a duplicate pair of quotation marks around it.

### 7. Q is appropriate for a word placed in quotation marks just to name or discuss that word.

**Answer: False.** Q marks a quotation from a source, not every use of quotation punctuation.

### 8. A visible source link can help readers who want to check a quotation.

**Answer: True.** A link gives readers a direct way to visit the source page.

### 9. Figure and figcaption can group a quotation with its attribution.

**Answer: True.** This is a useful structure when the caption describes the quotation.

### 10. HTML citation markup proves the author really said the quoted words.

**Answer: False.** HTML expresses relationships in the document. It cannot authenticate a source or prove a quote is accurate.

## Fill in the blanks

### 1. Use ______ for a quoted section that stands apart from the surrounding text.

**Answer: blockquote.** It represents a section quoted from another source.

### 2. Use ______ for a short quotation within a sentence.

**Answer: q.** It represents inline quoted content.

### 3. Use the ______ element around the title of a cited work.

**Answer: cite.** It marks a work title, not the author's name or the quotation.

### 4. The ______ attribute can store a URL for the source of a quotation.

**Answer: cite.** The attribute is source information and does not itself create a visible link.

### 5. Place quotation attribution ______ the blockquote element.

**Answer: outside.** Attribution is not part of the source's quoted words.

### 6. Add an ______ element with an href when readers should be able to open a source.

**Answer: a.** An anchor creates a visible hyperlink when it has an href.

### 7. The ______ element can group a quotation and its caption.

**Answer: figure.** A figure can contain related content and a figcaption.

### 8. The cite element marks a work's ______, not its author's name.

**Answer: title.** For example, put the book title inside cite and write the author after it.

## Short-answer questions

### 1. Explain the difference between blockquote and q.

**Answer:** Blockquote represents a quoted section that stands apart from surrounding content. Q represents a short quotation within phrasing content, such as a sentence.

### 2. Explain the difference between the cite element and the cite attribute.

**Answer:** The cite element marks the title of a work. The cite attribute supplies a source URL for a quotation on elements such as blockquote or q. The attribute does not create a visible hyperlink.

### 3. Why should a blockquote's attribution be outside the quoted text?

**Answer:** The attribution identifies the source or speaker but is not part of the words being quoted. Keeping it outside prevents it from appearing to be part of the quotation.

### 4. When might you use figure and figcaption around a quotation?

**Answer:** Use them when a quotation and its caption or attribution form a related unit. Put the quoted words in blockquote and put the work title, author, or other attribution in figcaption.

### 5. Should q be used for every phrase surrounded by quotation marks? Explain.

**Answer:** No. Q is for content quoted from a source. Quotation marks used to name a word, indicate irony, or serve another punctuation purpose do not need q.

### 6. How can you make a quotation's source available to readers?

**Answer:** Add a visible anchor with an href pointing to the source. A cite attribute can also record the source URL in markup, but it is not a reader-facing link.

### 7. What does the cite element contribute to a title?

**Answer:** It semantically identifies the text as the title of a work. Its typical italic appearance is only a browser default and can be styled separately.

### 8. Can blockquote or cite verify that a quotation is exact? Why?

**Answer:** No. These elements mark content and its relationship to a source. Accuracy depends on checking the source itself.

## Practical and coding questions

### 1. Mark this longer quotation as a block quotation: “Useful examples make unfamiliar ideas easier to follow.”

**Answer:**

~~~html
<blockquote>
  <p>Useful examples make unfamiliar ideas easier to follow.</p>
</blockquote>
~~~

Blockquote marks the quoted section. The quotation is in a paragraph inside it.

### 2. Mark an inline quotation in a sentence without adding duplicate quotation marks.

**Answer:**

~~~html
<p>The guide calls the example <q>a useful starting point</q>.</p>
~~~

Q identifies the quoted phrase. Browsers typically provide the quotation punctuation.

### 3. Mark the title of a book and name its author.

**Answer:**

~~~html
<p><cite>Learning the Web</cite> by A. Writer.</p>
~~~

Cite contains the work title. The author's name remains outside the element.

### 4. Group a quotation and visible attribution in a figure.

**Answer:**

~~~html
<figure>
  <blockquote>
    <p>Useful examples make unfamiliar ideas easier to follow.</p>
  </blockquote>
  <figcaption>From <cite>Learning the Web</cite>, by A. Writer.</figcaption>
</figure>
~~~

The caption identifies the source without including the attribution in the quoted words.

### 5. Add source information to a blockquote and provide a visible link for readers.

**Answer:**

~~~html
<blockquote cite="https://example.com/sources/learning-web">
  <p>Useful examples make unfamiliar ideas easier to follow.</p>
</blockquote>
<p>Source: <a href="https://example.com/sources/learning-web">Learning the Web</a>.</p>
~~~

The cite attribute records the source URL. The anchor provides the visible link. Replace the example.com address with the actual source.

### 6. Correct this markup so the work title is marked, the author's name is not, and the attribution is outside the quote.

~~~html
<blockquote>
  <p>Useful examples help.</p>
  <p><cite>A. Writer</cite></p>
</blockquote>
~~~

**Answer:**

~~~html
<figure>
  <blockquote>
    <p>Useful examples help.</p>
  </blockquote>
  <figcaption>From <cite>Learning the Web</cite>, by A. Writer.</figcaption>
</figure>
~~~

The original marked a person's name as a work title and placed attribution inside the quotation. The corrected markup fixes both.

### 7. A page discusses the word “clear” and uses quotation marks around it. Should the word be marked with q? Show suitable markup.

**Answer:** No. The word is being discussed, not quoted from a source.

~~~html
<p>The word "clear" can have several meanings.</p>
~~~

Ordinary punctuation is enough for this use.

### 8. Mark an inline quote with a cite attribute and add the work title and a source link.

**Answer:**

~~~html
<p>
  The article <cite>Learning with Examples</cite> says
  <q cite="https://example.com/articles/learning-examples">examples support understanding</q>.
  <a href="https://example.com/articles/learning-examples">Read the article</a>.
</p>
~~~

The cite element marks the article title, q marks the quoted words, the cite attribute stores the source URL, and the anchor makes the source available to readers.

## Related lesson

- [Lesson 14 - Quotations and citations](../lessons/14-quotations-and-citations.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [13 - Code, abbreviations, dates, and machine-readable text](13-specialized-text-elements.md) | [Lesson](../lessons/14-quotations-and-citations.md) | [Example](../examples/14-quotations-and-citations.md) | [15 - Links and the anchor element](15-links.md) |
