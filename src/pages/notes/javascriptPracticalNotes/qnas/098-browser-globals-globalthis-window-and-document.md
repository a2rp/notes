# 98 - Browser globals, globalThis, window, and document

This Q&A reviews [Lesson 98](../lessons/098-browser-globals-globalthis-window-and-document.md). Every answer is followed by an explanation.

## Global access and host environments

### 1. What does `globalThis` provide?

**Answer:** A standard way to access the current realm's global `this` value.

**Explanation:** The JavaScript language provides the name, while the host environment supplies many of the APIs found on that global.

### 2. Does `globalThis` guarantee that every browser API exists?

**Answer:** No.

**Explanation:** Browser windows, workers, and server runtimes can expose different host APIs.

### 3. What does `window` refer to in ordinary browser page code?

**Answer:** The current browser-window browsing context.

**Explanation:** It exposes window-related browser APIs and the document associated with that context.

### 4. Is `window` a standard global in every JavaScript runtime?

**Answer:** No.

**Explanation:** It is a browser-window API. Workers and server environments should not assume that it exists.

### 5. What does `self` refer to in a worker?

**Answer:** The worker's global access point.

**Explanation:** Workers have their own host global and do not have a page's `window` or `document`.

### 6. What does `document` represent in a browser page?

**Answer:** The `Document` associated with the current browsing context.

**Explanation:** It represents the page structure and provides the entry point for working with the page's DOM.

### 7. What does `document.defaultView` return when the document has no browsing window?

**Answer:** `null`.

**Explanation:** A document can be created without being attached to a window or browsing context.

### 8. Does Node.js provide a page `document` by default?

**Answer:** No.

**Explanation:** Node.js is a server runtime, not a browser page. Browser-specific code must account for the host environment.

### 9. Does `globalThis` refer to one global object shared by all browser frames and workers?

**Answer:** No.

**Explanation:** Each realm or worker has its own global access point. An iframe has its own browsing context.

### 10. What is the relationship between `window.document` and `document` in a browser page?

**Answer:** They refer to the current page's document.

**Explanation:** `window.document === document` is true for the ordinary current window context.

### 11. Is the browser's `window` always just a plain object containing page properties?

**Answer:** No.

**Explanation:** Browsers use a `WindowProxy` layer to represent a browsing context, so some properties have host-defined behavior.

### 12. What is the usual relationship among `window`, `self`, and `globalThis` in a browser window?

**Answer:** They refer to the same window global access point in ordinary page code.

**Explanation:** This relationship is specific to a window environment. In a worker, `self` and `globalThis` refer to the worker global instead.

## Declarations and scope

### 13. Does a top-level `var` in a classic browser script typically create a `window` property?

**Answer:** Yes.

**Explanation:** Classic script global `var` declarations are associated with the global object's property environment.

### 14. Does a top-level `let` in a classic browser script create a `window` property?

**Answer:** No.

**Explanation:** It creates a global lexical binding, which can be used by its identifier without being a property on `window`.

### 15. Do top-level `const` declarations in a module become properties on `window`?

**Answer:** No.

**Explanation:** Module declarations are scoped to the module and are not added to the browser global object.

### 16. How does top-level `this` differ between a classic browser script and an ECMAScript module?

**Answer:** In a classic browser script it refers to the browser global, while in a module it is `undefined`.

**Explanation:** Module code has its own top-level scope and strict semantics. Use `globalThis` when the intent is to access the global value.

### 17. Can a top-level `var` in a Node.js module be assumed to create a `globalThis` property?

**Answer:** No.

**Explanation:** Node.js modules have their own module scope, unlike a classic browser script's global declaration behavior.

### 18. Why can two classic scripts accidentally overwrite the same top-level `var` name?

**Answer:** Their declarations can share the global script environment.

**Explanation:** A shared global namespace can create name collisions and order-dependent behavior.

### 19. What is a better way to keep application-specific variables out of the global namespace?

**Answer:** Use module scope, function parameters, or an intentionally designed namespace.

**Explanation:** Explicit dependencies are easier to understand, replace, and test than arbitrary global properties.

### 20. Does a module's top-level declaration become visible to unrelated modules as a global?

**Answer:** No.

**Explanation:** A module's declarations stay in its module scope unless the code explicitly exports them.

## Detecting host capabilities

### 21. Why is `typeof window` useful in shared JavaScript code?

**Answer:** It can check whether the `window` name exists without throwing a `ReferenceError`.

**Explanation:** Referencing an undeclared identifier directly can fail in a runtime that does not define it.

### 22. If code only needs `fetch`, what should it check?

**Answer:** Whether `globalThis.fetch` is a function.

**Explanation:** Checking `window` is an indirect proxy and can incorrectly exclude environments that provide `fetch` without a browser window.

### 23. Does detecting `window` prove that every browser API is available?

**Answer:** No.

**Explanation:** Check for the specific capability the code needs because host APIs vary by environment and version.

### 24. Why can reading `document.title` at module load time fail during server rendering?

**Answer:** The module may be evaluated in an environment with no `document`.

**Explanation:** Move DOM access to browser-only code or guard the access at a clear environment boundary.

### 25. How can code safely check whether the browser document exists?

**Answer:** Use `typeof document !== "undefined"` before accessing it.

**Explanation:** This avoids a reference error when the code runs in a worker or server environment without a document.

### 26. Is a feature check a substitute for designing code that can run in multiple hosts?

**Answer:** No.

**Explanation:** A guard is useful at a host boundary, but it does not resolve an architectural dependency on the DOM throughout the application.

### 27. Why might a function accept `fetch` as a parameter instead of reading it from `globalThis`?

**Answer:** It makes the function's dependency explicit and replaceable.

**Explanation:** A test or another runtime can pass a different implementation without modifying global state.

### 28. If a value exists on `globalThis`, is it necessarily part of the ECMAScript language itself?

**Answer:** No.

**Explanation:** The host can add properties such as browser APIs or runtime-specific functions to the global object.

## Documents and browsing contexts

### 29. Can a document exist without a current browser window?

**Answer:** Yes.

**Explanation:** A document can be created off-screen or without an associated browsing context, in which case `defaultView` can be `null`.

### 30. What should page code consider after navigation replaces the current document?

**Answer:** References to the old document may no longer represent the new page.

**Explanation:** Use the current document when code is expected to operate after navigation rather than retaining stale page references.

### 31. Does an iframe use the same `globalThis` as its parent page?

**Answer:** No.

**Explanation:** It has its own browsing context and global access point.

### 32. Can a parent page freely read every property of an iframe's `contentWindow`?

**Answer:** No.

**Explanation:** Browser same-origin rules can restrict access to another frame's properties.

### 33. Where should browser APIs such as `location` and `navigator` be accessed in window code?

**Answer:** Through the browser window or the relevant host global.

**Explanation:** These are host-provided APIs. `window.location` makes the browser context explicit, while availability in other runtimes can differ.

### 34. Does `document.defaultView` always equal the global object of every script that holds the document?

**Answer:** It refers to the window associated with that document, if any.

**Explanation:** A detached document may have no associated window, and another frame can have a different global.

## Practical choices

### 35. What is `globalThis` useful for in shared code?

**Answer:** Accessing the current realm's global value without assuming the host name is `window`.

**Explanation:** It works across hosts, though the APIs available on it still depend on that host.

### 36. Should unrelated app state such as a current user and API URL be added directly to `window`?

**Answer:** Usually not.

**Explanation:** Unstructured global state creates hidden dependencies, collisions, and order-sensitive code.

### 37. Which declaration type should be preferred over a classic script global when possible?

**Answer:** A module-scoped declaration.

**Explanation:** Module scope avoids adding application names to the shared global object.

### 38. Can `globalThis.fetch` safely be used in every JavaScript environment?

**Answer:** No.

**Explanation:** The global object is standardized, but the host's fetch implementation and API availability can vary.

### 39. Why should shared browser and server code avoid reading `document` during import?

**Answer:** The code may be imported in a runtime that does not have a page.

**Explanation:** Delaying the DOM access or injecting what is needed allows the module to load in more than one host.

### 40. What is the best practice when accessing a host-specific global?

**Answer:** Check the specific capability or inject it, and keep its use near the host boundary.

**Explanation:** This makes environment assumptions explicit and reduces accidental dependence on the browser global namespace.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [97 - Cancellation, timeouts, and AbortController](../lessons/097-cancellation-timeouts-and-abortcontroller.md) | [Open lesson](../lessons/098-browser-globals-globalthis-window-and-document.md) | [Open example](../examples/098-browser-globals-globalthis-window-and-document.md) | [99 - The DOM tree, selectors, and traversal](../lessons/099-the-dom-tree-selectors-and-traversal.md) |