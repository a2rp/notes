# 20 - Display and Box Types: Example

## Goal

Compare block, inline, and inline-block boxes, then see how common display values affect layout and box generation.

Copy the complete HTML into a file named `index.html` and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Display and Box Types</title>
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
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
    }

    p + p {
      margin-top: 0.65rem;
    }

    code,
    pre {
      font-family: Consolas, monospace;
    }

    code {
      padding: 0.1em 0.35em;
      border-radius: 0.25rem;
      background: #e2e8f0;
    }

    pre {
      overflow-x: auto;
      margin-top: 0.75rem;
      padding: 1rem;
      border: 1px solid #334155;
      border-radius: 0.5rem;
      background: #0f172a;
      color: #f8fafc;
    }

    pre code {
      padding: 0;
      background: transparent;
      color: inherit;
    }

    .intro {
      margin-bottom: 2rem;
      color: #475569;
      font-size: 1.1rem;
    }

    .demo-section {
      margin-block: 2rem;
      padding: 1.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #fff;
    }

    .demo-section > p {
      margin-bottom: 1rem;
    }

    .demo-panel {
      padding: 1rem;
      border: 1px dashed #94a3b8;
      border-radius: 0.5rem;
      background: #f8fafc;
    }

    .block-sample {
      margin-block: 0.5rem;
      padding: 0.65rem 0.8rem;
      border: 2px solid #2563eb;
      background: #dbeafe;
    }

    .inline-paragraph {
      padding: 0.5rem;
      border: 1px dashed #94a3b8;
      background: #fff;
    }

    .inline-sample {
      width: 14rem;
      height: 3rem;
      margin-block: 1rem;
      padding: 0.25rem 0.6rem;
      border: 2px solid #0f766e;
      background: #ccfbf1;
      color: #115e59;
    }

    .inline-block-sample {
      display: inline-block;
      width: 8rem;
      min-height: 3rem;
      margin: 0.25rem;
      padding: 0.5rem;
      border: 2px solid #7c3aed;
      border-radius: 0.4rem;
      background: #f5f3ff;
      vertical-align: middle;
    }

    .badge-line {
      padding: 0.75rem;
      border: 1px dashed #94a3b8;
      background: #fff;
    }

    .display-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
      gap: 1rem;
    }

    .display-card {
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      background: #fff;
    }

    .flex-demo {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .flex-demo > span,
    .grid-demo > span {
      padding: 0.5rem 0.75rem;
      border-radius: 0.35rem;
      background: #dbeafe;
    }

    .grid-demo {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem;
    }

    .list-item-sample {
      display: list-item;
      margin: 0.25rem 0 0.25rem 1.5rem;
    }

    .visibility-flow {
      padding: 0.75rem;
      border: 1px dashed #94a3b8;
      background: #fff;
    }

    .flow-label {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      background: #dbeafe;
      color: #1e3a8a;
    }

    .flow-box {
      margin-block: 0.35rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid #0f766e;
      background: #ccfbf1;
    }

    .removed-box {
      display: none;
    }

    .reserved-box {
      visibility: hidden;
    }

    .transparent-box {
      opacity: 0;
    }

    .contents-layout {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
      padding: 0.75rem;
      border: 1px dashed #94a3b8;
      background: #f8fafc;
    }

    .contents-wrapper {
      display: contents;
    }

    .contents-card {
      padding: 0.75rem;
      border: 2px solid #7c3aed;
      border-radius: 0.4rem;
      background: #f5f3ff;
    }

    .anonymous-demo {
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      background: #fff;
    }

    .anonymous-demo p {
      margin-block: 0.5rem;
      padding: 0.5rem;
      background: #e0f2fe;
    }

    .block-link {
      display: block;
      margin-top: 0.75rem;
      padding: 0.65rem 0.85rem;
      border: 1px solid #2563eb;
      border-radius: 0.4rem;
      background: #eff6ff;
      color: #1d4ed8;
      font-weight: 700;
      text-decoration: none;
    }

    .block-link:focus-visible {
      outline: 3px solid #7c3aed;
      outline-offset: 3px;
    }

    .note {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      border-inline-start: 4px solid #d97706;
      background: #fffbeb;
      color: #78350f;
    }

    .practice-list {
      margin-block: 0.75rem 0;
      padding-inline-start: 1.5rem;
    }

    .practice-list li + li {
      margin-top: 0.35rem;
    }

    @media (max-width: 40rem) {
      body {
        width: min(100% - 1.25rem, 70rem);
        padding-block: 1.25rem 2rem;
      }

      .demo-section {
        padding: 1rem;
      }

      .grid-demo,
      .contents-layout {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Display and Box Types</h1>
    <p class="intro">
      CSS display values affect the boxes used for layout. They do not change
      the meaning of the HTML elements.
    </p>
  </header>

  <main>
    <section class="demo-section" aria-labelledby="block-heading">
      <h2 id="block-heading">1. Block boxes</h2>
      <p>
        These boxes are block-level in this block-flow context. Each one starts
        below the previous one.
      </p>
      <div class="demo-panel">
        <div class="block-sample">First block</div>
        <div class="block-sample">Second block</div>
        <div class="block-sample">Third block</div>
      </div>
      <pre><code>.block-sample {
  display: block;
}</code></pre>
      <p>
        Block boxes are often full-width in ordinary block flow, but width and
        layout constraints can change their size.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="inline-heading">
      <h2 id="inline-heading">2. Inline boxes</h2>
      <p>
        Inline boxes share a line with text and other inline content. This span
        has width and height declarations, but it remains inline.
      </p>
      <div class="demo-panel">
        <p class="inline-paragraph">
          Before the span
          <span class="inline-sample">Inline span</span>
          after the span. The line continues with its text.
        </p>
      </div>
      <pre><code>.inline-sample {
  display: inline;
  width: 14rem;
  height: 3rem;
  padding: 0.25rem 0.6rem;
}</code></pre>
      <p class="note">
        The width and height do not size this non-replaced inline box like a
        block. Vertical padding and borders can paint around it without pushing
        surrounding lines apart in the same way as block padding.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="inline-block-heading">
      <h2 id="inline-block-heading">3. Inline-block boxes</h2>
      <p>
        Each badge stays on the text line as one box. Unlike the inline span,
        each badge accepts a width and a minimum height.
      </p>
      <div class="badge-line">
        Text before
        <span class="inline-block-sample">Badge one</span>
        <span class="inline-block-sample">Badge two</span>
        text after.
      </div>
      <pre><code>.inline-block-sample {
  display: inline-block;
  width: 8rem;
  min-height: 3rem;
  vertical-align: middle;
}</code></pre>
    </section>

    <section class="demo-section" aria-labelledby="inner-heading">
      <h2 id="inner-heading">4. Inner layout types</h2>
      <p>
        Flex and Grid can be the inner layout model while the container
        participates as a block-level box.
      </p>
      <div class="display-grid">
        <article class="display-card">
          <h3>Flex container</h3>
          <div class="flex-demo">
            <span>One</span>
            <span>Two</span>
            <span>Three</span>
          </div>
          <p><code>display: flex</code></p>
        </article>
        <article class="display-card">
          <h3>Grid container</h3>
          <div class="grid-demo">
            <span>One</span>
            <span>Two</span>
            <span>Three</span>
            <span>Four</span>
          </div>
          <p><code>display: grid</code></p>
        </article>
      </div>
      <p>
        The children are arranged by the container's inner layout model. The
        details of Flexbox and Grid come in their own chapters.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="list-heading">
      <h2 id="list-heading">5. List-item display</h2>
      <p>
        Each box below generates a marker. The last one is a div with a visual
        list-item display value, not an HTML list item.
      </p>
      <div class="demo-panel">
        <ul>
          <li>HTML list item</li>
          <li>Another HTML list item</li>
        </ul>
        <div class="list-item-sample">Div with display: list-item</div>
      </div>
      <p class="note">
        Use actual list markup when the content is a list. CSS display does not
        give the div the document semantics of an li.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="hidden-heading">
      <h2 id="hidden-heading">6. Removing a box or hiding its painting</h2>
      <p>
        Each row has a before label, a box with a different hiding rule, and an
        after label.
      </p>
      <div class="display-grid">
        <article class="display-card">
          <h3>display: none</h3>
          <div class="visibility-flow">
            <span class="flow-label">Before</span>
            <div class="flow-box removed-box">Hidden box</div>
            <span class="flow-label">After</span>
          </div>
          <p>The box is removed, so the labels can sit together.</p>
        </article>
        <article class="display-card">
          <h3>visibility: hidden</h3>
          <div class="visibility-flow">
            <span class="flow-label">Before</span>
            <div class="flow-box reserved-box">Hidden box</div>
            <span class="flow-label">After</span>
          </div>
          <p>The box stays in layout, leaving an empty space.</p>
        </article>
        <article class="display-card">
          <h3>opacity: 0</h3>
          <div class="visibility-flow">
            <span class="flow-label">Before</span>
            <div class="flow-box transparent-box">Transparent box</div>
            <span class="flow-label">After</span>
          </div>
          <p>The box stays in layout but is transparent.</p>
        </article>
      </div>
      <p class="note">
        An element with zero opacity can still be interactive or focusable.
        Transparency alone is not a complete hiding method.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="contents-heading">
      <h2 id="contents-heading">7. display: contents</h2>
      <p>
        The purple cards are children of the wrapper in the HTML. With
        <code>display: contents</code>, the wrapper does not generate its own
        box, so the cards become items in the surrounding grid.
      </p>
      <div class="contents-layout">
        <div class="contents-wrapper">
          <div class="contents-card">Child one</div>
          <div class="contents-card">Child two</div>
        </div>
        <div class="contents-card">Another grid item</div>
      </div>
      <pre><code>.contents-wrapper {
  display: contents;
}</code></pre>
      <p class="note">
        The wrapper is still in the HTML document tree. Use this carefully when
        the wrapper has a meaningful role or label.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="anonymous-heading">
      <h2 id="anonymous-heading">8. Text and anonymous inline boxes</h2>
      <p>
        The text inside the panel is direct content. It does not need a span to
        participate in inline layout beside the strong element.
      </p>
      <div class="anonymous-demo">
        Plain text before <strong>strong inline text</strong> and plain text after.
        <p>This paragraph is a separate block inside the same container.</p>
        More direct text after the paragraph.
      </div>
      <p class="note">
        Layout creates anonymous inline boxes for direct text runs. The
        anonymous boxes have no HTML element of their own.
      </p>
    </section>

    <section class="demo-section" id="example" aria-labelledby="semantics-heading">
      <h2 id="semantics-heading">9. Display changes layout, not meaning</h2>
      <p>
        This anchor is styled as a block so its whole row is an easy target.
        It remains a link and can be reached with the keyboard.
      </p>
      <a class="block-link" href="#block-heading">Link styled as a block</a>
      <pre><code>.block-link {
  display: block;
}</code></pre>
    </section>

    <section class="demo-section" aria-labelledby="practice-heading">
      <h2 id="practice-heading">Try it yourself</h2>
      <ol class="practice-list">
        <li>Change the inline span to <code>inline-block</code> and compare its dimensions.</li>
        <li>Change the inline-block badges to <code>block</code> and observe the line breaks.</li>
        <li>Change the flex container to <code>inline-flex</code> and add text before it.</li>
        <li>Compare the empty space created by <code>visibility: hidden</code> and the missing box from <code>display: none</code>.</li>
        <li>Try focusing an interactive element after setting its opacity to zero. Then undo the change.</li>
        <li>Remove <code>display: contents</code> and see how the grid items are grouped.</li>
        <li>Change the block-styled anchor to <code>inline</code>. It remains a link.</li>
      </ol>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

A responsive page shows separate demonstrations for:

- Block boxes stacked in ordinary block flow.
- An inline span sharing a text line while width and height declarations do not size it like a block.
- Inline-block badges that accept dimensions and remain within inline flow.
- Flex and Grid containers arranging their children.
- A list marker on a real list item and on a visually styled div.
- The different layout effects of `display: none`, `visibility: hidden`, and `opacity: 0`.
- Grid children whose wrapper uses `display: contents`.
- Direct text beside inline content and a block child.
- An anchor displayed as a block while remaining a link.

The focus example does not use a script. Use the keyboard to navigate the block-styled link.

## Explanation

The first examples compare outer display behavior. Block boxes are laid out one below another in this context. Inline content shares line space. Inline-blocks can have dimensions but still sit alongside text as atomic boxes.

The Flexbox and Grid panels show inner display behavior: the container's children follow the selected layout model. The list-item panel shows that a marker can be generated visually, while semantic list meaning still comes from HTML.

The three hiding rows make box generation visible. `display: none` removes the box and its space. `visibility: hidden` keeps the space but hides the painting. `opacity: 0` keeps a transparent box and may leave it interactive.

The `display: contents` wrapper has no principal box, so its child cards participate directly in the surrounding grid. The anonymous-box panel shows direct text runs participating in inline layout without their own HTML wrapper element.

## Key points

- Block, inline, and inline-block have different outer and inner layout behavior.
- Flex and Grid are inner layout models for their children.
- `display: none` removes boxes from layout; `visibility: hidden` preserves space.
- `opacity: 0` keeps a transparent box that may still be interactive.
- `display: contents` removes the wrapper box but keeps child boxes.
- List-item display can create a marker without changing HTML semantics.
- Anonymous boxes help text and layout structures fit formatting rules.
- CSS display changes visual layout, not the element's document meaning.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [19 - Borders, Outlines, and Shadows](19-borders-outlines-and-shadows.md) | [Lesson](../lessons/20-display-and-box-types.md) | [Q&A](../qnas/20-display-and-box-types.md) | [21 - Normal Flow and Formatting Contexts](21-normal-flow-and-formatting-contexts.md) |
