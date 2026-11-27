# 38 - Return values and early returns

A function can produce a value for the code that called it. The **return** statement sends that value back and ends the current function call. Return values let functions compute results that callers can store, compare, combine, or display.

This chapter explains returned values, functions that return undefined, and early returns that keep control flow clear.

## Return a value

Put an expression after **return** to make that expression's value the result of the function call:

~~~js
function add(first, second) {
    return first + second;
}

const total = add(4, 6);
console.log(total);
~~~

Output:

~~~text
10
~~~

The expression is evaluated, and its result is sent to the caller. Here, add(4, 6) evaluates to 10, and total receives that value.

A caller can use a returned value directly without first storing it:

~~~js
function square(number) {
    return number * number;
}

console.log(square(5));
~~~

Output:

~~~text
25
~~~

A returned value can also be passed to another function or used in a larger expression:

~~~js
function double(number) {
    return number * 2;
}

function addOne(number) {
    return number + 1;
}

console.log(addOne(double(3)));
~~~

Output:

~~~text
7
~~~

The inner call returns 6. The outer call receives 6 and returns 7.

## Return ends the current function

When JavaScript reaches a return statement, it exits that function immediately. Statements later in that same function body do not run:

~~~js
function getStatus() {
    console.log("Before return");
    return "ready";
    console.log("After return");
}

console.log(getStatus());
~~~

Output:

~~~text
Before return
ready
~~~

The second console.log inside getStatus is unreachable. The caller continues after the function call has produced its value.

A return statement ends only the current function call. It does not stop the entire program or automatically exit the function that called it.

## Functions without a returned value

If a function reaches its end without a return statement, the call evaluates to **undefined**:

~~~js
function showMessage() {
    console.log("Message shown.");
}

const result = showMessage();
console.log(result);
~~~

Output:

~~~text
Message shown.
undefined
~~~

The function printed a message, but it did not return that message. Logging a value and returning a value are different actions.

A bare return also exits the function and produces undefined:

~~~js
function checkAccess(isAllowed) {
    if (!isAllowed) {
        return;
    }

    console.log("Access granted.");
}

checkAccess(false);
console.log(checkAccess(false));
~~~

Output:

~~~text
undefined
undefined
~~~

The first call reaches the bare return. The second call does the same, and the caller prints the returned undefined.

## Return values are not console output

Use **return** when the caller needs a result. Use **console.log** when a developer needs to display a diagnostic value:

~~~js
function calculateTotal(price, tax) {
    return price + tax;
}

const total = calculateTotal(20, 3);
console.log("Total:", total);
~~~

Output:

~~~text
Total: 23
~~~

Here, calculateTotal produces the number 23. The caller decides to display it. If calculateTotal used console.log instead of return, the caller would not receive the number to store or use in a later calculation.

## Use an early return

An **early return** exits a function as soon as a condition means there is no more work to do:

~~~js
function showDiscount(price, discountRate) {
    if (price <= 0) {
        return "Price must be greater than zero.";
    }

    if (discountRate <= 0) {
        return "No discount applies.";
    }

    return "Discount: " + price * discountRate;
}

console.log(showDiscount(100, 0.2));
console.log(showDiscount(0, 0.2));
~~~

Output:

~~~text
Discount: 20
Price must be greater than zero.
~~~

Once the first condition is true, the function returns immediately. The later conditions and final return are not evaluated for that call.

Early returns can reduce unnecessary nesting. They are often called guard clauses when they check invalid or special cases near the start of a function.

~~~js
function getDisplayName(user) {
    if (user === null || user === undefined) {
        return "Guest";
    }

    if (user.name === "") {
        return "Unnamed user";
    }

    return user.name;
}

console.log(getDisplayName(null));
console.log(getDisplayName({ name: "Asha" }));
~~~

Output:

~~~text
Guest
Asha
~~~

Each guard clause handles one condition and exits. The main case remains easy to see at the end.

## Return different values from different branches

A function can return from multiple branches. Only the first return reached during a call determines that call's result:

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

Output:

~~~text
Cold
Mild
Warm
~~~

The return at the end handles values that did not match either earlier condition. Make sure every intended path has a useful result.

## Return objects and arrays

A function can return any JavaScript value, including an object or an array:

~~~js
function createPoint(x, y) {
    return {
        x: x,
        y: y
    };
}

const point = createPoint(3, 8);
console.log(point.x, point.y);
~~~

Output:

~~~text
3 8
~~~

When returning an object literal, keep the opening brace on the same line as return:

~~~js
function createPoint(x, y) {
    return {
        x: x,
        y: y
    };
}
~~~

## Avoid the newline after return pitfall

JavaScript can insert a semicolon after a return keyword when a line break follows it. This code returns undefined:

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

Output:

~~~text
undefined
~~~

The object literal is not returned. Put the expression on the same line as return:

~~~js
function createPoint() {
    return {
        x: 3,
        y: 8
    };
}

console.log(createPoint());
~~~

Output:

~~~text
{ x: 3, y: 8 }
~~~

The exact way developer tools format an object can differ, but the returned value has x equal to 3 and y equal to 8.

## Return from a loop

A return inside a function exits the whole function, even when the return appears inside a loop:

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

Output:

~~~text
8
~~~

After the first even number is found, the function returns 8 and the loop ends as part of the function exit. The later number 10 is not checked.

Use **break** when you want to exit a loop but continue running the rest of the current function. Use **return** when the function itself has completed its job.

## Return from a nested function

A return statement exits only the function that contains it:

~~~js
function outer() {
    function inner() {
        return "inner result";
    }

    const result = inner();
    console.log(result);
    console.log("Outer continues.");
}

outer();
~~~

Output:

~~~text
inner result
Outer continues.
~~~

The return exits inner. The outer function continues with the next statement after the call to inner.

## Return and finally

If a return occurs inside a try block with a finally block, finally runs before the function finishes returning. Avoid returning from finally because it can replace the earlier result:

~~~js
function getResult() {
    try {
        return "try result";
    } finally {
        console.log("Cleanup runs before return.");
    }
}

console.log(getResult());
~~~

Output:

~~~text
Cleanup runs before return.
try result
~~~

The finally block runs, then the original return value is delivered. A return statement inside finally would override it, so use finally for cleanup rather than choosing the function's result.

## Common mistakes

- **Using console.log instead of return:** Logging displays a value but does not provide it to the caller.
- **Forgetting that return exits the function:** Later statements in that function will not run.
- **Assuming a function always returns a value:** Reaching the end or using a bare return produces undefined.
- **Putting a line break immediately after return:** Automatic semicolon insertion can cause an unexpected undefined result.
- **Using break when the whole function should finish:** break exits a loop or switch, while return exits the current function.
- **Returning from finally:** This can replace a value or hide an error from an earlier completion.
- **Leaving a path without an intentional result:** Check that all intended branches return the value the caller needs.

## Try it yourself

1. Write a function that converts minutes to seconds and returns the result.
2. Call a function with no return statement and inspect the value it produces.
3. Add a guard clause that returns a message for a negative input.
4. Write a function that searches an array and returns the first matching item.
5. Return an object from a function and read one of its properties.
6. Place an object literal after return on a new line, observe the result, then fix the line break.

## Key points

- return sends a value to the caller and exits the current function.
- A function with no returned expression produces undefined.
- console.log displays a value, while return gives a value back to the caller.
- Early returns handle special cases and can keep the main path less nested.
- return inside a loop ends the function. break only exits the loop or switch.
- Keep a returned object expression on the same line as return.
- finally runs before a pending return completes. Avoid overriding that return from finally.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [37 - Parameters, default values, rest, and arguments](037-parameters-default-values-rest-and-arguments.md) | [Open Q&A](../qnas/038-return-values-and-early-returns.md) | [Open example](../examples/038-return-values-and-early-returns.md) | [39 - Arrow functions](039-arrow-functions.md) |
