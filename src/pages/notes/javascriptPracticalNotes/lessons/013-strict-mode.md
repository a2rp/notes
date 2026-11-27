# 13 - Strict mode

**Strict mode** is a form of JavaScript that rejects or changes behavior for several error-prone language features. It helps catch mistakes such as assigning to an undeclared name and makes some function behavior more predictable.

Strict mode applies to specific source units. It does not automatically change every script on a page.

## Enable strict mode in a script

In a classic script, put the exact directive **"use strict"** or **'use strict'** at the beginning of the script, before other statements:

~~~js
"use strict";

const courseName = "JavaScript";
~~~

The directive must be in the initial sequence of string expression statements, called the **directive prologue**. Comments and blank lines may appear before it, but an executable statement before it means the string is no longer a directive.

~~~js
const courseName = "JavaScript";
"use strict"; // This is only a string expression, not a strict-mode directive.
~~~

The directive must use the exact text **"use strict"** or **'use strict'**. Escapes or additional characters do not activate strict mode.

A directive at the top of a classic script applies to that script's code, including functions defined within it. A strict directive at the start of a function body can make that function strict without making unrelated code in the surrounding script strict:

~~~js
function updateRecord() {
  "use strict";

  // This function body is strict mode code.
}
~~~

Modules and class bodies are strict automatically. They do not need a **"use strict"** directive. In modern JavaScript, using modules and avoiding legacy syntax is common, but knowing strict mode helps you understand old scripts and the behavior of individual functions.

## Strict mode does not act as a security sandbox

Strict mode changes JavaScript language rules. It is not a security boundary and does not isolate code from the page, protect secrets, or replace input validation and other security controls.

## Accidental global assignments become errors

In non-strict classic script code, assigning to a name that was never declared can create a property on the global object:

~~~js
function sloppyAssignment() {
  accidentalStatus = "created";
}

sloppyAssignment();
console.log(globalThis.accidentalStatus);
~~~

This is usually an accidental bug. In strict mode, the same assignment throws a **ReferenceError** instead of creating a global property:

~~~js
function strictAssignment() {
  "use strict";

  accidentalStatus = "created"; // ReferenceError
}
~~~

Declare the name with **const**, **let**, or **var** before using it.

## Assignments that cannot succeed throw

When strict code tries to change a property that cannot be changed, it throws a **TypeError**. Non-strict code may silently ignore the assignment.

~~~js
const settings = {};

Object.defineProperty(settings, "mode", {
  value: "dark",
  writable: false
});

function updateSettings() {
  "use strict";
  settings.mode = "light"; // TypeError
}
~~~

Strict mode makes the failed update visible. It does not make the property writable.

## Deleting names and properties

Strict mode does not allow deleting a variable, function name, or function parameter with the **delete** operator. This is a syntax error:

~~~js
"use strict";

let status = "ready";
// delete status; // SyntaxError
~~~

The line is commented out because an uncommented syntax error prevents the containing script from running.

Deleting a configurable object property remains allowed. If a property cannot be deleted, strict mode throws a **TypeError** instead of silently returning **false**:

~~~js
"use strict";

const settings = {};
Object.defineProperty(settings, "mode", {
  value: "dark",
  configurable: false
});

// delete settings.mode; // TypeError when evaluated
~~~

Use property-management methods intentionally. The **delete** operator removes a configurable property; it does not delete a local variable.

## A plain function call preserves this

In non-strict code, a plain call to a regular function substitutes the global object for a missing **this** value. In strict code, **this** is kept as supplied. A plain call supplies **undefined**:

~~~js
function inspectStrictThis() {
  "use strict";
  return this;
}

console.log(inspectStrictThis()); // undefined
~~~

Strict code also does not convert primitive **this** values into wrapper objects. For example:

~~~js
function inspectThisType() {
  "use strict";
  return typeof this;
}

console.log(inspectThisType.call(7)); // number
~~~

This behavior makes accidental use of a global object less likely. It does not change **this** for method calls, where the object before the dot supplies the receiver:

~~~js
const user = {
  name: "Asha",
  showName() {
    "use strict";
    return this.name;
  }
};

console.log(user.showName()); // Asha
~~~

Arrow functions do not create their own **this** binding. Their **this** comes from the surrounding context, regardless of strict mode.

## Strict functions do not link arguments to parameters

In non-strict functions, changing an indexed property of **arguments** can also change the matching parameter. Strict functions keep them separate:

~~~js
function showArguments(value) {
  "use strict";

  arguments[0] = "changed";
  console.log(arguments[0]); // changed
  console.log(value); // original
}

showArguments("original");
~~~

This separation helps prevent an update to **arguments** from unexpectedly changing a named parameter. Use rest parameters when you want an array of function arguments:

~~~js
function collectNames(...names) {
  "use strict";

  return names;
}
~~~

## Strict mode reports syntax errors earlier

Some constructs that are accepted in non-strict scripts are syntax errors in strict code:

- A **with** statement is not allowed.
- A function cannot have duplicate parameter names.
- **eval** and **arguments** cannot be used as binding names, and cannot be assigned to.
- Legacy octal number literals and legacy octal escape sequences are not allowed.
- Directly deleting a variable, parameter, or function name is not allowed.

For example:

~~~js
"use strict";

// with (settings) {} // SyntaxError
// function add(value, value) {} // SyntaxError
// let eval = 1; // SyntaxError
// const count = 3;
// delete count; // SyntaxError
~~~

These examples are commented out because a syntax error prevents the containing script from running. Some restrictions are already enforced by modern syntax or modules, but they remain important when reading older code.

## The use strict directive with parameters

A function with a non-simple parameter list cannot contain its own **"use strict"** directive. Non-simple parameter lists include default values, rest parameters, and destructuring:

~~~js
// SyntaxError: this function has a default parameter and its own strict directive.
// function show(value = 1) {
//   "use strict";
//   return value;
// }
~~~

This function may still be strict if it is defined inside strict code, such as a module. The issue is specifically adding a function-body directive when the parameter list is non-simple.

## Strict and non-strict code can coexist

Strict mode is selected per source unit or function body. A web page may have separate scripts with different strictness, and one function can use a strict directive while surrounding classic script code remains non-strict.

Do not assume that a function is strict just because another script on the page uses strict mode. Check whether the function is inside strict code, inside a module or class, or begins with its own directive.

## Common mistakes

- **Putting "use strict" after executable code:** it must be in the directive prologue at the beginning of the source unit or function body.
- **Using a similar string instead of the exact directive:** only the exact unescaped string **"use strict"** or **'use strict'** activates it.
- **Assuming one script's directive changes every script on the page:** strictness is local to the relevant source unit and code defined within it.
- **Thinking modules need the directive:** modules are strict automatically.
- **Treating strict mode as a security sandbox:** it changes language behavior but does not isolate or secure an application.
- **Expecting an undeclared assignment to make a global:** strict code throws a **ReferenceError**.
- **Expecting failed writes to be ignored:** strict code throws a **TypeError** for writes that cannot succeed.
- **Trying to delete a local variable:** strict code reports a syntax error, and variables are not object properties.
- **Assuming a plain function call receives globalThis in strict code:** its **this** value is **undefined**.
- **Writing a "use strict" directive inside a function with a default or rest parameter:** this is a syntax error.

## Try it yourself

1. Add **"use strict"** as the first statement in a classic script. Try assigning to an undeclared name.
2. Move the directive below an executable statement. Compare how the assignment behaves in a classic browser script.
3. Add a strict directive only inside a function. Check whether a separate function in the same non-strict script changes.
4. Call a strict regular function plainly, with **call(null)**, and with **call(7)**. Inspect **this**.
5. Define a non-writable property, assign to it in strict and non-strict functions, and compare the result.
6. Change **arguments[0]** inside a strict function and compare the corresponding parameter.
7. Try the commented strict-mode syntax errors one at a time in a separate practice file.
8. Remove a configurable object property with **delete**, then try a non-configurable property in strict code.
9. Create a module and observe that it is strict without adding the directive.
10. Add a **"use strict"** directive to a function with a default parameter in a separate file. Read the syntax error, then remove the directive.

## Key points

- Strict mode rejects or changes behavior for several error-prone language features.
- In a classic script or a function body, the exact **"use strict"** directive must appear in the directive prologue.
- Modules and class bodies are strict automatically.
- Strictness applies to a source unit and code defined within it. Separate source units may have different strictness.
- Assigning to an undeclared name throws a **ReferenceError** in strict mode.
- Failed writes to non-writable or otherwise non-settable targets throw a **TypeError** in strict mode.
- A plain strict function call preserves **this** as **undefined** instead of substituting the global object.
- Strict functions do not link indexed **arguments** properties to named parameter bindings.
- **with**, duplicate parameters, certain uses of **eval** and **arguments**, legacy octal syntax, and direct deletion of bindings are disallowed.
- Strict mode is not a security sandbox.
- A function with non-simple parameters cannot add its own **"use strict"** directive.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [12 - Hoisting and the temporal dead zone](012-hoisting-and-the-temporal-dead-zone.md) | [Open Q&A](../qnas/013-strict-mode.md) | [Open example](../examples/013-strict-mode.md) | [14 - Values, types, and dynamic typing](014-values-types-and-dynamic-typing.md) |