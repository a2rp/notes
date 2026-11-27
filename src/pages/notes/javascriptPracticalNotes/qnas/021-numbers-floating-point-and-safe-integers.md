# 21 - Numbers, floating point, and safe integers

This Q&A reviews JavaScript's Number type, binary floating-point behavior, safe integer limits, special values, validation methods, rounding, and BigInt. Each answer follows its question immediately.

## Multiple-choice questions

### 1. What does **typeof NaN** return?

A. **"NaN"**  
B. **"undefined"**  
C. **"number"**  
D. **"object"**

**Answer: C. "number".**

**NaN** is a special Number value. Its name means "not a number", but its JavaScript type is still **number**.

### 2. What is the usual result of **0.1 + 0.2**?

A. **0.3** exactly  
B. **0.30000000000000004**  
C. **0.12**  
D. **NaN**

**Answer: B. 0.30000000000000004.**

The decimal fractions are approximated in binary floating point. The operation uses those stored approximations.

### 3. Why does **0.1 + 0.2 === 0.3** return false?

A. The plus operator concatenates these numbers.  
B. The operation throws away the decimal part.  
C. The calculated Number and the literal **0.3** are not the same binary64 value.  
D. Strict equality cannot compare Numbers.

**Answer: C. The calculated Number and the literal 0.3 are not the same binary64 value.**

Some decimal fractions cannot be represented exactly in binary. Exact equality is often unsuitable for results of fractional calculations.

### 4. Which value is exactly representable as a binary fraction?

A. **0.1**  
B. **0.2**  
C. **0.5**  
D. **0.3**

**Answer: C. 0.5.**

One half has a denominator that is a power of two, so it has a finite binary representation. The other listed decimal fractions do not.

### 5. What is **Number.MAX_SAFE_INTEGER**?

A. **9007199254740991**  
B. **9007199254740992**  
C. **Number.MAX_VALUE**  
D. **Infinity**

**Answer: A. 9007199254740991.**

It is **2^53 - 1**, the largest safe integer represented by Number.

### 6. What does **Number.isSafeInteger(9007199254740992)** return?

A. **true**  
B. **false**  
C. **NaN**  
D. It throws a RangeError.

**Answer: B. false.**

The Number is integral, but it is outside the safe integer range. Adjacent mathematical integers are no longer guaranteed to have distinct Number representations.

### 7. What does **Number.isInteger(9007199254740992)** return?

A. **true**  
B. **false**  
C. **NaN**  
D. It throws a TypeError.

**Answer: A. true.**

The represented Number has no fractional part. This does not mean it is a safe integer. **Number.isSafeInteger()** checks both integrality and the safe range.

### 8. What does **Number.isFinite("10")** return?

A. **true**  
B. **false**  
C. **10**  
D. It throws a TypeError.

**Answer: B. false.**

The **Number.is...** methods do not coerce strings to Numbers. Convert and validate input explicitly if that is intended.

### 9. What does **Number.isNaN("NaN")** return?

A. **true**  
B. **false**  
C. **NaN**  
D. It throws a TypeError.

**Answer: B. false.**

The string **"NaN"** is not itself the Number value **NaN**. **Number.isNaN()** does not coerce its argument.

### 10. What does **Number.MIN_VALUE** represent?

A. The most negative finite Number  
B. The smallest positive Number greater than zero  
C. Zero  
D. The smallest safe integer

**Answer: B. The smallest positive Number greater than zero.**

It is approximately **5 × 10^-324**. The most negative finite Number is **-Number.MAX_VALUE**.

### 11. What does **Number.MAX_VALUE * 2** produce?

A. **Number.MAX_VALUE**  
B. **NaN**  
C. **Infinity**  
D. A RangeError

**Answer: C. Infinity.**

The mathematical result exceeds the finite range of Number, so the operation overflows to positive **Infinity**.

### 12. What does **0 / 0** produce?

A. **0**  
B. **Infinity**  
C. **NaN**  
D. A RangeError

**Answer: C. NaN.**

Zero divided by zero is an indeterminate numeric result and evaluates to **NaN** in JavaScript.

### 13. What type does **(3.5).toFixed(2)** return?

A. Number  
B. String  
C. Boolean  
D. BigInt

**Answer: B. String.**

It returns formatted text, in this case **"3.50"**. It does not change the original Number.

### 14. What does **Math.trunc(-3.8)** return?

A. **-4**  
B. **-3**  
C. **3**  
D. **NaN**

**Answer: B. -3.**

**Math.trunc()** removes the fractional part and moves toward zero. **Math.floor(-3.8)** instead returns **-4**.

### 15. What does **Math.round(-1.5)** return?

A. **-2**  
B. **-1**  
C. **1**  
D. **NaN**

**Answer: B. -1.**

For halfway cases, **Math.round()** rounds toward positive infinity. This makes negative halfway cases different from a rule that always rounds away from zero.

### 16. Which statement about **Number.EPSILON** is correct?

A. It is the smallest positive Number.  
B. It is the largest safe integer.  
C. It is the gap between **1** and the next larger representable Number.  
D. It is a universal tolerance for all comparisons.

**Answer: C. It is the gap between 1 and the next larger representable Number.**

It is useful for understanding precision near 1, but it is not a universal tolerance for every scale or domain.

### 17. Which type should represent an exact integer larger than Number's safe integer range?

A. **String**, with arithmetic operators  
B. **BigInt**, when appropriate for the task  
C. **Number**, because all integers are exact  
D. **Boolean**

**Answer: B. BigInt, when appropriate for the task.**

BigInt represents arbitrary-size integers. It has different rules from Number and cannot be mixed directly with Number in arithmetic.

### 18. Which check confirms that a Number is integral and safe?

A. **Number.isInteger(value)**  
B. **Number.isFinite(value)**  
C. **Number.isSafeInteger(value)**  
D. **typeof value === "number"**

**Answer: C. Number.isSafeInteger(value).**

The method checks that the value is an integer in the range where integer values are distinguishable.

### 19. What is **Number.isFinite(Infinity)**?

A. **true**  
B. **false**  
C. **Infinity**  
D. It throws a RangeError.

**Answer: B. false.**

**Number.isFinite()** returns false for positive and negative infinity and for **NaN**.

### 20. What does **1 / -0** produce?

A. **0**  
B. **-Infinity**  
C. **Infinity**  
D. **NaN**

**Answer: B. -Infinity.**

JavaScript distinguishes signed zero in some operations, even though **+0 === -0** is true.

## Predict the result

### 21. What does this code print?

~~~js
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
~~~

**Answer:**

~~~text
0.30000000000000004
false
~~~

The fractional values are approximated in binary64, so the computed result is not exactly the same Number as the literal **0.3**.

### 22. What does this code print?

~~~js
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
~~~

**Answer:**

~~~text
9007199254740991
true
false
~~~

The safe integer range includes **Number.MAX_SAFE_INTEGER**, but not the next integer.

### 23. What does this code print?

~~~js
console.log(9007199254740992 === 9007199254740993);
console.log(9007199254740993);
~~~

**Answer:**

~~~text
true
9007199254740992
~~~

The literal **9007199254740993** is rounded when represented as a Number. It becomes indistinguishable from **9007199254740992**.

### 24. What does this code print?

~~~js
console.log(Number.isInteger(9007199254740992));
console.log(Number.isSafeInteger(9007199254740992));
~~~

**Answer:**

~~~text
true
false
~~~

The value is integral as represented, but it is outside the safe integer range.

### 25. What does this code print?

~~~js
console.log(Number.isFinite("10"));
console.log(isFinite("10"));
~~~

**Answer:**

~~~text
false
true
~~~

**Number.isFinite()** does not coerce. The global **isFinite()** converts its argument first, so the string becomes Number **10**.

### 26. What does this code print?

~~~js
console.log(Number.MIN_VALUE > 0);
console.log(Number.MIN_VALUE / 2);
console.log(Number.MAX_VALUE * 2);
~~~

**Answer:**

~~~text
true
0
Infinity
~~~

**Number.MIN_VALUE** is positive and very close to zero. Dividing it by two underflows to zero. Multiplying the largest finite Number by two overflows to infinity.

### 27. What does this code print?

~~~js
console.log(Math.floor(-3.8));
console.log(Math.trunc(-3.8));
console.log(Math.ceil(-3.8));
~~~

**Answer:**

~~~text
-4
-3
-3
~~~

Floor moves toward negative infinity, truncation moves toward zero, and ceiling moves toward positive infinity.

### 28. What does this code print?

~~~js
const value = 3.5;
const display = value.toFixed(2);

console.log(display);
console.log(typeof display);
console.log(value);
~~~

**Answer:**

~~~text
3.50
string
3.5
~~~

**toFixed()** creates formatted text. It does not mutate the original Number.

### 29. What does this code print?

~~~js
console.log(Math.round(1.5));
console.log(Math.round(-1.5));
~~~

**Answer:**

~~~text
2
-1
~~~

Halfway cases round toward positive infinity.

### 30. What does this code print?

~~~js
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("NaN"));
console.log(Number.isNaN(Number("not a number")));
~~~

**Answer:**

~~~text
true
false
true
~~~

Only the first and third arguments are the Number value **NaN**. The string **"NaN"** is just text.

## True or false

### 31. Every finite decimal fraction has an exact binary64 representation.

**Answer: False.**

Some fractions, such as **0.5**, are exact in binary. Many familiar decimal fractions, including **0.1**, are approximations.

### 32. Every Number that passes **Number.isInteger()** also passes **Number.isSafeInteger()**.

**Answer: False.**

Large values can be integral as represented but outside the safe integer range.

### 33. **Number.EPSILON** should be used as a universal error tolerance for every numeric comparison.

**Answer: False.**

It describes spacing near 1. The tolerance should reflect the scale and meaning of the compared values.

### 34. **Number.isFinite("5")** converts the string to Number before checking it.

**Answer: False.**

It does not coerce. It returns false because the input is a string.

### 35. **toFixed()** changes the value stored in the original variable.

**Answer: False.**

It returns a new string with formatted digits. The original Number remains unchanged.

### 36. **Number.MIN_VALUE** is the largest-magnitude negative Number.

**Answer: False.**

It is the smallest positive Number greater than zero. The most negative finite value is **-Number.MAX_VALUE**.

## Short-answer questions

### 37. Why can two different integer literals compare equal as Numbers?

**Answer:** A Number has finite precision. Beyond the safe integer range, two distinct mathematical integers can round to the same binary64 value.

Use **Number.isSafeInteger()** to validate an integer that must remain distinguishable, or consider BigInt for exact large integers.

### 38. What is the difference between an integer and a safe integer?

**Answer:** An integer has no fractional part as represented by Number. A safe integer is an integer within the range where adjacent integers remain distinguishable.

**Number.isInteger()** checks the first property. **Number.isSafeInteger()** checks both.

### 39. What is the difference between **Number.isFinite()** and global **isFinite()**?

**Answer:** **Number.isFinite()** accepts only finite Number values and does not coerce. Global **isFinite()** converts its argument to Number before checking.

For validation, the non-coercing **Number.isFinite()** is usually clearer.

### 40. Why is comparing calculated decimal values with **===** often unreliable?

**Answer:** The decimal fractions may be stored as nearby binary approximations, and the calculation's rounded result may differ from a separately written decimal literal.

When approximate equality fits the problem, compare the difference with a tolerance chosen for the value's scale and domain.

### 41. Why does **Number.isInteger(9007199254740992)** return true even though this value is unsafe?

**Answer:** That Number has no fractional part, so it is integral as represented. It is unsafe because it is outside the range where each mathematical integer has a distinct Number value.

### 42. When is BigInt useful instead of Number?

**Answer:** Use BigInt when the task requires exact integer values outside Number's safe range.

BigInt only represents integers, and arithmetic with Number requires an explicit conversion or a decision to use one numeric type consistently.

## Coding questions

### 43. Write a function that accepts only a finite Number between zero and one hundred inclusive.

**Answer:**

~~~js
function isValidPercentage(value) {
    return typeof value === "number"
        && Number.isFinite(value)
        && value >= 0
        && value <= 100;
}
~~~

The type and finite checks reject strings, **NaN**, and infinities. The final comparisons enforce the range.

### 44. Write a function that checks whether two values are within a caller-provided absolute tolerance.

**Answer:**

~~~js
function isWithinTolerance(left, right, tolerance) {
    return Number.isFinite(left)
        && Number.isFinite(right)
        && Number.isFinite(tolerance)
        && tolerance >= 0
        && Math.abs(left - right) <= tolerance;
}
~~~

This defines an absolute tolerance. Choose its value based on the units and scale of the problem. A fixed tolerance is not suitable for every domain.

### 45. Write a validator for a safe integer from zero to one million inclusive.

**Answer:**

~~~js
function isValidIdentifier(value) {
    return Number.isSafeInteger(value)
        && value >= 0
        && value <= 1_000_000;
}
~~~

**Number.isSafeInteger()** rejects fractions and unsafe integers. The remaining checks enforce the application-specific range. Numeric separators improve readability and do not change the value.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [20 - Equality, comparison, and relational operators](../lessons/020-equality-comparison-and-relational-operators.md) | [Open lesson](../lessons/021-numbers-floating-point-and-safe-integers.md) | [Open example](../examples/021-numbers-floating-point-and-safe-integers.md) | [22 - BigInt](../lessons/022-bigint.md) |