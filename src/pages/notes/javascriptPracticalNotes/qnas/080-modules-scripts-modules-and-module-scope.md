# 80 - Modules: scripts, modules, and module scope Q&A

These questions review classic scripts, JavaScript modules, scope, strict mode, loading, imports, host resolution, and common browser and Node.js pitfalls. Each answer follows its question.

## Scripts and module behavior

### 1. What tells a browser to parse an external JavaScript file as a module?

**Answer:** The HTML script element uses `type="module"`.

**Explanation:** A `.js` extension alone does not select module parsing in a browser. The HTML host declaration does.

### 2. Which syntax is allowed at the top level of a module but not a classic script?

- A. `const`
- B. `function`
- C. Static `import` and `export`
- D. `if`

**Answer:** C.

**Explanation:** Static import and export declarations belong to the module grammar and must appear at the top level.

### 3. Are JavaScript modules automatically strict?

**Answer:** Yes.

**Explanation:** Module code always runs in strict mode. It does not need a `"use strict"` directive.

### 4. What does `this` refer to at the top level of a browser module?

**Answer:** `undefined`.

**Explanation:** This differs from a browser classic script, where top-level `this` is the global this value.

### 5. Do top-level variables declared in a module automatically become properties of `globalThis`?

**Answer:** No.

**Explanation:** A module has its own top-level scope. It can still deliberately read or modify global objects, but its declarations are not automatically global properties.

### 6. In a classic browser script, does a top-level `let` declaration become a `globalThis` property?

**Answer:** No.

**Explanation:** Top-level `let`, `const`, and `class` declarations create global lexical bindings in classic scripts. A top-level `var` generally creates a global object property.

### 7. What is one benefit of module scope?

**Answer:** Declarations stay local to their module unless explicitly exported.

**Explanation:** This reduces accidental name collisions and makes dependencies visible through imports.

### 8. Is a module completely isolated from the page and global environment?

**Answer:** No.

**Explanation:** Modules have their own declaration scope, but they can access host APIs and explicitly use shared objects such as `globalThis` and the DOM.

### 9. Does adding `defer` to a normal module script usually provide a needed behavior?

**Answer:** No.

**Explanation:** Browser module scripts are deferred by default. `async` can change their scheduling and remove ordering guarantees.

### 10. What changes when a module script also has the `async` attribute?

**Answer:** It may execute as soon as its dependency graph is ready, without the usual document-order guarantee relative to other scripts.

**Explanation:** Use `async` only when independent execution timing is acceptable.

## Imports and exports

### 11. Where can a static `import` declaration appear?

**Answer:** At the top level of a module.

**Explanation:** It cannot be placed inside a function, block, or conditional. Use dynamic `import()` when loading must be requested at runtime.

### 12. What does a named export provide?

**Answer:** An exported binding identified by its name.

**Explanation:** A consumer imports that binding by name, unless it uses an explicit alias.

### 13. What does a default export provide?

**Answer:** One default-exported value for a module.

**Explanation:** A module can have one default export. The importing code may choose a local name for it.

### 14. How do you rename a named import locally?

- A. `import { count as total } from './data.js';`
- B. `import count => total from './data.js';`
- C. `import total: count from './data.js';`
- D. `rename import count to total from './data.js';`

**Answer:** A.

**Explanation:** The `as` clause changes the local imported name without changing the exported name.

### 15. What does `import * as tools from './tools.js'` create?

**Answer:** A module namespace object bound locally to `tools`.

**Explanation:** Its properties expose the module's exported names. It is not a copy of the module's source code.

### 16. Are imported bindings ordinary writable local variables?

**Answer:** No.

**Explanation:** An imported binding is read-only from the importing module. The exporting module may update an exported `let` binding, and importers observe the live binding.

### 17. What is a live binding?

**Answer:** An imported reference to an exported binding that reflects that binding's current value.

**Explanation:** Importing a value does not simply freeze a one-time copy of the export. The importer cannot assign to the imported binding itself.

### 18. Must static imports and exports be processed before module code runs?

**Answer:** Yes.

**Explanation:** The host links the module graph before evaluating the module bodies, so static dependencies are known ahead of execution.

### 19. Can a module import from another module that imports it back?

**Answer:** Yes, the module graph may contain a cycle.

**Explanation:** Cycles are linked by the module system, but code must avoid reading an imported binding before it has been initialized.

### 20. What does `export { value }` do?

**Answer:** It makes an existing local binding available to importers under the exported name `value`.

**Explanation:** The declaration must refer to a binding in that module, and the export list itself does not create a new variable.

## Loading and host behavior

### 21. What does `import('./feature.js')` return?

**Answer:** A Promise that fulfills with a module namespace object after the module loads and evaluates successfully.

**Explanation:** It can be used at runtime, and failures such as fetch or evaluation errors reject the Promise.

### 22. Can dynamic `import()` be used in a classic browser script?

**Answer:** Yes, in hosts that support dynamic import.

**Explanation:** Dynamic import is an expression and is distinct from a static `import` declaration. Host support and loading rules still apply.

### 23. Where is `await` allowed at the top level without wrapping it in an async function?

**Answer:** In a module that supports top-level await.

**Explanation:** Top-level await is not valid in a classic script. It can delay evaluation of importing modules that depend on the awaited module.

### 24. Does JavaScript define one universal algorithm for resolving every module specifier?

**Answer:** No.

**Explanation:** Resolution is host-defined. Browsers, Node.js, and other hosts can apply different rules.

### 25. In a browser, what is a typical relative import specifier?

- A. `./helpers.js`
- B. `helpers` in all cases
- C. `C:\\helpers.js`
- D. `globalThis.helpers`

**Answer:** A.

**Explanation:** Browser module paths are URL-based. Relative paths commonly begin with `./` or `../`, and the file extension is normally written explicitly.

### 26. Why can opening a module page directly with a `file://` URL fail?

**Answer:** Browser security and module-fetch rules can block or restrict loading local module files.

**Explanation:** Run the page from a local HTTP development server so modules are fetched with normal web URL and origin behavior.

### 27. What may be required when a browser module imports a resource from another origin?

**Answer:** The remote server must permit the cross-origin request through the relevant CORS response headers.

**Explanation:** Module scripts use fetch-based loading rules. A URL being reachable in a browser tab does not guarantee it can be imported by a page from another origin.

### 28. What can cause a module request to fail even when the URL looks correct?

**Answer:** A missing file, incorrect server MIME type, blocked cross-origin request, or network failure.

**Explanation:** Check the browser console and network panel for the requested URL, response status, MIME type, and CORS details.

### 29. How can Node.js identify an ES module file?

**Answer:** Common choices include the `.mjs` extension or a `.js` file in a package configured with `"type": "module"`.

**Explanation:** Node.js module interpretation depends on file extension and package configuration. Follow the conventions of the project and runtime version.

### 30. What is the `.cjs` extension commonly used for in Node.js?

**Answer:** It explicitly identifies a CommonJS module file.

**Explanation:** `.mjs` identifies ES modules, while `.cjs` identifies CommonJS. A package's `type` setting also affects `.js` interpretation.

## Apply and explain

### 31. What happens when this code is parsed as a classic script?

~~~js
import { format } from './format.js';
~~~

**Answer:** It fails to parse as a classic script.

**Explanation:** A static import declaration requires module parsing. In a browser, mark the entry script with `type="module"`.

### 32. What does this browser markup do?

~~~html
<script type="module" src="./main.js"></script>
~~~

**Answer:** It loads and evaluates `main.js` as a module, including its imported dependencies.

**Explanation:** Unless `async` is present, a module script is deferred until document parsing is complete.

### 33. What is printed by the following module code?

~~~js
const label = 'module';
console.log(Object.hasOwn(globalThis, 'label'));
~~~

**Answer:** `false`, assuming no unrelated code already created that property.

**Explanation:** A top-level module binding is not automatically a property on `globalThis`.

### 34. If an imported module updates an exported `let` binding, what does an importer observe on a later read?

**Answer:** The updated value of the live binding.

**Explanation:** The importer cannot assign to the imported name, but it observes updates made by the exporting module.

### 35. How should a program load a module only after a user selects a feature?

**Answer:** Call dynamic `import()` in the event handler and handle its Promise.

**Explanation:** For example, load a rarely used editor after a button click, then use the fulfilled module namespace. Handle rejection if loading or evaluation fails.

### 36. What should you check first when a browser reports that an import failed to load?

**Answer:** Verify the resolved URL, server response, MIME type, and any CORS error in the network panel and console.

**Explanation:** Module loading is a graph of fetches, so the failed request may be a dependency rather than the entry file.

### 37. Why is explicit import/export generally easier to maintain than reading another file's globals?

**Answer:** It makes dependencies and shared values visible in the module source.

**Explanation:** Explicit interfaces are easier to trace, rename, and review, and they reduce accidental coupling through global names.

### 38. Write the HTML element that loads `app.js` as a module.

**Answer:**

~~~html
<script type="module" src="./app.js"></script>
~~~

**Explanation:** The `type="module"` attribute selects browser module parsing. The path is relative to the document URL.

### 39. A file contains `export const answer = 42`, but a browser reports `Unexpected token 'export'`. Give two likely causes.

**Answer:** The file is being loaded as a classic script, or the request did not return the intended JavaScript module file.

**Explanation:** Check that the entry script has `type="module"`, then inspect the request URL and response. A server fallback page can return HTML where JavaScript was expected.

### 40. Which statement best summarizes how modules differ from classic scripts?

- A. Modules make every value private from all host APIs.
- B. Modules use their own scope, support static imports and exports, and run in strict mode.
- C. Modules can never access global objects.
- D. Modules always execute immediately when encountered in HTML.

**Answer:** B.

**Explanation:** Module scope and explicit imports/exports organize code, while strict mode is automatic. Modules can still access host APIs and globals, and browser module timing depends on attributes such as `async`.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [79 - Memory, garbage collection, and weak references](../lessons/079-memory-garbage-collection-and-weak-references.md) | [Lesson](../lessons/080-modules-scripts-modules-and-module-scope.md) · [Example](../examples/080-modules-scripts-modules-and-module-scope.md) | [81 - Export and import forms](../lessons/081-export-and-import-forms.md) |
