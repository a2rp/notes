# JavaScript: Complete Summary

This is a course-wide overview of JavaScript, from the language foundations through browser and Node.js programming. It is a map for review, not a replacement for the lessons, Q&A, and examples that explain each subject in depth.

JavaScript is the language. ECMAScript defines its core syntax and behavior. A runtime adds APIs around the language: browsers provide the DOM and web platform, while Node.js provides server and operating-system APIs. The same JavaScript code can therefore behave differently when it depends on runtime-specific features.

## Contents

- [How JavaScript runs](#how-javascript-runs)
- [Source code, names, and modules](#source-code-names-and-modules)
- [Bindings, scope, and values](#bindings-scope-and-values)
- [Types, conversion, and comparison](#types-conversion-and-comparison)
- [Expressions and control flow](#expressions-and-control-flow)
- [Functions and execution context](#functions-and-execution-context)
- [Objects, prototypes, and classes](#objects-prototypes-and-classes)
- [Arrays, collections, and iteration](#arrays-collections-and-iteration)
- [Text, numbers, dates, and data formats](#text-numbers-dates-and-data-formats)
- [Asynchronous JavaScript](#asynchronous-javascript)
- [Modules and development tools](#modules-and-development-tools)
- [JavaScript in the browser](#javascript-in-the-browser)
- [JavaScript in Node.js](#javascript-in-nodejs)
- [Testing, security, reliability, and performance](#testing-security-reliability-and-performance)
- [Problem solving and application design](#problem-solving-and-application-design)
- [Everyday coding checklist](#everyday-coding-checklist)
- [Continue learning](#continue-learning)

## How JavaScript runs

An engine parses source code, checks syntax, and executes it. A runtime combines an engine with APIs and a way to load programs. The browser and Node.js both run JavaScript, but they do not provide exactly the same global objects or APIs.

JavaScript execution is generally single-threaded for ordinary code in a given execution context. The runtime can perform I/O and schedule callbacks while that code is not running. Workers and Node.js worker threads can run work on other threads, with messaging or shared-memory rules for coordination.

A program contains statements and expressions. An expression produces a value. A statement performs an action or controls which code runs. Blocks group statements. Comments explain intent and are ignored by the engine.

Automatic semicolon insertion is part of JavaScript parsing, but it does not make every line break safe. Write clear statements, use braces for control flow, and avoid line breaks after forms such as return when the following expression is meant to be returned.

Related lessons: [engines and runtimes](lessons/003-javascript-engines-and-runtime-environments.md), [source syntax](lessons/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md).

## Source code, names, and modules

Identifiers name variables, functions, classes, and other bindings. JavaScript is case-sensitive. Keywords have syntactic meaning, while reserved words cannot be used as identifiers. Contextual words such as async have special meaning only in particular grammar positions. Property names follow different rules from variable names.

Use descriptive camelCase names for ordinary variables and functions, PascalCase for class names, and UPPER_SNAKE_CASE for constants that represent fixed configuration by convention. The spelling style is a convention, not a language rule.

JavaScript can run as a classic script or as an ECMAScript module. Modules have their own top-level scope, use import and export, and run in strict mode. Prefer modules for organized applications. Keep modules focused and make dependencies visible through imports.

Related lessons: [identifiers and keywords](lessons/008-identifiers-keywords-reserved-words-and-naming.md), [scripts and modules](lessons/009-classic-scripts-modules-and-script-loading.md), [module imports and exports](lessons/081-export-and-import-forms.md).

## Bindings, scope, and values

Use const by default when a binding will not be reassigned. Use let when reassignment is required. Both are block-scoped. var is function-scoped and has older hoisting behavior, so avoid it in new code unless maintaining existing code requires it.

A binding declared with const cannot be reassigned. If it refers to an object or array, the object's contents can still change. const does not make nested data immutable.

A binding's scope is where it can be accessed. JavaScript has global, module, function, and block scopes. Closures preserve access to variables from the scope where a function was created. let and const declarations enter a temporal dead zone from the start of their scope until their declaration is evaluated. Function declarations and var have different hoisting behavior.

JavaScript has seven primitive types:

- undefined
- null
- boolean
- number
- bigint
- string
- symbol

Objects are reference values. Arrays, functions, dates, maps, sets, and regular expressions are objects. Two separately created objects are different identities, even if they contain the same properties.

Related lessons: [variables](lessons/010-variables-const-let-and-var.md), [scope](lessons/011-scope-global-function-and-block.md), [hoisting and the temporal dead zone](lessons/012-hoisting-and-the-temporal-dead-zone.md), [primitive values and object references](lessons/015-primitive-values-and-object-references.md).

## Types, conversion, and comparison

JavaScript is dynamically typed. A variable can hold values of different types over its lifetime. The value has a type, not the variable name.

Use typeof for many primitive checks. Remember that typeof null is object, an old language behavior. Use value === null for null checks and Array.isArray(value) for arrays. Use Number.isNaN when checking for NaN.

JavaScript sometimes converts values automatically. The plus operator can add numbers or join strings. Other operators can convert strings to numbers. Explicit conversions such as Number(value), String(value), and Boolean(value) make intent clearer, but validate input before conversion when invalid or empty input matters.

Prefer strict equality, === and !==, to avoid most implicit equality conversions. Loose equality, ==, has special rules and should be used only when its conversion behavior is intentional.

Truthy values behave like true in conditions. Falsy values are false, 0, -0, 0n, the empty string, null, undefined, and NaN. Empty arrays and empty objects are truthy.

Use || when any falsy value should trigger a fallback. Use ?? when only null or undefined should trigger it. Optional chaining, ?., stops a property access or call when the value before it is null or undefined. These operators prevent certain errors, but they do not validate data types or application rules.

Related lessons: [types and conversion](lessons/014-values-types-and-dynamic-typing.md), [null and undefined](lessons/016-undefined-null-and-nan.md), [type checks](lessons/018-typeof-instanceof-and-reliable-type-checks.md), [coercion](lessons/019-type-conversion-and-coercion.md), [equality](lessons/020-equality-comparison-and-relational-operators.md).

## Expressions and control flow

Operators combine values into expressions. Common groups include arithmetic, comparison, logical, assignment, conditional, bitwise, and type-checking operators. Operator precedence and associativity determine how expressions are grouped. Use parentheses when they make intent easier to read.

Logical AND and OR short-circuit: they may return one of their operands and may skip evaluating the right side. They are often used for conditional execution, but use explicit conditions when that makes the behavior clearer.

Use if and else for branches, switch for a set of explicit cases, and loops to repeat work. for...of iterates values from an iterable. for...in iterates enumerable string property keys, so it is usually not the right way to loop over an array.

break exits a loop or switch. continue skips to the next loop iteration. Labels can control nested loops, but smaller functions and clearer conditions are often easier to understand.

Throw Error objects when an operation fails. Use try, catch, and finally to handle failures where the program can recover, report useful context, or perform cleanup. Do not silently swallow errors.

Related lessons: [operators](lessons/026-operators-precedence-and-associativity.md), [conditional statements](lessons/030-conditional-statements.md), [loops](lessons/032-loops-and-iteration-statements.md), [errors](lessons/034-errors-exceptions-and-try-catch-and-finally.md).

## Functions and execution context

Functions are reusable values that can accept parameters and return results. JavaScript supports declarations, expressions, methods, and arrow functions. Parameters can have defaults. Rest syntax gathers remaining arguments. A function with no explicit return returns undefined.

Functions are first-class: they can be stored, passed to other functions, and returned. A higher-order function accepts or returns a function. Callbacks are functions passed to be called later or in response to an event.

A closure is a function with access to bindings from its surrounding lexical scope. Closures are useful for callbacks, private state, and function factories. They retain the bindings, so long-lived closures can also keep data in memory.

An ordinary function's this depends on how it is called. A method call such as object.run() supplies object as this. call, apply, and bind can set or preserve the receiver. Arrow functions do not create their own this; they use it from the surrounding scope. Choose an arrow or ordinary function based on the needed behavior.

Recursion solves a problem by calling the same function on smaller inputs. Each call consumes call-stack space. For very deep input, prefer an iterative approach or an algorithm designed to avoid stack growth.

Related lessons: [functions](lessons/036-function-declarations-and-expressions.md), [callbacks](lessons/040-callbacks-and-higher-order-functions.md), [closures](lessons/041-lexical-scope-and-closures.md), [this](lessons/042-this-and-invocation-context.md).

## Objects, prototypes, and classes

Objects store properties. Dot notation reads a known property name. Bracket notation supports dynamic keys. Methods are functions stored as properties. Getters and setters run when a property is read or assigned. Property descriptors control attributes such as writability and enumerability.

Destructuring extracts properties or array elements into bindings. Spread syntax expands arrays or object properties. Both are convenient for copying and transforming data, but object and array spread create shallow copies. Nested objects remain shared references. structuredClone can copy supported data structures when a deep copy is needed.

JavaScript uses prototypes for inheritance and delegation. Property lookup follows an object's prototype chain. Class syntax gives a structured way to create constructor functions and methods on that prototype model. Classes support inheritance through extends and super, static members, and private fields. Prefer composition when an object can be built from smaller behaviors without a deep inheritance chain.

Object identity, property keys, symbols, proxies, and reflection APIs provide lower-level control. Use these features when the data model requires them, not as a default for simple objects.

Related lessons: [objects](lessons/052-objects-properties-and-methods.md), [copying and identity](lessons/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md), [prototypes](lessons/059-prototypes-and-the-prototype-chain.md), [classes](lessons/061-classes-fields-and-methods.md).

## Arrays, collections, and iteration

Arrays are ordered, zero-indexed objects. Common operations include reading and updating an index, adding or removing items, searching, sorting, and transforming data.

map transforms each item into a new array. filter keeps matching items. find returns the first matching value. some and every check whether items satisfy a condition. reduce combines items into one result. These methods communicate intent, but a simple loop can be clearer for complex logic.

Some array methods mutate the original array, including sort, splice, push, and pop. Methods such as map, filter, and slice return new arrays. Copy before mutating when the original must be preserved. Sorting mutates the array and should use a comparator for numeric ordering.

Set stores unique values. Map stores key-value pairs with keys of any type. WeakMap and WeakSet hold object keys weakly and are not enumerable. Iterables expose values through the iterator protocol. Generators can produce values lazily with yield. Typed arrays provide views over binary data. Shared memory and Atomics are specialized tools for worker coordination.

Related lessons: [array methods](lessons/046-array-iteration-methods.md), [transforming arrays](lessons/047-transforming-arrays-map-filter-reduce-and-flat.md), [Map and Set](lessons/065-map-and-set-collections.md), [iterators and generators](lessons/068-iterables-and-the-iterator-protocol.md).

## Text, numbers, dates, and data formats

Strings are immutable text. Methods such as trim, includes, slice, replace, and split return results without changing the original. Template literals create multiline strings and interpolate expressions. JavaScript strings use UTF-16 code units, so a visible character may contain more than one code unit. Unicode code points and user-perceived grapheme clusters are different concepts.

Regular expressions describe text patterns. Use string methods for simple checks and transformations. Use regular expressions when pattern matching is needed, and keep complex expressions documented and tested.

Number uses floating-point representation, so many decimal fractions are approximate. Use Number.isFinite, Number.isNaN, and safe-integer checks when appropriate. BigInt represents arbitrary-size integers but cannot be freely mixed with number in arithmetic. Math provides common numeric operations.

JSON is a text data format. JSON.parse converts valid JSON text to a JavaScript value. JSON.stringify creates JSON text from supported values. JSON has limits: functions, symbols, undefined object properties, cyclic structures, and some special numeric values are not represented like ordinary JavaScript values.

Date represents an instant as milliseconds from the Unix epoch, while local display depends on time zones. Use Intl for locale-aware formatting. Temporal offers modern date and time types in environments that support it. For dates and times, decide whether the data means an instant, a calendar date, or a local wall-clock time.

Related lessons: [strings and Unicode](lessons/023-strings-and-template-literals.md), [regular expressions](lessons/072-regular-expression-syntax.md), [JSON](lessons/074-json-parsing-serialization-and-data-limits.md), [dates and time zones](lessons/076-dates-time-zones-and-temporal.md), [internationalization](lessons/077-intl-and-locale-aware-formatting.md).

## Asynchronous JavaScript

Synchronous code runs to completion on the current call stack. Asynchronous APIs let a runtime schedule work without blocking the thread while waiting for I/O, timers, or other events.

The event loop coordinates the call stack and queues. Promise reactions and other microtasks run at defined points before the runtime continues with later tasks. Timers schedule future work but do not guarantee an exact execution time. Long-running synchronous work can block interaction and rendering.

A Promise represents a result that may be available now, later, or never because of failure. Promise handlers return new promises, so chains can transform values and propagate errors. Promise.all waits for every input to fulfill and rejects if one rejects. Promise.allSettled waits for all outcomes. Promise.race settles with the first settled input. Promise.any fulfills with the first fulfilled input.

async functions always return a Promise. await pauses that async function until a promise settles, without blocking unrelated runtime work. Use try and catch for asynchronous failures. Parallelize independent operations when appropriate, and sequence dependent operations. Use AbortController for APIs that support cancellation. Cancellation is cooperative: the operation must observe the signal.

Related lessons: [event loop](lessons/091-the-event-loop-task-queues-and-microtasks.md), [promises](lessons/093-promises-states-chaining-and-error-handling.md), [async and await](lessons/095-async-and-await.md), [cancellation](lessons/097-cancellation-timeouts-and-abortcontroller.md).

## Modules and development tools

Modules divide code into files with explicit imports and exports. Static imports are resolved before module code runs. Dynamic import loads a module when needed and returns a Promise. Node.js supports ECMAScript modules and CommonJS, with package configuration and file extensions affecting how files are interpreted.

A package manager installs dependencies and runs project scripts. Keep the lockfile in version control so installations are reproducible. Add only dependencies the project needs and review updates for compatibility and security.

Formatters keep style consistent. Linters catch likely mistakes and enforce conventions. JSDoc can document types and API intent in JavaScript. Bundlers and transpilers can combine files or transform syntax for compatibility. Source maps connect generated code back to source files. Polyfills supply selected APIs where older runtimes lack them. Use these tools according to the target environment rather than adding them automatically.

Related lessons: [module loading](lessons/083-module-loading-resolution-and-import-maps.md), [npm and packages](lessons/084-package-json-npm-dependencies-scripts-and-package-managers.md), [bundlers and compatibility](lessons/086-transpilation-bundlers-polyfills-and-source-maps.md), [tooling](lessons/089-formatting-linting-jsdoc-and-editor-tooling.md).

## JavaScript in the browser

The browser exposes web APIs in addition to the JavaScript language. window is a browser global, globalThis refers to the current global object, and document represents the page. The DOM is a tree of nodes that JavaScript can query and update.

Use textContent for untrusted text. Avoid inserting untrusted strings with innerHTML because parsing them as markup can create cross-site scripting vulnerabilities. Build elements and set safe properties when dynamic content is needed.

Events travel through capture and bubbling phases. Event delegation handles events from a parent, which is useful for dynamic lists. Respect the event's default action unless there is a clear reason to prevent it. Forms should work with labels, keyboard interaction, and browser validation.

fetch sends HTTP requests and resolves to a Response. A network request can resolve even when the server returns an HTTP error status, so check response.ok or response.status. Parse the response body using the appropriate method. CORS is enforced by the browser and configured by the server. Credentials and cookies require careful handling.

Browser storage options have different purposes. Cookies can be sent with requests and should use appropriate security attributes. localStorage and sessionStorage are synchronous and suited to small string values, not secrets. IndexedDB supports larger structured data asynchronously. Files, clipboard access, device capabilities, and geolocation require user permissions or secure contexts where specified.

Web Workers move computation away from the main thread and communicate by messages. Service workers can support offline experiences and caching, but need a deliberate update and cache lifecycle. Observers report changes such as element visibility, size, or DOM mutations. Web Components combine custom elements and Shadow DOM. WebSockets and Server-Sent Events support real-time data with different communication models.

Accessibility is part of interface behavior. Preserve semantic HTML, keyboard access, visible focus, labels, and clear status announcements when JavaScript changes the page.

Related lessons: [DOM basics](lessons/099-the-dom-tree-selectors-and-traversal.md), [browser events](lessons/102-browser-events-capture-bubbling-and-default-actions.md), [Fetch and HTTP](lessons/105-fetch-api-requests-responses-and-headers.md), [browser security](lessons/119-browser-security-xss-injection-and-safe-dom-updates.md), [accessibility](lessons/118-accessibility-keyboard-interaction-and-dynamic-content.md).

## JavaScript in Node.js

Node.js runs JavaScript outside the browser and provides APIs for processes, files, networking, streams, and system integration. The process object exposes arguments, environment variables, exit status, and signals. Do not put secrets in source code or log them accidentally.

Use the filesystem and path APIs rather than assuming path separators or working directories. Promises-based APIs are useful for straightforward asynchronous file operations. Buffers represent raw bytes. Streams process data incrementally and use backpressure to avoid overwhelming memory or downstream consumers.

EventEmitter provides event-based communication. Timers and the Node.js event loop schedule work. Worker threads run JavaScript in separate threads. Child processes run separate programs and communicate through streams or messages. Choose between them based on whether work needs a separate process, shared process state, or CPU parallelism.

An HTTP server receives requests and sends responses. Validate incoming methods, paths, headers, and bodies. Set response status and headers deliberately. Handle errors and close resources reliably. Use the built-in test runner or another project test framework to verify services and command-line tools.

Related lessons: [Node.js runtime](lessons/122-node-js-runtime-globals-and-execution-model.md), [filesystem and paths](lessons/125-file-system-paths-and-url-handling-in-node-js.md), [streams](lessons/126-buffers-streams-and-backpressure.md), [HTTP servers](lessons/129-build-http-servers-and-handle-requests.md).

## Testing, security, reliability, and performance

Tests describe expected behavior. Unit tests focus on small pieces. Integration tests check how parts work together. Browser tests exercise user flows and interactions. Tests should cover normal cases, boundary values, invalid input, and failure behavior. Keep tests deterministic and make assertions describe the intended result.

Validate data at system boundaries, handle errors where recovery is possible, and use clear failure messages. Avoid assumptions about data from users, files, networks, and dependencies. Keep dependency versions reproducible and remove unused packages.

Security includes more than escaping HTML. Prevent injection by using safe APIs and validating inputs. Use secure random values for security-sensitive tokens. Keep cryptographic secrets out of browser code. Apply appropriate authorization on the server. Review dependencies and their supply chains.

Performance work starts with measurement. Profile CPU, memory, network, and rendering before optimizing. Reduce unnecessary work, large payloads, and long main-thread tasks. Watch for retained references and event listeners that keep unused objects alive. Use feature detection and graceful fallbacks for capabilities that may not exist in every target runtime.

Related lessons: [testing](lessons/087-testing-fundamentals-assertions-and-test-design.md), [security and reliability](lessons/137-error-handling-reliability-and-application-security.md), [performance](lessons/139-performance-analysis-memory-leaks-and-optimization.md), [compatibility](lessons/140-feature-detection-compatibility-and-graceful-fallback.md).

## Problem solving and application design

Data structures describe how information is organized. Arrays suit ordered sequences. Objects suit records with named properties. Map suits key-value relationships where keys may have any type. Set suits membership and uniqueness. Choose structures based on required operations.

Algorithmic complexity describes how work and memory grow as input size grows. Big O notation helps compare growth rates, but real performance also depends on runtime, data, and implementation. Common patterns include counting, lookup tables, two pointers, stacks, queues, recursion, and sorting.

Pure functions return results from inputs without changing unrelated state. Composition combines small functions. Object-oriented design groups behavior with data, while composition and delegation reuse behavior without requiring deep inheritance. Modular architecture keeps dependencies and responsibilities understandable.

Plan a project before coding: identify the user problem, data, states, interactions, errors, and constraints. Build small increments. Test important behavior. Document setup and usage. Review accessibility, security, compatibility, and performance before calling the project complete.

Related lessons: [data structures](lessons/132-data-structures-in-javascript.md), [algorithmic thinking](lessons/133-algorithmic-thinking-complexity-and-common-patterns.md), [functional programming](lessons/134-functional-programming-composition-and-purity.md), [application architecture](lessons/136-modular-architecture-and-dependency-boundaries.md), [capstone project](lessons/144-capstone-project-plan-build-test-and-document-an-application.md).

## Everyday coding checklist

- Use const by default and let only when a binding must change.
- Prefer strict equality and explicit conversion.
- Validate external data before trusting or using it.
- Keep functions focused and names descriptive.
- Know whether an operation mutates an array or object.
- Use for...of for iterable values and for...in only when property keys are intended.
- Handle rejected promises and check HTTP response status.
- Keep browser DOM updates safe and keyboard-accessible.
- Keep Node.js secrets outside source control.
- Test normal cases, edge cases, and failure paths.
- Measure before optimizing.
- Use runtime APIs only where the code will run.

## Continue learning

- [JavaScript keywords](javascript-keywords.md)
- [JavaScript quick reference and glossary](lessons/145-javascript-quick-reference-and-glossary.md)
- [All course lessons](README.md#lessons)