# 33 - break, continue, and labels: Q&A

Use these questions to review how **break**, **continue**, and labels change loop control. Each answer follows its question.

## Multiple-choice questions

### 1. What does an unlabelled break do inside a loop?

A. Exits the nearest enclosing loop or switch  
B. Exits every loop in the program  
C. Skips the current iteration only  
D. Restarts the loop

**Answer:** A. It exits the nearest enclosing loop or switch.

**Explanation:** An unlabelled break targets the nearest breakable statement. Execution continues after that loop or switch.

### 2. What does continue do inside a loop?

A. Exits the function  
B. Skips the rest of the current iteration and moves to the next iteration  
C. Exits every enclosing loop  
D. Stops the program

**Answer:** B. It skips the rest of the current iteration and moves to the next iteration.

**Explanation:** The loop itself remains active.

### 3. What happens to the afterthought in a classic for loop after continue?

A. It is skipped permanently.  
B. It runs before the condition is checked again.  
C. It runs before the body starts.  
D. It exits the loop.

**Answer:** B. It runs before the condition is checked again.

**Explanation:** Continue skips the remaining body statements, then the classic for loop performs its update expression.

### 4. What is required for a labeled break to work?

A. The label must name an enclosing labeled statement.  
B. The label must name a variable.  
C. The label must appear after the break.  
D. The label must be attached to a function.

**Answer:** A. The label must name an enclosing labeled statement.

**Explanation:** Labels identify statements around the break. They cannot be used as arbitrary jump destinations.

### 5. What can a labeled continue target?

A. Any labeled statement  
B. An enclosing iteration statement  
C. A function declaration  
D. A switch statement

**Answer:** B. An enclosing iteration statement.

**Explanation:** A labeled continue must refer to an enclosing loop. It cannot target a labeled block or switch.

### 6. Can a labeled break exit a labeled block that is not a loop?

A. Yes  
B. No  
C. Only inside a function  
D. Only after a continue

**Answer:** A. Yes.

**Explanation:** A labeled break can exit its enclosing labeled statement, including a block. A labeled continue, in contrast, must target a loop.

### 7. What does break inside a switch nested in a loop exit?

A. The function  
B. The outer loop  
C. The switch  
D. Both the switch and loop

**Answer:** C. The switch.

**Explanation:** The unlabelled break exits the nearest breakable statement, which is the switch.

### 8. What does continue inside a switch nested in a loop do?

A. Continues the switch at the next case  
B. Continues the enclosing loop  
C. Exits the function  
D. Causes a syntax error

**Answer:** B. It continues the enclosing loop.

**Explanation:** Switch is not an iteration statement. Continue targets the surrounding loop.

### 9. Which statement exits the entire current function?

A. break  
B. continue  
C. return  
D. case

**Answer:** C. return.

**Explanation:** Return exits the function call. Break and continue change loop or switch flow.

### 10. Why can break and continue not control a forEach iteration?

A. forEach is not a loop statement that those controls can target  
B. Arrays do not support control flow  
C. forEach runs only once  
D. The callback cannot contain statements

**Answer:** A. forEach is not a loop statement that those controls can target.

**Explanation:** Use for...of or a classic loop when loop-level break or continue is needed. Array methods such as find or some can also be a better fit for searches.

## Predict the output

### 11. What does this print?

~~~js
for (let number = 1; number <= 5; number += 1) {
    if (number === 4) {
        break;
    }

    console.log(number);
}
~~~

**Answer:**

~~~text
1
2
3
~~~

**Explanation:** When number becomes 4, break exits the loop before the log.

### 12. What does this print?

~~~js
for (let number = 1; number <= 5; number += 1) {
    if (number === 3) {
        continue;
    }

    console.log(number);
}
~~~

**Answer:**

~~~text
1
2
4
5
~~~

**Explanation:** Continue skips the log for 3. The loop continues with the next number.

### 13. What does this print?

~~~js
for (let index = 0; index < 4; index += 1) {
    if (index === 1) {
        continue;
    }

    console.log(index);
}
~~~

**Answer:**

~~~text
0
2
3
~~~

**Explanation:** Continue skips the rest of the body at index 1. The for loop still increments index before checking its condition again.

### 14. What does this print?

~~~js
let count = 0;

while (count < 4) {
    count += 1;

    if (count === 2) {
        continue;
    }

    console.log(count);
}
~~~

**Answer:**

~~~text
1
3
4
~~~

**Explanation:** Count is updated before continue, so the loop still progresses. The value 2 is skipped by the log.

### 15. What does this print?

~~~js
for (let row = 1; row <= 2; row += 1) {
    for (let column = 1; column <= 3; column += 1) {
        if (column === 2) {
            break;
        }

        console.log(row, column);
    }

    console.log("Row complete");
}
~~~

**Answer:**

~~~text
1 1
Row complete
2 1
Row complete
~~~

**Explanation:** The break exits the inner loop only. The outer loop continues with its next row.

### 16. What does this print?

~~~js
const values = [1, 2, 3, 4];

search: for (const value of values) {
    if (value === 3) {
        break search;
    }

    console.log(value);
}

console.log("Done");
~~~

**Answer:**

~~~text
1
2
Done
~~~

**Explanation:** The labeled break exits the loop named search as soon as value is 3.

### 17. What does this print?

~~~js
const rows = [
    [1, 2],
    [],
    [3]
];

rowLoop: for (const row of rows) {
    if (row.length === 0) {
        continue rowLoop;
    }

    for (const value of row) {
        console.log(value);
    }
}
~~~

**Answer:**

~~~text
1
2
3
~~~

**Explanation:** The empty row triggers a continue to the outer loop. Its inner loop is skipped, and processing moves to the next row.

### 18. What does this print?

~~~js
for (const value of [1, 2, 3]) {
    switch (value) {
        case 2:
            continue;
        default:
            console.log(value);
    }
}
~~~

**Answer:**

~~~text
1
3
~~~

**Explanation:** Continue skips the current iteration of the enclosing for...of loop. Switch does not capture continue.

### 19. What does this print?

~~~js
let result = "start";

finish: {
    result = "updated";
    break finish;
    result = "unreachable";
}

console.log(result);
~~~

**Answer:**

~~~text
updated
~~~

**Explanation:** The labeled break exits the block. The statement after break is not reached.

### 20. What does this print?

~~~js
function findFirstEven(values) {
    for (const value of values) {
        if (value % 2 === 0) {
            return value;
        }
    }

    return undefined;
}

console.log(findFirstEven([1, 3, 8, 10]));
~~~

**Answer:**

~~~text
8
~~~

**Explanation:** Return exits the function as soon as the first even value is found.

### 21. What does this print?

~~~js
for (const command of ["open", "quit", "save"]) {
    switch (command) {
        case "open":
            console.log("Open");
            break;
        case "quit":
            console.log("Quit");
            break;
        default:
            console.log("Other");
    }

    if (command === "quit") {
        break;
    }
}
~~~

**Answer:**

~~~text
Open
Quit
~~~

**Explanation:** The breaks inside switch exit the switch. The separate break after the switch exits the loop when command is quit.

## True or false

### 22. An unlabelled break exits every enclosing loop.

**Answer:** False.

**Explanation:** It exits only the nearest loop or switch.

### 23. Continue exits the current loop entirely.

**Answer:** False.

**Explanation:** It skips the remaining body statements for the current iteration and starts another iteration.

### 24. Continue in a classic for loop still runs the afterthought expression.

**Answer:** True.

**Explanation:** The afterthought runs before the next condition check.

### 25. A labeled break can exit a labeled block.

**Answer:** True.

**Explanation:** A break label can target an enclosing labeled statement, including a block.

### 26. A labeled continue can target a labeled block that is not a loop.

**Answer:** False.

**Explanation:** The target of a labeled continue must be an enclosing iteration statement.

### 27. Continue in a switch inside a loop continues the switch.

**Answer:** False.

**Explanation:** Switch is not a loop. Continue acts on the enclosing loop.

### 28. Return inside a loop exits the function containing that loop.

**Answer:** True.

**Explanation:** Return leaves the whole function call, not just the current iteration.

### 29. Break and continue can be used to control a forEach callback's surrounding iteration.

**Answer:** False.

**Explanation:** They cannot target the forEach method's internal iteration from the callback. Use a loop statement or an array method designed to stop early.

## Short-answer questions

### 30. What is the difference between break and continue?

**Answer:** Break exits the nearest loop or switch. Continue skips the rest of the current loop iteration.

**Explanation:** Break proceeds after the target statement. Continue proceeds with another iteration.

### 31. What is a label?

**Answer:** A label is a name written before a statement and followed by a colon.

**Explanation:** A labeled break can target the named enclosing statement. A labeled continue can target an enclosing loop.

### 32. Why are labels useful with nested loops?

**Answer:** They let code exit or continue a specific outer loop directly.

**Explanation:** Without labels, unlabelled break or continue affects only the nearest loop.

### 33. Does break inside a switch nested in a loop exit the loop?

**Answer:** No. It exits the nearest switch.

**Explanation:** A second break after the switch, or a labeled break, is needed to leave the loop.

### 34. Why can continue cause an infinite while loop?

**Answer:** It can skip an update that the loop needs to make its condition false.

**Explanation:** Put the update before continue or otherwise ensure every path progresses.

### 35. How is return different from break?

**Answer:** Return exits the function. Break exits the nearest loop or switch, or a named labeled statement.

**Explanation:** Use return when the function's result is ready, not merely to leave one loop.

### 36. Can a label jump to a statement that appears elsewhere in the program?

**Answer:** No.

**Explanation:** Labels are limited to enclosing statements. They are not general-purpose goto targets.

### 37. Why is a regular loop useful instead of forEach when a search should stop early?

**Answer:** A loop can use break or return to stop as soon as the target is found.

**Explanation:** A return inside a forEach callback returns from the callback, not from the surrounding function.

## Coding and reasoning questions

### 38. Write a loop that prints values until it finds 5, then stops.

**Answer:**

~~~js
for (const value of [2, 4, 5, 8]) {
    if (value === 5) {
        break;
    }

    console.log(value);
}
~~~

**Explanation:** Break exits the loop before 5 is printed.

### 39. Use continue to print only odd numbers.

**Answer:**

~~~js
for (const value of [1, 2, 3, 4, 5]) {
    if (value % 2 === 0) {
        continue;
    }

    console.log(value);
}
~~~

**Explanation:** Even values skip the log. Odd values reach it.

### 40. Fix this while loop so continue does not prevent progress.

~~~js
let count = 0;

while (count < 5) {
    if (count === 2) {
        continue;
    }

    console.log(count);
    count += 1;
}
~~~

**Answer:**

~~~js
let count = 0;

while (count < 5) {
    count += 1;

    if (count === 2) {
        continue;
    }

    console.log(count);
}
~~~

**Explanation:** The update happens before continue, so count advances even when 2 is skipped.

### 41. Use labeled break to exit both loops when the target is found.

**Answer:**

~~~js
const rows = [
    [1, 2],
    [3, 4]
];

let found;

search: for (const row of rows) {
    for (const value of row) {
        if (value === 3) {
            found = value;
            break search;
        }
    }
}

console.log(found);
~~~

**Expected output:**

~~~text
3
~~~

**Explanation:** Break search exits the labeled outer loop and its nested loop.

### 42. Use labeled continue to skip an empty row.

**Answer:**

~~~js
const rows = [
    [1, 2],
    [],
    [3, 4]
];

rowLoop: for (const row of rows) {
    if (row.length === 0) {
        continue rowLoop;
    }

    console.log(row[0]);
}
~~~

**Expected output:**

~~~text
1
3
~~~

**Explanation:** The labeled continue skips the rest of the current outer iteration.

### 43. Replace this forEach search with a loop that can stop early.

~~~js
let found;

[2, 4, 7, 8].forEach((value) => {
    if (value === 7) {
        found = value;
    }
});
~~~

**Answer:**

~~~js
let found;

for (const value of [2, 4, 7, 8]) {
    if (value === 7) {
        found = value;
        break;
    }
}
~~~

**Explanation:** Break stops the for...of loop as soon as the match is found.

### 44. Explain which statement each break exits.

~~~js
for (const value of [1, 2]) {
    switch (value) {
        case 1:
            console.log("One");
            break;
        default:
            console.log("Other");
    }

    break;
}
~~~

**Answer:** The first break exits the switch. The second break exits the for...of loop.

**Explanation:** Each unlabelled break targets the nearest enclosing breakable statement at its location.

### 45. When is a labeled block a reasonable choice?

**Answer:** When a small, clearly named block needs one early exit from nested condition checks and a helper function or ordinary if structure would be less clear.

**Explanation:** Labeled blocks are legal but uncommon. Use them sparingly because a return or simpler branch is often easier to read.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [32 - Loops and iteration statements](../lessons/032-loops-and-iteration-statements.md) | [Open lesson](../lessons/033-break-continue-and-labels.md) | [Open example](../examples/033-break-continue-and-labels.md) | [34 - Errors, exceptions, and try, catch, and finally](../lessons/034-errors-exceptions-and-try-catch-and-finally.md) |

