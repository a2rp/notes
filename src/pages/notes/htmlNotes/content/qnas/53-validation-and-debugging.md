# 53 - Validate and debug HTML: Questions and Answers

Use these questions to review [Chapter 53 - Validate and debug HTML](../lessons/53-validation-and-debugging.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does an HTML validator primarily check?

A. Whether a page is visually attractive

B. Whether the markup conforms to HTML requirements

C. Whether every visitor understands the text

D. Whether the page ranks highly in search

**Answer: B.** A validator checks markup conformance. It cannot decide every question of meaning, usability, or accessibility.

### 2. Why can invalid HTML still appear in a browser?

A. Browsers never parse HTML.

B. Browsers try to recover from many markup errors.

C. Invalid elements are always hidden.

D. A browser automatically fixes the source file.

**Answer: B.** Browsers build a document despite many mistakes, but the resulting DOM may differ from what the author intended. Recovery does not edit the source file.

### 3. Which tool shows the browser's current document tree?

A. The DOM inspector in browser developer tools

B. A text editor's word count

C. The HTML file name

D. A search result preview

**Answer: A.** The Elements or Inspector panel shows the parsed live DOM, which may include parser corrections or script changes.

### 4. What is a useful response to a long list of validator errors?

A. Ignore the whole report.

B. Fix many unrelated lines at once.

C. Start with the first relevant error, make a small fix, and validate again.

D. Remove the document body.

**Answer: C.** One malformed structure can cause follow-up messages. Fixing and rechecking in small steps helps reveal the actual cause.

### 5. Does a page with no validator errors automatically meet accessibility needs?

A. Yes, the validator checks every accessibility issue.

B. No, a validator cannot judge all meaning and usability.

C. Yes, if the page uses headings.

D. No, because HTML cannot be checked.

**Answer: B.** Validation is useful, but human review is still needed for clear text, appropriate alternatives, keyboard use, and other accessibility concerns.

## True or false

### 1. A browser rendering a page proves that its HTML conforms to the standard.

**Answer: False.** Browsers often recover from errors to display a page.

### 2. The Nu Html Checker can check pasted markup or an uploaded HTML file.

**Answer: True.** It can also check the URL of a publicly available page.

### 3. The DOM shown in developer tools is always identical to the source file.

**Answer: False.** The parser can repair markup, scripts can alter the DOM, and developer tools can make temporary edits.

### 4. Fixing one early markup error may remove several later validator messages.

**Answer: True.** Some later messages are consequences of a malformed element or nesting problem earlier in the source.

### 5. Zero validation errors proves that a page is useful, accessible, and visually correct.

**Answer: False.** A checker can find many conformance problems, but cannot assess every aspect of meaning, design, accessibility, or behavior.

## Short-answer questions

### 1. What does an HTML validator do?

**Answer:** It checks a document against HTML conformance requirements and reports issues with likely locations and explanations.

### 2. What is the difference between View Source and the DOM inspector?

**Answer:** View Source shows the original markup sent or loaded as a document. The DOM inspector shows the browser's current parsed document, which may have parser repairs or changes made by scripts.

### 3. Why should errors be fixed and checked in small steps?

**Answer:** A single structural mistake can cause several messages. Fixing the first relevant issue and checking again helps separate the root cause from follow-up errors.

### 4. Why should private markup not be pasted into a public online validator?

**Answer:** The markup may contain sensitive information. Use an approved local tool or remove private content before sending it to a public service.

### 5. What should you review after the validator reports no errors?

**Answer:** Review the page's meaning and behavior. Check headings, link text, form labels, image alternatives, keyboard use, and whether the real source produces the expected result.

## Practical questions

### 1. Fix the element closing order in this fragment.

~~~html
<p><strong>Important text</p></strong>
~~~

**Answer:**

~~~html
<p><strong>Important text</strong></p>
~~~

Nested elements should close in reverse order from how they opened.

### 2. Fix the duplicate ID in this fragment. The heading needs the contact ID, and the paragraph does not need an ID.

~~~html
<h2 id="contact">Contact</h2>
<p id="contact">Send us a message.</p>
~~~

**Answer:**

~~~html
<h2 id="contact">Contact</h2>
<p>Send us a message.</p>
~~~

An ID should identify one element in the document. Remove an ID when nothing needs to refer to that element.

### 3. This fragment nests one link inside another. Rewrite it as two sibling links.

~~~html
<a href="/first">First page <a href="/second">Second page</a></a>
~~~

**Answer:**

~~~html
<a href="/first">First page</a>
<a href="/second">Second page</a>
~~~

Each anchor has its own destination and neither link contains the other.

### 4. Describe how you would investigate a heading that looks correct but appears in the wrong place in the document structure.

**Answer:** Inspect the source around the heading, validate the complete document, and then inspect the heading in the browser's DOM panel. Look for an earlier unclosed or misnested element, and check whether a script moved or replaced the heading.

### 5. A local page is valid, but the deployed page shows old content. List the first checks you would make.

**Answer:** Confirm the browser address points to the expected deployed page, save the correct source file, and check that the deployed version was updated. Reload the page, then inspect the served document rather than assuming the local file and deployed URL are identical.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [52 - Deprecated elements and obsolete HTML](52-obsolete-html.md) | [Lesson](../lessons/53-validation-and-debugging.md) | [Example](../examples/53-validation-and-debugging.md) | [54 - HTML-only practice pages](54-html-practice-projects.md) |