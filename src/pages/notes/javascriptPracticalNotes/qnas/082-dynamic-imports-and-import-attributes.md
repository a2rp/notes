# 82 - Dynamic imports and import attributes Q&A

These questions review static versus dynamic loading, the Promise returned by `import()`, module namespace objects, runtime-selected modules, failure handling, and JSON import attributes. Each answer follows its question.

## Dynamic import basics

### 1. What does a dynamic `import()` expression return?

**Answer:** A Promise.

**Explanation:** The Promise fulfills with a module namespace object after the requested module loads, links, and evaluates successfully.

### 2. How does a dynamic import differ from a static import declaration?

**Answer:** A static import declares a dependency at the module level, while a dynamic import starts when execution reaches the expression.

**Explanation:** Dynamic imports can be conditional or use a computed specifier. Static imports make initial dependencies explicit.

### 3. What is the value provided when `await import('./tools.js')` succeeds?

**Answer:** A module namespace object containing the exports of `tools.js`.

**Explanation:** Access a named export as a property, such as `tools.format`. A default export, if present, is available as `tools.default`.

### 4. Does `import()` run when its containing function is defined?

**Answer:** No.

**Explanation:** It runs only when control flow evaluates the expression, such as when a function is called or an event handler runs.

### 5. Can dynamic `import()` be used in a classic browser script?

**Answer:** Yes, in supported execution contexts.

**Explanation:** Static import declarations require module parsing, but dynamic import expressions can load modules from many classic-script contexts. Some specialized hosts may restrict them.

### 6. Is `import` in `import('./tools.js')` an ordinary function value?

**Answer:** No.

**Explanation:** Dynamic import is syntax that resembles a function call. It cannot be assigned to a variable and invoked through an alias.

### 7. Can the specifier passed to `import()` be computed at runtime?

**Answer:** Yes.

**Explanation:** A dynamic import accepts an expression that evaluates to a module specifier. The host still determines how that specifier resolves.

### 8. Why might a fixed loader map be safer than building a module path from user input?

**Answer:** It limits loading to an explicit set of known modules.

**Explanation:** A loader map is easier to review and may also work better with bundlers that need to discover possible files at build time.

### 9. How can you access a named export after dynamically importing a module?

**Answer:** Read it from the fulfilled namespace, for example `const { start } = await import('./feature.js');`.

**Explanation:** Destructuring the namespace gives a local value for use after the Promise fulfills.

### 10. How can you access a module's default export from a dynamic import result named `module`?

**Answer:** Use `module.default`.

**Explanation:** The Promise fulfills with a namespace object whose `default` property represents the module's default export.

## Promise flow and errors

### 11. What should code do before using a dynamically imported export?

**Answer:** Await the Promise or handle it with `.then()`.

**Explanation:** The immediate result of `import()` is a Promise, not the module namespace object.

### 12. What does this code try to call?

~~~js
const feature = import('./feature.js');
feature.start();
~~~

**Answer:** It tries to call `start` on a Promise, so it fails.

**Explanation:** Use `const feature = await import('./feature.js')` inside an async function, or access the module in a `.then()` callback.

### 13. What kinds of failures can reject a dynamic import Promise?

**Answer:** Fetch or resolution failures, parse or link errors, and exceptions while evaluating the module or one of its dependencies.

**Explanation:** A failure in any part of the requested module graph can prevent the import from fulfilling.

### 14. How do you handle a dynamic import failure when using `await`?

**Answer:** Wrap the `await import(...)` in `try` and `catch`.

**Explanation:** This lets the program report the problem or provide a fallback for the user.

### 15. How do you handle failure with Promise chaining?

**Answer:** Attach a `.catch()` handler to the Promise chain.

**Explanation:** The rejection handler can log the error and update the interface with a recovery message.

### 16. Why is error handling useful for a feature loaded after a button click?

**Answer:** The page can tell the user that the feature did not load and offer a retry or fallback.

**Explanation:** Without handling the rejection, the interaction may appear to do nothing and create an unhandled Promise rejection.

### 17. Is dynamic import guaranteed to make an application faster?

**Answer:** No.

**Explanation:** It can defer loading work or enable code splitting, but network requests, build tools, and application usage affect whether it improves performance. Measure the result.

### 18. What is a reasonable default for a dependency needed immediately by a module?

**Answer:** Use a static import.

**Explanation:** It clearly declares the dependency and allows the host and tools to analyze the module graph before the importing module runs.

### 19. Can top-level `await import('./feature.js')` be used in a classic script?

**Answer:** No, top-level `await` requires module context.

**Explanation:** In a classic script, use an async function or a Promise handler around `import()`.

### 20. Why might a computed specifier work in the browser but fail in a bundler build?

**Answer:** The bundler may be unable to determine which files the runtime expression could request.

**Explanation:** A finite loader map with explicit import paths makes the possible modules visible to build tools.

## Import attributes and JSON modules

### 21. What does an import attribute provide?

**Answer:** Additional information to the host about how a module request should be handled or validated.

**Explanation:** A common standardized use is declaring that an imported file is expected to be JSON.

### 22. What is the current static syntax for importing JSON as a module?

**Answer:** `import data from './data.json' with { type: 'json' };`

**Explanation:** The `with` clause supplies the JSON type attribute with the module request.

### 23. How do you pass the JSON type attribute to dynamic `import()`?

**Answer:** Pass an options object with a nested `with` object, such as `import('./data.json', { with: { type: 'json' } })`.

**Explanation:** Dynamic import uses its second argument for options and attributes.

### 24. Where is the parsed JSON value in a successful dynamic import result named `dataModule`?

**Answer:** `dataModule.default`.

**Explanation:** A JSON module exposes the parsed JSON value through its default export, not through automatically generated named exports.

### 25. Can you write `import { theme } from './settings.json' with { type: 'json' };` to import a JSON property by name?

**Answer:** No.

**Explanation:** JSON modules provide a default export containing the parsed object. Import the default and then read `settings.theme`.

### 26. Does `with { type: 'json' }` convert arbitrary text into valid JSON?

**Answer:** No.

**Explanation:** It identifies the expected module type for the host. The resource still needs to be valid JSON and meet the host's loading requirements.

### 27. Why can a browser reject a JSON module whose server response has a JavaScript MIME type?

**Answer:** The declared JSON type and the response media type do not match the expected module type.

**Explanation:** Browsers validate module types. Configure the server to send an appropriate JSON media type for JSON files.

### 28. Do all browsers, runtimes, and build tools necessarily support every import attribute?

**Answer:** No.

**Explanation:** Attribute support varies by host and version. Check the target environment, especially when using attributes other than the standard JSON type.

### 29. Which syntax should new code use for JSON import attributes?

- A. `assert { type: 'json' }`
- B. `with { type: 'json' }`
- C. `as { type: 'json' }`
- D. `options { type: 'json' }`

**Answer:** B.

**Explanation:** The `with` form is the current import-attributes syntax. `assert` came from an earlier proposal and should not be used as the current standard form.

### 30. If the runtime does not support a requested import attribute, what should the developer do?

**Answer:** Check the host's supported syntax and use a compatible approach for that target.

**Explanation:** Import attributes are interpreted by the host. A syntax or runtime compatibility problem cannot be fixed by assuming an unsupported attribute will be ignored.

## Apply and explain

### 31. When does this module start loading?

~~~js
if (userSelectedReports) {
  const reports = await import('./reports.js');
  reports.showReports();
}
~~~

**Answer:** When execution enters the branch and evaluates the `import()` expression.

**Explanation:** The import is conditional, so the reports module is requested only when the condition is true.

### 32. What does this import return after success?

~~~js
const { default: settings } = await import('./settings.json', {
  with: { type: 'json' }
});
~~~

**Answer:** The `settings` local variable receives the JSON module's default export, the parsed JSON value.

**Explanation:** The dynamic import Promise fulfills with a namespace object, and destructuring selects its `default` property.

### 33. What should the catch block do if an optional editor fails to load?

**Answer:** Report the failure and keep the rest of the page usable, possibly with a retry action.

**Explanation:** A failure in an optional feature should not silently leave the user without feedback or break unrelated functionality.

### 34. Does a dynamic import evaluate its module before the import expression runs?

**Answer:** No.

**Explanation:** The expression starts the import when execution reaches it. Once successfully loaded, module evaluation follows the host's module rules.

### 35. What is one difference between loading a feature dynamically and loading it statically?

**Answer:** Dynamic loading can wait until a later interaction, while static loading declares the dependency as part of the initial module graph.

**Explanation:** Dynamic loading can reduce initial work for rarely used features, but it also adds an asynchronous loading path that needs error handling.

### 36. What does a namespace import from dynamic `import()` contain?

**Answer:** The requested module's exported bindings, including `default` if the module has one.

**Explanation:** The namespace is the fulfillment value of the Promise and can be destructured after awaiting.

### 37. Why is an explicit feature loader map useful?

**Answer:** It documents supported choices and gives tools a finite list of import paths.

**Explanation:** It also avoids passing arbitrary user-controlled strings directly into module loading.

### 38. What does a JSON type attribute guarantee in code design?

**Answer:** It communicates the expected module type to the host so it can apply the appropriate handling or validation.

**Explanation:** The exact behavior is host-defined, but the attribute does not itself sanitize or transform untrusted content.

### 39. Should a JSON module be used for data that changes on the server every few seconds?

**Answer:** Usually not as a frequently refreshed data mechanism.

**Explanation:** Module imports are dependency loading and are commonly cached by the host. Use a data-fetching API such as `fetch()` when the application needs repeatedly refreshed server data.

### 40. Which statement best summarizes dynamic imports and import attributes?

- A. Dynamic imports are synchronous and return ordinary objects.
- B. Import attributes make any file extension parse as JavaScript.
- C. `import()` returns a Promise for a module namespace, and attributes give the host extra information about a module request.
- D. JSON module properties are always available as named imports.

**Answer:** C.

**Explanation:** Dynamic import is asynchronous and failures reject its Promise. Attributes such as `type: 'json'` tell a supporting host what type is expected; a JSON module exposes its value as the default export.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [81 - Export and import forms](../lessons/081-export-and-import-forms.md) | [Lesson](../lessons/082-dynamic-imports-and-import-attributes.md) · [Example](../examples/082-dynamic-imports-and-import-attributes.md) | [83 - Module loading, resolution, and import maps](../lessons/083-module-loading-resolution-and-import-maps.md) |
