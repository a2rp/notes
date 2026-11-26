# 52 - Deprecated elements and obsolete HTML: Questions and Answers

Use these questions to review [Chapter 52 - Deprecated elements and obsolete HTML](../lessons/52-obsolete-html.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What should replace the font element when it was only used to change text color or size?

A. The center element

B. A CSS rule applied to meaningful HTML

C. A larger heading element in every case

D. The marquee element

**Answer: B.** HTML should describe content and CSS should control visual appearance. Choose a heading only when the content is actually a heading.

### 2. What is the modern HTML element for an abbreviation or acronym?

A. acronym

B. abbr

C. big

D. tt

**Answer: B.** The abbr element represents an abbreviation or acronym and can provide an expansion.

### 3. Which elements are suitable for an unordered list of files?

A. dir and font

B. ul and li

C. frame and frameset

D. center and big

**Answer: B.** Use ul for an unordered list and li for each list item.

### 4. Which element is appropriate for text that is no longer accurate or relevant, such as an expired price?

A. s

B. del in every case

C. center

D. acronym

**Answer: A.** The s element represents content that is no longer accurate or relevant. Use del when content has been removed from a document.

### 5. Why should a new page avoid an obsolete element even if a browser still displays it?

A. Browser display proves it is the newest HTML.

B. It may be non-conforming, unclear in meaning, or difficult to maintain.

C. It always prevents a page from loading.

D. It is required for accessibility.

**Answer: B.** Browsers keep compatibility with older pages, but display alone does not mean the markup is conforming or suitable for new work.

## True or false

### 1. If a browser still renders an old element, authors should use it in new pages.

**Answer: False.** Compatibility rendering is not a recommendation. Use current HTML and CSS.

### 2. The acronym element should be replaced by abbr.

**Answer: True.** The abbr element represents abbreviations and acronyms.

### 3. Every use of strike should be changed to del.

**Answer: False.** Use s for content that is no longer accurate or relevant, del for removed content, and CSS when the line is purely visual.

### 4. An iframe is a direct replacement for a frameset page layout.

**Answer: False.** An iframe embeds a separate document within a page. Use normal document structure and CSS for the page's own layout.

### 5. Old presentational attributes such as align and bgcolor should generally be replaced with CSS.

**Answer: True.** Keep HTML focused on structure and meaning, and put presentation in CSS.

## Short-answer questions

### 1. What is the difference between obsolete and obsolete-but-conforming features?

**Answer:** The HTML standard lists obsolete features that authors should not use. Some are non-conforming, while some are still allowed for compatibility but may trigger validator warnings. Neither category is a good choice for new pages.

### 2. Why is browser rendering not enough to decide whether an element is appropriate?

**Answer:** Browsers often preserve behavior so older pages continue to display. That compatibility does not mean the markup conforms to current HTML or communicates content meaning clearly.

### 3. When should s be used instead of del?

**Answer:** Use s when information is no longer accurate or relevant, such as an expired offer. Use del when content has been removed as part of a document edit.

### 4. What should replace a presentational element such as center?

**Answer:** Choose HTML elements based on the content's meaning, then use CSS for alignment and appearance. Do not choose a heading or section merely to get a visual effect.

### 5. How is iframe different from frame and frameset?

**Answer:** frame and frameset belong to an obsolete page-layout system. iframe embeds a separate document within the current page. It is not a one-for-one replacement for an old frameset layout.

## Practical questions

### 1. Rewrite this as a meaningful page heading. The text is the page's main title, and its old color and size were only visual choices.

~~~html
<center><font color="navy" size="+2">Garden Notes</font></center>
~~~

**Answer:**

~~~html
<h1>Garden Notes</h1>
~~~

The h1 expresses that the text is the main heading. Visual appearance belongs in CSS.

### 2. Replace the obsolete acronym element and provide the abbreviation's expansion.

~~~html
<p>We are learning <acronym>HTML</acronym>.</p>
~~~

**Answer:**

~~~html
<p>
  We are learning
  <abbr title="HyperText Markup Language">HTML</abbr>.
</p>
~~~

The abbr element marks the abbreviation. Its title gives the expansion.

### 3. Mark up an expired price of $25 that has been replaced by a current price of $18.

**Answer:**

~~~html
<p>Old price: <s>$25</s>. Current price: $18.</p>
~~~

The old price is no longer accurate, so s is appropriate.

### 4. Mark up a sentence removed during editing and its replacement.

**Answer:**

~~~html
<p>
  Revised schedule:
  <del>Doors open at 6:00 p.m.</del>
  <ins>Doors open at 6:30 p.m.</ins>
</p>
~~~

del marks removed content and ins marks inserted content. This communicates an edit, not just a visual line.

### 5. Replace this directory-style list with current list markup.

~~~html
<dir>
  <li>Chapter one</li>
  <li>Chapter two</li>
</dir>
~~~

**Answer:**

~~~html
<ul>
  <li>Chapter one</li>
  <li>Chapter two</li>
</ul>
~~~

Use ul and li for an unordered list.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [51 - Safe links and embedded content](51-html-safety.md) | [Lesson](../lessons/52-obsolete-html.md) | [Example](../examples/52-obsolete-html.md) | [53 - Validate and debug HTML](53-validation-and-debugging.md) |