# 13 - Specialized text elements: Questions and Answers

Practice questions for [Lesson 13 - Specialized text elements](../lessons/13-specialized-text-elements.md). Each question is followed by its answer and an explanation or worked example where useful. Other code examples can also be correct if they use the elements appropriately.

## Multiple-choice questions

### 1. What does the code element identify?

- A. A fragment of computer code.
- B. Any text that should appear in a different color.
- C. A command that the browser should execute.
- D. A heading in a program.

**Answer: A.** Code identifies a computer code fragment. It does not execute or validate the fragment.

### 2. What is the main purpose of pre?

- A. To make text bold.
- B. To preserve whitespace such as spaces and line breaks.
- C. To add syntax highlighting automatically.
- D. To create a code link.

**Answer: B.** Pre preserves whitespace. It is often paired with code when a multiline code sample is shown.

### 3. Which element marks text a person should enter?

- A. samp
- B. var
- C. kbd
- D. data

**Answer: C.** Kbd marks user input, such as a typed command or key press.

### 4. Which element is appropriate for output produced by a program?

- A. samp
- B. kbd
- C. dfn
- D. abbr

**Answer: A.** Samp identifies sample output from a program or computer system.

### 5. What does var represent in technical text?

- A. A browser warning.
- B. A variable or placeholder value.
- C. A keyboard shortcut.
- D. A date.

**Answer: B.** Var marks a variable whose value can change.

### 6. What information can an abbr element's title attribute provide?

- A. The abbreviation's expanded form.
- B. The destination of a link.
- C. A date in machine-readable form.
- D. A syntax-highlighting theme.

**Answer: A.** Title can provide an expansion, but readers may not see it readily. Explain unfamiliar abbreviations in visible text when useful.

### 7. What does dfn mark?

- A. Every occurrence of a technical term.
- B. The occurrence of a term being defined.
- C. Text that should be displayed as code.
- D. A machine-readable product identifier.

**Answer: B.** Dfn marks the defining occurrence. The definition should be clear in the surrounding text.

### 8. What is the purpose of the value attribute on data?

- A. To hide the visible text.
- B. To provide a machine-readable value associated with the visible content.
- C. To make a phrase a keyboard command.
- D. To define a CSS color.

**Answer: B.** Data pairs human-readable content with a machine-readable value.

### 9. Which is a valid reason to use time?

- A. To mark any phrase that mentions the future.
- B. To represent a date, time, or duration.
- C. To make text smaller.
- D. To add a tooltip to a link.

**Answer: B.** Time represents a date, time, or duration. Its datetime value, when provided, must use a valid format.

### 10. What should you use to show a multiline code sample while preserving its line breaks?

- A. pre containing code
- B. samp containing dfn
- C. abbr containing data
- D. var containing kbd

**Answer: A.** Pre preserves whitespace, and code identifies the content as code.

## True or false

### 1. The code element runs the code it contains.

**Answer: False.** Code describes the content. A browser does not execute the fragment just because it is inside code.

### 2. The pre element is useful when spaces and line breaks are meaningful.

**Answer: True.** Preformatted text preserves whitespace that would otherwise be collapsed in ordinary HTML text.

### 3. Kbd is used for sample output from a computer.

**Answer: False.** Kbd marks user input. Samp marks sample program or system output.

### 4. The default visual style of an element is the element's meaning.

**Answer: False.** Appearance is presentation. Choose an element based on what its content represents.

### 5. An abbreviation's title value is always displayed visibly next to the abbreviation.

**Answer: False.** Title can provide an expansion, but it may not be readily available to readers. Visible explanation can be more useful.

### 6. A dfn element should mark the place where its term is being defined.

**Answer: True.** Use it for the defining occurrence, with the explanation in the surrounding text.

### 7. The data element and a data-* attribute are the same HTML feature.

**Answer: False.** Data is an element for pairing text with a machine-readable value. Data-* is a family of custom global attributes that can be added to other elements.

### 8. A date-only datetime value such as 2026-11-18 can represent a calendar date.

**Answer: True.** It is a valid date form. A date-only value does not need a time zone.

### 9. The datetime value should contain an ordinary phrase such as next week.

**Answer: False.** Use a valid machine-readable date, time, or duration format, not a vague relative phrase.

### 10. Syntax highlighting is automatically guaranteed by code.

**Answer: False.** Code identifies a code fragment but does not itself provide syntax highlighting. That may be added by other tools or presentation.

## Fill in the blanks

### 1. The ______ element identifies a fragment of computer code.

**Answer: code.** It marks code semantically without executing it.

### 2. Use ______ to preserve spaces and line breaks in preformatted content.

**Answer: pre.** It is commonly combined with code for multiline code examples.

### 3. Use ______ for input typed or pressed by a user.

**Answer: kbd.** For example, a typed command can be marked as user input.

### 4. Use ______ for sample output produced by a program or system.

**Answer: samp.** It is distinct from kbd, which marks input.

### 5. The ______ element marks the defining occurrence of a term.

**Answer: dfn.** Put the explanation near the marked term.

### 6. The ______ element pairs readable text with a machine-readable value in its value attribute.

**Answer: data.** It can associate a product name with an identifier, for example.

### 7. The ______ element can represent a date, time, or duration.

**Answer: time.** Its datetime attribute can provide a machine-readable form.

### 8. The ______ element marks an abbreviation or acronym.

**Answer: abbr.** Its title attribute can provide an expansion, though visible explanation may be more discoverable.

## Short-answer questions

### 1. Explain the difference between code and pre.

**Answer:** Code identifies its content as a code fragment. Pre preserves whitespace such as spaces and line breaks. A multiline code sample often uses code inside pre.

### 2. Explain the difference between kbd and samp.

**Answer:** Kbd marks what the user enters or presses. Samp marks example output produced by a program or system. For example, the command entered is kbd, and the program response is samp.

### 3. When should you use var?

**Answer:** Use var for a variable or placeholder whose value can change, such as a variable name in a formula or instructions.

### 4. Does abbr automatically show the expanded form to every reader?

**Answer:** No. A title attribute can provide the expansion, but that information may not be readily visible. If readers may not know the abbreviation, introduce its expansion in the visible text.

### 5. What should accompany a dfn element?

**Answer:** A clear explanation of the term in the surrounding text, usually in the same paragraph. Dfn marks the term at its definition; it does not supply the explanation.

### 6. How is data different from a data-* attribute?

**Answer:** Data is an HTML element that pairs readable text with a machine-readable value using its value attribute. A data-* attribute is a custom attribute attached to another element for application-specific data.

### 7. Why might a time element have different visible text and datetime values?

**Answer:** Visible text is written for people, while datetime provides a standardized value for software. For example, the page can show November 18, 2026 and use 2026-11-18 as the datetime value.

### 8. Why should HTML elements be selected by meaning instead of appearance?

**Answer:** Meaning helps browsers, assistive technology, and other tools interpret content. Appearance can be styled separately, so a visual choice alone is not a reliable reason to use a semantic element.

## Practical and coding questions

### 1. Write a sentence that displays the HTML main tag as code rather than parsing it as an element.

**Answer:**

~~~html
<p>The <code>&lt;main&gt;</code> element contains the page's primary content.</p>
~~~

The angle brackets are character references so they display as text. Code identifies the example as a code fragment.

### 2. Mark a two-line HTML sample while preserving its line break.

**Answer:**

~~~html
<pre><code>&lt;h1&gt;Welcome&lt;/h1&gt;
&lt;p&gt;Read the guide.&lt;/p&gt;</code></pre>
~~~

Pre preserves the line break, and code identifies the content as code.

### 3. Mark a user-entered command and the response from a program.

**Answer:**

~~~html
<p>Type <kbd>status</kbd>.</p>
<p>The program prints <samp>All systems ready.</samp></p>
~~~

Kbd marks the input, and samp marks the output.

### 4. Define the term “markup language” in a paragraph.

**Answer:**

~~~html
<p><dfn>Markup language</dfn> is a system for annotating text so software can interpret its structure.</p>
~~~

Dfn marks the term being defined. The same paragraph supplies the definition.

### 5. Introduce HTML so that its expansion is available in visible text.

**Answer:**

~~~html
<p>HyperText Markup Language (HTML) describes the structure of web content.</p>
~~~

The expanded form is visible instead of being available only through a title tooltip.

### 6. Pair a readable product name with the identifier SKU-4821.

**Answer:**

~~~html
<p>Product: <data value="SKU-4821">Blue notebook</data></p>
~~~

A reader sees “Blue notebook”; software can read the associated identifier.

### 7. Mark a publication date in a reader-friendly format and a machine-readable format.

**Answer:**

~~~html
<time datetime="2026-11-18">November 18, 2026</time>
~~~

The datetime value is a valid date, while the element text is natural for readers.

### 8. Correct this markup so it identifies a user command and a valid date: <p>Type <samp>save</samp>. Published <time datetime="next week">soon</time>.</p>

**Answer:**

~~~html
<p>Type <kbd>save</kbd>. Published <time datetime="2026-11-18">November 18, 2026</time>.</p>
~~~

Samp describes output, not user input. “Next week” is not a machine-readable date value, so the example uses a valid date in datetime and visible text.

## Related lesson

- [Lesson 13 - Specialized text elements](../lessons/13-specialized-text-elements.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [12 - Text semantics: emphasis, importance, and meaning](12-text-semantics.md) | [Lesson](../lessons/13-specialized-text-elements.md) | [Example](../examples/13-specialized-text-elements.md) | [14 - Quotations and citations](14-quotations-and-citations.md) |
