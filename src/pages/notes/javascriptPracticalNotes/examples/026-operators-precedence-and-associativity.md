# 26 - Operators, precedence, and associativity

This example shows how JavaScript groups expressions with multiple operators. Each section has a question, code, expected output, and explanation. Run the code blocks in a JavaScript console.

## 1. Arithmetic precedence and parentheses

### Question

How does multiplication group with addition, and how can parentheses change the result?

### Code

~~~js
console.log("default grouping:", 2 + 3 * 4);
console.log("parenthesized:", (2 + 3) * 4);
console.log("same-level operators:", 20 / 5 * 2);
~~~

### Expected output

~~~text
default grouping: 14
parenthesized: 20
same-level operators: 8
~~~

### Explanation

Multiplication has higher precedence than addition, so the first expression groups as **2 + (3 * 4)**. Parentheses change the second expression to **(2 + 3) * 4**.

Division and multiplication have the same precedence and associate from left to right, so the last expression groups as **(20 / 5) * 2**.

## 2. Exponentiation and unary minus

### Question

Why do these exponentiation expressions have different results?

### Code

~~~js
console.log("right associative:", 2 ** 3 ** 2);
console.log("left grouped:", (2 ** 3) ** 2);
console.log("negative base:", (-2) ** 2);
console.log("negative result:", -(2 ** 2));
~~~

### Expected output

~~~text
right associative: 512
left grouped: 64
negative base: 4
negative result: -4
~~~

### Explanation

Exponentiation associates from right to left, so **2 ** 3 ** 2** means **2 ** (3 ** 2)**.

A unary minus must be parenthesized when it is the base of exponentiation. The expression **-2 ** 2** without parentheses is a syntax error.

## 3. Relational, equality, and bitwise precedence

### Question

How does equality precedence affect an expression that also contains bitwise AND?

### Code

~~~js
console.log("comparison before equality:", 3 < 4 === true);
console.log("equality before bitwise AND:", 5 & 1 === 1);
console.log("group bitwise result first:", (5 & 1) === 1);
~~~

### Expected output

~~~text
comparison before equality: true
equality before bitwise AND: 1
group bitwise result first: true
~~~

### Explanation

Relational operators have higher precedence than equality operators, so **3 < 4 === true** groups as **(3 < 4) === true**.

Equality operators have higher precedence than bitwise AND, so the middle expression groups as **5 & (1 === 1)**. The Boolean **true** becomes integer **1** for the bitwise operation, producing **1**. Parentheses in the last expression make the bitwise comparison explicit and produce a Boolean.

## 4. Logical precedence and nullish coalescing

### Question

How do logical AND and logical OR group, and how can you combine nullish fallback with a logical expression?

### Code

~~~js
console.log("AND before OR:", true || false && false);
console.log("parentheses change grouping:", (true || false) && false);

const missingName = null;
const name = missingName ?? "Guest";

const input = "";
const label = (input ?? "Default") || "Unknown";

console.log("nullish fallback:", name);
console.log("combined fallback:", label);

// This is a syntax error without parentheses:
// const invalid = input ?? "Default" || "Unknown";
~~~

### Expected output

~~~text
AND before OR: true
parentheses change grouping: false
nullish fallback: Guest
combined fallback: Unknown
~~~

### Explanation

Logical AND has higher precedence than logical OR, so the first expression groups as **true || (false && false)**.

JavaScript requires parentheses when combining **??** directly with **&&** or **||**. The nullish operator uses its fallback only for **null** or **undefined**. The logical OR operator also treats an empty string as false-like, which is why the final label is **"Unknown"**.

## 5. Assignment and conditional expressions

### Question

How do assignments chain, how does a compound assignment group, and how can a conditional choose a value?

### Code

~~~js
let first;
let second;

first = second = 10;

let total = 2;
total += 3 * 4;

const score = 82;
const result = score >= 90
    ? "excellent"
    : score >= 60
        ? "pass"
        : "retry";

console.log("first:", first);
console.log("second:", second);
console.log("total:", total);
console.log("result:", result);
~~~

### Expected output

~~~text
first: 10
second: 10
total: 14
result: pass
~~~

### Explanation

Assignment associates from right to left, so **first = second = 10** means **first = (second = 10)**.

In **total += 3 * 4**, multiplication happens before the compound assignment. Conditional expressions can be nested because the conditional operator associates from right to left, but a longer **if...else** statement is often easier to read.

## 6. The comma operator

### Question

What value does a comma expression produce?

### Code

~~~js
const result = (1, 2, 3);

console.log(result);

let firstValue = 0;
let secondValue = 0;

const sum = (
    firstValue = 4,
    secondValue = 5,
    firstValue + secondValue
);

console.log("sum:", sum);
console.log("first value:", firstValue);
console.log("second value:", secondValue);
~~~

### Expected output

~~~text
3
sum: 9
first value: 4
second value: 5
~~~

### Explanation

The comma operator evaluates expressions from left to right and returns the last expression's value. Parentheses make it clear that these commas form one expression. Commas used between function arguments or array elements are separators, not comma operators.

## 7. Grouping is not evaluation order

### Question

In a mixed addition and multiplication expression, which function calls run first?

### Code

~~~js
function mark(label, value) {
    console.log(label);
    return value;
}

const result =
    mark("left", 1) +
    mark("middle", 2) * mark("right", 3);

console.log("result:", result);
~~~

### Expected output

~~~text
left
middle
right
result: 7
~~~

### Explanation

The expression groups as **left + (middle * right)** because multiplication has higher precedence. The function-call operands are still evaluated from left to right. Precedence determines grouping, while evaluation order determines when each operand runs.

## 8. Addition and string concatenation

### Question

Why does adding the same numbers in a different expression produce different kinds of results?

### Code

~~~js
console.log("numeric addition:", 2 + 3);
console.log("string concatenation:", "2" + 3);
console.log("left to right concatenation:", "value: " + 2 + 3);
console.log("parenthesized addition:", "value: " + (2 + 3));
~~~

### Expected output

~~~text
numeric addition: 5
string concatenation: 23
left to right concatenation: value: 23
parenthesized addition: value: 5
~~~

### Explanation

The **+** operator can perform numeric addition or string concatenation based on its operands. In the third expression, left associativity means the string is concatenated with **2**, then with **3**. Parentheses make the numeric addition happen first in the last expression.

## Try it yourself

1. Change the operands in section 1 and write the grouping before calculating the answer.
2. Add parentheses to make exponentiation group from left to right.
3. Predict the result of **1 + 2 << 2** and explain why.
4. Compare **false || true && false** with **(false || true) && false**.
5. Rewrite the nested conditional in section 5 using **if...else**.
6. Add function calls to the comma expression and observe their evaluation order.
7. Change the string in section 8 and explain when **+** concatenates.
8. Write a complex expression, then add parentheses so its grouping is obvious.

## Key points

- Higher-precedence operators group before lower-precedence operators.
- Associativity determines grouping when operators share a precedence level.
- Parentheses explicitly control grouping.
- Operand evaluation order is separate from precedence.
- Exponentiation and assignment associate from right to left.
- Multiplication associates before addition, while most arithmetic binary operators associate from left to right.
- The **+** operator can add numbers or concatenate strings.
- Parenthesize expressions that combine **??** with **&&** or **||**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [25 - String methods and text processing](../lessons/025-string-methods-and-text-processing.md) | [Open lesson](../lessons/026-operators-precedence-and-associativity.md) | [Open Q&A](../qnas/026-operators-precedence-and-associativity.md) | [27 - Logical operators and short-circuiting](../lessons/027-logical-operators-and-short-circuiting.md) |
