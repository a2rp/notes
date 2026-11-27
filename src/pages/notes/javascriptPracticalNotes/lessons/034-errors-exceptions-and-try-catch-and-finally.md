# 34 - Errors, exceptions, and try, catch, and finally

Programs can fail for many reasons: a value may have the wrong type, input may be invalid, or an operation may not be possible. JavaScript reports many failures with **errors**. You can also create and throw an error when your own code detects a problem.

This chapter explains common error types, how thrown values move through a program, and how to handle failures with **try**, **catch**, and **finally**.

## Errors and exceptions

An error is a value that describes a failure. An exception is a value being thrown so normal execution can be interrupted and the failure can be handled elsewhere.

JavaScript creates errors for problems such as calling a value that is not a function or reading a property from an unavailable value. These are often called runtime errors because they happen while a program is running.

The built-in **Error** constructor creates an error object:

~~~js
const error = new Error("The requested item was not found.");

console.log(error.name);
console.log(error.message);
~~~

Output:

~~~text
Error
The requested item was not found.
~~~

The **name** usually identifies the kind of error. The **message** describes the specific problem. Error objects may also contain a stack trace that helps a developer find where the failure occurred. Stack traces are useful for debugging, but their exact format is provided by the JavaScript host and is not identical everywhere.

## Common built-in error types

JavaScript includes error classes for common kinds of failures:

- **Error** is the general error type.
- **TypeError** means an operation received a value of an unsuitable type.
- **ReferenceError** means code tried to use a name that cannot be resolved.
- **SyntaxError** means source text could not be parsed as valid JavaScript. A syntax error in the current script normally prevents that script from running.
- **RangeError** means a value is outside an allowed range.
- **URIError** is used by certain URI encoding and decoding operations.
- **AggregateError** groups multiple errors into one error value, such as when several promises fail together.

For example, calling a number as if it were a function causes a TypeError:

~~~js
const total = 42;

total();
~~~

The exact message can differ between engines, but the error type is TypeError.

You can use **instanceof** to check whether an error is an instance of a built-in error class:

~~~js
try {
    null.toString();
} catch (error) {
    console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

Prefer checking the error type when your code needs different recovery behavior for different failures. Avoid depending on the exact wording of an error message because that wording can vary.

## Throwing an error

Use **throw** to stop the current operation and send a value to an enclosing handler. Throwing an Error object is the usual choice:

~~~js
function getDiscount(price, discount) {
    if (price < 0) {
        throw new RangeError("Price cannot be negative.");
    }

    if (discount < 0 || discount > 1) {
        throw new RangeError("Discount must be between 0 and 1.");
    }

    return price * (1 - discount);
}

console.log(getDiscount(100, 0.2));
~~~

Output:

~~~text
80
~~~

If either value is invalid, the function throws instead of returning a result. The statements after the throw in that function are not reached.

JavaScript technically allows throwing any value, including a string or a number. For example, **throw "failed"** is legal, but it is harder to inspect and handle consistently. Prefer throwing an Error or a more specific built-in error.

### Add context with a custom error

You can create a custom error class when a failure has a meaning specific to your application:

~~~js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

throw new ValidationError("Email address is required.");
~~~

A custom error can be identified with **instanceof ValidationError** and handled separately from other failures. For a simple validation failure, a standard Error may be enough. Add a custom class when its distinct type improves handling or clarity.

### Preserve the cause of a failure

Sometimes an operation fails because a lower-level operation failed. The Error constructor accepts a **cause** option so code can add context without discarding the original error:

~~~js
try {
    throw new Error("Connection timed out.");
} catch (cause) {
    throw new Error("Could not load the profile.", { cause });
}
~~~

The new error describes the operation that failed, and its **cause** points to the original failure. This is helpful when an error passes through several layers of an application.

## How errors propagate

When JavaScript throws an error, it stops executing the current sequence of statements and looks for a matching **catch** block.

If the current function has no handler, the error travels back to the function that called it. This process continues through the call stack until a handler catches the error. If no handler is found, the host reports an uncaught error.

~~~js
function loadSettings() {
    throw new Error("Settings are unavailable.");
}

function startApp() {
    loadSettings();
}

try {
    startApp();
} catch (error) {
    console.log(error.message);
}
~~~

Output:

~~~text
Settings are unavailable.
~~~

The catch block can handle an error thrown several function calls below it. Once an error is caught, normal execution continues after that try/catch statement, unless the catch block throws again or returns from its own function.

## Handling errors with try and catch

Put code that may throw inside a **try** block. Put recovery or reporting logic inside its matching **catch** block:

~~~js
try {
    const result = JSON.parse('{"enabled": true}');
    console.log(result.enabled);
} catch (error) {
    console.log("The data could not be parsed.");
}
~~~

Output:

~~~text
true
~~~

If JSON.parse receives invalid JSON, it throws a SyntaxError and execution moves into the catch block. The catch parameter receives the thrown value. The parameter is scoped to the catch block.

When the thrown value does not matter, JavaScript allows a catch block without a binding:

~~~js
try {
    performOptionalTask();
} catch {
    console.log("The optional task could not be completed.");
}
~~~

Use a bound error when you need to inspect its type, message, or cause. Use an unbound catch only when the handler truly does not need the value.

### Handle only what you can recover from

A catch block should make a useful decision: show an understandable message, use a safe fallback, retry when appropriate, or pass the problem to a higher layer. Avoid catching an error and silently doing nothing:

~~~js
try {
    saveChanges();
} catch {
    // Silently ignoring the failure hides the problem.
}
~~~

If the current function cannot fix the problem, rethrow it so a caller can decide what to do:

~~~js
try {
    loadSettings();
} catch (error) {
    console.error("Settings could not be loaded:", error.message);
    throw error;
}
~~~

Logging and rethrowing can be useful at a boundary where context is added. Repeatedly logging the same error at every layer creates noise, so choose a clear place to report it.

## The finally block

A **finally** block runs after the try block and any catch block, whether the operation succeeds or throws:

~~~js
function readRecord() {
    let status = "not started";

    try {
        status = "reading";
        throw new Error("Record is unavailable.");
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log("Cleanup runs.");
    }

    console.log("Status:", status);
}

readRecord();
~~~

Output:

~~~text
Record is unavailable.
Cleanup runs.
Status: reading
~~~

Use finally for cleanup that must happen regardless of success or failure, such as releasing a resource or restoring a temporary state. In browser and Node.js code, prefer a resource API's own cleanup mechanism when one is available.

Avoid putting **return** or **throw** in finally unless you deliberately want it to override what happened earlier. A return from finally can hide an error that was thrown in try, and a throw from finally can replace an earlier error.

## Catching failures from asynchronous work

A synchronous try/catch handles errors thrown while the try block is executing. It does not catch a rejection from a Promise that is started but not awaited:

~~~js
try {
    loadData();
} catch (error) {
    console.log("This does not handle a later Promise rejection.");
}
~~~

When using **async** and **await**, put the await inside the try block so a rejected Promise becomes an exception at that point:

~~~js
async function showData() {
    try {
        const data = await loadData();
        console.log(data);
    } catch (error) {
        console.log("Data could not be loaded:", error.message);
    }
}
~~~

The same rule applies to an awaited call in a try block. If a Promise is not awaited or otherwise given a rejection handler, this catch block cannot handle its later rejection.

## Common mistakes

- **Assuming every failure throws:** Some APIs report failure with a return value, such as false or null. Read the API's behavior and check that result.
- **Catching too broadly:** Keep a try block focused on operations that can reasonably fail together.
- **Ignoring the error:** A silent catch hides useful information and may leave the program in a broken state.
- **Throwing plain strings:** Error objects give consistent message and type information.
- **Depending on exact error text:** Handle a known error type or your own error class instead.
- **Returning from finally:** This can replace an earlier return or suppress an error.
- **Expecting synchronous catch to handle an unawaited Promise:** Await the Promise inside try or attach a rejection handler.

## Try it yourself

1. Create a function that accepts an age and throws a RangeError if the age is below zero.
2. Call the function inside try/catch and print the error message.
3. Create a ValidationError class and throw it for a missing username.
4. Add a finally block that prints a cleanup message whether the function succeeds or fails.
5. Change an async function so it awaits its operation inside try/catch.

## Key points

- An error object describes a failure. A thrown value interrupts normal execution until a handler is found.
- Prefer throwing Error objects, using specific built-in or custom error types when they improve handling.
- Errors propagate up the call stack until a catch block handles them or the host reports them as uncaught.
- Use try/catch to handle failures you can recover from or explain.
- Use finally for cleanup that must run after success or failure.
- A synchronous catch handles a rejected Promise only when its rejection is awaited within the try block or handled with a rejection callback.
- Do not silently swallow errors or rely on engine-specific error message text.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [33 - break, continue, and labels](033-break-continue-and-labels.md) | [Open Q&A](../qnas/034-errors-exceptions-and-try-catch-and-finally.md) | [Open example](../examples/034-errors-exceptions-and-try-catch-and-finally.md) | [35 - Debugging, stack traces, and breakpoints](035-debugging-stack-traces-and-breakpoints.md) |
