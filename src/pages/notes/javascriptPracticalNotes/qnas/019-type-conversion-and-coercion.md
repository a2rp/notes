# 19 - Type conversion and coercion

This Q&A covers explicit conversions, implicit coercion, numeric parsing, string concatenation, BigInt, and object-to-primitive conversion. Each answer and explanation follows its question.

## Multiple-choice questions

### 1. Which expression makes the conversion to Number explicit?

A. **"12" - 1**  
B. **Number("12")**  
C. **"12" + 1**  
D. **if ("12")**

**Answer: B. Number("12").**

The conversion is written directly in the code. The other expressions rely on the behavior of an operator or condition.

### 2. What does **Number("12px")** return?

A. **12**  
B. **"12"**  
C. **NaN**  
D. It returns **null**.

**Answer: C. NaN.**

**Number** requires the complete string to represent a number. Use **parseInt** or **parseFloat** only when accepting a numeric prefix is intentional.

### 3. What does **Number("")** return?

A. **0**  
B. **NaN**  
C. **false**  
D. An empty string

**Answer: A. 0.**

An empty or whitespace-only string converts to zero. Check for empty input first if zero is not the intended value.

### 4. What does **Number(null)** return?

A. **NaN**  
B. **0**  
C. **1**  
D. It throws a TypeError.

**Answer: B. 0.**

This is JavaScript's numeric conversion rule. Check whether **null** is an allowed input before converting it.

### 5. What does **Number(undefined)** return?

A. **0**  
B. **1**  
C. **NaN**  
D. **undefined**

**Answer: C. NaN.**

**undefined** does not represent a numeric value, so conversion produces **NaN**.

### 6. What does **Number.parseInt("24px", 10)** return?

A. **NaN**  
B. **24**  
C. **"24px"**  
D. **0**

**Answer: B. 24.**

**parseInt** reads an integer prefix and stops when it reaches a character that cannot continue the integer.

### 7. What does **"5" + 2** return?

A. **7**  
B. **"52"**  
C. **NaN**  
D. **"7"**

**Answer: B. "52".**

The addition operator concatenates when the primitive operands include a string.

### 8. What does **"5" - 2** return?

A. **3**  
B. **"52"**  
C. **"3"**  
D. **NaN**

**Answer: A. 3.**

Subtraction converts the string operand to a number and performs numeric subtraction.

### 9. Which expression throws a TypeError?

A. **Number(1n)**  
B. **1n + 2n**  
C. **1n + 2**  
D. **BigInt(2)**

**Answer: C. 1n + 2.**

BigInt and Number operands cannot be mixed in ordinary arithmetic. Convert deliberately so both operands use the intended numeric type.

### 10. What does **String([1, 2])** return?

A. **"[1, 2]"**  
B. **"1,2"**  
C. **"[object Object]"**  
D. **"12"**

**Answer: B. "1,2".**

An array's usual string conversion joins its elements with commas. It is not JSON serialization.

## True or false

### 11. **Number("12")** uses explicit conversion.

**Answer: True.**

The **Number** function appears directly in the expression and requests a conversion.

### 12. **Number("12px")** returns the number 12.

**Answer: False.**

It returns **NaN** because **Number** does not stop after a valid numeric prefix. **Number.parseInt("12px", 10)** returns 12.

### 13. **Number("   ")** returns zero.

**Answer: True.**

Whitespace-only strings convert to zero. Applications that reject blank text should check it before conversion.

### 14. **Number(true)** returns 1 and **Number(false)** returns 0.

**Answer: True.**

These are the standard Number conversions for Boolean primitives.

### 15. **Number.isFinite("12")** converts the string before checking it.

**Answer: False.**

**Number.isFinite** does not convert its argument. It returns false for a string.

### 16. **parseInt("3.9", 10)** returns 3.

**Answer: True.**

**parseInt** reads the integer prefix and stops at the decimal point.

### 17. **String({})** usually returns JSON text for an empty object.

**Answer: False.**

It usually returns **"[object Object]"**. Use **JSON.stringify** for JSON text.

### 18. **Boolean("false")** returns false.

**Answer: False.**

The text is a non-empty string, so it is truthy and converts to **true**.

### 19. The unary plus operator converts a BigInt to a Number.

**Answer: False.**

Unary plus throws a **TypeError** for a BigInt. The explicit expression **Number(1n)** is allowed, though converting large BigInts to Number can lose precision.

### 20. An object's conversion methods can affect the result of an operation.

**Answer: True.**

Operations may call **valueOf()**, **toString()**, or **Symbol.toPrimitive** to obtain a primitive value.

## Predict the result

### 21. What does this code print?

~~~js
console.log(Number("42"));
console.log(Number(" 42 "));
console.log(Number("42px"));
~~~

**Answer:**

~~~text
42
42
NaN
~~~

Leading and trailing whitespace around a valid numeric string is allowed. Extra non-numeric text makes the full conversion fail.

### 22. What does this code print?

~~~js
console.log(Number(""));
console.log(Number(null));
console.log(Number(undefined));
~~~

**Answer:**

~~~text
0
0
NaN
~~~

Empty text and **null** convert to zero. **undefined** converts to **NaN**.

### 23. What does this code print?

~~~js
console.log("8" - 3);
console.log("8" * 3);
console.log("8" / 2);
~~~

**Answer:**

~~~text
5
24
4
~~~

These arithmetic operators convert the numeric strings to Number values before calculating.

### 24. What does this code print?

~~~js
console.log(5 + 2);
console.log("5" + 2);
console.log(5 + "2");
~~~

**Answer:**

~~~text
7
52
52
~~~

Two numbers are added. When a string is one of the operands, **+** concatenates the converted primitive values.

### 25. What does this code print?

~~~js
console.log(true + 1);
console.log(null + 1);
console.log(undefined + 1);
~~~

**Answer:**

~~~text
2
1
NaN
~~~

The first two values convert to **1** and **0**. **undefined** converts to **NaN**, which remains **NaN** through the addition.

### 26. What does this code print?

~~~js
console.log(Number([]));
console.log(Number([5]));
console.log(Number([1, 2]));
~~~

**Answer:**

~~~text
0
5
NaN
~~~

Arrays first convert to primitive strings. The empty array becomes an empty string, **[5]** becomes **"5"**, and **[1, 2]** becomes **"1,2"**.

### 27. What does this code print?

~~~js
console.log(String([1, 2, 3]));
console.log(String({}));
~~~

**Answer:**

~~~text
1,2,3
[object Object]
~~~

Array and ordinary object string conversion is not JSON serialization.

### 28. What does this code print?

~~~js
console.log(Number.parseInt("24px", 10));
console.log(Number("24px"));
console.log(Number.parseFloat("3.5rem"));
~~~

**Answer:**

~~~text
24
NaN
3.5
~~~

The parsing functions accept a numeric prefix. **Number** requires the full string to be numeric.

### 29. What does this code print?

~~~js
console.log(Number(1n));
console.log(BigInt(42));
console.log(1n + 2n);
~~~

**Answer:**

~~~text
1
42n
3n
~~~

**Number(1n)** is an explicit BigInt-to-Number conversion. **BigInt(42)** converts the integer to BigInt. BigInt operands can be added to each other.

### 30. What does this code print?

~~~js
const measurement = {
  value: 10,

  valueOf() {
    return this.value;
  },

  toString() {
    return "ten";
  }
};

console.log(Number(measurement));
console.log(String(measurement));
console.log(measurement + 1);
~~~

**Answer:**

~~~text
10
ten
11
~~~

Number conversion uses the object's numeric primitive conversion. String conversion uses its text conversion. The default hint for ordinary objects in **+** generally follows numeric conversion, so the object contributes 10.

### 31. What does this code print?

~~~js
const token = {
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? "token" : 5;
  }
};

console.log(String(token));
console.log(Number(token));
console.log(token + 1);
~~~

**Answer:**

~~~text
token
5
6
~~~

The custom conversion method receives a hint. String conversion receives **"string"**. Number conversion receives a numeric hint, and **+** uses the default hint, which this method handles by returning 5.

## Short-answer questions

### 32. What is the difference between explicit conversion and coercion?

**Answer:** Explicit conversion is requested directly in code, such as **Number(value)**. Coercion is an implicit conversion performed by the language during an operation, such as converting **"8"** in **"8" - 3**.

Both can change the type used by an operation, but explicit conversion makes the intent easier to see.

### 33. Why should empty input be checked before converting it with **Number**?

**Answer:** An empty or whitespace-only string converts to zero.

If blank input is invalid, check for it before conversion so it is not accidentally accepted as a valid zero.

### 34. When are **parseInt** and **parseFloat** more permissive than **Number**?

**Answer:** They read a numeric prefix and stop at a later character they cannot parse.

For example, **Number.parseFloat("3.5rem")** returns 3.5, while **Number("3.5rem")** returns **NaN**.

### 35. Why can **+** be confusing with strings?

**Answer:** It can perform numeric addition or string concatenation.

If either primitive operand is a string, the operator concatenates. Use explicit conversion when the intended operation should be numeric.

### 36. Why is **Number.isFinite** useful after converting user input?

**Answer:** It accepts only finite Number values and does not coerce strings.

It can reject **NaN**, infinity, and values that are still strings after a failed or skipped conversion.

### 37. Why is **String(object)** not a substitute for **JSON.stringify(object)**?

**Answer:** Ordinary object string conversion commonly returns **"[object Object]"**, and array string conversion joins elements with commas.

**JSON.stringify** creates JSON text according to JSON serialization rules. It has its own behavior for unsupported or circular values.

### 38. What happens when **BigInt(4.2)** is called?

**Answer:** It throws a **RangeError** because the Number is not an integer.

The string **"4.2"** passed to **BigInt** instead throws a **SyntaxError** because it is not an integer string.

### 39. Can converting a large BigInt to Number lose precision?

**Answer:** Yes. Number cannot represent every possible BigInt integer exactly.

If exact integer precision matters, keep the value as BigInt rather than converting it to Number.

### 40. Why can converting an object invoke code?

**Answer:** The object can define **valueOf()**, **toString()**, or **Symbol.toPrimitive** methods, and JavaScript can call them to obtain a primitive.

Those methods may return a value, throw an error, or cause side effects, so custom conversions should be predictable.

## Coding questions

### 41. Write a function that converts non-empty text to a finite Number and returns null for invalid input.

**Answer:**

~~~js
function readFiniteNumber(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return null;
  }

  const value = Number(text);

  if (!Number.isFinite(value)) {
    return null;
  }

  return value;
}
~~~

The function rejects non-string and blank values before converting. It then rejects **NaN** and infinities with **Number.isFinite**.

### 42. Write a function that accepts a non-negative safe integer from text.

**Answer:**

~~~js
function parseQuantity(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return null;
  }

  const quantity = Number(text);

  if (!Number.isSafeInteger(quantity) || quantity < 0) {
    return null;
  }

  return quantity;
}
~~~

The function rejects blank text, fractions, negative numbers, unsafe integers, and trailing text. It accepts **"0"** as zero.

### 43. Write a function that explicitly converts an integer string to BigInt and reports invalid input.

**Answer:**

~~~js
function parseIdentifier(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return null;
  }

  try {
    return BigInt(text);
  } catch {
    return null;
  }
}
~~~

The **try...catch** handles strings that cannot be converted to BigInt. A real application may return a structured error instead of **null** to explain why conversion failed.

### 44. Write a function that adds two decimal strings as numbers and rejects invalid values.

**Answer:**

~~~js
function addDecimalStrings(leftText, rightText) {
  const left = Number(leftText);
  const right = Number(rightText);

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return null;
  }

  return left + right;
}
~~~

Both values are converted explicitly and checked before addition. If blank strings must be rejected, add a blank-input check before calling **Number**.

### 45. Write an object whose numeric conversion returns 8 and whose string conversion returns "eight".

**Answer:**

~~~js
const value = {
  valueOf() {
    return 8;
  },

  toString() {
    return "eight";
  }
};

console.log(Number(value)); // 8
console.log(String(value)); // "eight"
console.log(value + 1); // 9
~~~

The methods return primitive values. Numeric conversion uses **valueOf()** for this object, while string conversion uses **toString()**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [18 - typeof, instanceof, and reliable type checks](../lessons/018-typeof-instanceof-and-reliable-type-checks.md) | [Open lesson](../lessons/019-type-conversion-and-coercion.md) | [Open example](../examples/019-type-conversion-and-coercion.md) | [20 - Equality, comparison, and relational operators](../lessons/020-equality-comparison-and-relational-operators.md) |
