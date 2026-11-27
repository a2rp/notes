# 39 - Arrow functions

An **arrow function** is a function expression written with an arrow between its parameter list and its body. Arrow functions are often useful for short operations and callback functions.

They can look more concise than function expressions, but they also have different behavior for **this**, **arguments**, and construction with **new**. This chapter explains the syntax, return forms, and those important limits.

## Basic arrow function syntax

A basic arrow function has parameters, an arrow, and a body:

~~~js
const greet = (name) => {
    console.log("Hello, " + name);
};

greet("Mina");
~~~

Output:

~~~text
Hello, Mina
~~~

This is a function expression assigned to the const binding greet. The function runs when greet is called.

Arrow functions do not use the **function** keyword. The arrow is written as **=>**.

## Parameter syntax

An arrow function with no parameters uses empty parentheses:

~~~js
const showReady = () => {
    console.log("Ready.");
};

showReady();
~~~

Output:

~~~text
Ready.
~~~

With exactly one simple parameter, the parentheses can be omitted:

~~~js
const double = number => {
    console.log(number * 2);
};

double(6);
~~~

Output:

~~~text
12
~~~

Parentheses are required for zero or multiple parameters. They are also needed when using default or rest parameters:

~~~js
const add = (first, second) => {
    console.log(first + second);
};

add(4, 5);
~~~

Output:

~~~text
9
~~~

Keeping parentheses around a single parameter is valid and can make the syntax consistent across a file.

## Expression bodies return their expression

When the arrow is followed by an expression without braces, that expression's value is returned automatically:

~~~js
const square = number => number * number;

console.log(square(5));
~~~

Output:

~~~text
25
~~~

This is called an **expression body**. It is useful when a function consists of one expression.

Parentheses can group a larger expression:

~~~js
const getFullName = (first, last) => first + " " + last;

console.log(getFullName("Asha", "Ranjan"));
~~~

Output:

~~~text
Asha Ranjan
~~~

## Block bodies need an explicit return

When an arrow function body uses braces, it is a **block body**. A block body works like a regular function body: use return to provide a value.

~~~js
const square = number => {
    return number * number;
};

console.log(square(5));
~~~

Output:

~~~text
25
~~~

Without return, a block-bodied arrow returns undefined:

~~~js
const square = number => {
    number * number;
};

console.log(square(5));
~~~

Output:

~~~text
undefined
~~~

The expression number * number is evaluated, but its value is not returned or otherwise used.

Choose an expression body for one expression. Use a block body when the function needs several statements or more explicit control flow.

## Returning an object literal

An object literal uses braces, which can look like the braces that start a block body. Wrap the object in parentheses so JavaScript treats it as an expression:

~~~js
const createPoint = (x, y) => ({ x: x, y: y });

const point = createPoint(3, 8);
console.log(point.x, point.y);
~~~

Output:

~~~text
3 8
~~~

Without the parentheses, the braces would begin a block body instead of creating the object value.

## Arrow functions are expressions

An arrow function creates a function value and is usually assigned to a binding:

~~~js
const printStatus = () => console.log("Saved");

printStatus();
~~~

Output:

~~~text
Saved
~~~

Like other function expressions, an arrow function can be stored and called later. It is not a function declaration and should be called after its binding has been initialized.

An arrow expression can also be written directly in a larger expression, such as a function call. Callbacks and higher-order functions are covered in the next chapter.

## Arrow functions use lexical this

Arrow functions do not create their own **this** binding. They use the this value from the surrounding scope where the arrow was created. This is often called **lexical this**.

~~~js
const profile = {
    name: "Asha",

    createReader() {
        return () => this.name;
    }
};

const readName = profile.createReader();
console.log(readName());
~~~

Output:

~~~text
Asha
~~~

The arrow inside createReader uses the this value from that method call, where this refers to profile. Calling readName later does not give the arrow a new this value.

This behavior is useful when a nested function should keep the surrounding this. An arrow is usually not the right choice for an object method that needs its own this based on how the method is called. The this chapter explains invocation context in detail.

## Arrow functions do not create their own arguments object

An arrow function does not create a local **arguments** object. If an arrow refers to arguments, it uses the nearest enclosing binding:

~~~js
function makeReader() {
    const readFirstArgument = () => arguments[0];
    return readFirstArgument();
}

console.log(makeReader("first", "second"));
~~~

Output:

~~~text
first
~~~

The arrow uses the arguments object belonging to makeReader. For new functions that need to collect values, use a rest parameter instead of relying on arguments.

## Arrow functions are not constructors

Arrow functions cannot be called with **new** to create an object:

~~~js
const Person = name => {
    this.name = name;
};

try {
    new Person("Asha");
} catch (error) {
    console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

Arrow functions do not have the construction behavior or a prototype property that constructor functions use. Use a function declaration, function expression, or class when code needs a constructor.

## Choosing between arrow and regular functions

Arrow functions are a good fit when:

- A short function expression makes an operation easier to read.
- A nested function should use the surrounding this value.
- A callback needs a concise expression body.

A regular function can be a better fit when:

- The function needs its own this based on how it is called.
- The function needs its own arguments object.
- The function must be constructible with new.
- A named function declaration communicates the structure more clearly.

Do not choose an arrow only because it uses fewer characters. Pick the form whose behavior matches what the code needs.

## Common mistakes

- **Forgetting parentheses for zero or multiple parameters:** Use parentheses unless there is exactly one simple parameter.
- **Expecting a block body to return automatically:** Braces require an explicit return when the caller needs a value.
- **Treating object braces as an expression body:** Wrap an object literal in parentheses.
- **Expecting arrow this to change when called:** Arrow functions use the surrounding this value.
- **Using arguments inside an arrow as if it were local:** An arrow has no own arguments object.
- **Using an arrow with new:** Arrow functions are not constructors.
- **Using an arrow as an object method that needs its own this:** Use a method or regular function for that behavior.

## Try it yourself

1. Write an arrow function with no parameters that prints a message.
2. Write an arrow function with one parameter and an expression body that returns its square.
3. Rewrite that function with a block body and explicit return.
4. Return an object literal from an arrow function.
5. Create an arrow inside a regular method and observe which this value it uses.
6. Try to construct an arrow function with new inside try/catch and inspect the error type.

## Key points

- Arrow functions are function expressions that use the => syntax.
- Parentheses are optional only for one simple parameter.
- An expression body returns its expression automatically. A block body needs an explicit return.
- Parenthesize an object literal returned by an expression body.
- Arrow functions use lexical this and do not create their own arguments object.
- Arrow functions cannot be constructors and cannot be called with new.
- Choose arrow or regular functions based on the behavior the code needs.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [38 - Return values and early returns](038-return-values-and-early-returns.md) | [Open Q&A](../qnas/039-arrow-functions.md) | [Open example](../examples/039-arrow-functions.md) | [40 - Callbacks and higher-order functions](040-callbacks-and-higher-order-functions.md) |
