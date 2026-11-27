# 51 - Sparse arrays, array-like objects, and array protocols: examples

These examples make missing indexes visible and compare arrays with array-like and iterable values. Each includes expected output and an explanation.

## 1. Create an array with holes

### Question

What does an array created with **Array(3)** contain?

### Code

~~~js
const values = Array(3);

console.log(values.length);
console.log(Object.keys(values));
console.log(Object.hasOwn(values, 0));
~~~

### Expected output

~~~text
3
[]
false
~~~

### Explanation

The array has length 3 but no own indexed properties. Its three positions are holes.

## 2. Compare a hole with explicit undefined

### Question

Can a property-existence check distinguish a hole from an **undefined** value?

### Code

~~~js
const sparse = ["first", , "third"];
const explicit = ["first", undefined, "third"];

console.log(sparse[1]);
console.log(explicit[1]);

console.log(Object.hasOwn(sparse, 1));
console.log(Object.hasOwn(explicit, 1));
~~~

### Expected output

~~~text
undefined
undefined
false
true
~~~

### Explanation

Both reads return **undefined**. Only the second array owns a property at index 1.

## 3. Remove an array property with delete

### Question

Does deleting an index make the array shorter?

### Code

~~~js
const values = ["a", "b", "c"];

delete values[1];

console.log(values.length);
console.log(Object.hasOwn(values, 1));
console.log(Object.keys(values));
~~~

### Expected output

~~~text
3
false
[ '0', '2' ]
~~~

### Explanation

**delete** removes the property at index 1 but leaves the array length unchanged. Use **splice** if the goal is to remove the value and close the gap.

## 4. Create holes by assigning a distant index

### Question

What happens when a value is assigned at index 3 of an empty array?

### Code

~~~js
const values = [];

values[3] = "fourth";

console.log(values.length);
console.log(Object.keys(values));
console.log(Object.hasOwn(values, 1));
~~~

### Expected output

~~~text
4
[ '3' ]
false
~~~

### Explanation

The array length increases to 4. The indexes before 3 are holes.

## 5. Extend and shorten an array through length

### Question

How does changing **length** affect indexed properties?

### Code

~~~js
const values = ["a", "b"];

values.length = 4;

console.log(values.length);
console.log(Object.keys(values));

values.length = 1;

console.log(values);
console.log(values.length);
~~~

### Expected output

~~~text
4
[ '0', '1' ]
[ 'a' ]
1
~~~

### Explanation

Increasing length adds holes. Decreasing length removes indexed properties at and above the new length.

## 6. map skips a hole

### Question

How many times does **map** call its callback, and what happens to the hole?

### Code

~~~js
const values = ["first", , "third"];
let calls = 0;

const mapped = values.map(function (value) {
    calls += 1;
    return value.toUpperCase();
});

console.log(calls);
console.log(mapped.length);
console.log(Object.hasOwn(mapped, 1));
~~~

### Expected output

~~~text
2
3
false
~~~

### Explanation

The callback runs for the two present values. The result keeps length 3 and has a hole at index 1.

## 7. find visits a hole

### Question

Can **findIndex** match a hole when checking for **undefined**?

### Code

~~~js
const values = ["first", , "third"];

const holeIndex = values.findIndex(function (value, index) {
    return index === 1 && value === undefined;
});

console.log(holeIndex);
~~~

### Expected output

~~~text
1
~~~

### Explanation

The **find** family visits every index in its range. The callback receives **undefined** for the hole at index 1.

## 8. includes and indexOf differ on holes

### Question

How do exact-value searches treat a hole?

### Code

~~~js
const values = ["first", , "third"];

console.log(values.includes(undefined));
console.log(values.indexOf(undefined));
console.log(values.lastIndexOf(undefined));
~~~

### Expected output

~~~text
true
-1
-1
~~~

### Explanation

**includes** reads the hole as **undefined**. **indexOf** and **lastIndexOf** skip an ordinary hole.

## 9. A numeric loop visits all positions

### Question

How can a loop report every index and tell whether the array owns that index?

### Code

~~~js
const values = ["first", , undefined];

for (let index = 0; index < values.length; index += 1) {
    console.log(index, Object.hasOwn(values, index), values[index]);
}
~~~

### Expected output

~~~text
0 true first
1 false undefined
2 true undefined
~~~

### Explanation

The numeric loop visits every index below **length**. **Object.hasOwn** distinguishes the hole at index 1 from the explicit **undefined** at index 2.

## 10. for...of yields undefined for a hole

### Question

What values does **for...of** read from a sparse array?

### Code

~~~js
const values = ["first", , "third"];

for (const value of values) {
    console.log(value);
}
~~~

### Expected output

~~~text
first
undefined
third
~~~

### Explanation

The array iterator visits positions from 0 through length minus 1. Reading the missing position produces **undefined**.

## 11. keys and entries include holes

### Question

Do **keys** and **entries** omit a missing index?

### Code

~~~js
const values = ["first", , "third"];

console.log(Array.from(values.keys()));
console.log(Array.from(values.entries()));
~~~

### Expected output

~~~text
[ 0, 1, 2 ]
[ [ 0, 'first' ], [ 1, undefined ], [ 2, 'third' ] ]
~~~

### Explanation

The iterators include every index in the array's range. **entries** reads the hole as **undefined**.

## 12. Object.keys and JSON.stringify show different views

### Question

How are holes and explicit **undefined** represented by keys and JSON output?

### Code

~~~js
const values = ["first", , undefined, "fourth"];

console.log(Object.keys(values));
console.log(JSON.stringify(values));
~~~

### Expected output

~~~text
[ '0', '2', '3' ]
["first",null,null,"fourth"]
~~~

### Explanation

**Object.keys** lists present enumerable indexes, so it omits the hole. JSON output represents both the hole and explicit **undefined** array value as **null**.

## 13. Array.from turns holes into explicit values

### Question

Does **Array.from** preserve a hole when copying an array?

### Code

~~~js
const sparse = ["red", , "blue"];
const copied = Array.from(sparse);

console.log(copied);
console.log(Object.hasOwn(copied, 1));
~~~

### Expected output

~~~text
[ 'red', undefined, 'blue' ]
true
~~~

### Explanation

An array is iterable, and its iterator yields **undefined** at the missing position. **Array.from** creates an output property for every yielded value.

## 14. Map values while converting

### Question

Can **Array.from** convert array-like values and map them in one step?

### Code

~~~js
const source = {
    0: "red",
    1: "green",
    length: 2
};

const result = Array.from(source, function (value) {
    return value.toUpperCase();
});

console.log(result);
~~~

### Expected output

~~~text
[ 'RED', 'GREEN' ]
~~~

### Explanation

**Array.from** reads the array-like positions, applies its mapping callback, and returns a real array.

## 15. A plain object can be array-like without being an array

### Question

Does a length property make an object an actual array?

### Code

~~~js
const listLike = {
    0: "red",
    1: "green",
    length: 2
};

console.log(listLike.length);
console.log(listLike[0]);
console.log(Array.isArray(listLike));
~~~

### Expected output

~~~text
2
red
false
~~~

### Explanation

The object has indexed properties and a length, so it can be used as array-like data. It is not an actual array.

## 16. Borrow map for an array-like object

### Question

Can **map** create a result from a plain array-like object?

### Code

~~~js
const source = {
    0: "red",
    1: "green",
    length: 2
};

const uppercased = Array.prototype.map.call(source, function (value) {
    return value.toUpperCase();
});

console.log(Array.isArray(uppercased));
console.log(uppercased);
~~~

### Expected output

~~~text
true
[ 'RED', 'GREEN' ]
~~~

### Explanation

**map** is generic and uses the receiver's length and indexed properties. It returns a new array.

## 17. A generic map skips a missing array-like index

### Question

What happens if an array-like object has a missing index?

### Code

~~~js
const source = {
    0: "red",
    2: "blue",
    length: 3
};

const uppercased = Array.prototype.map.call(source, function (value) {
    return value.toUpperCase();
});

console.log(uppercased.length);
console.log(Object.hasOwn(uppercased, 1));
console.log(uppercased[2]);
~~~

### Expected output

~~~text
3
false
BLUE
~~~

### Explanation

**map** checks whether each index exists. It skips index 1 and preserves that hole in its result.

## 18. Convert a Set into an array

### Question

How can an iterable **Set** be turned into an array?

### Code

~~~js
const tags = new Set(["html", "css", "html"]);
const tagArray = Array.from(tags);

console.log(typeof tags.length);
console.log(Array.isArray(tags));
console.log(tagArray);
console.log(Array.isArray(tagArray));
~~~

### Expected output

~~~text
undefined
false
[ 'html', 'css' ]
true
~~~

### Explanation

A **Set** is iterable but is not an array-like object with indexed values and a normal length. **Array.from** converts its unique values into an array.

## 19. Spread works with an iterable

### Question

Can spread syntax copy the values of a Set?

### Code

~~~js
const tags = new Set(["html", "css"]);
const tagArray = [...tags];

console.log(tagArray);
~~~

### Expected output

~~~text
[ 'html', 'css' ]
~~~

### Explanation

A **Set** supplies an iterator, so spread syntax can read its values.

## 20. Spread does not accept every array-like object

### Question

What happens when spread is used on an array-like object without an iterator?

### Code

~~~js
const listLike = {
    0: "red",
    1: "green",
    length: 2
};

try {
    console.log([...listLike]);
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
TypeError
~~~

### Explanation

Spread syntax requires an iterable. The plain object has a length and indexes but does not supply **Symbol.iterator**. Use **Array.from** to convert it.

## 21. Array.from creates a dense generated sequence

### Question

How can an array of four squares be generated from its indexes?

### Code

~~~js
const squares = Array.from({ length: 4 }, function (value, index) {
    return index * index;
});

console.log(squares);
console.log(Object.keys(squares));
~~~

### Expected output

~~~text
[ 0, 1, 4, 9 ]
[ '0', '1', '2', '3' ]
~~~

### Explanation

The mapper is called for each position in the array-like length range, so every index in the result has a value.

## 22. Array.of treats a number as one value

### Question

What is the difference between **Array(3)** and **Array.of(3)**?

### Code

~~~js
const holes = Array(3);
const oneValue = Array.of(3);

console.log(holes.length, Object.keys(holes));
console.log(oneValue.length, oneValue[0]);
~~~

### Expected output

~~~text
3 []
1 3
~~~

### Explanation

**Array(3)** creates a length-3 array with holes. **Array.of(3)** creates a one-element array containing the number 3.

## 23. Compare methods on the same sparse array

### Question

Which callbacks run for a hole in **map**, **some**, and **findIndex**?

### Code

~~~js
const values = ["first", , "third"];
let mapCalls = 0;
let someCalls = 0;
let findIndexCalls = 0;

values.map(function (value) {
    mapCalls += 1;
    return value;
});

values.some(function (value) {
    someCalls += 1;
    return false;
});

values.findIndex(function (value, index) {
    findIndexCalls += 1;
    return index === 1 && value === undefined;
});

console.log(mapCalls);
console.log(someCalls);
console.log(findIndexCalls);
~~~

### Expected output

~~~text
2
2
2
~~~

### Explanation

**map** and **some** skip the hole and visit the two present entries. **findIndex** visits index 0, then the hole at index 1, where the callback matches and stops.

## 24. Use Object.hasOwn to inspect only own indexes

### Question

Which positions in this array are its own properties?

### Code

~~~js
const values = ["a", , undefined];

for (let index = 0; index < values.length; index += 1) {
    console.log(index, Object.hasOwn(values, index));
}
~~~

### Expected output

~~~text
0 true
1 false
2 true
~~~

### Explanation

The array owns indexes 0 and 2. Index 1 is a hole.

## 25. Practice prompts

1. Create an array with one hole and another with explicit **undefined**, then compare their own properties.
2. Delete an index and compare **length**, **Object.keys**, and **Object.hasOwn**.
3. Compare callback counts for **map**, **some**, and **findIndex**.
4. Convert a sparse array with **Array.from** and check whether the result is dense.
5. Convert a plain array-like object with **Array.from**.
6. Try to spread a non-iterable array-like object, catch the error, and explain it.
7. Convert a **Set** into an array and then call **map** on it.
8. Borrow **map** for an array-like object using **Array.prototype.map.call**.
9. Compare **includes(undefined)** and **indexOf(undefined)** on a hole.
10. Serialize a sparse array with **JSON.stringify** and explain why the hole is not preserved in the JSON text.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [50 - Sorting, comparators, and locale-aware comparison](050-sorting-comparators-and-locale-aware-comparison.md) | [Open lesson](../lessons/051-sparse-arrays-array-like-objects-and-array-protocols.md) | [Open Q&A](../qnas/051-sparse-arrays-array-like-objects-and-array-protocols.md) | [52 - Objects: properties and methods](../lessons/052-objects-properties-and-methods.md) |
