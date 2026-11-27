# 91 - The event loop, task queues, and microtasks

This Q&A reviews [Lesson 91](../lessons/091-the-event-loop-task-queues-and-microtasks.md). Every answer is followed by an explanation.

## Foundations

### 1. What does the JavaScript engine do, and what does the host environment do?

**Answer:** The engine parses and executes JavaScript. The host supplies environment features and schedules work around it.

**Explanation:** A browser provides APIs such as the DOM and browser events. Node.js provides server-side APIs and its own event loop behavior.

### 2. What does the call stack keep track of?

**Answer:** The execution contexts for JavaScript code that is currently running.

**Explanation:** Calling a function adds its context to the stack. Returning removes it and resumes the caller.

### 3. If function A calls function B, which function returns first?

**Answer:** Function B returns first.

**Explanation:** B was placed above A on the last-in, first-out call stack. After B returns, execution resumes inside A.

### 4. What does run to completion mean for synchronous JavaScript on one agent?

**Answer:** The current JavaScript work finishes before another callback runs on that agent.

**Explanation:** A callback cannot interrupt the middle of an ordinary function or synchronous task. It waits until the host can schedule another turn.

### 5. Does asynchronous work mean that all JavaScript statements execute at the same time?

**Answer:** No.

**Explanation:** The host can perform or wait for work outside the JavaScript call stack, then schedule a callback. JavaScript on a single agent still executes its current code sequentially.

### 6. What is an agent in the JavaScript execution model?

**Answer:** An independent JavaScript execution environment with its own execution thread model, stack, and job scheduling.

**Explanation:** A browser window and a worker can use separate agents. A worker can run JavaScript independently from its window.

### 7. Can a web worker directly change the DOM of its window?

**Answer:** No.

**Explanation:** A worker runs in a separate agent and does not have the window's DOM. The window and worker can communicate through message APIs.

### 8. What is the event loop responsible for?

**Answer:** Coordinating ready work and scheduling when JavaScript callbacks get a turn.

**Explanation:** The host selects work, lets JavaScript run, processes microtask checkpoints, and coordinates other host activities such as browser rendering.

### 9. What is a task?

**Answer:** A unit of work selected by the host to run.

**Explanation:** Browser examples include running a script, handling an event, processing a timer callback, and delivering a message event.

### 10. Name two common ways to enqueue a microtask.

**Answer:** Register a Promise reaction with then, catch, or finally, or call queueMicrotask.

**Explanation:** MutationObserver delivery also uses microtask scheduling in browsers.

## Ordering and queues

### 11. When does a Promise reaction callback run?

**Answer:** As a microtask after the current synchronous JavaScript stack completes.

**Explanation:** Even if a Promise is already fulfilled, its then callback is scheduled instead of running inline.

### 12. What is the output order?

~~~js
console.log("A");
Promise.resolve().then(() => console.log("C"));
console.log("B");
~~~

**Answer:**

~~~text
A
B
C
~~~

**Explanation:** The first two log calls run synchronously. The Promise reaction runs later at a microtask checkpoint.

### 13. What happens when queueMicrotask is called during synchronous code?

**Answer:** Its callback is scheduled for a microtask checkpoint after the current synchronous stack completes.

**Explanation:** It does not interrupt the currently running function or move ahead of synchronous statements that follow it.

### 14. If a Promise reaction is queued before a queueMicrotask callback, which runs first?

**Answer:** The Promise reaction runs first.

**Explanation:** They are both microtasks in this example. Their order follows the order in which they were queued.

### 15. What happens if a microtask queues another microtask?

**Answer:** The new microtask is processed during the same drain before the host proceeds to another task.

**Explanation:** The host continues draining microtasks until the queue is empty, including work added while it is draining.

### 16. Can an already fulfilled Promise make its then callback run synchronously?

**Answer:** No.

**Explanation:** Promise reactions are scheduled as microtasks. The current synchronous code finishes first.

### 17. What does a microtask checkpoint mean in the browser model?

**Answer:** A point when the host processes queued microtasks after the current JavaScript stack completes.

**Explanation:** The browser drains the queue before proceeding to another task or a rendering opportunity.

### 18. Are all browser task sources one globally ordered FIFO queue?

**Answer:** No.

**Explanation:** Browser task queues are associated with task sources. The host selects runnable work according to its event loop rules, so unrelated sources do not have one universal ordering guarantee.

### 19. A user event becomes ready while a long synchronous function is still running. Does the event handler interrupt the function?

**Answer:** No.

**Explanation:** The handler must wait for the current JavaScript work to finish before it can run on that agent.

### 20. Does setTimeout with a delay of zero mean its callback runs immediately?

**Answer:** No.

**Explanation:** It schedules a later task. The current synchronous code and pending microtasks run first, and the delay does not specify an exact execution time.

### 21. What is the relationship between an async function's await continuation and microtasks?

**Answer:** After the awaited Promise settles, the async function continues through Promise-job scheduling, which is processed as microtask work.

**Explanation:** await pauses that function's continuation. It does not block the entire JavaScript thread while the awaited operation is pending.

### 22. Which is the best general ordering model for a browser task and microtasks?

**Answer:** Run one task, drain microtasks, then allow a rendering opportunity when appropriate before continuing with more ready work.

**Explanation:** This is a useful model for understanding common behavior. The complete browser event loop has additional rules and does not promise a paint after every task.

### 23. Does the browser have to paint after every event callback?

**Answer:** No.

**Explanation:** Rendering happens at appropriate opportunities. The browser can skip rendering when no update is needed or when its scheduling rules do not call for a frame.

### 24. What output order should this code produce?

~~~js
console.log("start");

setTimeout(() => console.log("task"), 0);
Promise.resolve().then(() => console.log("microtask"));

console.log("end");
~~~

**Answer:**

~~~text
start
end
microtask
task
~~~

**Explanation:** Synchronous logs run first. The Promise reaction runs at the microtask checkpoint, before the later timer task.

### 25. If the queueMicrotask call is moved before the Promise.then call, what usually changes in a browser?

**Answer:** The queueMicrotask callback runs before that Promise reaction.

**Explanation:** Both callbacks are microtasks, and this example queues them in the new order. Do not generalize this to unrelated task sources.

## Responsiveness and errors

### 26. Why can a long CPU-bound loop make a page appear frozen?

**Answer:** It occupies the JavaScript agent and prevents the browser from processing other callbacks or reaching a rendering opportunity.

**Explanation:** Work that is ready elsewhere still waits while the running synchronous code has control.

### 27. Does adding an expensive microtask guarantee that the browser can render first?

**Answer:** No.

**Explanation:** Microtasks are drained before the host proceeds. Expensive microtasks can delay rendering just like other JavaScript work.

### 28. What is microtask starvation?

**Answer:** A condition where microtasks keep adding more microtasks, so the queue never becomes empty.

**Explanation:** Later tasks and browser rendering can be delayed indefinitely while the host continues draining that queue.

### 29. What is a practical way to prevent a large job from blocking the interface?

**Answer:** Split suitable work into smaller chunks or move suitable computation to a worker.

**Explanation:** Smaller units allow the host to process other work between them. A worker is useful when computation can be separated from direct DOM access.

### 30. What happens to an exception thrown inside a Promise then callback?

**Answer:** The Promise returned by then rejects with that exception.

**Explanation:** A later catch or another rejection handler can handle the failure.

### 31. How is an exception thrown directly inside a queueMicrotask callback reported?

**Answer:** It is reported as a regular uncaught exception.

**Explanation:** queueMicrotask does not create a Promise whose rejection represents the error. Its error handling differs from a Promise reaction.

### 32. If asynchronous I/O is waiting, must the JavaScript call stack stay occupied?

**Answer:** No.

**Explanation:** The host can manage the operation while JavaScript continues. When there is a result or event to report, it schedules work for JavaScript later.

### 33. Does a DOM update necessarily appear on screen in the middle of the synchronous function that made it?

**Answer:** No.

**Explanation:** JavaScript updates the DOM state, but the browser can display the visual change at a later rendering opportunity.

### 34. Why should browser task-order assumptions not be transferred directly to Node.js?

**Answer:** Node.js has a runtime-specific event loop and does not use browser rendering steps.

**Explanation:** Some scheduling concepts are shared, but hosts provide distinct APIs and ordering details. Consult the relevant host behavior when exact order matters.

### 35. What should application code use when two asynchronous operations must happen in a precise dependency order?

**Answer:** Explicit coordination such as awaiting a Promise or chaining the dependent work.

**Explanation:** Relying on incidental ordering between unrelated task sources is fragile. Express the dependency in the program.

## Applying the model

### 36. Which callback runs first if it is registered first in the same microtask queue?

**Answer:** The earlier queued microtask runs first.

**Explanation:** For the Promise and queueMicrotask callbacks in the lesson example, queue order explains their relative order.

### 37. If a microtask keeps scheduling one more microtask forever, can a ready click handler run?

**Answer:** It can be prevented from running because the microtask queue never drains.

**Explanation:** The host does not proceed to another task while draining the ever-growing microtask queue.

### 38. A callback is ready, but a synchronous function is still on the call stack. What must happen before the callback can run?

**Answer:** The current synchronous JavaScript work must return control to the host.

**Explanation:** The event loop does not interrupt ordinary running code on the same agent to insert another callback.

### 39. Which statement best distinguishes a task and a microtask?

A. A task always interrupts JavaScript, while a microtask cannot run.
B. A task is host-selected work; a microtask is drained at a microtask checkpoint.
C. A task is always a Promise, while a microtask is always a DOM event.
D. They are two names for the same queue.

**Answer:** B.

**Explanation:** Tasks and microtasks are distinct scheduling categories. Promise reactions are microtasks, while many host callbacks are scheduled as tasks.

### 40. What is the safest way to reason about event-loop ordering across browser and server environments?

**Answer:** Use the broad call-stack and microtask model, then rely on the specific host's documented rules for exact ordering.

**Explanation:** Browser rendering and Node.js runtime phases differ. Explicitly coordinate work when the program requires a particular sequence.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [90 - The asynchronous programming model](../lessons/090-the-asynchronous-programming-model.md) | [Lesson](../lessons/091-the-event-loop-task-queues-and-microtasks.md) / [Example](../examples/091-the-event-loop-task-queues-and-microtasks.md) | [92 - Timers, animation frames, and scheduling](../lessons/092-timers-animation-frames-and-scheduling.md) |
