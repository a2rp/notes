# 26 - Operators, precedence, and associativity

This Q&A checks how JavaScript groups expressions, how associativity works, and why grouping is different from evaluation order. Each answer follows its question.

## Multiple-choice questions

### 1. What does operator precedence determine?

A. The data type of every operand  
B. How operators of different precedence are grouped  
C. The order in which source files load  
D. Whether a function is asynchronous

**Answer: B.**

Precedence determines grouping. It does not, by itself, define the evaluation order of every operand.

### 2. What is the value of **2 + 3 * 4**?

A. **20**  
B. **14**  
C. **24**  
D. **11**

**Answer: B. 14.**

Multiplication has higher precedence than addition, so the expression groups as **2 + (3 * 4)**.

### 3. What is the value of **(2 + 3) * 4**?

A. **14**  
B. **20**  
C. **24**  
D. **9**

**Answer: B. 20.**

Parentheses make the addition group before the multiplication.

### 4. How does <code>2 ** 3 ** 2</code> group?

A. <code>(2 ** 3) ** 2</code>  
B. <code>2 ** (3 ** 2)</code>  
C. <code>(2 ** 3) + 2</code>  
D. The expression is invalid

**Answer: B. 2 ** (3 ** 2).**

Exponentiation is right-associative.

### 5. Which expression is a syntax error?

A. <code>(-2) ** 2</code>  
B. <code>-(2 ** 2)</code>  
C. <code>-2 ** 2</code>  
D. <code>2 ** -2</code>

**Answer: C. -2 ** 2.**

JavaScript does not allow an unparenthesized unary expression on the left side of exponentiation. Parenthesize the intended grouping.

### 6. How does **10 - 3 - 2** group?

A. **10 - (3 - 2)**  
B. **(10 - 3) - 2**  
C. **10 - (3 * 2)**  
D. It is right-associative

**Answer: B. (10 - 3) - 2.**

Subtraction is left-associative, so the value is **5**.

### 7. Which operator group has higher precedence?

A. Equality operators, such as **===**, have higher precedence than relational operators, such as **<**  
B. Relational operators have higher precedence than equality operators  
C. Assignment has higher precedence than multiplication  
D. The comma operator has higher precedence than addition

**Answer: B.**

For example, **3 < 4 === true** groups as **(3 < 4) === true**.

### 8. Which operator has higher precedence?

A. Bitwise OR, **|**  
B. Bitwise XOR, **^**  
C. Bitwise AND, **&**  
D. They all have the same precedence

**Answer: C. Bitwise AND.**

Bitwise AND has higher precedence than bitwise XOR, which has higher precedence than bitwise OR.

### 9. Which logical operator has higher precedence?

A. **||**  
B. **&&**  
C. They have the same precedence  
D. The comma operator

**Answer: B. &&.**

For example, **true || false && false** groups as **true || (false && false)**.

### 10. What is the associativity of assignment operators?

A. Left to right  
B. Right to left  
C. They have no associativity  
D. They associate based on variable names

**Answer: B. Right to left.**

**a = b = 10** groups as **a = (b = 10)**.

### 11. What is the value returned by the comma operator?

A. Its first expression's value  
B. The sum of its expressions  
C. The value of its last expression  
D. An array of all expression values

**Answer: C. The value of its last expression.**

The comma operator evaluates its expressions from left to right and returns the last value.

### 12. Why does JavaScript reject an unparenthesized mix of **??** with **&&** or **||**?

A. Those operators only accept strings  
B. The grammar requires parentheses to make the grouping explicit  
C. The nullish operator is deprecated  
D. It would always create an infinite loop

**Answer: B.**

Write the intended grouping explicitly, for example **(value ?? fallback) || otherFallback**.

## Predict the output

### 13. What is the output?

~~~js
console.log(2 + 3 * 4);
console.log((2 + 3) * 4);
~~~

**Answer:**

~~~text
14
20
~~~

Multiplication groups before addition unless parentheses change the grouping.

### 14. What is the output?

~~~js
console.log(20 / 5 * 2);
console.log(10 - 3 - 2);
~~~

**Answer:**

~~~text
8
5
~~~

The operators in each expression have equal precedence and associate from left to right.

### 15. What is the output?

~~~js
console.log(2 ** 3 ** 2);
console.log((2 ** 3) ** 2);
~~~

**Answer:**

~~~text
512
64
~~~

Exponentiation associates from right to left. Parentheses change the second expression's grouping.

### 16. What is the output?

~~~js
console.log((-2) ** 2);
console.log(-(2 ** 2));
~~~

**Answer:**

~~~text
4
-4
~~~

The parentheses determine whether the negative value is exponentiated or applied to the exponentiation result.

### 17. What is the output?

~~~js
console.log("value: " + 2 + 3);
console.log("value: " + (2 + 3));
~~~

**Answer:**

~~~text
value: 23
value: 5
~~~

The first expression groups left to right, so it concatenates **"value: "** with **2**, then concatenates **3**. Parentheses force the numeric addition first in the second expression.

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

Logical AND has higher precedence than logical OR. Parentheses change the grouping in the second expression.

### 19. What is the output?

~~~js
console.log(3 < 4 === true);
console.log(3 < 2 === false);
~~~

**Answer:**

~~~text
true
true
~~~

Relational comparison happens before equality comparison, so each comparison result is then compared with a Boolean.

### 20. What is the output?

~~~js
console.log(1 << 2 + 1);
console.log((1 << 2) + 1);
~~~

**Answer:**

~~~text
8
5
~~~

Addition has higher precedence than the shift operator. The first expression groups as **1 << (2 + 1)**.

### 21. What is the output?

~~~js
let a;
let b;

a = b = 10;

console.log(a);
console.log(b);
~~~

**Answer:**

~~~text
10
10
~~~

Assignment is right-associative. The assignment to **b** happens first, and its result is then assigned to **a**.

### 22. What is the output?

~~~js
const score = 82;
const message = score >= 90
    ? "excellent"
    : score >= 60
        ? "pass"
        : "retry";

console.log(message);
~~~

**Answer:**

~~~text
pass
~~~

The conditional operator is right-associative. The second conditional is nested in the false branch of the first.

### 23. What is the output?

~~~js
const result = (1, 2, 3);

console.log(result);
~~~

**Answer:**

~~~text
3
~~~

The comma operator evaluates each expression and returns the last value.

### 24. In what order do the function calls run, and what is the final output?

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

**Answer:**

~~~text
left
middle
right
result: 7
~~~

The multiplication groups before addition, but the function calls are evaluated from left to right.

## True or false

### 25. Parentheses can override the normal precedence grouping.

**Answer: True.**

For example, **(2 + 3) * 4** adds before multiplying.

### 26. Precedence alone tells you the order in which all operands are evaluated.

**Answer: False.**

Precedence determines grouping. Operand evaluation order is a separate rule.

### 27. Exponentiation groups from left to right.

**Answer: False.**

It groups from right to left.

### 28. Subtraction groups from left to right.

**Answer: True.**

Thus **10 - 3 - 2** means **(10 - 3) - 2**.

### 29. Assignment chains group from right to left.

**Answer: True.**

For example, **a = b = 10** means **a = (b = 10)**.

### 30. The expression <code>-2 ** 2</code> is valid JavaScript and evaluates to **-4**.

**Answer: False.**

It is a syntax error. Write <code>-(2 ** 2)</code> to produce **-4**, or <code>(-2) ** 2</code> to produce **4**.

### 31. The comma operator returns the first value in its expression list.

**Answer: False.**

It returns the last value after evaluating each expression from left to right.

### 32. The **+** operator always performs numeric addition.

**Answer: False.**

It can also concatenate strings. Operand types and conversion rules determine the behavior.

### 33. **??** can be freely mixed with **&&** and **||** without parentheses.

**Answer: False.**

JavaScript rejects these unparenthesized combinations. Add parentheses to show the intended grouping.

## Short-answer questions

### 34. Explain precedence in your own words.

**Answer:**

Precedence determines which operators group together first when an expression contains operators at different precedence levels. For example, multiplication groups before addition.

### 35. Explain associativity in your own words.

**Answer:**

Associativity determines how operators with the same precedence group when they appear next to each other. Subtraction is left-associative, while exponentiation is right-associative.

### 36. Why are parentheses useful if you already know the precedence table?

**Answer:**

They make intent visible, reduce mistakes during edits, and help readers understand the expression without recalling the full precedence table.

### 37. How is <code>2 ** 3 ** 2</code> grouped, and what is its value?

**Answer:**

It groups as <code>2 ** (3 ** 2)</code> because exponentiation is right-associative. Its value is **512**.

### 38. What is the difference between grouping and evaluation order?

**Answer:**

Grouping determines the structure of the expression and which operands belong to each operator. Evaluation order determines when those subexpressions are evaluated. For a left-to-right arithmetic expression with function calls, the grouping may put multiplication first while the calls still run from left to right.

### 39. Why does **"value: " + 2 + 3** produce **"value: 23"**?

**Answer:**

Addition is left-associative. The first operation concatenates the string with **2**, producing **"value: 2"**. The next operation concatenates **3**, producing **"value: 23"**.

### 40. What does the comma operator do, and how is it different from a comma separator?

**Answer:**

The comma operator evaluates expressions from left to right and returns the last value. Commas between function arguments, array items, or variable declarations are syntax separators, not comma-operator expressions.

## Coding questions

### 41. Write an expression that evaluates to **20** using **2**, **3**, and **4**.

**Answer:**

~~~js
const result = (2 + 3) * 4;
~~~

Parentheses make the addition happen before multiplication.

### 42. Write an expression that evaluates to **512** using exponentiation with **2**, **3**, and **2**.

**Answer:**

~~~js
const result = 2 ** 3 ** 2;
~~~

Exponentiation is right-associative, so this means <code>2 ** (3 ** 2)</code>.

### 43. Assign the value **10** to two variables using one chained assignment.

**Answer:**

~~~js
let first;
let second;

first = second = 10;
~~~

Assignments associate from right to left.

### 44. Rewrite a conditional expression as an **if...else** statement.

~~~js
const temperature = 28;
const label = temperature > 30 ? "hot" : "comfortable";
~~~

**Answer:**

~~~js
const temperature = 28;
let label;

if (temperature > 30) {
    label = "hot";
} else {
    label = "comfortable";
}
~~~

The statement makes the two branches explicit.

### 45. Rewrite this mixed nullish and logical expression with valid parentheses.

~~~js
const label = value ?? fallback || "unknown";
~~~

**Answer:**

~~~js
const label = (value ?? fallback) || "unknown";
~~~

Parentheses make the desired grouping explicit and satisfy JavaScript's grammar restriction.

### 46. Rewrite **10 - 3 - 2** with parentheses that show its actual grouping.

**Answer:**

~~~js
const result = (10 - 3) - 2;
~~~

Subtraction is left-associative, so the result is **5**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [25 - String methods and text processing](../lessons/025-string-methods-and-text-processing.md) | [Open lesson](../lessons/026-operators-precedence-and-associativity.md) | [Open example](../examples/026-operators-precedence-and-associativity.md) | [27 - Logical operators and short-circuiting](../lessons/027-logical-operators-and-short-circuiting.md) |

