# 67 - Symbols and well-known symbols: Examples

These examples demonstrate symbol identity, symbol-keyed properties, reflection, registry symbols, serialization, and well-known symbol hooks. Each example includes a task, complete code, expected output, and an explanation.

## 1. Create unique symbols

**Task:** Create two symbols with the same description and compare them.

~~~js
const first = Symbol("status");
const second = Symbol("status");

console.log(typeof first);
console.log(first === second);
console.log(first.description);
~~~

Expected output:

~~~text
symbol
false
status
~~~

**Explanation:** The description is readable metadata, not an identity. Each call to **Symbol()** creates a unique primitive.

## 2. Reject construction with new

**Task:** Confirm that **Symbol** is called as a function.

~~~js
try {
  new Symbol("status");
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Expected output:

~~~text
true
~~~

**Explanation:** A symbol is created by calling **Symbol()** without **new**.

## 3. Convert a symbol for display

**Task:** Convert a symbol explicitly instead of concatenating it implicitly.

~~~js
const key = Symbol("cache");

console.log(String(key));
console.log(key.description);

try {
  console.log("Key: " + key);
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Expected output:

~~~text
Symbol(cache)
cache
true
~~~

**Explanation:** **String(symbol)** and **description** provide readable text. Implicit concatenation with a symbol throws.

## 4. Use a symbol as an object key

**Task:** Store and retrieve a value with a symbol key.

~~~js
const internalId = Symbol("internal id");
const user = {
  name: "Asha",
  [internalId]: 42
};

console.log(user.name);
console.log(user[internalId]);
~~~

Expected output:

~~~text
Asha
42
~~~

**Explanation:** Computed property syntax can use a symbol as a property key. Bracket access retrieves the value using the same symbol.

## 5. Avoid an accidental string-key collision

**Task:** Keep a symbol property separate from a string property with the same printed name.

~~~js
const pluginKey = Symbol("state");
const plugin = {
  state: "public",
  [pluginKey]: "plugin data"
};

console.log(plugin.state);
console.log(plugin[pluginKey]);
console.log(Reflect.ownKeys(plugin).length);
~~~

Expected output:

~~~text
public
plugin data
2
~~~

**Explanation:** A string key and a symbol key are different property keys. Reflection still exposes both.

## 6. Find an object's symbol keys

**Task:** Use reflection to discover and read a symbol-keyed property.

~~~js
const marker = Symbol("marker");
const object = {
  label: "task",
  [marker]: "review"
};

const symbols = Object.getOwnPropertySymbols(object);

console.log(symbols.length);
console.log(object[symbols[0]]);
~~~

Expected output:

~~~text
1
review
~~~

**Explanation:** **Object.getOwnPropertySymbols()** returns own symbol keys. A symbol is not private merely because it is not a string.

## 7. Compare key enumeration methods

**Task:** Compare string-key enumeration with full own-key reflection.

~~~js
const symbolKey = Symbol("extra");
const object = {
  name: "report",
  [symbolKey]: true
};

console.log(Object.keys(object).join(", "));
console.log(Object.getOwnPropertySymbols(object).length);
console.log(Reflect.ownKeys(object).length);
~~~

Expected output:

~~~text
name
1
2
~~~

**Explanation:** **Object.keys()** returns enumerable own string keys. **Reflect.ownKeys()** includes both the string key and the symbol key.

## 8. Find non-enumerable symbol properties

**Task:** Define a non-enumerable symbol property and inspect it.

~~~js
const hiddenKey = Symbol("metadata");
const object = {};

Object.defineProperty(object, hiddenKey, {
  value: "internal",
  enumerable: false
});

console.log(Object.keys(object).length);
console.log(Object.getOwnPropertySymbols(object).length);
console.log(Reflect.ownKeys(object).length);
~~~

Expected output:

~~~text
0
1
1
~~~

**Explanation:** The property is non-enumerable, so it is skipped by **Object.keys()**. Reflection methods still find it.

## 9. Copy an enumerable symbol property with object spread

**Task:** Copy an enumerable symbol property into a new object.

~~~js
const marker = Symbol("marker");
const original = {
  label: "draft",
  [marker]: "review"
};

const copy = { ...original };

console.log(copy.label);
console.log(copy[marker]);
console.log(Object.getOwnPropertySymbols(copy).length);
~~~

Expected output:

~~~text
draft
review
1
~~~

**Explanation:** Object spread copies enumerable own string and symbol properties. It is a shallow copy.

## 10. Copy an enumerable symbol property with Object.assign

**Task:** Use **Object.assign()** to copy enumerable own symbol properties.

~~~js
const key = Symbol("key");
const source = {
  [key]: 7
};

const copy = Object.assign({}, source);

console.log(copy[key]);
~~~

Expected output:

~~~text
7
~~~

**Explanation:** **Object.assign()** copies enumerable own symbol properties as well as enumerable own string properties. Non-enumerable properties are skipped.

## 11. See how JSON treats symbol keys and values

**Task:** Serialize an object, an array, and a top-level symbol.

~~~js
const key = Symbol("metadata");
const object = {
  visible: true,
  [key]: "omitted",
  value: Symbol("also omitted")
};

console.log(JSON.stringify(object));
console.log(JSON.stringify([Symbol("array value")]));
console.log(JSON.stringify(Symbol("top level")));
~~~

Expected output:

~~~text
{"visible":true}
[null]
undefined
~~~

**Explanation:** Symbol-keyed and symbol-valued object properties are omitted. A symbol in an array becomes **null**, and a top-level symbol produces **undefined**.

## 12. Share a symbol through the global registry

**Task:** Retrieve the same registry symbol from two parts of a program.

~~~js
const first = Symbol.for("app.cache");
const second = Symbol.for("app.cache");

console.log(first === second);
console.log(Symbol.keyFor(first));
~~~

Expected output:

~~~text
true
app.cache
~~~

**Explanation:** **Symbol.for()** returns the registry symbol for a key. **Symbol.keyFor()** returns that key.

## 13. Compare a local symbol with a registry symbol

**Task:** Show that only a registry symbol has a registry key.

~~~js
const local = Symbol("app.cache");
const shared = Symbol.for("app.cache");

console.log(Symbol.keyFor(local));
console.log(Symbol.keyFor(shared));
console.log(local === shared);
~~~

Expected output:

~~~text
undefined
app.cache
false
~~~

**Explanation:** Matching descriptions and registry key text do not make a local symbol equal to the registry symbol.

## 14. Build a synchronous iterable

**Task:** Let an object provide values through **Symbol.iterator**.

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

Expected output:

~~~text
1, 2, 3
~~~

**Explanation:** Array spread asks the object for its iterator and consumes its values until **done** becomes true.

## 15. Customize primitive conversion

**Task:** Give a measurement a string form and a numeric form.

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

Expected output:

~~~text
12 km
12
15
~~~

**Explanation:** The conversion hook receives a hint and returns a primitive. String conversion uses the descriptive form, while numeric and default conversion use the number.

## 16. Customize Object.prototype.toString

**Task:** Provide a descriptive tag for an object.

~~~js
const report = {
  [Symbol.toStringTag]: "Report"
};

console.log(Object.prototype.toString.call(report));
~~~

Expected output:

~~~text
[object Report]
~~~

**Explanation:** **Symbol.toStringTag** supplies the displayed tag. It does not change the object's type or prototype.

## 17. Customize instanceof for a constructor

**Task:** Make a constructor define its own **instanceof** check.

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

Expected output:

~~~text
true
false
~~~

**Explanation:** **Symbol.hasInstance** customizes the operator's check. This example uses a numeric rule instead of normal instance prototype membership.

## 18. Let concat spread an array-like object

**Task:** Make **Array.prototype.concat()** flatten an object with indexed values.

~~~js
const letters = {
  0: "a",
  1: "b",
  length: 2,
  [Symbol.isConcatSpreadable]: true
};

console.log(["start"].concat(letters).join(", "));
~~~

Expected output:

~~~text
start, a, b
~~~

**Explanation:** **Symbol.isConcatSpreadable** marks this array-like object for flattening by **concat()**.

## 19. Customize String.prototype.match

**Task:** Let an object provide a custom matching operation.

~~~js
const matcher = {
  [Symbol.match](text) {
    return text.includes("JavaScript") ? ["JavaScript"] : null;
  }
};

console.log("Learn JavaScript today".match(matcher)[0]);
console.log("Learn HTML today".match(matcher));
~~~

Expected output:

~~~text
JavaScript
null
~~~

**Explanation:** **String.prototype.match()** delegates to the object's **Symbol.match** method when present.

## 20. Choose the constructor for a derived array result

**Task:** Make a subclass's **map()** return a plain array.

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

Expected output:

~~~text
4, 8, 12
false
true
~~~

**Explanation:** **Symbol.species** tells this built-in method which constructor to use for the derived result. This is an advanced customization point.

## 21. Keep private state in a private field

**Task:** Compare a private class field with a discoverable symbol property.

~~~js
class Session {
  #token;

  constructor(token) {
    this.#token = token;
  }

  hasToken() {
    return this.#token.length > 0;
  }
}

const session = new Session("secret");

console.log(session.hasToken());
console.log(Reflect.ownKeys(session).length);
~~~

Expected output:

~~~text
true
0
~~~

**Explanation:** A private field is not an ordinary own property key. Unlike a symbol property, it cannot be retrieved by listing the object's keys.

## 22. Demonstrate that a symbol key is discoverable

**Task:** Find and read a symbol property even without retaining its original variable.

~~~js
const internal = Symbol("internal");
const object = {
  [internal]: "not private"
};

const discovered = Object.getOwnPropertySymbols(object)[0];
console.log(object[discovered]);
~~~

Expected output:

~~~text
not private
~~~

**Explanation:** Reflection can discover own symbol keys. A symbol can reduce name collisions but does not provide access control.

## 23. Customize replacement through Symbol.replace

**Task:** Allow a pattern object to handle **String.prototype.replace()**.

~~~js
const removeWord = {
  [Symbol.replace](text, replacement) {
    return text.replace("draft", replacement);
  }
};

console.log("draft document".replace(removeWord, "final"));
~~~

Expected output:

~~~text
final document
~~~

**Explanation:** String replacement delegates to the pattern object's **Symbol.replace** method. The custom method decides what replacement means.

## 24. Use Symbol.iterator directly

**Task:** Request an iterator and advance it one step at a time.

~~~js
const values = ["a", "b"];
const iterator = values[Symbol.iterator]();

console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().done);
~~~

Expected output:

~~~text
a
b
true
~~~

**Explanation:** Arrays provide **Symbol.iterator**. Each call to **next()** returns an iterator result, and the final result has **done: true**.

## Review checklist

For each example, make sure you can identify:

- Whether a symbol is local, registered, or well-known.
- Whether a property key is a string or a symbol.
- Which reflection operation can discover the key.
- Whether copying includes the symbol property.
- How JSON treats the symbol key or value.
- Which built-in operation consults a well-known symbol.
- Why a symbol property is not a substitute for private state.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [66 - WeakMap and WeakSet](../lessons/066-weakmap-and-weakset.md) | [Open lesson](../lessons/067-symbols-and-well-known-symbols.md) | [Open Q&A](../qnas/067-symbols-and-well-known-symbols.md) | [68 - Iterables and the iterator protocol](../lessons/068-iterables-and-the-iterator-protocol.md) |
