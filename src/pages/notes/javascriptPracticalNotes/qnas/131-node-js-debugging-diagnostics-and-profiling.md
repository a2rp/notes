# 131 - Node.js debugging, diagnostics, and profiling: Q&A

Review debugger use, diagnostic reports, process measurements, and profiling. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which command starts a Node.js program with the inspector?

- A. `node --inspect app.mjs`
- B. `node --profile-debug app.mjs`
- C. `node --trace-debugger app.mjs`
- D. `node --test-inspect app.mjs`

**Answer: A.**

**Explanation:** The `--inspect` option enables the Inspector Protocol so a debugger can attach to the process.

### 2. Which option pauses before application code starts?

- A. `--inspect-brk`
- B. `--inspect-stop-after-exit`
- C. `--wait-for-profile`
- D. `--break-on-report`

**Answer: A.**

**Explanation:** `--inspect-brk` starts the inspector and breaks before user code runs, allowing the debugger to attach first.

### 3. Why should the inspector stay on loopback or another protected connection?

- A. An inspector client can evaluate code in the process
- B. The inspector stores all source files permanently
- C. The inspector disables Node.js modules
- D. Remote access prevents logs from being written

**Answer: A.**

**Explanation:** Inspector access is powerful. Exposing it to an untrusted network can give an attacker control over the target process.

### 4. What is a useful first step when debugging a reported bug?

- A. Find the smallest repeatable input that shows it
- B. Rewrite the module before collecting evidence
- C. Add a breakpoint to every line
- D. Increase the production log volume without a plan

**Answer: A.**

**Explanation:** A reliable minimal reproduction makes it easier to inspect the failing path and verify a fix.

### 5. What does a call stack help you understand?

- A. Which calls led to the current execution point
- B. How much disk space is free
- C. The entire history of every process
- D. Which source files are unused

**Answer: A.**

**Explanation:** The call stack shows the active chain of function calls, which helps explain how execution reached a breakpoint or error.

### 6. Which statement about a diagnostic report is accurate?

- A. It captures process and runtime information useful for investigation
- B. It automatically proves the root cause of a bug
- C. It replaces application logs and metrics
- D. It contains only the last console message

**Answer: A.**

**Explanation:** A report preserves diagnostic context, but someone still needs to interpret it alongside the symptom and other evidence.

### 7. What does `process.memoryUsage().rss` represent?

- A. Resident memory used by the whole process
- B. Only JavaScript objects in the V8 heap
- C. The count of active requests
- D. The maximum size of one ArrayBuffer

**Answer: A.**

**Explanation:** RSS is process-wide resident memory. It is broader than the JavaScript heap measurements.

### 8. Which memory fields are measured in bytes?

- A. The fields returned by `process.memoryUsage()`
- B. Only `heapUsed`
- C. Only `rss`
- D. None, they are percentages

**Answer: A.**

**Explanation:** Convert the returned byte counts when displaying KiB or MiB, and label the converted unit clearly.

### 9. What is the best evidence that memory may be growing unexpectedly?

- A. Repeated measurements under comparable workloads show a sustained trend
- B. A single RSS value is larger than expected
- C. The program imports several modules
- D. One heap snapshot contains many objects

**Answer: A.**

**Explanation:** A trend across comparable runs or workload intervals is more informative than one reading. A profile or snapshot can then help investigate the cause.

### 10. Which command-line option collects a CPU profile?

- A. `node --cpu-prof app.mjs`
- B. `node --memory-log app.mjs`
- C. `node --event-loop app.mjs`
- D. `node --cpu-snapshot app.mjs`

**Answer: A.**

**Explanation:** `--cpu-prof` records a CPU profile for the process. The profile is written when the process exits.

### 11. What does a heap profile primarily help investigate?

- A. Allocation behavior over a workload
- B. HTTP response status codes
- C. Source formatting
- D. Git branch history

**Answer: A.**

**Explanation:** A heap profile helps identify where allocations occur. A heap snapshot instead describes objects retained at a particular point in time.

### 12. What is the purpose of `performance.measure()`?

- A. Record the duration between performance marks
- B. Allocate a new V8 heap
- C. Enable the inspector
- D. Write a diagnostic report

**Answer: A.**

**Explanation:** Place marks at meaningful boundaries and measure the interval between them to understand operation timing.

### 13. The event loop delay histogram reports nanoseconds. How do you convert a value to milliseconds?

- A. Divide by 1,000,000
- B. Multiply by 1,000,000
- C. Divide by 1,000
- D. Subtract 1,000,000

**Answer: A.**

**Explanation:** One millisecond is one million nanoseconds.

### 14. What does high event loop delay tell you?

- A. The event loop is responding late, but the measurement alone does not identify why
- B. A specific function is definitely blocking
- C. The CPU is definitely idle
- D. The process has no pending work

**Answer: A.**

**Explanation:** Synchronous work, garbage collection, contention, or other causes may contribute. Use additional evidence to find the cause.

### 15. Is event loop utilization the same as total CPU utilization?

- A. No, it compares event loop active and idle time
- B. Yes, both always report the same percentage
- C. Yes, but only in production
- D. No, it measures disk usage

**Answer: A.**

**Explanation:** Event loop utilization describes the loop's active versus idle time. Use system or process metrics for CPU utilization.

### 16. What does `diagnostics_channel` provide?

- A. Named channels for publishing diagnostic messages to subscribers
- B. A replacement for the JavaScript event loop
- C. A browser-only debugger
- D. A way to encrypt all log files

**Answer: A.**

**Explanation:** Application code can publish structured diagnostics on a named channel, and interested code can subscribe to that channel.

### 17. Why check `channel.hasSubscribers` before preparing an expensive diagnostic payload?

- A. To avoid unnecessary payload work when nobody is listening
- B. To keep the channel from receiving any future messages
- C. To pause all subscribers
- D. To convert the event into a heap snapshot

**Answer: A.**

**Explanation:** The check can avoid work when diagnostics are not being consumed. Keep the check and payload construction close to the publish path.

### 18. What makes a profiling comparison useful?

- A. The same representative workload and comparable conditions
- B. Different workloads on different machines
- C. A profile collected only after a code change
- D. A random sample of unrelated requests

**Answer: A.**

**Explanation:** A controlled baseline and follow-up make it more plausible that a code change caused the observed difference.

### 19. Why should reports, heap snapshots, and profiles be protected?

- A. They can contain application or runtime details that should not be public
- B. They always contain passwords in plaintext
- C. They cannot be deleted
- D. They prevent the program from restarting

**Answer: A.**

**Explanation:** Artifacts can reveal useful but sensitive context. Inspect and restrict access before sharing them.

### 20. What is the safest response to a profile showing a hot function?

- A. Form a hypothesis, change one thing, then repeat the same workload
- B. Rewrite every caller immediately
- C. Assume the function is incorrect
- D. Remove all logging and measurements

**Answer: A.**

**Explanation:** A profile points to a place to investigate. A controlled change and repeat measurement help check whether the proposed fix worked.

## Short-answer questions

### 21. Explain the difference between debugging, diagnostics, and profiling.

**Answer:** Debugging inspects execution to understand control flow and values. Diagnostics capture process or application context around an event. Profiling measures resource use, such as CPU samples or allocation activity.

**Explanation:** They answer related but different questions. Select the tool based on the evidence needed.

### 22. Why can a breakpoint be unhelpful for a timing-sensitive bug?

**Answer:** A breakpoint pauses execution and changes timing, which can hide or alter a race or timeout.

**Explanation:** For timing-sensitive behavior, compare with low-overhead logs, metrics, or tracing that does not stop the process.

### 23. When might RSS grow while heap usage stays relatively stable?

**Answer:** The process may be using native allocations, buffers, or allocator-managed memory outside the measured JavaScript heap.

**Explanation:** This is a clue for further investigation, not proof of one particular cause.

### 24. What should a useful request log include, and what should it exclude?

**Answer:** Include a stable event name, timestamp, request identifier, outcome, and relevant duration. Exclude credentials, tokens, cookies, and unnecessary private user data.

**Explanation:** Structured, privacy-conscious fields support filtering and correlation without recording secrets.

### 25. Why should performance marks and measures be cleared in repeated instrumentation?

**Answer:** Clearing them prevents old entries from accumulating and keeps later measurements easier to interpret.

**Explanation:** Use descriptive names, record the measurement you need, then clear related entries where repeated collection would otherwise retain them.

### 26. Why is event loop delay a symptom measurement rather than a diagnosis?

**Answer:** It shows that timer callbacks are being delayed, but several kinds of work or contention can cause that delay.

**Explanation:** Combine it with profiles, request timing, and system metrics to locate the source.

### 27. What makes a diagnostic channel message stable and useful?

**Answer:** Give it a module-specific channel name and a documented payload with consistent field names and types.

**Explanation:** Stable schemas make subscribers reliable. Keep payloads small and avoid sensitive values.

### 28. Why should a heap snapshot be captured carefully?

**Answer:** Creating one can consume substantial time and memory, and the snapshot may contain application data.

**Explanation:** Prefer a controlled environment, understand the impact, and protect the resulting file.

## Scenario questions

### 29. A bug report says an endpoint returns the wrong value for one input. What is a sensible investigation sequence?

**Answer:** Reproduce the input, attach a debugger, set a breakpoint near the relevant handler, inspect the call stack and local values, then correct the first value or branch that differs from the intended behavior.

**Explanation:** A minimal reproduction and targeted breakpoint narrow the investigation. Re-run the same input after the fix.

### 30. A service becomes slow, and event loop delay rises at the same time. Can you conclude which function is responsible?

**Answer:** No. Use a representative CPU profile and request-level timings to identify where time is spent.

**Explanation:** Event loop delay confirms responsiveness has worsened, but it does not identify the responsible function.

### 31. RSS increases after each batch, but heap usage returns to a similar level after garbage collection. What do you investigate next?

**Answer:** Compare repeated measurements, inspect external and ArrayBuffer memory, and review which buffers or native modules the workload uses. Use a JavaScript allocation profile when the evidence points to JavaScript allocations.

**Explanation:** A stable JavaScript heap with rising RSS suggests looking beyond retained JavaScript objects, while still treating the pattern as a clue rather than a conclusion.

### 32. You need to investigate a process that exits after an uncaught exception. What could you enable?

**Answer:** Use the Node.js diagnostic report option for uncaught exceptions, such as `node --report-uncaught-exception app.mjs`, after confirming support and configuration in the deployed Node.js version.

**Explanation:** A report can preserve process context at failure time. Protect the generated artifact because it may contain sensitive details.

### 33. A profile was collected before and after a change, but the second run handled fewer requests and used a different machine. Is the comparison reliable?

**Answer:** No. Repeat the measurement using the same representative workload and comparable conditions.

**Explanation:** Different environments and workloads can explain the result independently of the code change.

## Coding questions

### 34. Write a helper that returns process RSS and heap usage in MiB.

**Answer:**

~~~js
export function readMemoryMiB() {
  const { rss, heapUsed } = process.memoryUsage();

  return {
    rssMiB: Math.round(rss / 1024 / 1024),
    heapUsedMiB: Math.round(heapUsed / 1024 / 1024),
  };
}
~~~

**Explanation:** The process API returns bytes. Dividing by 1024 twice converts to MiB using binary units.

### 35. Measure an asynchronous operation with performance marks.

**Answer:**

~~~js
import { performance } from "node:perf_hooks";

export async function measureCatalogLoad(loadCatalog) {
  performance.mark("catalog-load:start");

  try {
    return await loadCatalog();
  } finally {
    performance.mark("catalog-load:end");

    const result = performance.measure(
      "catalog-load",
      "catalog-load:start",
      "catalog-load:end",
    );

    console.log({ durationMs: result.duration });

    performance.clearMarks("catalog-load:start");
    performance.clearMarks("catalog-load:end");
    performance.clearMeasures("catalog-load");
  }
}
~~~

**Explanation:** The `finally` block records elapsed time whether the operation resolves or rejects. Production instrumentation should also decide how to report failures and avoid collisions if calls can overlap. For concurrent operations, use unique mark names or a timing mechanism designed for per-operation measurements.

### 36. Publish a request diagnostic only when the channel has subscribers.

**Answer:**

~~~js
import diagnosticsChannel from "node:diagnostics_channel";

const requestChannel = diagnosticsChannel.channel("catalog-api.request");

export function publishRequest(event) {
  if (!requestChannel.hasSubscribers) return;

  requestChannel.publish({
    requestId: event.requestId,
    route: event.route,
    statusCode: event.statusCode,
    durationMs: event.durationMs,
  });
}
~~~

**Explanation:** The subscriber check can skip payload preparation when there is no consumer. Keep the schema stable and do not include secrets.

### 37. Which command starts an app with the inspector paused at startup, and what must you protect?

**Answer:**

~~~sh
node --inspect-brk app.mjs
~~~

Keep the inspector on loopback or behind a protected tunnel, and do not expose its port to an untrusted network.

**Explanation:** The process pauses early so a debugger can attach. Inspector access can execute code in the target process.

### 38. Which command collects a CPU profile for an application?

**Answer:**

~~~sh
node --cpu-prof app.mjs
~~~

**Explanation:** The process writes a CPU profile when it exits. Capture it while running a workload representative of the issue.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [130 - Node.js test runner and service tests](../lessons/130-node-js-test-runner-and-service-tests.md) | [Lesson 131](../lessons/131-node-js-debugging-diagnostics-and-profiling.md) | [Open example](../examples/131-node-js-debugging-diagnostics-and-profiling.md) | [132 - Data structures in JavaScript](../lessons/132-data-structures-in-javascript.md) |
