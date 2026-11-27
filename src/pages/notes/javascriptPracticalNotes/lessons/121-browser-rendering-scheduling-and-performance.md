# 121 - Browser rendering, scheduling, and performance

A browser page can feel slow even when its JavaScript is correct. Long synchronous work can delay input handlers, and excessive DOM or style work can make a frame miss its rendering opportunity. Good browser performance means doing the right work at the right time, measuring actual costs, and keeping the page responsive while work is in progress.

This lesson explains how JavaScript scheduling relates to browser rendering, how to animate and yield work safely, and how to investigate performance without assuming that every browser uses the same internal pipeline.

## Learning goals

After this lesson, you should be able to:

- describe the relationship between tasks, microtasks, and rendering opportunities;
- explain why the browser cannot update a page while a JavaScript task is blocking its thread;
- choose between a timer, a microtask, requestAnimationFrame(), idle work, and a Worker;
- break up long work so input and rendering can get a turn;
- avoid common sources of unnecessary style and layout work;
- measure durations with the Performance API and inspect them in developer tools;
- account for background tabs, variable refresh rates, and API support.

## The browser has more work than JavaScript

A browser receives input, runs JavaScript, updates document styles, calculates layout, paints pixels, and presents frames. These activities interact, but a page does not get to control every internal browser step.

A useful simplified view of a visible update is:

1. JavaScript or an event changes application state or the DOM.
2. The browser determines whether styles or layout need recalculation.
3. The browser paints the affected content and prepares a frame.
4. The browser presents that frame when the device can display it.

This is a teaching model. Implementations can skip work, combine stages, use worker and compositor threads, and take different paths for different content. A DOM change does not mean that the browser immediately paints a new frame.

### JavaScript tasks can block the page

A task may come from a script, timer, input event, or another browser callback. In a typical window, JavaScript runs to completion on the main thread: the browser does not interrupt a running function halfway through to paint the page or run another event handler.

~~~js
button.addEventListener("click", () => {
  status.textContent = "Working...";

  const end = performance.now() + 500;
  while (performance.now() < end) {
    // Synchronous work blocks this thread.
  }

  status.textContent = "Finished.";
});
~~~

The user may never see “Working...” because both text changes happen before the handler returns. The browser can paint after the task yields control. A long task can also delay clicks, keyboard input, scrolling work, and other callbacks.

### Tasks and microtasks

A browser event loop processes runnable tasks and performs microtask checkpoints. Promise reactions and queueMicrotask() callbacks are microtasks. A checkpoint keeps running newly queued microtasks until the queue is empty.

~~~js
console.log("task start");

queueMicrotask(() => console.log("microtask"));
Promise.resolve().then(() => console.log("promise reaction"));

setTimeout(() => console.log("timer task"), 0);

console.log("task end");
~~~

The first two messages are logged synchronously, then queued microtasks run before a later timer task. A zero-delay timer does not mean “run immediately” or “paint now.” Its callback becomes eligible after a delay and can still wait behind other work.

Do not use a chain of microtasks to yield to the browser. A microtask that keeps adding more microtasks can prevent the event loop from reaching later tasks and rendering work.

## Rendering opportunities and requestAnimationFrame()

The browser decides when a document has a rendering opportunity. It does not guarantee one rendering update after every task or at one fixed rate. A display might refresh at 60, 90, 120, or another rate, and a browser may skip work when the page is hidden or unchanged.

Use requestAnimationFrame() for JavaScript that must update visual state in step with a future rendering opportunity:

~~~js
let x = 0;
let previousTime;

function animate(timestamp) {
  if (previousTime !== undefined) {
    const seconds = (timestamp - previousTime) / 1000;
    x += 120 * seconds;
    element.style.transform = "translateX(" + x + "px)";
  }

  previousTime = timestamp;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
~~~

The callback receives a timestamp so motion can be based on elapsed time rather than assuming a fixed number of frames per second. The callback runs before a rendering update, but that does not mean the pixels have already appeared on screen. Keep the callback short. Store the request ID when you need to cancel it with cancelAnimationFrame().

Use CSS transitions or animations for simple visual effects when they express the behavior clearly. Use requestAnimationFrame() when JavaScript must calculate a visual update. Neither choice makes expensive work free. Profile the result, and respect the user's reduced-motion preference when motion is not essential.

## Pick a scheduling tool for the kind of work

| Tool | Good fit | Important limit |
| --- | --- | --- |
| A normal function | Small immediate calculations and DOM updates | Runs now and can block its current task |
| queueMicrotask() or a resolved Promise | Short follow-up work that must run at the next microtask checkpoint | Does not yield for paint or input; recursive work can starve the loop |
| setTimeout() | A delayed callback or a simple fallback task yield | Delay is a minimum, not a precise deadline; scheduling can be throttled |
| requestAnimationFrame() | A short visual update before a rendering opportunity | Not a general-purpose background-work scheduler |
| requestIdleCallback() | Optional, deferrable work when the browser reports idle time | Not available everywhere and may be delayed; provide a timeout or fallback if the work must happen |
| scheduler.yield() or scheduler.postTask() | Cooperative task scheduling when supported | Feature-detect it and provide a fallback where needed |
| A Web Worker | CPU-heavy work that can be moved away from the page's main thread | Communicate by messages; the worker cannot directly update the page DOM |

A timer is sometimes used to let the current task finish and queue another task. That can give the browser a chance to process other work between chunks, but it is not a guarantee that a paint will happen at a particular instant. Prefer scheduler.yield() where it is supported and appropriate, with a deliberate fallback.

~~~js
async function yieldToBrowser() {
  if (globalThis.scheduler &&
      typeof globalThis.scheduler.yield === "function") {
    await globalThis.scheduler.yield();
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 0));
}
~~~

Break work into chunks and yield between them:

~~~js
async function processItems(items) {
  const chunkSize = 500;
  let index = 0;

  while (index < items.length) {
    const end = Math.min(index + chunkSize, items.length);

    for (; index < end; index += 1) {
      processOne(items[index]);
    }

    if (index < items.length) {
      await yieldToBrowser();
    }
  }
}
~~~

The chunk size is a tradeoff. Smaller chunks allow the browser to respond sooner but add scheduling overhead. Measure the real workload on representative devices. If the computation is expensive and can be separated from the DOM, a Web Worker may be a better fit than repeatedly yielding on the main thread.

## Keep rendering work small

The browser can often reuse prior calculations, but code can still request expensive or repeated work.

- Batch related DOM writes instead of interleaving a style write with a layout-dependent read over and over.
- Avoid building a huge DOM tree when only a small portion needs to be visible.
- Prefer updating the smallest necessary part of the page.
- Use transforms for movement where they are appropriate, and profile the actual result. Property choice alone does not guarantee compositor-only work.
- Avoid reading layout values such as offsetWidth after changing styles repeatedly. A synchronous layout read can force the browser to calculate up-to-date geometry.
- Debounce or throttle high-frequency work only when the interaction semantics permit it. Do not make essential feedback feel delayed.
- Do not update the DOM on every animation frame unless the visible result requires it.

A common inefficient pattern reads and writes geometry repeatedly:

~~~js
for (const item of items) {
  item.style.width = container.offsetWidth + "px";
}
~~~

The read may force layout after each write. Read shared geometry once, then perform the writes:

~~~js
const width = container.offsetWidth;

for (const item of items) {
  item.style.width = width + "px";
}
~~~

This is an example of batching, not a universal performance law. Check browser tools to confirm what is expensive in the page you are optimizing.

## Measure before optimizing

Use performance.now() for a high-resolution timestamp within the current page. It is monotonic, so it is better suited to measuring elapsed time than subtracting Date.now() values.

~~~js
const start = performance.now();
performWork();
const elapsed = performance.now() - start;

console.log("Work took " + elapsed.toFixed(2) + " ms");
~~~

User Timing marks and measures give named entries that can be inspected by code and browser tools:

~~~js
performance.mark("render-list-start");
renderList(items);
performance.mark("render-list-end");

performance.measure(
  "render-list",
  "render-list-start",
  "render-list-end"
);

const measurement = performance.getEntriesByName("render-list").at(-1);
console.log(measurement.duration);
~~~

Clear old marks and measures in long-lived applications when they are no longer needed. A measured JavaScript duration is not the same as the time until the user sees the pixels. It does not include every later browser rendering step.

### Use browser developer tools

The Performance panel in browser developer tools can record a real interaction. Inspect scripting, style recalculation, layout, paint, input delay, and frame timing. Compare before and after under similar conditions. A profile can reveal whether time is spent in your code, browser rendering, network activity, or other work.

Some browsers expose a Long Tasks PerformanceObserver entry type. Where supported, it can report main-thread tasks of at least 50 milliseconds. This is a diagnostic signal, not a universal target or a complete account of poor responsiveness. Feature-detect the entry type and do not assume every browser supports it:

~~~js
const supportsLongTasks =
  "PerformanceObserver" in globalThis &&
  Array.isArray(PerformanceObserver.supportedEntryTypes) &&
  PerformanceObserver.supportedEntryTypes.includes("longtask");

if (supportsLongTasks) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log("Long task:", entry.duration.toFixed(1), "ms");
    }
  });

  observer.observe({ type: "longtask" });
}
~~~

A performance observer callback also runs code, so keep it lightweight. Use it to collect useful diagnostics, not to create more main-thread work than the issue being measured.

## Background pages and cleanup

Browsers may reduce timer frequency and pause or limit animation callbacks for background pages. Do not rely on a timer or animation frame firing at an exact wall-clock time while a page is hidden.

For visual work, stop or pause unnecessary loops when the document is hidden, and restart from current state when it becomes visible. Clean up observers, event listeners, and scheduled callbacks when their owner is no longer active. A page restored from the back-forward cache or returning from a hidden state may need to re-check its current UI state.

## Common mistakes

- Expecting the browser to paint in the middle of a synchronous function.
- Assuming <code>setTimeout(callback, 0)</code> runs immediately or guarantees a paint.
- Using a microtask as a way to yield for rendering.
- Recursively scheduling microtasks and starving later tasks.
- Advancing an animation by a fixed number of pixels per frame.
- Treating 60 frames per second as the only display refresh rate.
- Running a large calculation in a click handler without yielding or moving it to a Worker.
- Assuming async functions automatically move CPU work off the main thread.
- Reading layout after every individual style write.
- Assuming transforms always avoid layout, paint, or GPU cost.
- Optimizing without profiling representative interactions.
- Assuming long-task observation is implemented in every browser.
- Leaving animation loops and observers running when a page no longer needs them.

## Key points

- JavaScript tasks, microtasks, and browser rendering are distinct parts of event-loop processing.
- A running synchronous task prevents the browser from running another handler or painting through that same thread.
- Microtasks run before the event loop can move on to later tasks and are not a rendering yield mechanism.
- requestAnimationFrame() is for short visual updates near rendering opportunities, not for arbitrary background work.
- Yield long main-thread work between chunks or move independent computation into a Worker.
- Rendering pipelines vary, so verify costs with developer tools instead of assuming fixed internal steps.
- Measure elapsed code time and user-visible rendering separately.
- Feature-detect optional scheduling and performance APIs, and handle hidden-page behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [120 - Web Crypto and secure random values](120-web-crypto-and-secure-random-values.md) | [Open Q&A](../qnas/121-browser-rendering-scheduling-and-performance.md) | [Open example](../examples/121-browser-rendering-scheduling-and-performance.md) | [122 - Node.js runtime, globals, and execution model](122-node-js-runtime-globals-and-execution-model.md) |
