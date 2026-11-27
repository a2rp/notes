# 22 - BigInt

JavaScript's **BigInt** type represents integers of arbitrary size. It is useful when integer values must remain exact beyond the safe integer range of **Number**, such as large identifiers or counters.

BigInt is a separate type from Number. It supports exact integer arithmetic, but it has different conversion, operator, and serialization rules. Use it when those rules fit the problem.

## BigInt values and literals

Add **n** to an integer literal to create a BigInt:

~~~js
const count = 12n;
const largeId = 9007199254740993n;

console.log(typeof count); // "bigint"
console.log(largeId); // 9007199254740993n
~~~

BigInt literals can also use binary, octal, and hexadecimal notation, and may contain numeric separators:

~~~js
const binary = 0b1010n;
const octal = 0o17n;
const hexadecimal = 0xFFn;
const readableCount = 1_000_000n;

console.log(binary); // 10n
console.log(octal); // 15n
console.log(hexadecimal); // 255n
console.log(readableCount); // 1000000n
~~~

A BigInt is an integer. It cannot have a fractional part or an exponent in a literal. For example, **1.5n** and **1e3n** are syntax errors. Negative values use the unary minus operator with a BigInt value, as in **-5n**.

## Creating a BigInt with BigInt()

Call **BigInt(value)** to explicitly convert a supported value:

~~~js
console.log(BigInt("9007199254740993")); // 9007199254740993n
console.log(BigInt(42)); // 42n
console.log(BigInt(true)); // 1n
console.log(BigInt(false)); // 0n
~~~

Strings must represent integers accepted by the BigInt string conversion. A fractional string such as **"3.5"** is invalid. **BigInt()** called with a non-integer Number throws a **RangeError**.

~~~js
console.log(BigInt("42")); // 42n

// BigInt("3.5"); // RangeError
// BigInt("3px"); // SyntaxError
~~~

Be careful when converting a Number that is already outside its safe integer range. The Number may have lost precision before **BigInt()** receives it.

~~~js
const alreadyRounded = 9007199254740993;

console.log(alreadyRounded); // 9007199254740992
console.log(BigInt(alreadyRounded)); // 9007199254740992n
console.log(BigInt("9007199254740993")); // 9007199254740993n
~~~

Converting the string preserves its integer text exactly. Converting the Number only converts the value that the Number already represents.

To convert a BigInt to Number, call **Number()** explicitly. This can lose precision or produce infinity for a sufficiently large value:

~~~js
const exact = 9007199254740993n;
const approximate = Number(exact);

console.log(exact); // 9007199254740993n
console.log(approximate); // 9007199254740992
~~~

Use **Number()** only when a possible precision loss is acceptable.

## BigInt arithmetic

Arithmetic between BigInts returns a BigInt:

~~~js
console.log(7n + 5n); // 12n
console.log(7n - 5n); // 2n
console.log(7n * 5n); // 35n
console.log(7n ** 2n); // 49n
~~~

The result does not overflow at the Number safe integer boundary. Practical maximum size is limited by available memory and implementation resources.

### Division truncates toward zero

BigInt division returns an integer and discards the fractional part by truncating toward zero:

~~~js
console.log(7n / 2n); // 3n
console.log(-7n / 2n); // -3n
~~~

It does not round to the nearest integer. Division by **0n** throws a **RangeError**.

### Remainder keeps the dividend's sign

The **%** operator produces a remainder, not a mathematical modulo that is always positive. The result has the sign of the left operand, called the dividend:

~~~js
console.log(7n % 3n); // 1n
console.log(-7n % 3n); // -1n
console.log(7n % -3n); // 1n
console.log(-7n % -3n); // -1n
~~~

The divisor cannot be zero.

### Exponentiation uses a BigInt exponent

Both the base and exponent must be BigInts:

~~~js
console.log(2n ** 10n); // 1024n
~~~

A negative BigInt exponent throws a **RangeError**, because the result would be fractional. **0n ** 0n** evaluates to **1n**.

## BigInt does not mix with Number arithmetic

JavaScript requires both operands of BigInt arithmetic to use the same numeric type:

~~~js
// 1n + 1; // TypeError
console.log(1n + 1n); // 2n
console.log(Number(1n) + 1); // 2
~~~

The explicit conversion decides which type the operation uses. Converting to Number can lose precision; converting a Number to BigInt can only preserve the Number value that already exists.

Comparison is different from arithmetic. BigInt can be compared with Number using relational operators, and loose equality can compare them:

~~~js
console.log(1n < 1.5); // true
console.log(1n == 1); // true
console.log(1n === 1); // false
~~~

Strict equality is false because the operand types differ. Prefer strict equality for predictable comparisons. If a comparison involves a large Number that may already be imprecise, converting types will not recover its original value.

## Operators and APIs that do not accept BigInt

The **Math** methods are designed for Numbers and do not accept BigInt values:

~~~js
// Math.sqrt(4n); // TypeError
console.log(4n ** 2n); // 16n
~~~

Use BigInt arithmetic for integer operations. Convert deliberately if a Number-based mathematical function is required and precision loss is acceptable.

BigInt supports bitwise operations and signed shifts. It does not support the unsigned right shift operator **>>>**:

~~~js
console.log(6n & 3n); // 2n
console.log(3n << 2n); // 12n

// 3n >>> 1n; // TypeError
~~~

These operations follow BigInt rules and are not limited to a fixed word size. Use **BigInt.asIntN()** and **BigInt.asUintN()** when a fixed-width signed or unsigned result is required.

## Fixed-width BigInt values

**BigInt.asUintN(bits, value)** keeps the low-order bits and interprets them as an unsigned value. **BigInt.asIntN(bits, value)** keeps the same number of low-order bits and interprets the result as signed two's-complement.

~~~js
console.log(BigInt.asUintN(8, 256n)); // 0n
console.log(BigInt.asUintN(8, -1n)); // 255n

console.log(BigInt.asIntN(8, 127n)); // 127n
console.log(BigInt.asIntN(8, 128n)); // -128n
console.log(BigInt.asIntN(8, 255n)); // -1n
~~~

These methods wrap values to the requested width. They do not check whether the original value fits. Validate the range separately if out-of-range input should be rejected instead.

## Truthiness and Boolean conversion

**0n** is falsy. Every other BigInt is truthy:

~~~js
console.log(Boolean(0n)); // false
console.log(Boolean(-1n)); // true

if (0n) {
    console.log("This does not run");
}
~~~

Truthiness is useful in conditions but does not replace a check for an exact value. Use **value === 0n** when checking specifically for zero.

## JSON and BigInt

JSON has no native BigInt value. Calling **JSON.stringify()** on an object containing a BigInt throws a **TypeError** by default:

~~~js
const record = { id: 9007199254740993n };

// JSON.stringify(record); // TypeError
~~~

A common explicit representation is a decimal string:

~~~js
const json = JSON.stringify(record, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
);

console.log(json); // {"id":"9007199254740993"}
~~~

When reading the data back, convert the chosen string field to BigInt deliberately. Keep the serialization format consistent between producers and consumers.

## When to use BigInt

BigInt is appropriate when exact integer values can exceed the Number safe integer range. Examples include large counters, sequence values, or integer identifiers whose exact digits must be preserved.

Number is usually the simpler choice for ordinary measurements, fractional values, and calculations that use **Math** APIs. BigInt cannot represent fractions, and it is not interchangeable with Number. Pick the type based on the values and operations the application needs.

If data begins as text, parse or convert the text directly to BigInt when the integer may exceed the Number safe range. Do not parse it as Number first and then convert, because that can permanently lose digits.

## Common mistakes

- Writing a BigInt literal with a decimal point or exponent.
- Mixing BigInt and Number in arithmetic.
- Converting an unsafe Number to BigInt and expecting lost digits to return.
- Assuming BigInt division rounds instead of truncating toward zero.
- Assuming the **%** result is always non-negative.
- Passing BigInt to a **Math** method.
- Using **>>>** with BigInt.
- Assuming BigInt can be serialized directly by **JSON.stringify()**.
- Treating **BigInt.asIntN()** or **BigInt.asUintN()** as range validators.
- Using truthiness when code needs to check specifically for **0n**.

## Try it yourself

1. Create BigInts using decimal, binary, octal, and hexadecimal literals.
2. Convert a large integer string to BigInt. Compare it with converting the same digits after first parsing them as Number.
3. Predict the results of **9n / 4n**, **-9n / 4n**, and **-9n % 4n**.
4. Try **BigInt("4.2")** and **BigInt(4.2)**. Note the error types.
5. Add a BigInt and a Number inside **try...catch**. Then explicitly convert one operand and explain the tradeoff.
6. Compare **9007199254740993n** with **9007199254740993** using both **==** and **===**.
7. Try **BigInt.asUintN(8, 256n)** and **BigInt.asIntN(8, 128n)**.
8. Serialize an object containing a BigInt with and without a replacer.
9. Write a validator for a non-negative BigInt below a chosen maximum.
10. Decide whether a measurement that includes fractional units should use BigInt or Number.

## Key points

- BigInt represents exact integer values of arbitrary size, within practical resource limits.
- Append **n** to an integer literal or call **BigInt()** for explicit conversion.
- BigInt arithmetic uses BigInt operands and returns BigInt values.
- Division truncates toward zero, and remainder keeps the dividend's sign.
- BigInt and Number can be compared, but cannot be mixed in arithmetic.
- Converting an already-rounded Number cannot restore the original integer digits.
- **BigInt.asIntN()** and **BigInt.asUintN()** wrap to fixed-width representations.
- BigInt is not serialized by **JSON.stringify()** without an explicit representation strategy.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [21 - Numbers, floating point, and safe integers](021-numbers-floating-point-and-safe-integers.md) | [Open Q&A](../qnas/022-bigint.md) | [Open example](../examples/022-bigint.md) | [23 - Strings and template literals](023-strings-and-template-literals.md) |