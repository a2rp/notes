# 97 - Cancellation, timeouts, and AbortController

A Promise has no built-in method that can stop the work it represents. Cancellation requires cooperation from the operation. In browser APIs and many modern JavaScript runtimes, `AbortController` and `AbortSignal` provide a shared way to request that an operation stop.

This chapter covers cancellation, timeouts, and cleanup. It also explains how to distinguish an intentional abort from an ordinary failure and how to make custom asynchronous work respond to a signal.

## A Promise is not automatically cancelable

Calling `reject()` on a separate Promise or letting `Promise.race()` reject does not stop the underlying operation. A timeout race may stop the caller from waiting, but the request or task can continue in the background.

To stop real work, the operation must support cancellation or check for a cancellation request. `AbortController` is a signal mechanism. It does not forcibly interrupt arbitrary JavaScript or undo side effects that already happened.

## Create and pass an `AbortSignal`

An `AbortController` owns a signal. Pass that signal to an API that supports it:

```js
const controller = new AbortController();

const request = fetch("/api/profile", {
    signal: controller.signal,
});

controller.abort();
```

The API watches the signal. If it honors cancellation, the pending request rejects with the abort reason. For the default `abort()` reason, this is commonly an `AbortError`.

The caller can abort after a user action, component teardown, route change, or other decision that makes the result unnecessary:

```js
const controller = new AbortController();

async function loadProfile() {
    try {
        const response = await fetch("/api/profile", {
            signal: controller.signal,
        });
        return await response.json();
    } catch (error) {
        if (controller.signal.aborted) {
            return null;
        }

        throw error;
    }
}

const profilePromise = loadProfile();
controller.abort();
```

Only convert cancellation to a value when that behavior is appropriate for the caller. Otherwise, let the rejection propagate.

### Signals are one-shot

After a signal has been aborted, it remains aborted. Do not reuse that controller for a later request. Create a new controller for each operation or group of operations that needs a fresh cancellation lifecycle.

A single controller can coordinate several related operations by passing its signal to each one. Aborting the controller then requests that all of those operations stop, if they support the signal.

```js
const controller = new AbortController();

const profilePromise = fetch("/api/profile", {
    signal: controller.signal,
});
const settingsPromise = fetch("/api/settings", {
    signal: controller.signal,
});

controller.abort();
```

Sharing a signal is useful when the tasks belong to one screen or workflow. Use separate controllers when each operation should be canceled independently.

## Read cancellation state and reason

A signal exposes useful state:

- `signal.aborted` is `true` after cancellation.
- `signal.reason` contains the reason for the cancellation.
- `signal.throwIfAborted()` throws the reason if the signal has already been aborted.
- The `abort` event lets a custom operation react when cancellation happens.

`controller.abort()` without a reason uses a default `AbortError` reason. A caller may also supply a reason:

```js
controller.abort(new Error("The user left this page"));
```

The reason can be an arbitrary JavaScript value. Do not assume every abort reason has the name `AbortError`. Check the signal you own or compare the actual reason when deciding whether the operation was canceled.

## Handle aborts separately from failures

Cancellation is often an expected control-flow outcome. A user may leave a page while a request is pending. It usually should not show the same error message as a server failure.

```js
async function loadSearchResults(query, signal) {
    try {
        const response = await fetch(
            `/api/search?q=${encodeURIComponent(query)}`,
            { signal },
        );

        if (!response.ok) {
            throw new Error(`Search failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (signal.aborted) {
            return null;
        }

        throw error;
    }
}
```

A cancellation check is more reliable than assuming every cancellation error is named `AbortError`, especially when a custom abort reason is supplied. Keep the signal available in the catch boundary when you need to identify why the operation stopped.

Do not hide unrelated failures as cancellation. If `signal.aborted` is false, preserve or report the actual error.

## Use a timeout signal

`AbortSignal.timeout(milliseconds)` creates a signal that aborts after the requested duration:

```js
async function loadWithTimeout(url) {
    const signal = AbortSignal.timeout(3000);
    const response = await fetch(url, { signal });
    return response.json();
}
```

The operation must accept and honor the signal. A timeout signal does not force an API that ignores it to stop.

The timeout reason is normally a `TimeoutError`, which can be handled differently from a user cancellation:

```js
try {
    await loadWithTimeout("/api/report");
} catch (error) {
    if (error.name === "TimeoutError") {
        showMessage("The request took too long.");
    } else {
        showMessage("The report could not be loaded.");
    }
}
```

An abort reason can be customized, so use the actual signal and reason when an application needs a more specific distinction.

### Combine a timeout with user cancellation

A request may need to stop when either the user cancels or a deadline expires. `AbortSignal.any()` combines signals and aborts when one of them aborts:

```js
const userController = new AbortController();
const timeoutSignal = AbortSignal.timeout(3000);
const signal = AbortSignal.any([
    userController.signal,
    timeoutSignal,
]);

const response = await fetch("/api/report", { signal });
```

The combined signal uses the reason from the signal that aborted first. Keep references to the original signals if the UI needs to distinguish user cancellation from timeout.

`AbortSignal.timeout()` and `AbortSignal.any()` are modern APIs. Check runtime support when targeting older browsers or older JavaScript runtimes. A manual timer with an `AbortController` is a widely understood fallback.

### Build a manual timeout and clear its timer

A manual timeout gives the caller a timer handle it can clear when the operation finishes early:

```js
function createTimeoutController(milliseconds) {
    const controller = new AbortController();
    const timeoutError = new Error("Operation timed out");
    timeoutError.name = "TimeoutError";

    const timerId = setTimeout(() => {
        controller.abort(timeoutError);
    }, milliseconds);

    return {
        signal: controller.signal,
        clear() {
            clearTimeout(timerId);
        },
    };
}

async function loadReport() {
    const timeout = createTimeoutController(3000);

    try {
        const response = await fetch("/api/report", {
            signal: timeout.signal,
        });
        return await response.json();
    } finally {
        timeout.clear();
    }
}
```

`finally` clears the timer on both success and failure. This pattern requests cancellation at the deadline. The fetch operation must receive the signal for the request to stop.

If the user can cancel too, combine the user's signal with the timeout controller's signal, or have both causes abort one controller. Keep the timeout cleanup in `finally`.

## Abort custom asynchronous work cooperatively

A custom operation must observe the signal and stop its own work. It should reject immediately when handed a signal that is already aborted, listen for later aborts, and remove its listener when it settles.

```js
function createAbortError() {
    const error = new Error("Operation was aborted");
    error.name = "AbortError";
    return error;
}

function wait(milliseconds, { signal } = {}) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(signal.reason ?? createAbortError());
            return;
        }

        const timerId = setTimeout(() => {
            cleanup();
            resolve();
        }, milliseconds);

        function onAbort() {
            clearTimeout(timerId);
            cleanup();
            reject(signal.reason ?? createAbortError());
        }

        function cleanup() {
            signal?.removeEventListener("abort", onAbort);
        }

        signal?.addEventListener("abort", onAbort, { once: true });
    });
}
```

The abort listener clears the scheduled timer and rejects with the signal's reason. Cleanup removes the listener whether the wait completes or aborts.

When writing a custom operation that does more than wait, check the signal between meaningful steps and stop scheduling additional work after an abort. Cancellation is cooperative: code that is already executing synchronously continues until it yields or checks the signal.

## Cancel a group of dependent operations

Pass one signal through the entire workflow. If a later step is no longer needed, abort the shared controller so every signal-aware step can stop:

```js
async function loadPage(signal) {
    const response = await fetch("/api/page", { signal });
    const page = await response.json();

    signal.throwIfAborted();

    const detailResponse = await fetch(`/api/details/${page.id}`, {
        signal,
    });

    return detailResponse.json();
}
```

Passing the same signal to both requests allows either pending fetch to observe cancellation. `throwIfAborted()` also prevents custom code from continuing to the next step if the signal is already aborted.

Do not swallow an abort at a lower layer if an outer workflow needs to stop. Decide at a clear boundary whether cancellation should be returned as a value, shown to the user, or propagated.

## Cancellation and Promise combinators

A combinator does not cancel its inputs:

- A rejection from `Promise.all()` does not abort its other tasks.
- A winner from `Promise.any()` does not stop slower alternatives.
- A winner from `Promise.race()` does not stop the losing operation.

When a group shares one purpose, pass a shared signal to its operations and abort that controller when the group should stop. This is useful after one required task fails, when a user leaves the screen, or when a deadline expires.

Do not share one controller across unrelated features. Aborting it would request cancellation for every operation listening to that signal.

## Cancellation is not rollback

Aborting a request can stop work that is still in progress, but it cannot undo an action the server has already completed. A canceled write may have succeeded even if the client did not receive its response.

For operations with side effects, consider whether the request is safe to retry, whether it needs an idempotency key, and how the server reports the final state. Use a transaction or compensation strategy when the application needs stronger guarantees.

## Common mistakes

- Assuming a Promise or `Promise.race()` can stop the underlying task by itself.
- Reusing a controller after its signal has already been aborted.
- Passing a signal to an API that does not support it and assuming the work stopped.
- Treating every abort reason as an `AbortError` when custom reasons are possible.
- Showing a cancellation as an ordinary failure after a user leaves the page.
- Forgetting to clear a manual timeout or remove a custom abort listener.
- Aborting a shared controller that belongs to unrelated tasks.
- Assuming cancellation reverses a side effect already completed by a server.
- Starting a custom operation with a signal that was already aborted.
- Catching an abort and continuing to schedule dependent work.

## Try it yourself

1. Start a fetch with an `AbortController`, abort it, and handle the rejection at the call site.
2. Inspect `signal.aborted` and `signal.reason` before and after calling `abort()`.
3. Supply a custom reason to `abort()` and observe why checking only the error name is insufficient.
4. Use `AbortSignal.timeout()` and distinguish its timeout reason from a regular network error.
5. Combine a user signal and a timeout signal with `AbortSignal.any()`.
6. Use a manual timeout and clear its timer when the request completes successfully.
7. Update the `wait()` helper so it handles an already-aborted signal and removes its listener after either outcome.
8. Pass one signal to two related requests and abort both through the same controller.
9. Abort between two workflow steps and call `throwIfAborted()` before starting the second step.
10. Trigger cancellation after a server write has started. Explain why the client cannot assume that cancellation rolled back the write.

## Key points

- Promises do not have built-in cancellation. The underlying operation must cooperate.
- `AbortController` owns a one-shot `AbortSignal`; pass the signal to APIs that support it.
- `signal.aborted` and `signal.reason` help identify a cancellation and its cause.
- `AbortSignal.timeout()` creates a deadline signal. `AbortSignal.any()` can combine cancellation sources.
- A manual timer should be cleared in `finally` when the operation settles early.
- Custom async APIs must check an already-aborted signal, observe later aborts, stop their own work, and clean up listeners.
- Promise combinators do not cancel losing or remaining tasks. Share and abort a signal when a group should stop.
- Cancellation does not roll back work that has already completed.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [96 - Asynchronous errors, concurrency, and coordination](096-asynchronous-errors-concurrency-and-coordination.md) | [Open Q&A](../qnas/097-cancellation-timeouts-and-abortcontroller.md) | [Open example](../examples/097-cancellation-timeouts-and-abortcontroller.md) | [98 - Browser globals, globalThis, window, and document](098-browser-globals-globalthis-window-and-document.md) |