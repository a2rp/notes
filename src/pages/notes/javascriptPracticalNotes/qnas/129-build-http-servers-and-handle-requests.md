# 129 - Build HTTP servers and handle requests: Q&A

Use these questions to review Node.js HTTP servers, request routing, body parsing, response status codes, and server lifecycle. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which module provides Node.js HTTP server APIs?

- A. node:http
- B. node:worker_threads
- C. node:events
- D. node:buffer

**Answer: A.**

**Explanation:** node:http provides the low-level HTTP server and client APIs.

### 2. What arguments does a createServer request handler receive?

- A. An incoming request and a response
- B. A pathname and a JSON object
- C. A socket and a Worker
- D. A status code and a callback

**Answer: A.**

**Explanation:** The incoming request exposes request information and its stream. The response is used to send status, headers, and a body.

### 3. What is the usual type of request.url on a Node.js HTTP server?

- A. A request target such as /items?page=2
- B. A trusted complete URL with a verified host
- C. A parsed URL object
- D. A filesystem path

**Answer: A.**

**Explanation:** Parse the request target with URL and a fixed base. Do not assume the incoming value is a trusted complete URL.

### 4. Why should a server check both request.method and the pathname?

- A. The same path can support different operations for different methods
- B. The method contains the query parameters
- C. The pathname determines the response encoding
- D. HTTP does not have response status codes

**Answer: A.**

**Explanation:** A route is commonly identified by both method and path. A known path with an unsupported method can receive 405.

### 5. Which status is appropriate when a new note is successfully created?

- A. 201 Created
- B. 404 Not Found
- C. 413 Content Too Large
- D. 500 Internal Server Error

**Answer: A.**

**Explanation:** 201 indicates that the request created a resource.

### 6. Which status describes a known path that does not accept the submitted method?

- A. 405 Method Not Allowed
- B. 404 Not Found
- C. 415 Unsupported Media Type
- D. 200 OK

**Answer: A.**

**Explanation:** A 405 response is for a method unsupported by a known resource. Include an Allow header listing the accepted methods.

### 7. Which status fits a request body that exceeds the endpoint's configured size limit?

- A. 413 Content Too Large
- B. 201 Created
- C. 301 Moved Permanently
- D. 204 No Content

**Answer: A.**

**Explanation:** 413 indicates that the server refuses to process a request because its content is too large.

### 8. What should an endpoint return when it requires JSON but receives another content type?

- A. 415 Unsupported Media Type
- B. 404 Not Found
- C. 500 Internal Server Error
- D. 201 Created

**Answer: A.**

**Explanation:** The content type describes the representation sent by the client. Validate it before parsing the body as JSON.

### 9. Why should code reading request data handle multiple chunks?

- A. IncomingMessage is a readable stream and chunk boundaries are not message boundaries
- B. Each request always has exactly two chunks
- C. The request body is delivered as a parsed object
- D. Chunks arrive in a Worker

**Answer: A.**

**Explanation:** A body can arrive in one or more chunks. Accumulate or process the stream without assuming a particular chunk count.

### 10. What should a server do when JSON.parse succeeds but the resulting value has the wrong shape?

- A. Validate the value and return a client error
- B. Trust it because valid JSON is always valid application data
- C. Return 200 without a body
- D. Convert it to a URL

**Answer: A.**

**Explanation:** Syntax validation and application validation are separate. Check required fields, types, and value limits.

### 11. What is a risk of using the Host header to build a trusted redirect URL?

- A. The client can supply the header, so it should not be trusted without validation
- B. It always contains a verified certificate
- C. It removes the request body
- D. It is only available to HTTPS servers

**Answer: A.**

**Explanation:** Use a configured trusted origin for security-sensitive redirects. The server should not treat arbitrary request headers as trusted configuration.

### 12. What does response.end() do?

- A. Completes the response
- B. Starts listening on a port
- C. Parses the request URL
- D. Adds a route

**Answer: A.**

**Explanation:** A response handler must finish the response, or the client can remain waiting.

## Short-answer questions

### 13. What are the main parts of an HTTP request and response?

**Answer:** A request has a method, target URL, headers, and optionally a body. A response has a status code, headers, and optionally a body.

**Explanation:** The server reads the request and constructs a response that describes the result.

### 14. Why should URL query parameter values be validated after parsing?

**Answer:** Query parameters are strings supplied by the requester and may be missing, malformed, too large, or outside the application's accepted range.

**Explanation:** Convert a value only after checking that it meets the route's requirements. Do not pass untrusted values directly into sensitive operations.

### 15. Why is a fixed base URL used when parsing request.url?

**Answer:** request.url is a request target, not a trusted origin. A fixed base lets URL parse its pathname and query without relying on a client-supplied Host header.

**Explanation:** This is especially important when constructing redirects or making security-sensitive origin decisions.

### 16. Why should a JSON endpoint validate Content-Type?

**Answer:** It should only parse representations that the endpoint accepts as JSON.

**Explanation:** Return 415 for an unsupported media type rather than interpreting arbitrary content as JSON.

### 17. What is the difference between a 404 and a 405 response?

**Answer:** 404 means the route was not found. 405 means the path is known, but the supplied method is not supported for it.

**Explanation:** A 405 response should include an Allow header listing the methods the route accepts.

### 18. Why must a server limit the size of a request body?

**Answer:** Without a limit, a client could make the server retain excessive data in memory.

**Explanation:** A byte limit bounds retained body data. Timeouts and infrastructure limits also help protect against requests that arrive too slowly or continue sending data.

### 19. Why should an unexpected error response avoid including an exception stack trace?

**Answer:** A stack trace may reveal internal paths, implementation details, or other sensitive information.

**Explanation:** Log diagnostic details on the server, and send a generic 500 response to the client.

### 20. What does server.close() do during graceful shutdown?

**Answer:** It stops the server from accepting new connections and invokes its callback when shutdown completes.

**Explanation:** Let active work finish where possible and avoid forcing immediate process termination during cleanup.

## Scenarios

### 21. A handler returns JSON but the client waits indefinitely. What common response bug should you check?

**Answer:** Check that every route calls response.end() or otherwise completes or destroys the response.

**Explanation:** Setting headers or writing part of a body does not by itself tell the client that the response is complete.

### 22. A client sends malformed JSON to POST /api/notes. What status is appropriate?

**Answer:** 400 Bad Request.

**Explanation:** The request body syntax is invalid. Keep the parser error from exposing internal details.

### 23. A client sends valid JSON with a numeric title, but the endpoint requires a string. What should happen?

**Answer:** Validate the parsed value and return 400 Bad Request.

**Explanation:** Valid JSON can still violate the endpoint's data contract.

### 24. A request targets /api/notes with DELETE, while the route supports only GET and POST. What should the server return?

**Answer:** 405 Method Not Allowed with an Allow header such as GET, POST.

**Explanation:** The path exists, but DELETE is not supported for it.

### 25. The server gets a request for /missing. Which response fits?

**Answer:** 404 Not Found.

**Explanation:** No route matches the requested path.

### 26. The server logs an exception containing a local filesystem path. Should it include that same text in its JSON 500 response?

**Answer:** No. Send a generic error message and keep diagnostic details in server logs.

**Explanation:** Client-facing errors should not reveal sensitive implementation details.

### 27. The server stores every request chunk before checking its total size. What is the problem?

**Answer:** The limit is checked too late, after memory has already been used to retain the oversized body.

**Explanation:** Track the byte count as chunks arrive and stop retaining chunks after the limit is crossed.

### 28. A local learning server is bound to 0.0.0.0 even though only the developer needs to access it from the same computer. What is a safer binding?

**Answer:** Bind to 127.0.0.1.

**Explanation:** This limits the server to the local machine. Bind to network interfaces only when external access is intended and protected.

### 29. A developer uses a request pathname directly as a file path to serve content. What must be addressed first?

**Answer:** The server needs a deliberate mapping and path access policy. It must not allow untrusted path input to select arbitrary files.

**Explanation:** Route parsing is not filesystem authorization. Resolve and validate file paths within an explicitly allowed directory.

### 30. A process receives SIGINT while the server is handling requests. Why is server.close() preferable to immediately calling process.exit()?

**Answer:** It allows the server to stop accepting new connections and complete its shutdown callback instead of terminating abruptly.

**Explanation:** Graceful shutdown gives active work and cleanup a chance to finish.

## Coding questions

### 31. Send a JSON response with a status and content type.

**Answer:**

~~~js
function sendJson(response, statusCode, data) {
  const body = JSON.stringify(data);

  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8"
  });

  response.end(body);
}
~~~

**Explanation:** Serialize the value, set the status and content type before sending the body, and end the response.

### 32. Parse a query parameter as a positive integer.

**Answer:**

~~~js
const url = new URL(request.url ?? "/", "http://localhost");
const limitText = url.searchParams.get("limit");

if (limitText === null) {
  sendJson(response, 200, { limit: 20 });
  return;
}

const limit = Number(limitText);

if (!Number.isSafeInteger(limit) || limit < 1) {
  sendJson(response, 400, {
    error: "limit must be a positive integer"
  });
  return;
}

sendJson(response, 200, { limit });
~~~

**Explanation:** URLSearchParams returns strings. Convert and validate before using the value.

### 33. Route a known resource and distinguish unsupported methods from missing paths.

**Answer:**

~~~js
if (url.pathname !== "/api/notes") {
  sendJson(response, 404, { error: "Route not found" });
  return;
}

if (request.method === "GET") {
  sendJson(response, 200, { data: notes });
  return;
}

if (request.method === "POST") {
  // Validate and create a note.
  return;
}

sendJson(
  response,
  405,
  { error: "Method not allowed" },
  { allow: "GET, POST" }
);
~~~

**Explanation:** First determine whether the path exists. Then check supported methods and include Allow with a 405 response.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [128 - Worker threads, child processes, and subprocesses](../lessons/128-worker-threads-child-processes-and-subprocesses.md) | [Lesson 129](../lessons/129-build-http-servers-and-handle-requests.md) | [Example 129](../examples/129-build-http-servers-and-handle-requests.md) | [130 - Node.js test runner and service tests](../lessons/130-node-js-test-runner-and-service-tests.md) |
