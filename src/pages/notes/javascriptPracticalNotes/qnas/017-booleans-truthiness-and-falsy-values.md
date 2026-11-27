# 17 - Booleans, truthiness, and falsy values

This Q&A reviews Boolean values, truthiness, falsy values, conditional checks, and the behavior of **!**, **&&**, **||**, and **??**. Each answer follows its question so you can check your understanding as you go.

## Multiple-choice questions

### 1. Which two values are Boolean primitives?

A. **"true"** and **"false"**  
B. **true** and **false**  
C. **1** and **0**  
D. **null** and **undefined**

**Answer: B. true and false.**

The strings **"true"** and **"false"** are strings, while **1** and **0** are numbers. JavaScript Boolean values are **true** and **false**.

### 2. Which value is falsy?

A. **"0"**  
B. **[]**  
C. **0**  
D. **{}**

**Answer: C. 0.**

The string **"0"**, an empty array, and an empty object are truthy. The number zero is falsy.

### 3. What does **Boolean("false")** return?

A. **false**  
B. **true**  
C. **"false"**  
D. It throws an error.

**Answer: B. true.**

The input is a non-empty string. JavaScript does not parse the text as a Boolean value during Boolean conversion.

### 4. Which value is truthy?

A. **NaN**  
B. **""**  
C. **0n**  
D. **" "**  

**Answer: D. " ".**

This string contains a space character, so it is not empty. **NaN**, the empty string, and zero BigInt are falsy.

### 5. What is the result of **Boolean([])**?

A. **false**, because the array has no items  
B. **true**, because arrays are objects  
C. **undefined**  
D. It depends on the array's length.

**Answer: B. true.**

All ordinary arrays are truthy, including empty arrays. To check whether an array has items, inspect its **length** instead.

### 6. Which operator returns the opposite truthiness as a Boolean?

A. **&&**  
B. **||**  
C. **!**  
D. **??**

**Answer: C. !**

The NOT operator converts the operand's truthiness to a Boolean and returns its opposite.

### 7. What does **0 || 8** evaluate to?

A. **0**  
B. **8**  
C. **true**  
D. **false**

**Answer: B. 8.**

Logical OR returns its left operand only when that operand is truthy. Zero is falsy, so the expression evaluates and returns the right operand.

### 8. What does **0 ?? 8** evaluate to?

A. **0**  
B. **8**  
C. **true**  
D. **undefined**

**Answer: A. 0.**

Nullish coalescing uses the right operand only when the left operand is **null** or **undefined**. Zero is preserved.

### 9. What does **"ready" && 12** return?

A. **true**  
B. **"ready"**  
C. **12**  
D. **false**

**Answer: C. 12.**

The left operand is truthy, so **&&** evaluates and returns the right operand. Logical AND does not have to return a Boolean.

### 10. What is the result of **Boolean(new Boolean(false))**?

A. **false**  
B. **true**  
C. **null**  
D. It throws an error.

**Answer: B. true.**

**new Boolean(false)** creates an object. Objects are truthy, even when the Boolean value wrapped inside the object is false. Avoid Boolean wrapper objects.

## True or false

### 11. An empty string is falsy.

**Answer: True.**

The string **""** has no characters, so it is one of JavaScript's ordinary falsy values.

### 12. A string containing one space is falsy.

**Answer: False.**

The string **" "** contains a character, so it is truthy. If whitespace-only text should count as empty, trim it or check it explicitly.

### 13. Empty arrays and empty objects are falsy.

**Answer: False.**

Both **[]** and **{}** are truthy. Their lack of contents does not change their truthiness.

### 14. Every non-empty string is truthy, including **"false"** and **"0"**.

**Answer: True.**

Truthiness does not parse the contents of a string. Both examples contain characters.

### 15. The value **-0** is truthy because it has a minus sign.

**Answer: False.**

Negative zero is falsy, just like positive zero.

### 16. The value **0n** is falsy.

**Answer: True.**

Zero BigInt is a falsy value. A non-zero BigInt such as **1n** is truthy.

### 17. Calling **Boolean(value)** changes the value stored in the variable.

**Answer: False.**

It returns a Boolean conversion result but does not modify the original value.

### 18. **&&** and **||** always return Boolean values.

**Answer: False.**

They use truthiness to choose an operand and return that operand. For example, **"ready" && 12** returns the number **12**.

### 19. **||** skips its right operand when its left operand is truthy.

**Answer: True.**

This is short-circuit evaluation. When the left operand is truthy, it is returned and the right operand is not evaluated.

### 20. A truthy value is always valid input for a function that expects a positive number.

**Answer: False.**

Non-empty strings, arrays, and objects are truthy, but they are not positive numbers. Validation should check the expected type and the required range.

## Predict the result

### 21. What does this code print?

~~~js
console.log(Boolean(""));
console.log(Boolean("JavaScript"));
~~~

**Answer:**

~~~text
false
true
~~~

The first string is empty. The second string contains characters.

### 22. What does this code print?

~~~js
console.log(Boolean("0"));
console.log(Boolean(0));
~~~

**Answer:**

~~~text
true
false
~~~

The first value is a non-empty string. The second value is the number zero.

### 23. What does this code print?

~~~js
console.log(Boolean([]));
console.log(Boolean({}));
~~~

**Answer:**

~~~text
true
true
~~~

Arrays and objects are truthy even when they contain no items or properties.

### 24. Which branch runs?

~~~js
if (NaN) {
  console.log("yes");
} else {
  console.log("no");
}
~~~

**Answer:** The **else** branch runs and prints **no**.

**NaN** is falsy, so the condition is treated as false.

### 25. What does this code print?

~~~js
console.log(!"");
console.log(!"hello");
~~~

**Answer:**

~~~text
true
false
~~~

The empty string is falsy, so its negation is true. A non-empty string is truthy, so its negation is false.

### 26. What does this code print?

~~~js
console.log("name" && 0);
console.log("" && "fallback");
~~~

**Answer:**

~~~text
0

~~~

For the first expression, the left operand is truthy, so **&&** returns **0**. For the second expression, the left operand is falsy, so **&&** returns the empty string. That second result produces a blank line when logged.

### 27. What does this code print?

~~~js
console.log("first" || "second");
console.log("" || "second");
~~~

**Answer:**

~~~text
first
second
~~~

Logical OR returns the first truthy operand. An empty string is falsy, so the second expression returns **"second"**.

### 28. Which messages appear?

~~~js
false && console.log("A");
true || console.log("B");
true && console.log("C");
~~~

**Answer:** Only **C** appears.

In the first expression, **false** short-circuits **&&**. In the second, **true** short-circuits **||**. In the third, the left side is truthy, so the function call on the right runs.

### 29. What are the values of **first** and **second**?

~~~js
const count = 0;
const first = count || 5;
const second = count ?? 5;
~~~

**Answer:** **first** is **5** and **second** is **0**.

Logical OR replaces every falsy value. Nullish coalescing replaces only **null** and **undefined**.

### 30. Which value does this code print?

~~~js
const label = false || "enabled";
console.log(label);
~~~

**Answer:** **enabled**

The left operand is false, so logical OR evaluates and returns the right operand.

## Short-answer questions

### 31. What is the difference between a Boolean value and a truthy value?

**Answer:** A Boolean value is specifically **true** or **false**. A truthy value can have another type, such as a non-empty string, number, array, or object, but JavaScript treats it as true in a condition.

For example, **"hello"** is a string and is truthy. It does not become the Boolean value **true**.

### 32. List the ordinary falsy values in JavaScript.

**Answer:** **false**, **0**, **-0**, **0n**, **""**, **null**, **undefined**, and **NaN**.

In browsers, the legacy **document.all** value is an additional compatibility exception. New code should not depend on it.

### 33. Why is **if (count)** potentially wrong when zero is a valid count?

**Answer:** Zero is falsy, so the condition fails even though **0** may be a valid count.

Check the actual rule instead. For example, **count >= 0** accepts zero and positive counts.

### 34. When should **??** be used instead of **||** for a fallback?

**Answer:** Use **??** when a fallback should be selected only for **null** or **undefined**.

Use **||** when every falsy value should select the fallback. If **0**, **false**, or **""** is valid and must be preserved, **||** may be too broad.

### 35. What does short-circuit evaluation mean?

**Answer:** JavaScript stops evaluating a logical expression once the left operand determines which operand the operator must return.

For example, **false && expression** does not evaluate **expression**, and **true || expression** also skips it.

### 36. Why does **Boolean(new Boolean(false))** return true?

**Answer:** The **new Boolean(false)** expression creates an object. The object itself is truthy, regardless of the false value it wraps.

Use primitive **true** and **false** values instead of constructing Boolean objects.

### 37. Is a truthy string necessarily non-empty after trimming?

**Answer:** No. A whitespace-only string such as **"   "** is truthy before trimming.

Use **text.trim().length > 0** when whitespace-only text should count as empty.

### 38. Does **!value** specifically check whether a value is null?

**Answer:** No. It is true for any falsy value, including **false**, both zeros, **0n**, the empty string, **null**, **undefined**, and **NaN**.

Use **value === null** to check specifically for null.

## Coding questions

### 39. Write a function that returns whether a value is a positive number.

**Answer:**

~~~js
function isPositiveNumber(value) {
  return typeof value === "number" && value > 0;
}
~~~

The type check rejects strings and other non-number values. The comparison rejects zero, negative numbers, and **NaN** because comparisons with **NaN** are false.

### 40. Write a function that reports whether a text value contains non-whitespace characters.

**Answer:**

~~~js
function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}
~~~

The type check prevents calling **trim()** on a non-string. Trimming removes whitespace from the ends, and the length check ensures at least one character remains.

### 41. Write a function that uses a default volume of 50 only when the provided value is null or undefined.

**Answer:**

~~~js
function getVolume(savedVolume) {
  return savedVolume ?? 50;
}

console.log(getVolume(0));         // 0
console.log(getVolume(undefined)); // 50
console.log(getVolume(null));      // 50
~~~

Nullish coalescing preserves valid falsy values such as **0**. It uses the fallback for **null** and **undefined**.

### 42. Rewrite this check so a count of zero is accepted and negative counts are rejected.

~~~js
if (count) {
  console.log("Count is valid");
}
~~~

**Answer:**

~~~js
if (typeof count === "number" && count >= 0) {
  console.log("Count is valid");
}
~~~

The original condition rejects zero because zero is falsy. The revised condition checks the expected type and accepts zero or any positive number.

### 43. Write a function that returns **true** only when an array has at least one item.

**Answer:**

~~~js
function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}
~~~

An empty array is truthy, so checking **if (value)** is not enough. Check both that the value is an array and that its length is greater than zero.

### 44. Write a function that returns a Boolean indicating whether a username is a non-empty string after trimming.

**Answer:**

~~~js
function hasUsername(value) {
  return typeof value === "string" && value.trim().length > 0;
}
~~~

The function rejects non-string values and strings that are empty or contain only whitespace. It returns a Boolean because the expression uses type and numeric comparisons.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [16 - undefined, null, and NaN](../lessons/016-undefined-null-and-nan.md) | [Open lesson](../lessons/017-booleans-truthiness-and-falsy-values.md) | [Open example](../examples/017-booleans-truthiness-and-falsy-values.md) | [18 - typeof, instanceof, and reliable type checks](../lessons/018-typeof-instanceof-and-reliable-type-checks.md) |
