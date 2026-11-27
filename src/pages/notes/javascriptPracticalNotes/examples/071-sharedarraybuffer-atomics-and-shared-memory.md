# 71 - SharedArrayBuffer, Atomics, and shared memory: Examples

These examples demonstrate shared storage, typed array views, atomic operations, waiting, and worker coordination. Each example includes a task, complete code, expected output, and an explanation. Browser worker examples require a secure, cross-origin isolated page with the **SharedArrayBuffer** constructor available.

## 1. Allocate shared bytes

**Task:** Allocate 16 shared bytes and view them as four 32-bit integers.

~~~js
const shared = new SharedArrayBuffer(16);
const values = new Int32Array(shared);

console.log(shared.byteLength);
console.log(values.length);
console.log([...values].join(", "));
~~~

Expected output:

~~~text
16
4
0, 0, 0, 0
~~~

**Explanation:** The buffer size is measured in bytes. An **Int32Array** element occupies four bytes, and new shared bytes are initialized to zero.

## 2. View the same storage in two ways

**Task:** Write an integer through one view and read its bytes through another view.

~~~js
const shared = new SharedArrayBuffer(8);
const bytes = new Uint8Array(shared);
const words = new Int32Array(shared);

Atomics.store(words, 0, 258);

console.log(Atomics.load(words, 0));
console.log([...bytes.slice(0, 4)].join(", "));
~~~

Expected output on a little-endian platform:

~~~text
258
2, 1, 0, 0
~~~

**Explanation:** Both views use the same backing bytes. The byte sequence for a multi-byte typed array value depends on platform byte order. Use **DataView** when a format specifies its byte order.

## 3. Check browser availability

**Task:** Check whether this browser context can construct and share a **SharedArrayBuffer**.

~~~js
const available =
  typeof SharedArrayBuffer === "function" &&
  globalThis.crossOriginIsolated === true;

console.log(available);
~~~

Expected output:

~~~text
true
~~~

**Explanation:** This is the expected result in a supported secure, cross-origin isolated browser page. A page without cross-origin isolation prints **false**. Server policies and browser support determine whether shared memory is available.

## 4. Increment a shared counter atomically

**Task:** Increment a shared integer and inspect the old and new values.

~~~js
const counter = new Int32Array(new SharedArrayBuffer(4));

const previous = Atomics.add(counter, 0, 1);

console.log(previous);
console.log(Atomics.load(counter, 0));
~~~

Expected output:

~~~text
0
1
~~~

**Explanation:** **Atomics.add()** returns the previous value and stores the incremented value as one indivisible operation. Multiple agents can use it on the same shared element without losing atomic increments.

## 5. Store and load a shared state

**Task:** Store a state value and read it atomically.

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));

console.log(Atomics.store(state, 0, 7));
console.log(Atomics.load(state, 0));
~~~

Expected output:

~~~text
7
7
~~~

**Explanation:** **Atomics.store()** returns the value it stores. **Atomics.load()** returns the value at that location.

## 6. Compare add, subtract, and exchange

**Task:** Observe the previous value returned by each read-modify-write operation.

~~~js
const score = new Int32Array(new SharedArrayBuffer(4));

console.log(Atomics.add(score, 0, 5));
console.log(Atomics.sub(score, 0, 2));
console.log(Atomics.exchange(score, 0, 10));
console.log(Atomics.load(score, 0));
~~~

Expected output:

~~~text
0
5
3
10
~~~

**Explanation:** The value changes from zero to five, then three, then ten. Each update returns the value that existed before it ran.

## 7. Compare ordinary increment with atomic increment

**Task:** See the final state after two sequential increments, then use the correct operation for shared coordination.

~~~js
const counter = new Int32Array(new SharedArrayBuffer(4));

counter[0]++;
counter[0]++;

console.log(counter[0]);

Atomics.add(counter, 0, 1);
console.log(Atomics.load(counter, 0));
~~~

Expected output:

~~~text
2
3
~~~

**Explanation:** This one-agent sequence happens to produce the expected values. Under concurrency, **counter[0]++** can lose an update because it is a separate read and write. Use **Atomics.add()** when multiple agents may increment the same location.

## 8. Replace only an expected value

**Task:** Use compare-and-exchange to claim a state only while it is zero.

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));

const first = Atomics.compareExchange(state, 0, 0, 1);
const second = Atomics.compareExchange(state, 0, 0, 2);

console.log(first);
console.log(second);
console.log(Atomics.load(state, 0));
~~~

Expected output:

~~~text
0
1
1
~~~

**Explanation:** The first call sees zero and stores one. The second call expects zero but sees one, so it leaves the state unchanged. Both calls return the value they saw before the operation.

## 9. Update a maximum with a compare-and-exchange loop

**Task:** Store a candidate only when it exceeds the current shared maximum.

~~~js
function storeMaximum(view, index, candidate) {
  let current = Atomics.load(view, index);

  while (candidate > current) {
    const previous = Atomics.compareExchange(
      view,
      index,
      current,
      candidate
    );

    if (previous === current) {
      return candidate;
    }

    current = previous;
  }

  return current;
}

const maximum = new Int32Array(new SharedArrayBuffer(4));

console.log(storeMaximum(maximum, 0, 8));
console.log(storeMaximum(maximum, 0, 5));
console.log(Atomics.load(maximum, 0));
~~~

Expected output:

~~~text
8
8
8
~~~

**Explanation:** If another agent changes the value before compare-and-exchange succeeds, the loop retries using the newly observed value. The function never replaces a larger value with a smaller candidate.

## 10. Apply atomic bitwise updates

**Task:** Use an integer typed array as a small bit field.

~~~js
const flags = new Int32Array(new SharedArrayBuffer(4));

console.log(Atomics.or(flags, 0, 0b0100));
console.log(Atomics.or(flags, 0, 0b0010));
console.log(Atomics.and(flags, 0, 0b0110));
console.log(Atomics.load(flags, 0));
~~~

Expected output:

~~~text
0
4
6
6
~~~

**Explanation:** **Atomics.or()** and **Atomics.and()** return the old value and store the bitwise result. The final value has the two low bits set.

## 11. Use BigInt atomic operations

**Task:** Store and add a 64-bit BigInt value.

~~~js
const total = new BigInt64Array(new SharedArrayBuffer(8));

console.log(Atomics.add(total, 0, 5n));
console.log(Atomics.add(total, 0, 7n));
console.log(Atomics.load(total, 0));
~~~

Expected output:

~~~text
0n
5n
12n
~~~

**Explanation:** **BigInt64Array** uses BigInt values and returns BigInt results. Use **5n**, not the Number value **5**.

## 12. Wait asynchronously and notify one waiter

**Task:** Wait for a shared state to change without blocking this agent.

~~~js
const shared = new SharedArrayBuffer(4);
const state = new Int32Array(shared);

const result = Atomics.waitAsync(state, 0, 0);

console.log(result.async);

setTimeout(() => {
  Atomics.store(state, 0, 1);
  console.log(Atomics.notify(state, 0, 1));
}, 0);

result.value.then((status) => {
  console.log(status, Atomics.load(state, 0));
});
~~~

Expected output:

~~~text
true
1
ok 1
~~~

**Explanation:** The wait is registered before the timer callback runs. The callback stores a new value and wakes one waiter. The Promise resolves with **"ok"**. **Atomics.waitAsync()** keeps the current agent responsive while it waits.

## 13. Handle a value that already changed

**Task:** Call **waitAsync()** when the current value is different from the expected value.

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(state, 0, 4);

const result = Atomics.waitAsync(state, 0, 0);

console.log(result.async);
console.log(result.value);
~~~

Expected output:

~~~text
false
not-equal
~~~

**Explanation:** The operation checks the value before enqueuing. Because the value is four rather than zero, it returns synchronously and no wait is started.

## 14. Notify when nobody is waiting

**Task:** See how many agents are waiting at a location before sending a notification.

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));

console.log(Atomics.notify(state, 0));
~~~

Expected output:

~~~text
0
~~~

**Explanation:** A notification is not saved for a future waiter. It wakes only agents that are already waiting on the same shared location.

## 15. Wait asynchronously until a timer changes the state

**Task:** Observe the timeout result when nobody notifies the wait.

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
const result = Atomics.waitAsync(state, 0, 0, 5);

console.log(result.async);

result.value.then((status) => {
  console.log(status);
});
~~~

Expected output:

~~~text
true
timed-out
~~~

**Explanation:** The state initially matches zero, so an asynchronous wait begins. No agent notifies it, and the short timeout resolves the Promise with **"timed-out"**. Exact elapsed time depends on the runtime's timer scheduling.

## 16. Coordinate a window and a worker

**Task:** Share a counter with a worker, let the worker atomically increment it, and receive the result.

**main.js:**

~~~js
if (
  typeof SharedArrayBuffer !== "function" ||
  globalThis.crossOriginIsolated !== true
) {
  throw new Error("Shared memory is not available in this page");
}

const shared = new SharedArrayBuffer(4);
const counter = new Int32Array(shared);
const worker = new Worker("counter-worker.js");

worker.onmessage = (event) => {
  console.log(event.data.before);
  console.log(event.data.after);
  console.log(Atomics.load(counter, 0));
  worker.terminate();
};

worker.postMessage(shared);
~~~

**counter-worker.js:**

~~~js
self.onmessage = (event) => {
  const counter = new Int32Array(event.data);
  const before = Atomics.add(counter, 0, 1);

  self.postMessage({
    before,
    after: Atomics.load(counter, 0)
  });
};
~~~

Expected output in the window console:

~~~text
0
1
1
~~~

**Explanation:** The window and worker hold views over the same backing bytes. The worker increments the counter and sends a normal message after the update. The message provides a simple completion signal, while **Atomics** protects the shared counter update. Run the page in a supported secure, cross-origin isolated browser environment.

## 17. Use waitAsync between a window and a worker

**Task:** Let a worker wait for a state change, then have the window update the state and notify it.

**main.js:**

~~~js
const shared = new SharedArrayBuffer(4);
const state = new Int32Array(shared);
const worker = new Worker("waiter-worker.js");

worker.onmessage = (event) => {
  console.log(event.data);

  if (event.data === "waiting") {
    Atomics.store(state, 0, 1);
    console.log(Atomics.notify(state, 0, 1));
  }
};

worker.postMessage(shared);
~~~

**waiter-worker.js:**

~~~js
self.onmessage = async (event) => {
  const state = new Int32Array(event.data);
  const result = Atomics.waitAsync(state, 0, 0);

  if (!result.async) {
    self.postMessage(result.value);
    return;
  }

  self.postMessage("waiting");

  const status = await result.value;
  self.postMessage(status + " " + Atomics.load(state, 0));
};
~~~

Expected output in the window console:

~~~text
waiting
1
ok 1
~~~

**Explanation:** The worker calls **waitAsync()** before posting **"waiting"**, so its wait is already registered when the window receives that message. The window then stores one and notifies a waiter. The worker's Promise resolves and it reports the status and the current shared value. This example keeps the window non-blocking.

## 18. Check whether a value is a typed array view

**Task:** Compare a shared buffer with a typed array view over it.

~~~js
const shared = new SharedArrayBuffer(4);
const values = new Int32Array(shared);

console.log(ArrayBuffer.isView(shared));
console.log(ArrayBuffer.isView(values));
~~~

Expected output:

~~~text
false
true
~~~

**Explanation:** A buffer is storage, not a view. **ArrayBuffer.isView()** recognizes typed arrays and **DataView** objects, including views backed by shared storage.

## 19. Inspect lock-free support

**Task:** Ask whether four-byte atomic operations are lock-free in this runtime.

~~~js
console.log(Atomics.isLockFree(4));
~~~

Expected output on common runtimes:

~~~text
true
~~~

**Explanation:** The result depends on the runtime and platform. Treat it as a performance hint only. The algorithm must remain correct if the result is false.

## 20. Grow a shared buffer when supported

**Task:** Feature-detect growable shared buffers and increase the byte length.

~~~js
const canGrow =
  typeof SharedArrayBuffer === "function" &&
  typeof SharedArrayBuffer.prototype.grow === "function";

console.log(canGrow);

if (canGrow) {
  const shared = new SharedArrayBuffer(8, { maxByteLength: 32 });
  shared.grow(16);
  console.log(shared.byteLength);
}
~~~

Expected output in a runtime with growable shared buffers:

~~~text
true
16
~~~

**Explanation:** Growable shared buffers are a newer feature. Check for support before using constructor options or **grow()** when older runtimes are in scope. A shared buffer can grow up to its maximum but cannot shrink.

## Review checklist

- Does the task require simultaneous access to the same bytes, or would worker messages be simpler?
- Does every shared counter use atomic read-modify-write operations?
- Are waiting views **Int32Array** or **BigInt64Array**?
- Does the waiting agent re-check the condition after waking?
- Does the browser page have the required shared memory support?
- Are outputs dependent on runtime support or scheduling?

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [70 - ArrayBuffer, DataView, and typed arrays](../lessons/070-arraybuffer-dataview-and-typed-arrays.md) | [Open lesson](../lessons/071-sharedarraybuffer-atomics-and-shared-memory.md) | [Open Q&A](../qnas/071-sharedarraybuffer-atomics-and-shared-memory.md) | [72 - Regular expression syntax](../lessons/072-regular-expression-syntax.md) |
