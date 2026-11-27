# 10 - Variables: const, let, and var

JavaScript variables are bindings between names and values. Use **const** when a binding should not be reassigned, **let** when it needs to be reassigned, and understand **var** when reading older code.

## Declare, initialize, and assign

A **declaration** introduces a binding:

~~~js
let message;
~~~

An **initialization** gives a binding its first value:

~~~js
let message = "Hello";
~~~

An **assignment** gives an existing binding another value:

~~~js
message = "Welcome";
~~~

These are different steps. A declaration can include an initializer, as in **let message = "Hello"**. A **const** declaration must include an initializer because its binding cannot be assigned later.

## Use const by default

Use **const** when you do not need to assign a different value to the binding:

~~~js
const firstName = "Asha";
const itemCount = 3;
const greeting = "Hello, " + firstName;
~~~

A **const** binding cannot be reassigned:

~~~js
const maximumAttempts = 3;
maximumAttempts = 5; // TypeError
~~~

The binding is fixed after initialization. This makes the code's intent clear and prevents accidental reassignment.

A **const** declaration must have an initializer:

~~~js
const score; // SyntaxError
~~~

If you need to declare a name first and assign it later, use **let**.

## const does not freeze an object

When a **const** binding refers to an object or array, the binding cannot be changed to refer to a different object. The object's contents can still be changed:

~~~js
const profile = {
  name: "Asha"
};

profile.name = "Mina";
profile.city = "Jaipur";

console.log(profile.name);
console.log(profile.city);
~~~

The object properties changed, but **profile** still refers to the same object.

~~~js
const colors = ["red", "blue"];
colors.push("green");
~~~

This is valid because **push** changes the array. Reassigning **colors** to a new array is not valid:

~~~js
colors = ["black"]; // TypeError
~~~

Think of **const** as a restriction on reassignment of the binding, not as a command that deeply freezes the value.

## Use let when reassignment is needed

Use **let** when the same binding needs to hold different values over time:

~~~js
let currentPage = 1;

currentPage = currentPage + 1;
console.log(currentPage);
~~~

A **let** declaration may omit its initializer. It then has the value **undefined** until an assignment occurs:

~~~js
let selectedItem;

console.log(selectedItem); // undefined

selectedItem = "notebook";
console.log(selectedItem); // notebook
~~~

A **let** binding can be assigned again, but it cannot be declared again in the same scope:

~~~js
let attempts = 0;
attempts = attempts + 1;

// let attempts = 2; // SyntaxError in the same scope
~~~

If you only need one name and are not intentionally changing its value, **const** is usually clearer.

## var in older code

**var** is the older variable declaration. It is still valid JavaScript, but its scope and hoisting behavior can surprise beginners.

~~~js
var customerName = "Asha";
customerName = "Mina";
~~~

A **var** binding can be reassigned and redeclared in the same scope:

~~~js
var statusMessage = "Loading";
var statusMessage = "Ready";

console.log(statusMessage);
~~~

The second declaration does not create a separate binding. It refers to the same **var** binding.

### var is not block-scoped

A block is a group of statements inside braces. A **var** declared inside an **if** block is still scoped to its containing function or script:

~~~js
if (true) {
  var resultMessage = "Finished";
}

console.log(resultMessage);
~~~

This can make a **var** binding visible in more places than its indentation suggests. By contrast, **let** and **const** are scoped to the nearest enclosing block.

### var is function-scoped

A **var** declared inside a function is limited to that function, not to an inner block:

~~~js
function showResult() {
  if (true) {
    var result = "Finished";
  }

  console.log(result);
}

showResult();
~~~

The log succeeds because **result** belongs to the function scope.

## Hoisting and initialization

Before a function or script begins executing, JavaScript processes its declarations. This behavior is commonly called **hoisting**.

A **var** binding is available before its declaration line, but its initializer has not run yet. Before the assignment is reached, its value is **undefined**:

~~~js
console.log(loadState); // undefined

var loadState = "ready";

console.log(loadState); // ready
~~~

This behaves conceptually like a declaration being processed earlier and the assignment remaining at its original position:

~~~js
var loadState;
console.log(loadState);

loadState = "ready";
console.log(loadState);
~~~

Do not rely on using **var** before its declaration. Declare a name before using it so the code reads in execution order.

## The temporal dead zone

**let** and **const** are also processed as part of their enclosing scope, but they cannot be accessed before their declaration is initialized. The part of the scope before initialization is called the **Temporal Dead Zone**, or **TDZ**.

~~~js
{
  // Reading selectedColor here would throw a ReferenceError.
  const selectedColor = "blue";
  console.log(selectedColor);
}
~~~

The binding exists in the block, but it cannot be used before the declaration is evaluated. A read before initialization throws a **ReferenceError**.

Unlike an undeclared name, using **typeof** on a **let** or **const** binding inside its TDZ also throws a **ReferenceError**:

~~~js
{
  // typeof selectedColor; // ReferenceError in the TDZ
  const selectedColor = "blue";
}
~~~

The TDZ helps prevent accidental use of a binding before the program has assigned its intended value.

## Same name in a nested block

A nested block can declare a new **let** or **const** with the same name as an outer binding. Inside the nested block, the inner binding is used:

~~~js
const theme = "light";

{
  const theme = "dark";
  console.log(theme);
}

console.log(theme);
~~~

The first log prints **dark**, and the second prints **light**. This is called **shadowing**. Use it only when it makes the code easier to understand.

A **var** declaration does not create a new block-scoped binding in this way. Avoid mixing **var** and **let** or **const** with the same name in overlapping scopes.

## Redeclaration and reassignment

These words describe different actions:

- **Reassignment** changes the value held by an existing binding.
- **Redeclaration** attempts to introduce a binding with a name that already exists in the same scope.

| Declaration | Reassignment | Redeclaration in the same scope | Scope behavior |
| --- | --- | --- | --- |
| **const** | Not allowed | Not allowed | Block-scoped |
| **let** | Allowed | Not allowed | Block-scoped |
| **var** | Allowed | Allowed | Function-scoped or script/module scoped |

Scope has additional details that will be covered in the next lesson. For now, remember that braces create useful boundaries for **let** and **const**, while **var** does not follow ordinary block boundaries.

## A practical choice

For new code, a simple rule works well:

1. Start with **const**.
2. Change it to **let** if the binding must be reassigned.
3. Use **var** when maintaining code that already depends on its behavior, or when a project specifically requires it.

This is a convention for clear modern code, not a rule that makes **var** invalid.

## Common mistakes

- **Reassigning a const binding:** use **let** if the binding needs a new value.
- **Expecting const to freeze an object:** object and array contents may still change.
- **Declaring const without an initializer:** provide the value at the declaration.
- **Reading a let or const before its declaration:** move the read after initialization.
- **Assuming var belongs to the nearest block:** **var** is function-scoped, not block-scoped.
- **Confusing redeclaration with reassignment:** assigning a new value is different from declaring the same name again.
- **Using var because it appears in old examples:** learn to read it, but prefer **const** or **let** for new code.
- **Declaring several unrelated variables on one line:** one declaration per line is often easier to read and edit.

## Try it yourself

1. Declare a value that should not be reassigned using **const**.
2. Declare a counter with **let**, then increment it twice.
3. Create a **const** array, add an item with **push**, and explain why it is still valid.
4. Try to assign a new array to that **const** binding in a separate practice file. Read the error.
5. Declare a **let** without an initializer. Read its value, assign a string, and read it again.
6. Put **var**, **let**, and **const** declarations inside an **if** block. Compare which names can be read afterward.
7. Read a **var** before its declaration line in a function. Observe **undefined**, then move the declaration above the read.
8. Try a **let** read before its declaration inside a block. Read the **ReferenceError**, then move the read below initialization.
9. Declare a name in an outer block and shadow it in a nested block. Read the value in both places.

## Key points

- A declaration introduces a binding; initialization gives it its first value; assignment changes an existing binding.
- Use **const** when a binding does not need reassignment.
- Use **let** when a binding needs reassignment.
- A **const** object or array can still have its contents mutated.
- **let** and **const** are block-scoped and cannot be redeclared in the same scope.
- **var** is function-scoped, allows redeclaration, and is initialized to **undefined** before its assignment runs.
- **let** and **const** cannot be accessed before initialization because of the Temporal Dead Zone.
- Prefer **const** and **let** in new code, and understand **var** when reading existing code.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [09 - Classic scripts, modules, and script loading](009-classic-scripts-modules-and-script-loading.md) | [Open Q&A](../qnas/010-variables-const-let-and-var.md) | [Open example](../examples/010-variables-const-let-and-var.md) | [11 - Scope: global, function, and block](011-scope-global-function-and-block.md) |
