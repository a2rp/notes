# 66 - Prefixes, fallbacks, and feature detection - Example

This example combines a readable background fallback, a conditional backdrop blur with standard and prefixed declarations, and a card layout that starts as a vertical list before enhancing to Grid.

## Question

How can the page remain readable when backdrop blur or CSS Grid is unavailable, while using those enhancements in browsers that recognize them?

## Complete example

Save these two files in the same folder and open `index.html` in a browser.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS fallbacks - Field Notes</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page-shell">
    <header class="page-header">
      <p class="eyebrow">Field Notes</p>
      <h1>Make the useful version work first</h1>
      <p class="page-header__summary">
        This page has a simple baseline, with optional visual and layout
        enhancements for browsers that recognize the required CSS.
      </p>
    </header>

    <section class="support-panel" aria-labelledby="panel-title">
      <div class="support-panel__content">
        <p class="support-panel__label">A small compatibility demo</p>
        <h2 id="panel-title">Readable with or without the blur effect</h2>
        <p>
          The panel starts with a solid background. A feature query enables a
          translucent background and blur when a supported spelling is available.
        </p>
        <a class="text-link" href="#layout">See the layout fallback</a>
      </div>
      <div class="support-panel__decoration" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>

    <section class="learning-section" id="layout" aria-labelledby="learning-title">
      <div class="section-heading">
        <p class="eyebrow">Three useful steps</p>
        <h2 id="learning-title">The content comes before the enhancement</h2>
      </div>

      <div class="learning-list">
        <article class="learning-card">
          <p class="learning-card__number">01</p>
          <h3>Write the baseline</h3>
          <p>Keep the title, explanation, and link understandable in a simple list.</p>
        </article>

        <article class="learning-card">
          <p class="learning-card__number">02</p>
          <h3>Add an enhancement</h3>
          <p>Use a feature query when a supported feature changes which CSS applies.</p>
        </article>

        <article class="learning-card">
          <p class="learning-card__number">03</p>
          <h3>Test both states</h3>
          <p>Check the enhanced result and the baseline in the target browsers.</p>
        </article>
      </div>
    </section>

    <section class="checklist" id="fallback" aria-labelledby="checklist-title">
      <h2 id="checklist-title">Fallback checklist</h2>
      <ul>
        <li>Important text remains readable on the solid panel.</li>
        <li>Cards remain in document order when Grid is not applied.</li>
        <li>Links remain visible and show a keyboard focus indicator.</li>
      </ul>
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
  background: #e7edf7;
  color: #1d2b3b;
  font-synthesis: none;
}

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  margin: 0;
  padding: 48px 20px;
  background:
    radial-gradient(ellipse at 14% 12%, #b8d2f5 0, transparent 34%),
    radial-gradient(ellipse at 88% 32%, #d9c9f5 0, transparent 36%),
    linear-gradient(145deg, #edf4fb, #dce5f2);
}

.page-shell {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  max-width: 680px;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #425c7b;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.page-header h1 {
  max-width: 19ch;
  margin: 0 0 12px;
  font-size: clamp(2rem, 6vw, 3.6rem);
  line-height: 1.08;
}

.page-header__summary {
  max-width: 60ch;
  margin: 0;
  color: #465a70;
  font-size: 1.05rem;
  line-height: 1.65;
}

.support-panel {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(24px, 5vw, 42px);
  border: 1px solid #9aacc2;
  border-radius: 20px;
  background-color: #fff;
  background-color: rgb(255 255 255 / 96%);
  box-shadow: 0 18px 48px rgb(33 49 69 / 14%);
}

.support-panel__content {
  position: relative;
  z-index: 1;
  max-width: 58ch;
}

.support-panel__label {
  margin: 0 0 10px;
  color: #315c90;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.support-panel h2 {
  max-width: 20ch;
  margin: 0 0 12px;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  line-height: 1.16;
}

.support-panel__content > p:not(.support-panel__label) {
  max-width: 54ch;
  margin: 0 0 18px;
  color: #40536a;
  line-height: 1.65;
}

.text-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: #174e86;
  font-weight: 700;
  text-underline-offset: 0.2em;
}

.text-link:focus-visible {
  outline: 3px solid #8b4b00;
  outline-offset: 4px;
  border-radius: 2px;
}

.support-panel__decoration {
  position: absolute;
  z-index: -1;
  top: -70px;
  right: -38px;
  display: flex;
  width: 280px;
  height: 300px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transform: rotate(24deg);
}

.support-panel__decoration span {
  display: block;
  width: 52px;
  height: 240px;
  border-radius: 999px;
  background: rgb(88 136 194 / 20%);
}

.support-panel__decoration span:nth-child(2) {
  height: 300px;
  background: rgb(142 112 193 / 18%);
}

.support-panel__decoration span:nth-child(3) {
  height: 190px;
  background: rgb(74 153 145 / 18%);
}

/* Baseline: cards appear in a vertical list. */
.learning-list {
  display: block;
}

.learning-card {
  padding: 22px;
  border: 1px solid #bdc9d7;
  border-radius: 14px;
  background: #fff;
}

.learning-card + .learning-card {
  margin-top: 14px;
}

.learning-card__number {
  display: grid;
  width: 38px;
  aspect-ratio: 1;
  place-items: center;
  margin: 0 0 14px;
  border-radius: 50%;
  background: #e7eef8;
  color: #244f7f;
  font-size: 0.82rem;
  font-weight: 800;
}

.learning-card h3 {
  margin: 0 0 8px;
  font-size: 1.18rem;
}

.learning-card > p:last-child {
  margin: 0;
  color: #465a70;
  line-height: 1.55;
}

/* Enhancement: use Grid when the browser recognizes the declaration. */
@supports (display: grid) {
  .learning-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 14px;
  }

  .learning-card + .learning-card {
    margin-top: 0;
  }
}

/* Enhancement: support either the standard or prefixed filter property. */
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .support-panel {
    background-color: rgb(255 255 255 / 74%);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}

.checklist {
  margin-top: 28px;
  padding: 22px;
  border: 1px solid #bdc9d7;
  border-radius: 14px;
  background: rgb(255 255 255 / 88%);
}

.checklist h2 {
  margin: 0 0 12px;
  font-size: 1.2rem;
}

.checklist ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 22px;
  line-height: 1.55;
}

@media (max-width: 560px) {
  body {
    padding: 28px 16px;
  }

  .support-panel__decoration {
    right: -150px;
    opacity: 0.65;
  }

  @supports (display: grid) {
    .learning-list {
      grid-template-columns: 1fr;
    }
  }
}
~~~

## Expected output

The page shows a large panel over a soft gradient background, followed by three learning cards and a checklist.

- The baseline panel has a solid white background. If the browser supports one of the tested blur property spellings, the panel becomes translucent and blurs the background behind it.
- The baseline card layout is a vertical list. If the browser recognizes Grid, the cards flow into columns where there is enough room.
- At narrow widths, the cards use one column.
- Links remain underlined, and keyboard focus is outlined.

The design remains readable even if the blur enhancement is not available. The fallback does not depend on the blur declaration.

## Inspect the fallback and enhancement

1. Open the page and inspect `.support-panel` in the browser's developer tools.
2. Check its computed `background-color` and whether a `backdrop-filter` declaration is active.
3. In the rules view, find the `@supports` block for the blur feature. A browser may accept the standard spelling, the prefixed spelling, or neither.
4. Temporarily disable that feature-query block. The panel should return to its solid background, and the text should remain readable.
5. Restore the block, then disable the Grid query. The cards should return to a vertical list in document order.
6. Resize the viewport and verify the card layout, text wrapping, and focus outline.
7. Remove temporary changes and reload the page to confirm the saved source provides the intended result.

Temporarily disabling a query checks the fallback in the current browser. It does not reproduce every older browser implementation, so test actual target browsers when the project requires them.

## Understand the declaration order

The panel sets its solid background first, followed by a translucent background that browsers can use if they recognize its syntax. The blur enhancement is inside an `@supports` query. The prefixed filter appears before the standard form:

~~~css
.support-panel {
  background-color: #fff;
  background-color: rgb(255 255 255 / 96%);
}

@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .support-panel {
    background-color: rgb(255 255 255 / 74%);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}
~~~

The `@supports` condition allows the effect when either spelling is recognized. The declarations inside it still undergo ordinary parsing and the cascade. If no tested form is available, the base panel background remains.

The card list follows the same pattern at the layout level. It starts as a block list, then switches to Grid when `display: grid` is recognized.

## Try it yourself

1. Remove `-webkit-backdrop-filter` locally and inspect the result in a browser that needs the prefixed form.
2. Remove `backdrop-filter` locally and inspect the result in a browser that uses the standard form.
3. Temporarily change the feature query to check an unsupported declaration. Confirm that the solid panel remains readable.
4. Disable the Grid query and compare card order, spacing, and content readability.
5. Increase the length of one card description and check both layouts.
6. Use the keyboard to reach the panel link and verify its focus outline.
7. If your project has a prefix generation step, compare the authored CSS with the generated output and its configured browser target.
8. Restore the intended CSS and reload to confirm no temporary experiment remains.

## Chapter navigation

| Previous chapter | Lesson | Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [65 - Validation and browser compatibility](../lessons/65-validation-and-browser-compatibility.md) | [Lesson](../lessons/66-prefixes-fallbacks-and-feature-detection.md) | [Q&A](../qnas/66-prefixes-fallbacks-and-feature-detection.md) | [67 - CSS performance](../lessons/67-css-performance.md) |