# 02 - JavaScript on the web: HTML, CSS, and JavaScript roles

A browser page can use HTML, CSS, and JavaScript together. They work with the same page, but each technology has a different primary job: HTML describes meaningful content, CSS controls how it is presented, and JavaScript adds programmatic behavior.

This chapter explains those roles, how they connect in a browser, and how to decide which technology should handle a task.

## Learning goals

After this chapter, you should be able to:

- Explain the primary role of HTML, CSS, and JavaScript.
- Identify when a page task belongs to one technology or involves all three.
- Describe the DOM as the browser's representation of a document that scripts can interact with.
- Explain why a page should remain understandable when styling or scripting is unavailable.
- Organize a small page into HTML, CSS, and JavaScript files.

## The three technologies at a glance

| Technology | Primary responsibility | Examples |
| --- | --- | --- |
| HTML | Content, structure, and meaning | Headings, paragraphs, links, forms, buttons |
| CSS | Presentation and layout | Color, spacing, typography, responsive layout |
| JavaScript | Program behavior and data processing | Responding to events, checking input, updating content |

These are primary responsibilities, not walls that prevent technologies from working together. A browser has built-in behaviors for HTML controls, CSS can style interaction states, and JavaScript can work with both the document and its styles.

## HTML describes the document

HTML uses elements to describe the kinds of content on a page and how that content is organized. A heading should be marked as a heading, a link as a link, and a form control as a control.

For example:

~~~html
<main>
  <h1>Daily update</h1>
  <p>The library opens at 9 a.m.</p>
  <button type="button">Show another update</button>
</main>
~~~

The browser can identify the page's main content, heading, paragraph, and button from their elements. Meaningful HTML also gives browsers, assistive technologies, and other tools useful information about the document.

Many useful interactions already come from native HTML and browser behavior. A link can navigate to another page, a button can be activated with a keyboard, and a form can submit data. JavaScript is not required for every control or interaction.

## CSS controls presentation

CSS describes visual rules for HTML elements. It can affect layout, spacing, colors, borders, fonts, responsive behavior, and visual states.

~~~css
button {
  border: 0;
  border-radius: 0.4rem;
  padding: 0.65rem 1rem;
  background-color: #174ea6;
  color: white;
  font: inherit;
}

button:hover {
  background-color: #103b80;
}
~~~

These rules change how the button looks. The HTML button still supplies the control and its built-in interaction. CSS can show visual states such as hover and focus, but application decisions and data processing generally belong in JavaScript or on a server.

A page should keep enough structure and meaning in HTML that its content remains useful without the stylesheet. CSS should improve presentation, not be the only place essential content exists.

## JavaScript adds program behavior

JavaScript can read page information, react to events, make decisions, process data, and update the page.

~~~js
const showMessageButton = document.querySelector("#show-message");
const message = document.querySelector("#message");

showMessageButton.addEventListener("click", function () {
  message.textContent = "JavaScript changed this message.";
});
~~~

This code finds two existing HTML elements. It then asks the browser to run a function when the button is clicked. The function changes the paragraph's text.

The browser provides the **document** and event APIs used here. They are part of the browser environment, not the core JavaScript language itself. Chapter 03 introduces JavaScript engines and runtime environments; later chapters cover the DOM and events in detail.

## How the parts connect

A simplified browser page works like this:

1. The browser receives and reads the HTML document.
2. HTML elements become a document structure that the browser can work with.
3. The browser applies CSS rules to matching elements and presents the page.
4. JavaScript can use browser APIs to respond to events or update the document.
5. After a document update, the browser can display the updated page.

The browser handles much of this work for you. When you write front-end JavaScript, you usually interact with page elements through the Document Object Model, commonly called the DOM. The DOM represents the document as objects connected in a tree. It is a browser programming interface for documents, not another name for the JavaScript language.

A JavaScript update to the DOM can change what the browser displays. CSS can then style the elements and states that are present. These technologies cooperate while keeping their different responsibilities clear.

## One small page using all three

The same button can be described in each technology:

### HTML: provide the content and control

~~~html
<button id="show-message" type="button">Show message</button>
<p id="message" aria-live="polite">No message yet.</p>
~~~

### CSS: provide the visual treatment

~~~css
#show-message {
  padding: 0.65rem 1rem;
  border: 1px solid #174ea6;
  border-radius: 0.4rem;
  background-color: #174ea6;
  color: white;
  font: inherit;
}
~~~

### JavaScript: provide the custom response

~~~js
const button = document.querySelector("#show-message");
const message = document.querySelector("#message");

button.addEventListener("click", function () {
  message.textContent = "The button was clicked.";
});
~~~

When these parts are connected in a browser page, HTML provides a button and a paragraph, CSS styles the button, and JavaScript changes the paragraph after a click.

The paragraph has aria-live="polite" so assistive technology can be informed about the updated message. Accessible behavior starts with suitable HTML and continues through careful styling and scripting.

## Organize a small project

A small project can keep each responsibility in a separate file:

~~~text
my-page/
  index.html
  styles.css
  app.js
~~~

The HTML document can connect the files:

~~~html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
    <button id="show-message" type="button">Show message</button>
    <p id="message">No message yet.</p>
  </main>

  <script src="app.js"></script>
</body>
~~~

The stylesheet link tells the browser which CSS file to apply. The script element tells it which JavaScript file to load. In this simple example, the script appears after the page elements it uses. Script loading strategies are covered in a later lesson.

Keeping files separate can make a project easier to read and maintain. A tiny demonstration may use embedded CSS or JavaScript, but a growing page benefits from a clear organization.

## Choosing the right tool

Ask what the task is meant to accomplish:

- **Describe meaningful content or structure?** Use HTML.
- **Change visual appearance or layout?** Use CSS.
- **React to data or events, make a decision, or perform a custom action?** Use JavaScript.
- **Can a browser control already do the task?** Prefer the built-in HTML behavior when it fits.
- **Does the result need to be trusted or protected?** Enforce important rules on the server as well.

Some tasks cross boundaries. For example, an accessible button needs HTML, visual focus styles need CSS, and a custom response to activation may need JavaScript.

## Progressive enhancement

Start with meaningful content and structure. Add CSS to make it easier to read and use. Add JavaScript when a custom behavior improves the experience.

This approach helps because:

- Content remains understandable if styling does not load.
- Native links and controls remain available where they fit the task.
- JavaScript can enhance a working page instead of being the only way to reveal essential information.
- Each layer can be inspected and debugged on its own.

Some applications depend on JavaScript for their main purpose. Even then, clear document structure, useful status messages, keyboard support, and accessible names remain important.

## Common mistakes

| Mistake | Better approach |
| --- | --- |
| Using a generic element when a meaningful HTML element fits | Choose elements by meaning and purpose. |
| Using CSS to hide essential content until JavaScript adds it | Put essential content in the HTML where possible. |
| Using a clickable paragraph as a substitute for a button | Use a real button so browser and keyboard behavior work as expected. |
| Using JavaScript only to reproduce a built-in link or control | Use native HTML behavior when it meets the requirement. |
| Putting all markup, styling, and logic into one large file as a project grows | Separate HTML, CSS, and JavaScript to make responsibilities easier to find. |
| Assuming the DOM is part of the JavaScript language | Treat the DOM as a browser API that JavaScript can use. |
| Checking important submitted data only in the browser | Validate it again on the server that receives it. |

## A practical debugging guide

When something does not work, first identify its responsibility:

- **The content or element is missing:** inspect the HTML.
- **The element exists but looks wrong:** inspect the CSS and the rules that match it.
- **The custom action does not happen:** inspect the JavaScript and the browser console.
- **The script cannot find an element:** check the element's selector and whether the script runs after the element is available.
- **The update appears but assistive technology does not announce it:** inspect the semantic HTML and accessible status pattern.

Changing one layer at a time makes the source of a problem easier to identify.

## Try it yourself

1. In the small page example, identify which lines provide HTML, which provide CSS, and which provide JavaScript.
2. Change the button label in HTML. Does the click behavior still work?
3. Change a button color in CSS. Does its JavaScript behavior change?
4. Change the message in JavaScript. Does the button's HTML structure change?
5. Remove the CSS rules and describe which parts of the page still work.
6. Explain why a real button is a better fit than a clickable paragraph.
7. Add a heading and a short explanation in HTML so the page makes sense before the user clicks.
8. Think of a feature on a website and name one HTML, CSS, and JavaScript responsibility it might involve.

## Key points

- HTML describes content, structure, and meaning.
- CSS controls presentation and layout.
- JavaScript provides custom behavior and processes data.
- Browsers provide the DOM and other Web APIs that JavaScript can use.
- Native HTML links, buttons, and forms already provide useful behavior.
- A page is easier to maintain when each technology has a clear responsibility.
- Essential content should remain understandable when styling or scripting is unavailable.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [01 - Introduction to JavaScript](001-introduction-to-javascript.md) | [Open Q&A](../qnas/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [Open example](../examples/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [03 - JavaScript engines and runtime environments](003-javascript-engines-and-runtime-environments.md) |
