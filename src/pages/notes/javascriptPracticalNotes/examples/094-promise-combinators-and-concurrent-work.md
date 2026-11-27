# 94 - Promise combinators and concurrent work

This example uses small delayed tasks to demonstrate `Promise.all()`, `Promise.allSettled()`, `Promise.any()`, and `Promise.race()`. It also processes a larger list in batches so the example does not start every task at once.

It uses only built-in JavaScript features and runs with Node.js. The code displays expected output in the terminal. It does not create a browser page.

## Goal

By the end of this example, you can:

- Start independent work together and collect its results in input order.
- Inspect every fulfilled or rejected outcome.
- Select the first successful result with `Promise.any()`.
- Observe how the first settlement can make `Promise.race()` reject.
- Limit active work by awaiting fixed-size batches.

## Complete example

Save the code below as `promise-combinators.js`, or copy it into a JavaScript file in the repository and run it with Node.js.

```js
const wait = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

function makeTask(label, milliseconds, { fail = false } = {}) {
    return (async () => {
        await wait(milliseconds);

        if (fail) {
            throw new Error(`${label} failed`);
        }

        return label;
    })();
}

async function main() {
    // Promise.all returns results in input order, not completion order.
    const requiredValues = await Promise.all([
        makeTask("profile", 30),
        makeTask("settings", 10),
        makeTask("alerts", 20),
    ]);

    console.log(`Promise.all input order: ${requiredValues.join(", ")}`);

    // allSettled gives one status entry for every task.
    const uploadResults = await Promise.allSettled([
        makeTask("upload A", 10),
        makeTask("upload B", 5, { fail: true }),
        makeTask("upload C", 15),
    ]);

    const uploadSummary = uploadResults.map((result) => {
        if (result.status === "fulfilled") {
            return `fulfilled: ${result.value}`;
        }

        return `rejected: ${result.reason.message.replace(" failed", "")}`;
    });

    console.log(`Promise.allSettled: ${uploadSummary.join(" | ")}`);

    // any ignores early rejections while it waits for the first fulfillment.
    const firstWorkingSource = await Promise.any([
        makeTask("primary cache", 5, { fail: true }),
        makeTask("secondary cache", 15),
        makeTask("network", 25),
    ]);

    console.log(`Promise.any first success: ${firstWorkingSource}`);

    // If every input rejects, any reports their reasons in AggregateError.
    try {
        await Promise.any([
            makeTask("region A", 5, { fail: true }),
            makeTask("region B", 10, { fail: true }),
        ]);
    } catch (error) {
        if (error instanceof AggregateError) {
            console.log(`Promise.any all failed: ${error.errors.length} rejection reasons`);
        } else {
            throw error;
        }
    }

    // race reacts to the first settlement, including a rejection.
    try {
        await Promise.race([
            makeTask("fast rejection", 5, { fail: true }),
            makeTask("slower success", 20),
        ]);
    } catch (error) {
        console.log(`Promise.race first settlement: ${error.message}`);
    }

    // A race can also choose the first successful settlement.
    const fastestSuccess = await Promise.race([
        makeTask("local cache", 5),
        makeTask("remote server", 20),
    ]);

    console.log(`Promise.race first fulfillment: ${fastestSuccess}`);

    // Process a large list in groups of two instead of starting all work at once.
    const jobs = [
        { id: "A", milliseconds: 12 },
        { id: "B", milliseconds: 8 },
        { id: "C", milliseconds: 6 },
        { id: "D", milliseconds: 10 },
    ];

    let activeJobs = 0;
    let maximumActiveJobs = 0;

    async function processJob(job) {
        activeJobs += 1;
        maximumActiveJobs = Math.max(maximumActiveJobs, activeJobs);

        await wait(job.milliseconds);

        activeJobs -= 1;
        return job.id;
    }

    const processedIds = [];

    for (let start = 0; start < jobs.length; start += 2) {
        const batch = jobs.slice(start, start + 2);
        const batchResults = await Promise.all(batch.map(processJob));
        processedIds.push(...batchResults);
    }

    console.log(`Bounded batches in input order: ${processedIds.join(", ")}`);
    console.log(`Maximum active jobs per batch: ${maximumActiveJobs}`);

    const emptyValues = await Promise.all([]);
    console.log(`Promise.all empty input: ${emptyValues.length} results`);

    const emptyStatuses = await Promise.allSettled([]);
    console.log(`Promise.allSettled empty input: ${emptyStatuses.length} results`);

    try {
        await Promise.any([]);
    } catch (error) {
        console.log(`Promise.any empty input: ${error.name}`);
    }
}

main().catch((error) => {
    console.error("Example failed unexpectedly:", error);
    process.exitCode = 1;
});
```

## Expected terminal output

```text
Promise.all input order: profile, settings, alerts
Promise.allSettled: fulfilled: upload A | rejected: upload B | fulfilled: upload C
Promise.any first success: secondary cache
Promise.any all failed: 2 rejection reasons
Promise.race first settlement: fast rejection failed
Promise.race first fulfillment: local cache
Bounded batches in input order: A, B, C, D
Maximum active jobs per batch: 2
Promise.all empty input: 0 results
Promise.allSettled empty input: 0 results
Promise.any empty input: AggregateError
```

The delays make the examples easy to follow. The output does not print task completion events, so result arrays and summaries remain deterministic.

## How it works

### `Promise.all()` preserves input order

The settings task finishes before alerts and profile, but the returned array still maps to the original input order: profile, settings, then alerts. All three task calls happen before `Promise.all()` waits for the combined outcome.

### `Promise.allSettled()` records partial success

Upload B rejects, but the other uploads continue. The aggregate waits until all three tasks settle, then supplies a `status` record for each input. The code reads `value` only for fulfilled entries and `reason` only for rejected entries.

### `Promise.any()` waits for a success

The primary cache rejects first. That rejection does not end the aggregate because the secondary cache can still fulfill. When every source rejects, the catch checks for `AggregateError` and reports how many reasons it contains.

### `Promise.race()` responds to the first settlement

In the first race, the rejection from the fast task arrives before the successful result. The returned Promise therefore rejects. In the second race, the local cache fulfills first, so its value wins.

The losing tasks are not canceled by either combinator. Real work that should stop must support explicit cancellation.

### Batches limit active work

The loop passes at most two jobs to `Promise.all()` at a time. It awaits both before taking the next slice. The returned values remain in the batch's input order, so the combined IDs are A, B, C, D even though each pair can finish in the opposite order.

The maximum-active counter demonstrates that no batch has more than two active jobs. For a small fixed list this pattern is simple. Large or changing workloads are usually better served by a reusable worker pool.

## Try another case

1. Change the profile delay to `5` and the settings delay to `40`. The `Promise.all()` output order should remain the same.
2. Remove `{ fail: true }` from upload B. All three status entries should be fulfilled.
3. Make every source in the successful `Promise.any()` group reject. Inspect the individual messages in `error.errors`.
4. Make the slower successful race task finish before the rejecting task. The rejection still wins if it settles first.
5. Change the batch size from two to one. The maximum active count should become one, and each job will run sequentially.
6. Increase the batch size to the full jobs array. All four jobs can then be active at once.

## Key points

- `Promise.all()` waits for every required success and returns values in input order.
- `Promise.allSettled()` waits for all outcomes and records a status for each input.
- `Promise.any()` selects the first fulfillment and rejects with `AggregateError` if all inputs reject.
- `Promise.race()` selects the first settlement, including a rejection.
- A losing task is not canceled automatically by a combinator.
- Fixed-size batches can limit concurrency when processing a larger list.
- Empty input behavior differs: `all` and `allSettled` fulfill with empty arrays, `any` rejects, and `race` remains pending.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [93 - Promises, states, chaining, and error handling](../lessons/093-promises-states-chaining-and-error-handling.md) | [Open lesson](../lessons/094-promise-combinators-and-concurrent-work.md) | [Open Q&A](../qnas/094-promise-combinators-and-concurrent-work.md) | [95 - Async and await](../lessons/095-async-and-await.md) |