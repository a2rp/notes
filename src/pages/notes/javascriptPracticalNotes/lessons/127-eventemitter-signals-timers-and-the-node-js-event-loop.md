# 127 - EventEmitter, signals, timers, and the Node.js event loop

Node.js programs react to events, schedule callbacks, and wait for input from files, networks, and other operating-system resources. Understanding how these pieces fit together makes asynchronous code easier to reason about.

This chapter covers four connected ideas:

- EventEmitter sends named events to registered listeners;
- timers schedule callbacks or Promises for later;
- the event loop gives JavaScript opportunities to run callbacks;
- process signals let an application respond to requests such as Ctrl+C.

## Learning goals

After this lesson, you should be able to:

- create an EventEmitter and register, emit, and remove listeners;
- explain that EventEmitter listeners run synchronously in registration order;
- use once() and the Promise-based events.once() helper;
- handle the special EventEmitter error event;
- understand timer thresholds and cancel pending timers;
- describe the event loop at a useful high level;
- distinguish process.nextTick(), Promise microtasks, timers, and setImmediate();
- handle shutdown signals without abruptly truncating cleanup.

## EventEmitter and named events

Import EventEmitter from node:events. Register a listener with on(), then emit the event with emit():

~~~js
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("message", (text) => {
  console.log("Received:", text);
});

bus.emit("message", "Hello");
~~~

An event name is a string or symbol chosen by the application. The values passed after the event name become arguments to the listener.

An EventEmitter does not create a background task by itself. Calling emit() invokes the registered listeners immediately as part of the current JavaScript operation.

### Listener order and synchronous behavior

Listeners for an event run synchronously, in the order they were registered:

~~~js
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("save", () => console.log("first listener"));
bus.on("save", () => console.log("second listener"));

console.log("before emit");
bus.emit("save");
console.log("after emit");
~~~

The output order is:

~~~text
before emit
first listener
second listener
after emit
~~~

If a listener needs to schedule later work, it can call setImmediate(), setTimeout(), or another asynchronous API. Emitting an event does not automatically make a listener asynchronous.

For a regular function listener, this refers to the EventEmitter instance. An arrow function keeps the surrounding this value instead.

### on(), once(), and removing listeners

on() registers a listener for every matching event. once() registers a listener that removes itself after the first matching event:

~~~js
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("update", () => console.log("runs every time"));
bus.once("ready", () => console.log("runs once"));

bus.emit("update");
bus.emit("update");
bus.emit("ready");
bus.emit("ready");
~~~

Keep a reference to a listener when it may need to be removed:

~~~js
function reportStatus(status) {
  console.log(status);
}

bus.on("status", reportStatus);

// Later, when this component no longer needs the listener:
bus.off("status", reportStatus);
~~~

Use off() or removeListener() for listeners your code owns. Avoid removeAllListeners() on an emitter owned by another module because it can remove that module's listeners too.

Too many listeners for one event can produce a warning. Treat the warning as a clue to inspect listener setup and cleanup. Raising the listener limit should not be the first fix for listeners that are accidentally added repeatedly.

## Handle the special error event

The EventEmitter event named error has special behavior. If an emitter emits error and there is no error listener, Node.js throws the error. That can stop the process.

~~~js
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("error", (error) => {
  console.error("Task failed:", error.message);
});

bus.emit("error", new Error("Unable to complete the task"));
~~~

Install an error listener when the emitter's API reports failures through that event. Do not emit an error event as an ordinary notification without understanding this behavior.

### Async listeners need deliberate error handling

EventEmitter does not automatically await a Promise returned by an async listener. If the listener rejects, the rejection may become unhandled:

~~~js
bus.on("save", async (record) => {
  await saveRecord(record);
});
~~~

Handle failures inside the async listener, or use captureRejections only when you have deliberately configured and tested the emitter's rejection policy:

~~~js
bus.on("save", async (record) => {
  try {
    await saveRecord(record);
  } catch (error) {
    reportSaveFailure(error);
  }
});
~~~

The error handler itself should not create another unhandled rejection.

## Wait for an event with a Promise

The once() helper from node:events returns a Promise that resolves when the event is emitted. Its result is an array containing the event arguments:

~~~js
import { EventEmitter, once } from "node:events";

const bus = new EventEmitter();
const completed = once(bus, "complete");

setTimeout(() => {
  bus.emit("complete", { id: 42, ok: true });
}, 20);

const [result] = await completed;
console.log(result.id, result.ok);
~~~

Register the Promise listener before starting work that can emit the event. Otherwise, a fast or synchronous event can happen before the listener is installed.

When waiting for an event other than error, events.once() rejects if the emitter emits error while the Promise is pending. Be careful when awaiting several events one after another: multiple synchronous events can happen before the next await registers its listener. If a sequence may emit events together, register all needed listeners first or use an async iterator designed for the event stream.

## Timers schedule future work

Node.js provides setTimeout(), setInterval(), and setImmediate() as global functions.

~~~js
const timeout = setTimeout(() => {
  console.log("A delay threshold has passed");
}, 100);

const interval = setInterval(() => {
  console.log("Repeating work");
}, 1000);

// Cancel them when they are no longer needed.
clearTimeout(timeout);
clearInterval(interval);
~~~

A timeout delay is a threshold, not an exact appointment. The callback cannot run before the delay threshold, and other JavaScript work, operating-system scheduling, or event-loop activity can make it run later.

A zero or very small delay does not mean that a callback runs immediately. It schedules the callback for a later turn when Node.js can process it.

setInterval() schedules repeated callbacks, but work in one callback can take longer than expected. Avoid assuming that intervals are a precise clock for critical timing. For repeated work that should wait after each completion, schedule the next timeout after the current operation finishes.

### Promise-based timers

Import Promise-based timer functions from node:timers/promises:

~~~js
import { setTimeout as delay } from "node:timers/promises";

const value = await delay(100, "finished");
console.log(value);
~~~

An AbortSignal can cancel a Promise-based timer:

~~~js
import { setTimeout as delay } from "node:timers/promises";

const controller = new AbortController();
const pendingDelay = delay(5000, "finished", {
  signal: controller.signal
});

controller.abort();

try {
  await pendingDelay;
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Delay cancelled");
  } else {
    throw error;
  }
}
~~~

A cancelled timer Promise rejects, so handle the AbortError when cancellation is expected.

### ref() and unref()

A regular Timeout or Immediate keeps the event loop active until it is completed or cancelled. Calling unref() says that this timer alone should not prevent the process from exiting:

~~~js
const reminder = setTimeout(() => {
  console.log("Optional reminder");
}, 60_000);

reminder.unref();
~~~

Use unref() only when it is acceptable for the process to exit before the callback runs. It is not a way to make a timer more accurate.

## The event loop at a high level

JavaScript callbacks run on the main JavaScript thread by default. Node.js can use operating-system facilities and a worker pool for certain asynchronous work, then arrange for callbacks to run when JavaScript can process them.

The event loop repeatedly handles work in phases. A simplified list includes:

| Phase | General role |
| --- | --- |
| timers | Run eligible setTimeout() and setInterval() callbacks |
| pending callbacks | Run certain deferred system callbacks |
| poll | Retrieve and process I/O events, or wait for I/O |
| check | Run setImmediate() callbacks |
| close callbacks | Run some close-event callbacks |

There are also internal phases that application code does not use directly. This phase list is a mental model, not a promise that every callback runs at one exact time.

A long-running synchronous JavaScript function blocks the main thread. While it runs, the event loop cannot run other JavaScript callbacks, even if their timers or I/O are ready. Break up CPU-heavy work or move suitable work to worker threads when responsiveness matters.

### process.nextTick() and Promise microtasks

process.nextTick() schedules a callback after the current operation and before the event loop continues:

~~~js
console.log("current operation");

process.nextTick(() => {
  console.log("nextTick callback");
});

console.log("still in current operation");
~~~

The current operation completes first. The nextTick queue is not one of the event-loop phases. Recursively scheduling nextTick callbacks can keep the queue from draining and starve I/O.

Promise reactions and queueMicrotask() callbacks use the JavaScript microtask queue. They also run after the current stack unwinds. The observable ordering between nextTick work and Promise microtasks can depend on how the module or callback was entered. Avoid making application correctness depend on a simplistic universal ordering example.

Use process.nextTick() when an API specifically needs to defer work until after the current operation but before the event loop continues. For yielding so other event-loop work can proceed, setImmediate() is often easier to reason about.

### setImmediate() and setTimeout()

setImmediate() runs in the check phase after poll processing. A setTimeout(callback, 0) callback runs after its timer threshold and when the loop reaches the timers work.

When both are scheduled from the top level, their order is not a reliable contract. When both are scheduled from an I/O callback, setImmediate() runs before the zero-delay timer in that situation:

~~~js
import { readFile } from "node:fs";

readFile("input.txt", () => {
  setTimeout(() => console.log("timer callback"), 0);
  setImmediate(() => console.log("immediate callback"));
});
~~~

Do not use timer ordering as a synchronization mechanism. Use Promises, events, or explicit control flow to express a dependency.

## Respond to process signals

A signal is a notification delivered to a process by the operating system or terminal. Common examples include SIGINT, often produced by Ctrl+C, and SIGTERM, often used to request shutdown.

Installing a listener changes default handling for some signals. A handler should begin cleanup, stop accepting new work, close resources, and let the process exit after cleanup completes. Avoid calling process.exit() immediately if pending output or cleanup work must finish.

~~~js
import process from "node:process";

let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log("Received", signal, "- stopping work");
  clearInterval(heartbeat);
  process.exitCode = 0;
}

const heartbeat = setInterval(() => {
  console.log("Still running");
}, 1000);

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
~~~

Signal support differs between operating systems. SIGINT from a terminal is widely supported. SIGTERM is not supported as a real operating-system signal on Windows, although Node.js can expose an event listener for that name. SIGKILL cannot be caught, so it cannot be used for graceful cleanup. Signal handlers are not available in Worker threads.

In a real server, shutdown usually includes stopping the server from accepting new requests, waiting for active work up to a limit, and closing remaining resources. A handler should be idempotent because more than one shutdown request can arrive.

## Common mistakes

- Assuming EventEmitter.emit() schedules listeners asynchronously.
- Forgetting that listeners run synchronously in registration order.
- Emitting error without an error listener.
- Assuming EventEmitter waits for an async listener's Promise.
- Registering events.once() after the event may already have fired.
- Awaiting multiple events sequentially when they can be emitted together.
- Treating a timer delay as an exact execution time.
- Assuming top-level setImmediate() and setTimeout(..., 0) always run in a fixed order.
- Recursively scheduling process.nextTick() and starving I/O.
- Doing long CPU-heavy work inside an event-loop callback.
- Leaving intervals active after a task is cancelled or complete.
- Calling process.exit() before shutdown cleanup and output finish.
- Assuming signal names and behavior are identical across platforms.

## Key points

- EventEmitter is a synchronous, named-event mechanism. Listeners run in registration order.
- on() listens repeatedly, once() listens for one emission, and off() removes a listener.
- An unhandled EventEmitter error event is thrown.
- Async EventEmitter listeners need explicit Promise rejection handling.
- Timer delays are thresholds, not exact appointment times.
- process.nextTick() is a special queue, not an event-loop phase, and recursive use can starve I/O.
- setImmediate() runs after poll processing; top-level ordering with a zero-delay timer is not guaranteed.
- Synchronous CPU-heavy work blocks other JavaScript callbacks.
- Signal handling should start orderly, idempotent cleanup and allow the event loop to finish it.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [126 - Buffers, streams, and backpressure](126-buffers-streams-and-backpressure.md) | [Open Q&A](../qnas/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) | [Open example](../examples/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) | [128 - Worker threads, child processes, and subprocesses](128-worker-threads-child-processes-and-subprocesses.md) |
