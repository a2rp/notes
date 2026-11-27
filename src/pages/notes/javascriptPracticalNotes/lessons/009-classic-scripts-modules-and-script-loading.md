# 09 - Classic scripts, modules, and script loading

A browser can load JavaScript in more than one way. The script element decides whether a file is treated as a classic script or a JavaScript module. The loading attributes also affect when external code is fetched and executed.

This lesson compares the two script types and explains when to use **defer**, **async**, and **type="module"**.

## Add JavaScript to an HTML page

A script can be written directly in an HTML file:

~~~html
<script>
  console.log("Inline JavaScript");
</script>
~~~

Or the page can load JavaScript from a separate file:

~~~html
<script src="./app.js"></script>
~~~

Keeping larger scripts in separate files makes the project easier to organize and maintain. The **src** attribute gives the browser the file URL to load.

A script element without **type="module"** is a classic script unless its type is otherwise specified. A script element with **type="module"** loads code using the JavaScript module system.

## Classic scripts

A classic script is the traditional script type:

~~~html
<script src="./app.js"></script>
~~~

Classic scripts are useful for simple pages and for older code that relies on shared global scripts. Multiple classic scripts can interact through the page's global environment, so names can accidentally collide.

A top-level **var** declaration in a classic browser script creates a property on the global object:

~~~js
var pageMessage = "Loaded by a classic script";

console.log(window.pageMessage);
~~~

Top-level **let** and **const** declarations in classic scripts do not create properties on **window**, although later classic scripts can refer to bindings in the shared global environment. This is one reason that adding many unrelated classic scripts can make an application difficult to organize.

Classic scripts do not use static **import** and **export** declarations. They can use dynamic **import()** where supported, but static module syntax requires a module script.

Classic scripts are not automatically strict mode. Strict mode can be requested explicitly in some classic scripts with a **"use strict"** directive.

## JavaScript modules

A module is a JavaScript file that can export values and import values from other modules. A browser loads a module through a script element with **type="module"**:

~~~html
<script type="module" src="./main.js"></script>
~~~

A module can import named exports from another module:

~~~js
import { add } from "./math.js";

const total = add(4, 6);
console.log(total);
~~~

The **math.js** file can provide that export:

~~~js
export function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
~~~

The import path **"./math.js"** is a relative module specifier. In browser code, it is resolved as a URL relative to the importing module. Include the file extension in browser module paths so the requested URL is clear.

Modules provide their own scope. A top-level variable in one module is not automatically a global variable available to every other module. Share values through **export** and **import**.

Other important module behavior:

- Modules are automatically in strict mode.
- Static **import** and **export** declarations are used at the top level of a module.
- Modules can import other modules, forming a module graph.
- A module's top-level **this** is **undefined**.
- A module can use top-level **await** where supported.
- A module and its dependencies are loaded and linked before evaluation.
- A module is evaluated once per module record in a given environment, even if it is imported from more than one place.

Modules help organize code and make dependencies explicit. They do not remove the need to think about loading, compatibility, or errors.

## Classic script and module comparison

| Behavior | Classic script | Module script |
| --- | --- | --- |
| HTML form | **<script src="..."></script>** | **<script type="module" src="..."></script>** |
| Static import and export | Not available | Available |
| Top-level scope | Shares the page's classic-script global environment | Each module has its own module scope |
| Strict mode | Not automatic | Automatic |
| Default loading | A parser-inserted external script can block HTML parsing | Dependencies are fetched in parallel and execution is deferred by default |
| Top-level await | Not available | Available where supported |
| Common use | Small or legacy scripts and independent classic files | Organized applications with explicit imports and exports |

The table is a guide to the common browser behavior. Dynamic loading and script attributes can change when execution happens.

## Script placement and parser behavior

The browser parses HTML from top to bottom. A classic script without loading attributes can interrupt parsing while it fetches and executes. Code that runs before an element exists cannot find that element yet.

~~~html
<head>
  <script src="./app.js"></script>
</head>
~~~

If **app.js** immediately queries an element later in the body, the element may not have been parsed when the script runs.

You can place a classic script near the end of the body so the preceding HTML has been parsed:

~~~html
<body>
  <main id="app"></main>
  <script src="./app.js"></script>
</body>
~~~

For an external classic script in the head, **defer** is a common option:

~~~html
<head>
  <script defer src="./app.js"></script>
</head>
~~~

The browser fetches the script while it parses the document, then executes it after parsing has finished. Deferred classic scripts execute in document order, before the **DOMContentLoaded** event. The **defer** attribute is for external classic scripts. It has no effect on an inline classic script.

## The async attribute

The **async** attribute tells the browser to fetch an external script without waiting for HTML parsing. The script executes as soon as it is available, so it can run before parsing is complete. When several scripts use **async**, their execution order is not guaranteed.

~~~html
<script async src="./analytics.js"></script>
~~~

Use **async** for scripts that are independent of the page's other scripts and do not need a particular execution order. It is usually a poor choice when one script depends on another script that must run first.

Both **async** and **defer** allow fetching to happen while HTML is being parsed. The difference is the execution timing and ordering:

- **defer** waits until parsing is complete and preserves the order of deferred classic scripts.
- **async** executes as soon as the script is available and does not preserve a relative order between async scripts.

## Module loading behavior

A module script is deferred by default. The browser fetches the module and its dependencies while parsing the document, then evaluates the module after the document has been parsed.

~~~html
<script type="module" src="./main.js"></script>
~~~

You do not need to add **defer** to a module script. The **defer** attribute does not change module-script behavior.

An external module script can use **async**. In that case, the module and its dependencies are fetched and the module graph is evaluated as soon as it is ready, without a guarantee of order relative to other scripts.

~~~html
<script type="module" async src="./independent-module.js"></script>
~~~

Use this only when the module can run independently of other page scripts. A normal module script without **async** is a good default when its imports and page setup should follow document parsing.

## Loading order examples

Suppose a page has two external classic scripts:

~~~html
<script defer src="./library.js"></script>
<script defer src="./app.js"></script>
~~~

Both scripts are fetched while HTML parsing continues. After parsing, **library.js** executes before **app.js** because the deferred classic scripts preserve document order.

Now compare two async scripts:

~~~html
<script async src="./metrics.js"></script>
<script async src="./widget.js"></script>
~~~

The one that becomes available first can execute first. Do not rely on the order shown in the HTML when scripts use **async**.

A module's static imports describe dependencies directly:

~~~js
import { formatName } from "./format.js";
import { saveProfile } from "./storage.js";

console.log(formatName("Asha"));
saveProfile({ name: "Asha" });
~~~

The imported dependencies are resolved and linked before the importing module runs. If a requested path is wrong or an export name does not exist, the module graph can fail to load or link.

## Use a local web server for modules

Browser modules use URL-based loading and cross-origin rules. Opening an HTML file directly from a **file://** path can cause module imports to fail in some browser setups.

For module practice, serve the project with a local development server and open its local **http://** address. Use the same server for all related HTML and JavaScript files so their relative URLs resolve as expected.

A missing module, incorrect path, or server response with an unsuitable JavaScript MIME type can prevent a module from running. Check the browser Console and Network panel when loading fails.

## Dynamic import

The **import()** expression loads a module dynamically and returns a Promise. It can be used when a feature is needed later or when a module should be loaded conditionally.

~~~js
import("./reporting.js")
  .then((reportingModule) => {
    reportingModule.showReport();
  })
  .catch((error) => {
    console.error("The reporting module could not be loaded:", error);
  });
~~~

Unlike a static **import** declaration, **import()** is an expression and can be used inside functions and conditional code. The module still needs to be served from a valid URL and successfully fetched and evaluated.

## Common module loading errors

- **Wrong relative path:** Check the importing file's location and the **./** or **../** path.
- **Missing file extension:** In browser examples, include the extension in relative module specifiers.
- **Opening the page directly from disk:** Use a local development server if module requests are blocked.
- **Wrong export name:** Check that the imported name exactly matches the exported name, including capitalization.
- **Using static import in a classic script:** Add **type="module"** to the script element or use a module file as the entry point.
- **Top-level await in a classic script:** Move the code into a module or into an async function.
- **Unexpected execution order:** Check whether the script uses **async**, **defer**, or module defaults.
- **A classic script cannot find an element:** Ensure the element is parsed before the script runs, or defer the script.

## Choosing a script type

Use classic scripts when maintaining existing code or when a simple page needs a small independent script without static imports.

Use modules when your code benefits from explicit imports, separate scopes, and clear file boundaries. Modules are a good default for new multi-file browser applications.

Choose loading behavior based on dependencies:

- Use a normal module script for an application entry point with imports.
- Use **defer** for external classic scripts that need parsed HTML and ordered execution.
- Use **async** for independent scripts whose execution order does not matter.
- Avoid loading the same application logic in both classic and module forms unless you deliberately need a compatibility fallback.

## Try it yourself

1. Create **main.js** and **math.js**. Export an **add** function from **math.js** and import it in **main.js**.
2. Load **main.js** using **type="module"** and confirm its message appears.
3. Remove **type="module"** and observe the error caused by the static import syntax.
4. Move a classic script into the document head without **defer**. Check whether it can find a body element.
5. Add **defer** to that external classic script and compare.
6. Add **async** to two independent scripts with visible messages. Reload several times and observe that their execution order is not guaranteed.
7. Open the page through a local development server and check that the module path resolves.
8. Change an imported name or path and read the Console error.

## Key points

- The script element determines whether code is loaded as a classic script or a module.
- Classic scripts share the page's global environment and do not support static imports and exports.
- Modules have their own scope, use strict mode automatically, and support static imports and exports.
- External classic scripts without attributes can block HTML parsing.
- **defer** waits for parsing to finish and preserves document order for external classic scripts.
- **async** runs as soon as the script or module graph is ready, without a guaranteed order.
- Module scripts are deferred by default, and **defer** has no effect on them.
- Browser modules use URL-based loading, so a local development server is useful for practice.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [08 - Identifiers, keywords, reserved words, and naming](008-identifiers-keywords-reserved-words-and-naming.md) | [Open Q&A](../qnas/009-classic-scripts-modules-and-script-loading.md) | [Open example](../examples/009-classic-scripts-modules-and-script-loading.md) | [10 - Variables: const, let, and var](010-variables-const-let-and-var.md) |
