# 13 - Specialized text elements

HTML includes elements for marking text as code, describing user input and program output, defining terms, and attaching machine-readable values to readable text. These elements add meaning to content without changing the words a reader sees.

## What you will learn

- When to use `code`, `pre`, `kbd`, `samp`, and `var`.
- How `abbr` and `dfn` describe abbreviations and defined terms.
- How `data` and `time` pair visible text with machine-readable values.
- How to choose markup that describes the content instead of merely changing its appearance.

## Code and preformatted text

### The `code` element

Use `code` for a short fragment of computer code, such as an HTML element, attribute, command, or expression.

~~~html
<p>Use the <code>alt</code> attribute to provide text for an image.</p>
<p>The page has a <code>&lt;main&gt;</code> element.</p>
~~~

The `code` element identifies code to browsers and other tools. It does not run the code, validate it, or automatically display it with syntax colors. The browser's default appearance is usually a monospace font, but that appearance is not the element's meaning.

When showing markup as an example, write character references such as `&lt;` and `&gt;` for angle brackets that should appear as text. Otherwise, the browser may parse the example as real markup.

### The `pre` element

Use `pre` when spaces and line breaks are part of the content and should be preserved. A common use is a multiline code sample. Put `code` inside `pre` when the preserved text is also computer code.

~~~html
<pre><code>&lt;h1&gt;A page heading&lt;/h1&gt;
&lt;p&gt;A short paragraph.&lt;/p&gt;</code></pre>
~~~

Here, `pre` preserves the line break and indentation in the sample, while `code` identifies the content as code. Neither element adds syntax highlighting by itself.

Do not use `pre` just to indent ordinary prose or to create page layout. Use elements that describe the content, and use CSS when the goal is visual layout.

## Input, output, and variables

These elements are useful when explaining a computer interaction:

- Use `kbd` for text a person types or a key they press.
- Use `samp` for sample output produced by a program or system.
- Use `var` for a variable or placeholder whose value can change.

~~~html
<p>Enter <kbd>help</kbd> to see the available commands.</p>
<p>The program responds with <samp>Ready.</samp></p>
<p>In the expression <var>total</var> = <var>price</var> × <var>quantity</var>, the variables can change.</p>
~~~

The element names communicate the role of each phrase. Do not choose them only because their default font looks right. For example, use `kbd` for an instruction to the user, not for every phrase that happens to look like keyboard text.

## Abbreviations and defined terms

### The `abbr` element

Use `abbr` for an abbreviation or acronym. Its `title` attribute can provide the expanded form:

~~~html
<p><abbr title="HyperText Markup Language">HTML</abbr> describes the structure of web content.</p>
~~~

The expansion in `title` is supplementary information. It may not be readily available to every reader, so explain an abbreviation in the visible text when readers may not know it:

~~~html
<p>HyperText Markup Language (HTML) describes the structure of web content.</p>
~~~

The `abbr` element identifies the abbreviation; it does not automatically expand it on screen or create a glossary.

### The `dfn` element

Use `dfn` to mark the term being defined. Put the term and its explanation in meaningful surrounding text, usually the same paragraph:

~~~html
<p><dfn>Markup language</dfn> is a system for annotating text so software can interpret its structure.</p>
~~~

The `dfn` element marks the defining occurrence of the term. It is not a general-purpose styling element for every later use of that word.

## Machine-readable values

### The `data` element

Use `data` when visible text has a machine-readable equivalent. The `value` attribute carries that value:

~~~html
<p>Product: <data value="SKU-4821">Blue notebook</data></p>
~~~

A person sees “Blue notebook”; software can read the associated product identifier. Choose a value that corresponds to the visible content and the purpose of the page.

The `data` element is different from a `data-*` global attribute. An element such as `<button data-action="save">` uses a custom data attribute; it does not use the `data` element.

### The `time` element

Use `time` for a calendar date, time, or duration. The readable content goes between the tags. The optional `datetime` attribute supplies a machine-readable value:

~~~html
<p>Published on <time datetime="2026-11-18">November 18, 2026</time>.</p>
<p>The meeting starts at <time datetime="14:30">2:30 PM</time>.</p>
<p>The lesson takes <time datetime="PT20M">20 minutes</time>.</p>
~~~

The value in `datetime` must use a valid date, time, or duration format. A date-only value such as `2026-11-18` does not need a time zone. Do not put an ordinary relative phrase such as “next week” in `datetime`, because it is not a machine-readable date or time value.

If the visible text is already a valid value, the attribute can be omitted:

~~~html
<p>Updated <time>2026-11-18</time>.</p>
~~~

## Putting the elements together

This example uses the elements in a short technical explanation:

~~~html
<article>
  <h2>Running a command</h2>

  <p>At the prompt, type <kbd>html-check index.html</kbd>.</p>
  <p>A successful check prints <samp>No errors found.</samp></p>
  <p>The command checks each <code>&lt;time&gt;</code> element it finds.</p>
  <p>For example, a publication date can be written as
    <time datetime="2026-11-18">November 18, 2026</time>.
  </p>
</article>
~~~

The markup tells browsers and assistive technology what the phrases represent. It does not guarantee that every phrase receives a particular visual style.

## Common mistakes

- Using `code` for every monospace phrase, even when it is not code.
- Expecting `code` to execute an example or add syntax highlighting.
- Using `pre` for layout instead of content whose whitespace matters.
- Using `kbd` for program output instead of `samp`.
- Assuming an abbreviation's `title` will be visible to every reader.
- Marking a word with `dfn` without giving its definition nearby.
- Giving `data` a value that does not match the visible item.
- Putting an invalid or vague phrase in a `time` element's `datetime` attribute.
- Confusing the `data` element with custom `data-*` attributes.

## Try it yourself

1. Write a sentence that includes a short HTML tag as code. Make its angle brackets display as text.
2. Show a two-line HTML example using `pre` and `code`.
3. Write one instruction using `kbd`, then show the expected response using `samp`.
4. Define a technical term using `dfn` and explain it in the same paragraph.
5. Write a sentence that introduces an abbreviation in visible text.
6. Mark a readable product name with a machine-readable identifier using `data`.
7. Display a human-readable publication date with a valid `datetime` value.
8. For each element in your examples, explain what meaning it adds.

## Key points

- `code` identifies a code fragment; `pre` preserves whitespace.
- `kbd`, `samp`, and `var` distinguish user input, sample output, and variables.
- `abbr` marks an abbreviation, while visible text can explain its expansion.
- `dfn` marks a term where it is defined.
- `data` pairs readable content with a machine-readable value.
- `time` can pair a readable date or time with a valid machine-readable value.
- Choose an element for its meaning, not just for its default visual style.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [12 - Text semantics: emphasis, importance, and meaning](12-text-semantics.md) | [Q&A](../qnas/13-specialized-text-elements.md) | [Example](../examples/13-specialized-text-elements.md) | [14 - Quotations and citations](14-quotations-and-citations.md) |
