# 03 - JavaScript engines and runtime environments

JavaScript source code needs an environment in which it can run. A JavaScript engine implements the language, while a runtime environment brings the engine together with the APIs and services needed by a program.

This chapter explains how those pieces fit together, what happens at a high level when JavaScript runs, and why the same code can work in one environment but fail in another.

## Learning goals

After this chapter, you should be able to:

- Explain what a JavaScript engine does.
- Distinguish an engine from a runtime environment.
- Name common JavaScript engines and environments.
- Describe the broad steps from source code to program behavior.
- Explain why browser JavaScript and Node.js JavaScript have different APIs.
- Recognize syntax, runtime, and environment errors.

## What is a JavaScript engine?

A JavaScript engine is software that understands and executes JavaScript code according to the language rules. The engine is responsible for the core language behavior, such as evaluating expressions, calling functions, and managing JavaScript values.

Before an engine can run source code, it has to process the text and determine what it means. Engines may parse, interpret, compile, and optimize code in different ways. These are implementation choices. A programmer writes valid JavaScript and lets the engine handle those internal steps.

Common engine examples include:

| Engine | Commonly used in |
| --- | --- |
| V8 | Chrome and other Chromium-based browsers; Node.js also uses V8 |
| SpiderMonkey | Firefox |
| JavaScriptCore | WebKit and Safari |

These examples help identify engines, but they do not mean the whole browser or runtime is only an engine. A browser includes many other systems, and Node.js adds its own APIs around its engine.

## What is a runtime environment?

A runtime environment is the setting that runs JavaScript and connects it to the outside world. It includes an engine and environment-specific features such as APIs, scheduling, and ways to load code.

The term runtime environment describes the available execution setting. It does not require every product to use the same internal architecture.

A runtime environment can determine:

- Which global objects and APIs are available.
- How code is loaded and organized.
- How timers and asynchronous tasks are scheduled.
- Which system resources a program can use.
- Which language features and APIs the installed versions support.

## Engine, runtime, and host API

These related terms describe different parts of the system:

| Term | Meaning | Example |
| --- | --- | --- |
| JavaScript engine | Implements and executes the core JavaScript language | V8 |
| Runtime environment | Runs the engine and connects it to a host | A browser or Node.js |
| Host API | A feature supplied by the environment | The DOM in a browser, or file-system APIs in Node.js |

JavaScript does not define every feature that a program might need to interact with a page, a file system, or a network. The host provides APIs for those tasks.

## A browser runtime

When a browser runs JavaScript for a web page, the engine works as part of a larger browser environment. The browser provides APIs for page documents, events, timers, networking, storage, and other web features.

For example:

- The browser provides the page document and the DOM API.
- The browser can report events such as clicks and key presses.
- The browser provides APIs for requesting network resources.
- The browser controls access to web features according to its security model.

The JavaScript engine implements JavaScript language behavior. The browser supplies the page and web platform features the script can use.

## Node.js runtime

Node.js runs JavaScript outside a web browser. Node.js uses the V8 engine and provides its own APIs for tasks such as working with files, processes, and network servers.

A Node.js program does not automatically have a browser page, a window, or a DOM. A browser page does not automatically provide Node.js features such as access to the process object or unrestricted file-system access.

The language can be shared across these settings, but the host APIs are different.

## The same language, different environment

A basic JavaScript expression can run in both a browser console and Node.js:

~~~js
const total = 2 + 3;
console.log(total);
~~~

Both environments can evaluate the addition and ask their console to display the result.

This browser-specific code expects a page document:

~~~js
document.querySelector("h1");
~~~

A regular Node.js program does not provide a page document by default, so this code fails there unless another library or host deliberately provides a compatible document.

This Node.js example expects Node.js:

~~~js
console.log(process.version);
~~~

The process object is provided by Node.js. A browser page should not assume it exists.

When a program fails after being moved to another environment, check which APIs it uses before assuming that the JavaScript language itself is unsupported.

## What happens when JavaScript runs?

The exact implementation differs between engines. A useful high-level model is:

1. The runtime loads JavaScript source code.
2. The engine parses it and checks that its syntax follows the language rules.
3. The engine executes the program.
4. The engine may interpret or compile code and may optimize work while the program runs.
5. The program can call APIs that the host environment makes available.
6. The runtime and host coordinate tasks such as timers, user events, and network responses.

Modern engines can use a combination of techniques. JavaScript is not accurately described as always being interpreted or always being compiled. The engine decides how to execute code while preserving the language's required behavior.

The event loop and asynchronous task ordering are larger topics covered later in this guide.

## Why engines optimize code

An engine may notice that some code runs frequently and use optimization techniques to execute it more efficiently. These optimizations are internal. A program should still be written for correctness and clarity rather than depending on a particular engine's internal strategy.

Different engines can have different performance characteristics. Correct JavaScript behavior is defined by the language specification, while engine speed and internal optimizations can vary.

## Errors can come from different layers

### Syntax error

The engine cannot parse the source because its grammar is invalid. The program may stop before the affected script can run.

Example: a missing closing parenthesis can prevent a function call from being parsed.

### Runtime error

The code parses, begins to execute, and then encounters a problem, such as trying to call a value that is not a function.

### Environment error

The code expects an API or global value that the current runtime does not provide. For example, browser code may refer to a page document while running in a regular Node.js process.

When reading an error, ask which layer is involved:

1. Is the source valid JavaScript syntax?
2. Does the value or operation make sense while the program runs?
3. Does this environment provide the API the code expects?

## Language support and compatibility

The JavaScript language evolves through its standard, and runtime products adopt language features over time. Browsers and Node.js versions can support different sets of features.

When code must run in multiple environments:

- Know which browser or runtime versions matter.
- Use established features supported by those environments.
- Check feature support when using newer language features or host APIs.
- Use feature detection when the program must adapt to an available API.
- Consider a build tool or polyfill only when the project needs broader compatibility.

The exact support question depends on whether the feature is part of JavaScript itself or an API provided by the host.

## Security and permissions depend on the host

JavaScript does not receive unlimited access to a user's device simply because it is running. Browsers apply security restrictions and permissions to web pages. Node.js programs can often access more operating-system features, subject to the operating system, account permissions, and program configuration.

Do not infer a program's authority from the JavaScript language alone. Look at the runtime, APIs, permissions, and source code involved.

## A practical mental model

Think of execution as these connected parts:

~~~text
JavaScript source
       |
       v
JavaScript engine
       |
       v
Runtime environment and host APIs
       |
       v
Observable result
~~~

The engine handles the language. The runtime and host provide the surrounding capabilities. The program combines them to produce a result such as console output, a changed page, a file, or a network response.

## Try it yourself

1. Run the same addition example in a browser console and in Node.js. Compare the output.
2. Identify which environment provides the DOM API.
3. Explain why a regular Node.js file cannot find a page document by default.
4. Identify whether a missing parenthesis is a syntax problem, a runtime problem, or an environment problem.
5. Identify whether using an unavailable browser API in Node.js is a syntax problem, a runtime problem, or an environment problem.
6. Look up the JavaScript engine used by one browser you use, then distinguish that engine from the browser product.
7. Explain why an engine's optimization strategy should not change what a correct JavaScript program means.

## Key points

- A JavaScript engine implements and executes the core JavaScript language.
- A runtime environment includes an engine and host-provided capabilities.
- Browsers and Node.js run JavaScript with different APIs and permissions.
- Engines can parse, interpret, compile, and optimize code using implementation-specific techniques.
- JavaScript is not limited to one execution strategy.
- Syntax, runtime, and environment errors come from different layers.
- The runtime determines which host features a program can use.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [02 - JavaScript on the web: HTML, CSS, and JavaScript roles](002-javascript-on-the-web-html-css-and-javascript-roles.md) | [Open Q&A](../qnas/003-javascript-engines-and-runtime-environments.md) | [Open example](../examples/003-javascript-engines-and-runtime-environments.md) | [04 - Set up the editor, terminal, and project files](004-set-up-the-editor-terminal-and-project-files.md) |
