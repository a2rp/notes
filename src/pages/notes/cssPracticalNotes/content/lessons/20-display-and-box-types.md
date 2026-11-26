# 20 - Display and Box Types

The `display` property controls the boxes an element generates and how those boxes participate in layout. It can change the visual arrangement of an element without changing what that element means in the HTML document.

## The element tree and the box tree

HTML creates a document tree from elements and text. CSS layout uses boxes generated from that tree. The trees are related, but they are not identical: some elements can generate no box, and some anonymous boxes can be created to make the layout structure work.

A browser's default stylesheet assigns display values to common HTML elements. For example, headings and paragraphs normally generate block boxes, while links and emphasis normally generate inline boxes. These are stylesheet defaults. CSS can change them:

~~~css
a {
  display: block;
}
~~~

The element remains a link in the document. Its visual layout changes, but its HTML semantics and behavior as a link do not become those of a generic block element.

## Outer and inner display types

A display type has two main parts:

- The **outer display type** describes how the element's principal box participates in its parent's layout, such as in block or inline flow.
- The **inner display type** describes how the element lays out its own children.

Traditional one-keyword values combine these roles. For example, `block` is short for a block-level box with flow layout inside it. The modern two-keyword form can make the two roles explicit:

~~~css
.block-flow {
  display: block flow;
}

.inline-flow {
  display: inline flow;
}

.inline-block-container {
  display: inline flow-root;
}
~~~

The familiar `inline-block` value is the legacy single-keyword form of `inline flow-root`. You will often see the one-keyword form in existing stylesheets.

## Block boxes

A block-level box participates in block flow. In a block formatting context, it is generally arranged on its own line, with following block boxes placed below it. A block box can also be a container for block and inline content.

~~~css
.notice {
  display: block;
}
~~~

A block-level box is not guaranteed to be the full width of its parent in every context. Width constraints, margins, positioning, and layout modes can affect its size and placement. The next lesson discusses normal flow and formatting contexts in more detail.

## Inline boxes

An inline box participates in an inline formatting context, where text and inline content are arranged into line boxes. It does not normally start a new line before and after itself.

~~~html
<p>
  Read the <a href="#example">important note</a> before continuing.
</p>
~~~

The anchor can sit within the line of text. For a non-replaced inline element, `width` and `height` do not set its inline box's dimensions in the same way they do for block boxes. Vertical margins do not change the line box height. Vertical padding and borders can be painted around inline content, but they do not work like block padding that pushes surrounding lines apart.

## Inline-block boxes

An inline-block combines two behaviors:

- Outside, it participates in inline flow as one atomic item, so text can appear before or after it on the same line.
- Inside, its children use block flow, and the element accepts width, height, padding, and borders like a block container.

~~~css
.badge {
  display: inline-block;
  width: 8rem;
  padding: 0.5rem;
  border: 1px solid currentColor;
  vertical-align: middle;
}
~~~

Inline-blocks do not split across lines like ordinary inline text. If there is not enough room for the whole box, it may move to the next line. `vertical-align` can adjust its alignment relative to the line.

## Common display values

| Value | Basic behavior |
| :--- | :--- |
| `block` | Participates as a block-level box and uses flow layout for its contents. |
| `inline` | Participates in inline flow and lays out inline content. |
| `inline-block` | Participates inline as one box and lays out its contents using block flow. |
| `list-item` | Generates a principal box and a list marker. |
| `flex` | Generates a block-level flex container. |
| `inline-flex` | Generates an inline-level flex container. |
| `grid` | Generates a block-level grid container. |
| `inline-grid` | Generates an inline-level grid container. |
| `table` | Uses table layout behavior. |
| `none` | Generates no boxes for the element or its descendants. |
| `contents` | Suppresses the element's own box while its children can still generate boxes. |

Flex and Grid are introduced here as display types. Their child placement and sizing rules are covered in the Flexbox and Grid lessons.

### List items

A list item generates a principal box and a marker box. HTML list items already use this behavior by default:

~~~css
li {
  display: list-item;
}
~~~

Changing another element to `display: list-item` can give it a marker, but it does not give that element the semantics of an HTML list item. Use meaningful list markup when the content is a list.

### Table display values

CSS also provides values such as `table`, `table-row`, and `table-cell`. They make boxes participate in table layout. These values control layout; they do not turn unrelated HTML into semantically associated table markup. Use HTML table elements when the content is tabular data.

## Removing or suppressing boxes

### `display: none`

An element with `display: none` generates no box. Its descendants do not generate boxes either, even if a descendant has another display value. The hidden subtree takes up no layout space.

~~~css
.panel.is-closed {
  display: none;
}
~~~

This is different from an invisible box that still occupies space. It is also different from making text transparent: `display: none` affects the element's rendered and accessibility presentation. Do not use it for content that should remain available to assistive technology.

### `visibility: hidden`

An element with `visibility: hidden` keeps its box and its layout space, but the box is not painted as visible content. Descendants can explicitly be made visible again.

~~~css
.reserved-slot {
  visibility: hidden;
}
~~~

Use `visibility` when the box should keep its place while hidden. Use `display: none` when it should not take up space.

### `opacity: 0`

An element with zero opacity still generates its box and stays in layout. It can also remain interactive and focusable. Transparency alone is not a reliable way to hide content from users or assistive technology.

### `display: contents`

An element with `display: contents` does not generate its own principal box, while its children can continue to generate boxes as if they were placed directly in the parent's layout.

~~~css
.layout-wrapper {
  display: contents;
}
~~~

The element remains in the HTML document tree. Since accessibility support for how its semantics are represented can vary, use this value carefully on elements with meaningful roles or labels. It is not a substitute for choosing appropriate HTML structure.

## Anonymous boxes

Browsers can generate anonymous boxes when the box structure required by a formatting model does not map directly to an element. For example, plain text directly inside a block container participates in inline layout through anonymous inline boxes. Table layout can also create anonymous table boxes when required table parts are missing.

These boxes have no corresponding HTML element to select. Understanding that they exist can help explain why visible text participates in layout even when no inline element wraps it.

## Display does not change HTML meaning

CSS controls presentation and box generation. It does not change an element's document role. Setting a `div` to `display: list-item` does not make it an HTML list item; setting a link to `display: block` does not remove its link behavior.

Choose HTML elements for their meaning and use CSS display values for the layout you need. This keeps structure understandable when styles are changed or unavailable.

## Common mistakes

### Expecting inline elements to size like blocks

A non-replaced inline box does not accept width and height in the same way as a block box. Use `inline-block` or another appropriate layout mode when you need a sized box that remains inline-level.

### Using `display: none` when the element should keep its place

`display: none` removes the element and its descendants from layout. Use `visibility: hidden` when the space should remain reserved.

### Using `opacity: 0` as a complete hiding technique

A transparent element still occupies space and may still receive interaction or keyboard focus. Choose a hiding method based on the behavior needed.

### Assuming a display value changes semantics

Changing `display` affects layout, not HTML meaning. Use semantic elements for headings, lists, links, buttons, tables, and other meaningful content.

### Using `display: contents` without checking semantics

Removing an element's principal box can have accessibility consequences. Use it carefully and keep important document roles and labels available.

## Try it yourself

1. Put a `span` and a `div` inside a paragraph. Change their display values and observe where lines break.
2. Give an inline element a width and height. Change it to `inline-block` and compare.
3. Place text before and after an inline-block badge. Resize the browser until the badge moves to the next line.
4. Compare `display: none` and `visibility: hidden` by toggling each on a box between two paragraphs.
5. Set a box to `opacity: 0`. Check whether it still occupies space and can receive focus.
6. Apply `display: list-item` to a non-list element. Then compare its marker with a real `li`.
7. Add plain text and an inline element directly inside a block container. Think about the anonymous inline boxes used for the text.
8. Change a wrapper to `display: contents` and inspect the visual layout, then consider whether removing its box is appropriate for that element.

## Key points

- Display controls box generation and layout participation, not HTML semantics.
- Outer display describes how a principal box participates in its parent layout; inner display describes how it lays out its children.
- Block boxes participate in block flow. Inline boxes participate in line layout.
- Inline-blocks act as one inline item outside and a block container inside.
- Flex and Grid are inner layout models paired with block or inline outer behavior.
- List items generate a marker as well as a principal box.
- `display: none` removes the element and descendant boxes from layout.
- `visibility: hidden` keeps layout space, while `opacity: 0` keeps a transparent box.
- `display: contents` removes the element's own box but keeps child boxes.
- Browsers can generate anonymous boxes that do not correspond to HTML elements.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [19 - Borders, Outlines, and Shadows](19-borders-outlines-and-shadows.md) | [Q&A](../qnas/20-display-and-box-types.md) | [Example](../examples/20-display-and-box-types.md) | [21 - Normal Flow and Formatting Contexts](21-normal-flow-and-formatting-contexts.md) |
