# 62 - Static fields, private elements, and initialization blocks: examples

These examples show how static and private class elements behave, how static blocks initialize class state, and where private names differ from ordinary properties. Each example includes a question, complete code, expected output, and an explanation.

## 1. Compare static and instance fields

### Question

Which object owns each field?

### Code

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

### Expected output

~~~text
Asha
Dev
2
true
true
false
~~~

### Explanation

Each instance owns its **name**. The class object owns the static **count** field. The static value is not copied onto the instances.

## 2. Update a static counter through a static method

### Question

How can class-level methods update class-level data?

### Code

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

### Expected output

~~~text
1
2
2
undefined
~~~

### Explanation

The calls use **VisitTracker** as the receiver, so **this.count** updates the class's static field. The instance does not get the static method.

## 3. Use a static factory method

### Question

How can a class create an instance from a different representation of its data?

### Code

~~~js
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    static fromFahrenheit(value) {
        return new Temperature((value - 32) * 5 / 9);
    }

    toFahrenheit() {
        return this.celsius * 9 / 5 + 32;
    }
}

const room = Temperature.fromFahrenheit(68);

console.log(room.celsius);
console.log(room.toFahrenheit());
console.log(typeof room.fromFahrenheit);
~~~

### Expected output

~~~text
20
68
undefined
~~~

### Explanation

The factory is called on the class and returns an instance. The static method is not an instance method.

## 4. Store an instance private field

### Question

Can a class method read private data that ordinary reflection cannot list?

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

const account = new Account();
account.deposit(25);

console.log(account.getBalance());
console.log(Object.keys(account));
console.log(Object.getOwnPropertyNames(account));
~~~

### Expected output

~~~text
25
[]
[]
~~~

### Explanation

The private field is available inside **Account**, but it is not an ordinary property key exposed by these reflection methods.

## 5. Protect a private value with validation

### Question

How can a class keep a private value within a valid range?

### Code

~~~js
class Meter {
    #value = 0;

    increase(amount) {
        if (!Number.isFinite(amount) || amount < 0) {
            throw new RangeError("Increase must be non-negative.");
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

### Expected output

~~~text
true
4
~~~

### Explanation

The class controls all updates through **increase**. Invalid input is rejected before the private state changes.

## 6. Use a private helper method

### Question

How can a class keep helper behavior internal?

### Code

~~~js
class Order {
    #status = "new";

    #isAllowed(nextStatus) {
        return nextStatus === "paid" || nextStatus === "cancelled";
    }

    updateStatus(nextStatus) {
        if (!this.#isAllowed(nextStatus)) {
            throw new RangeError("Unsupported status.");
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
console.log(Object.keys(order));
~~~

### Expected output

~~~text
paid
[]
~~~

### Explanation

Both the private field and private helper method can be used inside **Order**. They are not ordinary enumerable keys on the instance.

## 7. Validate a value with a private accessor

### Question

Can a private getter and setter control access to private data?

### Code

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

### Expected output

~~~text
5
~~~

### Explanation

The private accessor pair is only used inside the class. The public methods provide controlled operations for outside code.

## 8. Check a private brand

### Question

How can a class verify that an object has one of its private elements?

### Code

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
console.log(Session.hasSessionBrand({ token: "t-9" }));
console.log(Session.hasSessionBrand(null));
~~~

### Expected output

~~~text
true
false
false
~~~

### Explanation

The private brand check is written inside **Session**. A public property named **token** does not give an object the private brand. The guards also keep **in** from receiving **null**.

## 9. Compare private state across same-class instances

### Question

Can an instance method inspect the private value of another instance of the same class?

### Code

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

### Expected output

~~~text
true
false
false
~~~

### Explanation

The method runs inside **Color**, so it can access **#value** on another object carrying the same class's private brand. The guard prevents access on an unrelated object.

## 10. Keep a counter in a private static field

### Question

How can a class share a private counter across all its instances?

### Code

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

### Expected output

~~~text
client-1
client-2
2
~~~

### Explanation

The private static counter and helper belong to **ApiClient**. Every instance receives its own private **#id** from the shared counter.

## 11. Run a static block once

### Question

How can a class perform initial setup exactly once when it is defined?

### Code

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

console.log(Registry.entries);
~~~

### Expected output

~~~text
[ 'registry ready', 'users' ]
~~~

### Explanation

The static block runs once as the class is evaluated. It uses the class object as **this** and can initialize public static state.

## 12. Observe the order of static fields and blocks

### Question

Do static fields and blocks run in the order they appear?

### Code

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

### Expected output

~~~text
[ 'first block', 'field', 'ready' ]
~~~

### Explanation

The static elements run in source order. **events** is initialized first, then the first block, then **phase**, then the last block.

## 13. Initialize private static state in a static block

### Question

Can a static initialization block access private static fields?

### Code

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

### Expected output

~~~text
safe
3
~~~

### Explanation

The block runs inside the class definition and can use its private static name. Public static methods expose the intended reads.

## 14. Keep static-block variables local

### Question

Do local variables declared in a static block become class properties?

### Code

~~~js
class Setup {
    static result;

    static {
        const prefix = "task";
        const count = 3;
        this.result = prefix + "-" + count;
    }
}

console.log(Setup.result);
console.log(Object.hasOwn(Setup, "prefix"));
~~~

### Expected output

~~~text
task-3
false
~~~

### Explanation

The variables remain local to the block. Only the explicit assignment creates the public static **result** property.

## 15. Freeze an instance and update its private field

### Question

Does **Object.freeze** prevent a class method from changing a private field?

### Code

~~~js
class Score {
    #value = 0;

    increase() {
        this.#value += 1;
    }

    read() {
        return this.#value;
    }
}

const score = Object.freeze(new Score());
score.increase();

console.log(score.read());
~~~

### Expected output

~~~text
1
~~~

### Explanation

Freezing affects ordinary property descriptors. Private elements are not ordinary descriptors, so the class method can still update **#value**.

## 16. Store a private static cache

### Question

How can static methods expose controlled access to a private static collection?

### Code

~~~js
class Cache {
    static #values = new Map();

    static set(key, value) {
        this.#values.set(key, value);
    }

    static get(key) {
        return this.#values.get(key);
    }
}

Cache.set("theme", "dark");

console.log(Cache.get("theme"));
console.log(Object.hasOwn(Cache, "#values"));
~~~

### Expected output

~~~text
dark
false
~~~

### Explanation

The collection belongs privately to the class. The string **"#values"** is not a public property; the class's static methods provide access.

## 17. See why a proxy does not carry a private brand

### Question

Can a proxy around an instance call a method that reads a private field?

### Code

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

### Expected output

~~~text
hidden
true
~~~

### Explanation

The method lookup is forwarded, but **this** is the proxy. The proxy is a different object and does not automatically have the target's **SecretBox** private brand.

## 18. A private field is not a string or symbol key

### Question

Can property key reflection discover a private field?

### Code

~~~js
class Vault {
    #secret = "hidden";
}

const vault = new Vault();

console.log(Object.keys(vault));
console.log(Object.getOwnPropertyNames(vault));
console.log(Object.getOwnPropertySymbols(vault));
~~~

### Expected output

~~~text
[]
[]
[]
~~~

### Explanation

Private elements are not ordinary string-keyed or symbol-keyed properties. These reflection methods cannot list them.

## 19. A private static field is not on instances

### Question

Can an instance read a private static value through ordinary property access?

### Code

~~~js
class Registry {
    static #size = 2;

    static getSize() {
        return this.#size;
    }
}

const registry = new Registry();

console.log(Registry.getSize());
console.log(Object.hasOwn(registry, "#size"));
console.log(typeof registry.getSize);
~~~

### Expected output

~~~text
2
false
undefined
~~~

### Explanation

The private static field and public static method belong to the class object. They are not instance members.

## 20. Guard the right side of a private brand check

### Question

Why should an input be checked before using **#field in value**?

### Code

~~~js
class Token {
    #value;

    constructor(value) {
        this.#value = value;
    }

    static hasBrand(value) {
        if (value === null || typeof value !== "object") {
            return false;
        }

        return #value in value;
    }
}

console.log(Token.hasBrand(new Token("x")));
console.log(Token.hasBrand(5));
console.log(Token.hasBrand(null));
~~~

### Expected output

~~~text
true
false
false
~~~

### Explanation

The right operand of **in** must be an object. The guard returns before the private brand expression for **null** and primitive values.

## 21. Static block errors stop class evaluation

### Question

What happens if a static initialization block throws?

### Code

~~~js
let created = false;

try {
    class Broken {
        static {
            throw new Error("setup failed");
        }
    }

    created = true;
} catch (error) {
    console.log(error instanceof Error);
}

console.log(created);
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The error propagates while the class definition is evaluated. Execution does not reach the assignment that marks the class as created.

## 22. Use private data without exposing a mutable field

### Question

How can a class expose a read-only view of private state?

### Code

~~~js
class Cart {
    #items = [];

    add(item) {
        this.#items.push(item);
    }

    get itemCount() {
        return this.#items.length;
    }
}

const cart = new Cart();
cart.add("Notebook");
cart.add("Pen");

console.log(cart.itemCount);
console.log(Object.hasOwn(cart, "itemCount"));
~~~

### Expected output

~~~text
2
false
~~~

### Explanation

The getter is on the prototype and reads private state from the instance. Outside code can observe the count but cannot access the private array directly.

## Practice prompts

1. Add a static **count** field and increment it from the constructor.
2. Use a private field for an account balance and expose validated deposit and withdrawal methods.
3. Add a private helper method and call it only from public class methods.
4. Add a private getter and setter that validate a value.
5. Write a static method that checks for the class's private brand.
6. Add a private static cache and public static read and write methods.
7. Use multiple static fields and blocks to record evaluation order.
8. Freeze an instance that has private state and compare ordinary properties with private data.
9. Wrap a private-field instance with a proxy and explain why the method call fails.
10. Use a static block to compute a class configuration from local values.

## Key points

- Static fields and methods belong to the class object, not to instances.
- Private fields, methods, and accessors use names beginning with **#**.
- Private elements cannot be accessed through string keys or ordinary reflection APIs.
- A class method can read a private element on another object with the same private brand.
- **#name in object** checks a private brand from inside the declaring class.
- **Object.freeze** does not freeze private fields.
- A proxy does not automatically carry the private brand of its target.
- Static initialization blocks run once as the class is evaluated.
- Static fields and blocks execute in the order they appear.
- A static block can access private names and can keep local variables inside its own scope.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [61 - Classes: fields and methods](../lessons/061-classes-fields-and-methods.md) | [Open lesson](../lessons/062-static-fields-private-elements-and-initialization-blocks.md) | [Open Q&A](../qnas/062-static-fields-private-elements-and-initialization-blocks.md) | [63 - Inheritance, extends, and super](../lessons/063-inheritance-extends-and-super.md) |
