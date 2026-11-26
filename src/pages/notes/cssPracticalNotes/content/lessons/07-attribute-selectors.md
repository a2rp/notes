# 07 - Attribute Selectors

Type, class, and ID selectors match elements by tag name or identifier. Attribute selectors let CSS match elements by whether an HTML attribute exists or by the value it contains. They are useful for forms, links, language attributes, and custom `data-*` attributes.

Attribute selectors use square brackets. They can be used by themselves or combined with type, class, ID, and relationship selectors.

## Select elements that have an attribute

Use an attribute name inside square brackets to match elements that have that attribute, whatever its value:

```css
[required] {
  outline-color: darkorange;
}
```

This matches any element that has a `required` attribute. It does not check the attribute's value. For HTML boolean attributes such as `required` and `disabled`, the attribute's presence represents the enabled state.

You can include an element type to narrow the match:

```css
input[required] {
  border-color: darkorange;
}
```

This matches required `<input>` elements, not every kind of element with a `required` attribute.

## Match an exact attribute value

Use an equals sign to match an attribute whose value is exactly the given string:

```css
input[type="email"] {
  border-color: royalblue;
}
```

This matches an input with `type="email"`. It does not match `type="text"` or a different type value.

Exact matching is useful for selecting a specific input type or a particular value in a `data-*` attribute:

```css
[data-state="open"] {
  border-color: seagreen;
}
```

The attribute selector reads the HTML attribute value. It does not inspect computed styles or infer a state that is not represented by the attribute.

## Match a whitespace-separated word

The `~=` operator matches an exact word in a whitespace-separated attribute value:

```css
[class~="featured"] {
  border-color: darkorange;
}
```

This matches `class="card featured"`, because `featured` is one complete class token. It does not match a single token such as `featured-card`.

For class names, a class selector is usually clearer:

```css
.featured {
  border-color: darkorange;
}
```

The `~=` operator is useful for attributes whose values are defined as space-separated tokens, such as `rel`:

```css
a[rel~="external"] {
  text-decoration-style: dotted;
}
```

## Match a value or a hyphen-prefixed value

The `|=` operator matches an exact value or that value followed by a hyphen:

```css
[lang|="en"] {
  font-family: Arial, sans-serif;
}
```

This matches `lang="en"` and values such as `lang="en-US"`. It does not match `lang="english"` because the next character after `en` is not a hyphen.

This operator is particularly useful for language codes and other values that use a hyphen-separated prefix.

## Match the beginning of a value

The `^=` operator matches an attribute value that starts with the given string:

```css
a[href^="https://"] {
  text-decoration-thickness: 0.12em;
}
```

This matches links whose literal `href` attribute begins with `https://`. It does not decide whether a link is safe or whether its final destination is trustworthy.

## Match the end of a value

The `$=` operator matches an attribute value that ends with the given string:

```css
a[href$=".pdf"] {
  font-weight: bold;
}
```

This can select links whose `href` attribute ends in `.pdf`. It checks the text of the attribute value, so a query string after `.pdf` means that the value no longer ends in `.pdf`.

## Match a substring anywhere in a value

The `*=` operator matches when the given string appears anywhere inside the attribute value:

```css
img[alt*="diagram"] {
  border: 2px solid steelblue;
}
```

This matches an `alt` value containing the substring `diagram`. Substring matching is broad, so use it only when any occurrence is meant to match. It does not understand words or meaning.

## Operator summary

| Selector form | What it matches | Example |
| --- | --- | --- |
| `[attr]` | The attribute is present | `[required]` |
| `[attr="value"]` | The value is exactly equal | `[type="email"]` |
| `[attr~="word"]` | The value contains a complete whitespace-separated word | `[class~="featured"]` |
| `[attr|="value"]` | The value is exact or followed by a hyphen | `[lang|="en"]` |
| `[attr^="start"]` | The value starts with the given text | `[href^="https://"]` |
| `[attr$="end"]` | The value ends with the given text | `[href$=".pdf"]` |
| `[attr*="part"]` | The value contains the given text anywhere | `[alt*="diagram"]` |

## Case sensitivity flags

An `i` flag requests ASCII case-insensitive matching for the attribute value comparison:

```css
input[type="EMAIL" i] {
  border-color: royalblue;
}
```

This can match `type="email"` even though the letters in the selector use a different case. The flag affects matching, not the value stored in the HTML.

An `s` flag requests case-sensitive matching:

```css
[data-code="Open" s] {
  color: seagreen;
}
```

Without a flag, matching follows the default case behavior for the attribute in the document language. For many HTML attribute values, matching is case-sensitive. Use a flag when the intended comparison should be explicit. The `i` flag is ASCII case-insensitive, not a full Unicode case-folding operation.

## Combine attribute selectors with other selectors

Attribute selectors can be combined with type, class, ID, and combinator selectors:

```css
form input[required] {
  border-left: 3px solid darkorange;
}

.card[data-state="open"] {
  border-color: seagreen;
}

nav a[href^="/account"] {
  font-weight: bold;
}
```

These examples use the selectors already covered in earlier chapters. The additional checks are inside square brackets. Use combinations to narrow the target to elements with the required type, location, or attribute value.

## Choose selectors that express the intent

Attribute selectors can be precise, but long strings and broad substring rules can become fragile. Consider these choices:

- Use `.featured` for an element with the `featured` class. It is simpler than `[class~="featured"]`.
- Use `[required]` when the presence of that attribute is the condition.
- Use `[type="email"]` when the specific input type is the condition.
- Use `[data-state="open"]` when the markup deliberately represents a state with that attribute.
- Use `^=`, `$=`, or `*=` only when matching a prefix, suffix, or substring is part of the intended behavior.

If content or behavior needs to change, update the HTML or application logic. A CSS selector only changes which elements receive presentation rules.

## Common mistakes

### Confusing presence with a particular value

`[required]` checks whether the attribute exists. `[required="true"]` checks whether its text value is exactly `true`. For the HTML boolean `required` attribute, use the presence selector.

### Using exact class attribute matching

`[class="featured"]` matches only when the entire class attribute value is exactly `featured`. It does not match `class="card featured"`. Use `.featured` or `[class~="featured"]` when looking for the class token.

### Confusing `~=` with `*=`

`[class~="card"]` matches the complete token `card`. `[class*="card"]` matches any occurrence of the letters `card`, including inside a longer token. Prefer token matching when the attribute is a whitespace-separated list.

### Assuming a prefix match means a safe link

`a[href^="https"]` only checks the beginning of the `href` attribute text. It does not validate the destination, redirect behavior, or trustworthiness.

### Forgetting the quotes around string values

Quoted values make the intended string clear, especially when values contain punctuation or spaces:

```css
[data-label="account menu"] {
  /* declarations */
}
```

### Using the wrong operator for a hyphenated prefix

`[lang|="en"]` matches `en` or `en-US`. `[lang^="en"]` also matches strings such as `english`, because it only checks the beginning of the value.

## Try it yourself

Use this markup to practice:

```html
<form>
  <label>
    Email
    <input type="email" name="email" required>
  </label>
  <label>
    Name
    <input type="text" name="name">
  </label>
</form>

<a href="/guide.pdf" data-kind="download">Download the guide</a>
<p lang="en-US">Welcome.</p>
<div class="card featured">A highlighted card</div>
```

1. Select all elements that have a `required` attribute.
2. Select only email inputs.
3. Select links whose `href` ends in `.pdf`.
4. Select elements whose `class` list includes the complete token `featured`.
5. Write a selector that matches `lang="en"` and `lang="en-US"`, but not `lang="english"`.
6. Compare `[class~="card"]` with `[class*="card"]` using a class value of `postcard`.
7. Add `data-state="open"` to an element and write a selector that matches that exact state.

## Key points

- Attribute selectors are written in square brackets.
- `[attr]` checks whether an attribute is present.
- `=` matches an exact value, while `~=` matches a complete whitespace-separated word.
- `|=` matches an exact value or a value followed by a hyphen.
- `^=`, `$=`, and `*=` match a prefix, suffix, or substring.
- The `i` and `s` flags make the desired case comparison explicit for ASCII matching.
- Attribute selectors can be combined with other selectors to narrow a match.
- A CSS selector checks markup values. It does not validate links or change application behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [06 - Combinators and selector relationships](06-combinators-and-selector-relationships.md) | [Q&A](../qnas/07-attribute-selectors.md) | [Example](../examples/07-attribute-selectors.md) | [08 - Pseudo-classes](08-pseudo-classes.md) |
