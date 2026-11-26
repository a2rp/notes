# 09 - Pseudo-elements

A pseudo-element lets CSS style a specific part of an element or a generated piece of its presentation. A pseudo-element selector uses two colons (`::`), followed by its name:

```css
.notice::before {
  content: "Note: ";
  font-weight: bold;
}
```

Pseudo-elements are not ordinary HTML elements. They do not appear in the document source or change the HTML tree. The browser creates their visual representation as part of rendering. Pseudo-classes, covered in the previous chapter, select an element by its state, position, or relationship.

## Generated content with `::before` and `::after`

`::before` and `::after` create generated content at the beginning or end of an element's content:

```html
<p class="notice">Save your work before closing the page.</p>
```

```css
.notice::before {
  content: "Note: ";
  font-weight: bold;
}

.notice::after {
  content: " ✓";
  color: seagreen;
}
```

The rendered paragraph appears with “Note:” before the original text and a check mark after it. The source HTML still contains only the paragraph and its original text.

A `content` declaration is needed to produce visible generated content. An empty string can create a pseudo-element box for a decorative shape:

```css
.status::before {
  content: "";
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: seagreen;
}
```

Use generated content for decoration or short visual cues. Put meaningful text, labels, instructions, and controls in HTML, where they can be reliably read, translated, copied, searched, and operated. Do not rely on CSS-generated text as the only way to communicate important information.

`content: none` prevents the pseudo-element from being generated. Generated `::before` and `::after` boxes are inline by default, so set `display` when you need block, flex, grid, or another layout behavior.

## Style the first letter with `::first-letter`

`::first-letter` targets the first typographic letter of an element's text. It is often used for a drop cap at the start of a paragraph:

```css
article p::first-letter {
  color: darkslateblue;
  float: left;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  margin-right: 0.35rem;
}
```

The browser determines the first typographic letter according to the text and language. It may include punctuation that precedes the letter. Use it for typographic decoration, not to change or remove the text.

## Style the first line with `::first-line`

`::first-line` targets the first formatted line of text inside an element:

```css
article p::first-line {
  font-weight: bold;
}
```

The first line depends on layout, including the available width and font metrics. It may contain different words at different viewport sizes. The pseudo-element styles whichever text currently forms the first line, not a fixed substring in the HTML.

## Style list markers with `::marker`

`::marker` targets the marker of a list item, such as a bullet or ordered-list number:

```css
li::marker {
  color: darkorange;
  font-size: 1.2em;
}
```

You can also provide a custom marker value:

```css
li::marker {
  content: "✓ ";
  color: seagreen;
}
```

A marker's available styling properties are more limited than those of an ordinary element. Use semantic lists for list content, and use `::marker` to style their marker presentation.

## Style selected text with `::selection`

`::selection` targets the portion of text selected by the user:

```css
::selection {
  color: white;
  background-color: #4338ca;
}
```

Only a defined subset of properties applies to selected text. Choose colors with enough contrast so selected text remains readable. Selection styling is visual feedback and does not change the selected text.

## Style input hints with `::placeholder`

`::placeholder` targets the placeholder text shown inside a form control:

```css
input::placeholder {
  color: #64748b;
  opacity: 1;
}
```

Placeholder text is a short hint, not a replacement for a visible label. A placeholder can disappear while the user types, and it does not reliably identify the control after a value has been entered.

## Style the file input button

`::file-selector-button` targets the button portion of a file input:

```css
input[type="file"]::file-selector-button {
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 0.35rem;
  background-color: #1d4ed8;
  color: white;
}
```

It styles the control's button. It does not replace the file input or change its selection behavior.

## Style a modal backdrop with `::backdrop`

`::backdrop` targets the layer behind an element displayed in the top layer, such as a modal dialog opened with `showModal()`:

```css
dialog::backdrop {
  background-color: rgb(15 23 42 / 55%);
}
```

This changes the appearance of the layer behind the dialog. The dialog still needs real HTML content and behavior.

## Pseudo-element syntax and combinations

Use the modern double-colon form for pseudo-elements:

```css
p::first-line { ... }
.notice::before { ... }
```

Older CSS also accepted a single colon for `:before`, `:after`, `:first-line`, and `:first-letter`. That legacy spelling exists for compatibility. Write the modern double-colon form in new code.

A pseudo-element is attached to an originating element. The part before the pseudo-element selects that element, and the pseudo-element name selects the generated part:

```css
.card::before { ... }
```

This selects the `::before` pseudo-element belonging to an element with class `card`. A pseudo-element is generally placed at the end of the selector:

```css
.notice.warning::after { ... }
```

Some pseudo-elements support additional following pseudo-classes or pseudo-elements, but those combinations are specific to each pseudo-element. Learn the rules for the pseudo-element you are using instead of assuming every combination is allowed.

Web components define additional pseudo-elements for exposed shadow parts and slotted content, such as `::part()` and `::slotted()`. These are specialized selectors for component boundaries and are outside the basic examples in this chapter.

## Common mistakes

### Forgetting the `content` property

`::before` and `::after` normally need a `content` declaration to be generated. For a decorative box with no text, use `content: ""` and set its display and dimensions.

### Putting essential content only in CSS

Generated text is not a substitute for real HTML content. Use HTML for information that people need to understand, search, translate, or interact with. Keep decorative marks and styling cues in CSS.

### Confusing a pseudo-class with a pseudo-element

A pseudo-class selects an element state, such as `button:hover`. A pseudo-element selects a part of an element or generated content, such as `p::first-line`.

### Expecting `::first-line` to select the same words everywhere

Line wrapping changes with the viewport and font settings. `::first-line` follows the layout and therefore may style different words on different screens.

### Replacing a semantic list with generated markers

Use `<ul>` or `<ol>` and `<li>` for actual list structure. `::marker` changes the marker appearance; it does not create a semantic list.

### Treating placeholder text as a label

A placeholder disappears or changes as the user edits the input. Provide a real label in HTML and use `::placeholder` only to style the hint.

## Try it yourself

1. Add a decorative `::before` marker to a notice and set `content` to an empty string.
2. Use `::after` to add a visual separator after a short label. Keep important wording in HTML.
3. Style the first letter and first line of a paragraph, then resize the browser to see how the line changes.
4. Change a list marker's color with `li::marker`, then try a custom check mark.
5. Select a sentence with the pointer and observe a `::selection` color rule.
6. Add a placeholder to an input, style it with `::placeholder`, and provide a separate visible label.
7. Style a file input's button with `::file-selector-button`.
8. Open a modal dialog and style the layer behind it with `dialog::backdrop`.
9. Inspect the HTML source after styling. Confirm that generated pseudo-element content did not become an HTML node.

## Key points

- Pseudo-elements use two colons and target parts of an element or generated presentation.
- `::before` and `::after` need `content` to generate their content boxes.
- Generated text is best kept decorative. Important content and controls belong in HTML.
- `::first-letter` and `::first-line` style typographic portions of text.
- `::marker`, `::selection`, `::placeholder`, `::file-selector-button`, and `::backdrop` target specific browser-rendered parts.
- Pseudo-elements do not modify the document source or create semantic HTML elements.
- Use the modern double-colon notation, including for the four legacy pseudo-elements.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [08 - Pseudo-classes](08-pseudo-classes.md) | [Q&A](../qnas/09-pseudo-elements.md) | [Example](../examples/09-pseudo-elements.md) | [10 - The cascade and inheritance](10-cascade-and-inheritance.md) |
