# 132 - Data structures in JavaScript: Example

This example uses ordinary objects, arrays, Map, Set, WeakMap, a stack, a queue, and typed arrays. The code is a single file so you can copy it into a local folder and study each result.

## Create this file

~~~text
data-structures-demo/
  data-structures.mjs
~~~

### data-structures-demo/data-structures.mjs

~~~js
const user = {
  id: "u-17",
  name: "Mina",
  active: true,
};

console.log("record has own name:", Object.hasOwn(user, "name"));

const inventory = new Map();
inventory.set("apples", 4);
inventory.set("oranges", 2);

console.log("apple count:", inventory.get("apples"));
console.log("inventory size:", inventory.size);

const firstKey = { id: 1 };
const secondKey = { id: 1 };
const objectKeys = new Map([[firstKey, "saved"]]);

console.log("same object key:", objectKeys.get(firstKey));
console.log("equal-looking key:", objectKeys.get(secondKey));

const tags = new Set(["html", "forms", "html"]);
tags.add("accessibility");

console.log("unique tags:", [...tags]);
console.log("has forms:", tags.has("forms"));

const scores = [12, 3, 25, 8];
const sortedScores = [...scores].sort((a, b) => a - b);

console.log("sorted copy:", sortedScores);
console.log("original scores:", scores);

function createStack() {
  const values = [];

  return {
    push(value) {
      values.push(value);
    },

    pop() {
      return values.pop();
    },

    get size() {
      return values.length;
    },
  };
}

const history = createStack();
history.push("chapter-1");
history.push("chapter-2");

console.log("stack pop:", history.pop());
console.log("stack size:", history.size);

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

      if (head > 32 && head * 2 >= values.length) {
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
jobs.enqueue("job-1");
jobs.enqueue("job-2");

console.log("queue dequeue:", jobs.dequeue());
console.log("queue length:", jobs.length);

const privateMetadata = new WeakMap();
privateMetadata.set(user, { lastOpenedChapter: 132 });

console.log("weak metadata:", privateMetadata.get(user).lastOpenedChapter);

const bytes = new Uint8Array([72, 73, 74]);
console.log("typed array values:", Array.from(bytes));

const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
view.setUint16(0, 258, false);
view.setUint16(2, 772, false);

console.log(
  "data view values:",
  view.getUint16(0, false),
  view.getUint16(2, false),
);
console.log("buffer bytes:", Array.from(new Uint8Array(buffer)));

const original = [{ name: "Mina" }];
const copy = [...original];

copy.push({ name: "Ravi" });
copy[0].name = "Leah";

console.log("original length:", original.length);
console.log("shared nested name:", original[0].name);
~~~

## Run the example

From the demo folder, run:

~~~sh
node data-structures.mjs
~~~

Expected output:

~~~text
record has own name: true
apple count: 4
inventory size: 2
same object key: saved
equal-looking key: undefined
unique tags: [ 'html', 'forms', 'accessibility' ]
has forms: true
sorted copy: [ 3, 8, 12, 25 ]
original scores: [ 12, 3, 25, 8 ]
stack pop: chapter-2
stack size: 1
queue dequeue: job-1
queue length: 1
weak metadata: 132
typed array values: [ 72, 73, 74 ]
data view values: 258 772
buffer bytes: [ 1, 2, 3, 4 ]
original length: 1
shared nested name: Leah
~~~

**Note:** Node.js may display arrays or strings with slightly different spacing. The values and order are the important parts.

## How the example works

### Record and dynamic keys

The user is represented by an object because its fields have known names. Object.hasOwn() checks for the name field directly on that record.

The inventory uses a Map because entries are added by key and the Map API provides get(), set(), has(), delete(), and size. The two object keys have matching contents but are separate references. Only the exact key object retrieves the saved entry.

### Unique values and ordered values

The Set removes the duplicate html tag and keeps the insertion order of the first occurrences. The score array remains unchanged because the code copies it before calling the mutating sort() method.

### Stack and queue

The stack adds and removes items from the same end using push() and pop(). The queue removes the oldest item by advancing a head index. It clears a consumed slot and occasionally compacts the backing array so old references do not remain in the consumed prefix indefinitely.

For a small queue, a plain array with push() and shift() may be simpler. Choose the version that fits the expected workload.

### WeakMap metadata

The WeakMap associates metadata with the user object. The example reads that metadata while the object is still referenced. WeakMap cannot be enumerated and does not expose a size.

### Binary data and typed views

The Uint8Array provides indexed byte values. The DataView writes and reads two 16-bit values using explicit big-endian order. The output bytes show how those values are represented in the four-byte buffer.

### Shallow copying

The spread creates another outer array. Both arrays still refer to the same first object, so changing that object's name through copy is visible through original.

## Try these changes

- Add another inventory item and iterate over all Map entries.
- Add a duplicate tag and verify that the Set still contains one copy.
- Change the score comparator to sort descending without changing the original array.
- Enqueue several jobs and dequeue them one by one to confirm first-in, first-out order.
- Replace the object key used for a Map lookup with a new object that has the same fields.
- Change the DataView endianness argument and inspect the resulting bytes.
- Make a nested copy if the example should not share its first object.

## What this example demonstrates

- Choosing an object for a record and a Map for dynamic key-value entries.
- Using Set to keep unique values.
- Using arrays as a stack and a head-index queue.
- Associating object metadata with WeakMap.
- Reading numeric values through typed arrays and DataView.
- Recognizing that a shallow copy still shares nested objects.

The code in this example is provided for study. It has not been run as part of this chapter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [131 - Node.js debugging, diagnostics, and profiling](../lessons/131-node-js-debugging-diagnostics-and-profiling.md) | [Open Q&A](../qnas/132-data-structures-in-javascript.md) | [Open lesson](../lessons/132-data-structures-in-javascript.md) | [133 - Algorithmic thinking, complexity, and common patterns](../lessons/133-algorithmic-thinking-complexity-and-common-patterns.md) |
