# 90 - The asynchronous programming model

## Question

A catalog program needs product data and discount data from two separate local files. Both files are required, and neither read depends on the other. How can the program read them without waiting for each read to finish before starting the next, calculate final prices, and report file or JSON errors?

## Project files

~~~text
async-catalog-example/
  async-catalog.mjs
  products.json
  discounts.json
~~~

## Product data

~~~json
[
  {
    "id": "book",
    "name": "JavaScript Handbook",
    "price": 24
  },
  {
    "id": "mug",
    "name": "Coffee Mug",
    "price": 12.5
  }
]
~~~

Save this as **products.json**.

## Discount data

~~~json
{
  "book": 25,
  "mug": 0
}
~~~

Save this as **discounts.json**. The values are percentages. A product without an entry receives no discount.

## Program

~~~js
// async-catalog.mjs
import { readFile } from "node:fs/promises";

async function readJson(fileUrl) {
  const contents = await readFile(fileUrl, "utf8");
  return JSON.parse(contents);
}

async function loadCatalog() {
  const [products, discounts] = await Promise.all([
    readJson(new URL("./products.json", import.meta.url)),
    readJson(new URL("./discounts.json", import.meta.url))
  ]);

  return products.map((product) => {
    const percentage = discounts[product.id] ?? 0;
    const finalPrice = product.price * (1 - percentage / 100);

    return {
      ...product,
      finalPrice
    };
  });
}

async function main() {
  try {
    const catalog = await loadCatalog();

    for (const product of catalog) {
      console.log(
        product.name + ": $" + product.finalPrice.toFixed(2)
      );
    }
  } catch (error) {
    console.error("Could not load the catalog:", error.message);
    process.exitCode = 1;
  }
}

await main();
~~~

Run it from the example directory:

~~~bash
node async-catalog.mjs
~~~

## Expected output

~~~text
JavaScript Handbook: $18.00
Coffee Mug: $12.50
~~~

## Explanation

- **readJson** returns a Promise because it is an async function.
- **readFile** is awaited before its text is parsed as JSON.
- **loadCatalog** starts both independent file reads before awaiting their combined result.
- **Promise.all** returns the two results in the same order as the input list.
- If either file read or JSON parse fails, the combined operation rejects and **main** catches the error.
- Setting **process.exitCode** to 1 lets a shell or CI job detect that the program failed.
- The final calculation runs only after both input files have loaded.
- Top-level await is used in this JavaScript module to wait for **main** to finish.

## When work is dependent

Some operations cannot start until an earlier result is known. For example, if an API first returns a list of product IDs and another API loads products by those IDs, the calls are sequential:

~~~js
const productIds = await loadFeaturedProductIds();
const products = await loadProducts(productIds);
~~~

Here, the second operation needs the result of the first. Use Promise.all for independent operations and sequential await when one result determines the next input.

## When partial results are useful

Promise.all rejects if either file fails. If a program should still use whichever independent result succeeded, Promise.allSettled can collect every outcome:

~~~js
const outcomes = await Promise.allSettled([
  readJson(new URL("./products.json", import.meta.url)),
  readJson(new URL("./discounts.json", import.meta.url))
]);

for (const outcome of outcomes) {
  if (outcome.status === "fulfilled") {
    console.log("Loaded a file");
  } else {
    console.error("A file could not be loaded:", outcome.reason.message);
  }
}
~~~

Use this only when partial results make sense for the application. If both files are required to calculate the catalog, Promise.all and one error boundary express that requirement more clearly.

## Try another case

Rename or remove **discounts.json** and run the program again. Observe how the file read rejects, how the error reaches **main**, and how the process exit status is set. Restore the file and change the discount for the book to 50. The output should show a final book price of 12.00.

## Key points

- Return or await a Promise so callers can observe its result and failure.
- Run independent asynchronous operations together when their results are all required.
- Keep dependent operations sequential.
- Catch errors at a boundary that can report or recover from them.
- Use Promise.allSettled only when the application can use partial outcomes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [89 - Formatting, linting, JSDoc, and editor tooling](../lessons/089-formatting-linting-jsdoc-and-editor-tooling.md) | [Open lesson](../lessons/090-the-asynchronous-programming-model.md) | [Open Q&A](../qnas/090-the-asynchronous-programming-model.md) | [91 - The event loop, task queues, and microtasks](../lessons/091-the-event-loop-task-queues-and-microtasks.md) |
