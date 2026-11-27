# 21 - Numbers, floating point, and safe integers: example

This complete HTML page demonstrates floating-point rounding, safe integer limits, Number validation, signed zero, overflow, rounding methods, and display formatting. Every result is printed to the browser Console.

## Question

How can JavaScript represent a very wide range of numbers while still producing rounding surprises for decimals and large integers?

## Goal

After working through this example, you should be able to:

- Observe binary floating-point approximation.
- Check integer precision with **Number.isSafeInteger()**.
- Distinguish finite, integral, and safe Number values.
- Recognize overflow, underflow, **NaN**, and signed zero.
- Choose a rounding method for a specific rule.
- Format a value for display without confusing the result with a Number.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript numbers practice</title>
</head>
<body>
  <main>
    <h1>Numbers, floating point, and safe integers</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      floating-point values, integer limits, special values, and rounding.
    </p>
  </main>

  <script>
    // Binary floating-point approximations.
    const decimalSum = 0.1 + 0.2;

    console.log("0.1 + 0.2:", decimalSum);
    console.log("0.1 + 0.2 === 0.3:", decimalSum === 0.3);
    console.log("0.5 + 0.25:", 0.5 + 0.25);

    // Integer precision limits.
    const roundedInteger = 9007199254740993;

    console.log("Number.MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
    console.log("Number.MIN_SAFE_INTEGER:", Number.MIN_SAFE_INTEGER);
    console.log("rounded integer literal:", roundedInteger);
    console.log(
      "9007199254740992 === 9007199254740993:",
      9007199254740992 === 9007199254740993
    );
    console.log(
      "is MAX_SAFE_INTEGER safe:",
      Number.isSafeInteger(Number.MAX_SAFE_INTEGER)
    );
    console.log(
      "is MAX_SAFE_INTEGER + 1 safe:",
      Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)
    );

    // Integer, safe integer, and finite checks answer different questions.
    console.log(
      "large Number is integer:",
      Number.isInteger(9007199254740992)
    );
    console.log(
      "large Number is safe integer:",
      Number.isSafeInteger(9007199254740992)
    );
    console.log("finite string check:", Number.isFinite("10"));
    console.log("global finite string check:", isFinite("10"));
    console.log("Number.EPSILON:", Number.EPSILON);

    // Overflow, underflow, and non-finite values.
    console.log("Number.MAX_VALUE * 2:", Number.MAX_VALUE * 2);
    console.log("Number.MIN_VALUE:", Number.MIN_VALUE);
    console.log("Number.MIN_VALUE / 2:", Number.MIN_VALUE / 2);
    console.log("1 / 0:", 1 / 0);
    console.log("0 / 0:", 0 / 0);
    console.log('Number.isNaN("NaN"):', Number.isNaN("NaN"));
    console.log(
      'Number.isNaN(Number("not numeric")):',
      Number.isNaN(Number("not numeric"))
    );

    // Signed zero compares equal with === but can be distinguished.
    console.log("+0 === -0:", +0 === -0);
    console.log("Object.is(+0, -0):", Object.is(+0, -0));
    console.log("1 / +0:", 1 / +0);
    console.log("1 / -0:", 1 / -0);

    // Rounding methods use different rules.
    console.log("Math.floor(-3.8):", Math.floor(-3.8));
    console.log("Math.ceil(-3.8):", Math.ceil(-3.8));
    console.log("Math.trunc(-3.8):", Math.trunc(-3.8));
    console.log("Math.round(2.5):", Math.round(2.5));
    console.log("Math.round(-2.5):", Math.round(-2.5));

    // toFixed returns display text and leaves the original Number unchanged.
    const amount = 3.456;
    const displayedAmount = amount.toFixed(2);

    console.log("amount:", amount);
    console.log("amount.toFixed(2):", displayedAmount);
    console.log("typeof displayed amount:", typeof displayedAmount);

    // Use a domain-specific tolerance for approximate comparison.
    function isWithinTolerance(left, right, tolerance) {
      return Number.isFinite(left)
        && Number.isFinite(right)
        && Number.isFinite(tolerance)
        && tolerance >= 0
        && Math.abs(left - right) <= tolerance;
    }

    console.log(
      "decimal values within tolerance:",
      isWithinTolerance(decimalSum, 0.3, 1e-10)
    );

    // Validate an integer against both precision and domain requirements.
    function isValidIdentifier(value) {
      return Number.isSafeInteger(value)
        && value >= 0
        && value <= 1_000_000;
    }

    console.log("valid identifier 42:", isValidIdentifier(42));
    console.log("valid identifier 1.5:", isValidIdentifier(1.5));
    console.log(
      "valid identifier beyond safe range:",
      isValidIdentifier(9007199254740992)
    );

    // BigInt preserves exact large integer values.
    const exactCount = 9007199254740993n;

    console.log("exact BigInt count:", exactCount);
    console.log("BigInt type:", typeof exactCount);
  </script>
</body>
</html>
~~~

## Expected Console output

~~~text
0.1 + 0.2: 0.30000000000000004
0.1 + 0.2 === 0.3: false
0.5 + 0.25: 0.75
Number.MAX_SAFE_INTEGER: 9007199254740991
Number.MIN_SAFE_INTEGER: -9007199254740991
rounded integer literal: 9007199254740992
9007199254740992 === 9007199254740993: true
is MAX_SAFE_INTEGER safe: true
is MAX_SAFE_INTEGER + 1 safe: false
large Number is integer: true
large Number is safe integer: false
finite string check: false
global finite string check: true
Number.EPSILON: 2.220446049250313e-16
Number.MAX_VALUE * 2: Infinity
Number.MIN_VALUE: 5e-324
Number.MIN_VALUE / 2: 0
1 / 0: Infinity
0 / 0: NaN
Number.isNaN("NaN"): false
Number.isNaN(Number("not numeric")): true
+0 === -0: true
Object.is(+0, -0): false
1 / +0: Infinity
1 / -0: -Infinity
Math.floor(-3.8): -4
Math.ceil(-3.8): -3
Math.trunc(-3.8): -3
Math.round(2.5): 3
Math.round(-2.5): -2
amount: 3.456
amount.toFixed(2): 3.46
typeof displayed amount: string
decimal values within tolerance: true
valid identifier 42: true
valid identifier 1.5: false
valid identifier beyond safe range: false
exact BigInt count: 9007199254740993n
BigInt type: bigint
~~~

## Explanation

- **0.1 + 0.2** produces a nearby binary64 value rather than the exact decimal value **0.3**. This makes the strict equality result false.
- **0.5** and **0.25** have finite binary representations, so their sum is exactly represented as **0.75**.
- The Number literal **9007199254740993** is rounded to **9007199254740992**. Past the safe integer limit, separate mathematical integers can share a Number value.
- **Number.isInteger()** checks for an integral Number. **Number.isSafeInteger()** additionally checks that the integer is inside the safe range.
- **Number.isFinite()** does not convert the string **"10"**. The global **isFinite()** does convert it, which can hide input types.
- **Number.MAX_VALUE * 2** overflows to **Infinity**. **Number.MIN_VALUE / 2** underflows to zero.
- **Number.isNaN()** checks whether the value itself is the Number **NaN**. It does not treat a string containing those letters as NaN.
- **+0** and **-0** compare equal with **===**, but **Object.is()** distinguishes them. Their reciprocals also have different signs.
- **Math.floor()**, **Math.ceil()**, **Math.trunc()**, and **Math.round()** use distinct rounding rules, especially for negative values.
- **toFixed(2)** returns a formatted string. The original Number remains **3.456**.
- The tolerance function checks whether a difference is within the supplied absolute tolerance. Choose that tolerance for the application's units and scale.
- The identifier validator requires a safe integer and then applies the application's allowed range.
- The BigInt literal preserves the exact integer value beyond the safe Number range.

## Try it yourself

1. Change **decimalSum** to **0.1 + 0.7** and compare it with **0.8**.
2. Change the tolerance from **1e-10** to **Number.EPSILON**. Observe the result and explain why a tolerance depends on scale.
3. Try **Number.isInteger(1e100)** and **Number.isSafeInteger(1e100)**.
4. Change the identifier limit to **Number.MAX_SAFE_INTEGER** and test the boundary and the next value.
5. Compare **Math.floor(-2.2)** with **Math.trunc(-2.2)**.
6. Change **amount.toFixed(2)** to **amount.toFixed(0)** and inspect the returned type.
7. Try **Number.MAX_VALUE * 10** and **Number.MIN_VALUE / 10**.
8. Create a BigInt larger than **9007199254740993n** and print it.
9. Try to add the BigInt to a Number. Then choose one type explicitly before adding.
10. Adjust the identifier validator to accept only safe, positive integers.

## Key ideas shown

- JavaScript Number arithmetic follows binary64 floating-point behavior.
- Decimal fractions can be approximations, so fractional calculations can have small errors.
- Safe integers are different from merely integral Number values.
- **Number.isFinite()**, **Number.isInteger()**, and **Number.isSafeInteger()** check different properties without coercion.
- Overflow produces infinities, and very small values can underflow to zero.
- Rounding methods have different rules and should match the desired operation.
- **toFixed()** creates display text rather than a new numeric value.
- BigInt stores exact integers outside the safe Number range.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [20 - Equality, comparison, and relational operators](../lessons/020-equality-comparison-and-relational-operators.md) | [Open lesson](../lessons/021-numbers-floating-point-and-safe-integers.md) | [Open Q&A](../qnas/021-numbers-floating-point-and-safe-integers.md) | [22 - BigInt](../lessons/022-bigint.md) |