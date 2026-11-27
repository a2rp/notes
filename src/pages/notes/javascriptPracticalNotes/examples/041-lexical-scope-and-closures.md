# 41 - Lexical scope and closures - Examples

These examples demonstrate where bindings are visible, how nested scopes look outward, and how closures retain access to variables. Each example includes a question, code, expected output, and explanation.

## 1. See a block-scoped binding

### Question

Where can a **const** declared inside an **if** block be used?

### Code

~~~js
if (true) {
    const status = "ready";
    console.log(status);
}

// The status binding is not available outside the block.
~~~

### Expected output

~~~text
ready
~~~

### Explanation

The **if** braces create a block. The **status** binding can be used inside that block, but code outside the braces cannot access it.

## 2. Compare var with block scope

### Question

What happens to a **var** declared inside an **if** block?

### Code

~~~js
if (true) {
    var message = "still visible";
}

console.log(message);
~~~

### Expected output

~~~text
still visible
~~~

### Explanation

**var** is not block-scoped. At the top level of a classic script it is available outside this block. Inside a function, it would be scoped to that function.

## 3. Look up a binding in an outer scope

### Question

Can an inner function use bindings from multiple enclosing scopes?

### Code

~~~js
const language = "JavaScript";

function makeDescription() {
    const subject = "lexical scope";

    function describe() {
        console.log(language + " uses " + subject + ".");
    }

    describe();
}

makeDescription();
~~~

### Expected output

~~~text
JavaScript uses lexical scope.
~~~

### Explanation

**describe** looks in its local scope, then in **makeDescription**'s scope, then in the outer scope. It finds both **subject** and **language**.

## 4. See shadowing without changing the outer value

### Question

Does a local binding with the same name overwrite the outer binding?

### Code

~~~js
const color = "blue";

function showColor() {
    const color = "green";
    console.log(color);
}

showColor();
console.log(color);
~~~

### Expected output

~~~text
green
blue
~~~

### Explanation

The function's **color** binding shadows the outer binding inside the function. It does not reassign the outer **color**.

## 5. Return a function that uses a closed-over value

### Question

Can a function use an outer local after the outer function has returned?

### Code

~~~js
function makeGreeter(name) {
    return function () {
        return "Hello, " + name;
    };
}

const greetAsha = makeGreeter("Asha");
console.log(greetAsha());
~~~

### Expected output

~~~text
Hello, Asha
~~~

### Explanation

The returned function closes over the **name** binding created by the call to **makeGreeter**. That binding remains available because the returned function uses it.

## 6. Keep state with a counter closure

### Question

How can a returned function update and remember a count between calls?

### Code

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

### Expected output

~~~text
1
2
3
~~~

### Explanation

The inner function reads and updates the same **count** binding on every call. This is a closure with private state.

## 7. Create independent closure state

### Question

Do counters created by separate factory calls share a count?

### Code

~~~js
function makeCounter() {
    let count = 0;

    return function () {
        count += 1;
        return count;
    };
}

const firstCounter = makeCounter();
const secondCounter = makeCounter();

console.log(firstCounter());
console.log(firstCounter());
console.log(secondCounter());
console.log(firstCounter());
console.log(secondCounter());
~~~

### Expected output

~~~text
1
2
1
3
2
~~~

### Explanation

Each call to **makeCounter** creates a distinct **count** binding. The two closures maintain independent state.

## 8. Expose operations for private state

### Question

How can code expose deposit and read operations while keeping the balance local?

### Code

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
console.log(wallet.balance);
~~~

### Expected output

~~~text
25
undefined
~~~

### Explanation

The returned methods close over **balance**. The value is a local binding, not a **wallet** property, so outside code cannot read it as **wallet.balance**.

## 9. Read the current value of a closed-over binding

### Question

Does a closure read the original value or the current value of a binding?

### Code

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

const status = createStatus();

console.log(status.get());
status.set("complete");
console.log(status.get());
~~~

### Expected output

~~~text
waiting
complete
~~~

### Explanation

The getter and setter share one **status** binding. The closure does not freeze a snapshot when the getter is created.

## 10. Keep each loop value with let

### Question

How can callbacks created in a loop retain a different value for each iteration?

### Code

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

### Expected output

~~~text
0
1
2
~~~

### Explanation

A **let** loop declaration creates a per-iteration binding. Each callback closes over the binding for the iteration where it was created.

## 11. Observe the shared var loop binding

### Question

What changes when the loop variable uses **var**?

### Code

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

### Expected output

~~~text
3
3
3
~~~

### Explanation

All callbacks close over the same function-scoped **index** binding. The callbacks run after the loop, when its value is **3**.

## 12. Avoid the temporal dead zone

### Question

What happens when a block-scoped binding is read before initialization?

### Code

~~~js
{
    console.log(status);
    let status = "ready";
}
~~~

### Expected result

The code throws a **ReferenceError** before it prints anything.

### Explanation

The **status** binding is in scope for the block, but it cannot be accessed before its declaration is initialized. This part of the block is the temporal dead zone.

## 13. Notice var hoisting

### Question

What is logged before the **var** assignment runs?

### Code

~~~js
function showLabel() {
    console.log(label);
    var label = "ready";
}

showLabel();
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

The **var** declaration is hoisted to the top of the function scope and initialized with **undefined**. The assignment stays at its written position, after the log.

## 14. Separate const reassignment from object mutation

### Question

Can a property of an object declared with **const** be changed?

### Code

~~~js
const settings = { theme: "light" };
settings.theme = "dark";

console.log(settings.theme);
~~~

### Expected output

~~~text
dark
~~~

### Explanation

The **settings** binding still points to the same object. **const** prevents assigning a different value to the binding, but does not make the object immutable.

## 15. Capture a value in an event-style callback

### Question

How can a callback read a local configuration value after its setup function returns?

### Code

~~~js
function makeClickHandler(buttonName) {
    return function handleClick() {
        console.log(buttonName + " was clicked");
    };
}

const saveHandler = makeClickHandler("Save");
saveHandler();
~~~

### Expected output

~~~text
Save was clicked
~~~

### Explanation

**handleClick** closes over **buttonName**. This is the same pattern used when a callback needs setup data later.

## 16. Give a closure a controlled interface

### Question

How can a closure keep a score and expose only increment and read operations?

### Code

~~~js
function createScore(initialScore) {
    let score = initialScore;

    return {
        add: function (points) {
            if (points > 0) {
                score += points;
            }
        },
        read: function () {
            return score;
        }
    };
}

const gameScore = createScore(10);
gameScore.add(7);
gameScore.add(-2);

console.log(gameScore.read());
~~~

### Expected output

~~~text
17
~~~

### Explanation

The **score** binding is private to the factory call. The methods are the only provided way to interact with it, and **add** applies the chosen validation rule.

## Practice prompts

1. Create a function that returns a function which remembers a greeting prefix.
2. Create two independent counters and show their values do not affect each other.
3. Create a private settings value with **get** and **set** methods.
4. Make callbacks in a loop with **let**, then explain why each sees its own index.
5. Change the loop to **var** and predict the output before running the code.
6. Write a nested function that reads one value from its parent scope and one from the global scope.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [40 - Callbacks and higher-order functions](040-callbacks-and-higher-order-functions.md) | [Open lesson](../lessons/041-lexical-scope-and-closures.md) | [Open Q&A](../qnas/041-lexical-scope-and-closures.md) | [42 - this and invocation context](042-this-and-invocation-context.md) |