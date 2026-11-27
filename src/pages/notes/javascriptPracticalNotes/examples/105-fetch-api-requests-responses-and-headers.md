# 105 - Fetch API: requests, responses, and headers: Example

## Goal

Use the Fetch API in a standalone page to inspect a **Request**, a **Response**, request headers, response headers, status, and parsed JSON. The page creates its sample JSON in memory, so it works without an API server or external URL.

## Complete example

Save this as an HTML file and open it in a browser. Select **Load catalog** to run the Fetch example. The complete source is displayed here in Markdown.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fetch request and response lab</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
    }

    main {
      width: min(100%, 48rem);
      margin-inline: auto;
    }

    button {
      min-height: 2.6rem;
      padding: 0.55rem 0.9rem;
      font: inherit;
      cursor: pointer;
    }

    button:disabled {
      cursor: wait;
    }

    section {
      margin-block: 1.5rem;
      padding: 1rem;
      border: 1px solid currentColor;
      border-radius: 0.6rem;
    }

    pre {
      margin: 0;
      padding: 0.8rem;
      overflow: auto;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      border: 1px solid currentColor;
      border-radius: 0.4rem;
    }

    ul {
      display: grid;
      gap: 0.65rem;
      padding-left: 1.25rem;
    }

    #status {
      min-height: 1.5em;
    }

    .note {
      padding: 0.75rem;
      border-left: 0.25rem solid currentColor;
    }
  </style>
</head>
<body>
  <main>
    <h1>Fetch request and response lab</h1>
    <p>Load an in-memory JSON catalog and inspect what Fetch returns.</p>
    <p class="note">This demonstration uses a local Blob URL. It does not contact a server or send data over the network.</p>

    <button id="load-catalog" type="button">Load catalog</button>
    <p id="status" role="status" aria-live="polite">The catalog has not been loaded.</p>

    <section aria-labelledby="request-heading">
      <h2 id="request-heading">Request details</h2>
      <pre id="request-details">Select Load catalog to create a Request.</pre>
    </section>

    <section aria-labelledby="response-heading">
      <h2 id="response-heading">Response details</h2>
      <pre id="response-details">No Response has been received yet.</pre>
    </section>

    <section aria-labelledby="catalog-heading">
      <h2 id="catalog-heading">Catalog items</h2>
      <ul id="catalog-items"></ul>
    </section>
  </main>

  <script>
    const loadButton = document.querySelector("#load-catalog");
    const status = document.querySelector("#status");
    const requestDetails = document.querySelector("#request-details");
    const responseDetails = document.querySelector("#response-details");
    const catalogList = document.querySelector("#catalog-items");

    const catalogData = [
      { id: 1, name: "Notebook", price: 4.5 },
      { id: 2, name: "Pencil set", price: 2.25 },
      { id: 3, name: "Desk lamp", price: 18.99 }
    ];

    async function loadCatalog() {
      loadButton.disabled = true;
      status.textContent = "Loading the local catalog...";
      requestDetails.textContent = "Creating request...";
      responseDetails.textContent = "Waiting for a response...";
      catalogList.replaceChildren();

      const jsonBlob = new Blob(
        [JSON.stringify(catalogData)],
        { type: "application/json" }
      );
      const objectUrl = URL.createObjectURL(jsonBlob);

      try {
        const request = new Request(objectUrl, {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        });

        requestDetails.textContent = [
          "Method: " + request.method,
          "Accept: " + request.headers.get("accept"),
          "Resource: in-memory Blob URL"
        ].join("\n");

        const response = await fetch(request);
        const contentType = response.headers.get("content-type") || "not provided";

        responseDetails.textContent = [
          "Status: " + response.status,
          "OK: " + response.ok,
          "Content-Type: " + contentType,
          "Body used before reading: " + response.bodyUsed
        ].join("\n");

        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }

        if (!contentType.toLowerCase().includes("application/json")) {
          throw new Error("Expected a JSON response.");
        }

        const items = await response.json();
        if (!Array.isArray(items)) {
          throw new Error("Expected the JSON value to be an array.");
        }

        for (const item of items) {
          const listItem = document.createElement("li");
          const name = document.createElement("strong");
          const price = document.createElement("span");

          name.textContent = item.name;
          price.textContent = " - $" + Number(item.price).toFixed(2);
          listItem.append(name, price);
          catalogList.append(listItem);
        }

        responseDetails.textContent += "\nBody used after reading: " + response.bodyUsed;
        status.textContent = "Loaded " + items.length + " catalog items from the local Blob URL.";
      } catch (error) {
        status.textContent = "Could not load the catalog: " + error.message;
      } finally {
        URL.revokeObjectURL(objectUrl);
        loadButton.disabled = false;
      }
    }

    loadButton.addEventListener("click", loadCatalog);
  </script>
</body>
</html>
~~~

## Expected output

After selecting **Load catalog**:

- The Request panel shows **GET**, **Accept: application/json**, and that its resource is a local Blob URL.
- The Response panel shows a successful status, **OK: true**, a JSON content type, and **bodyUsed** before and after parsing.
- The catalog list shows three items with their prices.
- The status says the catalog was loaded from a local Blob URL. It does not claim that a server was contacted or that any data was saved.

## How it works

1. The page stores three sample objects in **catalogData** and converts them to JSON text with **JSON.stringify()**.
2. **Blob** holds those bytes with the **application/json** media type. **URL.createObjectURL()** gives the browser a temporary URL for the Blob.
3. The **Request** object records the URL, method, and **Accept** header. The example displays the header with **request.headers.get()**.
4. **fetch(request)** returns a **Response**. The code inspects **status**, **ok**, and the **content-type** response header before reading the body.
5. **response.json()** reads and parses the body. The **bodyUsed** value changes after this read because the body has been consumed.
6. The returned values are rendered with **textContent** and DOM element methods.
7. The **finally** block revokes the temporary object URL and re-enables the button, including when an error occurs.

This uses Fetch to read a browser-managed Blob URL. No HTTP request is made, so the **Accept** header is available on the Request object but is not sent to an API server. To connect a real API, replace the object URL request with a URL served by your application and make sure that endpoint permits the page's origin.

For example, the real API call would have this general shape:

~~~js
const response = await fetch("/api/catalog", {
  headers: { Accept: "application/json" }
});
~~~

A real API may return HTTP errors such as 404. Check **response.ok** because those responses do not automatically reject the Fetch promise. Cross-origin APIs also need to permit the page through CORS before browser JavaScript can read their responses.

## Try it yourself

1. Change the sample array and load it again. The Fetch request is rebuilt each time with a fresh Blob URL.
2. Change the Blob's **type** and observe the Response **content-type** header.
3. Remove **Accept** from the Request and inspect the Request panel.
4. Replace **response.json()** with **response.text()** and display the raw JSON string.
5. Read **response.json()**, then try to read **response.text()** from the same response. Observe that its body is already used.
6. Clone the Response before reading it and compare the two copies.
7. Replace the Blob URL with an API URL served by your own application and inspect its actual status and headers.

## Key points

- A **Request** describes a resource and its request options.
- A **Response** contains status, headers, and a body that must be read separately.
- **fetch()** does not treat HTTP error statuses as promise rejection by itself.
- **Accept** is a request header; **Content-Type** here describes the Blob response body.
- A response body is consumed when a method such as **json()** reads it.
- This offline example uses Fetch, but a Blob URL is not an HTTP API request.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [104 - Forms, input validation, and submission](104-forms-input-validation-and-submission.md) | [Open lesson](../lessons/105-fetch-api-requests-responses-and-headers.md) | [Open Q&A](../qnas/105-fetch-api-requests-responses-and-headers.md) | [106 - HTTP methods, status codes, and JSON APIs](../lessons/106-http-methods-status-codes-and-json-apis.md) |