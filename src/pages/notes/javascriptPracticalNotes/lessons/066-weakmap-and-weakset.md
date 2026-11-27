# 66 - WeakMap and WeakSet

**WeakMap** and **WeakSet** are collections for associating data with objects without making the collection a strong owner of those keys. A **WeakMap** stores key-value associations. A **WeakSet** records whether an object has been added. Their weak behavior is useful when metadata should follow an object's lifetime, but it also means their contents cannot be enumerated.

Use a regular **Map** or **Set** when you need to list entries, count them, or keep them until you explicitly remove them. Use a weak collection only when its lifetime behavior is part of the design.

## Learning goals

By the end of this chapter, you should be able to:

- Create and use a **WeakMap** and a **WeakSet**.
- Explain how weak collections differ from **Map** and **Set**.
- Associate metadata with an object without adding fields to that object.
- Track object membership without making a list of the objects.
- Explain why weak collections have no size or iteration methods.
- Recognize garbage collection timing is nondeterministic.
- Choose a weak collection only when its lifecycle behavior is useful.

## WeakMap: associate values with keys

A **WeakMap** stores key-value pairs. Its keys must be suitable weak keys. Objects and functions can be used as keys.

~~~js
const metadata = new WeakMap();

const request = { url: "/profile" };
metadata.set(request, { startedAt: 120 });

console.log(metadata.has(request));
console.log(metadata.get(request).startedAt);
~~~

Output:

~~~text
true
120
~~~

The metadata is associated with the **request** object without adding a **startedAt** property to it. The key comparison uses object identity, just like object keys in a regular map.

~~~js
const metadata = new WeakMap();
const first = { id: 1 };
const second = { id: 1 };

metadata.set(first, "private details");

console.log(metadata.get(first));
console.log(metadata.get(second));
~~~

Output:

~~~text
private details
undefined
~~~

**first** and **second** have similar contents, but they are separate object references.

## Weak keys and object lifetime

A regular **Map** strongly retains its keys while its entries remain in the map. A **WeakMap** does not keep an eligible key alive solely because that key is in the collection. If the key becomes otherwise unreachable, the garbage collector may reclaim it and its association.

~~~js
const cache = new WeakMap();

function createRecord(id) {
  const record = { id };
  cache.set(record, { label: "record " + id });
  return record;
}

const activeRecord = createRecord("r-1");

console.log(cache.get(activeRecord).label);
~~~

Output:

~~~text
record r-1
~~~

The example does not try to force garbage collection. JavaScript does not provide a reliable, ordinary way for a program to observe exactly when an object is collected. Collection timing depends on the runtime and memory pressure.

A weak collection is not a promise that a value will be collected immediately. It only avoids making the key live because of that weak association.

## WeakMap operations

A **WeakMap** supports these core operations:

- **set(key, value)** adds or updates a key-value association and returns the map.
- **get(key)** returns the associated value, or **undefined** when there is no entry.
- **has(key)** checks whether the key has an entry.
- **delete(key)** removes the entry and returns whether it existed.

~~~js
const labels = new WeakMap();
const node = {};

labels.set(node, "navigation");
console.log(labels.has(node));
console.log(labels.get(node));
console.log(labels.delete(node));
console.log(labels.has(node));
~~~

Output:

~~~text
true
navigation
true
false
~~~

As with **Map**, **get()** alone cannot distinguish an absent entry from an entry whose value is **undefined**. Use **has()** when that distinction matters.

WeakMap keys cannot be enumerated. A **WeakMap** has no **size**, **keys()**, **values()**, **entries()**, **forEach()**, or **clear()** operation. Those omissions are intentional: if a weak collection could list all its keys, the list would expose which objects remain alive and would make behavior depend on garbage collection.

## Insert a default only when a key is missing

Current ECMAScript also defines **getOrInsert(key, defaultValue)** and **getOrInsertComputed(key, callback)**. They return the existing value when the key is already present. Otherwise, **getOrInsert()** stores and returns the supplied default, while **getOrInsertComputed()** calls the callback with the key, stores its result, and returns that result.

These convenience methods may not be available in older JavaScript runtimes. Check support when code must run across a range of environments. The familiar **has()** and **set()** operations remain a portable fallback.

~~~js
const cache = new WeakMap();
const node = {};
let calculations = 0;

const first = cache.getOrInsertComputed(node, (key) => {
  calculations += 1;
  return { label: "node metadata" };
});

const second = cache.getOrInsertComputed(node, () => {
  calculations += 1;
  return { label: "replacement" };
});

console.log(first.label);
console.log(first === second);
console.log(calculations);
~~~

Output in a runtime that supports **getOrInsertComputed()**:

~~~text
node metadata
true
1
~~~

**Explanation:** The first call computes and stores the value. The second call finds the existing entry, so it does not run its callback. An existing entry whose value is **undefined** still counts as present.

For older runtimes, the same lazy pattern can be written with **has()** and **set()**:

~~~js
function getOrCreate(cache, key, createValue) {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const value = createValue(key);
  cache.set(key, value);
  return value;
}
~~~

The fallback invokes the callback only when the key is absent. It also handles a stored **undefined** correctly because it checks **has()** first.
## Associate metadata without changing the object

A weak map is useful when code needs to associate data with objects it does not own or should not modify.

~~~js
const validationMessages = new WeakMap();

function setValidationMessage(field, message) {
  validationMessages.set(field, message);
}

function getValidationMessage(field) {
  return validationMessages.get(field);
}

const field = { name: "email" };
setValidationMessage(field, "Enter a valid address.");

console.log(field.name);
console.log(getValidationMessage(field));
~~~

Output:

~~~text
email
Enter a valid address.
~~~

The field object remains unchanged. The metadata lives separately and is looked up using the field's identity.

This can be helpful with DOM nodes, library objects, or records owned by another part of an application. The weak map does not provide a list of all objects with metadata. If the application needs that list, use a regular map and explicitly manage its lifecycle.

## Use a WeakMap for private per-instance data

Before JavaScript private class fields were available, a module-scoped **WeakMap** was a common way to store per-instance details outside the instances themselves.

~~~js
const privateData = new WeakMap();

class Account {
  constructor(name, balance) {
    privateData.set(this, { name, balance });
  }

  deposit(amount) {
    const data = privateData.get(this);
    data.balance += amount;
  }

  summary() {
    const data = privateData.get(this);
    return data.name + ": " + data.balance;
  }
}

const account = new Account("Mina", 40);
account.deposit(15);

console.log(account.summary());
console.log(Object.hasOwn(account, "balance"));
~~~

Output:

~~~text
Mina: 55
false
~~~

The weak map keeps the private data associated with each instance. When an account instance is no longer reachable elsewhere, the weak association does not keep that instance alive by itself.

For new class designs, private fields such as **#balance** usually make the intent clearer. A module-scoped weak map can still be useful when metadata must be attached to objects that cannot be modified or when a library needs an external association.

## WeakSet: record object membership

A **WeakSet** records whether an object or another suitable weak key is present. It stores no separate value for each entry.

~~~js
const processed = new WeakSet();

const message = { id: "m-4" };

console.log(processed.has(message));
processed.add(message);
console.log(processed.has(message));
~~~

Output:

~~~text
false
true
~~~

Like a **WeakMap**, a **WeakSet** does not keep an eligible object alive solely because the object is in the set. Weak set values are compared by identity.

~~~js
const visited = new WeakSet();
const firstNode = { id: "n1" };
const secondNode = { id: "n1" };

visited.add(firstNode);

console.log(visited.has(firstNode));
console.log(visited.has(secondNode));
~~~

Output:

~~~text
true
false
~~~

The objects have the same property but are different references.

## Use a WeakSet to track visited objects

A weak set can prevent processing the same object more than once while allowing the set itself not to retain those objects.

~~~js
const visited = new WeakSet();

function visit(node) {
  if (visited.has(node)) {
    console.log("Already visited " + node.name);
    return;
  }

  visited.add(node);
  console.log("Visiting " + node.name);
}

const first = { name: "root" };
visit(first);
visit(first);
~~~

Output:

~~~text
Visiting root
Already visited root
~~~

This pattern is useful for object graph traversal, cycle detection, and marking objects already handled during a task. It only answers whether a particular object is present. It cannot tell you which objects have been visited.

A regular **Set** is better if the program needs to enumerate visited objects, display them, or count them.

## WeakSet operations

A **WeakSet** supports:

- **add(value)** to add a value and return the set.
- **has(value)** to check whether the value is present.
- **delete(value)** to remove the value and report whether it existed.

~~~js
const active = new WeakSet();
const connection = {};

active.add(connection);
console.log(active.has(connection));
console.log(active.delete(connection));
console.log(active.has(connection));
~~~

Output:

~~~text
true
true
false
~~~

A weak set cannot be enumerated. It has no **size**, **keys()**, **values()**, **entries()**, **forEach()**, or **clear()** method.

## Weak keys and symbols

Current ECMAScript permits non-registered symbols as weak keys and weak set values, in addition to objects. A symbol returned by **Symbol.for()** is registered and is not suitable as a weak key. Older JavaScript runtimes may not support symbols as weak keys, so code that relies on this feature should account for the engines it needs to run in.

~~~js
const metadata = new WeakMap();
const localToken = Symbol("local");

metadata.set(localToken, "token metadata");
console.log(metadata.get(localToken));
~~~

Output in a runtime that supports symbols as weak keys:

~~~text
token metadata
~~~

A unique symbol is useful only when its identity is retained and reused. Creating another symbol with the same description creates a different symbol. For broad compatibility, objects remain the usual choice for weak keys.

## WeakMap versus Map

A regular **Map** and a **WeakMap** solve related but different problems.

| Need | Choose |
| --- | --- |
| Keys can be primitives | **Map** |
| Entries need to be listed or counted | **Map** |
| The collection must keep keys available until removal | **Map** |
| Metadata belongs to an object's lifetime | **WeakMap** |
| The collection should not keep object keys alive by itself | **WeakMap** |
| The program needs to enumerate every key | **Map** |

~~~js
const strongCache = new Map();
const weakMetadata = new WeakMap();

const objectKey = {};
strongCache.set(objectKey, "listed entry");
weakMetadata.set(objectKey, "lifetime-associated metadata");

console.log(strongCache.size);
console.log(weakMetadata.has(objectKey));
~~~

Output:

~~~text
1
true
~~~

The weak map cannot report its size. The map retains the entry until it is explicitly deleted or the map itself becomes unreachable.

## WeakSet versus Set

A regular **Set** can store primitive values and can be listed. A **WeakSet** is for membership of weakly held keys and cannot be listed.

| Need | Choose |
| --- | --- |
| Store strings, numbers, or other primitive values | **Set** |
| Iterate over all values or read the count | **Set** |
| Track object membership without retaining the objects by itself | **WeakSet** |
| Detect whether a particular object was already visited | **WeakSet** |
| Display or count all visited objects | **Set** |

~~~js
const selectedIds = new Set(["u1", "u2"]);
const processedObjects = new WeakSet();

const record = { id: "r1" };
processedObjects.add(record);

console.log(selectedIds.has("u2"));
console.log(processedObjects.has(record));
~~~

Output:

~~~text
true
true
~~~

Identifiers such as strings belong in a regular set. A weak set is useful for object identity membership.

## Weak collections are not caches with predictable cleanup

Weak collections are sometimes used for object-associated caches, but they do not offer cleanup callbacks or deterministic eviction. The program cannot ask when an entry disappears.

~~~js
const cache = new WeakMap();

function getMetadata(object) {
  if (!cache.has(object)) {
    cache.set(object, { created: true });
  }

  return cache.get(object);
}

const item = {};
console.log(getMetadata(item).created);
~~~

Output:

~~~text
true
~~~

As long as **item** remains reachable, the association can be looked up. If no other strong reference keeps it alive, the runtime may collect it later. Do not make essential program behavior depend on the exact collection time.

If a cache needs a maximum size, expiration time, statistics, or a visible eviction policy, build that policy with a regular map or another explicit data structure.

## Common mistakes

### Expecting to iterate a WeakMap

~~~js
const metadata = new WeakMap();
metadata.set({}, "value");

console.log(typeof metadata[Symbol.iterator]);
console.log("size" in metadata);
~~~

Output:

~~~text
undefined
false
~~~

A weak map does not expose keys or size. If enumeration is required, use a regular **Map** and manage its entries.

### Using a primitive string as a weak key

~~~js
const metadata = new WeakMap();

try {
  metadata.set("user-1", { role: "editor" });
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

Strings and numbers cannot be weak keys. Use an object key or use a regular **Map** when a primitive key is required.

### Expecting garbage collection immediately

~~~js
const processed = new WeakSet();
let item = { name: "temporary" };

processed.add(item);
item = null;
~~~

There is no reliable output to assert here. Setting **item** to **null** removes that variable's strong reference, but collection timing is nondeterministic. The set does not provide a method to check whether the unreachable object was collected.

## Decide whether to use a weak collection

Ask these questions before choosing **WeakMap** or **WeakSet**:

1. Is the key or value an object whose identity matters?
2. Should the collection avoid keeping that object alive by itself?
3. Do I only need lookup or membership, not enumeration or size?
4. Can the program work without knowing when garbage collection occurs?
5. Would a regular **Map** or **Set** make ownership and cleanup more explicit?
6. Is there already a strong reference elsewhere that would keep the object alive?

Use weak collections for identity-based associations whose lifetime should follow their keys. Do not use them merely because their names sound memory-efficient.

## Try it yourself

1. Associate display metadata with objects using a **WeakMap**.
2. Show that two objects with equal-looking fields are different weak keys.
3. Use **has()** to distinguish a stored **undefined** value from a missing weak-map entry.
4. Mark visited nodes in a **WeakSet** and skip repeated nodes.
5. Try to enumerate a weak collection and explain why the operation is unavailable.
6. Decide whether a cache needs **Map** or **WeakMap** based on whether it needs size and iteration.
7. Store a primitive identifier in a regular **Map** and an object in a **WeakMap**.
8. Compare a module-scoped **WeakMap** for private instance data with a class private field.
9. Explain why setting the last variable to **null** does not prove immediate collection.
10. Check the supported runtime before relying on symbol weak keys.

## Key points

- **WeakMap** associates values with weak keys. **WeakSet** tracks weak membership.
- Objects and functions are the common weak keys. Current ECMAScript also permits non-registered symbols, but older runtimes may not support them.
- Weak collections do not keep eligible keys alive solely because an entry exists.
- Garbage collection is nondeterministic and must not control essential application behavior.
- Weak collections cannot be enumerated and do not expose **size** or **clear()**.
- Use a regular **Map** or **Set** when keys or values must be listed, counted, or retained deliberately.
- Weak collections compare keys and values by identity.
- Choose weak collections for object-lifetime associations, not as a general replacement for maps and sets.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [65 - Map and Set collections](065-map-and-set-collections.md) | [Open Q&A](../qnas/066-weakmap-and-weakset.md) | [Open example](../examples/066-weakmap-and-weakset.md) | [67 - Symbols and well-known symbols](067-symbols-and-well-known-symbols.md) |
