# 95 - Async and await

This example demonstrates how `async` functions return Promises, how `await` pauses one function, when to handle errors, and how to choose sequential or concurrent work.

The code uses only built-in JavaScript features and runs with Node.js. It prints the expected output in the terminal. It does not create a browser page.

## Goal

By the end of this example, you can:

- Observe the synchronous part of an async function and its continuation after `await`.
- Return values and errors from async functions.
- Handle a rejected await with `try`/`catch` and clean up with `finally`.
- Run independent operations together with `Promise.all()`.
- Choose sequential loops or concurrent mapping based on task dependencies.

## Complete example

Copy the code below into a file named `async-and-await.js`, then run it with Node.js using `node async-and-await.js`.

```js
const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

async function readValue(label, milliseconds, { fail = false } = {}) {
    await delay(milliseconds);

    if (fail) {
        throw new Error(`${label} unavailable`);
    }

    return label;
}

async function returnAnswer() {
    return 42;
}

async function loadDashboard({ failAlerts = false } = {}) {
    let isLoading = true;
    console.log(`loading: ${isLoading}`);

    try {
        const profilePromise = readValue("profile", 15);
        const alertsPromise = readValue("alerts", 10, { fail: failAlerts });

        const [profile, alerts] = await Promise.all([
            profilePromise,
            alertsPromise,
        ]);

        console.log(`dashboard loaded: ${profile}, ${alerts}`);
        return { profile, alerts };
    } catch (error) {
        console.log(`dashboard error: ${error.message}`);
        throw error;
    } finally {
        isLoading = false;
        console.log(`loading: ${isLoading}`);
    }
}

async function loadConfigurationWithFallback() {
    try {
        return await readValue("configuration", 5, { fail: true });
    } catch (error) {
        return `fallback: ${error.message}`;
    }
}

async function main() {
    console.log(`async return: ${await returnAnswer()}`);

    const order = [];

    async function demonstrateAwait() {
        order.push("before await");
        const value = await Promise.resolve("resumed");
        order.push(value);
    }

    const continuation = demonstrateAwait();
    order.push("after call");
    await continuation;
    console.log(`await order: ${order.join(" -> ")}`);

    // Both requests start before the combined Promise is awaited.
    const profilePromise = readValue("profile", 15);
    const settingsPromise = readValue("settings", 5);
    const [profile, settings] = await Promise.all([
        profilePromise,
        settingsPromise,
    ]);
    console.log(`independent results: ${profile}, ${settings}`);

    // The author request needs the article result, so these steps are sequential.
    const article = await readValue("article", 5);
    const author = await readValue(`author for ${article}`, 5);
    console.log(`sequential result: ${article}, ${author}`);

    await loadDashboard();

    try {
        await loadDashboard({ failAlerts: true });
    } catch {
        console.log("caller handled rejection");
    }

    console.log(`local catch recovery: ${await loadConfigurationWithFallback()}`);

    const ids = ["A", "B", "C"];
    const sequentialIds = [];

    for (const id of ids) {
        sequentialIds.push(await readValue(id, 5));
    }

    console.log(`sequential loop: ${sequentialIds.join(", ")}`);

    const concurrentIds = await Promise.all(
        ids.map((id, index) => readValue(id, (ids.length - index) * 5)),
    );

    console.log(`concurrent map: ${concurrentIds.join(", ")}`);
}

main().catch((error) => {
    console.error("Unexpected failure:", error);
    process.exitCode = 1;
});
```

## Expected terminal output

```text
async return: 42
await order: before await -> after call -> resumed
independent results: profile, settings
sequential result: article, author for article
loading: true
dashboard loaded: profile, alerts
loading: false
loading: true
dashboard error: alerts unavailable
loading: false
caller handled rejection
local catch recovery: fallback: configuration unavailable
sequential loop: A, B, C
concurrent map: A, B, C
```

## How it works

### An async function returns a Promise

`returnAnswer()` returns the number `42`, but its caller receives a Promise. `main()` awaits that Promise to display the number. If an async function throws, its returned Promise rejects instead.

### The continuation after `await` runs later

`demonstrateAwait()` records `before await` and pauses at an already fulfilled Promise. The call returns control to `main()`, which records `after call`. The async function then resumes and records `resumed`.

This pause is local to the async function. It does not stop `main()` or block the runtime while `main()` waits for the continuation.

### Independent requests can overlap

The dashboard starts both `readValue()` calls before awaiting `Promise.all()`. In the successful call, it uses both results together. When alerts reject in the second call, `catch` logs the error and rethrows it. `finally` resets the loading state for both success and failure. The caller's `try`/`catch` handles the rethrown error.

The profile operation may still finish after the alert request causes `Promise.all()` to reject. Rejection does not cancel work that has already started.

### Local recovery can turn failure into a value

`loadConfigurationWithFallback()` uses `return await` inside its `try`. That makes the rejected result throw inside the block, where its `catch` can return a fallback string. Because the error is handled, the async function fulfills with that string.

If the caller instead needs to know that configuration could not be loaded, rethrow the error or let the rejection propagate rather than returning a success-shaped fallback.

### Sequential work and concurrent mapping are different policies

The `for...of` loop waits for each ID before starting the next. The `map()` version creates all three Promises first and passes them to `Promise.all()`. Both result arrays follow input order even though the concurrent tasks finish at different times.

The concurrent example is small. For a large collection, mapping every item at once may start too much work. Use batches or a worker pool to limit concurrency.

## Try another case

1. Change `returnAnswer()` to return a string. It still produces a Promise, and `main()` can still await the result.
2. Remove the `await` from `demonstrateAwait()`. Compare how the messages are ordered.
3. Make both dashboard operations succeed, then make each one reject in turn. Confirm `finally` runs for every outcome.
4. Remove `throw error` from `loadDashboard()`'s catch. Observe that the caller no longer receives the rejection.
5. Replace `return await readValue(...)` in the fallback function with `return readValue(...)`. Check whether the local catch still handles that later rejection.
6. Replace the sequential loop with `ids.map(...)` and `Promise.all()`. Compare the execution policy.
7. Replace the concurrent map with `forEach(async ...)`. Add a log immediately after it and observe that the log does not wait for the callbacks.
8. Increase the list size and divide it into batches if starting every operation together is too much.

## Key points

- An async function returns a Promise, even when it returns an ordinary value.
- `await` pauses the current async function and resumes it after the awaited value settles.
- Rejections at an await point can be handled with ordinary `try`/`catch`.
- `finally` is useful for cleanup, and a rethrow allows the caller to handle the failure.
- Await dependent operations sequentially. Start independent operations before awaiting them together.
- `for...of` supports sequential async loops. `map()` plus a combinator supports independent work.
- `forEach()` does not wait for Promises returned by an async callback.
- `return await` is useful when a local catch or finally must observe settlement.
- Concurrent work is not automatically bounded or canceled.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [94 - Promise combinators and concurrent work](../lessons/094-promise-combinators-and-concurrent-work.md) | [Open lesson](../lessons/095-async-and-await.md) | [Open Q&A](../qnas/095-async-and-await.md) | [96 - Asynchronous errors, concurrency, and coordination](../lessons/096-asynchronous-errors-concurrency-and-coordination.md) |