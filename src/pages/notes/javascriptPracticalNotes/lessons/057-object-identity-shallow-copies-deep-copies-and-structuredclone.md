# 57 - Object identity, shallow copies, deep copies, and structuredClone

JavaScript objects are accessed through references. Assigning an object to another variable does not make a copy, and a shallow copy does not duplicate nested objects. Understanding identity and copy depth helps prevent accidental shared-state changes.

This chapter explains object identity, aliases, shallow copying, deep copying, circular references, structuredClone, JSON-based copying, transferable resources, and how to choose a copying strategy.

## What you will learn

- Distinguish two references to one object from two separate objects with equal data.
- Explain why assigning an object to another variable creates an alias.
- Predict what shallow copies share with their source.
- Make a deep clone of structured-cloneable values with structuredClone.
- Understand how structuredClone handles cycles, repeated references, built-ins, and unsupported values.
- Recognize when JSON serialization is an unsuitable cloning shortcut.
- Understand how transferring an ArrayBuffer detaches the original buffer.
- Select a copy strategy that fits the data and intended behavior.

## Primitive values and object identity

Primitive values are compared by value. Objects, arrays, and functions have identity. Two object values are equal with === only when they refer to the same object.

~~~js
const first = { name: "Asha" };
const second = { name: "Asha" };
const third = first;

console.log(first === second);
console.log(first === third);
~~~

Output:

~~~text
false
true
~~~

first and second contain equal-looking data, but they are separate objects. third is another reference to the exact object held by first.

## Assignment creates an alias, not a copy

Assigning an object value to another variable copies its reference:

~~~js
const original = {
    name: "Mina",
    settings: {
        theme: "light"
    }
};

const alias = original;
alias.name = "Asha";

console.log(original.name);
console.log(alias === original);
~~~

Output:

~~~text
Asha
true
~~~

Both variables refer to one object. A mutation through either reference is visible through the other.

This also applies to objects passed to functions. Passing an object does not automatically copy it:

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

Output:

~~~text
Dev
~~~

The function receives a copy of the reference, so it can mutate the same object. Reassigning the local parameter itself would not reassign the caller's variable.

## Shallow copies

A shallow copy creates a new outer object or array and copies its immediate property values. If a value is itself an object, the reference to that nested object is copied.

### Copy an array with spread

~~~js
const original = [1, 2, 3];
const copy = [...original];

console.log(copy === original);
console.log(copy.join(", "));
~~~

Output:

~~~text
false
1, 2, 3
~~~

The arrays are separate. Updating an element that contains a primitive does not update the same position in the other array:

~~~js
const original = [1, 2, 3];
const copy = [...original];

copy[0] = 99;

console.log(original[0]);
console.log(copy[0]);
~~~

Output:

~~~text
1
99
~~~

### Copy an object with spread

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

Output:

~~~text
Asha
Mina
false
~~~

The top-level primitive-valued properties are copied into a new object.

### Nested values remain shared

~~~js
const original = {
    name: "Asha",
    profile: {
        city: "Pune"
    }
};

const copy = {
    ...original
};

copy.profile.city = "Delhi";

console.log(original.profile.city);
console.log(copy.profile.city);
console.log(copy.profile === original.profile);
~~~

Output:

~~~text
Delhi
Delhi
true
~~~

The outer objects are different, but profile is the same nested object in both. The same shallow-copy behavior applies to Object.assign and array methods that copy only the outer array.

### A shallow copy can replace a nested object without mutating it

~~~js
const original = {
    profile: {
        name: "Asha",
        city: "Pune"
    }
};

const copy = {
    ...original,
    profile: {
        ...original.profile,
        city: "Delhi"
    }
};

console.log(original.profile.city);
console.log(copy.profile.city);
console.log(copy.profile === original.profile);
~~~

Output:

~~~text
Pune
Delhi
false
~~~

By copying each changed level, this particular update avoids sharing the replaced profile object. Deeper structures require copying each level that should become independent.

## Deep copies

A deep copy duplicates nested data recursively so that copied objects do not share nested object references with the source. The exact result depends on the copy method. A deep copy is not simply “the same object, but separate”: prototypes, methods, descriptors, special built-ins, and unsupported values may behave differently.

## Use structuredClone for supported data

structuredClone creates a deep clone of structured-cloneable values:

~~~js
const original = {
    name: "Mina",
    profile: {
        city: "Pune"
    },
    scores: [8, 9]
};

const copy = structuredClone(original);

copy.profile.city = "Delhi";
copy.scores.push(10);

console.log(original.profile.city);
console.log(original.scores.join(", "));
console.log(copy.profile.city);
console.log(copy.scores.join(", "));
console.log(copy.profile === original.profile);
~~~

Output:

~~~text
Pune
8, 9
Delhi
8, 9, 10
false
~~~

The nested objects and arrays are cloned, so changes in the clone do not mutate those source objects.

### Cloning supports circular references

A circular reference is an object graph that eventually points back to an object already visited:

~~~js
const original = {
    name: "Loop"
};

original.self = original;

const copy = structuredClone(original);

console.log(copy !== original);
console.log(copy.self === copy);
console.log(original.self === original);
~~~

Output:

~~~text
true
true
true
~~~

structuredClone tracks references while cloning. It can preserve cycles instead of recursing forever.

### Repeated references stay repeated inside the clone

A graph can contain two properties that point to the same nested object:

~~~js
const shared = {
    value: 1
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

The clone preserves the relationship between first and second, while creating a separate nested object from the source's shared object.

### Built-in data types can be cloned

structuredClone supports many built-in data types, including Date, Map, Set, ArrayBuffer, and typed arrays:

~~~js
const original = {
    createdAt: new Date("2025-01-02T03:04:05.000Z"),
    roles: new Set(["reader", "author"]),
    counts: new Map([["posts", 3]]),
    bytes: new Uint8Array([4, 8, 12])
};

const copy = structuredClone(original);

console.log(copy.createdAt instanceof Date);
console.log(copy.createdAt.toISOString());
console.log(copy.roles instanceof Set);
console.log(copy.counts.get("posts"));
console.log(copy.bytes.join(", "));
~~~

Output:

~~~text
true
2025-01-02T03:04:05.000Z
true
3
4, 8, 12
~~~

The clone is a separate data graph, but each supported built-in type keeps its own appropriate behavior.

### Unsupported values cause a cloning error

Functions and symbols as values cannot be structured-cloned. A function anywhere in the cloned object graph causes the operation to fail:

~~~js
const value = {
    name: "Asha",
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

Do not assume that every JavaScript value or host object can be cloned. Check the supported types for the environment and API you use.

### Prototypes and descriptors are not a general-purpose snapshot

structuredClone copies data, not every detail of an object's behavior. It does not preserve arbitrary custom prototype chains, property descriptors, getters, or methods.

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

Output:

~~~text
Mina
false
undefined
~~~

The cloned data has a name property, but it is not a User instance and does not retain the class method. Use a domain-specific reconstruction step when class behavior must be preserved.

### A cloned accessor becomes data

~~~js
const original = {
    amount: 4,
    get doubled() {
        return this.amount * 2;
    }
};

const copy = structuredClone(original);
const descriptor = Object.getOwnPropertyDescriptor(copy, "doubled");

console.log(copy.doubled);
console.log(typeof descriptor.get);
console.log(descriptor.value);
~~~

Output:

~~~text
8
undefined
8
~~~

The getter is read as data during cloning. The resulting property stores the value 8 instead of keeping the getter.

### Check compatibility in the target runtime

structuredClone is available in current browsers and modern server-side runtimes, but a project may need to support older environments. Check the actual browser or runtime targets before depending on it. A fallback should match the data types and semantics the application requires.

## Transfer an ArrayBuffer instead of copying it

structuredClone can transfer certain transferable resources. A transferred resource moves to the clone and becomes detached from the original. This is an ownership change, not a normal copy.

~~~js
const original = new ArrayBuffer(4);
new Uint8Array(original).set([10, 20, 30, 40]);

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
10, 20, 30, 40
~~~

After the transfer, original is detached and has no usable bytes. Only transfer a resource when the current owner should give it up. Without a transfer list, structuredClone copies the buffer instead.

## JSON serialization is not a general deep-copy method

A common shortcut is JSON.parse(JSON.stringify(value)). It only works for data that JSON can represent and changes or drops other values.

~~~js
const original = {
    missing: undefined,
    score: NaN,
    createdAt: new Date("2025-01-02T03:04:05.000Z"),
    roles: new Set(["author"])
};

const copy = JSON.parse(JSON.stringify(original));

console.log(Object.hasOwn(copy, "missing"));
console.log(copy.score);
console.log(copy.createdAt);
console.log(Object.keys(copy.roles).length);
~~~

Output:

~~~text
false
null
2025-01-02T03:04:05.000Z
0
~~~

The undefined property is omitted, NaN becomes null, Date becomes a string, and Set becomes an empty object. JSON serialization also fails on circular references and BigInt values. Use it only when JSON conversion itself is intended or the input is deliberately restricted to compatible JSON data.

## Choose a copy strategy

| Goal | Possible approach | Important limitation |
| --- | --- | --- |
| Give another variable access to the same object | Direct assignment | Both names share mutations |
| Copy an array's outer container | Array spread or slice | Nested values remain shared |
| Copy an object's enumerable data into a new object | Object spread or Object.assign | Shallow copy, and property/descriptor behavior differs |
| Clone supported nested data | structuredClone | Some values and object behavior are not preserved |
| Convert data to JSON text and back | JSON serialization | Loses or transforms values and cannot represent cycles |
| Move a transferable resource | structuredClone with transfer | The original resource becomes detached |
| Recreate a class or domain object | Explicit constructor or domain-specific clone | Requires code for the intended data model |

No cloning method is correct for every object. First decide whether the goal is shared access, a shallow container copy, a deep data clone, serialization, or transfer of ownership.

## Common mistakes

- Assuming assigning an object to another variable copies it.
- Assuming a shallow copy separates nested objects.
- Assuming two objects with identical fields are the same object.
- Assuming structuredClone preserves methods, custom prototypes, accessors, or descriptors.
- Assuming every JavaScript value can be passed to structuredClone.
- Treating JSON stringify and parse as a universal deep-copy function.
- Forgetting that cycles and BigInt cannot be represented by ordinary JSON.
- Assuming a transferred ArrayBuffer remains usable in its original location.
- Using a deep clone to avoid deciding which parts of application state should be shared.
- Using structuredClone without checking support in the target runtime.
- Expecting an immutable update to change a nested object when only the outer object was copied.

## Try it yourself

1. Assign one object to two variables and mutate it through each variable.
2. Create two separate objects with identical fields and compare them with ===.
3. Make a shallow array copy containing a nested object and inspect which references are shared.
4. Update a nested object immutably by copying each changed level.
5. Clone nested plain data with structuredClone and compare values and identities.
6. Create a circular object and verify that the clone's cycle points to the clone.
7. Store the same nested object in two source properties and check the alias relationship in the clone.
8. Clone Date, Map, Set, and typed-array values.
9. Try to clone an object containing a function and inspect the error.
10. Clone an instance of a custom class and inspect its prototype and methods.
11. Compare JSON serialization with structuredClone for undefined, NaN, Date, and Set values.
12. Transfer an ArrayBuffer and inspect the original and transferred byte lengths.
13. Choose a copying strategy for a settings object with nested state and explain the trade-offs.

## Key points

- Objects have identity and are accessed through references.
- Assignment and function calls copy references, not object graphs.
- Shallow copies create a new outer container while sharing nested object references.
- structuredClone deeply clones supported data and can preserve cycles and repeated-reference relationships.
- structuredClone does not preserve arbitrary class prototypes, methods, accessors, or property descriptors.
- JSON serialization changes or drops values that JSON cannot represent.
- Transferring a resource moves ownership and detaches it from the original.
- Select a copy strategy based on whether you need aliasing, a shallow copy, a deep data clone, serialization, or transfer.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [56 - Spread syntax and rest properties](056-spread-syntax-and-rest-properties.md) | [Open Q&A](../qnas/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [Open example](../examples/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [58 - Getters, setters, property control, freeze, and seal](058-getters-setters-property-control-freeze-and-seal.md) |
