# 67 - CSS performance

CSS affects how quickly a browser can render a page and how much work it does when the page changes. Good performance work starts by measuring a real problem, identifying the CSS or resource involved, and checking that a change improves the experience without breaking the design.

Do not optimize CSS just because a selector looks unusual or a stylesheet has many lines. Modern browsers handle many patterns efficiently. Focus on the critical styles, unused bytes, repeated rendering work, and animations that profiling shows are expensive.

## How CSS affects rendering

A simplified rendering sequence is:

1. The browser parses HTML and discovers stylesheets.
2. It downloads and parses CSS to build the CSS Object Model.
3. It combines document structure and styles to determine what to render.
4. It calculates layout, paints pixels, and composites layers.

A stylesheet needed for the first view can delay the initial render while the browser downloads and processes it. After the page is visible, style changes can cause more work:

- **Style recalculation:** The browser determines which declarations apply.
- **Layout:** The browser calculates element sizes and positions.
- **Paint:** The browser draws visual details such as text, borders, and backgrounds.
- **Compositing:** The browser combines rendered layers for display.

A property change may use one or several of these steps. The cost depends on the property, the number of affected elements, their layout, the browser, and the device. Use a performance trace to find the work that actually repeats.

## Keep critical CSS easy to discover

The browser needs styles to render content as intended. Make important stylesheet links discoverable early in the document, usually in the `head`:

~~~html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./styles.css">
  <title>Field Notes</title>
</head>
~~~

Avoid long chains of CSS `@import` when normal stylesheet links can express the dependencies. A stylesheet discovered only after another file is downloaded and parsed may add a request step before its rules are available.

Split CSS by purpose only when the split has a clear effect. For example, a print-only stylesheet can use a print media condition:

~~~html
<link rel="stylesheet" href="./print.css" media="print">
~~~

A media condition that does not match the current device can keep those rules from blocking that screen's render, but the resource may still be downloaded. Check the network and rendering behavior rather than assuming that a media attribute removes all cost.

Do not move every stylesheet to a delayed or asynchronous loading pattern. If essential styles arrive late, users can see unstyled content, layout shifts, or controls in the wrong position.

## Reduce the CSS the page needs

A smaller stylesheet takes less time to transfer and parse. Find repeated or unused rules, then remove them from the source or the build output when you confirm they are unnecessary.

Check CSS usage across the routes and states where it matters. A rule that appears unused on one page may be needed on another page, after an interaction, at a narrow viewport, or in a print stylesheet. Coverage tools show what was used during the specific recording, not every state the application can reach.

Use your build process to minify production CSS when appropriate. Minification removes formatting and can reduce transfer size, while source files can remain readable for maintenance. Compression during transfer can reduce file size further. Measure the delivered output, not just the source file's character count.

Splitting one stylesheet into many smaller files can help when each page needs a distinct subset, but it can also add requests and coordination cost. Keep the initial page's critical styles together when that makes discovery and caching more effective. Choose based on the site's routes, delivery setup, and measurements.

## Avoid unnecessary stylesheet imports

An `@import` rule creates a dependency that the browser discovers after it receives and parses the importing stylesheet:

~~~css
/* Avoid adding chains like this without a specific reason. */
@import url("./components.css");
~~~

Prefer a clear set of stylesheet links in the document or a build step that combines and processes source files. A project may intentionally use CSS modules or a bundler; inspect the emitted output and request sequence before changing its organization.

## Use critical CSS carefully

Critical CSS is the small set of styles needed for the initial visible content. Inlining those rules in the document can remove a request from the initial render path, but it duplicates CSS, can enlarge HTML, and requires keeping inline and external styles in sync.

Treat critical CSS extraction and inlining as an advanced optimization. Consider it only after measurements show stylesheet delivery is delaying important content. Keep the inline block small, avoid duplicating the full stylesheet, and verify that the rest of the page still loads correctly.

## Profile CSS animations

Animating an element's geometry or layout can require repeated layout and paint work. Examples include changing `width`, `height`, `top`, `left`, `margin`, or `padding` every frame.

For simple movement or fading, `transform` and `opacity` can often avoid layout changes:

~~~css
.status-indicator {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 160ms ease, transform 160ms ease;
}

.status-indicator.is-hidden {
  opacity: 0;
  transform: translateY(-0.25rem);
}
~~~

These properties are often good animation candidates, but they are not a universal guarantee of smooth performance. The browser may still need to paint or allocate layers, and large effects can remain expensive. Profile the actual page and keep the animated area small.

Avoid animating a large shadow, blur, or layout property continuously unless the effect has been measured and is needed. A simple state change can be clearer and cheaper than an elaborate animation.

Respect the user's reduced-motion preference when motion is not essential:

~~~css
@media (prefers-reduced-motion: reduce) {
  .status-indicator {
    transition: none;
  }
}
~~~

## Use `will-change` sparingly

`will-change` is a hint that a property may change soon. Browsers can prepare an optimization, but that preparation can consume memory and other resources. Adding `will-change` to every card or every animated element can make performance worse.

Do not add it preemptively. First identify a real animation issue, test a focused hint on the affected element, and remove it when the change is no longer expected. A normal transform animation should not automatically receive `will-change`.

## Profile before changing selectors

Do not assume that a complex-looking selector is a performance problem. Browser style engines optimize matching, and selector cost is often less significant than layout, painting, large DOM trees, or repeated style changes.

When style recalculation appears in a performance trace:

- Check whether many elements are being updated at once.
- Look for scripts that change classes or inline styles repeatedly.
- Check for selectors whose matching scope is much broader than the component needs.
- Reduce unnecessary DOM changes if they trigger repeated recalculation.
- Measure again after one focused change.

A clear component selector can be better for maintainability even when it does not change benchmark numbers. Prefer understandable ownership and verify actual performance before adding selector-specific workarounds.

## Inspect CSS performance in developer tools

A browser's performance tools can record loading and interaction work. Depending on the browser, look for style recalculation, layout, paint, frame timing, and long tasks around the moment that feels slow.

The network tools can show stylesheet request count, transfer size, caching, and load timing. A CSS usage or coverage view can help locate rules unused during a recording. Use the recording as evidence, then check relevant routes and states before removing rules.

A practical investigation is:

1. Reproduce the slow load, scroll, animation, or interaction.
2. Record the browser, device, viewport, and action.
3. Capture a performance trace or inspect the relevant network requests.
4. Identify whether the work is loading, style recalculation, layout, paint, or compositing.
5. Change one likely cause, such as unused CSS, a repeated layout animation, or an avoidable import chain.
6. Record again under the same conditions.
7. Check the visual result, keyboard states, responsive layout, and reduced-motion behavior.

## Common mistakes

- **Optimizing before measuring:** You can add complexity without improving the experience.
- **Removing every rule marked unused in one recording:** Other routes or states may use it.
- **Inlining a large stylesheet as critical CSS:** The duplicated bytes and maintenance cost can outweigh the saved request.
- **Splitting CSS into many tiny files automatically:** More requests and dependency chains can offset smaller individual files.
- **Delaying all CSS:** Essential styles arriving late can cause unstyled content or layout shifts.
- **Assuming `transform` and `opacity` are always free:** They can still require resources and may not solve a different bottleneck.
- **Animating layout properties without checking the trace:** Repeated layout and paint can make the interaction feel slow.
- **Applying `will-change` everywhere:** Hints can consume resources and should address a measured issue.
- **Blaming selector complexity without evidence:** Inspect the trace and consider layout, paint, DOM changes, and network costs.
- **Ignoring reduced motion:** A performance improvement should not require unwanted motion for users who ask to reduce it.

## Try it yourself

1. Record a page load and identify its stylesheet requests and transfer sizes.
2. Find a stylesheet imported from another stylesheet and inspect when the browser discovers it.
3. Record an interaction that changes element dimensions and observe whether layout or paint work repeats.
4. Replace a purely visual movement with a transform-based transition in a local experiment, then profile both versions.
5. Check the browser's CSS coverage for one page state. Before removing a rule, test another route or interaction that may use it.
6. Add `will-change` to one element in a local experiment, compare the trace, then remove the hint.
7. Enable reduced motion and verify that nonessential transitions are removed or shortened.
8. Make one measured change and repeat the same recording to compare results.
9. Check the page visually after optimizing, including narrow layouts and keyboard focus.
10. Write down the symptom, evidence, change, and result so a later edit can be compared fairly.

## Key points

- CSS can delay initial rendering and can trigger style, layout, paint, and compositing work.
- Measure a real problem before optimizing.
- Keep important CSS discoverable early and avoid unnecessary request chains.
- Remove unused CSS only after checking routes, states, and conditions beyond one recording.
- Minification, splitting, and critical CSS have tradeoffs that should be measured.
- `transform` and `opacity` are often useful animation properties, but still need profiling.
- Use `will-change` only to address a measured problem.
- Recheck visual quality, interaction, and reduced-motion behavior after performance changes.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [66 - Prefixes, fallbacks, and feature detection](66-prefixes-fallbacks-and-feature-detection.md) | [Q&A](../qnas/67-css-performance.md) | [Example](../examples/67-css-performance.md) | [68 - Practical page projects](68-practical-page-projects.md) |