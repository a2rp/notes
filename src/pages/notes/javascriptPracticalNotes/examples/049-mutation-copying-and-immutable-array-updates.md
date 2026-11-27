# 49 - Mutation, copying, and immutable array updates: examples

Each example compares what happens to an original array with what happens to a changed copy. Read the code and output, then notice which methods mutate and which return a new outer array.

## 1. Assignment creates an alias

### Question

Does assigning an array to another variable copy its values?

### Code

~~~js
const original = ["plan", "write"];
const alias = original;

alias.push("review");

console.log(original);
console.log(alias);
console.log(original === alias);
~~~

### Expected output

~~~text
[ 'plan', 'write', 'review' ]
[ 'plan', 'write', 'review' ]
true
~~~

### Explanation

Assignment copies the array reference. Both variables refer to the same array object, so a mutation through either variable is visible through the other.

## 2. const does not freeze array contents

### Question

Can a **const** array be changed with **push** and indexed assignment?

### Code

~~~js
const scores = [7, 8];

scores.push(9);
scores[0] = 10;

console.log(scores);
~~~

### Expected output

~~~text
[ 10, 8, 9 ]
~~~

### Explanation

**const** prevents assigning a different array to **scores**. It does not prevent changing the array object.

## 3. Push mutates and returns the new length

### Question

What does **push** return, and how does it change the array?

### Code

~~~js
const queue = ["Mina", "Asha"];

const newLength = queue.push("Dev");

console.log(newLength);
console.log(queue);
~~~

### Expected output

~~~text
3
[ 'Mina', 'Asha', 'Dev' ]
~~~

### Explanation

**push** appends the value to the source array and returns the array's new length.

## 4. Pop mutates and returns the removed item

### Question

Remove and display the last item.

### Code

~~~js
const queue = ["Mina", "Asha", "Dev"];

const removed = queue.pop();

console.log(removed);
console.log(queue);
~~~

### Expected output

~~~text
Dev
[ 'Mina', 'Asha' ]
~~~

### Explanation

**pop** changes the array and returns the item it removed.

## 5. Unshift and shift change the beginning

### Question

Add a person to the start of a queue and then remove the first person.

### Code

~~~js
const queue = ["Asha", "Dev"];

const newLength = queue.unshift("Mina");
const firstPerson = queue.shift();

console.log(newLength);
console.log(firstPerson);
console.log(queue);
~~~

### Expected output

~~~text
3
Mina
[ 'Asha', 'Dev' ]
~~~

### Explanation

**unshift** adds at the beginning and returns the new length. **shift** removes and returns the first item.

## 6. Splice removes and replaces values

### Question

Replace the two middle colors with one new color.

### Code

~~~js
const colors = ["teal", "gold", "coral", "violet"];

const removed = colors.splice(1, 2, "silver");

console.log(removed);
console.log(colors);
~~~

### Expected output

~~~text
[ 'gold', 'coral' ]
[ 'teal', 'silver', 'violet' ]
~~~

### Explanation

**splice** mutates the source array. It returns a new array containing the removed values.

## 7. Splice inserts without removing

### Question

Insert two steps before **publish**.

### Code

~~~js
const steps = ["plan", "publish"];

steps.splice(1, 0, "write", "review");

console.log(steps);
~~~

### Expected output

~~~text
[ 'plan', 'write', 'review', 'publish' ]
~~~

### Explanation

A delete count of **0** means no existing values are removed. The inserted items appear at the start position.

## 8. Splice removes values and returns them

### Question

Remove two steps from the middle and inspect both arrays.

### Code

~~~js
const steps = ["plan", "write", "review", "publish"];

const removed = steps.splice(1, 2);

console.log(removed);
console.log(steps);
~~~

### Expected output

~~~text
[ 'write', 'review' ]
[ 'plan', 'publish' ]
~~~

### Explanation

The source array is changed to remove the selected range. The removed items are returned in a separate array.

## 9. Slice creates a copy

### Question

Copy an array, update its first item, and compare it with the original.

### Code

~~~js
const original = ["red", "green", "blue"];
const copy = original.slice();

copy[0] = "gold";

console.log(original);
console.log(copy);
console.log(original === copy);
~~~

### Expected output

~~~text
[ 'red', 'green', 'blue' ]
[ 'gold', 'green', 'blue' ]
false
~~~

### Explanation

**slice** creates a different outer array. Changing a primitive value in the copy does not replace the value in the original.

## 10. Spread creates a shallow copy

### Question

Add an item to a copied list without changing the original list.

### Code

~~~js
const original = [2, 4, 6];
const copyWithExtraValue = [...original, 8];

console.log(original);
console.log(copyWithExtraValue);
~~~

### Expected output

~~~text
[ 2, 4, 6 ]
[ 2, 4, 6, 8 ]
~~~

### Explanation

Spread syntax copies the existing values into a new outer array before adding 8.

## 11. Array.from creates a shallow copy

### Question

Change the second position in a copy made with **Array.from**.

### Code

~~~js
const original = ["north", "south"];
const copy = Array.from(original);

copy[1] = "west";

console.log(original);
console.log(copy);
~~~

### Expected output

~~~text
[ 'north', 'south' ]
[ 'north', 'west' ]
~~~

### Explanation

**Array.from** creates a new outer array from the original. Updating a primitive position in the copy leaves the source position alone.

## 12. A shallow copy shares nested objects

### Question

What happens when a property on an object inside a shallow copy is changed?

### Code

~~~js
const original = [{ name: "Asha" }];
const copy = [...original];

copy[0].name = "Mina";

console.log(original[0].name);
console.log(original[0] === copy[0]);
~~~

### Expected output

~~~text
Mina
true
~~~

### Explanation

The outer arrays are different, but both contain the same object reference. The property update is visible through either array.

## 13. Replace one item immutably with map

### Question

Change the value at index 1 and preserve the original values.

### Code

~~~js
const scores = [72, 84, 91];

const updatedScores = scores.map(function (score, index) {
    return index === 1 ? 88 : score;
});

console.log(scores);
console.log(updatedScores);
~~~

### Expected output

~~~text
[ 72, 84, 91 ]
[ 72, 88, 91 ]
~~~

### Explanation

**map** returns a new array. The callback supplies 88 at index 1 and returns the existing value at every other index.

## 14. Add to the beginning or end without mutation

### Question

Create two versions of a task list, one with a task at the beginning and one with a task at the end.

### Code

~~~js
const tasks = ["write", "review"];

const withPlanning = ["plan", ...tasks];
const withPublishing = [...tasks, "publish"];

console.log(tasks);
console.log(withPlanning);
console.log(withPublishing);
~~~

### Expected output

~~~text
[ 'write', 'review' ]
[ 'plan', 'write', 'review' ]
[ 'write', 'review', 'publish' ]
~~~

### Explanation

Each array literal creates a new outer array. The original **tasks** array is not changed.

## 15. Remove by condition with filter

### Question

Remove the task with id 2 and keep the source array available.

### Code

~~~js
const tasks = [
    { id: 1, title: "Plan" },
    { id: 2, title: "Write" },
    { id: 3, title: "Review" }
];

const remainingTasks = tasks.filter(function (task) {
    return task.id !== 2;
});

console.log(tasks.length);
console.log(remainingTasks.map(function (task) {
    return task.title;
}));
~~~

### Expected output

~~~text
3
[ 'Plan', 'Review' ]
~~~

### Explanation

**filter** creates a new outer array. Its object values are still references to the original task objects.

## 16. Insert at an index with slices and spread

### Question

Insert **review** before **publish** while preserving the original list.

### Code

~~~js
const steps = ["plan", "write", "publish"];
const insertAt = 2;

const updatedSteps = [
    ...steps.slice(0, insertAt),
    "review",
    ...steps.slice(insertAt)
];

console.log(steps);
console.log(updatedSteps);
~~~

### Expected output

~~~text
[ 'plan', 'write', 'publish' ]
[ 'plan', 'write', 'review', 'publish' ]
~~~

### Explanation

The new array joins the original values before the insertion point, the inserted value, and the original values after the insertion point.

## 17. Remove at an index with slices and spread

### Question

Remove the item at index 1 without changing the source.

### Code

~~~js
const steps = ["plan", "write", "review", "publish"];
const removeAt = 1;

const updatedSteps = [
    ...steps.slice(0, removeAt),
    ...steps.slice(removeAt + 1)
];

console.log(steps);
console.log(updatedSteps);
~~~

### Expected output

~~~text
[ 'plan', 'write', 'review', 'publish' ]
[ 'plan', 'review', 'publish' ]
~~~

### Explanation

The copy joins the section before the removed index with the section after it.

## 18. Reverse without mutation

### Question

Create a reversed copy and compare it with the original.

### Code

~~~js
const letters = ["a", "b", "c"];
const reversed = letters.toReversed();

console.log(letters);
console.log(reversed);
console.log(letters === reversed);
~~~

### Expected output

~~~text
[ 'a', 'b', 'c' ]
[ 'c', 'b', 'a' ]
false
~~~

### Explanation

**toReversed** returns a new array. **reverse** would instead mutate the source array.

## 19. Sort without mutation

### Question

Create a sorted copy and preserve the original order.

### Code

~~~js
const names = ["Zara", "Asha", "Mina"];
const sortedNames = names.toSorted();

console.log(names);
console.log(sortedNames);
~~~

### Expected output

~~~text
[ 'Zara', 'Asha', 'Mina' ]
[ 'Asha', 'Mina', 'Zara' ]
~~~

### Explanation

**toSorted** returns a new array. Sorting rules and numeric comparators are covered in the next chapter.

## 20. Insert, remove, and replace with toSpliced

### Question

Replace **write** with **review** without mutating the source array.

### Code

~~~js
const steps = ["plan", "write", "publish"];
const updatedSteps = steps.toSpliced(1, 1, "review");

console.log(steps);
console.log(updatedSteps);
~~~

### Expected output

~~~text
[ 'plan', 'write', 'publish' ]
[ 'plan', 'review', 'publish' ]
~~~

### Explanation

**toSpliced** follows the position, delete count, and inserted-items pattern of **splice**, but returns a copy.

## 21. Replace an item with with

### Question

Replace the middle score and check whether the original changes.

### Code

~~~js
const scores = [72, 84, 91];
const updatedScores = scores.with(1, 88);

console.log(scores);
console.log(updatedScores);
console.log(scores === updatedScores);
~~~

### Expected output

~~~text
[ 72, 84, 91 ]
[ 72, 88, 91 ]
false
~~~

### Explanation

**with** returns a new array with one replacement. The original has a different identity and keeps its old value.

## 22. Use a negative with index

### Question

Replace the final item using a negative index.

### Code

~~~js
const scores = [72, 84, 91];

console.log(scores.with(-1, 95));
~~~

### Expected output

~~~text
[ 72, 84, 95 ]
~~~

### Explanation

A negative index is counted from the end, so **-1** selects the final item.

## 23. Handle an invalid with index

### Question

What happens if **with** receives an index equal to the array length?

### Code

~~~js
const values = [10, 20];

try {
    const updated = values.with(2, 30);
    console.log(updated);
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
RangeError
~~~

### Explanation

Valid indexes are from 0 through length minus 1, including supported negative indexes. An index outside that range throws **RangeError**.

## 24. Notice that fill repeats one object reference

### Question

Does **fill** create a different object in every position?

### Code

~~~js
const sharedTask = { done: false };
const tasks = Array(3).fill(sharedTask);

tasks[0].done = true;

console.log(tasks[1].done);
console.log(tasks[0] === tasks[2]);
~~~

### Expected output

~~~text
true
true
~~~

### Explanation

The same object reference is copied into every position. To make separate objects, create one object per position with **Array.from** or **map**.

~~~js
const separateTasks = Array.from({ length: 3 }, function () {
    return { done: false };
});

console.log(separateTasks[0] === separateTasks[1]);
~~~

Output:

~~~text
false
~~~

## 25. copyWithin mutates and returns the same array

### Question

Copy values within an array and inspect the return value identity.

### Code

~~~js
const values = ["a", "b", "c", "d"];
const returned = values.copyWithin(1, 2);

console.log(values);
console.log(returned === values);
~~~

### Expected output

~~~text
[ 'a', 'c', 'd', 'd' ]
true
~~~

### Explanation

**copyWithin** copies a section inside the same array, mutates it, and returns the same array. It does not make a new copy.

## 26. Build a local result with mutation

### Question

Use **push** to build a new result without changing the input.

### Code

~~~js
const values = [2, 4, 6];
const doubled = [];

for (const value of values) {
    doubled.push(value * 2);
}

console.log(values);
console.log(doubled);
~~~

### Expected output

~~~text
[ 2, 4, 6 ]
[ 4, 8, 12 ]
~~~

### Explanation

The loop mutates a new local array as it builds the result. The input array is not shared with that accumulator.

## 27. Copy nested data only where it changes

### Question

Change a nested profile name while retaining the old user data.

### Code

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

### Expected output

~~~text
Asha
Ravi
true
~~~

### Explanation

The updated user's object and its nested profile are copied before editing. The unchanged user remains shared, which is fine if it will not be mutated.

## Practice prompts

1. Compare **push**, **pop**, **shift**, and **unshift** by recording their return values and resulting arrays.
2. Use **splice** to remove and replace values, then compare its return value with the source.
3. Make shallow copies with **slice**, spread syntax, and **Array.from**.
4. Replace an item with **map** and compare the old and new arrays.
5. Remove an item by id with **filter**.
6. Insert an item immutably with **toSpliced**.
7. Replace an item with **with**, including a negative index.
8. Compare **reverse** with **toReversed**.
9. Use **fill** with a primitive and then with an object. Explain the identity difference.
10. Copy an array of nested objects and make one nested update without changing the original.
11. Build a local output array with **push** and explain why that mutation is safe.
12. Identify the runtime requirements for the change-by-copy methods before using them in an application.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [48 - Searching and testing arrays](048-searching-and-testing-arrays.md) | [Open lesson](../lessons/049-mutation-copying-and-immutable-array-updates.md) | [Open Q&A](../qnas/049-mutation-copying-and-immutable-array-updates.md) | [50 - Sorting, comparators, and locale-aware comparison](../lessons/050-sorting-comparators-and-locale-aware-comparison.md) |
