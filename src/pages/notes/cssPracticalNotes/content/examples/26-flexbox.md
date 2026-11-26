# 26 - Flexbox Layout: Example

## Goal

Explore the main and cross axes, wrapping, flexible sizing, alignment, auto margins, and minimum-size behavior. The page also includes a keyboard-focusable scroll region inside a column flex layout. This is a complete HTML page with its CSS included.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Flexbox Layout</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :root {
      color: #172033;
      background: #f1f5f9;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    body {
      width: min(100% - 2rem, 72rem);
      margin-inline: auto;
      padding-block: 2rem 4rem;
    }

    h1,
    h2,
    h3,
    p {
      margin: 0;
    }

    h1 {
      margin-block-end: 0.5rem;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.1;
    }

    h2 {
      margin-block-end: 0.75rem;
      font-size: 1.45rem;
      line-height: 1.2;
    }

    h3 {
      margin-block-end: 0.5rem;
      font-size: 1.05rem;
    }

    p + p {
      margin-block-start: 0.75rem;
    }

    a {
      color: #1d4ed8;
    }

    a:focus-visible,
    .scroll-region:focus-visible {
      outline: 3px solid #ea580c;
      outline-offset: 3px;
    }

    .intro {
      max-inline-size: 68ch;
      margin-block-end: 1.25rem;
      color: #475569;
      font-size: 1.1rem;
    }

    .site-header,
    .section {
      padding: clamp(1rem, 3vw, 1.5rem);
      border: 1px solid #cbd5e1;
      border-radius: 0.8rem;
      background: #fff;
      box-shadow: 0 0.4rem 1.5rem rgb(15 23 42 / 6%);
    }

    .site-header {
      margin-block-end: 1.5rem;
    }

    .navigation {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1rem;
      margin-block-start: 1rem;
      padding-block-start: 1rem;
      border-block-start: 1px solid #dbe3ef;
    }

    .navigation a {
      padding: 0.35rem 0.55rem;
      border-radius: 0.35rem;
      font-weight: 700;
    }

    .navigation__account {
      margin-inline-start: auto;
    }

    .section {
      margin-block: 1.5rem;
    }

    .section-intro {
      margin-block-end: 1rem;
      color: #475569;
    }

    .demo-box {
      padding: 1rem;
      border: 1px solid #dbe3ef;
      border-radius: 0.65rem;
      background: #f8fafc;
    }

    .demo-box + .demo-box {
      margin-block-start: 1rem;
    }

    .profile-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      display: grid;
      flex: 0 0 4.5rem;
      aspect-ratio: 1;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: linear-gradient(145deg, #0f766e, #155e75);
      font-size: 1.35rem;
      font-weight: 800;
    }

    .profile-copy {
      min-inline-size: 0;
    }

    .profile-copy p {
      color: #475569;
    }

    .center-demo {
      display: flex;
      min-block-size: 13rem;
      justify-content: center;
      align-items: center;
      border: 1px dashed #94a3b8;
      border-radius: 0.65rem;
      background:
        linear-gradient(135deg, rgb(219 234 254 / 72%), rgb(204 251 241 / 72%));
    }

    .center-message {
      max-inline-size: 22rem;
      padding: 1rem 1.25rem;
      border: 1px solid #99f6e4;
      border-radius: 0.65rem;
      background: #fff;
      text-align: center;
      box-shadow: 0 0.35rem 1.2rem rgb(15 23 42 / 8%);
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tag {
      padding: 0.4rem 0.75rem;
      border: 1px solid #bae6fd;
      border-radius: 999px;
      color: #075985;
      background: #e0f2fe;
      font-weight: 700;
    }

    .card-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .card {
      flex: 1 1 14rem;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.65rem;
      background: #fff;
    }

    .card p {
      color: #475569;
    }

    .card__action {
      display: inline-block;
      margin-block-start: 0.75rem;
      font-weight: 700;
    }

    .space-between {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem 1rem;
      padding: 1rem;
      border-radius: 0.65rem;
      color: #fff;
      background: #1e3a8a;
    }

    .space-between strong {
      margin-inline-end: auto;
    }

    .size-row {
      display: flex;
      gap: 0.75rem;
    }

    .size-row__label {
      flex: 0 0 7rem;
      padding: 0.8rem;
      border-radius: 0.5rem;
      color: #fff;
      background: #155e75;
      font-weight: 700;
    }

    .size-row__content {
      flex: 1 1 0;
      min-inline-size: 0;
      overflow-wrap: anywhere;
      padding: 0.8rem;
      border-radius: 0.5rem;
      background: #e0f2fe;
    }

    .column-panel {
      display: flex;
      flex-direction: column;
      block-size: 18rem;
      border: 1px solid #94a3b8;
      border-radius: 0.65rem;
      background: #fff;
    }

    .column-panel__header,
    .column-panel__footer {
      flex: 0 0 auto;
      padding: 0.8rem 1rem;
      color: #fff;
      background: #334155;
    }

    .column-panel__header {
      border-radius: 0.6rem 0.6rem 0 0;
    }

    .column-panel__content {
      min-block-size: 0;
      overflow: auto;
      padding: 1rem;
    }

    .scroll-region:focus-visible {
      outline-offset: -4px;
    }

    .message {
      padding-block: 0.6rem;
      border-block-end: 1px solid #e2e8f0;
    }

    .column-panel__footer {
      border-radius: 0 0 0.6rem 0.6rem;
      background: #0f766e;
    }

    .takeaway {
      padding-inline-start: 1.25rem;
    }

    .takeaway li + li {
      margin-block-start: 0.4rem;
    }

    @media (max-width: 38rem) {
      .navigation__account {
        margin-inline-start: 0;
      }

      .profile-row {
        align-items: flex-start;
      }

      .size-row {
        flex-direction: column;
      }

      .size-row__label {
        flex-basis: auto;
      }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <h1>Flexbox layout</h1>
    <p class="intro">Flexbox arranges a group of items along a main axis. Resize the page and compare how each example handles available space.</p>

    <nav class="navigation" aria-label="Example navigation">
      <a href="#profile">Profile</a>
      <a href="#cards">Cards</a>
      <a href="#sizing">Sizing</a>
      <a class="navigation__account" href="#scroll-panel">Activity panel</a>
    </nav>
  </header>

  <main>
    <section class="section" id="profile" aria-labelledby="profile-title">
      <h2 id="profile-title">1. Align items in a row</h2>
      <p class="section-intro">The avatar has a fixed flex basis. The text item can shrink, and align-items centers both items on the cross axis.</p>
      <div class="demo-box">
        <div class="profile-row">
          <div class="avatar" aria-hidden="true">AR</div>
          <div class="profile-copy">
            <h3>Alex Rivera</h3>
            <p>Frontend developer learning practical CSS layouts.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="center-title">
      <h2 id="center-title">2. Center on both axes</h2>
      <p class="section-intro">justify-content centers the message on the main axis. align-items centers it on the cross axis.</p>
      <div class="center-demo">
        <div class="center-message">
          <h3>Ready when you are</h3>
          <p>This box is centered inside its flex container.</p>
        </div>
      </div>
    </section>

    <section class="section" id="cards" aria-labelledby="cards-title">
      <h2 id="cards-title">3. Wrap items and share space</h2>
      <p class="section-intro">Tags wrap to new lines. The cards can grow and shrink from a 14rem basis, while gap sets the space between them.</p>

      <div class="demo-box">
        <ul class="tag-list" aria-label="Topics">
          <li class="tag">Layout</li>
          <li class="tag">Accessibility</li>
          <li class="tag">Responsive design</li>
          <li class="tag">Typography</li>
          <li class="tag">Components</li>
          <li class="tag">Animation</li>
          <li class="tag">Color</li>
        </ul>
      </div>

      <div class="card-grid demo-box">
        <article class="card">
          <h3>Plan</h3>
          <p>Choose a goal and split it into a few clear steps.</p>
          <a class="card__action" href="#sizing">See the sizing example</a>
        </article>
        <article class="card">
          <h3>Build</h3>
          <p>Use a flexible basis and let the available space guide the result.</p>
          <a class="card__action" href="#scroll-panel">Open the panel example</a>
        </article>
        <article class="card">
          <h3>Review</h3>
          <p>Check the layout at a narrow width and with longer text.</p>
          <a class="card__action" href="#summary">Review key points</a>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="spacing-title">
      <h2 id="spacing-title">4. Distribute free space</h2>
      <p class="section-intro">The auto margin pushes the action to the inline-end side. justify-content is not needed to create this separation.</p>
      <div class="space-between">
        <strong>Workspace</strong>
        <span>Projects</span>
        <span>Settings</span>
        <span>Account</span>
      </div>
    </section>

    <section class="section" id="sizing" aria-labelledby="sizing-title">
      <h2 id="sizing-title">5. Allow a flex item to shrink</h2>
      <p class="section-intro">The main item uses min-inline-size: 0 and overflow-wrap: anywhere so the long token cannot force the row wider.</p>
      <div class="demo-box">
        <div class="size-row">
          <div class="size-row__label">Sidebar</div>
          <div class="size-row__content">Main content: this-is-a-very-long-unbroken-example-token-that-would-otherwise-push-a-flex-item-wider-than-its-container</div>
        </div>
      </div>
    </section>

    <section class="section" id="scroll-panel" aria-labelledby="panel-title">
      <h2 id="panel-title">6. Scroll within a column layout</h2>
      <p class="section-intro">The panel has a fixed block size. Its content region can shrink and scroll while the header and footer remain in the column.</p>
      <div class="column-panel">
        <div class="column-panel__header">Recent activity</div>
        <div class="column-panel__content scroll-region" role="region" aria-label="Recent activity messages" tabindex="0">
          <p class="message">A new project was created.</p>
          <p class="message">The team updated the design notes.</p>
          <p class="message">A layout review is ready.</p>
          <p class="message">The navigation links were checked.</p>
          <p class="message">A new comment was added.</p>
          <p class="message">The card spacing was adjusted.</p>
          <p class="message">The responsive view was reviewed.</p>
          <p class="message">A draft was saved.</p>
          <p class="message">The activity panel is still scrollable.</p>
        </div>
        <div class="column-panel__footer">End of panel</div>
      </div>
    </section>

    <section class="section" id="summary" aria-labelledby="summary-title">
      <h2 id="summary-title">What to notice</h2>
      <ul class="takeaway">
        <li>The profile row uses align-items to center items on its cross axis.</li>
        <li>The centered message uses justify-content and align-items on different axes.</li>
        <li>Tags wrap, and cards share space from their flex basis.</li>
        <li>The account action is pushed to the end by an auto margin.</li>
        <li>The long token wraps instead of forcing the sizing row wider.</li>
        <li>The panel content scrolls while its header and footer stay visible.</li>
      </ul>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

The page has a light background and six bordered sections. The profile example shows a round initials avatar beside a text block. The centered message sits in the middle of a large pale box.

The topic tags wrap when they run out of room. The three cards share available space and move onto additional lines as the page narrows. In the workspace bar, the account action is pushed toward the end side. The sizing row wraps its long token inside the content item rather than widening the page.

The final panel has a fixed height. Its header and footer remain visible while the activity messages scroll inside the middle region. The scroll region can receive keyboard focus and shows a visible focus outline.

## Explanation

The navigation, profile row, and cards use flex containers for one-dimensional groups. The tag list and cards use flex-wrap, so additional flex lines appear when the items no longer fit. The items in each line are laid out independently. gap provides spacing between items without adding outer margins.

In the profile row, the avatar uses a fixed flex basis. The text block has min-inline-size: 0 so its content can shrink inside the available row. The center example uses justify-content for the main axis and align-items for the cross axis.

The workspace action uses margin-inline-start: auto. The auto margin absorbs positive free space before justify-content would distribute it.

In the sizing example, min-inline-size: 0 allows the main item to shrink below its min-content inline size. overflow-wrap: anywhere gives the long token break opportunities. Both are shown because a zero minimum alone does not guarantee that every kind of content will wrap.

The activity panel is a column flex container with a definite block size. Its middle region uses min-block-size: 0 so it can shrink inside the column and overflow: auto to scroll. The region is focusable and has an accessible name for keyboard and assistive technology users.

The small-screen media query lets the navigation wrap naturally and stacks the sizing example. No visual reordering is used, so the source and keyboard order remain meaningful.

## Key points

- Flex containers arrange their in-flow children along a main axis and a cross axis.
- flex-wrap creates additional lines when items do not fit.
- flex-basis is a starting size; grow and shrink factors affect the final size.
- gap adds space between items and lines.
- Auto margins can push a flex item through positive free space.
- min-inline-size: 0 and min-block-size: 0 can help items shrink in bounded layouts.
- A focusable scroll region needs an accessible name and visible focus.
- Keep the HTML source order meaningful when using Flexbox.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [25 - Floats and Clearing](25-floats-and-clear.md) | [Lesson](../lessons/26-flexbox.md) | [Q&A](../qnas/26-flexbox.md) | [27 - CSS Grid Layout](27-css-grid.md) |
