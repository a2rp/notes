# 142 - Browser project: build an API-driven application

This chapter extends the interactive browser project with data from an HTTP API. The application loads a collection of products, displays loading and error states, and lets visitors filter the loaded results.

A request is more than a call to fetch. The page must handle HTTP failures, invalid JSON, unexpected data, slow or superseded requests, and an empty result. The interface should explain what is happening without exposing secrets or relying on the network being perfect.

## Learning goals

- Describe an API contract in terms of endpoints, methods, parameters, and data shapes.
- Make HTTP requests with Fetch and async functions.
- Distinguish a network failure from an HTTP error response.
- Parse and validate JSON before using it.
- Model loading, success, empty, and error states.
- Cancel or ignore outdated requests.
- Build query strings safely.
- Render remote text safely with DOM methods.
- Understand same-origin policy and CORS at a practical level.
- Handle retries, rate limits, credentials, and sensitive data carefully.
- Keep network logic separate from interface rendering.

## Define the application behavior

The project is a small product explorer. A visitor opens the page, sees the products returned by the API, and can filter the loaded products by text.

Write down the expected behavior before implementing it:

1. The page shows a loading message while the first request is pending.
2. A successful response is parsed and checked before it is rendered.
3. A valid empty collection gets an empty-state message.
4. A failed request gets a readable error and a retry action.
5. Filtering updates the visible list without another network request.
6. A new request can replace an older one without allowing stale data to overwrite the latest result.
7. Remote text is displayed as text, not interpreted as markup.
8. The page remains understandable when the API is unavailable.

The API contract is part of the project. For this chapter, assume a same-origin endpoint at **/api/products** that supports GET and returns JSON shaped like this:

~~~json
{
  "items": [
    {
      "id": 101,
      "title": "Desk lamp",
      "description": "An adjustable reading lamp.",
      "category": "Home",
      "price": 34.5
    }
  ]
}
~~~

The response may contain an empty items array. Each item must have a unique identifier, string title and description, a string category, and a finite numeric price. A real application should document its own response shape and error behavior rather than guessing from one successful response.

## Understand the request lifecycle

A browser request has several stages:

1. Build a URL and request options.
2. Start the request.
3. Wait for the response headers and body.
4. Check the HTTP status.
5. Parse the response body.
6. Validate the returned data.
7. Update application state.
8. Render the new state.
9. Handle cancellation, failure, or a stale response.

Each stage can fail in a different way. A network rejection may mean the browser could not complete or expose the request. An HTTP response such as not found or server error is still a response. A JSON body can be malformed, and valid JSON can have the wrong shape for the page.

Keep these distinctions visible in the code. A single catch block around a fetch call should not hide all useful information about which stage failed.

## Fetch and check the HTTP response

Fetch returns a promise for a response. It does not reject just because the server returned an HTTP error status. Check the response status before treating the body as a successful result.

~~~js
async function fetchProducts() {
  const response = await fetch("/api/products", {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("The server returned HTTP " + response.status + ".");
  }

  return response.json();
}
~~~

The response body is a stream and is normally consumed once. Calling the JSON parsing method returns another promise and can fail if the body is not valid JSON. Await it so a parsing failure reaches the same error handling path as other asynchronous failures.

Do not assume that a successful HTTP status guarantees the expected data. The endpoint might return an empty body, an HTML error page, or a JSON object with a different shape.

## Build query strings with URLSearchParams

When an endpoint supports search, pagination, sorting, or category filters, encode parameters instead of concatenating raw input into a URL.

~~~js
const params = new URLSearchParams({
  q: searchTerm,
  page: String(pageNumber),
  limit: "20"
});

const url = "/api/products?" + params;
~~~

This handles reserved characters and spaces in user input. Follow the endpoint's documented parameter names and allowed values. Client-side filtering and API filtering are different designs: client-side filtering operates on data already loaded, while API filtering can request only a subset.

Do not put passwords, private tokens, or other secrets into a URL. URLs can be recorded in browser history, logs, and intermediary systems.

## Validate the response shape

JSON parsing proves only that the body is valid JSON. It does not prove that required fields exist or have the right types.

~~~js
function readProducts(payload) {
  if (!payload || !Array.isArray(payload.items)) {
    throw new Error("The product response has an unexpected shape.");
  }

  return payload.items.map((item) => {
    if (
      !item ||
      (typeof item.id !== "string" && typeof item.id !== "number") ||
      typeof item.title !== "string" ||
      typeof item.description !== "string" ||
      typeof item.category !== "string" ||
      typeof item.price !== "number" ||
      !Number.isFinite(item.price)
    ) {
      throw new Error("A product in the response is invalid.");
    }

    return {
      id: String(item.id),
      title: item.title,
      description: item.description,
      category: item.category,
      price: item.price
    };
  });
}
~~~

Normalize values at the boundary where data enters the application. Here identifiers become strings and every product gets the fields the interface expects. This makes rendering simpler and prevents an unexpected missing property from becoming a confusing page failure.

Validation should match the contract. Avoid silently replacing required fields with misleading defaults. If partial records are allowed, define exactly which fields may be missing and how the interface presents them.

## Model the interface as explicit states

Network interfaces need more states than just "has data" and "has no data."

| State | What the page should communicate |
| --- | --- |
| Loading | A request is in progress |
| Success with results | Products are available |
| Success with no results | The request worked but returned no matching products |
| Error | The request or response could not be used |
| Filtered empty | Products exist, but none match the current text |

One approach is to store a status value, the loaded products, the current search, and a user-readable message:

~~~js
const state = {
  status: "loading",
  products: [],
  query: "",
  message: ""
};
~~~

Do not use a single boolean such as **isLoading** to represent every state. A boolean cannot distinguish a first load, a successful empty result, and an error.

A useful transition might be:

~~~text
idle -> loading -> success
                 -> empty
                 -> error
loading -> loading when a newer request replaces the current one
~~~

The rendering function reads state and updates the page. Request code changes state; rendering code describes state. This separation makes each path easier to reason about.

## Show loading, success, and error clearly

A loading message should appear when a request begins, not only after it finishes. A retry control should be available when an error can reasonably be retried.

Error copy should help the visitor recover without exposing internal stack traces, request headers, credentials, or server implementation details. The developer console can retain useful diagnostic details during development, while the page shows a concise message.

Do not display an error state and a success list at the same time unless the product intentionally supports stale data with a refresh warning. If stale results are retained during a refresh, explain that they are older and identify the refresh state clearly.

A status region can announce a loading message and a concise result. Keep frequent announcements short. Do not move focus just because background work starts or completes.

## Handle cancellation and race conditions

If a visitor starts a second request before the first completes, responses can arrive out of order. Without a guard, an older response may replace newer results.

Use an AbortController to stop a request that is no longer needed. Also identify each request so a late result cannot update the page after a newer request has started.

~~~js
let activeController;
let latestRequestId = 0;

async function loadProducts() {
  if (activeController) {
    activeController.abort();
  }

  const controller = new AbortController();
  activeController = controller;
  const requestId = ++latestRequestId;

  try {
    const response = await fetch("/api/products", {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const payload = await response.json();

    if (requestId !== latestRequestId) {
      return;
    }

    state.products = readProducts(payload);
    state.status = "success";
    render();
  } catch (error) {
    if (requestId !== latestRequestId) {
      return;
    }

    if (error.name === "AbortError") {
      return;
    }

    state.status = "error";
    render();
  }
}
~~~

The signal connects the controller to the request. Calling abort cancels the request when possible. Cancellation is a normal control path when a request is superseded or a view is no longer needed. It should not be presented as an unexpected server error.

Cancellation cannot undo work that the server has already performed. It stops the client from waiting for or using the result. For actions that change server data, design idempotency and duplicate submission behavior on the server as well.

## Avoid stale results

Cancellation is useful, but the request identifier is an additional guard. Some work may already have completed or may not observe cancellation in the way the page expects. Before changing state, compare the response's request identifier with the latest one.

For search-as-you-type, consider a short debounce so the application does not send a request for every keystroke. Still abort or ignore outdated requests. Debouncing reduces request volume; it does not replace race handling.

When the page is removed or a component is disposed, abort requests that no longer have a consumer. Avoid retaining references to detached elements in long-lived callbacks.

## Handle retries and rate limits responsibly

A retry button gives the visitor control over another attempt. Automatic retries need limits and should distinguish temporary failures from permanent ones.

- A timeout or temporary server failure may be retryable.
- A missing resource usually needs a corrected path or identifier.
- A malformed response needs a server or contract fix.
- A rate limit response may include a suggested wait time.
- Repeatedly retrying an unsuccessful request can increase server load.

Do not automatically retry every request forever. For a read-only request, a small capped retry policy with increasing delays may be suitable. For a request that creates or changes data, retrying blindly can duplicate an action unless the API supports idempotency.

## Understand same-origin policy and CORS

A page can generally read responses from its own origin. An origin is the combination of scheme, host, and port. A different origin is subject to browser cross-origin rules.

For an API on another origin, the API server must allow the page's origin through its CORS response headers. JavaScript cannot grant itself cross-origin permission. If you control the server, configure the smallest set of origins, methods, and headers that the application needs.

The **no-cors** fetch mode is not a way to bypass CORS for a readable API response. It produces an opaque response whose body and headers are unavailable to ordinary page JavaScript. If a request needs readable data, the server must permit it, or a server-side component under your control must make the request.

Opening an HTML file directly can also produce a different origin context from serving the application. Use the development server or hosting setup that matches the actual application.

## Protect credentials and user data

Code that runs in the browser is visible to the visitor. Do not embed private API keys or server secrets in client-side JavaScript. A public API key may still need domain restrictions, quotas, and monitoring. A secret should stay on a server you control.

Use HTTPS for sensitive data in transit. Do not log passwords, access tokens, session cookies, or private response bodies. If cookie credentials are used, understand the server's authentication and cross-site request protections. CORS is not authentication and does not replace server authorization.

Only request data the interface needs. Treat API data as untrusted even when it comes from your own service: validate it, render text safely, and do not trust client-side checks to protect server resources.

## Cache and loading decisions

Caching can reduce repeated work and make a page feel faster, but it changes freshness behavior. Choose caching based on the data and the API's cache headers, not just on a desire to avoid a loading indicator.

A page may choose among:

- Showing a loading state until fresh data arrives.
- Keeping old data visible while revalidating and labeling it as old.
- Using a short-lived application cache.
- Letting the browser and server's HTTP cache rules manage freshness.

Do not show stale data as though it were current. If the user can edit the same resource on multiple devices, the server remains authoritative and the interface should handle conflicts.

## Keep network, state, and rendering code separate

A small project can have distinct functions:

- **requestProducts** makes the HTTP request and handles response parsing.
- **readProducts** validates and normalizes the data.
- **state** stores the current products, query, and request status.
- **getVisibleProducts** derives the filtered collection.
- **render** updates the DOM from state.
- **event handlers** start requests or change the local query.

Avoid repeating fetch and response checks inside every event handler. A shared API function gives the project one place to handle headers, status codes, parsing, and cancellation.

For a larger project, place the responsibilities into modules. Keep an API module separate from DOM code so it can be reused by another page or tested independently.

## Review the finished project

Check each meaningful path:

- First load shows a loading state.
- Valid data is validated and rendered.
- An empty response is distinct from a request failure.
- Invalid JSON and an unexpected data shape are handled.
- A non-success HTTP status becomes an error state.
- A network or CORS failure gives a recoverable message.
- Retry starts a new request.
- A stale response cannot replace newer results.
- Search text is encoded if it is sent to the API.
- Remote strings are rendered as text.
- Credentials and private tokens are not shipped in browser code.
- Keyboard and assistive technology users receive meaningful status changes.

The next chapter moves to a Node.js command-line project. The same ideas about contracts, validation, errors, and clear state transitions apply outside the browser too.

## Common mistakes

- Treating any resolved fetch promise as a successful HTTP result.
- Forgetting to check the response status before parsing success data.
- Assuming valid JSON has the expected structure.
- Showing a blank page while a request is pending.
- Treating an empty result as an error.
- Showing raw technical exception text to visitors.
- Letting an old response overwrite a newer one.
- Reporting an intentional abort as a server failure.
- Retrying indefinitely or retrying mutations without duplicate protection.
- Using no-cors to try to read a cross-origin API.
- Putting a private API key in client-side code.
- Rendering remote text through an HTML parsing sink.
- Mixing request logic into every rendering or event function.
- Hiding old data as though it were current.

## Key points

- Define the endpoint and response contract before writing the interface.
- Fetch can resolve for HTTP error statuses, so check the response.
- Parse and validate JSON before application code depends on it.
- Model loading, success, empty, and error states explicitly.
- Abort or ignore requests that have become outdated.
- CORS permission comes from the server, not from client JavaScript.
- Keep secrets on the server and validate data at the boundary.
- Separate request, state, rendering, and interaction responsibilities.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [141 - Browser project: build an interactive interface](141-browser-project-build-an-interactive-interface.md) | [Open Q&A](../qnas/142-browser-project-build-an-api-driven-application.md) | [Open example](../examples/142-browser-project-build-an-api-driven-application.md) | [143 - Node.js project: build a command-line utility](143-node-js-project-build-a-command-line-utility.md) |
