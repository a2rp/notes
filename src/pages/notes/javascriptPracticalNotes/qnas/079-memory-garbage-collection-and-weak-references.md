# 79 - Memory, garbage collection, and weak references Q&A

These questions review reachability, strong references, memory leaks, deterministic cleanup, Map and WeakMap, WeakRef, and FinalizationRegistry. Each answer follows its question.

## Reachability and garbage collection

### 1. What does the JavaScript garbage collector do?

**Answer:** It reclaims memory used by values that are no longer reachable by the program.

**Explanation:** JavaScript manages object memory automatically. Code normally removes references or ends an object's lifetime rather than manually freeing its memory.

### 2. What does reachable mean in a garbage-collection model?

**Answer:** The program can still access the value from a live root by following references.

**Explanation:** A root can lead to properties, collection entries, closure state, and other objects. Those objects are reachable through the graph.

### 3. What is a strong reference?

**Answer:** An ordinary reference that keeps its target reachable while the reference itself remains reachable.

**Explanation:** Examples include a variable, object property, array entry, or an entry in a normal Map.

### 4. What does it mean for an object to be eligible for collection?

**Answer:** No live root can reach it.

**Explanation:** Eligible does not mean already reclaimed. The engine chooses when or whether to run collection.

### 5. Does setting a variable to null immediately free the former object's memory?

**Answer:** No.

**Explanation:** It removes that variable's reference. Other references may still keep the object reachable, and even an unreachable object is collected on the engine's schedule.

### 6. Can two objects that refer to each other still be collected?

**Answer:** Yes, if the cycle is unreachable from all live roots.

**Explanation:** Modern garbage collection is based on reachability rather than simply counting references. A cycle by itself is not a leak.

### 7. What is a memory leak in a garbage-collected program?

**Answer:** Unneeded data remains reachable, often because an unintended reference is retained.

**Explanation:** The collector cannot reclaim an object that the application can still access, even if the application no longer intends to use it.

### 8. Why is a large memory reading not enough to prove a leak?

**Answer:** The runtime may retain heap space for reuse after objects are collected, and one reading does not show which objects remain reachable.

**Explanation:** Reproduce the same flow and inspect heap snapshots and retaining paths for repeatable growth.

### 9. What does a retaining path show?

**Answer:** A chain of references from a live root to an object.

**Explanation:** It helps identify which global, collection, listener, closure, or other owner is keeping the object alive.

### 10. Why can a global Map cause unbounded memory growth?

**Answer:** A reachable Map strongly retains its keys and values until entries are removed or the Map becomes unreachable.

**Explanation:** If an application keeps adding entries without a limit or deletion policy, old objects remain reachable.

## Common retention sources and cleanup

### 11. Why can a forgotten event listener retain data?

**Answer:** The event target can retain the callback, and the callback can retain values from its closure.

**Explanation:** Remove the listener when its owner is disposed, using the same callback identity and matching options.

### 12. What should code do with an interval that is no longer needed?

**Answer:** Call clearInterval with its saved timer identifier.

**Explanation:** An active timer can keep callbacks and values they capture alive, and it continues doing work.

### 13. What is one way to stop a subscription when an owner is finished?

**Answer:** Call the unsubscribe or dispose function returned by the subscription API.

**Explanation:** Explicit lifecycle cleanup is deterministic and does not rely on garbage collection.

### 14. How can an AbortController help manage event listeners?

**Answer:** Register listeners with its signal, then call abort() to remove the listeners using that signal.

**Explanation:** This can group listener cleanup when the API supports the signal option.

### 15. How can a closure contribute to retention?

**Answer:** A retained function may keep values from its surrounding scope reachable.

**Explanation:** If a long-lived callback captures a large object, remove the callback or design it to capture only the data it needs.

### 16. What should be used to release a socket or file promptly?

**Answer:** The resource's explicit close or dispose mechanism, usually in a deterministic cleanup path.

**Explanation:** Garbage collection timing is not suitable for resources that must be released on time. Use try/finally or the API's resource-management pattern.

### 17. What is a good first step when investigating repeated memory growth?

**Answer:** Reproduce the same user flow and compare heap snapshots and retaining paths before and after.

**Explanation:** Repeated, comparable measurements help distinguish retained objects from normal temporary allocations and runtime heap reuse.

## Map, WeakMap, Set, and WeakSet

### 18. How does a normal Map treat an object key?

**Answer:** It strongly retains the key and associated value while the Map remains reachable.

**Explanation:** Removing another variable that pointed to the key does not remove the Map entry.

### 19. When is Map a better choice than WeakMap?

**Answer:** When the program needs to enumerate entries, inspect size, or intentionally retain the entries.

**Explanation:** WeakMap does not expose its keys or size. A Map also supports explicit policies such as bounded caches and deletion.

### 20. What can be used as a WeakMap key?

**Answer:** Objects are the common choice. Modern runtimes may also allow non-registered symbols.

**Explanation:** Weak symbol support can vary, so feature-detect it when targeting multiple runtimes. Registered and well-known symbols are not weakly held keys.

### 21. Why can a string not be a WeakMap key?

**Answer:** A string is a primitive value with no collectible object identity.

**Explanation:** Weak keys must be values whose lifetime can be tracked by garbage collection. Use Map for string keys.

### 22. Why is WeakMap not iterable and why does it have no size?

**Answer:** Enumerating keys would expose which keys the garbage collector has retained or reclaimed, making results nondeterministic.

**Explanation:** Use Map when listing keys or counting entries is part of the requirement. WeakMap also has no clear() method.

### 23. What is a common use for WeakMap?

**Answer:** Associating metadata with an object without making that object live solely because of the metadata table.

**Explanation:** Examples include per-instance metadata or data associated with a DOM node while it remains in use.

### 24. Are WeakMap values weakly held?

**Answer:** No. A value is available through the association while its key is live, and it can be collected with the association if nothing else retains it.

**Explanation:** The weak part is the key's relationship to the map. A value that is separately referenced remains reachable.

### 25. Can a WeakMap value refer back to its key and keep that key alive by itself?

**Answer:** No. WeakMap entries have ephemeron-like behavior, so the association does not keep an otherwise unreachable key alive merely because its value points back to it.

**Explanation:** If other live references keep the key reachable, the entry's value is reachable too. A separate strong reference to the value also keeps that value alive.

### 26. What does WeakSet weakly hold?

**Answer:** Its object members, and non-registered symbols in runtimes that support weak symbols.

**Explanation:** WeakSet is useful for tracking object membership without making those members live only because of the set. It is not enumerable.

### 27. What is the difference between WeakMap and WeakSet?

**Answer:** WeakMap associates a key with a value. WeakSet records membership of a value.

**Explanation:** Both avoid strongly retaining their weak keys or members and neither exposes enumeration or a size.

## WeakRef and FinalizationRegistry

### 28. What does WeakRef provide?

**Answer:** An optional way to obtain its target without keeping that target alive indefinitely.

**Explanation:** It is a specialized API. Prefer WeakMap or a bounded cache when those better express the requirement.

### 29. What can WeakRef.deref() return?

**Answer:** The target while it remains available, or undefined after it has been reclaimed.

**Explanation:** A runtime can keep a target alive longer than expected, so code must handle both outcomes.

### 30. Does deref() returning a target mean it can be collected in the middle of the current JavaScript job?

**Answer:** No. A target just obtained from deref() is kept alive at least until the end of the current job.

**Explanation:** Keep the dereferenced value in a local variable while using it, and do not assume the same result in a later job.

### 31. Can code require a WeakRef target to be collected immediately after its strong reference is dropped?

**Answer:** No.

**Explanation:** The garbage collector decides whether and when to collect. A WeakRef may continue returning its target for an unpredictable amount of time.

### 32. What does FinalizationRegistry do?

**Answer:** It requests a cleanup callback after a registered target becomes unreachable and is collected.

**Explanation:** The callback is best-effort. It may run much later or may never run before the program exits.

### 33. Should a finalizer close a required file or socket?

**Answer:** No.

**Explanation:** Required cleanup must be explicit and deterministic. A finalizer can only be an optional cleanup hint.

### 34. What does a FinalizationRegistry callback receive?

**Answer:** The held value provided when the target was registered, not the target itself.

**Explanation:** The held value should not strongly reference the target, directly or indirectly, or it may prevent finalization.

### 35. What does FinalizationRegistry.unregister(token) do?

**Answer:** It removes registrations associated with the supplied unregister token.

**Explanation:** Unregistration is an explicit operation. It does not make any guarantee about when a target would otherwise be collected.

### 36. Why should application logic not depend on a finalizer running?

**Answer:** Its timing is nondeterministic, and it may not run at all before shutdown.

**Explanation:** A finalizer must not be responsible for required program state changes, user-visible behavior, or timely resource release.

### 37. Can WeakRef replace a bounded cache?

**Answer:** Usually not by itself.

**Explanation:** A cache may still retain keys, WeakRef wrappers, and bookkeeping. A bounded cache has predictable limits and cleanup; WeakRef behavior is nondeterministic.

## Applied questions

### 38. What is printed by this code?

~~~js
const cache = new Map();
let item = { id: 1 };

cache.set(item, 'saved');
item = null;

console.log(cache.size);
~~~

**Answer:** 1.

**Explanation:** The Map still retains the original object as a key. Setting the local variable to null does not delete the entry.

### 39. How can metadata be associated with a DOM node without adding a property to the node?

**Answer:**

~~~js
const metadata = new WeakMap();
const node = document.createElement('button');

metadata.set(node, { label: 'Save' });
console.log(metadata.get(node).label);
~~~

~~~text
Save
~~~

**Explanation:** The metadata is stored outside the node. The WeakMap does not keep the node alive solely because it is a key.

### 40. Which statement best summarizes safe JavaScript memory management?

- A. Set every unused variable to null to force immediate collection.
- B. Use WeakRef for every cache.
- C. Remove unintended strong references and explicitly clean up listeners, timers, subscriptions, and external resources.
- D. Avoid all object cycles.

**Answer:** C.

**Explanation:** Garbage collection reclaims unreachable objects on its own schedule. Application code controls object reachability and deterministic resource cleanup, not the collector's timing.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [78 - Proxy and Reflect](../lessons/078-proxy-and-reflect.md) | [Lesson](../lessons/079-memory-garbage-collection-and-weak-references.md) Â· [Example](../examples/079-memory-garbage-collection-and-weak-references.md) | [80 - Modules: scripts, modules, and module scope](../lessons/080-modules-scripts-modules-and-module-scope.md) |
