# 140 - Feature detection, compatibility, and graceful fallback

Browsers, runtimes, and devices do not all provide the same features. A robust JavaScript application checks whether the capability it needs is available, then chooses a usable path for the current environment.

Feature detection works best when the core task is available first and enhancements are layered on top. It avoids assuming that a browser name or version accurately describes every capability, and it gives unsupported environments a clear, accessible fallback.

## Learning goals

- Define a supported environment and the application's essential capabilities.
- Detect JavaScript and CSS features directly.
- Distinguish feature support from permissions, user preferences, and successful operations.
- Build a core experience that remains useful without optional enhancements.
- Choose when to use a polyfill, a different implementation, or a graceful fallback.
- Understand what CSS feature queries and JavaScript API checks can and cannot prove.
- Test representative browsers and runtimes without relying on user-agent guesses.
- Account for syntax support separately from runtime API support.

## Start with a support policy

Compatibility begins with a product decision: which environments and user needs must the application support? Write down the required user journeys and the runtimes that matter to the people using the application.

A support policy can describe:

- The browsers, devices, and server runtimes the team tests.
- Which user tasks must work in every supported environment.
- Which features are optional enhancements.
- Whether a fallback is acceptable when a capability is missing.
- How the support target is reviewed as usage and platform support change.

Avoid targeting a browser version just because it is familiar. Use the real audience, application requirements, and current compatibility evidence to decide what to test. A support policy is a maintained product decision, not a one-time guess.

## Detect the capability, not the browser

User-agent strings can be incomplete, reduced, or include compatibility tokens for other browsers. Browser versions can support different capabilities, and different browsers can implement the same capability. For most feature decisions, the browser's name is not the property the code needs.

Instead of asking "Is this Chrome?" ask the exact question:

- Is a method available?
- Can this CSS declaration be parsed?
- Is a required data format supported?
- Is this operation available in the current security context?
- Did the operation succeed after the user requested it?

~~~js
const canShare = typeof navigator.share === "function";

if (canShare) {
  // Offer the native sharing action.
} else {
  // Keep a copyable link available.
}
~~~

Use **typeof** for methods and constructors that may be absent. For properties on objects, a property-presence check can be useful:

~~~js
if ("geolocation" in navigator) {
  // The API surface is present.
}
~~~

An API being present does not guarantee an operation will succeed. The page may need a secure context, permission, user activation, a supported data type, or an available device. Treat the operation itself as fallible and handle rejection or unavailable results.

Feature detection is not an authorization check. A client-side feature flag or available API must never decide whether a server allows a protected action.

## Detect CSS capabilities with feature queries

CSS has built-in support checks. Start with a useful base style, then add enhanced styles inside **@supports**.

~~~css
.card-list {
  display: block;
}

.card {
  margin-block: 1rem;
}

@supports (display: grid) {
  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1rem;
  }

  .card {
    margin-block: 0;
  }
}
~~~

Browsers that do not support the grid declaration retain the base block layout. Users can still read and use the cards.

JavaScript can query CSS support with **CSS.supports**:

~~~js
if (CSS.supports("display", "grid")) {
  console.log("Grid declarations are understood.");
}
~~~

A CSS feature query checks whether the browser considers the declaration valid. It does not prove that the feature is implemented without bugs or behaves exactly as the application expects. For critical behavior, test the actual behavior or use a simpler layout.

Use media queries for environment conditions such as viewport size or a user's motion preference. Use **@supports** for CSS capability. These answer different questions.

## Keep the essential experience available

**Progressive enhancement** starts with semantic content and a working core task, then adds optional capabilities. For a form, native controls and a normal submission path can provide a foundation before JavaScript adds instant feedback.

**Graceful fallback** supplies another path when an enhancement is unavailable or fails. The fallback should preserve the important task, not merely hide the unsupported feature.

Examples include:

- A native share action with a visible copyable URL.
- A map with a text address and directions link.
- A rich layout with a simple block layout underneath.
- An animation with a static state when animation is unavailable or reduced motion is requested.
- A file preview with a download link.
- Client-side form behavior with a server-handled submission path.

A fallback should be understandable, accessible to keyboard and assistive technology users, and safe for the data involved. Do not remove labels, error messages, or keyboard access to make a feature work in one environment.

**Graceful degradation** begins with a richer design and adapts it for environments that lack some features. It can work, but it is often harder to ensure that the result remains coherent. A core-first approach is usually easier to reason about.

## Distinguish support from preference and permission

Different checks answer different questions:

- **Feature detection** asks whether an API or syntax is available.
- **Media queries** can ask about viewport conditions or user preferences.
- **Permission checks** and operation results determine whether a user or platform allows a specific action.
- **Feature flags** decide whether product functionality is enabled for a deployment or audience.
- **Authorization** is a trusted server decision about access to protected resources.

For example, a browser may expose a share API but the user can cancel the share sheet. A browser may support geolocation but the user can deny permission. The code must handle these outcomes without treating a capability check as proof of success.

A preference such as reduced motion is not a missing animation API. It is a user instruction. Respect the preference even when animation is fully supported.

## Feature checks have limits

A presence check verifies an exposed API surface, not every detail of behavior. A feature may be partially implemented, gated by a setting, unavailable in a particular context, or affected by a browser defect.

When the behavior matters, use an appropriate behavioral check with a real input and output. Keep the check narrow and deterministic. Avoid invasive probes that create visible side effects or request sensitive permissions just to determine support.

Do not try to detect support by causing a failure that can damage state. For example, do not submit a payment, send a message, or request a user's location as a capability probe. Check the documented API surface and handle the real operation when the user initiates it.

## Syntax support differs from API support

Runtime checks can select between implementations when the source file can be parsed. They cannot protect an older JavaScript parser from syntax it cannot understand in the file.

~~~js
if (typeof globalThis.structuredClone === "function") {
  return structuredClone(value);
}

return cloneKnownData(value);
~~~

This check can select a fallback if the runtime parses the rest of the file. It cannot make unsupported syntax parse. Syntax such as optional chaining, class fields, or newer operators may need to be transformed at build time for older targets, or avoided in source that must run unchanged there.

A **transpiler** transforms newer syntax into a form supported by the chosen targets. It does not automatically provide every missing runtime API. A **polyfill** supplies an API implementation when one is absent. Neither should be added without considering the supported environments, package size, correctness, and maintenance.

Some platform features cannot be faithfully polyfilled because they depend on browser, operating system, hardware, permissions, or native security behavior. In those cases, implement an alternate user path.

## Keep feature selection understandable

Prefer one clear capability check near the decision that depends on it. Avoid scattering browser-version comparisons and fallback branches throughout unrelated modules.

~~~js
function getStorage() {
  try {
    if (typeof globalThis.localStorage !== "undefined") {
      return globalThis.localStorage;
    }
  } catch {
    // Storage access can be restricted in some contexts.
  }

  return null;
}
~~~

This check also handles a thrown access to the storage property. Code using the returned storage should still handle failures from operations such as **getItem** and **setItem**.

If support logic is reused, name it after the capability or behavior, not a browser brand. Keep a single implementation decision where possible, and test both the enhanced and fallback paths.

## Server rendering and environment checks

A module may run in a browser, a server process, a worker, or a test environment. Check for the capability or global it actually uses before accessing it.

~~~js
const hasDocument = typeof document !== "undefined";

if (hasDocument) {
  // Browser document work.
}
~~~

This can keep a module importable in more than one environment, but do not use a generic environment check to imply that every browser API is available. A worker has different globals from a window. Server rendering and hydration also need to produce compatible initial content.

Do not vary security-sensitive behavior based on a client-supplied browser name. The server must enforce authorization and input validation independently of what the user interface detects.

## Polyfills and fallback implementations

Use a polyfill when the missing API is required for a supported task and a reliable implementation exists. Load it only where needed when the build system and support policy allow that.

Before adding a polyfill, ask:

1. Does the support policy require this API?
2. Is the feature essential, or can the user complete the task another way?
3. Is the polyfill correct for the needed part of the specification?
4. Does it rely on native behavior that is unavailable?
5. What is its download, parse, execution, and maintenance cost?
6. Can the fallback be tested in the environments the project supports?

Do not add a large compatibility library automatically for every possible browser. A smaller fallback can be more reliable when only a simple alternate interaction is needed.

## Test the supported paths

Compatibility work needs tests for both the capability-present path and the fallback path. Also test failures after a positive feature check, such as denied permission, rejected user action, invalid data, or an operation that is unavailable in the current context.

Use a representative matrix rather than trying to test every browser version. Include devices and assistive technologies that matter to the product. Emulators and automation are useful, but they do not replace testing on real hardware for behavior tied to sensors, hardware, operating system dialogs, or permissions.

When a bug requires a browser-specific workaround, isolate it and document the exact observed behavior and removal condition. Verify the behavior directly, avoid broad version guesses, and revisit the workaround as the support target changes.

## Common mistakes

- Checking for a browser brand when the code needs one particular capability.
- Assuming a user-agent string is complete or unique to one browser.
- Treating an API's presence as proof that an operation will succeed.
- Treating a CSS feature query as proof of a bug-free implementation.
- Using JavaScript to detect syntax that prevents the file from parsing.
- Assuming a transpiler also supplies missing runtime APIs.
- Adding a polyfill without checking whether it can reproduce the needed behavior.
- Hiding the only route to a task when an enhancement is unavailable.
- Ignoring permission denial, user cancellation, or context restrictions.
- Confusing capability checks with authentication or authorization.
- Building a fallback that is inaccessible or unsafe.
- Testing only the modern path and never exercising the fallback.

## Key points

- Define the environments and tasks the product supports.
- Check capabilities directly instead of guessing from browser identity.
- Build a useful base experience and layer enhancements over it.
- Handle permission, context, and runtime failures after a positive feature check.
- CSS feature queries test declaration support, not complete behavior.
- Build tools handle syntax compatibility; polyfills handle some missing APIs.
- Keep fallbacks clear, accessible, secure, and covered by tests.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [139 - Performance analysis, memory leaks, and optimization](139-performance-analysis-memory-leaks-and-optimization.md) | [Open Q&A](../qnas/140-feature-detection-compatibility-and-graceful-fallback.md) | [Open example](../examples/140-feature-detection-compatibility-and-graceful-fallback.md) | [141 - Browser project: build an interactive interface](141-browser-project-build-an-interactive-interface.md) |
