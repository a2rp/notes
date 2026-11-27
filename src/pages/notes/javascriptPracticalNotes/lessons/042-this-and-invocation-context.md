# 42 - this and invocation context

In JavaScript, **this** is a value available inside many functions. For a regular function, its value usually depends on how the function is called. The same function can therefore see different **this** values in different calls.

Arrow functions work differently. They do not create their own **this** value. They use **this** from the surrounding lexical context.

This chapter explains method calls, detached functions, strict mode, constructors, and callbacks. The next chapter covers **call**, **apply**, and **bind**, which let code supply or preserve a receiver explicitly.

## this is not the same as a variable parameter

A regular function does not get **this** from a parameter with that name. The JavaScript call operation provides a this value according to the function form and invocation.

~~~js
function showThis() {
    return this;
}

const first = { show: showThis };
const second = { show: showThis };

console.log(first.show() === first);
console.log(second.show() === second);
~~~

Output:

~~~text
true
true
~~~

The same function is used by both objects. Each method call supplies the object before the dot as the receiver.

## Method calls provide the receiver

When a regular function is called as an object method, the object before the dot supplies **this**:

~~~js
const user = {
    name: "Mina",
    introduce: function () {
        return "I am " + this.name;
    }
};

console.log(user.introduce());
~~~

Output:

~~~text
I am Mina
~~~

The important part is the call expression **user.introduce()**. The function itself is not permanently attached to **user**. The call form supplies the receiver.

A method can be written with method shorthand too:

~~~js
const user = {
    name: "Mina",
    introduce() {
        return "I am " + this.name;
    }
};

console.log(user.introduce());
~~~

Output:

~~~text
I am Mina
~~~

## A detached method loses its object receiver

If a method is copied into a variable and called by itself, the object before the dot is no longer part of the call:

~~~js
"use strict";

const user = {
    name: "Mina",
    getName() {
        return this.name;
    }
};

const readName = user.getName;

console.log(readName());
~~~

The call throws a **TypeError** because the function is strict and **this** is **undefined**. Accessing **this.name** therefore fails.

Calling it through the object works:

~~~js
console.log(user.getName());
~~~

Output:

~~~text
Mina
~~~

A callback can lose a receiver in the same way if a method is passed without preserving its object:

~~~js
"use strict";

const user = {
    name: "Mina",
    getName() {
        return this.name;
    }
};

const readers = [user.getName];

// This callback call has no user receiver.
// readers[0]() also has no receiver in this example.
~~~

When a callback needs an object as **this**, either call the method through that object from a wrapper function or use a later chapter's explicit binding tools.

## Strict and non-strict regular functions

In strict mode, a bare call of a regular function receives **undefined** as **this**:

~~~js
"use strict";

function readThis() {
    return this;
}

console.log(readThis() === undefined);
~~~

Output:

~~~text
true
~~~

In non-strict code, a bare call with **undefined** or **null** is converted to the global object. Primitive receiver values are also converted to objects. These automatic conversions can hide mistakes, so strict mode makes missing receivers easier to notice.

JavaScript modules and class bodies are strict mode code. A function declared in one of those contexts follows strict behavior even without a local strict directive.

Avoid writing code that depends on the global-object fallback.

## Nested regular functions have their own this

A nested regular function does not automatically inherit **this** from its outer method:

~~~js
"use strict";

const team = {
    name: "North",
    showLater() {
        function report() {
            return this;
        }

        console.log(report() === undefined);
    }
};

team.showLater();
~~~

Output:

~~~text
true
~~~

The **report()** call is a bare call. Its own regular-function invocation determines its **this** value. The fact that it was written inside **showLater** does not bind it to **team**.

An arrow function can use the surrounding method's **this**:

~~~js
"use strict";

const team = {
    name: "North",
    showLater() {
        const report = () => this.name;
        console.log(report());
    }
};

team.showLater();
~~~

Output:

~~~text
North
~~~

The arrow has no own **this**. It reads the **this** value of **showLater**, whose call is **team.showLater()**.

## Arrow functions do not get this from the call site

Calling an arrow through an object does not make that object its **this**:

~~~js
const object = {
    value: 10,
    getValue: () => this.value
};
~~~

The arrow uses **this** from the surrounding code where the object literal was evaluated. It does not use **object** just because the call is written as **object.getValue()**.

For this reason, use a regular method when a method needs the receiver object:

~~~js
const object = {
    value: 10,
    getValue() {
        return this.value;
    }
};

console.log(object.getValue());
~~~

Output:

~~~text
10
~~~

Arrow functions are useful for nested callbacks that should keep the surrounding **this**. They are usually not the right choice for object methods that need their own receiver.

## Constructors receive the new object as this

A constructor function called with **new** uses the newly created object as **this**:

~~~js
function User(name) {
    this.name = name;
}

const user = new User("Asha");
console.log(user.name);
~~~

Output:

~~~text
Asha
~~~

The constructor initializes the new object. Classes also use **this** to refer to the current instance inside a constructor and its methods:

~~~js
class Counter {
    constructor(start) {
        this.value = start;
    }

    increment() {
        this.value += 1;
    }
}

const counter = new Counter(4);
counter.increment();
console.log(counter.value);
~~~

Output:

~~~text
5
~~~

Calling a class constructor without **new** throws a **TypeError**. Class code is strict mode code.

## this in callbacks

A callback's **this** behavior depends on the callback's function type and the API that calls it.

A regular callback passed to an array method does not automatically receive the surrounding object as **this**. Some array methods accept a **thisArg** argument for regular callbacks:

~~~js
const multiplier = {
    factor: 3
};

const values = [2, 4];

const results = values.map(function (value) {
    return value * this.factor;
}, multiplier);

console.log(results);
~~~

Output:

~~~text
[ 6, 12 ]
~~~

The second argument to **map** supplies **this** for this regular callback. An arrow callback would ignore that **thisArg**, because arrows use the surrounding lexical **this**.

For many callbacks, accessing a local variable from an arrow is simpler and clearer than relying on a callback **thisArg**:

~~~js
const multiplier = {
    factor: 3
};

const values = [2, 4];
const factor = multiplier.factor;

const results = values.map(value => value * factor);
console.log(results);
~~~

Output:

~~~text
[ 6, 12 ]
~~~

## Event listener callbacks in browsers

In browser event listeners registered with **addEventListener**, a regular listener function receives the event's current target as **this**:

~~~js
button.addEventListener("click", function (event) {
    console.log(this === event.currentTarget);
});
~~~

For a regular listener, **this** refers to the element on which that listener is registered. An arrow listener does not get **this** from the event system; it uses the surrounding **this** instead. Use **event.currentTarget** when the code should explicitly identify the element whose listener is running.

This example assumes a browser variable named **button** refers to an element. Event details are covered in the browser chapters.

## A practical way to reason about this

When a regular function uses **this**, inspect the call site:

1. Is it called as **object.method()**? The object before the dot is its receiver.
2. Is it called with **new**? The new instance is its receiver.
3. Is it a bare call? Strict mode uses **undefined**. Non-strict code applies legacy conversion rules.
4. Is it an arrow? Look outward to the surrounding lexical **this**.
5. Is an API invoking it as a callback? Check the API's callback contract.

Do not infer a function's **this** from where the function is stored, its name, or where it was originally declared.

## Common this mistakes

- **Assuming a method permanently belongs to its object:** A detached method call may have no object receiver.
- **Assuming a nested regular function inherits outer this:** Each regular function call has its own invocation context.
- **Using an arrow as a method that needs its object:** An arrow takes **this** from its surrounding code.
- **Expecting an arrow to use a callback thisArg:** An arrow ignores a receiver supplied by the caller.
- **Relying on non-strict global conversion:** This can turn a missing receiver into a confusing global-object access.
- **Passing a method as a callback without preserving its receiver:** The callback may later be called as a bare function.
- **Confusing lexical scope with this:** Outer variables are resolved lexically, but regular-function **this** is determined by the call.
- **Calling a class constructor without new:** Class constructors require construction and throw when called as ordinary functions.

## Try it yourself

1. Call the same regular function as a method of two different objects and compare **this**.
2. Copy a method to a variable and call it in strict mode. Explain the result.
3. Add a nested regular function to a method and inspect its **this**.
4. Change that nested function to an arrow and compare the result.
5. Write a constructor that stores a name on **this** and create an instance with **new**.
6. Use **map** with a regular callback and **thisArg** to multiply values.
7. Rewrite that example with an arrow and a local variable.
8. Explain why an arrow object method does not receive its containing object as **this**.

## Key points

- For a regular function, **this** depends on how it is called.
- In a method call, the object before the dot supplies the receiver.
- A detached method no longer receives its former object automatically.
- A strict bare function call has **this** equal to **undefined**.
- Arrow functions use the surrounding lexical **this** and ignore call-site receivers.
- **new** supplies the new instance as **this** to a constructor.
- Nested regular functions do not inherit their caller's **this**.
- Inspect the call expression and the function type to determine **this**.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [41 - Lexical scope and closures](041-lexical-scope-and-closures.md) | [Open Q&A](../qnas/042-this-and-invocation-context.md) | [Open example](../examples/042-this-and-invocation-context.md) | [43 - call, apply, and bind](043-call-apply-and-bind.md) |