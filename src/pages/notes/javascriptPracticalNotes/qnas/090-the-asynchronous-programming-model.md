# 90 - The asynchronous programming model

This Q&A reviews [Lesson 90](../lessons/090-the-asynchronous-programming-model.md). Every answer is followed by an explanation.

## Foundations

### 1. What is a synchronous operation?

**Answer:** An operation that completes or throws before the next statement in the same call continues.

**Explanation:** The caller receives the result directly. It does not need to wait for a later completion signal.

### 2. What does asynchronous describe?

**Answer:** Work whose result is handled later, after the operation has been started.

**Explanation:** Asynchronous code lets a program continue while waiting for a result. It does not mean all JavaScript statements execute at the same time.

### 3. Does using a Promise make a CPU-heavy loop run in parallel?

**Answer:** No.

**Explanation:** A Promise represents an eventual result. A long synchronous loop still uses its JavaScript execution thread and can delay other work. Separate worker APIs are needed for parallel CPU work.

### 4. What is a callback?

**Answer:** A function passed to another function so it can be called for a later event or result.

**Explanation:** Callbacks are common in event APIs and older asynchronous interfaces. Promises provide a way to compose many asynchronous outcomes.

### 5. What does a Promise represent?

**Answer:** The eventual fulfillment value or rejection reason of an asynchronous operation.

**Explanation:** The Promise is a handle to a result that may not be available when the operation begins.

### 6. Name the three Promise states.

**Answer:** Pending, fulfilled, and rejected.

**Explanation:** A pending Promise has not settled. A fulfilled Promise completed successfully, while a rejected Promise failed.

### 7. What does settled mean for a Promise?

**Answer:** It is either fulfilled or rejected, rather than pending.

**Explanation:** Once a Promise settles, it does not switch between fulfillment and rejection.

### 8. What happens when a Promise executor is passed to the Promise constructor?

**Answer:** The executor function runs immediately.

**Explanation:** The Promise represents the eventual outcome, but its constructor executor is called synchronously during construction.

## Promise chains and errors

### 9. What does a then handler receive?

**Answer:** The fulfillment value of the Promise it handles.

**Explanation:** The handler can use that value, return another value, return a Promise, or throw an error.

### 10. What does then return?

**Answer:** A new Promise representing the handler's result or failure.

**Explanation:** Returning a value fulfills the next Promise with that value. Returning a Promise connects the chain to that Promise. Throwing rejects the next Promise.

### 11. What is catch used for?

**Answer:** Handling a rejection in a Promise chain.

**Explanation:** A catch handler can recover by returning a fallback value or preserve failure by throwing again.

### 12. Does catch have to be placed immediately after every asynchronous call?

**Answer:** No. It should be placed at a boundary that can handle or explain the failure.

**Explanation:** A chain can allow errors to propagate to a caller. Catch locally only when the code knows how to recover or add useful context.

### 13. What does finally do?

**Answer:** It runs cleanup logic whether a Promise fulfilled or rejected.

**Explanation:** It is useful for resetting state or releasing resources. Returning or throwing inside finally can override an earlier result, so avoid that unless intentional.

### 14. What should a Promise-based function return if it starts asynchronous work for a caller?

**Answer:** The Promise that represents that work.

**Explanation:** Returning it lets callers await completion, chain another step, and observe rejection.

### 15. What is wrong with this function?

~~~js
function saveRecord(record) {
  writeRecord(record).then(() => {
    console.log("Saved");
  });
}
~~~

**Answer:** It starts asynchronous work but returns undefined instead of the Promise.

**Explanation:** A caller cannot await saveRecord to know when the write finishes or whether it fails. Return the chain or make the function async.

### 16. What happens when an error is thrown inside a then handler?

**Answer:** The Promise returned by that then handler becomes rejected.

**Explanation:** This lets a later catch handle both the original rejection and errors thrown while processing a fulfillment value.

## async and await

### 17. What does every async function return?

**Answer:** A Promise.

**Explanation:** A returned normal value becomes the fulfillment value. A thrown error becomes a rejection.

### 18. What does await do with a fulfilled Promise?

**Answer:** It provides the fulfillment value to the surrounding async function.

**Explanation:** This lets code use the result in a readable sequence without manually writing a then callback.

### 19. What happens when await observes a rejected Promise?

**Answer:** It throws the rejection reason into the surrounding async function.

**Explanation:** A try and catch block around the await can handle the failure using familiar synchronous error syntax.

### 20. Does await inside one function freeze the entire JavaScript program?

**Answer:** No.

**Explanation:** Await pauses the remaining steps of that async function until its result is available. Other work can continue while it waits.

### 21. Where can await be used?

**Answer:** Inside an async function and at the top level of JavaScript modules.

**Explanation:** Top-level await is supported in modules. Keep the module context in mind when choosing how to structure a script.

### 22. What error handling pattern fits an async function whose failure should propagate with extra context?

**Answer:** Catch the error, wrap it with a useful message and cause, then throw the new error.

**Explanation:** Preserving the original error as its cause helps diagnostics while adding context for the caller.

## Sequential and concurrent operations

### 23. When should two asynchronous operations be awaited sequentially?

**Answer:** When the second operation needs a value produced by the first.

**Explanation:** For example, load a profile first if its account identifier is needed to load the account.

### 24. When is Promise.all useful?

**Answer:** When several independent Promises are all needed before the code can continue.

**Explanation:** Start them together and await Promise.all so the code does not wait for each operation one after another unnecessarily.

### 25. In what order does Promise.all return its result values?

**Answer:** In the same order as the input Promises.

**Explanation:** The results do not shift based on which operation happened to finish first.

### 26. What happens if one input Promise to Promise.all rejects?

**Answer:** The Promise returned by Promise.all rejects.

**Explanation:** Promise.all does not automatically cancel the other operations. They may continue even though the combined Promise has rejected.

### 27. What is Promise.allSettled useful for?

**Answer:** Waiting for every operation to settle and collecting each fulfillment or rejection outcome.

**Explanation:** Use it when the caller needs a result record for every operation even if some failed.

### 28. What does Promise.race settle with?

**Answer:** The outcome of the first input Promise to settle, whether fulfilled or rejected.

**Explanation:** Race is useful when the first completed outcome matters, but it does not cancel the other operations.

### 29. What does Promise.any wait for?

**Answer:** The first input Promise to fulfill.

**Explanation:** Rejections are ignored while another input may still fulfill. It rejects with an AggregateError if every input rejects.

### 30. Does Promise.race cancel slower operations?

**Answer:** No.

**Explanation:** It only settles the combined Promise based on the first result. The other operations can continue unless they support a separate cancellation mechanism.

### 31. How can an asynchronous operation be cancellable?

**Answer:** It must support an explicit cancellation mechanism, such as an AbortSignal accepted by the API.

**Explanation:** Promises do not provide universal cancellation. Calling Promise.race with a timeout does not by itself stop the underlying work.

## Apply the ideas

### 32. Two independent requests are needed for a screen. Which approach is usually better?

A. Await the first request, then start the second.
B. Start both and await Promise.all.
C. Start both and ignore their Promises.
D. Put both requests inside a synchronous loop.

**Answer:** B. Start both and await Promise.all.

**Explanation:** The requests are independent, and both results are needed. Running them together avoids unnecessary sequential waiting.

### 33. The second request needs an identifier returned by the first. Which approach is appropriate?

**Answer:** Await the first request, then use its result to start the second.

**Explanation:** The operations are dependent, so the required value does not exist until the first request fulfills.

### 34. A function returns a Promise but its caller uses await without try and catch. Where can a rejection be handled?

**Answer:** It can be handled by an enclosing try and catch or by a caller higher in the call chain.

**Explanation:** Rejections propagate through awaited async functions unless a handler converts them into another outcome.

### 35. Why should an error not be caught and ignored?

**Answer:** Ignoring it can make failed work appear successful and hide a problem from the caller.

**Explanation:** Recover with a meaningful fallback, report the failure at an appropriate boundary, or let it propagate.

### 36. What is the right use of a timeout around an asynchronous request?

**Answer:** It can define how long the caller is willing to wait, but cancellation must be implemented separately if the operation should stop.

**Explanation:** A timer does not prove the request finished and does not automatically cancel it.

### 37. An async function returns a string. What does the caller receive?

**Answer:** A Promise fulfilled with that string.

**Explanation:** Async functions always return a Promise, even when the function body returns an ordinary value.

### 38. An async function throws a RangeError. How does its caller observe the failure?

**Answer:** The Promise returned by the async function rejects with that error.

**Explanation:** The caller can use await inside try and catch, or attach a rejection handler to the Promise.

### 39. Several file reads are all required to build one result. Which combinator fits?

**Answer:** Promise.all.

**Explanation:** The combined result is usable only when every read succeeds, so all fulfillment values are needed together.

### 40. Several independent uploads should all finish, and the UI must report each success or failure. Which combinator fits?

**Answer:** Promise.allSettled.

**Explanation:** It waits for every upload to settle and returns a result for each one, so the UI can report mixed outcomes.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [89 - Formatting, linting, JSDoc, and editor tooling](../lessons/089-formatting-linting-jsdoc-and-editor-tooling.md) | [Lesson](../lessons/090-the-asynchronous-programming-model.md) / [Example](../examples/090-the-asynchronous-programming-model.md) | [91 - The event loop, task queues, and microtasks](../lessons/091-the-event-loop-task-queues-and-microtasks.md) |
