# 65 - Map and Set collections: Examples

These examples demonstrate map entries, set uniqueness, key equality, iteration, conversions, and collection choices. Each example includes a task, complete code, expected output, and an explanation.

## 1. Store values under string keys

**Task:** Create a map of course scores and read one score.

~~~js
const scores = new Map();

scores.set("Asha", 92);
scores.set("Mina", 87);

console.log(scores.get("Asha"));
console.log(scores.size);
~~~

Expected output:

~~~text
92
2
~~~

**Explanation:** **set()** inserts entries, **get()** reads them, and **size** reports the number of map entries.

## 2. Keep number and string keys separate

**Task:** Store two entries whose keys look similar but have different types.

~~~js
const values = new Map();

values.set(1, "number key");
values.set("1", "string key");

console.log(values.get(1));
console.log(values.get("1"));
console.log(values.size);
~~~

Expected output:

~~~text
number key
string key
2
~~~

**Explanation:** Map keys are not converted to strings. The numeric key **1** and string key **"1"** identify separate entries.

## 3. Use an object as a map key

**Task:** Associate metadata with one exact object reference.

~~~js
const user = { id: "u-7", name: "Asha" };
const lastSeen = new Map();

lastSeen.set(user, "today");

console.log(lastSeen.get(user));
console.log(lastSeen.get({ id: "u-7", name: "Asha" }));
~~~

Expected output:

~~~text
today
undefined
~~~

**Explanation:** The second lookup creates a different object. Map object keys use identity, not matching properties.

## 4. Distinguish a missing entry from an undefined value

**Task:** Store **undefined** deliberately and check whether the key exists.

~~~js
const results = new Map();
results.set("empty-result", undefined);

console.log(results.get("empty-result"));
console.log(results.has("empty-result"));
console.log(results.has("missing-result"));
~~~

Expected output:

~~~text
undefined
true
false
~~~

**Explanation:** **get()** alone cannot distinguish a missing key from a key whose stored value is **undefined**. Use **has()** when presence matters.

## 5. Update a map entry without changing its position

**Task:** Update one entry, then delete and reinsert another.

~~~js
const stages = new Map([
  ["design", 1],
  ["build", 2],
  ["review", 3]
]);

stages.set("design", 10);
stages.delete("build");
stages.set("build", 20);

console.log(Array.from(stages, ([name, value]) => name + "=" + value).join(", "));
~~~

Expected output:

~~~text
design=10, review=3, build=20
~~~

**Explanation:** Updating **design** does not move it. Removing **build** and adding it again places it at the end.

## 6. Iterate over map entries

**Task:** Print each product and its quantity in insertion order.

~~~js
const stock = new Map([
  ["Pen", 12],
  ["Notebook", 5],
  ["Folder", 8]
]);

for (const [product, quantity] of stock) {
  console.log(product + ": " + quantity);
}
~~~

Expected output:

~~~text
Pen: 12
Notebook: 5
Folder: 8
~~~

**Explanation:** The default map iterator yields **[key, value]** pairs in insertion order.

## 7. Read only map keys or values

**Task:** List all keys and values separately.

~~~js
const capitals = new Map([
  ["India", "New Delhi"],
  ["Japan", "Tokyo"]
]);

console.log(Array.from(capitals.keys()).join(", "));
console.log(Array.from(capitals.values()).join(", "));
~~~

Expected output:

~~~text
India, Japan
New Delhi, Tokyo
~~~

**Explanation:** **keys()** and **values()** return iterators. **Array.from()** converts each iterator into an array.

## 8. Use Map forEach argument order

**Task:** Print each map key and value using **forEach**.

~~~js
const points = new Map([
  ["north", 3],
  ["south", 5]
]);

points.forEach((value, key) => {
  console.log(key + " has " + value);
});
~~~

Expected output:

~~~text
north has 3
south has 5
~~~

**Explanation:** Map **forEach** receives value first and key second. A **for...of** loop instead yields **[key, value]** pairs.

## 9. Delete one entry and clear the rest

**Task:** Use the boolean return from **delete()**, then remove all remaining entries.

~~~js
const jobs = new Map([
  ["j1", "queued"],
  ["j2", "running"]
]);

console.log(jobs.delete("j1"));
console.log(jobs.size);
jobs.clear();
console.log(jobs.size);
~~~

Expected output:

~~~text
true
1
0
~~~

**Explanation:** **delete()** reports whether the key existed. **clear()** removes every entry.

## 10. Store each primitive only once in a set

**Task:** Create a set from repeated tags.

~~~js
const tags = new Set(["html", "css", "html", "javascript", "css"]);

console.log(tags.size);
console.log(Array.from(tags).join(", "));
~~~

Expected output:

~~~text
3
html, css, javascript
~~~

**Explanation:** Repeated primitive values produce one set entry. The first-seen insertion order is preserved.

## 11. Check and remove set values

**Task:** Check membership, remove a value, and check again.

~~~js
const roles = new Set(["reader", "editor", "owner"]);

console.log(roles.has("editor"));
console.log(roles.delete("reader"));
console.log(roles.has("reader"));
~~~

Expected output:

~~~text
true
true
false
~~~

**Explanation:** **has()** checks membership and **delete()** removes one value. Both work with the set's value equality rules.

## 12. Observe Set equality for NaN and signed zero

**Task:** Add duplicate **NaN**, **0**, and **-0** values.

~~~js
const numbers = new Set([NaN, NaN, 0, -0]);

console.log(numbers.size);
console.log(numbers.has(NaN));
console.log(numbers.has(-0));
~~~

Expected output:

~~~text
2
true
true
~~~

**Explanation:** Set values use **SameValueZero**. It treats **NaN** as equal to itself and positive zero and negative zero as equal.

## 13. Keep distinct object references in a set

**Task:** Add two objects with matching properties and then add the first reference again.

~~~js
const first = { code: "x" };
const second = { code: "x" };
const items = new Set();

items.add(first);
items.add(second);
items.add(first);

console.log(items.size);
console.log(items.has(first));
console.log(items.has({ code: "x" }));
~~~

Expected output:

~~~text
2
true
false
~~~

**Explanation:** The two object literals are distinct references, so both are stored. Adding **first** again does not create another entry.

## 14. Find requested permissions that are granted

**Task:** Filter an array using set membership.

~~~js
const granted = new Set(["read", "write"]);
const requested = ["read", "delete", "write"];

const allowed = requested.filter((permission) => granted.has(permission));
console.log(allowed.join(", "));
~~~

Expected output:

~~~text
read, write
~~~

**Explanation:** The set models membership, while the array keeps the requested order and supplies the values to filter.

## 15. Use Set forEach

**Task:** See the arguments passed to a set's **forEach** callback.

~~~js
const codes = new Set(["A1", "B2"]);

codes.forEach((value, sameValue, collection) => {
  console.log(
    value + ":" +
    (value === sameValue) + ":" +
    (collection === codes)
  );
});
~~~

Expected output:

~~~text
A1:true:true
B2:true:true
~~~

**Explanation:** Set **forEach** receives the value twice and the set as the third argument. Most code can use **for...of** for simpler value iteration.

## 16. Convert a set to an array for array methods

**Task:** Convert unique colors to uppercase labels.

~~~js
const colors = new Set(["blue", "green", "blue"]);
const labels = [...colors].map((color) => color.toUpperCase());

console.log(labels.join(", "));
~~~

Expected output:

~~~text
BLUE, GREEN
~~~

**Explanation:** A set does not provide array methods such as **map()**. Convert it to an array when array operations are needed.

## 17. Count words with a map

**Task:** Build a frequency map from a list of words.

~~~js
const words = ["red", "blue", "red", "green", "blue", "red"];
const counts = new Map();

for (const word of words) {
  const count = counts.get(word) ?? 0;
  counts.set(word, count + 1);
}

for (const [word, count] of counts) {
  console.log(word + ": " + count);
}
~~~

Expected output:

~~~text
red: 3
blue: 2
green: 1
~~~

**Explanation:** Each word is a key and its count is the associated value. The map keeps the order in which unique words first appeared.

## 18. Build a map from entry pairs

**Task:** Initialize a map from an array and update one value.

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

Expected output:

~~~text
2
3
~~~

**Explanation:** The map constructor accepts an iterable of **[key, value]** pairs. Updating **draft** replaces the existing value.

## 19. Turn map entries into descriptions

**Task:** Use array transformation on the entries of a map.

~~~js
const inventory = new Map([
  ["pen", 3],
  ["book", 2]
]);

const descriptions = Array.from(inventory, ([name, quantity]) => {
  return name + ": " + quantity;
});

console.log(descriptions.join(" | "));
~~~

Expected output:

~~~text
pen: 3 | book: 2
~~~

**Explanation:** **Array.from()** can convert an iterable and apply a mapping function to each item. Each map item is a key-value pair.

## 20. Convert a map to a JSON-compatible entry array

**Task:** Serialize a map with string keys and values.

~~~js
const settings = new Map([
  ["theme", "dark"],
  ["language", "en"]
]);

console.log(JSON.stringify(Array.from(settings)));
~~~

Expected output:

~~~text
[["theme","dark"],["language","en"]]
~~~

**Explanation:** JSON has no map type, so an array of entry pairs is an explicit representation. This preserves the pair order and works clearly for these string keys.

## 21. Convert a set to a JSON-compatible array

**Task:** Serialize a set of string values.

~~~js
const features = new Set(["search", "offline"]);

console.log(JSON.stringify([...features]));
~~~

Expected output:

~~~text
["search","offline"]
~~~

**Explanation:** A set can be represented as an array of its values. Decide how to restore uniqueness when parsing if the consumer needs a set again.

## 22. Avoid bracket syntax for map entries

**Task:** Compare an ordinary property with an actual map entry.

~~~js
const map = new Map();

map.status = "ordinary property";
map.set("status", "map entry");

console.log(map.status);
console.log(map.get("status"));
console.log(map.size);
~~~

Expected output:

~~~text
ordinary property
map entry
1
~~~

**Explanation:** Bracket or dot assignment changes ordinary properties on the map object. **set()** creates a collection entry, and **size** counts only collection entries.

## 23. Use a map safely with a special-looking string key

**Task:** Store a string key that can be awkward in object-based dictionaries.

~~~js
const dictionary = new Map();

dictionary.set("__proto__", "stored value");

console.log(dictionary.has("__proto__"));
console.log(dictionary.get("__proto__"));
~~~

Expected output:

~~~text
true
stored value
~~~

**Explanation:** The string is simply a map key. A map's entries are separate from its object prototype and ordinary properties.

## 24. Copy a map and notice that copying is shallow

**Task:** Make a new map and mutate an object value through the copy.

~~~js
const settings = new Map([
  ["display", { theme: "light" }]
]);

const copy = new Map(settings);
copy.get("display").theme = "dark";

console.log(settings.get("display").theme);
console.log(copy !== settings);
~~~

Expected output:

~~~text
dark
true
~~~

**Explanation:** The new map has its own entry structure, but the object value is the same reference in both maps. Constructing a new map does not deep-clone its keys or values.

## 25. Convert a record into a map

**Task:** Convert a plain object with known fields to map entries.

~~~js
const user = {
  name: "Mina",
  role: "editor"
};

const fields = new Map(Object.entries(user));

console.log(fields.get("name"));
console.log(fields.size);
~~~

Expected output:

~~~text
Mina
2
~~~

**Explanation:** **Object.entries()** creates string-keyed pairs for an object's enumerable own properties. This is useful when a record needs to be processed as entries, but it does not make object and map semantics identical.

## 26. Build a lookup by identifier

**Task:** Find user records quickly by their stable IDs.

~~~js
const users = [
  { id: "u1", name: "Asha" },
  { id: "u2", name: "Mina" }
];

const usersById = new Map(
  users.map((user) => [user.id, user])
);

console.log(usersById.get("u2").name);
~~~

Expected output:

~~~text
Mina
~~~

**Explanation:** The map uses each stable string identifier as a key and keeps the full user object as the value.

## 27. Find the intersection of two sets

**Task:** Find tags that appear in both sets.

~~~js
const selected = new Set(["html", "css", "javascript"]);
const supported = new Set(["css", "javascript", "python"]);

const common = [...selected].filter((value) => supported.has(value));
console.log(common.join(", "));
~~~

Expected output:

~~~text
css, javascript
~~~

**Explanation:** Iterating the first set and checking membership in the second produces the intersection. The result order follows the first set.

## 28. Find values missing from another set

**Task:** Find requested features that are not available.

~~~js
const available = new Set(["search", "offline"]);
const requested = new Set(["search", "sync", "export"]);

const unavailable = [...requested].filter((value) => !available.has(value));
console.log(unavailable.join(", "));
~~~

Expected output:

~~~text
sync, export
~~~

**Explanation:** Negating **has()** selects values from the requested set that are absent from the available set.

## 29. Choose a structure for a user profile

**Task:** Represent a profile whose fields are known.

~~~js
const profile = {
  name: "Lee",
  email: "lee@example.test"
};

console.log(profile.name);
console.log(Object.keys(profile).length);
~~~

Expected output:

~~~text
Lee
2
~~~

**Explanation:** A plain object clearly models a record with named fields. A map would be more appropriate if the keys were dynamic data or arbitrary values.

## 30. Choose a structure for unique labels

**Task:** Add labels from several sources and show each label once.

~~~js
const labels = new Set();

for (const label of ["beginner", "html", "beginner"]) {
  labels.add(label);
}

for (const label of ["html", "accessibility"]) {
  labels.add(label);
}

console.log([...labels].join(", "));
~~~

Expected output:

~~~text
beginner, html, accessibility
~~~

**Explanation:** A set naturally expresses uniqueness and preserves first-seen insertion order. An array would require separate duplicate-checking logic.

## Review checklist

For each example, make sure you can identify:

- Whether the data is a sequence, a record, a keyed collection, or a unique membership collection.
- How keys and values are compared.
- Whether a method call is changing a map entry or an ordinary property.
- How iteration order is determined.
- Whether a conversion preserves the needed key and identity semantics.
- Whether a copied collection still shares object references.
- What structure best matches the operation the code needs.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [64 - Composition, delegation, and mixins](../lessons/064-composition-delegation-and-mixins.md) | [Open lesson](../lessons/065-map-and-set-collections.md) | [Open Q&A](../qnas/065-map-and-set-collections.md) | [66 - WeakMap and WeakSet](../lessons/066-weakmap-and-weakset.md) |
