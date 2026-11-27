# 30 - Conditional statements

Conditional statements let a program choose which statements to run. JavaScript evaluates a condition as true or false, then follows the matching path.

This lesson covers **if**, **else if**, and **else**, how truthy and falsy values work in conditions, how to combine checks, and how to make branches clear and reliable.

## The if statement

Use **if** to run a statement only when its condition is truthy.

~~~js
const temperature = 28;

if (temperature > 25) {
    console.log("It is warm.");
}
~~~

Output:

~~~text
It is warm.
~~~

The expression inside parentheses is evaluated first. If its value is truthy, JavaScript runs the statement or block that follows. If it is falsy, JavaScript skips it and continues after the conditional.

~~~js
const temperature = 18;

if (temperature > 25) {
    console.log("It is warm.");
}

console.log("The check is complete.");
~~~

Output:

~~~text
The check is complete.
~~~

An **if** condition does not have to produce the Boolean value **true** or **false**. JavaScript converts its result to a Boolean for the decision.

## Conditions and truthiness

In a condition, JavaScript applies its Boolean conversion rules.

The following values are falsy:

- **false**
- **0** and **-0**
- **0n**
- **NaN**
- **""**, the empty string
- **null**
- **undefined**

Most other values are truthy, including:

- Non-empty strings such as **"false"** and **"0"**
- Any object, including an empty object
- Any array, including an empty array
- Functions

~~~js
if ("false") {
    console.log("A non-empty string is truthy.");
}

if ([]) {
    console.log("An empty array is truthy.");
}

if (0) {
    console.log("This line is skipped.");
}
~~~

Output:

~~~text
A non-empty string is truthy.
An empty array is truthy.
~~~

Do not confuse a value that looks like false with the Boolean value **false**. The string **"false"** is truthy because it is not empty.

### Check a value directly or check its type intentionally

A truthiness check is useful when any truthy value should enable a branch:

~~~js
const username = "Asha";

if (username) {
    console.log("A username was provided.");
}
~~~

But truthiness can be too broad. If zero is a valid value, **if (count)** treats zero as missing. If you mean to check only whether a value exists, compare it explicitly with **null** and **undefined**, or use **!= null** when excluding both nullish values is intended.

~~~js
const count = 0;

if (count !== null && count !== undefined) {
    console.log("Count:", count);
}
~~~

Output:

~~~text
Count: 0
~~~

Choose the condition that describes the requirement. Do not rely on truthiness when values such as zero or the empty string have valid meaning.

## The if...else statement

Use **else** to choose a fallback branch when the **if** condition is falsy.

~~~js
const isLoggedIn = false;

if (isLoggedIn) {
    console.log("Show the account.");
} else {
    console.log("Show the sign-in form.");
}
~~~

Output:

~~~text
Show the sign-in form.
~~~

Exactly one branch in an **if...else** statement runs. The **else** branch has no condition of its own. It handles every case that did not enter the **if** branch.

## An if...else if...else chain

Use **else if** to check more conditions in order.

~~~js
const score = 84;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: needs improvement");
}
~~~

Output:

~~~text
Grade: B
~~~

JavaScript checks the conditions from top to bottom. It runs the first matching branch and skips the rest of the chain. If none match, it runs the final **else**, when one is present.

Order matters. Put more specific or higher-priority cases first when a later condition could also match the earlier case.

~~~js
const age = 16;

if (age >= 13) {
    console.log("Teenager or older.");
} else if (age >= 18) {
    console.log("Adult.");
}
~~~

Output:

~~~text
Teenager or older.
~~~

The adult branch can never run because every age of 18 or more also passes the first condition. Put the adult check first:

~~~js
if (age >= 18) {
    console.log("Adult.");
} else if (age >= 13) {
    console.log("Teenager.");
}
~~~

## Blocks and braces

A block groups statements between braces. Use blocks for conditional branches, even when a branch contains only one statement.

~~~js
const hasPermission = true;

if (hasPermission) {
    console.log("First action");
    console.log("Second action");
}
~~~

Without braces, an **if** controls only the next statement. Indentation does not change which statement is controlled.

~~~js
const isReady = false;

if (isReady)
    console.log("Ready");

console.log("This always runs.");
~~~

Output:

~~~text
This always runs.
~~~

The second **console.log** is not part of the **if**, even though it could be indented to look as if it were. Braces make the branch boundary clear and help prevent accidental behavior when code changes.

A block also creates a lexical scope for **let** and **const** declarations:

~~~js
if (true) {
    const message = "Inside this block";
    console.log(message);
}

// message is not available here.
~~~

## Combine conditions

Logical operators help describe requirements involving more than one check.

### Logical AND: all conditions must be truthy

~~~js
const age = 22;
const hasTicket = true;

if (age >= 18 && hasTicket) {
    console.log("Entry allowed.");
}
~~~

Output:

~~~text
Entry allowed.
~~~

The **&&** operator short-circuits. If the left condition is falsy, JavaScript does not evaluate the right side.

### Logical OR: at least one condition must be truthy

~~~js
const isAdmin = false;
const isOwner = true;

if (isAdmin || isOwner) {
    console.log("You can edit this page.");
}
~~~

Output:

~~~text
You can edit this page.
~~~

The **||** operator short-circuits. If the left value is truthy, JavaScript does not evaluate the right side.

### Logical NOT: reverse a Boolean decision

~~~js
const isComplete = false;

if (!isComplete) {
    console.log("Finish the task.");
}
~~~

Output:

~~~text
Finish the task.
~~~

For readability, prefer a positive condition when it makes the branch easier to understand. A check such as **if (isComplete)** is often clearer than deeply nested negations.

### Group related conditions

Use parentheses to make the intended grouping visible, especially when mixing **&&** and **||**.

~~~js
const hasAccount = true;
const isGuest = false;
const hasInvitation = true;

if (hasAccount && (isGuest || hasInvitation)) {
    console.log("Continue.");
}
~~~

Output:

~~~text
Continue.
~~~

The parentheses say that a user needs an account and must be either a guest or invited.

## Compare values carefully

Conditions often use comparison operators.

~~~js
const password = "learn-js";

if (password === "learn-js") {
    console.log("Password accepted.");
}
~~~

Output:

~~~text
Password accepted.
~~~

Use **===** and **!==** for equality checks in most application code. They compare without converting values to another type.

~~~js
console.log(0 === false);
console.log(0 == false);
~~~

Output:

~~~text
false
true
~~~

Loose equality can produce results that are difficult to anticipate because it may convert operands. Strict equality makes the intended type and value comparison explicit.

For ranges, use relational operators and combine the boundaries clearly:

~~~js
const score = 76;

if (score >= 0 && score <= 100) {
    console.log("The score is in range.");
}
~~~

Output:

~~~text
The score is in range.
~~~

A chained mathematical comparison such as **0 <= score <= 100** does not work as it does in ordinary mathematics. JavaScript evaluates it from left to right, so write both comparisons and join them with **&&**.

## The condition is evaluated once for its decision

A condition may include a function call or another expression. Its result determines the branch.

~~~js
function isWeekend(day) {
    return day === "Saturday" || day === "Sunday";
}

if (isWeekend("Saturday")) {
    console.log("Rest day.");
}
~~~

Output:

~~~text
Rest day.
~~~

Avoid putting surprising side effects into conditions. A condition that changes state while checking it is harder to understand:

~~~js
let attempts = 0;

if (++attempts > 0) {
    console.log("An attempt was recorded.");
}
~~~

This code is valid, but changing **attempts** inside the condition can make the branch harder to reason about. Prefer keeping the update and the decision visibly separate when clarity matters.

## Nested conditionals

An **if** statement can appear inside another conditional branch.

~~~js
const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn) {
    if (isAdmin) {
        console.log("Open the admin dashboard.");
    } else {
        console.log("Open the account page.");
    }
} else {
    console.log("Open the sign-in page.");
}
~~~

Output:

~~~text
Open the account page.
~~~

Nesting is useful when one decision only makes sense after another. Deeply nested logic becomes difficult to follow. Consider combining conditions or using early returns when that makes the structure clearer.

## Guard clauses and early returns

Inside a function, a guard clause handles an invalid or special case early and returns. The main path can then stay less nested.

~~~js
function getDiscountMessage(age, hasMembership) {
    if (age < 0) {
        return "Age is invalid.";
    }

    if (!hasMembership) {
        return "No membership discount.";
    }

    if (age >= 65) {
        return "Senior member discount.";
    }

    return "Member discount.";
}

console.log(getDiscountMessage(70, true));
console.log(getDiscountMessage(30, false));
~~~

Output:

~~~text
Senior member discount.
No membership discount.
~~~

A **return** exits the function immediately. Later statements in that function call do not run. Guard clauses are not a special JavaScript syntax feature; they are a way to organize ordinary conditional statements.

## Common mistakes

### Using assignment when a comparison was intended

~~~js
let status = "pending";

if (status = "approved") {
    console.log("This branch runs.");
}
~~~

The assignment changes **status** and evaluates to the assigned non-empty string, which is truthy. To compare values, use strict equality:

~~~js
if (status === "approved") {
    console.log("This branch runs only when status is approved.");
}
~~~

### Assuming braces or indentation are optional for grouping

Only braces form a block. Indentation is for people reading the code and does not group statements. Use braces to show exactly which statements belong to each branch.

### Repeating a condition that an earlier branch already covered

If the first branch catches every value that could match a later branch, that later branch is unreachable. Review ranges from top to bottom and check where they overlap.

### Using a truthiness check when zero is valid

~~~js
const quantity = 0;

if (quantity) {
    console.log("Quantity was provided.");
} else {
    console.log("This incorrectly treats zero as missing.");
}
~~~

If zero is valid, test the actual condition you care about, such as whether the value is a number or whether it is non-nullish.

### Leaving out a fallback when unexpected values need handling

A final **else** is optional. Add one when the program should explicitly handle every other case. Leave it out when doing nothing is intentional and clear.

## Choosing between if and other constructs

Use **if** when the decision depends on ranges, multiple conditions, or different kinds of checks.

The next chapter covers **switch**, which can make selection among several discrete values clearer. A conditional expression using **? :** is useful when choosing one of two values inside an expression, but it is not a replacement for statement blocks with multiple actions.

Choose the form that makes the decision easiest to read. Avoid compressing several branches into a dense expression.

## Try it yourself

1. Write an **if** statement that reports whether a number is positive.
2. Add an **else** branch that reports zero or a negative number.
3. Use an **else if** chain to label a score as high, medium, or low.
4. Check whether a value is between 1 and 10, including both boundaries.
5. Make a truthiness table for **0**, **"0"**, **[]**, **""**, and **null**.
6. Rewrite a nested conditional using guard clauses in a function.
7. Find a case where an earlier range condition makes a later branch unreachable.
8. Explain why **0 <= value <= 10** does not test a range correctly.
9. Add braces to a conditional that currently controls only one statement.
10. Write an access check that requires a valid account and either an admin role or an invitation.

## Key points

- **if** runs a branch when its condition is truthy.
- **else** handles the unmatched case. **else if** checks additional conditions in order.
- Only the first matching branch in an **if...else if** chain runs.
- JavaScript converts a condition to Boolean using truthiness rules.
- Zero, empty strings, **null**, **undefined**, **NaN**, **false**, and **0n** are falsy. Objects and arrays are truthy, including empty ones.
- Braces make branch boundaries clear and create a block scope for **let** and **const**.
- Use **===** for clear equality checks and parentheses for complex Boolean logic.
- Use explicit checks when a falsy value such as zero is still meaningful.
- Guard clauses can reduce nesting inside functions.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [29 - Bitwise operators and integer operations](029-bitwise-operators-and-integer-operations.md) | [Open Q&A](../qnas/030-conditional-statements.md) | [Open example](../examples/030-conditional-statements.md) | [31 - switch statements](031-switch-statements.md) |
