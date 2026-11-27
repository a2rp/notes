# Browser project: build an API-driven application - Q&A

These questions review [Chapter 142](../lessons/142-browser-project-build-an-api-driven-application.md). Each answer follows its question and includes an explanation.

## Multiple-choice questions

### 1. What should an API contract describe?

A. Only the API's display colors  
B. Endpoints, methods, parameters, response data, and error behavior  
C. The browser's toolbar  
D. The user's screen resolution  

**Answer:** B. Endpoints, methods, parameters, response data, and error behavior.

**Explanation:** A clear contract tells the client what to request and what shape and outcomes it must handle.

### 2. What does Fetch do when a server responds with HTTP 404?

A. It always rejects its promise  
B. It normally resolves with a Response that has a non-success status  
C. It converts the response to an empty array  
D. It retries automatically  

**Answer:** B. It normally resolves with a Response that has a non-success status.

**Explanation:** The application must inspect the response status, commonly with its ok property, before treating the result as successful.

### 3. What does checking response.ok help determine?

A. Whether the HTTP response has a successful status  
B. Whether the JSON fields match the application model  
C. Whether the browser supports JavaScript  
D. Whether the server is authorized to access the browser  

**Answer:** A. Whether the HTTP response has a successful status.

**Explanation:** It does not validate the body. JSON still must be parsed and its structure checked.

### 4. What can cause response.json() to fail?

A. The response body is not valid JSON  
B. The page has a heading  
C. A button has a label  
D. The request uses a query parameter  

**Answer:** A. The response body is not valid JSON.

**Explanation:** JSON parsing is asynchronous and can reject when the body is malformed or cannot be read as JSON.

### 5. What does JSON.parse or response.json prove about the data?

A. That required fields exist and have the correct types  
B. Only that the body can be parsed as JSON  
C. That the server is trustworthy  
D. That the response has no errors  

**Answer:** B. Only that the body can be parsed as JSON.

**Explanation:** Valid JSON can still have the wrong shape. Validate the data against the contract before using it.

### 6. What is the purpose of URLSearchParams?

A. To encode query parameter names and values  
B. To cancel a request  
C. To render a product card  
D. To create server credentials  

**Answer:** A. To encode query parameter names and values.

**Explanation:** It safely builds a query string when values include spaces or reserved characters.

### 7. What does AbortController provide for a Fetch request?

A. A way to cancel work associated with its signal  
B. A way to validate JSON  
C. A way to configure server CORS  
D. A way to retry forever  

**Answer:** A. A way to cancel work associated with its signal.

**Explanation:** Pass the controller's signal to fetch, then call abort when the request is no longer needed.

### 8. What is a race condition in a search interface?

A. A response from an older request arrives after a newer one and overwrites it  
B. A visitor submits a form with Enter  
C. The JSON parser reads an array  
D. The browser renders a heading before a paragraph  

**Answer:** A. A response from an older request arrives after a newer one and overwrites it.

**Explanation:** Cancellation and a request identifier can prevent stale results from replacing the latest state.

### 9. Who configures permission for a browser page to read a cross-origin API response?

A. The API server through its CORS response headers  
B. The page's CSS  
C. The visitor's input label  
D. The browser application's rendering function  

**Answer:** A. The API server through its CORS response headers.

**Explanation:** Client JavaScript cannot grant itself cross-origin permission. The server must allow the requesting origin.

### 10. Why is no-cors usually not useful for an API whose JSON the page needs to read?

A. It makes the response opaque to page JavaScript  
B. It turns the JSON into HTML  
C. It automatically adds authentication  
D. It retries the request  

**Answer:** A. It makes the response opaque to page JavaScript.

**Explanation:** The body and headers are not available to ordinary page code. The API should permit readable access or be called through a server the application controls.

## Short-answer questions

### 11. Why should the page show a loading state before a request completes?

**Answer:** It tells visitors that the application is working and that results are not ready yet.

**Explanation:** Without it, a blank list can look like an empty result or a broken page.

### 12. Name four useful request states for a data-driven interface.

**Answer:** Loading, success with results, success with no results, and error.

**Explanation:** The same empty-looking list can mean different things. Explicit states let the page communicate each outcome accurately.

### 13. Why should a successful HTTP status still be followed by data validation?

**Answer:** The server may return valid JSON with missing, incorrect, or unexpected fields.

**Explanation:** Parsing checks syntax, while validation checks that application assumptions about the data are true.

### 14. What does normalizing data at the API boundary mean?

**Answer:** Checking and converting incoming values into a consistent internal model before the rest of the application uses them.

**Explanation:** For example, an API may return numeric or string identifiers, while the UI can normalize them to strings in one place.

### 15. What is the difference between client-side filtering and API-side filtering?

**Answer:** Client-side filtering searches data already loaded in the page; API-side filtering sends criteria to the server and receives a subset.

**Explanation:** Client filtering is simple for a small loaded collection. Server filtering can reduce transfer and memory for large data sets.

### 16. Why should a superseded request be aborted or ignored?

**Answer:** To prevent outdated results from replacing data from a newer request and to avoid unnecessary work.

**Explanation:** Search input can start overlapping requests. The response order may differ from the request order.

### 17. Why is cancellation not the same as undoing a server operation?

**Answer:** Aborting stops the client from waiting for or using a result, but the server may already have performed the operation.

**Explanation:** Mutations need server-side duplicate protection or idempotency design; client cancellation alone cannot reverse them.

### 18. What is a safe use of an error message in the page?

**Answer:** Give a concise, actionable explanation without exposing tokens, stack traces, or internal implementation details.

**Explanation:** Developers can retain diagnostics for debugging, while user-facing copy should help visitors recover safely.

### 19. Why is putting a private API key in browser JavaScript unsafe?

**Answer:** Visitors can inspect client-side files and network requests to retrieve it.

**Explanation:** A true secret must remain on a server under the application's control. Public keys still need restrictions and monitoring.

### 20. What is the purpose of a retry button?

**Answer:** It lets a visitor deliberately start another attempt after a recoverable failure.

**Explanation:** It provides user control without repeatedly sending requests in an automatic loop.

## Read the code

### 21. What happens if response.ok is false in this code?

~~~js
if (!response.ok) {
  throw new Error("HTTP " + response.status);
}
~~~

**Answer:** The function throws an error containing the response status.

**Explanation:** The throw transfers control to the nearest catch block, preventing the body from being treated as a successful result.

### 22. Why is await used here?

~~~js
const payload = await response.json();
~~~

**Answer:** It waits for the body parsing promise to resolve and gives the parsed value to payload.

**Explanation:** If parsing rejects, the error can be handled by the surrounding try/catch.

### 23. What value does this expression produce?

~~~js
const params = new URLSearchParams({ q: searchTerm });
~~~

**Answer:** A query-parameter object containing an encoded q value.

**Explanation:** The object can be converted to a query string without manually escaping user-provided characters.

### 24. What does this check prevent?

~~~js
if (!payload || !Array.isArray(payload.items)) {
  throw new Error("Unexpected response.");
}
~~~

**Answer:** It prevents the code from treating a missing payload or non-array items value as a valid product collection.

**Explanation:** The response must match the expected contract before item processing begins.

### 25. What happens when abort is called on the controller connected to a pending fetch?

**Answer:** The request is canceled where possible and the fetch promise rejects, usually with an abort-related error.

**Explanation:** The application should distinguish intentional cancellation from a failure worth showing to the visitor.

### 26. What does the request identifier comparison protect against?

~~~js
if (requestId !== latestRequestId) {
  return;
}
~~~

**Answer:** It prevents an older request from updating state after a newer request has started.

**Explanation:** Responses can arrive out of order. Only the latest request should update the current view.

### 27. What is the meaning of this status transition?

~~~js
state.status = "loading";
render();
~~~

**Answer:** The application records that a request is in progress and immediately updates the interface to show that state.

**Explanation:** Rendering after setting the state makes the loading feedback visible before awaiting the network.

### 28. Why does this code treat abort separately?

~~~js
if (error.name === "AbortError") {
  return;
}
~~~

**Answer:** An intentional cancellation is expected control flow, not necessarily a user-facing failure.

**Explanation:** Superseding or disposing a request should not show an alarming error when the user still has a valid current request.

### 29. What happens when this array is empty?

~~~js
const visibleProducts = products.filter(matchesQuery);
~~~

**Answer:** There are no products matching the query, though products may still exist in the original collection.

**Explanation:** The interface should distinguish a filtered-empty view from an API response that returned no products at all.

### 30. Why should remote titles be assigned through text content?

~~~js
titleElement.textContent = product.title;
~~~

**Answer:** The title is displayed as literal text instead of being parsed as markup.

**Explanation:** API data is still untrusted input. Safe text rendering prevents strings from creating unintended DOM elements.

## Applied questions

### 31. The server responds with HTTP 500, but fetch resolves. What should the application do?

**Answer:** Check the response status, switch to an error state, and offer a suitable retry path.

**Explanation:** A resolved fetch promise means a response was received, not that the HTTP operation succeeded.

### 32. A response has status 200 but contains malformed JSON. Which stage failed?

**Answer:** Body parsing failed after the HTTP response succeeded.

**Explanation:** The page should catch the parsing failure and show an error instead of trying to render unusable data.

### 33. An API returns an array, but one item has a string for price instead of a number. What should happen?

**Answer:** Validate it against the contract and either reject the response or normalize it only if the contract explicitly permits that representation.

**Explanation:** Silently trusting or coercing unexpected values can cause incorrect display and calculations.

### 34. A visitor types several search terms quickly and an older response arrives last. How do you avoid showing stale results?

**Answer:** Abort the earlier request and verify a request identifier before committing each response to state.

**Explanation:** Debouncing can reduce how many requests begin, but race handling is still needed because the remaining requests can finish out of order.

### 35. The browser console reports a CORS failure for an API on another origin. Can the page fix it by setting a JavaScript option?

**Answer:** No. The API server must permit the page's origin, or the request must go through a server under the application's control.

**Explanation:** CORS is enforced by the browser based on server response headers. Client code cannot grant itself access.

### 36. Why does setting no-cors not solve the problem when the page needs to display the JSON body?

**Answer:** The response becomes opaque, so the page cannot read the body or response headers.

**Explanation:** This mode is not a bypass for readable API data. Configure the server correctly or use a controlled server-side request.

### 37. Should a failed POST that creates a record always be retried automatically?

**Answer:** No. A retry can create a duplicate unless the API supports a safe idempotency mechanism.

**Explanation:** A network failure may occur after the server processes the first request but before the browser receives its response.

### 38. A rate-limited API responds with HTTP 429. What should the client consider?

**Answer:** Explain that requests are temporarily limited and respect a server-provided retry delay when one is available.

**Explanation:** Immediate repeated requests can increase load and prolong the failure. Retry behavior should be bounded.

### 39. A product API sends a private access token in a JavaScript file. What is the correct design change?

**Answer:** Move the secret to a server-side component and let that server make the protected API request.

**Explanation:** Anything shipped to the browser can be inspected. A client-side token cannot be kept private.

### 40. What should be reviewed before calling the API-driven interface complete?

**Answer:** Loading, success, empty, invalid-data, HTTP-error, network-error, retry, cancellation, stale-response, safe-rendering, and credential paths.

**Explanation:** Testing only a successful response misses most of the behavior that makes a real network interface reliable.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [141 - Browser project: build an interactive interface](../lessons/141-browser-project-build-an-interactive-interface.md) | [Lesson](../lessons/142-browser-project-build-an-api-driven-application.md) · [Example](../examples/142-browser-project-build-an-api-driven-application.md) | [143 - Node.js project: build a command-line utility](143-node-js-project-build-a-command-line-utility.md) |
