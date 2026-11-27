# 105 - Fetch API: requests, responses, and headers

The Fetch API lets JavaScript request resources and inspect the responses. It is commonly used to load data from a server without navigating to a new page, but it also works with other supported resource URLs.

This chapter introduces **fetch()**, request options, response status and headers, reading a response body, and separating network failures from HTTP error responses.

## Learning goals

By the end of this chapter, you should be able to:

- Make a request with **fetch()** and wait for its response.
- Create and inspect **Request** and **Headers** objects.
- Read status, status text, response headers, and response URL.
- Explain why an HTTP error status does not automatically reject the fetch promise.
- Check **response.ok** and handle unsuccessful responses explicitly.
- Read JSON or text from a response body.
- Explain why a response body is normally consumed only once.
- Add request headers such as **Accept** and **Content-Type**.
- Distinguish a network or CORS failure from an HTTP error response.

## What fetch() does

Call **fetch()** with a resource URL. It returns a promise that fulfills with a **Response** when the response is available:

~~~js
const response = await fetch("/api/products");
console.log(response.status);
~~~

The promise does not mean that the response body has already been read. A response has metadata such as status and headers, and a body that your code can consume separately.

**fetch()** rejects when the request cannot produce a usable response, such as for a network failure or a browser-enforced cross-origin restriction. It does not reject just because an HTTP response has a status such as 404 or 500. Those are still responses, so check their status yourself.

~~~js
const response = await fetch("/api/products");

if (!response.ok) {
  throw new Error("Request failed with status " + response.status);
}
~~~

**response.ok** is true for status codes in the successful 200 to 299 range. Use **response.status** when the application needs to distinguish particular outcomes, such as 201 Created or 204 No Content.

## A basic request and response flow

A typical request for JSON has two asynchronous steps:

1. Call **fetch()** to make the request and receive a response.
2. Read the response body with a method such as **json()** or **text()**.

~~~js
async function loadProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("Request failed with status " + response.status);
  }

  const products = await response.json();
  return products;
}
~~~

The first **await** waits for the response. The second waits for the body to be read and parsed as JSON. Either step can fail, so handle errors around the full operation:

~~~js
async function showProducts() {
  try {
    const products = await loadProducts();
    console.log(products);
  } catch (error) {
    console.error("Could not load products:", error);
  }
}
~~~

For larger applications, show a useful loading, success, and error state in the interface instead of only logging to the console.

## Inspect the Response

The **Response** object describes the server's reply:

- **response.status** is its numeric HTTP status, such as 200 or 404.
- **response.statusText** is the status message, which may be empty for some protocols.
- **response.ok** indicates whether the status is in the 200 to 299 range.
- **response.headers** provides the response headers that JavaScript is allowed to read.
- **response.url** is the final response URL after redirects, if available.
- **response.redirected** indicates whether a redirect occurred.
- **response.bodyUsed** indicates whether the body has already been consumed.

~~~js
const response = await fetch("/api/products");

console.log(response.status);
console.log(response.ok);
console.log(response.url);
console.log(response.headers.get("content-type"));
~~~

A successful response does not guarantee that its body has the format your code expects. The server might return an empty body, HTML, malformed JSON, or an unexpected object shape. Handle parsing and application-level validation where appropriate.

## Read a response body

A **Response** provides methods for consuming common body formats:

| Method | Result |
| --- | --- |
| **json()** | Parses JSON and fulfills with the parsed JavaScript value. |
| **text()** | Fulfills with the body as a string. |
| **blob()** | Fulfills with a **Blob**, useful for binary data. |
| **arrayBuffer()** | Fulfills with an **ArrayBuffer** of bytes. |
| **formData()** | Parses form data from a compatible response. |

These methods return promises because reading and decoding the body is asynchronous. **json()** parses JSON text. It does not verify that the returned object matches the shape your application expects.

A response body is a stream and is normally consumed once. After reading it with **json()**, you cannot then read the same body with **text()**:

~~~js
const response = await fetch("/api/products");
const products = await response.json();

console.log(products);
console.log(response.bodyUsed); // true
~~~

If you need two independent reads, clone the response before consuming either copy:

~~~js
const response = await fetch("/api/products");
const copy = response.clone();

const rawText = await response.text();
const parsedData = await copy.json();
~~~

Cloning is useful for specific cases such as logging and parsing, but reading one representation is simpler and uses less memory. Do not read large responses into memory unnecessarily.

A 204 No Content response has no body to parse. Do not call **json()** merely because the request succeeded. Check the endpoint's expected response and status first.

## Request headers

Headers describe a request or response. They can communicate the desired response format, the format of a request body, authentication information, caching behavior, and other metadata.

Use an options object to pass request headers:

~~~js
const response = await fetch("/api/products", {
  headers: {
    Accept: "application/json"
  }
});
~~~

**Accept** describes formats the client can process. **Content-Type** describes the format of a request body. They mean different things:

~~~js
const response = await fetch("/api/messages", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: "Hello" })
});
~~~

The previous request says it is sending JSON and can accept a JSON response. JSON serialization converts the JavaScript value to a string; the **Content-Type** header tells the server how to interpret that body.

The exact method, headers, and body depend on the server's API contract. Some headers are controlled by the browser or restricted in browser code. Do not try to set transport-level headers such as **Host** manually.

## The Headers interface

You can create a **Headers** object and pass it with a **Request**:

~~~js
const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("X-Client-Version", "1");

const request = new Request("/api/products", {
  method: "GET",
  headers
});

console.log(request.method);
console.log(request.headers.get("accept"));
~~~

Header names are case-insensitive. Use **set()** to replace a value, **append()** to add a value where the header supports it, **get()** to read a value, and **has()** to check whether a name exists.

Response headers can be inspected in the same way:

~~~js
const response = await fetch("/api/products");
const contentType = response.headers.get("content-type");

if (contentType && contentType.includes("application/json")) {
  const products = await response.json();
  console.log(products);
}
~~~

For a cross-origin response, browser security rules may hide some response headers from JavaScript unless the server exposes them. The browser may also prevent the request from being read if the server does not permit the origin through Cross-Origin Resource Sharing (CORS).

## The Request object

A **Request** object represents a request and its options. It can be passed directly to **fetch()**:

~~~js
const request = new Request("/api/products", {
  method: "GET",
  headers: {
    Accept: "application/json"
  }
});

const response = await fetch(request);
~~~

For simple calls, passing the URL and options directly to **fetch()** is often clearer. A **Request** object is useful when you want to construct, inspect, or pass around a request before sending it.

Request bodies are also consumable streams. If a request with a body has already been sent, do not expect to send that same consumed request again. Construct a new request or clone it before use when appropriate.

## Use URLSearchParams for query values

For GET requests, query parameters are part of the URL. **URLSearchParams** safely encodes individual names and values:

~~~js
const params = new URLSearchParams({
  category: "web tools",
  page: "2"
});

const response = await fetch("/api/products?" + params);
~~~

Do not build a query by concatenating unescaped user-provided text. Query values are visible in the URL and may be stored in history or logs, so do not put secrets in them.

## Handle HTTP and network errors separately

A robust request handler distinguishes at least two types of failure:

1. **HTTP error response:** the server responded with a status outside 200 to 299. The fetch promise fulfills, so inspect **response.ok** or **response.status** and decide what the application should do.
2. **Request failure:** the browser could not provide a readable response, for example because of a network problem, a CORS restriction, or an aborted request. The fetch promise rejects, so handle the thrown error.

~~~js
async function getJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.json();
}

async function loadDashboard() {
  try {
    const dashboard = await getJson("/api/dashboard");
    console.log(dashboard);
  } catch (error) {
    console.error("The request or response handling failed:", error);
  }
}
~~~

An HTTP 404 or 500 does not enter the **catch** block by itself. The explicit **response.ok** check turns an unsuccessful status into an application error. The **catch** block then handles that error along with network, CORS, and parsing failures.

Do not show raw server error details to users. Log only what is useful for debugging, and present a clear message that does not expose sensitive information.

## CORS and readable responses

A page can usually request resources from its own origin. A request to another origin is subject to browser cross-origin rules. The other server must grant access for JavaScript to read the response.

The **no-cors** mode does not disable cross-origin security. It produces an opaque response that does not expose the status, headers, or body to page JavaScript. Use an API that permits the page's origin rather than trying to bypass CORS.

CORS is enforced by browsers. A server-to-server tool or command-line client may have different access rules, so a request working outside the browser does not prove that a page is permitted to read it.

## Common mistakes

### Assuming a 404 rejects fetch()

Fetch fulfills with an HTTP error response. Check **response.ok** or **response.status** before treating the response as success.

### Forgetting to read the body

Awaiting **fetch()** gives a response object, not the parsed JSON data. Read the response with **json()**, **text()**, or another suitable method.

### Reading the same body twice

Response bodies are streams. Choose one format, or clone the response before consuming it if two separate reads are truly needed.

### Setting the wrong header

Use **Accept** to describe response formats the client wants. Use **Content-Type** to describe the format of a request body.

### Assuming CORS errors are HTTP statuses

A CORS restriction can prevent JavaScript from receiving a readable response. Configure the server to allow the intended origin; changing **no-cors** does not expose the response.

### Treating parsed JSON as trusted data

Parsing only establishes that the text is valid JSON. Validate the shape and values before using them in application logic or inserting them into the page.

## Try it yourself

1. Add **Accept: application/json** and inspect the response's **content-type** header.
2. Return a 404 status from a local API and verify that **fetch()** still fulfills with a response.
3. Read a response with **text()**, then check **bodyUsed**. Try reading it a second time and observe the result.
4. Clone a response before reading it and compare the two copies.
5. Construct a **Request** with a **Headers** object and inspect its method and header values.
6. Add query parameters with **URLSearchParams** instead of concatenating raw user input.
7. Inspect **response.ok**, **response.status**, and **response.url** for an endpoint that redirects.
8. Compare an HTTP error response with a failed request in the console and explain which one rejects the fetch promise.
9. Check what a cross-origin server needs to provide before browser JavaScript can read its response.

## Key points

- **fetch()** fulfills with a **Response** for HTTP statuses such as 404; check **response.ok**.
- A fulfilled fetch response still needs its body read and parsed separately.
- A response body is normally consumed once; clone first if a second read is necessary.
- **Accept** describes response formats the client can process; **Content-Type** describes the request body format.
- Use **Headers**, **Request**, and **Response** objects to inspect request and response details.
- Network, CORS, and parsing failures can reject the asynchronous operation; handle them with **try/catch**.
- CORS controls which cross-origin responses browser code can read. **no-cors** is not a bypass.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [104 - Forms, input validation, and submission](104-forms-input-validation-and-submission.md) | [Open Q&A](../qnas/105-fetch-api-requests-responses-and-headers.md) | [Open example](../examples/105-fetch-api-requests-responses-and-headers.md) | [106 - HTTP methods, status codes, and JSON APIs](106-http-methods-status-codes-and-json-apis.md) |