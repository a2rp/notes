# Example 02 - CSS Syntax and Rulesets

## Question

Create a small information page that uses several CSS rulesets. Include multiple declarations in a rule, a selector list, class selectors, and a CSS comment. Identify the selector, property, and value in the stylesheet.

## HTML file: `index.html`

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Learning CSS Syntax</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="page">
      <p class="eyebrow">CSS practice</p>
      <h1>Learning CSS syntax</h1>
      <p class="intro">
        A stylesheet is made of rules. Each rule connects a selector to the
        declarations that describe how matching content should look.
      </p>

      <section class="notice">
        <h2>One rule can hold several declarations</h2>
        <p class="notice-text">
          Each declaration gives one property a value. Colons and semicolons
          help separate the parts of the rule.
        </p>
      </section>

      <section class="tips">
        <h2>Read each ruleset from top to bottom</h2>
        <ul class="tips-list">
          <li>Find the selector before the opening brace.</li>
          <li>Read each property and its value inside the braces.</li>
          <li>Check that declarations are separated with semicolons.</li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

## CSS file: `styles.css`

~~~css
/* Shared box sizing and page defaults */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem 1rem;
  background-color: #f1f5f9;
  color: #1f2937;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.page {
  width: 100%;
  max-width: 46rem;
  margin: 0 auto;
}

h1,
h2 {
  color: #164e63;
  font-family: Georgia, serif;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #0f766e;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  line-height: 1.15;
}

.intro {
  margin: 0 0 1.5rem;
  font-size: 1.125rem;
}

.notice {
  margin-bottom: 1rem;
  padding: 1.25rem;
  border: 2px solid #f59e0b;
  border-radius: 0.75rem;
  background-color: #fffbeb;
}

.notice-text {
  margin: 0;
}

h2 {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
  line-height: 1.3;
}

.tips {
  padding: 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background-color: #ffffff;
}

.tips-list {
  margin: 0;
  padding-left: 1.25rem;
}
~~~

## Expected output

The page shows a centered column on a pale gray background. A small teal label appears above a large dark teal heading. An introductory paragraph follows. Below it is a pale yellow notice with an amber border, then a white tips panel with a bulleted list. The page keeps side padding on a narrow screen and does not grow wider than the main content width.

The browser tab title is **Learning CSS Syntax**. The content structure comes from the HTML. The CSS rules change the colors, typography, spacing, borders, and width. This Markdown page displays the code as text and does not execute it.

## Explanation

### How to read a ruleset

Take this rule from the stylesheet:

```css
.notice {
  margin-bottom: 1rem;
  padding: 1.25rem;
  border: 2px solid #f59e0b;
  border-radius: 0.75rem;
  background-color: #fffbeb;
}
```

- `.notice` is the selector. It matches the element with the `notice` class.
- `{` begins the declaration block, and `}` ends it.
- `margin-bottom`, `padding`, `border`, `border-radius`, and `background-color` are properties.
- The text after each colon is the property's value.
- Each semicolon separates one declaration from the next.

### How the selector list works

```css
h1,
h2 {
  color: #164e63;
  font-family: Georgia, serif;
}
```

The comma makes `h1` and `h2` alternatives in one selector list. The declarations apply to both heading types. The later `h1` and `h2` rules set their individual sizes and spacing.

### Why the formatting helps

Each declaration is on its own line, with a space after the colon and a semicolon at the end. This makes it easier to compare declarations and notice a missing colon or semicolon. The comment uses CSS's `/* ... */` syntax and labels the first rule group.

## How to try it

1. Save the HTML code block as `index.html`.
2. Save the CSS code block as `styles.css` in the same folder.
3. Open `index.html` in a browser.
4. Change `background-color` in the `.notice` rule and refresh the page.
5. Add another declaration to `.tips`, making sure to include a colon and a semicolon.
6. Temporarily misspell one property name, observe that the intended style is not applied, then correct it.
7. Add `h3` to the selector list and add an `h3` element to the HTML to see that the shared rule applies to it too.

## Related lesson

[Read lesson 02 - CSS syntax and rulesets](../lessons/02-css-syntax-and-rulesets.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [01 - Introduction to CSS](01-introduction-to-css.md) | [Lesson](../lessons/02-css-syntax-and-rulesets.md) | [Q&A](../qnas/02-css-syntax-and-rulesets.md) | [03 - Connecting CSS to HTML](03-connecting-css-to-html.md) |
