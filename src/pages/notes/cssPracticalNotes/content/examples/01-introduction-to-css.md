# Example 01 - Introduction to CSS

## Question

Create a complete HTML page and a separate CSS stylesheet for a simple introduction card. Use the HTML to describe the content and the CSS to style its presentation. The page should remain readable on a narrow screen.

## HTML file: `index.html`

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My First CSS Page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="profile-card">
      <p class="profile-card__label">My first CSS example</p>
      <h1>Styles bring structure to life</h1>
      <p>
        HTML gives this page its content and meaning. CSS changes how that
        content looks without changing what it means.
      </p>
      <p class="profile-card__note">
        This card is a simple example of HTML and CSS working together.
      </p>
    </main>
  </body>
</html>
~~~

## CSS file: `styles.css`

~~~css
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

.profile-card {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
}

.profile-card__label {
  margin: 0 0 0.5rem;
  color: #0f766e;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
  line-height: 1.2;
}

p {
  margin: 0 0 1rem;
}

.profile-card__note {
  margin-bottom: 0;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.9rem;
}
~~~

## Expected output

The page has a pale gray background and a white introduction card centered in the available space. The card has a thin border, rounded corners, and comfortable spacing. Its small uppercase label is teal, its main heading is prominent, and the final paragraph is separated by a light top border. On a narrow screen, the card uses the available width while the body keeps space at the sides.

The browser displays the page title in its tab. The HTML content remains the same if the CSS file is temporarily disconnected; only the presentation changes. This Markdown file displays the code as text and does not run it.

## Explanation

- `<!doctype html>` asks the browser to use modern HTML parsing rules.
- The `head` contains document information. The character encoding and viewport declarations help the document work with text and narrow screens, and `title` sets the browser tab title.
- `<link rel="stylesheet" href="styles.css">` connects the HTML document to the CSS file. Keep both files in the same folder so this relative path points to the stylesheet.
- `<main>` groups the page's primary content. The heading and paragraphs describe the card's content and meaning.
- The `profile-card` class gives CSS a way to select the card. The `profile-card__label` and `profile-card__note` classes let the stylesheet style those paragraphs differently.
- The `*` selector matches every element. `box-sizing: border-box` makes an element's declared width include its padding and border, which helps the card fit within the available width.
- The `body` rule sets the page's general text style, colors, outer spacing, and line spacing.
- `.profile-card` selects the element with the `profile-card` class. Its width and maximum width let it fill small screens while staying limited on wider screens. Automatic left and right margins center it.
- `padding`, `background-color`, `border`, and `border-radius` add space and visual shape to the card.
- The `h1` rule styles the main heading. The `p` rule gives paragraphs consistent spacing. The more specific class selectors provide adjustments for the label and note.
- Properties such as `color`, `font-size`, and `font-weight` affect presentation. They do not change the HTML roles of the paragraph or heading elements.

## How to try it

1. Create a folder and save the first code block as `index.html`.
2. In the same folder, save the second code block as `styles.css`.
3. Open `index.html` in a browser.
4. Change the card's `background-color` or `border-radius` in `styles.css`, save, and refresh the page.
5. Temporarily change the stylesheet path in the `link` element to see the HTML with the browser's default styles. Restore `styles.css` when finished.

## Related lesson

[Read lesson 01 - Introduction to CSS](../lessons/01-introduction-to-css.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
|  | [Lesson](../lessons/01-introduction-to-css.md) | [Q&A](../qnas/01-introduction-to-css.md) | [02 - CSS syntax and rulesets](02-css-syntax-and-rulesets.md) |
