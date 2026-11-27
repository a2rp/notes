# 32 - Loops and iteration statements

Loops repeat statements. They are useful for processing collections, repeating work until a condition changes, and counting through a sequence.

JavaScript provides **while**, **do...while**, and classic **for** loops for repeating based on a condition or counter. **for...of** reads values from an iterable, while **for...in** visits enumerable property names on an object.

This lesson explains when to use each form, how to avoid infinite loops and off-by-one errors, and how to choose the right iteration method.

## Choose a loop by the job

| Loop | Best suited for |
| --- | --- |
| **while** | Repeat while a condition remains true, when the number of iterations is not known in advance |
| **do...while** | Run a body at least once, then repeat while a condition is true |
| Classic **for** | Count through a numeric range or use an index |
| **for...of** | Read values from an iterable such as an array, string, Set, or Map |
| **for...in** | Inspect enumerable property names on an object |

Use the loop form that makes the stop condition and current value easy to see.

## The while loop

A **while** loop checks its condition before each iteration. If the condition is falsy at the start, the body does not run.

~~~js
let count = 1;

while (count <= 3) {
    console.log(count);
    count += 1;
}
~~~

Output:

~~~text
1
2
3
~~~

Each pass follows this order:

1. Evaluate the condition.
2. If it is truthy, run the body.
3. Update state that can eventually make the condition falsy.
4. Check the condition again.

This form is useful when the number of repetitions is not known up front.

~~~js
let remaining = 3;

while (remaining > 0) {
    console.log("Remaining:", remaining);
    remaining -= 1;
}
~~~

Output:

~~~text
Remaining: 3
Remaining: 2
Remaining: 1
~~~

Make sure something in the loop body changes the condition or the value it depends on. Otherwise the condition may stay true forever.

## The do...while loop

A **do...while** loop checks its condition after running the body. Its body always runs at least once.

~~~js
let attempts = 0;

do {
    attempts += 1;
    console.log("Attempt:", attempts);
} while (attempts < 3);
~~~

Output:

~~~text
Attempt: 1
Attempt: 2
Attempt: 3
~~~

The semicolon after the **while** condition is part of the do...while syntax.

A useful fit is an action that must happen once before deciding whether to repeat it, such as asking for input and then checking the response.

~~~js
let input = "";

do {
    input = "ready";
    console.log("Checked:", input);
} while (input !== "ready");
~~~

Output:

~~~text
Checked: ready
~~~

The condition is false after the first body run, so the loop ends. If the condition were already false before the first pass, the body would still run once.

## The classic for loop

A classic **for** loop puts initialization, the condition, and the update expression in one place.

~~~js
for (initialization; condition; afterthought) {
    // Loop body
}
~~~

The order is:

1. Run initialization once.
2. Check the condition.
3. If truthy, run the body.
4. Run the afterthought.
5. Return to the condition.

~~~js
for (let index = 0; index < 4; index += 1) {
    console.log(index);
}
~~~

Output:

~~~text
0
1
2
3
~~~

The index starts at zero. The body runs while **index < 4**. After each pass, the update expression increments it. When the index becomes 4, the condition is false and the loop ends.

### Count in a different direction or by a different step

~~~js
for (let number = 6; number >= 2; number -= 2) {
    console.log(number);
}
~~~

Output:

~~~text
6
4
2
~~~

The condition and update work together. Since the value decreases, the comparison uses **>=**.

### Use an index to read array elements

~~~js
const colors = ["red", "green", "blue"];

for (let index = 0; index < colors.length; index += 1) {
    console.log(index, colors[index]);
}
~~~

Output:

~~~text
0 red
1 green
2 blue
~~~

An index is useful when the position matters or when the loop must update an array by index. The comparison uses **index < colors.length**, so the final valid index is **length - 1**.

### Omit a for-loop section only when it helps

The three expressions in a classic for loop are optional, but the semicolons remain.

~~~js
let value = 0;

for (; value < 3;) {
    console.log(value);
    value += 1;
}
~~~

Output:

~~~text
0
1
2
~~~

This is valid, but it separates the update from the loop header. Use the usual form unless omitting a section makes the code clearer.

A loop with no condition is treated as always continuing unless it exits in some other way:

~~~js
for (;;) {
    // This repeats until control leaves the loop.
}
~~~

Avoid an unbounded loop unless its exit behavior is explicit and reliable.

## The for...of loop

A **for...of** loop reads values from an iterable one at a time. Arrays, strings, Sets, and Maps are common built-in iterables.

~~~js
const fruits = ["apple", "banana", "mango"];

for (const fruit of fruits) {
    console.log(fruit);
}
~~~

Output:

~~~text
apple
banana
mango
~~~

Use **for...of** when you want array values and do not need to manage an index yourself.

### Iterate over a string

A string is iterable. For...of visits Unicode code points rather than splitting a supplementary character into its UTF-16 surrogate code units.

~~~js
for (const character of "A😊B") {
    console.log(character);
}
~~~

Output:

~~~text
A
😊
B
~~~

If the task requires UTF-16 code units or grapheme clusters as seen by users, choose a method designed for that specific unit. A code point is not always the same as a user-perceived character.

### Iterate over a Set

A Set yields its values in insertion order and stores each value only once.

~~~js
const tags = new Set(["html", "css", "html"]);

for (const tag of tags) {
    console.log(tag);
}
~~~

Output:

~~~text
html
css
~~~

The second **"html"** is not added because a Set keeps unique values.

### Iterate over a Map

A Map yields each entry as a two-item array containing its key and value. Destructuring can name both parts.

~~~js
const prices = new Map([
    ["tea", 3],
    ["coffee", 4]
]);

for (const [name, price] of prices) {
    console.log(name, price);
}
~~~

Output:

~~~text
tea 3
coffee 4
~~~

### Get both an array index and value

Array's **entries()** method produces index and value pairs that can be read with for...of.

~~~js
const languages = ["JavaScript", "Python"];

for (const [index, language] of languages.entries()) {
    console.log(index, language);
}
~~~

Output:

~~~text
0 JavaScript
1 Python
~~~

This keeps the loop over values while making the index available.

## The for...in loop

A **for...in** loop iterates over enumerable string property names. It can include enumerable properties inherited through the object's prototype chain.

~~~js
const person = {
    name: "Mina",
    role: "Developer"
};

for (const key in person) {
    console.log(key, person[key]);
}
~~~

Output:

~~~text
name Mina
role Developer
~~~

For...in gives property names such as **"name"**, not their values directly. Use the key to read the corresponding value.

### Why for...in is usually not the right array loop

For...in visits enumerable property names, which for a simple array include index-like string keys. It may also visit additional enumerable properties. It does not directly express that you want each array value.

~~~js
const colors = ["red", "green", "blue"];

for (const key in colors) {
    console.log(typeof key, key, colors[key]);
}
~~~

Output:

~~~text
string 0 red
string 1 green
string 2 blue
~~~

Prefer for...of for array values, or a classic for loop when you need an index. Use for...in when the task is specifically about object property names.

### Restrict for...in to an object's own properties

Because for...in can include inherited enumerable properties, check ownership when you only want direct properties.

~~~js
const settings = {
    theme: "dark",
    language: "en"
};

for (const key in settings) {
    if (Object.hasOwn(settings, key)) {
        console.log(key, settings[key]);
    }
}
~~~

Output:

~~~text
theme dark
language en
~~~

**Object.hasOwn()** checks whether a property belongs directly to the object. For many object-processing tasks, **Object.keys()** or **Object.entries()** followed by for...of is a clearer way to restrict work to own enumerable string properties.

~~~js
const settings = {
    theme: "dark",
    language: "en"
};

for (const [key, value] of Object.entries(settings)) {
    console.log(key, value);
}
~~~

Output:

~~~text
theme dark
language en
~~~

Object.entries creates an array of the object's own enumerable string-keyed property pairs.

## Loop scope with let and const

A **let** or **const** declared in a loop header is scoped to the loop. For...of can use const because each iteration receives the next value for the loop binding.

~~~js
for (const name of ["Ari", "Bea"]) {
    console.log(name);
}

// name is not available here.
~~~

Output:

~~~text
Ari
Bea
~~~

Use **const** when the loop variable does not need reassignment in the body. Use **let** when the body needs to update the variable itself.

## Stop, skip, and return

Loops can be controlled with statements such as **break** and **continue**. Break exits the nearest loop, and continue skips the rest of the current iteration. These statements, including labels and nested-loop behavior, are covered in the next chapter.

A **return** inside a function exits the function and therefore ends the loop as well:

~~~js
function findFirstLongWord(words) {
    for (const word of words) {
        if (word.length > 5) {
            return word;
        }
    }

    return undefined;
}

console.log(findFirstLongWord(["cat", "planet", "bird"]));
~~~

Output:

~~~text
planet
~~~

The function returns as soon as it finds the first matching word.

## Avoid infinite loops and off-by-one errors

An **infinite loop** happens when a loop's condition never becomes false and the loop does not exit another way.

~~~js
let count = 0;

while (count < 3) {
    console.log(count);
    // Missing update: count never changes.
}
~~~

This loop keeps printing zero because **count** never changes.

A common **off-by-one error** runs one time too many or too few. For an array with length 3, valid indexes are 0, 1, and 2.

~~~js
const values = ["a", "b", "c"];

for (let index = 0; index <= values.length; index += 1) {
    console.log(values[index]);
}
~~~

Output:

~~~text
a
b
c
undefined
~~~

The condition **index <= values.length** permits index 3, which is outside the array. Use **index < values.length**.

Before running a loop, check:

- What is the first value?
- Which condition is checked, and when?
- How does each iteration move toward stopping?
- Is the boundary inclusive or exclusive?
- Does the loop process values, indexes, or object keys?

## Changing a collection while iterating

Changing a collection during a loop can affect which elements are visited or which indexes refer to which values. Removing an array element while counting upward, for example, shifts later indexes and can cause an item to be skipped.

~~~js
const numbers = [1, 2, 3, 4];

for (let index = 0; index < numbers.length; index += 1) {
    if (numbers[index] % 2 === 0) {
        numbers.splice(index, 1);
    }
}

console.log(numbers);
~~~

Output:

~~~text
[ 1, 3 ]
~~~

The example removes the even values, but each removal shifts the remaining elements. More complicated mutation can skip values or make index logic hard to follow. When possible, build a new collection with a method such as **filter()**, or iterate over a copy if mutation is required.

~~~js
const numbers = [1, 2, 3, 4];
const odds = numbers.filter((number) => number % 2 !== 0);

console.log(odds);
~~~

Output:

~~~text
[ 1, 3 ]
~~~

## Choosing between for...of and forEach

Array's **forEach()** method calls a function for each array element. It is useful for a simple action, but it is a method call rather than a loop statement.

~~~js
["red", "green"].forEach((color) => {
    console.log(color);
});
~~~

Output:

~~~text
red
green
~~~

Use for...of when you need loop control such as break or continue, or when the body reads more naturally as statements. A return from a forEach callback only returns from that callback, not from the surrounding function.

## Common mistakes

### Forgetting to update a while condition

If the loop state never changes, the loop may never end. Ensure every repeated path moves toward a false condition or exits deliberately.

### Using the wrong comparison boundary

Use **index < array.length** for zero-based array indexes. **index <= array.length** includes one index past the end.

### Mixing up for...of and for...in

For...of yields iterable values. For...in yields enumerable property names. Use each for the kind of data you actually need.

### Expecting a plain object to be iterable

Ordinary objects do not usually support for...of directly. Use Object.keys, Object.values, or Object.entries to produce an iterable view of their properties.

### Mutating an array while walking forward by index

Removing an element shifts later indexes. This can skip items. Prefer creating a filtered copy or adjust the iteration strategy intentionally.

### Writing a condition that never changes

Before executing a loop, confirm how its condition can become false. A loop that starts true and never updates has no natural stopping point.

## Try it yourself

1. Use a while loop to count from 5 down to 1.
2. Use do...while to print a message once even if its condition begins false.
3. Use a classic for loop to sum the numbers from 1 through 10.
4. Use for...of to print each item in an array.
5. Use entries() with for...of to print each index and value.
6. Use for...in to list an object's property names.
7. Explain why for...in is usually a poor choice for array values.
8. Fix an off-by-one error in a loop over a three-item array.
9. Describe how an infinite loop can happen when the update is missing.
10. Remove items from an array without skipping values.

## Key points

- While checks before each iteration and may run zero times.
- Do...while checks after the body and runs at least once.
- Classic for groups initialization, condition, and update.
- For...of reads values from iterables such as arrays, strings, Sets, and Maps.
- For...in visits enumerable string property names and can include inherited properties.
- Use Object.hasOwn or Object.entries when processing only an object's own properties.
- Keep an eye on loop updates, boundaries, and collection mutation.
- The next chapter explains break, continue, and labels.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [31 - switch statements](031-switch-statements.md) | [Open Q&A](../qnas/032-loops-and-iteration-statements.md) | [Open example](../examples/032-loops-and-iteration-statements.md) | [33 - break, continue, and labels](033-break-continue-and-labels.md) |
