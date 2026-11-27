# 49 - Mutation, copying, and immutable array updates: Q&A

Use these questions to review what changes an array, what creates a new array, how references behave, and how to preserve earlier state. Each answer and explanation follows its question.

## Multiple-choice questions

### 1. What happens when one array variable is assigned to another?

A. Every array value is deeply copied.  
B. The second variable refers to the same array object.  
C. The array becomes immutable.  
D. Only primitive values are copied.

**Answer: B. The second variable refers to the same array object.**

**Explanation:** Assignment copies the reference. If either variable mutates the array, both variables observe the change.

### 2. Which statement about a **const** array is correct?

A. Its elements can never change.  
B. It can be mutated, but the variable cannot be reassigned.  
C. It is automatically deeply frozen.  
D. It can be reassigned but not mutated.

**Answer: B. It can be mutated, but the variable cannot be reassigned.**

**Explanation:** **const** protects the binding, not the contents of an array object.

### 3. Which method adds items to the end and returns the new array length?

A. **pop**  
B. **push**  
C. **splice**  
D. **slice**

**Answer: B. push**

**Explanation:** **push** mutates the array by appending values and returns the new length as a number.

### 4. What does **splice** return?

A. The source array  
B. The new array length  
C. An array of removed items  
D. The first inserted item

**Answer: C. An array of removed items**

**Explanation:** **splice** edits the source array and returns a separate array containing the items it removed. If it removes nothing, it returns an empty array.

### 5. Which operation creates a new outer array without changing the source?

A. **reverse**  
B. **sort**  
C. **slice**  
D. **fill**

**Answer: C. slice**

**Explanation:** **slice** returns a shallow copy of the requested range. **reverse**, **sort**, and **fill** mutate the array they are called on.

### 6. What kind of copy do spread syntax, **slice**, and **Array.from** make for a normal array?

A. A deep copy of all nested data  
B. A shallow copy of the outer array  
C. A reference to the original array  
D. A frozen copy

**Answer: B. A shallow copy of the outer array**

**Explanation:** The new array has a different identity, but object and nested array values still refer to the same nested data.

### 7. Which method can replace one item and return a changed copy?

A. **splice**  
B. **with**  
C. **fill**  
D. **copyWithin**

**Answer: B. with**

**Explanation:** **with(index, value)** returns a new array with the requested index replaced. It does not mutate the original array.

### 8. Which method inserts or removes items while leaving the original array unchanged?

A. **splice**  
B. **toSpliced**  
C. **push**  
D. **shift**

**Answer: B. toSpliced**

**Explanation:** **toSpliced** has a similar argument pattern to **splice**, but it returns a changed copy and preserves the source.

### 9. Which method reverses a copy instead of mutating the source array?

A. **reverse**  
B. **toReversed**  
C. **copyWithin**  
D. **shift**

**Answer: B. toReversed**

**Explanation:** **toReversed** returns a new array in reverse order. **reverse** changes the original array.

### 10. What does **push** return?

A. The pushed item  
B. The updated array  
C. The array's new length  
D. The old length

**Answer: C. The array's new length**

**Explanation:** The array itself is mutated, but the return value is a number. Use the array variable to read the updated contents.

### 11. What does **pop** return on an empty array?

A. **null**  
B. **-1**  
C. **undefined**  
D. An empty array

**Answer: C. undefined**

**Explanation:** **pop** removes and returns the last value. If there is no value, it returns **undefined**.

### 12. Which methods mutate and return the same array object?

A. **slice** and **filter**  
B. **map** and **toReversed**  
C. **reverse** and **fill**  
D. **toSorted** and **with**

**Answer: C. reverse and fill**

**Explanation:** **reverse** and **fill** mutate the source and return that same array. Several other methods, such as **sort** and **copyWithin**, also mutate and return the array.

### 13. What does **with(-1, value)** replace?

A. Index -1 as an object property  
B. The first item  
C. The final array item  
D. No item, because negative indexes are never accepted

**Answer: C. The final array item**

**Explanation:** **with** accepts a negative index counted from the end. An index outside the valid range throws a **RangeError**.

### 14. If you need to keep an earlier array version available, what is usually the right approach?

A. Assign it to a second variable and mutate either one.  
B. Create a new array with a copy-based update.  
C. Use **const** and then mutate it.  
D. Use **splice** on the original.

**Answer: B. Create a new array with a copy-based update.**

**Explanation:** A copy-based update returns a distinct outer array, so the previous array can still be used. A shallow copy does not by itself isolate nested objects.

## True or false

### 15. **const list = otherList** creates an independent copy of the array.

**Answer: False.**

**Explanation:** The assignment copies the reference. Both variables point to one array.

### 16. Mutating a shared array through one variable can be observed through another variable.

**Answer: True.**

**Explanation:** Both variables refer to the same object. The object's updated state is visible through either reference.

### 17. **const** prevents calling **push** on an array.

**Answer: False.**

**Explanation:** **const** prevents rebinding the variable. It does not prevent calling a mutating method on the array object.

### 18. **slice()** with no arguments changes the source array.

**Answer: False.**

**Explanation:** It returns a shallow copy of the full array and leaves the source unchanged.

### 19. Changing an object inside a shallow copy can also change what is observed through the original array.

**Answer: True.**

**Explanation:** The outer arrays differ, but both arrays contain a reference to the same nested object.

### 20. **filter** creates a new outer array.

**Answer: True.**

**Explanation:** It returns a new array containing the values that pass its predicate. It does not deep-copy object values.

### 21. **splice** returns the updated source array.

**Answer: False.**

**Explanation:** It returns an array of removed values. The source array is mutated separately.

### 22. **toSpliced** changes the original array.

**Answer: False.**

**Explanation:** **toSpliced** returns a new array with the requested insertion or removal. The source remains unchanged.

### 23. A shallow copy is enough to make nested objects independent.

**Answer: False.**

**Explanation:** Only the outer array is copied. Nested object and array references remain shared.

### 24. Repeating **fill({ done: false })** creates a different object for every position.

**Answer: False.**

**Explanation:** The object expression is evaluated once, then the same object reference is written into every position.

### 25. It is always wrong to mutate an array.

**Answer: False.**

**Explanation:** Mutation can be clear and safe when the array is local and exclusively owned. Copy-based updates are useful when prior state or shared references must remain unchanged.

## Predict the result

### 26. What does this print?

~~~js
const original = ["red", "blue"];
const alias = original;

alias.push("gold");

console.log(original);
console.log(original === alias);
~~~

**Answer:**

~~~text
[ 'red', 'blue', 'gold' ]
true
~~~

**Explanation:** **alias** and **original** refer to the same array. The call to **push** mutates that shared object.

### 27. What does this print?

~~~js
const values = [4, 7];

const newLength = values.push(9);

console.log(newLength);
console.log(values);
~~~

**Answer:**

~~~text
3
[ 4, 7, 9 ]
~~~

**Explanation:** **push** mutates **values** and returns its new length, 3.

### 28. What does this print?

~~~js
const values = [4, 7];

const removed = values.pop();

console.log(removed);
console.log(values);
~~~

**Answer:**

~~~text
7
[ 4 ]
~~~

**Explanation:** **pop** removes and returns the final item.

### 29. What does this print?

~~~js
const colors = ["teal", "gold", "coral"];
const removed = colors.splice(1, 1, "silver");

console.log(removed);
console.log(colors);
~~~

**Answer:**

~~~text
[ 'gold' ]
[ 'teal', 'silver', 'coral' ]
~~~

**Explanation:** **splice** removes one value at index 1, inserts **silver** at that position, and returns the removed value in an array.

### 30. What does this print?

~~~js
const letters = ["a", "b", "c", "d"];

console.log(letters.slice(1, 3));
console.log(letters);
~~~

**Answer:**

~~~text
[ 'b', 'c' ]
[ 'a', 'b', 'c', 'd' ]
~~~

**Explanation:** The start index is included and the end index is excluded. **slice** does not change the source.

### 31. What does this print?

~~~js
const original = [2, 4, 6];
const copy = [...original];

copy[0] = 10;

console.log(original);
console.log(copy);
console.log(original === copy);
~~~

**Answer:**

~~~text
[ 2, 4, 6 ]
[ 10, 4, 6 ]
false
~~~

**Explanation:** Spread syntax creates a different outer array. Replacing a primitive at an index in the copy does not change that index in the original.

### 32. What does this print?

~~~js
const original = [{ name: "Asha" }];
const copy = original.slice();

copy[0].name = "Mina";

console.log(original[0].name);
console.log(original === copy);
console.log(original[0] === copy[0]);
~~~

**Answer:**

~~~text
Mina
false
true
~~~

**Explanation:** The arrays are different, but their first entries reference the same object. Updating its **name** is visible through both arrays.

### 33. What does this print?

~~~js
const values = [10, 20, 30];

const updated = values.with(1, 25);

console.log(values);
console.log(updated);
~~~

**Answer:**

~~~text
[ 10, 20, 30 ]
[ 10, 25, 30 ]
~~~

**Explanation:** **with** returns a copy with index 1 replaced and preserves the original array.

### 34. What does this print?

~~~js
const values = ["first", "middle", "last"];

console.log(values.with(-1, "final"));
~~~

**Answer:**

~~~text
[ 'first', 'middle', 'final' ]
~~~

**Explanation:** A negative index counts from the end. **-1** identifies the final position.

### 35. What does this print?

~~~js
const values = ["plan", "write", "publish"];

const updated = values.toSpliced(1, 1, "review");

console.log(values);
console.log(updated);
~~~

**Answer:**

~~~text
[ 'plan', 'write', 'publish' ]
[ 'plan', 'review', 'publish' ]
~~~

**Explanation:** **toSpliced** returns the edited copy and leaves the source array unchanged.

### 36. What does this print?

~~~js
const values = ["a", "b", "c"];

const reversed = values.toReversed();

console.log(values);
console.log(reversed);
console.log(values === reversed);
~~~

**Answer:**

~~~text
[ 'a', 'b', 'c' ]
[ 'c', 'b', 'a' ]
false
~~~

**Explanation:** **toReversed** creates a different array in reverse order. The source is preserved.

### 37. What does this print?

~~~js
const values = [3, 1, 2];
const returned = values.reverse();

console.log(values);
console.log(returned === values);
~~~

**Answer:**

~~~text
[ 2, 1, 3 ]
true
~~~

**Explanation:** **reverse** changes the original array and returns the same array object.

### 38. What does this print?

~~~js
const values = [1, 2, 3];

const returned = values.fill(0, 1);

console.log(values);
console.log(returned === values);
~~~

**Answer:**

~~~text
[ 1, 0, 0 ]
true
~~~

**Explanation:** **fill** writes the value starting at index 1 through the end. It mutates and returns the same array.

### 39. What does this print?

~~~js
const sharedItem = { done: false };
const tasks = Array(3).fill(sharedItem);

tasks[0].done = true;

console.log(tasks[1].done);
console.log(tasks[0] === tasks[2]);
~~~

**Answer:**

~~~text
true
true
~~~

**Explanation:** All three positions contain the same object reference. Mutating it through one position is visible through all of them.

### 40. What does this print?

~~~js
const tasks = ["plan", "write"];

const updated = [...tasks, "review"];

console.log(tasks);
console.log(updated);
~~~

**Answer:**

~~~text
[ 'plan', 'write' ]
[ 'plan', 'write', 'review' ]
~~~

**Explanation:** Spread copies the existing values into a new array, then the new value is appended to that new array.

## Short-answer questions

### 41. What is the difference between an alias and a copy?

**Answer:** An alias is another reference to the same array. A copy is a different outer array object.

**Explanation:** Mutations through an alias affect the shared object. Replacing an element in a shallow copy does not replace the corresponding element in the source, although nested objects can still be shared.

### 42. Name three common ways to make a shallow copy of a normal array.

**Answer:** **slice()**, spread syntax, and **Array.from(array)**.

**Explanation:** These create a new outer array. None of them recursively clone nested arrays or objects.

### 43. What does immutable update mean in this chapter?

**Answer:** It means creating a new array for an update instead of changing the existing array.

**Explanation:** This lets code retain the previous array value. The new array can still share nested references unless those are copied too.

### 44. When might mutation be a reasonable choice?

**Answer:** When the array is local, exclusively owned, and no earlier version needs to be preserved.

**Explanation:** Mutation is not automatically unsafe. It is surprising when shared code holds another reference or expects the previous state to remain available.

### 45. How can you replace an item without changing the original array?

**Answer:** Use **map**, **with**, or another copy-based update.

**Explanation:** **map** can return the old values except at the selected index. **with** performs an indexed replacement and returns a new array in supported runtimes.

### 46. How can you remove an item without changing the original array?

**Answer:** Use **filter**, **toSpliced**, or combine **slice** and spread syntax.

**Explanation:** **filter** is useful when selection is based on a condition. **toSpliced** is useful when the removal index and count are known.

### 47. What is the difference between **splice** and **toSpliced**?

**Answer:** **splice** mutates its source and returns removed items. **toSpliced** preserves its source and returns the edited copy.

**Explanation:** Choose based on whether the original array must remain unchanged.

### 48. What is the difference between **reverse** and **toReversed**?

**Answer:** **reverse** mutates and returns the original array. **toReversed** returns a reversed copy.

**Explanation:** Both produce reversed order, but only one preserves the source.

### 49. Why can changing a nested object through a copied array affect the original data?

**Answer:** The shallow copy still contains the same nested object reference.

**Explanation:** Copying the outer array does not clone each value inside it. Both arrays can point to the same object.

### 50. What should you consider before using a change-by-copy method?

**Answer:** Check that the target runtime supports the method.

**Explanation:** **toReversed**, **toSorted**, **toSpliced**, and **with** are modern methods. Older runtimes may require a spread, slice, or map based alternative.

## Practical and coding questions

### 51. Remove the item with id 2 without changing the original array.

**Answer:**

~~~js
const items = [
    { id: 1, name: "Pen" },
    { id: 2, name: "Folder" },
    { id: 3, name: "Tape" }
];

const remainingItems = items.filter(function (item) {
    return item.id !== 2;
});

console.log(items.length);
console.log(remainingItems.map(function (item) {
    return item.name;
}));
~~~

Output:

~~~text
3
[ 'Pen', 'Tape' ]
~~~

**Explanation:** **filter** creates a new outer array with the items whose ids are not 2. The source still contains all three items.

### 52. Replace the item at index 1 while preserving all other values.

**Answer:**

~~~js
const names = ["Asha", "Mina", "Dev"];

const updatedNames = names.map(function (name, index) {
    return index === 1 ? "Ravi" : name;
});

console.log(names);
console.log(updatedNames);
~~~

Output:

~~~text
[ 'Asha', 'Mina', 'Dev' ]
[ 'Asha', 'Ravi', 'Dev' ]
~~~

**Explanation:** **map** constructs a new array. Only the value at the selected index changes in the result.

### 53. Insert **review** before **publish** without changing the source.

**Answer:**

~~~js
const steps = ["plan", "write", "publish"];
const publishIndex = steps.indexOf("publish");

const updatedSteps = [
    ...steps.slice(0, publishIndex),
    "review",
    ...steps.slice(publishIndex)
];

console.log(steps);
console.log(updatedSteps);
~~~

Output:

~~~text
[ 'plan', 'write', 'publish' ]
[ 'plan', 'write', 'review', 'publish' ]
~~~

**Explanation:** The copy is built from the values before and after the insertion point. If the position comes from an unsuccessful search, handle **-1** before using it.

### 54. Create a new array with **toSpliced** and remove two values.

**Answer:**

~~~js
const steps = ["plan", "write", "review", "publish"];

const updatedSteps = steps.toSpliced(1, 2);

console.log(steps);
console.log(updatedSteps);
~~~

Output:

~~~text
[ 'plan', 'write', 'review', 'publish' ]
[ 'plan', 'publish' ]
~~~

**Explanation:** The first argument is the start position and the second is the number of items to remove. The original array stays intact.

### 55. Build a new array by pushing into a local accumulator.

**Answer:**

~~~js
const values = [2, 4, 6];
const doubled = [];

for (const value of values) {
    doubled.push(value * 2);
}

console.log(values);
console.log(doubled);
~~~

Output:

~~~text
[ 2, 4, 6 ]
[ 4, 8, 12 ]
~~~

**Explanation:** The code mutates **doubled**, a new local array that is being constructed. It does not mutate **values**.

### 56. Make a shallow copy and then make one nested object independent.

**Answer:**

~~~js
const users = [
    { id: 1, profile: { name: "Asha" } },
    { id: 2, profile: { name: "Mina" } }
];

const updatedUsers = users.map(function (user) {
    if (user.id !== 1) {
        return user;
    }

    return {
        ...user,
        profile: {
            ...user.profile,
            name: "Ravi"
        }
    };
});

console.log(users[0].profile.name);
console.log(updatedUsers[0].profile.name);
console.log(users[1] === updatedUsers[1]);
~~~

Output:

~~~text
Asha
Ravi
true
~~~

**Explanation:** The selected user's outer object and nested profile object are copied before changing the name. The unchanged second user is still shared between arrays.

## Review checklist

- Know whether a method mutates the array or returns a new one.
- Remember that assignment copies an array reference, not the array.
- Remember that **const** does not make the array contents immutable.
- Treat **slice**, spread, and **Array.from** copies as shallow.
- Use **map** for copy-based replacement and **filter** for copy-based removal by condition.
- Use **toReversed**, **toSorted**, **toSpliced**, or **with** when supported and appropriate.
- Check whether nested objects must be copied as part of an update.
- Choose mutation when ownership is clear and preserving old state is unnecessary.
- Choose a copy-based update when the old array must remain available.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [48 - Searching and testing arrays](048-searching-and-testing-arrays.md) | [Open lesson](../lessons/049-mutation-copying-and-immutable-array-updates.md) | [Open example](../examples/049-mutation-copying-and-immutable-array-updates.md) | [50 - Sorting, comparators, and locale-aware comparison](../lessons/050-sorting-comparators-and-locale-aware-comparison.md) |
