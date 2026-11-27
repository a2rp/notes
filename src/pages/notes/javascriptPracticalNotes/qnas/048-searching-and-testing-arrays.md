# 48 - Searching and testing arrays: Q&A

This Q&A reviews value searches, predicate searches, boolean tests, equality rules, search positions, empty arrays, sparse arrays, and common failure cases. Every answer follows its question so you can check your understanding as you go.

## Multiple-choice questions

### 1. Which method checks whether an array contains an exact value and returns a boolean?

A. **find**  
B. **includes**  
C. **indexOf**  
D. **filter**

**Answer: B. includes**

**Explanation:** **includes** directly answers a membership question with **true** or **false**. **indexOf** returns an index or **-1**, while **find** returns an item or **undefined**.

### 2. Which method returns the index of the first exact match?

A. **indexOf**  
B. **includes**  
C. **some**  
D. **find**

**Answer: A. indexOf**

**Explanation:** **indexOf** returns the first matching index. It returns **-1** if it cannot find a match.

### 3. Which method finds the first item that passes a condition?

A. **includes**  
B. **lastIndexOf**  
C. **find**  
D. **every**

**Answer: C. find**

**Explanation:** **find** calls a predicate and returns the first item whose callback result is truthy.

### 4. Which method should be used to find the index of the first item that passes a condition?

A. **findIndex**  
B. **indexOf**  
C. **some**  
D. **includes**

**Answer: A. findIndex**

**Explanation:** **findIndex** searches with a predicate and returns the matching position, or **-1** if there is no match.

### 5. Which method answers whether at least one item passes a condition?

A. **every**  
B. **some**  
C. **findLast**  
D. **lastIndexOf**

**Answer: B. some**

**Explanation:** **some** returns **true** after the first truthy predicate result. If no item passes, it returns **false**.

### 6. Which method checks whether all items pass a condition?

A. **some**  
B. **find**  
C. **every**  
D. **includes**

**Answer: C. every**

**Explanation:** **every** returns **false** as soon as the predicate returns a falsy value. It returns **true** if no item fails.

### 7. What does **includes** return when it searches for **NaN** in an array containing **NaN**?

A. **false**  
B. **-1**  
C. **true**  
D. **undefined**

**Answer: C. true**

**Explanation:** **includes** uses **SameValueZero** equality, which treats **NaN** as equal to **NaN**.

### 8. Why does **indexOf(NaN)** return **-1**, even when the array contains **NaN**?

A. **indexOf** only searches strings.  
B. **indexOf** uses strict equality, and **NaN** is not equal to itself.  
C. **indexOf** searches backward.  
D. **indexOf** skips all numbers.

**Answer: B. indexOf uses strict equality, and NaN is not equal to itself.**

**Explanation:** With strict equality, **NaN === NaN** is false. Use **includes** to test for a **NaN** value.

### 9. What does **find** return when its predicate never matches?

A. **false**  
B. **-1**  
C. **null**  
D. **undefined**

**Answer: D. undefined**

**Explanation:** **find** returns **undefined** when it reaches the end without a match. Use **findIndex** when you need a distinct no-match marker of **-1**.

### 10. What does **every** return for an empty array?

A. **false**  
B. **true**  
C. **undefined**  
D. It throws an error.

**Answer: B. true**

**Explanation:** There is no element that fails the predicate, so **every** returns **true**. This is often called vacuous truth.

### 11. What does **some** return for an empty array?

A. **true**  
B. **false**  
C. **undefined**  
D. It throws an error.

**Answer: B. false**

**Explanation:** There is no item that can satisfy the predicate, so **some** returns **false**.

### 12. Which method returns the last item that matches a predicate?

A. **find**  
B. **findLast**  
C. **findIndex**  
D. **lastIndexOf**

**Answer: B. findLast**

**Explanation:** **findLast** searches from the end toward the beginning and returns the last matching item in normal array order.

### 13. What is the result of searching an array with **includes(value, -2)**?

A. The array is searched backward from index 2.  
B. The search begins two positions from the end and continues forward.  
C. Only the final two values are searched in reverse order.  
D. The method always returns false.

**Answer: B. The search begins two positions from the end and continues forward.**

**Explanation:** A negative **fromIndex** is calculated from the array length. It chooses the starting position but does not reverse the search direction.

### 14. How does **includes** treat an array hole during membership search?

A. It always throws.  
B. It treats the hole as if its value were **undefined**.  
C. It skips the index exactly like **indexOf**.  
D. It converts the hole to **null**.

**Answer: B. It treats the hole as if its value were undefined.**

**Explanation:** Reading a hole by index produces **undefined**, and **includes** can therefore match it with **includes(undefined)**.

## True or false

### 15. **includes** returns the position of a matching value.

**Answer: False.**

**Explanation:** **includes** returns a boolean. Use **indexOf** or **lastIndexOf** when you need the position of an exact value.

### 16. **find** returns the first matching index.

**Answer: False.**

**Explanation:** **find** returns the matching item. **findIndex** returns its position.

### 17. **findIndex** returns **0** when the first item matches.

**Answer: True.**

**Explanation:** Array indexes start at zero, so the first position is index 0.

### 18. It is safe to use a **findIndex** result directly as an array index without checking it.

**Answer: False.**

**Explanation:** When no item matches, **findIndex** returns **-1**. **array[-1]** does not mean the last array element, so check for **-1** before reading.

### 19. **some** and **every** always run their callback for every array item.

**Answer: False.**

**Explanation:** Both methods short-circuit. **some** stops after a truthy result, and **every** stops after a falsy result.

### 20. Objects with equal property values are considered the same value by **includes**.

**Answer: False.**

**Explanation:** Objects are compared by identity. Two separately created objects are different references even if their properties look alike.

### 21. **find** visits an array hole and passes **undefined** to its callback for that index.

**Answer: True.**

**Explanation:** The **find** family checks every index in its search range. If an index is a hole, the callback receives **undefined** for that position.

### 22. **some** calls its callback for an array hole.

**Answer: False.**

**Explanation:** **some** skips indexes that are holes. It runs the callback for indexes that exist.

### 23. **findLast** searches from the first index to the last.

**Answer: False.**

**Explanation:** It searches backward from the final index. The first match it encounters is the last matching value in normal order.

### 24. A negative **fromIndex** reverses **indexOf** search direction.

**Answer: False.**

**Explanation:** A negative starting index is calculated relative to the array length. **indexOf** still searches forward.

## Predict the result

### 25. What does this print?

~~~js
const values = [5, 10, 15];

console.log(values.includes(10));
console.log(values.includes(20));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The first value is present. The second is not.

### 26. What does this print?

~~~js
const values = ["a", "b", "a", "c"];

console.log(values.indexOf("a"));
console.log(values.indexOf("a", 1));
console.log(values.lastIndexOf("a"));
~~~

**Answer:**

~~~text
0
2
2
~~~

**Explanation:** **indexOf** finds the first match at or after its starting position. **lastIndexOf** searches backward from the end.

### 27. What does this print?

~~~js
const values = [NaN];

console.log(values.includes(NaN));
console.log(values.indexOf(NaN));
~~~

**Answer:**

~~~text
true
-1
~~~

**Explanation:** **includes** uses **SameValueZero**, which matches **NaN**. **indexOf** uses strict equality, where **NaN** does not equal itself.

### 28. What does this print?

~~~js
const values = [4, 8, 12];

const match = values.find(function (value) {
    return value > 8;
});

const index = values.findIndex(function (value) {
    return value > 8;
});

console.log(match);
console.log(index);
~~~

**Answer:**

~~~text
12
2
~~~

**Explanation:** **find** returns the matching item. **findIndex** returns its zero-based position.

### 29. What does this print?

~~~js
const values = [2, 5, 8];

console.log(values.some(function (value) {
    return value > 6;
}));

console.log(values.every(function (value) {
    return value > 6;
}));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** At least one value is greater than 6, so **some** is true. Not every value is greater than 6, so **every** is false.

### 30. What does this print?

~~~js
const values = [5, 20, 11, 30];

console.log(values.findLast(function (value) {
    return value > 10;
}));

console.log(values.findLastIndex(function (value) {
    return value > 10;
}));
~~~

**Answer:**

~~~text
30
3
~~~

**Explanation:** The search begins at the end. The last matching item in array order is 30, at index 3.

### 31. What does this print?

~~~js
const values = ["red", "green", "blue", "gold"];

console.log(values.includes("blue", -2));
console.log(values.includes("green", -2));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The length is 4, so **-2** starts at index 2. The search continues forward from there.

### 32. What does this print?

~~~js
const values = [3, 5, 7];

const index = values.findIndex(function (value) {
    return value > 10;
});

console.log(index);
console.log(values[index]);
~~~

**Answer:**

~~~text
-1
undefined
~~~

**Explanation:** No value matches, so the index is **-1**. Reading **values[-1]** does not access the final array item. Always check the result before using it.

### 33. What does this print?

~~~js
const values = Array(2);

console.log(values.includes(undefined));
console.log(values.indexOf(undefined));
~~~

**Answer:**

~~~text
true
-1
~~~

**Explanation:** The two positions are holes. **includes** reads the missing positions as **undefined**; **indexOf** skips holes.

### 34. What does this print?

~~~js
const values = Array(2);

const foundIndex = values.findIndex(function (value, index) {
    return index === 1 && value === undefined;
});

console.log(foundIndex);
~~~

**Answer:**

~~~text
1
~~~

**Explanation:** **findIndex** visits the hole at index 1 and passes **undefined** to the callback. The predicate matches that position.

### 35. What does this print?

~~~js
console.log([].some(function () {
    return true;
}));

console.log([].every(function () {
    return false;
}));
~~~

**Answer:**

~~~text
false
true
~~~

**Explanation:** **some** cannot find a matching item in an empty array. **every** finds no counterexample that would make the result false.

## Short-answer questions

### 36. When should you choose **includes** instead of **indexOf**?

**Answer:** Choose **includes** when you only need to know whether a value exists.

**Explanation:** It directly returns a boolean and correctly matches **NaN**. Choose **indexOf** when you need the first matching index.

### 37. What does a **find** callback receive?

**Answer:** It receives the current value, index, and source array, in that order.

**Explanation:** A callback can declare only the arguments it needs. The method stops after the first match.

### 38. How can you tell whether **find** matched an actual **undefined** value or found no match?

**Answer:** Use **findIndex** and check whether its result is **-1**.

**Explanation:** **find** returns **undefined** both when no value matches and when the matching value itself is **undefined**. **findIndex** distinguishes those cases.

### 39. How do **some** and **every** short-circuit?

**Answer:** **some** stops at the first truthy predicate result. **every** stops at the first falsy predicate result.

**Explanation:** Once the outcome is known, further callback calls cannot change it. Do not use these methods for side effects that must happen for every item.

### 40. How does a negative **fromIndex** work?

**Answer:** It is counted from the end of the array to choose a starting position.

**Explanation:** For **includes** and **indexOf**, the search still proceeds forward from the resulting position. A negative start before index 0 is treated as the beginning.

### 41. What equality rule does **includes** use?

**Answer:** **SameValueZero**.

**Explanation:** It behaves like strict equality for most values, but it considers **NaN** equal to **NaN**. Positive and negative zero also compare as equal.

### 42. What equality rule do **indexOf** and **lastIndexOf** use?

**Answer:** Strict equality.

**Explanation:** As a result, **NaN** is not found by either method. For ordinary primitive values, they find the same exact value.

### 43. How do value searches match objects?

**Answer:** They compare object references by identity.

**Explanation:** Two distinct objects with the same properties are not equal. To search objects by a property, pass a predicate to **find**, **findIndex**, **some**, or **every**.

### 44. What does **findLast** return if no item matches?

**Answer:** **undefined**.

**Explanation:** **findLast** returns the matching item, not its index. **findLastIndex** returns **-1** when there is no matching item.

## Practical and coding questions

### 45. Write a check that determines whether an array of roles contains **editor**.

**Answer:**

~~~js
const roles = ["viewer", "editor", "author"];

const canEdit = roles.includes("editor");

console.log(canEdit);
~~~

Output:

~~~text
true
~~~

**Explanation:** **includes** is the direct method for checking whether an exact value is present.

### 46. Find the first product whose stock is greater than zero and print its name.

**Answer:**

~~~js
const products = [
    { name: "Notebook", stock: 0 },
    { name: "Marker", stock: 4 },
    { name: "Folder", stock: 7 }
];

const availableProduct = products.find(function (product) {
    return product.stock > 0;
});

if (availableProduct !== undefined) {
    console.log(availableProduct.name);
}
~~~

Output:

~~~text
Marker
~~~

**Explanation:** **find** returns the first product whose stock passes the predicate. Checking the result handles the no-match case.

### 47. Find the index of the first overdue task and safely print its label.

**Answer:**

~~~js
const tasks = [
    { label: "Prepare slides", overdue: false },
    { label: "Review draft", overdue: true }
];

const overdueIndex = tasks.findIndex(function (task) {
    return task.overdue;
});

if (overdueIndex !== -1) {
    console.log(tasks[overdueIndex].label);
} else {
    console.log("No overdue task");
}
~~~

Output:

~~~text
Review draft
~~~

**Explanation:** **findIndex** returns **-1** if no task is overdue. The conditional prevents using that sentinel as an array position.

### 48. Determine whether any number is negative and whether all numbers are finite.

**Answer:**

~~~js
const values = [12, 0, -3];

const hasNegative = values.some(function (value) {
    return value < 0;
});

const allFinite = values.every(function (value) {
    return Number.isFinite(value);
});

console.log(hasNegative);
console.log(allFinite);
~~~

Output:

~~~text
true
true
~~~

**Explanation:** **some** tests whether at least one number is negative. **every** checks that each value passes the finite-number test.

### 49. Find the last matching message by its status.

**Answer:**

~~~js
const messages = [
    { id: 1, status: "draft" },
    { id: 2, status: "sent" },
    { id: 3, status: "sent" }
];

const lastSentMessage = messages.findLast(function (message) {
    return message.status === "sent";
});

console.log(lastSentMessage.id);
~~~

Output:

~~~text
3
~~~

**Explanation:** **findLast** searches backward, so it returns the final message with the requested status. Use **findLastIndex** when the position is needed.

### 50. Explain why this code does not find the object.

~~~js
const users = [{ id: 3 }];

console.log(users.includes({ id: 3 }));
~~~

**Answer:** It prints **false**.

~~~text
false
~~~

**Explanation:** The object inside the array and the object passed to **includes** are separate references. To match by identifier, use a predicate:

~~~js
const userIndex = users.findIndex(function (user) {
    return user.id === 3;
});

console.log(userIndex);
~~~

Output:

~~~text
0
~~~

### 51. Which method should find all products below a price limit?

**Answer:** **filter**.

**Explanation:** **find** returns only the first matching item. **filter** returns a new array containing every item whose predicate passes.

~~~js
const prices = [5, 18, 9, 30];

const affordablePrices = prices.filter(function (price) {
    return price < 10;
});

console.log(affordablePrices);
~~~

Output:

~~~text
[ 5, 9 ]
~~~

### 52. Which method should be used if every callback must run even after a condition is already met?

**Answer:** Use a loop or an iteration method that processes every item, such as **forEach**, rather than **some** or **every**.

**Explanation:** **some** and **every** short-circuit as soon as their answer is known. Their callbacks may not run for the remaining values.

## Review checklist

Before finishing this chapter, make sure you can explain these choices:

- Use **includes** for a boolean exact-value check.
- Use **indexOf** or **lastIndexOf** for an exact value's position.
- Use **find** or **findLast** to return one item based on a condition.
- Use **findIndex** or **findLastIndex** to return a predicate match position.
- Use **some** for an at-least-one test.
- Use **every** for an all-items test.
- Check **-1** before using an index returned by a search.
- Expect **includes** to find **NaN**, but **indexOf** not to find it.
- Remember that object equality is based on identity.
- Account for holes if working with sparse arrays.
- Do not put required side effects in callbacks that can short-circuit.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [47 - Transforming arrays: map, filter, reduce, and flat](047-transforming-arrays-map-filter-reduce-and-flat.md) | [Open lesson](../lessons/048-searching-and-testing-arrays.md) | [Open example](../examples/048-searching-and-testing-arrays.md) | [49 - Mutation, copying, and immutable array updates](../lessons/049-mutation-copying-and-immutable-array-updates.md) |
