# 07 - Global attributes: Questions and Answers

Practice questions for [Lesson 07 - Global attributes](../lessons/07-global-attributes.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What makes an HTML attribute global?

- A. It must appear on every element.
- B. It can be used on many HTML elements, subject to its own rules.
- C. It changes every element into a link.
- D. It only works on the `html` element.

**Answer: B.** A global attribute is available on many elements, but its rules and usefulness still depend on the attribute and context.

### 2. Which statement about `id` is correct?

- A. The same id should identify several elements in one document.
- B. An id gives an element a unique identifier within its document.
- C. An id automatically styles an element.
- D. An id translates the element's text.

**Answer: B.** Use a distinct id when one element needs a unique identifier. An id does not create styling by itself.

### 3. What do the two names in `class="guide featured"` represent?

- A. One class name containing a space.
- B. Two class names: `guide` and `featured`.
- C. An id and a class.
- D. Two HTML elements.

**Answer: B.** Spaces separate class tokens, so this element has two class names.

### 4. What does `lang="hi"` communicate?

- A. The text should be hidden.
- B. The text is Hindi.
- C. The text should be translated into Hindi automatically.
- D. The text direction is right-to-left.

**Answer: B.** `lang` identifies the language of text. It does not translate it or determine its direction.

### 5. Which `dir` value asks the browser to determine direction from the text?

- A. `auto`
- B. `center`
- C. `language`
- D. `inherit`

**Answer: A.** `dir="auto"` lets the browser determine the direction from the text.

### 6. Why should important instructions not appear only in a `title` attribute?

- A. The title value is always visible beside the element.
- B. Some users and devices may not expose the tooltip.
- C. The attribute deletes the text.
- D. The attribute only works on headings.

**Answer: B.** Tooltips may not be available to touch-screen or keyboard users. Put essential information in visible content.

### 7. What does a present `hidden` attribute normally do?

- A. Deletes the element from the HTML source.
- B. Prevents the browser from rendering the element.
- C. Makes the element editable.
- D. Moves the element to the end of the page.

**Answer: B.** The element remains in the source, but it is normally not presented while `hidden` is active.

### 8. What is the usual purpose of `tabindex="-1"`?

- A. Put an element first in the normal Tab order.
- B. Make an element programmatically focusable without adding it to the normal Tab sequence.
- C. Disable keyboard focus permanently.
- D. Hide an element.

**Answer: B.** `tabindex="-1"` is useful when code needs to move focus to an element, while the element is skipped by normal sequential Tab navigation.

### 9. What happens when a user edits an element with `contenteditable="true"`?

- A. The browser automatically saves the changes to the source file.
- B. The page content can be edited in the browser, but saving requires additional application behavior.
- C. The element becomes a form submission button.
- D. The browser translates the content.

**Answer: B.** `contenteditable` allows in-page editing. It does not automatically save edits to a file or server.

### 10. What does `data-item-id="42"` do by itself?

- A. Displays the number 42 to readers.
- B. Creates a built-in click action.
- C. Stores custom data on the element for scripts or other code to use.
- D. Gives the element the unique id 42.

**Answer: C.** A `data-*` attribute stores custom information. It does not display that value or provide behavior by itself.

## Objective questions

### True or false

### 1. A global attribute can be useful on many elements, but it must still follow its own rules.

**Answer: True.** Global availability does not mean every attribute belongs in every situation.

### 2. It is valid practice to reuse the same `id` on multiple elements in one document.

**Answer: False.** An id is intended to uniquely identify one element in its document.

### 3. Spaces in a `class` value separate multiple class names.

**Answer: True.** In `class="tip important"`, the element has the classes `tip` and `important`.

### 4. The `lang` attribute automatically translates its element's text.

**Answer: False.** `lang` identifies the language. Translation is performed by a translation tool or service.

### 5. The `dir` attribute describes text direction, while `lang` describes language.

**Answer: True.** These attributes provide different kinds of information.

### 6. A tooltip from `title` is guaranteed to be available to every user.

**Answer: False.** Tooltip behavior varies, and some users or devices may not expose it.

### 7. The `hidden` attribute removes the element from the HTML source.

**Answer: False.** It affects presentation while the element remains in the source.

### 8. Positive `tabindex` values can make keyboard navigation order confusing.

**Answer: True.** Prefer natural document order and avoid assigning a custom positive tab order.

### 9. Changes to `contenteditable` content are automatically saved to the server.

**Answer: False.** Saving requires additional application code or another mechanism.

### 10. A `data-*` attribute provides visible text to the reader without any other markup.

**Answer: False.** It stores data on an element. Add visible content separately when readers need to see it.

## Fill in the blanks

### 1. The `________` attribute identifies one element within a document.

**Answer: `id`.** Give each element that needs an id a distinct value in that document.

### 2. The `________` attribute can assign reusable labels to one or more elements.

**Answer: `class`.** Multiple class names are separated by spaces.

### 3. The `________` attribute identifies the language of text.

**Answer: `lang`.** For example, `lang="en"` identifies English text.

### 4. The `________` attribute identifies text direction.

**Answer: `dir`.** Common values are `ltr`, `rtl`, and `auto`.

### 5. The value `________` for `tabindex` includes an element in the normal sequential focus order.

**Answer: `0`.** Native links and form controls generally do not need an added `tabindex`.

### 6. The `________` attribute allows users to edit an element's content in the browser.

**Answer: `contenteditable`.** It does not automatically save those edits.

### 7. Custom data attributes begin with the prefix `________`.

**Answer: `data-`.** For example, `data-item-id` is a custom data attribute.

### 8. The `________` attribute is a hint that text may be translated or left unchanged by translation tools.

**Answer: `translate`.** Values such as `yes` and `no` express the hint.

## Short-answer questions

### 1. Explain the difference between `id` and `class`.

**Answer:** Use `id` to uniquely identify one element in a document. Use `class` to give one or more elements shared labels.

**Example:** `<h2 id="care" class="topic">Plant care</h2>` has a unique id and a reusable class.

### 2. What is the difference between `lang` and `dir`?

**Answer:** `lang` identifies the language of text. `dir` identifies the direction in which text is laid out.

**Explanation:** A passage can specify both. For example, use `lang` to identify Arabic and `dir="rtl"` to indicate right-to-left direction.

### 3. Why should a page not rely on `title` for essential instructions?

**Answer:** The value may only appear as a tooltip, and tooltip access is inconsistent for keyboard and touch users. Put essential instructions in visible page text.

### 4. How do `tabindex="0"` and `tabindex="-1"` differ?

**Answer:** `tabindex="0"` puts an element in the normal sequential focus order. `tabindex="-1"` allows programmatic focus but normally skips the element during Tab navigation.

### 5. What should an author know before using `contenteditable`?

**Answer:** It enables editing in the current page, and child content generally inherits the editing behavior. The edits are not automatically saved, so an application needs a separate way to store them.

### 6. When should you use a `data-*` attribute?

**Answer:** Use one for custom information associated with an element when HTML does not already provide a meaningful attribute for that information.

**Explanation:** A data attribute alone does not show the value to readers or create built-in behavior.

## Practical HTML questions

### 1. Add a unique id and two class names to this heading.

**Answer:**

~~~html
<h1 id="page-title" class="page-heading featured">Garden journal</h1>
~~~

**Explanation:** The id identifies this heading in the document. The two class names are separated by a space.

### 2. Mark the first paragraph as English and the second as Hindi.

**Answer:**

~~~html
<p lang="en">Welcome to the garden.</p>
<p lang="hi">बगीचे में आपका स्वागत है।</p>
~~~

**Explanation:** The language tag describes each paragraph. It does not translate either one.

### 3. Write a right-to-left paragraph and include a language tag.

**Answer:**

~~~html
<p lang="ar" dir="rtl">مرحبًا بكم</p>
~~~

**Explanation:** `lang` identifies Arabic and `dir` identifies right-to-left direction.

### 4. Make a paragraph editable and enable the browser's spell-checking hint.

**Answer:**

~~~html
<p contenteditable="true" spellcheck="true">Write a garden reminder.</p>
~~~

**Explanation:** The paragraph can be edited in the page. This markup does not save the edits automatically.

### 5. Add a custom item identifier to a button, and include visible button text.

**Answer:**

~~~html
<button type="button" data-item-id="42">Open item 42</button>
~~~

**Explanation:** The attribute stores custom data; the button text makes the action and item number visible to readers.

### 6. An element should be skipped during Tab navigation but be available for code to focus. Which value should be used, and why?

**Answer:**

~~~html
<section id="results" tabindex="-1">
  <h2>Search results</h2>
</section>
~~~

**Explanation:** `tabindex="-1"` allows code to focus the section without putting it into the normal Tab sequence. Use this only when the interaction needs it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [06 - Nesting, void elements, and HTML syntax](06-nesting-and-html-syntax.md) | [Lesson](../lessons/07-global-attributes.md) | [Example](../examples/07-global-attributes.md) | [08 - Comments, character references, and special characters](08-comments-and-character-references.md) |
