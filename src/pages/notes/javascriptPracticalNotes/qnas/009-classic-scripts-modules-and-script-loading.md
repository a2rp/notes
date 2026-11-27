# 09 - Classic scripts, modules, and script loading: Q&A

These questions review classic scripts, JavaScript modules, imports and exports, and how the browser schedules scripts.

## Multiple-choice questions

### 1. What does this script element load by default?

~~~html
<script src="./app.js"></script>
~~~

A. A module script  
B. A classic script  
C. A JSON data block  
D. A stylesheet

**Answer: B.** Without **type="module"**, this is a classic script.

### 2. Which script element enables static imports and exports in a browser?

A. **<script defer>**  
B. **<script async>**  
C. **<script type="module">**  
D. **<script type="classic">**

**Answer: C.** Static **import** and **export** declarations are used in module scripts.

### 3. What is the default behavior of a module script in a browser document?

A. It blocks HTML parsing immediately  
B. It is deferred until the document has been parsed  
C. It never executes  
D. It executes before its dependencies load

**Answer: B.** Module scripts fetch dependencies while parsing continues and execute after parsing by default.

### 4. What does **defer** do for an external classic script?

A. It waits until parsing completes and preserves order among deferred classic scripts  
B. It makes the script run before the HTML is parsed  
C. It executes the script in a worker  
D. It converts the script into a module

**Answer: A.** Deferred external classic scripts run after parsing and in document order.

### 5. What ordering guarantee do independent classic scripts with **async** have relative to each other?

A. They always execute in the order written in HTML  
B. They execute alphabetically by file name  
C. They have no guaranteed order relative to each other  
D. They execute only after a click

**Answer: C.** An async script runs as soon as it is available, so network timing can determine which runs first.

### 6. Which script type is automatically in strict mode?

A. Classic scripts only  
B. Module scripts  
C. All inline scripts only  
D. Neither type

**Answer: B.** JavaScript modules are automatically strict mode.

### 7. What is the purpose of **export**?

A. To make a binding available to other modules  
B. To stop HTML parsing  
C. To create a browser global variable  
D. To load a CSS file

**Answer: A.** A module exports values that other modules can import.

### 8. Which statement about **defer** on a module script is correct?

A. It is required for modules to run after parsing  
B. It has no effect because modules are deferred by default  
C. It turns static imports into dynamic imports  
D. It makes the module run before dependencies

**Answer: B.** A module script is deferred by default. The **defer** attribute does not change module-script behavior.

### 9. What does **import("./reporting.js")** return?

A. A module namespace immediately  
B. A Promise that fulfills with the loaded module namespace  
C. A CSSStyleSheet object  
D. A global variable

**Answer: B.** Dynamic **import()** returns a Promise and can be used inside functions and conditional code.

### 10. Why is a local development server useful for browser module practice?

A. Module files cannot contain JavaScript  
B. Browser modules use URL-based fetching and cross-origin rules that can block file URLs  
C. It changes modules into classic scripts  
D. It automatically fixes every import path

**Answer: B.** Serving files from a local HTTP address helps the browser resolve module URLs under normal web loading rules.

## True or false

### 11. Classic scripts support static **import** declarations without any special script type.

**Answer: False.** Static imports require a module script. A classic script can use dynamic **import()** where supported.

### 12. Two modules can share a variable automatically just because both files are loaded on the same page.

**Answer: False.** Modules have their own scopes. Share values through **export** and **import**.

### 13. An external classic script without **async** or **defer** can block HTML parsing while it is fetched and executed.

**Answer: True.** Parser-inserted classic scripts in that form interrupt parsing during fetch and execution.

### 14. Deferred external classic scripts execute in document order.

**Answer: True.** If two external classic scripts use **defer**, the browser executes them in their document order after parsing.

### 15. Async scripts are a good choice when one script must run before another dependent script.

**Answer: False.** Async scripts have no guaranteed relative execution order. Use deferred classic scripts or module imports when ordering and dependencies matter.

### 16. A module can use top-level **await** where supported.

**Answer: True.** Top-level await is available in modules, not in classic scripts.

### 17. Adding **defer** to an inline classic script makes it wait until parsing completes.

**Answer: False.** The **defer** attribute has no effect on inline classic scripts. Place the script after needed markup, use an appropriate event pattern, or load an external script with **defer**.

### 18. If a module is imported by multiple modules, its top-level code executes repeatedly for every import.

**Answer: False.** A module is evaluated once per module record in a given environment. Importers use the same evaluated module instance.

### 19. Module top-level variables automatically become properties on **window**.

**Answer: False.** Module top-level bindings stay in module scope and are not automatically added to **window**.

### 20. The **async** attribute can also be used with module scripts.

**Answer: True.** An async module and its dependencies are evaluated as soon as the graph is ready, without a guarantee of order relative to other scripts.

## Short-answer questions

### 21. What is the main difference between a classic script and a module script?

**Answer:** A classic script uses the traditional shared page global environment and does not support static imports and exports. A module has its own scope, is strict mode by default, and supports explicit imports and exports.

### 22. What does a relative module specifier such as **"./math.js"** mean in browser code?

**Answer:** It is a URL path resolved relative to the importing module. Include the file extension in browser module examples so the requested URL is explicit.

### 23. Why might a classic script in the document head fail to find a body element?

**Answer:** A classic script without **defer** may execute before the parser has reached the body element. Move the script after the relevant HTML or use a suitable loading strategy.

### 24. What is the main difference between **async** and **defer** for external classic scripts?

**Answer:** **defer** waits until parsing finishes and preserves document order. **async** executes as soon as the file is ready and does not guarantee order among async scripts.

### 25. Can a module import another module?

**Answer:** Yes. A module can import values from another module, and the browser loads, links, and evaluates the dependency graph.

### 26. What happens if a static import requests an export name that the target module does not provide?

**Answer:** Module linking fails, so the importing module cannot run as expected. Confirm that the exported name and imported name match exactly, including capitalization.

### 27. What is the difference between static **import** and dynamic **import()**?

**Answer:** Static **import** is a module declaration at the top level that establishes a dependency before evaluation. Dynamic **import()** is an expression that returns a Promise and can be called conditionally or from a function.

### 28. Why should async scripts generally be independent?

**Answer:** An async script can execute before or after another async script depending on when each becomes available. If one needs another to run first, that timing is unsafe.

## Read the code

### 29. What does this module print?

~~~js
// math.js
export function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

// main.js
import { add } from "./math.js";

console.log(add(4, 6));
~~~

**Answer:**

~~~text
10
~~~

The module exports **add**, and the importing module calls it with two numbers.

### 30. What is required for this HTML to use static imports in **main.js**?

~~~html
<script src="./main.js"></script>
~~~

**Answer:** Change the script element to **<script type="module" src="./main.js"></script>**. Without **type="module"**, the browser treats it as a classic script and static import syntax is invalid there.

### 31. Which file is expected to run first?

~~~html
<script defer src="./library.js"></script>
<script defer src="./app.js"></script>
~~~

**Answer:** **library.js** runs first, followed by **app.js**, after the HTML document has been parsed. Deferred external classic scripts preserve document order.

### 32. Can you rely on this order?

~~~html
<script async src="./first.js"></script>
<script async src="./second.js"></script>
~~~

**Answer:** No. Either script may execute first based on when it is available. Async loading does not preserve the order shown in the document.

### 33. What kind of script is this, and can it use static **import**?

~~~html
<script type="module">
  import { add } from "./math.js";
  console.log(add(1, 2));
</script>
~~~

**Answer:** It is an inline module script and can use static **import**. The imported path must resolve successfully under the page's module loading conditions.

### 34. Does **window.pageMessage** necessarily contain a top-level **const pageMessage** from a classic script?

~~~js
const pageMessage = "Hello";
~~~

**Answer: No.** A top-level **const** in a classic script does not create a property on **window**. It is a global lexical binding available to later classic scripts, subject to normal declaration rules.

## Scenarios

### 35. Your page uses a module import, but the browser reports a loading or CORS error when the HTML is opened from disk. What should you try?

**Answer:** Serve the project with a local development server and open its local HTTP address. Then verify the relative import paths and the file requests in DevTools.

### 36. A normal classic script in the head queries a button in the body and gets **null**. What are two ways to fix the timing issue?

**Answer:** Move the script after the button markup, or load an external classic script with **defer**. The code should run only after the needed HTML has been parsed.

### 37. Your entry module imports a helper module, but the helper has a syntax error. What happens?

**Answer:** The module dependency graph cannot be successfully parsed and linked, so the entry module does not evaluate normally. Check the Console and the failing dependency.

### 38. You have a small independent analytics script and an application script that depends on another library. Which loading approach fits each more naturally?

**Answer:** An independent analytics script may use **async** if its execution timing and order do not matter. Dependent application scripts should use an ordering strategy such as **defer** for classic scripts or explicit module imports.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [08 - Identifiers, keywords, reserved words, and naming](../lessons/008-identifiers-keywords-reserved-words-and-naming.md) | [Open lesson](../lessons/009-classic-scripts-modules-and-script-loading.md) | [Open example](../examples/009-classic-scripts-modules-and-script-loading.md) | [10 - Variables: const, let, and var](../lessons/010-variables-const-let-and-var.md) |
