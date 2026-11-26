# 59 - Responsive typography and fluid sizing

This example builds an editorial page with type and spacing that respond to the viewport. It uses rem and em for relative sizing, clamp() for bounded fluid values, ch for an approximate reading measure, and cqi for card titles that respond to their own containers.

## Question

How can an article page scale its typography and spacing smoothly while keeping paragraphs readable and reusable cards responsive to their own width?

## Complete example

Save the following as index.html and styles.css in the same folder. Open index.html and resize the browser. Also try browser zoom and a larger default text size.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Small spaces, lasting harvests</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header class="site-header">
    <a class="site-name" href="#top">Field Notes</a>
    <nav class="site-navigation" aria-label="Main navigation">
      <a href="#story">The story</a>
      <a href="#practices">Practices</a>
      <a href="#more-reading">More reading</a>
    </nav>
  </header>

  <main class="page-shell" id="top">
    <header class="hero">
      <p class="eyebrow">Growing well, wherever you are</p>
      <h1>Small spaces, lasting harvests</h1>
      <p class="hero-lead">
        A thoughtful garden can begin with one sunny ledge, a few useful
        containers, and a routine you can keep.
      </p>
      <p class="hero-meta">A field guide <span aria-hidden="true">•</span> 6 minute read</p>
    </header>

    <div class="article-layout">
      <article class="article-body" id="story">
        <p class="article-intro">
          A small garden is not a smaller version of a large one. It asks for
          different choices: plants that suit the light, containers that fit
          the space, and a plan that makes everyday care easy.
        </p>

        <section id="practices">
          <h2>Start with the light you have</h2>
          <p>
            Watch the space at several points during the day before choosing
            plants. A balcony that receives a few hours of morning sun can
            support different crops from a shaded north-facing ledge. Let the
            actual conditions guide the plan instead of trying to force a
            favorite plant into the wrong place.
          </p>
          <p>
            When the light changes by season, keep notes. Those observations
            help explain why a container that did well in spring may need a
            different position in summer.
          </p>

          <aside class="callout">
            <h3>Keep the first step small</h3>
            <p>
              Begin with two or three containers. A manageable routine is more
              useful than a large setup that is difficult to maintain.
            </p>
          </aside>
        </section>

        <section>
          <h2>Choose containers for the roots</h2>
          <p>
            Match each container to the plant's mature roots and water needs.
            A deeper pot gives some crops more room, while a broad shallow
            planter works well for a compact group of leaves. Drainage holes
            help excess water escape.
          </p>
          <p>
            Place containers where they can be reached without moving other
            objects. If watering is awkward, it is easy to skip. Put a small
            can nearby and check the soil before adding more water.
          </p>
        </section>

        <section>
          <h2>Build a routine around observation</h2>
          <p>
            Look at the leaves, check the soil, and notice how quickly the
            containers dry. These small checks can tell you more than a
            rigid calendar. Adjust the routine when the weather or plant
            growth changes.
          </p>
          <p>
            Leave room for the garden to change. A plant may need a larger
            container, a different position, or a different amount of
            attention as it grows.
          </p>
        </section>
      </article>

      <aside class="sidebar" aria-labelledby="sidebar-title">
        <div class="sidebar-card">
          <p class="eyebrow">At a glance</p>
          <h2 id="sidebar-title">A steady start</h2>
          <ul>
            <li>Observe the light before planting.</li>
            <li>Choose containers with drainage.</li>
            <li>Keep water and tools easy to reach.</li>
            <li>Adjust care as conditions change.</li>
          </ul>
        </div>

        <div class="sidebar-note">
          <h3>Reading measure</h3>
          <p>
            The article column has a maximum line length so it stays readable
            on a wide screen.
          </p>
        </div>
      </aside>
    </div>

    <section class="more-reading" id="more-reading" aria-labelledby="more-title">
      <p class="eyebrow">Continue exploring</p>
      <h2 id="more-title">More field notes</h2>

      <div class="reading-grid">
        <article class="reading-card">
          <p class="card-category">Planning</p>
          <h3>Make a simple planting plan</h3>
          <p>Keep useful crops and a realistic care routine in view.</p>
          <a href="#story">Read this note</a>
        </article>

        <article class="reading-card">
          <p class="card-category">Materials</p>
          <h3>Choose a container that lasts</h3>
          <p>Compare shape, drainage, weight, and the space available.</p>
          <a href="#practices">Read this note</a>
        </article>

        <article class="reading-card">
          <p class="card-category">Care</p>
          <h3>Learn from each growing season</h3>
          <p>Use simple observations to adjust your next round of planting.</p>
          <a href="#story">Read this note</a>
        </article>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>Field Notes <span aria-hidden="true">•</span> Practical ideas for everyday spaces</p>
  </footer>
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
  font-family: Georgia, "Times New Roman", serif;
  color: #24352f;
  background: #f7f6f1;
}

body {
  min-width: 320px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
}

a {
  color: #245f50;
  text-underline-offset: 0.18em;
}

a:hover {
  color: #163e34;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem max(1rem, calc((100% - 76rem) / 2));
  background: #fff;
  border-bottom: 1px solid #dedfd7;
}

.site-name {
  color: #24352f;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  text-decoration: none;
}

.site-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
}

.page-shell {
  width: min(100% - 2rem, 76rem);
  margin-inline: auto;
}

.hero {
  max-width: 64rem;
  padding-block: clamp(3rem, 8vw, 7rem) clamp(2rem, 5vw, 4rem);
}

.eyebrow {
  margin: 0 0 0.65rem;
  color: #577064;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 13ch;
  margin: 0;
  color: #1e342b;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  font-size: clamp(2rem, calc(1.4rem + 3.5vw), 4.25rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.05;
}

.hero-lead {
  max-width: 54ch;
  margin: 1.25rem 0 0;
  color: #50645a;
  font-size: 1.1rem;
  font-size: clamp(1.1rem, calc(1rem + 0.6vw), 1.4rem);
  line-height: 1.5;
}

.hero-meta {
  margin: 1.25rem 0 0;
  color: #66776d;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
}

.hero-meta span,
.site-footer span {
  padding-inline: 0.3em;
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(2rem, 5vw, 4rem);
  border-top: 1px solid #dedfd7;
}

.article-body {
  max-inline-size: 68ch;
  font-size: 1rem;
  font-size: clamp(1rem, calc(0.98rem + 0.15vw), 1.15rem);
  line-height: 1.75;
}

.article-body p {
  margin-block: 0 1.2em;
}

.article-intro {
  color: #33483d;
  font-size: 1.12em;
  line-height: 1.6;
}

.article-body section {
  margin-block-start: clamp(2.5rem, 5vw, 4rem);
}

.article-body h2 {
  margin-block: 0 0.75rem;
  color: #1e342b;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  font-size: clamp(1.5rem, calc(1.2rem + 1.1vw), 2.15rem);
  line-height: 1.15;
}

.callout {
  margin-block: 1.75rem;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: #e8eee6;
  border-inline-start: 0.3rem solid #4d806c;
  border-radius: 0.4rem;
}

.callout h3 {
  margin: 0 0 0.35rem;
  color: #244b3b;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
}

.callout p {
  margin: 0;
}

.sidebar {
  align-self: start;
}

.sidebar-card,
.sidebar-note {
  padding: 1.25rem;
  background: #fff;
  border: 1px solid #dedfd7;
  border-radius: 0.65rem;
}

.sidebar-card h2 {
  margin: 0 0 0.75rem;
  color: #1e342b;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  line-height: 1.2;
}

.sidebar-card ul {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding-inline-start: 1.2rem;
}

.sidebar-note {
  margin-block-start: 1rem;
  background: #f0eee6;
}

.sidebar-note h3 {
  margin: 0 0 0.4rem;
  color: #1e342b;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}

.sidebar-note p {
  margin: 0;
  color: #50645a;
}

.more-reading {
  padding-block: clamp(2.5rem, 6vw, 5rem);
  border-top: 1px solid #dedfd7;
}

.more-reading > h2 {
  margin: 0 0 1.5rem;
  color: #1e342b;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.7rem;
  font-size: clamp(1.7rem, calc(1.35rem + 1.5vw), 2.5rem);
  line-height: 1.15;
}

.reading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}

.reading-card {
  container-type: inline-size;
  padding: 1.25rem;
  background: #fff;
  border: 1px solid #dedfd7;
  border-radius: 0.7rem;
}

.card-category {
  margin: 0 0 0.6rem;
  color: #577064;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.reading-card h3 {
  margin: 0 0 0.6rem;
  color: #1e342b;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  line-height: 1.2;
}

.reading-card p:not(.card-category) {
  color: #50645a;
}

.reading-card a {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
}

@supports (font-size: 1cqi) {
  .reading-card h3 {
    font-size: clamp(1.1rem, calc(1rem + 1cqi), 1.55rem);
  }
}

.site-footer {
  padding: 1.5rem 1rem;
  color: #eaf0e9;
  background: #243b32;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.88rem;
  text-align: center;
}

.site-footer p {
  margin: 0;
}

@media (min-width: 54rem) {
  .article-layout {
    grid-template-columns: minmax(0, 2fr) minmax(15rem, 1fr);
  }
}

@media (max-width: 40rem) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.65rem;
    padding: 0.85rem 1rem;
  }

  .site-navigation {
    gap: 0.75rem;
  }

  .hero h1 {
    max-inline-size: 11ch;
  }
}
~~~

## Expected output

The page begins with a large headline and a short introduction. As the viewport grows, the heading, lead text, and section spacing grow smoothly until their clamp() maximums. At narrow widths, the page uses one column and the navigation wraps.

On a wide viewport, the article and sidebar appear in two columns. Paragraphs remain within an approximate 68ch measure instead of stretching across the page. The related cards form a responsive grid. Their headings use container-relative sizing when that CSS unit is supported, with a regular rem-based size as a fallback.

The font sizes remain relative to the root where appropriate. Browser zoom and a larger default text size can still change the layout, so check that content wraps without clipping.

## Explanation

1. The body starts at 1rem instead of forcing a pixel root size.
2. The hero title has a 2rem fallback followed by a clamp() formula with a minimum and maximum.
3. The lead text, section headings, and spacing also grow between chosen bounds.
4. em-based margins and the callout heading scale with the article's own font size.
5. Unitless line-height values scale with each element's font size.
6. The article's max-inline-size uses ch to set an approximate reading measure.
7. The related cards establish inline-size containers so their child headings can use cqi.
8. The cqi rule is inside @supports, and the rem-based heading size remains the fallback.
9. A media query changes the article layout from one column to two when enough room is available.
10. Viewport zoom, larger text, and longer content still need review because fluid values do not guarantee a usable layout on their own.

## Try it yourself

1. Resize the viewport and record how the hero title changes at its minimum, fluid range, and maximum.
2. Change the title's clamp() bounds and see whether the maximum is comfortable on a wide screen.
3. Change the article measure from 68ch to a smaller and larger value.
4. Put a related card in a narrower container and compare its title size.
5. Disable the cqi rule and confirm the rem-based card title still works.
6. Increase browser zoom and check headings, navigation, and card links.
7. Change the layout breakpoint and see when the sidebar has enough space.
8. Replace the article line-height with a pixel length and compare it with the unitless value.

## Key points

- clamp() gives fluid values minimum and maximum limits.
- Relative units let text and component spacing respond to root or local font size.
- ch provides an approximate line measure, not a character count.
- cqi lets a component respond to its query container instead of the viewport.
- Media queries still handle clear layout changes such as one column becoming two.
- Test with zoom, larger text, narrow screens, and realistic content.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [58 - Styling view transitions](../lessons/58-view-transitions.md) | [Q&A](../qnas/59-responsive-typography-and-fluid-sizing.md) | [Example](59-responsive-typography-and-fluid-sizing.md) | [60 - CSS architecture and naming conventions](../lessons/60-css-architecture-and-naming.md) |