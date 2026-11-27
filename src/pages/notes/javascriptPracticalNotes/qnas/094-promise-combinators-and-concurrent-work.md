# 94 - Promise combinators and concurrent work

This Q&A reviews [Lesson 94](../lessons/094-promise-combinators-and-concurrent-work.md). Every answer is followed by an explanation.

## Choosing and starting concurrent work

### 1. What is a Promise combinator used for?

**Answer:** To coordinate the outcomes of multiple Promises.

**Explanation:** Methods such as `Promise.all()` and `Promise.any()` combine independent asynchronous operations under a shared result policy.

### 2. How can independent requests be started so their waiting time overlaps?

**Answer:** Call each request first, then await a combinator such as `Promise.all()`.

**Explanation:** If you await the first request before calling the second, the second does not start until the first finishes.

### 3. Does `Promise.all()` itself start functions passed to it?

**Answer:** No. It receives values, commonly Promises that were already created by calling functions.

**Explanation:** `Promise.all([loadA(), loadB()])` calls both functions while building the array. `Promise.all([loadA, loadB])` passes function objects instead.

### 4. Are concurrent JavaScript operations always executed in parallel?

**Answer:** No.

**Explanation:** Their asynchronous waits may overlap, but JavaScript callbacks follow the runtime's execution and scheduling rules. Concurrency does not guarantee simultaneous execution on multiple processors.

### 5. What does `Promise.all()` fulfill with when all inputs fulfill?

**Answer:** An array containing each fulfillment value.

**Explanation:** The returned Promise waits for every input to fulfill before providing the array.

### 6. In what order does the result array from `Promise.all()` place its values?

**Answer:** In the same order as the input iterable.

**Explanation:** Completion timing does not change the association between an input and its result position.

### 7. What happens to the Promise returned by `Promise.all()` if one input rejects?

**Answer:** It rejects with the rejection reason from an input that rejects.

**Explanation:** The combined Promise does not fulfill with a partial values array. Use `allSettled()` when every individual outcome is needed.

### 8. Does a rejection from `Promise.all()` cancel the other operations?

**Answer:** No.

**Explanation:** The combined Promise can reject before other operations finish, but already-started work continues unless it supports a separate cancellation mechanism.

### 9. What does `Promise.all([])` fulfill with?

**Answer:** An empty array.

**Explanation:** There are no input Promises that need to fulfill, so the aggregate Promise fulfills with `[]`.

### 10. Why is `Promise.all()` a good fit when loading an account and its permissions?

**Answer:** Both results are required before rendering the account view.

**Explanation:** If either required operation fails, the caller can handle the rejection at one boundary rather than render an incomplete view.

## Collecting every outcome

### 11. When is `Promise.allSettled()` useful?

**Answer:** When the application needs to inspect every success and failure in a group.

**Explanation:** It is suitable for independent batch work where partial success can still be reported or used.

### 12. Does an input rejection make the Promise returned by `Promise.allSettled()` reject?

**Answer:** No, not merely because an input Promise rejected.

**Explanation:** After all inputs settle, the aggregate fulfills with a result record for each input. Errors appear as `reason` values in rejected records.

### 13. What properties identify a fulfilled result from `Promise.allSettled()`?

**Answer:** `status` is `"fulfilled"` and the record has a `value` property.

**Explanation:** The value is the fulfillment value of that input.

### 14. What properties identify a rejected result from `Promise.allSettled()`?

**Answer:** `status` is `"rejected"` and the record has a `reason` property.

**Explanation:** The reason is the value or error that caused that input Promise to reject.

### 15. In what order are `Promise.allSettled()` result records returned?

**Answer:** In input order.

**Explanation:** A record's position identifies its corresponding input, even if that operation finished earlier or later than the others.

### 16. Does `Promise.allSettled()` retry failed operations?

**Answer:** No.

**Explanation:** It reports outcomes after all inputs settle. The application must decide whether and how a failed task should be retried.

### 17. Which combinator best fits a batch upload where each file's success or failure should be shown?

**Answer:** `Promise.allSettled()`.

**Explanation:** It waits for all uploads and returns a status record for every file instead of stopping the result at the first rejection.

### 18. What does `Promise.allSettled([])` fulfill with?

**Answer:** An empty array.

**Explanation:** The empty input has no outcomes to record.

## Selecting the first success

### 19. What does `Promise.any()` wait for?

**Answer:** The first input Promise to fulfill.

**Explanation:** A rejection alone does not settle the aggregate while another input may still fulfill.

### 20. One source rejects quickly, but another source fulfills later. What does `Promise.any()` do?

**Answer:** It fulfills with the later source's value.

**Explanation:** `any()` is based on the first fulfillment, not the first settlement.

### 21. What happens if every input to `Promise.any()` rejects?

**Answer:** The returned Promise rejects with an `AggregateError`.

**Explanation:** No source supplied a successful value, so the aggregate error represents the failed set of alternatives.

### 22. Where can the rejection reasons from a failed `Promise.any()` be found?

**Answer:** In the `errors` property of its `AggregateError`.

**Explanation:** The entries correspond to rejected inputs in input order, which can help report or diagnose each failed source.

### 23. What does `Promise.any([])` do?

**Answer:** It rejects with an `AggregateError`.

**Explanation:** An empty input cannot provide a fulfillment value, so there is no successful result to return.

### 24. Which combinator fits trying several replicas when any successful response is acceptable?

**Answer:** `Promise.any()`.

**Explanation:** It ignores early rejections while waiting for a successful fulfillment. If all replicas fail, handle the resulting `AggregateError`.

### 25. Does `Promise.any()` automatically cancel the slower operations after a winner fulfills?

**Answer:** No.

**Explanation:** The aggregate Promise settles, but other operations may continue. Use explicit cancellation if they support it and continuing them is unnecessary.

## Reacting to the first settlement

### 26. What does `Promise.race()` use to settle its returned Promise?

**Answer:** The first input to settle, whether it fulfills or rejects.

**Explanation:** A rejection can win the race just as a fulfillment can.

### 27. What happens if the fastest input to `Promise.race()` rejects and a slower input later fulfills?

**Answer:** The returned Promise rejects with the faster input's reason.

**Explanation:** `race()` observes the first settlement, not the first successful value.

### 28. What does `Promise.race([])` do?

**Answer:** It remains pending indefinitely.

**Explanation:** No input exists that could fulfill or reject the race.

### 29. Does a timeout implemented with `Promise.race()` stop the losing operation?

**Answer:** No.

**Explanation:** The race only settles its returned Promise. The underlying request or task needs its own cancellation support, such as an `AbortSignal`, to stop it.

### 30. What should a timeout implementation do with its timer if the operation wins first?

**Answer:** Clear the timer when it is no longer needed.

**Explanation:** Otherwise, the timer callback may still run later and waste resources or perform unwanted work.

### 31. How does `Promise.any()` differ from `Promise.race()`?

**Answer:** `any()` waits for the first fulfillment, while `race()` reacts to the first fulfillment or rejection.

**Explanation:** Choose based on whether an early failure should end the group or whether another source may still succeed.

## Inputs, limits, and practical decisions

### 32. Do Promise combinators accept only arrays?

**Answer:** No. They accept iterable inputs.

**Explanation:** Arrays are common, but other iterable values can also be used.

### 33. What happens when an ordinary value, such as a number, is passed to `Promise.all()`?

**Answer:** It is treated like an already fulfilled input, and the value appears in the result array.

**Explanation:** Combinators accept Promise-like inputs and ordinary values. A number does not need to be wrapped manually in `Promise.resolve()`.

### 34. Does `Promise.all(records.map(saveRecord))` limit the number of concurrent saves?

**Answer:** No.

**Explanation:** Mapping calls `saveRecord` for every record before `Promise.all()` waits for the results. Use batches or a worker pool when the work needs a concurrency limit.

### 35. How can fixed-size batches limit concurrent work?

**Answer:** Slice a small batch, await `Promise.all()` for that batch, then start the next batch.

**Explanation:** Only the current batch runs at once. The next batch begins after all members of the current one settle successfully.

### 36. When should independent operations be awaited one at a time?

**Answer:** When later work depends on the result of earlier work, or when sequential execution is a deliberate requirement.

**Explanation:** Concurrency is useful only when operations can safely run independently. Dependencies require an ordered flow.

### 37. If evaluating one function call throws before the array reaches `Promise.all()`, will `Promise.all()` catch that throw?

**Answer:** No, the throw occurs while JavaScript is constructing the arguments to the call.

**Explanation:** An `async` wrapper converts a synchronous throw inside that function into a rejected Promise, which the combinator can observe.

### 38. Why should result values stay associated with their input records?

**Answer:** So the application can tell which task each result belongs to.

**Explanation:** Combinator results use input order, not finish order. Keep matching metadata or return structured values with each task.

### 39. Which method should be used if every operation must succeed for the workflow to continue?

**Answer:** `Promise.all()`.

**Explanation:** Its single rejection path makes the requirement explicit. Handle the failure rather than silently treating an incomplete result as complete.

### 40. How should you choose among `all()`, `allSettled()`, `any()`, and `race()`?

**Answer:** Choose based on whether all successes, every outcome, one success, or the first settlement is required.

**Explanation:** The methods encode different policies. Also consider whether unfinished work should be canceled and whether concurrency must be limited separately.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [93 - Promises, states, chaining, and error handling](../lessons/093-promises-states-chaining-and-error-handling.md) | [Open lesson](../lessons/094-promise-combinators-and-concurrent-work.md) | [Open example](../examples/094-promise-combinators-and-concurrent-work.md) | [95 - Async and await](../lessons/095-async-and-await.md) |