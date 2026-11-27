# 92 - Timers, animation frames, and scheduling

This Q&A reviews [Lesson 92](../lessons/092-timers-animation-frames-and-scheduling.md). Every answer is followed by an explanation.

## Timers

### 1. What does setTimeout do?

**Answer:** It schedules one callback to become eligible after a requested delay.

**Explanation:** It returns immediately. It does not pause the statements that follow it.

### 2. What does a delay of zero mean for setTimeout?

**Answer:** Schedule the callback for later task work as soon as the host can run it.

**Explanation:** Zero does not mean immediate execution. The current JavaScript work and pending microtasks run first.

### 3. Does setTimeout(callback, 1000) guarantee that the callback starts exactly one second later?

**Answer:** No.

**Explanation:** The delay is a minimum wait. A busy thread, queued work, device load, or browser throttling can make it start later.

### 4. How do you cancel a pending timeout?

**Answer:** Save the identifier returned by setTimeout and pass it to clearTimeout.

**Explanation:** clearTimeout prevents an active timeout from running. It cannot stop a callback that has already started.

### 5. Why should timer APIs receive a function instead of a string of JavaScript?

**Answer:** A function is clearer and avoids dynamically evaluating a string as code.

**Explanation:** String code is harder to maintain and can introduce code-injection risks.

### 6. How can extra arguments be passed to a timeout callback?

**Answer:** Put them after the delay argument or capture values in a closure.

**Explanation:** For example, setTimeout(showGreeting, 500, "Mina") passes "Mina" to showGreeting after the delay.

### 7. Why can passing an object method directly to setTimeout cause a this bug?

**Answer:** The timer invokes the callback without preserving the object's receiver.

**Explanation:** Wrap the call in an arrow function or bind the method to its object when it needs that instance.

### 8. What delay values should timer code generally use?

**Answer:** Non-negative numbers representing milliseconds.

**Explanation:** Negative or non-number values can be coerced or treated unexpectedly. Extremely large delays can overflow the API's integer range.

### 9. What can happen to deeply nested short timers in a browser?

**Answer:** Their requested delay can be raised to a minimum of four milliseconds after enough nested timer calls.

**Explanation:** Browsers apply this minimum to limit very frequent nested timer work. Background tabs may also receive stricter throttling.

### 10. Why should a timer not be treated as a precise clock?

**Answer:** It only makes a callback eligible after a delay, and actual execution can be later.

**Explanation:** For elapsed time, compare timestamps such as performance.now() instead of assuming each timer callback arrived on schedule.

### 11. When is setInterval useful?

**Answer:** For independent callbacks that should repeat, when occasional delays are acceptable.

**Explanation:** It schedules callbacks repeatedly after the requested interval, but does not guarantee exact timing.

### 12. How do you stop an active interval?

**Answer:** Save the identifier returned by setInterval and pass it to clearInterval.

**Explanation:** Keeping the identifier also lets an interface prevent duplicate intervals when a user presses Start more than once.

### 13. What is a risk of using setInterval for a slow asynchronous request?

**Answer:** A later interval callback can start another request while the previous request is still pending.

**Explanation:** Several operations can overlap and may complete out of order.

### 14. How can recursive setTimeout avoid overlapping polling requests?

**Answer:** Schedule the next timeout only after the current asynchronous operation finishes.

**Explanation:** The delay begins after each attempt completes, so the next attempt does not start while the previous one is still running.

### 15. Does recursive setTimeout guarantee a fixed polling schedule?

**Answer:** No.

**Explanation:** It waits for the operation to finish and then waits the requested delay. Network time and scheduling delays vary.

### 16. Which clock is useful for measuring elapsed duration?

**Answer:** performance.now().

**Explanation:** It is monotonic within its time origin, making it useful for durations. Date is for wall-clock and calendar values.

## Animation and frames

### 17. What is requestAnimationFrame designed for?

**Answer:** Requesting a callback before a future browser repaint.

**Explanation:** It is intended for JavaScript work that updates a visual frame, rather than general-purpose delayed work.

### 18. Is requestAnimationFrame repeating by itself?

**Answer:** No.

**Explanation:** It is one-shot. The callback must request another frame if the animation should continue.

### 19. What value is passed to a requestAnimationFrame callback?

**Answer:** A high-resolution timestamp in milliseconds.

**Explanation:** Use it to calculate elapsed time and animation progress.

### 20. Why should animation progress be based on elapsed time instead of a fixed position change per frame?

**Answer:** Displays can refresh at different rates, so a fixed change per callback makes animation speed vary.

**Explanation:** Elapsed-time calculations preserve the intended duration across frame rates.

### 21. How do you cancel a pending animation frame?

**Answer:** Save its request identifier and call cancelAnimationFrame with that identifier.

**Explanation:** This is useful when a user stops an animation or its component is removed.

### 22. Why is null a good marker for "no animation frame requested"?

**Answer:** Because code should not assume a request identifier can never be zero.

**Explanation:** The identifier is opaque and should not be assigned special meaning by application code.

### 23. What commonly happens to requestAnimationFrame in a hidden browser tab?

**Answer:** Most browsers pause the callbacks while the page is hidden.

**Explanation:** This reduces unnecessary work and battery use. When the page becomes visible, calculate progress from timestamps or apply the product's restart behavior.

### 24. When might CSS transitions or animations be simpler than requestAnimationFrame?

**Answer:** When the effect only changes styles between states and does not need per-frame JavaScript logic.

**Explanation:** Browser-managed CSS animation is often a clearer choice for simple visual transitions.

### 25. Which API fits JavaScript-driven visual movement that should align with repaint?

**Answer:** requestAnimationFrame.

**Explanation:** It coordinates visual calculations with a frame. setInterval does not align callbacks with the display refresh.

## Yielding and background work

### 26. What happens if a long loop runs synchronously on the main thread?

**Answer:** The browser cannot process other JavaScript callbacks or reach rendering until the loop returns.

**Explanation:** The event loop cannot interrupt the running synchronous code.

### 27. How can a large list be processed without one long blocking loop?

**Answer:** Process a small chunk, then schedule another chunk so the host can run other work in between.

**Explanation:** Shorter tasks give input and rendering opportunities between pieces of the larger job.

### 28. Does setTimeout(processNextChunk, 0) guarantee that the browser paints before the next chunk?

**Answer:** No.

**Explanation:** It yields to later task work, but the browser decides when a rendering opportunity occurs.

### 29. When is a Web Worker a suitable choice?

**Answer:** When substantial computation can be separated from direct DOM access.

**Explanation:** A worker has its own JavaScript agent and can process work without occupying the window's main agent.

### 30. What kind of work is requestIdleCallback intended for?

**Answer:** Optional low-priority work that can wait for a browser idle period.

**Explanation:** It is not suited to urgent user feedback or a guaranteed deadline.

### 31. Why should required work using requestIdleCallback have a timeout?

**Answer:** An idle period may not arrive promptly, so the callback could be delayed for a long time.

**Explanation:** A timeout allows the browser to schedule the callback even when idle time is scarce. The API still has limited browser support.

### 32. What does scheduler.postTask add when supported?

**Answer:** It schedules a task with a priority such as user-blocking, user-visible, or background.

**Explanation:** It returns a Promise and can support delayed or abortable work. Feature-detect it because support varies.

### 33. What does scheduler.yield do when supported?

**Answer:** It returns a Promise that lets an async function yield and continue later.

**Explanation:** It can split long work into responsive pieces, but it is not supported in every widely used browser.

### 34. Why should code feature-detect optional scheduling APIs?

**Answer:** Some browser environments do not implement them.

**Explanation:** Checking for the API lets the application use a fallback instead of failing at runtime.

### 35. Does a scheduler priority make a long synchronous callback interruptible?

**Answer:** No.

**Explanation:** JavaScript still runs the current callback to completion. The code must return or explicitly yield for other work to run.

### 36. Why is a microtask a poor way to yield to rendering?

**Answer:** The host drains microtasks before continuing to later tasks and rendering opportunities.

**Explanation:** A large microtask chain can delay visual updates rather than make room for them.

## Applying the model

### 37. What should this code log first?

~~~js
console.log("first");

setTimeout(() => {
  console.log("later");
}, 0);

console.log("second");
~~~

**Answer:** first, then second, then later.

**Explanation:** Both ordinary log calls finish in the current synchronous work. The timeout callback is a later task.

### 38. Which API should animate an element for one second at a consistent speed on different refresh-rate displays?

**Answer:** requestAnimationFrame with elapsed-time calculations from its timestamp.

**Explanation:** Incrementing a fixed amount per callback depends on the number of frames. Elapsed time makes progress independent of refresh rate.

### 39. A user closes a panel that has a pending timeout and animation. What should cleanup do?

**Answer:** Call clearTimeout for the timeout and cancelAnimationFrame for the pending frame.

**Explanation:** Canceling scheduled callbacks prevents them from updating stale UI after the panel is gone.

### 40. A repeated data request must wait for the prior request to finish, then pause five seconds before the next attempt. Which pattern fits?

**Answer:** Recursive setTimeout scheduled after the awaited request settles.

**Explanation:** setInterval can start overlapping requests when an operation lasts longer than the interval. Scheduling after completion preserves the intended dependency.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [91 - The event loop, task queues, and microtasks](../lessons/091-the-event-loop-task-queues-and-microtasks.md) | [Lesson](../lessons/092-timers-animation-frames-and-scheduling.md) / [Example](../examples/092-timers-animation-frames-and-scheduling.md) | [93 - Promises, states, chaining, and error handling](../lessons/093-promises-states-chaining-and-error-handling.md) |
