# 02 - JavaScript on the web: HTML, CSS, and JavaScript roles - Example

## Goal

Build a complete page that makes the responsibility of HTML, CSS, and JavaScript visible:

- HTML provides meaningful content and a button.
- CSS styles the content and the button's focus state.
- JavaScript responds to the button and updates a message.

## Question

Which parts of the page define its structure, which parts control its appearance, and which part defines the custom action?

## Complete example

Copy this full code block into a file named **index.html**. The code block has a copy button in GitHub. This Markdown page shows the code and expected result; it does not run the HTML.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>One Page, Three Roles</title>

  <style>
    body {
      margin: 0;
      padding: 2rem;
      background-color: #f1f5f9;
      color: #172033;
      font-family: system-ui, sans-serif;
    }

    main {
      max-width: 42rem;
      margin-inline: auto;
    }

    .card {
      padding: 1.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background-color: white;
    }

    button {
      padding: 0.7rem 1rem;
      border: 0;
      border-radius: 0.4rem;
      background-color: #174ea6;
      color: white;
      font: inherit;
      cursor: pointer;
    }

    button:hover {
      background-color: #103b80;
    }

    button:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 3px;
    }

    #status {
      min-height: 1.5em;
    }
  </style>
</head>
<body>
  <main>
    <section class="card" aria-labelledby="page-title">
      <h1 id="page-title">One page, three roles</h1>
      <p>
        HTML gives this page structure. CSS styles it. JavaScript responds
        when you activate the button.
      </p>

      <button id="update-button" type="button">Update the message</button>
      <p id="status" aria-live="polite">The page is ready.</p>
    </section>
  </main>

  <script>
    const updateButton = document.querySelector("#update-button");
    const status = document.querySelector("#status");
    let clickCount = 0;

    updateButton.addEventListener("click", function () {
      clickCount = clickCount + 1;
      status.textContent = "Button activated. Click count: " + clickCount + ".";
    });
  </script>
</body>
</html>
~~~

## Expected result

When the page opens, the browser shows a centered white card on a light background. It contains a heading, a short explanation, a blue button, and the initial status message:

**The page is ready.**

After the visitor activates **Update the message** once, the status becomes:

**Button activated. Click count: 1.**

Each additional activation increases the count. The button also changes appearance when the pointer is over it, and it shows a visible outline when reached with keyboard focus.

## How the example works

### HTML provides meaning and structure

The main element identifies the page's primary content. The section groups the related content, and its aria-labelledby value connects it to the heading.

The button is a real button with a clear label and a type of button, so it does not submit a form accidentally. The status paragraph starts with useful text and has aria-live="polite" so assistive technology can be informed when the text changes.

### CSS controls appearance

The style element contains CSS rules:

- The body rule sets page spacing, background, text color, and font.
- The main rule limits the content width and centers it.
- The card class adds a border, rounded corners, padding, and a white background.
- The button rules define its size, color, pointer state, hover appearance, and keyboard focus outline.
- The status rule reserves space for its message.

These visual rules can be changed without changing the meaning of the page elements or the JavaScript click handler.

### JavaScript implements the custom response

The script uses the browser's document API to find the button and status paragraph. It stores those element references in constants.

The clickCount variable remembers how many times the button has been activated. The event listener asks the browser to run its function after a click. Inside the function, JavaScript increments the count and updates the paragraph's text.

The browser then displays the new text. JavaScript changes the page through the DOM API; it does not replace the role of the HTML document or the CSS stylesheet.

## Identify each role

| Page detail | Technology | Reason |
| --- | --- | --- |
| The heading, paragraph, button, and status message | HTML | These define content, controls, and document structure. |
| The background, spacing, card, colors, and focus outline | CSS | These rules control presentation and visual states. |
| Counting clicks and changing the status text | JavaScript | This logic responds to an event and updates page content. |
| Showing the changed status in the browser | Browser | The browser applies the page and renders the DOM update. |

## View it locally

1. Copy the complete code block.
2. Create a new folder on your computer.
3. Create **index.html** inside that folder.
4. Paste the code and save the file.
5. Open the file in a browser.
6. Click the button several times. Also use the Tab key to reach the button and observe its focus outline.

No build tool, package, or network connection is needed. The Markdown file displays the source and expected behavior.

## Try changing it

1. Change the heading text in the HTML.
2. Change the card background color in the CSS.
3. Change the button's hover color.
4. Change the JavaScript status message.
5. Remove the CSS and observe which behavior still works.
6. Remove the JavaScript and observe which content and native button control remain.

## Key ideas shown

- HTML describes the page's content, structure, and controls.
- CSS controls the page's appearance and focus or hover styles.
- JavaScript listens for a browser event, keeps simple state, and changes page text.
- The browser supplies the DOM API used by this JavaScript.
- Clear HTML, visible focus styling, and an announced status update all contribute to a more usable interaction.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [01 - Introduction to JavaScript](../lessons/001-introduction-to-javascript.md) | [Open lesson](../lessons/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [Open Q&A](../qnas/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [03 - JavaScript engines and runtime environments](../lessons/003-javascript-engines-and-runtime-environments.md) |
