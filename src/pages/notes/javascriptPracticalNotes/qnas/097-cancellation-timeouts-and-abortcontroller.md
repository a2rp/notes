# 97 - Cancellation, timeouts, and AbortController

This Q&A reviews [Lesson 97](../lessons/097-cancellation-timeouts-and-abortcontroller.md). Every answer is followed by an explanation.

## AbortController and signals

### 1. Can a Promise cancel the operation that it represents by itself?

**Answer:** No.

**Explanation:** The operation must support and cooperate with a cancellation mechanism. A Promise only represents an outcome.

### 2. What does an `AbortController` provide?

**Answer:** A way to request cancellation through its `AbortSignal`.

**Explanation:** Pass the controller's signal to an API that observes it, then call `abort()` when the operation should stop.

### 3. How do you pass a signal to `fetch()`?

**Answer:** Set the `signal` option to `controller.signal`.

**Explanation:** Fetch observes the signal and can reject its Promise when the associated request is aborted.

### 4. What does `signal.aborted` indicate?

**Answer:** Whether the signal has already been aborted.

**Explanation:** It is useful in catch blocks and custom APIs to distinguish cancellation from other errors.

### 5. What does `signal.reason` contain?

**Answer:** The reason supplied when the signal was aborted.

**Explanation:** If no custom reason was supplied, an AbortController normally uses a default `AbortError` reason.

### 6. What happens if `controller.abort()` is called without a reason?

**Answer:** The signal receives a default `AbortError` reason.

**Explanation:** The operation's Promise usually rejects with that reason if the API honors aborting.

### 7. Can the reason supplied to `abort()` be something other than an Error?

**Answer:** Yes, it can be an arbitrary JavaScript value.

**Explanation:** Code should not assume every cancellation rejection has the name `AbortError` when callers can provide custom reasons.

### 8. Can an aborted controller be reset for another request?

**Answer:** No.

**Explanation:** An AbortSignal is one-shot. Create a new controller for a new cancellation lifecycle.

### 9. When is it useful to share one signal across multiple operations?

**Answer:** When the operations belong to the same workflow and should stop together.

**Explanation:** Aborting the shared controller notifies every signal-aware operation using that signal.

### 10. Why should unrelated features use separate controllers?

**Answer:** So canceling one feature does not also request cancellation for the other feature's work.

**Explanation:** A shared signal affects every operation listening to it.

## Handling and composing cancellation

### 11. Should a user cancel usually show the same message as a server failure?

**Answer:** No.

**Explanation:** Cancellation is often expected control flow, such as leaving a page. It is usually different from an operation failing unexpectedly.

### 12. Why is checking `signal.aborted` often safer than checking only `error.name === "AbortError"`?

**Answer:** A caller may abort with a custom reason whose name is different.

**Explanation:** The signal and its reason reveal the cancellation source more directly than assuming a fixed error name.

### 13. What should a catch block do if the signal was not aborted?

**Answer:** Preserve or report the actual error.

**Explanation:** Otherwise an ordinary network or parsing failure could be hidden as a cancellation.

### 14. What does `AbortSignal.throwIfAborted()` do?

**Answer:** It throws the signal's reason if the signal is aborted.

**Explanation:** A custom workflow can call it between steps to avoid starting more work after cancellation.

### 15. What does `AbortSignal.timeout(milliseconds)` create?

**Answer:** A signal that aborts after the specified timeout duration.

**Explanation:** Pass that signal to an API that supports it so the API can stop the associated work.

### 16. What is the usual abort reason from `AbortSignal.timeout()`?

**Answer:** A `TimeoutError`.

**Explanation:** This lets an application distinguish a deadline from some other failure, while still checking the actual signal and reason.

### 17. What does `AbortSignal.any([...])` do?

**Answer:** It creates a signal that aborts when any supplied signal aborts.

**Explanation:** The combined signal carries the reason from the source that aborted first.

### 18. How can one request support both a user cancel button and a timeout?

**Answer:** Combine the user signal and a timeout signal, then pass the combined signal to the request.

**Explanation:** Either cancellation source can stop a signal-aware request. Retain both original signals if the UI needs to tell which one triggered it.

### 19. Why might a manual timeout use an AbortController and `setTimeout()`?

**Answer:** It can abort the operation at a deadline and expose a timer handle to clear.

**Explanation:** The timeout callback calls `abort()`, and cleanup can clear the timer if the operation finishes first.

### 20. Where should a manual timeout's timer be cleared?

**Answer:** In a `finally` block around the operation.

**Explanation:** `finally` runs on success and failure, preventing an unnecessary timeout callback after the work has settled.

## Custom operations and cleanup

### 21. What should a custom abortable function do if it receives an already-aborted signal?

**Answer:** Stop before starting work and reject with the signal's reason.

**Explanation:** Checking the current state handles cancellation that happened before the function began.

### 22. How can a custom async operation react to cancellation that happens later?

**Answer:** Listen for the signal's `abort` event.

**Explanation:** The listener can clear scheduled work, stop scheduling more steps, and reject with the signal's reason.

### 23. Why should a custom operation remove its abort listener after it settles?

**Answer:** To avoid retaining unnecessary listeners and references.

**Explanation:** Cleanup should happen on both successful completion and cancellation.

### 24. Does calling `abort()` forcibly interrupt JavaScript code that is currently running synchronously?

**Answer:** No.

**Explanation:** Cancellation is cooperative. Custom code must yield or check the signal before it can respond.

### 25. What should happen if a signal-aware API receives an abort while it is pending?

**Answer:** The API should stop its associated work when possible and reject the pending Promise with the abort reason.

**Explanation:** The signal is a request. The API must implement behavior that observes and responds to it.

### 26. Does passing a signal to an API that ignores signals stop that API's work?

**Answer:** No.

**Explanation:** Only operations that observe and honor the signal can respond to it.

### 27. Should cancellation be swallowed inside a low-level helper automatically?

**Answer:** No.

**Explanation:** Let the caller decide whether cancellation should become a value, be reported, or propagate to stop a larger workflow.

### 28. What does a `finally` block add to a manual timeout pattern?

**Answer:** It guarantees timer cleanup after the request succeeds or fails.

**Explanation:** Without cleanup, a timer may fire after the operation has already finished.

## Timeouts, races, and side effects

### 29. Does `Promise.race()` cancel the losing request when a timeout Promise wins?

**Answer:** No.

**Explanation:** `race()` settles only its returned Promise. To stop the request, abort its signal or use another cancellation mechanism it supports.

### 30. Does a timeout guarantee the server did not complete a write?

**Answer:** No.

**Explanation:** The server may have completed the work before the client timed out or received a response.

### 31. Does aborting a request undo a side effect that has already completed?

**Answer:** No.

**Explanation:** Cancellation cannot roll back completed server work. Writes may need transactions, idempotency, or a follow-up check.

### 32. What should you consider before retrying a request that timed out?

**Answer:** Whether repeating the operation is safe or uses an idempotency mechanism.

**Explanation:** The first attempt may have succeeded even though the client did not receive its response.

### 33. What do Promise combinators do to tasks that lose a race or remain after a rejection?

**Answer:** They do not cancel them automatically.

**Explanation:** `all()`, `any()`, and `race()` coordinate outcomes. Pass and abort a signal separately when related tasks should stop.

### 34. Why should a controller not be shared across unrelated groups of tasks?

**Answer:** Aborting it would notify every operation using its signal, including unrelated work.

**Explanation:** Cancellation scopes should match the operations that share one lifecycle.

### 35. What should a multi-step workflow do before starting its next request after a cancellation?

**Answer:** Check or throw the signal's abort reason before continuing.

**Explanation:** This prevents custom steps from scheduling unnecessary work after an earlier operation was canceled.

### 36. Which APIs can be combined with one signal to cancel together?

**Answer:** Related APIs that accept and honor that same signal.

**Explanation:** Passing the signal only communicates the request. Each operation still needs cancellation support.

## Applying cancellation policies

### 37. When is `AbortSignal.timeout()` a good fit?

**Answer:** When an operation should stop after a fixed duration and the target API accepts a signal.

**Explanation:** The API can observe the timeout signal and reject with its reason when the deadline is reached.

### 38. Why might a manual timeout be preferable to `AbortSignal.timeout()` in some code?

**Answer:** It provides a timer handle that can be cleared as soon as the operation settles.

**Explanation:** It can also be used as a compatibility fallback when targeting runtimes that do not support the static timeout method.

### 39. What should an application do with aborts after a user leaves a page?

**Answer:** Usually stop updating the abandoned view and avoid showing an ordinary failure message.

**Explanation:** The user intentionally made the result unnecessary, so the UI can treat cancellation as normal control flow.

### 40. What are the key requirements for a custom cancellable operation?

**Answer:** Check an already-aborted signal, observe later aborts, stop its own work, reject with the reason, and clean up listeners.

**Explanation:** Cancellation is cooperative, so the operation must implement each part of that lifecycle.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [96 - Asynchronous errors, concurrency, and coordination](../lessons/096-asynchronous-errors-concurrency-and-coordination.md) | [Open lesson](../lessons/097-cancellation-timeouts-and-abortcontroller.md) | [Open example](../examples/097-cancellation-timeouts-and-abortcontroller.md) | [98 - Browser globals, globalThis, window, and document](../lessons/098-browser-globals-globalthis-window-and-document.md) |