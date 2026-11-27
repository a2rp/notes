# 60 - Constructor functions, new, and instanceof: examples

These examples show how constructor functions work with **new**, how instances use prototype methods, and what **instanceof** does and does not establish. Each example includes a question, complete code, expected output, and an explanation.

## 1. Initialize an instance with a constructor

### Question

How can a constructor store different data on each new object?

### Code

~~~js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person = new Person("Asha", 28);

console.log(person.name);
console.log(person.age);
console.log(Object.hasOwn(person, "name"));
~~~

### Expected output

~~~text
Asha
28
true
~~~

### Explanation

**new** creates the instance and calls **Person** with that instance as **this**. The assignments create own properties on the new object.

## 2. Inspect the instance prototype link

### Question

How can you verify which object became the instance's prototype?

### Code

~~~js
function Account(owner) {
    this.owner = owner;
}

const account = new Account("Mina");

console.log(Object.getPrototypeOf(account) === Account.prototype);
console.log(Account.prototype.constructor === Account);
~~~

### Expected output

~~~text
true
true
~~~

### Explanation

For this ordinary constructor, the instance's prototype link points to the object stored in **Account.prototype**. That prototype initially has a **constructor** property pointing back to **Account**.

## 3. Distinguish own properties from inherited constructor

### Question

Does a new instance own its **constructor** property?

### Code

~~~js
function Account(owner) {
    this.owner = owner;
}

const account = new Account("Mina");

console.log(Object.hasOwn(account, "constructor"));
console.log(account.constructor === Account);
~~~

### Expected output

~~~text
false
true
~~~

### Explanation

The instance finds **constructor** through **Account.prototype**. The property is inherited, not stored directly on the instance.

## 4. Share a method on the prototype

### Question

How can every instance use the same function while reading its own data?

### Code

~~~js
function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    return "Hello, " + this.name + "!";
};

const first = new User("Asha");
const second = new User("Dev");

console.log(first.greet());
console.log(second.greet());
console.log(first.greet === second.greet);
console.log(Object.hasOwn(first, "greet"));
~~~

### Expected output

~~~text
Hello, Asha!
Hello, Dev!
true
false
~~~

### Explanation

Both instances inherit the same **greet** function from **User.prototype**. The call receiver becomes **this**, so each call reads the appropriate name.

## 5. See why methods inside a constructor are not shared

### Question

What happens if the constructor creates a function on every instance?

### Code

~~~js
function User(name) {
    this.name = name;
    this.greet = function () {
        return "Hello, " + this.name + "!";
    };
}

const first = new User("Asha");
const second = new User("Dev");

console.log(first.greet());
console.log(second.greet());
console.log(first.greet === second.greet);
console.log(Object.hasOwn(first, "greet"));
~~~

### Expected output

~~~text
Hello, Asha!
Hello, Dev!
false
true
~~~

### Explanation

The behavior works, but the constructor creates a separate function for each instance. Put shared methods on the prototype when all instances should use the same function.

## 6. Validate constructor input

### Question

How can a constructor reject invalid data before creating a usable instance?

### Code

~~~js
function Temperature(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new TypeError("Temperature must be a finite number.");
    }

    this.value = value;
}

const room = new Temperature(22);

console.log(room.value);
console.log(room instanceof Temperature);

try {
    new Temperature("warm");
} catch (error) {
    console.log(error instanceof TypeError);
}
~~~

### Expected output

~~~text
22
true
true
~~~

### Explanation

The constructor validates its input before assigning the instance property. Invalid input throws a **TypeError**, so the caller can handle the failure.

## 7. Require callers to use new

### Question

How can a constructor detect an accidental plain function call?

### Code

~~~js
function Ticket(code) {
    if (!new.target) {
        throw new TypeError("Ticket must be called with new.");
    }

    this.code = code;
}

try {
    Ticket("A-104");
} catch (error) {
    console.log(error instanceof TypeError);
}

const ticket = new Ticket("A-104");
console.log(ticket.code);
~~~

### Expected output

~~~text
true
A-104
~~~

### Explanation

**new.target** is **undefined** for a plain call and identifies the constructor for a call using **new**. The guard turns a confusing accidental call into a clear error.

## 8. Ignore a primitive constructor return

### Question

Does a primitive returned by a constructor replace the new instance?

### Code

~~~js
function Counter(start) {
    this.value = start;
    return 100;
}

const counter = new Counter(3);

console.log(counter.value);
console.log(typeof counter);
~~~

### Expected output

~~~text
3
object
~~~

### Explanation

**new** ignores a primitive return value and returns the instance initialized through **this**.

## 9. Replace the new instance with a returned object

### Question

What happens when the constructor explicitly returns an object?

### Code

~~~js
function Replacement() {
    this.onInitialInstance = true;
    return {
        replacement: true
    };
}

const result = new Replacement();

console.log(result.replacement);
console.log(result.onInitialInstance);
~~~

### Expected output

~~~text
true
undefined
~~~

### Explanation

The returned object becomes the result of the **new** expression. The initially created object is discarded, so its **onInitialInstance** property is not visible on **result**.

## 10. Check a constructor and its parent in the chain

### Question

Can one instance be an instance of both a specific constructor and **Object**?

### Code

~~~js
function Vehicle(kind) {
    this.kind = kind;
}

const bicycle = new Vehicle("bicycle");

console.log(bicycle instanceof Vehicle);
console.log(bicycle instanceof Object);
console.log(bicycle instanceof Array);
~~~

### Expected output

~~~text
true
true
false
~~~

### Explanation

The prototype chain contains **Vehicle.prototype** and then **Object.prototype**. It does not contain **Array.prototype**.

## 11. Pass instanceof without running the constructor

### Question

Does **instanceof** prove that the constructor initialized the object?

### Code

~~~js
function Device() {
    this.initialized = true;
}

const handmade = Object.create(Device.prototype);

console.log(handmade instanceof Device);
console.log(Object.hasOwn(handmade, "initialized"));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

**Object.create** sets the prototype link but does not call **Device**. The default **instanceof** check succeeds because **Device.prototype** is in the chain, even though initialization did not happen.

## 12. See how replacing a prototype affects old and new instances

### Question

What happens to an old instance when a constructor's **.prototype** is replaced?

### Code

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

### Expected output

~~~text
true
false
true
~~~

### Explanation

**oldTool** keeps the prototype link it received when it was created. The default **instanceof** behavior compares against the current **Tool.prototype**, so the old instance no longer passes. The new instance uses the replacement.

## 13. Restore constructor after replacing the prototype

### Question

How can you restore the conventional **constructor** property after assigning a new prototype object?

### Code

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

Object.defineProperty(Lamp.prototype, "constructor", {
    value: Lamp,
    writable: true,
    configurable: true
});

console.log(deskLamp.constructor === Lamp);
~~~

### Expected output

~~~text
green lamp is on.
true
false
true
~~~

### Explanation

The replacement object literal does not own a **constructor** property pointing to **Lamp**. Defining that conventional property restores the expected lookup. The existing instance uses the same prototype object, so it sees the added property too.

## 14. Inherit methods from another constructor's prototype

### Question

How can a child constructor inherit shared methods and initialize parent data?

### Code

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

### Expected output

~~~text
I am Asha
Asha works as developer
true
true
~~~

### Explanation

**Employee.prototype** inherits from **Person.prototype**, so employee instances can use **introduce**. **Person.call(this, name)** runs the parent initialization with the employee instance as **this**. The child prototype's **constructor** property is restored after replacing it.

## 15. Catch use of an arrow function with new

### Question

What happens if an arrow function is used as a constructor?

### Code

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

### Expected output

~~~text
false
true
~~~

### Explanation

Arrow functions do not have constructor behavior and cannot be called with **new**. Use a regular function or a class for constructible APIs.

## 16. Compare Array.isArray with instanceof Array

### Question

Which check identifies an array in this realm?

### Code

~~~js
const values = [1, 2, 3];

console.log(values instanceof Array);
console.log(Array.isArray(values));
~~~

### Expected output

~~~text
true
true
~~~

### Explanation

Both checks work for this array. **Array.isArray** is more reliable when values may come from another JavaScript realm with a different **Array.prototype**.

## 17. Validate data separately from instanceof

### Question

Can an instance check replace validation of the object's required fields?

### Code

~~~js
function User(name, active) {
    this.name = name;
    this.active = active;
}

function isValidUser(value) {
    return value !== null
        && typeof value === "object"
        && typeof value.name === "string"
        && typeof value.active === "boolean";
}

const user = new User("Dev", true);
const incomplete = Object.create(User.prototype);

console.log(user instanceof User);
console.log(isValidUser(user));
console.log(incomplete instanceof User);
console.log(isValidUser(incomplete));
~~~

### Expected output

~~~text
true
true
true
false
~~~

### Explanation

**instanceof** checks the prototype chain, not the object's shape. The second function explicitly checks the data this example requires.

## 18. Customize instanceof with Symbol.hasInstance

### Question

Can a function define a rule for which values count as instances?

### Code

~~~js
function EvenNumber() {}

Object.defineProperty(EvenNumber, Symbol.hasInstance, {
    value(value) {
        return typeof value === "number" && value % 2 === 0;
    }
});

console.log(4 instanceof EvenNumber);
console.log(5 instanceof EvenNumber);
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The **instanceof** operator can use a right-hand object's **Symbol.hasInstance** method. This custom rule does not inspect a prototype chain. Most constructors use the default behavior, so treat this as an advanced customization.

## 19. Catch an invalid prototype used by default instanceof

### Question

What happens if a function's current **prototype** value is not an object?

### Code

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

### Expected output

~~~text
true
~~~

### Explanation

The default **instanceof** behavior requires the constructor's current **prototype** value to be an object. Setting it to **null** causes a **TypeError**, which the catch block identifies.

## 20. Inspect new.target

### Question

How can a constructor verify which function was used as the new target?

### Code

~~~js
function Record(id) {
    this.id = id;
    this.wasConstructed = new.target === Record;
}

const record = new Record("R-12");

console.log(record.id);
console.log(record.wasConstructed);
~~~

### Expected output

~~~text
R-12
true
~~~

### Explanation

Inside a constructor call, **new.target** is the constructor to which **new** was applied. A plain call would make it **undefined**.

## Practice prompts

1. Create a **Book** constructor with own **title** and **author** properties.
2. Add a shared **describe** method to **Book.prototype** and create two books.
3. Compare **Object.hasOwn(book, "describe")** with **book instanceof Book**.
4. Call a constructor without **new**, then add a **new.target** guard and try again.
5. Make one constructor return an object and another return a number. Compare their results.
6. Create an object with **Object.create(Constructor.prototype)** and check it with **instanceof**.
7. Replace a constructor's prototype object, inspect **constructor**, and restore that property.
8. Create **Employee** inheritance from **Person** using **Object.create** and **Person.call**.
9. Try **new** with an arrow function and explain the error.
10. Compare **instanceof Array** with **Array.isArray** for ordinary arrays.

## Key points

- **new** creates an object, links it to the constructor's **.prototype**, and calls the constructor with that object as **this**.
- Own instance data belongs on each instance. Shared methods usually belong on the prototype.
- An explicitly returned object or function replaces the new instance. A primitive return is ignored.
- **new.target** can detect whether a regular function was called as a constructor.
- The default **instanceof** behavior checks whether the constructor's current prototype object appears in the value's prototype chain.
- **instanceof** does not prove that the constructor ran or that required fields exist.
- A custom **Symbol.hasInstance** method can replace the default check.
- Arrow functions cannot be used with **new**.
- Replacing a prototype object changes new instances and can affect **instanceof** checks for existing instances.
- **Array.isArray** is more reliable than **instanceof Array** across JavaScript realms.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [59 - Prototypes and the prototype chain](../lessons/059-prototypes-and-the-prototype-chain.md) | [Open lesson](../lessons/060-constructor-functions-new-and-instanceof.md) | [Open Q&A](../qnas/060-constructor-functions-new-and-instanceof.md) | [61 - Classes: fields and methods](../lessons/061-classes-fields-and-methods.md) |
