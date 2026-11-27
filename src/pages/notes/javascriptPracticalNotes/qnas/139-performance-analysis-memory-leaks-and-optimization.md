# Performance analysis, memory leaks, and optimization - Q&A

These questions review [Chapter 139](../lessons/139-performance-analysis-memory-leaks-and-optimization.md). Every question is followed by its answer and explanation.

## Multiple-choice questions

### 1. What should usually happen before optimizing a slow operation?

A. Rewrite it in a shorter style  
B. Reproduce and measure the relevant workload  
C. Add a global cache  
D. Increase the memory limit

**Answer:** B. Reproduce and measure the relevant workload.

**Explanation:** Measurements and profiles help find the actual bottleneck. A rewrite without evidence can add complexity without improving the user experience.

### 2. What does latency describe?

A. The amount of work completed per second  
B. The time an operation takes  
C. The amount of source code in a bundle  
D. The number of dependencies

**Answer:** B. The time an operation takes.

**Explanation:** Throughput describes how much work is completed per unit of time. They are related measures, but they answer different questions.

### 3. Which browser clock is generally appropriate for measuring elapsed time?

A. performance.now()  
B. A locale-formatted date string  
C. Date.now() for every microbenchmark  
D. A random number

**Answer:** A. performance.now().

**Explanation:** It provides a high-resolution monotonic timing source suitable for elapsed time. Date.now() represents wall-clock time and can be adjusted.

### 4. What is a useful reason to add named performance marks?

A. They make every function faster  
B. They identify meaningful application stages in performance tooling  
C. They force garbage collection  
D. They prevent layout work

**Answer:** B. They identify meaningful application stages in performance tooling.

**Explanation:** Named marks and measures let developers record and inspect particular application operations. Clear repeated entries when they are no longer needed.

### 5. What does a CPU profile help answer?

A. Which code paths consume CPU time  
B. Whether every package is licensed correctly  
C. Whether the server has enough disk space  
D. How much network data a user pays for

**Answer:** A. Which code paths consume CPU time.

**Explanation:** A profile helps locate CPU hotspots. It does not by itself explain memory retention, network delays, or all user-perceived performance.

### 6. What makes an object eligible for garbage collection?

A. It is old  
B. It is no longer reachable from live roots and references  
C. It was created in a loop  
D. It has a large shallow size

**Answer:** B. It is no longer reachable from live roots and references.

**Explanation:** Garbage collection reclaims unreachable objects. An object that remains referenced by a listener, global, closure, or cache can stay alive even if it is no longer useful.

### 7. What is a detached DOM node?

A. A node removed from the document but still referenced by code  
B. A node with no attributes  
C. A node downloaded from a remote server  
D. A node that is guaranteed to be collected immediately

**Answer:** A. A node removed from the document but still referenced by code.

**Explanation:** A retained JavaScript reference can keep the removed node and its subtree reachable.

### 8. What should often accompany registering a view-specific event listener?

A. A cleanup path that removes or aborts the listener when the view ends  
B. A permanent global reference to the view  
C. A second copy of the same listener  
D. An unbounded cache

**Answer:** A. A cleanup path that removes or aborts the listener when the view ends.

**Explanation:** Pairing resource setup with teardown prevents listeners from accumulating across repeated mount and unmount cycles.

### 9. Why can a Set improve a repeated membership check?

A. It can avoid rescanning a list for every candidate  
B. It removes the need for all measurements  
C. It automatically compresses objects  
D. It prevents every memory leak

**Answer:** A. It can avoid rescanning a list for every candidate.

**Explanation:** Building an index can reduce repeated lookup work when the workload justifies the extra setup and memory.

### 10. Which statement about WeakMap is accurate?

A. It is a universal fix for memory leaks  
B. It can associate metadata with object keys without keeping those keys alive solely through the map  
C. It automatically clears timers  
D. It forces garbage collection

**Answer:** B. It can associate metadata with object keys without keeping those keys alive solely through the map.

**Explanation:** WeakMap can fit a specific object-keyed metadata pattern. It does not resolve unclear ownership, unbounded arrays, active listeners, or every cache design.

## Short-answer questions

### 11. How is a memory leak different from a temporary increase in memory use?

**Answer:** A temporary increase may be normal allocation that later becomes collectible. A leak is unnecessary state that remains reachable and accumulates through repeated work.

**Explanation:** Repeat the same operation and its reverse, then compare retained objects and their references rather than judging one memory reading.

### 12. Why can p95 latency be more informative than average latency?

**Answer:** The average can hide slower experiences among a portion of requests. p95 describes the value below which 95 percent of measured observations fall.

**Explanation:** Tail latency can reveal outliers that affect real users even when the mean looks acceptable.

### 13. Why should a benchmark use representative data?

**Answer:** Input sizes and shapes affect algorithms, allocations, and engine behavior, so unrealistic data may exercise a different code path.

**Explanation:** A microbenchmark only informs decisions about the work it actually measures.

### 14. What is a retaining path?

**Answer:** It is a chain of live references that connects a root to an object that is still in memory.

**Explanation:** Inspecting the path can show which global, closure, listener, or other object keeps the suspected leak alive.

### 15. What is one limitation of process.memoryUsage()?

**Answer:** It reports multiple memory categories, but a single reading does not identify which objects cause growth or prove a leak.

**Explanation:** Use the metric to observe process behavior, then use profiles and heap snapshots to locate allocations and references.

### 16. When can a Worker help performance?

**Answer:** When suitable CPU-heavy work can move off the main thread and its message and data-transfer costs are worthwhile.

**Explanation:** Workers can improve responsiveness, but startup, copying, and coordination can outweigh the benefit for small tasks.

### 17. What policy should a cache define?

**Answer:** Its key, maximum size or expiration, invalidation behavior, and owner or lifetime.

**Explanation:** Without limits and invalidation, caching can retain stale or large objects indefinitely.

### 18. What does Big-O notation help describe?

**Answer:** How an algorithm's work or space grows as input size grows.

**Explanation:** It supports reasoning about scale, but does not measure constants, runtime overhead, or the application's actual user workload.

### 19. What is layout thrashing?

**Answer:** Repeated interleaving of DOM writes and layout-dependent reads that can force repeated style or layout work.

**Explanation:** Grouping reads and writes can reduce unnecessary browser work. A performance trace can confirm whether layout is actually the bottleneck.

### 20. What do debouncing and throttling change?

**Answer:** Debouncing waits until repeated input pauses before running work. Throttling limits how often work runs over time.

**Explanation:** Both can reduce repeated work, but they change interaction timing. Choose according to the product behavior.

## Code-reading questions

### 21. What does this measurement calculate?

~~~js
const start = performance.now();
doWork();
const duration = performance.now() - start;
~~~

**Answer:** It calculates the elapsed time around the synchronous call to doWork.

**Explanation:** If doWork starts asynchronous work and returns before it finishes, this does not include the later completion time.

### 22. What is the risk in this mounting function?

~~~js
function mount(button, onClick) {
  button.addEventListener("click", onClick);
}
~~~

**Answer:** It provides no way to remove this listener when the mounted view ends.

**Explanation:** Repeated mounts can leave active listeners that retain view state or run duplicate work. Return a teardown function or use an AbortSignal tied to the view lifetime.

### 23. What does this cleanup do?

~~~js
const controller = new AbortController();
input.addEventListener("input", handleInput, {
  signal: controller.signal
});
controller.abort();
~~~

**Answer:** Aborting the controller removes the registered listener that used its signal.

**Explanation:** This pattern can tie a group of listeners to a component lifecycle. It does not automatically cancel unrelated timers or subscriptions.

### 24. Why can this cache keep memory growing?

~~~js
const cache = new Map();

function remember(key, value) {
  cache.set(key, value);
}
~~~

**Answer:** Nothing limits the number or size of values retained by the Map.

**Explanation:** Add a size or expiration policy, invalidate entries, or avoid caching if profiling shows it is unnecessary.

### 25. What is the likely performance cost of this pattern?

~~~js
for (const order of orders) {
  if (requestedIds.includes(order.id)) {
    result.push(order);
  }
}
~~~

**Answer:** Each order may scan requestedIds, producing repeated lookup work as both collections grow.

**Explanation:** If the data is large enough, build a Set once and check membership. Measure the real workload to confirm the change is worthwhile.

### 26. What is improved in this version?

~~~js
const requested = new Set(requestedIds);
const result = orders.filter((order) => requested.has(order.id));
~~~

**Answer:** It builds a lookup set once and uses it for membership checks.

**Explanation:** This can reduce repeated scanning, at the cost of building and storing the Set. For tiny collections the difference may not matter.

### 27. What resource is not released here?

~~~js
function startPolling() {
  setInterval(refresh, 1000);
}
~~~

**Answer:** The interval continues until clearInterval is called.

**Explanation:** Store the interval identifier and clear it when the owning component or process no longer needs polling.

### 28. Why can the detached list remain in memory?

~~~js
let savedList;

function removeList(list) {
  savedList = list;
  list.remove();
}
~~~

**Answer:** The global savedList still references the removed node.

**Explanation:** Removing a node from the document does not remove other JavaScript references. Clear references that are no longer needed.

### 29. Why should this repeated measurement clear old entries?

~~~js
performance.mark("render-start");
render();
performance.mark("render-end");
performance.measure("render", "render-start", "render-end");
~~~

**Answer:** Repeated calls can retain an increasing number of performance entries.

**Explanation:** Read the needed result and clear the marks and measure when they are no longer useful.

### 30. What does finally guarantee in this function?

~~~js
async function refresh(view) {
  view.setBusy(true);
  try {
    return await loadData();
  } finally {
    view.setBusy(false);
  }
}
~~~

**Answer:** The busy state is reset whether loadData succeeds or rejects.

**Explanation:** The rejection still propagates because finally is cleanup, not error recovery.

## Practical and applied questions

### 31. A page's memory rises while users open a view, but it falls after the view is closed and collection runs. Is that alone proof of a leak?

**Answer:** No.

**Explanation:** Temporary allocations are normal. Repeat the same open and close cycle and inspect whether unnecessary objects remain reachable and accumulate.

### 32. A view becomes slower after it has been opened and closed many times. What should you inspect first?

**Answer:** Reproduce the cycle and profile CPU and memory. Check for listeners, timers, observers, subscriptions, detached DOM, and growing caches.

**Explanation:** Repeated lifecycle work can accumulate retained state or duplicate handlers. A trace and heap comparison help distinguish those causes.

### 33. A developer measures a function with Date.now() and gets zero milliseconds. What should they change?

**Answer:** Use performance.now() for elapsed time, run representative work repeatedly, and ensure the measurement interval is large enough to interpret.

**Explanation:** Wall-clock timing is not the preferred stopwatch, and a tiny single operation can be shorter than the useful resolution of a coarse measurement.

### 34. An interaction is slow, but the JavaScript CPU profile shows little scripting time. What should be examined next?

**Answer:** Inspect layout, paint, network, and rendering stages in a browser performance trace.

**Explanation:** An interaction can be dominated by work other than JavaScript execution. Optimizing code that is not the bottleneck will not fix it.

### 35. A list has hundreds of thousands of records, but only twenty rows fit on screen. What is one strategy to reduce rendering and memory work?

**Answer:** Render only the visible window with pagination or virtualization, while keeping data loading and navigation behavior correct.

**Explanation:** Creating a DOM node for every record is unnecessary when most are not visible. A virtualized view reduces active DOM size.

### 36. A measurement improves on a developer laptop but not in production. What could explain the difference?

**Answer:** The devices, runtime, build mode, workload, network, caches, and background load may differ.

**Explanation:** Compare representative conditions and verify the production path. One machine's microbenchmark does not predict every environment.

### 37. A dashboard has high mean response time but normal p50 and p95 values after investigation. What should the team inspect?

**Answer:** Inspect the extreme outliers and how observations are grouped or collected, including rare slow requests or measurement artifacts.

**Explanation:** The mean is sensitive to extremes. A distribution provides more context than one average.

### 38. A cache makes one endpoint faster but grows continuously over several hours. What should the team do?

**Answer:** Measure cache hit behavior and retained size, then add a bound, expiration, invalidation policy, or remove the cache if it is not beneficial.

**Explanation:** A speedup must be weighed against memory retention and stale data. An unbounded cache can turn a local optimization into a reliability issue.

### 39. A Node.js process's external memory rises while its JavaScript heap appears stable. What is a sensible next step?

**Answer:** Inspect buffers, native resources, and allocation profiles relevant to external memory rather than assuming ordinary JavaScript objects are responsible.

**Explanation:** Process memory categories represent different kinds of allocation. Correlate the metric with a representative workload and a suitable profiler.

### 40. What evidence should support keeping an optimization?

**Answer:** A repeatable improvement in the target metric under representative conditions, with behavior still correct and no unacceptable memory, complexity, or maintenance cost.

**Explanation:** Keep a change because it improves the stated goal, not because the code looks clever or one benchmark number changed.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [138 - Dependency hygiene, lockfiles, and software supply chain](138-dependency-hygiene-lockfiles-and-software-supply-chain.md) | [Lesson](../lessons/139-performance-analysis-memory-leaks-and-optimization.md) · [Q&A](139-performance-analysis-memory-leaks-and-optimization.md) · [Example](../examples/139-performance-analysis-memory-leaks-and-optimization.md) | [140 - Feature detection, compatibility, and graceful fallback](140-feature-detection-compatibility-and-graceful-fallback.md) |
