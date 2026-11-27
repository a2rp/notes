# 113 - Service workers, offline behavior, and cache lifecycle: Example

## Question

How can an application cache its shell, load a text resource from the network when available, and show cached content or an offline page when the network is unavailable?

## Goal

Build a small offline demo with a service worker. It precaches the page shell and offline page, fetches a message from the server, stores a successful message response, and uses the stored copy when a later request fails.

The example also uses versioned caches, deletes only its own old caches, checks whether the page is controlled, and shows where the first-visit lifecycle can affect testing.

## Files for the example

Create a folder containing these five files:

- **server.js**
- **index.html**
- **sw.js**
- **offline.html**
- **message.txt**

Copy each complete code block into its matching file. The Node.js server only serves these files. It does not store messages or accept uploads.

## Server code: server.js

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
  ["/offline.html", ["offline.html", "text/html; charset=utf-8"]],
  ["/message.txt", ["message.txt", "text/plain; charset=utf-8"]],
  ["/sw.js", ["sw.js", "text/javascript; charset=utf-8"]]
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

## Service worker code: sw.js

~~~js
"use strict";

const SHELL_CACHE = "offline-demo-shell-v1";
const DATA_CACHE = "offline-demo-data-v1";
const CACHE_PREFIX = "offline-demo-";
const PRECACHE_URLS = ["/", "/index.html", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      const currentCaches = new Set([SHELL_CACHE, DATA_CACHE]);

      await Promise.all(
        names
          .filter((name) => {
            return name.startsWith(CACHE_PREFIX) && !currentCaches.has(name);
          })
          .map((name) => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

function markAsCached(response) {
  const headers = new Headers(response.headers);
  headers.set("X-Offline-Demo", "cached");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

async function networkFirst(request, cacheName, offlineFallback) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return markAsCached(cachedResponse);
    }

    if (offlineFallback) {
      const fallback = await caches.match(offlineFallback);

      if (fallback) {
        return fallback;
      }
    }

    return new Response("This resource is not available offline.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return new Response("This resource is not available offline.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      networkFirst(request, SHELL_CACHE, "/offline.html")
    );
    return;
  }

  if (url.pathname === "/message.txt") {
    event.respondWith(networkFirst(request, DATA_CACHE));
    return;
  }

  if (
    url.pathname === "/index.html" ||
    url.pathname === "/offline.html"
  ) {
    event.respondWith(cacheFirst(request));
  }
});
~~~

## Page code: index.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Offline message demo</title>
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
        max-width: 48rem;
        margin: 2rem auto;
        padding: 0 1rem 3rem;
      }

      main,
      section {
        display: grid;
        gap: 0.8rem;
      }

      section {
        margin-top: 1.25rem;
        padding: 1rem;
        border: 1px solid #aab4c0;
        border-radius: 0.5rem;
        background: #fff;
      }

      h1,
      h2 {
        line-height: 1.2;
      }

      button {
        width: fit-content;
        padding: 0.5rem 0.75rem;
        font: inherit;
      }

      output,
      [role="status"] {
        min-height: 1.5em;
      }

      pre {
        overflow-wrap: anywhere;
        min-height: 2rem;
        padding: 0.75rem;
        border: 1px solid #c3ccd6;
        background: #f8fafc;
        white-space: pre-wrap;
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
        <h1>Offline message demo</h1>
        <p>
          The service worker caches this page and can keep a previously loaded
          message available when the network is unavailable.
        </p>
      </header>

      <section aria-labelledby="worker-heading">
        <h2 id="worker-heading">Service worker status</h2>
        <p id="worker-status" role="status" aria-live="polite">
          Checking service worker support...
        </p>
        <p>Registration scope: <output id="scope">Not registered</output></p>
      </section>

      <section aria-labelledby="message-heading">
        <h2 id="message-heading">Load the message</h2>
        <p>
          Load once while online to store a copy. Then stop the local server
          or use the browser's offline mode and load it again.
        </p>
        <button id="load-message" type="button" disabled>Load message</button>
        <p id="message-status" role="status" aria-live="polite">
          Waiting for a controlling service worker.
        </p>
        <pre id="message-output"></pre>
      </section>
    </main>

    <script type="module">
      const workerStatus = document.querySelector("#worker-status");
      const scopeOutput = document.querySelector("#scope");
      const loadButton = document.querySelector("#load-message");
      const messageStatus = document.querySelector("#message-status");
      const messageOutput = document.querySelector("#message-output");

      function updateControlStatus() {
        const isControlled = Boolean(navigator.serviceWorker.controller);
        loadButton.disabled = !isControlled;

        if (isControlled) {
          workerStatus.textContent =
            "This page is controlled by a service worker.";
          return;
        }

        workerStatus.textContent =
          "The worker is registered. If this stays disabled, reload the page.";
      }

      if (!("serviceWorker" in navigator)) {
        workerStatus.textContent =
          "Service workers are not available in this browser.";
      } else {
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          updateControlStatus
        );

        try {
          const registration =
            await navigator.serviceWorker.register("/sw.js");

          scopeOutput.textContent = registration.scope;
          updateControlStatus();
        } catch (error) {
          workerStatus.textContent =
            "Registration failed: " + error.message;
        }
      }

      loadButton.addEventListener("click", async () => {
        loadButton.disabled = true;
        messageStatus.textContent = "Loading message...";

        try {
          const response = await fetch("/message.txt");

          if (!response.ok) {
            throw new Error("The server returned status " + response.status);
          }

          const message = await response.text();
          messageOutput.textContent = message;

          if (response.headers.get("X-Offline-Demo") === "cached") {
            messageStatus.textContent =
              "Loaded the cached copy because the network request failed.";
          } else {
            messageStatus.textContent =
              "Loaded the message from the network. A copy is cached.";
          }
        } catch (error) {
          messageStatus.textContent = error.message;
        } finally {
          loadButton.disabled =
            !navigator.serviceWorker.controller;
        }
      });


    </script>
  </body>
</html>
~~~

## Offline page: offline.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Offline</title>
  </head>
  <body>
    <main>
      <h1>You are offline</h1>
      <p>
        This page is not available from the network. Reconnect and try again,
        or return to a page that was already saved on this device.
      </p>
      <a href="/">Return to the demo</a>
    </main>
  </body>
</html>
~~~

## Message content: message.txt

~~~text
This message came from the local server.
After the first successful request, the service worker keeps a cached copy.
~~~

## Run and try the example

Use a recent Node.js version. In a terminal opened in the folder containing all five files, run:

~~~sh
node server.js
~~~

Open **http://127.0.0.1:3000**. Wait until the status says the page is controlled by a service worker. If it remains unregistered or disabled, reload the page once.

1. While online, press **Load message**. The page should report that the message came from the network and a copy was cached.
2. Stop the Node.js server with Ctrl+C, or enable offline mode in browser developer tools.
3. Press **Load message** again. The page should show the cached copy.
4. While still offline, reload the page. The navigation should use the cached page shell.
5. Try an uncached path such as **/missing-page** while offline. The worker should show the offline fallback.

## Expected result

- The service worker registers with scope **/** and claims the local page after activation.
- The install event stores the page shell and offline page in a versioned cache.
- A successful request for **message.txt** is saved in a separate data cache.
- When a later request fails because the network is unavailable, the worker returns the saved response and marks it with a demo response header.
- An offline navigation uses the cached page or the offline fallback.
- Activating a later worker version removes only older caches whose names begin with **offline-demo-**.

## Explanation

- **server.js** serves only known local files and sets the JavaScript MIME type for **sw.js**.
- **navigator.serviceWorker.register()** registers the root-level worker. The page enables its button only when it has a controller.
- The install handler uses **waitUntil()** so caching the shell is part of installation. If a required precache item is missing, installation fails.
- The activate handler deletes only outdated caches owned by this demo, then calls **clients.claim()**.
- Navigation requests use a network-first strategy and fall back to the cached offline page.
- The message request uses network first and stores successful responses. When fetch rejects, the worker checks its data cache.
- **response.clone()** is used because the same response body must be returned to the page and stored in Cache Storage.
- The first visit may make requests before the page is controlled. The interface reports control status so the request is made after the worker takes over.

## Important limits

This demo caches only public static files and a public text message. Do not copy its cache policy unchanged for personalized or sensitive responses. A service worker is not an authorization layer, and Cache Storage can be cleared or evicted.

The local server uses HTTP on localhost for development. Deploy a real application over HTTPS. A service worker can be stopped and restarted by the browser, so do not depend on its in-memory variables to preserve application data.

## Try it yourself

- Change **message.txt**, reload while online, and observe how network-first updates the cached message.
- Bump the cache names from **v1** to **v2** and reload to observe installation and cleanup.
- Leave a tab open while updating the worker and inspect its installing, waiting, and active states in developer tools.
- Remove **offline.html** from the precache list and observe the install failure.
- Add a request with a query string and decide whether it should have a separate cache entry.
- Add a private response and then explain why caching it needs a deliberate privacy and logout policy.
- Change the message request to cache-first and compare freshness behavior.
- Clear site data, reload, and verify that offline support is not available until files have been cached again.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [112 - Web Workers, shared workers, and message passing](112-web-workers-shared-workers-and-message-passing.md) | [Open lesson](../lessons/113-service-workers-offline-behavior-and-cache-lifecycle.md) | [Open Q&A](../qnas/113-service-workers-offline-behavior-and-cache-lifecycle.md) | [114 - Mutation, intersection, and resize observers](../lessons/114-mutation-intersection-and-resize-observers.md) |
