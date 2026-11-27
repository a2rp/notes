# 109 - Cookies, Web Storage, and client state

Browsers can keep small pieces of state between page loads. Cookies are managed by the browser and can be sent with matching HTTP requests. **localStorage** and **sessionStorage** are JavaScript-accessible key-value stores that are not automatically added to requests.

This chapter compares these storage options, shows how to safely store structured values, explains cookie attributes, and demonstrates how same-origin pages can react to local storage changes.

## Learning goals

By the end of this chapter, you should be able to:

- Compare cookies, **localStorage**, and **sessionStorage**.
- Explain how browser storage is scoped and how long it usually lasts.
- Store and parse structured values with JSON.
- Handle missing, invalid, or unavailable stored data.
- Listen for the **storage** event in another same-origin document.
- Describe cookie attributes such as **HttpOnly**, **Secure**, **SameSite**, **Path**, and **Max-Age**.
- Choose storage based on who needs the data and when it must be sent.
- Avoid treating client-side storage as trusted or secure application data.

## Choose storage by how it is used

| Storage | Read and written by | Automatically sent with HTTP requests? | Typical lifetime |
| --- | --- | --- | --- |
| Cookie | Browser and, unless **HttpOnly**, JavaScript | Yes, when the cookie matches the request and browser policy allows it | Until the session ends or its expiry is reached |
| **localStorage** | JavaScript | No | Across page loads and browser restarts, unless removed or cleared |
| **sessionStorage** | JavaScript | No | For a page session, usually associated with one tab |

These are different tools with different access rules. Cookies are useful when the server needs state on later requests. Web Storage is useful for small client-side preferences or temporary interface state.

Storage can be unavailable because of browser settings, origin restrictions, private browsing behavior, quota limits, or other policies. Treat it as an optional convenience, not a permanent database.

## Web Storage stores strings

Both **localStorage** and **sessionStorage** expose a **Storage** object. Its common methods are:

| Method or property | Purpose |
| --- | --- |
| **setItem(key, value)** | Store a value under a key. The value is converted to a string. |
| **getItem(key)** | Return the string value, or **null** if the key is missing. |
| **removeItem(key)** | Delete one key. |
| **clear()** | Delete all entries for this storage area. |
| **length** | Number of stored entries. |
| **key(index)** | Return the key at an index, or **null**. |

A plain JavaScript object is not stored as an object. It is converted to a string, which is usually not useful. Use JSON for data structures:

~~~js
const preferences = {
  theme: "dark",
  compact: true
};

localStorage.setItem("preferences", JSON.stringify(preferences));

const savedText = localStorage.getItem("preferences");
const savedPreferences =
  savedText === null ? null : JSON.parse(savedText);
~~~

**JSON.parse()** can throw if the stored text is malformed. Stored data can be edited by the user, corrupted, or left over from an older version of the application. Validate its shape before using it.

## Handle unavailable or invalid storage

Accessing storage and writing to it can throw. Wrap operations that may fail and provide a usable fallback:

~~~js
const defaultPreferences = {
  theme: "light",
  compact: false
};

function readPreferences() {
  try {
    const text = localStorage.getItem("preferences");

    if (text === null) {
      return defaultPreferences;
    }

    const value = JSON.parse(text);

    if (
      value === null ||
      typeof value !== "object" ||
      (value.theme !== "light" && value.theme !== "dark") ||
      typeof value.compact !== "boolean"
    ) {
      return defaultPreferences;
    }

    return value;
  } catch {
    return defaultPreferences;
  }
}

function savePreferences(preferences) {
  try {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    return true;
  } catch {
    return false;
  }
}
~~~

Keep stored data small. Web Storage operations are synchronous, and browsers can reject writes that exceed available storage. Do not depend on a particular quota or assume the browser will preserve data forever.

Do not store secrets or authorization decisions in **localStorage**. Any script running in the page can read it, including injected script. Client-side values are also editable through developer tools. Server-side code must validate and authorize important operations.

## localStorage and sessionStorage

Both storage areas are scoped to an origin. An origin is the scheme, host, and port. A page on a different port does not share the same storage area.

| Property | **localStorage** | **sessionStorage** |
| --- | --- | --- |
| Scope | Origin | Origin and page session |
| Typical use | Theme, language, dismissed notices | Temporary form draft or state for the current tab session |
| Survives reload? | Yes, generally | Yes, for that page session |
| Shared with another same-origin tab? | Yes | Usually no, each top-level page session has its own area |
| Sent automatically to a server? | No | No |

The browser or user can clear either area. Do not use Web Storage for large files, sensitive credentials, or data that must be durably synchronized between devices. Use a server or a database designed for that need.

## React to changes in another page

When a storage area changes, the browser dispatches a **storage** event to other documents that share the storage area. The event does not fire in the same document that performed the change.

~~~js
window.addEventListener("storage", (event) => {
  if (event.storageArea !== localStorage) {
    return;
  }

  if (event.key === "preferences") {
    console.log("New value:", event.newValue);
  }

  if (event.key === null) {
    console.log("The storage area was cleared.");
  }
});
~~~

A storage event can help another same-origin tab refresh its view. It is not a reliable cross-tab locking or transaction system. Two tabs can read and write at the same time, so do not use a read-modify-write sequence as a unique ID generator or concurrency control mechanism.

The event's **key**, **oldValue**, and **newValue** describe the change. For a **clear()** operation, **key** is **null**. Use the storage event as a notification and read the current storage value again if the application needs the latest data.

## Cookies

A server sets a cookie with the **Set-Cookie** response header. The browser stores it and can include its name and value in a later **Cookie** request header when its scope and browser policies match.

~~~http
HTTP/1.1 200 OK
Set-Cookie: session_id=example-value; Path=/; Max-Age=3600; Secure; HttpOnly; SameSite=Lax
~~~

The browser sends matching cookies automatically. Frontend JavaScript cannot set the **Cookie** request header directly. JavaScript can read and write some cookies through **document.cookie**, but cookies marked **HttpOnly** are intentionally unavailable to script.

A cookie's attributes describe its scope and handling:

| Attribute | Purpose |
| --- | --- |
| **Domain** | Broadens which hosts may receive the cookie when explicitly set. Omitting it usually keeps the cookie host-only. |
| **Path** | Limits requests to matching paths. It is not a security boundary. |
| **Expires** or **Max-Age** | Gives a cookie an expiry time. Without a persistent expiry, it is generally a session cookie. |
| **Secure** | Restricts sending the cookie to secure channels, typically HTTPS. |
| **HttpOnly** | Prevents access through JavaScript cookie APIs. It does not prevent the browser from sending the cookie to the server. |
| **SameSite** | Restricts when the browser sends a cookie in cross-site contexts. |

Common **SameSite** values are:

- **Strict** limits sending to same-site requests.
- **Lax** allows same-site requests and some cross-site top-level navigations using safe methods.
- **None** allows cross-site use, and current browsers require **Secure** with it.

Cookie delivery is still subject to browser privacy settings and cookie policy. A cookie's **Path** attribute is not a substitute for authorization. When multiple applications or subdomains are involved, choose cookie scope deliberately.

For production session cookies, use HTTPS and set **Secure** and **HttpOnly**. Choose a suitable **SameSite** policy and add appropriate CSRF defenses for state-changing actions. **SameSite** helps reduce some cross-site request risks, but it does not replace application authorization or every CSRF defense.

## Read a JavaScript-visible cookie

**document.cookie** returns the cookies available to script for the current document as a string. It does not reveal **HttpOnly** cookies:

~~~js
console.log(document.cookie);
// For example: "theme=dark; language=en"
~~~

A script can set a non-HttpOnly cookie by assigning a cookie string:

~~~js
document.cookie =
  "theme=dark; Path=/; Max-Age=2592000; SameSite=Lax";
~~~

That assignment does not create an **HttpOnly** cookie. Only the server can set **HttpOnly** with **Set-Cookie**. Avoid hand-parsing cookie strings for security-sensitive logic, and do not expose session identifiers to scripts unless the application's design explicitly requires that risk.

## Select the right mechanism

Ask these questions before storing a value:

1. Does the server need the value on a later HTTP request? If yes, a cookie may be appropriate.
2. Does JavaScript need to read and write it? If yes, consider Web Storage for small non-sensitive client state.
3. Should it survive reloads or browser restarts? **localStorage** usually survives restarts; **sessionStorage** is scoped to a page session.
4. Is the value sensitive or security-critical? Do not trust client storage. Keep authorization decisions on the server.
5. Can the value be recomputed or fetched again? Prefer not to persist it if persistence adds risk without a clear benefit.

Storage is a cache or communication mechanism, not a source of truth for access control. Treat everything a client can modify as untrusted input.

## Common mistakes

### Storing an object without JSON

Storage keeps strings. **setItem("settings", object)** stores a generic string representation rather than the object's properties. Use **JSON.stringify()** and **JSON.parse()**.

### Assuming JSON.parse always succeeds

Storage content can be malformed or outdated. Catch parse errors and validate expected fields before use.

### Assuming localStorage is permanent

A user can clear it, a browser can restrict it, and writes can fail. Provide defaults or refetch necessary data.

### Storing large or sensitive values in Web Storage

Web Storage is synchronous, limited, and readable by scripts on the page. Keep values small and avoid secrets.

### Expecting storage events in the writing tab

The event notifies other documents sharing the area. Update the current page directly after writing.

### Treating cookie Path as access control

Path controls where a cookie is sent. It does not stop another application from accessing a sensitive resource. Enforce authorization on the server.

### Assuming HttpOnly makes cookies impossible to misuse

HttpOnly blocks script reads, but the browser still sends the cookie on matching requests. Protect cookie-authenticated state changes against CSRF where required.

### Putting session identifiers in localStorage

JavaScript can read localStorage. An XSS flaw can expose its contents. Choose a session design carefully and enforce authorization on the server.

### Forgetting the browser may block or omit cookies

Cookie scope, SameSite, Secure, user settings, and privacy controls affect delivery. Check browser storage and the actual request headers while debugging.

## Try it yourself

1. Save a theme preference with **localStorage.setItem()**, reload, and restore it with **getItem()**.
2. Store an object using JSON, then corrupt its stored text and verify your fallback handles the parse error.
3. Save a temporary draft with **sessionStorage** and reload the same tab.
4. Open a second same-origin tab, change **localStorage** in one tab, and observe the **storage** event in the other.
5. Call **clear()** and inspect the storage event's **key**.
6. Set a cookie with **Path**, **Max-Age**, and **SameSite**, then inspect it in browser developer tools.
7. Compare what **document.cookie** displays with what the server receives when a cookie is **HttpOnly**.
8. Disable or block storage in browser settings and confirm that the interface still has a usable default.
9. Explain why a stored role or permission must not be used as proof of authorization.

## Key points

- Cookies are managed by the browser and can be sent automatically with matching HTTP requests.
- **localStorage** and **sessionStorage** store strings and are accessed by JavaScript.
- Use JSON for structured values, catch parsing and storage errors, and validate stored data.
- **localStorage** generally persists across restarts; **sessionStorage** is scoped to a page session.
- The **storage** event notifies other documents sharing the area, not the document that made the change.
- Cookie attributes control delivery and script access. **HttpOnly** blocks script reads, while **Secure** limits transmission to secure channels.
- Web Storage and cookies are not authorization systems. Validate input and authorize actions on the server.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [108 - URL, URLSearchParams, and the History API](108-url-urlsearchparams-and-the-history-api.md) | [Open Q&A](../qnas/109-cookies-web-storage-and-client-state.md) | [Open example](../examples/109-cookies-web-storage-and-client-state.md) | [110 - IndexedDB and structured client storage](110-indexeddb-and-structured-client-storage.md) |