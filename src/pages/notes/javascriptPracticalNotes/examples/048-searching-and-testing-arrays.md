# 48 - Searching and testing arrays: examples

These examples show how to search arrays for exact values, locate items by a condition, and test whether some or all items pass a rule. The snippets are for reading and practice. Each includes expected console output and an explanation.

## 1. Check whether an exact value exists

### Question

Does the list of supported themes contain **dark**?

### Code

~~~js
const themes = ["light", "dark", "contrast"];

console.log(themes.includes("dark"));
console.log(themes.includes("sepia"));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

**includes** returns a boolean for a membership check. It does not return the index of the matching value.

## 2. Search for NaN

### Question

How do **includes** and **indexOf** differ when the array contains **NaN**?

### Code

~~~js
const readings = [14, NaN, 27];

console.log(readings.includes(NaN));
console.log(readings.indexOf(NaN));
~~~

### Expected output

~~~text
true
-1
~~~

### Explanation

**includes** uses **SameValueZero** equality and can match **NaN**. **indexOf** uses strict equality, where **NaN** is not equal to itself.

## 3. Find an exact value's position

### Question

Find the first **review** task, then search for the next one after index 0.

### Code

~~~js
const tasks = ["draft", "review", "publish", "review"];

console.log(tasks.indexOf("review"));
console.log(tasks.indexOf("review", 2));
console.log(tasks.indexOf("archive"));
~~~

### Expected output

~~~text
1
3
-1
~~~

### Explanation

**indexOf** returns the first match at or after its starting index. It returns **-1** when there is no match, so check for that value before using the result as an index.

## 4. Find the final exact match

### Question

Find the final index of **review**, then search backward only as far as index 2.

### Code

~~~js
const tasks = ["draft", "review", "publish", "review"];

console.log(tasks.lastIndexOf("review"));
console.log(tasks.lastIndexOf("review", 2));
~~~

### Expected output

~~~text
3
1
~~~

### Explanation

**lastIndexOf** searches backward. Its optional second argument sets the first index to inspect during that backward search.

## 5. Search from a negative starting position

### Question

What values can be found when **includes** starts two positions from the end?

### Code

~~~js
const colors = ["red", "green", "blue", "gold"];

console.log(colors.includes("blue", -2));
console.log(colors.includes("green", -2));
console.log(colors.includes("gold", -2));
~~~

### Expected output

~~~text
true
false
true
~~~

### Explanation

For an array of length 4, **-2** means index 2. The search begins at **blue** and continues forward through **gold**. A negative start does not search backward.

## 6. Find the first item that matches a condition

### Question

Find the first available product and display its name.

### Code

~~~js
const products = [
    { name: "Notebook", stock: 0 },
    { name: "Marker", stock: 4 },
    { name: "Folder", stock: 7 }
];

const firstAvailable = products.find(function (product) {
    return product.stock > 0;
});

if (firstAvailable !== undefined) {
    console.log(firstAvailable.name);
} else {
    console.log("No product available");
}
~~~

### Expected output

~~~text
Marker
~~~

### Explanation

**find** returns the first item whose predicate is truthy. It returns **undefined** if no item matches, so handle that case before reading a property.

## 7. Find a matching index and handle no match

### Question

Find the first temperature above 30. Print a message if there is no such temperature.

### Code

~~~js
const temperatures = [18, 24, 29];

const hotIndex = temperatures.findIndex(function (temperature) {
    return temperature > 30;
});

if (hotIndex === -1) {
    console.log("No high temperature");
} else {
    console.log(hotIndex, temperatures[hotIndex]);
}
~~~

### Expected output

~~~text
No high temperature
~~~

### Explanation

**findIndex** returns **-1** when no predicate match exists. Checking for **-1** avoids treating it as an array index.

## 8. Search backward with findLast

### Question

Find the last message whose status is **sent**.

### Code

~~~js
const messages = [
    { id: 101, status: "draft" },
    { id: 102, status: "sent" },
    { id: 103, status: "sent" },
    { id: 104, status: "draft" }
];

const lastSent = messages.findLast(function (message) {
    return message.status === "sent";
});

console.log(lastSent.id);
~~~

### Expected output

~~~text
103
~~~

### Explanation

**findLast** searches from the final index toward index 0 and returns the last matching item in normal array order. It is available in modern JavaScript runtimes.

## 9. Get the index of the last predicate match

### Question

Find the final score that is at least 80 and print its index.

### Code

~~~js
const scores = [82, 66, 91, 75, 88];

const lastHighScoreIndex = scores.findLastIndex(function (score) {
    return score >= 80;
});

console.log(lastHighScoreIndex);
console.log(scores[lastHighScoreIndex]);
~~~

### Expected output

~~~text
4
88
~~~

### Explanation

**findLastIndex** returns the final matching position while searching backward. If there is no match, it returns **-1**, which should be checked before accessing the array.

## 10. Test whether some values pass

### Question

Does any task have high priority?

### Code

~~~js
const tasks = [
    { name: "Reply to email", priority: "low" },
    { name: "Fix checkout", priority: "high" },
    { name: "Update notes", priority: "normal" }
];

const hasHighPriorityTask = tasks.some(function (task) {
    return task.priority === "high";
});

console.log(hasHighPriorityTask);
~~~

### Expected output

~~~text
true
~~~

### Explanation

**some** returns **true** when at least one callback result is truthy. It stops as soon as it finds a match.

## 11. Test whether every value passes

### Question

Are all of the submitted quantities positive integers?

### Code

~~~js
const quantities = [2, 5, 1];

const allValid = quantities.every(function (quantity) {
    return Number.isInteger(quantity) && quantity > 0;
});

console.log(allValid);
~~~

### Expected output

~~~text
true
~~~

### Explanation

**every** returns **true** only when each existing array value passes the condition. It stops at the first value that fails.

## 12. Understand short-circuiting

### Question

How many values are checked before **some** and **every** can answer?

### Code

~~~js
const values = [2, 4, 7, 8, 10];

let someChecks = 0;

const hasOddValue = values.some(function (value) {
    someChecks += 1;
    return value % 2 === 1;
});

let everyChecks = 0;

const allEven = values.every(function (value) {
    everyChecks += 1;
    return value % 2 === 0;
});

console.log(hasOddValue, someChecks);
console.log(allEven, everyChecks);
~~~

### Expected output

~~~text
true 3
false 3
~~~

### Explanation

**some** stops at 7, the first odd value. **every** stops at 7, the first value that is not even. Neither callback needs to run for the remaining values.

Do not use **some** or **every** when a side effect must happen for each array item.

## 13. Check empty arrays

### Question

What do **some** and **every** return when there are no values to inspect?

### Code

~~~js
const noValues = [];

console.log(noValues.some(function () {
    return true;
}));

console.log(noValues.every(function () {
    return false;
}));
~~~

### Expected output

~~~text
false
true
~~~

### Explanation

**some** is false because it found no passing item. **every** is true because it found no failing item. This behavior also applies to empty results from earlier operations.

## 14. Search by an object property

### Question

Find a user by their **id**, even though a new object with the same properties would not match by identity.

### Code

~~~js
const users = [
    { id: 12, name: "Asha" },
    { id: 19, name: "Mina" }
];

const userIndex = users.findIndex(function (user) {
    return user.id === 19;
});

console.log(users[userIndex].name);
console.log(users.includes({ id: 19, name: "Mina" }));
~~~

### Expected output

~~~text
Mina
false
~~~

### Explanation

**findIndex** can compare a chosen property in its predicate. **includes** compares object references, so a separately created object does not match the object already in the array.

## 15. Compare exact value and condition searches

### Question

Find whether a list contains **8**, find its position, and find the first number greater than 6.

### Code

~~~js
const values = [3, 8, 11, 8];

console.log(values.includes(8));
console.log(values.indexOf(8));

const firstAboveSix = values.find(function (value) {
    return value > 6;
});

console.log(firstAboveSix);
~~~

### Expected output

~~~text
true
1
8
~~~

### Explanation

Use **includes** for a boolean exact-value check, **indexOf** for an exact-value position, and **find** for a value selected by a condition.

## 16. Observe a hole in a sparse array

### Question

Compare how exact-value and predicate methods treat an empty array position.

### Code

~~~js
const sparse = ["first", , "third"];

console.log(sparse.includes(undefined));
console.log(sparse.indexOf(undefined));

const holeIndex = sparse.findIndex(function (value, index) {
    return index === 1 && value === undefined;
});

const someUndefined = sparse.some(function (value) {
    return value === undefined;
});

console.log(holeIndex);
console.log(someUndefined);
~~~

### Expected output

~~~text
true
-1
1
false
~~~

### Explanation

**includes** treats the hole as an **undefined** value. **indexOf** skips holes. **findIndex** calls its predicate at index 1 with **undefined**, while **some** skips that missing index.

## 17. Distinguish undefined from no find result

### Question

Does **find** return an actual **undefined** value or no result?

### Code

~~~js
const values = [undefined, "ready"];

const foundValue = values.find(function (value) {
    return value === undefined;
});

const foundIndex = values.findIndex(function (value) {
    return value === undefined;
});

console.log(foundValue);
console.log(foundIndex);
~~~

### Expected output

~~~text
undefined
0
~~~

### Explanation

The **find** result alone is ambiguous because **undefined** can be an array value and also the no-match result. **findIndex** makes the distinction: index 0 means a match was found.

## 18. Validate a set of form values

### Question

Check whether every required field has a non-empty value and whether at least one value is missing.

### Code

~~~js
const fields = [
    { name: "email", value: "asha@example.test" },
    { name: "phone", value: "" },
    { name: "city", value: "Pune" }
];

const allFieldsFilled = fields.every(function (field) {
    return field.value.trim() !== "";
});

const hasMissingField = fields.some(function (field) {
    return field.value.trim() === "";
});

console.log(allFieldsFilled);
console.log(hasMissingField);
~~~

### Expected output

~~~text
false
true
~~~

### Explanation

**every** is useful for an all-fields-valid check. **some** is useful for checking whether at least one field needs attention.

## 19. Safely use a searched index

### Question

Find the selected item by its code without reading from the array when no item matches.

### Code

~~~js
const items = [
    { code: "A-12", label: "Notebook" },
    { code: "B-07", label: "Folder" }
];

const selectedIndex = items.findIndex(function (item) {
    return item.code === "B-07";
});

if (selectedIndex !== -1) {
    console.log(items[selectedIndex].label);
} else {
    console.log("Item not found");
}
~~~

### Expected output

~~~text
Folder
~~~

### Explanation

A search index should be checked against **-1** before it is used. This handles both the successful and unsuccessful paths.

## 20. Return all matching values

### Question

Why does **find** not return both values above 10, and what method should be used instead?

### Code

~~~js
const values = [4, 12, 18, 7];

const allAboveTen = values.filter(function (value) {
    return value > 10;
});

console.log(allAboveTen);
~~~

### Expected output

~~~text
[ 12, 18 ]
~~~

### Explanation

**find** returns only the first matching item. **filter** creates an array containing all items that pass the condition.

## 21. Practice: any overdue task

### Question

Set **hasOverdueTask** to a boolean that indicates whether at least one task is overdue.

### Code

~~~js
const tasks = [
    { title: "Write outline", overdue: false },
    { title: "Review draft", overdue: true },
    { title: "Publish notes", overdue: false }
];

const hasOverdueTask = tasks.some(function (task) {
    return task.overdue;
});

console.log(hasOverdueTask);
~~~

### Expected output

~~~text
true
~~~

### Explanation

The predicate returns the task's boolean property. **some** stops as soon as it finds an overdue task.

## 22. Practice: all values within a range

### Question

Check that every score is from 0 through 100, including both boundaries.

### Code

~~~js
const scores = [0, 74, 100];

const allInRange = scores.every(function (score) {
    return score >= 0 && score <= 100;
});

console.log(allInRange);
~~~

### Expected output

~~~text
true
~~~

### Explanation

The inclusive comparisons allow both 0 and 100. If any score falls outside the range, **every** returns false.

## 23. Practice: locate a duplicate value

### Question

Find the first and last positions of **7**.

### Code

~~~js
const values = [7, 3, 9, 7, 2];

console.log(values.indexOf(7));
console.log(values.lastIndexOf(7));
~~~

### Expected output

~~~text
0
3
~~~

### Explanation

**indexOf** starts at the beginning by default. **lastIndexOf** starts at the end by default.

## Practice prompts

1. Search a list of email addresses for a specific address with **includes**.
2. Find a product by its identifier using **find** and a predicate.
3. Use **findIndex** and display a useful message when there is no match.
4. Compare **includes** and **indexOf** with an array containing **NaN**.
5. Use **findLast** to get the most recent record that meets a condition.
6. Use **some** to check whether any task is blocked.
7. Use **every** to check whether all prices are positive.
8. Track how many predicate calls happen before **some** finds a match.
9. Compare **includes**, **indexOf**, **findIndex**, and **some** on a sparse array.
10. Explain why two objects with the same properties do not match with **includes**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [47 - Transforming arrays: map, filter, reduce, and flat](047-transforming-arrays-map-filter-reduce-and-flat.md) | [Open lesson](../lessons/048-searching-and-testing-arrays.md) | [Open Q&A](../qnas/048-searching-and-testing-arrays.md) | [49 - Mutation, copying, and immutable array updates](../lessons/049-mutation-copying-and-immutable-array-updates.md) |
