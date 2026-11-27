# 35 - Debugging, stack traces, and breakpoints - Examples

These examples show how to inspect JavaScript behavior and narrow down bugs. Code is shown for learning and can be copied into a JavaScript file or browser console. For debugger controls, follow the short steps below each relevant snippet in your browser's developer tools.

## 1. Reproduce a calculation bug

### Question

What does this function return for a price of 100 and a discount rate of 0.2?

### Code

~~~js
function calculateDiscount(price, rate) {
    const discount = price * rate;
    return price + discount;
}

console.log(calculateDiscount(100, 0.2));
~~~

### Expected output

~~~text
120
~~~

### Explanation

The function calculates a discount of 20 but adds it to the price. Write down the expected result first: applying a 20% discount to 100 should produce 80. The repeatable input helps us investigate the calculation.

## 2. Set a breakpoint and fix the calculation

### Question

How can a breakpoint reveal and help fix the incorrect result?

### Code

~~~js
function calculateDiscount(price, rate) {
    const discount = price * rate;
    const finalPrice = price + discount;
    return finalPrice;
}

console.log(calculateDiscount(100, 0.2));
~~~

### Steps

1. Open the source file in the browser debugger.
2. Click beside the line that assigns finalPrice.
3. Run the function with the same input.
4. While paused, inspect price, rate, and discount.
5. Notice that the discount is 20 and the code adds it.
6. Change the addition to subtraction.

### Corrected code

~~~js
function calculateDiscount(price, rate) {
    const discount = price * rate;
    const finalPrice = price - discount;
    return finalPrice;
}

console.log(calculateDiscount(100, 0.2));
~~~

### Expected output

~~~text
80
~~~

### Explanation

The breakpoint pauses before the selected statement executes. Inspecting values at that point shows whether the problem is in the input or the calculation.

## 3. Log only the values needed

### Question

How can focused logging tell you whether the calculation's input is wrong?

### Code

~~~js
function calculateArea(width, height) {
    const area = width * height;

    console.log("width:", width);
    console.log("height:", height);
    console.log("area:", area);

    return area;
}

calculateArea(5, 4);
~~~

### Expected output

~~~text
width: 5
height: 4
area: 20
~~~

### Explanation

The logs answer a specific question about the inputs and result. If the displayed area is wrong, compare the values with the expected width and height.

## 4. Compare the expected and actual result

### Question

How can a clear comparison make a bug easier to recognize?

### Code

~~~js
function calculateTax(price, rate) {
    return price * rate;
}

const expected = 10;
const actual = calculateTax(100, 0.1);

console.log("expected:", expected);
console.log("actual:", actual);
console.log("matches:", actual === expected);
~~~

### Expected output

~~~text
expected: 10
actual: 10
matches: true
~~~

### Explanation

Printing the expected and actual values makes the check explicit. When investigating a failure, keep the same inputs so you can compare runs consistently.

## 5. Pause with the debugger statement

### Question

Where does execution pause when a debugger is attached?

### Code

~~~js
console.log("before");
debugger;
console.log("after");
~~~

### Expected behavior

The browser prints before, pauses at debugger, then prints after when you resume execution.

### Explanation

debugger requests a pause when developer tools are active. Remove temporary debugger statements when the investigation is done.

## 6. Follow values through a loop

### Question

How can you inspect which array item causes a bad total?

### Code

~~~js
const prices = [5, 10, -3, 8];
let total = 0;

for (const price of prices) {
    total += price;
    console.log("price:", price, "total:", total);
}
~~~

### Expected output

~~~text
price: 5 total: 5
price: 10 total: 15
price: -3 total: 12
price: 8 total: 20
~~~

### Explanation

The log shows the running total after each item. The negative value stands out and may reveal invalid input or an incorrect assumption about the data.

## 7. Pause on a specific loop item

### Question

How can a loop pause only when it reaches the item at index 3?

### Code

~~~js
const names = ["Asha", "Ravi", "Mina", "Dev"];

for (let index = 0; index < names.length; index += 1) {
    if (index === 3) {
        debugger;
    }

    console.log(index, names[index]);
}
~~~

### Expected behavior

With developer tools attached, execution pauses only when index is 3. After you resume, the loop prints all four index and name pairs.

### Explanation

The condition narrows the pause to one loop iteration. In a real debugging session, a conditional breakpoint can do this without editing the source.

## 8. Inspect a nested call stack

### Question

What is the call chain when showMessage calls buildMessage and buildMessage calls formatName?

### Code

~~~js
function formatName(name) {
    return name.toUpperCase();
}

function buildMessage(name) {
    return "Hello, " + formatName(name);
}

function showMessage(name) {
    console.log(buildMessage(name));
}

showMessage("Mina");
~~~

### Expected output

~~~text
Hello, MINA
~~~

### Explanation

Set a breakpoint inside formatName. The debugger's call stack should show formatName, buildMessage, and showMessage as active calls. Selecting a caller frame helps inspect where its argument came from.

## 9. Inspect an exception where it occurs

### Question

How can you pause on the line that throws an error, even when a catch block handles it?

### Code

~~~js
function findProduct(productId) {
    if (productId === "") {
        throw new Error("Product id is required.");
    }

    return { id: productId };
}

try {
    findProduct("");
} catch (error) {
    console.log("Handled:", error.message);
}
~~~

### Expected output

~~~text
Handled: Product id is required.
~~~

### Steps

1. Open the debugger's breakpoint options.
2. Enable pause on caught exceptions if the tool provides that option.
3. Run the function.
4. Inspect productId and the call stack at the throw.
5. Resume and observe the catch handler.

### Explanation

The exception is caught, but an exception breakpoint can still pause where it is thrown. This helps identify the invalid input and the code path that supplied it.

## 10. Inspect a branch condition

### Question

How can you determine why the wrong branch ran?

### Code

~~~js
function getShippingMessage(total) {
    if (total >= 50) {
        return "Free shipping";
    }

    return "Shipping fee applies";
}

console.log(getShippingMessage(45));
~~~

### Expected output

~~~text
Shipping fee applies
~~~

### Explanation

Set a breakpoint on the if statement and inspect total. If the value is not the amount you expected, move to the caller and inspect how it was calculated.

## 11. Step into a called function

### Question

How can you inspect the function responsible for calculating a value?

### Code

~~~js
function calculateSubtotal(prices) {
    let subtotal = 0;

    for (const price of prices) {
        subtotal += price;
    }

    return subtotal;
}

function addTax(prices, taxRate) {
    const subtotal = calculateSubtotal(prices);
    return subtotal + subtotal * taxRate;
}

console.log(addTax([10, 20], 0.1));
~~~

### Expected output

~~~text
33
~~~

### Steps

1. Set a breakpoint on the line that calls calculateSubtotal.
2. When paused, choose Step into.
3. Inspect prices and subtotal inside calculateSubtotal.
4. Use Step out to return to addTax after inspecting the loop.

### Explanation

Step into enters the called function. Step out finishes the current function and returns to the caller's next location.

## 12. Use step over when the called function is trusted

### Question

How can you inspect a result without entering the function that produced it?

### Code

~~~js
function getGreeting(name) {
    return "Hello, " + name;
}

const greeting = getGreeting("Asha");
console.log(greeting);
~~~

### Expected output

~~~text
Hello, Asha
~~~

### Steps

1. Set a breakpoint on the call to getGreeting.
2. When paused, choose Step over.
3. Inspect greeting on the next line.

### Explanation

Step over runs the function call and pauses afterward without stepping into its body. This is useful when you trust the helper and only need to inspect its result.

## 13. Add a logpoint without changing source code

### Question

How can you observe each item processed by this loop without pausing or adding a log statement?

### Code

~~~js
function processItem(item) {
    return item.toUpperCase();
}

const items = ["book", "pen", "bag"];

for (const item of items) {
    processItem(item);
}
~~~

### Steps

1. Open this file in the browser debugger.
2. Right-click beside the processItem line.
3. Add a logpoint with the expression **"Processing: " + item**.
4. Run the loop.

### Expected logpoint output

~~~text
Processing: book
Processing: pen
Processing: bag
~~~

### Explanation

A logpoint evaluates an expression and writes its value to the console while execution continues. It does not add a permanent console.log to the file.

## 14. Compare actual data with the function's assumption

### Question

How can you find out why a function receives a missing value?

### Code

~~~js
function printUser(user) {
    console.log("user:", user);
    console.log("name:", user.name);
}

function showPage() {
    const selectedUser = undefined;
    printUser(selectedUser);
}

try {
    showPage();
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
user: undefined
TypeError
~~~

### Explanation

The focused log reveals that printUser received undefined. Set a breakpoint in showPage and inspect selectedUser to find why the caller did not provide a user.

## 15. Inspect values before and after await

### Question

How can you debug the value returned by an asynchronous operation?

### Code

~~~js
function loadScore() {
    return Promise.resolve(42);
}

async function showScore() {
    const promise = loadScore();
    console.log("Request started");

    const score = await promise;
    console.log("Score:", score);
}

showScore();
~~~

### Expected output

~~~text
Request started
Score: 42
~~~

### Steps

1. Set one breakpoint before await and inspect promise.
2. Set another breakpoint after await and inspect score.
3. Resume execution between the two pauses.

### Explanation

The first pause shows the Promise created by the operation. The second shows its resolved value. Developer tools may also show asynchronous call frames that connect the later execution to its earlier caller.

## 16. Use a watch expression while stepping

### Question

How can you keep track of the running total while stepping through a loop?

### Code

~~~js
const values = [2, 4, 6];
let total = 0;

for (const value of values) {
    total += value;
}
~~~

### Steps

1. Set a breakpoint on the line that updates total.
2. Add total and value to the debugger's watch list.
3. Step over the update line.
4. Compare the values on each iteration.

### Expected values

The total progresses from 0 to 2, then 6, then 12. On each pause before the update, value is the current item and total is the previous running total.

### Explanation

A watch expression keeps selected values visible while execution advances. Inspect the actual values before editing them in the debugger.

## 17. Inspect a caught error

### Question

How can the catch block help you understand an error without relying on its full message text?

### Code

~~~js
try {
    null.toString();
} catch (error) {
    console.log("type error:", error instanceof TypeError);
    console.log("message exists:", error.message.length > 0);
}
~~~

### Expected output

~~~text
type error: true
message exists: true
~~~

### Explanation

The code checks the error type and confirms a message is present. The exact engine-provided wording is not part of the expected output.

## 18. Remove temporary debugging code

### Question

What should the final function look like after using a temporary log to locate a problem?

### Code

~~~js
function calculateTotal(prices) {
    let total = 0;

    for (const price of prices) {
        total += price;
    }

    return total;
}

console.log(calculateTotal([5, 10, 15]));
~~~

### Expected output

~~~text
30
~~~

### Explanation

The final code no longer contains the temporary debugger statement or diagnostic log. Keep useful application logging only when it has a clear purpose.

## 19. Turn a bug report into a repeatable check

### Question

How can you keep the original failing case clear while investigating?

### Code

~~~js
function calculateDiscount(price, rate) {
    return price - price * rate;
}

const price = 100;
const rate = 0.2;
const expected = 80;
const actual = calculateDiscount(price, rate);

console.log("input:", price, rate);
console.log("expected:", expected);
console.log("actual:", actual);
console.log("fixed:", actual === expected);
~~~

### Expected output

~~~text
input: 100 0.2
expected: 80
actual: 80
fixed: true
~~~

### Explanation

The same input and expected result make the investigation repeatable. After making a fix, repeat this case to confirm the behavior.

## 20. Follow an error from caller to failing function

### Question

How can you trace the value that caused an error through multiple functions?

### Code

~~~js
function readName(user) {
    return user.name.toUpperCase();
}

function buildGreeting(user) {
    return "Hello, " + readName(user);
}

function renderGreeting(user) {
    return buildGreeting(user);
}

try {
    renderGreeting(undefined);
} catch (error) {
    console.log(error.name);
}
~~~

### Expected output

~~~text
TypeError
~~~

### Steps

1. Inspect the stack trace and locate readName.
2. Set a breakpoint in readName before accessing user.name.
3. Inspect user and confirm it is undefined.
4. Select buildGreeting and renderGreeting in the call stack to trace the value to its caller.
5. Fix the caller or validate the input at the correct boundary.

### Explanation

The failing property access is in readName, but the root cause is that renderGreeting supplied undefined. The call stack shows this path.

## Key points

- Keep a small, repeatable input for the bug.
- Pause near the first incorrect value and inspect it before changing anything.
- Use the call stack to trace inputs through callers.
- Choose breakpoints, logpoints, or console logs based on what you need to observe.
- Confirm the fix with the same input and remove temporary debugging aids.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [34 - Errors, exceptions, and try, catch, and finally](../lessons/034-errors-exceptions-and-try-catch-and-finally.md) | [Open lesson](../lessons/035-debugging-stack-traces-and-breakpoints.md) | [Open Q&A](../qnas/035-debugging-stack-traces-and-breakpoints.md) | [36 - Function declarations and expressions](../lessons/036-function-declarations-and-expressions.md) |

