# 83 - Module loading, resolution, and import maps example

This browser project uses import maps for two path prefixes and one exact bare specifier. A scoped mapping lets a legacy module resolve that same bare specifier to a different version. The example also shows that a relative import inside JavaScript is based on the importing module's URL.

## Goal

Run a small module graph and observe how exact, prefix, and scoped import-map entries select module URLs.

## Project files

Create these files in one folder:

~~~text
module-resolution-example/
  index.html
  src/
    main.js
    app.js
    utils/
      date-format.js
    legacy/
      legacy-info.js
      date-format.js
~~~

## 1. Create the HTML document and import map

Save this as **index.html**:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Module resolution example</title>

    <script type="importmap">
      {
        "imports": {
          "@app/": "./src/",
          "@utils/": "./src/utils/",
          "date-format": "./src/utils/date-format.js"
        },
        "scopes": {
          "./src/legacy/": {
            "date-format": "./src/legacy/date-format.js"
          }
        }
      }
    </script>
  </head>
  <body>
    <main>
      <h1>Module resolution example</h1>
      <button id="load-legacy" type="button">Load legacy formatter</button>
      <section id="output" aria-live="polite"></section>
    </main>

    <script type="module" src="./src/main.js"></script>
  </body>
</html>
~~~

The import map is inline JSON and appears before the module script. The `@app/` and `@utils/` entries are prefix mappings. `date-format` is an exact bare-specifier mapping. The scope applies an override to imports made by modules under **src/legacy/**.

## 2. Create the global formatter module

Save this as **src/utils/date-format.js**:

~~~js
export const version = '2.0';

export function formatDate(value) {
  return 'Global formatter v' + version + ': ' + value;
}
~~~

The exact `date-format` mapping points to this module for imports outside the legacy scope. The `@utils/` mapping also points to its containing directory.

## 3. Create an app module that uses the prefix mapping

Save this as **src/app.js**:

~~~js
import { formatDate as formatThroughPrefix, version } from '@utils/date-format.js';

export function renderApp(container, globalResult) {
  const globalMapping = document.createElement('p');
  globalMapping.textContent = 'Exact bare mapping: ' + globalResult;

  const prefixMapping = document.createElement('p');
  prefixMapping.textContent = 'Prefix mapping: '
    + formatThroughPrefix('2026-11-20')
    + ' (version ' + version + ')';

  container.replaceChildren(globalMapping, prefixMapping);
}
~~~

Because **app.js** is imported through `@app/app.js`, the browser maps that prefix to **src/**. The import inside **app.js** uses the separate `@utils/` prefix.

## 4. Create the entry module

Save this as **src/main.js**:

~~~js
import { formatDate, version } from 'date-format';
import { renderApp } from '@app/app.js';

const output = document.querySelector('#output');
const loadLegacyButton = document.querySelector('#load-legacy');

renderApp(output, formatDate('2026-11-20') + ' (version ' + version + ')');

loadLegacyButton.addEventListener('click', async function () {
  output.textContent = 'Loading legacy formatter...';

  try {
    const legacyModule = await import('./legacy/legacy-info.js');
    legacyModule.renderLegacy(output);
  } catch (error) {
    console.error('Could not load the legacy module:', error);
    output.textContent = 'The legacy module could not be loaded.';
  }
});
~~~

The imports from `date-format` and `@app/app.js` use the global import map. The dynamic relative import is resolved from **src/main.js**, so it requests **src/legacy/legacy-info.js**. That module's own imports will be checked against the matching scope.

## 5. Create the legacy module

Save this as **src/legacy/legacy-info.js**:

~~~js
import { formatDate, version } from 'date-format';

export function renderLegacy(container) {
  const heading = document.createElement('h2');
  heading.textContent = 'Legacy module';

  const message = document.createElement('p');
  message.textContent = formatDate('2026-11-20')
    + ' (version ' + version + ')';

  container.replaceChildren(heading, message);
}
~~~

The `date-format` specifier is the same text used in **src/main.js**, but the importer lives under **src/legacy/**. Its scoped mapping selects **src/legacy/date-format.js**.

## 6. Create the scoped formatter

Save this as **src/legacy/date-format.js**:

~~~js
export const version = '1.0';

export function formatDate(value) {
  return 'Legacy formatter v' + version + ': ' + value;
}
~~~

This file exports the same names as the globally mapped formatter so **legacy-info.js** can use the same import declaration with different module code.

## Run the example

Serve the folder over a local HTTP development server, then open its **index.html** URL. Import maps and JavaScript modules should be tested through a server rather than a direct `file://` URL.

Initially, the page shows two lines:

~~~text
Exact bare mapping: Global formatter v2.0: 2026-11-20 (version 2.0)
Prefix mapping: Global formatter v2.0: 2026-11-20 (version 2.0)
~~~

Click **Load legacy formatter**. The section changes to:

~~~text
Legacy module
Legacy formatter v1.0: 2026-11-20 (version 1.0)
~~~

The entry module and app module use the global mappings. The legacy module uses the scoped override because its URL is under **src/legacy/**.

## Trace the resolutions

| Import request | Importer URL | Matching rule | Module selected |
| --- | --- | --- | --- |
| `@app/app.js` | **src/main.js** | `@app/` prefix | **src/app.js** |
| `@utils/date-format.js` | **src/app.js** | `@utils/` prefix | **src/utils/date-format.js** |
| `date-format` | **src/main.js** | Global exact mapping | **src/utils/date-format.js** |
| `./legacy/legacy-info.js` | **src/main.js** | Relative URL | **src/legacy/legacy-info.js** |
| `date-format` | **src/legacy/legacy-info.js** | Matching scope override | **src/legacy/date-format.js** |

The import map's relative URL values are based on the document base URL. The relative import in **src/main.js** is based on the URL of **src/main.js**.

## Try it yourself

1. Change the global `date-format` mapping to a new module and observe which output lines change.
2. Add a second prefix mapping and import a module through it.
3. Move **legacy-info.js** outside **src/legacy/** and observe that the scoped override no longer matches.
4. Add a second, more specific scope and see which mapping has priority.
5. Change `./src/` to a missing path and inspect the Network panel for the resolved request.
6. Change the import in **src/app.js** from `@utils/date-format.js` to `utils/date-format.js` and observe that it becomes an unmapped bare specifier.
7. Print `import.meta.resolve('date-format')` from **src/main.js** in a host that supports it, then verify that the call itself does not fetch the module.

## Key points

- Import maps connect readable specifiers to URLs in a browser document.
- Prefix keys and values both end with `/` so a suffix can be appended.
- Exact mappings and prefix mappings can coexist.
- A scope can override a global mapping according to the importing module's URL.
- Relative imports use the importing module URL, while relative import-map values use the document base URL.
- A successful resolution still needs a successful fetch, parse, link, and evaluation.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [82 - Dynamic imports and import attributes](../lessons/082-dynamic-imports-and-import-attributes.md) | [Open lesson](../lessons/083-module-loading-resolution-and-import-maps.md) | [Open Q&A](../qnas/083-module-loading-resolution-and-import-maps.md) | [84 - Package.json, npm, dependencies, scripts, and package managers](../lessons/084-package-json-npm-dependencies-scripts-and-package-managers.md) |
