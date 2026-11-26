# Example 04 - Stylesheets, Comments, and Organization

## Question

Create a small, complete page and organize its CSS into readable sections. Use comments to label groups and to explain one design decision. Keep related component rules together in a single stylesheet.

## Project structure

Both files for this small page live in one folder:

```text
organized-stylesheet-example/
  index.html
  styles.css
```

## HTML file: `index.html`

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Organized Stylesheet</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="site-header">
      <p class="site-name">CSS Field Notes</p>
      <p class="site-tagline">A small guide to clear stylesheets</p>
    </header>

    <main class="page">
      <section class="introduction" aria-labelledby="page-title">
        <p class="eyebrow">Stylesheet practice</p>
        <h1 id="page-title">Keep related styles easy to find</h1>
        <p class="introduction-text">
          A clear stylesheet helps you understand a page and make changes
          without searching through unrelated rules.
        </p>
      </section>

      <section class="principles" aria-labelledby="principles-title">
        <h2 id="principles-title">Three useful habits</h2>

        <article class="principle-card">
          <h3 class="principle-title">Use a consistent format</h3>
          <p>Put each declaration on its own line and indent it consistently.</p>
        </article>

        <article class="principle-card">
          <h3 class="principle-title">Group related rules</h3>
          <p>Keep the styles for one component together when practical.</p>
        </article>

        <article class="principle-card">
          <h3 class="principle-title">Comment with a purpose</h3>
          <p>Explain intent or constraints that are not obvious from the code.</p>
        </article>
      </section>

      <footer class="page-footer">
        <p>Clear code is easier to revisit and improve.</p>
      </footer>
    </main>
  </body>
</html>
~~~

## CSS file: `styles.css`

~~~css
/* Base styles shared by the whole page */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #f1f5f9;
  color: #1f2937;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

h1,
h2,
h3 {
  color: #164e63;
}

/* Site header */
.site-header {
  padding: 1rem;
  background-color: #164e63;
  color: #ffffff;
  text-align: center;
}

.site-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
}

.site-tagline {
  margin: 0.25rem 0 0;
}

/* Main page layout */
.page {
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.introduction {
  margin-bottom: 2rem;
}

/* Keep the text measure comfortable on wide screens. */
.introduction-text {
  max-width: 42rem;
  font-size: 1.125rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #0f766e;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: 2.25rem;
  line-height: 1.2;
}

/* Principle cards */
.principles > h2 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}

.principle-card {
  margin-bottom: 1rem;
  padding: 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background-color: #ffffff;
}

.principle-title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}

.principle-card p {
  margin: 0;
}

/* Page footer */
.page-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #cbd5e1;
  color: #475569;
}

.page-footer p {
  margin: 0;
}
~~~

## Expected output

The browser tab is titled **Organized Stylesheet**. The page shows a dark teal header with centered white text, then a centered content column on a pale gray background. A small teal label appears above the main heading and introduction. Three white cards with borders and rounded corners describe stylesheet habits. A thin line separates the final note from the content above it.

The page layout and appearance come from `styles.css`. The comments do not appear in the browser and do not change the styles. This Markdown file shows the code as text and does not execute it.

## Explanation

### The stylesheet sections

The CSS file uses comments to divide related groups:

- **Base styles** set the box sizing and general document text and color.
- **Site header** groups the branding and tagline rules together.
- **Main page layout** sets the content column and introduction spacing.
- **Principle cards** groups the cards and their headings and text.
- **Page footer** keeps the footer rules together.

The section comments make it easier to scan the file. They do not need to describe every declaration.

### The comment that explains intent

```css
/* Keep the text measure comfortable on wide screens. */
.introduction-text {
  max-width: 42rem;
  font-size: 1.125rem;
}
```

The comment explains why the text has a maximum width. It adds context beyond the names of the property and value.

### Related rules stay together

The `.principle-card`, `.principle-title`, and `.principle-card p` rules are close to one another under the `Principle cards` section. When you need to adjust this component, its styles are easy to locate.

The `h1, h2, h3` rule is a selector list. It applies a shared heading color. The later `h1`, `.principles > h2`, and `.principle-title` rules provide heading-specific spacing and sizes.

### Why one CSS file is enough here

This example is a small page, so one well-organized external stylesheet is easy to follow. If the project later grows, you can split shared base rules from components or page-specific styles when that boundary makes the project easier to maintain. A separate file for every tiny group would add unnecessary navigation.

## How to try it

1. Save the HTML block as `index.html` and the CSS block as `styles.css` in the same folder.
2. Open `index.html` in a browser.
3. Change the `background-color` in the `body` rule and refresh the page.
4. Add a new card by copying an `article` element and changing its text.
5. Add a CSS rule for any new styling and place it near the related component rules.
6. Comment out one section comment and refresh. The page's appearance should not change because comments are ignored by the browser.
7. Write a comment that explains the reason for one style decision, then compare it with a comment that only repeats a property name.

## Related lesson

[Read lesson 04 - Stylesheets, comments, and organization](../lessons/04-stylesheets-comments-and-organization.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [03 - Connecting CSS to HTML](03-connecting-css-to-html.md) | [Lesson](../lessons/04-stylesheets-comments-and-organization.md) | [Q&A](../qnas/04-stylesheets-comments-and-organization.md) | [05 - CSS selector basics](05-selector-basics.md) |
