# 11 - Scope: global, function, and block: example

This complete HTML page demonstrates lexical lookup, function and block scope, **var** crossing a block boundary, shadowing, and closures. It prints every result to the browser Console.

## Goal

After running the example, you should be able to explain:

- Why an inner function can read bindings from enclosing scopes.
- Why a function cannot use the caller's local binding as its own outer scope.
- How **let** and **const** behave inside a block.
- Why **var** remains visible after an ordinary block.
- How shadowing creates a separate inner binding.
- How a closure retains private state, and how separate closures keep separate state.
- Why a top-level **var** in this classic browser script is a global object property while a top-level **const** is not.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript scope practice</title>
</head>
<body>
  <main>
    <h1>JavaScript scope practice</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      global, function, and block scope, along with closure behavior.
    </p>
  </main>

  <script>
    // This is a classic browser script.
    const courseName = "JavaScript";
    var classicScriptLabel = "created by top-level var";

    console.log("top-level const binding:", courseName);
    console.log("globalThis property from var:", globalThis.classicScriptLabel);
    console.log("globalThis property from const:", globalThis.courseName);

    // An inner function can read its own and enclosing bindings.
    const region = "Rajasthan";

    function readNestedLocation() {
      const city = "Jaipur";

      function readStreet() {
        const street = "Park Road";
        console.log("nested scope:", street, city, region);
      }

      readStreet();
    }

    readNestedLocation();

    // A function reads the lexical scope where it was defined.
    const theme = "light";

    function readTheme() {
      console.log("lexical theme:", theme);
    }

    function callFromAnotherScope() {
      const theme = "dark";
      readTheme();
    }

    callFromAnotherScope();

    // let and const stay inside the block.
    function showBlockScope() {
      if (true) {
        const blockMessage = "const is inside the block";
        let blockCount = 2;
        console.log("inside block:", blockMessage);
        console.log("inside block count:", blockCount);
      }

      console.log("outside block, typeof blockMessage:", typeof blockMessage);
      console.log("outside block, typeof blockCount:", typeof blockCount);
    }

    showBlockScope();

    // var ignores an ordinary block boundary, but remains in this function.
    function showVarScope() {
      if (true) {
        var functionMessage = "var crossed the block";
      }

      console.log("after block, var:", functionMessage);
    }

    showVarScope();

    // A local name shadows the outer name without changing it.
    const color = "blue";

    function showShadowing() {
      const color = "green";
      console.log("inner color:", color);
    }

    showShadowing();
    console.log("outer color:", color);

    // Each call creates a counter with its own private count binding.
    function createCounter(start) {
      let count = start;

      return function increment() {
        count += 1;
        return count;
      };
    }

    const firstCounter = createCounter(0);
    const secondCounter = createCounter(10);

    console.log("first counter:", firstCounter());
    console.log("first counter:", firstCounter());
    console.log("second counter:", secondCounter());
    console.log("first counter:", firstCounter());

    // The returned methods share access to one private score binding.
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

    console.log("score before:", scoreboard.getScore());
    console.log("score after adding a point:", scoreboard.addPoint());
    console.log("score from getter:", scoreboard.getScore());
  </script>
</body>
</html>
~~~

## Open the Console

1. Open **index.html** in a browser.
2. Open Developer Tools. In most desktop browsers, **F12** opens them.
3. Select the **Console** tab.
4. Compare the output below with the logs from the page.

This file displays a page and logs JavaScript results. It does not need a server or an external library.

## Expected Console output

~~~text
top-level const binding: JavaScript
globalThis property from var: created by top-level var
globalThis property from const: undefined
nested scope: Park Road Jaipur Rajasthan
lexical theme: light
inside block: const is inside the block
inside block count: 2
outside block, typeof blockMessage: undefined
outside block, typeof blockCount: undefined
after block, var: var crossed the block
inner color: green
outer color: blue
first counter: 1
first counter: 2
second counter: 11
first counter: 3
score before: 4
score after adding a point: 5
score from getter: 5
~~~

## Explanation

### Top-level bindings in this page

The script uses a classic inline browser script. Its top-level **var** declaration creates the **globalThis.classicScriptLabel** property. The **courseName** binding is visible to the script, but a top-level **const** does not create a **globalThis.courseName** property, so the last value in that comparison is **undefined**.

This detail depends on the script type and host. A top-level declaration in a JavaScript module has module scope instead.

### Nested scope lookup

**readStreet** reads **street** from its own function, **city** from **readNestedLocation**, and **region** from the outer script scope. The name lookup moves outward through enclosing lexical scopes.

### The caller does not replace lexical scope

**readTheme** prints **light** even though **callFromAnotherScope** declares a local **theme** with the value **dark**. **readTheme** uses the scope where it was defined. The caller's local name does not replace its lexical environment.

### Block scope and function scope

Inside **showBlockScope**, the **let** and **const** bindings can be read. After the block ends, those bindings are not visible. The **typeof** expressions print **undefined** because there is no binding with either name in the outer function scope.

Inside **showVarScope**, **functionMessage** was declared with **var**. It is scoped to **showVarScope**, not to the **if** block, so the log after the block can still read it.

### Shadowing

The **color** inside **showShadowing** is a new local binding. It shadows the outer **color** while the function runs. The inner log prints **green**, and the later outer log prints **blue**.

### Closures and independent counters

Each call to **createCounter** creates a new **count** binding and returns a function that retains access to it. The first counter starts at zero and produces **1**, **2**, then **3**. The second counter has a separate binding, starts at ten, and produces **11**.

The scoreboard methods close over the same **score** binding. **addPoint** changes it, and **getScore** reads the updated value. Code outside **createScoreboard** uses these methods without directly accessing the local **score** name.

## Try a small change

1. Change the second counter's starting value from **10** to **20** and predict its next output.
2. Add another call to **firstCounter**. Confirm only that counter advances.
3. Change the inner **color** to **orange**. Check the outer **color** afterward.
4. Replace **var functionMessage** with **let functionMessage** inside the **if** block. Observe the value of **functionMessage** after the block.
5. Move **readTheme** inside **callFromAnotherScope** and compare how its enclosing scope changes.
6. Add a **getScore** call before and after **addPoint** to observe the same captured binding.
7. In this classic script, add **var anotherGlobal = "hello"** at the top level and inspect **globalThis.anotherGlobal**. Then compare it with a top-level **let** or **const** binding.

## Key ideas shown

- Scope controls where names are visible.
- A nested function can read bindings from enclosing lexical scopes.
- The caller's local scope does not replace the scope where a function was defined.
- **let** and **const** stop at a block boundary.
- **var** crosses an ordinary block boundary but remains in its function when declared inside a function.
- Shadowing creates a distinct inner binding.
- A closure retains access to the bindings in its surrounding lexical environment.
- Separate calls can create separate private state.
- In a classic browser script, top-level **var** and **const** have different relationships to **globalThis**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [10 - Variables: const, let, and var](../lessons/010-variables-const-let-and-var.md) | [Open lesson](../lessons/011-scope-global-function-and-block.md) | [Open Q&A](../qnas/011-scope-global-function-and-block.md) | [12 - Hoisting and the temporal dead zone](../lessons/012-hoisting-and-the-temporal-dead-zone.md) |