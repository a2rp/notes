# 37 - Parameters, default values, rest, and arguments

A function can receive information when it is called. The names in the function definition are **parameters**. The values supplied by a call are **arguments**.

This chapter explains how JavaScript assigns arguments to parameters, what happens when values are missing, how default values work, and how to collect extra arguments with a rest parameter or the special arguments object.

## Parameters and arguments

A parameter is a name listed in the function definition. An argument is a value supplied in a call:

~~~js
function greet(name) {
    console.log("Hello, " + name);
}

greet("Mina");
~~~

Output:

~~~text
Hello, Mina
~~~

In this example, name is the parameter and "Mina" is the argument. JavaScript assigns arguments to parameters by position, from left to right.

~~~js
function describeBook(title, pages) {
    console.log(title);
    console.log(pages);
}

describeBook("The Blue Door", 240);
~~~

Output:

~~~text
The Blue Door
240
~~~

The first argument is assigned to title, and the second is assigned to pages. Parameter names help explain what each position means.

## Missing arguments

JavaScript does not require every parameter to receive an argument. A missing parameter has the value **undefined**:

~~~js
function showLanguage(language) {
    console.log(language);
}

showLanguage();
~~~

Output:

~~~text
undefined
~~~

Extra arguments are also allowed. If a function has no rest parameter, extra values are not assigned to additional named parameters. A regular function can still inspect them through its arguments object, which is covered below.

~~~js
function showFirst(value) {
    console.log(value);
}

showFirst("first", "extra");
~~~

Output:

~~~text
first
~~~

The named parameter value receives the first argument. The extra argument does not cause an error.

## Default parameter values

A default value gives a parameter a value when the caller omits that argument or passes **undefined**:

~~~js
function greet(name = "Guest") {
    console.log("Hello, " + name);
}

greet();
greet("Ravi");
greet(undefined);
~~~

Output:

~~~text
Hello, Guest
Hello, Ravi
Hello, Guest
~~~

The default is used for the first and third calls. An explicitly supplied value is used in the second call.

### Defaults apply to undefined, not every falsy value

A default parameter is used only when the argument is missing or undefined. Values such as **null**, **0**, **false**, and an empty string are passed through:

~~~js
function showCount(count = 5) {
    console.log(count);
}

showCount(undefined);
showCount(null);
showCount(0);
~~~

Output:

~~~text
5
null
0
~~~

This differs from using a logical OR expression as a fallback. The OR operator treats values such as 0, false, and an empty string as false. A parameter default preserves them.

### Default values can use earlier parameters

A default value can use a parameter that appears earlier in the list:

~~~js
function makeRange(start, end = start + 5) {
    console.log(start, end);
}

makeRange(10);
makeRange(10, 20);
~~~

Output:

~~~text
10 15
10 20
~~~

The first call uses the default end value. The second call supplies end explicitly, so the default is not used.

Defaults are evaluated when a call needs them. This means a default can be an expression:

~~~js
function createList(items = []) {
    console.log(items.length);
}

createList();
createList(["pen", "book"]);
~~~

Output:

~~~text
0
2
~~~

A fresh array is created for each call that needs the default. This avoids accidentally sharing one mutable default array between calls.

## Rest parameters collect remaining arguments

A **rest parameter** collects arguments that were not assigned to earlier parameters. Write three dots before its name:

~~~js
function showScores(first, ...otherScores) {
    console.log(first);
    console.log(otherScores);
}

showScores(90, 85, 100, 78);
~~~

Output:

~~~text
90
[85, 100, 78]
~~~

The first argument goes to first. The remaining arguments are collected in otherScores.

A rest parameter is a real Array, so array operations such as length, map, and reduce are available:

~~~js
function countItems(...items) {
    console.log(items.length);
    console.log(items.map(function (item) {
        return item.toUpperCase();
    }));
}

countItems("pen", "book");
~~~

Output:

~~~text
2
["PEN", "BOOK"]
~~~

A function can have only one rest parameter, and it must be last:

~~~js
function registerUser(role, ...permissions) {
    console.log(role);
    console.log(permissions);
}

registerUser("editor", "read", "write");
~~~

Output:

~~~text
editor
["read", "write"]
~~~

Here, role receives the first argument, while permissions receives the remaining arguments. A rest parameter cannot be followed by another parameter.

## Default parameters and rest together

A default parameter can appear before a rest parameter:

~~~js
function labelItems(prefix = "Item", ...items) {
    console.log(prefix);
    console.log(items);
}

labelItems(undefined, "book", "pen");
~~~

Output:

~~~text
Item
["book", "pen"]
~~~

The first argument is undefined, so prefix uses its default. The remaining values are collected in items.

## The arguments object

Regular functions can use the special **arguments** object to inspect the arguments passed to that call:

~~~js
function inspectArguments(first, second) {
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[2]);
}

inspectArguments("red", "blue", "green");
~~~

Output:

~~~text
3
red
green
~~~

The arguments object contains the supplied values by numeric position and has a length property. It is **array-like**, but it is not a real Array. It does not directly provide all Array methods.

You can convert it to an Array when working with a regular function:

~~~js
function listArguments() {
    const values = Array.from(arguments);
    console.log(values.map(function (value) {
        return String(value).toUpperCase();
    }));
}

listArguments("tea", "coffee");
~~~

Output:

~~~text
["TEA", "COFFEE"]
~~~

For new functions that need to collect an arbitrary number of values, prefer a rest parameter. It makes the intent visible in the function signature and gives you a real Array.

~~~js
function listValues(...values) {
    console.log(values.map(function (value) {
        return String(value).toUpperCase();
    }));
}

listValues("tea", "coffee");
~~~

Output:

~~~text
["TEA", "COFFEE"]
~~~

The arguments object belongs to a regular function's call. Arrow functions do not create their own arguments object. Arrow functions are covered in a later chapter.

## Rest and spread use similar syntax in different places

The three dots in a parameter list collect values. This is called **rest**:

~~~js
function showAll(...values) {
    console.log(values);
}
~~~

The three dots in a function call expand an iterable into separate arguments. This is called **spread**:

~~~js
const values = ["red", "blue"];

showAll(...values);
~~~

Rest collects values into an Array. Spread expands values from an iterable into a call. Their syntax is similar, but their direction is different.

## Common mistakes

- **Confusing parameters with arguments:** Parameters are names in the definition. Arguments are values in the call.
- **Assuming missing arguments cause an error:** Missing parameters normally receive undefined unless a default is provided.
- **Assuming extra arguments cause an error:** They are allowed. Use rest or arguments when you need to access them.
- **Expecting a default for null or zero:** Defaults apply to omitted values and undefined, not all falsy values.
- **Putting another parameter after rest:** The rest parameter must be last.
- **Treating arguments as an Array:** It is array-like. Use Array.from or prefer a rest parameter.
- **Sharing a mutable default value:** Use an expression such as [] when each call needs its own new array.
- **Confusing rest and spread:** Rest collects in a parameter list. Spread expands values in a call.

## Try it yourself

1. Write a function that accepts a first name and a default greeting.
2. Pass no second argument, then pass undefined, null, and an empty string. Observe which calls use the default.
3. Write a function with one required parameter and a rest parameter. Print the required value and the rest array.
4. Use the arguments object in a regular function and inspect its length and an extra value.
5. Convert arguments to an Array, then repeat the same task with a rest parameter.
6. Use spread to pass an array's values to a function that has several named parameters.

## Key points

- Parameters are names in a definition. Arguments are values supplied by a call.
- Arguments are assigned to parameters by position.
- Missing parameters normally receive undefined. Extra arguments are allowed.
- A default parameter applies when its argument is omitted or undefined.
- A rest parameter collects remaining arguments into a real Array and must be last.
- The arguments object is array-like and is available in regular functions.
- Prefer rest parameters for new code that needs to collect additional values.
- Rest collects values. Spread expands values.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [36 - Function declarations and expressions](036-function-declarations-and-expressions.md) | [Open Q&A](../qnas/037-parameters-default-values-rest-and-arguments.md) | [Open example](../examples/037-parameters-default-values-rest-and-arguments.md) | [38 - Return values and early returns](038-return-values-and-early-returns.md) |
