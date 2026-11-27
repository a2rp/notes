# 20 - Equality, comparison, and relational operators

JavaScript comparisons answer questions such as whether two values are equal, whether one number is smaller than another, or whether a value falls inside a range. The result of a comparison is a Boolean: **true** or **false**.

This chapter covers strict and loose equality, relational operators, object identity, string ordering, special numeric values, and common comparison mistakes. The examples use the ideas from the previous chapter on type conversion and coercion.

## Operators at a glance

| Operator | Meaning | Example |
| --- | --- | --- |
| **===** | Strictly equal | **5 === 5** is **true** |
| **!==** | Strictly not equal | **5 !== "5"** is **true** |
| **==** | Loosely equal, with specified coercion rules | **5 == "5"** is **true** |
| **!=** | Loosely not equal | **5 != "6"** is **true** |
| **<** | Less than | **3 < 5** is **true** |
| **<=** | Less than or equal to | **5 <= 5** is **true** |
| **>** | Greater than | **8 > 5** is **true** |
| **>=** | Greater than or equal to | **8 >= 8** is **true** |

The equality operators test whether values are equal according to their rules. The relational operators compare an ordering. They all produce a Boolean result.

## Strict equality with ===

The **===** operator compares values without converting one operand to another type first.

~~~js
console.log(7 === 7);       // true
console.log(7 === "7");     // false
console.log(false === 0);   // false
console.log(null === undefined); // false
~~~

For primitive values such as numbers, strings, Booleans, **null**, and **undefined**, strict equality compares their values, subject to the special rules for numbers described below.

For objects, arrays, and functions, strict equality compares identity. It asks whether both operands refer to the very same object, not whether their contents look alike.

~~~js
const first = { name: "Ada" };
const second = { name: "Ada" };
const sameReference = first;

console.log(first === second);       // false
console.log(first === sameReference); // true

console.log([1, 2] === [1, 2]); // false
~~~

Each object literal creates a new object. Two separately created arrays or objects are therefore not strictly equal just because their properties or elements match. To compare object contents, choose or write a comparison that matches the data structure and the application's requirements.

### Special number cases

The Number value **NaN** is not strictly equal to any value, including itself:

~~~js
console.log(NaN === NaN); // false
~~~

Positive zero and negative zero compare as equal with **===**:

~~~js
console.log(+0 === -0); // true
~~~

**Object.is()** uses a different equality rule for these two cases:

~~~js
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0));  // false
~~~

Use **Object.is()** when its specific treatment of **NaN** and signed zero is useful. For ordinary value comparisons, **===** is the usual choice.

## Strict inequality with !==

The **!==** operator is the logical opposite of **===**. It does not convert the operands first.

~~~js
console.log(7 !== 7);    // false
console.log(7 !== "7");  // true
~~~

A useful habit is to keep equality and inequality paired: use **===** and **!==** for strict comparisons.

## Loose equality with ==

The **==** operator follows a set of coercion rules when the operands have different types. It does not simply convert every value to the same type in every case. The result depends on the types and values being compared.

Some examples:

~~~js
console.log(5 == "5");       // true
console.log(0 == false);     // true
console.log("" == 0);        // true
console.log("0" == false);   // true
console.log(null == undefined); // true
console.log(null == 0);      // false
~~~

These results can be surprising. For example, **false** converts to the number **0** in this comparison, and an empty string converts to **0**. But **null** and **undefined** have a special rule that makes them loosely equal to each other and not to ordinary values such as zero.

### Common coercion cases

- If both operands have the same type, **==** uses the same equality result as **===** for that type.
- A Boolean operand is converted to a number: **false** behaves like **0**, and **true** behaves like **1**.
- A string and a number are compared after the string is converted to a number when the applicable rule calls for it.
- **null == undefined** is **true**. This special pairing does not make **null == 0** or **undefined == 0** true.
- When an object is compared with a primitive in cases covered by the loose equality rules, the object is converted to a primitive. The conversion may use methods such as **valueOf()**, **toString()**, or **Symbol.toPrimitive**.
- BigInt has specific rules when compared with strings or Numbers. For example, **1n == 1** is **true**, while **1n == "1"** is **true**. Invalid numeric text does not become a matching BigInt value.

Arrays and ordinary objects can also produce surprising loose-equality results because they are converted to primitives:

~~~js
console.log([] == 0);        // true
console.log([5] == 5);       // true
console.log({} == "[object Object]"); // true
~~~

These conversions are another reason that **==** can make code difficult to understand.

### When could == be intentional?

Most code should use **===** and **!==** because the types being compared remain clear. A deliberate exception sometimes used is:

~~~js
if (value == null) {
    // Runs when value is null or undefined.
}
~~~

Under the loose equality rules, this checks for either **null** or **undefined**. Use it only when both values should mean the same thing in that context. If you want to check only one of them, write **value === null** or **value === undefined**.

Follow the conventions of the project you are working in. Do not rely on coercion accidentally.

## Relational operators

The relational operators are **<**, **<=**, **>**, and **>=**. They compare values and return a Boolean.

~~~js
console.log(3 < 8);    // true
console.log(8 <= 8);   // true
console.log(10 > 12);  // false
console.log(10 >= 10); // true
~~~

When comparing values, JavaScript first obtains primitive values from objects where required. If both resulting primitives are strings, JavaScript compares their UTF-16 code units in lexicographic order. Otherwise, it applies numeric comparison rules, which can include converting values to numbers or comparing a Number with a BigInt.

### Strings are compared lexicographically

When both operands are strings, comparison is by string order, not by numeric value:

~~~js
console.log("apple" < "banana"); // true
console.log("20" < "3");         // true
console.log("10" < "2");         // true
~~~

The last two results are true because the first code unit of **"10"** or **"20"** is ordered before the first code unit of **"2"** or **"3"**. These are string comparisons, not numeric comparisons.

If you mean to compare numeric text as numbers, convert and validate it first:

~~~js
const left = Number("20");
const right = Number("3");

console.log(left < right); // false
~~~

Relational string comparison is not locale-aware sorting. For human-language ordering, use **String.prototype.localeCompare()** with appropriate locale options.

### Numeric and mixed comparisons

When at least one primitive operand is not a string, relational comparison uses numeric rules:

~~~js
console.log(10 < 20);      // true
console.log("10" < 20);    // true
console.log(true < 2);     // true, true converts to 1
console.log(null < 1);     // true, null converts to 0
~~~

A string that cannot become a valid Number produces **NaN** during numeric comparison:

~~~js
console.log("hello" < 5); // false
~~~

### NaN and relational comparisons

Every relational comparison involving **NaN** is **false**, including comparisons that might look like the opposite of another comparison:

~~~js
console.log(NaN < 5);  // false
console.log(NaN > 5);  // false
console.log(NaN <= 5); // false
console.log(NaN >= 5); // false
~~~

For example, **NaN >= 5** is not equivalent to **!(NaN < 5)**. The first is false, while the second is true. When a number could be **NaN**, check it explicitly with **Number.isNaN(value)**.

### Comparing BigInt and Number

Relational operators can compare a BigInt and a Number:

~~~js
console.log(1n < 2);  // true
console.log(2n < 1);  // false
console.log(2n < 2);  // false
~~~

This is different from arithmetic: adding a BigInt and a Number directly throws a **TypeError**. Do not convert large integers to Number unless you know the values are within the safe integer range and precision loss is acceptable.

## Chained comparisons do not work like math notation

A comparison produces a Boolean. In a longer expression, operators follow JavaScript's precedence and associativity rules. For example, **3 < 2 < 1** is evaluated from left to right:

1. **3 < 2** produces **false**.
2. **false < 1** converts **false** to **0**.
3. **0 < 1** produces **true**.

~~~js
console.log(3 < 2 < 1); // true
~~~

To check that a number is between two bounds, write both comparisons and join them with **&&**:

~~~js
const score = 72;
const isPassingRange = score >= 50 && score <= 100;

console.log(isPassingRange); // true
~~~

The comparisons are separate: **score >= 50** and **score <= 100**.

## Practical examples

### Check a known value

~~~js
const status = "ready";

if (status === "ready") {
    console.log("Continue");
}
~~~

Strict comparison keeps a string status separate from values such as **true** or **1**.

### Validate a range

~~~js
const age = 24;

if (age >= 18 && age <= 120) {
    console.log("Age is within the accepted range");
}
~~~

For real validation, choose bounds that make sense for the application's data and handle invalid input separately.

### Handle a possibly missing value

~~~js
function showName(user) {
    if (user === null || user === undefined) {
        return "No user";
    }

    return user.name;
}
~~~

A project may intentionally use **user == null** for this same null-or-undefined check. The explicit version makes each accepted case visible.

## Common mistakes

- Using **==** without knowing which coercion rule applies.
- Assuming separately created objects compare equal because their properties match.
- Expecting **NaN** to equal itself or behave like an ordinary number.
- Assuming two numeric-looking strings are compared numerically.
- Writing **a < b < c** to check a range.
- Assuming **<=** or **>=** is always the opposite of **>** or **<** when **NaN** may be present.
- Converting a BigInt to Number without considering precision.
- Using **===** to compare object contents rather than object identity.

## Try it yourself

1. Predict the results of **4 === "4"**, **4 == "4"**, and **4 !== "4"**.
2. Create two objects with the same properties. Compare them, then compare one object with a second variable that refers to it.
3. Explain why **NaN === NaN** and **Object.is(NaN, NaN)** have different results.
4. Predict **null == undefined**, **null == 0**, **false == 0**, and **"" == 0**.
5. Compare **"12" < "3"** with **12 < 3**.
6. Explain why **NaN >= 0** and **NaN <= 0** are both false.
7. Rewrite **10 < score < 20** so that it checks whether **score** is inside the range.
8. Compare **2n < 3** and **2n + 3**. Explain why the first is allowed and the second throws.
9. Write a function that returns true only when a value is a Number, is not **NaN**, and is between zero and one hundred inclusive.
10. If missing data may be either **null** or **undefined**, write both an explicit check and a deliberate loose-equality check.

## Key points

- Prefer **===** and **!==** for predictable equality checks.
- Strict equality compares primitive values and compares objects by identity.
- **==** applies specific coercion rules, including special handling for **null** and **undefined**.
- **NaN** is unequal to itself, and every relational comparison involving it is false.
- When both relational operands are strings, they are compared lexicographically.
- Numeric-looking strings should be converted and validated before numeric comparison.
- Use **a >= minimum && a <= maximum** for a range check.
- Use **Object.is()** only when its distinct handling of **NaN** or signed zero is wanted.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [19 - Type conversion and coercion](019-type-conversion-and-coercion.md) | [Open Q&A](../qnas/020-equality-comparison-and-relational-operators.md) | [Open example](../examples/020-equality-comparison-and-relational-operators.md) | [21 - Numbers, floating point, and safe integers](021-numbers-floating-point-and-safe-integers.md) |