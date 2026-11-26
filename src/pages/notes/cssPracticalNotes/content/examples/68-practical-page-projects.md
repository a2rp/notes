# 68 - Practical page projects - Example

This project builds a one-page site for a fictional community garden. It has a clear page outline, primary navigation, an introduction, program cards, recurring events, visit details, and a membership action. The example uses only local content and CSS.

## Project brief

- **Purpose:** Help a visitor understand the garden and decide how to visit or get involved.
- **Audience:** Neighbors and people new to community gardening.
- **Primary action:** Find out how to join or visit.
- **Content:** About the garden, its programs, recurring events, location, hours, and next steps.
- **Success checks:** All sections are easy to find, the layout adapts to narrow screens, and links work with a keyboard.

## Question

How can you turn this brief into a complete, responsive page with a logical heading structure, visible interaction states, and working navigation?

## Complete example

Save the following two files in the same folder and open `index.html` in a browser.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Learn about Northside Community Garden, its events, and how to visit.">
  <title>Northside Community Garden</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body id="top">
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header">
    <a class="site-brand" href="#top" aria-label="Northside Community Garden home">
      <span class="site-brand__mark" aria-hidden="true">N</span>
      <span>Northside Garden</span>
    </a>

    <nav class="site-nav" aria-label="Primary navigation">
      <ul class="site-nav__list">
        <li><a href="#about">About</a></li>
        <li><a href="#programs">Programs</a></li>
        <li><a href="#events">Events</a></li>
        <li><a href="#visit">Visit</a></li>
        <li><a class="site-nav__action" href="#join">Get involved</a></li>
      </ul>
    </nav>
  </header>

  <main class="site-main" id="main-content">
    <section class="hero" aria-labelledby="page-title">
      <div class="hero__content">
        <p class="eyebrow">A neighborhood place to grow</p>
        <h1 id="page-title">Good things grow when we grow them together.</h1>
        <p class="hero__summary">
          Northside Community Garden is a shared green space for learning,
          growing fresh food, and getting to know your neighbors.
        </p>
        <div class="hero__actions">
          <a class="button button--primary" href="#join">Find out how to join</a>
          <a class="button button--secondary" href="#events">Explore upcoming events</a>
        </div>
      </div>

      <div class="hero-art" aria-hidden="true">
        <span class="hero-art__sun"></span>
        <span class="hero-art__hill hero-art__hill--back"></span>
        <span class="hero-art__hill hero-art__hill--front"></span>
        <span class="hero-art__plant hero-art__plant--one"></span>
        <span class="hero-art__plant hero-art__plant--two"></span>
      </div>
    </section>

    <section class="content-section" id="about" aria-labelledby="about-title">
      <div class="section-intro">
        <p class="eyebrow">About the garden</p>
        <h2 id="about-title">A shared space with room for everyone</h2>
        <p>
          We care for a collection of small growing spaces together. You can
          learn at your own pace, share a harvest, or simply stop by for a quiet
          break among the plants.
        </p>
      </div>

      <div class="values-grid">
        <article class="value-card">
          <span class="value-card__number" aria-hidden="true">01</span>
          <h3>Learn by doing</h3>
          <p>Join a guided session and try practical growing skills with a neighbor.</p>
        </article>
        <article class="value-card">
          <span class="value-card__number" aria-hidden="true">02</span>
          <h3>Share what you grow</h3>
          <p>Take part in seasonal harvests and share extra produce with the group.</p>
        </article>
        <article class="value-card">
          <span class="value-card__number" aria-hidden="true">03</span>
          <h3>Make a place together</h3>
          <p>Help care for a welcoming garden that belongs to the neighborhood.</p>
        </article>
      </div>
    </section>

    <section class="content-section content-section--tinted" id="programs" aria-labelledby="programs-title">
      <div class="section-intro">
        <p class="eyebrow">Ways to take part</p>
        <h2 id="programs-title">Choose a comfortable first step</h2>
        <p>You do not need gardening experience to join a program.</p>
      </div>

      <div class="program-grid">
        <article class="program-card">
          <h3>Open garden hours</h3>
          <p>Walk through the garden, ask a question, or see what is growing this week.</p>
          <a href="#visit">Check the visiting information</a>
        </article>
        <article class="program-card">
          <h3>Beginner growing sessions</h3>
          <p>Practice planting, watering, and caring for seasonal crops with a volunteer.</p>
          <a href="#events">See the recurring events</a>
        </article>
        <article class="program-card">
          <h3>Shared garden plots</h3>
          <p>Help look after a small growing area with support from the garden group.</p>
          <a href="#join">Ask about getting involved</a>
        </article>
      </div>
    </section>

    <section class="content-section" id="events" aria-labelledby="events-title">
      <div class="section-intro section-intro--row">
        <div>
          <p class="eyebrow">Come along</p>
          <h2 id="events-title">Recurring garden events</h2>
        </div>
        <p>Events take place at the garden unless the group announces a different meeting spot.</p>
      </div>

      <ul class="event-list">
        <li>
          <article class="event-card">
            <p class="event-card__schedule">Every Thursday</p>
            <h3>Open garden morning</h3>
            <p>Visit, meet a volunteer, and see the shared growing spaces.</p>
          </article>
        </li>
        <li>
          <article class="event-card">
            <p class="event-card__schedule">First Saturday of the month</p>
            <h3>Seed and skill share</h3>
            <p>Bring a question, exchange seeds, or learn a simple garden task.</p>
          </article>
        </li>
        <li>
          <article class="event-card">
            <p class="event-card__schedule">Last Saturday of the month</p>
            <h3>Community work morning</h3>
            <p>Help with seasonal care and finish with a shared refreshment break.</p>
          </article>
        </li>
      </ul>
    </section>

    <section class="visit-section" id="visit" aria-labelledby="visit-title">
      <div>
        <p class="eyebrow">Plan a visit</p>
        <h2 id="visit-title">Come by and take a look</h2>
        <p class="visit-section__summary">
          First-time visitors are welcome during open garden hours. The gate is
          beside the Northside neighborhood hall.
        </p>
        <a class="text-link" href="#events">Review recurring events</a>
      </div>

      <dl class="visit-details">
        <div>
          <dt>Location</dt>
          <dd>15 Garden Lane, Northside</dd>
        </div>
        <div>
          <dt>Open garden hours</dt>
          <dd>Thursdays, 9:00 am to 12:00 pm</dd>
        </div>
        <div>
          <dt>What to bring</dt>
          <dd>Comfortable shoes and any questions you have</dd>
        </div>
      </dl>
    </section>

    <section class="join-section" id="join" aria-labelledby="join-title">
      <div>
        <p class="eyebrow">Get involved</p>
        <h2 id="join-title">Start with a visit</h2>
        <p>
          Come to an open garden morning to meet the volunteers and learn how
          shared plots work. You can decide what suits you after seeing the space.
        </p>
      </div>
      <a class="button button--light" href="#visit">View visiting information</a>
    </section>
  </main>

  <footer class="site-footer" id="contact-details">
    <a class="site-brand site-brand--footer" href="#top">
      <span class="site-brand__mark" aria-hidden="true">N</span>
      <span>Northside Garden</span>
    </a>
    <p>A shared growing space for the neighborhood.</p>
    <a class="site-footer__top" href="#top">Back to top</a>
  </footer>
</body>
</html>
~~~

### styles.css

~~~css
:root {
  color-scheme: light;
  --color-ink: #20362a;
  --color-muted: #506354;
  --color-paper: #f7f8f3;
  --color-surface: #fff;
  --color-tint: #edf3e9;
  --color-line: #d1ddcf;
  --color-green: #245f3b;
  --color-green-dark: #19492d;
  --color-yellow: #f0c86a;
  --content-width: 72rem;
  --space-section: 5rem;
  --radius-card: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--color-paper);
  color: var(--color-ink);
  font-synthesis: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  background: var(--color-paper);
  color: var(--color-ink);
  line-height: 1.6;
}

a {
  color: inherit;
}

a:focus-visible {
  outline: 3px solid #8a4c00;
  outline-offset: 4px;
}

.skip-link {
  position: absolute;
  z-index: 10;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.65rem 0.9rem;
  transform: translateY(-150%);
  border-radius: 0.5rem;
  background: var(--color-ink);
  color: #fff;
  font-weight: 700;
}

.skip-link:focus {
  transform: translateY(0);
}

.site-header,
.site-main,
.site-footer {
  width: min(100% - 2rem, var(--content-width));
  margin-inline: auto;
}

.site-header {
  display: flex;
  min-height: 5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--color-line);
}

.site-brand {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.65rem;
  color: var(--color-ink);
  font-size: 1.05rem;
  font-weight: 800;
  text-decoration: none;
}

.site-brand__mark {
  display: grid;
  width: 2.35rem;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  background: var(--color-green);
  color: #fff;
  font-size: 1rem;
}

.site-nav__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem 1.1rem;
  list-style: none;
}

.site-nav a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--color-ink);
  font-size: 0.94rem;
  font-weight: 700;
  text-decoration: none;
  text-underline-offset: 0.2em;
}

.site-nav a:hover {
  text-decoration: underline;
}

.site-nav .site-nav__action {
  padding-inline: 0.9rem;
  border-radius: 999px;
  background: var(--color-green);
  color: #fff;
}

.site-nav .site-nav__action:hover {
  background: var(--color-green-dark);
  text-decoration: none;
}

.hero {
  display: grid;
  align-items: center;
  gap: 2.5rem;
  padding-block: clamp(3.5rem, 8vw, 6.5rem);
}

.hero__content {
  max-width: 42rem;
}

.eyebrow {
  margin-bottom: 0.8rem;
  color: var(--color-green-dark);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 17ch;
  font-size: clamp(2.5rem, 7vw, 5.4rem);
  line-height: 0.99;
  letter-spacing: -0.045em;
}

.hero__summary {
  max-width: 58ch;
  margin-top: 1.4rem;
  color: var(--color-muted);
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.6rem;
}

.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.1rem;
  border: 2px solid transparent;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button--primary {
  background: var(--color-green);
  color: #fff;
}

.button--primary:hover {
  background: var(--color-green-dark);
}

.button--secondary {
  border-color: var(--color-green);
  color: var(--color-green-dark);
}

.button--secondary:hover {
  background: var(--color-tint);
}

.hero-art {
  position: relative;
  min-height: 19rem;
  overflow: hidden;
  border-radius: 48% 48% 1.5rem 1.5rem;
  background: linear-gradient(155deg, #dcebd9 0%, #b7d2b1 100%);
}

.hero-art__sun {
  position: absolute;
  top: 12%;
  right: 17%;
  width: 4.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-yellow);
}

.hero-art__hill {
  position: absolute;
  right: -8%;
  bottom: -25%;
  left: -8%;
  height: 65%;
  border-radius: 50% 50% 0 0;
}

.hero-art__hill--back {
  bottom: -30%;
  background: #85aa77;
  transform: rotate(-8deg);
}

.hero-art__hill--front {
  bottom: -38%;
  left: 18%;
  background: #47734a;
  transform: rotate(8deg);
}

.hero-art__plant {
  position: absolute;
  z-index: 1;
  bottom: 18%;
  left: 34%;
  width: 0.55rem;
  height: 6.5rem;
  border-radius: 999px;
  background: #294f35;
  transform: rotate(-7deg);
}

.hero-art__plant::before,
.hero-art__plant::after {
  position: absolute;
  width: 2.5rem;
  height: 1.25rem;
  border-radius: 100% 0 100% 0;
  background: #356b40;
  content: "";
}

.hero-art__plant::before {
  top: 1.4rem;
  left: -1.9rem;
  transform: rotate(18deg);
}

.hero-art__plant::after {
  top: 2.5rem;
  left: 0.1rem;
  transform: rotate(72deg);
}

.hero-art__plant--two {
  bottom: 15%;
  left: 62%;
  height: 5rem;
  transform: rotate(8deg) scale(0.82);
}

.content-section {
  padding-block: var(--space-section);
  border-top: 1px solid var(--color-line);
}

.content-section--tinted {
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: 1rem;
  background: var(--color-tint);
}

.section-intro {
  max-width: 45rem;
  margin-bottom: 1.75rem;
}

.section-intro h2,
.visit-section h2,
.join-section h2 {
  max-width: 24ch;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.section-intro > p:last-child {
  max-width: 62ch;
  margin-top: 0.8rem;
  color: var(--color-muted);
}

.values-grid,
.program-grid,
.event-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  list-style: none;
}

.value-card,
.program-card,
.event-card {
  padding: 1.35rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-surface);
}

.value-card__number {
  display: inline-grid;
  width: 2.5rem;
  aspect-ratio: 1;
  place-items: center;
  margin-bottom: 1rem;
  border-radius: 50%;
  background: #e5efdf;
  color: var(--color-green-dark);
  font-size: 0.82rem;
  font-weight: 800;
}

.value-card h3,
.program-card h3,
.event-card h3 {
  margin-bottom: 0.55rem;
  font-size: 1.2rem;
  line-height: 1.25;
}

.value-card p,
.program-card p,
.event-card p {
  color: var(--color-muted);
}

.program-card a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  margin-top: 0.85rem;
  color: var(--color-green-dark);
  font-weight: 800;
  text-underline-offset: 0.2em;
}

.program-card a:hover {
  text-decoration-thickness: 2px;
}

.section-intro--row {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1rem 2rem;
  max-width: none;
}

.section-intro--row > p {
  max-width: 34ch;
  margin: 0;
  color: var(--color-muted);
}

.event-card__schedule {
  margin-bottom: 0.7rem;
  color: var(--color-green-dark) !important;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.visit-section {
  display: grid;
  gap: 2rem;
  padding-block: var(--space-section);
  border-top: 1px solid var(--color-line);
}

.visit-section__summary {
  max-width: 50ch;
  margin-top: 0.9rem;
  color: var(--color-muted);
}

.text-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  margin-top: 0.8rem;
  color: var(--color-green-dark);
  font-weight: 800;
  text-underline-offset: 0.2em;
}

.visit-details {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-surface);
}

.visit-details dt {
  color: var(--color-green-dark);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.visit-details dd {
  margin-top: 0.25rem;
}

.join-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: var(--space-section);
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: 1.25rem;
  background: var(--color-green-dark);
  color: #fff;
}

.join-section .eyebrow {
  color: #d8e8d1;
}

.join-section > div > p:last-child {
  max-width: 55ch;
  margin-top: 0.8rem;
  color: #edf5e9;
}

.button--light {
  flex: 0 0 auto;
  background: #fff;
  color: var(--color-green-dark);
}

.button--light:hover {
  background: #e5efdf;
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.5rem 2.5rem;
  border-top: 1px solid var(--color-line);
  color: var(--color-muted);
  font-size: 0.9rem;
}

.site-brand--footer {
  color: var(--color-ink);
}

.site-footer__top {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--color-green-dark);
  font-weight: 800;
  text-underline-offset: 0.2em;
}

@media (min-width: 42rem) {
  .values-grid,
  .program-grid,
  .event-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .visit-section {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
}

@media (min-width: 64rem) {
  .hero {
    grid-template-columns: minmax(0, 1.1fr) minmax(20rem, 0.9fr);
  }

  .values-grid,
  .program-grid,
  .event-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 42rem) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .site-nav__list {
    justify-content: flex-start;
    gap: 0.2rem 0.85rem;
  }

  .content-section--tinted {
    padding-inline: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
~~~

## Expected output

The finished page has a green brand, a large opening message, a decorative garden illustration made from CSS shapes, program cards, a recurring events list, visit details, a membership call to action, and a footer.

At narrow widths, the header navigation wraps and the card sections use one column. At medium widths, card groups use two columns. At wide widths, the hero and card groups can use wider layouts. All primary navigation and action links jump to matching sections on the same page.

## How the structure supports the design

- The skip link gives keyboard users a direct route to the main content.
- The header contains the site identity and a labeled primary navigation region.
- The main page has one `h1`, followed by sections with headings that describe their content.
- Repeated programs and events are grouped into lists and articles.
- Visit details use a description list to associate labels with values.
- The hero illustration is decorative, so its container is hidden from assistive technology.
- The navigation and action controls are real links because they move to page locations.

## How the CSS is organized

1. **Design tokens:** The `:root` properties hold recurring colors, widths, spacing, and radii.
2. **Base rules:** The box sizing reset, typography, links, and skip link establish shared behavior.
3. **Components:** Header, hero, cards, visit details, call to action, and footer each have related styles.
4. **Responsive changes:** Media queries add columns when the content has room and stack the header when it needs to wrap.
5. **User preference:** Reduced-motion rules remove smooth scrolling and shorten decorative transitions.

The breakpoint values are starting points for this content. Resize the page and adjust them if the navigation or cards become cramped earlier or later.

## Review the project

- Use the keyboard to activate the skip link and move through navigation.
- Confirm each navigation link reaches the correct section.
- Check visible focus indicators on navigation, cards, and action links.
- Test narrow and wide viewports, including a width near each breakpoint.
- Increase zoom and check that text, cards, and navigation can grow without clipping.
- Enable reduced motion and confirm smooth scrolling and transitions are reduced.
- Review color contrast and confirm link labels explain their destination.
- Read the page outline and verify the headings describe their sections.
- Replace fictional garden details with accurate content before using the design for a real organization.

## Try it yourself

1. Change the project brief to a local event and update the content outline before changing the CSS.
2. Add one new program card and check how the grid adapts.
3. Add a long event title and confirm it wraps without overflowing.
4. Add a secondary navigation region and give it a distinct accessible label.
5. Change a design token and identify every component that uses it.
6. Remove the decorative hero art locally and decide whether any information was lost.
7. Test the page at narrow width with a keyboard and increased zoom.
8. Compare the finished page to the project brief and list any remaining work.

## Chapter navigation

| Previous chapter | Lesson | Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [67 - CSS performance](../lessons/67-css-performance.md) | [Lesson](../lessons/68-practical-page-projects.md) | [Q&A](../qnas/68-practical-page-projects.md) | [69 - CSS reference and glossary](../lessons/69-css-reference-and-glossary.md) |