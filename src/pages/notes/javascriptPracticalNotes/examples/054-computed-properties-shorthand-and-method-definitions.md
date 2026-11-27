# 54 - Computed properties, shorthand, and method definitions: examples

These examples show how to create fixed and computed property names, use shorthand, define methods, evaluate object-literal expressions, and distinguish the special __proto__ syntax. Each example includes a question, complete code, expected output, and an explanation.

## 1. Create an object with fixed properties

### Question

How can an object literal group related values under fixed property names?

### Code

~~~js
const book = {
    title: "The Long Way Home",
    pages: 280,
    available: true
};

console.log(book.title);
console.log(book.pages);
console.log(book.available);
~~~

### Expected output

~~~text
The Long Way Home
280
true
~~~

### Explanation

The object literal creates one object with three own properties. A const variable prevents rebinding book, but its object can still be modified.

## 2. Use a quoted property name

### Question

How can an object have a property name that contains a space?

### Code

~~~js
const user = {
    "display name": "Asha Rao"
};

console.log(user["display name"]);
~~~

### Expected output

~~~text
Asha Rao
~~~

### Explanation

A name containing a space cannot be used with dot notation. Quoted property names are accessed with brackets and a string.

## 3. Use a numeric property name

### Question

What key does a numeric property name create?

### Code

~~~js
const response = {
    200: "Success"
};

console.log(response[200]);
console.log(response["200"]);
~~~

### Expected output

~~~text
Success
Success
~~~

### Explanation

The numeric-looking name becomes the string key "200". Bracket access with the number is converted to the same property key.

## 4. Use a variable for a computed key

### Question

How can the property name come from the value of a variable?

### Code

~~~js
const field = "email";
const user = {
    [field]: "asha@example.test"
};

console.log(user.email);
console.log(user[field]);
~~~

### Expected output

~~~text
asha@example.test
asha@example.test
~~~

### Explanation

The brackets make field an expression. The object gets the key produced by the expression, which is email.

## 5. Build a key from multiple values

### Question

How can a section name and suffix form a computed property key?

### Code

~~~js
const section = "account";
const suffix = "Status";
const settings = {
    [section + suffix]: "active"
};

console.log(settings.accountStatus);
~~~

### Expected output

~~~text
active
~~~

### Explanation

JavaScript evaluates the expression inside the brackets. Its resulting string becomes the key.

## 6. Show that a computed key is chosen at creation time

### Question

Does changing the key variable later rename an existing property?

### Code

~~~js
let key = "first";
const values = {
    [key]: "one"
};

key = "second";

console.log(values.first);
console.log(values.second);
~~~

### Expected output

~~~text
one
undefined
~~~

### Explanation

The expression ran while values was created. The object stores the resulting key first, not a connection to the key variable.

## 7. Use a symbol as a property key

### Question

How can an object store a value under a symbol key?

### Code

~~~js
const internalId = Symbol("internalId");
const record = {
    name: "Mina",
    [internalId]: 42
};

console.log(record[internalId]);
console.log(Reflect.ownKeys(record).length);
console.log(Reflect.ownKeys(record)[1] === internalId);
~~~

### Expected output

~~~text
42
2
true
~~~

### Explanation

A symbol is a valid property key and remains a symbol. Use bracket notation to read it. Reflect.ownKeys returns both the string key and symbol key.

## 8. Evaluate computed keys once

### Question

How many times does each computed property-name function run?

### Code

~~~js
let nextId = 0;

function createKey() {
    nextId += 1;
    return "field" + nextId;
}

const record = {
    [createKey()]: "first",
    [createKey()]: "second"
};

console.log(nextId);
console.log(Object.keys(record).join(", "));
~~~

### Expected output

~~~text
2
field1, field2
~~~

### Explanation

Each computed key expression runs once during object creation. Later key inspection does not call createKey again.

## 9. Create properties with shorthand

### Question

How can variables be used directly as object property definitions when their names match?

### Code

~~~js
const name = "Asha";
const role = "editor";
const active = true;

const user = {
    name,
    role,
    active
};

console.log(user.name);
console.log(user.role);
console.log(user.active);
~~~

### Expected output

~~~text
Asha
editor
true
~~~

### Explanation

Each shorthand definition is equivalent to a matching key and value, such as name: name.

## 10. Show that shorthand stores a value, not a live binding

### Question

What happens to the object property when its source variable changes?

### Code

~~~js
let count = 1;
const snapshot = { count };

count = 5;

console.log(snapshot.count);
console.log(count);
~~~

### Expected output

~~~text
1
5
~~~

### Explanation

The value of count is read when snapshot is created. The property is not connected to later updates of the variable.

## 11. Rename a variable when creating a property

### Question

How can a variable named firstName populate a property named name?

### Code

~~~js
const firstName = "Mina";
const user = {
    name: firstName
};

console.log(user.name);
~~~

### Expected output

~~~text
Mina
~~~

### Explanation

Use the full key: value form when the property name and source variable name differ.

## 12. Mix fixed, computed, and shorthand properties

### Question

Can one literal use several property-definition forms?

### Code

~~~js
const name = "Dev";
const field = "verified";
const user = {
    name,
    [field]: true,
    role: "author"
};

console.log(user.name);
console.log(user.verified);
console.log(user.role);
~~~

### Expected output

~~~text
Dev
true
author
~~~

### Explanation

The literal uses shorthand for name, a computed name for verified, and a fixed key with an explicit value for role.

## 13. Define and call a method

### Question

How can an object literal define a reusable operation?

### Code

~~~js
const calculator = {
    add(first, second) {
        return first + second;
    },
    multiply(first, second) {
        return first * second;
    }
};

console.log(calculator.add(4, 6));
console.log(calculator.multiply(4, 6));
~~~

### Expected output

~~~text
10
24
~~~

### Explanation

Method syntax places named functions directly in the object. Each method can be called using the object and a dot.

## 14. Use this inside a method

### Question

How can a method combine other properties from its receiver?

### Code

~~~js
const person = {
    firstName: "Asha",
    lastName: "Rao",
    fullName() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(person.fullName());
~~~

### Expected output

~~~text
Asha Rao
~~~

### Explanation

The call person.fullName() uses person as the receiver, so this refers to person during the call.

## 15. Compare a method definition with a function-valued property

### Question

Can both forms be called through the same object?

### Code

~~~js
function add(first, second) {
    return first + second;
}

const calculator = {
    method(first, second) {
        return first + second;
    },
    functionValue: add
};

console.log(calculator.method(2, 3));
console.log(calculator.functionValue(2, 3));
~~~

### Expected output

~~~text
5
5
~~~

### Explanation

Both properties contain callable functions. Method syntax defines the function in the object literal, while functionValue is assigned a function from an expression.

## 16. Compare method and function constructor behavior

### Question

How can you inspect whether a method function has its own prototype property?

### Code

~~~js
function regularFunction() {}

const object = {
    method() {}
};

console.log(Object.hasOwn(regularFunction, "prototype"));
console.log(Object.hasOwn(object.method, "prototype"));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

Ordinary function declarations can be constructors and have a prototype property. Concise object methods are not constructors and do not have their own prototype property.

## 17. Define a computed method

### Question

How can the method name be selected from a variable?

### Code

~~~js
const operation = "multiply";
const calculator = {
    [operation](first, second) {
        return first * second;
    }
};

console.log(calculator.multiply(3, 4));
~~~

### Expected output

~~~text
12
~~~

### Explanation

The bracketed expression is evaluated while the object is created. The resulting key is the method name multiply.

## 18. Define and call a symbol-keyed method

### Question

How can a method use a symbol as its key?

### Code

~~~js
const describe = Symbol("describe");
const item = {
    name: "Notebook",
    [describe]() {
        return this.name;
    }
};

console.log(item[describe]());
~~~

### Expected output

~~~text
Notebook
~~~

### Explanation

The computed method name evaluates to a symbol. Bracket access reads and calls the method, with item as the receiver.

## 19. See a later duplicate key replace an earlier value

### Question

What value remains when a property is defined twice?

### Code

~~~js
const settings = {
    mode: "draft",
    mode: "published"
};

console.log(settings.mode);
console.log(Object.keys(settings).join(", "));
~~~

### Expected output

~~~text
published
mode
~~~

### Explanation

The second definition replaces the first value. The object still has one mode property.

## 20. Set an object's prototype in an object literal

### Question

How can an object inherit defaults from another object?

### Code

~~~js
const defaults = {
    theme: "light",
    compact: false
};

const options = {
    __proto__: defaults,
    compact: true
};

console.log(options.theme);
console.log(options.compact);
console.log(Object.hasOwn(options, "theme"));
console.log(Object.hasOwn(options, "compact"));
~~~

### Expected output

~~~text
light
true
false
true
~~~

### Explanation

The special uncomputed __proto__: defaults entry sets the prototype. theme is inherited. compact is an own property and shadows the inherited compact value.

## 21. Create an ordinary property named __proto__

### Question

How can a data property named __proto__ be created without setting the prototype?

### Code

~~~js
const object = {
    ["__proto__"]: "ordinary data"
};

console.log(Object.hasOwn(object, "__proto__"));
console.log(object.__proto__);
console.log(Object.getPrototypeOf(object) === Object.prototype);
~~~

### Expected output

~~~text
true
ordinary data
true
~~~

### Explanation

A computed property name is an ordinary property definition. The object's prototype remains the default Object.prototype.

## 22. Use shorthand for an own property named __proto__

### Question

What does shorthand do when there is a variable named __proto__?

### Code

~~~js
const __proto__ = "stored value";
const object = { __proto__ };

console.log(Object.hasOwn(object, "__proto__"));
console.log(object.__proto__);
console.log(Object.getPrototypeOf(object) === Object.prototype);
~~~

### Expected output

~~~text
true
stored value
true
~~~

### Explanation

Shorthand syntax reads the lexical variable and creates an own property. It is not the special uncomputed colon form.

## 23. Observe left-to-right evaluation

### Question

In what order do the computed key and its value run?

### Code

~~~js
const steps = [];

function mark(label, value) {
    steps.push(label);
    return value;
}

const record = {
    [mark("key", "name")]: mark("value", "Asha"),
    status: mark("status", "ready")
};

console.log(steps.join(", "));
console.log(record.name);
console.log(record.status);
~~~

### Expected output

~~~text
key, value, status
Asha
ready
~~~

### Explanation

Object literal definitions are evaluated from left to right. For a computed property definition, the key expression is evaluated before its value expression.

## 24. Keep a dynamic record builder readable

### Question

How can selected form values become properties in a new object?

### Code

~~~js
const selectedFields = [
    ["name", "Mina"],
    ["role", "editor"],
    ["active", true]
];

const user = {
    [selectedFields[0][0]]: selectedFields[0][1],
    [selectedFields[1][0]]: selectedFields[1][1],
    [selectedFields[2][0]]: selectedFields[2][1]
};

console.log(user.name);
console.log(user.role);
console.log(user.active);
~~~

### Expected output

~~~text
Mina
editor
true
~~~

### Explanation

Each first array item supplies a computed key and each second item supplies its value. For longer dynamic data, a loop or a collection method may make the construction easier to maintain.

## 25. Choose between shorthand and an explicit mapping

### Question

How can a value named pageCount be stored under the clearer key pages?

### Code

~~~js
const pageCount = 12;
const title = "Guide";

const book = {
    title,
    pages: pageCount
};

console.log(book.title);
console.log(book.pages);
~~~

### Expected output

~~~text
Guide
12
~~~

### Explanation

title uses shorthand because the variable and property names match. pages uses an explicit mapping because its source variable is named pageCount.

## 26. Use Object.create when prototype creation should be explicit

### Question

How can a prototype be selected explicitly without using the object-literal __proto__ form?

### Code

~~~js
const defaults = {
    theme: "light"
};

const options = Object.create(defaults);
options.compact = true;

console.log(options.theme);
console.log(Object.hasOwn(options, "theme"));
console.log(Object.hasOwn(options, "compact"));
~~~

### Expected output

~~~text
light
false
true
~~~

### Explanation

Object.create(defaults) creates an object whose prototype is defaults. This makes the prototype relationship explicit in the expression that creates options.

## 27. Create an object from a function result

### Question

How can a helper function choose a property name for an object it returns?

### Code

~~~js
function createStatusRecord(name, value) {
    return {
        [name]: value,
        created: true
    };
}

const record = createStatusRecord("status", "ready");

console.log(record.status);
console.log(record.created);
~~~

### Expected output

~~~text
ready
true
~~~

### Explanation

The computed key is evaluated each time createStatusRecord creates an object. The returned property name depends on the name argument.

## 28. Practice: combine several property forms

### Question

Create an object with a shorthand name, a computed score field, and a method that returns a summary.

### Code

~~~js
const name = "Asha";
const scoreField = "score";

const result = {
    name,
    [scoreField]: 18,
    summary() {
        return this.name + " scored " + this.score;
    }
};

console.log(result.summary());
~~~

### Expected output

~~~text
Asha scored 18
~~~

### Explanation

The literal combines shorthand, a computed key, and a method. Calling summary through result supplies result as this.

## Practice prompts

1. Create an object with a quoted key and read it with bracket notation.
2. Use a number and a string that represent the same property key.
3. Create two properties with computed names derived from variables.
4. Use a symbol for a private-style key and inspect it with Reflect.ownKeys.
5. Change a shorthand property's source variable after object creation and compare both values.
6. Write a method that reads two other properties with this.
7. Define a computed method and invoke it with bracket notation.
8. Override a property in the same literal and explain the resulting value.
9. Compare an uncomputed __proto__ entry with a computed __proto__ key.
10. Record the order in which key and value helper functions run.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [53 - Property keys, descriptors, and enumerability](053-property-keys-descriptors-and-enumerability.md) | [Open lesson](../lessons/054-computed-properties-shorthand-and-method-definitions.md) | [Open Q&A](../qnas/054-computed-properties-shorthand-and-method-definitions.md) | [55 - Object and array destructuring](../lessons/055-object-and-array-destructuring.md) |
