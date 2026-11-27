# 108 - URL, URLSearchParams, and the History API

URLs identify resources and can also carry application state. JavaScript's **URL** class parses and updates URL components, **URLSearchParams** reads and writes query parameters, and the **History API** adds or replaces same-document history entries.

This chapter shows how to build URLs safely, handle repeated query keys, keep an interface in sync with the address bar, and restore that interface when the user goes Back or Forward.

## Learning goals

By the end of this chapter, you should be able to:

- Parse absolute and relative URLs with the **URL** class.
- Read and update common URL components.
- Build query strings with **URLSearchParams** instead of manual concatenation.
- Read parameters with duplicate names.
- Explain percent encoding and why query strings are not a place for secrets.
- Add and replace same-document history entries.
- Restore application state after a **popstate** event.
- Support direct links and reloads in a client-side application.

## URL parts

A URL can contain a scheme, authority, path, query, and fragment:

~~~text
https://shop.example.test:8443/products?category=books&sort=title#results
~~~

| Part | Example | Common JavaScript property |
| --- | --- | --- |
| Scheme | **https:** | **protocol** |
| Host and port | **shop.example.test:8443** | **host** |
| Host name | **shop.example.test** | **hostname** |
| Port | **8443** | **port** |
| Path | **/products** | **pathname** |
| Query | **?category=books&sort=title** | **search** and **searchParams** |
| Fragment | **#results** | **hash** |
| Origin | **https://shop.example.test:8443** | **origin** |

The fragment is processed by the browser and is not sent to the server in an HTTP request. The query is sent as part of the request target and may be stored in browser history, server logs, analytics, and copied links.

## Parse URLs with URL

Constructing a **URL** parses and normalizes its input. An absolute URL can be parsed by itself. A relative URL needs a base:

~~~js
const absolute = new URL("https://shop.example.test/products?sort=title");

const relative = new URL(
  "../images/book cover.png",
  "https://shop.example.test/catalog/"
);

console.log(absolute.pathname);
// "/products"

console.log(relative.href);
// "https://shop.example.test/images/book%20cover.png"
~~~

In a browser, the current page URL can be the base:

~~~js
const detailsUrl = new URL("details", window.location.href);
~~~

If the input cannot be parsed as a valid URL, the constructor throws a **TypeError**. Catch it when parsing untrusted text:

~~~js
function parseWebsiteAddress(value) {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}
~~~

Parsing is not a complete security check. If an application accepts a destination from user input, it should validate the resulting protocol and, where appropriate, compare the origin against an allowlist. A syntactically valid URL can still point somewhere the application must not trust.

## Read and update URL components

A **URL** object exposes separate properties for its parts. The object is mutable, and its **href** property returns the serialized whole URL:

~~~js
const url = new URL("https://shop.example.test/products?id=42#details");

url.pathname = "/articles";
url.searchParams.set("page", "2");
url.hash = "summary";

console.log(url.href);
// "https://shop.example.test/articles?id=42&page=2#summary"
~~~

Setting a component lets the URL implementation encode characters appropriately. Prefer updating a parsed URL over assembling a string with concatenation.

The **origin** is derived from the scheme, host, and port. It is useful when comparing destinations:

~~~js
const destination = new URL("/account", window.location.href);

if (destination.origin === window.location.origin) {
  console.log("Same origin");
}
~~~

The comparison above answers whether the two URLs have the same origin. It does not decide whether a particular path or account action is authorized.

## Build and read query parameters

Use **URLSearchParams** to work with the query as key-value pairs:

~~~js
const url = new URL("https://shop.example.test/search");

url.searchParams.set("q", "C++ basics");
url.searchParams.set("page", "2");

console.log(url.href);
// "https://shop.example.test/search?q=C%2B%2B+basics&page=2"
~~~

Spaces are serialized as **+** by **URLSearchParams**. A plus character in data is encoded, so it will not be confused with the space representation.

Useful methods include:

| Method | Purpose |
| --- | --- |
| **get(name)** | Return the first matching value, or **null**. |
| **getAll(name)** | Return every value for a name, including repeated values. |
| **has(name)** | Check whether a name is present. |
| **set(name, value)** | Replace all values for the name with one value. |
| **append(name, value)** | Add another value without removing existing ones. |
| **delete(name)** | Remove all values for the name. |
| **sort()** | Sort entries by key. |
| **toString()** | Serialize the parameters without a leading question mark. |

Repeated keys are valid. Use **append()** to represent multiple selected values:

~~~js
const params = new URLSearchParams();

params.append("tag", "browser");
params.append("tag", "history");

console.log(params.get("tag"));
// "browser"

console.log(params.getAll("tag"));
// ["browser", "history"]

console.log(params.toString());
// "tag=browser&tag=history"
~~~

Use **getAll()** when a key may occur more than once. Calling **set()** for a key removes its earlier values and leaves one value.

You can also construct parameters from an iterable of pairs:

~~~js
const params = new URLSearchParams([
  ["tag", "browser"],
  ["tag", "history"]
]);
~~~

For repeated values, pairs make the intent explicit. Do not expect an array placed as a plain object value to become repeated query keys. Convert values deliberately with **append()** or an iterable of pairs.

## Avoid manual query-string assembly

Manually concatenating user input into a URL can produce broken URLs and encoding bugs:

~~~js
const query = "tea & coffee";
const url = "/search?q=" + query;
~~~

The ampersand in this value can be mistaken for a separator. Build the query with **URLSearchParams** instead:

~~~js
const url = new URL("/search", window.location.origin);
url.searchParams.set("q", "tea & coffee");

console.log(url.search);
// "?q=tea+%26+coffee"
~~~

Do not encode the entire URL as one string. Encode individual values through the URL APIs. Avoid double encoding: an already percent-encoded value passed to **URLSearchParams** is treated as ordinary text and its percent sign may itself be encoded.

Query values are strings. Validate and convert them when your application expects a number, boolean, enum, or identifier:

~~~js
const pageValue = new URLSearchParams(window.location.search).get("page");
const page = Number(pageValue);

if (!Number.isInteger(page) || page < 1 || page > 100) {
  console.log("Use a page number from 1 to 100.");
}
~~~

## Query strings and sensitive data

Query strings are useful for shareable, bookmarkable state such as filters, search terms, sort order, and page numbers. They are usually a poor place for passwords, session tokens, private identifiers, or other secrets.

URLs can be copied, saved in history, recorded in server logs, included in referrer information, or captured by analytics. Use an appropriate authenticated request body or secure application mechanism for sensitive data. A query parameter is not protected merely because the page uses HTTPS.

## The History API

The browser's session history lets users move among visited states with Back and Forward. For a client-side interface, **history.pushState()** can add a same-document entry without loading a new document. **history.replaceState()** updates the current entry instead of adding another one.

~~~js
const state = { tab: "activity" };

history.pushState(state, "", "?tab=activity");
~~~

The second argument is reserved for historical reasons. Pass an empty string. The optional URL must be same-origin with the current document, or the call throws a **SecurityError**. Changing the address with **pushState()** does not automatically fetch that URL from the server or render the matching interface for you.

Use **replaceState()** when the current entry should be corrected or initialized, such as normalizing initial URL state. Use **pushState()** when the user has made a navigational choice that should be reachable with Back:

~~~js
history.replaceState({ tab: "overview" }, "", "?tab=overview");
history.pushState({ tab: "activity" }, "", "?tab=activity");
~~~

The History API state is structured-serialized. Store small, serializable UI state, not functions, DOM nodes, credentials, or large application datasets. The URL should carry state that should be linkable or survive a reload; history state can hold small extra details for one history entry.

## Respond to Back and Forward

When the user traverses session history, the browser fires **popstate**. The event's **state** property contains the state associated with the activated entry. Calling **pushState()** or **replaceState()** itself does not fire **popstate**.

A useful pattern is to derive the visible interface from the current URL:

~~~js
function renderFromLocation() {
  const url = new URL(window.location.href);
  const tab = url.searchParams.get("tab") || "overview";
  showTab(tab);
}

window.addEventListener("popstate", renderFromLocation);
~~~

The handler runs when the user uses Back or Forward. The code that calls **pushState()** should update the interface itself after adding the new entry. Do not wait for **popstate** to run after calling **pushState()**.

Prefer the URL as the source of truth for state that should be shareable and restorable after reload. The **event.state** value can supplement it, but the page should not become unusable when state is absent or a user opens a link directly.

## Build a small client-side navigation

A search interface can keep its filter in the URL. On form submission:

1. Read and validate the controls.
2. Update the current URL's query parameters.
3. Call **history.pushState()** to create a navigable entry.
4. Render results using the new URL state.
5. Listen for **popstate** to restore the form and results after Back or Forward.

~~~js
function saveSearch(searchText) {
  const url = new URL(window.location.href);
  const value = searchText.trim();

  if (value) {
    url.searchParams.set("q", value);
  } else {
    url.searchParams.delete("q");
  }

  const state = { query: value };
  history.pushState(state, "", url);
  renderFromLocation();
}

window.addEventListener("popstate", renderFromLocation);
~~~

For this to work after a reload or when a link is opened directly, the server must serve the application for the relevant route, or the application must use URLs that the server already serves. The History API changes the browser's session history; it does not configure server routing.

For a simple page with separate documents, ordinary links are often the best navigation. Use client-side history when the application intentionally manages navigation and updates its own content.

## Common mistakes

### Forgetting a base for a relative URL

**new URL("details")** cannot resolve a relative path without a base. Supply the current page or another known absolute URL.

### Appending query parameters by hand

Characters such as **&**, **=**, **+**, and non-ASCII text need correct serialization. Use **URLSearchParams**.

### Losing repeated query values

**get()** returns only the first matching value. Use **getAll()** when repeated values are meaningful.

### Using set when append is required

**set()** replaces existing values with the same name. Use **append()** for repeated filters or use an iterable of key-value pairs.

### Treating all query data as trusted

Users can edit URLs. Validate and normalize values before using them in application logic, and enforce security rules on the server.

### Putting secrets in the URL

URLs can appear in history, logs, copied links, and referrer data. Do not place passwords or session tokens in query strings.

### Expecting pushState to fetch or render a page

It only updates session history and the displayed URL. Your application must render the relevant state and your server must support direct routes and reloads.

### Expecting pushState to fire popstate

**popstate** is associated with history traversal, such as Back and Forward. Update the interface as part of the code that calls **pushState()**.

### Storing too much in history state

Keep state small and serializable. Store durable, shareable view state in the URL and retrieve the underlying data through the application's normal data flow.

## Try it yourself

1. Parse an absolute URL and print its **origin**, **pathname**, **search**, and **hash**.
2. Resolve a relative path against a base URL and inspect the serialized **href**.
3. Build a search URL containing spaces, ampersands, and plus signs with **URLSearchParams**.
4. Append two values under the same key, then compare **get()** with **getAll()**.
5. Use **set()** on that key and observe that only one value remains.
6. Parse a **page** query parameter and reject values outside an allowed integer range.
7. Add a filter with **pushState()**, update the interface, and use Back and Forward.
8. Reload a filtered URL and make the application restore its form from the query string.
9. Use **replaceState()** to normalize the current URL without adding another history entry.
10. Explain why a client-side route can work after clicking a button but fail when entered directly in the address bar.

## Key points

- A **URL** object parses, normalizes, and updates URL components.
- Pass a base when resolving a relative URL.
- Use **URLSearchParams** to encode query values and work with repeated keys.
- **get()** returns one value; **getAll()** returns repeated values.
- Validate query data because users can modify URLs.
- URLs can be copied, logged, and stored, so keep secrets out of query strings.
- **pushState()** adds a same-document history entry; **replaceState()** updates the current one.
- **popstate** handles history traversal. Calling **pushState()** does not fire it.
- History API calls do not fetch pages or replace server-side route handling.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [107 - CORS, credentials, and cross-origin rules](107-cors-credentials-and-cross-origin-rules.md) | [Open Q&A](../qnas/108-url-urlsearchparams-and-the-history-api.md) | [Open example](../examples/108-url-urlsearchparams-and-the-history-api.md) | [109 - Cookies, Web Storage, and client state](109-cookies-web-storage-and-client-state.md) |