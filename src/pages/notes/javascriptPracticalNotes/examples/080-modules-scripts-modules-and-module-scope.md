# 80 - Modules: scripts, modules, and module scope example

This small browser project uses three JavaScript modules. It demonstrates an HTML module entry point, named and default exports, aliased imports, module-local declarations, and a live imported binding that changes when another module updates it.

## Goal

Build and run a tiny page from JavaScript modules, then trace how the browser loads the entry module and its dependencies.

## Project files

Create these files in one folder:

~~~text
module-example/
  index.html
  main.js
  greetings.js
  counter.js
~~~

## 1. Create the HTML page

Save this as **index.html**:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>JavaScript module example</title>
  </head>
  <body>
    <main>
      <h1>Module example</h1>
      <p id="message"></p>
      <p>Clicks: <output id="count">0</output></p>
      <button id="count-button" type="button">Count clicks</button>
    </main>

    <script type="module" src="./main.js"></script>
  </body>
</html>
~~~

The browser treats **main.js** as a module because of `type="module"`. Its imported dependencies are loaded as modules too. The browser defers this module by default until it has finished parsing the document.

## 2. Create a module with named and default exports

Save this as **greetings.js**:

~~~js
export function greet(name) {
  return 'Hello, ' + name + '!';
}

export default function formatMessage(message) {
  return 'Message: ' + message;
}
~~~

The module exports `greet` by name and provides `formatMessage` as its default export.

## 3. Create a module with an updateable export

Save this as **counter.js**:

~~~js
export let clickCount = 0;

export function incrementClickCount() {
  clickCount += 1;
}
~~~

The exported `clickCount` is a live binding. Importers can read its current value, while only this exporting module updates it.

## 4. Import the modules and connect the button

Save this as **main.js**:

~~~js
import formatMessage, { greet as createGreeting } from './greetings.js';
import { clickCount, incrementClickCount } from './counter.js';

const message = createGreeting('Maya');
const messageElement = document.querySelector('#message');
const countElement = document.querySelector('#count');
const countButton = document.querySelector('#count-button');

messageElement.textContent = formatMessage(message);

const moduleNote = 'private to main.js';

console.log('Greeting:', message);
console.log('Is moduleNote a global property?',
  Object.hasOwn(globalThis, 'moduleNote'));

countButton.addEventListener('click', function () {
  incrementClickCount();
  countElement.textContent = String(clickCount);
  console.log('Current imported count:', clickCount);
});
~~~

`greet` is imported under the local name `createGreeting`. The default export is imported as `formatMessage`. `clickCount` is read through its live imported binding after `incrementClickCount()` updates it in **counter.js**.

The top-level `moduleNote` declaration belongs to **main.js**. It is not added as a property of `globalThis`. The check asks whether the global object has that property, so it prints `false` in a fresh page.

## Run the example

Serve the folder over local HTTP using any local development server, then open its **index.html** URL. Do not rely on opening the file directly with a `file://` URL, because browsers can restrict module fetches in that context.

When the page loads, it displays:

~~~text
Module example
Message: Hello, Maya!
Clicks: 0
~~~

The developer console shows:

~~~text
Greeting: Hello, Maya!
Is moduleNote a global property? false
~~~

Click **Count clicks** twice. The page then displays **Clicks: 2**, and the console logs:

~~~text
Current imported count: 1
Current imported count: 2
~~~

## How the module graph runs

1. The browser parses **index.html** and sees the module entry **main.js**.
2. It fetches **main.js** and discovers imports from **greetings.js** and **counter.js**.
3. It fetches and links those dependencies before evaluating the entry module.
4. The modules run in their own module scopes and in strict mode.
5. The page installs a click handler. Each click updates the exported counter binding and then reads its current value in **main.js**.

## Try it yourself

1. Add a named export to **greetings.js** and import it in **main.js**.
2. Rename a named import with `as`, then use the local name in the code.
3. Add a second button that resets the counter. Export a reset function from **counter.js** so that the owning module updates its own binding.
4. In a temporary module function, assign to an undeclared variable and observe the strict-mode `ReferenceError`. Remove the assignment afterward.
5. Remove `type="module"` from the script element and inspect the browser error for the static import.
6. Add `async` to the module script and consider why this is appropriate only when its execution may happen independently of other scripts.

## Key points

- `type="module"` selects module parsing for the browser entry script.
- Module dependencies are loaded through imports instead of being added as separate script elements.
- Named and default exports have different import syntax.
- Imported bindings are read-only to the importer and can reflect updates made by the exporter.
- Top-level module declarations do not automatically become `globalThis` properties.
- Browser module files should be served over HTTP during local development.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [79 - Memory, garbage collection, and weak references](../lessons/079-memory-garbage-collection-and-weak-references.md) | [Open lesson](../lessons/080-modules-scripts-modules-and-module-scope.md) | [Open Q&A](../qnas/080-modules-scripts-modules-and-module-scope.md) | [81 - Export and import forms](../lessons/081-export-and-import-forms.md) |
