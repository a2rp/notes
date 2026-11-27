# 92 - Timers, animation frames, and scheduling

The event loop decides when queued JavaScript can run. Browser APIs let a page ask for a callback after a minimum delay, request a callback before a visual frame, or yield so other work can run. These APIs schedule work; they do not make a callback run at an exact time or interrupt JavaScript that is already running.

This chapter covers browser timers, animation frames, cancellation, and ways to schedule work without blocking the page. The next chapter covers Promises in more depth.

## Learning goals

After this chapter, you should be able to:

- Schedule a callback once with setTimeout and cancel it with clearTimeout.
- Schedule repeated callbacks with setInterval and stop them with clearInterval.
- Explain why a timer delay is a minimum wait rather than an exact execution time.
- Choose recursive setTimeout when each asynchronous operation should finish before the next begins.
- Use requestAnimationFrame for visual updates and calculate animation progress from its timestamp.
- Cancel a pending animation frame and account for hidden tabs.
- Divide long work into chunks and let the browser handle other work between chunks.
- Recognize optional scheduling APIs and feature-detect APIs whose support varies.

## Timers schedule later tasks

### setTimeout for one later callback

setTimeout schedules a callback to run once after a requested delay, expressed in milliseconds:

~~~js
const timeoutId = setTimeout(() => {
  console.log("The callback is ready to run.");
}, 1000);
~~~

The call returns immediately. It does not pause the following statements for one second. When the requested delay has elapsed, the callback becomes eligible to run as later task work. The host runs it only when the current JavaScript work and higher-priority event-loop work allow.

~~~js
console.log("start");

setTimeout(() => {
  console.log("later");
}, 0);

console.log("end");
~~~

The synchronous output is:

~~~text
start
end
later
~~~

A zero delay means "as soon as the host can schedule this later task." It does not mean "run this function now." Pending microtasks are processed before the event loop proceeds to another task.

Pass a function as the callback. Avoid passing a string of JavaScript to execute. A string must be parsed and evaluated later, which is harder to maintain and creates code-injection risks.

You can pass additional arguments after the delay:

~~~js
function showGreeting(name) {
  console.log("Hello, " + name);
}

setTimeout(showGreeting, 500, "Mina");
~~~

Or capture values in a closure:

~~~js
const name = "Mina";

setTimeout(() => {
  console.log("Hello, " + name);
}, 500);
~~~

An ordinary function passed directly to a timer is invoked as a callback, so it does not automatically keep the receiver object as this. Use an arrow callback or bind when a method needs its instance:

~~~js
setTimeout(() => account.refresh(), 500);
~~~

### Cancel a timeout

Keep the identifier returned by setTimeout when the callback may need to be canceled:

~~~js
const timeoutId = setTimeout(() => {
  console.log("This may be canceled before it runs.");
}, 3000);

clearTimeout(timeoutId);
~~~

clearTimeout has no effect if the callback has already started or if the identifier is no longer active. Calling it with an inactive or unknown identifier is harmless.

A common pattern is to cancel an older delayed action before scheduling a replacement. This is useful for search suggestions: each keystroke can cancel the previous pending request delay so that only the newest query is sent after the user pauses.

### A delay is not an exact clock

The requested delay is a minimum wait, not a promise that the callback begins at that exact instant. The callback can run later because JavaScript is busy, other tasks are ready, the device is under load, or the browser is throttling a background page.

Browsers also apply minimum delays to some deeply nested timers. After enough nested timer calls, a requested delay below four milliseconds is raised to at least four milliseconds. Hidden or inactive tabs can be throttled further, and the details vary by browser.

Timer delays are converted to a limited integer range. Values that are not useful numbers, negative values, and extremely large delays can produce surprising results. Use a non-negative numeric delay. Do not use a single timer as a clock for a deadline far in the future. Store the deadline and check the current time when the callback runs.

For elapsed-time measurement, use performance.now(), which is monotonic within its time origin. For calendar dates and wall-clock timestamps, use Date. Do not assume that a scheduled timer fires at an exact wall-clock time.

## Repeated work with setInterval

setInterval schedules a callback repeatedly, with the first callback becoming eligible after the requested delay:

~~~js
let seconds = 0;

const intervalId = setInterval(() => {
  seconds += 1;
  console.log("Ticks observed: " + seconds);
}, 1000);
~~~

The number 1000 requests a one-second interval. It does not guarantee that the callback runs once per exact second. Busy pages and browser policies can make the actual gaps longer.

Stop a repeating callback with clearInterval:

~~~js
clearInterval(intervalId);
~~~

Keep the interval identifier so that an interface can stop work when a user closes, pauses, or leaves the relevant view. Do not start a new interval every time a button is clicked unless you first stop or reuse the existing one.

### Avoid overlapping asynchronous interval work

An interval can schedule another callback while an earlier asynchronous operation is still waiting. For example, if each request takes longer than the interval, several requests can be in flight at once and may finish out of order.

When the next operation should begin only after the previous one finishes, schedule the next timeout after the awaited work completes:

~~~js
let stopped = false;
let timeoutId;

async function poll() {
  try {
    await loadLatestData();
  } catch (error) {
    console.error("Could not load the latest data:", error);
  } finally {
    if (!stopped) {
      timeoutId = setTimeout(poll, 5000);
    }
  }
}

function stopPolling() {
  stopped = true;
  clearTimeout(timeoutId);
}

poll();
~~~

This pattern waits five seconds after each attempt finishes before starting the next one. It avoids overlapping calls, but it does not promise a fixed schedule.

Use setInterval when repeated callbacks are independent and occasional delay is acceptable. Use a recursive timeout when one run must finish before the next begins.

## Visual updates with requestAnimationFrame

requestAnimationFrame asks the browser to call a function before a future repaint. It is designed for work that updates a visual frame. It is not a general-purpose timer.

The request is one-shot. To animate continuously, request the next frame from the current frame callback. The callback receives a timestamp. Calculate progress from elapsed time so an animation has the same duration on displays with different refresh rates:

~~~js
const box = document.querySelector(".box");
const duration = 1200;
let startTime = null;
let frameId = null;

function animate(timestamp) {
  if (startTime === null) {
    startTime = timestamp;
  }

  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / duration, 1);
  const distance = progress * 240;

  box.style.transform = "translateX(" + distance + "px)";

  if (progress < 1) {
    frameId = requestAnimationFrame(animate);
  } else {
    frameId = null;
  }
}

frameId = requestAnimationFrame(animate);
~~~

If an animation changed position by a fixed number of pixels per callback, a high-refresh-rate screen would advance it more quickly. Using elapsed time makes frame rate affect smoothness, not the intended duration.

Cancel a pending frame request with cancelAnimationFrame:

~~~js
cancelAnimationFrame(frameId);
~~~

As with timers, keep the request identifier while cancellation is possible. Use null as an unrequested-state marker rather than assuming a request identifier can never be zero.

Most browsers pause requestAnimationFrame callbacks in background tabs or hidden frames. This saves work and battery. When a page becomes visible again, calculate progress from the timestamp or explicitly reset the animation according to the product behavior. Do not rely on every frame callback arriving.

For simple visual effects, CSS transitions and animations can be easier and more efficient. Use requestAnimationFrame when JavaScript needs to calculate each visual update, coordinate animation state, or integrate with other application logic.

## Yielding during long work

A long synchronous loop blocks the current JavaScript agent. User input, rendering, and other callbacks cannot run until it returns. Split large work into smaller chunks, then schedule the next chunk so the host can handle other work in between:

~~~js
const items = getItemsToProcess();
let index = 0;

function processNextChunk() {
  const end = Math.min(index + 100, items.length);

  while (index < end) {
    processItem(items[index]);
    index += 1;
  }

  if (index < items.length) {
    setTimeout(processNextChunk, 0);
  }
}

processNextChunk();
~~~

A zero-delay timeout is a simple way to yield to later task work. It does not guarantee that the browser will paint before the next chunk. Keep each chunk small enough that it does not noticeably block interaction.

For CPU-heavy work that can be separated from the page, consider a Web Worker. For a visual animation, use requestAnimationFrame. For a long sequence of smaller main-thread operations, chunking and yielding may be appropriate.

### Optional scheduler APIs

Some browsers provide the Prioritized Task Scheduling API. scheduler.postTask can enqueue work with a priority such as user-blocking, user-visible, or background. scheduler.yield can return a Promise that lets an async function yield before continuing. These APIs are not supported in every widely used browser, so feature-detect them and provide a fallback when they are optional enhancements:

~~~js
async function yieldToHost() {
  if (globalThis.scheduler?.yield) {
    await globalThis.scheduler.yield();
    return;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
~~~

Do not assume a priority API can make one long synchronous callback interruptible. The code still needs to yield or split its work.

requestIdleCallback can schedule low-priority work when the browser is idle. It is not supported everywhere and may wait a long time, so do not use it for work that must happen promptly unless you use its timeout option and handle a fallback:

~~~js
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    prepareOptionalSuggestions();
  }, { timeout: 2000 });
} else {
  setTimeout(() => {
    prepareOptionalSuggestions();
  }, 0);
}
~~~

Idle scheduling is for work that can wait, such as preparing optional suggestions. It is not suitable for responding to a click, updating the next animation frame, or guaranteeing a deadline.

## Choosing the right API

| Need | A useful choice | Reason |
| --- | --- | --- |
| Run one callback after a delay | setTimeout | Schedules a later task once |
| Cancel a pending delayed action | clearTimeout | Removes an active timeout |
| Repeat independent work | setInterval | Schedules callbacks repeatedly |
| Stop repeated work | clearInterval | Cancels an active interval |
| Run JavaScript that updates a visual frame | requestAnimationFrame | Aligns the callback with a repaint |
| Cancel a pending visual update | cancelAnimationFrame | Cancels a requested frame |
| Let other tasks run between chunks | setTimeout or a supported yield API | Returns control to the host between pieces |
| Run optional low-priority work | requestIdleCallback when supported | Uses an idle opportunity instead of competing with urgent work |
| Schedule prioritized work when supported | scheduler.postTask | Requests a task with an explicit priority |

Do not use setInterval as a precise stopwatch. Do not use requestAnimationFrame for an unrelated deadline. Do not use a microtask as a way to yield to rendering, because microtasks are drained before the host proceeds to another task.

## Common mistakes

### Expecting setTimeout to block

setTimeout schedules a callback and returns. The next statement runs immediately.

### Treating a delay as an exact execution time

The callback becomes eligible after the delay, but busy JavaScript, other tasks, and browser throttling can make it run later.

### Forgetting to clear timers

A callback can continue updating a closed dialog or stale component. Store the identifier and cancel it when that work is no longer needed.

### Using setInterval for a slow asynchronous request

Repeated interval callbacks can start a new request before the previous one completes. Use a recursive timeout when each attempt should finish before the next begins.

### Using setInterval for frame-by-frame animation

Timer intervals do not align with display refresh. Use requestAnimationFrame for JavaScript-driven visual changes and calculate progress from its timestamp.

### Advancing an animation by a fixed amount per frame

Different screens deliver frame callbacks at different rates. Calculate a value from elapsed time instead.

### Forgetting requestAnimationFrame is one-shot

A single call requests one frame only. Request another frame inside the callback if the animation should continue.

### Assuming timers or animation callbacks continue unchanged in a hidden tab

Browsers can throttle timers and usually pause animation frames for hidden pages. Handle visibility changes and recalculate from timestamps when needed.

### Expecting a yield to guarantee a paint

Yielding allows the host to process work, but it does not promise a rendered frame after every chunk. Keep chunks brief and choose the API for the kind of work.

## Try it yourself

1. Schedule a callback with setTimeout and log another message immediately afterward. Observe that the immediate message appears first.
2. Store the timeout identifier, cancel it before it runs, and confirm that its callback does not appear.
3. Start and stop an interval from buttons. Make sure repeated clicks do not create multiple active intervals.
4. Change the interval delay and observe that actual callback times can be later than requested when the page is busy.
5. Build a repeated network check with recursive setTimeout. Schedule the next attempt only after the current Promise settles.
6. Animate an element with requestAnimationFrame. Compare an increment-per-frame version with one based on the callback timestamp.
7. Cancel a pending animation frame when a user presses Stop.
8. Hide the page during an animation, then return. Decide whether the animation should continue from elapsed time or restart.
9. Process a large array in chunks. Keep the page responsive by yielding between chunks.
10. Feature-detect requestIdleCallback and scheduler.yield. Verify the fallback still completes the optional work.

## Key points

- setTimeout schedules one later callback; clearTimeout cancels a pending timeout.
- setInterval schedules repeated callbacks; clearInterval stops them.
- Timer delays are minimum waits, not exact execution times.
- Background tabs and deeply nested timers may be throttled.
- Recursive setTimeout prevents overlapping asynchronous polling when each run schedules the next after completion.
- requestAnimationFrame is a one-shot request before a visual repaint.
- Use its timestamp to calculate animation progress independently of refresh rate.
- Store timer and frame identifiers when you need to cancel scheduled work.
- Chunk long computations and yield between chunks instead of blocking the main thread.
- Optional scheduler APIs need feature detection and fallbacks.
- Use each scheduling API for the kind of work it is designed to coordinate.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [91 - The event loop, task queues, and microtasks](091-the-event-loop-task-queues-and-microtasks.md) | [Open Q&A](../qnas/092-timers-animation-frames-and-scheduling.md) | [Open example](../examples/092-timers-animation-frames-and-scheduling.md) | [93 - Promises, states, chaining, and error handling](093-promises-states-chaining-and-error-handling.md) |
