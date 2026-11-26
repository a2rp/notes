# 36 - Lists and markers

HTML lists provide structure for related items, sequences, and term-description pairs. CSS can change their markers, position, and spacing while the HTML keeps the list's meaning.

## Learning outcomes

After this chapter, you should be able to:

- Choose an unordered list, ordered list, or description list for the content.
- Style list markers with `list-style-type`, `list-style-image`, and `::marker`.
- Control marker placement with `list-style-position`.
- Use the `list-style` shorthand and avoid styling nested lists accidentally.
- Adjust list spacing with logical properties.
- Keep list structure and item order meaningful when changing the appearance.

## Choose the list for the content

Use the HTML element that matches the relationship between the items:

- `<ul>` is for a group where the order does not matter, such as ingredients or features.
- `<ol>` is for a sequence or ranking where the order matters, such as instructions.
- `<dl>` is for terms and their descriptions or name-value groups, using `<dt>` and `<dd>`.

~~~html
<ul>
  <li>Notebook</li>
  <li>Pen</li>
</ul>

<ol>
  <li>Mix the dry ingredients.</li>
  <li>Add water and stir.</li>
</ol>

<dl>
  <dt>Shipping</dt>
  <dd>Delivery to your address</dd>
  <dt>Pickup</dt>
  <dd>Collecting an order from a local point</dd>
</dl>
~~~

Choose semantics based on the content, not on whether you prefer bullets or numbers. CSS can change the appearance, but it does not change which items are steps or whether their order matters.

## List markers

A list marker is the bullet, number, or other symbol shown for a list item. Browsers provide default markers for `<ul>` and `<ol>`. The `list-style-type` property selects a text marker or numbering style:

~~~css
.features {
  list-style-type: square;
}

.steps {
  list-style-type: decimal;
}

.roman-numerals {
  list-style-type: upper-roman;
}
~~~

Common unordered marker values include `disc`, `circle`, `square`, and `none`. Common ordered styles include `decimal`, `decimal-leading-zero`, `lower-alpha`, `upper-alpha`, `lower-roman`, and `upper-roman`.

Ordered list numbering is generated from the list's item sequence. Use HTML's ordered-list features when the list has a meaningful starting value or item-specific numbering. Do not type numbers into each list item just to imitate an ordered list.

## Position the marker

`list-style-position` controls where the marker appears relative to the list item's content:

~~~css
.outside-marker {
  list-style-position: outside;
}

.inside-marker {
  list-style-position: inside;
}
~~~

`outside` is the default. The marker sits outside the principal content box, so when an item wraps, later lines generally align with the item's text.

With `inside`, the marker participates in the content's first line. Wrapped lines start at the item's content edge and may align differently from the first line. This can be useful for compact lists, but check long items and nested lists.

## The list-style shorthand

`list-style` sets the marker type, optional image, and marker position together:

~~~css
.task-list {
  list-style: square inside;
}
~~~

A marker image can be provided with `list-style-image`:

~~~css
.image-marker {
  list-style-image: url("../images/marker.svg");
  list-style-type: disc;
}
~~~

The browser can fall back to the text marker if the image is unavailable. Keep a useful `list-style-type` value when using an image marker.

To remove the default marker:

~~~css
.navigation-list {
  list-style: none;
}
~~~

Removing a marker does not remove the list's HTML items or their relationships. Make sure the list still looks like a group and remains usable without color or decoration alone.

## Style the marker with ::marker

The `::marker` pseudo-element targets the marker generated for a list item. It can style the marker separately from the item text:

~~~css
.steps li::marker {
  color: #176b55;
  font-weight: 700;
}
~~~

The marker accepts text-related properties such as `color` and font properties. Its layout styling is limited: properties such as padding, background, and border do not work on it like they do on a normal box.

The `content` property can replace a marker's text:

~~~css
.checklist li::marker {
  content: "✓  ";
  color: #176b55;
}
~~~

Use a decorative marker that supports the content. Do not use a symbol as the only way to communicate whether a task is complete or what the item means. Keep that information in the HTML text as well.

For a more complex marker design with a box, background, or icon layout, add a dedicated child element inside each `<li>` and style that element. Keep the surrounding list semantic.

## Style nested lists deliberately

Nested lists are common, but broad selectors can accidentally apply the outer style to every nested list. Select the list containers by type or direct relationship:

~~~css
ul {
  list-style-type: disc;
}

ul ul {
  list-style-type: circle;
}

ol {
  list-style-type: decimal;
}
~~~

If a specific class should apply only to the outer list, use a direct-child selector:

~~~css
ul.feature-list {
  list-style-type: square;
}

ul.feature-list > li {
  margin-block: 0.5rem;
}
~~~

A rule such as `ul li { list-style-type: square; }` can affect list items at every nested level. Styling the list container is often simpler because list-style properties are inherited.

## Spacing and indentation

List spacing usually comes from the list's padding and the margins between items. Prefer logical properties when the spacing should follow the writing direction:

~~~css
.article-list {
  padding-inline-start: 1.5rem;
}

.article-list > li + li {
  margin-block-start: 0.5rem;
}
~~~

`padding-inline-start` creates the marker gutter at the start side of the list. `margin-block-start` adds space above each later item. These properties adapt across writing directions and writing modes.

The exact marker gutter varies by browser and marker style. If the text looks cramped or misaligned, adjust the list's logical padding rather than forcing each marker into a fixed physical position.

## Description lists

A description list has no bullet or numbering by default. Style its term-description groups based on their meaning:

~~~css
.glossary {
  display: grid;
  grid-template-columns: minmax(8rem, 1fr) 2fr;
  gap: 0.75rem 1rem;
}

.glossary dt {
  font-weight: 700;
}

.glossary dd {
  color: #465366;
}
~~~

For a narrow screen, a single-column layout may be easier to read:

~~~css
@media (max-width: 36rem) {
  .glossary {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .glossary dd {
    margin-block-end: 0.75rem;
  }
}
~~~

Use `<dl>` only when the terms and descriptions form meaningful pairs or groups. It is not a generic layout container.

## Common mistakes

| Mistake | Why it causes trouble | Better approach |
| :--- | :--- | :--- |
| Using `<ul>` for steps whose order matters | The markup does not identify the sequence | Use `<ol>` |
| Typing numbers into unordered list text | Numbering does not update when items move | Use an ordered list |
| Removing markers without preserving the group appearance | Items can stop looking related | Keep spacing and structure clear |
| Styling every nested `li` with one broad rule | The inner list may inherit the outer marker style | Style list containers and direct children |
| Using an image as the only marker and omitting a fallback | The marker can disappear when the image is unavailable | Set a useful `list-style-type` fallback |
| Expecting padding or borders to work on `::marker` | Marker boxes support a limited set of properties | Add a child element for complex marker layouts |
| Using `<dl>` just to position unrelated content | The markup implies term-description relationships | Use layout elements that match the content |

## Try it yourself

1. Change an unordered list from `disc` to `circle` and then `square`.
2. Change an ordered list to `upper-roman` and compare it with `decimal`.
3. Compare `list-style-position: inside` and `outside` with a long item that wraps.
4. Style the marker color and weight with `::marker` while leaving item text unchanged.
5. Add a nested list and make its markers different from the outer list.
6. Turn a list of names and definitions into a `<dl>` and style it as one column on a narrow screen.

## Key points

- Use `<ul>` for unordered groups, `<ol>` for meaningful sequences, and `<dl>` for terms and descriptions.
- CSS marker styles affect appearance, not the meaning of the HTML structure.
- `list-style-position` controls how markers relate to wrapped item text.
- `::marker` supports marker text styling, but not every box property.
- Use logical padding and margins for list spacing.
- Style nested lists intentionally and provide a fallback for image markers.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [35 - Text layout, spacing, and wrapping](35-text-layout-and-wrapping.md) | [Q&A](../qnas/36-lists-and-markers.md) | [Example](../examples/36-lists-and-markers.md) | [37 - Styling tables](37-styling-tables.md) |
