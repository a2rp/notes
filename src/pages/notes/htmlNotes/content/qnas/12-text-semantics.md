# 12 - Text semantics: emphasis, importance, and meaning: Questions and Answers

Practice questions for [Lesson 12 - Text semantics: emphasis, importance, and meaning](../lessons/12-text-semantics.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What does the em element represent?

- A. Stress emphasis.
- B. A page heading.
- C. A smaller font size.
- D. A spelling correction.

**Answer: A.** Use em when stress emphasis affects how a phrase should be understood.

### 2. What does the strong element represent?

- A. Text that must be italic.
- B. Strong importance, seriousness, or urgency.
- C. A technical term.
- D. A line break.

**Answer: B.** Strong marks content with greater importance. Its usual bold style is only a default presentation.

### 3. Which element is appropriate for an important safety warning?

- A. b
- B. strong
- C. span
- D. small

**Answer: B.** Strong marks importance or seriousness. B draws attention without adding importance.

### 4. What does b represent?

- A. A span of text receiving attention without added importance or an alternate voice.
- B. A phrase with the strongest urgency.
- C. A technical term only.
- D. A page title.

**Answer: A.** B can draw attention to useful text, such as a product name, without claiming that it is especially important.

### 5. Which is a suitable use for i?

- A. Marking every phrase that needs italic styling.
- B. Marking a technical term set apart from the surrounding prose.
- C. Marking a paragraph as important.
- D. Making text a heading.

**Answer: B.** I can mark a technical term or text in an alternate voice or mood. It does not simply mean “make this italic”.

### 6. What is a suitable use for mark?

- A. Highlighting text relevant to the current context.
- B. Making every important warning bold.
- C. Marking a document title.
- D. Creating a link.

**Answer: A.** Mark can identify a phrase that is relevant in context, such as a search match.

### 7. What does small represent?

- A. Any text that should be tiny.
- B. Side comments or fine print.
- C. Text that is no longer accurate.
- D. A subsection heading.

**Answer: B.** Small marks side comments or fine print, not just any text that should appear in a smaller font.

### 8. What does s mark?

- A. Text that is no longer accurate or relevant.
- B. Any sentence with stress emphasis.
- C. A misspelled word.
- D. A search match.

**Answer: A.** S identifies information that is no longer accurate or relevant, such as an old price.

### 9. What is the purpose of span?

- A. It always makes text bold.
- B. It is a generic inline container with no meaning by itself.
- C. It marks a warning.
- D. It identifies the page title.

**Answer: B.** Use span to group inline content when no more meaningful HTML element fits.

### 10. What should you do if you only want text to look bold?

- A. Choose strong, regardless of meaning.
- B. Choose b, regardless of meaning.
- C. Use CSS for appearance and choose HTML based on meaning.
- D. Use h1.

**Answer: C.** HTML elements communicate meaning. CSS is for changing appearance.

## Objective questions

### True or false

### 1. The em element marks stress emphasis.

**Answer: True.** The stress can change how the sentence is understood.

### 2. The strong element simply means “display this in bold”.

**Answer: False.** It marks importance, seriousness, or urgency. Bold is only a common default style.

### 3. B and strong have identical meanings.

**Answer: False.** B draws attention without conveying extra importance. Strong marks importance or seriousness.

### 4. I should be used for every phrase that a designer wants displayed in italics.

**Answer: False.** Use it only when its semantic meaning fits, such as for a technical term or alternate voice. Use CSS for purely visual italics.

### 5. Mark can identify text relevant to the current context.

**Answer: True.** A search result may use mark for matching words.

### 6. Small means any content that should be less important.

**Answer: False.** Small marks side comments or fine print. It does not determine a reader's importance judgment.

### 7. S is a general replacement for the element used to mark deleted edits.

**Answer: False.** S indicates text that is no longer accurate or relevant. Del has a different meaning for deleted content.

### 8. U is a general way to underline ordinary words.

**Answer: False.** U has a specific annotation meaning. Underlining is also commonly understood as a link.

### 9. Span adds a semantic meaning to the text it contains.

**Answer: False.** Span is a generic inline container and has no meaning by itself.

### 10. CSS can change how a semantic element looks without changing the element's meaning.

**Answer: True.** Keep the appropriate HTML meaning and style it separately.

## Fill in the blanks

### 1. The ________ element marks stress emphasis.

**Answer: em.** Use it when stress changes how a phrase should be understood.

### 2. The ________ element marks strong importance or seriousness.

**Answer: strong.** It is not simply a request for bold styling.

### 3. The ________ element draws attention without adding importance.

**Answer: b.** Use it only when its attention-drawing meaning fits.

### 4. The ________ element can mark a technical term or text in an alternate voice.

**Answer: i.** It does not mean only “make this italic”.

### 5. The ________ element highlights text relevant to the current context.

**Answer: mark.** For example, it can identify a search match.

### 6. The ________ element marks side comments or fine print.

**Answer: small.** It should not be chosen just to make text tiny.

### 7. The ________ element marks information that is no longer accurate or relevant.

**Answer: s.** An old price is a common example.

### 8. The ________ element is a generic inline container with no meaning by itself.

**Answer: span.** Use it when no more meaningful element fits.

## Short-answer questions

### 1. Explain the difference between em and strong.

**Answer:** Em marks stress emphasis. Strong marks importance, seriousness, or urgency.

**Explanation:** A sentence can use either or both, depending on what its words mean.

### 2. How are b and strong different?

**Answer:** B draws attention to text without saying it is more important. Strong identifies text that carries strong importance or seriousness.

### 3. When might mark be appropriate?

**Answer:** When text is highlighted because it is relevant in the current context, such as words that match a reader's search.

### 4. What is the difference between s and del?

**Answer:** S marks information that is no longer accurate or relevant. Del marks content that has been deleted from a document or revision.

### 5. Why should u be used carefully?

**Answer:** It has a specific annotation meaning, and its common underline style can be confused with a link. Do not use it for ordinary underline styling.

### 6. When is span appropriate?

**Answer:** Use span to group inline text when no element with a more specific meaning fits. It can provide a hook for another tool, but it has no meaning by itself.

## Practical HTML questions

### 1. Add stress emphasis to the word “fresh” in this sentence.

**Answer:**

~~~html
<p>I wanted <em>fresh</em> basil, not dried basil.</p>
~~~

**Explanation:** Em marks the word that receives stress.

### 2. Mark a safety warning as important.

**Answer:**

~~~html
<p><strong>Warning:</strong> Keep the treatment away from children.</p>
~~~

**Explanation:** Strong marks the warning's importance.

### 3. Mark both the importance of a sentence and stress on the word “before”.

**Answer:**

~~~html
<p><strong>Read the directions <em>before</em> using the product.</strong></p>
~~~

**Explanation:** Strong marks the sentence's importance. Em marks stress on one word.

### 4. Mark a matching phrase in a search result.

**Answer:**

~~~html
<p>Results for <mark>container gardening</mark> in small spaces.</p>
~~~

**Explanation:** Mark identifies the matching words as relevant to the current search.

### 5. Show an old price and a current price.

**Answer:**

~~~html
<p>Old price: <s>$12</s>. Current price: $8.</p>
~~~

**Explanation:** S marks the price that is no longer accurate.

### 6. Add a fine-print copyright note after a paragraph.

**Answer:**

~~~html
<p>Explore the herb garden.</p>
<p><small>Copyright 2026 Garden Journal.</small></p>
~~~

**Explanation:** Small marks the side note. It is not being used just to shrink ordinary content.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [11 - Headings and paragraphs](11-headings-and-paragraphs.md) | [Lesson](../lessons/12-text-semantics.md) | [Example](../examples/12-text-semantics.md) | [13 - Code, abbreviations, dates, and machine-readable text](13-specialized-text-elements.md) |
