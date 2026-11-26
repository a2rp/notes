# Example 02 - How HTML fits into a web page

## Question

Create a complete page that shows the different jobs of HTML, CSS, and JavaScript. Include an HTML disclosure that works without JavaScript and a button that updates a message.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Three Parts of a Web Page</title>
    <style>
      body {
        margin: 0;
        padding: 2rem 1rem;
        background: #f3f4f6;
        color: #1f2937;
        font-family: system-ui, sans-serif;
        line-height: 1.6;
      }

      main {
        max-width: 44rem;
        margin: 0 auto;
        padding: 2rem;
        background: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 0.75rem;
      }

      h1,
      h2 {
        line-height: 1.2;
      }

      details {
        margin-block: 1.5rem;
        padding: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
      }

      summary {
        font-weight: 600;
        cursor: pointer;
      }

      button {
        padding: 0.65rem 1rem;
        border: 0;
        border-radius: 0.4rem;
        background: #155eef;
        color: #ffffff;
        font: inherit;
        cursor: pointer;
      }

      button:focus-visible {
        outline: 3px solid #93c5fd;
        outline-offset: 2px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Three parts of a web page</h1>
      <p>A browser brings document structure, presentation, and behavior together.</p>

      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading">Who does what?</h2>
        <ul>
          <li><strong>HTML</strong> describes the content and its structure.</li>
          <li><strong>CSS</strong> controls the page's presentation and layout.</li>
          <li><strong>JavaScript</strong> adds behavior and logic.</li>
        </ul>
      </section>

      <details>
        <summary>Open a note about HTML</summary>
        <p>This disclosure opens and closes using built-in HTML behavior.</p>
      </details>

      <section aria-labelledby="interaction-heading">
        <h2 id="interaction-heading">Add a behavior</h2>
        <p id="status" aria-live="polite">The button has not been clicked.</p>
        <button type="button" id="update-status">Update the message</button>
      </section>
    </main>

    <script>
      const statusMessage = document.querySelector("#status");
      const updateButton = document.querySelector("#update-status");

      updateButton.addEventListener("click", () => {
        statusMessage.textContent = "The button was clicked.";
      });
    </script>
  </body>
</html>
~~~

## Expected output

The browser tab is titled **Three Parts of a Web Page**. The page shows a centered white panel with a heading, a short introduction, and a list describing HTML, CSS, and JavaScript. A bordered disclosure can be opened and closed. Below it, a button changes the status message from **The button has not been clicked.** to **The button was clicked.**

The browser applies the CSS styles in the `style` element. The disclosure works using native HTML behavior. The button's message changes because the JavaScript in the `script` element responds to its click.

## Explanation

- The HTML document supplies the content and structure: headings, paragraphs, sections, a list, a disclosure, and a button.
- The `style` element contains CSS rules. They set the page colors, spacing, panel width, borders, and button appearance. These rules change presentation, not the meaning of the HTML elements.
- The `details` and `summary` elements provide a disclosure that the browser can open and close without JavaScript.
- The `script` element contains JavaScript. `querySelector()` finds the message and button elements, then `addEventListener()` responds to a button click.
- `textContent` changes the message paragraph's text. The `aria-live="polite"` attribute lets assistive technology know that the text can update.
- The code is displayed here in a Markdown code block. It is not executed in this file.

## How to try it

Copy the code block with its copy button, save it as `index.html`, and open the file in a browser. Open the disclosure, then select the button. To compare the roles, remove the `style` element and look at the changed appearance. The HTML content remains. Remove the `script` element and select the button again. The button remains, but the message no longer changes. The disclosure still works.

## Related lesson

[Read lesson 02 - How HTML fits into a web page](../lessons/02-html-css-and-javascript.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [01 - Introduction to HTML](01-introduction-to-html.md) | [Lesson](../lessons/02-html-css-and-javascript.md) | [Q&A](../qnas/02-html-css-and-javascript.md) | [03 - The basic HTML document](03-basic-html-document.md) |
