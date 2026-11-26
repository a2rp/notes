# 67 - CSS performance - Example

This example places two small animated meters side by side. The first changes its width. The second keeps its layout width and changes its visual scale with `transform`. Use the page to practice recording and reading browser work, then profile a real interaction before making a production change.

## Question

How can you compare a layout-changing animation with a transform-based animation, inspect the work in developer tools, and decide whether either change improves a real page?

## Complete example

Save these two files in the same folder and open `index.html` in a browser.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./styles.css">
  <title>CSS performance - Animation comparison</title>
</head>
<body>
  <main class="page-shell">
    <header class="page-header">
      <p class="eyebrow">Performance practice</p>
      <h1>Measure the work behind an animation</h1>
      <p class="page-header__summary">
        Focus or hover each card to start its meter. The first changes width.
        The second changes transform. Compare the browser trace, not just the
        visual effect.
      </p>
    </header>

    <section class="comparison" aria-labelledby="comparison-title">
      <div class="section-heading">
        <h2 id="comparison-title">Two ways to animate a meter</h2>
        <p>Use a pointer or keyboard focus to start each transition.</p>
      </div>

      <div class="comparison-grid">
        <article class="comparison-card comparison-card--layout">
          <p class="comparison-card__label">Layout-changing example</p>
          <h3>Animate width</h3>
          <p class="comparison-card__text">
            Changing width changes the element's geometry and may require layout
            work on each frame.
          </p>
          <div class="meter-track" aria-hidden="true">
            <span class="meter-fill meter-fill--width"></span>
          </div>
          <a class="comparison-card__link" href="#recording">Review the recording steps</a>
        </article>

        <article class="comparison-card comparison-card--transform">
          <p class="comparison-card__label">Visual transform example</p>
          <h3>Animate transform</h3>
          <p class="comparison-card__text">
            The layout width stays the same while the meter is visually scaled.
            The browser may still need other rendering work.
          </p>
          <div class="meter-track" aria-hidden="true">
            <span class="meter-fill meter-fill--transform"></span>
          </div>
          <a class="comparison-card__link" href="#recording">Review the recording steps</a>
        </article>
      </div>
    </section>

    <section class="recording-notes" id="recording" aria-labelledby="recording-title">
      <h2 id="recording-title">Record and compare</h2>
      <ol>
        <li>Record one width transition in the browser's performance tools.</li>
        <li>Repeat the same hover or keyboard action for the transform transition.</li>
        <li>Look for layout, paint, and frame timing around each transition.</li>
        <li>Repeat the comparison on the device and page that matter.</li>
      </ol>
      <p class="recording-notes__reminder">
        This one-element demo may run smoothly in both cases. It teaches what to
        inspect, but it cannot prove which approach will improve a larger page.
      </p>
    </section>
  </main>
</body>
</html>
~~~

### styles.css

~~~css
:root {
  color-scheme: light;
  font-family: Arial, Helvetica, sans-serif;
  background: #f2f5f3;
  color: #1f2b24;
  font-synthesis: none;
}

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  margin: 0;
  padding: 48px 20px;
}

.page-shell {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  max-width: 720px;
  margin-bottom: 36px;
}

.eyebrow,
.comparison-card__label {
  margin: 0 0 8px;
  color: #42614d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-header h1 {
  max-width: 20ch;
  margin: 0 0 12px;
  font-size: clamp(2rem, 6vw, 3.4rem);
  line-height: 1.08;
}

.page-header__summary,
.section-heading p,
.comparison-card__text {
  color: #536057;
  line-height: 1.6;
}

.page-header__summary {
  max-width: 62ch;
  margin: 0;
  font-size: 1.05rem;
}

.section-heading {
  margin-bottom: 16px;
}

.section-heading h2 {
  margin: 0 0 6px;
  font-size: 1.55rem;
}

.section-heading p {
  margin: 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 16px;
}

.comparison-card {
  padding: 22px;
  border: 1px solid #cbd6ce;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 24px rgb(31 43 36 / 6%);
}

.comparison-card h3 {
  margin: 0 0 8px;
  font-size: 1.25rem;
}

.comparison-card__text {
  min-height: 5.2em;
  margin: 0 0 20px;
}

.meter-track {
  height: 16px;
  overflow: hidden;
  margin: 0 0 16px;
  border-radius: 999px;
  background: #e4eae5;
}

.meter-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #247044;
}

.meter-fill--width {
  width: 34%;
  transition: width 700ms ease;
}

.comparison-card--layout:hover .meter-fill--width,
.comparison-card--layout:focus-within .meter-fill--width {
  width: 88%;
}

.meter-fill--transform {
  width: 36%;
  transform: scaleX(1);
  transform-origin: left center;
  transition: transform 700ms ease, opacity 700ms ease;
}

.comparison-card--transform:hover .meter-fill--transform,
.comparison-card--transform:focus-within .meter-fill--transform {
  transform: scaleX(2.45);
  opacity: 0.82;
}

.comparison-card__link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: #165b34;
  font-weight: 700;
  text-underline-offset: 0.2em;
}

.comparison-card__link:focus-visible {
  outline: 3px solid #9a5100;
  outline-offset: 4px;
  border-radius: 2px;
}

.recording-notes {
  margin-top: 28px;
  padding: 22px;
  border: 1px solid #cbd6ce;
  border-radius: 14px;
  background: #e9f0eb;
}

.recording-notes h2 {
  margin: 0 0 12px;
  font-size: 1.2rem;
}

.recording-notes ol {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 22px;
  line-height: 1.55;
}

.recording-notes__reminder {
  margin: 16px 0 0;
  color: #435449;
  line-height: 1.55;
}

@media (max-width: 600px) {
  body {
    padding: 28px 16px;
  }

  .comparison-card__text {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .meter-fill {
    transition: none;
  }
}
~~~

## Expected output

The page shows two cards. Hover over a card or move keyboard focus to its link:

- The left meter grows by changing its width.
- The right meter grows visually using `transform: scaleX()` and also changes opacity.
- With reduced motion enabled, the transitions are removed.

The meters are deliberately small so the page stays responsive. On a typical device, both may look smooth. That does not prove the transform version will improve every page.

## Use developer tools

### Compare a repeatable interaction

1. Open the browser's performance tools and begin a recording.
2. Hover the first card, or use the keyboard to focus its link, and wait for the transition to finish.
3. Stop the recording and inspect the work during the transition. Look for layout, paint, and frame timing.
4. Record the same action for the second card under the same conditions.
5. Compare the trace, then repeat on the page and device where performance matters.

The sample is intentionally too small to guarantee a visible performance difference. Use it to learn where to look. Real improvements depend on how many elements change, what else the page is doing, the browser, and the device.

### Inspect stylesheet delivery and usage

1. In the network tools, find `styles.css` and inspect its request timing, transferred size, and cache status.
2. Check whether a real page imports more stylesheets through `@import` and whether those imports delay discovery.
3. If the browser offers a CSS coverage tool, record the page state and inspect which rules were used during that recording.
4. Repeat coverage for other routes, responsive widths, interactions, and print behavior before removing any rule.
5. Make one change and capture the same recording again to compare the result.

## What the comparison shows

The width version changes the meter's layout size. That can require layout work while it animates. The transform version keeps the element's layout width fixed and changes its visual transform. This often avoids layout changes, but the browser can still perform paint or other work.

A transform can also visually extend beyond the element's original layout size. In this example the track clips the meter with `overflow: hidden`. In a real interface, check stacking, clipping, focus, and nearby content after changing an animation strategy.

## Performance notes

- The file is linked from the document head so the browser can discover the page's main CSS early.
- The example avoids `@import` and does not inline the complete stylesheet.
- Only the two meter states transition. Other page content remains static.
- The reduced-motion rule removes the nonessential transitions.
- There is no `will-change` declaration. Add such a hint only after profiling a real issue.

## Try it yourself

1. Replace the transform transition with `width` and compare the trace again.
2. Increase the number of cards and meters in a local copy, then profile the interaction on a slower device.
3. Add a large shadow transition as a separate experiment and inspect paint work.
4. Enable reduced motion and verify both meters stop animating.
5. Change a CSS rule, then inspect the network and coverage data for the same route and state.
6. Remove one apparently unused rule only after checking additional routes and interaction states.
7. Write down the browser, viewport, action, trace evidence, and result for each recording.
8. Restore the final styles and confirm focus and narrow-screen behavior.

## Chapter navigation

| Previous chapter | Lesson | Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [66 - Prefixes, fallbacks, and feature detection](../lessons/66-prefixes-fallbacks-and-feature-detection.md) | [Lesson](../lessons/67-css-performance.md) | [Q&A](../qnas/67-css-performance.md) | [68 - Practical page projects](../lessons/68-practical-page-projects.md) |