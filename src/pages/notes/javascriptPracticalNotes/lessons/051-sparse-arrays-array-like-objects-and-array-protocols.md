# 51 - Sparse arrays, array-like objects, and array protocols

An array can have missing indexes, even though its **length** counts those positions. A different kind of object can also have indexed properties and a **length** without being an actual array. These distinctions affect iteration, array methods, copying, and type checks.

This chapter explains sparse arrays, holes, array-like objects, iterables, and the generic behavior of many array methods.

## What you will learn

- Distinguish an array hole from an explicit **undefined** value.
- Create and inspect sparse arrays.
- Predict how loops and array methods handle missing indexes.
- Understand the difference between an array, an array-like object, and an iterable.
- Convert iterable and array-like values into arrays.
- Borrow generic array methods for array-like objects.
- Choose the right type check and avoid common sparse-array mistakes.

## Arrays have length and indexed properties

An array has a **length** and may have indexed properties such as **0**, **1**, and **2**. The length describes the range of positions, but not every position must contain an own property.

~~~js
const names = ["Asha", "Mina"];

console.log(names.length);
console.log(Object.hasOwn(names, 0));
console.log(Object.hasOwn(names, 1));
~~~

Output:

~~~text
2
true
true
~~~

An array whose indexes are missing in that range is sparse.

## What is a hole?

A hole is an array index that has no own property. Reading the hole usually produces **undefined**, but that does not mean the array contains an explicit **undefined** value there.

~~~js
const sparse = ["first", , "third"];
const explicitUndefined = ["first", undefined, "third"];

console.log(sparse.length);
console.log(explicitUndefined.length);

console.log(sparse[1]);
console.log(explicitUndefined[1]);

console.log(Object.hasOwn(sparse, 1));
console.log(Object.hasOwn(explicitUndefined, 1));
~~~

Output:

~~~text
3
3
undefined
undefined
false
true
~~~

Both indexed reads return **undefined**. The difference is whether index 1 exists as an own property.

### Create holes

A hole can be created by leaving an array position empty:

~~~js
const values = ["a", , "c"];

console.log(values.length);
console.log(Object.hasOwn(values, 1));
~~~

Output:

~~~text
3
false
~~~

An array length argument also creates empty positions:

~~~js
const emptySlots = Array(3);

console.log(emptySlots.length);
console.log(Object.keys(emptySlots));
~~~

Output:

~~~text
3
[]
~~~

With one numeric argument, **Array(3)** creates an array of length 3 with no indexed elements. To create one array value containing the number 3, use **[3]** or **Array.of(3)**.

### Deleting an array element creates a hole

The **delete** operator removes an indexed property but leaves the array's length unchanged.

~~~js
const values = ["a", "b", "c"];

delete values[1];

console.log(values.length);
console.log(values[1]);
console.log(Object.hasOwn(values, 1));
console.log(values);
~~~

Output:

~~~text
3
undefined
false
[ 'a', <1 empty item>, 'c' ]
~~~

For ordinary application work, methods such as **splice** or **filter** are often clearer when the intention is to remove an item and close the gap. **delete** is useful when you specifically need an empty position.

### Assigning beyond the current end creates holes

Writing to an index beyond the current end increases **length** and leaves the intervening positions empty.

~~~js
const values = [];
values[3] = "fourth";

console.log(values.length);
console.log(Object.keys(values));
console.log(Object.hasOwn(values, 1));
~~~

Output:

~~~text
4
[ '3' ]
false
~~~

The array has length 4 but only one own indexed property, at index 3.

## Check whether an index exists

Use **Object.hasOwn(array, index)** to check whether the array itself has a value at a position.

~~~js
const values = ["first", , "third"];

console.log(Object.hasOwn(values, 0));
console.log(Object.hasOwn(values, 1));
console.log(Object.hasOwn(values, 2));
~~~

Output:

~~~text
true
false
true
~~~

The **in** operator checks both the object and its prototype chain. It can be useful when inherited properties count, but for checking whether an array itself has a value at an index, **Object.hasOwn** states that intention more clearly.

~~~js
const values = ["first", , "third"];

console.log(1 in values);
console.log(Object.hasOwn(values, 1));
~~~

Output:

~~~text
false
false
~~~

For older runtimes without **Object.hasOwn**, the equivalent own-property check is:

~~~js
const hasIndex = Object.prototype.hasOwnProperty.call(values, 1);
~~~

## Length can change independently of present values

Increasing array length adds empty positions. Decreasing it removes indexed properties at or above the new length.

~~~js
const values = ["a", "b"];

values.length = 4;

console.log(values.length);
console.log(Object.keys(values));
~~~

Output:

~~~text
4
[ '0', '1' ]
~~~

~~~js
const values = ["a", "b", "c", "d"];

values.length = 2;

console.log(values);
console.log(values.length);
~~~

Output:

~~~text
[ 'a', 'b' ]
2
~~~

The **length** property is not a count of non-empty values. It is the upper boundary of the array's indexed range.

## Iterating over sparse arrays

Different iteration forms observe holes in different ways.

### A numeric index loop reads every position

A loop from zero up to **length** visits each index in the range. Reading a hole produces **undefined**.

~~~js
const values = ["first", , "third"];

for (let index = 0; index < values.length; index += 1) {
    console.log(index, values[index]);
}
~~~

Output:

~~~text
0 first
1 undefined
2 third
~~~

To distinguish a missing index from an explicit **undefined**, test it with **Object.hasOwn** inside the loop.

### for...of reads every position

An array iterator visits each index in range. A hole is yielded as **undefined**.

~~~js
const values = ["first", , "third"];

for (const value of values) {
    console.log(value);
}
~~~

Output:

~~~text
first
undefined
third
~~~

### keys and entries include positions for holes

The array iterator methods **keys** and **entries** describe indexes in the array's range, including positions that are holes.

~~~js
const values = ["first", , "third"];

console.log(Array.from(values.keys()));
console.log(Array.from(values.entries()));
~~~

Output:

~~~text
[ 0, 1, 2 ]
[ [ 0, 'first' ], [ 1, undefined ], [ 2, 'third' ] ]
~~~

The **entries** iterator reads each index, so the value for a hole is **undefined**.

## Array methods do not all treat holes the same way

Many callback methods skip holes. Methods in the **find** family and **includes** behave differently.

| Method or operation | Behavior at a hole |
| --- | --- |
| **forEach**, **map**, **filter**, **some**, **every**, **reduce** | Callback is not called for an ordinary hole |
| **find**, **findIndex**, **findLast**, **findLastIndex** | Callback is called with **undefined** for the hole |
| **includes(undefined)** | Can match a hole as **undefined** |
| **indexOf(undefined)**, **lastIndexOf(undefined)** | Skip an ordinary hole |
| **for...of**, spread syntax, array **keys**, array **entries** | Visit the index; a value read from the hole is **undefined** |
| **Object.keys** | Does not list a hole |
| **JSON.stringify** | Serializes an array hole as **null** |

These behaviors matter most when a sparse array is intentional or a method has created one.

### Callback methods that skip holes

**map**, **filter**, **forEach**, **some**, **every**, and **reduce** normally call their callbacks only for indexes that exist.

~~~js
const values = ["first", , "third"];
let callbackCount = 0;

const uppercased = values.map(function (value) {
    callbackCount += 1;
    return value.toUpperCase();
});

console.log(callbackCount);
console.log(Object.hasOwn(uppercased, 1));
console.log(uppercased[1]);
~~~

Output:

~~~text
2
false
undefined
~~~

**map** preserves the missing position in its result. It does not call the callback for the hole.

These methods use property-existence checks. An inherited indexed property can count as present, even when the array has no own property at that index. For normal arrays without indexed properties on their prototype, the simple rule is that callback methods skip holes.

### The find family visits holes

**find**, **findIndex**, **findLast**, and **findLastIndex** check every index in their search range. A hole is read as **undefined** and passed to the callback.

~~~js
const values = ["first", , "third"];

const foundIndex = values.findIndex(function (value, index) {
    return index === 1 && value === undefined;
});

console.log(foundIndex);
~~~

Output:

~~~text
1
~~~

A **find** result of **undefined** is ambiguous because the array may contain an actual **undefined**, or the search may have matched a hole, or it may have found no match. Use **findIndex** when you need to distinguish a matching position from no result.

### includes and indexOf differ for holes

**includes** reads holes as **undefined** during its search. **indexOf** and **lastIndexOf** skip indexes that are absent.

~~~js
const values = ["first", , "third"];

console.log(values.includes(undefined));
console.log(values.indexOf(undefined));
console.log(values.lastIndexOf(undefined));
~~~

Output:

~~~text
true
-1
-1
~~~

When checking an array that may be sparse, choose the method based on whether an empty position should count as an **undefined** value.

### Object.keys and JSON output

**Object.keys** lists enumerable own keys, so it omits holes. JSON serialization represents missing array positions as **null**.

~~~js
const values = ["first", , undefined, "fourth"];

console.log(Object.keys(values));
console.log(JSON.stringify(values));
~~~

Output:

~~~text
[ '0', '2', '3' ]
["first",null,null,"fourth"]
~~~

JSON also serializes an explicit **undefined** array value as **null**. The JSON text alone cannot distinguish that explicit value from a hole.

## What is an array-like object?

An array-like object has a **length** and may have properties with non-negative integer index names. It is not necessarily an actual array and may not have array methods or an iterator.

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

Output:

~~~text
2
red
false
~~~

A plain object can be array-like if it has a suitable **length**. The length describes how many indexed positions an array method should consider.

Common examples of array-like values include the **arguments** object and some browser collection objects. Their exact iterator support depends on the object and runtime, so do not assume that having **length** makes a value iterable.

## What is an iterable?

An iterable supplies an iterator through **Symbol.iterator**. Arrays, strings, and **Set** values are common examples. The iteration protocol is what lets a value work with **for...of** and spread syntax.

A **Set** is iterable, but it does not have numeric indexes or a normal **length** property:

~~~js
const tags = new Set(["html", "css"]);

console.log(typeof tags.length);
console.log(Array.from(tags));
~~~

Output:

~~~text
undefined
[ 'html', 'css' ]
~~~

A plain array-like object may have a length and indexes without being iterable:

~~~js
const listLike = {
    0: "red",
    1: "green",
    length: 2
};

console.log(Array.from(listLike));
~~~

Output:

~~~text
[ 'red', 'green' ]
~~~

**Array.from** accepts either an iterable or an array-like object. It creates a real array from the values.

## Array, array-like, and iterable are different ideas

| Kind of value | Indexed values | **length** | **Symbol.iterator** | Passes **Array.isArray** |
| --- | --- | --- | --- | --- |
| Ordinary array | Yes | Yes | Yes | Yes |
| Plain array-like object | Often | Yes | Not required | No |
| **Set** | No numeric indexes | No normal length | Yes | No |

A value can satisfy more than one category. An array is both iterable and array-like. A plain object with a **length** is array-like but is not automatically iterable. A **Set** is iterable but is not array-like.

## Convert values into real arrays

### Array.from handles iterable and array-like values

Use **Array.from** when you need a real array from either kind of source.

~~~js
const listLike = {
    0: "red",
    1: "green",
    length: 2
};

const array = Array.from(listLike);

console.log(Array.isArray(array));
console.log(array);
~~~

Output:

~~~text
true
[ 'red', 'green' ]
~~~

It can also map values during conversion:

~~~js
const source = {
    0: "red",
    1: "green",
    length: 2
};

const uppercased = Array.from(source, function (value) {
    return value.toUpperCase();
});

console.log(uppercased);
~~~

Output:

~~~text
[ 'RED', 'GREEN' ]
~~~

### Spread syntax requires an iterable

Spread syntax works with an iterable. It does not convert an arbitrary array-like object just because that object has **length** and indexed properties.

~~~js
const tags = new Set(["html", "css"]);
const tagArray = [...tags];

console.log(tagArray);
~~~

Output:

~~~text
[ 'html', 'css' ]
~~~

For a non-iterable array-like object, use **Array.from** instead. If a value could be an array-like object without an iterator, spread syntax can throw a **TypeError**.

### Create a chosen number of values with Array.from

**Array.from** can also create a dense array of a requested length using its mapping callback.

~~~js
const squares = Array.from({ length: 4 }, function (value, index) {
    return index * index;
});

console.log(squares);
~~~

Output:

~~~text
[ 0, 1, 4, 9 ]
~~~

Unlike **Array(4)**, this result has an actual value at every index.

## Borrow generic array methods

Many **Array.prototype** methods are generic. They use the receiver's **length** and indexed properties instead of requiring the receiver to be an actual array.

For example, **map** can be called for a simple array-like object:

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

Output:

~~~text
true
[ 'RED', 'GREEN' ]
~~~

The receiver is **source**, but **map** returns a new array. Because this example has properties at both positions, the callback runs twice.

A generic method can also skip a missing position in an array-like object, just as **map** skips a hole in an ordinary array:

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
console.log(uppercased[1]);
~~~

Output:

~~~text
3
false
undefined
~~~

Use this pattern when the source has array-like indexed data and you need a particular array method. **Array.from** is usually clearer when the goal is simply to convert the value into an array.

## Check for an actual array

Use **Array.isArray** to test whether a value is an actual array.

~~~js
const values = [1, 2];
const listLike = { 0: 1, 1: 2, length: 2 };

console.log(Array.isArray(values));
console.log(Array.isArray(listLike));
console.log(Array.isArray(new Set([1, 2])));
~~~

Output:

~~~text
true
false
false
~~~

A **length** property or iterator does not make an object an array. **Array.isArray** is the direct check for that distinction.

## Common mistakes

- Treating a hole and an explicit **undefined** value as the same thing.
- Thinking array **length** counts only present values.
- Using **delete** when the intention is to remove an item and close the gap.
- Assuming every array method skips holes.
- Assuming **includes(undefined)** behaves like **indexOf(undefined)** on sparse arrays.
- Assuming **find** skips holes.
- Assuming every object with **length** is iterable.
- Using spread syntax on an array-like object that has no iterator.
- Assuming an iterable such as **Set** has numeric indexes or a **length** property.
- Using **Array.isArray** to test whether a value is iterable or array-like.
- Forgetting that **Array.from** turns missing array-like positions into explicit **undefined** values.
- Assuming borrowed array methods require the receiver to be an actual array.

## Try it yourself

1. Compare a sparse array with an array containing explicit **undefined** values.
2. Use **Object.hasOwn** to find which positions contain own properties.
3. Create a hole with **delete**, then compare the array's length and keys.
4. Count how many times **map**, **find**, and **some** callbacks run on the same sparse array.
5. Compare **includes(undefined)** with **indexOf(undefined)** on an array containing a hole.
6. Serialize a sparse array with **JSON.stringify** and inspect the result.
7. Convert a **Set** and a plain array-like object with **Array.from**.
8. Borrow **map** for an array-like object using **Array.prototype.map.call**.
9. Check an array, an array-like object, and an iterable with **Array.isArray**.
10. Create a dense sequence with **Array.from({ length: count }, mapper)**.

## Key points

- A hole is a missing own indexed property; reading it usually returns **undefined**.
- Array **length** includes holes and can be changed directly.
- **Object.hasOwn** distinguishes a hole from an explicit **undefined** value.
- Callback methods differ: some skip holes, while the **find** family visits them.
- **includes** treats a hole as **undefined**; **indexOf** and **lastIndexOf** skip it.
- An array-like object has a length and indexed properties, but need not be an array or iterable.
- An iterable supports **Symbol.iterator** and works with **for...of** and spread syntax.
- **Array.from** converts both iterable and array-like values to real arrays.
- Many array methods are generic and can be borrowed for array-like receivers.
- Use **Array.isArray** when the question is whether a value is an actual array.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [50 - Sorting, comparators, and locale-aware comparison](050-sorting-comparators-and-locale-aware-comparison.md) | [Open Q&A](../qnas/051-sparse-arrays-array-like-objects-and-array-protocols.md) | [Open example](../examples/051-sparse-arrays-array-like-objects-and-array-protocols.md) | [52 - Objects: properties and methods](052-objects-properties-and-methods.md) |
