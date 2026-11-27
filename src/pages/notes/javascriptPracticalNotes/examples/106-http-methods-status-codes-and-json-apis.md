# 106 - HTTP methods, status codes, and JSON APIs: Example

## Goal

Build a small local JSON API and a browser page that uses **GET**, **POST**, **PUT**, **PATCH**, and **DELETE**. The server returns meaningful status codes, a **Location** header for created tasks, JSON error details, and a bodyless **204 No Content** response for deletion.

## Files for the example

Create a folder containing **server.js** and **index.html**. Copy each complete code block into the matching file. The server uses only Node.js built-in modules and stores tasks in memory, so no package installation or external API is needed.

## Server code: server.js

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const port = 3000;
let tasks = [
  { id: 1, title: "Read the HTTP lesson", completed: false },
  { id: 2, title: "Inspect a JSON response", completed: true }
];
let nextId = 3;

function sendJson(response, status, data, extraHeaders = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders
  });
  response.end(JSON.stringify(data));
}

function sendError(response, status, code, message, extraHeaders = {}) {
  sendJson(response, status, {
    error: { code, message }
  }, extraHeaders);
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
    const error = new Error("Invalid JSON request body.");
    error.statusCode = 400;
    throw error;
  }
}

function isValidTitle(value) {
  if (typeof value !== "string") {
    return false;
  }

  const title = value.trim();
  return title.length >= 2 && title.length <= 80;
}

const server = createServer(async (request, response) => {
  try {
    const pathname = request.url.split("?")[0];

    if (request.method === "GET" && pathname === "/") {
      const page = await readFile(path.join(__dirname, "index.html"));
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      });
      response.end(page);
      return;
    }

    if (pathname === "/api/tasks") {
      if (request.method === "GET") {
        sendJson(response, 200, { data: tasks });
        return;
      }

      if (request.method === "POST") {
        const body = await readJson(request);

        if (!body || !isValidTitle(body.title)) {
          sendError(
            response,
            422,
            "invalid_title",
            "Task title must contain 2 to 80 characters."
          );
          return;
        }

        const task = {
          id: nextId,
          title: body.title.trim(),
          completed: false
        };
        nextId += 1;
        tasks.push(task);

        sendJson(response, 201, { data: task }, {
          Location: "/api/tasks/" + task.id
        });
        return;
      }

      sendError(
        response,
        405,
        "method_not_allowed",
        "Use GET or POST for the task collection.",
        { Allow: "GET, POST" }
      );
      return;
    }

    const match = pathname.match(/^\/api\/tasks\/(\d+)$/);
    if (!match) {
      sendError(response, 404, "not_found", "The requested route was not found.");
      return;
    }

    const id = Number(match[1]);
    const index = tasks.findIndex((task) => task.id === id);
    const task = tasks[index];

    if (request.method === "GET") {
      if (!task) {
        sendError(response, 404, "task_not_found", "That task does not exist.");
        return;
      }

      sendJson(response, 200, { data: task });
      return;
    }

    if (request.method === "PUT") {
      if (!task) {
        sendError(response, 404, "task_not_found", "That task does not exist.");
        return;
      }

      const body = await readJson(request);
      if (!body || !isValidTitle(body.title) || typeof body.completed !== "boolean") {
        sendError(
          response,
          422,
          "invalid_task",
          "Replacement needs a valid title and a completed boolean."
        );
        return;
      }

      const replacement = {
        id,
        title: body.title.trim(),
        completed: body.completed
      };
      tasks[index] = replacement;
      sendJson(response, 200, { data: replacement });
      return;
    }

    if (request.method === "PATCH") {
      if (!task) {
        sendError(response, 404, "task_not_found", "That task does not exist.");
        return;
      }

      const body = await readJson(request);
      if (!body || typeof body.completed !== "boolean") {
        sendError(
          response,
          422,
          "invalid_patch",
          "This patch needs a completed boolean."
        );
        return;
      }

      task.completed = body.completed;
      sendJson(response, 200, { data: task });
      return;
    }

    if (request.method === "DELETE") {
      if (index === -1) {
        sendError(response, 404, "task_not_found", "That task does not exist.");
        return;
      }

      tasks.splice(index, 1);
      response.writeHead(204, { "Cache-Control": "no-store" });
      response.end();
      return;
    }

    sendError(
      response,
      405,
      "method_not_allowed",
      "Use GET, PUT, PATCH, or DELETE for a task.",
      { Allow: "GET, PUT, PATCH, DELETE" }
    );
  } catch (error) {
    const status = error.statusCode || 500;
    const code = status === 400 ? "invalid_json" : "internal_error";
    const message = status === 400
      ? "Request body must contain valid JSON."
      : "An unexpected server error occurred.";

    if (!response.headersSent) {
      sendError(response, status, code, message);
    } else {
      response.destroy();
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log("Task API listening on port " + port + ".");
});
~~~

## Browser code: index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HTTP methods and JSON API lab</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
    }

    main {
      width: min(100%, 54rem);
      margin-inline: auto;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 0.75rem;
      margin-block: 1.5rem;
      padding: 1rem;
      border: 1px solid currentColor;
      border-radius: 0.6rem;
    }

    form label {
      display: grid;
      flex: 1 1 16rem;
      gap: 0.4rem;
    }

    input,
    button {
      min-height: 2.5rem;
      padding: 0.5rem 0.7rem;
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    ul {
      display: grid;
      gap: 0.75rem;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 0.6rem;
      padding: 0.85rem;
      border: 1px solid currentColor;
      border-radius: 0.6rem;
    }

    li.completed strong {
      text-decoration: line-through;
      opacity: 0.7;
    }

    .task-title {
      flex: 1 1 100%;
    }

    .title-editor {
      display: grid;
      flex: 1 1 14rem;
      gap: 0.35rem;
    }

    #status {
      min-height: 1.5em;
    }
  </style>
</head>
<body>
  <main>
    <h1>Task API</h1>
    <p>Create tasks and change them using different HTTP methods.</p>

    <form id="new-task-form">
      <label for="new-task-title">
        New task title
        <input id="new-task-title" name="title" minlength="2" maxlength="80" required>
      </label>
      <button type="submit">Create task</button>
    </form>

    <p id="status" role="status" aria-live="polite">Loading tasks...</p>
    <ul id="tasks" aria-label="Tasks"></ul>
  </main>

  <script>
    const form = document.querySelector("#new-task-form");
    const newTaskTitle = document.querySelector("#new-task-title");
    const status = document.querySelector("#status");
    const taskList = document.querySelector("#tasks");

    async function api(path, options = {}) {
      const headers = new Headers(options.headers);
      headers.set("Accept", "application/json");

      if (options.body !== undefined) {
        headers.set("Content-Type", "application/json");
      }

      const response = await fetch(path, {
        ...options,
        headers
      });

      if (response.status === 204) {
        return null;
      }

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const message =
          result &&
          typeof result === "object" &&
          result.error &&
          typeof result.error.message === "string"
            ? result.error.message
            : "Request failed with HTTP " + response.status;
        throw new Error(message);
      }

      return result.data;
    }

    function makeButton(action, text, accessibleName) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.action = action;
      button.textContent = text;
      button.setAttribute("aria-label", accessibleName);
      return button;
    }

    function renderTasks(tasks) {
      taskList.replaceChildren();

      for (const task of tasks) {
        const row = document.createElement("li");
        const title = document.createElement("strong");
        const label = document.createElement("label");
        const labelText = document.createElement("span");
        const titleInput = document.createElement("input");

        row.dataset.taskId = String(task.id);
        row.dataset.completed = String(task.completed);
        if (task.completed) {
          row.classList.add("completed");
        }

        title.className = "task-title";
        title.textContent = task.title;
        label.className = "title-editor";
        labelText.textContent = "Replacement title";
        titleInput.value = task.title;
        titleInput.setAttribute("aria-label", "Replacement title for " + task.title);
        label.append(labelText, titleInput);

        const replaceButton = makeButton(
          "replace",
          "Replace title",
          "Replace title for " + task.title
        );
        const toggleButton = makeButton(
          "toggle",
          task.completed ? "Mark incomplete" : "Mark complete",
          (task.completed ? "Mark " + task.title + " incomplete" : "Mark " + task.title + " complete")
        );
        const deleteButton = makeButton(
          "delete",
          "Delete",
          "Delete " + task.title
        );

        row.append(title, label, replaceButton, toggleButton, deleteButton);
        taskList.append(row);
      }
    }

    async function refreshTasks(announce = true) {
      const tasks = await api("/api/tasks");
      renderTasks(tasks);

      if (announce) {
        status.textContent = "Loaded " + tasks.length + " tasks.";
      }
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const title = newTaskTitle.value.trim();

      try {
        const task = await api("/api/tasks", {
          method: "POST",
          body: JSON.stringify({ title })
        });

        form.reset();
        await refreshTasks(false);
        status.textContent = "Created task " + task.id + ".";
      } catch (error) {
        status.textContent = "Could not create the task: " + error.message;
      }
    });

    taskList.addEventListener("click", async function (event) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const button = event.target.closest("button[data-action]");
      if (!button || !taskList.contains(button)) {
        return;
      }

      const row = button.closest("li[data-task-id]");
      if (!row || !taskList.contains(row)) {
        return;
      }

      const id = row.dataset.taskId;
      const titleInput = row.querySelector("input");

      try {
        if (button.dataset.action === "replace") {
          const title = titleInput.value.trim();
          if (title.length < 2 || title.length > 80) {
            status.textContent = "A task title must contain 2 to 80 characters.";
            titleInput.focus();
            return;
          }

          await api("/api/tasks/" + id, {
            method: "PUT",
            body: JSON.stringify({
              title,
              completed: row.dataset.completed === "true"
            })
          });
          await refreshTasks(false);
          status.textContent = "Replaced task " + id + " with the full task representation.";
          return;
        }

        if (button.dataset.action === "toggle") {
          const completed = row.dataset.completed !== "true";
          await api("/api/tasks/" + id, {
            method: "PATCH",
            body: JSON.stringify({ completed })
          });
          await refreshTasks(false);
          status.textContent = "Updated task " + id + " with PATCH.";
          return;
        }

        if (button.dataset.action === "delete") {
          await api("/api/tasks/" + id, { method: "DELETE" });
          await refreshTasks(false);
          status.textContent = "Deleted task " + id + ". The response had no body.";
        }
      } catch (error) {
        status.textContent = "Could not update the task: " + error.message;
      }
    });

    refreshTasks().catch((error) => {
      status.textContent = "Could not load tasks: " + error.message;
    });
  </script>
</body>
</html>
~~~

## Run the example

1. Save **server.js** and **index.html** in the same folder.
2. Open a terminal in that folder and run **node server.js**.
3. Open **127.0.0.1:3000** in a browser.
4. Use the form to create a task. Edit a title and select **Replace title**, change completion with its button, or delete a task.
5. Inspect the browser's Network panel to see request methods, JSON bodies, status codes, and response headers.
6. Stop the server with **Ctrl+C**. Its task list is stored in memory, so restarting it restores the original two tasks.

## Expected output

- The initial GET request returns **200 OK** and a JSON object containing two tasks.
- Creating a task sends POST with a JSON body and receives **201 Created**, a **Location** header, and the new task.
- Replacing a task uses PUT and sends the complete task representation. The server returns **200 OK** and the updated task.
- Changing a task's completion value uses PATCH and returns **200 OK**.
- Deleting a task uses DELETE and returns **204 No Content** with no body.
- Sending a title shorter than two characters from a modified client receives **422 Unprocessable Content** with a JSON error object.
- Sending an unsupported method receives **405 Method Not Allowed** with an **Allow** header.

## How it works

1. The Node server serves **index.html** and routes requests under **/api/tasks**.
2. **sendJson()** gives JSON responses the **application/json** content type. Error responses use the same predictable **error.code** and **error.message** shape.
3. The collection GET returns the current list. POST validates the title, creates an id, and responds with **201** and a **Location** header.
4. PUT validates and replaces the complete task representation. PATCH changes only the completion value. DELETE removes the task and sends **204** without a JSON body.
5. Unsupported methods return **405** and list the allowed methods in **Allow**. Unknown task ids return **404**.
6. The browser's **api()** helper sends **Accept** with each request and **Content-Type** when it sends JSON. It checks the status, parses JSON, and handles 204 separately.
7. The create form sends POST. The buttons send PUT, PATCH, and DELETE. After each change, the page loads the collection again with GET.
8. The client validates input for usability, and the server repeats validation because client-side checks can be bypassed.

## Try it yourself

1. Change the server's POST response from **201** to **200** and compare the meaning of the result.
2. Delete a task twice. The first request returns 204, and the next returns 404 because the task is already absent.
3. Send an invalid JSON body from the browser console and inspect the server's 400 JSON error.
4. Send a method not listed by the route and inspect the **405** status and **Allow** header.
5. Change the PATCH operation to increment a number. Explain why repeating that patch may not be idempotent.
6. Restart the server and explain why the tasks return to their initial values.
7. Add a field to a task and decide whether PUT should require the complete updated representation.
8. Inspect the API responses and verify that the 204 response has no body to parse.

## Key points

- Methods express intent and carry different safe and idempotent semantics.
- The status code and response body work together to describe an API result.
- JSON requests need serialization and an appropriate content type.
- A 201 response can identify a created resource with **Location**.
- A 204 response has no body, so the client must not try to parse it.
- Validate data on the server even when the page has client-side checks.
- This local server binds to the loopback address and stores data only in memory.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [105 - Fetch API: requests, responses, and headers](105-fetch-api-requests-responses-and-headers.md) | [Open lesson](../lessons/106-http-methods-status-codes-and-json-apis.md) | [Open Q&A](../qnas/106-http-methods-status-codes-and-json-apis.md) | [107 - CORS, credentials, and cross-origin rules](../lessons/107-cors-credentials-and-cross-origin-rules.md) |