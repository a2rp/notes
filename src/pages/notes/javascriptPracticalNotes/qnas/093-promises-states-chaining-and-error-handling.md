# 93 - Promises, states, chaining, and error handling

This Q&A reviews [Lesson 93](../lessons/093-promises-states-chaining-and-error-handling.md). Every answer is followed by an explanation.

## Promise states and creation

### 1. What does a Promise represent?

**Answer:** The eventual fulfillment value or rejection reason of an operation.

**Explanation:** A function can return a Promise before its asynchronous operation has completed.

### 2. What are the three Promise states?

**Answer:** Pending, fulfilled, and rejected.

**Explanation:** Pending means the outcome is not settled. Fulfilled means success. Rejected means failure.

### 3. What does settled mean?

**Answer:** A Promise is either fulfilled or rejected.

**Explanation:** Pending Promises are not settled. Once settled, a Promise does not switch to the other state.

### 4. Is a resolved Promise always already fulfilled?

**Answer:** No.

**Explanation:** Resolving with another Promise or thenable locks the first Promise to follow it. The first Promise can remain pending until the other one settles.

### 5. When does the Promise constructor's executor run?

**Answer:** Immediately, while the Promise is being constructed.

**Explanation:** Any synchronous statement in the executor runs before the constructor returns. A timer or other asynchronous operation started by the executor can finish later.

### 6. What does resolve do when passed an ordinary value?

**Answer:** It fulfills the Promise with that value.

**Explanation:** A fulfillment handler later receives that value.

### 7. What does resolve do when passed another Promise?

**Answer:** It makes the new Promise follow the passed Promise's eventual outcome.

**Explanation:** The outer Promise does not fulfill with the inner Promise object. It adopts its fulfillment value or rejection reason.

### 8. What does reject do?

**Answer:** It rejects the Promise with the given reason.

**Explanation:** Passing an Error object is usually helpful because it includes a message and debugging information.

### 9. If an executor calls resolve and then reject, which outcome wins?

**Answer:** The first effective settlement wins.

**Explanation:** Once a Promise is settled or locked in by resolving, later attempts to change its outcome have no effect.

### 10. What happens if the executor throws before the Promise settles?

**Answer:** The Promise rejects with the thrown error.

**Explanation:** The constructor converts an uncaught executor exception into a rejection. If the Promise was already settled, a later throw cannot change that outcome.

## Chaining

### 11. What does then return?

**Answer:** A new Promise.

**Explanation:** The new Promise represents the outcome of the callback passed to then, not just the state of the original Promise.

### 12. If a fulfillment handler returns the value 12, what does the next handler receive?

**Answer:** The next handler receives 12.

**Explanation:** An ordinary returned value fulfills the new Promise with that value.

### 13. What does the next handler receive if a block-bodied then callback does not return anything?

**Answer:** undefined.

**Explanation:** A callback without an explicit return completes with the value undefined.

### 14. Why should a Promise started inside a then handler be returned?

**Answer:** So the chain waits for it and can observe its result or failure.

**Explanation:** Without the return, the next handler can run too early and the inner operation becomes a floating Promise.

### 15. What happens when a then handler returns another Promise?

**Answer:** The Promise returned by then follows the returned Promise's eventual outcome.

**Explanation:** The chain waits for its fulfillment value or propagates its rejection.

### 16. What happens to the new Promise if a fulfillment handler throws?

**Answer:** The new Promise rejects with the thrown error.

**Explanation:** A later catch in the chain can handle the exception as a rejection.

### 17. What happens if then is called on a rejected Promise without a rejection handler?

**Answer:** The returned Promise remains rejected with the same reason.

**Explanation:** A missing handler passes the current state through the new Promise.

### 18. Does the second callback passed to then catch errors thrown by the first callback in that same then call?

**Answer:** No.

**Explanation:** The second callback handles rejection of the Promise on which then was called. An error thrown by the fulfillment callback rejects the Promise returned by then and needs a later catch.

### 19. Why is a flat chain often easier to maintain than nested then calls?

**Answer:** It keeps each dependent step visible in order and makes the error path easier to follow.

**Explanation:** Returning each step's Promise lets the chain handle it without starting a disconnected inner chain.

### 20. What is a Promise-based sequence of dependent operations?

**Answer:** A chain where each handler returns the next step's result or Promise.

**Explanation:** The later step waits for the previous handler to complete and receives its fulfillment value.

## Error handling and cleanup

### 21. What is catch(onRejected) shorthand for?

**Answer:** then(undefined, onRejected).

**Explanation:** It attaches a rejection handler and returns a new Promise.

### 22. Can a catch handler recover a rejected chain?

**Answer:** Yes, by returning a meaningful fallback value or a fulfilled Promise.

**Explanation:** The Promise returned by catch becomes fulfilled, so following then handlers can run.

### 23. How can a catch handler report an error while preserving rejection?

**Answer:** Log or add context, then throw the error again.

**Explanation:** A thrown error rejects the Promise returned by catch, allowing a later boundary to handle it.

### 24. What happens when a catch handler returns a rejected Promise?

**Answer:** The Promise returned by catch remains rejected with that later reason.

**Explanation:** Chaining adopts the outcome of a returned Promise.

### 25. Does finally receive the fulfillment value or rejection reason?

**Answer:** No.

**Explanation:** finally is intended for cleanup that runs after either outcome, not for transforming the result.

### 26. If a finally callback completes normally, what usually happens to the original Promise outcome?

**Answer:** Its fulfillment value or rejection is preserved.

**Explanation:** Cleanup can run without replacing the result the caller was waiting for.

### 27. What if a finally callback throws an error?

**Answer:** The Promise returned by finally rejects with the cleanup error.

**Explanation:** A failure in cleanup replaces the previous outcome for the new Promise in the chain.

### 28. Which operation belongs in finally?

**Answer:** Cleanup that should happen after either success or failure, such as hiding a loading indicator.

**Explanation:** Use catch for reporting or recovery. Use finally for work that must run after settlement.

### 29. What is an unhandled rejection?

**Answer:** A rejected Promise without a rejection handler attached.

**Explanation:** The host reports unhandled rejections for debugging. Handle them at a boundary where the application can respond.

### 30. Should a global unhandled-rejection event replace normal catch handlers?

**Answer:** No.

**Explanation:** A global listener is useful for diagnostics or last-resort reporting. It usually cannot provide operation-specific recovery.

### 31. Does a Promise constructor automatically catch an error thrown later in a timer callback?

**Answer:** No.

**Explanation:** The executor's synchronous exceptions become rejections, but a callback that runs later is outside the executor. That callback must handle its errors and call reject when appropriate.

## Applying the concepts

### 32. How should code handle an HTTP 404 response from fetch?

**Answer:** Check response.ok and throw an Error when the application treats that status as failure.

**Explanation:** fetch can fulfill with a Response for an HTTP error status. The chain needs to convert that response into an application-level rejection if that is the desired behavior.

### 33. What will the next handler receive?

~~~js
Promise.resolve(4)
  .then((value) => value * 3)
  .then((value) => value + 1);
~~~

**Answer:** 13.

**Explanation:** The first handler returns 12. That value fulfills the next Promise and is passed to the following handler, which returns 13.

### 34. Where should a final catch be placed in a simple Promise chain?

**Answer:** After the steps whose failures it should report or handle.

**Explanation:** A rejection or thrown exception skips fulfillment handlers until a rejection handler is found.

### 35. What does Promise.resolve("ready") return?

**Answer:** A fulfilled Promise with the value "ready".

**Explanation:** A plain value is used as the fulfillment value. If the argument is a Promise or thenable, the returned Promise follows it instead.

### 36. What does Promise.reject(new Error("failed")) return?

**Answer:** A rejected Promise whose reason is that Error.

**Explanation:** A later catch handler receives the rejection reason.

### 37. Which statement best explains what a then handler can do?

A. It can return a value, return a Promise, or throw an error.
B. It can only log the current value.
C. It changes the state of the original Promise directly.
D. It blocks the JavaScript thread until the next operation finishes.

**Answer:** A.

**Explanation:** The handler's result determines the new Promise returned by then. The original Promise is not modified.

### 38. Why should code avoid creating a new Promise around an API that already returns one?

**Answer:** The extra wrapper is unnecessary and can complicate error propagation.

**Explanation:** Return the existing Promise directly unless there is a real callback-based API that needs adapting.

### 39. A catch returns an empty object as a fallback for a failed required database read. What is the main risk?

**Answer:** It can make a failed operation look successful and hide the failure from the caller.

**Explanation:** Recover only when the fallback is valid for the application's behavior. Otherwise rethrow or propagate the rejection.

### 40. A loading indicator must be hidden whether a request succeeds or fails. Which Promise method fits?

**Answer:** finally.

**Explanation:** finally runs after either fulfillment or rejection. If its cleanup succeeds, the next Promise preserves the original outcome.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [92 - Timers, animation frames, and scheduling](../lessons/092-timers-animation-frames-and-scheduling.md) | [Lesson](../lessons/093-promises-states-chaining-and-error-handling.md) / [Example](../examples/093-promises-states-chaining-and-error-handling.md) | [94 - Promise combinators and concurrent work](../lessons/094-promise-combinators-and-concurrent-work.md) |
