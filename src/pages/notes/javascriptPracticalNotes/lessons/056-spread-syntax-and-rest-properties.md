# 56 - Spread syntax and rest properties

The three dots (...) have related but different jobs in JavaScript. Spread expands values from an iterable or an object into another expression. Rest gathers remaining values into a parameter, array, or object.

This chapter covers spread in function calls, array literals, and object literals, plus rest parameters and object rest properties. It also explains iteration requirements, overwrite order, enumerable properties, getters, and shallow copies.

## What you will learn

- Tell spread syntax apart from rest syntax by where it appears.
- Expand iterable values into function arguments and arrays.
- Gather function arguments with a rest parameter.
- Copy and combine arrays and objects with spread.
- Use object rest to collect properties not selected by a destructuring pattern.
- Understand which keys object spread and rest include.
- Predict the effect of order when properties have duplicate keys.
- Recognize when copying is shallow and when iteration is required.

## Spread and rest use the same three dots

The syntax is the same, but its role depends on its position:

~~~js
function collect(first, ...remaining) {
    return [first, ...remaining];
}

console.log(collect("a", "b", "c").join(", "));
~~~

Output:

~~~text
a, b, c
~~~

In the parameter list, ...remaining is rest. It gathers extra arguments into an array. In the returned array literal, ...remaining is spread. It expands iterable values into individual array elements.

## Spread an iterable into a function call

A spread element in a call supplies each value from an iterable as a separate argument:

~~~js
const values = [4, 9, 2];

console.log(Math.max(...values));
~~~

Output:

~~~text
9
~~~

This call is equivalent to Math.max(4, 9, 2). The spread operand must be iterable.

### Use spread with other arguments

Spread elements can appear alongside ordinary arguments:

~~~js
function describe(first, second, third) {
    return first + " / " + second + " / " + third;
}

const middle = ["HTML", "CSS"];

console.log(describe("JavaScript", ...middle));
~~~

Output:

~~~text
JavaScript / HTML / CSS
~~~

The iterable's values occupy argument positions in order. The receiving function still decides what to do with those arguments.

### A string is iterable too

~~~js
function showPair(first, second) {
    return first + "-" + second;
}

console.log(showPair(...["left", "right"]));
console.log(showPair(..."OK"));
~~~

Output:

~~~text
left-right
O-K
~~~

Spread in a function call expands an iterable, not an arbitrary object with numbered keys.

### Avoid spreading extremely large iterables into a call

A function call has a finite practical argument limit, which varies by engine and environment. For a very large collection, use a loop or an API designed to process collections instead of spreading every item into one call.

## Use a rest parameter to gather arguments

A rest parameter gathers zero or more remaining function arguments into a real array:

~~~js
function sum(first, ...remaining) {
    let total = first;

    for (const value of remaining) {
        total += value;
    }

    return total;
}

console.log(sum(2, 3, 4));
console.log(sum(10));
~~~

Output:

~~~text
9
10
~~~

The first argument is assigned to first. All remaining arguments are collected in remaining. If there are no remaining arguments, remaining is an empty array.

### Rest parameters must be last

A rest parameter collects everything after it, so it must be the final parameter:

~~~js
function makeSummary(title, ...items) {
    return title + ": " + items.join(", ");
}

console.log(makeSummary("Topics", "HTML", "CSS", "JavaScript"));
~~~

Output:

~~~text
Topics: HTML, CSS, JavaScript
~~~

A function cannot declare another parameter after a rest parameter. Only one rest parameter can appear in a parameter list.

### Rest parameter compared with arguments

A rest parameter is a named array that contains the arguments not matched by earlier parameters:

~~~js
function inspect(first, ...others) {
    console.log(Array.isArray(others));
    console.log(others.length);
}

inspect("a", "b", "c");
~~~

Output:

~~~text
true
2
~~~

The older arguments value is array-like, while a rest parameter is an actual array. Prefer a rest parameter when a function intentionally accepts a variable number of arguments.

## Spread an iterable into an array

Array spread expands an iterable into a new array:

~~~js
const letters = ["a", "b"];
const combined = ["start", ...letters, "end"];

console.log(combined.join(", "));
~~~

Output:

~~~text
start, a, b, end
~~~

The original array remains unchanged.

### Copy an array with spread

~~~js
const original = [10, 20, 30];
const copy = [...original];

console.log(copy.join(", "));
console.log(copy === original);
~~~

Output:

~~~text
10, 20, 30
false
~~~

The outer array is new. Nested objects are not cloned:

~~~js
const original = [{ name: "Asha" }];
const copy = [...original];

copy[0].name = "Mina";

console.log(original[0].name);
console.log(copy === original);
console.log(copy[0] === original[0]);
~~~

Output:

~~~text
Mina
false
true
~~~

The arrays are distinct, but both contain the same object reference. Deep copying is a separate topic.

### Combine arrays without mutating either source

~~~js
const required = ["name", "email"];
const optional = ["phone", "company"];
const fields = [...required, ...optional];

console.log(fields.join(", "));
console.log(required.length);
console.log(optional.length);
~~~

Output:

~~~text
name, email, phone, company
2
2
~~~

Spread creates a new array from the values of each source iterable. It does not append to or otherwise modify the source arrays.

### Convert an iterable to an array

~~~js
const colors = new Set(["red", "green", "blue"]);
const colorList = [...colors];

console.log(Array.isArray(colorList));
console.log(colorList.join(", "));
~~~

Output:

~~~text
true
red, green, blue
~~~

This is useful when an iterable should be stored or processed as an array.

### Spread a string into an array

~~~js
const symbols = [..."A😀"];

console.log(symbols.length);
console.log(symbols[0]);
console.log(symbols[1]);
~~~

Output:

~~~text
2
A
😀
~~~

String iteration produces code point values. Spread uses that iterator, so the emoji becomes one array element even though its string length is two UTF-16 code units.

### Sparse array slots become values during spread

~~~js
const sparse = ["first", , "third"];
const copied = [...sparse];

console.log(1 in sparse);
console.log(1 in copied);
console.log(copied[1]);
~~~

Output:

~~~text
false
true
undefined
~~~

Array iteration yields undefined for the empty slot. Spread adds that yielded value as an actual array element in the copy.

## Spread properties into an object

Object spread copies the source's own enumerable properties into a new object:

~~~js
const defaults = {
    theme: "light",
    compact: false
};

const preferences = {
    ...defaults,
    compact: true
};

console.log(preferences.theme);
console.log(preferences.compact);
~~~

Output:

~~~text
light
true
~~~

Definitions are evaluated from left to right. The explicit compact property comes after the spread, so it replaces the copied value.

### Later properties override earlier properties

~~~js
const first = {
    color: "blue",
    size: "medium"
};

const second = {
    color: "green"
};

const result = {
    ...first,
    ...second,
    size: "large"
};

console.log(result.color);
console.log(result.size);
~~~

Output:

~~~text
green
large
~~~

When the same key is copied or defined more than once, the later value wins. Put defaults first and specific overrides later when that is the intended behavior.

### Copy selected properties into a new object

~~~js
const user = {
    id: 7,
    name: "Asha",
    role: "editor"
};

const publicProfile = {
    name: user.name,
    role: user.role
};

console.log(Object.keys(publicProfile).join(", "));
console.log(publicProfile.name);
~~~

Output:

~~~text
name, role
Asha
~~~

Explicit property definitions are often clearer than spreading a full object when only selected fields should be exposed.

### Object spread is shallow

~~~js
const original = {
    profile: {
        name: "Asha"
    }
};

const copy = {
    ...original
};

copy.profile.name = "Mina";

console.log(original.profile.name);
console.log(copy === original);
console.log(copy.profile === original.profile);
~~~

Output:

~~~text
Mina
false
true
~~~

The outer object is new, but nested values are copied as references. Spread does not recursively clone an object.

### Only own enumerable properties are copied

~~~js
const prototype = {
    inherited: "from prototype"
};

const source = Object.create(prototype);
source.name = "Mina";

Object.defineProperty(source, "hidden", {
    value: "private",
    enumerable: false
});

const copy = {
    ...source
};

console.log(copy.name);
console.log(copy.inherited);
console.log(copy.hidden);
console.log(Object.keys(copy).join(", "));
~~~

Output:

~~~text
Mina
undefined
undefined
name
~~~

Object spread excludes inherited and non-enumerable properties. It copies only the source's own enumerable properties.

### Enumerable symbol properties are copied

~~~js
const internal = Symbol("internal");
const source = {
    name: "Asha",
    [internal]: 42
};

const copy = {
    ...source
};

console.log(copy.name);
console.log(copy[internal]);
console.log(Reflect.ownKeys(copy).length);
~~~

Output:

~~~text
Asha
42
2
~~~

Enumerable symbol keys are copied along with enumerable string keys. Use Reflect.ownKeys when inspecting both kinds of keys.

### Object spread reads values and does not preserve descriptors

~~~js
let reads = 0;

const source = {
    get status() {
        reads += 1;
        return "ready";
    }
};

const copy = {
    ...source
};

console.log(copy.status);
console.log(reads);
console.log(Object.getOwnPropertyDescriptor(copy, "status").get);
~~~

Output:

~~~text
ready
1
undefined
~~~

The getter runs while the value is copied. The result is created as a regular data property on copy, so the getter descriptor is not preserved.

### A copied __proto__ key is data

~~~js
const source = JSON.parse('{"__proto__":{"admin":true}}');
const copy = {
    ...source
};

console.log(Object.hasOwn(copy, "__proto__"));
console.log(copy.__proto__.admin);
console.log(Object.getPrototypeOf(copy) === Object.prototype);
~~~

Output:

~~~text
true
true
true
~~~

Object spread creates an own data property for the key "__proto__". It does not invoke the special prototype setter syntax used by an uncomputed __proto__: value entry in an object literal.

### Spreading null and undefined into an object

~~~js
const result = {
    ...null,
    ...undefined,
    name: "Asha"
};

console.log(result.name);
console.log(Object.keys(result).join(", "));
~~~

Output:

~~~text
Asha
name
~~~

Object spread ignores null and undefined sources. This differs from object destructuring, where attempting to destructure null or undefined throws.

### Spreading primitive values into an object

~~~js
const letters = {
    ..."cat"
};

console.log(letters[0]);
console.log(letters[1]);
console.log(letters[2]);
~~~

Output:

~~~text
c
a
t
~~~

The string is converted to an object-like source whose enumerable character-index properties are copied. Numbers and booleans normally contribute no enumerable own properties.

## Object rest properties

Object rest appears in a destructuring pattern. It gathers remaining own enumerable properties into a new object:

~~~js
const user = {
    id: 7,
    name: "Mina",
    role: "editor"
};

const { id, ...profile } = user;

console.log(id);
console.log(Object.keys(profile).join(", "));
~~~

Output:

~~~text
7
name, role
~~~

The properties selected before rest are excluded from the result. Rest must be the final property in an object pattern.

### Rename a selected key, then gather the rest

~~~js
const account = {
    user_id: 18,
    displayName: "Asha",
    active: true
};

const {
    user_id: id,
    ...details
} = account;

console.log(id);
console.log(details.displayName);
console.log(details.active);
console.log(Object.hasOwn(details, "user_id"));
~~~

Output:

~~~text
18
Asha
true
false
~~~

The source key user_id is selected and renamed to the local binding id. It is still excluded from details by its source key.

### Use a computed key with object rest

~~~js
const field = "token";
const source = {
    token: "abc123",
    name: "Dev",
    role: "author"
};

const {
    [field]: token,
    ...publicData
} = source;

console.log(token);
console.log(Object.keys(publicData).join(", "));
~~~

Output:

~~~text
abc123
name, role
~~~

The computed key selects token. The corresponding source property is excluded from the rest object.

### Rest is not a deep copy

~~~js
const source = {
    id: 1,
    settings: {
        theme: "light"
    }
};

const { id, ...copy } = source;
copy.settings.theme = "dark";

console.log(source.settings.theme);
console.log(copy.settings.theme);
console.log(copy === source);
~~~

Output:

~~~text
dark
dark
false
~~~

Object rest creates a new outer object, but nested object values remain shared references.

## Spread and rest compared

| Syntax position | Example | What the three dots do |
| --- | --- | --- |
| Function call | call(...values) | Expands iterable values into arguments |
| Array literal | [...values] | Expands iterable values into array elements |
| Object literal | ({ ...source }) | Copies own enumerable properties |
| Function parameters | function f(...items) {} | Gathers remaining arguments into an array |
| Object destructuring | const { id, ...rest } = source | Gathers remaining properties into a new object |

The context determines whether values are being expanded or gathered.

## Common mistakes

- Assuming spread and rest do the same job everywhere. Spread expands; rest gathers.
- Spreading a plain object into a function call or array. Those contexts need an iterable.
- Assuming a numbered object with a length property is iterable.
- Forgetting that rest parameters must be last.
- Assuming array or object spread makes a deep copy.
- Assuming object spread copies inherited or non-enumerable properties.
- Assuming object spread preserves getters, setters, or property descriptor flags.
- Forgetting that enumerable symbol keys are included by object spread and object rest.
- Putting an override before a spread and expecting it to win. Later definitions replace earlier ones.
- Using object spread when only a few explicitly chosen properties should be copied.
- Treating spread as a safe replacement for validation or sanitization of untrusted input.
- Assuming object spread and Object.assign have exactly the same assignment behavior.

## Try it yourself

1. Pass an array of numbers to Math.max using call spread.
2. Write a function with one named argument and a rest parameter.
3. Combine two arrays without changing either original.
4. Spread a Set into a new array and inspect its order.
5. Copy an array containing an object and demonstrate the shallow copy.
6. Merge defaults with user overrides and predict which duplicate values remain.
7. Spread an object with a non-enumerable property and an inherited property.
8. Add an enumerable symbol property and inspect the spread result.
9. Spread an object with a getter and inspect the copied property descriptor.
10. Use object rest to exclude a selected field and gather the rest.
11. Compare a computed "__proto__" source property after object spread.
12. Explain why very large argument lists should not always be spread into a function call.

## Key points

- Spread expands iterable values in calls and array literals.
- Object spread copies own enumerable string and symbol properties into a new object.
- Rest parameters gather remaining function arguments into an array.
- Object rest gathers remaining own enumerable properties into a new object.
- Spread and rest are shallow operations. Nested objects remain shared references.
- Spreading an iterable requires an iterator. Numbered properties and length alone are not enough.
- Later object properties override earlier properties with the same key.
- Object spread reads values, so getters may run and accessor descriptors are not preserved.
- Object spread copies "__proto__" as data instead of changing the target's prototype.
- Use the syntax whose context makes the intended expansion or collection clear.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [55 - Object and array destructuring](055-object-and-array-destructuring.md) | [Open Q&A](../qnas/056-spread-syntax-and-rest-properties.md) | [Open example](../examples/056-spread-syntax-and-rest-properties.md) | [57 - Object identity, shallow copies, deep copies, and structuredClone](057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) |
