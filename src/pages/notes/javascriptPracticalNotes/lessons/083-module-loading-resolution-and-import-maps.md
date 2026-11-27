# 83 - Module loading, resolution, and import maps

A module's imports form a graph. The host resolves each specifier, loads the requested files, links their imports and exports, and evaluates the graph. Browsers use URL-based rules for module files. An import map lets a web page map readable names to URLs before its modules load.

## Learning goals

- Describe the module graph and its load, link, and evaluate stages.
- Resolve browser relative, absolute, and bare module specifiers.
- Know which URL is the base for an import in a module.
- Explain why browsers do not guess file extensions or index files.
- Use an import map to map bare names and path prefixes.
- Understand scoped mappings and fallback to global imports.
- Diagnose unresolved names, incorrect URLs, MIME errors, and CORS failures.
- Use `import.meta.resolve()` as a host-provided resolution aid where supported.

## The module graph

A module graph starts at one or more entry modules. In a browser, an entry module is commonly loaded by an HTML element:

~~~html
<script type="module" src="./main.js"></script>
~~~

If **main.js** imports **view.js**, and **view.js** imports **format.js**, those files are dependencies in the graph:

~~~js
// main.js
import { showPage } from './view.js';

showPage();
~~~

~~~js
// view.js
import { formatTitle } from './format.js';

export function showPage() {
  document.querySelector('h1').textContent = formatTitle('Modules');
}
~~~

~~~js
// format.js
export function formatTitle(value) {
  return 'Guide: ' + value;
}
~~~

The host processes the graph in broad stages:

1. **Load:** resolve module specifiers, fetch source, and parse modules and their dependencies.
2. **Link:** match each import to an export and prepare the bindings between modules.
3. **Evaluate:** execute the linked modules according to module evaluation rules.

A failure at any stage can prevent an entry module from running. For example, a missing file is a load failure, an import of a nonexistent export is a link failure, and an exception thrown by top-level module code is an evaluation failure.

The host controls how a specifier maps to a module identity. Browser URL loading and Node.js package resolution have different rules. This chapter focuses on browser URLs and import maps; later chapters cover Node.js packages and package configuration.

## Browser module specifiers

A **module specifier** is the string in an import declaration or dynamic import expression. Browsers resolve it as a URL. Common forms are:

| Kind | Example | Browser meaning |
| --- | --- | --- |
| Relative URL | `./utils/date.js` | Resolve from the URL of the module containing this import |
| Parent relative URL | `../shared/date.js` | Resolve from the containing module's URL after moving up a path segment |
| Root relative URL | `/assets/date.js` | Resolve from the origin's root path |
| Absolute URL | `https://example.test/date.js` | Request that URL directly |
| Bare specifier | `date-tools` or `@app/date.js` | Resolve through an import map in a document, if mapped |

A relative import inside **src/main.js** is based on the URL of **src/main.js**, not on the URL of the HTML document:

~~~js
// URL of this module: https://site.test/src/main.js
import { formatDate } from './utils/date.js';
~~~

The requested URL is **https://site.test/src/utils/date.js**. For imports inside a module, `./` and `../` refer to the importing module's URL.

### Write browser paths explicitly

Browsers request the URL that the specifier resolves to. They do not search for alternatives by trying `.js`, `/index.js`, or other suffixes:

~~~js
import { formatDate } from './utils/date.js';
~~~

Write the path that the server actually serves. An extension is not required by JavaScript syntax, but omitting it only works when the exact resulting URL returns a valid JavaScript module. Explicit paths avoid relying on server-specific fallback behavior.

A bare relative-looking path such as `utils/date.js` is not treated like `./utils/date.js` in browser module syntax. Start relative URL specifiers with `/`, `./`, or `../`.

### A bare name needs a mapping in browsers

A name such as `date-tools` does not tell the browser which URL to request. Without an import map or another host-specific mapping system, resolution fails:

~~~js
import { formatDate } from 'date-tools';
~~~

Import maps provide browser documents with a way to map that bare name to a URL. A bare specifier by itself does not automatically search a `node_modules` directory in a browser.

## What an import map does

An import map is JSON placed inline in the HTML document in a script element with `type="importmap"`. It maps module specifier keys to URL values:

~~~html
<script type="importmap">
  {
    "imports": {
      "date-tools": "./vendor/date-tools/index.js"
    }
  }
</script>

<script type="module" src="./src/main.js"></script>
~~~

Now module code can write:

~~~js
import { formatDate } from 'date-tools';
~~~

The browser substitutes the mapped URL when resolving `date-tools`. The map does not rewrite the source file; it affects how the host resolves module requests.

Place the import map before module scripts that use its mappings. In production, keeping one clear map near the start of the document makes resolution easier to follow. Browsers may process more than one import map, but later maps cannot redefine mappings that have already been used or resolved. Do not rely on late map changes to switch a running application's dependency graph.

Import maps are a document feature. They do not automatically provide the same mappings to a worker or worklet module graph.

## Exact and prefix mappings

An exact key maps one specifier:

~~~json
{
  "imports": {
    "date-tools": "./vendor/date-tools/index.js"
  }
}
~~~

A key ending in `/` maps a path prefix. Its value must also end in `/`:

~~~html
<script type="importmap">
  {
    "imports": {
      "@app/": "./src/",
      "@ui/": "./src/components/"
    }
  }
</script>
~~~

These imports:

~~~js
import { start } from '@app/main.js';
import { Button } from '@ui/button.js';
~~~

resolve to **./src/main.js** and **./src/components/button.js**, based on the document's base URL. The browser applies the most specific matching prefix when multiple prefix keys match. A prefix key and its mapped URL both need the trailing slash so the path can be appended safely.

Map values are URLs. Relative values in an import map are resolved relative to the document base URL, which can be affected by the document's `<base>` element. This differs from a relative import in a JavaScript file, which is resolved from the importing module's URL.

A mapping can also explicitly block a specifier by using `null` as its value:

~~~json
{
  "imports": {
    "private-tool": null
  }
}
~~~

A blocked or unmapped specifier cannot be resolved through that entry. Use such entries only when intentionally preventing a dependency name from resolving.

## Scoped mappings

The top-level `imports` map applies globally to modules in the document. The `scopes` map can choose another mapping based on the URL of the module that is doing the import. This is useful when different parts of an application require different versions of the same dependency.

~~~html
<script type="importmap">
  {
    "imports": {
      "date-tools": "/vendor/date-tools-v2/index.js"
    },
    "scopes": {
      "/legacy/": {
        "date-tools": "/vendor/date-tools-v1/index.js"
      }
    }
  }
</script>
~~~

A module whose URL is under **/legacy/** resolves `date-tools` to version 1. Other modules use the global mapping to version 2. A scope key is matched against the importing module's URL; it does not change the base URL for resolving the mapped value.

If more than one scope matches, the more specific matching scope is tried first. If a matching scope does not map the requested specifier, resolution can fall back to another matching scope and then to the global `imports` map. A matching mapping with a `null` value blocks resolution instead of falling back.

Keep scoped overrides limited and documented. They make a graph more flexible, but can make two imports with the same text refer to different module URLs depending on their importer.

## Optional integrity metadata

Import maps can also include an `integrity` object that associates module URLs with integrity metadata. The browser can use the metadata when fetching a matching module, unless integrity information is already supplied for that request.

This is an advanced deployment feature. Generate and maintain the hashes with the asset pipeline that publishes the files; a stale hash causes verification to fail. It is separate from mapping a specifier in `imports` or `scopes`.

## Inspect resolution with `import.meta.resolve()`

Where the host supports it, `import.meta.resolve()` returns the URL that a module specifier would resolve to from the current module:

~~~js
console.log(import.meta.resolve('./utils/date.js'));
console.log(import.meta.resolve('@app/main.js'));
~~~

The second call can use an import-map entry in a supporting browser. Resolving a URL does not fetch the module or prove that the resource exists. `import.meta.resolve()` is host-provided, so check the target runtime before using it in shared code.

## Loading requirements and common failures

### Missing or incorrect URL

If the resolved URL returns a 404 or another failed response, the module graph cannot load. Check the requested URL in the browser's Network panel. Remember that a relative specifier is based on the importing module, while an import-map value is based on the document.

### Wrong media type

A browser module response must have a JavaScript MIME type. A server may return an HTML fallback page for a missing `.js` file; the browser then reports a module MIME or parse error. Fix the URL or server response instead of changing the import declaration to hide the failure.

### Cross-origin restrictions

Cross-origin module fetches follow CORS rules. The remote server must allow the page's origin when a cross-origin module request requires it. A URL opening successfully in a tab does not guarantee that a module can import it from another origin.

### Unmapped bare specifier

An import such as `import { x } from 'library';` fails in a browser if `library` has no applicable import-map entry. Add a map to a URL that is served to the document, or use a valid relative or absolute URL.

### Import map processed too late

If the browser already resolved a module request, adding or changing an import map later cannot reliably redirect that request. Put the map before modules that depend on it and keep mappings stable.

### Worker or worklet mapping assumptions

A document's import map does not automatically control a separate worker or worklet graph. Use the loading and resolution options supported by that host rather than assuming the document's map is shared.

## A practical resolution checklist

1. Identify which file contains the import that failed.
2. Resolve relative paths from that module's URL, not from the HTML page.
3. For a bare specifier, find the applicable exact or prefix mapping.
4. Check whether a scope changes the mapping for that importer URL.
5. Confirm the final URL returns the intended resource and correct MIME type.
6. Check the console and network details for syntax, link, CORS, or server errors.
7. Confirm the target browser or runtime supports the import-map or resolution feature used.

## Try it yourself

1. Create a small page with an import map and replace a bare name with a relative file path.
2. Add a prefix mapping for `@app/` and import two files through it.
3. Change an import specifier to omit `./`, then observe why the browser treats it as a bare name.
4. Add a scoped mapping for a module under **/legacy/** and keep the global mapping for other code.
5. Use the Network panel to inspect the exact URL requested for a relative import.
6. Deliberately map a name to a missing file and distinguish a URL failure from an unmapped bare specifier.
7. If supported, print `import.meta.resolve()` for a relative path and a mapped bare specifier. Then verify that resolving alone does not fetch the file.
8. Explain why a map value such as `./src/` is relative to the document base URL rather than to the importing module.

## Key points

- A module graph is loaded, linked, and evaluated by its host.
- Browser module specifiers resolve as URLs, with relative paths based on the importing module.
- Browsers do not search alternative extensions or directory index files for an import.
- Bare specifiers need an import map in a browser document.
- Import maps are inline JSON in a `script` element with `type="importmap"`.
- Exact keys map one specifier; slash-ended keys map prefixes and use the most specific match.
- Scoped maps can override global mappings based on the importing module's URL.
- Import maps do not automatically apply to worker or worklet module graphs.
- The Network panel, response MIME type, and CORS details help diagnose module loading failures.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [82 - Dynamic imports and import attributes](082-dynamic-imports-and-import-attributes.md) | [Open Q&A](../qnas/083-module-loading-resolution-and-import-maps.md) | [Open example](../examples/083-module-loading-resolution-and-import-maps.md) | [84 - Package.json, npm, dependencies, scripts, and package managers](084-package-json-npm-dependencies-scripts-and-package-managers.md) |
