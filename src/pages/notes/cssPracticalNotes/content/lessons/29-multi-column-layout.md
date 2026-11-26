# 29 - Multi-column Layout

CSS multi-column layout flows one continuous stream of content into newspaper-style columns. It is useful for long prose, reference entries, glossaries, and other content whose reading order stays the same as its source order.

This chapter explains how the browser chooses column widths and counts, how to style and balance columns, how to control breaks, and when multi-column layout is a good fit.

## What you will learn

- How multi-column layout differs from Grid and Flexbox.
- How `column-width`, `column-count`, and `columns` define columns.
- How to set column gaps and rules.
- How balancing and sequential filling work.
- How to request breaks or keep content together.
- How `column-span` makes a heading span all columns.
- How to keep multi-column content readable and responsive.

## How multi-column layout works

Set `column-width`, `column-count`, or both on a block container to create a multi-column formatting context. Its in-flow content continues in normal document order, and the browser fragments that flow into column boxes.

~~~css
.article-copy {
  column-width: 22em;
  column-gap: 2rem;
}
~~~

The browser lays out the first column, then continues the content in the next column. The number and width of columns adapt to the available inline size when you use `column-width`.

This differs from Grid and Flexbox. Those layout models place child boxes as items in tracks or along an axis. Multi-column layout keeps a continuous flow of text and breaks that flow into columns. The elements remain in document order.

### Choose multi-column layout for flowing content

Multi-column layout is a useful fit for:

- Long article text.
- Glossary terms and definitions.
- Compact reference lists.
- Editorial or print-like content.

Grid or Flexbox is usually a better fit when each child is an independent card, when rows need to line up, or when you need to control the position of specific items. With multi-column layout, you do not assign a particular child to a particular column.

## Choose a column width or count

### Set an ideal column width

`column-width` describes the preferred or ideal inline size of a column. The browser determines how many columns fit. The actual width may be adjusted to use the available space, and it may become narrower when the container cannot fit the preferred width.

~~~css
.glossary {
  column-width: 20em;
  column-gap: 2rem;
}
~~~

This is a useful starting point for responsive text. As the container becomes wider, more columns can fit. As it becomes narrower, the browser creates fewer columns.

The width is an ideal target, not a promise that every column will have exactly that width. If you need an exact number of columns at a particular screen size, consider a media query or use `column-count`.

### Set a preferred number of columns

`column-count` specifies the preferred number of columns. The browser divides the available inline space between that many columns.

~~~css
.article-copy {
  column-count: 2;
  column-gap: 2rem;
}
~~~

A fixed count can make columns too narrow on small screens. Use a responsive fallback when needed.

~~~css
.article-copy {
  column-count: 2;
  column-gap: 2rem;
}

@media (max-width: 42rem) {
  .article-copy {
    column-count: 1;
  }
}
~~~

### Use the `columns` shorthand

`columns` sets `column-width`, `column-count`, or both:

~~~css
.article-copy {
  columns: 2 20em;
}
~~~

Here the count is 2 and the ideal width is 20em. When both values are supplied, the count acts as a maximum number of columns. The width and count values can be written in either order, but choosing one consistent order makes the declaration easier to scan.

If you specify only a number, it sets the count. If you specify only a length, it sets the width.

~~~css
.two-columns {
  columns: 2;
}

.responsive-columns {
  columns: 20em;
}
~~~

Avoid using `columns` as a general styling shortcut if you only mean to update one longhand. It resets the omitted `column-width` or `column-count` value to its initial value.

## Set the gap and rule

`column-gap` sets the space between neighboring columns. Its default is `normal`, which browsers generally render as a text-relative gap.

~~~css
.article-copy {
  column-width: 22em;
  column-gap: 2rem;
}
~~~

`column-rule` draws a line in the middle of each gap:

~~~css
.article-copy {
  column-width: 22em;
  column-gap: 2rem;
  column-rule: 1px solid #b8c4d2;
}
~~~

The rule shorthand accepts width, style, and color values. The rule is decorative. It does not take up space or change the column positions. Use padding or a larger gap when the text needs more separation.

The rule can also be set with longhands:

~~~css
.article-copy {
  column-rule-width: 1px;
  column-rule-style: solid;
  column-rule-color: #b8c4d2;
}
~~~

A rule is drawn only between columns in the same multi-column line. It does not create an outside border around the container.

## Balance or fill columns sequentially

`column-fill` controls how content is distributed vertically when the multi-column container has a constrained block size.

- `balance` tries to make the columns approximately equal in length. This is the default behavior in common unconstrained layouts.
- `auto` fills columns sequentially. Earlier columns are filled before later ones.

~~~css
.article-copy {
  column-count: 3;
  block-size: 28rem;
  column-fill: balance;
}
~~~

A constrained block size gives the browser a column height to work with. Without a useful height constraint, `column-fill` may not produce the visual difference you expect. With `auto` in a container with a definite block size, content fills columns sequentially. If it all fits into the first column, later columns can remain empty.

For ordinary article text, balanced columns often look natural. Sequential filling can help when a design has a known height or when content should proceed from the start of one column to the next.

## Control breaks inside content

The browser decides where content breaks between columns. Break properties let you express preferences.

~~~css
.article-copy h2 {
  break-after: avoid-column;
}

.article-copy figure,
.article-copy blockquote {
  break-inside: avoid-column;
}
~~~

- `break-before: column` requests a break before an element.
- `break-after: column` requests a break after an element.
- `break-inside: avoid-column` asks the browser to avoid splitting an element across columns.
- `break-before: avoid-column` and `break-after: avoid-column` ask the browser to avoid a nearby column break.

These values are requests within the fragmentation rules. If an element is taller than a column, it cannot fit intact, so the browser may still need to split it. Keeping a short heading with its following text can prevent a heading from being left alone at the bottom of a column.

Avoid adding forced breaks to every section. Content length and available width change between screens, so excessive forced breaks can leave awkward blank areas.

## Make an element span all columns

`column-span: all` makes an in-flow block-level element span across the columns in its multi-column container.

~~~css
.article-copy h2 {
  column-span: all;
}
~~~

A spanning heading creates a full-width interruption in the column flow. Content before it appears above the heading, and later content continues below it in columns.

Use this for a major heading or callout that belongs between two portions of the same article. The spanning element must participate in the multicol flow. A deeply nested element may not span the outer container as expected, so keep a spanner at the appropriate level in the document structure.

`column-span: none` is the initial behavior, which keeps an element within the normal column flow.

## Responsive and readable columns

Multi-column layout responds to the width of its container, but the result still needs a readable line length.

~~~css
.article-copy {
  max-inline-size: 72rem;
  margin-inline: auto;
  column-width: 22em;
  column-gap: 2rem;
}

@media (max-width: 38rem) {
  .article-copy {
    columns: auto;
  }
}
~~~

The width-based layout allows the number of columns to follow the available room. The narrow-screen rule disables the multi-column layout by resetting both the count and width through `columns: auto`.

Keep these practices in mind:

- Start with a comfortable ideal column width instead of a large fixed count.
- Use a one-column layout at narrow widths when columns become cramped.
- Keep the source and keyboard order meaningful. CSS columns do not change the DOM order.
- Avoid multi-column layout for forms, menus, step-by-step instructions, or content where readers must compare items across rows.
- Check images, tables, long URLs, and other wide content. Constrain them to the column or allow long text to wrap.
- Use headings and semantic HTML so the content remains understandable without the visual columns.

For example, a wide image can be constrained to its column:

~~~css
.article-copy img {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
}
~~~

For long unbroken strings, allow wrapping where appropriate:

~~~css
.article-copy {
  overflow-wrap: anywhere;
}
~~~

## Common patterns

### Responsive article text

~~~css
.article-copy {
  column-width: 22em;
  column-gap: 2rem;
  column-rule: 1px solid #d2d8e0;
}

@media (max-width: 38rem) {
  .article-copy {
    columns: auto;
  }
}
~~~

The browser chooses a suitable column count while preserving the preferred reading measure. The media query switches to one column when the viewport becomes narrow.

### Two balanced columns for a fixed-width panel

~~~css
.summary-panel {
  column-count: 2;
  column-fill: balance;
  column-gap: 1.5rem;
  block-size: 24rem;
}
~~~

A fixed block size gives balancing a known area. Check the result when the content changes, because equal columns depend on the amount and shape of the text.

### Keep a card-like callout together

~~~css
.article-copy .callout {
  break-inside: avoid-column;
}
~~~

This asks the browser to keep the callout in one column when it can. If the callout is taller than the column, it may still need to fragment.

### Full-width section heading

~~~css
.article-copy h2 {
  column-span: all;
}
~~~

The heading spans across the multicol container and separates the text flow before and after it.

## Troubleshooting

| Symptom | Likely cause | What to check |
| :--- | :--- | :--- |
| Columns are too narrow | A large fixed count or a small container | Prefer a width target or reduce the count at a breakpoint |
| The count changes as the container grows | `column-width` is being used as an ideal width | This is expected; choose a fixed count if the count must stay stable |
| The text looks uneven | The content is being filled sequentially or has forced breaks | Check `column-fill` and remove unnecessary forced breaks |
| A heading stays in one column | It does not span the multicol container | Use `column-span: all` on an appropriate in-flow block |
| A figure breaks between columns | The browser can not keep it intact in the available space | Request `break-inside: avoid-column` and check the figure's height |
| A line appears too close to text | The rule is centered in the gap | Increase `column-gap`; the rule itself does not reserve space |
| A wide image extends beyond a column | The image has an unconstrained inline size | Use `max-inline-size: 100%` and `block-size: auto` |

## Practice

1. Apply `column-width: 22em` to a long article and resize the viewport. Note when the number of columns changes.
2. Change the example to `column-count: 2` and compare how the column width responds.
3. Add a `column-rule` and increase the gap independently.
4. Set a fixed block size and compare `column-fill: balance` with `column-fill: auto`.
5. Keep a short figure together with `break-inside: avoid-column`. Then make it taller than one column and observe the fallback.
6. Make one section heading span all columns with `column-span: all`.
7. At a narrow breakpoint, switch the article to one column and check that images remain inside the text measure.

## Key points

- Multi-column layout fragments one continuous content flow into columns.
- `column-width` sets an ideal width; the browser chooses how many columns fit.
- `column-count` sets a preferred count; widths adapt to the available inline space.
- `columns` is the shorthand for count and width.
- `column-gap` sets the space between columns. `column-rule` draws a decorative line in that space.
- `column-fill` balances or sequentially fills columns when the block size is constrained.
- Break properties express preferences and can not keep content together when it is larger than a column.
- `column-span: all` makes an in-flow block span all columns and interrupts the column flow.
- Source order remains important. Use columns for flowing content, not independent card placement.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [28 - Alignment and Gaps](28-alignment-and-gaps.md) | [Q&A](../qnas/29-multi-column-layout.md) | [Example](../examples/29-multi-column-layout.md) | [30 - Responsive Design and Media Queries](30-responsive-design-and-media-queries.md) |
