# 21 - Normal Flow and Formatting Contexts: Example

## Goal

Watch block and inline content follow normal flow, then compare how floats, clearing, and a new block formatting context change the layout.

Copy the complete HTML into a file named `index.html` and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Normal Flow and Formatting Contexts</title>
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
      margin-top: 0.75rem;
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

    .normal-block {
      margin-block: 0.75rem;
      padding: 0.75rem;
      border-inline-start: 4px solid #2563eb;
      background: #dbeafe;
    }

    .inline-panel {
      padding: 0.75rem;
      border: 1px dashed #94a3b8;
      background: #fff;
    }

    .inline-highlight {
      padding: 0.1rem 0.35rem;
      border-radius: 0.25rem;
      background: #ccfbf1;
      color: #115e59;
    }

    .float-article {
      padding: 1rem;
      border: 1px solid #cbd5e1;
      background: #fff;
    }

    .float-tile {
      float: left;
      width: 10rem;
      min-height: 8rem;
      margin: 0 1rem 0.75rem 0;
      padding: 1rem;
      border-radius: 0.5rem;
      background: #bfdbfe;
      color: #1e3a8a;
      font-weight: 700;
    }

    .float-tile p {
      margin-top: 0.35rem;
      font-size: 0.9rem;
      font-weight: 400;
    }

    .clear-footer {
      clear: both;
      margin-top: 0.75rem;
      padding: 0.65rem;
      border-top: 2px solid #0f766e;
      background: #ccfbf1;
    }

    .compare-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
      gap: 1rem;
    }

    .compare-card {
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      background: #fff;
    }

    .float-frame {
      padding: 0.75rem;
      border: 2px dashed #64748b;
      background: #f8fafc;
    }

    .plain-frame {
      background: #fef3c7;
    }

    .contained-frame {
      display: flow-root;
      background: #dcfce7;
    }

    .mini-float {
      width: 9rem;
      min-height: 6rem;
      margin: 0;
    }

    .frame-caption {
      margin-top: 0.75rem;
      color: #475569;
      font-size: 0.95rem;
    }

    .margin-stage {
      padding: 1rem;
      border: 1px dashed #94a3b8;
      background: #f8fafc;
    }

    .margin-parent {
      margin-top: 1rem;
      background: #dbeafe;
    }

    .margin-child {
      margin-top: 1.5rem;
      padding: 0.75rem;
      background: #bfdbfe;
    }

    .flow-root-parent {
      display: flow-root;
      margin-top: 1rem;
      background: #dcfce7;
    }

    .flow-root-parent .margin-child {
      background: #bbf7d0;
    }

    .relative-stage {
      padding: 1rem;
      border: 1px dashed #94a3b8;
      background: #f8fafc;
    }

    .relative-box,
    .following-box {
      padding: 0.75rem;
    }

    .relative-box {
      position: relative;
      inset-block-start: 0.75rem;
      inset-inline-start: 1rem;
      border: 2px solid #7c3aed;
      background: #f5f3ff;
    }

    .following-box {
      border: 2px solid #0f766e;
      background: #ccfbf1;
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
    }
  </style>
</head>
<body>
  <header>
    <h1>Normal Flow and Formatting Contexts</h1>
    <p class="intro">
      The first panels show the default flow. Later panels show how floats,
      clearance, and a new formatting context affect boxes.
    </p>
  </header>

  <main>
    <section class="demo-section" aria-labelledby="block-flow-heading">
      <h2 id="block-flow-heading">1. Block boxes in normal flow</h2>
      <p>
        These in-flow block boxes appear in source order, one after another in
        the block direction.
      </p>
      <div class="demo-panel">
        <div class="normal-block">First block</div>
        <div class="normal-block">Second block</div>
        <div class="normal-block">Third block</div>
      </div>
      <p>
        Their vertical margins can collapse when the conditions for margin
        collapsing are met.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="inline-flow-heading">
      <h2 id="inline-flow-heading">2. Inline content makes line boxes</h2>
      <p>
        Text and inline elements share lines. Resize the browser to see where
        the line wraps.
      </p>
      <div class="inline-panel">
        This is ordinary text with an
        <strong class="inline-highlight">inline highlighted phrase</strong>
        and more words that continue to the next line when they run out of room.
        Inline content is arranged into line boxes inside its block container.
      </div>
    </section>

    <section class="demo-section" aria-labelledby="float-heading">
      <h2 id="float-heading">3. Text can flow beside a float</h2>
      <p>
        The blue tile is floated left. The following paragraphs are block boxes,
        but their line boxes can become narrower beside the float.
      </p>
      <article class="float-article">
        <div class="float-tile">
          Floated tile
          <p>float: left</p>
        </div>
        <p>
          Normal-flow text begins next to the float when there is enough room.
          As each line is laid out, the browser leaves room for the float's
          margin box. When the text reaches the bottom of the float, its line
          boxes can use the full width of the article again.
        </p>
        <p>
          This second paragraph remains in normal flow too. The float changes
          the available line width beside it, but the paragraph itself was not
          floated or positioned out of flow.
        </p>
        <div class="clear-footer">
          This block uses <code>clear: both</code>, so it moves below the float.
        </div>
      </article>
    </section>

    <section class="demo-section" aria-labelledby="contain-float-heading">
      <h2 id="contain-float-heading">4. Compare float containment</h2>
      <p>
        Both frames contain only a floated child. The first frame's height does
        not include its float. The second frame establishes a BFC.
      </p>
      <div class="compare-grid">
        <article class="compare-card">
          <h3>Ordinary block</h3>
          <div class="float-frame plain-frame">
            <div class="float-tile mini-float">Float only</div>
          </div>
          <p class="frame-caption">
            The dashed frame does not grow around the float.
          </p>
        </article>
        <article class="compare-card">
          <h3>Block formatting context</h3>
          <div class="float-frame contained-frame">
            <div class="float-tile mini-float">Float only</div>
          </div>
          <p class="frame-caption">
            <code>display: flow-root</code> makes the frame contain the float.
          </p>
        </article>
      </div>
      <pre><code>.contained-frame {
  display: flow-root;
}</code></pre>
    </section>

    <section class="demo-section" aria-labelledby="margin-boundary-heading">
      <h2 id="margin-boundary-heading">5. A BFC is a margin boundary for its children</h2>
      <p>
        Each parent has a child with a 1.5rem top margin. Compare the child
        margin in an ordinary block with the child margin inside a flow-root.
      </p>
      <div class="margin-stage">
        <div class="margin-parent">
          <div class="margin-child">Child in an ordinary block</div>
        </div>
        <div class="margin-parent flow-root-parent">
          <div class="margin-child">Child inside a BFC root</div>
        </div>
      </div>
      <p class="note">
        In the first case, the child's top margin can collapse through its
        parent. In the second, the BFC keeps that child margin inside the root.
        The root's own outer margins still follow normal sibling margin rules.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="relative-heading">
      <h2 id="relative-heading">6. Relative positioning keeps its flow space</h2>
      <p>
        The first box is shifted down and to the right. The next in-flow box is
        still placed using the first box's original position.
      </p>
      <div class="relative-stage">
        <div class="relative-box">Relatively positioned box</div>
        <div class="following-box">Following normal-flow box</div>
      </div>
      <pre><code>.relative-box {
  position: relative;
  inset-block-start: 0.75rem;
  inset-inline-start: 1rem;
}</code></pre>
      <p>
        The relative offset changes where the first box is painted, not the
        space it reserves in normal flow.
      </p>
    </section>

    <section class="demo-section" aria-labelledby="practice-heading">
      <h2 id="practice-heading">Try it yourself</h2>
      <ol class="practice-list">
        <li>Change the float to <code>float: right</code> and observe the text wrap.</li>
        <li>Remove <code>clear: both</code> and compare the footer position.</li>
        <li>Remove <code>display: flow-root</code> and observe the second frame's height.</li>
        <li>Replace <code>display: flow-root</code> with <code>overflow: hidden</code> and consider the clipping side effect.</li>
        <li>Change the child top margin in the two parent examples and compare the backgrounds.</li>
        <li>Change the relative offsets. Confirm that the next box keeps its normal-flow position.</li>
        <li>Resize the browser and observe how the inline text wraps beside the float.</li>
      </ol>
    </section>
  </main>
</body>
</html>
~~~

## Expected output

A responsive page demonstrates:

- Three block boxes arranged vertically.
- Text and inline content sharing lines and wrapping as the viewport narrows.
- Paragraph line boxes flowing beside a floated tile.
- A cleared footer placed below the float.
- A plain wrapper that does not contain a floated child's height and a `flow-root` wrapper that does.
- A child margin that can collapse through an ordinary parent and stays inside a BFC root.
- A relatively positioned box that moves visually while its following sibling keeps its original flow position.

The example uses no external files or scripts.

## Explanation

The first two panels show normal flow: block boxes are laid out vertically, while inline content shares lines. In the float example, the block paragraphs remain in normal flow, but their line boxes make room for the floated tile.

The footer uses `clear: both` to move below the float. The containment comparison shows a BFC created by `display: flow-root` including the float in the wrapper's height. It also prevents the child margin from collapsing through the BFC root.

The final panel uses relative positioning. Its box is painted with an offset, while the following box stays in the position determined by normal flow.

## Key points

- Block and inline formatting contexts arrange different types of in-flow content.
- Floats leave normal flow, but inline line boxes can flow around them.
- `clear` moves a block below relevant earlier floats.
- `display: flow-root` establishes a BFC that contains floated children.
- A BFC root isolates its in-flow child margins from collapsing through it.
- Relative positioning offsets painting while preserving normal-flow space.
- A BFC controls layout interactions and does not automatically create a stacking context.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [20 - Display and Box Types](20-display-and-box-types.md) | [Lesson](../lessons/21-normal-flow-and-formatting-contexts.md) | [Q&A](../qnas/21-normal-flow-and-formatting-contexts.md) | [22 - Positioning Elements](22-positioning.md) |
