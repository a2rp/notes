# 51 - Feature queries and progressive enhancement

CSS feature queries let a stylesheet apply a group of rules only when the browser recognizes the tested CSS feature. Combined with a useful baseline, they let a page gain newer styling while remaining usable when that styling is unavailable.

## Learning outcomes

After this chapter, you should be able to:

- Explain progressive enhancement and feature detection.
- Write declaration tests with `@supports`.
- Combine conditions with `and`, `or`, and `not`.
- Use a baseline style and add enhancements only when supported.
- Recognize what a support query tests and what it cannot guarantee.
- Use the JavaScript `CSS.supports()` method when a CSS decision must be made in script.

## Progressive enhancement

Progressive enhancement starts with content and behavior that work with basic browser capabilities. Additional presentation or behavior is layered on when a browser supports it. In CSS, a simple baseline can be followed by an enhancement:

~~~css
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@supports (display: grid) {
  .card-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
~~~

The regular rule comes first and provides the baseline. A browser that recognizes the tested grid declaration applies the rules inside the block. A browser that does not recognize it ignores that conditional block and keeps the flex layout.

Keep essential information and actions available in the baseline. The enhanced layout can improve presentation, but should not be the only way to find content or operate the page.

## Testing a declaration

A declaration support query uses parentheses around a property and value:

~~~css
@supports (display: grid) {
  .layout {
    display: grid;
  }
}
~~~

The browser evaluates whether it recognizes the tested declaration. The declarations inside the block apply when the condition is true. They do not apply when it is false.

A support query does not select an element and does not assign the tested value by itself. It only controls whether the enclosed rules apply. Put the actual declaration in the block when you want to use the feature.

A query is not a browser-version check. Ask about the CSS capability the enhancement needs instead of assuming that a particular browser name or version has it.

## Testing multiple features

Use `and` when an enhancement needs every listed capability:

~~~css
@supports (display: grid) and (gap: 1rem) {
  .layout {
    display: grid;
    gap: 1rem;
  }
}
~~~

Both declaration tests must be true for the block to apply.

Use `or` when either alternative is sufficient:

~~~css
@supports (display: grid) or (display: flex) {
  .layout {
    gap: 1rem;
  }
}
~~~

Use parentheses around each declaration test. Avoid mixing `and` and `or` in one condition without grouping; explicit parentheses make the intended logic clear:

~~~css
@supports ((display: grid) or (display: flex)) and (gap: 1rem) {
  /* Rules for layouts with a supported layout mode and gap. */
}
~~~

## Negation

Use `not` to check that a feature is not supported:

~~~css
@supports not (display: grid) {
  .layout {
    /* Optional styles for the no-grid case. */
  }
}
~~~

Most of the time, a useful default rule followed by an enhancement is easier to maintain than separate supported and unsupported branches. Use a negative query only when the unsupported case truly needs distinct styling.

## Simple declaration fallbacks

Some individual declarations can use the cascade as a fallback. Write a value that works first, then a value that improves the result in browsers that accept it:

~~~css
.panel {
  background-color: #243447;
  background-color: color-mix(in srgb, #243447 88%, white);
}
~~~

A browser that rejects the second value discards that declaration and keeps the earlier background color. This technique is concise, but it does not group related rules or explain a complex dependency. Use `@supports` when several declarations must change together or when the enhancement needs a clear condition.

Do not put the fallback after the enhanced declaration. Later valid declarations can override earlier ones:

~~~css
.panel {
  background-color: color-mix(in srgb, #243447 88%, white);
  background-color: #243447;
}
~~~

In a browser that accepts both values, the later plain color wins, so the enhancement is lost.

## Selector support queries

The `selector()` form can test whether a selector is recognized:

~~~css
@supports selector(:has(> img)) {
  .card:has(> img) {
    grid-template-rows: auto 1fr;
  }
}
~~~

This can guard styles that depend on a selector feature. Selector support queries are defined by CSS Conditional Rules Level 4. If a project targets older browser environments, check the required support and keep a working baseline outside the query.

A selector query asks whether the selector is supported. It does not test whether the current document contains an element matching that selector.

## The JavaScript `CSS.supports()` method

CSS also exposes support checks to JavaScript:

~~~js
if (CSS.supports("display", "grid")) {
  document.documentElement.classList.add("supports-grid");
}
~~~

The two-argument form accepts a property and value. A condition string can also be checked:

~~~js
const hasGridAndGap = CSS.supports("(display: grid) and (gap: 1rem)");
~~~

Use this when script needs to choose a behavior based on CSS support. If only styling needs to vary, a CSS `@supports` rule is usually simpler and avoids coupling the stylesheet to a script-added class.

A positive result means the browser accepts the tested CSS syntax according to its support rules. It does not prove that every combination will render exactly as intended in every context. Test the whole enhancement in the browsers and conditions your project supports.

## What feature queries do not test

Feature queries test CSS support, not every environmental or visual outcome. For example, they do not establish that:

- A requested font file has downloaded successfully.
- A particular element exists in the page.
- A layout has enough room for its content.
- A color combination has enough contrast.
- A feature behaves correctly in every combination with other features.
- A user preference allows an animation or effect.

Use the relevant CSS mechanism for those concerns, such as fallbacks, media queries, responsive constraints, accessible color choices, or reduced-motion rules.

## Common mistakes

- **Treating `@supports` as a polyfill:** it detects whether CSS syntax is supported; it does not add missing support.
- **Testing one property but depending on several:** query every capability that the enhancement actually requires.
- **Putting the only usable style inside a query:** unsupported browsers then get no baseline presentation.
- **Using an invalid test:** write a valid declaration in parentheses, such as `@supports (display: grid)`.
- **Confusing selector support with matching elements:** `selector()` tests the selector syntax, not the page content.
- **Using a support test as a complete quality check:** accepted syntax is not a guarantee of visual fit, accessibility, or successful resource loading.
- **Adding needless negative branches:** start with a sensible baseline and add only the supported enhancement.

## Try it yourself

1. Make a card list with a wrapping flex baseline and a grid enhancement.
2. Change the query so the grid enhancement requires both grid and gap support.
3. Add an `or` query for two alternative values that can achieve the same goal.
4. Write a negative query and decide whether a separate unsupported-case rule is necessary.
5. Add a pair of background declarations and observe how the later supported value acts as a fallback enhancement.
6. Move the fallback after the enhancement and explain why the fallback wins in supporting browsers.
7. Guard a selector-based enhancement with `selector()` and retain a general baseline.
8. Compare a CSS `@supports` block with a JavaScript `CSS.supports()` check. Identify which layer needs the decision.

## Key points

- Progressive enhancement begins with a useful baseline and adds optional capabilities when available.
- `@supports` evaluates whether a browser accepts a CSS declaration or supported selector query.
- Use `and`, `or`, and `not` to express feature dependencies, with clear grouping.
- An `@supports` block does not polyfill a feature or test whether the page content matches a selector.
- Repeated declarations can provide a simple fallback for one property; conditional blocks help coordinate larger enhancements.
- `CSS.supports()` exposes related checks to JavaScript, but CSS-only decisions usually belong in CSS.
- Keep essential content, readability, and operation available without the enhancement.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [50 - At-rules, imports, and font-face](50-at-rules-and-imports.md) | [Q&A](../qnas/51-feature-queries-and-progressive-enhancement.md) | [Example](../examples/51-feature-queries-and-progressive-enhancement.md) | [52 - Scoped styles and component styling](52-scoping-and-component-styles.md) |
