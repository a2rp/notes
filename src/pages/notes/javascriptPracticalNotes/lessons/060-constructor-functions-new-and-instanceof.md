# 60 - Constructor functions, new, and instanceof

A constructor function is a regular function used with **new** to create and initialize objects. The **new** operator creates an object, connects it to the constructor's **.prototype** object, and calls the function with that new object as **this**.

This chapter connects constructor functions to the prototype chain from the previous chapter. It explains how to initialize instances, share methods, use **instanceof**, and avoid common mistakes. Modern code often uses **class** syntax for class-like designs, but understanding constructor functions makes JavaScript's object model easier to reason about.

## Learning goals

By the end of this chapter, you should be able to:

- Explain what **new** does when it calls a constructor.
- Write a constructor function that initializes instance data.
- Explain the role of a constructor function's **.prototype** property.
- Put shared methods on a prototype instead of duplicating them per instance.
- Use **instanceof** and understand what it checks.
- Recognize when a function cannot be used with **new**.
- Explain what happens when a constructor explicitly returns a value.
- Guard a constructor against calls that omit **new**.
- Recognize limitations of **instanceof** and constructor names.

## A constructor function

A constructor function follows the same function syntax as other functions. By convention, its name starts with a capital letter to signal that it is intended to be called with **new**.

~~~js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = new Person("Asha", 28);

console.log(person.name);
console.log(person.age);
console.log(Object.getPrototypeOf(person) === Person.prototype);
~~~

Output:

~~~text
Asha
28
true
~~~

The assignments add own properties to the new object. The new object's prototype link points to **Person.prototype**.

The capitalized name is a convention, not a language rule. It helps readers distinguish a constructor call such as **new Person(...)** from a normal function call.

## What new does

For a constructor call such as **new Person("Asha", 28)**, the important behavior is:

1. Create a new object.
2. Set that object's prototype link to the current object stored in **Person.prototype**.
3. Call **Person** with the new object as **this**, passing the arguments.
4. If the function explicitly returns an object, use that returned object as the result.
5. Otherwise, use the new object.

~~~js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

const point = new Point(4, 7);

console.log(point.x);
console.log(point.y);
console.log(Object.getPrototypeOf(point) === Point.prototype);
~~~

Output:

~~~text
4
7
true
~~~

The constructor function itself does not need to return the instance. **new** supplies the new object as the result when the function does not return another object.

## The constructor's prototype property

A normal constructible function has a **.prototype** property. By default, that property refers to an object with a **constructor** property that points back to the function.

~~~js
function Account(owner) {
  this.owner = owner;
}

const account = new Account("Mina");

console.log(Object.getPrototypeOf(account) === Account.prototype);
console.log(Account.prototype.constructor === Account);
console.log(Object.hasOwn(account, "constructor"));
console.log(account.constructor === Account);
~~~

Output:

~~~text
true
true
false
true
~~~

The instance does not own **constructor**. It inherits that property from **Account.prototype**. The **constructor** property is useful as a convention, but it is not a secure or definitive way to identify an object's origin. It can be changed or shadowed.

Keep these two things distinct:

- **Account.prototype** is a property on the constructor function.
- **Object.getPrototypeOf(account)** reads the instance's internal prototype link.

In this example, those two objects are the same. The function property is the object used as the instance's prototype.

## Put shared methods on the prototype

If a method is defined inside the constructor, every new instance receives a new function value. A method stored on the prototype can instead be shared by all instances.

~~~js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return "Hello, " + this.name + "!";
};

const firstUser = new User("Asha");
const secondUser = new User("Dev");

console.log(firstUser.greet());
console.log(secondUser.greet());
console.log(firstUser.greet === secondUser.greet);
console.log(Object.hasOwn(firstUser, "greet"));
~~~

Output:

~~~text
Hello, Asha!
Hello, Dev!
true
false
~~~

Both instances find **greet** through **User.prototype**. The method is one shared function, and each call uses its instance as **this**.

Instance-specific data belongs in the constructor. Shared behavior usually belongs on the prototype.

~~~js
function Timer(label) {
  this.label = label;
}

Timer.prototype.describe = function () {
  return "Timer: " + this.label;
};

const downloadTimer = new Timer("download");
const uploadTimer = new Timer("upload");

console.log(downloadTimer.describe());
console.log(uploadTimer.describe());
console.log(Object.hasOwn(downloadTimer, "label"));
console.log(Object.hasOwn(downloadTimer, "describe"));
~~~

Output:

~~~text
Timer: download
Timer: upload
true
false
~~~

## Constructor parameters and validation

A constructor can validate arguments and assign safe values to the new instance. Keep the validation behavior explicit so callers understand what values are accepted.

~~~js
function Temperature(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError("Temperature must be a finite number.");
  }

  this.value = value;
}

const roomTemperature = new Temperature(22);

console.log(roomTemperature.value);
console.log(roomTemperature instanceof Temperature);
~~~

Output:

~~~text
22
true
~~~

If the input is not a finite number, the constructor throws instead of making a partially initialized instance.

## Calling without new

A constructor function is still a function. Calling it without **new** does not create an instance or set **this** to a fresh object. In strict mode, **this** is **undefined** for a plain function call, so assigning instance properties fails. In non-strict code, **this** may refer to the global object, which is another reason accidental calls are dangerous.

Use **new.target** to detect whether a regular function was called as a constructor:

~~~js
function Ticket(code) {
  if (!new.target) {
    throw new TypeError("Ticket must be called with new.");
  }

  this.code = code;
}

const ticket = new Ticket("A-104");

console.log(ticket.code);
~~~

Output:

~~~text
A-104
~~~

If **Ticket("A-104")** is called without **new**, the function throws the specified error. The guard prevents silent mistakes. Classes also reject calls without **new**, and are often a simpler syntax for class-like APIs.

## Constructor return values

A constructor normally initializes the object created by **new**. If it explicitly returns another object or function, that returned object becomes the result of the **new** expression. A primitive return value is ignored.

~~~js
function CreatesReplacement() {
  this.createdHere = true;
  return { replacement: true };
}

function IgnoresPrimitive() {
  this.kept = true;
  return 42;
}

const first = new CreatesReplacement();
const second = new IgnoresPrimitive();

console.log(first.replacement);
console.log(first.createdHere);
console.log(second.kept);
~~~

Output:

~~~text
true
undefined
true
~~~

The object returned by **CreatesReplacement** replaces the initially created instance, so **createdHere** is not visible on **first**. The number returned by **IgnoresPrimitive** is ignored, so **second** is the initialized instance.

Returning replacement objects from constructors is uncommon and can surprise readers. Prefer initializing the instance that **new** provides unless replacement behavior is an intentional part of the API.

## Use instanceof

The **instanceof** operator checks whether a constructor's **.prototype** object appears in a value's prototype chain.

~~~js
function Vehicle(kind) {
  this.kind = kind;
}

const bicycle = new Vehicle("bicycle");

console.log(bicycle instanceof Vehicle);
console.log(bicycle instanceof Object);
console.log(bicycle instanceof Array);
~~~

Output:

~~~text
true
true
false
~~~

**bicycle** inherits from **Vehicle.prototype**, so the first check is true. The chain continues through **Object.prototype**, so it is also an instance of **Object**. Its chain does not include **Array.prototype**.

The operator does not inspect an object's fields or compare its **constructor** property. It checks prototype-chain membership.

## instanceof checks the current chain, not a creation record

An object can pass **instanceof** even if it was not created by calling that constructor. It only needs the constructor's prototype object in its chain.

~~~js
function Shape() {}

const handmadeShape = Object.create(Shape.prototype);

console.log(handmadeShape instanceof Shape);
console.log(Object.hasOwn(handmadeShape, "constructor"));
~~~

Output:

~~~text
true
false
~~~

The object was created with **Object.create**, not **new Shape()**, but it inherits from **Shape.prototype**. Therefore the default **instanceof** check returns true. It also has no own **constructor** property.

The reverse can also happen: changing a constructor's **prototype** later can affect **instanceof** results for existing objects, because the check uses the current prototype object.

## A prototype must be an object for ordinary instanceof checks

For the default behavior, the value of a constructor's **prototype** property must be an object. If it is replaced with a primitive, using that function on the right side of **instanceof** throws a **TypeError**.

~~~js
function Device() {}

const phone = new Device();
Device.prototype = null;

try {
  console.log(phone instanceof Device);
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

The output is true because the **console.log** argument is evaluated before the call. In this code the argument evaluation throws, so the catch logs whether the caught error is a **TypeError**.

**Note:** The example intentionally changes the constructor's prototype after creating **phone**. The instance keeps its original prototype link, but the default **instanceof** algorithm reads the current **Device.prototype** value and cannot use **null** as the expected prototype object.

## Replacing a prototype object

You can assign a new object to a constructor's **prototype** property, but doing so replaces the default **constructor** property too. The new object literal normally inherits **constructor** from **Object.prototype**, so it no longer points back to the function.

~~~js
function Lamp(color) {
  this.color = color;
}

Lamp.prototype = {
  turnOn() {
    return this.color + " lamp is on.";
  }
};

const deskLamp = new Lamp("green");

console.log(deskLamp.turnOn());
console.log(deskLamp instanceof Lamp);
console.log(deskLamp.constructor === Lamp);
~~~

Output:

~~~text
green lamp is on.
true
false
~~~

The method works and **instanceof** is true because the instance uses the replacement prototype. But **deskLamp.constructor** is not **Lamp**. If replacing the entire prototype is needed, restore the conventional **constructor** property:

~~~js
Object.defineProperty(Lamp.prototype, "constructor", {
  value: Lamp,
  writable: true,
  configurable: true
});

console.log(deskLamp.constructor === Lamp);
~~~

Output:

~~~text
true
~~~

A simple alternative is to add methods to the existing prototype object rather than replace it.

## Link constructor functions with Object.create

Prototype-based inheritance can connect one constructor's prototype to another prototype. **Object.create** sets up the chain without calling the parent constructor.

~~~js
function Animal(name) {
  this.name = name;
}

Animal.prototype.describe = function () {
  return this.name + " is an animal.";
};

function Bird(name, canFly) {
  Animal.call(this, name);
  this.canFly = canFly;
}

Bird.prototype = Object.create(Animal.prototype);

Object.defineProperty(Bird.prototype, "constructor", {
  value: Bird,
  writable: true,
  configurable: true
});

Bird.prototype.flyStatus = function () {
  return this.canFly ? "can fly" : "cannot fly";
};

const robin = new Bird("Robin", true);

console.log(robin.describe());
console.log(robin.flyStatus());
console.log(robin instanceof Bird);
console.log(robin instanceof Animal);
~~~

Output:

~~~text
Robin is an animal.
can fly
true
true
~~~

**Bird.prototype** inherits from **Animal.prototype**, so a **Bird** instance can use **describe**. **Animal.call(this, name)** runs the parent initialization function with the new bird as **this**. The constructor property is restored after replacing **Bird.prototype**.

This pattern is useful to understand older JavaScript code. For new class hierarchies, class syntax expresses the same relationship more directly and is covered in the next chapter.

## Arrow functions are not constructors

Arrow functions do not have the constructor behavior required by **new**.

~~~js
const makeLabel = (text) => {
  this.text = text;
};

console.log(Object.hasOwn(makeLabel, "prototype"));

try {
  new makeLabel("urgent");
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
false
true
~~~

An arrow function has no own **prototype** property for construction and cannot be used with **new**. Use a regular function or a class when callers should construct instances.

## instanceof and arrays from another realm

The default **instanceof** check depends on a particular prototype object. Objects created in another JavaScript realm, such as a separate browser frame, can use a different **Array.prototype**. For arrays, **Array.isArray(value)** is a better cross-realm check.

~~~js
const values = [1, 2, 3];

console.log(values instanceof Array);
console.log(Array.isArray(values));
~~~

Output:

~~~text
true
true
~~~

In this same-realm example both checks succeed. The difference matters when values can come from another realm.

## Common mistakes

### Forgetting new

Calling a constructor like an ordinary function does not create an instance. Use a guard with **new.target**, or prefer a class for an API that must be constructed.

### Defining shared methods inside the constructor

A function assigned in the constructor is created again for each instance. Put shared methods on the prototype when every instance should use the same function.

### Thinking instanceof checks the constructor property

The default **instanceof** algorithm checks whether the constructor's prototype object is in the value's prototype chain. The **constructor** property can be shadowed, reassigned, or absent.

### Treating instanceof as proof of an object's data shape

An object can inherit from **Constructor.prototype** without running the constructor. Use explicit validation when an API needs to verify required data.

### Replacing prototype without restoring constructor

Assigning a fresh object to **Constructor.prototype** loses its conventional own **constructor** property. Restore it if the code relies on that convention.

### Using instanceof Array for every array check

**instanceof** can fail across JavaScript realms. Use **Array.isArray** to identify arrays when values may come from another realm.

### Confusing the function prototype property with an instance prototype link

**Constructor.prototype** is a property on a function. **Object.getPrototypeOf(instance)** reads the instance's link. With **new Constructor()**, the link normally points to the function's **.prototype** object.

## Try it yourself

1. Write a **Book** constructor that stores a title and author as own properties.
2. Add a shared **describe** method to **Book.prototype** and create two books.
3. Compare the results of **Object.hasOwn(book, "describe")** and **book instanceof Book**.
4. Call a constructor without **new**, then add a **new.target** guard and try again.
5. Make a constructor return an object and compare that result with one that returns a number.
6. Create an object with **Object.create(Constructor.prototype)** and check it with **instanceof**.
7. Replace a constructor's prototype object, inspect its **constructor** property, and restore that property.
8. Build an **Employee** constructor that inherits from **Person** using **Object.create** and calls **Person** with **Person.call**.
9. Try **new** with an arrow function and explain the error.
10. Compare **instanceof Array** with **Array.isArray** for a normal array.

## Key points

- A constructor function is called with **new** to create and initialize an instance.
- **new** creates an object, links it to the constructor's **.prototype**, and calls the function with that object as **this**.
- An explicitly returned object replaces the new instance; a primitive return value is ignored.
- Shared methods usually belong on the constructor's prototype.
- An instance's prototype link is distinct from the constructor function's **.prototype** property.
- The default **instanceof** check searches the current prototype chain for the constructor's current **.prototype** object.
- **instanceof** does not prove that a constructor actually ran or that an object has a required data shape.
- Arrow functions cannot be used with **new**.
- Replacing a prototype object also changes the inherited **constructor** convention unless it is restored.
- **Array.isArray** is more reliable than **instanceof Array** for values from different JavaScript realms.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [59 - Prototypes and the prototype chain](059-prototypes-and-the-prototype-chain.md) | [Open Q&A](../qnas/060-constructor-functions-new-and-instanceof.md) | [Open example](../examples/060-constructor-functions-new-and-instanceof.md) | [61 - Classes: fields and methods](061-classes-fields-and-methods.md) |
