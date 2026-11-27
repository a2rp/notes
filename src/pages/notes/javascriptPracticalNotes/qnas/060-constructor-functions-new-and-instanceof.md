# 60 - Constructor functions, new, and instanceof: Q&A

This question set reviews how constructor functions initialize instances, how **new** uses a constructor's **.prototype**, and what **instanceof** checks. Each answer follows its question and includes an explanation where it helps.

## Multiple-choice questions

### 1. What does **new** do when it calls a constructor function?

A. Copies every method from the function onto a new object  
B. Creates an object, links it to the constructor's prototype, and calls the function with that object as **this**  
C. Converts the function into a class  
D. Calls the function without arguments  

**Answer: B.** The new object becomes the call receiver. Unless the constructor returns another object or function, that new object is the result.

### 2. Where is a shared method usually placed when many instances should use the same function?

A. On each instance as a new function  
B. On the constructor's prototype object  
C. On **Object.prototype**  
D. In a global variable only  

**Answer: B.** Instances can find the method through their prototype chain, so they share one function rather than receiving separate copies.

### 3. What does the default **instanceof** behavior check?

A. Whether an object has a particular set of fields  
B. Whether the object's **constructor** property equals the right-hand function  
C. Whether the constructor's prototype object appears in the value's prototype chain  
D. Whether the constructor function ran at least once  

**Answer: C.** The default behavior checks prototype-chain membership. It does not verify that the constructor actually created or initialized the object.

### 4. What happens if a constructor returns a number while called with **new**?

A. The number becomes the result.  
B. The number is ignored, and the newly initialized object is returned.  
C. JavaScript throws a **TypeError**.  
D. The number is assigned to **this**.  

**Answer: B.** A primitive return value is ignored by a constructor call. An explicitly returned object or function, however, replaces the new instance.

### 5. What happens if a constructor returns another object while called with **new**?

A. The returned object becomes the result of the **new** expression.  
B. The return value is always ignored.  
C. Both objects are returned as an array.  
D. JavaScript changes the returned object's prototype automatically.  

**Answer: A.** An object or function explicitly returned by the constructor replaces the instance that **new** initially created.

### 6. Which kind of function cannot be used with **new**?

A. A regular function declaration  
B. A regular function expression  
C. An arrow function  
D. A named constructor function  

**Answer: C.** Arrow functions do not have constructor behavior and cannot be called with **new**.

### 7. What does **new.target** evaluate to inside a regular function called with **new**?

A. **undefined**  
B. The constructor function used for the call  
C. The newly created object  
D. The function's **.prototype** object  

**Answer: B.** Inside a constructor call, **new.target** identifies the constructor that **new** was applied to. It is **undefined** during an ordinary function call.

### 8. Which expression is generally best for identifying an array that could come from another JavaScript realm?

A. **value instanceof Array**  
B. **value.constructor === Array**  
C. **Array.isArray(value)**  
D. **Object.hasOwn(value, "length")**  

**Answer: C.** **Array.isArray** identifies arrays across realms. **instanceof Array** depends on a particular realm's **Array.prototype**.

### 9. If **Constructor.prototype** is replaced after an instance is created, what can happen?

A. The instance's prototype link changes automatically.  
B. The instance keeps its old prototype link, and **instanceof Constructor** may become false.  
C. The instance is deleted.  
D. JavaScript throws as soon as the property is assigned.  

**Answer: B.** The instance's link is not automatically updated. The default **instanceof** check compares the current **Constructor.prototype** against the instance's chain.

### 10. Which statement about the **constructor** property is correct?

A. It is always an own property on every instance.  
B. It cannot be changed.  
C. It is a convention that can be shadowed, changed, or lost when a prototype object is replaced.  
D. The **instanceof** operator relies on it.  

**Answer: C.** It is commonly inherited from the prototype, but it is an ordinary property and is not proof of an object's origin.

## True or false

### 11. A function's **.prototype** property and the internal prototype link of an instance are distinct concepts.

**Answer: True.** The constructor function has an ordinary property named **prototype**. The instance has an internal prototype link. After **new Constructor()**, that link normally points to the object stored in **Constructor.prototype**.

### 12. A method assigned inside a constructor is automatically shared as one function across all instances.

**Answer: False.** If the constructor creates a function and assigns it to **this**, that function is created for each construction. A method on the prototype is shared.

### 13. A value can pass **instanceof Constructor** even if the constructor never created it.

**Answer: True.** With the default behavior, it is enough for **Constructor.prototype** to appear in the value's prototype chain. **Object.create(Constructor.prototype)** can create such an object.

### 14. The default **instanceof** check proves that an object has all the properties a constructor normally initializes.

**Answer: False.** It checks the prototype chain, not the object's data shape or whether constructor initialization ran.

### 15. An arrow function can be used as a constructor if it is given a **prototype** property.

**Answer: False.** Arrow functions are not constructible. Adding a similarly named property does not give them constructor behavior.

### 16. A primitive returned from a function called with **new** replaces the newly created instance.

**Answer: False.** Primitive return values are ignored. An object or function return value replaces the new instance.

### 17. Replacing **Constructor.prototype** also replaces an existing instance's prototype link.

**Answer: False.** Existing instances keep the link they received at creation. The constructor's current prototype property can change independently.

### 18. If a constructor is called without **new**, JavaScript still creates an instance automatically.

**Answer: False.** A plain function call does not create a new instance. The resulting **this** depends on strictness and call context, which can make accidental calls unsafe.

### 19. A class constructor can be called without **new** like a regular function.

**Answer: False.** Class constructors require **new** and throw if called as ordinary functions.

### 20. An object's **constructor** property may be absent or misleading.

**Answer: True.** It can be shadowed, reassigned, or lost when a prototype object is replaced. It should not be treated as a definitive origin check.

## Short-answer questions

### 21. What is a constructor function?

**Answer:** It is a function intended to initialize objects when called with **new**. The capitalized name is a common convention that signals this intended use.

### 22. What does **new** provide to the constructor?

**Answer:** It creates an object, makes that object the constructor call's **this**, and normally uses that object as the result. It also links the object to the constructor's prototype object.

### 23. Why put shared methods on a constructor's prototype?

**Answer:** All instances can find the same method through lookup. This avoids creating a separate function for every instance and keeps per-instance data separate from shared behavior.

### 24. How are the instance's prototype link and **Constructor.prototype** related after construction?

**Answer:** With a normal constructor whose **prototype** is an object, **Object.getPrototypeOf(instance) === Constructor.prototype** is true immediately after **new Constructor()**.

### 25. What does the default **instanceof** check mean?

**Answer:** It asks whether the constructor's current **.prototype** object is found by walking the value's prototype chain. It does not ask whether the constructor historically created the value.

### 26. What does **new.target** help a constructor do?

**Answer:** It lets a regular function detect whether it was called with **new**. A constructor can throw a clear error when a caller omits **new**.

### 27. What happens to an explicit primitive return from a constructor?

**Answer:** It is ignored by **new**. The instance initialized through **this** is returned instead.

### 28. What happens to an explicit object or function return from a constructor?

**Answer:** That object or function becomes the result of the **new** expression instead of the initially created instance.

### 29. Why is **instanceof Array** not always a reliable array check?

**Answer:** **instanceof** checks for a specific **Array.prototype** in the prototype chain. Arrays from another realm can have a different **Array.prototype**. **Array.isArray** works across realms.

### 30. What can go wrong when replacing a constructor's prototype object?

**Answer:** Existing instances keep their original prototype link, and new instances use the replacement. The replacement object may also lack the conventional own **constructor** property pointing back to the function.

## Predict the output

### 31. What does the instance inherit from the constructor?

~~~js
function Person(name) {
  this.name = name;
}

const person = new Person("Asha");

console.log(person.name);
console.log(Object.getPrototypeOf(person) === Person.prototype);
console.log(Object.hasOwn(person, "constructor"));
console.log(person.constructor === Person);
~~~

**Answer:**

~~~text
Asha
true
false
true
~~~

**Explanation:** **name** is initialized as an own property. The instance's prototype link points to **Person.prototype**, which supplies the inherited **constructor** property.

### 32. Are the methods shared?

~~~js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return "Hi, " + this.name;
};

const first = new User("Asha");
const second = new User("Dev");

console.log(first.greet());
console.log(second.greet());
console.log(first.greet === second.greet);
console.log(Object.hasOwn(first, "greet"));
~~~

**Answer:**

~~~text
Hi, Asha
Hi, Dev
true
false
~~~

**Explanation:** Both objects find the same function on **User.prototype**. Each call supplies its instance as **this**.

### 33. Does the constructor run when using Object.create?

~~~js
function Device() {
  this.initialized = true;
}

const handmade = Object.create(Device.prototype);

console.log(handmade instanceof Device);
console.log(Object.hasOwn(handmade, "initialized"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The object inherits from **Device.prototype**, so the default **instanceof** check passes. The constructor did not run, so **initialized** was never added.

### 34. What happens when a constructor returns an object?

~~~js
function Replacement() {
  this.discarded = true;
  return { kept: true };
}

const value = new Replacement();

console.log(value.kept);
console.log(value.discarded);
~~~

**Answer:**

~~~text
true
undefined
~~~

**Explanation:** The explicit object return replaces the initially created instance. The property assigned to the discarded instance is not present on the replacement.

### 35. What happens when a constructor returns a primitive?

~~~js
function PrimitiveReturn() {
  this.kept = true;
  return 0;
}

const value = new PrimitiveReturn();

console.log(value.kept);
console.log(typeof value);
~~~

**Answer:**

~~~text
true
object
~~~

**Explanation:** The numeric return value is ignored. The initialized object is used as the result.

### 36. What changes when the constructor's prototype is replaced?

~~~js
function Tool() {}

const oldTool = new Tool();
const originalPrototype = Tool.prototype;

Tool.prototype = {};

const newTool = new Tool();

console.log(Object.getPrototypeOf(oldTool) === originalPrototype);
console.log(oldTool instanceof Tool);
console.log(newTool instanceof Tool);
~~~

**Answer:**

~~~text
true
false
true
~~~

**Explanation:** **oldTool** retains its original link. The default **instanceof** check compares against the new current **Tool.prototype**, while **newTool** links to that replacement.

### 37. What happens when an arrow function is used with new?

~~~js
const createValue = () => ({ ready: true });

try {
  new createValue();
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** Arrow functions are not constructors. Calling one with **new** throws a **TypeError**.

### 38. What does a new.target guard report for a constructor call?

~~~js
function Record(id) {
  if (!new.target) {
    throw new TypeError("Use new.");
  }

  this.id = id;
}

const record = new Record("R-12");

console.log(record.id);
~~~

**Answer:**

~~~text
R-12
~~~

**Explanation:** The function was called with **new**, so **new.target** is truthy and initialization continues.

### 39. Does instanceof require an own constructor property?

~~~js
function Animal() {}

const animal = Object.create(Animal.prototype);

console.log(animal instanceof Animal);
console.log(Object.hasOwn(animal, "constructor"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The default check uses the prototype chain. It does not require an own **constructor** property or a call to **Animal**.

### 40. Does instanceof test an object's fields?

~~~js
function HasId() {}

const value = Object.create(HasId.prototype);
value.name = "Item";

console.log(value instanceof HasId);
console.log(Object.hasOwn(value, "id"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The prototype chain contains **HasId.prototype**, so **instanceof** is true. No **id** field was created. Validate required fields separately when needed.

## Coding questions

### 41. Write a constructor that initializes two own properties.

**Answer:**

~~~js
function Book(title, author) {
  this.title = title;
  this.author = author;
}

const book = new Book("River Town", "Mina Shah");

console.log(book.title);
console.log(book.author);
console.log(Object.hasOwn(book, "title"));
~~~

Output:

~~~text
River Town
Mina Shah
true
~~~

**Explanation:** **new** supplies a fresh instance as **this**, and the assignments create own properties on it.

### 42. Add one shared method to a constructor's prototype.

**Answer:**

~~~js
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype.describe = function () {
  return this.title + " by " + this.author;
};

const firstBook = new Book("River Town", "Mina Shah");
const secondBook = new Book("Bright Sky", "Dev Rao");

console.log(firstBook.describe());
console.log(secondBook.describe());
console.log(firstBook.describe === secondBook.describe);
~~~

Output:

~~~text
River Town by Mina Shah
Bright Sky by Dev Rao
true
~~~

**Explanation:** The function is stored once on **Book.prototype**. Each call uses the book instance as **this**.

### 43. Make a constructor reject calls that omit new.

**Answer:**

~~~js
function Session(user) {
  if (!new.target) {
    throw new TypeError("Session must be called with new.");
  }

  this.user = user;
}

try {
  Session("Mina");
} catch (error) {
  console.log(error instanceof TypeError);
}

const session = new Session("Mina");
console.log(session.user);
~~~

Output:

~~~text
true
Mina
~~~

**Explanation:** In the ordinary call, **new.target** is **undefined**, so the constructor throws. The call with **new** proceeds and initializes the instance.

### 44. Demonstrate that a primitive return value is ignored.

**Answer:**

~~~js
function Counter(start) {
  this.value = start;
  return 100;
}

const counter = new Counter(3);

console.log(counter.value);
console.log(typeof counter);
~~~

Output:

~~~text
3
object
~~~

**Explanation:** The explicit number is a primitive, so **new** ignores it and returns the initialized instance.

### 45. Demonstrate that an explicit object return replaces the instance.

**Answer:**

~~~js
function ExternalResult() {
  this.onInitialInstance = true;
  return { replacement: true };
}

const result = new ExternalResult();

console.log(result.replacement);
console.log(result.onInitialInstance);
~~~

Output:

~~~text
true
undefined
~~~

**Explanation:** The returned object replaces the instance that was initialized through **this**. This behavior is valid but uncommon in ordinary constructors.

### 46. Create an object that passes instanceof without calling the constructor.

**Answer:**

~~~js
function Message() {
  this.text = "initialized";
}

const manualMessage = Object.create(Message.prototype);

console.log(manualMessage instanceof Message);
console.log(Object.hasOwn(manualMessage, "text"));
~~~

Output:

~~~text
true
false
~~~

**Explanation:** **Object.create** establishes the expected prototype link but does not run **Message**. The instance check therefore passes even though initialization did not happen.

### 47. Set up prototype inheritance between two constructor functions.

**Answer:**

~~~js
function Person(name) {
  this.name = name;
}

Person.prototype.introduce = function () {
  return "I am " + this.name;
};

function Employee(name, role) {
  Person.call(this, name);
  this.role = role;
}

Employee.prototype = Object.create(Person.prototype);

Object.defineProperty(Employee.prototype, "constructor", {
  value: Employee,
  writable: true,
  configurable: true
});

Employee.prototype.describeRole = function () {
  return this.name + " works as " + this.role;
};

const employee = new Employee("Asha", "developer");

console.log(employee.introduce());
console.log(employee.describeRole());
console.log(employee instanceof Employee);
console.log(employee instanceof Person);
~~~

Output:

~~~text
I am Asha
Asha works as developer
true
true
~~~

**Explanation:** The prototype chain gives an employee access to **Person.prototype** methods. **Person.call** initializes the employee's own name property, and the constructor property is restored after replacing **Employee.prototype**.

### 48. Restore the constructor property after replacing a prototype.

**Answer:**

~~~js
function Lamp() {}

Lamp.prototype = {
  turnOn() {
    return "on";
  }
};

console.log(Lamp.prototype.constructor === Lamp);

Object.defineProperty(Lamp.prototype, "constructor", {
  value: Lamp,
  writable: true,
  configurable: true
});

console.log(Lamp.prototype.constructor === Lamp);
~~~

Output:

~~~text
false
true
~~~

**Explanation:** The object literal assigned to **Lamp.prototype** does not create an own **constructor** property pointing to **Lamp**. Define it explicitly if that convention matters to the code.

### 49. Use Array.isArray for an array check.

**Answer:**

~~~js
const values = [2, 4, 6];

console.log(values instanceof Array);
console.log(Array.isArray(values));
~~~

Output:

~~~text
true
true
~~~

**Explanation:** Both checks work for this same-realm array. Prefer **Array.isArray** when arrays may come from another realm.

### 50. Validate instance data instead of trusting instanceof alone.

**Answer:**

~~~js
function isValidUser(value) {
  return value !== null
    && typeof value === "object"
    && typeof value.name === "string"
    && typeof value.active === "boolean";
}

function User(name, active) {
  this.name = name;
  this.active = active;
}

const user = new User("Dev", true);
const incomplete = Object.create(User.prototype);

console.log(user instanceof User);
console.log(isValidUser(user));
console.log(incomplete instanceof User);
console.log(isValidUser(incomplete));
~~~

Output:

~~~text
true
true
true
false
~~~

**Explanation:** **instanceof** only describes a prototype relationship. The validation function separately checks the data that this example requires.

## Review checklist

Before moving on, make sure you can explain:

- What object **new** creates and how it supplies **this**.
- Why instance data belongs on each instance and shared methods belong on the prototype.
- What happens when a constructor returns a primitive versus an object.
- How to detect an accidental call without **new**.
- What default **instanceof** checks and what it cannot prove.
- Why the **constructor** property is a convention rather than reliable evidence.
- Why **Array.isArray** is useful for cross-realm array checks.
- How **Object.create** can create prototype relationships without running constructors.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [59 - Prototypes and the prototype chain](../lessons/059-prototypes-and-the-prototype-chain.md) | [Open lesson](../lessons/060-constructor-functions-new-and-instanceof.md) | [Open example](../examples/060-constructor-functions-new-and-instanceof.md) | [61 - Classes: fields and methods](../lessons/061-classes-fields-and-methods.md) |
