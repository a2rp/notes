# 134 - Functional programming: composition and purity: Q&A

Review function values, purity, side effects, immutability, array transformations, and composition. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does it mean that JavaScript functions are first-class values?

- A. They can be assigned, passed to functions, and returned from functions
- B. They must always be declared at the top of a file
- C. They can only be called once
- D. They cannot be stored in objects

**Answer: A.**

**Explanation:** Functions can be handled like other values, which enables callbacks, higher-order functions, and composition.

### 2. What makes a function higher-order?

- A. It accepts a function or returns a function
- B. It has more than ten statements
- C. It uses a class
- D. It always returns an object

**Answer: A.**

**Explanation:** A higher-order function consumes or produces functions. Array methods such as map accept callback functions.

### 3. Which pair of properties describes a pure function?

- A. Same inputs produce the same result, and it causes no observable outside change
- B. It always has one line and uses an arrow
- C. It logs every result and updates a global
- D. It cannot accept object arguments

**Answer: A.**

**Explanation:** A pure function's behavior depends on its arguments and it does not change external state.

### 4. Why is this function not pure?

~~~js
let taxRate = 0.1;

function total(price) {
  return price + price * taxRate;
}
~~~

- A. Its result depends on a mutable variable outside its arguments
- B. It returns a number
- C. It has a parameter
- D. It uses multiplication

**Answer: A.**

**Explanation:** If taxRate changes, the same price can produce a different result. Passing the rate as an argument makes the dependency explicit.

### 5. Which action is a side effect?

- A. Writing a message to the console
- B. Returning the sum of two arguments
- C. Creating a local number
- D. Comparing two parameters

**Answer: A.**

**Explanation:** Console output is observable outside the function's returned value. File writes, network calls, and mutations of shared state are also side effects.

### 6. What does map return?

- A. A new array containing each callback result
- B. The original array in all cases
- C. A Set
- D. A number of matching values

**Answer: A.**

**Explanation:** map creates a new array with one result for each visited element.

### 7. Which operation is the clearest choice to keep only items that pass a condition?

- A. filter
- B. map
- C. sort
- D. reduceRight

**Answer: A.**

**Explanation:** filter returns a new array containing values for which the callback returns a truthy result.

### 8. What does map put in its result when a callback has no return statement?

- A. undefined for that element
- B. It automatically removes the element
- C. It throws a syntax error
- D. The original value

**Answer: A.**

**Explanation:** map stores the callback's returned value. If the callback returns nothing, that value is undefined.

### 9. Why is an initial accumulator value useful with reduce?

- A. It defines the starting value and supports empty input
- B. It sorts the input
- C. It prevents the callback from running
- D. It deep-clones the array

**Answer: A.**

**Explanation:** An explicit initial value makes the reduction's result type and empty-array behavior clearer.

### 10. What does Array sort do to its receiver?

- A. It sorts the array in place
- B. It always creates a deep copy
- C. It converts the array to a Map
- D. It never changes the array

**Answer: A.**

**Explanation:** sort mutates the array. Copy it first if the original order must be retained.

### 11. What does spread syntax copy when used on an array?

- A. The outer array, with nested references still shared
- B. The complete object graph recursively
- C. Only primitive elements
- D. Nothing

**Answer: A.**

**Explanation:** Spread performs a shallow copy. Nested objects remain the same references.

### 12. What does Object.freeze do to nested objects?

- A. It does not freeze nested objects automatically
- B. It recursively freezes every object
- C. It deletes nested values
- D. It converts nested objects to strings

**Answer: A.**

**Explanation:** Object.freeze is shallow. It protects the immediate object's properties, but nested objects need their own protection.

### 13. In a pipe helper, how do functions usually run?

- A. Left to right
- B. Right to left
- C. In alphabetical order
- D. In random order

**Answer: A.**

**Explanation:** A pipe sends the value through functions in the order they are listed.

### 14. In a compose helper implemented with reduceRight, how do functions run?

- A. Right to left
- B. Left to right
- C. Only the first function runs
- D. Only functions that mutate run

**Answer: A.**

**Explanation:** reduceRight applies functions from the rightmost toward the leftmost, so composition order is reversed relative to pipe.

### 15. What is a closure?

- A. A function that can access variables from its surrounding lexical scope
- B. A block comment at the end of a function
- C. A function that cannot return
- D. An array method

**Answer: A.**

**Explanation:** A closure retains access to bindings from the scope where the function was created.

### 16. Which is the clearest choice when an array traversal is only being used for side effects?

- A. forEach or a loop
- B. map with its result ignored
- C. sort
- D. slice

**Answer: A.**

**Explanation:** map is intended to create a transformed array. forEach or a loop communicates that the goal is performing an action.

### 17. What does referential transparency mean in practical terms?

- A. A function call can be replaced by its result without changing program behavior
- B. A function always changes its arguments
- C. A function returns the same object reference
- D. A function must access the DOM

**Answer: A.**

**Explanation:** Pure expressions can be reasoned about through their results because they do not cause hidden outside changes.

### 18. How can a calculation that depends on the current time be easier to test?

- A. Pass the time or clock value into the calculation
- B. Read Date.now from a global in every helper
- C. Add a random delay
- D. Log the current date and ignore it

**Answer: A.**

**Explanation:** An explicit time input makes the calculation deterministic for a chosen test value.

### 19. What does a functional core and imperative shell design suggest?

- A. Keep value transformations predictable and place external interactions at visible boundaries
- B. Put all code in one function
- C. Avoid every side effect, including required output
- D. Use classes for every transformation

**Answer: A.**

**Explanation:** The application still performs effects, but isolates them from calculations where practical.

### 20. Does functional programming require avoiding all mutation everywhere?

- A. No, it encourages predictable transformations and controlled effects
- B. Yes, mutation is impossible in JavaScript
- C. Yes, even local variables cannot change
- D. No, but every function must log

**Answer: A.**

**Explanation:** Local mutation can be clear and efficient. The goal is to avoid surprising changes to shared state.

## Short-answer questions

### 21. Give a pure function example and describe why it is pure.

**Answer:** A function such as add(a, b) that returns a + b is pure when it reads only its arguments and changes no outside state.

**Explanation:** The same arguments lead to the same result, and the call has no observable effect beyond its return value.

### 22. How can a closure become stateful and unpredictable?

**Answer:** It can capture a mutable variable that changes between calls.

**Explanation:** Later results may then depend on call history. This can be useful for controlled state, but it is not the same as a pure calculation.

### 23. Why should map not be used only for side effects?

**Answer:** map allocates and returns a new array, so ignoring that array hides the operation's purpose.

**Explanation:** Use forEach or a loop when the goal is an action rather than a transformed result.

### 24. When is reduce a good fit?

**Answer:** When many values are combined into one result, such as a sum, frequency map, or grouped value.

**Explanation:** Use map for one output per input and filter for selection. A loop may be clearer when reduction logic has many branches.

### 25. What is a shallow copy?

**Answer:** A new outer array or object whose nested object values still refer to the same objects as the original.

**Explanation:** Changing a nested shared object through either outer copy is visible through both.

### 26. Why is Object.freeze not a complete deep-immutability solution?

**Answer:** It only freezes the immediate object and leaves referenced nested objects mutable.

**Explanation:** A recursive deep-freeze helper must also handle cycles, shared references, and objects that should not be frozen.

### 27. What does function composition require of adjacent functions?

**Answer:** The output type and shape from one function must be valid input for the next.

**Explanation:** If functions have mismatched inputs and outputs, the pipeline is not meaningful or may fail at runtime.

### 28. How can a function avoid a hidden dependency on global configuration?

**Answer:** Pass the configuration value as an explicit argument.

**Explanation:** Explicit parameters make the dependency visible and let callers supply different values without changing global state.

### 29. Why can a chain of array transformations use more memory than a loop?

**Answer:** Each transformation may create an intermediate array.

**Explanation:** Readability is often worth the cost. Measure a real hot path before replacing a clear pipeline.

### 30. What is a side-effect boundary?

**Answer:** A deliberate part of the application that reads or changes external systems, such as a database, file, network, clock, or console.

**Explanation:** Keeping these interactions visible makes the surrounding data transformations easier to reason about.

## Scenario questions

### 31. A helper sorts an array and then returns it. The caller later discovers the original order changed. How should the helper be adjusted?

**Answer:** Copy the array before sorting, such as [...values].sort(comparator).

**Explanation:** sort mutates the array it receives. Copying preserves the caller's original outer array.

### 32. A map callback updates an object property but does not return a value. The resulting array contains undefined. What is wrong?

**Answer:** The callback performs mutation but does not return the transformed item. Use a loop or forEach for intentional mutation, or return a new object from map.

**Explanation:** map stores exactly what each callback returns.

### 33. A copied settings object still changes when a nested field is edited through the copy. Why?

**Answer:** The copy is shallow, so the nested settings object is shared.

**Explanation:** Copy the nested object too if the update must not affect the original.

### 34. A date calculation reads the current time internally, making results hard to reproduce. How can it be made easier to test?

**Answer:** Accept a Date or timestamp as an argument and let the caller read the real clock at the application boundary.

**Explanation:** Tests can pass a fixed time while production code supplies the current time.

### 35. A pure calculation logs every intermediate value. Is it pure?

**Answer:** No. Console output is an observable side effect.

**Explanation:** Return the result from the calculation and log at a boundary if logging is needed.

### 36. A reduce callback mutates a new local Map and returns it. Does that necessarily mutate outside state?

**Answer:** No, if that Map was created within the reduction and is not shared elsewhere, the mutation is contained in the computation.

**Explanation:** Functional style is about predictable observable behavior, not banning every local mutation.

## Coding questions

### 37. Write a pipe helper and use it to normalize a string.

**Answer:**

~~~js
function pipe(...operations) {
  return (value) => operations.reduce(
    (current, operation) => operation(current),
    value,
  );
}

const trim = (text) => text.trim();
const lowercase = (text) => text.toLowerCase();
const normalize = pipe(trim, lowercase);

console.log(normalize("  JAVASCRIPT  ")); // "javascript"
~~~

**Explanation:** The input flows through the operations from left to right. Each function returns the value consumed by the next function.

### 38. Transform an array of prices by adding tax without changing the input.

**Answer:**

~~~js
function addTax(prices, rate) {
  return prices.map((price) => price * (1 + rate));
}

const prices = [10, 20];
console.log(addTax(prices, 0.1)); // [11, 22]
console.log(prices); // [10, 20]
~~~

**Explanation:** The rate is an explicit dependency. map returns a new array, and the numbers in the original array are unchanged.

### 39. Return a new user object with a changed name, preserving the original outer object.

**Answer:**

~~~js
function renameUser(user, name) {
  return {
    ...user,
    name,
  };
}

const original = { id: 7, name: "Mina" };
const renamed = renameUser(original, "Ravi");

console.log(renamed); // { id: 7, name: "Ravi" }
console.log(original.name); // "Mina"
~~~

**Explanation:** The function creates a new outer object and does not mutate the original. Nested object fields would still be shared unless copied separately.

### 40. Calculate a total using reduce with an explicit initial value.

**Answer:**

~~~js
function totalAmounts(amounts) {
  return amounts.reduce((total, amount) => total + amount, 0);
}

console.log(totalAmounts([4, 6, 5])); // 15
console.log(totalAmounts([])); // 0
~~~

**Explanation:** The initial zero defines the empty-array result and the accumulator type.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [133 - Algorithmic thinking, complexity, and common patterns](../lessons/133-algorithmic-thinking-complexity-and-common-patterns.md) | [Lesson 134](../lessons/134-functional-programming-composition-and-purity.md) | [Open example](../examples/134-functional-programming-composition-and-purity.md) | [135 - Object-oriented programming, composition, and design patterns](../lessons/135-object-oriented-programming-composition-and-design-patterns.md) |
