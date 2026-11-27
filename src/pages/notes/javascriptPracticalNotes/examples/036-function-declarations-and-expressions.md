# 36 - Function declarations and expressions - Examples

These examples show how to define and call functions in JavaScript. Each code sample is displayed for copying, followed by expected output and an explanation.

## 1. Declare and call a function

### Question

How do you define a named function declaration and run it?

### Code

~~~js
function showWelcome() {
    console.log("Welcome!");
}

showWelcome();
~~~

### Expected output

~~~text
Welcome!
~~~

### Explanation

The declaration defines showWelcome. The call with parentheses runs its body.

## 2. Define a function without running it

### Question

Does a function body run as soon as its declaration is read?

### Code

~~~js
function showStatus() {
    console.log("The body ran.");
}

console.log("Before any call.");
~~~

### Expected output

~~~text
Before any call.
~~~

### Explanation

A declaration defines a function but does not run its body. Since showStatus is never called, The body ran is not printed.

## 3. Call a declaration more than once

### Question

What happens if a function declaration is called twice?

### Code

~~~js
function showMessage() {
    console.log("Message shown.");
}

showMessage();
showMessage();
~~~

### Expected output

~~~text
Message shown.
Message shown.
~~~

### Explanation

Each call executes the function body once.

## 4. Create a function expression

### Question

How can you store an anonymous function expression in a const binding?

### Code

~~~js
const showReady = function () {
    console.log("Ready.");
};

showReady();
~~~

### Expected output

~~~text
Ready.
~~~

### Explanation

The function expression creates a function value. The const declaration assigns that value to showReady, and the call runs it.

## 5. Refer to a function without calling it

### Question

What is the difference between logging the function binding and calling it?

### Code

~~~js
const showMessage = function () {
    console.log("The body ran.");
};

console.log(typeof showMessage);
showMessage();
~~~

### Expected output

~~~text
function
The body ran.
~~~

### Explanation

The first statement inspects the function value without calling it. The second statement invokes the function.

## 6. Call a declaration before its source position

### Question

Can a function declaration be called before its declaration appears in the file?

### Code

~~~js
showGreeting();

function showGreeting() {
    console.log("Hello.");
}
~~~

### Expected output

~~~text
Hello.
~~~

### Explanation

Function declarations are initialized before statements in their enclosing scope execute. This behavior is commonly called function declaration hoisting.

## 7. Call a function expression after initialization

### Question

Where should a call appear when using a const function expression?

### Code

~~~js
const showGreeting = function () {
    console.log("Hello.");
};

showGreeting();
~~~

### Expected output

~~~text
Hello.
~~~

### Explanation

The initializer creates and assigns the function before the call reads the binding.

## 8. Catch an earlier access to a const function expression

### Question

What happens if the call occurs before the const initializer?

### Code

~~~js
try {
    showGreeting();
} catch (error) {
    console.log(error.name);
}

const showGreeting = function () {
    console.log("Hello.");
};

showGreeting();
~~~

### Expected output

~~~text
ReferenceError
Hello.
~~~

### Explanation

The earlier call reads showGreeting before its const declaration initializes it, so it throws a ReferenceError. The catch handles that error. Execution then reaches the initializer, and the later call succeeds.

## 9. Inspect an inferred function name

### Question

What name does JavaScript infer for an anonymous function expression assigned to a const?

### Code

~~~js
const calculateTotal = function () {
    return 25;
};

console.log(calculateTotal.name);
console.log(calculateTotal());
~~~

### Expected output

~~~text
calculateTotal
25
~~~

### Explanation

JavaScript infers calculateTotal as the function's name for diagnostics. The call then returns 25.

## 10. Give a function expression an explicit name

### Question

How can you give a function expression an explicit internal name?

### Code

~~~js
const showNotice = function displayNotice() {
    console.log(displayNotice.name);
};

showNotice();
~~~

### Expected output

~~~text
displayNotice
~~~

### Explanation

displayNotice is the expression's internal name and is available inside its body. The outer binding showNotice is used to call it.

## 11. Keep a named expression's name inside the function

### Question

Can the surrounding code use the internal name of a named function expression?

### Code

~~~js
const showNotice = function displayNotice() {
    console.log("Inside:", displayNotice.name);
};

showNotice();
console.log("Outside:", typeof displayNotice);
~~~

### Expected output

~~~text
Inside: displayNotice
Outside: undefined
~~~

### Explanation

The explicit name is local to the function expression. Outside the function, showNotice is the binding that refers to the function. typeof returns the string "undefined" for an unresolved identifier.

## 12. Compare declaration and expression forms

### Question

Can a declaration and an expression both run the same behavior?

### Code

~~~js
function showFirst() {
    console.log("Same behavior.");
}

const showSecond = function () {
    console.log("Same behavior.");
};

showFirst();
showSecond();
~~~

### Expected output

~~~text
Same behavior.
Same behavior.
~~~

### Explanation

Both forms define callable functions. They differ in their syntax and initialization behavior, not in whether a call can run their body.

## 13. Assign one function value to another binding

### Question

Does copying a function value into another binding run it?

### Code

~~~js
const first = function () {
    console.log("Function ran.");
};

const second = first;

console.log("Copied.");
second();
~~~

### Expected output

~~~text
Copied.
Function ran.
~~~

### Explanation

The assignment stores the same function value in second. The function runs only when second is called.

## 14. Check whether two bindings refer to the same function

### Question

What does strict equality report after one function value is assigned to two bindings?

### Code

~~~js
const first = function () {};
const second = first;

console.log(first === second);
~~~

### Expected output

~~~text
true
~~~

### Explanation

Both bindings refer to the same function object. The assignment does not create a second function.

## 15. Place a helper declaration inside another function

### Question

How can a helper function stay inside the function that uses it?

### Code

~~~js
function createLabel() {
    function getName() {
        return "Asha";
    }

    return "User: " + getName();
}

console.log(createLabel());
~~~

### Expected output

~~~text
User: Asha
~~~

### Explanation

getName is declared inside createLabel and used there. The outer code calls createLabel.

## 16. Observe that a function expression waits for its declaration

### Question

When does this function expression become callable?

### Code

~~~js
const printSummary = function () {
    console.log("Summary");
};

console.log("Expression initialized.");
printSummary();
~~~

### Expected output

~~~text
Expression initialized.
Summary
~~~

### Explanation

Execution first evaluates the function expression and assigns it to printSummary. Only then does the call run its body.

## 17. Observe declaration call order

### Question

In what order do these statements run when a declaration is called before its definition?

### Code

~~~js
console.log("First statement.");
showLast();

function showLast() {
    console.log("Function body.");
}

console.log("Last statement.");
~~~

### Expected output

~~~text
First statement.
Function body.
Last statement.
~~~

### Explanation

The declaration is initialized before the statements run, but its body executes only at the call between the two console messages.

## 18. Use a function expression as a stored operation

### Question

How can an operation be stored and run later?

### Code

~~~js
const printReceipt = function () {
    console.log("Receipt printed.");
};

console.log("Preparing receipt.");
printReceipt();
~~~

### Expected output

~~~text
Preparing receipt.
Receipt printed.
~~~

### Explanation

The const binding stores the function value. The explicit call decides when its body runs.

## 19. Choose a declaration for a named operation

### Question

How can you define a named operation directly in the surrounding scope?

### Code

~~~js
function printConnectionStatus() {
    console.log("Connected.");
}

printConnectionStatus();
~~~

### Expected output

~~~text
Connected.
~~~

### Explanation

A function declaration gives the operation a name in its enclosing scope and makes it available before its source position.

## 20. Choose an expression when storing a function value

### Question

How can you define a function as the value of a const binding?

### Code

~~~js
const printConnectionStatus = function () {
    console.log("Connected.");
};

printConnectionStatus();
~~~

### Expected output

~~~text
Connected.
~~~

### Explanation

A function expression is useful when the function is being assigned as a value. Place calls after the initializer has run.

## Key points

- A declaration defines a named function in statement position.
- An expression creates a function value inside another expression.
- A function body runs only when the function is called.
- A function declaration can be called before its textual position in the same scope.
- A const function expression becomes available after its initializer executes.
- A function's explicit internal name and its outer variable binding are distinct.
- Assigning or copying a function does not call it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [35 - Debugging, stack traces, and breakpoints](../lessons/035-debugging-stack-traces-and-breakpoints.md) | [Open lesson](../lessons/036-function-declarations-and-expressions.md) | [Open Q&A](../qnas/036-function-declarations-and-expressions.md) | [37 - Parameters, default values, rest, and arguments](../lessons/037-parameters-default-values-rest-and-arguments.md) |
