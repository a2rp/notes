# 63 - Inheritance, extends, and super

Class inheritance lets a class reuse and specialize another class's behavior. The **extends** keyword creates a derived class. The **super** keyword calls the parent constructor or looks up a parent method while keeping the current object as **this**.

Inheritance is built on the prototype relationships from earlier chapters. It is useful when one type truly specializes another. A long or tangled hierarchy can be hard to maintain, so keep the relationship clear. Composition, delegation, and mixins are covered in the next chapter.

## Learning goals

By the end of this chapter, you should be able to:

- Create a derived class with **extends**.
- Call a parent constructor with **super(...)**.
- Explain why **super()** must run before using **this** in a derived constructor.
- Override an instance method and reuse parent behavior with **super.method()**.
- Explain the two prototype links created by class inheritance.
- Use inherited static methods and override them with **super**.
- Understand initialization order for base and derived fields.
- Explain how private fields behave across a parent and child class.
- Recognize common errors and design limits of inheritance.

## Create a derived class

A class declared with **extends BaseClass** inherits from the base class. Its instances can use methods from both classes.

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
console.log(employee instanceof Employee);
console.log(employee instanceof Person);
~~~

Output:

~~~text
I am Asha.
Asha works as a developer.
true
true
~~~

**Employee** is a specialized **Person**. It reuses the base constructor and method, then adds its own role data and behavior.

## Call the parent constructor with super

A derived constructor must call **super(...)** before it reads or writes **this**. The **super()** call runs the base constructor and initializes the derived instance.

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
~~~

Output:

~~~text
River Town
Mina Shah
~~~

If a derived class has no constructor of its own, JavaScript provides a default constructor that forwards the arguments to the parent constructor.

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

Output:

~~~text
Check the door
true
true
~~~

An explicit derived constructor that does not call **super()** cannot use **this**. In ordinary designs, call **super()** once before accessing instance state. A derived constructor can return a different object without initializing **this**, but that behavior is unusual and is best avoided in beginner code.

## Override a method

A derived class can define a method with the same name as an inherited method. The derived method is found first for instances of the derived class.

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

const generic = new Notification();
const email = new EmailNotification();

console.log(generic.send());
console.log(email.send());
~~~

Output:

~~~text
Sending a notification.
Sending an email.
~~~

The **EmailNotification** method overrides **Notification.send** for instances of the child class. The base class remains unchanged.

## Reuse a parent method with super

Inside a derived method, **super.method()** looks up a method starting from the parent prototype. The call still uses the current instance as **this**.

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

Output:

~~~text
Person: Dev, role: designer
~~~

**super.describe()** finds the parent implementation, and that method receives the **Employee** instance as **this**. It can therefore read the instance's **name**.

**super** is not a variable containing the parent object. It is special syntax whose lookup depends on the method's home object.

## The two prototype links

Class inheritance sets up two related prototype chains:

1. **Child.prototype** inherits from **Parent.prototype**, which makes parent instance methods available to child instances.
2. The **Child** class object inherits from the **Parent** class object, which makes parent static methods available to the child class.

~~~js
class Base {
  describe() {
    return "base instance method";
  }

  static category() {
    return "base static method";
  }
}

class Child extends Base {}

const value = new Child();

console.log(Object.getPrototypeOf(Child.prototype) === Base.prototype);
console.log(Object.getPrototypeOf(Child) === Base);
console.log(value.describe());
console.log(Child.category());
~~~

Output:

~~~text
true
true
base instance method
base static method
~~~

The first link is used for instance behavior. The second link is used for static behavior. These are separate object relationships.

## Override and reuse a static method

A child class can override a static method and call the parent implementation with **super.method()**.

~~~js
class Parser {
  static format(value) {
    return "value: " + value;
  }
}

class JsonParser extends Parser {
  static format(value) {
    return super.format(JSON.stringify(value));
  }
}

console.log(JsonParser.format({ ready: true }));
console.log(Parser.format("plain"));
~~~

Output:

~~~text
value: {"ready":true}
value: plain
~~~

Here, **super.format(...)** looks up the parent class's static method. The current receiver for the call is still **JsonParser**.

## Field initialization order in a derived class

For a derived class, **super()** runs the base constructor. Base fields initialize before the base constructor body. After the base constructor returns, derived fields initialize before the rest of the derived constructor body continues.

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

const value = new Child();

console.log(value.baseField);
console.log(value.childField);
console.log(value.events);
~~~

Output:

~~~text
base field
child value
[ 'base constructor', 'child field', 'child constructor' ]
~~~

The base field initializes before the base constructor body. The base constructor creates **events**. After **super()** returns, the child field initializer runs, followed by the remaining child constructor statements.

Do not access **this** or initialize a child field before **super()**. The derived instance is not initialized until the parent constructor call completes.

## Parent and child fields can have the same public name

A child field with the same public name as a parent field creates or updates an own property on the same instance. The child field initializer runs after the parent constructor has completed.

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

const value = new Child();

console.log(value.label);
~~~

Output:

~~~text
child constructor
~~~

Each step writes the same public property on the instance. The last assignment in the child constructor determines the final value.

## Parent accessors and super

A derived getter can reuse a parent getter. The parent getter still receives the derived instance as **this**.

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

Output:

~~~text
Mina Shah
Employee: Mina Shah
~~~

The getter is found on **Person.prototype**, but the receiver remains **employee**. The parent getter reads the child's inherited instance data as expected.

## Private fields are not directly inherited

A private name belongs to the class that declares it. A child class cannot refer directly to a private field declared by its parent. The parent can expose a method that uses its private state.

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

Output:

~~~text
110
true
true
~~~

**SavingsAccount** uses the public parent methods instead of reaching into **Account**'s private field. The parent methods still operate on the child instance because it was initialized by the base constructor.

## Use super carefully in methods

A **super.method()** call is not the same as copying the parent method onto the child. It performs parent lookup for that call and preserves the current receiver.

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

const child = new Child("Asha");

console.log(child.describe());
~~~

Output:

~~~text
base for Asha and child
~~~

The base method reads **this.name** from the child instance. This is why **super** calls can reuse behavior that operates on the derived object's state.

## Inheritance has one direct base class

A class can extend one class directly. JavaScript does not provide multiple class inheritance through multiple **extends** clauses.

~~~js
class Logger {
  log(message) {
    return "LOG: " + message;
  }
}

class TimestampedLogger extends Logger {
  timestamp(message) {
    return Date.now() + " " + this.log(message);
  }
}

const logger = new TimestampedLogger();

console.log(logger.log("saved").startsWith("LOG:"));
console.log(typeof logger.timestamp);
~~~

Output:

~~~text
true
function
~~~

If an object needs behavior from several independent sources, composition or delegation may be clearer than trying to force every relationship into one inheritance chain. Those approaches are the next chapter.

## Common mistakes

### Using this before super()

A derived constructor cannot read or write **this** before calling **super()**. Call the parent constructor first.

### Forgetting to call super()

An explicit derived constructor normally needs to call **super()** before it can use the new instance. If no constructor is written, the default derived constructor forwards arguments to the parent.

### Calling super() more than once

A derived constructor initializes its **this** binding through **super()**. Calling it again after initialization throws a **ReferenceError**.

### Confusing super() with super.method()

Use **super(...)** in a derived constructor to call the parent constructor. Use **super.method()** in a method to look up and call a parent method.

### Thinking super is the parent object

**super** is special syntax, not a variable. It performs lookup through the parent relationship while keeping the current instance as the method receiver.

### Assuming parent private fields are accessible in the child

Private names are scoped to their declaring class. Use parent methods or a deliberately public interface.

### Confusing instance and static inheritance

Parent instance methods are reached through **Child.prototype**. Parent static methods are reached through the class object's prototype chain.

### Building deep hierarchies without a clear relationship

Inheritance works best when the child truly is a specialized form of the parent. For unrelated capabilities, composition and delegation can be easier to understand.

## Try it yourself

1. Create a **Vehicle** class with a constructor and an instance method.
2. Create a **Bicycle** class that extends **Vehicle**, calls **super**, and adds a field.
3. Override a method and combine parent output with **super.method()**.
4. Add a static method to the parent and call it through the child class.
5. Inspect both prototype links with **Object.getPrototypeOf**.
6. Record the order of base and derived field initialization.
7. Add private state to a parent and expose a method the child can use.
8. Add a getter in the parent and reuse it with **super** in the child.
9. Try to read **this** before **super()** and explain the error.
10. Decide whether a proposed child really is a specialized form of its parent.

## Key points

- **extends** makes a class derive from another class.
- A derived constructor calls **super(...)** before using **this**.
- If a derived class has no constructor, its default constructor forwards arguments to the parent.
- A child can override methods and reuse parent behavior through **super.method()**.
- **super.method()** keeps the current instance as **this**.
- Inheritance creates both an instance prototype chain and a class-object prototype chain.
- Base fields and constructor logic run before derived fields and the rest of the derived constructor.
- Parent private names remain private to the class that declares them.
- JavaScript classes have one direct base class; use composition when behavior comes from independent sources.
- Keep inheritance for relationships that are clear and meaningful.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [62 - Static fields, private elements, and initialization blocks](062-static-fields-private-elements-and-initialization-blocks.md) | [Open Q&A](../qnas/063-inheritance-extends-and-super.md) | [Open example](../examples/063-inheritance-extends-and-super.md) | [64 - Composition, delegation, and mixins](064-composition-delegation-and-mixins.md) |
