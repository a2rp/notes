# 57 - Object identity, shallow copies, deep copies, and structuredClone: examples

These examples show how references are shared, how shallow copies behave, and what structuredClone and JSON serialization preserve or change. Each example includes a question, complete code, expected output, and an explanation.

## 1. Assign an object to another variable

### Question

Does assigning an object to another variable create a copy?

### Code

~~~js
const original = {
    name: "Asha"
};

const alias = original;
alias.name = "Mina";

console.log(original.name);
console.log(alias === original);
~~~

### Expected output

~~~text
Mina
true
~~~

### Explanation

Assignment copies the reference. Both variables point to the same object, so a mutation through alias is visible through original.

## 2. Compare two objects with equal-looking data

### Question

Do two separately created objects compare equal with ===?

### Code

~~~js
const first = {
    name: "Asha"
};

const second = {
    name: "Asha"
};

console.log(first === second);
console.log(first.name === second.name);
~~~

### Expected output

~~~text
false
true
~~~

### Explanation

The object references have different identities, although their name values are equal strings.

## 3. Mutate an object through a function parameter

### Question

Can a function mutate the caller's object through its parameter?

### Code

~~~js
function rename(user) {
    user.name = "Dev";
}

const account = {
    name: "Mina"
};

rename(account);

console.log(account.name);
~~~

### Expected output

~~~text
Dev
~~~

### Explanation

The function receives a copy of the reference to the same object. It can mutate that object.

## 4. Make a shallow object copy

### Question

How can a top-level object be copied so that its primitive-valued fields are independent?

### Code

~~~js
const original = {
    name: "Asha",
    active: true
};

const copy = {
    ...original
};

copy.name = "Mina";

console.log(original.name);
console.log(copy.name);
console.log(copy === original);
~~~

### Expected output

~~~text
Asha
Mina
false
~~~

### Explanation

Object spread creates a new outer object. Updating a copied top-level primitive property does not change the source property.

## 5. See a nested reference shared by a shallow copy

### Question

What happens when a nested object is mutated through a shallow copy?

### Code

~~~js
const original = {
    profile: {
        city: "Pune"
    }
};

const copy = {
    ...original
};

copy.profile.city = "Delhi";

console.log(original.profile.city);
console.log(copy.profile === original.profile);
~~~

### Expected output

~~~text
Delhi
true
~~~

### Explanation

The outer objects are separate, but profile is the same object reference in both.

## 6. Copy an array with spread

### Question

Does array spread make a distinct outer array?

### Code

~~~js
const original = [1, 2, 3];
const copy = [...original];

console.log(copy === original);
console.log(copy.join(", "));
~~~

### Expected output

~~~text
false
1, 2, 3
~~~

### Explanation

The array values are expanded into a new array. The source array remains a different object.

## 7. Array slice is also shallow

### Question

Does slice clone objects inside an array?

### Code

~~~js
const original = [{ name: "Asha" }];
const copy = original.slice();

copy[0].name = "Mina";

console.log(original === copy);
console.log(original[0] === copy[0]);
console.log(original[0].name);
~~~

### Expected output

~~~text
false
true
Mina
~~~

### Explanation

slice creates a new outer array but copies the nested object reference.

## 8. Copy each changed level for an immutable update

### Question

How can a nested property be updated without changing the source object?

### Code

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

### Expected output

~~~text
Pune
Delhi
false
~~~

### Explanation

The outer object and the changed nested profile are both copied. Every level that must be independent needs its own copy.

## 9. Deep-clone supported nested data

### Question

How can nested objects and arrays be cloned with structuredClone?

### Code

~~~js
const original = {
    user: {
        name: "Mina"
    },
    scores: [8, 9]
};

const copy = structuredClone(original);
copy.user.name = "Asha";
copy.scores.push(10);

console.log(original.user.name);
console.log(original.scores.join(", "));
console.log(copy.user.name);
console.log(copy.scores.join(", "));
~~~

### Expected output

~~~text
Mina
8, 9
Asha
8, 9, 10
~~~

### Explanation

The nested object and array were cloned, so changes in the copy do not mutate the source graph.

## 10. Clone an array of objects

### Question

Are object elements independent after structuredClone?

### Code

~~~js
const original = [
    { id: 1, label: "first" },
    { id: 2, label: "second" }
];

const copy = structuredClone(original);
copy[0].label = "updated";

console.log(original[0].label);
console.log(copy[0].label);
console.log(copy[0] === original[0]);
~~~

### Expected output

~~~text
first
updated
false
~~~

### Explanation

structuredClone creates separate cloneable element objects as well as a new array.

## 11. Clone a circular object

### Question

Can structuredClone copy an object that refers to itself?

### Code

~~~js
const original = {
    name: "loop"
};

original.self = original;

const copy = structuredClone(original);

console.log(copy !== original);
console.log(copy.self === copy);
console.log(original.self === original);
~~~

### Expected output

~~~text
true
true
true
~~~

### Explanation

The clone is new, and the circular reference is reconstructed to point back to the clone.

## 12. Preserve repeated references inside the cloned graph

### Question

If two source properties share one object, do their clone properties share one cloned object?

### Code

~~~js
const shared = {
    active: true
};

const original = {
    first: shared,
    second: shared
};

const copy = structuredClone(original);

console.log(copy.first === copy.second);
console.log(copy.first === shared);
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The relationship between first and second is preserved within the cloned graph. The shared cloned object is distinct from the original shared object.

## 13. Clone a Date

### Question

Does a cloned Date remain a Date object?

### Code

~~~js
const original = new Date("2025-01-02T03:04:05.000Z");
const copy = structuredClone(original);

console.log(copy instanceof Date);
console.log(copy === original);
console.log(copy.toISOString());
~~~

### Expected output

~~~text
true
false
2025-01-02T03:04:05.000Z
~~~

### Explanation

The clone is a different Date object that represents the same time.

## 14. Clone Map and Set data

### Question

Can structuredClone preserve Map and Set as their built-in types?

### Code

~~~js
const original = {
    roles: new Set(["reader", "author"]),
    counts: new Map([["posts", 3]])
};

const copy = structuredClone(original);

console.log(copy.roles instanceof Set);
console.log(copy.roles.has("author"));
console.log(copy.counts instanceof Map);
console.log(copy.counts.get("posts"));
~~~

### Expected output

~~~text
true
true
true
3
~~~

### Explanation

These supported built-ins are cloned with their collection behavior and data.

## 15. Clone a typed array

### Question

Are typed-array values copied independently?

### Code

~~~js
const original = new Uint8Array([4, 8, 12]);
const copy = structuredClone(original);

copy[0] = 99;

console.log(original.join(", "));
console.log(copy.join(", "));
console.log(copy === original);
~~~

### Expected output

~~~text
4, 8, 12
99, 8, 12
false
~~~

### Explanation

The typed array is cloned, so writing to the clone does not change the original's bytes.

## 16. Functions cannot be structured-cloned

### Question

What happens when an object contains a method?

### Code

~~~js
const value = {
    name: "Asha",
    greet() {
        return "Hello";
    }
};

try {
    structuredClone(value);
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
DataCloneError
~~~

### Explanation

A method is a function value. Functions are not structured-cloneable, so the operation throws.

## 17. A symbol value cannot be structured-cloned

### Question

What happens when a symbol is the value passed to structuredClone?

### Code

~~~js
try {
    structuredClone(Symbol("token"));
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
DataCloneError
~~~

### Explanation

Symbol primitive values are not supported by the structured clone data model.

## 18. Structured cloning does not preserve property descriptors

### Question

Does a non-writable property remain non-writable after cloning?

### Code

~~~js
const original = {};

Object.defineProperty(original, "id", {
    value: 7,
    writable: false,
    enumerable: true,
    configurable: false
});

const copy = structuredClone(original);
const descriptor = Object.getOwnPropertyDescriptor(copy, "id");

console.log(copy.id);
console.log(descriptor.writable);
console.log(descriptor.configurable);
~~~

### Expected output

~~~text
7
true
true
~~~

### Explanation

structuredClone copies the enumerable data value but does not preserve the original property descriptor flags.

## 19. Custom class prototypes are not preserved

### Question

Does a cloned class instance keep its methods?

### Code

~~~js
class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return "Hello, " + this.name;
    }
}

const original = new User("Mina");
const copy = structuredClone(original);

console.log(copy.name);
console.log(copy instanceof User);
console.log(typeof copy.greet);
~~~

### Expected output

~~~text
Mina
false
undefined
~~~

### Explanation

The own data is cloned, but the arbitrary custom prototype and its method are not preserved.

## 20. A getter is read during structured cloning

### Question

Does structuredClone copy a getter or its returned value?

### Code

~~~js
let reads = 0;

const original = {
    amount: 4,
    get doubled() {
        reads += 1;
        return this.amount * 2;
    }
};

const copy = structuredClone(original);
const descriptor = Object.getOwnPropertyDescriptor(copy, "doubled");

console.log(copy.doubled);
console.log(reads);
console.log(typeof descriptor.get);
console.log(descriptor.value);
~~~

### Expected output

~~~text
8
1
undefined
8
~~~

### Explanation

The getter runs while its value is read. The clone receives a data property with value 8, not the getter descriptor.

## 21. JSON cloning omits undefined properties

### Question

Does JSON stringify preserve an undefined object property?

### Code

~~~js
const original = {
    name: "Dev",
    optional: undefined
};

const copy = JSON.parse(JSON.stringify(original));

console.log(Object.hasOwn(copy, "optional"));
console.log(Object.keys(copy).join(", "));
~~~

### Expected output

~~~text
false
name
~~~

### Explanation

JSON.stringify omits object properties whose values are undefined.

## 22. JSON cloning changes non-finite numbers

### Question

What happens to NaN and Infinity in JSON conversion?

### Code

~~~js
const original = {
    score: NaN,
    limit: Infinity
};

const copy = JSON.parse(JSON.stringify(original));

console.log(copy.score);
console.log(copy.limit);
~~~

### Expected output

~~~text
null
null
~~~

### Explanation

JSON does not have NaN or Infinity values, so JSON.stringify represents them as null.

## 23. JSON cloning turns a Date into a string

### Question

Does a Date remain a Date after JSON stringify and parse?

### Code

~~~js
const original = {
    createdAt: new Date("2025-01-02T03:04:05.000Z")
};

const copy = JSON.parse(JSON.stringify(original));

console.log(typeof copy.createdAt);
console.log(copy.createdAt);
~~~

### Expected output

~~~text
string
2025-01-02T03:04:05.000Z
~~~

### Explanation

A Date serializes to its ISO text. JSON.parse produces a string, not a Date object.

## 24. JSON cloning does not preserve Map entries

### Question

What does an ordinary Map become in JSON conversion?

### Code

~~~js
const original = {
    values: new Map([["count", 3]])
};

const copy = JSON.parse(JSON.stringify(original));

console.log(copy.values instanceof Map);
console.log(Object.keys(copy.values).length);
~~~

### Expected output

~~~text
false
0
~~~

### Explanation

Ordinary JSON serialization does not encode Map entries. The Map becomes an empty plain object.

## 25. JSON serialization cannot represent circular references

### Question

What happens when JSON.stringify receives a circular object?

### Code

~~~js
const original = {};
original.self = original;

try {
    JSON.stringify(original);
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
TypeError
~~~

### Explanation

JSON has no reference or cycle representation. JSON.stringify throws when it encounters a cycle.

## 26. JSON serialization cannot represent BigInt by default

### Question

What happens when JSON.stringify receives a BigInt value?

### Code

~~~js
try {
    JSON.stringify({
        count: 2n
    });
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
TypeError
~~~

### Explanation

JSON.stringify does not serialize BigInt by default. A custom conversion would be needed if JSON text is required.

## 27. Clone an ArrayBuffer without transferring it

### Question

Does a normal structured clone detach the original buffer?

### Code

~~~js
const original = new ArrayBuffer(3);
new Uint8Array(original).set([5, 10, 15]);

const copy = structuredClone(original);

console.log(original.byteLength);
console.log(copy.byteLength);
console.log([...new Uint8Array(copy)].join(", "));

new Uint8Array(copy)[0] = 99;
console.log(new Uint8Array(original)[0]);
~~~

### Expected output

~~~text
3
3
5, 10, 15
5
~~~

### Explanation

Without a transfer list, the buffer is cloned. Both buffers remain usable and have independent bytes.

## 28. Transfer an ArrayBuffer

### Question

What changes when the buffer is transferred instead of copied?

### Code

~~~js
const original = new ArrayBuffer(3);
new Uint8Array(original).set([5, 10, 15]);

const moved = structuredClone(original, {
    transfer: [original]
});

console.log(original.byteLength);
console.log(moved.byteLength);
console.log([...new Uint8Array(moved)].join(", "));
~~~

### Expected output

~~~text
0
3
5, 10, 15
~~~

### Explanation

The resource moves to moved and original is detached. Its byteLength becomes zero.

## 29. Deep-clone data without changing the source

### Question

How can nested data be cloned before editing it independently?

### Code

~~~js
const original = {
    profile: {
        name: "Asha",
        city: "Pune"
    },
    preferences: ["email"]
};

const draft = structuredClone(original);
draft.profile.city = "Delhi";
draft.preferences.push("sms");

console.log(original.profile.city);
console.log(original.preferences.join(", "));
console.log(draft.profile.city);
console.log(draft.preferences.join(", "));
~~~

### Expected output

~~~text
Pune
email
Delhi
email, sms
~~~

### Explanation

The clone has separate nested objects and arrays for supported data, so these edits do not change the source.

## 30. Preserve a shared reference in the cloned graph

### Question

How does structuredClone handle two references to one shared nested object?

### Code

~~~js
const settings = {
    mode: "dark"
};

const original = {
    primary: settings,
    fallback: settings
};

const copy = structuredClone(original);

console.log(copy.primary === copy.fallback);
console.log(copy.primary === settings);
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The two corresponding properties still share one cloned object. That cloned object does not share identity with the original settings object.

## 31. Pick a copy strategy based on the goal

### Question

How can the same source be shared, shallow-copied, or deep-cloned?

### Code

~~~js
const original = {
    profile: {
        name: "Mina"
    }
};

const alias = original;
const shallow = { ...original };
const deep = structuredClone(original);

console.log(alias === original);
console.log(shallow === original);
console.log(shallow.profile === original.profile);
console.log(deep.profile === original.profile);
~~~

### Expected output

~~~text
true
false
true
false
~~~

### Explanation

Assignment shares the outer object. Spread makes a new outer object but shares profile. structuredClone creates a separate supported nested profile object.

## Practice prompts

1. Create an alias and mutate the shared object through both variables.
2. Compare two object literals with identical data using ===.
3. Make shallow copies with array spread, object spread, and slice.
4. Update a nested object immutably by copying each modified level.
5. Clone a nested object with structuredClone and compare its identity graph.
6. Add a circular reference and inspect the cloned cycle.
7. Clone a Date, Map, Set, and typed array.
8. Clone an object containing a method and handle the error.
9. Compare JSON conversion with structuredClone for Date, undefined, NaN, Set, cycles, and BigInt.
10. Transfer an ArrayBuffer and compare its source and result.
11. Clone a custom class instance and inspect its methods and prototype.
12. Explain which state should be shared and which should be independently copied in a draft editor.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [56 - Spread syntax and rest properties](056-spread-syntax-and-rest-properties.md) | [Open lesson](../lessons/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [Open Q&A](../qnas/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [58 - Getters, setters, property control, freeze, and seal](../lessons/058-getters-setters-property-control-freeze-and-seal.md) |
