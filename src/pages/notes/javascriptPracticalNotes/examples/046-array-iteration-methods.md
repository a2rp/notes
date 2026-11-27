# 46 - Array iteration methods - Examples

These examples demonstrate indexed loops, **for...of**, **forEach**, sparse-array behavior, and asynchronous iteration. Each includes a question, complete code, expected output or behavior, and explanation.

## 1. Iterate by index

### Question

How can a loop print each array index and its value?

### Code

~~~js
const tasks = ["Read", "Practice", "Review"];

for (let index = 0; index < tasks.length; index += 1) {
    console.log(index + ": " + tasks[index]);
}
~~~

### Expected output

~~~text
0: Read
1: Practice
2: Review
~~~

### Explanation

An indexed loop exposes the index directly. It is useful when code needs to read or update positions.

## 2. Iterate over values with for...of

### Question

How can a loop visit array values without managing an index?

### Code

~~~js
const colors = ["teal", "amber", "violet"];

for (const color of colors) {
    console.log(color);
}
~~~

### Expected output

~~~text
teal
amber
violet
~~~

### Explanation

**for...of** gives each value in turn. It is usually a clear choice when the index is not needed.

## 3. Use break and continue with for...of

### Question

How can a loop skip values and stop early?

### Code

~~~js
const scores = [42, 67, 85, 91, 95];

for (const score of scores) {
    if (score < 70) {
        continue;
    }

    console.log(score);

    if (score >= 91) {
        break;
    }
}
~~~

### Expected output

~~~text
85
91
~~~

### Explanation

**continue** skips to the next iteration. **break** ends the loop as soon as the score reaches the stopping condition.

## 4. Read both indexes and values with entries

### Question

How can a **for...of** loop process an index and its matching value?

### Code

~~~js
const languages = ["JavaScript", "Python", "Ruby"];

for (const [index, language] of languages.entries()) {
    console.log(index + ": " + language);
}
~~~

### Expected output

~~~text
0: JavaScript
1: Python
2: Ruby
~~~

### Explanation

**entries** yields index-value pairs. Array destructuring assigns the two parts to **index** and **language**.

## 5. Iterate indexes or values with keys and values

### Question

What does each iterator method provide?

### Code

~~~js
const letters = ["a", "b"];

console.log([...letters.keys()]);
console.log([...letters.values()]);
console.log([...letters.entries()]);
~~~

### Expected output

~~~text
[ 0, 1 ]
[ 'a', 'b' ]
[ [ 0, 'a' ], [ 1, 'b' ] ]
~~~

### Explanation

**keys** yields indexes, **values** yields values, and **entries** yields pairs. Spread collects the iterator values into arrays for display.

## 6. Read the forEach callback arguments

### Question

How can a callback use its value, index, and original array?

### Code

~~~js
const colors = ["teal", "amber"];

colors.forEach(function (color, index, originalArray) {
    console.log(index + ": " + color + " of " + originalArray.length);
});
~~~

### Expected output

~~~text
0: teal of 2
1: amber of 2
~~~

### Explanation

The callback receives the current value first, the index second, and the original array third. It can declare only the arguments it needs.

## 7. See that forEach returns undefined

### Question

Does a value returned from a **forEach** callback become the method's result?

### Code

~~~js
const result = [2, 4, 6].forEach(function (number) {
    return number * 2;
});

console.log(result);
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

**forEach** ignores callback return values and returns **undefined**. Use **map** when callback results should form a new array.

## 8. Return does not stop forEach

### Question

Does returning from a callback end the whole **forEach** iteration?

### Code

~~~js
[1, 2, 3, 4].forEach(function (number) {
    if (number === 3) {
        return;
    }

    console.log(number);
});
~~~

### Expected output

~~~text
1
2
4
~~~

### Explanation

The return exits only the callback invocation for value three. The **forEach** method continues with the next present element.

## 9. Compare hole handling in forEach and for...of

### Question

What values are visited when an array has a hole?

### Code

~~~js
const values = [];
values.length = 3;
values[1] = "middle";

console.log("forEach:");
values.forEach(function (value, index) {
    console.log(index + ": " + value);
});

console.log("for...of:");
for (const value of values) {
    console.log(value);
}
~~~

### Expected output

~~~text
forEach:
1: middle
for...of:
undefined
middle
undefined
~~~

### Explanation

**forEach** skips missing properties. The array iterator used by **for...of** yields **undefined** for each hole position.

## 10. Visit every index with an indexed loop

### Question

How can an indexed loop distinguish a hole from an explicit element?

### Code

~~~js
const values = [];
values.length = 3;
values[1] = undefined;

for (let index = 0; index < values.length; index += 1) {
    console.log(index + " present: " + (index in values));
}
~~~

### Expected output

~~~text
0 present: false
1 present: true
2 present: false
~~~

### Explanation

The indexed loop checks every position in its numeric range. The **in** operator identifies which positions actually contain properties.

## 11. See why for...in is different

### Question

What does **for...in** include when an array has a custom enumerable property?

### Code

~~~js
const colors = ["teal", "amber"];
colors.note = "palette";

for (const key in colors) {
    console.log(key);
}
~~~

### Expected output

~~~text
0
1
note
~~~

### Explanation

**for...in** iterates enumerable property keys, including the custom **note** property. Use **for...of** to process values.

## 12. Supply a thisArg to forEach

### Question

How can a regular callback use an object as **this**?

### Code

~~~js
const printer = {
    prefix: "Task",
    print(value, index) {
        console.log(this.prefix + " " + index + ": " + value);
    }
};

["Read", "Practice"].forEach(printer.print, printer);
~~~

### Expected output

~~~text
Task 0: Read
Task 1: Practice
~~~

### Explanation

The second argument to **forEach** supplies **printer** as the regular callback's **this** receiver.

## 13. Use a wrapper to call a method

### Question

How can an arrow callback call a method through its object?

### Code

~~~js
const printer = {
    prefix: "Task",
    print(value) {
        return this.prefix + ": " + value;
    }
};

const tasks = ["Read", "Practice"];

tasks.forEach((task, index) => {
    console.log(printer.print(index + 1 + ". " + task));
});
~~~

### Expected output

~~~text
Task: 1. Read
Task: 2. Practice
~~~

### Explanation

The arrow callback does not need its own **this**. It calls **printer.print** as a method, so **printer** is the method's receiver.

## 14. Show why async forEach does not wait

### Question

Does **forEach** wait for asynchronous callback work to finish?

### Code

~~~js
function saveItem(item) {
    return Promise.resolve(item);
}

async function demonstrate() {
    const completed = [];

    [1, 2].forEach(async function (item) {
        await saveItem(item);
        completed.push(item);
    });

    console.log("After forEach:", completed.length);

    await Promise.resolve();
    console.log("After callbacks:", completed.length);
}

demonstrate();
~~~

### Expected output

~~~text
After forEach: 0
After callbacks: 2
~~~

### Explanation

Each async callback returns a promise, but **forEach** ignores it and returns immediately. The callbacks resume after their awaits. The extra await lets their continuations finish before the second log.

## 15. Await each operation in sequence

### Question

How can asynchronous operations be processed one at a time in array order?

### Code

~~~js
function saveItem(item) {
    return Promise.resolve("saved " + item);
}

async function saveInOrder(items) {
    for (const item of items) {
        const result = await saveItem(item);
        console.log(result);
    }
}

saveInOrder(["A", "B", "C"]);
~~~

### Expected output

~~~text
saved A
saved B
saved C
~~~

### Explanation

The loop waits for each promise before continuing to the next item. This is useful when each operation should complete before the next begins.

## 16. Await independent operations together

### Question

How can independent async operations be started and awaited as a group?

### Code

~~~js
function saveItem(item) {
    return Promise.resolve("saved " + item);
}

async function saveTogether(items) {
    const results = await Promise.all(
        items.map(item => saveItem(item))
    );

    console.log(results);
}

saveTogether(["A", "B", "C"]);
~~~

### Expected output

~~~text
[ 'saved A', 'saved B', 'saved C' ]
~~~

### Explanation

The **map** callback creates a promise for each item, and **Promise.all** waits for all of them. The results array follows the input order. This is appropriate when the operations do not depend on each other.

## Practice prompts

1. Print values with an indexed loop and with **for...of**.
2. Use **entries** to print positions and values.
3. Create an array with a hole and compare **forEach**, **for...of**, and an indexed loop.
4. Add a custom property and compare **for...in** with **for...of**.
5. Use **forEach** with a regular callback and a **thisArg**.
6. Write an async sequential loop with **for...of** and **await**.
7. Write independent async tasks using **Promise.all**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [45 - Arrays: create, read, and update](045-arrays-create-read-and-update.md) | [Open lesson](../lessons/046-array-iteration-methods.md) | [Open Q&A](../qnas/046-array-iteration-methods.md) | [47 - Transforming arrays: map, filter, reduce, and flat](../lessons/047-transforming-arrays-map-filter-reduce-and-flat.md) |