# 02 - JavaScript on the web: HTML, CSS, and JavaScript roles - Questions and Answers

Use these questions to check how HTML, CSS, and JavaScript work together in a browser page. Every answer appears directly after its question, with an explanation where it clarifies the reasoning.

## Multiple-choice questions

### 1. Which option correctly matches the primary roles of the three technologies?

A. HTML handles data storage, CSS handles server requests, JavaScript defines headings.  
B. HTML describes content and structure, CSS controls presentation, and JavaScript adds program behavior.  
C. HTML and CSS are programming languages that replace JavaScript.  
D. JavaScript describes semantic document structure, and HTML styles it.

**Answer: B. HTML describes content and structure, CSS controls presentation, and JavaScript adds program behavior.**

These are their primary roles. A browser page commonly combines all three, while browser APIs let JavaScript work with the document.

### 2. Which technology should describe that a piece of text is the main heading of a page?

A. HTML  
B. CSS  
C. JavaScript  
D. Node.js

**Answer: A. HTML.**

HTML gives content structure and meaning. CSS can make a heading look different, but the semantic heading element should come from HTML.

### 3. Which task is primarily a CSS task?

A. Change the background color and spacing of a button.  
B. Decide what message to show after a user submits a form.  
C. Describe a paragraph as page content.  
D. Send a request to a server.

**Answer: A. Change the background color and spacing of a button.**

CSS controls visual presentation, including colors and spacing. Program decisions and network requests are typically handled by JavaScript or a server.

### 4. Which task is primarily handled by JavaScript in a browser?

A. Define the page's main heading.  
B. Set a paragraph's font size.  
C. Respond to a click and update a message.  
D. Define the meaning of a link.

**Answer: C. Respond to a click and update a message.**

HTML provides the button and paragraph, CSS can style them, and JavaScript can provide a custom response to the click.

### 5. What is the DOM?

A. A CSS selector language  
B. A browser programming interface representing a document as objects  
C. The JavaScript language standard  
D. A server database

**Answer: B. A browser programming interface representing a document as objects.**

The DOM lets scripts and other browser features access and update a web document. It is a Web API, not the core JavaScript language.

### 6. Where does the browser provide the DOM APIs used to access a page?

A. In the browser environment  
B. In every JavaScript runtime by default  
C. In a CSS stylesheet  
D. In an image file

**Answer: A. In the browser environment.**

The DOM belongs to the web platform. A regular Node.js program does not have a browser document by default.

### 7. What is an advantage of using a real HTML button for an action?

A. It automatically performs any custom business logic.  
B. It provides a native control with built-in interaction behavior.  
C. It automatically sends data to any server.  
D. It replaces the need for CSS.

**Answer: B. It provides a native control with built-in interaction behavior.**

A button is a semantic control that can be activated with a keyboard and other input methods. JavaScript can add a custom response when one is needed.

### 8. What can the CSS pseudo-class **:hover** commonly do?

A. Run arbitrary JavaScript logic.  
B. Apply visual styles while a pointer is over an element.  
C. Validate data on a server.  
D. Change the HTML language standard.

**Answer: B. Apply visual styles while a pointer is over an element.**

CSS can represent visual states such as hover and focus. Custom application logic and data processing generally require JavaScript or server code.

### 9. When is JavaScript unnecessary for an interaction?

A. When a native link, button, or form already provides the behavior needed.  
B. Whenever the page contains HTML.  
C. Whenever a stylesheet is used.  
D. Whenever content has a heading.

**Answer: A. When a native link, button, or form already provides the behavior needed.**

Using a built-in browser behavior keeps the page simpler and gives users familiar interaction semantics.

### 10. What does progressive enhancement mean in this chapter?

A. Put all content in JavaScript, then add HTML and CSS later.  
B. Start with meaningful structure and content, then add presentation and useful behavior.  
C. Make the page depend on every browser API.  
D. Use CSS to replace semantic HTML.

**Answer: B. Start with meaningful structure and content, then add presentation and useful behavior.**

This layering helps make the page understandable and useful before optional styling and scripting enhancements are applied.

## True or false

### 11. The DOM is part of the core JavaScript language.

**Answer: False.**

The DOM is a browser Web API that JavaScript can use. Other JavaScript environments provide different APIs.

### 12. CSS can style focus and hover states without implementing the page's entire application behavior.

**Answer: True.**

CSS can change how an element looks in these states. JavaScript may still be needed for custom actions or decisions.

### 13. Every important piece of page content should be created by JavaScript.

**Answer: False.**

Essential content should usually be present in the HTML when possible. JavaScript can enhance the page, but content that exists only after a script runs may be unavailable if scripting fails or is disabled.

### 14. Meaningful HTML can help browsers and assistive technologies understand a page.

**Answer: True.**

Semantic elements describe the purpose of content and controls. They support accessibility and built-in browser behavior, though semantic HTML alone does not guarantee an accessible page.

### 15. If a button looks correct, its custom behavior must also be correct.

**Answer: False.**

CSS controls the button's appearance. JavaScript or built-in browser behavior controls what happens when it is activated.

### 16. A tiny demonstration must always use three separate files.

**Answer: False.**

A small demonstration can keep code together. Separating HTML, CSS, and JavaScript often makes a growing project easier to understand and maintain.

## Short-answer questions

### 17. What does HTML contribute to a web page?

**Answer:** HTML describes the document's content, structure, and meaning.

It identifies elements such as headings, paragraphs, links, buttons, and forms. The browser uses those elements to understand and present the page.

### 18. What does CSS contribute?

**Answer:** CSS describes presentation rules for HTML elements.

It controls features such as color, spacing, typography, borders, layout, responsive styling, and visual interaction states.

### 19. What does JavaScript contribute to a web page?

**Answer:** JavaScript can implement custom program behavior, process data, respond to events, and update the page through browser APIs.

The page's content and visual appearance still have their own roles in HTML and CSS.

### 20. What is one difference between the DOM and JavaScript?

**Answer:** JavaScript is a programming language. The DOM is a browser API that represents and exposes web documents to scripts.

A JavaScript program can use the DOM when it runs in an environment that provides those APIs.

### 21. Give an example of a task that uses all three technologies.

**Answer:** A message button can use HTML for the button and message paragraph, CSS for the button's appearance and focus state, and JavaScript to change the message when the button is activated.

The example works because each technology contributes a different part of the feature.

### 22. Why might a project keep its page, styles, and behavior in separate files?

**Answer:** Separate files make each responsibility easier to find, review, and change as the project grows.

A small tutorial may place code together to make the example easy to copy, but larger projects benefit from clear organization.

### 23. Why is a real button usually a better choice than a clickable paragraph?

**Answer:** A button communicates that the element is a control and provides built-in keyboard and interaction behavior.

A paragraph is meant for text content. Turning it into a control would require extra behavior and accessibility work.

## Scenario questions

### 24. You need to make all buttons use a larger text size and more padding. Which technology should you use, and why?

**Answer:** Use CSS, because text size and padding are presentation choices.

The HTML still describes the buttons, and their behavior can remain unchanged.

### 25. A button should update a status message when clicked. Which roles do the technologies have?

**Answer:** HTML provides the button and status message, CSS can style them, and JavaScript can respond to the click and update the message text.

The browser's DOM API allows the script to find and change the page elements.

### 26. A page's essential instructions are only added after JavaScript loads. What could go wrong?

**Answer:** The instructions may not be available if JavaScript fails to load, is disabled, or encounters an error.

Put essential content in the HTML where possible, then use JavaScript to enhance the page.

### 27. A developer wants a button to change color while it has keyboard focus, and to save a form after activation. Which technology is appropriate for each task?

**Answer:** CSS can provide the visual focus style. HTML supplies the button and form semantics, and JavaScript can implement a custom save action if native form submission does not meet the requirement.

This keeps presentation and program behavior in appropriate places.

### 28. The button appears on the page, but clicking it does not change the message. What should you inspect first?

**Answer:** Inspect the JavaScript and the browser console. Check that the script finds the correct button and message, and that the event handler is connected.

The button's appearance is controlled by CSS, so changing its color is unlikely to fix a missing click response.

## Code-reading questions

### 29. Which parts of this page provide structure, presentation, and behavior?

~~~html
<button id="show-message" type="button">Show message</button>
<p id="message">No message yet.</p>

<style>
  button {
    background-color: navy;
    color: white;
  }
</style>

<script>
  const message = document.querySelector("#message");
  document.querySelector("#show-message").addEventListener("click", function () {
    message.textContent = "The button was clicked.";
  });
</script>
~~~

**Answer:** The button and paragraph are HTML structure, the rules inside the style element are CSS presentation, and the click handler is JavaScript behavior.

The script uses the browser's DOM API to find the paragraph and update its text.

### 30. If the CSS block is removed from the previous example, what should happen to the button's custom click behavior?

**Answer:** The custom click behavior should still work, though the button's visual styling will change.

CSS and JavaScript have separate responsibilities here. Removing the styling does not remove the JavaScript event handler.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [01 - Introduction to JavaScript](../lessons/001-introduction-to-javascript.md) | [Open lesson](../lessons/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [Open example](../examples/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [03 - JavaScript engines and runtime environments](../lessons/003-javascript-engines-and-runtime-environments.md) |
