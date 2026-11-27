# 13 - Strict mode: Q&A

Use these questions to review how strict mode is enabled, which source units are strict automatically, and how strict mode changes common JavaScript mistakes. Each answer follows its question.

## Multiple-choice questions

### 1. What is strict mode?

A. A separate programming language  
B. A JavaScript mode that rejects or changes behavior for certain error-prone features  
C. A browser security sandbox  
D. A setting that makes every value constant

**Answer: B.** Strict mode adds restrictions and changes some behaviors to make certain mistakes more visible. It does not isolate code or make values immutable.

### 2. Which exact string can enable strict mode as a directive?

A. **"use-strict"**  
B. **"strict mode"**  
C. **"use strict"**  
D. **"enable strict"**

**Answer: C.** The exact unescaped string **"use strict"** or **'use strict'** can be a Use Strict Directive when it appears in the directive prologue.

### 3. Where must a script-level strict directive appear?

A. After the first function call  
B. In the directive prologue at the beginning of the script  
C. At the end of the file  
D. Anywhere inside a comment

**Answer: B.** The directive must appear in the initial sequence of string expression statements, before executable statements.

### 4. Which source unit is strict automatically?

A. A classic script  
B. An ES module  
C. Any function called from a module  
D. A JSON file

**Answer: B.** Module code is strict automatically. Class code is also strict automatically.

### 5. What happens when strict code assigns to an undeclared name?

A. It silently creates a global property  
B. It throws a **ReferenceError**  
C. It creates a local **const**  
D. It returns **undefined**

**Answer: B.** Strict mode rejects an assignment whose name has no binding. Declare the name before assigning to it.

### 6. What happens when a strict function is called as a plain function with no receiver?

A. Its **this** value is the global object  
B. Its **this** value is **undefined**  
C. Its **this** value is **null** in every host  
D. Its **this** value is the function itself

**Answer: B.** Strict functions preserve the supplied **this** value. A plain call supplies **undefined**.

### 7. What can strict mode do when code writes to a non-writable property?

A. Throw a **TypeError**  
B. Change the property to writable  
C. Create a second property with the same name  
D. Always ignore the assignment

**Answer: A.** In strict code, an assignment that cannot succeed throws a **TypeError** rather than silently failing.

### 8. What happens when strict code directly deletes a variable name?

A. The variable is deleted  
B. The operation returns **false**  
C. The code has a **SyntaxError**  
D. The variable becomes **undefined**

**Answer: C.** The **delete** operator cannot be applied directly to a variable, parameter, or function name in strict code.

### 9. Which statement about **arguments[0]** in a strict function is correct?

A. It is always linked to the first parameter  
B. Changing it does not change the corresponding named parameter  
C. It changes the function's **this** value  
D. It deletes the parameter

**Answer: B.** Strict functions do not dynamically link indexed **arguments** properties to the corresponding parameter bindings.

### 10. What happens to a **with** statement in strict code?

A. It is a syntax error  
B. It creates a new function scope  
C. It becomes a loop  
D. It runs only in modules

**Answer: A.** Strict mode disallows **with** because its name lookup behavior is difficult to reason about.

### 11. What happens if strict code declares a function with duplicate parameter names?

A. The last parameter replaces the first with no error  
B. It is a syntax error  
C. The parameters become global  
D. It runs only in older browsers

**Answer: B.** Duplicate parameter names are not allowed in strict functions.

### 12. What happens when strict code tries to assign to **eval** or **arguments**?

A. The assignment is allowed  
B. It is a syntax error  
C. The name becomes a property on **globalThis**  
D. It is silently ignored

**Answer: B.** Strict-mode early-error rules disallow assigning to identifiers named **eval** or **arguments** and disallow using them as binding names.

### 13. Does strict mode make a script safe to run with untrusted input?

A. Yes, strict mode is a security sandbox  
B. No, strict mode changes language behavior but does not isolate code  
C. Yes, if the script uses **const**  
D. No, because strict mode disables all functions

**Answer: B.** Strict mode can help catch mistakes, but it is not an isolation or security mechanism.

### 14. Can a function with a default parameter contain its own **"use strict"** directive?

A. Yes, in any location in its body  
B. No, that combination is a syntax error  
C. Only if the default value is a number  
D. Only in a module

**Answer: B.** A function with a non-simple parameter list, such as a default parameter, cannot have its own Use Strict Directive. If the function is in a module, it is already strict without the directive.

## True or false

### 15. A **"use strict"** string after an executable statement still enables strict mode for the whole script.

**Answer: False.** It must be part of the directive prologue at the beginning of the source unit.

### 16. A comment before **"use strict"** prevents the string from being a directive.

**Answer: False.** Comments and whitespace do not end the directive prologue.

### 17. Strict mode selected in one script automatically changes unrelated scripts on the same page.

**Answer: False.** Strictness applies to the relevant source unit and code defined within it. Separate source units may have different strictness.

### 18. ES modules and class code are strict without a directive.

**Answer: True.** Module code and class bodies are strict automatically.

### 19. Assigning to an undeclared name in strict code creates a property on the global object.

**Answer: False.** The assignment throws a **ReferenceError**.

### 20. In strict code, a plain function call preserves **this** as **undefined**.

**Answer: True.** Strict mode does not substitute the global object for a missing **this** value.

### 21. Strict mode prevents all writes to object properties.

**Answer: False.** Writable properties can still be changed. Strict mode reports writes that cannot succeed, such as writing to a non-writable property.

### 22. Deleting a configurable object property is allowed in strict mode.

**Answer: True.** Strict mode disallows deleting a binding by name. Deleting a configurable object property is allowed.

### 23. A strict function's **arguments[0]** and first named parameter are separate.

**Answer: True.** Updating an indexed **arguments** property does not update the corresponding parameter in a strict function.

### 24. Strict mode is a replacement for validating data received from users.

**Answer: False.** Strict mode does not validate application data or provide a security boundary.

## Predict the result

### 25. What happens when this function runs?

~~~js
function createMissingValue() {
  "use strict";
  missingValue = 5;
}

createMissingValue();
~~~

**Answer:** The assignment throws a **ReferenceError** because **missingValue** has not been declared. In non-strict classic script code, this kind of assignment can create a global property.

### 26. What does this code print in a classic browser script?

~~~js
function plainCallThis() {
  return this === globalThis;
}

function strictCallThis() {
  "use strict";
  return this === undefined;
}

console.log(plainCallThis());
console.log(strictCallThis());
~~~

**Answer:**

~~~text
true
true
~~~

In a classic browser script, a plain call to a non-strict regular function substitutes the global object. The strict function preserves the missing receiver as **undefined**.

### 27. What does this function return?

~~~js
function inspectPrimitiveThis() {
  "use strict";
  return typeof this;
}

console.log(inspectPrimitiveThis.call(7));
~~~

**Answer:**

~~~text
number
~~~

Strict mode does not convert the primitive **7** into a wrapper object before assigning it to **this**.

### 28. What happens when this function is called?

~~~js
function changeReadOnlyProperty() {
  "use strict";

  const settings = {};
  Object.defineProperty(settings, "mode", {
    value: "dark",
    writable: false
  });

  settings.mode = "light";
}
~~~

**Answer:** The property assignment throws a **TypeError** because **mode** is not writable. In strict mode, a failed assignment is reported instead of silently ignored.

### 29. What does this function print?

~~~js
function inspectArguments(value) {
  "use strict";
  arguments[0] = "changed";
  console.log(arguments[0]);
  console.log(value);
}

inspectArguments("original");
~~~

**Answer:**

~~~text
changed
original
~~~

The indexed **arguments** property and the named parameter are separate in strict mode.

### 30. Is this code strict?

~~~js
const setting = "dark";
"use strict";

function readSetting() {
  return setting;
}
~~~

**Answer:** No. The first statement is executable code, so the later string is not part of the directive prologue. It is just a string expression.

### 31. What happens when this strict function runs?

~~~js
function inspectThis() {
  "use strict";
  return this;
}

console.log(inspectThis());
~~~

**Answer:** It returns **undefined**. A plain call supplies no receiver, and strict mode preserves that missing value.

### 32. Can this run as strict-mode code?

~~~js
"use strict";
function add(left, left) {
  return left + left;
}
~~~

**Answer:** No. A strict function cannot declare duplicate parameter names, so the code has a **SyntaxError** before the function can run.

## Short-answer questions

### 33. What is the directive prologue?

**Answer:** It is the initial sequence of string expression statements in a script or function body. The exact unescaped string **"use strict"** or **'use strict'** in that sequence enables strict mode for that source unit or function.

### 34. How can one function be strict while another function in the same classic script is not?

**Answer:** Put **"use strict"** at the beginning of the first function body. The directive applies to that function and code defined within its strict context. The surrounding classic script and unrelated functions remain non-strict.

### 35. Why should you not describe strict mode as a sandbox?

**Answer:** It changes JavaScript syntax and runtime behavior, but it does not isolate the code, prevent access to page data, or replace security controls.

### 36. What is the difference between deleting a variable and deleting a property?

**Answer:** A variable is a binding in an environment, not an object property that can be removed with **delete**. Strict mode makes direct deletion of a binding a syntax error. An object property may be deleted when it is configurable.

### 37. What does strict mode change about a primitive passed as **this**?

**Answer:** Strict mode preserves the primitive value rather than converting it to a wrapper object. For example, **this** can remain the number **7**, and **typeof this** returns **"number"**.

### 38. Does putting **"use strict"** in a JavaScript module add any strictness?

**Answer:** It is unnecessary because module code is already strict. The directive may appear as a string expression, but modules do not need it to opt into strict mode.

## Coding questions

### 39. Write a strict function that safely declares and updates a local variable.

**Answer:**

~~~js
function updateCount() {
  "use strict";

  let count = 0;
  count += 1;
  return count;
}

console.log(updateCount()); // 1
~~~

The function is strict, and **count** is explicitly declared before assignment.

### 40. Make a plain function call report whether strict mode preserved an undefined receiver.

**Answer:**

~~~js
function checkReceiver() {
  "use strict";
  return this === undefined;
}

console.log(checkReceiver()); // true
~~~

Because the function is called without an object receiver, strict mode keeps **this** as **undefined**.

### 41. Rewrite this so it works in strict mode without creating an accidental global.

~~~js
function saveScore() {
  "use strict";
  currentScore = 10;
}
~~~

**Answer:**

~~~js
function saveScore() {
  "use strict";
  const currentScore = 10;
  return currentScore;
}

console.log(saveScore()); // 10
~~~

Declaring the local binding removes the unresolvable assignment. Returning it provides a deliberate way to share the result.

### 42. Write a strict function that reports a failed write to a non-writable property.

**Answer:**

~~~js
function updateMode(settings) {
  "use strict";

  try {
    settings.mode = "light";
  } catch (error) {
    return error.name;
  }
}

const settings = {};
Object.defineProperty(settings, "mode", {
  value: "dark",
  writable: false
});

console.log(updateMode(settings)); // TypeError
~~~

The strict assignment throws a **TypeError**, which the function catches and returns by name.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [12 - Hoisting and the temporal dead zone](../lessons/012-hoisting-and-the-temporal-dead-zone.md) | [Open lesson](../lessons/013-strict-mode.md) | [Open example](../examples/013-strict-mode.md) | [14 - Values, types, and dynamic typing](../lessons/014-values-types-and-dynamic-typing.md) |