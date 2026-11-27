# 65 - Map and Set collections: Q&A

This question set reviews how maps store keyed entries, how sets enforce uniqueness, how both collections compare values, and how to iterate and convert them. Each answer follows its question with an explanation or expected output.

## Multiple-choice questions

### 1. Which value can be used as a key in a **Map**?


- A. Only strings
- B. Only strings and symbols
- C. Any JavaScript value
- D. Only numbers

**Answer: C.** A map key may be a primitive or an object. Object keys are compared by identity.

### 2. Which method reads the value associated with a map key?


- A. **map.read(key)**
- B. **map.get(key)**
- C. **map[key]**
- D. **map.value(key)**

**Answer: B.** **get(key)** reads a map entry. Bracket syntax accesses an ordinary property on the map object, not an entry.

### 3. What does adding the same primitive value twice to a set do?


- A. It creates two entries.
- B. It replaces the set with an array.
- C. The second addition leaves one unique value in the set.
- D. It throws an error.

**Answer: C.** A set stores each value at most once according to **SameValueZero** equality.

### 4. How does a map compare two object keys?


- A. By comparing all of their properties deeply
- B. By comparing their object identity
- C. By converting them to JSON first
- D. By comparing their constructor names

**Answer: B.** Two different object references are different map keys even when their properties have the same values.

### 5. What does **map.has(key)** help distinguish?


- A. A key with an **undefined** value from a key that is absent
- B. A number from a string in all objects
- C. An inherited property from an own property
- D. A map from a set

**Answer: A.** **get()** returns **undefined** both when a key is missing and when its stored value is **undefined**. **has()** tells whether the key exists.

### 6. What order does the default map iterator yield?


- A. **[value, key]** pairs in sorted order
- B. **[key, value]** pairs in insertion order
- C. Keys only in reverse order
- D. Values only in insertion order

**Answer: B.** A map's default iterator yields its entries as **[key, value]** pairs in insertion order.

### 7. What are the first two arguments passed to a map's **forEach** callback?


- A. Key, then value
- B. Value, then key
- C. Index, then value
- D. Map, then key

**Answer: B.** Map **forEach** calls the callback with value first, key second, and the map third.

### 8. What does **Object.assign({}, map)** copy from a map's entries?


- A. Every key-value entry
- B. The entries as indexed properties
- C. Normally none of the map entries
- D. A deep copy of all keys and values

**Answer: C.** Map entries are not ordinary enumerable own properties. **Object.assign** does not copy them as entries.

### 9. What does **JSON.stringify(new Set(["a"]))** normally produce?


- A. **["a"]**
- B. **{"a": true}**
- C. **{}**
- D. It always throws

**Answer: C.** JSON does not directly serialize set entries. Convert the set to a JSON-compatible structure such as an array first.

### 10. Which collection best represents a record with known fields such as **name** and **email**?


- A. A plain object
- B. A **Set**
- C. A **Map** in every case
- D. A **WeakSet**

**Answer: A.** A plain object clearly models a record with named fields. A map is often clearer for a dynamic collection of arbitrary keys.

## True or false

### 11. A map can use an object as a key.

**Answer: True.** Any JavaScript value can be a map key, including objects and functions.

### 12. Two separate object literals with the same properties are the same set value.

**Answer: False.** Objects are compared by identity. Each object literal creates a distinct reference.

### 13. Updating an existing map key with **set()** creates a duplicate entry.

**Answer: False.** A map has one entry per key. Setting the key again replaces its value.

### 14. A map and a set both preserve insertion order during iteration.

**Answer: True.** Their iterators visit entries or values in insertion order. Updating an existing map key does not move it to a new position.

### 15. **map.get(key) === undefined** proves that the key is absent.

**Answer: False.** The map might contain the key with the value **undefined**. Use **map.has(key)** to check membership.

### 16. Positive zero and negative zero are distinct map keys.

**Answer: False.** Map key equality uses **SameValueZero**, which treats **0** and **-0** as the same key.

### 17. A set can contain two different objects that have identical properties.

**Answer: True.** The objects are different references, so both can be present.

### 18. Assigning **map.status = "ready"** adds a map entry with the key **"status"**.

**Answer: False.** That creates an ordinary property on the map object. Use **map.set("status", "ready")** to add an entry.

## Predict the output

### 19. Are the number key and string key distinct?

~~~js
const values = new Map();
values.set(1, "number");
values.set("1", "string");

console.log(values.get(1));
console.log(values.get("1"));
console.log(values.size);
~~~

**Answer:**

~~~text
number
string
2
~~~

**Explanation:** Map keys are not coerced to strings. The number **1** and string **"1"** are distinct keys.

### 20. Can the second object retrieve the first object's entry?

~~~js
const first = { id: 4 };
const second = { id: 4 };
const map = new Map();

map.set(first, "saved");

console.log(map.get(second));
console.log(map.get(first));
~~~

**Answer:**

~~~text
undefined
saved
~~~

**Explanation:** Object keys use identity, not deep property comparison. Only **first** is the stored key reference.

### 21. How many values remain?

~~~js
const values = new Set([NaN, NaN, 0, -0]);

console.log(values.size);
console.log(values.has(NaN));
~~~

**Answer:**

~~~text
2
true
~~~

**Explanation:** **NaN** matches **NaN**, and **0** matches **-0** under **SameValueZero**.

### 22. What is the iteration order after updating and reinserting a key?

~~~js
const map = new Map([
  ["a", 1],
  ["b", 2]
]);

map.set("a", 3);
map.delete("b");
map.set("b", 4);

console.log(Array.from(map, ([key, value]) => key + value).join(", "));
~~~

**Answer:**

~~~text
a3, b4
~~~

**Explanation:** Updating **a** leaves it in its original position. Deleting **b** removes it, and adding it again places it at the end.

### 23. Which values are printed from this set?

~~~js
const tags = new Set(["html", "css", "html"]);

console.log(tags.size);
console.log(Array.from(tags).join(", "));
~~~

**Answer:**

~~~text
2
html, css
~~~

**Explanation:** The repeated string is stored once. Iteration preserves the first insertion order.

### 24. What are the callback arguments in this map's **forEach**?

~~~js
const map = new Map([["x", 7]]);

map.forEach((value, key) => {
  console.log(value + ":" + key);
});
~~~

**Answer:**

~~~text
7:x
~~~

**Explanation:** Map **forEach** supplies value before key. Iterating the map itself instead yields a **[key, value]** pair.

### 25. What values are printed?

~~~js
const map = new Map();
map.set("result", undefined);

console.log(map.get("result"));
console.log(map.has("result"));
console.log(map.has("missing"));
~~~

**Answer:**

~~~text
undefined
true
false
~~~

**Explanation:** **get()** returns the stored **undefined** value. **has()** distinguishes that present key from a missing one.

### 26. What does direct JSON serialization produce?

~~~js
const map = new Map([["theme", "dark"]]);
const set = new Set(["html", "css"]);

console.log(JSON.stringify(map));
console.log(JSON.stringify(set));
~~~

**Answer:**

~~~text
{}
{}
~~~

**Explanation:** Map and set entries are not serialized as ordinary object properties. Convert them to arrays or another intentional JSON shape.

### 27. What is printed when a set's **forEach** callback compares its first two arguments?

~~~js
const values = new Set(["a"]);

values.forEach((value, sameValue) => {
  console.log(value === sameValue);
});
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** Set **forEach** passes the value twice, followed by the set, for compatibility with map-style callback signatures.

### 28. Does bracket assignment change the map's entry count?

~~~js
const map = new Map();
map.status = "ready";

console.log(map.get("status"));
console.log(map.status);
console.log(map.size);
~~~

**Answer:**

~~~text
undefined
ready
0
~~~

**Explanation:** **status** is an ordinary property on the map object, not a map entry. **size** counts entries created with map operations.

## Short-answer questions

### 29. What is the difference between a map key and an ordinary object property key?

**Answer:** A map key can be any JavaScript value and is not automatically converted to a string. Ordinary object property keys are strings or symbols, with other values converted to property keys.

### 30. Why can **has()** be more useful than checking **get()** against **undefined**?

**Answer:** A map may intentionally store **undefined**. **get()** returns **undefined** for both that case and a missing key, while **has()** distinguishes them.

### 31. How does a set decide whether a value is already present?

**Answer:** It uses **SameValueZero** equality. Primitive values are compared by value with **NaN** matching itself and both zero signs treated as equal. Objects are compared by identity.

### 32. How does map iteration differ from map **forEach** argument order?

**Answer:** Iteration yields **[key, value]** pairs. The **forEach** callback receives **value**, then **key**, then the map.

### 33. What happens to a map entry's position when its value is updated?

**Answer:** Updating an existing key replaces the value without moving the entry. Deleting and adding the key again creates a new entry at the end.

### 34. What does **size** measure on a map or set?

**Answer:** It reports the number of entries in a map or unique values in a set. It is a property, not a method, so use **map.size** or **set.size**.

### 35. Why does a set not remove separate objects with equal-looking properties?

**Answer:** Sets do not perform deep equality. The two objects have different identities, so both are distinct values.

### 36. How can an array be converted to a sequence of unique values?

**Answer:** Construct a set from the array and convert it back, for example **[...new Set(values)]**. This removes duplicate values according to set equality and keeps first-seen order.

### 37. Why does JSON serialization need an explicit conversion for maps and sets?

**Answer:** JSON represents arrays and ordinary object properties, but it has no built-in map or set type. Convert to an array of entries or values when that representation preserves the needed meaning.

### 38. When should a plain object be preferred over a map?

**Answer:** Use a plain object for a record with known named fields, such as a user with **name** and **email**. A map is often clearer for dynamic keys, arbitrary key types, explicit membership checks, and collection iteration.

## Coding and design questions

### 39. Count how many times each word appears in an array.

**Answer:**

~~~js
const words = ["red", "blue", "red", "green", "blue", "red"];
const counts = new Map();

for (const word of words) {
  const current = counts.get(word) ?? 0;
  counts.set(word, current + 1);
}

for (const [word, count] of counts) {
  console.log(word + ": " + count);
}
~~~

Output:

~~~text
red: 3
blue: 2
green: 1
~~~

**Explanation:** A map stores each distinct word as a key and its current frequency as the value. The nullish coalescing operator supplies zero only when the lookup is **null** or **undefined**.

### 40. Remove duplicate primitive tags while preserving order.

**Answer:**

~~~js
const tags = ["html", "css", "html", "javascript", "css"];
const uniqueTags = [...new Set(tags)];

console.log(uniqueTags.join(", "));
~~~

Output:

~~~text
html, css, javascript
~~~

**Explanation:** The set retains the first occurrence of each string and preserves its insertion order.

### 41. Use object identity to associate data with a specific object.

**Answer:**

~~~js
const firstUser = { name: "Asha" };
const secondUser = { name: "Mina" };
const visits = new Map();

visits.set(firstUser, 3);
visits.set(secondUser, 5);

console.log(visits.get(firstUser));
console.log(visits.get({ name: "Asha" }));
~~~

Output:

~~~text
3
undefined
~~~

**Explanation:** The first lookup uses the original key reference. The new object in the second lookup is a different identity even though its property matches.

### 42. Distinguish a missing key from a key that stores **undefined**.

**Answer:**

~~~js
const responses = new Map();
responses.set("empty", undefined);

function describe(key) {
  if (!responses.has(key)) {
    return "missing";
  }

  return "present: " + responses.get(key);
}

console.log(describe("empty"));
console.log(describe("other"));
~~~

Output:

~~~text
present: undefined
missing
~~~

**Explanation:** Check **has()** before interpreting the value when **undefined** is a valid stored result.

### 43. Find granted permissions that are also requested.

**Answer:**

~~~js
const granted = new Set(["read", "write"]);
const requested = ["read", "delete", "write"];

const allowed = requested.filter((permission) => granted.has(permission));
console.log(allowed.join(", "));
~~~

Output:

~~~text
read, write
~~~

**Explanation:** A set gives a direct membership operation. The requested array preserves the order of the filtered results.

### 44. Convert map entries into a JSON string.

**Answer:**

~~~js
const settings = new Map([
  ["theme", "dark"],
  ["language", "en"]
]);

const json = JSON.stringify(Array.from(settings));
console.log(json);
~~~

Output:

~~~text
[["theme","dark"],["language","en"]]
~~~

**Explanation:** The array of entries is a JSON-compatible representation for string keys and values. If map keys are objects or mixed types, define how those key meanings should be represented before serializing.

### 45. Convert an array of pairs into a map and update one value.

**Answer:**

~~~js
const entries = [
  ["draft", 1],
  ["published", 2]
];

const counts = new Map(entries);
counts.set("draft", 3);

console.log(counts.size);
console.log(counts.get("draft"));
~~~

Output:

~~~text
2
3
~~~

**Explanation:** The iterable constructor accepts key-value pairs. Updating **draft** replaces its value and does not create another entry.

### 46. Use a map to cache a calculation by numeric input.

**Answer:**

~~~js
const squares = new Map();

function square(number) {
  if (squares.has(number)) {
    return squares.get(number);
  }

  const result = number * number;
  squares.set(number, result);
  return result;
}

console.log(square(6));
console.log(square(6));
console.log(squares.size);
~~~

Output:

~~~text
36
36
1
~~~

**Explanation:** **has()** checks whether the cache already contains the input. This remains reliable even if a valid cached result could be **undefined**.

### 47. Create a map from records using each record's identifier.

**Answer:**

~~~js
const users = [
  { id: "u1", name: "Asha" },
  { id: "u2", name: "Mina" }
];

const usersById = new Map(users.map((user) => [user.id, user]));

console.log(usersById.get("u2").name);
~~~

Output:

~~~text
Mina
~~~

**Explanation:** Each user becomes a **[key, value]** pair. The identifier is a stable primitive key, while the full record is the value.

### 48. Decide which collection fits each task.

**Answer:**

- Store one user's known fields such as **name** and **email**: use a plain object.
- Keep tasks in a display sequence where duplicates are allowed: use an array.
- Associate arbitrary object references with metadata: use a map.
- Track unique selected category names: use a set.

**Explanation:** Choose the structure from the operations and meaning of the data. A collection should make the intended access pattern clear.

## Review checklist

Before moving on, make sure you can explain:

- How **Map** and **Set** store values and preserve insertion order.
- Why object keys and values are compared by identity.
- What **SameValueZero** means for **NaN** and signed zero.
- The distinction between map entries and ordinary properties on the map object.
- The difference between a map iterator and the **forEach** callback signature.
- How to convert collections without losing important key semantics.
- Why maps and sets need explicit conversion for JSON serialization.
- When to choose an array, object, map, or set.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [64 - Composition, delegation, and mixins](../lessons/064-composition-delegation-and-mixins.md) | [Open lesson](../lessons/065-map-and-set-collections.md) | [Open example](../examples/065-map-and-set-collections.md) | [66 - WeakMap and WeakSet](../lessons/066-weakmap-and-weakset.md) |
