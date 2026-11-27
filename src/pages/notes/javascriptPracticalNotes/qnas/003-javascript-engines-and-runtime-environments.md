# 03 - JavaScript engines and runtime environments - Questions and Answers

Use these questions to check your understanding of engines, runtimes, and host APIs. Every answer appears directly after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is a JavaScript engine responsible for?

A. Styling web pages  
B. Implementing and executing the core JavaScript language  
C. Providing every operating-system API  
D. Hosting a website

**Answer: B. Implementing and executing the core JavaScript language.**

The engine processes JavaScript source and performs the language's required behavior. A host environment supplies additional capabilities.

### 2. Which description best fits a runtime environment?

A. A spelling rule for JavaScript identifiers  
B. An execution setting that includes an engine and connects code to host features  
C. A stylesheet used by a browser  
D. A JavaScript operator

**Answer: B. An execution setting that includes an engine and connects code to host features.**

The runtime determines which APIs, globals, scheduling services, and permissions are available to the program.

### 3. Which is a browser host API?

A. The DOM used to work with a web page  
B. The plus operator  
C. A JavaScript string value  
D. The ECMAScript language grammar

**Answer: A. The DOM used to work with a web page.**

The DOM is supplied by the browser. Operators, values, and syntax rules belong to the JavaScript language itself.

### 4. Which statement about Node.js is correct?

A. Node.js is a web browser that includes every browser API.  
B. Node.js is a JavaScript runtime that uses V8 and provides Node.js APIs.  
C. Node.js changes JavaScript into Java.  
D. Node.js is a CSS engine.

**Answer: B. Node.js is a JavaScript runtime that uses V8 and provides Node.js APIs.**

Node.js runs JavaScript outside the browser and supplies its own APIs. It does not provide a browser page document by default.

### 5. Which engine is commonly used by Firefox?

A. SpiderMonkey  
B. JavaScriptCore  
C. V8  
D. HTMLCore

**Answer: A. SpiderMonkey.**

SpiderMonkey is Mozilla's JavaScript engine. V8 is used by Chrome and Node.js, while JavaScriptCore is the engine used by WebKit.

### 6. What is true about how modern engines execute JavaScript?

A. Every engine only interprets code and never compiles it.  
B. Every engine uses exactly the same internal pipeline.  
C. Engines may parse, interpret, compile, and optimize code using different implementation strategies.  
D. JavaScript must first be manually converted into machine code by its author.

**Answer: C. Engines may parse, interpret, compile, and optimize code using different implementation strategies.**

The language defines required behavior. How an engine reaches that behavior is an implementation detail.

### 7. A Node.js program tries to use the browser's page document. What is the likely issue?

A. The source file has been styled incorrectly.  
B. The runtime does not provide that browser API by default.  
C. JavaScript cannot use objects.  
D. The engine has stopped implementing ECMAScript.

**Answer: B. The runtime does not provide that browser API by default.**

The code may be valid JavaScript syntax but still depend on a feature absent from its current environment.

### 8. Which pair is matched correctly?

A. V8 - JavaScript engine; browser - runtime environment  
B. CSS - JavaScript engine; V8 - stylesheet  
C. Node.js - JavaScript operator; DOM - engine  
D. HTML - JavaScript runtime; Firefox - host API

**Answer: A. V8 - JavaScript engine; browser - runtime environment.**

A browser contains more than its JavaScript engine. It provides the wider environment and web APIs that page code can use.

### 9. What is a syntax error?

A. A source-code grammar problem that prevents the affected code from being parsed correctly  
B. A missing browser API  
C. A CSS color that is hard to read  
D. A network response

**Answer: A. A source-code grammar problem that prevents the affected code from being parsed correctly.**

The engine checks syntax as it processes source. Syntax errors differ from errors that happen after valid code begins executing.

### 10. Why can the same JavaScript language behave differently across environments?

A. The language changes its meaning for every user.  
B. Runtimes provide different host APIs, versions, and permissions.  
C. HTML changes JavaScript arithmetic.  
D. Every browser uses a different programming language.

**Answer: B. Runtimes provide different host APIs, versions, and permissions.**

Core language behavior is standardized, while the surrounding environment and supported features can differ.

## True or false

### 11. A JavaScript engine and a runtime environment mean exactly the same thing.

**Answer: False.**

An engine implements the core language. A runtime includes the engine and the setting around it, including host APIs and other services.

### 12. The DOM is part of the core JavaScript language.

**Answer: False.**

The DOM is a Web API provided by browser environments. JavaScript can use it when that API is available.

### 13. Node.js uses the V8 JavaScript engine.

**Answer: True.**

Node.js uses V8 and adds its own runtime APIs for work outside the browser.

### 14. JavaScript is always interpreted and never compiled.

**Answer: False.**

Modern engines may combine parsing, interpretation, compilation, and optimization. The exact strategy depends on the engine.

### 15. A program that uses a browser-only API can fail in Node.js even when its JavaScript syntax is valid.

**Answer: True.**

Syntax validity does not guarantee that the runtime provides every API the program expects.

### 16. A JavaScript engine's optimization strategy should change the meaning of a correct program.

**Answer: False.**

Optimization is an internal implementation choice. A conforming engine must preserve the program's required language behavior.

## Short-answer questions

### 17. Explain the difference between an engine and a runtime environment.

**Answer:** An engine implements and executes the core JavaScript language. A runtime environment surrounds the engine with host APIs and services needed to run a program in a specific setting.

For example, a browser runtime supplies page and web APIs, while Node.js supplies APIs for server and operating-system tasks.

### 18. What is a host API?

**Answer:** A host API is a feature supplied by the environment in which JavaScript runs.

The browser's DOM and Node.js file-system APIs are examples. They are available because the host provides them, not because the JavaScript language itself defines them.

### 19. Why is a browser more than a JavaScript engine?

**Answer:** A browser includes an engine along with systems for loading and displaying documents, applying CSS, handling user input, and providing web APIs.

The engine runs JavaScript. The rest of the browser provides the page environment and related features.

### 20. What does it mean for a JavaScript engine to optimize code?

**Answer:** An engine may use internal techniques to improve how efficiently code executes, sometimes based on how often the code runs.

The programmer does not need to select the engine's internal strategy. Code should be written for correctness and clarity.

### 21. Name two differences between a browser runtime and Node.js.

**Answer:** A browser page provides APIs such as the DOM and browser events. Node.js provides APIs such as process information and file-system access.

They also apply different security and permission models. Neither environment should be assumed to expose every API from the other.

### 22. What three layers should you check when investigating a JavaScript error?

**Answer:** Check whether the source has valid syntax, whether the operation works at runtime, and whether the current environment provides the APIs the code uses.

These checks distinguish syntax errors, runtime errors, and environment errors.

### 23. Why should a programmer avoid depending on a particular engine's internal optimization details?

**Answer:** Engines can change their internals and optimize differently. Correct behavior should follow the language rules rather than depend on one engine's private implementation.

Use clear code and measure performance in the environments that matter to the project.

## Scenario questions

### 24. A script parses successfully, but it stops when calling an undefined browser API in Node.js. Which layer should you investigate?

**Answer:** Investigate the environment layer. The source can be valid JavaScript while the selected runtime does not provide the API.

Check whether the code belongs in a browser or whether it should use an API supplied by Node.js.

### 25. A teammate says, "JavaScript is interpreted, so it cannot be compiled." What is a better explanation?

**Answer:** JavaScript engines can use a combination of execution techniques, including interpretation and compilation. The details vary between engines and may change over time.

The important distinction for an application author is that the engine handles those details while preserving the language's required behavior.

### 26. The same arithmetic and string code runs in a browser console and Node.js, but a page query only works in the browser. Why?

**Answer:** Arithmetic and strings are part of the core language, which both environments implement. A page query relies on the browser's DOM API, which a regular Node.js runtime does not provide by default.

### 27. A bug report says, "It works in my browser but fails on the server." What should you ask first?

**Answer:** Ask which runtime and versions are used in each place, which APIs the code depends on, and what error is reported.

The server may use Node.js rather than a browser, so browser-only APIs may be absent.

### 28. A new JavaScript language feature works in one browser but not in an older supported browser. What should the developer consider?

**Answer:** Check the language feature's support in the target environments. The developer may choose a compatible alternative or use appropriate build tooling if the project requires support for older browsers.

Language features and host APIs both have compatibility considerations.

## Code-reading questions

### 29. What does this program display in a browser console and in Node.js?

~~~js
const total = 2 + 3;
console.log(total);
~~~

**Answer:** It displays:

~~~text
5
~~~

The addition and console output use common JavaScript functionality available in ordinary browser consoles and Node.js terminals.

### 30. Why does this code normally need a browser page environment?

~~~js
document.querySelector("h1");
~~~

**Answer:** It uses the browser's document API to find a heading in the current page.

A regular Node.js program has no current browser page document by default. A separate library or host could provide a compatible document, but that must be set up deliberately.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [02 - JavaScript on the web: HTML, CSS, and JavaScript roles](../lessons/002-javascript-on-the-web-html-css-and-javascript-roles.md) | [Open lesson](../lessons/003-javascript-engines-and-runtime-environments.md) | [Open example](../examples/003-javascript-engines-and-runtime-environments.md) | [04 - Set up the editor, terminal, and project files](../lessons/004-set-up-the-editor-terminal-and-project-files.md) |
