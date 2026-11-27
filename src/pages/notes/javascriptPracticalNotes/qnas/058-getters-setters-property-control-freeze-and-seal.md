# 58 - Getters, setters, property control, freeze, and seal: Q&A

This Q&A reviews accessor properties, property descriptors, Object.defineProperty, Object.preventExtensions, Object.seal, and Object.freeze. Each answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. What happens when this expression is evaluated?

~~~js
user.fullName
~~~

A. It calls the fullName getter  
B. It calls a method named fullName with no arguments  
C. It always returns undefined  
D. It changes the user's name

**Answer: A. It calls the fullName getter.**

**Explanation:** An accessor getter runs during property access. Read it like a property, without parentheses.

### 2. What happens when this expression is evaluated?

~~~js
user.fullName = "Mina Dev";
~~~

A. It calls the fullName setter  
B. It calls the fullName getter  
C. It always creates a second property  
D. It freezes user

**Answer: A. It calls the fullName setter.**

**Explanation:** Assignment to an accessor property invokes its setter with the assigned value.

### 3. Which fields belong in an accessor descriptor?

A. value and writable  
B. get and set  
C. value and get together  
D. writable and set together

**Answer: B. get and set**

**Explanation:** An accessor descriptor uses get and/or set. A descriptor cannot combine accessor fields with data fields value or writable.

### 4. What are omitted descriptor flags for a newly created property with Object.defineProperty?

A. true  
B. false  
C. Inherited from Object.prototype  
D. Randomly selected

**Answer: B. false**

**Explanation:** For a new property, omitted writable, enumerable, and configurable attributes default to false.

### 5. What does Object.preventExtensions do?

A. Makes all existing properties non-writable  
B. Prevents new own properties from being added  
C. Deletes every configurable property  
D. Recursively freezes nested objects

**Answer: B. Prevents new own properties from being added.**

**Explanation:** Existing properties keep their descriptors. They can still be updated or deleted when their attributes allow it.

### 6. What does Object.seal do to an existing writable data property?

A. Makes it non-writable  
B. Leaves it writable but makes it non-configurable  
C. Deletes it  
D. Converts it to a getter

**Answer: B. Leaves it writable but makes it non-configurable.**

**Explanation:** Seal prevents extensions and reconfiguration or deletion. It does not make data properties read-only.

### 7. What does Object.freeze do to an existing own data property?

A. Makes it non-writable and non-configurable  
B. Converts it to a symbol  
C. Makes it writable but non-enumerable  
D. Deletes it

**Answer: A. Makes it non-writable and non-configurable.**

**Explanation:** Freeze prevents extensions, makes own properties non-configurable, and makes own data properties non-writable.

### 8. Does Object.freeze recursively freeze nested objects?

A. Yes, every nested value is frozen automatically  
B. No, it freezes only the object passed to it  
C. Only for arrays  
D. Only for objects created with a literal

**Answer: B. No, it freezes only the object passed to it.**

**Explanation:** Freeze is shallow. A nested object remains mutable unless it is frozen separately.

### 9. What happens to an accessor setter when its containing object is frozen?

A. The setter is deleted  
B. The setter function can still run  
C. The property becomes a data property  
D. The setter is called once during freezing

**Answer: B. The setter function can still run.**

**Explanation:** Freeze makes the accessor property non-configurable. It does not remove its getter or setter. Setter code can still change state outside the frozen object's descriptors.

### 10. Which check confirms whether an object is extensible?

A. Object.isSealed  
B. Object.isFrozen  
C. Object.isExtensible  
D. Object.hasOwn

**Answer: C. Object.isExtensible**

**Explanation:** Object.isExtensible reports whether new own properties can be added.

### 11. Which statement is correct for an object after Object.freeze?

A. It is also sealed and non-extensible  
B. It can receive new properties  
C. Its nested objects are frozen  
D. Its getters are converted into stored values

**Answer: A. It is also sealed and non-extensible.**

**Explanation:** A frozen object has all the integrity restrictions of a sealed object, plus non-writable own data properties.

### 12. What does Reflect.set return when setting a frozen data property fails?

A. Always true  
B. false  
C. undefined  
D. The old property value

**Answer: B. false**

**Explanation:** Reflect.set reports whether the assignment operation succeeded. It returns false when the frozen data property cannot be changed.

## True or false

### 13. A getter is read using property syntax rather than method-call syntax.

**Answer: True.**

**Explanation:** An accessor getter is invoked by reading the property, for example object.value.

### 14. A setter automatically stores the assigned value somewhere.

**Answer: False.**

**Explanation:** The setter's code must update a backing property, closure variable, or other state.

### 15. A getter can run more than once when code reads its property more than once.

**Answer: True.**

**Explanation:** Each property read invokes the getter. A getter is not automatically cached.

### 16. A non-enumerable property cannot be read.

**Answer: False.**

**Explanation:** Enumerability controls some enumeration operations, not whether a property can be accessed by its key.

### 17. Object.preventExtensions makes existing writable properties non-writable.

**Answer: False.**

**Explanation:** It only prevents adding new own properties. Existing writable properties remain writable.

### 18. Object.seal prevents deleting existing own properties.

**Answer: True.**

**Explanation:** Sealing makes existing own properties non-configurable, so deletion fails.

### 19. A sealed object can still have an existing writable data property's value changed.

**Answer: True.**

**Explanation:** Seal affects extensibility and configurability, not the writable flag.

### 20. A frozen object with a nested mutable object can still observe nested mutations.

**Answer: True.**

**Explanation:** Freeze is shallow. The nested object has its own independent integrity state.

### 21. A frozen accessor property can retain a working setter.

**Answer: True.**

**Explanation:** Freeze does not disable accessor functions. A setter may update state stored elsewhere.

### 22. Object.isFrozen recursively checks every object reachable from its argument.

**Answer: False.**

**Explanation:** It checks the integrity level of only the supplied object.

## Short-answer questions

### 23. What is the difference between a data property and an accessor property?

**Answer:** A data property stores a value directly. An accessor property uses getter and setter functions when it is read or assigned.

**Explanation:** Their descriptor fields differ. Data descriptors use value and writable; accessor descriptors use get and set.

### 24. When does a setter run?

**Answer:** When code assigns to the accessor property.

**Explanation:** The assigned value is passed to the setter. The setter's body decides whether and where to store it.

### 25. What happens to omitted flags when Object.defineProperty creates a new data property?

**Answer:** writable, enumerable, and configurable default to false.

**Explanation:** These defaults differ from ordinary properties created by object literals or assignment, which are normally writable, enumerable, and configurable.

### 26. What is the difference between preventExtensions and seal?

**Answer:** preventExtensions only blocks adding own properties. seal also makes existing own properties non-configurable.

**Explanation:** A writable property can still be changed after either operation, provided its descriptor allows it.

### 27. What is the difference between seal and freeze?

**Answer:** Both block extensions and make existing own properties non-configurable. Freeze also makes existing own data properties non-writable.

**Explanation:** A sealed object's writable data property can still change value. A frozen object's data property cannot.

### 28. Why does freezing an object not guarantee that all its data is immutable?

**Answer:** Freeze is shallow and does not freeze nested objects. Accessor setters may also change state outside the frozen property descriptors.

**Explanation:** Each nested object has its own properties and integrity level. A frozen accessor retains its functions.

### 29. What does Object.isSealed check?

**Answer:** It checks whether an object is non-extensible and all its own properties are non-configurable.

**Explanation:** It does not require data properties to be non-writable, so an object can be sealed but not frozen.

### 30. What does Reflect.set provide when an assignment is rejected?

**Answer:** It returns false.

**Explanation:** Unlike direct assignment, Reflect.set gives a boolean result for success or failure without depending on strict-mode assignment errors.

## Predict the output

### 31. What is printed?

~~~js
let reads = 0;

const box = {
    get value() {
        reads += 1;
        return 7;
    }
};

console.log(box.value);
console.log(box.value);
console.log(reads);
~~~

**Answer:**

~~~text
7
7
2
~~~

**Explanation:** Each property read invokes the getter once.

### 32. What is printed?

~~~js
const user = {
    first: "Asha",
    last: "Rao",

    get fullName() {
        return this.first + " " + this.last;
    }
};

console.log(user.fullName);
~~~

**Answer:**

~~~text
Asha Rao
~~~

**Explanation:** Reading fullName runs its getter, which uses the receiver's first and last properties.

### 33. What is printed?

~~~js
const box = {
    _value: 1,

    set value(next) {
        this._value = next;
    },

    get value() {
        return this._value;
    }
};

box.value = 9;
console.log(box.value);
~~~

**Answer:**

~~~text
9
~~~

**Explanation:** Assignment invokes the setter, which updates _value. Reading value invokes the getter.

### 34. What is printed?

~~~js
const object = {};

Object.defineProperty(object, "id", {
    value: 7
});

const descriptor = Object.getOwnPropertyDescriptor(object, "id");

console.log(descriptor.writable);
console.log(descriptor.enumerable);
console.log(descriptor.configurable);
~~~

**Answer:**

~~~text
false
false
false
~~~

**Explanation:** All three omitted flags default to false when the property is new.

### 35. What is printed?

~~~js
const user = {
    name: "Asha"
};

Object.preventExtensions(user);

console.log(Object.isExtensible(user));
console.log(Reflect.set(user, "role", "editor"));
console.log(Reflect.set(user, "name", "Mina"));
console.log(user.name);
~~~

**Answer:**

~~~text
false
false
true
Mina
~~~

**Explanation:** A new role property cannot be added, but the existing writable name property can still change.

### 36. What is printed?

~~~js
const settings = {
    theme: "light"
};

Object.seal(settings);

console.log(Object.isSealed(settings));
console.log(Reflect.set(settings, "theme", "dark"));
console.log(Reflect.deleteProperty(settings, "theme"));
console.log(settings.theme);
~~~

**Answer:**

~~~text
true
true
false
dark
~~~

**Explanation:** Sealing leaves the writable flag true, but makes the property non-configurable, so deletion fails.

### 37. What is printed?

~~~js
const settings = {
    theme: "light"
};

Object.freeze(settings);

console.log(Object.isSealed(settings));
console.log(Object.isFrozen(settings));
console.log(Reflect.set(settings, "theme", "dark"));
console.log(settings.theme);
~~~

**Answer:**

~~~text
true
true
false
light
~~~

**Explanation:** A frozen object is sealed. Its data property is non-writable, so Reflect.set fails and the stored value remains unchanged.

### 38. What is printed?

~~~js
const settings = {
    nested: {
        active: true
    }
};

Object.freeze(settings);
settings.nested.active = false;

console.log(Object.isFrozen(settings));
console.log(Object.isFrozen(settings.nested));
console.log(settings.nested.active);
~~~

**Answer:**

~~~text
true
false
false
~~~

**Explanation:** Only the outer object was frozen. The nested object remains mutable.

### 39. What is printed?

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

**Answer:**

~~~text
true
5
~~~

**Explanation:** The accessor property is frozen against reconfiguration, but the setter still runs and changes the separate storedValue variable.

### 40. What is printed?

~~~js
const object = {
    value: 1
};

Object.seal(object);

console.log(Object.isSealed(object));
console.log(Object.isFrozen(object));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The object is sealed, but its value property remains writable, so it is not frozen.

## Coding questions

### 41. Define a getter that calculates a cart total.

**Answer:**

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

**Explanation:** The total is calculated when the getter is read.

### 42. Define a setter that accepts only finite numbers.

**Answer:**

~~~js
const box = {
    _value: 0,

    get value() {
        return this._value;
    },

    set value(nextValue) {
        if (typeof nextValue !== "number" || !Number.isFinite(nextValue)) {
            throw new TypeError("Value must be finite");
        }

        this._value = nextValue;
    }
};

box.value = 12;
console.log(box.value);
~~~

Output:

~~~text
12
~~~

**Explanation:** The setter validates the input before updating the backing property.

### 43. Define an accessor with Object.defineProperty.

**Answer:**

~~~js
let stored = 3;
const object = {};

Object.defineProperty(object, "value", {
    enumerable: true,
    configurable: true,

    get() {
        return stored;
    },

    set(nextValue) {
        stored = nextValue;
    }
});

object.value = 8;
console.log(object.value);
console.log(Object.keys(object).join(", "));
~~~

Output:

~~~text
8
value
~~~

**Explanation:** The descriptor defines getter and setter functions. The explicit enumerable flag makes the property appear in Object.keys.

### 44. Prevent extensions while allowing an existing property to change.

**Answer:**

~~~js
const user = {
    name: "Asha"
};

Object.preventExtensions(user);

const updated = Reflect.set(user, "name", "Mina");
const added = Reflect.set(user, "role", "editor");

console.log(updated);
console.log(added);
console.log(user.name);
console.log(Object.hasOwn(user, "role"));
~~~

Output:

~~~text
true
false
Mina
false
~~~

**Explanation:** preventExtensions blocks adding role but leaves the existing writable name property editable.

### 45. Seal an object and demonstrate that a value remains writable.

**Answer:**

~~~js
const settings = {
    theme: "light"
};

Object.seal(settings);

const updated = Reflect.set(settings, "theme", "dark");
const deleted = Reflect.deleteProperty(settings, "theme");

console.log(updated);
console.log(deleted);
console.log(settings.theme);
~~~

Output:

~~~text
true
false
dark
~~~

**Explanation:** The property remains writable but becomes non-configurable, so updating succeeds and deletion fails.

### 46. Freeze an object and inspect failed updates.

**Answer:**

~~~js
const settings = {
    theme: "light"
};

Object.freeze(settings);

console.log(Reflect.set(settings, "theme", "dark"));
console.log(Reflect.set(settings, "compact", true));
console.log(settings.theme);
console.log(Object.hasOwn(settings, "compact"));
~~~

Output:

~~~text
false
false
light
false
~~~

**Explanation:** Freeze blocks both changing the existing data value and adding a property.

### 47. Check how freeze affects nested data.

**Answer:**

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

**Explanation:** Freeze does not recurse into nested objects.

### 48. Check integrity levels for three objects.

**Answer:**

~~~js
const normal = {};
const sealed = Object.seal({});
const frozen = Object.freeze({});

console.log(Object.isExtensible(normal));
console.log(Object.isSealed(sealed));
console.log(Object.isFrozen(frozen));
~~~

Output:

~~~text
true
true
true
~~~

**Explanation:** Each integrity check reports a different property restriction.

## Review checklist

- Use getter syntax to read calculated values and setter syntax to validate or respond to assignments.
- Inspect accessors through the get and set descriptor fields.
- Remember new Object.defineProperty attributes default to false when omitted.
- distinguish preventing extensions, sealing, and freezing by what they change.
- Use Reflect.set when a boolean success result is useful.
- Remember a frozen object may contain mutable nested values.
- Remember frozen accessor setters still run.
- Choose getters for property-like reads and methods for explicit operations with side effects.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [57 - Object identity, shallow copies, deep copies, and structuredClone](057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) | [Open lesson](../lessons/058-getters-setters-property-control-freeze-and-seal.md) | [Open example](../examples/058-getters-setters-property-control-freeze-and-seal.md) | [59 - Prototypes and the prototype chain](../lessons/059-prototypes-and-the-prototype-chain.md) |
