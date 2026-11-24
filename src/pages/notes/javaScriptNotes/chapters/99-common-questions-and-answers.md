# 99. Common JavaScript questions and answers

## Is JavaScript the same as ECMAScript?

JavaScript is the common name for the language; ECMAScript is the specification for its core behavior. Browser and server hosts add their own APIs.

## Is JavaScript compiled or interpreted?

Modern engines commonly parse and compile code using several execution strategies. “Compiled” and “interpreted” are not mutually exclusive descriptions of the entire runtime.

## What is the difference between `let`, `const`, and `var`?

`let` and `const` are block-scoped; `var` is function-scoped. `const` prevents rebinding, not mutation of an object. Prefer `const`, then `let` when reassignment is needed.

## What is the difference between `null` and `undefined`?

`undefined` commonly means a value was not supplied; `null` is often an intentional empty value. Pick a consistent convention at API boundaries and check both explicitly when needed.

## Why does `0.1 + 0.2` not equal exactly `0.3`?

Numbers use binary floating-point representation, and many decimal fractions cannot be represented exactly. For money, use integer minor units or a suitable decimal arithmetic library.

## What is a closure?

A function together with access to its surrounding lexical variables. The function can keep those bindings available after the outer function returns.

## Do arrow functions have their own `this`?

No. They capture `this` from the surrounding scope. An ordinary function's `this` depends on how it is called.

## Does `await` block JavaScript?

It suspends the current async function until a promise settles, letting other scheduled work proceed. Synchronous CPU-heavy JavaScript still blocks the thread.

## Why can fetch return 404 without throwing?

HTTP error statuses still produce a response. Check `response.ok` or `response.status` and throw or handle the status yourself.

## Is object spread a deep copy?

No. It copies enumerable own properties one level deep. Nested references remain shared.

## Is everything in JavaScript an object?

No. Strings, numbers, booleans, `null`, `undefined`, `bigint`, and symbols are primitives. Functions are callable objects.

## Are browser APIs part of the JavaScript language?

No. The DOM, `fetch`, and storage APIs are supplied by the browser. Node.js provides different host APIs.

## Should I use every new JavaScript feature?

Use features supported by the environments you target. Check compatibility and weigh readability before adopting a new API.

## How do I prevent XSS?

Avoid injecting untrusted strings as HTML. Use text-safe APIs, sanitize only when rich HTML is required, and enforce authorization and validation on the server.

## How do I debug a failed async request?

Inspect the network status and response body, check whether the request was aborted, and handle rejected promises at a useful boundary. Preserve diagnostic details without exposing secrets.

## References

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [ECMAScript specification](https://tc39.es/ecma262/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
