# 59 - Prototypes and the prototype chain: Q&A

This question set reviews how JavaScript finds properties, how own properties differ from inherited ones, and how prototype relationships affect assignment and method calls. Each answer follows its question so you can check your reasoning as you go.

## Multiple-choice questions

### 1. What does a prototype provide to an object?

A. A copy of every property on another object  
B. Another object that JavaScript can search when a property is not found directly  
C. A list of the object's private fields  
D. A replacement for the object's own properties  

**Answer: B.** JavaScript follows the prototype link during property lookup. The inherited property remains on the prototype object; it is not copied onto the child.

### 2. What is the prototype of an ordinary object literal such as { name: "Asha" }?

A. **null**  
B. The **Object** constructor function  
C. **Object.prototype**  
D. **Function.prototype**  

**Answer: C.** Ordinary object literals normally inherit from **Object.prototype**. The prototype of **Object.prototype** is **null**.

### 3. Which method directly inspects an object's prototype link?

A. **Object.keys**  
B. **Object.getPrototypeOf**  
C. **Object.hasOwn**  
D. **Object.freeze**  

**Answer: B.** **Object.getPrototypeOf(object)** returns the object's prototype, or **null** when it has no prototype.

### 4. Which expression checks only whether **settings** itself owns **theme**?

A. **"theme" in settings**  
B. **settings.theme !== undefined**  
C. **Object.hasOwn(settings, "theme")**  
D. **Object.getPrototypeOf(settings).theme**  

**Answer: C.** **Object.hasOwn** checks the object itself. The **in** operator also finds inherited properties, while reading a value cannot reliably tell where the property was defined.

### 5. Which expression searches both an object and its prototype chain?

A. **Object.hasOwn(object, key)**  
B. **key in object**  
C. **Object.keys(object)**  
D. **Object.getOwnPropertyNames(object)**  

**Answer: B.** The **in** operator returns true if the property exists on the object or anywhere on its prototype chain.

### 6. What happens when an own property and an inherited property have the same key?

A. JavaScript reports an error.  
B. Both values are returned as an array.  
C. The own property is found first and shadows the inherited one.  
D. The inherited property replaces the own property.  

**Answer: C.** Lookup starts at the object itself. An own property with the requested key wins over a property with the same key on a prototype.

### 7. What does **Object.create(null)** create?

A. An object whose prototype is **Object.prototype**  
B. An object with no prototype  
C. A frozen object  
D. A function with no **prototype** property  

**Answer: B.** The new object's prototype is **null**, so it does not inherit methods such as **toString** from **Object.prototype**.

### 8. Which statement about **Object.keys(object)** is correct?

A. It lists all inherited properties.  
B. It lists the internal prototype link.  
C. It lists the object's own enumerable string-keyed properties.  
D. It lists every property, including non-enumerable symbols.  

**Answer: C.** **Object.keys** does not walk the prototype chain. It also excludes non-enumerable properties and symbol keys.

### 9. In **child.describe()**, where **describe** is inherited, what is normally used as **this** inside the method?

A. Always the prototype object  
B. The object before the dot, which is **child**  
C. Always **Object.prototype**  
D. **null**  

**Answer: B.** A method call uses its receiver as **this**. In **child.describe()**, the receiver is **child**, even if the function was found on a prototype.

### 10. What is the relationship between an object's prototype link and a function's **.prototype** property?

A. They are always the same property.  
B. Neither can refer to an object.  
C. They are different concepts; **new** uses a constructor's **.prototype** when creating an instance.  
D. The object's link can only point to a function.  

**Answer: C.** **Object.getPrototypeOf(instance)** inspects the instance's internal prototype link. A constructor function's **.prototype** is a separate property used by **new**.

## True or false

### 11. An inherited property is copied onto a child object the first time it is read.

**Answer: False.** Lookup finds the property on a prototype. Reading it does not create a copy on the child.

### 12. If an object has no own property named **toString**, the expression **"toString" in object** can still be true.

**Answer: True.** An ordinary object inherits **toString** from **Object.prototype**, so **in** can find it even when it is not an own property.

### 13. **Object.hasOwn(object, key)** returns true for inherited properties.

**Answer: False.** It checks only the object's own properties.

### 14. Deleting a child's own shadowing property can make an inherited value visible again.

**Answer: True.** Deletion removes the own property. A later read can then continue up the chain and find the inherited property.

### 15. Assigning to an inherited writable data property normally changes the prototype's value.

**Answer: False.** In the ordinary case, assignment creates or updates an own property on the receiver. The prototype's data property remains unchanged.

### 16. A null-prototype object inherits **hasOwnProperty** from **Object.prototype**.

**Answer: False.** It has no prototype and therefore inherits no methods from **Object.prototype**. Use **Object.hasOwn(object, key)**.

### 17. An inherited method is permanently bound to the object on which the method was originally defined.

**Answer: False.** **this** depends on the call. Calling **child.method()** gives the method **child** as its receiver.

### 18. **Object.keys** includes enumerable properties inherited from prototypes.

**Answer: False.** It returns own enumerable string-keyed properties only.

## Short-answer questions

### 19. What is an own property?

**Answer:** An own property is stored directly on the object being checked. For example, **name** is an own property of **user** after creating **const user = { name: "Mina" }**.

### 20. What is an inherited property?

**Answer:** An inherited property is defined on a prototype somewhere above the object in its prototype chain. The object can read it through lookup without owning it directly.

### 21. Explain the property lookup order.

**Answer:** JavaScript checks the object first. If the key is absent, it checks the object's prototype, then that prototype's prototype, and continues until it finds the property or reaches **null**. A missing property read evaluates to **undefined**.

### 22. What is shadowing?

**Answer:** Shadowing occurs when an object has an own property with the same key as a property on its prototype. Lookup finds the own property first, so the inherited value is hidden for that object.

### 23. What is the difference between **Object.hasOwn(object, key)** and **key in object**?

**Answer:** **Object.hasOwn** checks only the object itself. The **in** operator checks both the object and its prototype chain. Use the former for own data checks and the latter when inherited properties should count.

### 24. Why is **Object.hasOwn** often preferable to **object.hasOwnProperty(key)**?

**Answer:** An object might define its own **hasOwnProperty** key, hiding the inherited method. A null-prototype object has no inherited method at all. **Object.hasOwn(object, key)** works in both cases.

### 25. What does **Object.create(prototype)** do?

**Answer:** It creates a new object whose prototype is the supplied object. Passing **null** creates an object with no prototype.

### 26. Why does an inherited method usually see the child object through **this**?

**Answer:** The method is called as a property of the child, such as **child.describe()**. The child is the call receiver, so **this** refers to it. The method's storage location does not permanently determine **this**.

### 27. What is one useful case for a null-prototype object, and one tradeoff?

**Answer:** It can be useful as a plain dictionary when inherited property names should not be part of lookup. It does not inherit convenient methods such as **toString**, so code must account for that; a **Map** may be a better general-purpose collection.

### 28. Why should regular code prefer **Object.getPrototypeOf** over the legacy **__proto__** accessor?

**Answer:** **Object.getPrototypeOf** clearly expresses that the code is inspecting an object's prototype. The **__proto__** name is a legacy accessor inherited by ordinary objects and can be confused with a normal own property.

## Predict the output

### 29. Is **mode** own or inherited?

~~~js
const base = { mode: "quiet" };
const user = Object.create(base);

console.log(user.mode);
console.log(Object.hasOwn(user, "mode"));
console.log("mode" in user);
~~~

**Answer:**

~~~text
quiet
false
true
~~~

**Explanation:** The value is found on **base**. The child does not own **mode**, but **in** searches its prototype chain.

### 30. What does shadowing change?

~~~js
const base = { color: "blue" };
const item = Object.create(base);

item.color = "red";

console.log(item.color);
console.log(base.color);
console.log(Object.hasOwn(item, "color"));
~~~

**Answer:**

~~~text
red
blue
true
~~~

**Explanation:** Assignment creates an own **color** property on **item**. It does not change the property stored on **base**.

### 31. What becomes visible after deleting the shadowing property?

~~~js
const base = { status: "default" };
const item = Object.create(base);

item.status = "custom";
delete item.status;

console.log(item.status);
console.log(Object.hasOwn(item, "status"));
~~~

**Answer:**

~~~text
default
false
~~~

**Explanation:** Deleting the own property allows lookup to find **status** on **base** again.

### 32. What is included in the keys array?

~~~js
const base = { inherited: 1 };
const item = Object.create(base);
item.own = 2;

console.log(Object.keys(item));
~~~

**Answer:**

~~~text
[ 'own' ]
~~~

**Explanation:** **Object.keys** returns own enumerable string keys. It does not list **inherited**.

### 33. Which object is the receiver in each inherited method call?

~~~js
const base = {
  describe() {
    return this.name;
  }
};

const first = Object.create(base);
first.name = "First";

const second = Object.create(base);
second.name = "Second";

console.log(first.describe());
console.log(second.describe());
console.log(first.describe === second.describe);
~~~

**Answer:**

~~~text
First
Second
true
~~~

**Explanation:** Both objects share the same function from **base**. Each property call supplies a different receiver, so **this.name** differs.

### 34. Does **toString** belong directly to **dictionary**?

~~~js
const dictionary = Object.create(null);
dictionary.entry = "value";

console.log("toString" in dictionary);
console.log(Object.hasOwn(dictionary, "entry"));
console.log(Object.getPrototypeOf(dictionary));
~~~

**Answer:**

~~~text
false
true
null
~~~

**Explanation:** The object has no prototype, so it has no inherited **toString**. Its own **entry** property is still detected normally.

### 35. What do the two checks report?

~~~js
const object = {};

console.log("toString" in object);
console.log(Object.hasOwn(object, "toString"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** An ordinary object inherits **toString**, but does not own it.

### 36. What happens when an inherited setter is assigned through a child?

~~~js
const base = {
  set label(value) {
    this.saved = value.trim();
  }
};

const entry = Object.create(base);
entry.label = "  Ready  ";

console.log(entry.saved);
console.log(Object.hasOwn(entry, "label"));
console.log(Object.hasOwn(entry, "saved"));
~~~

**Answer:**

~~~text
Ready
false
true
~~~

**Explanation:** The inherited setter runs with **entry** as its receiver. It creates **saved** on **entry**, but it does not create an own **label** property.

## Coding questions

### 37. Create a child that inherits a **language** value, then prove that it does not own that value.

**Answer:**

~~~js
const defaults = {
  language: "English"
};

const reader = Object.create(defaults);

console.log(reader.language);
console.log(Object.hasOwn(reader, "language"));
~~~

Output:

~~~text
English
false
~~~

**Explanation:** **reader** can read the inherited value, but the property remains on **defaults**.

### 38. Add a child-specific value without modifying the prototype.

**Answer:**

~~~js
const defaults = {
  theme: "light"
};

const settings = Object.create(defaults);
settings.theme = "dark";

console.log(settings.theme);
console.log(defaults.theme);
console.log(Object.hasOwn(settings, "theme"));
~~~

Output:

~~~text
dark
light
true
~~~

**Explanation:** The assignment creates an own property on **settings**, shadowing the inherited property.

### 39. Write a shared method that returns an object's own name and inherited category.

**Answer:**

~~~js
const productPrototype = {
  category: "stationery",
  describe() {
    return this.name + " belongs to " + this.category + ".";
  }
};

const notebook = Object.create(productPrototype);
notebook.name = "Notebook";

console.log(notebook.describe());
~~~

Output:

~~~text
Notebook belongs to stationery.
~~~

**Explanation:** **category** is inherited, while **name** is own. The method uses the child as **this**.

### 40. Create a null-prototype dictionary and safely check a key.

**Answer:**

~~~js
const scores = Object.create(null);
scores["team-name"] = "Falcons";
scores.points = 12;

console.log(Object.hasOwn(scores, "points"));
console.log(Object.hasOwn(scores, "missing"));
console.log(Object.keys(scores));
~~~

Output:

~~~text
true
false
[ 'team-name', 'points' ]
~~~

**Explanation:** **Object.hasOwn** works without an inherited **hasOwnProperty** method. The dictionary's own enumerable keys are listed normally.

### 41. Write a helper that reports whether a property is own or merely available through lookup.

**Answer:**

~~~js
function describeProperty(object, key) {
  if (Object.hasOwn(object, key)) {
    return "own";
  }

  if (key in object) {
    return "inherited";
  }

  return "missing";
}

const base = { active: true };
const item = Object.create(base);
item.name = "Row";

console.log(describeProperty(item, "name"));
console.log(describeProperty(item, "active"));
console.log(describeProperty(item, "unknown"));
~~~

Output:

~~~text
own
inherited
missing
~~~

**Explanation:** The helper checks own properties first, then uses **in** to detect a property anywhere in the chain.

### 42. Write a setter on a prototype that trims a value and saves it on each child.

**Answer:**

~~~js
const inputPrototype = {
  set value(text) {
    this.normalizedValue = text.trim();
  }
};

const firstInput = Object.create(inputPrototype);
const secondInput = Object.create(inputPrototype);

firstInput.value = "  hello  ";
secondInput.value = "  world  ";

console.log(firstInput.normalizedValue);
console.log(secondInput.normalizedValue);
console.log(Object.hasOwn(firstInput, "value"));
~~~

Output:

~~~text
hello
world
false
~~~

**Explanation:** The setter is shared on the prototype. Each assignment invokes it with a different child as **this**, so each child gets its own normalized value.

### 43. Inspect the prototype chain of an ordinary object literal.

**Answer:**

~~~js
const value = {};

const firstPrototype = Object.getPrototypeOf(value);
const secondPrototype = Object.getPrototypeOf(firstPrototype);

console.log(firstPrototype === Object.prototype);
console.log(secondPrototype);
~~~

Output:

~~~text
true
null
~~~

**Explanation:** An ordinary object literal directly inherits from **Object.prototype**, whose own prototype is **null**.

### 44. Correct this own-property check so it works even if the object shadows **hasOwnProperty**.

~~~js
const data = {
  hasOwnProperty: "ordinary data",
  id: 7
};

const containsId = data.hasOwnProperty("id");
~~~

**Answer:**

~~~js
const data = {
  hasOwnProperty: "ordinary data",
  id: 7
};

const containsId = Object.hasOwn(data, "id");
console.log(containsId);
~~~

Output:

~~~text
true
~~~

**Explanation:** The string value stored in **data.hasOwnProperty** hides the inherited method. **Object.hasOwn** does not depend on that property.

## Review checklist

Before moving on, make sure you can explain:

- How lookup moves from an object through its prototype chain.
- How to distinguish own properties from inherited ones.
- Why shadowing does not change the prototype.
- What deleting an own property reveals.
- Why **in** and **Object.hasOwn** answer different questions.
- How an inherited method uses the call receiver as **this**.
- Why null-prototype objects do not have inherited object methods.
- Why a function's **.prototype** is not the same as an object's prototype link.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [58 - Getters, setters, property control, freeze, and seal](../lessons/058-getters-setters-property-control-freeze-and-seal.md) | [Open lesson](../lessons/059-prototypes-and-the-prototype-chain.md) | [Open example](../examples/059-prototypes-and-the-prototype-chain.md) | [60 - Constructor functions, new, and instanceof](../lessons/060-constructor-functions-new-and-instanceof.md) |
