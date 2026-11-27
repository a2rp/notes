# 134 - Functional programming: composition and purity

Functional programming is a style of building programs by combining functions that transform values. JavaScript supports this style because functions can be stored in variables, passed as arguments, and returned from other functions.

Two useful ideas are purity and composition. A pure function makes its result depend on its inputs without changing outside state. Composition connects small functions so the output of one becomes the input of another. These ideas can make transformations easier to test and reason about. They are tools, not rules that require every program to avoid all mutation or side effects.

## Learning goals

By the end of this chapter, you can:

- recognize first-class and higher-order functions;
- distinguish pure computations from side effects;
- avoid hidden state and accidental mutation in transformations;
- use map, filter, and reduce for appropriate tasks;
- compose small functions with pipe and compose helpers;
- keep input, output, and side-effect boundaries clear;
- understand shallow copies and the limits of Object.freeze.

## Functions as values

JavaScript functions can be assigned to variables, passed to another function, and returned from a function:

~~~js
const double = (value) => value * 2;

function applyOperation(value, operation) {
  return operation(value);
}

console.log(applyOperation(4, double)); // 8
~~~

A function that accepts another function or returns one is a higher-order function. Array methods such as map and filter accept callbacks, so they are higher-order operations.

Functions can also close over variables in their surrounding scope. This is a closure:

~~~js
function makeMultiplier(factor) {
  return (value) => value * factor;
}

const triple = makeMultiplier(3);

console.log(triple(5)); // 15
~~~

The returned function remembers factor. Closures are useful for configuration and private state, but captured mutable variables can make behavior depend on earlier calls.

## Pure functions

A pure function has two practical properties:

1. Given the same inputs, it returns the same result.
2. It does not cause an observable change outside itself.

~~~js
function subtotal(price, quantity) {
  return price * quantity;
}

console.log(subtotal(12, 3)); // 36
~~~

This function depends only on its arguments. It does not read a global variable, update an argument, write a file, or print a message.

A function becomes impure when it reads or changes outside state:

~~~js
let taxRate = 0.1;

function totalWithCurrentTax(price) {
  return price + price * taxRate;
}
~~~

The result depends on a variable outside the function's arguments. If taxRate changes, the same price can produce a different result.

Make the dependency explicit:

~~~js
function totalWithTax(price, taxRate) {
  return price + price * taxRate;
}

console.log(totalWithTax(100, 0.1)); // 110
~~~

The caller can now see the dependency, and the function can be tested with different rates without changing global state.

## Side effects

A side effect is an observable interaction beyond returning a value. Common examples include:

- changing an object or array received as an argument;
- changing a global variable or a captured mutable variable;
- writing to a file, database, or network;
- logging to the console;
- reading the current time or generating a random value;
- updating the document or another external system.

Side effects are necessary in most applications. The goal is to put them where they are expected and keep transformations predictable.

A useful structure is:

1. Read input at an application boundary.
2. Validate it.
3. Pass data into pure transformation functions.
4. Perform necessary writes, logs, or network operations at the boundary.

This is sometimes described as keeping a functional core inside an imperative shell.

## Avoid mutating input

A function that sorts its argument changes data owned by its caller:

~~~js
function sortScores(scores) {
  return scores.sort((a, b) => a - b);
}
~~~

Array sort changes the original array. Copy it before sorting if the function should preserve its input:

~~~js
function sortedScores(scores) {
  return [...scores].sort((a, b) => a - b);
}
~~~

The new array is a shallow copy. If the elements are objects, the copied array still contains references to those same objects.

Update an object by creating a new outer object:

~~~js
function renameUser(user, name) {
  return {
    ...user,
    name,
  };
}
~~~

Nested objects remain shared unless they are explicitly copied too. Immutability is about the whole data path you need to protect, not only the outer object.

## Object.freeze is shallow

Object.freeze prevents adding, removing, or changing the immediate properties of an object. It does not recursively freeze objects stored in those properties:

~~~js
const settings = Object.freeze({
  display: {
    theme: "dark",
  },
});

settings.display.theme = "light";

console.log(settings.display.theme); // "light"
~~~

The nested display object is still mutable. Treat freeze as a shallow development guard, not a general deep-immutability solution. A deep freeze needs a deliberate recursive strategy and must account for cycles and shared objects.

## Transform arrays with map and filter

Use map when each input item should produce one output item:

~~~js
const prices = [10, 20, 30];
const pricesWithTax = prices.map((price) => price * 1.1);

console.log(pricesWithTax); // [11, 22, 33]
console.log(prices); // [10, 20, 30]
~~~

Use filter when each item should be kept or removed:

~~~js
const scores = [42, 86, 59, 91];
const passingScores = scores.filter((score) => score >= 60);

console.log(passingScores); // [86, 91]
~~~

These methods return new arrays. A callback passed to map should return the transformed value. Calling map only to perform a side effect and ignoring the returned array is a sign that forEach or a loop may be clearer.

## Use reduce to combine values

Use reduce when multiple values should be combined into one accumulated result. Supply an initial value so the behavior is clear for empty arrays:

~~~js
const amounts = [12, 8, 5];
const total = amounts.reduce(
  (sum, amount) => sum + amount,
  0,
);

console.log(total); // 25
~~~

A frequency table is another useful reduction:

~~~js
const words = ["red", "blue", "red"];

const frequencies = words.reduce((counts, word) => {
  counts.set(word, (counts.get(word) ?? 0) + 1);
  return counts;
}, new Map());

console.log(frequencies.get("red")); // 2
~~~

This example mutates the local Map accumulator. That mutation is contained inside the operation and the Map is returned. A pure style does not prohibit all local mutation. Avoid copying a growing accumulator on every step, which can create unnecessary work.

Prefer map for one-to-one transformation, filter for selection, and reduce for combining into a different result. A for...of loop is often easier to read when a reduction needs several branches or early exits.

## Compose small functions

Function composition connects operations. Each function's output must be a valid input for the next function.

~~~js
const trim = (text) => text.trim();
const collapseSpaces = (text) => text.replace(/\s+/g, " ");
const lowercase = (text) => text.toLowerCase();

function pipe(...operations) {
  return (value) => operations.reduce(
    (current, operation) => operation(current),
    value,
  );
}

const normalizeName = pipe(trim, collapseSpaces, lowercase);

console.log(normalizeName("  Ada   Lovelace  ")); // "ada lovelace"
~~~

In pipe, operations run from left to right. The value flows through trim, then collapseSpaces, then lowercase.

A compose helper runs from right to left:

~~~js
function compose(...operations) {
  return (value) => operations.reduceRight(
    (current, operation) => operation(current),
    value,
  );
}

const normalizeNameRightToLeft = compose(lowercase, collapseSpaces, trim);

console.log(normalizeNameRightToLeft("  Ada   Lovelace  ")); // "ada lovelace"
~~~

The argument order can be easy to misread. Use the helper whose order makes the transformation clear, and avoid adding a composition abstraction for a pipeline that is already obvious.

## Compose data transformations

Array methods can form a readable pipeline when each step has one purpose:

~~~js
const products = [
  { name: "Notebook", price: 4, inStock: true },
  { name: "Pen", price: 2, inStock: false },
  { name: "Folder", price: 6, inStock: true },
];

const availableNames = products
  .filter((product) => product.inStock)
  .map((product) => product.name.toUpperCase());

console.log(availableNames); // ["NOTEBOOK", "FOLDER"]
~~~

Each method returns an array for the next method. This style is often easy to scan, but it creates intermediate arrays. For a very large dataset or a hot path, measure before choosing between a readable pipeline and a single loop.

## Determinism and testing

Pure functions are straightforward to test because their output is determined by their arguments:

~~~js
function applyDiscount(price, percentage) {
  return price * (1 - percentage / 100);
}

console.log(applyDiscount(80, 25)); // 60
~~~

For code that uses the current time, randomness, or external data, pass that dependency in when practical:

~~~js
function createExpiryDate(now, daysToKeep) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return new Date(now.getTime() + daysToKeep * millisecondsPerDay);
}

const fixedNow = new Date("2030-01-01T00:00:00.000Z");
console.log(createExpiryDate(fixedNow, 7).toISOString());
~~~

The caller supplies a known input, so the date calculation can be checked without depending on the actual clock. The code that reads the real clock can remain at the application boundary.

## Practical guidelines

- Keep transformations small and name them after the result they produce.
- Pass dependencies as arguments instead of reading mutable globals.
- Return new outer arrays or objects when callers should retain their input.
- Remember that spread and slice make shallow copies.
- Use map, filter, and reduce for their distinct purposes.
- Keep file, network, database, logging, clock, and random interactions visible at boundaries.
- Use a loop when it communicates branching or early exit more clearly.
- Measure before replacing a readable pipeline for performance reasons.
- Do not assume Object.freeze recursively protects nested objects.

Functional programming is not a requirement to eliminate every side effect. It is a way to make the parts that calculate values predictable, and to make the parts that interact with the outside world easy to locate.

## Common mistakes

- Assuming that assigning a function to a const makes the function pure.
- Hiding dependencies in mutable globals or captured variables.
- Mutating an input array with sort or splice when callers expect it to remain unchanged.
- Assuming a shallow copy also clones nested objects.
- Assuming Object.freeze recursively freezes nested data.
- Using map for side effects and discarding its returned array.
- Using reduce for a transformation that map or filter would explain more clearly.
- Copying the entire accumulator on every reduce step.
- Building a pipe or compose helper when a direct expression is clearer.
- Assuming that functional style means no mutation or side effects anywhere.

## Key points

- Functions are values and can be passed to or returned from other functions.
- Pure functions return results based on explicit inputs without observable outside changes.
- Composition connects small transformations in a defined order.
- Array map transforms, filter selects, and reduce combines values.
- Spread creates a shallow copy, and Object.freeze is also shallow.
- Side effects belong at visible application boundaries.
- Use functional techniques where they improve clarity, testability, and reasoning.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [133 - Algorithmic thinking, complexity, and common patterns](133-algorithmic-thinking-complexity-and-common-patterns.md) | [Open Q&A](../qnas/134-functional-programming-composition-and-purity.md) | [Open example](../examples/134-functional-programming-composition-and-purity.md) | [135 - Object-oriented programming, composition, and design patterns](135-object-oriented-programming-composition-and-design-patterns.md) |
