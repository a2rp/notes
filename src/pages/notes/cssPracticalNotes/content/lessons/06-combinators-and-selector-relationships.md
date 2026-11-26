# 06 - Combinators and Selector Relationships

Basic selectors identify elements by type, class, or ID. Combinators let you describe how elements are related in the document tree. They help a rule target elements based on where they appear relative to other elements.

This chapter covers the descendant, child, adjacent sibling, and general sibling combinators. A combinator does not change the HTML or create a relationship. It describes a relationship that must already exist in the document for the selector to match.

## The document tree

HTML elements form a tree. An element inside another element is its descendant. An element directly inside another element is its child. Elements with the same direct parent are siblings.

```html
<article class="card">
  <h2>Account</h2>
  <p>Profile details</p>
  <div class="actions">
    <p>Manage your profile</p>
  </div>
</article>
```

In this example:

- The `<h2>`, first `<p>`, and `<div>` are children of the `<article>`.
- Both paragraphs are descendants of the `<article>`.
- The `<p>` inside `.actions` is not a direct child of the `<article>`.
- The `<h2>`, first `<p>`, and `<div>` are siblings because they share the article as their parent.
- The paragraph inside `.actions` is a child of the `<div>`, and is not a sibling of the `<h2>`.

These relationships determine which combinator selectors match.

## Descendant combinator

A space between two selectors is the descendant combinator. It matches an element when it is somewhere inside an element matched by the selector to its left:

```css
.card p {
  color: slategray;
}
```

This matches every paragraph anywhere inside an element with the `card` class. It matches both paragraphs in the example, including the one nested inside `.actions`.

The matching paragraph can be a direct child or nested several levels deep. The whitespace between the selectors means “inside, at any depth.”

Use a descendant selector when the relationship may include intervening elements. Keep the relationship meaningful and avoid making selectors unnecessarily long or tightly dependent on the exact nesting of the page.

## Child combinator

The greater-than sign (`>`) is the child combinator. It matches only an element that is a direct child of the element matched by the selector to its left:

```css
.card > p {
  color: slategray;
}
```

This matches the first paragraph in the example because it is directly inside `.card`. It does not match the paragraph inside `.actions`, because that paragraph's direct parent is the `<div>`.

Use the child combinator when direct placement matters. If the target is nested more deeply, the selector will not match it.

## Adjacent sibling combinator

The plus sign (`+`) is the adjacent sibling combinator. It matches the second element when it immediately follows the first as a sibling under the same parent:

```css
h2 + p {
  margin-top: 0;
}
```

This matches a paragraph immediately after an `h2` when both share the same parent. It does not match a paragraph separated from the heading by another element, and it does not reach into a nested child.

Whitespace in the HTML source does not break adjacency. For example, a newline or indentation between an `h2` and a `p` is text formatting in the source, not an intervening element.

Use `+` when the immediately following sibling has a special relationship to the previous element, such as the first paragraph after a heading.

## General sibling combinator

The tilde (`~`) is the general sibling combinator. It matches later siblings that share the same parent, even when other siblings appear between them:

```css
h2 ~ p {
  color: slategray;
}
```

This matches every paragraph that comes after the `h2` among its siblings under the same parent. It does not match earlier paragraphs, and it does not match paragraphs nested inside another element.

Use `~` when any later sibling should match, whether or not it is immediately adjacent.

## Compare the four relationships

| Selector | Relationship | What it matches |
| --- | --- | --- |
| `.card p` | Descendant | Paragraphs anywhere inside `.card` |
| `.card > p` | Child | Paragraphs directly inside `.card` |
| `h2 + p` | Adjacent sibling | A paragraph immediately after an `h2` under the same parent |
| `h2 ~ p` | General sibling | Paragraphs after an `h2` under the same parent |

The selector to the left of a combinator establishes the related element. The selector to the right identifies the element being matched. Order matters: `h2 + p` and `p + h2` describe different relationships.

## Combining relationships

A selector can use more than one relationship:

```css
.page > .card p {
  color: slategray;
}
```

This matches paragraphs that are descendants of an element with class `card` when that card is a direct child of an element with class `page`.

Each combinator describes the relationship between the selectors immediately around it. Use a short selector that expresses the relationship needed. If a selector becomes difficult to explain, consider adding a useful class to the target element instead of relying on a long chain of nesting.

## Commas are different from combinators

A comma separates alternatives in a selector list:

```css
h1,
h2 {
  color: navy;
}
```

A combinator connects selectors by describing a relationship:

```css
article p {
  color: slategray;
}
```

The first rule matches both heading types. The second matches paragraphs inside an article. A comma does not express a relationship, and a combinator does not mean “either selector.”

## Common mistakes

### Using a descendant selector when only direct children should match

`.card p` also matches paragraphs nested inside descendants of `.card`. Use `.card > p` when only direct child paragraphs should match.

### Assuming siblings can have different parents

Sibling combinators only relate elements with the same direct parent. A paragraph inside a nested `<div>` is not a sibling of a heading outside that `<div>`.

### Confusing `+` and `~`

`h2 + p` matches only the immediately following paragraph sibling. `h2 ~ p` can match any later paragraph sibling, even if other elements come between them.

### Reversing the relationship

`h2 + p` looks for a paragraph after a heading. It does not match a heading after a paragraph. The order of selectors describes the order of the relationship.

### Treating source indentation as an element

Line breaks and indentation between tags do not insert HTML elements. Adjacency is about neighboring element siblings, not whether the tags are on the same line in the source.

### Making selectors depend on unnecessary nesting

A long chain can stop matching if the markup structure changes. Use only the relationships needed to express the design intent.

## Try it yourself

Use this structure to predict what each selector matches before checking it in a browser:

```html
<section class="panel">
  <h2>Overview</h2>
  <p>First paragraph.</p>
  <ul>
    <li>One item</li>
  </ul>
  <p>Second paragraph.</p>
  <div>
    <p>Nested paragraph.</p>
  </div>
</section>
```

1. Write a selector that matches every paragraph inside `.panel`.
2. Write a selector that matches only paragraphs that are direct children of `.panel`.
3. Write a selector that matches only the first paragraph after the `h2`.
4. Write a selector that matches all later paragraph siblings of the `h2`.
5. Explain why the nested paragraph is a descendant of `.panel` but not its direct child or sibling of the `h2`.
6. Insert a new paragraph between the heading and first paragraph. Predict how the `+` and `~` selectors change their matches.

## Key points

- Combinators describe relationships between elements in the document tree.
- A space matches descendants at any depth.
- `>` matches direct children only.
- `+` matches the immediately following sibling under the same parent.
- `~` matches later siblings under the same parent, even when other siblings come between them.
- Selector order matters, and sibling combinators do not match nested elements.
- Combinators select based on existing structure. They do not change HTML meaning or create elements.
- Keep selectors clear and use only the relationships needed.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [05 - CSS selector basics](05-selector-basics.md) | [Q&A](../qnas/06-combinators-and-selector-relationships.md) | [Example](../examples/06-combinators-and-selector-relationships.md) | [07 - Attribute selectors](07-attribute-selectors.md) |
