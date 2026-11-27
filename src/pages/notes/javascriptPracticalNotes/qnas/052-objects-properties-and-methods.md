# 52 - Objects: properties and methods: Q&A

This Q&A reviews object literals, property access, own and inherited properties, enumeration, and methods. Answers and explanations appear immediately after each question.

## Multiple-choice questions

### 1. What does an object property contain?

A. Only a string  
B. A key and a JavaScript value  
C. Only a number  
D. An array index

**Answer: B. A key and a JavaScript value.**

**Explanation:** An object property associates a property key with a value. The value can be a primitive, object, array, or function.

### 2. Which expression accesses the property whose key is stored in the variable **field**?

A. **object.field**  
B. **object[field]**  
C. **object->field**  
D. **object.get(field)**

**Answer: B. object[field]**

**Explanation:** Bracket notation evaluates the expression inside the brackets. Dot notation looks up the literal property named **field**.

### 3. Which notation can access a property named **postal-code**?

A. **address.postal-code**  
B. **address["postal-code"]**  
C. **address.postal code**  
D. **address(postal-code)**

**Answer: B. address["postal-code"]**

**Explanation:** A property name with a hyphen is not a valid dot-notation identifier, so use brackets and a string key.

### 4. What does reading a missing property normally return?

A. **null**  
B. **false**  
C. **undefined**  
D. An empty string

**Answer: C. undefined**

**Explanation:** A missing property read normally produces **undefined**. Use a property-existence check if missing and explicit **undefined** must be distinguished.

### 5. Which expression checks that an object itself owns a property?

A. **key in object**  
B. **Object.hasOwn(object, key)**  
C. **Object.keys(object).length**  
D. **object.length**

**Answer: B. Object.hasOwn(object, key)**

**Explanation:** **Object.hasOwn** checks only own properties, including when a property value is **undefined**.

### 6. Which operator checks both own and inherited properties?

A. **in**  
B. **typeof**  
C. **delete**  
D. **Object.values**

**Answer: A. in**

**Explanation:** The **in** operator checks the object and its prototype chain.

### 7. Which method returns an array of an object's own enumerable string keys?

A. **Object.keys**  
B. **Object.hasOwn**  
C. **Object.create**  
D. **Object.assign**

**Answer: A. Object.keys**

**Explanation:** **Object.keys** does not include inherited keys, symbols, or non-enumerable properties.

### 8. What does a function call like **user.greet()** use as **this** for an ordinary method?

A. The global object in every mode  
B. The object before the dot, **user**  
C. The method's first argument  
D. The function's source file

**Answer: B. The object before the dot, user.**

**Explanation:** In a property call, the object used to access the method is its receiver and becomes **this** for an ordinary method function.

### 9. Which method lists both property keys and values as pairs?

A. **Object.values**  
B. **Object.entries**  
C. **Object.hasOwn**  
D. **Object.prototype**

**Answer: B. Object.entries**

**Explanation:** Each result item from **Object.entries** is a two-item array containing a key and its value.

### 10. What does **Object.keys** include from an ordinary object?

A. Own enumerable string-keyed properties  
B. Every property on the prototype chain  
C. Only properties whose values are strings  
D. All symbol and non-enumerable properties

**Answer: A. Own enumerable string-keyed properties.**

**Explanation:** **Object.keys** is intentionally limited to the object's own enumerable string keys.

### 11. What does object property shorthand do?

A. Makes a property non-enumerable  
B. Uses a variable name as both the property key and value  
C. Creates a prototype property  
D. Makes the property read-only

**Answer: B. Uses a variable name as both the property key and value.**

**Explanation:** If a variable is named **name**, writing **{ name }** is shorthand for **{ name: name }**.

### 12. What does a computed property name evaluate?

A. The property value after object creation  
B. An expression to produce a property key while creating the object  
C. A method body  
D. The object's prototype

**Answer: B. An expression to produce a property key while creating the object.**

**Explanation:** Brackets in an object literal, as in **{ [key]: value }**, evaluate **key** when the object is created.

### 13. What happens when a property is assigned to a missing key?

A. The assignment is ignored.  
B. A property is created on the object.  
C. The object becomes an array.  
D. The key is added to the prototype.

**Answer: B. A property is created on the object.**

**Explanation:** Ordinary assignment creates an own property if one is not already present, subject to property rules.

### 14. Why can an object read a property that is not its own?

A. Property reads can look up the prototype chain.  
B. Every missing property becomes null.  
C. **Object.keys** fills it in.  
D. The property is copied automatically.

**Answer: A. Property reads can look up the prototype chain.**

**Explanation:** An object's prototype can provide inherited properties. **Object.hasOwn** distinguishes those from direct properties.

## True or false

### 15. **object.field** and **object[field]** always mean the same thing.

**Answer: False.**

**Explanation:** Dot notation reads the literal key **"field"**. Bracket notation evaluates the variable **field** and uses its value as the key.

### 16. A missing property and an own property containing **undefined** both read as **undefined**.

**Answer: True.**

**Explanation:** A read alone cannot distinguish them. Use **Object.hasOwn** when presence matters.

### 17. **Object.hasOwn** returns true for a property inherited from the prototype.

**Answer: False.**

**Explanation:** It checks only own properties. Use **in** if inherited properties should count.

### 18. **in** can return true even when **Object.hasOwn** returns false.

**Answer: True.**

**Explanation:** That happens when the property exists on the object's prototype chain but not directly on the object.

### 19. **Object.keys** includes inherited enumerable properties.

**Answer: False.**

**Explanation:** It returns only the object's own enumerable string-keyed property names.

### 20. A **for...in** loop can visit inherited enumerable properties.

**Answer: True.**

**Explanation:** **for...in** walks enumerable string keys on the object and its prototype chain. Check with **Object.hasOwn** to restrict processing to own keys.

### 21. A method is a function stored in an object property.

**Answer: True.**

**Explanation:** Calling a function through the object property makes it a method call.

### 22. An extracted method permanently remembers its original object as **this**.

**Answer: False.**

**Explanation:** For ordinary functions, **this** depends on how the function is called. Use **call** or another explicit binding when a receiver is needed.

### 23. An arrow function gets **this** from the object used to call it.

**Answer: False.**

**Explanation:** Arrow functions do not have their own **this**. They capture it lexically from the surrounding scope.

### 24. Assigning an object to another variable makes a new independent object.

**Answer: False.**

**Explanation:** Assignment copies the object reference. Both variables refer to the same object.

### 25. A numeric property key in an object literal is normally accessed as a string key.

**Answer: True.**

**Explanation:** Object property keys are strings or symbols. Numeric-looking keys such as 200 are represented as the string **"200"**.

### 26. **Object.values** returns own enumerable string-keyed property values.

**Answer: True.**

**Explanation:** Its values correspond to the properties that **Object.keys** would list.

## Predict the result

### 27. What does this print?

~~~js
const user = {
    name: "Dev",
    level: 4
};

console.log(user.name);
console.log(user["level"]);
~~~

**Answer:**

~~~text
Dev
4
~~~

**Explanation:** Dot and bracket notation can both access known keys. Bracket notation is required for dynamic or non-identifier keys.

### 28. What does this print?

~~~js
const user = {
    name: "Dev",
    field: "stored value"
};

const field = "name";

console.log(user.field);
console.log(user[field]);
~~~

**Answer:**

~~~text
stored value
Dev
~~~

**Explanation:** **user.field** uses the literal key **field**. **user[field]** evaluates the variable, whose value is **"name"**.

### 29. What does this print?

~~~js
const record = {
    title: undefined
};

console.log(record.author);
console.log(Object.hasOwn(record, "author"));
console.log(Object.hasOwn(record, "title"));
~~~

**Answer:**

~~~text
undefined
false
true
~~~

**Explanation:** The missing property and the own **title** property both read as **undefined**, but only **title** exists on the object.

### 30. What does this print?

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

**Answer:**

~~~text
true
true
false
~~~

**Explanation:** **fontSize** is own. **theme** is inherited from **defaults**, so **in** finds it but **Object.hasOwn** does not.

### 31. What does this print?

~~~js
const defaults = {
    role: "viewer"
};

const user = Object.create(defaults);
user.name = "Mina";

console.log(user.role);
console.log(Object.keys(user));
~~~

**Answer:**

~~~text
viewer
[ 'name' ]
~~~

**Explanation:** Reading **role** finds the inherited property. **Object.keys** lists only the own enumerable property **name**.

### 32. What does this print?

~~~js
const user = {
    name: "Mina",
    active: true
};

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));
~~~

**Answer:**

~~~text
[ 'name', 'active' ]
[ 'Mina', true ]
[ [ 'name', 'Mina' ], [ 'active', true ] ]
~~~

**Explanation:** These methods expose the object's own enumerable string-keyed properties as keys, values, or pairs.

### 33. What does this print?

~~~js
const field = "status";

const task = {
    id: 7,
    [field]: "open"
};

console.log(task.status);
~~~

**Answer:**

~~~text
open
~~~

**Explanation:** The computed key evaluates the variable **field** and creates a property named **status**.

### 34. What does this print?

~~~js
const response = {
    200: "Success",
    404: "Not found"
};

console.log(response[200]);
console.log(Object.keys(response));
~~~

**Answer:**

~~~text
Success
[ '200', '404' ]
~~~

**Explanation:** Numeric-looking keys become string property keys. The expressions **response[200]** and **response["200"]** access the same property.

### 35. What does this print?

~~~js
const user = {
    name: "Asha",
    greet() {
        return "Hello, " + this.name;
    }
};

console.log(user.greet());
~~~

**Answer:**

~~~text
Hello, Asha
~~~

**Explanation:** The method is called through **user**, so **this** refers to **user**.

### 36. What does this print?

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

**Answer:**

~~~text
Mina
~~~

**Explanation:** Extracting the method removes the **user** receiver from the call. **call(user)** supplies it explicitly.

### 37. What does this print?

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

**Answer:**

~~~text
Asha
editor
~~~

**Explanation:** Property shorthand uses each variable name as the key and its current value as the value.

### 38. What does this print?

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

**Answer:**

~~~text
name Mina
~~~

**Explanation:** **for...in** can see inherited **role**, but **Object.hasOwn** filters it out.

### 39. What does this print?

~~~js
const user = {
    name: "Mina"
};

console.log(typeof user.toString);
console.log("toString" in user);
console.log(Object.hasOwn(user, "toString"));
~~~

**Answer:**

~~~text
function
true
false
~~~

**Explanation:** A normal object inherits **toString**. It is readable and found by **in**, but it is not an own property.

### 40. What does this print?

~~~js
const original = {
    status: "draft"
};

const alias = original;
alias.status = "published";

console.log(original.status);
console.log(original === alias);
~~~

**Answer:**

~~~text
published
true
~~~

**Explanation:** Both variables refer to the same object. Assignment did not create a copy.

## Short-answer questions

### 41. When should you use bracket notation?

**Answer:** Use it for a dynamic key, or for a key that is not a valid dot-notation identifier.

**Explanation:** Examples include **object[keyVariable]** and **object["postal-code"]**.

### 42. How can you tell if a key is missing rather than explicitly set to **undefined**?

**Answer:** Check with **Object.hasOwn(object, key)**.

**Explanation:** Reading either case returns **undefined**, but the own-property check distinguishes them.

### 43. How do **in** and **Object.hasOwn** differ?

**Answer:** **in** checks own and inherited properties. **Object.hasOwn** checks only own properties.

**Explanation:** Use the operator that matches whether prototype-provided properties should count.

### 44. Which properties does **Object.entries** return?

**Answer:** Own enumerable string-keyed properties as **[key, value]** pairs.

**Explanation:** It omits inherited properties, non-enumerable properties, and symbol keys.

### 45. Why should **for...in** often be paired with **Object.hasOwn**?

**Answer:** Because **for...in** may include inherited enumerable keys.

**Explanation:** The own-property check restricts work to the properties directly stored on the object.

### 46. What is the difference between a property and a method?

**Answer:** A method is a function used as the value of an object property.

**Explanation:** The object property can hold any value. When the value is called through the object, it acts as a method.

### 47. What determines **this** in an ordinary method call?

**Answer:** The receiver used in the call expression.

**Explanation:** In **user.greet()**, the receiver is **user**. If the function is extracted, the call no longer carries that receiver.

### 48. Why can an arrow function be unsuitable for an object method that uses **this**?

**Answer:** An arrow function does not create its own **this** from the object call.

**Explanation:** It captures **this** from the surrounding scope. Use a regular method function when **this** should refer to the receiving object.

### 49. What does property shorthand mean?

**Answer:** It means the property's key and value variable have the same name.

**Explanation:** **{ name }** is shorthand for **{ name: name }**.

### 50. Does assignment make an object copy?

**Answer:** No. Assignment copies the reference.

**Explanation:** Both variables can refer to and mutate the same object. Copying object data is covered in a later chapter.

## Practical and coding questions

### 51. Create a product record and read its values.

**Answer:**

~~~js
const product = {
    name: "Notebook",
    price: 8,
    available: true
};

console.log(product.name);
console.log(product.price);
console.log(product.available);
~~~

Output:

~~~text
Notebook
8
true
~~~

**Explanation:** An object literal groups related fields under descriptive property names.

### 52. Use a dynamic key to update a property.

**Answer:**

~~~js
const settings = {
    theme: "light"
};

const key = "theme";
settings[key] = "dark";

console.log(settings.theme);
~~~

Output:

~~~text
dark
~~~

**Explanation:** Bracket notation evaluates **key**, so this updates the **theme** property.

### 53. Define a method that uses two object properties.

**Answer:**

~~~js
const cart = {
    itemCount: 3,
    owner: "Asha",
    describe() {
        return this.owner + " has " + this.itemCount + " items";
    }
};

console.log(cart.describe());
~~~

Output:

~~~text
Asha has 3 items
~~~

**Explanation:** The method reads properties from the receiver through **this**.

### 54. Enumerate only own properties when a prototype has a default.

**Answer:**

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

**Explanation:** The inherited **role** key is filtered out, leaving only the own **name** property.

### 55. Build a list of labels from object entries.

**Answer:**

~~~js
const settings = {
    theme: "dark",
    language: "en"
};

const labels = Object.entries(settings).map(function (entry) {
    return entry[0] + ": " + entry[1];
});

console.log(labels);
~~~

Output:

~~~text
[ 'theme: dark', 'language: en' ]
~~~

**Explanation:** **Object.entries** gives key-value pairs. **map** transforms each pair into a display string.

## Review checklist

- Use dot notation for known identifier-like names.
- Use brackets for dynamic or unusual property names.
- Check own-property presence with **Object.hasOwn**.
- Remember **in** includes inherited properties.
- Use **Object.keys**, **Object.values**, and **Object.entries** for own enumerable string keys.
- Filter **for...in** with **Object.hasOwn** when inherited keys should be ignored.
- Call methods through their object when they depend on **this**.
- Remember assignment copies an object reference.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [51 - Sparse arrays, array-like objects, and array protocols](051-sparse-arrays-array-like-objects-and-array-protocols.md) | [Open lesson](../lessons/052-objects-properties-and-methods.md) | [Open example](../examples/052-objects-properties-and-methods.md) | [53 - Property keys, descriptors, and enumerability](../lessons/053-property-keys-descriptors-and-enumerability.md) |
