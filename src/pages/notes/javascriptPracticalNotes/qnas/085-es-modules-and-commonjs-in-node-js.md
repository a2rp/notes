# 85 - ES modules and CommonJS in Node.js Q&A

These questions review Node.js module formats, export and import syntax, file markers, package scopes, and ESM and CommonJS interoperability. Each answer follows its question, with an explanation to clarify the rule or its limits.

## Module formats and syntax

### 1. What problem does a module system solve?

**Answer:** It lets a program divide code into files with explicit dependencies and exported values.

**Explanation:** The runtime loads modules and provides the exports requested by other modules.

### 2. Which syntax identifies an ECMAScript module export?

- A. **module.exports**
- B. **export**
- C. **require()**
- D. **exports**

**Answer:** B.

**Explanation:** ESM uses **export** declarations and **import** declarations. CommonJS uses **module.exports**, **exports**, and **require()**.

### 3. Which syntax imports named ESM bindings called add and answer?

**Answer:** Use a named import with braces, such as **import { add, answer } from './math.js'**.

**Explanation:** The requested names must match exports from the target module, including letter case.

### 4. Does a default ESM import have to use the local name written by the exporting module?

**Answer:** No. The importing module can choose a local name.

**Explanation:** A default export is imported without braces, and the receiving file chooses the identifier it uses.

### 5. Can an ESM file have more than one default export?

**Answer:** No. A module has at most one default export.

**Explanation:** It can provide many named exports as well as one default export.

### 6. What does an ESM importing module receive when it imports a named binding?

**Answer:** A read-only view of the exporter's live binding.

**Explanation:** The importing module cannot assign a new value to its imported binding. It is linked to the binding exported by the source module.

### 7. What does CommonJS require() return?

**Answer:** The value assigned to the required module's **module.exports**.

**Explanation:** The exported value can be an object, function, class, or another value.

### 8. What is the initial relationship between exports and module.exports in CommonJS?

**Answer:** **exports** initially refers to the same object as **module.exports**.

**Explanation:** Adding a property through **exports.name** adds it to the initially shared object. Replacing **module.exports** does not update the **exports** alias.

### 9. What is the effect of assigning a new value to module.exports?

~~~js
module.exports = function greet() {};
~~~

**Answer:** It replaces the value that a CommonJS importer receives.

**Explanation:** After this assignment, later changes through the old **exports** alias do not add properties to the replacement function.

### 10. Which module format uses static import declarations?

**Answer:** ESM.

**Explanation:** Static imports are declared at the module top level, where the loader can identify dependencies before evaluating the module.

## Selecting the Node.js format

### 11. What does a package.json type value of module do to .js files in its package scope?

**Answer:** It marks those **.js** files as ESM.

**Explanation:** The nearest parent package.json determines the format for ordinary **.js** files.

### 12. What does a package.json type value of commonjs do to .js files in its package scope?

**Answer:** It marks those **.js** files as CommonJS.

**Explanation:** This makes the intended format explicit instead of relying on runtime defaults or syntax detection.

### 13. Which module format does a .mjs file explicitly select?

**Answer:** ESM.

**Explanation:** The extension identifies the file as ESM regardless of the nearest package.json type field.

### 14. Which module format does a .cjs file explicitly select?

**Answer:** CommonJS.

**Explanation:** The extension identifies the file as CommonJS even inside a package whose type is module.

### 15. Which files are governed by a package.json type field?

**Answer:** Ordinary **.js** files within that package scope.

**Explanation:** The nearest package.json with a type field determines how those files are interpreted. Explicit **.mjs** and **.cjs** extensions override it.

### 16. What does a nested package.json do to a package scope?

**Answer:** It starts a closer scope whose type setting governs files below it.

**Explanation:** A nested package can use a different module type from its parent package.

### 17. Why is setting the package type explicitly a useful habit?

**Answer:** It makes the intended .js format clear to Node.js, editors, and tools.

**Explanation:** Behavior for ambiguous files without an explicit marker can vary with Node.js version and syntax detection. Explicit markers reduce confusion.

### 18. A package has type module. What format is a file named legacy.cjs?

**Answer:** CommonJS.

**Explanation:** The **.cjs** extension marks CommonJS regardless of the package's type field.

### 19. A package has type commonjs. What format is a file named helper.mjs?

**Answer:** ESM.

**Explanation:** The **.mjs** extension marks ESM regardless of the package's type field.

### 20. What should you check before changing a project's type from commonjs to module?

**Answer:** Its source files, dependencies, scripts, tests, build tools, and deployment runtime.

**Explanation:** The change affects every ordinary **.js** file in that package scope, so related code and tooling may need to change together.

## Loading and file behavior

### 21. Can a static import declaration be placed inside an if block?

**Answer:** No.

**Explanation:** Static ESM imports are module-level declarations. Use dynamic **import()** for a conditional load.

### 22. What does dynamic import() return?

**Answer:** A promise that fulfills with the imported module namespace.

**Explanation:** The load is asynchronous, so handle the promise with **await** or with promise handlers.

### 23. Can dynamic import() be used from a CommonJS module?

**Answer:** Yes.

**Explanation:** Dynamic import is supported in CommonJS and provides a portable way to load an ESM module asynchronously.

### 24. Which format supports top-level await?

**Answer:** ESM.

**Explanation:** Top-level await is available in ESM. CommonJS code should use an async function when it needs to await an operation.

### 25. Does Node.js ESM normally infer a missing .js extension for a relative import?

**Answer:** No. Include the extension in a relative ESM specifier.

**Explanation:** For example, use **./helpers.js**. A missing extension can cause module resolution to fail.

### 26. What is one reason to use the node: prefix for a built-in module?

**Answer:** It explicitly identifies the request as a Node.js built-in module.

**Explanation:** For example, ESM can import **node:fs/promises**, while CommonJS can pass the same specifier to **require()**.

### 27. Which file location values are available by default in CommonJS?

**Answer:** **__filename** and **__dirname**.

**Explanation:** They identify the current CommonJS file and its directory. They are module-scoped, not globals shared by the whole application.

### 28. What ESM value identifies the current module by URL?

**Answer:** **import.meta.url**.

**Explanation:** It is a URL, not a normal filesystem path. Convert it with Node.js URL and path utilities when a filesystem path is needed.

## Interoperability and troubleshooting

### 29. When an ESM file imports a CommonJS module, what does its default import represent?

**Answer:** The CommonJS module's **module.exports** value.

**Explanation:** This is the dependable default interop shape. Node.js may expose named properties too, but that depends on static analysis of the CommonJS code.

### 30. Are named imports from every CommonJS module guaranteed to work?

**Answer:** No.

**Explanation:** Node.js detects many CommonJS export patterns, but the analysis cannot recognize every dynamic export pattern. A default import is safer when named exports are uncertain.

### 31. What is the portable way for CommonJS code to load an ESM module?

**Answer:** Use dynamic **import()** and handle its promise.

**Explanation:** Some recent Node.js versions can use **require()** for certain synchronous ESM modules, but that has version and module constraints. Dynamic import also supports ESM graphs that need asynchronous evaluation.

### 32. What does “require is not defined in ES module scope” usually mean?

**Answer:** Node.js is treating the file as ESM, where CommonJS **require()** is not automatically available.

**Explanation:** Use ESM **import** syntax, mark a deliberately CommonJS file with **.cjs**, or use Node.js **module.createRequire()** for the specialized interop case.

### 33. What should you check for “Cannot use import statement outside a module”?

**Answer:** Check the file extension and the nearest package.json type field.

**Explanation:** Node.js is likely interpreting the file as CommonJS while its source contains ESM syntax. Make the intended format explicit.

### 34. What should you check if Node.js reports that an export name does not exist?

**Answer:** Check the export spelling and case, and whether the target uses a default export instead of a named export.

**Explanation:** Named imports must match named exports. A default export is imported without braces.

### 35. A relative ESM import fails with a module-not-found error. What should you inspect?

**Answer:** The path from the importing file, the explicit file extension, and the filename's case.

**Explanation:** Relative specifiers are resolved from the importing module, and case sensitivity differs across filesystems.

### 36. Can an ESM file use module.exports as if it were CommonJS syntax?

**Answer:** No, not by default.

**Explanation:** ESM exports use **export** declarations. If the file intentionally needs CommonJS behavior, mark it as CommonJS or use a supported interop mechanism.

### 37. Can a CommonJS file use static import declarations as if it were ESM?

**Answer:** No.

**Explanation:** Static **import** declarations belong to ESM. Use **require()** for CommonJS dependencies or dynamic **import()** for an asynchronous ESM load.

### 38. Which statement about importing CommonJS from ESM is most accurate?

- A. The default import always equals the CommonJS module's module.exports value.
- B. Every CommonJS property is guaranteed to become a named ESM export.
- C. CommonJS can only be loaded using require().
- D. The ESM importer changes the CommonJS module's package type.

**Answer:** A.

**Explanation:** The default import provides **module.exports**. Named exports may be inferred from some CommonJS patterns, but are not guaranteed for every module.

### 39. A project uses both formats. What is a clear way to mark the files?

**Answer:** Use explicit package scope settings and, when necessary, **.mjs** and **.cjs** extensions.

**Explanation:** Each file's marker should agree with its syntax, and the project should be checked against the Node.js versions it supports.

### 40. Which summary best describes Node.js ESM and CommonJS?

- A. They are identical syntaxes with different file names.
- B. ESM uses import and export; CommonJS uses require and module.exports, and Node.js supports both with explicit format markers.
- C. Node.js can run only CommonJS files.
- D. The package.json type field changes .mjs and .cjs files.

**Answer:** B.

**Explanation:** The formats have different syntax and some different behavior. Package type selects the format of ordinary **.js** files, while **.mjs** and **.cjs** explicitly select their respective formats.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [84 - Package.json, npm, dependencies, scripts, and package managers](../lessons/084-package-json-npm-dependencies-scripts-and-package-managers.md) | [Lesson](../lessons/085-es-modules-and-commonjs-in-node-js.md) / [Example](../examples/085-es-modules-and-commonjs-in-node-js.md) | [86 - Transpilation, bundlers, polyfills, and source maps](../lessons/086-transpilation-bundlers-polyfills-and-source-maps.md) |
