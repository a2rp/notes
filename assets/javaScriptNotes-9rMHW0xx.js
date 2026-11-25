import{F as e,H as t,L as n,N as r,P as i,R as a,a as o,l as s,o as c,p as l,z as u}from"./index-BQ0h7Bio.js";import{n as d,t as f}from"./lib-CejL-PCT.js";var p=t(u(),1),m=Object.entries(Object.assign({"./chapters/01-javascript-ecmascript-and-the-runtime.md":`# 1. JavaScript, ECMAScript, and the runtime

JavaScript is the language you write; **ECMAScript** is the standard that defines its core syntax and behavior. Browsers add Web APIs such as \`document\`, \`fetch\`, and \`localStorage\`. Node.js adds server APIs such as \`process\`, filesystem access, and streams. A feature available in one host is not automatically part of the language or available in every other host.

## From source to behavior

A JavaScript engine parses source, creates execution contexts, and evaluates code. Browsers and Node use engines such as V8, SpiderMonkey, and JavaScriptCore. Bundlers and transpilers can transform syntax and combine files, but they do not change the language's underlying runtime model. Polyfills can supply some missing APIs; they cannot safely emulate every platform capability.

A browser script can be loaded as a classic script or as an ES module. Modules have their own scope, use \`import\` and \`export\`, and run in strict mode. In Node, \`.mjs\` and package \`"type": "module"\` identify ES modules; \`.cjs\` identifies CommonJS. Choose one module system intentionally in a project.

\`\`\`js
// An ES module can run in a browser or a supported Node.js runtime.
export function greet(name) {
  return "Hello, " + name;
}
\`\`\`

## Run JavaScript

Use the browser console for a quick experiment, or run a file with a supported Node.js version:

\`\`\`sh
node --version
node app.mjs
\`\`\`

Prefer small experiments that isolate one idea. Read the first error and its line before changing unrelated code. For browser-specific behavior, test in a browser; Node does not provide a DOM by default.

## A safe mental model

- Values have types; variables hold references or primitive values.
- Functions create scopes and can retain access to their lexical environment.
- Objects and arrays are mutable unless your code treats them immutably.
- Async operations schedule future work; they do not make CPU-heavy code parallel.
- The host determines which APIs exist.

## References

- [ECMAScript 2026 specification](https://tc39.es/ecma262/2026/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)
- [Node.js: ECMAScript modules](https://nodejs.org/api/esm.html)\r
`,"./chapters/02-values-types-and-coercion.md":'# 2. Values, types, and coercion\n\nJavaScript has seven primitive types: `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, and `symbol`. Everything else is an object, including arrays, dates, regular expressions, functions, maps, and sets. Primitive values are immutable; an object variable refers to an object that may be changed.\n\n```js\nconst profile = { name: "Mina" };\nconst sameProfile = profile;\nsameProfile.name = "Ravi";\nconsole.log(profile.name); // Ravi: both variables refer to the same object\n```\n\n`const` prevents reassignment of the binding, not mutation of the referenced object. Use `Object.freeze` for a shallow runtime freeze when appropriate, and remember nested objects remain mutable unless separately frozen.\n\n## Missing values and checks\n\nUse `undefined` for an absent value and `null` when your program deliberately represents “no value.” Avoid using either ambiguously. `typeof null` is the historical string `"object"`; test `value === null` directly. `typeof` is useful for primitives, but arrays need `Array.isArray(value)`.\n\nNumbers include `NaN`, `Infinity`, and `-Infinity`. A `NaN` value is unequal to itself; use `Number.isNaN(value)` to detect it. `Number.isFinite(value)` rejects non-finite values without coercing strings.\n\n## Equality and conversion\n\nPrefer strict equality (`===`) because it does not convert operands first. `==` applies coercion and has edge cases that are easy to overlook. Convert input at a boundary and validate the result:\n\n```js\nconst quantity = Number(formValue);\nif (!Number.isFinite(quantity) || quantity < 0) {\n  throw new RangeError("Quantity must be a non-negative number");\n}\n```\n\nTruthiness is not the same as “present”: `0`, `""`, `false`, `null`, `undefined`, and `NaN` are falsy. If zero or an empty string is valid, check explicitly instead of writing `if (!value)`.\n\n`Object.is` differs from `===` for `NaN` and signed zero. It is useful for precise identity checks, but ordinary application comparisons usually need `===`.\n\n## Remember\n\n- Validate external input; TypeScript annotations would not validate runtime values either.\n- Use `Number(...)` plus a finite/range check for numeric form values.\n- Use `??` when only `null` and `undefined` should trigger a fallback; use `||` only when every falsy value should.\n\n## References\n\n- [MDN: JavaScript data types and structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)\n- [MDN: Equality comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)\r\n',"./chapters/03-variables-scope-and-control-flow.md":'# 3. Variables, scope, and control flow\n\nUse `const` by default, `let` when a binding must be reassigned, and avoid `var` in new code. `var` is function-scoped and can be redeclared; `let` and `const` are block-scoped. A `let` or `const` binding exists from the start of its block but cannot be read before its declaration is initialized. This period is the **temporal dead zone**.\n\n```js\nconst label = "outer";\n\nfunction describe(enabled) {\n  if (enabled) {\n    const label = "active"; // a separate block-scoped binding\n    return label;\n  }\n  return label;\n}\n```\n\nKeep variables close to where they are used. Narrow scope reduces accidental reuse and makes the lifetime of state easier to understand. Prefer explicit reassignment over mutating a shared outer variable from many branches.\n\n## Branching and loops\n\nUse `if` for branching and `switch` when matching one value against several cases. Include `break` or return from each `switch` case unless fall-through is deliberate. Use `for...of` for values in an iterable such as an array; `for...in` enumerates object keys and is usually not the right way to walk an array.\n\n```js\nfor (const item of items) {\n  if (!item.enabled) continue;\n  process(item);\n}\n```\n\n`break` exits a loop; `continue` skips to the next iteration. For search operations, array methods such as `find`, `some`, and `every` can express intent more clearly than manual index bookkeeping.\n\n## Avoid surprising coercion\n\nConditions convert values to booleans. Compare values explicitly when the rule matters: `count > 0`, `status === "ready"`, or `value != null` when intentionally accepting both `null` and `undefined`. Do not depend on implicit string-to-number conversion for business rules.\n\n## Keep control flow readable\n\nReturn early for invalid or completed cases, and avoid deeply nested conditions. Keep each function focused on one operation. A clear guard clause can replace nested branches:\n\n```js\nfunction getDisplayName(user) {\n  if (!user) return "Guest";\n  return user.displayName || user.email || "Guest";\n}\n```\n\nThe example uses `||` because empty strings should fall through; use `??` if an empty string is a valid name.\n\n## References\n\n- [MDN: Declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)\n- [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)\r\n',"./chapters/04-functions-closures-and-this.md":'# 4. Functions, closures, and `this`\n\nFunctions are values: assign them to variables, pass them as callbacks, and return them from other functions. Function declarations are hoisted within their scope; function expressions are initialized where they are assigned. Arrow functions are concise expressions and capture `this` from their surrounding scope. They do not have their own `this`, `arguments`, or constructor behavior.\n\n```js\nfunction makeCounter(start = 0) {\n  let count = start;\n  return () => ++count;\n}\n\nconst next = makeCounter(4);\nnext(); // 5\nnext(); // 6\n```\n\nThe returned function is a **closure**: it retains access to `count` after `makeCounter` has returned. Closures are useful for private state and callbacks. They can also keep large objects alive; remove event listeners and release references when a long-lived callback is no longer needed.\n\n## Parameters and return values\n\nDefault parameters apply when an argument is `undefined`, not when it is `null`. Rest parameters gather trailing arguments into an array. Return a value rather than modifying unrelated outer state when practical; pure functions are easier to test.\n\n```js\nfunction total(first, ...remaining) {\n  return [first, ...remaining].reduce((sum, value) => sum + value, 0);\n}\n```\n\n## How `this` is chosen\n\nFor an ordinary function, `this` depends on how the function is called. A method call like `user.save()` supplies `user` as `this`; extracting the method loses that receiver unless it is bound. An arrow function uses lexical `this`, which is useful inside callbacks but usually not as an object method when the method needs its receiver.\n\n```js\nconst user = {\n  name: "Asha",\n  greeting() { return "Hi, " + this.name; },\n};\n```\n\nUse `bind`, `call`, or `apply` only when you need to control a function\'s receiver. Avoid relying on browser globals as implicit `this`; modules and strict mode make behavior more predictable.\n\n## References\n\n- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)\n- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)\n- [MDN: `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)\r\n',"./chapters/05-objects-prototypes-and-classes.md":`# 5. Objects, prototypes, and classes

Objects store named properties. Use dot notation when the property name is known, and bracket notation for dynamic keys. A property lookup first checks the object itself and then follows its prototype chain. \`Object.hasOwn(value, key)\` checks only an object's own property; the \`in\` operator also checks inherited properties.

\`\`\`js
const settings = { theme: "dark" };
const key = "theme";
console.log(settings[key]); // dark
console.log(Object.hasOwn(settings, key)); // true
\`\`\`

Object spread (\`{ ...source }\`) and \`Object.assign\` copy enumerable own properties into a new object. These copies are **shallow**: nested objects are still shared. Do not treat a shallow copy as deep isolation.

## Prototypes and classes

Every ordinary object has a prototype (or \`null\`). Property delegation through prototypes enables shared methods and is the mechanism behind JavaScript's inheritance model. \`class\` provides clearer syntax over that model; it does not introduce a separate object system.

\`\`\`js
class Timer {
  #startedAt;

  constructor(clock = Date) {
    this.clock = clock;
    this.#startedAt = clock.now();
  }

  elapsed() {
    return this.clock.now() - this.#startedAt;
  }
}
\`\`\`

Private fields beginning with \`#\` are enforced by the language. Class methods live on the prototype; static methods belong to the class itself. Prefer composition—objects that hold smaller capabilities—when a deep inheritance hierarchy would make behavior hard to change.

## Descriptors and defensive boundaries

Properties can be data properties or accessor properties. Descriptors control enumerability, writability, and configurability. These mechanisms are useful for libraries and specialized models; ordinary application objects rarely need custom descriptors.

When consuming JSON or plugin data, check its shape before using nested properties. A plain object is not automatically trusted just because it has the expected property names.

## References

- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)\r
`,"./chapters/06-arrays-collections-and-iteration.md":"# 6. Arrays, collections, and iteration\n\nArrays are ordered, zero-indexed objects. Use `map` to transform every item, `filter` to keep matching items, `find` to get the first match, and `some` or `every` for boolean questions. Use `reduce` when the accumulation is genuinely clearer than another method or loop; it is not automatically more readable.\n\n```js\nconst visibleNames = users\n  .filter((user) => user.active)\n  .map((user) => user.name);\n```\n\nMethods such as `sort`, `reverse`, `splice`, and `push` mutate the array. `sort` mutates and sorts values as strings by default, so provide a comparator for numbers:\n\n```js\nconst sorted = [...scores].sort((a, b) => a - b);\n```\n\n`toSorted`, `toReversed`, and `toSpliced` return new arrays in runtimes that support them. Check target compatibility before using newer methods. Sparse arrays have missing slots and behave differently across array methods; prefer dense arrays with an explicit value such as `null` when a position must be empty.\n\n## Choosing a collection\n\n- **Array:** ordered sequence, duplicates allowed, access by index.\n- **Set:** unique values and fast membership checks.\n- **Map:** key-value pairs where keys can be values of any type.\n- **WeakMap / WeakSet:** object-keyed associations that do not keep keys alive solely through the collection; they are not enumerable.\n\nUse `for...of` to iterate values and `Map`/`Set` entries. Iterables expose an iterator, which is why they can be consumed by `for...of` and spread syntax. Avoid `for...in` for collection values.\n\n## Keep updates predictable\n\nWhen state is shared with other code, prefer returning a new array instead of mutating it in place. This makes changes easier to observe and reduces hidden coupling. For large datasets, measure before replacing simple collection operations with more complex data structures.\n\n## References\n\n- [MDN: Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)\n- [MDN: Keyed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)\n- [MDN: Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)\r\n","./chapters/07-strings-numbers-dates-and-regular-expressions.md":`# 7. Strings, numbers, dates, and regular expressions

Strings are immutable sequences represented with UTF-16 code units. Therefore \`text.length\` counts code units, not necessarily user-perceived characters. Some characters use two code units; combining marks and emoji sequences can contain several code points. Use \`Intl.Segmenter\` when the product needs language-aware word or grapheme boundaries, after checking runtime support.

Template literals interpolate expressions and support multiline text. For dynamic HTML, do not assume that interpolation is safe; use DOM text APIs or a framework's escaping behavior rather than concatenating untrusted input into markup.

## Numbers and precision

JavaScript's \`Number\` is IEEE 754 binary floating point. Some decimal fractions cannot be represented exactly, so compare currency as integer minor units or use a decimal library designed for the domain. \`BigInt\` handles arbitrary-size integers, but cannot be mixed directly with \`Number\` arithmetic and is not serialized by \`JSON.stringify\` without an explicit conversion.

\`\`\`js
const cents = 1299;
const formatted = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR",
}).format(cents / 100);
\`\`\`

## Dates and regular expressions

\`Date\` stores an instant as milliseconds from the Unix epoch. Local display depends on timezone; parse and format with an explicit policy rather than assuming the user's timezone is UTC. For locale-aware output, use \`Intl.DateTimeFormat\`.

Regular expressions are useful for bounded pattern checks and extraction. They are not a substitute for a parser when the input has nested structure. Escape or constrain user-provided patterns, set reasonable input limits, and beware of patterns with catastrophic backtracking on attacker-controlled strings.

## References

- [MDN: Text formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting)
- [MDN: Numbers and strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings)
- [MDN: \`Date\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [MDN: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)\r
`,"./chapters/08-modern-syntax-and-data-transformation.md":'# 8. Modern syntax and data transformation\n\nModern JavaScript syntax helps express intent, but concise code is not automatically clear. Destructuring reads values from arrays or objects; defaults apply when the selected value is `undefined`, not when it is `null`.\n\n```js\nconst { title = "Untitled", author: owner } = article;\nconst [first, second, ...remaining] = values;\n```\n\nSpread syntax expands an iterable or copies enumerable own properties into a new array or object. These are shallow operations. Rest syntax gathers remaining parameters or properties. In a function signature, rest parameters must be last.\n\n## Optional and fallback values\n\nOptional chaining (`?.`) stops a property, element, or function call when the left side is `null` or `undefined`. It does not make every possible error disappear. Nullish coalescing (`??`) uses a fallback only for `null` or `undefined`; `||` uses it for all falsy values.\n\n```js\nconst displayName = account?.profile?.name ?? "Guest";\nconst suppliedLimit = config.limit ?? 20; // preserves a valid zero\n```\n\nDo not mix `??` with `&&` or `||` without parentheses; the grammar requires explicit grouping. Logical assignment operators (`||=`, `&&=`, `??=`) combine a test with assignment, but use them only when the condition reads naturally.\n\n## Transforming data\n\nKeep transformations small and explicit. Use object spread to update a top-level field without mutating the original:\n\n```js\nconst updated = {\n  ...user,\n  preferences: { ...user.preferences, theme: "light" },\n};\n```\n\nThis copies only the levels shown. For deeply nested updates, normalize the data shape or use a well-understood immutable update helper instead of assuming spread performs a deep clone.\n\n## Compatibility\n\nSyntax support and API support are separate. A build tool may transform syntax for older targets, but a runtime API may need a polyfill or a different implementation. Check the browsers and Node versions your app supports.\n\n## References\n\n- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)\n- [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)\n- [MDN: Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)\n- [MDN: Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)\r\n',"./chapters/09-errors-debugging-and-defensive-code.md":`# 9. Errors, debugging, and defensive code

An error is a signal that an operation could not safely continue. Throw an \`Error\` (or a specialized subclass) with a useful message; do not throw strings or silently return a success-shaped value when the operation failed.

\`\`\`js
function parseAge(value) {
  const age = Number(value);
  if (!Number.isInteger(age) || age < 0) {
    throw new RangeError("Age must be a non-negative integer");
  }
  return age;
}
\`\`\`

Use \`try...catch\` where your code can recover, add context, or translate an error for a caller. Avoid catching an error only to hide it. A \`finally\` block is useful for cleanup that must run whether an operation succeeds or fails.

\`\`\`js
async function saveDocumentSafely() {\r
  try {\r
    await saveDocument(document);\r
  } catch (error) {\r
    reportSaveFailure(error);\r
    throw error;\r
  }\r
}
\`\`\`

Errors can have a \`cause\` so a higher layer can add context without discarding the original failure:

\`\`\`js
async function initialize() {\r
  try {\r
    return await loadSettings();\r
  } catch (cause) {\r
    throw new Error("Could not initialize the application", { cause });\r
  }\r
}
\`\`\`

## Debug systematically

Read the complete stack trace, identify the first frame in your own code, and inspect the values at that boundary. Use a debugger breakpoint or a focused log rather than adding many permanent console statements. Reproduce with the smallest input that still fails, then add a regression test for the behavior.

Treat boundaries defensively: validate network data, parse user input, check optional values, and handle expected failure states. Do not use broad catch blocks as a replacement for input validation.

## Error boundaries

A useful error message says what operation failed and includes safe context, but avoids passwords, tokens, private user data, and raw secrets. At a UI boundary, show a clear next step while retaining technical detail in protected logs.

## References

- [MDN: Error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN: Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Node.js: Diagnostics](https://nodejs.org/en/learn/diagnostics)\r
\r
\r
`,"./chapters/10-promises-event-loop-and-async-code.md":`# 10. Promises, the event loop, and async code

A Promise represents the eventual result of an operation. It can be pending, fulfilled, or rejected. Use \`then\`/\`catch\` for promise chains or \`async\`/\`await\` for sequential-looking code. An \`async\` function always returns a Promise; throwing inside it rejects that Promise.

\`\`\`js
async function loadProfile(id) {
  const response = await fetch("/api/profiles/" + encodeURIComponent(id));
  if (!response.ok) throw new Error("Profile request failed");
  return response.json();
}
\`\`\`

\`await\` pauses the current async function until its promise settles; it does not block the JavaScript thread. In browsers, synchronous JavaScript runs to completion, then queued microtasks (including Promise reactions) are processed before the next task, such as many user events or timer callbacks. Rendering and host scheduling add details, so do not use timers as precise clocks.

## Run independent work together

Awaiting independent requests one by one adds their durations. Start them together and wait for both:

\`\`\`js
const [profile, preferences] = await Promise.all([
  loadProfile(id),
  loadPreferences(id),
]);
\`\`\`

Use \`Promise.all\` when any failure should fail the group; \`Promise.allSettled\` when every result matters. \`Promise.race\` settles with the first settled result, not necessarily the first success. Every launched operation still needs sensible cancellation or cleanup.

## Cancellation and errors

Promises themselves are not generally cancellable. APIs such as \`fetch\` accept an \`AbortSignal\`:

\`\`\`js
const controller = new AbortController();
const request = fetch(url, { signal: controller.signal });

// Call controller.abort() when the view is removed or the request is no longer useful.
\`\`\`

Catch expected failures at a boundary, distinguish aborts from real failures, and expose a retry path when appropriate. An unhandled rejection makes failures difficult to diagnose.

## Do not block the event loop

Long synchronous work prevents input and rendering from progressing. Break large tasks into chunks, use a Web Worker for CPU-heavy browser work, or move server work to an appropriate worker/thread mechanism. Async I/O improves responsiveness while waiting; it does not make expensive computation parallel by itself.

## References

- [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN: async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)\r
`,"./chapters/11-es-modules-and-project-tooling.md":`# 11. ES modules and project tooling

ES modules split a program into files with explicit imports and exports. Prefer named exports for multiple public values and a default export when a module has one primary value. Imports are resolved before a module runs; static imports make dependencies visible to tools and easier to analyze.

A module named math.js can export a helper:

\`\`\`js
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
\`\`\`

Another module imports that binding:

\`\`\`js
import { clamp } from "./math.js";
console.log(clamp(12, 0, 10));
\`\`\`

Module exports are live bindings: an importing module observes later updates to an exported binding, but should not assign to the imported name. Module code has its own top-level scope and runs in strict mode. Avoid large modules that mix UI, network, formatting, and persistence responsibilities.

## Dynamic imports and package boundaries

Use \`import()\` for code that should load only when needed, such as a rarely opened feature. It returns a Promise. In Node, package metadata and file extensions determine whether a file is parsed as ESM or CommonJS. Follow the package's declared module format instead of guessing from the syntax.

A package manager installs declared dependencies from the lockfile. Commit the lockfile for applications so contributors and CI resolve the same dependency graph. Keep runtime dependencies and development-only tools separate.

## Tooling roles

- A linter reports suspicious or inconsistent code.
- A formatter applies consistent layout.
- A bundler packages modules and assets for a target.
- A transpiler can transform syntax for older runtimes.
- A test runner executes behavior checks.

These tools do not replace understanding the runtime. Verify browser and Node compatibility, and do not add a build tool to a small script unless it provides a clear benefit.

## References

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Node.js: ECMAScript modules](https://nodejs.org/api/esm.html)
- [Node.js: Packages](https://nodejs.org/api/packages.html)\r
`,"./chapters/12-dom-events-and-accessible-interfaces.md":`# 12. DOM, events, and accessible interfaces

The DOM is a browser API, not part of the ECMAScript language itself. JavaScript can select elements, update text, and respond to user actions. Prefer semantic HTML first; JavaScript should add behavior rather than recreate native links, buttons, and form controls.

\`\`\`js
const button = document.querySelector("[data-action='save']");
button?.addEventListener("click", handleSave);
\`\`\`

Use \`textContent\` for untrusted text. Avoid inserting user-provided strings with \`innerHTML\`; parsing them as markup can create cross-site scripting vulnerabilities. If rich HTML is required, use a well-maintained sanitizer and a narrow allowlist.

## Event handling

Events bubble from the target through ancestors. Event delegation can handle a list of similar controls with one listener, but check that the event target is an expected element. Call \`preventDefault\` only when replacing a browser default behavior, and use \`stopPropagation\` sparingly because it can interfere with other listeners.

Listeners that outlive a component should be removed. An \`AbortController\` can group listener cleanup in browsers that support the signal option:

\`\`\`js
const controller = new AbortController();
container.addEventListener("click", handleClick, { signal: controller.signal });

// During cleanup:
controller.abort();
\`\`\`

## Forms and accessibility

Read form values from the form controls, validate them, and report errors next to the relevant fields. Keep controls labeled, preserve keyboard operation, and move focus deliberately when an interaction changes context. Announce important asynchronous status changes accessibly; do not use color alone to indicate success or failure.

For a simple form, listen to its \`submit\` event, call \`preventDefault\` when handling submission in JavaScript, and let the browser provide native validation unless the product needs custom rules.

## References

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [MDN: textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)\r
`,"./chapters/13-network-json-and-browser-storage.md":`# 13. Network requests, JSON, and browser storage

Use \`fetch\` for HTTP requests in modern browsers and supported Node.js versions. A fulfilled fetch response does not mean the server returned a successful status: check \`response.ok\` or \`response.status\`. Parsing JSON is a separate asynchronous step and can fail if the body is malformed.

\`\`\`js
async function getItems(query, signal) {
  const params = new URLSearchParams({ q: query });
  const response = await fetch("/api/items?" + params, { signal });

  if (!response.ok) {
    throw new Error("Could not load items (" + response.status + ")");
  }

  return response.json();
}
\`\`\`

Encode dynamic path segments with \`encodeURIComponent\` and query values with \`URLSearchParams\`. Do not manually concatenate untrusted values into URLs. Respect the API's authentication and CORS policy; CORS is enforced by the browser and is not a security control for the server itself.

## JSON boundaries

\`JSON.parse\` turns JSON text into JavaScript values; it does not validate that the resulting shape matches your assumptions. Validate required fields and types before using external data. \`JSON.stringify\` omits some values and throws on cyclic structures and ordinary \`BigInt\` values unless handled explicitly.

## Browser storage

- \`localStorage\` persists string values for the origin and is synchronous.
- \`sessionStorage\` is scoped to a browser tab session.
- IndexedDB supports larger structured data and asynchronous access.

Storage may be unavailable, cleared, or quota-limited. Handle failures. Never store passwords, long-lived secrets, or sensitive tokens in browser storage where injected page script could read them. Store only what the user experience requires and provide expiry/clear behavior.

## References

- [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON)
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)\r
`,"./chapters/14-testing-and-maintainable-code.md":`# 14. Testing and maintainable code

A useful test describes observable behavior: given an input or user action, what result should a caller see? Start with small, deterministic unit tests for pure functions. Add integration tests when multiple modules or platform APIs must work together. Use end-to-end tests for critical user journeys rather than duplicating every unit assertion in the browser.

Node provides a built-in test runner:

\`\`\`js
import test from "node:test";
import assert from "node:assert/strict";

function addTax(amount, rate) {
  return amount + amount * rate;
}

test("adds the supplied tax rate", () => {
  assert.equal(addTax(100, 0.1), 110);
});
\`\`\`

This file can be run with a compatible Node.js version using \`node --test\`. Browser applications may instead use a project test runner that simulates a DOM or launches a real browser; verify what each environment actually covers.

## Test the boundary, not implementation trivia

Check return values, rendered output, network behavior, and user-visible states. Avoid asserting private variable names or exact call sequences when they are not part of the contract. For asynchronous behavior, await the operation and test success, rejection, and cancellation paths.

Use dependency injection or a narrow wrapper for time, random values, network calls, and storage when tests need deterministic control. Do not mock every function: a test that only repeats implementation details can pass while the feature is broken.

## Maintainability practices

- Give values and functions names that explain their role.
- Keep one module focused on a related responsibility.
- Validate external input at its boundary.
- Prefer explicit return values over hidden shared mutation.
- Refactor duplication only when the shared abstraction clarifies behavior.

## References

- [Node.js test runner](https://nodejs.org/api/test.html)
- [MDN: Testing](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing)\r
`,"./chapters/15-performance-security-and-reliability.md":`# 15. Performance, security, and reliability

Optimize from evidence. Measure the slow interaction, inspect a profile, and address the costly work. Common wins include avoiding repeated expensive calculations, reducing unnecessary DOM updates, splitting large bundles, and caching data with a clear invalidation rule. Do not trade correctness for a micro-optimization without a measured benefit.

## Memory and responsiveness

Long-running pages can retain objects through event listeners, timers, closures, and caches. Clean up work when a view or task ends. Keep the main thread responsive; use a Web Worker for suitable CPU-heavy browser work, remembering workers communicate by messages and cannot directly manipulate the page DOM.

## Security boundaries

- Treat form input, URL parameters, API data, and third-party messages as untrusted.
- Render text with safe APIs; avoid constructing markup from untrusted strings.
- Validate on the server too; client-side validation is for user experience, not authorization.
- Never ship private keys or server credentials in browser JavaScript.
- Check authorization on the server for every protected operation.
- Keep dependencies current and review the source and permissions of new packages.

Prototype pollution can happen when merging untrusted object keys into sensitive objects. Validate allowed keys and avoid unsafe generic merge routines. Do not assume a value is trustworthy because it came from your own frontend.

## Reliability

Represent loading, success, empty, and failure states explicitly. Add timeouts or cancellation where the API permits them, retry only transient failures with a limit and backoff, and make repeated operations safe when a user can retry. Log diagnostic context without exposing secrets or personal data.

## References

- [MDN: Web security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [OWASP: Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN: Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Node.js: Security best practices](https://nodejs.org/en/learn/getting-started/security-best-practices)\r
`,"./chapters/16-internationalization-and-runtime-compatibility.md":`# 16. Internationalization and runtime compatibility

Use the built-in \`Intl\` APIs for locale-aware formatting rather than hand-building separators, currency symbols, or date strings. The user's locale, numbering system, and timezone can differ from yours.

\`\`\`js
const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
}).format(1250);

const date = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeZone: "Asia/Kolkata",
}).format(new Date());
\`\`\`

For calendar-sensitive or scheduling features, distinguish a date-only value (such as a birthday) from an instant (such as a payment timestamp). Store instants in a consistent representation, commonly ISO 8601 UTC timestamps, and format for the user's chosen timezone. Do not append a timezone label to a local time that was calculated in another timezone.

## Choose supported features deliberately

ECMAScript is updated through a standards process, while browsers and Node.js adopt features on their own schedules. The latest specification does not guarantee that every deployed runtime implements every built-in. Check compatibility for your actual support targets and test the oldest supported environment.

A proposal is not a stable platform contract. Prefer standardized features that your target runtimes support. When support is missing, choose a maintained polyfill or a simpler compatible implementation; avoid shipping a polyfill blindly if it changes global behavior.

Feature detection is usually safer than user-agent sniffing:

\`\`\`js
if ("Segmenter" in Intl) {
  const segmenter = new Intl.Segmenter("en", { granularity: "word" });
  console.log([...segmenter.segment("JavaScript notes")]);
}
\`\`\`

Keep date, currency, and language choices configurable when users may work across locales. Test representative scripts and right-to-left layouts, not only English text.

## References

- [MDN: Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization)
- [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [ECMAScript 2026 specification](https://tc39.es/ecma262/2026/)
- [MDN browser compatibility data](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables)\r
`,"./chapters/98-code-recipes.md":`# 98. JavaScript code recipes

Short examples for everyday tasks. Validate inputs and adapt error handling to the application that calls them.

## Group records by a key

\`\`\`js
function groupBy(items, getKey) {
  return Map.groupBy
    ? Map.groupBy(items, getKey)
    : items.reduce((groups, item) => {
        const key = getKey(item);
        const group = groups.get(key) ?? [];
        group.push(item);
        groups.set(key, group);
        return groups;
      }, new Map());
}
\`\`\`

Check target compatibility if using newer built-ins. A fallback should be tested against the same edge cases.

## Remove duplicates while keeping order

\`\`\`js
const uniqueValues = [...new Set(values)];
\`\`\`

## Safely read and validate JSON

\`\`\`js
function parseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, error };
  }
}
\`\`\`

## Sort without mutating the original array

\`\`\`js
const sortedUsers = [...users].sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
);
\`\`\`

## Debounce repeated calls

\`\`\`js
function debounce(callback, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
}
\`\`\`

Debounce is suitable for reducing repeated work such as search suggestions. It is not a replacement for request cancellation or server-side rate limiting.

## Fetch with a timeout signal

\`\`\`js
async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Request failed: " + response.status);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
\`\`\`

## Create an element and set user text safely

\`\`\`js
const message = document.createElement("p");
message.textContent = userSuppliedMessage;
container.append(message);
\`\`\`

## References

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN: Map.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy)
- [MDN: AbortSignal timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)\r
`,"./chapters/99-common-questions-and-answers.md":`# 99. Common JavaScript questions and answers

## Is JavaScript the same as ECMAScript?

JavaScript is the common name for the language; ECMAScript is the specification for its core behavior. Browser and server hosts add their own APIs.

## Is JavaScript compiled or interpreted?

Modern engines commonly parse and compile code using several execution strategies. “Compiled” and “interpreted” are not mutually exclusive descriptions of the entire runtime.

## What is the difference between \`let\`, \`const\`, and \`var\`?

\`let\` and \`const\` are block-scoped; \`var\` is function-scoped. \`const\` prevents rebinding, not mutation of an object. Prefer \`const\`, then \`let\` when reassignment is needed.

## What is the difference between \`null\` and \`undefined\`?

\`undefined\` commonly means a value was not supplied; \`null\` is often an intentional empty value. Pick a consistent convention at API boundaries and check both explicitly when needed.

## Why does \`0.1 + 0.2\` not equal exactly \`0.3\`?

Numbers use binary floating-point representation, and many decimal fractions cannot be represented exactly. For money, use integer minor units or a suitable decimal arithmetic library.

## What is a closure?

A function together with access to its surrounding lexical variables. The function can keep those bindings available after the outer function returns.

## Do arrow functions have their own \`this\`?

No. They capture \`this\` from the surrounding scope. An ordinary function's \`this\` depends on how it is called.

## Does \`await\` block JavaScript?

It suspends the current async function until a promise settles, letting other scheduled work proceed. Synchronous CPU-heavy JavaScript still blocks the thread.

## Why can fetch return 404 without throwing?

HTTP error statuses still produce a response. Check \`response.ok\` or \`response.status\` and throw or handle the status yourself.

## Is object spread a deep copy?

No. It copies enumerable own properties one level deep. Nested references remain shared.

## Is everything in JavaScript an object?

No. Strings, numbers, booleans, \`null\`, \`undefined\`, \`bigint\`, and symbols are primitives. Functions are callable objects.

## Are browser APIs part of the JavaScript language?

No. The DOM, \`fetch\`, and storage APIs are supplied by the browser. Node.js provides different host APIs.

## Should I use every new JavaScript feature?

Use features supported by the environments you target. Check compatibility and weigh readability before adopting a new API.

## How do I prevent XSS?

Avoid injecting untrusted strings as HTML. Use text-safe APIs, sanitize only when rich HTML is required, and enforce authorization and validation on the server.

## How do I debug a failed async request?

Inspect the network status and response body, check whether the request was aborted, and handle rejected promises at a useful boundary. Preserve diagnostic details without exposing secrets.

## References

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [ECMAScript specification](https://tc39.es/ecma262/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)\r
`})).map(([e,t])=>{let n=e.split(`/`).at(-1);return{content:t,fileName:n,number:Number(n.match(/^\d+/)?.[0]??0),slug:n.replace(/^\d+-/,``).replace(/\.md$/i,``),title:(t.match(/^#\s+(.+)$/m)?.[1]??n).replace(/^\d+\.\s*/,``)}}).sort((e,t)=>e.number-t.number),h=`/notes/javascript-notes`,g=new Map(m.map(e=>[e.fileName,e]));function _({href:e=``,children:t,...n}){let{node:r,...a}=n,[o,s]=e.split(`#`),c=o.split(`/`).at(-1),l=g.get(c),u=s?`#${s}`:``;if(/^README\.md$/i.test(c))return(0,p.createElement)(i,{to:`${h}${u}`,...a},t);if(l)return(0,p.createElement)(i,{to:`${h}/${l.slug}${u}`,...a},t);let d=/^(https?:|mailto:|tel:)/i.test(e);return(0,p.createElement)(`a`,{href:e,target:d?`_blank`:void 0,rel:d?`noopener noreferrer`:void 0,...a},t)}var v={a:_},y=`# JavaScript Notes

A practical guide to modern JavaScript for the browser and server. Learn the language from its runtime model and values through functions, objects, collections, asynchronous work, modules, browser APIs, testing, and safe production code.

These notes focus on standard JavaScript and clearly separate language features from browser and Node.js APIs. New language or runtime features can have uneven support, so check compatibility against the environments you target before adopting them.

## Chapters

1. [JavaScript, ECMAScript, and the runtime](chapters/01-javascript-ecmascript-and-the-runtime.md)
2. [Values, types, and coercion](chapters/02-values-types-and-coercion.md)
3. [Variables, scope, and control flow](chapters/03-variables-scope-and-control-flow.md)
4. [Functions, closures, and this](chapters/04-functions-closures-and-this.md)
5. [Objects, prototypes, and classes](chapters/05-objects-prototypes-and-classes.md)
6. [Arrays, collections, and iteration](chapters/06-arrays-collections-and-iteration.md)
7. [Strings, numbers, dates, and regular expressions](chapters/07-strings-numbers-dates-and-regular-expressions.md)
8. [Modern syntax and data transformation](chapters/08-modern-syntax-and-data-transformation.md)
9. [Errors, debugging, and defensive code](chapters/09-errors-debugging-and-defensive-code.md)
10. [Promises, the event loop, and async code](chapters/10-promises-event-loop-and-async-code.md)
11. [ES modules and project tooling](chapters/11-es-modules-and-project-tooling.md)
12. [DOM, events, and accessible interfaces](chapters/12-dom-events-and-accessible-interfaces.md)
13. [Network requests, JSON, and browser storage](chapters/13-network-json-and-browser-storage.md)
14. [Testing and maintainable code](chapters/14-testing-and-maintainable-code.md)
15. [Performance, security, and reliability](chapters/15-performance-security-and-reliability.md)
16. [Internationalization and runtime compatibility](chapters/16-internationalization-and-runtime-compatibility.md)
17. [Code recipes](chapters/98-code-recipes.md)
18. [Common questions and answers](chapters/99-common-questions-and-answers.md)

The material is original and example-driven. References point to the ECMAScript specification, MDN, and platform documentation for details and compatibility checks.

## Official references

- [ECMAScript 2026 language specification](https://tc39.es/ecma262/2026/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Node.js documentation](https://nodejs.org/docs/latest/api/)\r
`,b={layout:`_layout_8i34d_1`,projectHeader:`_projectHeader_8i34d_10`,backLink:`_backLink_8i34d_27`,projectIdentity:`_projectIdentity_8i34d_41`,eyebrow:`_eyebrow_8i34d_44`,chapterCount:`_chapterCount_8i34d_71`,body:`_body_8i34d_83`,sidebar:`_sidebar_8i34d_94`,sidebarHeading:`_sidebarHeading_8i34d_107`,navigation:`_navigation_8i34d_126`,navLink:`_navLink_8i34d_141`,active:`_active_8i34d_164`,navNumber:`_navNumber_8i34d_166`,content:`_content_8i34d_177`,chapterHeading:`_chapterHeading_8i34d_180`,markdown:`_markdown_8i34d_203`,missingChapter:`_missingChapter_8i34d_245`,chapterNavigation:`_chapterNavigation_8i34d_256`,referenceLink:`_referenceLink_8i34d_283`},x=r(),S=`/notes/javascript-notes`;function C(){let{chapterSlug:t}=a(),{pathname:r}=n(),u=(0,p.useRef)(null),h=m.findIndex(e=>e.slug===t),g=h>=0?m[h]:null,_=t?g?.content:y;return(0,p.useEffect)(()=>{u.current?.querySelector(`[aria-current="page"]`)?.scrollIntoView({behavior:`smooth`,block:`nearest`})},[r]),(0,x.jsxs)(`div`,{className:b.layout,children:[(0,x.jsxs)(`header`,{className:b.projectHeader,children:[(0,x.jsxs)(i,{className:b.backLink,to:`/notes`,children:[(0,x.jsx)(o,{"aria-hidden":`true`}),` All notes`]}),(0,x.jsxs)(`div`,{className:b.projectIdentity,children:[(0,x.jsxs)(`span`,{className:b.eyebrow,children:[(0,x.jsx)(s,{"aria-hidden":`true`}),` JAVASCRIPT AND THE WEB`]}),(0,x.jsx)(`h1`,{children:`JavaScript Notes`}),(0,x.jsx)(`p`,{children:`A practical guide to the language, the browser, and reliable application code.`})]}),(0,x.jsxs)(`span`,{className:b.chapterCount,children:[m.length,` chapters`]})]}),(0,x.jsxs)(`div`,{className:b.body,children:[(0,x.jsxs)(`aside`,{className:b.sidebar,children:[(0,x.jsxs)(`div`,{className:b.sidebarHeading,children:[(0,x.jsx)(`span`,{children:`CONTENTS`}),(0,x.jsx)(`strong`,{children:`JavaScript study guide`})]}),(0,x.jsxs)(`nav`,{ref:u,className:b.navigation,"aria-label":`JavaScript notes chapters`,children:[(0,x.jsxs)(e,{to:S,end:!0,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(s,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:`Overview`})]}),m.map(t=>(0,x.jsxs)(e,{to:`${S}/${t.slug}`,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(`span`,{className:b.navNumber,children:String(t.number).padStart(2,`0`)}),(0,x.jsx)(`span`,{children:t.title})]},t.slug))]})]}),(0,x.jsxs)(`main`,{className:b.content,children:[g&&(0,x.jsxs)(`div`,{className:b.chapterHeading,children:[(0,x.jsxs)(`span`,{children:[(0,x.jsx)(l,{"aria-hidden":`true`}),` CHAPTER `,String(g.number).padStart(2,`0`)]}),(0,x.jsx)(`h2`,{children:g.title})]}),_?(0,x.jsx)(`article`,{className:b.markdown,children:(0,x.jsx)(d,{remarkPlugins:[f],components:v,children:_})}):(0,x.jsxs)(`section`,{className:b.missingChapter,children:[(0,x.jsx)(`span`,{children:`CHAPTER NOT FOUND`}),(0,x.jsx)(`h2`,{children:`This JavaScript notes chapter is unavailable.`}),(0,x.jsxs)(i,{to:S,children:[`Back to the JavaScript notes index `,(0,x.jsx)(c,{"aria-hidden":`true`})]})]}),g&&(0,x.jsxs)(`nav`,{className:b.chapterNavigation,"aria-label":`Previous and next chapters`,children:[(0,x.jsxs)(i,{to:h===0?S:`${S}/${m[h-1].slug}`,children:[(0,x.jsx)(o,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:h===0?`Notes index`:m[h-1].title})]}),h<m.length-1&&(0,x.jsxs)(i,{to:`${S}/${m[h+1].slug}`,children:[(0,x.jsx)(`span`,{children:m[h+1].title}),(0,x.jsx)(c,{"aria-hidden":`true`})]})]})]})]}),(0,x.jsxs)(`a`,{className:b.referenceLink,href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide`,target:`_blank`,rel:`noopener noreferrer`,children:[`Official JavaScript Guide `,(0,x.jsx)(c,{"aria-hidden":`true`})]})]})}export{C as default};