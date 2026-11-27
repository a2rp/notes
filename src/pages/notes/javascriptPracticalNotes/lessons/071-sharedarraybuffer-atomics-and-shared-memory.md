# 71 - SharedArrayBuffer, Atomics, and shared memory

Most JavaScript objects belong to one agent, such as a window or a worker. When multiple workers need to coordinate through the same bytes, copying messages can be expensive. **SharedArrayBuffer** provides bytes that multiple agents can access, and **Atomics** provides operations for coordinating access to shared integer values.

Shared memory is powerful, but it requires an explicit synchronization plan. This chapter explains the buffer model, atomic operations, waiting and notification, browser availability, common mistakes, and practical patterns.

## Learning goals

By the end of this chapter, you should be able to:

- Explain how **SharedArrayBuffer** differs from **ArrayBuffer**.
- Create typed array views over shared bytes and make a shared buffer available to another agent.
- Explain why ordinary read-modify-write expressions can lose updates.
- Use **Atomics** to read, write, update, and compare shared integer values.
- Use **Atomics.wait()**, **Atomics.notify()**, and **Atomics.waitAsync()** appropriately.
- Check browser support and identify common synchronization mistakes.

## Agents and shared memory

An **agent** is an independent JavaScript execution context. A browser window and each worker execute as separate agents. Node.js worker threads are separate agents too.

Ordinary objects and **ArrayBuffer** data are not directly shared between agents. Messages sent with **postMessage()** are commonly structured-cloned, or an **ArrayBuffer** can be transferred so the sender gives up its ownership. A **SharedArrayBuffer** behaves differently: another agent can receive a reference to the same shared data block, so both agents can observe changes to the same bytes.

Sharing the bytes does not make arbitrary operations safe. If agents access the same location without a synchronization plan, their operations can interleave in ways the program did not intend. Use **Atomics** for shared integer values and synchronization state.

## ArrayBuffer and SharedArrayBuffer

Both buffer types store bytes, but their sharing behavior differs.

| Buffer | Typical purpose | Sharing behavior |
| --- | --- | --- |
| **ArrayBuffer** | Data owned by one agent | Can be copied or transferred to another agent |
| **SharedArrayBuffer** | Data accessed by multiple agents | Agents in the same allowed sharing group use the same backing bytes |

A **SharedArrayBuffer** is storage, not an array. A typed array or **DataView** provides a view of that storage.

~~~js
const shared = new SharedArrayBuffer(16);
const values = new Int32Array(shared);

console.log(shared.byteLength);
console.log(values.length);
console.log([...values].join(", "));
~~~

Output:

~~~text
16
4
0, 0, 0, 0
~~~

The buffer has 16 bytes. Each **Int32Array** element uses 4 bytes, so this view has four elements. Newly allocated shared bytes are zero-initialized.

Different views can refer to the same bytes:

~~~js
const shared = new SharedArrayBuffer(8);
const bytes = new Uint8Array(shared);
const words = new Int32Array(shared);

Atomics.store(words, 0, 258);

console.log(bytes[0]);
console.log(bytes[1]);
console.log(Atomics.load(words, 0));
~~~

Output on a little-endian platform:

~~~text
2
1
258
~~~

The first integer occupies bytes zero through three. Typed array byte order follows the platform. Use **DataView** when a binary format requires an explicitly chosen byte order.

## Giving another agent access

In a browser, a window can pass a **SharedArrayBuffer** to a worker with **postMessage()**. The worker receives an object that refers to the same data block. The buffer is shared, not transferred away from the sender.

~~~js
// In a window, after creating a Worker:
const worker = new Worker("worker.js");
const shared = new SharedArrayBuffer(4);

worker.postMessage(shared);

// In worker.js:
self.onmessage = (event) => {
  const values = new Int32Array(event.data);
  Atomics.add(values, 0, 1);
};
~~~

The worker changes the same bytes that the window can read. A real program also needs a protocol that defines which agent reads or writes each location and when. In Node.js, a shared buffer can similarly be passed to a worker created with the **worker_threads** module.

### Browser availability

Browsers restrict shared memory because it can expose timing information. Modern browsers generally require a secure context and cross-origin isolation before exposing the global **SharedArrayBuffer** constructor. A common server configuration uses these response headers:

~~~http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
~~~

Cross-origin isolation can affect loading images, scripts, frames, and other resources, so check the whole page when configuring it. Check availability instead of assuming it:

~~~js
const sharedMemoryAvailable =
  typeof SharedArrayBuffer === "function" &&
  globalThis.crossOriginIsolated === true;

console.log(sharedMemoryAvailable);
~~~

This prints **false** in a browser page that is not cross-origin isolated. Availability rules are host-specific, so check the target runtime when using workers outside browsers.

## Why ordinary increments can lose updates

An expression such as **counter[0]++** looks like one operation, but it is a read-modify-write sequence:

1. Read the current value.
2. Add one locally.
3. Write the result.

If two agents both read **0** before either write completes, both may write **1**. The final value is **1**, even though there were two increments. This is a lost update.

Use an atomic operation such as **Atomics.add()**:

~~~js
const shared = new SharedArrayBuffer(4);
const counter = new Int32Array(shared);

const previous = Atomics.add(counter, 0, 1);

console.log(previous);
console.log(Atomics.load(counter, 0));
~~~

Output:

~~~text
0
1
~~~

**Atomics.add()** indivisibly reads the old value, adds the amount, and writes the result. It returns the old value. When multiple agents concurrently call it on the same location, each update is applied without losing another atomic update.

## Atomics and integer typed arrays

Atomic operations on a location are indivisible. The supported integer typed arrays are **Int8Array**, **Uint8Array**, **Int16Array**, **Uint16Array**, **Int32Array**, **Uint32Array**, **BigInt64Array**, and **BigUint64Array**.

**Float32Array**, **Float64Array**, **Uint8ClampedArray**, and **DataView** are not valid typed array arguments for these operations. Waiting operations have a narrower set of supported types: **Int32Array** and **BigInt64Array**.

| Operation | Purpose | Return value |
| --- | --- | --- |
| **Atomics.load(view, index)** | Read a value atomically | The value read |
| **Atomics.store(view, index, value)** | Write a value atomically | The value stored |
| **Atomics.add(view, index, value)** | Add atomically | The previous value |
| **Atomics.sub(view, index, value)** | Subtract atomically | The previous value |
| **Atomics.exchange(view, index, value)** | Replace a value | The previous value |
| **Atomics.compareExchange(view, index, expected, replacement)** | Replace only if the current value matches | The previous value |
| **Atomics.and()**, **Atomics.or()**, **Atomics.xor()** | Apply a bitwise update | The previous value |

Inputs are converted to the typed array's element type. BigInt typed arrays require BigInt values such as **1n**. Other listed types use Number values.

### Load, store, and update

Use **Atomics.load()** and **Atomics.store()** for shared integer locations. Read-modify-write operations such as **add()**, **sub()**, and **exchange()** return the value from before the update.

~~~js
const shared = new SharedArrayBuffer(4);
const score = new Int32Array(shared);

console.log(Atomics.add(score, 0, 5));
console.log(Atomics.sub(score, 0, 2));
console.log(Atomics.exchange(score, 0, 10));
console.log(Atomics.load(score, 0));
~~~

Output:

~~~text
0
5
3
10
~~~

The calls change the value from zero to five, then three, then ten. JavaScript atomic operations are sequentially consistent, which gives them one consistent order across agents. This does not make ordinary accesses to shared data atomic. Use one consistent protocol for every shared coordination location.

### Compare and exchange

**Atomics.compareExchange(view, index, expected, replacement)** compares the current value with **expected**. It writes **replacement** only if they match, and always returns the previous value.

~~~js
const shared = new SharedArrayBuffer(4);
const state = new Int32Array(shared);

console.log(Atomics.compareExchange(state, 0, 0, 1));
console.log(Atomics.load(state, 0));

console.log(Atomics.compareExchange(state, 0, 0, 2));
console.log(Atomics.load(state, 0));
~~~

Output:

~~~text
0
1
1
1
~~~

The first call sees zero and changes it to one. The second expects zero but sees one, so it leaves the value unchanged and returns one.

Compare-and-exchange can build conditional update loops. This function changes a shared integer only when the candidate is larger:

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

const shared = new SharedArrayBuffer(4);
const maximum = new Int32Array(shared);

console.log(storeMaximum(maximum, 0, 8));
console.log(storeMaximum(maximum, 0, 5));
console.log(Atomics.load(maximum, 0));
~~~

Output:

~~~text
8
8
8
~~~

If another agent changes the value between the load and compare-and-exchange, the comparison fails. The loop sees the newer value and tries again if needed. Such loops can retry repeatedly under contention.

## Waiting and notifying

The waiting APIs use shared **Int32Array** or **BigInt64Array** locations:

- **Atomics.wait()** checks that a location equals an expected value, then suspends the current agent.
- **Atomics.notify()** wakes agents waiting on that exact shared location.
- **Atomics.waitAsync()** waits without blocking the calling agent.

**Atomics.wait()** returns **"not-equal"** if the value already differs, **"ok"** if notified, or **"timed-out"** if its timeout expires. The calling agent must be allowed to suspend. Browser main threads cannot use this blocking operation. A worker may use it when the host allows suspension.

A notification is not stored for later. If nobody is waiting when **Atomics.notify()** runs, it wakes zero agents. A correct protocol checks the state and handles the possibility that the state changed before waiting.

### Non-blocking wait with waitAsync

**Atomics.waitAsync()** returns an object with **async** and **value** properties. If the expected value does not match, **async** is **false** and **value** is **"not-equal"**. If the agent starts waiting, **async** is **true** and **value** is a Promise that resolves to **"ok"** or **"timed-out"**.

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

Output:

~~~text
true
1
ok 1
~~~

The wait is registered before the timer callback runs. The callback changes the state and wakes one waiter. The promise then resolves with **"ok"**. After waking, real programs should check the shared condition again because it may have changed before the agent resumed.

If the expected value does not match, the result is synchronous:

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(state, 0, 4);

const result = Atomics.waitAsync(state, 0, 0);

console.log(result.async);
console.log(result.value);
~~~

Output:

~~~text
false
not-equal
~~~

A wait is tied to a specific buffer location. Notifying a different buffer or index will not wake it.

## BigInt atomics

BigInt typed arrays support atomic operations on 64-bit shared integer values.

~~~js
const shared = new SharedArrayBuffer(8);
const total = new BigInt64Array(shared);

console.log(Atomics.add(total, 0, 5n));
console.log(Atomics.load(total, 0));
~~~

Output:

~~~text
0n
5n
~~~

Use BigInt values with **BigInt64Array** or **BigUint64Array**. Mixing a Number with a BigInt operation causes a type error.

## Growable shared buffers

Some modern runtimes support growable **SharedArrayBuffer** instances. Supply a maximum byte length when constructing the buffer. It can then grow up to that maximum, but cannot shrink.

~~~js
const shared = new SharedArrayBuffer(8, { maxByteLength: 32 });

console.log(shared.byteLength);
console.log(shared.growable);

shared.grow(16);

console.log(shared.byteLength);
~~~

Output in a runtime that supports this feature:

~~~text
8
true
16
~~~

Feature-detect newer buffer options when supporting older runtimes. Fixed-length views keep their length. A length-tracking view can observe a larger portion of a growable buffer where supported.

## Lock-free information

**Atomics.isLockFree(size)** reports whether operations of a given byte size are lock-free in the current runtime. It is a performance hint, not a correctness check.

~~~js
console.log(Atomics.isLockFree(4));
~~~

The result depends on the runtime:

~~~text
true
~~~

Never make a synchronization algorithm correct only when a particular size is lock-free.

## Common mistakes

### Assuming shared memory makes every access safe

The bytes are visible to multiple agents, but ordinary operations can still interleave. Use atomic operations for shared coordination state and define who owns other shared data.

### Treating an increment as one operation

**view[index]++** performs separate read and write steps. Use **Atomics.add()** when multiple agents may update the same counter.

### Using floating-point views with Atomics

The **Atomics** numeric methods do not accept **Float32Array** or **Float64Array**. Represent coordination values with supported integer typed arrays.

### Waiting on the wrong type or location

Wait methods accept only **Int32Array** or **BigInt64Array** views backed by shared memory. The notifying agent must use the same shared buffer and index.

### Blocking the browser main thread

Do not call **Atomics.wait()** in a browser window. Use **Atomics.waitAsync()** for non-blocking coordination or move blocking work to a worker.

### Assuming a notification means the condition is true

A wake-up does not replace checking the shared state. Read the condition again atomically and keep waiting if it is still false.

### Assuming browser support without checking isolation

A browser may hide the **SharedArrayBuffer** constructor when the page is not cross-origin isolated. Check the environment before creating or sharing a buffer.

### Mixing atomic and ordinary access casually

Using atomic operations in one agent and ordinary reads or writes in another makes the protocol hard to reason about. Use a consistent synchronization plan for each shared location.

## Try it yourself

1. Allocate shared storage for four **Int32Array** values and calculate its byte length.
2. Create a **Uint8Array** and **Int32Array** over the same buffer. Change a value through one view and inspect the bytes through the other.
3. Call **Atomics.add()** twice and note the previous value returned each time.
4. Try **Atomics.compareExchange()** with a matching and a non-matching expected value.
5. Use **Atomics.waitAsync()** with a timeout. Inspect both the immediate result object and the eventual result.
6. Explain why **Atomics.notify()** can wake zero agents.
7. Check **globalThis.crossOriginIsolated** in a browser and explain what it means.
8. If supported, grow a shared buffer and compare fixed-length and length-tracking views.
9. Explain why an atomic increment is safe for a shared counter but **counter[0]++** is not.
10. Design a worker protocol that assigns one shared index to each worker and uses an atomic counter for completion.

## Key points

- **SharedArrayBuffer** provides bytes accessible by multiple agents in an allowed sharing group.
- A typed array or **DataView** interprets shared bytes.
- Shared memory does not prevent races. Programs need a synchronization protocol.
- **Atomics** operations are indivisible for supported integer typed array locations.
- Atomic read-modify-write methods return the value from before the update.
- **Atomics.compareExchange()** supports conditional update loops.
- Waiting methods accept **Int32Array** and **BigInt64Array**. **Atomics.waitAsync()** avoids blocking the current agent.
- Browser shared memory generally requires a secure, cross-origin isolated page.
- Use consistent atomic access and re-check shared conditions after waking.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [70 - ArrayBuffer, DataView, and typed arrays](070-arraybuffer-dataview-and-typed-arrays.md) | [Open Q&A](../qnas/071-sharedarraybuffer-atomics-and-shared-memory.md) | [Open example](../examples/071-sharedarraybuffer-atomics-and-shared-memory.md) | [72 - Regular expression syntax](072-regular-expression-syntax.md) |
