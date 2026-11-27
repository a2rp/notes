# 135 - Object-oriented programming, composition, and design patterns: Q&A

Each answer follows its question. Explanations clarify the reasoning and the trade-offs.

## Multiple-choice questions

### 1. What does JavaScript class syntax use to share instance methods?

A. A separate class runtime unrelated to objects  
B. The class prototype  
C. The global object  
D. A copy of every method on each instance

**Answer:** B. The class prototype.

**Explanation:** Methods declared in a class body are placed on the class prototype and shared through prototype lookup.

### 2. What must a derived constructor do before accessing **this**?

A. Return an object  
B. Call **super()**  
C. Call **Object.freeze()**  
D. Define a static method

**Answer:** B. Call **super()**.

**Explanation:** A derived constructor cannot use **this** until the base constructor has initialized the derived instance through **super()**.

### 3. Which statement best describes composition?

A. Copy every property from one object to another  
B. Give an object collaborators and let it delegate work  
C. Make every class extend one base class  
D. Put every operation in static methods

**Answer:** B. Give an object collaborators and let it delegate work.

**Explanation:** Composition connects objects with focused responsibilities and lets behavior vary through replaceable collaborators.

### 4. What is the purpose of a strategy?

A. Serialize an object  
B. Replace interchangeable behavior behind a stable contract  
C. Create a global singleton  
D. Freeze all instances

**Answer:** B. Replace interchangeable behavior behind a stable contract.

**Explanation:** A strategy lets a caller use a policy such as pricing without embedding every variation in the caller.

### 5. Which statement about a **#privateField** is correct?

A. It is only a naming convention  
B. It can be read with bracket notation  
C. JavaScript restricts access to the declaring class  
D. It is automatically included in JSON

**Answer:** C. JavaScript restricts access to the declaring class.

**Explanation:** A private field is not an ordinary property and cannot be accessed by outside code, including with bracket notation.

### 6. What does a factory primarily centralize?

A. Creation decisions and validation  
B. Browser rendering  
C. Prototype lookup  
D. Garbage collection

**Answer:** A. Creation decisions and validation.

**Explanation:** A factory helps when choosing or validating a concrete object is a meaningful rule. A trivial constructor does not need one.

### 7. What is a useful role for an adapter?

A. Translate one API into the interface another part expects  
B. Store all application state globally  
C. Replace every function with a class  
D. Prevent subclassing

**Answer:** A. Translate one API into the interface another part expects.

**Explanation:** An adapter isolates legacy or vendor-specific details from application logic.

### 8. What can happen when an ordinary object method is extracted and called by itself?

A. It always becomes static  
B. It can lose the original receiver used as **this**  
C. It automatically becomes private  
D. It is copied to the global prototype

**Answer:** B. It can lose the original receiver used as **this**.

**Explanation:** The call site determines the receiver. Use a wrapper or **bind** when a callback needs a particular receiver.

### 9. When is inheritance most appropriate?

A. Whenever two classes share a few lines  
B. When a subtype honors the base contract and substitution is meaningful  
C. When an object needs any collaborator  
D. When a function has no state

**Answer:** B. When a subtype honors the base contract and substitution is meaningful.

**Explanation:** Inheritance couples subtype behavior to a base contract. It works best for a stable “is a” relationship.

### 10. What is the best general test target for a class?

A. Its private field names  
B. Its line count  
C. Observable behavior through its public API  
D. The order of its methods

**Answer:** C. Observable behavior through its public API.

**Explanation:** Public behavior tests protect the contract while allowing internal implementation to change.

## Short-answer questions

### 11. What is an object in JavaScript?

**Answer:** An object is a value with properties that may hold data or functions.

**Explanation:** JavaScript objects also participate in prototype-based property lookup.

### 12. How are classes related to prototypes?

**Answer:** Class syntax creates constructors and prototype relationships. Instance methods are shared on the class prototype.

**Explanation:** Classes provide syntax and semantics layered on JavaScript's prototype object model.

### 13. What should a constructor generally do?

**Answer:** Establish valid initial state and validate the inputs needed for that state.

**Explanation:** Surprising I/O in a constructor makes object creation hard to reason about. Keep external effects in explicit operations.

### 14. What is encapsulation?

**Answer:** Encapsulation groups state with operations and limits how callers can change that state.

**Explanation:** The goal is to protect invariants and expose a useful API, not merely to hide every property.

### 15. What is the difference between a private field and an underscore-prefixed field?

**Answer:** A **#privateField** is enforced by the language. An **_internal** field remains publicly accessible.

**Explanation:** The underscore communicates intent but does not provide access control.

### 16. When should you add a getter?

**Answer:** When a computed or read-only value is useful through property syntax.

**Explanation:** A getter should be predictable. Expensive or side-effecting operations are clearer as methods.

### 17. What is polymorphism?

**Answer:** It lets callers use different values through the same operation or contract.

**Explanation:** Unrelated JavaScript objects can satisfy the same contract without sharing a base class.

### 18. What is duck typing?

**Answer:** It checks whether a value provides the operations its caller needs.

**Explanation:** A function can accept any object with the expected method, while important boundaries may still validate it.

### 19. How do composition and inheritance differ?

**Answer:** Inheritance derives behavior through a subtype relationship. Composition builds behavior by delegating to collaborators.

**Explanation:** Composition can reduce hierarchy coupling. Inheritance can express a genuine, stable substitutable subtype.

### 20. Why can deep inheritance hierarchies be hard to maintain?

**Answer:** Behavior is spread across several base classes, and a base change can affect many descendants.

**Explanation:** A shallow hierarchy or focused collaborators often make responsibilities easier to find.

### 21. What is the observer pattern?

**Answer:** A publisher notifies registered subscribers when an event occurs.

**Explanation:** It reduces direct dependencies but can obscure control flow. Event names and payloads should be clear.

### 22. Why inject a payment or storage collaborator?

**Answer:** It makes the dependency explicit and allows production and test implementations to be substituted.

**Explanation:** A fake can verify the interaction without making a real external request.

### 23. What is a static method?

**Answer:** A method available on the class itself rather than on its instances.

**Explanation:** It can express class-level creation or validation. It should not hide unrelated global state.

### 24. What is an invariant?

**Answer:** A condition that should remain true for an object's valid state.

**Explanation:** Private state and validated operations help prevent callers from creating invalid values.

### 25. When is a plain function better than a class?

**Answer:** When an operation is stateless and needs no identity or related instance behavior.

**Explanation:** A class in that situation can add ceremony without clarifying the program.

## Code and reasoning questions

### 26. What does this code print?

~~~js
class Parent {
  describe() {
    return "parent";
  }
}

class Child extends Parent {
  describe() {
    return super.describe() + " child";
  }
}

console.log(new Child().describe());
~~~

**Answer:**

~~~text
parent child
~~~

**Explanation:** The child overrides **describe** and calls the base implementation with **super**.

### 27. Why does this callback not reliably preserve **this**?

~~~js
const user = {
  name: "Asha",
  getName() {
    return this.name;
  }
};

const callback = user.getName;
~~~

**Answer:** **callback** is an extracted function. Calling it does not call it as a method of **user**.

**Explanation:** The call site determines the receiver. Use **user.getName.bind(user)** or **() => user.getName()** to preserve it.

### 28. Write a validation rule for a positive integer quantity.

**Answer:**

~~~js
function assertPositiveInteger(value) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new RangeError("Value must be a positive integer");
  }
}
~~~

**Explanation:** Checking both integer status and positivity rejects zero, negative numbers, and fractions.

### 29. What is risky about returning a class's internal mutable array directly?

**Answer:** Callers can mutate it without going through the class's validation or rules.

**Explanation:** Return a copy or expose focused methods, depending on whether callers need a snapshot or controlled updates.

### 30. A service needs either email or console notifications. Should it inherit from both senders?

**Answer:** No. Give it a notification collaborator with the operation it needs.

**Explanation:** JavaScript has single class inheritance, and composition avoids mixing unrelated sender state into the service.

### 31. Which pattern translates a vendor payment API into an application's **charge** interface?

**Answer:** Adapter.

**Explanation:** The adapter contains the translation so vendor-specific names and data formats do not spread into application logic.

### 32. A constructor makes a network request. What design concern does this raise?

**Answer:** Object creation now has a hidden external effect and may fail or wait unexpectedly.

**Explanation:** Prefer explicit initialization or an injected method whose asynchronous behavior is visible to callers.

### 33. What should a subclass preserve when overriding a method?

**Answer:** The base method's meaningful contract, including accepted inputs and result meaning.

**Explanation:** Callers that use the base contract should continue to work when given the subtype.

### 34. A method only calculates tax from an explicit price and rate. Does it need a class?

**Answer:** Usually not. A pure function is likely clearer.

**Explanation:** A class is useful when state, identity, or a coherent group of instance behaviors is involved.

### 35. How can a test avoid charging a real card?

**Answer:** Inject a fake payment gateway that records the amount and returns a controlled result.

**Explanation:** This checks the service's interaction without causing an external side effect.

## Practical design questions

### 36. How can a cart protect its item list?

**Answer:** Keep its collection private and expose methods such as **add**, **remove**, and **subtotal**.

**Explanation:** The cart can validate product identifiers and quantities without letting callers bypass its rules.

### 37. A discount service has several policies. How can checkout avoid growing conditionals?

**Answer:** Define a small discount policy contract and inject its implementation into checkout.

**Explanation:** This is Strategy. Checkout depends on the operation, while each policy contains its own calculation.

### 38. When is a factory useful for notifications?

**Answer:** When configuration must select and validate a supported notification type.

**Explanation:** If the concrete type is already known and construction is simple, direct construction may be clearer.

### 39. What should an event subscription API provide?

**Answer:** Clear event names and payloads, plus an unsubscribe mechanism when listeners have limited lifetimes.

**Explanation:** Otherwise observers can remain registered too long, causing duplicate work or memory retention.

### 40. How do you decide whether a design pattern is helping?

**Answer:** Check whether it makes a real variation, dependency, or responsibility easier to understand and change.

**Explanation:** If it adds more indirection than the problem has, a direct function or object may be better.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [134 - Functional programming: composition and purity](../lessons/134-functional-programming-composition-and-purity.md) | [Lesson 135](../lessons/135-object-oriented-programming-composition-and-design-patterns.md) | [Open example](../examples/135-object-oriented-programming-composition-and-design-patterns.md) | [136 - Modular architecture and dependency boundaries](../lessons/136-modular-architecture-and-dependency-boundaries.md) |
