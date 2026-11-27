# 45 - Arrays: create, read, and update - Examples

These examples show how to create arrays, access and update elements, add and remove values, and make copies safely. Each example includes a question, full code, expected output, and explanation.

## 1. Create arrays with literals

### Question

How do you create an array with items and an empty array?

### Code

~~~js
const colors = ["teal", "amber", "violet"];
const empty = [];

console.log(colors);
console.log(empty.length);
~~~

### Expected output

~~~text
[ 'teal', 'amber', 'violet' ]
0
~~~

### Explanation

Square brackets create an array literal. An empty pair of brackets creates an array with no elements.

## 2. Compare the numeric Array constructor with Array.of

### Question

How can you create an array containing the number three?

### Code

~~~js
const withConstructor = new Array(3);
const withOf = Array.of(3);
const withLiteral = [3];

console.log(withConstructor.length);
console.log(0 in withConstructor);
console.log(withOf);
console.log(withLiteral);
~~~

### Expected output

~~~text
3
false
[ 3 ]
[ 3 ]
~~~

### Explanation

A single numeric argument to **new Array** creates a length with empty slots. **Array.of(3)** and **[3]** both create an array with one element whose value is three.

## 3. Read first, last, and out-of-range indexes

### Question

How do you read the first and last values, and what happens when the index is out of range?

### Code

~~~js
const languages = ["JavaScript", "Python", "Ruby"];

console.log(languages[0]);
console.log(languages[languages.length - 1]);
console.log(languages[3]);
~~~

### Expected output

~~~text
JavaScript
Ruby
undefined
~~~

### Explanation

Indexes start at zero. The last existing index is **length - 1**. Reading a missing index returns **undefined**.

## 4. Update an element in a const array

### Question

Can an element change even though the array variable uses **const**?

### Code

~~~js
const tasks = ["Read", "Review", "Share"];
tasks[1] = "Practice";

console.log(tasks);
~~~

### Expected output

~~~text
[ 'Read', 'Practice', 'Share' ]
~~~

### Explanation

**const** prevents assigning a different array to the **tasks** binding. It does not make the referenced array immutable.

## 5. Add and remove items at the end

### Question

What do **push** and **pop** return?

### Code

~~~js
const colors = ["teal"];

const newLength = colors.push("amber", "violet");
const removed = colors.pop();

console.log(newLength);
console.log(removed);
console.log(colors);
~~~

### Expected output

~~~text
3
violet
[ 'teal', 'amber' ]
~~~

### Explanation

**push** adds items and returns the new length. **pop** removes and returns the last item. Both mutate the original array.

## 6. Add and remove items at the beginning

### Question

How do **unshift** and **shift** change an array?

### Code

~~~js
const queue = ["second", "third"];

const newLength = queue.unshift("first");
const removed = queue.shift();

console.log(newLength);
console.log(removed);
console.log(queue);
~~~

### Expected output

~~~text
3
first
[ 'second', 'third' ]
~~~

### Explanation

**unshift** inserts at the beginning and returns the new length. **shift** removes and returns the first item. Remaining indexes move.

## 7. Replace and inspect items with splice

### Question

How can you replace one item and inspect the removed value?

### Code

~~~js
const tasks = ["plan", "draft", "publish"];

const removed = tasks.splice(1, 1, "review");

console.log(removed);
console.log(tasks);
~~~

### Expected output

~~~text
[ 'draft' ]
[ 'plan', 'review', 'publish' ]
~~~

### Explanation

**splice** starts at index one, removes one item, and inserts **"review"** in its place. It returns a new array containing the removed value.

## 8. Insert items without removing anything

### Question

How can you insert items between existing elements?

### Code

~~~js
const tasks = ["plan", "publish"];

tasks.splice(1, 0, "draft", "review");

console.log(tasks);
~~~

### Expected output

~~~text
[ 'plan', 'draft', 'review', 'publish' ]
~~~

### Explanation

The removal count is zero, so no existing values are removed. The new items are inserted at index one.

## 9. Remove a range with splice

### Question

How can you remove two adjacent items and keep the remaining array compact?

### Code

~~~js
const tasks = ["plan", "draft", "review", "publish"];

const removed = tasks.splice(1, 2);

console.log(removed);
console.log(tasks);
~~~

### Expected output

~~~text
[ 'draft', 'review' ]
[ 'plan', 'publish' ]
~~~

### Explanation

**splice** returns the removed values and shifts the later value left. The original array is changed.

## 10. Extend an array by assigning an index

### Question

What happens when you assign a value beyond the end of an array?

### Code

~~~js
const values = ["a"];
values[3] = "d";

console.log(values.length);
console.log(1 in values);
console.log(values);
~~~

### Expected output

~~~text
4
false
[ 'a', <2 empty items>, 'd' ]
~~~

### Explanation

Assigning index three makes the length four. Indexes one and two were skipped, so they are holes.

## 11. Compare a hole with an explicit undefined

### Question

How can you tell a missing slot from an element whose value is **undefined**?

### Code

~~~js
const hole = [];
hole.length = 1;

const explicitUndefined = [undefined];

console.log(hole[0]);
console.log(explicitUndefined[0]);
console.log(0 in hole);
console.log(0 in explicitUndefined);
~~~

### Expected output

~~~text
undefined
undefined
false
true
~~~

### Explanation

Both indexed reads produce **undefined**. The **in** operator shows that the first slot is absent and the second is an existing element.

## 12. Truncate an array by setting length

### Question

How can you keep only the first two elements?

### Code

~~~js
const values = ["a", "b", "c", "d"];
values.length = 2;

console.log(values);
console.log(values.length);
~~~

### Expected output

~~~text
[ 'a', 'b' ]
2
~~~

### Explanation

Reducing **length** removes elements beyond the new length.

## 13. Compare delete and splice

### Question

Which operation removes an item and closes the gap?

### Code

~~~js
const withDelete = ["a", "b", "c"];
delete withDelete[1];

const withSplice = ["a", "b", "c"];
withSplice.splice(1, 1);

console.log(withDelete.length);
console.log(1 in withDelete);
console.log(withSplice.length);
console.log(withSplice);
~~~

### Expected output

~~~text
3
false
2
[ 'a', 'c' ]
~~~

### Explanation

**delete** removes the indexed property but leaves a hole and the original length. **splice** removes the element and shifts later values.

## 14. Check arrays reliably

### Question

How can you distinguish an array from a plain object that has indexed properties?

### Code

~~~js
const items = ["a", "b"];
const arrayLike = { 0: "a", 1: "b", length: 2 };

console.log(Array.isArray(items));
console.log(Array.isArray(arrayLike));
console.log(Array.isArray(null));
~~~

### Expected output

~~~text
true
false
false
~~~

### Explanation

**Array.isArray** recognizes actual arrays. Objects that merely resemble arrays are not arrays.

## 15. Compare an alias with a shallow copy

### Question

Does assigning an array or spreading it create a new array?

### Code

~~~js
const original = ["red", "blue"];
const alias = original;
const copy = [...original];

alias[0] = "green";

console.log(original);
console.log(copy);
console.log(alias === original);
console.log(copy === original);
~~~

### Expected output

~~~text
[ 'green', 'blue' ]
[ 'red', 'blue' ]
true
false
~~~

### Explanation

Assignment copies the reference, so **alias** and **original** point to the same array. Spread creates a distinct outer array.

## 16. See nested values shared by a shallow copy

### Question

Does spreading an array also clone its nested objects?

### Code

~~~js
const original = [{ name: "Asha" }];
const copy = [...original];

copy[0].name = "Mina";

console.log(original[0].name);
console.log(copy[0].name);
console.log(original === copy);
console.log(original[0] === copy[0]);
~~~

### Expected output

~~~text
Mina
Mina
false
true
~~~

### Explanation

The outer arrays are different, but both contain a reference to the same object. Changing that object is visible through both arrays.

## 17. Make independent nested rows

### Question

How can each row in a two-dimensional array be a different array?

### Code

~~~js
const rows = Array.from({ length: 3 }, function () {
    return [];
});

rows[0].push("first row");

console.log(rows);
console.log(rows[0] === rows[1]);
~~~

### Expected output

~~~text
[ [ 'first row' ], [], [] ]
false
~~~

### Explanation

The callback creates a fresh inner array for each position. Mutating the first row does not change the others.

## 18. Notice the shared rows created by fill

### Question

Why can filling with one nested array cause unexpected changes?

### Code

~~~js
const rows = Array(2).fill([]);
rows[0].push("shared");

console.log(rows);
console.log(rows[0] === rows[1]);
~~~

### Expected output

~~~text
[ [ 'shared' ], [ 'shared' ] ]
true
~~~

### Explanation

**fill** places the same inner array reference into both positions. Both rows are aliases for one array.

## 19. Copy with slice

### Question

How can **slice** make a shallow copy without changing the original array?

### Code

~~~js
const original = [10, 20, 30];
const copy = original.slice();

copy[1] = 99;

console.log(original);
console.log(copy);
console.log(original === copy);
~~~

### Expected output

~~~text
[ 10, 20, 30 ]
[ 10, 99, 30 ]
false
~~~

### Explanation

Calling **slice** with no arguments creates a new outer array. Nested objects would still be shared.

## 20. Read a negative bracket property safely

### Question

Does bracket access with **-1** return the last element?

### Code

~~~js
const values = ["first", "last"];

console.log(values[-1]);
console.log(values[values.length - 1]);
~~~

### Expected output

~~~text
undefined
last
~~~

### Explanation

A negative bracket key is not an array index for the last item. Use **length - 1** with bracket access.

## Practice prompts

1. Create an array, replace an item, and print the result.
2. Add and remove values from both ends of a queue.
3. Insert two values with **splice** without removing existing items.
4. Create a hole and compare it with an explicit **undefined** element.
5. Copy an array with spread and verify the identities.
6. Copy an array of objects and observe the shared nested references.
7. Create independent rows for a two-dimensional array.
8. Explain why **delete** does not compact an array.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [44 - Recursion and the call stack](044-recursion-and-the-call-stack.md) | [Open lesson](../lessons/045-arrays-create-read-and-update.md) | [Open Q&A](../qnas/045-arrays-create-read-and-update.md) | [46 - Array iteration methods](../lessons/046-array-iteration-methods.md) |