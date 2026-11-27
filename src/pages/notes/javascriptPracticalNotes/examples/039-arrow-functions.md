# 39 - Arrow functions - Examples

These examples show how to write and call arrow functions. Code is displayed for copying. Each example includes expected output and an explanation.

## 1. Make an arrow with no parameters

### Question

How do you define and call an arrow function that takes no values?

### Code

~~~js
const showReady = () => {
    console.log("Ready.");
};

showReady();
~~~

### Expected output

~~~text
Ready.
~~~

### Explanation

An arrow with no parameters uses empty parentheses. Its block body runs when the function is called.

## 2. Use one parameter without parentheses

### Question

How can an arrow function with one simple parameter be written concisely?

### Code

~~~js
const greet = name => {
    console.log("Hello, " + name);
};

greet("Mina");
~~~

### Expected output

~~~text
Hello, Mina
~~~

### Explanation

Parentheses can be omitted when there is exactly one simple parameter. Keeping them is also valid.

## 3. Use multiple parameters

### Question

How do you write an arrow function with more than one parameter?

### Code

~~~js
const add = (first, second) => {
    console.log(first + second);
};

add(4, 5);
~~~

### Expected output

~~~text
9
~~~

### Explanation

Multiple parameters must be enclosed in parentheses.

## 4. Return from an expression body

### Question

How can a short arrow function return a calculated value automatically?

### Code

~~~js
const square = number => number * number;

console.log(square(7));
~~~

### Expected output

~~~text
49
~~~

### Explanation

The body is an expression without braces, so its result is returned automatically.

## 5. Return from a block body

### Question

How can an arrow function return a result when it uses braces?

### Code

~~~js
const square = number => {
    return number * number;
};

console.log(square(7));
~~~

### Expected output

~~~text
49
~~~

### Explanation

The body is a block, so the return statement sends its value to the caller.

## 6. See what happens when a block body omits return

### Question

Does the last expression in a block body return automatically?

### Code

~~~js
const square = number => {
    number * number;
};

console.log(square(7));
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

The expression is evaluated but discarded. A block body needs an explicit return to provide its value.

## 7. Return an object expression

### Question

How can an expression-bodied arrow return an object literal?

### Code

~~~js
const createPoint = (x, y) => ({ x: x, y: y });

const point = createPoint(4, 9);
console.log(point.x, point.y);
~~~

### Expected output

~~~text
4 9
~~~

### Explanation

Parentheses make the braces an object expression rather than a block body.

## 8. Use several statements in a block body

### Question

How can an arrow function perform steps before returning a value?

### Code

~~~js
const calculateTotal = (price, tax) => {
    const total = price + tax;
    console.log("Calculated.");
    return total;
};

console.log(calculateTotal(20, 3));
~~~

### Expected output

~~~text
Calculated.
23
~~~

### Explanation

A block body can contain multiple statements. It uses an explicit return to provide the final value.

## 9. Return a Boolean from an expression

### Question

How can an arrow function return the result of a comparison?

### Code

~~~js
const isAdult = age => age >= 18;

console.log(isAdult(20));
console.log(isAdult(16));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The comparison expression evaluates to a Boolean, and the expression body returns it.

## 10. Use a conditional expression in an arrow body

### Question

How can a concise arrow choose between two values?

### Code

~~~js
const getLabel = score => score >= 50 ? "Pass" : "Try again";

console.log(getLabel(72));
console.log(getLabel(32));
~~~

### Expected output

~~~text
Pass
Try again
~~~

### Explanation

The conditional expression returns one of its two values. Since the body is an expression, that value is returned automatically.

## 11. Capture this from a surrounding method

### Question

How can a nested arrow keep the this value from the method that creates it?

### Code

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

### Expected output

~~~text
Asha
~~~

### Explanation

createReader is called as a method of profile. The nested arrow captures that call's this value and keeps using it later.

## 12. Let an arrow use its enclosing function's arguments

### Question

Can an arrow read arguments from a regular function around it?

### Code

~~~js
function makeReader() {
    const readSecond = () => arguments[1];
    return readSecond();
}

console.log(makeReader("first", "second"));
~~~

### Expected output

~~~text
second
~~~

### Explanation

The arrow does not create an arguments object. It resolves arguments from makeReader.

## 13. Collect arrow arguments with a rest parameter

### Question

How can an arrow function collect any number of values?

### Code

~~~js
const showValues = (...values) => {
    console.log(values);
};

showValues("red", "blue", "green");
~~~

### Expected output

~~~text
["red", "blue", "green"]
~~~

### Explanation

The rest parameter collects supplied values into a real Array. It is clearer than relying on arguments.

## 14. See that arrow functions are not constructors

### Question

What happens if code tries to construct an arrow function with new?

### Code

~~~js
const Person = name => ({ name: name });

try {
    new Person("Mina");
} catch (error) {
    console.log(error instanceof TypeError);
}
~~~

### Expected output

~~~text
true
~~~

### Explanation

Arrow functions are not constructible. Use a class or a constructible regular function when an object must be created with new.

## 15. Check an arrow's prototype property

### Question

Does an arrow function provide the prototype property used by constructor functions?

### Code

~~~js
const getName = () => "Mina";

console.log(getName.prototype);
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

Arrow functions do not have the constructor prototype property. This is another sign that they are not meant to be called with new.

## 16. Store an arrow function for later

### Question

Does assigning an arrow function to a const run it?

### Code

~~~js
const printMessage = () => {
    console.log("Message");
};

console.log("Stored.");
printMessage();
~~~

### Expected output

~~~text
Stored.
Message
~~~

### Explanation

The assignment stores the function value. The body runs only when printMessage is called.

## 17. Inspect an inferred arrow function name

### Question

What name is inferred for an arrow assigned to a const?

### Code

~~~js
const calculateArea = (width, height) => width * height;

console.log(calculateArea.name);
console.log(calculateArea(5, 4));
~~~

### Expected output

~~~text
calculateArea
20
~~~

### Explanation

JavaScript infers a name from the const binding for diagnostics. Calling the arrow returns the calculated area.

## 18. Compare a concise expression body with a block

### Question

What is the difference between these two forms?

### Code

~~~js
const concise = number => number * 2;

const withBlock = number => {
    return number * 2;
};

console.log(concise(5));
console.log(withBlock(5));
~~~

### Expected output

~~~text
10
10
~~~

### Explanation

Both functions return the same result. The concise form has an implicit return. The block form uses an explicit return.

## 19. Use a regular method to establish this, then capture it in an arrow

### Question

How can an arrow keep the this value from a method call?

### Code

~~~js
const user = {
    name: "Ravi",

    makeNameReader() {
        return () => this.name;
    }
};

const reader = user.makeNameReader();
console.log(reader());
~~~

### Expected output

~~~text
Ravi
~~~

### Explanation

The regular method receives this from the call user.makeNameReader(). The arrow created inside it captures that value.

## 20. Keep an object return inside a block body explicit

### Question

How can a block-bodied arrow return an object?

### Code

~~~js
const createUser = (name, role) => {
    return {
        name: name,
        role: role
    };
};

const user = createUser("Asha", "editor");
console.log(user.name);
console.log(user.role);
~~~

### Expected output

~~~text
Asha
editor
~~~

### Explanation

The braces after the arrow create a block body. The return statement inside that block returns the object.

## 21. Observe the result of an expression body that calls console.log

### Question

What value does this arrow return?

### Code

~~~js
const showReady = () => console.log("Ready");

const result = showReady();
console.log(result);
~~~

### Expected output

~~~text
Ready
undefined
~~~

### Explanation

The expression body returns the result of console.log. console.log displays the message and itself returns undefined.

## Key points

- Arrow functions use => and are function expressions.
- Expression bodies return their expression. Block bodies need explicit return.
- Parenthesize object literals returned from expression bodies.
- Arrow functions use this from their surrounding scope and have no own arguments object.
- Arrow functions are not constructible and have no constructor prototype property.
- Use an arrow when its behavior fits. Use a regular function or method when its own invocation context or constructor behavior is needed.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [38 - Return values and early returns](../lessons/038-return-values-and-early-returns.md) | [Open lesson](../lessons/039-arrow-functions.md) | [Open Q&A](../qnas/039-arrow-functions.md) | [40 - Callbacks and higher-order functions](../lessons/040-callbacks-and-higher-order-functions.md) |
