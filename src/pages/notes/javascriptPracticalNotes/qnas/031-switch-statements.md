# 31 - switch statements: Q&A

Use these questions to review case matching, **break**, **default**, fall-through, scope, and choosing between switch and if. Each answer follows its question.

## Multiple-choice questions

### 1. How does switch compare its input with case values?

A. With loose equality  
B. With strict equality  
C. By converting every value to a string  
D. By converting every value to a Boolean

**Answer:** B. With strict equality.

**Explanation:** A case matches only when its value is strictly equal to the switch input. Number **2** does not match string **"2"**.

### 2. What does break do inside a switch?

A. Exits the nearest switch statement  
B. Exits every loop and function  
C. Skips only the next statement  
D. Restarts the switch

**Answer:** A. Exits the nearest switch statement.

**Explanation:** Break stops fall-through and continues execution after the switch. If the switch is inside a loop, the break exits the switch, not the loop.

### 3. When does default run?

A. Whenever the first case does not match  
B. Only when no case matches  
C. Before every case  
D. Only when the switch input is undefined

**Answer:** B. Only when no case matches.

**Explanation:** Default is the fallback clause. It is optional and can be placed anywhere, although placing it last is usually clearest.

### 4. What is fall-through?

A. A case expression being skipped  
B. Execution continuing into later case bodies because there is no break or other exit  
C. The switch expression evaluating to undefined  
D. A default clause running before a match

**Answer:** B. Execution continuing into later case bodies because there is no break or other exit.

**Explanation:** After entering a matching case, JavaScript continues through later statements until it reaches break, return, throw, or the end of the switch.

### 5. Which construct is usually clearest for checking whether a number is between two bounds?

A. A switch with Boolean case expressions  
B. An if statement with two comparisons  
C. A default clause  
D. A fall-through case

**Answer:** B. An if statement with two comparisons.

**Explanation:** Switch is designed to compare one value with discrete alternatives. If handles ranges and compound conditions more directly.

### 6. Which pair of cases intentionally shares one body?

A. Consecutive labels with no statements between them  
B. Labels separated by a break  
C. Labels inside separate switch statements  
D. A case and a default in different functions

**Answer:** A. Consecutive labels with no statements between them.

**Explanation:** Execution enters at the matching label and continues into the shared body below it.

### 7. Which statement about default is correct?

A. It must always be the first clause.  
B. It can appear only when the switch has one case.  
C. It is optional and conventionally placed last.  
D. It prevents fall-through.

**Answer:** C. It is optional and conventionally placed last.

**Explanation:** Default provides behavior when no case matches. It does not automatically stop fall-through.

### 8. What happens if a case has no break?

A. The switch throws a syntax error.  
B. Execution continues into the following case body.  
C. The switch starts again from the first case.  
D. The default clause runs immediately.

**Answer:** B. Execution continues into the following case body.

**Explanation:** This behavior is fall-through. It can be intentional, but an accidental missing break is a common bug.

### 9. What happens when the Number **2** is compared with the string case **"2"**?

~~~js
switch (2) {
    case "2":
        // This case does not match.
}
~~~

A. The case matches because both look like 2.  
B. The case does not match because the types differ.  
C. Both Number and string cases run.  
D. The switch throws a TypeError.

**Answer:** B. The case does not match because the types differ.

**Explanation:** Switch matching uses strict equality. Number **2** and string **"2"** are different values.
### 10. Where do let and const declarations directly inside case clauses belong?

A. Each case automatically gets its own lexical scope.  
B. They share the switch block's lexical scope.  
C. They become global variables.  
D. They are scoped to the nearest break.

**Answer:** B. They share the switch block's lexical scope.

**Explanation:** Add braces around case bodies when separate lexical declarations are needed in different cases.

## Predict the output

### 11. What does this print?

~~~js
const action = "save";

switch (action) {
    case "open":
        console.log("Open");
        break;

    case "save":
        console.log("Save");
        break;

    default:
        console.log("Unknown");
}
~~~

**Answer:**

~~~text
Save
~~~

**Explanation:** The switch input matches the string value in the save case.

### 12. What does this print?

~~~js
switch (2) {
    case "2":
        console.log("String");
        break;

    case 2:
        console.log("Number");
        break;

    default:
        console.log("Other");
}
~~~

**Answer:**

~~~text
Number
~~~

**Explanation:** Case matching is strict. The string case is skipped and the Number case matches.

### 13. What does this print?

~~~js
const value = "x";

switch (value) {
    case "a":
        console.log("A");
        break;

    default:
        console.log("Default");
        break;

    case "x":
        console.log("X");
        break;
}
~~~

**Answer:**

~~~text
X
~~~

**Explanation:** A matching case is selected even when it appears after default. The default body is skipped because a case matched.

### 14. What does this print?

~~~js
const value = "unknown";

switch (value) {
    case "a":
        console.log("A");
        break;

    default:
        console.log("Default");
    case "x":
        console.log("X");
        break;
}
~~~

**Answer:**

~~~text
Default
X
~~~

**Explanation:** No case matches, so execution starts at default. Since there is no break after default, execution falls through to the x case body.

### 15. What does this print?

~~~js
const number = 3;

switch (number) {
    case 1:
        console.log("One");

    case 2:
        console.log("Two");

    case 3:
        console.log("Three");

    default:
        console.log("Default");
}
~~~

**Answer:**

~~~text
Three
Default
~~~

**Explanation:** Execution starts at the matching case 3. There is no break, so it continues into default.

### 16. What does this print?

~~~js
function getKind(value) {
    switch (value) {
        case "cat":
        case "dog":
            return "animal";

        default:
            return "other";
    }
}

console.log(getKind("dog"));
console.log(getKind("bird"));
~~~

**Answer:**

~~~text
animal
other
~~~

**Explanation:** The cat and dog labels share the same body. Return exits the function, so a break is not needed.

### 17. What does this print?

~~~js
const score = 95;

switch (score) {
    case score >= 90:
        console.log("High");
        break;

    default:
        console.log("Other");
}
~~~

**Answer:**

~~~text
Other
~~~

**Explanation:** The case expression evaluates to Boolean true. The switch input is Number 95, so they are not strictly equal.

### 18. What does this print?

~~~js
const result = [];

switch (NaN) {
    case NaN:
        result.push("matched");
        break;

    default:
        result.push("default");
}

console.log(result[0]);
~~~

**Answer:**

~~~text
default
~~~

**Explanation:** NaN is not strictly equal to itself, so the NaN case does not match.

### 19. What does this print?

~~~js
for (const item of ["a", "b"]) {
    switch (item) {
        case "a":
            console.log("A");
            break;

        default:
            console.log("Other");
    }

    console.log("Next item");
}
~~~

**Answer:**

~~~text
A
Next item
Other
Next item
~~~

**Explanation:** Each break exits only its switch. The for loop continues to the next item.

### 20. What does this print?

~~~js
let checks = 0;

function makeValue() {
    checks += 1;
    return "ready";
}

switch (makeValue()) {
    case "ready":
        console.log("Ready");
        break;

    default:
        console.log("Other");
}

console.log(checks);
~~~

**Answer:**

~~~text
Ready
1
~~~

**Explanation:** The switch expression is evaluated once. It is not reevaluated for each case.

## True or false

### 21. A switch case uses strict equality matching.

**Answer:** True.

**Explanation:** A Number case and a string case with similar text are different values for matching.

### 22. A matching case automatically stops before the next case.

**Answer:** False.

**Explanation:** Execution continues into later case bodies unless a break, return, throw, or the end of the switch stops it.

### 23. The default clause must be the last clause.

**Answer:** False.

**Explanation:** JavaScript permits default elsewhere, though placing it last usually makes the code easier to read.

### 24. Default prevents later case bodies from running if it is reached.

**Answer:** False.

**Explanation:** Default is another clause. Without a break or other exit, execution can fall through to later clauses.

### 25. Consecutive case labels can share one body.

**Answer:** True.

**Explanation:** Put the labels together without statements between them, then write the shared statements after the final label.

### 26. Break inside a switch nested in a loop exits the loop.

**Answer:** False.

**Explanation:** Break exits the nearest switch. The loop proceeds to its next iteration.

### 27. A case expression such as **case score > 90** tests whether the switch input exceeds 90.

**Answer:** False.

**Explanation:** The case expression evaluates to true or false, and that value is compared with the switch input.

### 28. Each case automatically has a separate scope for const declarations.

**Answer:** False.

**Explanation:** Case clauses share the switch block's lexical scope. Add a block inside a case to isolate its declarations.

## Short-answer questions

### 29. What is the basic purpose of switch?

**Answer:** To select a branch by comparing one expression with several discrete case values.

**Explanation:** Use it for alternatives such as menu commands, status codes, or known categories.

### 30. What does break do in a switch?

**Answer:** It exits the nearest switch statement.

**Explanation:** It usually prevents execution from continuing into the next case body.

### 31. When can a switch branch omit break?

**Answer:** When it returns, throws, or intentionally falls through to later code.

**Explanation:** Return exits the function and throw exits normal execution. An intentional fall-through should be clear from the code and comments.

### 32. How can multiple case values share behavior?

**Answer:** Place consecutive case labels before the shared statements.

**Explanation:** Execution starts at the matching label and reaches the common body below them.

### 33. Is default required?

**Answer:** No.

**Explanation:** Add it when unmatched values need a fallback. Leaving it out is fine when no action is appropriate for unknown values.

### 34. Why does case "1" not match switch (1)?

**Answer:** Because the case value is a string and the switch input is a Number.

**Explanation:** Switch matching uses strict equality and does not coerce the two values.

### 35. Why should range checks usually use if instead of switch?

**Answer:** If directly expresses relational comparisons and combinations of conditions.

**Explanation:** Switch compares its input with case values. A comparison inside a case is just a Boolean value to compare against the input.

### 36. How can two cases each declare a const with the same name?

**Answer:** Put each case body inside its own block.

~~~js
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
}
~~~

**Explanation:** The braces create separate lexical scopes for the declarations.

## Coding and reasoning questions

### 37. Write a switch that maps three commands to messages and handles unknown commands.

**Answer:**

~~~js
function getMessage(command) {
    switch (command) {
        case "save":
            return "Saving";
        case "print":
            return "Printing";
        case "help":
            return "Showing help";
        default:
            return "Unknown command";
    }
}
~~~

**Explanation:** Each branch returns from the function. A separate break is unnecessary after return.

### 38. Group Saturday and Sunday into one weekend branch.

**Answer:**

~~~js
function getDayType(day) {
    switch (day) {
        case "Saturday":
        case "Sunday":
            return "Weekend";
        default:
            return "Weekday or unknown";
    }
}
~~~

**Explanation:** Both labels lead to the same return statement.

### 39. Fix this switch so only the selected case runs.

~~~js
switch (status) {
    case "ready":
        start();
    case "waiting":
        wait();
    default:
        finish();
}
~~~

**Answer:**

~~~js
switch (status) {
    case "ready":
        start();
        break;
    case "waiting":
        wait();
        break;
    default:
        finish();
        break;
}
~~~

**Explanation:** Each break prevents accidental fall-through. The final break is optional at the end of the switch, but it can make the pattern consistent.

### 40. Rewrite a range-based switch idea using if.

~~~js
switch (score) {
    case score >= 90:
        grade = "A";
        break;
    default:
        grade = "Other";
}
~~~

**Answer:**

~~~js
if (score >= 90) {
    grade = "A";
} else {
    grade = "Other";
}
~~~

**Explanation:** The case expression in the original code evaluates to a Boolean. It does not apply the comparison to the switch input.

### 41. Make default handle an unsupported numeric choice.

**Answer:**

~~~js
function getMenuAction(choice) {
    switch (choice) {
        case 1:
            return "Open";
        case 2:
            return "Save";
        case 3:
            return "Quit";
        default:
            return "Choose 1, 2, or 3";
    }
}
~~~

**Explanation:** Default covers every input that does not strictly match 1, 2, or 3.

### 42. What change would make this switch match both Number 1 and string "1"?

~~~js
switch (input) {
    case 1:
        handleOne();
        break;
}
~~~

**Answer:** Add a separate string case or normalize the input before the switch.

~~~js
switch (input) {
    case 1:
    case "1":
        handleOne();
        break;
}
~~~

**Explanation:** Case values are compared strictly, so Number 1 and string "1" need distinct labels unless the input is converted first.

### 43. Predict the result, then explain why.

~~~js
function getLabel(value) {
    switch (value) {
        case 0:
            return "zero";
        case false:
            return "false";
        default:
            return "other";
    }
}

console.log(getLabel(0));
console.log(getLabel(false));
console.log(getLabel("0"));
~~~

**Answer:**

~~~text
zero
false
other
~~~

**Explanation:** Number zero matches only the Number case. Boolean false matches its own case. String "0" matches neither.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [30 - Conditional statements](../lessons/030-conditional-statements.md) | [Open lesson](../lessons/031-switch-statements.md) | [Open example](../examples/031-switch-statements.md) | [32 - Loops and iteration statements](../lessons/032-loops-and-iteration-statements.md) |

