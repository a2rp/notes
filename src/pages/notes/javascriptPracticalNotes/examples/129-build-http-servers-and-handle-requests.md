# 129 - Build HTTP servers and handle requests: Example

Build a small JSON server and a Node.js client that sends requests to it. The server demonstrates routes, query parameters, JSON body parsing, validation, response status codes, and graceful shutdown.

## Create these files

Create a folder named `http-server-demo` with these files:

~~~text
http-server-demo/
  server.mjs
  client.mjs
~~~

### `http-server-demo/server.mjs`

~~~js
import { createServer } from "node:http";

const host = "127.0.0.1";
const port = 3000;
const maxBodyBytes = 16 * 1024;

const notes = [
  { id: 1, title: "Learn HTTP basics" }
];
let nextId = 2;

function sendJson(response, statusCode, data, extraHeaders = {}) {
  const body = JSON.stringify(data);

  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...extraHeaders
  });

  response.end(body);
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

async function handleRequest(request, response) {
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

    if (!contentType.toLowerCase().startsWith("application/json")) {
      request.resume();
      sendJson(
        response,
        415,
        { error: "Content-Type must be application/json" }
      );
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

    const note = { id: nextId, title };
    nextId += 1;
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

const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error("Request failed:", error);

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

    const message = statusCode === 500
      ? "Internal server error"
      : error.message;

    sendJson(response, statusCode, { error: message });
  });
});

server.headersTimeout = 10_000;
server.requestTimeout = 30_000;

server.on("error", (error) => {
  console.error("Server error:", error.message);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log("Listening on http://" + host + ":" + port);
});

let shuttingDown = false;

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

### `http-server-demo/client.mjs`

~~~js
const baseUrl = "http://127.0.0.1:3000";

async function requestJson(path, options) {
  const response = await fetch(baseUrl + path, options);
  const data = await response.json();

  return {
    status: response.status,
    data
  };
}

async function main() {
  const health = await requestJson("/health");

  console.log(
    "Health:",
    health.status,
    JSON.stringify(health.data)
  );

  const initialNotes = await requestJson("/api/notes");

  console.log(
    "Initial notes:",
    initialNotes.status,
    JSON.stringify(initialNotes.data)
  );

  const created = await requestJson("/api/notes", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ title: "Read request headers" })
  });

  console.log(
    "Created note:",
    created.status,
    JSON.stringify(created.data)
  );

  const limitedNotes = await requestJson("/api/notes?limit=1");

  console.log(
    "Limited notes:",
    limitedNotes.status,
    JSON.stringify(limitedNotes.data)
  );

  const unsupportedMethod = await requestJson("/api/notes", {
    method: "DELETE"
  });

  console.log(
    "Unsupported method:",
    unsupportedMethod.status,
    JSON.stringify(unsupportedMethod.data)
  );
}

main().catch((error) => {
  console.error("Client failed:", error.message);
  process.exitCode = 1;
});
~~~

## Run the example

Use Node.js 18 or newer for the built-in fetch function.

Open one terminal in the directory containing `http-server-demo` and start the server:

~~~sh
node http-server-demo/server.mjs
~~~

Expected server output:

~~~text
Listening on http://127.0.0.1:3000
~~~

Open a second terminal in the same directory and run the client:

~~~sh
node http-server-demo/client.mjs
~~~

Expected client output:

~~~text
Health: 200 {"status":"ok"}
Initial notes: 200 {"data":[{"id":1,"title":"Learn HTTP basics"}],"count":1}
Created note: 201 {"data":{"id":2,"title":"Read request headers"}}
Limited notes: 200 {"data":[{"id":1,"title":"Learn HTTP basics"}],"count":1}
Unsupported method: 405 {"error":"Method not allowed"}
~~~

Stop the server with Ctrl+C. It stops accepting new requests, closes, and then exits.

## How the request flow works

1. createServer() calls handleRequest() for each incoming request.
2. The handler parses the request target against a fixed base URL and checks its pathname.
3. GET /health returns a health response. GET /api/notes returns notes, optionally limited by a validated query value.
4. POST /api/notes requires JSON, reads the request stream under a byte limit, parses the JSON, and validates the title.
5. A successful creation returns 201. The client receives the JSON response and prints its status and data.
6. A known notes route with DELETE returns 405 and an Allow header. An unknown path returns 404.

The notes are kept in memory, so creating a note changes only the currently running server process. Restarting the server resets the list.

## Error handling and safety

- The request body is streamed and capped at 16 KiB before it is retained in memory.
- JSON syntax errors return 400. An oversized body returns 413.
- The content type is checked before JSON parsing. Unsupported types return 415.
- The title is trimmed and limited to 100 characters.
- The handler returns generic details for unexpected server errors and logs diagnostics on the server.
- The server parses request.url with a fixed base and does not trust the Host header as its origin.
- The demo binds only to 127.0.0.1 and is not a production deployment.
- The server timeout values limit how long a client can take to send request headers and a complete request.

## What this example demonstrates

- Creating a Node.js HTTP server with createServer().
- Matching both HTTP method and pathname.
- Parsing query parameters and validating them.
- Reading a request body as a stream with a byte limit.
- Returning JSON with suitable status codes and headers.
- Handling errors and gracefully closing a server.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [128 - Worker threads, child processes, and subprocesses](../lessons/128-worker-threads-child-processes-and-subprocesses.md) | [Open Q&A](../qnas/129-build-http-servers-and-handle-requests.md) | [Open lesson](../lessons/129-build-http-servers-and-handle-requests.md) | [130 - Node.js test runner and service tests](../lessons/130-node-js-test-runner-and-service-tests.md) |
