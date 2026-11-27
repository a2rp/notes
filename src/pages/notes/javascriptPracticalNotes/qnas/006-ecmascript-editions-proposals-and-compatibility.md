# 06 - ECMAScript editions, proposals, and compatibility: Q&A

Use these questions to review ECMAScript editions, TC39 proposal stages, runtime support, and compatibility strategies.

## Multiple-choice questions

### 1. What does the ECMAScript specification define?

A. Only the visual appearance of web pages  
B. Core JavaScript language behavior  
C. Every browser's user interface  
D. The contents of every website

**Answer: B.** ECMAScript specifies the core language, including syntax, values, functions, objects, and built-ins. Browsers and other runtimes also provide host APIs.

### 2. What does the name ES6 commonly refer to?

A. ECMAScript 2009  
B. ECMAScript 2015  
C. A separate programming language  
D. A browser version

**Answer: B.** ES6 is a common name for the sixth edition, ECMAScript 2015.

### 3. What do TC39 proposal stages primarily describe?

A. How mature a proposed language change is in the standards process  
B. Which browser is the fastest  
C. Whether a website has completed testing  
D. How many JavaScript files a project contains

**Answer: A.** Stages describe proposal maturity. They do not by themselves show support in a specific browser or runtime.

### 4. Which proposal stage is the early strawperson stage?

A. Stage 0  
B. Stage 2.7  
C. Stage 3  
D. Stage 4

**Answer: A.** Stage 0 is an idea being explored, before it becomes a formal committee proposal with acceptance criteria.

### 5. Which stage indicates a proposal is recommended for implementation and needs implementation experience?

A. Stage 0  
B. Stage 1  
C. Stage 3  
D. Stage 4

**Answer: C.** Stage 3 means the design has been recommended for implementation. Implementation experience can still reveal compatibility or integration problems.

### 6. Which statement about Stage 4 is most accurate?

A. Every runtime supports the feature immediately  
B. The proposal is complete in the standards process and can be integrated into a future edition  
C. The proposal is only an unreviewed idea  
D. The feature works only in browsers

**Answer: B.** Stage 4 marks completion in the proposal process. Runtime support still depends on implementations and their versions.

### 7. What does feature detection check?

A. The browser brand name  
B. Whether a particular capability is available  
C. The user's screen size only  
D. Whether the page has a README

**Answer: B.** Feature detection tests for the property, method, or capability that the code needs.

### 8. Why can a runtime condition not protect source code containing syntax an engine cannot parse?

A. Conditions are not allowed in JavaScript  
B. The engine must parse the script before executing the condition  
C. Feature detection only works in Node.js  
D. The browser ignores all conditions

**Answer: B.** If the parser cannot understand the syntax, execution fails before the condition can run. A build step can transform syntax for older targets.

### 9. What is the primary job of a transpiler?

A. Transform source syntax into syntax suitable for configured targets  
B. Guarantee that all browser APIs exist  
C. Detect a user's browser brand  
D. Replace the ECMAScript specification

**Answer: A.** A transpiler transforms source syntax. Missing runtime APIs may still require a polyfill or fallback.

### 10. What is a polyfill used for?

A. To provide an implementation for some missing APIs  
B. To make invalid syntax valid before parsing  
C. To identify a browser from its name  
D. To publish a new ECMAScript edition

**Answer: A.** A polyfill can provide a missing API when its implementation can run in the target environment. It generally cannot teach an older parser arbitrary new syntax.

## True or false

### 11. JavaScript and ECMAScript name two completely separate programming languages.

**Answer: False.** JavaScript is the common language name. ECMAScript is the standard that defines its core language behavior.

### 12. The year in ES2020 guarantees that all browsers added every feature from that edition in 2020.

**Answer: False.** The label identifies an edition. Browser and runtime implementations release independently and may adopt features at different times.

### 13. A Stage 3 proposal is guaranteed to work in every browser.

**Answer: False.** Stage 3 describes proposal maturity and recommendation for implementation. Check actual support in the target environments.

### 14. A JavaScript runtime can support ECMAScript while providing different host APIs from a browser.

**Answer: True.** Node.js and browsers can implement the core language while exposing different environment-specific APIs.

### 15. Checking for a method can help determine whether an API capability is available.

**Answer: True.** A check such as **typeof Array.prototype.at === "function"** tests whether that method is present.

### 16. If a method exists, every call to it is guaranteed to succeed.

**Answer: False.** The operation may depend on valid inputs, permissions, user activation, security context, or other runtime conditions.

### 17. A polyfill and a transpiler always solve the same problem.

**Answer: False.** A transpiler transforms syntax. A polyfill can provide some missing APIs. A project may need either, both, or neither.

### 18. Compatibility tables and testing are useful even when code uses feature detection.

**Answer: True.** Feature detection handles a capability at runtime. Compatibility research and environment testing help decide whether a feature and its behavior fit the project's overall target.

## Short-answer questions

### 19. What is an ECMAScript edition?

**Answer:** It is a published revision of the ECMAScript language specification. Editions are commonly identified by a year, such as ES2015 or ES2020.

### 20. What does a proposal champion do?

**Answer:** A champion or champion group takes responsibility for developing a proposal through the standards process, explaining its design, and bringing it forward for committee review.

### 21. What is the purpose of proposal stages?

**Answer:** Stages provide a structured way to investigate a problem, shape a design, specify it, validate it, and gain implementation experience before completion.

### 22. What does Stage 2.7 signify in the proposal process?

**Answer:** It is a readiness point for rigorous testing and validation. The design and specification text are considered complete enough to gather feedback from tests and implementations.

### 23. How is a host API different from a language built-in?

**Answer:** A language built-in is defined as part of ECMAScript, such as **Array.prototype.at**. A host API is provided by the surrounding environment, such as the browser's **document** object.

### 24. Why is browser-name detection often less reliable than feature detection?

**Answer:** User-agent strings can be ambiguous or change, and browsers with the same brand can have different versions. Testing the needed capability directly is usually more relevant than guessing from a browser name.

### 25. What should a project decide before relying on a new JavaScript feature?

**Answer:** It should define the browsers, runtimes, and versions it needs to support, identify the exact syntax or API, check support for those targets, and choose a fallback or build step if needed.

### 26. Why does a syntax feature need a different compatibility strategy from a missing method?

**Answer:** Unsupported syntax can stop the source from parsing before JavaScript runs. A missing method can often be checked at runtime and handled with a fallback. Transpilation may be needed for syntax, while a polyfill or fallback may be needed for an API.

## Read the code

### 27. What does this code check?

~~~js
if (typeof Array.prototype.at === "function") {
  console.log("Array.prototype.at is available");
}
~~~

**Answer:** It checks whether **Array.prototype.at** exists as a function in the current runtime. It does not identify the browser brand or prove that all other environments support it.

### 28. What value does the fallback return if **items** is **["red", "green", "blue"]** and the environment has no **at** method?

~~~js
function getLastItem(items) {
  if (typeof items.at === "function") {
    return items.at(-1);
  }

  return items[items.length - 1];
}
~~~

**Answer:** It returns **"blue"**. If **at** is unavailable, the final array index is **items.length - 1**.

### 29. What is missing from this compatibility check?

~~~js
if (supportsOptionalChaining) {
  const city = user?.address?.city;
}
~~~

**Answer:** A runtime condition cannot protect the parser from unsupported optional-chaining syntax in the same script. The engine must parse the code before it can evaluate **supportsOptionalChaining**. Use a build step that transforms the syntax or avoid it for targets that cannot parse it.

## Scenarios

### 30. A blog says a proposal reached Stage 4. What should you check before using the feature in your app?

**Answer:** Check whether each target browser and runtime version actually supports the feature, whether the project needs a transpiler or polyfill, and whether the behavior works in representative target environments. Stage 4 alone does not guarantee universal support.

### 31. A new built-in method works in your current browser but is missing in an older target browser. What are two possible approaches?

**Answer:** Use a fallback that provides the required behavior, or use a compatible polyfill if one is appropriate. If the project also uses newer syntax, configure a transpiler for the target syntax level.

### 32. The project needs to support an older JavaScript parser, but your code uses new syntax. Why is adding a conditional branch not enough?

**Answer:** The old parser must understand the complete script before it can execute the branch. Transform the syntax during the build or write code using syntax supported by the oldest target.

### 33. Your runtime has **navigator.clipboard.writeText**, but calling it fails. Does this prove that feature detection was useless?

**Answer:** No. The check established that the method exists, but an API call may also depend on conditions such as permissions, user activation, secure context, or successful completion. Handle the operation's result or failure as well.

### 34. A teammate says, “We support ES2020.” What follow-up questions would clarify that claim?

**Answer:** Ask which browser, runtime, and versions are included in the support target; which specific ES2020 syntax and APIs the project uses; whether the build transforms syntax; whether polyfills are included; and how the target environments are tested. An edition label alone is too broad to guarantee support.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [05 - Browser console and developer tools](../lessons/005-browser-console-and-developer-tools.md) | [Open lesson](../lessons/006-ecmascript-editions-proposals-and-compatibility.md) | [Open example](../examples/006-ecmascript-editions-proposals-and-compatibility.md) | [07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion](../lessons/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) |
