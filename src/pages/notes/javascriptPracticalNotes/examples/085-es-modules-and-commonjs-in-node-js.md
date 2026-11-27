# 85 - ES modules and CommonJS in Node.js example

This project uses ESM for its main application and test, plus one explicitly marked CommonJS helper. It also loads an ESM module dynamically from a CommonJS file. The example shows how package **type**, file extensions, imports, and exports work together.

## Goal

Run one small project that demonstrates ESM imports and exports, CommonJS exports, interoperability in both directions, and Node.js module file locations.

## Project files

Create this structure:

~~~text
node-module-formats-demo/
  .gitignore
  package.json
  src/
    app.js
    greeting.js
    legacy.cjs
    load-esm.cjs
    math.js
  test/
    smoke-test.js
~~~

This project uses only Node.js built-in modules. It does not need a third-party package installation.

## 1. Mark the project as ESM

Save this as **package.json**:

~~~json
{
  "name": "node-module-formats-demo",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "load": "node src/load-esm.cjs",
    "test": "node test/smoke-test.js"
  }
}
~~~

The **type** field makes ordinary **.js** files in this package scope use ESM. The **.cjs** files remain CommonJS even though the package uses ESM. The scripts provide consistent commands to run the application, the interop example, and the smoke check.

## 2. Ignore generated dependencies

Save this as **.gitignore**:

~~~gitignore
node_modules/
~~~

This example has no third-party dependencies, so **node_modules** is not created by its scripts. Keeping the ignore rule is a useful default for projects that may add packages later.

## 3. Create a named ESM export

Save this as **src/math.js**:

~~~js
export function add(first, second) {
  return first + second;
}
~~~

The **export** declaration makes **add** available as a named export.

## 4. Create a default ESM export

Save this as **src/greeting.js**:

~~~js
export default function greet(name) {
  return 'Hello, ' + name + '!';
}
~~~

This module provides one default export. An importing file can choose its local name.

## 5. Create a CommonJS module

Save this as **src/legacy.cjs**:

~~~js
function formatLabel(value) {
  return 'Legacy helper: ' + value;
}

module.exports = {
  formatLabel: formatLabel
};
~~~

The **.cjs** extension selects CommonJS. The object assigned to **module.exports** is the value another module receives when it loads this file.

## 6. Create the ESM application

Save this as **src/app.js**:

~~~js
import { basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import greet from './greeting.js';
import { add } from './math.js';
import legacyTools from './legacy.cjs';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);

console.log(greet('Kai'));
console.log('2 + 3 = ' + add(2, 3));
console.log(legacyTools.formatLabel('notebook'));
console.log('Current module file: ' + basename(currentFile));
console.log('Current module directory: ' + basename(currentDirectory));
~~~

This ESM file uses named and default imports from ESM files. Its default import from **legacy.cjs** is the CommonJS **module.exports** object. It uses **import.meta.url** to locate itself, then converts the URL to a filesystem path.

## 7. Load ESM from CommonJS

Save this as **src/load-esm.cjs**:

~~~js
async function main() {
  const math = await import('./math.js');
  const greeting = await import('./greeting.js');

  console.log('7 + 5 = ' + math.add(7, 5));
  console.log(greeting.default('Mira'));
}

main().catch(function (error) {
  console.error('Could not load the ESM modules:', error);
  process.exitCode = 1;
});
~~~

The file is CommonJS, but **import()** can load ESM asynchronously. Its result is a module namespace object, so the named export is available as **math.add** and the default export as **greeting.default**. The error handler makes a failed dynamic import produce a nonzero process exit status.

## 8. Create a smoke check

Save this as **test/smoke-test.js**:

~~~js
import assert from 'node:assert/strict';

import greet from '../src/greeting.js';
import { add } from '../src/math.js';
import legacyTools from '../src/legacy.cjs';

assert.equal(greet('Kai'), 'Hello, Kai!');
assert.equal(add(2, 3), 5);
assert.equal(legacyTools.formatLabel('notebook'), 'Legacy helper: notebook');

console.log('All module-format checks passed.');
~~~

The test file is ESM because its extension is **.js** and the package type is **module**. It checks both ESM exports and the CommonJS default import.

## Run the application

Open a terminal in the **node-module-formats-demo** folder and run:

~~~sh
npm start
~~~

Expected output:

~~~text
Hello, Kai!
2 + 3 = 5
Legacy helper: notebook
Current module file: app.js
Current module directory: src
~~~

The first two lines use ESM exports. The third line calls the CommonJS helper through its default import. The last two lines show the current module's file and directory.

## Run the CommonJS to ESM example

Run the **load** script:

~~~sh
npm run load
~~~

Expected output:

~~~text
7 + 5 = 12
Hello, Mira!
~~~

The CommonJS entry file uses dynamic **import()** to get ESM's named and default exports. Because dynamic import is asynchronous, **main** is an async function and the returned promise is handled.

## Run the smoke check

Run the **test** script:

~~~sh
npm test
~~~

Expected output:

~~~text
All module-format checks passed.
~~~

npm executes the script from the package root. The test uses Node.js built-in modules, so there is no need to install a test runner for this check.

## What each file demonstrates

| File | Format | Demonstration |
| --- | --- | --- |
| **src/app.js** | ESM | Static imports, Node.js built-ins, and module file locations |
| **src/math.js** | ESM | A named export |
| **src/greeting.js** | ESM | A default export |
| **src/legacy.cjs** | CommonJS | An object exported through **module.exports** |
| **src/load-esm.cjs** | CommonJS | Loading ESM with dynamic **import()** |
| **test/smoke-test.js** | ESM | Importing ESM and CommonJS values in a check |
| **package.json** | Project metadata | Explicit package type and npm scripts |

## Try it yourself

1. Change **add** to subtract and update the expected test assertion.
2. Add another named export to **src/math.js** and import it in **src/app.js**.
3. Rename **src/greeting.js** to **src/greeting.mjs**, update the import paths, and observe that **.mjs** still selects ESM.
4. Create a CommonJS module that assigns a function directly to **module.exports**, then import it as the ESM default.
5. Move **src/legacy.cjs** into a nested folder and update both import paths.
6. Temporarily change the package type to **commonjs** and run **npm start**. Observe why the ordinary **.js** files no longer match their ESM syntax, then restore **type: module**.
7. Add a nested package.json with **type: commonjs** to a new folder and check how its **.js** files are interpreted.
8. In **src/app.js**, try to assign a new value to the imported **add** binding. Remove the assignment after observing that imported bindings cannot be reassigned by the importer.

## Key points

- **package.json** with **type: module** makes this package's **.js** files ESM.
- **.mjs** always selects ESM, and **.cjs** always selects CommonJS.
- ESM uses static **import** and **export** declarations; CommonJS uses **require()** and **module.exports**.
- ESM can import CommonJS, with its default import representing **module.exports**.
- CommonJS can load ESM with asynchronous **import()** and handle the returned promise.
- **import.meta.url** identifies an ESM module as a URL; convert it when a filesystem path is needed.
- Keep file markers, syntax, package settings, and supported Node.js versions consistent.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [84 - Package.json, npm, dependencies, scripts, and package managers](../lessons/084-package-json-npm-dependencies-scripts-and-package-managers.md) | [Open lesson](../lessons/085-es-modules-and-commonjs-in-node-js.md) | [Open Q&A](../qnas/085-es-modules-and-commonjs-in-node-js.md) | [86 - Transpilation, bundlers, polyfills, and source maps](../lessons/086-transpilation-bundlers-polyfills-and-source-maps.md) |
