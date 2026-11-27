# 14 - Values, types, and dynamic typing

JavaScript code works with **values**. Every value has a type, such as **string**, **number**, or **object**. A variable name is a binding that can refer to a value. In JavaScript, a binding does not have to keep the same value type throughout its lifetime.

This is called **dynamic typing**. The type belongs to the current value, not permanently to the variable name.

## Values and bindings

A declaration creates a binding, and an assignment makes that binding refer to a value:

~~~js
let result = "Pending";

console.log(result);

result = 42;
console.log(result);
~~~

The name **result** first refers to a string value and later to a number value. JavaScript allows this because the binding is not restricted to one type.

The current value still has a type at each moment:

~~~js
let result = "Pending";
console.log(typeof result); // "string"

result = 42;
console.log(typeof result); // "number"
~~~

The **typeof** operator is useful for a first look at a value's type. It has some unusual cases and limitations, which are covered in a later chapter.

## JavaScript's value types

JavaScript has these language types:

| Type | Example value | Basic use |
| --- | --- | --- |
| **Undefined** | **undefined** | A value often seen when no value has been provided |
| **Null** | **null** | An intentional absence of an object value |
| **Boolean** | **true**, **false** | Logical states |
| **Number** | **42**, **3.5** | Integers and floating-point numbers |
| **BigInt** | **42n** | Integers with precision beyond the ordinary Number range |
| **String** | **"hello"** | Text |
| **Symbol** | **Symbol("id")** | Unique identifiers, often used as object keys |
| **Object** | **{ name: "Asha" }** | Collections of properties and other structured values |

The first seven are **primitive types**. Objects are the other broad category. The next chapter compares primitive values and objects in more detail.

### Primitive values

Primitive values represent simple values such as text, numbers, or logical states. Examples include:

~~~js
const userName = "Asha";
const completedLessons = 12;
const isActive = true;
const missingValue = undefined;
const emptySelection = null;
const largeCount = 9007199254740993n;
const recordKey = Symbol("record");
~~~

These examples introduce the types. Later chapters cover the behavior and edge cases of **undefined**, **null**, numbers, **BigInt**, strings, and symbols separately.

### Objects

Objects group properties under one value:

~~~js
const user = {
  name: "Asha",
  active: true
};

console.log(user.name);
console.log(user.active);
~~~

Arrays and functions are also objects in JavaScript's language type system. Functions can be called, and arrays have indexed elements and array-specific methods, but both are object values.

~~~js
const colors = ["blue", "green"];
const greet = function () {
  return "Hello";
};

console.log(Array.isArray(colors)); // true
console.log(typeof greet); // "function"
~~~

The **typeof** result for functions is a special case. Reliable checks for arrays, null values, and other specific categories are covered later.

## Dynamic typing in practice

A **let** binding can refer to values of different types at different points in the program:

~~~js
let response = "Waiting";

response = 200;
response = { status: "complete" };

console.log(response.status);
~~~

This is valid JavaScript. The last assignment makes **response** refer to an object, so **response.status** reads its **status** property.

Dynamic typing can be convenient when values change shape, but unexpected type changes can make code hard to understand. Use clear names and keep each binding's purpose consistent where practical.

~~~js
let itemCount = 3;
itemCount = "three"; // Allowed, but now the name no longer matches its value.
~~~

A better design would keep a count numeric and use a separate string binding when text is needed:

~~~js
const itemCount = 3;
const itemCountLabel = "three";
~~~

JavaScript permits the reassignment. Good naming and deliberate data design help prevent mistakes.

## Declarations do not make JavaScript statically typed

The declaration forms **const**, **let**, and **var** control binding behavior such as reassignment and scope. They do not declare a permanent value type.

~~~js
let score = 10;
score = "ten"; // Allowed by JavaScript
~~~

The binding is declared with **let**, but it may refer to a string later. The choice between **const**, **let**, and **var** is about binding behavior, not a type annotation.

A **const** binding cannot be reassigned, but that is not the same as giving it a static type or freezing an object. These binding rules were introduced in earlier chapters, and object mutation is explored in the next chapter.

## Types affect operations

An operation can behave differently depending on the types of its input values:

~~~js
console.log(5 + 2); // 7
console.log("5" + 2); // "52"
~~~

With two numbers, **+** performs numeric addition. When one operand is a string, **+** can perform string concatenation. This is an introduction to the fact that operators interact with types. Explicit conversion and implicit coercion are covered later.

When data arrives from a form, file, network response, or user input, check and validate it before using it for a particular operation:

~~~js
function printGreeting(name) {
  if (typeof name !== "string") {
    throw new TypeError("name must be a string");
  }

  console.log("Hello, " + name);
}

printGreeting("Asha");
~~~

JavaScript does not automatically enforce the intended type of a function argument. The check makes this function's expectation explicit.

## Type errors are about operations, not changing variable types

JavaScript may let a binding refer to different types, but not every operation works with every combination. Some type combinations produce unexpected results, while others throw an error.

~~~js
const total = 5 + 2;
console.log(total); // 7
~~~

For example, **BigInt** and **Number** values cannot be mixed in most arithmetic operations without an explicit conversion:

~~~js
const whole = 5n;
const fraction = 2;

// whole + fraction; // TypeError
~~~

Conversion requires choosing how precision and meaning should be handled. The **BigInt** chapter covers this in detail.

## A practical mental model

When reading JavaScript, ask two separate questions:

1. **What value does this binding refer to right now?**
2. **What type does that value have?**

~~~js
let selected = "blue";

console.log(selected); // blue
console.log(typeof selected); // string

selected = ["blue", "green"];

console.log(selected); // ["blue", "green"]
console.log(typeof selected); // object
~~~

The name **selected** stays the same, but its current value and type change. Thinking about the binding and the value separately makes dynamic typing easier to follow.

## Common mistakes

- **Thinking a variable has a permanent type:** JavaScript bindings can refer to values with different types.
- **Thinking const means the value has a fixed type:** **const** prevents reassignment of the binding; it does not add a type declaration.
- **Calling arrays a separate language type:** arrays are objects, although JavaScript provides array-specific behavior and checks.
- **Calling functions a separate primitive type:** functions are callable objects in the language type system.
- **Assuming typeof gives a perfect category check:** it has special cases and limitations, covered in a later chapter.
- **Assuming every operation automatically makes sense for every type:** some combinations produce surprising results or throw errors.
- **Mixing values with different purposes in one binding:** clear names and stable meanings improve readability.
- **Treating permission to reassign as a recommendation:** JavaScript allows changing a binding's value type, but code is easier to maintain when each binding has a clear purpose.

## Try it yourself

1. Create a **let** binding that starts as a string, then assign it a number and an object. Log the value and **typeof** after each assignment.
2. Create a Boolean, Number, String, BigInt, Symbol, and Object value. Record each value's type.
3. Create an array and a function. Check **Array.isArray** for the array and inspect **typeof** for both.
4. Declare a numeric **itemCount** and a string **itemCountLabel**. Explain why separate names make the code clearer.
5. Write a function that accepts a string and throws a **TypeError** for another type.
6. Compare **5 + 2** with **"5" + 2**. Describe the result without yet studying all coercion rules.
7. Try adding a **BigInt** to a **Number** in a separate practice file. Read the error and leave conversion details for the later **BigInt** chapter.
8. For each line of a short program, write down the binding name, its current value, and that value's type.

## Key points

- Every JavaScript value has a type.
- A variable name is a binding that can refer to different values.
- JavaScript is dynamically typed because the type is associated with a value, not fixed permanently to a binding.
- JavaScript has primitive types and the object type.
- Arrays and functions are objects, although they have special behavior.
- **const**, **let**, and **var** control bindings, not permanent type declarations.
- Operations can behave differently depending on operand types.
- Validate values when a function or operation depends on a particular type.
- **typeof** is useful for basic inspection, but some categories need more reliable checks.
- Later chapters cover primitives and objects, **undefined** and **null**, truthiness, type checks, coercion, numbers, **BigInt**, and strings in detail.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [13 - Strict mode](013-strict-mode.md) | [Open Q&A](../qnas/014-values-types-and-dynamic-typing.md) | [Open example](../examples/014-values-types-and-dynamic-typing.md) | [15 - Primitive values and object references](015-primitive-values-and-object-references.md) |