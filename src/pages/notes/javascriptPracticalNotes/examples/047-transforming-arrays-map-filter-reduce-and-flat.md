# 47 - Transforming arrays: map, filter, reduce, and flat - Examples

These examples demonstrate array transformation, selection, aggregation, flattening, and chaining. Each includes a question, complete code, expected output, and explanation.

## 1. Transform every value with map

### Question

How can each number be doubled into a new array?

### Code

~~~js
const prices = [12, 18, 25];

const pricesWithFee = prices.map(function (price) {
    return price + 2;
});

console.log(pricesWithFee);
console.log(prices);
~~~

### Expected output

~~~text
[ 14, 20, 27 ]
[ 12, 18, 25 ]
~~~

### Explanation

**map** calls the callback for each present value and returns the callback results in a new array. The original array remains unchanged.

## 2. Use the index while mapping

### Question

How can each item be turned into a numbered label?

### Code

~~~js
const tasks = ["Read", "Practice", "Review"];

const labels = tasks.map(function (task, index) {
    return (index + 1) + ". " + task;
});

console.log(labels);
~~~

### Expected output

~~~text
[ '1. Read', '2. Practice', '3. Review' ]
~~~

### Explanation

The second callback argument is the current index. The callback returns one label for each present array item.

## 3. Notice a missing return in map

### Question

What happens when a mapping callback logs a value but does not return one?

### Code

~~~js
const values = [2, 4];

const result = values.map(function (value) {
    console.log(value * 2);
});

console.log(result);
~~~

### Expected output

~~~text
4
8
[ undefined, undefined ]
~~~

### Explanation

The callback logs the doubled value but has no return statement. Therefore, each mapped result is **undefined**.

## 4. Select values with filter

### Question

How can an array be filtered to keep only passing scores?

### Code

~~~js
const scores = [42, 85, 67, 91];

const passingScores = scores.filter(function (score) {
    return score >= 70;
});

console.log(passingScores);
~~~

### Expected output

~~~text
[ 85, 91 ]
~~~

### Explanation

A truthy predicate result keeps the original value. The result is a compact new array.

## 5. Filter records by a property

### Question

How can you keep only products that are in stock?

### Code

~~~js
const products = [
    { name: "Notebook", inStock: true },
    { name: "Marker", inStock: false },
    { name: "Folder", inStock: true }
];

const available = products.filter(function (product) {
    return product.inStock;
});

console.log(available.map(function (product) {
    return product.name;
}));
~~~

### Expected output

~~~text
[ 'Notebook', 'Folder' ]
~~~

### Explanation

**filter** selects the original product objects. A second **map** transforms those selected objects into names.

## 6. Add values with reduce

### Question

How can an array of amounts be combined into a total?

### Code

~~~js
const amounts = [5, 8, 3];

const total = amounts.reduce(function (sum, amount) {
    return sum + amount;
}, 0);

console.log(total);
~~~

### Expected output

~~~text
16
~~~

### Explanation

The accumulator begins at zero. Each callback returns the next sum.

## 7. Count items with reduce

### Question

How can **reduce** calculate the number of array elements?

### Code

~~~js
const colors = ["teal", "amber", "violet"];

const count = colors.reduce(function (total) {
    return total + 1;
}, 0);

console.log(count);
~~~

### Expected output

~~~text
3
~~~

### Explanation

The callback increments the accumulator once per present item. In application code, **length** is usually simpler for counting a dense array, but this illustrates how the accumulator works.

## 8. Build an aggregate object with reduce

### Question

How can a reduction produce a count and total?

### Code

~~~js
const orders = [
    { price: 12 },
    { price: 30 },
    { price: 8 }
];

const summary = orders.reduce(function (result, order) {
    result.count += 1;
    result.total += order.price;
    return result;
}, { count: 0, total: 0 });

console.log(summary);
~~~

### Expected output

~~~text
{ count: 3, total: 50 }
~~~

### Explanation

The accumulator is an object. Each callback updates and returns the same object so the next call receives it.

## 9. Group totals by category with reduce

### Question

How can totals be accumulated for each category?

### Code

~~~js
const orders = [
    { category: "book", price: 12 },
    { category: "game", price: 30 },
    { category: "book", price: 8 }
];

const totals = orders.reduce(function (result, order) {
    result[order.category] =
        (result[order.category] || 0) + order.price;

    return result;
}, {});

console.log(totals);
~~~

### Expected output

~~~text
{ book: 20, game: 30 }
~~~

### Explanation

The category is used as an object key. The initial empty object ensures the accumulator exists even before the first order.

## 10. Use reduce safely on an empty array

### Question

How can summing an empty array return a useful result?

### Code

~~~js
const values = [];

const total = values.reduce(function (sum, value) {
    return sum + value;
}, 0);

console.log(total);
~~~

### Expected output

~~~text
0
~~~

### Explanation

The initial accumulator defines the result for empty input. Without the initial zero, this call would throw a **TypeError**.

## 11. Flatten one level with flat

### Question

What does **flat()** do by default?

### Code

~~~js
const nested = [1, [2, 3], [4, [5]]];

console.log(nested.flat());
console.log(nested);
~~~

### Expected output

~~~text
[ 1, 2, 3, 4, [ 5 ] ]
[ 1, [ 2, 3 ], [ 4, [ 5 ] ] ]
~~~

### Explanation

The default depth is one. **flat** returns a new outer array and leaves the original nested array unchanged.

## 12. Flatten to a chosen depth

### Question

How can an array be flattened two levels or completely?

### Code

~~~js
const nested = [1, [2, [3, [4]]]];

console.log(nested.flat(2));
console.log(nested.flat(Infinity));
~~~

### Expected output

~~~text
[ 1, 2, 3, [ 4 ] ]
[ 1, 2, 3, 4 ]
~~~

### Explanation

The depth argument controls how many nested array levels are flattened. **Infinity** flattens all nested array levels.

## 13. Flatten holes out of an array

### Question

What happens to hole positions when **flat** flattens an array?

### Code

~~~js
const sparse = [];
sparse.length = 2;
sparse[1] = ["kept"];

console.log(sparse.flat());
~~~

### Expected output

~~~text
[ 'kept' ]
~~~

### Explanation

**flat** removes holes at the levels it flattens.

## 14. Split strings into a flat word list with flatMap

### Question

How can each sentence be split into words and combined into one array?

### Code

~~~js
const sentences = ["red blue", "green"];

const words = sentences.flatMap(function (sentence) {
    return sentence.split(" ");
});

console.log(words);
~~~

### Expected output

~~~text
[ 'red', 'blue', 'green' ]
~~~

### Explanation

The callback returns an array of words for each sentence. **flatMap** flattens each returned array by one level.

## 15. Keep or remove values with flatMap

### Question

How can a callback produce zero or one output values for each input?

### Code

~~~js
const values = [1, 2, 3, 4];

const evenValues = values.flatMap(function (value) {
    if (value % 2 === 0) {
        return [value];
    }

    return [];
});

console.log(evenValues);
~~~

### Expected output

~~~text
[ 2, 4 ]
~~~

### Explanation

An empty returned array contributes no values. A one-item array contributes that item after flattening.

## 16. See that flatMap flattens only one level

### Question

Does **flatMap** flatten nested callback results completely?

### Code

~~~js
const values = [1, 2];

const nested = values.flatMap(function (value) {
    return [[value, value * 10]];
});

console.log(nested);
~~~

### Expected output

~~~text
[ [ 1, 10 ], [ 2, 20 ] ]
~~~

### Explanation

The callback returns a two-level nested structure. **flatMap** removes only the outer returned array level, leaving the inner arrays.

## 17. Chain filter and map

### Question

How can active user records be selected and then converted into names?

### Code

~~~js
const users = [
    { name: "Asha", active: true },
    { name: "Mina", active: false },
    { name: "Dev", active: true }
];

const activeNames = users
    .filter(function (user) {
        return user.active;
    })
    .map(function (user) {
        return user.name;
    });

console.log(activeNames);
~~~

### Expected output

~~~text
[ 'Asha', 'Dev' ]
~~~

### Explanation

The first method selects active objects. The next method transforms those selected objects into strings.

## 18. Compare map, filter, and reduce on a sparse array

### Question

How does each method treat the missing positions?

### Code

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

### Expected output

~~~text
3 false true false
[ 10 ]
10
~~~

### Explanation

**map** preserves hole positions in its result. **filter** creates a compact list of present matching values. **reduce** skips holes while combining present values.

## 19. Show that filter does not clone objects

### Question

Does changing an object through a filtered result also affect the original array?

### Code

~~~js
const users = [{ name: "Asha" }, { name: "Mina" }];

const selected = users.filter(function (user) {
    return user.name === "Asha";
});

selected[0].name = "Dev";

console.log(users[0].name);
console.log(selected[0].name);
~~~

### Expected output

~~~text
Dev
Dev
~~~

### Explanation

The selected array is new, but its element is the same object reference found in the source array.

## Practice prompts

1. Use **map** to convert an array of minutes to seconds.
2. Use **filter** to select products whose stock is greater than zero.
3. Use **reduce** with an initial value to calculate a cart total.
4. Build an object of item counts by category with **reduce**.
5. Use **flat** with a depth of one and two on the same nested data.
6. Use **flatMap** to create a flat list from groups of labels.
7. Chain filtering and mapping to display names of selected records.
8. Create a sparse array and inspect the outputs of **map**, **filter**, and **reduce**.
9. Filter objects, mutate one selected object, and explain why the source changes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [46 - Array iteration methods](046-array-iteration-methods.md) | [Open lesson](../lessons/047-transforming-arrays-map-filter-reduce-and-flat.md) | [Open Q&A](../qnas/047-transforming-arrays-map-filter-reduce-and-flat.md) | [48 - Searching and testing arrays](../lessons/048-searching-and-testing-arrays.md) |