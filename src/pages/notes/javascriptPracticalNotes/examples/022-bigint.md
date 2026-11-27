# 22 - BigInt: example

This complete HTML page demonstrates BigInt literals, explicit conversion, exact large integers, arithmetic, comparisons, fixed-width wrapping, and JSON serialization. It writes the results to the browser Console and catches several common errors.

## Question

How can you preserve exact integer values beyond the safe Number range, and what rules change when those values use BigInt?

## Goal

After working through this example, you should be able to:

- Create BigInt values with literals and explicit conversion.
- See why converting an already-rounded Number cannot recover its original digits.
- Perform arithmetic with BigInt operands.
- Handle division, remainder, and mixed Number operations correctly.
- Use relational comparisons and fixed-width conversion.
- Serialize BigInt values as strings in JSON.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript BigInt practice</title>
</head>
<body>
  <main>
    <h1>BigInt</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      exact integer values, BigInt operations, and serialization.
    </p>
  </main>

  <script>
    // BigInt literals in different integer bases.
    const decimal = 42n;
    const binary = 0b1010n;
    const octal = 0o17n;
    const hexadecimal = 0xFFn;
    const separated = 1_000_000n;

    console.log("decimal:", decimal);
    console.log("binary:", binary);
    console.log("octal:", octal);
    console.log("hexadecimal:", hexadecimal);
    console.log("numeric separator:", separated);
    console.log("type:", typeof decimal);

    // Explicit conversions.
    console.log('BigInt("9007199254740993"):', BigInt("9007199254740993"));
    console.log("BigInt(42):", BigInt(42));
    console.log("BigInt(true):", BigInt(true));
    console.log("BigInt(false):", BigInt(false));

    // A Number can lose precision before BigInt receives it.
    const alreadyRounded = 9007199254740993;

    console.log("Number literal after rounding:", alreadyRounded);
    console.log("BigInt of rounded Number:", BigInt(alreadyRounded));
    console.log(
      "BigInt directly from text:",
      BigInt("9007199254740993")
    );

    // BigInt arithmetic.
    console.log("7n + 5n:", 7n + 5n);
    console.log("7n - 5n:", 7n - 5n);
    console.log("7n * 5n:", 7n * 5n);
    console.log("2n ** 10n:", 2n ** 10n);
    console.log("7n / 2n:", 7n / 2n);
    console.log("-7n / 2n:", -7n / 2n);
    console.log("-7n % 3n:", -7n % 3n);

    // Mixed numeric types cannot be used in arithmetic.
    try {
      console.log(1n + 1);
    } catch (error) {
      console.log("mixed BigInt and Number addition:", error.name);
    }

    // Relational comparison is allowed across these numeric types.
    console.log("1n < 1.5:", 1n < 1.5);
    console.log("1n == 1:", 1n == 1);
    console.log("1n === 1:", 1n === 1);

    // BigInt bitwise operations and signed shifts.
    console.log("6n & 3n:", 6n & 3n);
    console.log("3n << 2n:", 3n << 2n);

    try {
      console.log(1n >>> 0n);
    } catch (error) {
      console.log("BigInt unsigned right shift:", error.name);
    }

    // Fixed-width signed and unsigned conversions wrap to the requested bits.
    console.log("unsigned 8-bit value of 256n:", BigInt.asUintN(8, 256n));
    console.log("unsigned 8-bit value of -1n:", BigInt.asUintN(8, -1n));
    console.log("signed 8-bit value of 128n:", BigInt.asIntN(8, 128n));
    console.log("signed 8-bit value of 255n:", BigInt.asIntN(8, 255n));

    // BigInt zero is falsy. Other BigInts are truthy.
    console.log("Boolean(0n):", Boolean(0n));
    console.log("Boolean(-1n):", Boolean(-1n));

    // BigInt cannot be passed directly to Number-based Math functions.
    try {
      console.log(Math.sqrt(4n));
    } catch (error) {
      console.log("Math.sqrt with BigInt:", error.name);
    }

    // JSON does not serialize BigInt by default.
    const record = { id: 9007199254740993n };

    try {
      console.log(JSON.stringify(record));
    } catch (error) {
      console.log("JSON.stringify with BigInt:", error.name);
    }

    // Convert BigInt values to decimal strings for JSON.
    const json = JSON.stringify(record, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );

    console.log("JSON with BigInt strings:", json);
  </script>
</body>
</html>
~~~

## Expected Console output

~~~text
decimal: 42n
binary: 10n
octal: 15n
hexadecimal: 255n
numeric separator: 1000000n
type: bigint
BigInt("9007199254740993"): 9007199254740993n
BigInt(42): 42n
BigInt(true): 1n
BigInt(false): 0n
Number literal after rounding: 9007199254740992
BigInt of rounded Number: 9007199254740992n
BigInt directly from text: 9007199254740993n
7n + 5n: 12n
7n - 5n: 2n
7n * 5n: 35n
2n ** 10n: 1024n
7n / 2n: 3n
-7n / 2n: -3n
-7n % 3n: -1n
mixed BigInt and Number addition: TypeError
1n < 1.5: true
1n == 1: true
1n === 1: false
6n & 3n: 2n
3n << 2n: 12n
BigInt unsigned right shift: TypeError
unsigned 8-bit value of 256n: 0n
unsigned 8-bit value of -1n: 255n
signed 8-bit value of 128n: -128n
signed 8-bit value of 255n: -1n
Boolean(0n): false
Boolean(-1n): true
Math.sqrt with BigInt: TypeError
JSON.stringify with BigInt: TypeError
JSON with BigInt strings: {"id":"9007199254740993"}
~~~

## Explanation

- The **n** suffix creates a BigInt. Binary, octal, and hexadecimal integer literals can use the same suffix.
- **BigInt("9007199254740993")** keeps the exact decimal digits. The Number literal with the same digits was already rounded before conversion.
- BigInt addition, subtraction, multiplication, and exponentiation require BigInt operands and return BigInt values.
- BigInt division truncates toward zero. Remainder has the sign of the left operand.
- Mixing BigInt and Number in arithmetic throws a TypeError. Relational comparison and loose equality can compare the types, while strict equality keeps them distinct.
- BigInt supports bitwise operations and signed shifts, but does not support unsigned right shift.
- **BigInt.asUintN()** and **BigInt.asIntN()** wrap values to the requested bit width. They do not reject an out-of-range value.
- **0n** is falsy and **-1n** is truthy.
- Math methods expect Numbers, so convert only when the possible loss of precision is acceptable.
- The JSON replacer turns BigInt values into decimal strings, which JSON can represent.

## Try it yourself

1. Change **decimal** to **0xABCn** and inspect its decimal output.
2. Change the large integer text to **"9007199254740995"**. Compare direct BigInt conversion with conversion through Number.
3. Predict the results of **-11n / 4n** and **-11n % 4n** before running the page.
4. Add a try...catch around **BigInt(4.5)** and log the error name.
5. Compare **2n < 2.1** with **2n === 2**.
6. Try exponentiation with a negative BigInt exponent inside try...catch.
7. Change **BigInt.asUintN()** from eight bits to sixteen bits.
8. Add a BigInt property to **record** and check that the replacer converts both values.
9. Parse the JSON string back, then explicitly convert the **id** string to BigInt.
10. Write a function that accepts only BigInts from zero through **1000n**.

## Key ideas shown

- BigInt preserves exact integer values beyond Number's safe integer range.
- Convert exact integer text directly to BigInt to avoid first rounding through Number.
- BigInt arithmetic requires BigInt operands and truncates division toward zero.
- BigInt and Number comparisons are supported, but mixed arithmetic is not.
- Fixed-width BigInt methods wrap values to a requested bit width.
- BigInt is not supported by Number-based Math functions or default JSON serialization.
- Use strings as an explicit JSON representation for BigInt values.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [21 - Numbers, floating point, and safe integers](../lessons/021-numbers-floating-point-and-safe-integers.md) | [Open lesson](../lessons/022-bigint.md) | [Open Q&A](../qnas/022-bigint.md) | [23 - Strings and template literals](../lessons/023-strings-and-template-literals.md) |