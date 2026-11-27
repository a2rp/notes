# 136 - Modular architecture and dependency boundaries

A JavaScript module is a file with its own scope and an explicit interface for importing and exporting values. Modules help a project divide responsibilities, make dependencies visible, and keep implementation details behind stable boundaries.

A good module structure is not measured by the number of files. It is measured by whether related behavior is easy to find, dependencies point in understandable directions, and changes stay local. Start with clear responsibilities and split code when a boundary provides a real benefit.

## Learning goals

- Use ECMAScript module imports and exports.
- Distinguish module scope from global scope.
- Organize files by responsibility and define stable module APIs.
- Design dependency boundaries between domain, application, and adapter code.
- Inject dependencies at a composition root.
- Avoid circular dependencies, import-time side effects, and unnecessary re-export layers.
- Choose static or dynamic imports based on when code is needed.

## What a module provides

Each JavaScript module has its own scope. Top-level declarations are not added to the global object. Other files can use a declaration only when the module exports it and the importing module imports it.

~~~js
// math.js
export function add(left, right) {
  return left + right;
}
~~~

~~~js
// app.js
import { add } from "./math.js";

console.log(add(2, 3)); // 5
~~~

The import path is called a module specifier. A relative specifier such as **./math.js** refers to a nearby file. A bare specifier such as **some-package** is resolved by the host environment, often through a package manager and package metadata. A module file should not assume every host resolves specifiers in exactly the same way.

## Named and default exports

Named exports identify each exported binding explicitly. A module can have multiple named exports.

~~~js
export const minimumAge = 18;

export function canRegister(age) {
  return age >= minimumAge;
}
~~~

~~~js
import { canRegister, minimumAge } from "./registration-rules.js";
~~~

The importing names must match the exported names unless they are aliased.

~~~js
import { canRegister as isEligible } from "./registration-rules.js";
~~~

A default export provides one primary value from a module.

~~~js
export default class ShoppingCart {
  // Cart behavior
}
~~~

~~~js
import Cart from "./shopping-cart.js";
~~~

The local name for a default import is chosen by the importer. Named exports make available capabilities easier to discover and refactor. A default export can be appropriate when a file has one clear primary value. Use a consistent convention within a project so readers do not have to guess.

A module may re-export another module's binding. This can provide a deliberate public entry point, but chains of re-exports can hide where behavior is implemented.

## Live bindings and module scope

An imported binding is a read-only live connection to an exported binding. The exporting module can update its binding and importers observe the updated value, but an importer cannot assign to the imported binding.

~~~js
// counter.js
export let count = 0;

export function increment() {
  count += 1;
}
~~~

~~~js
// view.js
import { count, increment } from "./counter.js";

increment();
console.log(count); // 1
~~~

This does not mean imported objects are deeply immutable. If a module exports a mutable object, other code may still change that object's properties unless the API prevents it. Prefer exporting operations that protect important state.

Static imports are written at the module's top level. Their declarations are available throughout that module and allow the host to discover dependencies before running the module body. A static import is not a function call that can be placed inside a conditional.

Static import also evaluates imported modules. Avoid performing application work such as starting a server, opening a connection, or writing a file merely because a module was imported. Modules should usually declare capabilities; the application entry point should decide when to start them.

## Static and dynamic imports

A static import expresses a dependency needed as part of the module's normal setup.

~~~js
import { formatDate } from "./date-format.js";
~~~

Use dynamic **import()** when a dependency is needed only after a condition, interaction, or user action. It returns a promise and can load a feature on demand.

~~~js
async function openReport() {
  const { renderReport } = await import("./report-view.js");
  renderReport();
}
~~~

Dynamic import can help split optional browser features or defer expensive work. It does not automatically make a program faster. Use it when the loading boundary is meaningful and handle its asynchronous failure.

## Browser and Node.js module setup

Browsers load an entry file as a module when the HTML script is marked with **type="module"**. Browser module specifiers for local files normally use explicit relative paths and file extensions. Modules are strict by default and do not expose top-level declarations as global variables.

~~~html
<script type="module" src="./src/main.js"></script>
~~~

Node.js supports ECMAScript modules and the older CommonJS module system. A project can mark **.js** files as modules using the nearest **package.json** with **"type": "module"**, or use the **.mjs** extension. CommonJS projects traditionally use **require** and **module.exports**, and **.cjs** explicitly marks a CommonJS file.

~~~json
{
  "type": "module"
}
~~~

When writing Node.js ESM, use explicit relative file extensions such as **./task-service.js**. Do not assume browser URL resolution and Node package resolution are identical. Follow one module system consistently in each part of a project. Interoperability exists, but mixing systems without a clear boundary creates confusing import behavior.

## Design boundaries around responsibilities

A dependency boundary separates code that changes for different reasons. One practical shape has:

- **Domain:** core rules and data, with no dependency on a web framework, database, or user interface.
- **Application:** use cases that coordinate domain rules and call required capabilities.
- **Adapters:** implementations for storage, HTTP, a command line, a browser UI, or other external systems.
- **Composition root:** the entry point that constructs concrete objects and connects them.

This is a guide, not a mandatory folder tree. Small projects may combine layers in a few files. Separate a responsibility when doing so clarifies ownership or makes a dependency replaceable.

Dependency direction matters. Application rules should describe what capability they need, such as saving a record. A storage adapter can implement that capability. The application should not import a concrete database driver just to save data.

~~~text
entry point
  -> application use case
      -> domain rules
      -> storage capability
          <- storage adapter implements the capability
~~~

The arrow from the application to the capability is an ordinary dependency on a contract. The adapter is selected at the edge and supplied to the use case.

## Dependency injection and the composition root

Dependency injection means supplying a dependency to the code that needs it instead of having that code locate or construct a global concrete dependency.

~~~js
export class TaskService {
  constructor(repository) {
    if (!repository || typeof repository.save !== "function") {
      throw new TypeError("Repository must provide save");
    }

    this.repository = repository;
  }

  async create(task) {
    await this.repository.save(task);
    return task;
  }
}
~~~

The composition root creates the concrete repository and connects it to the service.

~~~js
import { TaskService } from "./application/task-service.js";
import { MemoryTaskRepository } from "./adapters/memory-task-repository.js";

const repository = new MemoryTaskRepository();
const taskService = new TaskService(repository);
~~~

This makes the dependency visible and lets a test supply a small fake repository. Do not add a dependency injection framework just to pass a few constructor arguments. A plain function call or object literal is often enough.

Avoid a service locator that lets any module request arbitrary dependencies from a global registry. It hides dependencies from the constructor and makes it harder to tell what the module needs.

## Public APIs and file organization

Design a module's exports as an API for its callers. Export the smallest useful set. Keep helpers private when callers have no reason to depend on them. A public API can evolve deliberately; internal helpers can change freely.

Organize files so a reader can find behavior by responsibility. For example, group domain rules with the domain, use cases with the application, and external implementations under adapters. Avoid a folder for every tiny function or a single file that owns unrelated rules and I/O.

A barrel file that re-exports many modules can provide a convenient entry point. It can also create broad dependencies, obscure ownership, or contribute to import cycles. Add one when it is a useful public boundary, and keep internal imports direct when that is clearer.

## Circular dependencies

A circular dependency exists when module A depends on module B and module B directly or indirectly depends on module A. ECMAScript modules can represent cycles, but code that reads an imported binding before it has been initialized can fail. Even when it works, the cycle makes ownership and evaluation order harder to understand.

Common ways to remove a cycle include:

- Move shared data types or constants to a lower-level module.
- Make one module call a function supplied by the other.
- Extract a third module that owns the shared responsibility.
- Invert the dependency so a higher-level entry point connects both modules.

Do not break a cycle by moving unrelated code into a miscellaneous utility file. Extract a module with a clear responsibility.

## Module evaluation, caching, and top-level await

A module can have side effects during evaluation. Importing the same resolved module more than once normally reuses its module instance within that host's module graph rather than recreating all of its state for every importer. This is another reason not to treat imports as harmless construction calls.

Top-level **await** allows an ESM module to wait during evaluation. It can be useful for a small startup dependency, but it also makes every importer wait for that module's asynchronous initialization. Prefer explicit asynchronous setup functions when they make startup order clearer.

Keep configuration and environment access near the application edge. Pass the resulting values into services instead of having core modules read process environment variables or browser globals directly.

## Testing module boundaries

Test domain rules directly when they are independent of I/O. Test application use cases with fake ports to verify decisions and requested actions. Test adapters separately against the behavior they promise. A small integration test can then confirm that real pieces are connected correctly.

Tests should check public behavior, not the exact import graph or private helper names. If a use case is difficult to test without a live database or browser, inspect whether an external dependency has crossed into the core.

## Common mistakes

- Creating files around syntax rather than responsibilities.
- Importing a concrete database or browser API directly into domain rules.
- Using one large module for unrelated business rules, display, and I/O.
- Hiding dependencies in global variables or a service locator.
- Doing important work at module import time.
- Mixing ESM and CommonJS without a clear interoperability boundary.
- Omitting explicit relative extensions where the host expects them.
- Adding a barrel file that makes internal dependency direction unclear.
- Ignoring cycles because the current initialization order happens to work.
- Using dynamic import everywhere without a real loading boundary.
- Adding a dependency injection container for a few simple dependencies.
- Treating every small function as a reason to create a new module.

## Key points

- A module has its own scope and an explicit import/export interface.
- Static imports make normal dependencies visible; dynamic imports defer optional loading.
- The host determines how module specifiers are resolved.
- Domain rules should not depend on concrete adapters such as storage or UI frameworks.
- A composition root connects application logic to concrete implementations.
- Dependency injection makes collaborators visible and replaceable.
- Keep module APIs small, imports purposeful, and cycles rare.
- Split files when a boundary improves ownership, change isolation, or testability.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [135 - Object-oriented programming, composition, and design patterns](135-object-oriented-programming-composition-and-design-patterns.md) | [Open Q&A](../qnas/136-modular-architecture-and-dependency-boundaries.md) | [Open example](../examples/136-modular-architecture-and-dependency-boundaries.md) | [137 - Error handling, reliability, and application security](137-error-handling-reliability-and-application-security.md) |
