# 67 - Symbols and well-known symbols: Q&A

This question set reviews symbol identity, symbol property keys, registry symbols, property reflection, serialization, and well-known symbols. Each answer follows its question with an explanation or expected output.

## Multiple-choice questions

### 1. What does each call to **Symbol("tag")** produce?

- A. A string named **"tag"**
- B. A new unique symbol
- C. The same registered symbol each time
- D. A symbol property on the global object

- A. A string named **"tag"**
- B. A new unique symbol
- C. The same registered symbol each time
- D. A symbol property on the global object

**Answer: B.** Each **Symbol()** call creates a new unique primitive. The optional description does not determine identity.

### 2. What is the purpose of a symbol description?

- A. It makes symbols with the same description equal.
- B. It provides readable diagnostic information.
- C. It registers the symbol globally.
- D. It hides the symbol property from reflection.

- A. It makes symbols with the same description equal.
- B. It provides readable diagnostic information.
- C. It registers the symbol globally.
- D. It hides the symbol property from reflection.

**Answer: B.** A description helps humans inspect a symbol. It does not affect equality, registry membership, or privacy.

### 3. How do you retrieve a symbol from the global symbol registry?

- A. **Symbol("key")**
- B. **Symbol.for("key")**
- C. **new Symbol("key")**
- D. **Symbol.description("key")**

- A. **Symbol("key")**
- B. **Symbol.for("key")**
- C. **new Symbol("key")**
- D. **Symbol.description("key")**

**Answer: B.** **Symbol.for(key)** retrieves an existing registry symbol for that key or creates one if needed.

### 4. Which method finds an own symbol key on an object?

- A. **Object.keys(object)**
- B. **Object.getOwnPropertySymbols(object)**
- C. **Object.getOwnPropertyNames(object)**
- D. **JSON.stringify(object)**

- A. **Object.keys(object)**
- B. **Object.getOwnPropertySymbols(object)**
- C. **Object.getOwnPropertyNames(object)**
- D. **JSON.stringify(object)**

**Answer: B.** **Object.getOwnPropertySymbols()** returns the object's own symbol keys, including non-enumerable ones.

### 5. Which method returns every own string and symbol key?

- A. **Object.keys(object)**
- B. **Object.getOwnPropertyNames(object)**
- C. **Reflect.ownKeys(object)**
- D. **Object.values(object)**

- A. **Object.keys(object)**
- B. **Object.getOwnPropertyNames(object)**
- C. **Reflect.ownKeys(object)**
- D. **Object.values(object)**

**Answer: C.** **Reflect.ownKeys()** returns all own keys, including string and symbol keys, whether enumerable or not.

### 6. What does **Symbol.iterator** provide?

- A. A property key used only for private fields
- B. The method that returns an object's default synchronous iterator
- C. A function that converts every object to an array
- D. The default asynchronous iterator

- A. A property key used only for private fields
- B. The method that returns an object's default synchronous iterator
- C. A function that converts every object to an array
- D. The default asynchronous iterator

**Answer: B.** **Symbol.iterator** is used by synchronous iteration protocols such as **for...of**. **Symbol.asyncIterator** serves async iteration.

### 7. What does **Symbol.toPrimitive** customize?

- A. The conversion of an object to a primitive value
- B. The object's prototype
- C. JSON property order
- D. Symbol equality

- A. The conversion of an object to a primitive value
- B. The object's prototype
- C. JSON property order
- D. Symbol equality

**Answer: A.** An object can define **[Symbol.toPrimitive]** to choose a primitive representation based on a conversion hint.

### 8. What happens to symbol-keyed properties during **JSON.stringify(object)**?

- A. They are serialized as strings.
- B. They are included only when non-enumerable.
- C. They are omitted.
- D. Serialization always throws.

- A. They are serialized as strings.
- B. They are included only when non-enumerable.
- C. They are omitted.
- D. Serialization always throws.

**Answer: C.** JSON serialization does not include symbol-keyed object properties.

### 9. What does **Symbol.for("shared")** return on repeated calls?

- A. A different symbol each time
- B. The same registry symbol for that key
- C. A string
- D. A well-known symbol

- A. A different symbol each time
- B. The same registry symbol for that key
- C. A string
- D. A well-known symbol

**Answer: B.** The global symbol registry returns the same symbol for the same registry key.

### 10. Are symbol-keyed object properties private?

- A. Yes, reflection cannot find them.
- B. Yes, only the declaring module can read them.
- C. No, reflection can discover them.
- D. They are private only when they are enumerable.

- A. Yes, reflection cannot find them.
- B. Yes, only the declaring module can read them.
- C. No, reflection can discover them.
- D. They are private only when they are enumerable.

**Answer: C.** **Object.getOwnPropertySymbols()** and **Reflect.ownKeys()** can discover symbol keys. Use private fields or closures for privacy.

## True or false

### 11. Two symbols created with the same description are equal.

**Answer: False.** Each call to **Symbol()** creates a new unique value, regardless of matching descriptions.

### 12. The **new** operator is used to create symbols.

**Answer: False.** Call **Symbol()** as a function. **new Symbol()** throws a **TypeError**.

### 13. **Symbol.keyFor(localSymbol)** returns the symbol's description.

**Answer: False.** It returns the registry key for a symbol created through **Symbol.for()**. For an unregistered local symbol, it returns **undefined**.

### 14. **Object.keys()** includes enumerable symbol keys.

**Answer: False.** **Object.keys()** includes enumerable own string keys only. Use **Object.getOwnPropertySymbols()** or **Reflect.ownKeys()** for symbols.

### 15. Object spread copies enumerable own symbol properties.

**Answer: True.** Object spread copies enumerable own string and symbol properties. It does not copy non-enumerable properties.

### 16. JSON serializes a symbol value in an array as **null**.

**Answer: True.** A symbol in an array position is serialized as **null**. At the top level, **JSON.stringify(symbol)** returns **undefined**.

### 17. A well-known symbol can be recreated by calling **Symbol()** with the same description.

**Answer: False.** Use the built-in property, such as **Symbol.iterator**. A local symbol with description **"Symbol.iterator"** is a different symbol.

### 18. A symbol key can prevent accidental collisions with ordinary string property names.

**Answer: True.** Code using distinct symbol values does not accidentally collide with a string key. Symbols are still discoverable and are not a privacy mechanism.

## Predict the output

### 19. Are these symbols equal?

~~~js
const first = Symbol("mode");
const second = Symbol("mode");

console.log(first === second);
console.log(first.description);
~~~

**Answer:**

~~~text
false
mode
~~~

**Explanation:** The description is the same, but the symbol identities are different.

### 20. What do the registry calls return?

~~~js
const first = Symbol.for("app.mode");
const second = Symbol.for("app.mode");

console.log(first === second);
console.log(Symbol.keyFor(first));
~~~

**Answer:**

~~~text
true
app.mode
~~~

**Explanation:** Both calls use the same global registry key, so they retrieve the same symbol.

### 21. What does **Symbol.keyFor()** return for a local symbol?

~~~js
const local = Symbol("module only");

console.log(Symbol.keyFor(local));
console.log(local.description);
~~~

**Answer:**

~~~text
undefined
module only
~~~

**Explanation:** The symbol has a description but is not registered. **keyFor()** only reports registry keys.

### 22. Which keys are returned by each method?

~~~js
const marker = Symbol("marker");
const object = {
  name: "file",
  [marker]: true
};

console.log(Object.keys(object).length);
console.log(Object.getOwnPropertySymbols(object).length);
console.log(Reflect.ownKeys(object).length);
~~~

**Answer:**

~~~text
1
1
2
~~~

**Explanation:** **Object.keys()** returns the string key. The symbol method returns the symbol key, and **Reflect.ownKeys()** returns both.

### 23. What does the object spread copy?

~~~js
const marker = Symbol("marker");
const original = {
  label: "draft",
  [marker]: "review"
};

const copy = { ...original };

console.log(copy.label);
console.log(copy[marker]);
~~~

**Answer:**

~~~text
draft
review
~~~

**Explanation:** Both properties are enumerable own properties, so object spread copies the string and symbol property values.

### 24. What does JSON serialization output?

~~~js
const marker = Symbol("marker");
const object = {
  visible: 1,
  [marker]: 2,
  value: Symbol("value")
};

console.log(JSON.stringify(object));
console.log(JSON.stringify([Symbol("item")]));
console.log(JSON.stringify(Symbol("top")));
~~~

**Answer:**

~~~text
{"visible":1}
[null]
undefined
~~~

**Explanation:** Symbol-keyed object properties and symbol-valued object properties are omitted. An array symbol becomes **null**, while a top-level symbol produces **undefined**.

### 25. Which value does each conversion produce?

~~~js
const value = {
  amount: 8,

  [Symbol.toPrimitive](hint) {
    return hint === "string" ? "eight" : this.amount;
  }
};

console.log(String(value));
console.log(Number(value));
~~~

**Answer:**

~~~text
eight
8
~~~

**Explanation:** The conversion hook receives a hint and returns the appropriate primitive.

### 26. What does the custom string tag print?

~~~js
const item = {
  [Symbol.toStringTag]: "InventoryItem"
};

console.log(Object.prototype.toString.call(item));
~~~

**Answer:**

~~~text
[object InventoryItem]
~~~

**Explanation:** **Object.prototype.toString()** uses **Symbol.toStringTag** when the object defines it.

### 27. What does this iterable produce?

~~~js
const pair = {
  [Symbol.iterator]() {
    let index = 1;

    return {
      next() {
        if (index <= 2) {
          return { value: index++, done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...pair].join(", "));
~~~

**Answer:**

~~~text
1, 2
~~~

**Explanation:** Array spread calls the iterator method and consumes values until **done** is true.

### 28. What does the customized **instanceof** check return?

~~~js
class PositiveInteger {}

Object.defineProperty(PositiveInteger, Symbol.hasInstance, {
  value(value) {
    return Number.isInteger(value) && value > 0;
  }
});

console.log(3 instanceof PositiveInteger);
console.log(-3 instanceof PositiveInteger);
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The constructor's custom **Symbol.hasInstance** method defines the check instead of relying on the normal instance prototype relationship.

### 29. What does **concat()** do with this object?

~~~js
const letters = {
  0: "x",
  1: "y",
  length: 2,
  [Symbol.isConcatSpreadable]: true
};

console.log(["start"].concat(letters).join(", "));
~~~

**Answer:**

~~~text
start, x, y
~~~

**Explanation:** **Symbol.isConcatSpreadable** tells **concat()** to include the array-like object's indexed values.

## Short-answer questions

### 30. What is a symbol?

**Answer:** A symbol is a unique immutable primitive value. It can be used as an object property key and is often used for collision-resistant property names or language extension hooks.

### 31. Does a symbol description determine identity?

**Answer:** No. The description is only diagnostic information. Use the symbol value itself for identity, or use **Symbol.for()** when a shared registry symbol is intended.

### 32. What is the difference between a local symbol and a registry symbol?

**Answer:** **Symbol(description)** creates a new local symbol each time. **Symbol.for(key)** retrieves or creates a symbol in the global symbol registry for that key.

### 33. What does **Symbol.keyFor()** return?

**Answer:** It returns the registry key for a registered symbol. It returns **undefined** for a local symbol that was not created through **Symbol.for()**.

### 34. How can code list all own symbol keys on an object?

**Answer:** Use **Object.getOwnPropertySymbols(object)**. Use **Reflect.ownKeys(object)** when both string and symbol keys are needed.

### 35. Why are symbols not private?

**Answer:** Reflection methods can discover them. A symbol key can reduce naming collisions, but it does not prevent code from inspecting or accessing the property.

### 36. What does **Symbol.iterator** do?

**Answer:** It names the method that returns an object's default synchronous iterator. Constructs such as **for...of** and array spread use the iterator protocol.

### 37. What does **Symbol.toPrimitive** do?

**Answer:** It lets an object define how it converts to a primitive value. The conversion operation provides a hint, and the hook must return a primitive.

### 38. How does **Symbol.toStringTag** affect an object?

**Answer:** It supplies the tag used by **Object.prototype.toString()**. It changes the displayed tag, not the object's prototype, class, or security.

### 39. What is the purpose of **Symbol.hasInstance**?

**Answer:** It customizes the behavior of **instanceof** for a constructor. Since it can make **instanceof** mean something other than prototype membership, use it only when that meaning is intentional.

### 40. What does **Symbol.species** customize?

**Answer:** It lets certain built-in constructors choose which constructor creates a derived result, such as the result of an array method. It is an advanced extension point.

## Coding and design questions

### 41. Create a symbol-keyed property and read it through reflection.

**Answer:**

~~~js
const internalKey = Symbol("internal");
const record = {
  name: "guide",
  [internalKey]: 7
};

const symbolKeys = Object.getOwnPropertySymbols(record);

console.log(record[symbolKeys[0]]);
console.log(Reflect.ownKeys(record).length);
~~~

Output:

~~~text
7
2
~~~

**Explanation:** Reflection returns the symbol key, which can then be used to read its value. This also demonstrates that the property is discoverable.

### 42. Use a registry symbol for an intentional shared key.

**Answer:**

~~~js
const firstPartKey = Symbol.for("app.cache");
const secondPartKey = Symbol.for("app.cache");

const object = {
  [firstPartKey]: "shared"
};

console.log(object[secondPartKey]);
console.log(Symbol.keyFor(firstPartKey));
~~~

Output:

~~~text
shared
app.cache
~~~

**Explanation:** Both parts retrieve the same symbol because they use the same registry key. Registry keys should be specific enough to avoid collisions.

### 43. Make an object iterable with its own values.

**Answer:**

~~~js
const colors = {
  values: ["red", "blue"],

  [Symbol.iterator]() {
    let index = 0;
    const values = this.values;

    return {
      next() {
        if (index < values.length) {
          return { value: values[index++], done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...colors].join(", "));
~~~

Output:

~~~text
red, blue
~~~

**Explanation:** The object's **Symbol.iterator** method returns an iterator. Each call to **next()** returns one value, then marks the sequence complete.

### 44. Implement primitive conversion for a measurement.

**Answer:**

~~~js
const measurement = {
  value: 15,

  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return this.value + " meters";
    }

    return this.value;
  }
};

console.log(String(measurement));
console.log(Number(measurement));
~~~

Output:

~~~text
15 meters
15
~~~

**Explanation:** The string hint selects a descriptive representation. Numeric conversion receives a numeric hint and returns the number.

### 45. Explain how to protect private data.

**Answer:** Do not rely on a symbol key. Use a private class field or a closure.

~~~js
class User {
  #token;

  constructor(token) {
    this.#token = token;
  }

  hasToken() {
    return this.#token.length > 0;
  }
}

const user = new User("secret");

console.log(user.hasToken());
console.log(Reflect.ownKeys(user).length);
~~~

Output:

~~~text
true
0
~~~

**Explanation:** The private field is not an ordinary own property key and cannot be retrieved through **Reflect.ownKeys()**.

## Review checklist

Before moving on, make sure you can explain:

- Why symbols with matching descriptions are still different.
- How **Symbol.for()** and **Symbol.keyFor()** work.
- Which reflection methods include symbol keys.
- How copying and JSON serialization treat symbol properties.
- Why a symbol key is not a privacy boundary.
- How well-known symbols connect objects to built-in protocols.
- How **Symbol.iterator**, **Symbol.toPrimitive**, and **Symbol.toStringTag** affect behavior.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [66 - WeakMap and WeakSet](../lessons/066-weakmap-and-weakset.md) | [Open lesson](../lessons/067-symbols-and-well-known-symbols.md) | [Open example](../examples/067-symbols-and-well-known-symbols.md) | [68 - Iterables and the iterator protocol](../lessons/068-iterables-and-the-iterator-protocol.md) |
