# 63 - Inheritance, extends, and super: examples

These examples show how derived classes reuse and specialize base-class behavior. Each example includes a question, complete code, expected output, and an explanation.

## 1. Create a child class

### Question

How can a class inherit a parent constructor and method?

### Code

~~~js
class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        return "I am " + this.name + ".";
    }
}

class Employee extends Person {
    constructor(name, role) {
        super(name);
        this.role = role;
    }

    describeRole() {
        return this.name + " works as a " + this.role + ".";
    }
}

const employee = new Employee("Asha", "developer");

console.log(employee.introduce());
console.log(employee.describeRole());
~~~

### Expected output

~~~text
I am Asha.
Asha works as a developer.
~~~

### Explanation

**Employee** extends **Person**, calls its constructor with **super(name)**, then adds its own role. The child instance inherits **introduce**.

## 2. Initialize parent data with super

### Question

How can a child constructor use the parent's initialization and add another property?

### Code

~~~js
class Product {
    constructor(name) {
        this.name = name;
    }
}

class Book extends Product {
    constructor(name, author) {
        super(name);
        this.author = author;
    }
}

const book = new Book("River Town", "Mina Shah");

console.log(book.name);
console.log(book.author);
console.log(book instanceof Product);
~~~

### Expected output

~~~text
River Town
Mina Shah
true
~~~

### Explanation

The parent constructor creates **name** on the same object that becomes the **Book** instance. The child constructor adds **author** after **super** returns.

## 3. Use the default derived constructor

### Question

What happens when a child class extends a base class but declares no constructor?

### Code

~~~js
class Message {
    constructor(text) {
        this.text = text;
    }
}

class AlertMessage extends Message {}

const alert = new AlertMessage("Check the door");

console.log(alert.text);
console.log(alert instanceof AlertMessage);
console.log(alert instanceof Message);
~~~

### Expected output

~~~text
Check the door
true
true
~~~

### Explanation

JavaScript supplies a default derived constructor that forwards its arguments to the parent constructor.

## 4. Override a method without calling the parent

### Question

Can a child replace an inherited method entirely?

### Code

~~~js
class Notification {
    send() {
        return "Sending a notification.";
    }
}

class EmailNotification extends Notification {
    send() {
        return "Sending an email.";
    }
}

console.log(new Notification().send());
console.log(new EmailNotification().send());
~~~

### Expected output

~~~text
Sending a notification.
Sending an email.
~~~

### Explanation

The child method has the same name and is found first for child instances. Calling the parent method is optional.

## 5. Add to the parent method with super

### Question

How can an override reuse the parent method's result?

### Code

~~~js
class Person {
    constructor(name) {
        this.name = name;
    }

    describe() {
        return "Person: " + this.name;
    }
}

class Employee extends Person {
    constructor(name, role) {
        super(name);
        this.role = role;
    }

    describe() {
        return super.describe() + ", role: " + this.role;
    }
}

const employee = new Employee("Dev", "designer");

console.log(employee.describe());
~~~

### Expected output

~~~text
Person: Dev, role: designer
~~~

### Explanation

**super.describe()** looks up the parent implementation. The child method then appends information of its own.

## 6. Confirm that a super method keeps the child receiver

### Question

Can a parent method called by **super** read data from the child instance?

### Code

~~~js
class Base {
    describe() {
        return "base for " + this.name;
    }
}

class Child extends Base {
    constructor(name) {
        super();
        this.name = name;
    }

    describe() {
        return super.describe() + " and child";
    }
}

console.log(new Child("Asha").describe());
~~~

### Expected output

~~~text
base for Asha and child
~~~

### Explanation

The parent method is found through the parent prototype, but its receiver is still the child instance. Therefore **this.name** reads the child's data.

## 7. Inspect both inheritance prototype links

### Question

Which prototype links connect a child instance and its class to the parent?

### Code

~~~js
class Animal {
    describe() {
        return "animal";
    }

    static category() {
        return "living thing";
    }
}

class Cat extends Animal {}

const cat = new Cat();

console.log(Object.getPrototypeOf(cat) === Cat.prototype);
console.log(Object.getPrototypeOf(Cat.prototype) === Animal.prototype);
console.log(Object.getPrototypeOf(Cat) === Animal);
console.log(cat.describe());
console.log(Cat.category());
~~~

### Expected output

~~~text
true
true
true
animal
living thing
~~~

### Explanation

**Cat.prototype** inherits from **Animal.prototype** for instance methods. The **Cat** class object inherits from **Animal** for static methods.

## 8. Inherit a static method

### Question

Can a child class call a static method declared by its parent?

### Code

~~~js
class Base {
    static label() {
        return "label from " + this.name;
    }
}

class Report extends Base {}

console.log(Base.label());
console.log(Report.label());
~~~

### Expected output

~~~text
label from Base
label from Report
~~~

### Explanation

The static method is inherited through the class-object prototype chain. Calling it through **Report** makes **Report** the receiver, so **this.name** is different.

## 9. Override a static method with super

### Question

How can a child static method reuse the parent static method?

### Code

~~~js
class Formatter {
    static format(value) {
        return "value: " + value;
    }
}

class JsonFormatter extends Formatter {
    static format(value) {
        return super.format(JSON.stringify(value));
    }
}

console.log(JsonFormatter.format({ ready: true }));
console.log(Formatter.format("plain"));
~~~

### Expected output

~~~text
value: {"ready":true}
value: plain
~~~

### Explanation

Inside a static method, **super.format** looks up the parent class's static method. The base class itself remains unchanged.

## 10. Record base and child initialization order

### Question

When do derived fields initialize in relation to the base constructor?

### Code

~~~js
class Base {
    baseField = "base field";

    constructor() {
        this.events = ["base constructor"];
    }
}

class Child extends Base {
    childField = (this.events.push("child field"), "child value");

    constructor() {
        super();
        this.events.push("child constructor");
    }
}

const child = new Child();

console.log(child.baseField);
console.log(child.childField);
console.log(child.events);
~~~

### Expected output

~~~text
base field
child value
[ 'base constructor', 'child field', 'child constructor' ]
~~~

### Explanation

The base field initializes before the base constructor body. After **super()** completes, the child field initializes, then the rest of the child constructor runs.

## 11. Override a parent's public field

### Question

What happens when the child declares a field with the same public name as its parent?

### Code

~~~js
class Base {
    label = "base field";

    constructor() {
        this.label = "base constructor";
    }
}

class Child extends Base {
    label = "child field";

    constructor() {
        super();
        this.label = "child constructor";
    }
}

const child = new Child();

console.log(child.label);
~~~

### Expected output

~~~text
child constructor
~~~

### Explanation

The parent field and constructor assign the same public property. The child field then initializes after **super()**, and the remaining child constructor statement writes the final value.

## 12. Reuse a parent getter

### Question

Can a derived getter use a parent getter through **super**?

### Code

~~~js
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return this.firstName + " " + this.lastName;
    }
}

class Employee extends Person {
    get displayName() {
        return "Employee: " + super.fullName;
    }
}

const employee = new Employee("Mina", "Shah");

console.log(employee.fullName);
console.log(employee.displayName);
~~~

### Expected output

~~~text
Mina Shah
Employee: Mina Shah
~~~

### Explanation

The parent getter is found on **Person.prototype** and runs with **employee** as **this**.

## 13. Use parent methods to access parent private state

### Question

How can a child work with private state declared by its parent?

### Code

~~~js
class Account {
    #balance = 0;

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}

class SavingsAccount extends Account {
    addInterest(rate) {
        const interest = this.getBalance() * rate;
        this.deposit(interest);
        return this.getBalance();
    }
}

const savings = new SavingsAccount();
savings.deposit(100);
savings.addInterest(0.1);

console.log(savings.getBalance());
console.log(savings instanceof SavingsAccount);
console.log(savings instanceof Account);
~~~

### Expected output

~~~text
110
true
true
~~~

### Explanation

The child calls the parent's public methods instead of accessing **#balance** directly. Both instance checks succeed because the child prototype chain includes the parent prototype.

## 14. Catch use of this before super

### Question

What happens if a derived constructor tries to use **this** before calling **super()**?

### Code

~~~js
class Base {}

class Child extends Base {
    constructor() {
        this.ready = true;
        super();
    }
}

try {
    new Child();
} catch (error) {
    console.log(error instanceof ReferenceError);
}
~~~

### Expected output

~~~text
true
~~~

### Explanation

The derived instance's **this** binding is not initialized before the parent constructor call. The attempted access throws a **ReferenceError**.

## 15. Show that a child instance is an instance of both classes

### Question

Does extending a class affect the result of **instanceof** for the parent?

### Code

~~~js
class Vehicle {}

class Bicycle extends Vehicle {}

const bicycle = new Bicycle();

console.log(bicycle instanceof Bicycle);
console.log(bicycle instanceof Vehicle);
console.log(bicycle instanceof Object);
~~~

### Expected output

~~~text
true
true
true
~~~

### Explanation

The instance's prototype chain contains **Bicycle.prototype**, then **Vehicle.prototype**, then **Object.prototype**.

## 16. Override a method and call the parent only when needed

### Question

Can an override completely replace the parent behavior?

### Code

~~~js
class Base {
    describe() {
        return "base";
    }
}

class Child extends Base {
    describe() {
        return "child";
    }
}

class ExtendedChild extends Base {
    describe() {
        return "child plus " + super.describe();
    }
}

console.log(new Child().describe());
console.log(new ExtendedChild().describe());
~~~

### Expected output

~~~text
child
child plus base
~~~

### Explanation

The first child replaces the parent behavior. The second reuses the base implementation through **super**.

## 17. Catch calling super twice

### Question

Can a derived constructor initialize its this binding by calling **super()** twice?

### Code

~~~js
class Base {}

class Child extends Base {
    constructor() {
        super();
        super();
    }
}

try {
    new Child();
} catch (error) {
    console.log(error instanceof ReferenceError);
}
~~~

### Expected output

~~~text
true
~~~

### Explanation

A derived constructor initializes its **this** binding through one successful **super()** call. Calling it again attempts to initialize the binding a second time and throws.

## 18. Extend the built-in Error class

### Question

How can a custom error class preserve the built-in error behavior?

### Code

~~~js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

const error = new ValidationError("Invalid input");

console.log(error.name + ": " + error.message);
console.log(error instanceof ValidationError);
console.log(error instanceof Error);
~~~

### Expected output

~~~text
ValidationError: Invalid input
true
true
~~~

### Explanation

Calling **super(message)** initializes the built-in error. The custom class then sets its own error name.

## 19. Return a replacement object from a derived constructor

### Question

Can a derived constructor return an object without calling **super()**?

### Code

~~~js
class Base {}

class Child extends Base {
    constructor() {
        return {
            replacement: true
        };
    }
}

const child = new Child();

console.log(child.replacement);
console.log(child instanceof Child);
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

A derived constructor may return an object without initializing **this**. The returned object becomes the result, but it does not inherit from **Child.prototype**. This pattern is unusual and usually best avoided.

## 20. Call a parent method that uses child data

### Question

Can a parent method operate on fields added only by the child?

### Code

~~~js
class Base {
    summary() {
        return this.name + " (" + this.code + ")";
    }
}

class Child extends Base {
    constructor(name, code) {
        super();
        this.name = name;
        this.code = code;
    }
}

console.log(new Child("Mina", "M-7").summary());
~~~

### Expected output

~~~text
Mina (M-7)
~~~

### Explanation

The method comes from the parent prototype but receives the child instance as **this**, so it can read the child's fields.

## Practice prompts

1. Create a **Vehicle** class and a **Bicycle** class that extends it.
2. Override a parent method and combine its result with **super.method()**.
3. Add a static method to the parent and call it through the child class.
4. Inspect the instance prototype chain and class-object prototype chain.
5. Record the order of base and derived field initialization.
6. Give the parent private state and let the child use it through public parent methods.
7. Reuse a parent getter with **super**.
8. Extend **Error** with a custom error name.
9. Try to use **this** before **super()** and observe the error.
10. Decide whether a type relationship is a good fit for inheritance or composition.

## Key points

- **extends** creates instance and static inheritance relationships.
- A derived constructor calls **super()** before it uses **this**.
- A default derived constructor forwards arguments to its parent.
- **super.method()** looks up parent behavior while retaining the current receiver.
- Parent instance methods and static methods are inherited through separate prototype chains.
- Base initialization happens before derived fields and the rest of the child constructor.
- Private names are scoped to their declaring class.
- A derived constructor can return a replacement object without **super()**, but this is rarely a clear design.
- One class can extend one direct base class.
- Use inheritance for clear specialization; use composition when combining independent capabilities.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [62 - Static fields, private elements, and initialization blocks](../lessons/062-static-fields-private-elements-and-initialization-blocks.md) | [Open lesson](../lessons/063-inheritance-extends-and-super.md) | [Open Q&A](../qnas/063-inheritance-extends-and-super.md) | [64 - Composition, delegation, and mixins](../lessons/064-composition-delegation-and-mixins.md) |
