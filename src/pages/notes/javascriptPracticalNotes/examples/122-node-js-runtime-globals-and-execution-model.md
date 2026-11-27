# 122 - Node.js runtime, globals, and execution model

This example is a small Node.js project that reports runtime information, reads a local file asynchronously, schedules callbacks, and moves CPU work into a Worker thread. It also includes a separate CommonJS file to contrast the two module systems.

The project uses only Node.js built-in modules and does not make network requests.

## Create these files

Create a folder named <code>node-runtime-demo</code> and add these files.

### <code>node-runtime-demo/package.json</code>

~~~json
{
  "name": "node-runtime-demo",
  "private": true,
  "type": "module"
}
~~~

The package type marks <code>.js</code> files in this package as ECMAScript modules. This example uses <code>.mjs</code> files as well, which explicitly select that format.

### <code>node-runtime-demo/sample.txt</code>

~~~text
This file is read asynchronously by the Node.js demo.
~~~

### <code>node-runtime-demo/runtime-info.mjs</code>

~~~js
export function getRuntimeInfo() {
  return {
    runtime: process.release.name,
    nodeVersion: process.versions.node,
    hasProcessGlobal: globalThis.process === process,
    hasBufferGlobal: typeof Buffer === "function",
    hasBrowserDocument: typeof document !== "undefined",
    hasBrowserWindow: typeof window !== "undefined"
  };
}
~~~

### <code>node-runtime-demo/worker.mjs</code>

~~~js
import { parentPort, workerData } from "node:worker_threads";

const limit = workerData.limit;
let total = 0;

for (let value = 1; value <= limit; value += 1) {
  total += value % 10;
}

parentPort.postMessage({
  limit,
  total
});
~~~

The Worker performs a CPU loop separately from the main thread and sends a message with its result.

### <code>node-runtime-demo/app.mjs</code>

~~~js
import { readFile } from "node:fs/promises";
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { getRuntimeInfo } from "./runtime-info.mjs";

const moduleLocalValue = "This binding belongs to app.mjs.";

console.log("Runtime information:");
console.log(getRuntimeInfo());
console.log("This module file:", fileURLToPath(import.meta.url));
console.log(
  "Module-local value is a global property:",
  Object.hasOwn(globalThis, "moduleLocalValue")
);

console.log("\nAsynchronous file read begins.");

try {
  const text = await readFile(
    new URL("./sample.txt", import.meta.url),
    "utf8"
  );

  console.log("File contents:", text.trim());
} catch (error) {
  console.error("Could not read sample.txt:", error.message);
  process.exitCode = 1;
}

console.log("\nScheduling callbacks from an ES module.");

console.log("Synchronous statement");

process.nextTick(() => {
  console.log("process.nextTick callback");
});

Promise.resolve().then(() => {
  console.log("Promise reaction");
});

setImmediate(() => {
  console.log("setImmediate callback");
});

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

console.log("Synchronous statement after scheduling");

console.log("\nStarting CPU work in a Worker.");

const worker = new Worker(
  new URL("./worker.mjs", import.meta.url),
  {
    workerData: { limit: 2_000_000 }
  }
);

let tickCount = 0;
const ticker = setInterval(() => {
  tickCount += 1;
  console.log("Main event loop is available. Tick:", tickCount);
}, 100);

const workerResult = new Promise((resolve, reject) => {
  worker.once("message", resolve);
  worker.once("error", reject);
  worker.once("exit", (code) => {
    if (code !== 0) {
      reject(new Error("Worker stopped with exit code " + code));
    }
  });
});

try {
  const result = await workerResult;
  console.log(
    "Worker completed:",
    result.limit,
    "iterations, total:",
    result.total
  );
} catch (error) {
  console.error("Worker failed:", error.message);
  process.exitCode = 1;
} finally {
  clearInterval(ticker);
}
~~~

The module-local value is intentionally not exported or assigned to <code>globalThis</code>. The worker computation runs separately, while the interval demonstrates that the main event loop can continue processing other callbacks.

### <code>node-runtime-demo/commonjs-example.cjs</code>

~~~js
const os = require("node:os");

console.log("CommonJS file:", __filename);
console.log("CommonJS directory:", __dirname);
console.log("Platform:", os.platform());
~~~

The <code>.cjs</code> extension explicitly selects CommonJS, even though this folder's package is marked as an ES module package. Its <code>require</code>, <code>__filename</code>, and <code>__dirname</code> bindings are module-specific.

## Run the example

Check that Node.js is available:

~~~sh
node --version
~~~

Open a terminal in the folder that contains <code>node-runtime-demo</code>, then run the ES module project:

~~~sh
node node-runtime-demo/app.mjs
~~~

Run the CommonJS example separately:

~~~sh
node node-runtime-demo/commonjs-example.cjs
~~~

## Expected result

The app prints the Node.js version, reports that Node-specific globals such as <code>process</code> and <code>Buffer</code> are available, and reports that a plain browser <code>document</code> and <code>window</code> are not available.

The sample text is printed after the asynchronous file read completes. The module-local binding is not a property of <code>globalThis</code>.

The scheduling callbacks run after the synchronous statements. Their relative order can depend on context and runtime behavior, so do not use this output as a contract for timer ordering. The Worker prints a result for two million iterations. While it runs, the interval may print ticks from the main event loop.

The CommonJS file prints its own filename, directory, and operating-system platform. Exact version, path, platform, callback order, and tick count depend on the machine and runtime.

## Why the example is structured this way

- The package explicitly declares the ES module format.
- A separate <code>.cjs</code> file demonstrates CommonJS bindings inside that package.
- The asynchronous file read uses the built-in <code>node:fs/promises</code> module.
- The Worker receives data and returns a message instead of touching the main module's variables.
- The interval is cleared after the Worker finishes so the process can exit naturally.
- The app sets <code>process.exitCode</code> on failure instead of forcing immediate process termination.
- Browser globals are checked with <code>typeof</code> so missing names do not cause a reference error.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [121 - Browser rendering, scheduling, and performance](../lessons/121-browser-rendering-scheduling-and-performance.md) | [Open Q&A](../qnas/122-node-js-runtime-globals-and-execution-model.md) | [Open lesson](../lessons/122-node-js-runtime-globals-and-execution-model.md) | [123 - Command-line arguments, environment variables, and process](../lessons/123-command-line-arguments-environment-variables-and-process.md) |
