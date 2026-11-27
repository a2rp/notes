# 29 - Bitwise operators and integer operations: examples

These examples show bitwise operations with **Number** and **BigInt** values. Each section starts with a small task, shows code, then gives the expected output and explains what the operation does.

## Example 1: Combine bits with AND, OR, and XOR

**Question:** Given 13 and 9, what values do bitwise AND, OR, and XOR produce?

**Code:**

~~~js
const first = 13;
const second = 9;

console.log(first & second);
console.log(first | second);
console.log(first ^ second);
~~~

**Expected output:**

~~~text
9
13
4
~~~

**Explanation:**

13 is **1101** in binary and 9 is **1001**.

- AND keeps bits that are 1 in both values, producing **1001**, or 9.
- OR keeps bits that are 1 in either value, producing **1101**, or 13.
- XOR keeps bits that differ, producing **0100**, or 4.

## Example 2: Flip bits with NOT

**Question:** What does Number bitwise NOT return for 5 and -1?

**Code:**

~~~js
console.log(~5);
console.log(~-1);
~~~

**Expected output:**

~~~text
-6
0
~~~

**Explanation:**

For Number operands, **~x** is equivalent to **-(x + 1)**. Number bitwise operations use signed 32-bit integer behavior, so NOT flips all 32 bits.

## Example 3: See Number's 32-bit conversion

**Question:** What happens to fractions, a value equal to 2 to the power of 32, and NaN?

**Code:**

~~~js
console.log(5.9 | 0);
console.log(-5.9 | 0);
console.log((2 ** 32) | 0);
console.log(NaN | 0);
~~~

**Expected output:**

~~~text
5
-5
0
0
~~~

**Explanation:**

Number bitwise operations convert values to 32-bit integers. Fractional parts are discarded, and the 32-bit pattern for 2 to the power of 32 is all zeroes. NaN converts to zero for these operations. This behavior is not input validation.

## Example 4: Interpret the same bits as signed and unsigned

**Question:** How can the same 32-bit pattern produce signed and unsigned decimal results?

**Code:**

~~~js
const pattern = 0x80000000;

console.log(pattern | 0);
console.log(pattern >>> 0);
~~~

**Expected output:**

~~~text
-2147483648
2147483648
~~~

**Explanation:**

The pattern begins with the high bit set. Signed interpretation treats it as a negative 32-bit integer. Unsigned right shift by zero interprets the same pattern as an unsigned 32-bit integer.

## Example 5: Shift left and observe 32-bit wrapping

**Question:** What does a Number left shift by 1, 2, 31, or 32 positions do?

**Code:**

~~~js
console.log(5 << 1);
console.log(5 << 2);
console.log(1 << 31);
console.log(1 << 32);
~~~

**Expected output:**

~~~text
10
20
-2147483648
1
~~~

**Explanation:**

A left shift moves bits left and fills new right positions with zeroes. Number shifts still produce a signed 32-bit result. The high bit becomes the sign bit, and a shift count of 32 has the same effective count as zero.

## Example 6: Compare signed and unsigned right shifts

**Question:** Why do signed and unsigned shifts give different answers for a negative value?

**Code:**

~~~js
console.log(-8 >> 1);
console.log(-8 >>> 1);
~~~

**Expected output:**

~~~text
-4
2147483644
~~~

**Explanation:**

The signed operator **>>** copies the sign bit. The unsigned operator **>>>** fills with zeroes and treats the 32-bit pattern as an unsigned integer.

## Example 7: Check an effective Number shift count

**Question:** What are the effective shift counts for 33 and -1?

**Code:**

~~~js
console.log(8 << 33);
console.log(8 << -1);
console.log(8 << 1);
console.log(8 << 31);
~~~

**Expected output:**

~~~text
16
0
16
0
~~~

**Explanation:**

Number shift counts use only their low five bits. A count of 33 acts like 1. A count of -1 converts to a 32-bit pattern whose low five bits are 31. The example demonstrates why bitwise shifts should not be used as general-purpose multiplication.

## Example 8: Test individual permission flags

**Question:** How can several permissions share one integer and still be tested separately?

**Code:**

~~~js
const CAN_READ = 1 << 0;
const CAN_WRITE = 1 << 1;
const CAN_DELETE = 1 << 2;

const permissions = CAN_READ | CAN_DELETE;

console.log((permissions & CAN_READ) !== 0);
console.log((permissions & CAN_WRITE) !== 0);
console.log((permissions & CAN_DELETE) !== 0);
~~~

**Expected output:**

~~~text
true
false
true
~~~

**Explanation:**

Each permission uses a different bit. AND with one permission mask isolates that bit. A nonzero result means that permission is present.

## Example 9: Set, clear, and toggle a flag

**Question:** How can a flag be added, removed, and toggled without changing other bits?

**Code:**

~~~js
const EDIT = 1 << 0;
const SHARE = 1 << 1;
let flags = 0;

flags |= EDIT;
console.log((flags & EDIT) !== 0);

flags |= SHARE;
flags &= ~EDIT;
console.log((flags & EDIT) !== 0);
console.log((flags & SHARE) !== 0);

flags ^= SHARE;
console.log((flags & SHARE) !== 0);
~~~

**Expected output:**

~~~text
true
false
true
false
~~~

**Explanation:**

OR sets a bit. AND with the inverted mask clears it. XOR toggles it, so a set bit becomes clear and a clear bit becomes set. An object with named Boolean properties may be easier to maintain for ordinary application settings.

## Example 10: Make a clear flag comparison

**Question:** How can a bitmask test reliably return a Boolean?

**Code:**

~~~js
const flags = 5;
const mask = 1;

const unclear = flags & mask === 1;
const clear = (flags & mask) === 1;

console.log(unclear);
console.log(clear);
~~~

**Expected output:**

~~~text
1
true
~~~

**Explanation:**

Equality has higher precedence than bitwise AND. The first expression is evaluated as **flags & (mask === 1)**. The Boolean operand is converted to a Number, so the result is the number 1. Parenthesize the AND operation to compare its result and get a Boolean.

## Example 11: Convert a 32-bit pattern to an unsigned value

**Question:** How can a program read a Number's 32-bit pattern as an unsigned integer?

**Code:**

~~~js
const signedValue = -1;
const unsignedValue = signedValue >>> 0;

console.log(unsignedValue);
~~~

**Expected output:**

~~~text
4294967295
~~~

**Explanation:**

The pattern for -1 has every bit set. **>>> 0** returns the same bit pattern interpreted as an unsigned 32-bit Number. It does not verify or validate the original input.

## Example 12: Use BigInt beyond 32 bits

**Question:** What happens when BigInt shifts a value by 40 bits?

**Code:**

~~~js
const value = 1n << 40n;

console.log(value);
console.log(value >> 8n);
~~~

**Expected output:**

~~~text
1099511627776n
4294967296n
~~~

**Explanation:**

BigInt bitwise shifts do not truncate the value to 32 bits. Both the value and the shift count are BigInts, and the results remain BigInts.

## Example 13: Combine BigInt flags

**Question:** Can BigInt flags represent bits beyond the Number 32-bit range?

**Code:**

~~~js
const READ = 1n << 0n;
const ARCHIVE = 1n << 40n;
const flags = READ | ARCHIVE;

console.log((flags & READ) !== 0n);
console.log((flags & ARCHIVE) !== 0n);
console.log(flags.toString(2));
~~~

**Expected output:**

~~~text
true
true
10000000000000000000000000000000000000001
~~~

**Explanation:**

BigInt supports bit positions above 31 without Number's 32-bit truncation. The binary string shows bit 40 and bit 0 set.

## Example 14: Why BigInt operands must stay BigInt

**Question:** What is wrong with mixing a BigInt flag and a Number mask?

**Code:**

~~~js
const flags = 5n;
const mask = 1;

// This would throw:
// console.log(flags & mask);

console.log(flags & BigInt(mask));
~~~

**Expected output:**

~~~text
1n
~~~

**Explanation:**

Bitwise operations do not mix Number and BigInt. The commented expression throws a **TypeError**. Convert only when the value is known to be safe and an integer. Conversion cannot recover precision already lost by a Number.

## Example 15: Pack and unpack RGB color bytes

**Question:** How can three 8-bit color values be packed into one 24-bit Number and extracted later?

**Code:**

~~~js
const red = 0x33;
const green = 0x66;
const blue = 0xcc;

const packed = (red << 16) | (green << 8) | blue;

const extractedRed = (packed >>> 16) & 0xff;
const extractedGreen = (packed >>> 8) & 0xff;
const extractedBlue = packed & 0xff;

console.log(packed.toString(16));
console.log(extractedRed.toString(16));
console.log(extractedGreen.toString(16));
console.log(extractedBlue.toString(16));
~~~

**Expected output:**

~~~text
3366cc
33
66
cc
~~~

**Explanation:**

Each color channel uses 8 bits. The red byte is moved to bits 16 through 23, green to bits 8 through 15, and blue remains in bits 0 through 7. A mask of **0xff** selects one byte. This pattern is useful only when the data is intentionally defined as a packed 24-bit integer.

## Example 16: Keep logical and bitwise operations distinct

**Question:** How do logical AND and bitwise AND behave with the same values?

**Code:**

~~~js
console.log(5 && 3);
console.log(5 & 3);
~~~

**Expected output:**

~~~text
3
1
~~~

**Explanation:**

Logical AND checks truthiness and returns an operand value. Bitwise AND converts the values to integers and combines their bits. They solve different problems.

## Example 17: Count whether a flag mask has any selected bit

**Question:** How can a function test whether at least one requested bit is set?

**Code:**

~~~js
function hasAnyFlag(value, mask) {
    return (value & mask) !== 0;
}

console.log(hasAnyFlag(0b1010, 0b0010));
console.log(hasAnyFlag(0b1010, 0b0101));
~~~

**Expected output:**

~~~text
true
false
~~~

**Explanation:**

The first mask overlaps with one set bit. The second mask has no bits in common with the value. The binary notation here is just a readable way to write integer values.

## Example 18: Compare all-bits and any-bit checks

**Question:** How do you check that every bit in a mask is set?

**Code:**

~~~js
function hasAllFlags(value, mask) {
    return (value & mask) === mask;
}

const flags = 0b1010;

console.log(hasAllFlags(flags, 0b0010));
console.log(hasAllFlags(flags, 0b1010));
console.log(hasAllFlags(flags, 0b0110));
~~~

**Expected output:**

~~~text
true
true
false
~~~

**Explanation:**

The AND result must equal the full mask for every selected bit to be present. Use a nonzero test for an any-bit check and an equality test for an all-bits check.

## Summary

- Use **&**, **|**, and **^** to combine Number bits, and **~** to flip them.
- Remember that Number bitwise operations use 32-bit integer conversion rules.
- Use **>>** for sign-filling shifts and **>>>** for zero-filling unsigned shifts on Number values.
- Use parentheses around bitmask expressions when comparing their results.
- Use BigInt for intentional bit operations on integers outside Number's 32-bit bitwise range.
- Keep Number and BigInt operands separate.
- Use bit flags only when the compact bit representation makes the code clearer or is required by a format.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [28 - Optional chaining and nullish coalescing](../lessons/028-optional-chaining-and-nullish-coalescing.md) | [Open lesson](../lessons/029-bitwise-operators-and-integer-operations.md) | [Open Q&A](../qnas/029-bitwise-operators-and-integer-operations.md) | [30 - Conditional statements](../lessons/030-conditional-statements.md) |

