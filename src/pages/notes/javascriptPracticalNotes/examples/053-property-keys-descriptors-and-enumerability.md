# 53 - Property keys, descriptors, and enumerability: examples

These examples show how property descriptors control assignment, deletion, and enumeration. They also compare the APIs that inspect own string and symbol keys.

## 1. Inspect a normal object property

### Question

What descriptor does an object literal create for a data property?

### Code

~~~js
const user = {
    name: "Mina"
};

console.log(Object.getOwnPropertyDescriptor(user, "name"));
~~~

### Expected output

~~~text
{ value: 'Mina', writable: true, enumerable: true, configurable: true }
~~~

### Explanation

An ordinary object literal data property is writable, enumerable, and configurable by default.

## 2. Define a property with default attributes

### Question

What are the defaults when flags are omitted from **Object.defineProperty**?

### Code

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

### Expected output

~~~text
hidden
[]
false
false
false
~~~

### Explanation

For a new property, omitted **writable**, **enumerable**, and **configurable** fields default to false. The property is still readable by key.

## 3. Define an enumerable property

### Question

How can a property be included in **Object.keys**?

### Code

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

### Expected output

~~~text
dark
[ 'theme' ]
~~~

### Explanation

The descriptor explicitly makes **theme** enumerable, so it appears in **Object.keys**.

## 4. Make a property read-only

### Question

What happens when a non-writable data property is assigned through **Reflect.set**?

### Code

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

### Expected output

~~~text
false
17
~~~

### Explanation

The write fails because **writable** is false. **Reflect.set** returns false and the stored value remains 17.

## 5. Make a property non-configurable

### Question

Can a non-configurable property be deleted?

### Code

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

### Expected output

~~~text
false
17
~~~

### Explanation

**configurable: false** prevents deletion. **Reflect.deleteProperty** reports the failed deletion with false.

## 6. A non-enumerable property is still readable

### Question

Does **enumerable: false** hide a property from direct access?

### Code

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

### Expected output

~~~text
42
true
[ 'name' ]
~~~

### Explanation

The property exists and is readable. **enumerable: false** only excludes it from enumeration operations that select enumerable properties.

## 7. Compare key inspection APIs

### Question

Which keys are returned when an object has enumerable, non-enumerable, and symbol keys?

### Code

~~~js
const token = Symbol("token");
const record = {
    name: "Asha",
    [token]: "private"
};

Object.defineProperty(record, "hidden", {
    value: true,
    enumerable: false
});

console.log(Object.keys(record));
console.log(Object.getOwnPropertyNames(record));
console.log(Object.getOwnPropertySymbols(record).length);
console.log(Reflect.ownKeys(record).length);
~~~

### Expected output

~~~text
[ 'name' ]
[ 'name', 'hidden' ]
1
3
~~~

### Explanation

**Object.keys** returns enumerable own string keys. **Object.getOwnPropertyNames** includes all own string keys. **Object.getOwnPropertySymbols** returns symbol keys. **Reflect.ownKeys** returns all own keys.

## 8. Read a getter property

### Question

How is an accessor getter read?

### Code

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

### Expected output

~~~text
Asha Rao
~~~

### Explanation

Reading **fullName** invokes the getter. No parentheses are used because it is accessed as a property.

## 9. Use a setter to update fields

### Question

How can assigning a full name update two underlying properties?

### Code

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

### Expected output

~~~text
Mina
Dev
Mina Dev
~~~

### Explanation

Assigning **fullName** invokes the setter, which stores the name parts in the other properties.

## 10. Inspect an accessor descriptor

### Question

Does the descriptor for a getter have a **value** field?

### Code

~~~js
const user = {
    name: "Asha",
    get label() {
        return "User: " + this.name;
    }
};

const descriptor = Object.getOwnPropertyDescriptor(user, "label");

console.log(typeof descriptor.get);
console.log(descriptor.set);
console.log(Object.hasOwn(descriptor, "value"));
console.log(descriptor.enumerable);
~~~

### Expected output

~~~text
function
undefined
false
true
~~~

### Explanation

The getter is represented in the descriptor's **get** field. Accessor descriptors use **get** and **set**, not **value** and **writable**.

## 11. Define a computed accessor with Object.defineProperty

### Question

Can **Object.defineProperty** create a getter that calculates a value?

### Code

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
console.log(Object.keys(temperature));
~~~

### Expected output

~~~text
68
[ 'celsius', 'fahrenheit' ]
~~~

### Explanation

Reading **fahrenheit** calls the getter. Setting **enumerable: true** makes the accessor appear in **Object.keys**.

## 12. Read all descriptors

### Question

How can every own property descriptor be inspected?

### Code

~~~js
const settings = {
    theme: "dark",
    fontSize: 16
};

const descriptors = Object.getOwnPropertyDescriptors(settings);

console.log(descriptors.theme.value);
console.log(descriptors.fontSize.writable);
~~~

### Expected output

~~~text
dark
true
~~~

### Explanation

**Object.getOwnPropertyDescriptors** returns a descriptor for every own property, including non-enumerable and symbol-keyed properties.

## 13. Object.keys omits inherited and non-enumerable keys

### Question

How do **Object.keys** and **for...in** differ for an object with an enumerable prototype property?

### Code

~~~js
const defaults = {
    role: "viewer"
};

const user = Object.create(defaults);
user.name = "Mina";

console.log(Object.keys(user));

for (const key in user) {
    console.log(key);
}
~~~

### Expected output

~~~text
[ 'name' ]
name
role
~~~

### Explanation

**Object.keys** lists own enumerable keys only. **for...in** includes enumerable string keys from the prototype chain.

## 14. Filter for own keys in for...in

### Question

How can a **for...in** loop exclude inherited keys?

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

The own-property check ignores inherited **role**, leaving only the property stored directly on **user**.

## 15. Object spread skips non-enumerable properties

### Question

Will object spread copy an own non-enumerable property?

### Code

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

### Expected output

~~~text
Mina
false
~~~

### Explanation

Object spread copies own enumerable properties. It does not copy the non-enumerable **internalId** property.

## 16. Object spread includes enumerable symbol properties

### Question

Can object spread copy an enumerable symbol key?

### Code

~~~js
const token = Symbol("token");

const source = {
    name: "Asha",
    [token]: "value"
};

const copy = { ...source };

console.log(Object.keys(copy));
console.log(Object.getOwnPropertySymbols(copy).length);
console.log(copy[token]);
~~~

### Expected output

~~~text
[ 'name' ]
1
value
~~~

### Explanation

Object spread copies own enumerable string and symbol properties. **Object.keys** still lists only string keys.

## 17. Inspect the order of own keys

### Question

In what order are integer-like keys, ordinary string keys, and symbol keys returned?

### Code

~~~js
const marker = Symbol("marker");

const record = {
    z: "z",
    10: "ten",
    2: "two",
    a: "a",
    [marker]: "symbol"
};

console.log(Reflect.ownKeys(record));
~~~

### Expected output

~~~text
[ '2', '10', 'z', 'a', Symbol(marker) ]
~~~

### Explanation

Array-index string keys appear first in numeric order. Other strings follow in creation order, then symbols in creation order.

## 18. Object literal getters are enumerable by default

### Question

Will a getter defined in an object literal appear in **Object.keys**?

### Code

~~~js
const user = {
    name: "Mina",
    get label() {
        return "User: " + this.name;
    }
};

console.log(Object.keys(user));
console.log(Object.getOwnPropertyDescriptor(user, "label").enumerable);
~~~

### Expected output

~~~text
[ 'name', 'label' ]
true
~~~

### Explanation

Object literal properties, including accessor properties, are enumerable by default.

## 19. Object.entries reads property values

### Question

Does **Object.entries** invoke an enumerable getter when it reads the property's value?

### Code

~~~js
let getterCalls = 0;

const record = {
    get label() {
        getterCalls += 1;
        return "ready";
    }
};

console.log(Object.keys(record));
console.log(getterCalls);

console.log(Object.entries(record));
console.log(getterCalls);
~~~

### Expected output

~~~text
[ 'label' ]
0
[ [ 'label', 'ready' ] ]
1
~~~

### Explanation

**Object.keys** lists the key without reading its value. **Object.entries** retrieves the value, which invokes the getter.

## 20. Practice: define multiple properties

### Question

How can one call define a visible property and a hidden property?

### Code

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

console.log(Object.keys(settings));
console.log(settings.internalId);
~~~

### Expected output

~~~text
[ 'theme' ]
42
~~~

### Explanation

The descriptors specify separate behavior. **theme** is enumerable, while **internalId** can be read but is non-enumerable.

## 21. Practice prompts

1. Create a read-only but enumerable property and inspect its descriptor.
2. Create a writable but non-enumerable property.
3. Compare **Object.keys** and **Object.getOwnPropertyNames**.
4. Add one symbol key and compare **Object.getOwnPropertySymbols** with **Reflect.ownKeys**.
5. Create a getter and inspect its **get** and **set** descriptor fields.
6. Use a setter to validate an assigned value before storing it.
7. Use **Reflect.set** and **Reflect.deleteProperty** to observe failed operations.
8. Compare **Object.keys** and **Object.entries** when a getter increments a counter.
9. Add numeric-like and ordinary string keys and inspect key order.
10. Check whether spread copies an enumerable symbol and a non-enumerable string property.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [52 - Objects: properties and methods](052-objects-properties-and-methods.md) | [Open lesson](../lessons/053-property-keys-descriptors-and-enumerability.md) | [Open Q&A](../qnas/053-property-keys-descriptors-and-enumerability.md) | [54 - Computed properties, shorthand, and method definitions](../lessons/054-computed-properties-shorthand-and-method-definitions.md) |
