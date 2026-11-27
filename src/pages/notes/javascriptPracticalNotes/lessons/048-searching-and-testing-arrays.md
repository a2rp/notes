# 48 - Searching and testing arrays

Arrays often contain more values than a page or program needs to use at once. JavaScript provides methods to check whether a value exists, find a matching item, locate its position, or test whether some or all items satisfy a condition.

This chapter covers value searches, predicate searches, boolean tests, search positions, short-circuiting, object identity, and sparse-array behavior.

## What you will learn

- Choose between **includes**, **indexOf**, **find**, and **findIndex**.
- Search from a chosen position, including a negative position.
- Find the last matching value or position.
- Check whether some or every item passes a test.
- Understand which equality rule each search uses.
- Predict how these methods behave with objects and sparse arrays.
- Avoid common mistakes when a search has no match.

## Start with the question you need to answer

Choose a method based on the result your code needs:

| Question | Useful method | Result |
| --- | --- | --- |
| Is this value present? | **includes** | **true** or **false** |
| Where is this exact value? | **indexOf** or **lastIndexOf** | An index or **-1** |
| Which item matches this rule? | **find** or **findLast** | An item or **undefined** |
| Where is the first or last matching item? | **findIndex** or **findLastIndex** | An index or **-1** |
| Does at least one item pass a rule? | **some** | **true** or **false** |
| Do all items pass a rule? | **every** | **true** or **false** |

Use the simplest method that directly describes the result you want. A boolean membership check usually should not be written as a manual loop, and a predicate search usually should not be forced into **indexOf**.

## Check for an exact value with includes

**includes** returns **true** when an array contains a matching value and **false** otherwise.

~~~js
const colors = ["teal", "gold", "coral"];

console.log(colors.includes("gold"));
console.log(colors.includes("violet"));
~~~

Output:

~~~text
true
false
~~~

This answers a membership question. It does not tell you the matching position.

### Searching from a starting index

The optional **fromIndex** argument controls where the search begins. The index itself is included in the search.

~~~js
const letters = ["a", "b", "a", "c"];

console.log(letters.includes("a", 1));
console.log(letters.includes("a", 3));
~~~

Output:

~~~text
true
false
~~~

The first call searches at index 1 and onward, so it finds the second **a**. The second call begins at index 3, after both **a** values.

A negative **fromIndex** counts backward from the array length. It does not reverse the search.

~~~js
const values = ["red", "green", "blue", "gold"];

console.log(values.includes("blue", -2));
console.log(values.includes("green", -2));
~~~

Output:

~~~text
true
false
~~~

For an array of length 4, **-2** starts at index 2. A negative start earlier than the beginning is treated as index 0. A start at or beyond the length cannot find an item.

### Equality used by includes

**includes** uses the **SameValueZero** equality rule. For ordinary values this behaves like strict equality, with one notable difference: **NaN** matches **NaN**.

~~~js
const measurements = [12, NaN, 18];

console.log(measurements.includes(NaN));
console.log(measurements.includes(12));
console.log(measurements.includes("12"));
~~~

Output:

~~~text
true
true
false
~~~

**SameValueZero** treats positive zero and negative zero as equal as well. In practice, this is usually what a membership check should do.

Objects are matched by identity, not by comparing their properties:

~~~js
const firstUser = { name: "Asha" };
const users = [firstUser];

console.log(users.includes(firstUser));
console.log(users.includes({ name: "Asha" }));
~~~

Output:

~~~text
true
false
~~~

The second object has the same property value, but it is a different object.

## Find an exact value's position with indexOf

**indexOf** returns the first index containing the requested value. It returns **-1** when no matching value exists.

~~~js
const tasks = ["draft", "review", "publish", "review"];

console.log(tasks.indexOf("review"));
console.log(tasks.indexOf("archive"));
~~~

Output:

~~~text
1
-1
~~~

Indexes start at **0**, so the first **review** is at index 1.

### Search from a position

Like **includes**, **indexOf** accepts an optional starting index:

~~~js
const tasks = ["draft", "review", "publish", "review"];

console.log(tasks.indexOf("review", 2));
console.log(tasks.indexOf("review", -2));
~~~

Output:

~~~text
3
3
~~~

A negative starting index is calculated from the end. In this array, **-2** begins at index 2. The method still searches forward from that position.

### Find the last exact match

**lastIndexOf** searches backward and returns the last matching index. Its default start is the final array index.

~~~js
const events = ["open", "save", "close", "save"];

console.log(events.lastIndexOf("save"));
console.log(events.lastIndexOf("save", 2));
console.log(events.lastIndexOf("reset"));
~~~

Output:

~~~text
3
1
-1
~~~

The optional starting index sets the first position to inspect while searching backward. A negative value counts from the end.

### Equality and special values

**indexOf** and **lastIndexOf** use strict equality. As a result, they do not find **NaN**:

~~~js
const values = [NaN, 4];

console.log(values.includes(NaN));
console.log(values.indexOf(NaN));
console.log(values.lastIndexOf(NaN));
~~~

Output:

~~~text
true
-1
-1
~~~

Use **includes** when asking whether a value is present, especially if the array might contain **NaN**. Use **indexOf** or **lastIndexOf** when you need the position of an ordinary exact value.

## Search using a condition with find

A value search asks whether an exact value is present. A predicate search asks whether an item meets a rule.

**find** calls a callback for items in ascending index order and returns the first item for which the callback returns a truthy value.

~~~js
const products = [
    { name: "Notebook", price: 4 },
    { name: "Lamp", price: 18 },
    { name: "Chair", price: 42 }
];

const affordableProduct = products.find(function (product) {
    return product.price < 20;
});

console.log(affordableProduct.name);
~~~

Output:

~~~text
Notebook
~~~

The callback receives the current **value**, its **index**, and the **array** being searched, in that order:

~~~js
const scores = [14, 27, 35];

const result = scores.find(function (score, index, array) {
    console.log(index, array.length);
    return score >= 30;
});

console.log(result);
~~~

Output:

~~~text
0 3
1 3
2 3
35
~~~

The callback can accept only the arguments it needs. It stops running after the first match.

### No matching item

When no item passes the condition, **find** returns **undefined**:

~~~js
const ages = [12, 15, 17];

const adult = ages.find(function (age) {
    return age >= 18;
});

console.log(adult);
~~~

Output:

~~~text
undefined
~~~

If **undefined** itself could be a valid matching array value, use **findIndex** to distinguish a match from no match. **findIndex** returns **-1** only when no item passes its condition.

## Find a matching position with findIndex

**findIndex** uses the same callback pattern as **find**, but it returns the first matching index instead of the item.

~~~js
const inventory = [
    { name: "Pen", count: 0 },
    { name: "Folder", count: 3 },
    { name: "Tape", count: 5 }
];

const firstAvailableIndex = inventory.findIndex(function (item) {
    return item.count > 0;
});

console.log(firstAvailableIndex);
console.log(inventory[firstAvailableIndex].name);
~~~

Output:

~~~text
1
Folder
~~~

If no item matches, the result is **-1**. Do not use that result as an array index: **array[-1]** is not the final array element.

~~~js
const prices = [3, 5, 8];

const expensiveIndex = prices.findIndex(function (price) {
    return price > 10;
});

console.log(expensiveIndex);
~~~

Output:

~~~text
-1
~~~

Always handle the no-match result before using the index.

~~~js
const selectedIndex = prices.findIndex(function (price) {
    return price === 5;
});

if (selectedIndex !== -1) {
    console.log(prices[selectedIndex]);
}
~~~

Output:

~~~text
5
~~~

### Find the last match with findLast and findLastIndex

**findLast** and **findLastIndex** search from the final index toward index 0. They use a predicate, just like **find** and **findIndex**.

~~~js
const readings = [11, 28, 34, 19, 42];

const lastHighReading = readings.findLast(function (reading) {
    return reading >= 30;
});

const lastHighIndex = readings.findLastIndex(function (reading) {
    return reading >= 30;
});

console.log(lastHighReading);
console.log(lastHighIndex);
~~~

Output:

~~~text
42
4
~~~

The first match encountered while searching backward is the last matching item in normal array order. These methods are part of modern JavaScript runtimes. If code must run in an older runtime, check whether the methods are supported there or use a loop that searches backward.

## Test conditions with some and every

**some** answers whether at least one item passes a condition. It stops as soon as the callback returns a truthy value.

~~~js
const scores = [41, 58, 73, 89];

const hasPassingScore = scores.some(function (score) {
    return score >= 70;
});

console.log(hasPassingScore);
~~~

Output:

~~~text
true
~~~

If no item passes, **some** returns **false**.

**every** answers whether all items pass a condition. It stops as soon as the callback returns a falsy value.

~~~js
const scores = [81, 74, 93];

const allPassed = scores.every(function (score) {
    return score >= 50;
});

console.log(allPassed);
~~~

Output:

~~~text
true
~~~

If any score is below 50, **every** returns **false**. The callback result is converted to a boolean for the test; it does not need to return the literal **true** or **false**.

### Empty arrays

On an empty array, **some** returns **false**, and **every** returns **true**:

~~~js
console.log([].some(function () {
    return true;
}));

console.log([].every(function () {
    return false;
}));
~~~

Output:

~~~text
false
true
~~~

This follows the meaning of each question. There is no item that can make **some** true. There is also no counterexample that can make **every** false. This behavior is sometimes called vacuous truth.

### Combine conditions when the question is specific

Use **some** and **every** when their meaning matches the question. For example, to check that at least one required field is missing:

~~~js
const fields = [
    { name: "email", value: "asha@example.test" },
    { name: "phone", value: "" }
];

const hasMissingField = fields.some(function (field) {
    return field.value === "";
});

console.log(hasMissingField);
~~~

Output:

~~~text
true
~~~

To check that all quantities are positive:

~~~js
const quantities = [2, 5, 1];

const allPositive = quantities.every(function (quantity) {
    return quantity > 0;
});

console.log(allPositive);
~~~

Output:

~~~text
true
~~~

## Callback details and early exit

The predicate methods **find**, **findIndex**, **findLast**, **findLastIndex**, **some**, and **every** call a callback with the current value, index, and source array. They also accept an optional **thisArg** for ordinary functions that use **this**. Arrow functions keep their surrounding **this** and ignore that binding argument.

Each method stops once it knows the result:

- **find** stops at the first match.
- **findIndex** stops at the first match.
- **findLast** stops at the last match in array order, searching backward.
- **findLastIndex** stops at the last match in array order, searching backward.
- **some** stops at the first truthy callback result.
- **every** stops at the first falsy callback result.

Because of short-circuiting, the callback may not run for every item. Do not rely on it to perform work for every element. Use an iteration or transformation method when every item must be processed.

Prefer callbacks that calculate a result without changing the array or unrelated state. Mutating data during a search makes the search harder to follow because later callback calls observe the changed data.

## Sparse arrays and missing indexes

A sparse array has indexes that have no property value. These methods do not all treat such holes in the same way.

~~~js
const sparse = ["first", , "third"];

console.log(sparse.includes(undefined));
console.log(sparse.indexOf(undefined));

const found = sparse.find(function (value, index) {
    return index === 1 && value === undefined;
});

const anyUndefined = sparse.some(function (value) {
    return value === undefined;
});

console.log(found);
console.log(anyUndefined);
~~~

Output:

~~~text
true
-1
undefined
false
~~~

**includes** treats a hole like an **undefined** value when checking an index. **indexOf** skips holes. **find** visits each index in its range, including a hole, and receives **undefined** for that index. **some** and **every** skip holes because their callbacks run only for indexes that exist.

A **find** result of **undefined** alone does not tell you whether the method found an actual **undefined** value or found no match. Use **findIndex** if that distinction matters.

Sparse arrays are uncommon in everyday application code. When they occur, reason about missing indexes explicitly rather than assuming every array method treats a hole as a normal **undefined** value.

## Objects are compared by identity

Value-based methods use the method's equality rule, and predicate methods test each value according to your callback. Neither approach automatically compares object properties deeply.

~~~js
const target = { id: 7 };
const records = [{ id: 7 }, target];

console.log(records.includes({ id: 7 }));
console.log(records.includes(target));

const matchingRecord = records.find(function (record) {
    return record.id === 7;
});

console.log(matchingRecord === records[0]);
~~~

Output:

~~~text
false
true
true
~~~

Use **includes** when you have the exact object reference. Use **find** with a predicate when you want to match by a property such as an identifier.

## Common mistakes

- Using **indexOf(value)** when a boolean is all you need. Prefer **includes(value)**.
- Expecting **indexOf(NaN)** to find **NaN**. It returns **-1** because it uses strict equality.
- Treating **-1** as a valid array index after **indexOf** or **findIndex**.
- Expecting **find** to return an index. It returns an item; use **findIndex** for the position.
- Expecting **find** to return **null** when there is no match. It returns **undefined**.
- Using **find** when every matching item is needed. Use **filter** for all matches.
- Assuming **some** is true for an empty array or **every** is false for an empty array.
- Assuming separate objects with equal properties match in **includes**.
- Assuming **includes**, **indexOf**, and predicate methods handle sparse holes identically.
- Using **some** or **every** for callbacks that must run on every item, despite their short-circuit behavior.
- Forgetting that **findLast** and **findLastIndex** need a runtime that supports them.

## Try it yourself

1. Check whether an array of usernames contains a given name.
2. Find the first occurrence of a value after a given starting index.
3. Find the final occurrence of a duplicated value.
4. Search a list of products for the first item below a price limit.
5. Use **findIndex** and handle the case where it returns **-1**.
6. Find the last reading above a threshold and report both its value and index.
7. Use **some** to test whether any task is overdue.
8. Use **every** to test whether every form field is valid.
9. Compare **includes**, **indexOf**, **find**, and **some** on an array containing **NaN**.
10. Make a sparse array and compare how **includes**, **indexOf**, **find**, and **some** process a hole.

## Key points

- **includes** tests for a value and uses **SameValueZero**, so it can find **NaN**.
- **indexOf** and **lastIndexOf** return positions and use strict equality.
- **find** and **findLast** return matching items; **findIndex** and **findLastIndex** return positions.
- **some** tests whether at least one item passes a condition.
- **every** tests whether all items pass a condition, and is true for an empty array.
- **some** is false for an empty array.
- Predicate searches and tests short-circuit when they know the answer.
- Object searches compare identity unless a predicate checks properties.
- Sparse-array holes are handled differently by different methods.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [47 - Transforming arrays: map, filter, reduce, and flat](047-transforming-arrays-map-filter-reduce-and-flat.md) | [Open Q&A](../qnas/048-searching-and-testing-arrays.md) | [Open example](../examples/048-searching-and-testing-arrays.md) | [49 - Mutation, copying, and immutable array updates](049-mutation-copying-and-immutable-array-updates.md) |
