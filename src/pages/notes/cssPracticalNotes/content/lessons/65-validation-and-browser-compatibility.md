# 65 - Validation and browser compatibility

CSS validation and browser testing answer different questions. A validator can help find syntax and conformance problems. Browser testing shows how supported CSS behaves in the browsers, devices, settings, and layouts that matter to your audience.

Neither step alone proves that a page is correct. A stylesheet can pass validation and still have a layout bug, poor contrast, an inaccessible state, or a feature that is unsupported by part of the audience.

## What CSS validation can tell you

A CSS validator parses a stylesheet and reports issues such as malformed syntax, unknown properties, invalid values, or declarations that do not conform to the checked CSS rules. A linter can also apply project-specific conventions, catch likely mistakes, and keep formatting consistent.

Treat each message as a clue to investigate, not as a verdict about the whole page:

- An error can identify a declaration that a browser will ignore.
- A warning may describe valid CSS that is unusual, outdated, or worth reviewing.
- A message may not understand a newer feature, a custom property, a vendor extension, generated CSS, or a project-specific build step.
- A clean result does not prove that a selector matches the intended element or that the result looks right.
- A clean result does not test keyboard use, screen reader output, performance, or visual quality.

When a tool reports a problem, check the exact file and line, confirm whether the CSS is authored or generated, and decide whether the finding applies to this project. Fix real problems at their source. Do not silence a warning without understanding it.

## Syntax, support, and behavior are different checks

It helps to separate three questions:

1. **Is the CSS written in valid syntax?** A parser or validator can help answer this.
2. **Does the browser recognize this property and value?** Compatibility information and feature queries can help answer this.
3. **Does the feature behave correctly in the actual interface?** Testing in the relevant browser and context is needed to answer this.

If a browser does not understand one declaration, it generally ignores that declaration and continues parsing later CSS. This error handling helps a page remain usable, but the resulting fallback may be incomplete. A stylesheet can therefore parse without errors while a particular layout feature is missing.

A feature query checks whether a browser claims to support a declaration or selector syntax. It does not prove that the feature is free of implementation bugs, that it works well in every context, or that the design is accessible. Test the behavior you rely on.

## Decide what browsers and conditions to support

There is no single browser list that fits every project. Set support expectations from the people who will use the page, the devices they have, and the cost of failure.

Consider:

- Desktop and mobile browsers used by the audience.
- The browser versions and operating system versions that matter to the project.
- Embedded browsers or web views if the page will be opened inside another app.
- Keyboard, touch, mouse, and other relevant input methods.
- Narrow and wide viewports, zoom, orientation, and text scaling.
- Reduced motion, forced colors, dark or light color scheme, and print if relevant.
- Critical tasks that must remain possible when an enhancement is unavailable.

Compatibility tables and browser support summaries are useful planning evidence. Check what feature and exact value are covered, which browser versions are included, and when the information was last updated. A broad label such as “supported” does not tell you whether a feature works in every older release or every embedded browser.

Write down the support target before making compatibility changes. This prevents unnecessary work for browsers the project does not support and helps reveal meaningful gaps in the browsers it does support.

## Build a practical browser test matrix

A test matrix records a manageable set of browser and environment combinations. It should cover the combinations that can change the result, rather than every theoretical device.

For each combination, check the important page flows and CSS behaviors:

- Does the page load with the expected stylesheets?
- Can the user read and operate the main content?
- Does the layout fit without unintended horizontal scrolling?
- Do navigation, controls, forms, and interactive states remain visible and usable?
- Does content reflow at narrow widths and at increased zoom?
- Are text, focus indicators, borders, and control states distinguishable?
- Do images, fonts, icons, and other assets load and size correctly?
- Does the page still work when an optional visual enhancement is unavailable?
- Do print styles and motion preferences behave as intended, if in scope?

Start with the primary browsers and devices identified by the support target. Add combinations when a feature, user report, or previous bug makes them relevant. Record the browser and version, operating system or device, viewport, steps, and observed result for any issue so it can be reproduced.

## Test the actual feature and its fallback

A browser support table can tell you where a feature is expected to exist, but test the role it plays in your design. If a layout depends on a feature, ask:

- What is the basic layout without it?
- Does the content remain in a sensible order?
- Can the user still complete the main task?
- Does the enhancement improve the experience without hiding necessary content?
- Is there a simple fallback that works in the project's target browsers?

Progressive enhancement starts with a usable base and adds an enhancement where the browser supports it. This can be preferable to making core content depend on a newer layout or visual effect.

Feature queries can apply an enhancement when a declaration is supported:

~~~css
.notice {
  padding: 1rem;
  border: 2px solid #375a43;
}

@supports (text-wrap: balance) {
  .notice__title {
    text-wrap: balance;
  }
}
~~~

The base rule still provides a readable notice. The feature query only applies the additional wrapping behavior when the browser recognizes that declaration. The query does not test whether the result is aesthetically ideal, so inspect it at relevant widths.

For layout fallback, write the baseline first and then add the enhanced layout. For example, a simple block layout can remain usable if a browser ignores a later Grid declaration:

~~~css
.card-list {
  display: block;
}

.card {
  margin-block: 1rem;
}

@supports (display: grid) {
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: 1rem;
  }

  .card {
    margin: 0;
  }
}
~~~

The fallback should be designed and tested, not merely left as whatever happens after an unsupported declaration is ignored.

## Diagnose a cross-browser difference

When a page differs across browsers, reduce the problem before changing the stylesheet:

1. Record the browser, version, operating system or device, viewport, zoom, and relevant preference settings.
2. Reproduce the same page state and user action in each browser.
3. Inspect the affected element and computed styles in both.
4. Check whether the stylesheet loaded and whether the declaration parsed.
5. Reduce the case to the smallest HTML and CSS that still shows the difference.
6. Identify whether the cause is unsupported syntax, a different supported value, default styling, font or asset behavior, layout sizing, an implementation difference, or an application bug.
7. Choose a standards-based fallback, a simpler layout, a feature query, or another appropriate correction.
8. Retest the original page and nearby conditions to check for regressions.

Do not begin by assuming a browser is broken or by adding vendor prefixes at random. A difference can come from missing CSS, invalid syntax, a different user setting, an intrinsic sizing constraint, or different content. Reproduce and isolate the cause first.

## Keep validation useful

A consistent validation workflow can include:

- Validate authored CSS when introducing a major stylesheet or diagnosing suspicious syntax.
- Run the project's lint and build checks when they are part of its normal workflow.
- Review browser developer tools for failed stylesheets, invalid declarations, and console messages.
- Check the relevant browser support data for the exact feature and value.
- Test in the target browsers and viewport conditions.
- Recheck the page after a fix, including the original failure and related layouts.

A tool does not need to run after every character typed. Use checks at meaningful points, and keep their output connected to a specific file, build, or browser run.

## Common mistakes

- **Treating a valid stylesheet as a correct page:** Validation does not inspect every visual, interactive, or accessibility outcome.
- **Treating an unsupported feature as a syntax typo:** Confirm the browser, version, declaration, and value before changing valid CSS.
- **Relying on a feature query as a full test:** It checks support recognition, not complete behavior or quality.
- **Testing only the developer's current browser:** Use the support target to choose meaningful coverage.
- **Testing only one viewport:** Narrow widths, zoom, and text scaling can expose different problems.
- **Confusing a browser brand with a fixed rendering engine and version:** Record the actual browser and environment that reproduced the issue.
- **Adding prefixes without a reason:** Check the feature's status, target browsers, and project toolchain first. Prefix and fallback strategy is covered in the next chapter.
- **Trying to support every old browser without a project requirement:** Agree on support expectations and focus effort on real users.
- **Removing a fallback because the modern browser looks fine:** Verify the fallback in a browser where the enhancement is unavailable.
- **Fixing a warning by hiding it:** Understand whether it reports a real issue before suppressing it.
- **Making a change without recording reproduction steps:** A precise report makes the fix easier to confirm and maintain.

## Try it yourself

1. Validate a small stylesheet that includes a misspelled property. Find the reported line and fix the spelling.
2. Add a valid but unsupported declaration to a test rule and inspect how your browser handles it.
3. Write a baseline style and an enhancement inside `@supports`. Confirm the base still contains the needed content and spacing.
4. Check the support target for one CSS feature used in a project. Note the exact property or value, browser versions, and any exclusions.
5. Test one page at a narrow viewport, a wide viewport, and increased zoom.
6. Check the same layout in two target browsers and record the browser versions and viewport sizes.
7. Disable an optional enhancement in developer tools and decide whether the remaining page is usable.
8. Introduce a small visual difference, reproduce it, and reduce the issue to the smallest useful HTML and CSS case.
9. Recheck focus, contrast, content order, and overflow after applying a compatibility fix.
10. Write a short support target for a page you maintain and list the browser and viewport combinations you will test.

## Key points

- Validation checks syntax and conformance; it does not prove that the rendered page is correct.
- Compatibility depends on the exact feature, value, browser version, environment, and user conditions.
- Use support information to plan tests, then test the actual behavior that matters.
- Build a usable baseline before adding optional enhancements.
- `@supports` tests whether a browser recognizes declarations or selector syntax, not whether every behavior is bug free.
- Reproduce browser differences with recorded steps and inspect the computed result before changing CSS.
- Verify fixes in the original failing case and in related browsers, widths, and states.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [64 - Debugging with browser developer tools](64-debugging-with-browser-devtools.md) | [Q&A](../qnas/65-validation-and-browser-compatibility.md) | [Example](../examples/65-validation-and-browser-compatibility.md) | [66 - Prefixes, fallbacks, and feature detection](66-prefixes-fallbacks-and-feature-detection.md) |