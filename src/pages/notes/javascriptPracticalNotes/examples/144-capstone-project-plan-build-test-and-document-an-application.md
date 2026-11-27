# Example 144 - Capstone project: plan, build, test, and document an application

## Question

How can we build and document a small reading list application with input validation, search, filters, local persistence, automated tests, and an honest account of its limits?

## Project plan

### User story

As a reader, I want to save books I plan to read and mark them finished so I can keep a simple personal reading list.

### First-version acceptance criteria

- Add a book with a title and author.
- Reject missing, whitespace-only, or overlong input.
- Mark a saved book read or unread.
- Search by title or author.
- Filter all books, unread books, or read books.
- Remove a book.
- Restore saved data after a reload when browser storage is available.
- Report storage errors without silently overwriting unreadable data.
- Use keyboard accessible controls and visible focus.
- Test the domain logic and document how to run the app.

The first version does not include accounts, cloud synchronization, a database, or backups.

## Project structure

Create these files:

~~~text
reading-list/
  index.html
  styles.css
  package.json
  server.mjs
  README.md
  src/
    app.js
    library.js
    storage.js
  test/
    library.test.js
~~~

## package.json

~~~json
{
  "name": "reading-list-capstone",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.mjs",
    "test": "node --test"
  }
}
~~~

## index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A personal reading list stored in this browser.">
  <title>My reading list</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="module" src="/src/app.js"></script>
</head>
<body>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">Personal library</p>
      <h1>My reading list</h1>
      <p>Keep track of books you plan to read and the ones you have finished.</p>
    </header>

    <section aria-labelledby="add-heading">
      <h2 id="add-heading">Add a book</h2>
      <form id="book-form">
        <div class="form-field">
          <label for="book-title">Title</label>
          <input
            id="book-title"
            name="title"
            type="text"
            required
            maxlength="120"
            autocomplete="off"
          >
        </div>

        <div class="form-field">
          <label for="book-author">Author</label>
          <input
            id="book-author"
            name="author"
            type="text"
            required
            maxlength="80"
            autocomplete="off"
          >
        </div>

        <button type="submit">Add to reading list</button>
      </form>
    </section>

    <section aria-labelledby="library-heading">
      <div class="library-heading">
        <div>
          <h2 id="library-heading">Your books</h2>
          <p id="book-count">0 books total; 0 shown.</p>
        </div>
      </div>

      <div class="view-controls">
        <div class="form-field">
          <label for="book-search">Search by title or author</label>
          <input
            id="book-search"
            type="search"
            autocomplete="off"
            placeholder="Start typing"
          >
        </div>

        <div class="form-field">
          <label for="book-filter">Show</label>
          <select id="book-filter">
            <option value="all">All books</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      <p id="empty-message" class="empty-message">
        Your reading list is empty. Add a book above.
      </p>
      <ul id="book-list" aria-labelledby="library-heading"></ul>
      <p id="app-status" class="app-status" role="status" aria-live="polite"></p>
    </section>

    <footer class="page-footer">
      <p>Your list is stored in this browser on this device.</p>
    </footer>
  </main>
</body>
</html>
~~~

## styles.css

~~~css
:root {
  color-scheme: light;
  font: 1rem/1.55 system-ui, sans-serif;
  color: #192430;
  background: #f3f6fa;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

button,
input,
select {
  min-height: 2.75rem;
  padding: 0.55rem 0.75rem;
  font: inherit;
}

button,
input,
select {
  border: 1px solid #69798b;
  border-radius: 0.4rem;
}

button {
  color: white;
  background: #174a78;
  border-color: #174a78;
  cursor: pointer;
}

button:hover {
  background: #10385c;
}

button.secondary {
  color: #192430;
  background: white;
  border-color: #69798b;
}

button.secondary:hover {
  background: #edf2f7;
}

:focus-visible {
  outline: 3px solid #075dcc;
  outline-offset: 3px;
}

.page {
  width: min(100% - 2rem, 54rem);
  margin: 0 auto;
  padding-block: 2rem 4rem;
}

.page-header {
  margin-bottom: 2rem;
}

.eyebrow {
  margin-bottom: 0.25rem;
  color: #43566b;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  line-height: 1.2;
}

h1 {
  margin-top: 0;
  font-size: clamp(2rem, 7vw, 3rem);
}

section {
  margin-block: 2rem;
}

#book-form,
.view-controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

#book-form button {
  align-self: end;
}

.form-field {
  display: grid;
  gap: 0.35rem;
}

.form-field input,
.form-field select {
  width: 100%;
  color: inherit;
  background: white;
}

.library-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.library-heading h2 {
  margin-bottom: 0.25rem;
}

#book-count,
.page-footer,
.empty-message,
.app-status {
  color: #43566b;
}

#book-count {
  margin-top: 0;
}

#book-list {
  display: grid;
  gap: 0.85rem;
  margin: 1rem 0;
  padding: 0;
  list-style: none;
}

.book-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #c5cfdb;
  border-radius: 0.55rem;
  background: white;
}

.book-card h3 {
  margin: 0 0 0.3rem;
  overflow-wrap: anywhere;
}

.book-card p {
  margin: 0.25rem 0;
}

.book-card .read-state {
  color: #43566b;
  font-size: 0.95rem;
}

.book-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: 0.5rem;
}

.empty-message {
  padding: 1rem;
  border: 1px dashed #8797a8;
  border-radius: 0.5rem;
}

.app-status {
  min-height: 1.5em;
}

.page-footer {
  margin-top: 2rem;
  border-top: 1px solid #c5cfdb;
  padding-top: 1rem;
}

@media (max-width: 38rem) {
  .page {
    width: min(100% - 1.25rem, 54rem);
    padding-top: 1.25rem;
  }

  #book-form,
  .view-controls {
    grid-template-columns: 1fr;
  }

  .book-card {
    grid-template-columns: 1fr;
  }

  .book-actions {
    justify-content: start;
  }
}
~~~

## src/library.js

~~~js
export const MAX_TITLE_LENGTH = 120;
export const MAX_AUTHOR_LENGTH = 80;

export function createBook({ id, title, author, addedAt }) {
  const cleanTitle = typeof title === "string" ? title.trim() : "";
  const cleanAuthor = typeof author === "string" ? author.trim() : "";

  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("A book needs an ID.");
  }

  if (cleanTitle === "") {
    throw new Error("Enter a book title.");
  }

  if (cleanTitle.length > MAX_TITLE_LENGTH) {
    throw new Error("The title must be 120 characters or fewer.");
  }

  if (cleanAuthor === "") {
    throw new Error("Enter an author.");
  }

  if (cleanAuthor.length > MAX_AUTHOR_LENGTH) {
    throw new Error("The author must be 80 characters or fewer.");
  }

  if (typeof addedAt !== "string" || !Number.isFinite(Date.parse(addedAt))) {
    throw new Error("The book needs a valid creation date.");
  }

  return {
    id,
    title: cleanTitle,
    author: cleanAuthor,
    read: false,
    addedAt
  };
}

export function validateBooks(value) {
  if (!Array.isArray(value)) {
    throw new Error("Saved books must be an array.");
  }

  const ids = new Set();

  for (const book of value) {
    if (
      !book ||
      typeof book !== "object" ||
      typeof book.id !== "string" ||
      book.id.trim() === "" ||
      typeof book.title !== "string" ||
      book.title.trim() === "" ||
      book.title.length > MAX_TITLE_LENGTH ||
      typeof book.author !== "string" ||
      book.author.trim() === "" ||
      book.author.length > MAX_AUTHOR_LENGTH ||
      typeof book.read !== "boolean" ||
      typeof book.addedAt !== "string" ||
      !Number.isFinite(Date.parse(book.addedAt)) ||
      ids.has(book.id)
    ) {
      throw new Error("Saved data contains an invalid or duplicate book.");
    }

    ids.add(book.id);
  }

  return value.map((book) => ({ ...book }));
}

export function filterBooks(books, { status = "all", query = "" } = {}) {
  if (!["all", "unread", "read"].includes(status)) {
    throw new Error("Unknown reading-list filter.");
  }

  const normalizedQuery = query.trim().toLocaleLowerCase();

  return books.filter((book) => {
    const matchesStatus =
      status === "all" ||
      (status === "read" && book.read) ||
      (status === "unread" && !book.read);

    const searchableText =
      (book.title + " " + book.author).toLocaleLowerCase();
    const matchesQuery = searchableText.includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}

export function setReadState(books, id, read) {
  if (typeof read !== "boolean") {
    throw new Error("The read state must be true or false.");
  }

  return books.map((book) =>
    book.id === id ? { ...book, read } : book
  );
}

export function removeBook(books, id) {
  return books.filter((book) => book.id !== id);
}
~~~

## src/storage.js

~~~js
import { validateBooks } from "./library.js";

export const STORAGE_KEY = "reading-list:v1";

export function loadBooks(storage) {
  try {
    const saved = storage.getItem(STORAGE_KEY);

    if (saved === null) {
      return {
        books: [],
        canSave: true,
        message: ""
      };
    }

    return {
      books: validateBooks(JSON.parse(saved)),
      canSave: true,
      message: ""
    };
  } catch {
    return {
      books: [],
      canSave: false,
      message:
        "Saved data could not be read. Changes will stay in this session and will not overwrite it."
    };
  }
}

export function saveBooks(storage, books) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(books));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
~~~

## src/app.js

~~~js
import {
  createBook,
  filterBooks,
  removeBook,
  setReadState
} from "./library.js";
import { loadBooks, saveBooks } from "./storage.js";

const form = document.querySelector("#book-form");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const searchInput = document.querySelector("#book-search");
const filterSelect = document.querySelector("#book-filter");
const count = document.querySelector("#book-count");
const emptyMessage = document.querySelector("#empty-message");
const bookList = document.querySelector("#book-list");
const appStatus = document.querySelector("#app-status");

let browserStorage;

try {
  browserStorage = window.localStorage;
} catch {
  browserStorage = null;
}

const saved = loadBooks(browserStorage);
const state = {
  books: saved.books,
  query: "",
  filter: "all",
  canSave: saved.canSave,
  message: saved.message || "Your reading list is ready."
};

let idCounter = 0;

function createId() {
  let id;

  do {
    id = Date.now().toString(36) + "-" + (++idCounter).toString(36);
  } while (state.books.some((book) => book.id === id));

  return id;
}

function createBookCard(book) {
  const item = document.createElement("li");
  const article = document.createElement("article");
  const details = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("p");
  const readState = document.createElement("p");
  const actions = document.createElement("div");
  const toggleButton = document.createElement("button");
  const removeButton = document.createElement("button");

  item.dataset.bookId = book.id;
  article.className = "book-card";
  title.textContent = book.title;
  author.textContent = "By " + book.author;
  readState.className = "read-state";
  readState.textContent = book.read ? "Read" : "Not read yet";

  actions.className = "book-actions";

  toggleButton.type = "button";
  toggleButton.className = "secondary";
  toggleButton.dataset.action = "toggle";
  toggleButton.dataset.bookId = book.id;
  toggleButton.textContent = book.read ? "Mark unread" : "Mark read";
  toggleButton.setAttribute(
    "aria-label",
    (book.read ? "Mark unread: " : "Mark read: ") + book.title
  );

  removeButton.type = "button";
  removeButton.className = "secondary";
  removeButton.dataset.action = "remove";
  removeButton.dataset.bookId = book.id;
  removeButton.textContent = "Remove";
  removeButton.setAttribute("aria-label", "Remove: " + book.title);

  details.append(title, author, readState);
  actions.append(toggleButton, removeButton);
  article.append(details, actions);
  item.append(article);

  return item;
}

function render() {
  const visibleBooks = filterBooks(state.books, {
    status: state.filter,
    query: state.query
  });
  const fragment = document.createDocumentFragment();

  for (const book of visibleBooks) {
    fragment.append(createBookCard(book));
  }

  bookList.replaceChildren(fragment);

  const total = state.books.length;
  const shown = visibleBooks.length;
  count.textContent =
    total + (total === 1 ? " book" : " books") +
    " total; " + shown + " shown.";

  if (total === 0) {
    emptyMessage.textContent =
      "Your reading list is empty. Add a book above.";
    emptyMessage.hidden = false;
  } else if (shown === 0) {
    emptyMessage.textContent =
      "No books match this search and filter. Try changing them.";
    emptyMessage.hidden = false;
  } else {
    emptyMessage.textContent = "";
    emptyMessage.hidden = true;
  }

  appStatus.textContent = state.message;
}

function persistAndRender(successMessage) {
  if (state.canSave) {
    const result = saveBooks(browserStorage, state.books);

    if (result.ok) {
      state.message = successMessage;
    } else {
      state.canSave = false;
      state.message =
        "This change is only in this session. Browser storage could not save it.";
    }
  } else {
    state.message =
      "This change is only in this session. The saved list could not be read.";
  }

  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const book = createBook({
      id: createId(),
      title: titleInput.value,
      author: authorInput.value,
      addedAt: new Date().toISOString()
    });

    state.books = [...state.books, book];
    form.reset();
    persistAndRender("Book added and saved.");
    titleInput.focus();
  } catch (error) {
    state.message = error.message;
    render();
    titleInput.focus();
  }
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  render();
});

filterSelect.addEventListener("change", () => {
  state.filter = filterSelect.value;
  render();
});

bookList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button || !bookList.contains(button)) {
    return;
  }

  const id = button.dataset.bookId;
  const book = state.books.find((item) => item.id === id);

  if (!book) {
    return;
  }

  if (button.dataset.action === "toggle") {
    state.books = setReadState(state.books, id, !book.read);
    persistAndRender(book.read ? "Book marked unread." : "Book marked read.");

    const refreshedButton = bookList.querySelector(
      'button[data-action="toggle"][data-book-id="' + id + '"]'
    );

    if (refreshedButton) {
      refreshedButton.focus();
    } else {
      filterSelect.focus();
    }

    return;
  }

  if (button.dataset.action === "remove") {
    const rows = Array.from(bookList.querySelectorAll("li[data-book-id]"));
    const row = button.closest("li[data-book-id]");
    const rowIndex = rows.indexOf(row);
    const nextRow = rows[rowIndex + 1];
    const previousRow = rows[rowIndex - 1];
    const nextId = nextRow ? nextRow.dataset.bookId : "";
    const previousId = previousRow ? previousRow.dataset.bookId : "";

    state.books = removeBook(state.books, id);
    persistAndRender("Book removed.");

    let focusTarget = null;

    if (nextId !== "") {
      focusTarget = bookList.querySelector(
        'button[data-action="remove"][data-book-id="' + nextId + '"]'
      );
    }

    if (!focusTarget && previousId !== "") {
      focusTarget = bookList.querySelector(
        'button[data-action="remove"][data-book-id="' + previousId + '"]'
      );
    }

    if (focusTarget) {
      focusTarget.focus();
    } else {
      titleInput.focus();
    }
  }
});

render();
~~~

## test/library.test.js

~~~js
import assert from "node:assert/strict";
import test from "node:test";
import {
  createBook,
  filterBooks,
  removeBook,
  setReadState,
  validateBooks
} from "../src/library.js";
import {
  loadBooks,
  saveBooks,
  STORAGE_KEY
} from "../src/storage.js";

function makeBook(id, title, author, read = false) {
  return {
    id,
    title,
    author,
    read,
    addedAt: "2026-11-20T12:00:00.000Z"
  };
}

test("createBook trims title and author and starts unread", () => {
  const book = createBook({
    id: "book-1",
    title: "  The Left Hand of Darkness  ",
    author: "  Ursula K. Le Guin ",
    addedAt: "2026-11-20T12:00:00.000Z"
  });

  assert.equal(book.title, "The Left Hand of Darkness");
  assert.equal(book.author, "Ursula K. Le Guin");
  assert.equal(book.read, false);
});

test("createBook rejects a whitespace-only title", () => {
  assert.throws(
    () => createBook({
      id: "book-1",
      title: "   ",
      author: "A. Writer",
      addedAt: "2026-11-20T12:00:00.000Z"
    }),
    /title/
  );
});

test("createBook rejects an overlong title", () => {
  assert.throws(
    () => createBook({
      id: "book-1",
      title: "x".repeat(121),
      author: "A. Writer",
      addedAt: "2026-11-20T12:00:00.000Z"
    }),
    /120/
  );
});

test("filterBooks matches title and author without case sensitivity", () => {
  const books = [
    makeBook("1", "The Left Hand of Darkness", "Ursula K. Le Guin"),
    makeBook("2", "Kindred", "Octavia Butler", true)
  ];

  assert.deepEqual(
    filterBooks(books, { query: "OCTAVIA" }).map((book) => book.id),
    ["2"]
  );
});

test("filterBooks selects read and unread books", () => {
  const books = [
    makeBook("1", "Book One", "Writer One"),
    makeBook("2", "Book Two", "Writer Two", true)
  ];

  assert.deepEqual(
    filterBooks(books, { status: "unread" }).map((book) => book.id),
    ["1"]
  );
  assert.deepEqual(
    filterBooks(books, { status: "read" }).map((book) => book.id),
    ["2"]
  );
});

test("setReadState returns an updated collection without mutating the input", () => {
  const original = [makeBook("1", "Book One", "Writer One")];
  const updated = setReadState(original, "1", true);

  assert.equal(original[0].read, false);
  assert.equal(updated[0].read, true);
  assert.notEqual(updated, original);
});

test("removeBook keeps other books and leaves the original collection unchanged", () => {
  const original = [
    makeBook("1", "Book One", "Writer One"),
    makeBook("2", "Book Two", "Writer Two")
  ];
  const remaining = removeBook(original, "1");

  assert.deepEqual(remaining.map((book) => book.id), ["2"]);
  assert.equal(original.length, 2);
});

test("validateBooks rejects duplicate IDs", () => {
  assert.throws(
    () => validateBooks([
      makeBook("duplicate", "Book One", "Writer One"),
      makeBook("duplicate", "Book Two", "Writer Two")
    ]),
    /invalid or duplicate/
  );
});

test("storage round-trips valid book data", () => {
  const values = new Map();
  const storage = {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    }
  };
  const books = [makeBook("1", "Book One", "Writer One")];

  assert.deepEqual(loadBooks(storage).books, []);
  assert.equal(saveBooks(storage, books).ok, true);
  assert.deepEqual(loadBooks(storage).books, books);
  assert.equal(values.has(STORAGE_KEY), true);
});

test("invalid saved JSON is not treated as writable empty storage", () => {
  const storage = {
    getItem() {
      return "{not valid JSON";
    },
    setItem() {
      assert.fail("Invalid saved data must not be overwritten.");
    }
  };

  const result = loadBooks(storage);

  assert.deepEqual(result.books, []);
  assert.equal(result.canSave, false);
  assert.match(result.message, /could not be read/);
});

test("storage write failure is reported to the caller", () => {
  const storage = {
    getItem() {
      return null;
    },
    setItem() {
      throw new Error("Storage is full.");
    }
  };

  assert.equal(saveBooks(storage, []).ok, false);
});
~~~

## server.mjs

This small development server serves the project files from the project directory. It listens only on the local machine.

~~~js
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"]
]);

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed.");
    return;
  }

  let pathname;

  try {
    pathname = decodeURIComponent(
      (request.url || "/").split("?")[0]
    );
  } catch {
    response.writeHead(400);
    response.end("Bad request.");
    return;
  }

  const relativePath =
    pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(projectRoot, relativePath);
  const relativeToRoot = path.relative(projectRoot, filePath);

  if (
    relativeToRoot === ".." ||
    relativeToRoot.startsWith(".." + path.sep) ||
    path.isAbsolute(relativeToRoot)
  ) {
    response.writeHead(403);
    response.end("Forbidden.");
    return;
  }

  let content;

  try {
    content = await readFile(filePath);
  } catch {
    response.writeHead(404);
    response.end("File not found.");
    return;
  }

  const contentType =
    contentTypes.get(path.extname(filePath)) || "application/octet-stream";

  response.writeHead(200, {
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self'; style-src 'self'; " +
      "object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
  });

  response.end(request.method === "HEAD" ? undefined : content);
});

const port = Number(process.env.PORT || 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port number.");
}

server.on("error", (error) => {
  console.error("Could not start the development server: " + error.message);
  process.exitCode = 1;
});

server.listen(port, "127.0.0.1", () => {
  console.log("Reading list is available on the local development server.");
  console.log("Port: " + port);
});
~~~

## README.md

~~~~md
# Reading list

A small browser application for saving books, tracking read status, searching, and filtering.

## Requirements

- Node.js 20 or newer
- A modern browser with JavaScript modules and local storage

## Run locally

Install dependencies:

~~~sh
npm install
~~~

This project has no external packages. Start its local development server:

~~~sh
npm run dev
~~~

Open the local address printed by the server in your browser. Keep the server running while using the app. Set the PORT environment variable to use another local port.

## Run the tests

~~~sh
npm test
~~~

The tests cover book validation, filtering, state transformations, and storage behavior. Browser keyboard, layout, and screen reader behavior still need manual review.

## Data and privacy

The reading list is stored in this browser's local storage for this origin. It is not uploaded, synchronized to another device, encrypted as a private vault, or backed up. Anyone who can use this browser profile may be able to access the list.

If browser storage is unavailable or saved data is invalid, the app warns that changes are only kept for the current session. It does not silently replace unreadable saved data.

## Project structure

- src/library.js contains book validation and transformations.
- src/storage.js contains the versioned browser storage boundary.
- src/app.js connects state, events, storage, and rendering.
- test/library.test.js contains automated domain and storage tests.
- server.mjs serves local project files for development.

## Known limitations

- There are no accounts or cross-device synchronization.
- Concurrent browser tabs can overwrite each other's saved changes.
- Browser storage can be cleared or unavailable.
- The local development server is for local development, not production hosting.
~~~~

## Expected output

- Starting the development server prints that the reading list is available and shows its port.
- The browser initially shows an empty list and a form for a title and author.
- Adding a valid book shows it with an unread state and an action to mark it read.
- Search and the status filter change which saved books are visible without deleting hidden books.
- Marking a book read changes its status and its action label.
- Removing a book updates the list and count.
- Reloading restores the saved list when browser storage is available.
- Invalid saved data or a storage failure shows a warning instead of claiming the data was saved.
- The test command runs the built-in Node.js test suite and reports each test result.

## Explanation

- **The project scope is explicit.** The requirements describe the first version and leave accounts, sync, and backups out of scope.
- **Domain logic is independent.** The library module creates and filters records without reading the DOM or browser storage.
- **State is immutable at update points.** Read-state changes and removals return new arrays, which makes behavior easy to test.
- **Storage is a boundary.** The storage module parses and validates restored data and reports failures. Invalid saved data is not automatically overwritten.
- **The UI uses semantic controls.** Labels, forms, buttons, select controls, a list, visible focus, and a polite status region support common interactions.
- **Remote or saved strings are treated as text.** Book titles and authors are assigned through text content rather than parsed as HTML.
- **Tests cover logic and storage.** The Node.js test runner checks domain functions and injected storage behavior. It does not replace browser review.
- **The local server is intentionally limited.** It serves static files on the loopback interface for development. It is not a production server.
- **The README is part of the deliverable.** It records prerequisites, run and test commands, data behavior, and known limitations.

## Try it yourself

1. Create the files using the project structure and code sections above.
2. Run the test command and review any failure before opening the app.
3. Start the local server and add several books.
4. Search by a title and then by an author's name.
5. Filter unread and read books, then mark a book read while the unread filter is selected.
6. Remove a book with the keyboard and observe where focus moves.
7. Reload the page and confirm the list is restored.
8. In developer tools, replace the saved value with malformed JSON and reload. Confirm the app warns and does not overwrite it.
9. Review the README from the perspective of someone who has just cloned the project.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [143 - Node.js project: build a command-line utility](../lessons/143-node-js-project-build-a-command-line-utility.md) | [Lesson](../lessons/144-capstone-project-plan-build-test-and-document-an-application.md) · [Q&A](../qnas/144-capstone-project-plan-build-test-and-document-an-application.md) · [Example](144-capstone-project-plan-build-test-and-document-an-application.md) | [145 - JavaScript quick reference and glossary](../lessons/145-javascript-quick-reference-and-glossary.md) |


