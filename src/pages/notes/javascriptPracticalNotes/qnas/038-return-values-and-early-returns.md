# 38 - Return values and early returns - Q&A

Use these questions to review function results, early returns, and how return affects control flow. Every answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. What does a return statement do?

A. Prints a value to the console  
B. Sends a value to the caller and exits the current function  
C. Exits only the nearest loop  
D. Restarts the function

**Answer:** B.

**Explanation:** return completes the current function call. When an expression follows it, the expression's value is given to the caller.

### 2. What value does a function call produce when the function reaches its end without a return statement?

A. null  
B. false  
C. undefined  
D. An empty string

**Answer:** C. undefined.

**Explanation:** A function that finishes without returning an expression produces undefined.

### 3. What does a bare return do?

A. Exits the current function with undefined  
B. Returns false  
C. Exits the program  
D. Continues to the next statement in the function

**Answer:** A.

**Explanation:** A return statement without an expression ends the function and produces undefined.

### 4. Which statement exits a loop but allows the rest of the function to continue?

A. return  
B. break  
C. throw  
D. finally

**Answer:** B. break.

**Explanation:** break exits the nearest loop or switch. return exits the entire current function.

### 5. What does console.log do when used in a function?

A. Automatically returns the logged value  
B. Displays a message but does not return that value to the caller  
C. Exits the function  
D. Converts the value to null

**Answer:** B.

**Explanation:** Logging and returning are different actions. A function must use return to give a result to its caller.

### 6. What happens if a line break immediately follows return?

A. The next line is always returned  
B. JavaScript may insert a semicolon, causing return to produce undefined  
C. The function is called again  
D. The code becomes a function declaration

**Answer:** B.

**Explanation:** Automatic semicolon insertion can end the return statement at the line break. Keep the returned expression on the same line as return.

### 7. What does return inside a function's loop do?

A. It exits only that loop  
B. It exits the current function  
C. It skips one iteration  
D. It exits the caller too

**Answer:** B.

**Explanation:** return exits the function even when the statement is inside a loop. Use break if only the loop should end.

### 8. What happens to a pending return from try when finally runs?

A. finally runs after the caller receives the value  
B. finally runs before the function finishes returning  
C. finally is skipped  
D. finally converts the value to undefined

**Answer:** B.

**Explanation:** The finally block runs before the pending return completes. A return from finally can replace the earlier return.

## True or false

### 9. A returned value can be stored in a variable by the caller.

**Answer:** True.

**Explanation:** The caller can assign the result of a function call to a variable.

### 10. Code after a return statement in the same function runs normally.

**Answer:** False.

**Explanation:** return exits the current function immediately, so later statements in that function are not reached.

### 11. A bare return produces null.

**Answer:** False.

**Explanation:** It produces undefined.

### 12. A function that calls console.log has necessarily returned a value.

**Answer:** False.

**Explanation:** It may display output but still produce undefined if it does not return an expression.

### 13. A function can return an object.

**Answer:** True.

**Explanation:** A function can return any JavaScript value, including objects and arrays.

### 14. If a return occurs inside an inner function, it automatically exits the outer function too.

**Answer:** False.

**Explanation:** return exits only the function that contains it. The outer function continues after its call to the inner function.

### 15. Only one return statement can appear in a function.

**Answer:** False.

**Explanation:** A function may have multiple return statements in different branches. Only the first one reached during a particular call determines its result.

### 16. A return inside finally can override a return from try.

**Answer:** True.

**Explanation:** A completion from finally can replace an earlier completion. Avoid returning from finally in normal cleanup code.

### 17. A caller can keep running after a called function returns.

**Answer:** True.

**Explanation:** The return ends the called function. The caller resumes after the function call unless another control-flow action changes what happens.

### 18. return and break have the same effect when used inside a loop.

**Answer:** False.

**Explanation:** break exits the loop. return exits the entire function containing that loop.

## Predict the output

### 19. What does this code print?

~~~js
function add(first, second) {
    return first + second;
}

const result = add(3, 4);
console.log(result);
~~~

**Answer:**

~~~text
7
~~~

**Explanation:** add returns 7, which the caller stores in result and prints.

### 20. What does this code print?

~~~js
function showMessage() {
    console.log("Shown");
}

console.log(showMessage());
~~~

**Answer:**

~~~text
Shown
undefined
~~~

**Explanation:** The function logs Shown but has no return statement. Its call therefore produces undefined, which the outer console.log prints.

### 21. What does this code print?

~~~js
function getStatus() {
    return "ready";
    console.log("unreachable");
}

console.log(getStatus());
~~~

**Answer:**

~~~text
ready
~~~

**Explanation:** return ends getStatus before the later console.log can execute.

### 22. What does this code print?

~~~js
function checkAccess(isAllowed) {
    if (!isAllowed) {
        return;
    }

    return "granted";
}

console.log(checkAccess(false));
console.log(checkAccess(true));
~~~

**Answer:**

~~~text
undefined
granted
~~~

**Explanation:** The false call reaches a bare return. The true call skips the if block and returns the string.

### 23. What does this code print?

~~~js
function getValue() {
    return
    5;
}

console.log(getValue());
~~~

**Answer:**

~~~text
undefined
~~~

**Explanation:** A semicolon is inserted after return because the expression starts on the next line. The function returns without an expression.

### 24. What does this corrected code print?

~~~js
function getValue() {
    return 5;
}

console.log(getValue());
~~~

**Answer:**

~~~text
5
~~~

**Explanation:** The expression is on the same line as return, so its value is returned.

### 25. What does this code print?

~~~js
function findFirstEven(numbers) {
    for (const number of numbers) {
        if (number % 2 === 0) {
            return number;
        }
    }

    return null;
}

console.log(findFirstEven([3, 7, 8, 10]));
~~~

**Answer:**

~~~text
8
~~~

**Explanation:** return exits the function when the first even number is found. The later value 10 is not checked.

### 26. What does this code print?

~~~js
function showEvenNumbers(numbers) {
    for (const number of numbers) {
        if (number % 2 !== 0) {
            continue;
        }

        console.log(number);
    }

    console.log("Loop finished");
}

showEvenNumbers([1, 2, 3, 4]);
~~~

**Answer:**

~~~text
2
4
Loop finished
~~~

**Explanation:** continue skips an iteration, but does not exit the function. The loop and the final statement both finish.

### 27. What does this code print?

~~~js
function inner() {
    return "inner";
}

function outer() {
    const value = inner();
    console.log(value);
    console.log("outer continues");
}

outer();
~~~

**Answer:**

~~~text
inner
outer continues
~~~

**Explanation:** The return exits inner. The outer function continues after calling it.

### 28. What does this code print?

~~~js
function createPoint() {
    return {
        x: 3,
        y: 8
    };
}

const point = createPoint();
console.log(point.x, point.y);
~~~

**Answer:**

~~~text
3 8
~~~

**Explanation:** The object literal is returned to the caller, which stores it in point and reads its properties.

### 29. What does this code print?

~~~js
function getResult() {
    try {
        return "try result";
    } finally {
        console.log("cleanup");
    }
}

console.log(getResult());
~~~

**Answer:**

~~~text
cleanup
try result
~~~

**Explanation:** finally runs before the pending return completes. It does not override the return because it contains no return of its own.

### 30. What does this code print?

~~~js
function getResult() {
    try {
        return "try result";
    } finally {
        return "finally result";
    }
}

console.log(getResult());
~~~

**Answer:**

~~~text
finally result
~~~

**Explanation:** The return in finally replaces the pending return from try. This is usually surprising and should be avoided.

## Short-answer questions

### 31. How is return different from console.log?

**Answer:** return gives a value to the caller and ends the current function. console.log displays information but does not provide that value as the function's result.

**Explanation:** Use return when other code needs the result. Use console.log for diagnostics or deliberate display.

### 32. What is an early return?

**Answer:** A return near the start or inside a branch that ends the function as soon as a condition has been handled.

**Explanation:** Early returns can handle invalid or special cases without nesting the rest of the function inside multiple branches.

### 33. What is a guard clause?

**Answer:** A condition that checks for a case where the function should stop early, often by returning a fallback or message.

**Explanation:** A guard clause keeps exceptional or special cases near the top and leaves the main path easier to read.

### 34. Why can a function with no return still produce visible output?

**Answer:** It may call console.log or perform another side effect.

**Explanation:** Visible output does not imply that a value was returned to the caller.

### 35. What should a function return when its search finds no matching item?

**Answer:** The function should use a result that clearly represents no match, such as null, if that fits the API.

**Explanation:** The important part is that the caller can distinguish the no-match case from a valid result.

### 36. What does return inside a nested function exit?

**Answer:** Only the nested function that contains that return.

**Explanation:** The outer function continues after the nested function call completes.

### 37. Why should an object literal's opening brace stay on the same line as return?

**Answer:** A line break immediately after return can trigger automatic semicolon insertion.

**Explanation:** Keeping the expression on the same line makes it clear that the object is the returned value.

### 38. When should you use break rather than return?

**Answer:** Use break when the loop or switch should end but the surrounding function should continue.

**Explanation:** return ends the whole function. Choose the statement that matches the intended level of exit.

## Coding questions

### 39. Write a function that converts minutes to seconds and returns the result.

**Answer:**

~~~js
function toSeconds(minutes) {
    return minutes * 60;
}

console.log(toSeconds(3));
~~~

~~~text
180
~~~

**Explanation:** The function returns the calculated number. The caller decides to print it.

### 40. Add an early return for a negative number.

**Answer:**

~~~js
function doublePositive(number) {
    if (number < 0) {
        return null;
    }

    return number * 2;
}

console.log(doublePositive(-4));
console.log(doublePositive(6));
~~~

~~~text
null
12
~~~

**Explanation:** The guard clause handles a negative input and exits before the normal calculation.

### 41. Return the first matching item in an array, or null if none exists.

**Answer:**

~~~js
function findLongWord(words) {
    for (const word of words) {
        if (word.length > 5) {
            return word;
        }
    }

    return null;
}

console.log(findLongWord(["pen", "notebook", "bag"]));
console.log(findLongWord(["pen", "bag"]));
~~~

~~~text
notebook
null
~~~

**Explanation:** The first return exits the function when a match is found. The final return handles the case where the loop finishes without a match.

### 42. Return an object and read one of its properties.

**Answer:**

~~~js
function createUser(name, role) {
    return {
        name: name,
        role: role
    };
}

const user = createUser("Mina", "editor");
console.log(user.role);
~~~

~~~text
editor
~~~

**Explanation:** The function returns one object. The caller stores it and reads its role property.

### 43. Fix the function so it returns the object.

~~~js
function createPoint() {
    return
    {
        x: 2,
        y: 4
    };
}
~~~

**Answer:**

~~~js
function createPoint() {
    return {
        x: 2,
        y: 4
    };
}
~~~

**Explanation:** Place the opening brace on the same line as return so automatic semicolon insertion does not end the statement early.

## Key points

- return gives a value to the caller and exits the current function.
- A function that finishes without a return expression produces undefined.
- Logging output does not return that output to the caller.
- Early returns handle special cases and guard clauses.
- return inside a loop exits the function, while break exits only the loop or switch.
- Keep a returned expression on the same line as return.
- finally runs before a pending return completes. A return from finally can override it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [37 - Parameters, default values, rest, and arguments](../lessons/037-parameters-default-values-rest-and-arguments.md) | [Open lesson](../lessons/038-return-values-and-early-returns.md) | [Open example](../examples/038-return-values-and-early-returns.md) | [39 - Arrow functions](../lessons/039-arrow-functions.md) |
