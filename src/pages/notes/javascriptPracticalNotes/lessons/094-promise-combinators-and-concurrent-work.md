# 94 - Promise combinators and concurrent work

Promise combinators coordinate several Promises. They help you run independent operations together, choose a result policy, and collect outcomes without writing a long chain of nested callbacks.

The four commonly used static methods are:

- `Promise.all()` - fulfill when every input fulfills, or reject when an input rejects.
- `Promise.allSettled()` - wait until every input settles and report each outcome.
- `Promise.any()` - fulfill with the first successful result, or reject when every input rejects.
- `Promise.race()` - settle with the first input that fulfills or rejects.

These methods coordinate Promises that already exist. They do not automatically make work parallel, impose a concurrency limit, or cancel work that loses a race.

## Start independent work together

If two operations do not depend on one another, start both before waiting for either one. This lets their waiting periods overlap.

```js
async function loadDashboard() {
    const profilePromise = fetchProfile();
    const settingsPromise = fetchSettings();

    const [profile, settings] = await Promise.all([
        profilePromise,
        settingsPromise,
    ]);

    return { profile, settings };
}
```

The calls to `fetchProfile()` and `fetchSettings()` happen before `Promise.all()` receives the array. If each function starts an asynchronous request immediately, the requests can be in progress at the same time. `Promise.all()` gives the caller one Promise for the combined result.

This is often faster than awaiting each independent operation one at a time:

```js
const profile = await fetchProfile();
const settings = await fetchSettings();
```

In the second version, `fetchSettings()` does not start until `fetchProfile()` has fulfilled. Use that order when the second operation actually needs the first result. Otherwise, start independent operations together.

Concurrent work is not the same as parallel JavaScript execution. A browser or runtime may overlap network waits and other asynchronous operations, but JavaScript callbacks still run according to the runtime's scheduling rules.

## `Promise.all()` for all required results

`Promise.all(iterable)` fulfills with an array after every input fulfills. The values appear in the same order as the inputs, even when the operations finish in a different order.

```js
const values = await Promise.all([
    loadProfile(),
    loadSettings(),
    loadNotifications(),
]);

const [profile, settings, notifications] = values;
```

The array position belongs to the input position. It does not indicate which operation finished first.

If any input rejects, the Promise returned by `Promise.all()` rejects with that rejection reason. This is useful when every result is required for the next step.

```js
try {
    const [account, permissions] = await Promise.all([
        loadAccount(),
        loadPermissions(),
    ]);

    renderAccount(account, permissions);
} catch (error) {
    showDashboardError(error);
}
```

### Early rejection does not cancel other work

The combined Promise rejects as soon as a rejection is observed. Other operations that were already started continue unless they support and receive cancellation separately. A rejected `Promise.all()` is not a cancellation signal.

If the group of operations should stop after one fails, pass a shared `AbortSignal` to operations that support it, then abort from the error handling path. Cancellation support depends on the operation. A Promise by itself cannot force arbitrary work to stop.

### Inputs and empty input

The methods accept an iterable, such as an array. Non-Promise values are treated like already fulfilled inputs, so this works:

```js
const values = await Promise.all([
    Promise.resolve("loaded"),
    42,
    "ready",
]);

console.log(values); // ["loaded", 42, "ready"]
```

For an empty iterable, `Promise.all([])` fulfills with an empty array. Promise handlers still run asynchronously as Promise jobs, even when the returned Promise is already fulfilled.

## `Promise.allSettled()` when every outcome matters

Use `Promise.allSettled(iterable)` when each task is independent and you want to inspect every success and failure. The returned Promise fulfills after all inputs settle. It does not reject just because an input rejects.

Each output entry has a `status` property:

- A fulfilled entry has `status: "fulfilled"` and a `value` property.
- A rejected entry has `status: "rejected"` and a `reason` property.

The result entries remain in input order.

```js
const results = await Promise.allSettled([
    uploadDocument(firstDocument),
    uploadDocument(secondDocument),
    uploadDocument(thirdDocument),
]);

for (const [index, result] of results.entries()) {
    if (result.status === "fulfilled") {
        console.log(`Upload ${index + 1} complete`, result.value);
    } else {
        console.error(`Upload ${index + 1} failed`, result.reason);
    }
}
```

This is useful for batch uploads, independent background refreshes, or any workflow where partial success is meaningful. You must decide what the application should do with each failed result. `allSettled()` records failures; it does not retry or repair them.

For an empty iterable, `Promise.allSettled([])` fulfills with an empty array.

## `Promise.any()` for the first successful result

Use `Promise.any(iterable)` when several independent sources can provide an acceptable answer and one successful result is enough.

```js
const content = await Promise.any([
    loadFromPrimaryCache(),
    loadFromSecondaryCache(),
    loadFromNetwork(),
]);
```

It fulfills with the first input to fulfill. A faster rejection does not prevent a later input from fulfilling. This differs from `Promise.race()`, which reacts to the first settlement of either kind.

If every input rejects, `Promise.any()` rejects with an `AggregateError`. Its `errors` array contains the rejection reasons in input order. Handle that case at the call site:

```js
try {
    const content = await Promise.any(sources);
    display(content);
} catch (error) {
    if (error instanceof AggregateError) {
        showUnavailableMessage();
        console.error(error.errors);
    } else {
        throw error;
    }
}
```

For an empty iterable, `Promise.any([])` rejects with an `AggregateError` because no input can fulfill.

This pattern can select the first successful replica, but it does not cancel slower sources after a winner is chosen. Use explicit cancellation if unnecessary requests should stop and the operations support it.

## `Promise.race()` for the first settlement

`Promise.race(iterable)` settles with the first input that settles. The first input can fulfill or reject.

```js
const result = await Promise.race([
    readFromPrimary(),
    readFromReplica(),
]);
```

If the primary rejects before the replica fulfills, the race rejects immediately. `race()` does not mean “first successful result.” Choose `any()` for that policy.

For an empty iterable, `Promise.race([])` remains pending forever because no input can settle it.

### A timeout race does not stop the operation

A common timeout pattern races an operation against a rejecting timer:

```js
function rejectAfter(milliseconds) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Operation timed out"));
        }, milliseconds);
    });
}

const result = await Promise.race([
    loadReport(),
    rejectAfter(3000),
]);
```

If the timer wins, the race rejects, but `loadReport()` may still be running. The timer also remains scheduled if the report wins first. For real request timeouts, prefer an operation that accepts an `AbortSignal`, abort it when the deadline expires, and clear any timer when the work finishes. The later cancellation lesson covers `AbortController` in more depth.

## Choose by the result policy

| Requirement | Method | Returned Promise behavior |
| --- | --- | --- |
| Every task must succeed | `Promise.all()` | Fulfills with all values or rejects on a failure |
| Inspect every success and failure | `Promise.allSettled()` | Fulfills with one status record per input |
| Any one successful result is enough | `Promise.any()` | Fulfills on first success or rejects with `AggregateError` |
| React to the first success or failure | `Promise.race()` | Adopts the first settlement |

Before selecting a method, ask:

1. Are all results required?
2. Is partial success useful?
3. Is one successful response enough?
4. Should the first failure also settle the group?
5. Should unfinished work be canceled explicitly?

## Limit concurrency deliberately

The combinators do not limit how many operations start. Mapping a large array to network calls and passing every Promise to `Promise.all()` can start a very large number of operations at once:

```js
const results = await Promise.all(
    records.map((record) => saveRecord(record)),
);
```

This is appropriate for a small group of independent operations. For a large group, use a concurrency pool or process fixed-size batches. A simple batch pattern allows at most two batch members to be in progress at once:

```js
const results = [];

for (let start = 0; start < records.length; start += 2) {
    const batch = records.slice(start, start + 2);
    const batchResults = await Promise.all(
        batch.map((record) => saveRecord(record)),
    );
    results.push(...batchResults);
}
```

This runs one batch at a time. Each pair runs together, and the next pair starts after both current operations finish. A dedicated worker pool is more flexible when the input size or concurrency limit is large.

## Avoid common mistakes

### Awaiting each item before building the group

This starts operations sequentially:

```js
const first = await loadFirst();
const second = await loadSecond();
```

For independent operations, start both first and await the combined Promise:

```js
const firstPromise = loadFirst();
const secondPromise = loadSecond();
const [first, second] = await Promise.all([firstPromise, secondPromise]);
```

### Passing functions instead of calling them

This passes function values, not the Promises returned by those functions:

```js
await Promise.all([loadFirst, loadSecond]);
```

Call each operation so its Promise is included:

```js
await Promise.all([loadFirst(), loadSecond()]);
```

### Losing input association

Because results use input order, keep task metadata in the same array or return an object with each result. Do not assume completion order matches array order.

### Forgetting synchronous evaluation

JavaScript evaluates array elements before calling `Promise.all()`. If evaluating a function call throws synchronously, the throw happens before `Promise.all()` starts. An `async` function converts a thrown error into a rejected Promise, which the combinator can observe:

```js
async function safelyStart(record) {
    return saveRecord(record);
}

const results = await Promise.all(records.map(safelyStart));
```

Use this when a called operation might throw before returning a Promise. Do not add an `async` wrapper without a reason when the operation already reliably returns a Promise.

## Try it yourself

1. Start three independent Promises with different delays and pass them to `Promise.all()`. Confirm that the final values are still in input order.
2. Make one operation reject. Add a `catch` around `Promise.all()` and confirm that its result Promise rejects.
3. Run the same group through `Promise.allSettled()` and print each status, value, or reason.
4. Create three fallback sources. Make the first one reject quickly and a later one fulfill. Compare `Promise.any()` with `Promise.race()`.
5. Make every source reject and inspect the `AggregateError.errors` array from `Promise.any()`.
6. Call each combinator with an empty array and observe its documented outcome.
7. Create several tasks from an array. Run them in batches and note the maximum number of active operations.
8. Race a task against a timer. Notice that losing the race does not stop the task unless it supports explicit cancellation.

## Key points

- Start independent operations before awaiting them to let asynchronous waiting overlap.
- `Promise.all()` is for groups where every result is required. Its values follow input order.
- `Promise.all()` rejects when an input rejects, but does not cancel the remaining operations.
- `Promise.allSettled()` waits for every input and reports fulfillment or rejection per item.
- `Promise.any()` waits for the first fulfillment and rejects with `AggregateError` only when all inputs reject.
- `Promise.race()` adopts the first fulfillment or rejection. A timeout race alone does not cancel the losing work.
- Empty inputs have different behavior for each combinator. `all` and `allSettled` fulfill with `[]`, `any` rejects with `AggregateError`, and `race` remains pending.
- Combinators accept iterables and treat ordinary values as fulfilled inputs.
- Combinators do not impose concurrency limits. Use batches or a worker pool for large groups.
- Select a combinator based on whether all results, partial results, one success, or the first settlement is required.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [93 - Promises, states, chaining, and error handling](093-promises-states-chaining-and-error-handling.md) | [Open Q&A](../qnas/094-promise-combinators-and-concurrent-work.md) | [Open example](../examples/094-promise-combinators-and-concurrent-work.md) | [95 - Async and await](095-async-and-await.md) |