# 45 - Arrays: create, read, and update

An **array** stores an ordered collection of values. Each item is stored at a numeric index, starting at zero. Arrays can grow or shrink, and one array can contain values of different types.

This chapter covers creating arrays, reading and changing elements, adding and removing items, copying arrays, and avoiding sparse arrays and shared nested values. The next chapter covers methods for iterating over and transforming arrays.

## Create arrays with array literals

An array literal uses square brackets:

~~~js
const colors = ["teal", "amber", "violet"];
const empty = [];

console.log(colors);
console.log(empty.length);
~~~

Output:

~~~text
[ 'teal', 'amber', 'violet' ]
0
~~~

Values are separated by commas. An array can contain strings, numbers, booleans, objects, other arrays, or a mix:

~~~js
const values = ["score", 10, true, null];

console.log(values.length);
~~~

Output:

~~~text
4
~~~

In most code, array literals are the clearest way to create arrays.

## Avoid the single-number Array constructor surprise

The **Array** constructor has special behavior when it receives one numeric argument:

~~~js
const threeEmptySlots = new Array(3);
const oneNumber = new Array(3, 4);

console.log(threeEmptySlots.length);
console.log(0 in threeEmptySlots);
console.log(oneNumber);
~~~

Output:

~~~text
3
false
[ 3, 4 ]
~~~

**new Array(3)** creates an array with length three but no elements at those indexes. It does not create **[3]**. Prefer an array literal or **Array.of** when the desired contents should be explicit:

~~~js
console.log(Array.of(3));
console.log([3]);
~~~

Output:

~~~text
[ 3 ]
[ 3 ]
~~~

## Read values by index

Array indexes start at zero:

~~~js
const languages = ["JavaScript", "Python", "Ruby"];

console.log(languages[0]);
console.log(languages[1]);
console.log(languages[2]);
~~~

Output:

~~~text
JavaScript
Python
Ruby
~~~

The last valid index is **length - 1**. An index outside the array's elements returns **undefined**:

~~~js
const languages = ["JavaScript", "Python"];

console.log(languages[languages.length - 1]);
console.log(languages[2]);
~~~

Output:

~~~text
Python
undefined
~~~

An index of **-1** is not the last array element when using bracket access. It is a regular property name, not a valid array index:

~~~js
const values = ["first", "last"];

console.log(values[-1]);
console.log(values[values.length - 1]);
~~~

Output:

~~~text
undefined
last
~~~

## Check an array's length

The **length** property tracks the array's index range. It is normally one greater than the highest index used, but it can be larger when an array has holes or when **length** is set directly. It is not necessarily the count of present elements:

~~~js
const values = ["a", "b", "c"];

console.log(values.length);
~~~

Output:

~~~text
3
~~~

A normal array's length updates when an element is added beyond the current end:

~~~js
const values = ["a"];
values[3] = "d";

console.log(values.length);
console.log(values);
~~~

Output:

~~~text
4
[ 'a', <2 empty items>, 'd' ]
~~~

Indexes one and two are empty slots. Assigning at index three grows the length to four.

## Update an element

Assign a value to an existing index to replace its element:

~~~js
const tasks = ["Read", "Review", "Share"];
tasks[1] = "Practice";

console.log(tasks);
~~~

Output:

~~~text
[ 'Read', 'Practice', 'Share' ]
~~~

The **tasks** binding is declared with **const**, but the array it refers to is mutable. **const** prevents assigning a different array to the binding. It does not prevent changing an element.

## Add and remove at the end

**push** adds one or more items to the end and returns the new length. **pop** removes and returns the last item:

~~~js
const colors = ["teal"];

const newLength = colors.push("amber", "violet");
const removed = colors.pop();

console.log(newLength);
console.log(removed);
console.log(colors);
~~~

Output:

~~~text
3
violet
[ 'teal', 'amber' ]
~~~

Calling **pop** on an empty array returns **undefined**.

## Add and remove at the beginning

**unshift** adds items to the beginning and returns the new length. **shift** removes and returns the first item:

~~~js
const queue = ["second", "third"];

const newLength = queue.unshift("first");
const removed = queue.shift();

console.log(newLength);
console.log(removed);
console.log(queue);
~~~

Output:

~~~text
3
first
[ 'second', 'third' ]
~~~

These operations mutate the original array. Adding or removing at the beginning also changes the indexes of the other elements.

## Insert, remove, or replace with splice

**splice** changes an array starting at a chosen index. Its first argument is the start index. Its second argument is how many items to remove. Any remaining arguments are inserted at that position:

~~~js
const tasks = ["plan", "draft", "publish"];

const removed = tasks.splice(1, 1, "review", "edit");

console.log(removed);
console.log(tasks);
~~~

Output:

~~~text
[ 'draft' ]
[ 'plan', 'review', 'edit', 'publish' ]
~~~

To insert without removing, use a removal count of zero:

~~~js
const tasks = ["plan", "publish"];
tasks.splice(1, 0, "draft", "review");

console.log(tasks);
~~~

Output:

~~~text
[ 'plan', 'draft', 'review', 'publish' ]
~~~

To remove items and insert nothing, omit the inserted values:

~~~js
const tasks = ["plan", "draft", "review", "publish"];
const removed = tasks.splice(1, 2);

console.log(removed);
console.log(tasks);
~~~

Output:

~~~text
[ 'draft', 'review' ]
[ 'plan', 'publish' ]
~~~

**splice** mutates the original array and returns a new array containing the removed elements.

## Change array length

Setting **length** to a smaller value removes elements at indexes beyond the new length:

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

Setting **length** to a larger value creates empty slots rather than filling them with **undefined**:

~~~js
const values = ["a"];
values.length = 3;

console.log(values.length);
console.log(1 in values);
console.log(values[1]);
~~~

Output:

~~~text
3
false
undefined
~~~

Reading a hole produces **undefined**, but the slot is absent. This distinction matters to methods that check whether an index is present.

## Holes and explicit undefined are different

An array can have a missing slot, called a **hole**. A hole is different from an element whose value is **undefined**:

~~~js
const withHole = [];
withHole.length = 1;

const withUndefined = [undefined];

console.log(withHole[0]);
console.log(withUndefined[0]);
console.log(0 in withHole);
console.log(0 in withUndefined);
~~~

Output:

~~~text
undefined
undefined
false
true
~~~

Both indexed reads produce **undefined**, but only the second array has an element at index zero.

Avoid accidentally creating holes. Assigning far beyond the end or using **delete** can leave missing indexes.

## Why delete is usually not an array removal tool

The **delete** operator removes a property but does not shift later array elements or reduce the length:

~~~js
const letters = ["a", "b", "c"];
delete letters[1];

console.log(letters.length);
console.log(1 in letters);
console.log(letters);
~~~

Output:

~~~text
3
false
[ 'a', <1 empty item>, 'c' ]
~~~

Use **splice** when removing an element should close the gap and shift later items:

~~~js
const letters = ["a", "b", "c"];
letters.splice(1, 1);

console.log(letters.length);
console.log(letters);
~~~

Output:

~~~text
2
[ 'a', 'c' ]
~~~

## Check whether a value is an array

Use **Array.isArray** to distinguish arrays from other objects:

~~~js
console.log(Array.isArray([1, 2]));
console.log(Array.isArray({ 0: "a", length: 1 }));
console.log(Array.isArray(null));
~~~

Output:

~~~text
true
false
false
~~~

The second value resembles an array, but it is only an object with indexed properties and a **length**.

## Arrays are reference values

Assigning an array to another variable copies the reference, not the array contents:

~~~js
const original = ["red", "blue"];
const alias = original;

alias[0] = "green";

console.log(original);
console.log(alias === original);
~~~

Output:

~~~text
[ 'green', 'blue' ]
true
~~~

Both variables refer to the same array. A change through one reference is visible through the other.

## Make a shallow copy

Spread syntax creates a new outer array:

~~~js
const original = ["red", "blue"];
const copy = [...original];

copy[0] = "green";

console.log(original);
console.log(copy);
console.log(copy === original);
~~~

Output:

~~~text
[ 'red', 'blue' ]
[ 'green', 'blue' ]
false
~~~

The outer arrays are distinct, but this is a **shallow copy**. If an element is an object or another array, both arrays initially refer to that same nested value:

~~~js
const original = [{ name: "Asha" }];
const copy = [...original];

copy[0].name = "Mina";

console.log(original[0].name);
console.log(copy[0].name);
~~~

Output:

~~~text
Mina
Mina
~~~

The nested object was not copied. A shallow copy is often enough for arrays of primitive values, but it does not independently clone nested objects.

The **slice** method with no arguments also makes a shallow copy:

~~~js
const original = [1, 2, 3];
const copy = original.slice();

console.log(copy);
console.log(copy === original);
~~~

Output:

~~~text
[ 1, 2, 3 ]
false
~~~

## Create nested arrays without sharing rows

Be careful when filling an array with the same nested array value:

~~~js
const rows = Array(2).fill([]);

rows[0].push("shared");

console.log(rows);
console.log(rows[0] === rows[1]);
~~~

Output:

~~~text
[ [ 'shared' ], [ 'shared' ] ]
true
~~~

Both positions contain a reference to the same inner array. Create each row separately when independent rows are needed:

~~~js
const rows = Array.from({ length: 2 }, function () {
    return [];
});

rows[0].push("first row");

console.log(rows);
console.log(rows[0] === rows[1]);
~~~

Output:

~~~text
[ [ 'first row' ], [] ]
false
~~~

The callback creates a new array for each position.

## Common array mistakes

- **Starting indexes at one:** Array indexes begin at zero.
- **Reading one past the end:** The result is **undefined**.
- **Assuming const makes an array immutable:** The binding cannot be reassigned, but the array can be changed.
- **Using new Array with one number to create one item:** It creates an array with that length and empty slots. Use **[number]** or **Array.of(number)**.
- **Using delete to remove an element:** It leaves a hole and does not shift later indexes. Use **splice** to close the gap.
- **Assuming assignment copies an array:** It copies the reference, so both names refer to the same array.
- **Assuming spread deeply clones nested data:** Spread makes a shallow copy only.
- **Filling every row with the same nested array:** Mutating one row then appears to change every row.
- **Treating a hole as an explicit undefined element:** Both read as **undefined**, but only an explicit element is present at that index.

## Try it yourself

1. Create an array of four favorite foods and print the first and last items.
2. Replace the second item in an array.
3. Add two items at the end and remove the last item.
4. Add an item at the beginning and remove the first item.
5. Insert and remove items with **splice**, and inspect both the changed array and the returned array.
6. Compare an empty slot with an explicit **undefined** value using the **in** operator.
7. Copy an array with spread and verify the outer arrays are different.
8. Copy an array containing an object and observe that the nested object is still shared.
9. Create a two-dimensional array with independent rows.
10. Explain why **delete array[index]** does not reduce the array's length.

## Key points

- Arrays are ordered collections indexed from zero.
- **length** tracks the array's index range and can exceed the number of present elements when there are holes or when length is set directly.
- Bracket access reads or updates an indexed value.
- **push**, **pop**, **shift**, **unshift**, and **splice** mutate the array.
- **delete** leaves a hole instead of shifting elements.
- Assigning an array copies its reference. Spread and **slice** create shallow copies.
- **Array.isArray** checks whether a value is an array.
- Create nested rows separately when each row needs independent state.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [44 - Recursion and the call stack](044-recursion-and-the-call-stack.md) | [Open Q&A](../qnas/045-arrays-create-read-and-update.md) | [Open example](../examples/045-arrays-create-read-and-update.md) | [46 - Array iteration methods](046-array-iteration-methods.md) |