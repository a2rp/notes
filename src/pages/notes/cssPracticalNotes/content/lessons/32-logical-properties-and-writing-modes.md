# 32 - Logical Properties and Writing Modes

CSS logical properties describe layout relative to the direction that content flows. They let the same component adapt to left-to-right text, right-to-left text, and vertical writing without rewriting every left, right, top, and bottom declaration.

## Learning outcomes

After this chapter, you should be able to:

- Explain the inline and block axes.
- Map logical directions to physical edges in common writing modes.
- Use logical sizing, spacing, borders, and positioning properties.
- Tell `direction` apart from `writing-mode`.
- Mark text direction in HTML and handle mixed-direction content.
- Choose when a physical property is still the right choice.

## Physical and logical directions

Physical properties name fixed sides of the screen: `top`, `right`, `bottom`, and `left`. Logical properties name positions relative to the flow of text.

The main logical directions are:

- `inline-start` and `inline-end` describe where text starts and ends along a line.
- `block-start` and `block-end` describe where one line or block begins and ends in the block flow.
- `inline-size` measures along a line of text.
- `block-size` measures in the direction that lines or blocks stack.

The exact physical mapping depends on the writing mode and direction.

| Writing mode | Direction | Inline start to end | Block start to end |
| :--- | :--- | :--- | :--- |
| `horizontal-tb` | `ltr` | Left to right | Top to bottom |
| `horizontal-tb` | `rtl` | Right to left | Top to bottom |
| `vertical-rl` | `ltr` | Top to bottom | Right to left |
| `vertical-rl` | `rtl` | Bottom to top | Right to left |
| `vertical-lr` | `ltr` | Top to bottom | Left to right |
| `vertical-lr` | `rtl` | Bottom to top | Left to right |

In the default horizontal left-to-right mode, inline start is the left edge, inline end is the right edge, block start is the top, and block end is the bottom. In right-to-left horizontal text, only the inline start and end swap. In vertical writing, inline size is physical height and block size is physical width.

## Why logical properties are useful

Consider a component with a colored stripe on its leading side:

~~~css
.notice {
  border-left: 0.25rem solid #2563a6;
  padding-left: 1rem;
}
~~~

Those declarations always use the physical left edge. In a right-to-left context, the leading side is the right edge instead. A logical version follows the text direction automatically:

~~~css
.notice {
  border-inline-start: 0.25rem solid #2563a6;
  padding-inline-start: 1rem;
}
~~~

The stripe and spacing now appear at inline start. The same declarations work when the element's writing mode or direction changes.

## Logical size properties

Use logical sizes when a dimension is relative to the writing flow:

| Logical property | Physical equivalent in `horizontal-tb` | What it controls |
| :--- | :--- | :--- |
| `inline-size` | `width` | Size along the inline axis |
| `block-size` | `height` | Size along the block axis |
| `min-inline-size` | `min-width` | Minimum inline dimension |
| `max-inline-size` | `max-width` | Maximum inline dimension |
| `min-block-size` | `min-height` | Minimum block dimension |
| `max-block-size` | `max-height` | Maximum block dimension |

For example, a content panel can use a logical maximum width and minimum height:

~~~css
.article {
  inline-size: min(100%, 42rem);
  min-block-size: 20rem;
}
~~~

In horizontal writing, this caps the width and sets a minimum height. In vertical writing, the same properties apply to the corresponding logical dimensions instead.

Do not assume logical size values mean the same physical direction in every writing mode. Use `width` or `height` when the design genuinely needs a fixed physical dimension, such as a specific horizontal image crop.

## Logical margin and padding

Use `margin-block` and `margin-inline` to set the start and end edges on an axis. The first value is the start side; the second is the end side. With one value, both sides on that axis get the same value.

~~~css
.card {
  margin-block: 1rem 2rem;
  margin-inline: auto;
  padding-block: 1.25rem;
  padding-inline: 1.5rem;
}
~~~

In the default horizontal mode:

- `margin-block: 1rem 2rem` means a 1rem top margin and a 2rem bottom margin.
- `margin-inline: auto` sets both inline margins to auto. This commonly centers a constrained block.
- `padding-block` sets top and bottom padding.
- `padding-inline` sets left and right padding.

For one edge, use a longhand such as `margin-inline-start` or `padding-block-end`.

## Logical borders and corners

Borders have logical shorthands and longhands:

~~~css
.quote {
  border-inline-start: 0.25rem solid #2563a6;
  border-block-end: 1px solid #b8c4d1;
  padding-inline-start: 1rem;
}
~~~

- `border-inline-start` draws a border on the line's starting edge.
- `border-inline-end` draws a border on the line's ending edge.
- `border-block-start` and `border-block-end` draw borders at the beginning and end of the block flow.
- `border-inline` sets both inline edges, and `border-block` sets both block edges.

Logical corner properties describe corners by their block and inline edges. For example, `border-start-start-radius` means the corner where block start meets inline start. Use physical corner properties such as `border-top-left-radius` when the desired corner must remain physically top-left in every writing mode.

## Logical positioning

For positioned elements, use logical inset properties when placement is relative to content flow:

~~~css
.card {
  position: relative;
}

.card__close {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-end: 0.75rem;
}
~~~

The close control stays at block start and inline end. In a typical horizontal left-to-right card that is the top-right corner. In a right-to-left card it becomes the top-left corner.

`inset-block` and `inset-inline` are two-sided shorthands. Their first value sets the start side and their second value sets the end side. For example, `inset-inline: 1rem 2rem` sets inline start to 1rem and inline end to 2rem.

## Text alignment and float values

Some properties accept logical values even though their names are not written with `block` or `inline`:

~~~css
.article {
  text-align: start;
}

.article__image {
  float: inline-start;
  margin-inline-end: 1rem;
}
~~~

`text-align: start` aligns text with inline start. In ordinary horizontal left-to-right text that is left alignment; in right-to-left text it is right alignment. `float: inline-start` floats the image on the starting side of the line.

Prefer `start` and `end` over physical `left` and `right` when the alignment should follow the text direction. Physical alignment remains appropriate when a visual element must line up with a fixed screen edge.

## Writing mode, direction, and text orientation

Three related concepts influence how text flows:

| Property or HTML attribute | What it controls |
| :--- | :--- |
| `writing-mode` | The direction in which lines or blocks stack |
| `direction` or HTML `dir` | The inline base direction, such as left to right or right to left |
| `text-orientation` | How glyphs are oriented in vertical writing |

Common `writing-mode` values include:

- `horizontal-tb`: horizontal lines, with blocks stacking from top to bottom. This is the default.
- `vertical-rl`: vertical lines, with blocks stacking from right to left.
- `vertical-lr`: vertical lines, with blocks stacking from left to right.

A right-to-left language such as Arabic is usually horizontal writing with a right-to-left inline direction. It is not made vertical by using `writing-mode: vertical-rl`.

For HTML documents, express the language and direction in markup:

~~~html
<html lang="ar" dir="rtl">
~~~

For a known right-to-left passage inside a left-to-right page:

~~~html
<p lang="ar" dir="rtl">هذا نص عربي</p>
~~~

If the direction of user-provided text is unknown, `dir="auto"` can let the browser determine the base direction from the content. Use `<bdi>` to isolate a short value whose direction may differ from surrounding text, such as a user name in a mixed-direction sentence.

Use CSS `direction` for styling contexts that need it, but do not use it as a replacement for the semantic HTML `dir` attribute. Avoid `unicode-bidi: bidi-override` for ordinary text. It forces visual ordering and can make text difficult to read or copy correctly.

### Vertical text orientation

`text-orientation` applies in vertical writing modes. Its initial value, `mixed`, keeps many scripts upright while rotating characters that are normally horizontal. `upright` keeps glyphs upright; `sideways` displays text sideways. Use these values when the intended script or design calls for them, rather than as a way to rotate an ordinary horizontal layout.

A vertical label might use:

~~~css
.spine-label {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
~~~

Changing `writing-mode` changes the layout flow of the element and its descendants. It is more than turning a box on its side.

## A practical internationalized component

Here is a message card that uses logical properties for its stripe, spacing, and close control:

~~~html
<article class="message-card" lang="en">
  <button class="message-card__close" type="button" aria-label="Close message">
    ×
  </button>
  <p class="message-card__label">Travel update</p>
  <h2>Gate information</h2>
  <p>The departure gate has changed. Follow the signs to Gate 12.</p>
</article>

<article class="message-card" lang="ar" dir="rtl">
  <button class="message-card__close" type="button" aria-label="إغلاق الرسالة">
    ×
  </button>
  <p class="message-card__label">تحديث السفر</p>
  <h2>معلومات البوابة</h2>
  <p>يرجى اتباع اللافتات للوصول إلى البوابة الجديدة.</p>
</article>
~~~

~~~css
.message-card {
  position: relative;
  max-inline-size: 42rem;
  margin-block: 1rem;
  padding-block: 1.25rem;
  padding-inline: 1.5rem 3.5rem;
  border: 1px solid #b8c4d1;
  border-inline-start: 0.3rem solid #2563a6;
  border-radius: 0.75rem;
  background: #fff;
  color: #172033;
  text-align: start;
}

.message-card__label {
  margin-block-end: 0.25rem;
  color: #42516a;
  font-size: 0.875rem;
  font-weight: 700;
}

.message-card h2 {
  margin-block: 0 0.5rem;
}

.message-card p:last-child {
  margin-block-end: 0;
}

.message-card__close {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-end: 0.75rem;
}
~~~

The second card gets its right-to-left direction from HTML. Its inline-start stripe and inline spacing move to the right, and its close button moves to inline end on the left. No direction-specific copy of the component's layout rules is needed.

## Logical and physical properties in the cascade

Logical and physical properties that address the same box edge are related in the cascade. If a rule sets both `margin-left` and the equivalent logical margin, the declaration with higher cascade priority determines their shared computed value for that direction.

For example:

~~~css
.notice {
  margin-inline-start: 1rem;
  margin-left: 2rem;
}
~~~

In left-to-right horizontal writing, both declarations affect the left margin, so the later declaration wins when other cascade priorities are equal. In right-to-left horizontal writing, inline start maps to the right, so the two declarations affect different physical sides.

For predictable components, use the logical property family consistently. If you need a physical override, put it in a clearly scoped rule and inspect the computed styles.

## Common mistakes

| Symptom | Likely cause | What to check |
| :--- | :--- | :--- |
| A leading border stays on the left in right-to-left content | A physical border property is used | Use `border-inline-start` |
| A component has the wrong spacing in vertical writing | Width, height, top, or bottom was assumed to be logical | Use the corresponding `inline` or `block` property |
| Arabic text flows in an unexpected direction | Visual alignment was changed without setting semantic direction | Add the correct HTML `dir` value |
| Text appears vertically when only RTL was needed | `writing-mode` was changed instead of direction | Keep horizontal writing and set `dir="rtl"` |
| A close button stays on the physical right | It uses `right` or `inset-inline-end` is overridden | Check direction, logical placement, and physical declarations |
| A vertical label's Latin letters rotate unexpectedly | The desired `text-orientation` is not set | Choose an intentional vertical text orientation |
| Both physical and logical declarations seem to compete | They target the same side or dimension | Review source order and computed styles |

## Debugging checklist

1. Identify whether the design is tied to a physical screen edge or to text flow.
2. If it follows content, select a logical property such as `margin-inline-start` or `border-block-end`.
3. Check the element's computed `writing-mode` and direction.
4. Use HTML `dir` for document and passage direction.
5. Compare the result in left-to-right and right-to-left content.
6. If testing vertical flow, use a small example with `vertical-rl` or `vertical-lr`.
7. Inspect physical and logical declarations together in the browser's computed styles.
8. Confirm that CSS has not changed the meaningful HTML reading order.

## Practice

1. Change a notification's left border and padding to logical inline-start properties. View it in both left-to-right and right-to-left contexts.
2. Replace a panel's `width` and `min-height` with `inline-size` and `min-block-size`. Compare the result in horizontal and vertical writing.
3. Position a close control at block start and inline end. Test the component in an `dir="rtl"` ancestor.
4. Build a small vertical label using `writing-mode: vertical-rl` and compare `text-orientation: mixed` with `upright`.
5. Write one rule with a physical margin and a corresponding logical margin. Change the direction and inspect which physical edge each declaration affects.
6. Mark a paragraph in another language with an appropriate `lang` and `dir` value. Keep the DOM order meaningful.

## Key points

- Logical properties follow writing flow; physical properties follow the screen's fixed edges.
- The inline axis follows the line of text. The block axis follows the direction that lines or blocks stack.
- `direction` changes inline start and end; `writing-mode` changes block flow.
- Use HTML `dir` to express document or passage direction.
- Logical sizing, spacing, borders, and insets adapt across writing modes.
- A right-to-left horizontal language does not require vertical writing.
- Use a physical property when the design truly depends on a physical edge.
- Keep logical and physical declarations organized to make the cascade clear.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [31 - Container Queries](31-container-queries.md) | [Q&A](../qnas/32-logical-properties-and-writing-modes.md) | [Example](../examples/32-logical-properties-and-writing-modes.md) | [33 - Backgrounds and Gradients](33-backgrounds-and-gradients.md) |
