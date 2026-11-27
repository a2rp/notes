# 55 - Object and array destructuring

Destructuring extracts values from objects and iterables into variables or assignment targets. It is useful when a function returns several values, when an object has many fields, or when a function accepts a group of options.

This chapter explains object and array binding patterns, renamed properties, defaults, nested patterns, rest, assignment to existing variables, function parameters, and common edge cases.

## What you will learn

- Read values from objects by property name.
- Rename a property while assigning it to a local variable.
- Read values from arrays and other iterables by position.
- Use defaults when a value is undefined.
- Destructure nested objects and arrays.
- Collect remaining values with array rest and object rest.
- Distinguish declaration patterns from assignment patterns.
- Use destructuring in function parameters.
- Avoid errors caused by null, undefined, missing bindings, or confusing pattern syntax.

## What destructuring does

Destructuring patterns describe which values to read and where to put them. An object pattern matches property names. An array pattern consumes values from an iterable in sequence.

~~~js
const user = {
    name: "Asha",
    role: "editor"
};

const { name, role } = user;

console.log(name);
console.log(role);
~~~

Output:

~~~text
Asha
editor
~~~

The braces on the left are a binding pattern, not a new object literal. The pattern reads the name and role properties and creates two bindings.

## Object destructuring

### Match property names

The shortest object pattern uses the same name for the source property and local variable:

~~~js
const user = {
    name: "Mina",
    active: true
};

const { name, active } = user;

console.log(name);
console.log(active);
~~~

Output:

~~~text
Mina
true
~~~

The property name selects a value from user. The binding with the same name receives that value. The source object is not changed.

### Rename a property

Use propertyName: localName to read one key and store its value under a different variable name:

~~~js
const account = {
    id: 42,
    displayName: "Asha Rao"
};

const { displayName: name, id: accountId } = account;

console.log(name);
console.log(accountId);
~~~

Output:

~~~text
Asha Rao
42
~~~

The source keys are displayName and id. The local bindings are name and accountId. This syntax does not rename or modify properties on the original object.

### Select only the properties you need

A pattern can select a few values and leave other object properties unused:

~~~js
const product = {
    name: "Notebook",
    price: 8,
    stock: 14
};

const { name, price } = product;

console.log(name);
console.log(price);
~~~

Output:

~~~text
Notebook
8
~~~

Destructuring does not require a binding for every property. The unused stock property remains unchanged on product.

### Use a default for a missing or undefined property

Add an initializer after a binding to provide a fallback when the property value is undefined:

~~~js
const settings = {
    theme: "dark"
};

const { theme, language = "en" } = settings;

console.log(theme);
console.log(language);
~~~

Output:

~~~text
dark
en
~~~

The default also applies when a present property explicitly contains undefined:

~~~js
const settings = {
    language: undefined
};

const { language = "en" } = settings;

console.log(language);
~~~

Output:

~~~text
en
~~~

A default does not replace null, false, zero, or an empty string:

~~~js
const settings = {
    theme: null,
    retries: 0,
    label: ""
};

const {
    theme = "light",
    retries = 3,
    label = "Untitled"
} = settings;

console.log(theme);
console.log(retries);
console.log(label);
~~~

Output:

~~~text
null
0

~~~

Defaults are based on undefined, not on general falsiness. If null should also use a fallback, use a nullish coalescing expression after destructuring.

### Evaluate defaults only when needed

A default expression is evaluated only when the extracted value is undefined:

~~~js
let defaultCalls = 0;

function createDefault() {
    defaultCalls += 1;
    return "guest";
}

const first = { name: "Asha" };
const second = {};

const { name: firstName = createDefault() } = first;
const { name: secondName = createDefault() } = second;

console.log(firstName);
console.log(secondName);
console.log(defaultCalls);
~~~

Output:

~~~text
Asha
guest
1
~~~

The default function is not called for firstName because the property has a value. It runs once for secondName because that property is missing.

### Destructure nested objects

A nested pattern can read a property inside another object:

~~~js
const user = {
    name: "Mina",
    address: {
        city: "Pune",
        country: "India"
    }
};

const {
    address: { city, country }
} = user;

console.log(city);
console.log(country);
~~~

Output:

~~~text
Pune
India
~~~

The pattern does not create an address binding. Add address separately if both the nested values and the nested object are needed.

~~~js
const user = {
    address: {
        city: "Pune"
    }
};

const {
    address,
    address: { city }
} = user;

console.log(address.city);
console.log(city);
~~~

Output:

~~~text
Pune
Pune
~~~

A default can protect a nested pattern when the intermediate property is missing or undefined:

~~~js
const user = {};
const {
    address: { city } = {}
} = user;

console.log(city);
~~~

Output:

~~~text
undefined
~~~

The empty object supplies the missing address value. This pattern does not protect against address being null. If null is a valid possibility, handle it explicitly before using a nested pattern.

### Use computed property names

Object destructuring can select a property whose key is stored in a variable:

~~~js
const field = "email";
const user = {
    email: "asha@example.test"
};

const { [field]: value } = user;

console.log(value);
~~~

Output:

~~~text
asha@example.test
~~~

The property key expression appears in brackets. A colon is required to choose the local binding name when the key is computed.

### Object rest collects remaining own enumerable properties

Use a rest property after selected properties to collect the remaining own enumerable properties into a new object:

~~~js
const user = {
    id: 7,
    name: "Mina",
    role: "editor",
    active: true
};

const { id, ...profile } = user;

console.log(id);
console.log(Object.keys(profile).join(", "));
console.log(profile.role);
~~~

Output:

~~~text
7
name, role, active
editor
~~~

The property selected as id is excluded from profile. The remaining properties are copied into a new shallow object. Nested objects are not deeply cloned.

Object rest includes remaining own enumerable string and symbol keys. It does not copy inherited or non-enumerable properties. A property getter may run while its value is read and copied.

~~~js
const internal = Symbol("internal");
const source = {
    name: "Asha",
    [internal]: 42
};

Object.defineProperty(source, "hidden", {
    value: true,
    enumerable: false
});

const { name, ...rest } = source;

console.log(name);
console.log(Reflect.ownKeys(rest).length);
console.log(rest[internal]);
console.log(Object.hasOwn(rest, "hidden"));
~~~

Output:

~~~text
Asha
1
42
false
~~~

Object rest syntax is useful for excluding fields or separating public data from a selected property. The full behavior and relationship to spread syntax are covered in the following chapter.

## Array destructuring

### Match values by position

Array patterns read values from an iterable in order:

~~~js
const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(first);
console.log(second);
~~~

Output:

~~~text
red
green
~~~

The first binding receives the first yielded value, and the second receives the next one. The source array remains unchanged.

### Skip values with elisions

A comma without a binding skips one position:

~~~js
const coordinates = [12, 30, 48];
const [, y] = coordinates;

console.log(y);
~~~

Output:

~~~text
30
~~~

An elision advances the iterator without creating a binding for that value.

### Use defaults for missing or undefined values

Array binding defaults are also used only when the consumed value is undefined:

~~~js
const values = [undefined, null, 0];
const [first = "fallback", second = "fallback", third = 9] = values;

console.log(first);
console.log(second);
console.log(third);
~~~

Output:

~~~text
fallback
null
0
~~~

Null and zero are preserved. A missing value and an explicit undefined value both trigger the default.

### Collect remaining iterable values

Place a rest element at the end of the array pattern to collect the remaining values into a new array:

~~~js
const scores = [91, 84, 77, 68];
const [best, second, ...remaining] = scores;

console.log(best);
console.log(second);
console.log(remaining.join(", "));
~~~

Output:

~~~text
91
84
77, 68
~~~

An array rest element must be last in its pattern. The collected array is new, but if the values are objects, those objects are still shared references.

### Destructure nested arrays

Nested patterns describe nested iterable values:

~~~js
const points = [
    [3, 5],
    [8, 13]
];

const [[firstX, firstY], [secondX, secondY]] = points;

console.log(firstX, firstY);
console.log(secondX, secondY);
~~~

Output:

~~~text
3 5
8 13
~~~

Each inner pattern consumes values from its corresponding inner iterable.

### Array patterns work with iterables, not only arrays

Array destructuring uses the iterable protocol. A string, a Set, and a generator can provide values to an array pattern:

~~~js
const [firstLetter, secondLetter] = "Hi";
const [firstColor, secondColor] = new Set(["red", "blue"]);

function* createValues() {
    yield "first";
    yield "second";
}

const [firstValue, secondValue] = createValues();

console.log(firstLetter, secondLetter);
console.log(firstColor, secondColor);
console.log(firstValue, secondValue);
~~~

Output:

~~~text
H i
red blue
first second
~~~

Array destructuring is not simply numeric property lookup. It asks the source for an iterator and consumes its values. Strings iterate by Unicode code point, so a supplementary character is not split into two surrogate halves:

~~~js
const [letter, symbol] = "A😀";

console.log(letter);
console.log(symbol);
console.log(symbol.length);
~~~

Output:

~~~text
A
😀
2
~~~

The emoji is one iterated string value, even though its UTF-16 length is two code units.

### An object is not automatically iterable

An object with numbered properties is not necessarily iterable:

~~~js
const record = {
    0: "first",
    1: "second",
    length: 2
};

console.log(record[0]);
console.log(typeof record[Symbol.iterator]);
~~~

Output:

~~~text
first
undefined
~~~

An array pattern cannot consume record unless the object implements the iterable protocol. Array-like properties such as numeric keys and length do not by themselves make an object iterable.

### Array rest and missing values

When the source ends before every binding is assigned, the remaining bindings receive undefined unless they have defaults:

~~~js
const [first, second = "fallback", ...rest] = ["one"];

console.log(first);
console.log(second);
console.log(rest.length);
~~~

Output:

~~~text
one
fallback
0
~~~

The iterator has no second value, so the default is used. There are no remaining values for rest.

## Destructuring assignment

Destructuring can also assign values to variables that already exist. It does not declare new bindings:

~~~js
let x;
let y;

[x, y] = [10, 20];

console.log(x);
console.log(y);
~~~

Output:

~~~text
10
20
~~~

### Parenthesize object destructuring assignment

An object pattern at the start of a statement can look like a block. Wrap the assignment in parentheses:

~~~js
let name;
let role;

({ name, role } = {
    name: "Asha",
    role: "editor"
});

console.log(name);
console.log(role);
~~~

Output:

~~~text
Asha
editor
~~~

The parentheses tell JavaScript to parse the braces as an object assignment pattern, not a block statement.

### Assign to existing properties

Assignment patterns can target existing variables and writable properties:

~~~js
const user = {
    name: "",
    role: ""
};

({ name: user.name, role: user.role } = {
    name: "Mina",
    role: "author"
});

console.log(user.name);
console.log(user.role);
~~~

Output:

~~~text
Mina
author
~~~

The left side contains assignment targets. It does not declare local variables named name and role.

### Swap variables

Array destructuring assignment can swap values without a temporary variable:

~~~js
let first = "left";
let second = "right";

[first, second] = [second, first];

console.log(first);
console.log(second);
~~~

Output:

~~~text
right
left
~~~

The right-hand array is evaluated before its values are assigned to the targets.

## Destructuring in function parameters

A parameter can use an object pattern to name the options a function needs:

~~~js
function createLabel({ text, level = "info" }) {
    return "[" + level + "] " + text;
}

console.log(createLabel({ text: "Saved" }));
console.log(createLabel({ text: "Check input", level: "warning" }));
~~~

Output:

~~~text
[info] Saved
[warning] Check input
~~~

This makes calls self-documenting because the caller supplies named properties instead of relying on a positional argument order.

Give the whole parameter a default when callers may omit the options object:

~~~js
function createLabel({ text = "Untitled", level = "info" } = {}) {
    return "[" + level + "] " + text;
}

console.log(createLabel());
console.log(createLabel({ text: "Ready" }));
~~~

Output:

~~~text
[info] Untitled
[info] Ready
~~~

The outer default = {} handles a missing argument. The inner defaults handle missing or undefined properties. Passing null still throws because null cannot be destructured as an object.

Array parameter patterns are useful when argument positions intentionally form a sequence:

~~~js
function describePoint([x, y]) {
    return "x=" + x + ", y=" + y;
}

console.log(describePoint([4, 9]));
~~~

Output:

~~~text
x=4, y=9
~~~

Use object parameters when arguments are named options. Use array parameters when the positions have an obvious fixed meaning.

## Missing values and null

Destructuring an object pattern from null or undefined throws a TypeError:

~~~js
const source = null;

// const { name } = source; // TypeError
~~~

Provide a deliberate fallback if a source may be absent:

~~~js
const source = null;
const { name = "Guest" } = source ?? {};

console.log(name);
~~~

Output:

~~~text
Guest
~~~

This handles null and undefined by selecting an empty object first. It does not make every malformed input valid, so validate data when its shape is not trusted.

A non-null primitive can be used with an object pattern through its boxed properties. For example, a string has a length property:

~~~js
const { length } = "hello";
console.log(length);
~~~

Output:

~~~text
5
~~~

Array patterns require an iterable. Some primitives, including strings, are iterable. A plain number is not iterable.

## Common mistakes

- Confusing object property names with local binding names. Use propertyName: localName to rename a binding.
- Using array destructuring on a plain object that only has numeric keys and a length property.
- Assuming array destructuring uses index properties instead of the iterator protocol.
- Assuming defaults replace null, false, zero, or an empty string. Defaults replace undefined.
- Assuming a nested default handles null. A nested pattern still cannot read properties of null.
- Forgetting that a nested object pattern does not automatically create a binding for the parent object.
- Forgetting the comma that creates an array elision when skipping a position.
- Placing an array rest element before other elements. Rest must be last.
- Expecting object rest to copy inherited or non-enumerable properties.
- Treating rest as a deep clone.
- Writing an object destructuring assignment at the start of a statement without parentheses.
- Using destructuring assignment as if it declared new variables.
- Passing no argument to a function whose destructured parameter has no whole-parameter default.
- Writing a very deep pattern that hides the expected input shape. Use intermediate variables when that improves clarity.

## Try it yourself

1. Read two fields from a user object, renaming one local binding.
2. Add a default for a missing language setting and test both undefined and null.
3. Read the city from a nested address object with an appropriate fallback.
4. Select a property using a key stored in a variable.
5. Use object rest to make a shallow object without an internal identifier.
6. Read the first and third values from an array while skipping the second.
7. Use an array default for a missing value and compare it with an explicit null.
8. Collect all values after the first two with array rest.
9. Destructure a string and a Set to confirm that array patterns consume iterables.
10. Swap two existing variables with destructuring assignment.
11. Write a function that takes a destructured options object and defaults it to an empty object.
12. Explain why a numbered object with a length property may still not work with an array pattern.

## Key points

- Object patterns select properties by key, and array patterns consume iterable values by position.
- Property aliases use propertyName: localName.
- Defaults run only when the selected value is undefined.
- Nested patterns can read nested values, but their intermediate values must not be null or undefined unless a fallback is provided.
- Array rest collects remaining iterator values into a new array and must appear last.
- Object rest gathers remaining own enumerable properties into a new shallow object.
- Destructuring assignment targets existing variables or properties. It does not declare bindings.
- Parenthesize object destructuring assignments at the start of a statement.
- Destructured function parameters can make APIs clearer, and a whole-parameter default can handle omitted options.
- Destructuring does not mutate the source object or array by itself.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [54 - Computed properties, shorthand, and method definitions](054-computed-properties-shorthand-and-method-definitions.md) | [Open Q&A](../qnas/055-object-and-array-destructuring.md) | [Open example](../examples/055-object-and-array-destructuring.md) | [56 - Spread syntax and rest properties](056-spread-syntax-and-rest-properties.md) |
