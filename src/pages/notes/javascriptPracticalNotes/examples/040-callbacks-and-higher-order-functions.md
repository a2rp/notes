# 40 - Callbacks and higher-order functions - Examples

These examples show how to pass callbacks, understand when they run, use array methods, and return functions from higher-order functions. Each example includes a question, complete code, expected output, and explanation.

## 1. Pass a function instead of calling it first

### Question

How can one function receive another function and decide when to call it?

### Code

~~~js
function makeGreeting(name) {
    return "Hello, " + name;
}

function printGreeting(createGreeting, name) {
    const message = createGreeting(name);
    console.log(message);
}

printGreeting(makeGreeting, "Asha");
~~~

### Expected output

~~~text
Hello, Asha
~~~

### Explanation

**makeGreeting** is passed as a function value. **printGreeting** receives that value as **createGreeting** and invokes it with the name. Writing **makeGreeting("Asha")** in the call would invoke it before **printGreeting** receives the argument.

## 2. Invoke a callback a chosen number of times

### Question

How can a reusable function control the number of times an action runs?

### Code

~~~js
function repeatAction(count, action) {
    for (let index = 0; index < count; index += 1) {
        action(index);
    }
}

repeatAction(3, function (index) {
    console.log("Action " + (index + 1) + ", index " + index);
});
~~~

### Expected output

~~~text
Action 1, index 0
Action 2, index 1
Action 3, index 2
~~~

### Explanation

The caller provides the action. **repeatAction** controls when and how often it is called, and passes the current index to it.

## 3. Use a named callback

### Question

How can a callback be given a reusable name?

### Code

~~~js
function showTask(task) {
    console.log("Task: " + task);
}

function runTasks(tasks, callback) {
    tasks.forEach(callback);
}

runTasks(["Read", "Practice"], showTask);
~~~

### Expected output

~~~text
Task: Read
Task: Practice
~~~

### Explanation

**showTask** can be passed anywhere a compatible callback is expected. A named callback is useful when behavior is reused or deserves a descriptive name.

## 4. Read callback arguments from an array method

### Question

How do you access an item's value and index in an array callback?

### Code

~~~js
const colors = ["teal", "amber", "violet"];

colors.forEach(function (color, index) {
    console.log(index + ": " + color);
});
~~~

### Expected output

~~~text
0: teal
1: amber
2: violet
~~~

### Explanation

Array iteration callbacks receive the current value first and the index second. The original array is available as a third argument if needed.

## 5. Follow synchronous callback order

### Question

In what order does a synchronous callback run relative to the surrounding function?

### Code

~~~js
function runNow(callback) {
    console.log("Before");
    callback();
    console.log("After callback");
}

console.log("Start");

runNow(function () {
    console.log("Inside callback");
});

console.log("Finish");
~~~

### Expected output

~~~text
Start
Before
Inside callback
After callback
Finish
~~~

### Explanation

**runNow** calls the callback directly. It runs immediately as part of the current sequence, before **runNow** continues.

## 6. Compare synchronous code with a timer callback

### Question

Does a zero-delay timer callback run before the next synchronous statement?

### Code

~~~js
console.log("Start");

setTimeout(function () {
    console.log("Timer callback");
}, 0);

console.log("End");
~~~

### Expected output

~~~text
Start
End
Timer callback
~~~

### Explanation

The timer schedules its callback to run later. It does not interrupt the current task. Zero milliseconds is a minimum delay, not an instruction to run immediately.

## 7. Transform every item with map

### Question

How can each number be doubled into a new array?

### Code

~~~js
const prices = [12, 18, 25];

const doubledPrices = prices.map(function (price) {
    return price * 2;
});

console.log(doubledPrices);
console.log(prices);
~~~

### Expected output

~~~text
[ 24, 36, 50 ]
[ 12, 18, 25 ]
~~~

### Explanation

**map** stores each callback return value in a new array. The original array remains unchanged by this transformation.

## 8. Keep matching items with filter

### Question

How can an array be filtered to keep only passing scores?

### Code

~~~js
const scores = [48, 72, 91, 64, 85];

const passingScores = scores.filter(function (score) {
    return score >= 70;
});

console.log(passingScores);
~~~

### Expected output

~~~text
[ 72, 91, 85 ]
~~~

### Explanation

The callback's result is used as a condition. **filter** retains each score whose comparison is truthy.

## 9. Find the first matching object

### Question

How can you get the first available product from an array?

### Code

~~~js
const products = [
    { name: "Notebook", available: false },
    { name: "Pen", available: true },
    { name: "Folder", available: true }
];

const firstAvailable = products.find(function (product) {
    return product.available;
});

console.log(firstAvailable.name);
~~~

### Expected output

~~~text
Pen
~~~

### Explanation

**find** returns the first item whose callback result is truthy. It stops searching after that item. If no product is available, the result is **undefined**.

## 10. Check conditions with some and every

### Question

How can you check whether any task is unfinished and whether all task names are non-empty?

### Code

~~~js
const tasks = [
    { name: "Read", complete: true },
    { name: "Practice", complete: false }
];

const hasUnfinishedTask = tasks.some(function (task) {
    return task.complete === false;
});

const allTasksHaveNames = tasks.every(function (task) {
    return task.name.length > 0;
});

console.log(hasUnfinishedTask);
console.log(allTasksHaveNames);
~~~

### Expected output

~~~text
true
true
~~~

### Explanation

**some** answers true when at least one item passes its test. **every** answers true only when each item passes its test. Both return booleans, not arrays.

## 11. Combine values with reduce

### Question

How can an array of prices be added into one total?

### Code

~~~js
const prices = [12, 8, 5];

const total = prices.reduce(function (sum, price) {
    return sum + price;
}, 0);

console.log(total);
~~~

### Expected output

~~~text
25
~~~

### Explanation

The accumulator starts at **0**. Each callback returns an updated sum. Supplying an initial value also makes an empty prices array produce **0** instead of throwing an error.

## 12. Sort numbers with a comparator callback

### Question

How can numbers be sorted in ascending numeric order?

### Code

~~~js
const numbers = [14, 3, 25, 8];

numbers.sort(function (left, right) {
    return left - right;
});

console.log(numbers);
~~~

### Expected output

~~~text
[ 3, 8, 14, 25 ]
~~~

### Explanation

A negative comparator result places **left** before **right**, and a positive result places it after. Without a comparator, **sort** uses string ordering, which is not correct for many numeric arrays.

## 13. Return a function from a higher-order function

### Question

How can a function create another function configured with a chosen multiplier?

### Code

~~~js
function makeMultiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

const triple = makeMultiplier(3);
const timesTen = makeMultiplier(10);

console.log(triple(4));
console.log(timesTen(4));
~~~

### Expected output

~~~text
12
40
~~~

### Explanation

**makeMultiplier** returns a function. Each returned function can use the **factor** chosen when it was created. This retained access to surrounding variables is an example of a closure.

## 14. See why forEach does not return callback values

### Question

What happens if a value is returned from a **forEach** callback?

### Code

~~~js
const result = [2, 4, 6].forEach(function (number) {
    return number * 10;
});

console.log(result);
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

**forEach** ignores values returned by its callback and returns **undefined** itself. Use **map** if the callback should produce a result for each item.

## 15. Handle a callback contract with an error-first pattern

### Question

How can a caller check an error-first callback before using its result?

### Code

~~~js
function readRecord(callback) {
    const record = { id: 7, name: "Asha" };
    callback(null, record);
}

readRecord(function (error, record) {
    if (error) {
        console.log("Could not read record");
        return;
    }

    console.log(record.id + ": " + record.name);
});
~~~

### Expected output

~~~text
7: Asha
~~~

### Explanation

In an error-first convention, the first callback argument is an error or **null**. The caller checks it before using the result. This example demonstrates the convention with a synchronous function; an API may instead invoke the callback later.

## 16. Notice the difference between a callback return and the caller's return

### Question

Why does this function return **undefined** even though its callback returns **42**?

### Code

~~~js
function callCallback(callback) {
    callback();
}

const result = callCallback(function () {
    return 42;
});

console.log(result);
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

The callback returns **42**, but **callCallback** does not return the result of **callback()**. To forward the value, the caller must explicitly return it.

~~~js
function callCallbackAndReturn(callback) {
    return callback();
}

console.log(callCallbackAndReturn(function () {
    return 42;
}));
~~~

Output:

~~~text
42
~~~

## Practice prompts

1. Write a function that accepts an array and a callback, then invokes the callback for each item.
2. Use **map** to convert minutes into seconds.
3. Use **filter** to select words longer than five characters.
4. Use **find** to locate the first user with an **admin** role.
5. Use **reduce** with an initial value to count the total characters in an array of words.
6. Use a comparator callback to sort objects by a numeric **priority** property.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [39 - Arrow functions](039-arrow-functions.md) | [Open lesson](../lessons/040-callbacks-and-higher-order-functions.md) | [Open Q&A](../qnas/040-callbacks-and-higher-order-functions.md) | [41 - Lexical scope and closures](041-lexical-scope-and-closures.md) |