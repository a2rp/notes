# 12 - Hoisting and the temporal dead zone: example

This complete HTML page demonstrates declaration setup and initialization order. It catches expected errors so the rest of the example can continue, then prints the results to the browser Console.

## Goal

You will observe:

- A function declaration being called before its source position.
- A **var** binding reading as **undefined** before its initializer runs.
- A function expression assigned to **var** being unavailable before assignment.
- **let**, **const**, and class declarations throwing a **ReferenceError** in the TDZ.
- A **let** without an initializer becoming **undefined** after its declaration runs.
- The difference between **typeof** an undeclared name and a lexical binding in its TDZ.
- An inner lexical declaration shadowing an outer binding throughout its block.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript hoisting and TDZ practice</title>
</head>
<body>
  <main>
    <h1>JavaScript hoisting and the Temporal Dead Zone</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      declaration setup, initialization order, and TDZ errors.
    </p>
  </main>

  <script>
    // Function declarations are initialized during scope setup.
    greetBeforeDeclaration();

    function greetBeforeDeclaration() {
      console.log("function declaration before position:", "available");
    }

    // var is initialized to undefined before its initializer runs.
    console.log("var before initializer:", pageStatus);
    var pageStatus = "ready";
    console.log("var after initializer:", pageStatus);

    // A var function expression is not assigned until this line runs.
    function demonstrateVarFunctionExpression() {
      console.log("var function before assignment typeof:", typeof showMessage);

      try {
        showMessage();
      } catch (error) {
        console.log("calling var function early:", error.name);
      }

      var showMessage = function () {
        console.log("var function after assignment:", "called");
      };

      showMessage();
    }

    demonstrateVarFunctionExpression();

    // let bindings cannot be read before initialization.
    function demonstrateLetTDZ() {
      try {
        console.log("let before initialization:", choice);
      } catch (error) {
        console.log("let before initialization:", error.name);
      }

      let choice = "ready";
      console.log("let after initialization:", choice);
    }

    demonstrateLetTDZ();

    // const bindings are also in the TDZ before their initializer.
    function demonstrateConstTDZ() {
      try {
        console.log("const before initialization:", limit);
      } catch (error) {
        console.log("const before initialization:", error.name);
      }

      const limit = 3;
      console.log("const after initialization:", limit);
    }

    demonstrateConstTDZ();

    // A let without an initializer becomes undefined when reached.
    function demonstrateUninitializedLet() {
      try {
        console.log("let without initializer before declaration:", nextValue);
      } catch (error) {
        console.log("let without initializer before declaration:", error.name);
      }

      let nextValue;
      console.log("let without initializer after declaration:", nextValue);
    }

    demonstrateUninitializedLet();

    // typeof only returns "undefined" for a name with no binding.
    console.log("typeof undeclared name:", typeof neverDeclared);

    // typeof still throws for an existing lexical binding in its TDZ.
    function demonstrateTypeofTDZ() {
      try {
        console.log("typeof let in TDZ:", typeof delayedName);
      } catch (error) {
        console.log("typeof let in TDZ:", error.name);
      }

      let delayedName = "initialized";
    }

    demonstrateTypeofTDZ();

    // An inner binding shadows the outer one throughout its block.
    const label = "outer";

    {
      try {
        console.log("inner shadow before initialization:", label);
      } catch (error) {
        console.log("inner shadow before initialization:", error.name);
      }

      const label = "inner";
      console.log("inner shadow after initialization:", label);
    }

    console.log("outer value after block:", label);

    // A const function expression is also unavailable before initialization.
    function demonstrateConstFunctionExpression() {
      try {
        runTask();
      } catch (error) {
        console.log("const function before initialization:", error.name);
      }

      const runTask = () => {
        console.log("const function after initialization:", "called");
      };

      runTask();
    }

    demonstrateConstFunctionExpression();

    // Class declarations are lexical bindings and have a TDZ.
    {
      try {
        console.log("class before initialization:", typeof LocalCard);
      } catch (error) {
        console.log("class before initialization:", error.name);
      }

      class LocalCard {}

      console.log("class after initialization:", typeof LocalCard);
    }
  </script>
</body>
</html>
~~~

## Open the Console

1. Open **index.html** in a browser.
2. Open Developer Tools. In most desktop browsers, **F12** opens them.
3. Select the **Console** tab.
4. Compare the output below with the logs from the page.

The intentional errors are caught and reported by the script. The page continues to the following demonstrations.

## Expected Console output

~~~text
function declaration before position: available
var before initializer: undefined
var after initializer: ready
var function before assignment typeof: undefined
calling var function early: TypeError
var function after assignment: called
let before initialization: ReferenceError
let after initialization: ready
const before initialization: ReferenceError
const after initialization: 3
let without initializer before declaration: ReferenceError
let without initializer after declaration: undefined
typeof undeclared name: undefined
typeof let in TDZ: ReferenceError
inner shadow before initialization: ReferenceError
inner shadow after initialization: inner
outer value after block: outer
const function before initialization: ReferenceError
const function after initialization: called
class before initialization: ReferenceError
class after initialization: function
~~~

## Explanation

### Function declaration

The page calls **greetBeforeDeclaration** before the declaration appears in the source. The call succeeds because the function declaration is initialized during declaration setup. Its body still runs only when the call is made.

### var binding and initializer

The first **pageStatus** log prints **undefined**. The binding is available before its initializer, but the assignment to **"ready"** waits until execution reaches the declaration. The second log prints the assigned value.

### Function expression assigned to var

Before assignment, **showMessage** is an existing **var** binding with the value **undefined**. The call throws a **TypeError** because **undefined** is not callable. The error is caught, the function expression is assigned, and the next call succeeds.

### let and const in the TDZ

The **choice** and **limit** bindings exist in their scopes, but the code reads them before the declaration initializes them. Each early access throws a **ReferenceError**. The **try...catch** reports the error and allows the declaration and later log to run.

The **const** log prints **3** because the initialized value is a number. The **let** example prints **ready** after initialization.

### let without an initializer

The early read of **nextValue** is in the TDZ and throws. When execution reaches **let nextValue**, the binding is initialized to **undefined**, so the next read succeeds.

### typeof and an undeclared name

**neverDeclared** has no binding, so **typeof neverDeclared** returns the string **"undefined"**. **delayedName** does have a binding, but it is in the TDZ when **typeof** runs, so the operation throws a **ReferenceError**.

### Shadowing and the TDZ

Inside the block, the inner **label** declaration shadows the outer **label** from the beginning of the block. The early read therefore reaches the uninitialized inner binding and throws. After initialization, it reads **"inner"**. Outside the block, the outer binding still reads **"outer"**.

### Function expression assigned to const

The call to **runTask** happens while its **const** binding is in the TDZ, so it throws a **ReferenceError**. After the arrow function is assigned, calling it works.

### Class declaration

**LocalCard** is a lexical binding. It cannot be read before the class declaration runs, so **typeof LocalCard** throws in the TDZ. After the class declaration, **typeof LocalCard** is **"function"**.

## Try a small change

1. Move **greetBeforeDeclaration()** below its function declaration and compare the output.
2. Change **var pageStatus** to **let pageStatus** and observe the error from the early read.
3. Change **var showMessage** to **let showMessage** and inspect the early error type.
4. Move the **let nextValue** declaration above the first log. Confirm that its value is then **undefined** instead of causing a TDZ error.
5. Move **typeof delayedName** below its declaration and compare it with **typeof neverDeclared**.
6. Rename the inner **label** to **innerLabel**. Observe how the early read now resolves to the initialized outer **label**.
7. Move **runTask()** below its **const** declaration and confirm the error disappears.
8. Move the **LocalCard** check below the class declaration and compare its result.

## Key ideas shown

- A function declaration can be called earlier in its scope.
- A **var** binding is initialized to **undefined**, but its initializer waits for its source position.
- A function expression is created when execution reaches its assignment.
- A lexical binding cannot be read in the TDZ before initialization.
- A **let** without an initializer is initialized to **undefined** when its declaration runs.
- **typeof** an undeclared name returns **"undefined"**, but **typeof** a TDZ binding throws.
- A lexical declaration shadows an outer binding throughout its scope.
- Class declarations also have a TDZ.
- Catching an expected error lets later demonstrations continue.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [11 - Scope: global, function, and block](../lessons/011-scope-global-function-and-block.md) | [Open lesson](../lessons/012-hoisting-and-the-temporal-dead-zone.md) | [Open Q&A](../qnas/012-hoisting-and-the-temporal-dead-zone.md) | [13 - Strict mode](../lessons/013-strict-mode.md) |