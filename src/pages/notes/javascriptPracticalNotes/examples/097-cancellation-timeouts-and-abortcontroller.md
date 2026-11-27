# 97 - Cancellation, timeouts, and AbortController

This example implements a small abortable delay so you can see how a custom operation observes an `AbortSignal`. It demonstrates manual cancellation, a timeout controller, combined signals, and stopping a group of related tasks.

The code uses built-in JavaScript features and runs in a modern Node.js runtime that supports `AbortSignal.any()`. It prints the expected output in the terminal. It does not create a browser page.

## Goal

By the end of this example, you can:

- Stop a custom asynchronous wait when its signal aborts.
- Handle user cancellation separately from a timeout.
- Clear a manual timeout after the operation settles.
- Combine user and timeout signals.
- Cancel several related tasks with a shared controller.

## Complete example

Copy the code below into a file named `cancellation-and-timeouts.js`, then run it with a modern Node.js runtime using `node cancellation-and-timeouts.js`.

```js
function createAbortError() {
    const error = new Error("Operation was aborted");
    error.name = "AbortError";
    return error;
}

function getAbortReason(signal) {
    if (signal.reason !== undefined) {
        return signal.reason;
    }

    return createAbortError();
}

function abortableDelay(label, milliseconds, { signal } = {}) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(getAbortReason(signal));
            return;
        }

        const timerId = setTimeout(() => {
            cleanup();
            resolve(label);
        }, milliseconds);

        function onAbort() {
            clearTimeout(timerId);
            cleanup();
            reject(getAbortReason(signal));
        }

        function cleanup() {
            signal?.removeEventListener("abort", onAbort);
        }

        signal?.addEventListener("abort", onAbort, { once: true });
    });
}

function createTimeoutController(milliseconds) {
    const controller = new AbortController();
    const reason = new Error("Operation timed out");
    reason.name = "TimeoutError";

    const timerId = setTimeout(() => {
        controller.abort(reason);
    }, milliseconds);

    return {
        signal: controller.signal,
        clear() {
            clearTimeout(timerId);
        },
    };
}

async function main() {
    // A user action aborts a pending operation with a descriptive reason.
    const searchController = new AbortController();
    const searchPromise = abortableDelay("search", 40, {
        signal: searchController.signal,
    });

    setTimeout(() => {
        searchController.abort(new Error("user left search"));
    }, 5);

    try {
        await searchPromise;
    } catch (error) {
        console.log(`Manual cancellation: ${error.message}`);
        console.log(`Signal aborted: ${searchController.signal.aborted}`);
    }

    // A manual timeout aborts the operation and is cleared in finally.
    const timeout = createTimeoutController(5);

    try {
        await abortableDelay("slow report", 40, { signal: timeout.signal });
    } catch (error) {
        console.log(`Manual timeout: ${error.name}`);
    } finally {
        timeout.clear();
    }

    // A successful operation clears its longer timer before the deadline.
    const successTimeout = createTimeoutController(100);

    try {
        const result = await abortableDelay("quick work", 5, {
            signal: successTimeout.signal,
        });
        console.log(`Timer cleared after success: ${result}`);
    } finally {
        successTimeout.clear();
    }

    // Either user cancellation or the deadline can abort this operation.
    const navigationController = new AbortController();
    const combinedTimeout = createTimeoutController(100);
    const combinedSignal = AbortSignal.any([
        navigationController.signal,
        combinedTimeout.signal,
    ]);

    setTimeout(() => {
        navigationController.abort(new Error("user navigation"));
    }, 5);

    try {
        await abortableDelay("page request", 40, { signal: combinedSignal });
    } catch (error) {
        console.log(`Combined cancellation source: ${error.message}`);
    } finally {
        combinedTimeout.clear();
    }

    // One controller can stop several operations that share a lifecycle.
    const groupController = new AbortController();
    const groupTasks = [
        abortableDelay("profile", 40, { signal: groupController.signal }),
        abortableDelay("settings", 50, { signal: groupController.signal }),
    ];

    setTimeout(() => {
        groupController.abort();
    }, 5);

    const groupOutcomes = await Promise.allSettled(groupTasks);
    const rejectedReasons = groupOutcomes
        .filter((outcome) => outcome.status === "rejected")
        .map((outcome) => outcome.reason.name);

    console.log(
        `Group canceled: ${rejectedReasons.length} tasks, reasons: ${rejectedReasons.join(", ")}`,
    );
}

main().catch((error) => {
    console.error("Unexpected failure:", error);
    process.exitCode = 1;
});
```

## Expected terminal output

```text
Manual cancellation: user left search
Signal aborted: true
Manual timeout: TimeoutError
Timer cleared after success: quick work
Combined cancellation source: user navigation
Group canceled: 2 tasks, reasons: AbortError, AbortError
```

## How it works

### The delay observes cancellation

`abortableDelay()` first checks whether its signal is already aborted. If so, it rejects without scheduling a timer. Otherwise it starts a timer and listens for the `abort` event.

If the timer finishes first, the function removes the listener and fulfills. If the signal aborts first, it clears the timer, removes the listener, and rejects with the signal's reason. This is cooperative cancellation: the helper can stop its own scheduled wait because it was written to observe the signal.

### A manual timeout owns a timer

`createTimeoutController()` aborts its controller with a `TimeoutError` when its timer fires. The operation receives the controller's signal. Both call sites clear the timer in `finally`, so a successful or failed operation does not leave an unnecessary timer waiting to fire.

### `AbortSignal.any()` combines cancellation sources

The page request uses a combined signal. The navigation controller aborts before the timeout controller, so the operation rejects with the navigation reason. If the deadline had fired first, the timeout reason would have been used instead.

### A group controller shares one cancellation lifecycle

Both task Promises receive the same signal. Aborting the group controller requests that both waits stop. `Promise.allSettled()` observes both rejections and lets the example report that both tasks were canceled.

### Using the same idea with `fetch()`

Assume the page contains a button with id `cancel-report`. Pass the signal to fetch. Clicking the button aborts the pending request, which then rejects its Promise:

```js
const controller = new AbortController();
const cancelButton = document.querySelector("#cancel-report");
const requestPromise = fetch("/api/report", {
    signal: controller.signal,
});

cancelButton.addEventListener("click", () => controller.abort(), {
    once: true,
});

try {
    const response = await requestPromise;
    const report = await response.json();
    console.log(report);
} catch (error) {
    if (controller.signal.aborted) {
        console.log("The report request was canceled");
    } else {
        throw error;
    }
}
```

The request API must support the signal. Aborting a request also does not roll back work that a server has already completed.

## Try another case

1. Abort `searchController` before creating `searchPromise`. The helper should reject immediately without waiting for its timer.
2. Remove the custom reason from `navigationController.abort()`. Inspect the default reason supplied by the runtime.
3. Make the timeout longer than the report delay. The request should finish and the `finally` block should clear the timeout.
4. Trigger the timeout before the user cancellation. Confirm which reason the combined signal carries.
5. Give the two group tasks different labels and delays. Both should still reject with the shared abort reason.
6. Remove the abort listener cleanup from `abortableDelay()` and consider what references could remain after the operation settles.
7. Pass an already-aborted signal to an API that ignores it. Observe that the API must implement signal handling for cancellation to work.
8. Replace `abortableDelay()` with a long server write. Explain why aborting the client request cannot guarantee that the server did not finish the write.

## Key points

- An abort signal only stops work that observes and honors it.
- A custom cancellable operation must handle both already-aborted and later-aborted signals.
- Remove abort listeners and clear timers when the operation settles.
- `AbortSignal.any()` combines user cancellation with a deadline.
- A shared controller can stop a related group of signal-aware operations.
- `Promise.allSettled()` can collect the outcomes after a group is canceled.
- Cancellation does not undo a completed side effect.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [96 - Asynchronous errors, concurrency, and coordination](../lessons/096-asynchronous-errors-concurrency-and-coordination.md) | [Open lesson](../lessons/097-cancellation-timeouts-and-abortcontroller.md) | [Open Q&A](../qnas/097-cancellation-timeouts-and-abortcontroller.md) | [98 - Browser globals, globalThis, window, and document](../lessons/098-browser-globals-globalthis-window-and-document.md) |