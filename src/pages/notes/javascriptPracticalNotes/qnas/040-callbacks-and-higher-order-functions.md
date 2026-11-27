# 40 - Callbacks and higher-order functions - Q&A

Review callback basics, higher-order functions, callback timing, and array methods. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is a callback?

A. A function that can only run after a timer  
B. A function passed to another function so it can be invoked  
C. A function that always returns another function  
D. A browser event

**Answer:** B. A function passed to another function so it can be invoked.

**Explanation:** The receiving function decides when and how to call the function it receives. The callback may run immediately or later.

### 2. What makes a function higher-order?

A. It has more than one parameter  
B. It uses a loop  
C. It accepts a function, returns a function, or both  
D. It is always asynchronous

**Answer:** C. It accepts a function, returns a function, or both.

**Explanation:** A higher-order function works with functions as values. It does not have to be asynchronous.

### 3. What does this pass to **run**?

~~~js
run(task);
~~~

A. The result of calling **task**  
B. The function value **task**  
C. The string "task"  
D. Nothing

**Answer:** B. The function value **task**.

**Explanation:** **task** is passed without being invoked. **run** can decide when to call it.

### 4. What does this pass to **run**?

~~~js
run(task());
~~~

A. The function value **task**  
B. The result returned by calling **task**  
C. The function name as text  
D. A callback that runs later

**Answer:** B. The result returned by calling **task**.

**Explanation:** The parentheses call **task** immediately. Its return value becomes the argument to **run**.

### 5. Which array method creates a new array from callback return values?

A. **forEach**  
B. **map**  
C. **find**  
D. **some**

**Answer:** B. **map**.

**Explanation:** **map** calls its callback for each visited item and stores each returned value in a new array.

### 6. What does **filter** use from its callback?

A. The callback's truthy or falsy result  
B. Only the callback's first string  
C. The callback's parameter name  
D. The callback's execution time

**Answer:** A. The callback's truthy or falsy result.

**Explanation:** Items whose callback result is truthy are kept. Items with a falsy result are excluded.

### 7. What does **find** return when no item matches?

A. An empty array  
B. **false**  
C. **undefined**  
D. The original array

**Answer:** C. **undefined**.

**Explanation:** **find** returns the first matching item. If it reaches the end without a match, its result is **undefined**.

### 8. Which statement about **forEach** is correct?

A. It returns a new array of callback results  
B. It returns the first matching item  
C. It returns **undefined**  
D. It always runs asynchronously

**Answer:** C. It returns **undefined**.

**Explanation:** **forEach** is meant for an action on each item. Use **map** when you want a new array of transformed values.

### 9. What does **some** return?

A. The first matching item  
B. **true** if at least one item satisfies the condition  
C. **true** only if every item satisfies the condition  
D. A new array

**Answer:** B. **true** if at least one item satisfies the condition.

**Explanation:** **some** can stop after finding its first match. **every** checks whether all items satisfy a condition.

### 10. Why is an initial value often useful with **reduce**?

A. It changes the callback to asynchronous  
B. It defines the starting accumulator and handles an empty array  
C. It sorts the input array  
D. It prevents the callback from running

**Answer:** B. It defines the starting accumulator and handles an empty array.

**Explanation:** Without an initial value, the first array item becomes the accumulator. Calling **reduce** on an empty array without an initial value throws a **TypeError**.

### 11. What does a zero-delay timer guarantee?

A. Its callback runs before the next statement  
B. Its callback runs immediately  
C. Its callback is eligible to run after the current task completes  
D. Its callback interrupts the current function

**Answer:** C. Its callback is eligible to run after the current task completes.

**Explanation:** A zero delay does not interrupt synchronous JavaScript or promise an exact execution time.

### 12. What should a numeric **sort** comparator return?

A. A string describing the order  
B. A negative number, zero, or a positive number  
C. Only **true** or **false**  
D. A new sorted array

**Answer:** B. A negative number, zero, or a positive number.

**Explanation:** A negative result puts the first value before the second, a positive result puts it after, and zero indicates equal order for that comparison.

## True or false

### 13. Every callback runs asynchronously.

**Answer:** False.

**Explanation:** A callback runs when its caller invokes it. **map**, **filter**, and **forEach** invoke callbacks synchronously. Timer callbacks run later.

### 14. In **items.map(callback)**, **callback** is passed to **map** as a function value.

**Answer:** True.

**Explanation:** **map** invokes the function for the array items. Writing **callback()** would call it before passing its result.

### 15. Returning a value from a callback automatically returns that value from the outer function.

**Answer:** False.

**Explanation:** A return statement exits the callback invocation. The outer function must explicitly use or return that value.

### 16. **map** changes the original array into the values returned by its callback.

**Answer:** False.

**Explanation:** **map** returns a new array. The original array is not replaced, although callback code could independently mutate values or shared state.

### 17. **forEach** is a good choice when the goal is to create a transformed array.

**Answer:** False.

**Explanation:** Use **map** for transformation because it returns the values produced by the callback.

### 18. A callback can be synchronous even if it is an anonymous function.

**Answer:** True.

**Explanation:** Whether a callback is synchronous depends on when its caller invokes it, not whether it has a name.

### 19. A zero-delay timer callback runs after the current synchronous statements finish.

**Answer:** True.

**Explanation:** The timer callback is scheduled to run later, after the current JavaScript task completes.

### 20. **find** continues checking every remaining item after it finds a match.

**Answer:** False.

**Explanation:** **find** returns the first matching item and stops searching.

## Short-answer questions

### 21. Explain the difference between a callback and a higher-order function.

**Answer:** A callback is a function supplied to another function. A higher-order function is the receiving or producing function that accepts functions, returns functions, or both.

**Explanation:** In **numbers.map(callback)**, **callback** is the callback and **map** is the higher-order method.

### 22. Why is **run(task)** different from **run(task())**?

**Answer:** **run(task)** passes the function itself. **run(task())** calls **task** immediately and passes its return value.

**Explanation:** The first form lets **run** control when the function executes. The second executes it before **run** starts.

### 23. What arguments do array iteration callbacks commonly receive?

**Answer:** They commonly receive the current item, its index, and the original array, in that order.

**Explanation:** For example, a **map** callback can declare **value**, **index**, and **array** parameters. A callback can declare only the arguments it needs.

### 24. When should you choose **map** instead of **forEach**?

**Answer:** Choose **map** when each input item should produce a corresponding value in a new array.

**Explanation:** **forEach** is for performing an action and returns **undefined**. **map** communicates transformation and returns the transformed array.

### 25. What is the difference between **some** and **every**?

**Answer:** **some** checks whether at least one item passes a condition. **every** checks whether all items pass it.

**Explanation:** Both return booleans and can stop early once their result is determined.

### 26. Why should a **reduce** call usually include an initial value?

**Answer:** The initial value makes the accumulator's starting type and meaning explicit, and it allows the operation to handle an empty array.

**Explanation:** Without it, the first array item becomes the accumulator and the callback starts at the second item. An empty array then causes a **TypeError**.

### 27. How does a callback's return value affect the outer function?

**Answer:** It affects the outer function only if that function reads or returns the callback result.

**Explanation:** **map** reads callback results to construct an array. **forEach** ignores them.

### 28. Why can numeric sorting fail without a comparator?

**Answer:** By default, **sort** compares string representations rather than numeric values.

**Explanation:** For numeric ascending order, use a comparator such as **(left, right) => left - right**.

### 29. What is the difference between a synchronous callback and an asynchronous callback?

**Answer:** A synchronous callback runs as part of the current sequence before its caller returns. An asynchronous callback is scheduled to run later.

**Explanation:** **forEach** invokes callbacks synchronously. A timer API invokes its callback later, after the current task finishes.

### 30. What is a common older Node.js callback convention for errors?

**Answer:** An error-first callback puts an error or **null** in its first argument, followed by result values.

**Explanation:** Code typically checks the first argument before using the result. Always follow the specific API's documented callback contract.

## Coding and output questions

### 31. What is printed?

~~~js
function run(callback) {
    console.log("A");
    callback();
    console.log("C");
}

run(function () {
    console.log("B");
});
~~~

**Answer:**

~~~text
A
B
C
~~~

**Explanation:** **run** calls the callback synchronously between its two log statements.

### 32. What is printed, and what is the value of **result**?

~~~js
const result = [2, 4].map(function (number) {
    return number + 1;
});

console.log(result);
~~~

**Answer:**

~~~text
[ 3, 5 ]
~~~

**Explanation:** **result** is the new array **[3, 5]**. **map** saves each callback return value at the corresponding position.

### 33. What is printed?

~~~js
const result = [2, 4].forEach(function (number) {
    return number + 1;
});

console.log(result);
~~~

**Answer:**

~~~text
undefined
~~~

**Explanation:** **forEach** ignores callback return values and itself returns **undefined**.

### 34. What is printed?

~~~js
const values = [3, 6, 8, 9];

console.log(values.filter(function (value) {
    return value % 3 === 0;
}));
~~~

**Answer:**

~~~text
[ 3, 6, 9 ]
~~~

**Explanation:** The callback returns a truthy comparison for values divisible by three, so **filter** keeps those values.

### 35. What is printed?

~~~js
const values = [5, 12, 20];

console.log(values.find(function (value) {
    return value > 10;
}));
~~~

**Answer:**

~~~text
12
~~~

**Explanation:** **find** returns the first value whose callback result is truthy, then stops.

### 36. What is printed?

~~~js
console.log("first");

setTimeout(function () {
    console.log("timer");
}, 0);

console.log("last");
~~~

**Answer:**

~~~text
first
last
timer
~~~

**Explanation:** The timer callback does not interrupt the current task. The synchronous statements finish before the callback runs.

### 37. Write a function named **runTwice** that invokes a callback exactly two times.

**Answer:**

~~~js
function runTwice(callback) {
    callback();
    callback();
}

let count = 0;

runTwice(function () {
    count += 1;
});

console.log(count);
~~~

Output:

~~~text
2
~~~

**Explanation:** **runTwice** accepts a function and invokes it twice. The callback updates the shared **count** variable on each invocation.

### 38. Use **map** to convert an array of names to uppercase.

**Answer:**

~~~js
const names = ["Asha", "Mina"];
const uppercaseNames = names.map(function (name) {
    return name.toUpperCase();
});

console.log(uppercaseNames);
~~~

Output:

~~~text
[ 'ASHA', 'MINA' ]
~~~

**Explanation:** Each callback invocation returns a transformed string. **map** collects those strings into a new array.

### 39. Use **reduce** to total an array of prices safely.

**Answer:**

~~~js
const prices = [12, 8, 5];

const total = prices.reduce(function (sum, price) {
    return sum + price;
}, 0);

console.log(total);
~~~

Output:

~~~text
25
~~~

**Explanation:** The initial value **0** starts the accumulator and makes an empty prices array produce **0**.

### 40. Sort these numbers in ascending numeric order.

~~~js
const numbers = [14, 3, 25, 8];
~~~

**Answer:**

~~~js
numbers.sort(function (left, right) {
    return left - right;
});

console.log(numbers);
~~~

Output:

~~~text
[ 3, 8, 14, 25 ]
~~~

**Explanation:** The comparator returns a negative result when **left** is smaller and a positive result when **left** is larger.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [39 - Arrow functions](039-arrow-functions.md) | [Open lesson](../lessons/040-callbacks-and-higher-order-functions.md) | [Open example](../examples/040-callbacks-and-higher-order-functions.md) | [41 - Lexical scope and closures](041-lexical-scope-and-closures.md) |