# 108 - URL, URLSearchParams, and the History API: Example

## Goal

Build a small searchable catalog that keeps its search text and selected topics in the URL. The example uses **URL**, **URLSearchParams**, **history.pushState()**, **history.replaceState()**, and **popstate**.

The search text uses one **q** parameter. Topic filters use repeated **topic** parameters, such as **topic=query&topic=history**. The page restores those values from the URL after reload and after Back or Forward.

## Files for the example

Create a folder containing **server.js** and **index.html**. Copy each complete code block into the matching file. The server uses only Node.js built-in modules.

## Server code: server.js

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 3000;

const server = createServer(async (request, response) => {
  const url = new URL(request.url, "http://" + HOST + ":" + PORT);

  if (
    request.method !== "GET" ||
    (url.pathname !== "/" && url.pathname !== "/index.html")
  ) {
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

server.listen(PORT, HOST, () => {
  console.log("Open http://" + HOST + ":" + PORT);
});
~~~

## Browser code: index.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>URL and History API catalog</title>
    <style>
      :root {
        color-scheme: light;
        font: 1rem/1.5 system-ui, sans-serif;
      }

      body {
        max-width: 54rem;
        margin: 2rem auto;
        padding: 0 1rem;
        color: #17202a;
      }

      fieldset {
        margin: 1rem 0;
        padding: 1rem;
      }

      label {
        margin-right: 1rem;
      }

      input[type="search"] {
        display: block;
        width: min(100%, 32rem);
        margin-top: 0.35rem;
        padding: 0.6rem;
        font: inherit;
      }

      button {
        margin: 0.25rem 0.5rem 0.25rem 0;
        padding: 0.55rem 0.85rem;
        font: inherit;
      }

      #current-url {
        display: block;
        padding: 0.75rem;
        overflow-wrap: anywhere;
        background: #f1f3f5;
      }

      #results {
        display: grid;
        gap: 0.75rem;
        padding: 0;
        list-style: none;
      }

      #results li {
        padding: 1rem;
        border: 1px solid #b8c2cc;
        border-radius: 0.4rem;
      }

      #results h3 {
        margin: 0 0 0.35rem;
      }

      #status {
        min-height: 1.5rem;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>JavaScript learning catalog</h1>
      <p>
        Search the entries and select one or more topics. The current view is
        stored in the URL, so you can reload it or use browser history.
      </p>

      <form id="filters">
        <label for="query">
          Search titles and descriptions
          <input id="query" name="q" type="search" autocomplete="off">
        </label>

        <fieldset>
          <legend>Topics</legend>
          <label><input type="checkbox" name="topic" value="url"> URLs</label>
          <label><input type="checkbox" name="topic" value="query"> Queries</label>
          <label><input type="checkbox" name="topic" value="history"> History</label>
        </fieldset>

        <button type="submit">Apply filters</button>
        <button id="clear" type="button">Clear filters</button>
      </form>

      <p id="status" role="status" aria-live="polite"></p>

      <h2>Current URL</h2>
      <output id="current-url"></output>

      <h2>Results</h2>
      <p id="result-count"></p>
      <ul id="results"></ul>
    </main>

    <script>
      const entries = [
        {
          title: "Parse an absolute URL",
          description: "Inspect the origin, path, query, and fragment.",
          topics: ["url"]
        },
        {
          title: "Resolve a relative URL",
          description: "Use a base URL to resolve a relative path.",
          topics: ["url"]
        },
        {
          title: "Search with URLSearchParams",
          description: "Build and read query parameters without string concatenation.",
          topics: ["url", "query"]
        },
        {
          title: "Handle repeated query keys",
          description: "Use getAll and append for multiple selected filters.",
          topics: ["query"]
        },
        {
          title: "Add a history entry",
          description: "Use pushState to add a same-document navigation state.",
          topics: ["history"]
        },
        {
          title: "Restore state with popstate",
          description: "Update the interface after Back and Forward traversal.",
          topics: ["history", "query"]
        }
      ];

      const form = document.querySelector("#filters");
      const queryInput = document.querySelector("#query");
      const topicInputs = [...form.querySelectorAll('input[name="topic"]')];
      const resultsList = document.querySelector("#results");
      const resultCount = document.querySelector("#result-count");
      const currentUrl = document.querySelector("#current-url");
      const status = document.querySelector("#status");

      function readFiltersFromUrl() {
        const url = new URL(window.location.href);

        return {
          query: url.searchParams.get("q") || "",
          topics: url.searchParams.getAll("topic")
        };
      }

      function readFiltersFromForm() {
        return {
          query: queryInput.value.trim(),
          topics: topicInputs
            .filter((input) => input.checked)
            .map((input) => input.value)
        };
      }

      function syncForm(filters) {
        queryInput.value = filters.query;

        for (const input of topicInputs) {
          input.checked = filters.topics.includes(input.value);
        }
      }

      function updateUrl(filters) {
        const url = new URL(window.location.href);

        url.searchParams.delete("q");
        url.searchParams.delete("topic");

        if (filters.query) {
          url.searchParams.set("q", filters.query);
        }

        for (const topic of filters.topics) {
          url.searchParams.append("topic", topic);
        }

        return url;
      }

      function render(filters) {
        const normalizedQuery = filters.query.toLocaleLowerCase();
        const matchingEntries = entries.filter((entry) => {
          const text = (entry.title + " " + entry.description).toLocaleLowerCase();
          const matchesQuery = text.includes(normalizedQuery);
          const matchesTopics =
            filters.topics.length === 0 ||
            filters.topics.some((topic) => entry.topics.includes(topic));

          return matchesQuery && matchesTopics;
        });

        resultsList.replaceChildren();

        for (const entry of matchingEntries) {
          const item = document.createElement("li");
          const title = document.createElement("h3");
          const description = document.createElement("p");

          title.textContent = entry.title;
          description.textContent = entry.description;
          item.append(title, description);
          resultsList.append(item);
        }

        resultCount.textContent =
          matchingEntries.length + " result(s) shown.";
        currentUrl.textContent = window.location.href;
      }

      function saveFilters(mode) {
        const filters = readFiltersFromForm();
        const url = updateUrl(filters);
        const state = {
          query: filters.query,
          topics: filters.topics
        };

        if (mode === "replace") {
          history.replaceState(state, "", url);
          status.textContent = "Updated the current history entry.";
        } else {
          history.pushState(state, "", url);
          status.textContent = "Added a history entry.";
        }

        render(filters);
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        saveFilters("push");
      });

      document.querySelector("#clear").addEventListener("click", () => {
        form.reset();
        saveFilters("push");
      });

      window.addEventListener("popstate", () => {
        const filters = readFiltersFromUrl();
        syncForm(filters);
        render(filters);
        status.textContent = "Restored filters from the current URL.";
      });

      const initialFilters = readFiltersFromUrl();
      history.replaceState(
        { query: initialFilters.query, topics: initialFilters.topics },
        "",
        window.location.href
      );
      syncForm(initialFilters);
      render(initialFilters);
    </script>
  </body>
</html>
~~~

## Run the example

1. Save both files in the same folder.
2. Open a terminal in that folder.
3. Start the server with **node server.js**.
4. Open **http://127.0.0.1:3000** in a browser.
5. Enter **URL** in the search field and select **Queries** and **History**.
6. Select **Apply filters**.
7. Use the browser's Back and Forward buttons to restore earlier filters.
8. Copy the current URL into a new tab or reload the page to restore the same filtered view.

## Expected output

After applying the example filters, the address bar contains a URL similar to:

~~~text
http://127.0.0.1:3000/?q=URL&topic=query&topic=history
~~~

The page displays the current URL and matching entries. It uses **getAll("topic")** to read both topic values. Back restores the previous filter state, and Forward restores the newer state.

If you reload the filtered URL, the page reads the query string during initialization and checks the matching controls. The server serves the same page at the root path, so this example's query-only URL also works as a direct link.

## Explanation

**URL** parses the current address. Its **searchParams** property provides a **URLSearchParams** object tied to the URL. The example deletes the old filter values, adds the current search text with **set()**, and adds each selected topic with **append()**.

The search form's submit event calls **history.pushState()**. This adds a history entry and changes the address bar without loading another document. The function then renders the new results because **pushState()** does not fire **popstate**.

When Back or Forward activates a different history entry, the **popstate** listener reads the URL, updates the controls, and renders again. On page load, the app also reads the URL, so a copied or reloaded link restores the same view.

The example uses **textContent** when inserting catalog text. In a real app, continue treating query values as untrusted input and validate them before using them in security-sensitive operations.

## Try a replace instead of a push

The example uses **pushState()** so every submitted filter state can be revisited with Back. To update the current entry instead, change the form submit handler to call:

~~~js
saveFilters("replace");
~~~

The displayed URL and results will update, but the previous filter entry will not be added to the history stack. Use the behavior that matches the navigation your interface promises.

## Common mistakes shown here

- **get()** would return only the first topic. The app uses **getAll()** for repeated values.
- Concatenating query strings manually can confuse data characters with separators. The app uses **URLSearchParams**.
- Calling **pushState()** does not render the page or dispatch **popstate**. The app explicitly calls **render()**.
- Reading only an in-memory variable would lose the filters on reload. The app restores them from the URL.
- Treating query values as trusted data would be unsafe. The example uses them only as ordinary search filters.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [107 - CORS, credentials, and cross-origin rules](107-cors-credentials-and-cross-origin-rules.md) | [Open lesson](../lessons/108-url-urlsearchparams-and-the-history-api.md) | [Open Q&A](../qnas/108-url-urlsearchparams-and-the-history-api.md) | [109 - Cookies, Web Storage, and client state](../lessons/109-cookies-web-storage-and-client-state.md) |