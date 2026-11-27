# 132 - Data structures in JavaScript: Q&A

Review arrays, objects, maps, sets, weak collections, typed arrays, and common collection patterns. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which structure is a natural choice for an ordered sequence accessed by position?

- A. Array
- B. WeakMap
- C. WeakSet
- D. Symbol

**Answer: A.**

**Explanation:** Arrays store ordered values and expose them through zero-based indexes.

### 2. Which structure is usually the clearest choice for dynamic key-value associations when keys can be objects?

- A. Map
- B. Set
- C. String
- D. TypedArray

**Answer: A.**

**Explanation:** Map keys can be values of any type, including object references, and Map provides explicit methods for adding, finding, and removing entries.

### 3. What happens when the same primitive value is added to a Set more than once?

- A. The set stores one occurrence
- B. The set stores every occurrence
- C. The set throws an error
- D. The value becomes a Map key

**Answer: A.**

**Explanation:** A Set stores unique values. Adding a value already present does not add another copy.

### 4. Which API checks whether an object itself has a property, without treating an inherited property as its own?

- A. Object.hasOwn(object, key)
- B. object.includes(key)
- C. Map.hasOwn(key)
- D. Array.isArray(object)

**Answer: A.**

**Explanation:** Object.hasOwn checks for an own property. A normal property lookup can also find properties inherited from the object's prototype.

### 5. Which structure is designed for values associated with object keys without strongly retaining those keys?

- A. WeakMap
- B. Array
- C. Map
- D. Set

**Answer: A.**

**Explanation:** A WeakMap holds keys weakly. This can be useful for metadata associated with an object's lifetime.

### 6. Which statement about WeakMap is true?

- A. Its keys cannot be enumerated
- B. It always has a numeric size property
- C. It can be converted directly to JSON
- D. Its keys must be strings

**Answer: A.**

**Explanation:** WeakMap does not expose key enumeration or a size property because its contents can change with garbage collection.

### 7. Which operation removes and returns the last item from an array?

- A. pop()
- B. shift()
- C. unshift()
- D. slice()

**Answer: A.**

**Explanation:** pop removes and returns the last item. shift removes and returns the first item.

### 8. What behavior does this code have?

~~~js
const first = { id: 1 };
const second = { id: 1 };
const values = new Set([first, second]);

console.log(values.size);
~~~

- A. It logs 2
- B. It logs 1
- C. It throws because objects cannot be in a Set
- D. It logs undefined

**Answer: A.**

**Explanation:** The two object literals are distinct references. Set treats them as two different object values even though their fields match.

### 9. What does this code log?

~~~js
const values = new Set([NaN, NaN]);

console.log(values.size);
~~~

- A. 1
- B. 2
- C. 0
- D. It throws

**Answer: A.**

**Explanation:** Set uses SameValueZero comparison for uniqueness, which treats NaN as equal to NaN.

### 10. Which statement about object keys in a Map is correct?

- A. Object keys are compared by reference identity
- B. Objects are converted to JSON strings before comparison
- C. Objects cannot be used as keys
- D. Different objects with equal fields are always the same key

**Answer: A.**

**Explanation:** A lookup succeeds for the same object reference. Creating another object with equal fields creates a different key.

### 11. Which array operation mutates the original array?

- A. sort()
- B. map()
- C. filter()
- D. slice()

**Answer: A.**

**Explanation:** sort changes the array it is called on. map, filter, and slice return new arrays.

### 12. How should numbers usually be sorted in ascending order with sort()?

- A. values.sort((a, b) => a - b)
- B. values.sort()
- C. values.sort((a, b) => String(a) + String(b))
- D. values.sort(Boolean)

**Answer: A.**

**Explanation:** The comparator returns a negative, zero, or positive number based on numeric order. Without a comparator, sort compares string representations.

### 13. What does a shallow copy of an array containing objects copy?

- A. The outer array, while nested object references remain shared
- B. The outer array and every nested object recursively
- C. Nothing, it creates an alias
- D. Only the first item

**Answer: A.**

**Explanation:** Spread syntax and slice copy the array container, not nested objects.

### 14. Which statement about a typed array is true?

- A. It provides indexed values in a specific numeric format over binary memory
- B. It can contain arbitrary JavaScript values
- C. Array.isArray() always returns true for it
- D. It always supports push() and pop()

**Answer: A.**

**Explanation:** Typed arrays represent numeric values with defined formats. They are array-like but are not ordinary arrays.

### 15. Which type is useful for reading binary fields with explicit byte order?

- A. DataView
- B. WeakSet
- C. Date
- D. Promise

**Answer: A.**

**Explanation:** DataView provides methods for reading and writing different numeric formats with an explicit endianness choice.

### 16. Which pattern provides last-in, first-out behavior with an array?

- A. push() to add and pop() to remove
- B. push() to add and shift() to remove
- C. unshift() to add and pop() to remove
- D. map() to add and filter() to remove

**Answer: A.**

**Explanation:** A stack removes the most recently added item first. Array push and pop operate at the same end.

### 17. Why might a queue use a head index instead of repeatedly calling shift()?

- A. It avoids shifting the remaining indexed values on every removal
- B. It makes the queue unordered
- C. It converts each item to a string
- D. It prevents adding new items

**Answer: A.**

**Explanation:** A head index advances to the next item. A queue can later compact consumed entries when appropriate.

### 18. Which array contains a missing slot rather than an explicit undefined value at index 1?

- A. [1, , 3]
- B. [1, undefined, 3]
- C. [undefined]
- D. [1, 3]

**Answer: A.**

**Explanation:** The omitted value creates an empty slot. An explicit undefined occupies an existing array index.

## Short-answer questions

### 19. When should you use an object instead of a Map?

**Answer:** Use an object when its properties are known named fields that describe one record, such as a user with an id, name, and active flag.

**Explanation:** Objects communicate a fixed record shape. A Map is usually clearer for dynamic entries or keys of different types.

### 20. What is one reason to prefer Map over an ordinary object for keys from external input?

**Answer:** Map has explicit key operations and does not expose inherited object properties as entries.

**Explanation:** Objects have prototypes and property lookup can include inherited names. A Map is designed for dynamic key-value associations.

### 21. What is the difference between an empty array slot and an explicit undefined value?

**Answer:** An empty slot has no array element at that index, while explicit undefined is a present element whose value is undefined.

**Explanation:** Some array methods skip empty slots but process explicit undefined values.

### 22. Why should Object.hasOwn be used for own-property checks?

**Answer:** It reports whether the object itself contains the property, even if the property value is undefined.

**Explanation:** Testing the value directly can confuse an absent property with a present property set to undefined. A normal lookup can also see inherited values.

### 23. What does it mean that object keys in Map use identity?

**Answer:** The exact same object reference can retrieve its entry, but another object with equal fields is a different key.

**Explanation:** Objects are compared by identity rather than by a deep comparison of their properties.

### 24. Why can a WeakMap not provide a reliable list of all its keys?

**Answer:** Its keys may become eligible for garbage collection when no other strong references exist, so membership can change without an explicit deletion.

**Explanation:** Exposing enumeration or a size would make program output depend on garbage-collection timing.

### 25. What is the difference between an ArrayBuffer and a typed array view?

**Answer:** An ArrayBuffer represents binary memory. A typed array view interprets part of that memory as indexed values of one numeric format.

**Explanation:** Multiple views can interpret the same underlying bytes in different ways. DataView is useful for fields with mixed formats or explicit byte order.

### 26. What does a shallow copy preserve?

**Answer:** It creates a new outer array or object while preserving references to nested values.

**Explanation:** Mutating a nested object through either copy is visible through the other reference unless the nested value is also copied.

### 27. Why does sort() need a comparator for numeric sorting?

**Answer:** Without a comparator, sort orders values by their string representations.

**Explanation:** A comparator such as (a, b) => a - b defines numeric ascending order.

### 28. How can a Set help when removing duplicate primitive values from an array?

**Answer:** Construct a Set from the values, then convert it back to an array.

**Explanation:** Set keeps one occurrence of each value and preserves insertion order during iteration.

## Scenario questions

### 29. A program stores fields for one known user record. Which structure is a good fit?

**Answer:** Use an object with named properties.

**Explanation:** The data has a known shape, so object property names make its purpose clear.

### 30. A cache must use object instances as keys and iterate over all entries. Should it use WeakMap?

**Answer:** Use Map if iteration is required.

**Explanation:** WeakMap intentionally does not expose its keys or entries. Map supports iteration and an entry count.

### 31. A list of selected tags must contain each tag only once. Which structure fits?

**Answer:** Use a Set.

**Explanation:** Set enforces uniqueness and offers has, add, and delete operations for membership management.

### 32. A request history needs the newest page removed first. What array operations express this?

**Answer:** Add pages with push() and remove the newest page with pop().

**Explanation:** These operations model a last-in, first-out stack.

### 33. A work queue processes thousands of items. Why might repeated shift() be a poor choice?

**Answer:** Removing the first element can require reindexing remaining elements. A head index avoids doing that for every dequeue.

**Explanation:** Use a simple array and shift for small queues when clarity is more important. For larger queues, choose and measure a queue strategy appropriate to the workload.

### 34. Sorting a score array changes the order used by another part of the application. How should you avoid that?

**Answer:** Copy the array before sorting it, for example with [...scores].sort((a, b) => a - b).

**Explanation:** sort mutates its receiver. Sorting a copy preserves the original sequence.

### 35. An object needs extra metadata, but that metadata should not keep the object alive. Which collection could help?

**Answer:** A WeakMap keyed by the object.

**Explanation:** A WeakMap does not strongly retain its keys. It is suitable when the metadata follows the object's lifetime and does not need enumeration.

## Coding questions

### 36. Count how many times each word appears using a Map.

**Answer:**

~~~js
function countWords(words) {
  const counts = new Map();

  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return counts;
}

const counts = countWords(["red", "blue", "red"]);
console.log(counts.get("red")); // 2
console.log(counts.get("blue")); // 1
~~~

**Explanation:** Map stores one count per word. The nullish coalescing operator supplies zero when the word has no count yet.

### 37. Return unique values while preserving their first-seen order.

**Answer:**

~~~js
function uniqueValues(values) {
  return [...new Set(values)];
}

console.log(uniqueValues(["a", "b", "a", "c"]));
// ["a", "b", "c"]
~~~

**Explanation:** A Set stores unique values and iterates them in insertion order. Spreading creates an array of those values.

### 38. Implement a stack with an array.

**Answer:**

~~~js
function createStack() {
  const values = [];

  return {
    push(value) {
      values.push(value);
    },

    pop() {
      return values.pop();
    },

    get size() {
      return values.length;
    },
  };
}

const stack = createStack();
stack.push("first");
stack.push("last");

console.log(stack.pop()); // "last"
console.log(stack.size); // 1
~~~

**Explanation:** push and pop both operate at the end of the array, so the most recently added value is removed first.

### 39. Make a shallow copy and show that a nested object is still shared.

**Answer:**

~~~js
const original = [{ name: "Mina" }];
const copy = [...original];

copy.push({ name: "Ravi" });
copy[0].name = "Leah";

console.log(original.length); // 1
console.log(original[0].name); // "Leah"
~~~

**Explanation:** The spread creates a distinct outer array, but both arrays still refer to the same first object.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [131 - Node.js debugging, diagnostics, and profiling](../lessons/131-node-js-debugging-diagnostics-and-profiling.md) | [Lesson 132](../lessons/132-data-structures-in-javascript.md) | [Open example](../examples/132-data-structures-in-javascript.md) | [133 - Algorithmic thinking, complexity, and common patterns](../lessons/133-algorithmic-thinking-complexity-and-common-patterns.md) |
