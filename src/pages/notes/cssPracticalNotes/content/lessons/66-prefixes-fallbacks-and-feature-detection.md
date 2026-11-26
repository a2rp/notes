# 66 - Prefixes, fallbacks, and feature detection

A CSS fallback is a simpler declaration or layout that remains useful when a browser does not understand an enhancement. Vendor prefixes are older browser-specific spellings that may still appear in existing stylesheets or be needed for a defined target. Feature detection lets CSS apply an enhancement only when the browser recognizes the feature.

Start with the standard, unprefixed CSS and a usable baseline. Add only the fallbacks and prefixes required by the browsers in the project's support target, then test the result in those browsers.

## Declaration fallbacks

Browsers generally ignore a declaration whose property or value they do not understand, then continue with other declarations. You can use this behavior to put a broadly understood value before a newer value:

~~~css
.notice {
  color: #174d37;
  color: oklch(42% 0.09 155);
}
~~~

A browser that recognizes both values uses the later one. A browser that does not recognize `oklch()` ignores that declaration and keeps the earlier color.

This works when the later declaration is an enhancement of the same property and when the earlier value is still a good choice. Keep declarations together so readers can see the fallback and the enhanced value.

Do not assume every error behaves like a single invalid declaration. For example, an invalid selector in a comma-separated selector list can cause the entire rule to be discarded in some cases. Use a feature query or separate rules when an unsupported selector could invalidate useful styling.

## Layout fallbacks

A fallback can also be a complete layout. Start with a simple arrangement, then enhance it inside a feature query:

~~~css
.card-list {
  display: block;
}

.card + .card {
  margin-top: 1rem;
}

@supports (display: grid) {
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1rem;
  }

  .card + .card {
    margin-top: 0;
  }
}
~~~

The base list remains readable if the browser does not recognize Grid. The enhanced layout adds columns and gaps when the declaration is recognized. Check that the minimum column size fits the content area and the target viewports.

A fallback is part of the design. Decide what order, spacing, and interaction the baseline should have instead of relying on accidental browser defaults.

## Vendor-prefixed declarations

A vendor prefix is a browser-specific spelling historically used for experimental or nonstandard features. Common prefixes include `-webkit-`, `-moz-`, and `-ms-`. Many features that once needed prefixes are now available with standard unprefixed syntax.

When a prefix is necessary for a browser in the support target, put the prefixed declaration before the standard declaration:

~~~css
.frosted-panel {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
~~~

Browsers that understand only the prefixed form can use it. Browsers that understand the standard form use the standard declaration that follows. If neither is recognized, neither effect applies, so the page should have a usable non-blurred appearance already.

Prefixes are not all interchangeable. Some prefixed features used different syntax or behavior from the final standard. A prefixed declaration does not guarantee that the browser implements the same semantics as the standard version.

Before adding one, check:

- Whether the feature still needs a prefix for a browser you support.
- Whether the prefix uses the same property name, value syntax, or behavior as the standard feature.
- Whether a simpler fallback is sufficient for that browser.
- Whether the project already generates prefixes during its build.

Do not add every known prefix by habit. Unneeded prefixes make stylesheets harder to read and maintain, and can preserve old behavior the project no longer intends to support.

## Feature queries with `@supports`

A feature query applies a block only when the browser recognizes the requested CSS declaration or selector syntax:

~~~css
@supports (backdrop-filter: blur(10px)) {
  .frosted-panel {
    background: rgb(255 255 255 / 75%);
    backdrop-filter: blur(10px);
  }
}
~~~

You can check an alternative spelling with `or`:

~~~css
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .frosted-panel {
    background: rgb(255 255 255 / 75%);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}
~~~

The panel should have an opaque background outside the feature query. That way, browsers without either spelling still show readable content.

Use `and` when an enhancement needs multiple declarations to be recognized:

~~~css
@supports (display: grid) and (gap: 1rem) {
  .card-list {
    display: grid;
    gap: 1rem;
  }
}
~~~

Use `not` when a separate fallback is needed for browsers that do not recognize a feature:

~~~css
@supports not (display: grid) {
  .card + .card {
    margin-top: 1rem;
  }
}
~~~

A browser that does not parse the `@supports` rule cannot use the conditional block. Its base rules still need to provide an acceptable result.

Feature queries check whether the browser recognizes a declaration or selector syntax. They do not prove that its implementation is bug free or that the resulting design is accessible. Inspect and test the actual result.

## Feature queries for selectors

The `selector()` form can test whether a selector is recognized:

~~~css
@supports selector(:focus-visible) {
  .action:focus-visible {
    outline: 3px solid #9b4c00;
    outline-offset: 3px;
  }
}
~~~

For interactive controls, keep a usable focus style outside the query too. The enhancement can refine the style for browsers that support `:focus-visible`, while the baseline still provides a visible focus indicator:

~~~css
.action:focus {
  outline: 3px solid #9b4c00;
  outline-offset: 3px;
}

@supports selector(:focus-visible) {
  .action:focus:not(:focus-visible) {
    outline: none;
  }

  .action:focus-visible {
    outline: 3px solid #9b4c00;
    outline-offset: 3px;
  }
}
~~~

Choose selector fallbacks carefully. A broad fallback should not remove keyboard feedback or make an important control harder to identify.

## Prefix generation in a build

A project may use a CSS processing tool to generate prefixes for a chosen browser target. A tool such as Autoprefixer uses browser support data to decide which prefixes to add. The project's browser target is part of that decision, so generated output depends on its configuration and data.

If a project uses prefix generation:

1. Write the standard unprefixed CSS in the source.
2. Configure the browser target intentionally.
3. Run the normal build or stylesheet processing step.
4. Inspect generated CSS when a compatibility issue occurs.
5. Test the actual output in the target browsers.

Do not manually duplicate generated prefixes in source unless the project has a specific reason. Do not treat prefix generation as a polyfill: it does not implement a missing layout or feature in every browser.

## Fallback patterns

Choose a pattern that matches the feature:

- **Alternate values for one property:** Put a broad value first and a newer supported value afterward.
- **Optional declaration:** Keep the baseline outside `@supports`, then add the enhancement inside.
- **Alternative spellings:** Use an `or` feature query when the target browsers need a prefixed and standard form.
- **Different layout strategy:** Write a useful base layout and switch to the enhancement when its required declarations are recognized.
- **Known implementation issue:** First confirm the affected browser and behavior. Use a narrow workaround with a comment that explains the reason and the support conditions.

Avoid redundant fallbacks that do not serve a real target. Each fallback should have a clear purpose and a way to verify it.

## Test fallback and enhanced states

For each compatibility feature:

1. Identify the baseline experience and the target browsers.
2. Check the exact property, value, or selector the enhancement needs.
3. Add a feature query only if it changes what CSS should apply.
4. Inspect the rendered result in at least one browser that uses the enhancement.
5. Inspect or simulate the baseline by disabling the conditional block.
6. Test the relevant viewport, content length, focus state, and user preferences.
7. Confirm the enhancement does not hide, reorder, or make important content unusable.
8. Remove any temporary DevTools edits and verify the final source.

Simulation can help inspect a fallback, but it cannot perfectly reproduce a browser's implementation. Test real supported browser versions when compatibility matters.

## Common mistakes

- **Using only a new declaration:** An older browser may ignore it and leave a poor result.
- **Putting the fallback after the enhancement:** If both values are recognized, the later fallback can override the newer value.
- **Adding prefixes without a support requirement:** This adds code without proving it fixes a real target.
- **Assuming a prefix is equivalent to the standard:** Historical syntax and behavior can differ.
- **Depending on `@supports` for the baseline:** A browser that cannot parse the feature query will not use its enhancement block.
- **Treating `@supports` as a visual test:** Recognition is not proof of correct behavior.
- **Relying on a generated prefix without checking the build output:** The output depends on the configured browser target and processing pipeline.
- **Using a prefix as a polyfill:** A prefix does not provide a complete implementation for a browser that lacks the feature.
- **Testing only the enhanced state:** A fallback may have different spacing or order and can expose bugs of its own.
- **Using an overly broad selector fallback:** It can weaken keyboard focus or affect elements beyond the intended target.

## Try it yourself

1. Set a base color, then add a newer color value for the same property. See which value the browser uses.
2. Create a block layout first, then add a Grid enhancement inside `@supports`.
3. Disable the feature query temporarily and check that the baseline remains usable.
4. Add a visible baseline focus style, then refine it inside a selector feature query.
5. Inspect a stylesheet that contains prefixes. Identify which declarations are still needed for the project's browser target.
6. If your project uses a prefix generation tool, inspect its target configuration and generated output.
7. Remove a prefix that has no target requirement in a local copy and compare the result in the intended browsers.
8. Add a short comment to a compatibility workaround explaining the affected target and reason.
9. Test a longer card title and a narrow viewport in both fallback and enhanced layouts.
10. After testing, undo temporary changes and check that the saved source contains the intended fallback order.

## Key points

- Put a usable baseline before optional enhancements.
- For alternate values of one property, put the fallback first and the newer value after it.
- Add vendor-prefixed declarations only for a known support need, and place the standard form after them.
- Use `@supports` to conditionally apply recognized declarations or selectors.
- Feature queries check recognition, not full behavior or accessibility.
- A prefix generator follows the project's browser targets and does not polyfill missing features.
- Test both the fallback and the enhanced state in the browsers and conditions the project supports.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [65 - Validation and browser compatibility](65-validation-and-browser-compatibility.md) | [Q&A](../qnas/66-prefixes-fallbacks-and-feature-detection.md) | [Example](../examples/66-prefixes-fallbacks-and-feature-detection.md) | [67 - CSS performance](67-css-performance.md) |