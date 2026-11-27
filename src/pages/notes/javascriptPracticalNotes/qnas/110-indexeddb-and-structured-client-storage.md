# 110 - IndexedDB and structured client storage: Questions and Answers

Use these questions to review IndexedDB databases, object stores, keys, indexes, schema upgrades, and transactions. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Where are records stored in an IndexedDB database?

- A. Object stores
- B. CSS rules
- C. HTTP headers
- D. Browser history entries

**Answer: A. Object stores.**

An object store contains records and their keys.

### 2. When should an application create an object store or index?

- A. In any ordinary read transaction
- B. During the database's **upgradeneeded** event
- C. In a **popstate** handler
- D. After the first request completes

**Answer: B. During the database's upgradeneeded event.**

Schema changes use a version-change upgrade transaction.

### 3. What does **keyPath: "id"** mean?

- A. The record key comes from its **id** property
- B. The record is stored at a URL path
- C. Every record is deleted after reading
- D. The database version is named **id**

**Answer: A. The record key comes from its id property.**

A key path identifies a property in a stored value to use as its key.

### 4. What does **autoIncrement: true** provide?

- A. A generated key when one is needed
- B. A generated database name
- C. Automatic transactions for network requests
- D. A unique title index

**Answer: A. A generated key when one is needed.**

For example, a note can receive an integer **id** without the application generating it.

### 5. Which statement about **add()** and **put()** is correct?

- A. Both always reject existing keys
- B. **add()** inserts and rejects an existing key; **put()** inserts or replaces
- C. **put()** is read-only
- D. **add()** clears the entire store

**Answer: B. add() inserts and rejects an existing key; put() inserts or replaces.**

Choose the method according to whether replacement is allowed.

### 6. What is an IndexedDB index used for?

- A. Finding records by a property other than the primary key
- B. Styling object stores
- C. Sending data to a server
- D. Increasing the browser's storage quota

**Answer: A. Finding records by a property other than the primary key.**

An index maps a property value to one or more records.

### 7. Which transaction mode should be used for a read that does not change data?

- A. **readonly**
- B. **readwrite**
- C. **versionchange**
- D. **upgradeonly**

**Answer: A. readonly.**

Use **readwrite** only when the operation needs to change records.

### 8. Which event indicates that a transaction's operations committed?

- A. Request **success**
- B. Transaction **complete**
- C. Database **blocked**
- D. Request **upgradeneeded**

**Answer: B. Transaction complete.**

A request success means one request succeeded. The whole transaction can still abort before it commits.

### 9. What should the application do if an upgrade request is blocked by another tab?

- A. Assume the upgrade already completed
- B. Inform the user and ask old connections to close or reload
- C. Delete the current page
- D. Retry inside a readonly transaction

**Answer: B. Inform the user and ask old connections to close or reload.**

An older open connection can prevent the version upgrade from proceeding.

### 10. Which event should an old connection handle so a newer version can upgrade?

- A. **versionchange**
- B. **storage**
- C. **submit**
- D. **hashchange**

**Answer: A. versionchange.**

Close the connection in response so the upgrade can proceed.

### 11. What happens if **get(key)** finds no matching record?

- A. It returns an empty object
- B. It returns **undefined**
- C. It always aborts the database
- D. It returns **false**

**Answer: B. It returns undefined.**

Check for an absent record before reading its properties.

### 12. Why should an application not wait for a network request while keeping an IndexedDB transaction open?

- A. Transactions are short-lived and can become inactive when no requests are pending
- B. Fetch automatically deletes the database
- C. IndexedDB only works offline
- D. A network request changes the database version

**Answer: A. Transactions are short-lived and can become inactive.**

Finish database work in the transaction, then start a new transaction after unrelated asynchronous work if necessary.

## Objective questions

### 13. What is the event for creating or changing an IndexedDB schema?

**Answer: **upgradeneeded**.**

It runs when the requested database version is newer than the existing version.

### 14. Can an ordinary readwrite transaction create an object store?

**Answer: No.**

Object stores and indexes can be created or removed only in a version-change upgrade transaction.

### 15. What is the difference between a database key and an index?

**Answer:** A key identifies a record in its object store. An index supports lookup by another property value.

### 16. Which event confirms that an individual request succeeded?

**Answer: The request's **success** event.**

The transaction's **complete** event is needed to know that the full transaction committed.

### 17. What does a transaction's **abort** event mean?

**Answer: The transaction did not commit, and its changes were rolled back.**

An operation failure can cause the transaction to abort.

### 18. Can an IndexedDB connection in another tab block a schema upgrade?

**Answer: Yes.**

The old connection should handle **versionchange** and close. The requesting page can handle **blocked** while waiting.

### 19. Are IndexedDB records automatically sent to a server?

**Answer: No.**

IndexedDB stores data in the browser. The application must explicitly synchronize data with a server if needed.

### 20. Should a value stored in IndexedDB be trusted for authorization?

**Answer: No.**

The user and same-origin scripts can change local data. Enforce authorization on the server.

## Short-answer questions

### 21. Compare IndexedDB with localStorage.

**Answer:** **localStorage** is a simple synchronous string store. IndexedDB stores structured records, supports indexes and transactions, and is asynchronous. IndexedDB is a better fit for larger local datasets and queries.

### 22. Explain the difference between a key path and an index.

**Answer:** A key path selects a property that identifies a record in an object store. An index maps another property to record keys, allowing lookup without making that property the primary key.

### 23. When should an application use **add()** rather than **put()**?

**Answer:** Use **add()** when creating a record and duplicate keys should be rejected. Use **put()** when inserting or replacing a record with a known key.

### 24. Why should a save message normally wait for the transaction's **complete** event?

**Answer:** A request can succeed before the transaction commits. Another request or a later transaction error can still cause the whole transaction to abort. The complete event indicates the transaction committed.

### 25. What should a page do when it receives a **versionchange** event?

**Answer:** Close the connection and, if needed, tell the user to reload so the page can reopen the database using the new schema.

### 26. Why should applications plan for IndexedDB data to disappear?

**Answer:** Users can clear site data, browser policies can restrict storage, and the browser may evict data. Data that must be durable, shared, or centrally trusted should have a server-side recovery or synchronization strategy.

## Code questions

### 27. What happens when these operations run in a readwrite transaction?

~~~js
const transaction = database.transaction("notes", "readwrite");
const store = transaction.objectStore("notes");

store.add({ id: 4, title: "First" });
store.add({ id: 4, title: "Duplicate" });
~~~

**Answer:** The second **add()** request fails because key **4** already exists. Unless the error is explicitly handled and prevented from aborting the transaction, the transaction aborts and its changes do not commit.

Use **put()** if replacing the existing record is the intended behavior.

### 28. What is wrong with this save handler?

~~~js
const transaction = database.transaction("notes", "readwrite");
const store = transaction.objectStore("notes");

await fetch("/api/notes");
store.add({ title: "A note" });
~~~

**Answer:** The code waits for unrelated network work while expecting the transaction to remain active. The transaction may become inactive before **add()** is queued.

Finish the fetch first, then create a new transaction and queue the database requests.

### 29. Which value should the application check before reading **title**?

~~~js
const request = store.get(12);

request.onsuccess = () => {
  console.log(request.result.title);
};
~~~

**Answer:** Check whether **request.result** is **undefined**.

~~~js
request.onsuccess = () => {
  if (request.result === undefined) {
    console.log("No matching record.");
    return;
  }

  console.log(request.result.title);
};
~~~

A missing primary key produces no record result.

### 30. Why might this database upgrade remain blocked?

~~~js
const request = indexedDB.open("learning-notes", 2);
~~~

**Answer:** Another page may still hold an open connection to an older database version.

The other page should close its connection in **versionchange**. The page requesting the upgrade should handle **blocked** and explain what is waiting.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [109 - Cookies, Web Storage, and client state](../qnas/109-cookies-web-storage-and-client-state.md) | [Open lesson](../lessons/110-indexeddb-and-structured-client-storage.md) | [Open example](../examples/110-indexeddb-and-structured-client-storage.md) | [111 - Files, blobs, object URLs, clipboard, and downloads](../lessons/111-files-blobs-object-urls-clipboard-and-downloads.md) |