# 22 - BigInt

This Q&A reviews BigInt literals, explicit conversion, arithmetic, division and remainder, comparisons, fixed-width operations, truthiness, and JSON serialization. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Which statement best describes a BigInt?

A. It is a Number with additional decimal precision.  
B. It represents integer values of arbitrary size.  
C. It stores only positive integers.  
D. It is a string used for large numbers.

**Answer: B. It represents integer values of arbitrary size.**

BigInt stores integers exactly, subject to practical memory and implementation limits. It does not represent fractions.

### 2. Which expression creates a BigInt literal?

A. **42**  
B. **42.0n**  
C. **42n**  
D. **"42n"**

**Answer: C. 42n.**

The **n** suffix marks an integer literal as BigInt. The suffix cannot follow a decimal point or exponent.

### 3. What does **typeof 42n** return?

A. **"number"**  
B. **"bigint"**  
C. **"integer"**  
D. **"object"**

**Answer: B. "bigint".**

BigInt and Number are separate JavaScript primitive types.

### 4. What is the result of **7n + 5n**?

A. **12**  
B. **12n**  
C. **"75"**  
D. It throws a TypeError.

**Answer: B. 12n.**

Arithmetic between BigInts returns a BigInt.

### 5. What happens when evaluating **7n + 5**?

A. It returns **12n**.  
B. It returns **12**.  
C. It concatenates the values.  
D. It throws a TypeError.

**Answer: D. It throws a TypeError.**

BigInt and Number cannot be mixed in arithmetic. Convert deliberately if the operation should use one type.

### 6. What does **BigInt(42)** return?

A. **42**  
B. **42n**  
C. **"42"**  
D. It throws a TypeError.

**Answer: B. 42n.**

The function **BigInt()** can explicitly convert an integral Number. The Number should already be exact if all intended digits must be preserved.

### 7. What happens when evaluating **BigInt(4.2)**?

A. It returns **4n**.  
B. It returns **5n**.  
C. It throws a RangeError.  
D. It returns **4.2n**.

**Answer: C. It throws a RangeError.**

A Number argument to **BigInt()** must be integral. BigInt does not round fractions.

### 8. Which conversion preserves the exact integer digits in this string?

A. **BigInt(Number("9007199254740993"))**  
B. **BigInt("9007199254740993")**  
C. **Number("9007199254740993")**  
D. **parseInt("9007199254740993", 10)**

**Answer: B. BigInt("9007199254740993").**

The direct string conversion preserves the digits. Converting through Number first can round the value before BigInt receives it.

### 9. What does **1n == 1** return?

A. **true**  
B. **false**  
C. It returns **1n**.  
D. It throws a TypeError.

**Answer: A. true.**

Loose equality can compare a BigInt and Number by value. Strict equality returns false because their types differ.

### 10. What does **1n === 1** return?

A. **true**  
B. **false**  
C. **1**  
D. It throws a TypeError.

**Answer: B. false.**

Strict equality does not convert between BigInt and Number.

### 11. What does **1n < 1.5** return?

A. **true**  
B. **false**  
C. **1n**  
D. It throws a TypeError.

**Answer: A. true.**

Relational comparison permits a BigInt and Number operand. This does not permit mixing them in arithmetic.

### 12. What does **7n / 2n** return?

A. **3n**  
B. **3.5n**  
C. **4n**  
D. It throws a RangeError.

**Answer: A. 3n.**

BigInt division truncates toward zero and returns an integer BigInt.

### 13. What does **-7n % 3n** return?

A. **1n**  
B. **-1n**  
C. **-2n**  
D. It throws a TypeError.

**Answer: B. -1n.**

The remainder has the sign of the dividend, which is the left operand.

### 14. What happens when evaluating **5n / 0n**?

A. It returns **Infinity**.  
B. It returns **0n**.  
C. It returns **NaN**.  
D. It throws a RangeError.

**Answer: D. It throws a RangeError.**

Unlike Number division, BigInt division by zero throws.

### 15. What happens when evaluating **2n ** -1n**?

A. It returns **0n**.  
B. It returns **0.5n**.  
C. It throws a RangeError.  
D. It throws a TypeError.

**Answer: C. It throws a RangeError.**

A negative exponent would require a fractional result, which BigInt cannot represent.

### 16. What happens when calling **Math.sqrt(4n)**?

A. It returns **2n**.  
B. It returns **2**.  
C. It throws a TypeError.  
D. It returns **NaN**.

**Answer: C. It throws a TypeError.**

The Math methods operate on Numbers, not BigInts. Convert explicitly only if Number precision is acceptable.

### 17. What does **Boolean(0n)** return?

A. **true**  
B. **false**  
C. **0n**  
D. It throws a TypeError.

**Answer: B. false.**

Zero BigInt is falsy. Nonzero BigInts, including negative ones, are truthy.

### 18. What does **BigInt.asUintN(8, -1n)** return?

A. **-1n**  
B. **255n**  
C. **0n**  
D. It throws a RangeError.

**Answer: B. 255n.**

The function keeps the low eight bits and interprets them as an unsigned value.

### 19. What does **BigInt.asIntN(8, 255n)** return?

A. **255n**  
B. **-1n**  
C. **127n**  
D. It throws a RangeError.

**Answer: B. -1n.**

The low eight bits are interpreted as a signed two's-complement value.

### 20. What does **JSON.stringify({ id: 1n })** do by default?

A. Returns **{"id":"1"}**  
B. Returns **{"id":1}**  
C. Throws a TypeError  
D. Returns **null**

**Answer: C. Throws a TypeError.**

JSON has no native BigInt representation. Convert BigInts to an agreed representation, often decimal strings, before serialization.

## Predict the result

### 21. What does this code print?

~~~js
console.log(0b1010n);
console.log(0o17n);
console.log(0xFFn);
~~~

**Answer:**

~~~text
10n
15n
255n
~~~

Binary, octal, and hexadecimal integer literals can use the **n** suffix.

### 22. What does this code print?

~~~js
console.log(BigInt(true));
console.log(BigInt(false));
~~~

**Answer:**

~~~text
1n
0n
~~~

Explicit conversion maps **true** to **1n** and **false** to **0n**.

### 23. What does this code print?

~~~js
const alreadyRounded = 9007199254740993;

console.log(alreadyRounded);
console.log(BigInt(alreadyRounded));
console.log(BigInt("9007199254740993"));
~~~

**Answer:**

~~~text
9007199254740992
9007199254740992n
9007199254740993n
~~~

The Number literal has already been rounded. Converting its value to BigInt cannot restore the missing digit. Converting the text directly preserves it.

### 24. What does this code print?

~~~js
console.log(9n / 4n);
console.log(-9n / 4n);
~~~

**Answer:**

~~~text
2n
-2n
~~~

Division truncates toward zero. It does not floor negative quotients toward negative infinity.

### 25. What does this code print?

~~~js
console.log(9n % 4n);
console.log(-9n % 4n);
console.log(9n % -4n);
~~~

**Answer:**

~~~text
1n
-1n
1n
~~~

The remainder has the sign of the dividend, the left operand.

### 26. What does this code print?

~~~js
console.log(2n ** 5n);
console.log(0n ** 0n);
~~~

**Answer:**

~~~text
32n
1n
~~~

BigInt exponentiation returns a BigInt. **0n ** 0n** is defined as **1n**.

### 27. What does this code print?

~~~js
console.log(1n == 1);
console.log(1n === 1);
console.log(1n < 2);
~~~

**Answer:**

~~~text
true
false
true
~~~

Loose equality and relational comparison allow these mixed-type comparisons. Strict equality does not equate different types.

### 28. What does this code print?

~~~js
console.log(BigInt.asUintN(8, 256n));
console.log(BigInt.asIntN(8, 128n));
console.log(BigInt.asIntN(8, 255n));
~~~

**Answer:**

~~~text
0n
-128n
-1n
~~~

The methods wrap to eight bits, then interpret the bits as unsigned or signed.

### 29. What does this code print?

~~~js
console.log(Boolean(0n));
console.log(Boolean(-1n));
console.log(0n || 5n);
~~~

**Answer:**

~~~text
false
true
5n
~~~

Zero BigInt is falsy. A nonzero BigInt is truthy, so the logical OR expression evaluates to its right operand.

### 30. What does this code print?

~~~js
const json = JSON.stringify(
  { id: 9007199254740993n },
  (key, value) => typeof value === "bigint" ? value.toString() : value
);

console.log(json);
~~~

**Answer:**

~~~text
{"id":"9007199254740993"}
~~~

The replacer converts the BigInt to decimal text so that JSON can represent it.

### 31. What does this code print?

~~~js
console.log(6n & 3n);
console.log(3n << 2n);
~~~

**Answer:**

~~~text
2n
12n
~~~

BigInt supports bitwise operations and signed shifts, and their results remain BigInts.

### 32. What happens when evaluating **1n >>> 0n**?

**Answer: It throws a TypeError.**

BigInt does not support the unsigned right shift operator **>>>**. Use an appropriate signed shift or fixed-width conversion for the intended operation.

## True or false

### 33. BigInt can represent fractional values such as **1.5n**.

**Answer: False.**

BigInt represents integers only. A decimal point or exponent is not valid in a BigInt literal.

### 34. BigInt and Number can be compared with relational operators.

**Answer: True.**

For example, **1n < 2** is allowed. This does not allow mixed BigInt and Number arithmetic.

### 35. Converting an imprecise Number to BigInt restores the original exact digits.

**Answer: False.**

BigInt receives the Number value that already exists. If Number rounded the original input, the lost digits cannot be recovered.

### 36. **BigInt.asIntN()** rejects a value that does not fit in the requested number of bits.

**Answer: False.**

It wraps to the requested width and interprets the resulting bits. Validate the original range separately when out-of-range values must be rejected.

### 37. BigInt division rounds the quotient to the nearest integer.

**Answer: False.**

It truncates toward zero. For example, **-9n / 4n** is **-2n**.

### 38. BigInt can be passed directly to every Math method.

**Answer: False.**

Math methods expect Number values and generally throw a TypeError when given BigInt.

## Short-answer questions

### 39. Why should a large integer string be converted directly with **BigInt(text)** instead of first converting it to Number?

**Answer:** Number may round an integer beyond its safe range. Once rounded, converting that Number to BigInt preserves only the rounded value.

Direct conversion from valid integer text preserves the exact digits.

### 40. What is the difference between BigInt division and Number division?

**Answer:** BigInt division returns an integer BigInt by truncating toward zero. Number division can return a fractional Number and can produce **Infinity** or **NaN**.

### 41. Why can **1n == 1** be true while **1n === 1** is false?

**Answer:** Loose equality can compare a BigInt and Number by value. Strict equality does not convert and requires matching types for equality.

### 42. When should code use **BigInt.asIntN()** or **BigInt.asUintN()**?

**Answer:** Use them when the result must behave like a fixed-width signed or unsigned integer, such as retaining a specified number of low-order bits.

They wrap values. They do not validate that the original value fits.

### 43. How can a BigInt be represented in JSON?

**Answer:** Convert it to an agreed JSON-supported representation, commonly a decimal string, using a replacer or explicit mapping.

Convert it back to BigInt at the boundary where the data is read, if the application requires an exact integer.

## Coding questions

### 44. Write a function that accepts non-negative BigInts up to and including one million.

**Answer:**

~~~js
function isValidCount(value) {
    return typeof value === "bigint"
        && value >= 0n
        && value <= 1_000_000n;
}
~~~

The type check rejects Numbers and strings. The BigInt comparisons enforce the chosen range.

### 45. Convert an exact integer string to BigInt and add one.

**Answer:**

~~~js
const sourceText = "9007199254740993";
const nextValue = BigInt(sourceText) + 1n;

console.log(nextValue); // 9007199254740994n
~~~

Convert the text directly. Parsing through Number first could round the value.

### 46. Write a JSON replacer that serializes BigInts as strings.

**Answer:**

~~~js
function stringifyWithBigInts(value) {
    return JSON.stringify(value, (key, item) =>
        typeof item === "bigint" ? item.toString() : item
    );
}
~~~

The output format uses JSON strings for BigInts. Document this choice so the receiving code knows when to convert those strings back.

### 47. Write an eight-bit unsigned wrap for a BigInt value.

**Answer:**

~~~js
function toUint8(value) {
    return BigInt.asUintN(8, value);
}

console.log(toUint8(256n)); // 0n
console.log(toUint8(-1n)); // 255n
~~~

This wraps to the low eight bits. It does not reject out-of-range input.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [21 - Numbers, floating point, and safe integers](../lessons/021-numbers-floating-point-and-safe-integers.md) | [Open lesson](../lessons/022-bigint.md) | [Open example](../examples/022-bigint.md) | [23 - Strings and template literals](../lessons/023-strings-and-template-literals.md) |