# 27 - Logical operators and short-circuiting

JavaScript's logical operators help combine conditions, choose fallback values, and conditionally evaluate expressions. The operators **&&**, **||**, and **??** can return one of their operands rather than always returning a Boolean.

A short-circuit operator evaluates its left operand first. Depending on that value, it may skip the right operand entirely.

## Truthy and falsy values

When a logical operator needs a Boolean decision, JavaScript applies the **ToBoolean** conversion. The following values are falsy:

- **false**
- **0** and **-0**
- **0n**
- **NaN**
- **""**, the empty string
- **null**
- **undefined**

All other values are truthy, including empty arrays and empty objects.

~~~js
console.log(Boolean("hello")); // true
console.log(Boolean("")); // false
console.log(Boolean([])); // true
console.log(Boolean({})); // true
~~~

A value's truthiness is not the same as its type. For example, **Boolean("false")** is **true** because the string is non-empty.

## Logical AND: &&

The **&&** operator evaluates its left operand first:

- If the left operand is falsy, it returns that operand and skips the right operand.
- If the left operand is truthy, it evaluates and returns the right operand.

~~~js
console.log("ready" && 42); // 42
console.log(0 && "not reached"); // 0
console.log("" && "not reached"); // ""
~~~

This means **&&** does not necessarily return **true** or **false**. It returns one of its operand values.

### Use && to guard an expression

A common use is to run code only when a condition is true:

~~~js
const isSignedIn = true;

isSignedIn && console.log("Welcome");
~~~

If **isSignedIn** is falsy, the right side is skipped. Use an **if** statement when the conditional work spans multiple steps or needs to be easy to debug.

### Watch for zero in conditional rendering

~~~js
const count = 0;

console.log(count && "Items available");
~~~

The result is **0**, not **false**. In a user interface, rendering that result can show an unwanted zero. Express the actual condition instead:

~~~js
console.log(count > 0 && "Items available"); // false
~~~

## Logical OR: ||

The **||** operator also evaluates its left operand first:

- If the left operand is truthy, it returns that operand and skips the right operand.
- If the left operand is falsy, it evaluates and returns the right operand.

~~~js
console.log("custom name" || "Guest"); // custom name
console.log("" || "Guest"); // Guest
console.log(0 || 10); // 10
~~~

### Use || for truthy fallback values

**||** is useful when every falsy value should trigger a fallback.

~~~js
function displayName(name) {
    return name || "Guest";
}

console.log(displayName("Mina")); // Mina
console.log(displayName("")); // Guest
~~~

It can be wrong when **0**, **false**, or **""** is a meaningful value. In those cases, use **??** if only missing values should trigger a fallback.

## Nullish coalescing: ??

The **??** operator returns its left operand unless that value is **null** or **undefined**. Only then does it evaluate and return the right operand.

~~~js
console.log(null ?? "fallback"); // fallback
console.log(undefined ?? "fallback"); // fallback
console.log(0 ?? 10); // 0
console.log(false ?? true); // false
console.log("" ?? "text"); // ""
~~~

Use **??** when a value may be absent but valid falsy values should be preserved.

~~~js
function pageSize(value) {
    return value ?? 20;
}

console.log(pageSize(undefined)); // 20
console.log(pageSize(0)); // 0
~~~

A common contrast:

| Left value | **value || fallback** | **value ?? fallback** |
| --- | --- | --- |
| **0** | **fallback** | **0** |
| **false** | **fallback** | **false** |
| **""** | **fallback** | **""** |
| **null** | **fallback** | **fallback** |
| **undefined** | **fallback** | **fallback** |

## Logical NOT: !

The **!** operator converts its operand to a Boolean and then negates it. Its result is always **true** or **false**.

~~~js
console.log(!true); // false
console.log(!0); // true
console.log(!"hello"); // false
~~~

Double negation, **!!value**, converts a value to its Boolean equivalent. Prefer **Boolean(value)** when its purpose should be explicit.

~~~js
console.log(!!"hello"); // true
console.log(Boolean("hello")); // true
~~~

## Short-circuit evaluation

A right operand is skipped when the left operand already determines the result.

~~~js
function getFallback() {
    console.log("fallback evaluated");
    return "Guest";
}

console.log("Mina" || getFallback());
console.log(null || getFallback());
~~~

Output:

~~~text
Mina
fallback evaluated
Guest
~~~

The first **||** expression returns **"Mina"** without calling **getFallback()**. The second expression evaluates the function because its left operand is falsy.

Short-circuiting is useful for guarded property access, fallback calculations, and avoiding unnecessary work. Do not put required side effects only on a branch that might be skipped.

## Operator precedence and grouping

Logical AND has higher precedence than logical OR:

~~~js
console.log(true || false && false);
// true || (false && false)
// true
~~~

Parentheses can make another grouping explicit:

~~~js
console.log((true || false) && false); // false
~~~

JavaScript requires parentheses when **??** is mixed directly with **&&** or **||**. These are syntax errors:

~~~js
// value ?? fallback || other;
// value && other ?? fallback;
~~~

Parenthesize the intended grouping:

~~~js
const value = null;
const fallback = "Guest";

console.log((value ?? fallback) || "Unknown"); // Guest
~~~

Use parentheses when combining these operators so the code communicates the intended behavior without relying on readers to recall precedence.

## Logical assignment operators

Logical assignment combines a logical operation with assignment. Each form assigns only when its condition requires the right side:

| Operator | Assigns the right side when the current value is |
| --- | --- |
| **||=** | Falsy |
| **&&=** | Truthy |
| **??=** | **null** or **undefined** |

~~~js
let name = "";
name ||= "Guest";
console.log(name); // Guest

let enabled = true;
enabled &&= false;
console.log(enabled); // false

let limit = 0;
limit ??= 50;
console.log(limit); // 0
~~~

The right side is short-circuited when assignment is not needed. This keeps **0**, **false**, and **""** when using **??=**.

Logical assignment evaluates its assignment target once. This is helpful when the target is a property access with a getter or side effect.

~~~js
const settings = {
    get name() {
        console.log("read name");
        return undefined;
    },

    set name(value) {
        console.log("write name:", value);
    },
};

settings.name ??= "Guest";
~~~

Output:

~~~text
read name
write name: Guest
~~~

The property is read to decide whether to assign. If its value were not nullish, the setter would not run.

## Choosing the right operator

| Need | Use |
| --- | --- |
| Combine conditions and get a Boolean decision in an **if** | **&&** or **||** |
| Evaluate an expression only when a condition is truthy | **&&** |
| Choose the first truthy value | **||** |
| Choose a fallback only for **null** or **undefined** | **??** |
| Negate a truthy or falsy check | **!** |
| Set a value only when it is falsy | **||=** |
| Set a value only when it is truthy | **&&=** |
| Set a value only when it is nullish | **??=** |

## Try it yourself

1. Predict the result of **0 || 5**, **0 ?? 5**, and **0 && 5**.
2. Repeat the previous exercise with **""**, **false**, **null**, and **undefined**.
3. Make a function call on the right side of **||** and confirm when it runs.
4. Use **&&** with a zero count and show how an explicit comparison avoids returning zero.
5. Rewrite a truthy fallback from **||** to **??** and compare the result for **0**.
6. Use **||=**, **&&=**, and **??=** on separate variables and record which values change.
7. Add parentheses to an expression that combines **??** and **||**.
8. Explain why **&&** and **||** can return strings or numbers.

## Key points

- Truthiness controls logical decisions, but does not change the operand values.
- **&&** returns the first falsy operand or the final operand when all are truthy.
- **||** returns the first truthy operand or the final operand when all are falsy.
- **??** falls back only for **null** and **undefined**.
- **!** always returns a Boolean.
- Short-circuiting can skip right-side evaluation and side effects.
- **||=**, **&&=**, and **??=** assign only when their respective conditions are met.
- Parenthesize expressions that combine **??** with **&&** or **||**.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [26 - Operators, precedence, and associativity](026-operators-precedence-and-associativity.md) | [Open Q&A](../qnas/027-logical-operators-and-short-circuiting.md) | [Open example](../examples/027-logical-operators-and-short-circuiting.md) | [28 - Optional chaining and nullish coalescing](028-optional-chaining-and-nullish-coalescing.md) |
