# 93 - Promises, states, chaining, and error handling

A Promise represents the eventual result of an operation that may finish later. It gives code a standard way to provide a value or report a failure after the current function has returned.

This chapter explains Promise states, how handlers create chains, and how to handle failures without losing them. The next chapter covers Promise combinators for coordinating multiple operations.

## Learning goals

After this chapter, you should be able to:

- Describe pending, fulfilled, rejected, and settled Promise states.
- Distinguish a Promise being resolved from it being fulfilled.
- Attach fulfillment and rejection handlers with then and catch.
- Explain why every then call creates a new Promise.
- Return values and Promises correctly so a chain waits for each step.
- Recover from an error or rethrow it so a later handler can report it.
- Use finally for cleanup without changing a successful result or failure.
- Create a Promise to adapt a callback API and avoid wrapping APIs that already return Promises.
- Recognize unhandled rejections and choose an appropriate error boundary.

## What a Promise represents

A Promise is an object representing a result that is not necessarily available yet. An operation can return a Promise immediately, then fulfill or reject it later.

~~~js
const resultPromise = readConfiguration();

console.log(resultPromise);
~~~

The variable holds a Promise, not the final configuration value. Code that needs the value attaches a handler or uses await, which is covered in a later chapter.

A Promise represents the outcome of an asynchronous operation. It does not itself make synchronous work run in the background, and it does not provide automatic cancellation.

## Promise states

A Promise has one of three states:

| State | Meaning |
| --- | --- |
| pending | The result is not available yet |
| fulfilled | The operation completed successfully with a value |
| rejected | The operation failed with a reason |

A Promise starts pending. It can settle once, either by becoming fulfilled or rejected. A settled Promise never changes to the other state.

**Settled** means fulfilled or rejected.

### Resolved and fulfilled are different ideas

In everyday code, people sometimes use resolved to mean fulfilled. More precisely, a Promise can be resolved to follow the outcome of another Promise or thenable and still remain pending while that work continues.

~~~js
const outer = new Promise((resolve) => {
  resolve(
    new Promise((innerResolve) => {
      setTimeout(() => innerResolve("ready"), 100)
    })
  );
});
~~~

Calling resolve locks the outer Promise to follow the inner Promise. The outer Promise is not fulfilled with the inner Promise object. It adopts the inner Promise's eventual outcome and fulfills with "ready" after the inner Promise fulfills.

For ordinary application code, the important rule is that resolving with another Promise or thenable makes the outer Promise follow its eventual state.

## Creating and consuming Promises

### Construct a Promise when adapting callback work

The Promise constructor receives an executor function. The executor runs immediately, when new Promise is evaluated. The operation inside it may complete later and call resolve or reject:

~~~js
function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Finished waiting");
    }, milliseconds);
  });
}

console.log("Before waiting");

wait(100).then((message) => {
  console.log(message);
});

console.log("After starting the wait");
~~~

The first and last log statements run synchronously. The timer later calls resolve, and the registered then handler runs after the Promise fulfills.

Use the constructor mainly to adapt a callback-based API or create a Promise for an operation that does not already return one. If an API already returns a Promise, return or use that Promise directly.

### Resolve, reject, and executor errors

The executor receives resolve and reject functions:

~~~js
const operation = new Promise((resolve, reject) => {
  const succeeded = true;

  if (succeeded) {
    resolve({ id: 7 });
  } else {
    reject(new Error("The operation could not finish"));
  }
});
~~~

Resolve fulfills the Promise with a value, or makes it follow a Promise or thenable. Reject rejects it with a reason. An Error object is usually the most useful rejection reason because it carries a message and debugging information.

Only the first effective settlement wins. Calling resolve or reject again after the Promise is already settled or locked in does not change its outcome. If the executor throws before settling the Promise, the constructed Promise rejects with that thrown error.

A Promise constructor does not automatically catch errors thrown later by a callback that runs outside the executor. That callback must explicitly call reject or handle its own failure.

### Promise.resolve and Promise.reject

Promise.resolve(value) returns a Promise fulfilled with an ordinary value, or a Promise that follows a passed Promise or thenable. Promise.reject(reason) returns a rejected Promise.

These methods are useful for normalizing a value into a Promise-based path:

~~~js
function getOptionalProfile(profile) {
  if (profile) {
    return Promise.resolve(profile);
  }

  return Promise.reject(new Error("A profile is required"));
}
~~~

### Handlers run asynchronously

Attach a fulfillment handler with then:

~~~js
Promise.resolve("profile")
  .then((value) => {
    console.log("Received: " + value);
  });

console.log("This synchronous statement runs first");
~~~

Even if a Promise is already fulfilled, its then handler runs later as a microtask. The current synchronous code finishes first.

The callback passed to then receives the fulfillment value. A second callback can handle rejection:

~~~js
operation.then(
  (value) => {
    console.log("Success:", value);
  },
  (error) => {
    console.error("Failure:", error);
  }
);
~~~

For a longer sequence of steps, a separate rejection callback at each step is usually repetitive. A catch at the end of a chain can handle an error from any earlier step that has not already been handled.

## Promise chains

### then returns a new Promise

Calling then does not modify the original Promise. It returns a new Promise that represents the result of running the handler:

~~~js
const original = Promise.resolve(5);

const doubled = original.then((value) => {
  return value * 2;
});

doubled.then((value) => {
  console.log(value);
});
~~~

The value returned by one handler becomes the fulfillment value passed to the next handler.

A Promise chain expresses a sequence of dependent steps. Each step starts after the previous step fulfills:

~~~js
getOrder()
  .then((order) => validateOrder(order))
  .then((validOrder) => calculateTotal(validOrder))
  .then((total) => saveReceipt(total))
  .then((receipt) => {
    console.log("Saved receipt:", receipt.id);
  })
  .catch((error) => {
    console.error("Could not complete the order:", error.message);
  });
~~~

This is a sequence. The next step waits for the previous handler's result. Coordinating multiple independent Promises is a separate topic in the next chapter.

### Return every Promise from a handler

If a handler starts a Promise, return it so the chain waits for its result:

~~~js
getProfileUrl()
  .then((url) => {
    return fetch(url);
  })
  .then((response) => {
    return response.json();
  })
  .then((profile) => {
    console.log(profile.name);
  })
  .catch((error) => {
    console.error("Could not load the profile:", error);
  });
~~~

If the callback uses a block body and forgets return, the next handler receives undefined and the chain no longer tracks the Promise that was started:

~~~js
getProfileUrl()
  .then((url) => {
    fetch(url);
  })
  .then((response) => {
    console.log(response);
  });
~~~

The second handler does not wait for fetch. This untracked asynchronous operation is often called a floating Promise. Return the Promise or use an expression body that returns it.

~~~js
getProfileUrl()
  .then((url) => fetch(url))
  .then((response) => response.json())
  .then((profile) => console.log(profile.name));
~~~

A handler that does not explicitly return a value fulfills the next Promise with undefined.

### A handler can return an ordinary value, a Promise, or throw

The new Promise returned by then follows the handler's outcome:

| Handler outcome | New Promise outcome |
| --- | --- |
| Returns an ordinary value | Fulfilled with that value |
| Returns a Promise or thenable | Follows its eventual outcome |
| Throws an error | Rejected with that error |
| Rejection handler returns a value | Fulfilled with that recovery value |
| No handler for the current state | Passes that state through |

This behavior is what allows a chain to flatten nested asynchronous operations. Return the Promise from the current step rather than nesting a separate chain that the outer chain cannot observe.

## Handling errors

### catch handles a rejection and returns a new Promise

catch(onRejected) is shorthand for then(undefined, onRejected). It returns a new Promise:

~~~js
loadSettings()
  .then((settings) => applySettings(settings))
  .catch((error) => {
    console.error("Settings could not be loaded:", error.message);
  });
~~~

A rejection or a thrown exception from an earlier handler skips fulfillment handlers until a rejection handler is found. The catch can handle errors from the original operation and from earlier callbacks in the chain.

### Recover only when a fallback is valid

If a catch returns a value, it recovers the chain. The next fulfillment handler receives that value:

~~~js
loadPreferences()
  .catch((error) => {
    console.warn("Using default preferences:", error.message);
    return { theme: "light" };
  })
  .then((preferences) => {
    applyPreferences(preferences);
  });
~~~

Here the fallback is a meaningful substitute. Do not return a fake success value merely to silence an error. If the caller still needs to observe failure, rethrow the error:

~~~js
loadPreferences()
  .catch((error) => {
    logFailure(error);
    throw error;
  })
  .then((preferences) => {
    applyPreferences(preferences);
  })
  .catch((error) => {
    showFailureMessage(error);
  });
~~~

A catch handler can itself throw or return a rejected Promise. In either case, the Promise returned by catch is rejected and a later catch can handle that failure.

### Check HTTP responses when using fetch

fetch usually fulfills its Promise when an HTTP response arrives, including for status codes such as 404 or 500. Check response.ok and throw an Error if the application treats that response as a failure:

~~~js
function loadJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    return response.json();
  });
}
~~~

The returned Promise rejects if fetch has a network-level failure, if the handler throws for a non-success HTTP response, or if JSON parsing fails. Returning response.json() lets the chain wait for parsing.

### Keep error boundaries meaningful

A catch is an error boundary. Place it where the program can recover, add context, or show a useful failure. A catch in the middle of a chain changes the chain's outcome, so later handlers may run as fulfillment handlers if the catch recovers.

~~~js
loadRequiredData()
  .then((data) => {
    return loadOptionalDecoration(data)
      .catch(() => null);
  })
  .then((result) => {
    renderPage(result);
  })
  .catch((error) => {
    showPageError(error);
  });
~~~

The inner catch only handles the optional decoration step. A failure from loadRequiredData still reaches the outer catch.

Avoid empty catch handlers unless ignoring that exact failure is a deliberate, documented choice. Silent rejection handling can hide bugs and leave the application in a confusing state.

## finally for cleanup

finally runs when a Promise fulfills or rejects. Its callback receives no settlement value or rejection reason. If cleanup succeeds, the next Promise preserves the original outcome:

~~~js
showLoadingIndicator();

loadData()
  .then((data) => {
    render(data);
  })
  .catch((error) => {
    showError(error);
  })
  .finally(() => {
    hideLoadingIndicator();
  });
~~~

A finally callback is useful for cleanup that should happen on either outcome, such as hiding a loading indicator or releasing a local resource.

If the finally callback throws or returns a rejected Promise, the Promise after finally rejects with that new failure. Keep cleanup code from accidentally replacing the original result or error.

Use catch for error handling and recovery. Use finally for cleanup that should happen after either outcome.

## Unhandled rejections

A rejected Promise with no rejection handler is an unhandled rejection. Hosts report these for debugging. Browsers can dispatch an unhandledrejection event on the global object. Node.js has its own unhandled rejection behavior.

Global rejection events are useful for diagnostics or last-resort reporting. They are not a replacement for handling errors at the operation or application boundary where the program can recover.

## Common mistakes

### Confusing a Promise with its result

A Promise represents the result's future outcome. It is not the fulfilled value itself. Attach a handler or await it before using the value.

### Forgetting that the executor runs immediately

The Promise executor runs synchronously during construction. Only work scheduled by that executor may finish later.

### Forgetting return in a then callback

A later step may receive undefined and run before the intended asynchronous operation completes. Return the Promise so the chain tracks it.

### Nesting chains without returning the inner Promise

The outer chain cannot wait for an inner chain that was started but not returned. Flatten the steps or return the nested Promise.

### Catching and accidentally recovering

A catch that returns normally changes the chain back to fulfilled. Rethrow when the failure must continue to the caller.

### Using finally to transform a value

finally is intended for cleanup. Its callback's ordinary return value is ignored, while a thrown error or rejected Promise changes the outcome.

### Expecting fetch to reject for every HTTP error

A fulfilled fetch Promise can still contain a non-success HTTP status. Inspect response.ok and reject explicitly when the application requires it.

### Leaving a rejection unhandled

Attach a catch at a boundary that can handle or report the failure. Do not rely on a global event to repair a broken operation flow.

## Try it yourself

1. Create a Promise that fulfills after a short timeout and attach a then handler.
2. Log a synchronous statement after attaching the handler. Observe which statement runs first.
3. Add two then handlers and return a value from the first. Display the value received by the second.
4. Return a Promise from a then handler. Confirm that the next handler waits for it.
5. Remove the return keyword and observe how the chain stops tracking that Promise.
6. Throw an Error from a fulfillment handler and handle it in a later catch.
7. Return a fallback value from catch. Observe that a following then handler runs.
8. Rethrow from catch and confirm that a later catch receives the failure.
9. Add finally and confirm that it runs after both successful and rejected outcomes.
10. Make the finally callback throw. Observe that the new Promise rejects with the cleanup error.
11. Use fetch with an HTTP error response. Check response.ok and create a helpful Error.
12. Wrap one callback-based function in a Promise. Do not wrap a function that already returns a Promise.

## Key points

- A Promise is pending, fulfilled, or rejected. Fulfilled and rejected Promises are settled.
- Resolving a Promise with another Promise makes it follow that Promise's eventual outcome.
- The Promise executor runs immediately, and its asynchronous operation settles the Promise later.
- then returns a new Promise whose outcome depends on the handler's return value or thrown error.
- Return each Promise from a chain handler so later steps wait for it.
- catch can recover with a meaningful fallback or rethrow to preserve failure.
- finally is for cleanup and normally preserves the original value or rejection.
- Handle rejections at a boundary that can recover or explain the failure.
- Check response.ok when a fulfilled fetch response may still represent an HTTP error.
- Use the Promise constructor primarily to adapt callback APIs that do not already return Promises.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [92 - Timers, animation frames, and scheduling](092-timers-animation-frames-and-scheduling.md) | [Open Q&A](../qnas/093-promises-states-chaining-and-error-handling.md) | [Open example](../examples/093-promises-states-chaining-and-error-handling.md) | [94 - Promise combinators and concurrent work](094-promise-combinators-and-concurrent-work.md) |
