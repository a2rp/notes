# 40 - Callbacks and higher-order functions

A **callback** is a function passed to another function so that the receiving function can call it. A **higher-order function** is a function that accepts another function, returns a function, or does both.

These ideas let code describe an operation once and supply the part that changes as a function. They appear in array methods such as **map**, **filter**, and **sort**, and in APIs that run code later.

A callback is not automatically asynchronous. A function can call its callback immediately, or an API can call it later. The surrounding code determines when the callback runs.

## Passing a function

A function can be stored in a variable and passed as a value:

~~~js
function greet(name) {
    return "Hello, " + name;
}

function printMessage(makeMessage, name) {
    console.log(makeMessage(name));
}

printMessage(greet, "Asha");
~~~

Output:

~~~text
Hello, Asha
~~~

The argument **greet** is a function value. **printMessage** receives it as **makeMessage** and calls it with the name.

Pass the function itself when another function should decide when to call it:

~~~js
printMessage(greet, "Asha");
~~~

Calling it first is different:

~~~js
printMessage(greet("Asha"), "Asha");
~~~

Here, **greet("Asha")** runs before **printMessage** begins. Its returned string is passed instead of a function, so **printMessage** cannot call it as a callback.

## A function that accepts a callback

The receiving function chooses when and how often to invoke its callback. It can also pass useful values to that callback:

~~~js
function repeatAction(count, action) {
    for (let index = 0; index < count; index += 1) {
        action(index);
    }
}

repeatAction(3, function (index) {
    console.log("Run " + index);
});
~~~

Output:

~~~text
Run 0
Run 1
Run 2
~~~

The callback runs once for each loop iteration. The caller supplies the behavior, while **repeatAction** controls the repetition.

A named callback can make longer code easier to read:

~~~js
function showIndex(index) {
    console.log("Run " + index);
}

repeatAction(3, showIndex);
~~~

Use an anonymous function when the behavior is short and used in one place. Give it a name when the logic deserves a clear label or is reused.

## Callback parameters

The function that invokes a callback defines what its arguments mean. Read that function's documentation or implementation instead of guessing the order.

Array iteration methods provide a value, an index, and the original array to their callback:

~~~js
const colors = ["teal", "amber"];

colors.forEach(function (color, index, array) {
    console.log(index + ": " + color + " (" + array.length + " items)");
});
~~~

Output:

~~~text
0: teal (2 items)
1: amber (2 items)
~~~

A callback may use only the parameters it needs. The callback parameter names are local names chosen by the programmer. Their position determines which supplied value each one receives.

## Synchronous callbacks

A synchronous callback runs before the function that invokes it returns:

~~~js
function runNow(callback) {
    console.log("Before callback");
    callback();
    console.log("After callback");
}

runNow(function () {
    console.log("Inside callback");
});

console.log("After runNow");
~~~

Output:

~~~text
Before callback
Inside callback
After callback
After runNow
~~~

The callback executes as a normal function call in the current sequence. **forEach**, **map**, **filter**, and **reduce** also invoke their callbacks synchronously.

## Asynchronous callbacks

An asynchronous API schedules work and invokes its callback later. For example, **setTimeout** schedules a callback to run after at least the requested delay:

~~~js
console.log("Start");

setTimeout(function () {
    console.log("Timer callback");
}, 0);

console.log("End");
~~~

Output:

~~~text
Start
End
Timer callback
~~~

The callback does not interrupt the current JavaScript task. Even with a zero delay, the current synchronous code finishes first. A delay is a minimum wait, not a guarantee that the callback runs at an exact time.

Do not decide whether a callback is synchronous or asynchronous from its name alone. Check how the API invokes or schedules it.

## Callbacks with array methods

Array methods are higher-order functions because they accept callbacks. Each method has a different contract.

### forEach: perform an action for each item

~~~js
const names = ["Mina", "Leo"];

names.forEach(function (name) {
    console.log("Hello, " + name);
});
~~~

**forEach** invokes the callback for each item and returns **undefined**. Use it when the purpose is an action, such as logging or updating an external value.

### map: create a transformed array

~~~js
const prices = [10, 20, 30];
const doubled = prices.map(function (price) {
    return price * 2;
});

console.log(doubled);
~~~

Output:

~~~text
[ 20, 40, 60 ]
~~~

**map** uses each callback return value to create a new array. It does not replace the original array.

### filter: keep matching items

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

**filter** keeps an item when its callback result is truthy and excludes it when the result is falsy.

### find: get the first matching item

~~~js
const users = [
    { name: "Asha", active: false },
    { name: "Dev", active: true },
    { name: "Mina", active: true }
];

const firstActive = users.find(function (user) {
    return user.active;
});

console.log(firstActive.name);
~~~

Output:

~~~text
Dev
~~~

**find** stops at the first match and returns that item. If no item matches, it returns **undefined**.

### some and every: answer a condition

~~~js
const temperatures = [18, 21, 25];

console.log(temperatures.some(function (value) {
    return value > 24;
}));

console.log(temperatures.every(function (value) {
    return value >= 18;
}));
~~~

Output:

~~~text
true
true
~~~

**some** returns true when at least one item matches. **every** returns true when all items match. Both can stop as soon as their answer is known.

### reduce: combine items into one result

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

The callback receives the accumulated value and the current item. The second argument, **0**, is the initial accumulated value. Supplying an initial value makes the starting behavior clear and also handles an empty array.

Use **reduce** when the task is genuinely to combine values. If the goal is to transform each item, **map** is usually clearer. If the goal is to select items, use **filter**.

## Returning a function

A higher-order function can create and return another function:

~~~js
function makeMultiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

const triple = makeMultiplier(3);
console.log(triple(4));
~~~

Output:

~~~text
12
~~~

The returned function can still use **factor**, the value from the call that created it. This works because a function retains access to its lexical environment. Closures are covered in the next chapter.

## Callbacks and return values

A callback's return value matters only when the receiving function uses it.

**map** reads each callback return value to build a new array:

~~~js
const labels = [1, 2].map(function (number) {
    return "Item " + number;
});

console.log(labels);
~~~

Output:

~~~text
[ 'Item 1', 'Item 2' ]
~~~

By contrast, **forEach** ignores callback return values:

~~~js
const result = [1, 2].forEach(function (number) {
    return number * 10;
});

console.log(result);
~~~

Output:

~~~text
undefined
~~~

Returning from a callback returns from that callback invocation. It does not automatically return from the outer function that called it.

## Comparators and callback contracts

Some APIs call a callback whose return value has a specific meaning. **sort** expects a comparator that returns a negative number, zero, or a positive number:

~~~js
const numbers = [12, 3, 25, 8];

numbers.sort(function (left, right) {
    return left - right;
});

console.log(numbers);
~~~

Output:

~~~text
[ 3, 8, 12, 25 ]
~~~

A negative result places **left** before **right**; a positive result places it after; zero indicates equal ordering for that comparison. Without a comparator, **sort** compares string representations, which can produce surprising numeric ordering.

The comparator should consistently describe the intended order. Avoid changing the array or unrelated state from inside a comparator.

## Common callback mistakes

- **Calling instead of passing:** **run(task)** passes the function; **run(task())** calls it first and passes its result.
- **Using the wrong callback parameter order:** Check the API contract. For **forEach**, **map**, and similar array methods, the first argument is the current value and the second is the index.
- **Expecting every callback to be asynchronous:** **map** and **forEach** run callbacks synchronously.
- **Expecting a callback return value to escape its caller:** The receiving function must explicitly use or return that value.
- **Using forEach to build a transformed array:** Use **map**, which returns the array of callback results.
- **Forgetting the initial value in reduce:** The first array item becomes the initial accumulator when none is supplied. An empty array then throws a **TypeError**.
- **Assuming a timer runs immediately:** Timer callbacks wait until the current task completes and the event loop can run them.
- **Using a callback API without checking its error behavior:** Some older Node.js APIs use an error-first callback, where the first argument is an error or **null**.

## Try it yourself

1. Write a function named **runTwice** that receives a callback and invokes it two times.
2. Use **map** to convert an array of names into uppercase names.
3. Use **filter** to keep only numbers divisible by three.
4. Use **find** to retrieve the first object whose **available** property is true.
5. Use **reduce** with an initial value to calculate the total of an array of prices.
6. Write a synchronous callback example and predict the output order.
7. Add a zero-delay timer to the example and compare its output order.
8. Sort a list of numbers in ascending order with a comparator.

## Key points

- A callback is a function passed to another function for it to invoke.
- A higher-order function accepts a function, returns a function, or both.
- Callbacks can run synchronously or asynchronously. The API determines when they run.
- Array methods such as **map**, **filter**, and **reduce** each define a callback contract.
- A callback return value is useful only when its caller reads or returns it.
- Pass a function when the receiver should call it. Calling it first passes its result instead.
- Clear callback contracts make code reusable and easier to reason about.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [39 - Arrow functions](039-arrow-functions.md) | [Open Q&A](../qnas/040-callbacks-and-higher-order-functions.md) | [Open example](../examples/040-callbacks-and-higher-order-functions.md) | [41 - Lexical scope and closures](041-lexical-scope-and-closures.md) |