# 66 - WeakMap and WeakSet: Q&A

This question set reviews weak keys, object lifetime, metadata associations, membership tracking, and the limits of weak collections. Each answer follows its question with an explanation or expected output.

## Multiple-choice questions

### 1. What does a **WeakMap** store?

A. Primitive keys and primitive values only
B. Weakly held keys associated with values
C. Values that are always weak references
D. A list that can be enumerated

- A. Primitive keys and primitive values only
- B. Weakly held keys associated with values
- C. Values that are always weak references
- D. A list that can be enumerated

**Answer: B.** A weak map associates values with suitable weak keys. The collection does not keep an eligible key alive solely because the key is present.

### 2. Which values are the common weak keys for a **WeakMap**?

A. Strings and numbers
B. Objects and functions
C. Booleans only
D. Any primitive value

- A. Strings and numbers
- B. Objects and functions
- C. Booleans only
- D. Any primitive value

**Answer: B.** Objects and functions are the usual weak keys. Current ECMAScript also permits eligible non-registered symbols, though older runtimes may not support symbol keys.

### 3. Which operation is unavailable on a **WeakMap** because its keys cannot be enumerated?

A. **get(key)**
B. **has(key)**
C. **delete(key)**
D. **keys()**

- A. **get(key)**
- B. **has(key)**
- C. **delete(key)**
- D. **keys()**

**Answer: D.** A weak map cannot list its keys. It also has no **size**, **values()**, **entries()**, **forEach()**, or **clear()** method.

### 4. What does a **WeakSet** record?

A. A key-value association
B. Whether a suitable weak key is a member
C. A sequence of values with numeric indexes
D. A count of collected objects

- A. A key-value association
- B. Whether a suitable weak key is a member
- C. A sequence of values with numeric indexes
- D. A count of collected objects

**Answer: B.** A weak set answers membership questions about a particular value. It does not store a separate value or enumerate its members.

### 5. What should be used when an application needs to enumerate every key and count entries?

A. **WeakMap**
B. **WeakSet**
C. **Map** or **Set**
D. **FinalizationRegistry**

- A. **WeakMap**
- B. **WeakSet**
- C. **Map** or **Set**
- D. **FinalizationRegistry**

**Answer: C.** Regular maps and sets expose iteration and size. Weak collections deliberately do not reveal their full contents.

### 6. What happens when **WeakMap.get(key)** is called with a string key?

A. It throws a **TypeError**.
B. It returns **undefined**.
C. It converts the string into an object.
D. It creates an entry with that string key.

- A. It throws a **TypeError**.
- B. It returns **undefined**.
- C. It converts the string into an object.
- D. It creates an entry with that string key.

**Answer: B.** A non-weak key is treated as absent by **get()**. Calling **set()** with that invalid key throws a **TypeError**.

### 7. Which method can lazily create a WeakMap value in current ECMAScript?

A. **getOrInsertComputed(key, callback)**
B. **compute(key, callback)**
C. **createIfMissing(key)**
D. **weakGet(key, callback)**

- A. **getOrInsertComputed(key, callback)**
- B. **compute(key, callback)**
- C. **createIfMissing(key)**
- D. **weakGet(key, callback)**

**Answer: A.** If the key is present, **getOrInsertComputed()** returns its current value. If absent, it calls the callback with the key, stores the result, and returns it. Runtime support may vary.

### 8. What happens when a key becomes unreachable except for its association in a WeakMap?

A. It is guaranteed to be collected immediately.
B. The WeakMap keeps it alive forever.
C. It may be collected, but the exact timing is nondeterministic.
D. The program receives a callback when it is collected.

- A. It is guaranteed to be collected immediately.
- B. The WeakMap keeps it alive forever.
- C. It may be collected, but the exact timing is nondeterministic.
- D. The program receives a callback when it is collected.

**Answer: C.** A weak association does not keep the key alive by itself, but JavaScript does not promise when garbage collection occurs.

### 9. Which set is best for tracking strings such as user IDs?

A. **WeakSet**
B. **Set**
C. **WeakMap**
D. **WeakRef**

- A. **WeakSet**
- B. **Set**
- C. **WeakMap**
- D. **WeakRef**

**Answer: B.** Strings are primitive values and cannot be weak set members. A regular **Set** stores strings and can enumerate them.

### 10. What does **WeakMap.getOrInsert(key, fallback)** return if the key already has an entry whose value is **undefined**?

A. The fallback value
B. A **TypeError**
C. **undefined**, because the key is already present
D. A new object wrapper

- A. The fallback value
- B. A **TypeError**
- C. **undefined**, because the key is already present
- D. A new object wrapper

**Answer: C.** The method checks whether the key exists, not whether its value is truthy. An existing **undefined** value is still an entry.

## True or false

### 11. A **WeakMap** key comparison for objects uses object identity.

**Answer: True.** The exact same object reference must be used to retrieve its associated value.

### 12. A regular **Map** keeps keys strongly reachable while its entries remain in the map.

**Answer: True.** A regular map retains its keys until the entry or map is removed or otherwise becomes unreachable.

### 13. A **WeakMap** has a **size** property that decreases after garbage collection.

**Answer: False.** A weak map has no **size** property. Its contents cannot be enumerated, so collection changes are not exposed as a count.

### 14. Setting the last variable that references an object to **null** proves the object has already been collected.

**Answer: False.** It only removes that variable's reference. Collection may happen later, and JavaScript does not expose a reliable collection time.

### 15. A **WeakSet** can track an object as visited without adding a marker property to that object.

**Answer: True.** The weak set can associate membership with the object's identity without modifying the object.

### 16. A **WeakMap** key can be a string if the string is unique.

**Answer: False.** Strings are primitive and are not weak keys. Use a regular **Map** for string keys.

### 17. In current ECMAScript, a non-registered symbol can be a weak key, but a symbol returned by **Symbol.for()** cannot.

**Answer: True.** The current specification permits eligible non-registered symbols. Check runtime support when targeting older engines.

### 18. A weak map can replace every regular map because it may release memory.

**Answer: False.** A weak map cannot use ordinary primitive keys, enumerate entries, report size, or provide deterministic cleanup. Use it only when weak key lifetime is needed.

## Predict the output

### 19. Can a second object with matching fields retrieve the value?

~~~js
const metadata = new WeakMap();
const first = { id: 1 };
const second = { id: 1 };

metadata.set(first, "first object");

console.log(metadata.get(first));
console.log(metadata.get(second));
~~~

**Answer:**

~~~text
first object
undefined
~~~

**Explanation:** The objects have matching fields but different identities. Weak map lookup uses the key reference.

### 20. What does **has()** report for a stored undefined value?

~~~js
const weak = new WeakMap();
const node = {};

weak.set(node, undefined);

console.log(weak.get(node));
console.log(weak.has(node));
~~~

**Answer:**

~~~text
undefined
true
~~~

**Explanation:** **has()** distinguishes an existing entry from a missing key even when the stored value is **undefined**.

### 21. What does this visited-object check print?

~~~js
const visited = new WeakSet();
const node = { name: "root" };

function visit(value) {
  if (visited.has(value)) {
    console.log("seen");
    return;
  }

  visited.add(value);
  console.log("new");
}

visit(node);
visit(node);
~~~

**Answer:**

~~~text
new
seen
~~~

**Explanation:** The same object reference is added once. The second call finds that reference in the set.

### 22. What happens when a non-weak key is passed to **set()**?

~~~js
const metadata = new WeakMap();

try {
  metadata.set("user-1", { role: "editor" });
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** A string is not a valid weak key, so **set()** throws a **TypeError**.

### 23. What does **get()** return for an invalid primitive key?

~~~js
const metadata = new WeakMap();

console.log(metadata.get("user-1"));
console.log(metadata.has("user-1"));
console.log(metadata.delete("user-1"));
~~~

**Answer:**

~~~text
undefined
false
false
~~~

**Explanation:** For an invalid weak key, **get()** returns **undefined**, while **has()** and **delete()** return **false**. **set()** and **add()** throw for invalid keys.

### 24. How many times does the lazy callback run?

~~~js
const cache = new WeakMap();
const key = {};
let calls = 0;

const first = cache.getOrInsertComputed(key, () => {
  calls += 1;
  return { label: "saved" };
});

const second = cache.getOrInsertComputed(key, () => {
  calls += 1;
  return { label: "other" };
});

console.log(first === second);
console.log(calls);
~~~

**Answer:** In a runtime that supports **getOrInsertComputed()**:

~~~text
true
1
~~~

**Explanation:** The first call computes and stores the value. The second finds the existing entry and does not call its callback. Check runtime support before using the method.

### 25. What does **getOrInsert()** do with an already present undefined value?

~~~js
const cache = new WeakMap();
const key = {};

cache.set(key, undefined);
const result = cache.getOrInsert(key, "fallback");

console.log(result);
console.log(cache.has(key));
~~~

**Answer:** In a runtime that supports **getOrInsert()**:

~~~text
undefined
true
~~~

**Explanation:** The entry exists even though its value is **undefined**, so the fallback is not inserted or returned.

### 26. Does the private metadata become an own field?

~~~js
const data = new WeakMap();

class User {
  constructor(name) {
    data.set(this, { name });
  }

  getName() {
    return data.get(this).name;
  }
}

const user = new User("Mina");

console.log(user.getName());
console.log(Object.hasOwn(user, "name"));
~~~

**Answer:**

~~~text
Mina
false
~~~

**Explanation:** The name is stored externally in the weak map and is not an own property on the user instance.

## Short-answer questions

### 27. What is the main difference between **Map** and **WeakMap**?

**Answer:** A **Map** strongly retains keys and exposes entries, iteration, and size. A **WeakMap** associates values with weak keys, does not keep eligible keys alive by itself, and cannot expose its full contents.

### 28. What is the main difference between **Set** and **WeakSet**?

**Answer:** A **Set** can store primitive values and can be enumerated. A **WeakSet** tracks membership for eligible weak keys, usually objects, and cannot be enumerated.

### 29. Why do weak collections have no iteration methods?

**Answer:** Their contents can change as keys become unreachable and are collected. Exposing all keys would make program-visible behavior depend on garbage collection and could reveal object liveness.

### 30. Does **WeakMap** weakly hold both its key and its value?

**Answer:** The weak behavior concerns the key association. A value is available through its key while that association exists. Do not treat a WeakMap as a general-purpose weak-value store.

### 31. Why is a **WeakMap** useful for object metadata?

**Answer:** It can associate data with an object without adding fields to the object. The association does not by itself keep an otherwise unreachable key alive.

### 32. When is a regular **Map** a better choice than **WeakMap**?

**Answer:** Use **Map** when keys can be primitives, when entries must be listed or counted, or when the collection should retain entries until explicit removal.

### 33. What is the practical difference between **getOrInsert()** and **getOrInsertComputed()**?

**Answer:** **getOrInsert(key, value)** uses a value already supplied by the caller as the default. **getOrInsertComputed(key, callback)** runs a callback with the key only when no entry exists and uses the callback's result.

### 34. Why should code check runtime support for **getOrInsert()** methods?

**Answer:** These are newer methods and may not exist in older JavaScript engines. Use feature detection or the portable **has()** plus **set()** pattern when supporting older runtimes.

### 35. What is the difference between an eligible symbol and a registered symbol as a weak key?

**Answer:** Current ECMAScript allows non-registered symbols as weak keys. A symbol returned by **Symbol.for()** is registered and is not suitable. Older engines may not implement symbol weak keys.

### 36. Why is garbage collection a poor cleanup signal for application logic?

**Answer:** The program cannot reliably choose or observe when collection happens. Essential cleanup, deadlines, or eviction should use explicit lifecycle operations instead.

## Coding and design questions

### 37. Store display metadata for an object without adding fields to it.

**Answer:**

~~~js
const displayData = new WeakMap();

function setDisplayLabel(element, label) {
  displayData.set(element, label);
}

function getDisplayLabel(element) {
  return displayData.get(element);
}

const element = { kind: "button" };
setDisplayLabel(element, "Save");

console.log(getDisplayLabel(element));
console.log(Object.hasOwn(element, "label"));
~~~

Output:

~~~text
Save
false
~~~

**Explanation:** The weak map associates the label with the element's identity. The element itself is not changed.

### 38. Track object graph nodes without processing a node twice.

**Answer:**

~~~js
const visited = new WeakSet();

function walk(node) {
  if (visited.has(node)) {
    return;
  }

  visited.add(node);
  console.log(node.name);

  for (const child of node.children) {
    walk(child);
  }
}

const leaf = { name: "leaf", children: [] };
const root = {
  name: "root",
  children: [leaf, leaf]
};

walk(root);
~~~

Output:

~~~text
root
leaf
~~~

**Explanation:** The second reference to **leaf** is detected by identity and skipped. This pattern also prevents revisiting objects in cyclic graphs.

### 39. Implement lazy weak metadata with a portable fallback.

**Answer:**

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
const object = {};
let calls = 0;

const first = getOrCreate(cache, object, () => {
  calls += 1;
  return { visits: 1 };
});

const second = getOrCreate(cache, object, () => {
  calls += 1;
  return { visits: 99 };
});

console.log(first === second);
console.log(calls);
console.log(second.visits);
~~~

Output:

~~~text
true
1
1
~~~

**Explanation:** **has()** is checked before **get()**, so an existing entry with **undefined** would also be treated as present. The callback runs only for a missing key.

### 40. Use a current WeakMap convenience method when available

**Answer:**

~~~js
const cache = new WeakMap();
const key = {};

if (typeof cache.getOrInsertComputed === "function") {
  const value = cache.getOrInsertComputed(key, (currentKey) => {
    return { label: "metadata" };
  });

  console.log(value.label);
} else {
  if (!cache.has(key)) {
    cache.set(key, { label: "metadata" });
  }

  console.log(cache.get(key).label);
}
~~~

Output:

~~~text
metadata
~~~

**Explanation:** Feature detection uses the newer lazy helper when present and falls back to **has()** and **set()** otherwise. Both paths produce the same value.

### 41. Choose Map or WeakMap for a cache

**Answer:** Use a regular **Map** if the cache is keyed by strings or numbers, needs a size, or must be enumerated and explicitly cleared. Use a **WeakMap** if keys are object identities and the association should not keep those objects alive by itself.

**Explanation:** Weak collections trade enumeration and primitive keys for weak key lifetime. The choice depends on the required behavior, not a blanket performance assumption.

### 42. Choose Set or WeakSet for processed IDs

**Answer:** Use a regular **Set** for string or numeric IDs. Use a **WeakSet** when tracking actual object references and the collection does not need to list or count them.

**Explanation:** Weak collections are for eligible weak keys, not arbitrary identifiers.

### 43. Store per-instance details outside a class instance

**Answer:**

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

const account = new Account("Lee", 20);
account.deposit(5);
console.log(account.summary());
~~~

Output:

~~~text
Lee: 25
~~~

**Explanation:** The weak map associates private data with the instance. For new class code, private fields may be simpler, but a weak map can still be useful for external objects or legacy designs.

### 44. Explain why this code cannot report the number of visited nodes.

**Answer:**

~~~js
const visited = new WeakSet();
const node = {};
visited.add(node);

console.log(visited.size);
~~~

Output:

~~~text
undefined
~~~

**Explanation:** A weak set has no **size** property and cannot enumerate values. If a count or list is required, use a regular **Set** and decide how to remove entries.

## Review checklist

Before moving on, make sure you can explain:

- Which keys are suitable for weak collections.
- Why weak collections cannot expose size or enumeration.
- How **Map** and **Set** differ from their weak counterparts.
- How garbage collection affects weak associations without providing a schedule.
- How to use **has()** when **undefined** is a valid value.
- What the newer WeakMap defaulting methods do and how to check support.
- When an explicit regular collection is a better fit.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [65 - Map and Set collections](../lessons/065-map-and-set-collections.md) | [Open lesson](../lessons/066-weakmap-and-weakset.md) | [Open example](../examples/066-weakmap-and-weakset.md) | [67 - Symbols and well-known symbols](../lessons/067-symbols-and-well-known-symbols.md) |
