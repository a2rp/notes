# 52 - Objects: properties and methods

Objects let you group related information and behavior under named properties. A property can hold any kind of value, including another object or a function. Understanding how to define, read, update, and check properties is the foundation for working with JavaScript data.

This chapter covers object literals, property names, dot and bracket access, own and inherited properties, common property enumeration methods, and methods that use **this**.

## What you will learn

- Create objects with object literal syntax.
- Read and update properties with dot and bracket notation.
- Use computed property names for dynamic keys.
- Distinguish a missing property from an own property containing **undefined**.
- Tell own properties apart from inherited properties.
- Enumerate an object's own keys and values.
- Define and call methods, including how **this** is set.
- Choose objects to represent related records and behavior.

## Create an object

An object literal uses braces and comma-separated key-value pairs:

~~~js
const book = {
    title: "Small Steps",
    author: "Asha",
    pages: 180
};

console.log(book.title);
console.log(book.author);
console.log(book.pages);
~~~

Output:

~~~text
Small Steps
Asha
180
~~~

Each pair is a property. The key identifies the property, and the value can be any JavaScript value.

~~~js
const profile = {
    name: "Mina",
    active: true,
    score: 92,
    tags: ["learner", "writer"],
    address: {
        city: "Pune",
        country: "India"
    },
    greet: function () {
        return "Hello";
    }
};

console.log(profile.name);
console.log(profile.tags[0]);
console.log(profile.address.city);
console.log(profile.greet());
~~~

Output:

~~~text
Mina
learner
Pune
Hello
~~~

Objects can contain primitives, arrays, other objects, and functions. A function stored in an object property is commonly called a method when it is used as behavior of that object.

## Property names and property keys

Most object property names are strings. Names that are valid JavaScript identifiers can be written without quotes:

~~~js
const settings = {
    theme: "dark",
    language: "en"
};
~~~

A string property name that contains spaces, punctuation, or begins with a number needs quotes in an object literal:

~~~js
const address = {
    city: "Pune",
    "postal-code": "411001",
    "unit number": 12
};

console.log(address["postal-code"]);
console.log(address["unit number"]);
~~~

Output:

~~~text
411001
12
~~~

JavaScript also supports symbol property keys. Symbols are covered in a later chapter. The common object properties in this guide use string keys.

### Numeric-looking property names

A numeric key in an object literal becomes a string property key:

~~~js
const response = {
    200: "Success",
    404: "Not found"
};

console.log(response[200]);
console.log(response["200"]);
console.log(Object.keys(response));
~~~

Output:

~~~text
Success
Success
[ '200', '404' ]
~~~

The bracket expression **response[200]** is converted to the property key **"200"**.

## Read properties

Use dot notation when the property name is a valid identifier and is known when writing the code:

~~~js
const user = {
    name: "Dev",
    level: 4
};

console.log(user.name);
console.log(user.level);
~~~

Use bracket notation when the property name is stored in a variable or cannot be written with dot notation:

~~~js
const user = {
    name: "Dev",
    level: 4
};

const field = "name";

console.log(user[field]);
console.log(user["level"]);
~~~

Output:

~~~text
Dev
4
~~~

These expressions are different:

~~~js
const user = {
    name: "Dev",
    field: "stored value"
};

const field = "name";

console.log(user.field);
console.log(user[field]);
~~~

Output:

~~~text
stored value
Dev
~~~

**user.field** looks up the literal property named **"field"**. **user[field]** evaluates the variable and looks up **"name"**.

### A missing property reads as undefined

Reading a property that does not exist normally returns **undefined**:

~~~js
const user = {
    name: "Dev"
};

console.log(user.email);
~~~

Output:

~~~text
undefined
~~~

That result alone does not tell you whether the property is missing or exists with the value **undefined**. Check property presence when that distinction matters.

## Add, update, and remove properties

Assigning to a property creates it if it is not present, or replaces its value if it already exists.

~~~js
const user = {
    name: "Asha"
};

user.role = "editor";
user.name = "Mina";

console.log(user.name);
console.log(user.role);
~~~

Output:

~~~text
Mina
editor
~~~

Use brackets to assign a dynamic property name:

~~~js
const settings = {};
const key = "theme";

settings[key] = "dark";

console.log(settings.theme);
~~~

Output:

~~~text
dark
~~~

The **delete** operator removes an object's own property when that property can be deleted:

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

Output:

~~~text
undefined
false
en
~~~

Property deletion rules can depend on property descriptors. This chapter uses ordinary properties; descriptors are covered separately.

## Define object properties with shorthand

When a variable name matches the property name you want, object literal shorthand avoids repeating the name:

~~~js
const name = "Asha";
const role = "editor";

const user = {
    name,
    role
};

console.log(user);
~~~

Output:

~~~text
{ name: 'Asha', role: 'editor' }
~~~

Shorthand is equivalent to writing **name: name** and **role: role**.

## Use computed property names

Square brackets in an object literal create a property using an evaluated expression:

~~~js
const field = "status";

const task = {
    id: 7,
    [field]: "open"
};

console.log(task.status);
console.log(Object.keys(task));
~~~

Output:

~~~text
open
[ 'id', 'status' ]
~~~

The expression inside the brackets is evaluated when the object is created. This is useful for building a property from a variable.

## Check whether a property exists

### Use Object.hasOwn for own properties

**Object.hasOwn(object, key)** returns **true** when the object itself has that property, even if its value is **undefined**.

~~~js
const record = {
    title: undefined
};

console.log(Object.hasOwn(record, "title"));
console.log(Object.hasOwn(record, "author"));
~~~

Output:

~~~text
true
false
~~~

### Use in to include inherited properties

The **in** operator checks the object and its prototype chain:

~~~js
const defaults = {
    theme: "light"
};

const preferences = Object.create(defaults);
preferences.fontSize = 16;

console.log("fontSize" in preferences);
console.log("theme" in preferences);
console.log(Object.hasOwn(preferences, "theme"));
~~~

Output:

~~~text
true
true
false
~~~

The **theme** property can be read from **preferences**, but it belongs to **defaults**, not to **preferences** itself.

Use **Object.hasOwn** when asking whether a record directly stores a key. Use **in** when inherited properties should count.

## Own and inherited properties

An own property belongs directly to an object. An inherited property is found on one of the object's prototypes. Reading a property can find either kind.

~~~js
const defaults = {
    role: "viewer"
};

const user = Object.create(defaults);
user.name = "Mina";

console.log(user.name);
console.log(user.role);
console.log(Object.hasOwn(user, "role"));
console.log(Object.hasOwn(user, "name"));
~~~

Output:

~~~text
Mina
viewer
false
true
~~~

**user.role** works because lookup continues to the prototype after no own **role** property is found. The prototype chain is explored in detail later.

Objects also inherit built-in methods. For example, a normal object can access **toString** even though that function is not its own property:

~~~js
const user = {
    name: "Mina"
};

console.log(typeof user.toString);
console.log("toString" in user);
console.log(Object.hasOwn(user, "toString"));
~~~

Output:

~~~text
function
true
false
~~~

## Enumerate object properties

### Object.keys

**Object.keys(object)** returns an array of the object's own enumerable string-keyed property names.

~~~js
const user = {
    name: "Mina",
    active: true
};

console.log(Object.keys(user));
~~~

Output:

~~~text
[ 'name', 'active' ]
~~~

It does not include inherited properties or symbol keys. Non-enumerable properties are covered with property descriptors later.

### Object.values

**Object.values(object)** returns the values of the object's own enumerable string-keyed properties in the same key order as **Object.keys**.

~~~js
const user = {
    name: "Mina",
    active: true
};

console.log(Object.values(user));
~~~

Output:

~~~text
[ 'Mina', true ]
~~~

### Object.entries

**Object.entries(object)** returns an array of **[key, value]** pairs for own enumerable string-keyed properties.

~~~js
const settings = {
    theme: "dark",
    fontSize: 16
};

console.log(Object.entries(settings));
~~~

Output:

~~~text
[ [ 'theme', 'dark' ], [ 'fontSize', 16 ] ]
~~~

Entries can be used to process a record's keys and values together:

~~~js
const settings = {
    theme: "dark",
    fontSize: 16
};

for (const [key, value] of Object.entries(settings)) {
    console.log(key, value);
}
~~~

Output:

~~~text
theme dark
fontSize 16
~~~

### for...in includes inherited enumerable keys

A **for...in** loop visits enumerable string keys from the object and its prototype chain. If you only want the current object's own keys, check each key with **Object.hasOwn**.

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

Output:

~~~text
name Mina
~~~

In ordinary application code, **Object.keys**, **Object.values**, or **Object.entries** are often clearer when you only want own enumerable properties.

## Methods are functions stored in properties

A method is a function that is stored on an object and called through that object.

~~~js
const user = {
    name: "Asha",
    greet: function () {
        return "Hello, " + this.name;
    }
};

console.log(user.greet());
~~~

Output:

~~~text
Hello, Asha
~~~

Object literal method shorthand is a concise way to define the same kind of method:

~~~js
const user = {
    name: "Asha",
    greet() {
        return "Hello, " + this.name;
    }
};

console.log(user.greet());
~~~

Output:

~~~text
Hello, Asha
~~~

Methods can accept arguments and use other properties on their receiver:

~~~js
const cart = {
    itemCount: 3,
    describe(label) {
        return label + ": " + this.itemCount + " items";
    }
};

console.log(cart.describe("Cart"));
~~~

Output:

~~~text
Cart: 3 items
~~~

## How this works in a method call

For **object.method()**, the object before the dot is the receiver used as **this** inside an ordinary method function.

~~~js
const user = {
    name: "Mina",
    getName() {
        return this.name;
    }
};

console.log(user.getName());
~~~

Output:

~~~text
Mina
~~~

The function is not permanently attached to that receiver. If you copy the method to another variable, the call no longer has **user** as its receiver. Use **call** when you need to choose a receiver explicitly:

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

Output:

~~~text
Mina
~~~

The value of **this** depends on how a function is called. Arrow functions do not get their own **this** from a method call, so ordinary method syntax is the usual choice when a method needs **this**.

## Objects are shared by reference

Assigning an object to another variable copies its reference. Both variables can read and mutate the same object.

~~~js
const original = {
    status: "draft"
};

const alias = original;
alias.status = "published";

console.log(original.status);
console.log(original === alias);
~~~

Output:

~~~text
published
true
~~~

Object copying and nested references are covered in a later chapter. Remember that assignment alone does not create a separate object.

## Choose an object for a related record

Objects work well when values describe one entity and have clear names:

~~~js
const course = {
    title: "JavaScript",
    lessonCount: 52,
    isPublished: true
};

console.log(course.title);
console.log(course.lessonCount);
console.log(course.isPublished);
~~~

Output:

~~~text
JavaScript
52
true
~~~

Use arrays for ordered collections of values and objects for records whose values are identified by names. A common structure is an array of objects:

~~~js
const lessons = [
    { number: 1, title: "Introduction" },
    { number: 2, title: "Values and types" }
];

console.log(lessons[1].title);
~~~

Output:

~~~text
Values and types
~~~

## Common mistakes

- Using dot notation with a variable key and expecting it to evaluate the variable.
- Forgetting quotes around property names with spaces or hyphens.
- Assuming a missing property and an own property with value **undefined** are identical.
- Using **in** when only own properties should count.
- Assuming **Object.keys** includes inherited or non-enumerable properties.
- Using **for...in** without checking own properties when inherited keys should be excluded.
- Assuming a method's **this** is fixed to the object where the function was written.
- Expecting an extracted method call to keep its original receiver.
- Using an arrow function as a method when the method needs its receiver as **this**.
- Assuming assigning an object to another variable copies it.
- Using arrays for records with unrelated named fields instead of an object.

## Try it yourself

1. Create a **product** object with a name, numeric price, and availability flag.
2. Read a property with dot notation and with bracket notation.
3. Store a property name in a variable and use it to read and update the object.
4. Add an own property whose value is **undefined** and compare it with a missing property.
5. Create a prototype default and compare **in** with **Object.hasOwn**.
6. Print an object's keys, values, and entries.
7. Define a method that reads two properties through **this**.
8. Extract a method and call it with an explicit receiver using **call**.
9. Use **for...in** on an object with a prototype and print only own keys.
10. Create an array of records and read one record's property.

## Key points

- Objects group values and behavior under property keys.
- Dot notation is for known identifier-like keys; bracket notation supports dynamic and unusual keys.
- Reading a missing property normally returns **undefined**.
- **Object.hasOwn** checks for a direct property; **in** includes inherited properties.
- **Object.keys**, **Object.values**, and **Object.entries** enumerate own enumerable string-keyed properties.
- **for...in** can include inherited enumerable keys.
- A method is a function stored in a property.
- An ordinary method call uses the object before the dot as **this**.
- Assigning an object to another variable copies its reference.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [51 - Sparse arrays, array-like objects, and array protocols](051-sparse-arrays-array-like-objects-and-array-protocols.md) | [Open Q&A](../qnas/052-objects-properties-and-methods.md) | [Open example](../examples/052-objects-properties-and-methods.md) | [53 - Property keys, descriptors, and enumerability](053-property-keys-descriptors-and-enumerability.md) |
