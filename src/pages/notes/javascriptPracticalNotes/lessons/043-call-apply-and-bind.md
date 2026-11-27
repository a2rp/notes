# 43 - call, apply, and bind

Regular function **this** usually depends on how the function is called. The methods **call**, **apply**, and **bind** let code work with a function and an explicit receiver.

- **call** invokes the function now and takes arguments one by one.
- **apply** invokes the function now and takes arguments from an array-like value.
- **bind** creates a new function with a preset receiver and optional preset arguments. It does not invoke that function immediately.

These methods are useful when reusing a function with another object, preparing a callback, or fixing some arguments in advance.

## A function to reuse

~~~js
function describe(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = {
    name: "Asha"
};
~~~

The function uses **this.name**, but it is not permanently attached to **user**. The invocation method determines the receiver.

## Call a function with call

**call** invokes a function immediately. Its first argument is the intended **this** value. Any remaining arguments are passed to the function separately:

~~~js
function describe(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Asha" };

const message = describe.call(user, "Hello", "!");
console.log(message);
~~~

Output:

~~~text
Hello, Asha!
~~~

Here, **user** becomes **this**, **"Hello"** becomes **greeting**, and **"!"** becomes **punctuation**.

The call has completed before **call** returns. The function's return value is returned by **call**.

## Call a function with apply

**apply** also invokes the function immediately and returns its result. Its first argument is the intended **this** value. Its second argument is an array or other array-like value containing the function arguments:

~~~js
function describe(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Mina" };
const details = ["Welcome", "."];

console.log(describe.apply(user, details));
~~~

Output:

~~~text
Welcome, Mina.
~~~

This is equivalent to passing **"Welcome"** and **"."** as separate arguments with **call**. Use **apply** when the arguments are already grouped in an array-like value.

When the second argument is **null** or **undefined**, the function is called without arguments:

~~~js
function countArguments() {
    return arguments.length;
}

console.log(countArguments.apply(null, null));
~~~

Output:

~~~text
0
~~~

## Compare call and apply

Both methods invoke now and both can supply a receiver. Their main difference is how they receive the function arguments:

~~~js
function addThree(a, b, c) {
    return a + b + c;
}

console.log(addThree.call(null, 2, 3, 4));
console.log(addThree.apply(null, [2, 3, 4]));
~~~

Output:

~~~text
9
9
~~~

Choose **call** when arguments are separate values. Choose **apply** when they are already in an array or array-like collection.

For many modern cases, spread syntax can pass an array as separate arguments:

~~~js
const values = [2, 3, 4];

console.log(addThree(...values));
~~~

Spread does not supply a **this** value. Use **call** or **apply** when the function needs an explicit receiver too.

## Create a function with bind

**bind** returns a new function. It does not run the original function immediately:

~~~js
function describe(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Dev" };
const describeToUser = describe.bind(user);

console.log(describeToUser("Hi", "."));
~~~

Output:

~~~text
Hi, Dev.
~~~

The new function remembers **user** as its receiver. It can be called later, including as a callback.

## Partially apply arguments with bind

**bind** can also preset one or more leading arguments:

~~~js
function describe(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Mina" };
const greetUser = describe.bind(user, "Hello");

console.log(greetUser("!"));
console.log(greetUser("."));
~~~

Output:

~~~text
Hello, Mina!
Hello, Mina.
~~~

The first argument after **user** is saved as **greeting**. Later calls supply the remaining arguments. This is called **partial application**.

Bound arguments are placed before arguments passed when the bound function is called:

~~~js
function joinWords(first, second, third) {
    return first + " " + second + " " + third;
}

const greetMina = joinWords.bind(null, "Hello", "Mina");

console.log(greetMina("!"));
~~~

Output:

~~~text
Hello Mina !
~~~

## A bound receiver cannot be replaced by call or apply

For a function returned by **bind**, later calls cannot replace its preset receiver using **call** or **apply**:

~~~js
function getName() {
    return this.name;
}

const first = { name: "Asha" };
const second = { name: "Dev" };

const boundGetName = getName.bind(first);

console.log(boundGetName());
console.log(boundGetName.call(second));
~~~

Output:

~~~text
Asha
Asha
~~~

The bound function keeps **first** as its receiver. The later **call** argument does not override it.

Binding an already bound function also does not replace its original receiver. Additional arguments can still be preset, but the first binding controls **this**.

## Arrow functions ignore an explicit this receiver

Arrow functions use lexical **this**, so **call** and **apply** cannot replace it, and **bind** cannot preset a different **this** for it:

~~~js
"use strict";

const arrow = () => this;

const receiver = { name: "Asha" };

console.log(arrow.call(receiver) === receiver);
~~~

Output:

~~~text
false
~~~

The arrow returns **this** from its surrounding scope. The receiver passed to **call** is ignored. In strict module code, top-level **this** is **undefined**.

**bind** can still preset arguments for an arrow function, but it does not change the arrow's **this**.

## Use bind for a callback that needs a receiver

Passing a method directly to a callback API can lose its receiver. **bind** can create a callback that keeps the object:

~~~js
const user = {
    name: "Asha",
    getName() {
        return this.name;
    }
};

const readName = user.getName.bind(user);
const names = [readName(), readName()];

console.log(names);
~~~

Output:

~~~text
[ 'Asha', 'Asha' ]
~~~

The bound function retains **user** as **this**, even when it is called separately from the object.

A wrapper callback is another clear option:

~~~js
const names = [user].map(function (item) {
    return item.getName();
});

console.log(names);
~~~

Output:

~~~text
[ 'Asha' ]
~~~

The wrapper calls the method through **item**, so the method receives the correct object as its receiver.

## Borrow a method for another value

A reusable function can be called with a receiver that has the data it expects:

~~~js
function getLabel() {
    return this.label;
}

const item = { label: "Notebook" };

console.log(getLabel.call(item));
~~~

Output:

~~~text
Notebook
~~~

Built-in methods can also be borrowed when their behavior fits. For example, **Array.prototype.map** can operate on an array-like object with a **length** and indexed values:

~~~js
const values = {
    0: 4,
    1: 7,
    length: 2
};

const doubled = Array.prototype.map.call(values, function (value) {
    return value * 2;
});

console.log(doubled);
~~~

Output:

~~~text
[ 8, 14 ]
~~~

The borrowed method is **map**. **call** supplies **values** as its receiver and passes the callback as the next argument.

## Bound constructors

A bound function made from a constructor function can still be used with **new**. In that case, the new instance becomes **this**; the bound receiver is ignored. Preset arguments are still used:

~~~js
function User(name, role) {
    this.name = name;
    this.role = role;
}

const makeAdmin = User.bind({ ignored: true }, "Asha");
const admin = new makeAdmin("admin");

console.log(admin.name);
console.log(admin.role);
console.log(Object.hasOwn(admin, "ignored"));
~~~

Output:

~~~text
Asha
admin
false
~~~

The **new** call creates a new instance, so the bound receiver is not used as the instance. The preset name and the later role argument are passed to the constructor.

Do not use **bind** as a way to change the receiver of an arrow function or a class constructor. Class constructors cannot be called as ordinary functions, and arrows do not have constructor behavior.

## Strict mode and thisArg conversion

**call**, **apply**, and **bind** pass the receiver to the target function. The target function's own mode determines how it treats values such as **null**, **undefined**, or a primitive.

A strict function uses the supplied receiver as-is:

~~~js
function readReceiver() {
    "use strict";
    return this;
}

console.log(readReceiver.call(null) === null);
~~~

Output:

~~~text
true
~~~

A non-strict regular function applies legacy receiver conversion rules when it runs. Prefer passing an object explicitly and using strict code so the receiver behavior is predictable.

## Common mistakes

- **Expecting call or apply to create a reusable function:** They invoke immediately. Use **bind** when a new callable function is needed.
- **Mixing up argument formats:** **call** takes separate arguments; **apply** takes an array-like argument collection.
- **Assuming bind invokes the target:** It returns a new function for later use.
- **Expecting call to override a bound receiver:** A bound function keeps its preset receiver.
- **Trying to replace arrow this:** Arrows use lexical **this**; explicit receiver arguments are ignored.
- **Forgetting bound argument order:** Preset arguments come before arguments supplied later.
- **Assuming a bound receiver wins with new:** Construction uses the new instance as **this**.
- **Using bind when a small wrapper is clearer:** A wrapper can make argument transformation or method invocation more explicit.

## Try it yourself

1. Call a greeting function with two different objects using **call**.
2. Use **apply** with an array of arguments.
3. Bind an object to a method and call the result after storing it in a variable.
4. Use **bind** to preset one argument and provide the rest later.
5. Try to replace a bound receiver with **call** and observe that the bound value remains.
6. Pass an arrow to **call** and compare its lexical **this** with the supplied receiver.
7. Borrow **Array.prototype.map** for an array-like object.
8. Bind a constructor with one preset argument and create an instance with **new**.

## Key points

- **call** invokes now with separate arguments and an explicit receiver.
- **apply** invokes now with an explicit receiver and an array-like argument collection.
- **bind** returns a new function with a preset receiver and optional preset arguments.
- A bound function retains its receiver when later called with **call** or **apply**.
- Arrow functions ignore explicit attempts to replace their lexical **this**.
- Bound arguments come before arguments supplied to the returned function.
- With **new**, a bound constructor uses the new instance as **this**.
- Use the method that matches whether the function should run now or later.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [42 - this and invocation context](042-this-and-invocation-context.md) | [Open Q&A](../qnas/043-call-apply-and-bind.md) | [Open example](../examples/043-call-apply-and-bind.md) | [44 - Recursion and the call stack](044-recursion-and-the-call-stack.md) |