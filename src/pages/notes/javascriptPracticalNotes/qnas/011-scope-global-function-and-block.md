# 11 - Scope: global, function, and block: Q&A

Use these questions to review where JavaScript names are visible, how nested scopes work, and why closures can retain private state. Each answer follows its question.

## Multiple-choice questions

### 1. What does scope describe?

A. The place where a value is stored on disk  
B. Where a name can be accessed in a program  
C. The order in which files are downloaded  
D. The visual indentation of code

**Answer: B.** Scope determines where a binding is visible and can be used.

### 2. How does JavaScript normally resolve a name that is not declared in the current scope?

A. It searches the caller's local variables first  
B. It searches enclosing lexical scopes outward  
C. It always creates a new global variable  
D. It searches every function in the program

**Answer: B.** Name lookup starts in the current lexical scope and continues through enclosing scopes until it finds a binding or reaches the outermost scope.

### 3. Which statement about lexical scope is correct?

A. A function uses the local variables of whichever function calls it  
B. A function's access to outer names is determined by where it is defined  
C. Scope changes whenever a function is called from a different file  
D. Only indentation determines scope

**Answer: B.** Lexical scope is based on the source-code nesting around a function definition, not on the call site.

### 4. Which declarations are scoped to an ordinary block?

A. **let** and **const**  
B. **var** only  
C. All declarations behave like **var**  
D. None of them

**Answer: A.** **let** and **const** are limited to their nearest enclosing block. Class declarations are also block-scoped.

### 5. What happens to a **var** declared inside an **if** block that is not inside a function?

A. It is limited to that **if** block  
B. It belongs to the surrounding script or module scope  
C. It is deleted when the block ends  
D. It is visible only inside nested functions

**Answer: B.** **var** does not use ordinary block scope. At the top level its scope is the surrounding script or module context.

### 6. What does it mean when a local binding shadows an outer binding?

A. It deletes the outer binding  
B. It temporarily hides the outer binding with a distinct inner binding  
C. It changes the outer binding's scope  
D. It copies the outer value into a global property

**Answer: B.** The inner and outer declarations are separate bindings. The inner one is selected while code is inside its scope.

### 7. Can a function read a binding from an enclosing scope?

A. Yes, if the binding is visible through its lexical scope chain  
B. No, functions can read only parameters  
C. Only when the binding is a property of **globalThis**  
D. Only after returning from the function

**Answer: A.** Inner code can access visible bindings from enclosing scopes.

### 8. Can outer code read a name declared only inside a function?

A. Yes, after the function has been called once  
B. Yes, if the inner name is a **const**  
C. No, unless the function returns or exposes a value through an interface  
D. No, and the function cannot read outer names either

**Answer: C.** A function-local name stays inside the function. Returning a value or exposing a method is a deliberate way to share a result or behavior.

### 9. What is a closure?

A. A function together with access to its surrounding lexical environment  
B. A block that has no statements  
C. A global object property  
D. A function that can never return

**Answer: A.** A closure lets a function continue to access bindings from the environment where it was created.

### 10. If **createCounter** returns a function that updates a local **count**, what can the returned function do after **createCounter** finishes?

A. It can continue reading and updating that captured binding  
B. It can only read a copy of the initial number  
C. It must recreate **count** on every call  
D. It loses access to **count** immediately

**Answer: A.** The returned function retains access to the lexical environment containing **count**.

### 11. If **createCounter** is called twice, what normally happens when each call creates its own closure?

A. Both counters always share one local binding  
B. Each call gets its own environment and counter state  
C. The second call removes the first counter  
D. Both counters become global variables

**Answer: B.** Each invocation creates a separate local binding. The returned functions retain access to their respective bindings.

### 12. Which statement about top-level declarations in JavaScript modules is correct?

A. They automatically become properties of **window**  
B. They are module-scoped and are not automatically shared with other modules  
C. They are always available in every script  
D. They cannot be imported or exported

**Answer: B.** Modules have their own top-level scope. A module shares bindings explicitly through exports and imports.

### 13. In a classic browser script, which declaration form creates a top-level property on the global object?

A. Top-level **var**  
B. Top-level **let**  
C. Top-level **const**  
D. A parameter

**Answer: A.** In a classic browser script, top-level **var** creates a property on the global object. Top-level **let** and **const** do not. Module and host behavior should be considered separately.

### 14. Which is generally the best way to avoid unnecessary global names?

A. Put every value on **window**  
B. Keep bindings inside functions or modules and share them deliberately  
C. Use **var** in every block  
D. Give every binding the same name

**Answer: B.** Local and module scope reduce collisions and make ownership clearer. Export values from modules when another module needs them.

## True or false

### 15. Inner code can read an outer binding when that binding is visible through the scope chain.

**Answer: True.** Name resolution can continue outward from an inner scope into its enclosing scopes.

### 16. A parent scope can directly read every name declared in a child function.

**Answer: False.** Visibility does not flow from the parent into names that exist only in the child scope.

### 17. The function that calls another function supplies the called function's lexical scope.

**Answer: False.** A function's lexical scope comes from where it was defined. Its call site does not replace that surrounding environment.

### 18. A **var** inside an **if** block is block-scoped.

**Answer: False.** **var** ignores ordinary block boundaries. It is function-scoped, or belongs to the surrounding script or module context when outside a function.

### 19. Two same-named bindings in nested scopes must refer to the same binding.

**Answer: False.** The inner declaration shadows the outer one, and they are distinct bindings.

### 20. A closure can keep using a local binding after the function that declared it has returned.

**Answer: True.** The closure retains access to its surrounding lexical environment.

### 21. A closure always stores a frozen copy of each captured value.

**Answer: False.** A closure retains access to bindings. If a captured binding changes, later calls can observe the updated value.

### 22. Every top-level declaration in every JavaScript environment becomes a **globalThis** property.

**Answer: False.** The behavior depends on declaration form and script type. For example, classic browser script top-level **var** differs from top-level **let**, **const**, or module declarations.

## Predict the result

### 23. What does this code print?

~~~js
const subject = "JavaScript";

function showSubject() {
  const subject = "Scope";
  console.log(subject);
}

showSubject();
console.log(subject);
~~~

**Answer:**

~~~text
Scope
JavaScript
~~~

The function's local **subject** shadows the outer binding inside **showSubject**. The outer binding remains unchanged and is used by the final log.

### 24. Does the final log succeed, and what value does it print?

~~~js
function createMessage() {
  const message = "Private";
}

createMessage();
console.log(message);
~~~

**Answer:** It does not succeed. It throws a **ReferenceError** because **message** is local to **createMessage** and is not visible in the outer scope.

### 25. What does this code print?

~~~js
const language = "JavaScript";

function readLanguage() {
  console.log(language);
}

function run() {
  const language = "Python";
  readLanguage();
}

run();
~~~

**Answer:**

~~~text
JavaScript
~~~

**readLanguage** was defined where the outer **language** binding is visible. Calling it inside **run** does not make it use **run**'s local binding.

### 26. What does this code print?

~~~js
function makeCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());
~~~

**Answer:**

~~~text
1
2
~~~

Both calls use the same **count** binding captured by the returned function. The binding is updated between calls.

### 27. What does this code print?

~~~js
function makeCounter() {
  let count = 0;
  return () => ++count;
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

Each call to **makeCounter** creates a separate local environment. **first** and **second** retain different **count** bindings.

### 28. Does this code print a value or throw an error?

~~~js
if (true) {
  const blockName = "inside";
}

console.log(blockName);
~~~

**Answer:** It throws a **ReferenceError**. **blockName** is scoped to the **if** block and cannot be accessed after the closing brace.

### 29. Does this code print a value or throw an error?

~~~js
if (true) {
  var functionName = "outside the block";
}

console.log(functionName);
~~~

**Answer:** It prints **outside the block**. The **var** declaration is not limited to the **if** block. At this top level, it belongs to the surrounding script or module context.

### 30. What do the two logs print?

~~~js
const mode = "light";

{
  const mode = "dark";
  console.log(mode);
}

console.log(mode);
~~~

**Answer:**

~~~text
dark
light
~~~

The inner **mode** shadows the outer binding only inside the braces. After the block ends, the outer binding is visible again.

## Short-answer questions

### 31. Explain the scope chain in your own words.

**Answer:** When JavaScript needs a name, it checks the current scope first. If it does not find the name, it checks the enclosing scope, then the next enclosing scope, continuing outward. The nearest matching binding is used.

### 32. What is the difference between function scope and block scope?

**Answer:** Function scope makes a name available throughout its containing function. Block scope limits a name to a pair of braces, such as an **if** body. **var** is function-scoped, while **let** and **const** are block-scoped.

### 33. Why can closures be useful for keeping state private?

**Answer:** A closure can retain access to a local binding while only exposing chosen functions that read or update it. Other code cannot access the local binding directly, so the functions provide a controlled interface.

### 34. How can a module share a binding with another module?

**Answer:** The first module exports the binding and the other module imports it. Module top-level names are not automatically visible in unrelated modules.

### 35. What does this function return, and how many separate state bindings are created?

~~~js
function makeLabeler(prefix) {
  let nextId = 1;

  return function () {
    const label = prefix + nextId;
    nextId += 1;
    return label;
  };
}

const firstLabeler = makeLabeler("item-");
const secondLabeler = makeLabeler("task-");
~~~

**Answer:** Each call to **makeLabeler** returns a function that creates labels such as **item-1** or **task-1**, then increments its own **nextId**. Two calls create two separate **nextId** bindings, each retained by its returned function.

## Coding questions

### 36. Write a function that returns a closure-based counter starting at a supplied number.

**Answer:**

~~~js
function createCounter(start) {
  let count = start;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter(5);
console.log(counter()); // 6
console.log(counter()); // 7
~~~

The **increment** function retains access to the local **count** binding after **createCounter** returns.

### 37. Create a private score with methods to add a point and read the current score.

**Answer:**

~~~js
function createScore(initialScore) {
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

const game = createScore(2);
game.addPoint();
console.log(game.getScore()); // 3
~~~

The returned methods close over the same **score** binding. Code outside the function can use the methods but cannot directly access the local name **score**.

### 38. Rewrite this so **message** is available to the caller without making it global.

~~~js
function buildMessage() {
  const message = "Done";
}

buildMessage();
~~~

**Answer:**

~~~js
function buildMessage() {
  const message = "Done";
  return message;
}

const result = buildMessage();
console.log(result); // Done
~~~

Returning a value shares the result deliberately. The local binding **message** remains inside the function.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [10 - Variables: const, let, and var](../lessons/010-variables-const-let-and-var.md) | [Open lesson](../lessons/011-scope-global-function-and-block.md) | [Open example](../examples/011-scope-global-function-and-block.md) | [12 - Hoisting and the temporal dead zone](../lessons/012-hoisting-and-the-temporal-dead-zone.md) |