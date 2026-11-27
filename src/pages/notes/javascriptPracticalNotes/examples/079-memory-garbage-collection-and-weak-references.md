# 79 - Memory, garbage collection, and weak references example

This example contrasts a normal Map with a WeakMap, uses a WeakSet to avoid revisiting cyclic objects, demonstrates a WeakRef while its target is strongly held, and registers a best-effort finalization hint. It never assumes that garbage collection runs during the example.

## Goal

Recognize which references keep values available, perform deterministic cleanup where the application controls the lifecycle, and use weak-reference APIs without depending on nondeterministic collection timing.

## Complete example

Copy this into **79-memory-and-weak-references.mjs** and run it in a modern JavaScript runtime.

~~~js
const strongCache = new Map();

let report = {
  title: 'Monthly report'
};

strongCache.set(report, 'cached');

report = null;

console.log('Map entries after local reference is cleared:', strongCache.size);
strongCache.clear();
console.log('Map entries after explicit clear:', strongCache.size);

const metadata = new WeakMap();

let button = {
  id: 'save-button'
};

metadata.set(button, {
  label: 'Save',
  clickCount: 0
});

console.log('WeakMap metadata:', metadata.get(button).label);
console.log('WeakMap has button:', metadata.has(button));
console.log('WeakMap is iterable:', typeof metadata[Symbol.iterator] === 'function');

button = null;

function visitGraph() {
  const first = {
    name: 'first'
  };

  const second = {
    name: 'second'
  };

  first.next = second;
  second.next = first;

  const visited = new WeakSet();

  function visit(node) {
    if (visited.has(node)) {
      console.log('Already visited:', node.name);
      return;
    }

    visited.add(node);
    console.log('Visit:', node.name);

    if (node.next) {
      visit(node.next);
    }
  }

  visit(first);
}

visitGraph();

if (typeof WeakRef === 'function') {
  function createWeakLogoReference() {
    const image = {
      name: 'logo'
    };

    const imageRef = new WeakRef(image);
    const availableImage = imageRef.deref();

    console.log(
      'WeakRef while strongly held:',
      availableImage === undefined ? 'unavailable' : availableImage.name
    );

    return imageRef;
  }

  const imageRef = createWeakLogoReference();
} else {
  console.log('WeakRef is not available in this runtime');
}

if (typeof FinalizationRegistry === 'function') {
  const cleanupHints = [];

  const registry = new FinalizationRegistry(function (heldValue) {
    cleanupHints.push(heldValue);
  });

  let temporaryObject = {
    id: 'temporary'
  };

  registry.register(temporaryObject, 'temporary-object');
  console.log('FinalizationRegistry registration created');

  temporaryObject = null;

  // A cleanup callback may run later, or may not run before the program exits.
  // The example does not inspect cleanupHints or depend on finalization.
} else {
  console.log('FinalizationRegistry is not available in this runtime');
}

const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);

  return function unsubscribe() {
    listeners.delete(callback);
    callback = null;
  };
}

let notificationCount = 0;

const unsubscribe = subscribe(function () {
  notificationCount += 1;
});

function publish() {
  for (const listener of listeners) {
    listener();
  }
}

publish();
unsubscribe();
publish();

console.log('Notifications before unsubscribe:', notificationCount);
console.log('Listeners after unsubscribe:', listeners.size);
~~~

## Expected output

A runtime that provides WeakRef and FinalizationRegistry prints:

~~~text
Map entries after local reference is cleared: 1
Map entries after explicit clear: 0
WeakMap metadata: Save
WeakMap has button: true
WeakMap is iterable: false
Visit: first
Visit: second
Already visited: first
WeakRef while strongly held: logo
FinalizationRegistry registration created
Notifications before unsubscribe: 1
Listeners after unsubscribe: 0
~~~

If WeakRef or FinalizationRegistry is unavailable, its corresponding fallback message appears instead. A finalization callback is not printed or required. Its timing is not predictable.

## How it works

### A normal Map keeps its entry

After **report** is set to null, the Map still contains its object key and value. Its size remains one. Calling clear() is a deterministic way to remove every Map entry when that is the intended lifecycle action.

A WeakMap is different: its object key is weakly held. The example reads metadata while **button** is available, then removes the local reference. It does not try to prove that collection occurred. WeakMap has no iterator because key liveness is intentionally unobservable.

### WeakSet tracks visited objects

The two nodes form a cycle. The traversal records each node in a WeakSet before following the next link. When it reaches the first node again, it detects that it has already visited it and stops recursing.

The graph is local to visitGraph(), so its strong local references go away when the function returns. The cycle is then eligible for collection if no other live root retains it, but the example does not observe or depend on collection.

### WeakRef is optional access

The image object is still strongly referenced by **image** when deref() runs, so the output is stable. The function returns only the WeakRef, and its local strong references go out of scope. The example does not dereference it later and assume a particular result.

If an application does dereference later, it must handle both an available object and undefined:

~~~js
const value = imageRef.deref();

if (value !== undefined) {
  displayImage(value);
} else {
  loadImageAgain();
}
~~~

A WeakRef is appropriate only when the application can continue correctly if the object has disappeared or remains alive longer than expected.

### Finalization is only a hint

The registry receives a held value that does not refer to **temporaryObject**. The callback records the hint, but the program does not wait for it or rely on it. It may run later, or not at all before shutdown.

Use FinalizationRegistry only for optional cleanup or cache maintenance. Close files, sockets, and other required resources explicitly.

### Unsubscribe removes a strong reference

The Set strongly retains its callback. The unsubscribe function deletes that exact callback from the Set and clears its own callback reference. The second publish does not call it, and the Set is empty afterward.

This deterministic lifecycle pattern is preferable for listeners and subscriptions. A forgotten callback can retain its closure and everything reachable from it.

## Try these changes

1. Remove strongCache.clear() and check the Map size again.
2. Replace Map with WeakMap and note which operations are no longer available.
3. Add another object to the cycle and confirm that the WeakSet prevents repeat visits.
4. Keep button in a normal Map and compare the ownership relationship with WeakMap metadata.
5. Add a strong Set that holds the image, then remove the local image reference and reason about reachability.
6. Call imageRef.deref() in a later task and handle both possible results without assuming when collection occurs.
7. Change the FinalizationRegistry held value, making sure it does not contain temporaryObject.
8. Add a timer or listener and implement a matching cleanup function.
9. Call unsubscribe twice and observe that deleting an already-removed Set entry is harmless.
10. Inspect a heap snapshot after repeating a UI flow and look for retaining paths.

## Important boundaries

- The output does not demonstrate that garbage collection occurred.
- A WeakMap or WeakSet does not expose when its keys or members are collected.
- WeakRef.deref() can return the target or undefined depending on collection.
- A finalization callback is not guaranteed to run promptly or before shutdown.
- Map, Set, listeners, timers, and closures can retain objects strongly.
- Explicit cleanup is required for listeners, subscriptions, timers, and external resources.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [78 - Proxy and Reflect](../lessons/078-proxy-and-reflect.md) | [Open lesson](../lessons/079-memory-garbage-collection-and-weak-references.md) | [Open Q&A](../qnas/079-memory-garbage-collection-and-weak-references.md) | [80 - Modules: scripts, modules, and module scope](../lessons/080-modules-scripts-modules-and-module-scope.md) |
