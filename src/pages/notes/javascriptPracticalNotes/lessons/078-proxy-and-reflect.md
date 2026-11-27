# 78 - Proxy and Reflect

JavaScript objects expose operations such as reading a property, assigning a value, checking whether a key exists, and listing keys. A **Proxy** can intercept many of those operations and define custom behavior. **Reflect** provides functions for performing the corresponding operations with explicit arguments and return values.

Proxies are useful for controlled metaprogramming, such as validation, logging, virtual properties, and reactive state. They also make ordinary object behavior less obvious. A proxy should have a clear purpose, preserve the target's invariants, and avoid surprising behavior for its callers.

## Learning goals

- Describe the target, handler, and trap of a Proxy.
- Recognize which language operations invoke common traps.
- Use Reflect to forward an operation to the target.
- Preserve the receiver when forwarding property access.
- Understand Proxy invariants and why invalid traps throw TypeError.
- Use callable, constructable, and revocable proxies.
- Identify identity, private-field, built-in, performance, and debugging tradeoffs.

## Target, handler, and proxy

A Proxy wraps a target object and a handler object.

~~~js
const target = {
  name: 'Ada'
};

const handler = {};

const proxy = new Proxy(target, handler);

console.log(proxy.name);
console.log(proxy !== target);
~~~

~~~text
Ada
true
~~~

The **target** is the object whose operations are wrapped. The **handler** contains optional methods called **traps**. The **proxy** is the object application code interacts with. An empty handler forwards operations to the target, so the proxy behaves like the target for ordinary operations while remaining a distinct object identity.

Both the target and handler must be objects. A handler does not need to implement every trap. If a trap is absent, the corresponding operation is forwarded to the target by the Proxy's default behavior.

A proxy is not a copy of its target. A property write through a proxy may change the target. A property write directly to the target does not necessarily pass through the proxy.

~~~js
const target = { count: 0 };

const proxy = new Proxy(target, {
  set(targetObject, property, value) {
    console.log('set trap:', String(property));
    return Reflect.set(targetObject, property, value);
  }
});

proxy.count = 1;
target.count = 2;

console.log(proxy.count);
~~~

~~~text
set trap: count
2
~~~

Only the assignment through **proxy** invoked the handler's set trap.

## Traps and the operations they intercept

A trap is named after the internal object operation it customizes. JavaScript syntax and built-in functions invoke these operations implicitly.

| Handler trap | Common operations intercepted |
| --- | --- |
| get | Read a property, such as object.key |
| set | Assign a property, such as object.key = value |
| has | Use the in operator |
| deleteProperty | Use the delete operator |
| ownKeys | Enumerate own keys, including Object.keys and Reflect.ownKeys |
| getOwnPropertyDescriptor | Inspect an own property descriptor |
| defineProperty | Use Object.defineProperty or Reflect.defineProperty |
| getPrototypeOf | Use Object.getPrototypeOf |
| setPrototypeOf | Use Object.setPrototypeOf |
| isExtensible | Use Object.isExtensible |
| preventExtensions | Use Object.preventExtensions |
| apply | Call a callable target as a function |
| construct | Use new with a constructable target |

The apply trap exists only when the target is callable. The construct trap exists only when the target is a constructor. A proxy around a non-callable object cannot become callable merely by defining apply.

~~~js
function add(left, right) {
  return left + right;
}

const loggedAdd = new Proxy(add, {
  apply(targetFunction, thisValue, argumentsList) {
    console.log('arguments:', argumentsList.join(', '));
    return Reflect.apply(targetFunction, thisValue, argumentsList);
  }
});

console.log(loggedAdd(2, 3));
~~~

~~~text
arguments: 2, 3
5
~~~

## Reflect for forwarding

The **Reflect** namespace provides static methods corresponding to many object operations. It is not a constructor. Its methods are useful inside traps because they express the operation being forwarded and return success values where appropriate.

| Reflect method | Operation |
| --- | --- |
| Reflect.get | Read a property |
| Reflect.set | Assign a property |
| Reflect.has | Check a property with behavior like in |
| Reflect.deleteProperty | Delete a property |
| Reflect.ownKeys | Get all own string and symbol keys |
| Reflect.getOwnPropertyDescriptor | Read an own property descriptor |
| Reflect.defineProperty | Define an own property |
| Reflect.getPrototypeOf | Read the prototype |
| Reflect.setPrototypeOf | Set the prototype |
| Reflect.isExtensible | Check whether new properties may be added |
| Reflect.preventExtensions | Prevent new properties |
| Reflect.apply | Call a function with a chosen this value and arguments |
| Reflect.construct | Construct an object with arguments and an optional newTarget |

For example, a set trap should usually return a Boolean result. Reflect.set returns true when the assignment succeeds and false when it does not.

~~~js
const proxy = new Proxy(
  { total: 10 },
  {
    set(target, property, value, receiver) {
      if (typeof value !== 'number') {
        throw new TypeError('Values must be numbers');
      }

      return Reflect.set(target, property, value, receiver);
    }
  }
);

proxy.total = 12;
console.log(proxy.total);
~~~

~~~text
12
~~~

Reflect does not disable proxies. If the target passed to Reflect is itself a proxy, the operation can invoke that proxy's trap.

### Preserve the receiver

A property getter or setter can use **this**. Inside a get or set trap, pass the receiver to Reflect.get or Reflect.set to preserve the normal receiver semantics.

~~~js
const source = {
  firstName: 'Ada',
  get label() {
    return this.firstName.toUpperCase();
  }
};

const proxy = new Proxy(source, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  }
});

console.log(proxy.label);
~~~

~~~text
ADA
~~~

The receiver is commonly the proxy used for the property access. It matters when a getter accesses other properties or when inheritance is involved. Omitting it may cause accessors to behave as if the target itself had been accessed.

### Avoid recursive traps

Forward to the target argument, not back to the proxy. Calling Reflect.get(proxy, property) from that proxy's own get trap invokes the same trap again and can recurse indefinitely.

~~~js
const target = { value: 1 };

const safeProxy = new Proxy(target, {
  get(targetObject, property, receiver) {
    return Reflect.get(targetObject, property, receiver);
  }
});
~~~

Use **targetObject** in Reflect.get. Passing **safeProxy** as the Reflect target would re-enter the get trap.

## Common property traps

### get

The get trap receives the target, property key, and receiver. It can read a real property, synthesize a virtual value, or apply a controlled transformation.

~~~js
const settings = new Proxy(
  { theme: 'dark' },
  {
    get(target, property, receiver) {
      if (property === 'themeLabel') {
        return 'Theme: ' + Reflect.get(target, 'theme', receiver);
      }

      return Reflect.get(target, property, receiver);
    }
  }
);

console.log(settings.themeLabel);
console.log(settings.theme);
~~~

~~~text
Theme: dark
dark
~~~

A virtual property may not appear in Object.keys or the in operator unless other traps provide a consistent view. If a proxy presents a virtual object shape, its related traps must work together and satisfy the invariants.

### set

The set trap receives the target, property key, value, and receiver. Return true when the assignment should be reported as successful, or false when it should fail. In strict mode, a false result from assignment can cause a TypeError. ES modules are strict mode.

Validation should be clear and predictable. Do not silently discard a write unless that is a documented part of the proxy's contract.

~~~js
const user = new Proxy(
  { age: 20 },
  {
    set(target, property, value, receiver) {
      if (property === 'age' && (!Number.isInteger(value) || value < 0)) {
        throw new RangeError('age must be a non-negative integer');
      }

      return Reflect.set(target, property, value, receiver);
    }
  }
);

user.age = 21;
~~~

### has and deleteProperty

The **has** trap customizes the in operator. The **deleteProperty** trap customizes delete. Their results are constrained by target properties and proxy invariants. Prefer forwarding with Reflect.has and Reflect.deleteProperty when no custom behavior is needed.

~~~js
const record = new Proxy(
  { id: 7, secret: 'hidden' },
  {
    has(target, property) {
      if (property === 'secret') {
        return false;
      }

      return Reflect.has(target, property);
    }
  }
);

console.log('id' in record);
console.log('secret' in record);
~~~

~~~text
true
false
~~~

This example can hide a configurable property in an extensible target. It cannot hide a non-configurable own property, or an own property of a non-extensible target.

### ownKeys and property descriptors

**ownKeys** affects operations such as Reflect.ownKeys, Object.keys, and parts of property enumeration. The trap must return an array of unique string or symbol keys and must include required target keys.

**getOwnPropertyDescriptor** customizes descriptor inspection. **defineProperty** customizes property definitions. These traps interact with Object.keys, Object.getOwnPropertyNames, Object.getOwnPropertySymbols, Object.assign, object spread, and Object.defineProperty.

A proxy that virtualizes an object's shape must keep property reads, membership checks, own-key enumeration, and descriptors mutually consistent. Each operation can be observed independently.

## Proxy invariants

The language checks certain proxy results against the target. These **invariants** preserve essential object rules. Returning a contradictory result throws a TypeError.

Important examples include:

- A get trap must return the actual value of a non-configurable, non-writable own data property.
- A get trap must return undefined for a non-configurable own accessor property with no getter.
- A set trap must not claim success when changing a non-configurable, non-writable own data property's value to a different value.
- A set trap must not claim success when assigning to a non-configurable own accessor property that has no setter.
- A has trap cannot hide a non-configurable own property or an own property of a non-extensible target.
- An ownKeys trap must include every non-configurable own key. If the target is non-extensible, it must report exactly the target's own keys.
- A getOwnPropertyDescriptor trap cannot report an incompatible descriptor or hide a required non-configurable property.
- A construct trap must return an object.
- When a target is non-extensible, prototype-related traps must report a result consistent with its actual prototype.
- An isExtensible trap must report the target's real extensibility. A preventExtensions trap cannot report success unless the target actually becomes non-extensible.

The target's descriptors matter. Make a data property non-writable and non-configurable, then try to report another value from get:

~~~js
const target = {};

Object.defineProperty(target, 'locked', {
  value: 1,
  writable: false,
  configurable: false
});

const proxy = new Proxy(target, {
  get() {
    return 2;
  }
});

console.log(proxy.locked);
~~~

Accessing **proxy.locked** throws a TypeError. The trap result conflicts with the target's non-configurable, non-writable property.

Do not build a proxy around invariants by returning convenient but contradictory answers. Design its virtual behavior around the target's actual descriptors and extensibility.

## Callable and constructable proxies

A proxy wrapping a function can intercept calls with **apply** and construction with **construct**. These traps can observe or validate operations, then forward using Reflect.

~~~js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

const TrackedProduct = new Proxy(Product, {
  construct(target, argumentsList, newTarget) {
    console.log('constructing:', argumentsList[0]);
    return Reflect.construct(target, argumentsList, newTarget);
  }
});

const product = new TrackedProduct('Notebook', 5);

console.log(product.name);
console.log(product instanceof Product);
~~~

~~~text
constructing: Notebook
Notebook
true
~~~

A construct trap must return an object. Its target must itself be constructable. **newTarget** should be forwarded to Reflect.construct when preserving subclassing and new.target behavior matters.

## Revocable proxies

**Proxy.revocable()** returns a proxy and a revoke function. After revocation, operations that use the proxy throw a TypeError.

~~~js
const revocable = Proxy.revocable(
  { token: 'temporary' },
  {}
);

console.log(revocable.proxy.token);

revocable.revoke();

try {
  console.log(revocable.proxy.token);
} catch (error) {
  console.log(error.name);
}
~~~

~~~text
temporary
TypeError
~~~

Revocation is useful when access to a wrapped capability should end. It does not undo changes already made to the target, erase values that callers copied, or revoke other references to the target.

## Practical uses

Use a Proxy when an operation needs to be observed or customized at the object boundary:

- Validate values when properties are assigned.
- Log reads or writes for diagnostics.
- Provide controlled virtual properties.
- Expose a read-only view with assignment attempts rejected.
- Implement reactive state systems that observe reads and writes.
- Wrap a function to add argument checks or instrumentation.
- Restrict access through a revocable capability.

For simple validation, explicit setter functions or classes may be easier to understand. A proxy intercepts operations implicitly, so it can surprise code that expects ordinary objects.

## Limitations and design cautions

- **Identity differs:** proxy !== target. Maps and Sets treat them as different keys.
- **Access paths matter:** operations performed directly on the target bypass the proxy.
- **Private fields need the correct receiver:** calling a method through a proxy may make private-field access fail because this is the proxy rather than the original instance.
- **Built-ins may require internal slots:** objects such as Map, Date, and typed arrays may reject a proxy as their receiver. Blindly binding every method to the target can break identity and method behavior.
- **Invariants still apply:** a trap cannot contradict non-configurable properties or target extensibility.
- **Enumeration needs coordination:** get alone does not define what keys, descriptors, or membership checks report.
- **Debugging gets harder:** reads and writes may run arbitrary handler code, throw, or recurse.
- **Performance can be affected:** proxy operations add indirection. Measure before using proxies on hot paths.
- **Cloning and serialization are not universal:** structured cloning and APIs that require ordinary objects can have restrictions or semantics that differ from simple property access.

A proxy is not a security boundary by itself. Keep the underlying target and other references private when access restrictions matter, and review every operation exposed by the wrapper.

## Reflect beyond proxy traps

Reflect can also make an operation explicit outside a Proxy:

~~~js
const object = {
  value: 4,
  double() {
    return this.value * 2;
  }
};

console.log(Reflect.get(object, 'value'));
console.log(Reflect.has(object, 'double'));
console.log(Reflect.apply(object.double, object, []));
console.log(Reflect.ownKeys(object));
~~~

~~~text
4
true
8
[ 'value', 'double' ]
~~~

Some Reflect methods resemble Object static methods but differ in return behavior. For example, Reflect.defineProperty returns a Boolean indicating success, while Object.defineProperty returns the object or throws. Reflect.set also reports success as a Boolean. These forms can help implement generic code without relying on exceptions for every failed operation.

## Common mistakes

- Treating a proxy as a clone instead of a wrapper around a target.
- Assuming operations on the target pass through the proxy.
- Forgetting the receiver argument in Reflect.get or Reflect.set.
- Forwarding with Reflect on the proxy itself and causing infinite recursion.
- Returning a value that violates a non-configurable property invariant.
- Returning a non-Boolean success result from traps where Boolean is required.
- Assuming get defines enumeration, descriptors, or the in operator behavior.
- Assuming a proxy around a plain object automatically works with private fields or built-in objects.
- Forgetting that a callable proxy requires a callable target.
- Returning a primitive from a construct trap.
- Expecting revocation to undo earlier target mutations or erase copied values.
- Using Proxy where a simple explicit function or setter would be clearer.

## Practice

1. Create a proxy with a get trap that logs the property name and forwards using Reflect.get.
2. Add a set trap that allows only finite, non-negative numbers.
3. Use a getter that reads this and confirm forwarding the receiver preserves its behavior.
4. Hide a configurable property with has, then make it non-configurable and observe the invariant.
5. Return custom own keys and explain how Object.keys and Reflect.ownKeys differ.
6. Use a callable proxy to log arguments and forward with Reflect.apply.
7. Use a construct trap to validate arguments and forward with Reflect.construct.
8. Create and revoke a proxy, then handle the TypeError from a later read.
9. Compare a target and proxy as Map keys.
10. Try a proxy around an object with a private field and explain why the receiver matters.
11. Use Reflect.defineProperty and inspect its Boolean result.
12. Identify when explicit methods would be clearer than an implicit proxy.

## Key points

- A Proxy wraps a target and delegates selected operations to handler traps.
- Reflect offers explicit versions of many object operations and is the usual forwarding tool inside traps.
- Preserve the receiver for getter and setter semantics.
- Proxy invariants constrain results, especially for non-configurable properties and non-extensible targets.
- Function targets can support apply and construct traps; Proxy.revocable can disable a proxy.
- A proxy has distinct identity and can interact unexpectedly with private fields, built-ins, and code holding the target directly.
- Use proxies for clear boundary behavior and prefer simpler explicit APIs when they are easier to reason about.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [77 - Intl and locale-aware formatting](077-intl-and-locale-aware-formatting.md) | [Open Q&A](../qnas/078-proxy-and-reflect.md) | [Open example](../examples/078-proxy-and-reflect.md) | [79 - Memory, garbage collection, and weak references](079-memory-garbage-collection-and-weak-references.md) |
