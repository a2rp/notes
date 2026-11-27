# Feature detection, compatibility, and graceful fallback - Q&A

These questions review [Chapter 140](../lessons/140-feature-detection-compatibility-and-graceful-fallback.md). Each answer follows its question and includes an explanation.

## Multiple-choice questions

### 1. What should application code usually check when deciding whether to use a feature?

A. The browser brand  
B. The specific capability the code needs  
C. The user's screen name  
D. The operating system alone

**Answer:** B. The specific capability the code needs.

**Explanation:** Feature detection checks what the current environment can do. Browser identity is an unreliable proxy for API support.

### 2. What does this condition test?

~~~js
typeof navigator.share === "function"
~~~

A. That sharing will certainly succeed  
B. That a callable share API is exposed  
C. That the user has granted every permission  
D. That the browser is a specific brand

**Answer:** B. That a callable share API is exposed.

**Explanation:** The method can still reject or be unavailable in the current context. The actual operation needs error handling.

### 3. What is the main purpose of CSS @supports?

A. To ask whether a CSS declaration is understood by the browser  
B. To detect the operating system  
C. To check network speed  
D. To run JavaScript code

**Answer:** A. To ask whether a CSS declaration is understood by the browser.

**Explanation:** It enables CSS enhancements to be applied only when a feature query succeeds, while base styles can remain available.

### 4. What does an @supports check not guarantee?

A. That the browser parsed the declaration  
B. That the feature is bug-free and behaves correctly in every case  
C. That the query has a CSS feature condition  
D. That base styles can exist

**Answer:** B. That the feature is bug-free and behaves correctly in every case.

**Explanation:** A query checks recognized support. It does not detect every partial implementation or implementation bug.

### 5. Which is a good foundation for progressive enhancement?

A. Semantic content and a working core task  
B. A browser-specific interface with no fallback  
C. A blank page until every advanced API is available  
D. User-agent parsing in every module

**Answer:** A. Semantic content and a working core task.

**Explanation:** The application can add enhancements on top of useful basic functionality.

### 6. What is one limitation of runtime feature detection for JavaScript syntax?

A. It cannot make a file parse when the parser rejects syntax in that file  
B. It cannot check whether an object has a method  
C. It always requires a server  
D. It only works in CSS

**Answer:** A. It cannot make a file parse when the parser rejects syntax in that file.

**Explanation:** The parser must understand the file before runtime checks can execute. Build-time transformation or compatible source syntax may be needed.

### 7. What does a transpiler generally do?

A. Transforms newer syntax into syntax supported by selected targets  
B. Automatically fixes all application bugs  
C. Grants browser permissions  
D. Guarantees a missing Web API is implemented

**Answer:** A. Transforms newer syntax into syntax supported by selected targets.

**Explanation:** Syntax transformation is different from providing missing runtime APIs. A polyfill may be needed for some APIs.

### 8. When is a polyfill appropriate?

A. When a required supported task needs a missing API and a reliable implementation exists  
B. Whenever a browser name looks old  
C. To replace server-side authorization  
D. To guarantee identical performance

**Answer:** A. When a required supported task needs a missing API and a reliable implementation exists.

**Explanation:** Polyfills have correctness, size, runtime, and maintenance costs. Some platform behavior cannot be faithfully polyfilled.

### 9. Which statement about user-agent detection is most accurate?

A. It reliably identifies every supported feature  
B. It is a poor default for deciding whether a capability is present  
C. It is required for CSS fallbacks  
D. It guarantees correct bug workarounds

**Answer:** B. It is a poor default for deciding whether a capability is present.

**Explanation:** User-agent strings can be reduced, spoofed, or include compatibility tokens. Detect the capability when possible.

### 10. What should code do after detecting an API but before assuming the task succeeded?

A. Handle permissions, context restrictions, rejection, and user cancellation  
B. Skip all error handling  
C. Assume the server authorized the user  
D. Hide every fallback

**Answer:** A. Handle permissions, context restrictions, rejection, and user cancellation.

**Explanation:** API presence says that a surface is exposed, not that every real operation is allowed or will succeed.

## Short-answer questions

### 11. What is feature detection?

**Answer:** Checking whether a specific API, method, or CSS capability is available before relying on it.

**Explanation:** It selects behavior according to the current environment's capabilities instead of guessing from its browser identity.

### 12. What is progressive enhancement?

**Answer:** Building a useful core experience first and adding optional capabilities as enhancements.

**Explanation:** Users can still complete important tasks when an enhancement is unavailable.

### 13. What is graceful fallback?

**Answer:** An alternate usable path when an enhancement is missing, denied, or fails.

**Explanation:** A fallback preserves the important task, such as offering a copyable URL when native sharing is unavailable.

### 14. How do @supports and a media query differ?

**Answer:** @supports tests CSS declaration support. A media query tests an environmental condition or user preference such as viewport size or reduced motion.

**Explanation:** They answer different questions and should be used for the condition they represent.

### 15. Why should the application still catch errors after a positive feature check?

**Answer:** The operation can require permission, a secure context, user activation, supported input, or an available device, and it can still reject.

**Explanation:** Capability detection is not a promise that an operation will succeed.

### 16. What should a product support policy describe?

**Answer:** Important user tasks, environments that matter, required capabilities, fallbacks, and the test matrix.

**Explanation:** Compatibility is a product decision based on the audience and use cases, and it needs review as those change.

### 17. What is one difference between a transpiler and a polyfill?

**Answer:** A transpiler transforms syntax at build time. A polyfill provides some missing runtime API behavior.

**Explanation:** A transpiler does not automatically create browser APIs that are absent.

### 18. Why can a fallback be better than a polyfill?

**Answer:** A simple alternate path may be smaller, easier to maintain, and more reliable than emulating a complex platform feature.

**Explanation:** Some capabilities depend on hardware, permission, or native behavior that cannot be recreated faithfully.

### 19. What is behavioral feature detection?

**Answer:** A narrow test that exercises a capability and checks a meaningful result when API presence alone is insufficient.

**Explanation:** Use a safe, deterministic behavior check for real implementation differences, avoiding side effects such as sending a payment or requesting sensitive permission.

### 20. Why should capability checks not be used for authorization?

**Answer:** Client-side checks can be bypassed or modified by a user.

**Explanation:** A trusted server must independently enforce access to protected operations and data.

## Code-reading questions

### 21. What does this check establish?

~~~js
if (typeof globalThis.structuredClone === "function") {
  return structuredClone(value);
}
~~~

**Answer:** It establishes that the runtime exposes structuredClone as a function before calling it.

**Explanation:** The operation can still fail for unsupported values. The rest of the file also needs to use syntax the runtime can parse.

### 22. Why is this browser check fragile?

~~~js
if (navigator.userAgent.includes("ExampleBrowser")) {
  useNewFeature();
}
~~~

**Answer:** The user-agent string may not identify support accurately, and other browsers may support the same feature.

**Explanation:** Check the needed capability and handle failures instead of maintaining browser-name assumptions.

### 23. What happens when the browser does not support grid here?

~~~css
.card-list {
  display: block;
}

@supports (display: grid) {
  .card-list {
    display: grid;
  }
}
~~~

**Answer:** The base block layout remains active.

**Explanation:** The grid layout is an enhancement applied only when the feature query succeeds.

### 24. What does this query test?

~~~css
@supports (display: grid) and (gap: 1rem) {
  .layout {
    display: grid;
    gap: 1rem;
  }
}
~~~

**Answer:** It checks whether both declarations are recognized before applying the rules inside the block.

**Explanation:** A true result does not prove that every possible grid or gap behavior is implemented without bugs.

### 25. What issue is present here?

~~~js
if (typeof navigator.share === "function") {
  navigator.share({ title: "Page" });
}
~~~

**Answer:** The returned promise is not handled, so a rejection can become unhandled.

**Explanation:** The user can cancel the share or the operation can fail. Await it in a handled async function or attach a rejection handler.

### 26. What is risky about this detector?

~~~js
try {
  eval("new SomeNewSyntax()");
  return true;
} catch {
  return false;
}
~~~

**Answer:** It evaluates a string as code, which adds security and maintenance risk and still does not provide a safe general syntax-support system.

**Explanation:** Use build targets, compatible source syntax, or a narrow capability check. Do not use eval as a routine parser feature probe.

### 27. What is this code checking?

~~~js
const hasDocument = typeof document !== "undefined";
~~~

**Answer:** It checks whether a document global exists in the current execution environment.

**Explanation:** This can distinguish some browser-window contexts from server or worker contexts. It does not prove every browser API is available.

### 28. Why can this check be insufficient?

~~~js
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
~~~

**Answer:** The API can be present while permission is denied or the operation fails.

**Explanation:** Handle the success and error callbacks and provide a useful path when location cannot be obtained.

### 29. What does this transpile call guarantee?

~~~js
const output = buildForOlderSyntax(source);
~~~

**Answer:** Only whatever transformations the configured build tool actually performs.

**Explanation:** Syntax transformation does not automatically polyfill missing APIs or ensure application behavior is compatible.

### 30. Why is this fallback incomplete?

~~~js
if (!("share" in navigator)) {
  shareButton.hidden = true;
}
~~~

**Answer:** It hides the native share control but does not provide another way to share the content.

**Explanation:** Keep a copyable URL or another useful task path available.

## Practical and applied questions

### 31. A new browser version supports an API, but an old version does not. How should the application choose behavior?

**Answer:** Check the API capability and provide the appropriate fallback if it is absent.

**Explanation:** Browser version numbers are not the capability the code needs and can differ across engines and devices.

### 32. A native share API is available, but the user cancels the share sheet. What should the page do?

**Answer:** Handle the cancellation as a normal outcome and leave the copyable URL available.

**Explanation:** API presence does not mean the user completed the action. Cancellation should not cause a broken page or misleading success state.

### 33. A feature query says a new CSS value is supported, but a layout bug appears in one supported environment. What is the next step?

**Answer:** Reproduce and test the actual behavior, then use a targeted workaround or simpler fallback if needed.

**Explanation:** CSS feature queries check recognized declarations and cannot detect every implementation defect.

### 34. An older runtime cannot parse optional chaining in a module. Can a typeof check inside that module fix it?

**Answer:** No.

**Explanation:** The parser must understand the whole file before executing a runtime check. Transform the syntax at build time or use syntax supported by the target.

### 35. The user denies location permission. Should the app keep requesting it until granted?

**Answer:** No. Explain what the feature needs and provide another way to complete the task when possible.

**Explanation:** Permission is a user decision, not a missing feature to work around.

### 36. A web page must remain useful when JavaScript fails to load. What design approach helps?

**Answer:** Put essential content and task structure in semantic HTML and add JavaScript as an enhancement.

**Explanation:** Progressive enhancement avoids making the only route to core content depend on optional script execution.

### 37. A team wants to load a large polyfill for every visitor. What should it investigate?

**Answer:** Confirm the support policy requires the API, whether a smaller fallback can work, which environments lack it, and the polyfill's correctness and cost.

**Explanation:** Polyfills add download, parsing, execution, and maintenance work. A fallback may be simpler.

### 38. A feature is missing in one device context but present in the browser. How should the code respond?

**Answer:** Handle the operation's failure or unavailable result and explain the fallback path.

**Explanation:** Capability checks do not establish hardware availability, permission, user activation, or execution context.

### 39. A team has a browser-specific workaround for a rendering bug. What should it document?

**Answer:** The precise observed behavior, the test that demonstrates it, the affected environment, and the condition for removing the workaround.

**Explanation:** A focused, reviewed workaround is easier to test and retire than scattered browser-version branches.

### 40. What should be tested for an enhanced control?

**Answer:** The capability-present path, the unsupported fallback, and failures after a positive check such as denial, cancellation, or rejected operations.

**Explanation:** Both availability and real outcomes matter. Compatibility tests should reflect the supported environments and user tasks.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [139 - Performance analysis, memory leaks, and optimization](139-performance-analysis-memory-leaks-and-optimization.md) | [Lesson](../lessons/140-feature-detection-compatibility-and-graceful-fallback.md) · [Q&A](140-feature-detection-compatibility-and-graceful-fallback.md) · [Example](../examples/140-feature-detection-compatibility-and-graceful-fallback.md) | [141 - Browser project: build an interactive interface](141-browser-project-build-an-interactive-interface.md) |
