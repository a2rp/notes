# 44 - Recursion and the call stack

**Recursion** is a technique where a function solves a problem by calling itself on a smaller version of that problem. A recursive solution needs a **base case** that stops the calls and a **recursive case** that makes progress toward that base case.

Each active function call has its own place on the **call stack**. A recursive function adds another call frame each time it calls itself. When a call returns, execution resumes in the previous frame. If the calls never reach a base case, or go too deep, the program can fail with a stack overflow error.

Recursion is a natural fit for nested data and divide-and-conquer problems. A loop can be simpler and use less call-stack space for straightforward repetition.

## The parts of a recursive function

A recursive function usually has three parts:

1. **Input:** the current problem or subproblem.
2. **Base case:** the simplest case that can be answered without another recursive call.
3. **Recursive case:** a call on a smaller or simpler input, combined with the result.

A countdown makes these parts visible:

~~~js
function countdown(number) {
    if (number === 0) {
        console.log("Done");
        return;
    }

    console.log(number);
    countdown(number - 1);
}

countdown(3);
~~~

Output:

~~~text
3
2
1
Done
~~~

The base case is **number === 0**. The recursive case calls **countdown(number - 1)**, moving the input toward zero.

## Every recursive path must make progress

A recursive call must change the problem so it eventually reaches the base case. This version is broken because it calls itself with the same value:

~~~js
function broken(number) {
    if (number === 0) {
        return;
    }

    broken(number);
}
~~~

For a nonzero input, the function never gets closer to zero. Calls keep accumulating until the runtime reports a stack overflow.

Before using recursion, check:

- Does every possible path reach a base case?
- Does every recursive call make progress toward that base case?
- Is the input valid for the assumptions made by the base case?

## How the call stack works

Consider a recursive sum:

~~~js
function sumTo(number) {
    if (number === 0) {
        return 0;
    }

    return number + sumTo(number - 1);
}

console.log(sumTo(3));
~~~

Output:

~~~text
6
~~~

The calls begin in this order:

~~~text
sumTo(3)
sumTo(2)
sumTo(1)
sumTo(0)
~~~

The base case returns **0**. Then the waiting calls return in reverse order:

~~~text
sumTo(1) returns 1 + 0 = 1
sumTo(2) returns 2 + 1 = 3
sumTo(3) returns 3 + 3 = 6
~~~

Each call has its own **number** parameter and pauses at its recursive call until the deeper call returns. Those paused calls are stored on the call stack.

## Return values must be combined

If the recursive result contributes to the answer, return it from the recursive call:

~~~js
function factorial(number) {
    if (number === 0) {
        return 1;
    }

    return number * factorial(number - 1);
}

console.log(factorial(5));
~~~

Output:

~~~text
120
~~~

The base case **factorial(0)** returns **1**. Each earlier call multiplies its number by the result from the next call.

This version loses the result because it does not return the recursive call:

~~~js
function missingReturn(number) {
    if (number === 0) {
        return 0;
    }

    missingReturn(number - 1);
}
~~~

For a positive input, the outer call returns **undefined**. A recursive function should return the recursive result when the caller needs it.

## Validate inputs when the algorithm assumes a domain

Factorial is defined here only for non-negative integers. Validate that assumption rather than allowing invalid values to recurse indefinitely:

~~~js
function factorial(number) {
    if (!Number.isInteger(number) || number < 0) {
        throw new RangeError("number must be a non-negative integer");
    }

    if (number === 0) {
        return 1;
    }

    return number * factorial(number - 1);
}

console.log(factorial(5));
~~~

Output:

~~~text
120
~~~

The input validation prevents a value such as **-1** from decreasing forever without reaching the **0** base case.

## Recursion over arrays

An array can be processed recursively by handling one item and then the rest:

~~~js
function sumArray(values, index = 0) {
    if (index >= values.length) {
        return 0;
    }

    return values[index] + sumArray(values, index + 1);
}

console.log(sumArray([4, 7, 2]));
~~~

Output:

~~~text
13
~~~

The base case is reaching the end of the array. Each recursive call increases **index**, so the input gets closer to that base case.

For ordinary arrays, an iterative loop is often simpler and avoids one call frame per item:

~~~js
function sumArrayIteratively(values) {
    let total = 0;

    for (const value of values) {
        total += value;
    }

    return total;
}

console.log(sumArrayIteratively([4, 7, 2]));
~~~

Output:

~~~text
13
~~~

Both versions calculate the same result. The choice depends on which structure makes the algorithm easier to understand and whether the input depth is safe for recursion.

## Recursion over nested data

Recursion is useful when a data structure contains smaller structures of the same kind. For example, a tree node can contain child nodes:

~~~js
const menu = {
    label: "Menu",
    children: [
        {
            label: "File",
            children: [
                { label: "New", children: [] },
                { label: "Open", children: [] }
            ]
        },
        {
            label: "Help",
            children: []
        }
    ]
};

function printTree(node, depth = 0) {
    console.log(" ".repeat(depth * 2) + node.label);

    for (const child of node.children) {
        printTree(child, depth + 1);
    }
}

printTree(menu);
~~~

Output:

~~~text
Menu
  File
    New
    Open
  Help
~~~

Each node is processed, then the same function processes its children. A node with no children naturally ends that branch because its loop has no iterations.

## Recursive search in nested arrays

A nested array can contain values or other arrays. A recursive function can search each nested value:

~~~js
function containsValue(items, target) {
    for (const item of items) {
        if (Array.isArray(item)) {
            if (containsValue(item, target)) {
                return true;
            }
        } else if (item === target) {
            return true;
        }
    }

    return false;
}

const values = [1, [2, [3, 4]], 5];

console.log(containsValue(values, 4));
console.log(containsValue(values, 9));
~~~

Output:

~~~text
true
false
~~~

The function returns **true** as soon as it finds the target. A nested array becomes a smaller recursive problem. Reaching the end without a match is the base case for that branch and returns **false**.

This example assumes the nested arrays do not contain cycles. A self-referencing array could recurse indefinitely unless the algorithm tracks visited arrays.

## Divide a problem into smaller subproblems

Some algorithms split a problem into multiple smaller problems. Fibonacci numbers provide a simple example:

~~~js
function fibonacci(number) {
    if (number < 2) {
        return number;
    }

    return fibonacci(number - 1) + fibonacci(number - 2);
}

console.log(fibonacci(7));
~~~

Output:

~~~text
13
~~~

The base cases are **fibonacci(0)** and **fibonacci(1)**. Every larger value is computed from the two preceding values.

This direct implementation repeats many calculations. For larger inputs, use memoization or an iterative approach:

~~~js
function fibonacciIteratively(number) {
    if (number < 2) {
        return number;
    }

    let previous = 0;
    let current = 1;

    for (let index = 2; index <= number; index += 1) {
        const next = previous + current;
        previous = current;
        current = next;
    }

    return current;
}

console.log(fibonacciIteratively(7));
~~~

Output:

~~~text
13
~~~

Recursion can make the mathematical structure clear, but repeated work and call-stack use matter. Choose an implementation that fits the input size and makes its cost understandable.

## Recursion and stack depth

Each recursive call uses additional call-stack space until it returns. JavaScript engines limit how many nested calls can be active, and the exact limit can vary by engine and environment.

Do not rely on a particular maximum recursion depth. If input may be very deep or large, consider:

- Replacing recursion with a loop.
- Keeping your own explicit stack in an array.
- Reducing repeated work with memoization.
- Validating or limiting the input depth.

An explicit stack stores pending work in ordinary data rather than nested function calls:

~~~js
function sumArrayWithStack(values) {
    const pending = [...values];
    let total = 0;

    while (pending.length > 0) {
        const item = pending.pop();

        if (Array.isArray(item)) {
            pending.push(...item);
        } else {
            total += item;
        }
    }

    return total;
}

console.log(sumArrayWithStack([1, [2, [3]], 4]));
~~~

Output:

~~~text
10
~~~

The loop controls the processing, and **pending** stores remaining values. This avoids recursive function calls for the nested array traversal.

## Tail position does not guarantee optimization

A call is in **tail position** when the caller does no additional work after the recursive call returns:

~~~js
function countDown(number) {
    if (number === 0) {
        return "done";
    }

    return countDown(number - 1);
}
~~~

Even when a recursive call is in tail position, ordinary JavaScript code should not assume the engine will reuse the current call frame. For portable programs, use iteration or an explicit stack when deep input could exceed the call stack.

## Common recursion mistakes

- **Missing a base case:** Calls continue until a stack overflow occurs.
- **Not making progress:** Each recursive call must move toward a stopping condition.
- **Forgetting return:** The outer call may lose the recursive result.
- **Using the wrong base result:** A factorial base case returns **1**, while a sum base case returns **0**.
- **Failing to validate inputs:** Negative or malformed input may never reach the intended base case.
- **Using recursion for unbounded depth:** A loop or explicit stack may be safer.
- **Repeating expensive work:** Naive recursive algorithms can recalculate the same subproblem many times.
- **Ignoring cyclic data:** Recursive object or array traversal needs cycle handling when cycles are possible.
- **Assuming tail calls prevent stack growth:** Do not depend on an optimization that may not be available.

## Try it yourself

1. Write a recursive countdown that stops at zero.
2. Write a recursive function that returns the sum from **1** through **n**.
3. Add input validation to a recursive factorial.
4. Traverse a tree and print each node with indentation.
5. Search a nested array for a target value.
6. Compare recursive and iterative versions of array summation.
7. Write Fibonacci recursively, then identify repeated calculations.
8. Rewrite a recursive traversal to use an explicit array as a stack.
9. Explain what happens if a recursive call never gets closer to its base case.

## Key points

- Recursion solves a problem by calling a function on a smaller or simpler problem.
- A correct recursive function has a base case and a progressing recursive case.
- Each active call uses a frame on the call stack.
- Recursive return values must be returned and combined when they contribute to the answer.
- Trees and nested data often have a structure that maps naturally to recursion.
- Recursion depth is limited and the exact limit varies by environment.
- Loops, memoization, and explicit stacks are useful alternatives.
- Never rely on tail-call optimization to prevent stack growth.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [43 - call, apply, and bind](043-call-apply-and-bind.md) | [Open Q&A](../qnas/044-recursion-and-the-call-stack.md) | [Open example](../examples/044-recursion-and-the-call-stack.md) | [45 - Arrays: create, read, and update](045-arrays-create-read-and-update.md) |