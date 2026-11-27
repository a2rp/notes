# 03 - JavaScript engines and runtime environments - Example

## Goal

Compare two places where JavaScript can run:

- A browser page, where the host provides a document API.
- Node.js, where the host provides process information.

Both programs use the same JavaScript calculation. Their environment-specific APIs differ.

## Question

Why does adding two numbers work in both programs, while the browser page API in one program is unavailable in a regular Node.js script?

## Example 1: JavaScript in a browser page

Copy this complete code block into a file named **browser-example.html**, then open it in a browser.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript in a Browser Runtime</title>
</head>
<body>
  <main>
    <h1>Browser runtime example</h1>
    <p id="browser-result">Waiting for JavaScript...</p>
  </main>

  <script>
    const result = 2 + 3;
    const output = document.querySelector("#browser-result");

    output.textContent = "Core language calculation: " + result;
    console.log("Browser page result: " + result);
  </script>
</body>
</html>
~~~

### Expected browser result

The page displays:

> Core language calculation: 5

The browser developer console displays:

~~~text
Browser page result: 5
~~~

The addition and string combination use the JavaScript language. The document lookup and page update use APIs supplied by the browser.

## Example 2: JavaScript in Node.js

Copy this code into a file named **node-example.js**.

~~~js
const result = 2 + 3;

console.log("Core language calculation: " + result);
console.log("Runtime: Node.js");
console.log("Node.js version: " + process.version);
~~~

Open a terminal in the folder containing the file and run:

~~~text
node node-example.js
~~~

This requires Node.js to be installed. The next chapter explains how to prepare an editor, terminal, and project folder.

### Expected terminal result

The first two lines are:

~~~text
Core language calculation: 5
Runtime: Node.js
~~~

The third line shows the Node.js version installed on the computer, for example:

~~~text
Node.js version: v<installed-version>
~~~

The exact version value depends on the installed Node.js release.

## Compare the programs

| Feature | Browser page | Node.js program |
| --- | --- | --- |
| JavaScript engine | Supplied as part of the browser | V8 is used by Node.js |
| Runtime environment | Browser and web platform | Node.js |
| Host-specific API in this example | The document API updates the page | The process API reports the runtime version |
| Output location | Page and browser developer console | Terminal |
| Shared language work | Adds 2 and 3, combines values into text | Adds 2 and 3, combines values into text |

The JavaScript expression **2 + 3** means the same operation in both environments. The host-specific APIs differ.

## What this demonstrates

### The engine runs JavaScript

The engine processes the source code and performs JavaScript language operations. The example does not need to know whether the engine uses an interpreter, compilation, or optimization internally.

### The host supplies APIs

The browser provides the document object used to find and update a page element. Node.js provides the process object used to inspect Node.js information.

The language and the host APIs work together, but they are separate parts of the execution environment.

### Runtime and engine names are different

In the browser example, the program is running in a browser runtime. The engine is one component of that browser. In the terminal example, Node.js is the runtime and it uses V8 as its JavaScript engine.

Application code usually relies on the runtime's documented APIs. It should not depend on private engine implementation details.

## Try a small change

1. Change the calculation in both examples from 2 + 3 to 10 + 4.
2. Change the browser page text, then reload the page.
3. Change the Node.js message, then run the terminal command again.
4. Copy the browser code into a regular Node.js file. Notice that a page document is not available by default.
5. Copy the Node.js process expression into a browser script. Notice that a browser page should not assume the Node.js process API exists.

## Troubleshooting

- **The browser page still says it is waiting:** Check that the script block was copied and that the browser console has no syntax error.
- **The browser reports that document is missing:** Make sure the code is running in a browser page or an environment that supplies a document.
- **The terminal says node is not recognized:** Node.js may not be installed or the terminal may need to be restarted after installation. Setup is covered in the next chapter.
- **The Node.js version differs from the example:** This is expected. The program reports the version installed on your computer.

## Key ideas shown

- One JavaScript language can run in different environments.
- A JavaScript engine executes the language, and a runtime supplies host features.
- The browser page API and Node.js process API come from different hosts.
- The same core calculation can work in both environments.
- The engine's internal execution strategy is not something an introductory program needs to manage.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [02 - JavaScript on the web: HTML, CSS, and JavaScript roles](../lessons/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [Open lesson](../lessons/003-javascript-engines-and-runtime-environments.md) | [Open Q&A](../qnas/003-javascript-engines-and-runtime-environments.md) | [04 - Set up the editor, terminal, and project files](../lessons/004-set-up-the-editor-terminal-and-project-files.md) |
