# 58 - Getters, setters, property control, freeze, and seal

JavaScript properties can store a value directly or run code when the property is read or assigned. Property descriptors control whether a property can be changed, enumerated, or reconfigured. Object integrity methods can restrict an object's own properties, but they do not automatically make nested data immutable.

This chapter covers getters, setters, accessor descriptors, Object.defineProperty, Object.defineProperties, preventExtensions, seal, freeze, integrity checks, and the limits of shallow property protection.

## What you will learn

- Distinguish data properties from accessor properties.
- Define getters and setters in object literals and with property descriptors.
- Validate or derive values through accessors.
- Inspect accessor descriptors.
- Control whether new properties can be added.
- Compare Object.preventExtensions, Object.seal, and Object.freeze.
- Check extensibility, sealed state, and frozen state.
- Explain why freeze is shallow and does not disable accessor code.
- Use Reflect operations to observe failed property changes.

## Data properties and accessor properties

A data property stores a value directly. An accessor property runs a getter when read or a setter when assigned.

| Property kind | Descriptor fields | Behavior |
| --- | --- | --- |
| Data property | value, writable | Stores a value directly |
| Accessor property | get, set | Runs functions during reads or assignments |
| Either kind | enumerable, configurable | Controls enumeration and descriptor changes |

A property cannot be both a data property and an accessor property at the same time.

## Define a getter in an object literal

A getter lets property-read syntax calculate or retrieve a value:

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

Read the getter like a property. Do not add parentheses. Each read calls its getter function.

A getter can compute a value from other state:

~~~js
const cart = {
    price: 12,
    quantity: 3,

    get total() {
        return this.price * this.quantity;
    }
};

console.log(cart.total);
~~~

Output:

~~~text
36
~~~

The total is calculated when read, so changing price or quantity affects a later read. A getter is not automatically cached.

### Keep getters predictable

A getter should usually return a value without surprising side effects. Any code that reads the property can cause the getter to run, including logging, destructuring, object spread, or inspection tools.

~~~js
let reads = 0;

const record = {
    get value() {
        reads += 1;
        return 10;
    }
};

console.log(record.value);
console.log(record.value);
console.log(reads);
~~~

Output:

~~~text
10
10
2
~~~

Since each read runs the getter, avoid using a getter for work that should happen only when a caller explicitly requests an operation.

## Define a setter in an object literal

A setter runs when code assigns to a property:

~~~js
const user = {
    firstName: "Asha",
    lastName: "Rao",

    set fullName(value) {
        const parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

user.fullName = "Mina Dev";

console.log(user.firstName);
console.log(user.lastName);
~~~

Output:

~~~text
Mina
Dev
~~~

The assignment invokes the setter. The setter receives the assigned value as its parameter. A setter does not create a stored fullName value unless its code explicitly stores one.

### Use a setter to validate input

A setter can reject or normalize invalid input before storing it:

~~~js
const temperature = {
    _celsius: 20,

    get celsius() {
        return this._celsius;
    },

    set celsius(value) {
        if (typeof value !== "number" || !Number.isFinite(value)) {
            throw new TypeError("Temperature must be a finite number");
        }

        this._celsius = value;
    }
};

temperature.celsius = 25;
console.log(temperature.celsius);
~~~

Output:

~~~text
25
~~~

The underscore is only a naming convention here. _celsius remains an ordinary public property. Use actual private fields when encapsulation is required; private class elements are covered later.

### A getter and setter can share one property

~~~js
const temperature = {
    _celsius: 20,

    get celsius() {
        return this._celsius;
    },

    set celsius(value) {
        this._celsius = value;
    }
};

temperature.celsius = 22;
console.log(temperature.celsius);
~~~

Output:

~~~text
22
~~~

A getter and setter with the same name form one accessor property. The getter controls reads, and the setter controls assignments.

## Inspect an accessor descriptor

Object.getOwnPropertyDescriptor reveals accessor functions and attributes:

~~~js
const user = {
    name: "Mina",

    get label() {
        return "User: " + this.name;
    }
};

const descriptor = Object.getOwnPropertyDescriptor(user, "label");

console.log(typeof descriptor.get);
console.log(descriptor.set);
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
~~~

Output:

~~~text
function
undefined
true
true
~~~

An accessor descriptor has get and/or set, rather than value and writable. The accessor created in an object literal is normally enumerable and configurable.

## Define accessors with Object.defineProperty

Object.defineProperty can add an accessor property to an object:

~~~js
const user = {
    firstName: "Dev",
    lastName: "Kumar"
};

Object.defineProperty(user, "fullName", {
    enumerable: true,
    configurable: true,

    get() {
        return this.firstName + " " + this.lastName;
    }
});

console.log(user.fullName);
console.log(Object.keys(user).join(", "));
~~~

Output:

~~~text
Dev Kumar
firstName, lastName, fullName
~~~

When defining a new property, omitted enumerable and configurable attributes default to false. A descriptor that contains get or set is an accessor descriptor and must not also contain value or writable.

~~~js
const account = {};

Object.defineProperty(account, "status", {
    value: "active"
});

const descriptor = Object.getOwnPropertyDescriptor(account, "status");

console.log(account.status);
console.log(descriptor.writable);
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
~~~

Output:

~~~text
active
false
false
false
~~~

This differs from an object literal or ordinary assignment, which normally creates a writable, enumerable, configurable data property. When redefining an existing property, descriptor fields that are omitted generally keep their current attributes.

### Define a getter and setter with a descriptor

~~~js
let storedValue = 1;
const box = {};

Object.defineProperty(box, "value", {
    enumerable: true,
    configurable: true,

    get() {
        return storedValue;
    },

    set(nextValue) {
        storedValue = nextValue;
    }
});

box.value = 8;
console.log(box.value);
~~~

Output:

~~~text
8
~~~

The getter and setter functions are stored in the property's descriptor. The value itself is kept in storedValue outside the object.

### Define several properties together

~~~js
const product = {};

Object.defineProperties(product, {
    name: {
        value: "Notebook",
        writable: true,
        enumerable: true,
        configurable: true
    },

    price: {
        value: 8,
        writable: true,
        enumerable: true,
        configurable: true
    }
});

console.log(product.name);
console.log(product.price);
console.log(Object.keys(product).join(", "));
~~~

Output:

~~~text
Notebook
8
name, price
~~~

Object.defineProperties applies a descriptor for each property. New properties default omitted descriptor flags to false, so specify the attributes the program needs.

## Restrict property changes

JavaScript has three related integrity operations:

| Operation | Add properties | Delete or reconfigure existing properties | Change data values |
| --- | --- | --- | --- |
| Object.preventExtensions | No | Usually yes | Yes, if writable |
| Object.seal | No | No | Yes, if writable |
| Object.freeze | No | No | No for data properties |

These methods affect the object's own properties and extensibility. They do not recursively protect nested objects.

## Prevent extensions

Object.preventExtensions prevents new own properties from being added:

~~~js
const user = {
    name: "Asha"
};

Object.preventExtensions(user);

console.log(Object.isExtensible(user));
console.log(Reflect.set(user, "role", "editor"));
console.log(Object.hasOwn(user, "role"));
~~~

Output:

~~~text
false
false
false
~~~

Existing writable properties can still be changed, and configurable properties can still be deleted:

~~~js
const user = {
    name: "Asha",
    role: "reader"
};

Object.preventExtensions(user);

console.log(Reflect.set(user, "name", "Mina"));
console.log(Reflect.deleteProperty(user, "role"));
console.log(user.name);
console.log(Object.keys(user).join(", "));
~~~

Output:

~~~text
true
true
Mina
name
~~~

preventExtensions restricts only additions. It does not make existing properties non-writable or non-configurable.

## Seal an object

Object.seal prevents extensions and makes every existing own property non-configurable:

~~~js
const settings = {
    theme: "light"
};

Object.seal(settings);

console.log(Object.isExtensible(settings));
console.log(Object.isSealed(settings));
console.log(Reflect.set(settings, "theme", "dark"));
console.log(Reflect.set(settings, "compact", true));
console.log(Reflect.deleteProperty(settings, "theme"));
console.log(settings.theme);
~~~

Output:

~~~text
false
true
true
false
false
dark
~~~

The existing theme property is still writable, so its value can change. A new property cannot be added, and an existing property cannot be deleted.

Sealing also prevents changing descriptor attributes that require configurability. It does not turn writable data properties into read-only properties.

## Freeze an object

Object.freeze prevents extensions, makes existing own properties non-configurable, and makes existing own data properties non-writable:

~~~js
const settings = {
    theme: "light"
};

Object.freeze(settings);

console.log(Object.isExtensible(settings));
console.log(Object.isSealed(settings));
console.log(Object.isFrozen(settings));
console.log(Reflect.set(settings, "theme", "dark"));
console.log(settings.theme);
~~~

Output:

~~~text
false
true
true
false
light
~~~

A frozen object is also sealed and non-extensible. Reflect.set returns false when it cannot change the frozen data property. In strict code, direct assignment to a frozen data property throws a TypeError.

### Freeze is shallow

Freezing an object does not freeze its nested objects:

~~~js
const settings = {
    appearance: {
        theme: "light"
    }
};

Object.freeze(settings);
settings.appearance.theme = "dark";

console.log(Object.isFrozen(settings));
console.log(Object.isFrozen(settings.appearance));
console.log(settings.appearance.theme);
~~~

Output:

~~~text
true
false
dark
~~~

The outer settings object is frozen, but appearance is a separate object that remains mutable. A deep-freeze helper must recursively inspect and freeze nested values, and must account for cycles and special objects.

### Freezing an accessor does not disable its setter

Freezing changes property attributes. It does not remove the getter or setter functions of an accessor property:

~~~js
let storedValue = 1;

const box = {
    get value() {
        return storedValue;
    },

    set value(nextValue) {
        storedValue = nextValue;
    }
};

Object.freeze(box);
box.value = 5;

console.log(Object.isFrozen(box));
console.log(box.value);
~~~

Output:

~~~text
true
5
~~~

The accessor itself becomes non-configurable, but its setter still runs. The setter changes storedValue, which is separate from the frozen object's property attributes.

### Arrays can also be sealed or frozen

~~~js
const values = [1, 2, 3];
Object.freeze(values);

console.log(Object.isFrozen(values));
console.log(Reflect.set(values, 0, 9));
console.log(Reflect.set(values, 3, 4));
console.log(values.join(", "));
~~~

Output:

~~~text
true
false
false
1, 2, 3
~~~

Array indices and length are properties. Freezing the array prevents changing its existing indexed values and prevents adding new indices.

## Check integrity levels

Use the built-in checks to inspect object state:

~~~js
const extensible = {};
const sealed = Object.seal({});
const frozen = Object.freeze({});

console.log(Object.isExtensible(extensible));
console.log(Object.isSealed(sealed));
console.log(Object.isFrozen(frozen));
~~~

Output:

~~~text
true
true
true
~~~

Object.isExtensible checks whether properties can be added. Object.isSealed checks whether the object is non-extensible and its own properties are non-configurable. Object.isFrozen also requires own data properties to be non-writable.

These checks examine the given object itself. They do not recursively inspect nested objects.

## Common mistakes

- Assuming a getter is called like a method. Read the property directly.
- Assuming a setter stores a value automatically. Its code must update some state.
- Making a getter perform surprising work because ordinary reads can invoke it.
- Putting value or writable in an accessor descriptor.
- Forgetting that attributes omitted for a new Object.defineProperty property default to false.
- Assuming preventExtensions blocks changes to existing properties.
- Assuming seal makes existing data properties read-only.
- Assuming freeze recursively freezes nested objects.
- Assuming a frozen accessor property cannot run its setter.
- Assuming Reflect.set returning false throws. It reports failure; direct assignment behavior depends on strict mode.
- Assuming freeze prevents mutation through methods on nested objects.
- Treating freeze as a security boundary or substitute for validation.

## Try it yourself

1. Define a getter that calculates a total from price and quantity.
2. Add a setter that rejects values that are not finite numbers.
3. Inspect the getter and setter descriptor with Object.getOwnPropertyDescriptor.
4. Define a new property with Object.defineProperty and inspect its default attributes.
5. Prevent extensions and test adding, updating, and deleting properties.
6. Seal an object with one writable and one non-writable property.
7. Freeze an array and inspect Reflect.set results for an existing and a new index.
8. Freeze an object with a nested object and test both integrity states.
9. Freeze an object with an accessor whose setter updates external state.
10. Compare Object.isSealed and Object.isFrozen for a sealed but writable object.
11. Explain why a frozen object with a nested mutable object is not deeply immutable.
12. Decide whether a getter or an explicit method better expresses an operation with side effects.

## Key points

- A data property stores a value; an accessor property runs getter or setter functions.
- A getter runs on property reads, and a setter runs on assignments.
- New properties defined by Object.defineProperty default omitted attributes to false.
- preventExtensions blocks adding own properties but leaves existing descriptors alone.
- seal blocks extensions and makes existing own properties non-configurable.
- freeze also makes existing own data properties non-writable.
- Frozen accessor properties still retain their getter and setter functions.
- preventExtensions, seal, and freeze are shallow operations.
- Use Reflect operations or integrity checks to inspect whether property changes are allowed.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [57 - Object identity, shallow copies, deep copies, and structuredClone](057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [Open Q&A](../qnas/058-getters-setters-property-control-freeze-and-seal.md) | [Open example](../examples/058-getters-setters-property-control-freeze-and-seal.md) | [59 - Prototypes and the prototype chain](059-prototypes-and-the-prototype-chain.md) |
