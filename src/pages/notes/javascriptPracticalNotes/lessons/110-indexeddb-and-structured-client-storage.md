# 110 - IndexedDB and structured client storage

IndexedDB is a browser database for structured data that is larger or more complex than a few preferences. It stores records in named object stores, supports indexes for lookups, and performs reads and writes through transactions.

This chapter explains how to open and upgrade a database, add and retrieve records, use keys and indexes, handle transaction results, and design for browser-managed storage limits.

## Learning goals

By the end of this chapter, you should be able to:

- Explain when IndexedDB is a better fit than Web Storage.
- Open a database and create its schema during an upgrade.
- Store structured records in an object store.
- Choose between **add()** and **put()**.
- Read, update, and delete data with transactions.
- Use an index for lookup by a non-primary-key field.
- Handle request errors, transaction aborts, blocked upgrades, and version changes.
- Keep transactions short and avoid using them as long-running async workflows.
- Treat browser storage as local, fallible, and untrusted.

## When to use IndexedDB

**localStorage** is useful for a few small strings such as a theme choice. IndexedDB is designed for larger collections of structured records and supports indexes and transactions.

| Need | Suitable option |
| --- | --- |
| A small string preference | **localStorage** |
| Temporary state for one page session | **sessionStorage** |
| Structured records, offline data, or indexed lookups | IndexedDB |
| Data that must be shared across devices or trusted for authorization | A server-side database |

IndexedDB is asynchronous and does not automatically send records to a server. It is scoped by origin, so a different scheme, host, or port uses a different database area. Browsers manage storage quotas and may clear data. Applications that require durable or shared data need a server-side plan as well.

## The IndexedDB data model

An IndexedDB database contains named **object stores**. Each object store contains records, each with a key and a structured value.

- A **database** has a name and a version.
- An **object store** is a collection of records.
- A **key** identifies a record within its object store.
- A **key path** tells the store which property in the record supplies its key.
- An **index** supports lookup by a property other than the primary key.
- A **transaction** groups operations and controls which stores can be read or written.

For example, a notes database might contain a **notes** object store. Each note can have an automatically generated **id** key and a **title** index for finding notes by title.

The browser stores a structured clone of values. Many normal data types can be stored, but functions and DOM nodes cannot. After reading a value, treat it as data from storage, not as a live object reference to the original.

## Open and upgrade a database

Use **indexedDB.open(name, version)** to open a connection. When the requested version is newer, the browser fires **upgradeneeded**. Create or update object stores and indexes there:

~~~js
const request = indexedDB.open("learning-notes", 1);

request.onupgradeneeded = () => {
  const database = request.result;
  const notes = database.createObjectStore("notes", {
    keyPath: "id",
    autoIncrement: true
  });

  notes.createIndex("by_title", "title", { unique: false });
};

request.onsuccess = () => {
  const database = request.result;
  console.log("Database opened:", database.name);
};

request.onerror = () => {
  console.error("Database could not be opened:", request.error);
};
~~~

Object stores and indexes can be created or removed only during a version-change upgrade transaction. Increase the version when the schema changes, and make upgrades safe to run on existing data.

Other tabs can keep an older database connection open. The upgrade can fire **blocked** until those pages close or release their connections. Listen for **versionchange** and close the connection when another page needs to upgrade:

~~~js
database.onversionchange = () => {
  database.close();
  console.log("Database connection closed for an upgrade.");
};
~~~

If an upgrade is blocked, the page using the old connection can show a message asking the user to reload or close the other tab.

## Use transactions for every operation

IndexedDB reads and writes happen through a transaction. Use **readonly** for reads and **readwrite** when changing data:

~~~js
const transaction = database.transaction("notes", "readwrite");
const notes = transaction.objectStore("notes");

notes.add({
  title: "Review object stores",
  body: "Create a record and wait for the transaction to complete."
});

transaction.oncomplete = () => {
  console.log("The write transaction committed.");
};

transaction.onabort = () => {
  console.error("The transaction was aborted:", transaction.error);
};
~~~

A transaction is atomic for its scope: if it aborts, its changes are rolled back. A successful request is not by itself the same as a committed transaction. Update the interface after the transaction's **complete** event when the full operation must be committed.

Transactions have a limited lifetime. Create requests while the transaction is active. Do not await a network request, timer, user interaction, or unrelated promise before queuing the database operations. Once the transaction has no pending work and its active task ends, it can finish. Start a new transaction for a later operation.

## Add, replace, read, and delete records

For a store with a key path and an auto-generated key, **add()** inserts a new record and fails if that key already exists. **put()** inserts or replaces a record with the same key:

~~~js
const transaction = database.transaction("notes", "readwrite");
const store = transaction.objectStore("notes");

store.add({
  title: "New note",
  body: "Use add when creating a new record."
});

store.put({
  id: 7,
  title: "Updated note",
  body: "Use put to insert or replace a record with this key."
});
~~~

A store can retrieve a record by its primary key:

~~~js
const transaction = database.transaction("notes", "readonly");
const request = transaction.objectStore("notes").get(7);

request.onsuccess = () => {
  if (request.result === undefined) {
    console.log("No matching note.");
    return;
  }

  console.log(request.result.title);
};
~~~

Use **delete(key)** to remove one record. Use **clear()** only when the intention is to remove all records from that object store:

~~~js
const transaction = database.transaction("notes", "readwrite");
transaction.objectStore("notes").delete(7);
~~~

A missing key in **get()** results in **undefined**. Check for it before reading properties.

## Query with an index

An index maps a property value to one or more records. A non-unique index can return multiple records for the same value:

~~~js
const transaction = database.transaction("notes", "readonly");
const store = transaction.objectStore("notes");
const request = store.index("by_title").getAll("Review object stores");

request.onsuccess = () => {
  console.log(request.result);
};
~~~

An index can also be used with **openCursor()** to process records without loading every matching value into one array. Use **IDBKeyRange** when a lookup should cover a range of keys.

Indexes are part of the database schema. Create or change them during **upgradeneeded**, not during an ordinary read or write transaction. Adding an index can require the browser to inspect existing records, so schema migrations should be planned.

## Handle errors and transaction completion

IndexedDB uses request events as well as transaction events:

- A request's **success** event means that particular operation succeeded.
- A request's **error** event reports a failure such as a duplicate key or invalid value.
- A transaction's **complete** event means its operations committed.
- A transaction's **abort** event means the transaction did not commit.
- A database open request's **blocked** event means another connection is holding up an upgrade.

A failed request can cause the transaction to abort unless the error is handled and default behavior is prevented. For most application operations, let the failure abort the transaction and display a useful message from the transaction's **error**.

~~~js
const transaction = database.transaction("notes", "readwrite");
const store = transaction.objectStore("notes");

store.add({
  title: "Duplicate example",
  body: "A constraint error can abort this transaction."
});

transaction.oncomplete = () => {
  console.log("Saved.");
};

transaction.onabort = () => {
  console.error("Not saved:", transaction.error);
};
~~~

Handle errors at the right level. A single request may fail; the transaction determines whether the complete set of changes committed. The browser can also reject writes because of quota or storage policy.

## Close database connections

Close connections when an application no longer needs them, or when it receives **versionchange**:

~~~js
database.onversionchange = () => {
  database.close();
};

function closeDatabase() {
  database.close();
}
~~~

Closing prevents new transactions on that connection, but transactions already created are allowed to finish. Closing connections promptly helps schema upgrades proceed across tabs.

## Storage is not a server backup

IndexedDB is local browser storage. It can help an application work offline or avoid repeated downloads, but:

- Users can clear site data.
- Browser policies can limit or evict storage.
- Different origins cannot access each other's databases.
- Data in the browser can be edited or deleted by its user.
- A local record does not prove identity or permission.

Validate records when reading them. If data matters across devices, requires central coordination, or must be trusted for authorization, synchronize with a server and enforce the rules there.

## Common mistakes

### Creating an object store outside an upgrade

Object stores and indexes are schema. Create or modify them in the **upgradeneeded** handler during a version change.

### Assuming a request success means the transaction committed

The request can succeed while another operation causes the transaction to abort. Wait for **transaction.oncomplete** before reporting the full write as saved.

### Using add when an update is intended

**add()** fails if a record with the same key already exists. Use **put()** when the desired behavior is insert-or-replace.

### Using put when duplicates should be rejected

**put()** replaces an existing record with the same key. Use **add()** when duplicate keys should result in an error.

### Keeping a transaction open across unrelated async work

Transactions are short-lived. Do not perform fetches, timers, or user prompts while expecting the same transaction to remain usable. Finish the database work, then start another transaction if needed.

### Forgetting to close a connection before an upgrade

Another tab may hold an older connection and block a version change. Handle **versionchange** by closing the old connection.

### Treating IndexedDB contents as trusted

Users and same-origin scripts can modify browser data. Validate records and enforce important rules on the server.

### Depending on browser storage as the only copy of important data

Storage can be cleared, restricted, or evicted. Keep a server copy or a recovery strategy when the data must not be lost.

## Try it yourself

1. Open a database with an object store that has a key path and auto-incrementing keys.
2. Create a non-unique index on a note's title during **upgradeneeded**.
3. Add a note and wait for the transaction's **complete** event before showing a saved message.
4. Try adding the same explicit key twice and observe the request and transaction error.
5. Use **put()** to replace a record, then read it by primary key.
6. Use the title index to find all records with the same title.
7. Open the application in two tabs, increase the database version, and observe how **blocked** and **versionchange** work.
8. Disable or restrict browser storage and make the app show a useful fallback.
9. Explain which data should be synchronized with a server instead of relying only on IndexedDB.

## Key points

- IndexedDB stores structured records in object stores and supports indexes for lookup.
- Every read and write uses a transaction.
- Create object stores and indexes only during a version upgrade.
- **add()** rejects an existing key; **put()** inserts or replaces.
- A request can succeed before its transaction commits. Observe transaction completion.
- Transactions are short-lived. Do not wait on unrelated asynchronous work inside one.
- Close old connections on **versionchange** so upgrades are not blocked.
- Browser storage is local and fallible. Validate it and do not use it as server authorization.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [109 - Cookies, Web Storage, and client state](109-cookies-web-storage-and-client-state.md) | [Open Q&A](../qnas/110-indexeddb-and-structured-client-storage.md) | [Open example](../examples/110-indexeddb-and-structured-client-storage.md) | [111 - Files, blobs, object URLs, clipboard, and downloads](111-files-blobs-object-urls-clipboard-and-downloads.md) |