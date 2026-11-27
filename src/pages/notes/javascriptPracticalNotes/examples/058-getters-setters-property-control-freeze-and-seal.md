# 58 - Getters, setters, property control, freeze, and seal: examples

These examples show how accessor properties work, how descriptors control properties, and how preventExtensions, seal, and freeze differ. Each example includes a question, complete code, expected output, and an explanation.

## 1. Read a computed value with a getter

### Question

How can a property return a value calculated from other properties?

### Code

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

### Expected output

~~~text
36
~~~

### Explanation

Reading total invokes the getter. The getter calculates the current price times quantity.

## 2. Getter reads run on every access

### Question

Does reading a getter twice call it twice?

### Code

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

### Expected output

~~~text
10
10
2
~~~

### Explanation

A getter runs whenever its property is read. JavaScript does not automatically cache its result.

## 3. Use a setter to update related properties

### Question

How can assigning fullName update firstName and lastName?

### Code

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

### Expected output

~~~text
Mina
Dev
~~~

### Explanation

Assignment invokes the setter with the assigned string. Its code splits the value and updates the backing properties.

## 4. Combine a getter and setter

### Question

Can one property control both reading and writing?

### Code

~~~js
const box = {
    _value: 1,

    get value() {
        return this._value;
    },

    set value(nextValue) {
        this._value = nextValue;
    }
};

box.value = 8;
console.log(box.value);
~~~

### Expected output

~~~text
8
~~~

### Explanation

The getter handles reads and the setter handles assignments. The underscore name is only a public naming convention.

## 5. Validate a value in a setter

### Question

How can a setter reject non-finite input?

### Code

~~~js
const temperature = {
    _celsius: 20,

    get celsius() {
        return this._celsius;
    },

    set celsius(value) {
        if (typeof value !== "number" || !Number.isFinite(value)) {
            throw new TypeError("Temperature must be finite");
        }

        this._celsius = value;
    }
};

temperature.celsius = 25;
console.log(temperature.celsius);
~~~

### Expected output

~~~text
25
~~~

### Explanation

The setter validates before changing _celsius. Invalid inputs would throw a TypeError.

## 6. Inspect an accessor descriptor

### Question

Which descriptor fields identify a getter?

### Code

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

### Expected output

~~~text
function
undefined
true
true
~~~

### Explanation

The descriptor exposes the getter function and has no setter. Object-literal accessors are normally enumerable and configurable.

## 7. Define a getter with Object.defineProperty

### Question

How can a calculated property be added to an existing object?

### Code

~~~js
const product = {
    price: 8,
    quantity: 4
};

Object.defineProperty(product, "total", {
    enumerable: true,
    configurable: true,

    get() {
        return this.price * this.quantity;
    }
});

console.log(product.total);
console.log(Object.keys(product).join(", "));
~~~

### Expected output

~~~text
32
price, quantity, total
~~~

### Explanation

The descriptor adds an accessor property. Its enumerable flag makes total appear in Object.keys.

## 8. Define a getter and setter with Object.defineProperty

### Question

How can an accessor be backed by a variable outside the object?

### Code

~~~js
let storedValue = 3;
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

box.value = 9;
console.log(box.value);
~~~

### Expected output

~~~text
9
~~~

### Explanation

The getter and setter share the storedValue variable. The accessor property itself does not need to store a data value.

## 9. Inspect default flags on a new defined property

### Question

What flags are set when they are omitted for a new property?

### Code

~~~js
const object = {};

Object.defineProperty(object, "id", {
    value: 7
});

const descriptor = Object.getOwnPropertyDescriptor(object, "id");

console.log(object.id);
console.log(descriptor.writable);
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
console.log(Object.keys(object).length);
~~~

### Expected output

~~~text
7
false
false
false
0
~~~

### Explanation

New properties created by Object.defineProperty default omitted flags to false. The property can be read directly even though it is not enumerable.

## 10. Compare a descriptor-defined property with an assigned property

### Question

Do ordinary assignment and Object.defineProperty use the same defaults?

### Code

~~~js
const object = {};
object.assigned = "visible";

Object.defineProperty(object, "defined", {
    value: "hidden"
});

console.log(Object.keys(object).join(", "));
console.log(object.assigned);
console.log(object.defined);
~~~

### Expected output

~~~text
assigned
visible
hidden
~~~

### Explanation

Ordinary assignment normally creates writable, enumerable, configurable properties. The descriptor-defined property uses false defaults for omitted flags.

## 11. Define multiple properties at once

### Question

How can several properties be defined with explicit descriptors?

### Code

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

### Expected output

~~~text
Notebook
8
name, price
~~~

### Explanation

Object.defineProperties applies a descriptor to each listed key. The explicit flags make the new properties writable and enumerable.

## 12. Prevent extensions

### Question

What happens when adding a property after preventExtensions?

### Code

~~~js
const user = {
    name: "Asha"
};

Object.preventExtensions(user);

console.log(Object.isExtensible(user));
console.log(Reflect.set(user, "role", "editor"));
console.log(Object.hasOwn(user, "role"));
~~~

### Expected output

~~~text
false
false
false
~~~

### Explanation

The object cannot receive new own properties after it is made non-extensible.

## 13. Existing properties can change after preventExtensions

### Question

Can an existing writable property still be updated?

### Code

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

### Expected output

~~~text
true
true
Mina
name
~~~

### Explanation

preventExtensions only blocks adding properties. Existing property behavior still follows its descriptor.

## 14. Seal an object

### Question

Can a sealed object's existing writable value change?

### Code

~~~js
const settings = {
    theme: "light"
};

Object.seal(settings);

console.log(Object.isExtensible(settings));
console.log(Object.isSealed(settings));
console.log(Reflect.set(settings, "theme", "dark"));
console.log(settings.theme);
~~~

### Expected output

~~~text
false
true
true
dark
~~~

### Explanation

Seal prevents extensions and makes the property non-configurable, but leaves it writable.

## 15. A sealed property cannot be deleted

### Question

What happens when deleting a sealed object's property?

### Code

~~~js
const settings = {
    theme: "light"
};

Object.seal(settings);

console.log(Reflect.deleteProperty(settings, "theme"));
console.log(Object.hasOwn(settings, "theme"));
~~~

### Expected output

~~~text
false
true
~~~

### Explanation

Sealing makes existing own properties non-configurable. Reflect.deleteProperty reports false and the property remains.

## 16. Freeze an object's data properties

### Question

Can a frozen object's data value be changed?

### Code

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

### Expected output

~~~text
false
true
true
false
light
~~~

### Explanation

Freeze blocks additions, makes properties non-configurable, and makes own data properties non-writable.

## 17. Compare sealed and frozen states

### Question

Can an object be sealed without being frozen?

### Code

~~~js
const sealed = Object.seal({
    value: 1
});

const frozen = Object.freeze({
    value: 1
});

console.log(Object.isSealed(sealed));
console.log(Object.isFrozen(sealed));
console.log(Object.isSealed(frozen));
console.log(Object.isFrozen(frozen));
~~~

### Expected output

~~~text
true
false
true
true
~~~

### Explanation

A sealed data property can remain writable. A frozen data property is non-writable, so a frozen object is also sealed.

## 18. Freeze is shallow

### Question

Does freezing an outer object freeze a nested object too?

### Code

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

### Expected output

~~~text
true
false
dark
~~~

### Explanation

Only settings itself was frozen. appearance is a separate object and remains writable.

## 19. A frozen accessor setter can still run

### Question

Does freeze disable the setter function?

### Code

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

### Expected output

~~~text
true
5
~~~

### Explanation

The accessor property is non-configurable after freezing, but its setter still runs and updates external state.

## 20. Freeze an array

### Question

Can a frozen array have an existing or new element changed?

### Code

~~~js
const values = [1, 2, 3];
Object.freeze(values);

console.log(Reflect.set(values, 0, 9));
console.log(Reflect.set(values, 3, 4));
console.log(values.join(", "));
~~~

### Expected output

~~~text
false
false
1, 2, 3
~~~

### Explanation

Array indices and length are properties. Freezing prevents changing existing index values or adding a new index.

## 21. Check extensibility, sealing, and freezing

### Question

How can the three integrity states be inspected?

### Code

~~~js
const normal = {};
const sealed = Object.seal({});
const frozen = Object.freeze({});

console.log(Object.isExtensible(normal));
console.log(Object.isSealed(sealed));
console.log(Object.isFrozen(frozen));
~~~

### Expected output

~~~text
true
true
true
~~~

### Explanation

Each method reports a different aspect of the object's integrity state.

## 22. Use Reflect.set to handle a rejected update

### Question

How can code test whether changing a frozen property succeeded without relying on strict mode?

### Code

~~~js
const user = {
    name: "Asha"
};

Object.freeze(user);

const succeeded = Reflect.set(user, "name", "Mina");

console.log(succeeded);
console.log(user.name);
~~~

### Expected output

~~~text
false
Asha
~~~

### Explanation

Reflect.set returns a boolean. A direct assignment in strict code would throw instead of silently failing.

## 23. Inspect a frozen property's descriptor

### Question

Which descriptor flags change after freezing?

### Code

~~~js
const object = {
    value: 1
};

Object.freeze(object);

const descriptor = Object.getOwnPropertyDescriptor(object, "value");

console.log(descriptor.writable);
console.log(descriptor.configurable);
console.log(descriptor.enumerable);
~~~

### Expected output

~~~text
false
false
true
~~~

### Explanation

Freeze changes writable and configurable to false. The enumerable flag stays as it was.

## 24. Define an accessor with explicit enumerability

### Question

Can a getter be hidden from Object.keys while remaining readable?

### Code

~~~js
const user = {
    name: "Mina"
};

Object.defineProperty(user, "label", {
    enumerable: false,
    configurable: true,

    get() {
        return "User: " + this.name;
    }
});

console.log(user.label);
console.log(Object.keys(user).join(", "));
~~~

### Expected output

~~~text
User: Mina
name
~~~

### Explanation

The getter remains readable. Its non-enumerable flag only keeps label out of Object.keys.

## 25. Check that freeze does not recurse

### Question

How can a deep-freeze function process nested objects?

### Code

~~~js
function deepFreeze(value) {
    if (value === null || typeof value !== "object" || Object.isFrozen(value)) {
        return value;
    }

    for (const key of Reflect.ownKeys(value)) {
        deepFreeze(value[key]);
    }

    return Object.freeze(value);
}

const settings = {
    appearance: {
        theme: "light"
    }
};

deepFreeze(settings);

console.log(Object.isFrozen(settings));
console.log(Object.isFrozen(settings.appearance));
~~~

### Expected output

~~~text
true
true
~~~

### Explanation

The helper recursively visits own string and symbol keys before freezing each object. Production deep-freeze utilities need careful handling of cycles, accessors, and special objects.

## 26. Setter validation rejects an invalid value

### Question

How can a setter reject an invalid assigned value?

### Code

~~~js
const account = {
    _age: 20,

    get age() {
        return this._age;
    },

    set age(value) {
        if (!Number.isInteger(value) || value < 0) {
            throw new RangeError("Age must be a non-negative integer");
        }

        this._age = value;
    }
};

try {
    account.age = -1;
} catch (error) {
    console.log(error.name);
}

console.log(account.age);
~~~

### Expected output

~~~text
RangeError
20
~~~

### Explanation

The setter checks the value before updating the backing property. A rejected value leaves the previous state intact.

## 27. Freeze preserves the getter but not mutability of its data properties

### Question

Can a getter still read a frozen data property?

### Code

~~~js
const user = {
    firstName: "Asha",
    lastName: "Rao",

    get fullName() {
        return this.firstName + " " + this.lastName;
    }
};

Object.freeze(user);

console.log(user.fullName);
console.log(Reflect.set(user, "firstName", "Mina"));
~~~

### Expected output

~~~text
Asha Rao
false
~~~

### Explanation

The accessor still runs when read. Its related firstName data property is frozen and cannot be changed.

## 28. Freeze returns the same object

### Question

Does Object.freeze create a copy?

### Code

~~~js
const original = {
    active: true
};

const result = Object.freeze(original);

console.log(result === original);
console.log(Object.isFrozen(original));
~~~

### Expected output

~~~text
true
true
~~~

### Explanation

Object.freeze changes the integrity state of the same object and returns that object.

## Practice prompts

1. Add a getter for a full name and count how often it is read.
2. Use a setter to validate a finite numeric value.
3. Inspect getter and setter descriptors.
4. Define a data property with all flags explicit and compare it to an assigned property.
5. Prevent extensions and try adding, updating, and deleting properties.
6. Seal an object and inspect its writable and configurable flags.
7. Freeze an object and inspect Reflect.set and Reflect.deleteProperty results.
8. Freeze an outer object that contains nested data and compare the integrity checks.
9. Freeze an accessor object whose setter writes to external state.
10. Write a cycle-safe deep-freeze helper and explain the behavior for accessors.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [57 - Object identity, shallow copies, deep copies, and structuredClone](057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [Open lesson](../lessons/058-getters-setters-property-control-freeze-and-seal.md) | [Open Q&A](../qnas/058-getters-setters-property-control-freeze-and-seal.md) | [59 - Prototypes and the prototype chain](../lessons/059-prototypes-and-the-prototype-chain.md) |
