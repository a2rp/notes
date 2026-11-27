# 78 - Proxy and Reflect Q&A

These questions review Proxy targets, handlers, traps, Reflect forwarding, invariants, callable and revocable proxies, and practical limitations. Each answer follows its question.

## Proxy foundations

### 1. What are the three parts involved in a Proxy?

**Answer:** The target, the handler, and the proxy object.

**Explanation:** The target is wrapped, the handler contains optional traps, and application code interacts with the proxy.

### 2. What does a Proxy trap do?

**Answer:** It customizes a corresponding object operation, such as getting a property or checking whether a key exists.

**Explanation:** Language syntax and built-in functions invoke the operation, which can call the matching handler method.

### 3. Must a handler implement every trap?

**Answer:** No.

**Explanation:** Missing traps use the Proxy's default forwarding behavior for the corresponding operation.

### 4. Are the proxy and target the same object identity?

**Answer:** No. They are distinct objects.

**Explanation:** For example, proxy === target is false even when the proxy wraps that target with an empty handler.

### 5. Do direct operations on the target pass through its proxy?

**Answer:** No.

**Explanation:** The proxy intercepts operations performed through the proxy. Code holding the target can interact with it directly.

### 6. What is the difference between a target and a handler?

**Answer:** The target is the object being wrapped. The handler defines optional custom behavior.

**Explanation:** Handler methods receive the target as an argument and are called when operations on the proxy match their traps.

### 7. Can a Proxy around a plain object become callable by adding an apply trap?

**Answer:** No.

**Explanation:** A callable proxy requires a callable target. A constructable proxy likewise requires a constructable target.

## Reflect and forwarding

### 8. What is Reflect?

**Answer:** A namespace object with static methods for invoking many object operations explicitly.

**Explanation:** Reflect is not a constructor. Its methods correspond to operations such as get, set, has, deleteProperty, and ownKeys.

### 9. Why is Reflect commonly used inside a trap?

**Answer:** It forwards the operation to the target using the corresponding object behavior.

**Explanation:** For example, a get trap can return Reflect.get(target, property, receiver) after logging the read.

### 10. Why can Reflect.get(proxy, property) inside that proxy's get trap recurse forever?

**Answer:** Because the Reflect operation targets the proxy again and invokes the same get trap.

**Explanation:** Forward to the trap's target argument instead of the proxy.

### 11. What does Reflect.set return?

**Answer:** A Boolean indicating whether the assignment succeeded.

**Explanation:** It reports success or failure directly. Assignment syntax has different return and strict-mode behavior.

### 12. Why pass receiver to Reflect.get or Reflect.set?

**Answer:** To preserve the receiver used for getter and setter this behavior.

**Explanation:** This matters when accessors use this, including inherited properties and properties accessed through the proxy.

### 13. What does Reflect.has(target, key) correspond to?

**Answer:** The in operation.

**Explanation:** It checks for an own or inherited property according to the target's behavior.

### 14. Which keys does Reflect.ownKeys return?

**Answer:** All own string and symbol keys, including non-enumerable keys.

**Explanation:** Object.keys returns only enumerable own string keys, so it is narrower.

### 15. How does Reflect.defineProperty differ from Object.defineProperty in its result?

**Answer:** Reflect.defineProperty returns a Boolean. Object.defineProperty returns the target object on success and throws on failure.

**Explanation:** The Boolean result can be useful in generic code that needs to branch on success.

### 16. Does Reflect bypass a Proxy?

**Answer:** No.

**Explanation:** Reflect invokes the corresponding operation on the object supplied as its target. If that object is a proxy, its traps can run.

## Common traps and invariants

### 17. Which trap intercepts reading object.name?

**Answer:** get.

**Explanation:** Property access invokes the get operation. The trap receives the target, property key, and receiver.

### 18. Which trap intercepts object.name = value?

**Answer:** set.

**Explanation:** A set trap receives the target, property key, value, and receiver. It should return a Boolean result or throw.

### 19. What can happen if a set trap returns false during assignment in strict mode?

**Answer:** The assignment can throw a TypeError.

**Explanation:** ES modules are strict mode. A trap should communicate rejected writes deliberately, often by throwing a descriptive error.

### 20. Which trap customizes the in operator?

**Answer:** has.

**Explanation:** A check such as 'name' in proxy can invoke the handler's has trap.

### 21. Which trap customizes key enumeration operations?

**Answer:** ownKeys.

**Explanation:** Operations such as Reflect.ownKeys, Object.keys, and Object.getOwnPropertyNames depend on own-key behavior. Some of them also inspect descriptors.

### 22. Why must a virtual object shape coordinate multiple traps?

**Answer:** Reads, key enumeration, descriptors, and membership checks are separate operations.

**Explanation:** A proxy that changes only get may return a virtual property but still omit it from enumeration or report it absent with in.

### 23. What happens if a get trap returns a different value for a non-configurable, non-writable own data property?

**Answer:** The access throws a TypeError.

**Explanation:** The trap cannot contradict this target property invariant.

### 24. Can a has trap hide a non-configurable own property?

**Answer:** No.

**Explanation:** It also cannot hide an own property of a non-extensible target. Attempting to do so violates an invariant and throws.

### 25. What must ownKeys report when the target is non-extensible?

**Answer:** Exactly the target's own keys, with no duplicates.

**Explanation:** For extensible targets, required non-configurable own keys still must be included. Every returned key must be a string or symbol.

### 26. What must a construct trap return?

**Answer:** An object.

**Explanation:** Returning a primitive violates the construct invariant and causes a TypeError.

### 27. Can a construct trap make a non-constructor target constructable?

**Answer:** No.

**Explanation:** The target itself must support construction for the proxy to be used with new.

### 28. What must an isExtensible trap report?

**Answer:** The target's actual extensibility.

**Explanation:** The result cannot contradict Object.isExtensible(target).

### 29. What does a successful preventExtensions trap imply about the target?

**Answer:** The target must actually be non-extensible.

**Explanation:** The trap cannot report success while leaving the target extensible.

### 30. What prototype constraint applies when the target is non-extensible?

**Answer:** Prototype-related traps must report the target's actual prototype.

**Explanation:** Invariants prevent the proxy from claiming a different prototype after the target's structure has been locked.

## Function and revocable proxies

### 31. Which trap intercepts calling a function proxy?

**Answer:** apply.

**Explanation:** It receives the target function, this value, and argument list. Use Reflect.apply to forward the call.

### 32. Which trap intercepts new with a function proxy?

**Answer:** construct.

**Explanation:** It receives the target, argument list, and newTarget. Reflect.construct can forward while preserving construction semantics.

### 33. Why should a construct trap usually forward newTarget?

**Answer:** To preserve new.target and subclassing behavior.

**Explanation:** Reflect.construct accepts newTarget as its third argument so the constructed object's prototype behavior can follow the original operation.

### 34. What does Proxy.revocable() return?

**Answer:** An object containing a proxy and a revoke function.

**Explanation:** Calling revoke disables the proxy. Later operations through it throw a TypeError.

### 35. Does revoking a proxy undo earlier changes to its target?

**Answer:** No.

**Explanation:** Revocation prevents later operations through that proxy. It does not reverse target mutations or erase values already copied elsewhere.

## Identity and practical behavior

### 36. Why can proxy identity matter when using a Map?

**Answer:** A Map distinguishes the target and proxy as separate keys.

**Explanation:** Object keys are matched by identity. Wrapping an object does not make the proxy interchangeable with the original object.

### 37. Why can a proxied class instance with private fields fail when a method is called through the proxy?

**Answer:** The method may receive the proxy as this, which does not carry the target instance's private-field brand.

**Explanation:** Private fields are checked against the actual instance. A proxy is a distinct object, so methods that rely on private fields need an intentional receiver strategy.

### 38. Why can a Proxy around Map or another built-in object behave unexpectedly?

**Answer:** Some built-in methods and accessors require internal slots on their receiver, which a proxy does not automatically have.

**Explanation:** Blindly binding every method to the target can also change this semantics and identity. Use a wrapper designed for the specific API when necessary.

### 39. Which approach is usually clearer for a small validation requirement?

- A. Add many traps to a Proxy with unrelated behavior.
- B. Use an explicit function, setter, or class method if it expresses the rule directly.
- C. Hide every invalid property from ownKeys.
- D. Make the target non-extensible before every write.

**Answer:** B.

**Explanation:** Proxies are powerful, but implicit interception can make code harder to reason about. Prefer the simplest interface that meets the requirement.

### 40. Write a logging get trap that forwards normally.

**Answer:**

~~~js
const target = { score: 10 };

const proxy = new Proxy(target, {
  get(targetObject, property, receiver) {
    console.log('read:', String(property));
    return Reflect.get(targetObject, property, receiver);
  }
});

console.log(proxy.score);
~~~

~~~text
read: score
10
~~~

**Explanation:** The trap logs the property and forwards to its target. Passing the receiver preserves getter behavior, and using targetObject avoids recursively reading from proxy.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [77 - Intl and locale-aware formatting](../lessons/077-intl-and-locale-aware-formatting.md) | [Lesson](../lessons/078-proxy-and-reflect.md) Â· [Example](../examples/078-proxy-and-reflect.md) | [79 - Memory, garbage collection, and weak references](../lessons/079-memory-garbage-collection-and-weak-references.md) |
