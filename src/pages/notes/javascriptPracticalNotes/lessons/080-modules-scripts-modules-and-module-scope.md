# 80 - Modules: scripts, modules, and module scope

JavaScript source can be evaluated as a classic script or as a module. The host environment decides which parsing and loading rules apply. A browser identifies a module with **type="module"** in a script element. Node.js uses file extensions and package configuration to identify module format.

Modules give code its own scope and a standard way to share values through imports and exports. They also run in strict mode automatically. Understanding the difference between scripts and modules helps explain global variables, top-level this, loading order, and why import statements fail in a classic script.

## Learning goals

- Distinguish classic scripts from JavaScript modules.
- Understand how a browser marks a script as a module.
- Compare script scope and module scope.
- Explain module strict mode and top-level this.
- Understand module loading, linking, and evaluation at a high level.
- Know when static import, dynamic import(), and top-level await are available.
- Recognize browser loading requirements and common module errors.
- Know that the host controls module resolution details.

## Two ways to evaluate JavaScript

JavaScript code is parsed using a **script** or **module** goal. These goals have different syntax and runtime behavior.

| Behavior | Classic script | Module |
| --- | --- | --- |
| Browser declaration | script element without type="module" | script element with type="module" |
| Static import and export | Not allowed | Allowed at the module's top level |
| Strict mode | Only when enabled, for example with a directive | Always enabled |
| Top-level declarations | Share the browser's global script environment | Belong to that module's scope |
| Top-level this in a browser | The global this value | undefined |
| HTML execution timing | Depends on async, defer, and placement | Deferred by default unless async is used |
| Dependencies | Typically loaded separately by script tags | Loaded through the module graph |

These differences are about how the host parses and runs the file. A file extension alone does not make a browser script a module. The HTML script element must identify it as one.

## Classic scripts in a browser

A classic script can be inline or external:

~~~html
<script src="./legacy.js"></script>
<script>
  console.log('inline classic script');
</script>
~~~

Classic scripts in the same page and realm use the browser's global environment. A top-level **var** declaration in a classic script usually creates a property on the global object. Top-level **let**, **const**, and **class** declarations create global lexical bindings, but do not create properties on **globalThis**.

~~~js
var legacyName = 'classic var';
const pageSetting = 'classic lexical binding';

console.log(globalThis.legacyName);
console.log(Object.hasOwn(globalThis, 'pageSetting'));
~~~

~~~text
classic var
false
~~~

Top-level lexical declarations in classic scripts can be shared with later classic scripts through the global lexical environment, even though they are not properties of globalThis. Reusing the same top-level lexical name in another script can cause a redeclaration SyntaxError.

Classic scripts are not automatically strict. A script can opt in with **'use strict'** at the beginning of its code. In a browser classic script, top-level this refers to the global this value.

Global sharing can cause name collisions and make dependencies implicit. Modules reduce that coupling by keeping their top-level declarations in a module-specific environment.

## Declaring a module in HTML

Use **type="module"** on the entry script:

~~~html
<script type="module" src="./main.js"></script>
~~~

The browser parses **main.js** as a module. Imports from that file are also treated as modules, so dependency files do not need their own script elements.

A module script without **async** is deferred automatically. The browser fetches and processes the module graph while parsing the page, then evaluates the entry module after parsing is complete. You do not need to add **defer** to a module script. Adding **async** changes the timing and removes ordering guarantees relative to other scripts.

~~~html
<script type="module" src="./main.js"></script>
<script async type="module" src="./analytics.js"></script>
~~~

The first module waits until document parsing is complete. The async module may run as soon as its graph is ready, even if parsing or other modules are still in progress. Use async only when that independent timing is intended.

Inline module code is allowed:

~~~html
<script type="module">
  import { greet } from './greeting.js';

  console.log(greet('Asha'));
</script>
~~~

Inline modules do not have a file URL of their own for other modules to import. Put reusable exports in external module files.

## Module scope

Each module has its own top-level scope. A top-level variable or function is not automatically a globalThis property and is not directly available to another module. Share a binding with an export and import it where needed.

~~~js
const moduleOnly = 'private to this module';

console.log(Object.hasOwn(globalThis, 'moduleOnly'));
~~~

~~~text
false
~~~

A module can still use the host's global APIs, such as console, document in a browser, or globalThis. Module scope prevents accidental global declarations; it does not remove access to globals.

Module scope also means a variable declared in one module does not collide with a same-named variable in another module. The module's imports and exports make its dependencies explicit.

## Modules are strict mode

Module code is always strict, whether it is loaded by a browser or another module-capable host. No **'use strict'** directive is needed.

Strict mode changes behavior that would otherwise fail silently or use implicit globals. For example, assigning to an undeclared variable throws a ReferenceError in a module.

~~~js
'use strict';

const count = 1;
// undeclaredTotal = count;
~~~

The commented assignment would throw if uncommented. An explicit declaration is required.

Modules also disallow some legacy syntax, including duplicate parameter names in functions that would be accepted in non-strict code. Classes are strict mode too, independently of whether their file is a module.

## Top-level this

At the top level of a module, **this** is undefined.

~~~js
console.log(this === undefined);
~~~

~~~text
true
~~~

This differs from a browser classic script, whose top-level this is the global this value. Inside a function, this still depends on how that function is called, unless the function is an arrow function. Module scope does not make every function's this automatically undefined.

Use **globalThis** when code deliberately needs the global object. Do not rely on top-level this to access it.

## Loading, linking, and evaluation

A module system has three useful high-level phases:

1. **Loading:** The host locates, fetches, or reads a module and its dependencies.
2. **Linking:** The host connects each import to the corresponding export and prepares module environments.
3. **Evaluation:** The module bodies run after the dependency graph is ready.

The exact resolution and loading rules depend on the host. Browsers resolve relative module specifiers as URLs. Node.js resolves package names and files according to its module rules. The ECMAScript language defines module syntax and semantics but leaves host-specific resolution to the environment.

Static imports are known before evaluation, which lets the host build the dependency graph before running module bodies. A module's imported dependencies are evaluated before the importing module's body. Repeated imports of the same resolved module in a module graph generally share that module instance rather than rerunning its top-level code each time.

A browser module graph can contain cycles. Modules are linked as a graph, but reading an imported binding before its exporting module has initialized that binding can produce a ReferenceError. Keep module initialization simple and avoid circular dependencies when they make initialization order difficult to follow.

## Static imports and exports at a glance

Static **import** and **export** declarations belong at the top level of modules. Their syntax is intentionally analyzable before the code runs.

~~~js
import { greet } from './greeting.js';

console.log(greet('Asha'));
~~~

A static import cannot be placed inside an if statement or function. To load a module conditionally or from a computed path, use dynamic import().

~~~js
if (shouldLoadReports) {
  const reports = await import('./reports.js');
  reports.show();
}
~~~

Dynamic import() is an expression that returns a Promise. It can be used in modules and in classic scripts, subject to host support and execution-context restrictions. Static import declarations cannot be used in classic scripts.

Exports and import forms are covered in the next chapter. For now, remember that a module shares bindings deliberately instead of exposing every top-level declaration globally.

## Top-level await

A module can use **await** at its top level. The module's evaluation waits for the awaited operation, and importing modules that depend on it wait for that evaluation to complete.

~~~js
const response = await fetch('./settings.json');
const settings = await response.json();

console.log(settings);
~~~

Top-level await is not allowed in a classic script. A classic script can use an async function or dynamic import() where appropriate.

Use top-level await deliberately. It can make module initialization asynchronous, which affects modules that depend on it.

## Browser loading requirements

A browser loads module files using fetch behavior. Important consequences include:

- Serve module files from a local web server during development instead of opening an imported module page with file://.
- Serve JavaScript modules with an appropriate JavaScript MIME type.
- Cross-origin module requests use CORS rules. The server must allow the requesting origin.
- A missing module path may return an HTML error page, which then produces a MIME or parse error.
- Relative module paths are resolved from the importing module's URL.

A browser import should use an explicit relative path such as **'./greeting.js'**. Browsers do not search for an omitted extension or infer an index.js file the way some server-side tools do.

A successful response for the entry file is not enough. Every file in its module graph must resolve and load correctly. Use the browser's Network and Console panels to inspect the failing URL, status, response type, and error.

## Choosing scripts or modules

Use a classic script when maintaining a small legacy snippet or integrating with an API that specifically expects one. Use modules for most new multi-file JavaScript applications because they provide private scope and explicit dependency boundaries.

Modules do not automatically require a bundler. Browsers can load native JavaScript modules directly. A build tool may still help with older runtime targets, bundling, code splitting, minification, or non-JavaScript resources.

A module is not automatically isolated from all shared state. It can read and write globals, mutate exported objects, access the DOM, and perform side effects. Keep dependencies explicit and avoid using globalThis as a substitute for module exports.

## Node.js module identification

Node.js supports ECMAScript modules as well as CommonJS. The host needs to know which format a file uses.

Common ways to identify an ECMAScript module include:

- Use the **.mjs** file extension.
- Use **.js** within a package scope whose package.json declares **"type": "module"**.

A **.cjs** file or a package configured as **"type": "commonjs"** indicates CommonJS. Exact package detection behavior and supported syntax depend on the Node.js version and configuration. The later Node.js module chapter covers interoperation and resolution details.

Do not assume a browser's module resolution rules and Node.js package resolution rules are identical.

## Common mistakes

- Writing a static import in a classic script.
- Assuming a .js extension alone makes a browser file a module.
- Expecting top-level module variables to appear on globalThis.
- Expecting top-level this to be the browser global object inside a module.
- Forgetting that modules are strict mode automatically.
- Adding defer to a module script and expecting it to change its default timing.
- Assuming async module scripts preserve order.
- Omitting ./ from a browser-relative import path.
- Expecting browsers to infer extensions or package index files.
- Opening a module page with file:// and expecting dependency fetching to work.
- Ignoring CORS or MIME errors for a dependency.
- Assuming every host uses the same module resolution algorithm.
- Creating module cycles that read bindings before initialization.
- Using top-level await without considering asynchronous dependency evaluation.
- Adding globals when an explicit export would make the dependency clearer.

## Practice

1. Load one classic script and one module script in a browser page. Compare top-level this.
2. Declare var, let, and const at the top level of a classic script and inspect globalThis properties.
3. Declare a top-level const in a module and check whether it becomes a property of globalThis.
4. Try a static import in a classic script and explain the syntax error.
5. Move the import to a module and compare the result.
6. Remove defer from a module script and explain why it still waits for parsing by default.
7. Add async to one module script and observe that execution order is no longer guaranteed.
8. Replace a static import with dynamic import() inside a conditional.
9. Use top-level await in a module and describe how a dependent module waits.
10. Create two modules with colliding local names and explain why their bindings do not collide.
11. Inspect a failed module request and distinguish a missing path from a MIME or CORS problem.
12. Identify which format Node.js uses for .mjs, .cjs, and a .js file inside a package with an explicit type.

## Key points

- The host evaluates JavaScript as a classic script or as a module.
- Browser modules are identified with type="module"; Node.js uses its own format indicators.
- Modules have private top-level scope, automatic strict mode, and undefined top-level this.
- Static imports and exports are module-only declarations and are linked before evaluation.
- Dynamic import() is an expression that returns a Promise and can be used outside modules where supported.
- Browser module scripts are deferred by default, but async changes ordering.
- Host environments control how module specifiers resolve and how files are loaded.
- Use explicit exports instead of relying on accidental global sharing.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [79 - Memory, garbage collection, and weak references](079-memory-garbage-collection-and-weak-references.md) | [Open Q&A](../qnas/080-modules-scripts-modules-and-module-scope.md) | [Open example](../examples/080-modules-scripts-modules-and-module-scope.md) | [81 - Export and import forms](081-export-and-import-forms.md) |
