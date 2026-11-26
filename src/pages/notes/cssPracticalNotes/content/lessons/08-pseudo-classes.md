# 08 - Pseudo-classes

A pseudo-class lets CSS select an element based on its state, position, or relationship to other elements. A pseudo-class starts with one colon (`:`) and can be combined with type, class, ID, attribute, and combinator selectors.

```css
button:hover {
  background-color: navy;
}
```

Here, `button` selects button elements and `:hover` matches a button while the pointer is over it. Pseudo-classes do not create elements or change HTML meaning. They describe which existing elements match at a particular time or in a particular position.

Pseudo-classes use one colon. Pseudo-elements, which target a part of an element or generated content, are covered in the next chapter and generally use two colons.

## Interaction and link states

### Pointer and activation states

- `:hover` matches while a pointing device is over an element.
- `:active` matches while an element is being activated, such as while a mouse button is held down during a click.

```css
button:hover {
  background-color: #1d4ed8;
}

button:active {
  transform: translateY(1px);
}
```

Hover is useful feedback, but it should not be the only way to reveal information or make a control understandable. Touch devices do not have the same hover interaction, and keyboard users navigate differently.

### Focus states

- `:focus` matches an element that currently has focus.
- `:focus-visible` matches a focused element when the browser determines that a visible focus indicator is appropriate, commonly during keyboard navigation.
- `:focus-within` matches an element when it or one of its descendants has focus.

```css
button:focus-visible {
  outline: 3px solid #7c3aed;
  outline-offset: 3px;
}

.field-group:focus-within {
  border-color: #7c3aed;
}
```

Keep a clear visible focus indicator for keyboard users. If you change the browser's default outline, provide a replacement that remains easy to see.

### Link states

- `:link` matches a link that has not been visited.
- `:visited` matches a visited link.
- `:any-link` matches links whether visited or not.

```css
a:link {
  color: #1d4ed8;
}

a:visited {
  color: #6d28d9;
}

a:hover {
  text-decoration-thickness: 0.15em;
}

a:active {
  color: #b91c1c;
}
```

Browsers restrict which styles can differ for `:visited` links to protect a person's browsing history. Use it for a small visual distinction, and do not expect to inspect visited state through script or other style properties.

If several link-state rules set the same property, their order in the cascade matters. A common order for those states is `:link`, `:visited`, `:hover`, then `:active`. Focus styling is still needed for keyboard interaction.

## Form control states

Pseudo-classes can select controls according to their current attributes or user state:

| Pseudo-class | Matches |
| --- | --- |
| `:enabled` | An enabled form control |
| `:disabled` | A disabled form control |
| `:checked` | A checked checkbox or radio control, or a selected option |
| `:required` | A control that has the `required` constraint |
| `:optional` | A control without the `required` constraint |
| `:valid` | A control whose current value satisfies its applicable constraints |
| `:invalid` | A control whose current value fails an applicable constraint |
| `:in-range` | A range-limited control whose value is within its permitted range |
| `:out-of-range` | A range-limited control whose value is outside its permitted range |
| `:read-only` | A control whose value the user cannot edit |
| `:read-write` | An editable control |
| `:placeholder-shown` | A control currently displaying its placeholder text |

Examples:

```css
input:required {
  border-left: 3px solid darkorange;
}

input:focus-visible {
  outline: 3px solid royalblue;
}

input:required:valid {
  border-color: seagreen;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

input[type="checkbox"]:checked {
  accent-color: seagreen;
}
```

A pseudo-class can be combined with another selector. For example, `input:required:valid` matches an input that is both required and currently valid. Form pseudo-classes reflect the control state and its validation constraints. Use HTML form attributes and real labels to give controls their meaning; a CSS state rule is only visual feedback.

## Structural pseudo-classes

Structural pseudo-classes select elements according to their position among siblings.

| Pseudo-class | Matches |
| --- | --- |
| `:first-child` | An element that is the first element child of its parent |
| `:last-child` | An element that is the last element child of its parent |
| `:only-child` | An element that has no element siblings |
| `:first-of-type` | The first sibling of its element type |
| `:last-of-type` | The last sibling of its element type |
| `:only-of-type` | The only sibling of its element type |
| `:nth-child()` | An element at a specified sibling position or pattern |
| `:nth-last-child()` | An element at a specified position counted from the end |
| `:nth-of-type()` | An element at a specified position among siblings of the same type |
| `:nth-last-of-type()` | An element at a specified position among siblings of the same type, counted from the end |

### First, last, and only

```css
li:first-child {
  font-weight: bold;
}

li:last-child {
  margin-bottom: 0;
}

p:only-child {
  color: slategray;
}
```

`:first-child` means first child element overall. `:first-of-type` means first sibling with the same element type. If a list begins with a heading followed by paragraphs, the first paragraph is not `:first-child`, but it is `:first-of-type` among its paragraph siblings.

### Select repeating positions with `:nth-child()`

The `:nth-child()` family accepts patterns such as `odd`, `even`, an integer, or an `An+B` expression:

```css
tr:nth-child(even) {
  background-color: #f1f5f9;
}

li:nth-child(3n) {
  font-weight: bold;
}

li:nth-child(3n + 1) {
  color: darkslateblue;
}
```

`n` represents a sequence of whole-number steps. `3n` matches positions 3, 6, 9, and so on. `3n + 1` matches positions 1, 4, 7, and so on. Positions start at 1. The count is among element siblings, so indentation and text between tags do not count as elements.

`:nth-child(odd)` and `:nth-child(even)` are useful for alternating rows. `:nth-of-type()` counts only siblings of the same element type, while `:nth-child()` counts all element siblings.

Some `:nth-child()` forms can filter the elements being counted with an `of` selector list:

```css
:nth-child(2 of .item) {
  outline: 2px solid royalblue;
}
```

This selects the second sibling that matches `.item`, rather than the second element child overall. The `of` form is useful when a parent has mixed kinds of children.

## Other useful state and context pseudo-classes

### The root element

`:root` matches the root element of the document. In an HTML document, this is the `<html>` element:

```css
:root {
  scroll-behavior: smooth;
}
```

### The current URL fragment target

`:target` matches the element whose ID matches the current URL fragment:

```css
#details:target {
  background-color: #fef3c7;
}
```

If the current URL ends in `#details`, the element with `id="details"` matches.

### The language of an element

`:lang()` matches elements based on their language information, including language subtags:

```css
:lang(en) {
  quotes: "“" "”";
}
```

An element marked `lang="en-US"` can match `:lang(en)`. Set the correct `lang` attribute in HTML rather than relying on a visual rule to identify language.

## Functional pseudo-classes

Some pseudo-classes accept selectors inside parentheses.

### `:not()` excludes matches

```css
button:not(:disabled) {
  cursor: pointer;
}
```

This matches buttons that do not match `:disabled`.

### `:is()` groups alternatives

```css
:is(h1, h2, h3) {
  color: darkslateblue;
}
```

This matches any heading type in the selector list. It can make repeated selector relationships easier to read:

```css
article :is(h1, h2, h3) {
  margin-bottom: 0.5rem;
}
```

### `:where()` groups alternatives without adding specificity

```css
:where(h1, h2, h3) {
  font-family: Georgia, serif;
}
```

`:where()` matches like `:is()`, but its specificity is always zero. This makes it useful for baseline styles that should be easy to override. Specificity is explained in a later chapter.

### `:has()` matches by a related element

`:has()` matches an element when its selector argument finds a related element:

```css
.card:has(> img) {
  padding-top: 0;
}

h2:has(+ p) {
  margin-bottom: 0;
}
```

The first selector matches a `.card` with a direct child image. The second matches an `h2` that is immediately followed by a paragraph sibling. `:has()` can express relationships from the perspective of the element before it, while earlier combinators match the element at the right of the relationship.

Do not nest `:has()` inside another `:has()`. Keep relational selectors understandable, especially when combining them with several other selectors.

## Specificity and selector composition

Pseudo-classes generally contribute to selector specificity like a class selector. Functional pseudo-classes have special rules: `:where()` contributes zero specificity, while `:is()`, `:not()`, and `:has()` use the most specific selector in their argument list. `:nth-child(... of S)` also includes specificity from its `of` selector list. The cascade and specificity chapter explains how these differences affect competing rules.

Pseudo-classes can be chained to express multiple conditions:

```css
input[type="email"]:required:invalid {
  border-color: crimson;
}
```

Every part must match for the selector to match. This input must be an email input, be required, and currently be invalid.

## Common mistakes

### Using one colon for a pseudo-element

Pseudo-classes use a single colon, such as `:hover`. Pseudo-elements generally use two colons, such as `::before`. Pseudo-elements are the subject of the next chapter.

### Depending on hover alone

Touch and keyboard users may not experience hover the same way as mouse users. Provide clear focus styling and ensure important information is available without hover.

### Removing the focus outline without replacing it

A visible focus indicator helps people navigate with a keyboard. Keep the default outline or provide a clear replacement.

### Confusing `:first-child` with `:first-of-type`

`:first-child` checks the first element child overall. `:first-of-type` checks the first sibling of that element type.

### Counting the wrong siblings

`:nth-child(2)` means the second element child, whatever its type. `p:nth-of-type(2)` means the second paragraph sibling.

### Treating `:visited` as unrestricted

Browsers limit visited-link styling for privacy. Do not use it to reveal or collect a person's browsing history.

### Styling a state without implementing behavior

`:checked`, `:disabled`, and similar selectors reflect actual element state. CSS can make that state visible, but it does not check a control, disable it, or implement application behavior.

## Try it yourself

1. Add hover and focus-visible styles to a button. Use the keyboard to reach the button and confirm its focus is easy to see.
2. Make a checkbox and style its label when the checkbox is checked.
3. Create a list and alternate row backgrounds with `:nth-child(even)`.
4. Put a heading before a paragraph. Compare `p:first-child` with `p:first-of-type`.
5. Add a link to `#details`, give a section the matching ID, and style the section with `:target`.
6. Use `:is(h1, h2)` to share a rule between two heading types.
7. Use `:where(.card, .notice)` for a baseline declaration, then override it with a class selector.
8. Add a direct child image to a `.card` and compare the card with and without it using `:has(> img)`.
9. Disable a form control and style its disabled state without relying on color alone.

## Key points

- Pseudo-classes begin with one colon and match state, position, or relationships.
- Interaction states include `:hover`, `:active`, `:focus`, and `:focus-visible`.
- Form states include `:checked`, `:disabled`, `:required`, `:valid`, and `:invalid`.
- Structural pseudo-classes include first, last, only, and `nth-*` selectors.
- `:is()`, `:where()`, and `:not()` combine or exclude selector matches; `:has()` checks for a related match.
- `:focus-visible` styling supports keyboard navigation, and hover should not be the only access to important information.
- Pseudo-classes select existing elements. They do not change HTML meaning or implement behavior.
- Specificity, including the special rules for functional pseudo-classes, affects how competing declarations are resolved.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [07 - Attribute selectors](07-attribute-selectors.md) | [Q&A](../qnas/08-pseudo-classes.md) | [Example](../examples/08-pseudo-classes.md) | [09 - Pseudo-elements](09-pseudo-elements.md) |
