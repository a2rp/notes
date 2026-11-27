# 90 - The asynchronous programming model

Many JavaScript operations depend on work that finishes later: reading a file, requesting data, waiting for a user action, or saving a record. The asynchronous programming model lets code start that work and handle its result without making the rest of the application wait synchronously for it.

This chapter focuses on how asynchronous results are represented and composed. The next chapter covers the event loop, task queues, and microtasks in more detail.

## Learning goals

After this chapter, you should be able to:

- Explain the difference between synchronous and asynchronous operations.
- Describe the purpose and states of a Promise.
- Handle fulfilled and rejected Promises with then, catch, and finally.
- Use async and await to write readable Promise-based code.
- Propagate and handle errors across asynchronous function calls.
- Decide when to await operations sequentially or start them concurrently.
- Choose a Promise composition method for a group of operations.

## Synchronous and asynchronous work

A synchronous operation finishes before the next statement in the same call runs. A function returns a value or throws an error directly.

~~~js
function double(value) {
  return value * 2;
}

const result = double(4);
console.log(result);
~~~

An asynchronous operation starts work whose result is available later. The calling code needs a way to describe what should happen when that result arrives. JavaScript commonly uses callbacks, Promises, and async functions for this.

The word **asynchronous** describes when a result becomes available and how the program continues. It does not mean that every JavaScript statement runs at the same time. A long CPU-bound loop still occupies its JavaScript execution thread and can delay other work. Some environments can perform I/O or other operations outside the JavaScript call stack, and separate worker APIs can run CPU work elsewhere.

## Callbacks as an asynchronous interface

A callback is a function passed to another function to be called later:

~~~js
readFile("notes.txt", (error, contents) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(contents);
});
~~~

Callbacks are useful and remain common in event APIs. Asynchronous APIs often pass an error as one callback argument and a result as another.

When several dependent operations are nested, callback code can become difficult to follow. Each step may need its own error check and its own callback. Promises provide a composable representation of a future success or failure.

## Promises

A **Promise** represents the eventual result of an asynchronous operation. It has three states:

- **Pending:** the operation has not settled yet.
- **Fulfilled:** it completed successfully with a value.
- **Rejected:** it failed with a reason, commonly an Error object.

A settled Promise is either fulfilled or rejected. It does not change from one settled state to the other.

A Promise lets a caller attach handlers for those outcomes:

~~~js
loadProfile("user-42")
  .then((profile) => {
    console.log(profile.name);
  })
  .catch((error) => {
    console.error("Could not load profile:", error.message);
  });
~~~

The value returned from **then** creates another Promise. That means later operations can be chained:

~~~js
loadProfile("user-42")
  .then((profile) => profile.accountId)
  .then((accountId) => loadAccount(accountId))
  .then((account) => account.status)
  .then((status) => console.log(status))
  .catch((error) => {
    console.error("The profile or account could not be loaded:", error);
  });
~~~

Returning a Promise from a handler connects the next step to that Promise's result. Throwing inside a handler turns the new Promise into a rejection. A catch handler can recover by returning a value, or it can preserve failure by throwing again.

The executor passed to the Promise constructor runs immediately when the constructor is called. The Promise represents the result that may be settled later:

~~~js
const request = new Promise((resolve, reject) => {
  startRequest((error, value) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(value);
  });
});
~~~

Use the Promise constructor when adapting a callback API or creating a Promise-based operation. Do not wrap an API that already returns a Promise unless the wrapper adds necessary behavior.

## async and await

An **async function** always returns a Promise. A normal returned value becomes the fulfillment value. A thrown error becomes a rejection.

~~~js
async function getGreeting() {
  return "Hello";
}

getGreeting().then((greeting) => console.log(greeting));
~~~

The **await** expression obtains the fulfillment value of a Promise. If the Promise rejects, await throws the rejection reason into the surrounding async function. This lets familiar try and catch blocks handle asynchronous failures.

~~~js
async function showProfile(userId) {
  try {
    const profile = await loadProfile(userId);
    console.log(profile.name);
  } catch (error) {
    console.error("Could not load profile:", error.message);
  }
}
~~~

Await can be used inside an async function. Top-level await is also available in JavaScript modules. Choose the style that makes the sequence and error handling easiest to understand.

### Await changes the local sequence, not the whole program

While an async function is waiting for an awaited Promise, other asynchronous work can continue. The await expression pauses that function's remaining statements until its result is available. It does not freeze the entire program.

This is one reason async and await can look sequential while still allowing other work to proceed. Scheduling details are covered in the next chapter.

## Handle errors deliberately

A rejected Promise needs a handler. With a Promise chain, attach catch at a boundary that can make a useful decision. With async and await, use try and catch around operations whose failures you can handle.

~~~js
async function loadDashboard(userId) {
  try {
    const profile = await loadProfile(userId);
    return await loadAccountSummary(profile.accountId);
  } catch (error) {
    throw new Error("The dashboard could not be loaded", { cause: error });
  }
}
~~~

This function adds context and preserves the original error as its cause. If the caller can recover, it can catch this error. If it cannot recover, allow the rejection to propagate to an appropriate caller instead of silently ignoring it.

A catch handler that only logs and continues may turn a failed operation into an apparently successful result. Decide whether the code should recover, return a fallback, or let the error reach a higher boundary.

Use **finally** for cleanup that must happen whether the operation fulfills or rejects:

~~~js
let loading = true;

try {
  await loadDashboard("user-42");
} finally {
  loading = false;
}
~~~

Finally is useful for releasing resources or resetting state. A return or throw inside a finally block can override an earlier return or error, so avoid control flow there unless that override is intentional.

## Sequential and concurrent operations

Use sequential awaits when a later operation needs an earlier result:

~~~js
const profile = await loadProfile(userId);
const account = await loadAccount(profile.accountId);
~~~

The account request depends on the profile's account identifier.

If operations are independent, starting and awaiting them one at a time can add unnecessary latency:

~~~js
const profile = await loadProfile(userId);
const alerts = await loadAlerts(userId);
~~~

The second request does not use the first result. Start both and wait for both with **Promise.all**:

~~~js
const [profile, alerts] = await Promise.all([
  loadProfile(userId),
  loadAlerts(userId)
]);
~~~

Promise.all fulfills with results in input order when all supplied Promises fulfill. It rejects when one rejects. It does not automatically cancel the other operations, which may still be running.

Choose the Promise combinator based on the desired outcome:

| Method | Fulfills when | Rejects when | Useful for |
| --- | --- | --- | --- |
| Promise.all | Every input fulfills | An input rejects | All results are required |
| Promise.allSettled | Every input settles | It does not reject because an input failed | Every outcome should be collected |
| Promise.race | The first input settles | The first settled input rejects | The first completed outcome matters |
| Promise.any | The first input fulfills | Every input rejects | Any successful result is sufficient |

These methods do not automatically stop unfinished operations. If cancellation matters, use an API that supports a cancellation signal or design a cancellation mechanism explicitly.

## Avoid common mistakes

### Forgetting to return a Promise

If a function starts asynchronous work but returns nothing, callers cannot wait for that work through the function's return value.

~~~js
function saveAndReport(record) {
  saveRecord(record).then(() => {
    console.log("Saved");
  });
}
~~~

A caller that awaits **saveAndReport** would not wait for the save. Return the Promise:

~~~js
function saveAndReport(record) {
  return saveRecord(record).then(() => {
    console.log("Saved");
  });
}
~~~

Or make the function async and await the operation inside it.

### Starting dependent work too early

Do not start a second operation before the first has produced a value that the second needs. Await the first result, then start the dependent operation.

### Awaiting independent work one at a time

If independent operations can run concurrently, start them before awaiting their combined result. Use Promise.all when all results are necessary.

### Swallowing failures

Do not leave a rejection unhandled or catch it without deciding what the caller should observe. Return a fallback only when it is meaningful, or rethrow an error with useful context.

### Confusing a timer with the operation's completion

A timeout threshold does not prove that a network or file operation completed. Wait for the Promise that represents that operation rather than guessing a delay.

## A practical workflow

1. Identify which operation produces a result later.
2. Prefer a Promise-based API when one is available.
3. Return the Promise from any function that delegates asynchronous work.
4. Use async and await or a Promise chain consistently.
5. Await dependent operations in order.
6. Run independent operations concurrently when appropriate.
7. Handle expected errors at a boundary that can recover or explain them.
8. Use finally for cleanup that must always happen.
9. Continue to the next chapter for scheduling and queue-order details.

## Key points

- A Promise represents an eventual fulfillment value or rejection reason.
- An async function always returns a Promise.
- Await unwraps a fulfillment value or throws a rejection into the async function.
- Return Promises so callers can compose and handle asynchronous work.
- Await dependent work sequentially and combine independent work with the appropriate Promise method.
- Promise.all rejects when one input rejects but does not cancel the remaining operations.
- Handle errors at a meaningful boundary and use finally for cleanup.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [89 - Formatting, linting, JSDoc, and editor tooling](089-formatting-linting-jsdoc-and-editor-tooling.md) | [Open Q&A](../qnas/090-the-asynchronous-programming-model.md) | [Open example](../examples/090-the-asynchronous-programming-model.md) | [91 - The event loop, task queues, and microtasks](091-the-event-loop-task-queues-and-microtasks.md) |
