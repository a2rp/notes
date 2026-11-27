# 29 - Bitwise operators and integer operations: Q&A

Use these questions to review Number bitwise operators, 32-bit conversion, shift behavior, masks, and BigInt bitwise operations. Each answer follows its question so you can check your reasoning immediately.

## Multiple-choice questions

### 1. Which operator performs bitwise AND?

A. **&&**  
B. **&**  
C. **||**  
D. **!**

**Answer:** B. **&**

**Explanation:** A single ampersand performs bitwise AND. The double ampersand **&&** is logical AND and uses truthiness.

### 2. What is the result of **12 & 10**?

A. **2**  
B. **8**  
C. **10**  
D. **14**

**Answer:** B. **8**

**Explanation:** In binary, 12 is **1100** and 10 is **1010**. AND keeps only positions where both bits are 1, giving **1000**, which is 8.

### 3. What is the result of **12 ^ 10**?

A. **2**  
B. **6**  
C. **8**  
D. **14**

**Answer:** B. **6**

**Explanation:** In binary, **1100 ^ 1010** is **0110**, which is 6.

### 4. What is the result of **~5** for a Number?

A. **5**  
B. **-5**  
C. **-6**  
D. **6**

**Answer:** C. **-6**

**Explanation:** For Number bitwise NOT, **~x** is equivalent to **-(x + 1)**.

### 5. Which Number operator returns an unsigned 32-bit result?

A. **>>**  
B. **>>>**  
C. **<<**  
D. **^**

**Answer:** B. **>>>**

**Explanation:** Unsigned right shift fills with zero bits and interprets the 32-bit pattern as unsigned.

### 6. What is the effective shift count for **value << 33**?

A. **33**  
B. **32**  
C. **1**  
D. **0**

**Answer:** C. **1**

**Explanation:** Number shift operators use only the low five bits of the converted shift count. The effective count is 33 modulo 32, which is 1.

### 7. Which statement about Number bitwise operations is correct?

A. They preserve arbitrary precision.  
B. They operate on a 32-bit integer representation.  
C. They always return BigInt.  
D. They preserve fractional parts.

**Answer:** B. They operate on a 32-bit integer representation.

**Explanation:** Number bitwise operators convert operands to 32-bit integer values. Fractions are discarded by the conversion and large values can wrap.

### 8. Which is a valid BigInt bitwise operation?

A. **5n & 3n**  
B. **5n & 3**  
C. **5n >>> 1n**  
D. **5n << 1**

**Answer:** A. **5n & 3n**

**Explanation:** Both operands must be BigInts. BigInt supports AND, OR, XOR, NOT, left shift, and signed right shift. It does not support unsigned right shift.

### 9. What does **permissions & mask** usually help determine?

A. Whether selected bits are set  
B. Whether two values are equal  
C. Whether a value is truthy  
D. Whether a Number is finite

**Answer:** A. Whether selected bits are set

**Explanation:** AND with a mask clears all bits except those selected by the mask. Compare the result with zero to test whether any selected bit was set.

### 10. Which operator is appropriate for ordinary logical conditions?

A. **&**  
B. **|**  
C. **&&**  
D. **^**

**Answer:** C. **&&**

**Explanation:** Logical AND uses truthiness and short-circuit evaluation. Bitwise AND works on integer bit patterns.

### 11. What is the result of **-8 >> 1**?

A. **-4**  
B. **4**  
C. **2147483644**  
D. **-16**

**Answer:** A. **-4**

**Explanation:** Signed right shift copies the sign bit. The negative 32-bit value remains negative.

### 12. Why does **>>>** throw when used with BigInt?

A. BigInt cannot be shifted.  
B. BigInt has no fixed 32-bit width for an unsigned shift.  
C. BigInt only supports negative values.  
D. Shift operators require strings.

**Answer:** B. BigInt has no fixed 32-bit width for an unsigned shift.

**Explanation:** BigInt bitwise operations use an unbounded two's-complement model. There is no fixed width from which to define an unsigned right shift.

## Predict the output

### 13. What does this print?

~~~js
console.log(13 & 9);
~~~

**Answer:**

~~~text
9
~~~

**Explanation:** The binary values are **1101** and **1001**. Their AND is **1001**, which is 9.

### 14. What does this print?

~~~js
console.log(13 | 9);
~~~

**Answer:**

~~~text
13
~~~

**Explanation:** OR sets a bit when either corresponding input bit is 1. **1101 | 1001** is **1101**.

### 15. What does this print?

~~~js
console.log(13 ^ 9);
~~~

**Answer:**

~~~text
4
~~~

**Explanation:** XOR sets a bit only when the inputs differ. **1101 ^ 1001** is **0100**, which is 4.

### 16. What does this print?

~~~js
console.log(5.9 | 0);
~~~

**Answer:**

~~~text
5
~~~

**Explanation:** Number bitwise conversion discards the fractional part by converting the value to a 32-bit integer.

### 17. What does this print?

~~~js
console.log((2 ** 32) | 0);
~~~

**Answer:**

~~~text
0
~~~

**Explanation:** The Number bitwise operation keeps the corresponding 32-bit pattern. The value 2 to the power of 32 has a zero pattern in 32 bits.

### 18. What does this print?

~~~js
console.log(-1 >>> 0);
~~~

**Answer:**

~~~text
4294967295
~~~

**Explanation:** Negative one has all 32 bits set. Unsigned interpretation maps that pattern to the maximum unsigned 32-bit integer.

### 19. What does this print?

~~~js
console.log(1 << 32);
~~~

**Answer:**

~~~text
1
~~~

**Explanation:** A Number shift count is reduced modulo 32. Shifting by 32 therefore acts like shifting by zero.

### 20. What does this print?

~~~js
console.log(-5 >> 1);
console.log(-5 >>> 1);
~~~

**Answer:**

~~~text
-3
2147483645
~~~

**Explanation:** Signed right shift copies the sign bit. Unsigned right shift fills with zeroes and interprets the 32-bit pattern as a non-negative integer.

### 21. What does this print?

~~~js
console.log(5n & 3n);
console.log(5n | 3n);
console.log(5n ^ 3n);
~~~

**Answer:**

~~~text
1n
7n
6n
~~~

**Explanation:** BigInt bitwise operators apply the same AND, OR, and XOR rules without Number's 32-bit truncation. The results remain BigInts.

### 22. What does this print?

~~~js
console.log(1n << 40n);
~~~

**Answer:**

~~~text
1099511627776n
~~~

**Explanation:** BigInt shifts are not limited to 32-bit Number width. A left shift by 40 multiplies this value by 2 to the power of 40.

### 23. What does this print?

~~~js
const flags = 5;
const mask = 1;

console.log(flags & mask === 1);
console.log((flags & mask) === 1);
~~~

**Answer:**

~~~text
1
true
~~~

**Explanation:** Equality binds more tightly than bitwise AND, so the first expression is evaluated as **flags & (mask === 1)**. The Boolean becomes a Number operand, producing 1. Parentheses around the AND operation express the intended comparison and produce a Boolean.

## True or false

### 24. Number bitwise operations preserve a value's fractional part.

**Answer:** False.

**Explanation:** Number operands are converted to 32-bit integer values for bitwise operations. Fractional parts do not participate.

### 25. **>>** and **>>>** always produce the same result.

**Answer:** False.

**Explanation:** **>>** copies the sign bit. **>>>** fills with zeroes and interprets the result as unsigned. They differ especially for negative inputs.

### 26. A Number shift by 32 has the same effective count as a shift by zero.

**Answer:** True.

**Explanation:** Number shift counts use only their low five bits, which makes the effective count a value from 0 through 31.

### 27. BigInt and Number can be mixed freely with bitwise operators.

**Answer:** False.

**Explanation:** Mixed Number and BigInt bitwise operands throw a **TypeError**. Convert deliberately if that is appropriate for the data.

### 28. BigInt supports the unsigned right shift operator.

**Answer:** False.

**Explanation:** **>>>** is not defined for BigInt because BigInt does not have a fixed 32-bit width.

### 29. Bitwise OR **|** short-circuits like logical OR **||**.

**Answer:** False.

**Explanation:** Bitwise OR evaluates both operands and combines their integer bits. Logical OR uses truthiness and can skip evaluation of its right operand.

## Short-answer questions

### 30. What is a bit mask?

**Answer:** A bit mask is an integer pattern used to select particular bits in another value.

**Explanation:** AND with a mask can inspect selected bits. OR can set them, AND with the inverted mask can clear them, and XOR can toggle them.

### 31. How can you test whether a flag is set?

**Answer:**

~~~js
const isSet = (flags & mask) !== 0;
~~~

**Explanation:** If any bit selected by **mask** is set in **flags**, the AND result is nonzero.

### 32. How can you set, clear, and toggle a flag?

**Answer:**

~~~js
flags |= mask;
flags &= ~mask;
flags ^= mask;
~~~

**Explanation:** OR sets selected bits, AND with the inverted mask clears them, and XOR flips them.

### 33. What is sign extension?

**Answer:** Sign extension copies a signed value's leftmost sign bit into new positions created by a right shift.

**Explanation:** This is how **>>** preserves the sign of a negative 32-bit value as it shifts right.

### 34. What is the difference between **&** and **&&**?

**Answer:** **&** combines integer bits. **&&** evaluates truthiness and short-circuits.

**Explanation:** Use **&&** for conditions. Use **&** only when bit-level logic is intended.

### 35. Why should **value | 0** not be used as general input validation?

**Answer:** It changes the value using 32-bit conversion rules and does not prove that the input was valid.

**Explanation:** Fractions can be discarded, large values can wrap, and special values can become zero. Validate the input's type and range explicitly.

### 36. When should BigInt be preferred for bitwise work?

**Answer:** Use BigInt when the integer bit pattern must extend beyond Number's 32-bit bitwise representation.

**Explanation:** BigInt operations avoid Number's 32-bit truncation, but all operands and shift counts must be BigInts.

## Coding and reasoning questions

### 37. Write code that checks whether a number is odd using its lowest bit.

**Answer:**

~~~js
function isOdd(value) {
    return (value & 1) !== 0;
}
~~~

**Explanation:** The lowest binary bit is 1 for odd integers and 0 for even integers. This works with the intended 32-bit integer semantics.

### 38. Define read, write, and delete flags, then combine read and delete.

**Answer:**

~~~js
const READ = 1 << 0;
const WRITE = 1 << 1;
const DELETE = 1 << 2;

const permissions = READ | DELETE;
~~~

**Explanation:** Each flag uses a different bit. OR combines the selected flags into one integer.

### 39. Write a function that checks a permission flag.

**Answer:**

~~~js
function hasPermission(permissions, permission) {
    return (permissions & permission) !== 0;
}
~~~

**Explanation:** The mask isolates the requested permission bit. A nonzero result means the permission is present.

### 40. Clear only the write flag from a permission value.

**Answer:**

~~~js
permissions &= ~WRITE;
~~~

**Explanation:** NOT flips the bits in the mask. AND then preserves all other permission bits and clears the write bit.

### 41. Convert an intended 32-bit pattern to an unsigned Number.

**Answer:**

~~~js
const unsignedValue = value >>> 0;
~~~

**Explanation:** This interprets the converted 32-bit pattern as unsigned. It wraps the input into the unsigned 32-bit range and should only be used when that behavior is intended.

### 42. Rewrite this test so it clearly returns a Boolean: **flags & mask === mask**.

**Answer:**

~~~js
const hasAllBits = (flags & mask) === mask;
~~~

**Explanation:** Parentheses make the bitwise AND happen before the comparison. This verifies that every bit selected by **mask** is present.

### 43. Write a BigInt expression that combines flags 1 and 4, then tests flag 4.

**Answer:**

~~~js
const flags = 1n | 4n;
const hasFlagFour = (flags & 4n) !== 0n;
~~~

**Explanation:** Every numeric operand in the bitwise expressions is a BigInt, including the zero used for comparison.

### 44. Why does **1n << 2** throw?

**Answer:** The operands have different numeric types. The value is a BigInt, but the shift count is a Number.

**Explanation:** Write **1n << 2n** so the value and shift count are both BigInts.

### 45. Choose between bitwise flags and named Boolean properties for ordinary settings.

**Answer:** Named Boolean properties are usually clearer for ordinary application settings.

**Explanation:** Bit flags are useful when compact integer storage or an external bit-level format requires them. Named properties make everyday code easier to understand and maintain.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [28 - Optional chaining and nullish coalescing](../lessons/028-optional-chaining-and-nullish-coalescing.md) | [Open lesson](../lessons/029-bitwise-operators-and-integer-operations.md) | [Open example](../examples/029-bitwise-operators-and-integer-operations.md) | [30 - Conditional statements](../lessons/030-conditional-statements.md) |

