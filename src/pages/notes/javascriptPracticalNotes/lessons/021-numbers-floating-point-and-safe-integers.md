# 21 - Numbers, floating point, and safe integers

JavaScript's **Number** type represents ordinary integers and decimal values using the IEEE 754 binary64 floating-point format. This format covers a very wide range of values, but it cannot represent every decimal fraction or every large integer exactly.

Understanding this helps explain results such as **0.1 + 0.2**, why large integer values can become indistinguishable, and when to use **Number.isSafeInteger()** or **BigInt**.

## The Number type

JavaScript has one main numeric type called **Number**. It includes:

- Finite integers and fractional values, such as **42**, **-8**, and **3.14**.
- Positive zero and negative zero, written **+0** and **-0**.
- **Infinity** and **-Infinity**.
- **NaN**, meaning that a numeric result is not a valid Number.

~~~js
console.log(typeof 42);        // "number"
console.log(typeof 3.14);      // "number"
console.log(typeof Infinity);  // "number"
console.log(typeof NaN);       // "number"
~~~

The name **NaN** can be misleading: its type is still **number**. Use **Number.isNaN(value)** to check for it.

JavaScript's Number values follow IEEE 754 binary64 behavior. This gives them a large range, approximately from **-1.8 × 10^308** to **1.8 × 10^308**, but only a finite amount of precision.

## Why decimal arithmetic can be surprising

Binary floating-point stores values in base 2. Some fractions that have a finite decimal representation do not have a finite binary representation. The nearest representable Number is used instead.

~~~js
console.log(0.1 + 0.2);       // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
~~~

The values **0.1**, **0.2**, and **0.3** are approximations in binary64. The addition operates on those stored values, so its exact result is not the same stored Number as the separately written **0.3**.

Some fractions, such as **0.5** and **0.25**, are exact in binary because their denominators are powers of two. This is why different-looking decimal calculations can behave differently.

### Avoid exact equality for calculated fractions

For values resulting from floating-point calculations, exact equality is often not the right question:

~~~js
const total = 0.1 + 0.2;

console.log(total === 0.3); // false
~~~

If the application allows a small error, compare the difference with a tolerance that fits the scale and meaning of the values:

~~~js
function nearlyEqual(left, right, tolerance = 1e-10) {
    return Math.abs(left - right) <= tolerance;
}

console.log(nearlyEqual(0.1 + 0.2, 0.3)); // true
~~~

The tolerance above is an example, not a universal constant. Choose a tolerance appropriate to the units and magnitude. A single absolute tolerance can be too strict for large values or too loose for very small ones. **Number.EPSILON** is the gap between **1** and the next larger representable Number, not a universal error allowance.

## Integers and precision

Binary64 can represent integers exactly across a useful range. The largest safe integer is **2^53 - 1**, or **9007199254740991**. The smallest safe integer is its negative.

~~~js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

console.log(Number.isSafeInteger(42)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
~~~

A safe integer is an integer that can be distinguished from every other integer represented in that safe range. Outside the safe range, distinct mathematical integers can map to the same Number value.

~~~js
const roundedLargeInteger = 9007199254740993;

console.log(roundedLargeInteger); // 9007199254740992
console.log(9007199254740992 === 9007199254740993); // true
~~~

The second literal is rounded when it is converted to a Number. The comparison is therefore between two values that have already become the same Number.

### Integer, safe integer, and finite are different checks

These methods answer different questions:

| Check | What it asks |
| --- | --- |
| **Number.isFinite(value)** | Is this a finite Number, not **NaN** or either Infinity? |
| **Number.isInteger(value)** | Is this Number mathematically integral? |
| **Number.isSafeInteger(value)** | Is this an integral Number within the range where integer values remain distinguishable? |

~~~js
console.log(Number.isFinite(10)); // true
console.log(Number.isFinite(Infinity)); // false

console.log(Number.isInteger(10)); // true
console.log(Number.isInteger(10.5)); // false

console.log(Number.isInteger(9007199254740992)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false
~~~

A Number can be finite and integral but not safe. Use **Number.isSafeInteger()** when exact integer identity matters, such as validating a sequence number or an integer parsed from external input.

The **Number.is...** checks do not coerce their arguments:

~~~js
console.log(Number.isFinite("10")); // false
console.log(Number.isInteger("10")); // false
console.log(Number.isSafeInteger("10")); // false
~~~

Convert input intentionally, then validate the converted value.

## Large integers and BigInt

If integer values must remain exact beyond the safe Number range, use **BigInt**. BigInt is a separate numeric type for integers of arbitrary size.

~~~js
const exactValue = 9007199254740993n;

console.log(exactValue); // 9007199254740993n
console.log(typeof exactValue); // "bigint"
~~~

Do not append **n** to a decimal fraction. BigInt represents integers only. Number and BigInt also cannot be mixed directly in arithmetic:

~~~js
// 1n + 1; // TypeError
console.log(1n + 1n); // 2n
~~~

The next chapter covers BigInt in more detail. Use it when exact integer arithmetic is required and its different operators and interoperability rules fit the application.

## Range, overflow, and underflow

The Number format has finite limits:

~~~js
console.log(Number.MAX_VALUE); // approximately 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // approximately 5e-324

console.log(Number.MAX_VALUE * 2); // Infinity
console.log(Number.MIN_VALUE / 2); // 0
~~~

**Number.MAX_VALUE** is the largest finite positive Number. **Number.MIN_VALUE** is the smallest positive Number greater than zero. It is not the most negative Number.

A calculation can overflow to **Infinity** or underflow toward zero. Check results with **Number.isFinite()** when the application cannot accept infinities:

~~~js
const result = Number.MAX_VALUE * 2;

if (!Number.isFinite(result)) {
    console.log("The result is outside the finite Number range");
}
~~~

Division can also produce special values:

~~~js
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log(0 / 0); // NaN
~~~

These expressions do not throw just because the result is infinite or **NaN**. Validate values when later logic requires ordinary finite numbers.

## Positive zero and negative zero

JavaScript has both **+0** and **-0**. Strict equality treats them as equal, but some operations can distinguish them:

~~~js
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
console.log(1 / +0); // Infinity
console.log(1 / -0); // -Infinity
~~~

Most application code does not need to distinguish the two. If it does, **Object.is()** or a reciprocal check can reveal the sign.

## Rounding and display

Use the **Math** methods when the application needs a specific integer rounding rule:

- **Math.floor(value)** rounds toward negative infinity.
- **Math.ceil(value)** rounds toward positive infinity.
- **Math.trunc(value)** removes the fractional part, moving toward zero.
- **Math.round(value)** rounds to the nearest integer, with halfway cases toward positive infinity.

~~~js
console.log(Math.floor(3.8)); // 3
console.log(Math.ceil(3.2));  // 4
console.log(Math.trunc(-3.8)); // -3
console.log(Math.round(3.5));  // 4
console.log(Math.round(-3.5)); // -3
~~~

Do not assume **Math.trunc()** and **Math.floor()** are the same for negative values. For example, **Math.trunc(-3.8)** is **-3**, while **Math.floor(-3.8)** is **-4**.

For display, **toFixed(digits)** returns a string with a fixed number of digits after the decimal point:

~~~js
const price = 3.5;

console.log(price.toFixed(2)); // "3.50"
console.log(typeof price.toFixed(2)); // "string"
~~~

Formatting a value for display does not change the original Number:

~~~js
const amount = 3.456;
const formattedAmount = amount.toFixed(2);

console.log(amount); // 3.456
console.log(formattedAmount); // "3.46"
~~~

Avoid using formatted strings as a substitute for a deliberate numeric rounding or storage strategy. For calculations involving decimal quantities where exact decimal arithmetic matters, choose a representation designed for that requirement. For bounded whole-unit amounts, storing integer subunits can be a practical strategy, provided the values stay within the safe integer range.

## Practical validation pattern

When a function requires a finite Number within a domain, validate each requirement explicitly:

~~~js
function isValidPercentage(value) {
    return typeof value === "number"
        && Number.isFinite(value)
        && value >= 0
        && value <= 100;
}

console.log(isValidPercentage(85)); // true
console.log(isValidPercentage(NaN)); // false
console.log(isValidPercentage(Infinity)); // false
console.log(isValidPercentage("85")); // false
~~~

If the value should also be an integer, add **Number.isInteger(value)**. If it must be an exact safe integer, use **Number.isSafeInteger(value)** instead.

## Common mistakes

- Expecting decimal fractions to have exact binary representations.
- Comparing the exact results of separate floating-point calculations with **===**.
- Treating **Number.EPSILON** as a tolerance that works for every value scale.
- Assuming every integer-looking Number is a safe integer.
- Using **Number.isInteger()** when exact integer identity is required.
- Assuming **Number.isFinite()** converts a numeric string.
- Believing **Number.MIN_VALUE** means the most negative Number.
- Confusing **Math.floor()** with **Math.trunc()** for negative values.
- Assuming **toFixed()** changes the Number or returns another Number.
- Mixing BigInt and Number in arithmetic without an explicit conversion.

## Try it yourself

1. Calculate **0.1 + 0.2** and compare it with **0.3**. Explain why exact equality is false.
2. Check **Number.isInteger()** and **Number.isSafeInteger()** for **9007199254740992**.
3. Compare **9007199254740992** and **9007199254740993** with **===**.
4. Test **Number.isFinite()**, **Number.isInteger()**, and **Number.isSafeInteger()** with a string, **NaN**, **Infinity**, and a fraction.
5. Compare **Math.floor(-2.7)**, **Math.ceil(-2.7)**, and **Math.trunc(-2.7)**.
6. Call **toFixed(2)** on **3.5** and inspect both the displayed result and its type.
7. Try **Number.MAX_VALUE * 2** and **Number.MIN_VALUE / 2**.
8. Rewrite a comparison of two calculated fractional values using a tolerance suitable for the domain.
9. Decide whether an integer value larger than **Number.MAX_SAFE_INTEGER** should use Number or BigInt.
10. Write a percentage validator that accepts only finite Numbers from zero to one hundred inclusive.

## Key points

- JavaScript Number uses IEEE 754 binary64 floating-point values.
- Some decimal fractions are approximations, so calculations can have small rounding differences.
- Use a domain-appropriate tolerance for approximate comparisons.
- Safe integers range from **Number.MIN_SAFE_INTEGER** through **Number.MAX_SAFE_INTEGER**.
- **Number.isInteger()** does not mean that the integer is safe.
- Use **BigInt** when exact integer values exceed Number's safe range.
- **Number.isFinite()** rejects **NaN** and infinities without coercion.
- Formatting with **toFixed()** produces a string and does not change the Number.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [20 - Equality, comparison, and relational operators](020-equality-comparison-and-relational-operators.md) | [Open Q&A](../qnas/021-numbers-floating-point-and-safe-integers.md) | [Open example](../examples/021-numbers-floating-point-and-safe-integers.md) | [22 - BigInt](022-bigint.md) |