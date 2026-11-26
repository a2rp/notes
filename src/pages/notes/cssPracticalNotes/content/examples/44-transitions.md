# 44 - Transitions

This example shows how CSS transitions respond to changed states. It compares timing functions, uses separate settings for multiple properties, demonstrates a delay, and includes keyboard focus and reduced-motion handling.

## Question

How can a page smoothly change a link's appearance when it is hovered or focused, and how do duration, timing function, delay, and reduced-motion preferences affect that transition?

## Complete example

Save this as an HTML file and open it in a browser. Hover over the links or use the keyboard to focus them. The timing rows move their marker when the row is hovered or one of its links receives focus.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS transitions</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      max-width: 62rem;
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
      max-width: 46rem;
    }

    .link-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
      gap: 1.25rem;
      margin-block: 1.5rem 2rem;
    }

    .action-link {
      display: block;
      min-height: 9rem;
      padding: 1rem;
      border: 2px solid #176b57;
      border-radius: 0.75rem;
      color: #173b34;
      background: white;
      box-shadow: 0 0.2rem 0.5rem rgb(0 0 0 / 10%);
      text-decoration: none;
      transform: translateY(0);
      transition:
        transform 220ms ease-out,
        background-color 220ms linear,
        box-shadow 220ms ease-out;
    }

    .action-link:hover,
    .action-link:focus-visible {
      transform: translateY(-0.3rem);
      background-color: #e7f3ef;
      box-shadow: 0 0.65rem 1rem rgb(0 0 0 / 16%);
    }

    .action-link:focus-visible,
    .timing-row a:focus-visible,
    .delay-link:focus-visible {
      outline: 3px solid #b66b00;
      outline-offset: 4px;
    }

    .timing-list {
      display: grid;
      gap: 1rem;
      max-width: 38rem;
      margin-block: 1.5rem 2rem;
    }

    .timing-row {
      padding: 0.75rem 1rem;
      border: 1px solid #aab7bd;
      border-radius: 0.5rem;
      background: white;
    }

    .timing-row p {
      margin-block: 0 0.5rem;
    }

    .timing-row a {
      color: #075b9b;
    }

    .track {
      width: 13rem;
      max-width: 100%;
      height: 1.5rem;
      margin-top: 0.5rem;
      padding: 0.2rem;
      border: 1px solid #aab7bd;
      border-radius: 1rem;
      background: #f5f7f8;
    }

    .marker {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: #176b57;
      transform: translateX(0);
    }

    .timing-row:hover .marker,
    .timing-row:focus-within .marker {
      transform: translateX(10rem);
    }

    .marker--linear {
      transition: transform 700ms linear;
    }

    .marker--ease {
      transition: transform 700ms ease;
    }

    .marker--ease-in {
      transition: transform 700ms ease-in;
    }

    .marker--ease-out {
      transition: transform 700ms ease-out;
    }

    .delay-link {
      display: inline-block;
      margin-block: 0.5rem 1.5rem;
      padding: 0.75rem 1rem;
      border: 2px solid #176b57;
      border-radius: 0.5rem;
      color: #173b34;
      background: white;
      text-decoration: none;
    }

    .delay-marker {
      display: inline-block;
      margin-left: 0.5rem;
      transition: transform 180ms ease-out 250ms;
    }

    .delay-link:hover .delay-marker,
    .delay-link:focus-visible .delay-marker {
      transform: translateX(0.75rem);
    }

    .note {
      padding: 0.75rem 1rem;
      border-left: 0.25rem solid #176b57;
      background: #e7f3ef;
    }

    @media (max-width: 25rem) {
      .timing-row:hover .marker,
      .timing-row:focus-within .marker {
        transform: translateX(6rem);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .action-link,
      .marker,
      .delay-marker {
        transition-duration: 0.01ms;
        transition-delay: 0s;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>CSS transitions</h1>
    <p class="intro">A transition gradually changes a property after its value changes. Try each link with a pointer and with the keyboard to compare the effects.</p>

    <section aria-labelledby="cards-title">
      <h2 id="cards-title">Transition multiple properties</h2>
      <div class="link-grid">
        <a class="action-link" href="#details">
          <h3>Move and lift</h3>
          <p>Transform changes position visually while the card keeps its layout space.</p>
        </a>
        <a class="action-link" href="#details">
          <h3>Change the background</h3>
          <p>The background color changes at a constant rate with a linear timing function.</p>
        </a>
        <a class="action-link" href="#details">
          <h3>Change the shadow</h3>
          <p>The shadow deepens as the card moves into its active state.</p>
        </a>
      </div>
    </section>

    <section aria-labelledby="timing-title">
      <h2 id="timing-title">Compare timing functions</h2>
      <p>Move the pointer over a row or focus its link. Each marker travels the same distance in 700 milliseconds, but its speed changes differently.</p>
      <div class="timing-list">
        <div class="timing-row">
          <p><strong>linear</strong> - constant rate</p>
          <a href="#details">Focus this timing example</a>
          <div class="track" aria-hidden="true"><div class="marker marker--linear"></div></div>
        </div>
        <div class="timing-row">
          <p><strong>ease</strong> - slower at the start and end</p>
          <a href="#details">Focus this timing example</a>
          <div class="track" aria-hidden="true"><div class="marker marker--ease"></div></div>
        </div>
        <div class="timing-row">
          <p><strong>ease-in</strong> - starts slowly</p>
          <a href="#details">Focus this timing example</a>
          <div class="track" aria-hidden="true"><div class="marker marker--ease-in"></div></div>
        </div>
        <div class="timing-row">
          <p><strong>ease-out</strong> - slows near the end</p>
          <a href="#details">Focus this timing example</a>
          <div class="track" aria-hidden="true"><div class="marker marker--ease-out"></div></div>
        </div>
      </div>
    </section>

    <section aria-labelledby="delay-title">
      <h2 id="delay-title">Add a short delay</h2>
      <p>Hover over or focus this link. The small marker waits 250 milliseconds before it moves.</p>
      <a class="delay-link" href="#details">A delayed change <span class="delay-marker" aria-hidden="true">&#8594;</span></a>
    </section>

    <p class="note" id="details">These links navigate to this note. The transitions add visual feedback, but the links remain usable without motion.</p>
  </main>
</body>
</html>
~~~

## Explanation

- `.action-link` declares separate transitions for `transform`, `background-color`, and `box-shadow`. Each property has a duration and a timing function.
- The changed values are in the hover and focus rules. The transition stays in the base rule, so it applies when entering and leaving those states.
- The timing rows all move a marker the same distance over the same duration. Their timing functions change the marker's speed during that time.
- `.delay-marker` uses the shorthand with a duration, timing function, and delay. Its movement waits briefly before starting.
- The interactive links have real in-page destinations, and `:focus-visible` applies feedback for keyboard navigation.
- The reduced-motion query shortens the transitions and removes the delay. The links and their text still work without motion.
- No keyframes are used. Each effect responds to a state change, leaving multi-step or repeating motion for the next chapter.

## Expected output

The page displays three cards. Hovering over or focusing a card gradually lifts it, changes its background color, and deepens its shadow. Four timing rows show markers moving along tracks at different rates. The final link's arrow waits briefly before sliding. With reduced motion enabled, the visual changes happen almost immediately.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [43 - Transforms](43-transforms.md) | [Lesson](../lessons/44-transitions.md) | [Q&A](../qnas/44-transitions.md) | [45 - Animations and keyframes](45-animations-and-keyframes.md) |