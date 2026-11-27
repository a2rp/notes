# 128 - Worker threads, child processes, and subprocesses: Q&A

Review how Node.js runs CPU-heavy JavaScript in worker threads and starts separate programs with child processes. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which kind of work is a good fit for a Worker thread?

- A. A CPU-heavy JavaScript calculation that would block the main thread
- B. Every small file read
- C. A network request that already uses an asynchronous Node.js API
- D. A timer callback

**Answer: A.**

**Explanation:** Worker threads are useful for CPU-intensive JavaScript. Ordinary asynchronous I/O usually does not need a Worker.

### 2. What does workerData provide?

- A. Initial data for a Worker when it starts
- B. A shared global object with the parent
- C. A way to start a shell command
- D. The Worker's exit code

**Answer: A.**

**Explanation:** The parent can pass cloneable initial data through the workerData option. It is not automatically shared object identity.

### 3. How does a Worker commonly send a result to its parent?

- A. parentPort.postMessage()
- B. process.stdout.write() only
- C. child.kill()
- D. process.exitCode

**Answer: A.**

**Explanation:** A Worker can post a message through parentPort. The parent receives it through the Worker's message event.

### 4. What happens when an ordinary object is sent through a Worker message?

- A. It is structured-cloned
- B. It becomes a shared object automatically
- C. It is converted into a child process
- D. It is written to a file

**Answer: A.**

**Explanation:** The receiving side gets a cloned value. Use a transfer list for transferable data or shared memory only when there is a deliberate need.

### 5. What does transferring an ArrayBuffer do?

- A. Moves ownership to the receiver, making the sender's buffer unusable
- B. Creates a child process
- C. Copies a JavaScript function
- D. Keeps both sides independently writable

**Answer: A.**

**Explanation:** Transfer can avoid copying, but the sender must not expect to keep using a transferred buffer.

### 6. Which child-process method is suited to streaming a program's output?

- A. spawn()
- B. exec()
- C. execFileSync()
- D. process.nextTick()

**Answer: A.**

**Explanation:** spawn() exposes standard input, output, and error as streams, making it suitable for incremental or large output.

### 7. Which statement best describes exec()?

- A. It runs a command string through a shell and buffers output
- B. It creates a Worker thread
- C. It always streams output without buffering
- D. It starts a Node.js module with an IPC channel

**Answer: A.**

**Explanation:** Shell interpretation makes command construction risky when input is untrusted. Its captured output is also buffered.

### 8. What is fork() designed to start?

- A. A Node.js module in a separate process with an IPC channel
- B. A JavaScript function in the same thread
- C. Any shell command without a shell
- D. A browser tab

**Answer: A.**

**Explanation:** fork() is a helper for starting another Node.js process and communicating over IPC. It does not clone the current process.

### 9. Which event indicates that a child process has ended and its stdio streams have closed?

- A. close
- B. spawn
- C. message
- D. online

**Answer: A.**

**Explanation:** exit reports process termination. close follows after the process has ended and its standard I/O streams are closed.

### 10. What does a non-zero child exit code usually indicate?

- A. The child ran and reported failure
- B. The child could not be spawned in every case
- C. The child was a Worker
- D. The parent has no event loop

**Answer: A.**

**Explanation:** A spawn failure is reported through the child process error event. A non-zero exit code is an unsuccessful result from a child that ran.

### 11. What is a major risk of putting user input into an exec() command string?

- A. Shell injection or unintended shell parsing
- B. The input is automatically validated
- C. The command becomes a Worker
- D. The event loop switches phases

**Answer: A.**

**Explanation:** Shell metacharacters in untrusted input may alter the command. Prefer a fixed executable and argument array, then validate arguments for the target program.

### 12. What is a main-thread consequence of spawnSync()?

- A. It blocks JavaScript until the child finishes
- B. It runs in a Worker automatically
- C. It never waits for output
- D. It creates an IPC channel

**Answer: A.**

**Explanation:** Synchronous child-process APIs block the JavaScript thread. Avoid them in request handlers or other latency-sensitive paths.

## Short-answer questions

### 13. Explain the difference between a Worker thread and a child process.

**Answer:** A Worker runs JavaScript in another thread within the same process. A child process runs as a separate operating-system process with its own process memory and runtime.

**Explanation:** Workers are useful for CPU-heavy JavaScript that should run alongside the main thread. Child processes are useful for running separate programs or creating a process boundary.

### 14. Why are Workers usually not the first choice for ordinary file or network I/O?

**Answer:** Node.js asynchronous APIs already handle much I/O without blocking the JavaScript thread.

**Explanation:** A Worker adds startup and memory overhead. Use one when its parallel JavaScript work or isolation benefit justifies that cost.

### 15. What is the difference between spawn() and execFile()?

**Answer:** spawn() exposes output streams for incremental consumption. execFile() collects output in memory for a callback or Promise.

**Explanation:** Prefer streaming for large or ongoing output. Captured output methods have a buffer limit.

### 16. How does execFile() differ from exec() with respect to shell execution?

**Answer:** execFile() runs the executable directly by default, while exec() sends a command string through a shell.

**Explanation:** Direct execution avoids shell interpretation. Do not pass untrusted input into shell command strings.

### 17. Why should the parent listen for both a child error event and final process status?

**Answer:** The error event can report that the process could not start or another process operation failed. The exit status reports how a process that ran finished.

**Explanation:** These are different failure paths. Handle both so a spawn failure is not confused with a program that ran and returned a non-zero code.

### 18. Why can child stdout arrive in several data chunks?

**Answer:** Standard output is a stream, and stream chunk boundaries do not correspond to complete lines or application messages.

**Explanation:** Accumulate or parse chunks according to the output format instead of assuming one data event contains the entire result.

### 19. What should an application consider before calling worker.terminate()?

**Answer:** It should decide that the Worker should stop, and it should await or otherwise handle the termination Promise and resulting lifecycle.

**Explanation:** Termination is useful for cancellation or shutdown. When possible, let useful work finish cleanly.

### 20. What should a program do with a child's non-zero exit code?

**Answer:** Treat it as a failure according to the application's policy and report or propagate that failure.

**Explanation:** Do not print a success message just because the process started. Check its final status.

## Scenarios

### 21. A server performs a large synchronous calculation for each request. Requests become slow even though the calculation is independent. What could help?

**Answer:** Move the CPU-heavy calculation to a Worker thread or a bounded Worker pool.

**Explanation:** Synchronous JavaScript blocks the main thread. A pool avoids starting a new Worker for every tiny task and limits parallel resource use.

### 22. A program needs to run a system utility and process output as it arrives. Which API is a sensible starting point?

**Answer:** spawn() with a fixed executable and a separate argument array.

**Explanation:** It streams output and avoids constructing a shell command string. Validate arguments for the utility's expected input.

### 23. A command writes an unbounded amount of output. Why is exec() a poor fit?

**Answer:** exec() buffers stdout and stderr, so output can exceed its configured buffer limit.

**Explanation:** Use spawn() and consume streams when output may be large.

### 24. A web request includes a filename, and the server concatenates it into an exec() command. What is the safer direction?

**Answer:** Avoid shell command construction. Use a fixed executable with an argument array, validate the filename for the intended operation, and use spawn() or execFile() as appropriate.

**Explanation:** An argument array avoids shell parsing, but validation is still needed because the target program may interpret arguments in meaningful ways.

### 25. A parent listens only for a child's exit event and immediately reads collected stdout. What could go wrong?

**Answer:** The stdio streams may not have closed yet, so output may still be arriving.

**Explanation:** The close event occurs after the process ends and its stdio streams close. Use it when the collected output must be complete.

### 26. A Worker receives a transferred buffer. The parent then tries to read the original buffer and gets an error or detached state. Why?

**Answer:** Ownership of the ArrayBuffer was transferred to the Worker.

**Explanation:** A transfer list avoids copying by moving ownership. If the parent must keep using the data, do not transfer it or make an intentional copy.

### 27. A developer creates a Worker for each small string transformation. Why could performance get worse?

**Answer:** Worker startup, communication, and memory costs may exceed the cost of the small transformation.

**Explanation:** Use Workers for sufficiently large CPU-bound tasks, and consider a bounded reusable pool for repeated work.

### 28. A child process starts successfully but exits with code 2. Is that a spawn error?

**Answer:** No. It started and reported an unsuccessful exit status.

**Explanation:** A spawn error is reported through error. A non-zero exit code is the child's completion result and should be handled separately.

## Coding questions

### 29. Start a Worker with initial data and receive its result.

**Answer:**

~~~js
import { Worker } from "node:worker_threads";

const worker = new Worker(
  new URL("./sum-worker.mjs", import.meta.url),
  { workerData: { limit: 1000 } }
);

worker.on("message", (result) => {
  console.log("Sum:", result);
});

worker.on("error", (error) => {
  console.error("Worker failed:", error.message);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error("Worker exited with code:", code);
  }
});
~~~

~~~js
// sum-worker.mjs
import { parentPort, workerData } from "node:worker_threads";

let sum = 0;

for (let number = 1; number <= workerData.limit; number += 1) {
  sum += number;
}

parentPort.postMessage(sum);
~~~

**Explanation:** workerData carries the initial input, and parentPort.postMessage() sends the result back. The parent handles messages, errors, and the final exit status.

### 30. Spawn the current Node.js runtime with a script and handle its final status.

**Answer:**

~~~js
import { spawn } from "node:child_process";

const child = spawn(
  process.execPath,
  ["./child-task.mjs", "daily-report"],
  {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false
  }
);

child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
});

child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
});

child.on("error", (error) => {
  console.error("Could not start child:", error.message);
});

child.on("close", (code, signal) => {
  if (code !== 0) {
    console.error("Child failed:", { code, signal });
    process.exitCode = 1;
  }
});
~~~

**Explanation:** process.execPath selects the current Node.js executable. Arguments are separate and shell: false prevents shell interpretation. The close event provides final status after stdio closes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [127 - EventEmitter, signals, timers, and the Node.js event loop](../lessons/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) | [Lesson 128](../lessons/128-worker-threads-child-processes-and-subprocesses.md) | [Example 128](../examples/128-worker-threads-child-processes-and-subprocesses.md) | [129 - Build HTTP servers and handle requests](../lessons/129-build-http-servers-and-handle-requests.md) |
