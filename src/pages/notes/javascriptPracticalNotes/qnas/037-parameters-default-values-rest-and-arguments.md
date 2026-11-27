# 37 - Parameters, default values, rest, and arguments - Q&A

Use these questions to review function inputs, defaults, rest parameters, and the arguments object. Each answer appears directly after its question.

## Multiple-choice questions

### 1. In a function definition, what is a parameter?

A. A value supplied by the caller  
B. A name that receives a value in a function call  
C. A value returned from a function  
D. An error object

**Answer:** B.

**Explanation:** Parameters are names in the function definition. Arguments are the values supplied when calling it.

### 2. What normally happens when a function is called without a value for a parameter?

A. The function call always fails  
B. The parameter receives undefined  
C. The parameter receives null  
D. The parameter is removed

**Answer:** B.

**Explanation:** Missing arguments are assigned as undefined unless a default parameter supplies another value.

### 3. When does a default parameter value apply?

A. Whenever an argument is falsy  
B. Only when the caller passes null  
C. When the argument is omitted or undefined  
D. Every time the function is called

**Answer:** C.

**Explanation:** Values such as null, 0, false, and an empty string do not trigger a parameter default.

### 4. What does a rest parameter collect?

A. The function's return values  
B. Arguments left after earlier parameters receive their values  
C. Variables from an outer scope  
D. Only string arguments

**Answer:** B.

**Explanation:** A rest parameter gathers the remaining positional arguments into an Array.

### 5. Where must a rest parameter appear?

A. First in every parameter list  
B. Anywhere, including after another rest parameter  
C. Last in the parameter list  
D. After the function body

**Answer:** C.

**Explanation:** A rest parameter must be last. A parameter cannot follow it.

### 6. Which statement about the arguments object is correct?

A. It is always a real Array  
B. It is an array-like object in regular functions  
C. It exists as an own object in every arrow function  
D. It contains only named parameters

**Answer:** B.

**Explanation:** The arguments object has indexed values and a length property, but it does not directly provide all Array methods.

### 7. What is a good choice for collecting an arbitrary number of values in new code?

A. A rest parameter  
B. The caller's local variables  
C. A global variable  
D. A default parameter

**Answer:** A.

**Explanation:** A rest parameter communicates the behavior in the function signature and produces a real Array.

### 8. What is the difference between rest and spread?

A. Rest expands values; spread collects them  
B. Rest collects values; spread expands them  
C. They are identical  
D. Rest is only for numbers

**Answer:** B.

**Explanation:** Rest appears in a parameter list and collects remaining arguments. Spread appears in a call or other expression and expands an iterable.

### 9. What does arguments.length represent in a regular function?

A. The number of parameters written in its definition  
B. The number of arguments supplied to that call  
C. The number of returned values  
D. The number of rest parameters

**Answer:** B.

**Explanation:** The arguments object's length reflects the values passed to that particular call.

## True or false

### 10. Arguments are assigned to parameters by their position in the call.

**Answer:** True.

**Explanation:** The first argument goes to the first parameter, the second to the second, and so on.

### 11. Passing too many arguments to a function automatically throws an error.

**Answer:** False.

**Explanation:** Extra arguments are allowed. Named parameters do not receive them, but a regular function can inspect them through arguments, or a function can collect them with rest.

### 12. Passing null to a parameter with a default value activates the default.

**Answer:** False.

**Explanation:** A default applies to an omitted argument or undefined. null is an explicit value.

### 13. Passing 0 to a parameter with a default value activates the default.

**Answer:** False.

**Explanation:** Zero is a supplied value. A parameter default does not treat every falsy value as missing.

### 14. A rest parameter is a real Array.

**Answer:** True.

**Explanation:** It can directly use Array properties and methods such as length and map.

### 15. The arguments object can be used directly with every Array method.

**Answer:** False.

**Explanation:** It is array-like, not a real Array. Convert it with Array.from or use a rest parameter.

### 16. A default expression is evaluated only when the default is needed.

**Answer:** True.

**Explanation:** If the caller supplies a value other than undefined, JavaScript uses that value without evaluating the default expression.

### 17. A default parameter can use a parameter that appears before it.

**Answer:** True.

**Explanation:** Earlier parameters are available to later default expressions.

### 18. A regular function's arguments object includes extra supplied values that have no named parameter.

**Answer:** True.

**Explanation:** arguments represents the call's supplied values by position, including extra values.

## Predict the output

### 19. What does this code print?

~~~js
function showName(name) {
    console.log(name);
}

showName();
~~~

**Answer:**

~~~text
undefined
~~~

**Explanation:** No argument was supplied, so name receives undefined.

### 20. What does this code print?

~~~js
function greet(name = "Guest") {
    console.log(name);
}

greet();
greet(undefined);
greet("Mina");
~~~

**Answer:**

~~~text
Guest
Guest
Mina
~~~

**Explanation:** The first call omits the argument and the second passes undefined, so both use the default. The third supplies a value.

### 21. What does this code print?

~~~js
function showValue(value = 10) {
    console.log(value);
}

showValue(null);
showValue(0);
showValue(false);
~~~

**Answer:**

~~~text
null
0
false
~~~

**Explanation:** null, zero, and false are explicitly supplied values. Defaults are not general falsy-value fallbacks.

### 22. What does this code print?

~~~js
function makeRange(start, end = start + 2) {
    console.log(start, end);
}

makeRange(5);
makeRange(5, 10);
~~~

**Answer:**

~~~text
5 7
5 10
~~~

**Explanation:** The first call evaluates the default using start. The second call provides end explicitly.

### 23. What does this code print?

~~~js
function showFirst(first, ...others) {
    console.log(first);
    console.log(others);
}

showFirst("a", "b", "c");
~~~

**Answer:**

~~~text
a
["b", "c"]
~~~

**Explanation:** first receives the first argument, and the rest parameter collects all remaining arguments into an Array.

### 24. What does this code print?

~~~js
function inspect(first, second) {
    console.log(arguments.length);
    console.log(arguments[2]);
}

inspect("one", "two", "extra");
~~~

**Answer:**

~~~text
3
extra
~~~

**Explanation:** arguments.length counts all three supplied values, including the extra argument. The third value is available at index 2.

### 25. What does this code print?

~~~js
function inspect(first, ...others) {
    console.log(arguments.length);
    console.log(others.length);
}

inspect("one", "two", "three");
~~~

**Answer:**

~~~text
3
2
~~~

**Explanation:** arguments.length counts every supplied argument. The rest array excludes the value already assigned to first.

### 26. What does this code print?

~~~js
function showItems(prefix = "Item", ...items) {
    console.log(prefix);
    console.log(items);
}

showItems(undefined, "book", "pen");
~~~

**Answer:**

~~~text
Item
["book", "pen"]
~~~

**Explanation:** The first argument is undefined, so prefix uses its default. The remaining two values go into items.

### 27. What does this code print?

~~~js
function inspect() {
    const values = Array.from(arguments);
    console.log(values.map(function (value) {
        return value * 2;
    }));
}

inspect(2, 4, 6);
~~~

**Answer:**

~~~text
[4, 8, 12]
~~~

**Explanation:** Array.from converts the array-like arguments object into a real Array. The resulting array can use map.

### 28. What does this code print on each call?

~~~js
function addTag(tag, tags = []) {
    tags.push(tag);
    console.log(tags);
}

addTag("new");
addTag("sale");
~~~

**Answer:**

~~~text
["new"]
["sale"]
~~~

**Explanation:** The default array expression is evaluated separately for each call that needs it, so each call receives a fresh array.

## Short-answer questions

### 29. How are parameters different from arguments?

**Answer:** Parameters are names in the function definition. Arguments are values supplied by a function call.

**Explanation:** The parameter names receive argument values according to their position.

### 30. What is the value of a missing parameter when no default is declared?

**Answer:** undefined.

**Explanation:** JavaScript allows a call to omit arguments. The corresponding parameters receive undefined.

### 31. What happens to an extra argument when the function has no rest parameter?

**Answer:** It is not assigned to an additional named parameter. The call still succeeds, and a regular function can inspect it through arguments.

**Explanation:** JavaScript does not automatically reject a call for supplying more values than the definition lists.

### 32. Why might a default parameter be clearer than using a logical OR fallback?

**Answer:** A default parameter only replaces an omitted value or undefined. A logical OR expression also replaces values such as 0, false, and an empty string.

**Explanation:** Use the default parameter when those falsy values are valid inputs that should be preserved.

### 33. Why prefer a rest parameter over arguments in new code?

**Answer:** Rest makes the collection explicit in the parameter list and provides a real Array.

**Explanation:** The arguments object is less direct and is only array-like.

### 34. What is an array-like object?

**Answer:** An object that has indexed values and a length property but is not itself an Array.

**Explanation:** arguments is a common example. Array.from can convert it when Array methods are needed.

### 35. Can a rest parameter appear before a later named parameter?

**Answer:** No.

**Explanation:** The rest parameter collects all remaining arguments, so it must be last.

### 36. What does an explicit undefined argument do to a default parameter?

**Answer:** It triggers the default value.

**Explanation:** An omitted argument and an explicitly passed undefined both cause the default expression to be used.

### 37. Does a default parameter treat null as missing?

**Answer:** No.

**Explanation:** null is a supplied value. The parameter receives null instead of its default.

### 38. What is the difference between rest and spread in this example?

~~~js
function printValues(...values) {
    console.log(values);
}

const colors = ["red", "blue"];
printValues(...colors);
~~~

**Answer:** The rest parameter collects function arguments into values. The spread syntax expands the colors array into separate arguments to the call.

**Explanation:** The same three-dot syntax has different roles depending on where it appears.

## Coding questions

### 39. Write a function with a default greeting and a name parameter.

**Answer:**

~~~js
function greet(name, greeting = "Hello") {
    console.log(greeting + ", " + name + ".");
}

greet("Asha");
greet("Asha", "Welcome");
~~~

~~~text
Hello, Asha.
Welcome, Asha.
~~~

**Explanation:** The first call omits greeting and uses its default. The second supplies its own greeting.

### 40. Write a function that collects any number of prices and prints their count.

**Answer:**

~~~js
function showPriceCount(...prices) {
    console.log(prices.length);
}

showPriceCount(10, 20, 30);
~~~

~~~text
3
~~~

**Explanation:** The rest parameter prices contains all supplied arguments in an Array.

### 41. Write a function with a required label and a rest parameter for remaining values.

**Answer:**

~~~js
function describeValues(label, ...values) {
    console.log(label);
    console.log(values);
}

describeValues("Colors", "red", "green", "blue");
~~~

~~~text
Colors
["red", "green", "blue"]
~~~

**Explanation:** The first argument is assigned to label. Every later argument is collected in values.

### 42. Convert the arguments object into an Array and print its values.

**Answer:**

~~~js
function printArguments() {
    const values = Array.from(arguments);
    console.log(values);
}

printArguments("a", "b", "c");
~~~

~~~text
["a", "b", "c"]
~~~

**Explanation:** arguments is array-like. Array.from creates a real Array from its indexed values.

### 43. Use spread to pass an array into a function with named parameters.

**Answer:**

~~~js
function showPair(first, second) {
    console.log(first, second);
}

const pair = ["left", "right"];
showPair(...pair);
~~~

~~~text
left right
~~~

**Explanation:** Spread expands the array's two values into separate arguments. The function assigns them by position.

## Key points

- Parameters are the names in a function definition. Arguments are values from a call.
- Missing arguments become undefined unless a default is used.
- Defaults apply only to omitted arguments or undefined, not null, zero, false, or an empty string.
- A rest parameter collects remaining values into an Array and must be last.
- arguments is an array-like object in regular functions. Convert it before using Array methods.
- Prefer rest for new functions that collect additional values.
- Rest collects; spread expands.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [36 - Function declarations and expressions](../lessons/036-function-declarations-and-expressions.md) | [Open lesson](../lessons/037-parameters-default-values-rest-and-arguments.md) | [Open example](../examples/037-parameters-default-values-rest-and-arguments.md) | [38 - Return values and early returns](../lessons/038-return-values-and-early-returns.md) |
