# 37 - Parameters, default values, rest, and arguments - Examples

These examples show how arguments are assigned, when defaults apply, and how to collect additional values. Every snippet includes expected output and an explanation.

## 1. Pass arguments to named parameters

### Question

How does JavaScript assign argument values to parameters?

### Code

~~~js
function showBook(title, pages) {
    console.log("Title:", title);
    console.log("Pages:", pages);
}

showBook("The Blue Door", 240);
~~~

### Expected output

~~~text
Title: The Blue Door
Pages: 240
~~~

### Explanation

Arguments are assigned from left to right. The first value goes to title and the second goes to pages.

## 2. Omit an argument

### Question

What value does a missing parameter receive when it has no default?

### Code

~~~js
function showLanguage(language) {
    console.log(language);
}

showLanguage();
~~~

### Expected output

~~~text
undefined
~~~

### Explanation

The call supplies no argument, so language receives undefined.

## 3. Supply extra arguments

### Question

Does supplying more arguments than named parameters cause an error?

### Code

~~~js
function showFirst(value) {
    console.log(value);
}

showFirst("first", "extra", "another");
~~~

### Expected output

~~~text
first
~~~

### Explanation

The call is allowed. The named parameter receives the first value. The function does not use the additional values in this example.

## 4. Use a default value when an argument is omitted

### Question

How can a function use a fallback greeting when no greeting is supplied?

### Code

~~~js
function greet(name, greeting = "Hello") {
    console.log(greeting + ", " + name + ".");
}

greet("Mina");
greet("Mina", "Welcome");
~~~

### Expected output

~~~text
Hello, Mina.
Welcome, Mina.
~~~

### Explanation

The first call omits greeting and uses its default. The second provides a value, so the default is not used.

## 5. Use a default when the argument is undefined

### Question

Does an explicit undefined value activate a parameter default?

### Code

~~~js
function showPage(page = 1) {
    console.log(page);
}

showPage(undefined);
~~~

### Expected output

~~~text
1
~~~

### Explanation

An omitted argument and an explicit undefined both trigger the default.

## 6. Preserve null, zero, and false

### Question

Do null, zero, or false activate a parameter default?

### Code

~~~js
function showSetting(value = "default") {
    console.log(value);
}

showSetting(null);
showSetting(0);
showSetting(false);
~~~

### Expected output

~~~text
null
0
false
~~~

### Explanation

These values are supplied explicitly, so the default does not replace them.

## 7. Use an earlier parameter in a default

### Question

How can a later parameter default depend on a value supplied earlier?

### Code

~~~js
function makeRange(start, end = start + 5) {
    console.log("Start:", start);
    console.log("End:", end);
}

makeRange(10);
~~~

### Expected output

~~~text
Start: 10
End: 15
~~~

### Explanation

The default expression for end can read the earlier parameter start.

## 8. Override a parameter default

### Question

What happens when the caller supplies a value for the parameter that has a default?

### Code

~~~js
function makeRange(start, end = start + 5) {
    console.log(start, end);
}

makeRange(10, 30);
~~~

### Expected output

~~~text
10 30
~~~

### Explanation

Because end receives 30, JavaScript does not evaluate its default expression.

## 9. Create a fresh default array for each call

### Question

How can each call get its own array when no array is supplied?

### Code

~~~js
function addTag(tag, tags = []) {
    tags.push(tag);
    console.log(tags);
}

addTag("new");
addTag("sale");
~~~

### Expected output

~~~text
["new"]
["sale"]
~~~

### Explanation

The default expression [] runs separately for each call that needs it. The two calls do not share one default array.

## 10. Evaluate a default only when needed

### Question

How can a default value be generated only for calls that omit it?

### Code

~~~js
let counter = 0;

function createId() {
    counter += 1;
    return counter;
}

function showId(id = createId()) {
    console.log(id);
}

showId();
showId(100);
showId();
~~~

### Expected output

~~~text
1
100
2
~~~

### Explanation

createId runs when id is omitted. It does not run for the call that supplies 100.

## 11. Collect remaining values with rest

### Question

How can a function receive one named value and collect all later values?

### Code

~~~js
function showScores(firstScore, ...otherScores) {
    console.log("First:", firstScore);
    console.log("Others:", otherScores);
}

showScores(92, 88, 100, 76);
~~~

### Expected output

~~~text
First: 92
Others: [88, 100, 76]
~~~

### Explanation

The first argument goes to firstScore. The rest parameter collects the remaining values into an Array.

## 12. Use Array methods on a rest parameter

### Question

How can a function uppercase every supplied word?

### Code

~~~js
function showUppercase(...words) {
    const uppercaseWords = words.map(function (word) {
        return word.toUpperCase();
    });

    console.log(uppercaseWords);
}

showUppercase("red", "blue");
~~~

### Expected output

~~~text
["RED", "BLUE"]
~~~

### Explanation

words is a real Array, so map can be called directly.

## 13. Combine a default parameter and a rest parameter

### Question

How does a rest parameter collect values after a defaulted parameter?

### Code

~~~js
function labelItems(label = "Items", ...items) {
    console.log(label);
    console.log(items);
}

labelItems(undefined, "book", "pen");
~~~

### Expected output

~~~text
Items
["book", "pen"]
~~~

### Explanation

The first argument is undefined, so label uses its default. The later arguments are collected in items.

## 14. Collect values when there is no named parameter

### Question

What does an empty rest parameter collect when no arguments are supplied?

### Code

~~~js
function showAll(...values) {
    console.log(values);
}

showAll();
showAll("a", "b");
~~~

### Expected output

~~~text
[]
["a", "b"]
~~~

### Explanation

Rest always provides an Array. With no arguments, that Array is empty.

## 15. Inspect all supplied arguments

### Question

How can a regular function inspect arguments beyond its named parameters?

### Code

~~~js
function inspect(first, second) {
    console.log("Count:", arguments.length);
    console.log("First:", arguments[0]);
    console.log("Extra:", arguments[2]);
}

inspect("red", "blue", "green");
~~~

### Expected output

~~~text
Count: 3
First: red
Extra: green
~~~

### Explanation

arguments contains all values supplied to this regular function call, including values with no matching named parameter.

## 16. Convert arguments to a real Array

### Question

How can you use an Array method on the arguments object?

### Code

~~~js
function showUppercaseArguments() {
    const values = Array.from(arguments);
    console.log(values.map(function (value) {
        return String(value).toUpperCase();
    }));
}

showUppercaseArguments("tea", "coffee");
~~~

### Expected output

~~~text
["TEA", "COFFEE"]
~~~

### Explanation

arguments is array-like rather than a real Array. Array.from copies its indexed values into an Array that supports map.

## 17. Prefer rest when collecting values in new code

### Question

How can the previous example be written with an explicit rest parameter?

### Code

~~~js
function showUppercaseValues(...values) {
    console.log(values.map(function (value) {
        return String(value).toUpperCase();
    }));
}

showUppercaseValues("tea", "coffee");
~~~

### Expected output

~~~text
["TEA", "COFFEE"]
~~~

### Explanation

The rest parameter declares the collection directly in the function signature and already provides an Array.

## 18. See the difference between rest and spread

### Question

How can an array supply separate arguments to a function?

### Code

~~~js
function showPair(first, second) {
    console.log("First:", first);
    console.log("Second:", second);
}

const values = ["left", "right"];
showPair(...values);
~~~

### Expected output

~~~text
First: left
Second: right
~~~

### Explanation

Spread expands values from the array into separate call arguments. Rest works in the other direction by collecting arguments in a parameter list.

## 19. Compare a default parameter with a logical OR fallback

### Question

Which approach preserves zero as a valid input?

### Code

~~~js
function withOrFallback(value) {
    return value || 10;
}

function withDefault(value = 10) {
    return value;
}

console.log(withOrFallback(0));
console.log(withDefault(0));
~~~

### Expected output

~~~text
10
0
~~~

### Explanation

The OR operator treats zero as falsy and replaces it. A default parameter only replaces undefined or an omitted argument, so it preserves zero.

## 20. See that argument position matters

### Question

What happens when the caller supplies values in the wrong order?

### Code

~~~js
function describePerson(name, age) {
    console.log("Name:", name);
    console.log("Age:", age);
}

describePerson(30, "Ravi");
~~~

### Expected output

~~~text
Name: 30
Age: Ravi
~~~

### Explanation

JavaScript assigns arguments by position. It does not inspect their meaning or automatically match values to parameter names. Clear call sites and validation help prevent mistakes.

## Key points

- Values are assigned to parameters by position.
- Missing values become undefined unless a default applies.
- Defaults apply to omitted values and undefined, but preserve null, zero, false, and empty strings.
- Rest gathers extra values into a real Array.
- arguments provides a regular function with an array-like view of every supplied value.
- Use spread to expand an iterable into separate call arguments.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [36 - Function declarations and expressions](../lessons/036-function-declarations-and-expressions.md) | [Open lesson](../lessons/037-parameters-default-values-rest-and-arguments.md) | [Open Q&A](../qnas/037-parameters-default-values-rest-and-arguments.md) | [38 - Return values and early returns](../lessons/038-return-values-and-early-returns.md) |
