# 43 - call, apply, and bind - Examples

These examples show when **call**, **apply**, and **bind** invoke a function, how they handle the receiver, and how bound arguments work. Each example includes complete code, expected output or result, and an explanation.

## 1. Call a function with an explicit receiver

### Question

How can a function use a chosen object as **this** for one immediate call?

### Code

~~~js
function introduce(greeting) {
    return greeting + ", " + this.name;
}

const user = { name: "Asha" };

console.log(introduce.call(user, "Hello"));
~~~

### Expected output

~~~text
Hello, Asha
~~~

### Explanation

**call** invokes **introduce** immediately. Its first argument, **user**, becomes the receiver. The next argument is passed to **greeting**.

## 2. Pass separate arguments with call

### Question

How does **call** pass multiple normal arguments?

### Code

~~~js
function describe(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Mina" };

console.log(describe.call(user, "Welcome", "!"));
~~~

### Expected output

~~~text
Welcome, Mina!
~~~

### Explanation

After the receiver argument, **call** takes each target argument separately and in order.

## 3. Use apply with an array of arguments

### Question

How can an array of argument values be passed to a function that should run now?

### Code

~~~js
function describe(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Dev" };
const args = ["Hi", "."];

console.log(describe.apply(user, args));
~~~

### Expected output

~~~text
Hi, Dev.
~~~

### Explanation

**apply** receives the receiver first and an array-like argument collection second. It then invokes the target immediately.

## 4. Compare call and apply

### Question

How do **call** and **apply** invoke the same function with equivalent arguments?

### Code

~~~js
function add(a, b, c) {
    return a + b + c;
}

console.log(add.call(null, 2, 3, 4));
console.log(add.apply(null, [2, 3, 4]));
~~~

### Expected output

~~~text
9
9
~~~

### Explanation

Both calls invoke **add** immediately. **call** receives separate values, while **apply** receives one collection.

## 5. Create a bound function for later

### Question

How can a method keep its receiver after being copied into a variable?

### Code

~~~js
const user = {
    name: "Asha",
    getName() {
        return this.name;
    }
};

const readName = user.getName.bind(user);

console.log(readName());
~~~

### Expected output

~~~text
Asha
~~~

### Explanation

**bind** returns a new function that retains **user** as its receiver. The bound function can be called later without method syntax.

## 6. Preset one argument with bind

### Question

How can a function be prepared with a greeting that is reused on later calls?

### Code

~~~js
function greet(greeting, name) {
    return greeting + ", " + name + "!";
}

const greetWithHello = greet.bind(null, "Hello");

console.log(greetWithHello("Mina"));
console.log(greetWithHello("Dev"));
~~~

### Expected output

~~~text
Hello, Mina!
Hello, Dev!
~~~

### Explanation

The first target argument is preset to **"Hello"**. Each later call supplies the remaining **name** argument. The function does not need a receiver, so **null** is used as the bound receiver.

## 7. Check the order of bound arguments

### Question

Where do arguments provided to **bind** appear relative to arguments provided later?

### Code

~~~js
function join(first, second, third) {
    return first + "-" + second + "-" + third;
}

const joinStartingWithA = join.bind(null, "A");

console.log(joinStartingWithA("B", "C"));
~~~

### Expected output

~~~text
A-B-C
~~~

### Explanation

The argument preset by **bind** is placed first. Later arguments fill the remaining parameters in order.

## 8. call cannot replace a bound receiver

### Question

Can a later **call** change which object a bound function uses as **this**?

### Code

~~~js
function getName() {
    return this.name;
}

const first = { name: "First" };
const second = { name: "Second" };
const getFirstName = getName.bind(first);

console.log(getFirstName());
console.log(getFirstName.call(second));
~~~

### Expected output

~~~text
First
First
~~~

### Explanation

The receiver was fixed when **getName** was bound to **first**. A later **call(second)** does not replace it.

## 9. A later bind does not replace the first receiver

### Question

What happens when one bound function is bound to a different receiver?

### Code

~~~js
function getName() {
    return this.name;
}

const first = { name: "First" };
const second = { name: "Second" };

const firstBound = getName.bind(first);
const secondBound = firstBound.bind(second);

console.log(secondBound());
~~~

### Expected output

~~~text
First
~~~

### Explanation

Binding an already bound function does not replace the receiver saved by the first **bind**. Additional arguments can still be preset.

## 10. Arrow functions ignore a receiver passed to call

### Question

Can **call** replace the lexical **this** of an arrow function?

### Code

~~~js
"use strict";

const arrow = () => this;
const receiver = { name: "Asha" };

console.log(arrow.call(receiver) === receiver);
~~~

### Expected output

~~~text
false
~~~

### Explanation

The arrow returns **this** from its surrounding scope. The receiver passed to **call** is ignored. In a module, top-level **this** is **undefined**.

## 11. Use bind to preset arguments for an arrow

### Question

Can **bind** preset normal arguments for an arrow even though it cannot change its **this**?

### Code

~~~js
const multiply = (factor, value) => factor * value;
const double = multiply.bind(null, 2);

console.log(double(5));
~~~

### Expected output

~~~text
10
~~~

### Explanation

**bind** presets the first normal argument, **factor**. The **thisArg** has no effect on the arrow's lexical **this**, but the argument binding still works.

## 12. Bind a method for use as a callback

### Question

How can a method be passed as a callback while keeping its object receiver?

### Code

~~~js
const user = {
    name: "Mina",
    getName() {
        return this.name;
    }
};

const readName = user.getName.bind(user);
const callbacks = [readName, readName];

console.log(callbacks.map(function (callback) {
    return callback();
}));
~~~

### Expected output

~~~text
[ 'Mina', 'Mina' ]
~~~

### Explanation

Each callback is the bound function. It keeps **user** as its receiver even though it is called separately.

## 13. Use a wrapper callback instead of bind

### Question

How can a callback call a method through its owning object without **bind**?

### Code

~~~js
const user = {
    name: "Dev",
    getName() {
        return this.name;
    }
};

const users = [user];

const names = users.map(function (item) {
    return item.getName();
});

console.log(names);
~~~

### Expected output

~~~text
[ 'Dev' ]
~~~

### Explanation

The wrapper calls **item.getName()** as a method, so **item** is its receiver. This is useful when the callback needs extra logic or argument changes.

## 14. Borrow Array.prototype.map for an array-like value

### Question

Can **map** process an object that has indexed values and a **length**?

### Code

~~~js
const arrayLike = {
    0: 3,
    1: 6,
    2: 9,
    length: 3
};

const doubled = Array.prototype.map.call(arrayLike, function (value) {
    return value * 2;
});

console.log(doubled);
~~~

### Expected output

~~~text
[ 6, 12, 18 ]
~~~

### Explanation

**call** supplies **arrayLike** as the receiver for **map**. The borrowed method reads its indexed entries and returns a new real array.

## 15. Use apply with an array-like argument collection

### Question

How can **apply** pass indexed values from an array-like object as separate arguments?

### Code

~~~js
function list(first, second, third) {
    return first + ", " + second + ", " + third;
}

const values = {
    0: "red",
    1: "green",
    2: "blue",
    length: 3
};

console.log(list.apply(null, values));
~~~

### Expected output

~~~text
red, green, blue
~~~

### Explanation

**apply** reads the array-like object's indexed values according to its **length** and passes them as the target function's arguments.

## 16. Construct an instance with a bound constructor

### Question

What happens to the receiver and preset arguments when a bound constructor is used with **new**?

### Code

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

### Expected output

~~~text
Asha
admin
false
~~~

### Explanation

The constructor has **"Asha"** preset as the name. **new** creates a new instance and uses that instance as **this**, so the bound receiver is ignored. The later argument supplies the role.

## 17. Preserve null in a strict function

### Question

What receiver does a strict function get from **call(null)**?

### Code

~~~js
function returnThis() {
    "use strict";
    return this;
}

console.log(returnThis.call(null) === null);
~~~

### Expected output

~~~text
true
~~~

### Explanation

A strict function uses the supplied receiver as-is. A non-strict function applies legacy receiver conversions when it runs.

## Practice prompts

1. Use **call** to run one greeting function for two different objects.
2. Use **apply** to pass three values from an array.
3. Create a bound function with a preset receiver and call it later.
4. Use **bind** to preset the first two arguments of a function.
5. Attempt to replace a bound function's receiver with **call** and compare the result.
6. Pass an arrow to **apply** and verify that the supplied receiver does not replace its lexical **this**.
7. Borrow an array method for an array-like object.
8. Bind a constructor with a preset first argument and create an instance with **new**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [42 - this and invocation context](042-this-and-invocation-context.md) | [Open lesson](../lessons/043-call-apply-and-bind.md) | [Open Q&A](../qnas/043-call-apply-and-bind.md) | [44 - Recursion and the call stack](044-recursion-and-the-call-stack.md) |