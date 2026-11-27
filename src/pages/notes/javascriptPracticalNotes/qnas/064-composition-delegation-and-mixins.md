# 64 - Composition, delegation, and mixins: Q&A

This question set reviews ways to combine JavaScript behavior without relying on a deep inheritance hierarchy. Each answer follows its question and explains the reasoning.

## Multiple-choice questions

### 1. What does composition usually describe?

- A. An object is always a subtype of another object.
- B. An object is built from or works with other independent parts.
- C. A function is copied into every object automatically.
- D. An object has no methods.

**Answer: B.** Composition connects parts through explicit references, such as a cart holding a pricing service. The cart has or uses the service; it is not necessarily a kind of service.

### 2. What does delegation mean?

- A. Forwarding a responsibility to another object that performs it.
- B. Copying every property from the global object.
- C. Converting a class into a function.
- D. Calling a parent constructor twice.

**Answer: A.** A coordinator can decide when a task is needed and delegate the task itself to a collaborator that owns that behavior.

### 3. In a call such as **this.logger.log(message)**, what is **this** inside a normal **log** method?

- A. The object referenced by **this.logger**
- B. The object referenced by **this** in the outer method
- C. The global object in every JavaScript mode
- D. The class constructor

**Answer: A.** The method is called as a member of the logger object, so the logger is its receiver. This is why keeping the member call matters for methods that use **this**.

### 4. What does **Object.create(proto)** do?

- A. Copies all of **proto**'s properties onto a new object.
- B. Creates an object whose prototype is **proto**.
- C. Converts **proto** into a class.
- D. Creates an object with no prototype in every case.

**Answer: B.** Property lookup on the new object can continue through **proto**. The inherited properties are not copied onto the new object as own properties.

### 5. What does **Object.assign(target, source)** do with source properties?

- A. Creates a prototype relationship between the objects.
- B. Copies enumerable own property values onto the target.
- C. Deep-copies every nested object.
- D. Copies inherited properties only.

**Answer: B.** It copies enumerable own properties. The operation is shallow, so a nested object value remains a shared reference.

### 6. How many direct base classes can a JavaScript class extend?

- A. One
- B. Two
- C. Any number
- D. None

**Answer: A.** A class has one direct **extends** value. Composition can supply behavior from multiple independent collaborators.

### 7. What is a class mixin factory commonly written to return?

- A. A class that extends the class it receives
- B. A JSON string
- C. A new global variable
- D. A promise that contains the base class

**Answer: A.** A class mixin factory can receive a base class and return a new class that adds focused behavior.

### 8. If two object mixins contain the same property name and are assigned in order, what happens?

- A. JavaScript merges the functions automatically.
- B. The property from the later source overwrites the earlier copied property.
- C. The target gets two properties with the same name.
- D. The assignment always throws a syntax error.

**Answer: B.** An object can have only one own property with a given key. A later assignment replaces the earlier value for that key.

### 9. Where should mutable state usually live in a composed design?

- A. Everywhere that needs it
- B. In one clearly responsible owner, exposed through deliberate operations
- C. In a global variable
- D. In every mixin that reads it

**Answer: B.** Clear ownership reduces accidental mutations and makes the data contract easier to follow.

### 10. Which relationship is the clearest fit for composition?

- A. An administrator is a user, with an independent audit log collaborator.
- B. A square is a shape.
- C. A dog is an animal.
- D. A button is an input control.

**Answer: A.** The administrator can be a specialized user, while the audit log is an independent capability it uses. A design may combine inheritance for the specialization and composition for the collaborator.

## True or false

### 11. A composed object can use a collaborator without inheriting from it.

**Answer: True.** A property reference such as **this.pricing** is enough to call the collaborator's operations.

### 12. Calling a normal method as **object.method()** supplies **object** as the method's receiver.

**Answer: True.** A member call establishes the receiver for a normal method. Arrow functions do not create their own **this** binding.

### 13. Extracting a normal method into a variable always preserves the original object as **this**.

**Answer: False.** A standalone function call does not retain the former member receiver. Use **bind**, a closure, or an argument-based function if the receiver must be preserved.

### 14. **Object.create(proto)** copies the prototype's methods as own properties.

**Answer: False.** It sets the new object's prototype. The new object can find inherited methods through lookup, but does not own those methods by that fact alone.

### 15. **Object.assign** recursively clones nested objects.

**Answer: False.** It copies property values one level deep. Nested objects and arrays are copied as references.

### 16. A class mixin adds another layer to the prototype chain.

**Answer: True.** A mixin factory that returns a class extending its input creates another class and prototype layer.

### 17. Mixins cannot have name collisions because they are reusable.

**Answer: False.** Reusability does not prevent collisions. Object assignment can overwrite a key, and class layers can shadow methods from lower layers.

### 18. Composition and inheritance can be used together in one design.

**Answer: True.** A class can extend a meaningful base type and hold independent collaborators as properties.

## Predict the output

### 19. Which receiver does the delegated method use?

~~~js
const meter = {
  value: 4,
  read() {
    return this.value;
  }
};

const dashboard = {
  meter,
  readMeter() {
    return this.meter.read();
  }
};

console.log(dashboard.readMeter());
~~~

**Answer:**

~~~text
4
~~~

**Explanation:** The call is **this.meter.read()**, so **meter** is the receiver inside **read**.

### 20. What is printed after the method is extracted?

~~~js
const box = {
  value: "inside",
  read() {
    return this.value;
  }
};

const read = box.read;
console.log(read.call({ value: "other" }));
~~~

**Answer:**

~~~text
other
~~~

**Explanation:** **call** deliberately supplies the receiver object. Extracting the function did not bind it to **box**.

### 21. Is **greet** an own property of **person**?

~~~js
const greeter = {
  greet() {
    return "Hi " + this.name;
  }
};

const person = Object.create(greeter);
person.name = "Lee";

console.log(person.greet());
console.log(Object.hasOwn(person, "greet"));
~~~

**Answer:**

~~~text
Hi Lee
false
~~~

**Explanation:** Lookup finds **greet** on the prototype. The call still uses **person** as the receiver, and the method is not an own property of **person**.

### 22. What values are printed after copying this object?

~~~js
const shared = { count: 1 };
const original = { data: shared };
const copy = Object.assign({}, original);

copy.data.count = 5;
console.log(original.data.count);
console.log(copy.data === original.data);
~~~

**Answer:**

~~~text
5
true
~~~

**Explanation:** The outer object was copied, but its **data** value is the same nested object reference in both objects.

### 23. Which description matches the output?

~~~js
const first = { run() { return "first"; } };
const second = { run() { return "second"; } };
const service = Object.assign({}, first, second);

console.log(service.run());
~~~

**Answer:**

~~~text
second
~~~

**Explanation:** Sources are assigned from left to right. The later **run** property replaces the earlier one on the target.

### 24. Which class method is selected?

~~~js
const withLabel = (Base) =>
  class extends Base {
    describe() {
      return "label";
    }
  };

const withStatus = (Base) =>
  class extends Base {
    describe() {
      return "status";
    }
  };

class Item {}
class Combined extends withStatus(withLabel(Item)) {}

console.log(new Combined().describe());
~~~

**Answer:**

~~~text
status
~~~

**Explanation:** **Combined** extends the class returned by **withStatus**. Its **describe** method is found first and shadows the method from the lower class layer.

### 25. What value is printed?

~~~js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());
console.log(counter.increment());
~~~

**Answer:**

~~~text
1
2
~~~

**Explanation:** The returned object methods close over one private **count** binding. Both calls update the same state owned by that counter.

### 26. Does the copied method use the target object?

~~~js
const methods = {
  describe() {
    return this.name;
  }
};

const item = { name: "Map" };
Object.assign(item, methods);

console.log(item.describe());
~~~

**Answer:**

~~~text
Map
~~~

**Explanation:** The method is now an own property of **item**. Called as **item.describe()**, its receiver is **item**.

### 27. What does this prototype check print?

~~~js
const sharedBehavior = { active: true };
const record = Object.create(sharedBehavior);

console.log(record.active);
console.log(Object.hasOwn(record, "active"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** **active** is found through the prototype chain, not as an own property.

### 28. Which result is returned?

~~~js
const formatter = {
  prefix: "ID:",
  format(value) {
    return this.prefix + value;
  }
};

const formatForFormatter = formatter.format.bind(formatter);
console.log(formatForFormatter(7));
~~~

**Answer:**

~~~text
ID:7
~~~

**Explanation:** **bind** creates a function whose **this** is fixed to **formatter**.

## Short-answer questions

### 29. How is composition different from inheritance?

**Answer:** Composition connects an object to parts it uses. Inheritance makes an object or class a more specific form of another type and reuses behavior through a prototype relationship. Composition expresses **has-a** or **uses-a**; inheritance often expresses **is-a**.

### 30. How is delegation different from composition?

**Answer:** Composition describes the structure of using parts. Delegation describes forwarding an operation to another object. An object may be composed with a logger and delegate logging work to it.

### 31. Why should collaborators usually have small, clear interfaces?

**Answer:** A small interface tells the coordinator exactly what it can ask the collaborator to do. It limits hidden dependencies and makes it easier to replace the collaborator with another implementation.

### 32. How can a developer avoid a lost **this** receiver?

**Answer:** Keep calling the method through its object, for example **this.logger.log()**. If the function must be extracted, bind the intended object, wrap the call in a closure, or redesign it to receive needed values as parameters.

### 33. What does **Object.create** do that **Object.assign** does not?

**Answer:** **Object.create(proto)** sets **proto** as the new object's prototype. **Object.assign(target, source)** copies enumerable own property values to a target. One establishes lookup delegation; the other copies property values.

### 34. What is one benefit and one risk of prototype delegation?

**Answer:** It shares behavior without copying the method onto each object. A risk is that inherited behavior may be less visible, and an own property can shadow it. Inspect the prototype intentionally and use explicit collaborators when that makes dependencies clearer.

### 35. When can a mixin be useful?

**Answer:** A mixin can package one small capability that several otherwise related classes need, such as a focused method set. It should have clear requirements and avoid owning unrelated state.

### 36. Why can an object mixin overwrite behavior?

**Answer:** An object has one property value for a given key. **Object.assign** processes sources in order, so a later source with the same key replaces the value copied earlier.

### 37. What does "shallow copy" mean for an object?

**Answer:** The outer object's properties are copied, but values that refer to nested objects are not recursively copied. The source and copy can still refer to the same nested object.

### 38. How can a class use both inheritance and composition?

**Answer:** It can extend one base class for a genuine specialization and keep independent collaborators as instance properties. For example, an **Admin** can extend **User** and compose an **auditLog** service.

## Coding and design questions

### 39. Write a small object that composes a logger and delegates a message to it.

**Answer:**

~~~js
const logger = {
  log(message) {
    console.log("[app] " + message);
  }
};

const app = {
  logger,

  start() {
    this.logger.log("started");
  }
};

app.start();
~~~

Output:

~~~text
[app] started
~~~

**Explanation:** **app** keeps an explicit logger reference and delegates logging through a member call, preserving the logger receiver.

### 40. Create an inventory with private state and a list method that does not expose its internal array.

**Answer:**

~~~js
function createInventory() {
  const items = [];

  return {
    add(item) {
      items.push(item);
    },

    list() {
      return items.slice();
    }
  };
}

const inventory = createInventory();
inventory.add("Pen");

const visibleItems = inventory.list();
visibleItems.push("Book");

console.log(inventory.list().length);
~~~

Output:

~~~text
1
~~~

**Explanation:** **slice()** returns a new array. Changing the returned array does not add an item to the inventory's private array. If items were mutable objects, this would still be a shallow copy.

### 41. Create an object that delegates lookup to a prototype, then give it an own property that shadows an inherited one.

**Answer:**

~~~js
const defaults = { theme: "light" };
const settings = Object.create(defaults);

console.log(settings.theme);
settings.theme = "dark";
console.log(settings.theme);
console.log(Object.hasOwn(settings, "theme"));
~~~

Output:

~~~text
light
dark
true
~~~

**Explanation:** Initially, **theme** comes from the prototype. Assignment creates an own property on **settings**, which shadows the inherited property.

### 42. Write a class mixin that adds one method to a base class.

**Answer:**

~~~js
const withId = (Base) =>
  class extends Base {
    setId(id) {
      this.id = id;
    }
  };

class Record {}
class IdentifiedRecord extends withId(Record) {}

const record = new IdentifiedRecord();
record.setId("r-1");
console.log(record.id);
~~~

Output:

~~~text
r-1
~~~

**Explanation:** **withId** returns a class that extends its input with one focused method. Avoid stacking many mixins without a clear reason.

### 43. What design would you choose for a cart that uses a pricing calculator and a notifier?

**Answer:** Compose the cart with a pricing collaborator and a notifier collaborator. The cart can coordinate when to calculate or notify, while each collaborator owns its own operation.

~~~js
class Cart {
  constructor(pricing, notifier) {
    this.pricing = pricing;
    this.notifier = notifier;
    this.items = [];
  }

  add(item) {
    this.items.push(item);
    this.notifier.send("Added " + item.name);
  }

  total() {
    return this.pricing.total(this.items);
  }
}
~~~

**Explanation:** A cart is not a kind of pricing calculator or notifier. Explicit collaborators express the independent capabilities it uses.

### 44. Two mixins both define **save()**. What should you do?

**Answer:** First decide whether the operations are actually the same responsibility. If they are different, give them distinct names or keep them as separate collaborators, such as **draftStore.save()** and **backupStore.save()**. If one implementation intentionally replaces another, document the order and the reason.

**Explanation:** Silent overwriting or shadowing can hide behavior and make the result depend on mixin order.

### 45. When should a class use inheritance instead of composition?

**Answer:** Use inheritance when the child is genuinely a specialized form of the base and should honor its contract. Use composition when the object simply needs another independent capability. A design may use both when each relationship is clear.

## Review checklist

Before moving on, make sure you can explain:

- The difference between composition, delegation, prototype lookup, and property copying.
- Why a method call's receiver matters for **this**.
- How to keep mutable state under one clear owner.
- Why **Object.assign** is shallow and can create name collisions.
- What a class mixin factory adds to the class and prototype chain.
- When composition is clearer than another inheritance layer.
- How inheritance and composition can work together.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [63 - Inheritance, extends, and super](../lessons/063-inheritance-extends-and-super.md) | [Open lesson](../lessons/064-composition-delegation-and-mixins.md) | [Open example](../examples/064-composition-delegation-and-mixins.md) | [65 - Map and Set collections](../lessons/065-map-and-set-collections.md) |
