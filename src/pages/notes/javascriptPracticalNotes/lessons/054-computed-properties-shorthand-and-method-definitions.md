# 54 - Computed properties, shorthand, and method definitions

Object literals can do more than pair fixed names with values. They can calculate a property key, reuse a variable name as both key and value, and define methods directly. These features make object creation concise while keeping its data shape readable.

This chapter covers property-name forms, computed property names, shorthand properties, method definitions, computed methods, duplicate keys, evaluation order, and the special __proto__ form in object literals.

## What you will learn

- Read the property-definition forms available in an object literal.
- Choose identifier, quoted, numeric, or computed property names appropriately.
- Build keys dynamically, including symbol keys.
- Use shorthand properties when a variable name matches the desired key.
- Define methods and understand how method calls determine this.
- Distinguish methods from arrow functions and function-valued properties.
- Predict what happens when a literal defines the same property more than once.
- Recognize the special prototype-setting form of __proto__.

## Object literals describe properties

An object literal creates an object from property definitions inside braces. A definition can provide a key and value, a method, a shorthand property, or a spread source.

~~~js
const book = {
    title: "The Long Way Home",
    pages: 280
};

console.log(book.title);
console.log(book.pages);
~~~

Output:

~~~text
The Long Way Home
280
~~~

The literal creates a new object when its expression is evaluated. The const binding prevents assigning a different object to book, but it does not freeze the object or its properties.

A property can use a quoted or numeric name:

~~~js
const response = {
    "status text": "Ready",
    200: "Success"
};

console.log(response["status text"]);
console.log(response[200]);
console.log(response["200"]);
~~~

Output:

~~~text
Ready
Success
Success
~~~

A numeric-looking property name becomes a string key. The number in response[200] is converted to a property key, so it accesses the same "200" property. Use brackets for keys that are not valid identifiers or whose value is dynamic.

## Computed property names

Put an expression in square brackets in an object literal to calculate a property name:

~~~js
const field = "email";
const user = {
    [field]: "asha@example.test"
};

console.log(user.email);
console.log(user[field]);
~~~

Output:

~~~text
asha@example.test
asha@example.test
~~~

The brackets are part of the object literal. The expression is evaluated to produce the key. Without brackets, field: value creates a property literally named field.

### Build a key from an expression

A computed name can use an expression whose result can become a property key:

~~~js
const section = "account";
const user = {
    [section + "Status"]: "active",
    ["item" + 2]: "Notebook"
};

console.log(user.accountStatus);
console.log(user.item2);
~~~

Output:

~~~text
active
Notebook
~~~

Ordinary results are converted to string property keys. A symbol remains a symbol key:

~~~js
const identifier = Symbol("identifier");
const record = {
    [identifier]: 42
};

console.log(record[identifier]);
console.log(Reflect.ownKeys(record)[0] === identifier);
~~~

Output:

~~~text
42
true
~~~

The computed expression runs when the object literal is evaluated. It is not kept as a formula that runs on each later property access.

~~~js
let key = "first";
const values = {
    [key]: "one"
};

key = "second";

console.log(values.first);
console.log(values.second);
~~~

Output:

~~~text
one
undefined
~~~

The object has the key produced at creation time. Changing the variable later does not rename the property.

### Computed names can have side effects

A computed key can call a function because its expression is evaluated. Prefer simple expressions so object creation remains easy to understand.

~~~js
let calls = 0;

function nextKey() {
    calls += 1;
    return "field" + calls;
}

const record = {
    [nextKey()]: "first",
    [nextKey()]: "second"
};

console.log(calls);
console.log(Object.keys(record).join(", "));
~~~

Output:

~~~text
2
field1, field2
~~~

Each computed property name is evaluated once, in its place in the object's definition list.

## Shorthand properties

When an existing variable's name is also the property name you want, write the name once:

~~~js
const name = "Asha";
const role = "editor";

const user = {
    name,
    role
};

console.log(user.name);
console.log(user.role);
~~~

Output:

~~~text
Asha
editor
~~~

This is shorthand for name: name and role: role. It reads each variable while creating the object. The resulting property is not a live connection to the variable.

~~~js
let count = 1;
const snapshot = { count };

count = 2;

console.log(snapshot.count);
console.log(count);
~~~

Output:

~~~text
1
2
~~~

Use the full propertyName: expression form when the desired key differs from the variable name:

~~~js
const firstName = "Mina";
const user = {
    name: firstName
};

console.log(user.name);
~~~

Output:

~~~text
Mina
~~~

A shorthand property needs an identifier that resolves to a binding in the current scope. If no binding with that name exists, evaluating the literal throws a ReferenceError.

~~~js
const id = 17;
const record = { id };
console.log(record.id);
~~~

Output:

~~~text
17
~~~

The id in the shorthand reads the declared variable. It does not create an undefined value when the binding is missing.

### Combine fixed, computed, and shorthand properties

Different forms can be mixed in one literal:

~~~js
const name = "Asha";
const field = "active";

const user = {
    name,
    [field]: true,
    role: "author"
};

console.log(user.name);
console.log(user.active);
console.log(user.role);
~~~

Output:

~~~text
Asha
true
author
~~~

Use shorthand for a matching variable, a computed name for a dynamic key, and key: value for a fixed key with a different value expression.

## Method definitions

An object literal can define a method without writing function or a colon:

~~~js
const calculator = {
    add(first, second) {
        return first + second;
    }
};

console.log(calculator.add(4, 6));
~~~

Output:

~~~text
10
~~~

The method name is add. The parentheses and body define its parameters and behavior. Call it through the object when it needs that object as this.

~~~js
const user = {
    name: "Mina",
    describe() {
        return "User: " + this.name;
    }
};

console.log(user.describe());
~~~

Output:

~~~text
User: Mina
~~~

For an ordinary method call, the value before the dot is the receiver and supplies this. Copying a method into another variable does not permanently bind it to its original object.

~~~js
const user = {
    name: "Mina",
    describe() {
        return this.name;
    }
};

const describe = user.describe;
console.log(user.describe());
console.log(typeof describe);
~~~

Output:

~~~text
Mina
function
~~~

The second output only reports the copied value's type. Calling describe() would not be a call through user, so do not assume this still refers to user. Invocation context is covered in its own chapter.

### Method definition versus a function-valued property

Both forms can place a function under a property key:

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

Output:

~~~text
5
5
~~~

A method definition is concise and has method-specific behavior, such as not being usable as a constructor. A function-valued property stores a function value supplied by an expression. Choose the form that describes the API clearly.

### Arrow functions and this

An arrow function does not get its own this. It uses this from its surrounding scope, so it is generally not a replacement for a method that relies on its receiver:

~~~js
const counter = {
    value: 3,
    read() {
        return this.value;
    },
    readWithArrow: () => "Arrow functions use surrounding this"
};

console.log(counter.read());
console.log(counter.readWithArrow());
~~~

Output:

~~~text
3
Arrow functions use surrounding this
~~~

Use an ordinary method when a call such as counter.read() should use counter as this. Arrow functions are useful for callbacks that should keep a surrounding this.

## Computed method names

A method can use a computed property name:

~~~js
const operation = "multiply";

const calculator = {
    [operation](first, second) {
        return first * second;
    }
};

console.log(calculator.multiply(3, 4));
~~~

Output:

~~~text
12
~~~

The expression in brackets is evaluated when the object is created, just like a computed data property.

A symbol can also be a computed method key:

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

Output:

~~~text
Notebook
~~~

Dot notation cannot access a symbol key. Use brackets with the symbol value.

## Duplicate property names

A later property definition with the same key replaces the earlier value:

~~~js
const settings = {
    mode: "draft",
    mode: "published"
};

console.log(settings.mode);
console.log(Object.keys(settings).join(", "));
~~~

Output:

~~~text
published
mode
~~~

The final value is from the later definition. The key remains one property. Repeating a key usually makes a literal harder to review, so avoid it unless the override is intentional and clear.

The special object-literal prototype setter is an exception: an object initializer cannot contain more than one prototype setter written in that special form.

## The special __proto__ property form

In an object initializer, the uncomputed form __proto__: value or "__proto__": value sets the new object's prototype when the value is an object or null:

~~~js
const defaults = {
    enabled: true
};

const options = {
    __proto__: defaults,
    theme: "dark"
};

console.log(options.theme);
console.log(options.enabled);
console.log(Object.hasOwn(options, "enabled"));
~~~

Output:

~~~text
dark
true
false
~~~

enabled is inherited from defaults, so it can be read but is not an own property of options.

This is a special syntax in an object initializer. A computed name or shorthand form creates an ordinary own property instead:

~~~js
const __proto__ = "data";
const computed = {
    ["__proto__"]: "computed data"
};
const shorthand = { __proto__ };

console.log(Object.hasOwn(computed, "__proto__"));
console.log(computed.__proto__);
console.log(Object.hasOwn(shorthand, "__proto__"));
~~~

Output:

~~~text
true
computed data
true
~~~

For the shorthand example, the variable named __proto__ must exist in scope. The special prototype-setting form accepts an object or null; other values do not change the prototype.

Use Object.getPrototypeOf(object) to inspect an object's prototype. Use Object.create when explicitly constructing an object with a selected prototype is clearer than an object literal.

## Property-definition order and value evaluation

Object literal properties are processed from left to right. A computed key expression and its associated value expression run as the literal is evaluated.

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

Output:

~~~text
key, value, status
Asha
ready
~~~

This matters when expressions call functions or read changing state. Keeping property expressions simple makes object creation easier to reason about.

## Choose the right property form

| Form | Example | Meaning |
| --- | --- | --- |
| Fixed identifier key | name: "Asha" | Use the literal key name |
| Quoted key | "display name": "Asha" | Use a string key that is not an identifier |
| Numeric key | 200: "Ready" | Use the string property key "200" |
| Computed key | [field]: value | Evaluate an expression to get the key |
| Shorthand | name | Read the in-scope binding name for key and value |
| Method | save() { ... } | Define a method under the key save |
| Computed method | [action]() { ... } | Evaluate an expression to get the method key |

## Common mistakes

- Writing { field: value } when the intention was to use the value of field as the key. Use { [field]: value } for a computed name.
- Assuming { name } creates a property with an undefined value when no name binding exists. It throws a ReferenceError.
- Assuming a shorthand property remains connected to its source variable after object creation.
- Using a computed expression when a fixed key would be clearer.
- Expecting a computed key expression to run again on each property read.
- Assuming a method's this is permanently bound to the object where it was defined.
- Using an arrow function for a property that must use its receiver as this.
- Treating a function-valued property and a method definition as identical in every behavior.
- Forgetting that a later duplicate property definition replaces an earlier value.
- Assuming every property named __proto__ changes the prototype. The special behavior applies only to the uncomputed prototype-setter form in an object initializer.
- Adding more than one special __proto__ prototype setter to the same object initializer.

## Try it yourself

1. Create an object with a fixed key, a quoted key, and a numeric key. Read each one.
2. Use a variable to create a computed key, then change the variable and inspect the original object.
3. Use a symbol as a computed property key and find it with Reflect.ownKeys.
4. Build an object using three shorthand properties and one renamed property.
5. Write a shorthand property whose variable is not declared. Predict and then observe the error.
6. Define a method that uses this to format two properties.
7. Copy that method into a variable. Compare calling through the object with calling the copied function.
8. Define a computed method based on a variable and invoke it with bracket notation.
9. Add the same key twice and inspect the final value and Object.keys result.
10. Compare an uncomputed __proto__ entry with a computed __proto__ key.
11. Make helper calls record the order in which computed keys and values are evaluated.
12. Explain when shorthand improves readability and when a full key: value definition is clearer.

## Key points

- Object literals support fixed names, quoted and numeric names, computed names, shorthand properties, methods, and spread definitions.
- A computed property name evaluates its bracketed expression to a string or symbol key when the literal is created.
- Shorthand { name } reads the in-scope variable name and is equivalent to { name: name }.
- A shorthand property stores the value at creation time; it is not linked to later changes in the variable.
- Method definitions provide concise functions, and an ordinary method call gets this from its receiver.
- Arrow functions use surrounding this, so they are not a direct substitute for receiver-based methods.
- Later duplicate property definitions replace earlier values.
- Only the special uncomputed __proto__: value form in an object initializer sets the object's prototype.
- Object literal definitions and their computed expressions are evaluated from left to right.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [53 - Property keys, descriptors, and enumerability](053-property-keys-descriptors-and-enumerability.md) | [Open Q&A](../qnas/054-computed-properties-shorthand-and-method-definitions.md) | [Open example](../examples/054-computed-properties-shorthand-and-method-definitions.md) | [55 - Object and array destructuring](055-object-and-array-destructuring.md) |
