# 107 - CORS, credentials, and cross-origin rules: Example

## Goal

Create a browser page and a small Node.js API on different ports. The page will send a JSON request that triggers a CORS preflight, receive a demo HttpOnly cookie, and use that cookie to request a profile.

The page runs at **http://127.0.0.1:3000** and the API runs at **http://127.0.0.1:4000**. The ports differ, so the requests are cross-origin. The server allows only the page's exact origin.

## Files for the example

Create a folder containing **server.js** and **index.html**. Copy each complete code block into the matching file. The server uses only Node.js built-in modules and needs no package installation.

## Server code: server.js

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const HOST = "127.0.0.1";
const PAGE_PORT = 3000;
const API_PORT = 4000;
const PAGE_ORIGIN = "http://" + HOST + ":" + PAGE_PORT;
const allowedMethods = new Set(["GET", "POST"]);
const allowedHeaders = new Set(["content-type", "x-client-name"]);

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Request-Id": randomUUID()
  });
  response.end(JSON.stringify(body));
}

function addCorsHeaders(request, response) {
  const origin = request.headers.origin;

  response.setHeader("Vary", "Origin");

  if (origin !== PAGE_ORIGIN) {
    return false;
  }

  response.setHeader("Access-Control-Allow-Origin", PAGE_ORIGIN);
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Expose-Headers", "X-Request-Id");
  return true;
}

function isAllowedPreflight(request, originAllowed) {
  if (!originAllowed) {
    return false;
  }

  const method = request.headers["access-control-request-method"] || "";
  const headerNames = (request.headers["access-control-request-headers"] || "")
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);

  return (
    allowedMethods.has(method) &&
    headerNames.every((name) => allowedHeaders.has(name))
  );
}

async function readJson(request) {
  let text = "";

  for await (const chunk of request) {
    text += chunk;
  }

  if (text === "") {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

const pageServer = createServer(async (request, response) => {
  const pathname = new URL(request.url, PAGE_ORIGIN).pathname;

  if (request.method !== "GET" || pathname !== "/") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
    return;
  }

  try {
    const page = await readFile(path.join(__dirname, "index.html"));
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(page);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Could not read index.html");
  }
});

const apiServer = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://" + HOST).pathname;
  const originAllowed = addCorsHeaders(request, response);

  if (request.method === "OPTIONS") {
    if (!isAllowedPreflight(request, originAllowed)) {
      sendJson(response, 403, {
        error: { message: "This preflight is not allowed." }
      });
      return;
    }

    response.writeHead(204, {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, x-client-name",
      "Access-Control-Max-Age": "600"
    });
    response.end();
    return;
  }

  if (request.method === "POST" && pathname === "/api/session") {
    const body = await readJson(request);

    if (!body || typeof body.requestedAt !== "string") {
      sendJson(response, 400, {
        error: { message: "A requestedAt string is required." }
      });
      return;
    }

    response.setHeader(
      "Set-Cookie",
      "demo_session=active; Path=/; HttpOnly; SameSite=Lax"
    );
    sendJson(response, 200, {
      data: { message: "Demo session cookie created." }
    });
    return;
  }

  if (request.method === "GET" && pathname === "/api/profile") {
    const hasDemoCookie = (request.headers.cookie || "")
      .split(";")
      .some((part) => part.trim() === "demo_session=active");

    if (!hasDemoCookie) {
      sendJson(response, 401, {
        error: { message: "Create the demo session first." }
      });
      return;
    }

    sendJson(response, 200, {
      data: { name: "Ada Example", role: "learner" }
    });
    return;
  }

  sendJson(response, 404, {
    error: { message: "API route not found." }
  });
});

pageServer.listen(PAGE_PORT, HOST, () => {
  console.log("Page: " + PAGE_ORIGIN);
});

apiServer.listen(API_PORT, HOST, () => {
  console.log("API:  http://" + HOST + ":" + API_PORT);
});
~~~

## Browser code: index.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CORS and credentials demo</title>
    <style>
      body {
        max-width: 42rem;
        margin: 2rem auto;
        padding: 0 1rem;
        font: 1rem/1.5 system-ui, sans-serif;
      }

      button {
        margin: 0.25rem;
        padding: 0.6rem 0.9rem;
        font: inherit;
      }

      pre {
        min-height: 5rem;
        padding: 1rem;
        overflow-wrap: anywhere;
        background: #f1f3f5;
        color: #17202a;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>CORS and credentials</h1>
      <p>
        This page is served from port 3000 and requests an API on port 4000.
        The API permits this page's origin and includes an HttpOnly demo cookie.
      </p>

      <button id="create-session" type="button">Create demo session</button>
      <button id="load-profile" type="button">Load profile</button>

      <h2>Result</h2>
      <pre id="result" role="status" aria-live="polite">Choose an action.</pre>
    </main>

    <script>
      const API_ORIGIN = "http://127.0.0.1:4000";
      const result = document.querySelector("#result");

      async function requestApi(path, options = {}) {
        const headers = new Headers(options.headers);
        headers.set("X-Client-Name", "cors-chapter-demo");

        const response = await fetch(API_ORIGIN + path, {
          ...options,
          credentials: "include",
          headers
        });

        const requestId = response.headers.get("X-Request-Id");
        const body = await response.json();

        if (!response.ok) {
          const message =
            body && body.error && body.error.message
              ? body.error.message
              : "The API request failed.";

          throw new Error(
            message + " HTTP " + response.status + ". Request ID: " + requestId
          );
        }

        return { body, requestId };
      }

      document.querySelector("#create-session").addEventListener("click", async () => {
        result.textContent = "Creating a demo session...";

        try {
          const { body, requestId } = await requestApi("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestedAt: new Date().toISOString() })
          });

          result.textContent =
            body.data.message + "\nRequest ID: " + requestId + "\n" +
            "The cookie is HttpOnly, so page JavaScript cannot read it.";
        } catch (error) {
          result.textContent = error.message;
        }
      });

      document.querySelector("#load-profile").addEventListener("click", async () => {
        result.textContent = "Loading the profile...";

        try {
          const { body, requestId } = await requestApi("/api/profile");

          result.textContent =
            JSON.stringify(body.data, null, 2) + "\nRequest ID: " + requestId;
        } catch (error) {
          result.textContent = error.message;
        }
      });
    </script>
  </body>
</html>
~~~

## Run the example

1. Save both files in the same folder.
2. Open a terminal in that folder.
3. Start the server with **node server.js**.
4. Open **http://127.0.0.1:3000** in a browser.
5. Select **Create demo session**.
6. Select **Load profile**.

This local demonstration uses HTTP and a teaching-only cookie. Do not use this session cookie as authentication in a real application. Production cookie settings depend on the deployment, HTTPS, the site's architecture, and browser privacy rules.

## What happens

The page and API use the same scheme and host but different ports. They therefore have different origins. Both browser requests include **X-Client-Name**, so the browser first sends an OPTIONS preflight. The POST also uses **Content-Type: application/json**, which is not CORS-safelisted.

The API allows only **http://127.0.0.1:3000**. It does not reflect arbitrary origins and does not use a wildcard. Its preflight response lists the supported methods and headers. The subsequent API responses also return the exact origin and **Access-Control-Allow-Credentials: true**, so the browser can share those responses with this credentialed Fetch request.

The POST response sets an **HttpOnly** cookie. The browser handles it; page JavaScript cannot read **Set-Cookie** or the cookie value. The next Fetch call uses **credentials: "include"**, allowing the browser to send the cookie if its cookie policies permit it. The server checks the cookie and returns the profile.

The server exposes **X-Request-Id**, which lets the page read the request identifier. Without **Access-Control-Expose-Headers: X-Request-Id**, the response could contain that header while **response.headers.get("X-Request-Id")** returns **null**.

## Expected output

After selecting **Create demo session**, the page displays a confirmation and a generated request ID:

~~~text
Demo session cookie created.
Request ID: 7b8d...
The cookie is HttpOnly, so page JavaScript cannot read it.
~~~

The request ID changes each time. After selecting **Load profile**, the page displays data similar to this:

~~~json
{
  "name": "Ada Example",
  "role": "learner"
}
~~~

The profile response also includes a new request ID. If you select **Load profile** before creating a session, the API returns **401** with a message that asks you to create one first.

## Inspect the preflight

Open the browser's Network panel and select **Create demo session**. You should see an **OPTIONS** request before the **POST**. Inspect these values:

- The request's **Origin** is **http://127.0.0.1:3000**.
- **Access-Control-Request-Method** is **POST**.
- **Access-Control-Request-Headers** includes **content-type** and **x-client-name**.
- The OPTIONS response permits the exact origin, **POST**, and both request headers.
- The POST response includes **Access-Control-Allow-Credentials: true** and **Access-Control-Expose-Headers: X-Request-Id**.

The browser may cache preflight permission for the duration provided by **Access-Control-Max-Age**, so a repeated request might not show another OPTIONS request immediately.

## Try a controlled failure

Change **PAGE_ORIGIN** in **server.js** to another origin, restart the server, and reload the page. The browser's Origin no longer matches the server allowlist, so the page cannot read the API response.

You can also temporarily return **Access-Control-Allow-Origin: *** while keeping **credentials: "include"**. The browser rejects that credentialed CORS response. Restore the exact origin when finished.

A CORS failure does not by itself prove the server did not process a request. Before retrying any operation that changes data, inspect the server logs and response behavior.

## Explanation

The example demonstrates both parts of a cross-origin request:

1. **Preflight permission:** The browser asks whether the origin may use the planned method and headers.
2. **Actual response permission:** After the request runs, the browser checks whether the actual response can be shared with page JavaScript.

Credentials add further requirements. The client opts in with **credentials: "include"**. The server returns an exact allowed origin and **Access-Control-Allow-Credentials: true** on the preflight and actual responses. Cookie rules still decide whether the browser sends or stores the cookie.

This is a learning example, not an authentication system. CORS configuration does not authorize the user. A production API must authenticate and authorize requests, validate input, protect cookie-authenticated state changes from CSRF where required, and use deployment-appropriate HTTPS and cookie settings.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [106 - HTTP methods, status codes, and JSON APIs](106-http-methods-status-codes-and-json-apis.md) | [Open lesson](../lessons/107-cors-credentials-and-cross-origin-rules.md) | [Open Q&A](../qnas/107-cors-credentials-and-cross-origin-rules.md) | [108 - URL, URLSearchParams, and the History API](../lessons/108-url-urlsearchparams-and-the-history-api.md) |