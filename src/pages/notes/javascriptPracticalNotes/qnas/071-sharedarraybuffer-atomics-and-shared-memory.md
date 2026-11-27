# 71 - SharedArrayBuffer, Atomics, and shared memory: Q&A

Use these questions to review shared buffers, atomic operations, worker coordination, wait and notify behavior, and browser availability. Each answer appears immediately after its question and includes an explanation.

## Multiple-choice questions

### 1. What does a SharedArrayBuffer provide?

- A. A JavaScript array that automatically locks itself
- B. A block of bytes that multiple agents can access
- C. A way to transfer an ArrayBuffer and detach it
- D. A floating-point array

**Answer: B.** A **SharedArrayBuffer** stores bytes that can be accessed by multiple agents in an allowed sharing group. A typed array or **DataView** provides a view over those bytes.

### 2. How does a SharedArrayBuffer behave when passed to a worker with postMessage()?

- A. The sender always loses access to it
- B. The bytes are converted to a string
- C. The worker can receive a reference to the same shared data
- D. The worker receives a frozen copy

**Answer: C.** A shared buffer is shared, not transferred away from the sender. Both agents can access the same backing bytes, so they need a synchronization protocol.

### 3. What does this create?

~~~js
const shared = new SharedArrayBuffer(16);
const values = new Int32Array(shared);
~~~

- A. A view with 16 elements
- B. A 16-byte buffer and a four-element Int32Array view
- C. A 64-byte buffer
- D. A copied ordinary array

**Answer: B.** The constructor argument is a byte count. Each **Int32Array** element uses four bytes, so 16 bytes provide four elements.

### 4. Why can counter[0]++ lose an update when two agents share counter?

- A. Increment is disallowed on typed arrays
- B. The expression is a read-modify-write sequence, not one indivisible operation
- C. Shared memory always rolls back writes
- D. The plus operator converts the value to BigInt

**Answer: B.** Both agents can read the same old value before either writes the incremented value. One increment can overwrite the other. Use **Atomics.add()** for an atomic increment.

### 5. What does Atomics.add(view, index, value) return?

- A. The new value after addition
- B. The view
- C. The previous value before addition
- D. A Promise

**Answer: C.** **Atomics.add()** performs the read-modify-write atomically and returns the old value. Read the location afterward with **Atomics.load()** to get the updated value.

### 6. Which typed array is supported by atomic numeric operations?

- A. Float32Array
- B. Uint8ClampedArray
- C. Int32Array
- D. DataView

**Answer: C.** Atomic numeric methods accept supported integer typed arrays, including **Int32Array**. Floating point arrays, **Uint8ClampedArray**, and **DataView** are not valid atomic typed array arguments.

### 7. Which typed arrays can be used with Atomics.wait()?

- A. Float32Array and Float64Array
- B. Uint8Array and Uint16Array
- C. Int32Array and BigInt64Array
- D. Any ArrayBuffer view

**Answer: C.** Waiting operations have stricter type requirements than ordinary atomic operations. They use **Int32Array** or **BigInt64Array** views backed by shared memory.

### 8. What does Atomics.compareExchange(view, index, expected, replacement) return?

- A. Always the replacement value
- B. The value that was present before the operation
- C. true if it changed, otherwise false
- D. A Promise that resolves to the current value

**Answer: B.** The operation writes the replacement only if the current value equals the expected value, and it always returns the prior value. Compare that returned value with the expected value to determine whether the write happened.

### 9. What happens if the current value does not equal the expected value in Atomics.wait()?

- A. It suspends forever
- B. It returns "not-equal" without waiting
- C. It throws for every mismatch
- D. It writes the expected value

**Answer: B.** The wait operation checks the location first. If it already differs, it returns **"not-equal"** instead of entering the wait queue.

### 10. What does Atomics.notify() return?

- A. The number of waiters it woke
- B. The new value at the index
- C. A Boolean indicating cross-origin isolation
- D. The value that was stored

**Answer: A.** The return value is the number of waiting agents that were notified. If no agent is waiting on that location, the result is zero.

### 11. Which statement about Atomics.waitAsync() is correct?

- A. It always blocks the current agent
- B. It returns an object describing either an immediate result or a Promise
- C. It only works with Float64Array
- D. It wakes all agents automatically

**Answer: B.** If the expected value does not match, the result is immediate and **async** is false. If the agent begins waiting, **async** is true and **value** is a Promise.

### 12. What does Atomics.wait() return after a matching waiter is notified?

- A. "true"
- B. "ok"
- C. "not-equal"
- D. The number of waiters

**Answer: B.** The string **"ok"** means the waiting agent was notified. **"not-equal"** means the value differed before waiting, and **"timed-out"** means the timeout expired.

### 13. Why should Atomics.wait() not be used in a browser window's main thread?

- A. It converts the page to cross-origin isolated mode
- B. It blocks JavaScript execution and is disallowed for the browser main thread
- C. It always returns "not-equal" in browsers
- D. It transfers the buffer to a worker

**Answer: B.** A blocking wait would freeze the page's main JavaScript agent. Use **Atomics.waitAsync()** for non-blocking coordination or perform blocking work in a suitable worker.

### 14. What does a browser page generally need before it can use shared memory?

- A. A CSS file
- B. A secure context and cross-origin isolation
- C. A service worker with no network access
- D. A BigUint64Array

**Answer: B.** Modern browsers generally restrict shared memory to secure, cross-origin isolated pages. Check **globalThis.crossOriginIsolated** and whether **SharedArrayBuffer** is available.

### 15. Which value should be passed to an atomic operation on a BigInt64Array?

- A. 5
- B. "5"
- C. 5n
- D. true

**Answer: C.** BigInt typed arrays require BigInt values. Passing a Number such as **5** instead of **5n** causes a type error.

### 16. What does Atomics.isLockFree(4) tell you?

- A. Whether every four-byte update is correct
- B. Whether operations of that size are lock-free in this runtime
- C. Whether the browser is cross-origin isolated
- D. Whether a buffer can grow

**Answer: B.** It is a runtime performance hint. Correctness must not depend on the result.

### 17. How does a SharedArrayBuffer differ from a transferable ArrayBuffer?

- A. A SharedArrayBuffer shares its backing data, while transferring an ArrayBuffer moves ownership
- B. SharedArrayBuffer only stores strings
- C. ArrayBuffer cannot be viewed by a typed array
- D. They always make independent copies

**Answer: A.** A transferred **ArrayBuffer** becomes detached from its sender. A **SharedArrayBuffer** remains usable by multiple agents that share its backing data.

### 18. What does this print?

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(state, 0, 7);
console.log(Atomics.add(state, 0, 3));
console.log(Atomics.load(state, 0));
~~~

- A. 10, then 10
- B. 7, then 10
- C. 3, then 7
- D. 7, then 7

**Answer: B.** The atomic addition returns the previous value, **7**, and leaves **10** in the location.

### 19. What does this print?

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(state, 0, 4);
console.log(Atomics.compareExchange(state, 0, 0, 9));
console.log(Atomics.load(state, 0));
~~~

- A. 0, then 9
- B. 4, then 4
- C. 9, then 9
- D. 4, then 9

**Answer: B.** The current value is four, not the expected zero. The compare-and-exchange leaves it unchanged and returns four.

### 20. What does this print?

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(state, 0, 4);
const result = Atomics.waitAsync(state, 0, 0);
console.log(result.async, result.value);
~~~

- A. true and a pending Promise
- B. false and "not-equal"
- C. false and "ok"
- D. It blocks until another agent runs

**Answer: B.** The value is already four, which differs from the expected zero. The call does not enqueue a wait and returns an immediate result.

## Code-reading questions

### 21. What are the two output lines?

~~~js
const shared = new SharedArrayBuffer(8);
const values = new Int32Array(shared);

console.log(values.length);
console.log(shared.byteLength);
~~~

**Answer:**

~~~text
2
8
~~~

**Explanation:** An **Int32Array** element uses four bytes. Eight bytes therefore provide two elements.

### 22. What does this print?

~~~js
const values = new Int32Array(new SharedArrayBuffer(4));

console.log(Atomics.add(values, 0, 2));
console.log(Atomics.add(values, 0, 5));
console.log(Atomics.load(values, 0));
~~~

**Answer:**

~~~text
0
2
7
~~~

**Explanation:** Each **Atomics.add()** returns the value before its update. The stored value progresses from zero to two to seven.

### 23. Does the second compare-and-exchange change state?

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(state, 0, 3);

const previous = Atomics.compareExchange(state, 0, 3, 8);
const second = Atomics.compareExchange(state, 0, 3, 9);

console.log(previous, second, Atomics.load(state, 0));
~~~

**Answer:**

~~~text
3 8 8
~~~

**Explanation:** The first call sees three and stores eight. The second expects three but sees eight, so it leaves the value at eight and returns eight.

### 24. What does this print, and why?

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(state, 0, 6);

console.log(Atomics.wait(state, 0, 0, 10));
~~~

**Answer:** **"not-equal"** in an agent where blocking waits are permitted.

**Explanation:** The current value is six, which does not equal the expected zero. The operation returns before suspending. In a browser main thread, **Atomics.wait()** is disallowed even though this particular value would make it return immediately.

### 25. What does this print?

~~~js
const total = new BigInt64Array(new SharedArrayBuffer(8));

console.log(Atomics.add(total, 0, 12n));
console.log(Atomics.load(total, 0));
~~~

**Answer:**

~~~text
0n
12n
~~~

**Explanation:** BigInt atomic operations return BigInt values. The initial value is **0n**, then the update stores **12n**.

### 26. How many waiters does this notify?

~~~js
const state = new Int32Array(new SharedArrayBuffer(4));
console.log(Atomics.notify(state, 0, 2));
~~~

**Answer:** **0**

**Explanation:** No agent has called a waiting operation on this location, so the notification wakes no one. Notifications are not saved for a later waiter.

## Short-answer questions

### 27. What is the difference between sharing and transferring a buffer?

**Answer:** Sharing lets multiple agents access the same backing bytes. Transferring an **ArrayBuffer** moves its ownership to another agent and detaches it from the sender.

**Explanation:** Choose sharing when agents need coordinated access to one data block. Choose transfer when one agent can hand off ownership and no longer needs the original buffer.

### 28. Why is an atomic increment safer than counter[0]++?

**Answer:** **Atomics.add()** makes the read-modify-write indivisible. The ordinary increment can be interrupted between its read and write steps, allowing one agent to overwrite another agent's update.

**Explanation:** Atomicity prevents lost updates on that location. It does not automatically protect other fields or make an entire multi-step algorithm atomic.

### 29. What does the return value of Atomics.exchange() represent?

**Answer:** It is the value that was present before the exchange.

**Explanation:** The new value is stored in the typed array. Use **Atomics.load()** afterward when the new value is needed.

### 30. What is the purpose of Atomics.compareExchange()?

**Answer:** It conditionally writes a replacement only when the current value matches an expected value.

**Explanation:** It returns the old value either way. This lets a program detect whether the update succeeded and retry if another agent changed the location first.

### 31. Why does Atomics.wait() check an expected value?

**Answer:** It avoids sleeping when the shared state has already changed.

**Explanation:** The caller must still use a protocol that checks the condition again after waking. A notification can arrive between separate steps, and a wake-up does not by itself prove the desired condition is true.

### 32. What is the difference between Atomics.wait() and Atomics.waitAsync()?

**Answer:** **Atomics.wait()** suspends the current agent. **Atomics.waitAsync()** returns immediately and represents a pending wait with a Promise.

**Explanation:** A browser main thread must remain responsive, so use the asynchronous form there. Blocking waits are intended for agents that the host permits to suspend, such as suitable workers.

### 33. Why can Atomics.notify() return zero even when a shared state was updated?

**Answer:** The state may have been updated while no agent was queued as a waiter at that location.

**Explanation:** A notification is not a stored event. The protocol should use the state value itself to determine whether work or a condition is ready.

### 34. Which typed arrays are valid for waiting operations?

**Answer:** **Int32Array** and **BigInt64Array**, backed by a **SharedArrayBuffer**.

**Explanation:** Other integer typed arrays can be used with many atomic operations, but wait and notify use these waitable types.

### 35. What does cross-origin isolation mean for SharedArrayBuffer in browsers?

**Answer:** It is a browser security state that generally must be enabled before a page can construct and share shared memory with workers.

**Explanation:** Check **globalThis.crossOriginIsolated** and constructor availability. A server commonly configures this state with COOP and COEP response headers, and those policies may affect embedded resources.

### 36. Can Atomics make a whole sequence of several operations indivisible?

**Answer:** No. Each atomic operation protects its own location operation, not an arbitrary sequence of JavaScript statements.

**Explanation:** A multi-step algorithm needs an explicit protocol, such as a state machine or a compare-and-exchange loop, to handle interleaving.

### 37. What does Atomics.isLockFree() tell a program?

**Answer:** Whether operations for a specified byte size are lock-free in the current runtime.

**Explanation:** This is a performance hint. Programs must remain correct regardless of its result.

### 38. Why should a program use a consistent atomic protocol for a shared coordination location?

**Answer:** Mixing atomic operations with unsynchronized ordinary reads and writes makes the order and visibility of concurrent changes hard to reason about.

**Explanation:** Decide which operations coordinate access and use that protocol consistently across agents.

## Coding and design questions

### 39. Write a function that atomically increments a shared counter and returns the new value.

**Answer:**

~~~js
function incrementCounter(counter, index = 0) {
  Atomics.add(counter, index, 1);
  return Atomics.load(counter, index);
}

const counter = new Int32Array(new SharedArrayBuffer(4));
console.log(incrementCounter(counter));
~~~

Output:

~~~text
1
~~~

**Explanation:** **Atomics.add()** applies the increment atomically. The following load returns the current value. If other agents update the counter at the same time, this returned value may include their updates too.

### 40. Write a function that tries to change a value from zero to one only if it is still zero.

**Answer:**

~~~js
function claim(state, index = 0) {
  const previous = Atomics.compareExchange(state, index, 0, 1);
  return previous === 0;
}

const state = new Int32Array(new SharedArrayBuffer(4));
console.log(claim(state));
console.log(claim(state));
~~~

Output:

~~~text
true
false
~~~

**Explanation:** The first call sees zero and changes it to one. The next call sees one, so it does not replace it. This pattern can claim a simple state, but a complete lock also needs ownership, release, and possibly fairness rules.

### 41. Complete a non-blocking wait that updates a state and wakes one waiter.

**Answer:**

~~~js
const shared = new SharedArrayBuffer(4);
const state = new Int32Array(shared);
const wait = Atomics.waitAsync(state, 0, 0);

wait.value.then((result) => {
  console.log(result, Atomics.load(state, 0));
});

setTimeout(() => {
  Atomics.store(state, 0, 1);
  console.log(Atomics.notify(state, 0, 1));
}, 0);
~~~

Expected output:

~~~text
1
ok 1
~~~

**Explanation:** The waiting agent is registered before the timer callback runs. The callback stores the changed state and wakes one waiter. The waiter then checks the state again. This is a one-agent demonstration of the APIs; a real worker setup must share the same buffer between agents.

### 42. Design a shared completion counter for three workers. Which operations should the workers use?

**Answer:** Give each worker access to the same **Int32Array** view over a shared buffer. When a worker finishes its task, it should call **Atomics.add(done, 0, 1)**. The coordinator can use **Atomics.load(done, 0)** to read the completed count.

**Explanation:** An atomic increment prevents workers from overwriting each other's completion updates. The coordinator should also define how workers signal completion, such as message notifications or a waitable state. The counter alone does not wake a coordinator that is waiting.

### 43. What should a worker do if it needs to wait for a state change without blocking a browser window?

**Answer:** The worker can use **Atomics.wait()** on a supported shared **Int32Array** or **BigInt64Array** location if that worker is allowed to suspend. The browser window can use **Atomics.waitAsync()** if it needs an asynchronous wait.

**Explanation:** Blocking the window would freeze its JavaScript execution. A design can also use worker messages when shared memory is unnecessary.

### 44. Why is this worker counter incorrect, and how should it be fixed?

~~~js
function work(counter) {
  counter[0]++;
}
~~~

**Answer:** The increment can lose updates because it is an ordinary read-modify-write operation. Use an integer typed array over shared memory and replace the line with:

~~~js
Atomics.add(counter, 0, 1);
~~~

**Explanation:** Atomic addition makes the update indivisible for the shared element. All agents must use the same shared buffer and index.

## Review checklist

Before using shared memory, confirm that you can answer these questions:

- Which agents can access this buffer?
- Which values are shared, and what typed array view represents them?
- Which operations on shared state are atomic?
- Can ordinary reads or writes race with atomic operations?
- What condition does a waiting agent check before it waits and after it wakes?
- Can a notification happen before the waiter is queued?
- Is a blocking wait allowed in this host and agent?
- Is the browser page cross-origin isolated?
- Does the protocol remain correct if operations are not lock-free?

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [70 - ArrayBuffer, DataView, and typed arrays](../lessons/070-arraybuffer-dataview-and-typed-arrays.md) | [Open lesson](../lessons/071-sharedarraybuffer-atomics-and-shared-memory.md) | [Open example](../examples/071-sharedarraybuffer-atomics-and-shared-memory.md) | [72 - Regular expression syntax](../lessons/072-regular-expression-syntax.md) |
