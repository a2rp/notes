# 75 - Math, Number, and numeric utilities Q&A

Use these questions to review JavaScript numbers, floating-point precision, conversion, rounding, Math methods, and safe numeric practices. Each answer follows its question.

## Number values and precision

### 1. What numeric type does JavaScript use for ordinary integers and fractions?

**Answer:** The Number type.

**Explanation:** JavaScript Number uses binary floating-point representation for both integers and fractions. BigInt is a separate type for arbitrary-precision integers.

### 2. Why can 0.1 + 0.2 produce 0.30000000000000004?

**Answer:** Some decimal fractions cannot be represented exactly in binary floating point.

**Explanation:** The stored operands are nearby representable values, so the computed result can also be slightly different from the exact decimal result.

### 3. How should code check whether a value is NaN?

**Answer:** Use Number.isNaN(value).

**Explanation:** NaN is not equal to itself, so value === NaN does not work. Number.isNaN also avoids coercing non-number values.

### 4. What does Number.isFinite('12') return?

**Answer:** false.

**Explanation:** Number.isFinite() checks whether the input is a finite Number and does not convert a string first.

### 5. Which value is a safe integer?

A. 12  
B. 12.5  
C. Infinity  
D. NaN

**Answer:** A, 12.

**Explanation:** A safe integer is an integer Number that is exactly represented and distinct from every other integer in the safe range.

### 6. What is Number.MAX_SAFE_INTEGER?

**Answer:** 9007199254740991, or 2 to the power 53 minus 1.

**Explanation:** Integers within the inclusive safe integer bounds can be represented exactly and distinguished from neighboring integers.

### 7. What does Number.MIN_VALUE mean?

**Answer:** It is the smallest positive Number greater than zero.

**Explanation:** It is not the most negative Number. Number.MIN_SAFE_INTEGER is a different constant and describes the smallest safe integer.

### 8. How do -0 and 0 compare?

**Answer:** They compare equal with ===, but Object.is(-0, 0) is false.

**Explanation:** Negative zero is observable in some operations, such as 1 / -0, which evaluates to negative infinity.

### 9. Which check verifies that a Number is an exact safe integer?

**Answer:** Number.isSafeInteger(value).

**Explanation:** Number.isInteger(value) only checks whether the Number has no fractional part. A large imprecise Number can still pass Number.isInteger().

### 10. What is Number.EPSILON?

**Answer:** The difference between 1 and the next larger representable Number.

**Explanation:** It describes spacing near 1. It is not a universal tolerance for comparing values of every magnitude.

## Conversion and parsing

### 11. What does Number('') return?

**Answer:** 0.

**Explanation:** An empty string converts to zero. Check for empty input before conversion if the empty value should be rejected.

### 12. What is the result of parseInt('18.7', 10)?

**Answer:** 18.

**Explanation:** parseInt reads the integer prefix and stops at the decimal point. It does not validate that the entire string is an integer.

### 13. What is the result of Number('18.7 minutes')?

**Answer:** NaN.

**Explanation:** Number() requires the whole non-whitespace string to follow a numeric representation. parseFloat() would accept the leading numeric portion.

### 14. Why should parseInt() usually receive a radix?

**Answer:** The radix makes the intended number base explicit.

**Explanation:** Use 10 for ordinary decimal text. Use a different radix only when the input format specifies another base.

### 15. What is the difference between Number.parseFloat() and the global parseFloat()?

**Answer:** They provide the same parsing behavior.

**Explanation:** Number.parseFloat() is the method form of the global function. Both parse a leading floating-point portion.

### 16. What is the difference between Number(value) and new Number(value)?

**Answer:** Number(value) returns a primitive Number, while new Number(value) creates a Number wrapper object.

**Explanation:** Wrapper objects have object identity and can behave unexpectedly in comparisons. Use primitive numbers for ordinary calculations.

## Rounding and formatting

### 17. What does Math.trunc(-2.7) return?

**Answer:** -2.

**Explanation:** Math.trunc() removes the fractional part toward zero. It does not round toward negative infinity.

### 18. What does Math.floor(-2.7) return?

**Answer:** -3.

**Explanation:** Math.floor() returns the greatest integer less than or equal to its input, which moves a negative fraction farther from zero.

### 19. How does Math.round() handle an exact half-way value?

**Answer:** It rounds toward positive infinity.

**Explanation:** For example, Math.round(2.5) returns 3, while Math.round(-2.5) returns -2.

### 20. What does (12.345).toFixed(2) return in type and form?

**Answer:** It returns a string with two digits after the decimal point, commonly '12.35'.

**Explanation:** toFixed() is a formatting method, not a decimal arithmetic type. Its result is text.

### 21. Why should formatted numeric text not be used for further arithmetic?

**Answer:** It may contain rounding, separators, or symbols, and it is a string rather than a numeric value.

**Explanation:** Keep the calculation value numeric and format it only when presenting it to a person.

### 22. Which method rounds a value toward positive infinity?

A. Math.floor()  
B. Math.ceil()  
C. Math.trunc()  
D. Math.abs()

**Answer:** B, Math.ceil().

**Explanation:** Math.ceil() returns the smallest integer greater than or equal to its input.

### 23. How should approximate decimal results usually be compared?

**Answer:** Compare their difference against a tolerance chosen for the magnitude and units of the problem.

**Explanation:** Floating-point rounding means strict equality can fail for mathematically equivalent decimal calculations. A tolerance should match the domain's accuracy needs.

## Math methods and random values

### 24. Is Math a constructor?

**Answer:** No. Math is a namespace object with static methods and constants.

**Explanation:** Call methods such as Math.sqrt() and Math.max() directly. Do not construct a Math instance.

### 25. What does Math.hypot(3, 4) return?

**Answer:** 5.

**Explanation:** Math.hypot() returns the square root of the sum of the squares of its arguments.

### 26. What does Math.sqrt(-1) return?

**Answer:** NaN.

**Explanation:** The square root of a negative real number is outside the real-number domain handled by Math.sqrt().

### 27. What unit do Math.sin(), Math.cos(), and Math.tan() expect?

**Answer:** Radians.

**Explanation:** Convert degrees to radians before calling a trigonometric method when the input is in degrees.

### 28. What range does Math.random() return?

**Answer:** A pseudorandom Number greater than or equal to 0 and less than 1.

**Explanation:** The value 0 is possible, while 1 is excluded.

### 29. Is Math.random() appropriate for a password reset token?

**Answer:** No.

**Explanation:** Math.random() is not cryptographically secure. Use a secure random API provided by the runtime for security-sensitive values.

### 30. What can go wrong in an inclusive random integer helper if it only checks that min and max are safe integers?

**Answer:** The width of the range can exceed the safe integer range.

**Explanation:** Validate the computed range width too. A range that spans too many values cannot be handled exactly by the basic Math.random() formula.

### 31. How can code find the largest value among several numbers?

**Answer:** Use Math.max(...values).

**Explanation:** The spread syntax passes array items as separate arguments. Validate inputs when non-finite or non-number values are not acceptable.

### 32. What does Math.sign(-0) return?

**Answer:** Negative zero.

**Explanation:** Math.sign() returns the sign indicator for a value and preserves zero and NaN cases rather than always returning only -1, 0, or 1.

## Choosing a numeric representation

### 33. Why can converting a large BigInt to Number be dangerous?

**Answer:** The conversion can lose integer precision.

**Explanation:** Number cannot distinguish every integer outside its safe range. Keep the value as BigInt or a string if exact digits matter.

### 34. Can BigInt and Number be added directly?

**Answer:** No. JavaScript throws a TypeError for mixed BigInt and Number arithmetic.

**Explanation:** Convert explicitly only after deciding how range and precision should be handled.

### 35. Why are integer minor units often used for simple money calculations?

**Answer:** They avoid repeatedly accumulating binary floating-point decimal fractions.

**Explanation:** Store amounts such as cents or paisa as integer counts, validate the range, and apply explicit rounding rules.

### 36. When is a decimal arithmetic library useful?

**Answer:** When calculations require decimal precision, complex rounding rules, or values that cannot be safely handled by integer minor units.

**Explanation:** Financial rules can be domain-specific. Choose a representation that matches the required precision and rounding policy.

### 37. What is the safest moment to use Intl.NumberFormat?

**Answer:** At the presentation boundary, after calculations are complete.

**Explanation:** Intl.NumberFormat returns locale-specific text. Keep the underlying value numeric for calculations.

### 38. Why is Number.MIN_VALUE not suitable for checking the smallest allowed integer?

**Answer:** It is the smallest positive nonzero floating-point Number, not an integer boundary.

**Explanation:** Use Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER for safe integer bounds.

## Apply the rules

### 39. Write a check that accepts only finite non-negative Number values.

**Answer:**

~~~js
function isNonNegativeFiniteNumber(value) {
  return typeof value === 'number'
    && Number.isFinite(value)
    && value >= 0;
}
~~~

**Explanation:** The type check rejects strings. Number.isFinite() rejects NaN and infinities, and the final comparison rejects negative values.

### 40. What does this code print?

~~~js
console.log(
  Math.floor(-2.2),
  Math.trunc(-2.2),
  Math.round(-2.5)
);
~~~

**Answer:** -3 -2 -2

**Explanation:** floor moves toward negative infinity, trunc moves toward zero, and round sends a half-way tie toward positive infinity.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [74 - JSON parsing, serialization, and data limits](../lessons/074-json-parsing-serialization-and-data-limits.md) | [Lesson](../lessons/075-math-number-and-numeric-utilities.md) · [Example](../examples/075-math-number-and-numeric-utilities.md) | [76 - Dates, time zones, and Temporal](../lessons/076-dates-time-zones-and-temporal.md) |

