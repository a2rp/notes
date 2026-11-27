# 55 - Object and array destructuring: examples

These examples show how to read object properties and iterable values into bindings, use defaults and aliases, handle nested data, collect rest values, and assign to existing targets. Each example includes a question, complete code, expected output, and an explanation.

## 1. Read object properties into bindings

### Question

How can two named properties be read into local bindings?

### Code

~~~js
const user = {
    name: "Asha",
    role: "editor"
};

const { name, role } = user;

console.log(name);
console.log(role);
~~~

### Expected output

~~~text
Asha
editor
~~~

### Explanation

The object pattern selects properties by their keys. The pattern creates local bindings with the same names and leaves user unchanged.

## 2. Rename a property while destructuring

### Question

How can displayName be stored in a local variable called label?

### Code

~~~js
const account = {
    displayName: "Mina Dev",
    id: 42
};

const { displayName: label, id: accountId } = account;

console.log(label);
console.log(accountId);
~~~

### Expected output

~~~text
Mina Dev
42
~~~

### Explanation

The property name comes before the colon and the local binding comes after it. This does not rename either property on account.

## 3. Select only the fields a task needs

### Question

Can a pattern select some object properties and leave the rest alone?

### Code

~~~js
const product = {
    name: "Notebook",
    price: 8,
    stock: 14
};

const { name, price } = product;

console.log(name);
console.log(price);
console.log(product.stock);
~~~

### Expected output

~~~text
Notebook
8
14
~~~

### Explanation

Unselected properties do not need bindings. They remain on the original object.

## 4. Use a default for a missing property

### Question

How can a default language be used when a property is absent?

### Code

~~~js
const settings = {
    theme: "dark"
};

const { theme, language = "en" } = settings;

console.log(theme);
console.log(language);
~~~

### Expected output

~~~text
dark
en
~~~

### Explanation

language is missing, so its value is undefined and the default is used.

## 5. Compare missing, undefined, and null

### Question

Which values trigger a destructuring default?

### Code

~~~js
const first = {};
const second = { value: undefined };
const third = { value: null };

const { value: firstValue = "fallback" } = first;
const { value: secondValue = "fallback" } = second;
const { value: thirdValue = "fallback" } = third;

console.log(firstValue);
console.log(secondValue);
console.log(thirdValue);
~~~

### Expected output

~~~text
fallback
fallback
null
~~~

### Explanation

A missing property and a property containing undefined both trigger the default. Null is a value and is preserved.

## 6. Preserve other falsy values

### Question

Do defaults replace zero, false, or an empty string?

### Code

~~~js
const input = {
    retries: 0,
    enabled: false,
    label: ""
};

const {
    retries = 3,
    enabled = true,
    label = "Untitled"
} = input;

console.log(retries);
console.log(enabled);
console.log(JSON.stringify(label));
~~~

### Expected output

~~~text
0
false
""
~~~

### Explanation

Defaults apply only to undefined. They do not use a truthiness check.

## 7. Run a default expression only when needed

### Question

When is a function used as a default called?

### Code

~~~js
let calls = 0;

function defaultName() {
    calls += 1;
    return "Guest";
}

const firstUser = { name: "Asha" };
const secondUser = {};

const { name: firstName = defaultName() } = firstUser;
const { name: secondName = defaultName() } = secondUser;

console.log(firstName);
console.log(secondName);
console.log(calls);
~~~

### Expected output

~~~text
Asha
Guest
1
~~~

### Explanation

The first property has a value, so its default expression is not evaluated. The second property is missing, so the function runs once.

## 8. Read a nested property

### Question

How can city and country be read from a nested address?

### Code

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

### Expected output

~~~text
Pune
India
~~~

### Explanation

The nested pattern reads the address property and then its city and country properties. It does not create an address binding.

## 9. Bind the parent and nested value

### Question

How can both the address object and its city be available?

### Code

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

### Expected output

~~~text
Pune
Pune
~~~

### Explanation

The first address entry creates a binding for the whole nested object. The nested pattern separately creates city.

## 10. Give a nested object a fallback

### Question

How can a missing address object be handled during nested destructuring?

### Code

~~~js
const user = {};

const {
    address: { city = "Unknown" } = {}
} = user;

console.log(city);
~~~

### Expected output

~~~text
Unknown
~~~

### Explanation

The default empty object is used because address is undefined. The city default then applies because that property is also undefined. This pattern still needs separate handling if address can be null.

## 11. Select a property using a variable key

### Question

How can a variable choose which object property to read?

### Code

~~~js
const field = "email";
const user = {
    email: "mina@example.test",
    role: "editor"
};

const { [field]: value } = user;

console.log(value);
~~~

### Expected output

~~~text
mina@example.test
~~~

### Explanation

The brackets evaluate field to select the property key. The colon assigns the selected value to the local variable value.

## 12. Collect remaining properties with object rest

### Question

How can id be separated from the rest of the user's own fields?

### Code

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

### Expected output

~~~text
7
name, role, active
editor
~~~

### Explanation

The property id is selected first and excluded from profile. The rest binding receives a new shallow object containing the remaining own enumerable properties.

## 13. Object rest includes enumerable symbols

### Question

Does object rest copy a remaining enumerable symbol property?

### Code

~~~js
const internal = Symbol("internal");
const source = {
    name: "Asha",
    [internal]: 42
};

const { name, ...rest } = source;

console.log(name);
console.log(Reflect.ownKeys(rest).length);
console.log(rest[internal]);
~~~

### Expected output

~~~text
Asha
1
42
~~~

### Explanation

Object rest includes remaining own enumerable symbol keys as well as string keys.

## 14. Object rest excludes inherited and non-enumerable properties

### Question

Which properties remain after destructuring this object?

### Code

~~~js
const prototype = {
    inherited: "from prototype"
};

const source = Object.create(prototype);
source.name = "Dev";

Object.defineProperty(source, "hidden", {
    value: "not enumerable",
    enumerable: false
});

const { name, ...rest } = source;

console.log(rest.inherited);
console.log(rest.hidden);
console.log(Object.keys(rest).length);
~~~

### Expected output

~~~text
undefined
undefined
0
~~~

### Explanation

Object rest collects remaining own enumerable properties. inherited belongs to the prototype, and hidden is non-enumerable, so neither is copied.

## 15. Read an inherited property with an object pattern

### Question

Can ordinary object destructuring read a property from the prototype?

### Code

~~~js
const prototype = {
    role: "admin"
};

const user = Object.create(prototype);
user.name = "Asha";

const { role, ...rest } = user;

console.log(role);
console.log(rest.name);
console.log(Object.hasOwn(rest, "role"));
~~~

### Expected output

~~~text
admin
Asha
false
~~~

### Explanation

The role binding uses ordinary property access and can find an inherited value. Object rest only collects own enumerable properties, so role is not copied into rest.

## 16. A destructured getter is evaluated

### Question

What happens when the selected object property is a getter?

### Code

~~~js
let reads = 0;

const source = {
    get value() {
        reads += 1;
        return "read";
    }
};

const { value } = source;

console.log(value);
console.log(reads);
~~~

### Expected output

~~~text
read
1
~~~

### Explanation

Destructuring reads the property, which invokes its getter once.

## 17. Read array values by position

### Question

How can the first two colors be assigned to variables?

### Code

~~~js
const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(first);
console.log(second);
~~~

### Expected output

~~~text
red
green
~~~

### Explanation

An array pattern consumes iterable values in sequence. It does not remove them from the source array.

## 18. Skip an array value

### Question

How can the second position be skipped?

### Code

~~~js
const coordinates = [12, 30, 48];
const [x, , z] = coordinates;

console.log(x);
console.log(z);
~~~

### Expected output

~~~text
12
48
~~~

### Explanation

The empty slot in the pattern is an elision. It consumes one value without creating a binding.

## 19. Use defaults in an array pattern

### Question

How do missing and null values behave with array defaults?

### Code

~~~js
const values = [undefined, null];
const [first = "fallback", second = "fallback", third = "fallback"] = values;

console.log(first);
console.log(second);
console.log(third);
~~~

### Expected output

~~~text
fallback
null
fallback
~~~

### Explanation

The first value is undefined, the second is null, and the third value is missing. Defaults apply to the first and third values only.

## 20. Collect remaining array values

### Question

How can the first two scores be separated from all remaining scores?

### Code

~~~js
const scores = [91, 84, 77, 68];
const [best, second, ...remaining] = scores;

console.log(best);
console.log(second);
console.log(remaining.join(", "));
~~~

### Expected output

~~~text
91
84
77, 68
~~~

### Explanation

The rest element gathers all remaining iterable values into a new array and must be last in the pattern.

## 21. Destructure nested arrays

### Question

How can coordinates from two points be assigned to four variables?

### Code

~~~js
const points = [
    [3, 5],
    [8, 13]
];

const [[firstX, firstY], [secondX, secondY]] = points;

console.log(firstX, firstY);
console.log(secondX, secondY);
~~~

### Expected output

~~~text
3 5
8 13
~~~

### Explanation

Each nested pattern consumes values from one inner array.

## 22. Destructure a string iterable

### Question

What values does a string provide to an array pattern?

### Code

~~~js
const [first, second] = "Hi";

console.log(first);
console.log(second);
~~~

### Expected output

~~~text
H
i
~~~

### Explanation

Strings are iterable, so their iterator provides values to an array pattern.

## 23. Destructure a string containing an emoji

### Question

Does string iteration split this emoji into two separate values?

### Code

~~~js
const [letter, emoji] = "A😀";

console.log(letter);
console.log(emoji);
console.log(emoji.length);
~~~

### Expected output

~~~text
A
😀
2
~~~

### Explanation

The string iterator yields the emoji as one code point value. That value has a UTF-16 length of two code units.

## 24. Destructure a Set

### Question

Can a Set provide values to an array pattern?

### Code

~~~js
const [first, second] = new Set(["red", "blue", "green"]);

console.log(first);
console.log(second);
~~~

### Expected output

~~~text
red
blue
~~~

### Explanation

A Set is iterable. Destructuring consumes its values in iteration order.

## 25. Destructure from a generator and observe consumption

### Question

What happens to the generator after two values are destructured?

### Code

~~~js
function* createValues() {
    yield "first";
    yield "second";
    yield "third";
}

const iterator = createValues();
const [first, second] = iterator;

console.log(first);
console.log(second);
console.log(iterator.next().value);
~~~

### Expected output

~~~text
first
second
third
~~~

### Explanation

Destructuring consumes the first two values from the iterator. The iterator remains positioned at the third value.

## 26. Use a default with a sparse array

### Question

What does an array pattern receive from an unassigned array slot?

### Code

~~~js
const values = ["first", , "third"];
const [first, second = "fallback", third] = values;

console.log(first);
console.log(second);
console.log(third);
~~~

### Expected output

~~~text
first
fallback
third
~~~

### Explanation

The array iterator yields undefined for the empty slot. Since the value is undefined, the default is used.

## 27. Assign to existing variables

### Question

How can values from an array be assigned to variables declared earlier?

### Code

~~~js
let x;
let y;

[x, y] = [10, 20];

console.log(x);
console.log(y);
~~~

### Expected output

~~~text
10
20
~~~

### Explanation

This is a destructuring assignment, not a declaration. The targets already exist.

## 28. Parenthesize object destructuring assignment

### Question

How can properties be assigned to existing variables without a declaration?

### Code

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

### Expected output

~~~text
Asha
editor
~~~

### Explanation

The parentheses make the braces parse as an assignment pattern rather than a block statement.

## 29. Assign values to existing object properties

### Question

How can object destructuring assignment update existing properties?

### Code

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

### Expected output

~~~text
Mina
author
~~~

### Explanation

The left side names existing assignment targets. No local name or property is declared by this assignment pattern.

## 30. Swap two values

### Question

How can two variables exchange values without a temporary variable?

### Code

~~~js
let first = "left";
let second = "right";

[first, second] = [second, first];

console.log(first);
console.log(second);
~~~

### Expected output

~~~text
right
left
~~~

### Explanation

The right-hand array is evaluated using the original values before assignment updates either variable.

## 31. Destructure an options object in a function

### Question

How can a function accept named options and default a missing level?

### Code

~~~js
function createMessage({ text, level = "info" }) {
    return "[" + level + "] " + text;
}

console.log(createMessage({ text: "Saved" }));
console.log(createMessage({ text: "Check input", level: "warning" }));
~~~

### Expected output

~~~text
[info] Saved
[warning] Check input
~~~

### Explanation

The parameter pattern selects named options. The default applies when level is missing or undefined.

## 32. Give an options parameter a whole-object default

### Question

How can a function work when its options argument is omitted?

### Code

~~~js
function createLabel({ text = "Untitled", level = "info" } = {}) {
    return "[" + level + "] " + text;
}

console.log(createLabel());
console.log(createLabel({ text: "Ready" }));
~~~

### Expected output

~~~text
[info] Untitled
[info] Ready
~~~

### Explanation

The outer default supplies an empty object for an omitted argument. The inner defaults fill in missing properties.

## 33. Handle a nullable nested value before destructuring

### Question

How can a null profile be treated as an empty object?

### Code

~~~js
const user = {
    profile: null
};

const profile = user.profile ?? {};
const { name = "Guest" } = profile;

console.log(name);
~~~

### Expected output

~~~text
Guest
~~~

### Explanation

The nullish coalescing expression handles both null and undefined before the object pattern reads name.

## 34. Use an array pattern in a function parameter

### Question

How can a function accept a coordinate pair?

### Code

~~~js
function describePoint([x, y]) {
    return "x=" + x + ", y=" + y;
}

console.log(describePoint([4, 9]));
~~~

### Expected output

~~~text
x=4, y=9
~~~

### Explanation

The parameter pattern consumes the iterable argument by position. This is a good fit when each position has a fixed, obvious meaning.

## 35. Receive a pair returned by a function

### Question

How can the two values from a returned array be named at the call site?

### Code

~~~js
function getRange() {
    return [4, 9];
}

const [minimum, maximum] = getRange();

console.log(minimum);
console.log(maximum);
~~~

### Expected output

~~~text
4
9
~~~

### Explanation

The function returns an array, and the caller names its positions with a pattern.

## 36. Confirm that destructuring does not mutate the source

### Question

Does selecting array values remove them from the original array?

### Code

~~~js
const values = ["one", "two"];
const [first] = values;

console.log(first);
console.log(values.join(", "));
~~~

### Expected output

~~~text
one
one, two
~~~

### Explanation

Destructuring reads values. It does not shift or remove array elements.

## 37. Notice that rest is shallow

### Question

Does object rest make a deep copy of nested objects?

### Code

~~~js
const source = {
    id: 1,
    profile: {
        name: "Asha"
    }
};

const { id, ...copy } = source;
copy.profile.name = "Mina";

console.log(source.profile.name);
console.log(copy.profile.name);
console.log(source === copy);
~~~

### Expected output

~~~text
Mina
Mina
false
~~~

### Explanation

copy is a new outer object, but its nested profile value is the same object reference used by source.

## 38. Destructure a boxed primitive property

### Question

Can an object pattern read a string's length?

### Code

~~~js
const { length } = "hello";
console.log(length);
~~~

### Expected output

~~~text
5
~~~

### Explanation

A non-null primitive can be used by an object pattern through its boxed property access. Null and undefined are not destructurable this way.

## Practice prompts

1. Read a property into a differently named local binding.
2. Add defaults and compare missing, undefined, null, false, zero, and an empty string.
3. Destructure a nested object and provide a default for each potentially missing level.
4. Use a computed property name in an object pattern.
5. Separate one property from an object with rest and inspect the remaining keys.
6. Destructure an array while skipping a value and collecting the remainder.
7. Consume a Set or generator with an array pattern.
8. Swap two existing variables.
9. Use object and array patterns in function parameters.
10. Explain why a nested object rest result is shallow.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [54 - Computed properties, shorthand, and method definitions](054-computed-properties-shorthand-and-method-definitions.md) | [Open lesson](../lessons/055-object-and-array-destructuring.md) | [Open Q&A](../qnas/055-object-and-array-destructuring.md) | [56 - Spread syntax and rest properties](../lessons/056-spread-syntax-and-rest-properties.md) |
