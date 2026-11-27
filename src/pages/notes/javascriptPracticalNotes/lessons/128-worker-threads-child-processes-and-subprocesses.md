# 128 - Worker threads, child processes, and subprocesses

Node.js can run additional JavaScript work in Worker threads or start separate operating-system processes. These options solve different problems. A Worker is useful for CPU-heavy JavaScript that should run away from the main event loop. A child process runs a separate program with its own process memory. A Node.js child can also communicate with its parent over an IPC channel.

Choose the smallest tool that fits the job. Built-in asynchronous APIs are usually the right choice for ordinary file or network I/O.

## Learning goals

After this lesson, you should be able to:

- distinguish a Worker thread from a child process;
- decide when CPU-heavy JavaScript needs a Worker;
- pass data to and from a Worker with messages;
- explain structured cloning, transferring, and shared memory;
- use spawn(), execFile(), exec(), and fork() for different subprocess needs;
- handle child stdout, stderr, exit status, spawn errors, and close;
- avoid shell injection and unbounded output buffering;
- limit concurrency and clean up Workers and child processes.

## Start with built-in asynchronous APIs

Before creating another thread or process, check whether Node.js already provides an asynchronous API for the work.

For example, use asynchronous filesystem methods or streams for file operations. Node.js can perform many I/O tasks without blocking the main JavaScript thread. Moving routine I/O into a Worker usually adds message-passing and lifecycle overhead without a benefit.

A Worker is mainly useful when JavaScript computation itself is CPU-heavy, such as parsing a large in-memory structure or performing a calculation that would otherwise block the event loop.

## Worker threads

The node:worker_threads module lets Node.js run JavaScript in another thread. A Worker has its own JavaScript execution context and event loop. It can run CPU-heavy JavaScript without blocking the main thread.

A small calculation can be split into a main module and a Worker module.

### Main module

~~~js
import { Worker } from "node:worker_threads";

const worker = new Worker(
  new URL("./calculate-worker.mjs", import.meta.url),
  {
    workerData: { limit: 1000000 }
  }
);

worker.on("message", (result) => {
  console.log("Worker result:", result);
});

worker.on("error", (error) => {
  console.error("Worker failed:", error.message);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error("Worker stopped with exit code:", code);
  }
});
~~~

### Worker module

~~~js
import { parentPort, workerData } from "node:worker_threads";

const limit = workerData.limit;
let total = 0;

for (let value = 1; value <= limit; value += 1) {
  total += value;
}

parentPort.postMessage({ limit, total });
~~~

The main module passes initial data with workerData. The Worker sends results with parentPort.postMessage(). Messages are delivered asynchronously.

A Worker can also send several messages over time. The parent can use postMessage() on the Worker object to send work back to it. Define the message format deliberately, for example with a type field and a payload.

### Worker lifecycle and errors

A Worker can emit message, messageerror, error, and exit events. Handle errors and the final exit status so a failed Worker does not look like a successful calculation.

worker.terminate() requests termination and returns a Promise that settles when the Worker stops. Prefer letting a Worker finish a task when practical. Termination is useful for cancellation or shutdown when the work cannot continue.

Creating a new Worker has startup and memory costs. For repeated CPU tasks, use a bounded Worker pool rather than creating a new Worker for every small item. A pool limits parallel work and reuses initialized Workers.

## Data passing, copying, and sharing

Worker messages use structured cloning for ordinary values. The receiving side gets a clone, not the same ordinary object identity. Functions and some runtime-specific objects cannot be cloned.

For larger binary data, an ArrayBuffer can be transferred. Transfer moves ownership, so the sender can no longer use that ArrayBuffer after the transfer. A SharedArrayBuffer can be accessed from more than one thread, but shared access requires careful coordination.

~~~js
const bytes = new Uint8Array([10, 20, 30]);

worker.postMessage(
  { bytes },
  [bytes.buffer]
);
~~~

The second argument is a transfer list. Do not add a buffer to a transfer list unless the sender is finished using it.

Shared memory can avoid copying, but it makes synchronization the application's responsibility. Incorrect shared updates can cause race conditions. Start with messages and structured cloning unless sharing memory is needed and measured.

## Child processes

A child process runs as a separate operating-system process. It has a separate process identifier and its own memory and JavaScript runtime. This gives stronger process isolation than a Worker, but generally uses more resources.

Use a child process when you need to:

- run a separate executable;
- run another Node.js script as a separate process;
- isolate a tool that may crash or use a different runtime;
- communicate through standard input, output, and error streams;
- use an IPC channel between Node.js parent and child processes.

### spawn(): stream input and output

spawn() starts a command with a separate argument array. Its stdin, stdout, and stderr are streams, so it works well when output may be large or should be consumed incrementally.

~~~js
import { spawn } from "node:child_process";

const child = spawn(
  process.execPath,
  ["./child-task.mjs", "report"],
  {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false
  }
);

child.stdout.setEncoding("utf8");
child.stdout.on("data", (text) => {
  console.log("child stdout:", text);
});

child.stderr.setEncoding("utf8");
child.stderr.on("data", (text) => {
  console.error("child stderr:", text);
});

child.on("error", (error) => {
  console.error("Could not start child:", error.message);
});

child.on("close", (code, signal) => {
  console.log("Child closed with:", { code, signal });
});
~~~

process.execPath is the executable path for the current Node.js runtime. Passing an argument array avoids building one shell command string.

The child process can read its arguments from process.argv. Its stdout and stderr may produce multiple chunks, so do not assume one data event contains all output.

### execFile(): capture a small result without a shell

execFile() runs an executable directly and collects its output for a callback or Promise. It is suitable for commands that produce a limited amount of output.

~~~js
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const { stdout } = await execFileAsync(
  process.execPath,
  ["--version"],
  { shell: false }
);

console.log(stdout.trim());
~~~

Captured output is buffered. If the child prints too much, the operation can fail after the configured maxBuffer is exceeded. Use spawn() when output may be large.

### exec(): run a shell command string

exec() runs a command string through a shell and buffers stdout and stderr. It can be convenient for trusted, fixed shell commands, but shell parsing introduces quoting and injection risks.

Do not concatenate user-controlled values into a shell command. Shell metacharacters can change what the shell runs.

Prefer spawn() or execFile() with a fixed executable and a separate argument array. Setting shell: false avoids shell interpretation, but the application must still validate arguments according to the target program's behavior.

~~~js
// Risky: userInput is interpreted by the shell.
exec("some-command " + userInput);
~~~

Even escaping is error-prone across shells and operating systems. Keep user input as an argument, validate it for the operation, and avoid a shell when it is not required.

### fork(): start another Node.js process with IPC

fork() is a special child-process helper for starting a Node.js module. It creates an IPC channel so the parent and child can exchange messages with send() and message events.

~~~js
import { fork } from "node:child_process";

const child = fork(
  new URL("./worker-process.mjs", import.meta.url),
  [],
  { silent: true }
);

child.on("message", (message) => {
  console.log("Message from child:", message);
});

child.send({ type: "begin", taskId: 7 });
~~~

In the child module, process.on("message", ...) receives messages and process.send() sends a response. Messages are serialized and reconstructed. The child has its own memory and runtime; fork() does not clone the current process.

Use Worker threads for parallel JavaScript inside one process. Use fork() when a separate Node.js process and its IPC boundary are useful.

## Child process events and cleanup

A ChildProcess can emit an error if it could not be started, could not be killed, or could not send an IPC message. A non-zero exit code is different: it means the child started and then reported failure.

The exit event reports that the process ended. The close event happens after the process has ended and its standard I/O streams have closed. If output streams matter, close is often the safer point to treat captured output as complete.

Always decide what a non-zero exit code means for the parent. Also decide what should happen if the child runs too long, produces too much output, or is no longer needed.

A child.kill() call sends a signal. The method name does not guarantee that the process has already stopped when the call returns. Observe exit or close, and handle errors.

## Synchronous child-process APIs

Methods such as execSync(), execFileSync(), and spawnSync() block the JavaScript thread until the child process completes.

Use them only for short, controlled startup tasks where blocking is acceptable. Do not use synchronous child-process calls in a server request handler or other code that must remain responsive.

## Choosing the right tool

| Need | Suitable choice |
| --- | --- |
| Ordinary file or network I/O | Node.js asynchronous APIs |
| CPU-heavy JavaScript that should run in parallel | Worker thread |
| Separate executable with streaming output | spawn() |
| Executable with small captured output | execFile() |
| Trusted shell command string | exec(), used carefully |
| Another Node.js module with IPC | fork() |
| Short command during controlled startup | A synchronous child-process API, only if blocking is acceptable |

## Common mistakes

- Creating Workers for I/O already handled efficiently by Node.js asynchronous APIs.
- Starting one Worker for every tiny task instead of using a bounded pool.
- Assuming workerData or postMessage shares ordinary object identity.
- Transferring an ArrayBuffer and then trying to use it on the sender.
- Using SharedArrayBuffer without a synchronization design.
- Treating a Worker as a separate operating-system process.
- Using fork() as if it were the POSIX fork system call.
- Calling exec() with user-controlled command text.
- Using exec() or execFile() to collect unbounded output.
- Forgetting to consume or configure child stdout and stderr.
- Handling exit but ignoring child spawn errors.
- Reporting success when the child exits with a non-zero code.
- Assuming child.kill() means the child has already exited.
- Using synchronous child-process methods in latency-sensitive code.

## Key points

- Worker threads run JavaScript in parallel and are most useful for CPU-heavy work.
- Node.js asynchronous APIs are generally a better fit for ordinary I/O.
- Workers communicate through messages and can transfer or share selected memory.
- A child process has its own process memory and is suited to running separate programs.
- spawn() streams output; execFile() captures limited output; exec() uses a shell and captures output; fork() starts a Node.js module with IPC.
- Avoid shell command construction from untrusted input.
- Handle spawn errors, output streams, exit status, and close events.
- Synchronous child-process APIs block the main JavaScript thread.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [127 - EventEmitter, signals, timers, and the Node.js event loop](127-eventemitter-signals-timers-and-the-node-js-event-loop.md) | [Open Q&A](../qnas/128-worker-threads-child-processes-and-subprocesses.md) | [Open example](../examples/128-worker-threads-child-processes-and-subprocesses.md) | [129 - Build HTTP servers and handle requests](129-build-http-servers-and-handle-requests.md) |
