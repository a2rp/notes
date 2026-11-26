# 38 - Styling links and link states - Example

This example builds a small guide page with in-page links. It styles normal and visited links, pointer hover, keyboard focus, pointer activation, and the section selected by a URL fragment. The page uses only local fragment links, so it does not depend on external sites.

## Question

Create a page about a weekend workshop that:

- Provides clear links to sections in the same page.
- Keeps links recognizable with descriptive text and underlines.
- Shows distinct hover and keyboard focus feedback.
- Includes a brief active state while a link is being activated.
- Highlights the section that matches the current URL fragment.
- Uses semantic headings, navigation, and sections.

## Complete HTML

Copy the code into an HTML file and open it in a browser. The code is displayed here for learning and is not run by this repository.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Styling Links and Link States</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      color-scheme: light;
      --ink: #1b2939;
      --muted: #536478;
      --paper: #f2f6fa;
      --surface: #ffffff;
      --line: #d5e0e9;
      --link: #075b9b;
      --visited: #6741a5;
      --hover-surface: #e8f3fb;
      --focus: #b33d18;
      --target-surface: #fff4ce;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      min-width: 320px;
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      color: var(--ink);
      background-color: var(--paper);
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      font-size: 1rem;
      line-height: 1.65;
    }

    .page {
      width: min(100%, 920px);
      margin-inline: auto;
    }

    .site-header,
    .content-card {
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
    }

    .site-header {
      padding: clamp(1.25rem, 4vw, 2.5rem);
      background-image: linear-gradient(135deg, #e7f2fb, #ffffff 70%);
    }

    .eyebrow {
      color: var(--muted);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    h1 {
      margin-top: 0.4rem;
      font-size: clamp(2rem, 6vw, 3.4rem);
    }

    h2 {
      font-size: clamp(1.35rem, 4vw, 1.8rem);
    }

    p {
      max-width: 68ch;
    }

    .intro {
      margin-top: 0.85rem;
      color: var(--muted);
    }

    .site-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem 1.25rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--line);
    }

    .content-card {
      margin-top: 1.25rem;
      padding: clamp(1.25rem, 4vw, 2rem);
    }

    .content-card > p {
      margin-top: 0.8rem;
    }

    .content-card section {
      margin-top: 1.75rem;
      padding: 1rem;
      border: 2px solid transparent;
      border-radius: 0.75rem;
      scroll-margin-top: 1rem;
      transition: background-color 160ms ease, border-color 160ms ease;
    }

    .content-card section:first-child {
      margin-top: 0;
    }

    .content-card section p {
      margin-top: 0.55rem;
    }

    .link-list {
      margin-top: 0.6rem;
      padding-left: 1.35rem;
    }

    .link-list li + li {
      margin-top: 0.45rem;
    }

    a:link {
      color: var(--link);
      text-decoration-line: underline;
      text-decoration-thickness: 0.08em;
      text-underline-offset: 0.18em;
    }

    a:visited {
      color: var(--visited);
    }

    a:hover {
      color: #083d65;
      background-color: var(--hover-surface);
      text-decoration-thickness: 0.16em;
    }

    a:focus-visible {
      border-radius: 0.15rem;
      outline: 3px solid var(--focus);
      outline-offset: 3px;
    }

    a:active {
      color: #a33125;
    }

    .content-card section:target {
      border-color: #d7a920;
      background-color: var(--target-surface);
    }

    .page-footer {
      margin-top: 1rem;
      color: var(--muted);
      font-size: 0.9rem;
      text-align: center;
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }

      .content-card section {
        transition: none;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="site-header">
      <p class="eyebrow">A short learning guide</p>
      <h1>Weekend Web Workshop</h1>
      <p class="intro">
        Use the links below to move around this page. Each link describes the
        section it opens, and the selected section receives a highlight.
      </p>

      <nav class="site-nav" aria-label="Workshop sections">
        <a href="#overview">Workshop overview</a>
        <a href="#schedule">View the schedule</a>
        <a href="#resources">Open the practice resources</a>
      </nav>
    </header>

    <main class="content-card">
      <section id="overview">
        <h2>Workshop overview</h2>
        <p>
          This two-day workshop introduces page structure, links, and visual
          styling. Start with the schedule or jump directly to the practice
          resources.
        </p>
        <p><a href="#schedule">See the Saturday and Sunday schedule</a></p>
      </section>

      <section id="schedule">
        <h2>Schedule</h2>
        <p>Saturday covers page structure. Sunday focuses on styling and review.</p>
        <ul class="link-list">
          <li><a href="#resources">Go to the practice resources</a></li>
          <li><a href="#contact">Find the contact details</a></li>
        </ul>
      </section>

      <section id="resources">
        <h2>Practice resources</h2>
        <p>
          Try changing the link colors and underline thickness in the CSS.
          Then use the Tab key to move through the links and notice the focus
          outline.
        </p>
        <p><a href="#overview">Return to the workshop overview</a></p>
      </section>

      <section id="contact">
        <h2>Contact details</h2>
        <p>
          The workshop team is available during the scheduled sessions. Return
          to the <a href="#schedule">schedule section</a> to review the times.
        </p>
      </section>
    </main>

    <footer class="page-footer">
      <p>Practice navigating with a pointer and with the keyboard.</p>
    </footer>
  </div>
</body>
</html>
~~~

## Explanation

- The navigation and text links are anchors with fragment destinations such as `href="#schedule"`.
- Each fragment destination matches the `id` of a section, so activating a link navigates within the page.
- The base `a:link` rule gives hyperlinks a clear color and underline. The underline keeps them recognizable without color alone.
- `a:visited` adds a visited color. Browsers may restrict this styling for privacy, so the exact appearance depends on browser history and browser settings.
- `a:hover` changes the link while a pointing device is over it. The links remain recognizable before hover.
- `a:focus-visible` draws an outline for focus when the browser decides the focus indicator should be visible. Use Tab to move focus through the links.
- `a:active` changes the color briefly while a link is being activated. This state can be easy to miss because activation is short.
- `section:target` highlights the section whose `id` matches the current URL fragment.
- The state rules appear in a deliberate order because several states can match at once. Other declarations and selector specificity can still affect the final cascade.
- The reduced-motion media query disables smooth scrolling and the section transition for visitors who request less motion.

## Expected output

The page shows a workshop heading, a row of section links, and four content sections. Selecting a navigation link moves to its matching section and highlights that section with a pale yellow background and border. Hovering a link thickens its underline. Keyboard focus receives a distinct outline. Pressing a link may briefly show the active color. Visited links may appear purple depending on browser history and privacy behavior.

## Try it yourself

1. Use Tab and Shift+Tab to move through every link and inspect the focus outline.
2. Follow a section link, then check which section is highlighted.
3. Change `--visited` and observe that the browser may limit visited-link styling.
4. Temporarily remove the underline and consider whether each link remains recognizable without color.
5. Change the hover effect and keep a visible focus indicator for keyboard navigation.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [37 - Styling tables](../lessons/37-styling-tables.md) | [Lesson](../lessons/38-styling-links.md) | [Q&A](../qnas/38-styling-links.md) | [39 - Styling forms and controls](../lessons/39-styling-forms-and-controls.md) |