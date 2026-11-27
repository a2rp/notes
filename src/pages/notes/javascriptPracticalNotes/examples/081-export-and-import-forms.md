# 81 - Export and import forms example

This browser project demonstrates named exports, a default export, import aliases, a namespace import, a side-effect import, and a small re-export module. The page performs a calculation and reads a live imported counter binding after another module updates it.

## Goal

Create a small module-based page and trace how each file provides or consumes a public binding.

## Project files

Create these files in one folder:

~~~text
module-interface-example/
  index.html
  main.js
  math.js
  greetings.js
  counter.js
  public-api.js
  setup.js
~~~

## 1. Create the page

Save this as **index.html**:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Module interface example</title>
  </head>
  <body>
    <main>
      <h1>Module interface example</h1>
      <label for="value">Number</label>
      <input id="value" type="number" value="3">
      <button id="run" type="button">Calculate and count</button>
      <p id="result">Results appear here.</p>
      <p>Calculations: <output id="count">0</output></p>
    </main>

    <script type="module" src="./main.js"></script>
  </body>
</html>
~~~

The browser loads **main.js** as a module. Its dependencies are loaded through the import declarations in that file.

## 2. Export named functions and a default function

Save this as **math.js**:

~~~js
export const maxScore = 100;

export function square(value) {
  return value * value;
}

export function double(value) {
  return value * 2;
}

export default function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}
~~~

This module exposes three named exports and one default export. The default function can be imported under any local name.

## 3. Create another module with named and default exports

Save this as **greetings.js**:

~~~js
export function greet(name) {
  return 'Hello, ' + name + '!';
}

export default function formatMessage(message) {
  return 'Result: ' + message;
}
~~~

The module provides `greet` as a named export and `formatMessage` as its default export.

## 4. Create an updateable exported binding

Save this as **counter.js**:

~~~js
export let calculationCount = 0;

export function recordCalculation() {
  calculationCount += 1;
}
~~~

The exporting module owns and updates `calculationCount`. Importers can read its live value but cannot assign to the imported binding.

## 5. Re-export a small public interface

Save this as **public-api.js**:

~~~js
export { greet as createGreeting } from './greetings.js';
export { default as formatMessage } from './greetings.js';
export * as math from './math.js';
~~~

This module forwards selected exports from **greetings.js** and exposes the named exports of **math.js** through the `math` namespace. These re-export declarations do not create local variables inside **public-api.js**.

## 6. Add an intentional side effect

Save this as **setup.js**:

~~~js
document.documentElement.dataset.moduleDemo = 'ready';
console.log('Setup module evaluated');
~~~

This file has no exports. Import it for its intentional setup effect.

## 7. Import the modules and connect the page

Save this as **main.js**:

~~~js
import clamp, { square as squareNumber, maxScore } from './math.js';
import { createGreeting, formatMessage, math } from './public-api.js';
import { calculationCount, recordCalculation } from './counter.js';
import './setup.js';

const valueInput = document.querySelector('#value');
const runButton = document.querySelector('#run');
const result = document.querySelector('#result');
const countOutput = document.querySelector('#count');

runButton.addEventListener('click', function () {
  if (valueInput.value.trim() === '') {
    result.textContent = 'Enter a number first.';
    return;
  }

  const value = Number(valueInput.value);
  const squared = squareNumber(value);
  const cappedSquare = clamp(squared, 0, maxScore);
  const message = createGreeting('Asha')
    + ' Double: ' + math.double(value)
    + '. Square: ' + squared
    + '. Capped square: ' + cappedSquare + '.';

  result.textContent = formatMessage(message);
  recordCalculation();
  countOutput.value = String(calculationCount);

  console.log('Updated imported calculationCount:', calculationCount);
});
~~~

The default import `clamp` and named imports `squareNumber` and `maxScore` come from the same module. The import alias `square as squareNumber` changes only the local name. The `math` namespace comes from the re-export module. The side-effect import loads **setup.js** without creating a local binding.

## Run the example

Serve the folder over a local HTTP development server, then open its **index.html** URL. Module loading can be restricted when the page is opened directly through a `file://` URL.

The page initially shows:

~~~text
Module interface example
Number: 3
Results appear here.
Calculations: 0
~~~

Click **Calculate and count**. With the initial value of `3`, the page shows:

~~~text
Result: Hello, Asha! Double: 6. Square: 9. Capped square: 9.
Calculations: 1
~~~

The console logs the setup message once when the module graph evaluates, then logs the updated count each time the button is clicked:

~~~text
Setup module evaluated
Updated imported calculationCount: 1
Updated imported calculationCount: 2
~~~

Change the input to `12` and click again. The square is `144`, while the capped square is `100`, because `clamp` limits the value to the configured maximum.

## Follow each binding

| Public or local name | Defined or exported by | Used in **main.js** as |
| --- | --- | --- |
| `clamp` | Default export from **math.js** | `clamp` |
| `square` | Named export from **math.js** | `squareNumber` through an import alias |
| `maxScore` | Named export from **math.js** | `maxScore` |
| `double` | Named export from **math.js** | `math.double` through a namespace re-export |
| `greet` | Named export from **greetings.js** | `createGreeting` through **public-api.js** |
| `formatMessage` | Default export from **greetings.js** | `formatMessage` through **public-api.js** |
| `calculationCount` | Live named export from **counter.js** | Read after `recordCalculation()` updates it |
| setup effect | **setup.js**, imported for evaluation | No local import binding |

## Try it yourself

1. Import `double` directly by name and compare it with `math.double`.
2. Rename `maxScore` during import, then update the calculation to use the new local name.
3. Add a named export called `cube` to **math.js** and forward it explicitly from **public-api.js**.
4. Export a value from **setup.js** and compare a regular import with the side-effect-only form.
5. Change **public-api.js** to re-export the math default as a named export, then import and use it from **main.js**.
6. Try assigning to `calculationCount` in **main.js** and observe that imported bindings are not assignable.
7. Add a reset function to **counter.js** and a second button to use it.
8. Add two wildcard re-exports with colliding names, then resolve the intended public name explicitly.

## Key points

- A module can expose named exports and one default export.
- `as` renames a binding at an import or export boundary.
- A namespace import groups a module's exported names under one local name.
- A side-effect import loads a module without defining an import binding.
- Re-exports create a public forwarding interface but do not create local bindings.
- Imported bindings are read-only to the importer and reflect changes from their exporting module.
- `export *` forwards named exports, not the default export.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [80 - Modules: scripts, modules, and module scope](../lessons/080-modules-scripts-modules-and-module-scope.md) | [Open lesson](../lessons/081-export-and-import-forms.md) | [Open Q&A](../qnas/081-export-and-import-forms.md) | [82 - Dynamic imports and import attributes](../lessons/082-dynamic-imports-and-import-attributes.md) |
