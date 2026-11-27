# 62 - Static fields, private elements, and initialization blocks

Classes can keep data on each instance, or keep data on the class itself. **Static fields** and **static methods** belong to the class object. **Private elements** use names beginning with **#** and can be accessed only from within the class body that declares them. A **static initialization block** runs once while the class is being defined and can perform setup that needs several statements.

This chapter builds on class fields and methods from the previous chapter. It covers static and private fields, methods and accessors, private brand checks, and static initialization blocks. Inheritance interactions are covered in the next chapter.

## Learning goals

By the end of this chapter, you should be able to:

- Distinguish static data from instance data.
- Initialize and update a static field.
- Define static methods and call them on the class.
- Declare private instance fields and access them from class methods.
- Explain why private names are not ordinary object properties.
- Use a private brand check with the **in** operator.
- Define private methods and private accessors.
- Declare private static fields and methods.
- Use a static initialization block for multi-step class setup.
- Explain the order in which static elements initialize.
- Recognize common mistakes with private and static elements.

## Instance fields and static fields

An instance field creates a value for every instance. A static field creates one property on the class itself.

~~~js
class Visitor {
  name = "Guest";
  static count = 0;

  constructor(name) {
    this.name = name;
    Visitor.count += 1;
  }
}

const first = new Visitor("Asha");
const second = new Visitor("Dev");

console.log(first.name);
console.log(second.name);
console.log(Visitor.count);
console.log(Object.hasOwn(first, "name"));
console.log(Object.hasOwn(Visitor, "count"));
console.log(Object.hasOwn(first, "count"));
~~~

Output:

~~~text
Asha
Dev
2
true
true
false
~~~

Each instance owns its **name**. The class object **Visitor** owns the static **count**. The instances do not own or inherit that static field.

Use static fields for data shared by or associated with the class, such as a registry, a configuration value, or a count. Use instance fields for values that differ from one object to another.

## Static methods

A static method belongs to the class object, not to instances. It can read and update static fields.

~~~js
class VisitTracker {
  static count = 0;

  static record() {
    this.count += 1;
    return this.count;
  }
}

console.log(VisitTracker.record());
console.log(VisitTracker.record());
console.log(VisitTracker.count);

const tracker = new VisitTracker();
console.log(typeof tracker.record);
~~~

Output:

~~~text
1
2
2
undefined
~~~

Call **record** on **VisitTracker**. When called as **VisitTracker.record()**, **this** is **VisitTracker**. An instance does not get the static method as an instance method.

A static method can also be a factory:

~~~js
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) * 5 / 9);
  }
}

const room = Temperature.fromFahrenheit(68);

console.log(room.celsius);
console.log(room instanceof Temperature);
~~~

Output:

~~~text
20
true
~~~

Static methods are useful for operations related to a class, but do not require an existing instance.

## Private instance fields

A private field starts with **#** and must be declared inside its class. Code outside that class body cannot read or write it using ordinary property syntax.

~~~js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new RangeError("Deposit must be greater than zero.");
    }

    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

console.log(account.deposit(25));
console.log(account.getBalance());
console.log(Object.keys(account));
console.log(Object.getOwnPropertyNames(account));
~~~

Output:

~~~text
25
25
[]
[]
~~~

The private balance is available to methods in **BankAccount**, but it is not an ordinary string-keyed property. It does not appear in **Object.keys** or **Object.getOwnPropertyNames**.

A private field is not made private by a naming convention. Its access restriction is part of JavaScript syntax and runtime behavior. Outside code cannot read it as **account.#balance**.

## Private fields protect invariants

Private fields let a class keep control over how its internal state changes. Public methods can validate updates and expose only the operations the class intends to support.

~~~js
class Meter {
  #value = 0;

  increase(amount) {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new RangeError("Increase must be a non-negative finite number.");
    }

    this.#value += amount;
  }

  read() {
    return this.#value;
  }
}

const meter = new Meter();
meter.increase(4);

try {
  meter.increase(-1);
} catch (error) {
  console.log(error instanceof RangeError);
}

console.log(meter.read());
~~~

Output:

~~~text
true
4
~~~

The class ensures that its private value changes only through its validated method.

Private fields are not a security boundary for hostile code running with full debugging or execution privileges. They are language-enforced access control that prevents ordinary outside code from reaching the private name.

## Private methods

A private method uses the same **#** syntax and can only be called from the class body that declares it.

~~~js
class Order {
  #status = "new";

  #isAllowed(nextStatus) {
    return nextStatus === "paid" || nextStatus === "cancelled";
  }

  updateStatus(nextStatus) {
    if (!this.#isAllowed(nextStatus)) {
      throw new RangeError("Unsupported order status.");
    }

    this.#status = nextStatus;
  }

  getStatus() {
    return this.#status;
  }
}

const order = new Order();
order.updateStatus("paid");

console.log(order.getStatus());
~~~

Output:

~~~text
paid
~~~

The helper **#isAllowed** cannot be called as a public method from outside the class. It is shared class behavior that is intentionally private.

## Private accessors

Private getters and setters provide controlled access to a private value. The accessor can calculate a result or validate a write.

~~~js
class PasswordLength {
  #password = "";

  set #secret(value) {
    if (typeof value !== "string") {
      throw new TypeError("Password must be text.");
    }

    this.#password = value;
  }

  get #secret() {
    return this.#password;
  }

  setPassword(value) {
    this.#secret = value;
  }

  length() {
    return this.#secret.length;
  }
}

const password = new PasswordLength();
password.setPassword("maple");

console.log(password.length());
~~~

Output:

~~~text
5
~~~

The private accessor name is usable within **PasswordLength**. Outside code calls the public operations and cannot directly access **#secret**.

A private field and a private accessor with the same name cannot be declared together. In this example, **#secret** is an accessor pair, and **#password** stores the underlying data.

## A private method can inspect another instance

Methods in a class may access private fields on another instance that has the same private brand. This is useful for controlled comparisons.

~~~js
class Color {
  #value;

  constructor(value) {
    this.#value = value;
  }

  matches(other) {
    return other instanceof Color && this.#value === other.#value;
  }
}

const redA = new Color("red");
const redB = new Color("red");
const blue = new Color("blue");

console.log(redA.matches(redB));
console.log(redA.matches(blue));
console.log(redA.matches({ value: "red" }));
~~~

Output:

~~~text
true
false
false
~~~

The **matches** method can read **other.#value** because it executes inside the class that declared that private name. The **instanceof** guard avoids trying to read the private field from an unrelated object. In inheritance designs, private names remain tied to the class that declares them; the next chapter discusses the interaction with subclasses.

## Check for a private brand

Inside the class that declares a private element, the **#name in object** syntax checks whether an object has that private brand.

~~~js
class Session {
  #token;

  constructor(token) {
    this.#token = token;
  }

  static hasSessionBrand(value) {
    return value !== null
      && typeof value === "object"
      && #token in value;
  }
}

const session = new Session("t-9");

console.log(Session.hasSessionBrand(session));
console.log(Session.hasSessionBrand({}));
console.log(Session.hasSessionBrand(null));
~~~

Output:

~~~text
true
false
false
~~~

This check is only legal within the class body that declares **#token**. The type guards ensure the right side of **in** is an object. A private brand check can be useful for validation that is tied to the class's actual private element, rather than to a writable public **constructor** property.

## Private static fields and methods

A private static field belongs to the class object and is accessible only from the declaring class body. It is not stored on instances.

~~~js
class ApiClient {
  static #createdCount = 0;

  static #nextId() {
    this.#createdCount += 1;
    return "client-" + this.#createdCount;
  }

  #id = ApiClient.#nextId();

  getId() {
    return this.#id;
  }

  static getCreatedCount() {
    return this.#createdCount;
  }
}

const first = new ApiClient();
const second = new ApiClient();

console.log(first.getId());
console.log(second.getId());
console.log(ApiClient.getCreatedCount());
~~~

Output:

~~~text
client-1
client-2
2
~~~

The static private counter belongs to **ApiClient**. Each instance has its own private **#id**, created by a private static method.

A private static element is accessed through the declaring class, not through an instance. Private static access also has a brand check, so using a subclass or an unrelated object as the receiver can fail unless the access is made through the declaring class itself. Inheritance details are covered in the next chapter.

## Static initialization blocks

A static initialization block is written as **static { ... }** inside a class. It runs once when the class definition is evaluated. Use it when setup needs multiple statements, control flow, or private static state.

~~~js
class Registry {
  static entries = [];

  static {
    this.entries.push("registry ready");
  }

  static add(name) {
    this.entries.push(name);
  }
}

Registry.add("users");
Registry.add("products");

console.log(Registry.entries);
~~~

Output:

~~~text
[ 'registry ready', 'users', 'products' ]
~~~

The block runs once during class evaluation. In this static block, **this** refers to the class object. The public static field is initialized first because it appears earlier in the class body.

A static block can use private names from its class:

~~~js
class Configuration {
  static #values = {};

  static {
    this.#values.mode = "safe";
    this.#values.retries = 3;
  }

  static get(key) {
    return this.#values[key];
  }
}

console.log(Configuration.get("mode"));
console.log(Configuration.get("retries"));
~~~

Output:

~~~text
safe
3
~~~

The private data and setup logic remain inside the class definition.

## Static initialization order

Static fields and static blocks run in the order in which they appear in the class body. Each one runs once when the class is evaluated.

~~~js
class Startup {
  static events = [];

  static {
    this.events.push("first block");
  }

  static phase = (this.events.push("field"), "ready");

  static {
    this.events.push(this.phase);
  }
}

console.log(Startup.events);
~~~

Output:

~~~text
[ 'first block', 'field', 'ready' ]
~~~

The **events** field is initialized first. The first block runs next. Then **phase** runs its initializer, and the last block reads the initialized **phase** value.

If a static initializer or block throws, evaluation of the class fails and the error propagates. Keep static setup focused and predictable.

## Static blocks have their own scope

A static block is a statement block, so its local declarations stay inside that block. They do not become properties of the class automatically.

~~~js
class Setup {
  static result;

  static {
    const prefix = "item";
    let count = 2;
    this.result = prefix + "-" + count;
  }
}

console.log(Setup.result);
console.log(Object.hasOwn(Setup, "prefix"));
~~~

Output:

~~~text
item-2
false
~~~

The block uses local variables to calculate a static value. Only the explicit assignment to **this.result** creates a public property on the class.

## Static fields and private fields are not interchangeable

Static and private describe different things:

- **static** says the element belongs to the class object rather than to each instance.
- **#privateName** says the element can only be accessed from the declaring class body.

An element can be both static and private:

~~~js
class Cache {
  static #entries = new Map();

  static set(key, value) {
    this.#entries.set(key, value);
  }

  static get(key) {
    return this.#entries.get(key);
  }
}

Cache.set("theme", "dark");

console.log(Cache.get("theme"));
console.log(Object.hasOwn(Cache, "#entries"));
~~~

Output:

~~~text
dark
false
~~~

The name **#entries** is not a string property on **Cache**. It is a private static element. Public code can use the class's public methods without accessing that element directly.

## Private fields and proxies

A proxy around an instance is a different object and does not automatically carry the target's private brand. Calling a method that reads a private field with the proxy as **this** can therefore fail.

~~~js
class SecretBox {
  #secret = "hidden";

  reveal() {
    return this.#secret;
  }
}

const box = new SecretBox();
const proxy = new Proxy(box, {});

console.log(box.reveal());

try {
  proxy.reveal();
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
hidden
true
~~~

The proxy forwards ordinary property operations, but private brand checks are not ordinary property lookups. The method call uses the proxy as **this**, and the proxy does not have the **SecretBox** private brand.

If a proxy wrapper must call a private-field method, design the wrapper deliberately so the method receives the branded target as its receiver. Do not assume a proxy behaves identically for private elements.

## Common mistakes

### Calling a static method on an instance

Static methods belong to the class. Call **ClassName.method()**, not **instance.method()**.

### Expecting a static field on each instance

A static field is a property of the class object. It is not copied to instances.

### Treating a private name as a string key

**#balance** is not the string **"balance"** or **"#balance"**. Reflection APIs and bracket notation cannot access it.

### Trying to access a private element outside its class

Private names must be declared in the class body, and code outside that class cannot use them. Expose a public method or accessor when external code needs controlled access.

### Assuming an underscore provides privacy

A property named **_balance** is still public. Only the **#name** syntax declares a private element.

### Using private fields as though they are inherited public properties

A private name belongs to the class that declares it. A subclass cannot access a parent's private name by simply writing that name in its own body. Share behavior through parent methods or use another designed interface.

### Expecting static blocks to run for every instance

A static block runs once when the class is evaluated. Put per-instance setup in fields or the constructor.

### Ignoring static element order

Static fields and blocks run in textual order. A block cannot rely on a later static field already being initialized.

### Assuming a proxy carries a private brand

The proxy is a distinct object. A private field access using the proxy as **this** can fail even if the proxy wraps an instance that has the private field.

## Try it yourself

1. Add a static **count** field that increments whenever a class instance is constructed.
2. Add a static factory method that parses text and returns an instance.
3. Store an account balance in a private field and expose validated deposit and withdrawal methods.
4. Add a private helper method and call it only from public class methods.
5. Create a private getter and setter that validate a value.
6. Use **#field in value** inside a static method to check whether an object has the class's private brand.
7. Add a private static cache and public static methods to read and write it.
8. Use two static blocks and a static field to record initialization order.
9. Add a static block that derives a configuration value from local variables.
10. Wrap an instance with a proxy and observe what happens when a method reads a private field.
11. Compare **Object.keys(instance)** with a class that has only private fields.
12. Explain the difference between a private instance field and a private static field.

## Key points

- Instance fields belong to each instance. Static fields belong to the class object.
- Static methods are called on the class and can work with static state.
- Private names begin with **#** and are accessible only within their declaring class body.
- Private elements are not ordinary string-keyed properties and do not appear in reflection key lists.
- Private methods and accessors let a class keep helper behavior or validation internal.
- **#name in value** checks for a private brand from within the declaring class.
- Static private elements belong to the class object, not its instances.
- Static initialization blocks run once during class evaluation and can access private names.
- Static fields and blocks execute in the order they appear.
- A proxy is a different object and does not automatically have its target's private brand.
- Inheritance behavior for static and private elements is explored in the next chapter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [61 - Classes: fields and methods](061-classes-fields-and-methods.md) | [Open Q&A](../qnas/062-static-fields-private-elements-and-initialization-blocks.md) | [Open example](../examples/062-static-fields-private-elements-and-initialization-blocks.md) | [63 - Inheritance, extends, and super](063-inheritance-extends-and-super.md) |
