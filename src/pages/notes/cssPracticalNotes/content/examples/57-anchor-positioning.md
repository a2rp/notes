# 57 - Anchor positioning

This example connects an HTML popover to its trigger with CSS anchor positioning. The popover opens and closes through native HTML controls. CSS names the trigger, positions the popover below it, and asks the browser to flip the panel when it would overflow.

## Question

How can a popover stay aligned with its trigger, move to the other side when space is limited, and remain usable when anchor positioning is unavailable?

## Complete example

Save the following as index.html and styles.css in the same folder. Open index.html in a browser and activate the View schedule details button. The native popover opens. Browsers that support the anchor positioning declarations place it under the trigger and can flip it above when needed. Without anchor positioning, it remains a centered popover.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Anchor positioning example</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">CSS layout example</p>
      <h1>Anchor positioning</h1>
      <p class="intro">
        Attach a popover to a control, then let the browser try another side
        when the first placement does not fit.
      </p>
    </header>

    <section class="project-card" aria-labelledby="project-title">
      <div class="project-card__header">
        <div>
          <p class="eyebrow">Project workspace</p>
          <h2 id="project-title">Community garden</h2>
        </div>
        <span class="project-status">In progress</span>
      </div>

      <p>
        Review volunteer work, shared resources, and upcoming garden sessions.
        The schedule details are available from the control below.
      </p>

      <div class="action-row">
        <button
          class="schedule-trigger"
          type="button"
          popovertarget="schedule-details"
        >
          View schedule details
        </button>
        <span class="action-hint">Opens a small information panel</span>
      </div>

      <section
        id="schedule-details"
        class="schedule-popover"
        popover="auto"
        aria-labelledby="schedule-title"
      >
        <div class="schedule-popover__header">
          <div>
            <p class="eyebrow">Shared schedule</p>
            <h2 id="schedule-title">Upcoming sessions</h2>
          </div>
          <button
            class="close-button"
            type="button"
            popovertarget="schedule-details"
            popovertargetaction="hide"
            aria-label="Close schedule details"
          >
            Close
          </button>
        </div>

        <ul class="schedule-list">
          <li>
            <span class="schedule-date">Tuesday, 9:00</span>
            <span>Water the raised beds</span>
          </li>
          <li>
            <span class="schedule-date">Thursday, 16:30</span>
            <span>Label tools and supplies</span>
          </li>
          <li>
            <span class="schedule-date">Saturday, 10:00</span>
            <span>Prepare the shared planting area</span>
          </li>
        </ul>

        <p class="popover-note">
          Bring gloves and return shared tools to the marked storage area.
        </p>
      </section>
    </section>

    <section class="how-it-works" aria-labelledby="how-title">
      <h2 id="how-title">What to notice</h2>
      <ol>
        <li>The trigger is named as an anchor with a dashed CSS name.</li>
        <li>The popover is positioned relative to that named anchor.</li>
        <li>The browser can try the opposite block side if the first side overflows.</li>
        <li>The HTML popover controls its open state; CSS only controls placement.</li>
      </ol>
    </section>
  </main>
</body>
</html>
~~~

### styles.css

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  color-scheme: light;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
  background: #f1f5f9;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

button {
  font: inherit;
}

.page {
  width: min(100% - 2rem, 880px);
  margin: 0 auto;
  padding: 3rem 0;
}

.page-header {
  max-width: 48rem;
  margin-bottom: 2rem;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: #526178;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0.75rem;
  color: #17324d;
  font-size: clamp(2rem, 6vw, 3.25rem);
  line-height: 1.08;
}

h2 {
  margin-bottom: 0.35rem;
  color: #17324d;
  font-size: 1.35rem;
  line-height: 1.2;
}

.intro {
  max-width: 42rem;
  margin-bottom: 0;
  color: #526178;
  font-size: 1.1rem;
}

.project-card,
.how-it-works {
  padding: clamp(1.25rem, 4vw, 2rem);
  background: #fff;
  border: 1px solid #d6deea;
  border-radius: 1rem;
  box-shadow: 0 1rem 2.5rem rgb(23 50 77 / 8%);
}

.project-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-card__header .eyebrow {
  margin-bottom: 0.3rem;
}

.project-status {
  flex: 0 0 auto;
  padding: 0.35rem 0.65rem;
  color: #14532d;
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.project-card > p {
  max-width: 50rem;
  color: #526178;
}

.action-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.5rem;
}

.schedule-trigger {
  anchor-name: --schedule-trigger;
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  color: #fff;
  background: #155eef;
  border: 2px solid #155eef;
  border-radius: 0.55rem;
  font-weight: 700;
  cursor: pointer;
}

.schedule-trigger:hover {
  background: #1249bd;
  border-color: #1249bd;
}

.schedule-trigger:focus-visible,
.close-button:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}

.action-hint {
  color: #526178;
  font-size: 0.9rem;
}

.schedule-popover[popover] {
  position: fixed;
  inset: 50% auto auto 50%;
  width: min(24rem, calc(100vw - 2rem));
  max-height: min(70vh, 30rem);
  margin: 0;
  padding: 1.25rem;
  overflow: auto;
  color: #1f2937;
  background: #fff;
  border: 1px solid #aebbd0;
  border-radius: 0.85rem;
  box-shadow: 0 1.5rem 4rem rgb(15 23 42 / 22%);
  translate: -50% -50%;
}

.schedule-popover::backdrop {
  background: rgb(15 23 42 / 22%);
}

.schedule-popover__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid #d6deea;
}

.schedule-popover__header .eyebrow {
  margin-bottom: 0.3rem;
}

.schedule-popover__header h2 {
  margin-bottom: 0;
  font-size: 1.2rem;
}

.close-button {
  flex: 0 0 auto;
  padding: 0.35rem 0.6rem;
  color: #17324d;
  background: #f1f5f9;
  border: 1px solid #aebbd0;
  border-radius: 0.4rem;
  cursor: pointer;
}

.schedule-list {
  display: grid;
  gap: 0.9rem;
  margin: 1rem 0;
  padding: 0;
  list-style: none;
}

.schedule-list li {
  display: grid;
  gap: 0.15rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.schedule-date {
  color: #17324d;
  font-weight: 700;
}

.popover-note {
  margin-bottom: 0;
  padding: 0.75rem;
  color: #334155;
  background: #f1f5f9;
  border-left: 3px solid #155eef;
  font-size: 0.9rem;
}

.how-it-works {
  margin-top: 1.5rem;
}

.how-it-works h2 {
  margin-bottom: 0.75rem;
}

.how-it-works ol {
  display: grid;
  gap: 0.6rem;
  margin-bottom: 0;
  padding-left: 1.4rem;
}

@supports (anchor-name: --schedule-trigger) and (position-area: block-end) {
  .schedule-trigger {
    anchor-name: --schedule-trigger;
  }

  .schedule-popover[popover] {
    inset: auto;
    margin: 0;
    translate: none;
    position-anchor: --schedule-trigger;
    position-area: block-end;
    justify-self: anchor-center;
    margin-block-start: 0.75rem;
    position-try-fallbacks: flip-block;
  }
}

@supports (min-inline-size: anchor-size(inline)) {
  .schedule-popover[popover] {
    min-inline-size: anchor-size(inline);
  }
}

@media (max-width: 560px) {
  .page {
    width: min(100% - 1.25rem, 880px);
    padding-block: 1.5rem;
  }

  .project-card__header {
    flex-direction: column;
  }

  .schedule-popover[popover] {
    padding: 1rem;
  }
}
~~~

## Expected output

The page shows a project card with an In progress label and a View schedule details button. Activating the button opens the schedule popover.

With anchor positioning support, the popover appears below the button, centered against it. If that location overflows along the block axis, the browser can try placing it above. The popover is at least as wide as the trigger when anchor-size() is supported.

Without anchor positioning support, the popover still opens through the HTML popover controls and appears centered in the viewport. It remains readable and can be closed with its Close button or the browser's popover dismissal behavior.

## Explanation

1. The trigger uses popovertarget to open the matching HTML popover. The close button uses popovertargetaction="hide" to close it without custom JavaScript.
2. The trigger receives the named anchor --schedule-trigger. The name begins with two hyphens.
3. The @supports block checks for anchor-name and position-area before applying the anchor-based layout.
4. position-anchor connects the popover to the named trigger. position-area: block-end places it below the trigger in a horizontal writing mode.
5. justify-self: anchor-center centers the popover on its anchor.
6. position-try-fallbacks: flip-block asks the browser to try the opposite block side if the preferred placement overflows.
7. The second @supports block adds a minimum size based on the trigger's inline size when anchor-size() is supported.
8. Outside the feature query, the popover uses a centered fixed-position fallback. The content and native open and close behavior remain available.
9. The popover is a top-layer element, but the explicit anchor name still tells its positioning rules which element to follow.
10. The focus-visible rules keep keyboard focus clear on the trigger and close control.

## Try it yourself

1. Move the trigger near the top and bottom of the viewport and open the popover to inspect fallback placement.
2. Temporarily remove position-try-fallbacks and compare the result when the panel has limited space.
3. Change position-area from block-end to block-start.
4. Replace the named anchor relationship with anchor() inset declarations in a small test.
5. Change the trigger label length and see how anchor-size() affects the popover minimum width.
6. Use browser developer tools to disable the anchor-positioning declarations and inspect the centered fallback.
7. Add another action and popover with a different anchor name.
8. Test with keyboard only, open and close the popover, and confirm focus remains understandable.

## Key points

- HTML popover controls provide the open and close behavior.
- CSS anchor positioning connects the popover's geometry to its trigger.
- position-area and anchor-center create a simple aligned placement.
- position-try-fallbacks can try another side when the preferred one overflows.
- Feature queries preserve a usable fallback when anchor positioning is unavailable.
- Anchor positioning does not replace semantics, interaction, or focus styling.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [56 - Print styles](../lessons/56-print-styles.md) | [Q&A](../qnas/57-anchor-positioning.md) | [Example](57-anchor-positioning.md) | [58 - Styling view transitions](../lessons/58-view-transitions.md) |