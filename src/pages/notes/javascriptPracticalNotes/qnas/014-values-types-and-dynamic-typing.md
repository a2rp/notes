# 14 - Values, types, and dynamic typing: Q&A

Use these questions to review JavaScript values, value types, and dynamic typing. Each answer follows its question. Detailed checks, coercion rules, and individual types are covered in later chapters.

## Multiple-choice questions

### 1. What has a type in JavaScript?

A. Only variable names  
B. Every value  
C. Only objects  
D. Only values declared with **const**

**Answer: B.** Every JavaScript value has a type. A binding can refer to a value, and the type belongs to that current value.

### 2. What does dynamic typing mean?

A. Every variable must keep the type of its first value  
B. A binding can refer to values of different types over time  
C. JavaScript checks all types before the program runs  
D. Object properties cannot change

**Answer: B.** JavaScript does not permanently assign a type to a variable binding. The current value has a type.

### 3. Which statement about **let item = "book"** is correct?

A. The name **item** is permanently a string  
B. The binding can later refer to a value of another type  
C. The string is an object  
D. The value has no type until reassigned

**Answer: B.** JavaScript allows the binding to be assigned a value of another type, such as a number or object.

### 4. How many primitive types does JavaScript have?

A. Four  
B. Five  
C. Seven  
D. Eight

**Answer: C.** The primitive types are **undefined**, **null**, **boolean**, **number**, **bigint**, **string**, and **symbol**. Objects form the other broad category.

### 5. Which is an object value?

A. **"hello"**  
B. **true**  
C. **42**  
D. **{ name: "Asha" }**

**Answer: D.** An object can group properties and other values.

### 6. How is an array classified in JavaScript's broad language types?

A. As a separate primitive type  
B. As an object  
C. As a string  
D. As a number

**Answer: B.** Arrays are objects with indexed elements and array-specific behavior. Use **Array.isArray** when checking whether a value is an array.

### 7. How is a function classified in the language type system?

A. As a primitive value  
B. As a callable object  
C. As a string  
D. As a Boolean

**Answer: B.** Functions are objects that can be called. **typeof** reports **"function"** for callable functions.

### 8. What does **typeof 42** return?

A. **42**  
B. **Number**  
C. **"number"**  
D. **"integer"**

**Answer: C.** **typeof** returns a string describing a broad category of the value.

### 9. What does **typeof []** return?

A. **"array"**  
B. **"object"**  
C. **"list"**  
D. **"function"**

**Answer: B.** Arrays are objects, so **typeof** reports **"object"**. Use **Array.isArray** to check for arrays.

### 10. What is the type of **9007199254740993n**?

A. **Number**  
B. **String**  
C. **BigInt**  
D. **Symbol**

**Answer: C.** The trailing **n** marks a BigInt literal. BigInt represents integer values separately from Number values.

### 11. What does the declaration keyword **const** determine?

A. The permanent type of a value  
B. Whether the binding can be reassigned  
C. Whether an object is deeply frozen  
D. Whether a value is a primitive

**Answer: B.** **const** prevents reassignment of its binding. It does not declare a permanent type.

### 12. What happens when **+** receives two numbers?

A. It performs numeric addition  
B. It always joins text  
C. It throws a **TypeError**  
D. It changes the operands into objects

**Answer: A.** With two numeric operands, **+** performs addition.

### 13. What does this expression produce?

~~~js
"5" + 2
~~~

A. **7**  
B. **"52"**  
C. **"7"**  
D. A **TypeError**

**Answer: B.** When one operand is a string, **+** performs string concatenation. The detailed conversion rules are covered later.

### 14. What does **typeof null** return in JavaScript?

A. **"null"**  
B. **"undefined"**  
C. **"object"**  
D. **"boolean"**

**Answer: C.** This is a long-standing historical behavior of **typeof**. The value **null** is still its own primitive type. More reliable type checks are covered in the later type-checking chapter.

### 15. Why can an explicit type check be useful in a function?

A. JavaScript always knows how the programmer intends to use an argument  
B. It makes the function's expected input clear and can reject inappropriate values  
C. It freezes the argument  
D. It prevents callers from passing objects

**Answer: B.** JavaScript does not automatically enforce the intended type of an ordinary function argument. A check can make that requirement explicit.

## True or false

### 16. A JavaScript binding can refer to a string now and a number later.

**Answer: True.** JavaScript is dynamically typed, so the binding is not permanently restricted to one type.

### 17. The type belongs to the variable name rather than to its current value.

**Answer: False.** A value has a type. A binding can refer to different values over time.

### 18. **const** is a static type declaration.

**Answer: False.** **const** controls reassignment of the binding. It does not specify a type.

### 19. An array is a primitive value.

**Answer: False.** An array is an object, though JavaScript provides array-specific methods and checks.

### 20. Functions are objects that can be called.

**Answer: True.** In JavaScript's type system, functions are callable objects.

### 21. **typeof** returns a JavaScript value's type as another JavaScript type.

**Answer: False.** **typeof** returns a string, such as **"number"** or **"object"**.

### 22. **typeof** always distinguishes arrays from ordinary objects.

**Answer: False.** **typeof []** returns **"object"**. Use **Array.isArray** for array checks.

### 23. **typeof null** returns **"null"**.

**Answer: False.** It returns **"object"**, a historical quirk. **null** remains its own language type.

### 24. JavaScript allows every operation on every combination of value types.

**Answer: False.** Some combinations behave differently, produce unexpected results, or throw errors.

### 25. Explicit validation can document what kind of input a function expects.

**Answer: True.** A check such as **typeof name === "string"** makes a function's expectation visible and can reject incorrect input.

## Predict the result

### 26. What do these logs print?

~~~js
let item = "book";
console.log(typeof item);

item = 12;
console.log(typeof item);
~~~

**Answer:**

~~~text
string
number
~~~

The binding **item** first refers to a string and later to a number.

### 27. What does this code print?

~~~js
let response = "Waiting";
response = { status: "complete" };

console.log(response.status);
console.log(typeof response);
~~~

**Answer:**

~~~text
complete
object
~~~

The final value is an object with a **status** property, so the property read returns **complete**.

### 28. What does this code print?

~~~js
console.log(typeof true);
console.log(typeof "hello");
console.log(typeof 3.5);
console.log(typeof 8n);
console.log(typeof Symbol("id"));
~~~

**Answer:**

~~~text
boolean
string
number
bigint
symbol
~~~

Each value belongs to a different primitive type. Both integer and decimal values in the ordinary numeric type are **number**.

### 29. What does this code print?

~~~js
const colors = ["blue", "green"];

console.log(typeof colors);
console.log(Array.isArray(colors));
~~~

**Answer:**

~~~text
object
true
~~~

Arrays are objects. **Array.isArray** is the specific check for an array value.

### 30. What does this code print?

~~~js
function greet() {
  return "Hello";
}

console.log(typeof greet);
console.log(greet());
~~~

**Answer:**

~~~text
function
Hello
~~~

A function is a callable object, and **typeof** reports the special string **"function"** for it.

### 31. What does this code print?

~~~js
console.log(5 + 2);
console.log("5" + 2);
~~~

**Answer:**

~~~text
7
52
~~~

Two numbers are added. A string operand makes **+** concatenate text. The exact conversion rules are covered later.

### 32. What happens here?

~~~js
const whole = 5n;
const count = 2;

console.log(whole + count);
~~~

**Answer:** The addition throws a **TypeError** because a **BigInt** and a **Number** cannot be mixed in ordinary arithmetic without an explicit conversion.

### 33. What does this code print?

~~~js
let selected = "blue";
console.log(typeof selected);

selected = ["blue", "green"];
console.log(typeof selected);
~~~

**Answer:**

~~~text
string
object
~~~

The same binding refers to values of different types at different times.

## Short-answer questions

### 34. Explain the difference between a binding and a value.

**Answer:** A binding is the association between a name and a value in a scope. The value is the data the name currently refers to. In JavaScript, the binding can later refer to a different value, including one with a different type.

### 35. What does dynamically typed mean in JavaScript?

**Answer:** Types are associated with values rather than being permanently fixed on variable names. A binding can refer to values of different types as a program runs.

### 36. Name JavaScript's seven primitive types.

**Answer:** **undefined**, **null**, **boolean**, **number**, **bigint**, **string**, and **symbol**.

### 37. Why is **typeof** not enough to identify every specific kind of value?

**Answer:** It reports broad categories and has special cases. For example, **typeof []** is **"object"**, **typeof null** is **"object"**, and **typeof function** is **"function"**. Use more specific checks when the distinction matters.

### 38. Why might a programmer check a function argument before using it?

**Answer:** JavaScript does not enforce the function's intended input type automatically. A check can catch incorrect input early and explain the function's requirements.

## Coding questions

### 39. Write a function that accepts a string and throws a TypeError for other values.

**Answer:**

~~~js
function printGreeting(name) {
  if (typeof name !== "string") {
    throw new TypeError("name must be a string");
  }

  console.log("Hello, " + name);
}

printGreeting("Asha");
~~~

The check verifies the current value's type before the function uses it as text.

### 40. Show one binding referring to values of three different types.

**Answer:**

~~~js
let currentValue = "starting";
console.log(typeof currentValue); // string

currentValue = 12;
console.log(typeof currentValue); // number

currentValue = { complete: true };
console.log(typeof currentValue); // object
~~~

The binding name stays the same, while its current value and type change.

### 41. Check that a value is an array and print a useful message for other types.

**Answer:**

~~~js
function describeList(value) {
  if (!Array.isArray(value)) {
    return "Expected an array";
  }

  return "Array with " + value.length + " items";
}

console.log(describeList(["red", "blue"])); // Array with 2 items
console.log(describeList("red")); // Expected an array
~~~

**Array.isArray** distinguishes arrays from other objects, which **typeof** alone cannot do.

### 42. Keep a count and its text label in separate bindings.

**Answer:**

~~~js
const itemCount = 3;
const itemCountLabel = "three";

console.log(itemCount);
console.log(itemCountLabel);
~~~

Both bindings keep a clear meaning and type. Separate names help prevent a count from unexpectedly becoming text.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [13 - Strict mode](../lessons/013-strict-mode.md) | [Open lesson](../lessons/014-values-types-and-dynamic-typing.md) | [Open example](../examples/014-values-types-and-dynamic-typing.md) | [15 - Primitive values and object references](../lessons/015-primitive-values-and-object-references.md) |