# 64 - Composition, delegation, and mixins

Inheritance models an "is-a" relationship: a specialized type extends a more general type. Composition models a "has-a" relationship: an object gets work done by keeping references to other objects or functions. Delegation means forwarding a responsibility to another object. A mixin adds a reusable set of behavior to a class or object without making that behavior its single direct parent.

These techniques help combine independent capabilities without building a deep class hierarchy. They are not rules that prohibit inheritance. Choose the relationship that makes the code easiest to understand and change.

## Learning goals

By the end of this chapter, you should be able to:

- Explain composition, delegation, and mixins in JavaScript.
- Build an object by composing smaller objects and functions.
- Delegate a task to a collaborator object.
- Preserve the correct **this** value when calling a delegated method.
- Recognize method-name collisions and shared-state risks in mixins.
- Compare object composition, prototype delegation, and class mixins.
- Choose between inheritance and composition for a design.

## Composition: build behavior from parts

A composed object keeps references to the parts it uses. The parts can be plain objects, functions, or class instances.

~~~js
const logger = {
  log(message) {
    console.log("[log] " + message);
  }
};

const inventory = {
  items: [],

  add(item) {
    this.items.push(item);
    return this.items.length;
  }
};

const store = {
  logger,
  inventory,

  receive(item) {
    const count = this.inventory.add(item);
    this.logger.log(item + " received. Items in stock: " + count);
  }
};

store.receive("Notebook");
~~~

Output:

~~~text
[log] Notebook received. Items in stock: 1
~~~

The **store** has a logger and an inventory. It coordinates their behavior instead of inheriting from either one. Each part has a focused responsibility and can be replaced independently.

A class can use the same pattern:

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

const pricing = {
  total(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
};

const notifier = {
  send(message) {
    console.log("Notification: " + message);
  }
};

const cart = new Cart(pricing, notifier);
cart.add({ name: "Pen", price: 2 });
cart.add({ name: "Notebook", price: 5 });
console.log(cart.total());
~~~

Output:

~~~text
Notification: Added Pen
Notification: Added Notebook
7
~~~

The cart does not need to know how a notification is delivered or how a total is calculated. It relies on collaborators that provide the operations it calls.

## Use small functions as capabilities

A capability is a focused operation an object can use. A function is often enough to represent one.

~~~js
function createGreeter(prefix) {
  return {
    greet(name) {
      return prefix + ", " + name + "!";
    }
  };
}

function createRecorder() {
  const messages = [];

  return {
    record(message) {
      messages.push(message);
    },

    getMessages() {
      return messages.slice();
    }
  };
}

function createApp(greeter, recorder) {
  return {
    welcome(name) {
      const message = greeter.greet(name);
      recorder.record(message);
      return message;
    }
  };
}

const recorder = createRecorder();
const app = createApp(createGreeter("Welcome"), recorder);

console.log(app.welcome("Mina"));
console.log(recorder.getMessages());
~~~

Output:

~~~text
Welcome, Mina!
[ 'Welcome, Mina!' ]
~~~

Factory functions make dependencies explicit. The recorder's array stays private in its closure, and callers receive a copy from **getMessages()** rather than direct access to the internal array.

## Delegation: ask a collaborator to do a task

Delegation sends work to an object that owns the relevant behavior. In the cart example, pricing and notification are delegated to collaborators. The coordinating object decides when to call them, while each collaborator decides how to perform its task.

~~~js
const fileStore = {
  save(name, contents) {
    console.log("Saved " + name + " (" + contents.length + " characters)");
  }
};

const report = {
  fileStore,

  export(name, contents) {
    this.fileStore.save(name, contents);
  }
};

report.export("summary.txt", "Done");
~~~

Output:

~~~text
Saved summary.txt (4 characters)
~~~

Delegation is different from inheritance. The report does not become a kind of file store. It uses a file store.

### Preserve the receiver

When a method is called as **object.method()**, **this** inside that method normally refers to **object**. Keeping the call through the collaborator preserves that receiver:

~~~js
const counter = {
  value: 0,

  increment() {
    this.value += 1;
    return this.value;
  }
};

const worker = {
  counter,

  doWork() {
    return this.counter.increment();
  }
};

console.log(worker.doWork());
console.log(counter.value);
~~~

Output:

~~~text
1
1
~~~

Extracting a method into a standalone variable loses the member-call receiver:

~~~js
const increment = counter.increment;
// Calling increment() here would not call it with counter as this.
~~~

If an extracted method must keep a particular receiver, bind it deliberately:

~~~js
const safeIncrement = counter.increment.bind(counter);
console.log(safeIncrement());
~~~

Output:

~~~text
2
~~~

Another option is to design a collaborator operation as a function that accepts all required data as arguments. That can make dependencies and state changes easier to see.

## Choose where state lives

A composed design should make state ownership clear. If a collaborator owns a collection, let it manage that collection and expose operations rather than exposing a mutable internal value.

~~~js
function createInventory() {
  const items = [];

  return {
    add(item) {
      items.push(item);
    },

    remove(name) {
      const index = items.findIndex((item) => item.name === name);
      if (index !== -1) {
        items.splice(index, 1);
      }
    },

    list() {
      return items.map((item) => ({ ...item }));
    }
  };
}

const inventory = createInventory();
inventory.add({ name: "Pen", quantity: 3 });

const listedItems = inventory.list();
listedItems[0].quantity = 100;

console.log(inventory.list()[0].quantity);
~~~

Output:

~~~text
3
~~~

The returned list contains copies, so changing a listed item does not change the stored item. This is a shallow copy: if items contain nested mutable objects, those nested values would still be shared. Choose copying or immutability based on the data shape and the ownership contract.

## Prototype delegation

Objects can also delegate property lookup through their prototype chain. **Object.create(prototype)** creates an object whose prototype is the supplied object.

~~~js
const canGreet = {
  greet() {
    return "Hello, " + this.name + ".";
  }
};

const person = Object.create(canGreet);
person.name = "Asha";

console.log(person.greet());
console.log(Object.getPrototypeOf(person) === canGreet);
console.log(Object.hasOwn(person, "greet"));
~~~

Output:

~~~text
Hello, Asha.
true
false
~~~

The **person** object does not own **greet**. Lookup reaches **canGreet** through the prototype. The method still receives **person** as **this**, because it was called as **person.greet()**.

Prototype delegation can share methods efficiently, and JavaScript uses it for class methods too. It is not the same as copying properties. A property assigned directly to **person** can shadow an inherited property with the same name.

~~~js
person.greet = function () {
  return "Welcome, " + this.name + ".";
};

console.log(person.greet());
console.log(Object.hasOwn(person, "greet"));
~~~

Output:

~~~text
Welcome, Asha.
true
~~~

Use **Object.create** when a prototype relationship is intentional and useful. For everyday collaboration between independent parts, an explicit property such as **this.logger** or **this.pricing** often makes the relationship easier to see.

## Mixins: reuse a focused set of methods

A mixin is a reusable set of behavior that can be added to more than one object or class. JavaScript does not have a dedicated **mixin** keyword. One simple approach uses a factory function that returns methods.

~~~js
const timestamped = (Base) =>
  class extends Base {
    setTimestamp() {
      this.timestamp = "2026-11-20";
    }
  };

class Note {
  constructor(text) {
    this.text = text;
  }
}

class TimestampedNote extends timestamped(Note) {}

const note = new TimestampedNote("Review composition");
note.setTimestamp();

console.log(note.text);
console.log(note.timestamp);
console.log(note instanceof Note);
~~~

Output:

~~~text
Review composition
2026-11-20
true
~~~

The **timestamped** function receives a base class and returns a class that extends it with an additional method. This pattern is sometimes called a class mixin.

A class mixin can be combined with another class factory:

~~~js
const labeled = (Base) =>
  class extends Base {
    setLabel(label) {
      this.label = label;
    }
  };

class Task {
  constructor(title) {
    this.title = title;
  }
}

class LabeledTask extends labeled(Task) {}

const task = new LabeledTask("Write notes");
task.setLabel("learning");

console.log(task.title + " - " + task.label);
~~~

Output:

~~~text
Write notes - learning
~~~

Each mixin factory adds a layer to the inheritance chain. This can be useful for a small number of independent capabilities, but stacking many layers makes method lookup and debugging harder.

An object mixin can instead copy properties onto a target:

~~~js
const canDescribe = {
  describe() {
    return this.name + " is " + this.role + ".";
  }
};

const user = { name: "Ira", role: "a designer" };
Object.assign(user, canDescribe);

console.log(user.describe());
console.log(Object.hasOwn(user, "describe"));
~~~

Output:

~~~text
Ira is a designer.
true
~~~

**Object.assign** copies enumerable own properties. It does not establish a prototype relationship, and it performs a shallow copy. A copied method that uses **this** acts on the receiving object when called as a method on that object.

## Mixin and composition pitfalls

Mixins can make unrelated capabilities reusable, but they need clear boundaries.

- **Name collisions:** two mixins may both define **save()**. With **Object.assign**, later properties overwrite earlier ones. With class mixins, the later class layer can shadow methods from lower layers.
- **Hidden dependencies:** a method may expect fields such as **this.id** without declaring that requirement. Document the required data or pass it as an argument.
- **Unclear state ownership:** several mixins may mutate the same field. Give each piece of state one clear owner.
- **Unexpected receiver:** a method extracted from its object may lose its **this** value. Bind it or use an argument-based function.
- **Too many layers:** a long chain of class factories can be harder to inspect than a composed object with explicit collaborators.
- **Shallow copying:** assigning an object copies property values, not nested object graphs.
- **Overly broad helpers:** a mixin that performs many unrelated jobs is difficult to reuse safely.

Prefer small, narrow capabilities. If behavior depends on a collaborator, explicit composition often communicates that dependency better than a mixin.

## Composition and inheritance together

These techniques can be combined. A class may extend a meaningful base type and compose independent collaborators:

~~~js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Admin extends User {
  constructor(name, auditLog) {
    super(name);
    this.auditLog = auditLog;
  }

  deleteRecord(recordId) {
    this.auditLog.record(this.name + " deleted " + recordId);
  }
}

const auditLog = {
  record(message) {
    console.log("[audit] " + message);
  }
};

const admin = new Admin("Asha", auditLog);
admin.deleteRecord("record-17");
~~~

Output:

~~~text
[audit] Asha deleted record-17
~~~

Here, **Admin** is a kind of **User**, so inheritance expresses specialization. The admin also has an audit log, so composition supplies that independent capability.

## Choose a design

Ask these questions before adding another inheritance layer:

1. Is the new object genuinely a specialized form of the parent?
2. Does it need the parent's identity and contract, or only one behavior?
3. Can the behavior be supplied by a collaborator with a small, clear interface?
4. Is the behavior stateless and broadly reusable enough to be a mixin?
5. Where does mutable state live, and who is allowed to change it?
6. Could two composed parts define conflicting names?
7. Would a reader understand the data flow without tracing a deep prototype chain?

Use inheritance for a clear **is-a** relationship. Use composition when an object works with independent parts. Use delegation to hand a specific responsibility to a collaborator. Use mixins sparingly for small, reusable behavior that does not fit naturally into one base class.

## Try it yourself

1. Create a **Logger** object and compose it into a **TaskService**.
2. Create a pricing collaborator and delegate a cart's total calculation to it.
3. Make an inventory factory with private array state and a method that returns a defensive copy.
4. Create an object with **Object.create** and inspect inherited versus own properties.
5. Copy a method with **Object.assign**, then check how its **this** value behaves.
6. Build a class mixin that adds one focused capability to a base class.
7. Create two mixins with the same method name and observe which implementation is used.
8. Draw a small class relationship and decide whether it represents **is-a** or **has-a**.
9. Refactor a class with unrelated responsibilities into a coordinator with collaborators.
10. Explain who owns state in your final design.

## Key points

- Composition combines independent objects or functions through explicit references.
- Delegation forwards a responsibility to the collaborator that owns the behavior.
- A member call such as **this.logger.log()** preserves the collaborator as the method receiver.
- Prototype delegation shares behavior through property lookup, while **Object.assign** copies own enumerable properties.
- Mixins add reusable behavior, but can introduce collisions and hidden dependencies.
- Keep mutable state under clear ownership and avoid exposing internal collections unnecessarily.
- Inheritance is useful for real specialization; composition is useful for combining capabilities.
- A design can use inheritance for its main type relationship and composition for independent services.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [63 - Inheritance, extends, and super](063-inheritance-extends-and-super.md) | [Open Q&A](../qnas/064-composition-delegation-and-mixins.md) | [Open example](../examples/064-composition-delegation-and-mixins.md) | [65 - Map and Set collections](065-map-and-set-collections.md) |
