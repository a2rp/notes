# 136 - Modular architecture and dependency boundaries: Q&A

Each answer follows its question. Explanations show why the answer fits and when the choice matters.

## Multiple-choice questions

### 1. What is a JavaScript module?

A. A function that runs globally  
B. A file with its own scope and an import/export interface  
C. A folder containing only classes  
D. A browser-only feature

**Answer:** B. A file with its own scope and an import/export interface.

**Explanation:** Modules keep top-level declarations in module scope and expose selected bindings through exports.

### 2. What does a named export provide?

A. An explicitly named binding that another module can import  
B. A global variable  
C. A package installation  
D. A class instance

**Answer:** A. An explicitly named binding that another module can import.

**Explanation:** Named imports must match an exported name unless the importer aliases it.

### 3. When can a default export be useful?

A. When a module has one clear primary value  
B. When a module needs no imports  
C. To make a value global  
D. To prevent other modules from loading

**Answer:** A. When a module has one clear primary value.

**Explanation:** The importing module chooses the local name for a default import. A consistent project convention keeps imports predictable.

### 4. What is a live import binding?

A. A copy made once when the file loads  
B. A read-only connection that reflects changes made by its exporting module  
C. A mutable local variable that the importer owns  
D. A value that only works in a browser

**Answer:** B. A read-only connection that reflects changes made by its exporting module.

**Explanation:** The importer cannot assign to the imported binding, but it can observe updates made by the exporter.

### 5. Which statement about static imports is true?

A. They can be placed inside any conditional  
B. They declare dependencies at module top level  
C. They return a promise  
D. They only work in Node.js

**Answer:** B. They declare dependencies at module top level.

**Explanation:** Static imports let a host discover and link the dependency graph before evaluating module bodies.

### 6. What does dynamic import return?

A. A class  
B. A promise for a module namespace object  
C. A synchronous function  
D. A global variable

**Answer:** B. A promise for a module namespace object.

**Explanation:** Dynamic import is asynchronous and is useful when code should load only after a condition or interaction.

### 7. In Node.js, what can mark nearby .js files as ECMAScript modules?

A. A package.json with top-level type set to module  
B. A README heading  
C. A directory named modules  
D. A CSS file

**Answer:** A. A package.json with top-level type set to module.

**Explanation:** The nearest package metadata can determine how .js files are interpreted. The .mjs extension is another explicit ESM option.

### 8. Where should domain rules depend on a concrete database driver?

A. Directly inside every domain object  
B. Nowhere; domain rules should depend on a capability or contract  
C. Only in a static method  
D. In the global object

**Answer:** B. Nowhere; domain rules should depend on a capability or contract.

**Explanation:** The database adapter can implement the needed storage behavior and be connected at the application edge.

### 9. What is the composition root?

A. The directory containing all imports  
B. The entry point that creates concrete dependencies and connects components  
C. A database schema  
D. A special JavaScript keyword

**Answer:** B. The entry point that creates concrete dependencies and connects components.

**Explanation:** Wiring is kept at the edge so application code can receive abstractions without constructing infrastructure.

### 10. What is a circular dependency?

A. A module imports a value twice  
B. Two modules depend on each other directly or through other modules  
C. A module has many exports  
D. A function calls itself

**Answer:** B. Two modules depend on each other directly or through other modules.

**Explanation:** Cycles complicate initialization and ownership, and can expose an imported binding before it has been initialized.

## Short-answer questions

### 11. What is a module specifier?

**Answer:** The string used in an import to identify a module.

**Explanation:** Relative specifiers identify nearby files, while bare specifiers are typically resolved through host or package rules.

### 12. Why include a file extension in Node.js ESM relative imports?

**Answer:** Node.js ESM expects explicit relative paths for normal file imports.

**Explanation:** Do not assume Node uses the same resolution rules as a browser or a bundler.

### 13. How does an HTML page mark its entry script as a module?

**Answer:** Add **type="module"** to the script element.

**Explanation:** The browser then treats the entry file as an ECMAScript module and resolves its imports as modules.

### 14. What is the difference between named and default exports?

**Answer:** Named exports expose specific named bindings; a default export identifies one primary value from a module.

**Explanation:** Named imports use matching names or aliases. A default import can choose its local name.

### 15. Do top-level module declarations become properties of the global object?

**Answer:** No.

**Explanation:** Modules have their own scope, which helps prevent accidental global name collisions.

### 16. What is a side-effect import?

**Answer:** An import used to evaluate a module without importing one of its bindings.

**Explanation:** It is appropriate when registration or setup is deliberately the module's purpose, but import-time actions should be limited and explicit.

### 17. Why avoid starting a server merely because a module is imported?

**Answer:** Importing the module then unexpectedly performs application startup.

**Explanation:** Keep module declarations separate from application actions. The entry point should explicitly decide when to start the server.

### 18. What is dependency injection?

**Answer:** Supplying a dependency to the code that needs it rather than having that code find a global concrete implementation.

**Explanation:** The dependency becomes visible and can be replaced with a fake in a test.

### 19. What is a port in a layered architecture?

**Answer:** A capability or contract that application code needs, such as saving or loading records.

**Explanation:** An adapter implements the port for a specific database, API, or other external system.

### 20. What is an adapter?

**Answer:** Code that translates one interface into another.

**Explanation:** It keeps vendor or infrastructure details from leaking across the application boundary.

### 21. Why is a service locator often less clear than constructor injection?

**Answer:** It hides which dependencies a module uses.

**Explanation:** A reader has to inspect arbitrary lookups instead of seeing the module's needs at its creation point.

### 22. How can a circular dependency be reduced?

**Answer:** Extract the shared responsibility, invert one dependency, or supply a needed operation from a higher-level entry point.

**Explanation:** The goal is a clearer dependency direction, not merely moving unrelated code into a utility file.

### 23. What is a barrel file?

**Answer:** A module that re-exports values from other modules as a convenient entry point.

**Explanation:** It can define a public API, but excessive re-exports can hide ownership and create cycles.

### 24. When is dynamic import useful?

**Answer:** When a feature is optional or needed only after a condition or user action.

**Explanation:** It defers loading, but adds asynchronous behavior and is not automatically a performance improvement.

### 25. Why should module-level mutable state be used carefully?

**Answer:** Importers may share the same evaluated module instance and observe or change the shared state.

**Explanation:** Shared state creates hidden coupling. Prefer explicit state ownership and passed dependencies.

## Code and reasoning questions

### 26. What does this program print?

~~~js
// counter.js
export let count = 0;
export function increment() {
  count += 1;
}

// main.js
import { count, increment } from "./counter.js";
increment();
console.log(count);
~~~

**Answer:**

~~~text
1
~~~

**Explanation:** The imported binding is live, so it reflects the exporter changing **count**. The importer cannot assign to **count** itself.

### 27. Can an importing module assign to an imported binding?

**Answer:** No.

**Explanation:** Imported bindings are read-only in the importing module. The exporting module owns updates to its binding.

### 28. What does this expression produce?

~~~js
const moduleNamespace = await import("./optional-feature.js");
~~~

**Answer:** A module namespace object, after the import promise resolves.

**Explanation:** The object exposes the module's exported bindings. The operation may fetch, link, and evaluate additional modules asynchronously.

### 29. Why can a cycle cause an initialization error?

**Answer:** A module may read an imported binding while the exporting module has not initialized it yet.

**Explanation:** Cycles are not always errors, but they make evaluation order and ownership harder to reason about.

### 30. Which direction is clearer for application code that saves a record?

A. Application imports a specific database client and constructs it  
B. Application calls a repository capability supplied by the entry point

**Answer:** B. Application calls a repository capability supplied by the entry point.

**Explanation:** The entry point selects an adapter. Application rules stay independent of the database implementation.

### 31. Why is **import "./register-plugin.js"** different from importing a named function?

**Answer:** The side-effect import asks the host to evaluate the module without binding an exported name.

**Explanation:** Any registration effect should be intentional and documented because import evaluation changes application state.

### 32. What should the browser entry file contain?

**Answer:** A module entry point that imports the application components and starts the browser application.

**Explanation:** The HTML page can load it with a script element whose type is module. Application wiring remains explicit.

### 33. What does a nearest package.json with **"type": "module"** affect?

**Answer:** How Node.js interprets nearby **.js** files.

**Explanation:** Package scope matters. A **.mjs** file explicitly marks ESM, while **.cjs** explicitly marks CommonJS.

### 34. Why might a large barrel file make dependencies harder to understand?

**Answer:** It can obscure which module owns a value and encourage broad or cyclic imports.

**Explanation:** Re-export only a deliberate public API. Internal code can import directly from the owning module.

### 35. What trade-off does top-level await introduce?

**Answer:** It can simplify a small asynchronous module setup, but all importers wait for its evaluation.

**Explanation:** An explicit async setup function can make startup order and failure handling more visible.

## Practical design questions

### 36. How would you test a use case that saves a record without connecting to a real database?

**Answer:** Supply a fake repository that records the save call and returns controlled data.

**Explanation:** This verifies application decisions independently of the database adapter.

### 37. Where should a database-specific repository be constructed?

**Answer:** At the composition root or another application edge.

**Explanation:** The concrete adapter is wired to the application capability without making domain rules import the database library.

### 38. A project has a new file for every one-line helper. What should guide whether to keep splitting?

**Answer:** Whether the module boundary improves ownership, reuse, isolation, or testability.

**Explanation:** File count alone is not architecture. Too many tiny modules can make the dependency graph harder to follow.

### 39. A feature is rarely used and is large. How could the browser app defer its loading?

**Answer:** Use dynamic import when the user requests the feature, then handle the returned promise.

**Explanation:** This makes the loading boundary explicit and lets the app handle loading or import errors.

### 40. How can you tell whether a dependency boundary is useful?

**Answer:** It should make responsibility and dependency direction clearer or allow a meaningful implementation to be replaced.

**Explanation:** If a boundary adds indirection without improving ownership or change isolation, a simpler direct call may be better.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [135 - Object-oriented programming, composition, and design patterns](../lessons/135-object-oriented-programming-composition-and-design-patterns.md) | [Lesson 136](../lessons/136-modular-architecture-and-dependency-boundaries.md) | [Open example](../examples/136-modular-architecture-and-dependency-boundaries.md) | [137 - Error handling, reliability, and application security](../lessons/137-error-handling-reliability-and-application-security.md) |
