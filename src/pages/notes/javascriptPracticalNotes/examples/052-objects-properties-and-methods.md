# 52 - Objects: properties and methods: examples

These examples show how to create objects, access and update properties, check property ownership, enumerate records, and use methods. Each includes expected output and an explanation.

## 1. Create an object literal

### Question

How can related user data be grouped in an object?

### Code

~~~js
const user = {
    name: "Asha",
    role: "editor",
    active: true
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

The object literal stores related values under descriptive property keys.

## 2. Read a nested property

### Question

How can a property inside a nested object be read?

### Code

~~~js
const profile = {
    name: "Mina",
    address: {
        city: "Pune",
        country: "India"
    }
};

console.log(profile.address.city);
~~~

### Expected output

~~~text
Pune
~~~

### Explanation

Each dot accesses one property. **profile.address** reads the nested object, and **city** reads a property on it.

## 3. Use dot notation for a known key

### Question

What does dot notation access when the key is written directly?

### Code

~~~js
const user = {
    name: "Dev",
    field: "stored value"
};

console.log(user.field);
~~~

### Expected output

~~~text
stored value
~~~

### Explanation

Dot notation looks up the literal key written after the dot.

## 4. Use bracket notation for a dynamic key

### Question

How can a variable choose which property to read?

### Code

~~~js
const user = {
    name: "Dev",
    role: "author"
};

const field = "role";

console.log(user[field]);
~~~

### Expected output

~~~text
author
~~~

### Explanation

Bracket notation evaluates the value of **field** and uses that value as the property key.

## 5. Compare dot access with a variable key

### Question

What is the difference between **user.field** and **user[field]**?

### Code

~~~js
const user = {
    name: "Dev",
    field: "stored value"
};

const field = "name";

console.log(user.field);
console.log(user[field]);
~~~

### Expected output

~~~text
stored value
Dev
~~~

### Explanation

**user.field** reads the key **"field"**. **user[field]** evaluates the variable, whose value is **"name"**.

## 6. Read a property with a hyphen

### Question

How can a property named **postal-code** be accessed?

### Code

~~~js
const address = {
    city: "Pune",
    "postal-code": "411001"
};

console.log(address["postal-code"]);
~~~

### Expected output

~~~text
411001
~~~

### Explanation

A hyphen is not valid in a dot-notation identifier. Bracket notation with a string key handles it.

## 7. Add and update properties

### Question

What happens when a property is assigned before and after it exists?

### Code

~~~js
const user = {
    name: "Asha"
};

user.role = "editor";
user.name = "Mina";

console.log(user.name);
console.log(user.role);
~~~

### Expected output

~~~text
Mina
editor
~~~

### Explanation

Assigning **role** creates a property. Assigning **name** replaces the property's existing value.

## 8. Add a property using a dynamic key

### Question

How can a variable determine the property name to add?

### Code

~~~js
const settings = {};
const key = "theme";

settings[key] = "dark";

console.log(settings.theme);
~~~

### Expected output

~~~text
dark
~~~

### Explanation

The bracket expression evaluates **key** to **"theme"**, then assigns that property.

## 9. Use a computed property name

### Question

How can a property key be computed while an object is created?

### Code

~~~js
const field = "status";

const task = {
    id: 7,
    [field]: "open"
};

console.log(task.status);
console.log(Object.keys(task));
~~~

### Expected output

~~~text
open
[ 'id', 'status' ]
~~~

### Explanation

The expression in brackets is evaluated during object creation and produces the key **status**.

## 10. Use property shorthand

### Question

How can variables be used as keys and values without repeating their names?

### Code

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

### Expected output

~~~text
Asha
editor
~~~

### Explanation

**{ name, role }** is shorthand for **{ name: name, role: role }**.

## 11. Numeric-looking keys become strings

### Question

How can a numeric-looking property key be accessed?

### Code

~~~js
const response = {
    200: "Success",
    404: "Not found"
};

console.log(response[200]);
console.log(response["200"]);
console.log(Object.keys(response));
~~~

### Expected output

~~~text
Success
Success
[ '200', '404' ]
~~~

### Explanation

Object property keys are strings or symbols. The numeric-looking keys are stored as strings, and bracket notation converts the number to its property key.

## 12. Distinguish missing from explicit undefined

### Question

How can an own property with value **undefined** be distinguished from a missing property?

### Code

~~~js
const record = {
    title: undefined
};

console.log(record.title);
console.log(record.author);
console.log(Object.hasOwn(record, "title"));
console.log(Object.hasOwn(record, "author"));
~~~

### Expected output

~~~text
undefined
undefined
true
false
~~~

### Explanation

Both reads return **undefined**, but only **title** exists as an own property.

## 13. Remove an own property

### Question

What happens when an ordinary configurable property is deleted?

### Code

~~~js
const settings = {
    theme: "dark",
    language: "en"
};

delete settings.theme;

console.log(settings.theme);
console.log(Object.hasOwn(settings, "theme"));
console.log(settings.language);
~~~

### Expected output

~~~text
undefined
false
en
~~~

### Explanation

The **delete** operator removes the own **theme** property. Property descriptors can affect deletion behavior and are covered in a later chapter.

## 14. Compare in and Object.hasOwn

### Question

How can a property be readable but not owned by the object?

### Code

~~~js
const defaults = {
    theme: "light"
};

const preferences = Object.create(defaults);
preferences.fontSize = 16;

console.log(preferences.theme);
console.log("theme" in preferences);
console.log(Object.hasOwn(preferences, "theme"));
~~~

### Expected output

~~~text
light
true
false
~~~

### Explanation

The **theme** property is inherited from **defaults**. The **in** operator includes inherited properties, while **Object.hasOwn** checks only the object itself.

## 15. An inherited value can be shadowed by an own property

### Question

What happens if an object assigns its own value to an inherited key?

### Code

~~~js
const defaults = {
    role: "viewer"
};

const user = Object.create(defaults);
user.role = "editor";

console.log(user.role);
console.log(Object.hasOwn(user, "role"));
console.log(defaults.role);
~~~

### Expected output

~~~text
editor
true
viewer
~~~

### Explanation

The assignment creates an own **role** property on **user**. It does not change the inherited value on **defaults**.

## 16. Enumerate keys, values, and entries

### Question

How do the common object enumeration methods represent the same record?

### Code

~~~js
const settings = {
    theme: "dark",
    fontSize: 16
};

console.log(Object.keys(settings));
console.log(Object.values(settings));
console.log(Object.entries(settings));
~~~

### Expected output

~~~text
[ 'theme', 'fontSize' ]
[ 'dark', 16 ]
[ [ 'theme', 'dark' ], [ 'fontSize', 16 ] ]
~~~

### Explanation

All three methods use own enumerable string-keyed properties. They return the keys, values, or key-value pairs.

## 17. Loop over object entries

### Question

How can each key and value be processed together?

### Code

~~~js
const settings = {
    theme: "dark",
    language: "en"
};

for (const [key, value] of Object.entries(settings)) {
    console.log(key, value);
}
~~~

### Expected output

~~~text
theme dark
language en
~~~

### Explanation

Each entry is a two-item array. Array destructuring names the key and value in the loop.

## 18. Filter inherited keys out of for...in

### Question

How can **for...in** be limited to an object's own properties?

### Code

~~~js
const defaults = {
    role: "viewer"
};

const user = Object.create(defaults);
user.name = "Mina";

for (const key in user) {
    if (Object.hasOwn(user, key)) {
        console.log(key, user[key]);
    }
}
~~~

### Expected output

~~~text
name Mina
~~~

### Explanation

**for...in** can visit enumerable properties from the prototype chain. **Object.hasOwn** filters those out.

## 19. Inherited built-in methods are not own properties

### Question

Why can **toString** be called even if it is not in **Object.keys**?

### Code

~~~js
const user = {
    name: "Mina"
};

console.log(typeof user.toString);
console.log("toString" in user);
console.log(Object.hasOwn(user, "toString"));
console.log(Object.keys(user));
~~~

### Expected output

~~~text
function
true
false
[ 'name' ]
~~~

### Explanation

A normal object inherits **toString** through its prototype chain. It can be read and called, but it is not an own property.

## 20. Define and call a method

### Question

How can a method use data stored on its object?

### Code

~~~js
const user = {
    name: "Asha",
    greet() {
        return "Hello, " + this.name;
    }
};

console.log(user.greet());
~~~

### Expected output

~~~text
Hello, Asha
~~~

### Explanation

The method call uses **user** as its receiver, so **this.name** reads the user's name.

## 21. Pass an argument to a method

### Question

Can a method use both arguments and properties on its receiver?

### Code

~~~js
const cart = {
    itemCount: 3,
    describe(label) {
        return label + ": " + this.itemCount + " items";
    }
};

console.log(cart.describe("Cart"));
~~~

### Expected output

~~~text
Cart: 3 items
~~~

### Explanation

The argument supplies the label, and **this** refers to the object used for the method call.

## 22. Call an extracted method with a receiver

### Question

How can an extracted method be called with its original object as **this**?

### Code

~~~js
const user = {
    name: "Mina",
    getName() {
        return this.name;
    }
};

const getName = user.getName;

console.log(getName.call(user));
~~~

### Expected output

~~~text
Mina
~~~

### Explanation

The function reference alone does not retain the receiver. **call(user)** invokes it with **user** as **this**.

## 23. Capture this in an inner arrow function

### Question

Can an arrow callback inside a method use the method's receiver?

### Code

~~~js
const user = {
    name: "Asha",
    makeReader() {
        return () => this.name;
    }
};

const readName = user.makeReader();

console.log(readName());
~~~

### Expected output

~~~text
Asha
~~~

### Explanation

The arrow function captures **this** from **makeReader**. This is useful for callbacks that need to retain the surrounding method's receiver.

## 24. Assignment copies an object reference

### Question

Does changing an object through an alias affect the original variable?

### Code

~~~js
const original = {
    status: "draft"
};

const alias = original;
alias.status = "published";

console.log(original.status);
console.log(original === alias);
~~~

### Expected output

~~~text
published
true
~~~

### Explanation

Both variables point to the same object. Assignment did not make a copy.

## 25. Use an array of objects for an ordered collection of records

### Question

How can one selected lesson title be read from an array of lesson objects?

### Code

~~~js
const lessons = [
    { number: 1, title: "Introduction" },
    { number: 2, title: "Values and types" }
];

console.log(lessons[1].title);
~~~

### Expected output

~~~text
Values and types
~~~

### Explanation

The array represents an ordered collection. Each object represents one record with named fields.

## Practice prompts

1. Create a course object with a title, lesson count, and published flag.
2. Read one property with dot notation and another with bracket notation.
3. Add and update a property using a key stored in a variable.
4. Compare a missing property with an own property containing **undefined**.
5. Create an inherited default and compare **in** with **Object.hasOwn**.
6. Print a record with **Object.keys**, **Object.values**, and **Object.entries**.
7. Write a method that uses **this** and an argument.
8. Extract a method and invoke it with an explicit receiver using **call**.
9. Use **for...in** on an object with a prototype, then print only own keys.
10. Build an array of objects and read a field from one record.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [51 - Sparse arrays, array-like objects, and array protocols](051-sparse-arrays-array-like-objects-and-array-protocols.md) | [Open lesson](../lessons/052-objects-properties-and-methods.md) | [Open Q&A](../qnas/052-objects-properties-and-methods.md) | [53 - Property keys, descriptors, and enumerability](../lessons/053-property-keys-descriptors-and-enumerability.md) |
