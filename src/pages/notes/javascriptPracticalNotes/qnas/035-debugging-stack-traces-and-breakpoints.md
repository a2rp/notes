# 35 - Debugging, stack traces, and breakpoints - Q&A

Use these questions to review a practical JavaScript debugging workflow. Each answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. What should you do before changing code to fix a bug?

A. Rename every variable  
B. Reproduce the problem and describe the expected and actual behavior  
C. Add console.log to every line  
D. Delete the stack trace

**Answer:** B. Reproduce the problem and describe the expected and actual behavior.

**Explanation:** A reliable reproduction gives you a known case to investigate and a way to check whether a later change fixed the issue.

### 2. What does a stack trace generally show?

A. Every variable in the program  
B. The chain of function calls leading to a point in the program  
C. Only the last line of the file  
D. A list of all breakpoints

**Answer:** B.

**Explanation:** A stack trace is a sequence of stack frames. It often includes function names and source locations, which help trace where a failure occurred and how execution got there.

### 3. What does a line breakpoint do?

A. Deletes the current line  
B. Pauses execution when the program reaches a selected source location  
C. Runs the current function twice  
D. Converts an error to a warning

**Answer:** B.

**Explanation:** A breakpoint lets you inspect the program state at a specific location before continuing execution.

### 4. Which debugger command runs the current line without entering a called function?

A. Resume  
B. Step into  
C. Step over  
D. Step out

**Answer:** C. Step over.

**Explanation:** Step over executes the current line and pauses at the next line. Step into enters a function call on the current line.

### 5. Which debugger command enters a function called on the current line?

A. Step into  
B. Step out  
C. Resume  
D. Disable

**Answer:** A. Step into.

**Explanation:** Step into lets you inspect the called function's statements and values.

### 6. Which debugger command finishes the current function and pauses in its caller?

A. Step over  
B. Step out  
C. Resume  
D. Restart

**Answer:** B. Step out.

**Explanation:** Step out is useful after you have finished inspecting the current function.

### 7. What is a conditional breakpoint useful for?

A. Pausing only when a specified condition is true  
B. Changing the source code automatically  
C. Catching every Promise rejection without configuration  
D. Showing every variable in the application

**Answer:** A.

**Explanation:** A condition can make a breakpoint pause only on a relevant loop iteration or input value.

### 8. What does a logpoint usually do?

A. Pauses the program until a key is pressed  
B. Logs selected information without pausing execution  
C. Changes a variable to a string  
D. Removes a stack frame

**Answer:** B.

**Explanation:** A logpoint can inspect values in the console without adding a permanent console.log statement to the source.

### 9. What does a debugger's call stack help you inspect?

A. How function calls led to the current paused location  
B. The repository's commit history  
C. All browser cookies  
D. The CSS cascade

**Answer:** A.

**Explanation:** Selecting a stack frame can show the caller's source location and the variables available there.

### 10. What does the debugger statement request?

A. A syntax check  
B. A pause at that location when a debugger is attached  
C. An exception to be thrown  
D. A function to be called twice

**Answer:** B.

**Explanation:** With developer tools attached, execution can pause at debugger. Without an active debugger, the statement generally has no visible effect.

### 11. What is the main purpose of a watch expression?

A. Keep selected values visible while stepping through paused code  
B. Add an event listener to a page  
C. Record every keyboard press  
D. Rewrite an Error object's message

**Answer:** A.

**Explanation:** A watch expression is helpful when one or more values need to be checked repeatedly as code runs.

### 12. What can an exception breakpoint do?

A. Pause when an error is thrown  
B. Catch every error and return null  
C. Prevent all errors from occurring  
D. Automatically repair the source code

**Answer:** A.

**Explanation:** Many developer tools can pause on caught exceptions, uncaught exceptions, or both. The exact controls vary.

## True or false

### 13. The top frame of a stack trace always explains the root cause of a bug.

**Answer:** False.

**Explanation:** The top frame often shows where the error was detected, but an earlier caller may have provided an invalid value. Inspect relevant callers too.

### 14. You should change paused variables immediately to make the output look correct.

**Answer:** False.

**Explanation:** First inspect the actual program state. Editing values can be useful as an experiment, but it does not prove the program naturally reaches that state.

### 15. Step over normally enters a function called on the current line.

**Answer:** False.

**Explanation:** Step over runs the call without entering it. Use step into to inspect the called function.

### 16. A debugger statement is visible as a pause when developer tools are attached.

**Answer:** True.

**Explanation:** It requests a debugger pause at that point. The statement is usually inert when no debugger is active.

### 17. Logging many unrelated values always makes debugging faster.

**Answer:** False.

**Explanation:** Excessive logs make important information harder to find. Log values that answer a specific question.

### 18. The exact layout of a stack trace is the same in every JavaScript host.

**Answer:** False.

**Explanation:** Stack trace presentation depends on the host and developer tools. Use the file and frame information available in the current environment.

### 19. A conditional breakpoint can help investigate a loop that fails only for one item.

**Answer:** True.

**Explanation:** A condition can pause only when the loop index or item matches the case you need to inspect.

### 20. Once catch handles an exception, the application must be in a correct state.

**Answer:** False.

**Explanation:** Catching an error only changes control flow. Inspect the recovery path to ensure it leaves the application in a safe and useful state.

### 21. Browser developer tools all use identical names and shortcuts.

**Answer:** False.

**Explanation:** Panels, keyboard shortcuts, and some debugger controls differ. The underlying ideas are similar.

### 22. A source map may help developer tools show original source for bundled code.

**Answer:** True.

**Explanation:** Source maps connect generated output to the original files, when the project provides them and the tools can use them.

## Predict the output

### 23. What is the result of this calculation?

~~~js
function calculateDiscount(price, rate) {
    const discount = price * rate;
    return price + discount;
}

console.log(calculateDiscount(100, 0.2));
~~~

**Answer:**

~~~text
120
~~~

**Explanation:** The function adds the discount to the price. If the goal is a 20% discount, it should subtract the discount and return 80. A breakpoint or focused log can reveal the incorrect intermediate values.

### 24. What does this code print?

~~~js
const values = [3, 6];

console.log("values:", values);
console.log("count:", values.length);
~~~

**Answer:**

~~~text
values: [3, 6]
count: 2
~~~

**Explanation:** The first log displays the array and the second logs its length. In developer consoles, objects may be shown as live views, so log specific primitive values when you need a snapshot.

### 25. What does the JavaScript code print when a debugger is attached and execution resumes?

~~~js
console.log("before");
debugger;
console.log("after");
~~~

**Answer:**

~~~text
before
after
~~~

**Explanation:** debugger pauses between the two calls when an active debugger honors the statement. After resuming, execution continues and prints after. With no debugger attached, the code continues without a visible pause.

### 26. What does this code print?

~~~js
function first() {
    second();
}

function second() {
    console.log("Paused inside second");
}

first();
~~~

**Answer:**

~~~text
Paused inside second
~~~

**Explanation:** If a breakpoint is set on the console.log line, the call stack includes second and first. The stack helps show how execution reached the paused line.

## Short-answer questions

### 27. What is the difference between expected behavior and actual behavior?

**Answer:** Expected behavior is what the program should do for a given action and input. Actual behavior is what it really does.

**Explanation:** Writing down both makes the bug specific and gives you a clear result to check after making a fix.

### 28. What is a stack frame?

**Answer:** A stack frame is one entry in the chain of active function calls.

**Explanation:** A frame often identifies a function and a source location. Together, frames help explain the path to the current line or error.

### 29. Why inspect a caller when the top stack frame shows the failing line?

**Answer:** The caller may have passed the value that caused the failing operation.

**Explanation:** The line where an invalid value is used is not always the place where that value became invalid.

### 30. What can you inspect when a debugger pauses?

**Answer:** Local variables, closure and global values, the call stack, and the next statement or branch.

**Explanation:** These details show the real state and control flow at that point in execution.

### 31. When should you use step into instead of step over?

**Answer:** Use step into when the called function may contain the cause and you need to inspect its execution.

**Explanation:** Step over is better when you trust the call and only need to see what happens after it returns.

### 32. What is the difference between a breakpoint and a logpoint?

**Answer:** A breakpoint pauses execution for inspection. A logpoint writes information to the console and normally lets execution continue.

**Explanation:** Use a breakpoint to inspect state interactively. Use a logpoint when you want to observe values without stopping repeatedly.

### 33. Why is console.assert not a replacement for throw?

**Answer:** console.assert reports a failed condition to the console, but it does not throw an Error or stop the program.

**Explanation:** Use throw when failure should interrupt normal control flow. Use console.assert as a diagnostic message.

### 34. Why might a stack trace point to generated code?

**Answer:** A build tool may bundle or minify the original source into generated output.

**Explanation:** If source maps are available and loaded, developer tools may map locations back to the original files.

### 35. What should you do after finding a fix?

**Answer:** Repeat the original reproduction steps, confirm the expected result, and remove temporary logs, debugger statements, and breakpoints.

**Explanation:** Repeating the same case checks the fix against the bug. Removing temporary debugging aids prevents unexpected pauses or noisy output later.

### 36. Why should you inspect state before editing it in the debugger?

**Answer:** Editing a value can create a state that the real application never produced and can hide the original cause.

**Explanation:** First observe and record the actual values. Then, if useful, edit a value as a separate experiment.

## Coding and investigation questions

### 37. Fix the discount calculation so 100 with a rate of 0.2 returns 80.

**Answer:**

~~~js
function calculateDiscount(price, rate) {
    const discount = price * rate;
    return price - discount;
}

console.log(calculateDiscount(100, 0.2));
~~~

~~~text
80
~~~

**Explanation:** A focused inspection shows the discount amount is 20. Subtracting it from 100 gives the expected result.

### 38. Add a log that shows the values needed to diagnose this calculation.

~~~js
function calculateArea(width, height) {
    return width * height;
}
~~~

**Answer:**

~~~js
function calculateArea(width, height) {
    const area = width * height;
    console.log("width:", width, "height:", height, "area:", area);
    return area;
}
~~~

**Explanation:** The log focuses on the inputs and computed result. If the area is wrong, these values help distinguish incorrect input from incorrect calculation.

### 39. Add a condition so this loop pauses only when index is 4.

~~~js
for (let index = 0; index < items.length; index += 1) {
    processItem(items[index]);
}
~~~

**Answer:** Set a conditional breakpoint on the loop body with the condition **index === 4**.

**Explanation:** The debugger evaluates the condition as execution reaches the breakpoint. It pauses only when the condition is true. A browser's developer tools may use slightly different controls for setting this condition.

### 40. How would you investigate an error thrown by a deeply nested function?

**Answer:**

1. Read the error type, message, and stack trace.
2. Pause on exceptions if the debugger did not stop at the throw.
3. Inspect the first relevant frame in your own code.
4. Check the values used on the failing line.
5. Move through the call stack to see where those values came from.
6. Fix the first incorrect assumption or input, then reproduce the same case again.

**Explanation:** This approach follows the error from where it appears toward the point where the program first becomes incorrect.

### 41. A function works for most array items but fails on one. What debugging tools can narrow it down?

**Answer:** A conditional breakpoint, a logpoint, or a focused console log that includes the current item and index.

**Explanation:** Each method filters attention to the relevant iteration. A conditional breakpoint pauses for inspection, while a logpoint records values without pausing.

### 42. An exception is caught, but the page still shows stale data. What should you inspect?

**Answer:** Inspect the catch block and the state it leaves behind. Check whether it reports the problem, clears or preserves data intentionally, and prevents later code from treating invalid state as valid.

**Explanation:** Catching an exception does not automatically repair state. The recovery path must be correct for the application.

## Key points

- Reproduce the issue and compare expected behavior with actual behavior.
- Use the stack trace and call stack to follow execution through callers.
- Pause before the first incorrect result and inspect the real values.
- Choose step over, step into, and step out based on what you need to inspect.
- Use conditional breakpoints and logpoints to focus on a relevant case.
- Verify the fix with the original steps and remove temporary debugging aids.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [34 - Errors, exceptions, and try, catch, and finally](../lessons/034-errors-exceptions-and-try-catch-and-finally.md) | [Open lesson](../lessons/035-debugging-stack-traces-and-breakpoints.md) | [Open example](../examples/035-debugging-stack-traces-and-breakpoints.md) | [36 - Function declarations and expressions](../lessons/036-function-declarations-and-expressions.md) |
