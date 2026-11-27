# 62 - Static fields, private elements, and initialization blocks: Q&A

This question set reviews static data, private fields and methods, private brand checks, and static initialization blocks. Each answer follows its question, with explanations and code outputs where useful.

## Multiple-choice questions

### 1. Where is a static field stored?

A. On every instance separately  
B. On the class object  
C. On **Object.prototype**  
D. In the constructor's local scope  

**Answer: B.** A static field belongs to the class object. Instances do not receive it as an instance field.

### 2. Where is a private instance field such as **#balance** stored conceptually?

A. As a normal public string property named **"balance"**  
B. As a private element associated with each initialized instance  
C. On the class's public prototype  
D. As a global variable  

**Answer: B.** Private elements are not ordinary string-keyed properties. Each instance initialized by the class receives the private field.

### 3. Where can code access a private name declared in a class?

A. Anywhere that has a reference to the instance  
B. From the declaring class body  
C. Through bracket notation  
D. Through **Object.getOwnPropertyNames**  

**Answer: B.** Private names are lexically scoped to the class body that declares them. Outside code cannot access them through normal object reflection.

### 4. What does **#token in value** check inside the declaring class?

A. Whether the string **"#token"** is an own property  
B. Whether **value** has that class's private brand  
C. Whether **value** is a subclass  
D. Whether **value.token** is truthy  

**Answer: B.** The syntax checks for the private element declared by the class. The right-hand value must be an object.

### 5. When does a static initialization block run?

A. Once for every instance  
B. Once when the class is evaluated  
C. Every time a static method is called  
D. Only when an instance reads a static field  

**Answer: B.** A static block runs once as part of evaluating the class definition.

### 6. In a static block, what does **this** refer to?

A. The first instance of the class  
B. The class object  
C. **Object.prototype**  
D. **undefined** in all cases  

**Answer: B.** A static initialization block uses the class object as **this**.

### 7. What happens when a private field name is used through ordinary reflection?

A. It appears as a string key with a **#** prefix.  
B. It appears as a symbol key.  
C. It does not appear as an ordinary property key.  
D. Reflection automatically makes it public.  

**Answer: C.** Private elements are not ordinary property keys, so APIs such as **Object.keys** do not list them.

### 8. Does **Object.freeze(instance)** prevent a method from changing the instance's private field?

A. Yes, private fields become non-writable properties.  
B. No, private elements are not ordinary properties affected by freezing.  
C. Only if the field is numeric.  
D. Only if the class has no constructor.  

**Answer: B.** **Object.freeze** changes ordinary property descriptors. Private elements are not property descriptors, so class methods can still update private state.

### 9. Why can a proxy around an instance fail when a method accesses a private field?

A. A proxy always removes public methods.  
B. The proxy is a different object and does not automatically have the target's private brand.  
C. Private fields require an array.  
D. **Object.freeze** is applied automatically to proxies.  

**Answer: B.** If the method receives the proxy as **this**, a private brand check on that proxy can fail even though its target is an initialized instance.

### 10. Which statement distinguishes **static** and **private**?

A. They mean the same thing.  
B. **static** describes whether an element belongs to the class or an instance; **private** describes where its name is accessible.  
C. **private** means an element belongs to every instance.  
D. **static** means an element is hidden from all code.  

**Answer: B.** An element can be static, private, both, or neither. These keywords describe different aspects.

## True or false

### 11. A static field is copied onto every new instance.

**Answer: False.** A static field belongs to the class object, not to its instances.

### 12. An instance private field is an ordinary property that can be read with bracket notation.

**Answer: False.** A private field is not a string-keyed property. It must be accessed using its declared private name from within the class body.

### 13. Private names appear in **Object.keys** and **Object.getOwnPropertyNames**.

**Answer: False.** Those APIs list ordinary property keys. Private elements are not ordinary properties.

### 14. A static initialization block runs for each instance.

**Answer: False.** It runs once when the class is evaluated.

### 15. A private method can access a private field on another instance of the same declaring class.

**Answer: True.** The method can access that private name on any object carrying the same class's private brand, including another instance.

### 16. A subclass can directly access a parent's private field by writing the same **#name** in its own body.

**Answer: False.** A private name belongs to the class body that declares it. A child uses a public or protected-by-convention parent method to work with parent state.

### 17. Freezing an instance also freezes its private fields.

**Answer: False.** Private elements are not ordinary own property descriptors. A class method can still update private state after the instance is frozen.

### 18. Static fields and static blocks initialize in their textual order.

**Answer: True.** Static elements are evaluated in order as the class definition is evaluated.

### 19. A proxy automatically carries the private brand of its target.

**Answer: False.** A proxy is a separate object. It does not automatically have the target's private elements.

### 20. A private static field belongs to each instance.

**Answer: False.** A private static element belongs to the class object and is accessed only from its declaring class body.

## Short-answer questions

### 21. What is the difference between an instance field and a static field?

**Answer:** An instance field belongs to each object created from the class. A static field belongs to the class object and is shared class-level state.

### 22. What does the **#** prefix mean in a class element name?

**Answer:** It declares a private name. The name can only be used in the class body that declares it, and it is not an ordinary string property key.

### 23. How can outside code use data stored privately?

**Answer:** The class can expose public methods or accessors that provide controlled reads and updates. Outside code should use that public interface rather than access the private name directly.

### 24. What does a private brand check do?

**Answer:** The expression **#field in value**, inside the declaring class, checks whether **value** has that class's private element. It is not the same as checking a public property name.

### 25. Why should a private brand check guard against null or primitive inputs?

**Answer:** The right side of **in** must be an object. A method should check the input type first if it may receive **null** or a primitive.

### 26. What is a static initialization block useful for?

**Answer:** It runs once during class evaluation and can perform multi-statement setup for the class, including initialization that depends on private static state.

### 27. What object is **this** inside a static method called as **ClassName.method()**?

**Answer:** The class object is the receiver, so **this** refers to **ClassName** in that call. If the method is detached or called with a different receiver, **this** may be different.

### 28. Are private elements included in property descriptors?

**Answer:** No. Private elements are not ordinary object properties, so property descriptor APIs do not expose them.

### 29. What happens to private fields if an instance is frozen?

**Answer:** Freezing affects ordinary property descriptors, not private elements. Methods in the class can still change private fields.

### 30. Why can a method that accesses a private field fail when called through a proxy?

**Answer:** The method may receive the proxy as **this**. The proxy is not automatically branded as an instance of the declaring class, so the private access throws a **TypeError**.

## Predict the output

### 31. Which object owns the static count?

~~~js
class Visitor {
  static count = 0;

  constructor(name) {
    this.name = name;
    Visitor.count += 1;
  }
}

const first = new Visitor("Asha");
const second = new Visitor("Dev");

console.log(Visitor.count);
console.log(Object.hasOwn(Visitor, "count"));
console.log(Object.hasOwn(first, "count"));
~~~

**Answer:**

~~~text
2
true
false
~~~

**Explanation:** The static field is an own property of the class object. It is not an own property of either visitor instance.

### 32. Can reflection list a private instance field?

~~~js
class Account {
  #balance = 10;

  read() {
    return this.#balance;
  }
}

const account = new Account();

console.log(account.read());
console.log(Object.keys(account));
console.log(Object.getOwnPropertyNames(account));
~~~

**Answer:**

~~~text
10
[]
[]
~~~

**Explanation:** **#balance** can be used by the class, but it is not an ordinary property key reported by these reflection methods.

### 33. Do static elements run in declaration order?

~~~js
class Startup {
  static events = [];

  static {
    this.events.push("block");
  }

  static phase = (this.events.push("field"), "ready");

  static {
    this.events.push(this.phase);
  }
}

console.log(Startup.events);
~~~

**Answer:**

~~~text
[ 'block', 'field', 'ready' ]
~~~

**Explanation:** The static field and blocks run in source order as the class is evaluated.

### 34. Does an instance method still update private state after freezing?

~~~js
class Counter {
  #value = 0;

  increment() {
    this.#value += 1;
  }

  read() {
    return this.#value;
  }
}

const counter = Object.freeze(new Counter());
counter.increment();

console.log(counter.read());
~~~

**Answer:**

~~~text
1
~~~

**Explanation:** **Object.freeze** does not freeze private elements because they are not ordinary property descriptors. The class method can still update **#value**.

### 35. Does the private brand check accept an unrelated object?

~~~js
class Session {
  #token;

  constructor(token) {
    this.#token = token;
  }

  static hasBrand(value) {
    return value !== null
      && typeof value === "object"
      && #token in value;
  }
}

console.log(Session.hasBrand(new Session("x")));
console.log(Session.hasBrand({ token: "x" }));
console.log(Session.hasBrand(null));
~~~

**Answer:**

~~~text
true
false
false
~~~

**Explanation:** A public property named **token** does not give an object the private brand. The type checks avoid using **in** on **null**.

### 36. Does a private method appear on the instance?

~~~js
class Order {
  #status = "new";

  #isPaid() {
    return this.#status === "paid";
  }

  markPaid() {
    this.#status = "paid";
  }

  isPaid() {
    return this.#isPaid();
  }
}

const order = new Order();

console.log(order.isPaid());
console.log(Object.keys(order));
order.markPaid();
console.log(order.isPaid());
~~~

**Answer:**

~~~text
false
[]
true
~~~

**Explanation:** The private method and field are available inside the class but do not appear as ordinary enumerable instance keys.

### 37. Can one instance compare another instance's private value?

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

console.log(redA.matches(redB));
console.log(redA.matches({ value: "red" }));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The method is inside **Color**, so it can read **#value** from another object with the same private brand. The guard prevents accessing it on an unrelated object.

### 38. Can an instance call a private static method?

~~~js
class Api {
  static #format(value) {
    return "api:" + value;
  }

  static label(value) {
    return this.#format(value);
  }
}

const instance = new Api();

console.log(Api.label("ready"));
console.log(typeof instance.label);
~~~

**Answer:**

~~~text
api:ready
undefined
~~~

**Explanation:** The static method and private static method belong to the class object. The instance does not receive **label**.

### 39. Does a proxy have the target instance's private brand?

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

**Answer:**

~~~text
hidden
true
~~~

**Explanation:** The proxy forwards ordinary method lookup, but the call's receiver is the proxy. The proxy does not carry the target's private brand.

### 40. Can a private static field be accessed from an instance?

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
~~~

**Answer:**

~~~text
2
false
~~~

**Explanation:** The private static field belongs to the class. The string **"#size"** is not a public property on the instance.

## Coding questions

### 41. Create an account with a private balance and validated deposit method.

**Answer:**

~~~js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new RangeError("Deposit must be positive.");
    }

    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

console.log(account.deposit(20));
console.log(account.getBalance());
~~~

Output:

~~~text
20
20
~~~

**Explanation:** The private balance can only be read or changed through class methods. The deposit method validates input before updating it.

### 42. Add a private helper method.

**Answer:**

~~~js
class Order {
  #status = "new";

  #isAllowed(status) {
    return status === "paid" || status === "cancelled";
  }

  update(status) {
    if (!this.#isAllowed(status)) {
      throw new RangeError("Unsupported status.");
    }

    this.#status = status;
  }

  readStatus() {
    return this.#status;
  }
}

const order = new Order();
order.update("paid");

console.log(order.readStatus());
~~~

Output:

~~~text
paid
~~~

**Explanation:** The helper method is private and can only be called by code inside **Order**.

### 43. Add a private getter and setter.

**Answer:**

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

**Explanation:** The private accessor controls access to the underlying private value. The class exposes public operations instead of the private name.

### 44. Add a static field and a static method.

**Answer:**

~~~js
class IdGenerator {
  static next = 0;

  static create() {
    this.next += 1;
    return "id-" + this.next;
  }
}

console.log(IdGenerator.create());
console.log(IdGenerator.create());
~~~

Output:

~~~text
id-1
id-2
~~~

**Explanation:** The static field and method belong to the class object. The method updates the static counter through **this**.

### 45. Check for the class's private brand safely.

**Answer:**

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

console.log(Session.hasSessionBrand(new Session("t-9")));
console.log(Session.hasSessionBrand({}));
~~~

Output:

~~~text
true
false
~~~

**Explanation:** The private brand check is written inside the declaring class. The guards ensure the right side of **in** is an object.

### 46. Initialize a class registry in a static block.

**Answer:**

~~~js
class Registry {
  static entries = [];

  static {
    this.entries.push("ready");
  }

  static add(name) {
    this.entries.push(name);
  }
}

Registry.add("users");

console.log(Registry.entries);
~~~

Output:

~~~text
[ 'ready', 'users' ]
~~~

**Explanation:** The static field initializes first. The block then runs once during class evaluation and adds its initial entry.

### 47. Keep static block variables local.

**Answer:**

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

Output:

~~~text
task-3
false
~~~

**Explanation:** The variables are local to the static block. Only the explicit assignment to **this.result** creates a public property on the class object.

### 48. Show that Object.freeze does not freeze private state.

**Answer:**

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

Output:

~~~text
1
~~~

**Explanation:** Freezing prevents changes to ordinary property descriptors. Private elements are separate from those descriptors and remain changeable by class methods.

### 49. Store a private static cache.

**Answer:**

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
~~~

Output:

~~~text
dark
~~~

**Explanation:** The cache belongs to the class and is private. Public static methods provide controlled access to it.

### 50. Use a static block to compute configuration once.

**Answer:**

~~~js
class Configuration {
  static settings;

  static {
    const retries = 3;
    const mode = "safe";

    this.settings = {
      retries,
      mode
    };
  }
}

console.log(Configuration.settings.retries);
console.log(Configuration.settings.mode);
~~~

Output:

~~~text
3
safe
~~~

**Explanation:** The block performs multi-step setup once when the class is evaluated. Its local variables do not become class properties.

## Review checklist

Before moving on, make sure you can explain:

- What belongs to the class object and what belongs to each instance.
- Why a private name is not a regular string property.
- How class methods provide controlled access to private state.
- How a private brand check differs from checking a public property.
- Why frozen objects can still have changing private state.
- Why a proxy can fail a private brand check.
- When static initialization blocks run and how their order relates to static fields.
- Why a static block's local variables do not automatically become class properties.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [61 - Classes: fields and methods](../lessons/061-classes-fields-and-methods.md) | [Open lesson](../lessons/062-static-fields-private-elements-and-initialization-blocks.md) | [Open example](../examples/062-static-fields-private-elements-and-initialization-blocks.md) | [63 - Inheritance, extends, and super](../lessons/063-inheritance-extends-and-super.md) |
