# 41 - Lexical scope and closures

**Scope** determines where a name can be accessed in a program. JavaScript uses lexical scope: the visible bindings are determined by where code is written in the source, not by which function happened to call it.

A **closure** is a function together with access to the lexical environment where that function was created. Because of closures, a nested function can keep using variables from its outer function after the outer function has returned.

Closures are useful for callbacks, factories, event handlers, and keeping state private. To use them safely, understand block scope, shadowing, and the difference between retaining access to a variable and taking a snapshot of its value.

## What scope controls

A binding is a name declared by **let**, **const**, **var**, a function declaration, a class declaration, or a function parameter. Scope controls where that binding is visible.

~~~js
const message = "outside";

function showMessage() {
    const message = "inside";
    console.log(message);
}

showMessage();
console.log(message);
~~~

Output:

~~~text
inside
outside
~~~

The function has its own local **message** binding. It does not replace the binding outside the function.

## Lexical scope looks outward

When JavaScript evaluates a name, it looks in the current scope first. If the name is not there, it searches the enclosing scope, continuing outward until it finds the binding or reaches the outermost scope.

~~~js
const language = "JavaScript";

function makeSentence() {
    const topic = "scope";

    function describe() {
        console.log(language + " has lexical " + topic + ".");
    }

    describe();
}

makeSentence();
~~~

Output:

~~~text
JavaScript has lexical scope.
~~~

The **describe** function can access **topic** and **language** because their declarations are in enclosing scopes. A function can read outward bindings, but an outer function cannot read a name declared only inside a nested function.

~~~js
function outer() {
    function inner() {
        const secret = "inside inner";
    }

    inner();
    // The name secret is not available here.
}

outer();
~~~

Trying to use **secret** in **outer** would throw a **ReferenceError** because it is outside that binding's scope.

## Block scope with let and const

A block is a region enclosed by braces. **let** and **const** declarations belong to the nearest enclosing block:

~~~js
if (true) {
    const status = "ready";
    let count = 1;
    console.log(status, count);
}

// status and count are not available here.
~~~

Output:

~~~text
ready 1
~~~

The **if** block's bindings do not leak outside its braces. Loops and standalone brace blocks also create scopes for **let** and **const** declarations.

A **const** binding cannot be reassigned, but an object stored in a const binding can still be mutated. Scope and mutability are separate ideas:

~~~js
const settings = { theme: "light" };
settings.theme = "dark";

console.log(settings.theme);
~~~

Output:

~~~text
dark
~~~

The binding **settings** still points to the same object. The object's property changed.

## Function scope and var

A **var** declaration is scoped to the nearest function, or to the global script when it is outside a function. It does not create a new binding for an ordinary block:

~~~js
if (true) {
    var message = "visible after the block";
}

console.log(message);
~~~

Output:

~~~text
visible after the block
~~~

This can be surprising. Prefer **let** or **const** for block-scoped variables in modern JavaScript.

A function parameter and declarations inside a function also belong to function-local scope. Each call receives its own parameter and local bindings.

## The temporal dead zone

A **let** or **const** binding exists in its block from the start of that block, but cannot be accessed until its declaration has been evaluated. The time before that declaration is reached is called the **temporal dead zone**:

~~~js
{
    // Accessing mode here would throw a ReferenceError.
    const mode = "compact";
    console.log(mode);
}
~~~

The error is not because JavaScript has not heard of the name. The binding exists, but it cannot be used before initialization. This behavior helps catch accidental use before declaration.

By comparison, a **var** declaration is hoisted to the top of its function scope and initialized with **undefined**:

~~~js
function showVar() {
    console.log(label);
    var label = "ready";
}

showVar();
~~~

Output:

~~~text
undefined
~~~

The code behaves roughly as if the declaration were moved to the top of the function, but its assignment remains where it was written. This is one reason **let** and **const** are usually clearer.

## Shadowing

A nested scope can declare a binding with the same name as an outer binding. The inner declaration **shadows** the outer one within its own scope:

~~~js
const color = "blue";

function showColor() {
    const color = "green";
    console.log(color);
}

showColor();
console.log(color);
~~~

Output:

~~~text
green
blue
~~~

The inner **color** does not change the outer **color**. After leaving the inner scope, the outer binding is visible again.

Shadowing can be useful when a local name describes a value clearly, but excessive reuse of names in deeply nested code can make it harder to tell which binding is being read.

## Closures retain access to lexical bindings

A function created inside another function can use the outer function's bindings. It keeps that access even after the outer call has returned:

~~~js
function makeGreeter(name) {
    return function greet() {
        console.log("Hello, " + name);
    };
}

const greetAsha = makeGreeter("Asha");
greetAsha();
~~~

Output:

~~~text
Hello, Asha
~~~

The returned **greet** function closes over the **name** binding created by its call to **makeGreeter**. The outer function has returned, but the returned function still needs that binding.

Each call creates a distinct environment:

~~~js
function makeGreeter(name) {
    return function () {
        return "Hello, " + name;
    };
}

const greetAsha = makeGreeter("Asha");
const greetMina = makeGreeter("Mina");

console.log(greetAsha());
console.log(greetMina());
~~~

Output:

~~~text
Hello, Asha
Hello, Mina
~~~

The two functions retain access to different **name** bindings.

## A closure keeps access to a binding, not a snapshot

A closure does not automatically copy the value at the time the function is created. It retains access to the binding, so later reads can see an updated value:

~~~js
function makeCounter() {
    let count = 0;

    return function () {
        count += 1;
        return count;
    };
}

const nextCount = makeCounter();

console.log(nextCount());
console.log(nextCount());
console.log(nextCount());
~~~

Output:

~~~text
1
2
3
~~~

The inner function reads and updates the same **count** binding on each call. The binding remains available because the returned function still refers to it.

A closure can also read a binding that another function updates:

~~~js
function createStatus() {
    let status = "waiting";

    return {
        get: function () {
            return status;
        },
        set: function (nextStatus) {
            status = nextStatus;
        }
    };
}

const statusControl = createStatus();
console.log(statusControl.get());

statusControl.set("complete");
console.log(statusControl.get());
~~~

Output:

~~~text
waiting
complete
~~~

Both returned methods close over the same **status** binding.

## Closures and private state

A closure can keep a value inaccessible to code outside the returned functions:

~~~js
function createWallet(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: function (amount) {
            if (amount > 0) {
                balance += amount;
            }
        },
        getBalance: function () {
            return balance;
        }
    };
}

const wallet = createWallet(20);
wallet.deposit(5);
console.log(wallet.getBalance());
~~~

Output:

~~~text
25
~~~

The **balance** variable is not a property on **wallet**, so outside code cannot directly assign to **wallet.balance** to change the closed-over binding. The returned methods provide the operations the function chooses to expose.

This pattern does not replace every object or class. It is useful when a small piece of state should be available only through a few functions.

## Closures in callbacks and loops

A callback uses the scope where it was created. **let** creates a fresh loop binding for each iteration, so callbacks created in the loop can each retain that iteration's value:

~~~js
const callbacks = [];

for (let index = 0; index < 3; index += 1) {
    callbacks.push(function () {
        console.log(index);
    });
}

callbacks.forEach(function (callback) {
    callback();
});
~~~

Output:

~~~text
0
1
2
~~~

Replacing **let** with **var** gives the loop one function-scoped **index** binding. When the callbacks run after the loop, each reads the final value:

~~~js
const callbacks = [];

for (var index = 0; index < 3; index += 1) {
    callbacks.push(function () {
        console.log(index);
    });
}

callbacks.forEach(function (callback) {
    callback();
});
~~~

Output:

~~~text
3
3
3
~~~

Each function closes over the same **index** binding. The functions do not capture three separate copies of its value.

## Scope in functions and modules

Every function call has its own local scope for parameters and local declarations. Nested functions can search through enclosing function scopes.

In a classic browser script, a top-level **var** can become a property of **globalThis**. Top-level **let** and **const** do not create properties in the same way. JavaScript modules also have their own top-level scope rather than placing each top-level declaration on the global object.

Avoid putting application state in global bindings. Explicit parameters, return values, modules, and closures make ownership easier to understand.

## Common scope and closure mistakes

- **Expecting a block-scoped binding to escape its block:** **let** and **const** are limited to their block.
- **Assuming braces give var block scope:** **var** is function-scoped, not block-scoped.
- **Reading let or const before initialization:** Access during the temporal dead zone throws a **ReferenceError**.
- **Confusing shadowing with reassignment:** An inner binding with the same name does not change the outer binding.
- **Assuming a closure stores a frozen copy:** A closure retains access to a binding, whose value may change.
- **Using var for callbacks created in a loop:** Those callbacks can all read the same final loop binding.
- **Thinking outer code can read a nested local:** Scope lookup goes outward from the current code, not inward into child functions.
- **Keeping large data reachable unnecessarily:** A live closure can keep referenced values available. Release references when they are no longer needed.

## Try it yourself

1. Declare a **const** inside an **if** block. Predict what happens if code reads it after the block.
2. Rewrite a **var** example with **let** and compare the visibility of the variable.
3. Create an inner function that reads a variable from its outer function.
4. Return that inner function and call it after the outer function has finished.
5. Build a counter closure with **increment** and **getValue** methods.
6. Create two counters and confirm that they keep separate counts.
7. Create three callbacks in a **for** loop using **let**, then call them after the loop.
8. Replace **let** with **var** and explain why the output changes.

## Key points

- Scope determines where a binding can be accessed.
- JavaScript uses lexical scope, based on where functions and blocks are written.
- **let** and **const** are block-scoped. **var** is function-scoped.
- A nested function can access bindings from its enclosing lexical scopes.
- A closure is a function that retains access to the lexical environment where it was created.
- Closures retain access to bindings, so they can observe and update changing values.
- Each function call can create a separate environment for its closures.
- **let** in a loop creates a per-iteration binding, which is useful when callbacks run later.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [40 - Callbacks and higher-order functions](040-callbacks-and-higher-order-functions.md) | [Open Q&A](../qnas/041-lexical-scope-and-closures.md) | [Open example](../examples/041-lexical-scope-and-closures.md) | [42 - this and invocation context](042-this-and-invocation-context.md) |