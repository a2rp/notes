# 46 - Scroll-driven animations

This example combines a scroll progress timeline for the whole document with view progress timelines for content entering the viewport. It includes base styles so the page remains readable when timeline features are unavailable or motion is reduced.

## Question

How can a reading progress bar follow the document's scroll position while cards animate as they enter the viewport, with a static fallback for browsers or visitors that do not use the motion effect?

## Complete example

Save this as an HTML file and open it in a browser that supports scroll-driven animations. Scroll down and back up. The progress bar follows document progress, and the cards animate through their view ranges.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Scroll-driven animations</title>
  <style>
    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      max-width: 58rem;
      margin: 0 auto;
      padding: 2rem 1rem 4rem;
      color: #263238;
      background: #f5f7f8;
      font: 1rem/1.7 system-ui, sans-serif;
    }

    h1,
    h2,
    h3 {
      line-height: 1.2;
    }

    .intro {
      max-width: 46rem;
    }

    #scroll-progress {
      position: fixed;
      z-index: 10;
      inset: 0 0 auto;
      display: none;
      height: 0.35rem;
      background: #176b57;
      transform: scaleX(0);
      transform-origin: left center;
    }

    @keyframes grow-progress {
      from {
        transform: scaleX(0);
      }

      to {
        transform: scaleX(1);
      }
    }

    .story-list {
      display: grid;
      gap: 2rem;
      margin-block: 2rem;
    }

    .story-card {
      min-height: 18rem;
      padding: clamp(1.25rem, 4vw, 2rem);
      border: 1px solid #9ab3ac;
      border-radius: 0.9rem;
      background: white;
      box-shadow: 0 0.35rem 1rem rgb(0 0 0 / 8%);
      opacity: 1;
      transform: none;
    }

    @keyframes reveal-card {
      from {
        opacity: 0.35;
        transform: translateY(2rem);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .feature-card {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: start;
      gap: 1rem;
    }

    .feature-icon {
      display: grid;
      width: 3rem;
      height: 3rem;
      place-items: center;
      border-radius: 50%;
      color: white;
      background: #176b57;
      font-size: 1.5rem;
      transform: none;
    }

    @keyframes emphasize-icon {
      from {
        transform: scale(0.65) rotate(-12deg);
      }

      to {
        transform: scale(1) rotate(0);
      }
    }

    .note {
      padding: 0.75rem 1rem;
      border-left: 0.25rem solid #b66b00;
      background: #fff3d3;
    }

    @supports (animation-timeline: scroll()) {
      #scroll-progress {
        display: block;
        animation-name: grow-progress;
        animation-duration: auto;
        animation-timing-function: linear;
        animation-timeline: scroll(root block);
      }
    }

    @supports (animation-timeline: view()) {
      .story-card {
        animation-name: reveal-card;
        animation-duration: auto;
        animation-timing-function: linear;
        animation-fill-mode: both;
        animation-timeline: view();
        animation-range: entry 0% cover 40%;
      }

      .feature-card {
        view-timeline-name: --feature-card;
        view-timeline-axis: block;
      }

      .feature-icon {
        animation-name: emphasize-icon;
        animation-duration: auto;
        animation-timing-function: linear;
        animation-fill-mode: both;
        animation-timeline: --feature-card;
        animation-range: entry 0% cover 30%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }

      #scroll-progress {
        display: none;
        animation: none;
      }

      .story-card {
        opacity: 1;
        transform: none;
        animation: none;
      }

      .feature-icon {
        transform: none;
        animation: none;
      }
    }
  </style>
</head>
<body>
  <div id="scroll-progress" aria-hidden="true"></div>

  <main>
    <h1>Scroll-driven animations</h1>
    <p class="intro">The thin bar at the top follows the page's scroll progress. Each story card follows its own passage through the viewport. Scroll up and down to see both effects reverse with your position.</p>

    <div class="story-list">
      <article class="story-card">
        <h2>Start with the goal</h2>
        <p>Before adding motion, decide what the visitor should learn from the effect. A progress bar can show how much of a long article has been read. A gentle entrance can help separate sections as they enter the viewport.</p>
        <p>Keep each effect tied to its content and make sure the content remains useful when the animation is unavailable.</p>
      </article>

      <article class="story-card feature-card">
        <span class="feature-icon" aria-hidden="true">1</span>
        <div>
          <h2>Track the whole page</h2>
          <p>The progress bar uses the document's root block-axis scroll progress. Its animation is at zero when the page is at the start of its scrollable range and reaches one at the end.</p>
          <p>The bar is decorative, so it is hidden from assistive technology. The article itself does not depend on it.</p>
        </div>
      </article>

      <article class="story-card">
        <h2>Follow one section</h2>
        <p>This card uses a view progress timeline. The card's opacity and position change while it enters the viewport. Scrolling in the other direction moves the effect back through the same keyframes.</p>
        <p>The base style keeps the card visible before the enhanced animation is applied.</p>
      </article>

      <article class="story-card">
        <h2>Choose a range</h2>
        <p>The example runs the card effect from the beginning of its entry range to 40 percent of its full cover range. A shorter range makes the change finish earlier during the card's passage through the viewport.</p>
        <p>Try changing the range to <code>cover</code> and compare how long the effect takes.</p>
      </article>

      <article class="story-card">
        <h2>Keep motion optional</h2>
        <p>Scroll-driven effects are an enhancement, not a requirement for reading the page. The feature query leaves static cards visible in browsers without the timeline functions.</p>
        <p>The reduced-motion rule removes the animations and smooth scrolling while preserving all content.</p>
      </article>
    </div>

    <p class="note">The green bar and card motion respond directly to scroll position. They do not run for a fixed number of seconds.</p>
  </main>
</body>
</html>
~~~

## Explanation

- `#scroll-progress` uses the root block-axis `scroll()` timeline. It scales from zero to one across the document's scrollable range.
- The base rule hides the progress bar. The `@supports` block displays and animates it only when the timeline syntax is supported.
- Each `.story-card` uses `view()` so its own passage through the nearest scrollport drives the reveal effect.
- The cards have visible base styles. The animation is a progressive enhancement and does not gate access to the text.
- `.feature-card` declares the named view timeline `--feature-card`. Its child icon references that timeline, so the parent's view progress drives the child's animation.
- `animation-range` limits the cards and icon to parts of their view timelines. Change the named ranges or percentages to compare the timing.
- The reduced-motion media query hides the decorative progress bar, removes the view animations, and disables smooth scrolling. All article text remains visible.

## Expected output

A thin green bar at the top fills as the document is scrolled and shrinks when scrolling back toward the top. Story cards subtly rise and become more opaque as they enter the viewport, then reverse as they leave. The numbered icon also scales and rotates based on its card's named view timeline. In browsers without support, the content remains static and visible. With reduced motion enabled, the bar and animations are removed.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [45 - Animations and keyframes](45-animations-and-keyframes.md) | [Lesson](../lessons/46-scroll-driven-animations.md) | [Q&A](../qnas/46-scroll-driven-animations.md) | [47 - Filters, blending, and opacity](47-filters-blending-and-opacity.md) |