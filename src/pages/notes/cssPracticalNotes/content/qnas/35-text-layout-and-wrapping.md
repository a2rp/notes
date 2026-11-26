# 35 - Text layout, spacing, and wrapping - Q&A

These questions review alignment, whitespace, long strings, hyphenation, spacing, and wrapping. Each answer and its explanation follow the question.

## Multiple-choice questions

### 1. What does `white-space: nowrap` do?

- A. Preserves newlines and allows wrapping
- B. Collapses whitespace and prevents wrapping
- C. Preserves every space and newline
- D. Adds space between words

**Answer: B. It collapses whitespace and prevents wrapping.**

**Explanation:** `nowrap` behaves like normal text with whitespace collapsing, but lines do not wrap at ordinary opportunities.

### 2. Which declaration is appropriate for a long URL that might overflow a card?

- A. `overflow-wrap: anywhere`
- B. `text-align: justify`
- C. `white-space: nowrap`
- D. `letter-spacing: 2em`

**Answer: A. `overflow-wrap: anywhere`.**

**Explanation:** It lets the browser break a long unbroken string at an emergency opportunity when needed to prevent overflow.

### 3. Which value aligns text with the start edge of its writing direction?

- A. `left`
- B. `right`
- C. `start`
- D. `justify`

**Answer: C. `start`.**

**Explanation:** `start` follows the current writing direction, so it can align to the right in a right-to-left context.

### 4. Which `white-space` value preserves source line breaks, collapses repeated spaces, and still allows wrapping?

- A. `pre`
- B. `pre-line`
- C. `nowrap`
- D. `normal`

**Answer: B. `pre-line`.**

**Explanation:** `pre-line` preserves line breaks but collapses repeated spaces and allows wrapping.

### 5. What does `text-wrap: balance` help with?

- A. Making all words uppercase
- B. Balancing lines in a short block such as a heading
- C. Preventing all text from wrapping
- D. Increasing the space between words

**Answer: B. Balancing lines in a short block such as a heading.**

**Explanation:** Balanced wrapping can make short headings look more even. It does not replace a sensible width or size.

### 6. What does `hyphens: auto` need in order to choose language-appropriate break points?

- A. A known language for the text
- B. A fixed width in pixels
- C. `white-space: nowrap`
- D. A monospace font

**Answer: A. A known language for the text.**

**Explanation:** Set the correct HTML `lang` attribute. The actual hyphenation behavior also depends on browser language resources.

### 7. What is the risk of applying `word-break: break-all` to ordinary paragraphs?

- A. It prevents all line breaks
- B. It can split words at awkward character boundaries
- C. It converts the text to uppercase
- D. It adds an ellipsis

**Answer: B. It can split words at awkward character boundaries.**

**Explanation:** Use normal language-aware breaking for prose. Use an emergency wrapping rule on content such as long identifiers when necessary.

### 8. Which values are most adaptable when text alignment should follow text direction?

- A. `left` and `right`
- B. `start` and `end`
- C. `center` and `justify`
- D. `top` and `bottom`

**Answer: B. `start` and `end`.**

**Explanation:** These logical alignment values follow the writing direction rather than a fixed physical side.

## True or false

### 9. The default `white-space: normal` behavior allows text to wrap at ordinary opportunities.

**Answer: True.**

**Explanation:** Normal flow collapses repeated whitespace and lets lines wrap when needed.

### 10. `white-space: pre` preserves source spaces and line breaks, and always wraps long lines.

**Answer: False.**

**Explanation:** `pre` preserves whitespace and forced line breaks, but does not allow ordinary wrapping. Long lines can overflow.

### 11. `text-align: start` always means align left.

**Answer: False.**

**Explanation:** It means align to the start side of the current writing direction. In a right-to-left context, that can be the right side.

### 12. `text-indent` indents the first line of a block.

**Answer: True.**

**Explanation:** It does not add spacing before the whole element. Margins are used to separate entire blocks.

### 13. `text-overflow: ellipsis` by itself guarantees that long text is clipped and shown with an ellipsis.

**Answer: False.**

**Explanation:** A common single-line pattern also uses `overflow: hidden` and `white-space: nowrap`. The clipped text should remain available when it contains important information.

## Short-answer questions

### 14. Explain the difference between `overflow-wrap: anywhere` and `word-break: break-all`.

**Answer:** `overflow-wrap: anywhere` allows emergency breaks when an otherwise unbreakable string would overflow. `word-break: break-all` can break text at character boundaries much more readily.

**Explanation:** Use the least aggressive behavior that solves the problem. Long prose should keep normal word breaks.

### 15. Why should a document have a correct `lang` attribute?

**Answer:** It tells the browser and assistive technologies what language the text uses and can affect language-sensitive line breaking and hyphenation.

**Explanation:** A passage in a different language can have its own `lang` attribute.

### 16. What is the difference between `pre-wrap` and `pre-line`?

**Answer:** Both preserve source line breaks and allow wrapping. `pre-wrap` also preserves repeated spaces, while `pre-line` collapses repeated spaces.

**Explanation:** Choose based on whether repeated spaces are meaningful, such as in user-entered or formatted content.

### 17. Why can justified text be difficult to read in a narrow column?

**Answer:** The browser may stretch spaces unevenly to fill each line, creating distracting gaps.

**Explanation:** Check real paragraphs and line lengths. Start alignment is often more comfortable for narrow reading columns.

### 18. When should you use `text-wrap: balance`?

**Answer:** It is useful for short text blocks such as headings where a very short final line looks awkward.

**Explanation:** It is not a substitute for an appropriate heading width, font size, or responsive layout. Check the result in supported browsers.

### 19. What is the difference between letter spacing and word spacing?

**Answer:** `letter-spacing` adjusts space between typographic characters. `word-spacing` adjusts spaces between words.

**Explanation:** Large changes to either can make text difficult to recognize. Character shaping and spacing conventions also vary by writing system.

## Debugging questions

### 20. Why does this text overflow a narrow card?

~~~css
.url {
  white-space: nowrap;
}
~~~

**Answer:** `nowrap` prevents the URL from wrapping. If it is wider than the card, it can overflow.

**Fix:**

~~~css
.url {
  white-space: normal;
  overflow-wrap: anywhere;
}
~~~

**Explanation:** Allow ordinary wrapping first, then permit emergency breaks for the long string.

### 21. Why are multiple spaces in this message reduced to one?

~~~css
.message {
  white-space: normal;
}
~~~

**Answer:** Normal whitespace processing collapses consecutive spaces.

**Fix:** If the user-entered spacing and line breaks should be preserved while allowing wrapping, use:

~~~css
.message {
  white-space: pre-wrap;
}
~~~

**Explanation:** Choose a whitespace mode based on the meaning of the source whitespace.

### 22. Why does automatic hyphenation not appear here?

~~~css
.article {
  hyphens: auto;
}
~~~

**Answer:** The browser may not know the text's language, or it may not have hyphenation resources for that language.

**Fix:**

~~~html
<html lang="en">
~~~

**Explanation:** Also confirm that the browser supports hyphenation for the language and text being used.

### 23. Why does the final part of this label disappear without an ellipsis?

~~~css
.label {
  text-overflow: ellipsis;
}
~~~

**Answer:** `text-overflow` does not by itself create the clipped single-line layout.

**Fix:**

~~~css
.label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
~~~

**Explanation:** This pattern clips visible text. Do not use it to hide required instructions or values without a way to access the full text.

## Coding questions

### 24. Write CSS so a long user-provided identifier can wrap without changing the normal behavior of other paragraphs.

**Answer:**

~~~css
.user-identifier {
  overflow-wrap: anywhere;
}
~~~

**Explanation:** Apply the emergency break behavior to the content likely to contain long unbroken strings, rather than to all prose.

### 25. Write a responsive heading rule with logical start alignment and balanced wrapping.

**Answer:**

~~~css
.page-title {
  max-width: 18ch;
  margin-inline: auto;
  text-align: start;
  text-wrap: balance;
}
~~~

**Explanation:** The logical alignment follows text direction. A readable maximum width gives the browser a useful block to balance.

### 26. Preserve line breaks from a visitor's message while allowing it to fit a small screen.

**Answer:**

~~~css
.visitor-message {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
~~~

**Explanation:** `pre-wrap` preserves spaces and source line breaks while allowing wrapping. `overflow-wrap` handles unusually long unbroken content.

### 27. Create a justified article with the last line aligned to the start edge.

**Answer:**

~~~css
.article {
  text-align: justify;
  text-align-last: start;
}
~~~

**Explanation:** Review the paragraph at the actual column width and with the intended language. Justification can create uneven word spacing, especially in narrow columns.

## Key takeaways

- `white-space` controls whitespace collapsing, line-break preservation, and wrapping.
- Keep normal word-breaking behavior for prose and use emergency breaks for exceptional long strings.
- Logical text alignment follows writing direction.
- Automatic hyphenation depends on language information and browser resources.
- Spacing and justification can affect readability, so inspect real text.
- Ellipsis truncates visible content and must not hide information users need.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [34 - Fonts and typography](../lessons/34-fonts-and-typography.md) | [Q&A](35-text-layout-and-wrapping.md) | [Example](../examples/35-text-layout-and-wrapping.md) | [36 - Lists and markers](../lessons/36-lists-and-markers.md) |
