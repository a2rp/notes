# 53 - Property keys, descriptors, and enumerability

An object's properties have more than a key and a value. Each property also has attributes that control whether its value can be changed, whether it appears in common enumerations, and whether it can be removed or reconfigured.

This chapter explains string and symbol keys, data and accessor descriptors, **Object.defineProperty**, property inspection, and the differences between common key enumeration methods.

## What you will learn

- Understand that property keys are strings or symbols.
- Inspect own property descriptors.
- Read the **writable**, **enumerable**, and **configurable** attributes.
- Define properties with **Object.defineProperty**.
- Distinguish data properties from accessor properties.
- Use getters and setters.
- Compare **Object.keys**, **Object.getOwnPropertyNames**, **Object.getOwnPropertySymbols**, and **Reflect.ownKeys**.
- Predict how enumerability affects loops, object methods, and JSON serialization.

## Property keys are strings or symbols

Most property keys are strings. Numeric-looking keys are converted to strings during ordinary property access. A symbol is another possible property key.

~~~js
const internalId = Symbol("internalId");

const record = {
    name: "Asha",
    [internalId]: 42
};

console.log(record.name);
console.log(record[internalId]);
console.log(Object.keys(record));
console.log(Object.getOwnPropertySymbols(record).length);
~~~

Output:

~~~text
Asha
42
[ 'name' ]
1
~~~

The symbol-keyed property is still an own property, but **Object.keys** lists only string keys. Symbols are covered in more detail in a later chapter.

## What is a property descriptor?

A property descriptor describes a property's value and attributes. JavaScript exposes descriptor information as an ordinary object.

A data property can have these attributes:

| Descriptor field | What it controls |
| --- | --- |
| **value** | The property's stored value |
| **writable** | Whether ordinary assignment can change the value |
| **enumerable** | Whether common enumeration operations include it |
| **configurable** | Whether it can be deleted or its attributes can be changed |

A data property created by an object literal or ordinary assignment is normally writable, enumerable, and configurable.

~~~js
const user = {
    name: "Mina"
};

user.role = "editor";

console.log(Object.getOwnPropertyDescriptor(user, "name"));
console.log(Object.getOwnPropertyDescriptor(user, "role"));
~~~

Output:

~~~text
{ value: 'Mina', writable: true, enumerable: true, configurable: true }
{ value: 'editor', writable: true, enumerable: true, configurable: true }
~~~

A descriptor can also be an accessor descriptor, which has a **get** function, a **set** function, or both, instead of a stored **value** and **writable** flag.

Both data and accessor descriptors can have **enumerable** and **configurable** attributes.

## Inspect one own property with getOwnPropertyDescriptor

**Object.getOwnPropertyDescriptor(object, key)** returns a descriptor for an own property. It returns **undefined** if the object does not own that property.

~~~js
const product = {
    name: "Notebook",
    price: 8
};

const descriptor = Object.getOwnPropertyDescriptor(product, "price");

console.log(descriptor.value);
console.log(descriptor.writable);
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
console.log(Object.getOwnPropertyDescriptor(product, "stock"));
~~~

Output:

~~~text
8
true
true
true
undefined
~~~

The method does not return an inherited property's descriptor. Use the prototype inspection APIs when you specifically need to inspect inherited properties.

### Inspect all own property descriptors

**Object.getOwnPropertyDescriptors(object)** returns an object whose properties contain descriptors for every own property key of the input, including non-enumerable and symbol keys.

~~~js
const settings = {
    theme: "dark",
    fontSize: 16
};

const descriptors = Object.getOwnPropertyDescriptors(settings);

console.log(descriptors.theme.value);
console.log(descriptors.fontSize.enumerable);
~~~

Output:

~~~text
dark
true
~~~

This is useful when inspecting or preserving property attributes. It does not recursively inspect nested objects.

## Define a property with Object.defineProperty

**Object.defineProperty(object, key, descriptor)** creates or updates an own property.

~~~js
const settings = {};

Object.defineProperty(settings, "theme", {
    value: "dark",
    writable: true,
    enumerable: true,
    configurable: true
});

console.log(settings.theme);
console.log(Object.keys(settings));
~~~

Output:

~~~text
dark
[ 'theme' ]
~~~

### Unspecified descriptor attributes default to false

When **Object.defineProperty** creates a new data property, omitted **writable**, **enumerable**, and **configurable** fields default to **false**.

~~~js
const settings = {};

Object.defineProperty(settings, "secret", {
    value: "hidden"
});

const descriptor = Object.getOwnPropertyDescriptor(settings, "secret");

console.log(settings.secret);
console.log(Object.keys(settings));
console.log(descriptor.writable);
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
~~~

Output:

~~~text
hidden
[]
false
false
false
~~~

The property can be read even though it is not listed by **Object.keys** and cannot be changed or deleted through ordinary operations.

This differs from an object literal or assignment, which normally creates a writable, enumerable, configurable data property.

### Define multiple properties

**Object.defineProperties** applies several descriptors to one object:

~~~js
const settings = {};

Object.defineProperties(settings, {
    theme: {
        value: "dark",
        writable: true,
        enumerable: true,
        configurable: true
    },
    internalId: {
        value: 42,
        writable: false,
        enumerable: false,
        configurable: false
    }
});

console.log(settings.theme);
console.log(settings.internalId);
console.log(Object.keys(settings));
~~~

Output:

~~~text
dark
42
[ 'theme' ]
~~~

Only **theme** is enumerable, so only it appears in **Object.keys**.

## Understand writable

For a data property, **writable: false** means an assignment cannot change its stored value.

~~~js
const account = {};

Object.defineProperty(account, "id", {
    value: 17,
    writable: false,
    enumerable: true,
    configurable: true
});

console.log(Reflect.set(account, "id", 25));
console.log(account.id);
~~~

Output:

~~~text
false
17
~~~

**Reflect.set** returns **false** when the assignment cannot be completed. In strict code, direct assignment to a non-writable property throws a **TypeError**. In non-strict code, that assignment fails silently.

**writable** applies to data properties. Accessor properties use a setter function to define assignment behavior.

## Understand configurable

**configurable: false** prevents deleting the property and prevents most changes to its descriptor. It also prevents changing between a data property and an accessor property.

~~~js
const account = {};

Object.defineProperty(account, "id", {
    value: 17,
    writable: true,
    enumerable: true,
    configurable: false
});

console.log(Reflect.deleteProperty(account, "id"));
console.log(account.id);
~~~

Output:

~~~text
false
17
~~~

Some limited changes to a non-configurable data property remain possible, such as changing **writable** from **true** to **false**. Property restrictions are designed to prevent incompatible changes, not to act as a general deep lock on an object.

## Understand enumerable

**enumerable** controls whether a property appears in common enumeration operations. It does not determine whether a property can be read by its key.

~~~js
const user = {
    name: "Mina"
};

Object.defineProperty(user, "internalId", {
    value: 42,
    writable: true,
    enumerable: false,
    configurable: true
});

console.log(user.internalId);
console.log(Object.hasOwn(user, "internalId"));
console.log(Object.keys(user));
~~~

Output:

~~~text
42
true
[ 'name' ]
~~~

The property exists and can be read. It is simply omitted from enumeration methods that select enumerable properties.

## Data properties and accessor properties

### Data property

A data property stores a value directly:

~~~js
const product = {
    price: 8
};

console.log(Object.getOwnPropertyDescriptor(product, "price"));
~~~

Output:

~~~text
{ value: 8, writable: true, enumerable: true, configurable: true }
~~~

### Accessor property with a getter

A getter runs when the property is read. It can calculate a value from other properties.

~~~js
const user = {
    firstName: "Asha",
    lastName: "Rao",
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(user.fullName);
~~~

Output:

~~~text
Asha Rao
~~~

Read it like a property, without parentheses. The getter's descriptor has **get** and **set** fields rather than **value** and **writable**.

~~~js
const user = {
    firstName: "Asha",
    lastName: "Rao",
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
};

const descriptor = Object.getOwnPropertyDescriptor(user, "fullName");

console.log(typeof descriptor.get);
console.log(descriptor.set);
console.log(descriptor.enumerable);
~~~

Output:

~~~text
function
undefined
true
~~~

### Accessor property with a getter and setter

A setter runs when a value is assigned to the property. It can update other properties or validate an input.

~~~js
const user = {
    firstName: "Asha",
    lastName: "Rao",
    get fullName() {
        return this.firstName + " " + this.lastName;
    },
    set fullName(value) {
        const parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

user.fullName = "Mina Dev";

console.log(user.firstName);
console.log(user.lastName);
console.log(user.fullName);
~~~

Output:

~~~text
Mina
Dev
Mina Dev
~~~

The property assignment invokes the setter. The **fullName** property is not storing the assigned string directly; the setter updates the two name fields.

### Define an accessor with a descriptor

A getter or setter can also be defined with **Object.defineProperty**:

~~~js
const temperature = {
    celsius: 20
};

Object.defineProperty(temperature, "fahrenheit", {
    enumerable: true,
    configurable: true,
    get() {
        return this.celsius * 9 / 5 + 32;
    }
});

console.log(temperature.fahrenheit);
~~~

Output:

~~~text
68
~~~

Do not mix data descriptor fields **value** or **writable** with accessor fields **get** or **set** in the same descriptor. A property is either a data property or an accessor property.

## Compare property enumeration methods

These methods answer different questions:

| Operation | Own properties | Inherited properties | Non-enumerable | Symbol keys |
| --- | --- | --- | --- | --- |
| **Object.keys** | Yes | No | No | No |
| **Object.values** | Yes | No | No | No |
| **Object.entries** | Yes | No | No | No |
| **for...in** | Yes | Yes | No | No |
| **Object.getOwnPropertyNames** | Yes | No | Yes | No |
| **Object.getOwnPropertySymbols** | Yes | No | Yes | Yes, only symbols |
| **Reflect.ownKeys** | Yes | No | Yes | Yes |

### Get all own string keys with getOwnPropertyNames

**Object.getOwnPropertyNames** includes non-enumerable own string keys:

~~~js
const user = {
    name: "Mina"
};

Object.defineProperty(user, "internalId", {
    value: 42,
    enumerable: false
});

console.log(Object.keys(user));
console.log(Object.getOwnPropertyNames(user));
~~~

Output:

~~~text
[ 'name' ]
[ 'name', 'internalId' ]
~~~

### Get own symbol keys

**Object.getOwnPropertySymbols** returns an array of an object's own symbol keys, including non-enumerable symbols.

~~~js
const internalId = Symbol("internalId");

const record = {
    name: "Asha",
    [internalId]: 42
};

console.log(Object.getOwnPropertySymbols(record).length);
console.log(Object.getOwnPropertySymbols(record)[0] === internalId);
~~~

Output:

~~~text
1
true
~~~

### Get all own keys with Reflect.ownKeys

**Reflect.ownKeys** returns all own string and symbol keys, whether enumerable or not.

~~~js
const internalId = Symbol("internalId");

const record = {
    name: "Asha",
    [internalId]: 42
};

Object.defineProperty(record, "hidden", {
    value: true,
    enumerable: false
});

const keys = Reflect.ownKeys(record);

console.log(keys.length);
console.log(keys[0]);
console.log(keys[1]);
console.log(keys[2] === internalId);
~~~

Output:

~~~text
3
name
hidden
true
~~~

Use **Reflect.ownKeys** when the goal is to inspect every own key. Use **Object.keys** when you want the common enumerable string keys.

## for...in and object spread

A **for...in** loop visits enumerable string keys on the object and its prototype chain. Check for own properties if inherited ones must be excluded.

~~~js
const defaults = {
    role: "viewer"
};

const user = Object.create(defaults);
user.name = "Mina";

for (const key in user) {
    console.log(key);
}
~~~

Output:

~~~text
name
role
~~~

Object spread copies an object's own enumerable properties into a new object. It does not copy inherited or non-enumerable properties, and symbols are also copied when enumerable.

~~~js
const source = {
    name: "Mina"
};

Object.defineProperty(source, "internalId", {
    value: 42,
    enumerable: false
});

const copy = { ...source };

console.log(copy.name);
console.log(Object.hasOwn(copy, "internalId"));
~~~

Output:

~~~text
Mina
false
~~~

Spread makes a shallow copy. Nested object values are still shared references. Copying and reference identity are covered in more detail later.

## Property key ordering

For ordinary own property enumeration, array-index string keys appear first in ascending numeric order, followed by other string keys in creation order, then symbol keys in creation order.

~~~js
const id = Symbol("id");

const record = {
    z: "last string",
    10: "ten",
    2: "two",
    a: "another string",
    [id]: "symbol"
};

console.log(Reflect.ownKeys(record));
~~~

Output:

~~~text
[ '2', '10', 'z', 'a', Symbol(id) ]
~~~

This ordering is relevant when inspecting keys. Do not use object property order as a substitute for a dedicated ordered collection when ordering is part of the data model.

## Common mistakes

- Assuming **Object.defineProperty** defaults omitted flags to **true**. For a new property they default to **false**.
- Treating **writable**, **enumerable**, and **configurable** as interchangeable.
- Assuming a non-enumerable property cannot be read.
- Assuming **Object.keys** returns every own property.
- Assuming **for...in** returns only own keys.
- Mixing **value** or **writable** with **get** or **set** in one descriptor.
- Calling a getter as a method or forgetting that reading it invokes code.
- Expecting **Object.getOwnPropertyDescriptor** to return an inherited property's descriptor.
- Forgetting that **Reflect.ownKeys** includes symbols and non-enumerable keys.
- Assuming object spread copies inherited or non-enumerable properties.
- Treating a shallow copy as a deep copy.
- Relying on property enumeration order when an explicit ordered collection would be more suitable.

## Try it yourself

1. Inspect the descriptor for an object literal property and one created by assignment.
2. Define a non-writable property and inspect what **Reflect.set** returns.
3. Define a non-enumerable property and compare **Object.keys** with **Object.getOwnPropertyNames**.
4. Create a getter that calculates a value from two other properties.
5. Add a setter that validates or splits an input before storing it.
6. Create a symbol-keyed property and inspect it with **Reflect.ownKeys**.
7. Use **for...in** with a prototype and distinguish own keys.
8. Compare object spread with **Object.getOwnPropertyDescriptors** on a source with hidden fields.
9. Create integer-like and ordinary string keys and inspect their order.
10. Explain which operations are affected by the **enumerable** flag.

## Key points

- A property key is a string or a symbol.
- Descriptors control property values and attributes.
- Data descriptors use **value** and **writable**; accessors use **get** and **set**.
- **writable** controls assignment to data properties.
- **enumerable** controls inclusion in common enumerations.
- **configurable** controls deletion and changes to property attributes.
- **Object.defineProperty** defaults omitted attributes to false for a new property.
- **Object.keys**, **Object.getOwnPropertyNames**, and **Reflect.ownKeys** return different key sets.
- Getters run on reads, and setters run on assignments.
- Object spread copies own enumerable properties, not every property.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [52 - Objects: properties and methods](052-objects-properties-and-methods.md) | [Open Q&A](../qnas/053-property-keys-descriptors-and-enumerability.md) | [Open example](../examples/053-property-keys-descriptors-and-enumerability.md) | [54 - Computed properties, shorthand, and method definitions](054-computed-properties-shorthand-and-method-definitions.md) |
