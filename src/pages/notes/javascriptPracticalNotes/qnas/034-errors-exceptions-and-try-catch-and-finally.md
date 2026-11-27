# 34 - Errors, exceptions, and try, catch, and finally - Q&A

Use these questions to review JavaScript errors, thrown values, and error handling. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which value is usually best to throw from application code?

A. A number  
B. A plain string  
C. An Error object  
D. An array

**Answer:** C. An Error object.

**Explanation:** Error objects provide a consistent message and error type, and can include a stack trace and a cause.

### 2. Which built-in error type commonly indicates that an operation received an unsuitable type?

A. RangeError  
B. TypeError  
C. SyntaxError  
D. URIError

**Answer:** B. TypeError.

**Explanation:** A TypeError is commonly produced when an operation cannot be performed with a value's type, such as calling a number as a function.

### 3. What does a catch block receive?

A. Always a string  
B. Always an Error object  
C. The value that was thrown  
D. The return value from try

**Answer:** C. The value that was thrown.

**Explanation:** JavaScript permits any value to be thrown. This is one reason code should prefer throwing Error objects.

### 4. What is the main purpose of a finally block?

A. To run code only if catch handles an error  
B. To run cleanup after try and catch complete  
C. To retry the try block automatically  
D. To turn every error into a warning

**Answer:** B. To run cleanup after try and catch complete.

**Explanation:** A finally block runs after normal completion or after an error is caught. Avoid returning or throwing from finally unless overriding an earlier result is intentional.

### 5. Which expression checks whether an error belongs to a particular error class?

A. error.typeof(TypeError)  
B. error === TypeError  
C. error instanceof TypeError  
D. TypeError.includes(error)

**Answer:** C. error instanceof TypeError.

**Explanation:** instanceof checks the object's prototype chain. It is more reliable for classification than comparing message text.

### 6. Which code allows a synchronous try/catch to handle a rejected Promise inside an async function?

A.
~~~js
try {
    loadData();
} catch (error) {
    handle(error);
}
~~~

B.
~~~js
try {
    await loadData();
} catch (error) {
    handle(error);
}
~~~

C.
~~~js
try {
    Promise.resolve(loadData());
} catch (error) {
    handle(error);
}
~~~

**Answer:** B.

**Explanation:** Awaiting the Promise inside the try block makes its rejection throw at that point. Starting a Promise without awaiting it does not make a later rejection synchronous.

### 7. Which error type is generally associated with a value outside an allowed range?

A. RangeError  
B. ReferenceError  
C. TypeError  
D. SyntaxError

**Answer:** A. RangeError.

**Explanation:** RangeError describes an argument or value that is outside the range an operation accepts.

### 8. What happens if no matching catch block handles a thrown error?

A. JavaScript silently ignores it  
B. The error propagates to a caller, and may become uncaught  
C. The nearest finally block converts it to null  
D. The program always retries the operation

**Answer:** B.

**Explanation:** JavaScript looks up the call stack for a handler. If none is found, the host reports an uncaught error.

## True or false

### 9. JavaScript only allows Error objects after throw.

**Answer:** False.

**Explanation:** JavaScript allows any value to be thrown. Error objects are recommended because they carry useful and consistent information.

### 10. A catch block can handle an error thrown by a function called inside its try block.

**Answer:** True.

**Explanation:** If that function does not catch the error itself, the error propagates to the caller's catch block.

### 11. A finally block runs only when an error occurs.

**Answer:** False.

**Explanation:** finally runs after the try and optional catch blocks whether the operation succeeds or throws.

### 12. Comparing the exact text of an error message is a dependable way to classify errors across JavaScript engines.

**Answer:** False.

**Explanation:** Error message wording can vary. Prefer instanceof with a known error type or a custom error class.

### 13. A synchronous try/catch automatically catches a rejection from every Promise created inside try.

**Answer:** False.

**Explanation:** A later Promise rejection is asynchronous. Await it inside try or attach a rejection handler.

### 14. If a catch block handles an error and completes normally, execution continues after the try/catch statement.

**Answer:** True.

**Explanation:** Handling the error allows execution to continue after the whole try/catch/finally statement, unless the handler returns or throws again.

### 15. An API must throw an error whenever an operation fails.

**Answer:** False.

**Explanation:** Some APIs report failure with values such as false, null, or a status object. Check the API's documented behavior.

### 16. A return statement inside finally can replace an error that was thrown in try.

**Answer:** True.

**Explanation:** An abrupt completion from finally can override an earlier completion. Avoid returning from finally in ordinary cleanup code.

## Predict the output

### 17. What does this code print?

~~~js
try {
    console.log("try");
} catch (error) {
    console.log("catch");
} finally {
    console.log("finally");
}
~~~

**Answer:**

~~~text
try
finally
~~~

**Explanation:** The try block completes normally, so catch is skipped. The finally block still runs.

### 18. What does this code print?

~~~js
try {
    throw new Error("Save failed.");
} catch (error) {
    console.log(error.message);
} finally {
    console.log("Cleanup");
}
~~~

**Answer:**

~~~text
Save failed.
Cleanup
~~~

**Explanation:** The thrown Error is handled by catch. After catch completes, finally runs.

### 19. What does this code print?

~~~js
function readValue() {
    throw new RangeError("Value is too large.");
}

try {
    readValue();
} catch (error) {
    console.log(error instanceof RangeError);
    console.log(error.message);
}
~~~

**Answer:**

~~~text
true
Value is too large.
~~~

**Explanation:** readValue does not catch its own error, so the error propagates to the caller's catch block.

### 20. What is the result of this code?

~~~js
function getValue() {
    try {
        return "try result";
    } finally {
        return "finally result";
    }
}

console.log(getValue());
~~~

**Answer:**

~~~text
finally result
~~~

**Explanation:** The return from finally overrides the return from try. This behavior is usually surprising, so do not return from finally in normal cleanup code.

### 21. What does this code print?

~~~js
try {
    JSON.parse("{ invalid }");
    console.log("parsed");
} catch (error) {
    console.log(error instanceof SyntaxError);
}
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** JSON.parse throws a SyntaxError for invalid JSON. The next statement in try is skipped.

### 22. What does this code print?

~~~js
try {
    throw "failed";
} catch (error) {
    console.log(typeof error);
}
~~~

**Answer:**

~~~text
string
~~~

**Explanation:** The catch parameter receives the exact thrown value. This example is legal, but production code should prefer an Error object.

## Short-answer questions

### 23. What is the difference between an error and an exception?

**Answer:** An error is a value describing a failure. An exception is a value being thrown to interrupt normal execution and transfer control to a handler.

**Explanation:** In everyday JavaScript discussions, people may use these words loosely, but this distinction helps explain throw and catch behavior.

### 24. What are the name and message properties of an Error used for?

**Answer:** name identifies the error category, and message provides a description of the specific failure.

**Explanation:** The message can help explain a problem, but exact wording should not usually control program logic.

### 25. What is error propagation?

**Answer:** It is the process by which a thrown value moves from the current function to its callers until a catch block handles it or the host reports it as uncaught.

**Explanation:** This lets a low-level function report a failure to a higher-level function that has enough context to respond.

### 26. When should a function rethrow an error?

**Answer:** When it cannot recover and the caller should decide how to handle the failure, or when it needs to add useful context while preserving the original cause.

**Explanation:** Catching and silently discarding an error hides a failure. Rethrow only where it helps another layer respond.

### 27. What is a custom error class useful for?

**Answer:** It gives an application-specific failure a distinct type that code can recognize with instanceof.

**Explanation:** Use a custom class when the distinct category improves handling. A standard Error is sufficient for many simple failures.

### 28. What does the cause option on Error provide?

**Answer:** It stores the lower-level error that led to a higher-level error.

**Explanation:** The outer error can explain the operation that failed, while cause preserves the original failure for diagnosis.

### 29. Why should a try block usually be focused?

**Answer:** A smaller try block makes it clearer which operations may fail and which failure the catch block is handling.

**Explanation:** A broad try block can accidentally catch unrelated errors from later statements and make recovery misleading.

### 30. What is the difference between an awaited and an unawaited Promise inside try?

**Answer:** If the Promise is awaited inside try, a rejection is thrown at the await expression and can be caught there. An unawaited Promise can reject later, after the synchronous try block has finished.

**Explanation:** Attach a rejection handler or await the Promise within try to handle its rejection.

### 31. What kind of code belongs in finally?

**Answer:** Cleanup or state-restoration code that must run after either success or failure.

**Explanation:** Do not use finally as a substitute for a catch block. It does not automatically handle or suppress an error.

### 32. Why might an API return false instead of throwing an error?

**Answer:** Failure may be an expected outcome that callers can check as part of normal control flow.

**Explanation:** Error handling depends on each API's design. Check the returned result as well as handling thrown exceptions.

## Coding questions

### 33. Write a function that rejects a negative price with a RangeError.

**Answer:**

~~~js
function calculateTax(price, rate) {
    if (price < 0) {
        throw new RangeError("Price cannot be negative.");
    }

    return price * rate;
}

try {
    console.log(calculateTax(-10, 0.1));
} catch (error) {
    console.log(error.message);
}
~~~

**Explanation:** The function validates its input and throws when it cannot produce a valid result. The caller handles the failure.

### 34. Create and catch a custom ValidationError.

**Answer:**

~~~js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

try {
    throw new ValidationError("Username is required.");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(error.message);
    } else {
        throw error;
    }
}
~~~

**Explanation:** The handler deals with the known validation problem and rethrows an unexpected error instead of hiding it.

### 35. Add cleanup that runs whether a task succeeds or fails.

**Answer:**

~~~js
try {
    console.log("Starting task");
    throw new Error("Task failed");
} catch (error) {
    console.log(error.message);
} finally {
    console.log("Task cleanup");
}
~~~

**Explanation:** finally runs after the catch block. It is a suitable place for cleanup that must happen in either case.

### 36. Show how an async function catches a rejected Promise.

**Answer:**

~~~js
async function readProfile() {
    try {
        const profile = await loadProfile();
        console.log(profile);
    } catch (error) {
        console.log("Profile could not be loaded:", error.message);
    }
}
~~~

**Explanation:** await is inside try, so a rejection from loadProfile is raised at the await expression and handled by catch.

## Key points

- Prefer throwing Error objects instead of strings or unrelated values.
- Use an appropriate error type and check it with instanceof when different failures need different handling.
- Errors move up the call stack until a handler catches them.
- Keep catch blocks useful and focused. Rethrow failures the current code cannot handle.
- Use finally for cleanup, and avoid return or throw there unless overriding earlier behavior is intentional.
- Await Promises inside try when catch should handle their rejections.
- Some APIs return failure values instead of throwing, so inspect their results too.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [33 - break, continue, and labels](../lessons/033-break-continue-and-labels.md) | [Open lesson](../lessons/034-errors-exceptions-and-try-catch-and-finally.md) | [Open example](../examples/034-errors-exceptions-and-try-catch-and-finally.md) | [35 - Debugging, stack traces, and breakpoints](../lessons/035-debugging-stack-traces-and-breakpoints.md) |
