# Example 142 - Browser project: build an API-driven application

## Question

How can a browser page load products from an API, show loading and error states, validate the response, and let visitors search the products without unsafe DOM updates?

## API contract

This page expects a same-origin **GET /api/products** endpoint. The endpoint should return JSON with an items array:

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

The items array can be empty. Each item needs a unique string or numeric id, string title, string description, string category, and finite numeric price. Configure **API_PATH** in the example for the route provided by your own application. The browser page and API must be served from the same origin, or the API server must allow the page's origin through its CORS configuration.

## Complete example

Save this as an HTML file and serve it with the API route available at the same origin. Opening it directly from a file browser will not provide the required API route.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Product explorer</title>
  <style>
    :root {
      color-scheme: light;
      font: 1rem/1.5 system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      max-width: 52rem;
      margin: 2rem auto;
      padding: 0 1rem;
      color: #17212b;
      background: #f4f7fb;
    }

    main {
      padding: 1.5rem;
      border: 1px solid #cbd4df;
      border-radius: 0.75rem;
      background: white;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    .search {
      display: grid;
      gap: 0.4rem;
      margin-block: 1.5rem;
    }

    input,
    button {
      min-height: 2.75rem;
      padding: 0.55rem 0.75rem;
      font: inherit;
    }

    input {
      width: 100%;
      border: 1px solid #667487;
      border-radius: 0.35rem;
    }

    button {
      border: 1px solid #52657b;
      border-radius: 0.35rem;
      background: #fff;
      color: #17212b;
      cursor: pointer;
    }

    button:hover {
      background: #edf3fa;
    }

    :focus-visible {
      outline: 3px solid #075dcc;
      outline-offset: 2px;
    }

    #retry-button {
      margin-block: 0.5rem 1rem;
    }

    #product-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      gap: 1rem;
      padding: 0;
      list-style: none;
    }

    .product-card {
      height: 100%;
      padding: 1rem;
      border: 1px solid #cbd4df;
      border-radius: 0.5rem;
    }

    .product-card h3 {
      margin-top: 0;
      overflow-wrap: anywhere;
    }

    .product-category {
      display: inline-block;
      padding: 0.15rem 0.5rem;
      border-radius: 1rem;
      background: #e8f0fc;
      color: #173c70;
      font-size: 0.9rem;
    }

    .product-price {
      font-weight: 700;
    }

    #result-status {
      min-height: 1.5em;
    }

    #retry-button[hidden] {
      display: none;
    }
  </style>
</head>
<body>
  <main>
    <h1>Product explorer</h1>
    <p>Products are loaded from the application API. Search filters the products currently loaded.</p>

    <div class="search">
      <label for="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        autocomplete="off"
        placeholder="Search by title, category, or description"
      >
    </div>

    <p id="result-status" role="status" aria-live="polite">
      Loading products...
    </p>
    <button id="retry-button" type="button" hidden>Try again</button>

    <h2 id="products-heading">Products</h2>
    <ul id="product-list" aria-labelledby="products-heading"></ul>
  </main>

  <script>
    const API_PATH = "/api/products";

    const searchInput = document.querySelector("#product-search");
    const resultStatus = document.querySelector("#result-status");
    const retryButton = document.querySelector("#retry-button");
    const productList = document.querySelector("#product-list");

    const state = {
      status: "loading",
      products: [],
      query: "",
      message: ""
    };

    let activeController = null;
    let latestRequestId = 0;

    function normalizeProducts(payload) {
      if (!payload || !Array.isArray(payload.items)) {
        throw new Error("The response does not contain an items array.");
      }

      const seenIds = new Set();

      return payload.items.map((item) => {
        const validId =
          item &&
          (typeof item.id === "string" || typeof item.id === "number");

        if (
          !validId ||
          typeof item.title !== "string" ||
          typeof item.description !== "string" ||
          typeof item.category !== "string" ||
          typeof item.price !== "number" ||
          !Number.isFinite(item.price)
        ) {
          throw new Error("A product does not match the expected shape.");
        }

        const id = String(item.id);

        if (seenIds.has(id)) {
          throw new Error("The response contains duplicate product IDs.");
        }

        seenIds.add(id);

        return {
          id,
          title: item.title,
          description: item.description,
          category: item.category,
          price: item.price
        };
      });
    }

    function getVisibleProducts() {
      const query = state.query.trim().toLocaleLowerCase();

      if (query === "") {
        return state.products;
      }

      return state.products.filter((product) => {
        const searchableText = [
          product.title,
          product.category,
          product.description
        ].join(" ").toLocaleLowerCase();

        return searchableText.includes(query);
      });
    }

    function createProductCard(product) {
      const item = document.createElement("li");
      const article = document.createElement("article");
      const title = document.createElement("h3");
      const category = document.createElement("p");
      const description = document.createElement("p");
      const price = document.createElement("p");

      item.dataset.productId = product.id;
      article.className = "product-card";

      title.textContent = product.title;
      category.className = "product-category";
      category.textContent = product.category;
      description.textContent = product.description;
      price.className = "product-price";
      price.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(product.price);

      article.append(title, category, description, price);
      item.append(article);
      return item;
    }

    function render() {
      const fragment = document.createDocumentFragment();

      if (state.status === "loading") {
        resultStatus.textContent = "Loading products...";
        retryButton.hidden = true;
        productList.replaceChildren();
        return;
      }

      if (state.status === "error") {
        resultStatus.textContent = state.message;
        retryButton.hidden = false;
        productList.replaceChildren();
        return;
      }

      retryButton.hidden = true;

      if (state.products.length === 0) {
        resultStatus.textContent = "The API returned no products.";
        productList.replaceChildren();
        return;
      }

      const visibleProducts = getVisibleProducts();

      for (const product of visibleProducts) {
        fragment.append(createProductCard(product));
      }

      productList.replaceChildren(fragment);

      if (visibleProducts.length === 0) {
        resultStatus.textContent =
          "No products match the current search. Try a different term.";
        return;
      }

      resultStatus.textContent =
        "Showing " + visibleProducts.length + " of " +
        state.products.length + " products.";
    }

    async function loadProducts() {
      if (activeController) {
        activeController.abort();
      }

      const controller = new AbortController();
      activeController = controller;
      const requestId = ++latestRequestId;

      state.status = "loading";
      state.message = "";
      render();

      try {
        const response = await fetch(API_PATH, {
          method: "GET",
          headers: {
            Accept: "application/json"
          },
          signal: controller.signal
        });

        if (!response.ok) {
          const error = new Error("HTTP response was not successful.");
          error.kind = "http";
          error.status = response.status;
          throw error;
        }

        const payload = await response.json();
        const products = normalizeProducts(payload);

        if (requestId !== latestRequestId) {
          return;
        }

        state.products = products;
        state.status = "success";
        activeController = null;
        render();
      } catch (error) {
        if (requestId !== latestRequestId) {
          return;
        }

        if (error.name === "AbortError") {
          return;
        }

        state.status = "error";

        if (error.kind === "http") {
          state.message =
            "The server returned HTTP " + error.status +
            ". Check the API and try again.";
        } else {
          state.message =
            "Couldn't load or read products. Check the connection and try again.";
        }

        activeController = null;
        render();
      }
    }

    searchInput.addEventListener("input", () => {
      state.query = searchInput.value;
      render();
    });

    retryButton.addEventListener("click", () => {
      loadProducts();
    });

    loadProducts();
  </script>
</body>
</html>
~~~

## Expected output

- While the request is pending, the page announces **Loading products...** and does not show stale cards.
- If the endpoint returns the documented items array, product cards appear with title, category, description, and formatted price.
- Typing in the search field filters the loaded cards by title, category, or description without making another request.
- If the API returns an empty array, the page says the API returned no products.
- If a search has no matches, the page explains that a different term can be tried.
- If the server returns a non-success HTTP status, invalid JSON, an invalid response shape, or a network failure, the page shows an error and a **Try again** button.
- If a new request replaces an older one, the older request is aborted and cannot overwrite the latest result.

## Explanation

- **The API contract is explicit.** The page expects a response with an items array and defined fields. Change the path or normalization logic to match the API used by your application.
- **The endpoint is same-origin.** The example uses a relative route, so it expects the API and page to be served from the same origin. A different origin must allow this page through server-side CORS configuration.
- **HTTP and parsing errors are handled.** The code checks response.ok before parsing. A failed status is reported separately from a network or body parsing failure.
- **Incoming JSON is validated and normalized.** Required fields, finite prices, and unique IDs are checked before the records enter application state.
- **Remote values are rendered as text.** Cards are built with DOM methods and text content. API strings are not parsed as HTML.
- **The interface has explicit request states.** Loading, success, empty, filtered-empty, and error each get a useful page message.
- **Filtering is local.** The search field operates on the products already loaded. A large collection may instead need API-side search and pagination.
- **Outdated work is stopped.** A newer request aborts the previous request. The request ID check prevents stale results from changing state.
- **Errors stay useful without exposing internals.** The visitor sees a next step, while the page avoids displaying exception stacks or credentials.
- **The example does not contain an API secret.** Browser code is visible to visitors. Private credentials belong on a server.

## Try it yourself

1. Configure the page's API path to a route that returns the documented JSON shape.
2. Load several products and search for words in their titles, categories, and descriptions.
3. Return an empty items array and compare the empty result message with the loading and error states.
4. Make the endpoint return a non-success status and use the retry button.
5. Return malformed JSON, then return a product with a missing field. Confirm both are handled as errors.
6. Start a request, then trigger another load before it finishes. Confirm the older result does not replace the newer one.
7. Add markup-like characters to a product title and confirm they appear as literal text.
8. Use browser developer tools to inspect the request and response without copying private credentials into client-side code.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [141 - Browser project: build an interactive interface](../lessons/141-browser-project-build-an-interactive-interface.md) | [Lesson](../lessons/142-browser-project-build-an-api-driven-application.md) · [Q&A](../qnas/142-browser-project-build-an-api-driven-application.md) · [Example](142-browser-project-build-an-api-driven-application.md) | [143 - Node.js project: build a command-line utility](../lessons/143-node-js-project-build-a-command-line-utility.md) |
