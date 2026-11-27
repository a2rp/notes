# 106 - HTTP methods, status codes, and JSON APIs: Questions and Answers

Use these questions to review HTTP method semantics, status codes, JSON request and response bodies, and API client behavior. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Which statement best describes GET?

- A. It is intended to read a resource without changing its state
- B. It always deletes the target resource
- C. It must contain a JSON body
- D. It creates a new resource every time

**Answer: A. It is intended to read a resource without changing its state.**

GET is safe and idempotent by its intended semantics. Do not use it for actions such as purchases or deletions.

### 2. Why can automatically retrying a POST create a problem?

- A. POST cannot contain a body
- B. It may create duplicate resources or repeat an action
- C. POST responses cannot have status codes
- D. The browser always changes POST to GET

**Answer: B. It may create duplicate resources or repeat an action.**

POST is not guaranteed to be idempotent. If the client cannot tell whether the first request was processed, repeating it may perform the action twice.

### 3. What is the intended use of PUT for a resource?

- A. Replace or create the target resource using the supplied representation
- B. Read only the headers
- C. Apply an unspecified counter increment
- D. Send a browser navigation request

**Answer: A. Replace or create the target resource using the supplied representation.**

Repeating the same PUT is intended to leave the target in the same state, which makes PUT idempotent by definition.

### 4. Which statement about PATCH is accurate?

- A. PATCH always replaces the whole resource
- B. PATCH applies a partial modification, and whether it is idempotent depends on the operation
- C. PATCH is always safe
- D. PATCH cannot have a request body

**Answer: B. PATCH applies a partial modification, and whether it is idempotent depends on the operation.**

Setting a field to **true** twice can have the same effect as doing it once. Incrementing a counter twice does not.

### 5. Which status is commonly used when a request creates a resource?

- A. 200 OK only
- B. 201 Created
- C. 204 No Content only
- D. 404 Not Found

**Answer: B. 201 Created.**

The response can include the created resource and a **Location** header identifying it.

### 6. What should a client expect from a 204 No Content response?

- A. A required JSON array
- B. A successful response with no body
- C. An authentication challenge
- D. A redirect to the created resource

**Answer: B. A successful response with no body.**

Do not call **response.json()** when the API contract says the response has no content.

### 7. Does fetch automatically reject when the server returns HTTP 500?

- A. Yes, for every 4xx or 5xx response
- B. No, it normally fulfills with a Response, so code must check its status
- C. Only if the response has JSON
- D. Only when the request uses POST

**Answer: B. No, it normally fulfills with a Response, so code must check its status.**

Check **response.ok** or **response.status**. Throw an error if the application wants to handle an unsuccessful HTTP status in **catch**.

### 8. What is the usual distinction between 401 and 403?

- A. 401 is an authentication problem; 403 means the server refuses the action
- B. 401 means not found; 403 means created
- C. 401 and 403 both mean success
- D. 401 is for GET only; 403 is for POST only

**Answer: A. 401 is an authentication problem; 403 means the server refuses the action.**

A 401 response means acceptable authentication is missing or not provided. A 403 response means the server refuses the request, often because the action is not permitted.

### 9. Which header describes a JSON request body?

- A. **Accept: application/json**
- B. **Content-Type: application/json**
- C. **Location: application/json**
- D. **Allow: application/json**

**Answer: B. Content-Type: application/json.**

**Accept** describes a response format the client can process. **Content-Type** describes the body that is being sent.

### 10. Which status commonly indicates that a path does not support the request method?

- A. 201 Created
- B. 204 No Content
- C. 405 Method Not Allowed
- D. 503 Service Unavailable

**Answer: C. 405 Method Not Allowed.**

The server can include an **Allow** header listing methods supported by that resource.

## Objective questions

### 11. What do the first digits of the HTTP status code classes mean?

**Answer:** **1xx** informational, **2xx** successful, **3xx** redirection, **4xx** client error, and **5xx** server error.

The specific status code gives more detail than the class alone.

### 12. True or false: A 202 Accepted response guarantees that asynchronous work is finished.

**Answer: False.**

The request was accepted for processing. The work can still be queued or in progress.

### 13. What kind of result does 409 Conflict commonly represent?

**Answer:** A request conflicts with the current state of the target resource.

Examples include a version conflict or an attempt to use a unique value that is already taken.

### 14. When can an API use 422 Unprocessable Content?

**Answer:** When the content type and syntax are understood, but the instructions cannot be processed.

For example, a well-formed JSON task could fail a business validation rule. The API should document its own status conventions.

### 15. What can a 201 response's **Location** header identify?

**Answer:** The URI of the newly created resource.

A client can inspect it with **response.headers.get("location")**. The response may also include the new resource in its body.

### 16. How should an ordinary JavaScript object be turned into a JSON request body?

**Answer:** Serialize it with **JSON.stringify()** and set **Content-Type: application/json**.

Passing a plain object directly as **fetch()**'s body does not automatically encode it as JSON.

### 17. True or false: Valid JSON syntax proves that the response has all fields the application expects.

**Answer: False.**

Parsing checks JSON syntax. The client must still validate the value's structure and required fields before using it.

### 18. Does an idempotent request have to return the same status every time?

**Answer: No.**

Idempotence describes the intended effect on the resource, not identical responses. A first DELETE can return 204 and a later one can return 404 while the intended final state remains absent.

### 19. What media type identifies JSON, and what encoding should interoperable JSON exchanges use?

**Answer:** The media type is **application/json**, and interoperable JSON exchange uses UTF-8 encoding.

Use the JSON media type on the body and serialize values with JSON APIs rather than hand-building strings.

### 20. What is a sensible place for search terms that should be shareable and bookmarkable?

**Answer:** Query parameters on a GET URL.

Do not put passwords or other secrets in a query string. URLs may be retained in history, logs, or copied to other places.

## Short-answer questions

### 21. Explain the difference between safe and idempotent.

**Answer:** A safe method is intended to read without changing resource state. An idempotent method is intended to have the same effect when the same request is repeated.

GET is both safe and idempotent. PUT and DELETE are idempotent by intended effect, but they are not safe because they can change state.

### 22. Choose common methods for listing, creating, replacing, partially updating, and deleting a task.

**Answer:** Use GET, POST, PUT, PATCH, and DELETE, respectively.

The endpoint's contract must define the exact request body and response. PUT represents replacement, while PATCH represents partial modification.

### 23. Why can a client be unsure whether a POST should be retried after a timeout?

**Answer:** The server may have processed the request even if the response did not reach the client.

Retrying could create a duplicate. Retry only when safe for the operation or when the API offers a documented idempotency mechanism.

### 24. How can a client show a useful validation message from a JSON error response?

**Answer:** Check the response status, read the JSON error body when available, and display its safe message.

The status communicates the result. The body can provide a stable error code and field details. Do not display stack traces or internal secrets.

### 25. What should a consistent JSON error object contain?

**Answer:** At minimum, a stable machine-readable code and a clear message. It can also include structured details such as the field that failed validation.

Keep the shape predictable and avoid exposing internal diagnostics to clients.

### 26. Why must a server validate and authorize JSON data even if the page already checked it?

**Answer:** Clients can bypass page code and send arbitrary requests. The server controls protected resources and must independently enforce validation and authorization.

Client validation helps users correct mistakes. It is not a security boundary.

## Coding questions

### 27. Send a JSON POST request to create a task and return the created object.

**Answer:**

~~~js
async function createTask(task) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const result = await response.json();
  return result.data;
}
~~~

**Explanation:** The request body is serialized as JSON and labeled with its content type. The response status is checked before reading the expected JSON success body.

### 28. Delete a task when the API returns 204 with no response body.

**Answer:**

~~~js
async function deleteTask(id) {
  const response = await fetch("/api/tasks/" + id, {
    method: "DELETE",
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
~~~

**Explanation:** The handler checks for HTTP failure first. A 204 response is successful but has no body, so it returns without parsing JSON.

### 29. Extract a safe message from a JSON error response, with a status fallback.

**Answer:**

~~~js
async function readApiError(response) {
  const contentType = response.headers.get("content-type") || "";
  let body = null;

  if (contentType.includes("application/json")) {
    body = await response.json();
  }

  if (
    body &&
    typeof body === "object" &&
    body.error &&
    typeof body.error.message === "string"
  ) {
    return body.error.message;
  }

  return "Request failed with HTTP " + response.status;
}
~~~

**Explanation:** The function does not assume an error body is JSON or has the expected shape. A real client should also handle body parsing errors and decide which server-provided messages are safe to display.

### 30. Send a PATCH request that sets a task's completed value to true.

**Answer:**

~~~js
const response = await fetch("/api/tasks/42", {
  method: "PATCH",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ completed: true })
});
~~~

**Explanation:** The request carries only the field this patch changes. Setting the value to **true** repeatedly has the same intended effect, but other patch operations may not be idempotent.

### 31. Build a GET request with an encoded search query and read the returned JSON.

**Answer:**

~~~js
const params = new URLSearchParams({ search: "web platform" });
const response = await fetch("/api/tasks?" + params, {
  headers: { Accept: "application/json" }
});

if (!response.ok) {
  throw new Error("HTTP " + response.status);
}

const result = await response.json();
~~~

**Explanation:** **URLSearchParams** encodes the query value. GET should remain a read operation, and private secrets should not be put in the URL.

### 32. Replace a task with PUT and include the complete representation expected by this API.

**Answer:**

~~~js
const replacement = {
  title: "Review the HTTP lesson",
  completed: false
};

const response = await fetch("/api/tasks/42", {
  method: "PUT",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(replacement)
});
~~~

**Explanation:** This API defines PUT as replacing the task representation. Other APIs may require additional fields, so follow the endpoint's documented contract.

### 33. Return a parsed success value for JSON, but avoid parsing a 204 response.

**Answer:**

~~~js
async function readSuccess(response) {
  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
~~~

**Explanation:** A successful status does not always mean a body exists. The helper handles 204 before calling the one-time JSON body reader.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [105 - Fetch API: requests, responses, and headers](../qnas/105-fetch-api-requests-responses-and-headers.md) | [Open lesson](../lessons/106-http-methods-status-codes-and-json-apis.md) | [Open example](../examples/106-http-methods-status-codes-and-json-apis.md) | [107 - CORS, credentials, and cross-origin rules](../lessons/107-cors-credentials-and-cross-origin-rules.md) |