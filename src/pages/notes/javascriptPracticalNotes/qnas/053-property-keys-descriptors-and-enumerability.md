# 53 - Property keys, descriptors, and enumerability: Q&A

This Q&A reviews property keys, data and accessor descriptors, descriptor flags, and the different ways JavaScript lists object properties. Each answer and explanation follows its question.

## Multiple-choice questions

### 1. Which values can be object property keys?

A. Only strings  
B. Strings and symbols  
C. Strings and numbers only  
D. Any object without conversion

**Answer: B. Strings and symbols.**

**Explanation:** Ordinary property access converts many key expressions, including numbers, to property keys. The resulting property key is a string or a symbol.

### 2. Which descriptor field controls whether a data property's value can be changed by assignment?

A. **enumerable**  
B. **configurable**  
C. **writable**  
D. **valueOf**

**Answer: C. writable**

**Explanation:** **writable** controls assignment to a data property's stored value.

### 3. Which descriptor field controls inclusion in operations such as **Object.keys**?

A. **configurable**  
B. **enumerable**  
C. **writable**  
D. **length**

**Answer: B. enumerable**

**Explanation:** Common enumeration methods include own enumerable string keys. A non-enumerable property can still be read directly.

### 4. Which descriptor field controls whether a property can usually be deleted or reconfigured?

A. **configurable**  
B. **writable**  
C. **enumerable**  
D. **prototype**

**Answer: A. configurable**

**Explanation:** A non-configurable property cannot normally be deleted or have its attributes changed.

### 5. What does **Object.getOwnPropertyDescriptor** return for a missing own property?

A. **null**  
B. An empty descriptor  
C. **undefined**  
D. **false**

**Answer: C. undefined**

**Explanation:** The method returns a descriptor only when the object owns the requested property. It does not return inherited property descriptors.

### 6. Which API returns all own string and symbol keys, including non-enumerable keys?

A. **Object.keys**  
B. **Object.values**  
C. **Reflect.ownKeys**  
D. **Object.entries**

**Answer: C. Reflect.ownKeys**

**Explanation:** **Reflect.ownKeys** includes every own key, whether it is a string or symbol and whether it is enumerable or not.

### 7. Which method returns all own string keys, including non-enumerable ones?

A. **Object.getOwnPropertyNames**  
B. **Object.keys**  
C. **Object.getOwnPropertySymbols**  
D. **Object.values**

**Answer: A. Object.getOwnPropertyNames**

**Explanation:** It includes enumerable and non-enumerable own string keys, but it does not include symbols.

### 8. Which API returns an object's own symbol keys?

A. **Object.keys**  
B. **Object.getOwnPropertySymbols**  
C. **Object.values**  
D. **Object.getOwnPropertyNames**

**Answer: B. Object.getOwnPropertySymbols**

**Explanation:** It returns an array containing the object's own symbol keys, including non-enumerable ones.

### 9. What defaults do omitted descriptor flags have when defining a new property with **Object.defineProperty**?

A. All default to true.  
B. **writable**, **enumerable**, and **configurable** default to false.  
C. Only **writable** defaults to true.  
D. The descriptor is ignored.

**Answer: B. writable, enumerable, and configurable default to false.**

**Explanation:** This differs from ordinary object literal and assignment-created data properties, which normally have all three flags set to true.

### 10. Which fields describe a data property?

A. **get** and **set**  
B. **value** and **writable**  
C. **enumerable** and **get** only  
D. **prototype** and **configurable**

**Answer: B. value and writable**

**Explanation:** A data property stores a value and may permit assignment. Its descriptor can also include **enumerable** and **configurable**.

### 11. Which fields describe an accessor property?

A. **get** and **set**  
B. **value** and **writable**  
C. **keys** and **values**  
D. **length** and **prototype**

**Answer: A. get and set**

**Explanation:** A getter runs when the property is read, and a setter runs when it is assigned. Accessor descriptors do not use **value** or **writable**.

### 12. What is invalid in one property descriptor?

A. Having both **enumerable** and **configurable**  
B. Having both **value** and **writable**  
C. Mixing **get** or **set** with **value** or **writable**  
D. Having a getter without a setter

**Answer: C. Mixing get or set with value or writable.**

**Explanation:** A property is described as either a data property or an accessor property. A descriptor cannot combine their defining fields.

### 13. Which method lists own enumerable string keys?

A. **Object.keys**  
B. **Object.getOwnPropertyNames**  
C. **Reflect.ownKeys**  
D. **Object.getOwnPropertySymbols**

**Answer: A. Object.keys**

**Explanation:** **Object.keys** omits inherited, non-enumerable, and symbol keys.

### 14. Which operation can include inherited enumerable string keys?

A. **Object.keys**  
B. **Object.entries**  
C. **for...in**  
D. **Reflect.ownKeys**

**Answer: C. for...in**

**Explanation:** **for...in** walks enumerable string keys on the object and its prototype chain.

## True or false

### 15. A non-enumerable property cannot be read with bracket notation.

**Answer: False.**

**Explanation:** Enumerability affects listing and copying operations, not ordinary property access.

### 16. **Object.keys** returns non-enumerable own string keys.

**Answer: False.**

**Explanation:** Use **Object.getOwnPropertyNames** for all own string keys, including non-enumerable keys.

### 17. **Reflect.ownKeys** includes own symbol keys.

**Answer: True.**

**Explanation:** It returns all own string and symbol keys regardless of enumerability.

### 18. **Object.getOwnPropertyDescriptor** inspects an inherited property on the prototype.

**Answer: False.**

**Explanation:** It returns a descriptor only for an own property of the object passed to it. Inspect the prototype itself to get its descriptor.

### 19. Object literal data properties are normally writable, enumerable, and configurable.

**Answer: True.**

**Explanation:** Those are the usual defaults for ordinary properties created in an object literal or by assignment.

### 20. New properties created with **Object.defineProperty** have the same default flags as object literal properties.

**Answer: False.**

**Explanation:** Omitted **writable**, **enumerable**, and **configurable** flags default to false for a newly defined property.

### 21. A getter is called when its property is read.

**Answer: True.**

**Explanation:** Accessing the property invokes the getter and returns the value it computes.

### 22. A setter is called when its property is assigned.

**Answer: True.**

**Explanation:** Assignment invokes the setter with the assigned value.

### 23. A property can be both a data property and an accessor property.

**Answer: False.**

**Explanation:** A descriptor cannot combine the defining fields of both types. Use either **value/writable** or **get/set**.

### 24. A non-writable property is always non-configurable.

**Answer: False.**

**Explanation:** **writable** and **configurable** are separate attributes. A property can be non-writable but configurable, which means its descriptor can still be changed or it can be deleted.

### 25. A non-enumerable property is automatically non-writable.

**Answer: False.**

**Explanation:** **enumerable** and **writable** control different behaviors. A property can be non-enumerable and still writable.

### 26. Object spread copies inherited and non-enumerable properties.

**Answer: False.**

**Explanation:** Object spread copies own enumerable properties. It can also copy own enumerable symbol properties.

### 27. **for...in** includes symbol keys.

**Answer: False.**

**Explanation:** **for...in** enumerates string keys. Use **Object.getOwnPropertySymbols** or **Reflect.ownKeys** to inspect symbols.

### 28. In normal own-key ordering, array-index keys appear before other string keys.

**Answer: True.**

**Explanation:** Ordinary own-key enumeration places array-index string keys in ascending numeric order, then other string keys in creation order, then symbols in creation order.

## Predict the result

### 29. What does this print?

~~~js
const user = {
    name: "Mina"
};

console.log(Object.getOwnPropertyDescriptor(user, "name"));
~~~

**Answer:**

~~~text
{ value: 'Mina', writable: true, enumerable: true, configurable: true }
~~~

**Explanation:** An ordinary data property created in an object literal has the three flags set to true.

### 30. What does this print?

~~~js
const settings = {};

Object.defineProperty(settings, "secret", {
    value: "hidden"
});

console.log(settings.secret);
console.log(Object.keys(settings));
console.log(Object.getOwnPropertyDescriptor(settings, "secret"));
~~~

**Answer:**

~~~text
hidden
[]
{ value: 'hidden', writable: false, enumerable: false, configurable: false }
~~~

**Explanation:** Omitted flags default to false for a new property created with **Object.defineProperty**. The property can be read, but **Object.keys** omits it.

### 31. What does this print?

~~~js
const settings = {};

Object.defineProperty(settings, "theme", {
    value: "dark",
    writable: true,
    enumerable: true,
    configurable: true
});

console.log(Object.keys(settings));
~~~

**Answer:**

~~~text
[ 'theme' ]
~~~

**Explanation:** The property is enumerable, so **Object.keys** includes it.

### 32. What does this print?

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

**Answer:**

~~~text
false
17
~~~

**Explanation:** **Reflect.set** reports that the write failed. The non-writable value stays 17.

### 33. What does this print?

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

**Answer:**

~~~text
false
17
~~~

**Explanation:** A non-configurable property cannot be deleted. **Reflect.deleteProperty** returns false when deletion fails.

### 34. What does this print?

~~~js
const user = {
    name: "Asha",
    get label() {
        return "User: " + this.name;
    }
};

console.log(user.label);
~~~

**Answer:**

~~~text
User: Asha
~~~

**Explanation:** Reading **label** invokes its getter. It is accessed like a property, without parentheses.

### 35. What does this print?

~~~js
const account = {
    balance: 10,
    set amount(value) {
        this.balance = value;
    }
};

account.amount = 25;

console.log(account.balance);
~~~

**Answer:**

~~~text
25
~~~

**Explanation:** Assigning **amount** invokes the setter, which stores the assigned value in **balance**.

### 36. What does this print?

~~~js
const user = {
    name: "Mina"
};

Object.defineProperty(user, "internalId", {
    value: 42,
    enumerable: false
});

console.log(user.internalId);
console.log(Object.hasOwn(user, "internalId"));
console.log(Object.keys(user));
console.log(Object.getOwnPropertyNames(user));
~~~

**Answer:**

~~~text
42
true
[ 'name' ]
[ 'name', 'internalId' ]
~~~

**Explanation:** The property exists and is readable. **Object.keys** omits it because it is non-enumerable, while **Object.getOwnPropertyNames** includes it.

### 37. What does this print?

~~~js
const id = Symbol("id");

const record = {
    name: "Asha",
    [id]: 42
};

console.log(Object.keys(record));
console.log(Object.getOwnPropertySymbols(record).length);
console.log(Reflect.ownKeys(record).length);
~~~

**Answer:**

~~~text
[ 'name' ]
1
2
~~~

**Explanation:** **Object.keys** excludes symbol keys. **Object.getOwnPropertySymbols** returns the symbol key, and **Reflect.ownKeys** includes both own keys.

### 38. What does this print?

~~~js
const record = {
    z: "z",
    10: "ten",
    2: "two",
    a: "a"
};

console.log(Reflect.ownKeys(record));
~~~

**Answer:**

~~~text
[ '2', '10', 'z', 'a' ]
~~~

**Explanation:** Array-index string keys come first in numeric order. Other string keys follow in creation order.

### 39. What does this print?

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

**Answer:**

~~~text
[ 'name' ]
name
role
~~~

**Explanation:** **Object.keys** lists only own enumerable keys. **for...in** also visits inherited enumerable string keys.

### 40. What does this print?

~~~js
const source = {
    name: "Mina"
};

Object.defineProperty(source, "hidden", {
    value: true,
    enumerable: false
});

const copy = { ...source };

console.log(Object.keys(copy));
console.log(Object.hasOwn(copy, "hidden"));
~~~

**Answer:**

~~~text
[ 'name' ]
false
~~~

**Explanation:** Object spread copies own enumerable properties and skips the non-enumerable **hidden** property.

### 41. What does this print?

~~~js
const first = Symbol("first");
const second = Symbol("second");

const record = {
    [first]: 1,
    name: "Mina",
    [second]: 2
};

console.log(Reflect.ownKeys(record).length);
console.log(Object.getOwnPropertySymbols(record).length);
~~~

**Answer:**

~~~text
3
2
~~~

**Explanation:** The object has one own string key and two own symbol keys. **Reflect.ownKeys** returns all three.

### 42. What does this print?

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
console.log(descriptor.enumerable);
~~~

**Answer:**

~~~text
function
undefined
true
~~~

**Explanation:** The getter is a function, there is no setter, and an object literal accessor is enumerable by default.

## Short-answer questions

### 43. What does **writable** control?

**Answer:** Whether assignment can change the stored value of a data property.

**Explanation:** It does not control whether the property is listed or whether it can be deleted. Those are separate attributes.

### 44. What does **enumerable** control?

**Answer:** Whether common property enumeration operations include the property.

**Explanation:** It does not prevent direct reads. A non-enumerable own property can still be accessed by its key.

### 45. What does **configurable** control?

**Answer:** Whether a property can generally be deleted or have its attributes changed.

**Explanation:** Non-configurable properties have restrictions on changing their descriptors and cannot normally be deleted.

### 46. How do data and accessor descriptors differ?

**Answer:** A data descriptor uses **value** and **writable**. An accessor descriptor uses **get** and **set**.

**Explanation:** Both kinds can also have **enumerable** and **configurable** attributes, but they cannot be combined into one descriptor.

### 47. Why might **Object.getOwnPropertyDescriptor** return **undefined**?

**Answer:** The requested key is not an own property of that object.

**Explanation:** Inherited properties are not returned by this method. Inspect the prototype if you need an inherited descriptor.

### 48. Which API should be used to inspect every own key?

**Answer:** **Reflect.ownKeys**.

**Explanation:** It includes own string and symbol keys, whether enumerable or non-enumerable.

### 49. What does **Object.getOwnPropertyNames** omit?

**Answer:** Symbol keys.

**Explanation:** It returns all own string keys, including non-enumerable keys. Use **Object.getOwnPropertySymbols** for symbols or **Reflect.ownKeys** for both kinds.

### 50. Why does object spread omit a non-enumerable property?

**Answer:** Spread copies only own enumerable properties.

**Explanation:** A property can exist and be readable but still be omitted from operations that select enumerable properties.

### 51. Can an enumerable property be non-writable?

**Answer:** Yes.

**Explanation:** The attributes are independent. A data property may be enumerable for listing while its value cannot be changed by assignment.

### 52. Can a configurable property be non-enumerable?

**Answer:** Yes.

**Explanation:** **configurable** controls changing or deleting the descriptor. **enumerable** controls whether the property appears in common enumeration operations.

## Practical and coding questions

### 53. Define a visible read-only property.

**Answer:**

~~~js
const account = {};

Object.defineProperty(account, "id", {
    value: 17,
    writable: false,
    enumerable: true,
    configurable: false
});

console.log(account.id);
console.log(Object.keys(account));
console.log(Reflect.set(account, "id", 20));
~~~

Output:

~~~text
17
[ 'id' ]
false
~~~

**Explanation:** The property can be read and appears in **Object.keys**, but it cannot be reassigned or deleted.

### 54. Define a non-enumerable property that remains writable.

**Answer:**

~~~js
const record = {};

Object.defineProperty(record, "internalCount", {
    value: 3,
    writable: true,
    enumerable: false,
    configurable: true
});

record.internalCount = 4;

console.log(record.internalCount);
console.log(Object.keys(record));
~~~

Output:

~~~text
4
[]
~~~

**Explanation:** The value is writable, but the property is hidden from enumeration because **enumerable** is false.

### 55. Create a getter that computes a full name.

**Answer:**

~~~js
const person = {
    firstName: "Mina",
    lastName: "Rao",
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(person.fullName);
~~~

Output:

~~~text
Mina Rao
~~~

**Explanation:** Reading the property invokes the getter, which computes a value from the other fields.

### 56. Create a setter that updates a stored value.

**Answer:**

~~~js
const temperature = {
    celsius: 20,
    set fahrenheit(value) {
        this.celsius = (value - 32) * 5 / 9;
    }
};

temperature.fahrenheit = 68;

console.log(temperature.celsius);
~~~

Output:

~~~text
20
~~~

**Explanation:** Assigning **fahrenheit** invokes its setter. The setter converts the input and updates **celsius**.

### 57. Inspect a symbol key together with string keys.

**Answer:**

~~~js
const token = Symbol("token");
const record = { name: "Asha" };

Object.defineProperty(record, token, {
    value: "secret",
    enumerable: false
});

console.log(Object.keys(record));
console.log(Object.getOwnPropertySymbols(record).length);
console.log(Reflect.ownKeys(record).length);
~~~

Output:

~~~text
[ 'name' ]
1
2
~~~

**Explanation:** **Object.keys** omits symbols. **Object.getOwnPropertySymbols** includes the symbol, and **Reflect.ownKeys** returns both own keys.

## Review checklist

- Identify whether a property uses a data descriptor or an accessor descriptor.
- Treat **writable**, **enumerable**, and **configurable** as separate controls.
- Remember that new properties defined with **Object.defineProperty** default omitted flags to false.
- Use **Object.keys** for own enumerable string keys.
- Use **Object.getOwnPropertyNames** for all own string keys.
- Use **Object.getOwnPropertySymbols** for own symbol keys.
- Use **Reflect.ownKeys** for all own string and symbol keys.
- Use getters for computed reads and setters for controlled assignments.
- Remember that object spread copies own enumerable properties.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [52 - Objects: properties and methods](052-objects-properties-and-methods.md) | [Open lesson](../lessons/053-property-keys-descriptors-and-enumerability.md) | [Open example](../examples/053-property-keys-descriptors-and-enumerability.md) | [54 - Computed properties, shorthand, and method definitions](../lessons/054-computed-properties-shorthand-and-method-definitions.md) |
