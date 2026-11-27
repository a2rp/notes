# 49 - Mutation, copying, and immutable array updates

JavaScript arrays can be changed in place, or you can create a new array that contains the updated values. Knowing which methods mutate their array helps you avoid surprising changes when multiple variables refer to the same data.

This chapter explains array mutation, aliases, shallow copies, immutable update patterns, and the change-by-copy methods.

## What you will learn

- Recognize common methods that modify the original array.
- Understand how two variables can refer to the same array.
- Copy an array with **slice**, spread syntax, or **Array.from**.
- Understand why those copies are shallow.
- Add, replace, and remove values without mutating the original array.
- Use **toReversed**, **toSorted**, **toSpliced**, and **with** when supported.
- Choose a mutation or copy strategy based on how the array is used.

## Mutation changes an existing array

A mutating operation changes the array object that already exists. If another variable refers to that same array, it observes the change too.

~~~js
const colors = ["teal", "gold"];
const sameColors = colors;

colors.push("coral");

console.log(colors);
console.log(sameColors);
console.log(colors === sameColors);
~~~

Output:

~~~text
[ 'teal', 'gold', 'coral' ]
[ 'teal', 'gold', 'coral' ]
true
~~~

The variables **colors** and **sameColors** do not hold separate arrays. They both refer to one array object.

## const does not make an array immutable

**const** prevents reassignment of the variable binding. It does not prevent changes to the array object.

~~~js
const scores = [8, 6];

scores.push(10);
scores[0] = 9;

console.log(scores);
~~~

Output:

~~~text
[ 9, 6, 10 ]
~~~

Reassigning the binding is a different operation and is not allowed:

~~~js
const scores = [8, 6];

// This would throw a TypeError:
// scores = [9, 10];
~~~

The array can still be mutated through methods or indexed assignment. To keep an original version available, create another array and use a non-mutating update.

## Common mutating array methods

The following methods change the array they are called on:

| Method | Effect on the source array | Return value |
| --- | --- | --- |
| **push** | Adds values at the end | New length |
| **pop** | Removes the final value | Removed value, or **undefined** if empty |
| **unshift** | Adds values at the beginning | New length |
| **shift** | Removes the first value | Removed value, or **undefined** if empty |
| **splice** | Inserts, replaces, or removes values at positions | Array of removed values |
| **sort** | Reorders values | The same array |
| **reverse** | Reverses the order | The same array |
| **fill** | Writes one value into a range | The same array |
| **copyWithin** | Copies part of the array to another position | The same array |

The return value does not always mean the same thing as the updated array. For example, **push** returns a number, while **reverse** returns the array itself.

### Add or remove values at either end

~~~js
const queue = ["Mina", "Asha"];

const lengthAfterAdding = queue.push("Dev");
const firstPerson = queue.shift();

console.log(lengthAfterAdding);
console.log(firstPerson);
console.log(queue);
~~~

Output:

~~~text
3
Mina
[ 'Asha', 'Dev' ]
~~~

**push** adds at the end and returns the new length. **shift** removes and returns the first item.

The corresponding operations at the other ends are **unshift** and **pop**:

~~~js
const queue = ["Asha", "Dev"];

const lengthAfterAdding = queue.unshift("Mina");
const lastPerson = queue.pop();

console.log(lengthAfterAdding);
console.log(lastPerson);
console.log(queue);
~~~

Output:

~~~text
3
Dev
[ 'Mina', 'Asha' ]
~~~

### Insert and remove values with splice

**splice** edits the source array at a chosen position. Its basic form is:

~~~js
array.splice(start, deleteCount, item1, item2);
~~~

It removes up to **deleteCount** items starting at **start**, then inserts any provided items at that position. It returns a new array containing the removed values.

~~~js
const colors = ["teal", "gold", "coral", "violet"];

const removed = colors.splice(1, 2, "silver");

console.log(removed);
console.log(colors);
~~~

Output:

~~~text
[ 'gold', 'coral' ]
[ 'teal', 'silver', 'violet' ]
~~~

To insert without removing, use a delete count of **0**:

~~~js
const steps = ["plan", "publish"];

steps.splice(1, 0, "write", "review");

console.log(steps);
~~~

Output:

~~~text
[ 'plan', 'write', 'review', 'publish' ]
~~~

To remove items without inserting replacements, omit the inserted items:

~~~js
const steps = ["plan", "write", "review", "publish"];

const removed = steps.splice(1, 2);

console.log(removed);
console.log(steps);
~~~

Output:

~~~text
[ 'write', 'review' ]
[ 'plan', 'publish' ]
~~~

A negative **start** counts from the end. When the delete count is omitted, **splice** removes from the start position through the end. Be deliberate with that form because it can remove more values than expected.

## Copying an array

A copy is a different outer array object. Updating the copy does not change the original array's positions.

### Copy with slice

**slice** returns a shallow copy of a selected range. With no arguments, it copies the full array.

~~~js
const original = ["red", "green", "blue"];
const copy = original.slice();

copy[0] = "gold";

console.log(original);
console.log(copy);
console.log(original === copy);
~~~

Output:

~~~text
[ 'red', 'green', 'blue' ]
[ 'gold', 'green', 'blue' ]
false
~~~

**slice** does not mutate the source. Its end index is exclusive when a range is supplied.

~~~js
const letters = ["a", "b", "c", "d"];

console.log(letters.slice(1, 3));
console.log(letters);
~~~

Output:

~~~text
[ 'b', 'c' ]
[ 'a', 'b', 'c', 'd' ]
~~~

### Copy with spread syntax

Array spread can place an iterable's values into a new array:

~~~js
const original = [2, 4, 6];
const copy = [...original];

copy.push(8);

console.log(original);
console.log(copy);
~~~

Output:

~~~text
[ 2, 4, 6 ]
[ 2, 4, 6, 8 ]
~~~

The outer array is new. Spread syntax does not recursively copy nested arrays or objects.

### Copy with Array.from

**Array.from** creates a new array from an iterable or array-like value:

~~~js
const original = ["north", "south"];
const copy = Array.from(original);

copy[1] = "west";

console.log(original);
console.log(copy);
~~~

Output:

~~~text
[ 'north', 'south' ]
[ 'north', 'west' ]
~~~

For an ordinary array, **slice**, spread syntax, and **Array.from** all create a shallow copy. They can differ for custom array subclasses or specially defined iteration behavior, but the ordinary forms are common ways to copy an array.

## A shallow copy keeps nested references

A shallow copy creates a new outer array but keeps references to the same nested objects or arrays.

~~~js
const original = [
    { name: "Asha", settings: { theme: "light" } }
];

const copy = [...original];

copy[0].name = "Mina";
copy[0].settings.theme = "dark";

console.log(original[0].name);
console.log(original[0].settings.theme);
console.log(original === copy);
console.log(original[0] === copy[0]);
~~~

Output:

~~~text
Mina
dark
false
true
~~~

The outer arrays differ, but the object at index 0 is shared. Both the original and the copy reach that same object.

If nested values need independent copies, decide which data must be copied and use an appropriate deep-copy strategy. A shallow array copy alone does not make nested data independent.

## Immutable updates

An immutable update creates a new array rather than changing the existing one. The word immutable describes the update approach: retain the previous array and return another array with the requested change.

### Replace one item with map

~~~js
const prices = [12, 20, 32];

const updatedPrices = prices.map(function (price, index) {
    return index === 1 ? 22 : price;
});

console.log(prices);
console.log(updatedPrices);
~~~

Output:

~~~text
[ 12, 20, 32 ]
[ 12, 22, 32 ]
~~~

**map** creates a new array. This callback returns the original value at every index except the one being replaced.

### Add values with spread

~~~js
const tasks = ["plan", "write"];
const updatedTasks = [...tasks, "review"];

console.log(tasks);
console.log(updatedTasks);
~~~

Output:

~~~text
[ 'plan', 'write' ]
[ 'plan', 'write', 'review' ]
~~~

To add at the beginning, put the new value before the spread:

~~~js
const tasks = ["write", "review"];
const updatedTasks = ["plan", ...tasks];

console.log(updatedTasks);
~~~

Output:

~~~text
[ 'plan', 'write', 'review' ]
~~~

### Remove values with filter

~~~js
const tasks = [
    { id: 1, title: "Plan" },
    { id: 2, title: "Write" },
    { id: 3, title: "Review" }
];

const remainingTasks = tasks.filter(function (task) {
    return task.id !== 2;
});

console.log(tasks.length);
console.log(remainingTasks.map(function (task) {
    return task.title;
}));
~~~

Output:

~~~text
3
[ 'Plan', 'Review' ]
~~~

**filter** creates a new outer array containing the values that pass the predicate. It does not clone the task objects, so unchanged objects are still shared references.

### Insert or remove at an index with slices and spread

For older runtimes without **toSpliced**, slices and spread can build a new array around an insertion point.

~~~js
const steps = ["plan", "publish"];
const insertAt = 1;

const updatedSteps = [
    ...steps.slice(0, insertAt),
    "write",
    ...steps.slice(insertAt)
];

console.log(steps);
console.log(updatedSteps);
~~~

Output:

~~~text
[ 'plan', 'publish' ]
[ 'plan', 'write', 'publish' ]
~~~

To remove one item at a known index, join the parts before and after that index:

~~~js
const steps = ["plan", "write", "review", "publish"];
const removeAt = 1;

const updatedSteps = [
    ...steps.slice(0, removeAt),
    ...steps.slice(removeAt + 1)
];

console.log(steps);
console.log(updatedSteps);
~~~

Output:

~~~text
[ 'plan', 'write', 'review', 'publish' ]
[ 'plan', 'review', 'publish' ]
~~~

These forms make the new array explicit. Check the index boundaries when building them from dynamic input.

## Change-by-copy array methods

Modern JavaScript includes methods that perform familiar operations while returning a new array. They are often called change-by-copy methods because the original array stays unchanged.

| Mutating method | Change-by-copy method |
| --- | --- |
| **reverse** | **toReversed** |
| **sort** | **toSorted** |
| **splice** | **toSpliced** |
| Indexed assignment | **with** |

These methods are available in modern runtimes. If a project supports older browsers or runtimes, check compatibility or use a copy-based alternative.

### Reverse without changing the original

**reverse** mutates the source. **toReversed** returns a reversed copy.

~~~js
const letters = ["a", "b", "c"];
const reversed = letters.toReversed();

console.log(letters);
console.log(reversed);
console.log(letters === reversed);
~~~

Output:

~~~text
[ 'a', 'b', 'c' ]
[ 'c', 'b', 'a' ]
false
~~~

### Sort without changing the original

**sort** mutates its array. **toSorted** returns a sorted copy.

~~~js
const names = ["Zara", "Asha", "Mina"];
const sortedNames = names.toSorted();

console.log(names);
console.log(sortedNames);
~~~

Output:

~~~text
[ 'Zara', 'Asha', 'Mina' ]
[ 'Asha', 'Mina', 'Zara' ]
~~~

Sorting rules and custom comparators are covered in the next chapter. Here, the important distinction is that **toSorted** preserves the original array order.

### Insert, remove, or replace without changing the original

**toSpliced** works like **splice** but returns a new array and leaves its source unchanged.

~~~js
const steps = ["plan", "write", "publish"];
const updatedSteps = steps.toSpliced(1, 1, "review");

console.log(steps);
console.log(updatedSteps);
~~~

Output:

~~~text
[ 'plan', 'write', 'publish' ]
[ 'plan', 'review', 'publish' ]
~~~

Its arguments follow the same general form as **splice**: a start index, a delete count, and optional inserted values.

### Replace one item with with

**with** returns a copy where one index has a replacement value.

~~~js
const scores = [72, 84, 91];
const updatedScores = scores.with(1, 88);

console.log(scores);
console.log(updatedScores);
~~~

Output:

~~~text
[ 72, 84, 91 ]
[ 72, 88, 91 ]
~~~

A negative index counts from the end:

~~~js
const scores = [72, 84, 91];

console.log(scores.with(-1, 95));
~~~

Output:

~~~text
[ 72, 84, 95 ]
~~~

An index outside the array's valid range causes **with** to throw a **RangeError**. Handle or validate dynamic indexes when they might be out of range.

## Mutation and immutability are design choices

Mutation can be direct and efficient when the array is local, exclusively owned, and no previous version needs to be preserved. For example, building a new array with **push** inside a private loop can be reasonable.

~~~js
const doubled = [];

for (const value of [2, 4, 6]) {
    doubled.push(value * 2);
}

console.log(doubled);
~~~

Output:

~~~text
[ 4, 8, 12 ]
~~~

A new array is being built here, so changing it does not alter the source values. The important question is whether some other part of the program already holds the array being mutated.

Prefer copy-based updates when other code needs the previous state, when several parts share a reference, or when predictable state changes make debugging easier. Avoid copying repeatedly inside a loop when one clear mutable accumulator would be simpler and safe.

## Common mistakes

- Assuming **const** makes the contents of an array immutable.
- Forgetting that assigning an array to another variable copies its reference, not its values.
- Assuming **push** returns the updated array. It returns the new length.
- Assuming **splice** returns the edited source array. It returns the removed values.
- Using **splice**, **sort**, or **reverse** when the source array must stay unchanged.
- Assuming **slice**, spread syntax, or **Array.from** deeply copy nested objects.
- Updating a nested object through a shallow copy and expecting the original nested object to stay unchanged.
- Creating a copy but then mutating the original by mistake.
- Repeatedly copying a large array inside a loop when a single local mutation would be clearer.
- Calling **with** with an invalid index and not handling its **RangeError**.
- Using **fill** with one object when you intended to create a separate object for every position.
- Treating immutable update patterns as automatic deep copies.

## Try it yourself

1. Use **push** and **pop**, then record both their return values and the changed array.
2. Remove two items with **splice** and inspect the returned removed-items array.
3. Make a copy with **slice**, change the copy, and compare both arrays.
4. Replace one item with **map** while preserving the original array.
5. Remove an item by identifier using **filter**.
6. Insert an item at a dynamic position using **toSpliced**.
7. Replace the final item with **with** and a negative index.
8. Copy an array of objects, change one nested property, and explain why the source reflects that change.
9. Create three separate objects in an array instead of repeating one object reference with **fill**.
10. Choose one example where mutation is clear and safe, and one where a copy-based update better preserves previous state.

## Key points

- Mutating methods change their source array.
- Assigning an array to another variable creates an alias, not a copy.
- **const** prevents rebinding but does not prevent array mutation.
- **slice**, spread syntax, and **Array.from** can make shallow copies.
- A shallow copy has a new outer array but shares nested object references.
- **map**, **filter**, spread syntax, and slices can express common immutable updates.
- **toReversed**, **toSorted**, **toSpliced**, and **with** return changed copies in modern runtimes.
- Choose mutation or copying based on ownership, sharing, and whether prior state must be preserved.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [48 - Searching and testing arrays](048-searching-and-testing-arrays.md) | [Open Q&A](../qnas/049-mutation-copying-and-immutable-array-updates.md) | [Open example](../examples/049-mutation-copying-and-immutable-array-updates.md) | [50 - Sorting, comparators, and locale-aware comparison](050-sorting-comparators-and-locale-aware-comparison.md) |
