# 01 - Introduction to JavaScript: Example

## Goal

Create a small web page that asks for a name and displays a greeting when the visitor presses a button. This demonstrates the basic idea of a program receiving input, processing it, and producing visible output.

## Question

What changes when a visitor enters a name and activates the button? What should happen if the name field is left empty?

## Complete example

Copy the full code block into a file named `index.html`. GitHub displays this code as text. Its code block provides a copy button; the Markdown page does not run the HTML.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My First JavaScript Interaction</title>
</head>
<body>
  <main>
    <h1>A first JavaScript interaction</h1>

    <label for="name">Your name</label>
    <input id="name" name="name" type="text">

    <button id="greet" type="button">Show greeting</button>

    <p id="message" aria-live="polite">Your greeting will appear here.</p>
  </main>

  <script>
    const nameInput = document.querySelector("#name");
    const greetButton = document.querySelector("#greet");
    const message = document.querySelector("#message");

    greetButton.addEventListener("click", function () {
      const name = nameInput.value.trim();

      if (name === "") {
        message.textContent = "Please enter your name first.";
        return;
      }

      message.textContent = "Hello, " + name + "! Welcome to JavaScript.";
    });
  </script>
</body>
</html>
~~~

## Expected result

When the page first opens, it shows:

- A heading: **A first JavaScript interaction**
- A **Your name** text field
- A **Show greeting** button
- A message: **Your greeting will appear here.**

If the visitor types **Riya** and presses the button, the message becomes:

> Hello, Riya! Welcome to JavaScript.

If the visitor leaves the field empty and presses the button, the message becomes:

> Please enter your name first.

## How the example works

### 1. HTML provides the page elements

The heading, label, input, button, and paragraph are HTML. The input receives text from the visitor. The paragraph is where the program will display a response.

The label's `for` value matches the input's `id`, so the label is associated with the field. The paragraph uses `aria-live="polite"` so assistive technology can be notified when its text changes.

### 2. JavaScript finds the elements

The three `document.querySelector()` calls find the input, button, and message paragraph by their IDs. Each result is stored so the program can use that element later.

The `document` object is provided here by the browser because this code runs as part of a web page.

### 3. JavaScript waits for a click

`addEventListener("click", ...)` asks the browser to run a function when the button is clicked. The instructions inside that function do not run until the click event happens.

### 4. The program reads and processes input

`nameInput.value` reads the text currently in the field. `trim()` removes spaces from the beginning and end, so a field containing only spaces is treated as empty.

The `if` statement checks whether the cleaned value is an empty string. If it is, the program displays a helpful message and `return` stops the function there.

### 5. The program produces output

When a name is present, the program joins it with the greeting text and assigns the result to `message.textContent`. The browser then shows the updated paragraph.

`textContent` treats the entered name as plain text. It does not interpret the name as HTML markup.

## Input, processing, and output in this example

| Stage | What happens |
| --- | --- |
| Input | The visitor types a name in the text field. |
| Processing | JavaScript removes extra spaces and checks whether the result is empty. |
| Output | JavaScript changes the message paragraph to show a greeting or an instruction. |

## View the example locally

1. Copy the complete code block.
2. Create a new file named `index.html` in a folder on your computer.
3. Paste the code into the file and save it.
4. Open `index.html` in a browser.
5. Try a name, then try an empty field.

No build tool or network connection is required for this small example. The Markdown file itself displays the source code and expected behavior.

## Try a small change

1. Change the greeting text to say **Nice to meet you**.
2. Change the empty-field message to something helpful in your own words.
3. Enter a name with spaces before and after it. Notice that `trim()` removes those outside spaces.
4. Try entering text that looks like HTML. It should be shown as text because the program updates `textContent`.

## Key ideas shown

- A web page can provide input through a form control.
- JavaScript can respond to a browser event.
- A program can inspect input, make a decision, and update output.
- The browser provides the `document` API used to find and update page elements.
- The JavaScript language runs inside an environment that supplies APIs.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| - | [Open lesson](../lessons/001-introduction-to-javascript.md) | [Open Q&A](../qnas/001-introduction-to-javascript.md) | [02 - JavaScript on the web: HTML, CSS, and JavaScript roles](../lessons/002-javascript-on-the-web-html-css-and-javascript-roles.md) |
