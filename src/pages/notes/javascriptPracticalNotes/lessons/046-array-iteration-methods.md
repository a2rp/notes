# 46 - Array iteration methods

**Iteration** means processing values one at a time. JavaScript arrays can be processed with indexed **for** loops, **for...of**, and **forEach**. Each option has different behavior for indexes, early exits, holes, and asynchronous work.

Use the loop or method whose behavior makes the code clear. The next chapter focuses on array methods that create transformed results, such as **map**, **filter**, and **reduce**.

## Iterate with an indexed for loop

An indexed **for** loop gives direct control over the index:

~~~js
const tasks = ["Read", "Practice", "Review"];

for (let index = 0; index < tasks.length; index += 1) {
    console.log(index + ": " + tasks[index]);
}
~~~

Output:

~~~text
0: Read
1: Practice
2: Review
~~~

Use an indexed loop when the index matters, when you need to update a position, or when you need precise control over how the loop advances.

The loop condition checks **tasks.length** before each iteration. If the array changes during the loop, the number of iterations can change too. Avoid changing the array while traversing it unless the behavior is deliberate.

## Iterate over values with for...of

A **for...of** loop reads values from an iterable, such as an array:

~~~js
const colors = ["teal", "amber", "violet"];

for (const color of colors) {
    console.log(color);
}
~~~

Output:

~~~text
teal
amber
violet
~~~

Use **for...of** when you need each value and do not need to manage an index manually. It also supports **break** and **continue**:

~~~js
const scores = [42, 67, 85, 91];

for (const score of scores) {
    if (score < 70) {
        continue;
    }

    console.log(score);

    if (score >= 90) {
        break;
    }
}
~~~

Output:

~~~text
85
91
~~~

**continue** skips the rest of the current iteration. **break** exits the loop.

## Get both indexes and values with entries

The **entries** method produces an iterable of index and value pairs. Destructuring can name both values:

~~~js
const languages = ["JavaScript", "Python"];

for (const [index, language] of languages.entries()) {
    console.log(index + ": " + language);
}
~~~

Output:

~~~text
0: JavaScript
1: Python
~~~

Use **entries** when a **for...of** loop is convenient but both the index and value are needed.

The **keys** method iterates over indexes, and **values** iterates over values:

~~~js
const letters = ["a", "b"];

console.log([...letters.keys()]);
console.log([...letters.values()]);
~~~

Output:

~~~text
[ 0, 1 ]
[ 'a', 'b' ]
~~~

The spread syntax in this example converts the iterator results into arrays for display.

## Use forEach for an action on every present element

**forEach** calls a callback for each present array element:

~~~js
const tasks = ["Read", "Practice", "Review"];

tasks.forEach(function (task, index) {
    console.log(index + ": " + task);
});
~~~

Output:

~~~text
0: Read
1: Practice
2: Review
~~~

The callback arguments are the current value, its index, and the original array, in that order. A callback can declare only the arguments it needs.

**forEach** is useful when the goal is to perform an action for each item, such as logging or updating another object. It returns **undefined** and ignores values returned by its callback:

~~~js
const result = [2, 4, 6].forEach(function (number) {
    return number * 2;
});

console.log(result);
~~~

Output:

~~~text
undefined
~~~

Use **map** when callback results should become a new array. That transformation method is covered in the next chapter.

## forEach cannot be stopped with break

A **forEach** callback's **return** exits only that callback invocation. It does not stop the overall iteration:

~~~js
[1, 2, 3, 4].forEach(function (number) {
    if (number === 3) {
        return;
    }

    console.log(number);
});
~~~

Output:

~~~text
1
2
4
~~~

To stop early, use a **for** or **for...of** loop with **break**, or choose a method designed to stop after a condition is met.

## forEach skips holes

An array hole is a missing indexed property. **forEach** skips missing indexes:

~~~js
const values = [];
values.length = 3;
values[1] = "middle";

values.forEach(function (value, index) {
    console.log(index + ": " + value);
});
~~~

Output:

~~~text
1: middle
~~~

The callback runs only for index one because that is the only present element.

A **for...of** loop reads each position in the array iterator, so a hole is yielded as **undefined**:

~~~js
const values = [];
values.length = 3;
values[1] = "middle";

for (const value of values) {
    console.log(value);
}
~~~

Output:

~~~text
undefined
middle
undefined
~~~

An indexed loop also visits every index in its numeric range. Use **index in array** when you need to distinguish a hole from an explicit **undefined** element.

## Avoid for...in for array values

A **for...in** loop iterates over enumerable property keys. It is meant for inspecting object properties, not for processing array values:

~~~js
const colors = ["teal", "amber"];
colors.note = "palette";

for (const key in colors) {
    console.log(key);
}
~~~

Output:

~~~text
0
1
note
~~~

The loop gives string keys and includes the extra enumerable property. It does not directly provide values, and inherited enumerable properties may also be visited. Use **for...of** for values or an indexed loop when indexes are needed.

## Use a callback thisArg when appropriate

Some array methods accept a **thisArg** for regular callbacks. **forEach** can use it as the callback's **this**:

~~~js
const printer = {
    prefix: "Task",
    print(value, index) {
        console.log(this.prefix + " " + index + ": " + value);
    }
};

["Read", "Practice"].forEach(printer.print, printer);
~~~

Output:

~~~text
Task 0: Read
Task 1: Practice
~~~

The second argument supplies the receiver for this regular callback. Arrow callbacks use lexical **this** and ignore a **thisArg**.

A wrapper callback is another clear option:

~~~js
["Read", "Practice"].forEach((task, index) => {
    printer.print(task, index);
});
~~~

Output:

~~~text
Task 0: Read
Task 1: Practice
~~~

The wrapper calls the method through **printer**, so the method receives the right object.

## Do not expect forEach to await asynchronous callbacks

**forEach** does not wait for promises returned by an async callback. An **async** callback returns a promise, but **forEach** ignores that return value.

For sequential asynchronous work, use **for...of** and **await**:

~~~js
async function saveInOrder(items) {
    for (const item of items) {
        await saveItem(item);
    }
}
~~~

For independent asynchronous operations, collect promises and wait for them with **Promise.all**:

~~~js
async function saveTogether(items) {
    await Promise.all(items.map(item => saveItem(item)));
}
~~~

The function **saveItem** represents an asynchronous operation supplied by the application. Choose sequential or concurrent execution based on whether each operation depends on the previous one.

## Choose an iteration form

| Need | Useful choice |
| --- | --- |
| Read or update values by index | Indexed **for** |
| Process values and use **break** or **continue** | **for...of** |
| Process both indexes and values | **for...of** with **entries** |
| Perform an action for every present element | **forEach** |
| Iterate over object property keys | **for...in**, with care |
| Wait for asynchronous work one item at a time | **for...of** with **await** |

## Common iteration mistakes

- **Using for...in for array values:** It yields enumerable keys and may include extra properties.
- **Expecting forEach to return a new array:** It returns **undefined**. Use **map** for transformation.
- **Expecting return inside forEach to break the loop:** It exits only the current callback invocation.
- **Expecting forEach to await async callbacks:** It ignores their returned promises.
- **Assuming every loop treats holes the same:** **forEach** skips holes, while **for...of** yields **undefined** for them.
- **Mutating array positions while traversing:** Later indexes can move or change, making behavior hard to follow.
- **Using an index when only values are needed:** Prefer **for...of** for clearer value iteration.
- **Using forEach when early exit is required:** Use a loop that supports **break**.

## Try it yourself

1. Print each value and index with an indexed **for** loop.
2. Print only the values with **for...of**.
3. Use **entries** to print index and value together.
4. Use **forEach** to update a separate total and observe its return value.
5. Add a **return** in a **forEach** callback and confirm it does not stop iteration.
6. Create an array with a hole and compare **forEach** with **for...of**.
7. Add a custom property to an array and inspect it with **for...in**.
8. Write an async loop that awaits each operation in sequence.

## Key points

- Indexed **for** loops provide direct control over indexes.
- **for...of** iterates values and supports **break** and **continue**.
- **entries** provides index and value pairs.
- **forEach** calls a callback for each present element and returns **undefined**.
- **forEach** cannot be stopped with **break** and does not await callback promises.
- **forEach** skips holes, while **for...of** yields **undefined** for a hole.
- **for...in** iterates enumerable keys and is usually not the right way to process array values.
- Use **for...of** with **await** for sequential asynchronous iteration.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [45 - Arrays: create, read, and update](045-arrays-create-read-and-update.md) | [Open Q&A](../qnas/046-array-iteration-methods.md) | [Open example](../examples/046-array-iteration-methods.md) | [47 - Transforming arrays: map, filter, reduce, and flat](047-transforming-arrays-map-filter-reduce-and-flat.md) |