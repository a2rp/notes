# 85 - ES modules and CommonJS in Node.js

Node.js supports two JavaScript module systems: **ECMAScript modules**, commonly called **ES modules** or **ESM**, and **CommonJS**, often shortened to **CJS**. They both split a program into files, but they use different syntax and have different loading behavior.

The ECMAScript language defines ESM syntax such as **import** and **export**. CommonJS is a module format used by Node.js and much of its older package ecosystem. Node.js can run both, and projects should make their intended format explicit.

## Learning goals

After this chapter, you should be able to:

- Recognize ESM and CommonJS syntax.
- Select a module format in a Node.js package.
- Use file extensions and the package.json **type** field consistently.
- Explain basic ESM and CommonJS interoperability.
- Diagnose common module-format and module-loading errors.

## What does a module system do?

A module system lets a program divide code into files with explicit dependencies and exports. One file can provide a function or value, while another imports or loads it. Node.js resolves those requests, evaluates the modules, and provides the requested exports to the importing code.

ESM and CommonJS are not different versions of JavaScript. They are different module formats supported by Node.js. A project can use either format, and carefully structured projects can contain both.

## ECMAScript modules

ESM uses **export** to expose bindings and **import** to use them. It is the standard module syntax defined by ECMAScript and is also used by browsers.

### Named exports

A module can export several named bindings:

~~~js
// math.js
export function add(first, second) {
  return first + second;
}

export const answer = 42;
~~~

Another module imports the exported names:

~~~js
// app.js
import { add, answer } from './math.js';

console.log(add(2, 3));
console.log(answer);
~~~

Named imports must use exported names. Their names are case-sensitive. A relative ESM import in Node.js should include the file extension, such as **./math.js**.

### Default exports

A module can also provide one default export:

~~~js
// greeting.js
export default function greet(name) {
  return 'Hello, ' + name + '!';
}
~~~

The importing file chooses a local name for a default import:

~~~js
// app.js
import greet from './greeting.js';

console.log(greet('Sam'));
~~~

A module can have named exports and one default export. Choose the form that makes the module's public interface clear. A default import's local name can differ from the name used inside the exporting file.

### ESM imports are static declarations

Static **import** declarations appear at the top level of an ESM file. They let the module loader discover dependencies before evaluating the importing module. An imported binding is a read-only view of the exporting module's live binding. It is not an ordinary local variable that the importing module can assign to.

Use dynamic **import()** when the import must happen conditionally or asynchronously:

~~~js
const module = await import('./optional-feature.js');
module.start();
~~~

Dynamic import returns a promise and can also be used from CommonJS. In an ESM file, top-level **await** is supported. A normal static import cannot be placed inside an **if** block or function body.

## CommonJS modules

CommonJS uses **require()** to load a module and **module.exports** to define the value it provides.

~~~js
// math.cjs
function add(first, second) {
  return first + second;
}

module.exports = {
  add: add
};
~~~

A CommonJS file loads that value with **require()**:

~~~js
// app.cjs
const math = require('./math.cjs');

console.log(math.add(2, 3));
~~~

The value returned by **require()** is the exporting module's **module.exports** value. It can be a function, object, class, or another value.

### The exports alias

CommonJS provides **exports** as a shortcut that initially refers to **module.exports**. This adds a property to the exported object:

~~~js
exports.add = function (first, second) {
  return first + second;
};
~~~

Assigning a new value to **module.exports** replaces the exported value. It does not make **exports** refer to the new value:

~~~js
module.exports = function add(first, second) {
  return first + second;
};
~~~

After replacing **module.exports**, do not expect later assignments to **exports.someName** to update that replacement. Use one export style consistently in a module.

CommonJS files also have module-scoped values such as **__filename** and **__dirname**. These are not global variables shared by all files. Each CommonJS module has its own scope.

## Tell Node.js which format to use

Node.js determines the format from the file extension and its package scope. The nearest parent **package.json** controls ordinary **.js** files. Make the project choice explicit so the source syntax, tools, and runtime agree.

### Use ESM for .js files

Add a top-level **type** field to the project's package.json:

~~~json
{
  "type": "module"
}
~~~

In that package scope, Node.js interprets **.js** files as ESM. This also applies to files in subfolders unless a closer package.json creates a new package scope.

### Use CommonJS for .js files

A package can explicitly select CommonJS:

~~~json
{
  "type": "commonjs"
}
~~~

In that package scope, Node.js interprets **.js** files as CommonJS.

### Use an explicit extension

The extensions **.mjs** and **.cjs** identify a file's format regardless of the package's **type** field:

| Extension or setting | Node.js format |
| --- | --- |
| **.mjs** | ESM |
| **.cjs** | CommonJS |
| **.js** with **type: module** in the nearest package.json | ESM |
| **.js** with **type: commonjs** in the nearest package.json | CommonJS |

A package without an explicit **type** can depend on Node.js defaults and syntax detection. That behavior has varied across Node.js versions and can be less clear to editors and tools. Prefer an explicit package **type**, or use **.mjs** and **.cjs** when file-by-file markers are appropriate.

A nested package.json can start a new package scope. Its **type** setting affects files beneath it until another package scope begins. A dependency under **node_modules** has its own package metadata and scope.

## ESM and CommonJS compared

| Topic | ESM | CommonJS |
| --- | --- | --- |
| Import or load syntax | Static **import**, plus dynamic **import()** | **require()**, plus dynamic **import()** |
| Export syntax | **export** declarations | **module.exports** or properties on **exports** |
| File markers | **.mjs** or package **type: module** | **.cjs** or package **type: commonjs** |
| Static dependency discovery | Supported by static import declarations | Dependencies are commonly loaded with calls to **require()** |
| Top-level await | Supported | Not supported as CommonJS syntax |
| File location values | **import.meta.url** | **__filename** and **__dirname** |

Use the format chosen by the project rather than mixing syntax accidentally. A file with a **.mjs** extension cannot use **require()** as though it were CommonJS. A file in a **type: module** package cannot use **module.exports** as though it were an ESM export.

## Interoperability between the formats

Node.js supports common ESM and CommonJS combinations, but their interfaces are not identical.

### Importing CommonJS from ESM

An ESM file can import a CommonJS module. The CommonJS **module.exports** value is available as the default import:

~~~js
import legacyTools from './legacy-tools.cjs';

legacyTools.run();
~~~

Node.js may also expose detected CommonJS properties as named imports. That detection is based on static analysis and may not recognize every way a CommonJS module creates or changes its exports. Prefer the default import when consuming a CommonJS module whose named exports are uncertain.

### Loading ESM from CommonJS

Use dynamic **import()** from CommonJS when loading ESM:

~~~js
async function loadFeature() {
  const feature = await import('./feature.mjs');
  feature.start();
}

loadFeature().catch(function (error) {
  console.error('Could not load the feature:', error);
});
~~~

Dynamic import is asynchronous, so handle the returned promise. Some recent Node.js versions can load certain synchronous ESM modules with **require()**, but support and constraints vary by Node.js version. Dynamic **import()** is the clearer portable approach when CommonJS code must load ESM, especially if the ESM dependency uses top-level **await**.

### Built-in modules

Node.js built-in modules are available in both formats. The **node:** prefix makes a built-in module request explicit:

~~~js
// ESM
import { readFile } from 'node:fs/promises';
~~~

~~~js
// CommonJS
const { readFile } = require('node:fs/promises');
~~~

The API call remains asynchronous in either example. The module format determines how the built-in is loaded, not whether a file-reading operation blocks.

## File locations in ESM

ESM does not provide CommonJS **__filename** and **__dirname** variables. The ESM **import.meta.url** value identifies the current module as a URL. For a filesystem path, convert that URL:

~~~js
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const directory = dirname(filename);

console.log(filename);
console.log(directory);
~~~

This is useful when locating a file relative to the current module. Do not treat **import.meta.url** as an ordinary filesystem path; it is a URL.

## Common errors and how to fix them

### “Cannot use import statement outside a module”

Node.js is treating the file as CommonJS, but the file contains ESM syntax. Check the nearest package.json **type** and the file extension. Select **type: module** or rename the file to **.mjs** if it is intended to be ESM.

### “require is not defined in ES module scope”

Node.js is treating the file as ESM, where CommonJS **require** is not automatically available. Use **import**, or use **.cjs** for a file that is intentionally CommonJS. A specialized ESM case can create a require function with Node.js's **module.createRequire()**.

### “The requested module does not provide an export named ...”

The import requests a name that the target module does not export. Check spelling, letter case, and whether the module uses a default export instead of a named export.

### A relative import cannot be found

Check the relative path from the importing file and include the extension for a relative ESM import in Node.js. Also check the filename's case, since a path that works on one filesystem may fail on another.

### ESM syntax and CommonJS exports are mixed

Choose the file's format and use its matching syntax. For an ESM file, export with **export**. For a CommonJS file, use **module.exports** or **exports**. If both formats are needed, put them in separately marked files and connect them through supported interoperability.

## Choosing a format for a project

For a new Node.js application, choose ESM or CommonJS deliberately and set the package **type** so **.js** files are unambiguous. ESM is the ECMAScript standard syntax and shares syntax with browser JavaScript. CommonJS remains important when maintaining existing Node.js code and packages.

Before changing a project's format, check its dependencies, scripts, build tools, test setup, and deployment runtime. Changing **type** changes how every unmarked **.js** file in that package scope is interpreted. Convert related code and configuration together, and run the project's documented checks before shipping the migration.

## Try it yourself

1. Create a small package with **type: module** and run a file that uses a named ESM export.
2. Change the example to use a default export and update its import.
3. Create a separate **.cjs** file that exports an object with **module.exports**.
4. Import that CommonJS file from ESM using a default import and inspect the returned object.
5. From a CommonJS file, load an ESM file with dynamic **import()** and handle a rejected promise.
6. Rename the ESM file to **.mjs**, then remove the package **type** field and observe that the explicit extension still identifies it as ESM.
7. Put a nested package.json in a subfolder and give it a different **type**. Confirm that only files in that nested package scope use the new setting.
8. Deliberately use **require()** in an ESM file and **import** syntax in a CommonJS file. Read the error, then make each file's format explicit.
9. In an ESM file, use **import.meta.url** and Node.js path utilities to locate a sibling file.

## Key points

- ESM uses **import** and **export**; CommonJS uses **require()** and **module.exports**.
- Node.js supports both module formats, and package scope determines how **.js** files are interpreted.
- **.mjs** always marks ESM; **.cjs** always marks CommonJS.
- Set package.json **type** explicitly to make a project's **.js** format clear.
- Static ESM imports are declared at the top level; dynamic **import()** returns a promise and works in both formats.
- When ESM imports CommonJS, the default import represents **module.exports**; detected named exports may not cover every CommonJS pattern.
- Use dynamic **import()** as the portable way for CommonJS code to load ESM.
- Diagnose module errors by checking the file extension, nearest package.json, requested export, and relative path.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [84 - Package.json, npm, dependencies, scripts, and package managers](084-package-json-npm-dependencies-scripts-and-package-managers.md) | [Open Q&A](../qnas/085-es-modules-and-commonjs-in-node-js.md) | [Open example](../examples/085-es-modules-and-commonjs-in-node-js.md) | [86 - Transpilation, bundlers, polyfills, and source maps](086-transpilation-bundlers-polyfills-and-source-maps.md) |
