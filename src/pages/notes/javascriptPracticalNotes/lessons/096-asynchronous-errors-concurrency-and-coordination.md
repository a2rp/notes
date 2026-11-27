# 96 - Asynchronous errors, concurrency, and coordination

Asynchronous operations can finish after the function that started them has returned to its caller. Their failures must travel through a Promise, an awaited expression, or a callback that has its own error boundary. Starting several operations together also raises coordination questions: whether one failure should stop the group, how much work may run at once, and whether simultaneous tasks can interfere with shared state.

This chapter brings those decisions together. It builds on Promise combinators and `async`/`await`, then prepares for explicit cancellation and timeouts in the next chapter.

## Errors are part of the asynchronous result

A Promise represents either a fulfillment value or a rejection reason. An async function represents its returned value or thrown error with a Promise. Handle both outcomes deliberately:

```js
async function loadAccount(accountId) {
    const response = await fetchAccount(accountId);
    return response;
}

try {
    const account = await loadAccount("account-42");
    showAccount(account);
} catch (error) {
    showAccountError(error);
}
```

A rejected Promise awaited inside `try` throws at that `await` expression. A synchronous throw inside the same `try` is caught in the usual way.

### Put the error boundary where a useful decision can be made

The function that knows whether to recover, retry, report, or stop is usually the best place to handle an error. A low-level function should not silently turn every failure into an empty value if its callers need to know the operation failed.

```js
async function readSettings() {
    const response = await fetchSettings();
    return response;
}

async function openSettingsPage() {
    try {
        const settings = await readSettings();
        renderSettings(settings);
    } catch (error) {
        showMessage("Settings could not be loaded.");
        reportSettingsError(error);
    }
}
```

The boundary handles the failure because it can choose both what the user sees and what diagnostic information to keep.

### A `try` block must observe the Promise settlement

This `catch` does not handle a later rejection from `saveChanges()`:

```js
async function save() {
    try {
        return saveChanges();
    } catch (error) {
        showSaveError(error);
    }
}
```

The function returns the Promise before it settles. Await it when the local catch or finally must observe its outcome:

```js
async function save() {
    try {
        return await saveChanges();
    } catch (error) {
        showSaveError(error);
        throw error;
    }
}
```

If no local settlement handling is needed, returning the Promise directly is fine. Use `return await` when local control flow depends on the result.

### Handle or return every asynchronous operation

A detached Promise can reject outside the current error boundary:

```js
async function refresh() {
    loadNotifications(); // Not awaited or returned
    return loadProfile();
}
```

The caller can handle the profile request through `refresh()`, but it does not automatically handle a failure from `loadNotifications()`. If both results matter, await or return both. If the notification refresh is intentionally fire-and-forget, attach an explicit rejection handler and make that policy clear.

```js
async function refresh() {
    const notificationsPromise = loadNotifications();
    const profilePromise = loadProfile();

    const [notifications, profile] = await Promise.all([
        notificationsPromise,
        profilePromise,
    ]);

    return { notifications, profile };
}
```

A `try`/`catch` around the call that starts an unawaited Promise only catches errors thrown before the Promise is returned. It cannot catch a rejection that happens later.

## Use useful error values

Reject with an `Error` object when an operation fails. Error objects carry a message and stack information that help explain where the problem began.

When adding context, keep the original error as the cause:

```js
async function loadInvoice(invoiceId) {
    try {
        return await requestInvoice(invoiceId);
    } catch (cause) {
        throw new Error(`Could not load invoice ${invoiceId}`, { cause });
    }
}
```

The outer message describes the operation the caller understands. The `cause` retains the lower-level failure for diagnostics. Do not include secrets or sensitive data in error messages that may be logged or displayed.

### Recover only from failures the code can handle

A catch may return a fallback when that fallback is a valid result for the feature:

```js
async function readOptionalAnnouncement() {
    try {
        return await loadAnnouncement();
    } catch (error) {
        if (error.code === "NOT_FOUND") {
            return null;
        }

        throw error;
    }
}
```

This handles the expected missing-announcement case and preserves unexpected failures. Returning `null`, `[]`, or `{}` for every error can make a broken request appear successful and can cause later code to act on misleading data.

### Cleanup belongs in `finally`

Use `finally` for work that must happen whether an operation fulfills or rejects:

```js
async function saveDocument() {
    setSaving(true);

    try {
        return await writeDocument();
    } finally {
        setSaving(false);
    }
}
```

Avoid returning or throwing a new value from `finally` unless replacing the earlier result is intentional. A throw in `finally` can replace the original rejection, making the first failure harder to diagnose.

## Coordinate groups of operations

Choose a group policy based on what the caller needs:

- Use `Promise.all()` when every result is required. The aggregate rejects when a member rejects.
- Use `Promise.allSettled()` when every member's outcome must be reported, including partial failures.
- Use `Promise.any()` when the first successful alternative is enough.
- Use `Promise.race()` when the first settlement, success or failure, should determine the result.

The previous lesson covers each method's exact behavior.

### `Promise.all()` rejection is not cancellation

`Promise.all()` is useful for required independent tasks, but its rejection does not stop other tasks already in progress. If one operation rejects, the aggregate rejects while the other operations may continue and still perform side effects.

```js
try {
    return await Promise.all([
        writeProfile(profile),
        writePreferences(preferences),
    ]);
} catch (error) {
    showSaveError(error);
    throw error;
}
```

This code reports the group failure. It does not roll back a write that already succeeded and does not cancel a write that is still running. If partial writes are unsafe, use an application-level transaction or a compensating action. If operations support cancellation, pass a cancellation signal and abort the remaining work when appropriate. The next chapter explains cancellation APIs.

### Collect every outcome with `Promise.allSettled()`

When independent tasks can succeed or fail separately, inspect every result:

```js
const outcomes = await Promise.allSettled(
    files.map((file) => uploadFile(file)),
);

const successes = [];
const failures = [];

for (const [index, outcome] of outcomes.entries()) {
    if (outcome.status === "fulfilled") {
        successes.push({ file: files[index], value: outcome.value });
    } else {
        failures.push({ file: files[index], reason: outcome.reason });
    }
}
```

This is useful for batch processing, but it does not retry failures or decide whether partial success is acceptable. The caller must choose what to display, save, retry, or stop.

You can also turn each task into an explicit outcome before using `Promise.all()`:

```js
async function captureOutcome(task) {
    try {
        return { ok: true, value: await task() };
    } catch (error) {
        return { ok: false, error };
    }
}

const outcomes = await Promise.all(
    tasks.map((task) => captureOutcome(task)),
);
```

Use a clear result shape when it helps the rest of the application. Do not catch an error merely to suppress it.

## Distinguish concurrency from parallel execution

Concurrency means multiple operations can make progress during overlapping periods. For example, several network requests can wait for responses at the same time. This does not mean their JavaScript callbacks execute simultaneously.

Starting independent operations together can reduce total waiting time:

```js
const profilePromise = loadProfile();
const settingsPromise = loadSettings();
const [profile, settings] = await Promise.all([
    profilePromise,
    settingsPromise,
]);
```

Awaiting each one before starting the next creates a sequence instead. That is correct when a later operation depends on an earlier result, but wasteful when the tasks are independent.

## Limit concurrency for large groups

`Promise.all(items.map(doWork))` starts the operation for every item while `map()` builds the array. This is reasonable for a small group. For a large group it may overwhelm a server, exhaust a connection pool, or consume too much memory.

A worker pool keeps only a fixed number of tasks active. This version stops taking new items after a task fails, waits for the already active workers to finish their current tasks, then throws the first recorded error:

```js
async function mapWithConcurrency(items, limit, worker) {
    if (!Number.isInteger(limit) || limit < 1) {
        throw new RangeError("limit must be a positive integer");
    }

    const results = new Array(items.length);
    let nextIndex = 0;
    let hasFailed = false;
    let firstError;

    async function runWorker() {
        while (!hasFailed) {
            const index = nextIndex;
            nextIndex += 1;

            if (index >= items.length) {
                return;
            }

            try {
                results[index] = await worker(items[index], index);
            } catch (error) {
                if (!hasFailed) {
                    hasFailed = true;
                    firstError = error;
                }
            }
        }
    }

    const workerCount = Math.min(limit, items.length);
    const workers = Array.from({ length: workerCount }, () => runWorker());
    await Promise.all(workers);

    if (hasFailed) {
        throw firstError;
    }

    return results;
}
```

The shared `nextIndex` is safe in this example because each worker reads and increments it synchronously, with no `await` between those statements. Results are written to their original indexes, so the returned array follows input order rather than completion order.

When a worker fails, operations already in progress are not canceled. They are awaited before the helper throws. If each failure must be collected, store an outcome per index instead of stopping at the first error. Add cancellation separately if the worker operations support it.

For a short list, fixed-size batches can be easier to understand. A pool is more flexible for a large or streaming input.

## Be careful with shared mutable state

JavaScript executes each synchronous segment to completion, but two async functions can still interleave across `await` points and act on stale data.

```js
let availableSeats = 1;

async function reserveSeat() {
    const current = availableSeats;
    await checkEligibility();

    if (current > 0) {
        availableSeats = current - 1;
        return "reserved";
    }

    return "unavailable";
}
```

If two calls read `availableSeats` before either resumes, both can observe `1` and both can report success. The final value can still be `0`, which hides the incorrect double reservation.

For shared data, move the check and update into one atomic operation, use a transaction or lock provided by the relevant system, or serialize the operations. A local Promise combinator cannot make a multi-step remote or shared-state update atomic.

Also avoid relying on completion order for side effects. If order matters, process tasks sequentially or explicitly sequence the dependent work.

## Retry only when retry is safe

Some failures are transient, such as a temporary network interruption. A bounded retry can help, but retries can repeat side effects. Only retry when the operation is safe to repeat or uses an idempotency mechanism. Do not retry validation errors, authorization failures, or other permanent failures without a specific reason.

A simple policy uses a maximum attempt count and a delay that grows between attempts:

```js
async function retry(operation, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            return await operation();
        } catch (error) {
            const lastAttempt = attempt === maxAttempts;
            const canRetry = error.retryable === true;

            if (!canRetry || lastAttempt) {
                throw error;
            }

            const delayMs = 100 * 2 ** (attempt - 1);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    throw new Error("Unreachable retry state");
}
```

Production retry policies often add randomness to the delay so many clients do not retry at the same instant. They should also respect an overall deadline and stop when the caller cancels. A retry loop without a limit can keep work alive indefinitely.

## Prevent unhandled rejections

Every started Promise should have an intentional path for its rejection. Await it, return it to a caller that handles it, or attach a catch handler for an intentional background task.

```js
startBackgroundRefresh().catch((error) => {
    reportBackgroundFailure(error);
});
```

A global unhandled-rejection event may help a runtime log or diagnose failures, but it is not a substitute for handling errors at the operation boundary. It usually cannot determine the right recovery behavior for a particular feature.

At an application entry point, handle the final async workflow:

```js
async function main() {
    await startApplication();
}

main().catch((error) => {
    console.error("Application startup failed:", error);
    process.exitCode = 1;
});
```

A browser event callback should also handle its own async failure because the browser does not generally wait for the returned Promise to decide how the feature should recover.

## A practical decision sequence

For an async workflow, ask these questions in order:

1. Which errors can this function actually recover from?
2. Which caller can show a useful message, retry safely, or stop the workflow?
3. Are the operations independent, dependent, or partially independent?
4. Is every result required, is partial success useful, or is one success enough?
5. How many operations may be active at once?
6. Can a failure leave partial side effects or stale shared state?
7. Should remaining work continue, or does the operation support explicit cancellation?
8. Has every started Promise been awaited, returned, or given an intentional rejection handler?

Answering these questions makes error handling and concurrency policy part of the design rather than an afterthought.

## Try it yourself

1. Make one Promise reject in a `Promise.all()` group. Catch the rejection and observe that another already-started task may still finish.
2. Run the same tasks with `Promise.allSettled()` and separate fulfilled results from rejected reasons.
3. Add an unawaited Promise inside a `try` block. Make it reject and confirm that the local catch does not handle its later rejection. Then await or return it.
4. Wrap a low-level failure in a new `Error` with a `cause`. Display the outer message and inspect the cause for debugging.
5. Use the worker pool with a concurrency limit of two. Track the active count and confirm it never exceeds two.
6. Make a worker fail. Confirm the pool starts no new items after it observes the failure, but already active items still finish.
7. Run two read-modify-write operations that pause between reading and writing shared state. Observe the stale-value problem.
8. Add a retry to a safe transient operation. Make it stop after a fixed number of attempts.
9. Remove the retryability check or attempt limit, then explain why this could repeat an unsafe side effect or keep work alive too long.
10. Add a catch handler to an intentional background task and make its failure visible in a log.

## Key points

- A rejected await throws at that point. Catch it where code can make a meaningful recovery or reporting decision.
- A `try` block must await a Promise to catch its later rejection. Returned or detached work needs a caller or its own rejection handler.
- Preserve useful error context and rethrow failures that the current function cannot handle.
- Use `finally` for cleanup, and avoid replacing the original error accidentally.
- `Promise.all()` rejects on a failure but does not cancel other tasks or undo side effects.
- `Promise.allSettled()` is useful when each task outcome matters.
- Limit concurrency for large groups with batches or a worker pool.
- Concurrent async operations can interleave across `await` points and observe stale shared state.
- Retry only transient failures, with a limit, and only when repeating the operation is safe.
- Global rejection events are for diagnostics, not feature-level recovery.
- Every started Promise needs an intentional result and error path.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [95 - Async and await](095-async-and-await.md) | [Open Q&A](../qnas/096-asynchronous-errors-concurrency-and-coordination.md) | [Open example](../examples/096-asynchronous-errors-concurrency-and-coordination.md) | [97 - Cancellation, timeouts, and AbortController](097-cancellation-timeouts-and-abortcontroller.md) |