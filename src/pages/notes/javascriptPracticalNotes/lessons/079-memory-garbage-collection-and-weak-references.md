# 79 - Memory, garbage collection, and weak references

JavaScript automatically manages memory for values and objects. The garbage collector can reclaim objects that are no longer reachable, but it cannot infer that a reachable value is no longer useful to the application.

A memory leak often means that an application keeps an unnecessary reference alive. Long-lived event listeners, timers, caches, closures, and global collections can retain entire object graphs. Understanding reachability and object lifetimes helps prevent these leaks.

## Learning goals

- Describe allocation, use, and reclamation in JavaScript.
- Understand reachability from roots and why cycles alone are not leaks.
- Distinguish a memory leak from normal memory use and delayed garbage collection.
- Identify common references that accidentally retain objects.
- Choose between Map and WeakMap, or Set and WeakSet.
- Use WeakRef and FinalizationRegistry only for non-critical, best-effort behavior.
- Apply deterministic cleanup for listeners, timers, subscriptions, and external resources.
- Inspect memory growth with runtime profiling tools.

## Memory management basics

A value is created, used, and eventually may become eligible for reclamation. JavaScript engines generally allocate memory automatically and run garbage collection when their heuristics decide it is useful. Application code does not normally free object memory directly.

A useful mental model is **reachability**:

- A set of **roots** represents values the runtime can still access, such as active execution state, global state, and host-managed references.
- Objects reachable from those roots remain available to the program.
- Objects no longer reachable from any root can be reclaimed.
- Reclamation timing is controlled by the engine, not by the program.

This is a mental model, not a promise about a specific collector algorithm or schedule. Engines use implementation strategies that can change over time. Garbage collection may run later than expected, and an unreachable object may remain in memory for a while.

~~~js
function makeTemporaryData() {
  const temporary = {
    records: new Array(1000).fill('draft')
  };

  return temporary.records.length;
}

console.log(makeTemporaryData());
~~~

After the function returns, no variable in this example keeps the temporary object graph reachable. It may be reclaimed later. The program cannot observe or require the exact moment that happens.

### Strong references and object graphs

A normal object property, variable, array element, Map key or value, closure capture, or other ordinary reference is generally **strong**: it keeps its referenced object reachable while the reference itself is reachable.

Objects form a graph of references. If a reachable object points to another object, that object is reachable too. If the whole graph is disconnected from every root, the graph can be reclaimed.

Cycles do not by themselves prevent collection:

~~~js
function makeCycle() {
  const first = {};
  const second = {};

  first.next = second;
  second.next = first;

  return 'finished';
}

console.log(makeCycle());
~~~

The two objects reference each other, but no reachable program value retains the cycle after the function finishes. Modern garbage collectors can reclaim unreachable cycles.

The relevant question is not "Does this object have any references?" It is "Can the program still reach this object from a live root?"

## Memory leaks are retained objects

A leak usually occurs when something keeps data reachable longer than the product needs it. The garbage collector cannot reclaim an object that the program can still access, even if that access is accidental.

Common causes include:

- A global array or Map that grows without limit.
- A cache with no size policy or expiration rule.
- Event listeners that are never removed from long-lived elements or global targets.
- Timers or intervals that continue after a view or task is finished.
- Subscriptions that are not cancelled when their owner is disposed.
- Closures that remain reachable and retain large captured values.
- Detached DOM nodes that remain referenced by JavaScript.
- Queues or logs that keep every historical item.
- Long-lived references held by debugging tools during investigation.

A repeated allocation is not automatically a leak. If the application still needs the object and its memory use is stable, it may be normal. A leak is about unintended retention or growth relative to the application's lifecycle.

## Closures and retained data

A closure can keep values reachable when the closure itself is retained. The exact storage and liveness analysis is engine-dependent, but application code should avoid keeping large data in long-lived callbacks when it is no longer needed.

~~~js
function createHandler(largeRecords) {
  return function handleClick() {
    console.log('records:', largeRecords.length);
  };
}
~~~

If an event system retains the returned function, the function may retain the captured **largeRecords** value. Remove the listener or replace the callback when the component is no longer active.

Capturing only the small values a callback needs can make ownership clearer:

~~~js
function createHandler(recordCount) {
  return function handleClick() {
    console.log('records:', recordCount);
  };
}
~~~

Do not rely on a particular compiler optimization to release captured values earlier than their apparent scope.

## Lifecycle cleanup

Garbage collection manages memory, but many resources need deterministic release. Remove references and stop ongoing work when an owner finishes.

### Event listeners

Keep the callback identity if it will need to be removed:

~~~js
const button = document.createElement('button');

function handleClick() {
  console.log('clicked');
}

button.addEventListener('click', handleClick);

// When this listener is no longer needed:
button.removeEventListener('click', handleClick);
~~~

Removing a listener requires the same event type, callback function, and matching options used to register it. An anonymous callback that was not saved elsewhere is difficult to remove by identity.

An AbortController can group listeners that support the signal option:

~~~js
const controller = new AbortController();

window.addEventListener('resize', handleResize, {
  signal: controller.signal
});

// Stop the registered listeners that use this signal:
controller.abort();
~~~

### Timers and subscriptions

Store timer identifiers and unsubscribe functions so the owner can stop them:

~~~js
const timerId = setInterval(updateClock, 1000);

function disposeClock() {
  clearInterval(timerId);
}

const unsubscribe = subscribeToUpdates(handleUpdate);

// When updates are no longer needed:
unsubscribe();
~~~

Use the lifecycle mechanism provided by the relevant framework or API. A forgotten listener or timer can retain callbacks and the values they close over.

### External resources

Memory and resources such as files, sockets, locks, streams, and transactions have related but different lifetimes. Close or dispose external resources explicitly, usually with a documented close/dispose method and try/finally or an appropriate resource-management construct. Do not wait for garbage collection to release something that must be released promptly.

## Map and Set hold strong references

A normal **Map** strongly retains its object keys and values while the Map remains reachable. A **Set** strongly retains its members.

~~~js
const cache = new Map();
let view = { title: 'Dashboard' };

cache.set(view, { rendered: true });

console.log(cache.has(view));

view = null;

console.log(cache.size);
~~~

~~~text
true
1
~~~

Setting **view** to null removes that variable's reference, but the Map still has the object as a key. The key remains reachable through the Map until the entry is deleted or the Map itself becomes unreachable.

~~~js
const removed = cache.delete([...cache.keys()][0]);
console.log(removed);
console.log(cache.size);
~~~

~~~text
true
0
~~~

A Map is appropriate when code needs to enumerate entries, inspect its size, or keep entries alive intentionally. Give caches a deliberate policy, such as a maximum size, expiration, or explicit deletion.

## WeakMap and WeakSet

A **WeakMap** associates values with weakly held keys. A **WeakSet** weakly holds its members. Their weak membership does not keep a key or member alive by itself. When a key is otherwise unreachable and collected, its WeakMap entry or WeakSet membership can disappear.

Objects are the common keys and members. Modern specifications also allow non-registered symbols because they can be collected. Support for weak symbols can vary across runtimes, so code targeting multiple environments should feature-detect it. Registered symbols such as Symbol.for('name') and well-known symbols are not weakly held keys.

~~~js
const metadata = new WeakMap();

const buttonNode = {
  id: 'save-button'
};

metadata.set(buttonNode, {
  clicks: 0,
  label: 'Save'
});

console.log(metadata.get(buttonNode).label);
console.log(metadata.has(buttonNode));

metadata.delete(buttonNode);
console.log(metadata.has(buttonNode));
~~~

~~~text
Save
true
false
~~~

WeakMap is useful for metadata whose lifetime should follow an object, such as metadata for a DOM node or an instance. It does not add the metadata as a visible property on that object.

WeakMap and WeakSet are deliberately not enumerable. They have no size property, clear() method, or way to expose all keys or members. Exposing the entries would reveal garbage-collection timing and make results nondeterministic. Use Map or Set when iteration, clearing all entries, or size is required.

A WeakMap still keeps its **value** available while its key is live. The key's weak treatment does not mean that the value is weak. If the key becomes otherwise unreachable, the association no longer keeps the key alive; its value becomes eligible for collection too, unless something else strongly references that value.

WeakMap entries have ephemeron-like behavior. Even if a value refers back to its key, the entry alone does not make an otherwise unreachable key live. Do not treat a WeakMap as a normal enumerable map with hidden keys.

### Weak key compatibility check

This helper checks whether a runtime accepts a non-registered symbol as a WeakMap key:

~~~js
function supportsWeakSymbolKeys() {
  try {
    const map = new WeakMap();
    map.set(Symbol('temporary'), true);
    return true;
  } catch {
    return false;
  }
}

console.log(supportsWeakSymbolKeys());
~~~

The result depends on runtime support. For broad compatibility, object keys remain the most portable choice.

## WeakRef

A **WeakRef** lets code attempt to access an object without keeping it alive indefinitely. In runtimes that support weak symbols, a non-registered symbol can also be a target. Its **deref()** method returns the target while it is still available, or undefined after it has been reclaimed.

~~~js
let image = {
  name: 'logo'
};

const imageRef = new WeakRef(image);

const availableImage = imageRef.deref();

console.log(availableImage.name);
~~~

~~~text
logo
~~~

This output is predictable because the strong **image** variable still refers to the object. If all strong references disappear, a later deref may return the object or undefined. The engine decides whether and when to collect it. A WeakRef is not a way to make memory release happen on demand.

A target just obtained from deref is kept alive at least until the end of the current JavaScript job. Keep the result in a local variable while using it:

~~~js
const value = imageRef.deref();

if (value !== undefined) {
  render(value);
}
~~~

Avoid calling deref repeatedly and assuming the result cannot change between separate jobs. Code must work whether the target has already been collected or remains alive.

WeakRef is a specialized tool. Prefer a bounded cache or a WeakMap when those structures fit the problem more directly.

## FinalizationRegistry

A **FinalizationRegistry** can request a cleanup callback after a registered target becomes unreachable and is collected. The callback is best-effort: it may run much later or never run before the program exits.

~~~js
const registry = new FinalizationRegistry(function (heldValue) {
  console.log('eventually eligible for cleanup:', heldValue);
});

let session = { id: 'session-1' };

registry.register(session, 'session-1');

session = null;
~~~

The code does not guarantee that the callback will run, or when it will run. Do not write program behavior that depends on this message or on prompt finalization.

The registry receives a **held value**, not the target object. The held value must not be the target itself, and it should not strongly retain the target indirectly. Otherwise, the target may remain reachable and never become eligible for finalization.

The optional unregister token lets code cancel a registration:

~~~js
const registry = new FinalizationRegistry(function (heldValue) {
  console.log('cleanup hint:', heldValue);
});

const registration = {};
const resource = { id: 1 };

registry.register(resource, 'resource-1', registration);
registry.unregister(registration);
~~~

Unregistering is deterministic. The cleanup callback is not. FinalizationRegistry is appropriate only for non-critical cleanup or best-effort maintenance, never for required resource release.

## Weak references are not cleanup guarantees

WeakMap, WeakSet, WeakRef, and FinalizationRegistry have different purposes:

| API | What is weak | Can entries be enumerated? | Typical use |
| --- | --- | --- | --- |
| WeakMap | Keys | No | Metadata tied to object lifetime |
| WeakSet | Members | No | Track object membership without extending member lifetime |
| WeakRef | Target reference | Not a collection | Optional access to a recreatable object |
| FinalizationRegistry | Registered target | Registrations cannot be enumerated | Best-effort cleanup hint |

Weak references do not provide deterministic timing, memory limits, or a substitute for ownership design. A WeakRef cache can still accumulate its own string keys and WeakRef objects, so it may need explicit pruning or a bounded policy.

## Finding and fixing retention

When memory use grows unexpectedly:

1. Reproduce the same user flow several times.
2. Capture a heap snapshot before and after the flow.
3. Compare object counts and retaining paths.
4. Find the long-lived owner that still reaches the objects.
5. Remove listeners, clear timers, unsubscribe, delete cache entries, or limit collection growth.
6. Repeat the same flow and compare snapshots again.

Browser developer tools and Node.js runtime tools can show heap snapshots, allocation samples, and retaining paths. Measurements depend on the environment, and development tools can themselves retain inspected values. Compare like-for-like runs and look for repeatable growth rather than one memory reading.

Do not diagnose a leak only from process memory staying high after objects become unreachable. A runtime can keep reclaimed heap space available for future allocations instead of returning it to the operating system immediately.

## Common mistakes

- Assuming the garbage collector runs immediately after a reference is removed.
- Trying to manually free ordinary JavaScript objects.
- Treating every cycle as a leak.
- Forgetting that a reachable collection can strongly retain every entry.
- Keeping event listeners, timers, or subscriptions after their owner is gone.
- Assuming a closure never retains values from its surrounding scope.
- Using WeakMap when code needs enumeration or a size count.
- Assuming WeakMap values are weakly held.
- Assuming only ordinary objects can ever be weak keys in every modern runtime.
- Depending on WeakRef.deref() to return a particular result after dropping a reference.
- Depending on a FinalizationRegistry callback to run at a particular time.
- Using a finalizer instead of explicitly closing a file, socket, or other resource.
- Assuming a high process memory reading proves that objects are still reachable.
- Using an unbounded cache when a bounded Map would be more predictable.

## Practice

1. Draw a reference graph for an object stored in a global Map. Identify which references keep it reachable.
2. Create two objects that reference each other, then return from their creator function. Explain why the cycle alone does not prevent collection.
3. Store metadata for an object in a WeakMap and compare it with adding a property directly to the object.
4. Explain why a WeakMap cannot expose a size or iterator.
5. Add an object to a normal Map, remove the last local variable, and identify the remaining strong reference.
6. Register and remove an event listener using the same callback function.
7. Clear an interval and call an unsubscribe function when a component is disposed.
8. Use WeakRef.deref() while a strong reference still exists, then explain why dropping the strong reference does not prove immediate collection.
9. Register an object with FinalizationRegistry and explain why a program must not depend on the callback.
10. Capture repeated heap snapshots and use retaining paths to locate an unexpectedly live object.
11. Check whether a target runtime accepts non-registered symbols as WeakMap keys.
12. Decide whether a cache requires iteration, a size limit, or entries tied to object lifetime, then choose Map or WeakMap.

## Key points

- The garbage collector can reclaim unreachable objects, but collection timing is not under application control.
- A memory leak usually means that an unwanted reference keeps data reachable.
- Cycles are collectable when the whole cycle is unreachable.
- Map and Set strongly retain their entries; WeakMap and WeakSet do not strongly retain their keys or members.
- WeakMap and WeakSet are not enumerable because membership depends on garbage-collection state.
- WeakRef and FinalizationRegistry are nondeterministic and should support only optional behavior.
- Explicitly remove listeners, stop timers, unsubscribe, bound caches, and close external resources.
- Use heap snapshots and retaining paths to investigate repeated memory growth.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [78 - Proxy and Reflect](078-proxy-and-reflect.md) | [Open Q&A](../qnas/079-memory-garbage-collection-and-weak-references.md) | [Open example](../examples/079-memory-garbage-collection-and-weak-references.md) | [80 - Modules: scripts, modules, and module scope](080-modules-scripts-modules-and-module-scope.md) |
