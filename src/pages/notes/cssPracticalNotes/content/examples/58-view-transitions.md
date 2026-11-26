# 58 - Styling view transitions

This example transitions between a product summary and a detail view. A shared view-transition-name lets the artwork move and resize between the two layouts. JavaScript switches the visible view, while CSS styles the captured transition.

## Question

How can a page animate one meaningful element between two same-document views while keeping the update functional without view transition support?

## Complete example

Save the following as index.html, styles.css, and app.js in the same folder. Open index.html and select View product details. Select Back to products to reverse the transition.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>View transitions example</title>
  <link rel="stylesheet" href="./styles.css">
  <script src="./app.js" defer></script>
</head>
<body>
  <main class="page" id="app">
    <section
      class="view"
      id="list-view"
      aria-labelledby="list-title"
    >
      <header class="page-header">
        <p class="eyebrow">Small batch studio</p>
        <h1 id="list-title">Field collection</h1>
        <p class="intro">
          Everyday objects made for quiet moments and useful routines.
        </p>
      </header>

      <article class="product-card">
        <figure
          class="product-art"
          role="img"
          aria-label="Illustration of a warm sun above blue waves"
        >
          <span class="product-art__sun" aria-hidden="true"></span>
          <span class="product-art__wave product-art__wave--back" aria-hidden="true"></span>
          <span class="product-art__wave product-art__wave--front" aria-hidden="true"></span>
          <span class="product-art__label" aria-hidden="true">FIELD 01</span>
        </figure>

        <div class="product-copy">
          <p class="eyebrow">Ceramic tableware</p>
          <h2>Coastline cup</h2>
          <p>
            A hand-finished stoneware cup with a quiet, wave-shaped glaze.
          </p>
          <p class="product-price">$28</p>
          <button class="button" type="button" data-show-view="detail">
            View product details
          </button>
        </div>
      </article>

      <p class="page-note">
        The artwork uses one unique transition name in each visible view.
      </p>
    </section>

    <section
      class="view"
      id="detail-view"
      aria-labelledby="detail-title"
      hidden
    >
      <header class="detail-header">
        <button class="back-button" type="button" data-show-view="list">
          Back to products
        </button>
        <p class="eyebrow">Product details</p>
      </header>

      <article class="detail-card">
        <figure
          class="product-art"
          role="img"
          aria-label="Illustration of a warm sun above blue waves"
        >
          <span class="product-art__sun" aria-hidden="true"></span>
          <span class="product-art__wave product-art__wave--back" aria-hidden="true"></span>
          <span class="product-art__wave product-art__wave--front" aria-hidden="true"></span>
          <span class="product-art__label" aria-hidden="true">FIELD 01</span>
        </figure>

        <div class="detail-copy">
          <p class="eyebrow">Ceramic tableware</p>
          <h1 id="detail-title">Coastline cup</h1>
          <p class="detail-lead">
            A stoneware cup shaped for everyday use and finished by hand.
          </p>
          <p class="product-price">$28</p>

          <h2>About this piece</h2>
          <p>
            Each cup is formed from durable stoneware. The soft blue glaze
            varies slightly from piece to piece, so every finish is unique.
          </p>

          <dl class="product-facts">
            <div>
              <dt>Capacity</dt>
              <dd>320 ml</dd>
            </div>
            <div>
              <dt>Material</dt>
              <dd>Stoneware</dd>
            </div>
            <div>
              <dt>Care</dt>
              <dd>Dishwasher safe</dd>
            </div>
          </dl>

          <button class="button" type="button" data-show-view="list">
            Return to collection
          </button>
        </div>
      </article>
    </section>
  </main>

  <noscript>
    <p class="noscript-note">
      This example needs JavaScript to switch between its two views.
    </p>
  </noscript>
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
  background: #f3f1ec;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

button {
  font: inherit;
}

[hidden] {
  display: none !important;
}

.page {
  width: min(100% - 2rem, 980px);
  margin: 0 auto;
  padding: 3rem 0;
}

.page-header {
  max-width: 48rem;
  margin-bottom: 1.75rem;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: #6c6259;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0.65rem;
  color: #252e32;
  font-size: clamp(2.1rem, 6vw, 3.6rem);
  line-height: 1.05;
}

h2 {
  margin-bottom: 0.65rem;
  color: #252e32;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  line-height: 1.12;
}

.intro {
  max-width: 40rem;
  margin-bottom: 0;
  color: #625f59;
  font-size: 1.1rem;
  line-height: 1.6;
}

.product-card,
.detail-card {
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(1.25rem, 4vw, 3rem);
  align-items: center;
  padding: clamp(1rem, 4vw, 2rem);
  background: #fff;
  border: 1px solid #dedbd3;
  border-radius: 1.25rem;
  box-shadow: 0 1.2rem 3rem rgb(37 46 50 / 8%);
}

.product-art {
  position: relative;
  display: grid;
  min-width: 0;
  aspect-ratio: 4 / 3;
  margin: 0;
  overflow: hidden;
  place-items: center;
  background: linear-gradient(145deg, #f3d49c 0%, #e5b889 48%, #9ac5c6 48%, #467d8c 100%);
  border-radius: 0.9rem;
}

.product-art__sun {
  position: absolute;
  top: 13%;
  left: 61%;
  width: 22%;
  aspect-ratio: 1;
  background: #fff0c5;
  border-radius: 50%;
}

.product-art__wave {
  position: absolute;
  right: -18%;
  left: -18%;
  height: 55%;
  border-radius: 50% 50% 0 0;
  transform: rotate(-8deg);
}

.product-art__wave--back {
  bottom: -18%;
  background: #5b9ba4;
}

.product-art__wave--front {
  bottom: -29%;
  background: #22566b;
  transform: rotate(8deg);
}

.product-art__label {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0.35rem 0.55rem;
  color: #fff;
  background: rgb(24 48 58 / 65%);
  border-radius: 0.3rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.product-copy {
  max-width: 32rem;
}

.product-copy > p:not(.eyebrow, .product-price) {
  color: #625f59;
  line-height: 1.65;
}

.product-price {
  margin: 1.2rem 0;
  color: #252e32;
  font-size: 1.3rem;
  font-weight: 700;
}

.button,
.back-button {
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  border: 2px solid #252e32;
  border-radius: 0.5rem;
  font-weight: 700;
  cursor: pointer;
}

.button {
  color: #fff;
  background: #252e32;
}

.button:hover {
  color: #252e32;
  background: #fff;
}

.back-button {
  margin-bottom: 1.5rem;
  color: #252e32;
  background: transparent;
}

.back-button:hover {
  background: #e7e3da;
}

.button:focus-visible,
.back-button:focus-visible {
  outline: 3px solid #bb5f36;
  outline-offset: 3px;
}

.page-note {
  margin: 1rem 0 0;
  color: #625f59;
  font-size: 0.9rem;
}

.detail-header {
  margin-bottom: 1rem;
}

.detail-header .eyebrow {
  margin-bottom: 0;
}

.detail-card {
  align-items: start;
}

.detail-copy {
  padding-block: 0.25rem;
}

.detail-lead {
  color: #625f59;
  font-size: 1.1rem;
  line-height: 1.6;
}

.detail-copy h2 {
  margin-top: 1.5rem;
  font-size: 1.15rem;
}

.detail-copy > p:not(.eyebrow, .detail-lead, .product-price) {
  color: #625f59;
  line-height: 1.65;
}

.product-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.product-facts div {
  padding-top: 0.7rem;
  border-top: 1px solid #dedbd3;
}

.product-facts dt {
  color: #6c6259;
  font-size: 0.8rem;
  font-weight: 700;
}

.product-facts dd {
  margin: 0.2rem 0 0;
}

.noscript-note {
  width: min(100% - 2rem, 980px);
  margin: 0 auto 2rem;
  padding: 1rem;
  background: #fff;
  border-left: 4px solid #bb5f36;
}

@supports (view-transition-name: product-art) {
  .product-art {
    view-transition-name: product-art;
  }

  :root::view-transition-group(product-art) {
    animation-duration: 520ms;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  :root::view-transition-old(product-art) {
    animation: 180ms ease-out both art-fade-out;
  }

  :root::view-transition-new(product-art) {
    animation: 280ms ease-in both art-fade-in;
  }

  :root::view-transition-old(root) {
    animation: 140ms ease-out both page-fade-out;
  }

  :root::view-transition-new(root) {
    animation: 180ms ease-in both page-fade-in;
  }
}

@keyframes art-fade-out {
  to {
    opacity: 0.35;
  }
}

@keyframes art-fade-in {
  from {
    opacity: 0.35;
  }
}

@keyframes page-fade-out {
  to {
    opacity: 0.7;
  }
}

@keyframes page-fade-in {
  from {
    opacity: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root::view-transition-group(root),
  :root::view-transition-group(product-art),
  :root::view-transition-old(root),
  :root::view-transition-new(root),
  :root::view-transition-old(product-art),
  :root::view-transition-new(product-art) {
    animation-duration: 1ms !important;
  }
}

@media (max-width: 680px) {
  .page {
    width: min(100% - 1.25rem, 980px);
    padding-block: 1.5rem;
  }

  .product-card,
  .detail-card {
    grid-template-columns: 1fr;
  }

  .product-art {
    width: 100%;
  }

  .product-facts {
    grid-template-columns: 1fr;
  }

  .product-facts div {
    padding-block: 0.5rem;
  }
}
~~~

### app.js

~~~javascript
const app = document.querySelector("#app");

const views = {
  list: document.querySelector("#list-view"),
  detail: document.querySelector("#detail-view")
};

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-show-view]");

  if (!button) {
    return;
  }

  const nextView = button.dataset.showView;

  if (!views[nextView]) {
    return;
  }

  const update = () => {
    for (const [name, view] of Object.entries(views)) {
      view.hidden = name !== nextView;
    }
  };

  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(update);
  } else {
    update();
  }
});
~~~

## Expected output

The initial page shows a product card with artwork, a description, a price, and a View product details button. Selecting the button replaces the summary with a detail view. In a browser with same-document view transition support, the artwork moves and resizes from its card position into the detail layout while the page content fades.

Selecting Back to products performs the reverse update. Without the View Transition API, both buttons still switch the visible view immediately. With reduced motion enabled, the transition animations last only a very short time.

## Explanation

1. The two figures use the same view-transition-name because they represent the same artwork in the old and new states.
2. Only one view is visible at a time, so the name identifies one element in each captured state.
3. app.js changes the hidden state inside the view transition callback. If the API is unavailable, it applies the same update directly.
4. The feature query adds the named capture and pseudo-element styling only when the browser recognizes view-transition-name.
5. The transition group animates the artwork's size and position between the two layouts.
6. The old and new artwork captures have separate fade animations. The root pseudo-elements also soften the rest of the page change.
7. The reduced-motion media query shortens the animations for users who request less motion.
8. The focus-visible styles keep keyboard focus apparent on both view controls.
9. The hidden attribute prevents the inactive view from being rendered and captured as an active duplicate.
10. The transition is only a visual effect. The HTML sections and JavaScript update provide the content and state change.

## Try it yourself

1. Change the group duration and compare the movement with the root fade.
2. Remove view-transition-name from one figure and see how the browser treats the artwork.
3. Give a second meaningful element a distinct name and style its group separately.
4. Temporarily remove the feature query and compare behavior in a browser without support.
5. Disable JavaScript and confirm the initial product summary remains readable.
6. Enable a reduced-motion preference and check the shorter transition.
7. Change the detail layout from a two-column card to a single column and observe the geometry transition.
8. Add another product, but give it a distinct transition name rather than reusing product-art in the same visible state.

## Key points

- JavaScript updates the same-document view; CSS styles the browser's transition captures.
- A shared unique view-transition-name pairs the same conceptual element between states.
- The group, old, new, and root pseudo-elements offer different levels of styling.
- Feature detection and a direct-update path keep the interface usable without the animation.
- Reduced-motion preferences should change or remove nonessential movement.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [57 - Anchor positioning](../lessons/57-anchor-positioning.md) | [Q&A](../qnas/58-view-transitions.md) | [Example](58-view-transitions.md) | [59 - Responsive typography and fluid sizing](../lessons/59-responsive-typography-and-fluid-sizing.md) |