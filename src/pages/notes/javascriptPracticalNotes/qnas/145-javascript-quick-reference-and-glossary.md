# 145 - JavaScript quick reference and glossary Q&A

Each answer follows its question. Explanations clarify the rule or reasoning behind the answer.

## Foundations and values

### 1. What does ECMAScript describe?

**Answer:** ECMAScript specifies the core JavaScript language, including syntax, values, objects, and built-in behavior.

**Explanation:** Browsers and Node.js implement the language and add their own platform APIs. A DOM API is provided by browsers, while file-system APIs are provided by Node.js.

### 2. Which list contains all seven JavaScript primitive types?

A. string, number, boolean, null, undefined, array, object  
B. string, number, boolean, null, undefined, bigint, symbol  
C. string, integer, boolean, null, undefined, bigint, function

**Answer:** B.

**Explanation:** Arrays and functions are objects. JavaScript numbers include integers and floating point values, so integer is not a separate primitive type.

### 3. What does typeof null return, and how should code check for null?

**Answer:** typeof null returns the string 'object'. Check null with a strict equality comparison such as value === null.

**Explanation:** The typeof result is a historical language quirk. It does not mean null is an object.

### 4. How can code reliably determine whether a value is an array?

**Answer:** Use Array.isArray(value).

**Explanation:** typeof [] returns 'object', so typeof alone cannot distinguish arrays from other objects.

### 5. What is the key difference between undefined and null?

**Answer:** undefined commonly represents a missing or not-yet-assigned value. null is typically assigned intentionally to represent no object value.

**Explanation:** Both can mean absence, but they communicate different intent. Validation code should decide explicitly whether either is allowed.

### 6. Which declaration allows reassignment and remains block scoped?

A. const  
B. let  
C. var

**Answer:** B, let.

**Explanation:** let permits the binding to be reassigned and is scoped to its block. const is also block scoped but does not allow reassignment. var is function scoped.

### 7. Does const make an object immutable?

**Answer:** No. It prevents rebinding the variable, but the referenced object's properties may still change.

**Explanation:** For example, a const object can have a property updated. Immutability requires a convention or a separate mechanism, not just const.

### 8. How should code check whether a value is NaN?

**Answer:** Use Number.isNaN(value).

**Explanation:** The global isNaN function coerces its argument first, which can produce surprising results. Number.isNaN checks whether the value itself is the numeric NaN value.

## Operators and conversion

### 9. Which value is truthy?

A. ''  
B. 0  
C. []  
D. NaN

**Answer:** C, the empty array.

**Explanation:** Empty arrays and empty objects are truthy. The empty string, zero, and NaN are falsy.

### 10. What is the difference between || and ?? when choosing a fallback?

**Answer:** || uses the fallback for any falsy left value. ?? uses it only when the left value is null or undefined.

**Explanation:** Use ?? when values like zero, false, and an empty string should be preserved.

### 11. What is the result of '5' + 2?

**Answer:** The string '52'.

**Explanation:** When one operand is a string, + performs string concatenation. Convert explicitly if numeric addition is intended.

### 12. Why is === usually preferred over ==?

**Answer:** === compares without implicit type coercion.

**Explanation:** Strict equality makes comparisons more predictable. Loose equality applies conversion rules that can obscure the condition's meaning.

### 13. What does Boolean([]) return?

**Answer:** true.

**Explanation:** In JavaScript, all objects are truthy, including empty arrays and empty objects.

### 14. Which operation preserves zero as a meaningful value and uses 10 only for null or undefined?

A. 0 || 10  
B. 0 ?? 10  
C. Boolean(0) || 10

**Answer:** B, 0 ?? 10 evaluates to 0.

**Explanation:** Nullish coalescing only falls back for null or undefined. The logical OR operator would replace zero because zero is falsy.

### 15. Why can Number('') be risky for form validation?

**Answer:** It converts an empty string to zero.

**Explanation:** If an empty field should be rejected, check for empty input before converting it to a number.

### 16. What does optional chaining do when the value before ?. is null or undefined?

**Answer:** It stops that access and evaluates to undefined instead of throwing for that access.

**Explanation:** Optional chaining avoids a missing-property error. It does not prove that a value has the expected shape or type.

## Arrays and objects

### 17. What does map do to an array?

**Answer:** It calls a callback for each item and returns a new array containing the callback results.

**Explanation:** map is useful for transforming a collection while keeping the original array unchanged.

### 18. What does filter do?

**Answer:** It returns a new array containing items for which the callback returns a truthy value.

**Explanation:** Use filter to select matching items without removing them from the original array.

### 19. What does reduce do?

**Answer:** It combines array items into one accumulated result, such as a number, object, or other value.

**Explanation:** Supplying an initial accumulator value makes the behavior predictable, including for an empty input array.

### 20. Does sort change the original array?

**Answer:** Yes. Array.prototype.sort mutates the array.

**Explanation:** Copy first, for example with [...items].sort(...), when the original order must remain unchanged.

### 21. How should an array of numbers be sorted in ascending numeric order?

**Answer:** Use a comparison callback such as (a, b) => a - b.

**Explanation:** Without a callback, sort compares string representations, so numeric values may appear in an unexpected order.

### 22. What does a Set provide?

**Answer:** A collection of unique values.

**Explanation:** Adding a value already in the Set does not create a duplicate entry. A Set is useful for uniqueness checks and membership tests.

### 23. What is one useful difference between Map and a plain object?

**Answer:** Map supports keys of any value type and provides collection-oriented methods such as get, set, and has.

**Explanation:** Object keys are strings or symbols. Choose Map when arbitrary key values or frequent entry operations fit the data model.

### 24. Is object spread a deep copy?

**Answer:** No. It makes a shallow copy.

**Explanation:** Nested objects remain shared references. Changing a nested object through one copy can affect the other.

### 25. When does a destructuring default value apply?

**Answer:** When the extracted value is undefined or the property is missing.

**Explanation:** A default does not replace null. If null should also trigger a fallback, use an explicit nullish check.

### 26. What is the difference between spread and rest syntax?

**Answer:** Spread expands values from an iterable or object. Rest collects remaining values into an array or object.

**Explanation:** The syntax looks similar, but its role depends on the position. For example, spread can pass array items to a function, while rest can collect extra function arguments.

## Functions and control flow

### 27. What does a function return if it reaches the end without a return statement?

**Answer:** undefined.

**Explanation:** A function call always produces a result. When no explicit return value is supplied, that result is undefined.

### 28. When does a default function parameter apply?

**Answer:** When the argument is omitted or its value is undefined.

**Explanation:** Passing null does not trigger a default parameter. Check or normalize null separately if needed.

### 29. What is a closure?

**Answer:** A function together with access to variables from the lexical scope where the function was created.

**Explanation:** A closure can preserve state after the outer function has finished, which is useful for callbacks and private state.

### 30. How does this behave differently in arrow functions and ordinary functions?

**Answer:** An arrow function captures this from its surrounding scope. An ordinary function receives this based on how it is called.

**Explanation:** Use arrows for lexical this behavior. Use ordinary methods when the receiver of a method call should provide this.

### 31. Which loop is generally suitable for iterating values in an array?

A. for...of  
B. for...in  
C. switch

**Answer:** A, for...of.

**Explanation:** for...of iterates iterable values. for...in iterates enumerable property keys and is usually not the intended array-value loop.

### 32. What can happen in a switch case when break is omitted?

**Answer:** Execution may continue into the following case, which is called fall-through.

**Explanation:** Add break when the next case should not run, or use an intentional grouped case with a clear comment.

### 33. What is wrong with an empty catch block?

**Answer:** It silently discards the failure and makes diagnosis or recovery difficult.

**Explanation:** Catch an error when code can handle it, add useful context, or report it. Otherwise allow it to propagate.

## Asynchronous JavaScript and modules

### 34. What does an async function return?

**Answer:** A Promise.

**Explanation:** A returned value becomes the fulfillment value of that Promise. A thrown error becomes a rejection.

### 35. What does await do inside an async function?

**Answer:** It waits for a Promise to settle, then evaluates to its fulfillment value or throws its rejection reason.

**Explanation:** Use try and catch when the function needs to recover from a rejected operation or report a clearer error.

### 36. When is Promise.all useful?

**Answer:** When multiple independent asynchronous operations can run together and every result is needed.

**Explanation:** Promise.all fulfills with all results when every input fulfills, and rejects when an input rejects. Use Promise.allSettled when each outcome must be inspected independently.

### 37. Does fetch reject when a server responds with an HTTP error status?

**Answer:** Usually no. A response such as a not-found or server-error status still fulfills the fetch Promise.

**Explanation:** Check response.ok or response.status. Network failures reject, while HTTP status failures must be handled by application code.

### 38. What are import and export used for?

**Answer:** They define dependencies and public values in ECMAScript modules.

**Explanation:** Modules split programs into files with explicit interfaces. Node.js also supports CommonJS, so use the module format configured for the project.

### 39. Why might code work in a browser but fail in Node.js?

**Answer:** The code may rely on a browser-only API such as document or localStorage.

**Explanation:** The language can be shared across runtimes while platform APIs differ. Identify the target runtime and use the APIs it provides.

## Apply the reference

### 40. What does this code print, and why?

~~~js
const values = [2, 3, 4];
const result = values
  .filter(value => value % 2 === 0)
  .map(value => value * 10)
  .reduce((total, value) => total + value, 0);

console.log(result);
~~~

**Answer:** 60.

**Explanation:** filter keeps 2 and 4. map changes them to 20 and 40. reduce adds those values to the initial total of zero. The original array is not changed by these three operations.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [144 - Capstone project: plan, build, test, and document an application](../lessons/144-capstone-project-plan-build-test-and-document-an-application.md) | [Lesson](../lessons/145-javascript-quick-reference-and-glossary.md) · [Example](../examples/145-javascript-quick-reference-and-glossary.md) | |

