# 95 - Async and await

`async` functions and the `await` operator let you write Promise-based code in a style that reads from top to bottom. They do not replace Promises. An async function still returns a Promise, and `await` still follows a Promise or Promise-like value.

This chapter builds on Promises and their combinators. Use `async` and `await` to make a single asynchronous workflow easier to read. Use a Promise combinator when several operations need to be coordinated.

## Declaring an async function

Place `async` before a function declaration, expression, arrow function, or object method:

```js
async function loadProfile() {
    return { name: "Mina" };
}

const loadSettings = async () => {
    return { theme: "dark" };
};

const service = {
    async loadStatus() {
        return "ready";
    },
};
```

Calling any of these functions returns a Promise:

```js
const profilePromise = loadProfile();

profilePromise.then((profile) => {
    console.log(profile.name);
});
```

An async function runs its ordinary statements immediately until it reaches its first `await`, returns, or throws. When it reaches an `await`, its continuation pauses while the awaited value is handled. The caller receives the function's Promise and can continue doing other work.

## Return values become Promise outcomes

Returning a value from an async function fulfills its Promise with that value:

```js
async function getScore() {
    return 42;
}

getScore().then((score) => console.log(score)); // 42
```

Returning a Promise makes the async function's Promise follow that Promise's eventual outcome:

```js
async function loadScore() {
    return fetchScore();
}
```

The caller can await `loadScore()` and receive the fulfillment value from `fetchScore()`. If that Promise rejects, the async function's Promise rejects with the same reason.

Throwing inside an async function rejects its returned Promise:

```js
async function loadRequiredProfile() {
    throw new Error("Profile unavailable");
}

loadRequiredProfile().catch((error) => {
    console.error(error.message);
});
```

A synchronous exception during the async function's body is also reported as a Promise rejection to its caller. This gives callers one asynchronous result channel for returned values and errors.

An async function adopts a returned Promise's result, but it does not necessarily return that exact Promise object. Compare Promise outcomes with `await` or handlers, not by expecting identity between the original Promise and the async function's return value.

## Using `await`

Inside an async function, `await` waits for a value and evaluates to its fulfillment value:

```js
async function showProfile() {
    const profile = await loadProfile();
    console.log(profile.name);
}
```

If the value is a Promise, `await` waits for it to fulfill or reject. If it is an ordinary value, `await` produces that value after the async function suspends and resumes.

```js
const label = await "ready";
console.log(label); // ready
```

Awaiting an ordinary value is legal, but usually unnecessary. `await` is most useful when the expression represents work that may finish later.

### `await` pauses one async function, not the whole runtime

While an async function is suspended at `await`, its caller and other scheduled work can continue. When the awaited value settles, the async function resumes in a later Promise job.

```js
async function readValue() {
    console.log("before await");
    const value = await Promise.resolve("done");
    console.log(value);
}

readValue();
console.log("after call");
```

The output order is:

```text
before await
after call
done
```

The code before the first `await` runs synchronously as part of the function call. The continuation after the `await` runs later, even though the Promise was already fulfilled.

`await` does not move CPU-heavy JavaScript to another thread. Long synchronous calculations still block the thread that runs them. `await` is for waiting on asynchronous outcomes while allowing other work to proceed.

## Rejections become catchable throws

If an awaited Promise rejects, the `await` expression throws the rejection reason at that point in the async function. Use ordinary `try` and `catch` to handle it:

```js
async function loadDashboard() {
    try {
        const dashboard = await fetchDashboard();
        renderDashboard(dashboard);
    } catch (error) {
        showDashboardError(error);
    }
}
```

The `catch` handles a rejection from `fetchDashboard()` or an exception thrown by `renderDashboard()`. If the function should report failure to its caller instead of handling it locally, do not swallow the error:

```js
async function loadDashboard() {
    try {
        return await fetchDashboard();
    } catch (error) {
        logDashboardFailure(error);
        throw error;
    }
}
```

A `catch` can return a fallback value, which fulfills the async function if execution continues normally. Choose a fallback only when it is valid for the feature. Returning an empty object just to silence an error can make a failure look like a successful result.

## `finally` for cleanup

A `finally` block runs whether the `try` block succeeds or throws. It is useful for UI cleanup, releasing a lock, or restoring a state:

```js
async function refreshPanel() {
    setLoading(true);

    try {
        return await loadPanelData();
    } finally {
        setLoading(false);
    }
}
```

When the `try` block returns a value or rejects, `finally` runs before the async function's Promise settles. If the `finally` block throws or returns in a way that changes control flow, it can replace the original outcome, so cleanup code should be careful not to hide an earlier failure.

## Sequential work and independent work

When one operation needs the result of another, await the first before starting the second:

```js
async function loadArticlePage(articleId) {
    const article = await fetchArticle(articleId);
    const author = await fetchAuthor(article.authorId);
    return { article, author };
}
```

The author request depends on the article's `authorId`, so the dependency makes this sequence appropriate.

When operations are independent, start them before awaiting them together:

```js
async function loadDashboard() {
    const profilePromise = fetchProfile();
    const alertsPromise = fetchAlerts();

    const [profile, alerts] = await Promise.all([
        profilePromise,
        alertsPromise,
    ]);

    return { profile, alerts };
}
```

This allows the asynchronous work to overlap. Putting `await` before each call would make the requests run one after another and may increase total waiting time.

Use `Promise.allSettled()` instead if the application needs every result, including individual failures. Use `Promise.any()` if any successful source is enough. The previous lesson explains how to choose among combinators.

## Async functions in loops

### Sequential loop with `for...of`

Use `for...of` with `await` when each item depends on the previous one or when you deliberately need only one operation in progress at a time:

```js
async function saveInOrder(records) {
    const saved = [];

    for (const record of records) {
        saved.push(await saveRecord(record));
    }

    return saved;
}
```

### Concurrent mapping with `Promise.all()`

For independent items, map them to Promises and await the array:

```js
async function saveIndependentRecords(records) {
    const savePromises = records.map((record) => saveRecord(record));
    return await Promise.all(savePromises);
}
```

The explicit `return await` here is optional for this simple forwarding case. `return Promise.all(savePromises)` also makes the async function's Promise adopt that result. Use `return await` when a surrounding `try` or `finally` must observe settlement before leaving its block.

This starts every mapped operation. For a large input, use a batch size or worker pool to avoid starting too much work at once.

### Why `forEach(async ...)` does not wait

`forEach()` does not collect or await the Promises returned by its callback:

```js
records.forEach(async (record) => {
    await saveRecord(record);
});

console.log("This can run before the saves finish");
```

Use `for...of` for sequential work or `map()` with `Promise.all()` for concurrent work. The correct choice depends on whether the operations are independent and whether limiting concurrency matters.

## `return promise` and `return await promise`

In a simple async function, both forms produce a Promise that follows the returned Promise:

```js
async function loadData() {
    return fetchData();
}
```

`return await` is useful when code inside the same `try` block needs to catch that Promise's rejection:

```js
async function loadData() {
    try {
        return await fetchData();
    } catch (error) {
        logFailure(error);
        throw error;
    }
}
```

Without `await`, the `try` block returns before `fetchData()` settles. Its later rejection is not thrown inside that `try` block, so that local `catch` cannot handle it.

`return await` also ensures an enclosing `finally` waits for the Promise to settle before the function leaves the `try` block. Use it when that timing is part of the intended behavior. In simple forwarding code without local settlement handling, `return promise` is enough.

## Where `await` is allowed

`await` can be used inside an async function. It can also be used at the top level of a JavaScript module:

```js
const settings = await loadSettings();
```

Top-level await is for modules, such as a browser script loaded with `type="module"` or a Node.js ES module. A classic script or CommonJS file cannot use top-level `await`; put the code inside an async function instead:

```js
async function main() {
    const settings = await loadSettings();
    console.log(settings);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

When an async event handler is called by an event system, that system may not wait for the returned Promise. Handle its rejection inside the handler or attach a rejection handler where it is called.

## Avoid unnecessary Promise wrapping

Do not create a new Promise just to call and await an operation that already returns a Promise:

```js
// Unnecessary wrapper
function loadData() {
    return new Promise((resolve, reject) => {
        fetchData().then(resolve, reject);
    });
}
```

Return the existing Promise instead:

```js
function loadData() {
    return fetchData();
}
```

Use the Promise constructor when adapting a callback-based API that does not already provide a Promise. Avoid an `async` Promise executor because the Promise constructor does not wait for the Promise returned by its executor.

## Common mistakes to avoid

- Calling an async function and forgetting to handle its returned Promise.
- Treating `await` as a way to make CPU-heavy JavaScript non-blocking.
- Awaiting independent operations one at a time when they could be combined.
- Using `forEach(async ...)` and expecting the loop to wait.
- Catching an error and returning a misleading success-shaped fallback.
- Assuming a timeout or rejected await cancels the underlying operation.
- Using `return promise` inside a `try` when a local `catch` needs to observe that Promise's rejection.
- Adding an unnecessary Promise constructor around an existing Promise API.

## Try it yourself

1. Create an async function that returns a number. Call it and inspect the returned Promise with `.then()`.
2. Add a synchronous log before and after calling an async function that awaits a fulfilled Promise. Compare the output order.
3. Await an ordinary string and inspect the resulting value.
4. Throw an Error inside an async function and handle the rejected Promise with both `.catch()` and `try`/`catch`.
5. Add a `finally` block that resets a loading flag after both success and failure.
6. Fetch a record and then use one of its fields to fetch a dependent record. Keep these steps sequential.
7. Start two independent operations before awaiting `Promise.all()`. Compare with awaiting them separately.
8. Replace a `forEach(async ...)` loop with `for...of` and then with `map()` plus `Promise.all()`. Compare their execution policies.
9. Put `return fetchData()` and `return await fetchData()` inside a `try`/`catch`. Make the operation reject and observe which local catch handles it.
10. Run code with top-level `await` in a module, then try the same statement in a classic script or CommonJS file.

## Key points

- An async function always returns a Promise. Returned values fulfill it, returned Promises are adopted, and thrown errors reject it.
- `await` pauses the current async function until its input settles, then supplies the fulfillment value or throws the rejection reason.
- The caller and other scheduled work can continue while an async function is paused.
- Awaiting does not move CPU-heavy JavaScript to another thread.
- Use `try`/`catch` for awaited rejections and `finally` for cleanup.
- Await dependent steps in sequence. Start independent work first and combine it with a Promise method.
- Use `for...of` for sequential async loops. Use `map()` with a combinator for independent tasks.
- `forEach()` does not wait for async callbacks.
- `return await` is useful when a local `catch` or `finally` must observe Promise settlement.
- Top-level `await` is available in modules. Otherwise, place awaited work inside an async function.
- Do not wrap a Promise-returning API in a redundant Promise constructor.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [94 - Promise combinators and concurrent work](094-promise-combinators-and-concurrent-work.md) | [Open Q&A](../qnas/095-async-and-await.md) | [Open example](../examples/095-async-and-await.md) | [96 - Asynchronous errors, concurrency, and coordination](096-asynchronous-errors-concurrency-and-coordination.md) |