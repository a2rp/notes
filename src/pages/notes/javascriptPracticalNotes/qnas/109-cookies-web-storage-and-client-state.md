# 109 - Cookies, Web Storage, and client state: Questions and Answers

Use these questions to review cookies, **localStorage**, **sessionStorage**, JSON serialization, and client-side security. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Which storage mechanism is automatically attached to matching HTTP requests by the browser?

- A. **localStorage**
- B. **sessionStorage**
- C. Cookies
- D. JavaScript variables

**Answer: C. Cookies.**

Cookies are included when their scope and browser policies match the request. Web Storage is not automatically sent to a server.

### 2. What type of values does Web Storage keep?

- A. JavaScript objects
- B. Strings
- C. Functions
- D. DOM elements

**Answer: B. Strings.**

Use **JSON.stringify()** and **JSON.parse()** to store structured data, and validate the parsed result.

### 3. Which API generally persists data across browser restarts unless it is removed or cleared?

- A. **localStorage**
- B. **sessionStorage**
- C. An event handler
- D. A local variable

**Answer: A. localStorage.**

Browser policy or the user can still remove or restrict the data, so do not treat it as permanent storage.

### 4. Which storage is usually scoped to a page session, often associated with one tab?

- A. **localStorage**
- B. **sessionStorage**
- C. Cookie **Domain**
- D. An HTTP cache header

**Answer: B. sessionStorage.**

It is intended for state scoped to the page session and is not a general replacement for shared persistent storage.

### 5. Which cookie attribute prevents JavaScript cookie APIs from reading the cookie?

- A. **Path**
- B. **Domain**
- C. **HttpOnly**
- D. **Max-Age**

**Answer: C. HttpOnly.**

The browser can still send an HttpOnly cookie with a matching request. The attribute limits script access.

### 6. What does the **Secure** cookie attribute do?

- A. Encrypts the value before storing it
- B. Restricts sending to secure channels, typically HTTPS
- C. Makes the cookie unreadable to the server
- D. Prevents all cross-site requests

**Answer: B. It restricts sending to secure channels, typically HTTPS.**

Secure does not encrypt a cookie value in the browser store and is separate from **HttpOnly**.

### 7. Which statement about **SameSite** is accurate?

- A. It replaces server-side authorization
- B. It controls cookie sending in cross-site contexts
- C. It stores data in localStorage
- D. It changes a cookie into an HTTP header written by JavaScript

**Answer: B. It controls cookie sending in cross-site contexts.**

SameSite is a useful part of cookie policy, but it does not replace authorization or every CSRF defense.

### 8. When does a **storage** event notify a page about a localStorage change?

- A. In the same document that wrote the value
- B. In other documents sharing the storage area
- C. Only after a browser restart
- D. Only when a cookie expires

**Answer: B. In other documents sharing the storage area.**

The writing document should update its own interface directly. Other same-origin documents can react to the event.

### 9. What does **getItem("theme")** return if there is no **theme** key?

- A. An empty object
- B. **false**
- C. **null**
- D. An exception every time

**Answer: C. null.**

Check for **null** before parsing or using a value.

### 10. Why should an application catch errors around storage reads and writes?

- A. Storage methods always return promises
- B. Browser policy, invalid data, or quota limits can cause failures
- C. JSON.stringify cannot process objects
- D. Cookies require it

**Answer: B. Browser policy, invalid data, or quota limits can cause failures.**

Storage access can be restricted and writes can fail. Provide defaults or another graceful behavior.

### 11. Where should the server enforce whether a user may access a protected resource?

- A. In a value stored in localStorage
- B. In a hidden form field
- C. In server-side authentication and authorization logic
- D. In the button label

**Answer: C. In server-side authentication and authorization logic.**

Client-side state is editable and should not be treated as proof of permission.

### 12. What is wrong with using a cookie's **Path** as the security boundary for a sensitive feature?

- A. Path is not a reliable security boundary
- B. Path is only available to JSON
- C. Path makes cookies unavailable to the server
- D. Path always sends the cookie to every host

**Answer: A. Path is not a reliable security boundary.**

Use server-side authorization to protect resources. Cookie Path only affects where the browser sends a cookie.

## Objective questions

### 13. How does a server normally ask a browser to store a cookie?

**Answer: By returning a **Set-Cookie** response header.**

The browser later includes matching name-value pairs in a **Cookie** request header when allowed by scope and policy.

### 14. Can frontend JavaScript read a cookie marked **HttpOnly**?

**Answer: No.**

The browser withholds it from script cookie APIs, but can still attach it to eligible HTTP requests.

### 15. What does **sessionStorage.getItem("draft")** return when the key is missing?

**Answer: **null**.**

Storage getters return a string or null.

### 16. Why should structured storage data be parsed inside a try/catch block?

**Answer: Because stored text may be malformed or outdated, and **JSON.parse()** can throw.**

Validate the parsed object's shape before using it.

### 17. Does the browser send localStorage values automatically with a Fetch request?

**Answer: No.**

The application would need to read a value and explicitly include it. Cookies have browser-managed request delivery instead.

### 18. Which cookie attribute can set a cookie's persistence duration in seconds?

**Answer: **Max-Age**.**

**Expires** can also provide an expiration date. Without a persistent expiry, a cookie is generally a session cookie.

### 19. In which document does the **storage** event not fire when localStorage changes?

**Answer: In the document that performed the change.**

It is dispatched to other documents that share the affected storage area.

### 20. What should an application do with client-side values that affect security-sensitive operations?

**Answer: Treat them as untrusted and validate or authorize the operation on the server.**

Users can edit storage through developer tools, and scripts running in the page can access JavaScript-readable storage.

## Short-answer questions

### 21. Compare cookies with Web Storage.

**Answer:** Cookies can be sent automatically with matching HTTP requests and may be managed by the server. **localStorage** and **sessionStorage** are accessed by JavaScript and are not automatically sent. Web Storage is string-based and commonly used for small client-side state.

### 22. Compare **localStorage** with **sessionStorage**.

**Answer:** **localStorage** generally survives reloads and browser restarts until cleared. **sessionStorage** is scoped to a page session, usually associated with a tab, and is intended for temporary state. Both can be cleared or restricted by the browser or user.

### 23. What is the difference between **HttpOnly** and **Secure**?

**Answer:** **HttpOnly** blocks JavaScript access to the cookie. **Secure** restricts cookie transmission to secure channels, typically HTTPS. They are independent and can be used together.

### 24. Why is localStorage a risky place for a session token?

**Answer:** JavaScript running in the page can read it, including injected script after an XSS flaw. A token in localStorage can therefore be exposed to scripts. The application's session design should minimize exposure and still enforce authorization on the server.

### 25. Why is **SameSite** helpful but not a complete CSRF defense?

**Answer:** SameSite restricts some cross-site cookie sending, but application security depends on the full request flow, browser behavior, and application requirements. Sensitive cookie-authenticated state changes may need additional CSRF defenses, and authorization still belongs on the server.

### 26. Why should a page update its own interface after writing localStorage rather than waiting for a **storage** event?

**Answer:** The **storage** event is sent to other documents that share the storage area, not to the writing document. Update the current page directly after a successful write.

## Code questions

### 27. What does this code store, and what type is returned by the later read?

~~~js
const settings = { theme: "dark" };
localStorage.setItem("settings", JSON.stringify(settings));

const text = localStorage.getItem("settings");
~~~

**Answer:** It stores a JSON string representing the object. The **text** variable contains a string, not an object.

Parse it with **JSON.parse(text)** inside a try/catch, then validate the resulting data before use.

### 28. What is the problem with this read?

~~~js
const preferences = JSON.parse(localStorage.getItem("preferences"));
~~~

**Answer:** The key could be missing, which means **getItem()** returns **null**, or the saved value could be malformed. **JSON.parse()** can throw.

Check for a missing value, catch parse errors, and validate the expected fields before using the result.

### 29. Will this storage event listener run in the same page immediately after the call to **setItem()**?

~~~js
localStorage.setItem("theme", "dark");

window.addEventListener("storage", (event) => {
  console.log(event.key);
});
~~~

**Answer: No.**

The event is dispatched to other documents sharing the storage area, not the document that made the change. Register the listener in another same-origin tab to observe it.

### 30. Which attribute is missing if this cookie must not be readable by JavaScript?

~~~http
Set-Cookie: session_id=example-value; Path=/; Secure; SameSite=Lax
~~~

**Answer: **HttpOnly**.**

For a production session cookie, the server could set **HttpOnly** as well. Continue to use server-side authorization and appropriate CSRF defenses.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [108 - URL, URLSearchParams, and the History API](../qnas/108-url-urlsearchparams-and-the-history-api.md) | [Open lesson](../lessons/109-cookies-web-storage-and-client-state.md) | [Open example](../examples/109-cookies-web-storage-and-client-state.md) | [110 - IndexedDB and structured client storage](../lessons/110-indexeddb-and-structured-client-storage.md) |