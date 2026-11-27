# 110 - IndexedDB and structured client storage: Example

## Goal

Build a small local notes app that stores structured records in IndexedDB. It can create, update, delete, list, and find notes by an indexed title.

The example demonstrates schema creation, an auto-incrementing key, a non-unique index, readonly and readwrite transactions, and waiting for a transaction to complete before updating the interface.

## Files for the example

Create a folder containing **server.js** and **index.html**. Copy each complete code block into the matching file. The server uses only Node.js built-in modules and does not persist application data on the server.

## Server code: server.js

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 3000;
const origin = "http://" + HOST + ":" + PORT;

const server = createServer(async (request, response) => {
  const url = new URL(request.url, origin);

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
    <title>IndexedDB notes</title>
    <style>
      :root {
        font: 1rem/1.5 system-ui, sans-serif;
      }

      body {
        max-width: 52rem;
        margin: 2rem auto;
        padding: 0 1rem;
        color: #17202a;
      }

      label {
        display: block;
        margin: 0.8rem 0;
      }

      input,
      textarea,
      button {
        padding: 0.5rem;
        font: inherit;
      }

      input,
      textarea {
        box-sizing: border-box;
        display: block;
        width: min(100%, 38rem);
        margin-top: 0.25rem;
      }

      textarea {
        min-height: 6rem;
      }

      button {
        margin: 0.25rem 0.5rem 0.25rem 0;
      }

      article {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid #b8c2cc;
        border-radius: 0.4rem;
      }

      article h3 {
        margin-top: 0;
      }

      [role="status"] {
        min-height: 1.5rem;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>IndexedDB notes</h1>
      <p>
        Notes are stored in this browser's IndexedDB database. They are not
        uploaded to a server.
      </p>

      <p id="database-status" role="status" aria-live="polite">
        Opening the database...
      </p>

      <section aria-labelledby="editor-heading">
        <h2 id="editor-heading">Add or edit a note</h2>
        <form id="note-form">
          <input id="note-id" type="hidden">
          <label for="note-title">
            Title
            <input id="note-title" name="title" maxlength="100" required>
          </label>
          <label for="note-body">
            Note
            <textarea id="note-body" name="body" maxlength="2000" required></textarea>
          </label>
          <button type="submit">Save note</button>
          <button id="cancel-edit" type="button">Clear form</button>
        </form>
        <p id="write-status" role="status" aria-live="polite"></p>
      </section>

      <section aria-labelledby="lookup-heading">
        <h2 id="lookup-heading">Find an exact title</h2>
        <label for="lookup-title">
          Title
          <input id="lookup-title" maxlength="100">
        </label>
        <button id="find-title" type="button">Find by indexed title</button>
        <div id="lookup-results" aria-live="polite"></div>
      </section>

      <section aria-labelledby="notes-heading">
        <h2 id="notes-heading">All notes</h2>
        <div id="notes-list" aria-live="polite"></div>
      </section>
    </main>

    <script>
      const DATABASE_NAME = "learning-notes";
      const DATABASE_VERSION = 1;

      const databaseStatus = document.querySelector("#database-status");
      const writeStatus = document.querySelector("#write-status");
      const noteForm = document.querySelector("#note-form");
      const noteIdInput = document.querySelector("#note-id");
      const titleInput = document.querySelector("#note-title");
      const bodyInput = document.querySelector("#note-body");
      const notesList = document.querySelector("#notes-list");
      const lookupTitle = document.querySelector("#lookup-title");
      const lookupResults = document.querySelector("#lookup-results");

      let database = null;

      function openDatabase() {
        return new Promise((resolve, reject) => {
          let request;

          try {
            request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
          } catch (error) {
            reject(error);
            return;
          }

          request.onupgradeneeded = () => {
            const db = request.result;
            let notes;

            if (db.objectStoreNames.contains("notes")) {
              notes = request.transaction.objectStore("notes");
            } else {
              notes = db.createObjectStore("notes", {
                keyPath: "id",
                autoIncrement: true
              });
            }

            if (!notes.indexNames.contains("by_title")) {
              notes.createIndex("by_title", "title", { unique: false });
            }
          };

          request.onblocked = () => {
            databaseStatus.textContent =
              "The database upgrade is blocked. Close other tabs using this app, then reload.";
          };

          request.onerror = () => {
            reject(request.error || new Error("Could not open the database."));
          };

          request.onsuccess = () => {
            const db = request.result;

            db.onversionchange = () => {
              db.close();
              database = null;
              databaseStatus.textContent =
                "The database changed in another page. Reload to continue.";
            };

            resolve(db);
          };
        });
      }

      function showNotes(records) {
        notesList.replaceChildren();

        if (records.length === 0) {
          const emptyMessage = document.createElement("p");
          emptyMessage.textContent = "No notes have been saved.";
          notesList.append(emptyMessage);
          return;
        }

        records.sort((first, second) => second.updatedAt - first.updatedAt);

        for (const note of records) {
          const article = document.createElement("article");
          const heading = document.createElement("h3");
          const body = document.createElement("p");
          const updated = document.createElement("p");
          const editButton = document.createElement("button");
          const deleteButton = document.createElement("button");

          heading.textContent = note.title;
          body.textContent = note.body;
          updated.textContent =
            "Updated: " + new Date(note.updatedAt).toLocaleString();

          editButton.type = "button";
          editButton.textContent = "Edit";
          editButton.addEventListener("click", () => {
            noteIdInput.value = String(note.id);
            titleInput.value = note.title;
            bodyInput.value = note.body;
            titleInput.focus();
            writeStatus.textContent = "Editing note " + note.id + ".";
          });

          deleteButton.type = "button";
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () => {
            deleteNote(note.id);
          });

          article.append(
            heading,
            body,
            updated,
            editButton,
            deleteButton
          );
          notesList.append(article);
        }
      }

      function loadNotes() {
        if (!database) {
          return;
        }

        let records = [];
        let transaction;

        try {
          transaction = database.transaction("notes", "readonly");
          const request = transaction.objectStore("notes").getAll();

          request.onsuccess = () => {
            records = request.result;
          };

          transaction.oncomplete = () => {
            showNotes(records);
          };

          transaction.onabort = () => {
            databaseStatus.textContent =
              "Could not read notes: " +
              (transaction.error ? transaction.error.message : "transaction aborted");
          };
        } catch (error) {
          databaseStatus.textContent = "Could not read notes: " + error.message;
        }
      }

      function saveNote(note) {
        if (!database) {
          writeStatus.textContent = "The database is not available.";
          return;
        }

        let transaction;

        try {
          transaction = database.transaction("notes", "readwrite");
          const store = transaction.objectStore("notes");
          const request = note.id === null
            ? store.add(note)
            : store.put({ ...note, id: note.id });

          request.onerror = () => {
            writeStatus.textContent =
              "The save request failed: " +
              (request.error ? request.error.message : "unknown error");
          };

          transaction.oncomplete = () => {
            writeStatus.textContent =
              note.id === null ? "Note added." : "Note updated.";
            noteForm.reset();
            noteIdInput.value = "";
            loadNotes();
          };

          transaction.onabort = () => {
            writeStatus.textContent =
              "The write transaction did not commit: " +
              (transaction.error ? transaction.error.message : "transaction aborted");
          };
        } catch (error) {
          writeStatus.textContent = "Could not save the note: " + error.message;
        }
      }

      function deleteNote(id) {
        if (!database) {
          writeStatus.textContent = "The database is not available.";
          return;
        }

        let transaction;

        try {
          transaction = database.transaction("notes", "readwrite");
          transaction.objectStore("notes").delete(id);

          transaction.oncomplete = () => {
            writeStatus.textContent = "Note deleted.";
            loadNotes();
          };

          transaction.onabort = () => {
            writeStatus.textContent =
              "The delete transaction did not commit: " +
              (transaction.error ? transaction.error.message : "transaction aborted");
          };
        } catch (error) {
          writeStatus.textContent = "Could not delete the note: " + error.message;
        }
      }

      function findByTitle() {
        if (!database) {
          lookupResults.textContent = "The database is not available.";
          return;
        }

        const title = lookupTitle.value.trim();

        if (title === "") {
          lookupResults.textContent = "Enter a title to search.";
          return;
        }

        let matches = [];
        let transaction;

        try {
          transaction = database.transaction("notes", "readonly");
          const index = transaction.objectStore("notes").index("by_title");
          const request = index.getAll(title);

          request.onsuccess = () => {
            matches = request.result;
          };

          transaction.oncomplete = () => {
            lookupResults.replaceChildren();

            if (matches.length === 0) {
              lookupResults.textContent = "No note has that exact title.";
              return;
            }

            for (const note of matches) {
              const result = document.createElement("p");
              result.textContent = note.title + ": " + note.body;
              lookupResults.append(result);
            }
          };

          transaction.onabort = () => {
            lookupResults.textContent =
              "The lookup failed: " +
              (transaction.error ? transaction.error.message : "transaction aborted");
          };
        } catch (error) {
          lookupResults.textContent = "Could not search notes: " + error.message;
        }
      }

      noteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();

        if (title === "" || body === "") {
          writeStatus.textContent = "Enter both a title and a note.";
          return;
        }

        const id = noteIdInput.value === ""
          ? null
          : Number(noteIdInput.value);

        saveNote({
          ...(id === null ? {} : { id }),
          title,
          body,
          updatedAt: Date.now()
        });
      });

      document.querySelector("#cancel-edit").addEventListener("click", () => {
        noteForm.reset();
        noteIdInput.value = "";
        writeStatus.textContent = "Form cleared.";
      });

      document
        .querySelector("#find-title")
        .addEventListener("click", findByTitle);

      openDatabase()
        .then((db) => {
          database = db;
          databaseStatus.textContent =
            "Database ready. Notes are stored in this browser.";
          loadNotes();
        })
        .catch((error) => {
          databaseStatus.textContent =
            "IndexedDB could not be opened: " + error.message;
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
5. Add a title and note, then select **Save note**.
6. Add another note with the same title.
7. Use **Find by indexed title** to find both matching records.
8. Edit a note and save it, then delete a note.
9. Reload the page and confirm the remaining records are still available in that browser profile.

## Expected output

After adding a note, the page displays it in **All notes** after its write transaction completes. The database assigns it an **id**. Adding another note with the same title is allowed because the **by_title** index is not unique.

Searching for that exact title returns each matching note. Editing uses **put()** with the existing key. Deleting removes the selected key. Reloading the page reads the notes from IndexedDB again.

## What the code demonstrates

- **upgradeneeded** creates the **notes** object store and **by_title** index.
- The object store uses **id** as a key path and generates ids automatically.
- Create uses **add()**. Update uses **put()**. Delete uses **delete()**.
- Each operation runs in a transaction.
- The page reports a completed write only after the transaction's **complete** event.
- The title lookup uses the index, not a scan of every record.
- The UI uses **textContent** for stored note text, so note content is treated as text rather than HTML.
- Database errors, blocked upgrades, and version changes have visible messages.

## Important limits

This example stores notes only in the browser. The data is not backed up, synchronized, or protected from its owner. Browser storage can be cleared or restricted, and same-origin scripts can read or change it.

The example server uses HTTP only to serve the local page. It does not receive or persist note contents. Do not store authorization decisions, passwords, or other secrets in IndexedDB, and do not rely on it as the only copy of important data.

## Try it yourself

- Add two notes with the same title and confirm the non-unique index returns both.
- Change the index to **unique: true** in a new database version and observe what happens if duplicate titles already exist.
- Close a connection in **versionchange** and trigger a schema upgrade from another tab.
- Modify a note's stored value in browser developer tools and verify that your application handles unexpected data.
- Change the lookup to use a cursor and display notes in index order.
- Simulate a write failure and show a useful message without claiming the note was saved.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [109 - Cookies, Web Storage, and client state](109-cookies-web-storage-and-client-state.md) | [Open lesson](../lessons/110-indexeddb-and-structured-client-storage.md) | [Open Q&A](../qnas/110-indexeddb-and-structured-client-storage.md) | [111 - Files, blobs, object URLs, clipboard, and downloads](../lessons/111-files-blobs-object-urls-clipboard-and-downloads.md) |