# 96 - Asynchronous errors, concurrency, and coordination

This Q&A reviews [Lesson 96](../lessons/096-asynchronous-errors-concurrency-and-coordination.md). Every answer is followed by an explanation.

## Asynchronous error paths

### 1. What happens when a Promise rejected by `loadData()` is awaited inside a `try` block?

**Answer:** The `await` expression throws the rejection reason, so the local `catch` can handle it.

**Explanation:** Awaited Promise rejections enter normal exception control flow at the await point.

### 2. Where should an error usually be handled?

**Answer:** At a boundary that can make a useful recovery, reporting, or stop decision.

**Explanation:** A lower-level function may not know whether a caller should retry, show a message, or abandon the workflow.

### 3. Does a `try`/`catch` around an unawaited Promise catch its later rejection?

**Answer:** No.

**Explanation:** The try block only observes synchronous throws before the Promise is returned. Await the Promise or give it an explicit rejection handler.

### 4. Why can `return promise` inside a `try` skip the local catch?

**Answer:** The function returns before that Promise settles.

**Explanation:** To make a local catch handle its rejection, use `return await promise` inside the try block.

### 5. What should happen to an intentionally detached background Promise?

**Answer:** Attach an explicit rejection handler and report or recover from its failure.

**Explanation:** A Promise that is neither awaited, returned, nor handled can reject without an intentional feature-level error path.

### 6. What is a floating Promise?

**Answer:** A started Promise whose result or rejection is not connected to the surrounding workflow.

**Explanation:** The caller may proceed without waiting, and a later failure may become unhandled or invisible to the feature.

### 7. Can a global unhandled-rejection event decide how one feature should recover?

**Answer:** Usually not.

**Explanation:** A global event can help diagnose or log failures, but it often lacks the feature context needed to retry safely or show the right message.

### 8. What should a function do after logging an error that its caller still needs to handle?

**Answer:** Rethrow the error or return a rejected Promise.

**Explanation:** Logging and returning normally can make the caller believe a failed operation succeeded.

### 9. How can a new error add useful context while preserving the lower-level failure?

**Answer:** Create an `Error` with the original error as its `cause`.

**Explanation:** The outer message explains the operation that failed, while `cause` preserves the original diagnostic information.

### 10. When is returning a fallback value from `catch` appropriate?

**Answer:** When that fallback is a valid outcome for the feature and the failure is one the code can handle.

**Explanation:** Returning an empty object for every error can hide failures and make the caller proceed with invalid data.

### 11. What is `finally` commonly used for in async code?

**Answer:** Cleanup that should happen after either success or failure.

**Explanation:** Examples include clearing a loading flag or releasing a local resource.

### 12. How can a `finally` block hide the original error?

**Answer:** By throwing or returning a replacement outcome from `finally`.

**Explanation:** A new throw or control-flow return from `finally` can override the result or rejection from the `try` block.

### 13. Why should failures usually use an `Error` object?

**Answer:** It carries a message and stack information useful for diagnosis.

**Explanation:** Arbitrary strings or values can be rejected, but an Error provides a more useful standard failure shape.

## Coordinating failures and side effects

### 14. What does `Promise.all()` do when one input rejects?

**Answer:** The aggregate Promise rejects with a rejection reason.

**Explanation:** It does not provide a partial values array as its successful result.

### 15. Does rejecting `Promise.all()` cancel other operations already in progress?

**Answer:** No.

**Explanation:** The remaining operations continue unless they support an explicit cancellation mechanism and receive a cancellation signal.

### 16. Does a failed `Promise.all()` roll back side effects that already succeeded?

**Answer:** No.

**Explanation:** Promise combinators coordinate outcomes. They do not create a transaction or undo completed writes.

### 17. Which method should be used to inspect every success and failure in a group?

**Answer:** `Promise.allSettled()`.

**Explanation:** It waits for every input to settle and returns a status record for each one.

### 18. Does `Promise.allSettled()` automatically retry rejected tasks?

**Answer:** No.

**Explanation:** It records outcomes only. The caller decides whether and how to retry a failure.

### 19. Why might each task be wrapped in its own `try`/`catch` before using `Promise.all()`?

**Answer:** To convert each task into an explicit success or failure result and preserve every outcome.

**Explanation:** This can be useful when the rest of the workflow wants a typed result shape rather than one group rejection.

### 20. What property should be checked before retrying an operation that may have side effects?

**Answer:** Whether repeating it is safe, such as through idempotent behavior or an idempotency mechanism.

**Explanation:** A retry may duplicate a write or charge if the first attempt succeeded but its response was lost.

### 21. Why should a retry policy have a maximum attempt count?

**Answer:** To prevent repeated work from continuing indefinitely.

**Explanation:** An unbounded retry can consume resources, delay recovery, or repeat unsafe side effects.

### 22. Why might a production retry policy add randomness to its backoff delay?

**Answer:** To avoid many clients retrying at exactly the same time.

**Explanation:** Randomized delays can spread retries after a shared outage. They should still respect attempt and overall time limits.

### 23. What kinds of errors are usually better candidates for retry?

**Answer:** Temporary failures that may succeed later and are safe to repeat.

**Explanation:** Validation or permission errors are generally permanent until something changes, so blindly retrying them wastes work.

## Concurrency and coordination

### 24. Does `Promise.all(items.map(worker))` limit the number of active operations?

**Answer:** No.

**Explanation:** `map()` calls the worker for every item before `Promise.all()` awaits the results.

### 25. How does a worker pool limit concurrency?

**Answer:** It starts a fixed number of workers that claim work as they become available.

**Explanation:** The number of worker loops determines how many tasks can be active at once.

### 26. What happens to already active tasks when a worker-pool task fails in the lesson's example?

**Answer:** They are allowed to finish before the helper throws its first recorded error.

**Explanation:** The helper stops assigning new items but does not cancel work already in progress.

### 27. Why does the worker-pool example save each result by its original index?

**Answer:** So results remain in input order even when workers finish in another order.

**Explanation:** Completion order should not be used to associate results with their inputs unless that is an explicit requirement.

### 28. Why can two async functions still create a race over shared state in single-threaded JavaScript?

**Answer:** They can both read the same state, pause at `await`, and later write based on that stale value.

**Explanation:** Their synchronous sections do not execute simultaneously, but the workflow can interleave between the read and write.

### 29. What is a good way to protect a shared check-and-update operation?

**Answer:** Make it atomic with a transaction, lock, atomic server operation, or deliberate serialization.

**Explanation:** A local Promise combinator cannot make a multi-step remote update atomic.

### 30. When should tasks run sequentially instead of concurrently?

**Answer:** When later work depends on earlier results or order is a requirement.

**Explanation:** Concurrent execution is only appropriate for independent work that can safely overlap.

### 31. Is concurrency the same as parallel JavaScript execution?

**Answer:** No.

**Explanation:** Asynchronous operations can overlap in progress, while their JavaScript callbacks still follow the runtime's scheduling rules.

### 32. Should code rely on which concurrent task finishes first?

**Answer:** Only when first-completion behavior is an explicit requirement.

**Explanation:** Completion timing can vary. Use input order, sequential execution, or an explicit race policy when that better matches the feature.

### 33. What should every started Promise have?

**Answer:** An intentional path for its result and rejection.

**Explanation:** Await it, return it to a caller that handles it, or attach a catch handler for intentional background work.

### 34. Does `Promise.race()` cancellation stop the losing operation?

**Answer:** No.

**Explanation:** It settles the aggregate Promise only. The underlying operation needs explicit cancellation support if it should stop.

### 35. If a group of writes must either all take effect or none take effect, is `Promise.all()` enough?

**Answer:** No.

**Explanation:** Use a transaction or an application-level compensation strategy. `Promise.all()` does not roll back partial side effects.

### 36. Why might `Promise.allSettled()` be preferred over `Promise.all()` for independent uploads?

**Answer:** The interface may need to show which uploads succeeded and which failed.

**Explanation:** It returns one outcome per upload instead of ending the aggregate result at a failure.

## Applying the policies

### 37. Which is safer for a very large list of requests: starting every request at once or using a limit?

**Answer:** A concurrency limit is safer when the service or client cannot handle every request at once.

**Explanation:** Batches or a worker pool can reduce pressure on connections, memory, and the receiving service.

### 38. Why should a worker pool wait for active tasks before reporting failure?

**Answer:** So already-started work has a defined completion path and does not become detached.

**Explanation:** Waiting does not cancel those tasks, but it keeps their outcomes within the helper's control flow.

### 39. What should a browser event handler do if it starts an async operation that can reject?

**Answer:** Handle the rejection inside the handler or attach a rejection handler to the returned Promise.

**Explanation:** The event system does not generally choose a feature-specific recovery action based on the returned Promise.

### 40. What questions help choose an error and concurrency policy?

**Answer:** What can recover, which results are required, how many tasks may run, and what partial side effects or shared state are possible?

**Explanation:** These decisions determine where errors are handled, which combinator fits, whether concurrency should be bounded, and whether cancellation or atomic updates are needed.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [95 - Async and await](../lessons/095-async-and-await.md) | [Open lesson](../lessons/096-asynchronous-errors-concurrency-and-coordination.md) | [Open example](../examples/096-asynchronous-errors-concurrency-and-coordination.md) | [97 - Cancellation, timeouts, and AbortController](../lessons/097-cancellation-timeouts-and-abortcontroller.md) |