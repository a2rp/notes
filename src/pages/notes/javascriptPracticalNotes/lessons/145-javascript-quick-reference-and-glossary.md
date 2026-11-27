# 145 - JavaScript quick reference and glossary

This chapter is a compact index for ideas introduced throughout the course. Use it to recall syntax and terminology, then return to the lesson that explains a topic in depth.

The examples use modern JavaScript. Exact APIs depend on where code runs: browsers provide web platform APIs, while Node.js provides server and command-line APIs. The language itself is specified by ECMAScript.

## Start with a small program

~~~js
const name = 'Mina';
const scores = [8, 10, 9];
const average = scores.reduce((total, score) => total + score, 0) / scores.length;

console.log(name + ' average: ' + average);
~~~

A program is a sequence of statements and expressions. Expressions produce values. Statements organize work such as declarations, branches, loops, and returns.

## Declarations and values

Use **const** when a binding will not be reassigned. Use **let** when it must be reassigned. Both are block scoped. Avoid **var** in new code because it is function scoped and has older hoisting behavior.

~~~js
const language = 'JavaScript';
let attempts = 0;
attempts += 1;
~~~

A const binding cannot be reassigned, but an object stored in that binding may still be changed. Prefer making data immutable by convention when that helps prevent accidental changes.

### Primitive types

JavaScript has seven primitive types:

- **undefined**: a missing value, often the result of reading an unset property or parameter.
- **null**: an intentional absence of an object value.
- **boolean**: **true** or **false**.
- **number**: floating point numbers, including **NaN**, **Infinity**, and **-Infinity**.
- **bigint**: integers larger than the safe range of number, written with an **n** suffix.
- **string**: text.
- **symbol**: a unique primitive value, often used as a special object key.

All other values are objects, including arrays and functions. **typeof null** returns **'object'** for historical reasons. Use **value === null** to check specifically for null, and **Array.isArray(value)** to check for an array.

~~~js
const count = 12;
const largeCount = 9007199254740993n;
const label = 'lessons';
const settings = { theme: 'dark' };
const items = ['HTML', 'CSS', 'JavaScript'];
~~~

### Type checks and conversion

**typeof value** is useful for most primitive checks, but it reports **'object'** for null, arrays, and ordinary objects. Use the check that matches the question:

~~~js
typeof 'text' === 'string';
typeof 42 === 'number';
Number.isNaN(NaN);
Number.isFinite(42);
Array.isArray([]);
value === null;
~~~

Convert deliberately:

~~~js
const quantity = Number('12');
const text = String(12);
const enabled = Boolean(1);
~~~

**Number('')** and **Number(null)** produce zero, which may surprise you. Validate user input before conversion when an empty value must remain invalid. **parseInt** and **parseFloat** parse a leading numeric portion; pass a radix to **parseInt**, usually **10**.

## Equality, truthiness, and fallback values

Prefer **===** and **!==** because they compare without implicit type conversion. Loose equality **==** has special coercion rules and can make conditions hard to predict.

Falsy values are **false**, **0**, **-0**, **0n**, **''**, **null**, **undefined**, and **NaN**. Other values are truthy, including empty arrays and empty objects.

~~~js
const suppliedName = '';
const displayName = suppliedName || 'Guest';
const savedCount = 0;
const countToShow = savedCount ?? 10;
~~~

The **||** operator selects the right side for any falsy left value. The **??** operator selects the right side only when the left value is null or undefined. Use **??** when zero, false, or an empty string is meaningful data.

Optional chaining **?.** reads a property or calls a method only when the value before it is not null or undefined:

~~~js
const city = profile.address?.city;
const firstTag = article.tags?.[0];
~~~

Optional chaining prevents an access error. It does not validate that a value has the expected type.

## Operators

Common operator groups:

- Arithmetic: **+**, **-**, **\***, **/**, **%**, **\*\***.
- Comparison: **<**, **<=**, **>**, **>=**, **===**, **!==**.
- Logical: **&&**, **||**, **!**, **??**.
- Assignment: **=**, **+=**, **-=**, **\*=**, **??=**.
- Conditional: **condition ? valueIfTrue : valueIfFalse**.
- Type inspection: **typeof**, **instanceof**.
- Object and array access: **.**, **[]**, **?.**.

The plus operator adds numbers or concatenates strings, depending on its operands. Parentheses make mixed expressions easier to read and reduce precedence mistakes.

~~~js
const total = (price * quantity) + shipping;
const isAvailable = stock > 0 && !discontinued;
~~~

Use **&&** and **||** for short-circuit logic. The right operand is evaluated only if needed. Bitwise operators work on integer representations and are not substitutes for ordinary logical operators.

## Strings and regular expressions

Strings are immutable text values. Useful methods include **trim**, **includes**, **startsWith**, **endsWith**, **slice**, **replace**, **split**, **toLowerCase**, and **toUpperCase**. Most methods return a new value rather than changing the original string.

~~~js
const rawTitle = '  Learning JavaScript  ';
const title = rawTitle.trim();
const words = title.split(' ');
~~~

Template literals use backtick delimiters. They can span lines and interpolate expressions. Use them for readable dynamic strings. Regular expressions describe text patterns; use them when a plain string method is not enough, and explain complex patterns with comments.

## Arrays and collections

Arrays are ordered, zero-indexed objects. Common methods include:

- **push** and **pop** to add or remove at the end.
- **shift** and **unshift** to remove or add at the beginning.
- **slice** to copy a range without changing the original.
- **splice** to remove or insert items in the original array.
- **map** to transform each item.
- **filter** to keep matching items.
- **find** and **findIndex** to locate the first match.
- **some** and **every** to check a condition.
- **reduce** to combine items into one result.
- **sort** to sort the original array.

~~~js
const prices = [12, 5, 20];
const doubled = prices.map(price => price * 2);
const affordable = prices.filter(price => price <= 12);
const ascending = [...prices].sort((a, b) => a - b);
~~~

The default **sort()** compares values as strings. Supply a comparison function for numeric sorting. Methods such as **sort**, **splice**, **push**, and **pop** mutate an array. Copy first if the original order or contents must remain unchanged.

Other collections:

- **Set** stores unique values and preserves insertion order.
- **Map** stores key-value entries and allows keys of any type.
- **WeakMap** and **WeakSet** hold object keys weakly and are not enumerable.

Choose a collection based on the operation and data model, not just syntax preference.

## Objects, destructuring, and copying

Objects group named properties. Property values can be read with dot notation or bracket notation. Bracket notation is useful for dynamic keys.

~~~js
const user = { name: 'Mina', role: 'learner' };
const key = 'role';
const { name, role = 'guest' } = user;
const updatedUser = { ...user, active: true };
~~~

Destructuring extracts values from objects or arrays. Default values apply when a value is undefined. The rest syntax gathers remaining array items or object properties. Spread syntax expands iterable values or enumerable object properties.

Object spread and array spread make shallow copies. Nested objects are still shared references. **structuredClone** can deeply copy supported data, but it is not a universal solution for values such as functions or every host object.

Use **Object.keys**, **Object.values**, and **Object.entries** to inspect an object's own enumerable string-keyed properties. **Object.hasOwn(object, key)** checks whether a property belongs directly to that object.

## Functions, scope, and closures

Functions package reusable behavior. Function declarations, function expressions, and arrow functions have different syntax and behavior.

~~~js
function add(a, b = 0) {
  return a + b;
}

const multiply = (a, b) => a * b;
~~~

A function without an explicit return value returns **undefined**. Default parameters apply when an argument is omitted or undefined, not when it is null.

A closure is a function together with access to variables from the scope where it was created. Closures support private state and callbacks. Arrow functions capture **this** from their surrounding scope; ordinary functions receive **this** based on how they are called.

**this** is not determined by where an ordinary function is written. A method call such as **object.method()** supplies object as this. A detached call usually does not. Use arrow functions when lexical this is intended, and ordinary methods when the call receiver should provide this.

## Control flow and errors

Use **if** and **else** for branches, **switch** for a set of explicit cases, and loops such as **for**, **for...of**, and **while** to repeat work. **for...of** iterates values from an iterable such as an array. **for...in** iterates enumerable string property keys and is usually not the right way to iterate an array.

~~~js
for (const item of items) {
  if (!item.active) continue;
  console.log(item.name);
}
~~~

Use **break** to leave a loop or switch, and **continue** to start the next loop iteration. Keep branches small and name complicated conditions.

Throw an **Error** when an operation cannot complete. Catch errors where the program can recover, add useful context, or report a helpful message. Do not hide errors with an empty catch block.

~~~js
try {
  const data = JSON.parse(source);
  console.log(data);
} catch (error) {
  console.error('Could not read the saved data:', error.message);
}
~~~

Common built-in errors include **TypeError**, **RangeError**, **ReferenceError**, **SyntaxError**, and **URIError**. Prefer an error class that describes the failure. Validate external data even after parsing succeeds.

## Classes and prototypes

JavaScript objects inherit through a prototype chain. **class** syntax provides a familiar way to create constructor functions and define methods, but it uses the same prototype-based object model.

~~~js
class Counter {
  constructor(start = 0) {
    this.value = start;
  }

  increment() {
    this.value += 1;
  }
}
~~~

Use composition when an object can be assembled from smaller capabilities without a deep inheritance tree. Static methods belong to the class itself. Private fields use a **#** prefix. A subclass uses **extends** and may call **super** from its constructor.

## Promises and asynchronous code

A **Promise** represents the eventual result of an asynchronous operation. It can be pending, fulfilled, or rejected. Use **then** and **catch**, or use **async** and **await** for sequential-looking code.

~~~js
async function loadProfile() {
  const response = await fetch('/api/profile');

  if (!response.ok) {
    throw new Error('The profile request failed');
  }

  return response.json();
}
~~~

The code above uses **fetch**, which is available in modern browsers and many modern Node.js versions. Network requests can fail, and an HTTP error status does not automatically reject the fetch promise. Check **response.ok** and handle errors.

Use **Promise.all** when independent tasks can run concurrently and all results are required. Use **Promise.allSettled** when each result should be inspected even if some tasks fail. Avoid awaiting independent operations one at a time when they can safely run together.

## Modules and runtimes

ECMAScript modules use **import** and **export**. They make dependencies explicit and support static analysis. Node.js also supports CommonJS files that use **require** and **module.exports**. Follow the module format configured by the project.

~~~js
export function formatName(name) {
  return name.trim();
}
~~~

The browser provides APIs such as the DOM, events, storage, and fetch. Node.js provides APIs for files, processes, streams, and servers. A global available in one environment may not exist in another. Check the target runtime before relying on a platform API.

## Debugging and code quality

- Read the full error message and locate the failing line.
- Inspect values at the boundary where they enter a function.
- Use breakpoints or focused logging to check assumptions.
- Reproduce the smallest case that still shows the problem.
- Test normal input, boundary values, and invalid input.
- Keep names descriptive and functions focused.
- Prefer explicit validation over clever coercion.
- Avoid changing shared state when a returned value is clearer.
- Remove temporary logs and secrets before committing.

## Common mistakes to catch

- Reassigning a const binding or assuming const freezes an object.
- Using **==** when **===** expresses the intended check.
- Assuming an empty array or object is falsy.
- Using **||** when zero or an empty string should be preserved.
- Forgetting that array sorting mutates the original.
- Assuming spread makes a deep copy.
- Using **for...in** to iterate array values.
- Forgetting to await a promise or handle its rejection.
- Assuming a successful fetch promise means the HTTP status was successful.
- Assuming browser APIs exist in Node.js, or Node.js APIs exist in browsers.
- Inserting untrusted text with **innerHTML** instead of **textContent**.
- Treating parsed JSON as trusted, validated application data.

## Glossary

| Term | Meaning |
| --- | --- |
| API | A defined interface through which one piece of software uses another. |
| Argument | A value passed to a function call. |
| Array | An ordered, zero-indexed collection of values. |
| Asynchronous operation | Work whose result becomes available later without blocking the current call stack. |
| Binding | A name associated with a value. |
| Block scope | Visibility limited to a block, commonly delimited by braces. |
| Callback | A function passed to another function to be called later or under a condition. |
| Coercion | Conversion between types, either implicit or explicit. |
| Closure | A function retaining access to its lexical environment. |
| DOM | The browser's object model for an HTML document. |
| ECMAScript | The standardized language specification that JavaScript implementations follow. |
| Expression | Code that evaluates to a value. |
| Function | A callable value that can receive inputs and produce a result or side effect. |
| Hoisting | The behavior that makes some declarations available before their textual position is evaluated. |
| Iterable | A value that can provide its items one at a time, such as an array or string. |
| Lexical scope | Visibility determined by where code is written. |
| Method | A function stored as an object property. |
| Mutation | A change to an existing object or collection. |
| Primitive | An immutable value that is not an object. |
| Promise | An object representing the eventual success or failure of an asynchronous operation. |
| Reference | A value that points to an object rather than containing an independent copy of it. |
| Runtime | The environment that executes code and provides platform APIs. |
| Side effect | An observable change made by executing code, such as writing a file or updating the DOM. |
| Statement | An instruction that performs an action or controls program flow. |
| Type | A category that determines the values and operations available to a value. |

## Quick review checklist

Before relying on a snippet, ask:

1. Which runtime is expected: browser, Node.js, or both?
2. What values can enter this code, including null, undefined, and invalid data?
3. Does this operation mutate a shared array or object?
4. Can this call fail or return a promise that needs to be awaited?
5. Are conversions and equality checks explicit?
6. Does the code handle errors and provide a useful message?
7. Is external text treated as untrusted input?

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [144 - Capstone project: plan, build, test, and document an application](144-capstone-project-plan-build-test-and-document-an-application.md) | [Open Q&A](../qnas/145-javascript-quick-reference-and-glossary.md) | [Open example](../examples/145-javascript-quick-reference-and-glossary.md) | |

