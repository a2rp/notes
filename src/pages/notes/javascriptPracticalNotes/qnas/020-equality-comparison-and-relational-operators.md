# 20 - Equality, comparison, and relational operators

This Q&A reviews strict and loose equality, object identity, relational comparisons, string ordering, **NaN**, BigInt comparisons, range checks, and common mistakes. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is the result of **7 === "7"**?

A. **true**  
B. **false**  
C. **"7"**  
D. It throws a TypeError.

**Answer: B. false.**

Strict equality does not convert operands to the same type. One operand is a Number and the other is a String.

### 2. What is the result of **7 == "7"**?

A. **true**  
B. **false**  
C. **NaN**  
D. It throws a TypeError.

**Answer: A. true.**

Loose equality applies conversion rules. Here, the numeric string is compared with the Number value.

### 3. Which operators are strict equality and strict inequality?

A. **==** and **!=**  
B. **===** and **!==**  
C. **<** and **>**  
D. **=** and **!**

**Answer: B. === and !==.**

These operators compare without converting one operand to another type first.

### 4. What does **0 == false** evaluate to?

A. **true**  
B. **false**  
C. **0**  
D. It throws a TypeError.

**Answer: A. true.**

For this loose equality comparison, the Boolean is converted to a Number. **false** becomes **0**.

### 5. What does **null == undefined** evaluate to?

A. **true**  
B. **false**  
C. **null**  
D. It depends on the browser.

**Answer: A. true.**

The loose equality rules define this special pairing. It does not mean that **null** or **undefined** is loosely equal to zero.

### 6. What does **null == 0** evaluate to?

A. **true**  
B. **false**  
C. **0**  
D. It throws a TypeError.

**Answer: B. false.**

The special loose equality rule pairs **null** with **undefined**. It does not convert **null** to zero for this equality comparison.

### 7. What is the result of **NaN === NaN**?

A. **true**  
B. **false**  
C. **NaN**  
D. It throws a TypeError.

**Answer: B. false.**

The Number value **NaN** is not equal to any value, including itself. **Object.is(NaN, NaN)** is **true** if that particular equality rule is wanted.

### 8. What is the result of **+0 === -0**?

A. **true**  
B. **false**  
C. **NaN**  
D. It depends on the platform.

**Answer: A. true.**

Strict equality treats positive zero and negative zero as equal. **Object.is(+0, -0)** returns **false**.

### 9. What is the result of **({}) === ({})**?

A. **true**, because both objects have the same contents  
B. **false**, because each object literal creates a different object  
C. **true**, because all empty objects are shared  
D. It throws a TypeError.

**Answer: B. false.**

Objects compare by identity. These two literals create distinct objects. Compare a reference with itself to get **true**.

### 10. What does **"20" < "3"** evaluate to?

A. **true**, because 20 is less than 3  
B. **false**, because 20 is greater than 3  
C. **true**, because both operands are strings and are compared lexicographically  
D. It throws a TypeError.

**Answer: C. true.**

When both primitive operands are strings, JavaScript compares their UTF-16 code units lexicographically. The first character **"2"** sorts before **"3"**.

### 11. What does **"20" < 3** evaluate to?

A. **true**  
B. **false**  
C. **"203"**  
D. It throws a TypeError.

**Answer: B. false.**

The operands are not both strings, so numeric comparison applies. The string converts to Number **20**, and **20 < 3** is false.

### 12. What does **"hello" < 5** evaluate to?

A. **true**  
B. **false**  
C. **NaN**  
D. It throws a TypeError.

**Answer: B. false.**

The string cannot convert to a valid Number, so the numeric comparison involves **NaN**. Relational comparisons involving **NaN** are false.

### 13. What is the result of **NaN >= 0**?

A. **true**  
B. **false**  
C. **NaN**  
D. It throws a TypeError.

**Answer: B. false.**

All relational comparisons involving **NaN** are false, including **<=** and **>=**.

### 14. What does **1n == 1** evaluate to?

A. **true**  
B. **false**  
C. It returns **1n**.  
D. It throws a TypeError.

**Answer: A. true.**

The loose equality rules can compare a BigInt and a Number by numeric value. This is equality only. Mixed BigInt and Number arithmetic, such as **1n + 1**, throws a TypeError.

### 15. What does **1n === 1** evaluate to?

A. **true**  
B. **false**  
C. **1**  
D. It throws a TypeError.

**Answer: B. false.**

The operands have different types, and strict equality does not convert them.

### 16. Which condition correctly checks whether **score** is between 50 and 100 inclusive?

A. **50 <= score <= 100**  
B. **score >= 50 && score <= 100**  
C. **score >= 50 || score <= 100**  
D. **score === 50 === 100**

**Answer: B. score >= 50 && score <= 100.**

JavaScript does not interpret a chained comparison as mathematical interval notation. Write each comparison separately and combine them with **&&**.

### 17. What is the result of **[] == 0**?

A. **true**  
B. **false**  
C. **[]**  
D. It throws a TypeError.

**Answer: A. true.**

In this loose comparison the array is converted to a primitive, producing an empty string, and the empty string converts to zero. This is a useful example of why accidental reliance on **==** is confusing.

### 18. What does **Object.is(+0, -0)** return?

A. **true**  
B. **false**  
C. **0**  
D. It throws a TypeError.

**Answer: B. false.**

Unlike **===**, **Object.is()** distinguishes positive zero from negative zero.

## Predict the result

### 19. What does this code print?

~~~js
const first = { id: 1 };
const second = first;

console.log(first === second);
~~~

**Answer: It prints true.**

Both variables refer to the same object. Object equality checks identity, not the variable names.

### 20. What does this code print?

~~~js
console.log([1, 2] === [1, 2]);
~~~

**Answer: It prints false.**

The two array literals create separate array objects. Their equal elements do not make the array references identical.

### 21. What does this code print?

~~~js
console.log("" == 0);
console.log("0" == false);
~~~

**Answer: It prints true, then true.**

In these loose comparisons, the string and Boolean operands are converted according to the equality rules. The empty string and **false** both compare as zero in these cases.

### 22. What does this code print?

~~~js
console.log(null == undefined);
console.log(undefined == 0);
~~~

**Answer: It prints true, then false.**

Only the first line uses the special nullish pairing. **undefined** is not loosely equal to zero.

### 23. What does this code print?

~~~js
console.log("10" < "2");
console.log("10" < 2);
~~~

**Answer: It prints true, then false.**

The first comparison is between two strings, so it is lexicographic. The second uses numeric comparison, so **10 < 2** is false.

### 24. What does this code print?

~~~js
console.log(NaN < 1);
console.log(NaN <= 1);
console.log(NaN > 1);
console.log(NaN >= 1);
~~~

**Answer: It prints false on all four lines.**

Every relational comparison involving **NaN** is false.

### 25. What does this code print?

~~~js
console.log(3 < 2 < 1);
~~~

**Answer: It prints true.**

First **3 < 2** produces **false**. Then **false < 1** converts **false** to zero, and **0 < 1** is true. Use **3 < 2 && 2 < 1** when you mean two comparisons.

### 26. What does this code print?

~~~js
console.log(1n < 2);
console.log(2n < 2);
~~~

**Answer: It prints true, then false.**

Relational comparison can compare a BigInt and a Number. In the second line both represent the same numeric value, so the strict less-than relation is false.

### 27. What does this code print?

~~~js
console.log(Object.is(NaN, NaN));
console.log(Object.is(+0, -0));
~~~

**Answer: It prints true, then false.**

**Object.is()** treats **NaN** as equal to itself and distinguishes positive and negative zero.

### 28. What does this code print?

~~~js
const value = "ready";

console.log(value === "ready");
console.log(value === true);
~~~

**Answer: It prints true, then false.**

Strict equality checks both the value and type. A string does not equal a Boolean.

## True or false

### 29. Strict equality converts a string to a number when needed.

**Answer: False.**

That kind of coercion may occur with **==**, but **===** does not convert the operands.

### 30. Two objects with the same properties are always strictly equal.

**Answer: False.**

Objects are compared by identity. Separate objects remain different even when their properties match.

### 31. If **a < b** is false, then **a >= b** must be true.

**Answer: False.**

If a comparison involves **NaN**, both **a < b** and **a >= b** can be false.

### 32. If both operands of a relational comparison are strings, JavaScript compares them numerically.

**Answer: False.**

Two strings are compared lexicographically by UTF-16 code units.

### 33. **Object.is(NaN, NaN)** returns true.

**Answer: True.**

This is one of the differences between **Object.is()** and **===**.

### 34. The expression **low < value < high** checks whether **value** is between **low** and **high**.

**Answer: False.**

The first comparison returns a Boolean, which becomes the left operand of the second comparison. Use **value > low && value < high**.

## Short-answer questions

### 35. What is the practical difference between **===** and **==**?

**Answer:** **===** compares without coercing the operands. **==** applies specific coercion rules when operand types differ.

Prefer strict equality for clear, predictable comparisons. Use loose equality only when its exact behavior is intentional.

### 36. Why can **NaN** make ordinary comparison logic fail?

**Answer:** **NaN** is unequal to itself, and every relational comparison involving it returns false.

For example, checking only **value < 0** and **value >= 0** does not classify **NaN**. Use **Number.isNaN(value)** when the value might be NaN.

### 37. How can you test whether a value is either **null** or **undefined**?

**Answer:** Write **value === null || value === undefined** for an explicit check. A deliberate **value == null** check also matches both.

Choose the explicit or compact form consistently with the project's conventions.

### 38. Why does **Object.is(+0, -0)** differ from **+0 === -0**?

**Answer:** Strict equality treats the two zero values as equal. **Object.is()** distinguishes their signs.

Use **Object.is()** when that distinction matters, such as in code that specifically handles signed zero.

### 39. What does lexicographic comparison mean for strings?

**Answer:** JavaScript compares the UTF-16 code units from left to right until it finds a difference or one string ends.

It does not interpret numeric-looking text as numbers and is not locale-aware sorting.

### 40. Why should code avoid comparing objects with **==**?

**Answer:** Loose equality may convert an object to a primitive, and the conversion can be surprising or can run user-defined conversion methods.

Use strict identity comparison for references, or compare the specific data fields that define equality for the application.

## Coding questions

### 41. Write a condition that checks whether a number is from 1 through 10, including both endpoints.

**Answer:**

~~~js
const isInRange = value >= 1 && value <= 10;
~~~

The two comparisons test the lower and upper bounds. **&&** requires both to be true.

### 42. Write a function that accepts only a Number that is not NaN and is between zero and one hundred inclusive.

**Answer:**

~~~js
function isValidScore(value) {
    return typeof value === "number"
        && !Number.isNaN(value)
        && value >= 0
        && value <= 100;
}
~~~

The type check rejects strings and other types. The explicit NaN check documents intent, and the range comparisons reject infinities.

### 43. Write a check that treats only the exact string **"active"** as active.

**Answer:**

~~~js
const isActive = status === "active";
~~~

Strict equality ensures values such as **true**, **1**, and other strings do not match.

### 44. Rewrite this comparison so it means “the value is less than 5 and at least 0.”

~~~js
0 <= value < 5
~~~

**Answer:**

~~~js
value >= 0 && value < 5
~~~

JavaScript does not chain relational operators mathematically. Check each boundary directly.

### 45. Write a check that accepts either **null** or **undefined**, but does not accept zero or an empty string.

**Answer:**

~~~js
const isMissing = value === null || value === undefined;
~~~

A deliberate **value == null** also accepts exactly the nullish pair under the loose equality rules. Strict comparisons make the two accepted values explicit.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [19 - Type conversion and coercion](../lessons/019-type-conversion-and-coercion.md) | [Open lesson](../lessons/020-equality-comparison-and-relational-operators.md) | [Open example](../examples/020-equality-comparison-and-relational-operators.md) | [21 - Numbers, floating point, and safe integers](../lessons/021-numbers-floating-point-and-safe-integers.md) |