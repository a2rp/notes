# 55 - Object and array destructuring: Q&A

This Q&A reviews object and array destructuring, defaults, aliases, nested patterns, rest, assignment syntax, and function parameters. Each answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. What does this pattern read?

~~~js
const { name } = user;
~~~

A. The first value in user  
B. The name property of user  
C. A variable called user.name  
D. Every property of user

**Answer: B. The name property of user.**

**Explanation:** An object pattern selects a property by its key. The local binding is also named name.

### 2. How can the displayName property be stored in a local variable called label?

A. { label: displayName }  
B. { displayName: label }  
C. [displayName: label]  
D. { displayName = label }

**Answer: B. { displayName: label }**

**Explanation:** In an object pattern, the source property name comes before the colon and the local binding name comes after it.

### 3. What values cause this default to be used?

~~~js
const { count = 5 } = source;
~~~

A. Only when count is undefined or missing  
B. Whenever count is falsy  
C. Only when count is null  
D. Whenever source has no properties

**Answer: A. Only when count is undefined or missing.**

**Explanation:** Destructuring defaults apply to undefined. They do not replace null, false, zero, or an empty string.

### 4. What does an array pattern use to obtain values?

A. Only numeric property access  
B. The iterable protocol  
C. Object.keys  
D. The length property alone

**Answer: B. The iterable protocol.**

**Explanation:** Array destructuring consumes values from an iterator. Arrays, strings, Sets, and generators can be used. A plain object with numeric keys is not automatically iterable.

### 5. Which pattern skips the second value and binds the third?

A. [first, third]  
B. [first, , third]  
C. [first: , third]  
D. [...first, third]

**Answer: B. [first, , third]**

**Explanation:** The extra comma creates an elision. It advances past one value without creating a binding for it.

### 6. Where can an array rest element appear?

A. First only  
B. In any position  
C. Last only  
D. Before a default only

**Answer: C. Last only.**

**Explanation:** A rest element gathers all remaining iterator values, so no later binding could receive a separate value.

### 7. What does object rest collect?

~~~js
const { id, ...details } = source;
~~~

A. Every inherited property  
B. Remaining own enumerable properties  
C. Only symbol properties  
D. The source object itself

**Answer: B. Remaining own enumerable properties.**

**Explanation:** The rest object contains the remaining enumerable own properties, excluding those already selected. It is a shallow copy.

### 8. What does this statement do?

~~~js
[x, y] = [4, 9];
~~~

A. Declares new const bindings x and y  
B. Assigns values to existing targets x and y  
C. Creates an array named x  
D. Reads x and y from the right-hand array

**Answer: B. Assigns values to existing targets x and y.**

**Explanation:** This is destructuring assignment, not a declaration. The targets must already be valid assignment targets.

### 9. Why are parentheses used here?

~~~js
({ name } = source);
~~~

A. To make name constant  
B. To make the braces parse as an object assignment pattern  
C. To convert source to JSON  
D. To create a new object

**Answer: B. To make the braces parse as an object assignment pattern.**

**Explanation:** At the start of a statement, braces could be parsed as a block. Parentheses clarify that this is an assignment expression.

### 10. What happens if a function with parameter pattern function show({ name }) is called with no argument?

A. name becomes null  
B. name becomes undefined  
C. A TypeError is thrown while destructuring the missing argument  
D. The function is skipped

**Answer: C. A TypeError is thrown while destructuring the missing argument.**

**Explanation:** The parameter pattern attempts to read a property from undefined. Add a whole-parameter default such as { name } = {} if omission is allowed.

### 11. What is the result of this pattern?

~~~js
const [first, second] = "Hi";
~~~

A. A TypeError because strings are not iterable  
B. first is "H" and second is "i"  
C. first is "Hi" and second is undefined  
D. Both values are numbers

**Answer: B. first is "H" and second is "i".**

**Explanation:** Strings are iterable. Their iterator yields string values by Unicode code point.

### 12. Does destructuring by itself remove properties from its source?

A. Yes, object properties are deleted  
B. Yes, array values are shifted  
C. No, it reads values and binds or assigns them  
D. Only when rest syntax is used

**Answer: C. No, it reads values and binds or assigns them.**

**Explanation:** Destructuring does not mutate the source by itself. Object rest creates a new object from remaining properties.

## True or false

### 13. Object destructuring matches source properties by key, not by their order.

**Answer: True.**

**Explanation:** The pattern names the properties it reads. The order in which those properties were created does not determine which value is selected.

### 14. An object default replaces null in the same way it replaces undefined.

**Answer: False.**

**Explanation:** A default initializer is used only for undefined. Null remains null.

### 15. An object pattern can read an inherited property.

**Answer: True.**

**Explanation:** Ordinary property access used by object destructuring can find inherited properties. Object rest is different because it gathers remaining own enumerable properties.

### 16. An array pattern can consume values from a Set.

**Answer: True.**

**Explanation:** A Set is iterable, so array destructuring can consume its yielded values.

### 17. A plain object with keys 0 and 1 and a length property is always valid for array destructuring.

**Answer: False.**

**Explanation:** Those properties make it array-like, but do not make it iterable. It needs an iterator implementation to be consumed by an array pattern.

### 18. A default initializer runs even when the value is present.

**Answer: False.**

**Explanation:** The initializer runs only when the selected value is undefined. This also means a function used as a default is called only when needed.

### 19. Array and object rest create deep copies of nested objects.

**Answer: False.**

**Explanation:** Rest creates a new container, but nested object values remain references to the same nested objects.

### 20. A nested object pattern automatically creates a binding for every intermediate object.

**Answer: False.**

**Explanation:** In const { address: { city } } = user, the pattern creates city but not address. Bind address separately if both are needed.

## Short-answer questions

### 21. How do you rename a property during object destructuring?

**Answer:** Write the property name, a colon, then the local binding name, such as { displayName: label }.

**Explanation:** The property before the colon is read from the source object. The name after the colon is created as the local binding.

### 22. What is the difference between a property default and a whole-parameter default?

**Answer:** A property default handles a missing or undefined property. A whole-parameter default supplies an object when the argument itself is omitted or undefined.

**Explanation:** In function f({ name = "Guest" } = {}), the outer default handles an omitted argument, while the inner default handles a missing name.

### 23. What does an array elision do?

**Answer:** It consumes one iterable value without creating a binding for it.

**Explanation:** In const [first, , third] = values, the second yielded value is skipped and the third is assigned to third.

### 24. Why does this assignment need parentheses at the beginning of a statement: ({ name } = source)?

**Answer:** The parentheses prevent the opening brace from being parsed as the start of a block statement.

**Explanation:** The braces in an object destructuring assignment form a pattern on the left side.

### 25. Can array destructuring be used with a string? Why?

**Answer:** Yes. A string is iterable, so the pattern consumes the characters yielded by its string iterator.

**Explanation:** String iteration works by Unicode code point, which can differ from indexing by UTF-16 code unit for supplementary characters.

### 26. What does object rest exclude and what does it include?

**Answer:** It excludes properties already selected earlier in the pattern and collects remaining own enumerable properties, including enumerable symbol keys.

**Explanation:** It does not include inherited or non-enumerable properties. The collected object is shallow.

### 27. What happens if an object pattern tries to read a property from null?

**Answer:** It throws a TypeError.

**Explanation:** Null and undefined cannot be destructured as objects. If nullish input is expected, handle it first, for example with source ?? {} when that fallback is appropriate.

### 28. When is destructuring assignment preferable to a destructuring declaration?

**Answer:** Use a declaration to create new bindings. Use assignment when the target variables or properties already exist.

**Explanation:** Assignment patterns do not declare names. Object destructuring assignment at the start of a statement should be parenthesized.

## Predict the output

### 29. What is printed?

~~~js
const user = { name: "Asha", role: "editor" };
const { name, role } = user;

console.log(name);
console.log(role);
console.log(user.name);
~~~

**Answer:**

~~~text
Asha
editor
Asha
~~~

**Explanation:** The pattern reads the two properties into local bindings. It does not remove or modify them on user.

### 30. What is printed?

~~~js
const account = { displayName: "Mina" };
const { displayName: label = "Guest" } = account;

console.log(label);
~~~

**Answer:**

~~~text
Mina
~~~

**Explanation:** The source property is displayName, and the local binding is label. The default is unused because the property has a value.

### 31. What is printed?

~~~js
const settings = { theme: null };
const { theme = "light" } = settings;

console.log(theme);
~~~

**Answer:**

~~~text
null
~~~

**Explanation:** Null is not undefined, so the default value does not apply.

### 32. What is printed?

~~~js
const numbers = [10, 20, 30, 40];
const [first, , third, ...rest] = numbers;

console.log(first);
console.log(third);
console.log(rest.join(", "));
~~~

**Answer:**

~~~text
10
30
40
~~~

**Explanation:** The second value is skipped, the third is assigned to third, and the remaining value is collected by rest.

### 33. What is printed?

~~~js
const [first = "fallback", second = "fallback"] = [undefined, null];

console.log(first);
console.log(second);
~~~

**Answer:**

~~~text
fallback
null
~~~

**Explanation:** The first value is undefined, so its default is used. The second is null, so it is preserved.

### 34. What is printed?

~~~js
const { address: { city } = {} } = {};
console.log(city);
~~~

**Answer:**

~~~text
undefined
~~~

**Explanation:** The address property is missing, so the default empty object is used. That object has no city property.

### 35. What is printed?

~~~js
const [first, second] = new Set(["red", "blue", "green"]);

console.log(first);
console.log(second);
~~~

**Answer:**

~~~text
red
blue
~~~

**Explanation:** Array destructuring consumes values from the Set iterator in iteration order. It does not require an actual array.

### 36. What is printed?

~~~js
let left = 1;
let right = 2;

[left, right] = [right, left];

console.log(left);
console.log(right);
~~~

**Answer:**

~~~text
2
1
~~~

**Explanation:** The right-hand array captures the old values first, then the assignment updates the existing variables.

### 37. What is printed?

~~~js
const defaults = { color: "blue" };
const options = { own: true, ...{} };
const { color = defaults.color, ...rest } = options;

console.log(color);
console.log(rest.own);
~~~

**Answer:**

~~~text
blue
true
~~~

**Explanation:** options has no color property, so the default expression supplies blue. Rest collects its remaining own enumerable property own.

### 38. What is printed?

~~~js
const [first, second] = "A😀";

console.log(first);
console.log(second);
console.log(second.length);
~~~

**Answer:**

~~~text
A
😀
2
~~~

**Explanation:** String iteration yields the emoji as one string value. Its UTF-16 length is still two code units.

## Coding questions

### 39. Read a user's name and role, with a fallback role.

**Answer:**

~~~js
const user = {
    name: "Mina"
};

const { name, role = "reader" } = user;

console.log(name);
console.log(role);
~~~

Output:

~~~text
Mina
reader
~~~

**Explanation:** name is read directly. Since role is undefined, its default is used.

### 40. Read a property under a different local variable name.

**Answer:**

~~~js
const response = {
    statusCode: 201
};

const { statusCode: code } = response;
console.log(code);
~~~

Output:

~~~text
201
~~~

**Explanation:** statusCode is the source key, and code is the new local binding.

### 41. Read a nested city and provide a safe fallback for a missing address.

**Answer:**

~~~js
const user = {};
const {
    address: { city = "Unknown" } = {}
} = user;

console.log(city);
~~~

Output:

~~~text
Unknown
~~~

**Explanation:** The outer default handles a missing address object. The inner default handles a missing city property. This does not cover address being null.

### 42. Use a variable to choose which object property to read.

**Answer:**

~~~js
const field = "email";
const user = {
    email: "mina@example.test",
    role: "editor"
};

const { [field]: value } = user;
console.log(value);
~~~

Output:

~~~text
mina@example.test
~~~

**Explanation:** The brackets evaluate field to obtain the property key. The colon assigns it to the local name value.

### 43. Read the first and third values while skipping the second.

**Answer:**

~~~js
const values = ["first", "skip", "third"];
const [first, , third] = values;

console.log(first);
console.log(third);
~~~

Output:

~~~text
first
third
~~~

**Explanation:** The empty position in the pattern skips one iterator value.

### 44. Create a function with a destructured options object that works when called with no argument.

**Answer:**

~~~js
function createMessage({ text = "Ready", level = "info" } = {}) {
    return "[" + level + "] " + text;
}

console.log(createMessage());
console.log(createMessage({ text: "Saved", level: "success" }));
~~~

Output:

~~~text
[info] Ready
[success] Saved
~~~

**Explanation:** The whole-parameter default provides an empty object when the argument is omitted. The property defaults supply text and level.

### 45. Swap two existing variables with destructuring assignment.

**Answer:**

~~~js
let first = "left";
let second = "right";

[first, second] = [second, first];

console.log(first);
console.log(second);
~~~

Output:

~~~text
right
left
~~~

**Explanation:** The right side is evaluated into an array before the targets are assigned.

### 46. Separate an object's id from the remaining profile fields.

**Answer:**

~~~js
const user = {
    id: 12,
    name: "Asha",
    role: "author"
};

const { id, ...profile } = user;

console.log(id);
console.log(Object.keys(profile).join(", "));
~~~

Output:

~~~text
12
name, role
~~~

**Explanation:** id is selected into its own binding and excluded from the rest object. profile contains the other own enumerable properties.

### 47. Destructure a pair returned by a function.

**Answer:**

~~~js
function getRange() {
    return [4, 9];
}

const [minimum, maximum] = getRange();

console.log(minimum);
console.log(maximum);
~~~

Output:

~~~text
4
9
~~~

**Explanation:** The function returns an iterable array, and the pattern assigns its values by position.

### 48. Update existing object properties with an object destructuring assignment.

**Answer:**

~~~js
const user = {
    name: "",
    role: ""
};

({ name: user.name, role: user.role } = {
    name: "Dev",
    role: "editor"
});

console.log(user.name);
console.log(user.role);
~~~

Output:

~~~text
Dev
editor
~~~

**Explanation:** This pattern assigns to existing properties. Parentheses make the object pattern unambiguous at the start of the statement.

## Review checklist

- Object patterns choose properties by key; array patterns consume iterable values by position.
- Use propertyName: localName to rename a local binding.
- Defaults apply to undefined, not to all falsy values.
- Include a whole-parameter default when a function may be called without its options object.
- Handle null before a nested object pattern tries to read through it.
- Use an elision to skip an iterable value.
- Put rest last and remember it creates a shallow collection.
- Distinguish declarations from assignments to existing targets.
- Parenthesize an object destructuring assignment at the start of a statement.
- Do not assume array-like objects are iterable.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [54 - Computed properties, shorthand, and method definitions](054-computed-properties-shorthand-and-method-definitions.md) | [Open lesson](../lessons/055-object-and-array-destructuring.md) | [Open example](../examples/055-object-and-array-destructuring.md) | [56 - Spread syntax and rest properties](../lessons/056-spread-syntax-and-rest-properties.md) |
