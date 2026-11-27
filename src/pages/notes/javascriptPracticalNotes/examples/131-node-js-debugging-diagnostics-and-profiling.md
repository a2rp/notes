# 131 - Node.js debugging, diagnostics, and profiling: Example

This local-only demo exposes a health route, a bounded CPU workload, and a memory summary. It records request timing, can publish structured request diagnostics, and samples event loop delay. Use the commands to attach a debugger and collect CPU or heap profiles.

The workload is intentionally small and artificial. It helps you practice the workflow, but it does not represent a real service benchmark.

## Create these files

Create a folder named `node-diagnostics-demo` with these files:

~~~text
node-diagnostics-demo/
  app.mjs
  diagnostics.mjs
~~~

### `node-diagnostics-demo/diagnostics.mjs`

~~~js
import diagnosticsChannel from "node:diagnostics_channel";

const requestChannel = diagnosticsChannel.channel("node-diagnostics-demo.request");

if (process.env.LOG_DIAGNOSTIC_EVENTS === "1") {
  requestChannel.subscribe((event) => {
    console.log(JSON.stringify({
      event: "request.diagnostic",
      ...event,
    }));
  });
}

export function publishRequestDiagnostic(event) {
  if (!requestChannel.hasSubscribers) return;

  requestChannel.publish(event);
}
~~~

**Explanation:** The channel has a module-specific name and a small, stable event shape. The subscriber is opt-in, so the application can skip payload work when no diagnostics consumer is enabled.

### `node-diagnostics-demo/app.mjs`

~~~js
import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { monitorEventLoopDelay, performance } from "node:perf_hooks";
import { publishRequestDiagnostic } from "./diagnostics.mjs";

const host = "127.0.0.1";
const port = Number(process.env.PORT ?? 3000);
const maxIterations = 1_000_000;

const eventLoopDelay = monitorEventLoopDelay({ resolution: 20 });
eventLoopDelay.enable();

const metricsTimer = setInterval(() => {
  console.log(JSON.stringify({
    event: "runtime.event_loop_delay",
    p99Ms: Number(eventLoopDelay.percentile(99)) / 1_000_000,
    maxMs: Number(eventLoopDelay.max) / 1_000_000,
  }));

  eventLoopDelay.reset();
}, 10_000);

metricsTimer.unref();

function sendJson(response, statusCode, data, headers = {}) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...headers,
  });
  response.end(JSON.stringify(data));
}

function memorySummary() {
  const usage = process.memoryUsage();

  return {
    rssMiB: Math.round(usage.rss / 1024 / 1024),
    heapUsedMiB: Math.round(usage.heapUsed / 1024 / 1024),
    externalMiB: Math.round(usage.external / 1024 / 1024),
    arrayBuffersMiB: Math.round(usage.arrayBuffers / 1024 / 1024),
  };
}

function runCpuWork(iterations) {
  let checksum = 0;

  for (let index = 1; index <= iterations; index += 1) {
    checksum += Math.sqrt(index);
  }

  return checksum;
}

const server = createServer((request, response) => {
  const requestId = randomUUID();
  const startedAt = performance.now();
  let statusCode = 500;
  let route = "/";

  try {
    const url = new URL(request.url ?? "/", "http://" + host);
    route = url.pathname;

    if (request.method !== "GET") {
      request.resume();
      statusCode = 405;
      sendJson(response, statusCode, { error: "Only GET requests are supported" }, {
        allow: "GET",
      });
      return;
    }

    if (request.method === "GET" && route === "/health") {
      statusCode = 200;
      sendJson(response, statusCode, { status: "ok" });
      return;
    }

    if (request.method === "GET" && route === "/memory") {
      statusCode = 200;
      sendJson(response, statusCode, memorySummary());
      return;
    }

    if (request.method === "GET" && route === "/work") {
      const suppliedIterations = url.searchParams.get("iterations");
      const iterations = suppliedIterations === null
        ? 250_000
        : Number(suppliedIterations);

      if (
        !Number.isSafeInteger(iterations)
        || iterations < 1
        || iterations > maxIterations
      ) {
        statusCode = 400;
        sendJson(response, statusCode, {
          error: "iterations must be an integer from 1 to 1000000",
        });
        return;
      }

      const checksum = runCpuWork(iterations);
      statusCode = 200;
      sendJson(response, statusCode, {
        iterations,
        checksum: Number(checksum.toFixed(2)),
      });
      return;
    }

    statusCode = 404;
    sendJson(response, statusCode, { error: "Route not found" });
  } catch (error) {
    statusCode = 500;
    sendJson(response, statusCode, { error: "Internal server error" });
    console.error(JSON.stringify({
      event: "request.failed",
      requestId,
      errorName: error instanceof Error ? error.name : "UnknownError",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    }));
  } finally {
    publishRequestDiagnostic({
      requestId,
      method: request.method ?? "UNKNOWN",
      route,
      statusCode,
      durationMs: Number((performance.now() - startedAt).toFixed(2)),
    });
  }
});

server.listen(port, host, () => {
  console.log(JSON.stringify({
    event: "server.started",
    address: "http://" + host + ":" + port,
  }));
});

function stopServer() {
  clearInterval(metricsTimer);
  eventLoopDelay.disable();

  server.close(() => {
    console.log(JSON.stringify({ event: "server.closed" }));
  });
}

process.once("SIGINT", stopServer);
process.once("SIGTERM", stopServer);
~~~

**Explanation:** The server binds only to loopback. The `/work` route caps its synchronous workload, making it useful for practicing debugger breakpoints and CPU profiling without accepting an unbounded request value. Request logs include a generated identifier, route, status, and elapsed time, but not the query string.

The `/memory` response reports selected memory values in MiB. The event loop monitor emits a periodic sample, converting nanoseconds to milliseconds. These values indicate behavior; they do not identify a root cause on their own.

## Start and inspect the service

From the demo folder, start the server:

~~~sh
node app.mjs
~~~

Expected startup message shape:

~~~text
{"event":"server.started","address":"http://127.0.0.1:3000"}
~~~

In a second terminal, try the routes:

~~~sh
curl http://127.0.0.1:3000/health
curl http://127.0.0.1:3000/memory
curl "http://127.0.0.1:3000/work?iterations=500000"
~~~

The health route returns:

~~~json
{"status":"ok"}
~~~

The memory values and checksum depend on the current process and runtime. The work route returns the requested iteration count and a numeric checksum.

Enable the optional diagnostic subscriber by starting the service with the environment variable set:

~~~sh
LOG_DIAGNOSTIC_EVENTS=1 node app.mjs
~~~

On PowerShell, set the variable for the current terminal before starting Node.js:

~~~powershell
$env:LOG_DIAGNOSTIC_EVENTS = "1"
node app.mjs
~~~

A request then produces a JSON event similar to:

~~~text
{"event":"request.diagnostic","requestId":"generated-id","method":"GET","route":"/work","statusCode":200,"durationMs":12.34}
~~~

The identifier and duration are examples. They vary on each request.

## Practice debugging

Start paused before application code:

~~~sh
node --inspect-brk app.mjs
~~~

Attach a local browser or IDE debugger to the inspector. Set a breakpoint inside `runCpuWork` or the `/work` route, then request the route from another terminal. Inspect `iterations` and `checksum`, and step through the loop.

The inspector can execute code in the application. Keep it on loopback and do not expose its port to an untrusted network.

## Collect a CPU profile

Start the service with CPU profiling enabled:

~~~sh
node --cpu-prof app.mjs
~~~

Send a repeatable workload from another terminal:

~~~sh
curl "http://127.0.0.1:3000/work?iterations=1000000"
~~~

Stop the service with Ctrl+C. Node.js writes a CPU profile when the process exits. Open the profile in a developer tools or IDE profile viewer and inspect the sampled stacks. The loop may appear because it performs synchronous work. Capture a baseline and a second profile under the same workload before comparing an optimization.

## Collect a heap profile

Start the app with heap profiling enabled:

~~~sh
node --heap-prof app.mjs
~~~

Send several requests to the memory route and the work route, then stop the process with Ctrl+C. The heap profile summarizes sampled allocation activity. It is not the same as a heap snapshot of objects retained at one instant.

Profiles and reports can reveal runtime details or application data. Keep generated artifacts private and remove them when no longer needed.

## Generate a diagnostic report

For a local investigation, the process report API can write a report on demand:

~~~js
const reportFile = process.report.writeReport();
console.log("Report written:", reportFile);
~~~

You can also start a separate run with an uncaught-exception report enabled:

~~~sh
node --report-uncaught-exception app.mjs
~~~

Check command-line support in the Node.js version you deploy. Treat the resulting report as sensitive diagnostic data.

## Try these changes

- Set a breakpoint before the checksum is returned and inspect the loop state.
- Request `/work` with a value above the configured limit and inspect the 400 response.
- Compare the memory endpoint before and after several requests. Do not infer a leak from one measurement.
- Enable diagnostic events, then disable the subscriber and compare the output.
- Capture profiles before and after changing the workload. Keep the request count and iteration count the same.
- Add a measured async operation with `performance.mark()` and `performance.measure()`, using unique mark names if requests can overlap.
- Add a request-specific diagnostic field only if it is useful and does not contain private or secret data.

## What this example demonstrates

- Binding a development diagnostics server to loopback.
- Publishing request events through `diagnostics_channel`.
- Recording request duration with `performance.now()`.
- Measuring event loop delay and converting its units.
- Reading selected process memory measurements.
- Attaching a debugger and collecting CPU or heap profiles.
- Protecting diagnostic output and avoiding conclusions from a single metric.

The code in this example is provided for study. It has not been run as part of this chapter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [130 - Node.js test runner and service tests](../lessons/130-node-js-test-runner-and-service-tests.md) | [Open Q&A](../qnas/131-node-js-debugging-diagnostics-and-profiling.md) | [Open lesson](../lessons/131-node-js-debugging-diagnostics-and-profiling.md) | [132 - Data structures in JavaScript](../lessons/132-data-structures-in-javascript.md) |
