# 65 - Validation and browser compatibility - Example

This example builds a small feature-card page with a simple block layout as its baseline. Browsers that recognize CSS Grid get a responsive grid enhancement. The content stays in the document and remains readable when the enhancement is unavailable.

## Question

How can you make a feature-card page usable in a browser without CSS Grid, enhance it in browsers that support Grid, and verify that both the CSS and the actual page behave as expected?

## Complete example

Save these two files in the same folder and open `index.html` in a browser.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Browser support - Feature cards</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page-shell">
    <header class="page-header">
      <p class="eyebrow">CSS compatibility practice</p>
      <h1 class="page-header__title">A useful page in more than one browser</h1>
      <p class="page-header__summary">
        The cards start in a simple vertical layout. Browsers that support the
        enhanced CSS can arrange them in a responsive grid.
      </p>
    </header>

    <section class="feature-section" aria-labelledby="feature-title">
      <div class="section-heading">
        <p class="eyebrow">Learning path</p>
        <h2 id="feature-title" class="section-heading__title">
          Build one reliable step at a time
        </h2>
        <p class="section-heading__summary">
          Each card has a heading, a short description, and a link to its topic.
        </p>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <p class="feature-card__number">01</p>
          <h3 class="feature-card__title">Understand the structure</h3>
          <p class="feature-card__text">
            Give content clear sections and headings before adding visual effects.
          </p>
          <a class="feature-card__link" href="#structure">Check content order</a>
        </article>

        <article class="feature-card">
          <p class="feature-card__number">02</p>
          <h3 class="feature-card__title">Choose a usable layout</h3>
          <p class="feature-card__text">
            Start with a layout that keeps every card readable in a single column.
          </p>
          <a class="feature-card__link" href="#layout">Check the layout</a>
        </article>

        <article class="feature-card">
          <p class="feature-card__number">03</p>
          <h3 class="feature-card__title">Check real browser behavior</h3>
          <p class="feature-card__text">
            Validate the stylesheet, then test the page in the environments that
            matter to its users.
          </p>
          <a class="feature-card__link" href="#testing">Check the testing plan</a>
        </article>
      </div>
    </section>

    <section class="testing-notes" id="testing" aria-labelledby="testing-title">
      <h2 id="testing-title">What to verify</h2>
      <ul>
        <li id="structure">All three cards remain in a sensible reading order.</li>
        <li>Links remain visible and usable with a keyboard.</li>
        <li id="layout">The grid fits narrow and wide viewports without unwanted overflow.</li>
        <li>The page remains readable when the grid enhancement is unavailable.</li>
      </ul>
    </section>
  </main>
</body>
</html>
~~~

The first two card links jump to their matching checklist items. The last card link jumps to the testing checklist section.

### styles.css

~~~css
:root {
  color-scheme: light;
  font-family: Arial, Helvetica, sans-serif;
  background: #f2f5f3;
  color: #202a24;
  font-synthesis: none;

}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  padding: 48px 20px;
}

.page-shell {
  width: min(100%, 980px);
  margin-inline: auto;
}

.page-header {
  max-width: 720px;
  margin-bottom: 36px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #42614d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.page-header__title {
  max-width: 22ch;
  margin: 0 0 14px;
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1.08;
}

.page-header__summary,
.section-heading__summary {
  max-width: 62ch;
  margin: 0;
  color: #536057;
  font-size: 1.05rem;
  line-height: 1.65;
}

.section-heading {
  margin-bottom: 20px;
}

.section-heading__title {
  margin: 0 0 8px;
  font-size: clamp(1.45rem, 4vw, 2rem);
  line-height: 1.2;
}

/* Baseline: a simple vertical list that does not depend on Grid. */
.feature-grid {
  display: block;
}

.feature-card {
  padding: 22px;
  border: 1px solid #cbd6ce;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 24px rgb(32 42 36 / 6%);
}

.feature-card + .feature-card {
  margin-top: 16px;
}

.feature-card__number {
  display: grid;
  width: 42px;
  aspect-ratio: 1;
  place-items: center;
  margin: 0 0 18px;
  border-radius: 50%;
  background: #e1eee5;
  color: #176b3b;
  font-size: 0.85rem;
  font-weight: 800;
}

.feature-card__title {
  margin: 0 0 10px;
  font-size: 1.25rem;
  line-height: 1.25;
}

.feature-card__text {
  margin: 0 0 18px;
  color: #536057;
  line-height: 1.6;
}

.feature-card__link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: #145c32;
  font-weight: 700;
  text-underline-offset: 0.2em;
}

.feature-card__link:focus-visible {
  outline: 3px solid #a76400;
  outline-offset: 4px;
  border-radius: 2px;
}

/* Enhancement: browsers that recognize Grid display cards in responsive columns. */
@supports (display: grid) {
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: 16px;
  }

  .feature-card + .feature-card {
    margin-top: 0;
  }
}

/* Enhancement: balance the heading only when the browser recognizes the value. */
@supports (text-wrap: balance) {
  .page-header__title,
  .section-heading__title {
    text-wrap: balance;
  }
}

.testing-notes {
  margin-top: 32px;
  padding: 22px;
  border: 1px solid #cbd6ce;
  border-radius: 14px;
  background: #e8f0ea;
}

.testing-notes h2 {
  margin: 0 0 12px;
  font-size: 1.2rem;
}

.testing-notes ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 22px;
  line-height: 1.55;
}

@media (max-width: 520px) {
  body {
    padding: 28px 16px;
  }

  .feature-card {
    padding: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
~~~

## Expected output

The page shows three feature cards with their headings, descriptions, and links. In a browser that supports the Grid enhancement, the cards flow into as many columns as fit. At a narrow viewport they can fit into one column. A browser that does not recognize the Grid enhancement keeps the baseline vertical list, so the content remains in order and readable.

The page heading may wrap more evenly in browsers that recognize `text-wrap: balance`. Browsers that do not recognize that declaration ignore only that enhancement.

## Validate the stylesheet

1. Run the project's CSS validator or lint command on the authored `styles.css` file, if the project has one.
2. Read each reported file, line, and message. Confirm whether it is a real syntax issue, a project convention, generated syntax, or a false positive for this setup.
3. Inspect the declarations in browser developer tools. Check for failed stylesheet loading, invalid declarations, and unexpected computed values.
4. Keep the CSS valid after you finish. To practice, temporarily misspell a property such as `grid-template-columns`, observe the report or browser behavior, then restore it.

Validation checks the source according to a tool's rules. It does not establish that the cards look correct or that every browser supports and implements each feature as expected.

## Check the baseline and enhancements

### Check the baseline

To inspect the fallback in a current browser, temporarily disable the `@supports (display: grid)` block in developer tools or comment it out in a local copy. The cards should become a vertical list. Their order, headings, descriptions, links, and keyboard focus should still make sense.

Restore the block after the experiment. This test illustrates the baseline, but it does not replace testing a real target browser that lacks the feature.

### Check the enhancement

With the Grid block active, resize the viewport from narrow to wide. Confirm that:

- Cards move into additional columns as space allows.
- Text remains readable and does not overflow.
- The gaps remain consistent.
- The card order still matches the reading order.
- Keyboard focus remains visible on every link.

The `text-wrap: balance` rule is an optional visual enhancement. Check that the heading remains readable at different widths in both supported and unsupported states.

## Record your browser test matrix

Fill in the environments that match the support target for the project. Record actual browser names and versions when you run the checks.

| Target environment | Viewport or condition | Checks | Result |
| :--- | :--- | :--- | :--- |
| Primary desktop browser and version | Wide viewport | Grid columns, card spacing, links, focus | Record result |
| Primary mobile browser and version | Narrow viewport | Single-column fit, text wrapping, overflow | Record result |
| Additional supported browser and version | Same viewport as primary browser | Grid fallback or enhancement, computed styles | Record result |
| Keyboard-only check | Any supported browser | Tab order and visible focus on each link | Record result |
| Reduced-motion preference | Any supported browser | No unnecessary motion from this page | Record result |
| Increased zoom or text size | Any supported browser | Content can grow without clipping | Record result |

Do not fill the result column from a support table alone. Use it to record the behavior you actually observed in the named environment.

## What this example demonstrates

- A block layout provides the baseline before the Grid enhancement.
- `@supports (display: grid)` gates an enhancement on declaration support.
- `@supports (text-wrap: balance)` adds an optional title treatment.
- The feature query does not replace inspecting the actual rendering.
- A CSS validator can help locate syntax problems, but it cannot replace browser, keyboard, viewport, and preference checks.
- A reproducible compatibility report records exact conditions and observed behavior.

## Try it yourself

1. Temporarily remove the Grid feature query and compare the page with its baseline.
2. Change the card content to longer text and check whether both layouts still work.
3. Test at a narrow width and at increased zoom. Look for clipping and horizontal overflow.
4. Use the keyboard to move through all card links and confirm each focus indicator is visible.
5. Run the stylesheet through the validator or lint workflow used by your project.
6. Add an intentional syntax mistake, locate it, and restore the valid declaration.
7. Write down the browser name, version, viewport, and result for each environment you test.
8. Remove one optional enhancement and confirm that the baseline still communicates the same information.

## Chapter navigation

| Previous chapter | Lesson | Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [64 - Debugging with browser developer tools](../lessons/64-debugging-with-browser-devtools.md) | [Lesson](../lessons/65-validation-and-browser-compatibility.md) | [Q&A](../qnas/65-validation-and-browser-compatibility.md) | [66 - Prefixes, fallbacks, and feature detection](../lessons/66-prefixes-fallbacks-and-feature-detection.md) |