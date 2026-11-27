# 128 - Worker threads, child processes, and subprocesses: Example

This example runs a CPU-bound sum in a Worker, starts a separate Node.js process with streaming output, and sends a message to another Node.js process over IPC.

## Create these files

Create a folder named `worker-process-demo` with these files:

~~~text
worker-process-demo/
  app.mjs
  calculate-worker.mjs
  child-task.mjs
  message-child.mjs
~~~

### `worker-process-demo/app.mjs`

~~~js
import { fork, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("./calculate-worker.mjs", import.meta.url),
      { workerData: { limit: 1_000_000 } }
    );

    let result;

    worker.once("message", (message) => {
      result = message;
    });

    worker.once("error", reject);

    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error("Worker exited with code " + code));
        return;
      }

      if (result === undefined) {
        reject(new Error("Worker exited without returning a result"));
        return;
      }

      resolve(result);
    });
  });
}

function runSpawnedTask() {
  return new Promise((resolve, reject) => {
    const childFile = fileURLToPath(
      new URL("./child-task.mjs", import.meta.url)
    );

    const child = spawn(
      process.execPath,
      [childFile, "daily-report"],
      {
        stdio: ["ignore", "pipe", "pipe"],
        shell: false
      }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });

    child.once("error", reject);

    child.once("close", (code, signal) => {
      if (code !== 0) {
        reject(
          new Error(
            "Child failed with code " + code +
            " and signal " + signal +
            (stderr ? ": " + stderr.trim() : "")
          )
        );
        return;
      }

      resolve({ stdout, code });
    });
  });
}

function runIpcTask() {
  return new Promise((resolve, reject) => {
    const childFile = fileURLToPath(
      new URL("./message-child.mjs", import.meta.url)
    );

    const child = fork(childFile, [], {
      stdio: ["ignore", "inherit", "inherit", "ipc"]
    });

    let settled = false;

    function fail(error) {
      if (settled) return;
      settled = true;
      reject(error);
    }

    child.once("error", fail);

    child.once("message", (message) => {
      if (settled) return;
      settled = true;
      child.disconnect();
      resolve(message);
    });

    child.once("close", (code) => {
      if (code !== 0) {
        fail(new Error("IPC child exited with code " + code));
      } else if (!settled) {
        fail(new Error("IPC child exited without a reply"));
      }
    });

    child.send(
      { type: "greet", name: "Node" },
      (error) => {
        if (error) fail(error);
      }
    );
  });
}

async function main() {
  const sum = await runWorker();
  console.log("Worker sum:", sum);

  const task = await runSpawnedTask();
  console.log("Spawned child output:");
  process.stdout.write(task.stdout);
  console.log("Spawned child exit code:", task.code);

  const reply = await runIpcTask();
  console.log("IPC reply:", JSON.stringify(reply));
}

main().catch((error) => {
  console.error("Demo failed:", error.message);
  process.exitCode = 1;
});
~~~

### `worker-process-demo/calculate-worker.mjs`

~~~js
import { parentPort, workerData } from "node:worker_threads";

let sum = 0;

for (let number = 1; number <= workerData.limit; number += 1) {
  sum += number;
}

parentPort.postMessage(sum);
~~~

### `worker-process-demo/child-task.mjs`

~~~js
const taskName = process.argv[2] ?? "unnamed";

console.log("Child task:", taskName);
console.log("Report ready.");
~~~

### `worker-process-demo/message-child.mjs`

~~~js
process.on("message", (message) => {
  if (message?.type !== "greet") {
    process.exitCode = 1;
    return;
  }

  process.send({
    type: "greeting",
    text: "Hello, " + message.name + "!"
  });
});
~~~

## Run the example

From the directory containing `worker-process-demo`, run:

~~~sh
node worker-process-demo/app.mjs
~~~

Expected output:

~~~text
Worker sum: 500000500000
Spawned child output:
Child task: daily-report
Report ready.
Spawned child exit code: 0
IPC reply: {"type":"greeting","text":"Hello, Node!"}
~~~

## How it works

### Worker thread

The parent sends the limit as workerData. The Worker performs the CPU-heavy loop and posts the sum through parentPort. The parent waits for the Worker's exit event as well as its message, and reports an error if it exits unsuccessfully or never returns a result.

The calculation is deliberately in the Worker so it does not occupy the main JavaScript thread. For a repeated workload, use a bounded pool rather than creating a new Worker for every small task.

### Spawned child process

spawn() starts the current Node.js executable with a separate script path and argument. The executable and arguments are separate values, and shell is disabled. The example collects stdout and stderr as streams and checks the final status on close.

The child output is small in this demo. For large output, process stream chunks incrementally instead of collecting all of them in memory.

### Child process with IPC

fork() starts a separate Node.js process with an IPC channel. The parent sends a structured message, and the child sends back a response. This demonstrates process-to-process messaging, not a Worker thread.

### Safety and failure handling

- Keep the executable fixed and pass arguments as array entries.
- Do not concatenate untrusted input into a shell command.
- Validate values for the program that receives them, even when no shell is used.
- Handle process start errors and non-zero exit status separately.
- Choose a limit for child output when collecting it in memory.
- Use synchronous child-process methods only when blocking the JavaScript thread is acceptable.

## What this example demonstrates

- Worker threads can move CPU-heavy JavaScript away from the main thread.
- workerData passes initial values, and parentPort.postMessage() returns a result.
- A separate child process can be started with spawn() and streamed output.
- fork() starts a Node.js child process with an IPC channel.
- File paths are resolved relative to the current module.
- The parent checks Worker and child process lifecycle outcomes.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [127 - EventEmitter, signals, timers, and the Node.js event loop](../lessons/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) | [Open Q&A](../qnas/128-worker-threads-child-processes-and-subprocesses.md) | [Open lesson](../lessons/128-worker-threads-child-processes-and-subprocesses.md) | [129 - Build HTTP servers and handle requests](../lessons/129-build-http-servers-and-handle-requests.md) |
