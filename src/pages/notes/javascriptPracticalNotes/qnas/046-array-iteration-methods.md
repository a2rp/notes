# 46 - Array iteration methods - Q&A

Use these questions to review indexed loops, **for...of**, **forEach**, array iterators, sparse arrays, and asynchronous iteration. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which loop gives direct control over an array index?

A. **for...in**  
B. Indexed **for**  
C. **forEach** only  
D. **while...of**

**Answer:** B. Indexed **for**.

**Explanation:** An indexed loop explicitly controls the index and can read or update each position.

### 2. Which loop is usually clearest when only array values are needed?

A. **for...of**  
B. **for...in**  
C. **for...keys**  
D. **switch**

**Answer:** A. **for...of**.

**Explanation:** **for...of** iterates values directly and avoids manually managing an index.

### 3. What does **for...of** over an array provide on each iteration?

A. The property key as a string  
B. The current value  
C. The original array only  
D. A promise

**Answer:** B. The current value.

**Explanation:** Use **entries** when both the index and value are needed.

### 4. What does **array.entries()** provide?

A. Only array values  
B. Index and value pairs  
C. Only enumerable custom properties  
D. A copy of the array

**Answer:** B. Index and value pairs.

**Explanation:** Each pair can be destructured into an index and a value in a **for...of** loop.

### 5. What does **forEach** return?

A. The last callback result  
B. A new array  
C. **undefined**  
D. The original array

**Answer:** C. **undefined**.

**Explanation:** **forEach** performs an action for each present element and ignores callback return values.

### 6. How can a **forEach** loop be stopped early?

A. Use **break** inside its callback  
B. Return a value from its callback  
C. **forEach** has no early-break mechanism; use a loop that supports **break**  
D. Return **false**

**Answer:** C. Use a loop that supports **break**.

**Explanation:** A return exits only the current callback invocation, not the overall **forEach**.

### 7. What does **forEach** do with an array hole?

A. Calls the callback with **null**  
B. Skips the missing index  
C. Throws a **TypeError**  
D. Deletes the array

**Answer:** B. It skips the missing index.

**Explanation:** **forEach** invokes the callback for present elements, not holes.

### 8. What does **for...of** yield for an array hole?

A. It skips the position  
B. It yields **undefined** for that position  
C. It yields the string **"hole"**  
D. It throws an error

**Answer:** B. It yields **undefined**.

**Explanation:** The array iterator visits positions in its index range. A missing value at a position is yielded as **undefined**.

### 9. Why is **for...in** usually not recommended for processing array values?

A. It cannot read indexes  
B. It iterates enumerable keys and can include extra properties  
C. It always skips every array element  
D. It changes array length

**Answer:** B. It iterates enumerable keys and can include extra properties.

**Explanation:** Use **for...of** for values or an indexed loop for index control.

### 10. What arguments does a **forEach** callback commonly receive?

A. Index, array, value  
B. Value, index, array  
C. Array, value, index  
D. Value only, always

**Answer:** B. Value, index, array.

**Explanation:** The callback can declare only the parameters it needs.

### 11. What does the optional second argument to **forEach** provide for a regular callback?

A. The initial index  
B. A **thisArg** receiver  
C. The callback return value  
D. A new array

**Answer:** B. A **thisArg** receiver.

**Explanation:** Arrow callbacks ignore it because they use lexical **this**.

### 12. Does **forEach** wait for promises returned by an async callback?

A. Yes, it waits for each one in order  
B. Yes, but only for the first one  
C. No, it ignores the returned promises  
D. It converts them into a new array

**Answer:** C. No, it ignores the returned promises.

**Explanation:** Use **for...of** with **await** for sequential work or **Promise.all** when operations should run concurrently.

### 13. Which loop supports **break** and **continue**?

A. **for...of**  
B. **forEach** callback  
C. Both only inside an arrow callback  
D. Neither

**Answer:** A. **for...of**.

**Explanation:** **for...of** is a loop statement, so it supports normal loop control statements.

### 14. Which iterator method produces array indexes?

A. **values**  
B. **entries**  
C. **keys**  
D. **forEach**

**Answer:** C. **keys**.

**Explanation:** **keys** iterates the indexes, **values** iterates values, and **entries** iterates index-value pairs.

## True or false

### 15. A **for...of** loop can stop early with **break**.

**Answer:** True.

**Explanation:** It is a loop statement and supports **break** and **continue**.

### 16. Returning from a **forEach** callback stops the entire array iteration.

**Answer:** False.

**Explanation:** It exits only that callback invocation. The next present element is still processed.

### 17. **forEach** skips holes in a sparse array.

**Answer:** True.

**Explanation:** The callback runs for present elements only.

### 18. **for...of** over an array with a hole skips that position.

**Answer:** False.

**Explanation:** It yields **undefined** for a hole's position.

### 19. A **for...in** loop provides array values directly.

**Answer:** False.

**Explanation:** It provides enumerable property keys. Use a value loop or an indexed loop.

### 20. **forEach** awaits a promise when its callback is declared **async**.

**Answer:** False.

**Explanation:** **forEach** does not wait for callback promises.

### 21. An indexed loop can inspect a hole and an explicit **undefined** element with the **in** operator.

**Answer:** True.

**Explanation:** The loop visits each index in its range. **index in array** distinguishes whether that position exists.

### 22. **entries** is useful when a loop needs both the index and value.

**Answer:** True.

**Explanation:** It yields pairs that can be destructured.

### 23. Mutating array indexes during iteration can make behavior harder to follow.

**Answer:** True.

**Explanation:** Insertions, removals, or index changes can affect which later values are seen. Build a separate result or carefully design the mutation.

### 24. A **forEach** callback can use **break** to stop the enclosing function's loop.

**Answer:** False.

**Explanation:** **break** cannot cross a function boundary. Use a loop statement instead of **forEach** if early exit is needed.

## Short-answer questions

### 25. When is an indexed **for** loop a good choice?

**Answer:** When code needs direct index control, must update indexed positions, or needs loop control and explicit boundaries.

**Explanation:** The loop exposes the index and condition directly.

### 26. When is **for...of** a good choice?

**Answer:** When code needs array values and may need **break** or **continue**.

**Explanation:** It reads values directly without requiring manual index bookkeeping.

### 27. When is **forEach** a good choice?

**Answer:** When code wants to perform an action for every present element and does not need early exit or to await callback promises.

**Explanation:** Its return value is **undefined**, so it is not intended to produce a transformed array.

### 28. How can a loop get both an array index and its value?

**Answer:** Use an indexed **for** loop or use **for...of** with **array.entries()**.

**Explanation:** Entries can be destructured as **[index, value]**.

### 29. Why is **for...in** a poor default for array iteration?

**Answer:** It iterates enumerable property keys, including custom or inherited properties, rather than just array values.

**Explanation:** **for...of** and indexed loops have clearer array semantics.

### 30. What is the difference between a hole and an explicit **undefined** during **forEach**?

**Answer:** **forEach** skips a hole, but it invokes the callback for an explicit **undefined** element.

**Explanation:** The first slot is missing. The second slot exists and stores **undefined**.

### 31. Why does **return** inside **forEach** not break iteration?

**Answer:** The callback is a separate function. **return** exits that function call, not the caller's iteration.

**Explanation:** Use **break** in a **for** or **for...of** loop for early termination.

### 32. How do you await each asynchronous operation in sequence?

**Answer:** Use an **async** function with a **for...of** loop and **await** inside its body.

**Explanation:** Each iteration waits for its operation before advancing.

### 33. How can independent asynchronous operations be started and awaited together?

**Answer:** Create promises, for example with **map**, then pass them to **Promise.all**.

**Explanation:** **Promise.all** waits for all supplied promises. Use this when the operations do not depend on one another.

### 34. What does **forEach** pass as its third callback argument?

**Answer:** The original array on which **forEach** was called.

**Explanation:** Its first callback argument is the current value, and the second is the index.

## Coding and output questions

### 35. What is printed?

~~~js
const colors = ["teal", "amber"];

for (const color of colors) {
    console.log(color);
}
~~~

**Answer:**

~~~text
teal
amber
~~~

**Explanation:** **for...of** iterates the array's values.

### 36. What is printed?

~~~js
const colors = ["teal", "amber"];

for (const [index, color] of colors.entries()) {
    console.log(index + ": " + color);
}
~~~

**Answer:**

~~~text
0: teal
1: amber
~~~

**Explanation:** **entries** yields an index-value pair for each position.

### 37. What is printed?

~~~js
const values = [];
values.length = 3;
values[1] = "middle";

values.forEach(function (value, index) {
    console.log(index + ": " + value);
});
~~~

**Answer:**

~~~text
1: middle
~~~

**Explanation:** **forEach** skips the holes at indexes zero and two.

### 38. What is printed?

~~~js
const values = [];
values.length = 3;
values[1] = "middle";

for (const value of values) {
    console.log(value);
}
~~~

**Answer:**

~~~text
undefined
middle
undefined
~~~

**Explanation:** **for...of** yields a value for each position. The missing slots are read as **undefined**.

### 39. What is printed?

~~~js
const values = [1, 2, 3, 4];

values.forEach(function (value) {
    if (value === 3) {
        return;
    }

    console.log(value);
});
~~~

**Answer:**

~~~text
1
2
4
~~~

**Explanation:** The return skips the rest of the callback for value three, but iteration continues with value four.

### 40. What is printed?

~~~js
const values = [1, 2];
values.note = "extra";

for (const key in values) {
    console.log(key);
}
~~~

**Answer:**

~~~text
0
1
note
~~~

**Explanation:** **for...in** enumerates property keys. The custom **note** property is included, which is one reason it is usually not the right loop for array values.

### 41. What is printed?

~~~js
const printer = {
    prefix: "Value",
    print(value, index) {
        console.log(this.prefix + " " + index + ": " + value);
    }
};

["a", "b"].forEach(printer.print, printer);
~~~

**Answer:**

~~~text
Value 0: a
Value 1: b
~~~

**Explanation:** The second argument supplies **printer** as the regular callback's **this** receiver.

### 42. Which loop should be used to stop after the first value greater than ten?

**Answer:**

~~~js
const values = [3, 7, 12, 20];

for (const value of values) {
    if (value > 10) {
        console.log(value);
        break;
    }
}
~~~

Output:

~~~text
12
~~~

**Explanation:** A **for...of** loop supports **break**. **forEach** does not have an early-break mechanism.

### 43. Why is this not a reliable way to wait for all operations?

~~~js
items.forEach(async function (item) {
    await saveItem(item);
});

console.log("Finished");
~~~

**Answer:** **forEach** does not wait for the promises returned by its async callback, so **"Finished"** can be logged before the saves complete.

**Explanation:** Use **for...of** with **await** for sequential processing, or **await Promise.all(items.map(item => saveItem(item)))** for concurrent processing.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [45 - Arrays: create, read, and update](045-arrays-create-read-and-update.md) | [Open lesson](../lessons/046-array-iteration-methods.md) | [Open example](../examples/046-array-iteration-methods.md) | [47 - Transforming arrays: map, filter, reduce, and flat](../lessons/047-transforming-arrays-map-filter-reduce-and-flat.md) |