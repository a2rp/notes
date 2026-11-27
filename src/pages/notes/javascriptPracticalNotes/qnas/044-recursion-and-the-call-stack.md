# 44 - Recursion and the call stack - Q&A

Use these questions to review recursive cases, call-stack behavior, return values, nested structures, and when to use an iterative alternative. Each answer follows its question.

## Multiple-choice questions

### 1. What is recursion?

A. A function that only uses a loop  
B. A function calling itself to solve a smaller or simpler problem  
C. A function that returns no value  
D. A function that runs only once

**Answer:** B. A function calling itself to solve a smaller or simpler problem.

**Explanation:** A recursive function divides its work into a base case and one or more recursive cases.

### 2. What is the purpose of a base case?

A. To call the function again with the same input  
B. To stop recursion and provide a direct result  
C. To create a global variable  
D. To catch every exception

**Answer:** B. To stop recursion and provide a direct result.

**Explanation:** Without a reachable base case, calls can continue until the runtime runs out of call-stack space.

### 3. What must a recursive case do?

A. Make progress toward a base case  
B. Always use an array  
C. Return **undefined**  
D. Call a different function

**Answer:** A. Make progress toward a base case.

**Explanation:** The input or remaining problem must become simpler so the recursion eventually stops.

### 4. What stores active function calls?

A. The event queue  
B. The call stack  
C. The prototype chain  
D. The module cache

**Answer:** B. The call stack.

**Explanation:** Each active call has a frame with its own execution state. A deeper call pauses its caller until it returns.

### 5. In a recursive sum, why should the recursive call's result be returned?

A. Otherwise the caller cannot use the result of the smaller problem  
B. It makes the function asynchronous  
C. It prevents the base case from running  
D. It converts the result to an array

**Answer:** A. Otherwise the caller cannot use the result of the smaller problem.

**Explanation:** A return value must flow back through each waiting call to produce the final answer.

### 6. What is a suitable base result for summing an empty array?

A. **1**  
B. **0**  
C. **undefined**  
D. The original array

**Answer:** B. **0**.

**Explanation:** Adding no values contributes zero, so zero is the identity value for addition.

### 7. What is the base result for **factorial(0)**?

A. **0**  
B. **1**  
C. **-1**  
D. **undefined**

**Answer:** B. **1**.

**Explanation:** One is the identity value for multiplication. It lets the recursive products terminate correctly.

### 8. What can happen if recursion never reaches a base case?

A. JavaScript turns it into a loop automatically  
B. A stack overflow error can occur  
C. It always returns zero  
D. It becomes asynchronous

**Answer:** B. A stack overflow error can occur.

**Explanation:** Each unfinished call remains active and uses another call-stack frame.

### 9. Which structure often maps naturally to recursion?

A. A flat string only  
B. A tree with child nodes  
C. A single number only  
D. A boolean flag

**Answer:** B. A tree with child nodes.

**Explanation:** Each child can itself be treated as a smaller tree of the same shape.

### 10. What is a main risk of the naive recursive Fibonacci implementation?

A. It always changes its input  
B. It repeats many calculations  
C. It cannot use a base case  
D. It returns strings

**Answer:** B. It repeats many calculations.

**Explanation:** The same Fibonacci values are recomputed along many branches. Memoization or an iterative solution avoids much of that repeated work.

### 11. What is an explicit stack?

A. A recursive function's hidden local variable  
B. An ordinary data structure used to store pending work  
C. A way to increase the engine's stack limit  
D. A special JavaScript keyword

**Answer:** B. An ordinary data structure used to store pending work.

**Explanation:** An array can store items to process, allowing a loop to handle work that might otherwise use deeply nested calls.

### 12. Should JavaScript code assume tail recursion will always reuse the call frame?

A. Yes, every engine must do so  
B. No, programs should not rely on it  
C. Only for factorial  
D. Only when using **const**

**Answer:** B. No, programs should not rely on it.

**Explanation:** Tail-call optimization is not a portable guarantee for ordinary JavaScript code. Use iteration or an explicit stack when deep recursion is a concern.

## True or false

### 13. A recursive function can have more than one base case.

**Answer:** True.

**Explanation:** Some problems have several simple stopping cases. Fibonacci, for example, has cases for zero and one.

### 14. Each recursive call uses the exact same parameter binding as its caller.

**Answer:** False.

**Explanation:** Each active function call has its own parameters and local execution state.

### 15. If a recursive function reaches a base case, all earlier calls return at the same time.

**Answer:** False.

**Explanation:** The deepest call returns first. Each paused caller then resumes, performs any remaining work, and returns.

### 16. A recursive case that calls itself with unchanged input may fail to terminate.

**Answer:** True.

**Explanation:** If it does not make progress toward the base case, calls can continue until the call stack overflows.

### 17. Returning a recursive result is unnecessary even when the caller needs it.

**Answer:** False.

**Explanation:** The recursive result must be returned or otherwise combined to produce the final result.

### 18. A loop can be a better choice than recursion for a simple long sequence.

**Answer:** True.

**Explanation:** A loop can avoid one call frame per step and may express straightforward repetition more clearly.

### 19. Every recursive traversal is safe for cyclic object data.

**Answer:** False.

**Explanation:** A cycle can cause the traversal to revisit the same object indefinitely unless it tracks visited objects or otherwise detects cycles.

### 20. The exact maximum safe recursion depth is the same in every JavaScript runtime.

**Answer:** False.

**Explanation:** Call-stack limits vary by engine and environment. Programs should not depend on a specific maximum.

### 21. A base case can return a value that is used by the recursive callers.

**Answer:** True.

**Explanation:** The base value unwinds through the waiting calls and contributes to the overall result.

### 22. A tree traversal can call the same recursive function once for each child.

**Answer:** True.

**Explanation:** Each child is another subproblem with the same structure, which is a natural recursive pattern.

## Short-answer questions

### 23. Name the two essential parts of a basic recursive function.

**Answer:** A base case and a recursive case.

**Explanation:** The base case stops. The recursive case makes progress and delegates a smaller problem.

### 24. What does it mean for recursion to make progress?

**Answer:** Each recursive call moves closer to a condition that will stop the recursion.

**Explanation:** For a countdown, reducing a positive number by one moves it toward zero.

### 25. Describe what happens to a recursive call stack as a function calls itself.

**Answer:** Each call adds an active frame and pauses its caller. When the base case returns, the frames resume in reverse order.

**Explanation:** The most recent call returns first, like last-in, first-out.

### 26. Why does recursive summation often use zero as its base result?

**Answer:** Zero is the additive identity. Adding zero does not change the sum.

**Explanation:** It also gives the empty collection a natural total.

### 27. Why does factorial use one at the zero base case?

**Answer:** One is the multiplicative identity.

**Explanation:** It lets the final multiplication terminate without changing the preceding product.

### 28. Why is input validation important in a recursive factorial?

**Answer:** The recursive rule assumes non-negative integers. Invalid values such as negative numbers may never reach the zero base case.

**Explanation:** Validation rejects inputs outside the algorithm's domain before recursion begins.

### 29. When might an explicit stack be preferable to recursion?

**Answer:** When the input can be deeply nested or when recursion depth could exceed the runtime's safe call-stack capacity.

**Explanation:** Store pending items in an array and process them in a loop instead of using nested function calls.

### 30. What is memoization?

**Answer:** Memoization stores results of completed subproblems so repeated requests can reuse them.

**Explanation:** It can prevent algorithms such as naive recursive Fibonacci from recalculating the same values many times.

### 31. What problem can cycles cause during recursive traversal?

**Answer:** The traversal can revisit an already visited object forever or until stack overflow.

**Explanation:** Use a visited set or another cycle-detection rule when the input is a graph rather than a guaranteed acyclic tree.

### 32. What does tail position mean?

**Answer:** A function call is in tail position when the caller has no further work to do after that call returns.

**Explanation:** Even if a recursive call is in tail position, portable JavaScript should not assume the runtime will remove its stack frame.

## Coding and output questions

### 33. What is printed?

~~~js
function sumTo(number) {
    if (number === 0) {
        return 0;
    }

    return number + sumTo(number - 1);
}

console.log(sumTo(3));
~~~

**Answer:**

~~~text
6
~~~

**Explanation:** The calls reach **sumTo(0)**, which returns zero. The waiting calls return **1 + 0**, **2 + 1**, and **3 + 3**.

### 34. What does this print?

~~~js
function factorial(number) {
    if (number === 0) {
        return 1;
    }

    return number * factorial(number - 1);
}

console.log(factorial(4));
~~~

**Answer:**

~~~text
24
~~~

**Explanation:** The result is **4 * 3 * 2 * 1**. The base case returns one.

### 35. What does this function return for **sumArray([2, 5])**?

~~~js
function sumArray(values, index = 0) {
    if (index >= values.length) {
        return 0;
    }

    return values[index] + sumArray(values, index + 1);
}
~~~

**Answer:** **7**.

**Explanation:** It adds the current item to the recursively calculated sum of the remaining items. Once the index reaches the array length, it returns zero.

### 36. What is printed?

~~~js
function countdown(number) {
    if (number === 0) {
        console.log("Go");
        return;
    }

    console.log(number);
    countdown(number - 1);
}

countdown(2);
~~~

**Answer:**

~~~text
2
1
Go
~~~

**Explanation:** The logs occur before each recursive call, so they print while calls move toward the base case.

### 37. What is printed?

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

**Answer:**

~~~text
1
2
3
~~~

**Explanation:** The log happens after the recursive call. Calls reach zero first, then resume in reverse order.

### 38. What is wrong with this function?

~~~js
function broken(number) {
    if (number === 0) {
        return 0;
    }

    broken(number - 1);
}
~~~

**Answer:** The recursive result is not returned.

**Explanation:** The base case result is discarded at each earlier call. For any positive input, the outer call returns **undefined**.

### 39. What is wrong with this function?

~~~js
function neverStops(number) {
    if (number === 0) {
        return;
    }

    neverStops(number);
}
~~~

**Answer:** The recursive case calls itself with the unchanged value.

**Explanation:** For a nonzero input it never approaches the base case, so it eventually overflows the call stack.

### 40. What does this print?

~~~js
function fibonacci(number) {
    if (number < 2) {
        return number;
    }

    return fibonacci(number - 1) + fibonacci(number - 2);
}

console.log(fibonacci(6));
~~~

**Answer:**

~~~text
8
~~~

**Explanation:** The function adds the two previous Fibonacci values. This direct implementation recomputes many values and becomes inefficient for larger inputs.

### 41. What does this tree traversal print?

~~~js
const tree = {
    value: "A",
    children: [
        { value: "B", children: [] },
        { value: "C", children: [] }
    ]
};

function visit(node) {
    console.log(node.value);

    for (const child of node.children) {
        visit(child);
    }
}

visit(tree);
~~~

**Answer:**

~~~text
A
B
C
~~~

**Explanation:** The function visits a node, then recursively visits each child. Nodes with an empty children array end their branch.

### 42. Name two alternatives when recursive depth may be unsafe.

**Answer:** Use an iterative loop or use an explicit stack stored in an array.

**Explanation:** Both alternatives move pending work out of nested function calls. Memoization is also useful when repeated subproblems, rather than depth alone, cause the cost.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [43 - call, apply, and bind](043-call-apply-and-bind.md) | [Open lesson](../lessons/044-recursion-and-the-call-stack.md) | [Open example](../examples/044-recursion-and-the-call-stack.md) | [45 - Arrays: create, read, and update](045-arrays-create-read-and-update.md) |