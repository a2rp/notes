# 53 - Accessible CSS and user preferences

This example creates a small status page with readable defaults and CSS adaptations for color-scheme, motion, contrast, forced colors, and printing. The status is written in text, so it does not depend on a color or animation to make sense.

## Question

How can a page keep its content readable while responding to a user's color, motion, contrast, and print preferences?

## Complete example

Save both files in the same folder. Open `index.html` in a browser. Change the operating system or browser preferences to inspect the applicable styles. Use print preview to see the print rules.

### `index.html`

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Accessible CSS and user preferences</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">CSS learning example</p>
      <h1>Accessible preferences</h1>
      <p>
        This page uses readable defaults and adapts its presentation to
        preferences when the browser exposes them.
      </p>
    </header>

    <nav class="screen-only" aria-label="Page sections">
      <a href="#status">Status</a>
      <a href="#details">Details</a>
    </nav>

    <section id="status" class="card" aria-labelledby="status-title">
      <h2 id="status-title">Current status</h2>
      <p class="status">
        <span class="status__dot" aria-hidden="true"></span>
        <strong>Status: Ready</strong>
      </p>
      <p>
        The status is written in text as well as shown with a colored dot, so
        color is not the only way to understand it.
      </p>
      <a class="action" href="#details">Read the details</a>
    </section>

    <section id="details" class="card" aria-labelledby="details-title">
      <h2 id="details-title">What this example demonstrates</h2>
      <p>
        Text can wrap as the available width changes. Cards have visible
        boundaries, links have underlines, and the page can be printed without
        relying on colored backgrounds.
      </p>
      <p>
        The small status animation is decorative. The written status remains
        available when the animation is removed.
      </p>
    </section>

    <footer class="screen-only">
      <p>Use your system or browser settings to try different preferences.</p>
    </footer>
  </main>
</body>
</html>
~~~

### `styles.css`

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  color-scheme: light dark;
  color: #1f2937;
  background-color: #f4f7fb;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

html {
  scroll-behavior: smooth;
}

body {
  min-width: 0;
  margin: 0;
  color: #1f2937;
  background-color: #f4f7fb;
}

.page {
  width: 100%;
  max-width: 52rem;
  margin-inline: auto;
  padding: 1.5rem;
}

.page-header {
  margin-block-end: 1.5rem;
}

.eyebrow {
  margin: 0 0 0.25rem;
  color: #334155;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
p {
  overflow-wrap: anywhere;
}

h1 {
  margin: 0;
  line-height: 1.2;
}

h2 {
  margin-block: 0 0.75rem;
  line-height: 1.3;
}

.page-header > p:last-child {
  max-width: 65ch;
  margin-block: 0.75rem 0;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  margin-block-end: 1rem;
}

a {
  color: #004f8b;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.card {
  margin-block: 1rem;
  padding: 1.25rem;
  border: 1px solid #64748b;
  border-radius: 0.75rem;
  background-color: #ffffff;
}

.card p {
  margin-block: 0 1rem;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status__dot {
  flex: 0 0 0.75rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #075e3b;
}

.action {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  border: 1px solid #174a7e;
  border-radius: 0.35rem;
  color: #ffffff;
  background-color: #174a7e;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f3f4f6;
    background-color: #111827;
  }

  body {
    color: #f3f4f6;
    background-color: #111827;
  }

  .eyebrow {
    color: #cbd5e1;
  }

  a {
    color: #a5d8ff;
  }

  .card {
    border-color: #9ca3af;
    background-color: #1f2937;
  }

  .status__dot {
    background-color: #6ee7a8;
  }

  .action {
    border-color: #bfdbfe;
    color: #111827;
    background-color: #bfdbfe;
  }
}

@media (prefers-contrast: more) {
  .card {
    border-width: 2px;
  }

  a {
    text-decoration-thickness: 0.12em;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .status__dot {
    animation: status-pulse 2s ease-in-out infinite alternate;
  }
}

@keyframes status-pulse {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.25);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .status__dot {
    animation: none;
  }
}

@media (forced-colors: active) {
  .card {
    border: 1px solid CanvasText;
    box-shadow: none;
  }

  a {
    color: LinkText;
  }

  .action {
    border: 1px solid ButtonText;
    color: ButtonText;
    background-color: ButtonFace;
  }
}

@media print {
  :root,
  body {
    color: #000000;
    background: #ffffff;
  }

  .page {
    max-width: none;
    padding: 0;
  }

  .screen-only {
    display: none;
  }

  .card {
    border: 1px solid #555555;
    border-radius: 0;
    background: #ffffff;
    break-inside: avoid;
  }

  a {
    color: #000000;
    text-decoration: underline;
  }

  .status__dot {
    animation: none;
  }
}
~~~

## Expected output

The page shows a heading, navigation links, a status card, a details card, and a footer. Text remains visible in every mode, and the status is spelled out as “Ready” in addition to its decorative dot.

- In a light scheme, the page uses dark text on light surfaces.
- In a dark scheme, the page changes the text, surface, border, link, and action colors together. Browser-provided controls can follow the declared supported schemes.
- With increased contrast requested, card borders and link underlines become more prominent.
- With reduced motion requested, the status dot stops pulsing and smooth scrolling is disabled.
- In forced colors mode, cards and the action use system colors for visible boundaries and labels.
- In print preview, navigation and the footer instruction are hidden, backgrounds are white, and card borders remain visible.
- On a narrow viewport, the page uses the available width and text can wrap without a fixed card height.

The precise palette and rendering can vary by browser and user settings. The important behavior is that the content and labels remain available when decorative colors or motion change.

## Explanation

1. **The defaults work on their own.** The page defines text, background, surfaces, borders, link cues, and flexible dimensions before preference-specific rules.
2. **The status is not color-only.** The dot is decorative and hidden from assistive technology. The visible text says “Status: Ready”.
3. **Light and dark colors are paired.** The dark preference changes the text and surfaces together, including the action, links, and borders.
4. **Browser controls can follow the scheme.** `color-scheme: light dark` declares both schemes as supported. The page still sets the colors of its own elements.
5. **Motion is optional.** The dot animates only when the user has no reduced-motion preference. The reduced-motion rule removes the animation and smooth scrolling.
6. **Contrast changes reinforce existing cues.** The increased-contrast rule strengthens borders and underlines. Those boundaries and link cues also exist in the default styling.
7. **Forced colors uses the active palette.** System colors keep borders and the action visible without opting out of the user's color adjustment.
8. **Print output does not depend on fills.** Navigation and screen-only instructions are removed; card borders and text keep sections understandable.

## Try it yourself

1. Change the dark-scheme text color and inspect the links, card, and action as a group.
2. Remove the status text and explain why the color dot alone is not enough.
3. Change the motion query so the pulse is present by default, then move its removal into the reduced-motion query.
4. Replace `LinkText` with a hard-coded color in the forced-colors rule and compare how it responds to the system palette.
5. Disable background printing in print preview and check whether card boundaries remain visible.
6. Enlarge the text and narrow the viewport. Adjust the CSS if any content clips or overflows.
7. Verify that the page still communicates its status with animation disabled and with author colors replaced.

## Key points

- Build readable defaults before adapting to preferences.
- Change foreground and background colors together for dark mode.
- Make motion decorative and remove it when reduced motion is requested.
- Prefer the user's forced colors palette and use system colors for necessary boundaries.
- Pair color with text or another cue, and avoid fixed text heights.
- Use print styles that preserve meaning without colored fills.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [52 - Scoped styles and component styling](../lessons/52-scoping-and-component-styles.md) | [Q&A](../qnas/53-accessible-css-and-user-preferences.md) | [Example](53-accessible-css-and-user-preferences.md) | [54 - Focus styles and keyboard interaction](../lessons/54-focus-and-keyboard-interaction.md) |
