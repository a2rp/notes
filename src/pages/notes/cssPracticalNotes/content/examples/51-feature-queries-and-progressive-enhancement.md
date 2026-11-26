# 51 - Feature queries and progressive enhancement

This example uses feature queries to enhance a useful baseline layout. The cards use a wrapping flex layout first, switch to a responsive grid when the browser accepts the required declarations, and add optional color and selector enhancements when those features are recognized.

## Question

How can a card layout remain usable without newer CSS features while gaining a grid layout, a blended background color, and a selector-based accent where those features are supported?

## Complete example

Save both files in the same folder. Open `index.html` in a browser. The flex layout is the baseline; supported browsers apply the enhancements from the feature queries.

### `index.html`

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Feature queries and progressive enhancement</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page">
    <p class="eyebrow">CSS learning example</p>
    <h1>Feature queries</h1>
    <p class="intro">
      This card list starts with a flexible baseline. Browsers that recognize
      additional CSS features receive optional layout and visual enhancements.
    </p>

    <section class="cards" aria-label="CSS learning topics">
      <article class="card">
        <span class="card__tag">Featured</span>
        <h2>Start with a baseline</h2>
        <p>
          The cards remain in a wrapping flex layout when the grid enhancement
          is unavailable.
        </p>
      </article>

      <article class="card">
        <h2>Add a grid enhancement</h2>
        <p>
          A support query can switch the list to a responsive grid when the
          browser accepts the required declarations.
        </p>
      </article>

      <article class="card">
        <h2>Keep optional styles optional</h2>
        <p>
          Color blending and selector-based styling improve the presentation
          without carrying essential information.
        </p>
      </article>
    </section>
  </main>
</body>
</html>
~~~

### `styles.css`

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #eef3f8;
  color: #1d2939;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

.page {
  width: 100%;
  max-width: 58rem;
  margin-inline: auto;
  padding: 2rem 1.5rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #315f85;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
p {
  overflow-wrap: anywhere;
}

h1 {
  margin: 0;
  line-height: 1.15;
}

.intro {
  max-width: 65ch;
  margin: 0.75rem 0 1.5rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 14rem;
  min-width: 0;
  margin: 0.5rem;
  padding: 1.25rem;
  border: 1px solid #b8c7d6;
  border-radius: 0.75rem;
  background-color: #ffffff;
}

.card__tag {
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background-color: #dbeafe;
  color: #174a7e;
  font-size: 0.8rem;
  font-weight: 700;
}

.card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  line-height: 1.3;
}

.card p {
  margin: 0;
}

@supports (display: grid) and (gap: 1rem) {
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1rem;
  }

  .card {
    margin: 0;
  }
}

@supports (background-color: color-mix(in srgb, white 90%, #dbeafe)) {
  .card {
    background-color: color-mix(in srgb, white 90%, #dbeafe);
  }
}

@supports selector(.card:has(> .card__tag)) {
  .card:has(> .card__tag) {
    border-color: #2563a6;
    box-shadow: 0 0.5rem 1.25rem rgb(23 74 126 / 12%);
  }
}
~~~

## Expected output

The page shows a heading, a short introduction, and three topic cards. The first card has a “Featured” label. Text wraps inside each card, and the cards can flow onto additional rows when the viewport is narrow.

The exact layout depends on the browser's supported features:

- Without the grid enhancement, the cards use the baseline flex layout and keep their margins for spacing.
- When both `display: grid` and `gap` are accepted, the cards use an auto-fitting grid and the flex margins are removed.
- When the tested `color-mix()` value is accepted, the white card background is blended with a pale blue. Otherwise, the solid white background remains.
- When the selector query is supported, the card containing the direct child tag gets a blue border and a subtle shadow. Without it, every card still has its regular border.

## Explanation

1. **The baseline comes first.** The cards are a wrapping flex container before any feature query. The HTML content and its reading order do not depend on grid support.
2. **The grid query checks its dependencies.** The enhancement requires both a grid display declaration and a gap declaration, so the conditions are joined with `and`.
3. **The baseline spacing remains available.** Card margins provide spacing in the flex layout. The grid block replaces that spacing with `gap` and resets the margins to avoid double spacing.
4. **The color query adds one optional declaration.** The solid background is defined first. The `color-mix()` value only overrides it when the tested value is accepted.
5. **The selector query tests syntax support.** It checks whether the browser recognizes the `:has()` selector. The rule then selects a card whose direct child is the tag. Other cards retain their baseline styling.
6. **No script is needed for styling decisions.** The CSS conditions directly control CSS rules, so the page does not need JavaScript to add capability classes.

## Try it yourself

1. Remove the grid query and compare the flex baseline at wide and narrow widths.
2. Change the grid query from `and` to `or`. Explain why either supported declaration alone may not be enough for this enhancement.
3. Temporarily remove the solid background fallback and identify what is lost in a browser that does not accept the color query.
4. Remove the `Featured` tag and observe which card matches the guarded `:has()` selector.
5. Add a paragraph to one card and check that the reading order remains clear at narrow widths.
6. Keep all essential text in the HTML, then decide whether any of the visual enhancements should become necessary for understanding it.

## Key points

- Write a usable baseline before feature queries.
- Use `and` when an enhancement needs every tested capability.
- Keep simple value fallbacks earlier in the cascade than their enhancements.
- A selector query tests selector support, while the selector rule itself matches document elements.
- Optional styling should improve the presentation without hiding essential content or operation.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [50 - At-rules, imports, and font-face](../lessons/50-at-rules-and-imports.md) | [Q&A](../qnas/51-feature-queries-and-progressive-enhancement.md) | [Example](51-feature-queries-and-progressive-enhancement.md) | [52 - Scoped styles and component styling](../lessons/52-scoping-and-component-styles.md) |
