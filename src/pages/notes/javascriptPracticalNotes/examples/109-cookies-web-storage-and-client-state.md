# 109 - Cookies, Web Storage, and client state: Example

## Goal

Build a small preferences page that demonstrates **localStorage**, **sessionStorage**, the **storage** event, and a server-set **HttpOnly** cookie.

The page stores a theme preference across reloads, keeps a draft in the current page session, and can notify another same-origin tab when the preference changes. A local Node.js server sets a demo cookie and checks whether the browser sends it on a later request.

The cookie in this example is only a demonstration. It is not authentication and must not be used to protect real data.

## Files for the example

Create a folder containing **server.js** and **index.html**. Copy each complete code block into the matching file. The server uses Node.js built-in modules and needs no package installation.

## Server code: server.js

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 3000;
const origin = "http://" + HOST + ":" + PORT;

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, origin);

  if (
    request.method === "GET" &&
    (url.pathname === "/" || url.pathname === "/index.html")
  ) {
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
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/demo-session") {
    response.setHeader(
      "Set-Cookie",
      "demo_session=active; Path=/; Max-Age=3600; HttpOnly; SameSite=Lax"
    );
    sendJson(response, 200, {
      data: { message: "The server set the HttpOnly demo cookie." }
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/demo-session") {
    const cookieHeader = request.headers.cookie || "";
    const hasDemoCookie = cookieHeader
      .split(";")
      .some((part) => part.trim() === "demo_session=active");

    if (!hasDemoCookie) {
      sendJson(response, 401, {
        error: { message: "The demo cookie was not sent." }
      });
      return;
    }

    sendJson(response, 200, {
      data: { message: "The server received the HttpOnly demo cookie." }
    });
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify({
    error: { message: "Route not found." }
  }));
});

server.listen(PORT, HOST, () => {
  console.log("Open " + origin);
});
~~~

## Browser code: index.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Browser storage demo</title>
    <style>
      :root {
        font: 1rem/1.5 system-ui, sans-serif;
      }

      body {
        max-width: 46rem;
        margin: 2rem auto;
        padding: 0 1rem;
        color: #17202a;
      }

      section {
        margin: 1.5rem 0;
        padding: 1rem;
        border: 1px solid #b8c2cc;
        border-radius: 0.4rem;
      }

      label {
        display: block;
        margin: 0.75rem 0;
      }

      input,
      select,
      button {
        padding: 0.45rem;
        font: inherit;
      }

      output,
      pre {
        display: block;
        min-height: 1.5rem;
        padding: 0.6rem;
        overflow-wrap: anywhere;
        background: #f1f3f5;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Cookies and browser storage</h1>
      <p>
        Use two tabs at this same address to observe localStorage changes.
        The draft belongs to this tab's page session.
      </p>

      <section>
        <h2>localStorage preference</h2>
        <label for="theme">Theme</label>
        <select id="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <button id="save-preference" type="button">Save preference</button>
        <p id="preference-status" role="status" aria-live="polite"></p>
      </section>

      <section>
        <h2>sessionStorage draft</h2>
        <label for="draft">Temporary note</label>
        <input id="draft" type="text" autocomplete="off">
        <button id="save-draft" type="button">Save draft</button>
        <p id="draft-status" role="status" aria-live="polite"></p>
      </section>

      <section>
        <h2>Cookie set by the server</h2>
        <button id="create-cookie" type="button">Create demo cookie</button>
        <button id="check-cookie" type="button">Ask server to check cookie</button>
        <p id="cookie-status" role="status" aria-live="polite"></p>
        <h3>Cookies visible to this script</h3>
        <output id="visible-cookies"></output>
      </section>

      <section>
        <h2>Changes from another tab</h2>
        <pre id="storage-event" aria-live="polite">No storage event received.</pre>
      </section>
    </main>

    <script>
      const themeSelect = document.querySelector("#theme");
      const preferenceStatus = document.querySelector("#preference-status");
      const draftInput = document.querySelector("#draft");
      const draftStatus = document.querySelector("#draft-status");
      const cookieStatus = document.querySelector("#cookie-status");
      const visibleCookies = document.querySelector("#visible-cookies");
      const storageEventOutput = document.querySelector("#storage-event");

      function updateVisibleCookies() {
        visibleCookies.textContent =
          document.cookie || "(No script-visible cookies.)";
      }

      function loadPreference() {
        try {
          const text = localStorage.getItem("preferences");

          if (text === null) {
            themeSelect.value = "light";
            return;
          }

          const value = JSON.parse(text);

          if (value && (value.theme === "light" || value.theme === "dark")) {
            themeSelect.value = value.theme;
          }
        } catch {
          themeSelect.value = "light";
          preferenceStatus.textContent =
            "Storage is unavailable or the saved preference is invalid.";
        }
      }

      function savePreference() {
        const preference = {
          theme: themeSelect.value,
          updatedAt: new Date().toISOString()
        };

        try {
          localStorage.setItem("preferences", JSON.stringify(preference));
          preferenceStatus.textContent =
            "Preference saved. Open this page in another tab to see the storage event.";
        } catch {
          preferenceStatus.textContent =
            "The preference could not be saved in this browser.";
        }
      }

      function loadDraft() {
        try {
          draftInput.value = sessionStorage.getItem("draft") || "";
        } catch {
          draftStatus.textContent =
            "Session storage is unavailable in this browser.";
        }
      }

      function saveDraft() {
        try {
          sessionStorage.setItem("draft", draftInput.value);
          draftStatus.textContent = "Draft saved for this page session.";
        } catch {
          draftStatus.textContent =
            "The draft could not be saved in this browser.";
        }
      }

      async function createDemoCookie() {
        cookieStatus.textContent = "Asking the server to set a cookie...";

        try {
          const response = await fetch("/api/demo-session", {
            method: "POST"
          });
          const body = await response.json();

          if (!response.ok) {
            throw new Error(body.error.message);
          }

          cookieStatus.textContent = body.data.message;
          updateVisibleCookies();
        } catch (error) {
          cookieStatus.textContent = error.message;
        }
      }

      async function checkDemoCookie() {
        cookieStatus.textContent = "Asking the server to check the cookie...";

        try {
          const response = await fetch("/api/demo-session");
          const body = await response.json();

          if (!response.ok) {
            throw new Error(body.error.message);
          }

          cookieStatus.textContent = body.data.message;
        } catch (error) {
          cookieStatus.textContent = error.message;
        }
      }

      document
        .querySelector("#save-preference")
        .addEventListener("click", savePreference);

      document
        .querySelector("#save-draft")
        .addEventListener("click", saveDraft);

      document
        .querySelector("#create-cookie")
        .addEventListener("click", createDemoCookie);

      document
        .querySelector("#check-cookie")
        .addEventListener("click", checkDemoCookie);

      window.addEventListener("storage", (event) => {
        if (event.key === "preferences") {
          loadPreference();
          storageEventOutput.textContent =
            "Another page changed preferences. New value: " +
            (event.newValue || "(removed)");
        } else if (event.key === null) {
          storageEventOutput.textContent =
            "Another page cleared its storage area.";
        }
      });

      loadPreference();
      loadDraft();
      updateVisibleCookies();
    </script>
  </body>
</html>
~~~

## Run the example

1. Save both files in the same folder.
2. Open a terminal in that folder.
3. Start the server with **node server.js**.
4. Open **http://127.0.0.1:3000** in a browser.
5. Change the theme and select **Save preference**.
6. Open the same address in a second tab and change the theme there. Observe the **storage** event in the first tab.
7. Enter a draft and save it. Reload the same tab to see the session draft restored.
8. Select **Create demo cookie**, then **Ask server to check cookie**.
9. Observe that the server recognizes the cookie while the script-visible cookie output does not show the **HttpOnly** cookie.

## Expected output

After saving a preference, the page reports that it was saved. When the other tab changes that preference, the first tab reports a storage event and updates the selection.

After creating the demo cookie and checking it, the server reports:

~~~text
The server received the HttpOnly demo cookie.
~~~

The script-visible cookie area displays **(No script-visible cookies.)** because the demo cookie is **HttpOnly**. The browser still sends it with the matching same-origin request.

## What the example demonstrates

- **localStorage** keeps the theme preference across reloads and shares it with same-origin pages.
- The **storage** event notifies another page after a storage change. The page that performed the write updates itself directly.
- **sessionStorage** keeps the draft in the current page session and does not send it to the server.
- The server sets the cookie with **Set-Cookie**. The browser includes it on the later request.
- **HttpOnly** keeps the cookie value out of JavaScript cookie APIs.

The example server uses plain HTTP on the local loopback address, so the demonstration cookie omits **Secure**. In a production deployment, serve the application over HTTPS and set **Secure** on session cookies. The demo cookie is a fixed value and grants no real access. Never use it as an authentication mechanism.

## Try it yourself

- Change the theme in one tab and observe the event and selection update in another.
- Remove the preference key from one tab and handle the resulting event in the other.
- Save malformed JSON in the browser's storage tools, reload, and confirm the fallback is usable.
- Change **sessionStorage** in one tab and compare its behavior with **localStorage** in another.
- Inspect the server request headers after checking the demo cookie.
- Remove **HttpOnly** from the demo cookie and observe that its value becomes visible to script. Restore the attribute afterward.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [108 - URL, URLSearchParams, and the History API](108-url-urlsearchparams-and-the-history-api.md) | [Open lesson](../lessons/109-cookies-web-storage-and-client-state.md) | [Open Q&A](../qnas/109-cookies-web-storage-and-client-state.md) | [110 - IndexedDB and structured client storage](../lessons/110-indexeddb-and-structured-client-storage.md) |