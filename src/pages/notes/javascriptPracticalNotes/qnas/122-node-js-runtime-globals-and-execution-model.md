# 122 - Node.js runtime, globals, and execution model: Q&A

Review how Node.js executes JavaScript, how module formats differ, and what asynchronous execution does and does not mean. Each answer follows its question.

## Multiple-choice questions

### 1. What is Node.js?

- A. A JavaScript runtime that provides APIs outside the browser
- B. The JavaScript language specification
- C. A browser page
- D. A CSS framework

**Answer: A.**

**Explanation:** Node.js runs JavaScript using V8 and provides runtime APIs such as modules, file access, processes, networking, and timers.

### 2. Which component executes JavaScript in Node.js?

- A. V8
- B. CSS
- C. The HTML parser
- D. The file system

**Answer: A.**

**Explanation:** V8 is the JavaScript engine. Node.js adds APIs and runtime behavior around the engine.

### 3. Which statement about a normal Node.js process is correct?

- A. It always has a browser document
- B. It can coordinate asynchronous operations while JavaScript normally runs on a main thread
- C. Every JavaScript statement automatically runs in a separate thread
- D. It can run only one I/O request at a time

**Answer: B.**

**Explanation:** Node.js can coordinate asynchronous work, but CPU-bound JavaScript still runs on its current JavaScript thread unless work is moved or delegated.

### 4. Which object is the standard way to refer to the current global object?

- A. globalThis
- B. document
- C. module
- D. exports

**Answer: A.**

**Explanation:** globalThis is the standard global-object reference. Node.js also exposes runtime-specific global APIs.

### 5. Which name is available only in CommonJS module scope, not as a universal JavaScript global?

- A. console
- B. setTimeout
- C. __dirname
- D. globalThis

**Answer: C.**

**Explanation:** __dirname and related names are CommonJS module-local bindings. An ES module does not automatically define them.

### 6. Which extension always marks a file as an ECMAScript module in Node.js?

- A. .mjs
- B. .cjs
- C. .txt
- D. .css

**Answer: A.**

**Explanation:** .mjs explicitly marks an ES module. A .js file can also be marked as ESM by the nearest package.json type field.

### 7. Which package.json setting makes .js files in that package use ECMAScript module syntax?

- A. "type": "module"
- B. "runtime": "browser"
- C. "engine": "v8"
- D. "format": "javascript"

**Answer: A.**

**Explanation:** The nearest package.json type field controls how .js files are interpreted. Use an explicit marker so a project's module format is clear.

### 8. Which syntax is used to export a function from an ECMAScript module?

- A. export function add() {}
- B. module.exports = add
- C. exports.add = add
- D. require.export(add)

**Answer: A.**

**Explanation:** ECMAScript modules use export and import. CommonJS uses module.exports or exports with require().

### 9. What does the node: prefix in an import identify?

- A. A Node.js built-in module
- B. A file in the current directory
- C. A network URL
- D. A module that runs only in a browser

**Answer: A.**

**Explanation:** For example, node:fs/promises identifies a Node.js built-in module.

### 10. What happens if plain Node.js code tries to read document.body?

- A. Node.js creates an empty browser document
- B. It normally throws because document is not defined
- C. It automatically starts a browser
- D. It reads an HTML file from disk

**Answer: B.**

**Explanation:** A normal Node.js process does not provide a page DOM. A test library or another environment could define document, but that is not built into plain Node.js.

### 11. What does awaiting an asynchronous file read do while the read is pending?

- A. It lets the function suspend and later resume when the Promise settles
- B. It turns all JavaScript into parallel code
- C. It creates a new process
- D. It makes CPU loops non-blocking

**Answer: A.**

**Explanation:** Awaiting a Promise does not make CPU-bound JavaScript execute in parallel. The continuation still runs JavaScript on a thread.

### 12. What is the primary risk of running a large synchronous calculation in a request handler?

- A. It blocks JavaScript on that thread while it runs
- B. It automatically corrupts the package.json file
- C. It turns all timers into ES modules
- D. It creates too many browser tabs

**Answer: A.**

**Explanation:** Other JavaScript callbacks on that thread must wait for the calculation to finish.

### 13. What is an appropriate option for CPU-heavy JavaScript that can run separately from the main event-loop thread?

- A. node:worker_threads
- B. process.nextTick() in a recursive loop
- C. setTimeout(callback, 0) around one giant loop
- D. Buffer.toString()

**Answer: A.**

**Explanation:** Worker threads can execute JavaScript in separate threads. They add message-passing and coordination costs, so they are most useful when the work can be separated.

### 14. What does a timer delay in Node.js represent?

- A. An exact execution time
- B. A minimum threshold after which a callback can become eligible
- C. A guarantee that the process will exit
- D. A request to run on a Worker

**Answer: B.**

**Explanation:** Other callbacks, event-loop work, and operating-system scheduling can delay the timer callback beyond its threshold.

### 15. Can top-level setTimeout(callback, 0) and setImmediate(callback) be assumed to run in one fixed order?

- A. Yes, setTimeout always runs first
- B. Yes, setImmediate always runs first
- C. No, their order can depend on context and timing
- D. They are the same API

**Answer: C.**

**Explanation:** Their order at top level is not a reliable contract. Their scheduling relationship is more specific inside some event-loop contexts such as I/O callbacks.

### 16. Why can recursive process.nextTick() calls be harmful?

- A. They can prevent the event loop from progressing to other work
- B. They create a new package.json file each time
- C. They make every module CommonJS
- D. They clear all timers

**Answer: A.**

**Explanation:** Node processes the next-tick queue before continuing the event loop. A queue that continually replenishes itself can starve other work.

### 17. What is a normal way to communicate an unsuccessful exit status while allowing shutdown to continue?

- A. Set process.exitCode
- B. Call process.exit() before cleanup
- C. Throw away every pending Promise
- D. Set globalThis to null

**Answer: A.**

**Explanation:** Setting process.exitCode lets the process report a status while normal cleanup and pending output can finish.

## Short-answer questions

### 18. Explain the difference between JavaScript and Node.js.

**Answer:** JavaScript is a language. Node.js is a runtime that executes JavaScript and supplies APIs such as file-system access, networking, modules, timers, and process information.

**Explanation:** The language itself does not define a browser DOM or Node's file APIs.

### 19. What role does V8 play in Node.js?

**Answer:** V8 parses and executes JavaScript and performs JavaScript-engine work such as optimization and garbage collection.

**Explanation:** Node.js uses V8 but also provides runtime APIs and event-loop integration.

### 20. Why does async/await not make a synchronous CPU loop run in parallel?

**Answer:** Async/await affects how a function waits for and resumes from Promises. A CPU loop still executes synchronously on its current JavaScript thread.

**Explanation:** Move independent CPU work to a Worker or divide it into chunks when responsiveness matters.

### 21. Why is the Node.js top-level scope not the same as the global scope?

**Answer:** Each Node.js module has its own scope. Declarations at the top level are local to that module and are not automatically shared as global variables.

**Explanation:** Share values with explicit module exports and imports.

### 22. How can an ES module locate a file relative to itself?

**Answer:** Use import.meta.url as a module-relative URL, and convert it with fileURLToPath() when an API needs a filesystem path.

**Explanation:** CommonJS __dirname is not automatically available in an ES module.

### 23. When can a Node.js process exit naturally?

**Answer:** When it has no active work that keeps the event loop alive, such as pending I/O, listening servers, or referenced timers.

**Explanation:** A long-running server remains active while it is listening. A simple script can exit after its work completes.

### 24. Why should an application choose an explicit module marker?

**Answer:** It makes Node's interpretation of source files predictable and clear to developers and tools.

**Explanation:** Use .mjs, .cjs, or a package.json type field instead of relying on ambiguous file detection.

### 25. What is the difference between an event-loop callback and a Worker thread?

**Answer:** An event-loop callback runs JavaScript later on the event loop's JavaScript thread. A Worker can run JavaScript in a separate thread and exchange messages with the parent.

**Explanation:** Scheduling a callback later does not by itself create parallel execution.

## Scenarios

### 26. A script runs fetch() successfully but fails at document.querySelector(). Why?

**Answer:** The runtime may provide fetch(), but plain Node.js still does not provide a browser document or DOM.

**Explanation:** Web-shaped APIs can exist in Node without a browser page. Check each required capability independently.

### 27. A developer changes function run() to async function run(), but a calculation still delays other callbacks. Why?

**Answer:** The calculation executes synchronously before yielding. The async keyword does not move it to another thread.

**Explanation:** Awaiting an already completed value or wrapping CPU work in a Promise does not make that work parallel. Use a Worker or bounded work chunks.

### 28. An application uses require() in a file under a package marked "type": "module". What should the developer check?

**Answer:** The file is interpreted as an ES module, where CommonJS bindings such as require are not automatically defined. Use import syntax or mark that file as CommonJS with .cjs.

**Explanation:** Keep the module format explicit and use the corresponding module-local APIs.

### 29. A top-level script prints "timeout" before "immediate" on one run and the reverse order on another. Is that necessarily a bug?

**Answer:** No. At top level, the relative order of setTimeout(callback, 0) and setImmediate() can depend on context and timing.

**Explanation:** Do not use their top-level ordering as application logic. Choose an API based on the scheduling behavior actually needed.

### 30. A script sets process.exitCode after a validation error and then ends. Why can this be preferable to process.exit(1)?

**Answer:** The process can still complete normal cleanup and flush pending output while returning a non-zero status.

**Explanation:** Calling process.exit() immediately can terminate before asynchronous cleanup or output finishes.

### 31. A server performs a large synchronous JSON transformation for every request. What could users experience?

**Answer:** Requests that need the same JavaScript thread may wait while the transformation runs, increasing latency and reducing responsiveness.

**Explanation:** Optimize or chunk the work, cache reusable results where appropriate, or move independent CPU-heavy processing to Worker threads.

## Coding questions

### 32. Print the Node.js version and identify the current runtime.

**Answer:**

~~~js
console.log("Node version:", process.versions.node);
console.log("Runtime:", process.release.name);
~~~

**Explanation:** process.versions.node reports the Node.js version. process.release.name identifies the runtime as Node.js.

### 33. Check whether a browser document is available without causing a ReferenceError.

**Answer:**

~~~js
const hasDocument =
  typeof document !== "undefined" &&
  typeof document.createElement === "function";

console.log("Document available:", hasDocument);
~~~

**Explanation:** typeof on an undeclared identifier safely returns "undefined". The second check verifies that the expected method exists.

### 34. Export and import a function using ECMAScript module syntax.

**Answer:**

~~~js
// math.mjs
export function add(a, b) {
  return a + b;
}
~~~

~~~js
// app.mjs
import { add } from "./math.mjs";

console.log(add(4, 5));
~~~

**Explanation:** Run app.mjs with Node.js. The .mjs extension explicitly selects the ECMAScript module format.

### 35. Report a non-zero process status while allowing normal shutdown.

**Answer:**

~~~js
function validateInput(value) {
  if (value.length === 0) {
    console.error("Input is required.");
    process.exitCode = 1;
    return;
  }

  console.log("Input accepted.");
}

validateInput("");
~~~

**Explanation:** Setting process.exitCode records the status without forcibly terminating the process before normal work can finish.

### 36. Schedule work without assuming a particular top-level ordering between timers and immediates.

**Answer:**

~~~js
setTimeout(() => {
  console.log("Timer callback became eligible.");
}, 0);

setImmediate(() => {
  console.log("Immediate callback ran in a later event-loop phase.");
});
~~~

**Explanation:** Either message may appear first when scheduled at top level. Do not write application logic that depends on a fixed ordering here.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [121 - Browser rendering, scheduling, and performance](../lessons/121-browser-rendering-scheduling-and-performance.md) | [Open lesson](../lessons/122-node-js-runtime-globals-and-execution-model.md) | [Open example](../examples/122-node-js-runtime-globals-and-execution-model.md) | [123 - Command-line arguments, environment variables, and process](../lessons/123-command-line-arguments-environment-variables-and-process.md) |
