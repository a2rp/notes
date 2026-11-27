# 41 - Lexical scope and closures - Q&A

Use these questions to review JavaScript scope, block and function declarations, shadowing, the temporal dead zone, and closures. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does scope determine?

A. How quickly a function runs  
B. Where a binding can be accessed  
C. Whether a value is a string  
D. How many times a loop runs

**Answer:** B. Where a binding can be accessed.

**Explanation:** Scope controls the visibility of names declared with variables, functions, classes, and parameters.

### 2. What determines lexical scope?

A. The order in which functions are called  
B. Where code is written in the source  
C. The current value of **this**  
D. Whether a function is asynchronous

**Answer:** B. Where code is written in the source.

**Explanation:** JavaScript resolves lexical bindings using the structure of the source code. A function's caller does not dynamically change which outer variables it can see.

### 3. Which declarations are block-scoped?

A. **var** only  
B. **let** and **const**  
C. Function parameters only  
D. All declarations are global

**Answer:** B. **let** and **const**.

**Explanation:** A **let** or **const** binding belongs to its nearest enclosing block. **var** is scoped to its nearest function or the global script.

### 4. What happens if a **var** declaration appears inside an **if** block?

A. The variable is limited to that block  
B. The declaration is function-scoped, not block-scoped  
C. The code always throws a **SyntaxError**  
D. The variable becomes a constant

**Answer:** B. The declaration is function-scoped, not block-scoped.

**Explanation:** **var** does not create a new binding for an ordinary block. This is one reason **let** and **const** are often clearer.

### 5. What is the temporal dead zone?

A. The time a timer waits before running  
B. The time before a **let** or **const** declaration is initialized, when it cannot be accessed  
C. The time after a function returns  
D. A block that contains only **var** declarations

**Answer:** B. The time before a **let** or **const** declaration is initialized, when it cannot be accessed.

**Explanation:** Accessing the binding before initialization throws a **ReferenceError**.

### 6. What is a closure?

A. Any block surrounded by braces  
B. A function together with access to its lexical environment  
C. A function that always takes no parameters  
D. A loop that runs only once

**Answer:** B. A function together with access to its lexical environment.

**Explanation:** A nested or returned function can continue to use bindings from where it was created, even after the outer function has returned.

### 7. What does a closure retain?

A. Always a frozen copy of each value  
B. Access to lexical bindings  
C. Only global variables  
D. The result of the last function call

**Answer:** B. Access to lexical bindings.

**Explanation:** A closure reads the binding. If that binding's value changes, a later closure call can observe the new value.

### 8. What does this print?

~~~js
const label = "outer";

function show() {
    const label = "inner";
    console.log(label);
}

show();
console.log(label);
~~~

A. **outer**, then **outer**  
B. **inner**, then **outer**  
C. **inner**, then **inner**  
D. A **ReferenceError**

**Answer:** B. **inner**, then **outer**.

**Explanation:** The local **label** shadows the outer **label** only inside **show**. It does not reassign the outer binding.

### 9. What do callbacks created in a **for** loop with **let** usually retain?

A. One shared loop binding for every iteration  
B. A distinct per-iteration binding  
C. No access to the loop variable  
D. A copy of the whole program

**Answer:** B. A distinct per-iteration binding.

**Explanation:** A **let** loop declaration creates a binding for each iteration, so callbacks can retain the value for the iteration where each callback was created.

### 10. What is the likely result when callbacks created in a **for** loop all close over one **var** loop variable and run after the loop?

A. Each callback sees a distinct value  
B. They commonly all see the final loop value  
C. They all throw a **TypeError**  
D. The callbacks run inside the loop

**Answer:** B. They commonly all see the final loop value.

**Explanation:** **var** creates one function-scoped binding shared by the callbacks. Once the loop finishes, that binding contains the final value.

## True or false

### 11. An outer function can directly access a variable declared only inside its nested function.

**Answer:** False.

**Explanation:** Lexical lookup searches from the current scope outward. It does not search inward into a child function's local scope.

### 12. A nested function can read a binding declared in an enclosing function.

**Answer:** True.

**Explanation:** The enclosing function's scope is part of the nested function's lexical environment.

### 13. A closure always contains a snapshot of the value from the moment it was created.

**Answer:** False.

**Explanation:** A closure retains access to a binding. If the binding changes, the closure can read the updated value.

### 14. Declaring a new **const** with the same name inside a nested block changes the outer **const**.

**Answer:** False.

**Explanation:** The nested declaration shadows the outer binding only within its own scope.

### 15. A **const** object cannot have its properties changed.

**Answer:** False.

**Explanation:** **const** prevents reassignment of the binding. It does not make the referenced object immutable.

### 16. **var** is block-scoped when declared between braces.

**Answer:** False.

**Explanation:** **var** is function-scoped or global-script-scoped. Ordinary braces do not limit it.

### 17. A returned function can still access a local binding from a function that has already returned.

**Answer:** True.

**Explanation:** The returned function's closure keeps the lexical environment available while the function remains reachable.

### 18. Two calls to a closure factory can produce functions with independent local state.

**Answer:** True.

**Explanation:** Each factory call creates a new set of local bindings, so each returned function can close over a different environment.

### 19. A **let** binding can be read before its declaration without error because it is hoisted.

**Answer:** False.

**Explanation:** The binding is in scope, but access before initialization is blocked by the temporal dead zone and throws a **ReferenceError**.

### 20. JavaScript decides which outer bindings a function can access based on the function's caller.

**Answer:** False.

**Explanation:** JavaScript uses lexical scope. The code's written nesting determines the enclosing scopes.

## Short-answer questions

### 21. Explain lexical scope in your own words.

**Answer:** Lexical scope means a function's access to outer variables is determined by where the function is written in the source.

**Explanation:** A function can look for a name in its own scope and then in its enclosing scopes, moving outward.

### 22. What is shadowing?

**Answer:** Shadowing occurs when a nested scope declares a binding with the same name as a binding in an outer scope.

**Explanation:** The inner binding is used inside the nested scope. The outer binding remains unchanged and becomes visible again outside that scope.

### 23. Compare **let** and **var** scope.

**Answer:** **let** is block-scoped. **var** is function-scoped or global-script-scoped.

**Explanation:** A **let** declaration inside an **if** block is unavailable after the block. A **var** declaration inside that block remains visible in its containing function.

### 24. What happens when code reads a **let** binding before its declaration is initialized?

**Answer:** It throws a **ReferenceError**.

**Explanation:** The binding is in the temporal dead zone until the declaration is evaluated.

### 25. How can a closure provide private state?

**Answer:** Keep a value in an outer function's local binding, then return functions that read or update it.

**Explanation:** Code outside the closure cannot directly access that local name. It can use only the operations exposed by the returned functions.

### 26. Why can two calls to the same counter factory have separate counts?

**Answer:** Each factory call creates a new local count binding.

**Explanation:** Each returned function closes over the environment from its own factory call.

### 27. What is the difference between a closure and a snapshot?

**Answer:** A closure retains access to a binding; a snapshot is a copied value from a particular moment.

**Explanation:** If the binding changes after a closure is created, the closure can read the changed value. A copied primitive value does not change when its original binding is reassigned.

### 28. Why do callbacks in a **var** loop often print the same number?

**Answer:** They all close over the same function-scoped loop variable.

**Explanation:** If they run after the loop, the shared variable already holds the final loop value. Use **let** for a per-iteration binding when that behavior is desired.

### 29. Does **const** make the object it references immutable?

**Answer:** No. It prevents reassignment of the binding, not mutation of the object.

**Explanation:** A property can be changed while the **const** variable continues to refer to the same object.

### 30. What can keep a closure's outer variables reachable?

**Answer:** A reference to the closure can keep the bindings it uses reachable.

**Explanation:** While the closure is still in use, the environment it needs must remain available. Once nothing references the closure or related data, normal garbage collection can reclaim unreachable memory.

## Coding and output questions

### 31. What is printed?

~~~js
const message = "outside";

function show() {
    const message = "inside";
    console.log(message);
}

show();
console.log(message);
~~~

**Answer:**

~~~text
inside
outside
~~~

**Explanation:** The function's local binding shadows the outer binding only during the function call.

### 32. What is printed?

~~~js
function makeReader() {
    const value = "kept";
    return function () {
        return value;
    };
}

const read = makeReader();
console.log(read());
~~~

**Answer:**

~~~text
kept
~~~

**Explanation:** The returned function closes over **value**, so it can still read it after **makeReader** returns.

### 33. What is printed?

~~~js
function makeCounter() {
    let count = 0;

    return function () {
        count += 1;
        return count;
    };
}

const next = makeCounter();
console.log(next());
console.log(next());
console.log(next());
~~~

**Answer:**

~~~text
1
2
3
~~~

**Explanation:** Each call updates the same closed-over **count** binding.

### 34. Do these counters share state? What is printed?

~~~js
function makeCounter() {
    let count = 0;

    return function () {
        count += 1;
        return count;
    };
}

const first = makeCounter();
const second = makeCounter();

console.log(first());
console.log(first());
console.log(second());
~~~

**Answer:**

~~~text
1
2
1
~~~

**Explanation:** Each call to **makeCounter** creates a separate **count** binding. The two returned functions have independent state.

### 35. What is printed?

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

**Answer:**

~~~text
0
1
2
~~~

**Explanation:** A **let** loop declaration provides a separate binding for each iteration. Each callback closes over its iteration's binding.

### 36. What is printed if **let** is changed to **var** in the previous example?

**Answer:**

~~~text
3
3
3
~~~

**Explanation:** **var** creates one function-scoped **index** binding. All three callbacks read it after the loop has ended, when its value is **3**.

### 37. What does this print, and why?

~~~js
{
    const mode = "compact";
    console.log(mode);
}

console.log(typeof mode);
~~~

**Answer:**

~~~text
compact
undefined
~~~

**Explanation:** The block-scoped **mode** binding is not visible after the braces. The **typeof** operator returns the string **"undefined"** for an unresolvable identifier instead of throwing a **ReferenceError**.

### 38. What happens here?

~~~js
{
    console.log(status);
    let status = "ready";
}
~~~

**Answer:** It throws a **ReferenceError** before printing **status**.

**Explanation:** **status** is in its temporal dead zone until its declaration is initialized.

### 39. What is printed?

~~~js
const settings = { theme: "light" };
settings.theme = "dark";
console.log(settings.theme);
~~~

**Answer:**

~~~text
dark
~~~

**Explanation:** The **settings** binding is not reassigned. The object it references is mutable, so its **theme** property can change.

### 40. Complete the factory so each returned function reads its own greeting.

~~~js
function makeGreeting(name) {
    // Return a function that produces "Hello, " followed by name.
}

const greetAsha = makeGreeting("Asha");
const greetMina = makeGreeting("Mina");

console.log(greetAsha());
console.log(greetMina());
~~~

**Answer:**

~~~js
function makeGreeting(name) {
    return function () {
        return "Hello, " + name;
    };
}

const greetAsha = makeGreeting("Asha");
const greetMina = makeGreeting("Mina");

console.log(greetAsha());
console.log(greetMina());
~~~

Output:

~~~text
Hello, Asha
Hello, Mina
~~~

**Explanation:** Each call creates a new **name** binding. Each returned function closes over the binding created by its own call.

### 41. Add a setter to this closure so callers can change the private value.

~~~js
function createSetting(initialValue) {
    let value = initialValue;

    return {
        get: function () {
            return value;
        },
        set: function (nextValue) {
            // Update the closed-over value.
        }
    };
}
~~~

**Answer:**

~~~js
function createSetting(initialValue) {
    let value = initialValue;

    return {
        get: function () {
            return value;
        },
        set: function (nextValue) {
            value = nextValue;
        }
    };
}

const setting = createSetting("light");
setting.set("dark");
console.log(setting.get());
~~~

Output:

~~~text
dark
~~~

**Explanation:** Both methods close over the same **value** binding. The setter changes it, and the getter reads the updated value.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [40 - Callbacks and higher-order functions](040-callbacks-and-higher-order-functions.md) | [Open lesson](../lessons/041-lexical-scope-and-closures.md) | [Open example](../examples/041-lexical-scope-and-closures.md) | [42 - this and invocation context](042-this-and-invocation-context.md) |