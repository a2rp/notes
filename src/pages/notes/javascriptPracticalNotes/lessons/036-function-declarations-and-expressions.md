# 36 - Function declarations and expressions

A function groups statements under a name so code can call that behavior when it is needed. JavaScript has two common ways to define a regular function: a **function declaration** and a **function expression**.

Both can create reusable functions, but they differ in how they are written and when their bindings become available. This chapter focuses on recognizing and choosing between these forms. Function parameters and return behavior are covered in later chapters.

## A function declaration

A function declaration starts with the **function** keyword, followed by a name, parentheses, and a body in braces:

~~~js
function greet() {
    console.log("Hello!");
}

greet();
~~~

Output:

~~~text
Hello!
~~~

The declaration defines the function. The call, written with the function name followed by parentheses, runs its body.

Writing a declaration does not run the function:

~~~js
function showMessage() {
    console.log("The function ran.");
}

console.log("Before the call.");
showMessage();
console.log("After the call.");
~~~

Output:

~~~text
Before the call.
The function ran.
After the call.
~~~

The body runs each time the function is called. If a function is never called, its body does not run.

## A function expression

A function expression creates a function as part of an expression. A common pattern assigns that function to a variable:

~~~js
const showMessage = function () {
    console.log("The function expression ran.");
};

showMessage();
~~~

Output:

~~~text
The function expression ran.
~~~

Here, the expression on the right creates a function value, and the const declaration stores that value in showMessage. The semicolon ends the const declaration.

Use parentheses after the variable name to call the function. Writing showMessage without parentheses refers to the function value itself:

~~~js
const showMessage = function () {
    console.log("Message shown.");
};

console.log(typeof showMessage);
showMessage();
~~~

Output:

~~~text
function
Message shown.
~~~

This difference matters when a function value is passed to another function or stored for later use. Calling and passing a function are different actions.

## Anonymous and named function expressions

A function expression can omit its own name:

~~~js
const getGreeting = function () {
    return "Welcome back.";
};

console.log(getGreeting());
~~~

Output:

~~~text
Welcome back.
~~~

The function above is an anonymous function expression. JavaScript can infer a useful name from the variable it is assigned to, so getGreeting.name is usually "getGreeting".

A function expression can also have an explicit name:

~~~js
const getGreeting = function createGreeting() {
    return "Welcome back.";
};

console.log(getGreeting.name);
console.log(getGreeting());
~~~

Output:

~~~text
createGreeting
Welcome back.
~~~

The name createGreeting identifies the function from inside its own body and can help make stack traces clearer. The outer variable getGreeting is the name used to call it from this surrounding code. The inner name of a named function expression is not a second outer variable.

For ordinary code, an anonymous expression assigned to a clearly named const is common. Use an explicit function-expression name when it improves recursion or diagnostics. Recursion is covered later.

## Compare the two forms

These definitions can perform the same work:

~~~js
function showReady() {
    console.log("Ready");
}

const showAlsoReady = function () {
    console.log("Ready");
};

showReady();
showAlsoReady();
~~~

Output:

~~~text
Ready
Ready
~~~

A declaration is a standalone function declaration. An expression creates a function value inside a larger expression, such as the initializer of a const declaration.

Use a function declaration when a named function is a direct part of a module or a group of related statements. Use a function expression when the function needs to be stored in a variable or placed where an expression is expected.

## Function declarations and hoisting

Function declarations are available throughout their enclosing scope, including before the declaration appears in the source text:

~~~js
sayHello();

function sayHello() {
    console.log("Hello from a declaration.");
}
~~~

Output:

~~~text
Hello from a declaration.
~~~

This behavior is commonly described as **function declaration hoisting**. Before the statements in the scope run, JavaScript creates the function binding for the declaration.

Although this works, many teams place declarations before their calls because reading the function before its first use can make a file easier to follow.

## Function expressions are initialized where they appear

A function expression assigned to a const is not ready before the const declaration executes:

~~~js
const sayHello = function () {
    console.log("Hello from an expression.");
};

sayHello();
~~~

Output:

~~~text
Hello from an expression.
~~~

If code tries to call sayHello before the const declaration, it gets a ReferenceError because the const binding has not been initialized yet:

~~~js
sayHello();

const sayHello = function () {
    console.log("Hello from an expression.");
};
~~~

This code throws before the function body runs. The function expression is created only when execution reaches its initializer.

Do not treat function declarations and const function expressions as if they had identical hoisting behavior. A declaration can be called earlier in its scope. A const function expression should be used only after its initialization.

## Function declarations inside functions

A function declaration can be placed inside another function to keep a helper local to that outer function:

~~~js
function createWelcomeMessage() {
    function getName() {
        return "Asha";
    }

    return "Welcome, " + getName() + ".";
}

console.log(createWelcomeMessage());
~~~

Output:

~~~text
Welcome, Asha.
~~~

The helper declaration is inside createWelcomeMessage, so the surrounding code calls createWelcomeMessage rather than getName directly. The scope chapter later explains how these bindings relate to their surrounding code.

## Functions are values

A function expression produces a value with the function type. That value can be assigned to a variable:

~~~js
const firstFunction = function () {
    console.log("This function was stored in a variable.");
};

const secondFunction = firstFunction;

secondFunction();
~~~

Output:

~~~text
This function was stored in a variable.
~~~

The assignment copies the function value into another binding. It does not execute the function. The function runs only when a call expression invokes one of those bindings.

JavaScript also lets code pass functions to other functions and return them from functions. Those patterns are the foundation of callbacks and higher-order functions, which are explained in a later chapter.

## Common mistakes

- **Forgetting the call parentheses:** A function name by itself refers to the function value; it does not run the body.
- **Expecting a definition to execute:** A declaration or expression creates a function, but a call runs it.
- **Calling a const function expression before initialization:** Its binding is not ready until execution reaches the initializer.
- **Confusing an expression's inner name with its variable name:** The explicit name of a named function expression is local to that function.
- **Assuming const makes the function object immutable:** const prevents reassignment of the binding. It does not freeze the function object.
- **Using vague names:** Choose names that describe the function's purpose.
- **Mixing styles without a reason:** Follow a consistent convention in a file or project.

## Choosing a form

Use a function declaration for a named operation that belongs in the surrounding scope:

~~~js
function formatPrice() {
    console.log("Formatting price.");
}
~~~

Use a function expression when the function is being assigned as a value:

~~~js
const formatPrice = function () {
    console.log("Formatting price.");
};
~~~

Neither form is universally better. Pick a form that fits where the function belongs, then keep the code clear and consistent.

## Try it yourself

1. Write a function declaration named printTitle and call it.
2. Rewrite it as an anonymous function expression assigned to a const.
3. Write a named function expression and inspect its name property.
4. Call a function declaration before its textual position.
5. Move a call to a const function expression above its initializer and observe the ReferenceError.
6. Assign one function expression to two const bindings and verify that neither assignment runs it automatically.

## Key points

- A function declaration is a named function definition in statement position.
- A function expression creates a function value inside an expression.
- Use parentheses after a function binding to call and run the function.
- Function declarations are available earlier in their enclosing scope because their bindings are initialized before statements execute.
- A const function expression becomes available when its initializer executes.
- A named function expression has an inner name that is not a second outer binding.
- Function values can be assigned, passed, and returned. Later chapters explore these patterns.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [35 - Debugging, stack traces, and breakpoints](035-debugging-stack-traces-and-breakpoints.md) | [Open Q&A](../qnas/036-function-declarations-and-expressions.md) | [Open example](../examples/036-function-declarations-and-expressions.md) | [37 - Parameters, default values, rest, and arguments](037-parameters-default-values-rest-and-arguments.md) |
