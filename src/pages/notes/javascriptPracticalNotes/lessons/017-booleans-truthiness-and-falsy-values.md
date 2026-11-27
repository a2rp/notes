# 17 - Booleans, truthiness, and falsy values

JavaScript has two Boolean values: **true** and **false**. Conditions can also use values of other types. JavaScript treats each value as either **truthy** or **falsy** when a Boolean condition needs to be evaluated.

Understanding this behavior helps you write clear conditions and avoid accidentally treating a valid value such as **0**, **false**, or an empty string as missing.

## Boolean values

A Boolean value represents a yes-or-no result:

~~~js
const isPublished = true;
const hasErrors = false;

console.log(isPublished); // true
console.log(hasErrors); // false
~~~

Boolean values are useful for describing a state or the result of a comparison:

~~~js
const temperature = 22;
const isWarm = temperature > 20;

console.log(isWarm); // true
~~~

The comparison produces a Boolean. The original values used in the comparison keep their original types.

## Truthiness

A value is **truthy** if JavaScript treats it as true in a condition. A value is **falsy** if JavaScript treats it as false.

~~~js
if ("hello") {
  console.log("This condition runs");
}

if (0) {
  console.log("This condition does not run");
}
~~~

The string is truthy and zero is falsy. The **if** statement evaluates each value as a condition. It does not change the value stored in the variable.

Truthiness is not a separate data type. For example, **"hello"** is still a string even though it is truthy.

## Falsy values

These ordinary JavaScript values are falsy:

| Value | Example | Notes |
| --- | --- | --- |
| **false** | **false** | The Boolean value false |
| Positive zero | **0** or **+0** | A Number value |
| Negative zero | **-0** | Also falsy |
| Zero BigInt | **0n** | A BigInt value |
| Empty string | **""** or **''** | A string with no characters |
| **null** | **null** | An intentionally absent value |
| **undefined** | **undefined** | An unassigned or missing value |
| **NaN** | **NaN** | A special Number value |

~~~js
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(-0));        // false
console.log(Boolean(0n));        // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false
~~~

Whitespace is still a character, so a string containing spaces is not empty:

~~~js
console.log(Boolean(""));  // false
console.log(Boolean(" ")); // true
~~~

In browsers, the legacy value **document.all** is a special falsy object for compatibility. New code should not use it. For ordinary values, the list above covers the falsy values.

## Truthy values

Every ordinary value not in the falsy list is truthy. Common examples include:

~~~js
console.log(Boolean(true));       // true
console.log(Boolean(1));          // true
console.log(Boolean(-1));         // true
console.log(Boolean(3.14));       // true
console.log(Boolean("0"));        // true
console.log(Boolean("false"));    // true
console.log(Boolean([]));         // true
console.log(Boolean({}));         // true
console.log(Boolean(function () {})); // true
~~~

A string is truthy when it contains at least one character. JavaScript does not interpret the text **"false"** as the Boolean value **false**.

Arrays and objects are truthy even when they have no contents:

~~~js
if ([]) {
  console.log("An empty array is truthy");
}

if ({}) {
  console.log("An empty object is truthy");
}
~~~

Do not use an empty array or object as a false-like marker.

## Convert a value to Boolean

Use **Boolean(value)** when you want the truthiness result as an actual Boolean:

~~~js
console.log(Boolean("JavaScript")); // true
console.log(Boolean(""));           // false
console.log(Boolean([]));           // true
~~~

The double NOT operator also converts a value to a Boolean:

~~~js
const hasName = !!"Asha";

console.log(hasName); // true
~~~

**!!value** works because each **!** negates the truthiness result. **Boolean(value)** is often easier for beginners to read. Neither expression changes the original value.

Avoid **new Boolean(value)**. It creates an object, and objects are truthy even when the wrapped Boolean value is false:

~~~js
const wrappedFalse = new Boolean(false);

console.log(Boolean(wrappedFalse)); // true
console.log(wrappedFalse.valueOf()); // false
~~~

Use the primitive values **true** and **false**, not Boolean wrapper objects.

## Conditions use truthiness

An **if** or **while** condition can contain a Boolean expression or another value. JavaScript evaluates the condition's truthiness:

~~~js
const username = "Asha";

if (username) {
  console.log("A username was provided");
}
~~~

This is useful when any non-empty string should count as present. But it is too broad when values such as **0** or **false** are valid:

~~~js
const retryCount = 0;

if (retryCount) {
  console.log("A retry is available");
} else {
  console.log("This branch also runs when retryCount is zero");
}
~~~

If zero is a meaningful count, check the intended condition explicitly:

~~~js
if (retryCount >= 0) {
  console.log("The retry count is available");
}
~~~

To check specifically for an absent value, compare against the values your program considers absent:

~~~js
if (username !== undefined && username !== null) {
  console.log("A value was supplied, including an empty string");
}
~~~

Choose a condition that expresses the rule you need. A generic truthy check is not the same as checking whether a value exists, is valid, or has a particular type.

## The NOT operator

The logical NOT operator **!** returns a Boolean that is the opposite of a value's truthiness:

~~~js
console.log(!true);       // false
console.log(!false);      // true
console.log(!0);          // true
console.log(!"ready");   // false
~~~

For example, an empty string is falsy, so negating it produces **true**:

~~~js
const message = "";

if (!message) {
  console.log("The message is empty");
}
~~~

This pattern is concise, but remember what it checks. **!message** is true for every falsy value, including **0**, **false**, **null**, **undefined**, **NaN**, and an empty string. Use a direct comparison if only one of these should match.

## AND and OR can return operand values

The logical AND operator **&&** and logical OR operator **||** use truthiness and short-circuit evaluation. They do not necessarily return a Boolean. They return one of their operands.

### Logical OR

**left || right** returns the left operand if it is truthy. Otherwise, it evaluates and returns the right operand:

~~~js
console.log("ready" || "fallback"); // "ready"
console.log("" || "fallback");      // "fallback"
console.log(0 || 10);               // 10
~~~

This can provide a fallback, but **||** replaces every falsy value. If zero is a valid value, this may be a bug:

~~~js
const savedVolume = 0;
const volume = savedVolume || 50;

console.log(volume); // 50, even though savedVolume is zero
~~~

Use the nullish coalescing operator **??** when the fallback should apply only to **null** or **undefined**:

~~~js
const savedVolume = 0;
const volume = savedVolume ?? 50;

console.log(volume); // 0
~~~

**??** does not replace **false**, zero, or an empty string. The operators chapter discusses its rules in more detail.

### Logical AND

**left && right** returns the left operand if it is falsy. Otherwise, it evaluates and returns the right operand:

~~~js
console.log(0 && "next");       // 0
console.log("ready" && "next"); // "next"
~~~

A common use is to run an expression only when a condition is truthy:

~~~js
const isSignedIn = true;

isSignedIn && console.log("Welcome back");
~~~

For longer or important behavior, an **if** statement is often clearer:

~~~js
if (isSignedIn) {
  console.log("Welcome back");
}
~~~

### Short-circuiting

Short-circuiting means JavaScript skips the right side when the left side already determines the result:

~~~js
false && console.log("This is skipped");
true || console.log("This is also skipped");
~~~

With **&&**, a falsy left operand is returned immediately. With **||**, a truthy left operand is returned immediately. The skipped expression is not evaluated, so any function call or other side effect inside it does not happen.

## Truthiness and input validation

Truthiness can be a convenient first check, but it is not a complete validation rule. Consider a function that requires a positive number:

~~~js
function isPositiveNumber(value) {
  return typeof value === "number" && value > 0;
}

console.log(isPositiveNumber(5));  // true
console.log(isPositiveNumber(0));  // false
console.log(isPositiveNumber("5")); // false
~~~

This function checks both the type and the required range. A truthy check such as **if (value)** would accept many values that are not positive numbers, including non-empty strings, arrays, and objects.

For a required text field, decide whether whitespace-only text should count as empty. Truthiness alone treats **" "** as present:

~~~js
const input = "   ";
const hasText = input.trim().length > 0;

console.log(hasText); // false
~~~

The correct validation depends on the meaning of the input.

## Common mistakes

- **Thinking only Boolean values can appear in conditions:** other values are evaluated by their truthiness.
- **Treating "false" as false:** it is a non-empty string, so it is truthy.
- **Treating "0" as zero:** it is a non-empty string, so it is truthy.
- **Expecting empty arrays and objects to be falsy:** both are truthy.
- **Using if (count) when zero is valid:** zero takes the falsy branch.
- **Using || for a fallback when zero, false, or empty text must be preserved:** use a more specific check or ??.
- **Assuming && and || always return true or false:** they return an operand value.
- **Using !value to detect only null or undefined:** it also matches all other falsy values.
- **Using new Boolean(false):** the wrapper is an object and therefore truthy.
- **Confusing truthiness with validation:** a truthy value is not necessarily valid for a particular task.

## Try it yourself

1. Use **Boolean()** to convert **false**, **0**, **0n**, an empty string, **null**, **undefined**, and **NaN**.
2. Convert **"false"**, **"0"**, **" "**, **[]**, and **{}** to Boolean values. Explain each result.
3. Write an **if** statement that runs when a name is a non-empty string.
4. Write a check that accepts a count of zero but rejects a negative count.
5. Compare **savedValue || 10** with **savedValue ?? 10** when **savedValue** is **0**, **false**, **null**, **undefined**, and **""**.
6. Predict the result of **"hello" && 7**, then run through the expression by hand.
7. Put a function call on the right side of **false &&** and **true ||**. Confirm that neither call runs.
8. Write an input check that rejects an empty string and whitespace-only text but accepts **" JavaScript "**.
9. Explain why **Boolean(new Boolean(false))** is true.
10. Replace a generic truthy check with a condition that clearly expresses what your application actually requires.

## Key points

- Boolean primitives are **true** and **false**.
- Truthiness controls how a value is evaluated in a condition. It does not change that value's type.
- The ordinary falsy values are **false**, **0**, **-0**, **0n**, **""**, **null**, **undefined**, and **NaN**.
- Non-empty strings, arrays, and objects are truthy, including **"false"**, **"0"**, **[]**, and **{}**.
- **Boolean(value)** converts a value to a Boolean result. Avoid Boolean wrapper objects.
- **!** returns the opposite Boolean truthiness result.
- **&&** and **||** short-circuit and return operand values.
- **||** uses any falsy value as a reason to fall back. **??** falls back only for **null** and **undefined**.
- Use explicit checks when zero, false, empty text, or another falsy value has a meaningful role.
- Truthiness is not a substitute for type checks or input validation.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [16 - undefined, null, and NaN](016-undefined-null-and-nan.md) | [Open Q&A](../qnas/017-booleans-truthiness-and-falsy-values.md) | [Open example](../examples/017-booleans-truthiness-and-falsy-values.md) | [18 - typeof, instanceof, and reliable type checks](018-typeof-instanceof-and-reliable-type-checks.md) |
