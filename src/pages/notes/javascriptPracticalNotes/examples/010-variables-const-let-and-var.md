# 10 - Variables: const, let, and var: example

This example is a complete HTML page with JavaScript demonstrations for **const**, **let**, and **var**. It prints the results and caught errors to the browser Console.

## Goal

You will see how:

- **const** prevents reassignment but allows object mutation.
- **let** supports reassignment and can be declared before its value is assigned.
- **var** can be read before its initializer runs.
- **let** and **const** are limited by block boundaries.
- Reading a **let** binding before initialization triggers a Temporal Dead Zone error.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript variable practice</title>
</head>
<body>
  <main>
    <h1>JavaScript variable practice</h1>
    <p>
      Open the browser developer tools and select the Console to compare
      const, let, and var.
    </p>
  </main>

  <script>
    // const keeps this binding attached to the same value.
    const courseTitle = "JavaScript variables";

    // let can be reassigned.
    let attemptCount = 0;
    attemptCount = attemptCount + 1;
    attemptCount = attemptCount + 1;

    // A const object can still have its properties changed.
    const profile = {
      name: "Asha"
    };

    profile.name = "Mina";

    console.log("Course:", courseTitle);
    console.log("Attempts:", attemptCount);
    console.log("Profile name after update:", profile.name);

    // A reassignment error can be caught and inspected.
    const fixedLimit = 3;

    try {
      fixedLimit = 5;
    } catch (error) {
      console.log("const reassignment error:", error.name);
    }

    // var is available before this initializer runs.
    function demonstrateVarHoisting() {
      console.log("var before initializer:", loadState);

      var loadState = "ready";

      console.log("var after initializer:", loadState);
    }

    demonstrateVarHoisting();

    // let is in its Temporal Dead Zone before initialization.
    function demonstrateTemporalDeadZone() {
      try {
        console.log(tdzValue);
      } catch (error) {
        console.log("let before initialization:", error.name);
      }

      let tdzValue = "initialized";

      console.log("let after initialization:", tdzValue);
    }

    demonstrateTemporalDeadZone();

    // var is not limited to the if block.
    function compareBlockBehavior() {
      if (true) {
        var varMessage = "var is visible after the block";
        let letMessage = "let stays inside the block";
        const constMessage = "const stays inside the block";

        console.log("inside block:", letMessage);
        console.log("inside block:", constMessage);
      }

      console.log("outside block:", varMessage);
      console.log("outside block, let binding:", typeof letMessage);
      console.log("outside block, const binding:", typeof constMessage);
    }

    compareBlockBehavior();

    // Repeating a var declaration in one scope uses the same binding.
    function demonstrateVarRedeclaration() {
      var legacyStatus = "starting";
      var legacyStatus = "ready";

      console.log("redeclared var:", legacyStatus);
    }

    demonstrateVarRedeclaration();

    // A let can be declared first and assigned later.
    let selectedColor;

    console.log("let before assignment:", selectedColor);

    selectedColor = "blue";

    console.log("let after assignment:", selectedColor);
  </script>
</body>
</html>
~~~

## Run the example

1. Save **index.html**.
2. Open the file in a browser.
3. Open the browser developer tools and select the Console.
4. Reload the page if the Console was opened after it loaded.
5. Read each message and compare it with the section below.

## Expected Console output

~~~text
Course: JavaScript variables
Attempts: 2
Profile name after update: Mina
const reassignment error: TypeError
var before initializer: undefined
var after initializer: ready
let before initialization: ReferenceError
let after initialization: initialized
inside block: let stays inside the block
inside block: const stays inside the block
outside block: var is visible after the block
outside block, let binding: undefined
outside block, const binding: undefined
redeclared var: ready
let before assignment: undefined
let after assignment: blue
~~~

The browser's exact error message can vary, but the **name** should be **TypeError** for the caught **const** reassignment and **ReferenceError** for the caught TDZ access.

## What the example demonstrates

### const binding and object contents

The **fixedLimit** binding cannot be assigned a new value. The reassignment throws a **TypeError**, which the **try...catch** block catches so the rest of the page can continue.

The **profile** binding remains attached to the same object, but the code changes its **name** property. That is allowed because **const** does not deeply freeze the object.

### let reassignment

The **attemptCount** binding starts at zero and is assigned a new value twice. It ends at **2**. The **selectedColor** binding starts as **undefined** because it has no initializer, then receives the value **"blue"**.

### var hoisting

Inside **demonstrateVarHoisting**, the first log runs before the initializer line. The **var** binding already exists, so the value is **undefined**. When execution reaches the initializer, the binding becomes **"ready"**.

### Temporal Dead Zone

Inside **demonstrateTemporalDeadZone**, **tdzValue** is in scope but has not been initialized when the first access occurs. That access throws a **ReferenceError**. The error is caught, then the declaration initializes the binding to **"initialized"**.

### Block behavior

Inside **compareBlockBehavior**, the **let** and **const** names are available. After the **if** block, **varMessage** is still available because **var** is not block-scoped. The **letMessage** and **constMessage** names are outside their scope, so **typeof** reports **"undefined"** there.

The outside **typeof** results are different from reading a binding inside its TDZ. There is no **letMessage** or **constMessage** binding in that outer function scope.

## Try a small change

1. Change **attemptCount** to start at 5 and observe the final value.
2. Comment out the **fixedLimit** reassignment and its **try...catch** block.
3. Change **profile.name** and confirm that the **const** binding still works.
4. Move the **loadState** log below its **var** declaration and compare.
5. Move the **tdzValue** log below its **let** declaration and compare.
6. Replace **var varMessage** with **let varMessage** inside the block, then inspect the error from reading it outside the block.
7. Change **selectedColor** to a **const** declaration without an initializer in a separate practice file. Read the syntax error, then restore the valid **let** version.

## Key ideas shown

- **const** prevents rebinding, not mutation of object contents.
- **let** can be reassigned and can be declared without an initializer.
- **var** is available before its initializer and reads as **undefined** until assignment.
- **let** and **const** have block scope.
- **var** does not stop at a block boundary.
- Accessing a **let** binding before initialization causes a **ReferenceError**.
- A caught error lets the rest of a demonstration continue running.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [09 - Classic scripts, modules, and script loading](../lessons/009-classic-scripts-modules-and-script-loading.md) | [Open lesson](../lessons/010-variables-const-let-and-var.md) | [Open Q&A](../qnas/010-variables-const-let-and-var.md) | [11 - Scope: global, function, and block](../lessons/011-scope-global-function-and-block.md) |
