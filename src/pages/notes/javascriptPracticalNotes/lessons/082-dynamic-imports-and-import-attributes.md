# 82 - Dynamic imports and import attributes

Static imports describe a module's dependencies before its body runs. Dynamic `import()` starts loading when execution reaches an expression, which is useful for optional features and runtime-selected modules. Import attributes provide additional information about the kind of module a request expects, such as JSON.

## Learning goals

- Compare static imports with dynamic `import()`.
- Read the module namespace returned by dynamic import.
- Load a feature conditionally and handle loading errors.
- Use a runtime-computed module specifier carefully.
- Import JSON with the `with { type: 'json' }` attribute.
- Pass import attributes to dynamic `import()`.
- Recognize host support and module-loading limits.

## Static and dynamic loading

A static import is declared at the top level of a module:

~~~js
import { createChart } from './chart.js';

createChart();
~~~

The dependency is part of the module graph and is linked before the importing module body runs. Static imports make dependencies easy to inspect and are the best default for code that is always needed.

A dynamic import is an expression:

~~~js
const chartModule = await import('./chart.js');
chartModule.createChart();
~~~

The import begins when execution reaches it. The expression returns a Promise that fulfills with a module namespace object after the module and its dependencies load and evaluate successfully. The namespace contains the module's exports, including a `default` property when the module has a default export.

`import()` resembles a function call, but `import` is syntax, not a function value. It cannot be aliased or invoked through a variable.

## Load a feature only when it is needed

Dynamic import is useful when a feature is optional, expensive, or needed only after an interaction. For example, an editor could be loaded only after the user asks to open it:

~~~js
const openButton = document.querySelector('#open-editor');
const status = document.querySelector('#status');

openButton.addEventListener('click', async function () {
  status.textContent = 'Loading editor...';

  try {
    const { createEditor } = await import('./editor.js');
    createEditor(document.querySelector('#editor-area'));
    status.textContent = 'Editor ready.';
  } catch (error) {
    console.error('Could not load the editor:', error);
    status.textContent = 'The editor could not be loaded.';
  }
});
~~~

The handler is `async`, so it can await the import Promise. The `try` block covers both loading and evaluation failures. The `catch` block can provide a useful fallback instead of leaving the interface stuck in a loading state.

Dynamic import can also be used with `.then()` and `.catch()`:

~~~js
import('./editor.js')
  .then(({ createEditor }) => {
    createEditor(document.querySelector('#editor-area'));
  })
  .catch((error) => {
    console.error('Could not load the editor:', error);
  });
~~~

Choose `await` when it keeps an asynchronous function readable. Choose Promise chaining when that style fits the surrounding code.

## Dynamic import in scripts and modules

A static `import` declaration requires module parsing. Dynamic `import()` can also be used in supported classic-script contexts:

~~~html
<script>
  document.querySelector('#load').addEventListener('click', async () => {
    const module = await import('./feature.js');
    module.start();
  });
</script>
~~~

The imported file is still loaded as a module, with module scope and module loading rules. Support and permitted execution contexts depend on the host. For example, some specialized worker or worklet contexts may reject dynamic imports.

## Use a computed module specifier

Unlike a static import, a dynamic import can use an expression to choose a module at runtime:

~~~js
const language = 'en';
const messages = await import('./messages-' + language + '.js');

console.log(messages.welcome);
~~~

The host resolves the resulting specifier using its module resolution rules. In browsers, relative specifiers are URL-based. Some bundlers need to recognize possible files during the build, so an unrestricted computed path may not work in every toolchain. Prefer a small explicit mapping for a fixed set of features:

~~~js
const loaders = {
  chart: () => import('./chart.js'),
  editor: () => import('./editor.js')
};

const loadFeature = loaders['chart'];
const feature = await loadFeature();
~~~

This keeps the supported choices visible and avoids constructing arbitrary paths from untrusted input.

## Handle loading failures

A dynamic import Promise rejects if the host cannot fetch or resolve the requested module, if parsing or linking fails, or if module evaluation throws. Handle that rejection wherever failure matters to the user:

~~~js
async function loadReports() {
  try {
    const reports = await import('./reports.js');
    reports.showReports();
  } catch (error) {
    console.error('Reports are unavailable:', error);
    showMessage('Reports could not be loaded. Try again later.');
  }
}
~~~

Avoid catching an error and silently pretending that the requested feature loaded. Log or display enough information to diagnose the failure, and let the interface recover when appropriate.

## Import attributes

An import attribute supplies extra information with a module request. The standardized `type` attribute is commonly used to identify JSON modules. Use the `with` syntax:

~~~js
import settings from './settings.json' with { type: 'json' };

console.log(settings.theme);
~~~

In a browser, JSON module imports use a default export containing the parsed JSON value. They do not provide named exports for each JSON property. Read a property from the imported object instead, for example `settings.theme`.

The attribute declares the expected module type. It does not turn arbitrary source text into JSON or JavaScript. The host validates and loads the resource according to its module rules. In browsers, the server must return an appropriate JSON media type. Node.js also requires the JSON type attribute for JSON module imports.

Support depends on the browser, runtime, and build tools. The `with` syntax is the current form; older examples that use `assert` refer to an earlier proposal and should not be copied into new code without checking the target environment.

## Import JSON dynamically

The second argument to dynamic `import()` carries attributes in a `with` object:

~~~js
async function loadSettings() {
  const settingsModule = await import('./settings.json', {
    with: { type: 'json' }
  });

  return settingsModule.default;
}
~~~

The returned value is a module namespace object, so the JSON value is at `.default`. Destructure it if that makes the code clearer:

~~~js
const { default: settings } = await import('./settings.json', {
  with: { type: 'json' }
});
~~~

Import attributes are part of both static imports and dynamic import requests. The host decides which attributes it supports and what behavior they control. For portable beginner code, use the standard JSON type form only when the target runtime supports it.

## Choose between static and dynamic import

| Situation | Better starting point | Reason |
| --- | --- | --- |
| A dependency is required for the page or program | Static import | Makes the dependency visible and available during module linking |
| A feature is rarely used or depends on a user action | Dynamic import | Starts the request only when execution reaches it |
| The requested module depends on runtime data | Dynamic import | The specifier can be computed at runtime |
| JSON configuration is a required dependency | Static import with a JSON type attribute | Declares the dependency and expected type up front |
| JSON is needed only after a user action | Dynamic import with a JSON type attribute | Loads the JSON module on demand |

Dynamic import can support code splitting in a build tool, but it does not guarantee a performance improvement by itself. Measure the application and follow the host or bundler's behavior.

## Common mistakes

### Forgetting to await or handle the Promise

~~~js
const feature = import('./feature.js');
feature.start();
~~~

`feature` is a Promise here, not the module namespace. Use `await import(...)` inside an async function or call `.then()` before using the exports.

### Reading the default export as a named export

~~~js
const settings = await import('./settings.json', {
  with: { type: 'json' }
});
console.log(settings.theme);
~~~

The dynamic import result is a namespace object. The JSON value is at `settings.default`, so use `settings.default.theme` or destructure the default export.

### Leaving a rejected import unhandled

If a user-triggered feature fails to load, an unhandled rejection can leave the interface without feedback. Catch the failure and show a useful message or recovery action.

### Omitting the JSON type attribute

~~~js
import settings from './settings.json';
~~~

In browsers and Node.js environments that require import attributes for JSON modules, this request fails. Specify `with { type: 'json' }` and confirm the target host supports it.

### Treating attributes as a content converter

An attribute does not rewrite a file. It tells the host how to handle or validate a module request. A response with the wrong type or media type can still fail to load.

### Assuming dynamic import is valid in every host context

Dynamic import works in many script and module contexts, but some specialized environments restrict it. Check the target runtime when working with workers, worklets, embedded engines, or build tools.

## Try it yourself

1. Load an optional help module only when a Help button is clicked.
2. Add a loading message before awaiting the import and restore a usable state if it rejects.
3. Import a module with a default export and read the `default` property from the returned namespace.
4. Replace a computed path with an explicit loader map and compare how easy each approach is to review.
5. Load JSON dynamically with `{ with: { type: 'json' } }` and render two values from the imported default object.
6. Deliberately misspell a module path and verify that the rejection reaches your error handler.
7. Compare a static import used by every page view with a dynamic import used only for a rarely opened feature.
8. Check whether your browser, Node.js version, or build tool supports the import attributes used by your project.

## Key points

- `import()` is an asynchronous expression that returns a Promise.
- The fulfilled Promise value is a module namespace object containing the exports.
- Dynamic imports can be conditional and can use computed specifiers.
- Catch failures from loading, linking, parsing, and module evaluation.
- Import attributes provide host-recognized information about a module request.
- Use `with { type: 'json' }` for JSON module imports in supported hosts.
- JSON modules expose their parsed value through the default export.
- Static imports remain the clearest default for dependencies needed immediately.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [81 - Export and import forms](081-export-and-import-forms.md) | [Open Q&A](../qnas/082-dynamic-imports-and-import-attributes.md) | [Open example](../examples/082-dynamic-imports-and-import-attributes.md) | [83 - Module loading, resolution, and import maps](083-module-loading-resolution-and-import-maps.md) |
