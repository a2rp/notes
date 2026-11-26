# 30 - Responsive Design and Media Queries

Responsive design lets a page adapt to the space and interaction capabilities available to the reader. A responsive page can reflow on a narrow viewport, use more room on a wide display, provide useful print styles, and respect relevant user preferences.

Media queries are one part of responsive design. Flexible layout, readable content widths, scalable text, and adaptable images also matter.

## What you will learn

- How the viewport affects responsive layouts.
- How to write and combine media queries.
- How to choose breakpoints from the content.
- How a mobile-first stylesheet grows from its base styles.
- How to use interaction, print, and preference media features.
- How to test responsive layouts for overflow and usability.

## Prepare the viewport

For a responsive HTML page, include a viewport declaration in the document head:

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~

This tells mobile browsers to use the device viewport as the page's layout viewport and start at the normal scale. Without it, a mobile browser may lay out the page using a wider virtual viewport and shrink the result.

Do not set a maximum zoom that prevents readers from enlarging the page. People need to be able to zoom to read content comfortably.

## Responsive design uses more than breakpoints

Start by making the default layout flexible:

~~~css
.page {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

.content-image {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
~~~

These rules give content room to shrink, keep images within their available inline size, and allow a grid to create as many useful columns as fit. A media query can add a layout change when the content needs one.

Use media queries to respond to meaningful changes in available space or user settings. Do not assume a viewport width identifies a particular device.

## Media query structure

A media query begins with `@media`. A condition can check a media type, one or more media features, or both.

~~~css
@media screen and (min-width: 48rem) {
  .page-layout {
    grid-template-columns: 14rem minmax(0, 1fr);
  }
}
~~~

The condition is true when the output is a screen and the viewport is at least 48rem wide. When the condition is false, the declarations inside the block do not apply.

A feature such as `min-width` is written in parentheses. A media type such as `screen` is written without parentheses.

### Common media types

| Media type | Typical use |
| :--- | :--- |
| `all` | All output media. This is the default when no type is specified. |
| `screen` | Screen-based output. |
| `print` | Printed pages and print preview. |

Media types identify broad output contexts. They do not identify phone, tablet, laptop, or other device categories.

### Common media features

| Feature | What it describes | Example |
| :--- | :--- | :--- |
| `width` and `height` | The viewport dimensions, or the page box for paged output | `(min-width: 48rem)` |
| `orientation` | Whether the viewport is portrait or landscape | `(orientation: landscape)` |
| `hover` | Whether the primary pointing mechanism can hover | `(hover: hover)` |
| `pointer` | The accuracy of the primary pointing mechanism | `(pointer: coarse)` |
| `prefers-color-scheme` | The reader's light or dark color preference | `(prefers-color-scheme: dark)` |
| `prefers-reduced-motion` | Whether the reader requests less non-essential motion | `(prefers-reduced-motion: reduce)` |
| `forced-colors` | Whether the browser is using a forced color palette | `(forced-colors: active)` |

The `width` feature checks the viewport width in CSS pixels, not the physical width of a device. This makes it useful for adapting a layout to the space available to the page.

The `orientation` feature describes the viewport's shape. A wide, short browser window can match landscape even when the device itself is not rotated. Use orientation only when the shape matters to the layout.

The `hover` and `pointer` features can help add enhancements for a mouse or other precise pointer. Keep controls usable without hover, since touch and keyboard users still need access to the same functions.

## Combine conditions

Use `and` when all conditions must match:

~~~css
@media screen and (min-width: 48rem) and (orientation: landscape) {
  .dashboard {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
~~~

Separate queries with a comma when any one of them can match. A comma means OR:

~~~css
@media print, (min-width: 80rem) {
  .page {
    max-inline-size: none;
  }
}
~~~

A query can also be negated with `not`:

~~~css
@media not print {
  .screen-controls {
    display: flex;
  }
}
~~~

Keep conditions readable. If a query needs several exceptions to explain it, the layout may need a different base structure.

### Range syntax

Media feature range syntax makes comparisons explicit:

~~~css
@media (width >= 48rem) {
  .page-layout {
    grid-template-columns: 14rem minmax(0, 1fr);
  }
}
~~~

This is equivalent to `(min-width: 48rem)`. The older `min-width` and `max-width` forms remain widely used and are easy to recognize in existing stylesheets.

Exact-width queries such as `(width: 48rem)` only match that exact width. They rarely describe a useful responsive interval. Prefer ranges that include or exclude a breakpoint deliberately.

## Choose breakpoints from the content

A breakpoint is a point where a layout or component needs a different arrangement. Start with the narrow layout and widen the viewport until the content needs another column or more room.

~~~css
.site-header {
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .site-header {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
~~~

The value 48rem is an example, not a required breakpoint. Choose a value based on the width where the header starts to feel crowded or where its controls stop fitting.

A design may need no media query if flexible sizing already handles the change. If a query is needed, add it where the design calls for a change, not because a named device is expected.

### Avoid fragile breakpoint pairs

When a design needs a compact layout below a point and a wide layout above it, use a single base style plus a minimum-width query:

~~~css
.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (min-width: 48rem) {
  .navigation {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
~~~

This avoids gaps between adjacent inclusive maximum and minimum queries. If you use both `max-width` and `min-width` rules, remember that both can match exactly at their shared boundary.

## Mobile-first styles

A mobile-first stylesheet gives the simplest or narrowest layout as the default. Minimum-width queries then add roomier arrangements.

~~~css
.product-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

@media (min-width: 42rem) {
  .product-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 68rem) {
  .product-layout {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
~~~

The base rule works without either query matching. At wider viewports, the later rules add columns.

Mobile-first CSS is an organization choice, not a special browser feature. The important point is to define a usable fallback and make each query add a clear change.

## The cascade still applies

Declarations inside a matching media query participate in the normal cascade. A media query does not increase selector specificity.

~~~css
.card-title {
  font-size: 1.25rem;
}

@media (min-width: 48rem) {
  .card-title {
    font-size: 1.5rem;
  }
}
~~~

When both declarations match, the later declaration wins because the selectors have equal specificity. Place related query rules in a predictable order and avoid repeating conflicting values across many distant sections of a stylesheet.

## Interaction preferences

Adapt optional decoration to the available interaction mode. Do not hide essential content or actions behind hover.

~~~css
.card-link {
  text-decoration: underline;
}

@media (hover: hover) and (pointer: fine) {
  .card-link:hover {
    text-decoration-thickness: 0.15em;
  }
}
~~~

The base link remains visibly usable. The hover rule only adds an enhancement when the primary pointer can hover and is precise.

If the page has different control styles for a touch-first pointer, check `pointer: coarse`. Keep touch targets comfortable and provide keyboard focus styles regardless of the pointer type.

## User preferences

Media queries can respond to preferences exposed by the operating system or browser. Use a sensible default, then adapt it when a preference is present.

### Color scheme

~~~css
:root {
  color-scheme: light;
  color: #172033;
  background: #fff;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    color: #f1f5f9;
    background: #111827;
  }
}
~~~

A color scheme preference is a signal to adapt the page. Check text, borders, focus indicators, form controls, and images in both schemes.

### Reduced motion

~~~css
@media (prefers-reduced-motion: reduce) {
  .animated-banner {
    animation: none;
  }

  .carousel {
    scroll-behavior: auto;
  }
}
~~~

Use this for non-essential movement or smooth motion that could make the experience uncomfortable. Keep information and controls available in the reduced-motion version.

### Forced colors

~~~css
@media (forced-colors: active) {
  .notice {
    border: 1px solid CanvasText;
  }
}
~~~

When forced colors are active, the user agent applies a system palette. Prefer native controls and meaningful borders. Do not rely on background images or color alone to communicate meaning.

## Print styles

A print query can remove screen-only controls and make content suitable for paper:

~~~css
@media print {
  .site-navigation,
  .screen-only {
    display: none;
  }

  body {
    color: #000;
    background: #fff;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
~~~

Hide only controls that are genuinely unnecessary on paper. Keep article content and essential instructions available. Use page-specific rules only when printing needs a different layout or presentation.

A stylesheet can also be attached to a print-only media type in HTML:

~~~html
<link rel="stylesheet" href="print.css" media="print">
~~~

## Test more than viewport width

Check a layout at narrow, middle, and wide widths, then inspect the boundaries around each breakpoint. Also test:

- Zoomed text and browser zoom.
- Long headings, unbroken strings, and translated content.
- Keyboard navigation and visible focus.
- Touch controls without hover.
- Light and dark color preferences where supported.
- Reduced motion and forced colors where supported.
- Print preview when the content may be printed.
- Horizontal overflow at narrow widths.

Use browser developer tools to resize the viewport gradually. Do not only test at a few device presets. A responsive page should work between presets as well.

## Troubleshooting

| Symptom | Likely cause | What to check |
| :--- | :--- | :--- |
| The mobile layout is zoomed out | The page is missing a viewport declaration | Add the viewport meta element in the document head |
| A breakpoint does not apply | The condition does not match or the declaration loses in the cascade | Check the viewport width, syntax, selector specificity, and source order |
| The page scrolls horizontally | A child is wider than its containing block | Check fixed widths, images, long strings, grid minimums, and padding |
| Layout changes have a visible gap around a breakpoint | Adjacent min and max queries leave a range uncovered | Use one base style and a minimum-width query, or define ranges carefully |
| A hover effect is unavailable on touch | Essential behavior is attached only to hover | Keep the base state usable and treat hover as an enhancement |
| Print output contains navigation controls | No print styles exist for screen-only elements | Add a focused `@media print` rule |
| Dark mode makes text hard to read | Only the page background changed | Check foreground, borders, focus indicators, controls, and imagery together |
| A fixed device query works on one product only | It queries hardware assumptions rather than available space | Use viewport features such as `width` and test at content-driven breakpoints |

## Practice

1. Add the viewport declaration to a standalone HTML page and compare its mobile layout before and after.
2. Make a card grid begin with one column and add columns at widths where the cards still have room.
3. Add an interaction enhancement that runs only when `(hover: hover)` matches. Keep the control usable without hover.
4. Add a dark color scheme and check all text, controls, and focus indicators.
5. Disable a decorative animation under `prefers-reduced-motion: reduce`.
6. Create a print rule that hides navigation while keeping the article content.
7. Resize the page gradually around each breakpoint and check for overflow.

## Key points

- Responsive design combines fluid layout, scalable content, and media queries.
- Include the viewport meta element so mobile browsers lay out the page at the device viewport width.
- Media queries test output types, viewport features, interaction capabilities, and user preferences.
- A comma separates alternative queries; `and` combines conditions.
- Choose breakpoints where the content needs a different layout.
- A mobile-first base style provides a usable fallback before wider queries apply.
- Media query declarations use the normal cascade and selector specificity.
- Keep essential functionality available without hover and respect relevant user preferences.
- Check zoom, keyboard access, narrow widths, print, and intermediate viewport sizes.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [29 - Multi-column Layout](29-multi-column-layout.md) | [Q&A](../qnas/30-responsive-design-and-media-queries.md) | [Example](../examples/30-responsive-design-and-media-queries.md) | [31 - Container Queries](31-container-queries.md) |
