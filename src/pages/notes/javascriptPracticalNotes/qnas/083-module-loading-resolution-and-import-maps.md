# 83 - Module loading, resolution, and import maps Q&A

These questions review module graphs, browser URL resolution, import-map entries and scopes, and common loading failures. Each answer follows its question.

## Module graphs and specifiers

### 1. What is a JavaScript module graph?

**Answer:** An entry module together with the modules it imports, directly or indirectly.

**Explanation:** The host loads and links the dependencies before evaluating the entry module's code.

### 2. What are the broad stages of module processing?

**Answer:** Load, link, and evaluate.

**Explanation:** The host finds and parses modules, connects imports to exports, then executes the linked modules.

### 3. Which stage fails when a module imports a name that its dependency does not export?

**Answer:** Linking.

**Explanation:** The host cannot connect the requested import to an exported binding, so the importing module cannot be evaluated normally.

### 4. Which stage usually fails when a requested JavaScript file returns a 404?

**Answer:** Loading.

**Explanation:** The host cannot fetch the requested module source to parse it and continue building the graph.

### 5. Which stage fails if a module throws an exception in its top-level code?

**Answer:** Evaluation.

**Explanation:** The module was fetched, parsed, and linked, but execution threw an error.

### 6. From which URL does a browser resolve `./tools/date.js` inside `src/main.js`?

**Answer:** From the URL of `src/main.js`.

**Explanation:** Relative module specifiers use the importing module's URL as their base, not the document URL.

### 7. What does a browser root-relative specifier such as `/assets/app.js` mean?

**Answer:** A URL path rooted at the origin's root.

**Explanation:** It is not resolved from the current module's directory.

### 8. Is `https://cdn.example.test/lib.js` a relative or absolute module specifier?

**Answer:** It is an absolute URL specifier.

**Explanation:** The browser requests the URL directly, subject to the host's module loading rules, including CORS when relevant.

### 9. How does a browser interpret `utils/date.js` without a leading slash, `./`, or `../`?

**Answer:** As a bare specifier.

**Explanation:** A browser does not treat it as an implicit relative path. Use `./utils/date.js` for a relative URL or define a mapping for the bare name.

### 10. Does a browser try `file.js`, `file.js.js`, or `file/index.js` when an import requests `./file`?

**Answer:** No.

**Explanation:** It requests the URL resolved from the specifier. Browser module loading does not probe Node-style filename alternatives.

## Import-map basics

### 11. How does an HTML document declare an import map?

**Answer:** With an inline `<script type="importmap">` containing JSON.

**Explanation:** The browser processes the mapping as part of the document's module-loading setup.

### 12. What does an `imports` entry in an import map do?

**Answer:** It maps a module specifier key to a URL value.

**Explanation:** When a module requests that key, the host uses the mapped URL for resolution.

### 13. Which mapping lets browser code import the bare name `date-tools`?

~~~json
{
  "imports": {
    "date-tools": "./vendor/date-tools/index.js"
  }
}
~~~

**Answer:** The shown mapping.

**Explanation:** It assigns the bare specifier an explicit URL relative to the document's base URL.

### 14. Does a browser automatically search `node_modules` for an unmapped bare specifier?

**Answer:** No.

**Explanation:** Browsers need an import map or another host-supported mechanism to map a bare name to a URL.

### 15. What is a prefix mapping commonly used for?

**Answer:** Mapping a family of specifiers to paths under one URL prefix.

**Explanation:** For example, `"@app/": "./src/"` can map `@app/main.js` to `./src/main.js`.

### 16. If an import-map key ends in `/`, what must also be true of its URL value?

**Answer:** The URL value must also end in `/`.

**Explanation:** This lets the remaining specifier suffix be appended as a path under that URL prefix.

### 17. How does the browser choose between matching prefix keys such as `@app/` and `@app/ui/`?

**Answer:** It uses the most specific matching prefix.

**Explanation:** The longer matching prefix is more specific, so `@app/ui/` takes precedence for specifiers under that path.

### 18. Relative URL values in an import map are resolved against which base?

**Answer:** The document's base URL.

**Explanation:** This differs from a relative import in JavaScript source, which is based on the importing module's URL.

### 19. Can an import map replace the URL for a bare or URL-like specifier without editing the importing source?

**Answer:** Yes, if a matching import-map entry applies.

**Explanation:** Import maps alter host resolution of the specifier; they do not rewrite the source file itself.

### 20. What does a `null` value for a mapped specifier do?

**Answer:** It blocks that specifier from resolving through the mapping.

**Explanation:** It is not a fallback URL. Use it only when intentionally preventing a name from resolving.

## Scopes and map timing

### 21. What does an import-map `scopes` entry select?

**Answer:** A specifier map to try based on the URL of the module making the import.

**Explanation:** It can let different parts of a document's module graph resolve the same name differently.

### 22. Does an import-map scope key change the base URL for the mapping's URL values?

**Answer:** No.

**Explanation:** Scope keys match importer URLs. Relative mapping values still resolve against the document's base URL.

### 23. If a module matches a scope but that scope has no entry for the requested name, what can happen?

**Answer:** Resolution can try other matching scopes and then the global `imports` map.

**Explanation:** A scoped map can override selected names while allowing other names to use broader mappings.

### 24. When multiple scope keys match an importing module, which is tried first?

**Answer:** The more specific matching scope.

**Explanation:** A nested or longer matching path scope takes priority over a less specific scope.

### 25. Can an import map processed later redefine a mapping that has already been used to resolve a module?

**Answer:** No.

**Explanation:** Import-map merging rules prevent late maps from changing resolution decisions that have already been made. Put required mappings before modules that use them.

### 26. Should a page rely on a late import map to switch versions after the app has loaded?

**Answer:** No.

**Explanation:** Module resolution decisions are tied to requests already made. Keep mappings stable and declare them before dependent modules execute.

### 27. Does a document import map automatically apply to a worker or worklet's module graph?

**Answer:** No.

**Explanation:** Import maps are a document feature and are not automatically shared with separate worker or worklet contexts.

### 28. What is the optional `integrity` section of an import map for?

**Answer:** Associating integrity metadata with module URLs so matching module fetches can be verified.

**Explanation:** It is deployment metadata, separate from the `imports` and `scopes` resolution maps. Hashes must match the published resources.

### 29. What does `import.meta.resolve('./helper.js')` return in a host that supports it?

**Answer:** The URL that the specifier resolves to from the current module.

**Explanation:** It is a host-provided resolution helper. It does not fetch the file or prove that the URL exists.

### 30. Is `import.meta.resolve()` guaranteed to be part of every JavaScript host?

**Answer:** No.

**Explanation:** Resolution APIs are host-provided. Check support in the runtime where the code will run.

## Troubleshooting and apply

### 31. A browser reports that bare specifier `charting` could not be resolved. What should you check?

**Answer:** Check for an applicable `imports` or `scopes` entry in the document's import map.

**Explanation:** A bare name does not tell the browser which URL to request by itself.

### 32. A relative import points to the wrong directory. What base should you check?

**Answer:** The URL of the file containing that import.

**Explanation:** The HTML document URL is not the base for relative imports written inside a JavaScript module.

### 33. Why might a missing `.js` file produce a module MIME error instead of a clear missing-file message?

**Answer:** The server may return an HTML fallback page for the missing URL.

**Explanation:** Inspect the Network panel for the exact URL, status, response body, and content type.

### 34. What should a browser server return for a JavaScript module response?

**Answer:** A JavaScript MIME type.

**Explanation:** A successful HTTP status alone is not enough if the response is actually an HTML page or an unsupported media type.

### 35. Why can a cross-origin module URL fail even when it opens in a browser tab?

**Answer:** The remote server may not permit the importing page's origin through CORS.

**Explanation:** A direct navigation and a cross-origin module fetch are different requests with different access checks.

### 36. A mapping works for `@app/main.js` but not for `@app`. What might be wrong?

**Answer:** The import map may define a slash-ended prefix key such as `@app/`, which does not match the distinct exact specifier `@app`.

**Explanation:** Prefix mappings match the key plus a suffix. Add a separate exact mapping if both forms should resolve.

### 37. In this import map, what URL does `@ui/button.js` map to?

~~~json
{
  "imports": {
    "@ui/": "./src/components/"
  }
}
~~~

**Answer:** `./src/components/button.js`, resolved from the document base URL.

**Explanation:** The suffix after the matching `@ui/` prefix is appended to the mapped URL prefix.

### 38. Which is the correct import-map placement when `main.js` uses a bare specifier from the map?

- A. After the module script that imports the name
- B. Before the module script that imports the name
- C. Inside `main.js` as an ordinary object
- D. In a separate file referenced with `src` on the import-map script

**Answer:** B.

**Explanation:** Put the mapping in the document before module scripts that depend on it. Import maps are inline JSON, not external script files.

### 39. Does successfully resolving a specifier prove that its module can be fetched and evaluated?

**Answer:** No.

**Explanation:** Resolution produces a URL. Fetching, parsing, linking, and evaluation can still fail afterward.

### 40. Which statement best summarizes browser module resolution?

- A. Browsers search project folders and guess extensions for every import.
- B. Browser modules use URL-based resolution, and import maps can map bare names to URLs.
- C. A document import map automatically controls every worker and worklet.
- D. Every module specifier is resolved relative to the HTML document.

**Answer:** B.

**Explanation:** Relative imports use the importing module's URL, and a document import map can provide explicit mappings for bare names. Other stages can still fail even when a specifier resolves.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [82 - Dynamic imports and import attributes](../lessons/082-dynamic-imports-and-import-attributes.md) | [Lesson](../lessons/083-module-loading-resolution-and-import-maps.md) · [Example](../examples/083-module-loading-resolution-and-import-maps.md) | [84 - Package.json, npm, dependencies, scripts, and package managers](../lessons/084-package-json-npm-dependencies-scripts-and-package-managers.md) |
