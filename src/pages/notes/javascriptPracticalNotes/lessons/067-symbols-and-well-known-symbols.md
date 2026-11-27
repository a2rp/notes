# 67 - Symbols and well-known symbols

A **Symbol** is a primitive value that is unique and immutable. Symbols are often used as object property keys when a library needs a key that is unlikely to collide with ordinary string property names. JavaScript also provides well-known symbols that let objects customize how built-in language features work.

Symbols are not private values. Code that can inspect an object can discover its symbol keys. Use class private fields or closures when data must be private.

## Learning goals

By the end of this chapter, you should be able to:

- Create symbols and explain why each **Symbol()** call is unique.
- Use symbol descriptions and convert symbols to readable strings safely.
- Add a symbol-keyed property and find it with reflection methods.
- Explain the difference between local symbols, registry symbols, and well-known symbols.
- Describe what JSON and ordinary property enumeration do with symbol keys.
- Use common well-known symbols to customize built-in behavior.
- Avoid treating symbol keys as a security or privacy boundary.

## Create a symbol

Call **Symbol()** to create a new symbol. An optional description helps debugging, but it does not determine identity.

~~~js
const first = Symbol("status");
const second = Symbol("status");

console.log(typeof first);
console.log(first === second);
console.log(first.description);
~~~

Output:

~~~text
symbol
false
status
~~~

Both symbols have the same description, but they are different values. The description is metadata for humans. It is not a unique key and does not make symbols with the same description equal.

Symbols are primitives and immutable. Do not use **new Symbol()**. The **Symbol** function is not a constructor.

~~~js
try {
  new Symbol("status");
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

## Convert a symbol to a readable string

Use **String(symbol)** or the symbol's **description** when readable text is needed.

~~~js
const key = Symbol("cache entry");

console.log(String(key));
console.log(key.description);
~~~

Output:

~~~text
Symbol(cache entry)
cache entry
~~~

Implicit string conversion is not always accepted. For example, concatenating a symbol with a string throws a **TypeError**.

~~~js
const key = Symbol("id");

try {
  console.log("Key: " + key);
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

Use explicit conversion when displaying a symbol. The description itself can be **undefined** if no description was supplied.

~~~js
const key = Symbol();

console.log(key.description === undefined);
console.log(String(key));
~~~

Output:

~~~text
true
Symbol()
~~~

## Use a symbol as an object property key

A symbol can be used inside computed property syntax or with bracket access.

~~~js
const internalId = Symbol("internal id");

const user = {
  name: "Asha",
  [internalId]: 42
};

console.log(user.name);
console.log(user[internalId]);
~~~

Output:

~~~text
Asha
42
~~~

The symbol key avoids accidental collision with a string property of the same printed description. It does not make the value inaccessible to code that has the object.

Two independently created symbols with the same description refer to different properties.

~~~js
const firstKey = Symbol("state");
const secondKey = Symbol("state");
const record = {
  [firstKey]: "saved"
};

console.log(record[firstKey]);
console.log(record[secondKey]);
~~~

Output:

~~~text
saved
undefined
~~~

A consumer must have the actual symbol value to read that property. Knowing only the description is not enough.

## Symbols are not private

Symbol properties are discoverable through reflection. They can help avoid naming collisions, but they must not be used to protect secrets.

~~~js
const token = Symbol("token");
const session = {
  user: "Mina",
  [token]: "abc123"
};

const keys = Object.getOwnPropertySymbols(session);

console.log(keys.length);
console.log(session[keys[0]]);
~~~

Output:

~~~text
1
abc123
~~~

If a value must be inaccessible from outside a class, use a private field such as **#token** or keep it in a closure. A symbol key is still part of the object's properties.

## Enumerate string and symbol keys

Many familiar object methods intentionally work only with string keys.

- **Object.keys(object)** returns enumerable own string keys.
- **Object.getOwnPropertyNames(object)** returns all own string keys, including non-enumerable ones.
- **Object.getOwnPropertySymbols(object)** returns all own symbol keys, including non-enumerable ones.
- **Reflect.ownKeys(object)** returns all own string and symbol keys.
- **for...in** visits enumerable string keys, including inherited ones, but skips symbol keys.

~~~js
const visible = Symbol("visible");
const hidden = Symbol("hidden");

const item = {
  name: "Notebook",
  [visible]: true
};

Object.defineProperty(item, hidden, {
  value: "metadata",
  enumerable: false
});

console.log(Object.keys(item).join(", "));
console.log(Object.getOwnPropertySymbols(item).length);
console.log(Reflect.ownKeys(item).length);
~~~

Output:

~~~text
name
2
3
~~~

The symbol-keyed property created in the object literal is enumerable by default. The second symbol property was explicitly made non-enumerable. **Object.getOwnPropertySymbols()** returns both, while **Reflect.ownKeys()** returns all three own keys.

## Copying and serializing symbol properties

**Object.assign()** and object spread copy enumerable own symbol properties as well as enumerable own string properties.

~~~js
const marker = Symbol("marker");
const original = {
  name: "Task",
  [marker]: "review"
};

const copied = { ...original };

console.log(copied.name);
console.log(copied[marker]);
~~~

Output:

~~~text
Task
review
~~~

Non-enumerable symbol properties are not copied by object spread or **Object.assign()**. These operations copy property values shallowly.

JSON does not include symbol-keyed properties. Symbol values are also treated differently depending on where they appear.

~~~js
const key = Symbol("metadata");
const object = {
  visible: true,
  [key]: "not in JSON",
  value: Symbol("not JSON either")
};

console.log(JSON.stringify(object));
console.log(JSON.stringify([Symbol("array value")]));
console.log(JSON.stringify(Symbol("top level")));
~~~

Output:

~~~text
{"visible":true}
[null]
undefined
~~~

The symbol-keyed property is omitted. A symbol value in an object property is also omitted. A symbol in an array becomes **null**, and serializing a symbol as the top-level value returns **undefined**.

## Local symbols and the global symbol registry

Each call to **Symbol(description)** creates a new, local symbol. **Symbol.for(key)** looks up a symbol in a shared global symbol registry and creates one if the key is not registered yet.

~~~js
const local = Symbol("plugin");
const sharedA = Symbol.for("app.plugin");
const sharedB = Symbol.for("app.plugin");

console.log(local === Symbol("plugin"));
console.log(sharedA === sharedB);
console.log(Symbol.keyFor(sharedA));
console.log(Symbol.keyFor(local));
~~~

Output:

~~~text
false
true
app.plugin
undefined
~~~

Use **Symbol.for()** only when separate parts of the same JavaScript agent intentionally need to retrieve the same symbol by a string key. Registry keys are shared names, so broad or generic names can collide with other code.

Use **Symbol()** for a local unique key. Use **Symbol.for()** for an intentional shared registry key.

## Well-known symbols

Well-known symbols are built-in symbols used by language and library algorithms as extension points. Their names are properties of the **Symbol** constructor. You do not create them with **Symbol("iterator")**. Use the built-in **Symbol.iterator** value.

| Well-known symbol | Purpose |
| --- | --- |
| **Symbol.asyncIterator** | Provides the default async iterator used by **for await...of**. |
| **Symbol.hasInstance** | Customizes the behavior of **instanceof** for a constructor. |
| **Symbol.isConcatSpreadable** | Controls whether **Array.prototype.concat()** flattens an object as array-like content. |
| **Symbol.iterator** | Provides the default iterator used by **for...of** and other synchronous iteration operations. |
| **Symbol.match** | Customizes matching when a value is used with **String.prototype.match()**. |
| **Symbol.matchAll** | Customizes matching when a value is used with **String.prototype.matchAll()**. |
| **Symbol.replace** | Customizes replacement when a value is used with **String.prototype.replace()**. |
| **Symbol.search** | Customizes searching when a value is used with **String.prototype.search()**. |
| **Symbol.species** | Lets certain built-in constructors choose the constructor for derived results. |
| **Symbol.split** | Customizes splitting when a value is used with **String.prototype.split()**. |
| **Symbol.toPrimitive** | Provides an object's primitive conversion behavior. |
| **Symbol.toStringTag** | Supplies a tag used by **Object.prototype.toString()**. |
| **Symbol.unscopables** | Excludes selected object properties from bindings created by the legacy **with** statement. |

These symbols are unique well-known values. The same well-known symbol is used by built-in algorithms instead of matching a property name such as **"iterator"**.

## Symbol.iterator: customize synchronous iteration

An object is iterable when it provides a method at **Symbol.iterator** that returns an iterator. An iterator provides a **next()** method that returns an object containing **value** and **done**.

~~~js
const range = {
  start: 1,
  end: 3,

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...range].join(", "));
~~~

Output:

~~~text
1, 2, 3
~~~

The spread syntax asks the object for its iterator and consumes values until **done** is **true**. The next chapter covers the iterator protocol in more depth.

## Symbol.toPrimitive: control primitive conversion

An object can define **[Symbol.toPrimitive]** to control conversion to a primitive. The method receives a hint, usually **"string"**, **"number"**, or **"default"**, and must return a primitive value.

~~~js
const distance = {
  value: 12,

  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return this.value + " km";
    }

    return this.value;
  }
};

console.log(String(distance));
console.log(Number(distance));
console.log(distance + 3);
~~~

Output:

~~~text
12 km
12
15
~~~

String conversion passes the string hint. Number conversion passes the number hint. The addition operator uses the default hint, which returns the numeric value in this example.

Returning an object from **[Symbol.toPrimitive]** is invalid and causes a **TypeError**. This hook should be used only when an object has a meaningful and unsurprising primitive representation.

## Symbol.toStringTag: customize an object tag

**Object.prototype.toString()** consults **Symbol.toStringTag** when present.

~~~js
const report = {
  [Symbol.toStringTag]: "Report"
};

console.log(Object.prototype.toString.call(report));
~~~

Output:

~~~text
[object Report]
~~~

This changes the displayed tag. It does not change the object's class, prototype, or security properties.

## Symbol.hasInstance: customize instanceof

A constructor can define **[Symbol.hasInstance]** to customize how the **instanceof** operator checks values.

~~~js
class EvenNumber {}

Object.defineProperty(EvenNumber, Symbol.hasInstance, {
  value(value) {
    return Number.isInteger(value) && value % 2 === 0;
  }
});

console.log(4 instanceof EvenNumber);
console.log(5 instanceof EvenNumber);
~~~

Output:

~~~text
true
false
~~~

The customized check is based on the method's rule, not on whether either number was created by **EvenNumber**. Customizing **instanceof** can surprise readers, so use this hook only when the custom meaning is deliberate.

## Symbol.isConcatSpreadable: control concatenation

An array-like object can set **[Symbol.isConcatSpreadable]** to **true** so **concat()** includes its indexed values directly.

~~~js
const letters = {
  0: "a",
  1: "b",
  length: 2,
  [Symbol.isConcatSpreadable]: true
};

const result = ["start"].concat(letters);
console.log(result.join(", "));
~~~

Output:

~~~text
start, a, b
~~~

Without the symbol property, the object is normally added as one value rather than flattened.

## Symbol.match and related string protocols

String methods can delegate to a value's well-known symbol method. For example, **String.prototype.match()** calls a custom **[Symbol.match]** method when one is present.

~~~js
const matcher = {
  [Symbol.match](text) {
    return text.includes("JavaScript") ? ["JavaScript"] : null;
  }
};

console.log("Learn JavaScript today".match(matcher)[0]);
console.log("Learn HTML today".match(matcher));
~~~

Output:

~~~text
JavaScript
null
~~~

The same design idea applies to **Symbol.matchAll**, **Symbol.replace**, **Symbol.search**, and **Symbol.split**. Their string methods look for the corresponding symbol method and delegate the operation.

## Symbol.species: choose a derived result constructor

Some built-in methods use **Symbol.species** to choose which constructor creates a derived result. An array subclass can use it to make **map()** return a plain array.

~~~js
class PlainResultArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const values = new PlainResultArray(2, 4, 6);
const doubled = values.map((value) => value * 2);

console.log(doubled.join(", "));
console.log(doubled instanceof PlainResultArray);
console.log(doubled instanceof Array);
~~~

Output:

~~~text
4, 8, 12
false
true
~~~

**Symbol.species** is an advanced customization point. Most application code should keep the built-in behavior unless there is a specific need to control derived result types.

## Symbol.unscopables

**Symbol.unscopables** supports the legacy **with** statement by naming properties that should not be exposed as bindings from an object. The **with** statement is discouraged because it makes name lookup hard to reason about. Most application code should not need to customize this symbol.

## Common mistakes

### Assuming descriptions make symbols equal

~~~js
const first = Symbol("key");
const second = Symbol("key");

console.log(first === second);
~~~

Output:

~~~text
false
~~~

A description is not an identifier. Reuse the original symbol or use **Symbol.for()** when a registry key is intentionally shared.

### Trying to create a well-known symbol from its name

~~~js
const localIterator = Symbol("iterator");

console.log(localIterator === Symbol.iterator);
~~~

Output:

~~~text
false
~~~

The string description does not retrieve the well-known symbol. Access the built-in **Symbol.iterator** property.

### Treating a symbol property as secret

~~~js
const secret = Symbol("secret");
const object = { [secret]: "visible through reflection" };

console.log(Object.getOwnPropertySymbols(object).length);
~~~

Output:

~~~text
1
~~~

Reflection can discover symbol keys. Use private fields or closures for privacy.

## Try it yourself

1. Create two symbols with the same description and compare them.
2. Use a local symbol as an object key and retrieve the value.
3. Compare **Object.keys()**, **Object.getOwnPropertySymbols()**, and **Reflect.ownKeys()**.
4. Copy an enumerable symbol property with object spread.
5. Test how JSON serialization treats symbol keys and symbol values.
6. Compare **Symbol()**, **Symbol.for()**, and **Symbol.keyFor()**.
7. Create a small iterable object using **Symbol.iterator**.
8. Add **Symbol.toPrimitive** to a value object and test string and numeric conversion.
9. Customize **Object.prototype.toString()** output with **Symbol.toStringTag**.
10. Explain why symbols avoid accidental collisions but do not provide privacy.

## Key points

- Each **Symbol()** call creates a unique primitive; its description does not define identity.
- **Symbol.for()** retrieves or creates a symbol in the global symbol registry, and **Symbol.keyFor()** retrieves a registered key.
- Symbols can be object property keys and are discoverable through reflection.
- Common key enumeration methods skip symbols, while **Reflect.ownKeys()** includes both string and symbol keys.
- Object spread and **Object.assign()** copy enumerable own symbol properties.
- JSON does not serialize symbol-keyed properties or symbol values as ordinary JSON values.
- Well-known symbols are built-in extension points used by language and library algorithms.
- Use private fields or closures for privacy, not symbol keys.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [66 - WeakMap and WeakSet](066-weakmap-and-weakset.md) | [Open Q&A](../qnas/067-symbols-and-well-known-symbols.md) | [Open example](../examples/067-symbols-and-well-known-symbols.md) | [68 - Iterables and the iterator protocol](068-iterables-and-the-iterator-protocol.md) |
