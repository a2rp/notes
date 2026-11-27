# 13 - Strict mode: example

This complete HTML page compares strict and non-strict functions in a classic browser script. It catches expected runtime errors and prints the results to the browser Console.

## Goal

You will see how:

- A non-strict undeclared assignment can create a global property, while a strict assignment throws.
- A plain function call supplies different **this** values in strict and non-strict code.
- Strict code preserves primitive **this** values.
- A directive after executable code does not enable strict mode.
- A strict write to a non-writable property throws a **TypeError**.
- A strict delete of a non-configurable property throws a **TypeError**.
- A strict function keeps **arguments** separate from its named parameter.
- Class methods are strict automatically.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript strict mode practice</title>
</head>
<body>
  <main>
    <h1>JavaScript strict mode practice</h1>
    <p>
      Open the browser developer tools and select the Console to compare
      strict and non-strict function behavior.
    </p>
  </main>

  <script>
    // This script is a classic script without a script-level strict directive.

    // In non-strict code, this creates a property on the global object.
    function demonstrateSloppyAssignment() {
      accidentalFlag = "created";
      return globalThis.accidentalFlag;
    }

    console.log(
      "sloppy undeclared assignment:",
      demonstrateSloppyAssignment()
    );

    // Remove the property so this example does not leave it behind.
    delete globalThis.accidentalFlag;
    console.log(
      "sloppy global after cleanup:",
      Object.prototype.hasOwnProperty.call(globalThis, "accidentalFlag")
    );

    // In strict code, an undeclared assignment throws instead.
    function demonstrateStrictAssignment() {
      "use strict";

      try {
        strictOnlyFlag = "not created";
      } catch (error) {
        console.log("strict undeclared assignment:", error.name);
      }

      return Object.prototype.hasOwnProperty.call(
        globalThis,
        "strictOnlyFlag"
      );
    }

    console.log(
      "strict name created globally:",
      demonstrateStrictAssignment()
    );

    // A plain call substitutes globalThis in non-strict browser code.
    function inspectSloppyThis() {
      return this === globalThis;
    }

    // A strict function preserves the missing receiver as undefined.
    function inspectStrictThis() {
      "use strict";
      return this === undefined;
    }

    console.log("plain this is global:", inspectSloppyThis());
    console.log("strict plain this is undefined:", inspectStrictThis());

    // Strict mode does not wrap a primitive this value.
    function inspectPrimitiveThis() {
      "use strict";
      return typeof this;
    }

    console.log(
      "strict primitive this type:",
      inspectPrimitiveThis.call(7)
    );

    // A string after executable code is not a directive.
    function directiveAfterStatement() {
      const marker = 1;
      "use strict";
      return this === globalThis && marker === 1;
    }

    console.log(
      "late directive leaves function non-strict:",
      directiveAfterStatement()
    );

    // Non-strict code silently leaves a non-writable property unchanged.
    const settings = {};
    Object.defineProperty(settings, "mode", {
      value: "dark",
      writable: false
    });

    function demonstrateSloppyWrite() {
      settings.mode = "light";
      return settings.mode;
    }

    console.log("sloppy write result:", demonstrateSloppyWrite());

    // Strict code reports the failed write.
    function demonstrateStrictWrite() {
      "use strict";

      try {
        settings.mode = "light";
      } catch (error) {
        console.log("strict write error:", error.name);
      }

      return settings.mode;
    }

    console.log("after strict write:", demonstrateStrictWrite());

    // A property that cannot be deleted produces a strict-mode error.
    const fixedRecord = {};
    Object.defineProperty(fixedRecord, "id", {
      value: "fixed",
      configurable: false
    });

    function demonstrateStrictDelete() {
      "use strict";

      try {
        delete fixedRecord.id;
      } catch (error) {
        console.log("strict delete error:", error.name);
      }

      return Object.prototype.hasOwnProperty.call(fixedRecord, "id");
    }

    console.log("fixed property remains:", demonstrateStrictDelete());

    // Non-strict arguments properties can be linked to named parameters.
    function demonstrateSloppyArguments(value) {
      arguments[0] = "changed";
      console.log("sloppy arguments[0]:", arguments[0]);
      console.log("sloppy parameter:", value);
    }

    demonstrateSloppyArguments("original");

    // Strict arguments properties are separate from named parameters.
    function demonstrateStrictArguments(value) {
      "use strict";

      arguments[0] = "changed";
      console.log("strict arguments[0]:", arguments[0]);
      console.log("strict parameter:", value);
    }

    demonstrateStrictArguments("original");

    // Class methods are strict even though this script is not.
    class StrictExample {
      readThis() {
        return this;
      }
    }

    const example = new StrictExample();
    const detachedMethod = example.readThis;

    console.log(
      "class method plain call has undefined this:",
      detachedMethod() === undefined
    );
  </script>
</body>
</html>
~~~

## Open the Console

1. Open **index.html** in a browser.
2. Open Developer Tools. In most desktop browsers, **F12** opens them.
3. Select the **Console** tab.
4. Compare the output below with the logs from the page.

The examples use a classic browser script so that non-strict behavior can be compared with function-level strict directives. Modules are strict automatically and behave differently from this script.

## Expected Console output

~~~text
sloppy undeclared assignment: created
sloppy global after cleanup: false
strict undeclared assignment: ReferenceError
strict name created globally: false
plain this is global: true
strict plain this is undefined: true
strict primitive this type: number
late directive leaves function non-strict: true
sloppy write result: dark
strict write error: TypeError
after strict write: dark
strict delete error: TypeError
fixed property remains: true
sloppy arguments[0]: changed
sloppy parameter: changed
strict arguments[0]: changed
strict parameter: original
class method plain call has undefined this: true
~~~

## Explanation

### Undeclared assignment

The first function has no strict directive. In a classic browser script, assigning to the undeclared **accidentalFlag** creates a global property, so the first line prints **created**. The script then deletes that configurable property.

**demonstrateStrictAssignment** begins with **"use strict"**. Its assignment to **strictOnlyFlag** throws a **ReferenceError**, which the function catches. No property is created on **globalThis**.

### The this value

The script is a non-strict classic browser script. A plain call to **inspectSloppyThis** substitutes the global object, so the comparison is **true**. **inspectStrictThis** is strict and preserves the missing receiver as **undefined**.

The strict call using **call(7)** keeps the primitive number as **this**, so **typeof this** is **"number"**.

### Directive position

In **directiveAfterStatement**, the **const** declaration appears before the string. That ends the directive prologue. The later **"use strict"** is just a string expression, so the function remains non-strict and its plain call uses the global object in this classic browser script.

### Failed property writes

**settings.mode** is non-writable. The non-strict assignment is silently ignored, so the value remains **dark**. The strict assignment throws a **TypeError**, which is caught. The property is still **dark** afterward.

### Failed property deletion

**fixedRecord.id** is non-configurable. A strict delete attempt throws a **TypeError**. The final check confirms that the property remains.

Directly deleting a variable name is a different case. It is a syntax error in strict code, so such a line is shown separately below and is not included as executable code in this page.

### arguments and parameters

In the non-strict function, changing **arguments[0]** also changes the parameter **value**, so both logs print **changed**. In the strict function, **arguments[0]** changes while the named parameter stays **original**.

### Class methods

Class bodies are strict automatically. When **detachedMethod** is called without **example** as its receiver, **this** remains **undefined**.

## Strict-mode syntax errors

These examples are intentionally not part of the runnable page. Try one at a time in a separate file with **"use strict"** at the top. A syntax error prevents the entire containing script from running.

~~~js
"use strict";

// with (settings) {} // SyntaxError
// function add(value, value) {} // SyntaxError
// let eval = 1; // SyntaxError
// delete localName; // SyntaxError
// const oldOctal = 012; // SyntaxError
~~~

A function with a default parameter cannot contain its own strict directive:

~~~js
// SyntaxError: a non-simple parameter list cannot have its own directive.
// function show(value = 1) {
//   "use strict";
//   return value;
// }
~~~

## Try a small change

1. Remove **"use strict"** from **demonstrateStrictAssignment** and compare the assignment behavior.
2. Move **"use strict"** to the top of the script. Observe that all functions defined in that script become strict, then restore the original page.
3. Move **"use strict"** to the first line of **directiveAfterStatement**. Check its plain-call **this** value.
4. Change **settings.mode** to **writable: true** and compare the strict assignment.
5. Change **fixedRecord.id** to **configurable: true** and inspect the delete result.
6. Remove **"use strict"** from **demonstrateStrictArguments** and compare the parameter after changing **arguments[0]**.
7. Add a method to **StrictExample**, detach it, and check its **this** value when called plainly.
8. Uncomment one syntax-error example in a separate file at a time. Read the error, then restore the comment.

## Key ideas shown

- Strict mode can be enabled for a classic script or a function with an exact directive in its directive prologue.
- A directive after executable code does not enable strict mode.
- Modules and class bodies are strict automatically.
- An undeclared assignment throws a **ReferenceError** in strict code.
- Strict code reports writes to non-writable properties with a **TypeError**.
- A plain strict function call preserves **this** as **undefined**.
- Strict mode preserves primitive **this** values.
- Strict functions do not link **arguments** indices to named parameters.
- A non-configurable property cannot be deleted, and strict code reports the failed deletion.
- Strict mode changes language behavior but does not provide a security sandbox.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [12 - Hoisting and the temporal dead zone](../lessons/012-hoisting-and-the-temporal-dead-zone.md) | [Open lesson](../lessons/013-strict-mode.md) | [Open Q&A](../qnas/013-strict-mode.md) | [14 - Values, types, and dynamic typing](../lessons/014-values-types-and-dynamic-typing.md) |