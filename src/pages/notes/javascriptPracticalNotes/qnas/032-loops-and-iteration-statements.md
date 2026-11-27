# 32 - Loops and iteration statements: Q&A

Use these questions to review **while**, **do...while**, classic **for**, **for...of**, and **for...in** loops. Each answer follows its question.

## Multiple-choice questions

### 1. Which loop checks its condition before the body runs?

A. **do...while** only  
B. **while**  
C. Both while and do...while check after the body  
D. None of them

**Answer:** B. **while**

**Explanation:** A while loop checks before every pass and can run zero times. A do...while loop checks after running its body.

### 2. Which loop always runs its body at least once?

A. **while**  
B. Classic **for**  
C. **do...while**  
D. **for...in**

**Answer:** C. **do...while**

**Explanation:** Its condition is checked after the body.

### 3. Which loop is designed to read values from an array?

A. **for...in**  
B. **for...of**  
C. **while...of**  
D. **if...of**

**Answer:** B. **for...of**

**Explanation:** For...of gets values from an iterable. Arrays are iterable.

### 4. What does for...in produce for an object?

A. Property values  
B. Enumerable string property names  
C. Only array elements  
D. Key and value pairs as arrays

**Answer:** B. Enumerable string property names.

**Explanation:** Use the property name to read its value. For...in can include enumerable inherited properties too.

### 5. What are the three parts of a classic for loop?

A. Input, output, and return  
B. Initialization, condition, and afterthought  
C. Key, value, and separator  
D. Start, stop, and default

**Answer:** B. Initialization, condition, and afterthought.

**Explanation:** Initialization runs once, the condition is checked before each body pass, and the afterthought runs after each pass.

### 6. What happens if the condition in a while loop is initially false?

A. The body runs once.  
B. The body does not run.  
C. The condition changes to true.  
D. The program throws a syntax error.

**Answer:** B. The body does not run.

**Explanation:** While checks its condition before entering the body.

### 7. Which loop is generally best for getting both an array value and its index without manual index arithmetic?

A. **for...in**  
B. **for...of array.entries()**  
C. **do...while**  
D. **switch**

**Answer:** B. **for...of array.entries()**

**Explanation:** The entries iterator provides index and value pairs that can be destructured.

### 8. Which data structure can be iterated directly with for...of?

A. An ordinary plain object  
B. A Set  
C. A non-iterable function object  
D. A number

**Answer:** B. A Set.

**Explanation:** Set is iterable. Plain objects do not generally implement the iterable protocol.

### 9. Which statement about a string looped with for...of is correct?

A. It always returns UTF-16 code units individually.  
B. It yields Unicode code points.  
C. It skips all emoji.  
D. It yields property names.

**Answer:** B. It yields Unicode code points.

**Explanation:** A supplementary character represented by a surrogate pair is yielded as one code point. A code point is not always one user-perceived character.

### 10. Why is for...in usually not preferred for array values?

A. It cannot loop over arrays.  
B. It yields keys, not the values directly, and may include extra enumerable properties.  
C. It always reverses the array.  
D. It changes every value to a string.

**Answer:** B. It yields keys, not the values directly, and may include extra enumerable properties.

**Explanation:** Use for...of for values or a classic for loop when the index is needed.

## Predict the output

### 11. What does this print?

~~~js
let count = 1;

while (count <= 3) {
    console.log(count);
    count += 1;
}
~~~

**Answer:**

~~~text
1
2
3
~~~

**Explanation:** The condition is checked before each pass. After count becomes 4, the condition is false.

### 12. What does this print?

~~~js
let count = 0;

while (count < 0) {
    console.log("inside");
}

console.log("outside");
~~~

**Answer:**

~~~text
outside
~~~

**Explanation:** The condition is false before the first pass, so the loop body is skipped.

### 13. What does this print?

~~~js
let count = 0;

do {
    console.log(count);
    count += 1;
} while (count < 1);
~~~

**Answer:**

~~~text
0
~~~

**Explanation:** The body runs before the condition is checked. After count becomes 1, the condition is false.

### 14. What does this print?

~~~js
for (let index = 0; index < 3; index += 1) {
    console.log(index);
}
~~~

**Answer:**

~~~text
0
1
2
~~~

**Explanation:** The loop initializes index to zero, checks it against 3, runs the body, then increments it.

### 15. What does this print?

~~~js
for (let value = 6; value >= 2; value -= 2) {
    console.log(value);
}
~~~

**Answer:**

~~~text
6
4
2
~~~

**Explanation:** The value decreases by 2 each time, and the inclusive condition allows 2 to print.

### 16. What does this print?

~~~js
for (const fruit of ["apple", "banana"]) {
    console.log(fruit);
}
~~~

**Answer:**

~~~text
apple
banana
~~~

**Explanation:** For...of yields each array value in order.

### 17. What does this print?

~~~js
for (const [index, letter] of ["a", "b"].entries()) {
    console.log(index, letter);
}
~~~

**Answer:**

~~~text
0 a
1 b
~~~

**Explanation:** The entries iterator yields pairs containing each index and value.

### 18. What does this print?

~~~js
for (const character of "A😊B") {
    console.log(character);
}
~~~

**Answer:**

~~~text
A
😊
B
~~~

**Explanation:** For...of over a string iterates Unicode code points. The emoji is yielded as one code point.

### 19. What does this print?

~~~js
const values = new Set(["red", "blue", "red"]);

for (const value of values) {
    console.log(value);
}
~~~

**Answer:**

~~~text
red
blue
~~~

**Explanation:** Set stores unique values and iterates them in insertion order.

### 20. What does this print?

~~~js
const prices = new Map([
    ["tea", 3],
    ["coffee", 4]
]);

for (const [name, price] of prices) {
    console.log(name, price);
}
~~~

**Answer:**

~~~text
tea 3
coffee 4
~~~

**Explanation:** Map iteration yields key and value pairs.

### 21. What does this print?

~~~js
const person = {
    name: "Mina",
    role: "Developer"
};

for (const key in person) {
    console.log(typeof key, key, person[key]);
}
~~~

**Answer:**

~~~text
string name Mina
string role Developer
~~~

**Explanation:** For...in yields property names as strings. The value is read separately with bracket notation.

### 22. What does this print?

~~~js
const values = ["a", "b", "c"];

for (let index = 0; index <= values.length; index += 1) {
    console.log(values[index]);
}
~~~

**Answer:**

~~~text
a
b
c
undefined
~~~

**Explanation:** The condition allows index to equal the array length. That position is past the last valid index, so the read returns undefined.

### 23. What does this print?

~~~js
const numbers = [1, 2, 3, 4];

for (let index = 0; index < numbers.length; index += 1) {
    if (numbers[index] % 2 === 0) {
        numbers.splice(index, 1);
    }
}

console.log(numbers);
~~~

**Answer:**

~~~text
[ 1, 3 ]
~~~

**Explanation:** Each removed value shifts later indexes down. This example happens to remove both even values, but mutation during iteration can make more complicated loops skip elements.

### 24. What does this print?

~~~js
let value = 0;

for (; value < 2;) {
    console.log(value);
    value += 1;
}
~~~

**Answer:**

~~~text
0
1
~~~

**Explanation:** The initialization and afterthought sections are omitted, but the two semicolons remain. The body updates value.

## True or false

### 25. A while loop can run zero times.

**Answer:** True.

**Explanation:** It checks the condition before the body.

### 26. A do...while loop can skip its body when its condition is initially false.

**Answer:** False.

**Explanation:** Its body runs once before the first condition check.

### 27. For...of yields values from an iterable.

**Answer:** True.

**Explanation:** Arrays, strings, Sets, and Maps are common iterables.

### 28. For...in yields an object's property values directly.

**Answer:** False.

**Explanation:** It yields enumerable string property names. Use each name to access the value.

### 29. An ordinary plain object can always be used directly with for...of.

**Answer:** False.

**Explanation:** Plain objects do not generally implement the iterable protocol. Object.keys, Object.values, or Object.entries can provide iterable arrays of their properties.

### 30. The condition **index <= array.length** is normally correct for visiting every array index.

**Answer:** False.

**Explanation:** The last valid array index is **array.length - 1**. Use **index < array.length**.

### 31. A for...in loop can visit inherited enumerable properties.

**Answer:** True.

**Explanation:** It traverses enumerable string property names from the object and its prototype chain.

### 32. Removing items from an array during a forward index loop can affect later indexes.

**Answer:** True.

**Explanation:** Removing an element shifts later elements toward lower indexes.

## Short-answer questions

### 33. What is the main difference between while and do...while?

**Answer:** While checks before the body. Do...while checks after the body.

**Explanation:** A while loop may run zero times. A do...while loop runs at least once.

### 34. What is the order of a classic for loop?

**Answer:** Initialization runs once, then the condition is checked, the body runs if true, and the afterthought runs after the body.

**Explanation:** The loop then returns to the condition check.

### 35. What does for...of provide that for...in does not?

**Answer:** For...of yields iterable values. For...in yields enumerable property names.

**Explanation:** Choose based on whether the task needs collection values or object keys.

### 36. When is for...in appropriate?

**Answer:** When the task is specifically to enumerate an object's enumerable string property names.

**Explanation:** If only own enumerable string properties are needed, use Object.hasOwn inside the loop or iterate over Object.entries.

### 37. How do you get an array's index and value with for...of?

**Answer:**

~~~js
for (const [index, value] of values.entries()) {
    console.log(index, value);
}
~~~

**Explanation:** Array entries yields a pair for each element.

### 38. Why should loop state move toward making the condition false?

**Answer:** Otherwise the loop may never stop.

**Explanation:** A changing counter, collection position, or condition value provides a clear path to termination.

### 39. Why can a chained comparison like **0 <= value <= 10** be wrong?

**Answer:** JavaScript evaluates the first comparison, converts its Boolean result for the second comparison, and does not treat the expression as a mathematical range.

**Explanation:** Write **value >= 0 && value <= 10**.

### 40. What does an array loop using **index < array.length** avoid?

**Answer:** It avoids reading one position past the final array element.

**Explanation:** Valid array indexes start at zero and end at **length - 1**.

### 41. How can a loop process an object's own entries without for...in?

**Answer:**

~~~js
for (const [key, value] of Object.entries(object)) {
    console.log(key, value);
}
~~~

**Explanation:** Object.entries returns an array of the object's own enumerable string-keyed property pairs.

## Coding and reasoning questions

### 42. Write a while loop that counts down from 3 to 1.

**Answer:**

~~~js
let count = 3;

while (count > 0) {
    console.log(count);
    count -= 1;
}
~~~

**Explanation:** Each pass reduces count, so the condition eventually becomes false.

### 43. Write a do...while loop that always prints one prompt before checking whether to repeat.

**Answer:**

~~~js
let response = "";

do {
    console.log("Enter yes or no.");
    response = "yes";
} while (response !== "yes");
~~~

**Explanation:** The body prints once before the condition is checked. Here the response is set to yes, so the loop ends after that pass.

### 44. Use a classic for loop to calculate the sum of numbers from 1 through 5.

**Answer:**

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

**Explanation:** The inclusive condition includes 5. Each pass adds the current number to total.

### 45. Use for...of to create a new array containing doubled values.

**Answer:**

~~~js
const numbers = [2, 4, 6];
const doubled = [];

for (const number of numbers) {
    doubled.push(number * 2);
}

console.log(doubled);
~~~

**Expected output:**

~~~text
[ 4, 8, 12 ]
~~~

**Explanation:** For...of supplies each value, and push adds its transformed value to the new array.

### 46. Use for...in to print only an object's own properties.

**Answer:**

~~~js
for (const key in object) {
    if (Object.hasOwn(object, key)) {
        console.log(key, object[key]);
    }
}
~~~

**Explanation:** The ownership check ignores enumerable properties inherited from the prototype chain.

### 47. Fix this loop so it processes every array item exactly once.

~~~js
const items = ["a", "b", "c"];

for (let index = 0; index <= items.length; index += 1) {
    console.log(items[index]);
}
~~~

**Answer:**

~~~js
const items = ["a", "b", "c"];

for (let index = 0; index < items.length; index += 1) {
    console.log(items[index]);
}
~~~

**Explanation:** The strict less-than condition stops before index reaches the length.

### 48. Rewrite a loop that only needs values using for...of.

~~~js
const names = ["Ari", "Bea"];

for (let index = 0; index < names.length; index += 1) {
    console.log(names[index]);
}
~~~

**Answer:**

~~~js
const names = ["Ari", "Bea"];

for (const name of names) {
    console.log(name);
}
~~~

**Explanation:** The index is unnecessary when the body only needs each value.

### 49. Why does this loop never finish, and how can it be fixed?

~~~js
let count = 0;

while (count < 3) {
    console.log(count);
}
~~~

**Answer:** Count never changes, so the condition remains true. Increment it in the body.

~~~js
let count = 0;

while (count < 3) {
    console.log(count);
    count += 1;
}
~~~

**Explanation:** Each iteration moves count closer to the stopping condition.

### 50. Describe the difference between processing an array with for...of and for...in.

**Answer:** For...of reads array values. For...in reads enumerable property names, often index-like strings.

**Explanation:** Use for...of for values. Use a classic for loop or entries when indexes are needed.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [31 - switch statements](../lessons/031-switch-statements.md) | [Open lesson](../lessons/032-loops-and-iteration-statements.md) | [Open example](../examples/032-loops-and-iteration-statements.md) | [33 - break, continue, and labels](../lessons/033-break-continue-and-labels.md) |
