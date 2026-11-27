# 27 - Logical operators and short-circuiting

This example demonstrates JavaScript truthiness, the values returned by logical operators, skipped right-hand expressions, nullish fallbacks, and logical assignment. The code is displayed for study. Run each block in a JavaScript console.

## 1. Inspect truthy and falsy values

### Question

Which of these values are falsy, and are empty arrays and objects falsy?

### Code

~~~js
const values = [
    false,
    0,
    -0,
    0n,
    NaN,
    "",
    null,
    undefined,
    [],
    {},
];

console.log(values.map((value) => Boolean(value)).join(", "));
console.log("string false:", Boolean("false"));
~~~

### Expected output

~~~text
false, false, false, false, false, false, false, false, true, true
string false: true
~~~

### Explanation

JavaScript's common falsy values are **false**, numeric zero, **0n**, **NaN**, the empty string, **null**, and **undefined**. Empty arrays and objects are truthy. A non-empty string such as **"false"** is also truthy because its contents do not affect its truthiness.

## 2. See the values returned by &&, ||, and ??

### Question

Do these logical operators always return Boolean values?

### Code

~~~js
console.log("truthy && right:", "ready" && 42);
console.log("falsy && left:", 0 && 42);
console.log("truthy || left:", "ready" || 42);
console.log("falsy || right:", 0 || 42);
console.log("false ?? fallback:", false ?? "fallback");
~~~

### Expected output

~~~text
truthy && right: 42
falsy && left: 0
truthy || left: ready
falsy || right: 42
false ?? fallback: false
~~~

### Explanation

The operators return one of their operand values:

- **&&** returns a falsy left value, or evaluates and returns the right value when the left is truthy.
- **||** returns a truthy left value, or evaluates and returns the right value when the left is falsy.
- **??** returns a non-nullish left value, or evaluates and returns the right value when the left is **null** or **undefined**.

The logical decision uses truthiness, but the returned result does not have to be a Boolean.

## 3. Choose the right fallback operator

### Question

How do **||** and **??** behave when a setting may be **0**, **false**, an empty string, or missing?

### Code

~~~js
const values = [0, false, "", null, undefined];

for (const value of values) {
    console.log(
        JSON.stringify(value),
        "||",
        JSON.stringify(value || "fallback"),
        "??",
        JSON.stringify(value ?? "fallback"),
    );
}
~~~

### Expected output

~~~text
0 || "fallback" ?? 0
false || "fallback" ?? false
"" || "fallback" ?? ""
null || "fallback" ?? "fallback"
undefined || "fallback" ?? "fallback"
~~~

### Explanation

**||** uses truthiness, so all falsy values select the fallback. **??** selects its fallback only for **null** and **undefined**. Use **??** for defaults when zero, false, or an empty string is a valid value.

## 4. Observe short-circuiting

### Question

When does a function on the right side of **||** run?

### Code

~~~js
function getGuestName() {
    console.log("fallback function ran");
    return "Guest";
}

console.log("known name:", "Mina" || getGuestName());
console.log("missing name:", null || getGuestName());
~~~

### Expected output

~~~text
known name: Mina
fallback function ran
missing name: Guest
~~~

### Explanation

The fallback function is skipped when the left operand is truthy. It runs for **null || getGuestName()** because **null** is falsy. Short-circuiting avoids unnecessary work, but required side effects should not be placed only on a branch that may be skipped.

## 5. Use && as a guard

### Question

How can **&&** guard an operation, and why can it return an unwanted zero?

### Code

~~~js
function showItems(items) {
    return items.length > 0 && items.join(", ");
}

console.log(showItems(["pen", "notebook"]));
console.log(showItems([]));

const count = 0;

console.log("direct result:", count && "Items available");
console.log("explicit check:", count > 0 && "Items available");
~~~

### Expected output

~~~text
pen, notebook
false
direct result: 0
explicit check: false
~~~

### Explanation

When the array is empty, **items.length > 0** is false, so **&&** returns **false** and skips **items.join()**.

The expression **count && message** returns zero when **count** is zero. In a UI, that zero might be rendered. Use the actual condition, such as **count > 0**, when a Boolean check is intended.

## 6. Normalize a Boolean result

### Question

How can you convert a value to its Boolean truthiness?

### Code

~~~js
const values = ["hello", "", 0, []];

for (const value of values) {
    console.log(Boolean(value), !!value);
}
~~~

### Expected output

~~~text
true true
false false
false false
true true
~~~

### Explanation

**Boolean(value)** and **!!value** both return a Boolean based on truthiness. **Boolean(value)** often communicates the conversion more clearly.

## 7. Use logical assignment

### Question

How do **||=**, **&&=**, and **??=** decide whether to assign?

### Code

~~~js
let name = "";
name ||= "Guest";

let enabled = true;
enabled &&= false;

let pageSize = 0;
pageSize ??= 20;

console.log("name:", name);
console.log("enabled:", enabled);
console.log("page size:", pageSize);
~~~

### Expected output

~~~text
name: Guest
enabled: false
page size: 0
~~~

### Explanation

- **||=** assigns because the empty string is falsy.
- **&&=** assigns because the old value is truthy.
- **??=** leaves zero unchanged because zero is not nullish.

The right side is evaluated only when assignment is needed.

## 8. Short-circuit with a nullish default

### Question

How can you provide a default for a possibly missing value, then apply a truthy fallback if the result is empty?

### Code

~~~js
function labelFor(value) {
    return (value ?? "Default") || "Unknown";
}

console.log(labelFor("Mina"));
console.log(labelFor(null));
console.log(labelFor(""));
~~~

### Expected output

~~~text
Mina
Default
Unknown
~~~

### Explanation

The parentheses group nullish coalescing before logical OR. **null** receives **"Default"** from **??**. An empty string is not nullish, so it passes through that step, then **||** selects **"Unknown"** because the empty string is falsy.

Without parentheses, JavaScript rejects a direct mix of **??** and **||**.

## 9. Guard access to a nested value

### Question

How can **&&** prevent a property access from running when its parent value is missing?

### Code

~~~js
function getActiveName(user) {
    return user && user.active && user.name;
}

console.log(getActiveName({ active: true, name: "Mina" }));
console.log(getActiveName(null));
console.log(getActiveName({ active: false, name: "Mina" }));
~~~

### Expected output

~~~text
Mina
null
false
~~~

### Explanation

Each **&&** stops at the first falsy value. This pattern short-circuits access to **user.active** when **user** is null. Its result may be the original falsy value, such as **null** or **false**, rather than a Boolean. Optional chaining is another useful tool for guarded property access and is covered in the next chapter.

## 10. Check precedence and parentheses

### Question

How do parentheses change the grouping of logical AND and logical OR?

### Code

~~~js
console.log("default grouping:", true || false && false);
console.log("explicit grouping:", (true || false) && false);
~~~

### Expected output

~~~text
default grouping: true
explicit grouping: false
~~~

### Explanation

Logical AND has higher precedence than logical OR. The first expression groups as **true || (false && false)**. Parentheses change the second expression's grouping.

When combining **??** with **&&** or **||**, JavaScript requires parentheses.

## Try it yourself

1. Add **NaN** and an empty object to the fallback comparison in section 3.
2. Change **showItems()** so it returns an empty array when there are no items.
3. Put a function call on the right of **&&** and log whether it ran.
4. Use **||=** with zero, then use **??=** with zero and compare the results.
5. Rewrite **getActiveName()** with an **if** statement.
6. Try a default value of **false** with **||** and **??**.
7. Add parentheses to a larger expression combining **&&** and **||**.
8. Explain which side effects short-circuiting prevents in your code.

## Key points

- Logical operators make a truthiness or nullish decision and return operand values.
- **&&** skips its right side when its left operand is falsy.
- **||** skips its right side when its left operand is truthy.
- **??** skips its right side unless the left operand is **null** or **undefined**.
- Use **||** when every falsy value should trigger a default.
- Use **??** when valid falsy values such as zero must be preserved.
- **||=**, **&&=**, and **??=** conditionally assign and short-circuit their right sides.
- Parenthesize combinations of **??** with **&&** or **||**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [26 - Operators, precedence, and associativity](../lessons/026-operators-precedence-and-associativity.md) | [Open lesson](../lessons/027-logical-operators-and-short-circuiting.md) | [Open Q&A](../qnas/027-logical-operators-and-short-circuiting.md) | [28 - Optional chaining and nullish coalescing](../lessons/028-optional-chaining-and-nullish-coalescing.md) |
