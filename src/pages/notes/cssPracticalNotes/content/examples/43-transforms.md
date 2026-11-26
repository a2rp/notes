# 43 - Transforms

This example demonstrates common 2D transforms, the transform origin, individual transform properties, transform order, and a basic 3D perspective. The cards respond to pointer hover and keyboard focus. The effects happen immediately because this chapter covers transforms; transitions are introduced in the next chapter.

## Question

How can CSS visually move, rotate, or scale elements without changing their normal layout space, and how do transform origin, function order, and perspective affect the result?

## Complete example

Save this as an HTML file and open it in a browser. Hover over the links or move keyboard focus to them to see the interactive transforms.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS transforms</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      max-width: 64rem;
      margin: 2rem auto;
      padding: 0 1rem 3rem;
      color: #263238;
      background: #f5f7f8;
      font: 1rem/1.6 system-ui, sans-serif;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    .intro {
      max-width: 46rem;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
      gap: 2rem 1.5rem;
      margin-block: 2rem;
      padding: 0.5rem;
    }

    .card {
      display: block;
      min-height: 10rem;
      padding: 1rem;
      border: 2px solid #176b57;
      border-radius: 0.75rem;
      color: inherit;
      background: white;
      text-decoration: none;
      transform-origin: center;
    }

    .card:hover,
    .card:focus-visible {
      outline: 3px solid #e4a11b;
      outline-offset: 4px;
    }

    .card--move:hover,
    .card--move:focus-visible {
      transform: translateY(-0.5rem) rotate(1deg);
    }

    .card--grow:hover,
    .card--grow:focus-visible {
      transform: scale(1.04);
    }

    .card--pivot {
      transform-origin: left center;
    }

    .card--pivot:hover,
    .card--pivot:focus-visible {
      transform: rotate(-3deg);
    }

    .card--individual:hover,
    .card--individual:focus-visible {
      translate: 0 -0.4rem;
      rotate: 1deg;
      scale: 1.03;
    }

    .comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      gap: 1rem;
      margin-block: 1rem 2rem;
    }

    .order-example {
      min-height: 11rem;
      padding: 1rem;
      border: 1px solid #aab7bd;
      border-radius: 0.5rem;
      background: white;
    }

    .order-stage {
      position: relative;
      height: 6rem;
      margin-top: 0.75rem;
      border: 1px dashed #aab7bd;
      background-image: linear-gradient(90deg, transparent 49.5%, #d5dde0 50%, transparent 50.5%),
        linear-gradient(transparent 49.5%, #d5dde0 50%, transparent 50.5%);
    }

    .shape {
      position: absolute;
      top: 1rem;
      left: calc(50% - 1.5rem);
      display: grid;
      width: 3rem;
      height: 3rem;
      place-items: center;
      border-radius: 0.35rem;
      color: white;
      background: #176b57;
      font-weight: 700;
    }

    .shape--translate-then-rotate {
      transform: translateX(2rem) rotate(25deg);
    }

    .shape--rotate-then-translate {
      transform: rotate(25deg) translateX(2rem);
    }

    .pivot-demo {
      display: inline-block;
      margin: 1rem 0 2rem;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      background: #176b57;
      transform: rotate(-4deg);
      transform-origin: left center;
    }

    .scene {
      width: min(100%, 24rem);
      margin: 1.5rem auto;
      padding: 2rem;
      border: 1px dashed #72838a;
      perspective: 700px;
      perspective-origin: center;
    }

    .panel {
      min-height: 9rem;
      padding: 1.25rem;
      border: 2px solid #176b57;
      border-radius: 0.75rem;
      background: white;
      box-shadow: 0.5rem 0.75rem 1rem rgb(25 55 50 / 15%);
      transform: rotateY(16deg) rotateX(4deg);
    }

    .note {
      padding: 0.75rem 1rem;
      border-left: 0.25rem solid #e4a11b;
      background: #fff3d3;
    }

    @media (prefers-reduced-motion: reduce) {
      .card--move:hover,
      .card--move:focus-visible,
      .card--grow:hover,
      .card--grow:focus-visible,
      .card--pivot:hover,
      .card--pivot:focus-visible,
      .card--individual:hover,
      .card--individual:focus-visible {
        transform: none;
        translate: none;
        rotate: none;
        scale: none;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>CSS transforms</h1>
    <p class="intro">Transforms change how an element is drawn. They do not move its original layout space, so leave room for effects that grow or move beyond a card.</p>

    <section aria-labelledby="cards-title">
      <h2 id="cards-title">Move, scale, rotate, and combine</h2>
      <div class="card-grid">
        <a class="card card--move" href="#details">
          <h3>Move and rotate</h3>
          <p>Hover or focus to move this card up and turn it slightly.</p>
        </a>
        <a class="card card--grow" href="#details">
          <h3>Scale</h3>
          <p>Hover or focus to enlarge this card around its center.</p>
        </a>
        <a class="card card--pivot" href="#details">
          <h3>Change the origin</h3>
          <p>This card rotates around its left edge.</p>
        </a>
        <a class="card card--individual" href="#details">
          <h3>Individual properties</h3>
          <p>Separate translate, rotate, and scale effects on hover or focus.</p>
        </a>
      </div>
    </section>

    <section aria-labelledby="order-title">
      <h2 id="order-title">Function order changes the result</h2>
      <p>Both shapes use the same translation and rotation, but the transform functions appear in a different order.</p>
      <div class="comparison">
        <article class="order-example">
          <strong>Translate, then rotate</strong>
          <div class="order-stage" aria-label="A diagram showing a transformed square">
            <div class="shape shape--translate-then-rotate" aria-hidden="true">A</div>
          </div>
        </article>
        <article class="order-example">
          <strong>Rotate, then translate</strong>
          <div class="order-stage" aria-label="A diagram showing a differently transformed square">
            <div class="shape shape--rotate-then-translate" aria-hidden="true">B</div>
          </div>
        </article>
      </div>
    </section>

    <section aria-labelledby="origin-title">
      <h2 id="origin-title">Set a pivot point</h2>
      <p class="pivot-demo">This label rotates from its left edge.</p>
    </section>

    <section aria-labelledby="depth-title">
      <h2 id="depth-title">Add perspective</h2>
      <div class="scene">
        <article class="panel">
          <h3>A panel in a 3D scene</h3>
          <p>The parent scene supplies perspective. The panel rotates on the X and Y axes.</p>
        </article>
      </div>
    </section>

    <p class="note" id="details">These links point to this note so they can be activated by mouse or keyboard. The transform itself is visual feedback, not the link's purpose.</p>
  </main>
</body>
</html>
~~~

## Explanation

- The card grid uses CSS Grid for layout. The transforms add visual effects while each card keeps its original grid space.
- `.card--move` combines vertical translation and rotation. `.card--grow` scales around the center. `.card--pivot` rotates around its left-center origin.
- `.card--individual` uses the separate `translate`, `rotate`, and `scale` properties. These are independent values with a fixed composition order.
- Every interactive card is a real link with a destination in the page. Both `:hover` and `:focus-visible` apply the same visual transform, so keyboard users can see the effect too.
- The two order examples use the same translation and rotation functions in a different order. Their final positions and orientations differ because the functions are composed in a different sequence.
- The 3D scene sets `perspective` on the parent. The child panel rotates around its X and Y axes, making the depth visible.
- The reduced-motion media query removes the interactive transforms for visitors who ask for less motion. The static examples remain visible.
- No transition is included. The transform changes immediately, leaving transitions for the next chapter.

## Expected output

The page shows a responsive grid of four cards. Hovering over a card or moving keyboard focus to it moves, enlarges, or rotates it. The focus outline remains visible. Below the cards, two squares end up in different positions because their transform function order differs. A label rotates around its left edge, and a panel appears tilted inside a perspective scene.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [42 - Generated content and counters](42-generated-content-and-counters.md) | [Lesson](../lessons/43-transforms.md) | [Q&A](../qnas/43-transforms.md) | [44 - Transitions](44-transitions.md) |