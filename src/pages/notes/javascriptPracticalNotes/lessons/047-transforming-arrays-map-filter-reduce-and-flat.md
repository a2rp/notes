# 47 - Transforming arrays: map, filter, reduce, and flat

Array transformation methods create results from existing arrays. **map** transforms each value, **filter** keeps selected values, **reduce** combines values into one result, and **flat** removes nesting to a chosen depth. **flatMap** transforms values and flattens one level.

These methods return results instead of requiring a loop to build an output array by hand. They do not mutate the original outer array, though callback code can still mutate shared objects or other state.

## Transform every value with map

**map** calls a callback for each present element and returns a new array containing the callback's result at each corresponding position:

~~~js
const prices = [12, 18, 25];

const pricesWithFee = prices.map(function (price) {
    return price + 2;
});

console.log(pricesWithFee);
console.log(prices);
~~~

Output:

~~~text
[ 14, 20, 27 ]
[ 12, 18, 25 ]
~~~

The original array is unchanged. The returned array has a result for each visited element.

Use **map** when every input item should correspond to an output value. Returning a value from the callback is essential:

~~~js
const names = ["Asha", "Mina"];

const labels = names.map(function (name) {
    return "User: " + name;
});

console.log(labels);
~~~

Output:

~~~text
[ 'User: Asha', 'User: Mina' ]
~~~

Without a return statement, the callback result is **undefined** for each visited element.

## Use callback indexes when needed

The **map** callback receives the current value, its index, and the original array:

~~~js
const tasks = ["Read", "Practice", "Review"];

const numbered = tasks.map(function (task, index) {
    return (index + 1) + ". " + task;
});

console.log(numbered);
~~~

Output:

~~~text
[ '1. Read', '2. Practice', '3. Review' ]
~~~

Only declare callback parameters that the function needs. The array is the third callback argument.

## Select values with filter

**filter** calls a predicate function for each present item. It returns a new array containing the items whose predicate result is truthy:

~~~js
const scores = [42, 85, 67, 91];

const passing = scores.filter(function (score) {
    return score >= 70;
});

console.log(passing);
~~~

Output:

~~~text
[ 85, 91 ]
~~~

The predicate does not need to return a literal boolean. Any truthy result keeps the item, and any falsy result excludes it. Returning a clear comparison is usually easiest to read.

**filter** keeps the original item values. If those values are objects, the new array contains references to the same objects.

## Combine values with reduce

**reduce** calls a callback with an accumulator and the current item. The callback returns the next accumulator value:

~~~js
const amounts = [5, 8, 3];

const total = amounts.reduce(function (sum, amount) {
    return sum + amount;
}, 0);

console.log(total);
~~~

Output:

~~~text
16
~~~

The second argument, **0**, is the initial accumulator. The callback runs with **sum** starting at zero, then returns the updated sum for the next item.

The accumulator can be a number, string, array, object, or another value. Here it builds a summary object:

~~~js
const orders = [
    { category: "book", price: 12 },
    { category: "game", price: 30 },
    { category: "book", price: 8 }
];

const summary = orders.reduce(function (result, order) {
    result.count += 1;
    result.total += order.price;
    result.byCategory[order.category] =
        (result.byCategory[order.category] || 0) + order.price;

    return result;
}, {
    count: 0,
    total: 0,
    byCategory: {}
});

console.log(summary);
~~~

Output:

~~~text
{
  count: 3,
  total: 50,
  byCategory: { book: 20, game: 30 }
}
~~~

This example mutates and returns the accumulator object. That is allowed, but the accumulator must still be returned so the next callback receives it.

Do not use **reduce** just because it can express a task. Prefer **map** for one-to-one transformations and **filter** for selection. Those names communicate intent more directly.

## Provide an initial value to reduce

Providing an initial accumulator makes the calculation explicit and allows an empty array:

~~~js
const emptyValues = [];

const total = emptyValues.reduce(function (sum, value) {
    return sum + value;
}, 0);

console.log(total);
~~~

Output:

~~~text
0
~~~

If no initial value is provided, **reduce** uses the first present element as the initial accumulator and starts the callback at a later element. Calling **reduce** on an empty array without an initial value throws a **TypeError**.

Be especially careful when the accumulator's type changes. A clear initial value makes both the starting type and empty-input behavior easier to understand.

## Flatten nested arrays with flat

**flat** returns a new array with nested arrays flattened to a chosen depth. The default depth is one:

~~~js
const nested = [1, [2, 3], [4, [5]]];

console.log(nested.flat());
console.log(nested);
~~~

Output:

~~~text
[ 1, 2, 3, 4, [ 5 ] ]
[ 1, [ 2, 3 ], [ 4, [ 5 ] ] ]
~~~

The original array remains nested. Pass a depth to flatten further:

~~~js
const nested = [1, [2, 3], [4, [5]]];

console.log(nested.flat(2));
console.log(nested.flat(Infinity));
~~~

Output:

~~~text
[ 1, 2, 3, 4, 5 ]
[ 1, 2, 3, 4, 5 ]
~~~

**flat** creates a new outer array and does not recursively clone objects inside it.

## Transform and flatten with flatMap

**flatMap** runs a mapping callback and flattens the result by one level:

~~~js
const sentences = ["red blue", "green"];

const words = sentences.flatMap(function (sentence) {
    return sentence.split(" ");
});

console.log(words);
~~~

Output:

~~~text
[ 'red', 'blue', 'green' ]
~~~

This is similar to calling **map** and then **flat(1)**:

~~~js
const words = sentences
    .map(function (sentence) {
        return sentence.split(" ");
    })
    .flat();

console.log(words);
~~~

Output:

~~~text
[ 'red', 'blue', 'green' ]
~~~

The flattening is only one level. If a callback returns deeper nested arrays, **flatMap** does not flatten all levels.

Returning an empty array removes an item from the resulting output. Returning a single value adds one output value:

~~~js
const values = [1, 2, 3, 4];

const evenLabels = values.flatMap(function (value) {
    if (value % 2 === 0) {
        return ["even:" + value];
    }

    return [];
});

console.log(evenLabels);
~~~

Output:

~~~text
[ 'even:2', 'even:4' ]
~~~

## Chain transformations

A method chain can express a sequence of transformations:

~~~js
const orders = [
    { customer: "Asha", total: 24, paid: true },
    { customer: "Mina", total: 12, paid: false },
    { customer: "Dev", total: 38, paid: true }
];

const paidOrderLabels = orders
    .filter(function (order) {
        return order.paid;
    })
    .map(function (order) {
        return order.customer + ": $" + order.total;
    });

console.log(paidOrderLabels);
~~~

Output:

~~~text
[ 'Asha: $24', 'Dev: $38' ]
~~~

Read the chain from top to bottom: keep paid orders, then turn each selected order into a label. Give intermediate results names if a long chain becomes hard to follow.

## Sparse arrays and transformation methods

A hole is a missing array index. **map**, **filter**, and **reduce** skip holes rather than calling their callback for those indexes:

~~~js
const sparse = [];
sparse.length = 3;
sparse[1] = 10;

const mapped = sparse.map(function (value) {
    return value * 2;
});

const filtered = sparse.filter(function () {
    return true;
});

const total = sparse.reduce(function (sum, value) {
    return sum + value;
}, 0);

console.log(mapped.length, 0 in mapped, 1 in mapped, 2 in mapped);
console.log(filtered);
console.log(total);
~~~

Output:

~~~text
3 false true false
[ 10 ]
10
~~~

**map** preserves the hole positions in its result. **filter** creates a compact result of values that passed the predicate. **reduce** does not invoke its callback for holes.

**flat** removes holes at the levels it flattens:

~~~js
const sparse = [];
sparse.length = 2;
sparse[1] = ["kept"];

console.log(sparse.flat());
~~~

Output:

~~~text
[ 'kept' ]
~~~

## Transformations are shallow

These methods create new outer results, but they do not automatically clone nested objects:

~~~js
const users = [
    { name: "Asha" },
    { name: "Mina" }
];

const selected = users.filter(function (user) {
    return user.name === "Asha";
});

selected[0].name = "Dev";

console.log(users[0].name);
console.log(selected[0].name);
~~~

Output:

~~~text
Dev
Dev
~~~

The **selected** array is new, but its object is the same object referenced in **users**. If nested data must be independent, copy or transform those objects deliberately.

## Common transformation mistakes

- **Using forEach when a transformed array is needed:** **forEach** returns **undefined**. Use **map**.
- **Forgetting to return from a map callback:** The corresponding output value becomes **undefined**.
- **Using map for selection:** **map** keeps one result position per present input. Use **filter** to keep or remove items.
- **Using filter and returning an assignment accidentally:** A truthy assigned value may retain every item unexpectedly.
- **Using reduce without an initial value:** Empty input throws, and the first item becomes the accumulator.
- **Using reduce when map or filter is clearer:** Choose the method that describes the intended operation.
- **Assuming flat flattens every depth by default:** The default depth is one.
- **Assuming flatMap deeply flattens callback results:** It flattens one level only.
- **Assuming these methods deeply clone objects:** They create new outer results but retain nested references.
- **Forgetting that holes are skipped:** These callbacks do not run for sparse-array holes.

## Try it yourself

1. Use **map** to convert Celsius values into Fahrenheit values.
2. Use **filter** to keep only products that are in stock.
3. Use **reduce** with an initial value to calculate a total price.
4. Use **reduce** to create a count of items by category.
5. Flatten an array one level and then two levels.
6. Use **flatMap** to turn a list of sentences into a flat list of words.
7. Chain **filter** and **map** to produce labels for selected records.
8. Compare the behavior of **map**, **filter**, and **reduce** on a sparse array.
9. Show that filtering an array of objects does not clone those objects.

## Key points

- **map** transforms each present element into a corresponding result.
- **filter** creates a compact array containing values whose predicate is truthy.
- **reduce** combines values using an accumulator and should usually have an initial value.
- **flat** flattens nested arrays to a chosen depth and does not mutate the source array.
- **flatMap** maps values and flattens one level.
- These methods create new outer results but do not deep-clone nested objects.
- Sparse-array holes are skipped by **map**, **filter**, and **reduce**.
- Prefer the method whose name clearly describes the transformation.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [46 - Array iteration methods](046-array-iteration-methods.md) | [Open Q&A](../qnas/047-transforming-arrays-map-filter-reduce-and-flat.md) | [Open example](../examples/047-transforming-arrays-map-filter-reduce-and-flat.md) | [48 - Searching and testing arrays](048-searching-and-testing-arrays.md) |