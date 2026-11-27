# 64 - Composition, delegation, and mixins: Examples

These examples show how to combine independent behavior, pass work to collaborators, share behavior through prototypes, and apply small mixins. Each example includes a task, complete code, expected output, and an explanation.

## 1. Compose an inventory and a logger

**Task:** Build a store that uses separate inventory and logging objects.

~~~js
const inventory = {
  items: [],

  add(item) {
    this.items.push(item);
    return this.items.length;
  }
};

const logger = {
  log(message) {
    console.log("[store] " + message);
  }
};

const store = {
  inventory,
  logger,

  receive(item) {
    const count = this.inventory.add(item);
    this.logger.log(item + " received. Count: " + count);
  }
};

store.receive("Notebook");
store.receive("Pen");
~~~

Expected output:

~~~text
[store] Notebook received. Count: 1
[store] Pen received. Count: 2
~~~

**Explanation:** The store composes two independent collaborators. It coordinates the work but does not inherit from an inventory or a logger.

## 2. Delegate pricing and notifications

**Task:** Let a cart ask a pricing service to calculate the total and a notifier to report added items.

~~~js
const pricing = {
  total(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
};

const notifier = {
  send(message) {
    console.log("Notice: " + message);
  }
};

class Cart {
  constructor(pricingService, notificationService) {
    this.pricing = pricingService;
    this.notifier = notificationService;
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

const cart = new Cart(pricing, notifier);
cart.add({ name: "Pen", price: 2 });
cart.add({ name: "Notebook", price: 5 });
console.log("Total: " + cart.total());
~~~

Expected output:

~~~text
Notice: Added Pen
Notice: Added Notebook
Total: 7
~~~

**Explanation:** The cart delegates calculation and notification. Passing collaborators into the constructor makes those dependencies visible and replaceable.

## 3. Create capabilities with factory functions

**Task:** Create a greeter and a recorder that can be combined in an application.

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

    list() {
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
console.log(recorder.list().join(", "));
~~~

Expected output:

~~~text
Welcome, Mina!
Welcome, Mina!
~~~

**Explanation:** The factories return focused capabilities. The recorder owns its private array and returns a copy rather than exposing that array directly.

## 4. Keep a method call on its collaborator

**Task:** Delegate a read operation while preserving the collaborator as the receiver.

~~~js
const meter = {
  value: 12,

  read() {
    return this.value;
  }
};

const dashboard = {
  meter,

  showValue() {
    return this.meter.read();
  }
};

console.log(dashboard.showValue());
~~~

Expected output:

~~~text
12
~~~

**Explanation:** The method call remains **this.meter.read()**. The **meter** object is therefore **this** inside **read**.

## 5. Bind a method that must be passed around

**Task:** Create a callback that keeps its original receiver.

~~~js
const counter = {
  value: 0,

  increment() {
    this.value += 1;
    return this.value;
  }
};

const onClick = counter.increment.bind(counter);

console.log(onClick());
console.log(onClick());
console.log(counter.value);
~~~

Expected output:

~~~text
1
2
2
~~~

**Explanation:** **bind(counter)** returns a function with **this** fixed to **counter**, even when called as a standalone callback.

## 6. Use a function collaborator with explicit input

**Task:** Keep formatting independent from the object that calls it.

~~~js
function formatPrice(amount, currency) {
  return currency + amount.toFixed(2);
}

const order = {
  price: 8.5,
  format: formatPrice,

  summary() {
    return this.format(this.price, "$");
  }
};

console.log(order.summary());
~~~

Expected output:

~~~text
$8.50
~~~

**Explanation:** The formatter receives the amount and currency as arguments. It does not rely on an implicit receiver or hidden object state.

## 7. Own private collection state

**Task:** Expose inventory operations without returning the internal array.

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

    listNames() {
      return items.map((item) => item.name);
    }
  };
}

const inventory = createInventory();
inventory.add({ name: "Pen" });
inventory.add({ name: "Notebook" });
inventory.remove("Pen");

console.log(inventory.listNames().join(", "));
~~~

Expected output:

~~~text
Notebook
~~~

**Explanation:** The array is private to the factory closure. Callers can add, remove, and list names only through the exposed operations.

## 8. Return copies from a collection owner

**Task:** Prevent callers from changing the inventory array through a returned list.

~~~js
function createInventory() {
  const items = [];

  return {
    add(name) {
      items.push(name);
    },

    list() {
      return items.slice();
    }
  };
}

const inventory = createInventory();
inventory.add("Pen");

const displayItems = inventory.list();
displayItems.push("Book");

console.log(inventory.list().join(", "));
~~~

Expected output:

~~~text
Pen
~~~

**Explanation:** **slice()** returns a new array. This protects the internal array structure. If the array contained mutable objects, this would still be a shallow copy of those objects.

## 9. Delegate property lookup through a prototype

**Task:** Share a method through a prototype without copying it onto the new object.

~~~js
const canDescribe = {
  describe() {
    return this.name + " is " + this.role + ".";
  }
};

const person = Object.create(canDescribe);
person.name = "Ira";
person.role = "a designer";

console.log(person.describe());
console.log(Object.hasOwn(person, "describe"));
console.log(Object.getPrototypeOf(person) === canDescribe);
~~~

Expected output:

~~~text
Ira is a designer.
false
true
~~~

**Explanation:** **describe** is found on the prototype, but the member call uses **person** as its receiver. The method is inherited, not an own property of **person**.

## 10. Shadow an inherited property

**Task:** Read an inherited default, then set an object-specific value.

~~~js
const defaults = {
  theme: "light"
};

const settings = Object.create(defaults);

console.log(settings.theme);
settings.theme = "dark";
console.log(settings.theme);
console.log(Object.hasOwn(settings, "theme"));
~~~

Expected output:

~~~text
light
dark
true
~~~

**Explanation:** The first lookup finds **theme** on **defaults**. Assignment creates an own property on **settings**, which shadows the inherited value.

## 11. Copy a method with Object.assign

**Task:** Add a method to an object by copying an enumerable own property.

~~~js
const methods = {
  describe() {
    return this.name + " is ready.";
  }
};

const task = {
  name: "Build"
};

Object.assign(task, methods);

console.log(task.describe());
console.log(Object.hasOwn(task, "describe"));
~~~

Expected output:

~~~text
Build is ready.
true
~~~

**Explanation:** **Object.assign** copies the method reference onto **task**. Called as **task.describe()**, the method receives **task** as **this**.

## 12. Notice a shallow copy

**Task:** Copy an object and observe that a nested object is still shared.

~~~js
const source = {
  preferences: {
    theme: "light"
  }
};

const copy = Object.assign({}, source);
copy.preferences.theme = "dark";

console.log(source.preferences.theme);
console.log(copy.preferences === source.preferences);
~~~

Expected output:

~~~text
dark
true
~~~

**Explanation:** The outer object was copied, but the **preferences** value is a reference to the same nested object.

## 13. Resolve an object mixin collision

**Task:** Observe how later properties replace earlier copied properties.

~~~js
const canSaveDraft = {
  save() {
    return "draft";
  }
};

const canSaveBackup = {
  save() {
    return "backup";
  }
};

const editor = Object.assign({}, canSaveDraft, canSaveBackup);
console.log(editor.save());
~~~

Expected output:

~~~text
backup
~~~

**Explanation:** **Object.assign** copies sources from left to right. The later **save** property overwrites the earlier one. If these are different responsibilities, give them distinct names or keep them on separate collaborators.

## 14. Add one focused capability with a class mixin

**Task:** Extend a base class with a reusable identifier method.

~~~js
const withId = (Base) =>
  class extends Base {
    setId(id) {
      this.id = id;
    }
  };

class Record {
  constructor(value) {
    this.value = value;
  }
}

class IdentifiedRecord extends withId(Record) {}

const record = new IdentifiedRecord("invoice");
record.setId("inv-7");

console.log(record.value);
console.log(record.id);
console.log(record instanceof Record);
~~~

Expected output:

~~~text
invoice
inv-7
true
~~~

**Explanation:** **withId** receives a base class and returns a class that adds one method. The resulting instance remains an instance of **Record** through its prototype chain.

## 15. See which class mixin method wins

**Task:** Stack two mixins that define the same method.

~~~js
const withNameDescription = (Base) =>
  class extends Base {
    describe() {
      return "name description";
    }
  };

const withStatusDescription = (Base) =>
  class extends Base {
    describe() {
      return "status description";
    }
  };

class Item {}
class CombinedItem extends withStatusDescription(
  withNameDescription(Item)
) {}

console.log(new CombinedItem().describe());
~~~

Expected output:

~~~text
status description
~~~

**Explanation:** The topmost class in the lookup chain supplies **describe** first. Stacking mixins with colliding names makes behavior depend on order, so avoid the collision or make the intended override explicit.

## 16. Replace a collaborator without changing the coordinator

**Task:** Supply a different notifier to the same cart behavior.

~~~js
class Cart {
  constructor(notifier) {
    this.notifier = notifier;
    this.items = [];
  }

  add(name) {
    this.items.push(name);
    this.notifier.send("Added " + name);
  }
}

const quietNotifier = {
  send() {}
};

const recordingNotifier = {
  messages: [],

  send(message) {
    this.messages.push(message);
  }
};

const cart = new Cart(recordingNotifier);
cart.add("Pen");

console.log(recordingNotifier.messages.join(", "));
~~~

Expected output:

~~~text
Added Pen
~~~

**Explanation:** The cart depends on a small **send** operation. A different collaborator can provide that operation without changing the cart's implementation.

## 17. Combine inheritance and composition

**Task:** Model an administrator as a user and give it an audit log collaborator.

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

  deleteRecord(id) {
    this.auditLog.record(this.name + " deleted " + id);
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

Expected output:

~~~text
[audit] Asha deleted record-17
~~~

**Explanation:** **Admin** extends **User** because an admin is a kind of user. It composes an audit log because logging is an independent capability it uses.

## 18. Make a collaborator easy to replace in a small check

**Task:** Supply a fake logger that records calls instead of printing them.

~~~js
function createService(logger) {
  return {
    run() {
      logger.log("started");
      return "done";
    }
  };
}

const messages = [];
const fakeLogger = {
  log(message) {
    messages.push(message);
  }
};

const service = createService(fakeLogger);

console.log(service.run());
console.log(messages.join(", "));
~~~

Expected output:

~~~text
done
started
~~~

**Explanation:** The service only needs the logger's **log** operation. A small fake collaborator can observe how the service uses it without requiring a real logging system.

## 19. Avoid a hidden mixin dependency

**Task:** Make a formatter's dependency explicit instead of assuming a field exists on **this**.

~~~js
function formatLabel(label, prefix) {
  return prefix + ": " + label;
}

const task = {
  label: "Review",
  prefix: "Work",

  description() {
    return formatLabel(this.label, this.prefix);
  }
};

console.log(task.description());
~~~

Expected output:

~~~text
Work: Review
~~~

**Explanation:** The function receives the values it needs. A mixin method that silently expects **this.label** and **this.prefix** would have a hidden contract that callers must discover.

## 20. Choose composition for independent capabilities

**Task:** Make a document service that uses storage and logging without pretending to be either one.

~~~js
function createDocumentService(storage, logger) {
  return {
    save(name, contents) {
      storage.write(name, contents);
      logger.log("Saved " + name);
    }
  };
}

const storage = {
  write(name, contents) {
    console.log("Writing " + name + ": " + contents);
  }
};

const logger = {
  log(message) {
    console.log("[log] " + message);
  }
};

const documents = createDocumentService(storage, logger);
documents.save("notes.txt", "Composition");
~~~

Expected output:

~~~text
Writing notes.txt: Composition
[log] Saved notes.txt
~~~

**Explanation:** The service coordinates two independent capabilities through explicit references. Neither storage nor logging is a meaningful base type for the document service.

## 21. Compare inheritance and composition in a design

**Task:** Decide how to represent a **PremiumUser** that is still a user and has a notification service.

~~~js
class User {
  constructor(name) {
    this.name = name;
  }
}

class PremiumUser extends User {
  constructor(name, notifier) {
    super(name);
    this.notifier = notifier;
  }

  announceUpgrade() {
    this.notifier.send(this.name + " has premium access.");
  }
}

const notifier = {
  send(message) {
    console.log(message);
  }
};

const user = new PremiumUser("Mina", notifier);
user.announceUpgrade();
~~~

Expected output:

~~~text
Mina has premium access.
~~~

**Explanation:** Inheritance models the specialization: **PremiumUser** is a **User**. Composition models the independent service: the user has a notifier collaborator.

## Review checklist

For each example, make sure you can identify:

- Which object owns the state.
- Which operation is delegated and to which collaborator.
- Whether a method is copied, inherited, or called through an explicit property.
- What object supplies **this** during a method call.
- Whether a mixin adds a prototype layer or copies properties.
- How to avoid collisions and hidden dependencies.
- Whether the design expresses a real **is-a** relationship or combines **has-a** capabilities.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [63 - Inheritance, extends, and super](../lessons/063-inheritance-extends-and-super.md) | [Open lesson](../lessons/064-composition-delegation-and-mixins.md) | [Open Q&A](../qnas/064-composition-delegation-and-mixins.md) | [65 - Map and Set collections](../lessons/065-map-and-set-collections.md) |
