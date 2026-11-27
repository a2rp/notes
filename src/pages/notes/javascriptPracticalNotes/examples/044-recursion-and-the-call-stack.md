# 44 - Recursion and the call stack - Examples

These examples show how to build recursive functions with a base case and a progressing recursive case. Each includes a question, complete code, expected output, and explanation.

## 1. Count down to a base case

### Question

How can a function print numbers until it reaches zero?

### Code

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

### Expected output

~~~text
3
2
1
Done
~~~

### Explanation

The base case is **number === 0**. Each other call subtracts one, so the input moves toward the base case.

## 2. Return a sum from one through n

### Question

How can each recursive call contribute to a final sum?

### Code

~~~js
function sumTo(number) {
    if (number === 0) {
        return 0;
    }

    return number + sumTo(number - 1);
}

console.log(sumTo(4));
~~~

### Expected output

~~~text
10
~~~

### Explanation

The base case contributes zero. Each earlier call adds its number to the result returned by the next call: **4 + 3 + 2 + 1 + 0**.

## 3. Calculate a factorial with input validation

### Question

How can a recursive factorial reject values outside its intended domain?

### Code

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

### Expected output

~~~text
120
~~~

### Explanation

The input check ensures the recursive steps eventually reach zero. The base result is one because multiplying by one leaves the product unchanged.

## 4. Watch calls return in reverse order

### Question

Why do the logged numbers appear from one up to three?

### Code

~~~js
function showUnwinding(number) {
    if (number === 0) {
        return;
    }

    showUnwinding(number - 1);
    console.log(number);
}

showUnwinding(3);
~~~

### Expected output

~~~text
1
2
3
~~~

### Explanation

Each function call pauses at the recursive call. When the base case returns, the calls resume from deepest to shallowest and print their own number.

## 5. Sum an array recursively

### Question

How can an index move through an array until the recursive base case?

### Code

~~~js
function sumArray(values, index = 0) {
    if (index >= values.length) {
        return 0;
    }

    return values[index] + sumArray(values, index + 1);
}

console.log(sumArray([4, 7, 2]));
~~~

### Expected output

~~~text
13
~~~

### Explanation

The base case is reaching the array length. Every recursive call advances the index and adds the current value to the remaining sum.

## 6. Compare recursive and iterative array sums

### Question

Do a loop and recursion produce the same sum?

### Code

~~~js
function sumRecursively(values, index = 0) {
    if (index >= values.length) {
        return 0;
    }

    return values[index] + sumRecursively(values, index + 1);
}

function sumIteratively(values) {
    let total = 0;

    for (const value of values) {
        total += value;
    }

    return total;
}

const values = [3, 5, 8];

console.log(sumRecursively(values));
console.log(sumIteratively(values));
~~~

### Expected output

~~~text
16
16
~~~

### Explanation

Both implementations add the same values. The loop avoids creating one recursive call per array item, which is useful for long arrays.

## 7. Traverse a tree

### Question

How can one function print a node and all of its descendants?

### Code

~~~js
const tree = {
    value: "Root",
    children: [
        {
            value: "Left",
            children: [
                { value: "Leaf", children: [] }
            ]
        },
        {
            value: "Right",
            children: []
        }
    ]
};

function printTree(node, depth = 0) {
    console.log(" ".repeat(depth * 2) + node.value);

    for (const child of node.children) {
        printTree(child, depth + 1);
    }
}

printTree(tree);
~~~

### Expected output

~~~text
Root
  Left
    Leaf
  Right
~~~

### Explanation

Every node has children with the same structure. The function handles the current node, then recursively handles each child. An empty child list ends that branch.

## 8. Search a nested array

### Question

How can a recursive function search arrays nested to different depths?

### Code

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

### Expected output

~~~text
true
false
~~~

### Explanation

When an item is an array, the function searches that smaller nested array. It returns true immediately after finding the target. This example assumes the arrays do not contain cycles.

## 9. Count all values in nested arrays

### Question

How can a recursive function count non-array values at any nesting depth?

### Code

~~~js
function countValues(items) {
    let total = 0;

    for (const item of items) {
        if (Array.isArray(item)) {
            total += countValues(item);
        } else {
            total += 1;
        }
    }

    return total;
}

console.log(countValues([1, [2, 3], [4, [5]]]));
~~~

### Expected output

~~~text
5
~~~

### Explanation

Each nested array becomes a recursive subproblem. A non-array item contributes one to the count. An empty array contributes zero.

## 10. Calculate Fibonacci recursively

### Question

How can a function define Fibonacci values with two base cases?

### Code

~~~js
function fibonacci(number) {
    if (number < 2) {
        return number;
    }

    return fibonacci(number - 1) + fibonacci(number - 2);
}

console.log(fibonacci(7));
~~~

### Expected output

~~~text
13
~~~

### Explanation

The values at zero and one are returned directly. Larger values are the sum of the previous two. This simple version repeats calculations, so it becomes inefficient for larger inputs.

## 11. Add memoization to Fibonacci

### Question

How can previously computed Fibonacci values be reused?

### Code

~~~js
function fibonacci(number, memo = {}) {
    if (number < 2) {
        return number;
    }

    if (memo[number] !== undefined) {
        return memo[number];
    }

    memo[number] =
        fibonacci(number - 1, memo) +
        fibonacci(number - 2, memo);

    return memo[number];
}

console.log(fibonacci(10));
~~~

### Expected output

~~~text
55
~~~

### Explanation

The **memo** object stores each result the first time it is calculated. Later calls reuse that result instead of expanding the same subproblem again. This implementation assumes a non-negative integer input.

## 12. Use an explicit stack for nested values

### Question

How can nested numeric arrays be summed without recursive function calls?

### Code

~~~js
function sumNestedWithStack(values) {
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

console.log(sumNestedWithStack([1, [2, [3]], 4]));
~~~

### Expected output

~~~text
10
~~~

### Explanation

The **pending** array holds values left to process. Nested arrays are added back to the stack, while numbers are accumulated. The loop manages pending work without recursive calls.

## 13. Validate before recursion

### Question

How can a recursive function reject input that would never reach its base case?

### Code

~~~js
function countdown(number) {
    if (!Number.isInteger(number) || number < 0) {
        throw new RangeError("number must be a non-negative integer");
    }

    if (number === 0) {
        return ["Done"];
    }

    return [number, ...countdown(number - 1)];
}

console.log(countdown(3));
~~~

### Expected output

~~~text
[ 3, 2, 1, 'Done' ]
~~~

### Explanation

The validation rejects negative values, fractions, and non-numbers. For accepted values, subtracting one eventually reaches zero. The function returns a new array at each level, so this approach is intended for small inputs.

## 14. Trace a simple call stack

### Question

What is logged before and after the recursive call returns?

### Code

~~~js
function trace(number) {
    console.log("Enter " + number);

    if (number === 0) {
        console.log("Base");
        return;
    }

    trace(number - 1);
    console.log("Exit " + number);
}

trace(2);
~~~

### Expected output

~~~text
Enter 2
Enter 1
Enter 0
Base
Exit 1
Exit 2
~~~

### Explanation

The **Enter** messages appear as calls are added to the call stack. The **Exit** messages appear while those calls return in reverse order.

## 15. Detect why unchanged input does not terminate

### Question

Why is this recursive function unsafe for a positive input?

### Code

~~~js
function repeatForever(number) {
    if (number === 0) {
        return;
    }

    repeatForever(number);
}
~~~

### Expected result

For any positive input, the function keeps calling itself until the runtime reports a stack overflow.

### Explanation

The recursive call uses the same input and never approaches **number === 0**. A recursive case must make progress toward its base case.

## 16. Use mutual recursion for even and odd checks

### Question

Can two functions call each other recursively to solve related cases?

### Code

~~~js
function isEven(number) {
    if (number === 0) {
        return true;
    }

    return isOdd(number - 1);
}

function isOdd(number) {
    if (number === 0) {
        return false;
    }

    return isEven(number - 1);
}

console.log(isEven(6));
console.log(isOdd(6));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The functions alternate calls while decreasing the number. Each reaches a zero base case. This simple version assumes a non-negative integer input.

## Practice prompts

1. Write a recursive function that returns the sum from zero through **n**.
2. Write a recursive function that returns the length of a nested array's non-array values.
3. Traverse a tree and return the number of nodes.
4. Search a nested structure, returning the path where a value was found.
5. Add memoization to a recursive calculation with overlapping subproblems.
6. Replace recursion with an explicit stack for an input whose depth may be large.
7. Trace the order of calls and returns before running a recursive function.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [43 - call, apply, and bind](043-call-apply-and-bind.md) | [Open lesson](../lessons/044-recursion-and-the-call-stack.md) | [Open Q&A](../qnas/044-recursion-and-the-call-stack.md) | [45 - Arrays: create, read, and update](../lessons/045-arrays-create-read-and-update.md) |