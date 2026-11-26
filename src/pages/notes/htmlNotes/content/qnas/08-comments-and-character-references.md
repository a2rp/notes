# 08 - Comments, character references, and special characters: Questions and Answers

Practice questions for [Lesson 08 - Comments, character references, and special characters](../lessons/08-comments-and-character-references.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is the main purpose of an HTML comment?

- A. To display a note on the page.
- B. To add a note in the source that is not presented as ordinary page text.
- C. To hide an element from the source.
- D. To change the language of the document.

**Answer: B.** A comment is a source note. It is not displayed as ordinary page text, but people can still inspect the source.

### 2. Which sequence starts an HTML comment?

- A. `<!-`
- B. `<!--`
- C. `//`
- D. `/*`

**Answer: B.** An HTML comment begins with `<!--` and ends with `-->`.

### 3. Which character reference displays a less-than sign as text?

- A. `&gt;`
- B. `&amp;`
- C. `&lt;`
- D. `&quot;`

**Answer: C.** `&lt;` represents the less-than sign. It can be used when you want to show an angle bracket instead of starting markup.

### 4. Which source will display `Tea & coffee`?

- A. `<p>Tea &amp; coffee</p>`
- B. `<p>Tea &copy; coffee</p>`
- C. `<p>Tea &quot; coffee</p>`
- D. `<p>Tea &lt; coffee</p>`

**Answer: A.** `&amp;` represents the ampersand in HTML source.

### 5. What is the correct decimal numeric reference for code point 169?

- A. `&169;`
- B. `&#169;`
- C. `&#x169`
- D. `&amp;169`

**Answer: B.** Decimal numeric references use `&#`, digits, and a semicolon.

### 6. Which spelling is a hexadecimal numeric reference?

- A. `&#xA9;`
- B. `&xA9;`
- C. `&#A9x;`
- D. `&A9;`

**Answer: A.** A hexadecimal numeric reference begins with `&#x` or `&#X`, then hexadecimal digits and a semicolon.

### 7. What should you do if a double-quoted attribute value contains a double quote?

- A. Leave it unescaped so the browser guesses.
- B. Replace the quote with a character reference such as `&quot;`.
- C. Remove the outer quotes.
- D. Put a comment inside the attribute.

**Answer: B.** A reference represents the quote as part of the value without ending the quoted attribute.

### 8. What is true about named character references?

- A. Their names are case-sensitive.
- B. They can only represent letters.
- C. They never use an ampersand.
- D. They must be written in uppercase.

**Answer: A.** Use the exact case of the HTML name. Familiar forms include `&lt;`, `&gt;`, and `&amp;`.

### 9. Which statement about UTF-8 and character references is correct?

- A. Every character must be written as a numeric reference.
- B. UTF-8 lets an HTML file contain readable Unicode characters directly.
- C. UTF-8 automatically translates text.
- D. A character reference saves a file in UTF-8.

**Answer: B.** Direct Unicode text is usually readable and appropriate in UTF-8 HTML. A reference does not set the file's encoding.

### 10. What does `&amp;` do in a quoted URL attribute such as `href`?

- A. It opens a new browser tab.
- B. It represents an ampersand in the HTML source and the URL value.
- C. It removes the query string.
- D. It makes the URL private.

**Answer: B.** The HTML source safely represents the ampersand. The browser interprets it as part of the URL value.

## Objective questions

### True or false

### 1. HTML comments are normally shown as page text.

**Answer: False.** They remain in the source but are not presented as ordinary page text.

### 2. A visitor can inspect an HTML comment by looking at the page source or developer tools.

**Answer: True.** Comments are not secret or secure storage.

### 3. HTML comments can be nested safely.

**Answer: False.** HTML comments do not nest. Avoid placing a complete comment inside another one.

### 4. The double-hyphen sequence `--` should be avoided inside comment text.

**Answer: True.** It can terminate or confuse the comment syntax.

### 5. `&lt;` represents a less-than sign.

**Answer: True.** It is useful when angle brackets should appear as text rather than markup.

### 6. `&amp;` represents an ampersand.

**Answer: True.** It is commonly needed in text and in attribute values that contain ampersands.

### 7. Every accented character must be written as a numeric character reference.

**Answer: False.** UTF-8 allows readable Unicode characters to be written directly.

### 8. A numeric character reference uses a Unicode code point.

**Answer: True.** It can be written in decimal or hexadecimal form.

### 9. A character reference can substitute for saving the HTML file using the correct character encoding.

**Answer: False.** Character references do not fix a file saved with the wrong encoding. Save the file as UTF-8 and declare the encoding appropriately.

### 10. Repeated spaces in ordinary HTML text reliably create columns.

**Answer: False.** Browsers generally collapse runs of whitespace in ordinary text. Use suitable HTML structure and CSS for layout.

## Fill in the blanks

### 1. An HTML comment begins with `________` and ends with `________`.

**Answer: `<!--` and `-->`.** The opening and closing delimiters mark the comment.

### 2. The character reference `________` represents a less-than sign.

**Answer: `&lt;`.** Use it when the character should be shown as text.

### 3. The character reference `________` represents an ampersand.

**Answer: `&amp;`.** It is useful in both text and many attribute values.

### 4. A decimal numeric character reference starts with `________`.

**Answer: `&#`.** It is followed by decimal digits and a semicolon.

### 5. A hexadecimal numeric character reference commonly starts with `________`.

**Answer: `&#x`.** It is followed by hexadecimal digits and a semicolon.

### 6. Named character reference names are ________-sensitive.

**Answer: Case.** Use the exact capitalization of the name.

### 7. The recommended encoding for HTML documents is ________.

**Answer: UTF-8.** Declare it near the start of the document's `head` with `<meta charset="utf-8">`.

### 8. The reference `________` represents a double quotation mark.

**Answer: `&quot;`.** It is useful inside a double-quoted attribute value.

## Short-answer questions

### 1. Explain the difference between an HTML comment and visible page content.

**Answer:** A comment is a note in the source and is not displayed as ordinary page text. Visible content is represented by HTML elements and text that the browser presents to readers.

### 2. Why should comments not contain private information?

**Answer:** The comment stays in the HTML source. Visitors may inspect the source or use developer tools to read it.

### 3. What is a character reference, and when is one useful?

**Answer:** It is a source spelling that represents a character. Use one when a character could be mistaken for markup, such as <, or when a reference makes the source clearer.

### 4. Compare `&#169;` and `&#xA9;`.

**Answer:** Both represent the same Unicode code point, 169. The first writes the number in decimal; the second writes it in hexadecimal.

### 5. Why should an HTML file be saved as UTF-8 even when character references are used?

**Answer:** The file encoding determines how its bytes are interpreted. References do not correct a wrongly encoded file, and directly typed Unicode text should also be interpreted correctly.

### 6. How should an ampersand between URL query parameters be written in HTML source?

**Answer:** Write `&amp;` in the HTML attribute value.

**Example:** `<a href="search.html?term=tea&amp;page=2">Search</a>`

**Explanation:** The HTML parser interprets the reference as an ampersand in the URL value.

## Practical HTML questions

### 1. Write a comment above a main heading.

**Answer:**

~~~html
<!-- Main heading for the garden journal -->
<h1>Garden journal</h1>
~~~

**Explanation:** The comment stays in the source and is not displayed as a separate page paragraph.

### 2. Write a paragraph that displays the literal text `<h1>Welcome</h1>`.

**Answer:**

~~~html
<p>&lt;h1&gt;Welcome&lt;/h1&gt;</p>
~~~

**Explanation:** The references make the angle brackets appear as text rather than being parsed as a heading element.

### 3. Write a paragraph that displays `Bread & butter`.

**Answer:**

~~~html
<p>Bread &amp; butter</p>
~~~

**Explanation:** `&amp;` represents the ampersand in the HTML source.

### 4. Add a title attribute with the value `She said "hello".`.

**Answer:**

~~~html
<p title="She said &quot;hello&quot;.">Read this note.</p>
~~~

**Explanation:** The references represent quote characters inside the double-quoted value.

### 5. Write the copyright sign using both a named reference and a numeric reference.

**Answer:**

~~~html
<p>&copy; 2026 Garden Journal</p>
<p>&#169; 2026 Garden Journal</p>
~~~

**Explanation:** Both references represent the copyright sign. A direct © character in a UTF-8 file is also valid.

### 6. Write a link with two query parameters, `term=tea` and `page=2`.

**Answer:**

~~~html
<a href="search.html?term=tea&amp;page=2">Search</a>
~~~

**Explanation:** The source uses `&amp;` to represent the ampersand between parameters.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [07 - Global attributes](07-global-attributes.md) | [Lesson](../lessons/08-comments-and-character-references.md) | [Example](../examples/08-comments-and-character-references.md) | [09 - The head element and page title](09-head-and-title.md) |
