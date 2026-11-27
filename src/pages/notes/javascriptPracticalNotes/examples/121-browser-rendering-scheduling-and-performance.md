# 121 - Browser rendering, scheduling, and performance

This example is a local browser demo for event-loop order, main-thread blocking, cooperative work, animation-frame timing, and optional long-task observation. It uses plain HTML, CSS, and JavaScript with no third-party packages.

The blocking button intentionally pauses the page briefly to demonstrate a bad pattern. Use it once, then compare it with the chunked version.

## Create these files

Create a folder named <code>browser-performance-demo</code> and add the files below.

### <code>browser-performance-demo/index.html</code>

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Browser scheduling and performance demo</title>
    <link rel="stylesheet" href="styles.css">
    <script src="app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Browser scheduling and performance</h1>
      <p>
        Compare synchronous work with chunked work, inspect callback order,
        and observe frame timing in this browser.
      </p>

      <p id="status" role="status" aria-live="polite">
        Ready. Start the ticker, then try each demo.
      </p>

      <section aria-labelledby="pulse-heading">
        <h2 id="pulse-heading">A small animation</h2>
        <p>
          The moving indicator is a CSS animation. Heavy page work can still
          affect the experience, and the browser is free to pause hidden pages.
        </p>
        <div class="pulse-track" aria-hidden="true">
          <span class="pulse-dot"></span>
        </div>
      </section>

      <section aria-labelledby="ticker-heading">
        <h2 id="ticker-heading">Responsiveness ticker</h2>
        <p>
          A timer updates while the page is responsive. During blocking work,
          the timer callback is delayed.
        </p>
        <button id="ticker-button" type="button">Start ticker</button>
        <p id="ticker-output">Ticker is stopped.</p>
      </section>

      <section aria-labelledby="blocking-heading">
        <h2 id="blocking-heading">One long main-thread task</h2>
        <p>
          This button schedules a short CPU loop in a later task. Input,
          timers, and main-thread rendering cannot proceed while that loop runs.
        </p>
        <button id="blocking-button" type="button">Run blocking work</button>
        <p id="blocking-output">No blocking run yet.</p>
      </section>

      <section aria-labelledby="chunked-heading">
        <h2 id="chunked-heading">Cooperative chunked work</h2>
        <p>
          The same kind of CPU work is divided into short pieces. The page
          yields between pieces so other tasks can get a turn.
        </p>
        <button id="chunked-button" type="button">Run chunked work</button>
        <p id="chunked-output">No chunked run yet.</p>
      </section>

      <section aria-labelledby="order-heading">
        <h2 id="order-heading">Tasks and microtasks</h2>
        <p>
          Run this to see synchronous statements, microtasks, and a timer task
          in order. The exact time of a paint is not printed here.
        </p>
        <button id="order-button" type="button">Show callback order</button>
        <pre id="order-output" aria-live="polite">No sequence yet.</pre>
      </section>

      <section aria-labelledby="frame-heading">
        <h2 id="frame-heading">Animation-frame monitor</h2>
        <p>
          The monitor samples requestAnimationFrame() timestamps and reports
          batches of frame intervals. It does not claim to measure when pixels
          reach the physical display.
        </p>
        <button id="frame-button" type="button">Start frame monitor</button>
        <p id="frame-output">Frame monitor is stopped.</p>
      </section>

      <section aria-labelledby="long-task-heading">
        <h2 id="long-task-heading">Optional long-task observation</h2>
        <p id="long-task-support">Checking browser support...</p>
        <p id="long-task-output">No long task has been observed.</p>
      </section>

      <section aria-labelledby="notes-heading">
        <h2 id="notes-heading">What to notice</h2>
        <ul>
          <li>
            A synchronous loop prevents the main thread from handling other
            work until it returns.
          </li>
          <li>
            Chunking gives the event loop chances to process other tasks, but
            does not promise a paint at an exact moment.
          </li>
          <li>
            A frame interval is not the same as a full measure of user-visible
            rendering time.
          </li>
          <li>
            Optional performance APIs must be feature-detected.
          </li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

### <code>browser-performance-demo/styles.css</code>

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  color-scheme: light;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #182230;
  background: #f4f7fb;
}

body {
  padding: 1.5rem;
}

main {
  width: min(100%, 52rem);
  margin-inline: auto;
}

h1,
h2 {
  line-height: 1.2;
}

h1 {
  margin-block-end: 0.75rem;
}

h2 {
  margin-block-end: 0.65rem;
  font-size: 1.25rem;
}

p,
ul {
  margin-block: 0.65rem;
}

ul {
  padding-inline-start: 1.4rem;
}

section {
  margin-block: 1.5rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #c9d3df;
  border-radius: 0.5rem;
}

button {
  margin-block: 0.4rem;
  padding: 0.6rem 0.85rem;
  border: 2px solid #164ea6;
  border-radius: 0.3rem;
  color: #fff;
  background: #164ea6;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #103b80;
}

button:disabled {
  cursor: wait;
  opacity: 0.7;
}

button:focus-visible {
  outline: 3px solid #d97706;
  outline-offset: 3px;
}

#status {
  min-height: 1.7em;
  margin-block: 1rem;
  padding: 0.6rem 0.8rem;
  border-inline-start: 4px solid #164ea6;
  background: #e8f0fe;
  font-weight: 700;
}

pre {
  overflow-x: auto;
  margin-block-start: 0.6rem;
  padding: 0.75rem;
  color: #f4f7fb;
  background: #182230;
  border-radius: 0.3rem;
  font: 0.9rem/1.5 ui-monospace, monospace;
  white-space: pre-wrap;
}

.pulse-track {
  display: flex;
  align-items: center;
  min-height: 2rem;
  overflow: hidden;
  padding-inline: 0.2rem;
  background: #e8f0fe;
  border-radius: 999px;
}

.pulse-dot {
  width: 1.25rem;
  height: 1.25rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #164ea6;
  animation: travel 2s ease-in-out infinite alternate;
}

@keyframes travel {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(35rem);
  }
}

@media (max-width: 36rem) {
  body {
    padding: 0.75rem;
  }

  section {
    padding: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse-dot {
    animation: none;
  }
}
~~~

### <code>browser-performance-demo/app.js</code>

~~~js
"use strict";

const status = document.querySelector("#status");

const tickerButton = document.querySelector("#ticker-button");
const tickerOutput = document.querySelector("#ticker-output");
const blockingButton = document.querySelector("#blocking-button");
const blockingOutput = document.querySelector("#blocking-output");
const chunkedButton = document.querySelector("#chunked-button");
const chunkedOutput = document.querySelector("#chunked-output");
const orderButton = document.querySelector("#order-button");
const orderOutput = document.querySelector("#order-output");
const frameButton = document.querySelector("#frame-button");
const frameOutput = document.querySelector("#frame-output");
const longTaskSupport = document.querySelector("#long-task-support");
const longTaskOutput = document.querySelector("#long-task-output");

let tickerId = null;
let lastTickerTime = null;
let tickerCount = 0;
let frameMonitorEnabled = false;
let frameRequestId = null;
let previousFrameTime = null;
let frameIntervals = [];
let observedLongTasks = 0;
let maximumLongTaskDuration = 0;

function setStatus(message) {
  status.textContent = message;
}

function startTicker() {
  if (tickerId !== null) {
    return;
  }

  lastTickerTime = performance.now();
  tickerCount = 0;
  tickerButton.textContent = "Stop ticker";
  tickerOutput.textContent = "Ticker is running.";

  tickerId = setInterval(() => {
    const now = performance.now();
    const delay = now - lastTickerTime;
    lastTickerTime = now;
    tickerCount += 1;

    tickerOutput.textContent =
      "Tick " + tickerCount +
      ". Time since previous callback: " + delay.toFixed(1) + " ms.";
  }, 100);
}

function stopTicker() {
  if (tickerId === null) {
    return;
  }

  clearInterval(tickerId);
  tickerId = null;
  lastTickerTime = null;
  tickerButton.textContent = "Start ticker";
  tickerOutput.textContent = "Ticker is stopped.";
}

tickerButton.addEventListener("click", () => {
  if (tickerId === null) {
    startTicker();
    setStatus("Ticker started. Try the blocking and chunked work.");
  } else {
    stopTicker();
    setStatus("Ticker stopped.");
  }
});

function busyFor(durationMs) {
  const startedAt = performance.now();
  let checksum = 0;
  let index = 1;

  while (performance.now() - startedAt < durationMs) {
    checksum += Math.sqrt((index % 1000) + 1);
    index += 1;
  }

  return checksum;
}

function clearMeasurement(name) {
  performance.clearMarks(name + "-start");
  performance.clearMarks(name + "-end");
  performance.clearMeasures(name);
}

function recordMeasurement(name) {
  const entries = performance.getEntriesByName(name);
  const latest = entries[entries.length - 1];
  return latest ? latest.duration : 0;
}

blockingButton.addEventListener("click", () => {
  blockingButton.disabled = true;
  chunkedButton.disabled = true;
  blockingOutput.textContent = "Scheduling a short blocking task...";
  setStatus("Blocking work is scheduled. The page may pause briefly.");

  setTimeout(() => {
    clearMeasurement("blocking-demo");
    performance.mark("blocking-demo-start");
    const checksum = busyFor(300);
    performance.mark("blocking-demo-end");
    performance.measure(
      "blocking-demo",
      "blocking-demo-start",
      "blocking-demo-end"
    );

    const duration = recordMeasurement("blocking-demo");
    blockingOutput.textContent =
      "Synchronous work took about " + duration.toFixed(1) +
      " ms. Check whether the ticker was delayed. Checksum: " +
      checksum.toFixed(1) + ".";

    blockingButton.disabled = false;
    chunkedButton.disabled = false;
    setStatus("Blocking work finished. Compare it with chunked work.");
  }, 30);
});

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

chunkedButton.addEventListener("click", async () => {
  blockingButton.disabled = true;
  chunkedButton.disabled = true;
  setStatus("Chunked work is running. Other page tasks can get turns.");
  chunkedOutput.textContent = "Preparing chunks...";

  clearMeasurement("chunked-demo");
  performance.mark("chunked-demo-start");

  const totalCpuMs = 300;
  const chunkCpuMs = 20;
  let completedCpuMs = 0;
  let checksum = 0;
  let chunkCount = 0;

  try {
    while (completedCpuMs < totalCpuMs) {
      const duration = Math.min(
        chunkCpuMs,
        totalCpuMs - completedCpuMs
      );

      checksum += busyFor(duration);
      completedCpuMs += duration;
      chunkCount += 1;

      chunkedOutput.textContent =
        "Completed CPU chunk " + chunkCount + " of " +
        Math.ceil(totalCpuMs / chunkCpuMs) + ".";

      if (completedCpuMs < totalCpuMs) {
        await yieldToBrowser();
      }
    }

    performance.mark("chunked-demo-end");
    performance.measure(
      "chunked-demo",
      "chunked-demo-start",
      "chunked-demo-end"
    );

    const duration = recordMeasurement("chunked-demo");
    chunkedOutput.textContent =
      chunkCount + " chunks used about " + duration.toFixed(1) +
      " ms of elapsed time. Check whether the ticker continued. Checksum: " +
      checksum.toFixed(1) + ".";

    setStatus("Chunked work finished.");
  } catch (error) {
    chunkedOutput.textContent = "Chunked work could not finish.";
    setStatus("An error interrupted chunked work.");
    console.error(error);
  } finally {
    blockingButton.disabled = false;
    chunkedButton.disabled = false;
  }
});

orderButton.addEventListener("click", () => {
  const events = [];

  function record(message) {
    events.push((events.length + 1) + ". " + message);
    orderOutput.textContent = events.join("\n");
  }

  orderOutput.textContent = "";
  record("synchronous handler begins");

  queueMicrotask(() => {
    record("queueMicrotask callback");
  });

  Promise.resolve().then(() => {
    record("Promise reaction");
  });

  setTimeout(() => {
    record("timer task");
  }, 0);

  record("synchronous handler ends");
  setStatus("The synchronous lines appear first, followed by microtasks, then the timer task.");
});

function updateFrameMonitor(timestamp) {
  if (!frameMonitorEnabled || document.hidden) {
    frameRequestId = null;
    previousFrameTime = null;
    return;
  }

  if (previousFrameTime !== null) {
    frameIntervals.push(timestamp - previousFrameTime);
  }

  previousFrameTime = timestamp;

  if (frameIntervals.length >= 15) {
    const total = frameIntervals.reduce((sum, interval) => sum + interval, 0);
    const average = total / frameIntervals.length;
    const maximum = Math.max(...frameIntervals);

    frameOutput.textContent =
      "Average callback interval: " + average.toFixed(1) +
      " ms. Largest interval in this batch: " + maximum.toFixed(1) +
      " ms. These are callback intervals, not a direct pixel-presentation measurement.";

    frameIntervals = [];
  }

  frameRequestId = requestAnimationFrame(updateFrameMonitor);
}

function startFrameMonitor() {
  if (frameMonitorEnabled) {
    return;
  }

  frameMonitorEnabled = true;
  frameIntervals = [];
  previousFrameTime = null;
  frameButton.textContent = "Stop frame monitor";

  if (!document.hidden) {
    frameRequestId = requestAnimationFrame(updateFrameMonitor);
    frameOutput.textContent = "Collecting animation-frame timestamps...";
  } else {
    frameOutput.textContent = "Paused while this page is hidden.";
  }
}

function stopFrameMonitor() {
  frameMonitorEnabled = false;

  if (frameRequestId !== null) {
    cancelAnimationFrame(frameRequestId);
  }

  frameRequestId = null;
  previousFrameTime = null;
  frameIntervals = [];
  frameButton.textContent = "Start frame monitor";
  frameOutput.textContent = "Frame monitor is stopped.";
}

frameButton.addEventListener("click", () => {
  if (frameMonitorEnabled) {
    stopFrameMonitor();
    setStatus("Frame monitor stopped.");
  } else {
    startFrameMonitor();
    setStatus("Frame monitor started.");
  }
});

document.addEventListener("visibilitychange", () => {
  if (!frameMonitorEnabled) {
    return;
  }

  if (document.hidden) {
    if (frameRequestId !== null) {
      cancelAnimationFrame(frameRequestId);
    }

    frameRequestId = null;
    previousFrameTime = null;
    frameIntervals = [];
    frameOutput.textContent = "Paused while this page is hidden.";
  } else {
    frameRequestId = requestAnimationFrame(updateFrameMonitor);
    frameOutput.textContent = "Resumed. Collecting new frame intervals...";
  }
});

const supportsLongTasks =
  "PerformanceObserver" in globalThis &&
  Array.isArray(PerformanceObserver.supportedEntryTypes) &&
  PerformanceObserver.supportedEntryTypes.includes("longtask");

if (supportsLongTasks) {
  longTaskSupport.textContent =
    "This browser reports support for long-task entries.";

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        observedLongTasks += 1;
        maximumLongTaskDuration = Math.max(
          maximumLongTaskDuration,
          entry.duration
        );

        longTaskOutput.textContent =
          observedLongTasks + " long task entry or entries observed. " +
          "Largest duration: " +
          maximumLongTaskDuration.toFixed(1) + " ms.";
      }
    });

    observer.observe({ type: "longtask" });
    window.addEventListener("pagehide", () => observer.disconnect(), {
      once: true
    });
  } catch {
    longTaskSupport.textContent =
      "Long-task observation was reported but could not be started.";
  }
} else {
  longTaskSupport.textContent =
    "This browser does not expose the long-task entry type here.";
}

window.addEventListener("pagehide", () => {
  stopTicker();

  if (frameRequestId !== null) {
    cancelAnimationFrame(frameRequestId);
  }
});
~~~

### <code>browser-performance-demo/server.mjs</code>

This small development server serves the files from localhost using Node.js built-in modules.

~~~js
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const files = new Map([
  ["/", { name: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { name: "index.html", type: "text/html; charset=utf-8" }],
  ["/styles.css", { name: "styles.css", type: "text/css; charset=utf-8" }],
  ["/app.js", { name: "app.js", type: "text/javascript; charset=utf-8" }]
]);

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const file = files.get(pathname);

  if (!file) {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    response.end("Not found");
    return;
  }

  try {
    const contents = await readFile(new URL(file.name, import.meta.url));

    response.writeHead(200, {
      "Content-Type": file.type,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    });
    response.end(contents);
  } catch {
    response.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    response.end("Could not read the demo file");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Open http://localhost:4173");
});
~~~

## Run the example

Open a terminal in the folder that contains <code>browser-performance-demo</code> and run:

~~~sh
node browser-performance-demo/server.mjs
~~~

Open <code>http://localhost:4173</code> in a browser. The server uses only Node.js built-in modules. The example has no network calls beyond serving the local files.

## Try it

1. Start the responsiveness ticker and wait for a few updates.
2. Select **Run blocking work**. The timer interval may become much larger because its callbacks could not run during the synchronous loop.
3. Select **Run chunked work**. The work takes multiple chunks, and the ticker can get opportunities to update between them.
4. Select **Show callback order**. The synchronous handler messages appear first, followed by the microtask callbacks, then the timer task.
5. Start the frame monitor and observe batches of callback intervals. These are not proof of when pixels reached the display.
6. If the browser supports long-task entries, run the blocking demo and inspect whether it reports an entry. Support and reporting can vary.
7. Stop the ticker and frame monitor when finished.

## Expected result

The blocking operation occupies the main thread for approximately 300 milliseconds, though the exact measurement depends on the device and browser. During that interval, the ticker and other main-thread callbacks are delayed.

The chunked operation uses several bounded CPU loops and yields between them. Its total elapsed time will usually be longer because scheduling other work has overhead, but the ticker can continue receiving turns between chunks.

The callback-order demo shows synchronous statements before microtasks and a later timer task. The frame monitor shows requestAnimationFrame() callback intervals. Long-task output appears only when the current browser exposes and reports that entry type.

## Why the example is structured this way

- The blocking loop is short and clearly labeled because it intentionally freezes main-thread work.
- The chunked version yields between work pieces using scheduler.yield() when available and a timer fallback otherwise.
- The order demo separates synchronous code, microtasks, and a timer task without claiming to show a paint time.
- Frame timestamps are labeled as callback intervals, not physical display measurements.
- Long-task observation is optional and feature-detected.
- The page uses textContent for its output and makes no network requests beyond the local server.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [120 - Web Crypto and secure random values](../lessons/120-web-crypto-and-secure-random-values.md) | [Open Q&A](../qnas/121-browser-rendering-scheduling-and-performance.md) | [Open lesson](../lessons/121-browser-rendering-scheduling-and-performance.md) | [122 - Node.js runtime, globals, and execution model](../lessons/122-node-js-runtime-globals-and-execution-model.md) |
