# 27 - Logical operators and short-circuiting

This Q&A reviews JavaScript truthiness, logical operator results, short-circuiting, and logical assignment. Each answer follows its question.

## Multiple-choice questions

### 1. What does the **&&** operator return?

A. Always **true** or **false**  
B. One of its operand values  
C. Always the right operand  
D. An array containing both operands

**Answer: B. One of its operand values.**

It returns the left operand if it is falsy. Otherwise, it evaluates and returns the right operand.

### 2. What does the **||** operator return?

A. Always a Boolean  
B. The first truthy operand, or the final operand if none are truthy  
C. The first falsy operand  
D. Always the left operand

**Answer: B.**

If the left operand is truthy, the right operand is skipped and the left value is returned.

### 3. Which values cause **??** to evaluate and return its right operand?

A. **0** and **false**  
B. **""** and **NaN**  
C. **null** and **undefined**  
D. Every falsy value

**Answer: C. null and undefined.**

Nullish coalescing preserves meaningful falsy values such as **0**, **false**, and **""**.

### 4. Which value is truthy in JavaScript?

A. **0**  
B. **""**  
C. **NaN**  
D. **[]**

**Answer: D. [].**

Arrays and objects are truthy, even when they are empty.

### 5. What is the result of **!value**?

A. The original value  
B. A Boolean opposite of the value's truthiness  
C. The value converted to a number  
D. An exception for non-Boolean values

**Answer: B.**

The **!** operator always returns a Boolean.

### 6. When does **&&=** assign its right-hand value?

A. When the current value is falsy  
B. When the current value is truthy  
C. Only when the current value is nullish  
D. Always

**Answer: B. When the current value is truthy.**

If the current value is falsy, the right side is skipped and no assignment occurs.

### 7. When does **||=** assign its right-hand value?

A. When the current value is falsy  
B. When the current value is truthy  
C. Only when the current value is undefined  
D. Always

**Answer: A. When the current value is falsy.**

It uses truthiness, so **0**, **false**, and **""** all trigger assignment.

### 8. When does **??=** assign its right-hand value?

A. For every falsy value  
B. Only for **null** or **undefined**  
C. Only for **false**  
D. When the current value is non-empty

**Answer: B.**

It preserves values such as **0**, **false**, and **""**.

### 9. What happens to the right operand of **||** when the left operand is truthy?

A. It is evaluated first  
B. It is skipped  
C. It is converted to a Boolean and stored  
D. It is returned anyway

**Answer: B. It is skipped.**

This behavior is called short-circuit evaluation.

### 10. Which expression is valid JavaScript?

A. **value ?? fallback || other**  
B. **value && other ?? fallback**  
C. **(value ?? fallback) || other**  
D. **value || other ?? fallback**

**Answer: C. (value ?? fallback) || other.**

Parentheses are required when combining **??** directly with **&&** or **||**.

## Predict the output

### 11. What is the output?

~~~js
console.log(0 || "fallback");
console.log(0 ?? "fallback");
console.log(0 && "other");
~~~

**Answer:**

~~~text
fallback
0
0
~~~

**||** uses truthiness, **??** checks only for nullish values, and **&&** returns its falsy left operand.

### 12. What is the output?

~~~js
console.log("" || "default");
console.log("" ?? "default");
console.log(false ?? true);
~~~

**Answer:**

~~~text
default

false
~~~

The second output is an empty string, which appears as a blank line. **??** preserves both the empty string and **false**.

### 13. What is the output?

~~~js
console.log("hello" && 42);
console.log("hello" || 42);
console.log(null || "Guest");
~~~

**Answer:**

~~~text
42
hello
Guest
~~~

**&&** returns the right operand when the left is truthy. **||** returns the left operand when it is truthy.

### 14. What is the output?

~~~js
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean(""));
~~~

**Answer:**

~~~text
true
true
false
~~~

Arrays and objects are truthy, including empty ones. The empty string is falsy.

### 15. What is the output?

~~~js
console.log(!0);
console.log(!"hello");
console.log(!!"hello");
~~~

**Answer:**

~~~text
true
false
true
~~~

Logical NOT always returns a Boolean. Double negation converts a value to its truthiness as a Boolean.

### 16. Which lines print, and what is the final output?

~~~js
function fallback() {
    console.log("fallback called");
    return "Guest";
}

console.log("Mina" || fallback());
console.log(null || fallback());
~~~

**Answer:**

~~~text
Mina
fallback called
Guest
~~~

The first call to **fallback()** is skipped because **"Mina"** is truthy. The second is evaluated because **null** is falsy.

### 17. What is the output?

~~~js
const count = 0;

console.log(count && "Items");
console.log(count > 0 && "Items");
~~~

**Answer:**

~~~text
0
false
~~~

The first expression returns its falsy left operand, **0**. The second returns the Boolean result of the comparison, **false**.

### 18. What is the output?

~~~js
console.log(true || false && false);
console.log((true || false) && false);
~~~

**Answer:**

~~~text
true
false
~~~

Logical AND has higher precedence than logical OR. Parentheses explicitly change the grouping in the second expression.

### 19. What is the output?

~~~js
console.log(null ?? "Guest");
console.log(undefined ?? "Guest");
console.log(0 ?? 20);
~~~

**Answer:**

~~~text
Guest
Guest
0
~~~

The nullish operator uses its fallback only when the left value is **null** or **undefined**.

### 20. What is the output?

~~~js
let name = "";
name ||= "Guest";

let limit = 0;
limit ??= 50;

console.log(name);
console.log(limit);
~~~

**Answer:**

~~~text
Guest
0
~~~

**||=** assigns because the empty string is falsy. **??=** does not assign because **0** is not nullish.

### 21. What is the output?

~~~js
let enabled = true;
enabled &&= false;

let missing;

missing ??= "set";

console.log(enabled);
console.log(missing);
~~~

**Answer:**

~~~text
false
set
~~~

**&&=** assigns because the old value is truthy. **??=** assigns because the old value is undefined.

### 22. Why does this print **0** rather than **"Items"**?

~~~js
const count = 0;
console.log(count && "Items");
~~~

**Answer:**

**&&** returns its left operand when it is falsy. Since **count** is zero, the right side is skipped and the result is **0**.

## True or false

### 23. **&&** and **||** always return Booleans.

**Answer: False.**

They return one of their operand values. Use a Boolean conversion if a Boolean result is specifically required.

### 24. Empty arrays and empty objects are falsy.

**Answer: False.**

All arrays and objects are truthy, including empty ones.

### 25. The number **0** is nullish.

**Answer: False.**

Nullish means **null** or **undefined**. Zero is falsy, but it is not nullish.

### 26. **||** is a good default operator when zero is a valid value that must be preserved.

**Answer: False.**

Zero is falsy, so **0 || fallback** returns the fallback. Use **??** when only nullish values should trigger a default.

### 27. A short-circuited right operand is still evaluated for its side effects.

**Answer: False.**

When short-circuiting skips the right operand, none of its code runs.

### 28. **!value** always returns a Boolean.

**Answer: True.**

It converts the value to a truthiness decision and returns the opposite Boolean.

### 29. **??=** replaces an empty string with its right operand.

**Answer: False.**

An empty string is not nullish. **??=** leaves it unchanged.

### 30. **||=** and **??=** have the same behavior for every value.

**Answer: False.**

**||=** assigns for any falsy value. **??=** assigns only for **null** and **undefined**.

### 31. Code on the right of **&&** can be used as a conditionally evaluated expression.

**Answer: True.**

The right operand runs only when the left operand is truthy.

### 32. Parentheses are required when **??** is mixed directly with **&&** or **||**.

**Answer: True.**

Without parentheses, those combinations are syntax errors.

## Short-answer questions

### 33. List JavaScript's common falsy values.

**Answer:**

The common falsy values are **false**, **0**, **-0**, **0n**, **NaN**, **""**, **null**, and **undefined**. Other values, including empty arrays and empty objects, are truthy.

### 34. What is short-circuit evaluation?

**Answer:**

It is the behavior where an operator stops evaluating once the left operand determines whether the right side is needed. For **&&**, a falsy left value skips the right side. For **||**, a truthy left value skips it. For **??**, any non-nullish left value skips it.

### 35. How do **||** and **??** differ when the left value is zero?

**Answer:**

**0 || fallback** returns **fallback**, because zero is falsy. **0 ?? fallback** returns **0**, because zero is not nullish.

### 36. Why can **count && renderItems()** produce an unexpected visible zero?

**Answer:**

When **count** is zero, **&&** returns the left operand itself, which is **0**. Use an explicit condition such as **count > 0 && renderItems()** when the right side should run only for a positive count.

### 37. When should you use **Boolean(value)** instead of **!!value**?

**Answer:**

Both convert a value to its truthiness as a Boolean. **Boolean(value)** often makes the intent clearer to readers.

### 38. What side-effect risk comes with short-circuit expressions?

**Answer:**

A side effect on the right side may never run. Keep required work out of a branch that an operator may skip. Use a clear **if** statement when conditional work has several steps.

### 39. What is the difference between **||=** and **??=**?

**Answer:**

**||=** assigns when the current value is falsy. **??=** assigns only when the current value is **null** or **undefined**. Therefore **||=** overwrites **0**, **false**, and **""**, while **??=** preserves them.

### 40. Why must **??** be parenthesized when combined with logical AND or OR?

**Answer:**

JavaScript grammar prohibits unparenthesized combinations of nullish coalescing with logical AND or OR. Parentheses make the intended grouping explicit.

## Coding questions

### 41. Write a function that returns a fallback only when a value is nullish.

**Answer:**

~~~js
function withDefault(value, fallback) {
    return value ?? fallback;
}
~~~

This preserves values such as **0**, **false**, and **""**.

### 42. Write a function that chooses the first truthy value from a name and a default.

**Answer:**

~~~js
function displayName(name) {
    return name || "Guest";
}
~~~

This uses truthiness. An empty string, zero, or false value will select **"Guest"**.

### 43. Write a function that conditionally calls a callback when enabled.

**Answer:**

~~~js
function runIfEnabled(enabled, callback) {
    return enabled && callback();
}
~~~

The callback is skipped when **enabled** is falsy. If the function needs multiple actions or explicit Boolean return values, an **if** statement may be clearer.

### 44. Initialize a missing configuration value without overwriting zero.

**Answer:**

~~~js
const config = {
    retries: 0,
};

config.retries ??= 3;

console.log(config.retries); // 0
~~~

Zero is a valid non-nullish value, so the default is not assigned.

### 45. Use a logical assignment operator to provide a name only when the current name is falsy.

**Answer:**

~~~js
let name = "";
name ||= "Guest";

console.log(name); // Guest
~~~

Because the empty string is falsy, **||=** assigns the fallback.

### 46. Rewrite an unsafe zero-count rendering expression.

~~~js
const count = 0;
const output = count && "Items available";
~~~

**Answer:**

~~~js
const count = 0;
const output = count > 0 && "Items available";

console.log(output); // false
~~~

The explicit comparison returns a Boolean condition and avoids returning the count itself.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [26 - Operators, precedence, and associativity](../lessons/026-operators-precedence-and-associativity.md) | [Open lesson](../lessons/027-logical-operators-and-short-circuiting.md) | [Open example](../examples/027-logical-operators-and-short-circuiting.md) | [28 - Optional chaining and nullish coalescing](../lessons/028-optional-chaining-and-nullish-coalescing.md) |
