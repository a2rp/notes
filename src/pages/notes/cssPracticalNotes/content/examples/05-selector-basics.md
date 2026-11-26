# 05 - CSS Selector Basics: Example

## Goal

Build a small profile card and use basic CSS selectors to style it. This example demonstrates type selectors, the universal selector, class selectors, an ID selector, and a selector list.

## Complete example

Copy the complete document into a new file named `index.html`, then open that file in a browser to compare the result with the expected output below.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Selector Basics</title>
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

    #main-content {
      max-width: 42rem;
      margin: 0 auto;
    }

    .profile-card {
      padding: 1.5rem;
      background-color: white;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
    }

    .featured {
      border-top: 0.35rem solid #2563eb;
    }

    h1,
    h2 {
      color: #173b68;
      font-family: Georgia, serif;
    }

    h1 {
      margin-top: 0.25rem;
      margin-bottom: 0.75rem;
    }

    p {
      line-height: 1.6;
    }

    .eyebrow {
      margin-bottom: 0.25rem;
      color: #1d4ed8;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .summary {
      font-size: 1.1rem;
    }

    .status {
      display: inline-block;
      padding: 0.35rem 0.65rem;
      background-color: #dcfce7;
      border-radius: 999px;
      color: #166534;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <main id="main-content" class="profile-card featured">
    <p class="eyebrow">CSS selectors</p>
    <h1>Meet the selector</h1>
    <p class="summary">
      Selectors connect CSS rules to the HTML elements they describe.
    </p>
    <p class="status">Ready to learn</p>

    <h2>What this page demonstrates</h2>
    <p>
      A type selector styles every matching element. A class can be reused,
      and an ID identifies this page's unique main area.
    </p>
  </main>
</body>
</html>
```

## Expected output

The browser displays a centered white card on a pale background. The card has rounded corners and a blue top edge. It contains:

- A small blue uppercase label: “CSS SELECTORS”
- A dark blue heading: “Meet the selector”
- A larger introductory paragraph
- A green rounded status label: “Ready to learn”
- A second heading: “What this page demonstrates”
- A paragraph explaining the selectors

The HTML meaning stays the same if the CSS is removed. The CSS only changes how the elements look and where they appear.

## How each selector works

### Universal selector

```css
* {
  box-sizing: border-box;
}
```

The asterisk matches every element. Here it gives all elements a predictable box-sizing rule.

### ID selector

```css
#main-content {
  max-width: 42rem;
  margin: 0 auto;
}
```

The HTML `<main>` has `id="main-content"`, so `#main-content` matches it. The ID identifies this one main area in the document.

### Class selectors

```css
.profile-card { ... }
.featured { ... }
```

The `<main>` element has `class="profile-card featured"`, so it matches both class selectors. `.profile-card` provides the card's shared appearance, while `.featured` adds the blue top edge. The two classes are separate tokens in the HTML attribute.

The other classes each target a specific reusable role in this example:

- `.eyebrow` styles the small label.
- `.summary` makes the introductory paragraph larger.
- `.status` styles the status text as a green badge.

In HTML, class values do not include a period. The period is part of the CSS selector.

### Type selectors

```css
body { ... }
p { ... }
h1 { ... }
```

These type selectors match every element of the named type. For example, `p` applies the line-height rule to every paragraph in the document.

### Selector list

```css
h1,
h2 {
  color: #173b68;
  font-family: Georgia, serif;
}
```

The comma separates alternatives, so both heading types receive the shared color and font. The separate `h1` rule below it sets additional spacing only for the main heading.

## Try these changes

1. Change the text inside the `eyebrow` paragraph. Its appearance stays the same because its class has not changed.
2. Remove `featured` from the `<main>` class attribute. The blue top edge disappears, while the rest of the card styling remains.
3. Add `featured` to another element. That element also receives the blue top edge because classes are reusable.
4. Change `.summary` to `.intro` in the CSS, then update the HTML class to `intro`. Both names must match for the rule to apply.
5. Remove the comma between `h1` and `h2`. Notice that this no longer means “style both heading types.” Selector relationships are covered in the next chapter.
6. Temporarily remove the `<style>` element and compare the page. The content and HTML structure remain, while the presentation changes.

## Key points

- A selector chooses which elements receive a CSS rule.
- `*` is the universal selector, a type name such as `p` is a type selector, `.name` is a class selector, and `#name` is an ID selector.
- A comma-separated selector list applies the same declarations to each listed selector.
- One element can match several selectors and can have several classes.
- Classes are reusable. IDs should identify one element in the document.
- CSS changes presentation without changing an element's HTML meaning.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [04 - Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md) | [Lesson](../lessons/05-selector-basics.md) | [Q&A](../qnas/05-selector-basics.md) | [06 - Combinators and selector relationships](06-combinators-and-selector-relationships.md) |
