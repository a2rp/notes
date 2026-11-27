# 105 - Fetch API: requests, responses, and headers: Questions and Answers

Use these questions to review **fetch()**, request and response metadata, headers, body parsing, and error handling. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What does **fetch(url)** normally fulfill with?

- A. The parsed JSON value
- B. A **Response** object
- C. The response body as text
- D. A DOM element

**Answer: B. A Response object.**

Read the response body separately with a method such as **json()** or **text()**.

### 2. What usually happens when a server responds with HTTP 404?

- A. The fetch promise rejects automatically
- B. The fetch promise fulfills with a Response whose status is 404
- C. The browser retries until status 200
- D. The body is automatically parsed as an Error

**Answer: B. The fetch promise fulfills with a Response whose status is 404.**

HTTP error statuses are responses. Check **response.ok** or **response.status** and decide how the application handles them.

### 3. What does **response.ok** indicate?

- A. The response body contains valid JSON
- B. The status is in the 200 to 299 range
- C. The network is always secure
- D. The user is authenticated

**Answer: B. The status is in the 200 to 299 range.**

It does not validate the response body or establish that the user is authorized to act on its data.

### 4. What does **await response.json()** do?

- A. Sends the same request again
- B. Reads the body and parses it as JSON
- C. Checks whether the status is 200
- D. Converts headers to an object

**Answer: B. Reads the body and parses it as JSON.**

The method returns a promise. It can reject if reading fails or the body is not valid JSON.

### 5. What happens after **response.json()** consumes a response body?

- A. The same body can be read repeatedly
- B. The response's body is marked used and cannot normally be read again
- C. The response status changes to 204
- D. The response becomes a Request

**Answer: B. The response's body is marked used and cannot normally be read again.**

Choose one representation, or clone the response before consuming it if two independent reads are needed.

### 6. Which header describes the format of a request body?

- A. **Accept**
- B. **Content-Type**
- C. **Host**
- D. **Location**

**Answer: B. Content-Type.**

**Accept** describes response formats the client can process. **Content-Type** describes the media type of a body being sent.

### 7. How should a script read a response header named **content-type**?

- A. **response.headers.get("content-type")**
- B. **response.header("content-type")**
- C. **response.contentType()**
- D. **response.getHeader("content-type")**

**Answer: A. response.headers.get("content-type").**

The **Headers** interface provides **get()**, **has()**, **set()**, and other header operations.

### 8. Which condition can cause fetch to reject in a browser?

- A. Any status outside the 200 to 299 range
- B. A network failure or a browser-blocked cross-origin response
- C. A response with a JSON body
- D. A response containing a custom header

**Answer: B. A network failure or a browser-blocked cross-origin response.**

A normal HTTP 404 response still fulfills with a **Response**. A CORS restriction can prevent page JavaScript from receiving a readable response.

### 9. What does **response.status** provide?

- A. The numeric response status code
- B. The response JSON body
- C. The URL query parameters
- D. The request's Accept header

**Answer: A. The numeric response status code.**

For example, it can be 200, 201, 204, 404, or 500. Check the endpoint's contract before deciding what a particular status means.

### 10. What does **mode: "no-cors"** do for a cross-origin fetch?

- A. Disables all browser security checks
- B. Makes the response body readable to any page
- C. Does not bypass CORS and can result in an opaque response
- D. Forces the server to return JSON

**Answer: C. It does not bypass CORS and can result in an opaque response.**

An opaque response does not expose its status, headers, or body to page JavaScript. Configure the server to permit the intended origin.

## Objective questions

### 11. True or false: A successful 204 No Content response should always be parsed with **response.json()**.

**Answer: False.**

A 204 response has no content to parse. Check the endpoint's expected status and body before calling a body reader.

### 12. Which object provides the response headers?

**Answer:** **response.headers**, which is a **Headers** object.

Use methods such as **get("content-type")** and **has("cache-control")**. Cross-origin visibility can be restricted by browser policy.

### 13. How can code read a body twice in two different formats?

**Answer:** Clone the response before reading either copy, then consume each copy once.

For example, call **response.clone()**, read the original with **text()**, and read the clone with **json()**. Avoid cloning large bodies unnecessarily.

### 14. Does **fetch()** return the parsed body as soon as it fulfills?

**Answer:** No. It fulfills with a **Response** before the body has been read by **json()**, **text()**, or another body method.

This is why code commonly has one await for **fetch()** and another for **response.json()**.

### 15. Name three errors or failures that a **catch** block may handle in a Fetch workflow.

**Answer:** A network or CORS failure, a body parsing failure, and an error explicitly thrown after checking **response.ok**.

The catch block handles rejected promises in the chain. An HTTP error response does not reject automatically, so code must throw or branch on its status.

### 16. What does a **Request** object represent?

**Answer:** A request URL and its request options, such as method, headers, and possibly a body.

It can be passed to **fetch(request)**. For simple cases, passing a URL and options directly is shorter.

### 17. What should be used to safely construct query parameter values?

**Answer:** **URLSearchParams**.

It encodes parameter names and values. Query strings are visible in URLs, so do not use them for secrets.

### 18. How should a JavaScript object be turned into a JSON request body?

**Answer:** Use **JSON.stringify(object)** and set **Content-Type: application/json**.

The header tells the server how to interpret the string body. The server must still validate the received data.

### 19. Should browser JavaScript manually set the **Host** header?

**Answer:** No. Some headers are controlled or restricted by the browser.

Set application-level headers that the API permits, such as **Accept** or **Content-Type**, and let the browser manage transport-level details.

### 20. What can happen if a response body contains malformed JSON and the code calls **response.json()**?

**Answer:** The promise returned by **json()** rejects during parsing.

Use **try/catch** around the full asynchronous operation. A response can have a successful status and still contain malformed or unexpected data.

## Short-answer questions

### 21. Why should code check **response.ok** instead of assuming fetch rejects on a 404?

**Answer:** Fetch fulfills for ordinary HTTP responses, including 404 and 500. The code must inspect the status and decide whether to use the body or treat the response as an application error.

A common pattern is to throw an Error when **response.ok** is false, then handle that error in **catch**.

### 22. Why is the response body normally readable only once?

**Answer:** The body is represented as a stream that is consumed by a body-reading method.

Once **json()**, **text()**, or another reader uses it, the body is marked used. Clone the response before the first read if you truly need two copies.

### 23. Explain the difference between an HTTP error and a network failure.

**Answer:** For an HTTP error, the server returned a readable response with an unsuccessful status. For a network failure, the browser could not provide a usable response.

An HTTP error fulfills fetch and should be handled by checking status. A network failure rejects the promise and can be handled with **catch**.

### 24. Why is **no-cors** not a fix for a CORS error?

**Answer:** It does not grant page JavaScript access to the cross-origin response. It can produce an opaque response whose status, headers, and body are hidden.

The server must allow the page's origin for the browser to expose the response.

### 25. How can code decide whether to parse a response as JSON based on its content type?

**Answer:** Read **response.headers.get("content-type")**, check that it identifies JSON, and then call **response.json()**.

Do not assume every successful response contains JSON. Some endpoints return text or no body at all.

### 26. What is the purpose of **URLSearchParams** in a GET request?

**Answer:** It constructs and encodes query parameter names and values.

It avoids unsafe raw string concatenation. Keep passwords and secrets out of the query string because URLs can appear in history and logs.

## Coding questions

### 27. Write a helper that requests JSON, throws for unsuccessful HTTP statuses, and returns the parsed body.

**Answer:**

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
~~~

**Explanation:** The helper requests a JSON response, checks the HTTP status explicitly, then reads and parses the body. A rejected network or parsing promise propagates to the caller.

### 28. Add a custom header to a request using a **Headers** object.

**Answer:**

~~~js
const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("X-Client-Version", "1");

const request = new Request("/api/products", {
  method: "GET",
  headers
});

const response = await fetch(request);
~~~

**Explanation:** **Headers.set()** sets or replaces a value. The Request object can be inspected or passed directly to **fetch()**.

### 29. Read the response content type before parsing it as JSON.

**Answer:**

~~~js
const response = await fetch("/api/profile");

if (!response.ok) {
  throw new Error("HTTP " + response.status);
}

const contentType = response.headers.get("content-type") || "";
if (!contentType.includes("application/json")) {
  throw new Error("Expected a JSON response.");
}

const profile = await response.json();
~~~

**Explanation:** The status check handles HTTP failures, and the header check avoids blindly parsing an unexpected format. The server's JSON data should still be checked for the shape the application expects.

### 30. Show one error message for both a failed request and an unsuccessful HTTP status.

**Answer:**

~~~js
async function loadProfile() {
  try {
    const response = await fetch("/api/profile");

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const profile = await response.json();
    console.log(profile);
  } catch (error) {
    console.error("Could not load the profile:", error);
  }
}
~~~

**Explanation:** The explicit throw converts an unsuccessful HTTP status into a rejected promise. The **catch** then handles it along with network and parsing failures.

### 31. Build a GET URL with two encoded query parameters.

**Answer:**

~~~js
const params = new URLSearchParams({
  search: "web platform",
  page: "2"
});

const response = await fetch("/api/articles?" + params);
~~~

**Explanation:** **URLSearchParams** encodes the value containing a space. Do not put credentials or private data in the query string.

### 32. Read the body as text and report whether it has already been consumed.

**Answer:**

~~~js
const response = await fetch("/api/status");
const bodyText = await response.text();

console.log(bodyText);
console.log(response.bodyUsed);
~~~

**Explanation:** After **text()** finishes reading the body, **bodyUsed** is true. Do not then call **json()** on the same response.

### 33. A fetch receives status 500. What should the code do to enter its catch handler?

**Answer:** Check **response.ok** and throw an error when it is false.

~~~js
const response = await fetch("/api/report");

if (!response.ok) {
  throw new Error("HTTP " + response.status);
}
~~~

**Explanation:** Status 500 is still an HTTP response, so fetch fulfills. The explicit throw creates an application error that a surrounding **try/catch** can handle.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [104 - Forms, input validation, and submission](../qnas/104-forms-input-validation-and-submission.md) | [Open lesson](../lessons/105-fetch-api-requests-responses-and-headers.md) | [Open example](../examples/105-fetch-api-requests-responses-and-headers.md) | [106 - HTTP methods, status codes, and JSON APIs](../lessons/106-http-methods-status-codes-and-json-apis.md) |