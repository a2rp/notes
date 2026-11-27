# 36 - Function declarations and expressions - Q&A

Use these questions to review how JavaScript function declarations and expressions are defined, named, and called. Each answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. Which snippet is a function declaration?

A.
~~~js
const greet = function () {};
~~~

B.
~~~js
function greet() {}
~~~

C.
~~~js
const greet = greet();
~~~

D.
~~~js
greet;
~~~

**Answer:** B.

**Explanation:** A function declaration begins with the function keyword and a function name. The other examples are expressions or references.

### 2. Which snippet creates a function expression and assigns it to a const binding?

A.
~~~js
function showMessage() {}
~~~

B.
~~~js
const showMessage = function () {};
~~~

C.
~~~js
showMessage();
~~~

D.
~~~js
const showMessage = "function";
~~~

**Answer:** B.

**Explanation:** The function expression on the right creates a function value, which is assigned to showMessage.

### 3. What does a call expression do?

A. Stores a function without running it  
B. Runs a function  
C. Changes a function declaration into an expression  
D. Gives a function a name

**Answer:** B.

**Explanation:** Parentheses after a callable binding invoke the function. A reference without parentheses does not run the body.

### 4. Which code can call the function before its declaration appears in the source text?

A.
~~~js
greet();

function greet() {}
~~~

B.
~~~js
greet();

const greet = function () {};
~~~

C.
~~~js
greet;

const greet = function () {};
~~~

D. Neither A nor B

**Answer:** A.

**Explanation:** A function declaration is initialized before statements in its enclosing scope execute. A const function expression is not initialized until execution reaches its initializer.

### 5. What is an anonymous function expression?

A. A function that cannot be called  
B. A function expression with no explicit name  
C. A function declaration inside a loop  
D. A function that runs only once

**Answer:** B.

**Explanation:** An anonymous function expression omits a name after the function keyword. When assigned to a variable, JavaScript can infer a useful name for diagnostics.

### 6. Where can the explicit name of a named function expression be used?

A. Only inside the function expression's body  
B. Everywhere in the outer file  
C. Only in the browser console  
D. Only before the expression is initialized

**Answer:** A.

**Explanation:** The explicit name belongs to the function's internal name binding. The outer variable is used to call the function from surrounding code.

### 7. What does const prevent in this code?

~~~js
const showMessage = function () {};
~~~

A. Calling the function  
B. Reassigning the showMessage binding  
C. Inspecting its name  
D. The function expression from being created

**Answer:** B.

**Explanation:** const prevents the binding from being reassigned. It does not freeze the function object or make the function body immutable.

### 8. What is the type reported by typeof for a function value?

A. object  
B. callable  
C. function  
D. method

**Answer:** C. function.

**Explanation:** JavaScript reports function values with the typeof result "function".

## True or false

### 9. Writing a function declaration immediately runs its body.

**Answer:** False.

**Explanation:** A declaration defines a function. Its body runs when code calls it.

### 10. Writing a function name without parentheses calls that function.

**Answer:** False.

**Explanation:** The name by itself refers to the function value. Add parentheses to invoke it.

### 11. A function expression can be assigned to a variable.

**Answer:** True.

**Explanation:** Creating a function as part of an expression allows it to be stored in a binding or used in another expression.

### 12. A const function expression can be called before its initializer executes.

**Answer:** False.

**Explanation:** A const binding is not initialized until execution reaches its declaration. An earlier access throws a ReferenceError.

### 13. A named function expression's inner name creates a second outer binding.

**Answer:** False.

**Explanation:** Its explicit name is available inside the function body. Use the variable binding to access the function from outside.

### 14. Assigning a function value to another const automatically executes it.

**Answer:** False.

**Explanation:** Assignment stores the same function value in another binding. The function runs only when called.

### 15. A function declaration can be nested inside another function.

**Answer:** True.

**Explanation:** This is a way to keep a helper declaration within the enclosing function's scope.

### 16. A const function expression and a function declaration have the same availability before their source locations.

**Answer:** False.

**Explanation:** Function declarations are initialized before statements in their scope execute. A const function expression is initialized at its declaration.

### 17. The semicolon after a const function expression ends the const declaration.

**Answer:** True.

**Explanation:** The function expression is the initializer of a const declaration. The semicolon terminates that declaration.

## Predict the output

### 18. What does this code print?

~~~js
function greet() {
    console.log("Hello");
}

console.log("Ready");
greet();
~~~

**Answer:**

~~~text
Ready
Hello
~~~

**Explanation:** The declaration does not execute its body. The call runs it after Ready is printed.

### 19. What does this code print?

~~~js
sayHello();

function sayHello() {
    console.log("Hello");
}
~~~

**Answer:**

~~~text
Hello
~~~

**Explanation:** The function declaration is initialized before statements in the scope run, so the earlier call succeeds.

### 20. What does this code print?

~~~js
const greet = function () {
    console.log("Welcome");
};

greet();
~~~

**Answer:**

~~~text
Welcome
~~~

**Explanation:** The expression creates the function and assigns it to greet. The call after initialization runs its body.

### 21. What does this code print?

~~~js
const greet = function () {
    console.log("Welcome");
};

console.log(typeof greet);
~~~

**Answer:**

~~~text
function
~~~

**Explanation:** greet refers to a function value. It is not called in this code, so Welcome is not printed.

### 22. What does this code print?

~~~js
const show = function displayMessage() {
    console.log("Shown");
};

console.log(show.name);
show();
~~~

**Answer:**

~~~text
displayMessage
Shown
~~~

**Explanation:** The explicitly named function expression has the name displayMessage. The outer binding show is used to call it.

### 23. What error occurs when this code runs?

~~~js
runTask();

const runTask = function () {
    console.log("Task");
};
~~~

**Answer:** A ReferenceError occurs before the function body runs.

**Explanation:** runTask is a const binding that has not been initialized at the earlier call.

### 24. What does this code print?

~~~js
const first = function () {
    console.log("One function value");
};

const second = first;

console.log(typeof second);
second();
~~~

**Answer:**

~~~text
function
One function value
~~~

**Explanation:** The function value is assigned to both bindings. The assignment itself does not run it, but second() does.

### 25. What does this code print?

~~~js
function createMessage() {
    function getName() {
        return "Ravi";
    }

    return "Hello, " + getName();
}

console.log(createMessage());
~~~

**Answer:**

~~~text
Hello, Ravi
~~~

**Explanation:** Calling createMessage runs its body, which calls the nested declaration getName and uses its result.

## Short-answer questions

### 26. What is the main syntax difference between a function declaration and a function expression?

**Answer:** A function declaration is written as a named declaration in statement position. A function expression creates a function value as part of an expression, such as the initializer of a variable.

**Explanation:** The distinction helps identify where the function is declared and when its binding becomes available.

### 27. What does it mean to call a function?

**Answer:** It means to execute the function by writing a callable reference followed by parentheses.

**Explanation:** A declaration or expression defines the function. The call expression runs its body.

### 28. What does hoisting mean for function declarations in this chapter?

**Answer:** The function declaration is initialized before statements in its enclosing scope execute, so it can be called before its textual position.

**Explanation:** This is a description of observable behavior, not a recommendation to place every call before its definition.

### 29. Why can an earlier call to a const function expression fail?

**Answer:** The const binding has not been initialized until execution reaches the declaration.

**Explanation:** Accessing that binding earlier throws a ReferenceError. Put the call after the initializer or use a declaration when earlier availability is needed.

### 30. Why might you choose a named function expression?

**Answer:** Its explicit name can improve diagnostics and can be used inside its own body.

**Explanation:** The name can make a stack trace clearer. The outer code still uses the variable holding the function.

### 31. When is a function declaration a reasonable choice?

**Answer:** When a named operation belongs directly in the surrounding scope or when it should be available throughout that scope.

**Explanation:** A declaration communicates that the function is a named part of that scope.

### 32. When is a function expression a reasonable choice?

**Answer:** When a function needs to be stored in a variable or placed where an expression is expected.

**Explanation:** The expression produces a value that can be assigned or used in a larger expression. Later chapters cover passing function values as callbacks.

### 33. Why is a descriptive function name helpful?

**Answer:** It makes calls easier to understand and can make debugging output more informative.

**Explanation:** Names such as calculateTotal reveal intent more clearly than vague names such as doThing.

### 34. Does const make a function immutable?

**Answer:** No. It prevents reassignment of the binding, but does not freeze the function object.

**Explanation:** Binding reassignment and object immutability are different concepts.

## Coding questions

### 35. Write a function declaration named printStatus and call it.

**Answer:**

~~~js
function printStatus() {
    console.log("Ready");
}

printStatus();
~~~

**Explanation:** The declaration defines printStatus. The call runs the body and prints Ready.

### 36. Rewrite printStatus as a function expression assigned to a const.

**Answer:**

~~~js
const printStatus = function () {
    console.log("Ready");
};

printStatus();
~~~

**Explanation:** The expression creates a function value and stores it in printStatus. The call runs it after initialization.

### 37. Write a named function expression assigned to a const.

**Answer:**

~~~js
const showNotice = function displayNotice() {
    console.log("Saved");
};

showNotice();
~~~

**Explanation:** showNotice is the outer binding used to call the function. displayNotice is the function expression's explicit internal name.

### 38. Does this function declaration work when called before its source location?

~~~js
printMessage();

function printMessage() {
    console.log("Message");
}
~~~

**Answer:** Yes. It prints:

~~~text
Message
~~~

**Explanation:** Function declarations are initialized before the statements in their enclosing scope execute.

### 39. Fix this code so the function expression is called after initialization.

~~~js
showMessage();

const showMessage = function () {
    console.log("Shown");
};
~~~

**Answer:**

~~~js
const showMessage = function () {
    console.log("Shown");
};

showMessage();
~~~

**Explanation:** Move the call below the const initializer so the binding is initialized before it is accessed.

### 40. Assign one function expression to two bindings. Does either assignment run it?

**Answer:**

~~~js
const first = function () {
    console.log("Running");
};

const second = first;

console.log("Assigned");
second();
~~~

Output:

~~~text
Assigned
Running
~~~

**Explanation:** Assignment only stores the function value. The call second() runs the body.

## Key points

- A function declaration defines a named function in statement position.
- A function expression creates a function value inside an expression.
- Parentheses call a function. A reference without parentheses does not run it.
- Function declarations are available before their source location in their enclosing scope.
- A const function expression must be initialized before it is accessed.
- A named function expression's inner name is not an outer binding.
- const prevents rebinding, not mutation of the function object.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [35 - Debugging, stack traces, and breakpoints](../lessons/035-debugging-stack-traces-and-breakpoints.md) | [Open lesson](../lessons/036-function-declarations-and-expressions.md) | [Open example](../examples/036-function-declarations-and-expressions.md) | [37 - Parameters, default values, rest, and arguments](../lessons/037-parameters-default-values-rest-and-arguments.md) |

