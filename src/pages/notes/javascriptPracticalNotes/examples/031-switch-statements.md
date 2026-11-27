# 31 - switch statements: examples

These examples show switch statements for matching fixed values, grouping case labels, handling fall-through, and choosing between switch and if. Each section includes a task, code, expected output, and explanation.

## Example 1: Match a command

**Question:** How can a program run a different action for a save command?

**Code:**

~~~js
const command = "save";

switch (command) {
    case "open":
        console.log("Opening file.");
        break;

    case "save":
        console.log("Saving file.");
        break;

    default:
        console.log("Unknown command.");
}
~~~

**Expected output:**

~~~text
Saving file.
~~~

**Explanation:**

The switch input matches the string in the save case. Break exits the switch after that case runs.

## Example 2: Handle an unmatched value with default

**Question:** What message should appear for an unsupported menu choice?

**Code:**

~~~js
const choice = 9;

switch (choice) {
    case 1:
        console.log("Create");
        break;

    case 2:
        console.log("Open");
        break;

    default:
        console.log("Choose 1 or 2.");
}
~~~

**Expected output:**

~~~text
Choose 1 or 2.
~~~

**Explanation:**

No case matches Number 9, so the default body runs. Default is the fallback clause.

## Example 3: Case matching does not coerce types

**Question:** Does Number 2 match a case containing string "2"?

**Code:**

~~~js
const value = 2;

switch (value) {
    case "2":
        console.log("String case");
        break;

    case 2:
        console.log("Number case");
        break;
}
~~~

**Expected output:**

~~~text
Number case
~~~

**Explanation:**

Switch matching uses strict equality. Number 2 and string "2" are different values.

## Example 4: Group several cases into one result

**Question:** How can Saturday and Sunday share a weekend result?

**Code:**

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

**Expected output:**

~~~text
Weekend
Weekday
Unknown day
~~~

**Explanation:**

Consecutive labels share the statements beneath them. Return exits the function, so no break is needed.

## Example 5: See accidental fall-through

**Question:** What happens when a matching case does not end with break?

**Code:**

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

**Expected output:**

~~~text
Level one
Level two
~~~

**Explanation:**

Execution starts at case 1. With no break, it continues into case 2. The break there then exits the switch.

## Example 6: Stop after the matching case

**Question:** How can each case run only its own body?

**Code:**

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

**Expected output:**

~~~text
Level one
~~~

**Explanation:**

Each break stops execution from falling through into later cases.

## Example 7: Put default last for clarity

**Question:** How can an unsupported status use a simple fallback?

**Code:**

~~~js
function getStatusMessage(status) {
    switch (status) {
        case "ready":
            return "Ready to start";
        case "running":
            return "Work in progress";
        case "complete":
            return "Finished";
        default:
            return "Unknown status";
    }
}

console.log(getStatusMessage("running"));
console.log(getStatusMessage("paused"));
~~~

**Expected output:**

~~~text
Work in progress
Unknown status
~~~

**Explanation:**

Each case returns a value. Default handles any input that does not match one of the known status strings.

## Example 8: Match a case after a default clause

**Question:** If a matching case appears after default, does the default body run first?

**Code:**

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

**Expected output:**

~~~text
Two
~~~

**Explanation:**

The matching case 2 is selected, so execution begins there. The earlier default body is skipped. Keep default last unless there is a reason to place it elsewhere.

## Example 9: No match with a default in the middle

**Question:** What happens when no case matches and default appears before another case?

**Code:**

~~~js
const value = 99;

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

**Expected output:**

~~~text
Default
Two
~~~

**Explanation:**

No case matches, so execution begins at default. There is no break after its body, so the following case body runs too.

## Example 10: Return directly from a case

**Question:** How can a function return a message for known response codes?

**Code:**

~~~js
function getResponseMessage(code) {
    switch (code) {
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

console.log(getResponseMessage(404));
~~~

**Expected output:**

~~~text
Not found
~~~

**Explanation:**

Return exits the function immediately. A break after a return would never be reached.

## Example 11: A case expression is not automatically a condition

**Question:** Why does a comparison in a case label fail to match the score?

**Code:**

~~~js
const score = 95;

switch (score) {
    case score >= 90:
        console.log("High score");
        break;

    default:
        console.log("Other score");
}
~~~

**Expected output:**

~~~text
Other score
~~~

**Explanation:**

The case expression **score >= 90** evaluates to true. The switch input is Number 95, which is not strictly equal to Boolean true. Use an if statement for ranges.

## Example 12: Keep declarations scoped to each case

**Question:** How can separate switch cases declare a const with the same name?

**Code:**

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

**Expected output:**

~~~text
Second
~~~

**Explanation:**

Each case body has its own braces, so each const declaration is in a separate lexical scope.

## Example 13: Break exits the switch, not the loop

**Question:** Does a break inside a switch stop an enclosing loop?

**Code:**

~~~js
for (const value of [1, 2, 3]) {
    switch (value) {
        case 2:
            console.log("Matched two");
            break;

        default:
            console.log("Value:", value);
    }

    console.log("Next item");
}
~~~

**Expected output:**

~~~text
Value: 1
Next item
Matched two
Next item
Value: 3
Next item
~~~

**Explanation:**

The break exits the nearest switch. The for loop continues with its next item.

## Example 14: Use a named constant as a case value

**Question:** Can a case compare the switch input with a value stored in a variable?

**Code:**

~~~js
const STATUS_READY = "ready";
const currentStatus = "ready";

switch (currentStatus) {
    case STATUS_READY:
        console.log("Ready");
        break;

    default:
        console.log("Not ready");
}
~~~

**Expected output:**

~~~text
Ready
~~~

**Explanation:**

A case label can be an expression. This constant evaluates to the string "ready", which strictly matches the switch input.

## Example 15: Use an if chain for ranges

**Question:** How should a program classify values by numeric range?

**Code:**

~~~js
function describeTemperature(value) {
    if (value < 0) {
        return "Below freezing";
    } else if (value <= 20) {
        return "Cool";
    } else {
        return "Warm";
    }
}

console.log(describeTemperature(-3));
console.log(describeTemperature(15));
console.log(describeTemperature(28));
~~~

**Expected output:**

~~~text
Below freezing
Cool
Warm
~~~

**Explanation:**

If is clearer than switch when branches depend on relational comparisons rather than fixed values.

## Example 16: Compare Number, Boolean, and string cases

**Question:** How can a switch keep values with different types separate?

**Code:**

~~~js
function describeValue(value) {
    switch (value) {
        case 1:
            return "Number";
        case true:
            return "Boolean";
        case "1":
            return "String";
        default:
            return "Other";
    }
}

console.log(describeValue(1));
console.log(describeValue(true));
console.log(describeValue("1"));
~~~

**Expected output:**

~~~text
Number
Boolean
String
~~~

**Explanation:**

Strict matching distinguishes Number 1, Boolean true, and string "1".

## Example 17: Choose a shipping method

**Question:** How can a command-like value select a shipping description?

**Code:**

~~~js
function describeShipping(method) {
    switch (method) {
        case "pickup":
            return "Collect your order";
        case "standard":
            return "Standard delivery";
        case "express":
            return "Express delivery";
        default:
            return "Choose a supported method";
    }
}

console.log(describeShipping("express"));
console.log(describeShipping("drone"));
~~~

**Expected output:**

~~~text
Express delivery
Choose a supported method
~~~

**Explanation:**

This is a good switch use case because one value is compared with a small set of known alternatives.

## Example 18: Group cases with intentional fall-through

**Question:** How can two categories deliberately share the same handling?

**Code:**

~~~js
function canViewReports(role) {
    let allowed = false;

    switch (role) {
        case "admin":
            allowed = true;
            // Intentional fall-through.
        case "manager":
            allowed = true;
            break;
        default:
            break;
    }

    return allowed;
}

console.log(canViewReports("admin"));
console.log(canViewReports("manager"));
console.log(canViewReports("guest"));
~~~

**Expected output:**

~~~text
true
true
false
~~~

**Explanation:**

Admin intentionally falls through to the manager body. This example works, but grouping adjacent labels without duplicated assignments is simpler when both roles always have identical behavior.

## Example 19: Handle an optional default

**Question:** What does a switch do when no case matches and there is no default?

**Code:**

~~~js
function isKnownCommand(command) {
    let known = false;

    switch (command) {
        case "open":
            known = true;
            break;
        case "close":
            known = true;
            break;
    }

    return known;
}

console.log(isKnownCommand("open"));
console.log(isKnownCommand("save"));
~~~

**Expected output:**

~~~text
true
false
~~~

**Explanation:**

Default is optional. When there is no match and no default, the switch runs no case body and continues after the switch.

## Example 20: Handle different months with shared season labels

**Question:** How can several month numbers map to the same season?

**Code:**

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

console.log(getSeason(1));
console.log(getSeason(8));
console.log(getSeason(13));
~~~

**Expected output:**

~~~text
Winter
Summer
Invalid month
~~~

**Explanation:**

Each group of month labels shares one return statement. The default case handles numbers outside the supported month range.

## Summary

- Use switch to compare one expression with several discrete case values.
- Case matching is strict, so the input and case values must have matching types.
- Use break to stop after a branch, unless returning, throwing, or deliberately falling through.
- Use consecutive labels to share one body.
- Default is optional and handles the no-match case.
- Case clauses share the switch block scope, so use braces for local let and const declarations.
- A break inside a switch exits the switch, not an enclosing loop.
- Prefer if for ranges and compound conditions.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [30 - Conditional statements](../lessons/030-conditional-statements.md) | [Open lesson](../lessons/031-switch-statements.md) | [Open Q&A](../qnas/031-switch-statements.md) | [32 - Loops and iteration statements](../lessons/032-loops-and-iteration-statements.md) |
