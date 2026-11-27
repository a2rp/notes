# 75 - Math, Number, and numeric utilities

JavaScript uses the **Number** type for ordinary numeric values. It can represent integers and fractions, but its binary floating-point format cannot exactly represent every decimal fraction or every large integer. The **Math** object provides common calculations, while **Number** provides constants, checks, and conversions.

Use these tools with an understanding of their limits. For money, identifiers, measurements, and random values, choose representations and checks that fit the problem.

## Learning goals

- Understand how JavaScript represents Number values.
- Check finite values, integers, and safe integers.
- Convert and parse numeric strings deliberately.
- Round, truncate, compare, and format numbers.
- Use common Math methods and understand their domains.
- Avoid floating-point mistakes in decimal arithmetic.
- Know when BigInt or a domain-specific numeric representation is appropriate.
- Avoid using Math.random() for security-sensitive values.

## The Number type

JavaScript's Number type uses the IEEE 754 binary64 format. It represents a wide range of magnitudes, but only a finite number of binary fractions can be stored exactly.

~~~js
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
~~~

~~~text
0.30000000000000004
false
~~~

This is expected floating-point behavior. A decimal value such as 0.1 has no exact finite binary fraction representation, so arithmetic can produce a nearby value.

### Special Number values

Number values include:

- **NaN**, which indicates an invalid numeric result.
- **Infinity** and **-Infinity**, which can result from overflow or division by zero.
- Positive zero and negative zero.
- Finite integers and fractions.

~~~js
console.log(Number.isNaN(0 / 0));
console.log(1 / 0);
console.log(1 / -0);
console.log(-0 === 0);
console.log(Object.is(-0, 0));
~~~

~~~text
true
Infinity
-Infinity
true
false
~~~

Use **Number.isNaN(value)** to check for NaN. NaN is not equal to itself, so a comparison such as **value === NaN** never works. **Number.isFinite(value)** checks for a finite Number and returns false for non-number values without coercing them.

~~~js
Number.isFinite(12);
Number.isFinite(Infinity);
Number.isFinite('12');
Number.isNaN(NaN);
Number.isNaN('not a number');
~~~

~~~text
true
false
false
true
false
~~~

The global **isFinite()** and **isNaN()** functions coerce inputs first. Prefer the Number methods when the input must already be a Number.

## Integer precision and constants

Numbers can exactly represent every integer from **Number.MIN_SAFE_INTEGER** through **Number.MAX_SAFE_INTEGER**, inclusive. Outside that range, distinct integers may map to the same Number value.

~~~js
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
~~~

~~~text
9007199254740991
true
false
~~~

Common Number constants:

| Constant | Meaning |
| --- | --- |
| Number.MAX_SAFE_INTEGER | Largest integer that is always represented exactly and distinctly. |
| Number.MIN_SAFE_INTEGER | Smallest safe integer. |
| Number.MAX_VALUE | Largest finite positive Number. |
| Number.MIN_VALUE | Smallest positive Number greater than zero, not the most negative Number. |
| Number.EPSILON | Gap between 1 and the next larger representable Number. |
| Number.NaN | The NaN value. |
| Number.POSITIVE_INFINITY | Positive infinity. |
| Number.NEGATIVE_INFINITY | Negative infinity. |

Use **Number.isSafeInteger(value)** for integer identifiers or counts that must remain exact as Number values. For larger exact integers, use **BigInt** or preserve the digits as a string. Do not convert a large BigInt to Number if precision must be retained.

Number.EPSILON is approximately 2.22e-16. It describes the spacing near 1, not a universal tolerance for every magnitude or domain.

## Converting and parsing numeric text

**Number(value)** converts a value using JavaScript's numeric conversion rules. This can be useful, but validation should happen first when the input comes from a person or another system.

~~~js
console.log(Number('42'));
console.log(Number(''));
console.log(Number('12px'));
~~~

~~~text
42
0
NaN
~~~

An empty string becomes zero. If an empty form field should be invalid, check for empty input before converting it.

**parseInt(text, radix)** parses an integer from the start of a string. Always provide the radix, normally 10 for decimal input. **parseFloat(text)** parses a leading decimal number. Both can accept a numeric prefix and ignore trailing non-numeric characters.

~~~js
console.log(parseInt('18.7', 10));
console.log(parseFloat('18.7 minutes'));
console.log(Number('18.7 minutes'));
~~~

~~~text
18
18.7
NaN
~~~

Use **Number()** when the entire input must be a valid numeric string. Use parseInt or parseFloat when parsing a numeric prefix is intentional. Validate the expected grammar before accepting user input.

The **Number.parseInt()** and **Number.parseFloat()** methods provide the same behavior as their global counterparts. Avoid **new Number(value)** in ordinary code because it creates an object wrapper rather than a primitive number.

## Rounding and integer conversion

Common Math conversion methods differ, especially for negative values:

| Method | Behavior | Example with -1.8 |
| --- | --- | --- |
| Math.floor(x) | Round toward negative infinity. | -2 |
| Math.ceil(x) | Round toward positive infinity. | -1 |
| Math.trunc(x) | Remove the fractional part toward zero. | -1 |
| Math.round(x) | Round to the nearest integer, with a half-way tie toward positive infinity. | -2 |

~~~js
console.log(Math.floor(-1.8));
console.log(Math.ceil(-1.8));
console.log(Math.trunc(-1.8));
console.log(Math.round(-1.5));
~~~

~~~text
-2
-1
-1
-1
~~~

Math.round() is not the same as Math.floor(x + 0.5) for every input. It can also preserve negative zero for values between negative one half and zero.

To round to a fixed number of decimal places for display, **toFixed(digits)** returns a string:

~~~js
const amount = 12.345;
console.log(amount.toFixed(2));
console.log(typeof amount.toFixed(2));
~~~

~~~text
12.35
string
~~~

toFixed() formats the stored binary value. It is not a general decimal arithmetic system, and familiar decimal half-way values can produce surprising results. Do not use formatted strings as the internal representation for arithmetic.

## Common Math utilities

Math methods are static methods on the **Math** object. Math is not a constructor, and its methods operate on Number values rather than BigInt.

| Method | Use |
| --- | --- |
| Math.abs(x) | Absolute value. |
| Math.min(...values) and Math.max(...values) | Smallest or largest argument. |
| Math.pow(base, exponent) or base ** exponent | Exponentiation. |
| Math.sqrt(x) | Square root. |
| Math.hypot(...values) | Square root of the sum of squares. |
| Math.floor(x), Math.ceil(x), Math.trunc(x), Math.round(x) | Integer rounding rules. |
| Math.sign(x) | Sign of a value, preserving zero and NaN cases. |
| Math.log(x), Math.log2(x), Math.log10(x) | Natural, base 2, and base 10 logarithms. |
| Math.sin(x), Math.cos(x), Math.tan(x) | Trigonometric functions using radians. |
| Math.random() | Pseudorandom Number from 0 inclusive to 1 exclusive. |

~~~js
console.log(Math.abs(-7));
console.log(Math.min(8, 3, 11));
console.log(Math.max(8, 3, 11));
console.log(Math.sqrt(81));
console.log(Math.hypot(3, 4));
~~~

~~~text
7
3
11
9
5
~~~

Many Math methods return NaN for inputs outside their mathematical domain, such as **Math.sqrt(-1)**. Check inputs and results where invalid values are possible. Trigonometric methods use radians, not degrees.

### Generate an integer in a range

For small non-security uses, this formula generates an integer from min through max, including both endpoints:

~~~js
function randomInteger(min, max) {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) {
    throw new RangeError('Expected safe integer bounds with min <= max');
  }

  const range = max - min + 1;

  if (!Number.isSafeInteger(range)) {
    throw new RangeError('Expected a range within the safe integer limit');
  }

  return Math.floor(Math.random() * range) + min;
}
~~~

Math.random() is pseudorandom and is not suitable for passwords, tokens, security codes, or cryptographic keys. Use a cryptographically secure random API provided by the target runtime for those tasks.

## Comparing approximate values

Avoid exact equality checks for results of decimal floating-point calculations when a small rounding difference is acceptable. Compare the absolute difference against a tolerance that fits the scale and meaning of the data.

~~~js
function nearlyEqual(a, b, tolerance = 1e-10) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return a === b;
  }

  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= tolerance * scale;
}

console.log(nearlyEqual(0.1 + 0.2, 0.3));
~~~

~~~text
true
~~~

A fixed tolerance is not appropriate for every problem. Choose a tolerance based on the unit, magnitude, and required accuracy. Number.EPSILON alone should not be used as a universal threshold.

## Decimal money and fixed precision

For monetary amounts with a fixed number of decimal places, common approaches include:

- Store minor units as safe integer counts, such as cents or paisa.
- Validate decimal text and convert it into minor units without first doing imprecise arithmetic.
- Use a decimal arithmetic library when calculations require more precision or complex rounding rules.
- Keep currency and rounding rules explicit.

Do not repeatedly add binary floating-point currency values and assume every decimal fraction is exact. The example chapter uses validated input strings and integer cents.

## Formatting for people

Keep values numeric while calculating. Format only when presenting them. **Intl.NumberFormat** can format numbers by locale, currency, or percentage. Its detailed use is covered in the later internationalization lesson.

~~~js
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

console.log(formatter.format(1234.5));
~~~

~~~text
$1,234.50
~~~

A formatted value is text. Do not parse presentation strings back into numbers for calculations because separators and currency symbols vary by locale.

## BigInt and Number are different numeric types

BigInt represents integers with arbitrary precision within available memory. Number handles fractions and a large exponent range. Arithmetic operators generally do not mix them.

~~~js
const exactCount = 9007199254740993n;
const approximateCount = 9007199254740992;

console.log(exactCount + 1n);
console.log(Number.isSafeInteger(approximateCount));
~~~

~~~text
9007199254740994n
false
~~~

Use BigInt for exact integer arithmetic beyond the safe Number range. Do not use it for fractional values. Convert between Number and BigInt only after deciding how precision and range should be handled.

## Common mistakes

- Assuming 0.1 + 0.2 is exactly 0.3.
- Using a Number for an identifier larger than the safe integer range.
- Checking NaN with equality or using a coercing global check unintentionally.
- Treating Number.MIN_VALUE as the most negative Number.
- Forgetting that Number('') returns zero.
- Forgetting the radix in parseInt().
- Assuming parseInt() or parseFloat() validates an entire string.
- Treating Math.round() as symmetric around zero.
- Using toFixed() as the internal decimal arithmetic representation.
- Comparing approximate results with === when a tolerance is intended.
- Using Number.EPSILON as a universal tolerance.
- Using Math.random() for security-sensitive values.
- Mixing BigInt and Number arithmetic without an explicit conversion.

## Practice

1. Print 0.1 + 0.2 and explain why strict comparison with 0.3 is false.
2. Check whether NaN, Infinity, a numeric string, and a finite Number pass Number.isFinite().
3. Compare Number(''), Number('12px'), parseInt('12px', 10), and parseFloat('12.5px').
4. Check Number.isSafeInteger() at both safe integer boundaries and just outside them.
5. Print Math.floor(), Math.ceil(), Math.trunc(), and Math.round() for positive and negative fractions.
6. Write a range check that rejects non-finite values before applying Math.min() or Math.max().
7. Store a price as integer minor units and calculate a total without accumulating fractional currency values.
8. Use Intl.NumberFormat to display a number, but keep the original value numeric for calculations.
9. Explain why Math.random() should not generate a password reset token.
10. Compare a Number result with a scale-appropriate tolerance.

## Key points

- Number is binary floating point, so some decimal fractions and large integers are approximate.
- Use Number.isFinite(), Number.isInteger(), and Number.isSafeInteger() for distinct checks.
- Number(), parseInt(), and parseFloat() accept different input forms.
- Math.floor(), Math.ceil(), Math.trunc(), and Math.round() have different rules.
- Keep numeric values numeric while calculating, and format only for display.
- Use minor integer units or decimal arithmetic for monetary calculations.
- Math.random() is not cryptographically secure.
- Use BigInt for exact large integer operations and do not mix it implicitly with Number.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [74 - JSON parsing, serialization, and data limits](074-json-parsing-serialization-and-data-limits.md) | [Open Q&A](../qnas/075-math-number-and-numeric-utilities.md) | [Open example](../examples/075-math-number-and-numeric-utilities.md) | [76 - Dates, time zones, and Temporal](076-dates-time-zones-and-temporal.md) |


