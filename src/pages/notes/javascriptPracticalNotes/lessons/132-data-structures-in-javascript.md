# 132 - Data structures in JavaScript

A data structure is a way to organize values so common operations are clear and reliable. JavaScript provides built-in structures for ordered values, named properties, unique values, key-value associations, object-linked metadata, and binary data.

Choose a structure based on how the program needs to add, find, remove, and iterate over values. The examples in this chapter use built-in JavaScript features and do not require a package.

## Learning goals

By the end of this chapter, you can:

- choose between an array, object, `Map`, and `Set` for common application data;
- use arrays as sequences, stacks, and queues;
- explain the difference between a record-like object and a dictionary;
- use `WeakMap` and `WeakSet` for object-associated metadata;
- use typed arrays for fixed-format numeric and binary data;
- recognize reference sharing and shallow copying.

## Start with the operations

Before choosing a structure, list the operations the code performs:

- Does order matter?
- Are values accessed by position, a known property name, or a dynamic key?
- Must values be unique?
- Do keys include objects?
- Does the data need to be converted to JSON?
- Is the data a sequence of bytes or fixed-width numbers?

| Need | Useful structure | Example |
| --- | --- | --- |
| Ordered values accessed by position | Array | Search results, menu items |
| A fixed set of named fields | Object | A user record or configuration |
| Dynamic key-value associations | `Map` | Cache entries keyed by objects or IDs |
| Unique values and membership checks | `Set` | Selected tags, visited IDs |
| Metadata associated with object lifetime | `WeakMap` | Private per-instance metadata |
| Binary values with a defined numeric width | Typed array | Image bytes or protocol data |

A data structure helps organize information. It does not validate untrusted input. Validate values at the boundary where the program receives them.

## Arrays: ordered sequences

An array stores values in an order and uses zero-based integer indexes:

~~~js
const colors = ["red", "green", "blue"];

console.log(colors[0]); // "red"
console.log(colors.length); // 3

colors.push("purple");
console.log(colors[3]); // "purple"
~~~

Use an array when position and iteration order are part of the data. Arrays can hold values of different types, but a consistent element shape usually makes application code easier to understand.

Common operations include:

- `push(value)` to append;
- `pop()` to remove and return the last value;
- `slice(start, end)` to copy part of an array;
- `map(callback)` to transform values into a new array;
- `filter(callback)` to select values into a new array;
- `find(callback)` to return the first matching value;
- `includes(value)` to check for a value.

Some array methods mutate the original array. For example, `push()`, `pop()`, `sort()`, and `splice()` change it. Methods such as `map()`, `filter()`, and `slice()` return a new array. Know whether a method changes shared data before using it.

`sort()` mutates its array and converts elements to strings by default. For numeric sorting, pass a comparator and copy first if the original order must remain unchanged:

~~~js
const scores = [12, 3, 25, 8];
const sortedScores = [...scores].sort((a, b) => a - b);

console.log(sortedScores); // [3, 8, 12, 25]
console.log(scores); // [12, 3, 25, 8]
~~~

Avoid sparse arrays with missing slots. A missing slot is not the same thing as a slot containing `undefined`, and some array methods skip missing slots. Prefer a dense sequence with explicit values.

## Objects: records with named fields

Use an object literal when the fields are known and describe one thing:

~~~js
const user = {
  id: "u-17",
  name: "Mina",
  active: true,
};

console.log(user.name); // "Mina"
console.log(Object.hasOwn(user, "active")); // true
~~~

An ordinary object has a prototype. For a property that may or may not exist on the object itself, use `Object.hasOwn(object, key)` instead of trusting a property lookup alone:

~~~js
const settings = { theme: "dark" };

console.log(Object.hasOwn(settings, "theme")); // true
console.log(Object.hasOwn(settings, "toString")); // false
~~~

A plain object is also sometimes used as a dictionary. That can be appropriate when keys are known strings and JSON conversion is useful. For dynamic keys, especially keys from external input, a `Map` usually has a clearer API and avoids inherited property names.

A null-prototype object can be used as a simple string-keyed dictionary:

~~~js
const counts = Object.create(null);
counts["red"] = 2;
counts["blue"] = 1;

console.log(counts["red"]); // 2
~~~

It does not inherit methods such as `toString()`. Use bracket access and explicit object utilities when working with it.

## Map: dynamic key-value associations

A `Map` stores associations between keys and values. Its keys can be values of any type, including objects. It remembers insertion order and provides methods for common operations:

~~~js
const inventory = new Map();

inventory.set("apples", 4);
inventory.set("oranges", 2);

console.log(inventory.get("apples")); // 4
console.log(inventory.has("oranges")); // true
console.log(inventory.size); // 2

inventory.delete("oranges");
~~~

A `Map` is a good fit when keys are dynamic, when a key is not naturally a string, or when the code needs to add and remove entries frequently. Iterating a map visits entries in insertion order:

~~~js
for (const [item, quantity] of inventory) {
  console.log(item, quantity);
}
~~~

Object keys are compared by identity. Two separately created objects with the same fields are still different keys:

~~~js
const firstKey = { id: 1 };
const secondKey = { id: 1 };
const lookup = new Map([[firstKey, "saved"]]);

console.log(lookup.get(firstKey)); // "saved"
console.log(lookup.get(secondKey)); // undefined
~~~

Use a stable primitive identifier when records need to be looked up by their contents rather than by object identity.

## Set: unique values

A `Set` stores one occurrence of each value. It is useful when uniqueness or membership is the main concern:

~~~js
const selectedTags = new Set(["html", "forms", "html"]);

selectedTags.add("accessibility");

console.log([...selectedTags]); // ["html", "forms", "accessibility"]
console.log(selectedTags.has("forms")); // true
selectedTags.delete("forms");
~~~

A set preserves insertion order when iterated. It compares values using value equality for primitives and identity for objects. For example, repeated `NaN` values are treated as the same set value, while two distinct object literals are different values.

Convert a set to an array when array-specific operations or JSON serialization are needed:

~~~js
const uniqueNumbers = [...new Set([3, 3, 1, 2, 1])];

console.log(uniqueNumbers); // [3, 1, 2]
~~~

## WeakMap and WeakSet: object-associated data

A `WeakMap` associates values with object keys without keeping those keys alive solely because they are in the collection:

~~~js
const privateDetails = new WeakMap();

function createAccount(name) {
  const account = { name };
  privateDetails.set(account, { lastViewedAt: Date.now() });
  return account;
}
~~~

Weak collections are not enumerable. A `WeakMap` does not expose its keys or have a `size` property. This prevents code from observing a collection whose contents can change as garbage collection occurs.

A `WeakSet` tracks object membership without creating a strong reference to each member:

~~~js
const processedObjects = new WeakSet();

function markProcessed(value) {
  if (processedObjects.has(value)) return false;

  processedObjects.add(value);
  return true;
}
~~~

In ordinary application code, use objects as weak collection keys. Weak collections are intended for object-associated metadata or membership, not general-purpose collections that need iteration, counting, or serialization. Garbage collection timing is not predictable, so do not use a weak collection as a manual cleanup mechanism.

## Stack and queue patterns

JavaScript does not require a special stack class. An array naturally supports last-in, first-out behavior:

~~~js
const history = [];

history.push("page-1");
history.push("page-2");

const current = history.pop();

console.log(current); // "page-2"
console.log(history); // ["page-1"]
~~~

For a first-in, first-out queue, repeatedly removing index zero with `shift()` can require moving the remaining indexed values. For a queue with many items, keep a head index instead:

~~~js
function createQueue() {
  const values = [];
  let head = 0;

  return {
    enqueue(value) {
      values.push(value);
    },

    dequeue() {
      if (head >= values.length) return undefined;

      const value = values[head];
      values[head] = undefined;
      head += 1;

      if (head > 50 && head * 2 >= values.length) {
        values.splice(0, head);
        head = 0;
      }

      return value;
    },

    get length() {
      return values.length - head;
    },
  };
}

const jobs = createQueue();
jobs.enqueue("first");
jobs.enqueue("second");

console.log(jobs.dequeue()); // "first"
console.log(jobs.length); // 1
~~~

Clearing a consumed slot lets the queue release its reference before compaction. The exact strategy can vary. For small, short-lived queues, a simple array with `push()` and `shift()` may be easier to read.

## Typed arrays and binary data

Typed arrays provide indexed views over binary data using a specific numeric representation. They are useful for bytes, files, image data, audio samples, and binary protocols. They are not a replacement for ordinary arrays.

~~~js
const bytes = new Uint8Array([72, 73, 74]);

console.log(bytes[0]); // 72
console.log(bytes.byteLength); // 3
console.log(Array.from(bytes)); // [72, 73, 74]
~~~

A `Uint8Array` represents unsigned 8-bit integers. Other typed arrays represent other fixed numeric formats. Typed arrays do not provide length-changing methods such as `push()` or `pop()`. Their view length comes from the backing buffer and view settings.

Use an `ArrayBuffer` to represent a region of binary memory, and a typed array or `DataView` to interpret bytes in that region. A `DataView` is useful when reading fields with explicit byte order or mixed numeric formats. Do not assume the host machine's byte order when a file or protocol specifies one.

Convert a typed array with `Array.from()` or spread syntax when an ordinary array is needed. This creates a separate array of values, rather than another typed view over the same bytes.

## Copying and shared references

Arrays and objects are reference values. Assigning one to another variable does not copy its contents:

~~~js
const original = ["a", "b"];
const alias = original;

alias.push("c");

console.log(original); // ["a", "b", "c"]
~~~

A spread or `slice()` makes a shallow copy of an array:

~~~js
const original = [{ name: "Mina" }];
const copy = [...original];

copy.push({ name: "Ravi" });
copy[0].name = "Leah";

console.log(original.length); // 1
console.log(original[0].name); // "Leah"
~~~

The outer array is copied, but the nested object is shared. A shallow copy does not recursively clone nested values. Choose an explicit cloning strategy only when the data model requires one.

## Choosing between Object, Map, and Set

Use these questions as a starting point:

- **Known named fields?** Use an object.
- **Dynamic key-value entries, arbitrary key types, or frequent deletion?** Use a `Map`.
- **Unique values or membership tracking?** Use a `Set`.
- **Need to associate metadata with an object's lifetime without enumerating it?** Consider a `WeakMap`.
- **Need an ordered sequence by index?** Use an array.
- **Need compact fixed-width numeric values or bytes?** Use a typed array.

These are design guidelines, not universal performance guarantees. Choose the clearest structure for the behavior, then measure if performance becomes important.

## Common mistakes

- Using an array as a dictionary when keys are not positions.
- Using an object for arbitrary external keys without checking own properties.
- Expecting two different object literals with equal fields to be the same `Map` key or `Set` value.
- Assuming a shallow copy also copies nested objects.
- Forgetting that `sort()` mutates the array and sorts as strings without a comparator.
- Treating a missing array slot as identical to an explicit `undefined` value.
- Expecting a `WeakMap` or `WeakSet` to be iterable or to expose a size.
- Using typed arrays when values need arbitrary JavaScript types or a changing length.
- Assuming a data structure validates the data inserted into it.

## Key points

- Select a structure based on the operations and value relationships the program needs.
- Arrays represent ordered sequences, objects represent records, maps represent key-value associations, and sets represent unique values.
- Weak collections associate data with object lifetime but cannot be enumerated.
- Typed arrays represent fixed-format numeric views over binary memory.
- Assignment shares arrays and objects, while spread and slice make only shallow copies.
- Validate inputs separately and avoid assumptions about performance that are not part of the language contract.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [131 - Node.js debugging, diagnostics, and profiling](131-node-js-debugging-diagnostics-and-profiling.md) | [Open Q&A](../qnas/132-data-structures-in-javascript.md) | [Open example](../examples/132-data-structures-in-javascript.md) | [133 - Algorithmic thinking, complexity, and common patterns](133-algorithmic-thinking-complexity-and-common-patterns.md) |
