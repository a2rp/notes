# 30 - Conditional statements: Q&A

Use these questions to review **if**, **else if**, and **else**, truthiness, comparisons, nested branches, and common control-flow mistakes. Each answer follows its question.

## Multiple-choice questions

### 1. What happens when an if condition is truthy?

A. JavaScript skips the branch.  
B. JavaScript runs the statement or block controlled by the if.  
C. JavaScript runs every branch in the chain.  
D. The program always stops.

**Answer:** B. JavaScript runs the statement or block controlled by the if.

**Explanation:** The condition is converted to Boolean for the decision. If it is truthy, the if branch runs.

### 2. Which value is falsy in JavaScript?

A. **[]**  
B. **"0"**  
C. **0n**  
D. **{}**

**Answer:** C. **0n**

**Explanation:** BigInt zero is falsy. Arrays, objects, and non-empty strings are truthy, including empty arrays and empty objects.

### 3. What does an else branch do?

A. Runs when the preceding if condition is falsy and no earlier branch matched.  
B. Runs before the if condition.  
C. Runs whenever the if branch runs.  
D. Checks a second condition automatically.

**Answer:** A. Runs when the preceding if condition is falsy and no earlier branch matched.

**Explanation:** Else has no condition of its own. It is the fallback branch of that if statement.

### 4. In an if...else if...else chain, how many branches run?

A. Every branch whose condition is true.  
B. Exactly one branch, the first matching one, or the final else.  
C. Always two branches.  
D. None, because else if is not valid JavaScript.

**Answer:** B. Exactly one branch, the first matching one, or the final else.

**Explanation:** Conditions are checked in order. Once a branch matches, the remaining branches are skipped.

### 5. Which expression checks that score is between 0 and 100, including both boundaries?

A. **0 <= score <= 100**  
B. **score >= 0 && score <= 100**  
C. **score >= 0 || score <= 100**  
D. **score > 0 && score < 100**

**Answer:** B. **score >= 0 && score <= 100**

**Explanation:** JavaScript evaluates both comparisons separately and joins their Boolean results with logical AND.

### 6. Which operator is usually best for comparing a value and its type without coercion?

A. **=**  
B. **==**  
C. **===**  
D. **&&**

**Answer:** C. **===**

**Explanation:** Strict equality compares without converting the operands to another type.

### 7. What is true about an empty array in a condition?

A. It is falsy because it contains no items.  
B. It is truthy because arrays are objects.  
C. It throws a TypeError.  
D. It is converted to zero.

**Answer:** B. It is truthy because arrays are objects.

**Explanation:** All arrays are truthy, even when they have no elements.

### 8. What does **&&** do in a conditional expression?

A. It combines integer bits.  
B. It evaluates the right operand only if the left operand is truthy.  
C. It always evaluates both operands.  
D. It converts both operands to strings.

**Answer:** B. It evaluates the right operand only if the left operand is truthy.

**Explanation:** Logical AND short-circuits when its left operand is falsy.

### 9. Without braces, how many statements does an if control?

A. Every statement until the next blank line.  
B. Every statement with the same indentation.  
C. Only the next statement.  
D. Every statement in the file.

**Answer:** C. Only the next statement.

**Explanation:** Indentation is visual. Braces define a block and group multiple statements into a branch.

### 10. Which is a valid way to handle a special case before the main path in a function?

A. A guard clause that returns early.  
B. A bitwise OR.  
C. A comment without a condition.  
D. A label after the function.

**Answer:** A. A guard clause that returns early.

**Explanation:** An early return handles an exceptional or invalid case and prevents the remaining function body from running.

## Predict the output

### 11. What does this print?

~~~js
if (0) {
    console.log("yes");
} else {
    console.log("no");
}
~~~

**Answer:**

~~~text
no
~~~

**Explanation:** Zero is falsy, so the else branch runs.

### 12. What does this print?

~~~js
if ("false") {
    console.log("yes");
} else {
    console.log("no");
}
~~~

**Answer:**

~~~text
yes
~~~

**Explanation:** The string is non-empty, so it is truthy. It is not the Boolean value false.

### 13. What does this print?

~~~js
if ([]) {
    console.log("array");
} else {
    console.log("empty");
}
~~~

**Answer:**

~~~text
array
~~~

**Explanation:** An empty array is an object, and objects are truthy.

### 14. What does this print?

~~~js
const score = 84;

if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else {
    console.log("C");
}
~~~

**Answer:**

~~~text
B
~~~

**Explanation:** The first condition is false. The second condition is true, so the B branch runs and the else branch is skipped.

### 15. What does this print?

~~~js
const value = 0;

if (value !== null && value !== undefined) {
    console.log("present");
}
~~~

**Answer:**

~~~text
present
~~~

**Explanation:** Zero is neither null nor undefined, so the explicit existence check passes. A simple truthiness check would fail for zero.

### 16. What does this print?

~~~js
console.log(0 === false);
console.log(0 == false);
~~~

**Answer:**

~~~text
false
true
~~~

**Explanation:** Strict equality does not coerce types. Loose equality converts values in this comparison.

### 17. What does this print?

~~~js
const age = 16;

if (age >= 13) {
    console.log("teenager or older");
} else if (age >= 18) {
    console.log("adult");
}
~~~

**Answer:**

~~~text
teenager or older
~~~

**Explanation:** The first condition matches, so the later branch is skipped. This ordering also makes the adult condition unreachable for every age 18 or above.

### 18. What does this print?

~~~js
let status = "pending";

if (status = "approved") {
    console.log(status);
}
~~~

**Answer:**

~~~text
approved
~~~

**Explanation:** A single equals sign assigns the string to status. The assignment expression evaluates to that non-empty, truthy string, so the branch runs.

### 19. What does this print?

~~~js
const score = -5;

if (0 <= score <= 100) {
    console.log("in range");
} else {
    console.log("outside range");
}
~~~

**Answer:**

~~~text
in range
~~~

**Explanation:** JavaScript evaluates comparisons from left to right. First, **0 <= -5** is false. Then false is converted to 0, and **0 <= 100** is true. Use **score >= 0 && score <= 100** instead.

### 20. What does this print?

~~~js
const isReady = false;

if (isReady)
    console.log("ready");

console.log("finished");
~~~

**Answer:**

~~~text
finished
~~~

**Explanation:** The if controls only the next statement, which is skipped. The final log is outside the if and always runs.

## True or false

### 21. An if condition must already have the Boolean type.

**Answer:** False.

**Explanation:** JavaScript converts the condition's value to Boolean using truthiness rules.

### 22. An empty object is falsy.

**Answer:** False.

**Explanation:** All objects are truthy, including an empty object.

### 23. Every matching condition in an if...else if chain runs.

**Answer:** False.

**Explanation:** Only the first matching branch runs. The rest of the chain is skipped.

### 24. Indentation determines which statements belong to an if branch.

**Answer:** False.

**Explanation:** Braces create a block. Without braces, the if controls only its next statement.

### 25. The final else in an if...else chain is required.

**Answer:** False.

**Explanation:** Else is optional. Add it when a fallback action is required or useful.

### 26. A block creates a scope for let and const declarations.

**Answer:** True.

**Explanation:** A let or const declared inside a block is not available outside that block.

### 27. An early return exits the current function call.

**Answer:** True.

**Explanation:** Statements after the return do not run during that function call.

## Short-answer questions

### 28. What is truthiness?

**Answer:** Truthiness is the way JavaScript converts a value to true or false when a Boolean decision is needed.

**Explanation:** Values such as zero, empty strings, null, undefined, NaN, false, and 0n are falsy. Most other values are truthy.

### 29. Why is **if (count)** sometimes the wrong check?

**Answer:** It treats zero as if the value were absent.

**Explanation:** If zero is valid data, check the actual requirement, such as whether the value is a number or whether it is nullish.

### 30. What is the difference between else and else if?

**Answer:** Else is an unconditional fallback for cases not handled earlier. Else if evaluates another condition.

**Explanation:** An else if chain checks each new condition in order and runs only the first matching branch.

### 31. Why should range conditions use two comparisons joined by **&&**?

**Answer:** JavaScript does not interpret **minimum <= value <= maximum** as a mathematical range test.

**Explanation:** Each comparison returns a Boolean, and the second comparison then uses that Boolean as its left operand. Write both comparisons explicitly.

### 32. What does short-circuit evaluation mean for **&&**?

**Answer:** If the left operand is falsy, JavaScript does not evaluate the right operand.

**Explanation:** This can prevent unnecessary work or guard an operation that should only run when the first condition passes.

### 33. What does short-circuit evaluation mean for **||**?

**Answer:** If the left operand is truthy, JavaScript does not evaluate the right operand.

**Explanation:** The left operand already satisfies the logical OR expression.

### 34. Why are braces recommended even for one-statement branches?

**Answer:** They make the branch boundary explicit and reduce mistakes when the code changes.

**Explanation:** Without braces, a conditional controls only one following statement. Indentation does not group later statements.

### 35. What is a guard clause?

**Answer:** A guard clause checks a special or invalid case near the start of a function and exits early.

**Explanation:** It can reduce nested branches and keep the normal path easier to follow.

## Coding and reasoning questions

### 36. Write a conditional that logs whether a number is positive, negative, or zero.

**Answer:**

~~~js
function describeNumber(value) {
    if (value > 0) {
        return "positive";
    } else if (value < 0) {
        return "negative";
    } else {
        return "zero";
    }
}
~~~

**Explanation:** The conditions cover positive and negative numbers. The final else handles zero.

### 37. Write a check for a score from 0 through 100, inclusive.

**Answer:**

~~~js
function isValidScore(score) {
    return score >= 0 && score <= 100;
}
~~~

**Explanation:** Both comparisons must be true for the score to be within the inclusive range.

### 38. Write an access condition requiring an account and either an admin role or an invitation.

**Answer:**

~~~js
if (hasAccount && (isAdmin || hasInvitation)) {
    console.log("Access allowed.");
}
~~~

**Explanation:** The parentheses group the alternatives. An account is required, and then either role or invitation is enough.

### 39. Fix this code so it compares status instead of assigning to it.

~~~js
if (status = "approved") {
    approveRequest();
}
~~~

**Answer:**

~~~js
if (status === "approved") {
    approveRequest();
}
~~~

**Explanation:** Strict equality checks the value without changing status.

### 40. Rewrite this nested function to handle invalid input first.

~~~js
function getLabel(value) {
    if (value >= 0) {
        return "valid";
    } else {
        return "invalid";
    }
}
~~~

**Answer:**

~~~js
function getLabel(value) {
    if (value < 0) {
        return "invalid";
    }

    return "valid";
}
~~~

**Explanation:** The guard clause handles the invalid case and returns. The normal case then follows without an else branch.

### 41. Make a condition that accepts either a username or an email address, provided at least one is non-empty.

**Answer:**

~~~js
if (username !== "" || email !== "") {
    console.log("A contact method was provided.");
}
~~~

**Explanation:** Logical OR succeeds when either comparison is true. If the values may also be null or undefined, validate those cases explicitly.

### 42. Make a condition that requires a number to be finite and between 1 and 10.

**Answer:**

~~~js
if (Number.isFinite(value) && value >= 1 && value <= 10) {
    console.log("Valid value.");
}
~~~

**Explanation:** The finite check rejects NaN and infinities. The remaining comparisons enforce the inclusive range.

### 43. What is logged, and why?

~~~js
let result = "not set";

if (false) {
    result = "first";
} else if (true) {
    result = "second";
} else {
    result = "fallback";
}

console.log(result);
~~~

**Answer:**

~~~text
second
~~~

**Explanation:** The first condition is false and the second is true. The matching second branch runs, and the final else is skipped.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [29 - Bitwise operators and integer operations](../lessons/029-bitwise-operators-and-integer-operations.md) | [Open lesson](../lessons/030-conditional-statements.md) | [Open example](../examples/030-conditional-statements.md) | [31 - switch statements](../lessons/031-switch-statements.md) |
