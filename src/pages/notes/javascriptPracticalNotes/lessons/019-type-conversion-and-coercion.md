# 19 - Type conversion and coercion

A JavaScript value can be converted from one type to another. When your code requests the conversion directly, it is **explicit conversion**. When the language performs it as part of an operation, it is **implicit conversion**, also called **coercion**.

Knowing when conversion happens helps explain results such as **"5" + 2** producing **"52"**, while **"5" - 2** produces **3**. It also helps you validate input before converting it.

## Explicit and implicit conversion

Explicit conversion is visible in your code:

~~~js
const count = Number("12");
const label = String(12);
const enabled = Boolean(1);

console.log(count); // 12
console.log(label); // "12"
console.log(enabled); // true
~~~

Implicit conversion happens because an operator or expression expects a certain kind of value:

~~~js
console.log("12" - 2); // 10
console.log("12" + 2); // "122"
~~~

The subtraction operator converts the string to a number. The addition operator sees a string operand and concatenates strings.

For predictable code, convert values at the point where you receive them and validate that the result matches your requirements.

## Convert values to numbers with Number

The **Number(value)** function explicitly converts a value to a Number:

~~~js
console.log(Number("42")); // 42
console.log(Number(" 42 ")); // 42
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number("hello")); // NaN
~~~

A string must represent a complete numeric value for **Number** to convert it successfully:

~~~js
console.log(Number("12")); // 12
console.log(Number("12px")); // NaN
console.log(Number("")); // 0
console.log(Number("   ")); // 0
~~~

Empty or whitespace-only strings convert to zero. If empty user input should be rejected, check it before calling **Number**.

Boolean values convert to **1** or **0**. **null** converts to **0**, while **undefined** converts to **NaN**. These conversions are language rules, not necessarily the meaning your application wants, so validate inputs explicitly.

### Number conversion and arrays

Objects are first converted to primitive values. This can produce results that surprise you:

~~~js
console.log(Number([])); // 0
console.log(Number([5])); // 5
console.log(Number([1, 2])); // NaN

console.log(String([1, 2])); // "1,2"
~~~

An empty array becomes an empty string during its primitive conversion, and an empty string becomes zero when converted to a Number. A one-item array such as **[5]** becomes the string **"5"**. An array with multiple comma-separated items does not become a numeric string.

Do not rely on these indirect conversions in application logic. Convert and validate the specific input format you intend to accept.

### Unary plus

The unary plus operator also converts its operand to a Number:

~~~js
console.log(+"42"); // 42
console.log(+true); // 1
~~~

It is concise, but **Number(value)** is often clearer to readers. Unary plus throws a **TypeError** for a BigInt:

~~~js
// This throws a TypeError:
// console.log(+1n);
~~~

The explicit **Number(1n)** conversion is allowed, but large BigInt values may lose precision when represented as Numbers.

## Number, parseInt, and parseFloat

**Number(value)** converts the whole string as one numeric value. **parseInt** and **parseFloat** read a numeric prefix:

~~~js
console.log(Number("24px")); // NaN
console.log(Number.parseInt("24px", 10)); // 24
console.log(Number.parseFloat("3.5rem")); // 3.5
~~~

**parseInt** stops when it reaches a character that is not part of its integer. **parseFloat** can keep a fractional part. Pass a radix such as **10** to **Number.parseInt** when parsing a decimal integer.

These functions can be useful when the input format intentionally allows a numeric prefix. They do not validate that the entire string contains only a number. For strict validation, use **Number** and check the result:

~~~js
function readFiniteNumber(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return null;
  }

  const value = Number(text);

  if (!Number.isFinite(value)) {
    return null;
  }

  return value;
}

console.log(readFiniteNumber("24")); // 24
console.log(readFiniteNumber("24px")); // null
console.log(readFiniteNumber("")); // null
~~~

This helper chooses **null** to represent rejected input. Your own program can return an error object or use another clear result.

## Convert values to strings with String

The **String(value)** function explicitly converts a value to text:

~~~js
console.log(String(42)); // "42"
console.log(String(true)); // "true"
console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"
console.log(String(NaN)); // "NaN"
~~~

A template literal also inserts a value into text:

~~~js
const score = 7;
const message = `Your score is ${score}`;

console.log(message); // "Your score is 7"
~~~

Objects have their own primitive conversion behavior. For example, an ordinary object often converts to **"[object Object]"**, while an array converts its items to comma-separated text:

~~~js
console.log(String({})); // "[object Object]"
console.log(String([1, 2, 3])); // "1,2,3"
~~~

This is not a JSON serialization format. Use **JSON.stringify** when you need JSON text, and handle values such as circular objects or unsupported values according to your data requirements.

## Convert values to Booleans

Use **Boolean(value)** for an explicit truthiness conversion:

~~~js
console.log(Boolean("hello")); // true
console.log(Boolean("")); // false
console.log(Boolean(0)); // false
console.log(Boolean([])); // true
~~~

The same truthiness rules apply in **if** conditions. See the previous chapter for the complete falsy value list and common mistakes.

A Boolean conversion answers whether a value is truthy. It does not validate that the value is a Boolean primitive or suitable input for a task:

~~~js
console.log(Boolean("false")); // true
console.log(typeof "false"); // "string"
~~~

The string remains a string. **Boolean()** returns a Boolean result without changing the original value.

## Convert values to BigInt

**BigInt(value)** explicitly converts supported values to BigInt:

~~~js
console.log(BigInt("9007199254740993")); // 9007199254740993n
console.log(BigInt(42)); // 42n
~~~

A string must contain an integer representation. A decimal fraction string cannot be converted to BigInt:

~~~js
// This throws a SyntaxError:
// console.log(BigInt("4.2"));
~~~

A Number input must have an integral value. A non-integral Number such as **4.2** throws a **RangeError**:

~~~js
// This throws a RangeError:
// console.log(BigInt(4.2));
~~~

Converting an already rounded, unsafe Number to BigInt cannot restore the precision that was lost when the Number was created. When precision matters, read the integer text directly as BigInt.

Do not mix BigInt and Number values in ordinary arithmetic:

~~~js
console.log(1n + 2n); // 3n

// This throws a TypeError because the operand types are mixed:
// console.log(1n + 2);
~~~

Convert deliberately so both operands use the numeric type your calculation requires.

## Implicit conversion in arithmetic

Subtraction, multiplication, and division generally convert operands to numeric values. For example:

~~~js
console.log("8" - 3); // 5
console.log("4" * 2); // 8
console.log("12" / 3); // 4
~~~

If a string cannot be converted to a useful Number, the calculation may produce **NaN**:

~~~js
console.log("eight" - 3); // NaN
~~~

The addition operator **+** can perform numeric addition or string concatenation:

~~~js
console.log(5 + 2); // 7
console.log("5" + 2); // "52"
console.log(5 + "2"); // "52"
console.log("5" - 2); // 3
~~~

If primitive conversion produces a string operand, **+** concatenates. Otherwise, it performs numeric addition, subject to the Number and BigInt rules.

This difference is a common source of bugs when values come from form fields, APIs, or other sources that provide text.

## Where implicit conversion happens

Common conversion contexts include:

| Context | Conversion behavior | Example |
| --- | --- | --- |
| **if** condition | Uses truthiness | **if ("ready")** |
| Arithmetic such as **-**, **\***, and **/** | Converts operands to numeric values | **"8" - 3** |
| Addition **+** | Concatenates if primitive operands include a string; otherwise adds numbers or BigInts | **"5" + 2** |
| Template literal interpolation | Converts inserted values to text | A score inserted into a template literal |
| Explicit **Number(value)** | Converts to Number | **Number("8")** |
| Explicit **String(value)** | Converts to text | **String(8)** |

Loose equality also has conversion rules, but those belong with equality and comparison in the next chapter. Prefer strict equality when you do not want those conversions.

## Objects convert to primitive values

When an operation needs a primitive from an object, JavaScript may call conversion methods such as **valueOf()**, **toString()**, or **Symbol.toPrimitive**:

~~~js
const measurement = {
  value: 10,

  valueOf() {
    return this.value;
  },

  toString() {
    return "ten";
  }
};

console.log(Number(measurement)); // 10
console.log(String(measurement)); // "ten"
console.log(measurement + 1); // 11
~~~

The requested conversion can influence which method is tried first. A custom **Symbol.toPrimitive** method can control conversion more directly:

~~~js
const token = {
  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return "token";
    }

    return 5;
  }
};

console.log(String(token)); // "token"
console.log(Number(token)); // 5
console.log(token + 1); // 6
~~~

A conversion method must return a primitive value. Returning another object causes a **TypeError**. Since conversions can call user-defined methods, an object conversion can also have side effects. Keep custom conversion behavior simple and predictable.

## Convert and validate external input

Values read from text inputs are strings, even when the user typed digits. Convert them explicitly and then apply the checks the program requires:

~~~js
function parseQuantity(rawValue) {
  if (typeof rawValue !== "string" || rawValue.trim() === "") {
    return null;
  }

  const quantity = Number(rawValue);

  if (!Number.isSafeInteger(quantity) || quantity < 0) {
    return null;
  }

  return quantity;
}

console.log(parseQuantity("12")); // 12
console.log(parseQuantity("0")); // 0
console.log(parseQuantity("2.5")); // null
console.log(parseQuantity("-1")); // null
console.log(parseQuantity("12 items")); // null
~~~

This function accepts a non-negative safe integer. It checks for empty input before conversion because **Number("")** would otherwise become zero.

Conversion and validation are separate steps:

1. Decide which input formats are allowed.
2. Convert the input explicitly.
3. Check type, finiteness, range, and any domain-specific rules.
4. Handle invalid input deliberately.

## Common mistakes

- **Assuming Number parses only a numeric prefix:** **Number("12px")** returns **NaN**. Prefix parsing is what **parseInt** and **parseFloat** do.
- **Forgetting empty text becomes zero with Number:** check required text before converting it.
- **Treating Number(null) as an error:** it returns zero. Validate whether null is an allowed input before conversion.
- **Treating Number(undefined) as zero:** it returns **NaN**.
- **Assuming + always adds:** a string operand can make it concatenate.
- **Assuming every arithmetic operator concatenates strings:** subtraction, multiplication, and division use numeric conversion.
- **Assuming parseInt validates a whole string:** it accepts an integer prefix and stops at later characters.
- **Mixing BigInt and Number in arithmetic:** convert deliberately to one numeric type.
- **Using String(object) as JSON:** ordinary objects commonly become **"[object Object]"**.
- **Assuming conversion validates data:** check the converted result and the rules your application needs.
- **Forgetting that object conversion can call methods:** custom conversion methods can return values, throw errors, or cause side effects.

## Try it yourself

1. Compare **Number("15")**, **Number(" 15 ")**, **Number("")**, and **Number("15px")**.
2. Compare **Number(null)** with **Number(undefined)** and explain the different results.
3. Compare **Number.parseInt("15px", 10)** with **Number("15px")**.
4. Predict the results of **"6" + 2**, **"6" - 2**, **"6" * 2**, and **"6" / 2**.
5. Convert a Boolean, an array, and an ordinary object with **String()**.
6. Convert **"false"** with **Boolean()** and explain why it is true.
7. Convert an integer string with **BigInt()**. Then try a decimal string and handle its error.
8. Try adding a BigInt and a Number. Convert one operand explicitly and explain why.
9. Add **valueOf()** and **toString()** methods to an object and observe how **Number()**, **String()**, and **+** convert it.
10. Write a parser for a non-negative integer. Reject empty text, fractions, negative values, and strings with trailing characters.

## Key points

- Explicit conversion is visible in code, such as **Number(value)** or **String(value)**.
- Implicit conversion, or coercion, happens when an operation converts a value automatically.
- **Number** converts a complete numeric string and returns **NaN** for invalid numeric text.
- **Number("")** and **Number("   ")** return zero, so check empty input when needed.
- **parseInt** and **parseFloat** read numeric prefixes rather than validating the full string.
- **+** can concatenate strings or perform numeric addition.
- **Boolean(value)** uses truthiness. It does not change the original value or validate its domain.
- BigInt and Number arithmetic require a deliberate choice of numeric type.
- Objects can define primitive conversion with **valueOf()**, **toString()**, or **Symbol.toPrimitive**.
- Convert external input explicitly, then validate the converted value against the actual requirements.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [18 - typeof, instanceof, and reliable type checks](018-typeof-instanceof-and-reliable-type-checks.md) | [Open Q&A](../qnas/019-type-conversion-and-coercion.md) | [Open example](../examples/019-type-conversion-and-coercion.md) | [20 - Equality, comparison, and relational operators](020-equality-comparison-and-relational-operators.md) |
