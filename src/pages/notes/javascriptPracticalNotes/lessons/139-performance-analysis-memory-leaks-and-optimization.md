# 139 - Performance analysis, memory leaks, and optimization

Performance work starts by finding a real bottleneck. A slow interaction, a long startup, a steadily growing heap, and a high server response time are different problems. Measure the affected workload, make one targeted change, then measure again under comparable conditions.

Optimization without evidence can make code harder to maintain without helping users. A faster local microbenchmark is not useful if it does not improve the application's important work.

## Learning goals

- Define a performance problem with a measurable user or system outcome.
- Distinguish latency, throughput, responsiveness, startup cost, and memory use.
- Measure elapsed time with an appropriate clock and repeatable workload.
- Use browser and Node.js profiling tools to find where time and memory go.
- Recognize common JavaScript memory retention patterns.
- Release listeners, timers, observers, subscriptions, and references when their owner ends.
- Optimize algorithms and rendering only after locating the cost.
- Compare changes before and after without overgeneralizing benchmark results.

## Define what needs to improve

A vague goal such as "make this faster" is difficult to verify. State the operation, the workload, the environment, and the measure that matters.

Examples:

- Reduce the time between opening a page and using its main control.
- Keep a search interaction responsive while filtering a large collection.
- Lower the p95 latency of a server endpoint for a specified request rate.
- Stop memory use from increasing after repeatedly opening and closing a view.
- Reduce the amount of JavaScript downloaded and parsed on initial load.

**Latency** is the time an operation takes. **Throughput** is the amount of work completed per unit of time. **Responsiveness** describes whether an interactive system remains available to react to input. **Memory use** describes allocation and retention over time.

Use distributions for repeated requests. The mean can hide slow outliers. Percentiles such as p50 and p95 help describe typical and slower experiences. Compare measurements from equivalent workloads and environments.

## Establish a baseline

Before changing code:

1. Reproduce the problem with representative data and user actions.
2. Record the runtime, browser, device class, build mode, and relevant settings.
3. Measure the current behavior more than once.
4. Use a profiler to locate the work that consumes time or retains memory.
5. Write down the expected result of the optimization.

Development builds, debug logging, open DevTools, background tabs, CPU load, and warm caches can affect measurements. Do not compare a debug run on one device with a production run on another and attribute every difference to the code change.

A profiler helps explain where time is spent. A benchmark compares particular operations under controlled conditions. Neither one alone proves how the application behaves for every user.

## Measure elapsed time

For elapsed time in a browser, use the Performance API rather than the wall clock. The high-resolution performance clock is monotonic for timing purposes and is not affected by ordinary wall-clock adjustments.

~~~js
const startedAt = performance.now();
const result = performWork();
const elapsedMs = performance.now() - startedAt;

console.log("Work took", elapsedMs.toFixed(2), "ms");
~~~

For an asynchronous operation, place the end measurement after the awaited work:

~~~js
async function measureLoad(load) {
  const startedAt = performance.now();

  try {
    return await load();
  } finally {
    const elapsedMs = performance.now() - startedAt;
    console.log("Load completed in", elapsedMs.toFixed(2), "ms");
  }
}
~~~

If the promise rejects, the finally block still records elapsed time and the original rejection continues. Decide whether failed operations should be measured separately from successful ones.

**Date.now()** is a wall-clock timestamp intended for dates and time-of-day calculations. Its value can change if the system clock is adjusted. Use it when calendar time is needed, not as the default stopwatch.

## Add named application measurements

Use marks and measures when an operation has meaningful stages. Named measurements appear in performance tooling and can be observed programmatically.

~~~js
performance.mark("search-start");

const results = filterRecords(records, query);

performance.mark("search-finish");
performance.measure("search", "search-start", "search-finish");

const latestSearch = performance.getEntriesByName("search").at(-1);
console.log("Search took", latestSearch.duration.toFixed(2), "ms");

performance.clearMarks("search-start");
performance.clearMarks("search-finish");
performance.clearMeasures("search");
~~~

Clear entries when they are no longer needed, especially in code that runs repeatedly. An unbounded collection of measurements is itself unnecessary retained data.

Measure useful user actions such as opening a panel, submitting a form, or rendering a search result. Avoid adding timings to every tiny function without a question they answer. Instrumentation has a cost and can create noisy data.

## Profile browser work

Use the browser Performance panel to record a representative interaction. Inspect:

- Long tasks and the functions that occupy the main thread.
- Scripting, style calculation, layout, paint, and network time.
- Repeated work triggered by one interaction.
- Whether input handling blocks the next visual update.
- Whether a change shifts work elsewhere rather than removing it.

Use the Memory panel when the symptom involves memory growth. Heap snapshots show reachable JavaScript objects and related DOM nodes at a point in time. Compare snapshots taken before and after repeating the same action and its reverse. Inspect retaining paths to find what still references a suspicious object.

Allocation recordings can help locate code that repeatedly creates objects. A detached DOM node is not collectible while JavaScript still holds a reference to it. Clear the DevTools console and avoid leaving debug references around when comparing snapshots, because inspection tools can retain objects too.

A single heap snapshot is not proof of a leak. Some memory is intentionally cached, and garbage collection timing varies. Look for objects that remain reachable and accumulate after repeated equivalent cycles.

## Profile Node.js work

Use measurements that surround the code path in question. Node.js provides performance timing APIs through **node:perf_hooks**, and **process.memoryUsage()** reports process memory categories such as the JavaScript heap and external allocations.

~~~js
import { performance } from "node:perf_hooks";

performance.mark("parse-start");
const value = JSON.parse(largeText);
performance.mark("parse-end");
performance.measure("parse", "parse-start", "parse-end");

const measurement = performance.getEntriesByName("parse").at(-1);
console.log("Parse took", measurement.duration.toFixed(2), "ms");
console.log(process.memoryUsage());

performance.clearMarks("parse-start");
performance.clearMarks("parse-end");
performance.clearMeasures("parse");
~~~

Use CPU profiles to locate functions consuming CPU. Use heap snapshots or allocation profiles to inspect growth and retained objects. Compare after the process has performed the same workload and reached a comparable state.

Heap size, resident memory, external buffers, and operating system memory are related but not interchangeable measurements. A change in one number does not automatically identify a leak or prove that the application is healthy.

## Find memory leaks by reachability

JavaScript garbage collectors reclaim objects that are no longer reachable from roots such as globals, active stacks, and live closures. An object that is still reachable cannot be reclaimed just because the application no longer intends to use it.

Common accidental retainers include:

- A global array or cache that only grows.
- A closure that captures a large object longer than needed.
- Event listeners registered every time a view mounts but never removed.
- Intervals, timeouts, observers, or subscriptions that continue after a component closes.
- Detached DOM nodes kept by a variable, listener, or collection.
- Pending requests whose results keep large data alive.
- Debug objects retained in a console or profiler session.

Memory use can rise during normal work and later settle. That is different from a leak where repeated equivalent work leaves more unnecessary objects reachable each time. Reproduce the same sequence, compare snapshots, and inspect retaining paths instead of relying on one process-memory reading.

## Give resources an owner and a cleanup path

The code that starts ongoing work should define who stops it. Pair setup with cleanup when a component, request, job, or connection ends.

For event listeners, an **AbortController** can tie several listeners to one lifecycle:

~~~js
function mountSearch(input, onSearch) {
  const controller = new AbortController();

  input.addEventListener("input", onSearch, {
    signal: controller.signal
  });

  return function unmountSearch() {
    controller.abort();
  };
}
~~~

For other resource types, use the corresponding API:

- Clear timers with **clearTimeout** or **clearInterval**.
- Disconnect **MutationObserver**, **ResizeObserver**, or **IntersectionObserver** instances.
- Unsubscribe from event emitters, stores, and message channels.
- Abort requests that are no longer needed and ignore stale results.
- Remove references to detached DOM and large temporary data.
- Bound caches by size or age, and provide an invalidation policy.

A **WeakMap** can be useful when metadata should follow the lifetime of an object key. It does not make every cache safe and should not be used to hide unclear ownership. Do not rely on finalizers or garbage-collection timing to perform required cleanup.

## Reduce unnecessary work first

Look for repeated or avoidable work before rewriting a small function:

- Avoid recalculating the same derived value multiple times during one operation.
- Use an algorithm and data structure that fit the lookup or update pattern.
- Process only the records needed for the current view.
- Limit DOM nodes for very large collections with pagination or virtualization.
- Batch DOM reads and writes to avoid repeated forced layout.
- Debounce or throttle event work when the product behavior allows it.
- Move suitable CPU-heavy work off the main thread when the data transfer and worker overhead are justified.
- Stream or process large inputs incrementally when keeping the full data set in memory is unnecessary.

Memoization can help when repeated calls are expensive and inputs have reusable results. It can also retain large objects indefinitely, spend time computing cache keys, or return stale values. Define the cache's key, size bound, expiration or invalidation rule, and owner.

## Algorithmic cost matters

A nested scan over two collections can do work proportional to the product of their sizes. Replacing repeated searches with a **Map** or **Set** can reduce repeated lookup work when building the index is worthwhile.

~~~js
function findMatchingOrders(orders, requestedIds) {
  const requested = new Set(requestedIds);
  return orders.filter((order) => requested.has(order.id));
}
~~~

This example builds a lookup set once, then checks each order. For small data, the simpler algorithm may already be fast enough. Measure with realistic sizes before choosing a more complex representation.

Consider the cost of copying, sorting, parsing, rendering, and transferring data. Big-O notation describes how work grows as input size grows. It does not replace measurement of constants, memory use, or the actual workload.

## Optimize rendering and responsiveness

The browser main thread handles much more than JavaScript. A script that repeatedly changes the DOM and then reads layout information may cause repeated style and layout work.

Prefer a flow that groups reads and writes. For large lists, avoid creating a DOM node for every record when only a small visible window is needed. For long CPU tasks, split work into chunks or use a Worker if the communication cost is acceptable.

Debouncing can reduce work during rapidly repeated input, but it delays the response until input pauses. Throttling caps how often work runs during continuous input. Choose based on the interaction, not merely because a helper is available.

Use browser traces to confirm whether the bottleneck is scripting, layout, paint, network, or another resource. Optimizing JavaScript does not help an interaction dominated by a large image download or server latency.

## Benchmark carefully

A microbenchmark can be useful for a narrow comparison, but it can mislead when:

- It uses unrealistic input sizes or data shapes.
- The measured code is not the application's actual hot path.
- The benchmark includes setup for one implementation but not another.
- The runtime has not warmed up or the benchmark is too short.
- One run is treated as representative despite system noise.
- Results from different browsers, devices, or build modes are compared.
- The measurement itself dominates a very small operation.

Use repeated runs and comparable environments. Separate setup from the measured section when setup is not part of the real operation. Check that the result is still used so the benchmark measures meaningful work. Confirm application behavior after making a change.

## A measure, change, and compare workflow

1. Write down the user-visible or system-level performance goal.
2. Record a baseline for a representative workload.
3. Profile to identify the cost or retaining reference.
4. Make one focused change.
5. Repeat the same workload under comparable conditions.
6. Check median and tail behavior where repeated measurements matter.
7. Inspect memory after repeated open, close, create, and release cycles.
8. Keep the change only if the measured benefit is meaningful and behavior remains correct.

## Common mistakes

- Optimizing code before reproducing or measuring the problem.
- Using Date.now() as the default high-resolution stopwatch.
- Treating one benchmark run as proof of a general performance improvement.
- Focusing on CPU time when the bottleneck is network, layout, or rendering.
- Assuming increasing process memory automatically means a leak.
- Assuming garbage collection will happen immediately after references are dropped.
- Keeping event listeners, timers, observers, or subscriptions after their owner ends.
- Building an unbounded cache to avoid repeated computation.
- Using WeakMap as a general-purpose memory-leak fix.
- Retaining detached DOM nodes or large data in closures and global collections.
- Recording performance marks indefinitely in frequently used code.
- Replacing clear code with a complex optimization that has no measurable benefit.

## Key points

- Define the performance goal before choosing an optimization.
- Measure representative work and use profiles to locate the bottleneck.
- Use a monotonic performance clock for elapsed time.
- A memory leak is unnecessary reachable state that accumulates over repeated work.
- Pair listeners and other long-lived resources with explicit cleanup.
- Bound caches and UI work, and account for algorithmic growth.
- Compare before and after under similar conditions and preserve correctness.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [138 - Dependency hygiene, lockfiles, and software supply chain](138-dependency-hygiene-lockfiles-and-software-supply-chain.md) | [Open Q&A](../qnas/139-performance-analysis-memory-leaks-and-optimization.md) | [Open example](../examples/139-performance-analysis-memory-leaks-and-optimization.md) | [140 - Feature detection, compatibility, and graceful fallback](140-feature-detection-compatibility-and-graceful-fallback.md) |
