# 16 - undefined, null, and NaN

**undefined**, **null**, and **NaN** can all appear when a value is missing or unusable, but they mean different things:

- **undefined** usually means that no value was provided or assigned.
- **null** is an intentional value that represents an absent object or result.
- **NaN** is a special **Number** value that represents an invalid or unrepresentable numeric result.

Knowing which one you have helps you choose the right check and avoid treating missing data as a valid value.

## undefined

The **undefined** value is commonly produced when a declared binding has no assigned value:

~~~js
let selection;

console.log(selection); // undefined
~~~

Other common sources include:

- A function that finishes without returning a value.
- A function parameter that was not supplied.
- Reading an object property that does not exist.
- An explicit assignment of **undefined**.

~~~js
function showMessage() {
  // No return statement.
}

const message = showMessage();
const profile = { name: "Asha" };

console.log(message); // undefined
console.log(profile.city); // undefined
~~~

An uninitialized **let** is **undefined** only after execution reaches its declaration. Before initialization, a **let** or **const** binding is in its Temporal Dead Zone and reading it throws a **ReferenceError**. That earlier chapter covers the TDZ.

### Check for undefined

Use strict equality to check whether a value is **undefined**:

~~~js
let selectedItem;

if (selectedItem === undefined) {
  console.log("No item has been selected");
}
~~~

Strict equality avoids the conversion behavior of loose equality. A parameter can also use **undefined** as a signal that the caller omitted an argument:

~~~js
function greet(name) {
  if (name === undefined) {
    return "Hello, guest";
  }

  return "Hello, " + name;
}
~~~

This checks specifically for **undefined**. It does not treat **null**, an empty string, or zero as the same value.

## null

Use **null** when the program deliberately represents the absence of an object or a meaningful value:

~~~js
let selectedUser = null;

// Later, after a user is selected:
selectedUser = { name: "Asha" };
~~~

The initial value communicates that no user object is selected yet. This is different from a value that was never assigned or provided.

Check for **null** with strict equality:

~~~js
if (selectedUser === null) {
  console.log("No user is selected");
}
~~~

**null** is a primitive value and has its own language type. However, **typeof null** returns **"object"** because of a historical JavaScript behavior:

~~~js
console.log(typeof null); // "object"
~~~

Do not use **typeof value === "object"** as a check that a value is a usable object. It also matches **null**. Reliable type checks are covered in a later chapter.

## Choosing between undefined and null

A useful convention is:

- Use **undefined** when a value has not been provided or assigned.
- Use **null** when your code intentionally sets an empty or absent value.

For example:

~~~js
const profile = {
  middleName: null
};

console.log(profile.middleName); // null
console.log(profile.nickname); // undefined
~~~

The **middleName** property exists and deliberately holds **null**. The **nickname** property is absent, so reading it produces **undefined**.

JavaScript does not force every project to use this convention. The important part is to be consistent and check for the value your program actually uses.

## NaN

**NaN** means **Not-a-Number**. It is a special value in the **Number** type, usually produced when a numeric operation cannot produce a meaningful number.

~~~js
const invalidDivision = 0 / 0;
const invalidRoot = Math.sqrt(-1);

console.log(invalidDivision); // NaN
console.log(invalidRoot); // NaN
console.log(typeof invalidDivision); // "number"
~~~

A numeric conversion can also produce **NaN**:

~~~js
const quantity = Number("not a quantity");

console.log(quantity); // NaN
~~~

A value can have type **number** and still fail to be a usable numeric result. **NaN** is not a separate type.

### NaN has unusual equality behavior

**NaN** is not equal to itself:

~~~js
console.log(NaN === NaN); // false
console.log(NaN !== NaN); // true
~~~

That means an equality check cannot detect **NaN**:

~~~js
const result = Number("unknown");

// This condition does not detect NaN.
if (result === NaN) {
  console.log("Invalid number");
}
~~~

Use **Number.isNaN** instead:

~~~js
if (Number.isNaN(result)) {
  console.log("Invalid number");
}
~~~

**Number.isNaN** returns true only when its argument is the **NaN** value. The older global **isNaN** function first converts its argument, which can make it report true for non-number inputs too.

~~~js
console.log(Number.isNaN("hello")); // false
console.log(isNaN("hello")); // true
~~~

Prefer **Number.isNaN** when checking whether a value is exactly **NaN**. Conversion rules are covered later.

### NaN can spread through calculations

Many numeric operations that use **NaN** produce **NaN**:

~~~js
const invalidTotal = NaN + 10;

console.log(invalidTotal); // NaN
console.log(Number.isNaN(invalidTotal)); // true
~~~

Once a calculation becomes **NaN**, later arithmetic usually cannot recover the intended value. Check inputs and intermediate results close to where numeric calculations happen.

## Compare the three values

| Value | Meaning | Type check | Typical check |
| --- | --- | --- | --- |
| **undefined** | No value was assigned or supplied | **typeof value === "undefined"** | **value === undefined** |
| **null** | A value was intentionally marked absent | **value === null** | **value === null** |
| **NaN** | Invalid or unrepresentable numeric result | **typeof value === "number"** | **Number.isNaN(value)** |

**typeof null** is an exception to the simple type-check column because it returns **"object"**. **NaN** has type **number**, so **typeof** alone cannot tell whether a numeric value is valid.

## Check inputs before using them

A function that requires a number can reject **undefined**, **null**, and **NaN** explicitly:

~~~js
function calculateDouble(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new TypeError("value must be a valid number");
  }

  return value * 2;
}
~~~

This example defines its own input rule. Some applications may also need to reject **Infinity** or apply range checks. Those decisions depend on what the function is meant to calculate.

## Common mistakes

- **Treating undefined and null as interchangeable:** one often signals a missing or unassigned value, while the other can intentionally represent absence.
- **Using typeof to detect null:** **typeof null** is **"object"**.
- **Writing value === NaN:** it is always false. Use **Number.isNaN(value)**.
- **Thinking NaN has a separate type:** **NaN** is a special value whose type is **number**.
- **Using global isNaN to check only for NaN:** it converts its argument first. Prefer **Number.isNaN** for an exact check.
- **Treating an absent property as an error automatically:** reading a missing property usually returns **undefined**, so decide whether that is valid for your program.
- **Using falsy checks to detect only missing values:** empty string, zero, false, null, undefined, and NaN have different meanings. Truthiness is covered in the next chapter.
- **Expecting a value to become NaN from every invalid operation:** JavaScript operations have specific behavior. Check the result with **Number.isNaN** when necessary.

## Try it yourself

1. Declare a **let** binding without an initializer and check it with **=== undefined**.
2. Write a function with no return statement and inspect its return value.
3. Read a property that does not exist on an object. Check the result against **undefined**.
4. Create an object property whose value is **null** and compare it with a missing property.
5. Check **typeof null** and explain why it is not a reliable object check.
6. Produce **NaN** with **0 / 0** and with **Math.sqrt(-1)**.
7. Compare **NaN === NaN** with **Number.isNaN(NaN)**.
8. Compare **Number.isNaN("hello")** with **isNaN("hello")**.
9. Write a numeric function that rejects **undefined**, **null**, strings, and **NaN**.
10. Decide which checks your application should use for an absent value and document the convention.

## Key points

- **undefined** often means that a value was not provided or assigned.
- **null** can explicitly represent an intentionally absent value.
- **NaN** is a special value in the **Number** type.
- **typeof null** returns **"object"** for historical reasons.
- **NaN === NaN** is false, so use **Number.isNaN** to detect it.
- Global **isNaN** converts its argument; **Number.isNaN** checks for the NaN value directly.
- Use strict checks to distinguish **undefined** from **null**.
- Validate input and intermediate numeric results when calculations depend on them.
- Do not use a generic falsy check when the program needs to distinguish missing values, zero, false, empty text, and NaN.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [15 - Primitive values and object references](015-primitive-values-and-object-references.md) | [Open Q&A](../qnas/016-undefined-null-and-nan.md) | [Open example](../examples/016-undefined-null-and-nan.md) | [17 - Booleans, truthiness, and falsy values](017-booleans-truthiness-and-falsy-values.md) |