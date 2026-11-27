# 112 - Web Workers, shared workers, and message passing: Example

## Question

How can a page move a calculation off the main thread, show progress and cancellation, transfer a large buffer without cloning it, and coordinate a value across two tabs?

## Goal

Build a small worker lab with three parts:

1. A dedicated worker counts prime numbers in chunks and reports progress.
2. The page can cancel the active count request.
3. The page transfers an ArrayBuffer to the worker and displays the computed byte sum.
4. A SharedWorker keeps a counter that updates in every connected tab.

The example uses plain JavaScript and Node.js built-in modules. It does not use a framework or external package.

## Files for the example

Create a folder containing these four files:

- **server.js**
- **index.html**
- **math-worker.js**
- **shared-counter.js**

Copy each complete code block into its matching file.

## Server code: server.js

This small server only serves the three known files. It does not accept uploads or write files.

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 3000;
const origin = "http://" + HOST + ":" + PORT;

const publicFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/math-worker.js", ["math-worker.js", "text/javascript; charset=utf-8"]],
  ["/shared-counter.js", ["shared-counter.js", "text/javascript; charset=utf-8"]]
]);

const server = createServer(async (request, response) => {
  const url = new URL(request.url, origin);
  const file = publicFiles.get(url.pathname);

  if (request.method !== "GET" || !file) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
    return;
  }

  try {
    const contents = await readFile(path.join(__dirname, file[0]));
    response.writeHead(200, {
      "Content-Type": file[1],
      "Cache-Control": "no-store"
    });
    response.end(contents);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Could not read the requested file");
  }
});

server.listen(PORT, HOST, () => {
  console.log("Open " + origin);
});
~~~

## Dedicated worker code: math-worker.js

This worker validates each request, counts primes in small chunks, and yields between chunks so it can receive a cancellation message. It also handles an ArrayBuffer transfer request.

~~~js
"use strict";

const MAX_LIMIT = 250_000;
const CHUNK_SIZE = 2_000;
let activePrimeJob;

function sendError(requestId, message) {
  self.postMessage({
    type: "error",
    requestId,
    message
  });
}

function isPrime(number) {
  if (number < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor === 0) {
      return false;
    }
  }

  return true;
}

function runPrimeChunk(job) {
  if (activePrimeJob !== job) {
    return;
  }

  const end = Math.min(job.nextNumber + CHUNK_SIZE, job.limit + 1);

  while (job.nextNumber < end) {
    if (isPrime(job.nextNumber)) {
      job.count += 1;
    }

    job.nextNumber += 1;
  }

  const completed = Math.min(job.nextNumber - 2, job.limit - 1);
  const total = job.limit - 1;
  const percent = Math.floor((completed / total) * 100);

  self.postMessage({
    type: "progress",
    requestId: job.requestId,
    checkedThrough: Math.min(job.nextNumber - 1, job.limit),
    limit: job.limit,
    percent
  });

  if (job.nextNumber <= job.limit) {
    setTimeout(() => runPrimeChunk(job), 0);
    return;
  }

  activePrimeJob = undefined;
  self.postMessage({
    type: "prime-result",
    requestId: job.requestId,
    limit: job.limit,
    count: job.count
  });
}

self.addEventListener("message", (event) => {
  const message = event.data;

  if (!message || typeof message.type !== "string") {
    sendError(undefined, "The message must have a type.");
    return;
  }

  if (message.type === "cancel-primes") {
    if (activePrimeJob && activePrimeJob.requestId === message.requestId) {
      const canceledRequestId = activePrimeJob.requestId;
      activePrimeJob = undefined;
      self.postMessage({
        type: "canceled",
        requestId: canceledRequestId
      });
    }

    return;
  }

  if (message.type === "count-primes") {
    if (
      !Number.isInteger(message.limit) ||
      message.limit < 2 ||
      message.limit > MAX_LIMIT
    ) {
      sendError(
        message.requestId,
        "Choose a whole-number limit from 2 to " + MAX_LIMIT + "."
      );
      return;
    }

    if (activePrimeJob) {
      sendError(message.requestId, "A prime-count request is already running.");
      return;
    }

    activePrimeJob = {
      requestId: message.requestId,
      limit: message.limit,
      nextNumber: 2,
      count: 0
    };

    runPrimeChunk(activePrimeJob);
    return;
  }

  if (message.type === "sum-bytes") {
    if (!(message.buffer instanceof ArrayBuffer)) {
      sendError(message.requestId, "The message must include an ArrayBuffer.");
      return;
    }

    if (message.buffer.byteLength > 5_000_000) {
      sendError(message.requestId, "The buffer must be 5 MB or smaller.");
      return;
    }

    const bytes = new Uint8Array(message.buffer);
    let sum = 0;

    for (const byte of bytes) {
      sum += byte;
    }

    self.postMessage({
      type: "byte-sum",
      requestId: message.requestId,
      byteLength: bytes.byteLength,
      sum
    });
    return;
  }

  sendError(message.requestId, "Unknown message type.");
});
~~~

## Shared worker code: shared-counter.js

The shared worker stores the counter in memory and keeps a port for each connected page. When one page changes the counter, the worker sends the new value to every connected port. The disconnect message removes that page's port.

~~~js
"use strict";

let count = 0;
const ports = new Set();

function broadcastCount() {
  for (const port of ports) {
    port.postMessage({
      type: "count",
      value: count
    });
  }
}

self.addEventListener("connect", (event) => {
  const port = event.ports[0];
  ports.add(port);

  port.addEventListener("message", (messageEvent) => {
    const message = messageEvent.data;

    if (!message || typeof message.type !== "string") {
      port.postMessage({
        type: "error",
        message: "The message must have a type."
      });
      return;
    }

    if (message.type === "get-count") {
      port.postMessage({
        type: "count",
        value: count
      });
      return;
    }

    if (message.type === "increment") {
      count += 1;
      broadcastCount();
      return;
    }

    if (message.type === "decrement") {
      count -= 1;
      broadcastCount();
      return;
    }

    if (message.type === "disconnect") {
      ports.delete(port);
      return;
    }

    port.postMessage({
      type: "error",
      message: "Unknown message type."
    });
  });

  port.start();
  port.postMessage({
    type: "ready"
  });
});
~~~

## Page code: index.html

The page creates both worker types. The dedicated worker handles a prime-count request and a transferred buffer. The SharedWorker coordinates its counter across tabs.

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Worker lab</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        font: 1rem/1.5 system-ui, sans-serif;
        color: #18212b;
        background: #f4f6f9;
      }

      body {
        max-width: 54rem;
        margin: 2rem auto;
        padding: 0 1rem 3rem;
      }

      main {
        display: grid;
        gap: 1.25rem;
      }

      header,
      section {
        display: grid;
        gap: 0.75rem;
      }

      section {
        padding: 1rem;
        border: 1px solid #aab4c0;
        border-radius: 0.5rem;
        background: #fff;
      }

      h1,
      h2 {
        line-height: 1.2;
      }

      label {
        font-weight: 700;
      }

      input,
      button {
        width: fit-content;
        font: inherit;
      }

      input {
        max-width: 100%;
      }

      button {
        padding: 0.45rem 0.7rem;
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      output {
        min-height: 1.5em;
      }

      [role="status"] {
        min-height: 1.5em;
      }

      :focus-visible {
        outline: 3px solid #1769aa;
        outline-offset: 3px;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Worker lab</h1>
        <p>
          Run a calculation in a dedicated worker, transfer a byte buffer,
          and share a counter between tabs.
        </p>
      </header>

      <section aria-labelledby="prime-heading">
        <h2 id="prime-heading">Dedicated worker: count primes</h2>
        <label for="prime-limit">Check whole numbers up to 250,000</label>
        <input id="prime-limit" type="number" min="2" max="250000" value="100000">
        <div class="button-row">
          <button id="start-primes" type="button">Start counting</button>
          <button id="cancel-primes" type="button" disabled>Cancel</button>
        </div>
        <p id="prime-status" role="status" aria-live="polite">
          Ready to start.
        </p>
      </section>

      <section aria-labelledby="transfer-heading">
        <h2 id="transfer-heading">Transfer an ArrayBuffer</h2>
        <p>
          The page creates 1 MB of bytes, transfers the buffer to the worker,
          and gives up access to its original buffer.
        </p>
        <button id="send-buffer" type="button">Send 1 MB buffer</button>
        <p id="buffer-status" role="status" aria-live="polite">
          No buffer sent.
        </p>
      </section>

      <section aria-labelledby="shared-heading">
        <h2 id="shared-heading">SharedWorker: counter across tabs</h2>
        <p>
          Open this page in another tab on the same origin. The counter value
          should update in both connected tabs.
        </p>
        <p>Shared count: <output id="shared-count">Connecting...</output></p>
        <div class="button-row">
          <button id="increment" type="button" disabled>Increment</button>
          <button id="decrement" type="button" disabled>Decrement</button>
        </div>
        <p id="shared-status" role="status" aria-live="polite">
          Connecting to the shared worker.
        </p>
      </section>
    </main>

    <script type="module">
      const primeLimitInput = document.querySelector("#prime-limit");
      const startButton = document.querySelector("#start-primes");
      const cancelButton = document.querySelector("#cancel-primes");
      const primeStatus = document.querySelector("#prime-status");

      const sendBufferButton = document.querySelector("#send-buffer");
      const bufferStatus = document.querySelector("#buffer-status");

      const sharedCountOutput = document.querySelector("#shared-count");
      const incrementButton = document.querySelector("#increment");
      const decrementButton = document.querySelector("#decrement");
      const sharedStatus = document.querySelector("#shared-status");

      let requestId = 0;
      let activePrimeRequest;
      let sharedPort;

      const worker = new Worker(
        new URL("./math-worker.js", import.meta.url),
        { type: "module", name: "chapter-112-math" }
      );

      worker.addEventListener("message", (event) => {
        const message = event.data;

        if (!message || typeof message.type !== "string") {
          primeStatus.textContent = "The worker sent an invalid message.";
          return;
        }

        if (message.type === "progress") {
          primeStatus.textContent =
            "Checked through " + message.checkedThrough + " of " +
            message.limit + " (" + message.percent + "%).";
          return;
        }

        if (message.type === "prime-result") {
          activePrimeRequest = undefined;
          startButton.disabled = false;
          cancelButton.disabled = true;
          primeStatus.textContent =
            "There are " + message.count + " prime numbers up to " +
            message.limit + ".";
          return;
        }

        if (message.type === "canceled") {
          activePrimeRequest = undefined;
          startButton.disabled = false;
          cancelButton.disabled = true;
          primeStatus.textContent = "The calculation was canceled.";
          return;
        }

        if (message.type === "byte-sum") {
          bufferStatus.textContent =
            "Worker received " + message.byteLength +
            " bytes. Their sum is " + message.sum + ".";
          sendBufferButton.disabled = false;
          return;
        }

        if (message.type === "error") {
          if (message.requestId === activePrimeRequest) {
            activePrimeRequest = undefined;
            startButton.disabled = false;
            cancelButton.disabled = true;
          }

          sendBufferButton.disabled = false;
          primeStatus.textContent = message.message;
          bufferStatus.textContent = message.message;
        }
      });

      worker.addEventListener("error", (event) => {
        primeStatus.textContent = "Worker error: " + event.message;
        startButton.disabled = false;
        cancelButton.disabled = true;
        sendBufferButton.disabled = false;
      });

      worker.addEventListener("messageerror", () => {
        primeStatus.textContent = "The worker message could not be read.";
      });

      startButton.addEventListener("click", () => {
        const limit = Number(primeLimitInput.value);

        if (!Number.isInteger(limit) || limit < 2 || limit > 250_000) {
          primeStatus.textContent =
            "Enter a whole number from 2 to 250,000.";
          return;
        }

        activePrimeRequest = ++requestId;
        startButton.disabled = true;
        cancelButton.disabled = false;
        primeStatus.textContent = "Starting calculation...";

        worker.postMessage({
          type: "count-primes",
          requestId: activePrimeRequest,
          limit
        });
      });

      cancelButton.addEventListener("click", () => {
        if (activePrimeRequest === undefined) {
          return;
        }

        worker.postMessage({
          type: "cancel-primes",
          requestId: activePrimeRequest
        });
        primeStatus.textContent = "Cancel requested...";
      });

      sendBufferButton.addEventListener("click", () => {
        const bytes = new Uint8Array(1_000_000);

        for (let index = 0; index < bytes.length; index += 1) {
          bytes[index] = index % 256;
        }

        const buffer = bytes.buffer;
        const byteRequestId = ++requestId;

        sendBufferButton.disabled = true;
        worker.postMessage(
          {
            type: "sum-bytes",
            requestId: byteRequestId,
            buffer
          },
          [buffer]
        );

        bufferStatus.textContent =
          "Transferred the buffer. The page's original byteLength is " +
          buffer.byteLength + ".";
      });

      if (typeof SharedWorker === "undefined") {
        sharedStatus.textContent =
          "SharedWorker is not available in this browser.";
      } else {
        try {
          const sharedWorker = new SharedWorker(
            new URL("./shared-counter.js", import.meta.url),
            { type: "module", name: "chapter-112-counter-v1" }
          );

          sharedPort = sharedWorker.port;

          sharedPort.addEventListener("message", (event) => {
            const message = event.data;

            if (message.type === "ready") {
              sharedStatus.textContent = "Connected to the shared worker.";
              incrementButton.disabled = false;
              decrementButton.disabled = false;
              return;
            }

            if (message.type === "count") {
              sharedCountOutput.textContent = String(message.value);
              return;
            }

            if (message.type === "error") {
              sharedStatus.textContent = message.message;
            }
          });

          sharedPort.addEventListener("messageerror", () => {
            sharedStatus.textContent =
              "The shared worker message could not be read.";
          });

          sharedPort.start();
          sharedPort.postMessage({ type: "get-count" });

          sharedWorker.addEventListener("error", () => {
            sharedStatus.textContent =
              "Could not connect to the shared worker.";
            incrementButton.disabled = true;
            decrementButton.disabled = true;
          });
        } catch (error) {
          sharedStatus.textContent =
            "Could not start the shared worker: " + error.message;
        }
      }

      incrementButton.addEventListener("click", () => {
        sharedPort?.postMessage({ type: "increment" });
      });

      decrementButton.addEventListener("click", () => {
        sharedPort?.postMessage({ type: "decrement" });
      });

      window.addEventListener("pagehide", () => {
        sharedPort?.postMessage({ type: "disconnect" });
        worker.terminate();
      });
    </script>
  </body>
</html>
~~~

## Run the example

Use a recent Node.js version. In a terminal opened in the folder containing the four files, run:

~~~sh
node server.js
~~~

Open **http://127.0.0.1:3000**. To see the shared counter coordinate pages, open that same address in a second tab. Both tabs need to use the same origin and the same SharedWorker name.

## Expected result

- Starting the prime count updates progress while the page remains interactive.
- Pressing Cancel asks the worker to stop between chunks.
- The completed result reports how many prime numbers are at or below the chosen limit.
- Sending a buffer reports that the page's original buffer has byteLength 0 after transfer.
- The worker reports the byte count and sum for the transferred buffer.
- Incrementing or decrementing the shared counter in one tab updates the value in connected tabs.
- If SharedWorker is unavailable or fails to start, the page shows a message.

## Explanation

- The page creates a module **Worker** with a URL resolved relative to the page module.
- The dedicated worker receives typed messages. It validates the limit and message type before starting work.
- The prime calculation runs in chunks. Scheduling the next chunk with **setTimeout()** lets the worker process a cancellation message between chunks.
- Each progress and result message includes a **requestId**, so responses can be associated with a request.
- The ArrayBuffer is included in the message and in the transfer list. After transfer, the page's original buffer is detached.
- The **SharedWorker** receives a connect event and communicates through a per-page **MessagePort**. The page starts the port because it uses **addEventListener()**.
- The shared worker stores its counter only in memory. It is not a durable store and may be stopped when no pages are using it.
- The page sends a disconnect message when it is leaving. The shared worker removes that port from its set.

## Important limits

Worker startup and messaging have a cost. The example's prime-count task is deliberately bounded. Do not increase the limit without considering the time and CPU use.

A transferred buffer is no longer available in the sending page. Shared counter state exists only while the SharedWorker remains alive. It can reset after the browser stops the worker. This example does not save the count to a server or IndexedDB.

## Try it yourself

- Start a prime count and cancel it before it finishes.
- Try the smallest and largest accepted values.
- Change the worker's message type to an unknown value and observe the error response.
- Open two tabs and increment the shared counter in each.
- Close one tab and continue incrementing in the other.
- Send a smaller or larger ArrayBuffer and compare its byte sum.
- Add a new request type with a requestId and validate all of its fields.
- Replace the dedicated worker with main-thread code and compare how the interface responds during the calculation.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [111 - Files, blobs, object URLs, clipboard, and downloads](111-files-blobs-object-urls-clipboard-and-downloads.md) | [Open lesson](../lessons/112-web-workers-shared-workers-and-message-passing.md) | [Open Q&A](../qnas/112-web-workers-shared-workers-and-message-passing.md) | [113 - Service workers, offline behavior, and cache lifecycle](../lessons/113-service-workers-offline-behavior-and-cache-lifecycle.md) |
