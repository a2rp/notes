# 121 - Browser rendering, scheduling, and performance: Q&A

Use these questions to review browser task scheduling, rendering opportunities, animation timing, cooperative yielding, performance measurement, and common causes of jank. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What can the browser do while a synchronous JavaScript task is still running on the main thread?

- A. Interrupt the function to paint the page
- B. Run another click handler between statements
- C. It generally must wait for the current task to yield
- D. Move the current function to a Worker automatically

**Answer: C.**

**Explanation:** A running function normally runs to completion. Long synchronous work delays other main-thread work, including event handling and rendering updates.

### 2. Which callbacks are microtasks?

- A. A Promise reaction and queueMicrotask() callback
- B. A setTimeout() callback and click handler
- C. A requestAnimationFrame() callback and a timer
- D. Every callback declared inside an async function

**Answer: A.**

**Explanation:** Promise reactions and queueMicrotask() callbacks are queued as microtasks. Timers and user events are tasks. An async function does not make all its code a microtask or move CPU work off the main thread.

### 3. When do queued microtasks normally run?

- A. In the middle of a running JavaScript statement
- B. At a microtask checkpoint after the current JavaScript stack completes
- C. Only after the next physical display refresh
- D. Only when the page is hidden

**Answer: B.**

**Explanation:** The event loop runs queued microtasks at checkpoints. A microtask checkpoint drains microtasks, including new ones queued by running microtasks.

### 4. Why can recursively queueing microtasks make a page unresponsive?

- A. Each microtask opens a new browser tab
- B. The browser must wait for the microtask queue to empty before progressing
- C. Microtasks always perform layout
- D. Microtasks are sent to the network

**Answer: B.**

**Explanation:** If each microtask schedules another one, the queue may never empty. Later tasks and rendering work can be starved.

### 5. What does setTimeout(callback, 0) mean?

- A. Run the callback immediately in the current function
- B. Paint the page before running the callback
- C. Make the callback eligible after a minimum delay, subject to scheduling
- D. Run the callback in parallel on another CPU core

**Answer: C.**

**Explanation:** A zero delay is not an exact deadline and does not guarantee that a frame will be painted first. Other queued work and browser throttling can affect when it runs.

### 6. Which API is designed for a short JavaScript visual update near a rendering opportunity?

- A. requestAnimationFrame()
- B. setInterval()
- C. queueMicrotask()
- D. localStorage.setItem()

**Answer: A.**

**Explanation:** requestAnimationFrame() schedules a callback before a future rendering update. It is useful for JavaScript-driven visual changes, not as a general-purpose background-work queue.

### 7. What should a time-based animation use to avoid depending on a fixed refresh rate?

- A. A fixed number of pixels per callback
- B. Elapsed time from the animation-frame timestamp
- C. The number of Promise reactions
- D. Date strings

**Answer: B.**

**Explanation:** Displays do not all refresh at the same rate, and frames can be skipped. Using elapsed time makes an animation's progress depend on time rather than callback count.

### 8. Does a requestAnimationFrame() callback mean the changed pixels are already visible?

- A. Yes, the callback runs after the pixels appear
- B. No, the callback runs before a rendering update
- C. Yes, but only at 60 Hz
- D. No, because it runs on a network thread

**Answer: B.**

**Explanation:** The callback is an opportunity to update visual state before rendering. The browser still has rendering and presentation work to do afterward.

### 9. Which option is the best fit for a large independent CPU calculation that does not need direct DOM access?

- A. Run it inside one long click handler
- B. Move it to a Web Worker when practical
- C. Put every calculation in queueMicrotask()
- D. Repeat it with setInterval() every millisecond

**Answer: B.**

**Explanation:** A Worker can perform computation away from the page's main thread. It communicates with the page through messages and cannot directly manipulate that page's DOM.

### 10. What is a synchronous layout read after a style write most likely to risk?

- A. Forcing the browser to calculate up-to-date layout
- B. Starting a Web Worker automatically
- C. Turning the style into a Promise
- D. Moving the element to another document

**Answer: A.**

**Explanation:** Reading geometry after invalidating layout can make the browser perform that calculation immediately. Repeating alternating reads and writes may cause avoidable layout work.

### 11. Which statement about CSS transforms and performance is accurate?

- A. Every transform is guaranteed to use only the compositor
- B. Transforms can be useful for movement, but the actual result should be profiled
- C. Transforms always eliminate all rendering work
- D. Transforms prevent the browser from painting anything

**Answer: B.**

**Explanation:** A transform can be efficient for some updates, but compositing depends on the page and browser. Property choice alone is not proof that work is free.

### 12. What does performance.now() provide?

- A. A monotonic timestamp suited to measuring elapsed time
- B. The current local date as a string
- C. A measurement of every paint that will happen later
- D. A guaranteed wall-clock time shared across devices

**Answer: A.**

**Explanation:** performance.now() is appropriate for elapsed-time measurements within a page. Measuring JavaScript duration does not automatically measure when pixels become visible.

## Short-answer questions

### 13. Why might a user not see a status text set at the start of a long click handler?

**Answer:** The handler may set the status and then keep running synchronously. The browser cannot paint the intermediate text through that same blocked main thread until the handler yields.

**Explanation:** A DOM update changes document state, but does not force the browser to present a frame immediately.

### 14. What is the difference between yielding with a task and scheduling a microtask?

**Answer:** A task yield lets the current task finish and allows the event loop to consider other queued work. A microtask runs at a microtask checkpoint before the event loop progresses to later tasks.

**Explanation:** Use microtasks for short follow-up work that must happen at a checkpoint. Do not use a chain of microtasks to make a long job responsive.

### 15. Why is “60 frames per second” not a universal animation assumption?

**Answer:** Displays can use different refresh rates, the browser may skip frames, and a hidden page may throttle or pause visual callbacks.

**Explanation:** Use the animation-frame timestamp and decide behavior based on elapsed time, not a fixed count of callbacks.

### 16. When should a developer consider breaking work into chunks?

**Answer:** When a main-thread operation takes long enough to delay input or visual updates, split it into bounded chunks and yield between chunks.

**Explanation:** Chunking creates opportunities for other work to run. The best chunk size depends on the workload and target devices, so measure it.

### 17. When might a Worker be better than chunking work on the main thread?

**Answer:** When substantial computation can be separated from DOM access and run independently from page updates.

**Explanation:** Workers run separately from the page's main execution context and exchange messages. Moving code to a Worker adds communication and data-transfer costs, so it is not ideal for every operation.

### 18. What does a User Timing measure tell you, and what does it not necessarily tell you?

**Answer:** A mark and measure can report the elapsed time between named points in application code. It does not necessarily include all later style, layout, paint, or display-presentation time.

**Explanation:** Use it to measure the code interval you define. Use a browser performance recording to inspect the broader interaction and rendering pipeline.

### 19. What is the purpose of feature-detecting the Long Tasks entry type?

**Answer:** It allows code to observe long-task entries where a browser implements them without assuming support everywhere.

**Explanation:** Long-task observation is an optional diagnostic capability. A page should continue to work when the API or entry type is unavailable.

### 20. Why should performance-observer callbacks stay lightweight?

**Answer:** They run code on the page's execution context and can add work to the system being measured.

**Explanation:** Record or summarize only useful data, and avoid turning diagnostics into another source of main-thread delay.

## Scenarios

### 21. A click handler updates a loading label, processes a million records, and then updates a completion label. The loading label appears only after the work ends. Why?

**Answer:** The synchronous record processing blocks the main thread, so the browser cannot render the intermediate loading state until the handler yields.

**Explanation:** Break the work into chunks and yield between them, or move independent computation into a Worker.

### 22. A developer replaces a 300 ms calculation with a Promise and awaits it, but the page still freezes. Why?

**Answer:** A Promise does not move CPU-bound JavaScript to another thread. The calculation still blocks whenever it runs on the main thread.

**Explanation:** Use bounded chunks with a real task yield or move suitable computation to a Worker. Async syntax alone does not make synchronous work parallel.

### 23. An animation moves an element by five pixels on every callback. It moves faster on a high-refresh display. What should change?

**Answer:** Calculate movement from the elapsed time passed to the animation-frame callback.

**Explanation:** A fixed amount per callback ties speed to callback frequency. Time-based progress works across different refresh rates and dropped frames.

### 24. A loop writes a style, reads offsetWidth, then repeats for every element. What is the likely issue and a possible improvement?

**Answer:** Each geometry read may force layout after the preceding style write. Read shared geometry before the loop, then batch the writes where the behavior allows.

**Explanation:** Batching can avoid repeated forced calculations. Confirm the effect in a performance recording because actual browser work depends on the page.

### 25. A developer moves every animation to transform because they heard transforms are always free. Is that a sound rule?

**Answer:** No. A transform can be useful for movement, but its cost depends on the browser, content, and other effects.

**Explanation:** Profile the real interaction. Avoid treating any CSS property as a universal performance guarantee.

### 26. A monitoring script reports no long tasks, but users still say scrolling is janky. Does that prove the page is fast?

**Answer:** No. Long-task observation is optional and covers only one kind of signal. Rendering cost, missed frames, input delay, or other work can still affect the experience.

**Explanation:** Record the affected interaction in browser developer tools and inspect both scripting and rendering. Also verify which APIs the target browser supports.

### 27. A repeating timer is expected to update an animation exactly every 16 milliseconds, including in a background tab. What is wrong with this design?

**Answer:** Timer delays are not precise display deadlines, and background pages may be throttled. Use requestAnimationFrame() for visual updates and handle hidden-page behavior.

**Explanation:** Keep authoritative application state independent of the number of timer callbacks. A background page cannot promise to display every scheduled frame.

## Coding questions

### 28. Measure a synchronous operation with performance.now().

**Answer:**

~~~js
const startedAt = performance.now();

performWork();

const duration = performance.now() - startedAt;
console.log("Duration:", duration.toFixed(2), "ms");
~~~

**Explanation:** The measurement covers the code interval around performWork(). It does not automatically include a later paint or display presentation.

### 29. Create named User Timing entries around rendering a list.

**Answer:**

~~~js
performance.mark("list-render-start");
renderList(items);
performance.mark("list-render-end");

performance.measure(
  "list-render",
  "list-render-start",
  "list-render-end"
);

const entries = performance.getEntriesByName("list-render");
const latest = entries[entries.length - 1];

console.log("List render took", latest.duration.toFixed(2), "ms");
~~~

**Explanation:** Named marks make the measured interval easier to find in tools and code. Clear old entries when a long-lived page no longer needs them.

### 30. Write a cooperative yield helper that prefers scheduler.yield() and has a timer fallback.

**Answer:**

~~~js
async function yieldToBrowser() {
  if (
    globalThis.scheduler &&
    typeof globalThis.scheduler.yield === "function"
  ) {
    await globalThis.scheduler.yield();
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 0));
}
~~~

**Explanation:** The timer fallback lets the current task finish before continuing in a later task. It does not promise that a frame will paint before the continuation.

### 31. Process an array in chunks and yield between chunks.

**Answer:**

~~~js
async function processItems(items) {
  const chunkSize = 500;

  for (let start = 0; start < items.length; start += chunkSize) {
    const end = Math.min(start + chunkSize, items.length);

    for (let index = start; index < end; index += 1) {
      processOne(items[index]);
    }

    if (end < items.length) {
      await yieldToBrowser();
    }
  }
}
~~~

**Explanation:** Each chunk bounds one stretch of main-thread work. Choose a chunk size by measuring the real job, and use a Worker when the computation can be cleanly moved off the main thread.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [120 - Web Crypto and secure random values](../lessons/120-web-crypto-and-secure-random-values.md) | [Open lesson](../lessons/121-browser-rendering-scheduling-and-performance.md) | [Open example](../examples/121-browser-rendering-scheduling-and-performance.md) | [122 - Node.js runtime, globals, and execution model](../lessons/122-node-js-runtime-globals-and-execution-model.md) |
