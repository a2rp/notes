# 108 - URL, URLSearchParams, and the History API: Questions and Answers

Use these questions to review URL parsing, query-string handling, browser history, and client-side navigation. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Which API should you use to parse and update a URL's components?

- A. **URL**
- B. **JSON**
- C. **History**
- D. **RegExp**

**Answer: A. URL.**

The **URL** class exposes properties such as **origin**, **pathname**, **search**, and **hash**.

### 2. What is required to parse a relative path such as **details** with the URL constructor?

- A. A port number
- B. A base URL
- C. A query parameter
- D. A History object

**Answer: B. A base URL.**

Relative references need context. In a browser, **window.location.href** can be used as the base.

### 3. Which property gives a URL's scheme, host, and port as its origin?

- A. **href**
- B. **pathname**
- C. **origin**
- D. **hash**

**Answer: C. origin.**

Origin comparisons are useful for checking whether two URLs are same-origin, but they do not authorize an action.

### 4. What does **URLSearchParams.getAll("tag")** return when the query is **?tag=browser&tag=history**?

- A. Only **"browser"**
- B. Only **"history"**
- C. Both values in an array
- D. A boolean

**Answer: C. Both values in an array.**

Use **getAll()** when a parameter name can appear more than once. **get()** returns only the first matching value.

### 5. What happens when **set("tag", "browser")** is called on parameters containing two **tag** values?

- A. A third value is appended
- B. Existing values for **tag** are replaced by one value
- C. Every parameter is deleted
- D. The URL is navigated immediately

**Answer: B. Existing values for tag are replaced by one value.**

Use **append()** when you want to preserve earlier values and add another.

### 6. How does URLSearchParams commonly serialize a space in a query value?

- A. As **+**
- B. As **#**
- C. As **&**
- D. It removes the space

**Answer: A. As +.**

Other characters are encoded as needed. A literal plus in a value is encoded so it is not confused with a space.

### 7. What does **history.pushState(state, "", url)** do?

- A. Fetches and renders the URL automatically
- B. Adds a same-document session history entry and updates the displayed URL
- C. Replaces the browser's entire history
- D. Fires **popstate** immediately

**Answer: B. It adds a same-document history entry and updates the displayed URL.**

Your application must update its interface. The browser does not fetch the URL just because **pushState()** was called.

### 8. When should an application use **history.replaceState()** instead of **pushState()**?

- A. When it wants to update the current history entry without adding a new one
- B. When it wants to navigate to another origin
- C. When it wants the browser to download a file
- D. When it wants to force a server request

**Answer: A. When it wants to update the current entry without adding a new one.**

Use **replaceState()** for correcting or normalizing the current entry. Use **pushState()** when Back should return to the previous state.

### 9. When does the browser normally fire **popstate**?

- A. Immediately after every call to **pushState()**
- B. When the user traverses session history, such as with Back or Forward
- C. Whenever a query parameter is read
- D. When the server sends JSON

**Answer: B. When the user traverses session history.**

Calling **pushState()** or **replaceState()** itself does not fire **popstate**.

### 10. What must be true about the URL passed to **pushState()**?

- A. It must have no query string
- B. It must be same-origin with the current document
- C. It must use HTTPS only
- D. It must point to an existing server file

**Answer: B. It must be same-origin with the current document.**

A different-origin URL causes a **SecurityError**. The browser's same-origin rule still applies.

### 11. What should the application use to restore shareable filters after a page reload?

- A. Only an event handler's local variable
- B. The query string in the current URL
- C. A password in the URL fragment
- D. The last console message

**Answer: B. The query string in the current URL.**

The URL can be copied, bookmarked, or opened directly. Initialize the interface from it when the page loads.

### 12. Why should passwords and session tokens generally stay out of query strings?

- A. Query strings cannot contain letters
- B. URLs can be copied, stored in history, logged, or captured by analytics
- C. URLSearchParams deletes them
- D. Browsers do not support query strings over HTTPS

**Answer: B. URLs can be copied, stored in history, logged, or captured by analytics.**

HTTPS protects data in transit, but it does not prevent a URL from appearing in browser history or application logs.

## Objective questions

### 13. Which URL property exposes its query parameters as a **URLSearchParams** object?

**Answer: The **searchParams** property.**

For example, **url.searchParams.get("q")** reads the first value associated with **q**.

### 14. Is the fragment, such as **#details**, sent to the server in an HTTP request?

**Answer: No.**

The browser uses the fragment for client-side navigation, such as jumping to an element. It is not part of the HTTP request target.

### 15. What does the URL constructor throw when it cannot parse its input?

**Answer: A **TypeError**.**

Catch it when the value comes from untrusted input. Successful parsing still does not mean the destination is safe.

### 16. Which method adds a new session history entry: **pushState()** or **replaceState()**?

**Answer: **pushState()**.**

**replaceState()** changes the current entry instead.

### 17. What kind of data should be stored in the History API state object?

**Answer: Small, serializable state for that history entry.**

Do not store functions, DOM nodes, secrets, or large application datasets in it.

### 18. Does **pushState()** fetch the requested URL from the server?

**Answer: No.**

It updates session history and the displayed URL. Your app must render the corresponding view, and the server must support direct routes and reloads.

### 19. Which method adds a repeated parameter without deleting earlier values?

**Answer: **append()**.**

Use **getAll()** to read the resulting repeated values.

### 20. What should an app do when it receives a query value that should be an integer?

**Answer: Convert it and validate the result before using it.**

Users can edit URLs, so query values are untrusted strings.

## Short-answer questions

### 21. Explain the difference between **get()** and **getAll()**.

**Answer:** **get(name)** returns the first matching value or **null**. **getAll(name)** returns an array of every value for that name. If duplicate query keys are meaningful, use **getAll()**.

### 22. Why is **URLSearchParams** safer than concatenating a query string by hand?

**Answer:** It serializes names and values using the query encoding rules. Characters such as **&**, **=**, and **+** will not accidentally be interpreted as delimiters. It also makes repeated keys explicit.

### 23. Compare **pushState()** and **replaceState()**.

**Answer:** **pushState()** adds a new history entry, so Back can return to the previous one. **replaceState()** updates the active entry without adding another. Neither method fetches or renders the page by itself.

### 24. What should a page do when it receives a **popstate** event?

**Answer:** Restore the visible interface from the activated history entry, commonly by reading the current URL and rendering from its query parameters. The app can also inspect **event.state** for small extra state associated with that entry.

### 25. What is the difference between URL state and History API state?

**Answer:** URL state is visible, shareable, and available after a reload or direct link. History API state is attached to a particular session history entry and can hold small additional serializable details. Important view state should not depend only on **event.state**.

### 26. Why can a client-side route work after a button click but fail when entered directly?

**Answer:** The History API changes the browser URL but does not configure the server. On a direct request or reload, the server must serve the application for that route, or the app must use paths the server already handles.

## Code questions

### 27. What does this code return for **tag**?

~~~js
const params = new URLSearchParams("tag=browser&tag=history");

console.log(params.get("tag"));
console.log(params.getAll("tag"));
~~~

**Answer:**

~~~text
browser
["browser", "history"]
~~~

**get()** returns the first match. **getAll()** returns both values.

### 28. Why is this URL construction incorrect for arbitrary search text, and how should it be written?

~~~js
const query = "tea & coffee";
const href = "/search?q=" + query;
~~~

**Answer:** The ampersand can be treated as a parameter separator, so the value may be parsed incorrectly. Use **URLSearchParams**:

~~~js
const url = new URL("/search", window.location.origin);
url.searchParams.set("q", "tea & coffee");

console.log(url.search);
// "?q=tea+%26+coffee"
~~~

### 29. Does this call cause the **popstate** handler to run immediately?

~~~js
history.pushState({ tab: "activity" }, "", "?tab=activity");
~~~

**Answer: No.**

The application should render the activity view after calling **pushState()**. The **popstate** handler runs later when the user traverses session history.

### 30. What validation should be added before navigating to a destination supplied by a user?

~~~js
const destination = new URL(userInput, window.location.href);
window.location.href = destination.href;
~~~

**Answer:** Catch parsing failures, allow only expected protocols, and check the destination's origin against an allowlist when the application intends to restrict destinations.

A valid URL can still point to an unwanted or unsafe destination. URL parsing is not authorization or an open-redirect defense by itself.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [107 - CORS, credentials, and cross-origin rules](../qnas/107-cors-credentials-and-cross-origin-rules.md) | [Open lesson](../lessons/108-url-urlsearchparams-and-the-history-api.md) | [Open example](../examples/108-url-urlsearchparams-and-the-history-api.md) | [109 - Cookies, Web Storage, and client state](../lessons/109-cookies-web-storage-and-client-state.md) |