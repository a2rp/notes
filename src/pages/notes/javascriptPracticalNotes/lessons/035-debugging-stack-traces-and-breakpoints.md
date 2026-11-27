# 35 - Debugging, stack traces, and breakpoints

Debugging is the process of finding and correcting the cause of a problem. A useful debugging session is more than adding random log statements. First describe what should happen, reproduce what actually happens, then inspect the code and its values until you find where they first differ.

This chapter introduces a practical debugging workflow, stack traces, browser developer tools, breakpoints, and step-by-step execution.

## Start with a clear problem

Before changing code, describe the issue in concrete terms:

- What action did you take?
- What did you expect?
- What happened instead?
- Can you reproduce the same result?

For example: “When I apply a 20% discount to a price of 100, I expect 80, but the page shows 120.” This gives you a predictable case to investigate.

A reliable process is:

1. Reproduce the problem with a small, known input.
2. Read the complete error or note the unexpected result.
3. Find the code responsible for that operation.
4. Inspect the values immediately before the result becomes wrong.
5. Fix the cause, then repeat the same steps to confirm the result.

Do not make several unrelated changes at once. If the behavior changes, you want to know which change caused it.

## Read an error and its stack trace

A stack trace lists the sequence of function calls that led to a point in the program. Each entry is commonly called a **stack frame**. A frame can show a function name, source file, and line or column number.

For example, a trace might show calls in this order:

~~~text
TypeError: Cannot read properties of undefined
    at calculateTotal (cart.js:12)
    at buildCart (cart.js:28)
    at renderCart (page.js:7)
~~~

The top frame often identifies where the error was detected. The frames below it show callers that led there. Start with the first relevant frame in your own code, then follow the callers to understand why it received the value it did.

The exact layout and available details depend on the JavaScript host and developer tools. Bundled or minified code may show generated files instead of the source you wrote. When a project provides source maps, developer tools can often map generated code back to the original files.

A stack trace is a clue, not necessarily a complete explanation. A function may receive a bad value from an earlier call, so inspect both the failing operation and the code that provided its inputs.

## Use the browser developer tools

Browsers include developer tools for inspecting and debugging pages. In many browsers, you can open them from the browser menu or by right-clicking a page and choosing **Inspect**. Keyboard shortcuts vary by browser and operating system.

Two panels are especially useful:

- **Console** displays messages, errors, and warnings. You can also enter JavaScript expressions to inspect the current page.
- **Sources** or a similarly named debugger panel displays loaded source files, breakpoints, and paused execution.

Panel names and controls differ between browsers. The same debugging ideas apply: pause execution, inspect the current state, and resume or step through statements.

## Use console output carefully

Logging a value can help answer a focused question:

~~~js
function calculateDiscount(price, rate) {
    const discount = price * rate;
    console.log("price:", price, "rate:", rate, "discount:", discount);

    return price + discount;
}

console.log(calculateDiscount(100, 0.2));
~~~

Output:

~~~text
price: 100 rate: 0.2 discount: 20
120
~~~

The output reveals that the discount is being added. The intended calculation should subtract it:

~~~js
function calculateDiscount(price, rate) {
    const discount = price * rate;
    return price - discount;
}

console.log(calculateDiscount(100, 0.2));
~~~

Output:

~~~text
80
~~~

Use logs to inspect a particular value or decision. Logging every variable everywhere can make important messages harder to see and can produce a confusing picture if the same function runs many times.

Useful console methods include:

- **console.log()** for general values.
- **console.warn()** for a warning.
- **console.error()** for an error message.
- **console.table()** for a compact view of arrays of objects.
- **console.assert()** for logging a message when a condition is false. It does not throw an Error or stop the program.

For objects, log the object itself when you want to inspect its properties. Some developer consoles show a live object view, so its displayed properties may reflect later changes. To understand a particular moment, log the specific primitive values you need.

## Set a breakpoint

A **breakpoint** pauses execution at a chosen location so you can inspect what the program is doing. In browser developer tools, open a source file in the debugger panel and click beside the line number to set a line breakpoint.

When execution reaches that location, the debugger pauses before carrying out the selected statement. You can inspect variables and then decide whether to continue or step through the code.

Use a breakpoint near the point where the result becomes wrong. If you do not know the location, start earlier in the relevant function and follow the values toward the result.

### The debugger statement

The **debugger** statement requests a pause at that point when developer tools are attached:

~~~js
function calculateTotal(items) {
    let total = 0;

    for (const item of items) {
        debugger;
        total += item.price;
    }

    return total;
}
~~~

With a debugger attached, execution pauses inside the loop each time it reaches debugger. Without an active debugger, the statement generally has no visible effect.

Use debugger temporarily while investigating. Remove it before committing code unless a deliberate debugging hook is part of the project.

## Step through paused code

When execution is paused, the debugger commonly offers these controls:

- **Resume** continues until the next breakpoint or until the program finishes.
- **Step over** runs the current line and pauses at the next line without entering a called function.
- **Step into** enters the function called by the current line.
- **Step out** finishes the current function and pauses in its caller.

Use step over when you trust a function call and want to inspect what happens afterward. Use step into when the function itself may contain the cause. Use step out when you have finished inspecting the current function.

A source line can contain more than one operation. The exact stepping behavior depends on the debugger and the source being displayed, so keep lines simple when you need to inspect program flow.

## Inspect variables, scope, and the call stack

When paused, inspect the variables that explain the current decision:

- What values did the function receive?
- Which branch is about to run?
- Did a loop execute the expected number of times?
- Is the value undefined, null, empty, or a different type than expected?
- Did an earlier function modify the value?

The debugger's scope view typically shows local, closure, and global variables that are available at the current location. A watch expression lets you keep selected values visible as you step.

The call stack shows the active chain of function calls. Selecting a frame can take you to the caller's location and display its available scope. This helps trace how an incorrect input traveled through the program.

Inspect values without changing them at first. Most debuggers let you edit values while paused, but changing a value can hide the original problem or create a state that the real program never reaches.

## Choose a useful breakpoint

A regular line breakpoint pauses every time execution reaches that line. Other breakpoint options can help when a program runs repeatedly:

- A **conditional breakpoint** pauses only when a condition is true, such as when a loop index reaches a particular value.
- A **logpoint** writes selected values to the console without pausing the program.
- An **exception breakpoint** pauses when an error is thrown. Some tools let you choose caught exceptions, uncaught exceptions, or both.
- An **event breakpoint** pauses when a selected event, such as a click, runs a handler. Availability and controls depend on the developer tools.

For example, if a loop fails only for one item, a condition such as **index === 4** can pause at that iteration instead of stopping on every pass.

Remove or disable temporary breakpoints after the investigation. A forgotten breakpoint can make the page appear frozen the next time someone uses it.

## Debug an exception

When an exception occurs:

1. Read the error type and message.
2. Open the relevant source location from the console or stack trace.
3. Enable pause on exceptions if the debugger did not stop at the throw.
4. Inspect the value and call stack at the point where the error occurs.
5. Determine whether the value became invalid there or was already invalid when it arrived.
6. Fix the underlying cause, rather than merely hiding the error.

A catch block can make an exception disappear from the page while the application is still in a broken state. If an exception is caught, inspect the catch path too. Confirm that it handles the problem safely and leaves the application in a valid state.

## Debug asynchronous code

Asynchronous code can make it harder to see how one operation led to another. When an awaited operation fails, inspect both the code that started the operation and the code that handles its result.

Some developer tools display asynchronous call frames alongside the current stack. This can help connect an event handler, timer, or Promise callback to the code that runs later. The details vary between tools.

For an async function, place a breakpoint after **await** to inspect the value that was returned. Place another before await to inspect the input and the operation being started. If a Promise rejects, use the exception pause option or inspect the catch handler.

## Common debugging mistakes

- **Changing code before reproducing the issue:** You may remove the evidence needed to understand the failure.
- **Reading only the top line of a stack trace:** The caller frames can explain where a bad value came from.
- **Logging too many values:** Focus on values connected to the expected and actual result.
- **Inspecting only the final output:** Pause earlier to locate the first point where state becomes incorrect.
- **Fixing a symptom:** A fallback or catch block can hide the real bug if the invalid input still exists.
- **Changing debugger values too soon:** First observe the real program state. Edited values are useful experiments, not proof of the cause.
- **Leaving debugger statements or breakpoints active:** Remove temporary debugging aids when finished.
- **Assuming every browser has identical controls:** Learn the names and shortcuts in the browser you are using.

## Try it yourself

1. Copy the discount example and set a breakpoint on the calculation line.
2. Inspect price, rate, and discount before the return.
3. Change the addition to subtraction and repeat the same input.
4. Add a conditional breakpoint inside a loop so it pauses for only one item.
5. Throw an Error from a nested function and inspect the stack trace and call stack.
6. Add a temporary debugger statement, observe the pause, then remove it.

## Key points

- Reproduce the problem and state the expected and actual behavior before editing code.
- A stack trace shows the frames that led to a failure. Start with the relevant frame in your code and inspect its callers.
- Breakpoints pause execution so you can inspect real values and control flow.
- Step over, step into, and step out help you follow code at different levels.
- Conditional breakpoints, logpoints, and exception breakpoints help narrow an investigation.
- Console output is useful when it answers a specific question.
- Fix the underlying cause, repeat the original steps, and remove temporary debugging aids.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [34 - Errors, exceptions, and try, catch, and finally](034-errors-exceptions-and-try-catch-and-finally.md) | [Open Q&A](../qnas/035-debugging-stack-traces-and-breakpoints.md) | [Open example](../examples/035-debugging-stack-traces-and-breakpoints.md) | [36 - Function declarations and expressions](036-function-declarations-and-expressions.md) |
