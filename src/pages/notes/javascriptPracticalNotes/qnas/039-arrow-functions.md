# 39 - Arrow functions - Q&A

Use these questions to review arrow function syntax, return forms, and behavior. Answers and explanations appear directly after each question.

## Multiple-choice questions

### 1. Which symbol separates arrow function parameters from its body?

A. ->  
B. =>  
C. :=  
D. ==>

**Answer:** B. =>

**Explanation:** The arrow token is an equals sign followed by a greater-than sign.

### 2. Which syntax represents an arrow function with no parameters?

A.
~~~js
const run = => {};
~~~

B.
~~~js
const run = () => {};
~~~

C.
~~~js
const run = function => {};
~~~

D.
~~~js
const run = (run) {};
~~~

**Answer:** B.

**Explanation:** Zero-parameter arrow functions use an empty pair of parentheses.

### 3. When can parentheses around an arrow function's parameters be omitted?

A. Whenever it has at least one parameter  
B. Only when it has exactly one simple parameter  
C. When it has no parameters  
D. When it has a block body

**Answer:** B.

**Explanation:** A single simple parameter may be written without parentheses. Zero or multiple parameters need parentheses.

### 4. What does an expression body do?

A. Logs the expression but returns undefined  
B. Returns the expression's value automatically  
C. Creates a constructor  
D. Creates an arguments object

**Answer:** B.

**Explanation:** An arrow body without braces is an expression body. Its expression result is returned automatically.

### 5. What must a block-bodied arrow function include if its caller needs a result?

A. An explicit return statement  
B. A debugger statement  
C. A semicolon after every brace  
D. The function keyword

**Answer:** A.

**Explanation:** Braces create a block body. Like a regular function body, it needs return to provide a value.

### 6. Why are parentheses used around an object literal in an expression-bodied arrow?

A. To turn it into an Array  
B. To distinguish the object expression from a block body  
C. To make the function constructible  
D. To create a local this

**Answer:** B.

**Explanation:** Without parentheses, braces are parsed as the start of the function body.

### 7. What kind of this does an arrow function use?

A. A new this created for each call  
B. The this value from its surrounding scope  
C. Always the global object  
D. Always undefined

**Answer:** B.

**Explanation:** Arrow functions have lexical this. They do not create their own this binding.

### 8. Does an arrow function have its own arguments object?

A. Yes, for every call  
B. No, it uses an enclosing arguments binding if one exists  
C. Yes, but only with a block body  
D. No, and arguments can never be read inside an arrow

**Answer:** B.

**Explanation:** An arrow does not define arguments. A reference can resolve to an enclosing regular function's arguments binding.

### 9. What happens when an arrow function is called with new?

A. It constructs an object normally  
B. It returns undefined  
C. It throws a TypeError  
D. It becomes a function declaration

**Answer:** C.

**Explanation:** Arrow functions are not constructible.

### 10. Which statement about a block-bodied arrow is correct?

A. It always returns its last expression  
B. It requires explicit return to return a value  
C. It cannot contain more than one statement  
D. It automatically logs every statement

**Answer:** B.

**Explanation:** A block body is a set of statements. Its result is not returned automatically.

## True or false

### 11. An arrow function is a function expression.

**Answer:** True.

**Explanation:** It creates a function value as part of an expression, commonly assigned to a const binding.

### 12. An arrow function uses the function keyword.

**Answer:** False.

**Explanation:** Its syntax uses parameters, the => token, and a body.

### 13. An expression-bodied arrow implicitly returns its expression.

**Answer:** True.

**Explanation:** The expression after => is evaluated and becomes the function call's result.

### 14. A block-bodied arrow implicitly returns its final expression.

**Answer:** False.

**Explanation:** A block body needs an explicit return when its caller needs a value.

### 15. Arrow functions create their own this binding.

**Answer:** False.

**Explanation:** They use this from the surrounding lexical scope.

### 16. An arrow function's this changes when it is called as an object property.

**Answer:** False.

**Explanation:** Arrow this is not determined by the call form. It comes from the surrounding scope.

### 17. An arrow function creates its own arguments object.

**Answer:** False.

**Explanation:** It has no own arguments binding. References resolve to an enclosing binding if one exists.

### 18. An arrow function can be used as a constructor with new.

**Answer:** False.

**Explanation:** Arrow functions do not support construction.

### 19. Parentheses around one simple arrow parameter are optional.

**Answer:** True.

**Explanation:** Both value => value * 2 and (value) => value * 2 are valid.

### 20. Parentheses around multiple arrow parameters are optional.

**Answer:** False.

**Explanation:** Multiple parameters must be enclosed in parentheses.

### 21. An object literal can be returned by an expression-bodied arrow.

**Answer:** True.

**Explanation:** Wrap the object literal in parentheses so it is parsed as an expression.

### 22. Arrow functions are always the best choice because they use fewer characters.

**Answer:** False.

**Explanation:** Use an arrow when its lexical behavior fits. A regular function is more appropriate when the function needs its own this, arguments, or constructor behavior.

## Predict the output

### 23. What does this code print?

~~~js
const double = value => value * 2;

console.log(double(4));
~~~

**Answer:**

~~~text
8
~~~

**Explanation:** The expression body returns value * 2 automatically.

### 24. What does this code print?

~~~js
const double = value => {
    value * 2;
};

console.log(double(4));
~~~

**Answer:**

~~~text
undefined
~~~

**Explanation:** The braces create a block body. The expression is evaluated but not returned.

### 25. What does this corrected block body print?

~~~js
const double = value => {
    return value * 2;
};

console.log(double(4));
~~~

**Answer:**

~~~text
8
~~~

**Explanation:** The explicit return sends the result to the caller.

### 26. What does this code print?

~~~js
const greet = () => "Hello";

console.log(greet());
~~~

**Answer:**

~~~text
Hello
~~~

**Explanation:** The arrow has no parameters and returns its expression body.

### 27. What does this code print?

~~~js
const createPoint = (x, y) => ({ x: x, y: y });

const point = createPoint(2, 5);
console.log(point.x, point.y);
~~~

**Answer:**

~~~text
2 5
~~~

**Explanation:** Parentheses make the object literal the returned expression.

### 28. What does this code print?

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

**Answer:**

~~~text
Asha
~~~

**Explanation:** The arrow captures this from the createReader method call. That call's this value is profile.

### 29. What does this code print?

~~~js
function makeReader() {
    const readFirst = () => arguments[0];
    return readFirst();
}

console.log(makeReader("first", "second"));
~~~

**Answer:**

~~~text
first
~~~

**Explanation:** The arrow does not create arguments. It reads the arguments object belonging to makeReader.

### 30. What does this code print?

~~~js
const printStatus = () => console.log("Ready");

printStatus();
~~~

**Answer:**

~~~text
Ready
~~~

**Explanation:** console.log is the expression body. The arrow runs when printStatus is called.

### 31. What error type does this code report?

~~~js
const createPerson = name => ({ name: name });

try {
    new createPerson("Mina");
} catch (error) {
    console.log(error instanceof TypeError);
}
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** Arrow functions are not constructors, so new throws a TypeError.

## Short-answer questions

### 32. What is an expression-bodied arrow function?

**Answer:** An arrow function whose body is one expression written without braces.

**Explanation:** Its expression result is returned automatically.

### 33. What is a block-bodied arrow function?

**Answer:** An arrow function whose body is a block of statements inside braces.

**Explanation:** Use an explicit return when the caller needs a value from that block.

### 34. Why should an arrow function not be used for every object method?

**Answer:** An arrow does not create its own this, so it does not receive the object as this based on how the method is called.

**Explanation:** Use a regular method or function when the method needs its own invocation context.

### 35. What happens if an arrow function refers to arguments?

**Answer:** It resolves arguments from a surrounding scope if such a binding exists.

**Explanation:** The arrow itself does not create an arguments object. A rest parameter is a clearer way to collect values for a new function.

### 36. What function form should you use when code needs new?

**Answer:** Use a constructible function declaration, function expression, or class, depending on the design.

**Explanation:** Arrow functions cannot be constructed.

### 37. What does a concise expression body return when the expression is a console.log call?

**Answer:** It returns the result of console.log, which is undefined.

**Explanation:** The expression is implicitly returned, but console.log itself returns undefined.

### 38. How can you make a block-bodied arrow return an object?

**Answer:** Use an explicit return inside its block and put the object literal after return.

**Explanation:** Braces after the arrow start the block. The object literal belongs inside a return statement.

## Coding questions

### 39. Write an arrow function that returns the square of a number using an expression body.

**Answer:**

~~~js
const square = number => number * number;

console.log(square(6));
~~~

~~~text
36
~~~

**Explanation:** The expression body returns the multiplication result automatically.

### 40. Rewrite the square function with a block body.

**Answer:**

~~~js
const square = number => {
    return number * number;
};

console.log(square(6));
~~~

~~~text
36
~~~

**Explanation:** The block body uses an explicit return.

### 41. Write an arrow function that returns an object with name and role properties.

**Answer:**

~~~js
const createUser = (name, role) => ({ name: name, role: role });

const user = createUser("Mina", "editor");
console.log(user.name);
console.log(user.role);
~~~

~~~text
Mina
editor
~~~

**Explanation:** Parentheses tell JavaScript to parse the braces as an object expression.

### 42. Rewrite this regular function as an arrow with an expression body.

~~~js
function add(first, second) {
    return first + second;
}
~~~

**Answer:**

~~~js
const add = (first, second) => first + second;
~~~

**Explanation:** The expression body returns the sum automatically.

### 43. Fix this block-bodied arrow so the caller receives the result.

~~~js
const double = value => {
    value * 2;
};
~~~

**Answer:**

~~~js
const double = value => {
    return value * 2;
};
~~~

**Explanation:** Add an explicit return because the body uses braces.

## Key points

- Arrow functions are expressions written with =>.
- Parentheses are optional only for one simple parameter.
- Expression bodies return automatically. Block bodies need explicit return.
- Wrap object literals returned from expression bodies in parentheses.
- Arrow functions use lexical this and do not create an arguments object.
- Arrow functions cannot be used with new.
- Choose regular or arrow functions according to the behavior required.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [38 - Return values and early returns](../lessons/038-return-values-and-early-returns.md) | [Open lesson](../lessons/039-arrow-functions.md) | [Open example](../examples/039-arrow-functions.md) | [40 - Callbacks and higher-order functions](../lessons/040-callbacks-and-higher-order-functions.md) |
