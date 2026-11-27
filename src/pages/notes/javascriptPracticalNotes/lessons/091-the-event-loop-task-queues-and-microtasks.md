# 91 - The event loop, task queues, and microtasks

JavaScript code runs one operation at a time on an execution thread. Browsers and other hosts can still respond to input and asynchronous work by scheduling callbacks. The event loop coordinates when queued JavaScript gets a turn to run.

This chapter explains the call stack, tasks, microtasks, and the browser's opportunity to update the page. The next chapter covers timers, animation frames, and scheduling APIs in detail.

## Learning goals

After this chapter, you should be able to:

- Explain the separate roles of a JavaScript engine and its host environment.
- Describe how synchronous code uses the call stack and why a running callback finishes before another begins on the same agent.
- Distinguish tasks from microtasks.
- Predict the ordering of synchronous statements, Promise reactions, queueMicrotask callbacks, and a later task.
- Explain when a browser can update rendering and why long JavaScript work makes a page unresponsive.
- Recognize how recursively scheduled microtasks can starve tasks and rendering.
- Use the event loop model without assuming every host uses identical queue details.

## The engine, the host, and an agent

The JavaScript engine parses and executes the language. The host supplies the environment around it. A browser host provides features such as the DOM and browser events. Node.js provides server-side APIs and its own scheduling model.

An **agent** is a useful model for an independent JavaScript execution thread. A browser window normally runs JavaScript for its agent on one thread. A worker has a separate agent, so it can run JavaScript independently of the window. Workers communicate with a window through message APIs rather than directly manipulating that window's DOM.

A page can ask the host to begin an operation, such as a network request, then continue executing other statements. When the host has a result or event to report, it can arrange for a callback to run later. The waiting operation is not necessarily running on the JavaScript call stack.

## The call stack

When JavaScript calls a function, the runtime creates an execution context for it and puts that context on the call stack. A function that calls another function adds another context. Returning from a function removes its context, then execution continues in the caller.

~~~js
function showTotal(price, quantity) {
  const total = price * quantity;
  return total;
}

function printReceipt() {
  const total = showTotal(12, 3);
  console.log(total);
}

printReceipt();
~~~

The order is:

1. The top-level script starts.
2. printReceipt is called and placed on the stack.
3. showTotal is called and placed above printReceipt.
4. showTotal returns, so its context is removed.
5. printReceipt logs the total and returns.
6. The script continues after the call.

For a single agent, ordinary JavaScript runs to completion. Another callback does not interrupt the middle of a function. A callback can run only when the current JavaScript work has returned control to the host and the host schedules another turn.

This is why a long loop or expensive calculation can delay input, rendering, and callbacks even when other operations have completed in the background.

## The event loop

The **event loop** is the host's mechanism for finding work that is ready to run and giving it a turn. In a browser, tasks can come from different sources, such as user input, timers, script execution, and messages. The browser coordinates those sources with microtask checkpoints and rendering.

A useful browser mental model is:

1. Run one ready task.
2. When the current JavaScript stack is empty, drain the microtask queue.
3. The browser may perform rendering work when the event loop reaches an appropriate rendering opportunity.
4. Select another ready task and repeat.

This is a learning model, not a promise that the browser paints after every callback. Rendering can be skipped when nothing needs an update, and the host may have more detailed steps. Browser task queues are associated with task sources. Do not assume all different sources share one globally ordered queue.

A callback scheduled for later does not jump ahead of synchronous statements that are already running. It waits for the current stack to finish and for the host to give its work a turn.

## Tasks

A **task** is a unit of work selected by the host for execution. Examples in a browser include running a script, handling an event, processing a timer callback, and delivering a message event.

When a task begins running JavaScript, its synchronous statements execute on the agent's call stack. If they schedule another callback, that callback waits for a later opportunity. It does not preempt the running task.

A browser may have several kinds of task sources and can select among runnable work according to its event loop rules. The relative order between work from different sources is not a general-purpose synchronization guarantee. If application logic depends on a precise relationship, express it through Promises, events, or another explicit coordination mechanism.

## Microtasks

A **microtask** is work that the host processes at a microtask checkpoint, after the current synchronous JavaScript has completed and before it proceeds to another task. Common ways to enqueue microtasks include:

- Promise reaction callbacks registered with then, catch, or finally.
- queueMicrotask(callback).
- MutationObserver delivery in a browser.

Microtasks are useful when work should run soon after the current stack finishes, without waiting for another task selection. They do not interrupt synchronous code that is already running.

The host drains the microtask queue until it is empty. A microtask can enqueue another microtask, and that new microtask is processed in the same drain. Consequently, a callback that continually schedules another microtask can keep the queue from becoming empty.

Promise reactions run asynchronously, even when the Promise is already fulfilled:

~~~js
console.log("first");

Promise.resolve().then(() => {
  console.log("third");
});

console.log("second");
~~~

The output is:

~~~text
first
second
third
~~~

The then callback is queued as a microtask. Both ordinary log statements finish first. Once the current stack is empty, the host processes the queued reaction.

## Task and microtask ordering

Consider this browser-console example:

~~~js
console.log("synchronous: start");

setTimeout(() => {
  console.log("task: timer callback");
}, 0);

Promise.resolve().then(() => {
  console.log("microtask: Promise reaction");
});

queueMicrotask(() => {
  console.log("microtask: queueMicrotask callback");
});

console.log("synchronous: end");
~~~

The output order is:

~~~text
synchronous: start
synchronous: end
microtask: Promise reaction
microtask: queueMicrotask callback
task: timer callback
~~~

The two synchronous statements run before queued callbacks. The Promise reaction and queueMicrotask callback are enqueued in that order, so they run in that order during the microtask checkpoint. The timer callback belongs to later task work and cannot run until the current task and its microtask checkpoint have finished.

The zero passed to setTimeout does not mean "run immediately" or establish a precise elapsed time. It only helps illustrate that the callback is scheduled for a later task. Timer delays and other scheduling APIs are covered in the next chapter.

A Promise callback and a queueMicrotask callback both use the microtask queue, but their error behavior differs. An exception thrown by a Promise reaction rejects the Promise returned by then. An exception thrown by a queueMicrotask callback is reported as a regular uncaught exception. Choose the API that fits the result and error handling your code needs.

## Microtasks and browser rendering

After JavaScript has finished the current task and the microtask queue is drained, the browser can reach a rendering opportunity. It may calculate style, lay out elements, and paint updates that need to appear.

This explains two common behaviors:

- A DOM change made synchronously can be visible at a later rendering opportunity.
- A long synchronous task can prevent the browser from processing input or showing an updated frame until the task finishes.

Adding a microtask does not make expensive work harmless. The microtask still runs before the browser continues to another task and may delay rendering. For substantial work, divide it into smaller pieces or move suitable computation to a worker. The next chapter covers scheduling tools for yielding and coordinating visual updates.

## Microtask starvation

A microtask queue that never becomes empty can keep later tasks from running. For example, this code continually adds another microtask:

~~~js
function scheduleAgain() {
  queueMicrotask(scheduleAgain);
}

queueMicrotask(scheduleAgain);
~~~

**Do not run this example.** It demonstrates an unbounded loop that can make the page unresponsive. Each callback schedules more microtask work before the host can proceed to another task or a rendering opportunity.

For finite work, queue only what is needed and allow the host to continue between larger units of work. A repeated microtask is not a substitute for a task-based scheduling strategy.

## Browser and Node.js differences

The call stack, Promises, and microtasks are useful concepts across JavaScript hosts. The host decides how external operations are completed and how its event loop is organized.

Browser rendering is coordinated with browser event loops. Node.js uses a runtime-specific event loop with phases and APIs that do not map one-to-one to browser rendering steps. Avoid transferring every browser ordering rule to Node.js or assuming that every host schedules callbacks identically.

For ordinary application code, rely on documented API behavior and explicit data dependencies. Use the event loop model to reason about when synchronous code finishes and why queued callbacks cannot interrupt it.

## Common mistakes

### Saying JavaScript itself waits for a network response

JavaScript can start a host operation and continue. The host handles the operation and later schedules a callback or Promise continuation when there is work to report.

### Thinking a Promise callback runs immediately

then, catch, and finally reactions run as microtasks. They wait until the current synchronous stack completes.

### Treating tasks and microtasks as interchangeable

Microtasks are processed at checkpoints before the host continues to another task. This affects ordering and can also affect responsiveness.

### Assuming a browser paints after every callback

A rendering opportunity is not a guaranteed paint after each task. The browser decides when rendering work is appropriate.

### Expecting microtasks to yield to input

The host drains microtasks before proceeding. A large or endlessly replenished microtask queue can delay tasks and rendering.

### Assuming all hosts have the same event loop

Browsers, Node.js, workers, and other runtimes provide different host behavior. Use platform documentation when exact ordering matters.

## Try it yourself

1. Run the task and microtask example in a browser console. Write down the output before running it.
2. Move the queueMicrotask call before the Promise.resolve().then call. Predict and then observe how the microtask order changes.
3. Add one queueMicrotask call from inside the Promise reaction. Observe that it runs during the same microtask checkpoint.
4. Remove the timer callback and compare the synchronous and microtask output.
5. Explain why an event handler cannot interrupt a long-running synchronous loop on the same agent.
6. Describe why repeatedly scheduling microtasks can prevent the browser from processing another event.
7. Open a separate worker example in your own project and identify which work runs in the worker agent and which runs in the window agent.

## Key points

- The JavaScript engine executes code; the host supplies browser, Node.js, and other environment behavior.
- A call stack tracks the currently running synchronous execution contexts.
- A running task is not interrupted by another callback on the same agent.
- Tasks and microtasks are different scheduling categories.
- Promise reactions and queueMicrotask callbacks run at a microtask checkpoint after synchronous code.
- The host drains microtasks until the queue is empty, including microtasks added while draining.
- A browser may render after the current task and microtask checkpoint, but it does not paint after every callback.
- Long tasks and unbounded microtask chains can delay input, rendering, and other callbacks.
- Hosts have runtime-specific event loop details, so browser and Node.js orderings should not be treated as identical.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [90 - The asynchronous programming model](090-the-asynchronous-programming-model.md) | [Open Q&A](../qnas/091-the-event-loop-task-queues-and-microtasks.md) | [Open example](../examples/091-the-event-loop-task-queues-and-microtasks.md) | [92 - Timers, animation frames, and scheduling](092-timers-animation-frames-and-scheduling.md) |
