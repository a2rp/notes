# 11 - Scope: global, function, and block

**Scope** is the part of a program where a name can be accessed. A name may be visible in one place and unavailable in another because JavaScript organizes bindings into nested scopes.

Understanding scope helps you choose where to declare values, avoid accidental name conflicts, and understand how functions keep access to data.

## A first example

~~~js
const courseName = "JavaScript";

function showCourse() {
  const lessonName = "Scope";
  console.log(courseName);
  console.log(lessonName);
}

showCourse();
~~~

The function can read **courseName** because that binding is in an outer scope. It can also read **lessonName**, which is declared in its own function scope. Code outside **showCourse** cannot read **lessonName**.

A useful rule is:

- Inner code can access its own scope and enclosing scopes.
- Outer code cannot access names declared only in an inner scope.

## Lexical scope and the scope chain

JavaScript uses **lexical scope**. The location where code is written determines which surrounding scopes it can access. When JavaScript looks up a name, it checks the current scope first, then its enclosing scope, continuing outward until it finds a matching binding or reaches the outermost scope.

~~~js
const region = "North";

function createMessage() {
  const city = "Jaipur";

  function readLocation() {
    const street = "Park Road";
    console.log(street);
    console.log(city);
    console.log(region);
  }

  readLocation();
}

createMessage();
~~~

**readLocation** can use **street** from its own scope, **city** from **createMessage**, and **region** from the outer scope. This chain of enclosing scopes is often called the **scope chain**.

A name declared in one branch or function does not become available to its parent just because the parent called it:

~~~js
function makeValue() {
  const privateValue = 42;
}

makeValue();

// console.log(privateValue); // ReferenceError
~~~

The name **privateValue** exists only inside **makeValue**.

## Global scope

A binding declared at the outermost level of a program may be available throughout that script. It is often called a **global binding**.

~~~js
const siteName = "Learning Notes";

function showSiteName() {
  console.log(siteName);
}

showSiteName();
console.log(siteName);
~~~

Global names are convenient for values that truly belong to the whole application, but adding many global names makes it easier for unrelated code to collide. Keep data inside functions or modules when it does not need to be shared globally.

### Global bindings and globalThis

A global binding and a property of the global object are related concepts, but they are not always the same thing.

In a classic browser script, a top-level **var** declaration becomes a property of the global object. Top-level **let** and **const** declarations do not:

~~~js
var scriptLabel = "classic";
let selectedTheme = "dark";

console.log(globalThis.scriptLabel); // "classic"
console.log(globalThis.selectedTheme); // undefined
~~~

This example assumes a classic script in a browser. Hosts and script types affect global behavior. A top-level declaration in a JavaScript module is module-scoped, not a global binding. Avoid using properties of **window** or **globalThis** as a substitute for well-organized scope.

## Function scope

Each function call gets its own local scope. Function parameters and declarations inside the function belong to that call.

~~~js
function describePerson(name) {
  const message = "Hello, " + name;
  return message;
}

console.log(describePerson("Asha"));
console.log(describePerson("Mina"));
~~~

Each call receives its own **name** parameter and its own **message** binding. The binding is available while that call's function code is executing, and it cannot be accessed directly from outside the function.

~~~js
function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}

console.log(calculateTotal(12, 3));
// console.log(total); // ReferenceError
~~~

Returning a value lets the caller receive a result. It does not expose the function's local name **total**.

## Block scope

A **block** is a group of statements inside braces. **let** and **const** are scoped to the nearest enclosing block.

~~~js
if (true) {
  const status = "ready";
  let attempts = 1;
  console.log(status);
  console.log(attempts);
}

// console.log(status); // ReferenceError
// console.log(attempts); // ReferenceError
~~~

The **if** body has its own block scope. The two names are available inside that block and outside scopes cannot access them.

An explicit pair of braces can also create a block:

~~~js
{
  const temporaryMessage = "Only inside this block";
  console.log(temporaryMessage);
}

// console.log(temporaryMessage); // ReferenceError
~~~

Common block-scoped declarations include **let**, **const**, and class declarations. **var** does not use ordinary block scope.

## How var crosses a block boundary

A **var** declaration is scoped to the nearest containing function. If it is not inside a function, it belongs to the surrounding script or module context. Braces for an **if**, **for**, or standalone block do not contain it.

~~~js
if (true) {
  var legacyStatus = "visible after the block";
  let blockStatus = "inside the block";
}

console.log(legacyStatus);
// console.log(blockStatus); // ReferenceError
~~~

The first log works because **legacyStatus** is not block-scoped. The second name is block-scoped and is unavailable outside the braces.

Inside a function, **var** belongs to that function even when declared inside a nested block:

~~~js
function showLegacyValue() {
  if (true) {
    var value = "function scope";
  }

  console.log(value);
}

showLegacyValue();
~~~

For new code, prefer **const** or **let** so that braces clearly limit the visibility of a name. Chapter 10 covers choosing among these declaration forms.

## Nested scopes and shadowing

A nested scope may declare a name that already exists in an outer scope. The inner declaration **shadows** the outer binding while execution is inside the inner scope.

~~~js
const color = "blue";

function showColors() {
  const color = "green";
  console.log(color);
}

showColors();
console.log(color);
~~~

The function logs **green** because its local **color** shadows the outer **color**. After the function call, the outer log reads **blue**. These are distinct bindings.

Shadowing can be useful when a short-lived inner value has the same meaning as the outer one, but excessive reuse of names can make code harder to follow. Prefer descriptive names when the values represent different things.

## Lexical scope is based on where a function is defined

A function uses the scope where it was **defined**, not the scope of the code that happens to call it. This is another consequence of lexical scope.

~~~js
const greeting = "Hello";

function sayGreeting() {
  console.log(greeting);
}

function callWithDifferentGreeting() {
  const greeting = "Namaste";
  sayGreeting();
}

callWithDifferentGreeting();
~~~

The output is **Hello**. **sayGreeting** was defined where the outer **greeting** is visible. Calling it from **callWithDifferentGreeting** does not replace its surrounding scope with that caller's local scope.

## Closures: functions that retain access to their scope

A **closure** is a function together with access to the lexical environment where it was created. A nested function can continue using surrounding bindings even after the outer function has returned.

~~~js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
~~~

**createCounter** returns **increment**. The outer call finishes, but **increment** still has access to its **count** binding. Each call to **increment** updates that same binding.

Calling the outer function again creates a separate environment and a separate counter:

~~~js
const firstCounter = createCounter();
const secondCounter = createCounter();

console.log(firstCounter()); // 1
console.log(firstCounter()); // 2
console.log(secondCounter()); // 1
~~~

The counters do not share state. This pattern is useful for keeping a value private and exposing only operations that should change or read it.

A closure keeps access to bindings, not a frozen snapshot of their values. If a captured binding changes, later calls can observe the updated value.

## A closure with a readable interface

A closure can expose several related functions that operate on the same private state:

~~~js
function createScoreboard(initialScore) {
  let score = initialScore;

  return {
    addPoint() {
      score += 1;
      return score;
    },
    getScore() {
      return score;
    }
  };
}

const scoreboard = createScoreboard(4);

console.log(scoreboard.getScore()); // 4
console.log(scoreboard.addPoint()); // 5
console.log(scoreboard.getScore()); // 5
~~~

The **score** binding is local to **createScoreboard**. The returned methods can read and update it, while other code cannot directly assign to **score**.

## Scope and modules

JavaScript modules provide their own top-level scope. A name declared at the top level of one module does not automatically become available in another module. To share a binding, a module explicitly **exports** it and another module **imports** it.

~~~js
// settings.js
export const defaultLanguage = "en";
~~~

~~~js
// app.js
import { defaultLanguage } from "./settings.js";

console.log(defaultLanguage);
~~~

The imported name is available in **app.js**, while unrelated modules do not gain access to it automatically. Module exports and imports are covered in the modules chapter.

## Common mistakes

- **Trying to use a function-local name outside the function:** return a value or expose a deliberate function instead.
- **Expecting an inner scope to become visible to its parent:** visibility flows from inner code outward, not from the parent into child-only bindings.
- **Assuming braces contain var:** **var** follows function scope, not ordinary block scope.
- **Assuming a function sees the caller's local variables:** lexical scope follows where the function was defined.
- **Thinking two shadowed names are one binding:** the inner and outer declarations are distinct.
- **Assuming a closure copies a value once:** it retains access to its lexical binding, which may change.
- **Putting every shared value in global scope:** keep state near the code that owns and uses it.
- **Treating every global binding as a globalThis property:** the relationship depends on declaration form and script type.

## Try it yourself

1. Declare a name outside a function and read it inside the function.
2. Declare a local name inside that function and try to read it after the function call. Explain the result.
3. Create two nested functions. Give each level a different binding and read all three from the innermost function.
4. Declare the same name in an outer scope and a nested block. Log it inside and outside the block.
5. Put **let**, **const**, and **var** inside an **if** block. Check which names are accessible after the block.
6. Define a function that reads a global name, then call it from another function that has a local name with the same spelling. Predict the output before running it.
7. Write **createCounter** so each call returns a function that increments a private number.
8. Create two counters and call them in an alternating order. Confirm that each maintains independent state.
9. Update the counter to return an object with **increment** and **getValue** methods. Keep the numeric binding private.
10. Explain why modules help keep top-level names from becoming shared global names.

## Key points

- Scope defines where a binding can be accessed.
- JavaScript uses lexical scope, determined by where code is written.
- Name lookup starts in the current scope and continues through enclosing scopes.
- Inner code can read outer bindings, but outer code cannot read names limited to inner scopes.
- Global, function, block, and module scopes define different visibility boundaries.
- **let** and **const** are block-scoped. **var** is function-scoped and ignores ordinary block boundaries.
- Shadowing creates a distinct inner binding with the same name as an outer binding.
- A closure lets a function retain access to its surrounding lexical environment.
- Separate calls to a closure-producing function can create independent private state.
- Use global scope sparingly and share module bindings with explicit exports and imports.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [10 - Variables: const, let, and var](010-variables-const-let-and-var.md) | [Open Q&A](../qnas/011-scope-global-function-and-block.md) | [Open example](../examples/011-scope-global-function-and-block.md) | [12 - Hoisting and the temporal dead zone](012-hoisting-and-the-temporal-dead-zone.md) |