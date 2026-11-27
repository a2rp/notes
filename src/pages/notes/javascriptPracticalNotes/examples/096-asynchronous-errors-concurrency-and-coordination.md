# 96 - Asynchronous errors, concurrency, and coordination

This runnable example coordinates a group of asynchronous jobs. It shows how to inspect partial failures, preserve error context, retry a transient operation safely, limit concurrency, and protect shared state from overlapping updates.

It uses only built-in JavaScript features and runs with Node.js. The code prints its expected output in the terminal. It does not create a browser page.

## Goal

By the end of this example, you can:

- Catch failures from awaited operations and preserve their causes.
- Distinguish a group rejection from cancellation of its other tasks.
- Collect every result with `Promise.allSettled()`.
- Retry a known transient operation with a bounded policy.
- Limit active work and wait for already active workers after a failure.
- Recognize and prevent a shared-state race across `await` points.

## Complete example

Copy the code into a file named `async-coordination.js`, then run it with Node.js using `node async-coordination.js`.

```js
const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

async function runTask(label, milliseconds, { fail = false } = {}) {
    await delay(milliseconds);

    if (fail) {
        throw new Error(`${label} failed`);
    }

    return label;
}

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

async function readSource() {
    await delay(2);
    throw new Error("source unavailable");
}

async function loadReport() {
    try {
        return await readSource();
    } catch (cause) {
        throw new Error("Could not load report", { cause });
    }
}

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

            await delay(2 ** (attempt - 1));
        }
    }

    throw new Error("Unreachable retry state");
}

async function main() {
    // allSettled returns a result entry for every task.
    const importOutcomes = await Promise.allSettled([
        runTask("import A", 8),
        runTask("import B", 4, { fail: true }),
        runTask("import C", 6),
    ]);

    const importSummary = importOutcomes.map((outcome) => {
        if (outcome.status === "fulfilled") {
            return `fulfilled: ${outcome.value}`;
        }

        return `rejected: ${outcome.reason.message}`;
    });

    console.log(`Batch outcomes: ${importSummary.join(" | ")}`);

    // Promise.all rejects on one failure, but does not cancel its other input.
    const slowNotification = runTask("slow notification", 12);

    try {
        await Promise.all([
            runTask("profile write", 3, { fail: true }),
            slowNotification,
        ]);
    } catch (error) {
        console.log(`Required group failed: ${error.message}`);
    }

    console.log(`Already-started task finished: ${await slowNotification}`);

    // Add context without discarding the original failure.
    try {
        await loadReport();
    } catch (error) {
        console.log(`Context error: ${error.message}; cause: ${error.cause.message}`);
    }

    // Retry only a known transient error, and stop after a fixed number of tries.
    let attempts = 0;

    async function connectTemporarilyUnavailableService() {
        attempts += 1;
        await delay(2);

        if (attempts < 3) {
            const error = new Error("temporary service outage");
            error.retryable = true;
            throw error;
        }

        return "connected";
    }

    const connection = await retry(connectTemporarilyUnavailableService, 3);
    console.log(`Retry result: ${connection} after ${attempts} attempts`);

    // Run a larger list with at most two active tasks.
    const jobs = [
        { id: "A", milliseconds: 12 },
        { id: "B", milliseconds: 5 },
        { id: "C", milliseconds: 8 },
        { id: "D", milliseconds: 4 },
    ];

    let activeJobs = 0;
    let maximumActiveJobs = 0;

    const jobResults = await mapWithConcurrency(jobs, 2, async (job) => {
        activeJobs += 1;
        maximumActiveJobs = Math.max(maximumActiveJobs, activeJobs);

        try {
            await delay(job.milliseconds);
            return `job ${job.id}`;
        } finally {
            activeJobs -= 1;
        }
    });

    console.log(`Bounded results: ${jobResults.join(", ")}`);
    console.log(`Maximum active jobs: ${maximumActiveJobs}`);

    // If one pool task fails, already active work finishes before the error returns.
    const failingJobs = [
        { id: "A", milliseconds: 10 },
        { id: "B", milliseconds: 4, fail: true },
        { id: "C", milliseconds: 2 },
        { id: "D", milliseconds: 2 },
    ];

    const startedJobs = [];
    let activeFailingJobs = 0;

    try {
        await mapWithConcurrency(failingJobs, 2, async (job) => {
            startedJobs.push(job.id);
            activeFailingJobs += 1;

            try {
                await delay(job.milliseconds);

                if (job.fail) {
                    throw new Error(`job ${job.id} failed`);
                }

                return job.id;
            } finally {
                activeFailingJobs -= 1;
            }
        });
    } catch (error) {
        console.log(`Worker pool error: ${error.message}`);
        console.log(`Jobs started before failure stopped new work: ${startedJobs.join(", ")}`);
        console.log(`Active jobs after pool settled: ${activeFailingJobs}`);
    }

    // This example is intentionally unsafe: both calls read one seat before awaiting.
    let availableSeats = 1;

    async function reserveUnsafely(customer) {
        const snapshot = availableSeats;
        await delay(5);

        if (snapshot > 0) {
            availableSeats = snapshot - 1;
            return `${customer}: reserved`;
        }

        return `${customer}: unavailable`;
    }

    const unsafeReservations = await Promise.all([
        reserveUnsafely("customer A"),
        reserveUnsafely("customer B"),
    ]);

    console.log(
        `Unsafe shared-state results: ${unsafeReservations.join(" | ")}; seats left: ${availableSeats}`,
    );

    // Serialize the check and update so each reservation sees the latest value.
    let safelyAvailableSeats = 1;
    let reservationQueue = Promise.resolve();

    function reserveSafely(customer) {
        const result = reservationQueue.then(async () => {
            await delay(5);

            if (safelyAvailableSeats === 0) {
                return `${customer}: unavailable`;
            }

            safelyAvailableSeats -= 1;
            return `${customer}: reserved`;
        });

        reservationQueue = result.catch(() => {});
        return result;
    }

    const safeReservations = await Promise.all([
        reserveSafely("customer C"),
        reserveSafely("customer D"),
    ]);

    console.log(
        `Serialized shared-state results: ${safeReservations.join(" | ")}; seats left: ${safelyAvailableSeats}`,
    );
}

main().catch((error) => {
    console.error("Unexpected failure:", error);
    process.exitCode = 1;
});
```

## Expected terminal output

```text
Batch outcomes: fulfilled: import A | rejected: import B failed | fulfilled: import C
Required group failed: profile write failed
Already-started task finished: slow notification
Context error: Could not load report; cause: source unavailable
Retry result: connected after 3 attempts
Bounded results: job A, job B, job C, job D
Maximum active jobs: 2
Worker pool error: job B failed
Jobs started before failure stopped new work: A, B
Active jobs after pool settled: 0
Unsafe shared-state results: customer A: reserved | customer B: reserved; seats left: 0
Serialized shared-state results: customer C: reserved | customer D: unavailable; seats left: 0
```

## How it works

### Collecting partial outcomes

The import group uses `Promise.allSettled()`. Import B fails, but the aggregate waits for all three tasks and returns one record for each input. The summary reads each record's status and uses its value or rejection reason accordingly.

### A failed group does not stop a sibling task

The profile write rejects first, so `Promise.all()` rejects and the catch logs the group failure. The notification task keeps running. Awaiting it afterward makes its completion visible and keeps it part of the example's workflow.

### Adding error context and retrying carefully

`loadReport()` catches the lower-level error and throws a new error whose `cause` preserves the original. The log can show the higher-level operation and the underlying failure.

The retry sample fails twice with an explicitly marked transient error and succeeds on the third attempt. The retry count is bounded. A real retry should only repeat operations that are safe to repeat, and a production policy should use a suitable delay and overall deadline.

### Bounded workers retain input order

The pool starts at most two workers. Each worker claims an index before awaiting, then writes its result into that same index. Jobs can finish in another order, while the returned list remains A, B, C, D.

When job B fails, the pool stops assigning new jobs. Job A was already active, so it is allowed to finish. The helper waits for both workers before throwing. It does not cancel active work.

### State can become stale across an `await`

Both unsafe reservation calls read the one-seat snapshot before either delay ends. Each later writes `snapshot - 1` and reports success, so both customers appear to reserve the same seat.

The safe version chains each check and update on a Promise queue. Each operation sees the current seat count. In a real multi-user system, a server-side transaction or atomic database operation is usually the right protection. A local JavaScript queue only coordinates calls that share that same queue.

## Try another case

1. Make import B succeed. All three entries in the batch summary should be fulfilled.
2. Change the profile write to finish after the notification. The aggregate still rejects when the profile write fails, and the notification still completes.
3. Change the retry operation to fail permanently or mark the error as non-retryable. It should stop immediately or at the configured maximum.
4. Set the worker-pool limit to one. Jobs should run sequentially and the maximum active count should be one.
5. Make job A fail before job B finishes. The pool should wait for B if it was already active, and it should not start C or D.
6. Start three unsafe reservations while only one seat is available. Compare the incorrect results with the serialized version.
7. Replace the local reservation queue with an atomic operation in the system that owns shared data. A local queue cannot coordinate separate browser tabs or servers.

## Key points

- Await rejections at an error boundary that can make a useful decision.
- Keep started Promises connected to the workflow or attach an intentional rejection handler.
- `Promise.all()` rejects on a member failure but does not cancel other work.
- `Promise.allSettled()` records every success and failure.
- Retry only safe transient failures, and cap the number of attempts.
- A worker pool can bound concurrency and keep results associated with input order.
- Already active work needs a deliberate completion or cancellation policy after another task fails.
- Async operations can observe stale shared state across `await` points.
- Use a transaction, atomic operation, or appropriate serialization to protect shared updates.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [95 - Async and await](../lessons/095-async-and-await.md) | [Open lesson](../lessons/096-asynchronous-errors-concurrency-and-coordination.md) | [Open Q&A](../qnas/096-asynchronous-errors-concurrency-and-coordination.md) | [97 - Cancellation, timeouts, and AbortController](../lessons/097-cancellation-timeouts-and-abortcontroller.md) |