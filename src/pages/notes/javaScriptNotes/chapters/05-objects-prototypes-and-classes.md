# 5. Objects, prototypes, and classes

Objects store named properties. Use dot notation when the property name is known, and bracket notation for dynamic keys. A property lookup first checks the object itself and then follows its prototype chain. `Object.hasOwn(value, key)` checks only an object's own property; the `in` operator also checks inherited properties.

```js
const settings = { theme: "dark" };
const key = "theme";
console.log(settings[key]); // dark
console.log(Object.hasOwn(settings, key)); // true
```

Object spread (`{ ...source }`) and `Object.assign` copy enumerable own properties into a new object. These copies are **shallow**: nested objects are still shared. Do not treat a shallow copy as deep isolation.

## Prototypes and classes

Every ordinary object has a prototype (or `null`). Property delegation through prototypes enables shared methods and is the mechanism behind JavaScript's inheritance model. `class` provides clearer syntax over that model; it does not introduce a separate object system.

```js
class Timer {
  #startedAt;

  constructor(clock = Date) {
    this.clock = clock;
    this.#startedAt = clock.now();
  }

  elapsed() {
    return this.clock.now() - this.#startedAt;
  }
}
```

Private fields beginning with `#` are enforced by the language. Class methods live on the prototype; static methods belong to the class itself. Prefer composition—objects that hold smaller capabilities—when a deep inheritance hierarchy would make behavior hard to change.

## Descriptors and defensive boundaries

Properties can be data properties or accessor properties. Descriptors control enumerability, writability, and configurability. These mechanisms are useful for libraries and specialized models; ordinary application objects rarely need custom descriptors.

When consuming JSON or plugin data, check its shape before using nested properties. A plain object is not automatically trusted just because it has the expected property names.

## References

- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
