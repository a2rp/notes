# 45 - Arrays: create, read, and update - Q&A

Review array creation, indexes, mutation, length, holes, copies, and nested values. Each answer follows its question.

## Multiple-choice questions

### 1. What index does the first array element use?

A. **-1**  
B. **0**  
C. **1**  
D. The array's length

**Answer:** B. **0**.

**Explanation:** JavaScript array indexes start at zero.

### 2. What is the usual last index of a non-empty array?

A. **array.length**  
B. **array.length + 1**  
C. **array.length - 1**  
D. **array.length / 2**

**Answer:** C. **array.length - 1**.

**Explanation:** An array with length three normally uses indexes zero, one, and two.

### 3. What does reading a missing array index usually produce?

A. **null**  
B. **false**  
C. **undefined**  
D. An empty array

**Answer:** C. **undefined**.

**Explanation:** An out-of-range index or hole reads as **undefined**, though a hole and an explicit **undefined** element are different.

### 4. What does **new Array(3)** create?

A. An array containing the number three  
B. An array with length three and empty slots  
C. An array containing three zeros  
D. A syntax error

**Answer:** B. An array with length three and empty slots.

**Explanation:** A single numeric argument to the **Array** constructor specifies length. Use **[3]** or **Array.of(3)** to make an array containing the number three.

### 5. Which method checks whether a value is an array?

A. **value.isArray()**  
B. **typeof value === "array"**  
C. **Array.isArray(value)**  
D. **value instanceof List**

**Answer:** C. **Array.isArray(value)**.

**Explanation:** **typeof []** returns **"object"**, so **Array.isArray** is the direct array check.

### 6. What does **push** return?

A. The inserted item  
B. The removed item  
C. The new array length  
D. A copied array

**Answer:** C. The new array length.

**Explanation:** **push** adds items at the end, mutates the array, and returns its updated length.

### 7. What does **pop** return?

A. The new array  
B. The removed last item  
C. The new array length  
D. The first item

**Answer:** B. The removed last item.

**Explanation:** **pop** removes the last item and returns it. On an empty array it returns **undefined**.

### 8. Which method removes an item and shifts later indexes to close the gap?

A. **delete**  
B. **splice**  
C. **push**  
D. **fill**

**Answer:** B. **splice**.

**Explanation:** **splice** changes the array and shifts elements after the removed range.

### 9. What does deleting an array index with **delete** do?

A. Shifts all later items left  
B. Reduces the array length  
C. Removes the property but leaves a hole  
D. Replaces the item with **null**

**Answer:** C. Removes the property but leaves a hole.

**Explanation:** **delete** does not compact the array or update its length. Use **splice** when later items should shift.

### 10. What does assigning one array to another variable copy?

A. A deep copy of all values  
B. A shallow copy of the outer array  
C. The same array reference  
D. Only the array length

**Answer:** C. The same array reference.

**Explanation:** Arrays are objects. Assignment copies the reference, so both variables refer to the same array.

### 11. What kind of copy does spread syntax create for an array?

A. A deep copy of all nested objects  
B. A shallow copy of the outer array  
C. A reference to the same array  
D. A sorted copy

**Answer:** B. A shallow copy of the outer array.

**Explanation:** The new outer array has a different identity, but nested objects and arrays remain shared references.

### 12. What happens when an index beyond an array's end is assigned?

A. The assignment is always ignored  
B. The array's length grows, with holes between old end and new index if needed  
C. The array becomes an object instead  
D. The array's length becomes the index itself

**Answer:** B. The array's length grows, with holes between old end and new index if needed.

**Explanation:** Assigning to index three makes the array length at least four. Any skipped indexes are empty slots.

### 13. How do you make separate empty arrays for each row?

A. **Array(3).fill([])**  
B. **Array.from({ length: 3 }, () => [])**  
C. **const row = []; Array(3).fill(row)**  
D. **[[], []].fill([])**

**Answer:** B. **Array.from({ length: 3 }, () => [])**.

**Explanation:** The mapping callback creates a new array for each position. **fill([])** reuses the same inner array reference.

### 14. What does **splice(start, deleteCount, item)** do?

A. Makes a shallow copy only  
B. Removes up to **deleteCount** items at **start**, inserts **item** there, and returns removed items  
C. Adds **item** to the end  
D. Deletes the array variable

**Answer:** B. It removes and inserts at the specified position, returning removed items.

**Explanation:** **splice** mutates the original array.

## True or false

### 15. An array's first index is one.

**Answer:** False.

**Explanation:** The first index is zero.

### 16. **const values = []** prevents adding or changing array elements.

**Answer:** False.

**Explanation:** **const** prevents reassigning the binding. The referenced array remains mutable.

### 17. Reading a hole and reading an explicit **undefined** element both produce **undefined**.

**Answer:** True.

**Explanation:** Indexed access produces the same value, but the slot-presence check can distinguish them.

### 18. A hole and an explicit **undefined** element are identical in every way.

**Answer:** False.

**Explanation:** For example, **0 in array** is false for a hole and true for an explicit element.

### 19. Reducing an array's length can remove elements.

**Answer:** True.

**Explanation:** Setting a smaller **length** truncates indexes beyond the new length.

### 20. Increasing an array's length fills each new position with an explicit **undefined** value.

**Answer:** False.

**Explanation:** Increasing **length** creates empty slots, which read as **undefined** but are not present properties.

### 21. **shift** removes and returns the first item.

**Answer:** True.

**Explanation:** The remaining items shift toward index zero.

### 22. **unshift** inserts items at the beginning and returns the new length.

**Answer:** True.

**Explanation:** The existing items move to higher indexes.

### 23. **slice()** with no arguments makes a shallow copy.

**Answer:** True.

**Explanation:** It creates a new outer array. Nested object references are still shared.

### 24. Changing a nested object through a shallow copy can be observed through the original array.

**Answer:** True.

**Explanation:** Both outer arrays still refer to the same nested object.

### 25. An index of **-1** with bracket access reads the last array item.

**Answer:** False.

**Explanation:** It reads a property named **"-1"**. For bracket indexing, use **array[array.length - 1]** for the last item.

### 26. **Array.isArray(null)** returns false.

**Answer:** True.

**Explanation:** **null** is not an array.

## Short-answer questions

### 27. Why do array indexes start at zero?

**Answer:** JavaScript's first array element is assigned index zero, so an array with **length** three normally has indexes zero through two.

**Explanation:** The last index is **length - 1**.

### 28. What does an array's **length** represent?

**Answer:** It tracks the array's index range. It is normally one greater than the highest index used, but can be larger when there are holes or when **length** is set directly.

**Explanation:** It is not necessarily the number of present elements.

### 29. How can you remove an item without leaving a hole?

**Answer:** Use **splice** with the item's index and a removal count of one.

**Explanation:** **splice** removes the item and shifts later items left.

### 30. Why can two variables referring to the same array be surprising?

**Answer:** A mutation through either variable is visible through both because they point to one array.

**Explanation:** Assignment copies the reference, not the contents.

### 31. What is the difference between a shallow and deep copy?

**Answer:** A shallow copy creates a new outer collection but reuses nested object references. A deep copy also duplicates nested data.

**Explanation:** Spread and **slice** make shallow array copies.

### 32. Why does **Array(3).fill([])** create shared rows?

**Answer:** The same inner array value is placed into every position.

**Explanation:** Mutating any row changes the one shared inner array. Create a new row in a callback for every position.

### 33. When is **Array.of(value)** useful?

**Answer:** It creates an array containing its arguments, avoiding the special single-number length behavior of **new Array(number)**.

**Explanation:** **Array.of(3)** returns **[3]**.

### 34. What does **delete array[index]** do to **length**?

**Answer:** It leaves the length unchanged and removes the indexed property, leaving a hole.

**Explanation:** Use **splice** if removal should compact the array.

### 35. How can you make a shallow copy with spread?

**Answer:** Use **const copy = [...original]**.

**Explanation:** The new outer array has a different identity, but nested objects remain shared.

### 36. What does **pop** return when called on an empty array?

**Answer:** **undefined**.

**Explanation:** No last element exists to remove.

## Coding and output questions

### 37. What is printed?

~~~js
const colors = ["red", "blue", "green"];

console.log(colors[0]);
console.log(colors[colors.length - 1]);
~~~

**Answer:**

~~~text
red
green
~~~

**Explanation:** Index zero is the first item. The last item is at **length - 1**.

### 38. What is printed?

~~~js
const values = ["a"];
values[3] = "d";

console.log(values.length);
console.log(1 in values);
console.log(values[3]);
~~~

**Answer:**

~~~text
4
false
d
~~~

**Explanation:** Assigning index three increases the length to four. Index one was skipped and is a hole.

### 39. What is printed?

~~~js
const values = [];
values.length = 1;

const explicitUndefined = [undefined];

console.log(values[0]);
console.log(explicitUndefined[0]);
console.log(0 in values);
console.log(0 in explicitUndefined);
~~~

**Answer:**

~~~text
undefined
undefined
false
true
~~~

**Explanation:** Both reads produce **undefined**, but only the second array has an element at index zero.

### 40. What is printed?

~~~js
const items = ["a", "b", "c"];
const removed = items.splice(1, 1);

console.log(removed);
console.log(items);
console.log(items.length);
~~~

**Answer:**

~~~text
[ 'b' ]
[ 'a', 'c' ]
2
~~~

**Explanation:** **splice** returns the removed values and shifts later elements to close the gap.

### 41. What is printed?

~~~js
const items = ["a", "b", "c"];
delete items[1];

console.log(items.length);
console.log(1 in items);
console.log(items[1]);
~~~

**Answer:**

~~~text
3
false
undefined
~~~

**Explanation:** **delete** removes the indexed property but leaves a hole and does not change the length.

### 42. Do these arrays have the same identity?

~~~js
const first = [1, 2];
const second = first;
const third = [...first];

console.log(first === second);
console.log(first === third);
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** **second** references the same array as **first**. Spread creates a new outer array for **third**.

### 43. What is printed?

~~~js
const original = [{ count: 1 }];
const copy = [...original];

copy[0].count = 2;

console.log(original[0].count);
console.log(copy[0].count);
~~~

**Answer:**

~~~text
2
2
~~~

**Explanation:** The outer array was copied, but both arrays still refer to the same nested object.

### 44. What is printed?

~~~js
const rows = Array(2).fill([]);
rows[0].push("x");

console.log(rows[1][0]);
console.log(rows[0] === rows[1]);
~~~

**Answer:**

~~~text
x
true
~~~

**Explanation:** Both positions contain the same inner array reference.

### 45. What is printed?

~~~js
const rows = Array.from({ length: 2 }, function () {
    return [];
});

rows[0].push("x");

console.log(rows[1].length);
console.log(rows[0] === rows[1]);
~~~

**Answer:**

~~~text
0
false
~~~

**Explanation:** The callback creates a separate array for each position.

### 46. What is printed?

~~~js
const values = ["a", "b", "c", "d"];
values.length = 2;

console.log(values);
console.log(values.length);
~~~

**Answer:**

~~~text
[ 'a', 'b' ]
2
~~~

**Explanation:** Reducing the length truncates the array and removes items beyond the new length.

### 47. What does this code print?

~~~js
const queue = ["second", "third"];

console.log(queue.unshift("first"));
console.log(queue.shift());
console.log(queue);
~~~

**Answer:**

~~~text
3
first
[ 'second', 'third' ]
~~~

**Explanation:** **unshift** inserts at the beginning and returns the new length. **shift** removes and returns the first element.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [44 - Recursion and the call stack](044-recursion-and-the-call-stack.md) | [Open lesson](../lessons/045-arrays-create-read-and-update.md) | [Open example](../examples/045-arrays-create-read-and-update.md) | [46 - Array iteration methods](../lessons/046-array-iteration-methods.md) |