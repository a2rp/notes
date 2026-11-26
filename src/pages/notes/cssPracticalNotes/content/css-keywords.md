# CSS Keywords and Syntax Terms

## CSS does not have one reserved-word list

CSS has at-keywords, property names, selector syntax, functions, units, and value keywords. Their meaning depends on where they appear and which property or rule uses them. This guide indexes common names in this course. It is not a complete list of every CSS property or every possible value because CSS grows through modules.

Use the [CSS reference and glossary chapter](lessons/69-css-reference-and-glossary.md) for detailed examples and property groups.

## Rule syntax

~~~css
.card {
  color: navy;
  padding: 1rem;
}
~~~

| Term | Meaning |
| --- | --- |
| Style rule | A selector followed by a declaration block. |
| Selector | A pattern that matches elements. |
| Declaration block | Declarations enclosed in braces. |
| Declaration | A property, colon, value, and optional trailing semicolon. |
| Property | The feature being set, such as `color`. |
| Value | The setting assigned to a property, such as `navy`. |
| At-rule | An instruction beginning with `@`, such as `@media`. |
| Comment | A source note written as `/* comment */`. |
| Custom property | An author-defined property whose name starts with `--`. |
| Important flag | `!important` raises a declaration's cascade priority. Use it only when necessary. |

## Selectors

### Simple selectors

| Syntax | Meaning |
| --- | --- |
| `*` | Universal selector, matches every element. |
| `p` | Type selector, matches elements by name. |
| `.notice` | Class selector. |
| `#main` | ID selector. |
| `[disabled]` | Attribute-presence selector. |
| `[type="email"]` | Exact attribute-value selector. |

Attribute selector operators include `=` for exact matches, `~=` for a whitespace-separated word, `|=` for a language-like prefix, `^=` for starts-with, `$=` for ends-with, and `*=` for contains. The `i` modifier requests ASCII case-insensitive matching where supported by the selector syntax.

### Combinators

| Syntax | Meaning |
| --- | --- |
| `A B` | Descendant of A. |
| `A > B` | Direct child of A. |
| `A + B` | Next sibling of A. |
| `A ~ B` | Following sibling of A. |
| `A || B` | Column relationship in table layout, where supported. |

A comma-separated selector list applies the same declarations to each selector. For example, `h1, h2` matches both heading types.

### Common pseudo-classes

Pseudo-classes begin with one colon and match state, structure, or relationship:

- Relationships: `:root`, `:empty`, `:is()`, `:where()`, `:not()`, `:has()`.
- Child positions: `:first-child`, `:last-child`, `:only-child`, `:nth-child()`, `:nth-last-child()`.
- Type positions: `:first-of-type`, `:last-of-type`, `:only-of-type`, `:nth-of-type()`.
- Links: `:link`, `:visited`, `:any-link`, `:target`.
- User interaction: `:hover`, `:active`, `:focus`, `:focus-visible`, `:focus-within`.
- Forms: `:enabled`, `:disabled`, `:checked`, `:indeterminate`, `:required`, `:optional`, `:valid`, `:invalid`, `:in-range`, `:out-of-range`, `:read-only`, `:read-write`, `:placeholder-shown`.
- Language and direction: `:lang()`, `:dir()`.
- Open interface states: `:open`, `:modal`, `:popover-open` where supported.

### Common pseudo-elements

Pseudo-elements begin with two colons and target a part or generated box: `::before`, `::after`, `::first-letter`, `::first-line`, `::marker`, `::selection`, `::placeholder`, `::backdrop`, `::file-selector-button`, `::part()`, and `::slotted()`.

Use generated content for decoration, not essential information.

## At-rules

At-rules begin with `@`. The browser applies them according to their grammar and the stylesheet context.

| At-rule | Common purpose |
| --- | --- |
| `@charset` | Declares stylesheet encoding where required. |
| `@import` | Imports another stylesheet. |
| `@namespace` | Declares a namespace for selectors. |
| `@media` | Applies rules when a media condition matches. |
| `@supports` | Applies rules when a feature or selector is supported. |
| `@container` | Applies rules based on a query container. |
| `@layer` | Creates and orders cascade layers. |
| `@scope` | Limits where selectors in a rule group apply. |
| `@font-face` | Defines a font face. |
| `@font-feature-values` | Defines names for selected font features. |
| `@font-palette-values` | Defines a named font palette. |
| `@keyframes` | Defines animation stages. |
| `@property` | Registers a typed custom property. |
| `@counter-style` | Defines a custom counter or marker style. |
| `@page` | Defines page-box settings for paged media. |
| `@starting-style` | Defines a starting style for an entering or newly rendered element. |
| `@view-transition` | Configures a view transition where supported. |
| `@position-try` | Defines fallback positions for anchor-positioned elements where supported. |

Support for newer at-rules varies. Check target browsers and provide a usable fallback when needed.

## CSS-wide keywords and common values

| Keyword | Meaning |
| --- | --- |
| `inherit` | Use the inherited value from the parent. |
| `initial` | Use the property's defined initial value. |
| `unset` | Behave as inherit for inherited properties, otherwise as initial. |
| `revert` | Roll back to a lower cascade origin. |
| `revert-layer` | Roll back to a lower-precedence layer. |
| `currentColor` | Use the element's computed text color as a color value. |
| `transparent` | A fully transparent color value. |
| `none` | A keyword whose meaning depends on the property. |
| `auto` | A property-specific automatic value. |
| `normal` | A property-specific normal value. |

The values `none`, `auto`, and `normal` do not mean the same thing for every property. CSS-wide keywords apply broadly; most other keywords are property-specific.

### Common display and position values

- `display`: `block`, `inline`, `inline-block`, `flow-root`, `flex`, `inline-flex`, `grid`, `inline-grid`, `contents`, `none`.
- `position`: `static`, `relative`, `absolute`, `fixed`, `sticky`.
- Alignment commonly uses `start`, `end`, `center`, `stretch`, `space-between`, `space-around`, or `space-evenly`, as permitted by the property.
- Grid track terms include `fr`, `min-content`, `max-content`, `minmax()`, `repeat()`, and `subgrid`.

## Units

| Category | Common units |
| --- | --- |
| Absolute lengths | `px`, `cm`, `mm`, `Q`, `in`, `pt`, `pc`. |
| Font-relative lengths | `em`, `rem`, `ex`, `ch`, `cap`, `ic`, `lh`, `rlh`. |
| Viewport lengths | `vw`, `vh`, `vi`, `vb`, `vmin`, `vmax`, plus `sv*`, `lv*`, and `dv*` variants. |
| Container lengths | `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax`. |
| Angles | `deg`, `rad`, `grad`, `turn`. |
| Time | `s`, `ms`. |
| Frequency | `Hz`, `kHz`. |
| Resolution | `dpi`, `dpcm`, `dppx`. |
| Grid fraction | `fr`. |

The unit `px` is a CSS reference unit and may not equal one physical screen pixel. Choose units according to the relationship a size should have to text, viewport, container, or grid space.

## Common functions

| Function | Purpose |
| --- | --- |
| `var()` | Reads a custom property, with an optional fallback. |
| `calc()` | Calculates a value from compatible units. |
| `min()`, `max()`, `clamp()` | Select a minimum, maximum, or bounded fluid value. |
| `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `color()` | Express colors. |
| `color-mix()` | Mix colors. |
| `url()` | Refers to a resource. |
| `linear-gradient()`, `radial-gradient()`, `conic-gradient()` | Create gradient images. |
| `translate()`, `rotate()`, `scale()`, `matrix()` | Transform functions. |
| `cubic-bezier()`, `steps()`, `linear()` | Timing functions. |
| `repeat()`, `minmax()`, `fit-content()` | Grid track sizing functions. |
| `counter()`, `counters()` | Read CSS counters for generated content. |
| `env()` | Reads a user-agent environment variable. |

## Common property groups

This is a starter index, not every property.

| Purpose | Common properties |
| --- | --- |
| Box sizing | `box-sizing`, `width`, `min-width`, `max-width`, `height`, `aspect-ratio` |
| Spacing and borders | `margin`, `padding`, `border`, `border-radius`, `outline`, `box-shadow` |
| Display and positioning | `display`, `position`, `inset`, `z-index`, `float`, `clear` |
| Flexbox | `flex-direction`, `flex-wrap`, `flex`, `justify-content`, `align-items`, `align-self` |
| Grid | `grid-template-columns`, `grid-template-rows`, `grid-auto-flow`, `grid-column`, `grid-row`, `gap` |
| Typography | `font-family`, `font-size`, `font-weight`, `line-height`, `text-align`, `text-decoration`, `white-space` |
| Color and backgrounds | `color`, `background`, `background-color`, `background-image`, `opacity` |
| Overflow and scrolling | `overflow`, `scroll-behavior`, `scroll-snap-type`, `scroll-margin` |
| Transforms and motion | `transform`, `transition`, `animation`, `animation-timeline`, `will-change` |
| Effects | `filter`, `backdrop-filter`, `mix-blend-mode`, `clip-path`, `mask` |

Logical property families include `margin-inline`, `padding-block`, `inset-inline`, `inline-size`, and `block-size`. They follow writing direction more reliably than hard-coded left and right properties.

## Media features and preferences

`@media` conditions can query viewport size and the user's environment. Common feature names include `width`, `height`, `orientation`, `aspect-ratio`, `resolution`, `hover`, `pointer`, `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, and `forced-colors`.

Use media features to adapt the presentation. Respect reduced motion and contrast preferences when they matter to the page.

## Related chapters

- [Syntax and rulesets](lessons/02-css-syntax-and-rulesets.md)
- [Selectors](lessons/05-selector-basics.md)
- [Pseudo-classes](lessons/08-pseudo-classes.md)
- [Cascade and inheritance](lessons/10-cascade-and-inheritance.md)
- [Values and units](lessons/13-values-units-and-percentages.md)
- [Math functions](lessons/15-css-math-functions.md)
- [Custom properties](lessons/41-custom-properties-and-design-tokens.md)
- [At-rules](lessons/50-at-rules-and-imports.md)
- [Accessible CSS](lessons/53-accessible-css-and-user-preferences.md)
- [CSS reference and glossary chapter](lessons/69-css-reference-and-glossary.md)
- [CSS summary](css-summary.md)
- [Back to the README](README.md)
