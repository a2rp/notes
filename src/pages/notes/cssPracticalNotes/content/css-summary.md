# CSS Summary

CSS (Cascading Style Sheets) controls how HTML content is presented. It describes colors, type, spacing, layout, responsive behavior, and interaction states. The browser matches selectors to elements, applies declarations, and resolves competing values through the cascade.

This guide summarizes the course. For detailed syntax, selectors, values, at-rules, properties, responsive design, accessibility, and terms, see the [CSS reference and glossary chapter](lessons/69-css-reference-and-glossary.md). The [README](README.md#lessons) links every lesson, Q&A, and example.

## Connect CSS to a page

A reusable stylesheet is usually connected from the HTML document head:

~~~html
<link rel="stylesheet" href="styles.css">
~~~

The link's path is resolved from the HTML document. A stylesheet can also be embedded with a `<style>` element, or written in a `style` attribute for a one-off declaration. A separate stylesheet is easier to reuse and maintain.

## Rule structure

A style rule has a selector and a declaration block. Each declaration pairs a property with a value:

~~~css
.card {
  color: #202124;
  background-color: white;
  border: 1px solid #c9ced6;
  border-radius: 0.75rem;
  padding: 1rem;
}
~~~

- `.card` is the selector.
- `color` and `padding` are properties.
- The content after each colon is a value.
- Braces contain the declaration block. A semicolon separates declarations.
- Comments use `/* ... */`.

A browser ignores a declaration it cannot parse. Valid syntax does not guarantee that the property works in every browser, so feature support matters for newer CSS.

## Selectors

Selectors decide which elements receive a rule. Common forms include:

| Selector | Matches |
| --- | --- |
| `p` | Elements by type. |
| `.notice` | Elements with a class. |
| `#main` | The element with an id. |
| `[disabled]` | Elements with an attribute. |
| `[type="email"]` | An attribute with a matching value. |
| `h1, h2` | A selector list. |
| `main p` | A descendant relationship. |
| `ul > li` | A direct-child relationship. |
| `h2 + p` | The next-sibling relationship. |
| `h2 ~ p` | A following-sibling relationship. |

Pseudo-classes such as `:hover`, `:focus-visible`, and `:checked` match states or relationships. Pseudo-elements such as `::before`, `::after`, and `::marker` target generated or specific parts. Generated text should not carry information that users need.

## The cascade

When several declarations apply to the same property, the cascade chooses the winning value. In simplified order, it considers origin and importance, layer precedence, specificity, scoping proximity where applicable, then source order.

Specificity compares ID selectors, class and attribute selectors, and type selectors in separate groups. Compare those groups from left to right. Avoid adding selector weight or `!important` to hide unclear conflicts. Prefer correcting the rule or organizing styles into deliberate layers.

Inheritance passes selected values from an element to descendants. Text properties commonly inherit; box spacing properties commonly do not. CSS-wide keywords include `inherit`, `initial`, `unset`, `revert`, and `revert-layer`.

Cascade layers created with `@layer` let a stylesheet order groups of rules. Normal declarations in later layers outrank earlier layers, while unlayered normal declarations outrank layered ones. Important declarations reverse layer precedence.

## Values, units, and custom properties

CSS values can be keywords, numbers, percentages, lengths, colors, images, strings, lists, or functions. Units describe relationships:

- `px` is a CSS reference pixel, not always one physical screen pixel.
- `rem` is relative to the root element's font size; `em` is relative to the relevant font size.
- `%` depends on the property's context.
- `vw`, `vh`, and logical viewport units relate to viewport dimensions.
- `fr` distributes available grid space.
- `s` and `ms` represent time.

Functions such as `calc()`, `min()`, `max()`, and `clamp()` calculate bounded or fluid values. `var(--name)` reads a custom property. Custom properties inherit and participate in the cascade, so their values can be shared as design tokens.

## The box model

Every CSS box can have content, padding, border, and margin. With `box-sizing: content-box`, declared width and height describe the content box. With `box-sizing: border-box`, they include padding and border.

A common baseline is:

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}
~~~

Use `min-width`, `max-width`, `min-height`, `max-height`, and `aspect-ratio` to constrain sizing rather than forcing content into brittle fixed dimensions.

## Layout and positioning

Normal flow is the browser's default layout. Use layout tools according to the relationship between items:

- Flexbox lays out items along one dimension and can wrap them.
- Grid lays out rows and columns and supports explicit and flexible tracks.
- Multi-column layout flows text into columns.
- Floats allow text to wrap around content, mainly for editorial layouts.
- Positioning removes or offsets boxes from normal flow in specific ways.
- Logical properties such as `margin-inline` and `padding-block` adapt to writing direction and mode.

Use `gap` for spacing between flex and grid items. Stacking contexts affect how `z-index` values are compared. Overflow properties decide how content outside a box is handled.

## Responsive design

Begin with flexible, content-driven layout. Use percentages, maximum widths, flexible grid tracks, and fluid sizes. Add media queries when the page needs a layout change for a viewport or user preference. Use container queries when a component should respond to the size of its own container.

Relative units and `clamp()` can make typography and spacing fluid. Test narrow widths, zoomed text, and different writing directions. Do not assume one breakpoint matches every device.

## Visual design and content

CSS can style backgrounds, gradients, borders, outlines, shadows, colors, typography, links, lists, tables, form controls, images, and other replaced elements. Keep readable contrast and visible focus. Use `object-fit` and `object-position` to fit replaced content into a box.

Transforms change visual position or shape without changing normal flow. Transitions animate changes between values. Keyframes and animations describe sequences. Scroll-driven animations and view transitions are newer features, so check browser support and offer a usable baseline.

## Accessibility and interaction

- Keep the HTML reading order meaningful. CSS visual reordering does not rewrite the source order.
- Preserve visible keyboard focus and support hover interactions with keyboard and touch.
- Do not communicate meaning through color alone.
- Respect `prefers-reduced-motion`, color-scheme, forced-colors, and contrast preferences where relevant.
- Avoid fixed sizes that clip enlarged text.
- Do not put essential information only in generated content.
- Test focus, contrast, zoom, and interaction states.

CSS can adapt presentation to user preferences, but it cannot replace semantic HTML or accessible interaction design.

## Organization, support, and debugging

Use consistent names, reusable custom properties, and clear file organization. A reset or base stylesheet should provide intentional defaults without removing useful browser behavior. Component styles should have a clear scope, including when styling Shadow DOM.

Use browser developer tools to inspect matched rules, computed values, layout, and performance. Validate CSS and test target browsers. Use feature queries such as `@supports` when a newer feature needs a fallback. Prefixes are usually managed by tooling for selected browser targets; avoid adding them without a compatibility reason.

## Course map

- Foundations: [Introduction](lessons/01-introduction-to-css.md), [syntax](lessons/02-css-syntax-and-rulesets.md), [connecting CSS](lessons/03-connecting-css-to-html.md), [organization](lessons/04-stylesheets-comments-and-organization.md).
- Selectors: [selector basics](lessons/05-selector-basics.md), [relationships](lessons/06-combinators-and-selector-relationships.md), [pseudo-classes](lessons/08-pseudo-classes.md), [pseudo-elements](lessons/09-pseudo-elements.md).
- Cascade: [inheritance](lessons/10-cascade-and-inheritance.md), [specificity](lessons/11-specificity-and-conflicts.md), [layers](lessons/12-cascade-layers.md).
- Values and boxes: [units](lessons/13-values-units-and-percentages.md), [math functions](lessons/15-css-math-functions.md), [box model](lessons/16-box-model.md), [sizing](lessons/17-width-height-and-sizing.md).
- Layout: [flow](lessons/21-normal-flow-and-formatting-contexts.md), [positioning](lessons/22-positioning.md), [Flexbox](lessons/26-flexbox.md), [Grid](lessons/27-css-grid.md), [alignment](lessons/28-alignment-and-gaps.md).
- Responsive design: [media queries](lessons/30-responsive-design-and-media-queries.md), [container queries](lessons/31-container-queries.md), [logical properties](lessons/32-logical-properties-and-writing-modes.md), [fluid typography](lessons/59-responsive-typography-and-fluid-sizing.md).
- Styling: [backgrounds](lessons/33-backgrounds-and-gradients.md), [typography](lessons/34-fonts-and-typography.md), [text layout](lessons/35-text-layout-and-wrapping.md), [forms](lessons/39-styling-forms-and-controls.md).
- Effects and interaction: [transforms](lessons/43-transforms.md), [transitions](lessons/44-transitions.md), [animations](lessons/45-animations-and-keyframes.md), [filters](lessons/47-filters-blending-and-opacity.md), [nesting](lessons/49-css-nesting.md).
- Accessibility and advanced CSS: [user preferences](lessons/53-accessible-css-and-user-preferences.md), [keyboard focus](lessons/54-focus-and-keyboard-interaction.md), [theming](lessons/55-color-schemes-and-theming.md), [anchor positioning](lessons/57-anchor-positioning.md), [view transitions](lessons/58-view-transitions.md).
- Maintenance and practice: [architecture](lessons/60-css-architecture-and-naming.md), [debugging](lessons/64-debugging-with-browser-devtools.md), [compatibility](lessons/65-validation-and-browser-compatibility.md), [performance](lessons/67-css-performance.md), [projects](lessons/68-practical-page-projects.md).

[Back to the README](README.md)
