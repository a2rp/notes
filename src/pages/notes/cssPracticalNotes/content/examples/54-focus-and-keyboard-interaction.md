# 54 - Focus styles and keyboard interaction

This example demonstrates keyboard navigation with native links and form controls. It includes a skip link, visible focus indicators, a focus-within form style, and scroll spacing for a sticky header.

## Question

How can a page help keyboard users see where they are, skip repeated navigation, and keep focused content visible below a sticky header?

## Complete example

Save both files in the same folder. Open `index.html` and press Tab to move through the controls. Use Shift+Tab to move backward. The first Tab reveals the skip link.

### `index.html`

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Focus styles and keyboard interaction</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header class="site-header">
    <a class="skip-link" href="#main">Skip to main content</a>

    <nav class="site-nav" aria-label="Main navigation">
      <a href="#topics">Topics</a>
      <a href="#search">Search</a>
    </nav>
  </header>

  <main id="main" class="page" tabindex="-1">
    <h1>Keyboard focus</h1>
    <p>
      Use Tab and Shift+Tab to move between links and controls. A visible
      outline shows which element is ready for keyboard interaction.
    </p>

    <section id="search" class="panel" aria-labelledby="search-title">
      <h2 id="search-title">Search the topic list</h2>

      <form class="search-form" action="#topics" method="get">
        <label for="topic-search">Topic name</label>
        <div class="search-form__controls">
          <input
            id="topic-search"
            name="q"
            type="search"
            autocomplete="off"
          >
          <button type="submit">Search topics</button>
        </div>
      </form>

      <p class="hint">
        This static example submits the search text in the page URL. It does
        not filter the list because no search script or server is included.
      </p>
    </section>

    <section id="topics" class="panel" aria-labelledby="topics-title">
      <h2 id="topics-title">Topics</h2>
      <ul>
        <li><a href="#focus-visible">Visible focus indicators</a></li>
        <li><a href="#focus-within">Styling a focused group</a></li>
      </ul>
    </section>

    <section id="focus-visible" class="panel" aria-labelledby="focus-visible-title">
      <h2 id="focus-visible-title">Visible focus indicators</h2>
      <p>
        Keyboard focus should remain visible while a link or control is active.
        The page keeps an outline and adds a stronger style for
        <code>:focus-visible</code> matches.
      </p>
      <a href="#focus-within">Continue to the form group example</a>
    </section>

    <section id="focus-within" class="panel" aria-labelledby="focus-within-title">
      <h2 id="focus-within-title">Styling a focused group</h2>
      <p>
        Focus the search input or its button again to see the form group's
        border change. The active control still has its own focus outline.
      </p>
      <a href="#main">Back to the top</a>
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

:root {
  scroll-padding-block-start: 5.5rem;
  color: #1f2937;
  background-color: #f4f7fb;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

body {
  margin: 0;
}

.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
  padding: 0.75rem 1.25rem;
  border-block-end: 1px solid #64748b;
  background-color: #ffffff;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  max-width: 62rem;
  margin-inline: auto;
}

a {
  color: #004f8b;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.skip-link {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-start: 0.5rem;
  z-index: 2;
  padding: 0.5rem 0.75rem;
  transform: translateY(-200%);
  border: 1px solid #174a7e;
  border-radius: 0.35rem;
  color: #ffffff;
  background-color: #174a7e;
}

.skip-link:focus,
.skip-link:focus-visible {
  transform: translateY(0);
}

.page {
  width: 100%;
  max-width: 62rem;
  margin-inline: auto;
  padding: 1.5rem;
}

h1,
h2,
p {
  overflow-wrap: anywhere;
}

h1 {
  line-height: 1.2;
}

.panel {
  margin-block: 1.25rem;
  padding: 1.25rem;
  border: 1px solid #64748b;
  border-radius: 0.75rem;
  background-color: #ffffff;
  scroll-margin-block-start: 5.5rem;
}

.panel h2 {
  margin-block-start: 0;
  line-height: 1.3;
}

.search-form {
  padding: 0.75rem;
  border: 1px solid #64748b;
  border-radius: 0.5rem;
}

.search-form label {
  display: block;
  margin-block-end: 0.4rem;
  font-weight: 700;
}

.search-form__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

input,
button {
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #475569;
  border-radius: 0.35rem;
  font: inherit;
}

input {
  flex: 1 1 14rem;
  min-width: 0;
  color: #1f2937;
  background-color: #ffffff;
}

button {
  color: #ffffff;
  background-color: #174a7e;
  font-weight: 700;
  cursor: pointer;
}

.hint {
  margin-block-end: 0;
  color: #334155;
}

:focus {
  outline: 2px solid #174a7e;
  outline-offset: 2px;
}

:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 3px;
}

.search-form:focus-within {
  border-color: #005fcc;
  box-shadow: 0 0 0 2px #005fcc;
}

:target {
  scroll-margin-block-start: 5.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f3f4f6;
    background-color: #111827;
  }

  .site-header,
  .panel {
    border-color: #9ca3af;
    background-color: #1f2937;
  }

  a {
    color: #a5d8ff;
  }

  .search-form {
    border-color: #9ca3af;
  }

  input {
    color: #f3f4f6;
    background-color: #111827;
  }

  button,
  .skip-link {
    border-color: #bfdbfe;
    color: #111827;
    background-color: #bfdbfe;
  }

  .hint {
    color: #cbd5e1;
  }
}

@media (forced-colors: active) {
  .site-header,
  .panel,
  .search-form {
    border-color: CanvasText;
  }

  a {
    color: LinkText;
  }

  :focus,
  :focus-visible {
    outline-color: Highlight;
  }

  button,
  .skip-link {
    border-color: ButtonText;
    color: ButtonText;
    background-color: ButtonFace;
  }
}
~~~

## Expected output

The page shows a sticky navigation bar, a search form, and several topic sections. When navigating with the keyboard:

- The first Tab reveals “Skip to main content”. Activating it moves to the main section.
- Each focused link, input, and button has an outline. The browser may use its heuristics to decide when the stronger `:focus-visible` style applies.
- When the search input or button is focused, the search form wrapper also gets a border and shadow from `:focus-within`.
- Following a topic link scrolls the target section below the sticky header because of the scroll spacing.
- In forced colors mode, links and focus outlines use system colors.

The search form demonstrates native keyboard controls, not a search implementation. Submitting it adds the entered text to the page URL, but it does not filter the list.

## Explanation

1. **The skip link is first in the document order.** It becomes visible when focused, so keyboard users can bypass repeated navigation.
2. **Native elements provide the interaction.** The navigation uses links with destinations. The form uses a labeled search input and a submit button.
3. **Focus remains visible.** The general `:focus` rule is a fallback, and `:focus-visible` adds a stronger ring when the browser matches that state. No outline is removed.
4. **The form wrapper reflects child focus.** `:focus-within` highlights the group, while the active input or button keeps its own indicator.
5. **The sticky header does not cover section targets.** Root scroll padding and section scroll margin reserve space when links or the skip link move the viewport.
6. **Color preferences are respected.** The dark scheme updates the text and surfaces together. In forced colors mode, system colors are used for links, outlines, borders, and buttons.
7. **CSS does not create search behavior.** The form uses native submit behavior, but filtering the topic list would require a separate search implementation.

## Try it yourself

1. Navigate from the first control to the last with Tab, then return with Shift+Tab.
2. Remove the `:focus` and `:focus-visible` rules and observe the difference.
3. Remove the `:focus-within` rule and compare the form group while its input is active.
4. Change the header height and update the scroll spacing to match it.
5. Inspect the page with forced colors enabled and check the links, controls, and focus ring.
6. Replace the search button with a styled `div` and identify the keyboard behavior that disappears.
7. Add another navigation link and make sure the visual order still follows the document order.

## Key points

- A skip link helps keyboard users bypass repeated navigation.
- Use native links and controls for keyboard behavior.
- Keep a visible focus indicator and do not depend on hover alone.
- `:focus-within` adds context to a group but does not replace the child's indicator.
- Scroll padding and scroll margin help keep focused or linked content below sticky headers.
- Use system colors for focus and controls in forced colors mode.
- CSS styling does not implement the form's application behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [53 - Accessible CSS and user preferences](../lessons/53-accessible-css-and-user-preferences.md) | [Q&A](../qnas/54-focus-and-keyboard-interaction.md) | [Example](54-focus-and-keyboard-interaction.md) | [55 - Color schemes and theming](../lessons/55-color-schemes-and-theming.md) |
