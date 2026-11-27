# 130 - Node.js test runner and service tests: Example

This example creates a small notes API and tests its observable HTTP behavior with the built-in Node.js test runner.

## Create these files

Create a folder named `service-test-demo` with these files:

~~~text
service-test-demo/
  app.mjs
  src/
    notes-server.mjs
  test/
    notes-server.test.mjs
~~~

### `service-test-demo/src/notes-server.mjs`

~~~js
import { createServer } from "node:http";

const maxBodyBytes = 4 * 1024;

function sendJson(response, statusCode, data, headers = {}) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...headers
  });

  response.end(JSON.stringify(data));
}

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  let tooLarge = false;

  for await (const chunk of request) {
    size += chunk.length;

    if (size > maxBodyBytes) {
      tooLarge = true;
      continue;
    }

    chunks.push(chunk);
  }

  if (tooLarge) {
    throw httpError(413, "Request body is too large");
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw httpError(400, "Request body must be valid JSON");
  }
}

async function handleRequest(request, response, notes) {
  let url;

  try {
    url = new URL(request.url ?? "/", "http://localhost");
  } catch {
    sendJson(response, 400, { error: "Invalid request URL" });
    return;
  }

  if (url.pathname === "/health" && request.method === "GET") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  if (url.pathname !== "/api/notes") {
    request.resume();
    sendJson(response, 404, { error: "Route not found" });
    return;
  }

  if (request.method === "GET") {
    const limitText = url.searchParams.get("limit");
    let visibleNotes = notes;

    if (limitText !== null) {
      const limit = Number(limitText);

      if (!Number.isSafeInteger(limit) || limit < 1) {
        sendJson(response, 400, {
          error: "limit must be a positive integer"
        });
        return;
      }

      visibleNotes = notes.slice(0, limit);
    }

    sendJson(response, 200, {
      data: visibleNotes,
      count: visibleNotes.length
    });
    return;
  }

  if (request.method === "POST") {
    const contentType = request.headers["content-type"] ?? "";
    const mediaType = contentType.split(";")[0].trim().toLowerCase();

    if (mediaType !== "application/json") {
      request.resume();
      sendJson(response, 415, {
        error: "Content-Type must be application/json"
      });
      return;
    }

    const payload = await readJson(request);

    if (
      payload === null ||
      typeof payload !== "object" ||
      Array.isArray(payload) ||
      typeof payload.title !== "string"
    ) {
      sendJson(response, 400, {
        error: "Request JSON must contain a string title"
      });
      return;
    }

    const title = payload.title.trim();

    if (title.length === 0 || title.length > 100) {
      sendJson(response, 400, {
        error: "title must contain between 1 and 100 characters"
      });
      return;
    }

    const note = {
      id: notes.length + 1,
      title
    };

    notes.push(note);
    sendJson(response, 201, { data: note });
    return;
  }

  request.resume();
  sendJson(
    response,
    405,
    { error: "Method not allowed" },
    { allow: "GET, POST" }
  );
}

export function createNotesServer() {
  const notes = [];

  const server = createServer((request, response) => {
    handleRequest(request, response, notes).catch((error) => {
      if (response.destroyed) {
        return;
      }

      if (response.headersSent) {
        response.destroy(error);
        return;
      }

      const statusCode = Number.isInteger(error.statusCode)
        ? error.statusCode
        : 500;

      if (statusCode >= 500) {
        console.error("Request failed:", error);
      }

      const message = statusCode === 500
        ? "Internal server error"
        : error.message;

      sendJson(response, statusCode, { error: message });
    });
  });

  server.headersTimeout = 5_000;
  server.requestTimeout = 10_000;

  return server;
}
~~~

### `service-test-demo/app.mjs`

~~~js
import { createNotesServer } from "./src/notes-server.mjs";

const server = createNotesServer();
let shuttingDown = false;

server.on("error", (error) => {
  console.error("Server error:", error.message);
  process.exitCode = 1;
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Notes API listening on http://127.0.0.1:3000");
});

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log("Received " + signal + ". Closing server.");

  server.close((error) => {
    if (error) {
      console.error("Server close failed:", error.message);
      process.exitCode = 1;
      return;
    }

    console.log("Server closed.");
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
~~~

### `service-test-demo/test/notes-server.test.mjs`

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";
import { createNotesServer } from "../src/notes-server.mjs";

async function startServer(t) {
  const server = createNotesServer();

  await new Promise((resolve, reject) => {
    const onError = (error) => reject(error);

    server.once("error", onError);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", onError);
      resolve();
    });
  });

  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  }));

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Expected a TCP address");
  }

  return "http://127.0.0.1:" + address.port;
}

test("health route returns JSON", async (t) => {
  const baseUrl = await startServer(t);
  const response = await fetch(baseUrl + "/health");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^application\/json/
  );
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("creates a note and returns it in the collection", async (t) => {
  const baseUrl = await startServer(t);

  const response = await fetch(baseUrl + "/api/notes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: "  Read the test report  " })
  });

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    data: { id: 1, title: "Read the test report" }
  });

  const listResponse = await fetch(baseUrl + "/api/notes");

  assert.equal(listResponse.status, 200);
  assert.deepEqual(await listResponse.json(), {
    data: [{ id: 1, title: "Read the test report" }],
    count: 1
  });
});

test("rejects malformed JSON", async (t) => {
  const baseUrl = await startServer(t);

  const response = await fetch(baseUrl + "/api/notes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{"
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Request body must be valid JSON"
  });
});

test("rejects a blank title", async (t) => {
  const baseUrl = await startServer(t);

  const response = await fetch(baseUrl + "/api/notes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: "   " })
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "title must contain between 1 and 100 characters"
  });
});

test("rejects a body over the configured byte limit", async (t) => {
  const baseUrl = await startServer(t);

  const response = await fetch(baseUrl + "/api/notes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "x".repeat(4 * 1024 + 1)
  });

  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), {
    error: "Request body is too large"
  });
});

test("rejects a non-JSON content type", async (t) => {
  const baseUrl = await startServer(t);

  const response = await fetch(baseUrl + "/api/notes", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "title=hello"
  });

  assert.equal(response.status, 415);
  assert.deepEqual(await response.json(), {
    error: "Content-Type must be application/json"
  });
});

test("validates a query limit", async (t) => {
  const baseUrl = await startServer(t);
  const response = await fetch(baseUrl + "/api/notes?limit=0");

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "limit must be a positive integer"
  });
});

test("returns 405 and Allow for an unsupported method", async (t) => {
  const baseUrl = await startServer(t);
  const response = await fetch(baseUrl + "/api/notes", {
    method: "DELETE"
  });

  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, POST");
  assert.deepEqual(await response.json(), {
    error: "Method not allowed"
  });
});

test("returns 404 for an unknown route", async (t) => {
  const baseUrl = await startServer(t);
  const response = await fetch(baseUrl + "/missing");

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: "Route not found"
  });
});
~~~

## Run the service

Use a current Node.js version with the built-in test runner and global fetch.

From the directory containing `service-test-demo`, start the server:

~~~sh
node service-test-demo/app.mjs
~~~

Expected server output:

~~~text
Notes API listening on http://127.0.0.1:3000
~~~

Open another terminal in the same directory and run all discovered tests:

~~~sh
node --test
~~~

Or run the service test file directly:

~~~sh
node --test test/notes-server.test.mjs
~~~

The successful run should report 9 passing tests and 0 failures. Reporter formatting and timing depend on the Node.js version and terminal.

## How the tests work

Each test calls startServer(), which creates a fresh notes service and listens on port 0. The operating system selects an available local port, and the test builds the base URL from server.address().

The helper registers t.after() to close the server. The test runner waits for that cleanup Promise, including when an assertion fails.

The tests send HTTP requests with fetch() and check public behavior:

- the health response and its content type;
- creating and listing a note;
- malformed JSON and invalid note data;
- a body larger than the configured limit;
- an unsupported media type;
- invalid query input;
- a 405 response and its Allow header;
- an unknown route.

Each service instance has its own in-memory note list, so tests do not depend on execution order or data from another test.

## Adapt the example

- Add tests for values at the exact title length boundaries.
- Test a valid query limit against a populated collection.
- Add a route and assert its status, headers, and JSON body.
- Extract validation into a small function and test it as a unit.
- Inject dependencies such as a clock or repository when the service grows.
- Add cleanup for every resource a test creates.

The tests are not run by this chapter file. Run them from your own terminal to see the test runner report.

## What this example demonstrates

- Defining tests with node:test and strict assertions with node:assert/strict.
- Exporting a server factory so tests can start the service without binding the production port.
- Starting a test server on an operating-system-selected port.
- Registering asynchronous server cleanup with t.after().
- Checking successful responses and important error paths over HTTP.
- Keeping each test's state isolated.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [129 - Build HTTP servers and handle requests](../lessons/129-build-http-servers-and-handle-requests.md) | [Open Q&A](../qnas/130-node-js-test-runner-and-service-tests.md) | [Open lesson](../lessons/130-node-js-test-runner-and-service-tests.md) | [131 - Node.js debugging, diagnostics, and profiling](../lessons/131-node-js-debugging-diagnostics-and-profiling.md) |
