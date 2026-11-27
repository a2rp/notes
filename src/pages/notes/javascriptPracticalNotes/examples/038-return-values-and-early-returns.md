# 38 - Return values and early returns - Examples

These examples show what a function returns and how return affects the rest of its body. Each code block includes its expected output and an explanation.

## 1. Return a calculated value

### Question

How can a function return a value for its caller to use?

### Code

~~~js
function multiply(first, second) {
    return first * second;
}

const result = multiply(6, 7);
console.log(result);
~~~

### Expected output

~~~text
42
~~~

### Explanation

multiply returns the product. The caller stores that result in result and prints it.

## 2. Use a returned value inside another expression

### Question

Can a function call be used directly in a larger expression?

### Code

~~~js
function double(number) {
    return number * 2;
}

function addOne(number) {
    return number + 1;
}

console.log(addOne(double(3)));
~~~

### Expected output

~~~text
7
~~~

### Explanation

double returns 6. addOne receives that value and returns 7.

## 3. Return and console output are different

### Question

Does logging a value return it to the caller?

### Code

~~~js
function showTotal(price, tax) {
    console.log(price + tax);
}

const result = showTotal(20, 3);
console.log("Returned:", result);
~~~

### Expected output

~~~text
23
Returned: undefined
~~~

### Explanation

showTotal prints 23 but does not return it. Since the function reaches its end without a return expression, its call produces undefined.

## 4. Return a value instead of only logging it

### Question

How can the caller receive the total from the previous example?

### Code

~~~js
function calculateTotal(price, tax) {
    return price + tax;
}

const result = calculateTotal(20, 3);
console.log("Returned:", result);
~~~

### Expected output

~~~text
Returned: 23
~~~

### Explanation

The return statement gives the calculated value to the caller. The caller chooses how to use it.

## 5. Observe the implicit undefined result

### Question

What does a function call produce when its body has no return statement?

### Code

~~~js
function showMessage() {
    console.log("Hello.");
}

const result = showMessage();
console.log(result);
~~~

### Expected output

~~~text
Hello.
undefined
~~~

### Explanation

The message is printed as a side effect. The function still returns undefined because it has no return statement.

## 6. Use a bare return to exit early

### Question

How can a function stop without returning a specific value?

### Code

~~~js
function showAccess(isAllowed) {
    if (!isAllowed) {
        console.log("Access denied.");
        return;
    }

    console.log("Access granted.");
}

showAccess(false);
showAccess(true);
~~~

### Expected output

~~~text
Access denied.
Access granted.
~~~

### Explanation

The first call reaches a bare return and exits. The second call skips the guard and continues.

## 7. Write a guard clause

### Question

How can a guard clause handle an invalid input before the main calculation?

### Code

~~~js
function calculateArea(width, height) {
    if (width <= 0 || height <= 0) {
        return null;
    }

    return width * height;
}

console.log(calculateArea(5, 4));
console.log(calculateArea(0, 4));
~~~

### Expected output

~~~text
20
null
~~~

### Explanation

The guard clause returns null for a non-positive dimension. The multiplication only runs for valid dimensions.

## 8. Return different results for different conditions

### Question

How can each branch return a different label?

### Code

~~~js
function getTemperatureLabel(temperature) {
    if (temperature < 10) {
        return "Cold";
    }

    if (temperature < 25) {
        return "Mild";
    }

    return "Warm";
}

console.log(getTemperatureLabel(5));
console.log(getTemperatureLabel(18));
console.log(getTemperatureLabel(30));
~~~

### Expected output

~~~text
Cold
Mild
Warm
~~~

### Explanation

Each call returns from the first matching branch. The final return handles values not matched earlier.

## 9. Return an object to the caller

### Question

How can a function return a structured result with multiple properties?

### Code

~~~js
function createPoint(x, y) {
    return {
        x: x,
        y: y
    };
}

const point = createPoint(3, 8);
console.log(point.x);
console.log(point.y);
~~~

### Expected output

~~~text
3
8
~~~

### Explanation

The function returns one object. The caller can store it and read both properties.

## 10. Avoid a line break immediately after return

### Question

Why does this function return undefined?

### Code

~~~js
function createPoint() {
    return
    {
        x: 3,
        y: 8
    };
}

console.log(createPoint());
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

The line break after return allows JavaScript to insert a semicolon. The object is not part of the return statement.

## 11. Keep the returned object on the return line

### Question

How do you fix the previous function?

### Code

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

### Expected output

~~~text
3 8
~~~

### Explanation

The opening brace follows return on the same line, so the object literal is returned.

## 12. Return from a loop when a match is found

### Question

How can a search function return its first matching item?

### Code

~~~js
function findFirstLongWord(words) {
    for (const word of words) {
        if (word.length > 5) {
            return word;
        }
    }

    return null;
}

console.log(findFirstLongWord(["pen", "notebook", "backpack"]));
~~~

### Expected output

~~~text
notebook
~~~

### Explanation

The return exits the whole function when the first match is found. The loop does not continue to backpack.

## 13. Return null when a search finds nothing

### Question

How can a search function report that there is no match?

### Code

~~~js
function findFirstLongWord(words) {
    for (const word of words) {
        if (word.length > 5) {
            return word;
        }
    }

    return null;
}

console.log(findFirstLongWord(["pen", "bag"]));
~~~

### Expected output

~~~text
null
~~~

### Explanation

The loop completes without a match, so the final return reports the no-match case.

## 14. Compare break and return

### Question

How does break differ from return when used inside a loop?

### Code

~~~js
function printUntilEven(numbers) {
    for (const number of numbers) {
        if (number % 2 === 0) {
            break;
        }

        console.log(number);
    }

    console.log("Function continues after the loop.");
}

function returnAtEven(numbers) {
    for (const number of numbers) {
        if (number % 2 === 0) {
            return;
        }

        console.log(number);
    }

    console.log("This line is skipped after return.");
}

printUntilEven([1, 2, 3]);
returnAtEven([1, 2, 3]);
~~~

### Expected output

~~~text
1
Function continues after the loop.
1
~~~

### Explanation

break exits the loop and lets printUntilEven continue. return exits returnAtEven, so its final console.log is not reached.

## 15. Return from an inner function only

### Question

Does a return in an inner function also end its outer function?

### Code

~~~js
function outer() {
    function inner() {
        return "inner result";
    }

    console.log(inner());
    console.log("outer continues");
}

outer();
~~~

### Expected output

~~~text
inner result
outer continues
~~~

### Explanation

The return ends inner. The outer function resumes after the inner call.

## 16. Return an array

### Question

Can a function return an array of related values?

### Code

~~~js
function getCoordinates() {
    return [12, 7];
}

const coordinates = getCoordinates();
console.log(coordinates[0]);
console.log(coordinates[1]);
~~~

### Expected output

~~~text
12
7
~~~

### Explanation

Arrays are values and can be returned like numbers, strings, or objects.

## 17. Return a Boolean result

### Question

How can a function return whether an age meets a requirement?

### Code

~~~js
function canRegister(age) {
    return age >= 18;
}

console.log(canRegister(20));
console.log(canRegister(16));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The comparison evaluates to a Boolean, and return gives that Boolean to the caller.

## 18. Return from a try block and let finally run

### Question

Does finally run before a value returned from try reaches the caller?

### Code

~~~js
function getStatus() {
    try {
        return "ready";
    } finally {
        console.log("Cleanup runs.");
    }
}

console.log(getStatus());
~~~

### Expected output

~~~text
Cleanup runs.
ready
~~~

### Explanation

The return is pending while finally runs. After cleanup, the original result is delivered to the caller.

## 19. See how a return from finally overrides the earlier result

### Question

What happens if finally has its own return statement?

### Code

~~~js
function getStatus() {
    try {
        return "ready";
    } finally {
        return "replaced";
    }
}

console.log(getStatus());
~~~

### Expected output

~~~text
replaced
~~~

### Explanation

The return from finally replaces the earlier return. This can hide a result or an error, so do not use this pattern for ordinary cleanup.

## 20. Use a returned value in a later function call

### Question

How can one function's result become another function's input?

### Code

~~~js
function getPrice() {
    return 50;
}

function addTax(price) {
    return price * 1.1;
}

console.log(addTax(getPrice()));
~~~

### Expected output

~~~text
55.00000000000001
~~~

### Explanation

getPrice returns 50, which is passed to addTax. Floating-point arithmetic can produce a small representation difference for decimal calculations. For currency, applications commonly store minor units such as cents and format them for display.

## 21. Keep the caller running after a return

### Question

What code runs after a called function returns?

### Code

~~~js
function getMessage() {
    return "Done";
}

console.log(getMessage());
console.log("Caller continues.");
~~~

### Expected output

~~~text
Done
Caller continues.
~~~

### Explanation

return exits getMessage. The caller then resumes at the statement after that call.

## Key points

- A function returns a value to its caller when it reaches a return statement with an expression.
- A function without a returned expression produces undefined.
- Logging does not return the logged value.
- Early returns handle special cases and reduce unnecessary nesting.
- return inside a loop exits the function, while break exits only the loop.
- Keep the expression on the same line as return.
- finally runs before a pending return completes, and a return from finally overrides it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [37 - Parameters, default values, rest, and arguments](../lessons/037-parameters-default-values-rest-and-arguments.md) | [Open lesson](../lessons/038-return-values-and-early-returns.md) | [Open Q&A](../qnas/038-return-values-and-early-returns.md) | [39 - Arrow functions](../lessons/039-arrow-functions.md) |
