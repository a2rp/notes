# 69 - CSS reference and glossary

This chapter is a compact lookup guide for the CSS ideas covered throughout this course. Use it to refresh a definition, connect a term to the lesson that explains it, or follow a checklist while reading or writing a stylesheet.

The glossary is grouped by topic rather than alphabetically. CSS is a large language, so this is a practical course reference, not an exhaustive list of every property, value, browser feature, or specification term.

## How to use this reference

- Start with the topic that matches the problem you are solving.
- Follow the related lesson link for a fuller explanation and examples.
- Check computed styles when a declaration does not produce the result you expect.
- Treat a definition as a reminder, then verify details that depend on a particular property or feature.
- Remember that CSS behavior can depend on the element, its ancestors, the document, the browser, and user preferences.

## Rules, declarations, and selectors

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Stylesheet | A collection of CSS rules and at-rules, usually stored in a .css file or written in a style element. | [Connecting CSS to HTML](03-connecting-css-to-html.md) |
| Rule or ruleset | A selector followed by a declaration block. The selector identifies matching elements, and declarations describe styles to apply. | [CSS syntax and rulesets](02-css-syntax-and-rulesets.md) |
| Selector | A pattern that matches elements in a document, such as p, .notice, or main > h1. | [Selector basics](05-selector-basics.md) |
| Selector list | Multiple selectors separated by commas. Each selector independently matches elements for the shared declaration block. | [Selector basics](05-selector-basics.md) |
| Combinator | A symbol or whitespace that describes a relationship between selectors, such as descendant, child (>), next sibling (+), or later sibling (~). | [Combinators and selector relationships](06-combinators-and-selector-relationships.md) |
| Attribute selector | A selector that matches an element based on an attribute or value, such as [disabled] or [type="email"]. | [Attribute selectors](07-attribute-selectors.md) |
| Pseudo-class | A selector keyword that matches a state or condition, such as :hover, :focus-visible, or :checked. | [Pseudo-classes](08-pseudo-classes.md) |
| Pseudo-element | A selector keyword that targets a part of an element or generated content, such as ::before, ::after, or ::marker. | [Pseudo-elements](09-pseudo-elements.md) |
| Declaration | A property and value written inside a rule, for example color: navy;. | [CSS syntax and rulesets](02-css-syntax-and-rulesets.md) |
| Property | The style feature being set, such as color, display, or margin-inline. | [CSS syntax and rulesets](02-css-syntax-and-rulesets.md) |
| Value | The setting assigned to a property, such as navy, grid, 1rem, or auto. | [Values, units, and percentages](13-values-units-and-percentages.md) |
| Declaration block | The declarations enclosed by braces after a selector. | [CSS syntax and rulesets](02-css-syntax-and-rulesets.md) |
| At-rule | A CSS instruction beginning with @, such as @media, @supports, @layer, or @font-face. | [At-rules, imports, and font-face](50-at-rules-and-imports.md) |
| Comment | Text written between /* and */. Browsers do not apply it as a declaration. | [Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md) |
| Nesting | A syntax for expressing related selectors inside a parent rule. Keep nested selectors understandable and avoid accidental increases in specificity. | [CSS nesting](49-css-nesting.md) |

## The cascade and computed styles

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Cascade | The process browsers use to decide which declarations apply when multiple declarations target the same property on an element. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| Cascade origin | The source category of a declaration, such as browser styles, author styles, or user styles. Origin and importance participate in cascade ordering. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| Importance | The priority marker !important. It changes a declaration's position in the cascade and should be reserved for cases that need it. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| Source order | When declarations otherwise tie in the cascade, the later applicable declaration can win. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| Specificity | A selector's weight used to compare matching declarations within the relevant cascade origin and layer. It is not the only part of the cascade. | [Specificity and resolving conflicts](11-specificity-and-conflicts.md) |
| Inheritance | The way some properties pass a computed value from an element to its descendants. Only properties defined as inherited normally do this. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| Initial value | The property's defined starting value. The initial keyword explicitly requests that value. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| inherit | A CSS-wide keyword that sets a property to the computed value from the parent, even when the property is not normally inherited. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| unset | A CSS-wide keyword that acts like inherit for inherited properties and like initial for other properties. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| revert | A CSS-wide keyword that rolls the value back to what the cascade would use at an earlier origin or level. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| Cascade layer | A named or anonymous group created with @layer. Layer order is considered before specificity within the same origin and importance. | [Cascade layers](12-cascade-layers.md) |
| Computed value | The value after the cascade and inheritance have been resolved and property-specific computation has occurred. Developer tools commonly expose computed styles. | [The cascade and inheritance](10-cascade-and-inheritance.md) |
| Used value | The value after layout has used the computed value to determine the actual result for the element, such as a resolved size. | [The CSS box model](16-box-model.md) |
| Custom property | A property whose name begins with --, such as --brand-color, and whose value is substituted with var(). Custom properties inherit by default. | [Custom properties and design tokens](41-custom-properties-and-design-tokens.md) |

When a style seems wrong, check in this order: does the selector match, is the declaration valid, is it overridden in the cascade, is the property inherited, and does layout constrain its result?

## Values, units, colors, and functions

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Absolute length | A length unit such as px, cm, or pt. CSS pixels are reference units and do not always equal one physical device pixel. | [Values, units, and percentages](13-values-units-and-percentages.md) |
| Relative length | A length that depends on another size or context, such as em, rem, vw, or lh. | [Values, units, and percentages](13-values-units-and-percentages.md) |
| Percentage | A value expressed relative to a reference defined by the property. The reference is not always the containing block's width. | [Values, units, and percentages](13-values-units-and-percentages.md) |
| Viewport unit | A unit based on a viewport dimension, such as vw, vh, svh, lvh, or dvh. Choose variants with mobile browser UI behavior in mind. | [Values, units, and percentages](13-values-units-and-percentages.md) |
| calc() | A function that calculates a value from compatible values and arithmetic operators, for example calc(100% - 2rem). | [CSS math functions](15-css-math-functions.md) |
| min() and max() | Functions that select the smallest or largest result from a list of values. | [CSS math functions](15-css-math-functions.md) |
| clamp() | A function that keeps a value between a minimum and maximum, often used for fluid sizing. | [CSS math functions](15-css-math-functions.md) |
| Color function | A function that describes a color, such as rgb(), hsl(), lab(), or color(). | [Colors and color functions](14-colors-and-color-functions.md) |
| Fallback | A value or declaration that remains usable if a later value or feature is unsupported. A fallback may be another declaration, a var() fallback, or a simpler layout. | [Prefixes, fallbacks, and feature detection](66-prefixes-fallbacks-and-feature-detection.md) |
| Design token | A reusable named choice for a design decision, often represented by a custom property for color, spacing, type, or another repeated value. | [Custom properties and design tokens](41-custom-properties-and-design-tokens.md) |

## The box model and layout

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Box model | The model of an element's content area, padding, border, and margin. These regions affect its size and spacing. | [The CSS box model](16-box-model.md) |
| Content box | The area where an element's content is laid out. | [The CSS box model](16-box-model.md) |
| Padding | Space between the content box and the border. | [Margins and padding](18-margin-and-padding.md) |
| Border | The edge drawn around an element's padding and content. | [Borders, outlines, and shadows](19-borders-outlines-and-shadows.md) |
| Margin | Space outside an element's border. Vertical margins can collapse in some normal-flow situations. | [Margins and padding](18-margin-and-padding.md) |
| box-sizing | Determines how declared width and height relate to the content, padding, and border. border-box includes padding and border in those dimensions. | [The CSS box model](16-box-model.md) |
| Intrinsic size | A size derived from an element's content or intrinsic dimensions instead of being supplied as a fixed CSS length. | [Width, height, and sizing](17-width-height-and-sizing.md) |
| min-content and max-content | Intrinsic sizing keywords representing a small content-based size and a preferred size without soft wrapping, subject to the type of content. | [Width, height, and sizing](17-width-height-and-sizing.md) |
| Normal flow | The default layout behavior in which block boxes stack and inline content flows within lines, unless another layout mode changes it. | [Normal flow and formatting contexts](21-normal-flow-and-formatting-contexts.md) |
| Formatting context | A layout environment that determines how boxes inside a region interact. Block, flex, and grid layout create different formatting contexts. | [Normal flow and formatting contexts](21-normal-flow-and-formatting-contexts.md) |
| Block formatting context | A block layout region with specific containment and interaction rules for floats, margins, and descendants. It is not the same thing as a new stacking context. | [Normal flow and formatting contexts](21-normal-flow-and-formatting-contexts.md) |
| Containing block | The reference box used to calculate some dimensions and offsets. Its establishing element depends on the positioning mode and layout context. | [Positioning](22-positioning.md) |
| Block box | A box that participates in block layout and generally begins on a new line in normal flow. | [Display and box types](20-display-and-box-types.md) |
| Inline box | A box that participates in inline layout within a line box. Width and height do not affect it in the same way as a block box. | [Display and box types](20-display-and-box-types.md) |
| Flex container and flex item | A flex container establishes one-dimensional flex layout for its direct children, which become flex items. | [Flexbox](26-flexbox.md) |
| Grid container and grid item | A grid container establishes a row-and-column layout for its direct children, which become grid items. | [CSS Grid](27-css-grid.md) |
| Track | A row or column in a grid. Tracks can be sized with fixed, flexible, intrinsic, or mixed sizing functions. | [CSS Grid](27-css-grid.md) |
| Gap | Space between rows or columns in layout systems that support gap properties. It does not add space around the outside of the group. | [Alignment and gaps](28-alignment-and-gaps.md) |
| Overflow | The handling of content that does not fit within an element's scrollport or clipping area. | [Overflow and scrolling](24-overflow-and-scrolling.md) |
| Stacking context | A local stacking group whose descendants are painted together in relation to other stacking contexts. A large z-index cannot escape its ancestor stacking context. | [z-index and stacking contexts](23-z-index-and-stacking-contexts.md) |

## Responsive behavior and conditional CSS

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Responsive design | A way of making content and layout adapt to the available space, input, and user preferences rather than targeting one fixed screen. | [Responsive design and media queries](30-responsive-design-and-media-queries.md) |
| Breakpoint | A condition boundary where a layout or style change becomes useful. Choose it based on where the content needs the change. | [Responsive design and media queries](30-responsive-design-and-media-queries.md) |
| Media query | An @media condition that applies styles when media features, such as viewport width or user preference, match. | [Responsive design and media queries](30-responsive-design-and-media-queries.md) |
| Container query | A conditional style based on a query container's size or other supported container feature, rather than only the viewport. | [Container queries](31-container-queries.md) |
| Feature query | An @supports condition that checks whether a browser supports a CSS declaration or feature. | [Feature queries and progressive enhancement](51-feature-queries-and-progressive-enhancement.md) |
| Logical property | A property named for a writing direction or dimension, such as margin-inline or padding-block, instead of a physical side. | [Logical properties and writing modes](32-logical-properties-and-writing-modes.md) |
| Writing mode | The direction in which lines of text are laid out and the direction in which blocks progress. It affects how logical properties map to physical sides. | [Logical properties and writing modes](32-logical-properties-and-writing-modes.md) |
| Fluid sizing | A size that can vary continuously within limits, often combining relative units with clamp(). | [Responsive typography and fluid sizing](59-responsive-typography-and-fluid-sizing.md) |

## Text, imagery, and visual effects

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Font stack | An ordered list of font family choices. If a preferred font is unavailable, the browser tries later choices. | [Fonts and typography](34-fonts-and-typography.md) |
| Line height | The height of a line box used for inline content. The line-height property can use a number, length, or percentage. | [Fonts and typography](34-fonts-and-typography.md) |
| Text wrapping | The way text breaks across lines or wraps around other content. Properties such as overflow-wrap, word-break, and white-space affect it. | [Text layout and wrapping](35-text-layout-and-wrapping.md) |
| Replaced element | An element whose rendered content is supplied by an external resource or the browser, such as an image or video. | [Replaced elements and object fitting](40-replaced-elements-and-object-fitting.md) |
| object-fit | Controls how replaced content is resized inside its content box, for example cover or contain. | [Replaced elements and object fitting](40-replaced-elements-and-object-fitting.md) |
| Aspect ratio | A proportional relationship between width and height. The aspect-ratio property can reserve or influence that relationship. | [Replaced elements and object fitting](40-replaced-elements-and-object-fitting.md) |
| Transform | A visual change such as translation, rotation, or scaling that does not normally move surrounding content in normal flow. | [Transforms](43-transforms.md) |
| Transition | A gradual change between values when a property changes and the transition conditions are met. | [Transitions](44-transitions.md) |
| Keyframes | Named points that describe the values of an animation over time, declared with @keyframes. | [Animations and keyframes](45-animations-and-keyframes.md) |
| Filter | A visual effect applied to rendered content, such as blur or grayscale. | [Filters, blending, and opacity](47-filters-blending-and-opacity.md) |
| Clip or mask | A way to limit which parts of an element are visible. Clipping defines a visible region; masking uses an image or alpha values to control visibility. | [Clipping, masking, and shapes](48-clipping-masking-and-shapes.md) |

## Accessibility, interaction, and user preferences

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Focus indicator | A visible style that identifies the element currently reached by keyboard or another focus mechanism. Do not remove it without providing a clear alternative. | [Focus styles and keyboard interaction](54-focus-and-keyboard-interaction.md) |
| :focus-visible | A pseudo-class for styling focus when the browser determines that a visible focus indication is appropriate, commonly during keyboard navigation. | [Focus styles and keyboard interaction](54-focus-and-keyboard-interaction.md) |
| Reduced motion | A user preference that can be queried with prefers-reduced-motion. Respect it by reducing or removing nonessential motion. | [Accessible CSS and user preferences](53-accessible-css-and-user-preferences.md) |
| Forced colors | A user preference mode that uses a limited color palette, commonly to improve contrast. Test important borders, states, and focus indicators in that mode. | [Accessible CSS and user preferences](53-accessible-css-and-user-preferences.md) |
| Color scheme | A preferred light or dark presentation that can be exposed through color-scheme and queried with prefers-color-scheme. | [Color schemes and theming](55-color-schemes-and-theming.md) |
| Print stylesheet | Styles applied for print media, often to remove unnecessary interface decoration and make the document easier to read on paper. | [Print styles](56-print-styles.md) |
| Progressive enhancement | Starting with a usable baseline, then adding supported features when available. Feature queries can help keep enhancements conditional. | [Feature queries and progressive enhancement](51-feature-queries-and-progressive-enhancement.md) |

## Architecture, compatibility, and performance

| Term | Meaning | Related lesson |
| :--- | :--- | :--- |
| Reset stylesheet | A deliberate set of starting rules that reduces or normalizes browser defaults for a project. A reset should be understood and kept as small as the project needs. | [Resets and base styles](61-resets-and-base-styles.md) |
| Base styles | Shared defaults for page-wide choices such as box sizing, typography, colors, and document spacing. | [Resets and base styles](61-resets-and-base-styles.md) |
| Component styles | Rules associated with a reusable interface part. Keep their scope and naming predictable to reduce accidental effects. | [Scoped styles and component styling](52-scoping-and-component-styles.md) |
| CSS architecture | The conventions used to divide, name, scope, and maintain styles across a project. | [CSS architecture and naming conventions](60-css-architecture-and-naming.md) |
| Cascade management | Organizing rules, layers, scope, and specificity so that expected styles win without escalating selector weight. | [Organizing large stylesheets](62-organizing-large-stylesheets.md) |
| Shadow DOM | A DOM subtree with its own encapsulation boundaries. Ordinary page selectors do not freely match into a shadow tree. | [Shadow DOM and web components](63-shadow-dom-and-web-components.md) |
| Validation | Checking CSS syntax and conformance to catch errors. Passing validation does not by itself prove the design is accessible or behaves as intended. | [Validation and browser compatibility](65-validation-and-browser-compatibility.md) |
| Browser compatibility | Whether a browser supports a feature and implements it sufficiently for the intended use. Consider the browsers and devices your audience needs. | [Validation and browser compatibility](65-validation-and-browser-compatibility.md) |
| Vendor prefix | A historical or browser-specific property prefix. Prefer standard properties when available and keep compatibility declarations only when they are needed. | [Prefixes, fallbacks, and feature detection](66-prefixes-fallbacks-and-feature-detection.md) |
| Critical CSS | The styles needed for the first visible portion of a page. Managing it is a performance tradeoff and should be guided by measurement. | [CSS performance](67-css-performance.md) |
| Render-blocking stylesheet | A stylesheet that the browser must process before it can render content that depends on those styles. Loading strategy can affect first render. | [CSS performance](67-css-performance.md) |
| Performance profile | Measurements and diagnostics used to identify real rendering or loading bottlenecks. Optimize after observing a meaningful issue. | [CSS performance](67-css-performance.md) |

## A quick CSS troubleshooting path

When a declaration is not producing the result you expect:

1. Confirm that the stylesheet is connected and loaded.
2. Check for syntax errors around the rule.
3. Confirm the selector matches the intended element.
4. Check the browser's Styles panel for overridden or invalid declarations.
5. Inspect computed values and inherited values.
6. Check the containing block, formatting context, and layout mode.
7. Check whether an ancestor clips, transforms, or creates a stacking context.
8. Test the relevant viewport, input method, browser, and user preference.
9. Reduce the case to a small example, then add the surrounding rules back one group at a time.

This sequence helps separate a selector or cascade issue from a layout constraint or a browser-support issue.

## Key points

- CSS rules pair selectors with declarations, while at-rules control broader stylesheet behavior.
- The cascade considers more than specificity. Origin, importance, layer, and source order also matter.
- Layout depends on boxes, containing blocks, formatting contexts, and the chosen layout mode.
- Relative values, logical properties, and responsive conditions help styles adapt to context.
- Accessibility preferences, keyboard focus, and print behavior belong in ordinary CSS planning.
- Validation and reference tables help, but they do not replace browser inspection and testing.
- Use this glossary as an index back into the detailed lessons.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next |
| :--- | :--- | :--- | :--- |
| [68 - Practical page projects](68-practical-page-projects.md) | [Q&A](../qnas/69-css-reference-and-glossary.md) | [Example](../examples/69-css-reference-and-glossary.md) | End of current lesson sequence |