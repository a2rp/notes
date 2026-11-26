# 45 - Animations and keyframes

This example uses `@keyframes` to create a one-time entrance effect, a multi-stage progress illustration, and a repeating decorative pulse. It also shows how to pause motion with hover or keyboard focus and how to provide a reduced-motion version.

## Question

How can CSS animate an element through multiple keyframes, keep its final state, repeat a decorative effect, pause it, and leave the content visible when motion is reduced?

## Complete example

Save this as an HTML file and open it in a browser. The notice and progress illustration start when the page loads. Hover over or focus the pulse link to pause its decorative motion.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS animations and keyframes</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      max-width: 54rem;
      margin: 2rem auto;
      padding: 0 1rem 3rem;
      color: #263238;
      background: #f5f7f8;
      font: 1rem/1.6 system-ui, sans-serif;
    }

    h1,
    h2,
    h3 {
      line-height: 1.2;
    }

    .intro {
      max-width: 44rem;
    }

    .notice {
      margin-block: 1.5rem;
      padding: 1.25rem;
      border: 1px solid #8aaca2;
      border-left: 0.4rem solid #176b57;
      border-radius: 0.5rem;
      background: white;
      opacity: 0;
      transform: translateY(1rem) scale(0.98);
      animation: arrive 700ms ease-out 120ms 1 normal both;
    }

    @keyframes arrive {
      from {
        opacity: 0;
        transform: translateY(1rem) scale(0.98);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .progress-track {
      width: min(100%, 28rem);
      height: 1.25rem;
      margin-block: 1rem;
      overflow: hidden;
      border: 1px solid #8aaca2;
      border-radius: 1rem;
      background: white;
    }

    .progress-fill {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: #176b57;
      transform: scaleX(0);
      transform-origin: left center;
      animation: fill-track 1800ms ease-in-out 300ms 1 normal both;
    }

    @keyframes fill-track {
      0% {
        transform: scaleX(0);
      }

      65% {
        transform: scaleX(0.82);
      }

      100% {
        transform: scaleX(1);
      }
    }

    .pulse-control {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      margin-block: 1rem;
      padding: 0.75rem 1rem;
      border: 2px solid #176b57;
      border-radius: 0.5rem;
      color: #173b34;
      background: white;
      text-decoration: none;
    }

    .pulse-control:focus-visible {
      outline: 3px solid #b66b00;
      outline-offset: 4px;
    }

    .pulse-dot {
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background: #176b57;
      animation: breathe 1800ms ease-in-out infinite;
    }

    .pulse-control:hover .pulse-dot,
    .pulse-control:focus-visible .pulse-dot {
      animation-play-state: paused;
    }

    @keyframes breathe {
      0%,
      100% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.2);
      }
    }

    .note {
      margin-top: 2rem;
      padding: 0.75rem 1rem;
      border-left: 0.25rem solid #b66b00;
      background: #fff3d3;
    }

    @media (prefers-reduced-motion: reduce) {
      .notice {
        opacity: 1;
        transform: none;
        animation: none;
      }

      .progress-fill {
        transform: scaleX(1);
        animation: none;
      }

      .pulse-dot {
        animation: none;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Animations and keyframes</h1>
    <p class="intro">Keyframes define stages in an animation. The animation settings decide how long the stages take, whether they repeat, and what style remains afterward.</p>

    <section aria-labelledby="notice-title">
      <h2 id="notice-title">A one-time entrance effect</h2>
      <article class="notice">
        <h3>Welcome to the guide</h3>
        <p>This content starts slightly lower and transparent, then settles into its normal position and opacity.</p>
      </article>
    </section>

    <section aria-labelledby="progress-title">
      <h2 id="progress-title">Several stages in one cycle</h2>
      <p>The decorative bar has keyframes at 0%, 65%, and 100%.</p>
      <div class="progress-track" role="img" aria-label="Illustration of an animated bar filling from left to right">
        <div class="progress-fill"></div>
      </div>
    </section>

    <section aria-labelledby="pulse-title">
      <h2 id="pulse-title">Pause a repeating animation</h2>
      <p id="pulse-help">The pulse repeats to demonstrate an infinite iteration count. Hover over or focus the link to pause it.</p>
      <a class="pulse-control" href="#details" aria-describedby="pulse-help">
        <span class="pulse-dot" aria-hidden="true"></span>
        Pause the decorative pulse by hovering or focusing
      </a>
    </section>

    <p class="note" id="details">The notice text remains part of the document. Reduced motion turns off the animations while keeping the notice visible and the other content available.</p>
  </main>
</body>
</html>
~~~

## Explanation

- `@keyframes arrive` defines the starting and ending opacity and transform values. The browser interpolates between them over one cycle.
- The notice uses the `animation` shorthand: name, duration, timing function, delay, iteration count, direction, and fill mode. `both` applies the starting values during the delay and keeps the final values after the animation.
- `@keyframes fill-track` has three stages. `transform-origin: left center` makes the progress illustration grow from its left edge.
- The pulse animation has two keyframe stages and an infinite iteration count. Hovering over or focusing its link changes `animation-play-state` to `paused`.
- The `prefers-reduced-motion` rule removes the animations. It explicitly gives the notice and bar visible static styles, so the page does not depend on the animation to reveal them.
- The pulse is decorative and its dot is hidden from assistive technology. The link's explanatory text remains available, and the link points to the note below.

## Expected output

When the page opens, the welcome notice fades and rises into place. The bar grows from left to right, pausing briefly before it starts. The green dot repeatedly grows and shrinks until the link is hovered or keyboard-focused. With reduced motion enabled, the notice and bar appear in their completed static states, and the pulse stops.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [44 - Transitions](44-transitions.md) | [Lesson](../lessons/45-animations-and-keyframes.md) | [Q&A](../qnas/45-animations-and-keyframes.md) | [46 - Scroll-driven animations](46-scroll-driven-animations.md) |