# 131 - Node.js debugging, diagnostics, and profiling

Debugging helps you find why a particular execution behaves incorrectly. Diagnostics help you capture what a process was doing when it failed or slowed down. Profiling measures where the program spends time or memory so you can choose a useful optimization.

These techniques answer different questions. A stack trace describes one failure path, a diagnostic report records process state, metrics show how behavior changes over time, and a profile samples resource use. Start with the question you need to answer, collect the smallest useful evidence, and change one thing at a time.

## Learning goals

By the end of this chapter, you can:

- attach a debugger to a Node.js process and inspect a request step by step;
- use logs and diagnostic reports to preserve useful failure context;
- distinguish process memory measurements and event loop delay from a root-cause diagnosis;
- collect CPU and heap profiles for a representative workload;
- add low-overhead timing and diagnostic events to application code;
- protect diagnostic artifacts and the Node.js inspector.

## Choose the right tool

| Question | Useful evidence |
| --- | --- |
| Which value or branch caused this bug? | Breakpoints, stack, local variables |
| What failed in production? | Error context, logs, diagnostic report |
| Is memory growing over time? | Repeated memory measurements and a heap profile |
| Which code consumes CPU? | CPU profile under representative load |
| Is the event loop responding slowly? | Event loop delay measurements and request timings |
| Which part of a request is slow? | Marks, measures, and structured request logs |

A measurement points toward an investigation. It does not automatically identify the cause. For example, high event loop delay can result from synchronous work, garbage collection, CPU contention, or other load. Examine more evidence before changing code.

## Debug a reproducible problem

First make the smallest reliable reproduction. Record the input, expected result, actual result, and runtime version. Then inspect the path that handles that input.

Start a program with the inspector:

~~~sh
node --inspect app.mjs
~~~

The inspector listens on loopback by default, usually at port 9229. Open the runtime's inspector target in browser developer tools, or attach an IDE debugger. You can also select a local port explicitly:

~~~sh
node --inspect=127.0.0.1:9229 app.mjs
~~~

To pause before the first line of application code, use:

~~~sh
node --inspect-brk app.mjs
~~~

In the debugger:

1. Set a breakpoint near the behavior you want to understand.
2. Reproduce the input.
3. Inspect the call stack to learn how execution reached the breakpoint.
4. Check local variables and arguments.
5. Step over a line, step into a function, or continue to the next breakpoint.
6. Confirm the value that first differs from your expectation.

A breakpoint can change timing. For race conditions or timing-sensitive bugs, compare with logs or non-pausing diagnostics as well.

### Keep the inspector private

The inspector can evaluate code in the target process. Do not bind it to a public interface or expose port 9229 to an untrusted network. Keep it on loopback, use a protected tunnel when remote access is necessary, and close the tunnel when finished. Treat inspector access as access to the application itself.

## Log useful context

Logs should describe an event in a form that is easy to filter and correlate. Include a timestamp, event name, request or job identifier, outcome, and relevant duration. Avoid logging passwords, tokens, session cookies, private user data, or full request bodies.

~~~js
function logRequest({ requestId, method, path, statusCode, durationMs }) {
  console.log(JSON.stringify({
    event: "request.completed",
    requestId,
    method,
    path,
    statusCode,
    durationMs,
  }));
}
~~~

Use stable event names and field types. A request identifier helps connect a failure across logs, but it should not contain a secret. For errors, include the error name, message, and stack in a controlled logging destination. Decide how much detail is appropriate for the environment and who can read the logs.

Logs are not a substitute for a debugger. They show the facts you chose to record, so add context at meaningful boundaries rather than printing every variable.

## Capture a diagnostic report

A diagnostic report records information about the Node.js process and runtime. It can help investigate an unexpected failure or a process that is difficult to inspect interactively.

Create a report from application code:

~~~js
const reportPath = process.report.writeReport();
console.log("Diagnostic report written:", reportPath);
~~~

For investigation, Node.js also provides command-line options such as:

~~~sh
node --report-uncaught-exception app.mjs
~~~

Other report options can generate reports for fatal errors or signals. Check the installed Node.js version and its command-line help before relying on a particular flag in deployment.

A report is an artifact to protect. Review its contents and access controls before sharing it. Runtime and system details can help diagnose a problem, and may also reveal information that should not be public.

## Inspect memory carefully

`process.memoryUsage()` returns byte counts for several parts of a process. The main fields include:

- `rss`: resident memory used by the whole process;
- `heapTotal` and `heapUsed`: V8 heap capacity and the portion currently in use;
- `external`: memory associated with native objects bound to JavaScript objects;
- `arrayBuffers`: memory used by ArrayBuffer and related objects, included in external memory.

Record measurements over time under a known workload instead of drawing conclusions from one reading:

~~~js
function readMemoryUsage() {
  const usage = process.memoryUsage();

  return {
    rssMiB: Math.round(usage.rss / 1024 / 1024),
    heapUsedMiB: Math.round(usage.heapUsed / 1024 / 1024),
    externalMiB: Math.round(usage.external / 1024 / 1024),
    arrayBuffersMiB: Math.round(usage.arrayBuffers / 1024 / 1024),
  };
}

console.log(readMemoryUsage());
~~~

A rising `heapUsed` after repeated comparable workloads may justify investigating retained JavaScript objects. A rising `rss` with a relatively stable heap can point to native allocations, buffers, or allocator behavior. These are clues, not proof. Heap snapshots and profiles can take substantial time and memory, and may contain application data. Capture them in a controlled environment and handle them as sensitive files.

## Measure work and event loop delay

Use `node:perf_hooks` to mark a point in time and measure the interval between two marks:

~~~js
import { performance } from "node:perf_hooks";

performance.mark("catalog:load:start");
const items = await loadCatalog();
performance.mark("catalog:load:end");

const measurement = performance.measure(
  "catalog:load",
  "catalog:load:start",
  "catalog:load:end",
);

console.log({
  operation: measurement.name,
  durationMs: measurement.duration,
});

performance.clearMarks("catalog:load:start");
performance.clearMarks("catalog:load:end");
performance.clearMeasures("catalog:load");
~~~

Use descriptive mark names and clear them when repeated measurements would otherwise accumulate. Measure a representative workload, and compare results using the same environment.

The event loop delay monitor can show whether timers are being delayed:

~~~js
import { monitorEventLoopDelay } from "node:perf_hooks";

const delay = monitorEventLoopDelay({ resolution: 20 });
delay.enable();

const reportTimer = setInterval(() => {
  console.log({
    eventLoopDelayP99Ms: Number(delay.percentile(99)) / 1_000_000,
    eventLoopDelayMaxMs: Number(delay.max) / 1_000_000,
  });

  delay.reset();
}, 10_000);

function stopDiagnostics() {
  clearInterval(reportTimer);
  delay.disable();
}
~~~

The histogram values are in nanoseconds, so divide by one million to display milliseconds. Choose a sampling interval that suits the service and avoid emitting an excessive volume of metrics. Event loop delay describes responsiveness, not the exact code responsible.

Event loop utilization is another runtime measurement. It compares time the event loop was active with time it was idle over an interval. It is not a measurement of total CPU utilization. Use system and process metrics when you need CPU utilization.

## Publish application diagnostics

Node.js `diagnostics_channel` provides named channels for publishing diagnostic messages to interested subscribers. Use a module-specific channel name and a stable message shape.

~~~js
import diagnosticsChannel from "node:diagnostics_channel";

const requestChannel = diagnosticsChannel.channel("catalog-api.request");

export function publishRequestDiagnostic(event) {
  if (requestChannel.hasSubscribers) {
    requestChannel.publish({
      requestId: event.requestId,
      route: event.route,
      statusCode: event.statusCode,
      durationMs: event.durationMs,
    });
  }
}
~~~

A subscriber can listen to the same channel:

~~~js
import diagnosticsChannel from "node:diagnostics_channel";

const requestChannel = diagnosticsChannel.channel("catalog-api.request");

requestChannel.subscribe((event) => {
  console.log(JSON.stringify({
    event: "request.diagnostic",
    ...event,
  }));
});
~~~

Keep diagnostic payloads small and avoid secrets or personal data. Document the event schema so subscribers can use it reliably. A diagnostic subscriber runs as part of the publishing process, so subscriber work should be short and predictable.

## Find CPU and allocation hotspots

Do not optimize a function just because it looks complicated. First collect a profile while the application performs a representative workload.

A CPU profile can be collected by starting the application with:

~~~sh
node --cpu-prof app.mjs
~~~

The profile is written when the process exits. Use the profile viewer in your browser's developer tools or IDE to inspect sampled stacks and identify functions that occupy a meaningful share of CPU time. Compare profiles from the same workload before and after a change.

A heap profile can be collected with:

~~~sh
node --heap-prof app.mjs
~~~

Heap profiles help investigate allocation behavior. They are different from heap snapshots: a profile summarizes sampled allocation activity, while a snapshot describes objects retained in the heap at a point in time. Both can add overhead and expose data. Store diagnostic files securely and remove them when no longer needed.

Useful profiling steps:

1. Reproduce the workload and warm up the application consistently.
2. Record a baseline profile.
3. Identify a hotspot or allocation pattern supported by the profile.
4. Change one thing.
5. Repeat the same workload and collect another profile.
6. Check that the result improved without changing correctness.

## A practical investigation workflow

1. **Describe the symptom.** Include when it started, which operation is affected, and how often it occurs.
2. **Reproduce it.** Use the smallest input or workload that still shows the behavior.
3. **Collect a baseline.** Record the Node.js version, relevant configuration, timings, memory, and error details.
4. **Choose evidence for the question.** Use breakpoints for control flow, reports for process state, and profiles for resource hotspots.
5. **Form one hypothesis.** Make a prediction that can be checked.
6. **Change one cause at a time.** Avoid mixing unrelated refactors with a diagnostic fix.
7. **Repeat the same workload.** Compare the result with the baseline.
8. **Remove temporary instrumentation.** Keep only useful, documented production diagnostics.

## Common mistakes

- Exposing the inspector to the public internet or an untrusted network.
- Treating one memory reading as evidence of a leak.
- Assuming high event loop delay identifies the exact blocking function.
- Calling event loop utilization CPU utilization.
- Profiling an unrealistic workload and optimizing the wrong path.
- Comparing profiles captured under different conditions.
- Capturing reports or heap artifacts and sharing them without checking for sensitive data.
- Adding high-volume logging that changes the workload or hides important events.
- Leaving timing marks or intervals active in a repeated measurement path.
- Assuming debugging and profiling are interchangeable.

## Key points

- Debuggers inspect execution, reports preserve process context, and profiles reveal resource hotspots.
- Start with a reproducible symptom and a specific question.
- Keep the inspector bound to loopback and protect access to diagnostic artifacts.
- Interpret memory, event loop delay, and event loop utilization as measurements with limited scope.
- Profile a representative workload before and after an optimization.
- Prefer small, structured, low-overhead diagnostics that avoid sensitive data.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [130 - Node.js test runner and service tests](130-node-js-test-runner-and-service-tests.md) | [Open Q&A](../qnas/131-node-js-debugging-diagnostics-and-profiling.md) | [Open example](../examples/131-node-js-debugging-diagnostics-and-profiling.md) | [132 - Data structures in JavaScript](132-data-structures-in-javascript.md) |
