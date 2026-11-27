# 12 - Hoisting and the temporal dead zone

JavaScript creates bindings for declarations as it prepares a scope, before it runs the statements in that scope. This behavior is often described as **hoisting**, but JavaScript does not literally move source code to the top.

Different declarations are prepared and initialized differently:

- A **var** binding is initialized to **undefined** before its assignment runs.
- A function declaration is available before its position in the source code.
- A **let**, **const**, or class binding exists in its scope but stays uninitialized until execution reaches its declaration.
- Reading an uninitialized lexical binding throws a **ReferenceError**. The interval before initialization is the **Temporal Dead Zone**, or **TDZ**.

## var before its initializer

A **var** binding is created for its containing function, script, or module scope. Its initializer still runs in normal statement order.

~~~js
console.log(status); // undefined

var status = "ready";

console.log(status); // ready
~~~

The first log can read **status** because the binding is already initialized to **undefined**. The assignment to **"ready"** happens only when execution reaches the declaration.

A helpful way to understand the behavior is to imagine the binding setup and assignment as separate steps:

~~~js
var status;
console.log(status);

status = "ready";
console.log(status);
~~~

This is a learning model, not a literal rewrite of the source code.

## Function declarations can be called earlier in their scope

A function declaration is initialized during declaration setup, so the function can be called before its textual declaration:

~~~js
sayHello();

function sayHello() {
  console.log("Hello");
}
~~~

The call prints **Hello**. The function body runs when the call happens. Only the function declaration is available earlier; ordinary statements are not moved or run early.

Keep function declarations in a clear, consistent scope. Block-level function declarations have scope and compatibility details that differ across contexts, so avoid relying on them before studying strict mode and block behavior.

## Function expressions are not the same

A function expression is a value assigned to a binding. Its behavior depends on the declaration used for that binding.

~~~js
// The var binding is initialized to undefined before this line.
console.log(typeof showMessage); // undefined

var showMessage = function () {
  console.log("Message");
};
~~~

At the first log, **showMessage** is **undefined**, not a callable function. The function expression is created and assigned only when execution reaches its line.

Calling it early attempts to call **undefined**, which throws a **TypeError**:

~~~js
// showMessage(); // TypeError if this runs before the assignment
var showMessage = function () {
  console.log("Message");
};
~~~

Function expressions assigned to **let** or **const** are also unavailable before initialization, but an early access is in the TDZ and throws a **ReferenceError**.

~~~js
// const showMessage = () => console.log("Message");
// Accessing showMessage before its declaration initializes it throws ReferenceError.
~~~

## let and const are in the Temporal Dead Zone

The scope of a **let** or **const** binding begins at the start of its enclosing block, but the binding cannot be read before its declaration is initialized.

~~~js
{
  // Accessing selectedColor here would throw a ReferenceError.
  const selectedColor = "blue";
  console.log(selectedColor);
}
~~~

The TDZ begins when execution enters the scope and ends when the declaration initializes the binding. It is not simply the text before the declaration line in the file. A binding may exist but be unavailable until initialization.

For a **let** declaration without an initializer, initialization happens when execution reaches the declaration. Its value then becomes **undefined**:

~~~js
console.log(typeof laterValue); // ReferenceError: laterValue is in the TDZ

let laterValue;

console.log(laterValue); // undefined
~~~

Use the first line only as a commented or caught error in practice. The working rule is to initialize a binding before reading it.

A **const** declaration must provide an initializer:

~~~js
const maximum = 10;
~~~

A **const** without an initializer is a syntax error, so it cannot have a later initialization statement.

## The TDZ starts at the beginning of the scope

The TDZ is based on scope, not on whether the declaration line has been visually passed. The following code throws even though an outer binding with the same name already has a value:

~~~js
const color = "blue";

{
  // The inner color binding is in its TDZ here.
  // console.log(color); // ReferenceError
  const color = "green";
}
~~~

The inner **color** shadows the outer one throughout the block. Before the inner **const** initializes, the name refers to that uninitialized inner binding. JavaScript does not skip it and use the outer value.

This makes declarations near the top of their scope easier to understand. Avoid reading a name before its declaration.

## typeof and uninitialized bindings

For a name that has never been declared, **typeof** returns the string **"undefined"**:

~~~js
console.log(typeof nameThatDoesNotExist); // "undefined"
~~~

But **typeof** does not bypass the TDZ. If the name refers to a **let** or **const** binding that has not initialized yet, the operation throws a **ReferenceError**:

~~~js
{
  // typeof localName; // ReferenceError in the TDZ
  let localName = "ready";
}
~~~

The difference is whether a binding exists. An undeclared name has no binding. A TDZ name has a binding that is not initialized yet.

## A declaration comparison

| Declaration form | Before its declaration line | When initialization occurs |
| --- | --- | --- |
| **var name = value** | Binding reads as **undefined** | Assignment runs at its declaration line |
| **function name() {}** | Function can be called in its scope | Function is initialized during scope setup |
| **let name = value** | Access throws **ReferenceError** in the TDZ | Initializer runs at the declaration line |
| **let name** | Access throws **ReferenceError** in the TDZ | Declaration line initializes it to **undefined** |
| **const name = value** | Access throws **ReferenceError** in the TDZ | Initializer runs at the declaration line |
| **class Name {}** | Access throws **ReferenceError** in the TDZ | Class declaration is evaluated at its declaration line |
| **var name = function () {}** | **var** reads as **undefined**, and is not callable | Function expression is created and assigned at the declaration line |

This table describes normal declarations in their own scope. Special contexts such as modules, parameter initializers, and block-level functions have additional rules.

## Why the TDZ is useful

The TDZ makes it harder to accidentally use a lexical binding before it has a meaningful value. It also helps surface initialization-order mistakes instead of silently supplying **undefined**.

~~~js
function calculatePrice() {
  const taxRate = 0.05;
  const price = 100;
  return price + price * taxRate;
}

console.log(calculatePrice()); // 105
~~~

Declarations that appear before their first use make dependencies easier to follow. Although function declarations can be called earlier, placing calls after the relevant declarations often improves readability.

## Common mistakes

- **Thinking code is physically moved to the top:** declaration setup changes binding availability, but statements and initializers still run in source order.
- **Expecting a var initializer to run early:** **var** is initialized to **undefined**, while its assignment waits for its line.
- **Calling a function expression before assignment:** a **var** function expression is **undefined** before assignment; with **let** or **const**, an early access is a TDZ error.
- **Treating function declarations and function expressions as identical:** declarations are initialized during setup, while expressions are evaluated when execution reaches them.
- **Thinking the TDZ starts only at the declaration line:** it starts when execution enters the binding's scope and lasts until initialization.
- **Using typeof to bypass the TDZ:** **typeof** throws when the name refers to an uninitialized lexical binding.
- **Assuming an outer binding is used when an inner binding is in the TDZ:** the inner binding shadows it throughout the inner scope.
- **Reading a binding before its declaration for convenience:** declare and initialize it before its first use.

## Try it yourself

1. Read a **var** before its initializer and record the result. Then read it after the initializer.
2. Call a function declaration before its source position. Explain why it works.
3. Move that function into a function expression assigned to **var** and call it before assignment. Identify the error.
4. Try the same early call with a function expression assigned to **const**. Compare the error types.
5. Read a **let** before its declaration inside a block. Catch the **ReferenceError**, then move the read after initialization.
6. Compare **typeof** on an undeclared name with **typeof** on a lexical name inside its TDZ.
7. Create an outer binding and a same-named inner **const**. Try reading the name before the inner declaration and explain which binding the name resolves to.
8. Put a **var** declaration inside a nested block in a function, then read it earlier in that function.
9. Explain why **let value;** can be read as **undefined** after its declaration line but not before it.

## Key points

- Hoisting is a useful metaphor for declaration setup, not literal movement of code.
- A **var** binding is initialized to **undefined** before its initializer executes.
- A function declaration is available earlier in its scope.
- Function expressions are created when execution reaches their assignment.
- **let**, **const**, and class bindings are unavailable before initialization.
- The Temporal Dead Zone lasts from entering the binding's scope until its initialization.
- Reading a TDZ binding throws a **ReferenceError**, including with **typeof**.
- **typeof** an undeclared name returns **"undefined"**.
- A **let** declaration without an initializer becomes **undefined** only when execution reaches that declaration.
- Declare and initialize names before using them to keep execution order clear.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [11 - Scope: global, function, and block](011-scope-global-function-and-block.md) | [Open Q&A](../qnas/012-hoisting-and-the-temporal-dead-zone.md) | [Open example](../examples/012-hoisting-and-the-temporal-dead-zone.md) | [13 - Strict mode](013-strict-mode.md) |