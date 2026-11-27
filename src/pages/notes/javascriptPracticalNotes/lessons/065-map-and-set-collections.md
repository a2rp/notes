# 65 - Map and Set collections

**Map** and **Set** are built-in collections for storing keyed values and unique values. A **Map** stores key-value entries and accepts keys of any type. A **Set** stores each value at most once. Both preserve insertion order and provide methods for checking, adding, removing, and iterating their contents.

Choose a collection based on how the data will be used. Arrays are useful for ordered sequences and index-based operations. Plain objects are useful for records with named properties. Use **Map** when keys are data and need to be any value, and use **Set** when uniqueness and membership checks matter.

## Learning goals

By the end of this chapter, you should be able to:

- Create, read, update, and delete entries in a **Map**.
- Create and query a **Set** of unique values.
- Explain how **Map** and **Set** compare keys and values.
- Iterate over maps and sets in insertion order.
- Convert between arrays, maps, sets, and plain objects safely.
- Choose between an array, object, **Map**, and **Set** for a task.
- Recognize identity, serialization, and mutation pitfalls.

## Map: store key-value entries

Create a map with **new Map()**. Use **set(key, value)** to add an entry and **get(key)** to read its value.

~~~js
const scores = new Map();

scores.set("Asha", 92);
scores.set("Mina", 87);

console.log(scores.get("Asha"));
console.log(scores.size);
~~~

Output:

~~~text
92
2
~~~

A map key can be a string, number, object, function, or another value. Unlike ordinary object property keys, map keys are not automatically converted to strings.

~~~js
const values = new Map();

values.set(1, "number key");
values.set("1", "string key");

console.log(values.get(1));
console.log(values.get("1"));
console.log(values.size);
~~~

Output:

~~~text
number key
string key
2
~~~

The number **1** and the string **"1"** are separate keys.

## Initialize a Map from entries

A map can be constructed from an iterable of key-value pairs. An array of two-item arrays is a common source.

~~~js
const prices = new Map([
  ["pen", 2],
  ["notebook", 5],
  ["folder", 3]
]);

console.log(prices.get("notebook"));
console.log(prices.size);
~~~

Output:

~~~text
5
3
~~~

Setting an existing key updates its value without adding a second entry.

~~~js
const settings = new Map([
  ["theme", "light"],
  ["language", "en"]
]);

settings.set("theme", "dark");

console.log(settings.size);
console.log(settings.get("theme"));
~~~

Output:

~~~text
2
dark
~~~

The updated entry keeps its position in insertion order. Deleting a key and adding it again creates a new entry at the end.

## Map membership and removal

Use **has(key)** to check whether a key exists. This is different from checking the result of **get**, because a map may store **undefined** as a value.

~~~js
const cache = new Map();
cache.set("missing-result", undefined);

console.log(cache.has("missing-result"));
console.log(cache.get("missing-result"));
console.log(cache.has("not-added"));
~~~

Output:

~~~text
true
undefined
false
~~~

Use **delete(key)** to remove one entry. It returns **true** if the key was present and **false** if it was not. Use **clear()** to remove every entry.

~~~js
const tasks = new Map([
  ["a", "draft"],
  ["b", "review"]
]);

console.log(tasks.delete("a"));
console.log(tasks.size);
tasks.clear();
console.log(tasks.size);
~~~

Output:

~~~text
true
1
0
~~~

## Map keys use value equality or object identity

Map key comparison uses **SameValueZero**. For primitive values, this behaves like strict equality with two important details: **NaN** matches **NaN**, and positive zero and negative zero are treated as the same key.

~~~js
const numbers = new Map();

numbers.set(NaN, "not a number");
numbers.set(-0, "zero");

console.log(numbers.get(NaN));
console.log(numbers.get(0));
console.log(numbers.size);
~~~

Output:

~~~text
not a number
zero
2
~~~

Objects are compared by identity, not by their properties.

~~~js
const firstKey = { id: 1 };
const secondKey = { id: 1 };
const map = new Map();

map.set(firstKey, "first");

console.log(map.get(firstKey));
console.log(map.get(secondKey));
~~~

Output:

~~~text
first
undefined
~~~

Although the objects have the same property, they are different objects. A lookup must use the same object reference used when setting the entry.

## Iterate over a Map

A map is iterable. Its default iterator yields key-value pairs in insertion order.

~~~js
const inventory = new Map([
  ["pen", 4],
  ["notebook", 2]
]);

for (const [item, quantity] of inventory) {
  console.log(item + ": " + quantity);
}
~~~

Output:

~~~text
pen: 4
notebook: 2
~~~

Use **keys()**, **values()**, or **entries()** to get iterators for specific parts of a map.

~~~js
const capitals = new Map([
  ["India", "New Delhi"],
  ["Japan", "Tokyo"]
]);

console.log(Array.from(capitals.keys()).join(", "));
console.log(Array.from(capitals.values()).join(", "));
~~~

Output:

~~~text
India, Japan
New Delhi, Tokyo
~~~

**entries()** is the default iterator, so **for...of map** and **for...of map.entries()** both provide pairs.

~~~js
const labels = new Map([
  ["draft", "Draft"],
  ["published", "Published"]
]);

for (const [code, label] of labels.entries()) {
  console.log(code + " = " + label);
}
~~~

Output:

~~~text
draft = Draft
published = Published
~~~

A map also has **forEach(callback)**. The callback receives the value first, the key second, and the map third.

~~~js
const points = new Map([
  ["north", 3],
  ["south", 5]
]);

points.forEach((value, key) => {
  console.log(key + " has " + value);
});
~~~

Output:

~~~text
north has 3
south has 5
~~~

The callback order differs from the pair order produced by the map iterator. Check the method's callback signature when switching between iteration styles.

## Set: store unique values

Create a set with **new Set()**. Use **add(value)** to insert a value. Adding the same value again does not create another entry.

~~~js
const tags = new Set();

tags.add("html");
tags.add("css");
tags.add("html");

console.log(tags.size);
console.log(tags.has("css"));
~~~

Output:

~~~text
2
true
~~~

A set can be initialized from any iterable. Repeated values in the input are reduced to one set entry.

~~~js
const numbers = new Set([2, 4, 2, 6, 4]);

console.log(numbers.size);
console.log(Array.from(numbers).join(", "));
~~~

Output:

~~~text
3
2, 4, 6
~~~

Use **has(value)** to test membership, **delete(value)** to remove one value, and **clear()** to remove all values.

~~~js
const roles = new Set(["reader", "editor"]);

console.log(roles.has("editor"));
console.log(roles.delete("reader"));
console.log(roles.size);
~~~

Output:

~~~text
true
true
1
~~~

## Set uniqueness uses SameValueZero

Set values use the same equality behavior as map keys. **NaN** is treated as equal to another **NaN**, and positive zero and negative zero are the same set value.

~~~js
const samples = new Set([NaN, NaN, 0, -0]);

console.log(samples.size);
console.log(samples.has(NaN));
~~~

Output:

~~~text
2
true
~~~

Objects are unique by identity. Two objects with the same properties still count as two different values.

~~~js
const first = { code: "x" };
const second = { code: "x" };
const objects = new Set([first, second, first]);

console.log(objects.size);
console.log(objects.has(first));
console.log(objects.has({ code: "x" }));
~~~

Output:

~~~text
2
true
false
~~~

The third lookup creates a new object, so it does not match either stored reference.

## Iterate over a Set

A set is iterable in insertion order. Iterating over it yields its values.

~~~js
const steps = new Set(["plan", "build", "review"]);

for (const step of steps) {
  console.log(step);
}
~~~

Output:

~~~text
plan
build
review
~~~

A set's **keys()**, **values()**, and **entries()** methods are available. **keys()** and **values()** both yield the set's values. **entries()** yields pairs containing the same value twice.

~~~js
const colors = new Set(["blue", "green"]);

for (const [first, second] of colors.entries()) {
  console.log(first + " / " + second);
}
~~~

Output:

~~~text
blue / blue
green / green
~~~

The repeated pair shape keeps set iteration compatible with map-like iteration patterns. Most code can use **for...of set** or **set.values()** for clarity.

A set's **forEach(callback)** callback receives the value twice, followed by the set. The second value is included for compatibility with map callback signatures.

~~~js
const codes = new Set(["A1", "B2"]);

codes.forEach((value, sameValue, collection) => {
  console.log(value + " / " + (value === sameValue) + " / " + (collection === codes));
});
~~~

Output:

~~~text
A1 / true / true
B2 / true / true
~~~

## Convert between collections

Create a set from an array to remove duplicate primitive values while preserving their first-seen order.

~~~js
const names = ["Asha", "Mina", "Asha", "Lee"];
const uniqueNames = [...new Set(names)];

console.log(uniqueNames.join(", "));
~~~

Output:

~~~text
Asha, Mina, Lee
~~~

This removes duplicates according to **SameValueZero**. For objects, it removes repeated references, not separate objects with equal-looking properties.

Convert a set to an array when array methods or indexes are needed.

~~~js
const selected = new Set(["red", "blue"]);
const selectedList = Array.from(selected);

console.log(selectedList[0]);
console.log(selectedList.map((color) => color.toUpperCase()).join(", "));
~~~

Output:

~~~text
red
RED, BLUE
~~~

Convert a map to an array of entries to use array transformations.

~~~js
const counts = new Map([
  ["pen", 3],
  ["book", 2]
]);

const descriptions = Array.from(counts, ([name, count]) => {
  return name + ": " + count;
});

console.log(descriptions.join(" | "));
~~~

Output:

~~~text
pen: 3 | book: 2
~~~

Convert entries back into a map with **new Map(entries)**.

~~~js
const entries = [
  ["x", 10],
  ["y", 20]
];

const coordinates = new Map(entries);
console.log(coordinates.get("y"));
~~~

Output:

~~~text
20
~~~

## Plain objects and maps are different

A plain object is useful for a record with a known set of named properties. A map is useful when keys are dynamic data, may have any type, or need consistent collection operations.

~~~js
const record = {
  title: "Guide",
  published: true
};

const metadata = new Map();
metadata.set("created", "2026-11-20");
metadata.set(1, "numeric key");

console.log(record.title);
console.log(metadata.get(1));
~~~

Output:

~~~text
Guide
numeric key
~~~

Object properties are accessed by property syntax or bracket syntax. Map entries must be accessed through methods such as **get()**, **set()**, and **has()**. A map does not use **map.someKey** to access an entry.

Objects have prototypes unless created without one. A map has no inherited entry keys such as **toString**. This can make map membership straightforward for arbitrary user-provided keys.

~~~js
const dictionary = new Map();

dictionary.set("__proto__", "ordinary map key");
console.log(dictionary.has("__proto__"));
console.log(dictionary.get("__proto__"));
~~~

Output:

~~~text
true
ordinary map key
~~~

With plain objects used as dictionaries, account for inherited property names and create an appropriate dictionary object when necessary. Do not assume an object and a map have identical key behavior.

## Serialization considerations

JSON has no built-in representation for a map or set. Calling **JSON.stringify()** directly on a map or set normally produces an empty object because their entries are not ordinary enumerable own properties.

~~~js
const map = new Map([["theme", "dark"]]);
const set = new Set(["html", "css"]);

console.log(JSON.stringify(map));
console.log(JSON.stringify(set));
~~~

Output:

~~~text
{}
{}
~~~

Convert the collection to a JSON-compatible structure when the data shape allows it.

~~~js
const settings = new Map([
  ["theme", "dark"],
  ["language", "en"]
]);

console.log(JSON.stringify(Array.from(settings)));
~~~

Output:

~~~text
[["theme","dark"],["language","en"]]
~~~

A set of primitive values can be represented as an array.

~~~js
const features = new Set(["search", "offline"]);
console.log(JSON.stringify([...features]));
~~~

Output:

~~~text
["search","offline"]
~~~

A map with object keys needs an explicit serialization design. Converting it to an object can coerce keys and lose distinctions between different key types or object identities. Decide what keys and values mean in the serialized format before converting.

## Choose a collection

Use an **Array** when:

- Order and position are central.
- You need indexes, slicing, or array transformation methods.
- Repeated values are allowed.

Use a plain **Object** when:

- The data represents a record with named properties.
- Property access such as **user.name** makes the model clearer.
- The keys are known field names rather than arbitrary values.

Use a **Map** when:

- Keys are dynamic or can be non-string values.
- You need explicit key membership and size.
- You need predictable insertion-order iteration over entries.
- Object identity is useful as a key.

Use a **Set** when:

- You need uniqueness.
- Membership checks are more important than numeric indexes.
- Insertion order is useful for iteration.
- You want to derive a unique sequence from another iterable.

No collection is always fastest or best for every workload. Choose the clearest data model first, then measure performance if it becomes important.

## Common mistakes

### Using bracket syntax for a map entry

~~~js
const map = new Map();
map["status"] = "ready";

console.log(map.get("status"));
console.log(map.size);
~~~

Output:

~~~text
undefined
0
~~~

The bracket assignment created an ordinary property on the map object. It did not create a map entry. Use **map.set("status", "ready")** instead.

### Expecting equal-looking objects to be equal keys

~~~js
const map = new Map();
map.set({ id: 1 }, "saved");

console.log(map.get({ id: 1 }));
~~~

Output:

~~~text
undefined
~~~

Each object literal creates a different object identity. Keep and reuse the same reference, or use a stable primitive identifier as the key.

### Expecting a Set to compare object contents

~~~js
const set = new Set();
set.add({ id: 1 });
set.add({ id: 1 });

console.log(set.size);
~~~

Output:

~~~text
2
~~~

The two object values are distinct references. Sets do not perform deep equality checks.

### Forgetting Map callback argument order

~~~js
const map = new Map([["x", 5]]);

map.forEach((value, key) => {
  console.log(value + " then " + key);
});
~~~

Output:

~~~text
5 then x
~~~

The callback receives **value** before **key**. The default iterator instead yields **[key, value]** pairs.

## Try it yourself

1. Store student scores in a **Map** and update one student's score.
2. Use an object as a map key and retrieve a value with the same object reference.
3. Use **has()** to distinguish a missing map entry from an entry whose value is **undefined**.
4. Create a **Set** from repeated tags and list the unique tags in insertion order.
5. Compare two objects with identical properties when used as set values.
6. Convert a **Set** to an array and sort the array without changing the set.
7. Convert map entries to a JSON array and explain which key information is retained.
8. Build a frequency map from an array of words.
9. Use a set to find which requested permissions are already granted.
10. Decide whether a user profile should be stored as a plain object or as a **Map**, and explain why.

## Key points

- **Map** stores key-value entries with keys of any type and provides **size**, **get**, **set**, **has**, **delete**, and **clear**.
- **Set** stores unique values and provides **size**, **add**, **has**, **delete**, and **clear**.
- Both collections preserve insertion order when iterated.
- Map keys and set values use **SameValueZero**; objects are compared by identity.
- A map's **forEach** callback receives value before key, while map iteration yields key-value pairs.
- Converting between collections should preserve the key and identity semantics the application needs.
- Direct JSON serialization does not preserve map or set entries.
- Choose arrays for sequences, objects for records, maps for keyed collections, and sets for unique membership.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [64 - Composition, delegation, and mixins](064-composition-delegation-and-mixins.md) | [Open Q&A](../qnas/065-map-and-set-collections.md) | [Open example](../examples/065-map-and-set-collections.md) | [66 - WeakMap and WeakSet](066-weakmap-and-weakset.md) |
