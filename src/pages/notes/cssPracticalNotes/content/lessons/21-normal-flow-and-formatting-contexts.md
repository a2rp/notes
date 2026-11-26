# 21 - Normal Flow and Formatting Contexts

Normal flow is the default way CSS places in-flow boxes. Block and inline content participate in formatting contexts that determine how boxes are arranged, how lines wrap, and how margins interact. Floats and positioned boxes can change or leave that flow, which is why understanding the default behavior makes later layout rules easier to learn.

## What normal flow means

When an element is not floated or absolutely positioned, its box generally participates in normal flow. The browser uses the element's display type and its containing formatting context to place it relative to other in-flow content.

In a block formatting context, block-level boxes are laid out vertically in source order. Inside a block container, inline-level content is arranged into lines in an inline formatting context.

Relative positioning can visually offset a box after its normal-flow position is calculated. The original space remains reserved. Floats and absolutely positioned boxes use different positioning behavior and are covered in later chapters.

## Block formatting contexts

A block formatting context, or BFC, lays out block boxes vertically, one after another. In a left-to-right context their left outer edges usually align with the containing block's left edge, unless properties such as margins or floats affect the result.

~~~css
.article {
  display: flow-root;
}
~~~

The `flow-root` value makes the element establish a new BFC for its contents while using ordinary block flow inside it.

A BFC is a layout boundary. Among its useful effects:

- Its in-flow children are laid out as block boxes within that context.
- Its height includes its floated descendants.
- Its in-flow child margins do not collapse through the BFC root.
- Its border box does not overlap floats belonging to the same surrounding BFC.

A BFC does not create a stacking context by itself. It controls formatting interactions, such as float and margin behavior. Stacking and paint order are covered separately.

### What can establish a BFC?

Common ways to establish a BFC include:

- `display: flow-root`.
- A float.
- An absolutely positioned box.
- An inline-block.
- A table cell or table caption.
- A block box with overflow other than `visible` or `clip`, in contexts where that overflow establishes a BFC.
- A flex or grid container establishes its own formatting context for its children, though that context is Flexbox or Grid rather than a BFC.

For ordinary flow content, `display: flow-root` clearly expresses the intent to create a new block formatting context. Older code often uses `overflow: hidden` or `overflow: auto` to trigger one, but those values can also clip content or create scrolling behavior. `overflow: clip` does not establish a BFC by itself.

## Inline formatting contexts

An inline formatting context, or IFC, is formed inside a block container whose in-flow content is inline-level. Text and inline boxes are arranged horizontally into line boxes. When content does not fit, it wraps onto another line.

~~~html
<p>
  This sentence contains <strong>emphasized words</strong> and a link.
</p>
~~~

The text, strong element, and link participate in the same inline layout. A line box's height depends on its contents, line height, and vertical alignment. Inline boxes can align by their baselines or other vertical alignment rules.

A block-level child interrupts inline content. The inline runs before and after it are laid out separately around that block child.

## Vertical margins in a BFC

Adjacent vertical margins of in-flow block boxes can collapse within the same BFC. Their margins do not always add together. A child's margin does not collapse through a BFC root with margins outside it. The BFC root's own outer margins can still interact with sibling margins in the parent context.

~~~css
.first {
  margin-bottom: 2rem;
}

.second {
  margin-top: 1rem;
}
~~~

If these are adjoining normal-flow block siblings in one BFC, their shared gap is 2rem, not 3rem. This is margin collapsing, covered in the previous chapter. A child margin does not collapse through a BFC root with margins outside it. The BFC root's own outer margins can still collapse with adjacent sibling margins in its parent context.

Creating a BFC around a child can stop that child's top or bottom margin from collapsing through the new BFC root. The root's own outer margins can still interact with neighboring boxes under normal margin rules.

## Floats and normal flow

A float is shifted to one side and taken out of normal flow. Inline content in the same BFC can flow alongside it, while ordinary block boxes continue to be laid out as though the float did not occupy their normal-flow position.

~~~css
.photo {
  float: left;
  width: 12rem;
  margin: 0 1rem 1rem 0;
}
~~~

Text can wrap beside the floated image. A later block's line boxes can also be shortened beside the float. The float does not automatically make its parent tall enough to contain it.

The `clear` property makes a block move below specified earlier floats:

~~~css
.article-end {
  clear: both;
}
~~~

A new BFC is often a cleaner way to contain a float inside a wrapper. The float remains a float, but the BFC root accounts for its contents when calculating its own height.

## Normal flow and out-of-flow boxes

Most boxes take part in the order of normal flow. Floats and absolutely positioned boxes do not take up space in the same way as ordinary in-flow siblings. Fixed positioning is a form of absolute positioning relative to a viewport or other containing block established by CSS.

Relative positioning is different: the browser first lays out the box in normal flow, then paints it offset from that position. The space at its original location remains reserved.

~~~css
.nudged {
  position: relative;
  top: 0.5rem;
  left: 1rem;
}
~~~

Detailed float behavior and positioning rules are covered in their later lessons.

## Formatting contexts are independent layout areas

A formatting context defines how a group of boxes interact during layout. A BFC keeps its internal block layout interactions separate from surrounding formatting contexts. Inline formatting contexts lay out text and inline boxes inside block containers. Flexbox and Grid use their own formatting contexts.

Creating a context can change how floats, margins, and contents interact, even if the visible styles on each child stay the same. Use it when the layout boundary is part of the design, and prefer the property whose meaning matches the goal.

## Common mistakes

### Assuming every block box contains its floats

Floats are out of normal flow, so a plain block's auto height might not include them. Establish a BFC with `display: flow-root` when a wrapper should contain its floated children.

### Using overflow only to clear floats

`overflow: hidden` can establish a BFC, but it may clip shadows, menus, or other overflowing content. `overflow: auto` can add scrollbars. Use `display: flow-root` when the goal is simply a new block formatting context.

### Expecting margins to collapse through a BFC

A BFC root isolates its in-flow child margins. When a margin appears not to collapse as expected, check whether one of the boxes establishes a new formatting context.

### Thinking a BFC is a stacking context

A BFC affects layout interactions. It does not by itself establish a stacking context or determine the paint order of positioned descendants.

### Treating relative positioning as removal from flow

Relative positioning offsets the painted box, but its original position remains in the layout. Later content does not move into that reserved space.

## Try it yourself

1. Put two paragraphs inside a block container and observe their normal vertical order.
2. Add inline text and a strong element inside one paragraph. Resize the browser and watch the text wrap into line boxes.
3. Float an image-shaped box to the left and write enough text to wrap alongside it.
4. Place a normal-flow block after the float and compare its border box with the shortened line boxes around the float.
5. Add `clear: both` to a later block and observe where it moves.
6. Remove the clear rule, set the wrapper to `display: flow-root`, and observe whether the wrapper contains its float.
7. Give a child a top margin. Compare its behavior inside a normal block and inside a `flow-root`.
8. Temporarily replace `display: flow-root` with `overflow: hidden`. Check what else that overflow value could affect.
9. Offset a relatively positioned box and check whether its original space remains.
10. Compare a BFC with a Grid container. They both establish formatting contexts, but their child layout rules differ.

## Key points

- Normal flow places in-flow boxes according to block and inline formatting.
- A BFC lays out block boxes vertically and contains specific float and margin interactions.
- An IFC arranges text and inline boxes into line boxes.
- `display: flow-root` is a clear way to establish a BFC.
- Floats leave normal flow and allow inline content to wrap beside them.
- `clear` moves a block below relevant earlier floats.
- Relative positioning keeps the box's original normal-flow space.
- A BFC is a layout boundary, not automatically a stacking context.
- Flexbox and Grid establish their own formatting contexts.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [20 - Display and Box Types](20-display-and-box-types.md) | [Q&A](../qnas/21-normal-flow-and-formatting-contexts.md) | [Example](../examples/21-normal-flow-and-formatting-contexts.md) | [22 - Positioning Elements](22-positioning.md) |
