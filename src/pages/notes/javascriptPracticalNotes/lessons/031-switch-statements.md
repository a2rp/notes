# 31 - switch statements

A **switch** statement chooses a path by comparing one value with several possible case values. It is useful when one expression is matched against a list of discrete alternatives.

This lesson explains switch syntax, strict case matching, **break**, **default**, intentional fall-through, scope inside a switch, and how to choose between switch and if.

## Basic switch syntax

~~~js
switch (expression) {
    case valueA:
        // Statements for valueA
        break;

    case valueB:
        // Statements for valueB
        break;

    default:
        // Statements when no case matches
}
~~~

JavaScript evaluates the expression and compares its value with the case expressions using strict equality. When a case matches, execution starts at that case label.

~~~js
const day = "Tuesday";

switch (day) {
    case "Monday":
        console.log("Start of the work week.");
        break;

    case "Tuesday":
        console.log("Second day of the work week.");
        break;

    default:
        console.log("Another day.");
}
~~~

Output:

~~~text
Second day of the work week.
~~~

The switch checks the value once. It does not reevaluate **day** for each case.

## Case matching is strict

A switch case does not perform loose type conversion. The case value must match the switch value with strict equality.

~~~js
const code = 1;

switch (code) {
    case "1":
        console.log("String case");
        break;

    case 1:
        console.log("Number case");
        break;

    default:
        console.log("No match");
}
~~~

Output:

~~~text
Number case
~~~

The Number **1** does not match the string **"1"**. This makes switch useful for explicit values, but it also means the type of the input matters.

Case labels can use expressions. Those expressions are checked as case values, not treated as Boolean conditions automatically.

~~~js
const role = "editor";
const editorRole = "editor";

switch (role) {
    case editorRole:
        console.log("Editing is available.");
        break;

    default:
        console.log("Read-only access.");
}
~~~

Output:

~~~text
Editing is available.
~~~

If you need to check ranges or several different Boolean conditions, an **if...else if** chain is usually clearer.

## Why break matters

A **break** statement exits the nearest switch statement. Without a break, execution continues into the following case body. This behavior is called **fall-through**.

~~~js
const level = 1;

switch (level) {
    case 1:
        console.log("Level one");

    case 2:
        console.log("Level two");
        break;

    default:
        console.log("Unknown level");
}
~~~

Output:

~~~text
Level one
Level two
~~~

The value matches case 1. Since there is no break after that case, JavaScript also runs the statements under case 2. Add a break when this is not intentional.

~~~js
const level = 1;

switch (level) {
    case 1:
        console.log("Level one");
        break;

    case 2:
        console.log("Level two");
        break;

    default:
        console.log("Unknown level");
}
~~~

Output:

~~~text
Level one
~~~

Each break prevents execution from falling through into the next branch. A break is unnecessary when the branch exits by **return** or **throw**, because execution has already left the current flow.

## The default branch

The **default** clause runs when none of the case values match. It is optional. By convention, place it last so readers can find the fallback easily.

~~~js
function getSeason(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "Winter";

        case 3:
        case 4:
        case 5:
            return "Spring";

        case 6:
        case 7:
        case 8:
            return "Summer";

        case 9:
        case 10:
        case 11:
            return "Autumn";

        default:
            return "Invalid month";
    }
}

console.log(getSeason(4));
console.log(getSeason(13));
~~~

Output:

~~~text
Spring
Invalid month
~~~

A switch can contain one default clause. It can be placed among the cases, but placing it at the end is usually clearer. If no case matches, execution begins at default and then follows the normal fall-through rules.

## Group cases that share behavior

Several case labels can lead to the same body. Put the labels one after another without statements between them.

~~~js
function getDayType(day) {
    switch (day) {
        case "Saturday":
        case "Sunday":
            return "Weekend";

        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
        case "Friday":
            return "Weekday";

        default:
            return "Unknown day";
    }
}

console.log(getDayType("Sunday"));
console.log(getDayType("Wednesday"));
console.log(getDayType("Holiday"));
~~~

Output:

~~~text
Weekend
Weekday
Unknown day
~~~

The first matching case label is found. Since that label has no statements before the next label, execution continues into the shared body. The return exits the function.

This is intentional fall-through. Make it easy to recognize by keeping grouped labels together and adding a comment if the shared behavior is not obvious.

## A switch inside a function

A switch statement can return a value from a function. When each branch returns, the return exits the function, so a break is not needed.

~~~js
function getHttpMessage(status) {
    switch (status) {
        case 200:
            return "Success";

        case 404:
            return "Not found";

        case 500:
            return "Server error";

        default:
            return "Other response";
    }
}

console.log(getHttpMessage(404));
~~~

Output:

~~~text
Not found
~~~

Returning from a branch is often clear when the switch selects one result. If a branch performs work and then continues after the switch, use break instead.

## Fall-through to a later case

A case can deliberately continue into another branch. This is sometimes useful, but unplanned fall-through is a common bug.

~~~js
function getAccess(role) {
    let access = "read";

    switch (role) {
        case "admin":
            access = "delete";
            // Intentional fall-through.

        case "editor":
            access = access === "delete" ? access : "write";
            break;

        default:
            break;
    }

    return access;
}

console.log(getAccess("admin"));
console.log(getAccess("editor"));
console.log(getAccess("viewer"));
~~~

Output:

~~~text
delete
write
read
~~~

For admin, execution starts in the admin case, sets delete access, then falls through to the editor case. The editor case preserves the admin value. Editor starts at its own case and gets write access. Viewer uses the default, which makes no change.

This example demonstrates fall-through, but two separate cases or an if statement can be clearer for real permission rules. Do not rely on implicit fall-through unless it is deliberate and documented.

## Case expressions are values, not conditions

A switch compares its input to each case expression. It does not interpret a case expression as a condition to test against the input.

~~~js
const score = 92;

switch (score) {
    case score >= 90:
        console.log("High score");
        break;

    default:
        console.log("Other score");
}
~~~

Output:

~~~text
Other score
~~~

The expression **score >= 90** evaluates to the Boolean **true**. The switch then compares the Number **92** to that Boolean. They are not strictly equal, so the default branch runs.

For ranges, use if:

~~~js
if (score >= 90) {
    console.log("High score");
} else {
    console.log("Other score");
}
~~~

## The default clause can appear between cases

JavaScript permits default to appear before or between case clauses. Its location does not change how a matching case is selected. If no case matches, execution starts at default and can continue into later case bodies.

~~~js
const value = 2;

switch (value) {
    case 1:
        console.log("One");
        break;

    default:
        console.log("Default");

    case 2:
        console.log("Two");
        break;
}
~~~

Output:

~~~text
Two
~~~

Case 2 matches, so execution starts there. The earlier default body is skipped. Since default placement can surprise readers, keep it last unless there is a specific reason not to.

## Block scope in a switch

The braces around switch form one shared lexical scope for its case clauses. A **let** or **const** declared directly under one case is not automatically scoped to that case alone.

This can cause a duplicate declaration error:

~~~js
switch (kind) {
    case "first":
        const message = "First";
        break;

    case "second":
        const message = "Second";
        break;
}
~~~

Both declarations are in the same switch block. Use a block inside each case when each branch needs its own lexical declarations:

~~~js
const kind = "second";

switch (kind) {
    case "first": {
        const message = "First";
        console.log(message);
        break;
    }

    case "second": {
        const message = "Second";
        console.log(message);
        break;
    }

    default: {
        console.log("Other");
    }
}
~~~

Output:

~~~text
Second
~~~

The extra braces create a separate block for each case body. A break still exits the switch.

## Break in a switch inside a loop

A break inside a switch exits the switch, not the surrounding loop.

~~~js
for (const value of [1, 2, 3]) {
    switch (value) {
        case 2:
            console.log("Matched two");
            break;

        default:
            console.log("Value:", value);
    }

    console.log("Loop continues");
}
~~~

Output:

~~~text
Value: 1
Loop continues
Matched two
Loop continues
Value: 3
Loop continues
~~~

The break after **Matched two** exits only the switch. The loop continues with its next value. To exit the loop itself, use a loop-level condition or a labeled break when a labeled exit is genuinely needed.

## Choosing between switch and if

Use switch when one expression is compared with several discrete, fixed values:

~~~js
switch (command) {
    case "save":
        saveFile();
        break;

    case "print":
        printPage();
        break;

    default:
        showHelp();
}
~~~

Use if when branches depend on ranges, combinations of conditions, or different kinds of tests:

~~~js
if (temperature < 0) {
    console.log("Below freezing");
} else if (temperature <= 20) {
    console.log("Cool");
} else {
    console.log("Warm");
}
~~~

Do not choose based only on the number of branches. Choose the form that makes the matching rule clear.

## Common mistakes

### Forgetting break

Without break, a matching case continues into later cases. Add break, return, or throw unless fall-through is intentional.

### Expecting type coercion

A case containing **"2"** does not match a switch value of Number **2**. Normalize input before the switch if the application requires conversion.

### Using cases as ranges

A case expression such as **case score > 90** evaluates to true or false. It does not mean that the switch input is greater than 90. Use if for ranges.

### Putting declarations in a shared switch scope

Case clauses share the switch block's lexical scope. Wrap case bodies in braces when they declare their own **let** or **const** bindings.

### Assuming break exits an enclosing loop

A break inside a switch exits that switch. It does not automatically exit an outer loop.

### Forgetting the fallback

If an unexpected value must be handled, include a default clause. If unknown values should be ignored, omitting default can be intentional.

## Try it yourself

1. Write a switch that maps a numeric menu choice to an action name.
2. Add a default branch for unknown choices.
3. Group three case labels that share the same result.
4. Remove a break and predict which later statements run.
5. Make a switch that distinguishes Number **1** from string **"1"**.
6. Rewrite a switch range check as an if...else if chain.
7. Declare a separate const variable in two case bodies using braces.
8. Put default between two case clauses and predict behavior when the later case matches.
9. Place a switch inside a loop and show that break exits only the switch.
10. Decide whether a switch or if chain best describes a role and permission check.

## Key points

- A switch evaluates its input and matches case values using strict equality.
- Only the selected case expression is the entry point. Execution can continue into later cases.
- Use break to leave the switch unless the branch returns, throws, or intentionally falls through.
- Default handles the no-match case and is optional. Putting it last is easiest to read.
- Consecutive case labels can share one body.
- Case expressions are values, not automatic Boolean conditions or ranges.
- Case clauses share the switch block scope. Add braces around individual case bodies that need their own let or const declarations.
- A break inside a switch exits the switch, not an enclosing loop.
- Use switch for discrete alternatives and if for ranges or compound conditions.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [30 - Conditional statements](030-conditional-statements.md) | [Open Q&A](../qnas/031-switch-statements.md) | [Open example](../examples/031-switch-statements.md) | [32 - Loops and iteration statements](032-loops-and-iteration-statements.md) |
