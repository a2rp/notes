# 18 - typeof, instanceof, and reliable type checks

JavaScript values have different types, but no single operator identifies every kind of value. **typeof** is useful for checking primitive types and functions. **instanceof** checks an object's relationship to a constructor. Arrays, **null**, numbers, and objects need more specific checks.

Choosing the right check helps prevent mistakes such as treating **null** as an object record or accepting a numeric string where a number is required.

## What typeof returns

The **typeof** operator returns a string describing the operand's type category:

| Value | Result of typeof |
| --- | --- |
| **undefined** | **"undefined"** |
| **null** | **"object"** |
| Boolean primitive | **"boolean"** |
| Number, including **NaN** and **Infinity** | **"number"** |
| BigInt | **"bigint"** |
| String | **"string"** |
| Symbol | **"symbol"** |
| Function | **"function"** |
| Most other objects | **"object"** |

~~~js
console.log(typeof undefined); // "undefined"
console.log(typeof true); // "boolean"
console.log(typeof 42); // "number"
console.log(typeof 42n); // "bigint"
console.log(typeof "hello"); // "string"
console.log(typeof Symbol("id")); // "symbol"
console.log(typeof function () {}); // "function"
console.log(typeof {}); // "object"
~~~

**typeof** returns a string. Compare it with a string value:

~~~js
const title = "JavaScript";

if (typeof title === "string") {
  console.log("title is a string");
}
~~~

The result is the lowercase string **"string"**, not a type keyword.

## typeof null is a historical exception

**null** is its own primitive value, but **typeof null** returns **"object"**:

~~~js
console.log(typeof null); // "object"
~~~

This behavior is preserved for compatibility. Do not use **typeof value === "object"** by itself to decide whether a value is a non-null object.

Use an explicit null check:

~~~js
function isNonNullObject(value) {
  return value !== null && typeof value === "object";
}

console.log(isNonNullObject(null)); // false
console.log(isNonNullObject({})); // true
console.log(isNonNullObject([])); // true
~~~

This function includes arrays because arrays are objects. If arrays should be excluded, add an **Array.isArray** check.

## Arrays and other objects

**typeof** cannot distinguish an array from an ordinary object:

~~~js
console.log(typeof []); // "object"
console.log(typeof {}); // "object"
console.log(typeof new Date()); // "object"
~~~

Use **Array.isArray(value)** when you need to recognize arrays:

~~~js
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray(null)); // false
~~~

**Array.isArray** identifies arrays directly, including arrays created in another JavaScript realm, such as an iframe. Comparing with **instanceof Array** can fail across realms because each realm has a different **Array** constructor.

When you need a non-null object that is not an array, combine checks:

~~~js
function isNonArrayObject(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value);
}

console.log(isNonArrayObject({ name: "Asha" })); // true
console.log(isNonArrayObject(new Date())); // true
console.log(isNonArrayObject([])); // false
console.log(isNonArrayObject(null)); // false
~~~

This check still accepts dates, maps, regular expressions, and other objects. It does not prove that a value is a plain object or has a particular shape. Check the properties your program needs.

## Check functions with typeof

Functions are callable objects, and **typeof** identifies them with the string **"function"**:

~~~js
function save() {}

console.log(typeof save); // "function"
console.log(typeof (() => {})); // "function"
~~~

A class declaration also has **typeof** result **"function"**:

~~~js
class User {}

console.log(typeof User); // "function"
~~~

Use this check when a value is expected to be callable:

~~~js
function callIfFunction(value) {
  if (typeof value === "function") {
    value();
  }
}
~~~

The check only says the value is callable according to **typeof**. It does not guarantee that calling it will succeed or produce a particular result.

## Check values against primitive types

For primitive values, compare **typeof** with the expected type string:

~~~js
function isString(value) {
  return typeof value === "string";
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isBigInt(value) {
  return typeof value === "bigint";
}
~~~

Numbers need additional checks depending on the requirement. **typeof NaN** is **"number"**, as is **typeof Infinity**:

~~~js
console.log(typeof NaN); // "number"
console.log(typeof Infinity); // "number"
console.log(Number.isNaN(NaN)); // true
console.log(Number.isFinite(Infinity)); // false
~~~

Use **Number.isFinite(value)** when a finite number is required. It returns false for non-number values, **NaN**, and both infinities. It does not convert strings:

~~~js
console.log(Number.isFinite(25)); // true
console.log(Number.isFinite("25")); // false
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite(Infinity)); // false
~~~

Use **Number.isNaN(value)** to check specifically for the **NaN** value. Unlike the global **isNaN** function, it does not convert its argument:

~~~js
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("hello")); // false
~~~

If the requirement is an integer or a safe integer, use the matching built-in check:

~~~js
console.log(Number.isInteger(4)); // true
console.log(Number.isInteger(4.5)); // false
console.log(Number.isSafeInteger(4)); // true
~~~

A value can pass **typeof value === "number"** and still be invalid for a specific calculation. Check the actual requirements, such as finiteness, integer status, or an allowed range.

## Use instanceof for constructor relationships

The **instanceof** operator usually checks whether a constructor's **prototype** appears in an object's prototype chain:

~~~js
const items = [];

console.log(items instanceof Array); // true
console.log(items instanceof Object); // true
~~~

An array is also an object, so it is an instance of **Object** in the same realm.

Custom classes use the same kind of relationship:

~~~js
class Animal {}

class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Array); // false
~~~

The **Dog** prototype chain includes **Animal.prototype**, so the dog is an instance of both classes.

**instanceof** expects a constructor on its right side, unless that value defines a custom **Symbol.hasInstance** method. Using an unsuitable right operand may throw a **TypeError**.

~~~js
console.log({} instanceof Array); // false
~~~

Use **instanceof** when the relationship to a particular class or constructor matters, not as a general test for every object category.

## instanceof limitations

**instanceof** depends on prototypes and constructors. An object from another realm can have a different constructor, even when it is conceptually an array or date:

~~~js
const values = [];

console.log(values instanceof Array); // true in this realm
console.log(Array.isArray(values)); // true
~~~

For arrays, prefer **Array.isArray** because it does not rely on the current realm's **Array** constructor.

**instanceof** also does not tell you whether an object has the properties your code needs. A value can pass **value instanceof Object** and still have no useful fields.

For example, validate a record's shape directly:

~~~js
function isUserRecord(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.name === "string" &&
    typeof value.active === "boolean";
}

console.log(isUserRecord({ name: "Asha", active: true })); // true
console.log(isUserRecord({ name: "Asha", active: "yes" })); // false
console.log(isUserRecord([])); // false
console.log(isUserRecord(null)); // false
~~~

This validates the properties used by this example. It does not make every possible object safe to inspect. For data from an external source, validation should cover every property and constraint the application relies on.

## Check dates and built-in objects carefully

A same-realm date can be checked with **instanceof Date**, but an invalid date is still a Date object:

~~~js
const validDate = new Date("2026-11-20");
const invalidDate = new Date("not a date");

console.log(validDate instanceof Date); // true
console.log(invalidDate instanceof Date); // true
console.log(Number.isNaN(invalidDate.getTime())); // true
~~~

If you need a valid date from the same realm, combine the type relationship with a validity check:

~~~js
function isValidDate(value) {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
~~~

As with other **instanceof** checks, dates from another realm may not pass this realm's **Date** check. Pick a validation rule that matches where the data comes from and how it will be used.

## typeof and missing variables

For an undeclared identifier, **typeof** returns **"undefined"** without throwing a **ReferenceError**:

~~~js
console.log(typeof optionalFeatureFlag); // "undefined"
~~~

This special behavior does not make it safe to read that identifier directly:

~~~js
// This would throw a ReferenceError if optionalFeatureFlag is undeclared.
// console.log(optionalFeatureFlag);
~~~

It also does not bypass the Temporal Dead Zone for a **let** or **const** binding. Using **typeof** on a lexical binding before its declaration runs still throws a **ReferenceError**:

~~~js
// This would throw a ReferenceError:
// console.log(typeof currentMode);
let currentMode = "edit";
~~~

Prefer declared variables and explicit checks over relying on undeclared global names.

## A practical type-checking helper

A function can combine the checks its task actually needs:

~~~js
function isValidProduct(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    Number.isFinite(value.price) &&
    value.price >= 0;
}

console.log(
  isValidProduct({ name: "Notebook", price: 4.5 })
); // true

console.log(
  isValidProduct({ name: "Notebook", price: "4.5" })
); // false
~~~

This helper checks for a non-null, non-array object, a non-empty name, and a finite non-negative numeric price. A numeric string is rejected because the example requires an actual number.

Validation helpers should reflect the program's rules. Do not use one broad check when different fields have different requirements.

## Common mistakes

- **Treating typeof as a complete type system:** it groups many values under **"object"** and reports **null** as **"object"**.
- **Using typeof value === "object" without excluding null:** **null** also passes that comparison.
- **Using typeof to distinguish arrays from objects:** both produce **"object"**. Use **Array.isArray**.
- **Using instanceof Array for values from any realm:** a different realm has a different **Array** constructor.
- **Using instanceof Object to prove that an object has the right fields:** validate the required shape directly.
- **Assuming every number is usable:** **NaN** and infinities also have type **"number"**.
- **Using global isNaN for an exact type check:** it may convert non-number arguments. Use **Number.isNaN** to detect the NaN value.
- **Assuming instanceof Date means the date is valid:** invalid dates are still Date instances.
- **Using typeof on a lexical binding before initialization:** the Temporal Dead Zone still causes a **ReferenceError**.
- **Checking only the input's broad category:** validation should check the actual properties, ranges, and constraints the program needs.

## Try it yourself

1. Use **typeof** on **undefined**, **null**, a number, a BigInt, a symbol, a function, an array, and an object.
2. Explain why **typeof null** is **"object"** and write a check that excludes null.
3. Compare **typeof []** with **Array.isArray([])**.
4. Check an array created in another iframe with **Array.isArray** and **instanceof Array**.
5. Define a **Vehicle** class and an **ElectricCar** subclass. Check an electric car with **instanceof** for both classes.
6. Compare **Number.isFinite(10)**, **Number.isFinite("10")**, and **Number.isFinite(Infinity)**.
7. Compare **Number.isNaN(NaN)** with **Number.isNaN("hello")**.
8. Create a valid Date and an invalid Date. Check both with **instanceof Date** and test the timestamps.
9. Write a function that accepts only a non-null object with a string **id** and Boolean **enabled** property.
10. Identify which values your application needs to distinguish more precisely than **typeof** or **instanceof** can.

## Key points

- **typeof** returns a string for a broad type category.
- **typeof null** is **"object"** for historical compatibility.
- Arrays, dates, and many other values all produce **"object"** with **typeof**.
- **Array.isArray** is the direct check for arrays and works across realms.
- **instanceof** normally checks an object's prototype relationship with a constructor. It can be customized with **Symbol.hasInstance**.
- Use **Number.isFinite**, **Number.isNaN**, and other focused built-ins for numeric requirements.
- A type check does not prove that a value has the properties, range, or validity your program needs.
- Build validation from the specific requirements of the data you will use.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [17 - Booleans, truthiness, and falsy values](017-booleans-truthiness-and-falsy-values.md) | [Open Q&A](../qnas/018-typeof-instanceof-and-reliable-type-checks.md) | [Open example](../examples/018-typeof-instanceof-and-reliable-type-checks.md) | [19 - Type conversion and coercion](019-type-conversion-and-coercion.md) |
