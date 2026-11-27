# 86 - Transpilation, bundlers, polyfills, and source maps example

This browser example uses **esbuild** to transform modern syntax, bundle imported modules, minify the result, and create a linked source map. It imports a **core-js** polyfill for **Array.prototype.toSorted**, which is a runtime API that syntax transformation alone does not provide.

## Goal

Build a small page and identify which output comes from syntax transformation, bundling, a polyfill, minification, and source-map generation.

## Project files

Create this structure:

~~~text
build-pipeline-demo/
  .gitignore
  index.html
  package.json
  src/
    main.js
    tasks.js
~~~

The **package-lock.json**, **node_modules/**, and **dist/** entries are generated when you install and build the project.

## 1. Declare the build and runtime packages

Save this as **package.json**:

~~~json
{
  "name": "build-pipeline-demo",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "esbuild src/main.js --bundle --platform=browser --format=iife --target=es2017 --minify --sourcemap --outfile=dist/app.js"
  },
  "dependencies": {
    "core-js": "^3.51.0"
  },
  "devDependencies": {
    "esbuild": "^0.28.2"
  }
}
~~~

**esbuild** is a build tool, so it is a development dependency. **core-js** is imported by the application to provide a runtime API when needed, so it is a runtime dependency. The **build** script tells esbuild where to start, which platform and syntax target to use, and where to write its generated files.

## 2. Ignore generated files

Save this as **.gitignore**:

~~~gitignore
node_modules/
dist/
~~~

Both directories can be regenerated from the tracked source, manifest, and lockfile. Keep **dist/** ignored here so the repository shows the authored files rather than generated output.

## 3. Create a module with source data

Save this as **src/tasks.js**:

~~~js
export const tasks = [
  'Build source graph',
  'Apply syntax transform',
  'Generate source map'
];
~~~

The application will import this module. The bundler follows that import from its entry point and includes the module in the output bundle.

## 4. Create the application entry point

Save this as **src/main.js**:

~~~js
import 'core-js/actual/array/to-sorted';
import { tasks } from './tasks.js';

const page = {
  title: 'Build pipeline example'
};

const heading = document.createElement('h1');
heading.textContent = page?.title ?? 'Task list';

const list = document.createElement('ol');
for (const task of tasks.toSorted()) {
  const item = document.createElement('li');
  item.textContent = task;
  list.appendChild(item);
}

const debugButton = document.createElement('button');
debugButton.type = 'button';
debugButton.textContent = 'Trigger a mapped error';
debugButton.addEventListener('click', function handleClick() {
  throw new Error('Example error from src/main.js');
});

const app = document.querySelector('#app');
app.appendChild(heading);
app.appendChild(list);
app.appendChild(debugButton);
console.log('Sorted tasks:', tasks.toSorted().join(' | '));
~~~

This entry uses optional chaining and nullish coalescing in **page?.title ?? 'Task list'**. With the **es2017** target, esbuild transforms syntax that is newer than that target. The **toSorted()** method is a runtime API, so the explicit **core-js** import handles that separate compatibility need.

The polyfill import comes before code that calls **toSorted()**. In a runtime that already has a correct native implementation, core-js can use the native method. In an environment that needs the polyfill, the imported module provides it.

The button deliberately throws an error so you can see whether the source map connects the generated code to **src/main.js**.

## 5. Create the HTML page

Save this as **index.html**:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Build pipeline example</title>
    <script defer src="./dist/app.js"></script>
  </head>
  <body>
    <main id="app"></main>
  </body>
</html>
~~~

The page loads the generated JavaScript bundle. Because the build format is an IIFE, the output can be loaded as a regular script rather than as separate module files.

## 6. Install and build

Open a terminal in the **build-pipeline-demo** folder and install the declared packages:

~~~sh
npm install
~~~

npm creates **package-lock.json** and installs **esbuild** and **core-js** into **node_modules/**. Commit **package.json** and **package-lock.json** together so another checkout can reproduce the dependency tree.

Run the build script:

~~~sh
npm run build
~~~

The build creates:

~~~text
dist/
  app.js
  app.js.map
~~~

The command uses these options:

| Option | Effect |
| --- | --- |
| **--bundle** | Follows imports and includes the dependency graph in the output |
| **--platform=browser** | Selects browser-oriented build behavior |
| **--format=iife** | Writes an immediately invoked function expression suitable for a regular script tag |
| **--target=es2017** | Transforms newer syntax that is unsupported by this language target |
| **--minify** | Reduces the size of generated code |
| **--sourcemap** | Writes a linked **app.js.map** file beside the generated bundle |
| **--outfile=dist/app.js** | Sets the generated JavaScript path |

Build logs and generated byte counts can vary by operating system and dependency versions.

## 7. View the page

Serve the project folder with a local static server, then open its **index.html** address in a browser. Keep the generated **dist/** folder in the served directory so the script and map URLs resolve.

The page should display:

~~~text
Build pipeline example
1. Apply syntax transform
2. Build source graph
3. Generate source map
[Trigger a mapped error]
~~~

The browser console should show:

~~~text
Sorted tasks: Apply syntax transform | Build source graph | Generate source map
~~~

The sort is non-mutating because **toSorted()** returns a sorted copy. The original imported array remains unchanged.

## 8. Inspect the source map

Open the browser developer tools and make sure JavaScript source maps are enabled. Click **Trigger a mapped error**. The generated bundle throws the error, while the debugger should be able to show the corresponding location in **src/main.js**.

The generated **app.js** contains a directive that points to **app.js.map**. The map connects positions in the minified bundle to source locations. It does not change which JavaScript runs.

Inspect the generated map before publishing it. Depending on build settings, source maps can include original source text and paths. This build is for learning and debugging; decide separately whether production maps should be public, private, or omitted.

## What each stage contributed

| Stage | Input or setting | Result |
| --- | --- | --- |
| Syntax transformation | Optional chaining and nullish coalescing with an ES2017 target | Older JavaScript syntax in the output where required |
| Bundling | **src/main.js** imports **src/tasks.js** and the polyfill | A combined **dist/app.js** file |
| Polyfill | Import of **core-js/actual/array/to-sorted** | A suitable **toSorted()** implementation when the runtime needs it |
| Minification | **--minify** | Smaller generated code |
| Source maps | **--sourcemap** | **dist/app.js.map** links generated code locations to source |

These stages are configured together, but they solve different problems. In particular, the target controls syntax transformation and does not automatically supply missing runtime APIs.

## Try it yourself

1. Remove the **core-js** import, rebuild, and note that esbuild does not add a **toSorted()** polyfill automatically.
2. Replace **toSorted()** with **sort()** and compare the behavior on the original **tasks** array.
3. Remove **--minify**, rebuild, and compare the generated bundle's readability and size.
4. Remove **--sourcemap**, rebuild, and inspect the error location shown after clicking the button.
5. Change the target to a newer syntax target and inspect which syntax transformations are still needed.
6. Inspect **dist/app.js.map** to see the source names and whether source contents are included.
7. Configure an output target required by your project and test the resulting page in that supported runtime.
8. Restore the project's normal build options after experimenting.

## Key points

- The source modules are the inputs; **dist/** contains generated output.
- esbuild's target transforms syntax, while **core-js** provides the imported runtime polyfill.
- The bundler follows imports from the entry point and combines the dependency graph.
- Minification and source-map generation are independent build options.
- A linked source map lets developer tools relate generated code to original files.
- Review source-map contents and paths before publishing them.
- Keep the manifest and lockfile for reproducible installs, and regenerate ignored build output when needed.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [85 - ES modules and CommonJS in Node.js](../lessons/085-es-modules-and-commonjs-in-node-js.md) | [Open lesson](../lessons/086-transpilation-bundlers-polyfills-and-source-maps.md) | [Open Q&A](../qnas/086-transpilation-bundlers-polyfills-and-source-maps.md) | [87 - Testing fundamentals, assertions, and test design](../lessons/087-testing-fundamentals-assertions-and-test-design.md) |
