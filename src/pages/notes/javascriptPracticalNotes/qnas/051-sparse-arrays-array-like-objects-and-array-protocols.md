# 51 - Sparse arrays, array-like objects, and array protocols: Q&A

This Q&A reviews holes, array length, iteration behavior, array-like objects, iterables, and generic array methods. Each answer and explanation follows its question.

## Multiple-choice questions

### 1. What is a hole in an array?

A. An array element whose value is **null**  
B. An index with no own property  
C. An element that contains an empty string  
D. An element that cannot be read

**Answer: B. An index with no own property.**

**Explanation:** Reading a hole usually produces **undefined**, but no own indexed property exists at that position.

### 2. Which check distinguishes a hole from an explicit **undefined** value?

A. Read both values and compare them  
B. **Object.hasOwn(array, index)**  
C. Check the array's **length**  
D. Use **Array.isArray**

**Answer: B. Object.hasOwn(array, index)**

**Explanation:** Both a hole and an explicit **undefined** read as **undefined**. **Object.hasOwn** tells whether the index is an own property.

### 3. What does **Array(3)** create?

A. An array containing the number 3  
B. An array with length 3 and holes  
C. An array containing three zeroes  
D. An error

**Answer: B. An array with length 3 and holes.**

**Explanation:** A single numeric argument sets array length. Use **[3]** or **Array.of(3)** to create an array whose single value is 3.

### 4. What happens to array length when an indexed property is deleted with **delete**?

A. The length decreases by one.  
B. The array is cleared.  
C. The length stays the same.  
D. The array becomes an object.

**Answer: C. The length stays the same.**

**Explanation:** **delete** removes the property at that index but does not close the gap or decrement **length**.

### 5. Which method is usually clearer when the intention is to remove an item and close the gap?

A. **delete**  
B. **splice**  
C. **Object.hasOwn**  
D. **Array.from**

**Answer: B. splice**

**Explanation:** **splice** removes the indexed item and shifts later values to close the gap.

### 6. Which method can convert either an iterable or an array-like object into an array?

A. **Array.from**  
B. **Array.isArray**  
C. **Object.keys**  
D. **Array.of**

**Answer: A. Array.from**

**Explanation:** **Array.from** accepts iterable values and array-like values, returning a real array.

### 7. What does a plain array-like object need to be usable as array-like data?

A. A **length** property  
B. A **Symbol.iterator** property  
C. An Array prototype  
D. A **map** method

**Answer: A. A length property**

**Explanation:** Array-like operations use **length** and indexed properties. The object does not have to inherit from **Array.prototype** or be iterable.

### 8. What does an iterable provide?

A. Only a **length** property  
B. An iterator through **Symbol.iterator**  
C. An Array prototype  
D. Only numeric keys

**Answer: B. An iterator through Symbol.iterator**

**Explanation:** Iterables can be used by **for...of** and spread syntax. They do not need numeric indexes or a normal **length** property.

### 9. Which method checks whether a value is an actual array?

A. **Array.isArray**  
B. **Object.hasOwn**  
C. **Array.from**  
D. **value.length**

**Answer: A. Array.isArray**

**Explanation:** An array-like or iterable object is not necessarily an actual array.

### 10. Which operation visits a hole and reads it as **undefined**?

A. **Object.keys**  
B. **for...of** over the array  
C. **map** callback  
D. **forEach** callback

**Answer: B. for...of over the array**

**Explanation:** The array iterator visits each index up to its length. A hole is read as **undefined**.

### 11. Which callback method calls the callback for an ordinary array hole?

A. **map**  
B. **filter**  
C. **some**  
D. **find**

**Answer: D. find**

**Explanation:** The **find** family visits every index in its range and passes **undefined** for a hole. Methods such as **map**, **filter**, and **some** skip ordinary holes.

### 12. What does **includes(undefined)** do when an array has a hole?

A. Always returns false  
B. Can return true because the hole reads as **undefined**  
C. Throws a TypeError  
D. Removes the hole

**Answer: B. Can return true because the hole reads as undefined.**

**Explanation:** **includes** reads each position and uses SameValueZero comparison. A hole is read as **undefined**.

### 13. How does **indexOf(undefined)** treat an ordinary hole?

A. It matches the hole.  
B. It skips the hole.  
C. It converts the hole to **null**.  
D. It throws an error.

**Answer: B. It skips the hole.**

**Explanation:** **indexOf** checks whether the property exists before comparing its value, so an ordinary hole is skipped.

### 14. What does **Array.from** do with a missing position in an array-like object?

A. Preserves it as a hole  
B. Creates an explicit **undefined** value at that index  
C. Removes that position and shortens the result  
D. Throws a TypeError

**Answer: B. Creates an explicit undefined value at that index.**

**Explanation:** **Array.from** reads each position in the array-like length range and creates an array entry for it.

### 15. What does **Object.keys** return for an ordinary sparse array?

A. Every index up to the length  
B. Only the present enumerable own keys  
C. The values rather than keys  
D. The array's length

**Answer: B. Only the present enumerable own keys.**

**Explanation:** A hole is not an own property, so it is omitted from **Object.keys**.

## True or false

### 16. A hole and an explicit **undefined** value produce the same result when read.

**Answer: True.**

**Explanation:** Reading either position returns **undefined**. Use an own-property check to tell them apart.

### 17. A hole and an explicit **undefined** value are the same array structure.

**Answer: False.**

**Explanation:** A hole has no own property at that index. An explicit **undefined** value is an existing property whose value is **undefined**.

### 18. The array's **length** is the number of present values.

**Answer: False.**

**Explanation:** Length describes the array's indexed range. Holes are included in that range.

### 19. Setting an array's length to a larger number creates present **undefined** values.

**Answer: False.**

**Explanation:** Increasing length creates empty positions. Those positions are holes, not own properties containing **undefined**.

### 20. Setting an array's length to a smaller number can remove indexed properties.

**Answer: True.**

**Explanation:** Reducing length removes own array elements whose indexes are at or above the new length.

### 21. **map** normally calls its callback for every hole.

**Answer: False.**

**Explanation:** **map** normally skips holes and preserves missing positions in the result.

### 22. The **find** family calls its callback for every index in its search range, including holes.

**Answer: True.**

**Explanation:** A hole is read as **undefined** and passed to the callback.

### 23. **some** and **every** normally skip holes.

**Answer: True.**

**Explanation:** Their callbacks are normally called only for indexes that exist.

### 24. A value with a **length** property automatically works with spread syntax.

**Answer: False.**

**Explanation:** Spread syntax needs an iterable. A plain array-like object without **Symbol.iterator** is not necessarily iterable.

### 25. A **Set** is iterable even though it has no normal numeric indexes or array length.

**Answer: True.**

**Explanation:** **Set** provides iteration through **Symbol.iterator**. It is iterable but not an array-like object with indexed values and a normal length.

### 26. **Array.prototype.map** can be borrowed for a suitable array-like object.

**Answer: True.**

**Explanation:** **map** is generic. It uses the receiver's length and indexed properties, then returns an array.

### 27. **Array.isArray** returns true for every iterable.

**Answer: False.**

**Explanation:** A **Set** is iterable, but it is not an array. Iterability and being an actual array are separate properties.

### 28. JSON serialization can preserve the distinction between a hole and explicit **undefined** in an array.

**Answer: False.**

**Explanation:** Both are serialized as **null** in an array by **JSON.stringify**.

## Predict the result

### 29. What does this print?

~~~js
const sparse = ["first", , "third"];
const explicit = ["first", undefined, "third"];

console.log(sparse.length, Object.hasOwn(sparse, 1));
console.log(explicit.length, Object.hasOwn(explicit, 1));
~~~

**Answer:**

~~~text
3 false
3 true
~~~

**Explanation:** Both arrays have length 3. Only the second array has an own property at index 1.

### 30. What does this print?

~~~js
const values = ["a", "b", "c"];

delete values[1];

console.log(values.length);
console.log(Object.keys(values));
~~~

**Answer:**

~~~text
3
[ '0', '2' ]
~~~

**Explanation:** Deleting index 1 leaves a hole and does not change the length.

### 31. What does this print?

~~~js
const values = [];
values[3] = "last";

console.log(values.length);
console.log(Object.keys(values));
~~~

**Answer:**

~~~text
4
[ '3' ]
~~~

**Explanation:** Assigning index 3 extends the length to 4. Indexes 0, 1, and 2 are holes.

### 32. What does this print?

~~~js
const values = ["a", , "c"];
let calls = 0;

const mapped = values.map(function (value) {
    calls += 1;
    return value.toUpperCase();
});

console.log(calls);
console.log(Object.hasOwn(mapped, 1));
~~~

**Answer:**

~~~text
2
false
~~~

**Explanation:** **map** calls the callback for the two present indexes and leaves a hole at index 1 in the result.

### 33. What does this print?

~~~js
const values = ["a", , "c"];

const index = values.findIndex(function (value, currentIndex) {
    return currentIndex === 1 && value === undefined;
});

console.log(index);
~~~

**Answer:**

~~~text
1
~~~

**Explanation:** **findIndex** visits the hole at index 1 and passes **undefined** to the callback.

### 34. What does this print?

~~~js
const values = ["a", , "c"];

console.log(values.includes(undefined));
console.log(values.indexOf(undefined));
~~~

**Answer:**

~~~text
true
-1
~~~

**Explanation:** **includes** can match a hole as **undefined**. **indexOf** skips the missing property.

### 35. What does this print?

~~~js
const values = ["first", , "third"];

console.log(Array.from(values));
console.log(Object.hasOwn(Array.from(values), 1));
~~~

**Answer:**

~~~text
[ 'first', undefined, 'third' ]
true
~~~

**Explanation:** **Array.from** reads each index and creates a dense result. The missing position becomes an explicit **undefined** value.

### 36. What does this print?

~~~js
const values = ["first", , "third"];

console.log(Array.from(values.entries()));
console.log(Array.from(values.keys()));
~~~

**Answer:**

~~~text
[ [ 0, 'first' ], [ 1, undefined ], [ 2, 'third' ] ]
[ 0, 1, 2 ]
~~~

**Explanation:** The array iterator methods include each index in the length range. Reading the hole gives **undefined**.

### 37. What does this print?

~~~js
const values = ["first", , undefined, "fourth"];

console.log(Object.keys(values));
console.log(JSON.stringify(values));
~~~

**Answer:**

~~~text
[ '0', '2', '3' ]
["first",null,null,"fourth"]
~~~

**Explanation:** **Object.keys** omits the hole but includes the explicit **undefined** property. JSON serialization converts both array positions to **null**.

### 38. What does this print?

~~~js
const listLike = {
    0: "red",
    1: "green",
    length: 2
};

console.log(Array.isArray(listLike));
console.log(Array.from(listLike));
~~~

**Answer:**

~~~text
false
[ 'red', 'green' ]
~~~

**Explanation:** The object is array-like, not an actual array. **Array.from** converts its indexed values into a new array.

### 39. What does this print?

~~~js
const source = {
    0: "red",
    2: "blue",
    length: 3
};

const mapped = Array.prototype.map.call(source, function (value) {
    return value.toUpperCase();
});

console.log(mapped.length);
console.log(Object.hasOwn(mapped, 1));
console.log(mapped[2]);
~~~

**Answer:**

~~~text
3
false
BLUE
~~~

**Explanation:** **map** uses the array-like length and skips missing index 1. Its result is an array with the same length and a hole in that position.

### 40. What does this print?

~~~js
const tags = new Set(["html", "css"]);

console.log(typeof tags.length);
console.log(Array.isArray(tags));
console.log([...tags]);
~~~

**Answer:**

~~~text
undefined
false
[ 'html', 'css' ]
~~~

**Explanation:** A **Set** is iterable, so spread can read it. It is not an array and does not have a normal array length.

### 41. What does this print?

~~~js
const squares = Array.from({ length: 4 }, function (value, index) {
    return index * index;
});

console.log(squares);
console.log(Object.hasOwn(squares, 2));
~~~

**Answer:**

~~~text
[ 0, 1, 4, 9 ]
true
~~~

**Explanation:** **Array.from** calls the mapper for each position in the array-like length range and creates a value at every index.

### 42. What does this print?

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

**Explanation:** Reducing length removes indexed elements at or beyond the new length.

## Short-answer questions

### 43. Why can reading a hole be misleading?

**Answer:** Reading a hole returns **undefined**, just like reading an explicit **undefined** property.

**Explanation:** Use **Object.hasOwn(array, index)** if the difference matters.

### 44. What does **Object.hasOwn** tell you that **index in array** may not?

**Answer:** **Object.hasOwn** checks only for an own property. **in** also returns true for an inherited property.

**Explanation:** For the ordinary case, both distinguish a hole from a present own index. **Object.hasOwn** precisely checks whether the array itself owns that index.

### 45. Why is **delete array[index]** different from **array.splice(index, 1)**?

**Answer:** **delete** leaves a hole and preserves later indexes. **splice** removes the item and shifts later values to close the gap.

**Explanation:** Use **splice** when the array should become shorter and remain contiguous.

### 46. What is the difference between array-like and iterable?

**Answer:** Array-like values have a length and indexed data. Iterables provide an iterator through **Symbol.iterator**.

**Explanation:** They are separate protocols. An array satisfies both, a plain object may be only array-like, and a **Set** is iterable without being array-like.

### 47. Why can **Array.from** handle a plain array-like object when spread cannot?

**Answer:** **Array.from** supports both iterables and array-like values. Spread syntax requires an iterable.

**Explanation:** A length property alone does not supply **Symbol.iterator**.

### 48. What makes an array method generic?

**Answer:** It works from the receiver's length and indexed properties rather than requiring an actual array.

**Explanation:** Methods such as **map** can be borrowed with **Array.prototype.map.call(arrayLike, callback)**.

### 49. What does **Array.from** do when an array-like object has a missing index?

**Answer:** It creates an output entry containing **undefined** at that position.

**Explanation:** It reads the positions in the source's length range and creates an output element for each one.

### 50. When should you prefer **Array.from** over borrowing a method with **call**?

**Answer:** Prefer **Array.from** when the goal is to convert values into a normal array.

**Explanation:** It makes the conversion clear and can accept a mapper. Borrow a generic method when you specifically want that method's behavior on array-like data.

## Practical and coding questions

### 51. Create a three-slot sparse array and show which positions exist.

**Answer:**

~~~js
const values = Array(3);

console.log(values.length);
console.log(Object.keys(values));
console.log(Object.hasOwn(values, 0));
~~~

Output:

~~~text
3
[]
false
~~~

**Explanation:** The array has a length of 3 but no own indexed values.

### 52. Convert a sparse array into a dense array of uppercase strings, preserving missing values as explicit undefined.

**Answer:**

~~~js
const sparse = ["red", , "blue"];

const dense = Array.from(sparse, function (value) {
    return value === undefined ? undefined : value.toUpperCase();
});

console.log(dense);
console.log(Object.hasOwn(dense, 1));
~~~

Output:

~~~text
[ 'RED', undefined, 'BLUE' ]
true
~~~

**Explanation:** **Array.from** reads each index, including the hole, and creates an output property for each position.

### 53. Convert a **Set** into an array and then use an array method.

**Answer:**

~~~js
const uniqueTags = new Set(["html", "css", "html"]);
const tags = Array.from(uniqueTags);

console.log(tags);
console.log(tags.map(function (tag) {
    return tag.toUpperCase();
}));
~~~

Output:

~~~text
[ 'html', 'css' ]
[ 'HTML', 'CSS' ]
~~~

**Explanation:** A **Set** is iterable. **Array.from** creates a real array so normal array methods are available.

### 54. Use a generic array method on an array-like object.

**Answer:**

~~~js
const scores = {
    0: 12,
    1: 18,
    2: 25,
    length: 3
};

const doubled = Array.prototype.map.call(scores, function (score) {
    return score * 2;
});

console.log(doubled);
console.log(Array.isArray(doubled));
~~~

Output:

~~~text
[ 24, 36, 50 ]
true
~~~

**Explanation:** **map** reads the receiver's length and indexed properties, then returns an actual array.

### 55. Safely inspect every index in a sparse array.

**Answer:**

~~~js
const values = ["first", , undefined];

for (let index = 0; index < values.length; index += 1) {
    console.log(index, Object.hasOwn(values, index), values[index]);
}
~~~

Output:

~~~text
0 true first
1 false undefined
2 true undefined
~~~

**Explanation:** The loop visits each position. **Object.hasOwn** distinguishes the hole at index 1 from the explicit **undefined** at index 2.

## Review checklist

- A hole is a missing own indexed property.
- Reading a hole returns **undefined**, but **Object.hasOwn** distinguishes it from an explicit value.
- Array **length** includes holes.
- **delete** leaves an empty position; **splice** closes the gap.
- Callback methods differ in how they process holes.
- Array-like means length and indexed access; iterable means **Symbol.iterator**.
- Use **Array.from** to convert iterable or array-like values.
- Use spread only when the source is iterable.
- Many array prototype methods are generic.
- Use **Array.isArray** to check for an actual array.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [50 - Sorting, comparators, and locale-aware comparison](050-sorting-comparators-and-locale-aware-comparison.md) | [Open lesson](../lessons/051-sparse-arrays-array-like-objects-and-array-protocols.md) | [Open example](../examples/051-sparse-arrays-array-like-objects-and-array-protocols.md) | [52 - Objects: properties and methods](../lessons/052-objects-properties-and-methods.md) |
