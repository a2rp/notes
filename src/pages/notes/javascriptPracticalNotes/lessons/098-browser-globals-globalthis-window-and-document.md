# 98 - Browser globals, globalThis, window, and document

JavaScript runs inside a host environment. A browser, a worker, and Node.js each provide different global values and APIs. `globalThis` is the standard way to access the current realm's global `this` value. In a browser window, `window` and `document` are familiar host objects for the current browsing context and its page.

Knowing which parts come from JavaScript and which come from the host prevents code from assuming that every environment has a browser page.

## The global object and `globalThis`

JavaScript defines the `globalThis` property as a consistent way to access the current realm's global `this` value:

```js
console.log(globalThis);
console.log(globalThis.setTimeout);
```

The ECMAScript language defines `globalThis`, but the host environment supplies many properties found on it. A browser window, a worker, and Node.js do not all provide the same APIs.

For example, `setTimeout`, `fetch`, and `console` are commonly available in modern environments, but their presence and behavior depend on the host and runtime version. `globalThis` does not make every browser API universal.

Use `globalThis` when code intentionally needs to access a global value through an object. Prefer ordinary imports and function parameters for application dependencies so that code is easier to test and reuse.

## `window` in a browser window

In a browser page, `window` is the familiar reference for the current browsing context. It exposes browser-window APIs and the associated `document`:

```js
console.log(window.location.href);
console.log(window.document.title);
```

In ordinary code running in a browser window, `window`, `self`, and `globalThis` refer to the same window global access point:

```js
console.log(window === globalThis); // true in a browser window
console.log(self === globalThis);   // true in a browser window
```

Browser internals include a `WindowProxy` layer that represents a browsing context. For everyday page code, treat `window` as the browser-window reference. Its behavior is not a promise that every browser global is a plain object property.

`window` is not a JavaScript language feature that every host must provide. Code that also runs in workers or server environments should not assume that `window` exists.

## `document` represents a page document

In a browser window, `document` refers to the `Document` associated with that browsing context:

```js
console.log(document.title);
console.log(window.document === document); // true for the current page
```

The document represents the page structure the browser parsed or created. It is the entry point for working with elements, text, metadata, and other document content. The next chapter focuses on the DOM tree and selecting or traversing nodes.

A `Document` may not have a browsing window. For example, a document created off-screen can have `document.defaultView === null`. When a document does have an associated window, `document.defaultView` refers to that window access point.

A page's `document` changes when navigation replaces its content. Do not keep a reference to an old document when code is expected to operate on the newly loaded page.

## Browser windows, workers, and server runtimes

The current host determines which globals exist:

| Environment | Global access | Window object | Document object |
| --- | --- | --- | --- |
| Browser page | `globalThis`, `window`, `self` | Yes | Yes for its page |
| Web worker | `globalThis`, `self` | No | No |
| Node.js | `globalThis` | Not a browser-window API | No page document by default |

Workers can use worker APIs but do not have a page's `window` or `document`. A worker's `self` refers to its worker global. Node.js provides a host global but does not provide a browser page document by default.

A browser iframe has its own browsing context and its own global access point and document. Code in one frame may have restricted access to another frame, depending on the browser's same-origin rules. Do not assume that `globalThis` refers to one universal global shared by all frames or workers.

## Detect host APIs safely

Referencing an undeclared identifier can throw a `ReferenceError`. `typeof` can safely check whether a host global name exists:

```js
if (typeof window !== "undefined") {
    console.log(window.document.title);
}
```

Feature detection should check the API the code needs:

```js
if (typeof globalThis.fetch === "function") {
    // Use fetch in this runtime.
}
```

Do not infer that one API exists only because another object exists. A runtime can provide `fetch` without a browser `window`, and browser API availability can vary across versions.

When practical, pass host-dependent capabilities into a function instead of having the function search global state:

```js
async function loadProfile(fetchFunction, url) {
    const response = await fetchFunction(url);
    return response.json();
}

loadProfile(globalThis.fetch, "/api/profile");
```

This makes dependencies visible and allows a test or another host to supply a different function.

## Global properties are not the same as global declarations

A global environment has both object properties and lexical bindings. A top-level declaration does not always become a property on `window` or `globalThis`.

In a classic browser script:

- A top-level `var` declaration typically creates a property on the global object.
- A top-level `let`, `const`, or `class` declaration creates a global lexical binding, not a `window` property.

```html
<script>
    var classicName = "var binding";
    let lexicalName = "let binding";

    console.log(window.classicName); // "var binding"
    console.log(window.lexicalName); // undefined
    console.log(lexicalName);        // "let binding"
</script>
```

Top-level module declarations are scoped to their module and do not create properties on `window`:

```html
<script type="module">
    const moduleName = "module binding";
    console.log("moduleName" in globalThis); // false
</script>
```

This distinction matters when inspecting globals, avoiding name collisions, and migrating older scripts into modules. Prefer module scope over adding application variables to the global object.

## Top-level `this` depends on the script type

At the top level of a classic browser script, `this` refers to the browser global. In a JavaScript module, top-level `this` is `undefined`:

```html
<script>
    console.log(this === window); // true in a classic browser script
</script>

<script type="module">
    console.log(this); // undefined
    console.log(globalThis === window); // true in a browser window
</script>
```

Inside functions, `this` depends on how the function is called. Use `globalThis` when the intent is specifically to access the global value instead of relying on `this` binding rules.

Node.js module wrappers have their own top-level scope rules. Do not copy browser assumptions about top-level `this` into server code.

## Avoid using the global object as application storage

Adding application state directly to `window` or `globalThis` can create collisions, hidden dependencies, and order-dependent scripts:

```js
// Avoid using globalThis as an unstructured application namespace.
globalThis.currentUser = user;
globalThis.apiBaseUrl = "/api";
```

Prefer module exports, function parameters, or one intentionally designed namespace when integrating with older scripts that require a global entry point:

```js
const appConfig = {
    apiBaseUrl: "/api",
};

function createClient(config) {
    return {
        loadProfile() {
            return fetch(`${config.apiBaseUrl}/profile`);
        },
    };
}
```

This keeps related values together and makes dependencies easier to replace.

## Avoid browser-only access during server rendering

A module may be imported in a browser, a server process, a build tool, or a test environment. Code that reads `document` immediately during module initialization can fail when no page exists:

```js
// This can fail in a server runtime.
const pageTitle = document.title;
```

Move browser-only work into a function that runs only when a document is available, or inject the required value:

```js
function readPageTitle() {
    if (typeof document === "undefined") {
        return null;
    }

    return document.title;
}
```

Feature checks are useful at a host boundary. They should not be used to disguise a design that requires the DOM in every environment.

## `window` properties and browser APIs

Many browser APIs are exposed through `window` and also available as global names in page scripts:

```js
window.setTimeout(() => {
    console.log("timer finished");
}, 100);

console.log(location.href);
console.log(navigator.language);
```

Using `window.` makes it clear that a value comes from a browser window. In shared code, use the API through an injected capability or check it on `globalThis` when appropriate.

Some properties such as `location` have behavior beyond an ordinary data property. Use their documented APIs rather than treating the global object as a generic key-value store.

## Common mistakes

- Assuming `window` exists in every JavaScript runtime.
- Treating `globalThis` as if it supplied every browser API.
- Assuming `document` is always available whenever a module is imported.
- Expecting top-level `let` or `const` in a classic script to appear as `window` properties.
- Expecting module declarations to become global properties.
- Assuming top-level `this` means the same thing in classic scripts, modules, and Node.js modules.
- Storing unrelated application state directly on `window` or `globalThis`.
- Treating an iframe's global as the same global as its parent.
- Checking for `window` when the code only needs to know whether `fetch` exists.
- Keeping a reference to a document after navigation has replaced it.

## Try it yourself

1. In a browser page, compare `globalThis`, `window`, `self`, and `document.defaultView`.
2. Log `window.document === document` and inspect the current page title.
3. Put `var`, `let`, and `const` at the top level of a classic script. Compare their identifiers with properties on `window`.
4. Repeat the declaration check inside a module script.
5. Check `typeof window` and `typeof document` in a worker or Node.js runtime.
6. Check for `fetch` directly instead of using the presence of `window` as a proxy.
7. Move a DOM read into a function and guard it for a runtime that has no document.
8. Replace an application-specific global property with a module value or function parameter.
9. Create an iframe and compare its `contentWindow` and `document` with the parent page's values. Consider origin restrictions.
10. Compare top-level `this` in a classic script, a module, and a Node.js module.

## Key points

- `globalThis` is the standard JavaScript access point for the current realm's global `this` value.
- Host environments provide different APIs on their globals.
- `window` represents a browser window context. A worker and a server runtime do not provide a page window.
- `document` represents the page document associated with a browsing context.
- In a window, `window.document` and `document` refer to the current page's document.
- Classic script `var` declarations can become global object properties, while `let`, `const`, and module declarations do not.
- Top-level `this` differs between classic scripts, modules, and some server module systems.
- Check the specific host API needed and keep application state out of the global namespace.
- Guard browser-only code at environment boundaries or pass its dependencies in.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [97 - Cancellation, timeouts, and AbortController](097-cancellation-timeouts-and-abortcontroller.md) | [Open Q&A](../qnas/098-browser-globals-globalthis-window-and-document.md) | [Open example](../examples/098-browser-globals-globalthis-window-and-document.md) | [99 - The DOM tree, selectors, and traversal](099-the-dom-tree-selectors-and-traversal.md) |