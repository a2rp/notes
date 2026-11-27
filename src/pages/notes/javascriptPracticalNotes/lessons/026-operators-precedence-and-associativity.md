# 26 - Operators, precedence, and associativity

An operator combines, transforms, or compares values. An expression is code that produces a value. JavaScript has many operators, and an expression can contain several of them at once.

**Precedence** determines how operators of different levels are grouped. **Associativity** determines how operators at the same level are grouped. Parentheses make intended grouping explicit.

## Precedence and grouping

Multiplication has higher precedence than addition, so the multiplication is grouped first:

~~~js
const result = 2 + 3 * 4;

console.log(result); // 14
~~~

The expression is grouped as **2 + (3 * 4)**. Parentheses can change that grouping:

~~~js
const result = (2 + 3) * 4;

console.log(result); // 20
~~~

Use parentheses when they make a non-obvious expression easier to read, even when you know the precedence rule.

## A practical precedence table

The table lists common JavaScript operators from higher precedence to lower precedence. Operators in the same row have the same precedence unless the row says otherwise.

| Group | Operators | Associativity |
| --- | --- | --- |
| Member access and calls | **.**, **[]**, **()**, **?.** | Left to right |
| Postfix update | **x++**, **x--** | Left to right |
| Exponentiation | **\*\*** | Right to left |
| Unary and prefix update | **!**, **~**, unary **+**, unary **-**, **typeof**, **void**, **delete**, **await**, **++x**, **--x** | Right to left |
| Multiplicative | **\***, **/**, **%** | Left to right |
| Additive | **+**, **-** | Left to right |
| Shift | **<<**, **>>**, **>>>** | Left to right |
| Relational | **<**, **<=**, **>**, **>=**, **in**, **instanceof** | Left to right |
| Equality | **==**, **!=**, **===**, **!==** | Left to right |
| Bitwise AND | **&** | Left to right |
| Bitwise XOR | **^** | Left to right |
| Bitwise OR | **\|** | Left to right |
| Logical AND | **&&** | Left to right |
| Logical OR and nullish coalescing | **\|\|**, **??** | Left to right, but parenthesize when mixing **??** with **&&** or **||** |
| Conditional | **condition ? valueIfTrue : valueIfFalse** | Right to left |
| Assignment | **=**, **+=**, **-=**, **\*=**, **&&=**, **\|\|=**, **??=**, and other compound assignments | Right to left |
| Comma operator | **,** | Left to right |

This is a practical grouping guide, not a list of every expression form. Constructs such as **new**, **yield**, and arrow functions have grammar rules that are not always best understood as ordinary binary operators.

### Exponentiation and unary operators

Exponentiation groups from right to left:

~~~js
console.log(2 ** 3 ** 2);
~~~

This means <code>2 ** (3 ** 2)</code> and prints **512**.

A unary expression cannot appear unparenthesized on the left side of **\*\***:

~~~js
// -2 ** 2; // SyntaxError

console.log((-2) ** 2); // 4
console.log(-(2 ** 2)); // -4
~~~

Use parentheses to show whether the negative sign applies before or after exponentiation.

### Logical OR and nullish coalescing

JavaScript requires parentheses when **??** is mixed directly with **&&** or **||**. These expressions are syntax errors:

~~~js
// value ?? fallback || otherFallback;
// value && otherValue ?? fallback;
~~~

Group the intended operation explicitly:

~~~js
const value = null;
const fallback = "default";

console.log((value ?? fallback) || "other");
// default
~~~

The precedence table cannot replace this grammar restriction. Add parentheses whenever these operator families appear together.

## Associativity

Associativity matters when adjacent operators have the same precedence and parentheses are absent.

Most arithmetic binary operators group from left to right:

~~~js
console.log(20 / 5 * 2);
// (20 / 5) * 2
// 8

console.log(10 - 3 - 2);
// (10 - 3) - 2
// 5
~~~

Exponentiation and assignment group from right to left:

~~~js
console.log(2 ** 3 ** 2);
// 2 ** (3 ** 2)
// 512

const first = 0;
let second = 0;

const value = first + (second = 5);

console.log(value); // 5
console.log(second); // 5
~~~

Assignments can also chain because assignment is right-associative:

~~~js
let a;
let b;

a = b = 10;

console.log(a); // 10
console.log(b); // 10
~~~

This is grouped as **a = (b = 10)**. The assignment to **b** produces **10**, which is then assigned to **a**.

The conditional operator is right-associative as well:

~~~js
const score = 82;
const message = score >= 90
    ? "excellent"
    : score >= 60
        ? "pass"
        : "retry";

console.log(message); // pass
~~~

Nested conditionals can be hard to scan. A clear **if...else** statement may be easier to maintain.

## Precedence does not determine evaluation order

Precedence determines grouping. It does not mean that the operand of the highest-precedence operator is evaluated before every other operand.

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

Output:

~~~text
left
middle
right
result: 7
~~~

The expression groups as **left + (middle * right)**, but its operands are evaluated from left to right. The function calls make that evaluation order visible.

## Operators can have different meanings based on their operands

The **+** operator can add numbers or concatenate strings:

~~~js
console.log(2 + 3); // 5
console.log("2" + 3); // "23"
console.log(2 + 3 * 4); // 14
~~~

Precedence decides that multiplication groups before addition. It does not decide whether **+** performs numeric addition or string concatenation. Operand types and conversion rules determine that behavior.

The earlier type-conversion and equality lessons cover those rules. For predictable comparisons, prefer **===** and **!==** unless coercive equality is specifically intended.

## The comma operator

The comma operator evaluates expressions from left to right and returns the last value:

~~~js
const result = (console.log("first"), 10 + 2);

console.log("result:", result);
~~~

Output:

~~~text
first
result: 12
~~~

The parentheses matter here. Commas also appear as punctuation between function arguments, array items, and variable declarations. Those separator commas are not comma-operator expressions.

The comma operator has the lowest precedence, so parentheses help make its use clear.

## A reliable way to read a complex expression

1. Identify parentheses and grouping constructs first.
2. Find operators with higher precedence and group them.
3. Use associativity only when operators share a precedence level.
4. Check whether an operator has special syntax restrictions, such as **??** mixed with **&&** or **||**.
5. Determine operand evaluation order separately from grouping.
6. Add parentheses or rewrite the expression when its meaning is not immediately clear.

## Try it yourself

For each expression, write the grouping with parentheses before calculating the result.

1. **2 + 3 * 4**
2. **20 / 5 * 2**
3. <code>2 ** 3 ** 2</code>
4. **10 - 3 - 2**
5. **"value: " + 2 + 3**
6. **true || false && false**
7. **null ?? "fallback"**
8. **a = b = 10**
9. **(1, 2, 3)**
10. Rewrite a nested conditional as an **if...else** statement.

## Key points

- Precedence groups different operators in an expression.
- Associativity groups adjacent operators with the same precedence.
- Parentheses explicitly control grouping and make intent easier to read.
- Most arithmetic operators associate from left to right; exponentiation and assignment associate from right to left.
- Precedence determines grouping, not the order in which operands are evaluated.
- Operators such as **+** can behave differently based on operand types.
- Parenthesize expressions that combine nullish coalescing with logical operators.
- Rewrite dense expressions when parentheses alone do not make them clear.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [25 - String methods and text processing](025-string-methods-and-text-processing.md) | [Open Q&A](../qnas/026-operators-precedence-and-associativity.md) | [Open example](../examples/026-operators-precedence-and-associativity.md) | [27 - Logical operators and short-circuiting](027-logical-operators-and-short-circuiting.md) |

