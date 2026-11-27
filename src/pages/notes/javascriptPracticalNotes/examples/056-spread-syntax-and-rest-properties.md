# 56 - Spread syntax and rest properties: examples

These examples show how the three-dot syntax expands iterable values or gathers remaining values, depending on its position. Each includes a question, complete code, expected output, and an explanation.

## 1. Spread an array into a function call

### Question

How can values from an array be passed as separate arguments?

### Code

~~~js
const scores = [72, 94, 81];

console.log(Math.max(...scores));
~~~

### Expected output

~~~text
94
~~~

### Explanation

Call spread expands the array's iterable values into separate arguments to Math.max.

## 2. Mix regular arguments and spread arguments

### Question

Can an expanded iterable be used alongside regular call arguments?

### Code

~~~js
function describe(first, second, third) {
    return first + " / " + second + " / " + third;
}

const topics = ["HTML", "CSS"];

console.log(describe("JavaScript", ...topics));
~~~

### Expected output

~~~text
JavaScript / HTML / CSS
~~~

### Explanation

The two values from topics fill the second and third parameter positions.

## 3. Spread a Set into a call

### Question

Can a Set's values be passed as separate function arguments?

### Code

~~~js
function joinThree(first, second, third) {
    return [first, second, third].join(", ");
}

const colors = new Set(["red", "green", "blue"]);

console.log(joinThree(...colors));
~~~

### Expected output

~~~text
red, green, blue
~~~

### Explanation

A Set is iterable, so its values can be expanded into the call in iteration order.

## 4. Gather any number of arguments with a rest parameter

### Question

How can a function collect all arguments after its first argument?

### Code

~~~js
function describe(first, ...remaining) {
    return first + " | " + remaining.join(", ");
}

console.log(describe("required", "one", "two"));
console.log(describe("required"));
~~~

### Expected output

~~~text
required | one, two
required |
~~~

### Explanation

The first argument goes to first. The rest parameter gathers every later argument into an array, including an empty array when none remain.

## 5. Sum values using a rest parameter

### Question

How can a function accept a variable number of numbers and add them?

### Code

~~~js
function sum(...values) {
    let total = 0;

    for (const value of values) {
        total += value;
    }

    return total;
}

console.log(sum(2, 3, 4));
console.log(sum());
~~~

### Expected output

~~~text
9
0
~~~

### Explanation

values is a real array. When no values are passed, it is empty and the total remains zero.

## 6. Use array methods on a rest parameter

### Question

Can a rest parameter be processed with array methods?

### Code

~~~js
function uppercaseAll(...words) {
    return words.map((word) => word.toUpperCase());
}

console.log(uppercaseAll("html", "css", "javascript").join(", "));
~~~

### Expected output

~~~text
HTML, CSS, JAVASCRIPT
~~~

### Explanation

A rest parameter is an array, so methods such as map are available directly.

## 7. Expand an iterable into a new array

### Question

How can values be inserted between fixed array elements?

### Code

~~~js
const middle = ["HTML", "CSS"];
const topics = ["Start", ...middle, "JavaScript", "Finish"];

console.log(topics.join(", "));
~~~

### Expected output

~~~text
Start, HTML, CSS, JavaScript, Finish
~~~

### Explanation

Array spread inserts each yielded value into the new array in sequence.

## 8. Make a shallow copy of an array

### Question

How can an array be copied into a different outer array?

### Code

~~~js
const original = [10, 20, 30];
const copy = [...original];

console.log(copy.join(", "));
console.log(copy === original);
~~~

### Expected output

~~~text
10, 20, 30
false
~~~

### Explanation

The new array contains the same values but is a different outer array.

## 9. Show that array spread is shallow

### Question

Are object elements inside a copied array cloned?

### Code

~~~js
const original = [{ name: "Asha" }];
const copy = [...original];

copy[0].name = "Mina";

console.log(original[0].name);
console.log(copy === original);
console.log(copy[0] === original[0]);
~~~

### Expected output

~~~text
Mina
false
true
~~~

### Explanation

The arrays differ, but both contain the same object reference. Spread does not recursively clone nested values.

## 10. Combine arrays without modifying the sources

### Question

How can two arrays be combined into a new array?

### Code

~~~js
const required = ["name", "email"];
const optional = ["phone", "company"];
const fields = [...required, ...optional];

console.log(fields.join(", "));
console.log(required.length);
console.log(optional.length);
~~~

### Expected output

~~~text
name, email, phone, company
2
2
~~~

### Explanation

Each source iterable is expanded into a newly created array. The original arrays remain unchanged.

## 11. Convert a Set into an array

### Question

How can a Set's unique values be stored in an array?

### Code

~~~js
const colors = new Set(["red", "green", "red"]);
const colorList = [...colors];

console.log(Array.isArray(colorList));
console.log(colorList.join(", "));
~~~

### Expected output

~~~text
true
red, green
~~~

### Explanation

Array spread consumes the Set iterator. The Set yields each distinct value once.

## 12. Spread a string by its iterator values

### Question

How does spread treat a string containing an emoji?

### Code

~~~js
const characters = [..."A😀"];

console.log(characters.length);
console.log(characters[0]);
console.log(characters[1]);
~~~

### Expected output

~~~text
2
A
😀
~~~

### Explanation

String iteration yields Unicode code point values. The emoji becomes one array element, even though its UTF-16 length is two.

## 13. Observe what happens to a sparse array slot

### Question

Does spreading a hole preserve an empty slot?

### Code

~~~js
const sparse = ["first", , "third"];
const copy = [...sparse];

console.log(1 in sparse);
console.log(1 in copy);
console.log(copy[1]);
~~~

### Expected output

~~~text
false
true
undefined
~~~

### Explanation

The array iterator yields undefined for the hole. Spread inserts that yielded value as an actual element in the new array.

## 14. Spread defaults and then override selected values

### Question

How can supplied options replace matching defaults?

### Code

~~~js
const defaults = {
    theme: "light",
    compact: false,
    language: "en"
};

const supplied = {
    theme: "dark",
    compact: true
};

const options = {
    ...defaults,
    ...supplied
};

console.log(options.theme);
console.log(options.compact);
console.log(options.language);
~~~

### Expected output

~~~text
dark
true
en
~~~

### Explanation

The properties are copied from left to right. supplied replaces matching defaults while language remains from the first source.

## 15. Override a spread property explicitly

### Question

Which value wins when an explicit property follows a spread?

### Code

~~~js
const defaults = {
    color: "blue",
    size: "medium"
};

const settings = {
    ...defaults,
    color: "green"
};

console.log(settings.color);
console.log(settings.size);
~~~

### Expected output

~~~text
green
medium
~~~

### Explanation

The explicit color property comes after the spread, so its later value wins.

## 16. Object spread copies own enumerable properties only

### Question

Are inherited and non-enumerable properties copied?

### Code

~~~js
const prototype = {
    inherited: true
};

const source = Object.create(prototype);
source.visible = "yes";

Object.defineProperty(source, "hidden", {
    value: "no",
    enumerable: false
});

const copy = {
    ...source
};

console.log(copy.visible);
console.log(copy.inherited);
console.log(copy.hidden);
console.log(Object.keys(copy).join(", "));
~~~

### Expected output

~~~text
yes
undefined
undefined
visible
~~~

### Explanation

Only visible is an own enumerable property. Object spread does not copy inherited or non-enumerable properties.

## 17. Copy enumerable symbol properties

### Question

Does object spread preserve an enumerable symbol-keyed value?

### Code

~~~js
const internal = Symbol("internal");
const source = {
    name: "Mina",
    [internal]: 42
};

const copy = {
    ...source
};

console.log(copy.name);
console.log(copy[internal]);
console.log(Reflect.ownKeys(copy).length);
~~~

### Expected output

~~~text
Mina
42
2
~~~

### Explanation

Object spread includes own enumerable symbols as well as own enumerable string keys.

## 18. Read a getter while spreading an object

### Question

Does spreading an accessor copy the getter itself?

### Code

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

### Expected output

~~~text
ready
1
undefined
~~~

### Explanation

The getter runs when spread reads the property's value. The result is copied as a data property, so the getter function is not present in the copy's descriptor.

## 19. Compare object spread with Object.assign and setters

### Question

Does object spread call a setter on its target the way Object.assign can?

### Code

~~~js
const target = {
    set name(value) {
        console.log("setter called:", value);
    }
};

Object.assign(target, {
    name: "Asha"
});

const copy = {
    ...target,
    name: "Mina"
};

console.log(copy.name);
~~~

### Expected output

~~~text
setter called: Asha
Mina
~~~

### Explanation

Object.assign writes to its existing target and invokes the name setter. Object spread builds a new object with data properties instead of assigning through that setter.

## 20. Copy a property named __proto__ as data

### Question

Does object spread change the target prototype when the source has an own __proto__ key?

### Code

~~~js
const source = JSON.parse('{"__proto__":{"admin":true}}');
const copy = {
    ...source
};

console.log(Object.hasOwn(copy, "__proto__"));
console.log(copy.__proto__.admin);
console.log(Object.getPrototypeOf(copy) === Object.prototype);
~~~

### Expected output

~~~text
true
true
true
~~~

### Explanation

The source key is copied as an own data property. Object spread does not use the special object-literal prototype setter syntax.

## 21. Ignore null and undefined object spread sources

### Question

Can null and undefined be included as object spread sources?

### Code

~~~js
const result = {
    ...null,
    ...undefined,
    ready: true
};

console.log(result.ready);
console.log(Object.keys(result).join(", "));
~~~

### Expected output

~~~text
true
ready
~~~

### Explanation

Null and undefined contribute no properties in object spread. The following ready property is created normally.

## 22. Spread enumerable string characters into an object

### Question

What properties result from spreading a string into an object?

### Code

~~~js
const letters = {
    ..."cat"
};

console.log(letters[0]);
console.log(letters[1]);
console.log(letters[2]);
console.log(Object.keys(letters).join(", "));
~~~

### Expected output

~~~text
c
a
t
0, 1, 2
~~~

### Explanation

The string's indexed character properties are enumerable and are copied to the new object.

## 23. Use object rest to separate a selected property

### Question

How can id be separated from all remaining profile fields?

### Code

~~~js
const user = {
    id: 7,
    name: "Asha",
    role: "editor"
};

const { id, ...profile } = user;

console.log(id);
console.log(Object.keys(profile).join(", "));
~~~

### Expected output

~~~text
7
name, role
~~~

### Explanation

Object rest gathers remaining own enumerable properties after excluding id.

## 24. Rename a selected property and collect the rest

### Question

Can a property be renamed locally and still be excluded from the rest object?

### Code

~~~js
const account = {
    user_id: 18,
    displayName: "Mina",
    active: true
};

const {
    user_id: id,
    ...details
} = account;

console.log(id);
console.log(Object.keys(details).join(", "));
console.log(Object.hasOwn(details, "user_id"));
~~~

### Expected output

~~~text
18
displayName, active
false
~~~

### Explanation

The source key user_id is selected and bound locally as id. That source key is excluded from details.

## 25. Use a computed key before object rest

### Question

How can a field name from a variable be selected and excluded from the rest?

### Code

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

### Expected output

~~~text
abc123
name, role
~~~

### Explanation

The computed property selects token. Object rest excludes the matching source key and gathers the remaining enumerable properties.

## 26. Include a remaining symbol in object rest

### Question

Does object rest retain a symbol property that was not selected?

### Code

~~~js
const internal = Symbol("internal");
const source = {
    id: 4,
    [internal]: "kept"
};

const { id, ...rest } = source;

console.log(id);
console.log(Reflect.ownKeys(rest).length);
console.log(rest[internal]);
~~~

### Expected output

~~~text
4
1
kept
~~~

### Explanation

Object rest includes remaining own enumerable symbols as well as string keys.

## 27. Show that object rest is shallow

### Question

Does object rest clone nested data?

### Code

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
console.log(copy === source);
console.log(copy.settings === source.settings);
~~~

### Expected output

~~~text
dark
false
true
~~~

### Explanation

copy is a different outer object, but its nested settings property references the same object as source.

## 28. Use object rest to remove several selected fields

### Question

How can multiple fields be excluded from the rest result?

### Code

~~~js
const record = {
    id: 5,
    token: "secret",
    name: "Asha",
    role: "author"
};

const {
    id,
    token,
    ...publicRecord
} = record;

console.log(Object.keys(publicRecord).join(", "));
console.log(publicRecord.name);
~~~

### Expected output

~~~text
name, role
Asha
~~~

### Explanation

Every property selected before rest is excluded from publicRecord.

## 29. Gather zero or more trailing function arguments

### Question

What array does a rest parameter create when there are no extra arguments?

### Code

~~~js
function inspect(first, ...others) {
    return [
        first,
        Array.isArray(others),
        others.length
    ];
}

console.log(inspect("only").join(", "));
~~~

### Expected output

~~~text
only, true, 0
~~~

### Explanation

others is an actual empty array because no arguments followed first.

## 30. Use spread and rest together

### Question

Can one function gather values and a caller expand them later?

### Code

~~~js
function makePair(...values) {
    return values;
}

const pair = makePair("left", "right");

function joinPair(first, second) {
    return first + " + " + second;
}

console.log(joinPair(...pair));
~~~

### Expected output

~~~text
left + right
~~~

### Explanation

The function parameter uses rest to collect arguments. The later call uses spread to expand the array back into separate arguments.

## 31. Preserve explicit choices instead of spreading the whole source

### Question

How can only approved fields be copied into a public object?

### Code

~~~js
const user = {
    id: 12,
    name: "Mina",
    role: "editor",
    secret: "do not expose"
};

const publicUser = {
    name: user.name,
    role: user.role
};

console.log(Object.keys(publicUser).join(", "));
console.log(Object.hasOwn(publicUser, "secret"));
~~~

### Expected output

~~~text
name, role
false
~~~

### Explanation

Explicitly selecting fields makes the public output clear. Spreading the whole object would copy secret too if it is enumerable.

## Practice prompts

1. Expand an array into a function call.
2. Write a rest parameter that returns the largest value passed to it.
3. Copy an iterable into an array and compare identity with the source.
4. Merge defaults and overrides in two different orders.
5. Add enumerable and non-enumerable symbol keys and inspect a spread result.
6. Copy an object with a getter and check whether the copy has a getter descriptor.
7. Exclude multiple properties with object rest.
8. Compare shallow array and object copies using nested objects.
9. Compare Object.assign with object spread when the target has a setter.
10. Explain why an array-like object might not work with spread syntax.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [55 - Object and array destructuring](055-object-and-array-destructuring.md) | [Open lesson](../lessons/056-spread-syntax-and-rest-properties.md) | [Open Q&A](../qnas/056-spread-syntax-and-rest-properties.md) | [57 - Object identity, shallow copies, deep copies, and structuredClone](../lessons/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) |
