# 47 - Transforming arrays: map, filter, reduce, and flat - Q&A

Use these questions to review array transformation methods, callback results, flattening, sparse arrays, and shallow copies. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which method creates a result for each present input element?

A. **filter**  
B. **map**  
C. **reduce**  
D. **flat**

**Answer:** B. **map**.

**Explanation:** **map** invokes a callback for each present element and stores each callback result in a corresponding position in a new array.

### 2. Which method selects items based on a callback's truthy or falsy result?

A. **map**  
B. **filter**  
C. **flat**  
D. **forEach**

**Answer:** B. **filter**.

**Explanation:** A truthy predicate result keeps the original item. A falsy result excludes it.

### 3. What does **reduce** use to carry information between callback calls?

A. An accumulator  
B. An array index only  
C. A DOM event  
D. A new function scope

**Answer:** A. An accumulator.

**Explanation:** The callback returns the next accumulator value, which is passed to the next callback call.

### 4. Why is an initial value usually recommended with **reduce**?

A. It makes the method asynchronous  
B. It defines the starting accumulator and handles empty input  
C. It prevents the callback from running  
D. It changes **reduce** into **map**

**Answer:** B. It defines the starting accumulator and handles empty input.

**Explanation:** An empty array reduced without an initial value throws a **TypeError**.

### 5. What is the default flattening depth of **flat**?

A. Zero  
B. One  
C. Two  
D. Infinite

**Answer:** B. One.

**Explanation:** **flat()** flattens one level unless a different depth is supplied.

### 6. How many levels does **flatMap** flatten from its callback result?

A. None  
B. One  
C. All levels  
D. It depends on the callback name

**Answer:** B. One.

**Explanation:** **flatMap** is similar to **map** followed by **flat(1)**.

### 7. What happens to holes in a sparse array when **map** creates its result?

A. Every hole becomes an explicit **undefined** element  
B. Hole positions are preserved in the mapped array  
C. All holes move to the end  
D. **map** throws an error

**Answer:** B. Hole positions are preserved in the mapped array.

**Explanation:** **map** skips the callback for holes and preserves the missing positions in its result.

### 8. What happens to holes when **filter** creates its result?

A. The output retains the same holes  
B. The holes become **null**  
C. Holes are skipped and present matching items form a compact array  
D. Filtering a sparse array always throws

**Answer:** C. Holes are skipped and present matching items form a compact array.

**Explanation:** **filter** creates an output from elements whose predicate is truthy. It does not preserve hole positions.

### 9. What happens if **reduce** is called on an empty array without an initial value?

A. It returns **undefined**  
B. It returns zero  
C. It throws a **TypeError**  
D. It calls the callback once with no arguments

**Answer:** C. It throws a **TypeError**.

**Explanation:** There is no first array item to use as the initial accumulator.

### 10. Which method is clearest for converting each temperature into another value?

A. **map**  
B. **filter**  
C. **some**  
D. **forEach**

**Answer:** A. **map**.

**Explanation:** **map** expresses a one-to-one transformation and returns the transformed array.

### 11. What does **flat** do to the original array?

A. It mutates the original array  
B. It returns a flattened array and leaves the original outer array unchanged  
C. It deletes the original array  
D. It deep-clones every nested object

**Answer:** B. It returns a flattened array and leaves the original outer array unchanged.

**Explanation:** **flat** returns a new outer array. Nested objects are not deep-cloned.

### 12. Are objects inside a filtered result copied?

A. Yes, every object is cloned  
B. No, the result contains references to the original objects  
C. Only if the callback returns true  
D. Objects are converted to strings

**Answer:** B. The result contains references to the original objects.

**Explanation:** **filter** creates a new outer array, but retains the selected values themselves.

### 13. What does **flatMap** produce if a callback returns an empty array for an input?

A. One **undefined** result  
B. No output values for that input  
C. A nested empty array  
D. A **TypeError**

**Answer:** B. No output values for that input.

**Explanation:** The empty array is flattened by one level, so it contributes no element to the final output.

### 14. Which statement about **reduce** is correct?

A. It can only return a number  
B. Its accumulator can be any value  
C. It always mutates the input array  
D. It always returns an array

**Answer:** B. Its accumulator can be any value.

**Explanation:** An accumulator can be a number, object, string, array, or another value, as long as the callback returns the next accumulator.

## True or false

### 15. **map** returns a new outer array and leaves the original array unchanged.

**Answer:** True.

**Explanation:** The callback can still mutate shared objects or external state, but **map** itself does not replace elements in the original array.

### 16. **filter** uses the callback's truthiness to decide whether to keep each present item.

**Answer:** True.

**Explanation:** A truthy result keeps the item. A falsy result excludes it.

### 17. A **map** callback that has no return statement produces **undefined** for each visited element.

**Answer:** True.

**Explanation:** A function without an explicit return returns **undefined**.

### 18. **reduce** without an initial value works on an empty array and returns **undefined**.

**Answer:** False.

**Explanation:** It throws a **TypeError** because no initial accumulator or first item exists.

### 19. **flatMap** recursively flattens all nested array depths.

**Answer:** False.

**Explanation:** It flattens one level from each mapped result.

### 20. **flat()** with no argument flattens every nesting depth.

**Answer:** False.

**Explanation:** The default flattening depth is one.

### 21. **map**, **filter**, and **reduce** invoke their callbacks for sparse-array holes.

**Answer:** False.

**Explanation:** These methods skip absent indexes.

### 22. A shallow transformation can return a new array whose elements still reference original objects.

**Answer:** True.

**Explanation:** A new outer array does not mean nested values were cloned.

### 23. **reduce** is always clearer than using **map** or **filter**.

**Answer:** False.

**Explanation:** Use **map** for one-to-one transformation and **filter** for selection. Reserve **reduce** for combining values into a result.

### 24. Chaining **filter** followed by **map** can make a pipeline's intent clear.

**Answer:** True.

**Explanation:** The chain can read as selection followed by transformation, provided it remains readable.

## Short-answer questions

### 25. When should you use **map**?

**Answer:** Use it when each present input element should produce a corresponding output value.

**Explanation:** It returns a new array and makes transformation intent explicit.

### 26. When should you use **filter**?

**Answer:** Use it when items should be kept or removed according to a predicate.

**Explanation:** The output is a compact array containing the original values that passed the condition.

### 27. When should you use **reduce**?

**Answer:** Use it when many values should be combined into one accumulated result.

**Explanation:** The result can be a total, summary object, grouped value, or other accumulator. A clear initial value usually makes behavior safer.

### 28. What happens if a **map** callback forgets to return its transformed value?

**Answer:** The corresponding output element is **undefined**.

**Explanation:** The callback's return value becomes the mapped result.

### 29. Explain the difference between **flat** and **flatMap**.

**Answer:** **flat** flattens an existing nested array to a chosen depth. **flatMap** first maps each item, then flattens one level.

**Explanation:** **flatMap** is useful when each input produces zero, one, or several output values.

### 30. Why is **reduce** usually given an initial value?

**Answer:** It makes the starting accumulator explicit and allows empty input to have a defined result.

**Explanation:** Without an initial value, the first present element becomes the accumulator, and an empty array throws.

### 31. What is the difference between holes and explicit **undefined** values for these callbacks?

**Answer:** A hole is absent and these callbacks skip it. An explicit **undefined** is a present value and its callback runs.

**Explanation:** The callback can receive **undefined** for an explicit element, while it is not invoked for a missing index.

### 32. Do **map** and **filter** deep-clone objects in their result arrays?

**Answer:** No.

**Explanation:** They create new outer arrays, but any object values are the same references as in the source array unless the callback creates copies.

### 33. What is the difference between mutating an accumulator and returning a new accumulator in **reduce**?

**Answer:** A mutating callback changes the same accumulator object and returns it. An immutable approach creates and returns a new accumulator value each step.

**Explanation:** Both can work. For small examples mutation can be direct, while returning a new object can make state changes more explicit but may create more objects.

### 34. How can you flatten several levels?

**Answer:** Pass a depth to **flat**, such as **array.flat(2)**, or use **Infinity** to flatten all nested array levels.

**Explanation:** **flatMap** always flattens only one level.

## Coding and output questions

### 35. What is printed?

~~~js
const values = [2, 4, 6];

const doubled = values.map(function (value) {
    return value * 2;
});

console.log(doubled);
console.log(values);
~~~

**Answer:**

~~~text
[ 4, 8, 12 ]
[ 2, 4, 6 ]
~~~

**Explanation:** **map** returns a transformed array and leaves the original array intact.

### 36. What is printed?

~~~js
const values = [3, 8, 11, 15];

console.log(values.filter(function (value) {
    return value > 10;
}));
~~~

**Answer:**

~~~text
[ 11, 15 ]
~~~

**Explanation:** The predicate is truthy for values greater than ten, so only those original values are retained.

### 37. What is printed?

~~~js
const values = [5, 8, 3];

const total = values.reduce(function (sum, value) {
    return sum + value;
}, 0);

console.log(total);
~~~

**Answer:**

~~~text
16
~~~

**Explanation:** The accumulator starts at zero, then each callback returns an updated total.

### 38. What is printed?

~~~js
const nested = [1, [2, 3], [4, [5]]];

console.log(nested.flat());
console.log(nested.flat(2));
~~~

**Answer:**

~~~text
[ 1, 2, 3, 4, [ 5 ] ]
[ 1, 2, 3, 4, 5 ]
~~~

**Explanation:** The first call flattens one level. The second flattens two levels.

### 39. What is printed?

~~~js
const values = ["red blue", "green"];

console.log(values.flatMap(function (value) {
    return value.split(" ");
}));
~~~

**Answer:**

~~~text
[ 'red', 'blue', 'green' ]
~~~

**Explanation:** Each callback returns an array of words. **flatMap** flattens those arrays by one level.

### 40. What does this print about the sparse mapped array?

~~~js
const values = [];
values.length = 3;
values[1] = 5;

const doubled = values.map(function (value) {
    return value * 2;
});

console.log(doubled.length);
console.log(0 in doubled);
console.log(1 in doubled);
console.log(2 in doubled);
~~~

**Answer:**

~~~text
3
false
true
false
~~~

**Explanation:** **map** skips the holes and preserves their positions in the output array.

### 41. What is printed?

~~~js
const values = [1, 2, 3];

const summary = values.reduce(function (result, value) {
    result.count += 1;
    result.total += value;
    return result;
}, { count: 0, total: 0 });

console.log(summary);
~~~

**Answer:**

~~~text
{ count: 3, total: 6 }
~~~

**Explanation:** The accumulator is an object. Each callback updates and returns it for the next item.

### 42. What happens?

~~~js
console.log([].reduce(function (total, value) {
    return total + value;
}));
~~~

**Answer:** It throws a **TypeError**.

**Explanation:** The array is empty and no initial accumulator was supplied.

### 43. Write a chain that keeps active users and returns their names.

~~~js
const users = [
    { name: "Asha", active: true },
    { name: "Mina", active: false },
    { name: "Dev", active: true }
];
~~~

**Answer:**

~~~js
const activeNames = users
    .filter(function (user) {
        return user.active;
    })
    .map(function (user) {
        return user.name;
    });

console.log(activeNames);
~~~

Output:

~~~text
[ 'Asha', 'Dev' ]
~~~

**Explanation:** **filter** selects active records. **map** then transforms each selected object into its name.

### 44. What does this print?

~~~js
const users = [{ name: "Asha" }];
const selected = users.filter(function () {
    return true;
});

selected[0].name = "Mina";

console.log(users[0].name);
~~~

**Answer:**

~~~text
Mina
~~~

**Explanation:** **filter** made a new outer array but did not clone the object inside it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [46 - Array iteration methods](046-array-iteration-methods.md) | [Open lesson](../lessons/047-transforming-arrays-map-filter-reduce-and-flat.md) | [Open example](../examples/047-transforming-arrays-map-filter-reduce-and-flat.md) | [48 - Searching and testing arrays](../lessons/048-searching-and-testing-arrays.md) |