# 47 - Filters, blending, and opacity

This complete HTML page compares common filters, background blending, element blending, color alpha, whole-element opacity, and a translucent glass panel. The artwork is made with CSS gradients, so it does not need external images or assets.

## Question

How can these visual effects be demonstrated side by side while keeping text readable and giving the glass panel a usable fallback?

## Complete example

Save the code as an HTML file and open it in a browser. Compare the filter tiles, blended artwork, opacity panels, and glass panel.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS filters, blending, and opacity</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      font-family: system-ui, sans-serif;
      color: #1c2938;
      background: #edf2f7;
    }

    body {
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      line-height: 1.6;
    }

    main {
      width: min(100%, 68rem);
      margin-inline: auto;
    }

    h1,
    h2,
    h3 {
      line-height: 1.2;
    }

    h1 {
      margin-bottom: 0.75rem;
      font-size: clamp(2rem, 5vw, 3rem);
    }

    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
    }

    p {
      max-width: 68ch;
    }

    .intro,
    .section-intro,
    .card p {
      color: #46566a;
    }

    .section {
      margin-top: 2.5rem;
    }

    .section-intro {
      margin-bottom: 1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      gap: 1rem;
    }

    .card {
      overflow: hidden;
      border: 1px solid #cbd5e1;
      border-radius: 0.9rem;
      background: white;
      box-shadow: 0 0.4rem 1.2rem rgb(15 23 42 / 0.08);
    }

    .card-body {
      padding: 1rem;
    }

    .card h3 {
      margin-bottom: 0.3rem;
    }

    .card p {
      font-size: 0.95rem;
    }

    .scene {
      position: relative;
      display: grid;
      min-height: 11rem;
      overflow: hidden;
      place-items: center;
      isolation: isolate;
      background:
        radial-gradient(circle at 18% 20%, #fff6b0 0 0.6rem, transparent 0.7rem),
        linear-gradient(145deg, #235789, #38a3a5 55%, #f6ae2d);
    }

    .scene::before,
    .scene::after {
      position: absolute;
      z-index: -1;
      content: "";
      border-radius: 50%;
    }

    .scene::before {
      top: 10%;
      right: 12%;
      width: 8rem;
      height: 8rem;
      background: #f7d794;
    }

    .scene::after {
      bottom: -4rem;
      left: -1rem;
      width: 16rem;
      height: 8rem;
      background: #263d5a;
      transform: rotate(-12deg);
    }

    .orb {
      width: 4.5rem;
      height: 4.5rem;
      border: 0.3rem solid rgb(255 255 255 / 0.85);
      border-radius: 50%;
      background: #e84855;
    }

    .gray {
      filter: grayscale(1);
    }

    .warm {
      filter: sepia(0.85) contrast(1.08);
    }

    .vivid {
      filter: saturate(1.7) brightness(1.05);
    }

    .shadow .orb {
      filter: drop-shadow(0.5rem 0.45rem 0.3rem rgb(0 0 0 / 0.55));
    }

    .background-blend {
      display: grid;
      min-height: 11rem;
      place-items: center;
      padding: 1rem;
      border-radius: 0.8rem;
      color: white;
      text-align: center;
      background-image:
        linear-gradient(135deg, rgb(240 70 50 / 0.8), rgb(255 190 40 / 0.75)),
        linear-gradient(45deg, #1d4ed8, #6d28d9);
      background-blend-mode: multiply, screen;
    }

    .background-blend p {
      padding: 0.65rem 0.85rem;
      border-radius: 0.5rem;
      background: rgb(20 30 50 / 0.78);
      font-weight: 700;
    }

    .blend-stage {
      position: relative;
      min-height: 13rem;
      overflow: hidden;
      border: 1px solid #cbd5e1;
      border-radius: 0.9rem;
      background: #f8fafc;
      isolation: isolate;
    }

    .circle {
      position: absolute;
      top: 42%;
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      transform: translateY(-50%);
      mix-blend-mode: multiply;
    }

    .circle-blue {
      left: 18%;
      background: #3b82f6;
    }

    .circle-pink {
      left: 38%;
      background: #ec4899;
    }

    .circle-yellow {
      left: 58%;
      background: #facc15;
    }

    .blend-label {
      position: absolute;
      inset: auto 1rem 0.7rem;
      color: #23354a;
      text-align: center;
    }

    .alpha-demo {
      min-height: 10rem;
      padding: 1rem;
      border-radius: 0.9rem;
      background:
        linear-gradient(135deg, rgb(255 255 255 / 0.35) 25%, transparent 25%) 0 0 / 1.5rem 1.5rem,
        linear-gradient(315deg, rgb(255 255 255 / 0.35) 25%, transparent 25%) 0 0 / 1.5rem 1.5rem,
        linear-gradient(135deg, #0e7490, #4338ca);
    }

    .panel {
      max-width: 22rem;
      padding: 1rem;
      border: 1px solid rgb(255 255 255 / 0.8);
      border-radius: 0.7rem;
      color: #132238;
      background: rgb(255 255 255 / 0.78);
    }

    .panel h3 {
      margin-bottom: 0.3rem;
    }

    .whole-opacity {
      opacity: 0.62;
    }

    .glass-scene {
      display: grid;
      min-height: 18rem;
      place-items: center;
      padding: 1rem;
      border-radius: 0.9rem;
      background:
        radial-gradient(circle at 20% 25%, #ffcf56 0 3rem, transparent 3.1rem),
        radial-gradient(circle at 78% 70%, #e94f8b 0 4rem, transparent 4.1rem),
        linear-gradient(135deg, #176b87, #4338a4 55%, #d24c66);
    }

    .glass-panel {
      width: min(100%, 28rem);
      padding: clamp(1.2rem, 4vw, 2rem);
      border: 1px solid rgb(255 255 255 / 0.85);
      border-radius: 1rem;
      color: #17212b;
      background: rgb(255 255 255 / 0.94);
      box-shadow: 0 0.7rem 2rem rgb(12 24 44 / 0.2);
    }

    .glass-panel p {
      margin-top: 0.5rem;
    }

    @supports (backdrop-filter: blur(1px)) {
      .glass-panel {
        background: rgb(255 255 255 / 0.72);
        backdrop-filter: blur(0.8rem) saturate(1.2);
      }
    }

    .note {
      margin-top: 1.5rem;
      padding: 1rem;
      border-left: 0.3rem solid #176b87;
      background: white;
    }

    @media (prefers-reduced-motion: no-preference) {
      .card {
        transition: transform 180ms ease;
      }

      .card:hover {
        transform: translateY(-0.2rem);
      }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Filters, blending, and opacity</h1>
      <p class="intro">These CSS-made scenes demonstrate visual effects without external images or assets.</p>
    </header>

    <section class="section" aria-labelledby="filters-title">
      <h2 id="filters-title">Filter the rendered artwork</h2>
      <p class="section-intro">Each tile starts with the same scene. Filters change its pixels, not its layout size.</p>

      <div class="grid">
        <article class="card">
          <div class="scene" aria-hidden="true"><span class="orb"></span></div>
          <div class="card-body"><h3>Original</h3><p>No filter is applied.</p></div>
        </article>

        <article class="card">
          <div class="scene gray" aria-hidden="true"><span class="orb"></span></div>
          <div class="card-body"><h3>Grayscale</h3><p><code>grayscale(1)</code> removes the colors.</p></div>
        </article>

        <article class="card">
          <div class="scene warm" aria-hidden="true"><span class="orb"></span></div>
          <div class="card-body"><h3>Warm tones</h3><p>Sepia is applied before contrast.</p></div>
        </article>

        <article class="card">
          <div class="scene vivid" aria-hidden="true"><span class="orb"></span></div>
          <div class="card-body"><h3>More vivid</h3><p>Saturation and brightness are adjusted in order.</p></div>
        </article>

        <article class="card">
          <div class="scene shadow" aria-hidden="true"><span class="orb"></span></div>
          <div class="card-body"><h3>Shape shadow</h3><p><code>drop-shadow()</code> follows the orb's shape.</p></div>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="background-title">
      <h2 id="background-title">Blend background layers</h2>
      <p class="section-intro">The gradients blend with one another. The text remains a separate foreground layer.</p>
      <div class="background-blend"><p>Multiply and screen blend the background layers.</p></div>
    </section>

    <section class="section" aria-labelledby="mix-title">
      <h2 id="mix-title">Blend overlapping elements</h2>
      <p class="section-intro">These circles blend inside an isolated artwork group.</p>
      <div class="blend-stage" role="img" aria-label="Blue, pink, and yellow circles overlap and blend inside a contained artwork area">
        <span class="circle circle-blue"></span>
        <span class="circle circle-pink"></span>
        <span class="circle circle-yellow"></span>
        <p class="blend-label">The artwork uses isolation: isolate.</p>
      </div>
    </section>

    <section class="section" aria-labelledby="alpha-title">
      <h2 id="alpha-title">Color alpha versus element opacity</h2>
      <p class="section-intro">The left panel uses alpha on its background. The right panel lowers opacity for the whole group.</p>
      <div class="grid">
        <div class="alpha-demo">
          <article class="panel">
            <h3>Background alpha</h3>
            <p>The background is translucent, but the text stays opaque.</p>
          </article>
        </div>
        <div class="alpha-demo">
          <article class="panel whole-opacity">
            <h3>Whole group opacity</h3>
            <p>The background and text are composited together.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="backdrop-title">
      <h2 id="backdrop-title">Filter the backdrop</h2>
      <p class="section-intro">The glass panel has a translucent surface so the backdrop can show through.</p>
      <div class="glass-scene">
        <article class="glass-panel">
          <h3>Readable glass panel</h3>
          <p>The text stays sharp. Where supported, the backdrop behind this panel is blurred and saturated.</p>
        </article>
      </div>
    </section>

    <aside class="note">
      <p><strong>Try this:</strong> Change the filter order, switch the blend modes, or increase the glass panel's background opacity. Check text readability after each change.</p>
    </aside>
  </main>
</body>
</html>
~~~

## Explanation

- The filter gallery repeats one CSS-made scene and applies grayscale, sepia, contrast, saturation, brightness, or a shadow to it.
- The filter functions run in written order. Each tile keeps the same layout dimensions.
- The background blend uses two gradient layers. A separate dark surface behind the text protects its contrast.
- The circles use `mix-blend-mode: multiply`. Their parent uses `isolation: isolate` to keep the blending local to the artwork.
- The left comparison panel uses alpha only on its background. The right panel applies `opacity` to the whole group, so its text also looks faded.
- The glass panel starts with a mostly opaque background. A feature query adds `backdrop-filter` and a more translucent surface when supported.
- The hover lift is enabled only when reduced motion has not been requested.
- Decorative CSS shapes are hidden from assistive technology. The overlapping-circle image has a concise accessible description.

## Expected output

A responsive page shows five versions of the same colorful scene, a gradient blend, three overlapping circles, two opacity comparison panels, and a glass panel over a colorful backdrop. The grayscale scene has no color, the warm scene looks sepia-toned, and the vivid scene has stronger color. The orb shadow follows its circular shape. The background-alpha panel keeps its text clear, while the whole-opacity panel makes its text faint. The glass panel text remains sharp, and the visible backdrop is softened in browsers that support the feature. Without backdrop-filter support, the panel still has a readable solid fallback.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [46 - Scroll-driven animations](46-scroll-driven-animations.md) | [Lesson](../lessons/47-filters-blending-and-opacity.md) | [Q&A](../qnas/47-filters-blending-and-opacity.md) | [48 - Clipping, masks, and shapes](48-clipping-masking-and-shapes.md) |
