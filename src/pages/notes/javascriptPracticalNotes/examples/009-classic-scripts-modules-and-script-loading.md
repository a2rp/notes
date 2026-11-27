# 09 - Classic scripts, modules, and script loading: example

This example contains two small browser demos:

- A classic-script page that loads two dependent files with **defer**.
- A module page that imports functions from two other modules.

The module demo should be served from a local development server because browsers load modules using URLs and cross-origin rules.

## Project files

Create this folder structure:

~~~text
script-loading-practice/
  index.html
  main.js
  math.js
  greeting.js
  classic.html
  classic-first.js
  classic-second.js
~~~

## Module demo: HTML page

Create **index.html**:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Module script practice</title>
  <script type="module" src="./main.js"></script>
</head>
<body>
  <main>
    <h1>Module script practice</h1>
    <p id="module-output">Waiting for the module...</p>
  </main>
</body>
</html>
~~~

The **type="module"** attribute tells the browser to treat **main.js** as a module. Module scripts are deferred by default, so the body is parsed before **main.js** runs.

## Module demo: math.js

Create **math.js**:

~~~js
export function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
~~~

The **export** keyword makes **add** available to other modules.

## Module demo: greeting.js

Create **greeting.js**:

~~~js
export function formatGreeting(personName) {
  return "Hello, " + personName + "!";
}
~~~

This file exports a second function so the entry module can import from more than one dependency.

## Module demo: main.js

Create **main.js**:

~~~js
import { add } from "./math.js";
import { formatGreeting } from "./greeting.js";

const personName = "Asha";
const sum = add(4, 6);
const greeting = formatGreeting(personName);
const moduleOutput = document.getElementById("module-output");

moduleOutput.textContent = greeting + " The sum is " + sum + ".";

console.info("Module page loaded after HTML parsing.");
console.log("Sum from imported module:", sum);
console.log("Greeting from imported module:", greeting);
console.log(
  "Module binding is a window property:",
  "personName" in window
);
~~~

The relative import paths include **./** and the **.js** file extension. **main.js** uses the imported functions and updates the page element.

The module binding **personName** is not added as a property on **window**. It belongs to **main.js** module scope.

## Classic-script demo: HTML page

Create **classic.html**:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Classic script practice</title>
  <script defer src="./classic-first.js"></script>
  <script defer src="./classic-second.js"></script>
</head>
<body>
  <main>
    <h1>Classic script practice</h1>
    <p id="classic-output">Waiting for the scripts...</p>
  </main>
</body>
</html>
~~~

Both scripts use **defer**. The browser can fetch them while parsing the HTML, then runs them in document order after parsing has finished.

## Classic-script demo: classic-first.js

Create **classic-first.js**:

~~~js
var classicSharedMessage = "shared global value";
const classicLexicalMessage = "shared lexical value";

console.log("First classic script: loaded");
~~~

The first classic script declares a top-level **var** and a top-level **const**. Later classic scripts can refer to both bindings by name. The **var** binding also becomes a property of the page's global object.

## Classic-script demo: classic-second.js

Create **classic-second.js**:

~~~js
console.log("Second classic script can read:", classicSharedMessage);
console.log("Second classic script can read:", classicLexicalMessage);
console.log(
  "Top-level var is a window property:",
  window.classicSharedMessage === classicSharedMessage
);

document.getElementById("classic-output").textContent =
  "Both deferred classic scripts ran in document order.";
~~~

The second file runs after the first because both external classic scripts use **defer** and appear in this order.

## Run the module demo

1. Start a local development server in the project folder.
2. Open **index.html** through the server's local HTTP address.
3. Open DevTools and select the Console.
4. Reload the page if necessary.
5. Check the page message and Console output.

The page displays:

~~~text
Hello, Asha! The sum is 10.
~~~

The Console displays messages similar to:

~~~text
Module page loaded after HTML parsing.
Sum from imported module: 10
Greeting from imported module: Hello, Asha!
Module binding is a window property: false
~~~

The final **false** shows that **personName** is scoped to **main.js** instead of being placed on **window**.

## Run the classic-script demo

1. Open **classic.html** through the same local server.
2. Open the Console.
3. Reload the page.
4. Check that the first script message appears before the second script messages.
5. Read the text written into the page.

The page displays:

~~~text
Both deferred classic scripts ran in document order.
~~~

The Console displays messages similar to:

~~~text
First classic script: loaded
Second classic script can read: shared global value
Second classic script can read: shared lexical value
Top-level var is a window property: true
~~~

## Compare defer and async

In **classic.html**, temporarily change both **defer** attributes to **async**:

~~~html
<script async src="./classic-first.js"></script>
<script async src="./classic-second.js"></script>
~~~

Now the browser runs each script as soon as it becomes available. Their order is not guaranteed. Since the second file depends on values from the first, this is not a safe loading choice for these two files.

Restore **defer** after observing the difference. Use **async** for scripts that do not depend on another script's execution order.

## Try a module loading error

1. In **main.js**, temporarily change **"./math.js"** to **"./missing.js"**.
2. Reload **index.html** through the local server.
3. Read the Console and Network panel to find the failed module request.
4. Restore the correct path and reload again.

A module cannot run if one of its required dependencies cannot be loaded or linked.

## Try a classic-script loading error

1. In **classic.html**, temporarily remove **type="module"** from the module page's script element, or load **main.js** from a classic script element.
2. Observe the syntax error because static **import** declarations require module mode.
3. Restore **type="module"**.

Keep the two demos separate. The module files use static imports; the classic files share bindings through the page's classic-script environment.

## Key ideas shown

- **type="module"** tells the browser to load the entry file as a module.
- Module imports and exports make dependencies explicit.
- Module-level bindings do not automatically become properties on **window**.
- External classic scripts with **defer** run after parsing and in document order.
- External classic scripts with **async** have no guaranteed relative order.
- Module imports use relative URLs, so a local development server is useful.
- A missing module path prevents the importing module from running.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [08 - Identifiers, keywords, reserved words, and naming](../lessons/008-identifiers-keywords-reserved-words-and-naming.md) | [Open lesson](../lessons/009-classic-scripts-modules-and-script-loading.md) | [Open Q&A](../qnas/009-classic-scripts-modules-and-script-loading.md) | [10 - Variables: const, let, and var](../lessons/010-variables-const-let-and-var.md) |
