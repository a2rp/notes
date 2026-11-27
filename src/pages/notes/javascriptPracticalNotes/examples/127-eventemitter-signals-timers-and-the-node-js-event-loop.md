# 127 - EventEmitter, signals, timers, and the Node.js event loop

This example combines a small EventEmitter task, a one-time event listener, Promise-based timers, setImmediate(), timer cancellation, and optional signal handling.

## Create this file

Create a folder named `event-timer-demo` with this file:

~~~text
event-timer-demo/
  app.mjs
~~~

### `event-timer-demo/app.mjs`

~~~js
import { EventEmitter, once } from "node:events";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

function startWatchMode() {
  let stopping = false;

  const heartbeat = setInterval(() => {
    console.log("Still running. Press Ctrl+C to stop.");
  }, 1000);

  function shutdown(signal) {
    if (stopping) return;
    stopping = true;

    clearInterval(heartbeat);
    console.log("Received " + signal + ". Interval cleared.");
    process.exitCode = 0;
  }

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));

  console.log("Watch mode is active.");
}

async function runEventAndTimerDemo() {
  const bus = new EventEmitter();

  bus.on("task:start", (task) => {
    console.log("Listener: task started - " + task.name);
  });

  bus.once("task:complete", (task) => {
    console.log("One-time listener: task completed - " + task.name);
  });

  // Register before scheduling the event so it cannot be missed.
  const completion = once(bus, "task:complete");

  bus.emit("task:start", { name: "weekly summary" });

  const completionTimer = setTimeout(() => {
    bus.emit("task:complete", { name: "weekly summary" });
  }, 25);

  try {
    const [task] = await completion;
    console.log("Promise received completion - " + task.name);
  } finally {
    clearTimeout(completionTimer);
  }

  const timerMessage = await delay(10, "Promise timer finished");
  console.log(timerMessage);

  console.log("Before setImmediate");

  await new Promise((resolve) => {
    setImmediate(() => {
      console.log("setImmediate callback ran");
      resolve();
    });
  });

  const controller = new AbortController();
  const pendingDelay = delay(60_000, "delay completed", {
    signal: controller.signal
  });

  const cancellationResult = pendingDelay.then(
    () => "completed",
    (error) => error.name
  );

  controller.abort();

  console.log(
    "Cancelled timer result - " + await cancellationResult
  );
}

async function main() {
  if (process.argv.includes("--watch")) {
    startWatchMode();
    return;
  }

  await runEventAndTimerDemo();
}

main().catch((error) => {
  console.error("Demo failed:", error.message);
  process.exitCode = 1;
});
~~~

## Run the regular demo

From the directory containing `event-timer-demo`, run:

~~~sh
node event-timer-demo/app.mjs
~~~

Expected output:

~~~text
Listener: task started - weekly summary
One-time listener: task completed - weekly summary
Promise received completion - weekly summary
Promise timer finished
Before setImmediate
setImmediate callback ran
Cancelled timer result - AbortError
~~~

The event listeners run synchronously when their events are emitted. The Promise returned by events.once() resolves after the completion event. The later lines show a Promise timer, a setImmediate callback, and a cancelled Promise timer.

## Try signal handling

Start watch mode:

~~~sh
node event-timer-demo/app.mjs --watch
~~~

The program prints a heartbeat once per second. Press Ctrl+C to send SIGINT. The handler clears the interval and sets the process exit code so Node.js can exit naturally after the handler finishes.

Signal support differs across operating systems. This mode demonstrates SIGINT from the terminal. A SIGTERM listener can be useful on platforms that deliver that signal, but SIGTERM is not supported as a real operating-system signal on Windows.

## What the example demonstrates

- on() listens for every matching event, while once() removes its listener after one event.
- EventEmitter listeners execute synchronously during emit().
- events.once() returns a Promise containing an array of emitted arguments.
- The Promise listener is registered before the timer can emit the completion event.
- Promise-based timers can be awaited like other asynchronous operations.
- An AbortController cancels the pending Promise timer, which rejects with AbortError.
- setImmediate() schedules a callback for later event-loop work.
- The order between top-level setTimeout(callback, 0) and setImmediate() is not used as a synchronization rule.
- The optional watch mode uses a signal to stop an active interval.
- The shutdown handler is idempotent and lets the process finish naturally.

The regular demo exits on its own. Watch mode intentionally keeps running until you send Ctrl+C.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [126 - Buffers, streams, and backpressure](../lessons/126-buffers-streams-and-backpressure.md) | [Open Q&A](../qnas/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) | [Open lesson](../lessons/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) | [128 - Worker threads, child processes, and subprocesses](../lessons/128-worker-threads-child-processes-and-subprocesses.md) |
