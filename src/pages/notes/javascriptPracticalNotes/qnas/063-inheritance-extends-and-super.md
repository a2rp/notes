# 63 - Inheritance, extends, and super: Q&A

This question set reviews how classes inherit constructors and methods, how **super** works, and how base and derived objects initialize. Each answer follows its question, with explanations and outputs where useful.

## Multiple-choice questions

### 1. What does **class Child extends Parent** establish?

A. It copies every parent method onto each child instance.  
B. It creates prototype relationships so the child can inherit parent behavior.  
C. It makes **Child** and **Parent** the same class.  
D. It makes every parent instance a child instance.  

**Answer: B.** The child class and child prototype are linked to the parent class and parent prototype. Instances use those chains to find inherited behavior.

### 2. What must a derived constructor do before it uses **this**?

A. Return a string.  
B. Call **super(...)**.  
C. Call **Object.create**.  
D. Declare a static field.  

**Answer: B.** **super(...)** calls the parent constructor and initializes the derived instance's **this** binding.

### 3. What does **super.method()** do inside a derived instance method?

A. Calls the method on a new parent instance.  
B. Looks up a method starting from the parent prototype and calls it with the current instance as receiver.  
C. Changes the current object's prototype.  
D. Calls a static method on the parent in every case.  

**Answer: B.** In an instance method, **super.method()** looks up through the parent prototype while keeping the current instance as **this**.

### 4. What are the two prototype relationships created by class inheritance?

A. Child instances inherit from the parent constructor, and the child class inherits from parent instances.  
B. **Child.prototype** inherits from **Parent.prototype**, and the **Child** class object inherits from the **Parent** class object.  
C. The child and parent prototypes are the same object.  
D. The child class object inherits from **Object.prototype** only.  

**Answer: B.** One link provides inherited instance methods. The other provides inherited static behavior.

### 5. What happens if a derived class has no constructor of its own?

A. It cannot be instantiated.  
B. Its default constructor forwards arguments to the parent constructor.  
C. It creates an instance without a prototype.  
D. It ignores all arguments and does not call the parent.  

**Answer: B.** A default derived constructor forwards the arguments to **super(...)**.

### 6. Can a child class directly access a private field declared by its parent?

A. Yes, if it uses the same **#name**.  
B. Yes, with bracket notation.  
C. No, the private name is scoped to the class that declares it.  
D. Yes, but only in a static method.  

**Answer: C.** The child can use public parent methods that operate on the parent's private state, but it cannot directly refer to the parent's private name.

### 7. What does **super.method()** use as **this**?

A. Always the parent class object  
B. The current receiver of the method call  
C. Always **Parent.prototype**  
D. **undefined**  

**Answer: B.** Parent lookup does not replace the receiver. The inherited method operates on the current child instance.

### 8. What does **super.method()** in a static method look up?

A. A method on the parent class object  
B. A method on a parent instance  
C. A method on **Object.prototype** only  
D. A method on the current class's instance prototype  

**Answer: A.** Static methods use the class object as their home object, so **super** looks up through the parent class object.

### 9. How many direct base classes can a class extend?

A. None  
B. One  
C. Two  
D. Any number separated by commas  

**Answer: B.** A class has one direct **extends** value. Use composition or delegation when behavior is needed from multiple independent sources.

### 10. What happens to base and derived fields during construction?

A. Derived fields initialize before **super()**.  
B. Base fields and constructor logic run through **super()**, then derived fields initialize before the rest of the child constructor.  
C. All fields initialize after the constructor returns.  
D. Field initialization order is random.  

**Answer: B.** Base initialization happens as **super()** runs. After it returns, derived fields initialize before the remaining child constructor statements.

## True or false

### 11. A derived constructor can read or write **this** before calling **super()**.

**Answer: False.** The derived instance's **this** binding is not initialized until the parent constructor is called.

### 12. If a derived class has no explicit constructor, JavaScript supplies a default constructor that forwards arguments to the parent.

**Answer: True.** The default derived constructor behaves like forwarding its arguments to **super(...)**.

### 13. A parent instance method called with **super.method()** receives the parent class as **this**.

**Answer: False.** It receives the current instance. The method is looked up on the parent prototype but called with the child instance as receiver.

### 14. Overriding a method in a child changes the method on the parent class.

**Answer: False.** The child defines its own method. The parent method remains unchanged and can be reused through **super**.

### 15. A child instance can normally pass **instanceof Parent** when it extends **Parent**.

**Answer: True.** The child prototype chain includes **Parent.prototype**.

### 16. A child class can access a parent's private field if the parent and child use the same spelling for the private name.

**Answer: False.** Private names are distinct and scoped to the class body that declares them.

### 17. A static method can be inherited through the class-object prototype chain.

**Answer: True.** The child class object inherits from the parent class object, so it can find inherited static methods.

### 18. A derived constructor can use **super.method()** instead of **super()** to initialize its instance.

**Answer: False.** **super()** calls the parent constructor. **super.method()** looks up and calls a parent method.

### 19. A derived constructor that returns an object must always call **super()** first.

**Answer: False.** A derived constructor can return an object without initializing **this**, but this is unusual. Normal constructors should call **super()** before using **this**.

### 20. JavaScript class inheritance supports multiple direct base classes through multiple **extends** clauses.

**Answer: False.** A class extends one direct base class. Composition and delegation can combine independent behavior.

## Short-answer questions

### 21. What does **extends** do?

**Answer:** It creates an inheritance relationship between a child class and a base class. Child instances can find parent instance methods, and the child class can find parent static methods.

### 22. Why must a derived constructor call **super()** before using **this**?

**Answer:** The derived constructor's **this** binding is not initialized until the parent constructor runs. Calling **super()** performs that initialization.

### 23. What is the difference between **super()** and **super.method()**?

**Answer:** **super()** calls the parent constructor from a derived constructor. **super.method()** looks up and calls a parent method from an instance or static method.

### 24. Does **super.method()** change the current receiver?

**Answer:** No. It performs lookup through the parent relationship, but the current child instance or class remains the receiver for the call.

### 25. What are the two prototype chains involved in class inheritance?

**Answer:** The instance chain links **Child.prototype** to **Parent.prototype**. The static chain links the **Child** class object to the **Parent** class object.

### 26. What does a default derived constructor do?

**Answer:** It forwards its received arguments to the parent constructor with **super(...args)**.

### 27. When do derived fields initialize?

**Answer:** After **super()** returns from the base constructor and before the rest of the derived constructor body continues.

### 28. Why can a child not directly read a private field declared by its parent?

**Answer:** Private names are scoped to the class body that declares them. The child can use a public parent method that exposes a controlled operation instead.

### 29. How does a child override a parent method and still reuse its behavior?

**Answer:** Define a method with the same name in the child, then call **super.method(...)** inside it to reuse the parent's implementation.

### 30. When might composition be preferable to inheritance?

**Answer:** Use composition when a class needs behavior from several independent sources or when the child is not truly a specialized form of the parent. Composition makes those relationships explicit without requiring one class hierarchy.

## Predict the output

### 31. Can a child use a parent method and still be an instance of both classes?

~~~js
class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return "I am " + this.name;
  }
}

class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }
}

const employee = new Employee("Asha", "developer");

console.log(employee.introduce());
console.log(employee instanceof Employee);
console.log(employee instanceof Person);
~~~

**Answer:**

~~~text
I am Asha
true
true
~~~

**Explanation:** The child inherits the parent method and its prototype chain includes both **Employee.prototype** and **Person.prototype**.

### 32. What does a child override return when it calls super?

~~~js
class Base {
  describe() {
    return "base " + this.name;
  }
}

class Child extends Base {
  constructor(name) {
    super();
    this.name = name;
  }

  describe() {
    return super.describe() + " child";
  }
}

console.log(new Child("Mina").describe());
~~~

**Answer:**

~~~text
base Mina child
~~~

**Explanation:** **super.describe()** finds the parent method. The receiver remains the child instance, so the parent method reads its **name**.

### 33. What are the instance and static prototype links?

~~~js
class Base {
  describe() {
    return "instance";
  }

  static category() {
    return "static";
  }
}

class Child extends Base {}

const value = new Child();

console.log(Object.getPrototypeOf(Child.prototype) === Base.prototype);
console.log(Object.getPrototypeOf(Child) === Base);
console.log(value.describe());
console.log(Child.category());
~~~

**Answer:**

~~~text
true
true
instance
static
~~~

**Explanation:** The prototype objects form the instance chain, and the class objects form the static chain.

### 34. What receiver does a parent static method use when called through a child?

~~~js
class Base {
  static className() {
    return this.name;
  }
}

class Child extends Base {}

console.log(Child.className());
~~~

**Answer:**

~~~text
Child
~~~

**Explanation:** The inherited static method is called through **Child**, so **Child** is its receiver and **this.name** is **"Child"**.

### 35. What is the field and constructor order?

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

**Answer:**

~~~text
base field
child value
[ 'base constructor', 'child field', 'child constructor' ]
~~~

**Explanation:** Base fields initialize before the base constructor body. The child field initializes after **super()** completes and before the rest of the child constructor.

### 36. Does a parent private field become directly accessible to its child?

~~~js
class Account {
  #balance = 10;

  getBalance() {
    return this.#balance;
  }
}

class SavingsAccount extends Account {
  readParentBalance() {
    return this.getBalance();
  }
}

const savings = new SavingsAccount();

console.log(savings.readParentBalance());
console.log(savings instanceof Account);
~~~

**Answer:**

~~~text
10
true
~~~

**Explanation:** The child calls a public parent method. It does not directly access **Account**'s private field.

### 37. What error happens if this is used before super?

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

**Answer:**

~~~text
true
~~~

**Explanation:** The derived constructor cannot use **this** before its **super()** call initializes the binding.

### 38. What happens when a child overrides a method without calling super?

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

console.log(new Base().describe());
console.log(new Child().describe());
~~~

**Answer:**

~~~text
base
child
~~~

**Explanation:** The child method shadows the parent method for child instances. Calling **super** is optional when the child does not need the parent implementation.

### 39. Does the default child constructor forward arguments?

~~~js
class Base {
  constructor(value) {
    this.value = value;
  }
}

class Child extends Base {}

const child = new Child("forwarded");

console.log(child.value);
~~~

**Answer:**

~~~text
forwarded
~~~

**Explanation:** A derived class without its own constructor gets a default constructor that forwards arguments to the base constructor.

### 40. Can a derived constructor return an object without calling super?

~~~js
class Base {}

class Child extends Base {
  constructor() {
    return { replacement: true };
  }
}

const child = new Child();

console.log(child.replacement);
console.log(child instanceof Child);
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** A derived constructor may return an object without initializing its **this** binding. The replacement object is not connected to **Child.prototype**. This behavior is valid but unusual.

## Coding questions

### 41. Create a base class and a child that adds its own field.

**Answer:**

~~~js
class Vehicle {
  constructor(make) {
    this.make = make;
  }

  describe() {
    return "Vehicle by " + this.make;
  }
}

class Bicycle extends Vehicle {
  constructor(make, gears) {
    super(make);
    this.gears = gears;
  }
}

const bicycle = new Bicycle("Cedar", 8);

console.log(bicycle.describe());
console.log(bicycle.gears);
~~~

Output:

~~~text
Vehicle by Cedar
8
~~~

**Explanation:** **super(make)** initializes the inherited make property. The child then adds its own gears property.

### 42. Override a method and add to the parent result.

**Answer:**

~~~js
class Message {
  format() {
    return "Message";
  }
}

class Warning extends Message {
  format() {
    return super.format() + ": warning";
  }
}

console.log(new Warning().format());
~~~

Output:

~~~text
Message: warning
~~~

**Explanation:** The child method calls the parent implementation, then extends its result.

### 43. Inherit a static method.

**Answer:**

~~~js
class Base {
  static label() {
    return "label from " + this.name;
  }
}

class Child extends Base {}

console.log(Child.label());
console.log(Object.getPrototypeOf(Child) === Base);
~~~

Output:

~~~text
label from Child
true
~~~

**Explanation:** The child class object inherits from the base class object. Calling through **Child** makes it the static method's receiver.

### 44. Override a static method with super.

**Answer:**

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
~~~

Output:

~~~text
value: {"ready":true}
~~~

**Explanation:** In a static method, **super.format** looks up the parent class's static method.

### 45. Record base and derived initialization order.

**Answer:**

~~~js
class Base {
  events = [];

  constructor() {
    this.events.push("base constructor");
  }
}

class Child extends Base {
  childValue = (this.events.push("child field"), 1);

  constructor() {
    super();
    this.events.push("child constructor");
  }
}

const child = new Child();

console.log(child.events);
~~~

Output:

~~~text
[ 'base constructor', 'child field', 'child constructor' ]
~~~

**Explanation:** The base constructor runs during **super()**. The child field initializer runs after it returns, then the rest of the child constructor continues.

### 46. Use a parent's public method to work with its private state.

**Answer:**

~~~js
class Account {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  balance() {
    return this.#balance;
  }
}

class SavingsAccount extends Account {
  addBonus(amount) {
    this.deposit(amount);
  }
}

const savings = new SavingsAccount();
savings.addBonus(15);

console.log(savings.balance());
~~~

Output:

~~~text
15
~~~

**Explanation:** The child uses the parent's public methods. It never names or directly accesses the parent's private field.

### 47. Reuse a parent getter through super.

**Answer:**

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

console.log(employee.displayName);
~~~

Output:

~~~text
Employee: Mina Shah
~~~

**Explanation:** **super.fullName** looks up the parent accessor and evaluates it with the employee instance as **this**.

### 48. Inspect both inheritance links.

**Answer:**

~~~js
class Animal {}

class Cat extends Animal {}

const cat = new Cat();

console.log(Object.getPrototypeOf(cat) === Cat.prototype);
console.log(Object.getPrototypeOf(Cat.prototype) === Animal.prototype);
console.log(Object.getPrototypeOf(Cat) === Animal);
~~~

Output:

~~~text
true
true
true
~~~

**Explanation:** The first expression checks the instance link. The next two show the prototype-object and class-object inheritance links.

### 49. Use an inherited static method without changing the base class.

**Answer:**

~~~js
class Base {
  static kind() {
    return this.name;
  }
}

class Report extends Base {}

console.log(Base.kind());
console.log(Report.kind());
~~~

Output:

~~~text
Base
Report
~~~

**Explanation:** The same inherited method runs with different receivers. The base class is **this** in the first call and the child class is **this** in the second.

### 50. Decide whether to call the parent method.

**Answer:**

~~~js
class Base {
  describe() {
    return "base";
  }
}

class Child extends Base {
  describe() {
    return "child plus " + super.describe();
  }
}

console.log(new Child().describe());
~~~

Output:

~~~text
child plus base
~~~

**Explanation:** Use **super.method()** only when the child needs the parent's implementation. A child can instead replace the behavior entirely.

## Review checklist

Before moving on, make sure you can explain:

- What **extends** connects.
- Why **super()** must run before a derived constructor uses **this**.
- The difference between **super()** and **super.method()**.
- Why a parent method called with **super** still receives the child as **this**.
- How instance methods and static methods inherit through separate chains.
- The order of base and derived constructor and field initialization.
- Why child code cannot directly access a parent's private name.
- When composition can be clearer than another inheritance layer.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [62 - Static fields, private elements, and initialization blocks](../lessons/062-static-fields-private-elements-and-initialization-blocks.md) | [Open lesson](../lessons/063-inheritance-extends-and-super.md) | [Open example](../examples/063-inheritance-extends-and-super.md) | [64 - Composition, delegation, and mixins](../lessons/064-composition-delegation-and-mixins.md) |
