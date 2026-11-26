# 18 - Margin and Padding

Margin and padding both create space around content, but they create it in different places. Padding adds space inside a box's border. Margin adds space outside the border.

This chapter explains how to choose between them, use their shorthand and logical properties, and understand why adjacent vertical margins sometimes collapse instead of adding together.

## Padding is inner space

Padding separates an element's content from its border. It is part of the box, and the element's background is painted behind it.

~~~css
.notice {
  padding: 1rem;
  background: #e0f2fe;
}
~~~

The text sits 1rem away from each edge inside the notice. Padding is useful for:

- Adding breathing room inside a card or panel
- Keeping text away from a border
- Making a button easier to tap by increasing its inner box
- Building consistent component spacing

Padding cannot be negative. It does not collapse with the padding of another box.

## Margin is outer space

Margin creates transparent space outside the border. It separates a box from nearby boxes.

~~~css
.notice {
  margin-block: 1rem;
}
~~~

This adds space before and after the notice in the block direction. Margin is useful for:

- Separating one component from another
- Controlling the space around a heading or paragraph
- Centering a constrained block with automatic inline margins
- Creating deliberate overlap with a negative margin

Margin does not receive the element's background. The parent's background shows through the margin area.

Margins can be negative. A negative margin pulls boxes closer together and may make them overlap, so use it only when that layout is intentional.

## Compare the two

~~~css
.card {
  margin: 1rem;
  padding: 1.25rem;
  border: 1px solid #94a3b8;
  background: #ffffff;
}
~~~

The margin creates transparent space outside the card's border. The padding creates space inside the card, between its content and border. The white background fills the content and padding areas and extends beneath the border by default.

Under `box-sizing: content-box`, padding adds to the visible border-box size. Under `box-sizing: border-box`, padding uses space inside the declared width or height. Margin stays outside in both models. The box-model chapter explains the full size calculations.

## Set each side individually

Physical longhand properties name the four sides directly:

~~~css
.panel {
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1.5rem;
  margin-left: 2rem;

  padding-top: 1rem;
  padding-right: 1.25rem;
  padding-bottom: 1rem;
  padding-left: 1.25rem;
}
~~~

Physical properties can be easy to read in a horizontal, left-to-right page. They do not automatically follow a different writing direction.

## Shorthand values

Both `margin` and `padding` accept one to four values. The values map to sides in the same way:

| Values | Side assignment |
| --- | --- |
| One | All four sides |
| Two | Top and bottom, then right and left |
| Three | Top, right and left, then bottom |
| Four | Top, right, bottom, then left |

For example:

~~~css
.example {
  margin: 1rem 2rem 3rem 4rem;
  padding: 0.5rem 1rem 1.5rem 2rem;
}
~~~

Four values follow a clockwise order starting from the top: top, right, bottom, left.

A two-value shorthand is a common way to set vertical and horizontal spacing:

~~~css
.card {
  margin: 1rem auto;
  padding: 1rem 1.5rem;
}
~~~

Here, the margin is 1rem at the top and bottom, and automatic on the left and right. The padding is 1rem at the top and bottom, and 1.5rem on the left and right.

### Shorthand can reset earlier values

A shorthand sets every side that it represents. If a later shorthand follows a longhand, the shorthand may replace the earlier side value:

~~~css
.card {
  padding-left: 2rem;
  padding: 1rem;
}
~~~

The final padding on the left is 1rem because the shorthand sets all four sides. Place declarations in the intended order or use longhands when only one side should change.

## Center a block with auto margins

When a block has a constrained width and room remains on both sides, automatic left and right margins can share that space:

~~~css
.article {
  width: 100%;
  max-width: 68rem;
  margin-inline: auto;
}
~~~

On a wide containing block, the article stops at 68rem and the remaining inline space is divided between its margins. On a narrow containing block, it can shrink to fit.

For normal blocks, `margin-block: auto` does not generally center the element vertically in normal flow. Vertical auto margins resolve differently there. Flexbox and Grid have their own alignment rules, covered in later chapters.

## Margin collapsing

In normal block flow, adjacent vertical margins can collapse into one margin. This means the visible gap may not be the sum of both values.

### Two positive margins

~~~css
.first {
  margin-bottom: 24px;
}

.second {
  margin-top: 16px;
}
~~~

If these are in-flow block siblings in the same block formatting context with nothing separating their margins, the gap is 24px, not 40px. For positive margins, the larger adjoining margin wins.

Horizontal margins do not collapse.

### Negative margins

When positive and negative vertical margins collapse together, the largest positive margin is reduced by the most negative margin:

~~~css
.first {
  margin-bottom: 24px;
}

.second {
  margin-top: -8px;
}
~~~

The resulting collapsed margin is 16px. If all adjoining margins are negative, the most negative value determines the result. Negative margins can pull content together or cause overlap.

### Parent and child margins

A parent's top margin can collapse with the top margin of its first in-flow block child when no border, padding, inline content, or other separator keeps them apart. The parent's bottom margin can similarly collapse with its last in-flow block child in qualifying cases.

This can make a child's margin appear outside its parent, which can be surprising when the parent has a background. Add appropriate padding or a border when inner spacing is intended. A parent with `display: flow-root` also establishes a formatting context that prevents its in-flow children's margins from collapsing through it.

### Where margins do not collapse

Margin collapse is limited to adjoining vertical margins in block layout. It does not happen between:

- Horizontal margins
- Flex or Grid items
- Inline-block boxes
- Absolutely positioned boxes
- Floats and surrounding boxes

Margins also do not collapse through a border or padding that separates the edges. The exact rules depend on the boxes' flow and formatting context.

## Percentage values for spacing

Percentage values for physical margins and padding use the containing block's width, including top and bottom sides:

~~~css
.card {
  margin-top: 5%;
  padding-bottom: 5%;
}
~~~

If the containing block's width is 800px, each 5% value resolves to 40px. The percentage does not switch to the containing block's height for a top margin or bottom padding.

This behavior can be useful for spacing that scales with a container's width, but it surprises people who expect vertical percentages to use height. For predictable vertical rhythm, length units such as `rem` are often clearer.

## Logical spacing properties

Logical properties describe sides by the direction of text and layout rather than by fixed physical directions:

~~~css
.card {
  margin-block: 1rem;
  margin-inline: auto;
  padding-block: 1rem;
  padding-inline: 1.5rem;
}
~~~

In common horizontal writing, block means top and bottom, while inline means left and right. In a vertical writing mode, those directions map differently.

You can also set one logical side at a time:

~~~css
.card {
  margin-block-start: 1rem;
  margin-block-end: 2rem;
  padding-inline-start: 1.25rem;
}
~~~

Logical properties are useful for reusable pages and components that may support different writing directions. More writing-mode details appear in the logical properties chapter.

## Choosing a unit

Use a unit that matches the spacing's purpose:

- `rem` gives spacing tied to the root font size and is useful for page and component rhythm.
- `em` scales with the current element's font size and can be useful for local spacing that should grow with text.
- `px` provides a fixed CSS-pixel amount and is common for fine adjustments.
- `%` scales from the containing block's width, including for top and bottom margins and padding.

Do not choose a percentage for vertical padding under the assumption that it follows the parent's height. Choose it when scaling with the containing block's width is actually intended.

## Browser default spacing

Many HTML elements appear with margins even when your own stylesheet has not set any. Browsers apply a user-agent stylesheet that gives common elements such as the body, headings, and lists default margins.

The CSS initial value of the margin properties is zero. The visible defaults come from the browser's stylesheet. A project can reset them explicitly, then add spacing where it is useful:

~~~css
body,
h1,
h2,
p {
  margin: 0;
}

h1 {
  margin-block-end: 1rem;
}

p {
  margin-block-end: 1rem;
}
~~~

A reset removes defaults, so restore deliberate spacing for readable content and clear component boundaries.

## Common mistakes

### Using padding to separate neighboring boxes

Padding adds space inside an element. To create space outside one component and before the next, use margin or the layout container's gap property.

### Using margin for space inside a colored panel

Margin is transparent and outside the border. Use padding when content needs space inside its background.

### Expecting adjacent vertical margins to add together

Adjoining positive block margins can collapse to the larger value. If the gap must be additive, use padding, a border, or a layout gap instead.

### Assuming percentages on top and bottom use height

Physical margin and padding percentages use the containing block's width, even on top and bottom sides.

### Expecting negative padding to work

Negative padding is invalid. Negative margins are allowed, but can cause overlap.

### Centering with auto margins without constraining the block

Automatic inline margins share available space only when there is space left after the block's size and other box parts are accounted for. A max-width is a common way to constrain a content column.

### Forgetting shorthand resets all sides

A later `margin` or `padding` shorthand sets every side. Check declaration order if one longhand seems to have no effect.

### Removing browser defaults without replacing useful spacing

Resetting heading, paragraph, body, and list margins can make content crowded. Add deliberate spacing back into the design.

## Try it yourself

1. Give a panel a background, border, padding, and margin. Identify the inner and outer space.
2. Use one-, two-, three-, and four-value margin shorthands. Write down the value that reaches each side.
3. Repeat the shorthand exercise with padding.
4. Put `margin-bottom: 24px` on one block and `margin-top: 16px` on the next. Measure the gap.
5. Change one of those margins to `-8px`. Describe the new gap.
6. Give a parent a background and a first child `margin-top: 2rem`. Observe whether the margin collapses through the parent. Add padding or `display: flow-root` and compare.
7. Set `padding-top: 5%` inside a 600px-wide containing block. Calculate the padding.
8. Constrain an article with `max-width` and `margin-inline: auto`. Resize the containing block.
9. Remove the browser's default heading and paragraph margins, then add deliberate spacing with logical properties.
10. Compare `padding-inline` with `padding-left` and `padding-right` in a vertical writing mode.

## Key points

- Padding creates inner space and is painted with the element's background. Margin creates transparent outer space.
- Negative margins are allowed; negative padding is invalid.
- One-to-four-value margin and padding shorthands use the same clockwise mapping.
- Auto inline margins can center a constrained block when room remains.
- Some adjoining vertical block margins collapse. Horizontal margins do not.
- Flex and Grid items, inline-blocks, floats, and absolutely positioned boxes do not collapse margins in the same way as normal block siblings.
- Percentage margins and padding on every physical side use the containing block's width.
- Logical properties such as `margin-block` and `padding-inline` follow writing direction.
- Browser default spacing comes from the user-agent stylesheet and can be replaced with deliberate project spacing.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [17 - Width, Height, and Sizing](17-width-height-and-sizing.md) | [Q&A](../qnas/18-margin-and-padding.md) | [Example](../examples/18-margin-and-padding.md) | [19 - Borders, Outlines, and Shadows](19-borders-outlines-and-shadows.md) |
