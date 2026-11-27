# 129 - Build HTTP servers and handle requests

Node.js includes an HTTP server API. This chapter builds a small JSON server, explains how requests and responses flow through it, and shows how to validate request data and handle errors.

## What an HTTP server does

An HTTP exchange has a request and a response. A request can contain:

- a method such as GET or POST;
- a URL path and query string;
- headers that describe the request;
- an optional body.

A response contains a status code, headers, and an optional body. A server decides what each request means and sends one response.

Node.js provides the low-level node:http module. It exposes the incoming request as a readable stream and the response as a writable stream. A framework can add routing and conveniences, but the underlying HTTP ideas are the same.

## Create a server

Import createServer from node:http and give it a request handler. The handler receives a request and a response for each incoming HTTP request.

~~~js
import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.writeHead(200, {
    "content-type": "text/plain; charset=utf-8"
  });

  response.end("Hello from Node.js");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server listening on http://127.0.0.1:3000");
});
~~~

The handler can run asynchronously when it needs to read a request body or perform asynchronous work. The server stays available to handle other requests while that work is pending.

Bind to 127.0.0.1 for a local learning server. Binding to 0.0.0.0 makes a server reachable through its network interfaces, so use that only when you intend to expose it and have configured the surrounding network and security controls.

## Inspect the method, path, and query

The request method is available as request.method. The URL text is available as request.url. Parse it with the WHATWG URL API to separate its path from its query parameters.

Use a fixed base URL when parsing an incoming request target. Do not trust the Host header as the base for security decisions or redirects.

~~~js
const url = new URL(request.url ?? "/", "http://localhost");

console.log(request.method);
console.log(url.pathname);
console.log(url.searchParams.get("page"));
~~~

For a request to /articles?page=2, pathname is /articles and the page query parameter is "2". Query parameter values are strings. Validate and convert them before using them as numbers, file paths, database queries, or other sensitive inputs.

A URL parser does not decide whether a route exists. Your code still needs to match the method and pathname and choose a response.

## Route requests

A small server can use explicit conditions for each method and path.

~~~js
if (request.method === "GET" && url.pathname === "/health") {
  // Return a health response.
} else if (
  request.method === "POST" &&
  url.pathname === "/api/notes"
) {
  // Read and validate a note request.
} else {
  // Return 404 or 405 as appropriate.
}
~~~

A 404 response means the requested route was not found. A 405 response means the path is known but the method is not supported. When sending 405, include an Allow header listing accepted methods.

Keep route decisions explicit. Avoid turning an untrusted pathname into a filesystem path. If a route serves files, it needs a deliberate path resolution and access policy.

## Send a response

Set the response status and headers before writing the body. Call response.end() when the response is complete.

~~~js
const body = JSON.stringify({ message: "Ready" });

response.writeHead(200, {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
});

response.end(body);
~~~

A response can be written in chunks with response.write(), then completed with response.end(). For a JSON API, serialize the payload, set an appropriate content type, and send one complete JSON document.

Always finish the response path. If a handler neither ends the response nor destroys it, the client may wait indefinitely.

## Read a request body as a stream

IncomingMessage is a readable stream. Do not assume the whole body arrives in one chunk. Accumulate chunks when the payload is known to be small, and impose a byte limit before parsing.

~~~js
async function readJson(request, maxBytes) {
  const chunks = [];
  let size = 0;
  let tooLarge = false;

  for await (const chunk of request) {
    size += chunk.length;

    if (size > maxBytes) {
      tooLarge = true;
      continue;
    }

    chunks.push(chunk);
  }

  if (tooLarge) {
    const error = new Error("Request body is too large");
    error.statusCode = 413;
    throw error;
  }

  let value;

  try {
    value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Request body must be valid JSON");
    error.statusCode = 400;
    throw error;
  }

  return value;
}
~~~

Once the limit is exceeded, this function stops retaining additional chunks but continues reading the stream to its end. Set suitable request timeouts as well, and in a production service consider limits at the proxy or platform boundary.

Check the Content-Type header before treating the body as JSON. A content type such as application/json; charset=utf-8 identifies JSON input. If the endpoint requires JSON and receives another type, return 415 Unsupported Media Type.

Validate the parsed value after JSON.parse(). Valid JSON can still have the wrong shape. Check that the value is an object, required properties have the expected types, and each value is within the application's limits.

## Return useful status codes

| Situation | Typical status |
| --- | --- |
| Request handled successfully | 200 OK |
| New resource created | 201 Created |
| Invalid syntax or request fields | 400 Bad Request |
| Route not found | 404 Not Found |
| Method not supported for a known path | 405 Method Not Allowed |
| Request body exceeds the endpoint limit | 413 Content Too Large |
| Required content type is not supported | 415 Unsupported Media Type |
| Unexpected server failure | 500 Internal Server Error |

Choose a status that describes the result. Do not return 200 for every outcome. Keep internal stack traces and secrets out of response bodies. Log diagnostic details on the server and send a safe error message to the client.

## A complete small JSON server

This server provides a health route and an in-memory notes collection. GET /api/notes reads notes, and POST /api/notes adds a note with a validated title. The in-memory data disappears when the process stops.

~~~js
import { createServer } from "node:http";

const host = "127.0.0.1";
const port = Number(process.env.PORT ?? 3000);
const maxBodyBytes = 16 * 1024;

if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error("PORT must be an integer from 0 to 65535");
}

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
  const address = server.address();
  const actualPort = typeof address === "object" && address
    ? address.port
    : port;

  console.log("Listening on http://" + host + ":" + actualPort);
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

## Start and use the server

Save the complete server as `server.mjs` and run it with Node.js:

~~~sh
node server.mjs
~~~

Open `http://127.0.0.1:3000/health` in a browser. The server returns JSON:

~~~json
{"status":"ok"}
~~~

A request for `http://127.0.0.1:3000/api/notes?limit=1` returns the first note. To create a note, send a POST request to `/api/notes` with the `Content-Type: application/json` header and a JSON object such as `{"title":"Study request handling"}`.

The server responds with 201 Created and the new note. If the title is missing, blank, or longer than 100 characters, it responds with 400 Bad Request.

## Errors and server lifecycle

Malformed JSON is a client error, so the example returns 400. An oversized request returns 413. A request with the wrong content type returns 415. Unexpected errors are logged by the server but receive a generic 500 response.

Attach an error handler to the server. For example, attempting to listen on a port that is already in use produces a server error. Set process.exitCode when the process should exit unsuccessfully rather than forcing an immediate exit during cleanup.

On SIGINT or SIGTERM, stop accepting new connections with server.close(). Let active responses finish and allow the process to exit naturally. Shutdown code should be safe if called more than once.

## HTTPS

The node:https module provides HTTPS server and client APIs. HTTPS uses TLS, so a server needs appropriate certificate and key configuration. Do not disable certificate verification to make a connection succeed. For deployed applications, configure TLS at the Node.js server or at a trusted reverse proxy, and keep private keys out of source control.

## Common mistakes

- Treating request.url as a complete URL with a trusted origin.
- Using the Host header to construct trusted redirect targets.
- Comparing a route without checking the HTTP method.
- Returning 404 for a known route that rejects the supplied method instead of 405.
- Assuming a request body arrives in one chunk.
- Buffering unlimited input before parsing JSON.
- Trusting valid JSON without validating its shape and values.
- Returning internal exception details to clients.
- Forgetting to end a response on every route.
- Sending multiple responses from a single handler.
- Binding a learning server to every network interface without intending to expose it.
- Using plain HTTP for sensitive production traffic without a TLS boundary.

## Key points

- createServer() invokes a request handler for each incoming request.
- Incoming requests and outgoing responses are streams.
- Parse request targets with URL and a fixed base, and validate query values.
- Match both method and pathname when routing.
- Set status and headers before ending the response.
- Limit request body size, validate content type, parse JSON, and validate the resulting data.
- Use 404 for missing routes and 405 with an Allow header for unsupported methods on known routes.
- Keep internal errors out of client responses and close the server gracefully.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [128 - Worker threads, child processes, and subprocesses](128-worker-threads-child-processes-and-subprocesses.md) | [Open Q&A](../qnas/129-build-http-servers-and-handle-requests.md) | [Open example](../examples/129-build-http-servers-and-handle-requests.md) | [130 - Node.js test runner and service tests](130-node-js-test-runner-and-service-tests.md) |
