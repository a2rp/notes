# 29 - Bitwise operators and integer operations

Bitwise operators work with the binary representation of integer values. They are useful for flags, masks, compact integer fields, and low-level protocols. JavaScript has two numeric types with different bitwise behavior: **Number** and **BigInt**.

This lesson covers the operators, how JavaScript treats Number values as 32-bit integers, how BigInt changes that behavior, and when bitwise code is a good fit.

## What is a bit?

A bit is a binary digit: either **0** or **1**. A group of bits can represent an integer.

For example, the decimal number **13** is **1101** in binary:

| Binary position | 8 | 4 | 2 | 1 |
| --- | ---: | ---: | ---: | ---: |
| Bit | 1 | 1 | 0 | 1 |

So, **1101** means **8 + 4 + 1**, which is **13**.

JavaScript can apply Boolean-like operations to corresponding bits of integer values.

## Number bitwise operators

The Number bitwise operators are:

| Operator | Name | What it does |
| --- | --- | --- |
| **&** | AND | Produces 1 where both corresponding bits are 1 |
| **\|** | OR | Produces 1 where either corresponding bit is 1 |
| **^** | XOR | Produces 1 where corresponding bits are different |
| **~** | NOT | Flips each bit |
| **<<** | Left shift | Moves bits left and fills the right with zero bits |
| **>>** | Signed right shift | Moves bits right and copies the sign bit |
| **>>>** | Unsigned right shift | Moves bits right and fills the left with zero bits |

The first three operators need two operands. The **~** operator is unary and works on one operand. Shift operators use a value and a shift count.

### AND: **&**

A bit in the result is 1 only when both input bits are 1.

~~~text
  13 = 1101
   9 = 1001
  13 & 9
      1001 = 9
~~~

~~~js
console.log(13 & 9);
~~~

Output:

~~~text
9
~~~

### OR: **|**

A bit in the result is 1 when at least one input bit is 1.

~~~text
  13 = 1101
   9 = 1001
  13 | 9
      1101 = 13
~~~

~~~js
console.log(13 | 9);
~~~

Output:

~~~text
13
~~~

### XOR: **^**

A bit in the result is 1 when the input bits differ. If both bits match, the result bit is 0.

~~~text
  13 = 1101
   9 = 1001
  13 ^ 9
      0100 = 4
~~~

~~~js
console.log(13 ^ 9);
~~~

Output:

~~~text
4
~~~

### NOT: **~**

The **~** operator flips the bits of its operand. For Number values, the result follows signed 32-bit integer rules. A useful identity is:

~~~text
~x === -(x + 1)
~~~

For example:

~~~js
console.log(~5);
console.log(~-1);
~~~

Output:

~~~text
-6
0
~~~

The result can look surprising because JavaScript uses a signed 32-bit representation for Number bitwise operations. NOT flips all 32 bits, including the sign bit.

## Number values are converted to 32-bit integers

JavaScript Number values are normally floating-point values. Before Number bitwise operations, JavaScript converts them to 32-bit integer values.

For operators **&**, **|**, **^**, **~**, **<<**, and **>>**, the bit pattern is interpreted as a signed 32-bit integer. The **>>>** operator instead interprets the bit pattern as an unsigned 32-bit integer.

This conversion has practical consequences:

- Fractional parts are discarded by integer conversion.
- **NaN**, **Infinity**, and **-Infinity** become zero for these operations.
- Values outside the 32-bit range wrap to the corresponding 32-bit pattern.
- A value may already have lost precision as a Number before the bitwise operation runs.

Examples:

~~~js
console.log(5.9 | 0);
console.log(-5.9 | 0);
console.log((2 ** 32) | 0);
console.log(NaN | 0);
~~~

Output:

~~~text
5
-5
0
0
~~~

The operation **value | 0** is sometimes used to coerce a value to a signed 32-bit integer. It is a low-level conversion trick, not a general-purpose way to validate or normalize input. Use explicit validation and clearer conversion code when that is the real goal.

### Signed and unsigned 32-bit results

A signed 32-bit integer ranges from **-2147483648** through **2147483647**. An unsigned 32-bit integer ranges from **0** through **4294967295**.

~~~js
console.log(0x7fffffff);
console.log(0x80000000 | 0);
console.log(0x80000000 >>> 0);
~~~

Output:

~~~text
2147483647
-2147483648
2147483648
~~~

The same 32 bits can have different decimal interpretations depending on whether they are treated as signed or unsigned.

Use **value >>> 0** when you intentionally want the value interpreted as an unsigned 32-bit integer. It wraps values into the unsigned 32-bit range. It does not check whether the original input was valid.

## Left shift: **<<**

A left shift moves bits toward higher positions. The newly opened positions on the right are filled with zeroes.

For simple positive integers, shifting left by one position often has the same numeric effect as multiplying by two:

~~~js
console.log(5 << 1);
console.log(5 << 2);
~~~

Output:

~~~text
10
20
~~~

A Number left shift still uses 32-bit integer semantics. Bits shifted out of the 32-bit pattern are discarded, and the resulting pattern is interpreted as signed.

~~~js
console.log(1 << 30);
console.log(1 << 31);
console.log(1 << 32);
~~~

Output:

~~~text
1073741824
-2147483648
1
~~~

The last line surprises many learners. For Number shifts, JavaScript uses only the low five bits of the converted shift count. That is equivalent to reducing the count modulo 32, so shifting by 32 has the same effect as shifting by 0.

This rule also applies to negative and very large Number shift counts after integer conversion:

~~~js
console.log(8 << 33);
console.log(8 << -1);
~~~

Output:

~~~text
16
0
~~~

Here, **33** acts as a shift count of **1**. The converted count **-1** acts as **31**.

Do not use Number bitwise shifts as general multiplication or division for arbitrary values. The 32-bit conversion can change the value.

## Signed right shift: **>>**

A signed right shift moves bits toward lower positions. The leftmost bit is copied into the newly opened positions, preserving the sign for signed 32-bit values.

~~~js
console.log(20 >> 2);
console.log(-8 >> 1);
~~~

Output:

~~~text
5
-4
~~~

For negative values, copying the sign bit is called **sign extension**. With negative numbers, signed right shift rounds toward negative infinity after the 32-bit conversion. It is not exactly the same as **Math.trunc(value / 2 ** count)** for every negative value.

~~~js
console.log(-5 >> 1);
console.log(Math.trunc(-5 / 2));
~~~

Output:

~~~text
-3
-2
~~~

Use **>>** when signed 32-bit behavior is intended, not as a replacement for ordinary division.

## Unsigned right shift: **>>>**

An unsigned right shift fills new leftmost positions with zeroes. Its result is interpreted as an unsigned 32-bit integer.

~~~js
console.log(20 >>> 2);
console.log(-8 >>> 1);
~~~

Output:

~~~text
5
2147483644
~~~

The negative input is first reduced to a 32-bit pattern. That pattern is then interpreted as unsigned for the right shift, which produces a large non-negative result.

**BigInt does not support >>>** because BigInt has no fixed 32-bit width to interpret as unsigned.

## Bit masks and flags

A **mask** is a bit pattern used to inspect or change selected bits. Each flag can use one bit.

~~~js
const CAN_READ = 1 << 0;
const CAN_WRITE = 1 << 1;
const CAN_DELETE = 1 << 2;

let permissions = CAN_READ | CAN_DELETE;

console.log((permissions & CAN_READ) !== 0);
console.log((permissions & CAN_WRITE) !== 0);
console.log((permissions & CAN_DELETE) !== 0);
~~~

Output:

~~~text
true
false
true
~~~

The expression **permissions & CAN_READ** keeps only the read bit. Comparing with zero tells us whether that bit is set.

Common flag operations:

~~~js
let flags = 0;
const EDIT = 1 << 0;
const SHARE = 1 << 1;

// Set a flag.
flags |= EDIT;

// Test a flag.
console.log((flags & EDIT) !== 0);

// Clear a flag.
flags &= ~EDIT;

// Toggle a flag.
flags ^= SHARE;
~~~

Output:

~~~text
true
~~~

**|=** sets selected bits, **&= ~mask** clears selected bits, and **^=** toggles selected bits.

Use bit flags when compact, low-level flags are useful and the meaning of each bit is documented. For ordinary application settings, an object with named Boolean properties is often easier to read and maintain.

## BigInt bitwise operations

BigInt supports **&**, **|**, **^**, **~**, **<<**, and **>>**. These operations work with BigInt operands and do not first truncate the value to 32 bits.

~~~js
console.log(5n & 3n);
console.log(5n | 3n);
console.log(5n ^ 3n);
console.log(~5n);
console.log(1n << 40n);
~~~

Output:

~~~text
1n
7n
6n
-6n
1099511627776n
~~~

BigInt bitwise values behave as if represented using two's complement with an unbounded number of leading sign bits. This makes operations such as **~5n** produce **-6n**, and it allows bit shifts beyond 32 positions.

BigInt shift counts are also BigInts:

~~~js
console.log(16n >> 2n);
console.log(-8n >> 1n);
~~~

Output:

~~~text
4n
-4n
~~~

BigInt has no unsigned right shift operator. Using **>>>** with BigInt throws a **TypeError**. A Number and a BigInt also cannot be mixed in one bitwise operation.

~~~js
// Each expression below throws a TypeError.
1n & 1;
1n >>> 1n;
~~~

Convert deliberately when needed. For example, **BigInt(numberValue)** requires an integer Number and cannot recover precision that the Number has already lost.

## Bitwise operators are different from logical operators

Bitwise operators work on integer bits. Logical operators work with truthiness and short-circuit evaluation.

~~~js
console.log(5 & 3);
console.log(5 && 3);
~~~

Output:

~~~text
1
3
~~~

The single-character **&** is bitwise AND. The double-character **&&** is logical AND. Likewise, **|** is bitwise OR while **||** is logical OR.

Use logical operators for conditions. Use bitwise operators only when the bit-level behavior is intended.

## Precedence and parentheses

Bitwise operators have their own precedence levels. Equality checks bind more tightly than bitwise AND, so this condition is easy to misread:

~~~js
const flags = 5;
const mask = 1;

console.log(flags & mask === 1);
~~~

It is evaluated as **flags & (mask === 1)**. The Boolean result is converted to a Number, so this expression returns the number **1**, not the intended Boolean comparison. Parentheses make the intended check clear:

~~~js
console.log((flags & mask) === 1);
~~~

Output:

~~~text
true
~~~

Prefer parentheses around a mask operation when combining it with comparisons or logical operators. The code becomes easier to scan and less error-prone.

## When to use bitwise operations

Bitwise operations can be appropriate for:

- Testing, setting, clearing, or toggling documented flag bits.
- Reading or writing compact integer fields in a protocol.
- Working with explicitly defined 32-bit values.
- Integer algorithms where the bit representation is part of the requirement.

Avoid them for ordinary arithmetic, decimal values, or values whose full Number precision and magnitude must be preserved. Number bitwise operations always apply 32-bit conversion rules.

Use BigInt when the task requires integer bit operations on values outside the 32-bit range, and keep all operands and shift counts as BigInts.

## Try it yourself

1. Calculate **12 & 10**, **12 | 10**, and **12 ^ 10** by comparing their binary digits.
2. Predict the result of **~7**, then verify the identity **~x === -(x + 1)**.
3. Explain why **1 << 32** produces **1**.
4. Compare **-8 >> 1** and **-8 >>> 1**.
5. Create two flags, set both, and test each one independently.
6. Clear one flag without changing the other.
7. Try the equivalent flag operations with BigInt values.
8. Explain why a bitwise conversion should not be used as input validation.
9. Add parentheses to make a flag comparison unambiguous.
10. Explain why **>>>** cannot be used with BigInt.

## Key points

- Number bitwise operators first use a 32-bit integer representation.
- **&**, **|**, and **^** combine corresponding bits; **~** flips bits.
- **<<** moves bits left, **>>** sign-fills on the right, and **>>>** zero-fills on the right.
- Number shift counts use only their low five bits, so the effective count is from 0 to 31.
- Number results are signed 32-bit values except for **>>>**, which returns an unsigned 32-bit value.
- BigInt supports **&**, **|**, **^**, **~**, **<<**, and **>>** without Number's 32-bit truncation.
- BigInt cannot be mixed with Number in bitwise expressions and does not support **>>>**.
- Use masks for intentional flag operations. Prefer ordinary arithmetic and named properties for everyday application logic.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [28 - Optional chaining and nullish coalescing](028-optional-chaining-and-nullish-coalescing.md) | [Open Q&A](../qnas/029-bitwise-operators-and-integer-operations.md) | [Open example](../examples/029-bitwise-operators-and-integer-operations.md) | [30 - Conditional statements](030-conditional-statements.md) |

