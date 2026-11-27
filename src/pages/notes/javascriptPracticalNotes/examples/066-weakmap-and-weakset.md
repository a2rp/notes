# 66 - WeakMap and WeakSet: Examples

These examples demonstrate object-associated metadata, membership tracking, weak collection operations, and compatibility-aware WeakMap helpers. Garbage collection timing is never used as an expected output.

## 1. Associate metadata with an object

**Task:** Store metadata without changing the object.

~~~js
const metadata = new WeakMap();
const request = { url: "/profile" };

metadata.set(request, {
  startedAt: 120,
  source: "navigation"
});

console.log(metadata.has(request));
console.log(metadata.get(request).source);
console.log(Object.hasOwn(request, "source"));
~~~

Expected output:

~~~text
true
navigation
false
~~~

**Explanation:** The weak map uses the request object's identity as a key. The object does not gain a **source** property.

## 2. Use the same object reference to look up data

**Task:** Compare a key with another object that has the same properties.

~~~js
const labels = new WeakMap();
const first = { id: "x1" };
const second = { id: "x1" };

labels.set(first, "first object");

console.log(labels.get(first));
console.log(labels.get(second));
~~~

Expected output:

~~~text
first object
undefined
~~~

**Explanation:** The two objects contain similar data but have different identities. WeakMap keys are matched by identity.

## 3. Distinguish an undefined value from a missing key

**Task:** Check for a stored **undefined** value.

~~~js
const results = new WeakMap();
const item = {};

results.set(item, undefined);

console.log(results.get(item));
console.log(results.has(item));
~~~

Expected output:

~~~text
undefined
true
~~~

**Explanation:** **get()** returns the stored value, while **has()** confirms that the entry exists.

## 4. Update and remove a WeakMap entry

**Task:** Use the core weak map operations.

~~~js
const metadata = new WeakMap();
const element = {};

metadata.set(element, "button");
console.log(metadata.get(element));

metadata.set(element, "submit button");
console.log(metadata.get(element));

console.log(metadata.delete(element));
console.log(metadata.has(element));
~~~

Expected output:

~~~text
button
submit button
true
false
~~~

**Explanation:** Setting the same key updates its value. **delete()** removes the association and reports whether an entry existed.

## 5. Keep metadata outside a DOM-like object

**Task:** Associate a validation message without adding it to the field object.

~~~js
const messages = new WeakMap();

function setMessage(field, message) {
  messages.set(field, message);
}

function getMessage(field) {
  return messages.get(field);
}

const field = { name: "email" };
setMessage(field, "Enter a valid address.");

console.log(getMessage(field));
console.log(Object.hasOwn(field, "message"));
~~~

Expected output:

~~~text
Enter a valid address.
false
~~~

**Explanation:** The validation message is held separately. The same pattern can be used for objects owned by another module or library.

## 6. Store private per-instance data with a WeakMap

**Task:** Keep account details outside the instance.

~~~js
const privateData = new WeakMap();

class Account {
  constructor(owner, balance) {
    privateData.set(this, { owner, balance });
  }

  deposit(amount) {
    privateData.get(this).balance += amount;
  }

  summary() {
    const data = privateData.get(this);
    return data.owner + ": " + data.balance;
  }
}

const account = new Account("Mina", 40);
account.deposit(15);

console.log(account.summary());
console.log(Object.hasOwn(account, "balance"));
~~~

Expected output:

~~~text
Mina: 55
false
~~~

**Explanation:** The weak map associates the private data with each instance. New class designs can often use private fields, but external associations remain useful for objects that should not be modified.

## 7. Track one processed object in a WeakSet

**Task:** Mark an object after processing it.

~~~js
const processed = new WeakSet();
const message = { id: "m-4" };

console.log(processed.has(message));
processed.add(message);
console.log(processed.has(message));
~~~

Expected output:

~~~text
false
true
~~~

**Explanation:** A weak set records membership for the object's identity. It stores no separate value.

## 8. Avoid visiting the same object twice

**Task:** Skip an object that has already been visited.

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

const node = { name: "root" };
visit(node);
visit(node);
~~~

Expected output:

~~~text
Visiting root
Already visited root
~~~

**Explanation:** The second call presents the same reference, so the weak set recognizes it.

## 9. Prevent cycles while walking an object graph

**Task:** Traverse a cyclic graph without processing a node twice.

~~~js
const visited = new WeakSet();

function walk(node) {
  if (visited.has(node)) {
    return;
  }

  visited.add(node);
  console.log(node.name);

  for (const neighbor of node.neighbors) {
    walk(neighbor);
  }
}

const first = { name: "first", neighbors: [] };
const second = { name: "second", neighbors: [] };

first.neighbors.push(second);
second.neighbors.push(first);

walk(first);
~~~

Expected output:

~~~text
first
second
~~~

**Explanation:** The weak set detects that the traversal returns to **first** and stops that branch. The graph may contain cycles without causing infinite recursion.

## 10. Use the WeakSet membership operations

**Task:** Add, check, and delete one object.

~~~js
const active = new WeakSet();
const connection = {};

active.add(connection);
console.log(active.has(connection));
console.log(active.delete(connection));
console.log(active.has(connection));
~~~

Expected output:

~~~text
true
true
false
~~~

**Explanation:** **add()**, **has()**, and **delete()** operate on the supplied object's identity.

## 11. Handle an invalid primitive WeakMap key

**Task:** See how a weak map responds to a string key.

~~~js
const metadata = new WeakMap();

console.log(metadata.get("user-1"));
console.log(metadata.has("user-1"));
console.log(metadata.delete("user-1"));

try {
  metadata.set("user-1", { role: "editor" });
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Expected output:

~~~text
undefined
false
false
true
~~~

**Explanation:** For a non-weak key, **get()** returns **undefined**, and **has()** and **delete()** return **false**. **set()** throws a **TypeError**. Use a regular **Map** for primitive keys.

## 12. Handle an invalid primitive WeakSet value

**Task:** Check the behavior of a string passed to a weak set.

~~~js
const visited = new WeakSet();

console.log(visited.has("node"));
console.log(visited.delete("node"));

try {
  visited.add("node");
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Expected output:

~~~text
false
false
true
~~~

**Explanation:** A string is not a suitable weak value. A weak set can only track values that are weakly holdable.

## 13. Confirm that weak collections cannot be enumerated

**Task:** Inspect the collection methods without trying to read its entries.

~~~js
const weakMap = new WeakMap();
const weakSet = new WeakSet();

console.log(typeof weakMap.keys);
console.log(typeof weakMap[Symbol.iterator]);
console.log("size" in weakMap);
console.log(typeof weakSet.values);
console.log(typeof weakSet[Symbol.iterator]);
console.log("size" in weakSet);
~~~

Expected output:

~~~text
undefined
undefined
false
undefined
undefined
false
~~~

**Explanation:** Weak collections deliberately omit enumeration and size. If the application needs to list or count entries, use regular **Map** or **Set**.

## 14. Compare a regular Map and a WeakMap

**Task:** See which collection exposes its count.

~~~js
const map = new Map();
const weakMap = new WeakMap();
const object = {};

map.set(object, "listed");
weakMap.set(object, "associated");

console.log(map.size);
console.log(weakMap.has(object));
console.log(weakMap.size);
~~~

Expected output:

~~~text
1
true
undefined
~~~

**Explanation:** The regular map exposes its number of entries. The weak map supports lookup for a known key but has no **size** property.

## 15. Use getOrInsert with a fallback value

**Task:** Insert a default value only if the key is absent.

~~~js
const cache = new WeakMap();
const node = {};

if (typeof cache.getOrInsert === "function") {
  const first = cache.getOrInsert(node, { visits: 0 });
  const second = cache.getOrInsert(node, { visits: 100 });

  console.log(first === second);
  console.log(second.visits);
} else {
  console.log("getOrInsert is not available in this runtime");
}
~~~

Expected output in a runtime that supports the method:

~~~text
true
0
~~~

**Explanation:** The first call inserts the default. The second call returns the existing value instead of replacing it. This newer method may not exist in older runtimes.

## 16. Lazily compute a WeakMap value when available

**Task:** Run the callback only when the key has no entry.

~~~js
const cache = new WeakMap();
const node = {};
let calls = 0;

if (typeof cache.getOrInsertComputed === "function") {
  const first = cache.getOrInsertComputed(node, () => {
    calls += 1;
    return { label: "node metadata" };
  });

  const second = cache.getOrInsertComputed(node, () => {
    calls += 1;
    return { label: "replacement" };
  });

  console.log(first === second);
  console.log(first.label);
  console.log(calls);
} else {
  console.log("getOrInsertComputed is not available in this runtime");
}
~~~

Expected output in a runtime that supports the method:

~~~text
true
node metadata
1
~~~

**Explanation:** The first call creates the value. The next call finds the existing key, returns its current value, and skips the callback. Check support before using this newer helper.

## 17. Use a portable lazy creation helper

**Task:** Create the association only when the key is absent.

~~~js
function getOrCreate(weakMap, key, createValue) {
  if (weakMap.has(key)) {
    return weakMap.get(key);
  }

  const value = createValue(key);
  weakMap.set(key, value);
  return value;
}

const cache = new WeakMap();
const key = {};
let calls = 0;

const first = getOrCreate(cache, key, () => {
  calls += 1;
  return { count: 1 };
});

const second = getOrCreate(cache, key, () => {
  calls += 1;
  return { count: 99 };
});

console.log(first === second);
console.log(second.count);
console.log(calls);
~~~

Expected output:

~~~text
true
1
1
~~~

**Explanation:** This **has()** and **set()** pattern works in older environments and treats an existing **undefined** value as present.

## 18. Store an undefined value with the portable helper

**Task:** Confirm the callback is not called when the map contains **undefined**.

~~~js
function getOrCreate(weakMap, key, createValue) {
  if (weakMap.has(key)) {
    return weakMap.get(key);
  }

  const value = createValue(key);
  weakMap.set(key, value);
  return value;
}

const cache = new WeakMap();
const key = {};
let calls = 0;

cache.set(key, undefined);

const value = getOrCreate(cache, key, () => {
  calls += 1;
  return "created";
});

console.log(value);
console.log(calls);
~~~

Expected output:

~~~text
undefined
0
~~~

**Explanation:** The helper checks key presence instead of checking whether **get()** returned a useful-looking value.

## 19. Use a non-registered symbol as a weak key when supported

**Task:** Feature-detect support for a unique symbol key.

~~~js
const metadata = new WeakMap();
const token = Symbol("local token");

try {
  metadata.set(token, "associated");
  console.log(metadata.get(token));
} catch (error) {
  console.log("symbol weak keys are not supported here");
}
~~~

Expected output in a runtime that supports symbol weak keys:

~~~text
associated
~~~

In a runtime without that support:

~~~text
symbol weak keys are not supported here
~~~

**Explanation:** Current ECMAScript permits non-registered symbols as weak keys, but older engines may not implement the feature. A symbol from **Symbol.for()** is registered and is not a valid weak key.

## 20. Use a regular Set for primitive identifiers

**Task:** Track string IDs that can be listed.

~~~js
const activeIds = new Set(["user-1", "user-2"]);

activeIds.add("user-3");

console.log(activeIds.has("user-2"));
console.log(activeIds.size);
console.log([...activeIds].join(", "));
~~~

Expected output:

~~~text
true
3
user-1, user-2, user-3
~~~

**Explanation:** IDs are strings, so a regular set is appropriate. It also provides size and iteration, which a weak set does not.

## 21. Make weak metadata collectible by removing other references

**Task:** Understand what the program can and cannot conclude after dropping a reference.

~~~js
const metadata = new WeakMap();
let object = { name: "temporary" };

metadata.set(object, { note: "temporary metadata" });
console.log(metadata.get(object).note);

object = null;
console.log(object);
~~~

Expected output:

~~~text
temporary metadata
null
~~~

**Explanation:** Assigning **null** removes this variable's strong reference to the object. It does not prove that the object was immediately collected, and the program cannot ask the weak map when collection occurs.

## 22. Avoid expecting WeakMap values to be weak

**Task:** Store an object value and retrieve it while its key is reachable.

~~~js
const metadata = new WeakMap();
const owner = {};

metadata.set(owner, { details: "stored value" });

console.log(metadata.get(owner).details);
~~~

Expected output:

~~~text
stored value
~~~

**Explanation:** Weakness concerns the key association. The associated value is available through the key while the entry is present. A weak map is not a general-purpose weak-value container.

## 23. Store metadata for objects from another module

**Task:** Attach application metadata to a library-owned object without modifying it.

~~~js
const applicationData = new WeakMap();

function registerExternalObject(object, label) {
  applicationData.set(object, { label });
}

function getLabel(object) {
  return applicationData.get(object)?.label;
}

const libraryObject = { libraryVersion: 1 };
registerExternalObject(libraryObject, "main panel");

console.log(getLabel(libraryObject));
console.log(Object.hasOwn(libraryObject, "label"));
~~~

Expected output:

~~~text
main panel
false
~~~

**Explanation:** The application keeps its own association without changing the library object's properties.

## 24. Choose between WeakSet and Set for traversal

**Task:** Keep a visit marker for object nodes, without needing a final list.

~~~js
const visited = new WeakSet();

function mark(node) {
  if (visited.has(node)) {
    return false;
  }

  visited.add(node);
  return true;
}

const node = {};
console.log(mark(node));
console.log(mark(node));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** The traversal only needs to ask whether this exact object has been seen. If it needed a report of all visited objects, a regular **Set** would be required.

## Review checklist

For each example, make sure you can identify:

- Which value is used as the weak key.
- Whether the key is still strongly reachable elsewhere.
- Why no output claims that garbage collection happened at a specific time.
- Why a weak collection cannot be counted or enumerated.
- When a primitive key requires a regular collection.
- How to distinguish a missing entry from an entry containing **undefined**.
- How runtime feature detection protects use of newer WeakMap helpers.
- Whether object identity is being reused for lookup.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [65 - Map and Set collections](../lessons/065-map-and-set-collections.md) | [Open lesson](../lessons/066-weakmap-and-weakset.md) | [Open Q&A](../qnas/066-weakmap-and-weakset.md) | [67 - Symbols and well-known symbols](../lessons/067-symbols-and-well-known-symbols.md) |
