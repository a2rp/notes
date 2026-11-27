# 33 - break, continue, and labels

Loops repeat work, but many tasks need to stop early or skip only some items. JavaScript provides **break** to exit a loop or switch and **continue** to skip the rest of the current loop iteration.

Labels give a name to an enclosing statement. A labeled **break** can exit a named outer loop or block. A labeled **continue** can move directly to the next iteration of a named outer loop.

## break exits the nearest loop

An unlabelled **break** exits the nearest enclosing loop. Execution continues with the first statement after that loop.

~~~js
for (let number = 1; number <= 5; number += 1) {
    if (number === 4) {
        break;
    }

    console.log(number);
}

console.log("Loop finished.");
~~~

Output:

~~~text
1
2
3
Loop finished.
~~~

When number reaches 4, break exits the for loop immediately. The loop's later iterations do not run.

Use break when the task is complete or a stopping condition has been reached.

## break exits the nearest switch or loop

An unlabelled break targets the nearest enclosing breakable statement: a loop or a switch.

~~~js
for (const command of ["open", "save", "quit"]) {
    switch (command) {
        case "open":
            console.log("Opening");
            break;

        case "save":
            console.log("Saving");
            break;

        case "quit":
            console.log("Quitting");
            break;
    }

    if (command === "quit") {
        break;
    }
}
~~~

Output:

~~~text
Opening
Saving
Quitting
~~~

The break inside each switch case exits only the switch. The later break exits the for loop when the command is **"quit"**.

## continue skips the current iteration

**Continue** skips the rest of the current iteration and proceeds with the next one.

~~~js
for (let number = 1; number <= 5; number += 1) {
    if (number === 3) {
        continue;
    }

    console.log(number);
}
~~~

Output:

~~~text
1
2
4
5
~~~

When number is 3, the log is skipped. The loop continues with the next number.

### continue in a classic for loop still runs its update

In a classic for loop, continue moves to the afterthought expression, then the condition is checked again.

~~~js
for (let index = 0; index < 5; index += 1) {
    if (index === 2) {
        continue;
    }

    console.log(index);
}
~~~

Output:

~~~text
0
1
3
4
~~~

Even though the body is skipped when index is 2, **index += 1** still runs. This prevents the loop from getting stuck on the same value.

### update a while-loop variable before continuing

A while loop has no automatic afterthought expression. If continue skips an update that is needed to make the condition false, the loop can become infinite.

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

Output:

~~~text
1
2
4
5
~~~

The update happens before continue, so the condition can still progress. If the increment were placed after the if block, the skipped iteration would not increment count.

## return is different from break

Inside a function, **return** exits the entire function, not just the loop. Use it when the function has found the value it must return.

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

Output:

~~~text
8
~~~

The function stops as soon as it returns 8. No later array value is checked.

## Why labels are useful

Unlabelled break exits only the nearest loop or switch. In nested loops, that may not be the loop you want to stop.

~~~js
const rows = [
    [1, 2],
    [3, 4],
    [5, 6]
];

let found;

for (const row of rows) {
    for (const value of row) {
        if (value === 4) {
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

Output:

~~~text
4
~~~

This uses a flag and two break statements to leave both loops. A label can express the same target directly.

## Labeled break exits a named enclosing statement

A label is an identifier followed by a colon before a statement. Use **break labelName** to exit that labeled statement.

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
console.log("Search finished.");
~~~

Output:

~~~text
4
Search finished.
~~~

The labeled break exits the outer loop named **search**, including its inner loop. Execution continues after the labeled loop.

The label must name an enclosing labeled statement. Labels do not create variables and do not let code jump to arbitrary locations.

## Labeled continue moves to the next outer iteration

Use **continue labelName** to skip to the next iteration of a named enclosing loop. This is useful when a decision inside an inner loop should skip the rest of the current outer-loop pass.

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

    console.log("Row finished");
}
~~~

Output:

~~~text
1
2
Row finished
3
4
Row finished
~~~

When the empty row is found, **continue rowLoop** skips the rest of that outer iteration. The next row is then processed.

A continue label must refer to an enclosing iteration statement. A labeled block that is not a loop can be exited with labeled break, but it cannot be the target of continue.

## continue inside a switch nested in a loop

A switch is not a loop. If continue appears inside a switch that is nested in a loop, it continues the enclosing loop.

~~~js
for (const value of [1, 2, 3, 4]) {
    switch (value) {
        case 2:
            continue;

        case 4:
            continue;

        default:
            console.log(value);
    }
}
~~~

Output:

~~~text
1
3
~~~

The continue statements skip the rest of the current for...of iteration. The switch does not capture continue because it is not an iteration statement.

## A labeled break can exit a block

A labeled break can target a labeled block, not only a loop. This can replace a small amount of awkward nested branching.

~~~js
let result = "not found";

check: {
    if (2 + 2 === 4) {
        result = "matched";
        break check;
    }

    result = "fallback";
}

console.log(result);
~~~

Output:

~~~text
matched
~~~

The break exits the labeled block named **check**. Labels are still restricted to enclosing statements and are not general-purpose goto instructions.

For normal decision-making, an if statement or a function return is often clearer than a labeled block. Use this form sparingly.

## break and continue in nested loops

An unlabelled break or continue affects the nearest matching loop. It does not automatically control every enclosing loop.

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

Output:

~~~text
1 1
Row complete
2 1
Row complete
~~~

The inner loop stops when column reaches 2. The outer loop continues with its next row.

## forEach does not provide loop-level break or continue

An array's **forEach()** method calls a callback for each element. A break statement cannot exit the forEach callback's surrounding iteration, and continue cannot skip the next callback invocation.

Use for...of or a classic loop when you need to stop or skip iterations.

~~~js
const numbers = [1, 2, 3, 4];

for (const number of numbers) {
    if (number === 3) {
        break;
    }

    console.log(number);
}
~~~

Output:

~~~text
1
2
~~~

Array methods such as **some()**, **every()**, and **find()** can also stop their search when their callback condition is met. Choose the method that best describes the task.

## Common mistakes

### Expecting break to exit every nested loop

Unlabelled break exits the nearest loop or switch only. Use a labeled break when it clearly improves a nested-loop exit, or use a function and return.

### Using continue without moving loop state

In a while loop, continue may skip the update that would make the condition change. Move the update before the continue or restructure the loop.

### Using a label that does not enclose the statement

A label must name a surrounding labeled statement. A break or continue cannot jump to a label elsewhere in the program.

### Using continue with a non-loop label

A labeled continue must target an enclosing loop. It cannot target a labeled block or switch.

### Expecting switch to stop continue

Switch is not an iteration statement. Continue inside a switch nested in a loop can continue the surrounding loop.

### Using labeled control flow when simpler structure works

Labels are useful for a deliberate exit from nested loops, but too many labels can make control flow difficult to follow. Consider a helper function, return, or a clearer loop condition.

### Trying to break out of forEach

Break and continue are statements for loops, not forEach callbacks. Use for...of, a classic loop, or an appropriate array method.

## Try it yourself

1. Stop a loop as soon as a target value is found.
2. Skip even numbers with continue.
3. Explain what the afterthought expression does after continue in a classic for loop.
4. Write a while loop where continue cannot skip the counter update.
5. Use a labeled break to leave a nested search.
6. Use a labeled continue to skip the rest of one outer-loop iteration.
7. Put a switch inside a loop and determine which loop continue affects.
8. Replace a forEach search with for...of so it can stop early.
9. Explain why a labeled block can be a break target but not a continue target.
10. Rewrite a nested search using a helper function and return.

## Key points

- Unlabelled break exits the nearest loop or switch.
- Unlabelled continue skips the rest of the nearest loop iteration.
- Continue in a classic for loop still reaches its afterthought expression.
- A while-loop update must not be skipped in a way that prevents progress.
- A labeled break exits its named enclosing statement.
- A labeled continue targets an enclosing loop and begins its next iteration.
- Switch can contain break, but it is not a loop and does not capture continue.
- Return exits the function, which also ends any loop inside that call.
- Use labels sparingly when they make nested control flow clearer.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [32 - Loops and iteration statements](032-loops-and-iteration-statements.md) | [Open Q&A](../qnas/033-break-continue-and-labels.md) | [Open example](../examples/033-break-continue-and-labels.md) | [34 - Errors, exceptions, and try, catch, and finally](034-errors-exceptions-and-try-catch-and-finally.md) |

