# 95 - Async and await

This Q&A reviews [Lesson 95](../lessons/095-async-and-await.md). Every answer is followed by an explanation.

## Async functions and return values

### 1. What does calling an `async` function return?

**Answer:** A Promise.

**Explanation:** The function's eventual return value or error is represented by that Promise.

### 2. What happens when an async function returns an ordinary value?

**Answer:** Its Promise fulfills with that value.

**Explanation:** `return 7` from an async function is observed by the caller as a Promise fulfilled with `7`.

### 3. What happens when an async function returns a Promise?

**Answer:** The async function's Promise follows the returned Promise's outcome.

**Explanation:** The caller can await the async function and receive the other Promise's fulfillment value or rejection reason.

### 4. What happens when code inside an async function throws?

**Answer:** The Promise returned by the function rejects with the thrown value.

**Explanation:** Callers should handle the failure with `await` inside `try`/`catch` or with a Promise rejection handler.

### 5. Does an async function begin executing only after its caller awaits it?

**Answer:** No. It begins executing when called.

**Explanation:** Its ordinary statements run synchronously until it reaches an `await`, returns, or throws.

### 6. What can run while an async function is suspended at `await`?

**Answer:** Its caller and other scheduled work can continue.

**Explanation:** `await` suspends that function's continuation. It does not block the caller until the operation completes.

### 7. Does `await` move a CPU-heavy calculation to another thread?

**Answer:** No.

**Explanation:** Synchronous JavaScript still runs on the current execution thread. `await` helps coordinate asynchronous work, not parallelize CPU-heavy code.

### 8. Does an async function necessarily return the exact Promise object that it returns from its body?

**Answer:** No.

**Explanation:** The async function's Promise adopts the returned Promise's outcome, but callers should not depend on object identity being the same.

## Awaiting values and errors

### 9. What value does `await` produce when its input Promise fulfills?

**Answer:** The Promise's fulfillment value.

**Explanation:** The async function resumes and evaluates the `await` expression to that value.

### 10. What happens when an awaited Promise rejects?

**Answer:** The `await` expression throws the rejection reason inside the async function.

**Explanation:** An ordinary `try`/`catch` around the `await` can handle that rejection.

### 11. What does awaiting an ordinary non-Promise value do?

**Answer:** It evaluates to that value after the async function suspends and resumes.

**Explanation:** Awaitable values are normalized for `await`. Awaiting a plain value is valid but usually unnecessary.

### 12. What kind of object can `await` handle besides native Promises?

**Answer:** A thenable, which is an object with a callable `then` method.

**Explanation:** Awaiting a thenable follows its eventual outcome, similarly to awaiting a Promise.

### 13. Where can rejection from `await loadData()` be handled?

**Answer:** In a surrounding `try`/`catch` block.

**Explanation:** The rejection is thrown at the await point, so JavaScript's normal exception handling applies.

### 14. What happens if a `catch` block handles an error and returns a fallback value?

**Answer:** The async function can fulfill with that fallback value.

**Explanation:** The original rejection is converted into a successful return. Only do this when the fallback is valid for the feature.

### 15. What should a function do if it logs an error but still needs its caller to know the operation failed?

**Answer:** Rethrow the error or return a rejected Promise.

**Explanation:** If the function only logs and then returns normally, its caller may treat the failed operation as successful.

### 16. What does a `finally` block do in an async function?

**Answer:** It runs whether the awaited work succeeds or fails.

**Explanation:** It is useful for cleanup such as clearing a loading indicator. A throw or control-flow return in `finally` can replace the earlier outcome.

## `return promise` and `return await`

### 17. In a simple async function with no local error handling, is `return fetchData()` sufficient?

**Answer:** Yes.

**Explanation:** The async function's Promise adopts the outcome of the Promise returned by `fetchData()`.

### 18. Why can `return fetchData()` inside a `try` skip that block's local `catch`?

**Answer:** The function returns before the Promise settles, so a later rejection is not thrown inside that `try` block.

**Explanation:** Without awaiting the Promise there, the local catch cannot handle its later rejection.

### 19. When is `return await fetchData()` useful inside a `try` block?

**Answer:** When a local `catch` or `finally` needs to observe the Promise's settlement before leaving the block.

**Explanation:** The `await` turns a rejection into a throw at that point and makes the function wait through the block's settlement path.

### 20. Should every Promise returned by an async function be written as `return await promise`?

**Answer:** No.

**Explanation:** Simple forwarding code can use `return promise`. Add `await` when local error handling or cleanup depends on settlement timing.

## Sequential and concurrent work

### 21. When should one async operation be awaited before starting another?

**Answer:** When the later operation depends on the earlier result or sequential execution is required.

**Explanation:** For example, load an article first if its author ID is needed to request the author.

### 22. How should two independent requests be started so their waits can overlap?

**Answer:** Call both requests first, then await their Promises together.

**Explanation:** `Promise.all()` commonly coordinates the requests and returns their values together.

### 23. What happens if independent requests are awaited one after another?

**Answer:** The later request does not start until the earlier one fulfills.

**Explanation:** That creates sequential waiting and can increase total elapsed time.

### 24. Does `await` work with a Promise returned by `array.map()`?

**Answer:** Yes, but the array itself is not a single Promise. Use a combinator such as `Promise.all()` to await all mapped Promises.

**Explanation:** `map()` returns an array of results from its callback. With an async callback, those results are Promises.

### 25. Why does `records.forEach(async callback)` not wait for the callback Promises?

**Answer:** `forEach()` ignores callback return values and returns before those Promises settle.

**Explanation:** Use `for...of` for sequential awaited work or `map()` with a Promise combinator for concurrent work.

### 26. Which loop is a straightforward choice for sequential async work?

**Answer:** `for...of` with `await` inside the loop.

**Explanation:** Each iteration waits for its operation before the next iteration begins.

### 27. Which pattern is suitable for independent async work on a small list?

**Answer:** Map each item to a Promise and pass the array to `Promise.all()`.

**Explanation:** This starts the tasks together and returns values in input order, while rejecting if an input fails.

### 28. Does `Promise.all(records.map(saveRecord))` limit concurrency?

**Answer:** No.

**Explanation:** Every `saveRecord` call is made while `map()` creates the array. Use fixed-size batches or a worker pool to limit active tasks.

### 29. What does `Promise.allSettled()` offer when some concurrent tasks may fail independently?

**Answer:** A result record for every task after all of them settle.

**Explanation:** This lets the application report or handle partial success instead of losing the group result at the first rejection.

### 30. Does a rejected await automatically cancel the underlying operation?

**Answer:** No.

**Explanation:** Promise rejection reports an outcome. The operation must support a separate cancellation mechanism if it should stop.

## Modules, callers, and common pitfalls

### 31. Where is top-level `await` allowed?

**Answer:** At the top level of a JavaScript module.

**Explanation:** Examples include a browser script marked as a module or a Node.js ES module.

### 32. How can top-level awaited work be written in a classic script or CommonJS file?

**Answer:** Put it inside an async function and call that function.

**Explanation:** Attach a rejection handler to the call so a failure from the async function is reported.

### 33. Does an event system always wait for the Promise returned by an async event handler?

**Answer:** No.

**Explanation:** A browser or other event system may ignore that Promise. Handle the rejection inside the handler or at the call boundary.

### 34. Why is wrapping an existing Promise-returning API in `new Promise()` usually unnecessary?

**Answer:** It duplicates Promise behavior without adding useful adaptation.

**Explanation:** Return the existing Promise directly unless you are converting a callback API or adding another explicit behavior.

### 35. What is a problem with an async Promise executor?

**Answer:** The Promise constructor does not wait for the Promise returned by its executor.

**Explanation:** An error that rejects the executor's Promise may not reject the outer Promise as intended. Do not mark a Promise constructor executor `async`.

### 36. What should happen to a Promise returned by an async function if its caller does not use `await`?

**Answer:** The caller should still attach a rejection handler if the operation can fail.

**Explanation:** Ignoring the Promise can leave a rejection unhandled and hide a failure from the feature's control flow.

### 37. Does `await Promise.resolve(value)` continue on the same synchronous line before the caller runs?

**Answer:** No. The async function's continuation resumes later.

**Explanation:** Even for an already fulfilled Promise, execution after the `await` is scheduled after the current synchronous work.

### 38. What does `main().catch(handleError)` do in a Node.js script?

**Answer:** It handles a rejection that escapes the `main` async function.

**Explanation:** This creates an explicit error boundary for the top-level workflow and can set a nonzero process exit code.

### 39. Which choice fits saving records one at a time in order?

**Answer:** A `for...of` loop that awaits each save.

**Explanation:** Sequential execution ensures the next save does not start until the current one finishes.

### 40. Which choice fits loading independent profile and notification data for one screen?

**Answer:** Start both requests, then await `Promise.all()`.

**Explanation:** Their waits can overlap, and the screen receives both required values together. If partial data is useful, select a different combinator and handle each outcome.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [94 - Promise combinators and concurrent work](../lessons/094-promise-combinators-and-concurrent-work.md) | [Open lesson](../lessons/095-async-and-await.md) | [Open example](../examples/095-async-and-await.md) | [96 - Asynchronous errors, concurrency, and coordination](../lessons/096-asynchronous-errors-concurrency-and-coordination.md) |