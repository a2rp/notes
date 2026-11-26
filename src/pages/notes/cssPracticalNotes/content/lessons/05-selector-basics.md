# 05 - CSS Selector Basics

A CSS selector tells the browser which HTML elements a rule applies to. A selector can match no elements, one element, or many elements. Learning the basic selectors makes it possible to style a page precisely while keeping its HTML meaningful and reusable.

This chapter covers type, universal, class, and ID selectors, plus selector lists. Combinators, attribute selectors, pseudo-classes, and pseudo-elements are covered in later chapters.

## What a selector does

A CSS rule has a selector followed by a declaration block:

```css
selector {
  property: value;
}
```

The selector is the part before the opening brace. It describes which elements should receive the declarations. For example:

```css
p {
  color: navy;
}
```

Here, `p` is the selector. The rule matches every paragraph element in the document, so each matched paragraph gets navy text.

A selector only chooses elements. It does not change what an element means in HTML. Styling a paragraph to look large does not turn it into a heading. Choose HTML elements for their meaning, then use CSS to present them.

## Type selectors

A type selector matches elements by their HTML tag name:

```css
h1 {
  color: darkslateblue;
}

p {
  line-height: 1.6;
}
```

The `h1` rule matches all `<h1>` elements. The `p` rule matches all `<p>` elements. A type selector is useful when the same baseline style should apply to every element of that type.

Use a type selector when the rule should consistently apply to that element type throughout the page. If only some paragraphs need a special appearance, give those paragraphs a class instead of styling every paragraph the same way.

## The universal selector

The universal selector is an asterisk (`*`). It matches every element:

```css
* {
  box-sizing: border-box;
}
```

This example applies `box-sizing` to all elements. The universal selector is broad, so use it when a declaration is appropriate for every element. A broad rule that changes color, spacing, or font for everything can have effects that are difficult to spot.

## Class selectors

A class selector starts with a period (`.`) followed by a class name. In HTML, the class name is written in the `class` attribute without the period:

```html
<p class="notice">Your changes have been saved.</p>
```

```css
.notice {
  padding: 1rem;
  background-color: lightyellow;
}
```

The `.notice` selector matches elements whose `class` attribute contains the class token `notice`. A class can be reused on multiple elements:

```html
<p class="notice">Your changes have been saved.</p>
<div class="notice">Your session will expire soon.</div>
```

Both elements match `.notice`. This makes classes a good choice for reusable styles and visual roles such as `notice`, `card`, `button`, or `muted-text`.

### An element can have multiple classes

Separate class names with spaces in the HTML attribute:

```html
<article class="card featured">...</article>
```

This element has two classes: `card` and `featured`. Each class can be selected independently:

```css
.card {
  padding: 1rem;
  border: 1px solid gray;
}

.featured {
  border-color: darkorange;
}
```

The element matches both rules. A space between class names in the HTML `class` attribute separates class tokens. In a CSS selector, `.card.featured` means one element must have both classes; that combined selector is covered with selector relationships in a later chapter.

## ID selectors

An ID selector starts with a number sign (`#`) followed by an ID value. In HTML, the `id` attribute value does not include the number sign:

```html
<main id="main-content">...</main>
```

```css
#main-content {
  max-width: 70rem;
  margin: 0 auto;
}
```

The `#main-content` selector matches the element with that ID. An ID is intended to identify one element in a document, so keep each ID value unique on the page. An ID selector can be useful for a unique landmark or target. For reusable visual styling, a class is usually more flexible because it can be used on many elements.

## Selector lists

Separate selectors with commas to apply the same rule to each selector:

```css
h1,
h2,
h3 {
  color: darkslateblue;
  font-family: Georgia, serif;
}
```

This is a selector list. It matches every `h1`, every `h2`, and every `h3` element. The comma means “this selector, or this selector, or this selector.”

Whitespace alone does not create a selector list. For example, `h1 h2` describes a relationship between elements and is a different kind of selector. Use commas when you mean separate alternatives. Relationships between selectors are explained in the next chapter.

## Choosing a basic selector

| Selector | Matches | A common use |
| --- | --- | --- |
| `p` | Every paragraph element | A consistent baseline for paragraphs |
| `*` | Every element | A broad rule that should apply to all elements |
| `.notice` | Elements with the `notice` class | A reusable style or component role |
| `#main-content` | The element with the `main-content` ID | A unique element in the document |
| `h1, h2` | Every `h1` and every `h2` | Shared styles for multiple element types |

Pick the selector based on which elements should receive the rule. Use classes when a style needs to be reused or applied to only a chosen group. Use type selectors for rules that should apply to all elements of that type. Keep IDs unique and use them when identifying a particular element is useful.

## Several selectors can match one element

An element may match more than one rule. For example:

```html
<p class="notice">Scheduled maintenance begins at 9 PM.</p>
```

```css
p {
  line-height: 1.6;
}

.notice {
  padding: 1rem;
}
```

The paragraph matches both `p` and `.notice`, so both declarations apply. When multiple rules set the same property, CSS uses cascade and specificity rules to determine the result. Those topics are covered in later chapters. For now, notice that selectors can overlap and that a single element can receive declarations from more than one rule.

## Common beginner mistakes

### Including the selector marker in HTML

The period and number sign belong in CSS selectors, not in the HTML attribute value:

```html
<!-- Correct -->
<p class="notice">...</p>
<main id="main-content">...</main>
```

```css
/* Correct */
.notice { ... }
#main-content { ... }
```

### Using a class selector without its period

`notice` is interpreted as a type selector for an element named `<notice>`. To match the class value `notice`, write `.notice`.

### Using an ID selector for a repeated style

If several elements need the same appearance, use a class they can share. An ID should identify one element on the page.

### Forgetting commas in a selector list

`h1, h2` selects all `h1` and `h2` elements. `h1 h2` expresses a relationship between elements, not two alternatives. A missing comma can make a rule match a very different set of elements.

### Expecting a selector to match by appearance

CSS selectors match the document structure and attributes described by the selector. They do not match an element simply because it looks a certain way or contains a particular visible word.

## Try it yourself

1. Add three paragraphs to an HTML page and use a `p` type selector to give all of them the same line height.
2. Add the class `notice` to two elements and style both with `.notice`.
3. Give one of those elements a second class, such as `featured`, and write a separate `.featured` rule.
4. Add one unique `id` to the main content element and select it with a `#` selector.
5. Write a selector list for `h1` and `h2` that gives both the same text color.
6. Remove the comma from that selector list, observe which elements match, and explain the difference.
7. Add a declaration to a universal selector and identify how broadly it applies.

## Key points

- A selector determines which HTML elements a CSS rule matches.
- A type selector such as `p` matches elements by tag name.
- The universal selector `*` matches every element.
- A class selector begins with `.` in CSS, while the class value in HTML has no period.
- Classes can be reused, and one element can have multiple space-separated classes.
- An ID selector begins with `#` in CSS, while the ID value in HTML has no number sign.
- An ID value should be unique within a document.
- Commas create a selector list and apply the rule to each listed selector.
- Selectors choose elements but do not change the meaning of the HTML.
- Multiple selectors can match one element; cascade and specificity decide conflicts.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [04 - Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md) | [Q&A](../qnas/05-selector-basics.md) | [Example](../examples/05-selector-basics.md) | [06 - Combinators and selector relationships](06-combinators-and-selector-relationships.md) |
