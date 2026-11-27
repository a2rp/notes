# 98 - Browser globals, globalThis, window, and document

This example compares JavaScript's global access point with browser-provided window and page objects. It shows how classic scripts and modules expose declarations differently, and how to check for browser capabilities before using them.

## Goal

By the end of this example, you can:

- Compare globalThis, window, self, and document in a browser page.
- See which classic script declarations become window properties.
- See that module declarations stay inside the module.
- Guard code that needs a page document.
- Check for a specific feature without assuming every host is a browser.

## Complete example

Copy the code into a file named `browser-globals.html`, then open it in a modern browser. Open the browser developer tools Console to see the logged values. The page updates its status paragraph as well.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Browser globals example</title>
</head>
<body>
    <main>
        <h1>Browser globals</h1>
        <p id="status">The module script has not run yet.</p>
    </main>

    <script>
        var classicVar = "created with var";
        let classicLet = "created with let";
        const classicConst = "created with const";

        console.log("Classic top-level this is window:", this === window);
        console.log("classicVar is a window property:", window.classicVar === classicVar);
        console.log("classicLet is a window property:", "classicLet" in window);
        console.log("classicConst is a window property:", "classicConst" in window);
        console.log("Classic script document title:", document.title);
    </script>

    <script type="module">
        const moduleValue = "private to this module";
        const status = document.querySelector("#status");

        console.log("Module globalThis is window:", globalThis === window);
        console.log("Module self is globalThis:", self === globalThis);
        console.log("window.document is document:", window.document === document);
        console.log("document.defaultView is window:", document.defaultView === window);
        console.log("Module top-level this is undefined:", this === undefined);
        console.log("moduleValue is a window property:", "moduleValue" in window);

        function getPageTitle() {
            if (typeof document === "undefined") {
                return "No page document in this environment";
            }

            return document.title;
        }

        console.log("Page title through guarded helper:", getPageTitle());

        if (typeof globalThis.fetch === "function") {
            console.log("Fetch capability is available");
        } else {
            console.log("Fetch capability is not available");
        }

        status.textContent = "The module ran. Check the Console for the global comparisons.";
        console.log("Status paragraph updated:", status.textContent);
    </script>
</body>
</html>
```

## Expected Console output

In a modern browser with fetch available, the Console shows:

```text
Classic top-level this is window: true
classicVar is a window property: true
classicLet is a window property: false
classicConst is a window property: false
Classic script document title: Browser globals example
Module globalThis is window: true
Module self is globalThis: true
window.document is document: true
document.defaultView is window: true
Module top-level this is undefined: true
moduleValue is a window property: false
Page title through guarded helper: Browser globals example
Fetch capability is available
Status paragraph updated: The module ran. Check the Console for the global comparisons.
```

The fetch message depends on whether the current browser provides fetch. The feature check prints one of the two messages and does not make the rest of the example depend on fetch.

## Expected page output

The page displays the heading **Browser globals** and, after the module runs, this paragraph:

> The module ran. Check the Console for the global comparisons.

## How it works

### The host supplies browser objects

JavaScript provides globalThis as a consistent way to access the current realm's global value. The browser supplies objects and APIs such as window and document. In this page, window and globalThis identify the current window global access point, while document is the page's Document.

A worker has a different global access point and does not have a page window or document. A server runtime also provides its own host APIs. The presence of globalThis does not mean that every browser API is available.

### Classic script declarations differ

At the top level of this classic script, var creates a property on the window global object. Top-level let and const create global lexical bindings instead. They can be used by other classic scripts in the same page, but they are not properties such as window.classicLet.

The classic script is not strict, so its top-level this value is window. Adding strict mode would change that this value.

### Module declarations stay in module scope

The module's const declaration is private to that module. It does not become a window property. A module's top-level this is undefined, even though the module can still access browser globals such as document.

Module scripts run after the document has been parsed. That is why the classic script logs first and the module script can find the status paragraph.

### Check the capability you need

The helper checks whether document exists before reading its title. The typeof check is safe even when document is not defined in the current environment.

The fetch check asks whether that specific capability is available on globalThis. Checking for window would only answer whether a window global exists, not whether a particular feature is supported.

## Try another case

1. Add a top-level var to the module and check whether it becomes a window property. It should remain in module scope.
2. Add another classic script after the first one and read classicLet directly. Compare that with reading window.classicLet.
3. Add use strict to the classic script and compare its top-level this value.
4. Replace the fetch check with a check for another capability that your browser may or may not provide.
5. Move getPageTitle into a separate module and import it in a server-side environment. Keep the document access behind the guard.
6. Open the developer tools Console and compare the logged values with the global object properties.

## Key points

- globalThis gives code a standard name for the current realm's global value.
- The host environment supplies APIs such as window, document, and fetch.
- In a browser window, window and globalThis refer to that window's global access point.
- A page's document is available through both document and window.document.
- Top-level var in a classic script can create a window property. Top-level let and const do not.
- Module declarations remain in module scope, and module top-level this is undefined.
- Guard browser-only code and check the specific capability it needs.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [97 - Cancellation, timeouts, and AbortController](../lessons/097-cancellation-timeouts-and-abortcontroller.md) | [Open lesson](../lessons/098-browser-globals-globalthis-window-and-document.md) | [Open Q&A](../qnas/098-browser-globals-globalthis-window-and-document.md) | [99 - The DOM tree, selectors, and traversal](../lessons/099-the-dom-tree-selectors-and-traversal.md) |
