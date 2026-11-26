# 07 - Attribute Selectors: Example

## Goal

Build a small resource page and use attribute selectors to style form fields, links, language values, and custom data attributes.

## Complete example

Copy this complete document into a file named `index.html`, then open it in a browser to compare it with the expected output below.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Attribute Selector Examples</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem;
      background-color: #f1f5f9;
      color: #1e293b;
      font-family: Arial, sans-serif;
    }

    .page {
      max-width: 46rem;
      margin: 0 auto;
      padding: 1.5rem;
      background-color: white;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
    }

    h1,
    h2 {
      color: #173b68;
    }

    p,
    label {
      line-height: 1.6;
    }

    input {
      display: block;
      width: 100%;
      max-width: 24rem;
      margin-top: 0.35rem;
      padding: 0.65rem;
      border: 1px solid #94a3b8;
      border-radius: 0.35rem;
    }

    input[required] {
      border-left: 0.3rem solid #ea580c;
    }

    input[type="email"] {
      background-color: #eff6ff;
    }

    a[href^="/files/"] {
      color: #1d4ed8;
    }

    a[href$=".pdf"] {
      border-bottom: 2px solid #1d4ed8;
      font-weight: bold;
    }

    a[data-kind~="download"] {
      padding: 0.2rem 0.35rem;
      background-color: #eff6ff;
    }

    [lang|="en"] {
      border-left: 0.25rem solid #0f766e;
      padding-left: 0.75rem;
    }

    [class~="card"] {
      padding: 1rem;
    }

    [class~="featured"],
    [data-kind~="featured"] {
      color: #9a3412;
    }

    [class*="card"] {
      outline: 2px dashed #94a3b8;
      outline-offset: 0.15rem;
    }

    [data-state="open" i] {
      padding: 0.75rem;
      background-color: #dcfce7;
      color: #166534;
    }

    [data-code="Open" s] {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <main class="page">
    <h1>Resources</h1>

    <h2>Sign up</h2>
    <form>
      <label>
        Email address
        <input type="email" name="email" required>
      </label>
      <label>
        Display name
        <input type="text" name="display-name">
      </label>
    </form>

    <h2>Downloads</h2>
    <p>
      <a href="/files/guide.pdf" data-kind="download">Download the PDF guide</a>
    </p>
    <p>
      <a href="/files/guide.html" data-kind="download featured">Read the HTML guide</a>
    </p>

    <h2>Other attribute values</h2>
    <p lang="en-US">This paragraph uses a regional English language value.</p>
    <div class="card featured">Featured card</div>
    <div class="postcard">A postcard</div>
    <p data-state="OPEN">The menu state is open.</p>
    <p data-code="Open">This code uses an uppercase O.</p>
  </main>
</body>
</html>
```

## Expected output

The page displays a centered white resource panel with a sign-up form, download links, and examples of attribute values.

- The email input has a pale blue background because its type is `email`.
- The email input also has an orange left border because it has the `required` attribute. The display-name input does not.
- Both download links have a pale blue background because their `data-kind` values include the complete token `download`.
- The PDF link has a bold label and a blue bottom border because its `href` ends with `.pdf`.
- The English paragraph has a teal left border because its language value is `en-US`.
- Only the featured card receives extra padding because its class list includes `card` as a complete token.
- The featured card and the download link with a `featured` token have dark orange text.
- Both the card and the postcard have dashed outlines. The substring selector finds `card` inside both class values.
- The `OPEN` state paragraph has a green background because the selector uses the `i` flag.
- The code paragraph is bold because its value exactly matches `Open` with the case-sensitive `s` flag.

## How the selectors work

### Attribute presence

```css
input[required] {
  border-left: 0.3rem solid #ea580c;
}
```

The selector matches inputs that have a `required` attribute, without checking its text value. Only the email input has that attribute.

### Exact value

```css
input[type="email"] {
  background-color: #eff6ff;
}
```

The `=` operator checks for an exact value. It matches the email input and not the text input.

### Prefix and suffix

```css
a[href^="/files/"] { ... }
a[href$=".pdf"] { ... }
```

The `^=` operator matches an `href` that begins with `/files/`, so it matches both links. The `$=` operator matches an `href` that ends with `.pdf`, so it matches only the PDF link.

### Whitespace-separated token

```css
a[data-kind~="download"] { ... }
[class~="featured"],
[data-kind~="featured"] { ... }
```

The `~=` operator matches a complete word from a whitespace-separated value. Both `data-kind` values include `download`. The `[class~="featured"]` selector matches the card, and `[data-kind~="featured"]` matches the second link.

### Substring

```css
[class*="card"] { ... }
```

The `*=` operator matches the string `card` anywhere in the whole class attribute value. It matches both `class="card featured"` and `class="postcard"`. This intentionally broad match demonstrates why substring selectors should be chosen carefully.

### Hyphen-separated value

```css
[lang|="en"] { ... }
```

The `|=` operator matches the exact value `en` or a value that begins with `en-`. The paragraph's `en-US` value matches.

### Case flags

```css
[data-state="open" i] { ... }
[data-code="Open" s] { ... }
```

The `i` flag requests ASCII case-insensitive comparison, so `open` matches the value `OPEN`. The `s` flag requests case-sensitive comparison, so `Open` matches the exact capitalization in `data-code`.

## Try these changes

1. Remove `required` from the email input. Its orange left border disappears.
2. Change `type="email"` to `type="text"`. The pale blue background disappears.
3. Change the first link's `href` so it no longer begins with `/files/`. It loses the prefix-based link color.
4. Change `/files/guide.pdf` to `/files/guide.pdf?download=1`. The value no longer ends with `.pdf`, so the suffix selector stops matching.
5. Remove `download` from a `data-kind` value. That link no longer gets the token-based background.
6. Change the language to `english`. The value does not match `[lang|="en"]`, because `english` has no hyphen after `en`.
7. Change `class="postcard"` to `class="post card"`. It matches `[class~="card"]`, which selects a complete token, as well as `[class*="card"]`.
8. Change `data-state="OPEN"` to `data-state="closed"`. The state selector no longer matches.
9. Change `data-code="Open"` to `data-code="open"`. The case-sensitive selector no longer matches.

## Key points

- `[attr]` checks whether an attribute exists.
- `[attr="value"]` matches an exact value.
- `~=`, `|=`, `^=`, `$=`, and `*=` match tokens, hyphenated prefixes, prefixes, suffixes, and substrings.
- The `i` flag requests ASCII case-insensitive matching. The `s` flag requests case-sensitive matching.
- Attribute selectors can be combined with type and class selectors.
- A selector reads markup. It does not validate a link or change application state.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [06 - Combinators and selector relationships](../examples/06-combinators-and-selector-relationships.md) | [Lesson](../lessons/07-attribute-selectors.md) | [Q&A](../qnas/07-attribute-selectors.md) | [08 - Pseudo-classes](08-pseudo-classes.md) |
