# 12 - Hoisting and the temporal dead zone: Q&A

Use these questions to review how JavaScript prepares declarations, when bindings become initialized, and how to recognize Temporal Dead Zone errors. Each answer follows its question.

## Multiple-choice questions

### 1. What does "hoisting" describe?

A. The browser moving every statement to the top of a file  
B. JavaScript preparing declarations before evaluating statements in a scope  
C. The process of adding CSS to a page  
D. A function returning a value

**Answer: B.** Hoisting is a teaching term for declaration setup. JavaScript does not literally move source statements, and initializers still run in normal execution order.

### 2. What value can a **var** binding have before its initializer runs?

A. **null**  
B. **undefined**  
C. The value of the next statement  
D. It always throws a **ReferenceError**

**Answer: B.** The **var** binding is initialized to **undefined** during declaration setup. Its initializer runs later, when execution reaches the declaration.

### 3. What happens when a function declaration is called before its textual position in the same scope?

A. It can run because the function declaration is initialized during scope setup  
B. It always throws a **ReferenceError**  
C. It returns **undefined** without running  
D. It is converted to a function expression

**Answer: A.** A function declaration is available earlier in its scope. Its body runs when it is called.

### 4. Before this assignment runs, what does **typeof show** return?

~~~js
var show = function () {};
~~~

A. **"function"**  
B. **"undefined"**  
C. **"object"**  
D. It throws a **SyntaxError**

**Answer: B.** The **var** binding exists and initially contains **undefined**. The function expression is assigned only when execution reaches that line.

### 5. What error occurs when an uninitialized **let** binding is read in its TDZ?

A. **TypeError**  
B. **SyntaxError**  
C. **ReferenceError**  
D. No error

**Answer: C.** The binding exists but has not been initialized. Reading it before initialization throws a **ReferenceError**.

### 6. When does the TDZ for a lexical binding begin?

A. At the opening brace of the file  
B. When execution enters the scope that contains the binding  
C. Only after execution passes the declaration line  
D. When the page loads its first image

**Answer: B.** A lexical binding is in its TDZ from entry into its scope until its declaration initializes it.

### 7. What value does **let value;** have after execution reaches the declaration?

A. **null**  
B. **undefined**  
C. It remains uninitialized forever  
D. It throws a **TypeError**

**Answer: B.** A **let** declaration without an initializer is initialized to **undefined** when its declaration is evaluated. Before that point, it is in the TDZ.

### 8. What does **typeof missingName** return if no binding named **missingName** exists?

A. **"undefined"**  
B. **undefined**  
C. It always throws a **ReferenceError**  
D. **"null"**

**Answer: A.** **typeof** an undeclared name returns the string **"undefined"**.

### 9. What does **typeof laterName** do if **laterName** is a **let** binding that has not initialized yet?

A. Returns **"undefined"**  
B. Returns **"let"**  
C. Throws a **ReferenceError**  
D. Initializes the binding

**Answer: C.** The special behavior for an undeclared name does not bypass the TDZ of a declared but uninitialized lexical binding.

### 10. What happens when a **const** declaration has no initializer?

A. It is initialized to **undefined**  
B. It causes a **SyntaxError**  
C. It becomes a **var**  
D. It is initialized when first read

**Answer: B.** A **const** declaration must include an initializer.

### 11. Which statement describes a function expression assigned to **const**?

A. It is callable before the **const** declaration initializes  
B. The function value is created when execution reaches the assignment  
C. It is initialized to **undefined** at scope setup  
D. It behaves exactly like a function declaration

**Answer: B.** The binding is in the TDZ before initialization. When execution reaches the initializer, the function value is created and assigned.

### 12. What happens if a **var** function expression is called before its assignment?

A. The function runs normally  
B. The call attempts to invoke **undefined** and throws a **TypeError**  
C. A **SyntaxError** is always raised while parsing  
D. The function expression is automatically moved earlier

**Answer: B.** The **var** binding exists with the value **undefined**, which is not callable.

### 13. An outer scope has a binding named **color**. A nested block declares its own **const color**. Before the inner declaration initializes, which binding does the name inside the block resolve to?

A. The outer binding because it is already initialized  
B. The inner binding, which is in its TDZ  
C. Both bindings at once  
D. A new global binding

**Answer: B.** The inner declaration shadows the outer binding throughout its block, including the TDZ. Reading it before initialization throws a **ReferenceError**.

### 14. Which ordering is usually clearest for a variable declaration?

A. Read it, use it, then declare it at the bottom  
B. Declare and initialize it before its first use  
C. Declare every variable globally  
D. Use **typeof** to avoid initializing it

**Answer: B.** Declaring names before their first use makes execution order and dependencies easier to follow.

## True or false

### 15. Hoisting means that JavaScript physically moves source-code lines to the top.

**Answer: False.** The term describes how declarations and bindings are prepared. Initializers and ordinary statements still execute in source order.

### 16. A **var** initializer runs before the first statement in its scope.

**Answer: False.** The binding is initialized to **undefined** before statements run, but its initializer runs only when execution reaches the declaration.

### 17. A function declaration can normally be called before its textual declaration in the same scope.

**Answer: True.** Function declarations are initialized during scope setup.

### 18. A function expression assigned to **var** is callable before its assignment because function declarations are hoisted.

**Answer: False.** The **var** binding is **undefined** before assignment. The function expression is created when its initializer runs.

### 19. The TDZ starts at the declaration line and applies only to lines above it.

**Answer: False.** The TDZ starts when execution enters the scope containing the binding and ends when the binding initializes.

### 20. Reading a **let** binding in its TDZ throws a **ReferenceError**.

**Answer: True.** The binding exists but is not initialized yet.

### 21. **typeof** always avoids errors when its operand is a name.

**Answer: False.** **typeof** returns **"undefined"** for an undeclared name, but throws a **ReferenceError** for a lexical binding in its TDZ.

### 22. A **let** declaration without an initializer is initialized to **undefined** before execution enters its scope.

**Answer: False.** It becomes **undefined** when execution reaches the declaration. Before that it remains in the TDZ.

### 23. A **const** declaration may omit its initializer if it is assigned later.

**Answer: False.** A **const** declaration without an initializer is a syntax error.

### 24. A name declared by **const** in an inner block can shadow an outer binding before it is initialized.

**Answer: True.** The inner binding is the one resolved throughout the block. Before initialization, reading it throws instead of falling back to the outer binding.

## Predict the result

### 25. What does this code print?

~~~js
console.log(state);
var state = "ready";
console.log(state);
~~~

**Answer:**

~~~text
undefined
ready
~~~

The **var** binding starts as **undefined**. The assignment to **"ready"** happens at the declaration line.

### 26. What does this code print?

~~~js
callFirst();

function callFirst() {
  console.log("called");
}
~~~

**Answer:**

~~~text
called
~~~

The function declaration is available when the call runs, even though its source position comes later.

### 27. What does this code print?

~~~js
console.log(typeof display);
var display = function () {};
console.log(typeof display);
~~~

**Answer:**

~~~text
undefined
function
~~~

Before assignment, the **var** binding contains **undefined**. After the function expression is evaluated, the binding refers to a function.

### 28. What error occurs?

~~~js
runLater();

var runLater = function () {
  console.log("running");
};
~~~

**Answer:** A **TypeError** occurs because **runLater** is **undefined** at the time of the call. The function expression has not yet been assigned.

### 29. What error occurs?

~~~js
{
  console.log(item);
  let item = "book";
}
~~~

**Answer:** A **ReferenceError** occurs because **item** is in its TDZ when the first log runs. The TDZ begins at entry into the block.

### 30. What happens here?

~~~js
{
  console.log(typeof item);
  let item = "book";
}
~~~

**Answer:** It throws a **ReferenceError**. **item** is a declared lexical binding in its TDZ, so **typeof** does not return **"undefined"**.

### 31. What does this code print?

~~~js
{
  let item;
  console.log(item);
}
~~~

**Answer:**

~~~text
undefined
~~~

Execution reaches the **let item** declaration before the log. At that point the binding has been initialized to **undefined**.

### 32. What happens here?

~~~js
{
  const theme = "dark";
  console.log(theme);
}
~~~

**Answer:**

~~~text
dark
~~~

The **const** binding is read after its initializer has run. It is outside the TDZ.

### 33. What error occurs, and why?

~~~js
const value = "outer";

{
  console.log(value);
  const value = "inner";
}
~~~

**Answer:** A **ReferenceError** occurs. Inside the block, **value** resolves to the inner **const** binding. That binding shadows the outer one from the start of the block and is still in its TDZ at the log.

### 34. What happens when this code runs?

~~~js
const printStatus = () => console.log("ready");
printStatus();
~~~

**Answer:**

~~~text
ready
~~~

Execution initializes **printStatus** with the arrow function before the call. If the call appeared before the **const** declaration, it would throw a **ReferenceError** because the binding would still be in the TDZ.

## Short-answer questions

### 35. Why is "JavaScript moves declarations to the top" an incomplete explanation?

**Answer:** It can help predict some behavior, but no source lines are literally moved. Different declarations have different setup and initialization rules, and initializers still execute in source order.

### 36. Explain the difference between **undefined** from an early **var** read and a TDZ **ReferenceError**.

**Answer:** A **var** binding has already been initialized to **undefined**, so it can be read. A lexical binding in the TDZ exists but has not initialized, so reading it throws a **ReferenceError**.

### 37. Why does an inner lexical binding stop lookup from using an initialized outer binding?

**Answer:** Name resolution selects the nearest matching binding. The inner declaration shadows the outer one for the entire inner scope, including the interval before initialization.

### 38. What is the difference between a function declaration and a function expression for early calls?

**Answer:** A function declaration is initialized during scope setup and can be called earlier in its scope. A function expression is evaluated when execution reaches it, so its binding must first be initialized with that function value.

### 39. Why does **typeof missingName** behave differently from **typeof localName** in the TDZ?

**Answer:** **missingName** has no binding, so **typeof** returns **"undefined"**. **localName** has a lexical binding that exists but is uninitialized, so **typeof** throws a **ReferenceError**.

### 40. At what point does **let value;** become readable?

**Answer:** When execution reaches and evaluates the **let value** declaration. It is initialized to **undefined** at that point.

## Coding questions

### 41. Write a function declaration that can be called before its source position.

**Answer:**

~~~js
greet();

function greet() {
  console.log("Hello");
}
~~~

The function declaration is initialized during scope setup, so the call works.

### 42. Rewrite the following so it can be called before the variable assignment without an error.

~~~js
var announce = function () {
  console.log("Ready");
};

announce();
~~~

**Answer:**

~~~js
announce();

function announce() {
  console.log("Ready");
}
~~~

Changing the function expression to a function declaration makes the function available earlier in its scope.

### 43. Rewrite this so the binding is initialized before it is read.

~~~js
console.log(message);
let message = "Hello";
~~~

**Answer:**

~~~js
let message = "Hello";
console.log(message);
~~~

The read now happens after initialization, outside the TDZ.

### 44. Write a safe check that distinguishes an undeclared name from an initialized local **let** binding.

**Answer:**

~~~js
console.log(typeof nameNotDeclared); // "undefined"

{
  let nameDeclared = "ready";
  console.log(typeof nameDeclared); // "string"
}
~~~

Do not move the second **typeof** above the **let nameDeclared** line. It would throw a **ReferenceError** in the TDZ.

### 45. Write a function that uses a **var** binding before its assignment, then prints its assigned value.

**Answer:**

~~~js
function showState() {
  console.log(state);
  var state = "ready";
  console.log(state);
}

showState();
~~~

The first log prints **undefined** because the function-scoped **var** binding is initialized before execution. The assignment runs at the declaration line, so the second log prints **ready**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [11 - Scope: global, function, and block](../lessons/011-scope-global-function-and-block.md) | [Open lesson](../lessons/012-hoisting-and-the-temporal-dead-zone.md) | [Open example](../examples/012-hoisting-and-the-temporal-dead-zone.md) | [13 - Strict mode](../lessons/013-strict-mode.md) |