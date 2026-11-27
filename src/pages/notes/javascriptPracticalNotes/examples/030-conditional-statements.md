# 30 - Conditional statements: examples

These examples show how JavaScript chooses branches with **if**, **else if**, and **else**. Each example includes a small task, code, expected output, and explanation.

## Example 1: Run code only when a condition is true

**Question:** How can a program run a message only when a temperature is above 25?

**Code:**

~~~js
const temperature = 28;

if (temperature > 25) {
    console.log("It is warm.");
}

console.log("Temperature check complete.");
~~~

**Expected output:**

~~~text
It is warm.
Temperature check complete.
~~~

**Explanation:**

The comparison **temperature > 25** evaluates to true, so the block runs. The final log is outside the block and runs afterward.

## Example 2: Choose between two branches

**Question:** How can a program choose between a signed-in screen and a sign-in screen?

**Code:**

~~~js
const isLoggedIn = false;

if (isLoggedIn) {
    console.log("Show the account.");
} else {
    console.log("Show the sign-in form.");
}
~~~

**Expected output:**

~~~text
Show the sign-in form.
~~~

**Explanation:**

The value is false, so the if branch is skipped and the else branch runs.

## Example 3: Select the first matching score range

**Question:** How can a score be assigned a letter grade?

**Code:**

~~~js
function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else {
        return "Needs improvement";
    }
}

console.log(getGrade(92));
console.log(getGrade(84));
console.log(getGrade(71));
console.log(getGrade(55));
~~~

**Expected output:**

~~~text
A
B
C
Needs improvement
~~~

**Explanation:**

Conditions are checked from top to bottom. The first matching branch returns a value, so later branches are not checked.

## Example 4: See truthy and falsy values in conditions

**Question:** Which of these values enter an if branch?

**Code:**

~~~js
const values = [0, "0", "", [], null];

for (const value of values) {
    if (value) {
        console.log("truthy");
    } else {
        console.log("falsy");
    }
}
~~~

**Expected output:**

~~~text
falsy
truthy
falsy
truthy
falsy
~~~

**Explanation:**

Zero, the empty string, and null are falsy. A non-empty string and an array are truthy. An empty array is still an object.

## Example 5: Preserve zero as a valid value

**Question:** How can a program check whether a count exists without treating zero as missing?

**Code:**

~~~js
const count = 0;

if (count !== null && count !== undefined) {
    console.log("Count:", count);
} else {
    console.log("No count.");
}
~~~

**Expected output:**

~~~text
Count: 0
~~~

**Explanation:**

The code explicitly checks for null and undefined. Since zero is neither, the valid value is preserved. A simple **if (count)** check would treat zero as falsy.

## Example 6: Require every condition with logical AND

**Question:** How can entry require both an adult age and a ticket?

**Code:**

~~~js
function canEnter(age, hasTicket) {
    if (age >= 18 && hasTicket) {
        return "Entry allowed.";
    }

    return "Entry denied.";
}

console.log(canEnter(22, true));
console.log(canEnter(17, true));
console.log(canEnter(22, false));
~~~

**Expected output:**

~~~text
Entry allowed.
Entry denied.
Entry denied.
~~~

**Explanation:**

Logical AND succeeds only when both conditions are truthy.

## Example 7: Accept either of two conditions with logical OR

**Question:** How can an admin or page owner be allowed to edit?

**Code:**

~~~js
function canEdit(isAdmin, isOwner) {
    if (isAdmin || isOwner) {
        return "Editing allowed.";
    }

    return "Editing denied.";
}

console.log(canEdit(true, false));
console.log(canEdit(false, true));
console.log(canEdit(false, false));
~~~

**Expected output:**

~~~text
Editing allowed.
Editing allowed.
Editing denied.
~~~

**Explanation:**

Logical OR succeeds when at least one condition is truthy.

## Example 8: Group related conditions with parentheses

**Question:** How can a user with an account continue if they are a guest or have an invitation?

**Code:**

~~~js
const hasAccount = true;
const isGuest = false;
const hasInvitation = true;

if (hasAccount && (isGuest || hasInvitation)) {
    console.log("Continue.");
} else {
    console.log("Access denied.");
}
~~~

**Expected output:**

~~~text
Continue.
~~~

**Explanation:**

The parentheses group the alternatives. The account condition must pass, and then either the guest condition or invitation condition must pass.

## Example 9: Use strict equality for a status check

**Question:** How can a request be approved only when its status is exactly the string "approved"?

**Code:**

~~~js
const status = "approved";

if (status === "approved") {
    console.log("Request approved.");
} else {
    console.log("Request is not approved.");
}
~~~

**Expected output:**

~~~text
Request approved.
~~~

**Explanation:**

Strict equality compares value and type without coercion.

## Example 10: Check an inclusive numeric range

**Question:** How can a score be checked to ensure it is from 0 through 100?

**Code:**

~~~js
function isScoreInRange(score) {
    return score >= 0 && score <= 100;
}

console.log(isScoreInRange(0));
console.log(isScoreInRange(76));
console.log(isScoreInRange(100));
console.log(isScoreInRange(101));
~~~

**Expected output:**

~~~text
true
true
true
false
~~~

**Explanation:**

Both comparisons must be true. The comparison operators include the endpoints because they use **>=** and **<=**.

## Example 11: Avoid chained mathematical comparisons

**Question:** Why should a range check not be written as **0 <= value <= 100**?

**Code:**

~~~js
const value = -5;

console.log(0 <= value <= 100);
console.log(value >= 0 && value <= 100);
~~~

**Expected output:**

~~~text
true
false
~~~

**Explanation:**

JavaScript evaluates the first expression from left to right. **0 <= value** is false, then false is converted to zero, and **0 <= 100** is true. Use two comparisons joined by logical AND.

## Example 12: Keep more specific conditions first

**Question:** How can an age category avoid an unreachable adult branch?

**Code:**

~~~js
function getAgeGroup(age) {
    if (age >= 18) {
        return "adult";
    } else if (age >= 13) {
        return "teenager";
    } else {
        return "child";
    }
}

console.log(getAgeGroup(20));
console.log(getAgeGroup(16));
console.log(getAgeGroup(10));
~~~

**Expected output:**

~~~text
adult
teenager
child
~~~

**Explanation:**

The adult test is first because all adult ages also satisfy **age >= 13**. Ordering the broader teenager test first would prevent the adult branch from running.

## Example 13: Short-circuit a guarded operation

**Question:** How can a program check that a user exists before reading an active property?

**Code:**

~~~js
function isActiveUser(user) {
    return user !== null && user !== undefined && user.isActive === true;
}

console.log(isActiveUser({ isActive: true }));
console.log(isActiveUser({ isActive: false }));
console.log(isActiveUser(null));
~~~

**Expected output:**

~~~text
true
false
false
~~~

**Explanation:**

When user is null, the first check is false. When it is undefined, the second check is false. In either case JavaScript short-circuits before reading **user.isActive**, so no property access error occurs.

## Example 14: Observe short-circuit evaluation

**Question:** Does the right side of **&&** run when the left side is false?

**Code:**

~~~js
let checks = 0;

function runCheck() {
    checks += 1;
    return true;
}

if (false && runCheck()) {
    console.log("Branch ran.");
}

console.log(checks);
~~~

**Expected output:**

~~~text
0
~~~

**Explanation:**

Logical AND stops as soon as its left operand is falsy. The function is not called.

## Example 15: Use a guard clause to reduce nesting

**Question:** How can a function handle invalid input before its normal path?

**Code:**

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

console.log(getDiscountMessage(-1, true));
console.log(getDiscountMessage(70, true));
console.log(getDiscountMessage(30, false));
~~~

**Expected output:**

~~~text
Age is invalid.
Senior member discount.
No membership discount.
~~~

**Explanation:**

Each guard clause returns immediately for a case that needs no further checks. The regular path is less nested and easier to follow.

## Example 16: Compare a nested conditional with clear branches

**Question:** How can a sign-in screen choose an account page for admins and a profile page for other signed-in users?

**Code:**

~~~js
function getPage(isLoggedIn, isAdmin) {
    if (isLoggedIn) {
        if (isAdmin) {
            return "Admin dashboard";
        } else {
            return "Profile";
        }
    } else {
        return "Sign-in";
    }
}

console.log(getPage(true, true));
console.log(getPage(true, false));
console.log(getPage(false, false));
~~~

**Expected output:**

~~~text
Admin dashboard
Profile
Sign-in
~~~

**Explanation:**

The second decision only happens after the user is known to be logged in. Braces make each level of the decision visible.

## Example 17: Understand a missing-braces mistake

**Question:** Which message runs when **isReady** is false?

**Code:**

~~~js
const isReady = false;

if (isReady)
    console.log("Ready");

console.log("Finished");
~~~

**Expected output:**

~~~text
Finished
~~~

**Explanation:**

Without braces, the if controls only the next statement. The final log is outside the if. Add braces even for a one-statement branch to make later edits safer.

## Example 18: Avoid assignment in a condition by mistake

**Question:** What changes when an assignment operator is used instead of a comparison?

**Code:**

~~~js
let status = "pending";

if (status = "approved") {
    console.log("Branch runs:", status);
}

status = "pending";

if (status === "approved") {
    console.log("This line does not run.");
} else {
    console.log("Comparison failed:", status);
}
~~~

**Expected output:**

~~~text
Branch runs: approved
Comparison failed: pending
~~~

**Explanation:**

Assignment changes the variable and evaluates to the assigned value. The non-empty string is truthy, so the first branch runs. Strict equality checks the current value without changing it.

## Example 19: Use Boolean NOT to handle a negative case

**Question:** How can an unfinished task be detected from a Boolean state?

**Code:**

~~~js
const isComplete = false;

if (!isComplete) {
    console.log("Finish the task.");
} else {
    console.log("Task complete.");
}
~~~

**Expected output:**

~~~text
Finish the task.
~~~

**Explanation:**

The **!** operator reverses the Boolean result. Here, not complete is true.

## Example 20: Put the decision in a reusable function

**Question:** How can an order's shipping message depend on its total and delivery choice?

**Code:**

~~~js
function getShippingMessage(total, isExpress) {
    if (total < 0) {
        return "Invalid total.";
    } else if (isExpress) {
        return "Express shipping selected.";
    } else if (total >= 50) {
        return "Free standard shipping.";
    } else {
        return "Standard shipping fee applies.";
    }
}

console.log(getShippingMessage(75, false));
console.log(getShippingMessage(20, true));
console.log(getShippingMessage(-1, false));
~~~

**Expected output:**

~~~text
Free standard shipping.
Express shipping selected.
Invalid total.
~~~

**Explanation:**

The function checks invalid input first, then handles express shipping, then checks the free-shipping threshold. Changing the order could make one of the intended branches unreachable.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [29 - Bitwise operators and integer operations](../lessons/029-bitwise-operators-and-integer-operations.md) | [Open lesson](../lessons/030-conditional-statements.md) | [Open Q&A](../qnas/030-conditional-statements.md) | [31 - switch statements](../lessons/031-switch-statements.md) |

