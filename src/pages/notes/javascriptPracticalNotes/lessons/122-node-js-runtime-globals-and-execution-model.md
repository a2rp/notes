# 122 - Node.js runtime, globals, and execution model

JavaScript is a language. A runtime supplies the environment in which JavaScript executes. In a browser, that environment includes a document and browser APIs. In Node.js, it includes Node APIs for files, processes, networking, timers, and modules.

Understanding the runtime helps explain why browser code cannot automatically run in Node.js, why Node.js modules have their own scope, and why asynchronous I/O does not make every JavaScript calculation run in parallel.

## Learning goals

After this lesson, you should be able to:

- distinguish JavaScript the language from the Node.js runtime;
- describe the roles of V8, Node.js APIs, the event loop, and operating-system I/O;
- identify common Node.js globals and distinguish them from module-local names;
- explain the difference between CommonJS and ECMAScript modules;
- choose explicit module markers for a project;
- describe how asynchronous I/O and synchronous CPU work affect the process;
- identify browser-only APIs that are not available in a normal Node.js process;
- inspect the Node.js version and runtime environment.

## JavaScript is not the runtime

ECMAScript defines the core language: values, functions, objects, classes, promises, and many other features. It does not define a file system API or a browser document.

Node.js is a JavaScript runtime environment. It uses the V8 engine to execute JavaScript and adds APIs for work such as file access, networking, processes, and modules. Its event loop coordinates asynchronous callbacks. The operating system can handle many I/O operations, and some Node operations use a worker pool. These pieces work together, but they are not interchangeable:

- **ECMAScript** defines the language.
- **V8** parses and executes JavaScript and performs engine work such as optimization and garbage collection.
- **Node.js APIs** expose capabilities such as <code>node:fs</code>, <code>node:http</code>, <code>process</code>, and <code>Buffer</code>.
- **The event loop** runs JavaScript callbacks and coordinates completion of asynchronous operations.
- **The operating system and worker pool** can perform particular I/O or native operations outside the JavaScript call currently running.

A typical Node.js process runs JavaScript on one main thread by default. That does not mean the process has only one thread or that every operation runs on that thread. Worker threads can run JavaScript in separate threads, and runtime or operating-system components handle other work.

## Node.js is not a browser

A normal Node.js process does not have a browser page, so these are not normally available:

~~~js
window
document
HTMLElement
localStorage
~~~

Trying to access <code>document</code> in a plain Node.js process throws a <code>ReferenceError</code> unless some library or test environment defines it.

Some APIs have similar names in browsers and Node.js, and Node.js implements a number of web-standard APIs. Similar names do not mean the entire browser exists. For example, Node.js can provide <code>fetch</code> in supported releases, but it still does not provide a page DOM.

Use feature detection when code is intentionally shared between runtimes:

~~~js
const hasDocument =
  typeof document !== "undefined" &&
  typeof document.createElement === "function";

if (hasDocument) {
  console.log("A document is available.");
} else {
  console.log("No browser document is available.");
}
~~~

For code that depends on Node.js specifically, use Node APIs directly and make that runtime requirement clear.

## Node.js globals

Node.js exposes useful global objects. Common examples include:

- <code>console</code> for writing diagnostic output;
- <code>process</code> for information and control related to the current process;
- <code>Buffer</code> for working with byte sequences;
- <code>globalThis</code> as the standard reference to the current global object;
- timer functions such as <code>setTimeout()</code> and <code>setImmediate()</code>;
- standard web-shaped APIs such as <code>URL</code> and, in supported releases, <code>fetch</code>.

Do not assume that every global exists in every Node.js version. Check the supported runtime version for a project, or feature-detect an optional API.

~~~js
console.log("Node version:", process.versions.node);
console.log("Runtime name:", process.release.name);
console.log("Buffer is available:", typeof Buffer === "function");
console.log("Current global object:", globalThis);
~~~

The list of globals is runtime-specific and can evolve. A global API is convenient, but importing a built-in module can make its origin more explicit:

~~~js
import { readFile } from "node:fs/promises";

const contents = await readFile(
  new URL("./message.txt", import.meta.url),
  "utf8"
);

console.log(contents);
~~~

The <code>node:</code> prefix identifies a Node.js built-in module. It also makes code easier to distinguish from a package with a similar name.

## A module has its own scope

A Node.js module is not simply pasted into one shared global script. Variables declared at the top level belong to that module's scope.

~~~js
const lessonName = "Node.js";
var localNumber = 42;

console.log(lessonName, localNumber);
~~~

Another module does not receive <code>lessonName</code> as a global variable. To share functionality, export it from one module and import it into another.

This module scope is true for both CommonJS and ECMAScript modules. A top-level <code>var</code> in a Node.js module does not become a browser-style global property.

## CommonJS and ECMAScript modules

Node.js supports two module systems.

### CommonJS

CommonJS uses <code>require()</code> to load modules and <code>module.exports</code> or <code>exports</code> to provide values to other modules:

~~~js
// math.cjs
function add(a, b) {
  return a + b;
}

module.exports = { add };
~~~

~~~js
// app.cjs
const { add } = require("./math.cjs");

console.log(add(2, 3));
~~~

CommonJS files have module-local names such as <code>require</code>, <code>module</code>, <code>__filename</code>, and <code>__dirname</code>. These are not universal JavaScript globals.

### ECMAScript modules

ECMAScript modules use <code>import</code> and <code>export</code>:

~~~js
// math.mjs
export function add(a, b) {
  return a + b;
}
~~~

~~~js
// app.mjs
import { add } from "./math.mjs";

console.log(add(2, 3));
~~~

In an ES module, use <code>import.meta.url</code> when a module-relative URL is needed. Convert that URL to a file path only when an API requires a filesystem path.

~~~js
import { fileURLToPath } from "node:url";

const moduleFile = fileURLToPath(import.meta.url);
console.log(moduleFile);
~~~

An ES module does not automatically define CommonJS names such as <code>require</code> or <code>__dirname</code>. Do not copy CommonJS examples into an ES module without adapting the module-specific parts.

### Make the module format explicit

Node.js uses file extensions and the nearest <code>package.json</code> to determine how a file should be interpreted:

| Marker | Module format |
| --- | --- |
| <code>.mjs</code> | ECMAScript module |
| <code>.cjs</code> | CommonJS |
| <code>.js</code> with <code>"type": "module"</code> in the nearest package | ECMAScript module |
| <code>.js</code> with <code>"type": "commonjs"</code> in the nearest package | CommonJS |

Modern Node.js also has syntax detection for some files without an explicit marker, but relying on ambiguity makes projects harder to understand and can make behavior depend on runtime rules. For a project, choose a module format and state it explicitly.

An ES module project can include this in its nearest <code>package.json</code>:

~~~json
{
  "type": "module"
}
~~~

Then a file named <code>app.js</code> in that package is treated as an ES module. A <code>.cjs</code> file remains CommonJS even inside that package.

Keep module systems consistent in a project unless there is a clear interoperability reason. When CommonJS and ES modules import each other, the exact rules depend on the module type and the features used.

## The Node.js execution model

When Node.js starts a program, it loads the entry module, runs its JavaScript, and coordinates asynchronous work through the event loop. When an asynchronous operation completes, Node.js can schedule its callback or Promise continuation to run later.

~~~js
import { readFile } from "node:fs/promises";

console.log("Before read");

const text = await readFile(
  new URL("./message.txt", import.meta.url),
  "utf8"
);

console.log("File contents:", text);
console.log("After read");
~~~

The <code>readFile()</code> operation returns a Promise. While the file read is pending, Node.js can continue handling other eligible work. The JavaScript that resumes after <code>await</code> still runs as JavaScript on the event-loop thread.

### Asynchronous does not mean parallel JavaScript

Consider a CPU-heavy loop:

~~~js
function calculate() {
  let total = 0;

  for (let index = 0; index < 1_000_000_000; index += 1) {
    total += index % 10;
  }

  return total;
}
~~~

Calling <code>calculate()</code> blocks the JavaScript thread until it returns. Wrapping it in an <code>async</code> function or resolving a Promise does not move that loop to another thread.

Use asynchronous APIs for supported I/O. For CPU-heavy work, consider breaking it into chunks or using the <code>node:worker_threads</code> module when parallel JavaScript execution is appropriate.

### Timers are scheduling requests

Node.js timer functions are similar in name to browser timers, but are implemented around Node.js's event loop. A timer delay is a threshold, not a promise to run at an exact wall-clock time.

<code>setImmediate()</code> schedules a callback for a later event-loop phase. <code>setTimeout()</code> schedules a callback after at least its requested threshold, subject to event-loop work and operating-system scheduling.

Do not depend on a fixed ordering between a top-level <code>setTimeout(callback, 0)</code> and <code>setImmediate(callback)</code>. Their order can depend on context and timing. Inside an I/O callback, <code>setImmediate()</code> is intended to run after the poll phase.

<code>process.nextTick()</code> is a Node-specific queue that runs after the current JavaScript operation completes and before the event loop continues. Recursive use can prevent the event loop from progressing. Prefer Promises or <code>setImmediate()</code> for ordinary asynchronous continuation unless there is a specific reason to use <code>process.nextTick()</code>.

## The process stays alive while work is active

A Node.js process normally continues while it has active work that keeps the event loop alive, such as a server listening for connections, a timer, or an unfinished I/O operation. When there is no more work to perform, the process can exit naturally.

~~~js
setTimeout(() => {
  console.log("This timer keeps the process active until it runs.");
}, 100);
~~~

Avoid calling <code>process.exit()</code> just to end a normal script. It can stop the process before pending output or asynchronous work has completed. Set <code>process.exitCode</code> when a script needs to indicate failure while still allowing normal cleanup:

~~~js
const inputIsValid = false;

if (!inputIsValid) {
  console.error("The input is invalid.");
  process.exitCode = 1;
}
~~~

The operating system can send process signals, and Node.js exposes process events for certain lifecycle situations. Signal handling and shutdown behavior should be designed deliberately for long-running programs.

## Run a Node.js file

Check that Node.js is installed and inspect the runtime version:

~~~sh
node --version
~~~

Run an explicit ES module file:

~~~sh
node app.mjs
~~~

A CommonJS file can be run with:

~~~sh
node app.cjs
~~~

Node.js can also evaluate a short expression from the command line:

~~~sh
node -e "console.log(process.versions.node)"
~~~

For repeatable projects, use a declared minimum Node.js version and keep the module-format marker in the repository. This avoids relying on whichever runtime happens to be installed on another machine.

## Common mistakes

- Treating JavaScript and Node.js as the same thing.
- Assuming Node.js provides <code>window</code>, <code>document</code>, or a page DOM.
- Assuming asynchronous I/O means all JavaScript runs in parallel.
- Wrapping a CPU-heavy function in a Promise and expecting it not to block.
- Assuming top-level module variables become global variables.
- Using <code>__dirname</code> in an ES module.
- Mixing <code>require()</code> and <code>import</code> without understanding the module boundary.
- Leaving the module format implicit in a project.
- Expecting timers to run at an exact time or in a fixed top-level order.
- Using recursive <code>process.nextTick()</code> calls that starve the event loop.
- Calling <code>process.exit()</code> before asynchronous work or output has completed.
- Assuming a Node.js global API exists in every supported Node version.

## Key points

- Node.js is a runtime that executes JavaScript with V8 and provides server-side and system APIs.
- Node.js processes coordinate JavaScript, asynchronous operations, the event loop, and operating-system facilities.
- Browser APIs such as <code>document</code> are not part of a plain Node.js process.
- Node.js module top-level declarations are local to their module.
- CommonJS and ECMAScript modules have different syntax and module-local bindings.
- Use an explicit <code>.mjs</code>, <code>.cjs</code>, or package <code>type</code> marker.
- Asynchronous I/O can let a process handle other work while it waits, but CPU-bound JavaScript still blocks its current thread.
- Timers request scheduling and are not exact deadlines.
- Prefer natural process shutdown and report an exit code without discarding pending work.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [121 - Browser rendering, scheduling, and performance](121-browser-rendering-scheduling-and-performance.md) | [Open Q&A](../qnas/122-node-js-runtime-globals-and-execution-model.md) | [Open example](../examples/122-node-js-runtime-globals-and-execution-model.md) | [123 - Command-line arguments, environment variables, and process](123-command-line-arguments-environment-variables-and-process.md) |
