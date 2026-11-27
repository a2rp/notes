# 32 - Loops and iteration statements: examples

These examples show how to repeat work with JavaScript loops. Each one includes a task, code, expected output, and explanation.

## Example 1: Count with while

**Question:** How can a while loop count from 1 through 3?

**Code:**

~~~js
let count = 1;

while (count <= 3) {
    console.log(count);
    count += 1;
}
~~~

**Expected output:**

~~~text
1
2
3
~~~

**Explanation:**

The condition is checked before each pass. Incrementing count moves the loop toward a false condition.

## Example 2: A while loop may run zero times

**Question:** What happens when the while condition is false before the first pass?

**Code:**

~~~js
let count = 0;

while (count < 0) {
    console.log("Inside the loop");
}

console.log("After the loop");
~~~

**Expected output:**

~~~text
After the loop
~~~

**Explanation:**

While checks its condition before running the body. Since zero is not less than zero, the body is skipped.

## Example 3: Run once with do...while

**Question:** How can a loop run its body at least once before checking whether to repeat?

**Code:**

~~~js
let attempts = 0;

do {
    attempts += 1;
    console.log("Attempt:", attempts);
} while (attempts < 3);
~~~

**Expected output:**

~~~text
Attempt: 1
Attempt: 2
Attempt: 3
~~~

**Explanation:**

Do...while checks its condition after the body. The semicolon after the while condition is required by this syntax.

## Example 4: Count through array indexes

**Question:** How can a classic for loop print every index and value in an array?

**Code:**

~~~js
const colors = ["red", "green", "blue"];

for (let index = 0; index < colors.length; index += 1) {
    console.log(index, colors[index]);
}
~~~

**Expected output:**

~~~text
0 red
1 green
2 blue
~~~

**Explanation:**

The index begins at zero and runs while it is less than the array length. The update advances to the next index.

## Example 5: Sum a numeric range

**Question:** How can a for loop add the numbers from 1 through 5?

**Code:**

~~~js
let total = 0;

for (let number = 1; number <= 5; number += 1) {
    total += number;
}

console.log(total);
~~~

**Expected output:**

~~~text
15
~~~

**Explanation:**

The condition uses **<=** because 5 must be included. Each iteration adds the current number to total.

## Example 6: Iterate over array values

**Question:** How can a loop print values without managing an index?

**Code:**

~~~js
const fruits = ["apple", "banana", "mango"];

for (const fruit of fruits) {
    console.log(fruit);
}
~~~

**Expected output:**

~~~text
apple
banana
mango
~~~

**Explanation:**

For...of reads one value from the array on each iteration.

## Example 7: Read both index and value with entries

**Question:** How can for...of provide both the array index and its value?

**Code:**

~~~js
const languages = ["JavaScript", "Python"];

for (const [index, language] of languages.entries()) {
    console.log(index, language);
}
~~~

**Expected output:**

~~~text
0 JavaScript
1 Python
~~~

**Explanation:**

The entries iterator yields pairs. Destructuring stores each pair's index and value in separate variables.

## Example 8: Iterate over string code points

**Question:** How does for...of visit a string containing an emoji?

**Code:**

~~~js
for (const character of "A😊B") {
    console.log(character);
}
~~~

**Expected output:**

~~~text
A
😊
B
~~~

**Explanation:**

For...of over a string yields Unicode code points. The emoji is represented by a surrogate pair in UTF-16, but is yielded as one code point.

## Example 9: Iterate over a Set

**Question:** How can a loop visit each unique value in a Set?

**Code:**

~~~js
const tags = new Set(["html", "css", "html"]);

for (const tag of tags) {
    console.log(tag);
}
~~~

**Expected output:**

~~~text
html
css
~~~

**Explanation:**

Set stores unique values and iterates them in insertion order.

## Example 10: Read Map keys and values

**Question:** How can for...of read each key and value from a Map?

**Code:**

~~~js
const prices = new Map([
    ["tea", 3],
    ["coffee", 4]
]);

for (const [name, price] of prices) {
    console.log(name, price);
}
~~~

**Expected output:**

~~~text
tea 3
coffee 4
~~~

**Explanation:**

Map iteration yields each entry as a key and value pair. Destructuring names both parts.

## Example 11: Inspect object property names with for...in

**Question:** How can a loop print each enumerable property name and its value?

**Code:**

~~~js
const person = {
    name: "Mina",
    role: "Developer"
};

for (const key in person) {
    console.log(typeof key, key, person[key]);
}
~~~

**Expected output:**

~~~text
string name Mina
string role Developer
~~~

**Explanation:**

For...in yields property names as strings. Bracket notation reads the value at each key.

## Example 12: Filter inherited properties out of for...in

**Question:** How can for...in be limited to an object's own enumerable properties?

**Code:**

~~~js
const parent = {
    inherited: "from prototype"
};

const child = Object.create(parent);
child.own = "direct";

for (const key in child) {
    if (Object.hasOwn(child, key)) {
        console.log(key, child[key]);
    }
}
~~~

**Expected output:**

~~~text
own direct
~~~

**Explanation:**

For...in can include enumerable properties from the prototype chain. Object.hasOwn keeps only properties directly owned by child.

## Example 13: Iterate over own object entries

**Question:** What is another way to iterate over an object's own enumerable string-keyed properties?

**Code:**

~~~js
const settings = {
    theme: "dark",
    language: "en"
};

for (const [key, value] of Object.entries(settings)) {
    console.log(key, value);
}
~~~

**Expected output:**

~~~text
theme dark
language en
~~~

**Explanation:**

Object.entries creates an iterable array of key and value pairs for the object's own enumerable string-keyed properties.

## Example 14: Find the off-by-one error

**Question:** Why does this loop print undefined after the array values?

**Code:**

~~~js
const values = ["a", "b", "c"];

for (let index = 0; index <= values.length; index += 1) {
    console.log(values[index]);
}
~~~

**Expected output:**

~~~text
a
b
c
undefined
~~~

**Explanation:**

The loop allows index to equal the array length. The last valid index is **length - 1**, so use **index < values.length**.

## Example 15: Avoid skipping array elements during removal

**Question:** Why can removing array elements while counting forward be surprising?

**Code:**

~~~js
const numbers = [1, 2, 3, 4];

for (let index = 0; index < numbers.length; index += 1) {
    if (numbers[index] % 2 === 0) {
        numbers.splice(index, 1);
    }
}

console.log(numbers);
~~~

**Expected output:**

~~~text
[ 1, 3 ]
~~~

**Explanation:**

Removing an item shifts later values toward lower indexes. This simple loop removes both even values, but more complex changes can skip elements or make index tracking difficult.

## Example 16: Build a filtered array instead of mutating

**Question:** How can a new array keep only odd numbers without changing the original?

**Code:**

~~~js
const numbers = [1, 2, 3, 4];
const odds = numbers.filter((number) => number % 2 !== 0);

console.log(numbers);
console.log(odds);
~~~

**Expected output:**

~~~text
[ 1, 2, 3, 4 ]
[ 1, 3 ]
~~~

**Explanation:**

Filter creates a new array containing values that pass the condition. The original array remains unchanged.

## Example 17: Use a function return to stop searching

**Question:** How can a function return the first word longer than five characters?

**Code:**

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

**Expected output:**

~~~text
planet
~~~

**Explanation:**

Return exits the current function call, which also ends the loop.

## Example 18: Keep the loop state changing

**Question:** How should a while loop update its count so it eventually stops?

**Code:**

~~~js
let count = 0;

while (count < 3) {
    console.log(count);
    count += 1;
}
~~~

**Expected output:**

~~~text
0
1
2
~~~

**Explanation:**

The update moves count toward the point where the condition becomes false. Without it, count would remain zero and the loop would never end naturally.

## Example 19: Omit unused classic for sections

**Question:** Can a classic for loop leave initialization and update outside its header?

**Code:**

~~~js
let value = 0;

for (; value < 3;) {
    console.log(value);
    value += 1;
}
~~~

**Expected output:**

~~~text
0
1
2
~~~

**Explanation:**

The initialization and afterthought can be omitted, but both semicolons remain. This style is valid, though the standard three-part form is usually easier to scan.

## Example 20: Choose the loop for each task

**Question:** Which loop form fits each of these tasks?

**Code:**

~~~js
const values = ["a", "b", "c"];

// Values only
for (const value of values) {
    console.log(value);
}

// Index and value
for (let index = 0; index < values.length; index += 1) {
    console.log(index, values[index]);
}
~~~

**Expected output:**

~~~text
a
b
c
0 a
1 b
2 c
~~~

**Explanation:**

For...of is direct when only values matter. A classic for loop is useful when the index is part of the task.

## Summary

- Use while when the loop depends on a condition and may run zero times.
- Use do...while when the body must run once before the condition is checked.
- Use classic for for counters and indexes.
- Use for...of for values from arrays, strings, Sets, Maps, and other iterables.
- Use for...in to enumerate object property names, with an ownership check when needed.
- Check loop boundaries and updates to avoid off-by-one errors and infinite loops.
- Avoid changing a collection while iterating unless the effects are understood.
- The next chapter covers break, continue, and labels.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [31 - switch statements](../lessons/031-switch-statements.md) | [Open lesson](../lessons/032-loops-and-iteration-statements.md) | [Open Q&A](../qnas/032-loops-and-iteration-statements.md) | [33 - break, continue, and labels](../lessons/033-break-continue-and-labels.md) |
