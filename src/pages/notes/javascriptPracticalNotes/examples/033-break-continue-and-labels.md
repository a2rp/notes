# 33 - break, continue, and labels: examples

These examples show how to stop loops, skip an iteration, and target an outer loop with a label. Each one includes a task, code, expected output, and explanation.

## Example 1: Stop when a value is found

**Question:** How can a loop stop as soon as it reaches the value 4?

**Code:**

~~~js
for (const number of [1, 2, 3, 4, 5]) {
    if (number === 4) {
        break;
    }

    console.log(number);
}

console.log("Search ended.");
~~~

**Expected output:**

~~~text
1
2
3
Search ended.
~~~

**Explanation:**

Break exits the nearest loop immediately. The matching value is not printed because break runs before the log.

## Example 2: Skip one value with continue

**Question:** How can a loop print every number except 3?

**Code:**

~~~js
for (const number of [1, 2, 3, 4, 5]) {
    if (number === 3) {
        continue;
    }

    console.log(number);
}
~~~

**Expected output:**

~~~text
1
2
4
5
~~~

**Explanation:**

Continue skips the remaining statements in the current iteration and moves to the next value.

## Example 3: Continue still updates a classic for loop

**Question:** Does the update expression run after continue in a classic for loop?

**Code:**

~~~js
for (let index = 0; index < 5; index += 1) {
    if (index === 2) {
        continue;
    }

    console.log(index);
}
~~~

**Expected output:**

~~~text
0
1
3
4
~~~

**Explanation:**

When index is 2, the log is skipped, then the for-loop update runs. The condition is checked again with index equal to 3.

## Example 4: Update a while loop before continuing

**Question:** How can a while loop skip 3 without becoming stuck on it?

**Code:**

~~~js
let count = 0;

while (count < 5) {
    count += 1;

    if (count === 3) {
        continue;
    }

    console.log(count);
}
~~~

**Expected output:**

~~~text
1
2
4
5
~~~

**Explanation:**

The counter advances before continue. If the increment were skipped when count was 3, the condition would never make progress.

## Example 5: Break exits only the nearest loop

**Question:** What does an unlabelled break exit in nested loops?

**Code:**

~~~js
for (let row = 1; row <= 2; row += 1) {
    for (let column = 1; column <= 3; column += 1) {
        if (column === 2) {
            break;
        }

        console.log(row, column);
    }

    console.log("Row finished");
}
~~~

**Expected output:**

~~~text
1 1
Row finished
2 1
Row finished
~~~

**Explanation:**

The break exits the inner column loop. The outer row loop continues.

## Example 6: Exit a nested search with labeled break

**Question:** How can a nested loop stop completely when a target is found?

**Code:**

~~~js
const rows = [
    [1, 2],
    [3, 4],
    [5, 6]
];

let found;

search: for (const row of rows) {
    for (const value of row) {
        if (value === 4) {
            found = value;
            break search;
        }
    }
}

console.log(found);
console.log("Search complete.");
~~~

**Expected output:**

~~~text
4
Search complete.
~~~

**Explanation:**

The label search names the outer loop. Break search exits that loop and the inner loop nested inside it.

## Example 7: Skip the rest of one outer iteration

**Question:** How can an empty row be skipped while continuing with the next row?

**Code:**

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

    for (const value of row) {
        console.log(value);
    }

    console.log("Row complete");
}
~~~

**Expected output:**

~~~text
1
2
Row complete
3
4
Row complete
~~~

**Explanation:**

Continue rowLoop skips the remaining code for the empty row and begins the next outer-loop iteration.

## Example 8: Continue from a switch to its enclosing loop

**Question:** What does continue do when it appears inside a switch nested in a loop?

**Code:**

~~~js
for (const value of [1, 2, 3, 4]) {
    switch (value) {
        case 2:
        case 4:
            continue;

        default:
            console.log(value);
    }
}
~~~

**Expected output:**

~~~text
1
3
~~~

**Explanation:**

Switch is not a loop, so continue applies to the enclosing for...of loop. Values 2 and 4 skip the rest of their iterations.

## Example 9: Exit a labeled block

**Question:** Can a labeled break leave a block that is not a loop?

**Code:**

~~~js
let result = "not checked";

check: {
    if (2 + 2 === 4) {
        result = "matched";
        break check;
    }

    result = "fallback";
}

console.log(result);
~~~

**Expected output:**

~~~text
matched
~~~

**Explanation:**

Break check exits the labeled block. Labeled blocks are legal, though an ordinary conditional or helper function is often clearer.

## Example 10: Return the first match from a loop

**Question:** How can a function stop searching and return the first even number?

**Code:**

~~~js
function findFirstEven(numbers) {
    for (const number of numbers) {
        if (number % 2 === 0) {
            return number;
        }
    }

    return undefined;
}

console.log(findFirstEven([1, 3, 8, 10]));
~~~

**Expected output:**

~~~text
8
~~~

**Explanation:**

Return exits the entire function call. It is appropriate when the function's result has been found.

## Example 11: Use find for a simple search

**Question:** Can an array method replace a loop that returns the first matching value?

**Code:**

~~~js
const firstEven = [1, 3, 8, 10].find((number) => number % 2 === 0);

console.log(firstEven);
~~~

**Expected output:**

~~~text
8
~~~

**Explanation:**

Find returns the first element that passes the callback. It stops searching after a match. Use a loop when the search needs more complex statements or control flow.

## Example 12: Use continue to filter console output

**Question:** How can a loop print only positive values?

**Code:**

~~~js
for (const value of [-2, 0, 4, -1, 7]) {
    if (value <= 0) {
        continue;
    }

    console.log(value);
}
~~~

**Expected output:**

~~~text
4
7
~~~

**Explanation:**

Non-positive values skip the rest of the iteration. Positive values reach the log statement.

## Example 13: Distinguish switch break from loop break

**Question:** How can a program exit a switch case and then separately exit the loop?

**Code:**

~~~js
for (const command of ["open", "quit", "save"]) {
    switch (command) {
        case "open":
            console.log("Opening");
            break;

        case "quit":
            console.log("Quitting");
            break;

        default:
            console.log("Other command");
    }

    if (command === "quit") {
        break;
    }
}
~~~

**Expected output:**

~~~text
Opening
Quitting
~~~

**Explanation:**

Each break inside switch exits only that switch. The break after the switch exits the for loop when the command is quit.

## Example 14: Continue to the next item from inside a nested loop

**Question:** How can an inner check skip the rest of the current outer-loop pass?

**Code:**

~~~js
const groups = [
    ["keep", "a"],
    ["skip", "b"],
    ["keep", "c"]
];

groupLoop: for (const group of groups) {
    for (const item of group) {
        if (item === "skip") {
            continue groupLoop;
        }
    }

    console.log(group[1]);
}
~~~

**Expected output:**

~~~text
a
c
~~~

**Explanation:**

When the marker skip is encountered, the labeled continue exits the inner loop and advances the outer loop to its next group.

## Example 15: Continue in a do...while reaches its condition

**Question:** Does continue skip the condition check of a do...while loop?

**Code:**

~~~js
let attempt = 0;

do {
    attempt += 1;

    if (attempt === 2) {
        continue;
    }

    console.log(attempt);
} while (attempt < 4);
~~~

**Expected output:**

~~~text
1
3
4
~~~

**Explanation:**

Continue skips the rest of the body, then the do...while condition is checked. The attempt counter was updated first, so the loop progresses.

## Example 16: Use a flag instead of a label when it reads better

**Question:** Can a flag make a nested search easier to understand without a label?

**Code:**

~~~js
const rows = [
    [1, 2],
    [3, 4]
];

let found;

for (const row of rows) {
    for (const value of row) {
        if (value === 3) {
            found = value;
            break;
        }
    }

    if (found !== undefined) {
        break;
    }
}

console.log(found);
~~~

**Expected output:**

~~~text
3
~~~

**Explanation:**

The first break exits the inner loop. The condition after it detects the match and the second break exits the outer loop. A labeled break is shorter, while this flag-based form can be familiar to some readers.

## Example 17: Stop when an array method finds a match

**Question:** How can some check whether any number is greater than 10?

**Code:**

~~~js
const values = [2, 5, 12, 4];
const hasLargeValue = values.some((value) => value > 10);

console.log(hasLargeValue);
~~~

**Expected output:**

~~~text
true
~~~

**Explanation:**

Some returns true as soon as its callback passes for one element. It returns false if no element passes.

## Example 18: Use break to exit the nearest loop

**Question:** Which values print before an unlabelled break exits its loop?

**Code:**

~~~js
function printValues(values) {
    for (const value of values) {
        if (value === 3) {
            break;
        }

        console.log(value);
    }
}

printValues([1, 2, 3, 4]);
console.log("Done");
~~~

**Expected output:**

~~~text
1
2
Done
~~~

**Explanation:**

Break exits its nearest enclosing loop. A label cannot be used as a destination elsewhere in the function or program.

## Summary

- Break exits the nearest loop or switch.
- Continue skips the rest of the current iteration.
- Continue in a classic for loop still reaches the update expression.
- Place while-loop updates so continue cannot skip necessary progress.
- Use a labeled break or continue when a specific enclosing loop must be targeted.
- Continue labels must name enclosing loops. Break labels can name other enclosing statements too.
- Return exits the whole function.
- Use for...of or a stopping array method when a forEach search needs to end early.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [32 - Loops and iteration statements](../lessons/032-loops-and-iteration-statements.md) | [Open lesson](../lessons/033-break-continue-and-labels.md) | [Open Q&A](../qnas/033-break-continue-and-labels.md) | [34 - Errors, exceptions, and try, catch, and finally](../lessons/034-errors-exceptions-and-try-catch-and-finally.md) |


