# 10. Promises, the event loop, and async code

A Promise represents the eventual result of an operation. It can be pending, fulfilled, or rejected. Use `then`/`catch` for promise chains or `async`/`await` for sequential-looking code. An `async` function always returns a Promise; throwing inside it rejects that Promise.

```js
async function loadProfile(id) {
  const response = await fetch("/api/profiles/" + encodeURIComponent(id));
  if (!response.ok) throw new Error("Profile request failed");
  return response.json();
}
```

`await` pauses the current async function until its promise settles; it does not block the JavaScript thread. In browsers, synchronous JavaScript runs to completion, then queued microtasks (including Promise reactions) are processed before the next task, such as many user events or timer callbacks. Rendering and host scheduling add details, so do not use timers as precise clocks.

## Run independent work together

Awaiting independent requests one by one adds their durations. Start them together and wait for both:

```js
const [profile, preferences] = await Promise.all([
  loadProfile(id),
  loadPreferences(id),
]);
```

Use `Promise.all` when any failure should fail the group; `Promise.allSettled` when every result matters. `Promise.race` settles with the first settled result, not necessarily the first success. Every launched operation still needs sensible cancellation or cleanup.

## Cancellation and errors

Promises themselves are not generally cancellable. APIs such as `fetch` accept an `AbortSignal`:

```js
const controller = new AbortController();
const request = fetch(url, { signal: controller.signal });

// Call controller.abort() when the view is removed or the request is no longer useful.
```

Catch expected failures at a boundary, distinguish aborts from real failures, and expose a retry path when appropriate. An unhandled rejection makes failures difficult to diagnose.

## Do not block the event loop

Long synchronous work prevents input and rendering from progressing. Break large tasks into chunks, use a Web Worker for CPU-heavy browser work, or move server work to an appropriate worker/thread mechanism. Async I/O improves responsiveness while waiting; it does not make expensive computation parallel by itself.

## References

- [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN: async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
