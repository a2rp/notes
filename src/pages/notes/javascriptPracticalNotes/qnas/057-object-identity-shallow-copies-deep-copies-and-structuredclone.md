# 57 - Object identity, shallow copies, deep copies, and structuredClone: Q&A

This Q&A reviews object identity, aliases, shallow copies, structured cloning, JSON serialization, cycles, and transferable resources. Each answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. What does this assignment create?

~~~js
const second = first;
~~~

A. A deep copy of first  
B. A shallow copy of first  
C. Another reference to the same object  
D. A serialized version of first

**Answer: C. Another reference to the same object.**

**Explanation:** Assigning an object value copies its reference. Mutations through either variable affect the same object.

### 2. What does === compare when both operands are objects?

A. Whether their properties are in the same order  
B. Whether they refer to the same object  
C. Whether their JSON strings match  
D. Whether they have the same prototype

**Answer: B. Whether they refer to the same object.**

**Explanation:** Object equality with === checks identity. Two separate objects can have equal-looking data and still compare false.

### 3. What does an array spread copy do with nested object values?

A. It deep-clones them  
B. It preserves their references  
C. It serializes them  
D. It deletes them

**Answer: B. It preserves their references.**

**Explanation:** Array spread creates a new outer array, but it copies nested object references unchanged.

### 4. What is the main result of structuredClone on a supported nested data object?

A. It returns the original object  
B. It creates a deep clone of supported data  
C. It converts the object to JSON text  
D. It freezes the input

**Answer: B. It creates a deep clone of supported data.**

**Explanation:** structuredClone can create independent nested data, but it does not preserve every JavaScript behavior such as arbitrary class prototypes or methods.

### 5. What happens to a circular reference when its object is cloned with structuredClone?

A. The clone operation always loops forever  
B. The cycle is preserved in the cloned graph  
C. The circular property is always removed  
D. It becomes the string "[Circular]"

**Answer: B. The cycle is preserved in the cloned graph.**

**Explanation:** The structured clone algorithm tracks visited references, so it can represent cycles.

### 6. What happens if the value being cloned contains a function?

A. The function is copied exactly  
B. The function becomes null  
C. structuredClone throws a cloning error  
D. The function is converted to source text

**Answer: C. structuredClone throws a cloning error.**

**Explanation:** Functions are not structured-cloneable values. A function anywhere in the object graph causes the clone operation to fail.

### 7. Which statement about a custom class instance cloned with structuredClone is most accurate?

A. Its methods and custom prototype are always preserved  
B. Its own data may be cloned, but arbitrary class behavior is not preserved  
C. It becomes a function  
D. It is frozen

**Answer: B. Its own data may be cloned, but arbitrary class behavior is not preserved.**

**Explanation:** Structured cloning is for data, not a general-purpose snapshot of prototypes, methods, or descriptors.

### 8. What happens to an undefined object property in JSON stringify and parse?

~~~js
const copy = JSON.parse(JSON.stringify({ value: undefined }));
~~~

A. It remains present with undefined  
B. It is omitted  
C. It becomes null  
D. It causes JSON.parse to fail

**Answer: B. It is omitted.**

**Explanation:** JSON serialization omits object properties whose values are undefined.

### 9. What does JSON serialization do to NaN in an object property?

A. Keeps NaN  
B. Converts it to null  
C. Omits the whole object  
D. Converts it to a string

**Answer: B. Converts it to null.**

**Explanation:** JSON has no NaN value, so JSON.stringify serializes it as null.

### 10. What happens to the original ArrayBuffer after it is transferred with structuredClone?

A. It remains attached and unchanged  
B. It is detached from its memory  
C. It becomes a string  
D. It is copied to a second JavaScript realm only

**Answer: B. It is detached from its memory.**

**Explanation:** Transfer moves the resource to the result. The original no longer owns or accesses those bytes.

### 11. Which operation creates a new outer object but may keep nested references shared?

A. Direct assignment  
B. Object spread  
C. structuredClone on supported data  
D. JSON.parse of a serialized object

**Answer: B. Object spread.**

**Explanation:** Object spread creates a shallow copy. Its nested values are copied as references.

### 12. Which statement about JSON.parse(JSON.stringify(value)) is correct?

A. It is a universal deep-clone operation  
B. It works only for values representable as JSON and can transform or omit data  
C. It preserves circular references  
D. It preserves Map and Set behavior

**Answer: B. It works only for values representable as JSON and can transform or omit data.**

**Explanation:** JSON conversion drops or changes some values and fails for cycles and BigInt. It also does not preserve Map and Set instances.

## True or false

### 13. Two different object literals with the same properties compare equal with ===.

**Answer: False.**

**Explanation:** They create two separate objects with distinct identities, so === returns false.

### 14. Assigning an object to a new const variable copies the object's properties.

**Answer: False.**

**Explanation:** It copies the object reference. Both variables refer to the same object.

### 15. A shallow copy creates a new outer container.

**Answer: True.**

**Explanation:** The new array or object has a different identity, even though nested references may be shared.

### 16. structuredClone can preserve circular references and repeated references.

**Answer: True.**

**Explanation:** It tracks the object graph while cloning. The clone can preserve cycles and relationships where two source fields share one nested object.

### 17. structuredClone preserves arbitrary getters, setters, and property descriptors.

**Answer: False.**

**Explanation:** It clones data rather than every behavioral detail. Getters can be read as values, and descriptors are not generally preserved.

### 18. A Date can be cloned as a Date with structuredClone.

**Answer: True.**

**Explanation:** Date is among the built-in data types supported by structured cloning.

### 19. JSON serialization preserves a Set as a Set.

**Answer: False.**

**Explanation:** A Set does not serialize as its entries with ordinary JSON.stringify. It commonly becomes an empty object.

### 20. Transferring an ArrayBuffer is the same as making a normal independent copy.

**Answer: False.**

**Explanation:** Transfer moves the resource and detaches the original, while cloning without a transfer list duplicates the supported data.

### 21. A copied nested object can be mutated through both the original and a shallow copy.

**Answer: True.**

**Explanation:** Both outer containers may contain the same nested reference.

### 22. Every JavaScript value can be cloned with structuredClone.

**Answer: False.**

**Explanation:** Functions, symbols, and some other values are not structured-cloneable. The operation can throw.

## Short-answer questions

### 23. What is object identity?

**Answer:** Object identity distinguishes one object from every other object, even if their properties contain the same data.

**Explanation:** With ===, two references compare true only when they refer to the same object.

### 24. What is an alias?

**Answer:** An alias is another variable or property that refers to the same object.

**Explanation:** Assigning an object to another variable creates an alias. Mutations through either reference affect that object.

### 25. What is the difference between a shallow copy and a deep copy?

**Answer:** A shallow copy creates a new outer container but can share nested objects. A deep clone recursively creates independent supported nested data.

**Explanation:** The exact behavior depends on the chosen API. A deep clone may still omit behavior such as custom methods or prototypes.

### 26. Does spread make a deep copy?

**Answer:** No. Array and object spread make shallow copies.

**Explanation:** A new outer container is created, but nested objects remain shared references.

### 27. What does structuredClone preserve about cycles?

**Answer:** It can preserve cyclic links so that a cloned object's cycle refers to the clone, not back to the original.

**Explanation:** This lets it clone cyclic object graphs without infinite recursion.

### 28. Why is structuredClone not a general-purpose clone of class instances?

**Answer:** It does not preserve arbitrary custom prototype chains, methods, getters, setters, or property descriptors.

**Explanation:** It is designed to clone supported data. Recreate domain objects through constructors or explicit code when their behavior must be retained.

### 29. Name two kinds of values that structuredClone cannot clone.

**Answer:** Functions and symbols.

**Explanation:** If an unsupported value is encountered in the data graph, structuredClone throws a cloning error.

### 30. Give two differences between JSON cloning and structuredClone.

**Answer:** JSON conversion omits or changes values such as undefined and NaN, and it cannot represent cycles. structuredClone supports cycles and more built-in data types, though it also has unsupported values.

**Explanation:** JSON should be used when JSON conversion is intended, not as a universal clone mechanism.

### 31. What does transferring an ArrayBuffer do?

**Answer:** It moves the buffer's resource to the clone and detaches the original buffer.

**Explanation:** After transfer, the original no longer has usable bytes. This changes ownership rather than creating a regular copy.

### 32. When is direct assignment the right choice?

**Answer:** When two parts of a program should intentionally share and mutate the same object.

**Explanation:** Assignment is not a copy operation. Use a copying API only when separate identity is desired.

## Predict the output

### 33. What is printed?

~~~js
const first = { value: 1 };
const second = { value: 1 };
const alias = first;

console.log(first === second);
console.log(first === alias);
~~~

**Answer:**

~~~text
false
true
~~~

**Explanation:** first and second are separate objects. alias refers to the same object as first.

### 34. What is printed?

~~~js
const original = { value: 1 };
const alias = original;

alias.value = 5;

console.log(original.value);
console.log(alias === original);
~~~

**Answer:**

~~~text
5
true
~~~

**Explanation:** Both variables refer to the same object, so the mutation is visible through original.

### 35. What is printed?

~~~js
const original = {
    nested: {
        value: 1
    }
};
const copy = { ...original };

copy.nested.value = 8;

console.log(original.nested.value);
console.log(copy === original);
~~~

**Answer:**

~~~text
8
false
~~~

**Explanation:** The outer objects are distinct, but their nested property refers to the same object.

### 36. What is printed?

~~~js
const original = {
    nested: {
        value: 1
    }
};
const copy = structuredClone(original);

copy.nested.value = 8;

console.log(original.nested.value);
console.log(copy.nested.value);
console.log(copy.nested === original.nested);
~~~

**Answer:**

~~~text
1
8
false
~~~

**Explanation:** structuredClone created a separate nested object, so the mutation does not affect the original graph.

### 37. What is printed?

~~~js
const original = {};
original.self = original;

const copy = structuredClone(original);

console.log(copy !== original);
console.log(copy.self === copy);
~~~

**Answer:**

~~~text
true
true
~~~

**Explanation:** The clone is a new object, and its self-reference points back to itself.

### 38. What is printed?

~~~js
const shared = { value: 1 };
const original = { first: shared, second: shared };
const copy = structuredClone(original);

console.log(copy.first === copy.second);
console.log(copy.first === shared);
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The clone preserves the sharing relationship between its two properties, while separating the cloned nested object from the original.

### 39. What is printed?

~~~js
const original = {
    missing: undefined,
    score: NaN
};

const copy = JSON.parse(JSON.stringify(original));

console.log(Object.hasOwn(copy, "missing"));
console.log(copy.score);
~~~

**Answer:**

~~~text
false
null
~~~

**Explanation:** JSON serialization omits the undefined property and converts NaN to null.

### 40. What is printed?

~~~js
const original = {
    date: new Date("2025-01-02T03:04:05.000Z"),
    values: new Set([1, 2])
};

const copy = JSON.parse(JSON.stringify(original));

console.log(typeof copy.date);
console.log(copy.date);
console.log(Object.keys(copy.values).length);
~~~

**Answer:**

~~~text
string
2025-01-02T03:04:05.000Z
0
~~~

**Explanation:** Date is converted to a JSON string. Set entries are not represented by ordinary JSON serialization and this Set becomes an empty object.

### 41. What is printed?

~~~js
const original = new Date("2025-01-02T03:04:05.000Z");
const copy = structuredClone(original);

console.log(copy instanceof Date);
console.log(copy === original);
console.log(copy.toISOString());
~~~

**Answer:**

~~~text
true
false
2025-01-02T03:04:05.000Z
~~~

**Explanation:** structuredClone creates a distinct Date object with the same represented time.

### 42. What is printed?

~~~js
class User {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return "Hello";
    }
}

const copy = structuredClone(new User("Mina"));

console.log(copy.name);
console.log(copy instanceof User);
console.log(typeof copy.greet);
~~~

**Answer:**

~~~text
Mina
false
undefined
~~~

**Explanation:** The own data property is cloned, but the custom class prototype and method are not preserved.

## Coding questions

### 43. Make a shallow array copy and demonstrate which references remain shared.

**Answer:**

~~~js
const original = [{ name: "Asha" }];
const copy = [...original];

copy[0].name = "Mina";

console.log(original !== copy);
console.log(original[0] === copy[0]);
console.log(original[0].name);
~~~

Output:

~~~text
true
true
Mina
~~~

**Explanation:** The arrays are separate, but the nested object is shared.

### 44. Deep-clone a nested plain data object.

**Answer:**

~~~js
const original = {
    user: {
        name: "Dev"
    },
    tags: ["javascript", "notes"]
};

const copy = structuredClone(original);
copy.user.name = "Mina";
copy.tags.push("guide");

console.log(original.user.name);
console.log(original.tags.join(", "));
console.log(copy.user.name);
console.log(copy.tags.join(", "));
~~~

Output:

~~~text
Dev
javascript, notes
Mina
javascript, notes, guide
~~~

**Explanation:** The nested object and array are cloned, so their mutations are independent.

### 45. Clone an object with a circular reference and check the cloned link.

**Answer:**

~~~js
const original = {
    label: "cycle"
};
original.self = original;

const copy = structuredClone(original);

console.log(copy !== original);
console.log(copy.self === copy);
~~~

Output:

~~~text
true
true
~~~

**Explanation:** The clone is a new object and its self-reference points to that clone.

### 46. Clone a graph with a shared nested object and check the alias relationship.

**Answer:**

~~~js
const shared = {
    enabled: true
};

const original = {
    first: shared,
    second: shared
};

const copy = structuredClone(original);

console.log(copy.first === copy.second);
console.log(copy.first === shared);
~~~

Output:

~~~text
true
false
~~~

**Explanation:** structuredClone keeps the repeated-reference structure within the new graph while separating it from the source graph.

### 47. Show why JSON cloning can change data.

**Answer:**

~~~js
const original = {
    missing: undefined,
    score: NaN,
    createdAt: new Date("2025-01-02T03:04:05.000Z")
};

const copy = JSON.parse(JSON.stringify(original));

console.log(Object.hasOwn(copy, "missing"));
console.log(copy.score);
console.log(typeof copy.createdAt);
~~~

Output:

~~~text
false
null
string
~~~

**Explanation:** JSON omits undefined object properties, turns NaN into null, and serializes Date as a string.

### 48. Catch the error from attempting to clone a function.

**Answer:**

~~~js
const value = {
    run() {
        return "done";
    }
};

try {
    structuredClone(value);
} catch (error) {
    console.log(error.name);
}
~~~

Output:

~~~text
DataCloneError
~~~

**Explanation:** Functions are unsupported in the structured clone data model, so cloning fails.

### 49. Copy a nested object immutably by copying each changed level.

**Answer:**

~~~js
const original = {
    profile: {
        name: "Asha",
        city: "Pune"
    }
};

const updated = {
    ...original,
    profile: {
        ...original.profile,
        city: "Delhi"
    }
};

console.log(original.profile.city);
console.log(updated.profile.city);
console.log(original.profile === updated.profile);
~~~

Output:

~~~text
Pune
Delhi
false
~~~

**Explanation:** Both the outer object and the changed nested profile are copied. Unchanged nested structures would still be shared unless they are also copied.

### 50. Transfer an ArrayBuffer and inspect the source and result.

**Answer:**

~~~js
const original = new ArrayBuffer(4);
new Uint8Array(original).set([1, 2, 3, 4]);

const moved = structuredClone(original, {
    transfer: [original]
});

console.log(original.byteLength);
console.log(moved.byteLength);
console.log([...new Uint8Array(moved)].join(", "));
~~~

Output:

~~~text
0
4
1, 2, 3, 4
~~~

**Explanation:** The buffer resource moves to moved. The original is detached, so its byteLength is zero.

## Review checklist

- Compare object identity with ===, not by assuming equal-looking properties mean one object.
- Remember that assignment creates another reference.
- Treat spread, slice, and Object.assign as shallow copies.
- Use structuredClone only for values and object behavior it supports.
- Expect cycles and repeated references to be preserved by structuredClone.
- Expect functions and some other values to cause a cloning error.
- Do not expect custom prototypes, methods, accessors, or descriptors to survive structured cloning.
- Treat JSON serialization as a data conversion with losses, not as a universal clone.
- Know that transfer detaches the original resource.
- Pick the copy strategy based on the required identity and data behavior.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [56 - Spread syntax and rest properties](056-spread-syntax-and-rest-properties.md) | [Open lesson](../lessons/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [Open example](../examples/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [58 - Getters, setters, property control, freeze, and seal](../lessons/058-getters-setters-property-control-freeze-and-seal.md) |
