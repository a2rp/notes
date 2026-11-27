# 106 - HTTP methods, status codes, and JSON APIs

A web API exposes resources and actions through HTTP requests and responses. The request method describes the client's intent. The response status communicates the result. JSON is a common format for the data exchanged between the client and server.

This chapter builds on **fetch()** and explains common HTTP methods, status code classes, JSON request and response bodies, and how to connect those parts without assuming every request succeeded.

## Learning goals

By the end of this chapter, you should be able to:

- Choose a common HTTP method for reading or changing a resource.
- Explain the difference between safe and idempotent methods.
- Recognize the five status code classes and common API status codes.
- Send a JSON request body with the correct headers.
- Read JSON success and error bodies from a response.
- Handle responses such as **201 Created** and **204 No Content** correctly.
- Describe a consistent success and error response shape.
- Avoid unsafe automatic retries and trusting client data.

## Think in resources and requests

A resource is something an API can identify, such as a task, profile, or article. A request combines a resource URL, an HTTP method, headers, and sometimes a body.

For example, a task API might use these paths:

- **/api/tasks** for a collection of tasks.
- **/api/tasks/42** for one task.

The path identifies the target. The method describes what the client wants to do with it. A method is not just an arbitrary label for a button. Following method semantics makes APIs easier to use, cache, inspect, and operate consistently.

## Common HTTP methods

| Method | Common API use | Safe? | Idempotent? |
| --- | --- | --- | --- |
| **GET** | Read a resource or collection. | Yes | Yes |
| **HEAD** | Read response metadata without the representation body. | Yes | Yes |
| **POST** | Create a resource chosen by the server or perform an action. | No | Not guaranteed |
| **PUT** | Create or replace the target resource with the supplied representation. | No | Yes |
| **PATCH** | Apply a partial modification to a resource. | No | Depends on the patch operation |
| **DELETE** | Remove the target resource. | No | Yes, in intended effect |

**Safe** means the method's intended semantics are read-only. **Idempotent** means repeating the same request has the same intended effect as making it once. A repeated request can still return a different response, such as the first delete returning 204 and a later one returning 404.

Idempotence matters when requests may be retried after a connection failure. Repeating a **PUT** that replaces a resource with the same representation is intended to leave the resource in the same state. Repeating a **POST** that creates a new order may create duplicates unless the API provides an idempotency mechanism.

PATCH describes partial modification, but the particular patch's effect determines whether repeating it is idempotent. For example, setting a boolean to **true** can be idempotent, while adding one to a counter is not.

These are intended semantics. An API can be incorrectly implemented, so clients still need to follow the API's documented contract.

## Status code classes

An HTTP status code is a three-digit number. Its first digit gives the broad class:

| Range | Class | General meaning |
| --- | --- | --- |
| **1xx** | Informational | The request is continuing. |
| **2xx** | Successful | The request was received and handled successfully. |
| **3xx** | Redirection | Further action is needed to complete the request. |
| **4xx** | Client error | The request cannot be fulfilled as sent. |
| **5xx** | Server error | The server failed while handling an apparently valid request. |

The exact status still matters. A client should not treat every 2xx response as having the same body, or every 4xx response as the same kind of problem.

## Common API status codes

| Status | Meaning | Common API use |
| --- | --- | --- |
| **200 OK** | The request succeeded. | Return a representation or a result. |
| **201 Created** | The request created a resource. | Return the new resource and often a **Location** header. |
| **202 Accepted** | The request was accepted for processing. | A queued job may not have finished yet. |
| **204 No Content** | The request succeeded with no response body. | A delete or update needs no returned representation. |
| **400 Bad Request** | The request cannot be understood or is invalid. | Malformed JSON or invalid request syntax. |
| **401 Unauthorized** | Valid authentication credentials are missing or not accepted. | The client needs to authenticate. |
| **403 Forbidden** | The server refuses the action. | The identity is not allowed to perform it. |
| **404 Not Found** | The target resource is not available. | The resource does not exist or the API does not expose it. |
| **405 Method Not Allowed** | The path does not support that method. | The response can indicate supported methods with **Allow**. |
| **409 Conflict** | The request conflicts with current resource state. | A version conflict or duplicate unique value. |
| **422 Unprocessable Content** | The content type and syntax are understood, but the instructions cannot be processed. | Validation rules reject otherwise well-formed data. |
| **429 Too Many Requests** | The client sent too many requests in a period. | A rate limit was reached. |
| **500 Internal Server Error** | The server encountered an unexpected failure. | An unhandled server problem. |
| **503 Service Unavailable** | The service is temporarily unavailable. | Maintenance or temporary overload. |

These are common conventions, not a substitute for the API's documentation. Read the status, response headers, and body together. For example, **202** means accepted, not necessarily completed. A **204** response has no content, so do not try to parse it as JSON.

## Send JSON in a request

A JavaScript object is not automatically a JSON request body. Serialize it with **JSON.stringify()** and tell the server the body format with **Content-Type**:

~~~js
const task = {
  title: "Review the API lesson",
  completed: false
};

const response = await fetch("/api/tasks", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(task)
});
~~~

**Content-Type** describes the request body being sent. **Accept** describes response formats the client can process. They are separate headers and serve different purposes.

JSON supports objects, arrays, strings, numbers, booleans, and **null**. It does not support JavaScript comments, functions, **undefined**, or trailing commas. Use JSON serialization rather than trying to hand-build JSON strings. For interoperable exchange between systems, encode JSON as UTF-8 and use the **application/json** media type.

If the request body is a **FormData** object, do not manually set its **Content-Type** to **application/json**. The browser must add the multipart boundary when sending form data. Use the encoding required by the endpoint.

## Read a JSON response safely

Use **fetch()**, inspect the HTTP response, and then parse its body according to the response:

~~~js
const response = await fetch("/api/tasks/42", {
  headers: { Accept: "application/json" }
});

if (!response.ok) {
  throw new Error("HTTP " + response.status);
}

const result = await response.json();
console.log(result);
~~~

Fetch does not reject just because the server returns a 4xx or 5xx status. Check **response.ok** or **response.status** before treating the operation as successful. The promise can still reject for a network or browser access failure, and **response.json()** can reject if the body is not valid JSON.

A client often needs an error body too. Parse it before throwing, but handle responses with no body and responses that are not JSON:

~~~js
async function requestJson(url, options = {}) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 204) {
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      body && typeof body === "object" && body.error && body.error.message
        ? body.error.message
        : "HTTP " + response.status;
    throw new Error(message);
  }

  return body;
}
~~~

This helper expects any provided body to already be a JSON string. Do not pass **FormData** or plain text to it. It demonstrates the decisions an API client has to make. Production code may also validate the response shape, handle authentication, cancellation, timeouts, and endpoint-specific statuses.

When calling this helper with a JSON body, create the string explicitly:

~~~js
const result = await requestJson("/api/tasks", {
  method: "POST",
  body: JSON.stringify({ title: "Read the API guide" })
});
~~~

Only set the JSON content type when the body really is JSON. For other body formats, set a suitable type or let the browser set it as appropriate.

## Use status and headers together

A created resource can be returned with status **201** and a **Location** header identifying it:

~~~http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/tasks/43

{"data":{"id":43,"title":"Read the API guide","completed":false}}
~~~

A client can inspect the header with **response.headers.get("location")**. A response body can include the same resource so the page can update immediately.

An API should also decide whether each endpoint returns a representation or no body. For example:

- **GET /api/tasks** can return **200** with a JSON array or collection object.
- **POST /api/tasks** can return **201** with the created task.
- **PUT /api/tasks/43** can return **200** with the replacement or **204** without a body.
- **DELETE /api/tasks/43** can return **204** without a body.

The exact choices depend on the API contract. Clients must follow that contract instead of assuming every success includes JSON.

## Design a predictable JSON shape

Consistency reduces special cases in client code. One API could return collection data like this:

~~~json
{
  "data": [
    { "id": 42, "title": "Review the API lesson", "completed": false },
    { "id": 43, "title": "Practice a request", "completed": true }
  ]
}
~~~

A matching error could use a stable structure:

~~~json
{
  "error": {
    "code": "validation_failed",
    "message": "The task title is required.",
    "details": [
      { "field": "title", "issue": "required" }
    ]
  }
}
~~~

The status code communicates the broad result, while the JSON body can provide machine-readable details. Keep error codes stable for client logic, use clear messages for people, and do not expose stack traces, credentials, private tokens, or internal implementation details.

JSON parsing only checks syntax. Validate that required fields exist and have expected types before using them. A response may be syntactically valid JSON and still be missing **data**, contain an unexpected value, or represent an error.

## Understand method retries

A retry can repeat work. If a network connection fails after the server processes a **POST**, the client may not know whether a resource was created. Automatically sending the same POST again could create a duplicate.

Use retries only when the operation is safe to repeat, or when the API provides a documented mechanism such as an idempotency key. A timeout or browser error does not prove that the server did nothing. The server remains responsible for enforcing uniqueness, authorization, and validation.

Idempotent methods are not a guarantee that repeating a request is harmless in every application. The method's intended effect, endpoint implementation, request body, and server-side behavior all matter.

## Common mistakes

### Using GET to change server state

GET is defined as safe. Do not use it for purchases, deletions, or other state changes that could be triggered by crawlers, prefetching, caching, or links.

### Treating POST as automatically safe to retry

POST is not guaranteed to be idempotent. A retry can create duplicate work unless the API provides a way to recognize the same operation.

### Calling response.json() for every success

A **204 No Content** response has no body. Follow the endpoint contract before reading a body.

### Forgetting to check response.ok

A 404 or 500 normally fulfills the Fetch promise. Check the status and parse an error body as needed.

### Confusing 401 and 403

A 401 response means the request lacks acceptable authentication. A 403 means the server refuses the action. Applications may choose carefully whether to reveal whether a resource exists.

### Sending an object directly as body

The body should be an appropriate body type. For JSON, use **JSON.stringify()** and set the JSON content type.

### Assuming valid JSON is valid application data

Parsing does not validate required fields, authorization, or business rules. Validate on both sides, and never rely on client checks for server security.

## Try it yourself

1. For a task collection, write the method and expected success status for listing, creating, replacing, partially updating, and deleting a task.
2. Create a JSON POST body with **JSON.stringify()** and inspect its **Content-Type** header.
3. Have an endpoint return **201** and inspect the **Location** response header.
4. Return **204** from a delete endpoint and ensure the client does not call **response.json()**.
5. Produce a **400** JSON error body and display its safe message to the user.
6. Compare **401**, **403**, and **404** responses and decide what the client should display.
7. Explain why repeating the same PUT can be idempotent while repeating a POST may create duplicate resources.
8. Add a PATCH operation that sets a boolean to **true**, then compare it with a patch that increments a number.
9. Validate an API response's shape after parsing JSON instead of trusting that expected fields exist.

## Key points

- The method expresses intent: GET reads, POST submits or creates, PUT replaces, PATCH partially modifies, and DELETE removes.
- Safe and idempotent are different properties. GET is safe; PUT and DELETE are idempotent by intended effect.
- Status codes have classes, but clients should handle the endpoint's specific contract.
- **201 Created** can identify a new resource with **Location**; **204 No Content** has no body to parse.
- Send JSON using **JSON.stringify()** and **Content-Type: application/json**.
- Fetch fulfills for HTTP errors, so check **response.ok** and parse an error body when present.
- Validate parsed data, avoid unsafe retries, and never trust client data as authorization.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [105 - Fetch API: requests, responses, and headers](105-fetch-api-requests-responses-and-headers.md) | [Open Q&A](../qnas/106-http-methods-status-codes-and-json-apis.md) | [Open example](../examples/106-http-methods-status-codes-and-json-apis.md) | [107 - CORS, credentials, and cross-origin rules](107-cors-credentials-and-cross-origin-rules.md) |