# 52 - Scoped styles and component styling

This example styles an article, a nested callout, and an embedded widget with CSS scopes. The article scope stops at the widget, the widget receives its own styles, and the callout demonstrates scope proximity.

## Question

How can an article style its own content without reaching into a nested widget, while letting a callout inside the article use a more specific local presentation?

## Complete example

Save both files in the same folder. Open `index.html` in a browser that supports `@scope`. The document remains readable from its semantic HTML even if the scoped styling is unavailable.

### `index.html`

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Scoped styles and component styling</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page">
    <article class="article">
      <h1>CSS scopes define component boundaries</h1>
      <p>
        This article has its own styles. A nested callout can use a closer
        scope, and an embedded widget can keep its own presentation.
      </p>

      <aside class="callout" aria-label="Design note">
        <p>
          This paragraph is inside both the article and callout scopes. When
          their equally specific paragraph rules compete, the nearer callout
          scope wins.
        </p>
      </aside>

      <section class="embedded-widget" aria-labelledby="widget-title">
        <h2 id="widget-title">Embedded widget</h2>
        <p>
          The article scope stops at this component. The widget uses its own
          scope for its heading, text, and link.
        </p>
        <a href="#article-end">Return to the article</a>
      </section>

      <p id="article-end">
        This paragraph is part of the article again after the widget boundary.
      </p>
    </article>
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
  padding: 1.5rem;
  background-color: #eef3f8;
  color: #1d2939;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.65;
}

.page {
  width: 100%;
  max-width: 54rem;
  margin-inline: auto;
}

@scope (.article) to (.embedded-widget) {
  :scope {
    padding: 1.5rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.75rem;
    background-color: #ffffff;
  }

  h1 {
    margin: 0 0 0.75rem;
    color: #17324d;
    line-height: 1.2;
  }

  p {
    margin: 0 0 1rem;
    color: #334155;
  }

  a {
    color: #145da0;
  }

  .callout {
    margin-block: 1.25rem;
    padding: 1rem;
    border-inline-start: 0.25rem solid #d97706;
    background-color: #fff7ed;
  }
}

@scope (.article .callout) {
  p {
    margin: 0;
    color: #7c2d12;
  }
}

@scope (.embedded-widget) {
  :scope {
    margin-block: 1.25rem;
    padding: 1rem;
    border: 1px solid #93c5fd;
    border-radius: 0.5rem;
    background-color: #eff6ff;
  }

  h2 {
    margin: 0 0 0.5rem;
    color: #174a7e;
    font-size: 1.15rem;
    line-height: 1.3;
  }

  p {
    margin: 0 0 0.75rem;
    color: #334155;
  }

  a {
    color: #174a7e;
    font-weight: 700;
  }
}
~~~

## Expected output

The page shows a readable article on a pale background. In a browser that supports `@scope`:

- The article receives a white surface, border, and padding.
- The article's heading, paragraphs, and links receive its scoped styles.
- The callout gets a warm background and accent border. Its paragraph receives the brown text color from the closer callout scope.
- The embedded widget receives a blue-tinted surface and its own heading, paragraph, and link styles.
- The article's paragraph styling stops at the widget boundary and applies again to the article paragraph after the widget.

In a browser that does not apply `@scope`, the global body and page styles still provide readable typography and spacing. The component-specific surfaces and colors are absent, but the headings, paragraphs, and link remain in the HTML.

## Explanation

1. **The article is the outer root.** `@scope (.article)` starts scoped matching at the article element. The `:scope` rule styles that root, while selectors like `h1` and `p` select descendants.
2. **The widget is the article limit.** `to (.embedded-widget)` excludes the widget and its descendants from the outer article scope. This prevents the article's scoped heading, paragraph, and link rules from matching inside the widget.
3. **The callout is inside the article's scope.** Its paragraph matches the article's `p` rule and the callout's `p` rule. Both selectors have the same specificity, so the closer callout root wins the scope-proximity comparison.
4. **The widget gets a separate root.** Its own `@scope` block defines the root surface and styles its descendants without relying on article rules.
5. **The HTML carries the information.** The scopes change presentation. They do not hide content, create a separate DOM tree, or prevent inherited values.
6. **The scope is not a security boundary.** Other document rules and inheritance can still affect scoped elements according to the cascade.

## Try it yourself

1. Remove `to (.embedded-widget)` from the article scope and inspect which article rules now also match inside the widget.
2. Remove the callout scope and compare the callout paragraph color.
3. Add a second callout and verify that each matching root establishes its own scope.
4. Change `:scope` in the article block to `article` and explain why that selector does not directly identify the scope root from within the block.
5. Move the widget outside the article in the HTML and inspect how the scope boundary changes.
6. Add a global paragraph rule outside every scope and observe that it can still participate in the cascade.
7. Decide which styles are essential for readability and keep those available in a baseline outside `@scope` if your target browsers require it.

## Key points

- The article scope styles content up to, but not including, the widget limit.
- The callout scope can win for an equally specific paragraph declaration because its root is nearer.
- The widget receives its own styles from its own scope.
- Global CSS and inheritance still affect scoped components.
- Keep important content in HTML and provide baseline styling appropriate for the project's target browsers.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [51 - Feature queries and progressive enhancement](../lessons/51-feature-queries-and-progressive-enhancement.md) | [Q&A](../qnas/52-scoping-and-component-styles.md) | [Example](52-scoping-and-component-styles.md) | [53 - Accessible CSS and user preferences](../lessons/53-accessible-css-and-user-preferences.md) |
