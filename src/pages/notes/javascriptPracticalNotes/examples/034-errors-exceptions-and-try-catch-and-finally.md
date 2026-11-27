# 34 - Errors, exceptions, and try, catch, and finally - Examples

These examples show common ways to create, throw, catch, and inspect JavaScript errors. Each code block is displayed as a learning example. Its expected output and explanation follow immediately.

## 1. Create an Error object

### Question

How can you create an error with a useful message and inspect its basic properties?

### Code

~~~js
const error = new Error("The requested record was not found.");

console.log(error.name);
console.log(error.message);
~~~

### Expected output

~~~text
Error
The requested record was not found.
~~~

### Explanation

The Error constructor creates an error object. Its name identifies the broad error type, while message contains the specific description. A stack trace may also be available, but its exact format differs by JavaScript host.

## 2. Catch an error from a function

### Question

How can a caller handle an error thrown by a function it calls?

### Code

~~~js
function loadSettings() {
    throw new Error("Settings are unavailable.");
}

try {
    loadSettings();
    console.log("Settings loaded");
} catch (error) {
    console.log("Could not load settings:", error.message);
}

console.log("The program continues here.");
~~~

### Expected output

~~~text
Could not load settings: Settings are unavailable.
The program continues here.
~~~

### Explanation

loadSettings throws an Error. Since the function has no catch block, the error propagates to its caller. The caller handles it, and execution continues after the try/catch statement.

## 3. Validate input and throw a specific error

### Question

How can a function reject an invalid numeric input with a specific error type?

### Code

~~~js
function calculateDiscount(price, discountRate) {
    if (price < 0) {
        throw new RangeError("Price cannot be negative.");
    }

    if (discountRate < 0 || discountRate > 1) {
        throw new RangeError("Discount rate must be between 0 and 1.");
    }

    return price * (1 - discountRate);
}

try {
    console.log(calculateDiscount(100, 0.2));
    console.log(calculateDiscount(-20, 0.2));
} catch (error) {
    console.log(error.name + ": " + error.message);
}
~~~

### Expected output

~~~text
80
RangeError: Price cannot be negative.
~~~

### Explanation

The function checks each input before calculating. The first call returns 80. The second call throws a RangeError, so its calculation does not continue and control moves to catch.

## 4. Check an error type

### Question

How can a catch block distinguish a TypeError from another kind of error?

### Code

~~~js
try {
    null.toString();
} catch (error) {
    if (error instanceof TypeError) {
        console.log("A value had an unsuitable type.");
    } else {
        console.log("A different error occurred.");
    }
}
~~~

### Expected output

~~~text
A value had an unsuitable type.
~~~

### Explanation

Accessing a property on null causes a TypeError. The instanceof check identifies the error class without relying on engine-specific message text.

## 5. Catch invalid JSON

### Question

How can you handle text that is not valid JSON?

### Code

~~~js
const text = "{ name: 'Riya' }";

try {
    const data = JSON.parse(text);
    console.log(data.name);
} catch (error) {
    console.log(error instanceof SyntaxError);
    console.log("The supplied text is not valid JSON.");
}
~~~

### Expected output

~~~text
true
The supplied text is not valid JSON.
~~~

### Explanation

JSON requires quoted property names and string values. JSON.parse throws a SyntaxError for this input. The catch block handles that parsing failure.

## 6. Use a catch block without a binding

### Question

What can you do when you need to respond to an error but do not need to inspect the thrown value?

### Code

~~~js
function runOptionalFeature() {
    throw new Error("Feature unavailable.");
}

try {
    runOptionalFeature();
} catch {
    console.log("The optional feature could not be started.");
}
~~~

### Expected output

~~~text
The optional feature could not be started.
~~~

### Explanation

A catch block can omit its parameter. This is useful only when the thrown value is genuinely unnecessary. If diagnostics or different recovery behavior are needed, bind the error.

## 7. Run cleanup with finally

### Question

How can cleanup run whether a task succeeds or throws?

### Code

~~~js
let resourceIsOpen = true;

try {
    console.log("Working with the resource.");
    throw new Error("The operation failed.");
} catch (error) {
    console.log(error.message);
} finally {
    resourceIsOpen = false;
    console.log("Cleanup completed.");
}

console.log("Resource open:", resourceIsOpen);
~~~

### Expected output

~~~text
Working with the resource.
The operation failed.
Cleanup completed.
Resource open: false
~~~

### Explanation

The error is handled by catch, then finally runs and resets the state. The same finally block would run if the try block completed normally.

## 8. Finally also runs after success

### Question

Does finally run when try does not throw an error?

### Code

~~~js
try {
    console.log("Task completed.");
} catch (error) {
    console.log("Task failed.");
} finally {
    console.log("Run final cleanup.");
}
~~~

### Expected output

~~~text
Task completed.
Run final cleanup.
~~~

### Explanation

Because try succeeds, catch is skipped. finally still runs after the try/catch sequence.

## 9. See why returning from finally is dangerous

### Question

What happens when finally returns a value after try has already returned another value?

### Code

~~~js
function getStatus() {
    try {
        return "success";
    } finally {
        return "cleanup result";
    }
}

console.log(getStatus());
~~~

### Expected output

~~~text
cleanup result
~~~

### Explanation

The return statement in finally overrides the return from try. A return in finally can also hide a thrown error. Use finally for cleanup and keep returns in the surrounding function flow.

## 10. Rethrow an error the current code cannot handle

### Question

How can a function report an error and let its caller decide what to do?

### Code

~~~js
function readConfiguration() {
    try {
        throw new Error("Configuration file is missing.");
    } catch (error) {
        console.log("Configuration loading failed.");
        throw error;
    }
}

try {
    readConfiguration();
} catch (error) {
    console.log("Caller received:", error.message);
}
~~~

### Expected output

~~~text
Configuration loading failed.
Caller received: Configuration file is missing.
~~~

### Explanation

The function adds a short message and rethrows the same error. The caller then receives it. Avoid logging the same failure at many layers, since that creates duplicate output.

## 11. Add context while preserving the original cause

### Question

How can one error explain a higher-level failure while keeping the original error available?

### Code

~~~js
function loadProfile() {
    try {
        throw new Error("Connection timed out.");
    } catch (cause) {
        throw new Error("Could not load the profile.", { cause });
    }
}

try {
    loadProfile();
} catch (error) {
    console.log(error.message);
    console.log("Original cause:", error.cause.message);
}
~~~

### Expected output

~~~text
Could not load the profile.
Original cause: Connection timed out.
~~~

### Explanation

The new Error gives the caller useful context. Its cause property keeps the lower-level error available for diagnosis.

## 12. Create an application-specific error class

### Question

How can you make a validation error distinguishable from other errors?

### Code

~~~js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function createAccount(username) {
    if (username.trim() === "") {
        throw new ValidationError("Username is required.");
    }

    return { username };
}

try {
    createAccount("   ");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(error.name + ": " + error.message);
    } else {
        throw error;
    }
}
~~~

### Expected output

~~~text
ValidationError: Username is required.
~~~

### Explanation

ValidationError extends Error, so it keeps the normal Error behavior while adding a recognizable application-specific type. The catch block handles this known failure and rethrows unexpected ones.

## 13. Catch an error from a nested function call

### Question

Can a caller catch an error thrown several function calls below it?

### Code

~~~js
function findUser() {
    throw new Error("User does not exist.");
}

function loadDashboard() {
    findUser();
}

function startPage() {
    loadDashboard();
}

try {
    startPage();
} catch (error) {
    console.log(error.message);
}
~~~

### Expected output

~~~text
User does not exist.
~~~

### Explanation

Neither findUser nor loadDashboard handles the error. It propagates through both calls until it reaches the catch around startPage.

## 14. Handle an expected result without throwing

### Question

Should every missing search result be represented by an exception?

### Code

~~~js
const users = [
    { id: 1, name: "Asha" },
    { id: 2, name: "Ravi" }
];

function findUserById(id) {
    return users.find(function (user) {
        return user.id === id;
    }) ?? null;
}

const user = findUserById(10);

if (user === null) {
    console.log("No user found.");
} else {
    console.log(user.name);
}
~~~

### Expected output

~~~text
No user found.
~~~

### Explanation

A search that finds nothing can be a normal outcome. Returning null makes that result explicit without using an exception for ordinary control flow.

## 15. Check a failure value returned by an API

### Question

How should code respond when an API signals failure with false instead of throwing?

### Code

~~~js
function saveDraft() {
    return false;
}

try {
    const saved = saveDraft();

    if (!saved) {
        console.log("The draft was not saved.");
    }
} catch (error) {
    console.log("An unexpected error occurred:", error.message);
}
~~~

### Expected output

~~~text
The draft was not saved.
~~~

### Explanation

A try block does not turn a false return value into an exception. Check the API's return value and use catch for errors it actually throws.

## 16. Handle a rejected Promise with await

### Question

How can an async function handle a Promise rejection with try/catch?

### Code

~~~js
function loadProfile() {
    return Promise.reject(new Error("Server is unavailable."));
}

async function showProfile() {
    try {
        const profile = await loadProfile();
        console.log(profile);
    } catch (error) {
        console.log("Could not load profile:", error.message);
    }
}

showProfile();
~~~

### Expected output

~~~text
Could not load profile: Server is unavailable.
~~~

### Explanation

The await expression turns the Promise rejection into a thrown error at that point. Because await is inside try, catch handles it.

## 17. Handle a Promise rejection with a rejection callback

### Question

Can Promise rejection be handled without async and await?

### Code

~~~js
function loadCount() {
    return Promise.reject(new Error("Count is unavailable."));
}

loadCount().catch(function (error) {
    console.log(error.message);
});
~~~

### Expected output

~~~text
Count is unavailable.
~~~

### Explanation

The function passed to catch handles the rejected Promise. For Promise chains, return a value from a handler to continue successfully, or throw to create another rejection.

## 18. Why an unawaited Promise escapes synchronous catch

### Question

Why does this try/catch not handle a rejection that happens later?

### Code

~~~js
function loadData() {
    return Promise.reject(new Error("Request failed."));
}

const pending = loadData();

try {
    pending;
    console.log("The synchronous try block finished.");
} catch (error) {
    console.log("Caught:", error.message);
}

pending.catch(function (error) {
    console.log("Handled later:", error.message);
});
~~~

### Expected output

~~~text
The synchronous try block finished.
Handled later: Request failed.
~~~

### Explanation

loadData returns a Promise. Its rejection occurs asynchronously, after the synchronous try block has finished. This catch cannot handle it. To handle the rejection, await the Promise inside an async try block or attach a rejection callback. The attached catch handles the rejection separately, after the synchronous try block has completed.

## 19. Let an awaited failure pass through finally

### Question

Does finally run when an awaited Promise rejects?

### Code

~~~js
async function readData() {
    try {
        await Promise.reject(new Error("Read failed."));
    } finally {
        console.log("Finish cleanup.");
    }
}

readData().catch(function (error) {
    console.log(error.message);
});
~~~

### Expected output

~~~text
Finish cleanup.
Read failed.
~~~

### Explanation

finally runs when the awaited operation rejects. Since there is no catch inside readData, the async function's returned Promise remains rejected, and the final catch callback handles that rejection.

## 20. Use a safe fallback for an optional operation

### Question

How can code provide a fallback when a nonessential operation throws?

### Code

~~~js
function readDisplayName() {
    try {
        throw new Error("Profile is unavailable.");
    } catch (error) {
        console.log("Using the default display name.");
        return "Guest";
    }
}

console.log(readDisplayName());
~~~

### Expected output

~~~text
Using the default display name.
Guest
~~~

### Explanation

A fallback is appropriate when the operation is optional and the fallback keeps the program in a valid state. Do not use a fallback that hides a failure the program cannot safely recover from.

## 21. Build an error message from the failure type

### Question

How can a handler report useful details without relying on the exact message text?

### Code

~~~js
try {
    throw new RangeError("Page number must be positive.");
} catch (error) {
    if (error instanceof RangeError) {
        console.log("Input is outside the allowed range.");
    } else {
        console.log("An unexpected error occurred.");
    }
}
~~~

### Expected output

~~~text
Input is outside the allowed range.
~~~

### Explanation

The code uses the error class to choose a response. The displayed message is controlled by the application instead of depending on engine-specific wording.

## 22. Catch an error and keep the thrown value

### Question

Does catch replace or modify the value that was thrown?

### Code

~~~js
const originalError = new Error("Original failure.");

try {
    throw originalError;
} catch (error) {
    console.log(error === originalError);
    console.log(error.message);
}
~~~

### Expected output

~~~text
true
Original failure.
~~~

### Explanation

The catch parameter refers to the thrown value. Catch does not automatically replace the error. Code can handle it, wrap it, or rethrow it.

## 23. Keep unrelated code outside a try block

### Question

Why is a narrow try block often easier to understand?

### Code

~~~js
const rawText = "{ invalid }";
let settings;

try {
    settings = JSON.parse(rawText);
} catch (error) {
    console.log("Settings could not be parsed.");
}

console.log("Application setup continues.");
~~~

### Expected output

~~~text
Settings could not be parsed.
Application setup continues.
~~~

### Explanation

Only the operation expected to throw is inside try. This makes the catch block's responsibility clear and prevents it from accidentally handling unrelated errors in later code.

## 24. Know when a syntax error can be caught

### Question

Can a try block in the same script catch every syntax error in that script?

### Code

~~~js
try {
    console.log("This code has valid syntax.");
} catch (error) {
    console.log("A syntax error occurred.");
}
~~~

### Expected output

~~~text
This code has valid syntax.
~~~

### Explanation

A syntax error in the current source file normally prevents that file from running, so a try block in that same file cannot catch it. A SyntaxError can be caught when it is thrown at runtime by an operation that parses text, such as JSON.parse or eval. Avoid eval for ordinary application code.

## Key points

- Throw Error objects with useful messages and specific types.
- Catch at a level that can recover, explain the failure, or pass it on.
- Use finally for cleanup and avoid returning from it.
- Await Promises inside try or use a Promise rejection handler.
- Check return values when an API reports failure without throwing.
- Do not silently ignore errors or rely on exact engine-provided message text.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [33 - break, continue, and labels](../lessons/033-break-continue-and-labels.md) | [Open lesson](../lessons/034-errors-exceptions-and-try-catch-and-finally.md) | [Open Q&A](../qnas/034-errors-exceptions-and-try-catch-and-finally.md) | [35 - Debugging, stack traces, and breakpoints](../lessons/035-debugging-stack-traces-and-breakpoints.md) |

