# 135 - Object-oriented programming, composition, and design patterns

Object-oriented programming (OOP) organizes code around objects that combine state with operations that use that state. JavaScript supports objects through prototypes and offers class syntax to create objects with shared behavior.

OOP is useful when a program models entities with identity, state, and meaningful operations. It does not mean every value needs a class. Functions and plain objects are often simpler for stateless transformations. Choose the smallest structure that makes responsibilities and dependencies clear.

## Learning goals

- Explain how JavaScript objects, prototypes, and classes relate.
- Create classes with constructors, instance fields, methods, and private fields.
- Use getters, setters, and static members when they clarify an API.
- Extend classes carefully and override behavior through polymorphism.
- Compare inheritance with composition and delegation.
- Recognize useful patterns without adding needless layers.
- Protect object invariants and keep side effects at clear boundaries.

## Objects and responsibilities

An object is a value with properties. Some properties hold data and some hold functions. When a function is called through an object, it can use that object's state through **this**.

~~~js
const counter = {
  value: 0,
  increment() {
    this.value += 1;
    return this.value;
  }
};

console.log(counter.increment()); // 1
~~~

A useful object has a clear responsibility. A **ShoppingCart** can own rules for adding and removing items. A **CheckoutService** can coordinate pricing and payment. When one object handles unrelated concerns, it becomes harder to change or test.

Keep data private when callers should not be able to put the object into an invalid state. Expose operations that preserve the object's rules instead of exposing internal storage for arbitrary edits.

## Prototypes and class syntax

JavaScript objects use prototypes for property lookup. If an object does not contain a requested property, JavaScript checks its prototype, then the prototype's prototype, until it finds the property or reaches **null**. Class syntax creates constructors and prototype methods. It does not replace JavaScript's prototype model.

~~~js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return "Hello, " + this.name;
  }
}

const user = new User("Asha");
console.log(user.greet()); // Hello, Asha
console.log(Object.getPrototypeOf(user) === User.prototype); // true
~~~

The **new** operator creates an object, connects it to the constructor's prototype, calls the constructor with that object as **this**, and returns it unless the constructor explicitly returns another object.

Class bodies run in strict mode. Class declarations are not usable before their declaration is evaluated, and class methods are not enumerable prototype properties by default.

## Constructors, instance fields, and methods

A constructor establishes the initial state of each instance. Validate values at the boundary so the object begins in a valid state.

~~~js
class Rectangle {
  constructor(width, height) {
    if (width <= 0 || height <= 0) {
      throw new RangeError("Dimensions must be positive");
    }
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}
~~~

Instance fields are created on each instance. Prototype methods are shared by instances. Prefer methods for behavior that does not need a separate copy per instance. An arrow function stored as an instance field captures **this**, which can help for callbacks but creates a function for every instance.

A constructor should initialize the object, not perform surprising work such as making network requests or changing unrelated global state. Keep externally visible actions in explicit methods or collaborating services.

## Encapsulation and private fields

A public property can be read or changed by any caller. JavaScript private fields use a **#** prefix and can only be accessed by code inside the class that declares them.

~~~js
class BankAccount {
  #balanceCents;

  constructor(openingBalanceCents = 0) {
    if (!Number.isInteger(openingBalanceCents) || openingBalanceCents < 0) {
      throw new RangeError("Opening balance must be a non-negative integer");
    }
    this.#balanceCents = openingBalanceCents;
  }

  get balanceCents() {
    return this.#balanceCents;
  }

  deposit(amountCents) {
    if (!Number.isInteger(amountCents) || amountCents <= 0) {
      throw new RangeError("Deposit must be a positive integer");
    }
    this.#balanceCents += amountCents;
    return this.#balanceCents;
  }
}
~~~

Private fields are enforced by the language. A property named **_balance** is only a naming convention and remains public. Private fields are not ordinary object properties, are not included in JSON serialization, and cannot be accessed with bracket notation.

Encapsulation means giving callers a small API that protects invariants. Avoid making every private field accessible through a getter. If callers do not need a value, do not expose it without a reason.

## Getters, setters, and static members

A getter exposes a computed or read-only view using property syntax. A setter can validate changes. Use them when they clarify an API, but prefer a method for an operation with visible effects.

~~~js
class Temperature {
  #celsius;

  constructor(celsius) {
    this.celsius = celsius;
  }

  get celsius() {
    return this.#celsius;
  }

  set celsius(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError("Temperature must be finite");
    }
    this.#celsius = value;
  }

  get fahrenheit() {
    return this.#celsius * 9 / 5 + 32;
  }
}
~~~

A getter should be quick and unsurprising. Do not hide network access, expensive work, or state changes behind property access. A static method belongs to the class rather than an instance. It can provide a named creation or validation operation. Mutable static fields are shared by every instance, so they can become hidden global state.

## Inheritance and overriding

Inheritance expresses an “is a” relationship where a subtype can safely stand in for its base type. **extends** connects the subclass prototype to the base class prototype. A derived constructor must call **super()** before it uses **this**.

~~~js
class Notification {
  constructor(message) {
    this.message = message;
  }

  send() {
    return "Sending: " + this.message;
  }
}

class EmailNotification extends Notification {
  constructor(message, address) {
    super(message);
    this.address = address;
  }

  send() {
    return "Email to " + this.address + ": " + this.message;
  }
}
~~~

Overriding lets a subtype provide behavior with the same public contract. Polymorphism means callers can use that contract without branching on each concrete class.

~~~js
function deliver(notification) {
  return notification.send();
}

console.log(deliver(new EmailNotification("Welcome", "asha@example.test")));
~~~

JavaScript does not require a subclass for polymorphism. Any value with the expected method can work through duck typing. Validate important collaborators at boundaries. Deep hierarchies make behavior harder to locate and changes risky. A subtype that cannot honor the base type's promises is a poor subtype. Keep hierarchies shallow and use inheritance when the shared contract is stable.

## Composition and delegation

Composition builds an object by giving it smaller collaborators. Instead of inheriting behavior, an object delegates a specific task to another object.

~~~js
class EmailSender {
  send(message) {
    return "Email: " + message;
  }
}

class AuditLogger {
  record(message) {
    return "Audit: " + message;
  }
}

class AccountService {
  constructor({ sender, logger }) {
    this.sender = sender;
    this.logger = logger;
  }

  welcome(name) {
    const message = "Welcome, " + name;
    this.logger.record(message);
    return this.sender.send(message);
  }
}
~~~

The service depends on small capabilities rather than a particular inheritance tree. Tests can supply fakes, and production code can provide different implementations. Composition is not automatically better: a wrapper around one trivial method can add more indirection than value. Use a collaborator for an independent responsibility, replaceable policy, or separately tested dependency.

## Common design patterns

A design pattern is a reusable shape for a recurring problem. Patterns are guidance, not mandatory class templates.

### Strategy

Strategy puts interchangeable behavior behind a common contract. A checkout service can receive a discount policy instead of containing a growing set of conditionals.

~~~js
class NoDiscount {
  discountCents() {
    return 0;
  }
}

class PercentageDiscount {
  constructor(percent) {
    this.percent = percent;
  }

  discountCents(subtotalCents) {
    return Math.round(subtotalCents * this.percent / 100);
  }
}
~~~

JavaScript functions can also be strategies. Use a class when the policy needs state or a richer interface.

### Factory

A factory centralizes creation when choosing or validating a concrete type is part of the application rule. A direct **new** call is clearer when creation is simple.

~~~js
class ConsoleNotification {
  constructor(message) {
    this.message = message;
  }

  send() {
    return "Console: " + this.message;
  }
}

function createNotification(kind, message) {
  if (kind === "email") return new EmailNotification(message, "team@example.test");
  if (kind === "console") return new ConsoleNotification(message);
  throw new RangeError("Unknown notification kind: " + kind);
}
~~~

### Adapter, observer, and state

An **adapter** translates one interface into another and isolates vendor-specific details. An **observer** lets a publisher notify subscribers of an event. It can reduce direct coupling, but event names, payloads, and unsubscribe behavior should be clear. The **state** pattern moves substantial state-specific behavior behind a shared interface. For a small finite state, a value and a switch may be simpler.

## Interfaces and contracts in JavaScript

JavaScript has no built-in runtime **interface** keyword. A contract can be documented, checked by TypeScript, or validated at runtime.

~~~js
function useStore(store) {
  if (!store || typeof store.get !== "function" || typeof store.set !== "function") {
    throw new TypeError("Store must provide get and set methods");
  }
  store.set("theme", "dark");
  return store.get("theme");
}
~~~

A class name does not guarantee that an object follows a useful contract. Design callers around the operations they need, and validate collaborators at important boundaries.

## The this value and method callbacks

The value of **this** depends on how a function is called. Extracting a method can lose its receiver.

~~~js
const account = {
  owner: "Asha",
  describe() {
    return "Account owner: " + this.owner;
  }
};

const describe = account.describe;
console.log(account.describe());
console.log(account.describe.bind(account)());
~~~

Pass a bound method or wrap the call when a callback needs its object. Do not use **bind** or arrow fields everywhere by habit.

## Testing object-oriented code

Test observable behavior through the public API. Verify valid state transitions, rejected invalid inputs, and interactions at boundaries. Avoid tests that depend on private field names or prototype implementation details.

Inject collaborators when tests need to control time, storage, payment, or network behavior. A small fake can verify a request without contacting a real service. Excessive mocking can reproduce implementation details instead of protecting behavior.

For a class with many setup steps or mutable fields, reconsider its responsibilities. A smaller object or pure function may be easier to test and maintain.

## Common mistakes

- Treating class syntax as a separate object system instead of prototype-based JavaScript.
- Exposing mutable internal arrays or maps and allowing callers to violate invariants.
- Adding getters for every private field without a caller need.
- Doing network or file I/O in constructors.
- Using inheritance only to reuse a few lines of code.
- Creating subclasses that cannot honor the base class contract.
- Overriding a method but changing its arguments or return meaning.
- Forgetting that extracted methods can lose their **this** receiver.
- Using mutable static fields as hidden global state.
- Creating a design pattern before a recurring problem exists.
- Using a class for a stateless calculation that is clearer as a function.

## Key points

- JavaScript class syntax is built on prototypes.
- Constructors establish valid initial state, while methods express operations.
- Private fields help protect invariants but should not be exposed without a need.
- Inheritance supports substitution when the contract is stable.
- Composition delegates independent responsibilities to collaborators.
- Strategy, factory, adapter, observer, and state are useful when they reduce coupling or clarify decisions.
- Prefer public behavior tests and explicit boundaries over tests of private implementation.
- Use classes where identity, state, and behavior belong together; use functions and plain objects where they are simpler.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [134 - Functional programming: composition and purity](134-functional-programming-composition-and-purity.md) | [Open Q&A](../qnas/135-object-oriented-programming-composition-and-design-patterns.md) | [Open example](../examples/135-object-oriented-programming-composition-and-design-patterns.md) | [136 - Modular architecture and dependency boundaries](136-modular-architecture-and-dependency-boundaries.md) |

