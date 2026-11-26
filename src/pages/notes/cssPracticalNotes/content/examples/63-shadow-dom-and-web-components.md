# 63 - Styling Shadow DOM and web components

This example creates a small plant-card web component. The component keeps its internal card markup and styles in a shadow root, accepts page content through slots, accepts an accent custom property, and exposes selected parts for outer styling.

## Question

How can a page customize a web component's theme and selected internal elements without reaching into its private selectors?

## Complete example

Save the following as index.html and styles.css in the same folder. Open index.html in a modern browser. The component is defined by the script at the end of the page.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Field Notes - Plant profiles</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header class="site-header" id="top">
    <a class="site-brand" href="#top">Field Notes</a>
    <nav aria-label="Primary navigation">
      <a href="#profiles" aria-current="page">Plant profiles</a>
      <a href="#care">Care notes</a>
    </nav>
  </header>

  <main class="page-shell">
    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow">A growing guide</p>
      <h1 id="page-title">Meet a few useful garden plants</h1>
      <p class="intro__summary">
        Each plant card owns its internal layout and styles while allowing
        this page to provide content and a small set of visual choices.
      </p>
    </section>

    <section class="profile-section" id="profiles" aria-labelledby="profiles-title">
      <div class="section-heading">
        <p class="eyebrow">Plant profiles</p>
        <h2 id="profiles-title">Good choices for a sunny space</h2>
      </div>

      <div class="profile-grid">
        <plant-card featured>
          <span slot="title">Sweet basil</span>
          <svg slot="image" viewBox="0 0 480 220" role="img" aria-labelledby="basil-image-title">
            <title id="basil-image-title">Basil leaves growing in a small pot</title>
            <rect width="480" height="220" rx="18" fill="#e5f0df"/>
            <path d="M170 164c4-70 32-110 67-111 34-1 48 45 35 111" fill="none" stroke="#356b49" stroke-linecap="round" stroke-width="12"/>
            <path d="M221 105c-36-7-49-30-39-53 27 2 45 19 47 45m37-9c29-12 38-35 27-55-25 6-40 25-37 51m-63 55c-29-4-42-23-37-43 23 0 39 14 42 37m61-12c28-5 41-24 35-44-23 1-39 15-41 38" fill="#6d995b"/>
            <path d="M142 164h196l-17 34H159z" fill="#9a6845"/>
            <path d="M137 163h206" stroke="#744b32" stroke-linecap="round" stroke-width="10"/>
          </svg>
          <p slot="summary">A fragrant herb that grows well in a warm, sunny container.</p>
          <span slot="action-label">Read basil care notes</span>
        </plant-card>

        <plant-card>
          <span slot="title">Leaf lettuce</span>
          <svg slot="image" viewBox="0 0 480 220" role="img" aria-labelledby="lettuce-image-title">
            <title id="lettuce-image-title">Leaf lettuce growing in a garden bed</title>
            <rect width="480" height="220" rx="18" fill="#edf1d8"/>
            <path d="M111 167c-9-42 8-75 37-78 3-27 34-42 58-25 16-34 57-32 68-1 32-12 57 16 42 43 34 14 40 46 18 67H111z" fill="#719b58"/>
            <path d="M161 168c-5-26 5-47 23-57m34 57c-3-39 7-65 27-82m24 82c2-30 12-48 29-57" fill="none" stroke="#dbe9bc" stroke-linecap="round" stroke-width="8"/>
            <path d="M88 169h304" stroke="#805c3b" stroke-linecap="round" stroke-width="12"/>
          </svg>
          <p slot="summary">A quick-growing leafy crop for cool weather and regular harvests.</p>
          <span slot="action-label">Read lettuce care notes</span>
        </plant-card>
      </div>
    </section>

    <section class="care-section" id="care" aria-labelledby="care-title">
      <h2 id="care-title">Care notes</h2>
      <p>Check the light and soil before changing a plant's watering routine.</p>
    </section>
  </main>

  <footer class="site-footer">
    <p>Field Notes</p>
    <p>Learn a little with every growing season.</p>
  </footer>

  <template id="plant-card-template">
    <style>
      :host {
        display: block;
        color: var(--plant-card-text, #26362c);
        font: inherit;
        --card-accent: var(--plant-card-accent, #596b5e);
      }

      .card {
        block-size: 100%;
        overflow: hidden;
        padding: 1rem;
        border: 1px solid #d7e1d7;
        border-block-start: 0.35rem solid var(--card-accent);
        border-radius: 0.9rem;
        background: #ffffff;
      }

      .card__eyebrow {
        margin: 0;
        color: var(--card-accent);
        font-size: 0.75rem;
        font-weight: 750;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .card__badge {
        display: none;
        margin-block-start: 0.5rem;
        padding: 0.2rem 0.55rem;
        border-radius: 999px;
        background: var(--card-accent);
        color: #ffffff;
        font-size: 0.75rem;
        font-weight: 700;
      }

      :host([featured]) .card__badge {
        display: inline-flex;
      }

      .card__title {
        margin: 0.75rem 0;
        font-size: 1.4rem;
        line-height: 1.2;
      }

      .card__media {
        overflow: hidden;
        border-radius: 0.6rem;
      }

      ::slotted(svg) {
        display: block;
        inline-size: 100%;
        block-size: auto;
      }

      .card__summary {
        margin-block-start: 0.75rem;
        color: #596b5e;
      }

      ::slotted(p) {
        margin: 0;
      }

      .card__actions {
        margin-block-start: 1rem;
      }

      .card__action {
        color: var(--card-accent);
        font-weight: 700;
        text-underline-offset: 0.2em;
      }
    </style>

    <article class="card" part="card">
      <p class="card__eyebrow" part="eyebrow">Plant profile</p>
      <span class="card__badge" part="badge">Featured</span>
      <h2 class="card__title" part="title">
        <slot name="title">Untitled plant</slot>
      </h2>
      <div class="card__media">
        <slot name="image"></slot>
      </div>
      <div class="card__summary" part="summary">
        <slot name="summary">Care details are not available yet.</slot>
      </div>
      <div class="card__actions" part="actions">
        <a class="card__action" part="action" href="#care">
          <slot name="action-label">Read care notes</slot>
        </a>
      </div>
    </article>
  </template>

  <script>
    const plantCardTemplate = document.querySelector("#plant-card-template");

    class PlantCard extends HTMLElement {
      constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.append(plantCardTemplate.content.cloneNode(true));
      }
    }

    customElements.define("plant-card", PlantCard);
  </script>
</body>
</html>
~~~

### styles.css

~~~css
:root {
  color-scheme: light;
  --color-text: #26362c;
  --color-muted: #596b5e;
  --color-page: #f5f7f2;
  --color-accent: #285c42;
  --color-border: #d7e1d7;
  --content-width: 68rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body,
h1,
h2,
p {
  margin: 0;
}

body {
  min-block-size: 100vh;
  background: var(--color-page);
  color: var(--color-text);
  font-family: system-ui, sans-serif;
  line-height: 1.55;
}

a {
  color: inherit;
}

:focus-visible {
  outline: 3px solid #a34d13;
  outline-offset: 3px;
}

.site-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-inline-size: var(--content-width);
  margin-inline: auto;
  padding: 1rem;
}

.site-brand {
  color: var(--color-text);
  font-size: 1.15rem;
  font-weight: 750;
  text-decoration: none;
}

.site-header nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.site-header nav a {
  color: var(--color-muted);
  text-underline-offset: 0.2em;
}

.site-header nav a[aria-current="page"] {
  color: var(--color-accent);
  font-weight: 700;
}

.page-shell {
  inline-size: min(100% - 2rem, 64rem);
  margin-inline: auto;
}

.intro {
  max-inline-size: 52rem;
  padding-block: clamp(3rem, 8vw, 6rem);
}

.eyebrow {
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.intro h1 {
  max-inline-size: 18ch;
  margin-block-start: 0.5rem;
  font-size: clamp(2.3rem, 6vw, 4.5rem);
  line-height: 1.05;
}

.intro__summary {
  max-inline-size: 55ch;
  margin-block-start: 1rem;
  color: var(--color-muted);
}

.profile-section {
  padding-block: 2rem;
}

.section-heading {
  margin-block-end: 1.5rem;
}

.section-heading h2,
.care-section h2 {
  margin-block-start: 0.35rem;
  font-size: 1.7rem;
  line-height: 1.2;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}

plant-card {
  display: block;
  --plant-card-accent: #285c42;
  --plant-card-text: #26362c;
}

plant-card[featured] {
  --plant-card-accent: #a34d13;
}

plant-card::part(card) {
  box-shadow: 0 0.4rem 1.2rem rgb(38 54 44 / 8%);
}

plant-card::part(title) {
  letter-spacing: -0.02em;
}

plant-card::part(badge) {
  border-radius: 0.25rem;
  text-transform: uppercase;
}

plant-card::part(action) {
  text-decoration-thickness: 0.08em;
}

.care-section {
  max-inline-size: 50ch;
  padding-block: 3rem;
}

.care-section p {
  margin-block-start: 0.75rem;
  color: var(--color-muted);
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-block-start: 2rem;
  padding: 1.5rem max(1rem, calc((100% - var(--content-width)) / 2));
  border-block-start: 1px solid var(--color-border);
  color: var(--color-muted);
}

@media (min-width: 48rem) {
  .site-header {
    padding-inline: 2rem;
  }

  .page-shell {
    inline-size: min(100% - 4rem, 64rem);
  }
}
~~~

## Expected output

The page shows two plant cards in a responsive grid. Sweet basil has a featured badge and a warm accent. Leaf lettuce uses the default green accent. Both cards share the same internal layout and styles, and both receive their title, illustration, summary, and action label from the page.

The outside stylesheet changes the host's accent custom property and styles the exposed card, title, badge, and action parts. It does not select the card's private .card__summary or .card__media classes. Inside the shadow stylesheet, ::slotted(svg) sizes the directly assigned illustration, and ::slotted(p) styles a directly assigned summary paragraph.

The shadow root is created in open mode so the example is easy to inspect in developer tools. Open mode is for access to the root through the DOM API; it is not a security feature.

## How the styling API works

- The plant-card element is the host.
- The title, image, summary, and action label are page-provided light DOM assigned to named slots.
- The component's internal article uses the card part name so the page may adjust its appearance.
- The title, badge, summary, actions, and action link are intentionally exposed as parts.
- The featured attribute changes the internal badge through :host().
- The plant-card-accent custom property passes a theme value from the page into the component.
- Internal class names such as card__media stay private to the component.

If the internal markup changes, the component can preserve its slots, host attributes, custom properties, and part names as its public API.

## Try it yourself

1. Remove the featured attribute and see how the badge changes.
2. Change --plant-card-accent on the host and observe the internal border, label, and action.
3. Remove part="title" from the internal heading and see the outer title rule stop matching.
4. Change the title slot fallback text and then remove the page-provided title.
5. Replace the slotted SVG with a directly assigned image and add a matching ::slotted(img) rule.
6. Try to style .card__media from styles.css and confirm the selector cannot reach into the shadow tree.
7. Add a public part for one internal element only if page authors need to customize it.
8. Add a new documented custom property for a real theme need, with an internal fallback.
9. Inspect the host and shadow root in developer tools.
10. Keep the component's public parts and custom properties stable when changing its internal markup.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [62 - Organizing large stylesheets](../lessons/62-organizing-large-stylesheets.md) | [Q&A](../qnas/63-shadow-dom-and-web-components.md) | [Example](63-shadow-dom-and-web-components.md) | [64 - Debugging with browser developer tools](../lessons/64-debugging-with-browser-devtools.md) |