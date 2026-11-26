# 24 - Overflow and Scrolling: Example

## Goal

Compare `visible` `overflow`, clipping, and scrolling, then try an accessible nested scroller and a wide table region. This is a complete HTML page with its CSS included.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Overflow and Scrolling</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    :root {
      color: #172033;
      background: #f1f5f9;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    body {
      width: min(100% - 2rem, 70rem);
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
      margin-bottom: 0.5rem;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.1;
    }

    h2 {
      margin-bottom: 0.75rem;
      font-size: 1.5rem;
    }

    h3 {
      margin-bottom: 0.4rem;
      font-size: 1.05rem;
    }

    p + p {
      margin-top: 0.75rem;
    }

    a {
      color: #1d4ed8;
    }

    a:focus-visible,
    .scroll-panel:focus-visible,
    .table-region:focus-visible {
      outline: 3px solid #f97316;
      outline-offset: 3px;
    }

    .intro {
      max-width: 68ch;
      margin-bottom: 1.25rem;
      color: #475569;
      font-size: 1.1rem;
    }

    .jump-link {
      display: inline-block;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .section {
      margin-block: 2rem;
      padding: 1.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #fff;
      box-shadow: 0 0.4rem 1.5rem rgb(15 23 42 / 6%);
    }

    .section > p {
      margin-bottom: 1rem;
      color: #475569;
    }

    .value-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
      gap: 1rem;
    }

    .value-card {
      min-block-size: 15rem;
      padding: 0.85rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.6rem;
      background: #f8fafc;
    }

    .value-card > p {
      min-block-size: 2.8rem;
      margin-bottom: 0.5rem;
      color: #475569;
      font-size: 0.85rem;
    }

    .window {
      block-size: 7rem;
      padding: 0.7rem;
      border: 2px solid #64748b;
      border-radius: 0.4rem;
      background: #fff;
    }

    .window-content p + p {
      margin-top: 0.6rem;
    }

    .window--visible {
      overflow: visible;
      border-color: #0f766e;
    }

    .window--hidden {
      overflow: hidden;
      border-color: #b91c1c;
    }

    .window--clip {
      overflow: clip;
      border-color: #7c3aed;
    }

    .window--scroll {
      overflow: scroll;
      border-color: #c2410c;
    }

    .window--auto {
      overflow: auto;
      border-color: #1d4ed8;
    }

    .scroll-layout {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);
      gap: 1rem;
      align-items: start;
    }

    .scroll-panel {
      max-block-size: 15rem;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-gutter: stable;
      padding: 1rem;
      border: 2px solid #0f766e;
      border-radius: 0.6rem;
      background: #ecfeff;
    }

    .scroll-panel p + p {
      margin-top: 1rem;
    }

    .side-note {
      padding: 1rem;
      border-inline-start: 4px solid #1d4ed8;
      background: #eff6ff;
    }

    .side-note p + p {
      margin-top: 0.75rem;
    }

    .table-region {
      max-inline-size: 100%;
      overflow-x: auto;
      scrollbar-gutter: stable;
      border: 1px solid #94a3b8;
      border-radius: 0.4rem;
    }

    table {
      inline-size: 100%;
      min-inline-size: 38rem;
      border-collapse: collapse;
      background: #fff;
    }

    th,
    td {
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      text-align: start;
    }

    th {
      background: #dbeafe;
    }

    code {
      padding: 0.1em 0.3em;
      border-radius: 0.25rem;
      background: #e2e8f0;
      font-family: Consolas, monospace;
    }

    .print-note {
      padding: 1rem;
      border: 1px dashed #64748b;
      background: #f8fafc;
    }

    .print-note h2 {
      font-size: 1.25rem;
    }

    @media (max-width: 44rem) {
      .scroll-layout {
        grid-template-columns: 1fr;
      }

      .section {
        padding: 1rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
    }

    @media print {
      body {
        width: auto;
        padding: 0;
      }

      .section,
      .scroll-panel,
      .table-region {
        max-block-size: none;
        overflow: visible;
        box-shadow: none;
      }

      .table-region {
        overflow: visible;
      }

      table {
        min-inline-size: 0;
      }

      .jump-link {
        display: none;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Overflow and Scrolling</h1>
    <p class="intro">
      Each small panel contains more text than its fixed height can show. Compare
      what each overflow value does, then scroll the nested regions using a pointer
      or keyboard.
    </p>
    <a class="jump-link" href="#print-notes">Jump to the print notes</a>
  </header>

  <main>
    <section class="section" aria-labelledby="values-title">
      <h2 id="values-title">1. Compare the overflow values</h2>
      <p>
        The visible sample lets text paint outside the box. Hidden and clip cut it
        off. Scroll and auto create scroll containers.
      </p>

      <div class="value-grid">
        <article class="value-card">
          <h3>visible</h3>
          <p>Content paints outside the box and is not scrollable here.</p>
          <div class="window window--visible">
            <div class="window-content">
              <p>First line inside the visible window.</p>
              <p>This text continues past the bottom edge.</p>
              <p>The parent card has extra room below.</p>
            </div>
          </div>
        </article>

        <article class="value-card">
          <h3>hidden</h3>
          <p>Content is clipped. Script can still scroll the container.</p>
          <div class="window window--hidden">
            <div class="window-content">
              <p>First line inside the hidden window.</p>
              <p>This text is clipped at the padding box.</p>
              <p>More content exists outside the visible area.</p>
            </div>
          </div>
        </article>

        <article class="value-card">
          <h3>clip</h3>
          <p>Content is clipped, and scrolling is not allowed.</p>
          <div class="window window--clip">
            <div class="window-content">
              <p>First line inside the clipped window.</p>
              <p>This text is clipped at the overflow clip edge.</p>
              <p>The content cannot be scrolled into view.</p>
            </div>
          </div>
        </article>

        <article class="value-card">
          <h3>scroll</h3>
          <p>A scroll container is created even if content fits.</p>
          <div class="window window--scroll" tabindex="0" role="region" aria-label="Always-scrollable sample">
            <div class="window-content">
              <p>First line inside the scroll window.</p>
              <p>Use the scrollbar or keyboard to move this content.</p>
              <p>Continue scrolling to read the last line.</p>
            </div>
          </div>
        </article>

        <article class="value-card">
          <h3>auto</h3>
          <p>Scrolling is available when content overflows.</p>
          <div class="window window--auto" tabindex="0" role="region" aria-label="Auto-scroll sample">
            <div class="window-content">
              <p>First line inside the auto window.</p>
              <p>This content is taller than the available space.</p>
              <p>Scroll to reveal the last line.</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="nested-title">
      <h2 id="nested-title">2. A nested scroll container</h2>
      <p>
        This bounded panel scrolls independently. Its overscroll behavior prevents
        a scroll gesture at the panel boundary from chaining to an ancestor.
      </p>

      <div class="scroll-layout">
        <div class="scroll-panel" tabindex="0" role="region" aria-label="Scrollable message history">
          <p><strong>Message 1:</strong> The panel has a maximum block size and overflow-y set to auto.</p>
          <p><strong>Message 2:</strong> Its padding box acts as the scrollport.</p>
          <p><strong>Message 3:</strong> Scroll this region without moving the page.</p>
          <p><strong>Message 4:</strong> scrollbar-gutter reserves space where classic scrollbars need room.</p>
          <p><strong>Message 5:</strong> overscroll-behavior contain stops scroll chaining at the panel boundary.</p>
          <p><strong>Message 6:</strong> Keep the focus outline visible so keyboard users can locate this region.</p>
          <p><strong>Message 7:</strong> This last message appears after scrolling down.</p>
        </div>

        <aside class="side-note">
          <h3>Try the keyboard</h3>
          <p>Use Tab to focus the panel, then use the arrow keys or Page Down to scroll it.</p>
          <p>The page itself remains in the same position while the focused panel scrolls.</p>
        </aside>
      </div>
    </section>

    <section class="section" aria-labelledby="wide-title">
      <h2 id="wide-title">3. A wide table with local horizontal scrolling</h2>
      <p>
        The region below owns its horizontal overflow. The rest of the document
        stays within the viewport.
      </p>

      <div class="table-region" tabindex="0" role="region" aria-label="Scrollable browser support table">
        <table>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">What to inspect</th>
              <th scope="col">Expected behavior</th>
              <th scope="col">Why it matters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">overflow: auto</th>
              <td>Scroll when content exceeds the available area</td>
              <td>Content remains reachable</td>
              <td>No page-wide clipping is needed</td>
            </tr>
            <tr>
              <th scope="row">overflow: clip</th>
              <td>Clip without creating a scroll container</td>
              <td>Hidden overflow cannot be scrolled into view</td>
              <td>Use only when clipping is intended</td>
            </tr>
            <tr>
              <th scope="row">overscroll-behavior</th>
              <td>Boundary behavior in nested scrollers</td>
              <td>Scroll chaining can be controlled</td>
              <td>Use selectively to preserve expected page movement</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="print-note" id="print-notes" aria-labelledby="print-title">
      <h2 id="print-title">4. Print behavior</h2>
      <p>
        The print rule removes the height limit and clipping from the example
        scroll regions so their content can be printed. Use the browser print
        preview to compare screen and print layouts.
      </p>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

- Five small panels compare `visible`, `hidden`, `clip`, scroll, and `auto`.
- Text extends outside the `visible` panel for `visible`, is cut off for `hidden` and `clip`, and can be scrolled inside the scroll and `auto` panels.
- The message history has its own vertical scrolling area. It can be focused with the keyboard and does not pass scrolling to the page at its boundary.
- The wide table scrolls horizontally inside its labeled region instead of widening the whole page.
- The print notes remain at the end of the page. Print preview expands the scrolling regions so their content can be read on paper.

## Explanation

Each value sample has a fixed block size and longer content. `visible` paints beyond the box. `hidden` and `clip` both `clip` what is `visible`, but only `hidden` creates a scroll container that can be moved programmatically. scroll always provides a scrolling mechanism where the browser shows one; `auto` allows scrolling when needed.

The message history has a maximum block size, ``overflow`-y`: `auto`, and `overscroll-behavior`: contain. It becomes a nested scroll container with its own `scrollport`. `tabindex` makes the region keyboard-focusable, and the accessible name describes what the region contains.

The table's wrapper uses ``overflow`-x`: `auto` and a table with a minimum inline size. This confines horizontal scrolling to the table region. The page itself does not need `overflow` `hidden`, which could otherwise cut off unrelated content.

`scrollbar-gutter`: stable reserves room for classic scrollbars. The smooth page jump uses `scroll-behavior`: smooth, while the reduced-motion rule restores automatic scrolling for visitors who request less motion. The print rule removes the scroll limits and reveals content for static output.

## Key points

- `visible`, `hidden`, `clip`, scroll, and `auto` have different clipping and scrolling behavior.
- `hidden` still allows programmatic scrolling; `clip` does not allow scrolling.
- A bounded scroll container shows only part of its scrollable area through its `scrollport`.
- Focusable, named scroll regions are easier to use with a keyboard and assistive technology.
- Keep horizontal `overflow` local to the component that needs it.
- Respect reduced-motion preferences when using smooth scrolling.
- Print styles should reveal important content that would otherwise require scrolling.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [23 - Z-index and Stacking Contexts](23-z-index-and-stacking-contexts.md) | [Lesson](../lessons/24-overflow-and-scrolling.md) | [Q&A](../qnas/24-overflow-and-scrolling.md) | [25 - Floats and Clearing](25-floats-and-clear.md) |
