# 59 - Responsive typography and fluid sizing

Responsive typography keeps text and spacing comfortable across different viewport sizes, content widths, and user settings. CSS can scale a value smoothly with clamp(), min(), and max(), while relative units let designs respond to font size and layout context.

Fluid sizing is one tool in a responsive design. It does not replace readable defaults, useful line lengths, breakpoints for layout changes, or testing with zoom and larger text.

## Use relative units for type

CSS provides several units that relate to fonts or the root font size:

- rem is based on the computed font size of the root element.
- em is based on a font size. On font-size, it is relative to the parent's computed font size. On many other properties, it is based on the current element's computed font size.
- ch is based on the typical advance width of the zero glyph in the element's font. It is useful for estimating line length, but it is not an exact character count.
- lh is based on the element's line-height. rlh is based on the root element's line-height.
- px is a CSS reference pixel, not necessarily one physical screen pixel.

A rem-based body size respects the root's computed size:

~~~
body {
    font-size: 1rem;
    line-height: 1.6;
}
~~~

Avoid forcing a root font size to a fixed pixel value just to make conversions easier. A user or browser may change the default text size. Relative sizes make it easier for the layout to respond.

The em unit is useful when a component should scale with its own text. For example, padding on a button can grow with the button's font:

~~~
.button {
    padding: 0.65em 1em;
    font-size: 1rem;
}
~~~

Use rem when a size should relate to the document's root scale. Use em when the size should relate to the component's typography. Be careful with nested em-based font sizes because each level can compound the parent's size.

## Use unitless line-height

A unitless line-height is a multiplier applied to the element's own font size and inherited as a number. This allows headings and other descendants to scale their line boxes with their text.

~~~
body {
    line-height: 1.6;
}

h1 {
    line-height: 1.1;
}
~~~

A length-valued line-height is computed as a fixed length before it is inherited. A large heading can therefore receive less comfortable spacing than expected if it inherits a parent line-height such as 24px. Prefer a unitless value for a flexible type system unless a specific fixed line box is intended.

## Make text scale smoothly with clamp()

clamp() accepts a minimum, a preferred value, and a maximum. The preferred value can include viewport units, so it grows with the viewport while staying within readable bounds.

~~~
.page-title {
    font-size: clamp(2rem, calc(1.4rem + 3.5vw), 4.25rem);
}
~~~

This title cannot become smaller than 2rem or larger than 4.25rem. Between those bounds, the middle calculation changes with the viewport width.

A common responsive type pattern combines a rem-based component with a viewport-based component:

~~~
.article-title {
    font-size: clamp(1.5rem, calc(1.2rem + 1.2vw), 2.25rem);
}
~~~

The rem part responds to the root text size, while the viewport part adds fluid growth. This is generally more flexible than using viewport units alone.

clamp() is equivalent to keeping the preferred value between a lower and upper bound. If the minimum and maximum conflict, the minimum wins. Choose bounds in the intended order and inspect them at narrow and wide sizes.

## Understand the viewport units

vw is one percent of the viewport width. vh is one percent of the viewport height. vi and vb are one percent of the viewport size in the root element's inline and block axes. vmin and vmax refer to the smaller and larger viewport dimensions.

For typography, viewport width is often more predictable than viewport height because a taller window does not necessarily mean text should become larger. Still, viewport-only text can become too small on narrow screens or too large on wide screens. Put it inside clamp() bounds and include a relative unit where appropriate.

Newer viewport unit families include small, large, and dynamic viewport sizes. They are useful for interfaces that need to account for changing browser UI, particularly on mobile. For text sizing, begin with a simple vw-based calculation and test the actual browsers and zoom settings before choosing a more specialized unit.

## Calculate a fluid value

Suppose a heading should be 16px at a 320px viewport and 24px at a 1120px viewport. The size increases by 8px over an 800px viewport change.

The change per viewport pixel is 8 divided by 800, or 0.01. Since 1vw is 1 percent of the viewport width, 1vw contributes 1 percent of that width. At 320px, 1vw is 3.2px, so the fixed component needs to contribute 12.8px to reach 16px. The resulting preferred expression is:

~~~
font-size: calc(0.8rem + 1vw);
~~~

Assuming a 16px root font size, this gives 16px at a 320px viewport and 24px at 1120px. Bound it to make the design's limits explicit:

~~~
font-size: clamp(1rem, calc(0.8rem + 1vw), 1.5rem);
~~~

The rem component makes the preferred value respond to root text sizing. The clamp bounds define the minimum and maximum. The exact scaling changes when the root size or viewport differs, so inspect the actual result rather than relying only on the arithmetic.

## Use min() and max() for one-sided limits

clamp() sets both a minimum and a maximum. min() and max() are useful when only one side needs a limit.

~~~
.page-shell {
    width: min(100% - 2rem, 72rem);
    margin-inline: auto;
}

.reading-text {
    font-size: max(1rem, 0.95rem + 0.2vw);
}
~~~

min() selects the smaller calculation, so it can impose a maximum width. max() selects the larger calculation, so it can impose a minimum size. Keep the values compatible in type, such as lengths with lengths.

## Set a readable line length

Fluid width should not make paragraphs stretch across an entire wide display. Use a maximum measure such as ch to keep reading lines manageable:

~~~
.article-body {
    max-inline-size: 68ch;
}
~~~

The ch unit is an estimate based on the zero glyph of the font. It does not guarantee a precise number of letters or words. Different fonts have different glyph widths, so inspect the actual text.

Logical properties such as max-inline-size work with writing modes. Use them when the intended design is about the inline reading measure rather than a physical horizontal width.

## Use fluid spacing with restraint

The same sizing functions can keep spacing responsive:

~~~
.article {
    padding-inline: clamp(1rem, 4vw, 3rem);
}

.article-section + .article-section {
    margin-block-start: clamp(2rem, 5vw, 4rem);
}
~~~

The smallest and largest values make the spacing behavior clear. Use a consistent scale instead of giving every margin an unrelated formula. Fluid spacing can complement breakpoints, but it should not make content crowded at one extreme or wasteful at the other.

## Size components with container-relative units

Viewport units measure the viewport. A reusable component may instead need to respond to its own available width. Container query units such as cqi are based on a query container's inline size.

Declare the container on a wrapper, then use cqi in descendants:

~~~
.story-card {
    container-type: inline-size;
}

.story-card h2 {
    font-size: clamp(1.1rem, calc(1rem + 1.2cqi), 1.6rem);
}
~~~

cqi is one percent of the relevant query container's inline size. A card in a narrow sidebar can therefore use a different size from the same card in a wide main column.

Container-relative units need an eligible query container. If no eligible container is available for an axis, the unit uses the small viewport size for that axis. Put the intended container around the component and test it in each layout where the component is reused.

## Combine fluid values with breakpoints

Fluid values work well when a property should change gradually. Media or container queries remain useful when the layout needs a distinct change, such as switching from one column to two.

~~~
.article-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 50rem) {
    .article-layout {
        grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);
        gap: 3rem;
    }
}
~~~

Use continuous scaling for a heading or padding that can grow smoothly. Use a query when the composition should change at a particular point. The two approaches can work together.

## Preserve readability and user control

Do not use viewport units alone for all text sizes. A formula without a floor can become too small, and one without a ceiling can become oversized. Relative components and clamp() bounds help, but they do not replace testing.

Check text with browser zoom, larger default text, narrow viewports, and long translated content. Ensure headings wrap without clipping and buttons remain usable. Avoid fixed heights around text that may grow. Let content determine the block size unless a deliberate interface constraint is necessary.

A type scale can use custom properties to keep values organized:

~~~
:root {
    --type-body: 1rem;
    --type-small: 0.9rem;
    --type-title: clamp(2rem, calc(1.4rem + 3vw), 4rem);
}

body {
    font-size: var(--type-body);
}

h1 {
    font-size: var(--type-title);
}
~~~

Custom properties make the design values easier to adjust. They do not make a formula automatically accessible, so review the computed results at realistic sizes.

## Common mistakes

- **Using vw alone for all text:** It can become too small or too large. Combine it with relative units and bounds.
- **Using clamp() without inspecting its limits:** The chosen values may fit one device but be uncomfortable elsewhere.
- **Forgetting that the minimum wins when bounds conflict:** Ensure the minimum and maximum are in the intended order.
- **Resetting the root font size to a fixed pixel value:** This can work against user or browser text-size preferences.
- **Using em for every nested font size:** Nested values can compound. Use rem for a shared root scale and em for component-relative sizing.
- **Using a fixed line-height length on scalable text:** A large child may inherit a line box that is too small. Prefer a unitless line-height for flexible type.
- **Treating ch as an exact character count:** It approximates a measure from the font's zero glyph.
- **Letting paragraphs become too wide:** Add a max-inline-size to preserve a comfortable reading measure.
- **Using viewport units inside a reusable component:** The viewport may not match the width available to that component. Consider container units.
- **Trying to solve every layout change with fluid formulas:** Use a query when the composition must change discretely.
- **Testing only at default text size:** Check zoom, larger text, narrow screens, and longer content.

## Try it yourself

1. Set body text in rem and use a unitless line-height.
2. Create a heading with clamp() and inspect it at narrow, medium, and wide viewports.
3. Calculate a preferred value that moves between two sizes over a chosen viewport range.
4. Give the heading a minimum and maximum that remain comfortable at the extremes.
5. Set the article's max-inline-size in ch and inspect it in the chosen font.
6. Use em-based button padding and compare it with a button using fixed pixel padding.
7. Put the same card in two differently sized containers and adjust its heading with cqi.
8. Add a breakpoint that changes the page layout from one column to two.
9. Increase the browser's default text size or zoom and check for clipping and overlap.
10. Replace one fluid formula with a fixed value and compare which behavior better fits the design.

## Key points

- rem, em, ch, and line-height units respond to type or font metrics in different ways.
- clamp() gives a fluid preferred value clear minimum and maximum bounds.
- Viewport units can make values fluid, but need bounds and real-world review.
- ch is useful for an approximate reading measure, not an exact character count.
- Container query units size a component in relation to its query container.
- Queries still handle distinct layout changes, while fluid formulas handle gradual changes.
- Test with zoom, larger text, narrow layouts, and longer content.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [58 - Styling view transitions](58-view-transitions.md) | [Q&A](../qnas/59-responsive-typography-and-fluid-sizing.md) | [Example](../examples/59-responsive-typography-and-fluid-sizing.md) | [60 - CSS architecture and naming conventions](60-css-architecture-and-naming.md) |