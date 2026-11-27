# 82 - Dynamic imports and import attributes example

This browser project loads a help feature only after a button click and imports a JSON settings file with a dynamic import attribute. It displays loading states and handles failures for both requests.

## Goal

Use `import()` for optional code, read a named export from its module namespace, and read a JSON module's default export after supplying the JSON type attribute.

## Project files

Create these files in one folder:

~~~text
dynamic-import-example/
  index.html
  main.js
  help.js
  settings.json
~~~

## 1. Create the page

Save this as **index.html**:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dynamic import example</title>
  </head>
  <body>
    <main>
      <h1>Dynamic imports</h1>
      <p>Load the optional help module or the JSON settings when you need them.</p>
      <button id="load-help" type="button">Load help</button>
      <button id="load-settings" type="button">Load settings</button>
      <section id="output" aria-live="polite">
        <p>Choose an action to load a module.</p>
      </section>
    </main>

    <script type="module" src="./main.js"></script>
  </body>
</html>
~~~

The browser loads **main.js** as the entry module. Neither **help.js** nor **settings.json** is imported until its corresponding button is clicked.

## 2. Create the optional help module

Save this as **help.js**:

~~~js
export function showHelp(container) {
  const heading = document.createElement('h2');
  heading.textContent = 'Help loaded on demand';

  const message = document.createElement('p');
  message.textContent = 'This feature was loaded after you clicked the button.';

  container.replaceChildren(heading, message);
}
~~~

The module has a named export called `showHelp`. It does not run when the page first loads. Its code runs when the dynamic import is requested and the module evaluates.

## 3. Create the JSON settings module

Save this as **settings.json**:

~~~json
{
  "title": "Module settings",
  "description": "These settings arrived as a JSON module.",
  "features": [
    "Optional JavaScript feature",
    "JSON type attribute",
    "Promise error handling"
  ]
}
~~~

A browser must serve the file with an appropriate JSON media type. The import attribute tells a supporting host that this request expects a JSON module.

## 4. Load modules when the user asks

Save this as **main.js**:

~~~js
const output = document.querySelector('#output');
const helpButton = document.querySelector('#load-help');
const settingsButton = document.querySelector('#load-settings');

helpButton.addEventListener('click', async function () {
  output.textContent = 'Loading help...';

  try {
    const helpModule = await import('./help.js');
    helpModule.showHelp(output);
  } catch (error) {
    console.error('Could not load help:', error);
    output.textContent = 'Help could not be loaded. Check the console and try again.';
  }
});

settingsButton.addEventListener('click', async function () {
  output.textContent = 'Loading settings...';

  try {
    const settingsModule = await import('./settings.json', {
      with: { type: 'json' }
    });
    const settings = settingsModule.default;

    const heading = document.createElement('h2');
    heading.textContent = settings.title;

    const description = document.createElement('p');
    description.textContent = settings.description;

    const list = document.createElement('ul');
    for (const feature of settings.features) {
      const item = document.createElement('li');
      item.textContent = feature;
      list.append(item);
    }

    output.replaceChildren(heading, description, list);
  } catch (error) {
    console.error('Could not load settings:', error);
    output.textContent = 'Settings could not be loaded. Check the console and try again.';
  }
});
~~~

`await import('./help.js')` fulfills with a namespace object. The code reads its named export as `helpModule.showHelp`. The JSON import also fulfills with a namespace object, and the parsed settings are its `default` export.

## Run the example

Serve the folder over a local HTTP development server, then open its **index.html** URL. Do not open it directly with a `file://` URL. The browser needs to fetch the module files, and the server must send **settings.json** with a JSON media type.

The page initially says:

~~~text
Choose an action to load a module.
~~~

Click **Load help**. The output becomes:

~~~text
Help loaded on demand
This feature was loaded after you clicked the button.
~~~

Click **Load settings**. The output becomes:

~~~text
Module settings
These settings arrived as a JSON module.

- Optional JavaScript feature
- JSON type attribute
- Promise error handling
~~~

This example requires a browser that supports dynamic import options and JSON modules. If the JSON request fails because the file is missing or its response type is incorrect, the catch block displays a helpful message. Check the browser console for the underlying error.

## Trace the requests

1. Loading **index.html** loads **main.js** as a module.
2. The first button handler starts `import('./help.js')` only after a click.
3. The import Promise fulfills with the **help.js** namespace, and `showHelp` updates the page.
4. The second button handler starts the JSON request only after a click.
5. The `with: { type: 'json' }` option identifies the expected JSON module type.
6. The JSON namespace exposes the parsed object as `default`.
7. Each `try` and `catch` pair handles loading or evaluation failures for its feature.

## Try it yourself

1. Add a `version` property to **settings.json** and display it on the page.
2. Add a third optional module and a button that imports it only when clicked.
3. Change the help import to use `.then()` and `.catch()` instead of `async` and `await`.
4. Deliberately misspell **help.js** and confirm the catch block displays a message.
5. Temporarily remove the JSON type attribute and observe the host's error.
6. Add a retry button to the error message and use it to request the failed feature again.
7. Compare an import path written as a literal with a small explicit map of feature loaders.

## Key points

- `import()` starts loading when execution reaches the expression and returns a Promise.
- The fulfilled value is a namespace object, so named exports are read as properties.
- JSON module data is available from the namespace object's `default` export.
- Dynamic import options pass attributes under the `with` property.
- Loading, parsing, linking, and evaluation failures reject the import Promise.
- Serve module examples over HTTP and use a server that returns the expected JSON media type.
- Import-attribute support depends on the target host and tools.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [81 - Export and import forms](../lessons/081-export-and-import-forms.md) | [Open lesson](../lessons/082-dynamic-imports-and-import-attributes.md) | [Open Q&A](../qnas/082-dynamic-imports-and-import-attributes.md) | [83 - Module loading, resolution, and import maps](../lessons/083-module-loading-resolution-and-import-maps.md) |
